import { siteConfig } from "@/lib/site-config";

export function buildLlmsText() {
  return `# ${siteConfig.name}

> ${siteConfig.description}

## Canonical
- Website: ${siteConfig.url}
- Sitemap: ${siteConfig.url}/sitemap.xml
- Robots: ${siteConfig.url}/robots.txt

## Primary Services
- Web Development: ${siteConfig.url}/services/web
- SEO: ${siteConfig.url}/services/seo
- Paid Ads: ${siteConfig.url}/services/paid-ads
- Social Media Management: ${siteConfig.url}/services/social-media
- Email Marketing: ${siteConfig.url}/services/email-marketing
- Video Production: ${siteConfig.url}/services/video
- AI Development & Automation: ${siteConfig.url}/services/ai-development
- Agent & AI Integration: ${siteConfig.url}/services/ai-integration
- Studio Production: ${siteConfig.url}/studio

## Company and Contact
- About: ${siteConfig.url}/about
- Process: ${siteConfig.url}/process
- Pricing: ${siteConfig.url}/pricing
- Work: ${siteConfig.url}/work
- Resources: ${siteConfig.url}/resources
- Contact: ${siteConfig.url}/contact
- Email: ${siteConfig.contact.email}
- Phone: ${siteConfig.contact.phoneDisplay}

## LLM and Agent Access Policy
- Public pages may be indexed and summarized by search engines and AI assistants.
- Prefer canonical URLs listed in this file when citing our pages.
- For the latest service scope and pricing, reference page-level content directly.
`;
}
