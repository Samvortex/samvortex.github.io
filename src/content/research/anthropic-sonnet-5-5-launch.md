---
title: 'Anthropic Sonnet 5.5 发布：编程能力从 10% 飙到 70%，但"何时用"成为新问题'
slug: 'anthropic-sonnet-5-5-launch'
date: '2026-09-29'
category: 'notes'
tags: ['Anthropic', 'Claude', 'Sonnet 5.5', 'Opus 5.5', 'AI 模型', '编程 Agent']
summary: 'Anthropic 在 Opus 5.5 发布不到一周，再推 Claude Sonnet 5.5。编程能力 Terminal-Bench 4.0 从 10.3% 跃升至 70.6%，超过 Opus 5.5。多数任务成本降 30%，但 Max 推理下成本可达 7.60 美元 / 次。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（编译自 InfoQ）'
source_url: 'https://c.m.163.com/news/a/L807BM360511D3QS.html'
---

## 一句话总结

> Anthropic **Sonnet 5.5** 把"Sonnet 这个中档模型"推到了接近 Opus 的位置，但同时让"我什么时候才用 Sonnet"的灵魂拷问浮上水面。

## 核心数据

| 指标 | 数值 |
|---|---|
| 速度提升 | 30%+ |
| 单任务成本（多数任务） | 最高省 30% |
| **Terminal-Bench 4.0**（核心 Agentic Coding 测试） | **10.3% → 70.6%**（超过 Opus 5.5）|
| CursorBench | 55.5%（Opus 5.5 是 57.8%，差 ~2 个百分点）|
| Haiku 5.5 | 未来几周内推出 |

## 编程能力跃迁

### Terminal-Bench 4.0

- 模型在**命令行环境自主使用工具**，完成复杂多步骤任务
- 这已经**不只是代码补全**，而是完整的 **Agentic Coding**

### CursorBench（更接近日常开发）

- 使用 Cursor 编辑器**真实编程会话**的任务
- 需求模糊、跨文件修改、理解现有代码库
- **Sonnet 5.5：55.5%**，Opus 5.5：57.8%

### 早期测试者反馈（Lovable / Base44）

- 编程任务工具调用**减少约 1/3**
- Shell 执行次数**大约减半**
- Base44：118 次构建里，Sonnet 5.5 平均 **3.6 轮**完成应用，Opus 5 要 **7.7 轮**
- 工具调用失败次数也是**所有参测模型中最少的**

## "省 30%" 的真相

Sonnet 5.5 延续 Sonnet 5 价格：

| 类别 | 价格 / 百万 Token |
|---|---|
| 输入 | $2 |
| 输出 | $10 |
| 缓存读取 | $0.2 |
| 缓存写入 | $2.5 |

**但** Artificial Analysis 测试显示：

- Sonnet 5.5 **Max** 平均每任务 **19.3 万输出 Token**（测试过模型中最高）
- 比 Opus 5.5 Max 高约 60%，**约为 GPT-6 Astra Max 的 7 倍**
- **单任务成本 $7.60**（比 Sonnet 5 高约 50%）
- Intelligence Index：**56 分**（Opus 5.5 Max 低 2 分）

**结论**：Anthropic 的"30%" 针对多数任务；**把推理强度调到 Max 后成本优势立刻消失**。

## 何时用 Sonnet 5.5？—— 社区灵魂拷问

### 用户视角的尴尬

- **Hacker News 用户 A**：Opus 5.5 效率已经很高，Max 5x 套餐额度也够用 —— **"我想知道自己什么时候才会使用 Sonnet 5.5"**
- **Hacker News 用户 B**："Opus 5.5 Low 设置看起来比 Sonnet Medium **更聪明、更便宜、速度也更快**，那 Sonnet 存在的意义是什么？"
- 唯一场景：Claude Code **子 Agent** 继承主 Agent 的 Thinking Level，需要不同强度推理时会用 Sonnet
- 原话："这算不上一个特别好的理由，只是我目前唯一会使用 Sonnet 的场景"

### 真正适合的场景

| 用户类型 | Sonnet 5.5 适用性 |
|---|---|
| **Max 订阅用户**（固定月费） | ❌ Opus 5.5 + 现有额度已够用，没迫切切换理由 |
| **API 用户**（高频明确可验证任务） | ✅ 批量修 Bug、补测试、并行多 Agent —— Medium/High 价格优势明显 |
| **Max 推理强度**（不分订阅/API） | ❌ 成本反而进入另一个区间（10 任务 $76，100 任务 $760）|

**最清晰定位**：高频、明确、可验证的 API 任务。

## 网络安全回退机制

Sonnet 5.5 是**首款加入网络安全分类器和模型回退机制的 Sonnet**，防护级别接近 Opus 5：

1. **第一阶段**：系统探针读取模型内部激活状态
2. **第二阶段**：Sonnet 5.5 上运行的轻量级分类器检查
3. **第三阶段**：单独训练的 LLM 分类器决定是否拦截

**如果判定为高风险任务**：

- Claude 应用：用户会看到**模型切换提示**
- API 开发者：需主动启用**服务器端 fallback**
- 高风险请求会自动交给 **Sonnet 5**（较弱版）处理

**实际触发率**：

- Artificial Analysis 测试 5 档推理强度时均启用了默认回退
- 约 **0.1%** Intelligence Index 任务触发回退
- 主要集中在 Terminal-Bench 4.0
- 所有触发回退的请求最终由 Sonnet 5 处理

**意义**："选 Sonnet 5.5" = "它是否比 Opus 更适合当前任务" + "这项请求最终是否真的由 Sonnet 5.5 完成"

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/anthropic-sonnet-5-5/image-01.png" alt="Claude Sonnet 5.5 发布与编程能力对比" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：Sonnet 5.5 发布概览（含 Terminal-Bench 4.0 等基准对比）</p>
</div>

## 来源

- [网易新闻（编译自 InfoQ）· 原文链接](https://c.m.163.com/news/a/L807BM360511D3QS.html)
- [Anthropic 官方 · Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)
- [Artificial Analysis · 测评](https://artificialanalysis.ai/articles/claude-sonnet-5-5)