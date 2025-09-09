import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: {
    resolve: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    }
  }
});