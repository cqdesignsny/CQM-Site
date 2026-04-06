/**
 * Branded email templates for CQM
 *
 * All emails share the same wrapper: CQM logo, dark theme, red accents.
 * Each template receives its content as a body string.
 */

import { siteConfig } from "@/lib/site-config";

const LOGO_URL = "https://creativequalitymarketing.com/images/cqm-logo-white.png";
const BRAND_RED = "#dc2626";
const BRAND_DARK = "#111111";

function emailWrapper(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">
    <!-- Logo -->
    <div style="text-align: center; padding: 24px 16px 20px; background: ${BRAND_RED}; border-radius: 12px 12px 0 0;">
      <img src="${LOGO_URL}" alt="${siteConfig.name}" width="200" style="height: auto; max-width: 200px;" />
    </div>
    <!-- Content Card -->
    <div style="background: ${BRAND_DARK}; border-radius: 0 0 16px 16px; padding: 32px 24px; color: #ffffff;">
      ${body}
    </div>
    <!-- Footer -->
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

function ctaButton(text: string, url: string): string {
  return `<div style="text-align: center; margin-top: 28px;">
    <a href="${url}" style="display: inline-block; background: ${BRAND_RED}; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">${text}</a>
  </div>`;
}

function secondaryLink(text: string, url: string): string {
  return `<p style="text-align: center; margin-top: 12px;">
    <a href="${url}" style="color: #888; font-size: 12px; text-decoration: none;">${text}</a>
  </p>`;
}

function statRow(label: string, value: string, color?: string): string {
  return `<tr>
    <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #222; font-size: 14px;">${label}</td>
    <td style="padding: 10px 0; text-align: right; font-weight: bold; border-bottom: 1px solid #222; font-size: 14px;${color ? ` color: ${color};` : ""}">${value}</td>
  </tr>`;
}

// ─── Assessment Results Email ───

interface AssessmentEmailData {
  name: string;
  overallScore: number;
  categoryScores: { category: string; percentage: number }[];
  recommendedPlan: "startup" | "growth" | "scale";
  assessmentId: string;
}

const planDetails = {
  startup: { name: "Business Startup", price: "$750/mo", color: "#f59e0b", desc: "The essential foundation to get your marketing off the ground." },
  growth: { name: "Business Growth", price: "$1,500/mo", color: BRAND_RED, desc: "Accelerate your visibility and start generating consistent leads." },
  scale: { name: "Business Scale", price: "$3,000/mo", color: "#8b5cf6", desc: "Dominate your market with full service marketing." },
};

export function buildAssessmentEmail(data: AssessmentEmailData): string {
  const scoreColor = data.overallScore >= 70 ? "#22c55e" : data.overallScore >= 40 ? "#f59e0b" : "#ef4444";
  const plan = planDetails[data.recommendedPlan];

  const categoryRows = data.categoryScores
    .map((c) => {
      const barColor = c.percentage >= 70 ? "#22c55e" : c.percentage >= 40 ? "#f59e0b" : "#ef4444";
      return `<tr>
        <td style="padding: 6px 0; color: #999; font-size: 13px; text-transform: capitalize;">${c.category.replace(/-/g, " ")}</td>
        <td style="padding: 6px 0; width: 60%;">
          <div style="background: #222; border-radius: 6px; height: 10px; width: 100%; overflow: hidden;">
            <div style="background: ${barColor}; height: 100%; width: ${c.percentage}%; border-radius: 6px;"></div>
          </div>
        </td>
        <td style="padding: 6px 0; text-align: right; font-weight: bold; color: ${barColor}; width: 45px; font-size: 13px;">${c.percentage}%</td>
      </tr>`;
    })
    .join("");

  const body = `
    <h2 style="color: #fff; margin: 0 0 4px;">Hey ${data.name},</h2>
    <p style="color: #999; margin-top: 0; font-size: 14px;">Here are your marketing assessment results.</p>

    <!-- Score -->
    <div style="text-align: center; padding: 20px 0;">
      <div style="display: inline-block; font-size: 52px; font-weight: bold; color: ${scoreColor};">${data.overallScore}<span style="font-size: 20px; color: #666;">/100</span></div>
    </div>

    <!-- Category Breakdown -->
    <table style="width: 100%; border-collapse: collapse;">${categoryRows}</table>

    <!-- Recommended Plan -->
    <div style="margin-top: 24px; padding: 20px; border: 1px solid ${plan.color}33; border-radius: 12px; background: ${plan.color}0d;">
      <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${plan.color};">Recommended for you</p>
      <h3 style="margin: 0 0 6px; color: #fff; font-size: 18px;">${plan.name} <span style="color: ${plan.color};">${plan.price}</span></h3>
      <p style="margin: 0; color: #999; font-size: 13px;">${plan.desc}</p>
    </div>

    ${ctaButton("Build Your Marketing Plan", `https://creativequalitymarketing.com/proposals?from=assessment&id=${data.assessmentId}`)}
    ${secondaryLink("View your full results online", `https://creativequalitymarketing.com/assessment?results=${data.assessmentId}`)}
  `;

  return emailWrapper(body);
}

// ─── ROI Calculator Results Email ───

interface ROIEmailData {
  name: string;
  industry: string;
  currentRevenue: number;
  revenueGoal: number;
  recommendedBudget: number;
  roiMultiplier: number;
  timelineMonths: string;
}

export function buildROIEmail(data: ROIEmailData): string {
  const roiColor = data.roiMultiplier >= 5 ? "#22c55e" : data.roiMultiplier >= 3 ? "#f59e0b" : "#ef4444";

  const body = `
    <h2 style="color: #fff; margin: 0 0 4px;">Hey ${data.name},</h2>
    <p style="color: #999; margin-top: 0; font-size: 14px;">Here's your personalized marketing budget analysis.</p>

    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      ${statRow("Industry", data.industry)}
      ${statRow("Current Revenue", `$${data.currentRevenue.toLocaleString()}/mo`)}
      ${statRow("Revenue Goal", `$${data.revenueGoal.toLocaleString()}/mo`)}
      ${statRow("Recommended Budget", `$${data.recommendedBudget.toLocaleString()}/mo`, BRAND_RED)}
      ${statRow("Expected ROI", `${data.roiMultiplier}x return`, roiColor)}
      ${statRow("Expected Timeline", data.timelineMonths)}
    </table>

    ${ctaButton("Take the Full Marketing Assessment", "https://creativequalitymarketing.com/assessment")}
    ${secondaryLink("Run the calculator again", "https://creativequalitymarketing.com/roi-calculator")}
  `;

  return emailWrapper(body);
}

// ─── Contact Form Notification (to Cesar) ───

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

// ─── Assessment Notification (to Cesar) ───

interface AssessmentNotificationData {
  name: string;
  email: string;
  phone?: string;
  overallScore: number;
  categoryScores: { category: string; percentage: number }[];
  recommendedPlan: string;
  assessmentId: string;
}

export function buildAssessmentNotificationEmail(data: AssessmentNotificationData): string {
  const scoreColor = data.overallScore >= 70 ? "#22c55e" : data.overallScore >= 40 ? "#f59e0b" : "#ef4444";

  const categoryRows = data.categoryScores
    .map((c) => {
      const barColor = c.percentage >= 70 ? "#22c55e" : c.percentage >= 40 ? "#f59e0b" : "#ef4444";
      return statRow(
        c.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        `<span style="color: ${barColor}; font-weight: bold;">${c.percentage}%</span>`,
      );
    })
    .join("");

  const body = `
    <div style="margin-bottom: 16px; padding: 12px 16px; background: ${BRAND_RED}22; border-radius: 8px; border-left: 4px solid ${BRAND_RED};">
      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${BRAND_RED};">New Assessment Lead</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      ${statRow("Name", data.name)}
      ${statRow("Email", `<a href="mailto:${data.email}" style="color: ${BRAND_RED}; text-decoration: none;">${data.email}</a>`)}
      ${data.phone ? statRow("Phone", `<a href="tel:${data.phone}" style="color: ${BRAND_RED}; text-decoration: none;">${data.phone}</a>`) : ""}
      ${statRow("Overall Score", `<span style="color: ${scoreColor}; font-size: 18px;">${data.overallScore}/100</span>`)}
      ${statRow("Recommended Plan", data.recommendedPlan)}
    </table>

    <h3 style="color: #fff; margin: 20px 0 8px; font-size: 14px;">Score Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse;">${categoryRows}</table>

    ${ctaButton("View in Notion", "https://www.notion.so/b98905d3f971471ea6da0bdc0a1f8af0")}
  `;

  return emailWrapper(body);
}

// ─── ROI Calculator Notification (to Cesar) ───

interface ROINotificationData {
  name: string;
  email: string;
  industry: string;
  currentRevenue: number;
  revenueGoal: number;
  currentSpend: number;
  recommendedBudget: number;
  roiMultiplier: number;
  timelineMonths: string;
}

export function buildROINotificationEmail(data: ROINotificationData): string {
  const roiColor = data.roiMultiplier >= 5 ? "#22c55e" : data.roiMultiplier >= 3 ? "#f59e0b" : "#ef4444";

  const body = `
    <div style="margin-bottom: 16px; padding: 12px 16px; background: ${BRAND_RED}22; border-radius: 8px; border-left: 4px solid ${BRAND_RED};">
      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${BRAND_RED};">New ROI Calculator Lead</p>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      ${statRow("Name", data.name)}
      ${statRow("Email", `<a href="mailto:${data.email}" style="color: ${BRAND_RED}; text-decoration: none;">${data.email}</a>`)}
      ${statRow("Industry", data.industry)}
      ${statRow("Current Revenue", `$${data.currentRevenue.toLocaleString()}/mo`)}
      ${statRow("Revenue Goal", `$${data.revenueGoal.toLocaleString()}/mo`)}
      ${statRow("Current Spend", `$${data.currentSpend.toLocaleString()}/mo`)}
      ${statRow("Recommended Budget", `$${data.recommendedBudget.toLocaleString()}/mo`, BRAND_RED)}
      ${statRow("Expected ROI", `${data.roiMultiplier}x return`, roiColor)}
      ${statRow("Timeline", data.timelineMonths)}
    </table>

    ${ctaButton("View in Notion", "https://www.notion.so/b98905d3f971471ea6da0bdc0a1f8af0")}
  `;

  return emailWrapper(body);
}

// ─── Contact Form Notification (to Cesar) ───

export function buildContactNotificationEmail(data: ContactEmailData): string {
  const body = `
    <div style="margin-bottom: 16px; padding: 12px 16px; background: ${BRAND_RED}22; border-radius: 8px; border-left: 4px solid ${BRAND_RED};">
      <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${BRAND_RED};">New Contact Form Lead</p>
    </div>
    <h2 style="color: #fff; margin: 0 0 16px;">Contact Form Submission</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${statRow("Name", data.name)}
      ${statRow("Email", `<a href="mailto:${data.email}" style="color: ${BRAND_RED}; text-decoration: none;">${data.email}</a>`)}
      ${data.phone ? statRow("Phone", data.phone) : ""}
      ${data.serviceInterest ? statRow("Service Interest", data.serviceInterest) : ""}
    </table>
    <div style="margin-top: 16px; padding: 16px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid ${BRAND_RED};">
      <p style="margin: 0; color: #ccc; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
    </div>
  `;

  return emailWrapper(body);
}
