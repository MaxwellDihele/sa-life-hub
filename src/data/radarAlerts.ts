// src/data/radarAlerts.ts
// Add new scam alerts or government updates here — they auto-appear on the radar page

export type RadarCategory = 'sassa' | 'gov' | 'sars' | 'scam';
export type AlertType = 'update' | 'scam' | 'fake';

export interface RadarAlert {
  id: string;
  category: RadarCategory;
  type: AlertType;
  emoji: string;
  tagLabel: string;
  tagColor: 'blue' | 'gold' | 'green' | 'red';
  date: string;
  title: string;
  body: string;
  infoBoxVariant?: 'blue' | 'gold' | 'green' | 'dark' | 'red';
  infoBoxHtml?: string;
  officialLink?: string;
  officialLabel?: string;
  shareKey: string;
  warnBtn?: boolean; // red warn button instead of standard share
}

export const radarAlerts: RadarAlert[] = [
  // ── SASSA ──────────────────────────────────────────────────
  {
    id: 'sassa-april-dates',
    category: 'sassa',
    type: 'update',
    emoji: '💳',
    tagLabel: 'SASSA',
    tagColor: 'blue',
    date: 'April 2025',
    title: 'SRD R370 Payment Dates — April 2025 Confirmed',
    body: 'SASSA confirmed April payment dates for the R370 SRD grant. Payments are processed from 25 March. If yours hasn\'t arrived, check your status at srd.sassa.gov.za before calling the helpline.',
    infoBoxVariant: 'blue',
    infoBoxHtml: `📅 <strong style="color:#60a5fa;">Pay window:</strong> 25 March – 30 April 2025<br/>
📞 <strong style="color:#60a5fa;">SASSA Helpline:</strong> 0800 60 10 11 (free)<br/>
🌐 <strong style="color:#60a5fa;">Check status:</strong> srd.sassa.gov.za`,
    officialLink: 'https://srd.sassa.gov.za',
    officialLabel: 'Check My Status →',
    shareKey: 'sassa-dates',
  },
  {
    id: 'sassa-reapply',
    category: 'sassa',
    type: 'update',
    emoji: '🔄',
    tagLabel: 'SASSA',
    tagColor: 'blue',
    date: 'This week',
    title: 'SASSA SRD Reapplication — Who Needs to Reapply?',
    body: 'Many beneficiaries whose applications "lapsed" during 2024 must reapply. SASSA does NOT automatically renew if your banking details changed or you missed the reconsideration window.',
    infoBoxVariant: 'gold',
    infoBoxHtml: `✅ You must reapply if:<br/>
• Your application shows "Lapsed" or "Cancelled"<br/>
• Your bank account changed<br/>
• You didn't get paid for 3+ months`,
    officialLink: 'https://srd.sassa.gov.za',
    officialLabel: 'Reapply Now →',
    shareKey: 'sassa-reapply',
  },
  {
    id: 'sassa-amounts',
    category: 'sassa',
    type: 'update',
    emoji: '👵',
    tagLabel: 'SASSA',
    tagColor: 'blue',
    date: 'Ongoing',
    title: "Older Person's Grant & Child Support — 2025 Amounts",
    body: 'Grant amounts increased in April 2025. Make sure your beneficiaries are receiving the updated amounts.',
    infoBoxVariant: 'dark',
    infoBoxHtml: `👴 Older Person's Grant: <strong style="color:var(--gold);">R2,185/month</strong><br/>
👶 Child Support Grant: <strong style="color:var(--gold);">R530/month</strong><br/>
♿ Disability Grant: <strong style="color:var(--gold);">R2,185/month</strong><br/>
🍼 Care Dependency: <strong style="color:var(--gold);">R2,185/month</strong>`,
    shareKey: 'sassa-amounts',
  },

  // ── GOV UPDATES ────────────────────────────────────────────
  {
    id: 'nhi-update',
    category: 'gov',
    type: 'update',
    emoji: '🏥',
    tagLabel: 'NHI',
    tagColor: 'green',
    date: '2025',
    title: 'NHI Update — What Will Change for South Africans?',
    body: "The National Health Insurance Act is in implementation phase. Government aims to provide free basic healthcare to all SA residents. Private medical aids will still exist but their role changes.",
    infoBoxVariant: 'green',
    infoBoxHtml: `📌 NHI will NOT remove your medical aid immediately<br/>
📌 Full rollout expected over 10+ years<br/>
📌 Public hospitals will be upgraded first<br/>
🌐 More info: health.gov.za`,
    officialLink: 'https://www.health.gov.za/nhi/',
    officialLabel: 'Official NHI Page →',
    shareKey: 'nhi',
  },
  {
    id: 'dha-backlog',
    category: 'gov',
    type: 'update',
    emoji: '📋',
    tagLabel: 'DHA',
    tagColor: 'green',
    date: 'April 2025',
    title: 'Home Affairs: Smart ID Backlog — Expect 8–12 Weeks',
    body: 'DHA confirmed a backlog of over 400,000 Smart ID applications. Priority is given to first-time applicants and matric students. Collection times have extended in some regions.',
    officialLink: 'https://www.ehomeaffairs.gov.za',
    officialLabel: 'Track Application →',
    shareKey: 'dha-backlog',
  },
  {
    id: 'nsfas-delays',
    category: 'gov',
    type: 'update',
    emoji: '🎓',
    tagLabel: 'NSFAS',
    tagColor: 'green',
    date: 'This month',
    title: 'NSFAS 2025 Allowance Delays Explained',
    body: "Many students report late allowance payments. Delays are due to institutional data verification. If your payment is late, contact your institution's financial aid office first — not just NSFAS directly.",
    infoBoxVariant: 'gold',
    infoBoxHtml: `⚠️ Do NOT pay anyone claiming to "fast-track" your NSFAS. This is a scam.`,
    officialLink: 'https://my.nsfas.org.za',
    officialLabel: 'Check myNSFAS →',
    shareKey: 'nsfas-delay',
  },

  // ── SARS ───────────────────────────────────────────────────
  {
    id: 'sars-filing-dates',
    category: 'sars',
    type: 'update',
    emoji: '📊',
    tagLabel: 'SARS',
    tagColor: 'gold',
    date: '2025 Tax Year',
    title: 'Tax Filing Season 2025 — Key Dates You Must Know',
    body: "SARS opens the 2025 filing season in July. If you earned income and didn't submit last year, SARS may contact you via SMS. Don't ignore these.",
    infoBoxVariant: 'dark',
    infoBoxHtml: `📅 <strong style="color:var(--gold);">Auto-assessment:</strong> July 2025<br/>
📅 <strong style="color:var(--gold);">Filing opens:</strong> 1 July 2025<br/>
📅 <strong style="color:var(--gold);">Non-provisional deadline:</strong> 20 October 2025<br/>
📅 <strong style="color:var(--gold);">Provisional taxpayers:</strong> 20 January 2026`,
    officialLink: 'https://www.sars.gov.za/individuals/tax-season/',
    officialLabel: 'SARS eFiling →',
    shareKey: 'sars-dates',
  },
  {
    id: 'sars-thresholds',
    category: 'sars',
    type: 'update',
    emoji: '💰',
    tagLabel: 'SARS',
    tagColor: 'gold',
    date: '2025 Budget',
    title: '2025 Tax Thresholds — Do You Need to File?',
    body: "Many South Africans don't know that below the threshold you may not need to file — but you still can to claim a refund.",
    infoBoxVariant: 'dark',
    infoBoxHtml: `<strong style="color:var(--white);">You MUST file if you earn above:</strong><br/>
👤 Under 65: <strong style="color:var(--gold);">R95,750/year</strong><br/>
👴 65–74: <strong style="color:var(--gold);">R148,217/year</strong><br/>
👵 75+: <strong style="color:var(--gold);">R165,689/year</strong>`,
    shareKey: 'sars-threshold',
  },
  {
    id: 'sars-mobiapp',
    category: 'sars',
    type: 'update',
    emoji: '📱',
    tagLabel: 'SARS',
    tagColor: 'gold',
    date: 'Important',
    title: 'SARS MobiApp — File Your Return From Your Phone',
    body: 'The SARS MobiApp lets you file your return, view your account, and track your refund — no office visit needed for most individual taxpayers.',
    officialLink: 'https://www.sars.gov.za/mobiapp',
    officialLabel: 'Download MobiApp →',
    shareKey: 'sars-app',
  },

  // ── SCAM RADAR ─────────────────────────────────────────────
  {
    id: 'scam-sassa-r1500',
    category: 'scam',
    type: 'scam',
    emoji: '🚫',
    tagLabel: '⚠️ SCAM ALERT',
    tagColor: 'red',
    date: 'Active Now',
    title: '"SASSA is giving R1,500 emergency grants" — FAKE',
    body: 'A viral WhatsApp message claims SASSA is distributing a special R1,500 emergency payment. This is <strong style="color:#f87171;">completely false</strong>. The links steal your personal information.',
    infoBoxVariant: 'red',
    infoBoxHtml: `✅ <strong style="color:var(--white);">SASSA only communicates via:</strong><br/>
• sassa.gov.za (official website)<br/>
• 0800 60 10 11 (toll-free helpline)<br/>
• Official SASSA offices<br/>
❌ Never via random WhatsApp links or Facebook pages`,
    shareKey: 'scam-sassa-r1500',
    warnBtn: true,
  },
  {
    id: 'scam-fasttrack',
    category: 'scam',
    type: 'scam',
    emoji: '🚫',
    tagLabel: '⚠️ SCAM ALERT',
    tagColor: 'red',
    date: 'Active Now',
    title: '"Pay R50 to fast-track your SASSA/NSFAS payment" — SCAM',
    body: 'Fraudsters charge R50–R300 on WhatsApp to "speed up" government payments. No third party can fast-track SASSA or NSFAS payments.',
    infoBoxVariant: 'red',
    infoBoxHtml: `🔴 Report to SASSA Fraud Hotline: <strong style="color:#f87171;">0800 60 10 11</strong><br/>
🔴 Report to SAPS: <strong style="color:#f87171;">10111</strong>`,
    shareKey: 'scam-fasttrack',
    warnBtn: true,
  },
  {
    id: 'scam-sars-cancel',
    category: 'scam',
    type: 'fake',
    emoji: '🚫',
    tagLabel: '⚠️ FAKE NEWS',
    tagColor: 'red',
    date: 'Circulating Now',
    title: '"SARS is cancelling tax numbers of unemployed people" — FALSE',
    body: 'A message on WhatsApp and TikTok claims SARS cancels tax numbers for people who haven\'t filed in 2 years. This is <strong style="color:#f87171;">false</strong>. SARS does not cancel tax numbers.',
    infoBoxVariant: 'red',
    infoBoxHtml: `✅ Verify any SARS claim at: <strong style="color:var(--white);">sars.gov.za</strong><br/>
✅ SARS Contact Centre: <strong style="color:var(--white);">0800 00 7277</strong>`,
    shareKey: 'scam-sars-cancel',
    warnBtn: true,
  },
  {
    id: 'scam-govjobs',
    category: 'scam',
    type: 'scam',
    emoji: '🚫',
    tagLabel: '⚠️ SCAM ALERT',
    tagColor: 'red',
    date: 'Active Now',
    title: 'Fake "Government Jobs" — WhatsApp Application Scam',
    body: 'Fraudsters send fake government job adverts asking applicants to pay R150–R500 for "application processing." Government jobs are always free to apply for.',
    infoBoxVariant: 'red',
    infoBoxHtml: `✅ Only apply via: <strong style="color:var(--white);">dpsa.gov.za/vacancies</strong><br/>
❌ Never pay anyone to submit a government job application`,
    shareKey: 'scam-govjobs',
    warnBtn: true,
  },
  {
    id: 'scam-big',
    category: 'scam',
    type: 'fake',
    emoji: '🚫',
    tagLabel: '⚠️ FAKE NEWS',
    tagColor: 'red',
    date: 'Viral on TikTok',
    title: '"Basic Income Grant of R1,500 approved for all citizens" — NOT TRUE',
    body: 'Multiple TikTok and Facebook posts claim Parliament passed a Basic Income Grant of R1,500/month. As of April 2025, <strong style="color:#f87171;">no such law has been passed</strong>.',
    infoBoxVariant: 'red',
    infoBoxHtml: `📌 The BIG is still a policy proposal<br/>
📌 No implementation date has been set<br/>
📌 Don't fill in any forms claiming to register you`,
    shareKey: 'scam-big',
    warnBtn: true,
  },
];

// Helper to get alerts by category
export function getAlertsByCategory(category: RadarCategory) {
  return radarAlerts.filter(a => a.category === category);
}
