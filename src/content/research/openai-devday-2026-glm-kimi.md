---
title: 'OpenAI DevDay 2026 速递：Codex 接入 GLM/Kimi，Pro 额度腰斩，GPT-6.1 Sol + 24 小时 Agent Dots 首发'
slug: 'openai-devday-2026-glm-kimi'
date: '2026-09-30'
category: 'notes'
tags: ['OpenAI', 'DevDay', 'Dots', 'GPT-6.1 Sol', 'Astra Ultrafast', 'Codex', 'GLM', 'Kimi', 'Baseten', 'Pro 200']
summary: 'OpenAI 在 DevDay 2026 推出 Dots 常驻 AI 助理（GPT-6 Astra + 4000+ 应用）、GPT-6.1 Sol 性价比旗舰、Codex 全面登云并接入智谱 GLM-5.3 Flash 与月之暗面 Kimi K3、Astra Ultrafast 300 tok/s。Pro 200 配额 10 月起腰斩（20x→10x Plus），新设 Pro 500 档位 $500/月。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（AI 前线）'
source_url: 'https://c.m.163.com/news/a/L82NF36T05566ZHB.html'
---

## 一句话总结

> OpenAI DevDay 2026 一口气发布 **Dots**（24h Agent）/ **GPT-6.1 Sol**（性价比旗舰）/ **Codex 全登云 + 接入 GLM/Kimi** / **Astra Ultrafast**（300 tok/s）/ **Pro 500 + Pro 200 腰斩** / **Decisions API** 等数十项更新，目标：**重塑为云端自主智能体驱动的操作系统**。

## 1. Dots：OpenAI 版 Muse（核心产品）

| 维度 | 详情 |
|---|---|
| **驱动** | **GPT-6 Astra** |
| **环境** | **专属云端虚拟机沙盒 + 浏览器** |
| **可用应用** | **>4000** 个外部工具（插件）|
| **通讯入口** | 短信 / Slack / Microsoft Teams / ChatGPT 语音通话 |
| **可用性** | ChatGPT **Pro / Business Premium / Enterprise** |
| **未开放** | **欧盟 / 英国 / 瑞士**（数据隐私合规）|

**核心定位**：**"主动履职"而非"被动响应"** —— 关电脑后，dot 在云端继续推进任务。

### 现场演示（"Alfred"）

- **早上**：已看过 Slack + 邮件，整理出 3 件到办公室后需处理的事，提醒喝完咖啡再工作
- **API 迁移**：旧库存 API 停用 → 追踪调用 → 检查依赖 → 更新集成 → 运行测试 → **GitHub 上开了 3 个 PR**
- **网站更新**：按已审核的设计推进 → **配图时请求确认** → 完成发布
- **自动开票**：测试者忘记向出版机构开发票 → dot 发现 → 准备发票 → 获批准 → 自动发送

### 安全机制

- **物理隔离**：每个 dot 运行在**独立云端容器**
- **凭据保护**：调用保存凭据时**不暴露明文密码给模型**
- **权限分级**：后台监控仅**只读** → 显式授权后才能写
- **强制介入点**：在需要人类决策时**主动停下询问**

### 限制

- ⚠️ **每用户目前仅 1 个 dot**（未来支持多 Agent 协同编排）
- ⚠️ 调用的 Codex / 复杂计算**仍消耗对应配额**
- ⚠️ Codex 现场演示**响应挂起 + 语音延迟**（直播评论："现场唯一作用就是证明这是真机实测"）
- ⚠️ 场外：用户发现输入 **dot.com 跳转的是 Grok Bot**

---

## 2. Space：OpenAI 版办公 Agent 套件

**彻底取代 Library** —— 沉淀团队上下文 + 文档资产 + 智能体执行历史的统一协作中心。

### 四大组件

| 组件 | 能力 |
|---|---|
| **Pages**（动态页面）| 文档内嵌交互式仪表板 + 动态图表 + 代码片段 + **@dot 实时协作**（"把这组数据转为柱状图"），可挂外部数据源 |
| **Slides**（协作 PPT）| **原生可编辑图表 + 矢量形状 + 排版**，导出不损失到 PowerPoint / Google Slides |
| **@ChatGPT**（Slack/Teams 嵌入）| 频道里 **@ChatGPT 调团队共享智能体**；Team Tasks 自动触发跨工具工作流 |
| **Meetings Plugin**（Mac Beta）| **会议音频本地捕捉 + 结构化纪要** + **音频生成后即销毁**（隐私）|

### 企业合作

- 微软合作：**Specialist dots 集成到 Agent 365**（企业现有管理工具统一管控）
- AWS：**Bedrock Managed Agents** 把 OpenAI 智能体托管**整个搬进自有 VPC**（政企客户数据不出境）

---

## 3. 模型层：双轨策略（低价 + 溢价）

### GPT-6.1 Sol — 性价比旗舰（打穿长程任务成本）

| 维度 | 详情 |
|---|---|
| **距离 GPT-6 Sol 发布** | 仅一周 |
| **定位** | 高频智能体编程 + 长流程电脑操作 + 专业工作流 |
| **DeepSWE v1.1（代码）** | **直接追平 Astra** |
| **AutomationBench / Terminal-Bench Science** | **领先 Opus 5.5** |
| **OSWorld 2.0（电脑操作）** | 距 Astra 仅 **2.1 个百分点** |
| **标准资费** | 输入 **$2 / M Token**，输出 **$10 / M**（**Astra 的 1/5**）|
| **上下文缓存** | **$0.10 / M Token**（折扣高达 **95%**）|

> 含义：需要反复加载几十万行代码 + 长文档的 Agent —— **缓存降价决定长程自动化在经济上是否可行**。

### Astra Ultrafast — 300 Token/秒

| 维度 | 详情 |
|---|---|
| **吞吐** | 高达 **300 tok/s** |
| **Codex 响应** | 较标准版最高 **8x** |
| **现场演示** | Ultrafast 分支代码 + 3D 模型已完成渲染，标准模式仍在逐步构建 |
| **订阅限制** | **Pro 500 独享**（普通 Pro 不可用）|

---

## 4. 商业调价争议：Pro 200 腰斩 + Pro 500 登场

### 新档位

| 档位 | 价格 | 配额 |
|---|---|---|
| **Pro 500** | **$500/月** | **25× Plus 配额 + Astra Ultrafast** |
| **Pro 200** | **$200/月** | ⚠️ **10.30 起从 20× → 10× Plus**；GPT-6 Pro 消息数 **200/周 → 100/周** |

### 老用户补偿

- 符合条件的老用户：**年底到期、价值 $2,500 的单次算力额度**

### 社区反弹

> X 等社区充斥着对"**低价获客后加价降配**"的强烈反弹

### 现场仪式

> Altman 邀请"**Tibo**"Thibault Sottiaux（Codex 负责人）按下"重置键"，**为全世界 ChatGPT 用户重置账户额度**

---

## 5. Codex 全面登云 + 接入 GLM/Kimi（关键信号）

### Codex Cloud

- **完全搬上云端**：开发者配置好沙盒环境后，**离开工位合电脑**，后台依然运转
- **手机端追踪进度** + 下发指令

### Codex CLI 大改版

- 引入**语音交互**（现场演示时墨镜模式连续报 "Voice chat couldn't start"）
- `/agents` 视图：分发 + 并发多个子任务
- 深度内建 **Git Worktree**
- ChatGPT 桌面端：补齐 **GitHub PR + GitLab MR 自动代码审查**

### ⭐ Baseten 接入 GLM / Kimi（最耐人寻味的信号）

OpenAI 与推理托管商 **Baseten** 合作（首批 32 家 Marketplace 伙伴之一）。Baseten 团队明确表态：

> 企业用户**可在 Codex + Responses API 中原生调用**：
> - **智谱清言 GLM-5.3 Flash**
> - **月之暗面 Kimi K3**
> - 相关花销**计入对 OpenAI 的年度采购承诺**

**含义**：Codex 不再死守自研模型 —— **底层代码大脑可根据成本需要灵活切换为国产模型**。

### 其他生态渗透

| 更新 | 详情 |
|---|---|
| **Sign in with ChatGPT** | 用账号登录 Pi / Notion / Devin 等 **16 款**第三方工具，**直接扣减原有订阅算力** |
| **MCP Events + Python/Node SDK** | 第三方应用（**Figma / Canva**）基于事件被**动唤醒**智能体 |
| **Bedrock Managed Agents** | 与 AWS 合作，**数据完全不出 VPC** |

---

## 6. Decisions API — OpenAI 版 Jev

- 基于 **Luna 模型**能力收敛
- 从有限枚举集合中做**确定性离散状态裁决**
- 场景：邮件路由 / 智能体失败重试 / 终止 / 报警
- 实测：**78 次连续 GUI 操作命中 76 次** + 单次延迟 **230 ms**
- 林俊旸转发相关评论，被戏称"**Jev 克隆版**"

---

## 7. 关键指标（披露）

| 指标 | 数值 |
|---|---|
| ChatGPT 周活 | **12 亿**（突破） |
| OpenAI 估值 | **投前 1.4 万亿美元** |
| 融资 | **300 亿美元过桥融资**（反超 Anthropic 9650 亿）|
| "AI 研究实习生"目标 | **达成** |
| 大模型无介入独立完成"一天级"任务 | **> 1/3**（截至今年 7 月）|
| 研究人员单日推理用量中位数 | **$600** |
| 前 10% 高频人员日均 | **$7,000+** |
| 每 1 人类工作日对应 | **3.1 后台智能体工作日** |

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/openai-devday-2026-glm-kimi/image-01.jpg" alt="OpenAI DevDay 2026 现场" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：OpenAI DevDay 2026 现场（Fort Mason · 旧金山 · 2026-09-30）</p>
</div>

## 来源

- [网易新闻（AI 前线）· 原文](https://c.m.163.com/news/a/L82NF36T05566ZHB.html)
- OpenAI DevDay 2026 主旨演讲（Fort Mason，2026-09-30）
- Bloomberg 报道（OpenAI $30B 过桥融资 / $1.4T 估值）