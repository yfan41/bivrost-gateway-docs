// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import starlightLinksValidator from 'starlight-links-validator';
// Chapter order lives in one place so the PDF export cannot drift from the nav.
import { getSidebar } from './src/sidebar.mjs';

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
        // Starlight renders SocialIcons in BOTH the desktop header right-group and the
        // mobile menu drawer (MobileMenuFooter.astro), so this one override puts the
        // PDF download link in every header placement without forking Header.astro.
        SocialIcons: './src/components/SocialIcons.astro',
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
      sidebar: getSidebar(version),
    }),
  ],
});
