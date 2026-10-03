// 文章 Collection Schema — 给 AI 用的"内容契约"
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['research', 'compare', 'evaluation', 'notes', 'sports']),
      tags: z.array(z.string()).default([]),
      summary: z.string().min(20).max(300),
      author: z.string().default('Sam Xu'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      cover: image().optional(),
    }),
});

// Morning Brief — 独立位置，不在 src/content/ 下（避免被 articles glob 抢走）
const morningBrief = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/morning-brief' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    ticker: z.array(z.string()),
    lead: z.object({
      headline: z.string(),
      standfirst: z.string(),
      source: z.string(),
      url: z.string(),
    }),
    sections: z.array(z.object({
      num: z.string(),
      tag: z.string(),
      tag_class: z.string().optional(),
      slug: z.string().optional(),
      color: z.string(),
      headline: z.string(),
      lede: z.string(),
      quote: z.string().optional(),
      items: z.array(z.string()).optional(),
      chart: z.boolean().optional(),
      source: z.string(),
      url: z.string(),
    })),
    // Slugs that successfully fetched a real news image (template uses this
    // to render <img> only when there's a real image — otherwise text-only card).
    available_images: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, morningBrief };
