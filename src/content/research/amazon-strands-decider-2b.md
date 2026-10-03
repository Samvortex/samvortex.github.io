---
title: '亚马逊推出 Strands Decider 2B 开源决策模型'
slug: 'amazon-strands-decider-2b'
date: '2026-10-03'
category: 'notes'
tags: ['亚马逊', 'Amazon', 'Strands Agents', 'Strands Decider 2B', '开源', '决策模型', 'Qwen3.5-2B', 'LoRA rank-16', 'JevBench', 'CPU + GPU 本地推理', 'RTX 3090', 'Hugging Face', 'GitHub', '小模型']
summary: '⭐ **亚马逊 Strands Agents 团队（2026-10-01）开源 Strands Decider 2B 决策模型** —— ⭐ **基于 Qwen3.5-2B "躯干"** + ⭐ **评分功能指针"头部"**（替换原文本生成头，总参数 ⭐ **仅略超 100 万**）+ ⭐ **rank-16 LoRA 微调**。JevBench ⭐ **2B 级排名第 3** / 优于所有 ≤2B 对手。本地 ⭐ **113ms 决策时延** / RTX 3090 小型决策 ⭐ **153ms 中位数**。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（IT 之家）'
source_url: 'https://c.m.163.com/news/a/L8B4A5JR0511B8LM.html'
---

## 一句话总结

> ⭐ **亚马逊 Strands Agents 团队（2026-10-01）开源 Strands Decider 2B 决策模型** —— ⭐ **基于 Qwen3.5-2B "躯干"** + ⭐ **评分功能指针"头部"**（替换原文本生成头，总参数 ⭐ **仅略超 100 万**）+ ⭐ **rank-16 LoRA 微调**。JevBench ⭐ **2B 级排名第 3** / 优于所有 ≤2B 对手。本地 ⭐ **113ms 决策时延** / RTX 3090 小型决策 ⭐ **153ms 中位数**。

---

## 一、模型架构 ⭐

### 核心思路 ⭐

> "⭐ **Strands Decider 2B 基于预训练的 Qwen3.5-2B "躯干"**，⭐ **以具备评分功能的指针"头部"替换拥有文本生成能力的原有语言模型"头部"**。"

### 组件细节

| 组件 | 详情 |
|---|---|
| ⭐ **"躯干"** | **Qwen3.5-2B 预训练** |
| ⭐ **"头部"** | **评分功能指针**（替代文本生成）|
| ⭐ **头部规模** | **总参数仅略超 100 万**（小型）|
| ⭐ **微调** | **rank-16 LoRA 适配器** |

> ⭐ **设计哲学**：**用小型的评分头 + 大的躯干 backbone** —— 比纯文本生成更高效、更专注决策任务。

---

## 二、JevBench 测评 ⭐

> "Strands Decider 2B 在 ⭐ **JevBench 公开数据集**上具有不错的 ⭐ **准确率和校准度**表现。"

| 排名 | 详情 |
|---|---|
| ⭐ **2B 级别模型中** | ⭐ **排名第 3** |
| ⭐ **严格 ≤2B 竞争对手** | ⭐ **优于所有** |

---

## 三、本地运行性能 ⭐

### 通用硬件 ⭐

| 指标 | 数值 |
|---|---|
| ⭐ **决策时延中位数** | ⭐ **113ms** |

### NVIDIA RTX 3090 ⭐

| 指标 | 数值 |
|---|---|
| ⭐ **小型决策任务中位数时延** | ⭐ **153ms** |

### 部署 ⭐

| 维度 | 详情 |
|---|---|
| ⭐ **GitHub** | 已 ⭐ **开源** |
| ⭐ **Hugging Face** | ⭐ **权重可获取** |
| ⭐ **运行平台** | ⭐ **本地 CPU / GPU** |

---

## 四、Strands Agents 团队 ⭐

> "**Amazon（亚马逊）Strands Agents 团队** ⭐ **当地时间本月 1 日**（2026-10-01）宣布推出 ⭐ **Strands Decider 2B 决策模型**。"

### Strands Agents 是什么 ⭐

> **Strands** = 亚马逊 AI Agent SDK → 帮开发者构建、运行和部署 AI 智能体

> **Strands Decider 2B** 是其生态内的 ⭐ **专用决策模型** —— ⭐ **专注"决策"而非"生成"**，更轻、更快、更好本地化。

---

## 五、技术意义 ⭐

### 为什么要做"决策头"

| 维度 | 传统文本生成 | ⭐ 评分决策头 |
|---|---|---|
| **目标** | 流畅文字 / 长篇 | ⭐ **比较 / 评分多个候选** |
| **参数效率** | 大头在语言建模 | ⭐ **小头做评分**（仅 100 万参数）|
| **决策质量** | 间接（需要解码整段文字）| ⭐ **直接给分数**（更准）|
| **时延** | 长（生成整个 token 序列）| ⭐ **短**（只输出分数）|

### 与 Qwen3.5-2B 的关系 ⭐

> ⭐ **继承 Qwen3.5-2B 的预训练表示能力** + **LoRA rank-16 小幅适配** + **评分头做最终决策** —— ⭐ **比纯 fine-tune 更轻量**。

---

## 六、应用场景 ⭐

| 场景 | 价值 |
|---|---|
| ⭐ **Agent 路径选择** | 多候选方案选最优 |
| ⭐ **Tool 调用决策** | 选哪个 API / 工具 |
| ⭐ **多轮对话状态切换** | 决定下一步动作 |
| ⭐ **生产环境 Agent** | ⭐ **本地低延迟** + **可控** |
| ⭐ **边缘部署** | ⭐ **CPU / GPU 本地跑**（无需依赖云端 API）|

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/amazon-strands-decider-2b/image-01.jpg" alt="亚马逊 Strands Decider 2B" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：亚马逊 Strands Decider 2B —— Qwen3.5-2B "躯干" + 评分"头部" + LoRA rank-16（IT 之家 · 2026-10-03）</p>
</div>

## 来源

- [网易新闻（IT 之家）· 原文](https://c.m.163.com/news/a/L8B4A5JR0511B8LM.html)
- Amazon Strands Agents 团队公告（2026-10-01）
- JevBench 公开数据集
- Qwen3.5-2B 预训练模型
- Hugging Face（权重）