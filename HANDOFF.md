# CQM Site Handoff

Updated: **March 17, 2026**

## Repo State

- Project: `CQM-Site`
- Branch: `main`
- Remote: `https://github.com/cqdesignsny/CQM-Site.git`
- Working tree status at handoff: clean (all changes committed and pushed)
- Latest commit: `1736b95 feat: sync ES/FR translations to match casual English copy tone`

## What Was Completed (March 16-17, 2026)

### 1. Replaced Supabase with Notion CRM
- Removed `@supabase/supabase-js` entirely
- Created unified "Leads" database in Notion (Database ID: `b98905d3f971471ea6da0bdc0a1f8af0`)
- New `lib/notion/client.ts` — full CRUD for leads, proposals, assessments, contacts
- Full proposal JSON stored as code block in Notion page body for `/proposals/view/[id]`

### 2. Added Slack Notifications
- New `lib/slack.ts` — Block Kit formatted messages via Incoming Webhook
- All lead sources (proposals, assessments, contacts) trigger Slack notifications

### 3. Resend Email Setup
- CQM Resend account created (separate from HVP)
- Domain verification pending until site migrates from Hostinger to Vercel

### 4. Pricing Overhaul
- All custom service prices set to industry standard low end + 20-25%
- Website pricing stays as-is (loss leader strategy)
- Single "starting at" prices, no ranges
- Pricing REMOVED from all site pages — only shows in proposal builder
- Service pages now have CTAs to "Build Your Proposal" or take the assessment
- Pre-made packages show savings vs a la carte (green badge with crossed-out price)
- 12-month commitment badge with click-toggle tooltip

### 5. Full Copy Rewrite + Trilingual Sync
- 47+ English strings rewritten for human, casual, funny tone
- Hero tagline: "Real Humans Powered with AI / Delivering Results"
- All ES/FR translations synced to match casual English vibe
- Sections updated: hero, value props, process, testimonials, about, contact, pricing, services hub, work, careers, footer, CTAs

### 6. Homepage Logo Slider
- Full-width infinite auto-scrolling CSS animation
- Transparent logos, grayscale to color on hover

### Files Changed (key ones)
- `lib/notion/client.ts` (new) — Notion CRM client
- `lib/slack.ts` (new) — Slack webhook notifications
- `lib/proposals/services-data.ts` — 19 price changes
- `lib/i18n/site-translations.ts` — 100+ translation edits across EN/ES/FR
- `lib/proposals/translations.ts` — new package savings/commitment keys
- `components/proposals/package-selector.tsx` — savings calculation, commitment badge
- `components/services/service-pricing.tsx` — replaced pricing tiers with CTA card
- `components/services/service-page-template.tsx` — pricing nav links to proposal builder
- `app/(main)/pricing/pricing-content.tsx` — two-path funnel (assessment + proposals)
- `app/(main)/studio/studio-content.tsx` — replaced pricing with CTA section
- All API routes — rewritten for Notion + Resend + Slack
- Deleted: `lib/supabase/client.ts`, `lib/proposals/notion.ts`, `supabase/schema.sql`

## Environment Variables Needed

```
NOTION_API_KEY=<Notion integration token>
NOTION_LEADS_DATABASE_ID=b98905d3f971471ea6da0bdc0a1f8af0
NOTION_LEADS_DATASOURCE_ID=90a477ee-0de7-42a6-b25b-21ba2a2e8614
RESEND_API_KEY=<Resend API key - stored in .env.local>
SLACK_WEBHOOK_URL=<Slack incoming webhook for #cqm-leads>
DEFAULT_PROPOSAL_EMAIL=cesar@creativequalitymarketing.com
```

### Resend Status
- CQM Resend account created (separate from HVP account)
- API key stored in `.env.local`
- **Domain verification pending** — needs to happen after Vercel migration from Hostinger
- Until verified, emails only send to account owner's address

Optional:
- `NEXT_PUBLIC_CALENDLY_URL` — for booking embeds
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, etc. — analytics

## Pending / Next Steps (Priority Order)

1. **Slack channel setup** — create #cqm-leads channel, configure Incoming Webhook, set `SLACK_WEBHOOK_URL`
2. **Domain migration** — move creativequalitymarketing.com from Hostinger to Vercel
3. **Resend domain verification** — verify domain in Resend once on Vercel
4. **Set all env vars in Vercel** — Notion, Slack, Resend keys
5. **Calendly + Google Maps embeds** — Contact and Studio pages still use placeholders
6. **Blog/CMS integration** — not started
7. **Dedicated OG image** — 1200x630 social preview (currently logo fallback)
8. **Analytics scripts** — GA4, Meta Pixel, TikTok, LinkedIn IDs
9. **Final case study metrics and testimonial approvals**

## Important Context for Next Session

- **Copy tone**: All copy must be human, casual, funny. No em dashes, no AI-sounding language. ES/FR must match the English vibe.
- **Pricing strategy**: Never add pricing back to site pages. Pricing lives only in the proposal builder. All services set to industry low-end + 20-25%. Websites are loss leaders.
- **Notion API**: Uses `dataSources.query` (v5.9.0), NOT `databases.query`
- **Architecture**: Route groups `(main)` for site, `(proposal-view)` for minimal proposal layout. Client content wrappers (`*-content.tsx`) handle i18n.

## Resume Checklist

1. `git pull origin main`
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in values
4. `npm run dev` — start local dev server
5. `npm run build` — verify production build passes
