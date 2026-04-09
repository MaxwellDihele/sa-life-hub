# SA Life Hub — Astro Project
**Built by RealMaxG**

A mobile-first static website for South Africans — government help, online earning, digital product sales, and scam/news radar.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### Install & Run
```bash
# Install dependencies
npm install

# Start dev server (open http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
sa-life-hub/
├── public/
│   └── styles/
│       └── global.css          ← All shared design tokens & utility classes
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    ← Top nav, bottom nav, Paystack modal, WhatsApp share logic
│   └── pages/
│       ├── index.astro         ← Home page
│       ├── gov.astro           ← Government & Admin Help
│       ├── earn.astro          ← Online Earning Opportunities
│       ├── store.astro         ← Digital Product Store
│       └── radar.astro         ← SA Updates & Scam Radar
├── astro.config.mjs
└── package.json
```

---

## ⚙️ Configuration

### 1. Add Your Paystack Key
In `src/layouts/BaseLayout.astro`, find:
```js
const PAYSTACK_KEY = 'pk_live_REPLACE_WITH_YOUR_KEY';
```
Replace with your live Paystack public key from [dashboard.paystack.com](https://dashboard.paystack.com).

### 2. Update Product IDs
In `src/pages/store.astro`, each product button calls:
```html
onclick="openPaystack('cv-bundle', 3500, 'Professional CV Bundle')"
```
- **First arg** = your Paystack payment page slug (create at paystack.com/pay)
- **Second arg** = price in kobo/cents (R35 = 3500)
- **Third arg** = display name in checkout modal

### 3. Set Your Site URL (for SEO)
In `astro.config.mjs`, uncomment:
```js
site: 'https://salifehub.co.za',
```

### 4. Update WhatsApp Share Links
In `BaseLayout.astro` > `shareMessages` object, replace `[link]` in each message with your actual domain.

---

## 🌐 Deploy (Free Options)

### Netlify (Recommended — drag & drop)
1. Run `npm run build`
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Done ✅

### Vercel
```bash
npx vercel
```

### GitHub Pages
Push to GitHub, enable Pages in Settings → set source to `dist/` branch.

### Cloudflare Pages
Connect your GitHub repo → build command: `npm run build` → output: `dist`

---

## 🎨 Customisation

### Design Tokens
Edit CSS variables at the top of `public/styles/global.css`:
```css
:root {
  --gold:   #f5c842;   /* Primary accent */
  --green2: #24a064;   /* Success / earn */
  --black:  #0e0e0e;   /* Background */
  /* ... */
}
```

### Adding New Pages
1. Create `src/pages/yourpage.astro`
2. Import and use `BaseLayout` with `activeNav="yourpage"`
3. Add a link to the bottom nav in `BaseLayout.astro`

### Adding New Scam Alerts (Radar Page)
Copy an existing `.trend-card.radar-item` block in `radar.astro` and update:
- `data-cat="scam"` (or `sassa` / `gov` / `sars`)
- The headline, body text, and `shareWhatsApp('key')` call
- Add the new key + message to `shareMessages` in `BaseLayout.astro`

---

## 📦 Dependencies
- **Astro 4** — Static site framework (zero JS by default)
- **Paystack Inline JS** — Loaded dynamically for checkout
- **Google Fonts** — Syne (headings) + DM Sans (body)

No other dependencies. Zero frameworks. Deploys as pure HTML/CSS/JS.

---

## 📞 Support & Hotlines (Reference)
| Service | Number |
|---------|--------|
| SASSA Helpline | 0800 60 10 11 |
| SARS Contact Centre | 0800 00 7277 |
| SAPS Emergency | 10111 |
| Home Affairs | 0800 60 11 90 |
| Department of Labour | 0800 843 843 |

---

*Built with ❤️ by RealMaxG — filtering real opportunities from noise and scams.*
