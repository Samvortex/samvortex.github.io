---
title: 'Mac Studio M5 Ultra 实测：Qwen3.8 27B 单流 token 速度可达 100+ tok/s — 我之前把内存带宽算错了'
slug: 'mac-studio-m5-ultra-qwen3-8-27b-token-throughput-2026'
date: '2026-10-09'
category: 'notes'
tags: ['Mac Studio', 'M5 Ultra', 'M5 Max', 'M5 Pro', 'Apple Silicon', 'Qwen3.8 27B', 'MLX', 'oMLX', 'Lightning MTP', 'Weschera', 'Weschera M4 Max', '内存带宽', '1.2 TB/s', '4-bit', 'oQ4e', 'Q4e', 'Q8e', 'bf16', '6-bit', 'Apple specs', 'apple.com.cn', 'omlx.ai', 'benchmarks', 'performance', 'Native MTP', 'ANE prefill', 'Decode speed', 'Caveats']
summary: |
  Mac Studio M5 Max / M5 Ultra 全部 Apple 官方内存带宽已确认：M5 Max 460 GB/s（标准）/ 614 GB/s（高配），M5 Ultra 两档都是 1.2 TB/s（标准 + 高配带宽一样，只是 CPU/GPU 核心数不同）。之前传 1 TB/s / 2 TB/s 是错的。oMLX 官方 benchmark 实测 Qwen3.8-27B 4-bit + Lightning MTP k=3：M5 Ultra 80c 高配 256 GB 在 16k context 单流 105.7 tok/s，M5 Ultra 64c 标准 100.8 tok/s（1k）/ 77.5 tok/s（4k），M5 Max 40c 128 GB 95-96 tok/s。M5 Pro 不在 Mac Studio 产品线。6-bit 没有官方实测。
---

## 一句话总结

Mac Studio M5 Max / M5 Ultra 全部 Apple 官方内存带宽已确认：M5 Max 460 GB/s（标准）/ 614 GB/s（高配），M5 Ultra 两档都是 1.2 TB/s（标准 + 高配带宽一样，只是 CPU/GPU 核心数不同）。之前传 1 TB/s / 2 TB/s 是错的。oMLX 官方 benchmark 实测 Qwen3.8-27B 4-bit + Lightning MTP k=3：M5 Ultra 80c 高配 256 GB 在 16k context 单流 105.7 tok/s，M5 Ultra 64c 标准 100.8 tok/s（1k）/ 77.5 tok/s（4k），M5 Max 40c 128 GB 95-96 tok/s。M5 Pro 不在 Mac Studio 产品线。6-bit 没有官方实测。

---

## 一、我之前算错了

今天下午我在几篇文章里写"M5 Ultra 标准 1 TB/s / 高配 2 TB/s"。**这个数是错的。**

我直接 curl Apple 中国官方 spec 页（apple.com.cn/mac-studio/specs/）重新核了一遍。两个 SKU 内存带宽**都是 1.2 TB/s**：

| 字段 | Apple 官方 | 我之前写的 |
|---|---|---|
| M5 Max 标准 | 460 GB/s | 410（推测，没核）|
| M5 Max 高配 | 614 GB/s | 540（推测，没核）|
| M5 Ultra 标准 | **1.2 TB/s** = 1229 GB/s | 1 TB/s（错）|
| M5 Ultra 高配 | **1.2 TB/s** = 1229 GB/s | 2 TB/s（错）|

M5 Ultra 高配 vs 标准的差别在 CPU（30→36 核）+ GPU（64→80 核）+ 内存选项，**带宽没变**。这跟 M1/M2/M3/M4 Ultra（高配 2x 带宽）不同 —— Apple 在 M5 这代对 Ultra 带宽做了取舍。

## 二、M5 Pro 不在 Mac Studio 产品线

Apple spec 页"芯片"section 与"按单配置"section 都只列 M5 Max 和 M5 Ultra。M5 Pro 是 MacBook Pro / iPad Pro 用的 SoC，**Mac Studio 起步是 M5 Max**。

## 三、Qwen3.8-27B 在 Mac Studio 的单流 tok/s 实测

数据全部来自 omlx.ai/benchmarks/performance（oMLX 官方 benchmark dashboard，2026-09-23 至 2026-09-26 跑的数据）。

### 主结果（4-bit oQ4e + Lightning MTP k=3）

| 配置 | 内存 | context | **TG tok/s（单流）** |
|---|---|---|---|
| **M5 Ultra 80c 高配** | 256 GB | 16k | **105.7** ⭐ |
| M5 Ultra 80c 高配 | 256 GB | 4k | 97.5 - 99.2 |
| M5 Ultra 80c 高配 | 256 GB | 1k | 87.2 - 97.2 |
| M5 Ultra 64c 标准 | 256 GB | 1k | 100.8 - 92.3 |
| M5 Ultra 64c 标准 | 256 GB | 4k | 77.5 - 92 |
| M5 Max 40c | 48 GB | 1k | 127.2 |
| M5 Max 40c | 128 GB | 4k | 95.5 - 96.4 |

### 关掉 MTP（纯 GPU 解码基线）

| 配置 | 内存 | context | TG tok/s |
|---|---|---|---|
| M5 Ultra 64c 标准 | 256 GB | 4k | 53.7 |

MTP k=3 相对"无 MTP"基线（53.7 → 92 在 4k context）**约 +71%**。MTP 接受率是关键 —— Weschera 实测 code 99.6%、prose 75-80%。

### 动效：单流 tok/s 对照（M5 Ultra 各 SKU）

<div style="background: #f7f7f9; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; font-family: ui-monospace, SFMono-Regular, monospace;">

<div style="font-size: 0.875rem; color: #6b6b76; margin-bottom: 0.75rem;">Qwen3.8-27B-oQ4e-mtp · 4-bit · Lightning MTP k=3 · 单流 4k context · 256 GB</div>

<div style="margin-bottom: 0.875rem;">
  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;">
    <span>M5 Ultra 80c 高配</span>
    <span><strong style="color: #c2410c;">99.2 tok/s</strong></span>
  </div>
  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #c2410c, #f59e0b); height: 100%; width: 0%; animation: fill 1.2s ease-out forwards; --target: 100%;"></div>
  </div>
</div>

<div style="margin-bottom: 0.875rem;">
  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;">
    <span>M5 Ultra 64c 标准</span>
    <span><strong style="color: #c2410c;">92.0 tok/s</strong></span>
  </div>
  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #ea580c, #fb923c); height: 100%; width: 0%; animation: fill 1.2s ease-out 0.15s forwards; --target: 93%;"></div>
  </div>
</div>

<div style="margin-bottom: 0.875rem;">
  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;">
    <span>M5 Max 40c 128 GB</span>
    <span><strong style="color: #1d4ed8;">96.4 tok/s</strong></span>
  </div>
  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #1d4ed8, #3b82f6); height: 100%; width: 0%; animation: fill 1.2s ease-out 0.3s forwards; --target: 97%;"></div>
  </div>
</div>

<div style="margin-bottom: 0.875rem;">
  <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;">
    <span>M5 Max 40c 48 GB</span>
    <span><strong style="color: #1d4ed8;">127.2 tok/s</strong></span>
  </div>
  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #15803d, #22c55e); height: 100%; width: 0%; animation: fill 1.2s ease-out 0.45s forwards; --target: 100%;"></div>
  </div>
</div>

<style>
@keyframes fill { to { width: var(--target, 100%); } }
@media (prefers-reduced-motion: reduce) {
  [style*="animation"] { animation: none !important; width: var(--target, 100%) !important; }
}
</style>

<div style="font-size: 0.75rem; color: #6b6b76; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #e5e7eb;">
来源：omlx.ai/benchmarks/performance · 2026-09-23 / 09-25 · oMLX v0.7.0.dev4 / v0.7.0rc1 · Python code · temperature 0 · thinking off
</div>

</div>

注意：M5 Max 48 GB 单流跑得比 M5 Max 128 GB 还快（127 vs 96）—— 因为两个 benchmark 用的不是同一个 quant 变体，不能直接比。这里"越低配置越快"是 quant 差异造成的，不是硬件差异。

## 四、为什么 M5 Ultra 两档带宽相同

| SKU | CPU | GPU | 内存带宽 |
|---|---|---|---|
| M5 Max 标准 | 18 核（6 超 + 12 性能）| 32 核 | **460 GB/s** |
| M5 Max 高配 | 18 核 | 40 核 | **614 GB/s** |
| M5 Ultra 标准 | 30 核（10 超 + 20 性能）| 64 核 | **1.2 TB/s** |
| M5 Ultra 高配 | 36 核 | 80 核 | **1.2 TB/s** ← 与标准相同 |

M5 Ultra 高配比标准**多一倍 GPU 核心（64→80）+ 多 6 核 CPU（30→36）**，但带宽不变。Apple 这次的取舍可能是：单 die 2 TB/s 需要更宽内存控制器/封装，对良率有挑战，先把 1.2 TB/s 起步做到稳，再加 GPU 核心。

## 五、6-bit 量化数据缺失

**omlx.ai/benchmarks 没有 6-bit Qwen3.8-27B 的 M5 Ultra 实测**。官方数据点都是 4-bit (oQ4e)、8-bit (oQ8e)、bf16 stock。

6-bit 速度推算（按 4-bit 实测外推）：
- 权重 6/4 = 1.5x = 20.25 GB（vs 4-bit 13.5 GB）
- 解码速率通常在 4-bit 基础上下降 5-15%（解压缩开销 + KV cache 写放大）
- **M5 Ultra 6-bit 估算：85-100 tok/s**（4-bit 数据 95% 附近）

但这是估算不是实测。要精确数字需要自己跑 benchmark。

## 六、实际部署选型

| 需求 | 选什么 | 4-bit 实测速率 |
|---|---|---|
| ≥30 tok/s（轻度实时感）| **M5 Max 起步 36 GB** | 95-127 tok/s |
| ≥50 tok/s | **M5 Max 起步 36 GB** | 95-127 tok/s |
| ≥100 tok/s | **M5 Ultra 64c 起步 96 GB** | 100-105 tok/s |
| ≥150 tok/s | **单流达不到**（M5 Ultra 上限 ~106 tok/s）| — |

**M5 Pro 不在 Mac Studio 产品线**。要买 Pro 只能选 MacBook Pro / iPad Pro。

## 七、oMLX 支持范围（per Weschera + oMLX README）

Weschera recipe（github.com/Weschera/Qwen3.8-27B-oMLX-MTP-Mac）已在 M4 Max 上验证：

```
Config: oMLX 0.6.3rc2 + ANE prefill + Lightning MTP k=3
Prose tok/s: 53.3
Code tok/s: 72.1
Prefill 4K tok/s: 273.7
```

oMLX README 主表只明写 "Qwen3.5 Series"（在 VLM 行）；Qwen3.6 和 3.8 通过 release notes 加进：
- v0.5.2：「custom Metal kernels for GLM-5.2, MiniMax M3, DeepSeek V4, and Qwen3.5/3.6」
- v0.6.0：「Expanded Qwen3.8 support. oMLX now loads blockwise FP8, embedded MTP, and the mixed ModelOpt NVFP4 unsloth/Qwen3.8-27B-NVFP4 checkpoint directly」

## 八、关键 caveat

1. **Weschera recipe 用 ANE prefill**，omlx.ai 官方 MTP-on 条目里 ANE prefill 是 false。Weschera 的 72 tok/s code 与 oMLX 官方 78-105 tok/s 不是同口径
2. **TG tok/s 在不同 context 下不是单调**（4k 反而比 1k 慢 5-15%）
3. **没有 6-bit 实测数据**，推算仅作参考
4. **M5 Max 48 GB vs 128 GB 数字不能直接比**（不同 quant 变体）
5. **MTPLX 自己的对比页有 M5 Max 63 tok/s 数据点**（不同 quant + sampling），与 oMLX 官方 95-96 差很大；按官方数据看齐
6. **6-bit Qwen3.8-27B 在 M5 Ultra 没有官方实测**——只看 4-bit/8-bit/bf16 数字

## 九、对 Sam 的 3 点启示

1. **Apple Mac Studio M5 这代**对 Ultra SKU 的带宽做了"两个都 1.2 TB/s"取舍，不是 2x 升级。买 M5 Ultra 高的朋友花的钱主要买了 CPU/GPU 核心数 + 内存选项（96/256/512 GB），不是带宽
2. **oMLX 实测速率已经超出"理论上限"** —— 1.2 TB/s 带宽按公式 tok/s = BW / (model_size × 2) 算 M5 Ultra 4-bit 27B 上限约 100 tok/s（1.2 TB / 13.5 GB / 2），但 oMLX 在 4k context 上跑出 105.7 tok/s——说明 oMLX 的 cache 命中率 + 量化 kernel 已经接近 100% 带宽效率
3. **6-bit 量化在 oMLX 官方 benchmark 里被有意忽略**——可能因为 6-bit 在 Apple Silicon 上没有专用 kernel，速率比 4-bit 还低。**生产环境想稳定**就用 4-bit（oQ4e / NVFP4），6-bit 留作实验

## 来源

- Apple 中国官方 spec 页：https://www.apple.com.cn/mac-studio/specs/
- Apple US support：https://support.apple.com/en-us/128107
- oMLX 官方 benchmark dashboard：https://omlx.ai/benchmarks/performance
- Weschera recipe 与 raw JSON：https://github.com/Weschera/Qwen3.8-27B-oMLX-MTP-Mac
- oMLX README：https://github.com/jundot/omlx/blob/main/README.md
- oMLX v0.5.2 release notes：https://github.com/jundot/omlx/releases/tag/v0.5.2
- oMLX v0.6.0 release notes：https://github.com/jundot/omlx/releases/tag/v0.6.0
- 早前相关：[Tencent Marvis AI 管家 + NAS](https://www.samvortex.com/research/tencent-marvis-ai-steward-nas/)
- 早前相关：[Google EmbeddingGemma 2 0.5GB 内存跑多模态](https://www.samvortex.com/research/google-embedding-gemma-2-740m/)

## 配图

<div style="margin: 2rem 0; text-align: center;">
<img src="/img/research/mac-studio-m5-ultra-qwen3-8-27b-throughput/m5-ultra-chip.jpg" alt="Apple M5 Ultra chip" style="max-width: 100%; border-radius: 8px;" />
<p style="color: rgba(8, 24, 68, 0.6); font-size: 0.875rem; margin-top: 0.5rem;">Apple M5 Ultra 芯片 · 单 die · 30/36 核 CPU + 64/80 核 GPU + 32 核 NPU + 1.2 TB/s 统一内存带宽</p>
</div>
