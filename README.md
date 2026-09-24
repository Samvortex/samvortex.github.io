# Samvortex Hub

`www.samvortex.com` 的源码。技术研究、产品对比、选型评估的信息发布中心。

## 技术栈

- **Astro 5** — 静态站生成器，零 JS 默认
- **Tailwind CSS** — utility-first 样式
- **TypeScript** — 严格模式
- **Pagefind** — 静态全文搜索
- **Cloudflare Pages** — 自动构建 + 全球 CDN

## 本地开发

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # 生产构建 + Pagefind 索引
npm run preview      # 预览 dist/
```

## 目录结构

```
src/
├── content/                 # 所有文章（Markdown）
│   ├── research/            # 研究
│   ├── compare/             # 对比
│   ├── evaluation/          # 评估
│   └── notes/               # 杂谈
├── content.config.ts        # 文章 schema（AI 生成契约）
├── config/site.ts           # 站点级常量
├── components/              # 复用组件
├── layouts/                 # 布局
└── pages/                   # 路由
    ├── index.astro          # 首页
    ├── about.astro
    ├── research/index.astro
    ├── compare/index.astro
    ├── evaluation/index.astro
    ├── notes/index.astro
    ├── tags/[tag].astro     # 标签聚合
    ├── search.astro
    ├── rss.xml.ts
    └── [category]/[slug].astro  # 所有文章共用
```

## 内容生产流程

1. 在 `src/content/{category}/` 下新建 `.md` 文件
2. frontmatter 必填字段：`title / slug / date / category / tags / summary / author / draft`
3. `npm run build` — Astro 自动校验 schema，失败立刻报错
4. `git add . && git commit -m "content(research): xxx" && git push origin master`
5. Cloudflare Pages 自动构建部署（约 60 秒）

## 部署

- **平台**：Cloudflare Pages
- **GitHub**：https://github.com/Samvortex/samvortex.github.io
- **域名**：samvortex.com
- **Build 命令**：`npm run build`
- **输出目录**：`dist`
- **Node 版本**：22

## 给 AI 的提示词模板

把以下内容放进 AI 的 system prompt：

```
你正在为 Samvortex Hub 写文章。
- 路径：src/content/{category}/{slug}.md
- category ∈ { research, compare, notes, evaluation }
- frontmatter 必填: title, slug, date, category, tags, summary, author, draft
- slug: ^[a-z0-9]+(?:-[a-z0-9]+)*$，不超过 60 字符
- 正文使用 GFM Markdown，表格优先于段落
- 引用必须带链接
- 代码块标语言
- draft: true 时不发布
```