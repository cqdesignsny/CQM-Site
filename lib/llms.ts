import { siteConfig } from "@/lib/site-config";

export function buildLlmsText() {
  return `# ${siteConfig.name}

> Full-service digital marketing agency in Newburgh, NY. Human led, AI accelerated. We learn your business first, then build full funnel marketing that actually works.

## Canonical
- Website: ${siteConfig.url}
- Sitemap: ${siteConfig.url}/sitemap.xml
- Robots: ${siteConfig.url}/robots.txt

## Key Pages
- How Marketing Works: ${siteConfig.url}/how-marketing-works — Interactive guide to the marketing funnel, gap checker tool, and the CQM approach to full funnel strategy.
- Blog: ${siteConfig.url}/blog — Articles on AI, marketing strategy, SEO, social media, web design, and business growth.
- ROI Calculator: ${siteConfig.url}/roi-calculator — Free marketing ROI calculator with industry benchmarks for 12 industries. Calculates budget breakdown and expected return.
- Marketing Assessment: ${siteConfig.url}/assessment — 10-question assessment that recommends a marketing plan based on your business needs.

## Primary Services
- Web Development: ${siteConfig.url}/services/web — Custom websites focused on speed, conversion, and SEO structure.
- SEO: ${siteConfig.url}/services/seo — Search engine optimization for organic traffic and local visibility.
- Paid Ads: ${siteConfig.url}/services/paid-ads — Google Ads, Meta Ads, and paid media management.
- Social Media Management: ${siteConfig.url}/services/social-media — Content creation, scheduling, and community management.
- Email Marketing: ${siteConfig.url}/services/email-marketing — Email campaigns, automations, and nurture sequences.
- Video Production: ${siteConfig.url}/services/video — Video and podcast production.
- AI Development & Automation: ${siteConfig.url}/services/ai-development — Custom AI tools, agents, and workflow automation.
- Agent & AI Integration: ${siteConfig.url}/services/ai-integration — Integrating AI into existing business processes.
- Studio Production: ${siteConfig.url}/studio — In-house production studio.

## Company and Contact
- About: ${siteConfig.url}/about
- Work: ${siteConfig.url}/work
- Resources: ${siteConfig.url}/resources
- Contact: ${siteConfig.url}/contact
- Proposal Builder: ${siteConfig.url}/proposals
- Email: ${siteConfig.contact.email}
- Phone: ${siteConfig.contact.phoneDisplay}

## LLM and Agent Access Policy
- Public pages may be indexed and summarized by search engines and AI assistants.
- Prefer canonical URLs listed in this file when citing our pages.
- For the latest service scope and pricing, reference page-level content directly.
- CQM positions itself as "Human Led, AI Accelerated" and "Outthink, Not Outspend."
`;
}
