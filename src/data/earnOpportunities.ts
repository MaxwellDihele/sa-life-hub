// src/data/earnOpportunities.ts
// Edit this file to add or update earning opportunities

export type BadgeType = 'hot' | 'free' | 'easy';
export type EarnCategory = 'phone' | 'freelance' | 'resell' | 'passive';

export interface EarnOpportunity {
  id: string;
  badge: BadgeType;
  badgeLabel: string;
  income: string;
  title: string;
  description: string;
  category: EarnCategory;
  steps: string[];
  ctaHref: string;
  ctaLabel: string;
  ctaExternal: boolean;
  shareKey: string;
}

export const earnOpportunities: EarnOpportunity[] = [
  {
    id: 'digital-products',
    badge: 'hot',
    badgeLabel: '🔥 HOT',
    income: 'R300–R1,200/week',
    title: 'Sell Digital Products on WhatsApp',
    description: 'Create or resell CVs, business plans, and social media packs. No website needed — just WhatsApp and a Paystack link. Perfect for starters.',
    category: 'resell',
    steps: [
      'Download a Canva CV template (free)',
      'Customise it with your name as the creator',
      'Create a free Paystack payment link (R25–R50/template)',
      'Post in WhatsApp groups, matric groups, job groups',
      'Deliver the PDF instantly via WhatsApp',
    ],
    ctaHref: '/store',
    ctaLabel: 'Get Starter Kit',
    ctaExternal: false,
    shareKey: 'earn-digital',
  },
  {
    id: 'micro-tasks',
    badge: 'free',
    badgeLabel: '✅ FREE TO START',
    income: 'R500–R3,000/month',
    title: 'Micro-Tasks: Clickworker & Remotasks',
    description: 'Simple AI training tasks — labelling images, transcribing audio, categorising content. Phone-friendly, weekly payouts via PayPal or bank transfer.',
    category: 'phone',
    steps: [
      'Register free at clickworker.com or remotasks.com',
      'Complete the free training modules (1–2 hours)',
      'Start taking tasks when available',
      'Withdraw to PayPal (link to Capitec or TymeBank)',
    ],
    ctaHref: 'https://www.clickworker.com',
    ctaLabel: 'Sign Up Free',
    ctaExternal: true,
    shareKey: 'earn-tasks',
  },
  {
    id: 'freelance-writing',
    badge: 'easy',
    badgeLabel: '⚡ EASY START',
    income: 'R800–R5,000/month',
    title: 'Freelance Writing & Content (SA Focus)',
    description: 'South African content is in demand. Write blog posts, social captions, or product descriptions for small businesses. No degree needed.',
    category: 'freelance',
    steps: [
      'Create a free Fiverr or PeoplePerHour profile',
      'Offer "SA-focused" copywriting as your niche',
      'Write 3 sample pieces (post them as portfolio)',
      'Charge R150–R500 per article to start',
      'Scale up as reviews grow',
    ],
    ctaHref: 'https://www.fiverr.com',
    ctaLabel: 'Join Fiverr',
    ctaExternal: true,
    shareKey: 'earn-write',
  },
  {
    id: 'surveys',
    badge: 'hot',
    badgeLabel: '📱 PHONE ONLY',
    income: 'R200–R800/month',
    title: 'Data & Survey Income (SA Apps)',
    description: 'Get paid for sharing anonymised mobile data or completing short surveys. Passive income that runs in the background.',
    category: 'phone',
    steps: [
      'Download Survey Junkie or Toluna app',
      'Complete your profile fully (higher survey matches)',
      'Set 20 minutes aside daily for surveys',
      'Redeem points for cash or gift vouchers',
    ],
    ctaHref: 'https://www.surveyjunkie.com',
    ctaLabel: 'See Survey Apps',
    ctaExternal: true,
    shareKey: 'earn-survey',
  },
  {
    id: 'whatsapp-community-manager',
    badge: 'easy',
    badgeLabel: '💬 NEW',
    income: 'R1,500–R4,000/month',
    title: 'WhatsApp Community Manager for Small Businesses',
    description: 'Many SA small businesses need someone to manage their WhatsApp Business account — responding to customers, posting updates, and growing their community. You can do this from your phone.',
    category: 'freelance',
    steps: [
      'Set up a WhatsApp Business profile for yourself as a portfolio',
      'Offer to manage 3 businesses for free for 2 weeks (proof of concept)',
      'Document results (response time, customer satisfaction)',
      'Charge R500–R1,500/month per business',
      'Scale to 3–5 clients for full-time income',
    ],
    ctaHref: 'https://business.whatsapp.com',
    ctaLabel: 'Get WhatsApp Business',
    ctaExternal: true,
    shareKey: 'earn-wacm',
  },
];
