---
title: '太卷了！DeepSeek 假期更新，Harness 有了新版本 — Claude Code Mods 兼容层'
slug: 'deepseek-harness-claude-mods-compat'
date: '2026-10-04'
category: 'notes'
tags: ['DeepSeek', 'DeepSeek Harness', 'DSH', 'Claude Code', 'Mods', '插件架构', 'Everything is a Plugin', '崔添翼', 'Cui Tianyi', 'Boris Cherny', 'Anthropic', 'Agent Harness', 'Token Weather', 'Blast Radius', 'Replay Theater', 'Mods 兼容层', 'v0.2.1-alpha.1', '插件兼容', '知乎热榜']
summary: '⭐ **DeepSeek Harness 国庆假期发布 v0.2.1-alpha.1** — ⭐ **首个非 Anthropic 项目加入 Claude Code Mods 兼容层**。⭐ **DSH 负责人崔添翼**：⭐ **"Mods 大致是 DSH 插件能力的一个子集"** —— ⭐ **"Everything is a Plugin" / 模型 / 工具 / Skills / 会话 / 沙箱 / 文件系统 / Agent Loop / 任务编排 / UI 全部可插拔**。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（机器之心 Pro）'
source_url: 'https://c.m.163.com/news/a/L8EDJOVI0511AQHO.html'
---

## 一句话总结

> ⭐ **DeepSeek Harness 国庆假期发布 v0.2.1-alpha.1** —— ⭐ **首个非 Anthropic 项目加入 Claude Code Mods 兼容层**。⭐ **DSH 负责人崔添翼**：⭐ **"Mods 大致是 DSH 插件能力的一个子集"** —— ⭐ **"Everything is a Plugin" / 模型 / 工具 / Skills / 会话 / 沙箱 / 文件系统 / Agent Loop / 任务编排 / UI 全部可插拔**。⭐ **3 个桥接示例**：⭐ **Token Weather / Blast Radius / Replay Theater**（⭐ **复用 Claude Code Mods 接口**）。⭐ **新增"让 Agent 创建插件"入口** + 配套开发者工具包（日志 / 问题定位 / 调试）。⚠️ **尚不完整**：⭐ **Claude Code 内置 diff / agents-md / sec-default / telemetry 标"不可运行"**（⭐ **部分事件 / 接口 / 界面未接通**），⭐ **加载机制也需 DSH 适配**。⭐ **已上知乎热榜**。⭐ **战略意义**：⭐ **AI 工具"扩展接口标准化"竞争正式打响** —— ⭐ **Anthropic 用 Mods / DeepSeek 用"一切皆插件"互相印证可扩展性是 Agent Harness 必选**。

---

## 一、⭐ 事件 ⭐

> "**谁说 DeepSeek 假期不加班？就在昨天，DeepSeek Harness 又更新了**。"

| 维度 | 详情 |
|---|---|
| ⭐ **时间** | ⭐ **国庆假期 2026-10-03** |
| ⭐ **版本** | ⭐ **v0.2.1-alpha.1** |
| ⭐ **署名** | ⭐ **DSH 团队负责人崔添翼** |
| ⭐ **核心功能** | ⭐ **实验性 Claude Code Mods 兼容层** |

> "**这次发布的 v0.2.1-alpha.1，新增了一项很惹眼的功能：实验性 Claude Code Mods 兼容层**。"

> "**官方对它的解释：这次首先想验证，Claude Code Mods API 的能力，大致属于 DeepSeek Harness 插件能力的一个子集**。"

⭐ **翻译**：⭐ **"你刚开放的这些能力，我这套插件架构也能承接"**。

---

## 二、⭐ Claude Code Mods 回顾 ⭐

> "**Claude Code Mods 也可以这样理解：给你的 AI 编程工具加上自己想要的改造**。"

⭐ **3 个举例**：

| Mod | 功能 |
|---|---|
| ⭐ **Token Weather** | ⭐ **把上下文占用做成"天气预报"**（占用低是晴天，越来越满风雨交加）|
| ⭐ **Blast Radius** | ⭐ **高风险命令执行前展示影响**，交用户决定 |
| ⭐ **Replay Theater** | ⭐ **逐步回看文件修改** |

### ⭐ Mods 与已有概念的对比 ⭐

| 概念 | 职责 |
|---|---|
| ⭐ **Skill** | ⭐ **给 AI 一套办事方法** |
| ⭐ **MCP** | ⭐ **给 AI 接上外部工具和数据** |
| ⭐ **Mod** | ⭐ **改造 AI 工具本身的界面和工作行为** |

> "**以后觉得工具不好用，除了等官方更新，还能直接说一句：「你把自己改改。」**"

---

## 三、⭐ DSH 哲学："Everything is a Plugin" ⭐

> "**DSH 从一开始就在重新思考「插件」这件事，其主张就是「Everything is a Plugin，一切皆插件」**。"

⭐ **可作为插件的 9 大组成**：

- ⭐ **模型**
- ⭐ **工具**
- ⭐ **Skills**
- ⭐ **会话**
- ⭐ **沙箱**
- ⭐ **文件系统**
- ⭐ **Agent Loop**
- ⭐ **任务编排**
- ⭐ **UI**

> "**在 DSH 的创造模式里，用户还可以让 Agent 检查当前运行的系统，现场编写插件并保存下来**。"

> "**崔添翼开了个玩笑：团队已经琢磨「Plugin Engineering」这个说法一阵子了，现在是不是该叫「Mod Engineering」了？**"

---

## 四、⭐ v0.2.1-alpha.1 的两个核心功能 ⭐

### ⭐ 功能 1：Claude Code Mods 兼容层（桥接）

> "**这座桥是干什么的？让按照 Claude Code Mods 接口编写的扩展，有机会接到 DSH 的插件系统里运行**。"

⭐ **官方桥接示例（3 个）**：

- ⭐ **Token Weather**
- ⭐ **Blast Radius**
- ⭐ **Replay Theater**

> "**这些例子展示了 Claude Code Mods 如何接入 DSH**。"

### ⭐ 功能 2："让 Agent 创建插件"入口

> "**新版本还增加了一个更容易上手的入口：「让 Agent 创建插件」**。"

⭐ **配套新增开发者工具包**：
- ⭐ **会话日志**
- ⭐ **问题定位**
- ⭐ **调试**

> "**一个尝试承接外部扩展，一个方便用户现场创造功能**。"

---

## 五、⚠️ 限制（尚不完整）⭐

> "**这座桥目前还在施工**。"

⭐ **官方原话**：

> "**当前兼容层主要用于验证 Claude Code Mods API 的能力，大致属于 DSH 插件能力的一个子集，尚不提供完整的实用兼容性**。"

### ⭐ 4 个 Claude Code 内置 mod 标"不可运行" ⭐

| Mod | 状态 |
|---|---|
| ⭐ **diff** | ❌ 不可运行 |
| ⭐ **agents-md** | ❌ 不可运行 |
| ⭐ **sec-default** | ❌ 不可运行 |
| ⭐ **telemetry** | ❌ 不可运行 |

⭐ **原因**：⭐ **部分依赖的事件 / 接口 / 界面能力还没接上**。

⭐ **加载方式**：⭐ **也需要按 DSH 的机制适配**，**暂时不能把 Claude 的插件直接搬过来就用**。

> "**这次最值得看的，是 DSH 用具体示例展示了跨工具复用扩展的可能性**。"

---

## 六、⭐ 战略意义 ⭐

### ⭐ 1. AI 工具"扩展接口标准化"竞争正式打响

⭐ **Anthropic 用 Mods ⭐ / DeepSeek 用 ⭐ "一切皆插件" ⭐ 互相印证可扩展性是 Agent Harness 必选**。

### ⭐ 2. 兼容层是"软竞争"信号

> "**DSH 不是要复刻 Claude Code，而是要让 Claude Code 的生态能为我所用**。"

⭐ **OpenClaw 启示**：⭐ **未来主流 Agent Harness 会有"扩展接口适配层"** —— 类似今天 Linux 发行版的"兼容层"。

### ⭐ 3. 与此前分析的关系

⭐ **9 月底 GPT-6 Sol Codex Desktop 系统提示词泄露时**，我们看到 Claude Code 的 Mods 系统是 **"乐高模式"** ⭐ 50 + 个微模板 / 12 个厂商分支。

⭐ **DSH 这次的回应 ⭐ 印证了可扩展性是 Agent Harness 的核心战场** ⭐ —— ⭐ **不只是工具调用 / Skills / MCP，扩展接口本身成为产品差异化**。

---

## 七、⭐ 与 OpenClaw / Hermes Agent 的直接借鉴 ⭐

| # | 启示 | 落地 |
|---|---|---|
| ⭐ **1** | **"Everything is a Plugin" 应是 Agent Harness 顶层设计原则** | Hermes Agent 已有 ⭐ **Skills Marketplace** ⭐ 设计，⭐ **可借鉴 DSH"模型 / 工具 / Skills / 会话 / 沙箱 / 文件系统 / Agent Loop / 任务编排 / UI 全部可插拔"思路**，⭐ **做"扩展接口矩阵"** |
| ⭐ **2** | **跨 Harness 兼容层是生态护城河** | OpenClaw 已有 Skills 框架，⭐ **未来可考虑 `claude-code-mods` 兼容层 + `deepseek-harness` 兼容层** ⭐ **复用生态** |
| ⭐ **3** | **"让 Agent 创建插件" 是 AI 自我扩展** | OpenClaw `sessions_spawn` 已有此能力，⭐ **未来可暴露 `create_skill` 命令让 Agent 在调试中现场写 skill** |

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/deepseek-harness-claude-mods-compat/image-01.jpg" alt="DeepSeek Harness v0.2.1-alpha.1 Claude Code Mods 兼容层" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：DeepSeek Harness v0.2.1-alpha.1 —— 首个非 Anthropic 项目加入 Claude Code Mods 兼容层（机器之心 Pro · 2026-10-04）</p>
</div>

## 来源

- [网易新闻（机器之心 Pro）· 原文](https://c.m.163.com/news/a/L8EDJOVI0511AQHO.html)
- [GitHub: deepseek-ai/deepseek-harness v0.2.1-alpha.1](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.1-alpha.1)
- [知乎热榜讨论](https://www.zhihu.com/question/2089740005770008568)
- 崔添翼（DSH 负责人）X 评论 + Boris Cherny（Claude Code 负责人）帖