import { NextRequest, NextResponse } from "next/server";
import { sendSlackNotification } from "@/lib/slack";
import { siteConfig } from "@/lib/site-config";
import { checkForSpam, getClientIP } from "@/lib/spam-protection";
import { buildROIEmail, buildROINotificationEmail } from "@/lib/email-templates";

interface ROIResultsBody {
  name: string;
  email: string;
  newsletterOptIn?: boolean;
  industry: string;
  currentRevenue: number;
  revenueGoal: number;
  customerValue: number;
  currentSpend: number;
  recommendedBudget: number;
  roiMultiplier: number;
  timelineLabel: string;
  timelineMonths: string;
  _hp?: string;
  _t?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ROIResultsBody = await request.json();

    // Spam check
    const spamResult = checkForSpam({
      honeypot: body._hp,
      formLoadedAt: body._t,
      ip: getClientIP(request.headers),
    });
    if (spamResult.isSpam) {
      return NextResponse.json({ success: true });
    }

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const notionKey = process.env.NOTION_API_KEY?.trim();
    const dbId = process.env.NOTION_LEADS_DATABASE_ID?.trim();

    // 1. Save to Notion CRM with proper "ROI Calculator" source tag
    if (notionKey && dbId) {
      try {
        const roiDetails = `Industry: ${body.industry} | Revenue: $${body.currentRevenue.toLocaleString()}/mo | Goal: $${body.revenueGoal.toLocaleString()}/mo | Customer Value: $${body.customerValue.toLocaleString()} | Current Spend: $${body.currentSpend.toLocaleString()}/mo | Recommended: $${body.recommendedBudget.toLocaleString()}/mo | ROI: ${body.roiMultiplier}x | Timeline: ${body.timelineMonths}`;

        const response = await fetch("https://api.notion.com/v1/pages", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${notionKey}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify({
            parent: { database_id: dbId },
            properties: {
              Name: { title: [{ text: { content: body.name } }] },
              Email: { email: body.email },
              Source: { select: { name: "ROI Calculator" } },
              Status: { select: { name: "New" } },
              "Service Interest": { rich_text: [{ text: { content: "ROI Calculator" } }] },
              Message: { rich_text: [{ text: { content: roiDetails } }] },
              Locale: { select: { name: "EN" } },
            },
          }),
        });

        if (!response.ok) {
          const err = await response.text();
          console.error("[ROI] Notion create error:", err);
        }
      } catch (notionError) {
        console.error("[ROI] Notion create error:", notionError);
      }
    }

    // 2. Send branded results email to the user
    if (resendKey) {
      try {
        const html = buildROIEmail({
          name: body.name,
          industry: body.industry,
          currentRevenue: body.currentRevenue,
          revenueGoal: body.revenueGoal,
          recommendedBudget: body.recommendedBudget,
          roiMultiplier: body.roiMultiplier,
          timelineMonths: body.timelineMonths,
        });

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: body.email,
            reply_to: siteConfig.contact.email,
            subject: `Your Marketing ROI Analysis — ${body.industry}`,
            html,
          }),
        });
      } catch (emailErr) {
        console.error("[ROI] Email error:", emailErr);
      }

      // Send notification email to Cesar
      try {
        const notifHtml = buildROINotificationEmail({
          name: body.name,
          email: body.email,
          industry: body.industry,
          currentRevenue: body.currentRevenue,
          revenueGoal: body.revenueGoal,
          currentSpend: body.currentSpend,
          recommendedBudget: body.recommendedBudget,
          roiMultiplier: body.roiMultiplier,
          timelineMonths: body.timelineMonths,
        });

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: siteConfig.contact.email,
            subject: `📊 New ROI Lead: ${body.name} — ${body.industry}`,
            html: notifHtml,
          }),
        });
      } catch (notifErr) {
        console.error("[ROI] Notification email error:", notifErr);
      }
    }

    // 3. Slack notification
    try {
      await sendSlackNotification({
        event: "roi_calculator_lead",
        name: body.name,
        email: body.email,
        details: {
          "Industry": body.industry,
          "Current Revenue": `$${body.currentRevenue.toLocaleString()}/mo`,
          "Revenue Goal": `$${body.revenueGoal.toLocaleString()}/mo`,
          "Current Spend": `$${body.currentSpend.toLocaleString()}/mo`,
          "Recommended Budget": `$${body.recommendedBudget.toLocaleString()}/mo`,
          "ROI": `${body.roiMultiplier}x`,
          "Timeline": body.timelineMonths,
        },
      });
    } catch (slackError) {
      console.error("[ROI] Slack error:", slackError);
    }

    // 4. Newsletter opt-in
    if (body.newsletterOptIn && process.env.RESEND_AUDIENCE_ID && resendKey) {
      try {
        await fetch("https://api.resend.com/audiences/" + process.env.RESEND_AUDIENCE_ID + "/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({ email: body.email, firstName: body.name }),
        });
      } catch (nlErr) {
        console.error("[ROI] Newsletter opt-in error:", nlErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ROI] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
