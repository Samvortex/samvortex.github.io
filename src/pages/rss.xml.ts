import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return rss({
    title: SITE.title,
    site: context.site ?? SITE.url,
    description: SITE.description,
    items: articles
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((a) => ({
        title: a.data.title,
        pubDate: a.data.date,
        description: a.data.summary,
        link: `/${a.data.category}/${a.data.slug}/`,
        categories: [a.data.category, ...a.data.tags],
      })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
