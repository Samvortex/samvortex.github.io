---
title: 'Apple Silicon 本地模型部署踩坑清单：8 个真实故障与修法'
slug: 'mlx-local-model-deployment-pitfalls-2026-11-08'
date: '2026-11-08'
category: 'notes'
tags: ['MLX', 'oMLX', 'Apple Silicon', 'M4 Pro', '本地部署', 'huggingface_hub', 'launchd', '故障排查', 'DNS', 'ollama', 'SAG2', '踩坑']
summary: '⭐ 一天内在这台 M4 Pro 上踩了 **8 个坑**，全部表现为"进程活着但没在干活"。⭐ 逐条记录**症状 → 根因 → 修法**：⭐ HF 下载卡死（xet 后端）、⭐ **socket.getfqdn 反向 DNS 阻塞**、⭐ oMLX 响应带前导空白让 Rust 客户端直接报错、⭐ oMLX 同一模型注册两次、⭐ ollama 升级后模型路径失配、⭐ `nohup` 起的服务静默死掉。⭐ 附一条通用原则：**"进程存活"不等于"服务可用"。'
author: 'Sam Xu'
featured: false
draft: false
source: '本机实战复盘'
source_url: 'https://github.com/Zleap-AI/SAG-Wiki'
---

## 一句话总结

> ⭐ 今天在这台 **M4 Pro / 32GB** 上装本地模型，一天踩了 ⭐ **8 个坑** —— ⭐ **共性是"进程活着，但没在干活"**。⭐ 这篇把每个的 ⭐ **症状 → 根因 → 修法** 写清楚，⭐ 附一条通用判据：⭐ **"进程存活" ≠ "服务可用"，必须用真实请求验证**。

<img src="/img/notes/mlx-local-model-deployment-pitfalls-2026-11-08/image-01.jpg" alt="笔记本上亮着警告三角，旁边散落数据库、服务器、断裂链条图标，右侧是打勾打叉的检查清单" style="max-width: 100%; border-radius: 8px;" />

---

## 零、先说环境

| | |
|---|---|
| 硬件 | Apple **M4 Pro**（ARM64），**32 GB** 统一内存 |
| 系统 | macOS 27.2 |
| 运行时 | oMLX 0.7.3（OpenAI 兼容，端口 8348） |
| 语言 | Python 3.14.5 / Node 24.22.1 |
| 场景 | 本地跑 9B 级模型 + 一个 Rust 写的检索 CLI（两者要通信） |

**一天的成果**：本地化了一个需要付费 API 的检索方案，跑通端到端，同时踩出下面这些坑。

**先给一条判据**：

> **"进程存活"不等于"服务可用"。**
>
> 下面 8 个坑里有 5 个的表象都是"进程在、CPU 占用正常、日志没报错"，但功能完全不可用。
> 每个都要用**真实请求**验证，不能只看 `ps`。

---

## 一、HF 下载卡死：进程活着，0 KB/s

### 症状

```python
from huggingface_hub import snapshot_download
snapshot_download("some/model")   # 卡住
```

- 进程**存活**，`ps` 看得到
- `du -sh ~/.cache/huggingface/...` 停在某个值不动（比如 1.6 GB）
- **10 秒、15 秒、20 秒采样，缓存增长恒为 0 KB**
- 无任何错误输出

### 根因

`huggingface_hub` 2.4.0 默认启用 **xet** 存储后端。xet 走的是自有的分块传输协议，在某些网络环境下会**静默挂起**——不重试、不超时、不报错。

对照实验：

```bash
# 测单文件下载速度
curl -sL --max-time 20 -o /dev/null -w "%{speed_download} B/s\n" \
  -r 0-50000000 "https://huggingface.co/.../model-00001-of-00002.safetensors"
```

镜像源 216 KB/s，官方源 450 KB/s —— 网络本身没问题。

### 修法

```bash
HF_HUB_DISABLE_XET=1 HF_ENDPOINT=https://huggingface.co python download.py
```

**关掉 xet + 用官方源**，同一个 6.52 GB 模型：**从"两次都卡在 1.6 GB"变成 1 分 07 秒下完**。

### 推广

这个坑不限于 HF。本机 DNS 有问题（见坑三），很多需要走特定解析路径的客户端都可能踩。

**判据**：下载类任务卡住时，**先测单文件 curl 速度**。curl 通但 SDK 不通 → SDK 的传输层有问题（xet / 代理 / 证书），不是网络。

---

## 二、oMLX 响应带前导空白，Rust 客户端直接崩

### 症状

Rust 写的 CLI 调用 oMLX 的 `/v1/systemone`，报：

```
error decoding response body for url (http://127.0.0.1:8348/v1/systemone)
```

但 **oMLX 侧日志显示请求完全成功**：

```
SystemOne: model=OpenJev-9B-MLX-NVFP4, 50 questions, 18488 tokens in 65.180s
```

Python 用同样的 payload 请求同一个端点，`json.loads` 一切正常。

### 根因

oMLX 对**超过 2 秒**的非流式请求会走 keepalive 分支，先发一个空格再吐 JSON。

源码（`omlx/server.py`）：

```python
_JSON_KEEPALIVE_GRACE_S = 2.0        # line 3204

async def _with_json_keepalive(...):
    """Send keepalive spaces while waiting for a coroutine or task.
    ...
    JSON parsers ignore leading whitespace, so the final
    response parses normally."""
    yield " "                        # line 3232
```

**关键在那句注释**：「JSON parsers ignore leading whitespace」。

这句话**在 Python 成立，在 Rust 不成立**：

| 语言 | 前导空白容忍度 |
|---|---|
| Python `json.loads` | ✅ 容忍 |
| Rust `serde_json` | ❌ 不容忍，直接报错 |

所以 oMLX 认为"没问题"，Rust 客户端认为"格式非法"。

实测对比：

```
oMLX 直连   前缀=b' '  长度=1320   ← serde_json 报错
经代理      前缀=b'{'  长度=1319   ← 正常
```

### 修法

写个薄代理剥掉前导空白（60 行）：

```python
out = raw.lstrip()
self.send_response(status)
self.send_header("Content-Type", "application/json")
self.send_header("Content-Length", str(len(out)))
self.end_headers()
self.wfile.write(out)
```

### 推广

> **「JSON 解析器会忽略前导空白」不是协议保证，是 Python 的实现细节。**

跨语言对接时，**服务端如果有任何 keepalive / 分块 / 预热机制，就可能塞进非 JSON 字节**。别假设"JSON 端点返回的一定是纯 JSON"。

**判据**：服务端日志说成功、客户端说解析失败、Python 复现不了 → **先 dump 原始字节看前 20 个**。`repr(raw[:20])` 一眼就能看出。

---

## 三、`socket.getfqdn` 阻塞：进程活着，端口永不 LISTEN

**这条是今天最难查的。**

### 症状

用 Python `http.server` 写了个代理服务，起进程后：

- 进程**存活**，`ps` 正常
- `lsof -iTCP:8766` 显示 socket 存在，但状态是 **CLOSED**，不是 LISTEN
- 连 `curl http://127.0.0.1:8766/healthz` 都超时
- `netstat` 能看到端口
- 手工前台跑（`timeout 5 python3 proxy.py`）**看起来正常**

### 根因

用 faulthandler 抓栈才看清：

```bash
python3 -u -X faulthandler proxy.py &
# 之后 kill -ABRT $PID
```

栈顶：

```
socket.py:817 in getfqdn              ← 阻塞在这
http/server.py:150 in server_bind
socketserver.py:457 in __init__
```

`HTTPServer.server_bind()` 会调 `socket.getfqdn(host)` 来填 `server_name`：

```python
def server_bind(self):
    socketserver.TCPServer.server_bind(self)
    host, port = self.server_address[:2]
    self.server_name = socket.getfqdn(host)      # ← 这里
    self.server_port = port
```

**本机反向 DNS 无响应 → 这个调用永久挂起。**

这跟本机 pip 装包需要配镜像源是**同一个根因**：DNS 有问题。只不过一个表现为"解析失败"，一个表现为"反向查询阻塞"。

单独验证：

```bash
timeout 15 python3 -c "import socket; print(socket.getfqdn('127.0.0.1'))"
# exit=124  ← 超时，确认阻塞
```

### 修法

跳过 getfqdn：

```python
class _NoFQDNServer(http.server.ThreadingHTTPServer):
    def server_bind(self):
        socketserver.TCPServer.server_bind(self)
        host, port = self.server_address[:2]
        self.server_name = host
        self.server_port = port
```

改完立刻正常：`listening on 127.0.0.1:8763` + LISTEN + curl 通。

### 推广

**任何在本机起 HTTP 服务的人都可能踩到。** `http.server`、`socketserver`、甚至某些框架的默认 `server_bind` 都会走这条路。

**判据**：进程在、socket 在、但不是 LISTEN → **用 faulthandler 抓栈**。`kill -ABRT <pid>` 会让 Python 打印完整调用栈，一眼定位。

---

## 四、`nohup` 起的后台服务静默死掉

### 症状

```bash
nohup python3 -u proxy.py > /tmp/proxy.log 2>&1 &
sleep 3
# 进程不在了，日志文件 0 字节，端口没监听
```

换成 `python3 proxy.py &` 同样死。

### 根因

不是脚本问题——同一脚本前台跑完全正常。是**启动方式在这个执行环境里不保活**：父 shell 结束或被回收时，子进程被一起带走。

### 修法

**用 launchd**（macOS 上最稳）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.sam.my-proxy</string>
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/python3</string>
    <string>/path/to/proxy.py</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>/Users/sam/.openclaw/logs/my-proxy.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/sam/.openclaw/logs/my-proxy.log</string>
</dict>
</plist>
```

```bash
plutil -lint ~/Library/LaunchAgents/com.sam.my-proxy.plist   # 先校验
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.sam.my-proxy.plist
launchctl list | grep my-proxy          # 看 PID 和退出码
launchctl kickstart -k gui/$(id -u)/com.sam.my-proxy   # 重启
```

`KeepAlive: true` = 崩了自动拉起；`RunAtLoad: true` = 开机自启。

### 一个附带坑

日志里看到 `exit code -15`（SIGTERM）是正常的——那是 `kickstart -k` 主动杀的。

但如果服务**反复重启**，看 `launchctl list` 第二列：那是**上次退出码**，非 0 且反复出现说明启动就崩。

---

## 五、路径拼接重复前缀：上游带 `/v1`，请求也带 `/v1`

### 症状

代理修好后还是 404：

```json
{"detail":"Not Found"}
```

### 根因

代理配置上游 `http://127.0.0.1:8348/v1`，客户端请求 `/v1/systemone`，直接拼接：

```
http://127.0.0.1:8348/v1 + /v1/systemone = /v1/v1/systemone   ❌
```

### 修法

```python
up = UPSTREAM.rstrip("/")
path = self.path
if up.endswith("/v1") and path.startswith("/v1/"):
    path = path[3:]          # 去掉重复的 /v1
req = urllib.request.Request(f"{up}{path}", ...)
```

### 为什么值得单独记

**这个 bug 只在特定配置组合下出现。** 我手工测试时上游写的是不带 `/v1` 的地址（`http://127.0.0.1:8348`），一切正常；换成 launchd 传参时带了 `/v1`，才炸。

**判据**：代理 404 且上游服务日志显示"没收到请求" → **打印最终拼出来的 URL**。八成是路径前缀问题。

---

## 六、oMLX 同一个模型注册两次

### 症状

加了个新模型，`/admin/api/models` 返回两条：

```
OpenJev-9B-MLX-NVFP4              engine=decision  type=qwen3_5
mlx-community--JEV-9B-MLX-NVFP4  engine=batched   type=jev_text
```

### 根因

oMLX 同时扫两个来源：

1. `settings.json` 里的 `model.model_dirs`（我的是 `/Volumes/Storage/MLXModels`）
2. **HF cache**（`~/.cache/huggingface/hub/`）

同一个模型两边都有一份 → 注册两次。而且**两份行为不同**（一份走 decision engine，一份走普通 batched），因为其中一份的 `config.json` 没改过。

### 修法

删掉 HF cache 里的副本，然后：

```bash
curl -X POST http://127.0.0.1:8348/admin/api/reload \
  -H "Authorization: Bearer <api_key>"
```

### 顺带：加模型不用重启 server

```bash
# 列出模型
curl http://127.0.0.1:8348/admin/api/models -H "Authorization: Bearer <key>"

# 重新扫描目录（新增模型后）
curl -X POST http://127.0.0.1:8348/admin/api/reload -H "Authorization: Bearer <key>"
```

**admin API 要点**：
- 前缀是 `/admin`，不是根路径
- **必须带** `Authorization: Bearer <api_key>`（key 在 `~/.omlx/settings.json` 的 `auth.api_key`），否则 401
- `/v1/models` 是公开的，admin 接口不是

### 附带坑：model_type 不匹配

社区转换的模型 `config.json` 里 `model_type` 可能不是 oMLX 认识的：

```
before model_type: jev_text     ← oMLX 不认，当普通 llm
after  model_type: qwen3_5      ← 识别为 decision engine
```

改之前**备份**成 `config.json.orig`。

---

## 七、ollama 升级后，模型"消失"了

### 症状

明明磁盘上还有模型文件（`~/.ollama/models/` 有 100GB），但：

```bash
$ ollama list
models: []

$ curl http://127.0.0.1:11434/api/show -d '{"model":"laya"}'
{"error":"open .../manifests-v2/ollama.com/library/laya/..."}
```

### 根因

ollama 0.40.13 换了 manifest 布局：

```
旧版: ~/.ollama/models/manifests/registry.ollama.ai/library/<name>
新版: ~/.ollama/models/manifests-v2/ollama.com/library/<name>
```

模型是 10-16 注册的（在旧路径），新版只认新路径。

顺带发现：`/Applications/Ollama.app` 已被移进废纸篓又清空，`/usr/local/bin/ollama` 成了**断链**。当前跑着的还是 10-30 启动的老进程——**一重启就起不来了**。

### 修法

```bash
# 重新注册到新布局（GGUF 在本地，不用下载）
ollama create laya -f ~/.openclaw/state/laya/Modelfile
```

### 推广

**大版本升级会改内部布局。** 本地装的模型、写的配置、注册的 service，可能全部需要迁移。

**判据**：CLI 报"找不到"但文件在 → **看它报的路径**，跟你文件实际所在的路径对一下就知道是不是布局变了。

---

## 八、`noul` 语义不同：用错问法，数据全废

这条不是环境坑，是**方法论坑**，但代价一样大。

### 症状

测一个 0.8B 的决策模型，四个对照组（直接命中 / 间接 / 同主题无答案 / 完全无关），跑出来：

```
直接命中           0.9747
间接(有线索无答案)  0.9757   ← 应该更低
同主题无答案(HBM4)  0.9714   ← 应该更低
完全无关(珊瑚礁)    0.9613   ← 应该更低
```

**全部 0.96+，完全没判别力。**

### 根因

这个模型叫 Jev-Style，是独立项目（不是 TypeSafe 的 JEV）。它的 `noul` 问的是：

> **「这个陈述为真吗？」**

而我按 SAG2 的用法，问的是：

> **「这段是不是必要证据？」**

前者是**陈述验证**，后者是**证据判定**。把陈述验证的模型用在证据判定上，输出自然没意义。

### 修法：换成陈述式问法

```
Q: "The passage states that the underfill supplier is Namics AG."

直接命中  0.9748   ← 对
HBM4(无关) 0.0487   ← 对
```

判别力立刻出现。

### 对照数据（换成正确问法后）

| 候选 | Jev-Style 0.8B | OpenJev 9B |
|---|---|---|
| 直接命中 | 0.9748 | 0.9653 |
| 无关 | 0.0487 | 0.0065 |
| **有线索无答案** | **0.5522** | **0.1313** |

两端判别力相当，但**中间地带 0.8B 判不出来**（卡在 0.5 附近）。

### 推广

> **测任何模型前，先读它的 model card，确认它回答的到底是什么问题。**

"同名"不等于"同语义"。`noul` / `choice` / `score` 这套词在不同项目里可能指不同的事。

**判据**：一个分类器对所有输入都给高分 → **不是你模型不行，是你的问法它没听懂**。先怀疑 prompt 形态，再怀疑模型能力。

---

## 九、汇总清单

| # | 症状 | 根因 | 修法 |
|---|---|---|---|
| 1 | HF 下载卡死，0 KB/s | xet 后端静默挂起 | `HF_HUB_DISABLE_XET=1` + 官方源 |
| 2 | Rust 客户端报 decode 失败 | oMLX keepalive 前导空格 | 代理剥 `lstrip()` |
| 3 | 进程在，端口不 LISTEN | `socket.getfqdn` 反向 DNS 阻塞 | 覆写 `server_bind` |
| 4 | 后台服务静默死 | `nohup`/`&` 不保活 | launchd + `KeepAlive` |
| 5 | 代理 404 | 上游与请求路径前缀重复 | 拼接前去重 `/v1` |
| 6 | 同一模型注册两次 | oMLX 同时扫 model_dirs 和 HF cache | 删 cache 副本 + `/admin/api/reload` |
| 7 | ollama 模型"消失" | 大版本改了 manifest 布局 | `ollama create` 重新注册 |
| 8 | 决策模型无判别力 | 模型语义与问法不匹配 | 读 model card 确认语义 |

---

## 十、四条通用判据

**① 「进程存活」≠「服务可用」**

今天 8 个坑里 5 个表象都是"进程在、CPU 正常、日志无报错"。每个都要用**真实请求**验证：curl 一下、查一下 `engine_type`、dump 一下原始字节。

**② 服务端说成功、客户端说失败 → dump 原始字节**

`repr(raw[:20])`，一秒钟破案（坑二）。

**③ 进程活着但端口不 LISTEN → faulthandler 抓栈**

```bash
python3 -u -X faulthandler script.py &
kill -ABRT $!
```

栈顶就是答案（坑三）。

**④ 下载/请求卡住 → 先用 curl 单文件测速**

curl 通而 SDK 不通 → SDK 传输层的问题，不是网络（坑一）。

---

## 十一、这些坑为什么值得记

它们**不是某个框架的 bug**，而是**三类通用故障**：

1. **环境层面** —— 本机 DNS 反向解析无响应（坑三、坑七同源）、大版本改内部布局（坑七）
2. **协议层面** —— 「JSON 解析器容忍前导空白」不是协议保证（坑二）；路径前缀拼接规则要显式处理（坑五）
3. **验证层面** —— 进程存活不等于功能可用；分类器输出没判别力可能是问法错了（坑一、坑八）

**第一类换个机器就消失，第二三类在任何机器都成立。**

---

### 相关

- 配套实测：[SAG2 全本地化实测](https://www.samvortex.com/research/sag2-local-knowledge-base-2026-11-08/)（这套坑就是那次部署踩出来的）
- 配套实测：[DeepSeek-V4-Pro-Qwen3.5-9B 实测](https://www.samvortex.com/research/deepseek-v4-pro-qwen35-9b-2026-11-08/)
- oMLX admin API：`POST /admin/api/reload`、`GET /admin/api/models`、`PUT /admin/api/models/{id}/settings`
