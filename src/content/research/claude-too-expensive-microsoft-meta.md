---
title: 'Claude 太贵了！微软砍掉超三成预算，Meta 用户直接腰斩 — AI 编程进入算账期'
slug: 'claude-too-expensive-microsoft-meta'
date: '2026-10-06'
category: 'notes'
tags: ['Claude', 'Anthropic', '微软', 'Microsoft', 'Meta', 'Claude Code', 'Copilot', 'MetaCode', 'Muse Code', 'Muse Spark', 'Token 计费', 'Agent', '算账期', '预算', 'Anthropic 上市', 'S-1', '基础设施采购', '314 亿美元', 'Claudeonomics', '60 万亿 Token', '算账期', '能力曲线', '成本曲线']
scale: 'claude-too-expensive-microsoft-meta'
summary: |
  Anthropic 两个最大金主同时踩刹车。微软原本预计今年在 Claude 上超 10 亿美元内部预算已被砍掉三分之一以上，云部门人均 Claude 额度从 10 万美元降到约 1 万美元（一刀砍 90%），要求 6 月 30 日财年前全部迁完；Meta 内部 Claude Code 用户从 6 万掉到 3 万（腰斩），但 28 天仍烧掉 1.05 亿美元。更深原因是身份转变：Claude Code 越像 Office 替代品，越威胁微软命根子；Meta 自研 Muse Spark 把 Claude 需求顶掉，还想限制 Anthropic 接触自家训练数据。Anthropic 与微软有约 314 亿美元不可取消基础设施采购承诺。市场反问——当路演台下时，四分之一营收的两个客户同时收缩。9 月 Fable 5.1 缓存读取成本降 75%、典型负载便宜 25%、Agent 重活便宜 45%，并允许企业自留数据，但降价不能解决根本：巨头嫌的不是贵，是供应商变成竞争对手。行业进入能力与成本曲线赛跑，够用便宜可控的模型吃日常活儿，最强模型只留给最难那一小部分——光有最强还不够，得让人用得起。
---

## 一句话总结

Anthropic 两个最大金主同时踩刹车。微软原本预计今年在 Claude 上超 10 亿美元内部预算已被砍掉三分之一以上，云部门人均 Claude 额度从 10 万美元降到约 1 万美元（一刀砍 90%），要求 6 月 30 日财年前全部迁完；Meta 内部 Claude Code 用户从 6 万掉到 3 万（腰斩），但 28 天仍烧掉 1.05 亿美元。触发点是身份转变：Claude Code 越像 Office 替代品，越威胁微软命根子；Meta 自研 Muse Spark 把 Claude 需求顶掉，还想限制 Anthropic 接触自家训练数据。Anthropic 与微软有约 314 亿美元不可取消基础设施采购承诺。9 月 Fable 5.1 缓存读取成本降 75%、典型负载便宜 25%、Agent 重活便宜 45%，但降价不能解决根本——巨头怕的不是贵，是供应商变成竞争对手。行业进入能力与成本曲线赛跑。

---

## 一、Claude 最大的问题

不是不好用。恰恰相反，它太好用了。

> "账单炸了：越好用，越烧钱。"

---

## 二、微软：从 10 万额度砍到 1 万

| 阶段 | 状态 |
|---|---|
| 2025-12 | 体验与设备部门给数千名工程师开通 Claude Code |
| 头几个月 | Token 消耗量直接翻倍 |
| 单个工程师月成本 | 500-2000 美元 |
| 团队总成本 | 数百万美元 |
| 2026 春 | 云与 AI 负责人 Scott Guthrie + 高管 Jay Parikh 发话：少用 Claude，改用 GitHub Copilot 和自家模型 |
| 据 The Decoder | 人云部门人均 Claude 额度从 10 万美元降到约 1 万美元（砍 90%） |
| 2026-05 | 取消大部分 Claude Code 许可证 |
| 截止 | 要求 6 月 30 日财年结束前全部迁完 |

微软 AI CEO 苏莱曼说：Anthropic 方案「极其昂贵」，目标是大幅削减，直到彻底取消。

---

## 三、Meta：用户腰斩，但还在烧

| 维度 | 数据 |
|---|---|
| 内部 Claude Code 员工数 | 约 6 万 → 约 3 万（腰斩） |
| 最近 28 天 Claude Code 花费 | 超过 1.05 亿美元 |
| 前一阵 10% 裁员 | 只能解释一部分流失 |

更深原因是身份转变——Meta 自己造出了替代品：
- 内部编程工具 MetaCode 用户已超过 3 万
- 8 月开始对外测试的 Muse Code 内部用户超 6000
- Meta 自研 Muse Spark 进步太快，把 Claude 需求顶掉

Meta 内部有员工戏称『Claudeonomics』看板，30 天烧掉 60 万亿 Token——相当于每天把海量内部代码和数据，经别人家服务器跑一圈再回来。

> "这种事，哪家大厂能忍？"

---

## 四、这就是按 Token 计费的死结

> "聊天时你问一句答一句，流量有限。但 Agent 模式不一样，它会自己读代码、跑测试、改了再改，一干就是几个小时，流量表一直在转。"

> "越好用，越贵。越贵，就越想自己造。"

---

## 五、最扎心的是时间点

- Anthropic 今年 6 月秘密向 SEC 提交 S-1 文件
- 9 月公开的招股书：两家未具名客户合计贡献约 25% 营收
- 市场普遍猜测这两家就是微软和 Meta
- 最早本月中旬启动正式路演，冲刺纳斯达克

> "一家公司正准备去说服投资人，四分之一的收入可能来自两个客户，而这两个客户偏偏在这个节骨眼上同时收缩。换你坐在路演台下，也得再多想想。"

---

## 六、315 亿美元基础设施承诺的拧巴画面

> "微软在 Claude 上拼命省钱，Anthropic 却还得在微软云上大把花钱。"

招股书显示：Anthropic 与微软之间有约 314 亿美元不可取消的基础设施采购承诺。

> "这画面多少有点拧巴。"

---

## 七、合作伙伴怎么变成对手

更深逻辑是身份的转变。

- 一年前：把 Anthropic 当成卖铲子的——模型是工具，谁都能买来用
- 现在：Claude Code 能自己写代码、改文档、跑流程；Claude Cowork 越来越像 Office 替代品——而 Office 恰好是微软的命根子
- Meta 那边也一样：自己要把 Muse 做成卖给企业的服务，没道理一边做竞品一边给对手交钱
- 据报道 Meta 还想限制 Anthropic 接触自家训练数据

> "模型越强，就越接近客户的核心业务。越接近核心业务，客户就越不放心把它交给外人。"

---

## 八、不止这两家

| 时间 | 公司 | 动作 |
|---|---|---|
| 7 月 | 阿里 | 全面停用 Claude Code，改推自研 Qoder |
| 9 月 | 英伟达 | 收紧使用，处理专有信息时更愿意用自家 Nemotron |
| 9 月 | Palantir | 收紧使用 |
| 9 月 | Booz Allen | 收紧使用 |

理由各不相同：有的是成本，有的是数据安全，有的是防蒸馏。但方向一致：代码这种最核心的事，巨头要握在自己手里。

---

## 九、Anthropic 的应对：Fable 5.1 降价 + 数据自留

| 优化 | 幅度 |
|---|---|
| 9 月发布的 Fable 5.1 缓存读取成本 | 降 75% |
| 典型工作负载 | 便宜约 25% |
| 高度 Agent 化的重活 | 最多便宜 45% |
| 数据留存政策 | 允许企业在自家基础设施上保留数据 |

> "降价只能缓解矛盾，解决不了根本。巨头们不仅嫌贵，更在意的是，这家供应商正在变成它们的竞争对手。"

---

## 十、AI 编程进入算账期

> "过去两年，AI 行业比的是谁的模型更强、谁的 Agent 能独立干更久的活。"

> "现在，CFO 开始问另一个问题：每一行代码到底花了多少钱？"

> "这个问题的答案，正在把市场切成两层。够用、便宜、可控的模型，吃掉大量日常活儿；最强的模型，只留给最难的那一小部分。"

> "对整个 ASI 竞赛来说，这是一个残酷的提醒——光有最强还不够，还得让人用得起。"

> "AI 的能力曲线和成本曲线正在赛跑。能力跑得再快，成本降不下来，它就只能待在少数预算充足的团队里。谁先把智能做到足够便宜，谁才能真正走进每个工程师的日常。"

---

## 对 Sam 的 3 点启示

1. 工具不是越强越好——重要的是能否在公司预算内可持续使用。Sam 的 Hermes Agent 部署时也要考虑：每个工程师的 Token 成本要有可预算的限额，避免 Anthropic 这种"用户自然翻倍"的失控
2. 替代品风险——Claude Code 这种"卖铲子"工具，本身会成为客户竞品。OpenClaw 设计的 `<sandbox_model>` / `<confirmation_policy>` 抽象边界要跟 pod 业务流程分清楚
3. 能力 vs 成本曲线赛跑——Sam 现在做的 Hermes Agent 在中国市场是"够用便宜可控"路线，正好吻合本节核心预测

---

## 来源

- [网易新闻（新智文）](https://www.163.com/dy/article/L8I5154F0511ABV6.html)
- [The Information 原文（付费墙）](https://www.theinformation.com/articles/meta-microsoft-work-wean-staff-anthropics-claude)
- Anthropic S-1 招股书
- 编辑：所罗门

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/claude-too-expensive-microsoft-meta/image-01.jpg" alt="微软砍 Claude 预算 / Meta 用户腰斩" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：微软砍掉超三成 Claude 预算，Meta 用户腰斩 —— Anthropic 两大金主同时踩刹车（新智文 · 2026-10-06）</p>
</div>