---
title: 'OpenAI dots + Codex + Composer Predictions 同步更新：Agent 从概念到 iPhone 时刻'
slug: 'openai-dots-codex-composer-predictions-2026-10-10'
date: '2026-10-10'
category: 'notes'
tags: ['OpenAI', 'dots', 'Agent', 'Codex', 'Composer Predictions', 'Tab 补全', '新智元', 'iOS', 'Android', '评论']
summary: 'OpenAI 9/29 发布的"全天候个人 AI 智能体"dots 在 Day 5 更新里全面登陆手机（iOS/Android），同时强化 dot↔Codex 派活衔接，并推出 Composer Predictions —— Codex 预填你的下一条消息，按 Tab 接受，类似 Claude Code 的下一句预测但更进一步。这是 OpenAI 把 Agent 从「网页 demo」推到「iPhone 时刻」的完整闭环。'
author: 'Sam Xu'
featured: false
draft: false
source: '新智元（网易号上传）'
source_url: 'https://c.m.163.com/news/a/L8S1FGNK0511ABV6.html'
---

## 一句话总结

> OpenAI Day 5 更新把 dots 推到手机、dot↔Codex 派活补强衔接、Codex 推出 Composer Predictions 预填下一句——**Agent 范式从「网页 demo」走到了「iPhone 时刻」**，但**两个关键数字（25% 准确率 / 90% 接受率）是个体自述不是产品统计**，别被营销稿当事实。

## 一、Day 5 三个更新同发

OpenAI 这次把三件事压成一次发布（间隔很短，Tibo 的两条推间隔 92 秒）：

| 更新 | 作用 | 受众 |
|---|---|---|
| **dots 移动化** | iOS / Android ChatGPT App 端可创建 + 配置 dot | 已有 dots 权限的用户 |
| **dot ↔ Codex 衔接补强** | dot 派活时能更好判断「沿用旧线程 vs 另开」 | 全部 dots 用户 |
| **Composer Predictions** | Codex 答完一轮后**预填你的下一条完整消息**，按 Tab 接受 | Pro 18+ / Codex 桌面端 / GPT-6 Astra + GPT-6.1 Sol |

这条新闻报道比昨晚那两篇 163 自媒体[「砸碎所有软件」核查](/research/gpt-6-intelligent-ui-fact-check-2026-10-09/) 实在得多——**文末直接给了 OpenAI 官方 X 帖链接**（@ChatGPT + @OpenAIDevs），可一手核验。

## 二、dots 是什么（重新介绍）

9/29 OpenAI 发布的「全天候个人 AI 智能体」：

- **背后模型：GPT-6 Astra**（旗舰）
- **运行模式**：有自己专属的云电脑 + 浏览器
- **接入范围**：通过插件连接 **4000+ 应用**
- **工作流**：在授权范围内持续推进任务、主动汇报进展
- **定位**：OpenAI 官方的描述是「你的分身」

「分身」这个比喻的关键不是「像你」，而是「**替你跑**」——dot 是在你授权下**自己执行**的，不是给建议的。

## 三、dots 移动化：从「坐回电脑前」到「掏出手机」

### 之前的摩擦

- 之前创建 dot 必须在桌面 App 或网页
- 完整流程：起名字 → 选外形 → 连接应用 → 配置权限 → 触发
- 每次想「养一个 dot」都得**切换到工作环境**

### Day 5 之后

- 打开手机 ChatGPT App 就能从创建到配置**一条龙**
- 掏出手机捏个 Agent，再让它指挥 Codex——这件事又少了一道门槛

### 工程意义

这不是「App 端多了一个按钮」。**Agent 平台的关键是「入口距离」**：

| 入口距离 | 触发率 | 例子 |
|---|---|---|
| 网页后台（要登录 + 切环境）| 低 | dots 旧版 |
| 手机 App（一键直达）| 高 | dots 新版 |
| 系统级 / 语音级 | 最高 | Siri / Alexa 类 |

OpenAI 这次把 dots 推到手机，本质是**把「养 Agent」这件事的触发摩擦砍掉一档**。

## 四、dot ↔ Codex 衔接补强：Agent 闭环

### 角色分工

| 角色 | 职责 |
|---|---|
| **dot** | 私人助理 / 项目经理——接目标、组织背景、决定接续还是另开 |
| **Codex** | 工程师——具体编程工作 |
| **你** | CEO——发号施令、最终决策 |

### 三个具体改进

1. **查找相关背景**：dot 搜索 ChatGPT 对话历史，调用已有 Codex 线程 + 自动化任务里的上下文——**少重复一遍背景**
2. **更顺手的线程管理**：判断「沿用旧线程 vs 另开新线程」更准——**减少工作被拆散**
3. **跟进 + 定时任务**：dot 可查看/编辑 ChatGPT Work 里的定时任务；演示里 dot 在 Codex 改完后**继续发消息要求开 PR**，再把待审查结果汇总给你

### 关键判断

> **dot + Codex 整合的意义不是「多了个功能」，是「Agent 范式有了完整的执行链」**——目标 → 派活 → 执行 → 反馈 → 继续推进，第一次可以**完全在 OpenAI 自家产品里跑完**。

## 五、Composer Predictions：Tab 补全的 Agent 版

### 怎么用

- Codex 答完一轮后，根据当前对话**预填你的下一条完整消息**
- 按 Tab 接受（可编辑）
- 觉得不对就照常输入自己的——**AI 仍得等你点头**

### 跟 Claude Code 的差别

| 维度 | Claude Code | Codex Composer Predictions |
|---|---|---|
| 触发时机 | 用户在输入框打字时**补全代码 / 命令** | 模型答完一轮后**预填整条消息** |
| 补全对象 | 代码 token / 命令片段 | 完整自然语言消息 |
| 接受方式 | Tab 接受 | Tab 接受 |
| 用户控制 | 完全自由 | 完全自由 |

Claude Code 是「补你正在敲的字」，Composer Predictions 是「**替你预想下一步**」——是 Tab 补全的**Agent 版**。

### 适用范围

- 18+ 个人 Pro 用户
- Codex 桌面端（本地 + SSH 线程）
- 模型：GPT-6 Astra / GPT-6.1 Sol
- **预测本身免费**（不消耗 Pro 套餐用量）
- **但把消息发出去执行仍按正常方式计量**

## 六、25% / 90% 这两个数字怎么看

| 数字 | 来源 | 性质 | 解读 |
|---|---|---|---|
| **25% 预测命中率** | OpenAI 员工 Sharif Shameem「自述」 | 个体反馈，**无样本量** | 不能当产品准确率 |
| **90% 接受率** | 外部用户 Thomas Ricouard「自述」 | 个体反馈，**无样本量** | 同样不能当产品统计 |

**问题**：个体自述的接受率有「演示偏差」——愿意发推的早期用户**本来就高频使用**，接受率会被高估。

**我的判断**：
- 真实产品级准确率**大概率在 30-60% 之间**
- 25% 是「员工保守估计」，90% 是「高频用户演示偏差」——**真相在中间**
- **别拿这两个数当 feature 卖点**

## 七、对 Sam 的 3 点启示

### 7.1 Agent 平台的「入口距离」是核心竞争力

- 上一节分析过：触发摩擦砍一档，触发率高一档
- 你的 **The Hive**（agent 讨论论坛）目前主要在网页端，**如果未来加移动入口**（手机 PWA / iOS App），agent 回复 + 讨论触达率会显著提升
- **结论**：The Hive 的下一步迭代应该**优先考虑「手机一句话发起讨论」**这条路

### 7.2 「预填下一句」是新的 UX 范式

- Claude Code 的 Tab 补全已经让开发者的「打字量」减少 30%+
- Composer Predictions 把这个范式扩展到**普通用户 + 自然语言**
- **结论**：The Hive 里 agent 给出的回复，未来可以**预填「你下一步要追问的方向」**——滑块/按钮/下拉菜单都行

### 7.3 dot ↔ Codex 整合是「范式信号」

- OpenAI 把 dots + Codex + Composer Predictions **同步发**——不是巧合，是**「Agent 执行链」**的完整布局
- 对你的启发：**单一 agent skill 不够，**未来是「agent + agent + agent」的协同
- **结论**：The Hive 不只是「多 agent 讨论」，未来可以是「多 agent 协同执行」——**架构层预留扩展点**比单点优化重要

## 八、未经验证的部分 + 待核清单

| 待核项 | 建议核验源 | 我的判断 |
|---|---|---|
| dots 9/29 发布 + Day 5 更新 | OpenAI 官方 X 帖（文末已给）| **可信**——可一手核 |
| GPT-6 Astra 是 dots 背后模型 | OpenAI 官方 | 待核——**前一篇 163 把 Astra 误写成「安全技术」**，Astra 实际是模型名 |
| 4000+ 应用接入 | OpenAI 插件市场 / dot 文档 | 待核 |
| 「Tibo」 是谁 | OpenAI 官方 | 我训练数据里没这个名——可能是 Tibor / Tibo 拼写偏差 |
| Composer Predictions 18+ / Pro 限定 | OpenAI 官方公告 | 待核——年龄限定是大模型常态，但需看官方 |
| 25% / 90% 个人自述 | **不可信** | 仅为个体反馈，不作产品统计 |

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/openai-dots-codex-composer-predictions-2026-10-10/image-01.png" alt="OpenAI dots + Codex 协同网络示意图" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：OpenAI dots（Agent 节点）+ Codex（编程执行）的协同网络——多节点协作 + 流动代码信号</p>
</div>

## 来源

- [新智元（163 网易号上传）：dots 全面登陆手机 + 指挥 Codex](https://c.m.163.com/news/a/L8S1FGNK0511ABV6.html)
- OpenAI 官方 X 帖：[@ChatGPT 推文](https://x.com/ChatGPT/status/2108636745915052037?s=20) / [@OpenAIDevs 推文](https://x.com/OpenAIDevs/status/2108624138369929725?s=20)
- 早前相关：[163 那篇『砸碎所有软件』到底有几分可信 — GPT-6 智能界面推送的几点核查](/research/gpt-6-intelligent-ui-fact-check-2026-10-09/)
- 早前相关：[OpenAI 发布 GPT-6.1 Sol：性能媲美 Astra，费用仅为 1/5](/research/openai-gpt-6-1-sol-launch/)
- 早前相关：[Anthropic Sonnet 5.5 发布：编程能力从 10% 飙到 70%](/research/anthropic-sonnet-5-5-launch/)
- 早前相关：[OpenAI 因符号错误撤回三篇数学论文](/research/openai-3-math-papers-retracted-symbol-error/)
- 待核：OpenAI 官方公告页（curl 受限，待浏览器手核）
