import { NextRequest, NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import { siteConfig } from "@/lib/site-config";
import { checkForSpam, getClientIP } from "@/lib/spam-protection";

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

    // 1. Save to Notion CRM
    try {
      await createContactLead({
        name: body.name,
        email: body.email,
        serviceInterest: "ROI Calculator",
        message: `Industry: ${body.industry} | Revenue: $${body.currentRevenue.toLocaleString()}/mo | Goal: $${body.revenueGoal.toLocaleString()}/mo | Customer Value: $${body.customerValue.toLocaleString()} | Current Spend: $${body.currentSpend.toLocaleString()}/mo | Recommended: $${body.recommendedBudget.toLocaleString()}/mo | ROI: ${body.roiMultiplier}x | Timeline: ${body.timelineMonths}`,
        locale: "en",
      });
    } catch (notionError) {
      console.error("[ROI] Notion create error:", notionError);
    }

    // 2. Send results email to the user
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
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
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111; color: #fff; border-radius: 12px;">
                <h2 style="color: #fff; margin-bottom: 4px;">Hey ${body.name},</h2>
                <p style="color: #999; margin-top: 0;">Here's your personalized marketing budget analysis.</p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222;">Industry</td><td style="padding: 10px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #222;">${body.industry}</td></tr>
                  <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222;">Current Revenue</td><td style="padding: 10px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #222;">$${body.currentRevenue.toLocaleString()}/mo</td></tr>
                  <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222;">Revenue Goal</td><td style="padding: 10px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #222;">$${body.revenueGoal.toLocaleString()}/mo</td></tr>
                  <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222;">Recommended Budget</td><td style="padding: 10px 0; text-align: right; font-weight: bold; color: #dc2626; border-bottom: 1px solid #222;">$${body.recommendedBudget.toLocaleString()}/mo</td></tr>
                  <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222;">Expected ROI</td><td style="padding: 10px 0; text-align: right; font-weight: bold; color: ${body.roiMultiplier >= 5 ? "#22c55e" : "#f59e0b"}; border-bottom: 1px solid #222;">${body.roiMultiplier}x return</td></tr>
                  <tr><td style="padding: 10px 0; color: #888;">Expected Timeline</td><td style="padding: 10px 0; text-align: right; font-weight: bold;">${body.timelineMonths}</td></tr>
                </table>

                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://creativequalitymarketing.com/assessment" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Take the Full Marketing Assessment</a>
                </div>
                <p style="text-align: center; margin-top: 12px;">
                  <a href="https://creativequalitymarketing.com/roi-calculator" style="color: #888; font-size: 12px; text-decoration: none;">Run the calculator again</a>
                </p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[ROI] Email error:", emailErr);
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
          body: JSON.stringify({ email: body.email }),
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
