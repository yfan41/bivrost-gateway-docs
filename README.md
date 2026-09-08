# 彼络物联网关 说明书（文档站）

基于 [Starlight](https://starlight.astro.build/)（Astro）的《彼络物联网关 说明书》在线文档，内容对应说明书 **v1.19.7.22**，截图取自当前版本的网关 Web 管理页面。

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
- `src/styles/custom.css` — 品牌色与截图卡片样式
- `src/styles/print-manual.css` — 整本 PDF 的版式、分页、表格与截图样式
- `src/sidebar.mjs` — 章节顺序（侧边栏与 PDF 共用）
- `src/components/Footer.astro` — 页脚版权信息
- `src/components/SocialIcons.astro` — 顶栏「下载 PDF」按钮（Starlight 在顶栏与移动端菜单都会渲染此组件）
- `src/pages/print.astro`、`src/pages/en/print.astro` — 整本合并的打印页
- `scripts/generate-pdf.mjs` — 用 headless Chromium 把打印页导出为 PDF

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
