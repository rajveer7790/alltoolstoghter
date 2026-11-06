import { mdToHtml } from '../mdPreview';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { parse as parseCss, generate as generateCss } from 'css-tree';
/** Pure string transforms for developer tools. Each returns { output } or throws for invalid input. */

export interface DevTransform {
  label: string;
  fn: (input: string) => string | Promise<string>;
  placeholder?: string;
}

// --- minifiers (conservative, comment + whitespace stripping) ---
function minifyCss(s: string): string {
  return generateCss(parseCss(s));
}
async function minifyJs(s: string): Promise<string> {
  const { minify } = await import('terser');
  const result = await minify(s, { compress: false, mangle: false, format: { comments: false } });
  return result.code || '';
}
async function minifyHtml(s: string): Promise<string> {
  const { parse, parseFragment, serialize } = await import('parse5');
  const root = /<!doctype|<html[\s>]/i.test(s) ? parse(s) : parseFragment(s);
  const stripComments = (node: any) => {
    if (node.childNodes) {
      node.childNodes = node.childNodes.filter((child: any) => child.nodeName !== '#comment' || /^\[if/i.test(child.data || ''));
      node.childNodes.forEach(stripComments);
    }
    if (node.content) stripComments(node.content);
  };
  stripComments(root);
  return serialize(root);
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
function jsonUnescape(s: string): string { return JSON.parse('"' + s + '"'); }

// --- SQL formatter (lightweight keyword newlining) ---
function formatSql(s: string): string {
  const kw = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'ON'];
  let out = s.replace(/\s+/g, ' ').trim();
  kw.forEach(k => { out = out.replace(new RegExp('\\s*\\b' + k.replace(/ /g, '\\s+') + '\\b\\s*', 'gi'), '\n' + k + ' '); });
  return out.replace(/\n+/g, '\n').replace(/,\s*/g, ',\n  ').trim();
}

// --- YAML <-> JSON (minimal: flat & nested objects, arrays, scalars) ---
function jsonToYaml(s: string): string { return stringifyYaml(JSON.parse(s)); }
function yamlToJson(s: string): string {
  return JSON.stringify(parseYaml(s, { maxAliasCount: 100, uniqueKeys: true }), null, 2);
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
function markdownToHtml(s: string): string { return mdToHtml(s); }

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
