# FractalBits Website

Landing page and blog for [FractalBits](https://github.com/fractalbits-labs/fractalbits-main) - High-Performance S3-Compatible Object Storage.

Live at: https://fractalbits.com

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Blog posts with JSX support

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/     # Reusable Astro components
  content/
    blog/         # Blog posts (.mdx files)
    config.ts     # Content collection schema
  layouts/        # Page layouts
  pages/          # Route pages
  styles/         # Global CSS
public/           # Static assets
```

## Adding Blog Posts

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description of the post"
pubDate: 2025-12-04
author: "Author Name"
tags: ["tag1", "tag2"]
---

Your content here. You can use JSX components!

import MyComponent from '../../components/MyComponent.astro';

<MyComponent />
```

## Deployment

Automatically deployed to GitHub Pages on push to `main` branch via GitHub Actions.
