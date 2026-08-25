// @ts-check
/**
 * Single source of truth for the manual's chapter order.
 *
 * Imported by astro.config.mjs (for the Starlight sidebar) and by
 * src/components/PrintManual.astro (for the PDF's section order), so the PDF can
 * never drift from the site navigation.
 *
 * NOTE: no filesystem access in this module. It is bundled into the SSR build for
 * the print routes, where `import.meta.url` points into a temp dist chunk and fs
 * paths would break — the same trap documented in src/components/Footer.astro.
 * The version is therefore passed in rather than read from VERSION here.
 */

/**
 * @param {string} version doc version, for the changelog badge
 * @returns {import('@astrojs/starlight/types').StarlightUserConfig['sidebar']}
 */
export function getSidebar(version) {
  return [
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
        {
          label: '4.3. 集群故障切换（选装）',
          translations: { en: '4.3. Cluster Failover (Optional)' },
          slug: 'reference/cluster',
        },
        {
          label: '4.4. MCP 服务',
          translations: { en: '4.4. MCP Service' },
          slug: 'reference/mcp',
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
  ];
}

/**
 * @typedef {{ slug: string, depth: number }} PrintChapter
 */

/**
 * Ordered doc slugs, depth-first — the manual's reading order, each with the nesting
 * level the printed table of contents indents by.
 *
 * Group nodes contribute ORDER and NESTING ONLY and are deliberately not emitted:
 * each group's first child is its overview page, whose frontmatter title already
 * equals the group label (the group '三、网关使用' is the title of usage/index.md).
 * Emitting both would duplicate the chapter heading in the PDF — and since that
 * overview page IS the chapter the group is named after, it stays at the group's own
 * level; only the clauses under it ('3.1.', '3.2.', …) indent.
 *
 * @param {ReturnType<typeof getSidebar>} items
 * @returns {PrintChapter[]}
 */
export function flattenSidebar(items) {
  /** @type {PrintChapter[]} */
  const out = [];
  /** @param {any[]} nodes @param {number} depth */
  const walk = (nodes, depth) => {
    for (const node of nodes) {
      if (Array.isArray(node.items)) {
        node.items.forEach((/** @type {any} */ child, /** @type {number} */ i) =>
          walk([child], i === 0 ? depth : depth + 1)
        );
      } else if (typeof node.slug === 'string') {
        out.push({ slug: node.slug, depth });
      }
    }
  };
  walk(items ?? [], 0);
  return out;
}

/**
 * Sidebar slug → content-collection entry id for a locale.
 *
 * Astro's glob loader strips a trailing `/index` when deriving ids, so
 * src/content/docs/en/index.md has the id `en`, not `en/index`.
 *
 * @param {string} slug sidebar slug (locale-free, e.g. 'usage/login')
 * @param {'en' | undefined} locale
 */
export function entryIdFor(slug, locale) {
  if (!locale) return slug;
  return slug === 'index' ? locale : `${locale}/${slug}`;
}
