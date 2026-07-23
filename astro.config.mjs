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
// as a frozen snapshot at /gateway/v<version>/. CI sets DOCS_BASE per build; the
// default '/gateway' keeps local dev and a plain `pnpm build` on the latest path.
const docsBase = process.env.DOCS_BASE || '/gateway';
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
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      pagination: true,
      plugins: [starlightLinksValidator()],
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
          label: '二、配件列表',
          translations: { en: '2. Packing List' },
          slug: 'accessories',
        },
        {
          label: '三、基本参数',
          translations: { en: '3. Specifications' },
          slug: 'specs',
        },
        {
          label: '四、联网说明',
          translations: { en: '4. Networking' },
          slug: 'networking',
        },
        {
          label: '五、网关使用',
          translations: { en: '5. Using the Gateway' },
          collapsed: false,
          items: [
            {
              label: '概述',
              translations: { en: 'Overview' },
              slug: 'usage',
            },
            {
              label: '5.1. 登录',
              translations: { en: '5.1. Signing In' },
              slug: 'usage/login',
            },
            {
              label: '5.2. 主页',
              translations: { en: '5.2. Home' },
              slug: 'usage/home',
            },
            {
              label: '5.3. 机台配置',
              translations: { en: '5.3. Machines' },
              slug: 'usage/machines',
            },
            {
              label: '5.4. 机组配置',
              translations: { en: '5.4. Groups' },
              slug: 'usage/groups',
            },
            {
              label: '5.5. 任务配置',
              translations: { en: '5.5. Tasks' },
              slug: 'usage/tasks',
            },
            {
              label: '5.6. 通讯配置',
              translations: { en: '5.6. Communication' },
              slug: 'usage/communication',
            },
            {
              label: '5.7. 网络配置',
              translations: { en: '5.7. Network' },
              slug: 'usage/network',
            },
            {
              label: '5.8. 接口测试',
              translations: { en: '5.8. API Test' },
              slug: 'usage/api-test',
            },
            {
              label: '5.9. 程序传输',
              translations: { en: '5.9. File Transfer' },
              slug: 'usage/file-transfer',
            },
            {
              label: '5.10. 数据分析',
              translations: { en: '5.10. Analysis' },
              slug: 'usage/analysis',
            },
            {
              label: '5.11. 监控台',
              translations: { en: '5.11. Monitor' },
              slug: 'usage/monitor',
            },
            {
              label: '5.12. 设置',
              translations: { en: '5.12. Settings' },
              slug: 'usage/settings',
            },
            {
              label: '5.13. 其它',
              translations: { en: '5.13. Other' },
              slug: 'usage/misc',
            },
          ],
        },
        {
          label: '六、补充说明',
          translations: { en: '6. Appendices' },
          collapsed: true,
          items: [
            {
              label: '概述',
              translations: { en: 'Overview' },
              slug: 'reference',
            },
            {
              label: '6.1. 名词解释',
              translations: { en: '6.1. Glossary' },
              slug: 'reference/glossary',
            },
            {
              label: '6.2. 命令格式',
              translations: { en: '6.2. Command Format' },
              slug: 'reference/command-format',
            },
          ],
        },
        {
          label: '七、常见问题',
          translations: { en: '7. FAQ' },
          slug: 'faq',
        },
        {
          label: '八、已知问题',
          translations: { en: '8. Known Issues' },
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
