# 彼络物联网关 说明书（文档站）

基于 [Starlight](https://starlight.astro.build/)（Astro）的《彼络物联网关 说明书》在线文档，内容对应说明书 **v1.19.7**，截图取自当前版本的网关 Web 管理页面。

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

## 目录结构

- `src/content/docs/` — 简体中文正文；侧边栏结构在 `astro.config.mjs` 中定义，与说明书目录一致
- `src/content/docs/en/` — 英文正文，文件名与中文一一对应（Starlight 按 `slug` 自动匹配两个语言的同名页面）
- `public/img/manual/<章节>/` — 各章节中文界面截图（取自当前 Web UI）
- `public/img/manual/en/<章节>/` — 各章节英文界面截图，文件名与中文版一一对应
- `src/assets/logo.png` — 从说明书 PDF 提取的透明底 Logo（导航栏用）
- `src/styles/custom.css` — 品牌色与截图卡片样式
- `src/components/Footer.astro` — 页脚版权信息

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
