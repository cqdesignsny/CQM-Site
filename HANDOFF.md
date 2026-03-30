# CQM Site Handoff

Updated: **March 29, 2026**

## Repo State

- Project: `CQM-Site`
- Branch: `main`
- Remote: `https://github.com/cqdesignsny/CQM-Site.git`

## Major Restructure: Education First Sales Tool (March 29, 2026)

### Strategic Direction
The entire site was restructured from a "list of services" agency website into an **education first sales tool**. The site now teaches prospects what marketing is, explains the marketing funnel, and positions CQM as the agency that learns your business first. Key messaging throughout: "When your competition outspends you, we outthink them."

### What Changed

#### 1. Navigation Simplified (9 items to 5)
- **New nav:** How Marketing Works | Services | Studio | About | Contact
- Assessment, Proposals, Work, Resources, Blog moved to footer
- `/process` now redirects to `/how-marketing-works`

#### 2. Homepage Completely Rebuilt
New flow: Hero > Differentiator > Funnel Teaser > Services Overview > Social Proof > CTA Banner
- Hero: "Real Humans Powered with AI / Delivering Results" with AI advantage subtitle
- Differentiator: 4 pillars with glow/shine hover effects
- Funnel teaser: actual funnel shape (narrowing widths), interactive expandable stages
- Services grouped by funnel stage (Get Found, Convert Visitors, Tell Your Story, Scale Smarter)
- Social proof: featured testimonial + scrolling logos
- Removed: Case Studies, Resources Teaser, old Process, old 9 card Value Props

#### 3. New Page: /how-marketing-works (Centerpiece)
Full education page for use in sales meetings:
- Problem statement ("Most Businesses Are Marketing Blindfolded")
- Interactive marketing funnel with 4 expandable stages, service links, warning callouts
- Gap checker (4 yes/no questions leading to full Assessment)
- CQM Difference section with AI Advantage callout
- Process section (Discovery, Strategy, Execution, Optimization)
- Bottom CTA (Assessment + Strategy Call)

#### 4. Blog System Built
- `/blog` listing page with category filters, featured articles, hover effect cards
- `/blog/[slug]` dynamic article pages with related articles
- 5 seed articles on AI, marketing funnels, SEO, social media, outthinking competitors
- Blog data system in `lib/blog/` (types.ts + articles.ts)

#### 5. Newsletter Signup
- Component in footer with email input
- API route `/api/newsletter` integrates with Resend Audiences
- Needs `RESEND_AUDIENCE_ID` env var to activate

#### 6. Service Pages Refocused
All 8 service detail pages now include:
- "Where This Fits in Your Marketing Funnel" mini funnel visualization
- "This Is Only One Piece of the Puzzle" cross sell section with complementary services

#### 7. Assessment Shortened
- Reduced from 24 questions to 10 (one per category)
- Same 10 categories, same scoring algorithm, just faster to complete
- Scoring and recommendations unchanged

#### 8. Supporting Pages Updated
- About: shortened story, team focused, AI advantage mention
- Work: approach focused, "what we discovered" per client
- Resources: removed placeholders, added blog + how marketing works promos

### Files Created
- `app/(main)/how-marketing-works/` (page + content)
- `app/(main)/blog/` (listing page)
- `app/(main)/blog/[slug]/` (article pages)
- `app/api/newsletter/route.ts`
- `components/sections/differentiator.tsx`
- `components/sections/funnel-teaser.tsx`
- `components/sections/services-overview.tsx`
- `components/sections/social-proof.tsx`
- `components/funnel/marketing-funnel.tsx`
- `components/funnel/funnel-gap-checker.tsx`
- `components/newsletter-signup.tsx`
- `lib/blog/types.ts`
- `lib/blog/articles.ts`

### Files Modified (key ones)
- `components/header.tsx` (5 item nav)
- `components/footer.tsx` (new links + newsletter signup)
- `app/(main)/page.tsx` (new homepage section lineup)
- `components/sections/hero.tsx` (new CTA link)
- `components/services/service-page-template.tsx` (funnel context + cross sell)
- All 8 service content files (new props)
- `lib/i18n/site-translations.ts` (200+ new keys)
- `lib/assessment/questions.ts` (24 to 10 questions)
- `app/sitemap.ts` (new routes)
- `next.config.ts` (/process redirect)
- `app/(main)/about/about-content.tsx`
- `app/(main)/work/work-content.tsx`
- `app/(main)/resources/resources-content.tsx`

## Environment Variables

```
NOTION_API_KEY=<Notion integration token>
NOTION_LEADS_DATABASE_ID=b98905d3f971471ea6da0bdc0a1f8af0
NOTION_LEADS_DATASOURCE_ID=90a477ee-0de7-42a6-b25b-21ba2a2e8614
RESEND_API_KEY=<CQM Resend account key>
RESEND_AUDIENCE_ID=<Resend audience ID for newsletter>
SLACK_WEBHOOK_URL=<Slack incoming webhook for #cqm-leads>
DEFAULT_PROPOSAL_EMAIL=cesar@creativequalitymarketing.com
```

## Pending / Next Steps

1. **Content agent setup** for auto blog posts (N8N or Claude scheduled tasks)
2. **Studio page expansion** with real HVP photos
3. **Slack webhook** configuration
4. **Domain migration** from Hostinger to Vercel
5. **Resend domain verification** + audience ID setup
6. **Calendly + Google Maps embeds**
7. **Dedicated OG image** (1200x630)
8. **Analytics scripts** (GA4, Meta Pixel, TikTok, LinkedIn)
9. **Final client stories** with real metrics and logos

## Important Context

- **Copy tone**: Human, casual, funny, personable, knowledgeable. Like talking to a friend who happens to be really good at marketing. No dashes. No AI sounding language.
- **Key messaging**: "When your competition outspends you, we outthink them." AI advantage throughout.
- **Pricing**: Never on site pages. Only in proposal builder.
- **Notion API**: Uses `dataSources.query` (v5.9.0), NOT `databases.query`
- **Assessment**: Now 10 questions (was 24). Same scoring.
