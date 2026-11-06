/** Strict integer parsing without Number's 53-bit precision loss. */
export function parseIntegerBase(input: string, base: number): bigint | null {
  let text = input.trim();
  if (![2, 8, 10, 16].includes(base) || !text || text.length > 4096) return null;
  const negative = text.startsWith('-');
  text = text.replace(/^[+-]/, '');
  const prefix = ({ 2: '0b', 8: '0o', 16: '0x' } as Record<number, string>)[base];
  if (prefix && text.toLowerCase().startsWith(prefix)) text = text.slice(2);
  const patterns: Record<number, RegExp> = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^\d+$/, 16: /^[\da-f]+$/i };
  if (!patterns[base].test(text)) return null;
  let n = 0n;
  for (const ch of text.toLowerCase()) n = n * BigInt(base) + BigInt(parseInt(ch, base));
  return negative ? -n : n;
}
