# 2026-10-12 Sports Launchd CWD Fix

## 问题
launchd 跑 `sports-daily-publish.sh`（每天 7:30 Asia/Shanghai）时，
shell-init 阶段报：

`getcwd: cannot access parent directories: Operation not permitted`

导致整个 git_push 阶段 rc=128 失败：
`fatal: Unable to read current working directory`

虽然 plist 里有 `<key>WorkingDirectory</key>`，launchd 启动 shell session 时 CWD 仍没正确传递。

## 修复
在 `~/.openclaw/crontab/sports-daily-publish.sh` 开头显式 `cd`：

```bash
SCRIPT="/Users/sam/.openclaw/workspace/scripts/sports-publisher.py"
REPO="/Users/sam/Documents/Projects/samvortex.github.io"

# launchd shell-init 拿不到 CWD，显式 cd
cd "$REPO" 2>/dev/null || { echo "❌ cd $REPO failed"; exit 1; }
```

## 验证
- 模拟 launchd 环境（`cd /tmp` + `unset PWD`）手动跑 → exit 0
- 修复后的 commit + push 正常

## 备份
修改前 `sports-daily-publish.sh` 备份在 `/tmp/saved-sports-publish.sh`
