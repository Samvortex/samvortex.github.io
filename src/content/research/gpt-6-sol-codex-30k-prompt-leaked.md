---
title: 'GPT-6 Sol 被破解！30 万字系统提示词已泄露 — 顶级代码模型指令全曝光'
slug: 'gpt-6-sol-codex-30k-prompt-leaked'
date: '2026-10-04'
category: 'notes'
tags: ['GPT-6 Sol', 'OpenAI Codex', '提示词泄露', '系统提示词', 'prompt leak', 'CL4R1T4S', 'elder_plinius', 'AI slop', 'ripgrep', 'SKILL.md', 'browser_use', 'token budget', 'auto-compact', '代码审查', 'Agent 系统工程', '安全策略']
summary: '⭐ **GPT-6 Sol Codex**（⭐ **OpenAI 现役性价比产品线 GPT-5.6 Sol 王牌代码模型**）⭐ **30 万字符 / 1902 行系统提示词已泄露**。⭐ **6 大板块**：(1) ⭐ AI slop 词黑名单（Bottom Line / delve / foster / leverage / 重要的是 / 值得注意的是 全禁）+ (2) ⭐ 极端自主性（不要停下来问 / 不要半吊子）'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（新智元）'
source_url: 'https://c.m.163.com/news/a/L8CQIACG0511ABV6.html'
---

## 一句话总结

> ⭐ **GPT-6 Sol Codex**（⭐ **OpenAI 现役性价比产品线 GPT-5.6 Sol 王牌代码模型**）⭐ **30 万字符 / 1902 行系统提示词已泄露**。⭐ **6 大板块**：(1) ⭐ AI slop 词黑名单（Bottom Line / delve / foster / leverage / 重要的是 / 值得注意的是 全禁）+ (2) ⭐ 极端自主性（不要停下来问 / 不要半吊子）— (3) ⭐ 工具链（⭐ ripgrep / ⭐ Promise.allSettled 并行 / ⭐ SKILL.md 动态技能树 / ⭐ browser_use 浏览器接管）— (4) ⭐ 记忆与休眠（⭐ token_budget.guidance_message / ⭐ 上下文交接 / ⭐ 后台 heartbeat）— (5) ⭐ 代码审查铁律（不超 3 行 / suggestion 块 / 不拍马屁）— (6) ⭐ 4 级确认模式（Hand-off / Action-time / Pre-approval / Not-required）。⭐ **本质：提示词工程已死，系统工程永生**。

> ⭐ **已落库 Obsidian**：`Research/CL4R1T4S/GPT-6-Codex-Desktop-Sol-Prompts-raw.md`（162 KB） + `Research/CL4R1T4S/GPT-6-Codex-Desktop-Analysis.md`（6.5 KB 借鉴评估）。

---

## 一、事件概况 ⭐

> "**GPT-6 Sol Codex 惨遭「开盒」**" —— 30 万字符完整系统提示词 + 工具定义被 `@elder_plinius` 提取并公开。

| 维度 | 详情 |
|---|---|
| **链接** | https://github.com/elder-plinius/CL4R1T4S/blob/main/OPENAI/Codex_Desktop/GPT-6-Sol_Prompts.txt |
| **行数** | ⭐ **1902 行** |
| **字符数** | ⭐ **29.4 万**（约 30 万）|
| **板块数** | ⭐ **54 个 ===== 分段** |
| **模型定位** | ⭐ **OpenAI 现役性价比产品线 GPT-5.6 Sol 王牌代码模型版本** |
| **作者** | `elder_plinius`（GitHub 同 repo）|

> "**这近 30 万字，本质上就是 OpenAI 内部最顶尖的一批工程师，花费无数个日夜、砸了上千万美元算力试错，才调试出来的「大模型驯化终极指南」**。"

---

## 二、6 大板块 ⭐

### 板块 1：⭐ AI slop 词黑名单

> "**OpenAI 官方自己也受不了这些废话了**！"

⭐ **明确禁词清单**：
- `Bottom Line`（底线是）
- `Significance`（重要性）
- `Perspective`（视角）
- `delve`（深入）
- `foster`（培养）
- `leverage`（利用）
- `it's worth noting`（值得注意的是）
- `importantly`（重要的是）

⭐ **风格铁律**：
- ⭐ **不准强行热情**："不要阿谀奉承或强颜欢笑"
- ⭐ **不准用废话凑字数**："不要列举'我不会做什么'、'哪些保持不变'"
- ⭐ **极简沟通**："优先熟悉的词汇和具体的描述，绝不假设用户能自己脑补缺失的步骤"

### 板块 2：⭐ 极端自主性

> "**用户非常讨厌你停下来询问确认或请求许可**。一旦会话中的证据支持下一步操作，你应该继续工作，而不是结束回合去跟用户澄清。"

⭐ **核心原则**：
- ⭐ **不要为了节省 token 满足于半吊子**
- ⭐ **遇到 Bug 自己修**：自主创建隔离工作区 / 解决 Git 冲突 / 创建草稿 PR
- ⭐ **最后一步才汇报**：只有"部署 / 合并代码"这种不可逆动作才停下请签字

⭐ **状态更新机制**：
> "**如果用户请求需要调用工具，每 60 秒内必须在评论频道给用户发一个简短的状态更新**。"

### 板块 3：⭐ 神级工具链

| # | 工具 | 详情 |
|---|---|---|
| ⭐ **1** | **ripgrep（rg）** | "**你首先要使用 rg 或 rg --files；它们比 grep 等替代方案快得多**" |
| **2** | ⭐ **Promise.allSettled** | "**调用 functions.exec 时，如果任务是独立的，必须使用 await Promise.allSettled([...]) 进行并行处理**" |
| ⭐ **3** | ⭐ **SKILL.md 动态技能树** | "**模型可以去指定目录读取 SKILL.md（甚至通过短路径别名如 r0 去找）**。相当于给模型外挂了无数个技能书，随时热更新" |
| ⭐ **4** | ⭐ **browser_use** | "**可以自己打开网页、点击按钮、填写表单，甚至截屏**" |

### 板块 4：⭐ "盗梦空间"式工作流

#### 1. 记忆压缩与交接 ⭐

> "**当 Token 预算耗尽时，系统不会直接崩溃**。" —— 通过 `token_budget.guidance_message` 触发交接：
> - ⭐ 用 `notes` 工具保存**目标 / 决策 / 进度 / 学习内容 / 下一步** + 窗口 ID + 项目 ID
> - ⭐ 调用 `functions.new_context` 开启全新上下文环境

> "**就像人类换班一样，这个 AI 在下班前会写一份详尽的交接文档**"。

#### 2. 休眠与心跳唤醒 ⭐

> "**这个模型是可以常驻后台的**" —— `persistent_instructions` 要求主动跟踪任务：

⭐ **后台监控**：
- "如果用户问某个评估（eval）运行得怎么样，而它还在运行，报告当前状态，然后**继续监控该评估直到它达到终止状态**"
- 系统会**定期发隐藏的 XML 标签唤醒模型**
- ⭐ 状态选择：**DONT_NOTIFY（不要打扰）** vs **NOTIFY（CI/CD 跑崩，立刻弹窗）**

### 板块 5：⭐ 最强代码审查员

⭐ **审查铁律**：
- ⭐ **不抓无关紧要的代码风格**（除非影响可读性 / 违反标准）
- ⭐ **每个建议必须讲清楚"为什么这是一个问题"**
- ⭐ **绝不提供超过 3 行的代码片段**
- ⭐ **具体替换建议必须用 Markdown suggestion 块**，**完美保留缩进**（空格 / Tab 分毫不差）
- ⭐ **语气客观，不准拍马屁**（禁止"干得好" / "谢谢你的提交"）

> "这段逻辑如果直接抄进你的公司内部代码审查机器人里，**绝对能秒杀市面上 90% 的水军 AI**。"

### 板块 6：⭐ 4 级确认模式（安全协议）

| Tier | 触发场景 | Codex 行为 |
|---|---|---|
| ⭐ **Hand-off Required** | 改密码 / 财务动作 / 跳过浏览器安全警告 | ⭐ 用户接管，模型**不碰** |
| ⭐ **Confirmation Required at Action time** | 删数据 / CAPTCHA / 装包 | ⭐ 即时弹窗 |
| ⭐ **Pre-Approval Allowed** | 用户**显式**授权过 | ⭐ 直接做（但**模糊指令不算**）|
| ⭐ **Not required** | 普通 read / 普通写入 | ⭐ 直接做 |

---

## 三、社区反响 ⭐

| 立场 | 评价 |
|---|---|
| ⭐ **震撼派** | "30 万字史诗级泄露" / "可口可乐神秘配方" |
| ⭐ **技术派** | "不过是跑了 mitmproxy 从本地文件拿的，本来就在公开仓库找得到影子" |
| ⭐ **鄙视链顶端** | "Pliny —— 我还搞到了 Meta Hatch 全栈 + 隐藏推理轨迹，那才叫厉害"（来源：但懒得搞网红包装）|
| ⭐ **吃瓜派** | "294,000 字符的 JSON 包装得像死海古卷" |

---

## 四、本质：⭐ "提示词工程已死，系统工程永生"

> "以前，我们以为写提示词就是玄学：加一句'深呼吸'、加一句'如果做不好就扣你工资'，模型就能变聪明。"

> "⭐ **真正的工业级 AI 应用，根本不是靠几句讨巧的话，而是靠极其严密的系统工程**！"

⭐ **GPT-6 Sol Codex 的工业级特征**：
- ⭐ **模块化**：Skills 动态加载
- ⭐ **记忆管理**：Compaction 手册
- ⭐ **执行策略**：并行执行与重试
- ⭐ **安全协议**：4 级确认模式

> "⭐ **大模型正在从一个聪明的对答机，全面进化为具备接管权限的自主操作系统。而这次泄露的 30 万字，就是通向这个新时代的源代码**。"

---

## 五、对 OpenClaw + Hermes Agent 的借鉴（已落库 Obsidian）

⭐ **可借鉴 6 项**：

| # | 借鉴项 | 难度 | 收益 |
|---|---|---|---|
| ⭐ **1** | **4 级确认策略** | ⭐ 低 | ⭐⭐⭐⭐⭐ 高 |
| **2** | ⭐ **沙箱模式标签** | ⭐⭐ 中 | ⭐⭐⭐⭐⭐ 高 |
| **3** | ⭐ **Guardian classifier v2**（内心检查 4 类） | ⭐⭐ 中 | ⭐⭐⭐⭐ 高 |
| **4** | ⭐ **`fork_turns` 上下文裁剪** | ⭐⭐⭐ 高 | ⭐⭐⭐ 中 |
| **5** | ⭐ **Auto-compact fallback prompt** | ⭐ 低（暂不需要）| ⭐⭐ 中 |
| **6** | ⭐ **后台 eval heartbeat 唤醒** | ⭐⭐ 中 | ⭐⭐⭐ 中 |

⭐ **不借鉴**：12 个 vendor 隐私弹窗（OpenAI / Google / Microsoft ...）、"Codex personality" 字面写法、CLI 内部 micro-templates。

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/gpt-6-sol-codex-30k-prompt-leaked/image-01.jpg" alt="GPT-6 Sol 30 万字提示词泄露" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：GPT-6 Sol Codex 30 万字提示词泄露 —— 1902 行 / 54 板块 / 顶级代码模型驯化指南（新智元 · 2026-10-04）</p>
</div>

## 来源

- [网易新闻（新智元）· 原文](https://c.m.163.com/news/a/L8CQIACG0511ABV6.html)
- [GitHub: elder-plinius/CL4R1T4S](https://github.com/elder-plinius/CL4R1T4S/blob/main/OPENAI/Codex_Desktop/GPT-6-Sol_Prompts.txt)
- [@elder_plinius X 帖](https://x.com/elder_plinius/status/2102515853430542668)
- 落库：Obsidian `Research/CL4R1T4S/`