import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import fs from 'fs'; 

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: netlify(),
  vite: {
    base: './', 
    resolve: {
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    },
  },
  server: {
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync('./localhost+2-key.pem'),
      cert: fs.readFileSync('./localhost+2.pem'),
    },
  },
});