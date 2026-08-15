<p align="center">
  <img src="assets/banner.svg" alt="DSH Plugins — DeepSeek Harness 插件精选" width="100%">
</p>

<h1 align="center">DSH Plugins</h1>

<p align="center">
  不堆链接，只回答三个问题：<strong>它能做什么、适合谁、怎样用得更顺手。</strong>
</p>

<p align="center">
  <a href="https://github.com/deepseek-ai/deepseek-harness"><img alt="DeepSeek Harness" src="https://img.shields.io/badge/DeepSeek_Harness-developer_preview-0b1220?style=flat-square"></a>
  <img alt="Curated projects" src="https://img.shields.io/badge/curated-16_projects-22c55e?style=flat-square">
  <img alt="Last verified" src="https://img.shields.io/badge/verified-2026--08--15-38bdf8?style=flat-square">
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square"></a>
</p>

> [!IMPORTANT]
> DeepSeek Harness 目前仍是 **Developer Preview**，官方明确提示可能出现破坏性兼容变更。本页的版本、安装命令和热度数据核验于 **2026-08-15**；安装前请再次查看项目 README 与 Release。

> [!CAUTION]
> DSH 插件会以你的本机权限运行，可能读取文件、使用凭证或访问网络。进入本合集不等于通过安全审计。优先使用固定版本或提交，先读源码，再在不含生产密钥的环境试装。

## 一分钟选型

| 你最想解决的问题 | 先看这个 | 一句话建议 |
|---|---|---|
| 不知道装什么 | [dsh-market](#13-dsh-market) / [dsh-find-plugin](#14-dsh-find-plugin) | 前者适合点选安装，后者适合直接问 Agent |
| 想把 Web UI 变成工作台 | [dsh-web-ui](#1-dsh-web-ui) / [DSH-better-sidebar](#7-dsh-better-sidebar) | 全家桶选前者，侧边栏工作流选后者；先别同时装 |
| 想让纯文本模型看图 | [ModLens](#2-modlens) / [DSH Vision Toolkit](#9-dsh-vision-toolkit) | 粘贴即读选前者，精细测量与验证选后者 |
| 喜欢终端工作流 | [dsh-TUI](#5-dsh-tui) | Node 版本和权限边界要先确认 |
| 想做代码审查 | [brooks-lint](#3-brooks-lint) | 先只读审查，再决定是否自动修复 |
| 想并行调多个 Agent | [dsh-agent-teams](#11-dsh-agent-teams) | 从 3 个角色起步，别一上来拉满 8 个 |
| 想提高长任务的工程纪律 | [Aegis](#6-aegis) | 只保留一种安装方式，避免重复技能源 |
| 想给第三方工具加一道护栏 | [dsh-guardian](#16-dsh-guardian) | 它是策略层，不是沙箱 |

## 收录口径

本项目不是 `dsh-plugin` Topic 的镜像。该 Topic 已在极短时间内膨胀到约 3,000 个仓库，其中存在只添加标签、并非真正可安装 DSH 扩展的项目。

- **热门精选**：优先选择 GitHub 热度较高、近期仍更新、且存在明确 DSH 安装或接入说明的项目。
- **新锐观察**：发布时间很短，但有独特能力、社区讨论或明确可复现安装路径；不把它们包装成成熟项目。
- **类型分开**：原生 Bundle、Skill Pack、Preset、主题和整合包分别标注，避免把所有东西都叫“插件”。
- **证据优先**：功能与安装方式来自项目自己的 README；Star 为 2026-08-15 的 GitHub API 快照，不代表质量或安全。
- **不收录**：无公开源码、无许可信息且风险过高、没有 DSH 接入说明、只有概念图或明显蹭 Topic 的项目。

详细方法见 [收录与核验方法](docs/METHODOLOGY.md)，结构化数据见 [data/plugins.json](data/plugins.json)。

## 热门精选

### 1. dsh-web-ui

[项目主页](https://github.com/zhu1090093659/dsh-web-ui) · `整合包` · `2,223 ★ 快照` · `Apache-2.0`

- **功能**：把任务看板、Git 图谱、右侧文件/预览面板、移动端远程、SSH、图像理解、令牌统计、宠物和皮肤中心打成一套 Web UI 全家桶。
- **适合**：把 DSH 当主力工作台，希望少折腾、一次补齐大部分界面能力的人。
- **安装**：`dsh plugin --profile web add @linxin666/dsh-web-ui-all`
- **Tips**：只需要任务看板、SSH 或宠物时，优先安装对应子包；这样冲突面更小，也更容易排错。pnpm 11 用户要留意项目文档中的 `minimumReleaseAgeExclude` 与 hoisted 布局说明。
- **注意**：全家桶包含远程连接和多种 Host 能力，权限面较大；首次安装不要同时叠加另一个重型侧边栏框架。

### 2. ModLens

[项目主页](https://github.com/liustack/modlens) · `视觉 Bundle` · `1,494 ★ 快照` · `MIT`

- **功能**：给 DeepSeek、GLM 等纯文本模型外挂视觉能力；粘贴图片后输出 OCR、布局、实体和关系等结构化证据。
- **适合**：前端还原、截图排错、文档 OCR、看图问答，以及不想为了视觉任务更换主模型的人。
- **安装**：`npx -y @deepseek-ai/dsh plugin --profile web add @liustack/modlens@3.16.6`
- **Tips**：第一次先运行项目提供的健康检查，再从模型列表选择带 `(modlens vision)` 的路由；固定明确版本比追 `latest` 更可复现。
- **注意**：图片可能被发送给你配置或复用的外部视觉服务。先确认实际调用的是哪家引擎、消耗哪份额度。

### 3. brooks-lint

[项目主页](https://github.com/hyhmrright/brooks-lint) · `Skill Pack` · `1,329 ★ 快照` · `MIT`

- **功能**：基于 12 本经典软件工程著作做代码、架构、技术债和测试审查，输出带出处的“症状 → 来源 → 后果 → 修复”建议。
- **适合**：代码评审者、维护遗留系统的团队，以及想让 Agent 的建议更有工程依据的人。
- **安装**：克隆仓库后运行 `./scripts/install.sh dsh`；项目级试用可运行 `./scripts/install.sh dsh --project`。
- **Tips**：先用 `/brooks-review` 或 `/brooks-health` 做只读体检，再决定是否执行 `/brooks-sweep`。把书本原则当检查清单，不要当自动合并的裁判。
- **注意**：它是 DSH 原生可发现的 Skills，而不是 Cordis Bundle；目录必须保持项目文档要求的扁平结构。

### 4. dsh-anchored-standard

[项目主页](https://github.com/xiaobright/dsh-anchored-standard) · `实验 Preset` · `1,267 ★ 快照` · `未声明标准许可证`

- **功能**：首轮用 Minimal 的提示词和真实工具 Schema 进行“锚定”，随后切回 Standard 的完整工具集。
- **适合**：愿意做基准测试、排查首轮工具分布对 DeepSeek V4 表现影响的高级用户。
- **安装**：克隆后把整个 `preset` 目录复制到 `~/.dsh/.agent-presets/anchored-standard`，重启并新建空白会话。
- **Tips**：按项目的 Verify 清单检查前两次 `request/header`；不要把已有会话中途切到这个 Preset。
- **注意**：作者的高分来自特定 Project2 任务，不能外推为通用性能提升；主要兼容证据针对 DSH `0.1.0-rc.5`，在更新版本上要重新验证。

### 5. dsh-TUI

[项目主页](https://github.com/ccch1mneyyy/dsh-TUI) · `终端 Bundle` · `1,027 ★ 快照` · `MIT`

- **功能**：Claude Code 风格全屏终端，带流式 Markdown、工具卡、`@` 文件引用、会话恢复/回滚、上下文进度、TPS、Skills、MCP 和子代理支持。
- **适合**：长期待在终端、偏好键盘操作，以及需要观察 Agent 实时状态的开发者。
- **安装**：`npm install -g @deepseek-ai/dsh @deepseek-harness-tui/dsh-tui`
- **Tips**：macOS Terminal 的 `⌘` 快捷键会被终端自身抢走，按项目建议优先用 `Ctrl`；长会话开启消息虚拟化相关默认设置即可。
- **注意**：要求 Node `^22.19` 或 `>=24`。它复用 DSH 当前 Profile 的沙箱与审批能力，不另提供独立沙箱。

### 6. Aegis

[项目主页](https://github.com/GanyuanRan/Aegis) · `方法论 Bundle / Skill Pack` · `1,012 ★ 快照` · `MIT`

- **功能**：为长任务加入基线、证据验证、漂移检查、系统化调试和完成前验证等工程方法。
- **适合**：做架构改造、复杂修复、规格驱动开发，以及希望 Agent 少“凭感觉完工”的团队。
- **安装**：`dsh plugin --profile web add github:GanyuanRan/Aegis`
- **Tips**：安装后用 `dsh --profile web --dump-config` 确认只有一个 `aegis-method-pack`；新会话中显式加载 `using-aegis` 最容易判断是否生效。
- **注意**：不要同时再把 Aegis 放进 `~/.dsh/skills`、`.dsh/skills` 或 `.agents/skills`，否则会出现重复技能源。项目也明确表示新鲜宿主上的完整路由验证仍在补齐。

### 7. DSH-better-sidebar

[项目主页](https://github.com/omdsh-dev/DSH-better-sidebar) · `Web UI Bundle` · `890 ★ 快照` · `MIT`

- **功能**：右侧栏 + 底部面板工作台，内置文件树、编辑预览、浏览器、真实终端、Git、后台任务，并开放扩展 API 给其他插件注册 Tab 与预览器。
- **适合**：想把 DSH 做成轻量 IDE，但不想安装一整套 UI 全家桶的人。
- **安装**：`npx -y --package @deepseek-ai/dsh dsh plugin --profile web add dsh-better-sidebar`
- **Tips**：先只开文件、Git、任务三个核心 Tab，再逐个启用终端和浏览器；遇到界面异常先硬刷新。Windows 的终端能力可能受 `node-pty` 预编译产物影响。
- **注意**：保持内容沙箱开启。项目提供的 `curl | bash` 是便捷方式，但审阅脚本后再执行更稳妥。

### 8. dsh-deep-whale

[项目主页](https://github.com/Small-tailqwq/dsh-deep-whale) · `主题/皮肤` · `727 ★ 快照` · `CC BY-NC-SA 4.0`

- **功能**：为 DSH Web 提供鲸鱼娘主题皮肤，目前包含深海女仆工坊风格的亮/暗色界面。
- **适合**：想个性化工作台、直播展示或做社区截图的人。
- **安装**：克隆仓库后运行 `dsh plugin --profile web add ../dsh-deep-whale/maid-atelier`。
- **Tips**：皮肤与功能插件分开安装；升级前保存当前 Profile 配置，出现 UI 冲突时先单独禁用皮肤定位问题。
- **注意**：许可证禁止商业使用。商业视频、课程或品牌项目使用前应确认许可边界与署名要求。

### 9. DSH Vision Toolkit

[项目主页](https://github.com/Anionex/dsh-vision-toolkit) · `视觉 Bundle` · `382 ★ 快照` · `MIT`

- **功能**：提供 10 个面向 Agent 的视觉工具，覆盖带意图的图片问答、长截图 OCR、裁剪、取色、坐标/几何验证、UI 还原和像素差异。
- **适合**：需要“可测量、可复核”视觉证据的前端、设计 QA、GUI 自动化和测试场景。
- **安装**：`dsh plugin --profile web add @anionex/dsh-vision-toolkit`
- **Tips**：本地裁剪、像素、颜色与 HTML 操作不需要视觉 API；远程工具再单独配置 Credential。Web 与 Headless Profile 需要分别安装。
- **注意**：需要 Python 3.11+ 与 pnpm。它和 ModLens 解决的问题重叠，建议先选一个跑通真实任务再决定是否共存。

### 10. dsh-ads

[项目主页](https://github.com/Nagi-ovo/dsh-ads) · `娱乐 Web Bundle` · `370 ★ 快照` · `BSD-3-Clause`

- **功能**：把 DSH 变成 2005 年门户网站：侧栏广告、假游戏、弹窗和推理中插播，同时轮播近期 DSH 插件。
- **适合**：社区演示、直播整活、想让等待时间更有戏剧效果的人。
- **安装**：`dsh plugin --profile web add github:Nagi-ovo/dsh-ads`
- **Tips**：每个广告位都能在设置里单独关闭；只保留推理等待位，通常既有梗又不太影响操作。
- **注意**：这是纯娱乐插件。项目声明不扫描本机文件；用户主动点“验证”时会查询一次 GitHub Star 状态。

### 11. dsh-agent-teams

[项目主页](https://github.com/NanmiCoder/dsh-agent-teams) · `多 Agent Bundle` · `286 ★ 快照` · `MIT`

- **功能**：让当前会话成为 Captain，创建可持续的子 Agent、依赖任务、直接消息和持久化团队状态，并在 Web UI 展示进展。
- **适合**：多角度代码审查、研究、交付拆解和需要明确依赖关系的并行任务。
- **安装**：`dsh plugin --profile web add @nanmicoder/dsh-agent-teams`
- **Tips**：先从“研究 / 实现 / 审查”三个角色开始，并设置清晰交付物；Agent 越多不等于更快，配额和协调成本会同步上涨。
- **注意**：同一工作区的团队状态不支持多个 DSH 进程并发写入；模型有时会完成工作却忘记更新任务状态，需要 Captain 复核。

### 12. dsh-at-file

[项目主页](https://github.com/omdsh-dev/dsh-at-file) · `Web UI Bundle` · `163 ★ 快照` · `MIT`

- **功能**：在输入框键入 `@` 搜索工作区文件和目录，把相对路径作为结构化引用交给 Agent。
- **适合**：频繁指定代码、文档、图片或目录，又不想手敲长路径的人。
- **安装**：`dsh plugin --profile web add https://github.com/omdsh-dev/dsh-at-file/archive/refs/tags/v0.6.0.tar.gz`
- **Tips**：用设置里的全局/工作区过滤规则排除大目录；同名文件多时输入 `src/view` 这类路径片段会比只搜文件名更准。
- **注意**：它只附加路径，不自动读取文件内容。PDF、Office 等格式能否处理，仍取决于当前会话挂载的工具。

### 13. dsh-market

[项目主页](https://github.com/dsh-market/dsh-market) · `插件市场 Bundle` · `145 ★ 快照` · `许可证待仓库元数据确认`

- **功能**：在 DSH 设置里浏览、搜索、排序、安装、更新和卸载社区插件与主题。
- **适合**：不想反复复制命令、希望图形化管理插件的新手和 Web 用户。
- **安装**：`dsh plugin --profile web add dshmarket`
- **Tips**：把它当“发现与安装器”，不要当安全认证。安装页面先看来源、版本和所需能力，关键环境固定提交或版本。
- **注意**：项目限制安装来源到精选目录并做若干防护，但第三方代码仍以本机权限运行。

## 新锐观察

以下项目很新，热度和兼容性还在形成中。收录理由是独特能力与近期社区讨论，不代表成熟度与上面的头部项目相同。

### 14. dsh-find-plugin

[项目主页](https://github.com/awesome-dsh-plugin/dsh-find-plugin) · `发现工具 Bundle` · `20 ★ 快照` · `MIT`

- **功能**：让 Agent 直接搜索 `dsh-plugin` Topic，按 Star 重排，并返回描述、仓库链接与安装命令。
- **适合**：知道自己要什么能力，但不知道插件名字的人。
- **安装**：`dsh plugin --profile web add dsh-find-plugin`
- **Tips**：用能力描述提问，例如“找能在微信里审批 DSH 请求的插件”，比只搜“通知”更有效；安装前要求 Agent 同时给出权限面和最近更新时间。
- **注意**：GitHub Topic 存在标签污染，排名靠前不等于真是 DSH 原生插件，更不等于安全。

### 15. WeShop for DSH

[项目主页](https://github.com/weshopai/weshop-dsh-plugin) · `视觉工作台 Bundle` · `6 ★ 快照` · `MIT`

- **功能**：把电商图片、虚拟试穿、背景替换、批量编辑和短视频生成放到与对话同步的无限画布里。
- **适合**：电商运营、商品摄影、视觉营销和需要批量创意变体的人。
- **安装**：关闭 Harness 后运行 `npx weshop-dsh-plugin setup`，再重启 `npx @deepseek-ai/dsh web`。
- **Tips**：先用低价值素材跑通 API Key、画布保存和导出，再导入正式商品资产；一组任务里保持参考图、产品图和风格图分区摆放。
- **注意**：依赖 WeShop API 与额度，视觉素材会按其服务流程处理。敏感产品图与客户数据应先核对服务条款和数据政策。

### 16. dsh-guardian

[项目主页](https://github.com/lonelymoon87/dsh-guardian) · `安全策略 Bundle` · `1 ★ 快照` · `MIT`

- **功能**：在工具执行前识别危险 Shell、SQL 与文件写入操作，在结果返回后脱敏常见凭证，并提供只读安全审查工作流。
- **适合**：经常让 Agent 执行命令、处理日志或在共享开发机上运行 DSH 的用户。
- **安装**：`dsh plugin --profile web add github:lonelymoon87/dsh-guardian#v0.1.2`
- **Tips**：先用 `standard` 配置观察误报，再考虑 `strict`；用项目提供的固定 Release tarball 可避免现场构建。
- **注意**：当前版本目标是 DSH `0.1.0-rc.6`。它不是进程沙箱、权限系统或 DLP，不能替代系统级隔离与最小权限。

## 常见组合

### 轻量开发者组合

`dsh-market` + `dsh-at-file` + `ModLens` + `dsh-guardian`

适合先补齐发现、文件引用、视觉和基础安全，不大改 UI。

### Web 工作台组合

`DSH-better-sidebar` + `dsh-at-file` + `dsh-find-plugin`

优先选择一个重型工作台插件，再按需加小组件。不要第一天就把两个全家桶和多个主题叠在一起。

### 研究与复杂交付组合

`Aegis` + `dsh-agent-teams` + `brooks-lint`

用 Aegis 管过程、AgentTeams 做并行、brooks-lint 做最终只读审查；三者职责分开，比让每个插件都接管全流程更稳定。

## 安装后的通用检查

```sh
# 1. 查看插件是否进入目标 Profile
dsh plugin --profile web list --depth 0

# 2. 检查最终组合配置
dsh --profile web --dump-config

# 3. 完全重启长期运行的 Web Profile
dsh web
```

建议每次只安装一个插件，完成一次真实任务后再装下一个。若 DSH 启动失败，先记录报错与 Profile 变更，再移除最后安装的插件；不要直接删除整个 `~/.dsh`。

## 贡献

欢迎提交遗漏的好项目，也欢迎纠正安装命令、兼容版本和风险提示。请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，并使用 Plugin submission Issue 模板。

本项目与 DeepSeek 无隶属或背书关系。各插件版权、商标和责任归各自作者；收录不代表推荐其用于生产环境。
