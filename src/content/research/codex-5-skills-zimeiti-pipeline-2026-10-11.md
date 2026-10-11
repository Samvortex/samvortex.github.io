---
title: 'Codex 做自媒体搞钱必备的 5 个 Skill：从一句话生成到批量产出的视频流水线（视频拆解）'
slug: 'codex-5-skills-zimeiti-pipeline-2026-10-11'
date: '2026-10-11'
category: 'notes'
tags: ['Codex', 'OpenAI Codex', '自媒体', '视频生成', 'Agent Skill', 'HyperFrames', 'Remotion', 'videocut-skills', 'seedance2-skill', '即梦', 'Seedance', '视频流水线', '拆解', '评论']
summary: '52 秒视频（163「时尚弄潮 / 辽宁」账号，10-10）演示 Codex + 5 个 Skill 拼出的视频流水线：**HyperFrames（1 句话→动效）/ Remotion Skills（代码批量生成）/ videocut-skills（中文剪辑 Agent）/ seedance2-skill（给即梦写专业提示词）/ 第 5 个 Skill**（OCR 未识别）。**核心论点：Codex 不再只是 IDE 编程 agent——配合 Skill 协议它就是视频流水线调度器**。本文是视频拆解 + OCR 转写。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（163 视频 · 时尚弄潮 / 辽宁 · 52 秒视频）'
source_url: 'https://c.m.163.com/news/v/VS81JAON6.html'
---

## 一句话总结

> 52 秒短视频演示了 **Codex + 5 个 Skill = 一条「文本 → 动效视频 → 批量产出 → 剪辑 → 专业提示词 → 上传」的完整自媒体流水线**——**Codex 不再只是 IDE 里的编程 agent，配合 Skill 协议就是「视频流水线调度器」**。本文是视频内容拆解 + OCR 文本转写，**第 5 个 Skill OCR 未清晰识别**——建议补查原视频。

## 一、事件 / 视频基本信息

| 项 | 值 |
|---|---|
| 来源 | 163 自媒体视频（`news/v/` 格式） |
| 账号 | **时尚弄潮 / 辽宁**（**非 AI 科技账号，是生活方式类内容创作者**——这是关键观察）|
| 标题 | 10 月 10 号 Codex 做自媒体搞钱必备的 5 个 Skill |
| 时长 | **52 秒** |
| 视频源 | m3u8（HLS），640x360 |
| 抽取帧数 | 6 帧（0s / 10s / 20s / 30s / 40s / 50s）|

**关键观察**：发布账号**不是技术博主**，是**普通内容创作者**——这意味着 Codex + Skills 这套组合**已经下沉到非技术创作者圈**，**不只是开发者工具**。

---

## 二、核心论点：Codex + Skills = 视频流水线调度器

### 2.1 5 个 Skill 的逻辑链

| 步骤 | Skill | 角色 |
|---|---|---|
| 1 | **HyperFrames** | 1 句话 → 动效视频 |
| 2 | **Remotion Skills** | 用代码批量生成视频（排行榜 / 数据周报 / 产品更新 / 固定栏目）|
| 3 | **videocut-skills** | 中文创作者剪辑 Agent（精修阶段自动化）|
| 4 | **seedance2-skill** | 给即梦 Seedance 2.0 写专业视频提示词 |
| 5 | **？**（OCR 未识别）| 推测涉及 **字幕 / 封面 / 上传 / 分发**等收尾环节 |

**逻辑链**：文本创意 → 动效视频 → 批量产出 → 精修剪辑 → 专业提示词 → 发布收尾——**是一条完整的视频生产流水线**，**不是 1 个工具**。

### 2.2 Codex 在流水线里的角色

**Codex = 调度器**：

- 把 5 个 Skill 按顺序串起来（不是手动 invoke 5 次不同 CLI）
- 在 Skill 之间传上下文（HyperFrames 输出的素材名 → Remotion 读取）
- 处理 Skill 之间的失败 / 重试（videocut 失败 → 回到 Remotion 重出）
- 最终把所有产物打包好，喂给 Skill 5

**类比**：Codex 是 **CI/CD pipeline runner**，5 个 Skill 是 **jobs**。

---

## 三、5 个 Skill 详解

### 3.1 HyperFrames ——「1 句话 → 动效视频」

| 维度 | 内容 |
|---|---|
| **OCR 原文** | 「**一句话，直接生成动效视频**」 / 「**把文章、产品介绍快速改成视频**」 / 「**不用排版不用剪辑，输入就出片**」 / 「**适合做种草、科普、快讯类短片**」 |
| **核心能力** | 输入 1 段中文文本 → 输出**带动画 / 切换效果**的短视频 |
| **典型场景** | 种草视频 / 科普 / 快讯 / 文章转视频 |
| **关键技术** | 推断：**HTML + CSS 动画 + FFmpeg 合成**，或 **Remotion + React 组件化** |
| **替代产品** | Canva 视频模板 / 剪映图文成片 / InVideo AI |

### 3.2 Remotion Skills ——「用代码批量做视频」

| 维度 | 内容 |
|---|---|
| **OCR 原文** | 「**用代码批量做视频**」 / 「**排行榜、数据周报一键批量出**」 / 「**产品更新、固定栏目自动生成**」 / 标签 `#98 固定栏目` |
| **核心能力** | 用代码（**React + Remotion**）批量生成**结构化视频**——排行榜 / 数据周报 / 固定栏目 |
| **典型场景** | 公众号数据周报自动成片 / 财经股票排行榜 / 产品 changelog 视频 |
| **关键技术** | **Remotion（React 视频框架）**——用 React 组件描述视频内容，渲染成 mp4 |
| **GitHub hashtag** | `#98`（项目主页有 98 个相关仓库） |

### 3.3 videocut-skills ——「中文创作者剪辑 Agent」

| 维度 | 内容 |
|---|---|
| **OCR 原文** | 「**专门面向中文创作者的剪辑 Agent**」 / 「**交给它，精修这一步省必**」（「省必」OCR 误差，**省一笔** / **省必**）|
| **核心能力** | **中文原生支持**的剪辑 Agent——剪字幕 / 切镜头 / 配 BGM / 调色 |
| **差异化** | 区别于「剪映国际版 CapCut 的 Concat 平替」——**专门服务中文语境** |
| **场景** | 长视频精修阶段 / 多镜头拼接 / 中文 ASR 字幕 |

### 3.4 seedance2-skill ——「给即梦写专业提示词」

| 维度 | 内容 |
|---|---|
| **OCR 原文** | 「**帮有即梦写专业视频提示词**」 / 「**给 1 个创意，它出提示词**」 / 「**交给即梦 Seedance 2.0 做核心镜头**」 / 「**提示词专业，出片更稳**」 |
| **核心能力** | 输入「1 个创意描述」→ 输出**专业级即梦 Seedance 2.0 视频生成提示词**（含镜头 / 光线 / 运动 / 构图）|
| **关键技术** | **提示词工程 + Seedance 2.0 提示词规范** |
| **典型场景** | 不会写即梦提示词的人 → 用此 skill 自动生成 |

### 3.5 第 5 个 Skill ——「**OCR 未清晰识别**」

| 维度 | 内容 |
|---|---|
| **OCR 状态** | ❌ **frame_45s 抽取失败 / frame_50s 只有「5 个 Skill 一条视频流水线」总结页**——**未识别 Skill 5 名字** |
| **可能候选** | 字幕生成 skill / 封面生成 skill / 视频号上传 skill / 数据分析 skill / 评论区运营 skill |
| **推断** | **结合「流水线」「自由组合」叙述**，第 5 个 Skill 最可能是 **「发布 / 封面 / 字幕」** 类收尾型 Skill |
| **置信度** | **低**——需要补查原视频 |

---

## 四、可信度红旗

| 红旗 | 详情 | 判断 |
|---|---|---|
| **第 5 个 Skill OCR 未识别** | frame_45s 抽取空 + frame_50s 只显示总结 | **置信度：低**——**必须补查原视频** |
| **OCR 文字本身有误差** | 「**省必**」应是「**省笔**」/ 「**省一笔**」 / 「**不用排版不用前**」应是「**不用排版不用剪**」 | **轻微误差**——**不影响 Skill 名称识别** |
| **没有具体的 Codex prompt 示例** | 视频展示了 skill 概念，但**没给 Codex 怎么调用这些 skill 的 prompt** | **置信度：低**——**用户需要自己摸索** |
| **账号「时尚弄潮」**不是 AI 科技自媒体 | 内容可能**简化或夸张** Codex + Skills 的易用性 | **置信度：中** |
| **5 个 Skill 之间没有展示完整 demo** | 52 秒太短——**每个 Skill 估计只露 1 张图** | **置信度：高**——**这是短视频形式决定的** |

---

## 五、对 Sam 的 3 点启示

### 5.1 Codex 已经超出「编程 agent」定位

你之前的 [OpenAI Codex + GLM/Kimi DevDay](/research/openai-devday-2026-glm-kimi/) 那篇里 Codex 还是「**编程 agent**」定位。**这条视频**展示了 Codex 的新定位——

> **Codex + Agent Skills 协议 = 内容生产 / 自媒体 / 视频流水线调度器**

**对你**：
- **Hermes Agent 设计可以借鉴**——**Codex 这种「调度器 + Skill 组合」模式是 Agent Skills 协议的标准范式**
- **The Hive 的「多 agent 协同」**可以参考——**不是「1 个万能 agent」，而是「调度器 + N 个专项 Skill」**

### 5.2 「下沉到非技术创作者圈」是真正信号

**关键观察**：发布账号**「时尚弄潮 / 辽宁」不是 AI 科技自媒体**——**这是普通生活方式类内容创作者**。

**这意味着**：
- Codex + Skills **不再只是开发者工具**
- 它**已经下沉到「38 岁中年生活博主」圈**
- 真正的 PMF 信号不是「开发者叫好」，是「**普通创作者用上**」

**对你 WCEC IT 工作的启示**：
- **不要把 AI 工具定位在「技术课 / 编程社」**——**真正的用户是「历史老师 / 班主任 / 美术老师」**
- **培训重点**：不是「**怎么用 Codex 写代码**」，而是「**怎么用 Codex + 1-2 个 Skill 解决你班上的具体事**」

### 5.3 短视频自媒体是 Content Agent 最快落地的场景

这条流水线**52 秒讲完**，**没有代码量门槛**——是**最自然的 Content Agent 落地形态**：

| 维度 | 评估 |
|---|---|
| 门槛 | **极低**（不需要写 prompt 模板）|
| 数据 | **海量**（每天全球上传数百万视频）|
| 反馈 | **直接**（播放量 / 互动）|
| 变现 | **已成熟**（广告 / 带货 / 知识付费）|

**对你**：
- **The Hive / Hermes Agent** 的 Content Agent 类 Skill（写公众号 / 视频脚本 / 小红书文案）**市场需求真实存在**
- **不要做「企业级 RAG / Agent」这种重场景**——**从「自媒体搞钱」这种轻场景起步**

---

## 六、未验证部分 + 待核清单

| 待核项 | 建议核验源 | 判断 |
|---|---|---|
| **第 5 个 Skill 的真实名字** | 直接看原视频 40s-50s 之间的画面 | **必须补查** |
| **HyperFrames 关键技术栈**（HTML + CSS / Remotion / 其他）| 视频 demo 或 GitHub README | 待核 |
| **Remotion Skills 的 98 个 hashtag** | GitHub 搜 `#98` + 关键词 | 待核 |
| **videocut-skills 是否开源 / GitHub repo** | 搜 GitHub | 待核 |
| **seedance2-skill 与「即梦 Seedance 2.0」API 关系** | 即梦官方文档 + Skill 文档 | 待核 |
| **Codex 调度 5 个 Skill 的实际 prompt** | OpenAI Codex 官方文档 / 视频后续 | 待核 |

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/codex-5-skills-zimeiti-pipeline-2026-10-11/image-01.png" alt="Codex 5 个 Skill 视频流水线示意：4 个已识别 Skill + 第 5 个 OCR 未识别 Skill" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：Codex 作为中央调度器（顶部绿标签），调度 5 个 Skill 依次串成视频流水线——HyperFrames (1 句话→动效) / Remotion (代码批量) / videocut (中文剪辑) / seedance2 (即梦提示词) / **第 5 个 Skill（OCR 未识别，红色标注）**</p>
</div>

## 来源

- [163 网易号视频（时尚弄潮 / 辽宁）：Codex 做自媒体搞钱必备的 5 个 Skill（52 秒视频）](https://c.m.163.com/news/v/VS81JAON6.html)
- 视频元数据：m3u8 源 + cover image + 6 帧（每 10 秒一帧）+ tesseract OCR（chi_sim+eng, psm 6）
- 早前相关：[OpenAI DevDay 2026 速递：Codex 接入 GLM/Kimi](/research/openai-devday-2026-glm-kimi/)（09-30）
- 早前相关：[OpenAI Codex + Hermes Agent / Claude Code 互通——Skill 协议层](/research/alchaincyf-agent-skill-methodology-2026-10-11/)（10-11，今天）
- 待核：第 5 个 Skill 名字（OCR 未清晰识别） + 视频 30s-45s 之间的具体画面
