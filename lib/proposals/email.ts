import { Resend } from "resend";
import type { Proposal, Locale, SelectedService } from "./types";
import { t } from "./translations";
import { getServiceName, formatCurrency } from "./calculations";
import { CATEGORIES, getServiceById } from "./services-data";
import { siteConfig } from "@/lib/site-config";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing RESEND_API_KEY environment variable");
  return new Resend(apiKey);
}

const DEFAULT_FROM = `Creative Quality Marketing <proposals@${siteConfig.url.replace("https://", "")}>`;

/**
 * Send the proposal email to the prospect and BCC to the sales rep / default inbox.
 */
export async function sendProposalEmail(
  proposal: Proposal,
  locale: Locale
): Promise<void> {
  const resend = getResendClient();
  const defaultEmail =
    process.env.DEFAULT_PROPOSAL_EMAIL || siteConfig.contact.email;
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
    process.env.DEFAULT_PROPOSAL_EMAIL || siteConfig.contact.email;

  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #000; padding: 24px; text-align: center;">
        <h1 style="color: #fff; font-size: 20px; margin: 0;">${siteConfig.name}</h1>
      </div>
      <div style="padding: 32px 24px; background-color: #fff;">
        <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <p style="font-size: 24px; margin: 0 0 8px;">&#10003;</p>
          <h2 style="color: #166534; font-size: 18px; margin: 0 0 8px;">${t("email.acceptedSubject", locale)}!</h2>
          <p style="color: #15803d; margin: 0;">${proposal.contact.name} ${t("email.acceptedBody", locale)}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Client</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${proposal.contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 8px 0; text-align: right;">${proposal.contact.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Total</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #cc0000;">${formatCurrency(proposal.grandTotal)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Proposal</td>
            <td style="padding: 8px 0; text-align: right;"><a href="${siteConfig.url}/proposals/view/${proposal.id}" style="color: #cc0000;">${proposal.id}</a></td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0;">${siteConfig.name} &middot; ${siteConfig.contact.streetAddress}, ${siteConfig.contact.locality}, ${siteConfig.contact.region}</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: DEFAULT_FROM,
    to: [defaultEmail],
    subject: `${t("email.acceptedSubject", locale)} — ${proposal.contact.name}`,
    html,
  });
}

/**
 * Build the styled HTML email for a proposal.
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

  // Group services by category
  const serviceRows = proposal.selectedServices
    .map((s) => {
      const service = getServiceById(s.serviceId);
      const name = getServiceName(s.serviceId, locale);
      const qty = s.quantity > 1 ? ` x${s.quantity}` : "";
      const price = formatCurrency(s.unitPrice * s.quantity);
      const billing = service
        ? t(`billing.${service.billing}`, locale)
        : "";
      return `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${name}${qty}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px; white-space: nowrap;">
            ${price} <span style="color: #9ca3af; font-size: 12px;">${billing}</span>
          </td>
        </tr>
      `;
    })
    .join("");

  const customRows = proposal.customLineItems
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;">${item.name}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; text-align: right; font-size: 14px;">${formatCurrency(item.price)}</td>
        </tr>
      `
    )
    .join("");

  const discountRow =
    proposal.discountAmount > 0
      ? `
        <tr>
          <td style="padding: 10px 0; font-size: 14px; color: #16a34a;">${t("label.discount", locale)}</td>
          <td style="padding: 10px 0; text-align: right; font-size: 14px; color: #16a34a;">-${formatCurrency(proposal.discountAmount)}</td>
        </tr>
      `
      : "";

  const hostingRow =
    proposal.hostingFee > 0
      ? `
        <tr>
          <td style="padding: 10px 0; font-size: 14px; color: #6b7280;">${t("label.hosting", locale)}</td>
          <td style="padding: 10px 0; text-align: right; font-size: 14px;">${formatCurrency(proposal.hostingFee)}${perMonthShort}</td>
        </tr>
      `
      : "";

  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header -->
      <div style="background-color: #000000; padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 4px; letter-spacing: 0.5px;">${siteConfig.name.toUpperCase()}</h1>
        <p style="color: #cc0000; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">${t("proposal.title", locale)}</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px;">
        <p style="font-size: 16px; color: #111; margin: 0 0 8px;">${greeting} ${proposal.contact.name},</p>
        <p style="font-size: 14px; color: #4b5563; margin: 0 0 24px; line-height: 1.6;">${intro}</p>

        <!-- Services Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 2px solid #e5e7eb; font-weight: 700; font-size: 13px; text-transform: uppercase; color: #6b7280;">Service</td>
            <td style="padding: 10px 0; border-bottom: 2px solid #e5e7eb; text-align: right; font-weight: 700; font-size: 13px; text-transform: uppercase; color: #6b7280;">Price</td>
          </tr>
          ${serviceRows}
          ${customRows}
          ${hostingRow}
          ${discountRow}
        </table>

        <!-- Totals -->
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #374151;">${oneTimeLabel}</td>
              <td style="padding: 6px 0; text-align: right; font-size: 14px; font-weight: 600;">${formatCurrency(proposal.oneTimeTotal)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #374151;">${monthlyLabel}</td>
              <td style="padding: 6px 0; text-align: right; font-size: 14px; font-weight: 600;">${formatCurrency(proposal.monthlyTotal + proposal.hostingFee)}${perMonthShort}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0 0; font-size: 16px; font-weight: 700; border-top: 1px solid #e5e7eb;">${totalLabel}</td>
              <td style="padding: 10px 0 0; text-align: right; font-size: 20px; font-weight: 800; color: #cc0000; border-top: 1px solid #e5e7eb;">${formatCurrency(proposal.grandTotal)}</td>
            </tr>
          </table>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${viewUrl}" style="display: inline-block; background-color: #cc0000; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">${viewButton}</a>
        </div>

        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">${footer}</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">${siteConfig.name}</p>
        <p style="margin: 4px 0 0;">${siteConfig.contact.streetAddress}, ${siteConfig.contact.locality}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}</p>
        <p style="margin: 4px 0 0;">${siteConfig.contact.phoneDisplay} &middot; ${siteConfig.contact.email}</p>
      </div>
    </div>
  `;
}
