# CLAUDE.md

Guidance for Claude Code when working in this repo — the Starlight/Astro site for the 《彼络物联网关 说明书》
(Gateway user manual, Chinese + English). This is a git submodule of `bivrost.iot`, checked out at
`docs/bivrost-gateway-docs` there.

Read `README.md` first — it already covers dev/build commands, the PDF export pipeline, the
中文中性PDF (neutral/de-branded PDF) workflow and its screenshot-review requirements, the writing/
i18n conventions (anchors, asides, cross-language link rules), and 固件版本同步 (the rules for keeping this
manual in step with firmware releases). Don't re-derive those from source; this file only adds what's not in
README.md.

## Firmware releases

Every version in the outer repo's `Changelog.md` (≥ the baseline) needs an entry in `firmware-sync.json`.
The rules for choosing `done` / `n/a` are in README.md「固件版本同步」, and the outer repo's `CLAUDE.md` does not
repeat them. `pnpm check:firmware` verifies the ledger. The outer repo's `publish-gateway.ps1` runs the same
check and refuses to publish while it fails.

- Record the decision in the same change that edits the content; don't defer it to a later sweep.
- UI wording comes from the in-repo Angular app: `bivrost.iot/Bivrost.IOT.Gateway/web/public/i18n/{zh,en}/*.json`.
- `scripts/check-firmware-sync.mjs` is kept byte-identical with the protocol docs repo. Change both copies
  together; put per-repo differences in `firmware-sync.json`.
- So are `src/data/device-support.json`, `scripts/lib/render-support.mjs` and
  `scripts/render-support-tables.mjs`, which generate 4.5. 支持设备 here and 1.4. 接口支持说明 in the protocol
  docs from the same data. Nothing derives that data from the gateway sources — it is hand-written, and the
  outer repo's `CLAUDE.md` requires updating it alongside interface and field changes. See README「支持设备表」.

## VERSION file

`VERSION` (single line, e.g. `1.19.7.41`) is the sole source of truth for the manual's version — read by
`astro.config.mjs`, `src/pages/print.astro` / `src/pages/en/print.astro`, and `scripts/generate-pdf.mjs`.

- Bump it to the firmware version whenever this manual documents that release (a `done` entry). Leave it alone
  for `n/a` releases. The firmware check fails if `VERSION` is below the highest `done` version.
- Also update the `**v…**` mention in README.md's first paragraph. `pnpm build` runs `scripts/check-version.mjs`
  first and fails if the two differ.

## Committing

This is its own git repository (submodule). Commit changes here first, then the outer `bivrost.iot` repo
needs its submodule pointer bumped separately (`.\update-submodules.ps1` from the outer repo root, or a
manual `git add docs/bivrost-gateway-docs`).
