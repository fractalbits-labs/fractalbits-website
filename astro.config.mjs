import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.fractalbits.com',
  redirects: {
    '/blog/we-moved-object-storage-metadata-off-lsm-trees/':
      '/blog/metadata-engine-for-our-object-storage-from-lsm-tree-to-fractal-art/',
  },
  integrations: [mdx(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
