# Creative Quality Marketing Website

The education first marketing website for [Creative Quality Marketing](https://creativequalitymarketing.com), built with Next.js and Tailwind CSS.

Last updated: **March 29, 2026**

## Quick Resume

- Read [HANDOFF.md](./HANDOFF.md) for the latest implementation snapshot
- Branch: `main` | Remote: `https://github.com/cqdesignsny/CQM-Site.git`
- Vercel: `https://cqm-site.vercel.app` (auto deploys from `main`)

```bash
npm install && npm run dev
```

## Site Direction

This is NOT a typical agency website that lists services. It is an **education first sales tool** that:

1. Teaches prospects what marketing is and what a marketing funnel looks like
2. Shows CQM's process and differentiator (learn the business first, then build)
3. Functions as a tool for sales meetings, client education, and self learning
4. Positions CQM as: "When your competition outspends you, we outthink them"

**Key messaging:** Human led, AI accelerated. We learn your business first. Outthink, not outspend.

**Copy tone:** Human, casual, funny, personable, knowledgeable. No dashes. No corporate speak.

## Tech Stack

- Next.js 15.5.12 (App Router) + React 19.2.4
- TypeScript (strict) + Tailwind CSS
- Framer Motion (animations)
- Notion API v5.9.0 (CRM via `dataSources.query`)
- Resend (transactional email + newsletter audiences)
- Slack Incoming Webhooks (lead notifications)
- Trilingual i18n (EN/ES/FR) via custom context + translation files

## Site Structure

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage: Hero, Differentiator, Funnel Teaser, Services Overview, Social Proof, Newsletter, CTA |
| `/how-marketing-works` | Centerpiece education page: funnel diagram, gap checker, CQM difference, process |
| `/blog` | Blog listing with 18 articles, category filters, featured images |
| `/blog/[slug]` | Individual blog articles with related posts |
| `/roi-calculator` | Interactive ROI calculator with budget breakdown and gap analysis |
| `/services` | Services hub grouped by funnel stage |
| `/services/[slug]` | 8 service detail pages with funnel context and cross sell |
| `/assessment` | 10 question marketing assessment quiz (was 24, streamlined) |
| `/proposals` | Proposal builder: 48 services, 3 packages, custom line items |
| `/proposals/view/[id]` | Shareable proposal view with accept flow |
| `/studio` | Studio page with HVP photos and booking |
| `/about` | Team, values, AI advantage story |
| `/work` | Client spotlights with "what we discovered" approach |
| `/contact` | Contact form with Notion CRM + Slack integration |
| `/resources` | Blog promo, How Marketing Works promo, affiliate tools |
| `/pricing` | Two path funnel (Assessment or Proposal Builder) |
| `/careers` | Hiring page |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/proposals` | POST | Create proposal (Notion + Resend + Slack) |
| `/api/proposals/[id]/accept` | POST | Accept proposal |
| `/api/assessment` | POST | Submit assessment |
| `/api/assessment/[id]` | GET | Fetch assessment results |
| `/api/contact` | POST | Contact form submission |
| `/api/newsletter` | POST | Newsletter signup (Resend Audiences) |

### Navigation (5 items)

How Marketing Works | Services | Studio | About | Contact

Assessment, Proposals, Blog, Work, Resources, ROI Calculator accessible via footer and CTAs.

## Key Architecture Patterns

- **Route groups:** `(main)` for site pages with header/footer, `(proposal-view)` for minimal proposal layout
- **i18n:** Server `page.tsx` (metadata) + client `*-content.tsx` (uses `useLanguage()` + `t()`)
- **Blog:** Static data in `lib/blog/articles.ts` (ready for Notion CMS or content agent)
- **Funnel components:** Reusable funnel visualizations in `components/funnel/`
- **Service template:** Shared template with funnel context and cross sell sections
- **Assessment:** 10 questions, 1 per category, recommends flagship plans (Startup/Growth/Scale)

## Environment Variables

```env
# Required
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

## Remaining Items

1. **Content agent** for automated blog posts (N8N or scheduled tasks)
2. **Studio images** need real local photos (HVP remote URLs may be blocked by Cloudflare)
3. **Slack webhook** configuration
4. **Domain migration** from Hostinger to Vercel
5. **Resend domain verification** + audience ID for newsletter
6. **Calendly + Google Maps** embeds (Contact + Studio pages)
7. **Dedicated OG image** (1200x630)
8. **Analytics scripts** (GA4, Meta Pixel, TikTok, LinkedIn)
9. **Final client stories** with real metrics and logos

## Local Development

```bash
cp .env.example .env.local   # Fill in values
npm install
npm run dev                   # http://localhost:3000
npm run build                 # Production build
npm run lint                  # Linting
```

## Deployment

- Vercel auto deploys from `main`
- Preview: `https://cqm-site.vercel.app`
- Production: `https://creativequalitymarketing.com` (pending domain migration)
