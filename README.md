# 彼络物联网关 说明书（文档站）

基于 [Starlight](https://starlight.astro.build/)（Astro）的《彼络物联网关 说明书》在线文档，内容对应说明书 **v1.19.6**，截图取自当前版本的网关 Web 管理页面。

## 开发

```bash
pnpm install
pnpm dev          # 本地开发服务器（热更新）
```

## 构建与预览

```bash
pnpm build        # 生成静态站点到 dist/（starlight-links-validator 校验所有内部链接与锚点，失败即报错）
pnpm preview      # 本地预览 dist/ 产物
```

## 目录结构

- `src/content/docs/` — 文档正文，侧边栏结构在 `astro.config.mjs` 中定义，与说明书目录一致
- `public/img/manual/<章节>/` — 各章节截图（取自当前 Web UI）
- `src/assets/logo.png` — 从说明书 PDF 提取的透明底 Logo（导航栏用）
- `src/styles/custom.css` — 品牌色与截图卡片样式
- `src/components/Footer.astro` — 页脚版权信息

## 写作约定

- 标题锚点使用 `## 标题 {#anchor}` 语法（由 `remark-heading-id` 支持），与说明书 PDF 的编号锚点保持一致
- 提示框使用 Starlight aside 语法：`:::note[注]` / `:::caution[注意]`（不支持 `:::info`，用 `note` 代替）
- 页面标题由 frontmatter `title` 渲染为 H1，正文中不要再写 `#` 一级标题

## 更新截图

截图使用 playwright-cli 从本地运行的网关 Web 页面（`bivrost-gateway-web` 仓库，`pnpm start`，中文界面，1440×900 视口）捕获。注意：调整视口大小需在登录前完成（页面刷新会丢失内存中的登录状态）。
