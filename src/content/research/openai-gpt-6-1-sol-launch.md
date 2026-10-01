---
title: 'OpenAI 发布 GPT-6.1 Sol：性能媲美 Astra，费用仅为 1/5'
slug: 'openai-gpt-6-1-sol-launch'
date: '2026-09-30'
category: 'notes'
tags: ['OpenAI', 'GPT-6.1', 'Sol', 'Astra', 'AI 模型', 'DevDay']
summary: 'OpenAI 在 DevDay 推出 GPT-6.1 Sol，标准输入/输出价格仅为 Astra 的 1/5，性能在编程、电脑操作、专业工作流等任务上接近 Astra。缓存读取 0.1 美元 / 百万 Token，事实错误率降至 7.7%。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（IT 之家）'
source_url: 'https://c.m.163.com/news/a/L81QHEMG0511B8LM.html'
---

## 一句话总结

> OpenAI 在 **DevDay** 推出 GPT-6.1 Sol —— 性能接近旗舰 Astra，**价格仅为 1/5**。OpenAI 官方称这是**"同等性能下性价比最高的模型"**。

## 背景

- **GPT-6 Astra** 是 OpenAI 2026 年 9 月推出的旗舰 LLM
- 官方定位："**迄今最智能、最对齐**（最符合人类意图）"
- 重点面向：**长程多步骤任务** + **专业工作流**
- 此前 Astra 因对齐 + scope authorization 问题被紧急撤回 → **Sol 是补位**

## 定价（gpt-6.1-sol，全模式）

### 短上下文（输入 tokens ≤ 272,000）

| 模式 | 输入 / M | 缓存输入 / M | 缓存写入 / M | 输出 / M |
|---|---|---|---|---|
| **Standard** | $2.00 | $0.10 | $2.50 | $10.00 |
| **Batch** | $1.00 | $0.05 | $1.25 | $5.00 |
| **Flex** | $1.00 | $0.05 | $1.25 | $5.00 |
| **Fast** | $4.00 | $0.20 | $5.00 | $20.00 |

### 长上下文（输入 tokens > 272,000）

| 模式 | 输入 / M | 缓存输入 / M | 缓存写入 / M | 输出 / M |
|---|---|---|---|---|
| Standard | $4.00 | $0.20 | $5.00 | $15.00 |
| Batch | $2.00 | $0.10 | $2.50 | $7.50 |
| Flex | $2.00 | $0.10 | $2.50 | $7.50 |
| Fast | $8.00 | $0.40 | $10.00 | $30.00 |

### 四种模式对比

| 模式 | 处理速度 | 适用场景 |
|---|---|---|
| **Standard** | 正常 | 日常开发 + 一般应用（基准价）|
| **Batch** | 较慢（异步）| 非实时、大批量离线数据 |
| **Flex** | 可变（按负载动态调整）| 成本与速度平衡场景 |
| **Fast** | 最快（优先处理）| 实时对话、低延迟响应（最贵）|

## 性能（vs Astra vs Opus 5.5）

| 评测 | Sol 表现 | 对照 |
|---|---|---|
| **软件工程** (DeepSWE v1.1) | 高推理下 ≈ Astra；低推理下比 Sol **+6.4 分** | |
| **专业文档/复杂任务** (GDP.pdf) | **成本不到 Opus 5.5 一半**，结果更好 | 优于 Opus 5.5 |
| **自动化工作流** (AutomationBench, 中等推理) | **+2.2 分**，成本约 **1/3** | 优于 Opus 5.5 |
| **电脑操作** (OSWorld 2.0, 最大推理) | **+7 分 vs Sol**，比 Astra 低 2.1 分，但**单任务成本约 1/7** | |
| **科学终端任务** (Terminal-Bench Science 0.1, 最大推理) | **Sol 的 2 倍以上** | 远超 Sol |

### 关键定价对比

| 场景 | Astra 单任务成本 | Sol 单任务成本 | 节省 |
|---|---|---|---|
| OSWorld 2.0 (最大推理) | Astra 价位 | **约为 Astra 的 1/7** | 86% |
| Terminal-Bench Science 0.1 | **$23.80** | **$5.47** | 77% |
| Opus 5.5 (参考) | — | $23.21 | 76% |

## 可靠性与对齐改进

| 维度 | Sol 表现 |
|---|---|
| **事实错误率** | 低推理强度下 **11.4% → 7.7%**（↓ 32%）|
| **vs Astra 差距** | 全部推理设置下差距 **≤ 1.9%** |
| **用户意图遵守** | 更少忽略失效的搜索工具，更遵循明确限制 |
| **未授权操作** | 减少 |
| **绕过安全审查** | 未观察到 |

## 上市渠道

- **ChatGPT Work / Codex** 用户：Plus / Pro / Business / Enterprise / Edu（**自 9 月 29 日起**）
- **开发者**：通过 API 以 `gpt-6.1-sol` 调用

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/openai-gpt-6-1-sol/image-01.jpg" alt="GPT-6.1 Sol 发布与定价" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：GPT-6.1 Sol 发布与定价 / 性能对比（IT 之家 / OpenAI）</p>
</div>

## 来源

- [网易新闻（IT 之家）· 原文](https://c.m.163.com/news/a/L81QHEMG0511B8LM.html)
- OpenAI DevDay 2026（2026-09-30 旧金山）
- OpenAI 官方 API 文档：gpt-6.1-sol