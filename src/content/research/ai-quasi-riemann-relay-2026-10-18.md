---
title: 'AI 真破 GRH 了吗？—— 拆解一场 12 天的数学接力'
slug: 'ai-quasi-riemann-relay-2026-10-18'
date: '2026-10-18'
category: 'research'
tags: ['AI', '数学', '准黎曼猜想', '广义黎曼猜想', '形式化', 'Lean', 'AxiomProver', 'OpenAI', '代数数论', '数论']
summary: 'AI 没破 GRH——但 12 天内用 quasi-RH 解决了 19 年悬案，并衍生 5 个代数数论应用。真正的故事是 "AI 给工具 → 人类扩展 → 社区极限优化 → 人类写最终证明" 的新范式。163 自媒体把作者 "Sofos" 拼成 "Somos"、把 "Dedekind zeta quasi-RH" 误读为 "AI 破 GRH"，本文逐条拆解一手论文。'
author: 'Sam Xu'
featured: true
draft: false
source: '一手论文 + 网易转载（作为反面参考）'
source_url: 'https://hexagonmath.org/2610.00200v2'
---

## 一句话总结

> ⭐ **"AI 破 GRH" 不是事实**。OpenAI（10-06）破的是 quasi-RH（排除 Siegel 零点）；Cureton–Thorner（10-12）把它搬到了所有 Dedekind zeta；开源社区把常数从 1/6000 极限压到 1/32；Frei–Sofos–Widmer（10-13）**无条件证明 19 年的 Ellenberg–Venkatesh ℓ-torsion 界**——并显式声明"未使用任何 AI 工具"。

---

## 一、标题党 vs 实际：先把事实说清

> ⭐ **163 自媒体标题"AI 破广义黎曼猜想"是错的**。广义黎曼猜想（GRH）到 2026-10 仍是千禧年问题级开放难题。

| 163 文章说法 | 一手论文实际说法 |
|---|---|
| AI 破 GRH | OpenAI 破的是 **quasi-RH**（排除 Siegel 零点的版本）|
| 作者 Frei, **Somos**, Widmer | 实际是 Frei, **Sofos**（Efthymios Sofos）, Widner — 163 **拼错名字** |
| 论文只解决 Ellenberg-Venkatesh | 还扩展 Lemke Oliver–Smith 平均结果 + Chebotarev 有效版 + 最小素数分裂 + 数域小生成元 |
| 准 RH 只对有限阶 Hecke L-函数 | 实际是**所有数域的 Dedekind zeta**（更广），Hecke L 是推论 |
| Zero-free region 是 1/32 | 精确是 `Re(s) > 31/32`（同 1/32，但精确分数）|

---

## 二、12 天时间线（按日）

<img src="/img/research/ai-quasi-riemann-relay-2026-10-18/timeline.svg" alt="12 天数学接力时间线" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />

### 10-06 — OpenAI 准黎曼猜想突破（工具层）
- 用 AI 暴力证明 ζ 函数 **quasi-RH**（排除 Landau–Siegel 零点后）
- 199 页证明
- **意义：给后续工作一个"基础工具"**

### 10-12 — Cureton + Thorner：把工具搬到大类
- 论文: **"A quasi-Riemann hypothesis for Dedekind zeta functions"**
- 平台: Hexagon (https://hexagonmath.org/2610.00200v2)
- **Theorem 1.1**: 任何数域 $K$ 的 Dedekind zeta $\zeta_K$ 在 $\mathrm{Re}(s) > 31/32$ 无零点
- **Corollary 1.2**: 同样 zero-free region 对**有限阶 Hecke L-函数**也成立
- 关键引用: *"Drawing on recent breakthroughs of OpenAI"* —— 学术上明确归因

### 10-12 → 10-13 — 开源社区极限优化
- 全球数学黑客松：把 zero-free region 的边界从 1/6000 → 1/1000 → 1/500 → 1/100 → **1/32**
- 安全区**放大约 200 倍**
- 仓库: github.com/AxiomMath/DedekindZetaZeroFree
  - **5 ⭐ / 1 🍴 / Lean 4 形式化 / 2026-10-13 最后 push**
  - 证明由 AxiomProver 生成，Cureton + Thorner 指导数学判断
  - **只用 Lean 标准三公理**：`propext`、`Quot.sound`、`Classical.choice` —— 没引入新公理

### 10-13 — Frei + Sofos + Widmer 终极绝杀
- 论文: **"Some applications of the quasi-Riemann hypothesis to class groups and small generators of number fields"**
- 平台: arxiv 2610.18491
- 5 个应用（按论文摘要原话）:

  1. **Chebotarev 密度定理的有效版**（条件于 quasi-RH）
  2. ⭐ **无条件化 Ellenberg–Venkatesh ℓ-torsion 界**（19 年悬案，原本依赖 GRH）
  3. 扩展 Lemke Oliver–Smith 平均结果到**任意 d 次域族**
  4. **最小素数分裂**（least prime splitting）
  5. **数域小生成元**（small generators in number fields）

- 论文末尾官方声明:
  > *"We declare that no artificial intelligence tools were used in this work."*

  ⭐ 这不是噱头——是**对 AI 工具使用边界的学术规范声明**。

---

## 三、这次突破"不一样"在哪

<img src="/img/research/ai-quasi-riemann-relay-2026-10-18/zero-free-region.svg" alt="复平面 zero-free region 示意图" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />

### 1. 形式化证明改变数学信任模型

### 1. 形式化证明改变数学信任模型
- 1/32 的 zero-free region 是 **Lean 4 形式化 check 过的**，不是手算
- 之前：靠审稿、conference talk、citation 链
- 现在：**加 Lean check 作为机器审稿**——边界争议时机器说了算
- AxiomProver 角色清晰：**生成 Lean 证明**，数学家做判断

### 2. AI 在不同环节扮演不同角色

<img src="/img/research/ai-quasi-riemann-relay-2026-10-18/ai-role-chain.svg" alt="AI 角色演化链" style="max-width: 100%; border-radius: 8px; margin: 16px 0;" />
- **OpenAI** (10-06): 暴力推 quasi-RH 工具 —— 像是给一栋新楼打地基
- **AxiomProver** (10-12+): 把工具的极限形式化 —— 像给地基浇混凝土
- **Cureton + Thorner** (10-12): 把工具搬到更大的 L-函数类 —— 像给整栋楼装电梯
- **Frei et al** (10-13): 用新工具解决 19 年悬案 —— 终于有人住进来
- ⭐ **不是 L1 独奏，是 L2/L3 混合范式**

### 3. 开源社区"黑客松"模式侵入数学
- 12 天把常数从 1/6000 推到 1/32 —— 这种**全球分布式极限定理优化**是软件工程玩法，不是传统数学玩法
- 未来更多"压常数"问题可能走这条路

### 4. 人类数学家"显式声明"不用 AI
- Frei et al 主动写明"未使用 AI 工具"
- 在 AI 协作日益普遍时，**明确"哪些环节用了、哪些没用"**会越来越重要
- 想象一下如果 OpenAI 没说 AxiomProver 的角色，数学家社区会怎么反应

---

## 四、对 AI 行业的启示

1. **"AI 破数学难题"目前是分层的**:
   - **L1** — AI 单独暴力推（如 OpenAI 199 页）
   - **L2** — AI 工具 + 人类扩展（如 Cureton–Thorner）
   - **L3** — 人类用 AI 工具 + 写最终证明（如 Frei et al）
   - **L4** — 人类完全不用 AI（传统模式）
   - ⭐ **当前最稳的范式是 L2/L3 混合**，不是 L1 独奏

2. **形式化证明改变数学出版**:
   - Lean 验证过的定理更难被反驳
   - 但**形式化 ≠ 正确性**——`propext` / `Classical.choice` 这种公理本身就有争议
   - 未来"机器可验证 + 数学家可读"双标准会成为常态

3. **"AI 角色清晰化"是好事**:
   - 各论文明确说明 AI 在哪一步做了什么
   - 这种透明度是健康的
   - 学术界 vs 工业界的标准会分化（工业界更激进，学术界更保守）

---

## 五、还差什么（GRH 仍然开放）

> ⭐ **真正的 GRH 到今天仍开放**——这次突破只是把"工具"和"应用"推了一大步。

| 维度 | 这次做到 | GRH 还差的 |
|---|---|---|
| L-函数类 | 所有 Dedekind zeta + 有限阶 Hecke L | 含**无穷阶** Hecke L、更高阶 L 等 |
| Zero-free region | Re(s) > 31/32 | 要推到 Re(s) > 1/2 |
| Siegel 零点 | 仍可能存在（quasi-RH 是 conditional） | 完全排除 |
| 临界线 | 未触及 | RH 的核心：所有非平凡零点在 Re(s) = 1/2 |

GRH 一日不破，黎曼猜想（只是 GRH 的实数域特例）就一日不破——**这次离终点还远**。

---

## 参考资料（一手源）

| 类型 | 链接 |
|---|---|
| 主论文 Cureton–Thorner | https://hexagonmath.org/2610.00200v2 |
| 最终成果 Frei–Sofos–Widmer | https://arxiv.org/abs/2610.18491 |
| Lean 形式化验证 | https://github.com/AxiomMath/DedekindZetaZeroFree |
| 163 转载（反面参考）| https://c.m.163.com/news/a/L9HKND990511ABV6.html |

---

## 一句话再总结

> ⭐ **AI 没破 GRH，但 12 天内用 quasi-RH 工具 + 形式化验证 + 人类数学家接力，把一个 19 年悬案条件性的结果变成了无条件证明**——这本身就是一个新范式，比"AI 破 XX"的标题党更值得关注。
