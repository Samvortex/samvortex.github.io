---
title: '还得是谷歌，Gemini 4 发布猛得离谱 —— Argon 独占 12 项基准第一'
slug: 'gemini-4-argon-china-launch'
date: '2026-10-01'
category: 'notes'
tags: ['Google', 'Gemini', 'Gemini 4 Argon', 'DeepMind', 'AI 模型', 'DevDay', 'GPT-6', 'Claude Opus']
summary: '谷歌昨夜发布 Gemini 4 Argon（DeepMind 七个多月来首款高于 Flash 旗舰），DeepSWE v1.1 以 77.9% 居全球第一，Vals Index、AutomationBench 等 18 项基准 12 项第一 + 1 项并列。AI 智能指数（AII）53 分与 GPT-6 Astra 持平，幻觉率 15%（45+ 分模型中最低）。输出上限拉到 100 万 token（业内第一）。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（苍何 · 知乎）'
source_url: 'https://c.m.163.com/news/a/L84TUDKA0556FPPU.html'
---

## 一句话总结

> 谷歌 **Gemini 4 Argon**（DeepMind 七个多月来首款高于 Flash 旗舰）昨夜发布 —— **18 项基准 12 项第一 + 1 项并列**，**DeepSWE v1.1（真实软件工程）77.9% 全球第一**，**AII 智能指数 53 分**与 GPT-6 Astra 持平。**幻觉率 15%**（45+ 分模型中最低）。**输出上限拉到 100 万 token**（业内第一）。

## 关键数据

| 维度 | 数值 |
|---|---|
| **DeepSWE v1.1（真实软件工程）** | **77.9%**（全球第一）|
| **Vals Index（知识工作综合）** | **#1** |
| **AutomationBench（智能体能力）** | **#1** |
| **AI 智能指数（AII）** | **53 分**（与 GPT-6 Astra 持平，超过 GPT-6.1 Sol 1 分）|
| **AA-Omniscience 幻觉率** | **15%**（45+ 分模型中最低）|
| **输出 token 上限** | **1,000,000**（之前 64K，业内第一）|
| **输入模态** | 文本 + 图像 + 视频 + 语音 |
| **输出模态** | 文本 |

## 18 项基准对比（谷歌官方）

| 模型 | 第一 | 并列第一 |
|---|---|---|
| **Gemini 4 Argon** | **12** | **1** |
| **GPT-6 Astra** | 3 | — |
| **Claude Opus 5.5** | 2 | — |

> "谷歌如今再次**重回人工智能领域三大顶尖实验室之列**。"

## 智能体性能（Argon 的"弱项"被打破）

| 基准 | Gemini 4 Argon | Claude Sonnet 5.5 | 差距 |
|---|---|---|---|
| **AutomationBench-AA** | **77.5%**（#1）| 71.3% | **+6.2 分** |

> "智能体性能历来是 Gemini 模型的弱项，但 Gemini 4 Argon 在各项智能体评估中均有所提升。"

## 谷歌自家业务的"硬证据"（不靠 PR / 靠跑分）

### 1. 量子计算优化

```
利用 Argon 帮助量子计算研究人员优化子程序的时空资源
（量子比特 × 量子门）

几分钟内将性能提升 40% → 超过已发布基准水平
```

### 2. 数据中心内存优化

```
Argon Agent Team 分析整个集群的遥测数据
自主识别 + 应用 Google 数据中心内存优化

→ 释放 300 TiB+ 内存
→ 总节省预估 500 TiB - 1 PiB
```

### 3. 大规模 C/C++ → Rust 迁移

```
迁移规模：
- re2、libgav1 等核心库 → 数万行
- Fuchsia Zircon 内核 → 80 万+ 行

→ 对模型能力的考验"不是一点半点"
```

## API 定价

| 类别 | 标准价 | 优惠期（50% off）|
|---|---|---|
| 输入 | $4 / M tokens | **$2 / M** |
| 输出 | $20 / M tokens | **$10 / M** |
| **缓存输入** | $2 / M（默认） | **$0.10 / M** |
| **缓存折扣** | 95% off | — |

> 对比 Gemini 3.8 Flash 的 **90% 折扣**——**Argon 缓存折扣 +5 个百分点**。

## 放出节奏

| 阶段 | 谁能用 |
|---|---|
| **Phase 1（现在）** | **可信网络安全防御者**（Fairwind Program）|
| **Phase 2** | **付费 API + Google AI Ultra 用户** |
| **Phase 3（未公布时间）** | 广泛开放 |

> "希望不要像某些家伙一样，快放出给测测。"

## 关键能力（官方定位）

> "Gemini 4 Argon 主打**长程复杂任务**。"

### 三大主战场

| 场景 | 关键能力 |
|---|---|
| **软件工程** | 大规模代码库迁移 / 持续多日 debugging / 算法设计 |
| **金融 / 法律知识工作** | Vals Index 领先 |
| **网络安全防御** | 漏洞发现 / 验证 / 修复 |

### 数千名谷歌员工的反馈

> "强调了该模型在**专业编码任务、深度研究、高质量写作**方面的优势。"

## 作者（苍何）点评

> "**没拿到测试** —— 在当下，我认为 **Claude Opus 5.5 依旧是神**，那种爽感是完全不一样的。"

> "如果 Gemini 4 Argon **比不过 Opus 5.5**，大概率就是在拉。"

> "**我不知道为什么每次，这帮人老喜欢在中国的节假日发布新模型，太气人了。** 国庆第一天，别人在高速上堵车，我在电脑前熬夜看跑分。"

> "**发布会看跑分，干活还得看手感** —— 等 Argon 正式开放，我第一时间拉真实项目去测。"

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/gemini-4-argon-cn/image-01.jpg" alt="Gemini 4 Argon 中文报道" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：Gemini 4 Argon 发布（苍何 / 网易）</p>
</div>

## 来源

- [网易新闻（苍何 · 知乎）· 原文](https://c.m.163.com/news/a/L84TUDKA0556FPPU.html)
- Google 官方博客：Introducing Gemini 4 Argon（blog.google/innovation-and-ai/.../gemini-4-argon/）
- DeepMind 模型页：deepmind.google/models/gemini/
- Artificial Analysis（第三方评测）：ArtificialAnalysis.ai
- 知乎 @ 苍何（605 篇原创）