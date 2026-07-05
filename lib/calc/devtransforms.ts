/** Pure string transforms for developer tools. Each returns { output } or throws for invalid input. */

export interface DevTransform {
  label: string;
  fn: (input: string) => string;
  placeholder?: string;
}

// --- minifiers (conservative, comment + whitespace stripping) ---
function minifyCss(s: string): string {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')       // comments
    .replace(/\s+/g, ' ')                    // collapse ws
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')    // around tokens
    .replace(/;}/g, '}')                     // trailing semicolons
    .trim();
}
function minifyJs(s: string): string {
  // Conservative: strip line comments and block comments and collapse leading/trailing ws per line.
  // Note: this is a lightweight minifier, not a full parser — safe for most snippets.
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(l => l.replace(/\/\/(?:[^"'`]|"[^"]*"|'[^']*')*$/, '').trimEnd())
    .filter(l => l.trim().length)
    .join('\n')
    .replace(/\n\s*/g, '\n');
}
function minifyHtml(s: string): string {
  return s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// --- HTML entities ---
const HTML_ENC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function htmlEncode(s: string): string { return s.replace(/[&<>"']/g, c => HTML_ENC[c]); }
function htmlDecode(s: string): string {
  return s.replace(/&(amp|lt|gt|quot|#39|apos);/g, (_, e) =>
    ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" } as Record<string, string>)[e]);
}

// --- JSON string escape/unescape ---
function jsonEscape(s: string): string { return JSON.stringify(s).slice(1, -1); }
function jsonUnescape(s: string): string { return JSON.parse('"' + s.replace(/"/g, '\\"') + '"'); }

// --- SQL formatter (lightweight keyword newlining) ---
function formatSql(s: string): string {
  const kw = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'ON'];
  let out = s.replace(/\s+/g, ' ').trim();
  kw.forEach(k => { out = out.replace(new RegExp('\\s*\\b' + k.replace(/ /g, '\\s+') + '\\b\\s*', 'gi'), '\n' + k + ' '); });
  return out.replace(/\n+/g, '\n').replace(/,\s*/g, ',\n  ').trim();
}

// --- YAML <-> JSON (minimal: flat & nested objects, arrays, scalars) ---
function jsonToYaml(s: string): string {
  const obj = JSON.parse(s);
  const dump = (val: any, indent: number): string => {
    const pad = '  '.repeat(indent);
    if (Array.isArray(val)) {
      if (!val.length) return '[]';
      return val.map(v => {
        if (v !== null && typeof v === 'object') return `${pad}-\n${dump(v, indent + 1)}`;
        return `${pad}- ${fmtScalar(v)}`;
      }).join('\n');
    }
    if (val !== null && typeof val === 'object') {
      const keys = Object.keys(val);
      if (!keys.length) return '{}';
      return keys.map(k => {
        const v = val[k];
        if (v !== null && typeof v === 'object' && Object.keys(v).length)
          return `${pad}${k}:\n${dump(v, indent + 1)}`;
        return `${pad}${k}: ${fmtScalar(v)}`;
      }).join('\n');
    }
    return pad + fmtScalar(val);
  };
  const fmtScalar = (v: any): string => {
    if (v === null) return 'null';
    if (typeof v === 'string') return /[:#\-?\[\]{}&*!|>'"%@`]/.test(v) || v === '' ? JSON.stringify(v) : v;
    return String(v);
  };
  return dump(obj, 0);
}
function yamlToJson(s: string): string {
  // Minimal YAML: 2-space indents, key: value, lists with "- ". Good for simple configs.
  const lines = s.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  const parseScalar = (v: string): any => {
    v = v.trim();
    if (v === 'null' || v === '~' || v === '') return null;
    if (v === 'true') return true; if (v === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
    return v;
  };
  const root: any = {};
  const stack: { indent: number; container: any }[] = [{ indent: -1, container: root }];
  for (const line of lines) {
    const indent = line.match(/^\s*/)![0].length;
    const content = line.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].container;
    if (content.startsWith('- ')) {
      const val = parseScalar(content.slice(2));
      if (!Array.isArray(parent.__arr)) parent.__arr = [];
      parent.__arr.push(val);
    } else {
      const idx = content.indexOf(':');
      const key = content.slice(0, idx).trim();
      const rest = content.slice(idx + 1).trim();
      if (rest === '') { parent[key] = {}; stack.push({ indent, container: parent[key] }); }
      else parent[key] = parseScalar(rest);
    }
  }
  const clean = (o: any): any => {
    if (o && typeof o === 'object') {
      if (Array.isArray(o.__arr)) return o.__arr;
      Object.keys(o).forEach(k => o[k] = clean(o[k]));
    }
    return o;
  };
  return JSON.stringify(clean(root), null, 2);
}

// --- XML formatter (indent by tag depth) ---
function formatXml(s: string): string {
  const reg = /(>)(<)(\/*)/g;
  let xml = s.replace(reg, '$1\n$2$3').replace(/\r?\n\s*\r?\n/g, '\n');
  let pad = 0;
  return xml.split('\n').map(node => {
    let indent = 0;
    if (/^<\/\w/.test(node.trim())) pad = Math.max(0, pad - 1);
    else if (/^<\w[^>]*[^/]>$/.test(node.trim()) && !/<\/\w/.test(node)) indent = 1;
    const line = '  '.repeat(pad) + node.trim();
    pad += indent;
    return line;
  }).filter(l => l.trim()).join('\n');
}

// --- Markdown → HTML (common subset) ---
function markdownToHtml(s: string): string {
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = s.split('\n');
  const out: string[] = [];
  let inList = false, inCode = false;
  const inline = (t: string) => esc(t)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  for (const raw of lines) {
    if (raw.trim().startsWith('```')) { if (inCode) { out.push('</code></pre>'); inCode = false; } else { out.push('<pre><code>'); inCode = true; } continue; }
    if (inCode) { out.push(esc(raw)); continue; }
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) { if (inList) { out.push('</ul>'); inList = false; } out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    if (/^[-*]\s+/.test(raw)) { if (!inList) { out.push('<ul>'); inList = true; } out.push(`<li>${inline(raw.replace(/^[-*]\s+/, ''))}</li>`); continue; }
    if (inList) { out.push('</ul>'); inList = false; }
    if (raw.trim() === '') { out.push(''); continue; }
    out.push(`<p>${inline(raw)}</p>`);
  }
  if (inList) out.push('</ul>');
  if (inCode) out.push('</code></pre>');
  return out.join('\n');
}


function htmlToMarkdown(s: string): string {
  let t = s;
  // strip scripts/styles/comments entirely
  t = t.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  // block conversions
  t = t.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, n, inner) => '\n' + '#'.repeat(+n) + ' ' + inner.trim() + '\n');
  t = t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
  t = t.replace(/<\/(ul|ol)>/gi, '\n').replace(/<(ul|ol)[^>]*>/gi, '\n');
  t = t.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, inner) => '\n> ' + inner.trim().replace(/\n/g, '\n> ') + '\n');
  t = t.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_m, code) => '\n```\n' + code + '\n```\n');
  t = t.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<p[^>]*>/gi, '');
  t = t.replace(/<hr[^>]*>/gi, '\n---\n');
  // inline conversions
  t = t.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  t = t.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');
  t = t.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  t = t.replace(/<a[^>]*href=["\']([^"\']*)["\'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  t = t.replace(/<img[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']([^"\']*)["\'][^>]*>/gi, '![$1]($2)');
  t = t.replace(/<img[^>]*src=["\']([^"\']*)["\'][^>]*>/gi, '![]($1)');
  // strip remaining tags, decode basic entities
  t = t.replace(/<[^>]+>/g, '');
  t = t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return t.replace(/\n{3,}/g, '\n\n').trim();
}

export const DEV_TRANSFORMS: Record<string, DevTransform> = {
  htmlEncode: { label: 'HTML encode', fn: htmlEncode, placeholder: '<div class="hello">Tom & Jerry</div>' },
  htmlDecode: { label: 'HTML decode', fn: htmlDecode, placeholder: '&lt;div&gt;Tom &amp; Jerry&lt;/div&gt;' },
  cssMinify: { label: 'Minify CSS', fn: minifyCss, placeholder: '.box {\n  color: red;\n  margin: 0;\n}' },
  jsMinify: { label: 'Minify JS', fn: minifyJs, placeholder: 'function add(a, b) {\n  // sum\n  return a + b;\n}' },
  htmlMinify: { label: 'Minify HTML', fn: minifyHtml, placeholder: '<!-- nav -->\n<div>\n  <p>Hi</p>\n</div>' },
  jsonEscape: { label: 'Escape', fn: jsonEscape, placeholder: 'Line one\nLine "two"' },
  jsonUnescape: { label: 'Unescape', fn: jsonUnescape, placeholder: 'Line one\\nLine \\"two\\"' },
  sqlFormat: { label: 'Format SQL', fn: formatSql, placeholder: 'select id, name from users where age > 21 order by name' },
  jsonToYaml: { label: 'JSON → YAML', fn: jsonToYaml, placeholder: '{\n  "name": "app",\n  "ports": [80, 443]\n}' },
  yamlToJson: { label: 'YAML → JSON', fn: yamlToJson, placeholder: 'name: app\nports:\n  - 80\n  - 443' },
  xmlFormat: { label: 'Format XML', fn: formatXml, placeholder: '<root><item id="1">A</item><item id="2">B</item></root>' },
  htmlToMarkdown: { label: 'HTML → Markdown', fn: htmlToMarkdown, placeholder: '<h1>Title</h1>\n<p>Some <strong>bold</strong> text and a <a href="https://example.com">link</a>.</p>' },
  markdownToHtml: { label: 'Markdown → HTML', fn: markdownToHtml, placeholder: '# Title\n\nSome **bold** and *italic* text.\n\n- one\n- two' },
};
