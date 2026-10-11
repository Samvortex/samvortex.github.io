---
title: '单开发者 GitHub 10 万+ stars 拆解：女娲 + 达尔文 + 5 限制设计 + 4 层 OS 操控 — Agent Skill 方法论全集'
slug: 'alchaincyf-agent-skill-methodology-2026-10-11'
date: '2026-10-11'
category: 'notes'
tags: ['alchaincyf', 'GitHub 10万+', 'Agent Skill', 'Skill Marketplace', '女娲', 'nuwa-skill', '达尔文', 'darwin-skill', 'huashu-design', 'huashu-chrome', 'huashu-mac-use', 'FanBox', 'Agent Skills 协议', 'Skill 蒸馏', 'Skill 迭代', '评论']
summary: 'alchaincyf 64 仓库累计 101,808 stars（gitstar 全球 ~79）。起点 2026-04 开源女娲.skill。**7 个核心 repo**：女娲（人→skill 蒸馏）/ Huashu Design（5 限制 + 禁 AI Slop）/ 达尔文（棘轮 + 9 维打分）/ huashu-chrome + mac-use（OS 操控）/ FanBox（含 Hermes Agent 的 11 个 coding agent）。所有 Skill 走 Agent Skills 协议。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（163 自媒体转载 · 作者 alchaincyf 自述）'
source_url: 'https://c.m.163.com/news/a/L8V9M1HP0556BKW5.html'
---

## 一句话总结

> 单开发者 **alchaincyf 64 仓库 / 101,808 stars / gitstar 全球 ~79 名**——起点是 **2026-04 开源女娲.skill**。核心方法论不是「**造 Agent**」，是「**造 Skill**」——**女娲（人→skill 蒸馏）**、**Huashu Design（5 限制设计）**、**达尔文（skill→更好 skill，棘轮机制）**、**huashu-chrome / huashu-mac-use（OS 操控）**、**FanBox（IDE 编排）**。所有 Skill 走 **Agent Skills 协议**——**Hermes Agent / Claude Code / Codex / Cursor / OpenClaw 都能跑**。

## 一、事件 / 背景

### alchaincyf 的 GitHub 数据

| 指标 | 数据 | 时间 |
|---|---|---|
| 自建仓库 | **64 个** | 2026-10-11 |
| 总 stars | **101,808** | 2026-10-11 |
| gitstar 全球用户榜排名 | **~79 名** | 2026-10-11 |
| 起点 | 2026-04 开源女娲.skill | 大半年前 0 个 >500 stars 仓库 |

### 增长曲线

| 时间 | 事件 | stars |
|---|---|---|
| 2026-04 初 | 开源女娲.skill | — |
| 2026-04 次日 | 女娲 star 破千 | — |
| 2026-04 下旬 | Huashu Design 首日 **1600+** | — |
| 2026-05 下旬 | 总数过 **5 万** | — |
| 2026-10-11 | **101,808** | 79 名 |

### 数据分布

| 类别 | 数量 | stars 占比 |
|---|---|---|
| **Skill 类仓库** | 35 个 | **8.8 万 stars** |
| **女娲 + Huashu Design** | 2 个 | **占总量近 6 成**（3.4 万 + 2.5 万） |
| **11 本橙皮书配套仓库** | 11 个 | **1 万 +** |

### 一个有趣的统计

> **女娲.skill 这个 star 最多的仓库，文本几乎全是 markdown，按文件体量算，脚本代码只占 3% 左右。**

**含义**：**md 背后的自然语言才是这个时代最主要的编程语言**——这是 Sam 你笔记体系应该关注的元趋势。

---

## 二、女娲.skill：人 → skill 蒸馏（核心创新 1）

**Star**：**3.4 万**（alchaincyf 单仓库最高）
**GitHub**：https://github.com/alchaincyf/nuwa-skill

### 核心能力

> **你给它一个名字，它自动走完调研、提炼、验证，产出一个这个人的视角 skill。**

### 5 层人物模型

| 层 | 内容 |
|---|---|
| **表达 DNA** | 怎么说话 |
| **心智模型** | 怎么想 |
| **决策启发式** | 怎么判断 |
| **反模式 / 价值观底线** | 什么不做 |
| **局限诚实边界** | 知道自己的局限在哪 |

### 蒸馏过程（4 步）

| 步骤 | 内容 |
|---|---|
| **1. 六路并行采集** | 著作 / 播客访谈 / 社交媒体 / 批评者视角 / 决策记录 / 人生时间线——**6 个 agent 同时跑**，各自存档 |
| **2. 三重验证提炼** | 一个观点要收录成心智模型必须：跨 2 个以上领域出现过 + 能推断出他对新问题的立场 + 不是所有聪明人都会这么想——**3 条全过才留** |
| **3. 构建 skill** | 3-7 个心智模型 + 5-10 条决策启发式 + 表达 DNA + 价值观 + 诚实边界——写进 **SKILL.md** |
| **4. 质量验证** | 拿 3 个他公开回答过的问题测，方向一致算通过；再拿 1 个他没讨论过的问题测，**应该表现出适度的不确定，而不是斩钉截铁** |

### 每个 skill 标注「做不到什么」

> **蒸馏不了直觉、只是截止到调研时间的快照、公开表达也不等于真实想法。**

**置信度：高**——这是非常成熟的「**反幻觉**」设计——明确告知 skill 边界。

### 适用场景

```
「蒸馏一个保罗·格雷厄姆」
↓
造完之后直接用：
「用芒格的视角帮我分析这个投资决策」
```

### 已蒸馏人物

乔布斯 / 芒格 / 费曼 / 纳瓦尔……

---

## 三、Huashu Design：5 限制设计（核心创新 2）

**Star**：**近 2.5 万**
**GitHub**：https://github.com/alchaincyf/huashu-design

### 核心能力

> **agent 里用 HTML 做设计的 skill，能出四类东西：可点击 App/Web 交互原型 / 演讲幻灯片（HTML deck + 导出 PPTX）/ 时间轴动画（MP4 / GIF + BGM）/ 信息图（PDF / PNG / SVG）**

### 5 限制（设计效果保障）

| # | 限制 | 实现 |
|---|---|---|
| 1 | **需求模糊不让你盲选风格** | 开 3 个 subagent 并行，3 套逻辑各出一版真实视觉（**风格库随机抽** / **参照世界级获奖作品** / **假设预算无上限的设计工作室**），3 版摆出来你看着选——底层是 **60 种纯 CSS 的 HTML 风格** |
| 2 | **涉及具体品牌走 5 步品牌资产协议** | 问你有没有品牌规范 → 搜官方品牌页 → 下载资产 → 从资产里提取色值 → 固化成 brand-spec + CSS 变量——**绝不凭记忆猜品牌色** |
| 3 | **按初级设计师干活** | 开工前**把问题一次性问完** → 先给灰色方块占位初版 → 填内容 / 出变体时再分别给你看 → 交付前用 Playwright 在浏览器里过一遍 |
| 4 | **一眼 AI 视觉直接禁掉** | 紫色渐变 / emoji 图标 / 圆角加左边框强调——**尽量帮你做出不 AI Slop 的设计** |
| 5 | **5 维专家评审** | 做完再让 skill 自我评审，出雷达图 + 修复清单 |

**置信度：高**——5 限制中第 1 / 第 4 是**反 AI Slop 的具体实践**，比单纯的 prompt 设计更有可操作性。

### 适用场景

```
「用 Huashu Design，把这份内容做成一套演示文稿，先给我三个视觉方向。」
```

---

## 四、达尔文.skill：skill 越用越好（核心创新 3）

**Star**：**6 千多**
**GitHub**：https://github.com/alchaincyf/darwin-skill

### 核心能力

> **女娲负责造 skill，达尔文负责迭代和优化 skill。思路来自 Karpathy 的 autoresearch：评估、改进、测试，然后保留或回滚。**

### 5 步机制

| 步骤 | 内容 |
|---|---|
| **1. 9 维打分** | 总分 100；结构类靠**静态分析**；效果类**必须真跑测试提示词**——**实测权重最高** |
| **2. 单维度优化** | 找加权短板最大的维度，**一轮只改这一个**，改完 git commit |
| **3. 双子 agent 重评分 + 棘轮** | 启 2 个独立子 agent 评分（下一轮换新评委，避免锚定）——**新分高保留，否则 git revert 回滚**；**分数只升不降** |
| **4. 单轮涨幅 < 1 自动停** | 避免为凑分往 skill 里堆冗余 |
| **5. 阶段 diff 给用户看** | 每阶段停下来，**diff 和分数变化给你看**，等你确认再继续 |

### 关键设计点

**棘轮机制（ratchet）**——**只接受正向改进，不接受回归**。这是从 Karpathy autoresearch 借鉴的工程化实践。

### 实测效果

> **2.0 吸收了微软研究院两篇论文的方法，验证机制对齐了 SkillOpt 的设计**——microsoft/SkillOpt 的 README 里 6 月初有一条更新写的就是 gbrain / gbrain-evals / darwin-skill 都集成了 SkillOpt。

> **拿它优化 alchaincyf 自己的 huashu-gpt-image，分数从 80.8 涨到了 91.65。**

**置信度：中-高**——微软 SkillOpt 的集成是**可核第三方背书**，80.8 → 91.65 是**单源数据**，可核但需验证。

---

## 五、huashu-chrome + huashu-mac-use：OS 操控类

### 5.1 huashu-chrome（让 agent 操作你已登录的 Chrome）

**Star**：270
**GitHub**：https://github.com/alchaincyf/huashu-chrome

**核心能力**：**任何 agent 直接操控你日常用的那个 Chrome，带着你全部的登录态**——装一个 Chrome 扩展 + 一个 MCP，不用改启动参数 / 不用开调试端口。

**兼容性**：Claude Code / Codex / Cursor / Gemini CLI 等**二十多家支持 MCP 的 agent 都能接**。

**vs 现状**：相比大多数 agent 自带的 browser-use 能力，**核心特点是自主学习进化 + 人和 AI 协同的细节**。

#### 22 个工具分 3 层

| 层 | 工具用途 |
|---|---|
| **网络层** | 要数据——先看页面调了哪些接口，**带着 cookie 直接调**，一次翻完所有页 |
| **操作层** | 要做事——把页面拍成**带编号的元素清单**，一次填完整张表 |
| **截图层** | 兜底——其他方法不灵再用 |

#### 5 大工程原则

1. **每个写操作都要交待页面到底动没动**——防「**工具说成功 / 页面其实没反应**」的静默失败
2. **多步操作一次说完**，每步验过效果才走下一步
3. **提交 / 支付 / 删除 / 发布永远不代做**
4. **越用越快**——出厂带 20 多个网站实测经验，干活时摸清的新门路**存回本机**
5. **验证码 / 扫码 / 付款交还给人**；**所有活在后台标签页**——不抢屏幕，多 agent 同时干活不抢页

#### 实测效果

> **同一个飞书多维表格任务，第一次从零摸索用了 281 次调用 / 54 分钟；记下经验之后第二次不到 10 次调用。**

### 5.2 huashu-mac-use（让 agent 操作 Mac 原生应用）

**Star**：300
**GitHub**：https://github.com/alchaincyf/huashu-mac-use

**核心**：Mac 上大部分原生 app **没有 API，agent 够不着**——huashu-mac-use 让 agent 去操作这些 app。

#### 4 层探测（从上往下试）

| # | 层 | 说明 |
|---|---|---|
| 1 | **App 自己的命令行 / AppleScript / 调试端口** | 结构化接口优先 |
| 2 | **系统的辅助功能语义树** | macOS Accessibility API |
| 3 | **窗口坐标** | 几何定位 |
| 4 | **像素** | 视觉抓取——最后兜底 |

#### 借焦点的 4 道闸

> **借之前要过四道闸**：
> 1. 前台是不是目标 app
> 2. 落点有没有被挡住
> 3. 你是不是正在用键鼠（**2 秒内动过就安静等你停手**）
> 4. 全机同时只允许一个进程借焦点

**借到焦点的那半秒**，屏幕四角会亮起一圈取景框，告诉你此刻是 agent 在动——**用完立刻还焦点、把鼠标放回原位**。

#### 一个案例

> **仓库里有个案例：一个 coding agent 照着 4 张照片，在 Blender 里建出一艘十万吨级的邮轮，建模 / 材质 / 灯光 / 运镜一共 33 分钟，全程没人碰鼠标。**

**置信度：高**——「借焦点 + 4 道闸 + 屏幕取景框」是**用户信任工程**，比大多数 OS 自动化工具**显式得多**。

---

## 六、FanBox：Coding Agent 驾驶舱

**Star**：1 千多
**GitHub**：https://github.com/alchaincyf/fanbox

### 核心能力

> **把找文件 / 开终端跑 agent / 看产出这条链路收进一个窗口：左边文件，右边或下边终端，中间原地预览。本地运行 / 零配置，不做云、不做账号，macOS 免费开源。**

### 4 大功能

| # | 功能 | 实现 |
|---|---|---|
| 1 | **看清 agent 改了什么** | agent 每写一个文件，**那张文件卡片当场亮起来**；开了跟随模式，预览跟着 agent 正在写的文件走，**HTML 边写边渲染**；「本回合」面板列这一回合是哪个终端里的哪个 agent 改了哪些文件 + 每个文件加减多少行——**点开看 diff，可以单个文件还原，也可以整回合回滚** |
| 2 | **在 diff 上选几行写批注** | 一键粘回那个 agent 的终端，**最后那下回车留给你按** |
| 3 | **精确知道每个 agent 的状态** | 启动 Claude Code 和 Codex 时挂上它们的官方 hooks——**干活中 / 等你确认 / 等你输入 / 已完成**都是精确事件；开了好几个终端时，**在等你的会话会在标签栏下面一行行列出来** |
| 4 | **内置 11 个 coding agent 一键启动** | **Claude Code / Codex / Hermes Agent / OpenClaw / Kimi Code / ZCode**——点开任何项目文件夹，能看到 AI 在这里干过什么，一键接上当时的会话 |

### 2.0 新增能力

- **直接通过微信操控电脑里的 Claude Code 和 Codex**
- **Mac 合盖不待机**——agent 还在跑的时候你也能合上电脑走人

**置信度：高**——**「**内置 11 个 coding agent**」列表里有 **Hermes Agent** + **OpenClaw**，直接证明 Skill 协议在主流 agent 里是**事实标准**。

---

## 七、Skill 协议视角：和 Hermes Agent / 你工作的连接

### 7.1 所有这些 Skill 走同一协议

> **Claude Code / Codex / Cursor / OpenClaw / Hermes Agent 这些支持 Agent Skills 协议的 agent 都能跑**

意味着：**你的 [Hermes Agent 自托管方案](/research/hermes-agent-self-hosted-ubuntu-cloud-marketplace/) 不需要重新发明 Skill 协议——这 7 个 repo 直接是「**别人替你验证过**的 Skill 实现**」。

### 7.2 Skill 类型全景（你之前覆盖 vs 新增）

| Skill 类型 | 你之前覆盖 | 这篇新增 |
|---|---|---|
| **人设类**（人 → skill）| — | **女娲**（核心创新：5 层模型 + 4 步蒸馏）|
| **设计类**（HTML 原型 / PPT / 信息图）| Nano Banana | **Huashu Design**（**5 限制更具体**——不让你盲选 + 禁 AI Slop + 5 步品牌资产）|
| **优化类**（skill → 更好 skill）| — | **达尔文**（**棘轮机制 + 9 维打分**——对齐微软 SkillOpt）|
| **OS 操控类**（Chrome / Mac 原生 app）| — | **huashu-chrome**（22 工具 3 层 + 自主学习存本机）+ **huashu-mac-use**（4 层探测 + 借焦点 4 道闸）|
| **IDE 编排类**（文件 / diff / agent 状态）| — | **FanBox**（**11 个 coding agent 一键启动**——直接含 Hermes Agent + OpenClaw）|

### 7.3 你的 Hermes Agent 路线图被扩展

| 之前你规划的能力 | 这篇新提示 |
|---|---|
| Skill Marketplace（用户上传 + 浏览）| **Skill 蒸馏（女娲）和 Skill 迭代（达尔文）是 Marketplace 的「上游供应链」**——没这俩，Marketplace 就是空壳 |
| 多 skill 协同 | **Huashu Design 的「3 subagent 并行 3 套方案让用户选」是直接的多 skill 协同范式** |
| OS 操控 | **huashu-chrome / huashu-mac-use 是现成的、别人验证过的实现**——你直接 fork 进 Hermes |
| IDE 编排 | **FanBox 是「Coding Agent 编排」**——你的 The Hive 可以借鉴这个 UI 思路 |

---

## 八、可信度红旗

| 红旗 | 详情 | 判断 |
|---|---|---|
| **作者 alchaincyf 自述**——163 自媒体转载，文末无具体合作媒体 | **作者本人宣传**——**可信度：中-低**，但**可上 gitstar.com 直接核** | **可核** |
| **101,808 stars / gitstar 全球 79 名** | 单一自述——需第三方核 | **可核** |
| **女娲.skill 的「六路并行 + 三重验证」** | 听上去工程化——**但具体 prompt 和过滤规则开源可查** | **可核** |
| **达尔文「80.8 → 91.65」** | 单源数据 | **可核**——但需自测 |
| **「huashu-chrome 飞书任务 281 → 10 次」** | 具体数字——**可自测复现** | **可核** |
| **FanBox 内置 11 个 coding agent** | 列表可核 | **可信度高** |
| **SkillOpt README 6 月初提到 gbrain / darwin-skill 集成** | 第三方背书 | **可核** |

---

## 九、对 Sam 的 3 点启示

### 9.1 Hermes Agent 的 Skill 协议层不需要「自造」——直接 fork

**你的 [Hermes Agent 自托管方案](/research/hermes-agent-self-hosted-ubuntu-cloud-marketplace/) 已覆盖架构 / Marketplace / 沙箱 / 部署**。**但 Skill 协议实现层**可以**直接参考这 7 个 repo**：

| 你的 Hermes Agent 层 | 对位 alchaincyf repo | 直接借鉴 |
|---|---|---|
| **Skill Marketplace**（用户上传）| **女娲.skill**（人 → skill 自动生成） | 把女娲接进 Hermes，**Marketplace 的「创作者侧」就有了** |
| **Skill 质量保证** | **达尔文.skill**（棘轮 + 9 维打分）| 用达尔文**自动 QA** Marketplace 上每个新 skill |
| **Skill 调用入口**（Claude Code / Codex / OpenClaw 互通）| 已是事实标准 | **不用你重写**——直接支持 Agent Skills 协议 |
| **OS 操控类 skill** | huashu-chrome / huashu-mac-use | **fork 进去就是 Hermes 的 browser_use + mac_use** |

### 9.2 你的 The Hive 可以参考 FanBox 的 UI 思路

FanBox 的 UI 设计——**左边文件卡片 / 右边终端 / 中间预览 / 跟随模式 / 本回合 diff / 多 agent 标签栏 / 借焦点提示**——**是「Coding Agent 编排」的成熟 UI 范式**。

[The Hive](https://web.samvortex.com/hive) 是你做的 agent 讨论论坛——**未来 agent 协同执行时**，UI 应该借鉴：

| FanBox 元素 | The Hive 类比 |
|---|---|
| 文件卡片亮起 | agent 改讨论状态 / 投票 / 立场时卡片亮起 |
| 本回合 diff | 每个 agent 一轮的「立场变化」diff |
| 11 个 agent 一键启动 | 一键拉多 agent 进同一讨论 |
| 「**最后那下回车留给你按**」| 关键决策点永远留给人——**这是 AI 协作工具的核心 UX 原则** |

**置信度：中-高**——「**最后那下回车留给你按**」是**AI 协作工具的核心 UX 原则**——**信任工程的具体实践**。

### 9.3 alchaincyf 的方法论对你「**单点突破 vs 全栈布局**」的启示

alchaincyf 的成长路径很清晰：

| 时间 | 动作 | star |
|---|---|---|
| 2026-04 | **单点突破**（女娲.skill）| 3.4 万 |
| 2026-04 下旬 | **第二单点**（Huashu Design）| 2.5 万 |
| 2026-05 + | **横向扩展**（达尔文 / chrome / mac-use / FanBox）| 各几千到 1 千 |

**启示**：**先做出一个 10x star 的单点 skill，再用 star 红利拉横向**——**不是同时铺 5 个 0-star skill**。

**对你**：
- Hermes Agent：**先把 Skill 协议层做到「**和 alchaincyf 的 7 个 repo 等量级质量**」——**单点突破**
- The Hive：**先做「**多 agent 立场 diff**」**这一个差异点**——**而不是同时铺 5 个 0 用户功能**

---

## 十、未验证部分 + 待核清单

| 待核项 | 建议核验源 | 判断 |
|---|---|---|
| alchaincyf 总 stars（101,808）+ gitstar 全球 79 名 | https://gitstar.com 或 GitHub API 直查 | **可核** |
| 女娲.skill 真实 stars（声称 3.4 万）| https://github.com/alchaincyf/nuwa-skill | **可核** |
| Huashu Design 真实 stars | https://github.com/alchaincyf/huashu-design | **可核** |
| SkillOpt README 是否真提到 gbrain / darwin-skill | https://github.com/microsoft/SkillOpt | **可核** |
| 达尔文 80.8 → 91.65 实测数据 | 自己跑 huashu-gpt-image + darwin-skill 验证 | **可核** |
| huashu-chrome 281 → 10 次调用 | 自己装扩展跑同一飞书多维表格任务 | **可核** |
| FanBox 内置 11 个 coding agent 列表 | 看 FanBox README | **可核** |

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/alchaincyf-agent-skill-methodology-2026-10-11/image-01.png" alt="alchaincyf 7 个 repo 围绕 SKILL.md 中心枢纽的 Skill 方法论生态图" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：alchaincyf 的 7 个核心 repo 围绕 SKILL.md 中心枢纽——女娲 (N, 3.4 万星) 与 Huashu Design (HD, 2.5 万星) 是两个核心节点（更大 + 辉光），达尔文 / Chrome / Mac / FanBox / Art 是横向扩展节点。所有 repo 通过 Agent Skills 协议互通</p>
</div>

## 来源

- [163 自媒体转载：GitHub 星标破 10 万+，凭什么？（alchaincyf 自述）](https://c.m.163.com/news/a/L8V9M1HP0556BKW5.html)
- 早前相关：[Hermes Agent 自托管 Ubuntu 云服务器](/research/hermes-agent-self-hosted-ubuntu-cloud-marketplace/)（10-03）
- 早前相关：[Nano Banana 2.1 杀向专业设计师](/research/nano-banana-21-professional-design/)（10-08）
- 早前相关：[Tibo「重置之神」三大趋势](/research/tibo-new-ai-era-three-trends/)（10-05）
- 早前相关：[OpenAI 推出 Dots，正面对标 Meta Muse](/research/openai-dots-vs-muse/)（09-30）
- 待核：7 个 repo 的真实 stars + SkillOpt 集成情况
