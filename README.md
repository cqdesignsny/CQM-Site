# Creative Quality Marketing Website

The education first marketing website for [Creative Quality Marketing](https://creativequalitymarketing.com), built with Next.js and Tailwind CSS.

Last updated: **April 6, 2026**

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
| `/` | Homepage: Hero, Differentiator, Funnel Teaser, Services Overview, Social Proof, Assessment Promo, ROI Promo, Blog Promo, Newsletter, CTA |
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

### ROI Calculator Methodology

The ROI calculator at `/roi-calculator` uses a multi-factor formula where every input affects the results:

**Step 1: Customers Needed**
```
(Monthly Revenue Goal - Current Revenue) / Average Customer Value = New Customers Needed
```
Higher customer value = fewer customers needed. Already close to your goal = fewer needed.

**Step 2: Recommended Budget** (three components)
```
Acquisition Cost = New Customers Needed x Industry Average CPA
Maintenance Cost = Current Revenue x 4% (to keep existing customers)
Industry Floor  = Revenue Goal x Industry Budget % (8-12% depending on industry)

Recommended Budget = max(Acquisition + Maintenance, Industry Floor)
```
The budget is driven by actual customer acquisition costs, not just a flat percentage. Changing customer value, current revenue, or industry all change the recommendation.

**Step 3: Budget Split (Ads vs Creative)**
The ad/creative split varies dynamically based on budget size:
- Under $1,000/mo: ~20-35% ads, ~65-80% creative (build foundation first)
- $1,000 to $2,500: ~30-45% ads, ~55-70% creative
- $2,500 to $5,000: industry default ratio
- Over $5,000: ~55-65% ads (foundation covered, scale with ads)
- Over $10,000: up to ~65-70% ads

**Step 4: ROI Multiplier**
```
(New Customer Revenue + Current Revenue) / Recommended Budget = ROI Multiplier
```
A 5x return means every $1 invested generates $5 in revenue.

**Step 5: Gap Analysis**
```
Budget Gap = Recommended Budget - Current Spend
Missed Customers = Gap / Average CPA
Missed Revenue = Missed Customers x Customer Value
```

Industry CPA benchmarks (2026, raised ~25% for rising ad costs):
| Industry | CPA Range | Budget % |
|----------|-----------|----------|
| Restaurants | $38-63 | 8% |
| Beauty/Wellness | $50-100 | 10% |
| Fitness | $44-88 | 10% |
| Home Services | $63-125 | 10% |
| Healthcare | $75-150 | 10% |
| Automotive | $63-125 | 8% |
| Real Estate | $88-175 | 12% |
| E-commerce | $25-75 | 12% |
| Professional Services | $100-188 | 12% |
| Legal | $125-250 | 12% |
| Education | $50-100 | 10% |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/proposals` | POST | Create proposal (Notion + Resend + Slack) |
| `/api/proposals/[id]/accept` | POST | Accept proposal |
| `/api/assessment` | POST | Submit assessment |
| `/api/assessment/[id]` | GET | Fetch assessment results |
| `/api/contact` | POST | Contact form submission |
| `/api/newsletter` | POST | Newsletter signup (Resend Audiences) |

### Navigation

How Marketing Works | Services | Studio | About | Tools (hover dropdown: Assessment, Proposals, ROI Calculator) | Blog | Contact

### Lead Capture

| Route | Purpose |
|-------|---------|
| `/api/contact` | Contact form → Notion + Slack + Email to Cesar |
| `/api/assessment` | Assessment → Notion + Slack + Email to Cesar + Email to user (score + plan) |
| `/api/roi-results` | ROI Calculator → Notion + Slack + Email to Cesar + Email to user (analysis) |
| `/api/proposals` | Proposal Builder → Notion + Slack + Email |
| `/api/newsletter` | Newsletter signup → Resend Audiences (name + email + phone) |

All forms have spam protection (honeypot + time check + rate limiting) and newsletter opt-in checkbox.

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

## Remaining To-Do List

### High Priority (Needed for Launch)
1. **Domain migration** from Hostinger to Vercel
2. **Set env vars in Vercel** (Notion, Resend, Slack keys)
3. **Slack webhook**: create #cqm-leads channel, configure Incoming Webhook
4. **Resend domain verification** once on Vercel (unblocks email + newsletter)
5. **Resend audience ID** for newsletter signups

### Medium Priority (Post Launch)
6. **Content agent** for automated blog posts (N8N or Claude scheduled tasks)
7. **Calendly embeds** on Contact + Studio pages
8. **Google Maps embed** on Contact page
9. **Analytics scripts** (GA4, Meta Pixel, TikTok, LinkedIn IDs)
10. **Dedicated OG image** (1200x630 social preview)

### Lower Priority (Ongoing)
11. **Client stories** with real metrics, logos, and case study details
12. **Blog expansion** with more articles and trending topics
13. **Proposal builder / Assessment refinements** based on real usage
14. **Design polish** based on mobile testing and client feedback

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
- Production: `https://creativequalitymarketing.com`

### Domain Portfolio (all live on Vercel, redirecting to primary)

| Domain | Potential Use |
|--------|-------------|
| `creativequalitymarketing.com` | Primary (main site) |
| `cqmteam.com` | Internal/team shorthand |
| `cqmarketer.com` | Personal brand page |
| `cqfunnels.com` | Funnel education lead magnet |
| `cqdesigns.com` / `cqdesigns.co` | Design portfolio/landing page |
| `smartsocialads.com` | Paid ads lead gen landing page |
| `cqdigitalmarketing.com` | SEO landing page |
| `cqmarketing.club` | Community/membership/resource hub |
| `creativequalitymedia.com` | Media/video/podcast showcase |
| `cqdesignsny.com` | Local SEO landing page |

All managed via GoDaddy (nameservers → Vercel). See HANDOFF.md for full strategic breakdown.
