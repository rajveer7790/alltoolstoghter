import { CalcResult } from '../../types';
import { num } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];

/** Strict numeric parse: empty / non-numeric text gives NaN (unlike `safe`, which maps to 0). */
const parse = (v: unknown): number => {
  const s = String(v ?? '').trim();
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
};

// ---------- Rupee amount to words ----------
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const below100 = (n: number): string => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''));
const below1000 = (n: number): string => {
  const h = Math.floor(n / 100), r = n % 100;
  return [h ? ONES[h] + ' Hundred' : '', r ? below100(r) : ''].filter(Boolean).join(' ');
};

/** Indian-English words for a non-negative integer below 10^13 (Crore, Lakh, Thousand, Hundred). */
export function indianWords(n: number): string {
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  const crore = Math.floor(n / 1e7);
  let rest = n % 1e7;
  if (crore) parts.push(indianWords(crore) + ' Crore');
  const lakh = Math.floor(rest / 1e5); rest %= 1e5;
  if (lakh) parts.push(below100(lakh) + ' Lakh');
  const th = Math.floor(rest / 1e3); rest %= 1e3;
  if (th) parts.push(below100(th) + ' Thousand');
  if (rest) parts.push(below1000(rest));
  return parts.join(' ');
}

/** 1234567 -> "12,34,567" (last three digits, then groups of two). */
export function indianGroup(intDigits: string): string {
  if (intDigits.length <= 3) return intDigits;
  const last3 = intDigits.slice(-3);
  const head = intDigits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return head + ',' + last3;
}

/** Parse "₹ 12,34,567.895" -> { rupees, paise } with half-up rounding on the decimal string (no float error). */
export function parseRupees(raw: string): { rupees: number; paise: number } | string {
  let s = String(raw ?? '').trim().replace(/^(₹|rs\.?|inr)\s*/i, '').replace(/[,\s]/g, '');
  if (s === '') return 'Enter an amount.';
  if (s.startsWith('-')) return 'Negative amounts are not supported.';
  if (!/^\d*\.?\d*$/.test(s) || !/\d/.test(s)) return 'Use digits with an optional decimal point (commas are allowed).';
  let [ip, fp = ''] = s.split('.');
  ip = ip.replace(/^0+(?=\d)/, '') || '0';
  if (ip.length > 12) return 'At most 12 digits before the decimal point are supported.';
  fp = (fp + '000').slice(0, Math.max(fp.length, 3));
  let paise = parseInt(fp.slice(0, 2), 10);
  let rupees = parseInt(ip, 10);
  if (parseInt(fp[2], 10) >= 5) paise += 1;
  if (paise === 100) { paise = 0; rupees += 1; }
  return { rupees, paise };
}

export function rupeeToWords(raw: string) {
  const p = parseRupees(raw);
  if (typeof p === 'string') return p;
  const { rupees, paise } = p;
  const rupeeWords = indianWords(rupees);
  const paiseWords = paise ? indianWords(paise) + ' Paise' : '';
  let words: string;
  if (rupees === 0 && paise === 0) words = 'Zero Rupees Only';
  else if (rupees === 0) words = paiseWords + ' Only';
  else words = rupeeWords + (rupees === 1 ? ' Rupee' : ' Rupees') + (paise ? ' and ' + paiseWords : '') + ' Only';
  const cheque = 'Rupees ' + rupeeWords + (paise ? ' and ' + paiseWords : '') + ' Only';
  const formatted = indianGroup(String(rupees)) + '.' + String(paise).padStart(2, '0');
  return { rupees, paise, words, cheque, formatted };
}

const rupeeCalc = (v: Record<string, any>): CalcResult[] => {
  const r = rupeeToWords(String(v.amount ?? ''));
  if (typeof r === 'string') return bad(r);
  return [
    { label: 'Amount in words', value: r.words, main: true },
    { label: 'Cheque-style line', value: r.cheque },
    { label: 'Indian format', value: '₹' + r.formatted },
    { label: 'Paise part', value: String(r.paise) + ' paise' },
  ];
};

// ---------- Negative marking ----------
export function negativeMarking(total: number, correct: number, wrong: number, m: number, n: number, maxIn: number) {
  const attempted = correct + wrong;
  const net = correct * m - wrong * n;
  const max = maxIn > 0 ? maxIn : total * m;
  return {
    attempted, net, unattempted: total - attempted,
    accuracy: attempted > 0 ? (correct / attempted) * 100 : null,
    attemptRate: (attempted / total) * 100,
    breakEven: (n / (m + n)) * 100,
    lost: wrong * n,
    max, pctOfMax: (net / max) * 100,
  };
}

const negCalc = (v: Record<string, any>): CalcResult[] => {
  const total = parse(v.total), correct = parse(v.correct), wrong = parse(v.wrong);
  const m = parse(v.mpos), n = parse(v.mneg);
  const maxIn = String(v.max ?? '').trim() === '' ? 0 : parse(v.max);
  if (![total, correct, wrong, m, n, maxIn].every(Number.isFinite)) return bad('Fill in every field with a number.');
  if (![total, correct, wrong].every(Number.isInteger) || total < 1 || correct < 0 || wrong < 0) return bad('Questions must be whole numbers (total at least 1, correct and wrong 0 or more).');
  if (correct + wrong > total) return bad('Correct + wrong cannot exceed the total number of questions.');
  if (m <= 0) return bad('Marks per correct answer must be greater than 0.');
  if (n < 0) return bad('Penalty per wrong answer cannot be negative (enter 0 for none).');
  if (maxIn < 0) return bad('Maximum marks cannot be negative.');
  const r = negativeMarking(total, correct, wrong, m, n, maxIn);
  return [
    { label: 'Net score', value: num(r.net, 2) + ' marks', main: true },
    { label: 'Accuracy (of attempted)', value: r.accuracy === null ? 'n/a (nothing attempted)' : num(r.accuracy, 2) + '%' },
    { label: 'Attempt rate', value: num(r.attemptRate, 2) + '% (' + r.attempted + ' of ' + total + ')' },
    { label: 'Unattempted', value: String(r.unattempted) + ' questions' },
    { label: 'Marks lost to negative marking', value: num(r.lost, 2) + ' marks' },
    { label: 'Break-even accuracy for a guess', value: num(r.breakEven, 2) + '%' },
    { label: 'Score as % of maximum', value: num(r.pctOfMax, 2) + '% of ' + num(r.max, 2) },
  ];
};

// ---------- Attendance ----------
export function attendance(attended: number, total: number, required: number, remaining: number) {
  const EPS = 1e-9;
  const current = (attended / total) * 100;
  const meets = attended * 100 >= required * total - EPS;
  let canMiss = 0, mustAttend = 0;
  if (meets) canMiss = Math.max(0, Math.floor((attended * 100) / required - total + EPS));
  else mustAttend = Math.ceil((required * total - 100 * attended) / (100 - required) - EPS);
  const attendAll = ((attended + remaining) / (total + remaining)) * 100;
  const missAll = (attended / (total + remaining)) * 100;
  const maxMissRemaining = Math.floor(attended + remaining - (required / 100) * (total + remaining) + EPS);
  return { current, meets, canMiss, mustAttend, attendAll, missAll, maxMissRemaining };
}

const attCalc = (v: Record<string, any>): CalcResult[] => {
  const a = parse(v.attended), t = parse(v.total), req = parse(v.required);
  const remaining = String(v.remaining ?? '').trim() === '' ? 0 : parse(v.remaining);
  if (![a, t, req, remaining].every(Number.isFinite)) return bad('Fill in every field with a number.');
  if (!Number.isInteger(a) || !Number.isInteger(t) || !Number.isInteger(remaining)) return bad('Classes must be whole numbers.');
  if (t < 1) return bad('Total classes held must be at least 1.');
  if (a < 0 || a > t) return bad('Classes attended must be between 0 and the total held.');
  if (remaining < 0) return bad('Remaining classes cannot be negative.');
  if (req <= 0 || req >= 100) return bad('Required attendance must be above 0 and below 100 percent.');
  const r = attendance(a, t, req, remaining);
  const out: CalcResult[] = [{ label: 'Current attendance', value: num(r.current, 2) + '% (' + a + ' of ' + t + ')' }];
  out.push(r.meets
    ? { label: 'Classes you can still miss', value: r.canMiss + ' (stays at or above ' + num(req, 2) + '%)', main: true }
    : { label: 'Classes to attend in a row', value: r.mustAttend + ' (to reach ' + num(req, 2) + '%)', main: true });
  if (remaining > 0) {
    out.push({ label: 'If you attend all ' + remaining + ' remaining', value: num(r.attendAll, 2) + '%' });
    out.push({ label: 'If you miss all ' + remaining + ' remaining', value: num(r.missAll, 2) + '%' });
    out.push(r.maxMissRemaining >= 0
      ? { label: 'Most you can miss of the remaining', value: String(r.maxMissRemaining) + ' of ' + remaining }
      : { label: 'Target reachable by term end?', value: 'No, even attending all gives ' + num(r.attendAll, 2) + '%' });
  }
  return out;
};

export const COMPUTES_INDIA: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'rupee-number-to-words-converter': rupeeCalc,
  'exam-negative-marking-calculator': negCalc,
  'attendance-percentage-calculator': attCalc,
};
