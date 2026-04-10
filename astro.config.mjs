import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  // Switch to server mode so pages can fetch Supabase data on every request
  output: 'server',
  adapter: node({ mode: 'standalone' }),

  // Uncomment when deploying:
  // site: 'https://salifehub.co.za',
});
