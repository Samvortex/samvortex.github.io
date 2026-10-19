---
title: 'Claude 设计的量子电路：7 个超越 SOTA + 1 个新算法架构'
slug: 'claude-quantum-circuits-evolutionary-2026-10-19'
date: '2026-10-19'
category: 'research'
tags: ['AI', '量子计算', 'Anthropic', 'Claude', 'LLM co-design', '算法', '进化搜索', 'Toffoli', 'modular inversion', 'divsteps']
summary: 'Anthropic 用 Claude 在 8 类量子计算任务中设计了新电路——7 类显著降低 Toffoli 与 qubit 数（"数量级或更多"），第 8 类（素数域模逆元）发现了一种新的可逆算法架构，让原本对可逆计算不实用的 divsteps 算法变得可行。论文提出 "evaluator-guided LLM co-design" 范式，由 Anthropic STEM Fellows 主导 + 哈佛 Lukin 团队合作。'
author: 'Sam Xu'
featured: true
draft: false
source: 'Anthropic 一手 release + arXiv 论文 2610.22367'
source_url: 'https://www.anthropic.com/research/designing-efficient-quantum-circuits'
---

## 一句话总结

> ⭐ **Claude 在 8 个量子计算任务里：7 个把 Toffoli / qubit 数压到 SOTA 以下，第 8 个（素数域模逆元）发现了一种**新的可逆算法架构**——让原本对可逆计算"不实用"的 divsteps 算法变得可行。**这是 AI 不只在压常数，而是在提出新的算法结构**。

---

## 一、标题党 vs 实际：这次 163 算靠谱

| 163 标题说法 | arXiv 实际 (2610.22367) |
|---|---|
| "Anthropic 称 Claude 设计的量子电路超越顶尖现有方案" | **基本准确**，措辞谨慎（"improve on the best published circuits, in some cases by an order of magnitude or more"）|
| 8 类任务都"更高效" | **7 个更高效，1 个不是更高效——是发现新架构** |
| 椭圆曲线点加法是"代表性成果" | 论文 8 类任务里没特别标这个；椭圆曲线可能是模逆元突破的应用面之一 |
| "几乎无需人工干预" | "Working **largely on its own**" — Anthropic 自己的措辞更谨慎 |

---

## 二、核心方法：Evolutionary Framework

<img src="/img/research/claude-quantum-circuits-evolutionary-2026-10-19/evolutionary-loop.svg" alt="Evolutionary framework 闭环" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />

⭐ 论文真正的方法论贡献不是"Claude 很强"，是这套 **evolutionary framework**：

1. **任务规格（plain language）** — 给 Claude 用自然语言描述 8 类任务
2. **LLM 提议** — Claude 生成 Python 代码构造量子电路（"evolutionary agent"）
3. **独立评估器** — **与 LLM 独立**地验证正确性 + 按 Toffoli × qubit 打分
4. **反馈迭代** — 评分作为反馈，让 Claude 改进下一轮

**3 个独立层设计**：

- LLM 不自我评估（防止"幻觉电路"）
- 评分函数 = Toffoli × qubit（可数值验证、可对比 SOTA）
- Python 代码作为电路（LLM 擅长的表达格式——natural fit）

---

## 三、8 个任务结果：7 改进 + 1 新架构

<img src="/img/research/claude-quantum-circuits-evolutionary-2026-10-19/8-tasks-results.svg" alt="8 个任务结果" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />

论文摘要原话：
> "In **seven of the eight tasks**, the discovered circuits significantly reduce both Toffoli and qubit counts relative to the state of the art. In the **eighth**, the search discovers a **new reversible architecture** for prime-field modular inversion."

分布：

| 任务数 | 类型 | 跨 5 领域 |
|---|---|---|
| 7 | 显著降低 Toffoli + qubit | numerical / chemistry / optimization / simulation / number theory（部分）|
| 1 | 发现新的可逆算法架构 | number theory（素数域模逆元）|

---

## 四、第 8 个任务详解：modular inversion via divsteps

<img src="/img/research/claude-quantum-circuits-evolutionary-2026-10-19/modular-inversion.svg" alt="Modular inversion 突破" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />

> ⭐ **第 8 个任务不是"更小"，是"新结构"**——这是论文真正的 novelty。

### 问题背景

- **素数域模逆元**（modular inversion）是数论 / 密码学 / Shor 算法的核心操作
- 经典的 **divsteps** 算法对模逆元**非常高效**（线性时间）
- 但 divsteps 本身**不可逆**——会丢弃中间分支
- 强转可逆 = 存全部历史 = qubit 数爆炸 → 之前对可逆算术**不实用**

### Claude 的突破

> 论文原话: *"By handling reversibility differently, the architecture makes divsteps — a classical algorithm previously impractical for reversible integer arithmetic — viable and substantially improves the Toffoli-qubit trade-off for modular inversion."*

- 找到一种新的可逆设计方式，**无需存完整分支历史**
- 让 divsteps **对可逆计算变得实用**
- 显著改善 Toffoli × qubit 权衡

### 应用前景

- **Shor 算法** 量子化的关键路径之一
- **椭圆曲线密码学** 相关量子电路
- 整体"大整数模运算"的量子化打通

---

## 五、跟昨天 GRH 接力对比

昨天 12 天数学接力的文章，**重点是 AI 工具 + 人类数学家协作去条件化 19 年悬案**。今天这篇是**完全不同范式**：

| 维度 | 昨天 GRH | 今天 Claude 量子 |
|---|---|---|
| **AI 角色** | L2/L3 混合（OpenAI 出工具 + 数学家写最终证明）| **L1 独立**（Claude 单独设计 + 评估器验证）|
| **人类角色** | Frei 等数学家写最终证明 | Anthropic STEM Fellows 提供方向 + 评估器 |
| **突破性质** | 应用层（去条件化 19 年悬案）| 算法层（发现新架构）|
| **可验证性** | Lean 4 形式化 + 论文 | **独立评估器** + 论文 |
| **学术规范** | Frei et al 显式声明"未使用 AI" | Anthropic 团队 100% 公开用 AI |

⭐ **真正值得对比的不是"谁更强"，是两种 AI 协作范式**：

- **昨天**：AI 是**铲子**，人类数学家是**矿工**
- **今天**：AI 是**独立研究员**，人类是**mentor + 评估器**

---

## 六、对实用量子计算的意义

- 硬件要求降低 → "practical quantum computers could arrive **sooner than previously anticipated**"（Anthropic 原文）
- 8 个任务里 7 个数量级改进 + 1 个新算法 → 不是"渐进"，是"跨级"
- Anthropic 提到具体应用：新药设计、高效电池、新型催化剂、清洁肥料（FeMoco 模拟的实际应用）
- **背景**：当前量子设备只有数百到数千个 qubit，远不够跑复杂算法。任何"减少 qubit 需求"的突破都直接拉近实用化

---

## 七、还差什么

> ⭐ **这次解决的是"算法效率"，不是"硬件 / 纠错"**。

| 维度 | 这次 | 实用量子计算还差 |
|---|---|---|
| 电路设计 | ✓ 7 个 SOTA + 1 个新架构 | — |
| 硬件 | 没碰 | 数千 → 数百万 qubit 物理规模 |
| 纠错 | 没碰 | QEC 表面码 / 逻辑 qubit 转换 |
| 噪声 | 没碰 | 退相干 / 测量错误 / 控制误差 |
| 工程 | 没碰 | 低温 / 隔离 / 控制系统 |

论文自己也很诚实：
> "Quantum circuit design is just one piece of building a fault-tolerant quantum computer; error correction, hardware control, and other problems still need coordinated breakthroughs."

---

## 参考资料

| 类型 | 链接 |
|---|---|
| Anthropic 一手 release | https://www.anthropic.com/research/designing-efficient-quantum-circuits |
| arXiv 论文 | https://arxiv.org/abs/2610.22367 |
| 163 中文转载 | https://c.m.163.com/news/a/L9F23E5L0511B8LM.html |

---

## 一句话再总结

> ⭐ **Claude 做的不是"8 个电路优化"，是"7 个 SOTA 改进 + 1 个新算法架构 + 一套 LLM co-design 范式"**——比 163 文暗示的更有结构，也比纯数学突破的 GRH 那篇更能体现 AI 作为"独立研究员"的能力边界。
