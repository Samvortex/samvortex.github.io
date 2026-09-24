---
title: "欢迎来到 Samvortex Hub：技术与研究的发布中心"
slug: "welcome-to-samvortex-hub"
date: 2026-09-24
category: notes
tags: ["meta", "site", "welcome"]
summary: "Samvortex Hub 是我的个人技术发布中心。本文解释站点的定位、内容分类与生产流程，以及如何用 AI 协助写作。"
author: "Sam Xu"
featured: true
draft: false
---

这是 `Samvortex Hub` 的开篇文章，先用它讲清楚三件事：**站点是什么**、**内容怎么分类**、**怎么用 AI 帮我写**。

## 站点定位

我不是要再做一个博客平台（个人博客这个词已经贬值了）。这里只有一个目的：

> 把我在 IT 架构、产品评估、技术对比中的真实研究沉淀下来，**让同行能引用、能反驳、能复用**。

每一篇文章的来源都基于：

1. 我的真实工作场景（惠灵顿教育集团 IT 架构）
2. 可公开验证的资料（厂商白皮书、Github、官方文档、RFC）
3. 我或团队做过的 PoC / 测试数据

## 内容分类

| 分类 | URL 前缀 | 用途 | 典型长度 |
|---|---|---|---|
| 研究 | `/research/` | 深度研究、趋势分析 | 2000–6000 字 |
| 对比 | `/compare/` | 产品横向 / 纵向对比 | 1500–4000 字 |
| 评估 | `/evaluation/` | 选型评估、平台打分 | 1000–3000 字 |
| 杂谈 | `/notes/` | 短记录、思考碎片 | 200–800 字 |

## AI 协助写作契约

我让 AI（Claude / GPT / DeepSeek 等）写文章时，**严格遵守下面这套契约**，避免输出乱七八糟：

- **路径**：`src/content/{category}/{slug}.md`
- **slug**：小写英文 + 短横线（`^[a-z0-9]+(?:-[a-z0-9]+)*$`），不超过 60 字符
- **frontmatter** 必填：`title / slug / date / category / tags / summary / author / draft`
- **正文**：标准 GFM，**表格优先于段落**
- **配图**：放在同目录 `./images/`，引用用相对路径
- **引用**：可点击链接 + 标题
- **代码块**：必须标语言
- **draft: true** = 不发布；写完改 `false`

AI 不知道这个 schema？把上面这段直接贴进它的 system prompt，**build 阶段 Astro 会自动校验**，schema 不过直接 build 失败，比人工 review 早一步。

## 推送即发布

```
本地写（或 AI 生成）→ git push origin master → Cloudflare Pages 自动构建 → 全网生效
```

完整链路大约 60 秒：GitHub webhook → CF 拉代码 → `npm run build` → 推到全球 CDN。

> 不需要数据库，不需要服务器，不需要运维。

## 接下来会写什么

按目前排期，未来两周内会发布：

1. **研究**：Cisco DNA Center 在多校区统一管理中的最佳实践
2. **对比**：Cisco ISE vs 深信服 AC（集团级学生终端准入）
3. **评估**：Cloudflare Zero Trust 替代传统 VPN 在教育场景的可行性
4. **杂谈**：为什么我们决定把所有内部工具统一到 Pages Functions

订阅 [RSS](/rss.xml) 即可获取更新。