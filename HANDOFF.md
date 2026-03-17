# CQM Site Handoff

Updated: **March 16, 2026**

## Repo State

- Project: `CQM-Site`
- Branch: `main`
- Remote: `https://github.com/cqdesignsny/CQM-Site.git`
- Working tree status at handoff: clean

## What Was Completed Most Recently (March 16, 2026)

### Major: Replace Supabase with Notion CRM + Add Slack Notifications

- **Removed Supabase entirely** — deleted `@supabase/supabase-js`, `lib/supabase/client.ts`, `supabase/schema.sql`
- **Created Notion CRM** — unified "Leads" database inside a "CQM CRM" page in Notion
  - Database ID: `b98905d3f971471ea6da0bdc0a1f8af0`
  - Data Source ID: `90a477ee-0de7-42a6-b25b-21ba2a2e8614`
  - Properties: Name, Email, Phone, Source (Proposal/Assessment/Contact Form), Status (New/Contacted/Negotiating/Won/Lost), Lead ID, Score, Grand Total, Package, Proposal Link, etc.
- **New `lib/notion/client.ts`** — all CRUD operations for leads, proposals, assessments, contacts
  - Full proposal JSON stored as code block in Notion page body for `/proposals/view/[id]`
  - Uses `@notionhq/client` v5.9.0 (`dataSources.query` instead of `databases.query`)
- **New `lib/slack.ts`** — Slack Incoming Webhook notifications with Block Kit formatting
- **All API routes rewritten** to use Notion + Resend + Slack (no more Supabase)
- **Homepage logo slider** — full-width infinite auto-scrolling CSS animation, transparent logos, grayscale → color on hover

### Files Changed

- `lib/notion/client.ts` (new)
- `lib/slack.ts` (new)
- `app/api/proposals/route.ts` — Notion + Resend + Slack
- `app/api/proposals/[id]/accept/route.ts` — Notion + Resend + Slack
- `app/api/assessment/route.ts` — Notion + Slack
- `app/api/assessment/[id]/route.ts` — Notion query
- `app/api/contact/route.ts` — Notion + Resend + Slack
- `app/(proposal-view)/proposals/view/[id]/page.tsx` — Notion fetch
- `components/sections/trust-logos.tsx` — infinite scroll slider
- `tailwind.config.ts` — logo-scroll keyframes
- `.env.example` — updated vars
- `package.json` — removed Supabase
- Deleted: `lib/supabase/client.ts`, `lib/proposals/notion.ts`, `supabase/schema.sql`

## Environment Variables Needed

```
NOTION_API_KEY=<Notion integration token>
NOTION_LEADS_DATABASE_ID=b98905d3f971471ea6da0bdc0a1f8af0
NOTION_LEADS_DATASOURCE_ID=90a477ee-0de7-42a6-b25b-21ba2a2e8614
RESEND_API_KEY=<Resend API key>
SLACK_WEBHOOK_URL=<Slack incoming webhook for #cqm-leads>
DEFAULT_PROPOSAL_EMAIL=cesar@creativequalitymarketing.com
```

### Resend Status

- **CQM Resend account created** (separate from HVP account)
- API key stored in `.env.local`
- **Domain verification pending** — `creativequalitymarketing.com` needs to be verified in Resend once the site goes live on Vercel (switching from Hostinger)
- Until domain is verified, emails can only be sent to the account owner's address
- Once live: verify domain in Resend → update `from` addresses in email templates → full email flow works

Optional:
- `NEXT_PUBLIC_CALENDLY_URL` — for booking embeds
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, etc. — analytics

## Pending / Next Steps

1. **Pricing updates** — proposal builder pricing, logic, and wording changes (user has updates to discuss)
2. **Resend domain verification** — verify `creativequalitymarketing.com` in Resend once site goes live on Vercel (switching from Hostinger)
3. **Slack channel** — create #cqm-leads channel and set up Incoming Webhook
4. **Calendly + Google Maps embeds** — Contact and Studio pages
5. **Spanish tone normalization** — `tú` vs `usted` across translations
6. **Blog/CMS integration** — not yet started

## Resume Checklist

1. `git pull origin main`
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in values
4. `npm run dev` — start local dev server
5. `npm run build` — verify production build passes
