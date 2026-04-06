import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createAssessmentLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import {
  calculateCategoryScores,
  calculateOverallScore,
  getRecommendedServices,
} from "@/lib/assessment/scoring";
import type { AssessmentAnswer, Locale } from "@/lib/proposals/types";
import { siteConfig } from "@/lib/site-config";

interface AssessmentBody {
  locale: Locale;
  contact: { name: string; email: string; phone: string; newsletterOptIn?: boolean };
  answers: AssessmentAnswer[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentBody = await request.json();

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

    // 1. Save to Notion CRM
    try {
      await createAssessmentLead({
        id: assessmentId,
        contact: body.contact,
        overallScore,
        categoryScores,
        recommendedServices,
        locale: body.locale || "en",
      });
    } catch (notionError) {
      console.error("[Assessment] Notion create error:", notionError);
    }

    // 2. Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        event: "assessment_completed",
        name: body.contact.name,
        email: body.contact.email,
        phone: body.contact.phone,
        details: {
          "Assessment ID": assessmentId,
          "Overall Score": `${overallScore}/100`,
          "Recommended": recommendedServices.join(", ") || "None",
        },
      });
    } catch (slackError) {
      console.error("[Assessment] Slack error:", slackError);
    }

    // 3. Send results email to the user
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const scoreColor = overallScore >= 70 ? "#22c55e" : overallScore >= 40 ? "#f59e0b" : "#ef4444";
        const categoryRows = categoryScores
          .map((c: { category: string; score: number }) => {
            const barColor = c.score >= 70 ? "#22c55e" : c.score >= 40 ? "#f59e0b" : "#ef4444";
            return `<tr>
              <td style="padding: 8px 0; color: #888;">${c.category}</td>
              <td style="padding: 8px 0;">
                <div style="background: #222; border-radius: 8px; height: 12px; width: 100%; overflow: hidden;">
                  <div style="background: ${barColor}; height: 100%; width: ${c.score}%; border-radius: 8px;"></div>
                </div>
              </td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; color: ${barColor}; width: 50px;">${c.score}%</td>
            </tr>`;
          })
          .join("");

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: body.contact.email,
            reply_to: siteConfig.contact.email,
            subject: `Your Marketing Score: ${overallScore}/100`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111; color: #fff; border-radius: 12px;">
                <h2 style="color: #fff; margin-bottom: 4px;">Hey ${body.contact.name},</h2>
                <p style="color: #999; margin-top: 0;">Here are your marketing assessment results.</p>
                <div style="text-align: center; padding: 24px 0;">
                  <div style="display: inline-block; font-size: 48px; font-weight: bold; color: ${scoreColor};">${overallScore}<span style="font-size: 20px; color: #666;">/100</span></div>
                </div>
                <table style="width: 100%; border-collapse: collapse;">${categoryRows}</table>
                ${recommendedServices.length > 0 ? `<p style="margin-top: 16px; color: #999;">We recommend focusing on: <strong style="color: #fff;">${recommendedServices.join(", ")}</strong></p>` : ""}
                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://creativequalitymarketing.com/proposals?from=assessment&id=${assessmentId}" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Build Your Marketing Plan</a>
                </div>
                <p style="text-align: center; margin-top: 16px; font-size: 12px; color: #555;">
                  <a href="https://creativequalitymarketing.com/assessment?results=${assessmentId}" style="color: #888;">View your full results online</a>
                </p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[Assessment] Email error:", emailErr);
      }
    }

    // 4. Newsletter opt-in
    if (body.contact.newsletterOptIn && process.env.RESEND_AUDIENCE_ID && resendKey) {
      try {
        await fetch("https://api.resend.com/audiences/" + process.env.RESEND_AUDIENCE_ID + "/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({ email: body.contact.email }),
        });
      } catch (nlErr) {
        console.error("[Assessment] Newsletter opt-in error:", nlErr);
      }
    }

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
