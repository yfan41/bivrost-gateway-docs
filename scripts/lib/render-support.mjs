// Renders the支持矩阵与字段支持 tables of src/data/device-support.json as GitHub-flavoured
// Markdown, for injection into the manual's .md pages.
//
// Why generated Markdown rather than an Astro component: the content pipeline is
// a custom satteri processor configured in astro.config.mjs (`markdown.processor`),
// which supplies both the `## 标题 {#anchor}` syntax the whole manual relies on
// and the rebaseAbsoluteLinks plugin that makes root-absolute links work under
// the /gateway base. Astro's MDX integration does not run that processor, and MDX
// additionally parses `{#anchor}` as a JSX expression and fails. Plain .md keeps
// the PDF export, the neutral-PDF text checks and the links validator working
// exactly as before, and the JSON stays the single source of truth.

const MARK = {
  y: { glyph: '✓', cls: 'sup-y', zh: '已支持', en: 'Supported' },
  d: { glyph: '◐', cls: 'sup-d', zh: '开发中', en: 'In development' },
  n: { glyph: '✗', cls: 'sup-n', zh: '不支持', en: 'Not supported' },
};

const L = {
  system: { zh: '系统［型号］', en: 'System [Model]' },
  brand: { zh: '系统', en: 'System' },
  models: { zh: '型号', en: 'Models' },
  state: { zh: '状态', en: 'State' },
  iface: { zh: '接口', en: 'Interface' },
  fieldsOf: { zh: '字段', en: 'Fields' },
  sparse: {
    zh: '未列出的系统型号不返回这些字段。',
    en: 'Systems not listed return none of these fields.',
  },
  desc: { zh: '数据内容', en: 'Data' },
  table: { zh: '所在表', en: 'Table' },
  ref: { zh: '《通讯协议》章节', en: 'Protocol Manual' },
  legend: {
    zh: '✓ 已支持；　◐ 开发中；　✗ 不支持',
    en: '✓ Supported;　◐ In development;　✗ Not supported',
  },
};

/** A support cell, carrying its meaning in `title` for screen readers and tooltips. */
function mark(value, lang) {
  const m = MARK[value] ?? MARK.n;
  return `<span class="${m.cls}" title="${m[lang]}">${m.glyph}</span>`;
}

/** Markdown needs `|` escaped inside a cell; the model labels use ，/, so this is cheap insurance. */
const esc = (s) => String(s).replace(/\|/g, '\\|');

/**
 * Interface names head narrow columns and have to wrap. `<wbr>` is zero-width,
 * so it keeps the name exactly as it is typed in a URL while offering breaks at
 * the camelCase boundaries — without it the browser splits mid-word
 * ("readC / NCSta / tus").
 */
const wrappable = (id) => id.replace(/(?<=[a-z])(?=[A-Z])/g, '<wbr>');

/**
 * A Markdown table wrapped in a div, because the generated tables need a hook the
 * print stylesheet can target for column widths and Markdown gives a table no
 * class of its own. Remark parses the table normally as long as blank lines
 * separate it from the surrounding HTML block. The `:---:` alignment already
 * centres the mark columns, so no CSS is needed for that.
 */
function table(cls, headers, aligns, rows) {
  const out = [`| ${headers.map(esc).join(' | ')} |`, `| ${aligns.join(' | ')} |`];
  for (const row of rows) out.push(`| ${row.join(' | ')} |`);
  return `<div class="${cls}">\n\n${out.join('\n')}\n\n</div>`;
}

/** 4.5.1 — every interface with its group and its 《通讯协议》 section. */
export function renderCatalogue(data, lang) {
  const groupName = (id) => data.groups.find((g) => g.id === id)?.[lang] ?? id;
  return table(
    'support-catalogue',
    [L.iface[lang], L.desc[lang], L.table[lang], L.ref[lang]],
    ['---', '---', '---', '---'],
    data.interfaces.map((i) => [`\`${i.id}\``, esc(i[lang]), esc(groupName(i.group)), i.ref]),
  );
}

/** One matrix: rows are 系统［型号］, columns are the interfaces of `groups`. */
export function renderMatrix(data, { type, groups, lang }) {
  const wanted = groups.split(',').map((g) => g.trim()).filter(Boolean);
  const columns = data.interfaces.filter(
    (i) => wanted.includes(i.group) && i.types.includes(type),
  );
  const machineType = data.machineTypes.find((t) => t.id === type);
  const rows = [];
  const footnotes = [];

  for (const sys of machineType.systems) {
    for (const row of sys.rows) {
      const cells = columns.map((c) => {
        const note = (row.notes ?? {})[c.id]?.[lang];
        if (note && !footnotes.includes(note)) footnotes.push(note);
        const sup = note ? `<sup>${footnotes.indexOf(note) + 1}</sup>` : '';
        return mark(row.support[c.id], lang) + sup;
      });
      rows.push([esc(`${sys.brand[lang]}［${row.models[lang]}］`), ...cells]);
    }
  }

  const md = table(
    'support-matrix',
    [L.system[lang], ...columns.map((c) => wrappable(c.id))],
    ['---', ...columns.map(() => ':---:')],
    rows,
  );
  const legend = `\n\n${L.legend[lang]}`;
  const notes = footnotes.length
    ? `\n\n${footnotes.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}`
    : '';
  return md + legend + notes;
}

/**
 * One field table: rows are the 系统［型号］ that support the data class's interface,
 * columns are the fields of that class whose availability differs between them.
 *
 * A field every one of those systems returns is not listed in `dataClasses` at
 * all — it inherits the interface's support, and 1.2. 数据说明 already documents
 * it. So a column here always carries real information, and a row of all ✗ means
 * the system returns only the common fields.
 *
 * Systems that do not support the interface are absent rather than shown as a row
 * of ✗ — 1.4.2 已经回答了那个问题. `part` splits a wide class over successive
 * tables so that none of them exceeds the print column budget.
 *
 * `sparse` is for a class whose fields are vendor exclusives (the extra status
 * fields, say): listing all 44 systems to mark six cells buries the answer, so
 * only the systems that return at least one of the fields get a row and a line
 * under the table states what the blank rows would have said. Every row is still
 * required to carry an explicit entry — the data stays complete, only the table
 * gets shorter.
 */
export function renderFields(data, { type, dataClass, part, lang }) {
  const dc = data.dataClasses.find((c) => c.id === dataClass);
  if (!dc) throw new Error(`未知的数据类 ${dataClass}`);
  const columns = dc.fields.filter((f) => (part ? String(f.part) === String(part) : true));
  if (!columns.length) throw new Error(`数据类 ${dataClass} 没有 part=${part} 的字段`);
  const machineType = data.machineTypes.find((t) => t.id === type);
  const rows = [];
  const footnotes = [];

  for (const sys of machineType.systems) {
    for (const row of sys.rows) {
      const state = row.support[dc.interface];
      if (!state || state === 'n') continue;
      const own = row.fields?.[dc.id];
      if (!own) {
        throw new Error(
          `${sys.brandKey}［${row.models.en}］ 支持 ${dc.interface}，但缺少 fields.${dc.id}；`
          + '请在 src/data/device-support.json 中补齐，不要让它默认渲染成不支持。',
        );
      }
      const cells = columns.map((f) => {
        const note = (row.notes ?? {})[`${dc.id}.${f.id}`]?.[lang];
        if (note && !footnotes.includes(note)) footnotes.push(note);
        const sup = note ? `<sup>${footnotes.indexOf(note) + 1}</sup>` : '';
        return mark(own.includes(f.id) ? state : 'n', lang) + sup;
      });
      if (dc.sparse && !columns.some((f) => own.includes(f.id))) continue;
      rows.push([esc(`${sys.brand[lang]}［${row.models[lang]}］`), ...cells]);
    }
  }

  const md = table(
    'support-fields',
    [L.system[lang], ...columns.map((f) => esc(f[lang]))],
    ['---', ...columns.map(() => ':---:')],
    rows,
  );
  const legend = `\n\n${L.legend[lang]}${dc.sparse ? `　${L.sparse[lang]}` : ''}`;
  const inner = lang === 'zh' ? '`、`' : '`, `';
  const members = `\n\n${L.fieldsOf[lang]}${lang === 'zh' ? '：' : ': '}`
    + columns.map((f) => `${esc(f[lang])} \`${(f.members ?? [f.id]).join(inner)}\``)
      .join(lang === 'zh' ? '；' : '; ');
  const notes = footnotes.length
    ? `\n\n${footnotes.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}`
    : '';
  return md + legend + members + notes;
}

/**
 * The manual's device list: one row per system, every model spelled out, and a
 * state column. It deliberately says nothing about individual interfaces —
 * that belongs to 《通讯协议》1.4. 接口支持说明, which renders `matrix` blocks from
 * this same data file.
 *
 * Rows in the data file are grouped by their support vector, which is invisible
 * here, so a system's rows are flattened back into one model list.
 */
export function renderDevices(data, { type, lang }) {
  const machineType = data.machineTypes.find((t) => t.id === type);
  const join = lang === 'zh' ? '，' : ', ';
  const rows = machineType.systems.map((sys) => [
    esc(sys.brand[lang]),
    esc(
      sys.rows
        .flatMap((r) => (r.modelNames ?? [r.models]).map((m) => m[lang]))
        .join(join),
    ),
    sys.planned ? mark('d', lang) : mark('y', lang),
  ]);
  return table(
    'support-devices',
    [L.brand[lang], L.models[lang], L.state[lang]],
    ['---', '---', ':---:'],
    rows,
  );
}

export function render(data, spec, lang) {
  if (spec.kind === 'catalogue') return renderCatalogue(data, lang);
  if (spec.kind === 'devices') return renderDevices(data, { type: spec.type, lang });
  if (spec.kind === 'fields')
    return renderFields(data, { type: spec.type, dataClass: spec.class, part: spec.part, lang });
  return renderMatrix(data, { type: spec.type, groups: spec.group, lang });
}

/**
 * `<!-- support:<kind> ... -->` … `<!-- /support -->` blocks, with their spec.
 * The body is matched without requiring surrounding newlines so that an empty
 * block (a freshly authored one) cannot swallow the prose up to the next block's
 * closing marker.
 */
export const BLOCK_RE = /(<!-- support:(\w+)([^>]*)-->)[\s\S]*?(<!-- \/support -->)/g;

export function parseSpec(kind, attrs) {
  const spec = { kind };
  for (const m of attrs.matchAll(/(\w+)=([\w,]+)/g)) spec[m[1]] = m[2];
  return spec;
}
