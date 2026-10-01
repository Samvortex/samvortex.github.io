---
title: "Samvortex Hub 改造说明"
slug: "hub-architecture-decision"
date: 2026-09-24
category: notes
tags: ["Astro", "架构", "CF Pages", "WCC"]
summary: "把 samvortex.com 从 jQuery 老模板重做成 Astro 静态站的决策记录：为什么选 Astro、为什么无数据库、为什么用 Git 集成而不是 Direct Upload。"
author: "Sam Xu"
draft: false
---

> 这是一篇**杂谈**短文，3 分钟读完。记录一次完整的站点重构决策。

## 改造前

| 项 | 状态 |
|---|---|
| 框架 | 纯 HTML + jQuery 1.7.1 |
| 内容管理 | 手写 HTML |
| 部署 | Cloudflare Pages（Git 集成） |
| 数据库 | 无 |
| 文章数 | 0（全是 about / contact 这种展示页） |

## 决策 1：为什么用 SSG 而不是 SPA？

我要的不是 App，是**内容站**。SSG = 内容在 build 时生成 HTML，用户访问的是纯 HTML + 资产文件。

| 方案 | 优点 | 缺点 |
|---|---|---|
| **SSG（选这个）** | 极快、SEO 友好、零服务器 | 改一处要 build 一次 |
| SPA | 动态 | SEO 差、首屏慢、要服务器 |
| SSR | 动态 + SEO | 要服务器 |

## 决策 2：为什么用 Astro 而不是 Next / Nuxt / Hugo？

| 候选 | 评估 | 结果 |
|---|---|---|
| **Astro** | 零 JS 默认、Markdown 原生、CF Pages 一等公民、Content Collections 类型校验 | **选** |
| Next.js | 默认 SSR，重 | 否 |
| Nuxt 3 | 偏 Vue 生态，集团内不熟 | 否 |
| Hugo | 模板语言老，AI 写不惯 | 否 |

## 决策 3：为什么 Git 集成而不是 Direct Upload？

CF Pages 的两条路径：

- **Git 集成**（选这个）：push 即部署，支持 PR Preview
- **Direct Upload**：手动 `wrangler pages deploy`，每次本地跑

Git 集成的代价：构建环境固化。但**内容站 99% 的修改都是内容**，不是 CLI 工具，**走 Git 是天然的版本管理**。

## 决策 4：为什么无数据库？

候选：
1. Cloudflare D1（SQLite）— 需要 Function 调用
2. Cloudflare KV — 同步键值存储
3. **不用** — 文件就是数据

我选择 3。**因为**:

- 文章不会超过 1000 篇
- 文章要版本管理（Git 是天然数据库）
- 文章要全文搜索（Pagefind 离线索引）
- 内容创作者（人+AI）直接写 `.md` 比填表单简单 100 倍

## 决策 5：AI 怎么写文章？

`src/content.config.ts` 是契约，AI 按契约写 → Astro build 时类型校验 → 失败立刻报错。

```
AI 生成 .md → frontmatter 校验 → Markdown 渲染 → 静态 HTML 输出 → CF CDN
```

**不需要后端 API，不需要编辑器**，整个链路是文件到文件。

## 最终成本

| 项 | 数量 |
|---|---|
| 月构建次数 | 10–30 次（免费额度内） |
| 月带宽 | < 10 GB（CDN 免费） |
| Pages Function | 0（没启用） |
| 总成本 | **$0 / 月** |

---

> **结论**：把内容站当 Git 仓库管，不是当数据库管。这是个人/中小型组织最稳的内容基建。