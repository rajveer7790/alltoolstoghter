export function parsePageRange(spec: string, max: number): number[] {
  if (!spec.trim() || spec.length > 10000) throw new Error('Enter a page list such as 1, 3-5.');
  const out: number[] = [];
  for (const part of spec.split(',')) {
    const m = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) throw new Error('Invalid page list. Use numbers and ranges such as 1, 3-5.');
    const a = Number(m[1]), b = Number(m[2] || m[1]);
    if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b) || a < 1 || b < 1 || a > max || b > max) throw new Error(`Pages must be between 1 and ${max}.`);
    for (let page = Math.min(a, b); page <= Math.max(a, b); page++) {
      if (out.length >= 10000) throw new Error('Select at most 10,000 output pages.');
      out.push(page - 1);
    }
  }
  return out;
}
