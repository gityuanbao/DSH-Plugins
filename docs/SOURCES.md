# 主要来源

本页记录本合集使用的公开来源。项目目录首次整理于 **2026-08-15**；16 份上手玩法复核于 **2026-08-16**。功能、安装与限制以各项目自己的最新文档为准。

## 生态与排名

| 来源 | 类型 | 用途 |
|---|---|---|
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | 官方/原始 | Developer Preview 状态、运行方式、插件生态入口 |
| [GitHub `dsh-plugin` Topic](https://github.com/topics/dsh-plugin) | 原始数据入口 | 候选发现、近期更新与排序入口 |
| [GitHub Search API 查询](https://api.github.com/search/repositories?q=topic%3Adsh-plugin&sort=stars&order=desc) | 原始数据 | Star、Fork、创建与更新时间快照 |
| [Awesome DSH Plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 社区精选 | 安装性线索、分类与风险提示交叉检查 |

## 新锐项目的社区线索

| 项目 | 线索 | 说明 |
|---|---|---|
| dsh-find-plugin | [Reddit 发布帖](https://www.reddit.com/r/DeepSeek/comments/1vnv0hs/github_awesomedshplugindshfindplugin_find_dsh/) | 仅用于判断近期讨论；功能与安装仍以仓库 README 为准 |
| WeShop for DSH | [Reddit 发布帖](https://www.reddit.com/r/DeepSeek/comments/1vo6ymi/i_built_an_image_and_video_generation_agent/) | 仅用于判断近期讨论；外部服务与数据处理以项目条款为准 |
| dsh-anchored-standard | [社区讨论](https://www.reddit.com/r/DeepSeek/comments/1voaf2j/is_deepseek_v4_pro_ga_really_that_bad/) | 只说明该 Preset 正在被讨论，不独立证明通用性能提升 |

## 项目原始文档

每个收录项目的主页链接都列在 [README](../README.md) 与 [结构化目录](../data/plugins.json) 中。核验时优先读取其 README、安装指南、兼容矩阵和 Release，而不是第三方转载。

## 玩法手册的原文入口

[玩法手册](PLAYBOOKS.md) 不是搬运原 README，而是提取最适合第一次使用的步骤、命令、快捷键、验证信号和避坑说明。下表记录本次摘要所依据的作者文档；其中“跑通标志”和推荐顺序属于本合集基于原文做的用户视角整理。

| 插件 | 优先阅读的作者文档 | 本合集提取的重点 |
|---|---|---|
| dsh-web-ui | [快速开始](https://github.com/zhu1090093659/dsh-web-ui#快速开始) | 全家桶安装、重启、模块开关、子包与常见环境问题 |
| ModLens | [Installation](https://github.com/liustack/modlens#installation) / [Usage](https://github.com/liustack/modlens#usage) | 健康检查、路由、粘贴图片、Provider 与回退策略 |
| brooks-lint | [Slash Commands](https://github.com/hyhmrright/brooks-lint#slash-commands) | Health、Review、Audit、Sweep 的职责与配置 |
| dsh-anchored-standard | [Verify](https://github.com/xiaobright/dsh-anchored-standard#verify) | 空白会话、前两次 request/header 与对照实验 |
| dsh-TUI | [快速开始](https://github.com/ccch1mneyyy/dsh-TUI#快速开始) / [快捷键](https://github.com/ccch1mneyyy/dsh-TUI#快捷键) | 首次诊断、恢复会话、命令与键盘操作 |
| Aegis | [Start Fast with Aegis](https://github.com/GanyuanRan/Aegis#start-fast-with-aegis) | Goal、诊断优先、决策访谈、TDD 路线与排错 |
| DSH-better-sidebar | [快捷键](https://github.com/omdsh-dev/DSH-better-sidebar#快捷键) | 文件 / Git / 任务起步、布局操作与环境问题 |
| dsh-deep-whale | [README](https://github.com/Small-tailqwq/dsh-deep-whale#readme) | 皮肤安装、切换与非商业许可提醒 |
| DSH Vision Toolkit | [Start in Three Steps](https://github.com/Anionex/dsh-vision-toolkit#start-in-three-steps) / [Usage Patterns](https://github.com/Anionex/dsh-vision-toolkit#usage-patterns) | Ground、Crop、Glance、OCR 与像素验证链路 |
| dsh-ads | [安装与设置](https://github.com/Nagi-ovo/dsh-ads#安装) | 广告位开关、语言素材与最小干扰玩法 |
| dsh-agent-teams | [One Prompt, a Working Team](https://github.com/NanmiCoder/dsh-agent-teams#one-prompt-a-working-team) | Captain、成员、依赖任务、消息、汇总与归档 |
| dsh-at-file | [Usage](https://github.com/omdsh-dev/dsh-at-file#usage) | `@` 引用、路径片段、目录进入与过滤规则 |
| dsh-market | [What You Get](https://github.com/dsh-market/dsh-market#what-you-get) | 搜索、安装、备份、更新、日志与风险边界 |
| dsh-find-plugin | [Usage](https://github.com/awesome-dsh-plugin/dsh-find-plugin#usage) | 自然语言发现、返回字段、缓存与 Topic 限制 |
| WeShop for DSH | [Getting Started](https://github.com/weshopai/weshop-dsh-plugin#getting-started) | Profile 初始化、Canvas Preset、API Key 与导出 |
| dsh-guardian | [Configuration](https://github.com/lonelymoon87/dsh-guardian#configuration) | 策略档位、风险拦截、结果脱敏与自定义规则 |

## 整理边界

- 只把作者文档明确支持的能力写成事实；建议使用顺序会用“推荐”“先……再……”表达。
- 不把 Star、Topic 排名或被本合集收录解释为质量、安全或生产可用性背书。
- 不复制大段原文和截图；需要完整参数、版本兼容与故障排查时，直接回到上表的原始文档。
- 项目 README 更新后，本合集摘要可能短暂滞后；欢迎通过 Issue 提醒我们复核。
