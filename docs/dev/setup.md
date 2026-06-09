---
title: 环境搭建
description: BIT 开发入门一条龙——包管理器、Git/GitHub、IDE 与 vibe coding 的本地环境搭建
---

# 环境搭建

BIT 的开发以 **AI 生成代码为主**——但前提是你得先有一套环境：能让 AI 在你**真实的仓库**里跑起来、自测、提交，又不会让多人协作出乱子。

本文先带你认识**终端**，再从工具链装起，依次过一遍**包管理器 → Git/GitHub → IDE → vibe coding**，最后**把本站在本地跑起来**。一次配好，之后就能上手任何一个 BIT 项目。

---

## 先认识终端（Terminal）

下面所有的安装、Git、AI agent 命令，都在**终端**里敲。终端就是一个用**文字命令**操作电脑的窗口——没有按钮，但更快、更精确、可复现。第一次用别怕，记住几条基础命令就够上手了。

**打开终端：**

- **Windows**：开始菜单搜 **Terminal** 或 **PowerShell**（推荐用「Windows 终端」）。
- **macOS**：聚焦搜索（`Cmd + 空格`）输入「**终端**」/ Terminal，默认 shell 是 zsh。
- **Linux**：多数发行版按 `Ctrl + Alt + T`，或在应用里找 Terminal。

命令的格式是 **`命令 + 参数`**，比如 `cd docs` 表示「进入 docs 文件夹」。最常用的几条：

| 命令 | 作用 |
|------|------|
| `pwd` | 看「我现在在哪个文件夹」（print working directory） |
| `ls` | 列出当前文件夹里有什么（Windows 也可用 `dir`） |
| `cd 文件夹名` | 进入某个文件夹；`cd ..` 返回上一级；`cd ~` 回到主目录 |
| `mkdir 名字` | 新建一个文件夹 |
| `cat 文件名` | 打印文件内容到屏幕 |
| `clear` | 清屏（`Ctrl + L` 同效） |

::: tip 三招省一半敲键
- **Tab 自动补全**：文件名 / 命令名敲一半按 `Tab`，终端帮你补全，既快又不打错。
- **↑ / ↓ 翻历史**：上下方向键翻出刚敲过的命令，改一改再回车，不用重打。
- **`Ctrl + C` 中断**：命令卡住、跑错了，按 `Ctrl + C` 立刻停下。
:::

> Windows 的 PowerShell 给 `ls` `cat` `pwd` 等都做了别名，常用命令和 macOS / Linux 基本通用；个别差异（如复制文件 Windows 用 `copy`、Unix 用 `cp`）遇到再查即可。

---

## 用包管理器装一切

别再去各家官网一个个下安装包、点「下一步」了。**包管理器**是命令行里的「应用商店」：一行命令装好软件，升级也统一管理，还自动处理依赖和 PATH。

更重要的是，开发常常**同一台机器要跑好几套环境**——这个项目要 Node 20、那个要 Node 22，CS 课的作业又要特定版本的 Python。靠手动装根本管不过来。包管理器配合**版本管理器**，能把多个版本隔离共存、随项目切换、可复现地重建。

**本页后面每一节都会用包管理器装它对应的工具**（Git、编辑器、AI agent……），所以第一步先把包管理器本身准备好。这里先用它装上我们最常用的运行时 **Node.js（含 npm）**——本站和大多数前端项目都靠它跑：

::: code-group

```powershell [Windows · winget]
# winget 是 Win10/11 内置的官方包管理器，开箱即用
winget install -e --id OpenJS.NodeJS.LTS

# 搜索软件
winget search nodejs
```

```bash [macOS · Homebrew]
# 先装 Homebrew 本体（官网命令，一次即可）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 之后一行装软件（GUI 应用加 --cask）
brew install node

# 搜索软件
brew search node
```

```bash [Linux · 系统包管理器 + flatpak]
# 命令行工具用发行版自带的包管理器
sudo apt install nodejs npm        # Debian / Ubuntu
sudo dnf install nodejs            # Fedora
sudo pacman -S nodejs npm          # Arch

# 之后 GUI 应用推荐 flatpak（跨发行版通用，版本也更新）
# flatpak install flathub <应用 id>
```

:::

::: tip 多版本开发：用版本管理器
当不同项目需要**不同的运行时版本**时，别反复重装——用版本管理器按项目切换：

- **Node.js** → [`nvm`](https://github.com/nvm-sh/nvm)（macOS / Linux）或 [`fnm`](https://github.com/Schniz/fnm)（更快，全平台）
- **Python** → [`pyenv`](https://github.com/pyenv/pyenv)

```bash
nvm install 22 && nvm use 22   # 给当前项目切到 Node 22
```

这样每个项目锁定自己需要的版本，互不干扰，换电脑也能照样复现。
:::

::: details 关于 Docker（了解即可，我们用不到）
你可能听过 **Docker**——它用「容器」把整套环境（系统、依赖、配置）打包成一个可复现的镜像，做到彻底隔离。这在复杂的后端 / 微服务部署里很有用。

但 BIT 目前的开发以**静态站点 / 前端**为主，环境简单，包管理器 + 版本管理器已经够用，**暂时不需要 Docker**。知道有这么个东西就行，等真碰到复杂部署再学不迟。
:::

---

## Git & GitHub —— 唯一必须亲自掌握的东西

写代码、做设计、调 bug——这些 AI 大多能替你完成。但有一件事**必须你自己确认是对的：Git 操作。**

Git 管理着所有人的协作和全部历史进度。一条敲错的命令（比如 `git reset --hard` 或 `git push --force`）可能**抹掉别人的提交、覆盖远端、且难以挽回**。AI 可以帮你写命令，但**按下回车前，你得自己看懂它在做什么**。这是这份文档里唯一不能外包给 AI 的技能。

::: tip 系统学一遍 Git
**CS 61B 的 Josh Hug 教授**有一期讲 Git 的视频，从原理到实操讲得很清楚；CS 61B 课程页也有一篇配套的 Git 使用指南，可以对照着看：

> 📺 [Josh Hug · Git 教程（YouTube）](https://www.youtube.com/watch?v=9kolXm8-EYU)
> 📄 [CS 61B · Using Git](https://sp26.datastructur.es/resources/using-git/)
:::

### 安装

::: code-group

```powershell [Windows · winget]
winget install -e --id Git.Git
winget install -e --id GitHub.cli        # gh：GitHub 官方命令行工具
```

```bash [macOS · Homebrew]
brew install git gh
```

```bash [Linux]
sudo apt install git           # Debian / Ubuntu
# gh 见 https://github.com/cli/cli/blob/trunk/docs/install_linux.md
```

:::

### 首次配置

```bash
git config --global user.name  "你的名字"
git config --global user.email "你的邮箱@example.com"   # 用 GitHub 账号绑定的邮箱

gh auth login        # 登录 GitHub（按提示选 HTTPS / 浏览器授权，最省事）
```

### 常用命令速查

| 命令 | 作用 |
|------|------|
| `git status` | 看当前改了哪些文件（**动手前先看这个**） |
| `git add <文件>` / `git add .` | 把改动加入暂存区 |
| `git commit -m "说明"` | 提交一次改动，留一句清楚的说明 |
| `git pull` | 拉取远端最新代码，合并到本地 |
| `git push` | 把本地提交推到 GitHub |
| `git branch` / `git checkout -b feature/xxx` | 查看 / 新建并切到分支 |
| `git log --oneline` | 看提交历史 |
| `git diff` | 看具体改了哪几行 |

::: warning 危险命令：按回车前一定要看清
下面这些命令会**丢掉工作且难以恢复**，没十足把握前别敲，拿不准就先问人或先 `git status` / `git stash` 备份：

- `git reset --hard` —— 丢弃所有未提交改动，**回不来**
- `git push --force` / `--force-with-lease` —— 覆盖远端历史，**可能抹掉别人的提交**
- `git checkout -- <文件>` —— 丢弃该文件的未提交改动
- `git clean -fd` —— 删除所有未跟踪的文件和文件夹

> 黄金法则：**只要你 commit 过，就几乎总能找回来。** 危险的恰恰是那些「还没提交的改动」——一旦被覆盖就真没了。所以多提交、勤 push，把进度随时存进 Git，就是给自己留后路。
:::

::: danger 遇到代码冲突：千万别强推，云端代码优先
当 `git push` 提示和远端有**冲突**时（别人先改了同一处），**千万千万不要 `git push --force`**——强推会把云端代码直接覆盖掉。

云端（`main` / 远端）的代码是**已经过测试、确认能正常工作的版本**，必须优先保住它的完整。正确做法是**以云端为准，把你自己的改动手动合并进去**：

1. `git pull` 拉下远端最新代码，Git 会标出冲突的地方；
2. **逐处手动合并**——一边是云端的正常代码，一边是你的改动，确认两边都对、不破坏已有功能后再保存；
3. 合并好、本地自测通过，再 `git commit` 并正常 `git push`。

**切记切记**：宁可多花几分钟手动合并，也绝不用强推图省事——一次强推可能毁掉别人和云端的全部正常代码。拿不准时，先停下来问人。
:::

> 分支与 Pull Request 的**协作流程**（feature 分支 → PR → 合并 main）见 [计算机项目 · 项目流程](/dev/projects#项目流程)。本页只管把环境和基本功配齐。

---

## IDE / 编辑器

**最好的 IDE，是你最熟悉的那个。** 已经有顺手的工具就继续用，没必要折腾。

如果你从没用过 IDE，**从 [VS Code](https://code.visualstudio.com/) 开始**：免费、跨平台、扩展生态最大，对 **TypeScript**（我们网页开发的主力语言，偶尔掺点 Python 或别的）支持开箱即好。顺带一提，它对你写 **CS 61A 以及 upper-div** 课程作业也一样好用。

::: code-group

```powershell [Windows · winget]
winget install -e --id Microsoft.VisualStudioCode
```

```bash [macOS · Homebrew]
brew install --cask visual-studio-code
```

```bash [Linux · flatpak]
flatpak install flathub com.visualstudio.code
```

:::

装好后，对本项目栈有用的几个扩展：

- **Vue - Official（Volar）** —— Vue 3 / VitePress 单文件组件支持
- **ESLint** —— 实时标出代码问题
- **GitLens** —— 在编辑器里看每行代码的提交来历

::: tip 你是审稿人，不是打字员
我们大部分代码由 AI 生成，编辑器对你来说**主要不是用来逐行敲字，而是用来读懂、审阅、把关那些关键逻辑**。配好语法高亮和报错提示，是为了让你一眼看出 AI 哪里写得不对。
:::

---

## Vibe Coding —— 和 AI 一起开发

现在的 AI 基本能覆盖网站开发的所有环节：写页面、调样式、查文档、debug。开发方式也随之变了——**你描述需求、把关方向，AI 来落地**。

### 第一步：选一个 AI

用前沿模型，别将就。主流选择：

- **Claude**（Anthropic）—— 代码与长上下文表现强，本站就是用它开发的
- **Codex**（OpenAI）
- **Gemini**（Google）

### 第二步：在 terminal 里用 CLI agent

比起网页聊天框或某个花哨的桌面软件，**强烈推荐用终端里的 CLI agent**（如 **Claude Code / Codex CLI / Gemini CLI**）。原因很实在：

- **直接接触你真实的文件、git 和 shell**——它能在你的实际仓库里读写代码、跑 `npm run docs:dev`、自测、甚至帮你 commit，而不是隔着窗口让你复制粘贴；
- **可复现、可脚本化**——上下文和操作都留在工程里，换台机器也能接着干；
- **天然衔接**前面配好的包管理器 + Git 工作流，整条链路打通。

一句话：CLI agent 把 AI 从「聊天对象」变成了真正能动手的「协作开发者」。

安装也很简单——大多 CLI agent 就是个 npm 包，用第一节装好的 Node 一行装好（以 Claude Code 为例）：

```bash
npm install -g @anthropic-ai/claude-code   # 装好后在项目目录里运行 `claude`
```

> Codex CLI、Gemini CLI 等同理（多为 `npm i -g` 或官方安装脚本），装法见各自官网；选你用的那个 AI 对应的 agent 即可。

::: tip 愿意折腾开源模型？
想用开源 / 自选模型，推荐 **[opencode](https://opencode.ai/) + [OpenRouter](https://openrouter.ai/)**：opencode 是开源的终端 AI agent，OpenRouter 用**一个 API key** 就能接入海量模型（包括各种开源模型）。把 key 配进 opencode，就能在终端里自由切换、按量付费，不被单一厂商绑定。
:::

::: warning AI 写得多，但这两件事你来兜底
1. **特殊 / 核心逻辑**——AI 可能写出「看起来对」的代码，关键路径一定要自己读懂、验证。
2. **所有 Git 操作**——见 [Git & GitHub](#git-github-唯一必须亲自掌握的东西) 一节。这是底线。
:::

---

## 把本站跑起来

环境配齐后，照下面几步就能在本地把这个站点跑起来，开始上手开发。前置只需 **Node.js（建议 LTS / 22）** 和 **git**——上面都装过了。

```bash
# 1. 克隆仓库
git clone https://github.com/BCSSA-IT/BIT-website.git
cd BIT-website

# 2. 安装依赖
npm install

# 3. 启动本地预览（改动即时热更新，浏览器开提示的 localhost 地址）
npm run docs:dev

# 4. 提 PR 前自测：完整构建一遍，确认没有死链或报错
npm run docs:build
```

跑起来之后，就可以照 [计算机项目 · 项目流程](/dev/projects#项目流程) 切一个 `feature` 分支、开始你的第一个改动，最后提 Pull Request。

想加入我们一起做这些项目，见 [加入我们](/join)。
