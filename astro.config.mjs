// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import starlightLinksValidator from 'starlight-links-validator';

// Single source of truth for the doc version (also drives the CI base path and
// the deploy subdir). See VERSION at the repo root.
const version = readFileSync(new URL('./VERSION', import.meta.url), 'utf8').trim();

// The manual is served in place at https://docs.bivrost.cn/gateway/ (latest) and
// as a frozen snapshot at /gateway/v<version>/. The deploy workflow sets DOCS_BASE
// explicitly for both, so nothing in CI depends on the fallback below. Default '/'
// for local dev, matching the protocol-docs repo — `pnpm dev` serves at
// localhost:<port>/ rather than under /gateway/. A hand-run `pnpm build` therefore
// produces a root-based site: pass DOCS_BASE=/gateway if you mean to upload it.
const docsBase = process.env.DOCS_BASE || '/';
// Prefix used to rebase hand-authored root-absolute links (see plugin below):
// '' when serving from root, otherwise the base with any trailing slash removed.
const basePrefix = docsBase === '/' ? '' : docsBase.replace(/\/+$/, '');

// The docs author internal links and images as root-absolute paths
// (e.g. [x](/usage/network/), ![](/img/manual/...)). Astro/Starlight only rebase
// their OWN generated URLs (assets, sidebar, relative links) under a non-root
// `base`; hand-authored absolute paths are left untouched and would 404 once
// served from a subfolder. This hast plugin prefixes them with the base at build
// time so the site works under the subfolder and the links validator stays green.
// (Same shape as the rebase plugin in the protocol-docs repo.)
const rebaseAbsoluteLinks = {
  name: 'rebase-absolute-links',
  element: [
    {
      filter: ['a', 'img'],
      /**
       * @param {any} node hast element node (satteri does not type its hastPlugins)
       * @param {any} ctx satteri visitor context (exposes setProperty)
       */
      visit(node, ctx) {
        if (!basePrefix) return;
        const key = node.tagName === 'img' ? 'src' : 'href';
        const url = node.properties?.[key];
        if (
          typeof url === 'string' &&
          url.startsWith('/') &&
          !url.startsWith('//') && // protocol-relative → external, leave alone
          !url.startsWith(basePrefix + '/') &&
          url !== basePrefix
        ) {
          ctx.setProperty(node, key, basePrefix + url);
        }
      },
    },
  ],
};

export default defineConfig({
  site: 'https://docs.bivrost.cn',
  base: docsBase,
  markdown: {
    // headingAttributes：支持自定义标题锚点语法 ## 标题 {#anchor}
    processor: satteri({
      features: { headingAttributes: true },
      hastPlugins: [rebaseAbsoluteLinks],
    }),
  },
  integrations: [
    starlight({
      title: {
        'zh-CN': '彼络物联网关 说明书',
        en: 'Bivrost IoT Gateway Manual',
      },
      description:
        '数控机床、激光焊接机、机器人、PLC 等设备的数据采集与加工程序传送服务',
      favicon: '/img/favicon.ico',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Bivrost',
      },
      // 简体中文 is served at the root (/gateway/...); English lives under
      // /gateway/en/... with its own content tree in src/content/docs/en/.
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        en: { label: 'English', lang: 'en' },
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/Footer.astro',
        Hero: './src/components/Hero.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      pagination: true,
      // errorOnRelativeLinks off: the front page (index.md) authors its hero
      // actions and quick-link cards as relative links (`networking/`), because
      // the validator reads frontmatter and raw-HTML hrefs from the source
      // BEFORE the rebaseAbsoluteLinks plugin runs — root-absolute links there
      // would fail validation under DOCS_BASE=/gateway even though the rendered
      // output is correct. Relative links resolve under any base and are still
      // existence-checked by the validator. Body prose keeps the root-absolute
      // convention.
      plugins: [starlightLinksValidator({ errorOnRelativeLinks: false })],
      // One tree for both locales: Starlight resolves each `slug` to the entry
      // of the current locale (e.g. `usage/login` → `en/usage/login`), so only
      // the labels need translating.
      sidebar: [
        {
          label: '产品使用协议',
          translations: { en: 'Product Licence Agreement' },
          slug: 'license',
        },
        {
          label: '一、简介',
          translations: { en: '1. Introduction' },
          slug: 'index',
        },
        {
          label: '二、联网说明',
          translations: { en: '2. Networking' },
          slug: 'networking',
        },
        {
          label: '三、网关使用',
          translations: { en: '3. Using the Gateway' },
          collapsed: false,
          items: [
            {
              label: '概述',
              translations: { en: 'Overview' },
              slug: 'usage',
            },
            {
              label: '3.1. 登录',
              translations: { en: '3.1. Signing In' },
              slug: 'usage/login',
            },
            {
              label: '3.2. 主页',
              translations: { en: '3.2. Home' },
              slug: 'usage/home',
            },
            {
              label: '3.3. 机台配置',
              translations: { en: '3.3. Machines' },
              slug: 'usage/machines',
            },
            {
              label: '3.4. 机组配置',
              translations: { en: '3.4. Groups' },
              slug: 'usage/groups',
            },
            {
              label: '3.5. 任务配置',
              translations: { en: '3.5. Tasks' },
              slug: 'usage/tasks',
            },
            {
              label: '3.6. 通讯配置',
              translations: { en: '3.6. Communication' },
              slug: 'usage/communication',
            },
            {
              label: '3.7. 网络配置',
              translations: { en: '3.7. Network' },
              slug: 'usage/network',
            },
            {
              label: '3.8. 接口测试',
              translations: { en: '3.8. API Test' },
              slug: 'usage/api-test',
            },
            {
              label: '3.9. 程序传输',
              translations: { en: '3.9. File Transfer' },
              slug: 'usage/file-transfer',
            },
            {
              label: '3.10. 数据分析',
              translations: { en: '3.10. Analysis' },
              slug: 'usage/analysis',
            },
            {
              label: '3.11. 监控台',
              translations: { en: '3.11. Monitor' },
              slug: 'usage/monitor',
            },
            {
              label: '3.12. 设置',
              translations: { en: '3.12. Settings' },
              slug: 'usage/settings',
            },
            {
              label: '3.13. 其它',
              translations: { en: '3.13. Other' },
              slug: 'usage/misc',
            },
          ],
        },
        {
          label: '四、补充说明',
          translations: { en: '4. Appendices' },
          collapsed: true,
          items: [
            {
              label: '概述',
              translations: { en: 'Overview' },
              slug: 'reference',
            },
            {
              label: '4.1. 名词解释',
              translations: { en: '4.1. Glossary' },
              slug: 'reference/glossary',
            },
            {
              label: '4.2. 命令格式',
              translations: { en: '4.2. Command Format' },
              slug: 'reference/command-format',
            },
          ],
        },
        {
          label: '五、常见问题',
          translations: { en: '5. FAQ' },
          slug: 'faq',
        },
        {
          label: '六、已知问题',
          translations: { en: '6. Known Issues' },
          slug: 'known-issues',
        },
        {
          label: '版本变更历史记录',
          translations: { en: 'Changelog' },
          slug: 'changelog',
          badge: { text: `v${version}`, variant: 'note' },
        },
      ],
    }),
  ],
});
