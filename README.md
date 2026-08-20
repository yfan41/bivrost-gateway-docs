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
