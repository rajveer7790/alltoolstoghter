const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
export const num = (n: number, d = 2) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: d }).format(n);
export const money = (n: number) => '$' + num(round2(n));
export const pct = (n: number, d = 2) => num(n, d) + '%';
export const int = (n: number) => nf0.format(Math.round(n));
export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
/** Coerce + clamp untrusted input to a finite number. */
export const safe = (v: unknown, min = -1e15, max = 1e15): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? ''));
  if (!Number.isFinite(n)) return 0;
  return Math.min(max, Math.max(min, n));
};
