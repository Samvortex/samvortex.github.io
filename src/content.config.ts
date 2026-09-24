// 文章 Collection Schema — 给 AI 用的"内容契约"
// 任何 .md 文件如果不符合这个 schema，build 会失败
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug 必须是小写英文 + 短横线'),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['research', 'compare', 'evaluation', 'notes']),
      tags: z.array(z.string()).default([]),
      summary: z.string().min(20).max(300),
      author: z.string().default('Sam Xu'),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      cover: image().optional(),
    }),
});

export const collections = { articles };
