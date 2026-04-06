import { NextRequest, NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import { siteConfig } from "@/lib/site-config";
import { checkForSpam, getClientIP } from "@/lib/spam-protection";
import { buildContactNotificationEmail } from "@/lib/email-templates";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  locale?: string;
  newsletterOptIn?: boolean;
  _hp?: string;
  _t?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    // Spam check
    const spamResult = checkForSpam({
      honeypot: body._hp,
      formLoadedAt: body._t,
      ip: getClientIP(request.headers),
    });
    if (spamResult.isSpam) {
      // Return success to not tip off bots, but don't process
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
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
        phone: body.phone,
        serviceInterest: body.serviceInterest,
        message: body.message,
        locale: body.locale,
      });
    } catch (notionError) {
      console.error("[Contact] Notion create error:", notionError);
    }

    // 2. Send branded notification email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const html = buildContactNotificationEmail({
          name: body.name,
          email: body.email,
          phone: body.phone,
          serviceInterest: body.serviceInterest,
          message: body.message,
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
            reply_to: body.email,
            subject: `New Contact: ${body.name}${body.serviceInterest ? ` — ${body.serviceInterest}` : ""}`,
            html,
          }),
        });
      } catch (emailErr) {
        console.error("[Contact] Email error:", emailErr);
      }
    }

    // 3. Newsletter opt-in (non-blocking)
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
        console.error("[Contact] Newsletter opt-in error:", nlErr);
      }
    }

    // 4. Slack notification (non-blocking)
    try {
      await sendSlackNotification({
        event: "contact_submitted",
        name: body.name,
        email: body.email,
        phone: body.phone,
        details: {
          "Service Interest": body.serviceInterest,
          "Message":
            body.message.length > 200
              ? body.message.slice(0, 200) + "…"
              : body.message,
        },
      });
    } catch (slackError) {
      console.error("[Contact] Slack error:", slackError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
