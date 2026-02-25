# CQM Site Handoff

Updated: **February 25, 2026**

## Repo State

- Project: `CQM-Site`
- Branch: `main`
- Remote: `https://github.com/cqdesignsny/CQM-Site.git`
- Latest commit pushed: `c292b2a`
- Working tree status at handoff: clean

## What Was Completed Most Recently

### Commit `c292b2a` (latest)

- Fixed proposal package selection behavior so packages are exclusive (no stacking).
- Selecting any pre-made package now:
  - replaces proposal services with that package's service IDs only
  - clears custom line items
  - clears discount state
- Switching to "Build Custom" now exits package mode cleanly and resets package selections.
- Added global red branded scrollbar styles in `app/globals.css` (Firefox + WebKit).
- Updated README changelog for Session 7.

### Commit `5d265d8` (prior major pass)

- Completed translation audit cleanup for proposal + site UI.
- Removed remaining hardcoded i18n strings in audited components.
- Added missing translation keys and parity updates (`en/es/fr`).
- Fixed locale handling in proposal acceptance dates and proposal emails.
- Localized proposal not-found UI.
- Updated README changelog for Session 6.

## Files Touched in Latest Two Commits

- `lib/proposals/reducer.ts`
- `components/proposals/proposal-builder.tsx`
- `app/globals.css`
- `lib/proposals/translations.ts`
- `lib/i18n/site-translations.ts`
- `lib/proposals/email.ts`
- `components/proposals/*` (accept/contact/review/summary/document/package selector)
- `components/header.tsx`
- `components/language-switcher.tsx`
- `app/(main)/contact/contact-page-content.tsx`
- `app/(main)/studio/studio-content.tsx`
- `app/(proposal-view)/proposals/view/[id]/not-found.tsx`
- `README.md`

## Pending Integrations / Inputs Needed

The app is feature-complete enough to keep building UI/logic, but production wiring still depends on these environment variables:

- `RESEND_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NOTION_API_KEY`
- `NOTION_PROPOSALS_DATABASE_ID`
- `NOTION_ASSESSMENTS_DATABASE_ID`
- Optional for automations: `WEBHOOK_URL`
- Optional for booking embeds: `NEXT_PUBLIC_CALENDLY_URL`

## Known Follow-Up Opportunities

1. Harden email rendering safety by escaping user-provided HTML content in contact/proposal templates.
2. Improve contact route reliability by validating Resend API response (`res.ok`) and surfacing failures.
3. Normalize Spanish tone (`tú` vs `usted`) across both translation dictionaries.
4. Replace Contact/Studio placeholders with live Calendly and Google Maps embeds once keys/URLs are provided.

## Resume Checklist For New Session

1. `git pull origin main`
2. Confirm latest commit is `c292b2a`:
   - `git log --oneline -n 1`
3. Install/check deps:
   - `npm install`
4. Run validation:
   - `npm run lint`
   - `npx tsc --noEmit`
5. If needed, run local dev:
   - `npm run dev`

## Build Note

In restricted-network environments, `npm run build` can fail if Google Fonts cannot be fetched:

- Error: `getaddrinfo ENOTFOUND fonts.googleapis.com`

This is environment/network related, not necessarily a regression in app logic.
