#!/usr/bin/env node
// Fills the generated table blocks in the manual from src/data/device-support.json.
//
// Each block is delimited in the .md source by
//
//   <!-- support:matrix type=CNC group=basic -->
//   …generated table…
//   <!-- /support -->
//
// and the kinds are `devices` (the manual's device list), `catalogue` and
// `matrix` (the protocol book's interface index and support matrices).
// Everything outside the markers is hand-written prose and is never touched.
//
// Run it after editing the data file. `pnpm check:support` (which runs before
// every build) fails if a block is stale, so a forgotten run cannot ship.
//
// Pages are found by scanning the content tree for the opening marker rather
// than being listed here, so this file — like everything under scripts/lib and
// src/data/device-support.json — is byte-identical in bivrost-gateway-docs and
// bivrost-gateway-protocol-docs even though the two books render different
// blocks. Change one copy and copy it across.
//
// Usage: node scripts/render-support-tables.mjs [--check]
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOCK_RE, parseSpec, render } from './lib/render-support.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentRoot = resolve(root, 'src/content/docs');

function* walkMarkdown(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* walkMarkdown(p);
    else if (entry.endsWith('.md')) yield p;
  }
}

/** Every content page carrying generated blocks, with the locale it renders in. */
export function pages() {
  const out = [];
  for (const path of walkMarkdown(contentRoot)) {
    const current = readFileSync(path, 'utf8');
    if (!current.includes('<!-- support:')) continue;
    const rel = relative(contentRoot, path).split(sep);
    out.push({ file: relative(root, path), path, lang: rel[0] === 'en' ? 'en' : 'zh', current });
  }
  return out.sort((a, b) => a.file.localeCompare(b.file));
}

/** Returns [{ file, path, current, next }] for every page with generated blocks. */
export function renderAll() {
  const data = JSON.parse(readFileSync(resolve(root, 'src/data/device-support.json'), 'utf8'));
  return pages().map(({ file, path, lang, current }) => {
    const next = current.replace(BLOCK_RE, (_all, open, kind, attrs, close) =>
      `${open}\n${render(data, parseSpec(kind, attrs), lang)}\n${close}`);
    return { file, path, current, next };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes('--check');
  const stale = [];
  for (const page of renderAll()) {
    if (page.current === page.next) continue;
    if (check) stale.push(page.file);
    else {
      writeFileSync(page.path, page.next);
      console.log(`已更新 ${page.file}`);
    }
  }
  if (check && stale.length) {
    console.error('以下页面中的生成表格已过期，请运行 `pnpm render:support`：');
    for (const f of stale) console.error(`  - ${f}`);
    process.exit(1);
  }
  if (!check && stale.length === 0) console.log('生成表格已是最新。');
}
