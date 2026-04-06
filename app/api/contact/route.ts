import { NextRequest, NextResponse } from "next/server";
import { createContactLead } from "@/lib/notion/client";
import { sendSlackNotification } from "@/lib/slack";
import { siteConfig } from "@/lib/site-config";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  locale?: string;
  newsletterOptIn?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

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

    // 2. Send notification email via Resend
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
            to: siteConfig.contact.email,
            reply_to: body.email,
            subject: `New Contact: ${body.name}${body.serviceInterest ? ` — ${body.serviceInterest}` : ""}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #111;">New Contact Form Submission</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0;">${body.name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
                  ${body.phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${body.phone}</td></tr>` : ""}
                  ${body.serviceInterest ? `<tr><td style="padding: 8px 0; color: #888;">Service</td><td style="padding: 8px 0;">${body.serviceInterest}</td></tr>` : ""}
                </table>
                <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                  <p style="margin: 0; color: #333; white-space: pre-wrap;">${body.message}</p>
                </div>
              </div>
            `,
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
