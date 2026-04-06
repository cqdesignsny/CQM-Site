import { Resend } from "resend";
import type { Proposal, Locale, SelectedService } from "./types";
import { t } from "./translations";
import { getServiceName, formatCurrency } from "./calculations";
import { getServiceById } from "./services-data";
import { siteConfig } from "@/lib/site-config";

const LOGO_URL = "https://creativequalitymarketing.com/images/cqm-logo-white.png";
const BRAND_RED = "#dc2626";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing RESEND_API_KEY environment variable");
  return new Resend(apiKey);
}

const DEFAULT_FROM = `Creative Quality Marketing <proposals@creativequalitymarketing.com>`;

/**
 * Send the proposal email to the prospect and BCC to the sales rep.
 */
export async function sendProposalEmail(
  proposal: Proposal,
  locale: Locale
): Promise<void> {
  const resend = getResendClient();
  const defaultEmail =
    process.env.DEFAULT_PROPOSAL_EMAIL?.trim() || siteConfig.contact.email;
  const viewUrl = `${siteConfig.url}/proposals/view/${proposal.id}`;

  const html = buildProposalEmailHtml(proposal, locale, viewUrl);

  await resend.emails.send({
    from: DEFAULT_FROM,
    to: [proposal.contact.email],
    bcc: [defaultEmail],
    subject: t("email.subject", locale),
    html,
  });
}

/**
 * Send notification to the rep when a proposal is accepted.
 */
export async function sendAcceptanceNotification(
  proposal: Proposal
): Promise<void> {
  const resend = getResendClient();
  const locale = proposal.locale || "en";
  const defaultEmail =
    process.env.DEFAULT_PROPOSAL_EMAIL?.trim() || siteConfig.contact.email;

  const html = wrapEmail(`
    <div style="margin-bottom: 16px; padding: 12px 16px; background: #22c55e22; border-radius: 8px; border-left: 4px solid #22c55e;">
      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #22c55e;">Proposal Accepted</p>
    </div>

    <h2 style="color: #fff; margin: 0 0 16px;">${proposal.contact.name} accepted their proposal!</h2>

    <table style="width: 100%; border-collapse: collapse;">
      ${statRow("Client", proposal.contact.name)}
      ${statRow("Email", `<a href="mailto:${proposal.contact.email}" style="color: ${BRAND_RED}; text-decoration: none;">${proposal.contact.email}</a>`)}
      ${statRow("Phone", proposal.contact.phone || "N/A")}
      ${statRow("Grand Total", formatCurrency(proposal.grandTotal), BRAND_RED)}
      ${statRow("Proposal", `<a href="${siteConfig.url}/proposals/view/${proposal.id}" style="color: ${BRAND_RED}; text-decoration: none;">${proposal.id}</a>`)}
    </table>
  `);

  await resend.emails.send({
    from: DEFAULT_FROM,
    to: [defaultEmail],
    subject: `✅ Proposal Accepted — ${proposal.contact.name}`,
    html,
  });
}

// ── Shared email wrapper (matches CQM branded template) ──

function wrapEmail(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">
    <div style="text-align: center; padding: 24px 16px 20px; background: ${BRAND_RED}; border-radius: 12px 12px 0 0;">
      <img src="${LOGO_URL}" alt="${siteConfig.name}" width="200" style="height: auto; max-width: 200px;" />
    </div>
    <div style="background: #111111; border-radius: 0 0 16px 16px; padding: 32px 24px; color: #ffffff;">
      ${body}
    </div>
    <div style="text-align: center; padding: 24px 0; color: #555; font-size: 11px; line-height: 1.5;">
      <p style="margin: 0;">${siteConfig.name}</p>
      <p style="margin: 4px 0;">${siteConfig.contact.streetAddress}, ${siteConfig.contact.locality}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}</p>
      <p style="margin: 4px 0;">
        <a href="https://creativequalitymarketing.com" style="color: ${BRAND_RED}; text-decoration: none;">creativequalitymarketing.com</a>
        &nbsp;|&nbsp;
        <a href="tel:${siteConfig.contact.phoneE164}" style="color: #888; text-decoration: none;">${siteConfig.contact.phoneDisplay}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function statRow(label: string, value: string, color?: string): string {
  return `<tr>
    <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222; font-size: 14px;">${label}</td>
    <td style="padding: 10px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #222; font-size: 14px;${color ? ` color: ${color};` : ""}">${value}</td>
  </tr>`;
}

/**
 * Build the styled HTML email for a proposal (CQM branded).
 */
function buildProposalEmailHtml(
  proposal: Proposal,
  locale: Locale,
  viewUrl: string
): string {
  const greeting = t("email.greeting", locale);
  const intro = t("email.intro", locale);
  const viewButton = t("email.viewButton", locale);
  const footer = t("email.footer", locale);
  const oneTimeLabel = t("label.onetime", locale);
  const monthlyLabel = t("label.monthly", locale);
  const totalLabel = t("label.total", locale);
  const perMonthShort = t("label.perMonthShort", locale);

  // Build service rows
  const serviceRows = proposal.selectedServices
    .map((s) => {
      const service = getServiceById(s.serviceId);
      const name = getServiceName(s.serviceId, locale);
      const qty = s.quantity > 1 ? ` x${s.quantity}` : "";
      const price = formatCurrency(s.unitPrice * s.quantity);
      const billing = service ? t(`billing.${service.billing}`, locale) : "";
      return statRow(`${name}${qty}`, `${price} <span style="color: #666; font-size: 12px;">${billing}</span>`);
    })
    .join("");

  const customRows = proposal.customLineItems
    .map((item) => statRow(item.name, formatCurrency(item.price)))
    .join("");

  const discountRow = proposal.discountAmount > 0
    ? `<tr><td style="padding: 10px 0; color: #22c55e; border-bottom: 1px solid #222; font-size: 14px;">${t("label.discount", locale)}</td><td style="padding: 10px 0; text-align: right; color: #22c55e; border-bottom: 1px solid #222; font-size: 14px;">-${formatCurrency(proposal.discountAmount)}</td></tr>`
    : "";

  const hostingRow = proposal.hostingFee > 0
    ? statRow(t("label.hosting", locale), `${formatCurrency(proposal.hostingFee)}${perMonthShort}`)
    : "";

  const body = `
    <p style="font-size: 16px; color: #fff; margin: 0 0 8px;">${greeting} ${proposal.contact.name},</p>
    <p style="font-size: 14px; color: #999; margin: 0 0 24px; line-height: 1.6;">${intro}</p>

    <!-- Services -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
      ${serviceRows}
      ${customRows}
      ${hostingRow}
      ${discountRow}
    </table>

    <!-- Totals -->
    <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #999;">${oneTimeLabel}</td>
          <td style="padding: 6px 0; text-align: right; font-size: 14px; font-weight: 600; color: #fff;">${formatCurrency(proposal.oneTimeTotal)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 14px; color: #999;">${monthlyLabel}</td>
          <td style="padding: 6px 0; text-align: right; font-size: 14px; font-weight: 600; color: #fff;">${formatCurrency(proposal.monthlyTotal + proposal.hostingFee)}${perMonthShort}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0 0; font-size: 16px; font-weight: 700; border-top: 1px solid #333; color: #fff;">${totalLabel}</td>
          <td style="padding: 10px 0 0; text-align: right; font-size: 22px; font-weight: 800; color: ${BRAND_RED}; border-top: 1px solid #333;">${formatCurrency(proposal.grandTotal)}</td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 16px;">
      <a href="${viewUrl}" style="display: inline-block; background: ${BRAND_RED}; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">${viewButton}</a>
    </div>

    <p style="font-size: 12px; color: #555; text-align: center; margin: 0;">${footer}</p>
  `;

  return wrapEmail(body);
}
