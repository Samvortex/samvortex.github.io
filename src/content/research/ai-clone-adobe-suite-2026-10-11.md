---
title: 'AI「克隆」的 Adobe 全家桶一夜爆火：UI 可速成，工程深度不可 — 给创意工具市场的启示'
slug: 'ai-clone-adobe-suite-2026-10-11'
date: '2026-10-11'
category: 'notes'
tags: ['Adobe', 'PhotoCraft', 'FilmCraft', 'ArtCraft', 'Photoshop', 'AI 克隆', 'AI coding', 'Claude Opus 5.5', 'Rust', '开源', '创意工具', 'GenOffice', 'Concat', 'Photon Studio', '评论']
summary: 'Brandon Thomas 用 Claude Opus 5.5 + Rust 写出 7 款 Adobe 克隆（PhotoCraft / FilmCraft 等），GitHub 开源、本地运行、免费。**PhotoCraft 智能滤镜 30 测试案例仅 5 个匹配 Photoshop**——这是核心证据：UI 可速成，工程深度不可。同代生态：Photon Studio / Concat / GenOffice。给 Sam 启示：学校 IT 别被首屏 demo 迷惑，看长期可维护性。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（163 转载 · 爱范儿 ifanr.com 原创）'
source_url: 'https://c.m.163.com/news/a/L8UVJFSR0511CSAO.html'
---

## 一句话总结

> AI coding 让一个人 几天做出 7 款「能跑、像 Adobe」的平替——**但 30 个 Photoshop 智能滤镜测试案例只有 5 个匹配**。**AI 改变了「感知完成度」不等于「真完成度」——UI 可速成，工程深度（智能滤镜 / GPU 引擎 / 第三方插件生态 / 十年 corner case）不可**。Adobe Creative Cloud 贵是事实，「免费平替」≠「真替代」。

## 一、事件 / 背景

爱范儿（ifanr.com）10-11 报道：

- **开发者**：Brandon Thomas（自称 15 年开发经验，最早在 Square 做支付软件）
- **栈**：Rust + Claude Opus 5.5
- **产出**：**7 款 Adobe 克隆**，GitHub 全开源，本地运行，**完全免费**
- **总入口**：[getartcraft.com](https://getartcraft.com/)

7 款映射（**一眼能认**）

| 平替名 | 对应 Adobe 产品 | 状态 |
|---|---|---|
| **PhotoCraft** | Photoshop | 早期 Alpha |
| **FilmCraft** | Premiere Pro | 开发中 |
| VideoCraft / SoundCraft / 等 | After Effects / Audition | 开发中 |
| PDF 工具 | Acrobat | 早期 Alpha |
| Design 工具 | Illustrator / InDesign / Lightroom | 开发中 |

**Thomas 的承诺**：「**一个月内达到完整功能对等**」——**截至 10-11 已经跳票多次**。

---

## 二、PhotoCraft：唯一能用的克隆，但深度差太多

### 已能做的事

| 功能 | 状态 |
|---|---|
| 图层 / 蒙版 / 画笔 / 曲线 / 文字工具 | ✅ 基本完整 |
| PSD 文件打开 + 保存 | ✅ 可用 |
| 启动速度 | ✅ 启动快 |
| 基础图像操作 | ✅ 有模有样 |

### 还做不到的事

| 问题 | 详情 |
|---|---|
| **智能对象** | 带智能对象的 PSD 打开后**出问题** |
| **复杂文件操作慢** | 不复杂的专业文件**操作起来很慢**，细小但频繁的错误 |
| **智能滤镜 30-5 测试** | **30 个测试案例只有 5 个匹配 Photoshop** |
| **滤镜工作流** | 用户调参数 / 顺序 / 混合方式 / 蒙版时，Photoshop 会**重新计算画面**；PhotoCraft 只能「保存并读回操作记录」，**算不出相同结果** |

### 智能滤镜的关键技术点（这才是 Adobe 的护城河）

> Photoshop 的智能滤镜需要先把图层转成「**智能对象**」，再把模糊、锐化等效果挂在它下面，而**不直接改写原始像素**。用户调整参数或滤镜顺序时，Photoshop 会**重新计算画面**。

**PhotoCraft 能保存并读回这些操作记录，不等于它能算出相同的结果。**——这是「**保存数据**」与「**计算正确结果**」的本质区别。

---

## 三、FilmCraft：视频剪辑平替的硬骨头

### 已能做的事

- 多轨剪辑
- 调色（基础）
- 视频导出
- 视频编解码 / 时间线编辑 / 渲染 / GPU 模块（底层）
- 界面 + AI 调用命令接口

### 还做不到的事

| 缺口 | 实际影响 |
|---|---|
| **部分常用特效缺失** | 视频编辑师的核心工具缺失 |
| **Lumetri 调色仍需 CPU** | **处理速度会很痛** |
| **不能加载 VST3 / Audio Units 第三方插件** | **后期团队协作痛点无法解决** |

### 关键判断

> **对剪辑师而言，这些插件对于套上效果、处理长素材、在后期团队间互传有明显提升效率的作用。**

Adobe 的护城河不是「能剪辑」——是「**插件生态 + 硬件加速 + 团队协作链路**」。

---

## 四、同代生态：不是 ArtCraft 一家在做

| 项目 | 对位 | 资金 / 模型 | 现状 |
|---|---|---|---|
| **ArtCraft**（Brandon Thomas）| Adobe 全家桶 7 款 | 个人开发者 + Claude Opus 5.5 | 7 款里 5 款开发中，2 款早期 Alpha |
| **Photon Studio** | Photoshop | **~$2000 模型调用费** + GPT-6 Astra 等 | 首日 **170 名活跃用户**；初版错误 + 不稳定，靠用户反馈迭代 |
| **Concat** | 剪映 / CapCut | Claude Code 写 | 开源，主打**本地自动字幕 + TTS**——没必要为导出视频持续付订阅费 |
| **GenOffice** | Microsoft Office 全家 | 未知 | **直接号称自己是 Word/Excel/PPT/PDF 的开源替代 + AI Agent 接入编辑** |

**观察**

1. **不是一个项目在做——是 4-5 个项目同代冒头**
2. **资源消耗差异巨大**：ArtCraft 是个人 / 1 个模型；Photon Studio 单项目花 $2000；GenOffice 团队规模未知
3. **真正威胁 Adobe / Microsoft 的不是「免费」——是「**插件生态 + 团队协作 + 长期可维护**」这三点是否真能搭起来**

---

## 五、核心论点：AI 改变了「感知完成度」

> **AI coding 可以很快写出图层面板、滤镜菜单和文件解析程序，但菜单里有「智能滤镜」，和一份十年前的复杂 PSD 打开后仍然显示正确、保存后还能在 Photoshop 里打开继续改，是两种完成度。**

### 5.1 旧时代 vs AI 时代的「完成度」感知

| 阶段 | 旧时代 | AI 时代 |
|---|---|---|
| **第一次「看起来像成品」的时间** | 几个月 | 几天 |
| **遇到 bug 修复** | 几天 / 几周 | 几分钟（Agent 修 + 测试） |
| **推算** | 「**剩下也是几十轮 + 烧 token**」 | 但**成熟软件最难的部分不在可见 UI** |

### 5.2 成熟软件最难的部分

> **成熟软件最难的部分，常常正是清单上没有写、仓库里没有列举的例外。这些例外来自过去的使用反馈，甚至可能来自未来，需要洞察来发现和解决，而不是更多的 token。**

**具体例子**（PhotoCraft 暴露的）

| 例外类型 | 例子 | AI 克隆能否复现 |
|---|---|---|
| 十年 corner case | 十年前复杂 PSD 文件还要正确显示 + 保存 | ❌ 难——需要历史数据 |
| 跨平台一致 | macOS / Windows / Linux + 多显示器 DPI | ❌ 难——需要广泛测试 |
| 硬件加速 | Adobe 用 GPU 引擎（计划下一代「**文档编译 GPU 程序**」）| ❌ 难——需要工程师团队 |
| 第三方生态 | VST3 / Audio Units / 各种插件 | ❌ 难——需要 API + 商业关系 |

### 5.3 一代人有一代人的「屠龙梦想」

> ArtCraft 之前，就有人在问「为什么还没有人用 AI 写出一个 Photoshop？」后来出现的几个项目，几乎是**轮流拿成熟软件当靶子**。

**置信度：高**——这个论点**逻辑自洽 + 有具体数据支撑**。

---

## 六、可信度红旗

| 红旗 | 详情 | 判断 |
|---|---|---|
| **来源是爱范儿（ifanr.com）** | 国内硬核科技媒体，**比 163 网易号自媒体高一个档**——实名媒体，附招聘模块 | **可信度：中-高** |
| **ArtCraft 7 款产品都存在 GitHub 仓库** | getartcraft.com 是入口；GitHub 仓库具体 repo URL 未给 | **置信度：中**——可核但需自查 |
| **「30 个测试案例只有 5 个匹配」** | 这是爱范儿引述 Reddit / 用户反馈——单源 | **置信度：中** |
| **「$2000 模型调用费」for Photon Studio** | 引述开发者自报 | **置信度：中-低** |
| **Thomas 「15 年开发经验 + Square 工作经历」** | 个人自述，无第三方核 | **置信度：中** |
| **「Adobe 工程师总监博文」** | 文章说「**两个月前**」讲 Photoshop 架构——具体人物 + URL 未给 | **置信度：中-低** |

---

## 七、对 Sam 的 3 点启示

### 7.1 「免费平替」≠「真替代」——你 WCEC IT 决策框架

你 7 校集团级 IT 部署 Adobe Creative Cloud 的成本是**真实痛点**。但 AI 克隆潮给了一个**反直觉的结论**：

| 维度 | 短期（1 年） | 长期（3 年）|
|---|---|---|
| **首屏 demo 速度** | ArtCraft 赢 | ArtCraft 赢 |
| **真实生产力** | Adobe 赢（智能滤镜 / GPU / 插件）| Adobe 仍赢（如果 ArtCraft 没补上工程深度）|
| **可维护性** | 取决于社区是否接盘 | 同上 |
| **数据迁移成本** | 0（免费切换） | 但 PSD 互操作现在 PhotoCraft 已经出问题 |

**对你**：
- **教学场景**（学生做练习作业）→ ArtCraft / Concat **够用**
- **教师作品 / 学校宣传物料** → **别省这点 Adobe 订阅费**——风险太高
- **关键交付**（招生材料 / 校庆视频）→ Adobe 全套

### 7.2 「AI 感知完成度」对 Hermes Agent / The Hive 的启示

你昨天刚跑通的 [Hermes Agent 自托管](/research/hermes-agent-self-hosted-ubuntu-cloud-marketplace/)——**AI coding 让 1 个开发者 + Claude Opus 5.5 就能做出看起来像样的「几千技能智能体平台**」。

但**真正的智能体平台**难点不在「**列表里几千个 skill 名称**」——在：
- 每个 skill 的 **corner case 处理**（用户反例数据）
- **多 skill 协同的异常路径**（A 失败 → B 兜底）
- **状态机里的隐藏 bug**（Hermes 三级恢复路径自动沉淀，但 corner case 数据哪来）

**给你的启示**：
- **The Hive 别被「Hermes 跑通 demo」迷惑**——真实可维护需要 corner case 数据沉淀
- **WCEC IT 别被「AI 一键生成 APP」迷惑**——首屏 demo 跟生产稳定性差 10× token 量

### 7.3 关注 PhotoCraft 的智能滤镜进展——这是真正的胜负手

Adobe 的核心护城河**不是 UI、不是启动速度、不是价格**——是 **智能滤镜重新计算的正确性**。

**PhotoCraft 30-5 测试那个数据点**——**这是可观测、可量化、可追踪的指标**。

**建议**：每月跟踪一次 PhotoCraft 在智能滤镜、跨平台一致性、第三方插件支持三个维度的进展——**这三个突破就是 Adobe 真被冲击的信号**。在那之前，**别给学校 IT 推「Adobe 平替」**。

---

## 八、未验证部分 + 待核清单

| 待核项 | 建议核验源 | 判断 |
|---|---|---|
| ArtCraft 7 款产品的具体 GitHub repo | getartcraft.com 或直接搜 GitHub | **可核**——没给具体 URL |
| 「30 个测试案例只有 5 个匹配」 | 直接跑 PhotoCraft 自测 | **可核**——具体数据 |
| Photon Studio 首日 170 用户 | 项目方自报 | **不可直接核** |
| GenOffice 的真实代码 | GitHub | **可核** |
| Adobe 工程师总监博文（Photoshop 架构）| Adobe 官方 blog | **可核** |
| 「一个月达 100% 功能对等」后续进度 | HackerNews 原帖 + Brandon Thomas 更新 | **可追踪**——下次月度更新 |

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/ai-clone-adobe-suite-2026-10-11/image-01.png" alt="Adobe 完整生态 vs AI 克隆矩阵对比示意图" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：左 = Adobe 全家桶（7 款产品完整矩阵，密集连接）；右 = AI 克隆层（ArtCraft + 同代生态，7 个节点但部分仅虚线 / dashed outline 表示仍在 alpha / 开发中）</p>
</div>

## 来源

- [163 网易号（爱范儿 ifanr.com 原创）：AI「克隆」的 Adobe 全家桶一夜爆火](https://c.m.163.com/news/a/L8UVJFSR0511CSAO.html)
- ArtCraft 官网：[getartcraft.com](https://getartcraft.com/)
- 早前相关：[Nano Banana 2.1 杀向专业设计师](/research/nano-banana-21-professional-design/)（10-08）
- 早前相关：[腾讯 WorkBuddy 想做 AI 时代的 Office](/research/tencent-workbuddy-ai-era-office-file-browser/)（10-08）
- 早前相关：[ChatGPT 文档 / PPT 进 Office 腹地](/research/chatgpt-space-pages-slides-launch/)（10-01）
- 早前相关：[Gamma 5 解决 AI PPT 个人风格问题](/research/gamma-5-personal-style-ppt/)（10-06）
- 早前相关：[Hermes Agent 自托管 Ubuntu 云服务器](/research/hermes-agent-self-hosted-ubuntu-cloud-marketplace/)（10-03）
- 待核：各 GitHub repo 的 commit 历史 + release 节奏
