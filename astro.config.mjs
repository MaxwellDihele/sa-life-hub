import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Uncomment when deploying — needed for sitemap + OG tags:
  // site: 'https://salifehub.co.za',

  // Add sitemap after install: npm install @astrojs/sitemap
  // integrations: [sitemap()],
});
