#!/usr/bin/env node
// Guards the literal version strings that cannot be derived at build time.
//
// VERSION at the repo root is the manual's single source of truth; astro.config,
// the print pages and the PDF generator all read it. README.md spells the number
// out in prose, and it has drifted before (VERSION and README said 1.19.7.22
// while the changelog had already documented 1.19.7.37). Runs before
// `pnpm build`.
import { readFileSync } from 'node:fs';

const version = readFileSync(new URL('../VERSION', import.meta.url), 'utf8').trim();

// Each target: the file, and a regex whose first capture group is the version
// string as written in that file.
const targets = [{ file: 'README.md', re: /内容对应说明书 \*\*v([\d.]+)\*\*/ }];

let failed = false;

for (const { file, re } of targets) {
  const lines = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8').split('\n');
  const idx = lines.findIndex((l) => re.test(l));

  if (idx === -1) {
    console.error(`✗ ${file}: 找不到版本号（正则 ${re} 无匹配）——文案改动后请同步更新 scripts/check-version.mjs`);
    failed = true;
    continue;
  }

  const found = lines[idx].match(re)[1];
  if (found !== version) {
    console.error(`✗ ${file}:${idx + 1}: 写着 v${found}，VERSION 是 ${version}`);
    failed = true;
  }
}

if (failed) {
  console.error(`\n说明书版本真值是根目录 VERSION（现为 ${version}）。请改上述文件，或先确认 VERSION 是否该升版。`);
  process.exit(1);
}

console.log(`✓ 版本号一致：v${version}（${targets.length} 处字面量）`);
