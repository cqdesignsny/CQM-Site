import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkForSpam, getClientIP } from "@/lib/spam-protection";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;

    // Spam check
    const spamResult = checkForSpam({
      honeypot: body._hp,
      formLoadedAt: body._t,
      ip: getClientIP(request.headers),
    });
    if (spamResult.isSpam) {
      return NextResponse.json({ success: true });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (audienceId) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.contacts.create({
        email,
        audienceId,
        ...(name ? { firstName: name } : {}),
      });
    }

    // Store phone in a custom property if available (for future SMS)
    // Resend contacts don't natively support phone, so we log it
    if (phone) {
      console.log(`[Newsletter] Phone collected for ${email}: ${phone}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
