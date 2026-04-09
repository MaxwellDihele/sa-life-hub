// src/data/govServices.ts
// Edit this file to update Government Help page content

export interface GovService {
  id: string;
  category: 'sassa' | 'nsfas' | 'uif' | 'id';
  icon: string;
  iconColor: 'blue' | 'gold' | 'green';
  title: string;
  description: string;
  steps: string[];
  faq?: { question: string; answer: string };
  officialLink: string;
  officialLabel: string;
  shareKey: string;
}

export const govServices: GovService[] = [
  {
    id: 'sassa-srd',
    category: 'sassa',
    icon: '🏦',
    iconColor: 'blue',
    title: 'SASSA SRD Grant (R370)',
    description: 'Social Relief of Distress grant for unemployed South Africans. Apply online — no office visit needed.',
    steps: [
      'Go to srd.sassa.gov.za on your phone',
      'Enter your ID number & phone number',
      'SASSA sends OTP to verify your identity',
      'Complete the means test questions',
      'Choose payment method (CashSend, bank, PostBank)',
      'Check your status at the same portal monthly',
    ],
    faq: {
      question: 'Common Rejection Reasons & Fixes',
      answer: `<strong style="color:var(--white);">Failed Means Test</strong> — You may have income above R624/month on SARS. Check your tax profile.<br/><br/>
<strong style="color:var(--white);">Identity Verification Failed</strong> — Visit your nearest DHA office with your green ID book or Smart ID card.<br/><br/>
<strong style="color:var(--white);">Banking Details Wrong</strong> — Update at srd.sassa.gov.za within 30 days of rejection.`,
    },
    officialLink: 'https://srd.sassa.gov.za',
    officialLabel: 'Apply Now →',
    shareKey: 'sassa',
  },
  {
    id: 'nsfas',
    category: 'nsfas',
    icon: '🎓',
    iconColor: 'gold',
    title: 'NSFAS Application',
    description: 'National Student Financial Aid for university & TVET college students from households earning under R350,000/year.',
    steps: [
      'Register on my.nsfas.org.za (Jan–March window)',
      'Upload: ID, proof of income, matric results',
      'Apply to your institution separately',
      'Accept your institution\'s admission offer',
      'NSFAS sends funding decision via SMS',
      'Allowances paid monthly to your NSFAS wallet',
    ],
    faq: {
      question: 'Appeal a Rejected NSFAS Application',
      answer: `You have <strong style="color:var(--gold);">30 days</strong> from rejection to appeal. Log in to myNSFAS → "My Applications" → "Appeal". Attach a motivation letter and supporting documents (proof of unemployment, death certificate if applicable, etc.)`,
    },
    officialLink: 'https://my.nsfas.org.za',
    officialLabel: 'Apply at NSFAS →',
    shareKey: 'nsfas',
  },
  {
    id: 'uif',
    category: 'uif',
    icon: '💼',
    iconColor: 'green',
    title: 'UIF Claims (Retrenchment / Illness)',
    description: 'Unemployment Insurance Fund — if you were retrenched, your employer should have contributed. Claim what\'s yours.',
    steps: [
      'Get UI-19 form from your employer',
      'Complete UI-2.8 (banking details form)',
      'Take forms + ID to your nearest Labour Centre',
      'Or claim online at uFiling.labour.gov.za',
      'Attend bi-weekly signing sessions',
      'Payments usually within 4–6 weeks',
    ],
    officialLink: 'https://ufiling.labour.gov.za',
    officialLabel: 'Claim Online →',
    shareKey: 'uif',
  },
  {
    id: 'smart-id',
    category: 'id',
    icon: '🪪',
    iconColor: 'blue',
    title: 'Smart ID Card & Passport',
    description: 'Apply via eHomeAffairs at select banks — no long DHA queue required for most applicants.',
    steps: [
      'Register at ehomeaffairs.gov.za',
      'Complete application & pay online (R140 Smart ID / R400 Passport)',
      'Book appointment at Absa, FNB, or Nedbank',
      'Bring old ID + proof of payment to the bank',
      'Collect at DHA office when SMS arrives (4–12 weeks)',
    ],
    officialLink: 'https://www.ehomeaffairs.gov.za',
    officialLabel: 'Go to eHomeAffairs →',
    shareKey: 'dha',
  },
];
