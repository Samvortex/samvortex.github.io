// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Cloudflare Pages 部署配置
// - site 用于 sitemap / RSS / OG 绝对 URL
// - output: 'static' 是默认，确保零运行时
// - trailingSlash: 'always' 让 /about/ 这种 URL 稳定
// - mdx: 让 .mdx 文章可以 import + 使用 Astro 组件（用于深度对比报告等富内容）
export default defineConfig({
  site: 'https://samvortex.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  build: {
    // Cloudflare Pages 默认资产目录
    assets: '_astro',
  },
  vite: {
    build: {
      // CSS 文件拆小，CDN 缓存命中率更高
      cssCodeSplit: true,
    },
  },
});