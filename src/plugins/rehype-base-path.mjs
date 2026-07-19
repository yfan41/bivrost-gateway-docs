/**
 * The docs content links to other pages and images using root-absolute paths
 * (e.g. `/usage/login/`, `/img/manual/...`), which only resolve correctly when
 * the site is served from `/`. This rewrites those hrefs/srcs to be relative
 * to Astro's configured `base` so the site also works from a subpath
 * (e.g. `/docs/gateway`). Starlight's own generated navigation already
 * accounts for `base`; this only needs to cover links written in content.
 */
export default function rehypeBasePath({ base } = {}) {
  const normalizedBase = base && base !== '/' ? base.replace(/\/$/, '') : '';

  return (tree) => {
    if (!normalizedBase) return;
    walk(tree);
  };

  function walk(node) {
    if (node.type === 'element' && node.properties) {
      for (const attr of ['href', 'src']) {
        const value = node.properties[attr];
        if (
          typeof value === 'string' &&
          value.startsWith('/') &&
          !value.startsWith('//') &&
          value !== normalizedBase &&
          !value.startsWith(`${normalizedBase}/`)
        ) {
          node.properties[attr] = normalizedBase + value;
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  }
}
