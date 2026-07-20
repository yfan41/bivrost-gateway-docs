// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import remarkHeadingId from 'remark-heading-id';

// The manual is served under a subpath: https://docs.bivrost.cn/gateway/.
const base = '/gateway';
// Prefix used to rebase hand-authored root-absolute links (see plugin below):
// the base with any trailing slash removed.
const basePrefix = base.replace(/\/+$/, '');

// The docs author internal links and images as root-absolute paths
// (e.g. [x](/usage/network/), ![](/img/manual/...)). Astro/Starlight only rebase
// their OWN generated URLs (assets, sidebar, relative links) under a non-root
// `base`; hand-authored absolute paths are left untouched and would 404 once
// served from /gateway. This rehype plugin prefixes them with the base at build
// time so the site works under the subfolder and the links validator stays green.
// (Mirrors the hast plugin in the protocol-docs repo, adapted to rehype since this
// repo uses the default markdown processor rather than satteri.)
function rehypeRebaseAbsoluteLinks() {
  return (/** @type {any} */ tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (
        node.type === 'element' &&
        (node.tagName === 'a' || node.tagName === 'img')
      ) {
        const key = node.tagName === 'img' ? 'src' : 'href';
        const url = node.properties?.[key];
        if (
          typeof url === 'string' &&
          url.startsWith('/') &&
          !url.startsWith('//') && // protocol-relative → external, leave alone
          !url.startsWith(basePrefix + '/') &&
          url !== basePrefix
        ) {
          node.properties[key] = basePrefix + url;
        }
      }
      if (node.children) for (const child of node.children) walk(child);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://docs.bivrost.cn',
  base,
  markdown: {
    // Support Docusaurus-style explicit heading anchors: ## 标题 {#anchor}
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [rehypeRebaseAbsoluteLinks],
  },
  integrations: [
    starlight({
      title: '彼络物联网关 说明书',
      description:
        '数控机床、激光焊接机、机器人、PLC 等设备的数据采集与加工程序传送服务',
      favicon: '/img/favicon.ico',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Bivrost',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/Footer.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      pagination: true,
      plugins: [starlightLinksValidator()],
      sidebar: [
        { label: '产品使用协议', slug: 'license' },
        { label: '一、简介', link: '/' },
        { label: '二、配件列表', slug: 'accessories' },
        { label: '三、基本参数', slug: 'specs' },
        { label: '四、联网说明', slug: 'networking' },
        {
          label: '五、网关使用',
          collapsed: false,
          items: [
            { label: '概述', slug: 'usage' },
            { label: '5.1. 登录', slug: 'usage/login' },
            { label: '5.2. 主页', slug: 'usage/home' },
            { label: '5.3. 机台配置', slug: 'usage/machines' },
            { label: '5.4. 机组配置', slug: 'usage/groups' },
            { label: '5.5. 任务配置', slug: 'usage/tasks' },
            { label: '5.6. 通讯配置', slug: 'usage/communication' },
            { label: '5.7. 网络配置', slug: 'usage/network' },
            { label: '5.8. 接口测试', slug: 'usage/api-test' },
            { label: '5.9. 程序传输', slug: 'usage/file-transfer' },
            { label: '5.10. 数据分析', slug: 'usage/analysis' },
            { label: '5.11. 监控台', slug: 'usage/monitor' },
            { label: '5.12. 设置', slug: 'usage/settings' },
            { label: '5.13. 其它', slug: 'usage/misc' },
          ],
        },
        {
          label: '六、补充说明',
          collapsed: true,
          items: [
            { label: '概述', slug: 'reference' },
            { label: '6.1. 名词解释', slug: 'reference/glossary' },
            { label: '6.2. 命令格式', slug: 'reference/command-format' },
          ],
        },
        { label: '七、常见问题', slug: 'faq' },
        { label: '八、已知问题', slug: 'known-issues' },
        {
          label: '版本变更历史记录',
          slug: 'changelog',
          badge: { text: 'v1.19.7', variant: 'note' },
        },
      ],
    }),
  ],
});
