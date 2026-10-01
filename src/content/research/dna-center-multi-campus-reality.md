---
title: "多校区统一网络管理：DNA Center 的现实与边界"
slug: "dna-center-multi-campus-reality"
date: 2026-09-24
category: research
tags: ["Cisco DNA Center", "Catalyst Center", "多校区", "SD-Access", "研究"]
summary: "在 6 校区教育集团场景下对 Cisco DNA Center / Catalyst Center 的深度研究：能力边界、Fabric 部署陷阱、与 ISE 的耦合关系，以及为什么我们最终选择混合模式。"
author: "Sam Xu"
draft: false
---

## 摘要

DNA Center（现已改名 **Catalyst Center**）是 Cisco 对园区网做"软件定义"的旗舰产品。本文回答三个问题：

1. **它到底能做什么？** 答案远比官方话术克制。
2. **在多校区场景怎么落地？** 答案和单校区完全不同。
3. **什么时候该用、什么时候不该用？** 决策矩阵。

---

## 1. DNA Center 的真正能力边界

官方把 DNA Center 包装成"AI 驱动的园区网大脑"，但**剥离营销后的核心只有**：

| 模块 | 实际能力 | 边界 |
|---|---|---|
| **Inventory** | 自动发现、拓扑可视化 | 准确率 ~95%，HCL 未覆盖设备会漏 |
| **Image Management** | 交换机 / WLC 统一升级 | 升级窗口期长；**不支持分批灰度** |
| **SD-Access** | LISP + VXLAN 的 Fabric | **每个校区需要独立 Fabric**（多校区 ≠ 大 Fabric） |
| **Assurance** | 客户端体验、KPI、路径追踪 | 数据保留 30 天，**长期分析要导到第三方** |
| **AI/ML** | Anomaly Detection、RCA | 误报率高，**只能做辅助** |
| **Workflows** | 自动化任务 | 用 Python SDK 自己写 |

> 现实：**DNA Center 是管理平面 + 部分控制平面，不是 full-stack SDN**。Fabric（SD-Access）才是它最像 SDN 的部分，但有规模上限。

## 2. SD-Access 的多校区真相

这是大多数文章**不会告诉你的**：

### 2.1 单 Fabric 上限

| 资源 | 上限 |
|---|---|
| 单一 Fabric 站点 | 建议 ≤ 200 节点（交换机 + WLC） |
| 单校园 Edge 节点 | 建议 ≤ 50 个 Fabric Edge |
| Border / Control Node | 每校区独立 |

**结论：**WCC 6 校区如果都在成都 = 1 个 Fabric；6 校区跨城市 = **6 个独立 Fabric + 公网 Backbone**（没有 Fabric 跨城特性）。

### 2.2 Fabric 跨校区互通

DNA Center **不提供**多 Fabric 互联方案。你只能：

1. 用传统 VRF / VRF-Lite + IPsec / MPLS 互联
2. 用 **SD-WAN**（Cisco SD-WAN / Viptela）做 Overlay
3. 用第三方 SASE（Cloudflare / Zscaler）

> **如果指望 DNA Center "一键搞定多校区"——这是误区**。

## 3. 与 ISE 的耦合：不可分割

DNA Center 和 ISE 几乎是**双胞胎**：

| 场景 | 必须 ISE？ |
|---|---|
| SD-Access 内的策略 | ✅ 强依赖（DNA Center 调用 pxGrid） |
| 终端 802.1X 准入 | ✅ |
| 设备画像 + TrustSec | ✅ |
| 仅做监控 + 升级 | ❌ |

这意味着：**上 DNA Center = 上 ISE**。两家产品是**捆绑销售**，总成本要合并计算。

## 4. 多校区部署的推荐架构

WCC 的最终架构（实际部署版本，简化）：

```
┌─────────── 集团总部 (Shanghai-HQ) ───────────┐
│ DNA Center + ISE PAN+PSN (双集群)            │
│ Cisco 9500 核心 + 9800 WLC                   │
│ SD-Access Fabric (HQ-Only)                   │
└──────────────────────────────────────────────┘
                │
        SD-WAN / IPsec VPN
                │
┌── 校区 A ──┐ ┌── 校区 B ──┐ ┌── 校区 C ──┐
│ 本地       │ │ 本地        │ │ 本地        │
│ Catalyst   │ │ Catalyst    │ │ Catalyst    │
│ 9200 +    │ │ 9300 +     │ │ 9500 +     │
│ 9800      │ │ 9800       │ │ 9800       │
│ ISE PSN   │ │ ISE PSN   │ │ ISE PSN   │
│ 传统 3 层 │ │ 传统 3 层 │ │ 传统 3 层 │
└───────────┘ └───────────┘ └───────────┘
```

**关键决策：**

| 层 | 选择 | 理由 |
|---|---|---|
| 总部 | SD-Access Fabric（DNA Center + ISE + Cat 9500 + 9800） | 总部有完整 IT 团队，能运维 Fabric |
| 校区 | **传统 3 层 + 本地 ISE PSN** | 校区 IT 资源不够，Fabric 运维过重 |
| 互联 | SD-WAN Overlay | 多 Fabric 互联的唯一规模化方案 |

## 5. 成本对比

| 项 | DNA Center + ISE 全栈 | 传统 3 层 + ISE（无 DNA） |
|---|---|---|
| 软件 License（6 校区 / 3000 终端） | ~¥2.4M/年 | ~¥1.2M/年 |
| 硬件 | + DNA Center Appliance (~¥400K) | 0 |
| 运维人力 | + 1 FTE | 0.5 FTE |
| **TCO 5 年** | **~¥15M** | **~¥8M** |

**结论：DNA Center 不是"必需"，但能让总部网络从 60 分做到 90 分**。

## 6. 决策矩阵

| 你的情况 | 推荐 |
|---|---|
| 1 个校区 + 1000+ 终端 + Cisco 全栈 + 强 SD-Access 需求 | DNA Center ✅ |
| 多校区 + 单校区 < 500 终端 | 传统 3 层 + ISE ✅ |
| 非 Cisco 主干 | 别考虑 DNA Center |
| 已有 SD-WAN + 第三方 SASE | DNA Center 可作为管理平面，不上 Fabric |

## 7. 我们踩过的坑

1. **升级窗口**：从 2.3.5 升到 2.3.7 用了 8 小时，其中 4 小时是策略预检查失败回滚
2. **SDA Bond 限制**：每个 Fabric Edge 端口上限 24 个，超出会静默丢弃
3. **pxGrid 心跳**：ISE / DNA Center 跨广域网时 pxGrid 心跳要调小，否则掉线
4. **Telemetry 数据量**：1 个 9800 + 50 个 9200 的 Telemetry 流可以打满 1Gbps 内部链路

---

## 下一步

- [ ] 把对比文章做完（DNA Center vs Aruba Central）
- [ ] PoC：校园级 9800 + 9200 + DNA Center 2.3.7 的 SDA Fabric 完整跑通
- [ ] 撰写「Cisco ISE 3.3 Policy Set 在多校区的最佳实践」

> **TL;DR**：DNA Center 是好工具，但**不是银弹**。多校区场景下老老实实做"总部 Fabric + 校区传统"是当前最稳的混合模式。