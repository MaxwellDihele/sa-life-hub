-- ================================================================
-- SA LIFE HUB — SUPABASE SCHEMA
-- Run this entire file in: supabase.com → SQL Editor → New query
-- ================================================================

-- ── RADAR ALERTS TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS radar_alerts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Content
  category         TEXT NOT NULL CHECK (category IN ('sassa','gov','sars','scam')),
  type             TEXT NOT NULL CHECK (type IN ('update','scam','fake')) DEFAULT 'update',
  status           TEXT NOT NULL CHECK (status IN ('active','draft','archived')) DEFAULT 'active',
  emoji            TEXT NOT NULL DEFAULT '📢',
  tag_label        TEXT NOT NULL,
  date_label       TEXT NOT NULL DEFAULT 'Today',
  title            TEXT NOT NULL,
  body             TEXT NOT NULL,
  info_box_variant TEXT CHECK (info_box_variant IN ('blue','gold','green','dark','red')),
  info_box_html    TEXT,
  official_link    TEXT,
  official_label   TEXT,
  share_key        TEXT NOT NULL,
  warn_btn         BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order       INTEGER NOT NULL DEFAULT 100
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER radar_alerts_updated_at
  BEFORE UPDATE ON radar_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── PRODUCTS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  name          TEXT NOT NULL,
  description   TEXT NOT NULL,
  emoji         TEXT NOT NULL DEFAULT '📦',
  thumb_variant TEXT NOT NULL CHECK (thumb_variant IN ('green-grad','gold-grad','blue-grad')) DEFAULT 'green-grad',
  price_rands   INTEGER NOT NULL,         -- whole rands, e.g. 35
  paystack_slug TEXT NOT NULL,            -- Paystack payment page slug
  includes      JSONB NOT NULL DEFAULT '[]'::JSONB,  -- array of strings
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INTEGER NOT NULL DEFAULT 100
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
-- Public can READ active alerts and active products
-- Only service role (admin panel) can INSERT/UPDATE/DELETE

ALTER TABLE radar_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;

-- Anyone can read active alerts
CREATE POLICY "Public read active alerts"
  ON radar_alerts FOR SELECT
  USING (status = 'active');

-- Anyone can read active products
CREATE POLICY "Public read active products"
  ON products FOR SELECT
  USING (active = TRUE);

-- ── SEED: RADAR ALERTS ────────────────────────────────────────
INSERT INTO radar_alerts
  (category, type, status, emoji, tag_label, date_label, title, body,
   info_box_variant, info_box_html, official_link, official_label, share_key, warn_btn, sort_order)
VALUES

-- SASSA
('sassa','update','active','💳','SASSA','April 2025',
 'SRD R370 Payment Dates — April 2025 Confirmed',
 'SASSA confirmed April payment dates for the R370 SRD grant. Payments are processed from 25 March. If yours hasn''t arrived, check your status at srd.sassa.gov.za before calling the helpline.',
 'blue',
 '📅 <strong style="color:#60a5fa;">Pay window:</strong> 25 March – 30 April 2025<br/>📞 <strong style="color:#60a5fa;">SASSA Helpline:</strong> 0800 60 10 11 (free)<br/>🌐 <strong style="color:#60a5fa;">Check status:</strong> srd.sassa.gov.za',
 'https://srd.sassa.gov.za','Check My Status →','sassa-dates',false,10),

('sassa','update','active','🔄','SASSA','This week',
 'SASSA SRD Reapplication — Who Needs to Reapply?',
 'Many beneficiaries whose applications "lapsed" during 2024 must reapply. SASSA does NOT automatically renew if your banking details changed or you missed the reconsideration window.',
 'gold',
 '✅ You must reapply if:<br/>• Your application shows "Lapsed" or "Cancelled"<br/>• Your bank account changed<br/>• You didn''t get paid for 3+ months',
 'https://srd.sassa.gov.za','Reapply Now →','sassa-reapply',false,20),

('sassa','update','active','👵','SASSA','Ongoing',
 'Older Person''s Grant & Child Support — 2025 Amounts',
 'Grant amounts increased in April 2025. Make sure your beneficiaries are receiving the updated amounts.',
 'dark',
 '👴 Older Person''s Grant: <strong style="color:var(--gold);">R2,185/month</strong><br/>👶 Child Support Grant: <strong style="color:var(--gold);">R530/month</strong><br/>♿ Disability Grant: <strong style="color:var(--gold);">R2,185/month</strong><br/>🍼 Care Dependency: <strong style="color:var(--gold);">R2,185/month</strong>',
 null,null,'sassa-amounts',false,30),

-- GOV
('gov','update','active','🏥','NHI','2025',
 'NHI Update — What Will Change for South Africans?',
 'The National Health Insurance Act is in implementation phase. Government aims to provide free basic healthcare to all SA residents. Private medical aids will still exist but their role changes.',
 'green',
 '📌 NHI will NOT remove your medical aid immediately<br/>📌 Full rollout expected over 10+ years<br/>📌 Public hospitals will be upgraded first<br/>🌐 More info: health.gov.za',
 'https://www.health.gov.za/nhi/','Official NHI Page →','nhi',false,40),

('gov','update','active','📋','DHA','April 2025',
 'Home Affairs: Smart ID Backlog — Expect 8–12 Weeks',
 'DHA confirmed a backlog of over 400,000 Smart ID applications. Priority is given to first-time applicants and matric students. Collection times have extended in some regions.',
 null,null,
 'https://www.ehomeaffairs.gov.za','Track Application →','dha-backlog',false,50),

('gov','update','active','🎓','NSFAS','This month',
 'NSFAS 2025 Allowance Delays Explained',
 'Many students report late allowance payments. Delays are due to institutional data verification. If your payment is late, contact your institution''s financial aid office first — not just NSFAS directly.',
 'gold','⚠️ Do NOT pay anyone claiming to "fast-track" your NSFAS. This is a scam.',
 'https://my.nsfas.org.za','Check myNSFAS →','nsfas-delay',false,60),

-- SARS
('sars','update','active','📊','SARS','2025 Tax Year',
 'Tax Filing Season 2025 — Key Dates You Must Know',
 'SARS opens the 2025 filing season in July. If you earned income and didn''t submit last year, SARS may contact you via SMS. Don''t ignore these.',
 'dark',
 '📅 <strong style="color:var(--gold);">Auto-assessment:</strong> July 2025<br/>📅 <strong style="color:var(--gold);">Filing opens:</strong> 1 July 2025<br/>📅 <strong style="color:var(--gold);">Non-provisional deadline:</strong> 20 October 2025<br/>📅 <strong style="color:var(--gold);">Provisional taxpayers:</strong> 20 January 2026',
 'https://www.sars.gov.za/individuals/tax-season/','SARS eFiling →','sars-dates',false,70),

('sars','update','active','💰','SARS','2025 Budget',
 '2025 Tax Thresholds — Do You Need to File?',
 'Many South Africans don''t know that below the threshold you may not need to file — but you still can to claim a refund.',
 'dark',
 '<strong style="color:var(--white);">You MUST file if you earn above:</strong><br/>👤 Under 65: <strong style="color:var(--gold);">R95,750/year</strong><br/>👴 65–74: <strong style="color:var(--gold);">R148,217/year</strong><br/>👵 75+: <strong style="color:var(--gold);">R165,689/year</strong>',
 null,null,'sars-threshold',false,80),

('sars','update','active','📱','SARS','Important',
 'SARS MobiApp — File Your Return From Your Phone',
 'The SARS MobiApp lets you file your return, view your account, and track your refund — no office visit needed for most individual taxpayers.',
 null,null,
 'https://www.sars.gov.za/mobiapp','Download MobiApp →','sars-app',false,90),

-- SCAM RADAR
('scam','scam','active','🚫','⚠️ SCAM ALERT','Active Now',
 '"SASSA is giving R1,500 emergency grants" — FAKE',
 'A viral WhatsApp message claims SASSA is distributing a special R1,500 emergency payment. This is <strong style="color:#f87171;">completely false</strong>. The links steal your personal information.',
 'red',
 '✅ <strong style="color:var(--white);">SASSA only communicates via:</strong><br/>• sassa.gov.za (official website)<br/>• 0800 60 10 11 (toll-free helpline)<br/>• Official SASSA offices<br/>❌ Never via random WhatsApp links or Facebook pages',
 null,null,'scam-sassa-r1500',true,100),

('scam','scam','active','🚫','⚠️ SCAM ALERT','Active Now',
 '"Pay R50 to fast-track your SASSA/NSFAS payment" — SCAM',
 'Fraudsters charge R50–R300 on WhatsApp to "speed up" government payments. No third party can fast-track SASSA or NSFAS payments.',
 'red',
 '🔴 Report to SASSA Fraud Hotline: <strong style="color:#f87171;">0800 60 10 11</strong><br/>🔴 Report to SAPS: <strong style="color:#f87171;">10111</strong>',
 null,null,'scam-fasttrack',true,110),

('scam','fake','active','🚫','⚠️ FAKE NEWS','Circulating Now',
 '"SARS is cancelling tax numbers of unemployed people" — FALSE',
 'A message on WhatsApp and TikTok claims SARS cancels tax numbers for people who haven''t filed in 2 years. This is <strong style="color:#f87171;">false</strong>. SARS does not cancel tax numbers.',
 'red',
 '✅ Verify any SARS claim at: <strong style="color:var(--white);">sars.gov.za</strong><br/>✅ SARS Contact Centre: <strong style="color:var(--white);">0800 00 7277</strong>',
 null,null,'scam-sars-cancel',true,120),

('scam','scam','active','🚫','⚠️ SCAM ALERT','Active Now',
 'Fake "Government Jobs" — WhatsApp Application Scam',
 'Fraudsters send fake government job adverts asking applicants to pay R150–R500 for "application processing." Government jobs are always free to apply for.',
 'red',
 '✅ Only apply via: <strong style="color:var(--white);">dpsa.gov.za/vacancies</strong><br/>❌ Never pay anyone to submit a government job application',
 null,null,'scam-govjobs',true,130),

('scam','fake','active','🚫','⚠️ FAKE NEWS','Viral on TikTok',
 '"Basic Income Grant of R1,500 approved for all citizens" — NOT TRUE',
 'Multiple TikTok and Facebook posts claim Parliament passed a Basic Income Grant of R1,500/month. As of April 2025, <strong style="color:#f87171;">no such law has been passed</strong>.',
 'red',
 '📌 The BIG is still a policy proposal<br/>📌 No implementation date has been set<br/>📌 Don''t fill in any forms claiming to register you',
 null,null,'scam-big',true,140);

-- ── SEED: PRODUCTS ────────────────────────────────────────────
INSERT INTO products
  (name, description, emoji, thumb_variant, price_rands, paystack_slug, includes, active, sort_order)
VALUES
('Professional CV Bundle',
 '3 modern CV templates + cover letter template. Editable on your phone via Canva. ATS-friendly for SA job applications.',
 '📄','green-grad',35,'cv-bundle',
 '["3 professionally designed CV templates","Cover letter template","Step-by-step completion guide","WhatsApp delivery in 5 minutes"]',
 true,10),

('Freelance Starter Pack',
 'Everything you need to start freelancing in South Africa — profiles, scripts, pricing guides, and first-client templates.',
 '🚀','gold-grad',79,'freelance-pack',
 '["Fiverr profile template & bio","Client pitch message scripts","Pricing guide (what to charge SA clients)","Invoice template (editable)","How to receive international payments"]',
 true,20),

('Business Starter Kit',
 'Launch your small business in SA — from CIPC registration to your first social media posts.',
 '🏢','blue-grad',129,'biz-kit',
 '["CIPC registration walkthrough PDF","Business name ideas worksheet","30-day social media content plan","Canva social media templates (x10)","Basic business plan template","WhatsApp Business setup guide"]',
 true,30);
