import { siteConfig } from "@/lib/site-config";

/**
 * Send a Slack notification via an Incoming Webhook URL.
 * Non-blocking — logs errors but never throws.
 */
export async function sendSlackNotification(payload: {
  event: string;
  name: string;
  email: string;
  phone?: string;
  details: Record<string, string | number | null | undefined>;
}): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[Slack] SLACK_WEBHOOK_URL not configured — skipping notification");
    return;
  }

  const eventLabels: Record<string, string> = {
    proposal_created: "📋 New Proposal",
    proposal_accepted: "✅ Proposal Accepted",
    assessment_completed: "📊 Assessment Completed",
    contact_submitted: "📬 Contact Form",
  };

  const header = eventLabels[payload.event] || `🔔 ${payload.event}`;

  // Build detail fields
  const fields = Object.entries(payload.details)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([key, value]) => ({
      type: "mrkdwn" as const,
      text: `*${key}:*\n${value}`,
    }));

  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: header },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${payload.name}` },
        { type: "mrkdwn", text: `*Email:*\n${payload.email}` },
        ...(payload.phone
          ? [{ type: "mrkdwn", text: `*Phone:*\n${payload.phone}` }]
          : []),
      ],
    },
    ...(fields.length > 0
      ? [{ type: "section", fields: fields.slice(0, 10) }]
      : []),
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `${siteConfig.name} • ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`,
        },
      ],
    },
  ];

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!res.ok) {
      console.error("[Slack] Webhook returned", res.status, await res.text());
    }
  } catch (err) {
    console.error("[Slack] Webhook error:", err);
  }
}
