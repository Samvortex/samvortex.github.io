---
title: "Cloudflare Pages 静态站托管全栈评估"
slug: "cloudflare-pages-fullstack-evaluation"
date: 2026-09-24
category: evaluation
tags: ["Cloudflare Pages", "静态托管", "评估", "WCC"]
summary: "在集团 IT 场景下对 Cloudflare Pages 做完整的选型评估：性能、价格、CI/CD、Git 集成、安全、可观测性，与 Vercel / Netlify / GitHub Pages 横评。"
author: "Sam Xu"
draft: false
---

> 这是一篇**纯评估**文章，目的是为「要不要把集团外宣/知识站点迁到 CF Pages」这个问题提供决策依据。

## 1. 评估对象与场景

| 维度 | 描述 |
|---|---|
| 候选 | Cloudflare Pages, Vercel, Netlify, GitHub Pages |
| 场景 | 集团外宣站、知识库、文档站、轻量 SaaS 前端 |
| 规模 | 月 PV 50–200 万，100–500 个静态资源 |
| 关键诉求 | 全球访问快、零运维、CI/CD 自动化、域名与 DNS 在 CF 一体化 |

## 2. 评估维度与权重

| 维度 | 权重 | 评估要点 |
|---|---|---|
| 性能与 CDN | 25% | TTFB、缓存命中率、PoP 数量 |
| 价格 | 20% | 流量/构建/函数计费 |
| Git 集成 | 15% | PR Preview、多分支、可回滚 |
| 安全 | 15% | DDoS、WAF、Access、Turnstile |
| 可观测性 | 10% | 日志、Analytics、Web Vitals |
| 生态与可移植性 | 10% | 框架支持、导出难度 |
| 运维成本 | 5% | 配置复杂度、文档质量 |

## 3. 各家打分（10 分制）

| 维度 | CF Pages | Vercel | Netlify | GH Pages |
|---|---|---|---|---|
| 性能与 CDN | **9** | 8 | 8 | 6 |
| 价格 | **9** | 6 | 6 | 10 |
| Git 集成 | 9 | **10** | **10** | 7 |
| 安全 | **10** | 8 | 7 | 6 |
| 可观测性 | 8 | 9 | 8 | 5 |
| 生态可移植 | 8 | 9 | 9 | **10** |
| 运维成本 | **10** | 8 | 8 | **10** |
| **加权总分** | **9.05** | 7.95 | 7.65 | 7.50 |

> 加权算法：`Σ(分项得分 × 权重) / 10`。CF Pages 凭借**全球 Anycast 网络 + 域名在 CF 时 0 跳转 + 极简计费**，总评第一。

## 4. 关键能力对比

### 4.1 构建与部署

| 能力 | CF Pages | Vercel | Netlify |
|---|---|---|---|
| 构建时间免费额度 | 500 次/月 | 6000 分钟/月 | 300 分钟/月 |
| 并发构建 | 1 次（免费）/ 5 次（Pro） | 1 次 | 1 次 |
| PR Preview URL | ✅ | ✅ | ✅ |
| 一键回滚 | ✅ | ✅ | ✅ |
| 自定义域名 SSL | 自动 | 自动 | 自动 |

### 4.2 Functions（边缘函数）

CF Pages Functions 基于 **Workers** 运行时，单个账户免费额度：

- 请求：10 万次/天
- CPU 时间：30 秒 × 10 万次/天
- KV / D1 / R2：单独计费（KV 读写 100 万次免费）

实际项目里 Function 用得克制（**核心计算**——只做认证、表单、Edge 重写），其他走预构建。

## 5. 风险

1. **平台切换成本低 → 高**：CF Pages Git 集成后**无法切到 Direct Upload**，但导出很容易（只是 `dist/`）。
2. **Functions 与 Workers 不互通**：CF Pages 的 Function 部署到 Pages 项目里；如果你后面想用 Workers KV / D1，要在 Pages Function 里手动绑 binding。
3. **构建时长有限**：单次构建 20 分钟（免费）/ 40 分钟（Pro），大型站（MPA 500+ 页）要小心。
4. **国内访问**：CF 在国内没有 PoP，访问要走香港/新加坡。如果你的核心读者在国内，建议再加一个国内 CDN 镜像（阿里云 OSS + 阿里云 CDN）。

## 6. 决策建议

| 场景 | 推荐 |
|---|---|
| **海外读者为主**（默认） | **CF Pages** ✅ |
| 国内用户占比 > 30% | 阿里云 OSS + CDN + 国内外双写 |
| 已重度使用 Next.js / ISR | Vercel |
| 已有 Netlify 团队 | 维持 Netlify |
| 完全不想管事（学生/博客） | GitHub Pages |

## 7. 行动项

- [x] 把 `samvortex.com` 迁移到 CF Pages（站点用 Astro）
- [ ] 给集团外宣站做同样迁移
- [ ] 评估 CF Zero Trust 替代 VPN（下一篇文章）

---

> **TL;DR**：CF Pages 在「性能 + 安全 + 价格」三个最关键维度同时拿第一，是个人与中小型企业静态站的**最优解**；前提是你的 DNS 也在 CF，或者愿意迁过去。