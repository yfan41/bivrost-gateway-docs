#!/usr/bin/env node
// Checks that every gateway firmware release has a recorded docs decision.
//
// The firmware's source of truth is Changelog.md in the outer bivrost.iot repo
// (this repo is its submodule at docs/<name>, so the default path is
// ../../Changelog.md). firmware-sync.json at this repo's root records, for every
// firmware version >= baseline, whether this repo documented it:
//
//   done     — the version has an entry in src/content/docs/changelog.md AND
//              en/changelog.md (checked here)
//   n/a      — nothing user-visible for this repo; say why in "note"
//   pending  — known to need docs, not written yet (always fails)
//
// Rules for choosing a status live in README.md (固件版本同步). This script is
// deliberately identical in bivrost-gateway-docs and bivrost-gateway-protocol-docs;
// the per-repo differences are in firmware-sync.json ("changelogFormat",
// "checkVersionFile").
//
// Usage: node scripts/check-firmware-sync.mjs [--changelog <path/to/Changelog.md>]
// When the firmware changelog is not present (standalone clone, CI), it skips.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(p, 'utf8').replace(/^﻿/, '');

const argv = process.argv.slice(2);
const at = argv.indexOf('--changelog');
const changelogPath = at >= 0 && argv[at + 1] ? resolve(argv[at + 1]) : resolve(root, '../../Changelog.md');

if (!existsSync(changelogPath)) {
  console.log(`- 跳过固件版本同步检查：找不到固件 Changelog.md（${changelogPath}）`);
  process.exit(0);
}

const ledger = JSON.parse(read(resolve(root, 'firmware-sync.json')));
const { baseline, changelogFormat, checkVersionFile = false, releases = {} } = ledger;

const parts = (v) => v.split('.').map(Number);
const cmp = (a, b) => {
  const [x, y] = [parts(a), parts(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d;
  }
  return 0;
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const entryRe = {
  table: (v) => new RegExp(`^\\|\\s*${esc(v)}\\s*\\|`, 'm'), // | 1.19.7.41 | ... |
  heading: (v) => new RegExp(`^###\\s+v${esc(v)}(?![\\d.])`, 'm'), // ### v1.19.7.41（…）
}[changelogFormat];
if (!entryRe) {
  console.error(`✗ firmware-sync.json: changelogFormat 必须是 "table" 或 "heading"，现为 ${JSON.stringify(changelogFormat)}`);
  process.exit(1);
}

const docsChangelogs = ['src/content/docs/changelog.md', 'src/content/docs/en/changelog.md'].map((file) => ({
  file,
  text: read(resolve(root, file)),
}));

const firmware = [...read(changelogPath).matchAll(/^## Version (\d+(?:\.\d+)+)/gm)]
  .map((m) => m[1])
  .filter((v) => cmp(v, baseline) >= 0);

const errors = [];
let done = 0;
let na = 0;

for (const v of firmware) {
  const entry = releases[v];
  if (!entry) {
    errors.push(`${v}：firmware-sync.json 没有登记（按 README.md「固件版本同步」判断 done / n/a）`);
    continue;
  }
  switch (entry.status) {
    case 'done': {
      done++;
      for (const { file, text } of docsChangelogs) {
        if (!entryRe(v).test(text)) errors.push(`${v}：标记为 done，但 ${file} 里没有该版本的条目`);
      }
      break;
    }
    case 'n/a':
      na++;
      if (!entry.note) errors.push(`${v}：n/a 需要在 note 里写明原因`);
      break;
    case 'pending':
      errors.push(`${v}：仍为 pending${entry.note ? `（${entry.note}）` : ''}`);
      break;
    default:
      errors.push(`${v}：status 必须是 done / n/a / pending，现为 ${JSON.stringify(entry.status)}`);
  }
}

for (const v of Object.keys(releases)) {
  if (!firmware.includes(v) && cmp(v, baseline) >= 0) {
    console.warn(`! ${v}：已登记，但固件 Changelog.md 中没有该版本（版本号被改过？）`);
  }
}

if (checkVersionFile) {
  const version = read(resolve(root, 'VERSION')).trim();
  const highestDone = firmware.filter((v) => releases[v]?.status === 'done').sort(cmp).at(-1);
  if (highestDone && cmp(version, highestDone) < 0) {
    errors.push(`VERSION 为 ${version}，低于已标记 done 的最高固件版本 ${highestDone}；请升 VERSION 并同步 README.md 首段`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  console.error(`\n固件版本同步检查未通过（${errors.length} 项）。规则见本仓库 README.md「固件版本同步」。`);
  process.exit(1);
}

console.log(`✓ 固件版本同步：${firmware.length} 个版本（≥ ${baseline}）已登记，done ${done}，n/a ${na}`);
