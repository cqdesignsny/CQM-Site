# CQM Site Handoff

Updated: **April 4, 2026**

## Repo State

- Project: `CQM-Site`
- Branch: `main`
- Remote: `https://github.com/cqdesignsny/CQM-Site.git`
- Vercel: `https://cqm-site.vercel.app` (auto deploys from `main`)
- Working tree: clean (all changes committed and pushed)

## Site Direction

Education first sales tool. NOT a typical agency service listing site. The site teaches prospects what marketing is, explains the marketing funnel, and functions as a sales tool Cesar can pull up in any meeting.

**Key messaging:**
- "Real Humans Powered with AI, Delivering Results"
- "When your competition outspends you, we outthink them"
- "Human led, AI accelerated" (AI is support/speed, NOT the driver)
- We learn your business first, then build marketing around what makes you different

**Copy tone:** Human, casual, funny, personable, knowledgeable. No dashes of any kind. Comedy woven throughout. Like talking to a friend who happens to be really good at marketing.

## What Was Built (April 4, 2026 — Session 3: Design Polish)

### Vertical Background Text Effect
Inspired by SCM Ink's design, added large vertical text as a subtle background element on section sides. Uses `writing-mode: vertical-lr` at 4% opacity, alternating left/right sides across sections. Reusable `VerticalText` component at `components/ui/vertical-text.tsx`.

Applied to:
- **Homepage**: OUTTHINK (differentiator), FUNNEL (funnel teaser), SERVICES (services overview), PROOF (social proof), ASSESS (assessment promo), ROI (ROI promo), LEARN (blog promo), INBOX (newsletter), GROW (CTA banner)
- **How Marketing Works**: PROBLEM, STAGES, GAPS, EDGE, PROCESS
- **ROI Calculator**: CALCULATE, METHOD
- **Service pages**: START (lead capture CTA)

### Spacing Audit & Fixes
- **Footer logo**: Increased ~50% bigger (h-8 → h-12, sm:h-9 → sm:h-14)
- **Services page**: Added `mb-16` between "Ready to get started" button and CTABanner
- **About page**: Added `mb-12` to CTA section before CTABanner
- **Studio page**: Increased Packages CTA padding from `py-10` to `py-16 md:py-20`
- **Contact page**: Added `mt-12` wrapper before CTABanner
- **How Marketing Works**: Added `mt-4` wrapper before CTABanner

## What Was Built (April 4, 2026 — Session 2: Major Feature Round)

### Navigation & Layout
1. **Navigation restructured**: Added "Tools" dropdown with Assessment, Proposal Builder, ROI Calculator. Added "Blog" as standalone nav item. Contact remains visible.
2. **Footer logo**: Replaced text name with the CQM logo image in the footer brand column.

### Homepage New Sections (after SocialProof, before Newsletter)
3. **Assessment Promo section**: Red background, stat pills (10 Questions, 2 Minutes, Personalized Plan), animated assessment score mockup on desktop, direct CTA to /assessment.
4. **ROI Calculator Promo section**: Black background, animated preview stats (avg budget, ROI, industries), CTA to /roi-calculator.
5. **Blog Promo section**: Dark zinc background, latest 3 blog posts with images/categories/read times, CTA to /blog.

### ROI Calculator Improvements
6. **Industry selector moved to top**: Industry is now the first input so users set context before entering numbers.
7. **Expected Results Timeline**: New section in results panel shows estimated timeline (in months) based on spend ratio vs recommended budget. Ranges from "very long" (12-18 months at <40% budget) to "fast" (1-3 months at >180% budget). Includes visual bar, color coding, and messaging about speeding up results by increasing budget.

### Copy & Content Fixes
8. **Stage 3 funnel copy**: Changed "Yelp reviews" to "Google reviews", merged "checking your Google rating" into one sentence.
9. **Stage 4 "How we fix it"**: Added "Payment & Booking Systems" to the services list.
10. **Proposal packages**: Startup plan now says "3 Social Media Posts per Week, Monthly". Growth plan says "Social Media Management (2 Platforms, 5 Posts/Week)". All three languages updated.

## What Was Built (April 4, 2026 — Laura's Feedback Round)

### UX/Copy Improvements from User Testing
1. **Funnel color gradient (cold to hot)**: Funnel stages now go from blue (Awareness/cold) → purple (Interest) → orange (Decision) → red (Action/hot), visually teaching the concept as users scroll. Applied to both homepage FunnelTeaser and HowMarketingWorks MarketingFunnel components.
2. **Funnel storytelling unified**: All 4 stages now tell one continuous story about opening a restaurant, carried from Awareness through Action. Previously jumped between restaurant and med spa examples.
3. **Newsletter copy fixed**: Removed "No fluff" (flagged as AI sounding). Now reads "No spam. Just the stuff that actually helps you grow."
4. **SEO page**: Updated FAQ to include listings beyond Google Business Profile (Yelp, Apple Maps, Bing Places, and other directories).
5. **Paid Ads page**: Added TikTok Ads to platform list. Added 2 new FAQs ("What if I've never run ads before?" and "How do you measure if ads are working?").
6. **Email Marketing page**: Added new FAQ about platform support ("Can you work with whatever platform we're already using?") listing Klaviyo, Mailchimp, HubSpot, ActiveCampaign, ConvertKit, Constant Contact.

## What Was Built (March 29-30, 2026)

### Site Restructure
1. **Navigation simplified** from 9 items to 5: How Marketing Works, Services, Studio, About, Contact
2. **Homepage completely rebuilt**: Hero > Differentiator > Funnel Teaser > Services Overview > Social Proof > Newsletter Section > CTA Banner
3. **/how-marketing-works** centerpiece education page: interactive funnel with 4 expandable stages, gap checker, CQM difference, AI advantage callout, process section
4. **/process redirects** to /how-marketing-works (permanent redirect in next.config.ts)

### New Tools
5. **Blog system** at /blog: 18 full articles (800+ words each), 3 per category, category filters, Unsplash images, internal linking, external source references, SEO optimized
6. **ROI Calculator** at /roi-calculator: 5 inputs (current revenue, revenue goal, customer value, current spend, industry), dynamic budget breakdown (ads vs creative), 12 industries, ROI multiplier, gap analysis, full methodology explanation
7. **Newsletter signup**: footer component + homepage section, Resend Audiences API integration

### Page Updates
8. **Service pages refocused**: funnel context ("Where This Fits in Your Marketing Funnel") + cross sell ("This Is Only One Piece of the Puzzle") added to all 8 service detail pages
9. **Assessment shortened**: 24 to 10 questions (one per category), now recommends flagship plans (Startup/Growth/Scale) instead of individual services
10. **Studio page expanded**: 13 real studio photos, 6 offering cards (podcast, video, content room, conference room, custom sets, post production), equipment highlights
11. **About page**: simplified, team focused, AI advantage mention
12. **Work page**: approach focused, "what we discovered" per client
13. **Resources page**: removed placeholders, added blog + how marketing works promos
14. **AI framing corrected**: "AI-Driven Service" changed to "Human Led, AI Accelerated" on all service pages

### SEO/AEO
15. **Full SEO audit**: sitemap updated with dynamic blog entries, BlogPosting schema on blog posts, BreadcrumbList on new pages, WebApplication schema on ROI calculator
16. **llms.txt updated**: new pages and positioning
17. **Metadata optimized**: all titles under 60 chars, descriptions under 160 chars
18. **Internal linking**: strong connections across all pages verified

### Infrastructure
19. **Newsletter API**: POST /api/newsletter with Resend Audiences
20. **Blog data system**: lib/blog/types.ts + articles.ts with helper functions
21. **Funnel components**: components/funnel/ with reusable funnel visualizations

## Remaining To-Do List (Priority Order)

### High Priority (Needed for Launch)
1. **Domain migration**: Move `creativequalitymarketing.com` from Hostinger to Vercel
2. **Set env vars in Vercel**: NOTION_API_KEY, NOTION_LEADS_DATABASE_ID, NOTION_LEADS_DATASOURCE_ID, RESEND_API_KEY, RESEND_AUDIENCE_ID, SLACK_WEBHOOK_URL, DEFAULT_PROPOSAL_EMAIL
3. **Slack webhook**: Create #cqm-leads channel, configure Incoming Webhook URL
4. **Resend domain verification**: Verify creativequalitymarketing.com in Resend once on Vercel (unblocks full email flow and newsletter)
5. **Resend audience ID**: Create an audience in Resend dashboard, set RESEND_AUDIENCE_ID env var to activate newsletter signups

### Medium Priority (Post Launch)
6. **Content agent**: Set up automated blog posting via N8N or Claude scheduled tasks. Agent should search for latest AI, marketing, business, and design news, write articles in Cesar's voice, and publish to the blog
7. **Calendly embeds**: Replace placeholder blocks on Contact and Studio pages with actual Calendly booking widget (needs NEXT_PUBLIC_CALENDLY_URL)
8. **Google Maps embed**: Replace placeholder on Contact page
9. **Analytics scripts**: GA4, Meta Pixel, TikTok Pixel, LinkedIn Partner ID (env vars ready, just need the IDs)
10. **Dedicated OG image**: Create 1200x630 social preview image (currently falls back to logo)

### Lower Priority (Ongoing)
11. **Client stories**: Get real metrics, logos, and case study details for Advanced Skin Med Spa, Mark Vieira Comedy, Rectified, Level Aesthetics, Elko
12. **Blog content expansion**: More articles, deeper content, trending topics
13. **Proposal builder refinements**: Any UX tweaks based on client feedback (currently off limits per Cesar)
14. **Assessment refinements**: Tweak scoring weights or question wording based on real usage data
15. **Design polish**: Mobile responsiveness review, animation performance, card design iteration based on Cesar's feedback

## Environment Variables

```env
# Required for production
NOTION_API_KEY=<Notion integration token>
NOTION_LEADS_DATABASE_ID=b98905d3f971471ea6da0bdc0a1f8af0
NOTION_LEADS_DATASOURCE_ID=90a477ee-0de7-42a6-b25b-21ba2a2e8614
RESEND_API_KEY=<CQM Resend account key>
SLACK_WEBHOOK_URL=<Slack incoming webhook for #cqm-leads>
DEFAULT_PROPOSAL_EMAIL=cesar@creativequalitymarketing.com

# Newsletter
RESEND_AUDIENCE_ID=<Resend audience ID for newsletter subscribers>

# Optional
NEXT_PUBLIC_CALENDLY_URL=<Calendly embed URL>
NEXT_PUBLIC_GA4_ID=<Google Analytics 4 ID>
NEXT_PUBLIC_META_PIXEL_ID=<Meta Pixel ID>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<TikTok Pixel ID>
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=<LinkedIn Partner ID>
```

## Important Context for Next Session

- **Copy tone**: Human, casual, funny. No dashes. Comedy throughout. Mirror how Cesar actually talks.
- **AI framing**: "Human led, AI accelerated." AI is NEVER the driver. Humans drive everything, AI supports.
- **Key phrase**: "When your competition outspends you, we outthink them." This is the whole brand.
- **Pricing**: NEVER on site pages. Only in proposal builder. Loss leader websites.
- **Notion API**: Uses `dataSources.query` (v5.9.0), NOT `databases.query`
- **Assessment**: 10 questions now (was 24). Recommends plans not individual services.
- **Blog**: Static data in lib/blog/articles.ts. Ready for Notion CMS or content agent integration.
- **N8N**: Available for building automation agents.
- **Architecture**: Route groups `(main)` for site, `(proposal-view)` for proposals. Client content wrappers handle i18n.

## Resume Checklist

1. `git pull origin main`
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in values
4. `npm run dev`
5. `npm run build` to verify
