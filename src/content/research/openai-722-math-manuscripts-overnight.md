---
title: 'OpenAI 一夜甩出 722 篇数学论文：黎曼、霍奇、BSD 全上阵，数学家：读不过来'
slug: 'openai-722-math-manuscripts-overnight'
date: '2026-10-07'
category: 'notes'
tags: ['OpenAI', '数学论文', '722 篇', '未发布内部模型', 'GitHub', '准黎曼猜想', '霍奇猜想', 'BSD 猜想', '千禧难题', '希尔伯特第十问题', 'π 的无理性指数', '卡塔兰常数', '唯一游戏猜想', '稀疏自旋玻璃', '量子磁性', '弗拉索夫—麦克斯韦方程', 'Fields 奖', 'Edward Witten', 'Gowers', 'Hairer', '陶哲轩', 'Cedric Villani', 'Bryant', 'OpenAI 28 天', 'Tibo', 'Decisions API', 'Auto-review']
summary: |
  OpenAI 一夜公开 722 篇数学手稿，全出自一个未发布的内部模型，归成 372 组结果，对应约 4000 个研究问题，平均每项算力约等于 ChatGPT Pro 思考 3 小时，论文+ 源码 + 部分 Lean 证明 + 10 份推理摘要全部上 GitHub。三道千禧难题被同时下手：H003 准黎曼猜想（声称 ζ 函数与所有 Dirichlet L 函数在实部大于 7/8 区域无零点，把无区突破度推进一截；另一版给出实部大于 11/12 + 一致排除 Siegel 零点）

---

## 一句话总结

OpenAI 一夜公开 722 篇数学手稿，全部出自一个未发布的内部模型，归成 372 组结果、覆盖约 4000 个研究问题，平均每项算力约等于 ChatGPT Pro 思考 3 小时，论文+源码+部分 Lean 证明+10 份推理摘要全部上 GitHub。三道千禧难题被同时下手（准黎曼猜想、有理数域 Hilbert 第十、BSD 猜想），外加 Hodge 猜想部分覆盖；π 无理性指数从 7.1 直接压到理论最优值 2；Catalan 常数无理数获证明；唯一游戏猜想拿到完整版。数学界反应：3 位菲尔兹得主（T. Gowers、Martin Hairer、Edward Witten）领衔的 9 人独立顾问组声明承认意义但未认可结果；陶哲轩、Cedric Villani 等数学家表达忧虑，AI 速度已超出人类可读速率。同期 Codex 28 天挑战 Day 2 发布 Auto-review / API 三档简化 / Meetings 插件 / Decisions API。

---

## 一、722 篇手稿概览

| 维度 | 数据 |
|---|---|
| 手稿总数 | 722 篇 |
| 结果分组 | 372 组 |
| 覆盖研究问题 | 约 4000 个 |
| 单项算力 | 约 ChatGPT Pro 思考 3 小时 |
| 数学方向 | 17 个（数论/代数几何/理论计算机/统计力学等） |
| 模型 | 同一未发布的内部模型，固定流程 |
| 例外 | 黎曼 ζ 无零点区域、复乘 Marvel 簇 Hodge 猜想（人工编辑） |
| 形式化 | 部分有 Lean 形式化证明（核验进度不一） |

---

## 二、三道千禧难题

### 002 准黎曼猜想（最亮眼）

黎曼猜想要证明：ζ 函数的非平凡零点全在实部=1/2 直线上。

OpenAI 结论：ζ 函数和所有 Dirichlet L 函数，在实部大于 7/8 区域都没有零点。

| 此前最好 | OpenAI 给 |
|---|---|
| 实部大于 0.99 整条竖带无零点——做不到 | 实部大于 7/8 无零点 |
| 已知无零区域贴着实部=1 的边缘 | 把范围向中间推一截 |

距离黎曼猜想要求的 1/2 直线还有距离。

另一份独立证明：实部大于 11/12（范围略窄），多 + 一致排除 Siegel 零点。

**Siegel 零点**：某些 L 函数可能藏在实数 1 附近的"捣乱零点"，是否存在困扰数论学界近百年，许多素数分布结果需绕开。

### 004 有理数域上的 Hilbert 第十问题

拿到一个整数系数的多项式，能否写一套通用算法，判断它有没有有理数解？

OpenAI 结论：这样的算法不存在。

| 版本 | 状态 |
|---|---|
| 整数版本 | 1970 年由苏联数学家 Matiyasevich 解决 |
| 有理数版本 | 悬了半个世纪，OpenAI 声称无算法 |

### 009 BSD 猜想（Birch & Swinnerton-Dyer）

椭圆曲线有理点情况，关联一个相关函数在特定位置的表现。

OpenAI：针对满足 Selmer 余秩为 0 或 1 的椭圆曲线，得到完整公式。结合仓库另一组结果按密度统计，可覆盖每条有理数域上椭圆曲线的绝大多数二次扭曲。

### 011 Hodge 猜想（部分覆盖）

复杂几何空间里看得见的"形状信息"，能否由代数方程定义的几何对象解释。

OpenAI 处理的范围：CM Marvel 簇 + K3 曲面乘积。CM 论文声称覆盖该类对象所有维度和余维。Hodge 范围比这广得多——这批论文目前只覆盖上述范围。

---

## 三、常数与理论计算机难题

| 题目 | 此前 | OpenAI 结论 |
|---|---|---|
| π 的无理性指数 | 7.1（最佳）| **恰好 2**（理论最优）|
| Catalan 常数 | 是否有理——未公开证明 | 证明为无理数 |
| 唯一游戏猜想（2002 Khot）| 2018 弱化版证明 | **完整版** + 最大割/顶点覆盖近似难度结论 |

---

## 四、其他 17 个方向

- 稀疏自旋玻璃的 Mezard-Parisi 公式
- 量子 Heisenberg 铁磁体自发磁化
- 自由群因子同构
- 三维单种粒子相对论性 Vlasov-Maxwell 整体光滑解

---

## 五、数学界反应：高速读不过

3 位菲尔兹得主领衔的 9 人独立数学与 AI 顾问组：

- **Timothy Gowers**
- **Martin Hairer**
- **Edward Witten**（理论物理学家）

**顾问组声明**：

> "承认这是数学界的一件大事。但同时表示——顾问组此前给 OpenAI 提过建议，不代表他们已经认可这些结果，也不代表他们认可 OpenAI 产出成果的过程。"

> "证明是否成立、对后续研究有多大用处，要交给各领域的数学家慢慢消化。"

### 顶级数学家声音

**Francesco Maggi（UT Austin）**：

> "9 月那篇流体力学证明，专家们至今还在研究它究竟怎么起作用。一下再来数百篇，谁有精力读？读完以后，又能从中发现什么新方法、新问题？"

> "结果产出速度确实远远超过了人类能理解的速度，数学家只能在后面追着 AI 跑。"

**陶哲轩**（9 月加州理工）：

> "AI 发展的速度『太疯狂了』，没有理由这么快。AI 公司简直就跟疯了一样。"

**Cedric Villani（菲尔兹得主）**：

> "我大受震撼……简直跟世界末日一样。这是数学界有史以来从未见过的浩劫。"

### 发布前的提前对接

- 8 月：OpenAI 召集约 40 名数学家讨论成果如何发布
- 西北大学 Bryna Kra 等人希望看到写得清楚、能让同行阅读和引用的论文
- 部分与会者以为 OpenAI 不会一次放出所有成果——OpenAI 发言人表示不清楚有过这样的承诺
- 9 月的流体力学争议（Anthropic 与 OpenAI Navier-Stokes 同时发布）让气氛更紧张
- Tristan Buckmaster（NYU）与 Levent Alpkoge（Anthropic 研究员）公开三篇流体方程爆破证明（带 Lean），与 OpenAI 发布同时
- Buckmaster 起初想再花时间把证明写得好读，因外部压力提前发布
- 双方围绕研究进度和成果归属起争执——OpenAI 否认 Buckmaster 使用 Codex 时的提示词影响自家模型

---

## 六、AI 编程能力边界

> "OpenAI 已经交卷了，但数学界的阅卷才刚开始。"

OpenAI 承诺**出资办研讨会**帮助数学界研究这些成果。顾问组回应：材料公开了，接下来该由数学家检查、讲解，再决定哪些结果真正能进入数学研究。

---

## 七、One More Thing：28 天挑战 Day 2

Tibo 赛博义父 28 天承诺 Day 2 共发布 4 项更新：

| # | 名称 | 详情 |
|---|---|---|
| 1 | **Auto-review** | 长任务时另一 AI 代理检查操作、拦截高风险动作；ChatGPT 账号用户免费 |
| 2 | **API 档位简化** | 五档 → 三档 |
| 3 | **Meetings 插件** | 会议整理为纪要和待办 |
| 4 | **Decisions API** | 开发者调用，开放公测 |

参考链接：
- https://openai.com/index/sharing-ai-progress-in-mathematics/
- https://github.com/openai/math
- https://agmai.org/
- https://x.com/thsottiaux/status/2107575657014468879

---

## 八、对 Sam 的 3 点启示

1. **AI 出活速度 > 人类理解速度** —— Sam 的 Hermes Agent 内部 skill 输出也要考虑"机器输出 vs 人类审阅"的速率差。加 ratelimit + 人工 checkpoint 比代码审查更关键
2. **顾问组 vs 实际背书** —— OpenAI 的 9 人顾问组给的不是学术背书，是程序建议。Sam 引入专家时也该明示：他们提的是**专业建议**不是**质量认证**
3. **Co-publish vs Race-publish** —— 9 月 Anthropic 与 OpenAI 同时发流体力学证明造成归属争议。Sam 协调类似事件时，主动排他期 + 同步声明可能更稳

---

## 来源

- [量子位 QbitAI 原文](https://www.163.com/dy/article/L8KI53AQ0511DSSR.html)
- [OpenAI 官方分享页](https://openai.com/index/sharing-ai-progress-in-mathematics/)
- [GitHub 仓库](https://github.com/openai/math)
- [AGMai 顾问组声明](https://agmai.org/)
- [Tibo X 帖](https://x.com/thsottiaux/status/2107575657014468879)

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/openai-722-math-manuscripts-overnight/image-01.jpg" alt="OpenAI 722 数学手稿一夜公开" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：OpenAI 一夜公开 722 篇数学手稿 —— 准黎曼、霍奇、BSD 千禧难题同时下手（量子位 · 2026-10-07）</p>
</div>