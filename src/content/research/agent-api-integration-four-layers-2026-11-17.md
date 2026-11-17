---
title: 'Agent API 接入的四层：协议兼容、流式处理、扩展能力与成本结构'
slug: 'agent-api-integration-four-layers-2026-11-17'
date: '2026-11-17'
category: 'research'
tags: ['Agent API', 'DeepSeek', 'chat-demo', 'Anthropic 兼容', 'SSE', '模型路由', '成本结构', '缓存命中', '协议兼容', 'OpenClaw', 'Provider']
summary: '⭐ DeepSeek 刚开源的 `chat-demo`（⭐4,316，⭐ 5 天新仓库）看着像 UI demo，⭐ **其实是「Agent 接 API 该怎么做」的参考实现**。⭐ 我拆了它的 `src/services/api/`（39 文件），⭐ 提炼出 ⭐ **四层：协议兼容 → 流式 → 扩展能力 → 成本结构**。⭐ 附 ⭐ **兼容边界**（字段被忽略、`cache_control` 失效），⭐ 以及 ⭐ **反直觉结论**：⭐ DeepSeek 缓存命中 0.02 元/百万，⭐ **跟 Gemini Decision 1 同价**，⭐ 输出贵 4 元。'
author: 'Sam Xu'
featured: false
draft: false
source: 'DeepSeek chat-demo 源码 + 官方兼容文档'
source_url: 'https://github.com/deepseek-ai/chat-demo'
---

## 一句话总结

> ⭐ DeepSeek 刚开源的 `chat-demo`（⭐4,316，**才 5 天的仓库**）看着像个 UI demo，⭐ **其实是「Agent 接第三方 API 该怎么做」的完整参考实现**。⭐ 我拆了它的 `src/services/api/`（39 文件 / 237KB），⭐ 提炼出 ⭐ **四层模型：协议兼容 → 流式处理 → 扩展能力 → 成本结构**。⭐ 顺带把 ⭐ **DeepSeek 的 Anthropic 兼容边界**查清楚了（哪些字段被忽略、模型名怎么映射、`cache_control` 为什么无效），⭐ 以及 ⭐ **一个反直觉的成本结论**：⭐ DeepSeek 缓存命中 **0.02 元/百万**，⭐ **跟 Gemini Decision 1 完全同价**，⭐ 但输出贵 4 元——⭐ 所以「只判不生成」和「要写东西」该选的根本不是同一个。

<img src="/img/research/agent-api-integration-four-layers-2026-11-17/image-01.jpg" alt="四层堆叠架构：底层 HTTPS 端点、其上是流式数据包、再上是工具分支能力树、顶部是浏览器窗口" style="max-width: 100%; border-radius: 8px;" />

---

## 一、先看这个仓库是什么

| | |
|---|---|
| 仓库 | `deepseek-ai/chat-demo` ⭐4,316 / fork 924 / MIT / TypeScript |
| 时间 | 创建 2026-11-12，最后推送 **11-13**（5 天） |
| 在线 | https://deepseek-ai.github.io/chat-demo/ |
| 离线包 | Releases 有 `chat-demo-v0.1.1.zip`（1.8MB） |
| 部署 | GitHub Actions → GitHub Pages |
| 技术栈 | rspack + React 18 + TypeScript 7.0.2 + zustand，oxlint/oxfmt |
| 体积 | 188 个文件，`src/` 里 `components` 302KB + `services` 237KB |

**架构一句话：纯静态，无后端。**

> No application backend is required: the browser connects directly to the configured API service.

API key 存 localStorage，会话和附件存 IndexedDB，按浏览器 profile + 站点 origin 隔离。

**功能面比一般 demo 完整得多**：多会话、自动标题、重命名、编辑 prompt、重新生成、**消息分支**、流式回复、深度思考、**联网搜索**、**链接阅读**、来源引用、附件上传/粘贴/拖拽、**语音输入 + 朗读**、Markdown/高亮/KaTeX/Mermaid、简中英双语、亮暗主题、**历史记录 ZIP 导入导出**。

**但这个仓库真正的价值不在 UI，在 `src/services/api/`。** 那 39 个文件、237KB，是把「一个前端怎么正确地跟 Claude 风格的 Messages API 对话」这件事写清楚了。

---

## 二、四层模型

### 第 1 层：协议兼容 —— 「像 Anthropic」和「是 Anthropic」是两件事

DeepSeek 提供了 Anthropic 格式端点：

```
POST https://api.deepseek.com/anthropic/v1/messages
```

SDK 用户的写法是：

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_API_KEY=${YOUR_API_KEY}
```

**但兼容不等于等价。** 官方文档列了一张详细的字段支持表，我把关键项摘出来：

| 字段 | 支持情况 |
|---|---|
| `anthropic-version` | **忽略** |
| `anthropic-beta` | **忽略**（除非 `source.type=file` 的图片引用，需 `files-api-2025-04-14`） |
| `container` / `mcp_servers` / `service_tier` / `top_k` | **忽略** |
| `max_tokens` | 支持，但**思考模式下会被兼容性处理抬高**，不构成严格上限 |
| `cache_control`（tool 与 content 里） | **忽略** |
| `citations`（content 里） | **忽略** |
| `temperature` | [0.0, 2.0]，**思考模式下固定 1.0** |
| `top_p` | 依赖模型和模式，行为不统一 |
| `thinking.budget_tokens` | **忽略** |
| `output_config` | 只支持 `effort` |
| `stop_sequences` | 支持，最多 16 个，每个 ≤512 字节 |
| `tool_choice: "tool"` | **思考模式下返回 400** |

**最值得注意的两条：**

**① `cache_control` 被忽略。**

这在 Anthropic 生态里是个大事——Claude 生态大量依赖 `cache_control: {type: "ephemeral"}` 手动标记缓存断点。**DeepSeek 忽略它**，意味着缓存行为不由客户端控制，而是由服务端按前缀自动判定。

**② 模型名映射。**

```
claude-opus*   → deepseek-v4-pro
claude-haiku*  → deepseek-flash
claude-sonnet* → deepseek-flash
其他 claude*   → deepseek-flash
不以 claude 开头 → 400
```

官方还专门说明了这个映射的用途：

> With this mapping, when using the developer mode of the new Claude Desktop APP, you can bypass the APP's model name restrictions by simply changing the `base_url` and `api_key` to connect to DeepSeek models.

**注意 `claude-opus*` 映射到 `deepseek-v4-pro`——按 V4 Pro 的价格计费**，不是 Flash。

### 第 2 层：流式处理 —— SSE 的四个坑

chat-demo 的 `src/services/api/sse.ts` 是按 **WHATWG EventSource 规范**手写的解码器，注释写得很清楚：

```
字节流 → UTF-8 解码 → 按 CRLF / LF / CR 切行 → 字段累积 → 空行派发事件
```

四个容易写错的地方它都处理了：

**① CRLF 被拆在两个 chunk 里。** 它的处理是：

```ts
// 结尾的 CR 可能是 CRLF 的前半，等下一段再判断
if (match[0] === '\r' && LINE_BREAK.lastIndex === this.buffer.length) {
  break
}
```

**② 保活注释行。** 服务端发的 `: keep-alive` 直接忽略——**不忽略的话会被当成事件派发出去**。

**③ `retry` 字段不处理。** 因为这只对 `EventSource` 自动重连有意义，手动 SSE 用不上。

**④ 流的四种失败被严格区分。** `errors.ts` 里定义了五类：

```ts
export type ApiErrorKind =
  | 'http'        // 非 2xx
  | 'stream'      // 流中返回的错误帧（如等待生成超时）
  | 'network'     // 请求没到服务端（断网、跨域被拦）
  | 'interrupted' // 流在 message_stop 之前结束
  | 'protocol'    // 响应不符合协议（如非 SSE 响应）
```

**`interrupted` 这一类特别值得注意。** 流式请求最危险的失败模式**不是断开**（那会立即报错），而是**看起来还活着但其实不动了**。chat-demo 把它单列一类，就是为了让上层能区分「服务端出错」和「连接被掐」。

配套的 `errors.ts` 还做了一件很聪明的事——**把 HTTP 状态码映射成语义类别，但不让它生成文案**：

```ts
export type ApiErrorCondition =
  | 'unauthorized' | 'insufficientBalance' | 'tooLarge'
  | 'rateLimited' | 'serverBusy' | 'network' | 'other'
```

> 各调用方按自己的场景给同一种情况配不同文案，例如余额不足在回答、上传、朗读里措辞不同，所以这里只归类，不生成文案。

**同一类错误，在「回答」「上传附件」「朗读」三个界面上应该有三套说法。** 把分类和文案分开，是这类代码最容易写错的地方。

### 第 3 层：扩展能力 —— DeepSeek 原生提供的

这些是 chat-demo 用的、也是我们目前自建或者没有的：

| 扩展 | 说明 |
|---|---|
| `deepseek_web_search` | 联网搜索。区分 `search` / `deep_search` / `image_search` / `deep_image_search` 四种 kind |
| `deepseek_read_url` | 网页链接阅读（加密在结果块的 `signature` 里） |
| `safety_check.level` | `high` 开启模型内容安全；`low` 或不传则关闭 |
| `title` | 开启后返回会话标题 |
| Files API | 附件上传，`files-api-2025-04-14` beta 头 |
| ASR / TTS | 语音识别与合成 |

**两个约束值得记住：**

**① 联网工具不能跟别的 server tool 混用。**

> To use the web tools, declare the server tools `deepseek_web_search` and `deepseek_read_url`. **No other server tools can be declared together with them.**

**② 客户端自定义 tool 只能有 `name` / `input_schema` / `description`，不能有 `type`。**

> The `type` field selects a server tool; passing `type: "custom"` for a client tool returns a **422** error.

**③ 思考模式下 `tool_choice` 的行为会变。**

| 值 | 思考模式下的行为 |
|---|---|
| `none` | 支持 |
| `auto` | 支持（`disable_parallel_tool_use` 被忽略） |
| `any` | 有 server tool 时等同 `auto`；**只有 client tool 时返回 400** |
| `tool` | **返回 400** |

### 第 4 层：成本结构 —— 同样一个模型，量词不一样

这是最容易被忽略、但对 Agent 架构影响最大的一层。

**DeepSeek 定价（元/百万 token，2026-11-17 核对）：**

| | 空闲时段 | 高峰时段 |
|---|---|---|
| 输入（缓存命中） | **0.02** | 0.04 |
| 输入（未命中） | 1.00 | 2.00 |
| 输出 | 4.00 | 8.00 |

**高峰时段 = 北京时间周一至周五 09:00–12:00、14:00–18:00**（不含中国法定节假日）；其余时段 + 周末全天 = 闲时，价格是高峰的一半。

**附加能力按次计费：**

| 项目 | 价格 |
|---|---|
| 搜索（文字、图片） | 5 元/1000 次 |
| 网页抓取 | 5 元/1000 次 |
| 文件解析 / OCR | 1.5 元/1000 页 |
| TTS | 3 元/万字符（限时 5 折 1.5 元） |
| ASR | 0.78 元/小时（限时 5 折 0.39 元） |

---

## 三、⭐ 一个反直觉的成本结论

把三个模型放一起比（都换算成元/百万 token）：

| | 缓存命中输入 | 未命中输入 | **输出** |
|---|---|---|---|
| **DeepSeek V4.1 Flash**（闲时） | **0.02** | 1.00 | **4.00** |
| **DeepSeek V4.1 Flash**（高峰） | 0.04 | 2.00 | 8.00 |
| **Gemini Decision 1** | 0.015 | 0.015 | **0** |
| **GPT-6 Luna**（参考） | — | — | — |

**注意 DeepSeek 和 Gemini 的缓存命中价几乎完全一样（0.02 vs 0.015）。**

但输出差了一个量级：**DeepSeek 4 元，Gemini 0 元**。

**所以结论不是"谁更便宜"，而是"你这个任务需不需要生成"：**

| 任务类型 | 该选谁 |
|---|---|
| **只判不生成**（分类、路由、审核、证据判定） | **Gemini Decision 1** —— 输出 0 元是决定性的 |
| **要写东西**（生成正文、代码、改写） | **DeepSeek 闲时** —— 缓存命中同价，输出按量 |

**这个区分我自己就是活例子。** 我的 OpenClaw 现在三个 provider：

```
minimax-portal   M Plan 订阅 → 窗口内 0 边际成本
azure-openai     gpt-5.6-sol → 按量（已有额度）
omlx-local       本地模型 → 0 元，只花硬件
```

**在这个组合下，接一个 DeepSeek 按量 API 并不是"更便宜"，而是"M Plan 额度用爆后的兜底"。** DeepSeek 官方文档正好有一页专门讲怎么接 Claude Code / OpenClaw这些 Agent 工具——**它自己就把 Agent 接入当成主要场景**。

**顺便一个更实用的观察**：**输出单价 4 元 vs 8 元的差别，靠"把任务挪到深夜"就能抹平。** DeepSeek 闲时是高峰的一半——北京时间 00:00–09:00 和周末全天都算闲时。**非紧急的批量 Agent 任务排到深夜，成本直接减半。**

---

## 四、chat-demo 里值得直接抄的三段

### ① SSE 解码器（`api/sse.ts`）

按 WHATWG 规范手写的增量解码器，处理了 CRLF 跨界、保活注释、`retry` 字段不适用这三件事。**自己写 `fetch` + `ReadableStream` 的话，这段可以直接拿来改。**

### ② 错误分类与文案分离（`api/errors.ts`）

```ts
export const classifyStatus = (status: number | undefined): ApiErrorCondition => {
  if (status === 401) return 'unauthorized'
  if (status === 402) return 'insufficientBalance'
  if (status === 413) return 'tooLarge'
  if (status === 429) return 'rateLimited'
  if ((status ?? 0) >= 500) return 'serverBusy'
  return 'other'
}
```

**402 单独映射成"余额不足"这个细节很到位** —— 通用错误分类里很少有人把 402 挑出来，但它在按量计费的 API 上非常常见。

### ③ 协议类型只抄用得上的部分（`api/types.ts`）

```ts
/**
 * Messages API（Anthropic 兼容格式）协议类型，只取本应用用到的部分。
 * 文档：https://api-docs.deepseek.com/zh-cn/api/create-message
 */
```

**「只取用得上的部分」这个做法值得学。** 全量抄 Anthropic 的类型定义会引入几十个自己永远不会用到的字段，而且每次 SDK 升级都要跟着改。

---

## 五、我的结论

**① chat-demo 是 API 接入的参考实现，不是要装的产品。**

它的 UI 部分（React + rspack）对我们没什么用——我们是 OpenClaw，不用自己写前端。**但 `src/services/api/` 那 39 个文件是真东西。**

**② 选型要按「任务类型」分，不能按「谁便宜」分。**

判断型任务看输出价（Gemini 0 元完胜），生成型任务看整体（DeepSeek 闲时同价）。**用错模型的代价比选错供应商大得多。**

**③ 兼容层有边界，别假设"支持 Anthropic 格式 = 兼容 Anthropic 生态"。**

`cache_control` 被忽略这件事就足以让一批 Claude 生态的缓存优化策略失效。**接之前要读那张支持表，而不是看到"兼容"两个字就放心。**

**④ 时间就是钱。**

DeepSeek 高峰时段是工作日 09:00–12:00 / 14:00–18:00，闲时价格腰斩。**同一个模型，同一个任务，调度时间不同，账单差一倍。**

---

### 相关链接

- 源码：https://github.com/deepseek-ai/chat-demo
- 在线体验：https://deepseek-ai.github.io/chat-demo/
- Anthropic API 指南（含完整兼容表）：https://api-docs.deepseek.com/guides/anthropic_api
- Messages API 参考：https://api-docs.deepseek.com/zh-cn/api/create-message
- 模型与价格：https://api-docs.deepseek.com/zh-cn/quick_start/pricing
- 配套实测：[Gemini Decision 1 决策模型对比](https://www.samvortex.com/research/decision-models-jev-vs-gemini-decision-1-2026-11-13/)
