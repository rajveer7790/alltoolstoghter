import { CalcResult } from '../types';
import { num, pct, safe } from '../format';

export function percentage(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'of'), a = safe(v.a), b = safe(v.b);
  if (mode === 'of') return [{ label: `${num(a)}% of ${num(b)}`, value: num((a / 100) * b, 4), main: true }];
  if (mode === 'is') {
    if (b === 0) return [{ label: 'Undefined', value: 'Cannot divide by zero.', main: true }];
    return [{ label: `${num(a)} is what % of ${num(b)}`, value: num((a / b) * 100, 4) + '%', main: true }];
  }
  if (a === 0) return [{ label: 'Undefined', value: 'Change from zero is undefined.', main: true }];
  return [{ label: 'Percent change', value: num(((b - a) / Math.abs(a)) * 100, 4) + '%', main: true }];
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export function fractions(v: Record<string, any>): CalcResult[] {
  const n1 = Math.round(safe(v.n1)), d1 = Math.round(safe(v.d1)), n2 = Math.round(safe(v.n2)), d2 = Math.round(safe(v.d2));
  if (d1 === 0 || d2 === 0) return [{ label: 'Invalid', value: 'Denominators cannot be zero.', main: true }];
  const op = String(v.op || '+');
  let n = 0, d = 1;
  if (op === '+') { n = n1 * d2 + n2 * d1; d = d1 * d2; }
  else if (op === '-') { n = n1 * d2 - n2 * d1; d = d1 * d2; }
  else if (op === '*') { n = n1 * n2; d = d1 * d2; }
  else { if (n2 === 0) return [{ label: 'Invalid', value: 'Cannot divide by a zero fraction.', main: true }]; n = n1 * d2; d = d1 * n2; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  if (d < 0) { n = -n; d = -d; }
  return [
    { label: 'Result', value: d === 1 ? String(n) : `${n}/${d}`, main: true },
    { label: 'Decimal', value: num(n / d, 6) },
  ];
}

export function average(v: Record<string, any>): CalcResult[] {
  const nums = String(v.list || '').split(/[\s,]+/).map(Number).filter(Number.isFinite);
  if (!nums.length) return [{ label: 'Enter numbers', value: 'Separate values with commas or spaces.', main: true }];
  const sorted = [...nums].sort((a, b) => a - b);
  const mean = nums.reduce((s, x) => s + x, 0) / nums.length;
  const median = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  const freq = new Map<number, number>(); nums.forEach(x => freq.set(x, (freq.get(x) || 0) + 1));
  const maxF = Math.max(...freq.values());
  const mode = maxF === 1 ? 'No mode' : [...freq.entries()].filter(([, f]) => f === maxF).map(([x]) => num(x)).join(', ');
  const sd = Math.sqrt(nums.reduce((s, x) => s + (x - mean) ** 2, 0) / nums.length);
  return [
    { label: 'Mean', value: num(mean, 4), main: true },
    { label: 'Median', value: num(median, 4) },
    { label: 'Mode', value: mode },
    { label: 'Std deviation (population)', value: num(sd, 4) },
    { label: 'Count / Sum', value: `${nums.length} / ${num(nums.reduce((s, x) => s + x, 0), 4)}` },
  ];
}

export function gpa(v: Record<string, any>): CalcResult[] {
  const POINTS: Record<string, number> = { 'A+': 4, A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, 'D+': 1.3, D: 1, F: 0 };
  const rows = String(v.rows || '').trim().split(/\n+/);
  let pts = 0, credits = 0, bad = 0;
  for (const row of rows) {
    const m = row.trim().match(/^([A-Da-d][+-]?|[Ff])\s*[, ]\s*(\d+(?:\.\d+)?)$/);
    if (!m) { if (row.trim()) bad++; continue; }
    const g = POINTS[m[1].toUpperCase()]; const c = parseFloat(m[2]);
    if (g === undefined || !Number.isFinite(c)) { bad++; continue; }
    pts += g * c; credits += c;
  }
  if (!credits) return [{ label: 'No valid rows', value: 'Enter one course per line as: grade, credits (e.g. "A, 3").', main: true }];
  const out: CalcResult[] = [
    { label: 'GPA', value: num(pts / credits, 2), main: true },
    { label: 'Total credits', value: num(credits, 1) },
  ];
  if (bad) out.push({ label: 'Skipped lines', value: `${bad} line(s) not in "grade, credits" format` });
  return out;
}

export function finalGrade(v: Record<string, any>): CalcResult[] {
  const current = safe(v.current, 0, 200), desired = safe(v.desired, 0, 200), w = safe(v.weight, 1, 100) / 100;
  const needed = (desired - current * (1 - w)) / w;
  const out: CalcResult[] = [{ label: 'Score needed on the final', value: num(needed, 1) + '%', main: true }];
  if (needed > 100) out.push({ label: 'Reality check', value: 'Above 100% — the target grade is not reachable without extra credit.' });
  else if (needed <= 0) out.push({ label: 'Good news', value: 'Even 0% on the final keeps your target grade.' });
  return out;
}

export function quadratic(v: Record<string, any>): CalcResult[] {
  const a = safe(v.a), b = safe(v.b), c = safe(v.c);
  if (a === 0) {
    if (b === 0) return [{ label: 'Not an equation', value: 'a and b are both zero.', main: true }];
    return [{ label: 'Linear root (a=0)', value: 'x = ' + num(-c / b, 6), main: true }];
  }
  const D = b * b - 4 * a * c;
  if (D > 0) {
    const r = Math.sqrt(D);
    return [
      { label: 'x₁', value: num((-b + r) / (2 * a), 6), main: true },
      { label: 'x₂', value: num((-b - r) / (2 * a), 6) },
      { label: 'Discriminant', value: num(D, 4) + ' (two real roots)' },
    ];
  }
  if (D === 0) return [{ label: 'Double root x', value: num(-b / (2 * a), 6), main: true }, { label: 'Discriminant', value: '0 (one repeated root)' }];
  const re = num(-b / (2 * a), 4), im = num(Math.sqrt(-D) / (2 * a), 4);
  return [
    { label: 'x₁', value: `${re} + ${im}i`, main: true },
    { label: 'x₂', value: `${re} − ${im}i` },
    { label: 'Discriminant', value: num(D, 4) + ' (complex roots)' },
  ];
}

export function lcmGcf(v: Record<string, any>): CalcResult[] {
  const nums = String(v.list || '').split(/[\s,]+/).map(x => Math.abs(Math.round(Number(x)))).filter(x => Number.isFinite(x) && x > 0);
  if (nums.length < 2) return [{ label: 'Need 2+ integers', value: 'Enter at least two positive whole numbers.', main: true }];
  const g = nums.reduce((acc, x) => gcd(acc, x));
  const l = nums.reduce((acc, x) => (acc / gcd(acc, x)) * x);
  return [
    { label: 'LCM', value: String(l), main: true },
    { label: 'GCF / HCF', value: String(g) },
  ];
}

export function squareRoot(v: Record<string, any>): CalcResult[] {
  const n = safe(v.n);
  if (n < 0) return [
    { label: '√' + num(n), value: num(Math.sqrt(-n), 6) + 'i (imaginary)', main: true },
  ];
  return [
    { label: 'Square root', value: num(Math.sqrt(n), 8), main: true },
    { label: 'Squared check', value: num(Math.sqrt(n) ** 2, 4) },
  ];
}

// ---------- Wave 2 math ----------
export function stdDeviation(v: Record<string, any>): CalcResult[] {
  const nums = String(v.list || '').split(/[\s,]+/).map(Number).filter(Number.isFinite);
  if (nums.length < 2) return [{ label: 'Need 2+ numbers', value: 'Enter at least two values, comma or space separated.', main: true }];
  const mean = nums.reduce((s, x) => s + x, 0) / nums.length;
  const sumSq = nums.reduce((s, x) => s + (x - mean) ** 2, 0);
  const popVar = sumSq / nums.length, sampVar = sumSq / (nums.length - 1);
  return [
    { label: 'Sample std deviation', value: num(Math.sqrt(sampVar), 4), main: true },
    { label: 'Population std deviation', value: num(Math.sqrt(popVar), 4) },
    { label: 'Sample variance', value: num(sampVar, 4) },
    { label: 'Mean', value: num(mean, 4) },
    { label: 'Count', value: String(nums.length) },
  ];
}

export function ratio(v: Record<string, any>): CalcResult[] {
  const a = Math.round(safe(v.a, 0)), b = Math.round(safe(v.b, 0));
  if (a === 0 || b === 0) return [{ label: 'Enter both terms', value: 'Both ratio terms must be non-zero.', main: true }];
  const gcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : gcd(y, x % y);
  const g = gcd(a, b);
  const c = safe(v.c, 0);
  const out: CalcResult[] = [{ label: 'Simplified ratio', value: `${a / g} : ${b / g}`, main: true }];
  if (c > 0) out.push({ label: `Solve ${a}:${b} = ${c}:?`, value: num((c * b) / a, 4) });
  out.push({ label: 'As decimal', value: num(a / b, 4) });
  return out;
}

export function slope(v: Record<string, any>): CalcResult[] {
  const x1 = safe(v.x1), y1 = safe(v.y1), x2 = safe(v.x2), y2 = safe(v.y2);
  if (x1 === x2) return [{ label: 'Vertical line', value: 'Slope is undefined (x₁ = x₂).', main: true }];
  const m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
  return [
    { label: 'Slope (m)', value: num(m, 4), main: true },
    { label: 'Y-intercept (b)', value: num(b, 4) },
    { label: 'Equation', value: `y = ${num(m, 3)}x ${b >= 0 ? '+' : '−'} ${num(Math.abs(b), 3)}` },
  ];
}

export function nCrnPr(v: Record<string, any>): CalcResult[] {
  const n = Math.round(safe(v.n, 0, 170)), r = Math.round(safe(v.r, 0, 170));
  if (r > n) return [{ label: 'Invalid', value: 'r cannot exceed n.', main: true }];
  const fact = (x: number): number => { let f = 1; for (let i = 2; i <= x; i++) f *= i; return f; };
  const nPr = fact(n) / fact(n - r);
  const nCr = nPr / fact(r);
  return [
    { label: `Combinations (${n}C${r})`, value: nCr.toLocaleString(), main: true },
    { label: `Permutations (${n}P${r})`, value: nPr.toLocaleString() },
  ];
}

export function sigFigs(v: Record<string, any>): CalcResult[] {
  const raw = String(v.number || '').trim();
  const num0 = parseFloat(raw);
  if (!Number.isFinite(num0)) return [{ label: 'Enter a number', value: '—', main: true }];
  const sf = Math.max(1, Math.min(15, Math.round(safe(v.figs, 1, 15))));
  const rounded = Number(num0.toPrecision(sf));
  // count sig figs in input
  const cleaned = raw.replace(/^-/, '').replace(/^0+/, '').replace('.', '');
  const count = cleaned.replace(/0+$/, raw.includes('.') ? '$&' : '').length || 1;
  return [
    { label: `Rounded to ${sf} sig figs`, value: String(rounded), main: true },
    { label: 'Scientific notation', value: num0.toExponential(sf - 1) },
  ];
}

export function probability(v: Record<string, any>): CalcResult[] {
  const fav = safe(v.favorable, 0), total = safe(v.total, 0.0001);
  if (fav > total) return [{ label: 'Invalid', value: 'Favorable outcomes cannot exceed total.', main: true }];
  const p = fav / total;
  return [
    { label: 'Probability', value: num(p, 4), main: true },
    { label: 'As percentage', value: pct(p * 100) },
    { label: 'As odds', value: `${num(fav, 0)} : ${num(total - fav, 0)}` },
    { label: 'Complement (not happening)', value: num(1 - p, 4) },
  ];
}

export function exponent(v: Record<string, any>): CalcResult[] {
  const base = safe(v.base), exp = safe(v.exp);
  const result = Math.pow(base, exp);
  if (!Number.isFinite(result)) return [{ label: 'Undefined', value: 'Result is not a finite number.', main: true }];
  return [
    { label: `${num(base)} ^ ${num(exp)}`, value: num(result, 6), main: true },
  ];
}

export function logarithm(v: Record<string, any>): CalcResult[] {
  const x = safe(v.number, 0), base = safe(v.base, 0);
  if (x <= 0) return [{ label: 'Undefined', value: 'Logarithm requires a positive number.', main: true }];
  if (base <= 0 || base === 1) return [{ label: 'Invalid base', value: 'Base must be positive and not equal to 1.', main: true }];
  return [
    { label: `log${base === 10 ? '₁₀' : base === Math.E ? 'ₑ' : ' base ' + num(base)}(${num(x)})`, value: num(Math.log(x) / Math.log(base), 6), main: true },
    { label: 'Natural log (ln)', value: num(Math.log(x), 6) },
    { label: 'Log base 10', value: num(Math.log10(x), 6) },
  ];
}

// ---------- Wave 2 math (extra) ----------
export function rounding(v: Record<string, any>): CalcResult[] {
  const n = safe(v.number), places = Math.round(safe(v.places, -10, 10));
  const f = Math.pow(10, places);
  return [
    { label: `Rounded to ${places} decimal${places === 1 ? '' : 's'}`, value: num(Math.round(n * f) / f, Math.max(0, places)), main: true },
    { label: 'Rounded up (ceil)', value: num(Math.ceil(n * f) / f, Math.max(0, places)) },
    { label: 'Rounded down (floor)', value: num(Math.floor(n * f) / f, Math.max(0, places)) },
  ];
}

export function scientificNotation(v: Record<string, any>): CalcResult[] {
  const n = safe(v.number);
  if (n === 0) return [{ label: 'Scientific notation', value: '0 × 10⁰', main: true }];
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  return [
    { label: 'Scientific notation', value: `${num(mantissa, 6)} × 10^${exp}`, main: true },
    { label: 'E notation', value: n.toExponential(6) },
    { label: 'Standard form', value: num(n, 10) },
  ];
}

// ---------- Wave 3 math ----------
export function percentageChange(v: Record<string, any>): CalcResult[] {
  const from = safe(v.from), to = safe(v.to);
  if (from === 0) return [{ label: 'Undefined', value: 'Percentage change from zero is undefined.', main: true }];
  const change = ((to - from) / Math.abs(from)) * 100;
  return [
    { label: change >= 0 ? 'Percentage increase' : 'Percentage decrease', value: pct(Math.abs(change), 2), main: true },
    { label: 'Absolute change', value: num(to - from, 4) },
    { label: 'Direction', value: change >= 0 ? 'Increase ↑' : 'Decrease ↓' },
  ];
}

export function meanMedianMode(v: Record<string, any>): CalcResult[] {
  const nums = String(v.list || '').split(/[\s,]+/).map(Number).filter(Number.isFinite);
  if (!nums.length) return [{ label: 'Enter numbers', value: 'Provide a list of numbers, comma or space separated.', main: true }];
  const sorted = [...nums].sort((a, b) => a - b);
  const mean = nums.reduce((s, x) => s + x, 0) / nums.length;
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const freq: Record<number, number> = {};
  let maxFreq = 0;
  nums.forEach(n => { freq[n] = (freq[n] || 0) + 1; maxFreq = Math.max(maxFreq, freq[n]); });
  const modes = maxFreq > 1 ? Object.keys(freq).filter(k => freq[+k] === maxFreq).map(Number) : [];
  return [
    { label: 'Mean (average)', value: num(mean, 4), main: true },
    { label: 'Median (middle)', value: num(median, 4) },
    { label: 'Mode (most frequent)', value: modes.length ? modes.join(', ') : 'no mode' },
    { label: 'Range', value: num(sorted[sorted.length - 1] - sorted[0], 4) },
    { label: 'Count', value: String(nums.length) },
  ];
}

export function primeFactorization(v: Record<string, any>): CalcResult[] {
  let n = Math.round(safe(v.number, 2, 1e12));
  if (n < 2) return [{ label: 'Enter an integer ≥ 2', value: 'Prime factorization needs a whole number of at least 2.', main: true }];
  const orig = n;
  const factors: number[] = [];
  for (let d = 2; d * d <= n; d++) while (n % d === 0) { factors.push(d); n /= d; }
  if (n > 1) factors.push(n);
  const grouped: Record<number, number> = {};
  factors.forEach(f => grouped[f] = (grouped[f] || 0) + 1);
  const pretty = Object.entries(grouped).map(([p, e]) => +e > 1 ? `${p}^${e}` : p).join(' × ');
  return [
    { label: `Prime factors of ${orig}`, value: pretty, main: true },
    { label: 'As a list', value: factors.join(', ') },
    { label: 'Is prime?', value: factors.length === 1 ? 'Yes' : 'No' },
  ];
}

export function pythagorean(v: Record<string, any>): CalcResult[] {
  const a = safe(v.a, 0), b = safe(v.b, 0), c = safe(v.c, 0);
  const known = [a, b, c].filter(x => x > 0).length;
  if (known < 2) return [{ label: 'Enter two sides', value: 'Provide any two sides; leave the unknown as 0.', main: true }];
  if (c > 0 && a > 0 && b === 0) {
    if (c <= a) return [{ label: 'Invalid', value: 'The hypotenuse must be the longest side.', main: true }];
    return [{ label: 'Side b', value: num(Math.sqrt(c * c - a * a), 4), main: true }];
  }
  if (c > 0 && b > 0 && a === 0) {
    if (c <= b) return [{ label: 'Invalid', value: 'The hypotenuse must be the longest side.', main: true }];
    return [{ label: 'Side a', value: num(Math.sqrt(c * c - b * b), 4), main: true }];
  }
  const hyp = Math.sqrt(a * a + b * b);
  return [
    { label: 'Hypotenuse (c)', value: num(hyp, 4), main: true },
    { label: 'Area of triangle', value: num((a * b) / 2, 4) },
    { label: 'Perimeter', value: num(a + b + hyp, 4) },
  ];
}

export function triangleArea(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'base');
  if (mode === 'base') {
    const base = safe(v.base, 0), height = safe(v.height, 0);
    return [{ label: 'Area', value: num((base * height) / 2, 4), main: true }];
  }
  // Heron's: three sides
  const a = safe(v.a, 0), b = safe(v.b, 0), c = safe(v.c, 0);
  const s = (a + b + c) / 2;
  const valid = a + b > c && b + c > a && a + c > b;
  if (!valid) return [{ label: 'Invalid triangle', value: 'Each side must be shorter than the sum of the other two.', main: true }];
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return [
    { label: 'Area (Heron\'s formula)', value: num(area, 4), main: true },
    { label: 'Perimeter', value: num(a + b + c, 4) },
    { label: 'Semi-perimeter', value: num(s, 4) },
  ];
}

// ── Developer utility calculators ──────────────────────────────────────────
export function ipSubnet(v: Record<string, any>): import('../types').CalcResult[] {
  const ip = String(v.ip || '').trim();
  const cidr = Math.round(safe(v.cidr, 0, 32));
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => !Number.isInteger(p) || p < 0 || p > 255))
    return [{ label: 'Enter a valid IPv4 address', value: 'e.g. 192.168.1.0', main: true }];
  if (cidr < 0 || cidr > 32) return [{ label: 'CIDR must be 0–32', value: '—', main: true }];

  const ipInt = ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
  const maskInt = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const toIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  const totalHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;
  const firstHost = cidr >= 31 ? toIp(networkInt) : toIp(networkInt + 1);
  const lastHost = cidr >= 31 ? toIp(broadcastInt) : toIp(broadcastInt - 1);

  return [
    { label: 'Network address', value: toIp(networkInt) + '/' + cidr, main: true },
    { label: 'Subnet mask', value: toIp(maskInt) },
    { label: 'Broadcast address', value: toIp(broadcastInt) },
    { label: 'Usable host range', value: `${firstHost} – ${lastHost}` },
    { label: 'Total addresses', value: totalHosts.toLocaleString('en-US') },
    { label: 'Usable hosts', value: usableHosts.toLocaleString('en-US') },
    { label: 'Wildcard mask', value: toIp((~maskInt) >>> 0) },
  ];
}

export function aspectRatio(v: Record<string, any>): import('../types').CalcResult[] {
  const w = safe(v.width, 0), h = safe(v.height, 0);
  const newW = safe(v.newWidth, -1e15), newH = safe(v.newHeight, -1e15);
  if (w <= 0 || h <= 0) return [{ label: 'Enter original width and height', value: '—', main: true }];
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const g = gcd(Math.round(w), Math.round(h));
  const ratioW = Math.round(w) / g, ratioH = Math.round(h) / g;
  const decimal = w / h;
  const results: import('../types').CalcResult[] = [
    { label: 'Aspect ratio', value: `${ratioW}:${ratioH}`, main: true },
    { label: 'Decimal ratio', value: num(decimal, 4) },
  ];
  // Scaling: if new width given, solve height; if new height given, solve width
  if (newW !== -1e15 && newW > 0) {
    results.push({ label: `Height at width ${num(newW, 0)}`, value: num(newW / decimal, 2) + ' px' });
  }
  if (newH !== -1e15 && newH > 0) {
    results.push({ label: `Width at height ${num(newH, 0)}`, value: num(newH * decimal, 2) + ' px' });
  }
  // Common ratio name
  const common: Record<string, string> = { '16:9': 'Widescreen HD', '4:3': 'Standard / classic TV', '21:9': 'Ultrawide', '1:1': 'Square', '3:2': 'Classic 35mm photo', '9:16': 'Vertical / mobile', '2:1': 'Univisium', '5:4': 'Large format' };
  const name = common[`${ratioW}:${ratioH}`];
  if (name) results.push({ label: 'Common name', value: name });
  return results;
}
