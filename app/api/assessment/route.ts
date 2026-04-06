import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createAssessmentLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import {
  calculateCategoryScores,
  calculateOverallScore,
  getRecommendedServices,
} from "@/lib/assessment/scoring";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment/questions";
import type { AssessmentAnswer, Locale } from "@/lib/proposals/types";
import { siteConfig } from "@/lib/site-config";
import { buildAssessmentEmail, buildAssessmentNotificationEmail } from "@/lib/email-templates";
import { checkForSpam, getClientIP } from "@/lib/spam-protection";

interface AssessmentBody {
  locale: Locale;
  contact: { name: string; email: string; phone: string; newsletterOptIn?: boolean };
  answers: AssessmentAnswer[];
  _hp?: string;
  _t?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentBody = await request.json();

    // Spam check
    const spamResult = checkForSpam({
      honeypot: body._hp,
      formLoadedAt: body._t,
      ip: getClientIP(request.headers),
    });
    if (spamResult.isSpam) {
      return NextResponse.json({ success: true });
    }

    if (!body.contact?.name || !body.contact?.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!body.answers || body.answers.length === 0) {
      return NextResponse.json(
        { error: "Answers are required" },
        { status: 400 }
      );
    }

    const categoryScores = calculateCategoryScores(body.answers);
    const overallScore = calculateOverallScore(categoryScores);
    const recommendedServices = getRecommendedServices(categoryScores);
    const assessmentId = `assess_${nanoid(12)}`;
    const resendKey = process.env.RESEND_API_KEY;
    const recommendedPlan: "startup" | "growth" | "scale" =
      overallScore <= 40 ? "startup" : overallScore <= 65 ? "growth" : "scale";

    // Build all the data upfront
    const answersSummary = body.answers.map((a: AssessmentAnswer) => {
      const q = ASSESSMENT_QUESTIONS.find((q) => q.id === a.questionId);
      if (!q) return "";
      const selectedOption = q.options[a.selectedOptionIndex];
      const scoreEmoji = a.score >= 4 ? "🟢" : a.score >= 2 ? "🟡" : "🔴";
      return `${scoreEmoji} ${q.question}\n   → ${selectedOption?.text || "N/A"} (${a.score}/5)`;
    }).filter(Boolean).join("\n");

    const scoreBreakdown = categoryScores
      .map((cs) => {
        const emoji = cs.percentage >= 70 ? "🟢" : cs.percentage >= 40 ? "🟡" : "🔴";
        return `${emoji} ${cs.category}: ${cs.percentage}%`;
      })
      .join(" | ");

    // ── Run ALL side effects in parallel ──
    // This prevents timeout by not waiting for each one sequentially
    const promises: Promise<unknown>[] = [];

    // 1. Notion CRM
    promises.push(
      createAssessmentLead({
        id: assessmentId,
        contact: body.contact,
        overallScore,
        categoryScores,
        recommendedServices,
        locale: body.locale || "en",
      }).then((r) => console.log("[Assessment] Notion:", r))
        .catch((e) => console.error("[Assessment] Notion error:", String(e)))
    );

    // 2. Slack
    promises.push(
      sendSlackNotification({
        event: "assessment_completed",
        name: body.contact.name,
        email: body.contact.email,
        phone: body.contact.phone,
        details: {
          "Assessment ID": assessmentId,
          "Overall Score": `${overallScore}/100`,
          "Breakdown": scoreBreakdown,
          "Answers": `\n${answersSummary}`,
        },
      }).catch((e) => console.error("[Assessment] Slack error:", e))
    );

    // 3. Email to user
    if (resendKey) {
      const userHtml = buildAssessmentEmail({
        name: body.contact.name,
        overallScore,
        categoryScores: categoryScores.map((cs) => ({
          category: cs.category,
          percentage: cs.percentage,
        })),
        recommendedPlan,
        assessmentId,
      });

      promises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: body.contact.email,
            reply_to: siteConfig.contact.email,
            subject: `Your Marketing Score: ${overallScore}/100`,
            html: userHtml,
          }),
        }).catch((e) => console.error("[Assessment] User email error:", e))
      );

      // 4. Notification email to Cesar
      const notifHtml = buildAssessmentNotificationEmail({
        name: body.contact.name,
        email: body.contact.email,
        phone: body.contact.phone,
        overallScore,
        categoryScores: categoryScores.map((cs) => ({ category: cs.category, percentage: cs.percentage })),
        recommendedPlan: recommendedPlan === "startup" ? "Business Startup ($750/mo)" : recommendedPlan === "growth" ? "Business Growth ($1,500/mo)" : "Business Scale ($3,000/mo)",
        assessmentId,
      });

      promises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: siteConfig.contact.email,
            subject: `🎯 New Assessment: ${body.contact.name} scored ${overallScore}/100`,
            html: notifHtml,
          }),
        }).catch((e) => console.error("[Assessment] Notification email error:", e))
      );

      // 5. Newsletter opt-in
      if (body.contact.newsletterOptIn && process.env.RESEND_AUDIENCE_ID) {
        promises.push(
          fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
            body: JSON.stringify({ email: body.contact.email }),
          }).catch((e) => console.error("[Assessment] Newsletter error:", e))
        );
      }
    }

    // Wait for ALL to complete (or fail individually)
    await Promise.allSettled(promises);

    return NextResponse.json({
      success: true,
      assessmentId,
      overallScore,
      categoryScores,
      recommendedServices,
      builderUrl: `/proposals?from=assessment&id=${assessmentId}`,
    });
  } catch (error) {
    console.error("[Assessment] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
