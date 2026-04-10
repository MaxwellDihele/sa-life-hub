// src/lib/supabase.ts
// Supabase client + all shared types for SA Life Hub

import { createClient } from '@supabase/supabase-js';

// ── CLIENT (browser-safe, uses anon key) ──────────────────────
const supabaseUrl  = import.meta.env.PUBLIC_SUPABASE_URL  as string;
const supabaseAnon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ── ADMIN CLIENT (server-side only, uses service role key) ────
export function getAdminClient() {
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ══════════════════════════════════════════════════════════════
// DATABASE TYPES
// ══════════════════════════════════════════════════════════════

export type AlertCategory = 'sassa' | 'gov' | 'sars' | 'scam';
export type AlertType     = 'update' | 'scam' | 'fake';
export type AlertStatus   = 'active' | 'draft' | 'archived';
export type InfoBoxVariant = 'blue' | 'gold' | 'green' | 'dark' | 'red';

export interface RadarAlert {
  id:               string;           // uuid
  created_at:       string;           // ISO timestamp
  updated_at:       string;
  category:         AlertCategory;
  type:             AlertType;
  status:           AlertStatus;
  emoji:            string;
  tag_label:        string;
  date_label:       string;           // e.g. "April 2025", "Active Now"
  title:            string;
  body:             string;           // HTML allowed
  info_box_variant: InfoBoxVariant | null;
  info_box_html:    string | null;    // HTML allowed
  official_link:    string | null;
  official_label:   string | null;
  share_key:        string;           // matches shareMessages object in BaseLayout
  warn_btn:         boolean;          // red warn button vs standard share
  sort_order:       number;           // lower = shown first
}

export type ProductCategory = 'cv' | 'freelance' | 'business' | 'other';
export type ThumbVariant    = 'green-grad' | 'gold-grad' | 'blue-grad';

export interface Product {
  id:           string;
  created_at:   string;
  name:         string;
  description:  string;
  emoji:        string;
  thumb_variant: ThumbVariant;
  price_rands:  number;
  paystack_slug: string;           // Paystack payment page slug
  includes:     string[];          // stored as JSONB array
  active:       boolean;
  sort_order:   number;
}

// ══════════════════════════════════════════════════════════════
// QUERY HELPERS
// ══════════════════════════════════════════════════════════════

/** Fetch all active radar alerts, ordered by sort_order */
export async function getActiveAlerts(): Promise<RadarAlert[]> {
  const { data, error } = await supabase
    .from('radar_alerts')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[Supabase] getActiveAlerts error:', error.message);
    return [];
  }
  return (data as RadarAlert[]) ?? [];
}

/** Fetch active alerts filtered by category */
export async function getAlertsByCategory(category: AlertCategory): Promise<RadarAlert[]> {
  const { data, error } = await supabase
    .from('radar_alerts')
    .select('*')
    .eq('status', 'active')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[Supabase] getAlertsByCategory error:', error.message);
    return [];
  }
  return (data as RadarAlert[]) ?? [];
}

/** Fetch the latest N active alerts (for home page preview) */
export async function getLatestAlerts(limit = 3): Promise<RadarAlert[]> {
  const { data, error } = await supabase
    .from('radar_alerts')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] getLatestAlerts error:', error.message);
    return [];
  }
  return (data as RadarAlert[]) ?? [];
}

/** Fetch all active products */
export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[Supabase] getActiveProducts error:', error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}
