import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.fractalbits.com',
  integrations: [mdx(), tailwind()],
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
});
