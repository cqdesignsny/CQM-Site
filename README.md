# Creative Quality Marketing Website Rebuild

This is the in-progress rebuild/redesign of [creativequalitymarketing.com](https://creativequalitymarketing.com) using Next.js (App Router) and Tailwind CSS.

Last updated: **February 25, 2026**

## 1) Project Goals

- Rebuild the website with a modern, fast, scalable architecture.
- Preserve and improve current business messaging and service offerings.
- Replace placeholders with production-ready content, forms, media, and integrations.
- Keep this README as the single handoff source for any developer or AI tool (Cursor, Claude Code, etc.).

## 2) Tech Stack

- Next.js `15.5.12` (App Router)
- React `19.2.4`
- TypeScript (strict mode)
- Tailwind CSS + `class-variance-authority`
- Radix UI primitives (Accordion, Slot)
- Framer Motion (section animations)
- Supabase (database for proposals & assessments)
- Notion API (CRM pipeline integration)
- Resend (transactional email)
- nanoid (URL-friendly proposal IDs)

## 3) Current Build Status

### What is built

- Site shell: global layout, header, footer, metadata baseline
- SEO foundation:
  - Central metadata helper with canonical/open graph/twitter defaults (`lib/seo.ts`)
  - `robots.txt` route (`app/robots.ts`)
  - XML sitemap route (`app/sitemap.ts`)
  - Organization + LocalBusiness + WebSite JSON-LD injected in layout
  - Service `FAQPage` schema + `Service` + `BreadcrumbList` schema on service detail pages
  - Services overview `ItemList` schema
  - LLM discovery endpoints:
    - `/llms.txt`
    - `/.well-known/llms.txt`
- Homepage sections:
  - Hero
  - Trust logos
  - Value props/services
  - Case studies teaser
  - Process teaser
  - Testimonials teaser
  - Resources teaser
- Core pages:
  - Services overview
  - Service detail pages (web + all linked service routes) now using a unified, richer template
  - Studio page
  - Contact page
  - About, Work, Process, Pricing, Resources, Careers (content-filled v1)
- Repository and collaboration setup:
  - Local git repo initialized in project root
  - Remote connected and synced to GitHub (`main`)
  - Vercel deployment active: `https://cqm-site.vercel.app`
  - README maintained as handoff source-of-truth for Cursor/Claude/other dev tools

### Proposal Builder & Marketing Assessment (New)

- **Proposal Builder** (`/proposals`): Public tool for building custom marketing packages
  - 48 services across 10 categories with trilingual EN/ES/FR support
  - 3 pre-built packages: Startup ($750), Growth ($1,500), Scale ($3,000)
  - Custom line items and discount fields
  - 3-step wizard: Build -> Review -> Send
  - Saves to Supabase, syncs to Notion CRM, sends branded email via Resend
  - Shareable proposal links at `/proposals/view/[id]`
  - Proposal acceptance flow with confirmation + notification
  - Print/download via browser `window.print()` with optimized `@media print` styles
  - Webhook support for n8n / external automation (WEBHOOK_URL env var)

- **Marketing Assessment** (`/assessment`): Lead-gen diagnostic quiz
  - 24 questions across 10 marketing categories
  - Scores each category 0-100% with overall marketing health score
  - Recommends services based on low-scoring categories (< 60%)
  - Lead capture gate before showing results
  - "Build Your Package" CTA feeds recommendations into the proposal builder
  - Saves to Supabase, fires webhook events for n8n

- **Proposal View Page** (`/proposals/view/[id]`): Clean branded layout (no site nav)
  - Server-rendered with dynamic OG metadata
  - Service breakdown grouped by category with descriptions
  - Pricing summary with discount visualization
  - Accept button with confirmation flow
  - Stale notice if proposal > 30 days old
  - `noindex` to protect private proposal data

### Internationalization (i18n) — Unified Trilingual EN/ES/FR

- **ONE language switcher** in the site header — no per-component Globe toggles
- **Unified locale source**: All components read locale from the site-wide `LanguageProvider` context
- **Bridge pattern**: `useProposalLocale()` hook connects site-wide context to proposal/assessment components
- **Key files**:
  - `lib/i18n/context.tsx` — React context + provider + `useLanguage()` hook
  - `lib/i18n/use-proposal-locale.ts` — bridge hook returning `{ locale, pt }` for proposal/assessment components
  - `lib/i18n/site-translations.ts` — ~1100+ trilingual translation keys (EN/ES/FR) for all site pages
  - `lib/proposals/translations.ts` — ~200+ trilingual translation keys for proposal builder, assessment, emails
  - `components/language-switcher.tsx` — EN/ES/FR dropdown toggle in header
- **Coverage**: ALL user-facing pages are fully wired for trilingual switching:
  - Homepage sections: hero, value props, case studies, process, testimonials, resources teaser, trust logos
  - Core pages: about, contact, careers, process, work, pricing, resources, studio
  - Services hub page (including feature lists) + all 8 service detail pages
  - Header, footer, contact form
  - Proposal builder (full trilingual — reads locale from site context via bridge hook)
  - Marketing assessment (full trilingual — reads locale from site context via bridge hook)
  - Case studies metadata, work page spotlights, about page team members
- **Architecture**:
  - Server components (`page.tsx`) handle metadata only
  - Client content wrappers (`*-content.tsx`) use `useLanguage()` + `t()` for all UI strings
  - Proposal/assessment components use `useProposalLocale()` + `pt()` for translations from proposal translation file
  - Translation key naming: `section.key` for pages, `sd.{svc}.{field}` for service detail pages, `services.feat.{svc}.{n}` for service features
  - Type unification: `Locale` in proposals re-exports `SiteLocale` from i18n types
  - Proposal view page uses stored `proposal.locale` from database (correct: shows language proposal was created in)
  - Designed for future locale additions (add language to `SiteLocale` union + translation entries in both files)

- **Architecture**:
  - Route groups: `(main)` for site pages with header/footer, `(proposal-view)` for minimal proposal layout
  - `useReducer` for complex state management in builder (15+ interdependent state vars)
  - JSONB service snapshots in Supabase (immune to future price changes)
  - New proposal per revision (version history, each gets its own link)
  - Package selection auto-populates services (stays on build step so user can review before continuing)
  - API routes: `POST /api/proposals`, `POST /api/proposals/[id]/accept`, `POST /api/assessment`, `GET /api/assessment/[id]`

- **n8n / Agent Readiness**:
  - All API routes fire webhook events to `WEBHOOK_URL` when set
  - Events: `proposal_created`, `proposal_accepted`, `assessment_completed`
  - Payloads include full contact info, scores, totals, locale, timestamps, and financial breakdowns
  - `proposal_accepted` webhook includes: locale, grandTotal, oneTimeTotal, monthlyTotal, packageId
  - Supabase tables accessible via API for custom agent queries

### What is still placeholder/incomplete

- Contact form UX and CRM automation can still be expanded (form already posts to `/api/contact`)
- Calendly embeds (Contact + Studio)
- Google Maps embed
- Dedicated OG/social share image asset (currently falls back to logo)
- Final approved case-study metrics and testimonial approvals
- Blog/CMS/MDX integration
- Real analytics scripts and event destinations
- Final brand visual system refinement (typography, color system polish, motion pass)
- Supabase tables need to be created (SQL in plan file)
- Environment variables needed: Supabase, Notion, Resend, WEBHOOK_URL (see `.env.example`)

## 4) Changes Completed In This Session

### A. Centralized business config

Created `lib/site-config.ts` and moved reusable business data into one source:

- Company name
- Domain
- Core description/tagline
- Contact email/phone
- Address
- Logo path

### B. Site-wide contact and identity alignment

Updated these files to use `site-config`:

- `app/layout.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- `app/contact/page.tsx`
- `components/seo/default-seo.tsx`

Notes:

- Header logo path fixed to `/images/cqm-logo.png`.
- Placeholder contact details were replaced with live-site-aligned values.
- Structured data now references centralized values instead of hardcoded placeholders.

### C. Added missing service detail routes (previously linked but unbuilt)

Added:

- `app/services/seo/page.tsx`
- `app/services/paid-ads/page.tsx`
- `app/services/social-media/page.tsx`
- `app/services/email-marketing/page.tsx`
- `app/services/video/page.tsx`

Each includes:

- Hero
- Outcomes
- Deliverables
- Process
- Pricing component
- FAQs
- Lead capture CTA

### D. Expanded sparse pages and homepage content experience

Built out the previously thin pages with complete sections and AI-forward positioning:

- `app/about/page.tsx`
- `app/process/page.tsx`
- `app/work/page.tsx`
- `app/pricing/page.tsx`
- `app/resources/page.tsx`
- `app/careers/page.tsx`

Homepage section upgrades:

- `components/sections/case-studies.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/resources-teaser.tsx`
- `components/sections/value-props.tsx`
- `components/sections/hero.tsx`

Notes:

- Replaced placeholder scaffolding with production-style content structure.
- Removed broken internal links to unbuilt detail routes (`/work/[slug]`, `/resources/[slug]`).
- Increased emphasis on AI-enabled workflows across key marketing pages.

## 5) Route Map (Current)

### Homepage + company

- `/` (built)
- `/about` (built)
- `/contact` (built, integrations pending)
- `/careers` (built)
- `/process` (built)

### Services

- `/services` (built)
- `/services/web` (built)
- `/services/seo` (built)
- `/services/paid-ads` (built)
- `/services/social-media` (built)
- `/services/email-marketing` (built)
- `/services/video` (built)

### Portfolio/content

- `/work` (built)
- `/resources` (built)
- `/pricing` (built)
- `/studio` (built, booking/media integrations pending)
- `/llms.txt` (built)
- `/.well-known/llms.txt` (built)

### Proposal Builder & Assessment

- `/proposals` (built - proposal builder UI)
- `/proposals/view/[id]` (built - shareable proposal view page, minimal layout)
- `/assessment` (built - marketing assessment quiz)

### API Routes

- `POST /api/proposals` (built - create proposal)
- `POST /api/proposals/[id]/accept` (built - accept proposal)
- `POST /api/assessment` (built - submit assessment)
- `GET /api/assessment/[id]` (built - fetch assessment results)

## 6) Live Site Research Notes (for content alignment)

Primary source: [creativequalitymarketing.com](https://creativequalitymarketing.com)

Pages reviewed:

- [Home](https://creativequalitymarketing.com)
- [Our Story](https://creativequalitymarketing.com/our-story/)
- [Services](https://creativequalitymarketing.com/services/)
- [Plans](https://creativequalitymarketing.com/plans/)
- [Clients](https://creativequalitymarketing.com/clients/)
- [Contact](https://creativequalitymarketing.com/contact/)

Observed important info to keep aligned:

- Positioning: full-service digital marketing + media/podcast/video production
- Core services: website design/development, SEO, paid ads, social media, email marketing, video
- Studio/media branch references (also linked to HV Podcasting)
- Contact details currently shown on live Contact page:
  - Address: `320 Robinson Ave Suite 212, Newburgh, NY 12550`
  - Phone: `8459789617`
  - Email: `Cesar@creativequalitymarketing.com`

## 7) Immediate Next Priorities

1. Finalize approved production copy for testimonials and case-study proof points.
2. Implement production contact handling:
   - Tally/Typeform embed or custom API route + provider
   - Remove mock `alert()` behavior
3. Add Calendly + Google Maps embeds.
4. Build full `/work` case study system:
   - Data model (local JSON/MDX/CMS)
   - Listing page + individual detail pages
5. Build `/resources` system:
   - MDX or headless CMS
   - Categories, SEO metadata, internal linking
6. Finalize analytics:
   - GA4/Meta/LinkedIn/TikTok IDs from env
   - Verify events
7. Add dedicated OG/social preview image asset (`1200x630`) and wire it as the default preview image.
8. Add production embeds (Calendly + Maps) and validate structured data in Google Rich Results Test.
9. Run visual design pass for stronger, differentiated brand direction.

## 8) Local Development

From project root:

```bash
cp .env.example .env.local
npm install
npm run dev
```

Other scripts:

```bash
npm run lint
npm run build
npm run start
```

## 9) Handoff Notes

- Project root is: `/Users/cqmarketing/Dropbox/-CQ Main/CQ Cursor Site/New App`
- GitHub repository: `https://github.com/cqdesignsny/CQM-Site.git`
- Primary branch: `main`
- This project is now a git repository and tracks `origin/main`.
- Current deployed Vercel URL: `https://cqm-site.vercel.app`
- Continue updating this README on each major change:
  - What changed
  - Why it changed
  - What remains
  - Any assumptions/questions requiring business confirmation

## 10) Credentials & Access Checklist

- Important security rule:
  - Do **not** store passwords, API secrets, or private keys in this README or in git-tracked files.
  - Store secrets in local `.env.local` and in Vercel project environment variables.

- Required platform access:
  - GitHub repo access: `https://github.com/cqdesignsny/CQM-Site.git` (push rights on `main` or PR workflow)
  - Vercel project access (deployments, domains, environment variables)
  - Domain/DNS provider access for `creativequalitymarketing.com` cutover
  - Google Search Console + Google Analytics access (post-launch validation)

- Environment variables to configure (template in `.env.example`):
  - `NEXT_PUBLIC_CALENDLY_URL`
  - `NEXT_PUBLIC_GA4_ID`
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
  - `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NOTION_API_KEY`
  - `NOTION_PROPOSALS_DATABASE_ID`
  - `NOTION_ASSESSMENTS_DATABASE_ID`
  - `RESEND_API_KEY`
  - `DEFAULT_PROPOSAL_EMAIL`
  - `WEBHOOK_URL` (optional - for n8n / external automation)

## 11) Deployment Notes

- Vercel deployment status:
  - Live preview URL: `https://cqm-site.vercel.app`
  - Canonical domain remains `https://creativequalitymarketing.com` (intended for final cutover)
  - Production branch should be set to `main` in Vercel project settings.
  - If a deployment fails on an older commit, deploy the latest `main` commit instead of redeploying the failed old commit.

- Local development runs with Next.js:
  - Default: `npm run dev`
  - If port `3000` is in use, run `npm run dev -- --port 3001`
- Recent local preview URL used:
  - `http://localhost:3001`

- Production build caveat in restricted/offline environments:
  - `next build` may fail if `fonts.googleapis.com` is unreachable because `next/font/google` needs network access.
  - In normal connected environments this should compile successfully.

## 12) SEO + AEO Audit (Snapshot)

Audit date: **February 18, 2026**

### A. Technical SEO status

- Indexability: **Pass**
  - Global robots allow crawling and indexing.
  - `robots.txt` and sitemap are published routes.
- Crawlability: **Pass**
  - Sitemap includes all core routes plus `llms.txt` endpoints.
  - Internal linking across service and conversion pages is present.
- Metadata coverage: **Pass**
  - All page routes use `buildPageMetadata(...)` for canonical, Open Graph, and Twitter consistency.
  - Root layout has `metadataBase`, robots directives, and shared defaults.
- Structured data coverage: **Pass**
  - Global: `Organization`, `LocalBusiness`, `WebSite`.
  - Services detail pages: `Service`, `BreadcrumbList`, `FAQPage`.
  - Services overview: `ItemList`.
- On-page fundamentals: **Pass**
  - One primary H1 per route and semantic section hierarchy is present.
  - Images include alt text in key sections.

### B. AEO / LLM readiness status

- LLM endpoint support: **Pass**
  - `/llms.txt` and `/.well-known/llms.txt` publish machine-readable site summary + canonical service URLs.
- AI crawler access policy: **Pass**
  - `robots.txt` explicitly allows known AI crawler user agents in addition to wildcard allow.
- Answer-oriented content: **Pass**
  - Service pages include strong Q&A sections backed by `FAQPage` schema.
- Entity clarity: **Pass**
  - Business identity, contact details, service taxonomy, and process pages are consistently linked and structured.

### C. Remaining production items (not blockers for indexing)

- Contact form API is live (`POST /api/contact`), but Calendly/Maps embeds and deeper CRM automations are still pending.
- Calendly and Google Maps embeds are placeholders.
- Dedicated OG image asset still pending (currently logo fallback).
- Validate live deployment in Google Search Console + Rich Results Test after production release.

## 13) Change Log

- **2026-02-25 (Session 4)**
  - Moved language picker next to hamburger menu on mobile — always visible without opening the menu
  - Previously the language switcher was hidden inside the mobile dropdown menu
  - Updated documentation and memory files

- **2026-02-25 (Session 5)**
  - Fixed service lead CTA routing bug so "Build Your Custom Package" reliably navigates to `/proposals`
  - Corrected assessment recommendation mapping to valid service IDs used by the proposal builder
  - Switched `/process` page to the i18n-enabled `process-content.tsx` implementation
  - Added French support to assessment share emails (`/api/assessment/share`)
  - Persisted `assessment_id` when creating proposals from assessment flow
  - Hardened Supabase schema policy script to scope policies to `service_role`
  - Restricted Next.js remote image host allowlist to `creativequalitymarketing.com`

- **2026-02-25 (Session 7)**
  - Proposal builder package logic hardened to prevent stacking behavior
  - Selecting a pre-made package now resets prior custom data:
    - clears custom line items
    - clears discount state
    - repopulates selected services from the chosen package only
  - Switching to "Build Custom" now exits package mode cleanly and resets package selections
  - Builder reducer now force-switches to custom mode when user manually edits services/custom items/discount
  - Added global branded red scrollbar styling site-wide in `app/globals.css` (WebKit + Firefox)

- **2026-02-25 (Session 6)**
  - Translation audit pass completed for site + proposal i18n usage
  - Verified translation key coverage with literal-key scan:
    - `site_defined=977`, `site_used_literal=658`, `site_missing_used=0`
    - `proposal_defined_en=125`, `proposal_used_literal=60`, `proposal_missing_used=0`
    - Proposal parity check: `es=0` missing, `fr=0` missing vs EN keyset
  - Localized remaining hardcoded proposal UI strings:
    - `Try Again` button
    - `Shareable link:` label
    - package `Show less` / `+N more`
    - monthly suffix in proposal UI from hardcoded `/mo` to locale key
  - Localized remaining hardcoded site UI strings:
    - mobile menu + language switcher aria labels
    - Contact/Studio Calendly placeholder text
    - Contact map placeholder text
  - Fixed French date formatting in proposal acceptance badge (`fr-FR` instead of fallback `en-US`)
  - Localized proposal emails:
    - monthly suffix now uses locale-aware `label.perMonthShort`
    - acceptance notification subject/body now use `proposal.locale` translation
  - Localized proposal not-found screen via proposal translation keys
  - Added new translation keys:
    - Site: `contact.mapPlaceholder`, `common.toggleMenu`, `common.changeLanguage`, `common.calendlyPlaceholder`, `common.calendlyEnvHint`
    - Proposals: `label.perMonthShort`, `btn.tryAgain`, `success.shareableLink`, `package.showLess`, `package.more`
  - Validation: `npm run lint` and `npx tsc --noEmit` both pass

- **2026-02-25 (Session 3)**
  - Site-wide CTA strategy: funnel all pages to Assessment + Proposal Builder
  - Created reusable `CTABanner` component (`components/sections/cta-banner.tsx`) with 4 variants: full, compact, assessment, builder
  - Added CTA banners to: homepage, services hub, work, about, process, resources, contact, studio, careers
  - Updated hero: second CTA now links to `/assessment` ("Take the Free Marketing Quiz") instead of `/contact`
  - Updated all 8 service detail page lead captures: CTAs now point to `/proposals` and `/assessment`
  - Updated pricing page: replaced bottom CTA with dual assessment + builder cards
  - Fixed Proposal Builder white bar at bottom (added `min-h-screen` to wrapper)
  - Added "Start Over" button to proposal builder header (visible when selections exist)
  - Changed package selection to NOT auto-advance to review step — stays on build step so users can review
  - Reordered nav: Assessment, Proposals, Services, Studio, Work, Process, Resources, About, Contact
  - Removed Pricing from header nav (kept page for SEO value)
  - Updated footer: new "Tools" column with Assessment + Proposals prominently listed
  - Added 12 new site-wide CTA translation keys (EN/ES/FR) + `nav.proposals` + `footer.tools` + `btn.startOver`

- **2026-02-25 (Session 2)**
  - Unified i18n system: ONE language switcher in the header, removed Globe toggles from proposal builder and assessment
  - Created bridge hook `useProposalLocale()` connecting site-wide LanguageProvider to proposal/assessment components
  - Unified Locale type: proposals re-export `SiteLocale` from `lib/i18n/types.ts`
  - Fixed package selection flow: clicking a pre-built package populates services on the build step
  - Removed search bar from proposal builder (unnecessary UX friction)
  - Fixed white space at bottom of proposal review step
  - Added ~79 missing translation keys across site pages:
    - 24 service hub feature keys (`services.feat.{svc}.{1|2|3}`)
    - 15 case study metadata keys (`cs.{client}.{industry|desc|h1|h2|h3}`)
    - 30 work page spotlight keys (`work.spot.{client}.{focus|s1|s2|s3|impact}`)
    - 10 about page team member keys (`about.team.{member}.{role|summary}`)
  - Replaced all inline ternary translations in assessment with `pt()` calls
  - Enriched webhook payloads: added locale, oneTimeTotal, monthlyTotal, packageId to `proposal_accepted` event
  - Fixed assessment API locale type from `"en" | "es"` to full `Locale` type (includes `"fr"`)
  - Build passes cleanly: zero errors, all 31 pages compiled

- **2026-02-25 (Session 1)**
  - Added full trilingual internationalization (EN/ES/FR) across the entire site
  - Created i18n infrastructure: `LanguageProvider` context, `useLanguage()` hook, `LanguageSwitcher` component
  - Built `lib/i18n/site-translations.ts` with ~1000+ translation keys covering all pages
  - Converted all homepage sections to use i18n: hero, value props, case studies, process, testimonials, resources teaser, trust logos
  - Converted all core pages to client content wrappers with i18n: about, contact, careers, process, work, pricing, resources, studio
  - Converted services hub page and all 8 service detail pages to i18n with `sd.*` translation keys
  - Converted header, footer, and contact form to use `useLanguage()` for all UI strings
  - Updated service template components (`service-page-template.tsx`, `service-pricing.tsx`, `service-faqs.tsx`) for i18n
  - Added language switcher (EN/ES/FR pill toggle) to site header
  - Moved all pages into `app/(main)/` route group (pages already existed under route group from proposal build)
  - Updated `package.json` with `@supabase/supabase-js`, `@notionhq/client`, `resend`, `nanoid` dependencies

- **2026-02-24**
  - Integrated Proposal Builder from standalone vanilla JS app into Next.js site
  - Added route groups `(main)` and `(proposal-view)` for dual-layout support
  - Built complete data layer: types, 48-service catalog, bilingual translations, calculations
  - Added Supabase client (server + browser), Notion CRM integration, Resend email integration
  - Created API routes: `POST /api/proposals`, `POST /api/proposals/[id]/accept`, `POST /api/assessment`, `GET /api/assessment/[id]`
  - Built proposal builder UI: package selector, category tabs, service cards, custom items editor, discount field, summary sidebar, review step, contact/send step
  - Built proposal view page with accept flow, print styles, stale notice, dynamic OG metadata
  - Built marketing assessment: 24-question quiz across 10 categories, scoring engine, recommendations, lead capture
  - Added webhook support to all API routes for n8n / external automation
  - Updated nav (header + footer), sitemap, robots.txt, and analytics event types
  - Installed dependencies: `resend`, `@notionhq/client`, `@supabase/supabase-js`, `nanoid`

- **2026-02-18**
  - Added `README.md` baseline documentation.
  - Centralized business/contact config in `lib/site-config.ts`.
  - Updated site-wide metadata/contact/schema/logo references.
  - Added missing service routes for SEO, Paid Ads, Social Media, Email Marketing, and Video Production.
  - Expanded `about`, `process`, `work`, `pricing`, `resources`, and `careers` from scaffold pages to full content pages.
  - Updated homepage sections to remove placeholder content and broken links.
  - Added stronger AI-agency positioning throughout core messaging.
  - Added new home service cards: AI Development & Automation, and Agent & AI Integration.
  - Added new service routes: `/services/ai-development` and `/services/ai-integration`.
  - Updated studio package pricing/tiers:
    - Recording Only: `$250/session` (1 hour, audio + video)
    - Content Shoot: `$350/session` (2 hours, shooting + editing)
    - Full-Scale Production/Commercial: `$1,500/day` (6-8 hour full day)
  - Updated pricing plans and baseline monthly starts:
    - `Startup` starting at `$750/mo`
    - `Growth` starting at `$1,500/mo`
    - `Scale` starting at `$3,000/mo`
  - Migrated live Resources affiliate logos/links into `/resources` tool grid.
  - Updated About team to match live direction (Cesar, Laura, Kevin, Dennis, Broly) and added core values wheel section.
  - Applied broader brand styling pass with stronger red/black accents across header, footer, hero, and key content sections.
  - Switched header logo to a white version for dark navigation readability (`public/images/cqm-logo-white.png`).
  - Updated Studio package naming and visibility:
    - Renamed `Recording Only` to `Podcast Session`
    - Hid Professional Equipment section from UI
    - Saved current equipment draft in `lib/studio-equipment-draft.ts`
  - Increased interactivity and hover states across major cards and linked surfaces.
  - Increased logo size and removed nested logo-box containers in client/resource cards.
  - Updated home Client Spotlight cards on black section to larger white cards for stronger logo visibility.
  - Performed full service-page redesign pass using a shared template (`components/services/service-page-template.tsx`) with:
    - Branded hero treatment
    - In-page section nav anchors
    - Improved outcomes/deliverables/process card layouts
    - Service + breadcrumb JSON-LD per service page
  - Refactored all service pages to use the new template:
    - `/services/web`
    - `/services/seo`
    - `/services/paid-ads`
    - `/services/social-media`
    - `/services/email-marketing`
    - `/services/video`
    - `/services/ai-development`
    - `/services/ai-integration`
  - Enhanced shared service components:
    - `components/services/service-pricing.tsx`
    - `components/services/service-faqs.tsx`
    - `components/services/service-lead-capture.tsx`
  - Added global crawl/index assets:
    - `app/robots.ts`
    - `app/sitemap.ts`
  - Added reusable metadata builder (`lib/seo.ts`) and applied it across core pages for stronger canonical + OG/Twitter consistency.
  - Added full SEO/AEO enhancement pass:
    - Added `WebSite` JSON-LD in layout.
    - Added service-level `FAQPage` schema in shared service template.
    - Added services `ItemList` schema on `/services`.
    - Expanded `robots.txt` policy to explicitly allow major AI crawler agents.
    - Added LLM discovery routes:
      - `/llms.txt`
      - `/.well-known/llms.txt`
    - Added `lib/llms.ts` as centralized LLM text source.
  - Completed code-level SEO/AEO audit and documented pass/follow-up checklist in this README.
  - Initialized local git repository in project root and linked remote:
    - `origin -> https://github.com/cqdesignsny/CQM-Site.git`
  - Committed current rebuild as initial repository commit:
    - `48f6e6d Initial rebuild: CQM site redesign with SEO and AEO`
  - Pushed all local project files to GitHub `main` branch.
  - Updated README to reflect current repository state, deployment notes, and current local/remote workflow.
  - Resolved Vercel security-blocked deployment by upgrading patched package versions:
    - `next` -> `^15.5.12` (from `15.5.6`)
    - `eslint-config-next` -> `^15.5.12`
    - `react` / `react-dom` -> `^19.2.4`
    - `@types/react` -> `^19.2.14`
    - `@types/react-dom` -> `^19.2.3`
  - Pushed security upgrade commit:
    - `4993bb9 fix: upgrade Next.js and React to patched security versions`
  - Pushed deployment trigger commit for Vercel after version patch:
    - `a3fa760 chore: trigger fresh vercel deployment on patched next`
  - Verified live deployment and endpoint checks on Vercel:
    - `https://cqm-site.vercel.app/` -> `200`
    - `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/.well-known/llms.txt` -> `200`
  - Updated README with credentials/access checklist and deployment verification notes.
