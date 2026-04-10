# Supabase Setup Guide — SA Life Hub

Follow these steps to connect your live database in under 10 minutes.

---

## Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Name it `sa-life-hub`, choose a region close to South Africa (e.g. `eu-west-2` London or `us-east-1`)
4. Set a strong database password and save it
5. Wait ~2 minutes for the project to provision

---

## Step 2 — Run the Database Schema

1. In your Supabase project, go to **SQL Editor** → **New query**
2. Copy the entire contents of `supabase/schema.sql`
3. Paste it and click **Run**
4. This creates both tables, sets up Row Level Security, and seeds all the initial data

---

## Step 3 — Get Your API Keys

In your Supabase project go to **Settings** → **API**:

| Key | Where to find it | Used for |
|-----|-----------------|----------|
| Project URL | "Project URL" | `PUBLIC_SUPABASE_URL` |
| `anon` public key | "Project API keys" | `PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key | "Project API keys" | `SUPABASE_SERVICE_ROLE_KEY` |

⚠️ **Keep your `service_role` key secret** — never put it in client-side code. It bypasses Row Level Security.

---

## Step 4 — Set Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PUBLIC_PAYSTACK_KEY=pk_live_...
ADMIN_PASSWORD=your-strong-password-here
```

---

## Step 5 — Deploy to Vercel

Since the site now uses SSR (server-side rendering), deploy as a Node.js app:

### Option A — Vercel (recommended)
1. Push your project to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Vercel auto-detects Astro — just add your environment variables in the Vercel dashboard under **Settings → Environment Variables**
4. Deploy ✅

### Option B — Railway / Render
- Build command: `npm run build`
- Start command: `npm run start`
- Add all env vars in the platform dashboard

---

## Step 6 — Access the Admin Panel

Go to `yoursite.com/admin` and log in with your `ADMIN_PASSWORD`.

From the admin dashboard you can:
- ✅ **Create** new radar alerts (SASSA updates, scam alerts, SARS notices, gov news)
- ✅ **Publish / Archive** alerts instantly (changes go live immediately)
- ✅ **Delete** old or resolved alerts
- ✅ **Toggle products** on/off without touching code

---

## Adding a New Alert (Quick Reference)

From `/admin/dashboard`:

1. Click **➕ Create New Alert**
2. Fill in:
   - **Category**: sassa / gov / sars / scam
   - **Type**: update / scam / fake
   - **Status**: Active (live) or Draft (hidden)
   - **Title**: The headline
   - **Body**: Main content (HTML supported — use `<strong>` for emphasis)
   - **Info Box**: Optional highlight box with key facts
   - **Share Key**: Must match a key in `shareMessages` in `BaseLayout.astro` (or add a new one)
3. Click **Create Alert** → it's live instantly

---

## Adding a New Product

Products are managed directly in the Supabase Table Editor:

1. Go to Supabase → **Table Editor** → `products`
2. Click **Insert row**
3. Fill in: `name`, `description`, `emoji`, `thumb_variant`, `price_rands`, `paystack_slug`, `includes` (JSON array), `active`, `sort_order`
4. Save — it appears on the store immediately

---

## Database Tables Summary

### `radar_alerts`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Auto-generated |
| category | text | sassa / gov / sars / scam |
| type | text | update / scam / fake |
| status | text | active / draft / archived |
| emoji | text | Single emoji |
| tag_label | text | Shown in the tag pill |
| date_label | text | "Today", "April 2025" etc |
| title | text | Alert headline |
| body | text | HTML body text |
| info_box_variant | text | blue/gold/green/dark/red |
| info_box_html | text | HTML for the info box |
| official_link | text | URL (optional) |
| official_label | text | Link button label |
| share_key | text | Key in shareMessages object |
| warn_btn | boolean | Red warn button if true |
| sort_order | integer | Lower = shown first |

### `products`
| Column | Type | Notes |
|--------|------|-------|
| name | text | Product name |
| description | text | Short description |
| emoji | text | Product emoji |
| thumb_variant | text | green-grad / gold-grad / blue-grad |
| price_rands | integer | Price in whole Rands |
| paystack_slug | text | Paystack payment page slug |
| includes | jsonb | Array of strings |
| active | boolean | Show/hide from store |
| sort_order | integer | Display order |
