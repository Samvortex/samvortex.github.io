---
title: '让 AI 自己给大模型做后训练 — AIBuildAI 开源递归自进化 PostTrain Agent，登顶 PostTrainBench'
slug: 'aibuildai-posttrain-agent-self-evolving'
date: '2026-10-07'
category: 'notes'
tags: ['AIBuildAI', 'PostTrain Agent', 'RSI', '递归自我改进', 'PostTrainBench', '后训练', 'Agent', '自我进化', 'MCP', '知识系统', '元搜索', '监督微调', 'SFT', 'DPO', 'GRPO', '强化学习', 'Qwen3-4B-Base', 'Qwen3-1.7B-Base', 'SmolLM3-3B-Base', 'gemma-3-4b-pt', 'Claude Opus 5', 'Claude Code', 'H100', 'ICML 2026', '零人类介入', 'AIME 2025', 'HealthBench', 'ArenaHard Writing', 'HumanEval', 'BFCL', 'Fan-in', '元 Agent', '拒绝采样', '权重平均']
summary: |
  AIBuildAI 发布并开源 PostTrain Agent——给基座模型 + 目标能力 + 算力预算，全程无人介入自主完成后训练（数据收集 / 算法设计 / 训练 / 评估 / 迭代）。PostTrainBench 加权综合分 46.6，排名第一，仅次于人类专家基线 51.1——超过 Locus 45.6、Claude Fable 5 + Claude Code 41.8、GPT-5.6 36.2、Kimi K3 32.0。同一 Claude Opus 5 模型下：AIBuildAI 系统 +11.6 分（vs Claude Code 35.0），七项任务六项领先。BFCL +94.3、ArenaHard Writing +12.1、HumanEval +9.2 三大增益——系统增益超过模型升级一代。BFCL（-95.8）唯一超过人类参考（85.0）的一项任务。核心组件：知识系统（MCP 服务 / 34 工作流 / 111 方法 / 215 数据集 / 108 框架文件 / 每条声明带 URL + 日期 + 评测基准文件剔除）+ 元搜索（元 Agent 调研任务后写出由 Agent / Program / Search 三种单元组成的搜索程序，可链式 / 扇出扇入 / 循环 / 分阶段 / 锦标赛，程序可阶段性地基于实测决定下一步）。两案例：HealthBench × Qwen3-4B-Base（基座 13.4 → 48.6）、ArenaHard Writing × SmolLM3-3B-Base（基座 0.4 → 74.6）。
---

## 一句话总结

AIBuildAI 发布并开源 PostTrain Agent——给基座模型 + 目标能力 + 算力预算，全程无人介入自主完成后训练（数据收集 / 算法设计 / 训练 / 评估 / 迭代）。PostTrainBench 加权综合分 46.6，排名第一，仅次于人类专家基线 51.1——超过 Locus 45.6、Claude Fable 5 + Claude Code 41.8、GPT-5.6 36.2、Kimi K3 32.0。同一 Claude Opus 5 模型下：AIBuildAI 系统 +11.6 分（vs Claude Code 35.0），七项任务六项领先。BFCL +94.3、ArenaHard Writing +12.1、HumanEval +9.2 三大增益——系统增益超过模型升级一代。BFCL（-95.8）唯一超过人类参考（85.0）的一项任务。核心组件：知识系统（MCP 服务 / 34 工作流 / 111 方法 / 215 数据集 / 108 框架文件 / 每条声明带 URL + 日期 + 评测基准文件剔除）+ 元搜索（元 Agent 调研任务后写出由 Agent / Program / Search 三种单元组成的搜索程序，可链式 / 扇出扇入 / 循环 / 分阶段 / 锦标赛，程序可阶段性地基于实测决定下一步）。两案例：HealthBench × Qwen3-4B-Base（基座 13.4 → 48.6）、ArenaHard Writing × SmolLM3-3B-Base（基座 0.4 → 74.6）。

---

## 一、问题：后训练能否完全自动化

后训练 = 把基座模型变成能遵循指令、会推理、会用工具、懂某个领域的过程——也是公司把通用模型变成"自己模型"的方式。

决策耦合：

- 数据：用什么 + 怎么配比
- 算法：SFT / 偏好优化 / 强化学习
- 超参：学习率、训练步数、checkpoint

每次实验消耗可观算力。AIBuildAI 的研究问题：能否把这事完全交给 AI——输入基座模型 + 目标能力 + 算力预算，Agent 自己完成后训练流程，输出一个训练好的模型。

---

## 二、PostTrainBench

| 维度 | 数据 |
|---|---|
| 设定 | 单张 H100 / 10 小时 / 自主设计并执行后训练 |
| 评分 | 基准方持有的、Agent 看不到的评测集 |
| 任务覆盖 | 4 个基座模型 × 7 类任务 |
| 基座模型 | Qwen3-4B-Base 等 |
| 任务 | 数学推理（AIME 2025、GSM8K）、写作（ArenaHard Writing）、通用问答（GPQA）、健康咨询（HealthBench）、代码（HumanEval）、函数调用（BFCL） |

Agent 自己决定用哪些数据 + 怎么混合 + 选什么算法 + 哪些超参。

---

## 三、从基线到 RSI 系统的演进

### 线性搜索（基线做法）

把编码 Agent（如 Claude Code）直接指向任务：一个会话、一个 CLI 环境，给基座模型 + 数据 + GPU + 评测器，让它自己规划、写代码、训练、评估。

| 局限 | 详情 |
|---|---|
| 每次尝试修改上一次 | 方案很早就定下 |
| 几个思路无法并行 | 一条走不通的方向耗光预算 |
| 知识仅来自模型参数 | 没外部证据 |

### AIBuildAI 此前的整实验树搜索

一次运行是一棵实验树。每个节点是一次完整实验，由任务评测程序打分，价值 = 树上的最高分。

| 角色 | 职责 |
|---|---|
| 设计员 Agent | 播下若干互异起始方案，每个是一条分支的根 |
| 实验员 Agent | 端到端跑一个实验并提修改建议，成为子实验 |
| 选择器 | 按预期收益 + 证据 + 新颖性 + 成本为等待 GPU 的候选排序 |

### 新系统针对后训练的两限制

| 限制 | 详情 |
|---|---|
| 不懂领域 | 实验员靠内部知识，常错选（无库方法、与评测集重叠数据、跨模型规模超参），每错一次消耗整次训练 |
| 拓扑提前定死 | 树的每个节点必须是打过分的模型；"生成数据"无分做不了节点；fan-in 也表达不出 |

新系统引入两个核心组件：

1. 知识系统：让 Agent 依据证据而非记忆做决策
2. 元搜索：搜索的拓扑本身成为 Agent 的输出

---

## 四、知识系统

通过 MCP 提供服务的远程检索知识库。四子库：

| 子库 | 文件数 | 内容 |
|---|---|---|
| 工作流 | 34 | 一次后训练运行的 13 个有序步骤、每步落定的判断 + 具体案例 + 适用边界 |
| 方法 | 111 | SFT / DPO / GRPO / 蒸馏等的适用条件、目标函数、带数字算例、数据形态、额外模型、库实现 |
| 数据集 | 215 | 许可证、切分、加载代码、样本行；标出哪些是评测基准，必须隔离 |
| 框架 | 108 | 何时选它、如何启动、监控、保存一次训练 |

每份知识文件从公开来源（论文 / 库代码 / Hub 数据集说明 / 公开训练记录）收集：

- 经人工确认范围
- 检查许可和切分
- 从代码中实测事实
- 按统一模板写
- 每条声明带 URL + 日期
- 任何提到评测基准的文件都会被剔除出语料

实验员面临设计决策时，把"任务 + 当前方案 + 哪里出了问题"发给知识库 → 拿回匹配的知识文件 → 据此决定下一步。跑完的实验也会把观察写回，知识随之增长。

### 工作流第一步示例

| 步骤 | 内容 |
|---|---|
| 选任何数据之前 | 读懂"分数到底奖励什么" |
| 评分维度 | 最终答案 / 整段回复 / 格式错误 / 推理过程 |
| 实际操作 | 在未训练基座上完整跑一次官方评测器 |
| 产出 | 基线数字 + 单次评测耗时（用于后续预算分配） |

---

## 五、元搜索

不同任务需要不同形状的搜索：

| 类型 | 适用 |
|---|---|
| 线性搜索 | 方案已定，只需反复打磨同一种流程 |
| 树搜索 | 几种可信思路，靠证据取舍 |
| 后训练常见 | 两者都表达不了（如"构建外部数据集"无分） |

### 后训练典型方案

| 阶段 | 详情 |
|---|---|
| 数据 | 任务自带训练集 + 公开语料构建的外部数据集 |
| SFT | 两份数据各做一次 |
| 选择 | 用验证集选更好模型作为"当前最优" |
| RL | 每一轮从最优出发做 GRPO 训练 → 验证集打分 → 只有提高才替换 |
| 终止 | 预算不够再跑一轮 |

该方案树搜索放不进去：树的节点必须是训练完打过分的模型，但"构建外部数据集"只产出数据，无模型无分，做不了节点。

### 解法：元搜索

| 阶段 | 动作 |
|---|---|
| 派出元 Agent | 调研任务 + 阅读 37 种带可运行示例的搜索模式 + 查询知识库 |
| 写出搜索程序 | 由 Agent / Program / Search 三种基本单元组合 |
| 单元定义 | Agent = LLM 会话；Program = 确定性计算；Search = 编排嵌套子搜索 |
| 可组合结构 | 链式、扇出/扇入、循环、分阶段流程 + 37 种后训练专属策略（checkpoint 锦标赛、SFT 接 GRPO、预算约束多轮训练等）|
| 阶段性 | 元 Agent 只写当前阶段程序 → 执行后读剩余预算 → 下一代元 Agent 根据实测写下一阶段 |

上面案例写成程序不过几行：两路 SFT、取优、预算允许时循环 GRPO。

### AIME 2025 × Qwen3-1.7B-Base 案例

元 Agent 调研：

| 指标 | 数字 |
|---|---|
| 未经训练基座回复给出要求答案行比例 | 20% |
| 23% 题目一直生成到长度上限 | 是瓶颈 |
| 给两个格式示范后答案行比例 | 73% |
| 准确率 | 完全没变化 |

结论：格式不是瓶颈，真正问题是 1.7B 模型能学多长推理链。

### 写出的搜索程序

| 阶段 | 动作 |
|---|---|
| 1 | CPU 并行构建短/中/长三种思维链长度语料 |
| 2 | GPU 上保存并评测基座模型，确立基线 + 单次评测成本 |
| 3 | 每份语料各做一次小预算试训 |
| 4 | 策略 Agent 读基线 + 三次试训 + 语料筛查结果 → 决定主训练用哪份语料 / 是否续训 / 要不要二阶段 |
| 5 | 主训练 |
| 6 | 可选二阶段：续训 / 长度退火 / 拒绝采样微调 / DPO 四选一 |

程序规格：471 行 Python / 8 个文件 / 1 搜索编排器 + 5 Agent 角色 + 2 确定性程序 / 全部由元 Agent 在任何训练开始之前的一次会话中生成。

---

## 六、PostTrainBench 成绩

加权综合分（7 任务加权平均：AIME 22.7% + GPQA 22.5% + HealthBench 18.4% + HumanEval 10.6% + GSM8K 9.4% + ArenaHard Writing 9.0% + BFCL 7.5%）。

| 系统 | 模型 | 综合分 |
|---|---|---|
| **人类专家参考**（不限 10 小时）| 官方指令微调版 | 51.1 |
| **AIBuildAI** | Claude Opus 5 | **46.6** |
| Locus | - | 45.6 |
| Claude Code | Claude Fable 5 | 41.8 |
| GPT-5.6 | - | 36.2 |
| Claude Opus 5（直接用）| - | 35.0 |
| Claude Opus 4.8 | - | 33.8 |
| Kimi K3 | - | 32.0 |
| GLM-5.2 | - | 31.7 |
| Gemini 3.1 Pro | - | 22.0 |
| 未训练基座 | - | 7.5（平均）|

AIBuildAI 10 小时把综合分提高约 39 分。

---

## 七、同一底层模型：+11.6 分来自系统

| 系统 | 模型 | 综合分 |
|---|---|---|
| AIBuildAI | Claude Opus 5 | 46.6 |
| Claude Code | Claude Opus 5 | 35.0 |
| 差 | | +11.6 |

七项任务中 AIBuildAI 六项领先、GPQA 持平。提升最大：

| 任务 | 增量 |
|---|---|
| BFCL | +94.3 |
| ArenaHard Writing | +12.1 |
| HumanEval | +9.2 |

| 系统 | 模型 | 综合分 |
|---|---|---|
| AIBuildAI | Claude Opus 5 | 46.6 |
| Claude Code | Claude Fable 5 | 41.8 |

> 知识系统与元搜索带来的增益，超过把底层模型升级一代所带来的增益。

---

## 八、分任务分析

| 任务 | AIBuildAI 表现 | 备注 |
|---|---|---|
| **AIME 2025** | **15.8 最高**（其后 Fable 5 13.3 / Locus 9.4）| "采样—验证—重训"循环，元搜索用武之地；最难 gemma-3-4b-pt AIBuildAI 3.3 vs 其他 Agent ≤1.1 |
| **BFCL** | **95.8 最高**（后 Locus 66.6）| **唯一超过人类参考（85.0）**的任务 |
| **HumanEval** | **69.0 最高**（Locus 66.6）| 4 个基座模型上 AIBuildAI 都是 Agent 最高分 |
| ArenaHard Writing | 与领先者差 < 2 | 成对偏好评判 = 数据选择问题 |
| GPQA | 持平 | 通用问答 |
| HealthBench | 与领先者差 < 2 | 医生撰写评分标准，需要偏好优化不让评判者奖励冗长 |
| GSM8K | 与领先者差 < 2 | GSM8K |

---

## 九、两个案例：Agent 如何一步步把分数做上去

两次运行都部署开源权重教师模型写训练数据，一次规划一个阶段，依据实测决定下一步。

### HealthBench × Qwen3-4B-Base

| 阶段 | 分数 |
|---|---|
| 基座 | 13.4 |
| Claude Code | 40.9 |
| SFT 1（教师 4.8 万条回复）| 46.2 |
| SFT 2（教师 6,800 段更长多轮对话 + 小子集筛 + 完整评测确认）| **48.6** |

### ArenaHard Writing × SmolLM3-3B-Base

| 阶段 | 分数 |
|---|---|
| 基座 | 0.4 |
| Claude Code | 69.7 |
| SFT 1（教师 ~2 万条语料 + 最后 3 个 checkpoint 权重平均）| 74.2 |
| 拒绝采样 + 权重平均（从学生自己回复挑教师最优）| **74.6** |

> 两次运行绝大部分增益都来自在教师数据上的第一轮完整训练；此后每个阶段的结果，只有在完整评测集上确认有效才会保留。

---

## 十、更长远的判断

| 当前 | PostTrain Agent 自主完成后训练 |
|---|---|
| 未来 | 范式可覆盖：预训练 / 数据生成 / 模型架构设计 / 推理优化 / 评测 / 安全对齐 / 部署 |

最终形态：人类只需定义目标 + 约束 + 价值标准，AI 在给定资源下搜索实现目标的最佳模型和算法。

> 当模型能够参与改进下一代模型，AI 研发将不再完全受限于人类专家的时间、经验和试错速度，而可能演化为一个由机器规模化执行、由实验反馈持续驱动的过程。

---

## 十一、对 Sam 的 3 点启示

1. "系统增益超过模型升级一代"——AIBuildAI 系统 + 11.6 分 vs Claude Code 升级到 Fable 5 也只 + 6.8 分。Sam 设计 Hermes Agent 时，"包装层"（知识 + 元搜索）比"底层模型升级"性价比更高
2. 知识文件剔除评测基准——这是防数据污染的核心。Hermes Sam 的 skill 评测集必须独立于训练数据，否则会"自己训自己"虚高分
3. 元搜索阶段性决策——程序不必在开跑前把整次运行定死，每个阶段基于实测决定下一步。这正是 Sam 之前 OpenClaw `<persistent_tasks>` + `<compact_fallback>` 的设计哲学：不预设长链路，根据会话内反馈实时调整

---

## 来源

- [网易新闻（机器之心 Pro）原文](https://www.163.com/news/a/L8L8T28T0511AQHO.html)
- [GitHub: aibuildai-llm-posttrain-agent](https://github.com/aibuildai-inc/aibuildai-llm-posttrain-agent)
- [GitHub: aibuildai-knowledge-base](https://github.com/aibuildai-inc/aibuildai-knowledge-base)
- [技术报告 PDF](https://github.com/aibuildai-inc/aibuildai-llm-posttrain-agent/blob/main/docs/aibuildai-llm-post-train-agent.pdf)
- PostTrainBench（Rank et al., ICML 2026）
- AIBuildAI 论文（Zhang et al., 2026）

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/aibuildai-posttrain-agent-self-evolving/image-01.jpg" alt="AIBuildAI PostTrain Agent 系统总览" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">图 1：AIBuildAI PostTrain Agent——元 Agent 调研任务后写出由 Agent + Program + Search 三种单元组成的搜索程序（机器之心 Pro · 2026-10-07）</p>
</div>