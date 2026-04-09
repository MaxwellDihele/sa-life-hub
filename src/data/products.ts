// src/data/products.ts
// Edit this file to add, remove, or update store products

export interface Product {
  id: string;               // Paystack payment page slug
  emoji: string;
  thumbVariant: 'green-grad' | 'gold-grad' | 'blue-grad';
  title: string;
  description: string;
  priceRands: number;       // whole rands
  includes: string[];
}

export const products: Product[] = [
  {
    id: 'cv-bundle',
    emoji: '📄',
    thumbVariant: 'green-grad',
    title: 'Professional CV Bundle',
    description: '3 modern CV templates + cover letter template. Editable on your phone via Canva. ATS-friendly for SA job applications.',
    priceRands: 35,
    includes: [
      '3 professionally designed CV templates',
      'Cover letter template',
      'Step-by-step completion guide',
      'WhatsApp delivery in 5 minutes',
    ],
  },
  {
    id: 'freelance-pack',
    emoji: '🚀',
    thumbVariant: 'gold-grad',
    title: 'Freelance Starter Pack',
    description: 'Everything you need to start freelancing in South Africa — profiles, scripts, pricing guides, and first-client templates.',
    priceRands: 79,
    includes: [
      'Fiverr profile template & bio',
      'Client pitch message scripts',
      'Pricing guide (what to charge SA clients)',
      'Invoice template (editable)',
      'How to receive international payments',
    ],
  },
  {
    id: 'biz-kit',
    emoji: '🏢',
    thumbVariant: 'blue-grad',
    title: 'Business Starter Kit',
    description: 'Launch your small business in SA — from CIPC registration to your first social media posts.',
    priceRands: 129,
    includes: [
      'CIPC registration walkthrough PDF',
      'Business name ideas worksheet',
      '30-day social media content plan',
      'Canva social media templates (x10)',
      'Basic business plan template',
      'WhatsApp Business setup guide',
    ],
  },
];
