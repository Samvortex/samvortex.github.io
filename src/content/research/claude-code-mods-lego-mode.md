---
title: 'Claude Code 的「乐高」模式，让程序员彻底玩「上头」了'
slug: 'claude-code-mods-lego-mode'
date: '2026-10-03'
category: 'notes'
tags: ['Claude Code', 'Anthropic', 'Mods', '插件', 'Boris Cherny', 'Vibe Coding', 'Claude Marketplace', 'Minecraft', 'DeepSeek Harness', 'OpenAI Codex', 'pet 宠物', 'Storytime', 'claudemods.ai', '可控开放', 'CLI 光谱']
summary: '⭐ **Claude Code 负责人 Boris Cherny 9 月中旬放出 Mods 机制，10-1 正式默认开启** —— ⭐ **TypeScript 插件函数** 能改造 UI / 拦截命令 / 转给其他模型。开发者玩疯了：∘ **像素宠物**：Claude 每调一次工具就吃一口饭 ∘ **打 Doom** ∘ **Storytime（26 万参数小模型 + Claude 工作的实时故事）** ∘ **4-7-8 呼吸引导** ∘ **发射密码**（破坏性命令需输入密码） ∘ **agent-race** ∘ **claudemods.ai** 已分类投票。⭐ **Claude Marketplace 2000+ 插件 / 商店 / 上架审核 / 开发者后台 — 10 天凑齐应用商店四件套**。对比 Codex（官方做宠物）vs DeepSeek Harness（MIT 一切皆插件）—— Claude Code 卡在 ⭐ **"可控的开放"光谱正中间**。'
author: 'Sam Xu'
featured: false
draft: false
source: '网易新闻（极客公园）'
source_url: 'https://c.m.163.com/news/a/L8AVDUJ205119FMA.html'
---

## 一句话总结

> ⭐ **Claude Code 负责人 Boris Cherny 9 月中旬放出 Mods 机制，10-1 正式默认开启** —— ⭐ **TypeScript 插件函数** 能改造 UI / 拦截命令 / 转给其他模型。开发者玩疯了：∘ **像素宠物**：Claude 每调一次工具就吃一口饭 ∘ **打 Doom** ∘ **Storytime（26 万参数小模型 + Claude 工作的实时故事）** ∘ **4-7-8 呼吸引导** ∘ **发射密码**（破坏性命令需输入密码） ∘ **agent-race** ∘ **claudemods.ai** 已分类投票。⭐ **Claude Marketplace 2000+ 插件 / 商店 / 上架审核 / 开发者后台 — 10 天凑齐应用商店四件套**。对比 Codex（官方做宠物）vs DeepSeek Harness（MIT 一切皆插件）—— Claude Code 卡在 ⭐ **"可控的开放"光谱正中间**。

---

## 一、Mods 机制 ⭐

> "⭐ **这一切的源头，是 Claude Code 负责人 Boris Cherny 9 月中旬在 GitHub 上放出的一套机制，名字就叫 Mods**。当地时间 10 月 1 日，⭐ **它正式写进更新日志，默认开启**。"

> "⭐ **短短十几天，一个敲命令、改代码的工具，被程序员们搭成了一个可以随便盖房子的「我的世界」**。"

### 核心定义 ⭐

> "Claude Code 里的 mod，⭐ **本质上是几行跑在插件里的 TypeScript 函数**。"

### 权限 ⭐

| 能力 | 详情 |
|---|---|
| ⭐ **开面板** | 在对话旁边开面板 |
| ⭐ **画横条** | 在输入框上方画横条 |
| ⭐ **改造内置界面** | 改 UI |
| ⭐ **拦截命令** | 在 Claude 执行命令之前把它拦下来 |
| ⭐ **转给其他模型** | ⭐ **把请求转给另一个模型处理** |
| ⭐ **写 mod** | 不会写代码也没关系，**对 Claude 说一句"帮我写个 mod"**，它就能自己给自己装上新功能 |

---

## 二、官方自己也用 Mods ⭐

> "Anthropic 在发布时顺手透露了一个细节。⭐ **Claude Code 自己的 /diff 变更面板，以及对 AGENTS.md 的支持，并不是写死在产品里的功能，而是官方团队用同一套 Mods 机制写出来的**。⭐ **源代码和测试就公开放在仓库里**。"

> "**官方团队和外部开发者，用的是同一套改装工具**。Anthropic 不是施舍给用户一点改皮肤的权限，⭐ **而是在用积木搭自己的产品，然后把整个积木盒子倒在桌上，告诉所有人你们也可以这么干**。"

---

## 三、社区玩疯了 ⭐

### ⭐ 像素宠物 ⭐

> "有人在输入框上方养了一只像素宠物，⭐ **Claude 每调用一次工具它就吃一口饭，调用失败当场生病，碰上 rm -rf 还会抱头惊慌**。"

### Chrome 恐龙 + Doom ⭐

> "有人把 Chrome 断网时的小恐龙搬了进来，**Claude 在后台写业务逻辑，人在前台狂按空格跳仙人掌**。"

> "开发者 ⭐ **jarrodwatts 制作的在 Claude Code 里打 Doom 的 Mod**。"

### ⭐ Storytime（最离谱）⭐

> "最离谱的一个叫 ⭐ **Storytime**。作者往 Claude Code 里塞了一个 ⭐ **26 万参数的小模型**，⭐ **根据 Claude 正在干的活，实时在屏幕上方写一个小故事**。**一个 AI 编程工具里，又跑着另一个 AI 在讲故事**。"

### OneWave AI 一晚上 10 个 mod ⭐

| Mod | 作用 |
|---|---|
| **像素宠物** | 同上 |
| ⭐ **发射密码** | ⭐ **遇到破坏性命令必须先输入密码才放行** |
| ⭐ **内心独白** | 开个面板展示 ⭐ **Claude 对你这次会话干巴巴的吐槽** |
| ⭐ **agent-race** | 让几个 Claude 会话同时解同一个问题，⭐ **屏幕实时刷计分板** |

### 社区站 ⭐

> "已经有人搭起了 ⭐ **claudemods.ai**，⭐ **按游戏 / 仪表盘分门别类，还能投票**。⭐ **目前投票最高的，是那只小恐龙**。"

---

## 四、Anthropic 10 天凑齐应用商店四件套 ⭐

| 日期 | 事件 |
|---|---|
| **9-23** | ⭐ **Claude Marketplace 上线** —— ⭐ **2000+ 插件和连接器** |
| **9-25** | ⭐ **开放插件提交门户** —— ⭐ **付费开发者提交作品**，⭐ **自动校验 + 安全扫描 + 人工审核一条龙**，上线后可看 ⭐ **安装 / 使用数据** |
| **10-1** | ⭐ **Mods 正式上线**（默认开启），⭐ **打包在插件里**，**可提交到目录分享** |

> "⭐ **商店 / 上架审核 / 开发者后台 / 深度改装能力 —— 10 天之内，Anthropic 凑齐了一个应用商店的全部四件套**。"

> "⭐ **官方还表示，未来几周 Claude 应用和 Claude Code 会统一插件入口**。⭐ **终端里的这些 mod，正在被收进 Anthropic 更大的生态版图**。"

---

## 五、对比：Codex vs Harness vs Claude Code ⭐

| 玩家 | 路线 | 开放度 |
|---|---|---|
| ⭐ **OpenAI Codex** | ⭐ **官方做宠物**：`/pet` 召唤浮窗小伙伴<br>可换皮，**碰不到底层** | ⭐ **闭源** |
| ⭐ **DeepSeek Harness** | ⭐ **MIT 开源**"**一切皆插件**"<br>⭐ **连 Claude Code / Codex 都能作为子代理**<br>Harness **同一天**DeepSeek-V4-Pro 涨价 —— ⭐ **"编排免费，推理收费"** | ⭐ **全开源** |
| ⭐ **Anthropic Claude Code** | ⭐ **核心思考循环不开放**<br>**几乎把其他能交的权限都交了出去**（包括转给其他模型） | ⭐ **"可控的开放"光谱正中间** |

> "⭐ **Harness 能托管 Claude，Claude Code 却不能托管 DeepSeek**。"

> "Claude Code 卡在这条光谱的 ⭐ **正中间**，核心的思考循环目前没有开放，但在内核之外，它几乎把能交的权限都交了出去，⭐ **包括把请求转给另一个模型**。"

> "⭐ **这种'可控的开放'，开放到足以让重度用户把它改成自己的形状，又没有开放到让人可以把 Claude 本身换掉**。"

---

## 六、安全风险 ⭐

> "⭐ **开放的代价也摆在明面上**。⭐ **官方文档说得很直白，mod 拥有和 Claude Code 本身相同的机器访问权限，⭐ **代码由发布者而不是 Anthropic 写，只装可信来源的**。理论上，一个恶意 mod 能做的事，和一个恶意软件包没有区别**。"

> "⭐ **文档里专门留了一页给企业管理员，讲如何管控 mod**。"

---

## 七、商业模式 ⭐

> "⭐ **从公开信息来看，Anthropic 的目录体系里看不到收益分成**，⭐ **一个被成千上万人安装的 mod，开发者能拿到的只有后台的使用数据**。"

> "**当第一波整活的新鲜劲过去，⭐ **开发者凭什么长期为一个闭源、没有经济回报的平台添砖加瓦**？**"

> "**《我的世界》的模组能繁荣十几年，靠的是热爱和社区声望**。**生产力工具的世界不太一样**。"

---

## 八、深层洞察 ⭐

> "**Anthropic 已经把乐高积木的盒子倒在了桌上**。⭐ **这个用代码搭起来的「我的世界」能长多大，取决于它最终能为建造者留下什么**。"

> "**但大家也不要小看，程序员及用户对于和自己打造 / 美化工具之间的羁绊**，⭐ **在模型每周都在更新的当下，一个让自己中意的皮肤或者 Mod，都有可能是留住用户的「软实力」**。"

---

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/claude-code-mods-lego-mode/image-01.jpg" alt="Claude Code Mods 乐高模式" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：Claude Code Mods 乐高模式 —— 像素宠物 / Doom / Storytime（极客公园 · 2026-10-03）</p>
</div>

## 来源

- [网易新闻（极客公园）· 原文](https://c.m.163.com/news/a/L8AVDUJ205119FMA.html)
- Claude Code 负责人 Boris Cherny GitHub 公告（9 月中旬）
- Claude Code 官方更新日志（2026-10-01）
- Claude Marketplace（9-23）/ 插件提交门户（9-25）
- claudemods.ai 社区站
- OpenAI Codex 宠物模式
- DeepSeek Harness 开源项目（MIT）