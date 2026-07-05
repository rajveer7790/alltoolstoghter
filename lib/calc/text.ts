/** Pure text transforms, looked up by key on the client. */
export const TRANSFORMS: Record<string, { label: string; fn: (s: string, opt?: string) => string; modes?: { value: string; label: string }[] }> = {
  case: {
    label: 'Convert case',
    modes: [
      { value: 'upper', label: 'UPPERCASE' }, { value: 'lower', label: 'lowercase' },
      { value: 'title', label: 'Title Case' }, { value: 'sentence', label: 'Sentence case' },
      { value: 'camel', label: 'camelCase' }, { value: 'snake', label: 'snake_case' }, { value: 'kebab', label: 'kebab-case' },
    ],
    fn: (s, mode) => {
      switch (mode) {
        case 'upper': return s.toUpperCase();
        case 'lower': return s.toLowerCase();
        case 'title': return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        case 'sentence': return s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
        case 'camel': return s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[^a-z]+/, '');
        case 'snake': return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        case 'kebab': return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        default: return s;
      }
    },
  },
  reverse: {
    label: 'Reverse',
    modes: [{ value: 'chars', label: 'Reverse characters' }, { value: 'words', label: 'Reverse word order' }],
    fn: (s, mode) => mode === 'words' ? s.split(/\s+/).reverse().join(' ') : [...s].reverse().join(''),
  },
  linebreaks: {
    label: 'Remove line breaks',
    modes: [{ value: 'space', label: 'Replace with spaces' }, { value: 'none', label: 'Remove entirely' }, { value: 'para', label: 'Keep paragraphs' }],
    fn: (s, mode) => {
      if (mode === 'para') return s.replace(/([^\n])\n(?!\n)/g, '$1 ').replace(/\n{2,}/g, '\n\n');
      return s.replace(/\s*\n+\s*/g, mode === 'none' ? '' : ' ');
    },
  },
  slug: {
    label: 'Slugify',
    fn: (s) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  },
  repeat: {
    label: 'Repeat',
    modes: [{ value: '5', label: '5×' }, { value: '10', label: '10×' }, { value: '25', label: '25×' }, { value: '100', label: '100×' }],
    fn: (s, mode) => {
      const n = Math.min(1000, Math.max(1, parseInt(mode || '5', 10) || 5));
      if (s.length * n > 500000) return 'Output too large — shorten the text or count.';
      return Array(n).fill(s).join('\n');
    },
  },
  titlecase: {
    label: 'Title case (AP-style small words)',
    fn: (s) => {
      const small = new Set(['a','an','the','and','but','or','nor','for','so','yet','at','by','in','of','on','to','up','via','as','if','per']);
      return s.toLowerCase().split(/\s+/).map((w, i, arr) =>
        (i !== 0 && i !== arr.length - 1 && small.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' ');
    },
  },
};

const LOREM = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

export function loremIpsum(paragraphs: number): string {
  const out: string[] = [];
  let seed = 42;
  const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let p = 0; p < Math.min(50, Math.max(1, paragraphs)); p++) {
    const sentences: string[] = [];
    const sCount = 4 + Math.floor(rand() * 3);
    for (let s = 0; s < sCount; s++) {
      const wCount = 8 + Math.floor(rand() * 8);
      const words: string[] = [];
      for (let w = 0; w < wCount; w++) words.push(LOREM[Math.floor(rand() * LOREM.length)]);
      let sentence = words.join(' ');
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      sentences.push(sentence);
    }
    out.push((p === 0 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' : '') + sentences.join(' '));
  }
  return out.join('\n\n');
}

export function countText(s: string) {
  const words = (s.match(/[\p{L}\p{N}'’-]+/gu) || []).length;
  const chars = [...s].length;
  const charsNoSpace = [...s.replace(/\s/g, '')].length;
  const sentences = (s.match(/[.!?]+(\s|$)/g) || []).length || (s.trim() ? 1 : 0);
  const paragraphs = s.trim() ? s.trim().split(/\n{2,}/).length : 0;
  const readMin = words / 200;
  return { words, chars, charsNoSpace, sentences, paragraphs, readMin };
}

// ---------- Wave 3 text transforms ----------
TRANSFORMS['removeDuplicateLines'] = {
  label: 'Remove duplicate lines',
  fn: (s: string, mode?: string) => {
    const lines = s.split('\n');
    const seen = new Set<string>();
    const ci = mode === 'ci';
    return lines.filter(l => { const key = ci ? l.toLowerCase().trim() : l.trim(); if (seen.has(key)) return false; seen.add(key); return true; }).join('\n');
  },
  modes: [{ value: 'cs', label: 'Case-sensitive' }, { value: 'ci', label: 'Ignore case' }],
};
TRANSFORMS['sortLines'] = {
  label: 'Sort lines',
  fn: (s: string, mode?: string) => {
    const lines = s.split('\n').filter(l => l.length);
    if (mode === 'desc') return lines.sort((a, b) => b.localeCompare(a)).join('\n');
    if (mode === 'len') return lines.sort((a, b) => a.length - b.length).join('\n');
    return lines.sort((a, b) => a.localeCompare(b)).join('\n');
  },
  modes: [{ value: 'asc', label: 'A → Z' }, { value: 'desc', label: 'Z → A' }, { value: 'len', label: 'By length' }],
};
TRANSFORMS['removeWhitespace'] = {
  label: 'Remove whitespace',
  fn: (s: string, mode?: string) => {
    if (mode === 'all') return s.replace(/\s+/g, '');
    if (mode === 'extra') return s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').replace(/[ \t]+$/gm, '').trim();
    return s.split('\n').map(l => l.trim()).join('\n'); // trim lines
  },
  modes: [{ value: 'extra', label: 'Collapse extra spaces' }, { value: 'trim', label: 'Trim each line' }, { value: 'all', label: 'Remove all whitespace' }],
};
TRANSFORMS['textToBinary'] = {
  label: 'Text to binary',
  fn: (s: string, mode?: string) => {
    if (mode === 'decode') {
      const bits = s.trim().split(/\s+/);
      try { return bits.map(b => String.fromCharCode(parseInt(b, 2))).join(''); } catch { return 'Invalid binary input'; }
    }
    return [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  },
  modes: [{ value: 'encode', label: 'Text → Binary' }, { value: 'decode', label: 'Binary → Text' }],
};
