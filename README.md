# 彼络物联网关 说明书（文档站）

基于 [Starlight](https://starlight.astro.build/)（Astro）的《彼络物联网关 说明书》在线文档，内容对应说明书 **v1.19.7.42**，截图取自当前版本的网关 Web 管理页面。

站点提供简体中文与英文两个版本：简体中文在根路径（`/gateway/`），英文在 `/gateway/en/`，右上角语言切换器可在两者之间跳转。

## 开发

```bash
pnpm install
pnpm start        # 本地开发服务器（热更新）
```

## 构建与预览

```bash
pnpm build        # 生成静态站点到 dist/（starlight-links-validator 校验所有内部链接与锚点，失败即报错）
pnpm serve        # 本地预览 dist/ 产物
```

## 导出 PDF

整本说明书可导出为 PDF（中英文各一份），供离线阅读与打印。站点右上角的 **下载 PDF** 按钮即指向该文件。

```bash
pnpm exec playwright install chromium   # 仅首次：下载与 playwright 版本匹配的 Chromium
pnpm build && pnpm pdf                  # 生成 dist/bivrost-gateway-manual-{zh-CN,en}-v<版本>.pdf
```

- PDF 由 `/print/`（中文）与 `/en/print/`（英文）两个路由渲染。这两个页面把侧边栏顺序中的全部 23 章合并为一篇长文档，前面加封面与目录；用浏览器打开并 Ctrl-P 预览，是调整 `src/styles/print-manual.css` 最快的方式
- 章节顺序的唯一来源是 `src/sidebar.mjs`，`astro.config.mjs` 的侧边栏与 PDF 共用，二者不会脱节。章节标题取自各页 frontmatter 的 `title`；侧边栏分组的下级条目在目录中缩进一级（分组的首章即该组概述页，与分组同名，不缩进）
- 版式按说明书惯例设置：正文宋体、标题黑体、表格加框、提示框改为线框、页眉页脚含书名与页码，封面不含日期且不带页眉页脚（生成器把封面单独渲染一次再换入第 1 页，以保留 Chromium 生成的书签树）
- 合并后各页锚点会重名，页面上的内联脚本会给每章的 `id` 加上 `<章节>--` 前缀，并把站内链接改写为文档内锚点，因此 PDF 里的交叉引用可直接跳转
- `pnpm pdf` 不挂在 `pnpm build` 上：没装浏览器也能正常构建站点。`pnpm install` 同样不会下载浏览器（见 `pnpm-workspace.yaml` 的 `allowBuilds`）
- CI 在第一次构建后生成一次 PDF，同一份文件同时发布到 `/gateway/` 与 `/gateway/v<版本>/`；runner 上需要 `fonts-noto-cjk`，否则中文会渲染成方框

## 目录结构

- `src/content/docs/` — 简体中文正文；侧边栏结构在 `src/sidebar.mjs` 中定义，与说明书目录一致
- `src/content/docs/en/` — 英文正文，文件名与中文一一对应（Starlight 按 `slug` 自动匹配两个语言的同名页面）
- `public/img/manual/<章节>/` — 各章节中文界面截图（取自当前 Web UI）
- `public/img/manual/en/<章节>/` — 各章节英文界面截图，文件名与中文版一一对应
- `src/assets/logo.png` — 从说明书 PDF 提取的透明底 Logo（导航栏用）
- `src/data/device-support.json` — 4.5. 支持设备的数据源（见下节），中英文共用
- `src/styles/custom.css` — 品牌色与截图卡片样式
- `src/styles/print-manual.css` — 整本 PDF 的版式、分页、表格与截图样式
- `src/sidebar.mjs` — 章节顺序（侧边栏与 PDF 共用）
- `src/components/Footer.astro` — 页脚版权信息
- `src/components/SocialIcons.astro` — 顶栏「下载 PDF」按钮（Starlight 在顶栏与移动端菜单都会渲染此组件）
- `src/pages/print.astro`、`src/pages/en/print.astro` — 整本合并的打印页
- `scripts/generate-pdf.mjs` — 用 headless Chromium 把打印页导出为 PDF
- `scripts/derive-support-matrix.mjs`、`seed-support-matrix.mjs`、`render-support-tables.mjs`、`check-support-matrix.mjs` — 支持设备表的推导、生成、渲染与校验

## 固件版本同步

本站记录网关固件（`bivrost.iot` 仓库根目录 `Changelog.md`）中与说明书相关的变化。为保证两边一致，每个固件版本都要在根目录 `firmware-sync.json` 中登记本站的处理结论：

| status | 含义 |
| --- | --- |
| `done` | 已更新正文，且 `src/content/docs/changelog.md` 与 `en/changelog.md` 都有该版本的行 |
| `n/a` | 该版本对说明书无影响，须在 `note` 中写明原因 |
| `pending` | 需要更新但尚未完成，检查不通过 |

**判断标准**：界面与操作、配置项、部署与升级步骤、支持的设备与系统、用户权限的变化，都属于本站（`done`）；只影响接口路径、参数、返回字段或错误码的变化属于《通讯协议》；纯内部修复且界面与操作不变的记为 `n/a`。拿不准时按 `done` 处理。

**流程**：

1. 固件发布后，读取 `Changelog.md` 顶部新的 `## Version` 段，在 `firmware-sync.json` 中登记。
2. 对 `done` 的版本修改中英文正文，在两个 changelog 表格顶部加行；把 `VERSION` 升到该固件版本，并同步本文件首段的版本号（`pnpm build` 前置的 `check-version` 会校验两者一致）。
3. `pnpm check:firmware` 通过后在本仓库提交，再由主仓库更新子模块指针。主仓库的 `publish-gateway.ps1` 发布前会运行同一检查，不通过即中止发布。

`scripts/check-firmware-sync.mjs` 默认读取 `../../Changelog.md`（作为 `bivrost.iot` 子模块检出时的位置），也可用 `--changelog <路径>` 指定；找不到时跳过，因此单独克隆本仓库或 CI 构建不受影响。`baseline` 之前的版本不检查。该脚本与《通讯协议》仓库中的同名脚本保持一致，两站差异只写在各自的 `firmware-sync.json` 中。

## 支持设备表

[4.5. 支持设备](src/content/docs/reference/supported-devices.md)只列设备类型、系统与型号（含标注为开发中的），
逐个接口与逐个字段的支持情况在《通讯协议》1.4. 接口支持说明中。两处都由 `src/data/device-support.json`
生成，中英文共用一份数据。

`src/data/device-support.json` 与 `scripts/lib/render-support.mjs`、`scripts/render-support-tables.mjs`
在本仓与《通讯协议》仓中**保持逐字一致**（与 `check-firmware-sync.mjs` 同样的约定）：两本书渲染的区块不同，
但数据与脚本是同一份。改动一侧后复制到另一侧，不要各改各的。

正文里用 HTML 注释标出生成区间，注释之外的文字不会被脚本改动；需要渲染的页面由脚本扫描内容目录找出，
不用在脚本里登记：

```markdown
<!-- support:matrix type=CNC group=basic -->
…自动生成的表格…
<!-- /support -->
```

三种区块：`devices`（《说明书》4.5 的设备清单，带 `type=`）、`catalogue`（接口清单）、`matrix`
（带 `type=` 与 `group=`，`group` 可用逗号列多个）与 `fields`（字段支持表，带 `type=`、`class=`，
字段多的数据类再用 `part=` 分表）。

| 命令 | 用途 |
| --- | --- |
| `pnpm render:support` | 把数据文件渲染进中英文正文页 |
| `pnpm check:support` | 校验正文中的生成区块是否为最新（`prebuild` 会自动运行） |

**这份数据全部人工维护，没有任何脚本从网关源码推导。** 网关新增或删除机台系统／型号、接口，或
`Bivrost.IOT.Common/Models/DataOutputModel.cs` 里 `*Output` 类的字段时，要在同一次改动里更新本文件——
`bivrost.iot` 仓的 `CLAUDE.md` 把这条写进了发布提交清单。漏改不会有编译或构建错误，只会让文档说错话。

`support` 为每个接口的三态：`y` 已支持、`n` 不支持、`d` 开发中（通讯库已覆盖、网关还没做）。
**尚未接入的设备**（这类 PLC 与机器人）在品牌一层标 `"planned": true`。

`dataClasses` 描述**各系统型号之间有差异的字段**：所有支持该接口的系统都返回的字段不写进去，它跟随接口的
支持情况，含义由 1.2. 数据说明负责。每个数据类给出 `interface`（决定哪些行出现在表里）、`fields`
（`members` 列出对应的 JSON 字段名，`part` 分表），厂商专有字段的数据类再标 `"sparse": true`，这样表里
只列真正返回这些字段的型号，不必为几个格子铺满四十多行 ✗。

对应地，每一行用 `fields` 列出它支持哪些有差异的字段，用 `notes` 写按型号或用法限定的脚注
（如刀具寿命的 `ToolLife.count`、时间数据的 `TimeData.currentCycleTime`）。**支持某接口的行必须显式写出
该数据类的 `fields`**，哪怕是空数组：`render-support.mjs` 宁可报错停下，也不把「没填」默认渲染成「不支持」。

## 写作约定

- 标题锚点使用 `## 标题 {#anchor}` 语法（由 satteri 的 `headingAttributes` 支持），与说明书 PDF 的编号锚点保持一致
- 提示框使用 Starlight aside 语法：`:::note[注]` / `:::caution[注意]`（不支持 `:::info`，用 `note` 代替）
- 页面标题由 frontmatter `title` 渲染为 H1，正文中不要再写 `#` 一级标题

### 中英文对应

- **锚点必须完全一致**：英文页保留中文页的 `{#anchor}`，两个语言的交叉链接才不会失效
- **英文页内部链接以 `/en/` 开头**（如 `/en/usage/network/#wired`），图片以 `/img/manual/en/` 开头
- **界面词以产品英文 UI 为准**：从 `bivrost-gateway-web` 仓库的 `public/i18n/zh/*.json` 与 `public/i18n/en/*.json` 提取中英对照，不要自创译法
- `pnpm build` 会用 starlight-links-validator 校验两个语言的全部内部链接与锚点

## 更新截图

截图使用 playwright-cli 从本地运行的网关 Web 页面（`bivrost-gateway-web` 仓库，`pnpm start`，1440×900 视口）捕获。注意：

- 调整视口大小需在登录前完成（页面刷新会丢失内存中的登录状态）
- 切换界面语言：登录前设置 `localStorage.switchLanguage`（`zh_CN` / `en_US`），或登录后用右上角账户菜单的**语言**选项
- 中英文截图取同一状态、同一裁剪范围，文件名保持一致，仅目录不同

## 中文中性 PDF（按需生成）

品牌版继续使用 `pnpm pdf`。中性版仅处理中文，通过同一份正文和打印页派生，不改网站页面、英文版和下载按钮，也不自动发布到网站。

```bash
# 首次需安装 Chromium 和 Poppler（最终 PDF 文本验收使用 pdftotext）
pnpm exec playwright install chromium
# macOS：brew install poppler；Debian/Ubuntu：apt-get install poppler-utils
pnpm build && pnpm pdf:neutral
pnpm test:neutral
```

使用 Node.js 22.12 或更高版本。配置了 `DOCS_BASE` 时，构建与导出必须传入相同的值；`PDF_PORT` 可指定临时本机预览端口。运行中性命令时会检查 Poppler 是否可用，缺失即终止。

产物位于 `output/pdf/`，与部署用的 `dist/` 分开；同名 `.pdf.audit.json` 记录版本、页数、图片原始及处理后 SHA-256、最终 PDF SHA-256 和生成时间。正式文件通过全部自动检查后才替换；失败退出不会把旧文件报告为本次成功产物。仅交付 PDF，不向客户附带内部审查报告。

中性模式去除封面、页眉、正文及图片中的彼络品牌和联系方式；说明书排除整章《产品使用协议》。跨册品牌站点链接保留书名与章节文字，本册引用保留内部跳转。示例中的自定义 MCP 名称改为 `gateway`／`hub`，许可示例与返回参数表均省略 `company` 字段；真实接口、字段定义、设备 IP 和旧设备登录所需的 `BIV-` 前缀保留。上述转换集中在 `scripts/neutral.mjs`，交付件中若出现“中性”、`neutral` 或未知品牌残留会阻止导出，禁止用全局删词来绕过检查。

### 截图更新与复核

`scripts/neutral-images.json` 是人工维护的审查清单，**不是自动生成后即可批准的文件**。每张实际引用的中文截图都必须登记，包括无需清除的截图：

- `sha256`：原始文件的 SHA-256；`width`／`height`：原始像素尺寸；`reviewed`：人工复核日期。
- `regions`：经复核的像素区域，含 `x`／`y`／`width`／`height`、背景色 `background`、替换文字 `text`、处理原因 `reason`；空数组表示已确认无需处理。
- 有文字替换时，使用 `fontSize`／`fontFamily`／`color` 描述样式。坐标均以原图像素为准，空文字表示清除。

更新流程：先检查完整原图，定位所有品牌、域名、联系方式和 Logo；记录清除区域，使用 `neutralImage` 生成临时副本，与原图逐区域比对并对完整图片做 OCR 辅助检查；确认参数、按钮及操作说明未受损后，才更新哈希、尺寸与 `reviewed`。可用 `shasum -a 256 public/img/...png` 读取哈希。不得只更新哈希使检查通过，不得自动接受旧区域。

导出逐张核对清单和源图，同时比对 `dist/` 实际提供的图片，防止使用旧构建。新增图片、同尺寸内容变化、尺寸变化、缺少审查记录、区域越界或旧构建都会报错，必须人工复核或重新构建后再运行。品牌清除直接修改副本像素，PDF 不嵌入原始品牌图片或可移除的遮盖层。

自动检查涵盖正文、替代文本、链接、PDF 书签／注释／元数据及失效页面目标；发布前仍需渲染 PDF 检查封面、目录、表格、代码分行和所有处理过的截图。图片 OCR 只作复核辅助，不代替人工审查，也不会自动更新清单。

本册交付文件名：`gateway-manual-zh-CN-v<版本>.pdf`。
