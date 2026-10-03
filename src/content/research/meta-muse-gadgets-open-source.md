---
title: 'Meta 开源 Muse Gadgets：让全球开发者自己「造 AI 外设」'
slug: 'meta-muse-gadgets-open-source'
date: '2026-10-03'
category: 'notes'
tags: ['Meta', 'Muse', 'Muse Gadgets', 'ESP32', 'Raspberry Pi 5', '开源', 'AI 外设', 'AI 硬件', 'Alexandr Wang', 'Muse Home Link', '智能家居', 'DIY', 'Agent', '墨水屏', 'Xteink', 'SenseCAP Watcher', 'MagSafe']
summary: '⭐ **Meta 推出 Muse Gadgets 开源项目** —— 让全球开发者用 ⭐ **ESP32** 或 ⭐ **Raspberry Pi 5** 等为 Muse 打造专属"AI 外设"。同时发布 ⭐ **Muse Home Link** 官方设备（USB-C 供电，连接家庭网络 + 智能家居，**首批 5000 台免费**）。DIY 案例：Xteink 墨水阅读器改装 + SenseCAP Watcher 酒窖识别。**"Agent 时代：先做强大模型，再让开发者造各种载体"**。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（机器之心）'
source_url: 'https://c.m.163.com/news/a/L8BJFFIQ0511AQHO.html'
---

## 一句话总结

> ⭐ **Meta 推出 Muse Gadgets 开源项目** —— 让全球开发者用 ⭐ **ESP32** 或 ⭐ **Raspberry Pi 5** 等为 Muse 打造专属"**AI 外设**"。同时发布 ⭐ **Muse Home Link** 官方设备（USB-C 供电，连接家庭网络 + 智能家居，**首批 5000 台免费**）。DIY 案例：Xteink 墨水阅读器改装 + SenseCAP Watcher 酒窖识别。**"Agent 时代：先做强大模型，再让开发者造各种载体"**。

---

## 一、Muse Gadgets 开源项目 ⭐

### 核心 ⭐

> "⭐ **Meta 公布了一项新的动作：正式推出 Muse Gadgets 开源项目，全面下放硬件能力**，⭐ **让全球创客与开发者能够为 Muse 打造专属的外围硬件设备**。"

### 支持平台 ⭐

| 平台 | 用法 |
|---|---|
| ⭐ **ESP32 开发板** | **运行 Muse 固件**（低成本微控制器） |
| ⭐ **Raspberry Pi 5** | **Linux SDK 连接更复杂设备**（边缘计算） |

### 官方 DIY 形态参考 ⭐

| 形态 | 用途 |
|---|---|
| ⭐ **彩色墨水屏（E Ink）** | 桌面低功耗提醒器 / 智能看板 —— 实时展示 Muse 同步的 ⭐ **日程 + 待办** |
| ⭐ **HDMI 显示棒 / 大屏扩展** | 将 Muse Agent 界面或互动 ⭐ **投射至电视 / 外部监视器** |
| ⭐ **触控掌上挂件** | 类似于 Muse Charm 的 ⭐ **随身交互终端** —— 无需佩戴智能眼镜即可随时与 Agent 对话 |

---

## 二、开发流程 ⭐

| 步骤 | 详情 |
|---|---|
| ⭐ **1. 获取凭证** | 访问 ⭐ **gadgets.muse.ai** 注册并领取个人的 ⭐ **API Token** |
| **2. 连接开发工具** | 将 GitHub 官方代码库导入 ⭐ **Claude Code / Cursor / GitHub Copilot CLI** 等 AI 编程代理，借助 ⭐ **Agentic Coding** 快速理解协议 + 生成外设驱动代码 |
| **3. 固件刷写与调试** | 刷入 ⭐ **ESP32 开发板** 或 ⭐ **Linux / 树莓派**运行 SDK 客户端 → 完成硬件终端与 Muse 的 ⭐ **实时双向连接** |

---

## 三、Muse Home Link 官方设备 ⭐

### 设备 ⭐

| 维度 | 详情 |
|---|---|
| **名称** | ⭐ **Muse Home Link** |
| **供电** | ⭐ **USB-C** |
| **连接** | 让 Muse 连接到 ⭐ **家庭网络** |
| **能力** | 与 ⭐ **智能家居设备**通信（电视 / 音响 + 任何 ⭐ **支持 HTTPS 接口的设备**）|

### 商业 ⭐

| 维度 | 详情 |
|---|---|
| ⭐ **首批试产** | **5000 台** |
| **发货** | ⭐ **预计几周内开始** |
| ⭐ **价格** | ⭐ **免费发给符合条件的 Muse 订阅用户**（库存充足期间）|

---

## 四、Alexandr Wang 的开源原因 ⭐

> "**打造各种小工具本身就是一件很有趣的事情**。"

> "⭐ **其次，我们希望释放开发者的创造力，让大家探索各种全新的、甚至疯狂的想法**。我们相信，Muse 正处在一个特殊的时刻，⭐ **它为人们创造新型硬件设备提供了无限可能**，也非常期待看到大家最终会打造出什么样的作品！"

> "从这一点来看，Meta 似乎希望 ⭐ **Muse 不只是一个官方产品，而成为一个可以被扩展的平台**。"

---

## 五、网友 DIY 案例 ⭐

### 1️⃣ Xteink 墨水阅读器改造 ⭐

> "网友 ⭐ **Federico Viticci** (@viticci) 尝试把自己的 ⭐ **Xteink 电子墨水阅读器**改造成了一个 ⭐ **常亮的 Muse 随身显示屏**。Muse（Calliope）可以在上面显示自己的形象，并展示状态更新。"

| 维度 | 详情 |
|---|---|
| **设备** | ⭐ **Xteink 电子墨水阅读器** |
| **角色** | Muse 随身显示屏 |
| **物理** | ⭐ **通过 MagSafe 磁吸连接到手机背面** —— 把手机翻过来即可随时查看 Muse 推送 |
| **用户反馈** | ⭐ **"Muse App 的设置流程非常顺畅**，可以直接让 Muse 加载内容，或自动化控制显示屏信息。我真的很 ⭐ **喜欢这种对黑客和开发者友好的设计理念**。" |

### 2️⃣ SenseCAP Watcher 酒窖识别 ⭐

> "另一位开发者则利用 ⭐ **约 $50 的 SenseCAP Watcher 设备**，打造了一个连接 ⭐ **个人酒窖**的智能硬件。"

| 维度 | 详情 |
|---|---|
| **硬件成本** | ⭐ **约 $50** |
| **功能** | 拍摄酒瓶标签 → Muse ⭐ **识别酒庄和年份** → 通过 ⭐ **Tailscale 连接器**同步到个人酒窖系统 |
| **搭建时间** | ⭐ **不到 1 小时** |

---

## 六、Agent 时代的新模式 ⭐

### 范式转移 ⭐

> "⭐ **过去**：**智能硬件的发展路径通常是** —— **公司设计硬件 → 用户购买设备 → 开发应用**。"

> "⭐ **AI Agent 可能走向另一种模式** —— ⭐ **公司提供模型和 Agent 能力 → 开发者创造各种形态的设备**。"

### 行业反思 ⭐

> "其实从 ⭐ **AI Pin** 等，⭐ **行业对 AI 硬件的探索有很多**，曾尝试通过独立设备替代手机入口，但 ⭐ **不少产品受到功能限制、交互体验等问题影响**。"

> "⭐ **如今，厂商似乎开始换一种思路**：⭐ **直接先打造强大的 AI Agent，再让它进入不同硬件**。"

### Meta 路线 ⭐

> "⭐ **Muse 负责智能能力、开发者负责创造各种载体**。未来，Muse 可能存在于 ⭐ **智能手机 / 智能眼镜 / 各种家庭设备**，⭐ **甚至是开发者创造的新硬件里**……"

---

## 七、与之前 Muse 文章的关系

| 文章 | 角度 |
|---|---|
| `iphone-18-pro-max-att-outage-muse-fda.md`（早） | Muse ⭐ **争议**：主动推送专栏选题（用户认为越权）|
| `mac-full-disk-access-agent-trust.md`（更晚）| Muse ⭐ **安全架构**：隔离环境 + Sentinel 系统 + 按次授权 |
| **本篇** | Muse ⭐ **硬件生态**：Gadgets 开源 + 开发者造各种"AI 外设" |

三篇一起勾勒出 Muse 的 ⭐ **软件能力 + 安全设计 + 硬件生态** 全貌。

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/meta-muse-gadgets-open-source/image-01.jpg" alt="Meta Muse Gadgets 开源" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：Meta Muse Gadgets 开源 —— ESP32 + Raspberry Pi 5 + 墨水屏 / HDMI / 触控挂件（机器之心 · 2026-10-03）</p>
</div>

## 来源

- [网易新闻（机器之心）· 原文](https://c.m.163.com/news/a/L8BJFFIQ0511AQHO.html)
- [Alexandr Wang X 帖](https://x.com/alexandr_wang/status/2106113742266089526)
- [The Verge 报道](https://www.theverge.com/tech/1004330/meta-muse-ai-gadgets-home-link)
- [gadgets.muse.ai 官方页](https://gadgets.muse.ai/)
- [Federico Viticci X 帖](https://x.com/viticci/status/2106139174604816765)