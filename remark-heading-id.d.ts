// remark-heading-id ships no type declarations and there is no
// @types/remark-heading-id package. Declare it as a remark plugin so
// astro.config.mjs type-checks under `// @ts-check`.
declare module 'remark-heading-id' {
  import type { Plugin } from 'unified';
  const remarkHeadingId: Plugin<[{ defaults?: boolean; uniqueDefaults?: boolean }?]>;
  export default remarkHeadingId;
}
