import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'

export default defineConfig({
  devToolbar: { enabled: false },
  adapter: vercel(),
  integrations: [react()],
  vite: {
    resolve: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    }
  }
});