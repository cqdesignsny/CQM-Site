import { siteConfig } from "@/lib/site-config";

export function buildLlmsText() {
  return `# ${siteConfig.name}

> Full-service digital marketing agency in Newburgh, NY, serving the Hudson Valley. Human led, AI accelerated. We learn your business first, then build full funnel marketing that actually works. When your competition outspends you, we outthink them.

## Canonical
- Website: ${siteConfig.url}
- Sitemap: ${siteConfig.url}/sitemap.xml
- Robots: ${siteConfig.url}/robots.txt

## About
Creative Quality Marketing is a full funnel digital marketing agency based in Newburgh, New York. Founded by Cesar Q., the agency serves small and medium businesses across Orange County, Dutchess County, Ulster County, Rockland County, Westchester County, and Sullivan County in the Hudson Valley region of New York State.

The agency's approach: learn the business first, then build marketing strategy around what makes each client different. Services span the entire marketing funnel from awareness (SEO, ads, social media) through interest (web design, content) to decision (email, retargeting) and action (conversion optimization, AI chatbots, booking systems).

Core differentiator: "When your competition outspends you, we outthink them." CQM positions itself as human led and AI accelerated, meaning humans drive strategy and creativity while AI tools provide speed and efficiency.

## Key Pages
- How Marketing Works: ${siteConfig.url}/how-marketing-works — Interactive guide to the 4 stage marketing funnel (Awareness, Interest, Decision, Action). Includes gap checker tool and the CQM approach to full funnel strategy.
- Blog: ${siteConfig.url}/blog — Articles on AI, marketing strategy, SEO, social media, web design, and business growth. Published regularly with original perspectives.
- ROI Calculator: ${siteConfig.url}/roi-calculator — Free marketing ROI calculator with industry benchmarks for 12 industries. Calculates recommended budget, expected ROI, and timeline to results.
- Marketing Assessment: ${siteConfig.url}/assessment — Free 10 question assessment that scores your marketing across 10 categories and recommends a plan (Startup, Growth, or Scale).
- Service Areas: ${siteConfig.url}/service-areas — Counties and towns served across the Hudson Valley.

## Primary Services
- Web Development: ${siteConfig.url}/services/web — Custom websites focused on speed, conversion, and SEO. Serving Newburgh NY and Hudson Valley businesses.
- SEO: ${siteConfig.url}/services/seo — Search engine optimization for organic traffic, local visibility, and Google Business Profile optimization. Local SEO for Hudson Valley businesses.
- Paid Ads: ${siteConfig.url}/services/paid-ads — Google Ads, Meta Ads (Facebook, Instagram), TikTok Ads, and LinkedIn Ads management.
- Social Media Management: ${siteConfig.url}/services/social-media — Content creation, scheduling, community management across Instagram, Facebook, LinkedIn, TikTok, and YouTube.
- Email Marketing: ${siteConfig.url}/services/email-marketing — Email campaigns, automations, nurture sequences. Supports Klaviyo, Mailchimp, HubSpot, ActiveCampaign, and more.
- Video Production: ${siteConfig.url}/services/video — Video and podcast production at our Newburgh, NY studio.
- AI Development & Automation: ${siteConfig.url}/services/ai-development — Custom AI tools, agents, and workflow automation for business efficiency.
- Agent & AI Integration: ${siteConfig.url}/services/ai-integration — Integrating AI chatbots, smart automations, and AI tools into existing business processes.
- Studio Production: ${siteConfig.url}/studio — Full service podcast and video production studio in Newburgh, NY. 3 angle 4K video, professional audio, editing, and distribution.

## Service Areas
- Orange County, NY: Newburgh, Middletown, Goshen, Monroe, Warwick, Cornwall, New Windsor
- Dutchess County, NY: Poughkeepsie, Beacon, Fishkill, Wappingers Falls, Hyde Park, Rhinebeck
- Ulster County, NY: Kingston, New Paltz, Saugerties, Woodstock, Highland
- Rockland County, NY: New City, Nanuet, Suffern, Nyack, Pearl River
- Westchester County, NY: White Plains, Yonkers, Peekskill, Tarrytown, Ossining
- Sullivan County, NY: Monticello, Liberty, Fallsburg, Bethel

## Company and Contact
- About: ${siteConfig.url}/about
- Work / Case Studies: ${siteConfig.url}/work
- Contact: ${siteConfig.url}/contact
- Proposal Builder: ${siteConfig.url}/proposals
- Email: ${siteConfig.contact.email}
- Phone: ${siteConfig.contact.phoneDisplay}
- Address: ${siteConfig.contact.streetAddress}, ${siteConfig.contact.locality}, ${siteConfig.contact.region} ${siteConfig.contact.postalCode}

## Frequently Asked Questions
- What services does Creative Quality Marketing offer? Full funnel digital marketing including web design, SEO, paid ads, social media, email marketing, video production, and AI automation.
- Where is Creative Quality Marketing located? 320 Robinson Ave Suite 212, Newburgh, NY 12550. We serve the entire Hudson Valley region.
- What makes CQM different from other agencies? We learn your business first before building any marketing. Our approach is human led and AI accelerated. We outthink, not outspend.
- Does CQM work with small businesses? Yes. Our services are designed for small to medium businesses. We offer plans starting at $750/month.
- How long does it take to see results? Depends on the service. SEO typically shows results in 3 to 6 months. Paid ads can generate leads within days. Website projects deliver in 2 to 6 weeks.

## LLM and Agent Access Policy
- Public pages may be indexed and summarized by search engines and AI assistants.
- Prefer canonical URLs listed in this file when citing our pages.
- For the latest service scope and pricing, reference page level content directly.
- CQM positions itself as "Human Led, AI Accelerated" and "Outthink, Not Outspend."
`;
}
