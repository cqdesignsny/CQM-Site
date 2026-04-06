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

    const resendKey = process.env.RESEND_API_KEY;
    const promises: Promise<unknown>[] = [];

    // 1. Notion CRM
    promises.push(
      createContactLead({
        name: body.name, email: body.email, phone: body.phone,
        serviceInterest: body.serviceInterest, message: body.message, locale: body.locale,
      }).catch((e) => console.error("[Contact] Notion error:", String(e)))
    );

    // 2. Slack
    promises.push(
      sendSlackNotification({
        event: "contact_submitted", name: body.name, email: body.email, phone: body.phone,
        details: {
          "Service Interest": body.serviceInterest,
          "Message": body.message.length > 200 ? body.message.slice(0, 200) + "…" : body.message,
        },
      }).catch((e) => console.error("[Contact] Slack error:", e))
    );

    // 3. Email to Cesar
    if (resendKey) {
      const html = buildContactNotificationEmail({
        name: body.name, email: body.email, phone: body.phone,
        serviceInterest: body.serviceInterest, message: body.message,
      });
      promises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: siteConfig.contact.email, reply_to: body.email,
            subject: `New Contact: ${body.name}${body.serviceInterest ? ` — ${body.serviceInterest}` : ""}`,
            html,
          }),
        }).catch((e) => console.error("[Contact] Email error:", e))
      );

      // 4. Newsletter opt-in
      if (body.newsletterOptIn && process.env.RESEND_AUDIENCE_ID) {
        promises.push(
          fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
            body: JSON.stringify({ email: body.email }),
          }).catch((e) => console.error("[Contact] Newsletter error:", e))
        );
      }
    }

    await Promise.allSettled(promises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
