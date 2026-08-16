# DSH 插件玩法手册

> 不只是告诉你“这个插件能干什么”，还告诉你“装完第一件事该做什么”。

这份手册把 16 个插件原 README 中最值得照抄的安装后步骤、命令、快捷键和工作流，压缩成一套更适合普通用户阅读的中文玩法。

- **内容依据：** 各项目作者公开 README / 安装文档，核验于 **2026-08-16**。
- **不是替代品：** 插件更新、完整参数与兼容性仍以原项目为准。
- **怎么理解“跑通标志”：** 这是我们根据作者给出的验证方法、界面行为与命令结果整理出的快速判断，不等于完整测试报告。
- **建议玩法：** 一次只装一个，先跑通这里的“第一次这样用”，再决定是否长期保留。

## 先按你的目标找

| 你想做什么 | 直接抄这份玩法 |
|---|---|
| 把 Web UI 变成工作台 | [dsh-web-ui](#play-dsh-web-ui) / [DSH-better-sidebar](#play-better-sidebar) |
| 让 DeepSeek 看懂图片 | [ModLens](#play-modlens) / [DSH Vision Toolkit](#play-vision-toolkit) |
| 做电商图和短视频 | [WeShop for DSH](#play-weshop) |
| 在终端里用 DSH | [dsh-TUI](#play-dsh-tui) |
| 让长任务更稳 | [Aegis](#play-aegis) |
| 做代码体检 | [brooks-lint](#play-brooks-lint) |
| 同时调度多个 Agent | [dsh-agent-teams](#play-agent-teams) |
| 更快引用文件 | [dsh-at-file](#play-at-file) |
| 找到并安装更多插件 | [dsh-market](#play-market) / [dsh-find-plugin](#play-find-plugin) |
| 给危险操作加提醒 | [dsh-guardian](#play-guardian) |
| 做模型对照实验 | [dsh-anchored-standard](#play-anchored-standard) |
| 换皮肤、整点节目效果 | [dsh-deep-whale](#play-deep-whale) / [dsh-ads](#play-ads) |

---

<a id="play-dsh-web-ui"></a>
## 01 · dsh-web-ui：先把全家桶跑起来，再做减法

**最适合的第一次任务：** 在一个界面里确认任务看板、文件、SSH、视觉与皮肤入口都能正常出现。

### 第一次这样用

1. 给 Web Profile 安装全家桶：

   ```sh
   dsh plugin --profile web add @linxin666/dsh-web-ui-all
   ```

2. **完整停止并重新启动** `dsh web`，不要只刷新浏览器。
3. 打开侧边栏，逐个确认新增入口；再去「设置 → 插件配置」关闭暂时用不到的模块。
4. 去皮肤中心切一次主题，确认客户端扩展已经真正加载。

### 跑通标志

- 侧边栏出现插件入口。
- `dsh --profile web --dump-config` 中能看到对应插件。
- 开关插件或皮肤后，重启 Web 仍能保留设置。

### 小技巧与坑

- 只想要单项能力时，可以改装作者拆出的子包：任务看板、SSH、视觉、宠物、皮肤等，不必永远背着全家桶。
- 定时任务依赖浏览器页面保持打开，关掉标签页后不要期待它继续在后台运行。
- 远程隧道若不支持稳定的 SSE，状态更新可能退化成轮询。
- pnpm 11 遇到依赖发布时间限制或布局问题时，按作者说明检查 `minimumReleaseAgeExclude` 与 hoisted 配置。

**原文继续读：** [快速开始与模块说明](https://github.com/zhu1090093659/dsh-web-ui#快速开始)

---

<a id="play-modlens"></a>
## 02 · ModLens：让纯文本模型先看一张真实截图

**最适合的第一次任务：** 把一张报错截图交给 DeepSeek，让它指出错误文字、位置和可能原因。

### 第一次这样用

安装完成后，可以直接把下面这段交给 Agent：

```text
请按照 ModLens 的 INSTALL.md 完成安装和配置，然后运行健康检查。
先不要处理我的图片，只告诉我检查是否通过、当前使用哪个视觉服务，以及还缺什么配置。
```

健康检查通过后，粘贴一张图片或给出图片路径，再问：

```text
请读取这张截图：先列出可见文字，再描述页面结构，最后指出最可能导致失败的线索。
每个判断都要对应到图里的具体证据。
```

### 跑通标志

- `modlens doctor` 不再提示关键配置缺失。
- 当前路由名称中能看到 `(modlens vision)`。
- 回答不只是笼统描述，而是包含 OCR、布局或结构化证据。

### 小技巧与坑

- 先让安装器检查是否能复用你已有的 Codex、Claude、OpenCode 或 Pi 登录；是否复用凭证应由你确认。
- 想固定视觉提供商、避免自动回退时，再使用 provider 固定选项；排错阶段不要同时切换多个服务。
- OpenAI 兼容服务可配置 `baseUrl`、`apiKey` 与 `model`，例如接入兼容的视觉模型端点。
- 图片可能被发送到外部视觉服务。处理客户素材、账号截图或未公开设计稿前，先确认数据去向。

**原文继续读：** [Installation](https://github.com/liustack/modlens#installation) · [Usage](https://github.com/liustack/modlens#usage)

---

<a id="play-brooks-lint"></a>
## 03 · brooks-lint：先体检，再决定要不要自动修

**最适合的第一次任务：** 对当前改动做一次只读 Review，看看建议是否贴合项目。

### 第一次这样用

在 brooks-lint 仓库目录执行 DSH 安装脚本：

```sh
./scripts/install.sh dsh
```

重新打开 DSH 后，按这个顺序试：

1. `/brooks-health`：先看整体健康分与主要风险。
2. `/brooks-review`：审查当前变更，按“现象 → 根因 → 后果 → 改法”输出。
3. `/brooks-audit`：只有在需要理解依赖、循环与架构边界时再用。
4. `/brooks-sweep`：最后才执行安全修复；跨文件修改要人工确认。

### 跑通标志

- DSH 的斜杠菜单能发现 Brooks 命令。
- Review 会落到具体文件或设计关系，而不是只复述通用原则。
- 自动修复前能区分安全的小改动和需要你决策的架构问题。

### 小技巧与坑

- 用 `.brooks-lint.yaml` 调整严格度、忽略目录、关注区域与自定义风险，比在提示词里重复约束更稳定。
- 遗留项目第一次只跑 Health / Review，别上来就 Sweep 全仓库。
- 作者已验证 DSH 的文件布局安装方式，但完整的新主机端到端流程仍建议你在非生产项目先试一次。

**原文继续读：** [Slash Commands](https://github.com/hyhmrright/brooks-lint#slash-commands)

---

<a id="play-anchored-standard"></a>
## 04 · dsh-anchored-standard：把实验做成可复现对照

**最适合的第一次任务：** 用同一个问题，对比 Standard 与 Anchored Standard 的首轮工具选择。

### 第一次这样用

1. 把 Preset 复制到 `~/.dsh/.agent-presets/anchored-standard`。
2. 完整重启 DSH。
3. 新建**空白会话**，选择实验性的 Anchored Standard。
4. 用一个能触发工具调用的小任务测试；不要在活跃会话中途切换 Preset。
5. 导出 Session JSONL，检查最前面的两条 `request/header`。

### 跑通标志

- 首次请求的工具集合正好是 `bash` 与 `str_replace_editor`。
- 首次请求里没有注入 AGENTS 或 Skill 提醒。
- 下一阶段的请求头恢复了完整的发现工具目录。

### 小技巧与坑

- 做 A/B 测试时固定模型、任务、温度、项目内容与 DSH 版本，只改变 Preset。
- 单一评测上的好成绩不能外推成所有任务都会变好；把结果记录成实验数据，不要写成普遍结论。
- 这是能调用 Shell 的本地 Preset，应按与普通 DSH 工具相同的信任边界审查。

**原文继续读：** [Verify](https://github.com/xiaobright/dsh-anchored-standard#verify)

---

<a id="play-dsh-tui"></a>
## 05 · dsh-TUI：先记住 6 个键，就能离开浏览器

**最适合的第一次任务：** 在终端打开已有会话，引用一个文件并完成一次修改。

### 第一次这样用

```sh
dsh-tui
```

进入后先运行 `/doctor`，再试 `/status` 和 `/model`。想继续上次会话可以使用：

```sh
dsh-tui --resume
```

### 最值得记住的快捷键

| 操作 | 快捷键 |
|---|---|
| 发送 | `Enter` |
| 换行 | `Shift + Enter` |
| 中断当前任务 | `Ctrl + C` |
| 展开工具细节 | `Ctrl + O` |
| 搜索历史 | `Ctrl + R` |
| 插入图片或文件 | `Ctrl + V` |
| 看完整帮助 | `?` |

### 跑通标志

- `/doctor` 没有关键环境错误。
- `@` 文件补全、工具卡和流式 Markdown 都能正常显示。
- `/resume` 能找到并打开之前的会话。

### 小技巧与坑

- macOS Terminal.app 会截获部分 Command 组合，遇到无响应时优先使用项目给出的 Ctrl 版本。
- `/cost` 看消耗、`/compact` 压缩长对话、`/export` 导出记录，是长会话最实用的三个命令。
- TUI 复用当前 DSH Profile 的安全边界；界面换成终端不代表权限变少。

**原文继续读：** [快速开始](https://github.com/ccch1mneyyy/dsh-TUI#快速开始) · [快捷键](https://github.com/ccch1mneyyy/dsh-TUI#快捷键)

---

<a id="play-aegis"></a>
## 06 · Aegis：一句话先锁定任务边界

**最适合的第一次任务：** 诊断一个真实 Bug，但先不让 Agent 急着改代码。

### 第一次这样用

新会话里直接说：

```text
Aegis goal：找出登录刷新失败的根因，在不重写认证系统的前提下修复。
先建立可复现基线和成功标准，再改代码；完成前独立复核一次。
```

也可以用这些起手式：

```text
先诊断这次登录失败为什么发生，不要立即改代码。
审问我：我们现在是否应该先发布托管版本？
TDD Route: strict。为这个回归问题先写失败测试。
```

### 跑通标志

- Agent 会先明确范围、成功证据与不做什么。
- 修复前有基线或复现步骤，完成前有独立复核。
- 长任务中出现方向变化时，会回到目标检查是否漂移。

### 小技巧与坑

- 安装后用 `dsh --profile web --dump-config` 确认只有一个 `aegis-method-pack`。
- 没触发时，依次检查安装可见性、版本、激活模式、`using-aegis` 与任务是否匹配，不要立刻重复安装。
- Aegis 是方法包，不是后台守护进程，也不是最终审批人；高风险决定仍由你负责。

**原文继续读：** [Start Fast with Aegis](https://github.com/GanyuanRan/Aegis#start-fast-with-aegis)

---

<a id="play-better-sidebar"></a>
## 07 · DSH-better-sidebar：先开三个核心面板

**最适合的第一次任务：** 在不离开 DSH Web 的情况下，看文件、改一处代码、查看 Git diff。

### 第一次这样用

1. 安装后对 Web 页面做一次硬刷新：macOS 用 `Cmd + Shift + R`，Windows / Linux 用 `Ctrl + Shift + R`。
2. 先只保留文件、Git、任务三个核心 Tab。
3. 从文件树打开文件，修改后按 `Cmd/Ctrl + S` 保存。
4. 在 Git 面板检查 diff；提交信息准备好后可用 `Ctrl + Enter`。
5. 核心流程稳定后，再逐个启用终端和浏览器。

### 跑通标志

- 右侧栏和底部面板正常出现且不会重复挂载。
- 文件保存后，Git 面板能立刻看到对应 diff。
- 关闭再打开页面后，布局没有明显错位或重复侧栏。

### 小技巧与坑

- 标签拖向边缘可以拆分，拖向中心可以合并；中键能快速关标签。
- 文件行悬停可快速 `@` 引用，右键可复制路径。
- 客户端改动通常硬刷新即可；只有服务端能力变化时才需要重启。
- Windows 的真实终端若启动失败，优先检查 `node-pty` 预编译产物与 pnpm build approval。

**原文继续读：** [快捷键](https://github.com/omdsh-dev/DSH-better-sidebar#快捷键)

---

<a id="play-deep-whale"></a>
## 08 · dsh-deep-whale：60 秒换一套主题

**最适合的第一次任务：** 在亮色和暗色鲸鱼娘主题之间切换一次，确认皮肤独立生效。

### 第一次这样用

最省事的方式，是把仓库地址交给 DSH：

```text
请帮我安装这个 DSH 皮肤包，并告诉我安装到了哪个 Profile：
https://github.com/Small-tailqwq/dsh-deep-whale
```

安装完成后重启 Web，在皮肤入口中切换亮色 / 暗色主题。

### 跑通标志与小技巧

- 页面主体、配色和角色素材一起变化，而不是只改了背景色。
- 功能插件与主题分开装；界面异常时先单独停用主题排查。
- 许可证为 CC BY-NC-SA 4.0，商业视频、付费课程或品牌项目使用前要先确认授权边界。

**原文继续读：** [项目 README](https://github.com/Small-tailqwq/dsh-deep-whale#readme)

---

<a id="play-vision-toolkit"></a>
## 09 · DSH Vision Toolkit：按“定位 → 裁剪 → 看细节”来用

**最适合的第一次任务：** 找到截图中的按钮坐标，并对局部区域做一次精细分析。

### 第一次这样用

1. 安装后重启 Web。
2. 打开「设置 → Vision Toolkit」，先用内置的免费 Moondream 测试模型；需要时再配置自己的 Provider。
3. 粘贴图片或把图片放进工作区，调用 `/vision-tools`，给出一个具体目标。

可以照抄下面的工具链思路：

```text
先定位截图里的“发送”按钮并生成预览；
再裁剪按钮周围区域；
最后读取文字、状态与可疑视觉细节。不要直接猜坐标。
```

作者文档中的典型调用形态：

```text
vision_glance images=["screenshot.png"] query="What error is shown?"
vision_ground image="screenshot.png" target="the send button" preview=true
vision_pixel_diff original="reference.png" rebuilt="actual.png" runName="comparison"
```

### 跑通标志

- `vision_ground` 返回目标位置并能生成可核对的预览。
- 裁剪结果能继续传给 glance、trace 或 OCR，而不是每一步重新猜图。
- 像素对比会生成可复查的差异结果。

### 小技巧与坑

- `crop`、`trace`、`pixel_diff`、取色、前景提取与 HTML 截图等本地工具不需要视觉 API 凭证。
- UI 还原最好走“参考图 → HTML 截图 → pixel diff”的闭环。
- 长截图先用专门 OCR，并控制并发任务数；不要把整张超长图反复发给远程模型。
- 需要 Python 3.11+；输入文件应在工作区或允许访问的目录中。

**原文继续读：** [Start in Three Steps](https://github.com/Anionex/dsh-vision-toolkit#start-in-three-steps) · [Usage Patterns](https://github.com/Anionex/dsh-vision-toolkit#usage-patterns)

---

<a id="play-ads"></a>
## 10 · dsh-ads：只留一个广告位，效果反而最好

**最适合的第一次任务：** 只打开“推理等待”广告位，感受节目效果但不干扰主界面。

### 第一次这样用

1. 安装后重启或刷新 Web。
2. 打开「设置 → 广告（非官方）」。
3. 先关闭所有位置，只保留一个推理等待位。
4. 发起一个稍长的任务，确认广告只在等待阶段出现。

### 跑通标志与小技巧

- 每个广告位能独立开关，刷新后设置仍保留。
- 在「设置 → Language」切换语言后，素材会立即变化。
- 直播演示前先试一遍所有弹窗；这是娱乐插件，不要把它装进严肃的共享工作环境。

**原文继续读：** [安装与设置](https://github.com/Nagi-ovo/dsh-ads#安装)

---

<a id="play-agent-teams"></a>
## 11 · dsh-agent-teams：三个角色就够完成第一次协作

**最适合的第一次任务：** 让性能、安全、产品三个角色审查同一批提交，最后合成一份报告。

### 第一次这样用

```text
请使用 AgentTeams 审查 v0.5.3 之后的提交。
分别从性能、安全、产品体验三个角度工作，每个角色都要列出证据和优先级。
最后由 Captain 去重、处理冲突，并只返回一份合并报告。
```

一个好用的拆法：

1. Captain 建团队并写清总目标。
2. 三个成员各领一个边界明确的任务。
3. 用依赖关系让“汇总”等待三个审查完成。
4. Captain 检查消息与任务状态，合并结果后归档团队。

### 跑通标志

- `.agent-teams/` 中出现团队与任务状态。
- 三个成员的结论能追溯到各自任务，汇总不是简单拼接。
- Captain 能识别互相矛盾的建议并给出取舍。

### 小技巧与坑

- 第一次固定为 3 个角色；更多 Agent 会增加沟通与复核成本。
- 每个任务都写清交付物、范围和“完成”的证据。
- 同一工作区不要让多个 DSH 进程同时写团队状态；模型也可能忘记更新状态，Captain 必须复查。

**原文继续读：** [One Prompt, a Working Team](https://github.com/NanmiCoder/dsh-agent-teams#one-prompt-a-working-team)

---

<a id="play-at-file"></a>
## 12 · dsh-at-file：用路径片段消灭同名文件

**最适合的第一次任务：** 引用一个 PDF 或代码文件，让 Agent 只审查指定内容。

### 第一次这样用

在输入框键入：

```text
Review @docs/spec.pdf
```

出现选择器后：

- 输入 `/` 分隔的路径片段，例如 `src/view`，比只搜文件名更准确。
- 用 `ArrowRight` 进入目录。
- 在「设置 → File mentions」配置全局或工作区过滤规则，排除构建产物和大目录。

### 跑通标志

- 输入框上方出现结构化引用条，而不只是普通文本路径。
- 发送后能看到包含相对路径的结构化引用。
- 同名文件场景下，路径片段能稳定选中正确文件。

### 小技巧与坑

- 插件负责附加路径引用，不负责保证 Agent 已经读了文件内容；在提示词里明确要求“先读取再回答”。
- 引用目录时写清允许分析的范围，避免无意中扩大上下文。
- PDF、Office 或图片能否被处理，仍取决于当前模型和工具能力。

**原文继续读：** [Usage](https://github.com/omdsh-dev/dsh-at-file#usage)

---

<a id="play-market"></a>
## 13 · dsh-market：把它当安装器，不要当安全认证

**最适合的第一次任务：** 在市场里找到一个主题，检查来源后完成一次安装与卸载。

### 第一次这样用

1. 安装并重启 DSH Web。
2. 打开「设置 → Plugin Market」。
3. 按类别或关键词搜索，先查看截图、仓库来源、版本与安装提示。
4. 打开安装确认页，检查来源和能力范围后只装一个插件。
5. 刷新页面确认生效，再体验备份 / 恢复或更新检查。

### 跑通标志

- 能浏览、搜索并打开插件详情。
- 安装后目标插件在 Web 与 Profile 配置中都可见。
- 备份可以导出 JSON；需要跨设备时再配置 WebDAV。

### 小技巧与坑

- 精选目录是发现入口，不是安全背书。第三方插件仍以你的本机权限运行。
- 出问题时先复制插件市场提供的清理后日志，再去原仓库提 Issue。
- 先学会卸载和恢复，再批量安装，会省掉很多排错时间。

**原文继续读：** [What You Get](https://github.com/dsh-market/dsh-market#what-you-get)

---

<a id="play-find-plugin"></a>
## 14 · dsh-find-plugin：描述需求，不要猜插件名

**最适合的第一次任务：** 用自然语言找一个终端插件，并让 Agent 同时给出风险提示。

### 第一次这样用

安装并重启后，直接问：

```text
帮我找适合 DSH 的终端 TUI 插件。
请按相关性和活跃度整理，并给出 Stars、最近更新时间、仓库链接、固定版本安装方式和主要权限风险。
先不要替我安装。
```

还可以这样问：

```text
有没有能把 DSH 审批请求发到微信的插件？
有没有更方便查看 Git diff 的 DSH 插件？
```

### 跑通标志

- 返回结果包含描述、Stars、仓库链接与可用安装命令。
- 需求换一种说法后，仍能找到相关候选，而不是只能精确匹配名字。
- 结果能区分“GitHub Topic 里出现”与“已经确认可安装”。

### 小技巧与坑

- 搜索结果有约 5 分钟缓存，刚发布或刚更新的项目不一定立刻变化。
- 项目会用精选的中英文描述替换部分仓库简介，但这仍不等于安全审计。
- 让 Agent 先比较权限、维护活跃度和固定版本，再决定是否安装。

**原文继续读：** [Usage](https://github.com/awesome-dsh-plugin/dsh-find-plugin#usage)

---

<a id="play-weshop"></a>
## 15 · WeShop for DSH：先用测试素材跑通画布

**最适合的第一次任务：** 用一张无敏感信息的商品图做背景替换，并确认能保存与导出。

### 第一次这样用

1. 先启动一次官方 DSH Web，让目标 Profile 完成初始化，然后停止它。
2. 关闭正在运行的 Harness，再执行：

   ```sh
   npx weshop-dsh-plugin setup
   ```

3. 重启 DSH，新建或打开任务，选择 `WeShop Canvas` Preset。
4. 在画布顶部配置 API Key，或通过环境变量 `WESHOP_API_KEY` 提供。
5. 导入一张低价值测试图，只做一次背景替换并导出。

### 跑通标志

- WeShop Canvas Preset 能被选择。
- 图片进入画布后，生成结果能回到当前项目并正常导出。
- 关闭再打开任务后，画布状态没有丢失。

### 小技巧与坑

- 先验证 API Key、额度、保存与导出，再导入正式商品资产。
- 作者说明 Key 保存在宿主侧，而不是暴露给浏览器或模型；你仍应按自己的数据合规要求核对服务条款。
- 批量处理前先锁定一套提示词、尺寸与背景规范，减少生成结果漂移。

**原文继续读：** [Getting Started](https://github.com/weshopai/weshop-dsh-plugin#getting-started)

---

<a id="play-guardian"></a>
## 16 · dsh-guardian：用真实日志验证脱敏，不要拿危险命令试刀

**最适合的第一次任务：** 审查一段已经去除真实密钥的日志，并观察敏感字段是否被遮盖。

### 第一次这样用

1. 优先安装固定 Release，重启后用 `dsh --profile web --dump-config` 确认插件已加载。
2. 保持 `standard` 策略，先观察日常命令的误报情况。
3. 准备一段**虚构凭证**的测试日志，请 Agent 读取并总结，检查返回内容是否脱敏。
4. 再让 Agent 规划一次文件删除或强推操作，但只要求说明风险与审批点，**不要真正执行**。

### 跑通标志

- 高风险 Shell、SQL 或文件写入会被拒绝或要求确认。
- AWS、GitHub、`sk-`、PEM 与常见凭证赋值在结果中被遮盖。
- 日常低风险命令没有被大面积误伤。

### 小技巧与坑

- `standard` 适合先观察；`strict` 会对更多操作（例如 sudo）要求确认；`permissive` 只适合你明确理解风险的环境。
- 自定义规则和脱敏模式应从小范围增加，每次都用虚构数据回归验证。
- Guardian 是策略层，不是系统沙箱、权限隔离或 DLP。真正的秘密管理仍应交给操作系统与专门工具。

**原文继续读：** [Configuration](https://github.com/lonelymoon87/dsh-guardian#configuration)

---

## 这份手册怎么继续变好

如果作者 README 更新了更好的工作流，或者你跑出了更贴近真实用户的玩法，欢迎提交 Issue / PR。最好同时提供：

1. 使用的 DSH 与插件版本；
2. 你实际执行的任务；
3. 怎样算“跑通”；
4. 哪一步最容易踩坑；
5. 对应的原始文档链接。

[返回主 README](../README.md) · [查看来源记录](SOURCES.md) · [推荐新插件](https://github.com/gityuanbao/DSH-Plugins/issues/new/choose)
