import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: netlify(),
  vite: {
    resolve: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils'
    }
  }
});