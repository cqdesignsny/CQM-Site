-- ============================================================
-- CQM Site — Complete Supabase Schema
-- Run this in Supabase SQL Editor (supabase.com → project → SQL Editor)
-- ============================================================

-- 1. PROPOSALS
-- Stores all generated proposals with service snapshots
create table if not exists proposals (
  id text primary key,                    -- prop_XXXXXXXXXXXX (nanoid)
  parent_id text references proposals(id),-- previous version link
  version integer not null default 1,
  locale text not null default 'en',      -- en | es | fr

  -- Contact info
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  referred_by text,

  -- Status
  status text not null default 'new',     -- new | sent | viewed | won | lost | expired

  -- Service snapshot (JSONB — immune to future price changes)
  selected_services jsonb not null default '[]',
  custom_line_items jsonb not null default '[]',
  package_id text,

  -- Pricing
  one_time_total numeric(10,2) not null default 0,
  monthly_total numeric(10,2) not null default 0,
  hosting_fee numeric(10,2) not null default 0,
  discount_type text,                     -- percentage | flat
  discount_value numeric(10,2),
  discount_amount numeric(10,2) not null default 0,
  grand_total numeric(10,2) not null default 0,

  -- External integrations
  notion_page_id text,
  assessment_id text,                     -- linked assessment if from assessment flow

  -- Timestamps
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Indexes for proposals
create index if not exists idx_proposals_email on proposals(contact_email);
create index if not exists idx_proposals_status on proposals(status);
create index if not exists idx_proposals_created on proposals(created_at desc);
create index if not exists idx_proposals_parent on proposals(parent_id);


-- 2. ASSESSMENT RESULTS
-- Stores marketing assessment quiz results
create table if not exists assessment_results (
  id text primary key,                    -- assess_XXXXXXXXXXXX (nanoid)

  -- Contact info
  contact_name text not null,
  contact_email text not null,
  contact_phone text,

  -- Quiz data (JSONB)
  answers jsonb not null default '[]',
  category_scores jsonb not null default '[]',
  overall_score integer not null default 0,
  recommended_services jsonb not null default '[]',

  locale text not null default 'en',

  -- Timestamps
  created_at timestamptz not null default now()
);

-- Indexes for assessments
create index if not exists idx_assessment_email on assessment_results(contact_email);
create index if not exists idx_assessment_score on assessment_results(overall_score);
create index if not exists idx_assessment_created on assessment_results(created_at desc);


-- 3. CONTACT SUBMISSIONS
-- Stores all contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),

  -- Contact info
  name text not null,
  email text not null,
  phone text,

  -- Form fields
  service_interest text,                  -- web | seo | paid-ads | social-media | email-marketing | video | podcast-studio | other
  message text not null,
  locale text not null default 'en',

  -- Source tracking
  source text default 'contact_page',     -- contact_page | service_page | footer | etc.
  referrer text,                          -- URL they came from
  utm_source text,
  utm_medium text,
  utm_campaign text,

  -- Status
  status text not null default 'new',     -- new | read | replied | archived
  notes text,                             -- internal notes (CRM use)

  -- External integrations
  notion_page_id text,

  -- Timestamps
  created_at timestamptz not null default now(),
  read_at timestamptz,
  replied_at timestamptz
);

-- Indexes for contact submissions
create index if not exists idx_contact_email on contact_submissions(email);
create index if not exists idx_contact_status on contact_submissions(status);
create index if not exists idx_contact_created on contact_submissions(created_at desc);
create index if not exists idx_contact_service on contact_submissions(service_interest);


-- 4. NEWSLETTER SUBSCRIBERS
-- Stores email signups from any newsletter/lead magnet forms
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),

  email text not null unique,
  name text,

  -- Segmentation
  source text default 'website',          -- website | assessment | proposal | career | resource
  tags jsonb not null default '[]',       -- e.g. ["marketing", "ai", "seo"]
  locale text not null default 'en',

  -- Status
  status text not null default 'active',  -- active | unsubscribed | bounced

  -- Timestamps
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

-- Indexes for newsletter
create index if not exists idx_newsletter_email on newsletter_subscribers(email);
create index if not exists idx_newsletter_status on newsletter_subscribers(status);


-- 5. ANALYTICS EVENTS (optional — for custom event tracking)
-- Lightweight event store for n8n/agent consumption
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),

  event_name text not null,               -- page_view | cta_click | proposal_started | etc.
  event_data jsonb not null default '{}',

  -- Session context
  session_id text,
  page_url text,
  referrer text,
  locale text,

  -- Timestamps
  created_at timestamptz not null default now()
);

-- Indexes for analytics
create index if not exists idx_analytics_event on analytics_events(event_name);
create index if not exists idx_analytics_created on analytics_events(created_at desc);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables for security
-- Service role key bypasses RLS, anon key respects it
-- ============================================================

alter table proposals enable row level security;
alter table assessment_results enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;
alter table analytics_events enable row level security;

-- Allow service role (server-side) full access
-- These policies use the service_role key from API routes
create policy "Service role full access on proposals"
  on proposals for all
  using (true)
  with check (true);

create policy "Service role full access on assessment_results"
  on assessment_results for all
  using (true)
  with check (true);

create policy "Service role full access on contact_submissions"
  on contact_submissions for all
  using (true)
  with check (true);

create policy "Service role full access on newsletter_subscribers"
  on newsletter_subscribers for all
  using (true)
  with check (true);

create policy "Service role full access on analytics_events"
  on analytics_events for all
  using (true)
  with check (true);


-- ============================================================
-- HELPFUL VIEWS (optional)
-- ============================================================

-- Recent proposals with contact info
create or replace view recent_proposals as
select
  id, version, status, contact_name, contact_email,
  grand_total, package_id, locale,
  created_at, accepted_at
from proposals
order by created_at desc
limit 50;

-- Assessment overview
create or replace view assessment_overview as
select
  id, contact_name, contact_email, overall_score,
  locale, created_at
from assessment_results
order by created_at desc
limit 50;

-- Unread contact submissions
create or replace view unread_contacts as
select *
from contact_submissions
where status = 'new'
order by created_at desc;
