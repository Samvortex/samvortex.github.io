---
title: 'OpenAI 推出 textGrain 文本水印技术 以标识 AI 生成内容 — 分阶段推出 + 检测器申请开放 + 计划开源'
slug: 'openai-textgrain-implementation-2026'
date: '2026-10-05'
category: 'notes'
tags: ['OpenAI', 'textGrain', '文本水印', 'AI 生成内容标记', '欧盟 AI Act', 'ChatGPT', 'Codex', 'API', '水印检测器', '研究人员', '检测准确率', '误报漏报', '水印抗编辑', '同义词替换', 'Artificial Analysis', 'AutomationBench', '技术报告', '开源计划', '水印法规']
summary: |
  OpenAI 2026-10-05 正式公布 textGrain 文本水印方案以响应欧盟 AI Act 生成式内容标记条款，应用于 ChatGPT + Codex + API。分阶段：API 客户今天起全球可选择为部分模型启用（默认关闭），ChatGPT/Codex 水印未来几周面向欧盟特定用户。检测器申请流程同步开放但首批仅限审核过的研究人员和专业机构，OpenAI 坦承检测技术仍有明显局限（短文本/数学等领域准确率显著下降）。抗编辑能力弱：400 词段测试，仅替换 10% 同义词检测率从 92% 降到 66%；替换 25% 降到 17%——简单修改即大幅削弱水印。

---

## 一句话总结

OpenAI 2026-10-05 正式公布 textGrain 文本水印方案以响应欧盟 AI Act 生成式内容标记条款，应用于 ChatGPT + Codex + API。分阶段：API 客户今天起全球可选择为部分模型启用（默认关闭），ChatGPT/Codex 水印未来几周面向欧盟特定用户。检测器申请流程同步开放但首批仅限审核过的研究人员和专业机构，OpenAI 坦承检测技术仍有明显局限（短文本/数学等领域准确率显著下降）。抗编辑能力弱：400 词段测试，仅替换 10% 同义词检测率从 92% 降到 66%；替换 25% 降到 17%——简单修改即大幅削弱水印。基准测试带水印的版本在 AA Intelligence Index / AutomationBench 等部分指标反而略优于无水印版本。OpenAI 明确水印不衡量人类贡献、不确立所有权、不识别用户身份、不验证内容准确；未检测到水印也不能证明文本出自人类之手。公司计划开源 textGrain + 数周后更新技术报告 + 持续研究编辑/翻译后水印存续能力 + 区分 AI 辅助 vs AI 代笔。

---

## 一、推出节奏

| 阶段 | 时间 | 范围 | 默认 |
|---|---|---|---|
| API 端 opt-in | 2026-10-05 即日 | 全球 | 关闭 |
| ChatGPT / Codex 水印 | 未来几周 | 欧盟特定用户 | 启用 |

OpenAI 强调"水印不会成为全球默认"，符合欧盟 AI Act 条款驱动设计。

---

## 二、检测器

首批接入仅限审核过的研究人员和专业机构，公司借此进一步评估与优化技术。

OpenAI 在公告中坦承检测技术存在明显局限：

| 局限 | 场景 |
|---|---|
| 误报 / 漏报 | 所有场景 |
| 短文本 | 检测准确率显著下降 |
| 数学等词汇灵活性低 | 检测准确率显著下降 |

---

## 三、水印抗编辑能力（关键发现）

400 词段测试结果：

| 操作 | 检测率 |
|---|---|
| 无修改 | 约 92% |
| 替换 10% 同义词 | 约 66%（下降 26 个百分点）|
| 替换 25% 词汇 | 约 17%（骤降）|

> 含义：简单文字修改即可大幅削弱水印的可识别性。

---

## 四、质量影响

基准测试对比：

| 指标 | 带水印表现 |
|---|---|
| Artificial Analysis Intelligence Index | 略优于无水印 |
| AutomationBench | 略优于无水印 |
| 其他指标 | 影响有限 |

水印对生成质量影响很小，某些情况下甚至轻微正向。

---

## 五、关键免责声明

OpenAI 明确水印**不能**做什么：

| 维度 | 限定 |
|---|---|
| 衡量人类贡献 | 否 |
| 确立所有权 | 否 |
| 责任归属 | 否 |
| 识别用户身份 | 否 |
| 验证内容准确性 | 否 |

反向亦不成立：未检测到水印也不能证明文本出自人类之手。

---

## 六、未来动作

| 类别 | 计划 |
|---|---|
| 技术报告 | 数周后更新更多细节 |
| 开源 | 计划开源 textGrain，供其他开发者构建 |
| 水印方案 | 随技术 + 标准 + 证据演进，适时调整 |
| 研究方向 | 水印在编辑/翻译后的存续能力 |
| 区分 AI 辅助 vs AI 代笔 | 如何更有意义地区分 |

---

## 七、对 Sam 的 3 点启示

1. 水印本质是"统计信号 + 概率判断"——不是绝对证明。Hermes Agent 输出文档如需"AI 协助标记"可考虑加 watermark 字段或免责声明，避免误用为"内容真伪证据"
2. 抗编辑能力弱 = 三层合规挑战——单纯水印无法应对欧盟 AI Act 第 50 条（AI 生成内容标记）的合规要求，需要补充日志、内容审计。Hermes Agent Skill Marketplace 输出文档默认配 AI 字段记
3. OpenAI 选择 opt-in 分阶段 ≠ 一步到位——Sam 在 Hermes Agent 商业化路径上也可参考"分阶段开放"，先给免费用户 opt-in，付费用户默认开，欧盟特定场景必开

---

## 来源

- [网易新闻原文](https://www.163.com/dy/article/L8HTQ1EK055680UT.html)
- OpenAI 官方公告（2026-10-05）
- [9to5mac](https://9to5mac.com/2026/10/05/openai-details-new-text-watermarking-system-for-chatgpt-codex-and-the-api/)
- 早前相关：[OpenAI 欧盟水印初版](https://www.samvortex.com/research/openai-textgrain-eu-watermark/)

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/openai-textgrain-implementation-2026/image-01.jpg" alt="OpenAI textGrain 文本水印" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：OpenAI textGrain 文本水印分阶段推出 + 计划开源（网易号 · 2026-10-05）</p>
</div>