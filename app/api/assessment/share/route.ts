import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

interface ShareBody {
  assessmentId: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  overallScore: number;
  locale: "en" | "es";
}

export async function POST(request: NextRequest) {
  try {
    const body: ShareBody = await request.json();

    if (!body.recipientEmail?.trim()) {
      return NextResponse.json(
        { error: "Recipient email is required" },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const resultsUrl = `${siteConfig.url}/assessment?results=${body.assessmentId}`;

    const isEs = body.locale === "es";
    const subject = isEs
      ? `Resultados de Evaluación de Marketing — ${body.senderName}`
      : `Marketing Assessment Results — ${body.senderName}`;

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; color: #111; margin: 0;">
            ${isEs ? "Resultados de Evaluación" : "Assessment Results"}
          </h1>
          <p style="color: #666; font-size: 14px; margin-top: 8px;">
            ${isEs ? "de" : "from"} ${siteConfig.name}
          </p>
        </div>

        <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">
            ${isEs ? "Puntuación General" : "Overall Score"}
          </p>
          <div style="font-size: 56px; font-weight: 900; color: ${body.overallScore >= 70 ? "#16a34a" : body.overallScore >= 40 ? "#d97706" : "#dc2626"};">
            ${body.overallScore}
          </div>
          <p style="color: #aaa; font-size: 14px; margin: 0;">/ 100</p>
        </div>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">
          ${isEs
            ? `${body.senderName} completó una evaluación de marketing y quiere compartir los resultados contigo. Haz clic abajo para ver el desglose completo y las recomendaciones.`
            : `${body.senderName} completed a marketing assessment and wanted to share the results with you. Click below to see the full breakdown and recommendations.`}
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resultsUrl}" style="display: inline-block; background: #dc2626; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
            ${isEs ? "Ver Resultados Completos" : "View Full Results"}
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #aaa; font-size: 11px; text-align: center;">
          ${siteConfig.name} — ${siteConfig.contact.streetAddress}, ${siteConfig.contact.locality}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}
        </p>
      </div>
    `;

    if (resendKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: `${siteConfig.name} <noreply@creativequalitymarketing.com>`,
            to: body.recipientEmail,
            reply_to: body.senderEmail,
            subject,
            html: htmlBody,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error("[Assessment Share] Resend error:", err);
          return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
          );
        }
      } catch (emailErr) {
        console.error("[Assessment Share] Email error:", emailErr);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      // No Resend configured — log and still return success for demo
      console.warn("[Assessment Share] Resend not configured — email would be sent to:", body.recipientEmail);
    }

    // Webhook
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "assessment_shared",
            assessmentId: body.assessmentId,
            sharedBy: body.senderName,
            sharedWith: body.recipientEmail,
            overallScore: body.overallScore,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // non-blocking
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Assessment Share] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
