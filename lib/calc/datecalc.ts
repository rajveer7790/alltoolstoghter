import { CalcResult } from '../types';
import { int, num, money, safe } from '../format';

const DAY = 86400000;
const parse = (s: unknown): Date | null => {
  const d = new Date(String(s || ''));
  return isNaN(d.getTime()) ? null : d;
};

export function age(v: Record<string, any>): CalcResult[] {
  const dob = parse(v.dob); const asOf = parse(v.asof) || new Date();
  if (!dob) return [{ label: 'Enter a birth date', value: 'Pick your date of birth to compute age.', main: true }];
  if (dob > asOf) return [{ label: 'Check dates', value: 'Birth date is in the future.', main: true }];
  let y = asOf.getFullYear() - dob.getFullYear();
  let m = asOf.getMonth() - dob.getMonth();
  let d = asOf.getDate() - dob.getDate();
  if (d < 0) { m--; d += new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const totalDays = Math.floor((asOf.getTime() - dob.getTime()) / DAY);
  const next = new Date(dob); next.setFullYear(asOf.getFullYear() + (new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate()) < asOf ? 1 : 0));
  return [
    { label: 'Age', value: `${y} years, ${m} months, ${d} days`, main: true },
    { label: 'Total days lived', value: int(totalDays) },
    { label: 'Days to next birthday', value: int(Math.ceil((next.getTime() - asOf.getTime()) / DAY)) },
  ];
}

export function daysBetween(v: Record<string, any>): CalcResult[] {
  const a = parse(v.start), b = parse(v.end);
  if (!a || !b) return [{ label: 'Pick both dates', value: 'A start and end date are required.', main: true }];
  const days = Math.round(Math.abs(b.getTime() - a.getTime()) / DAY);
  return [
    { label: 'Days between', value: int(days), main: true },
    { label: 'Weeks', value: int(Math.floor(days / 7)) + ' wk ' + (days % 7) + ' d' },
    { label: 'Including end date', value: int(days + 1) + ' days' },
  ];
}

export function addDays(v: Record<string, any>): CalcResult[] {
  const start = parse(v.start) || new Date();
  const amount = Math.round(safe(v.amount, -100000, 100000));
  const unit = String(v.unit || 'days');
  const d = new Date(start);
  if (unit === 'days') d.setDate(d.getDate() + amount);
  else if (unit === 'weeks') d.setDate(d.getDate() + amount * 7);
  else if (unit === 'months') d.setMonth(d.getMonth() + amount);
  else d.setFullYear(d.getFullYear() + amount);
  return [
    { label: 'Resulting date', value: d.toDateString(), main: true },
    { label: 'Day of week', value: d.toLocaleDateString('en-US', { weekday: 'long' }) },
  ];
}

export function daysUntil(v: Record<string, any>): CalcResult[] {
  const target = parse(v.target);
  if (!target) return [{ label: 'Pick a date', value: 'Choose a future date to count down to.', main: true }];
  const today = new Date(); today.setHours(0, 0, 0, 0); target.setHours(0, 0, 0, 0);
  const days = Math.round((target.getTime() - today.getTime()) / DAY);
  if (days < 0) return [{ label: 'That date has passed', value: int(-days) + ' days ago', main: true }];
  return [
    { label: 'Days until', value: int(days), main: true },
    { label: 'That is', value: `${Math.floor(days / 7)} weeks, ${days % 7} days` },
  ];
}

// ---------- Wave 2 date/time ----------
export function hoursWorked(v: Record<string, any>): CalcResult[] {
  const parseT = (s: string) => { const [h, m] = String(s || '').split(':').map(Number); return (h || 0) * 60 + (m || 0); };
  let totalMin = 0;
  for (let i = 1; i <= 7; i++) {
    const inT = v[`in${i}`], outT = v[`out${i}`];
    if (!inT || !outT) continue;
    let diff = parseT(outT) - parseT(inT);
    if (diff < 0) diff += 1440; // overnight
    totalMin += diff;
  }
  const brk = safe(v.breakMin, 0, 1440) * (v.in1 ? 1 : 0);
  totalMin = Math.max(0, totalMin - safe(v.breakMin, 0, 1440));
  const hours = totalMin / 60;
  const rate = safe(v.rate, 0);
  const out: CalcResult[] = [
    { label: 'Total hours', value: `${Math.floor(hours)}h ${Math.round(totalMin % 60)}m`, main: true },
    { label: 'Decimal hours', value: num(hours, 2) },
  ];
  if (rate > 0) out.push({ label: 'Gross pay', value: money(hours * rate) });
  return out;
}

export function businessDays(v: Record<string, any>): CalcResult[] {
  const a = new Date(String(v.start || '')), b = new Date(String(v.end || ''));
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return [{ label: 'Pick both dates', value: 'A start and end date are required.', main: true }];
  const [start, end] = a <= b ? [a, b] : [b, a];
  let count = 0, weekends = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    if (day === 0 || day === 6) weekends++; else count++;
    cur.setDate(cur.getDate() + 1);
  }
  return [
    { label: 'Business days', value: int(count), main: true },
    { label: 'Weekend days', value: int(weekends) },
    { label: 'Total days', value: int(count + weekends) },
    { label: 'Note', value: 'Excludes weekends only — public holidays are not deducted.' },
  ];
}

export function weekNumber(v: Record<string, any>): CalcResult[] {
  const d = new Date(String(v.date || ''));
  if (isNaN(d.getTime())) return [{ label: 'Pick a date', value: '—', main: true }];
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return [
    { label: 'ISO week number', value: `Week ${week}`, main: true },
    { label: 'Year', value: String(target.getUTCFullYear()) },
    { label: 'Day of year', value: String(Math.ceil((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000)) },
  ];
}

export function romanNumeral(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'toRoman');
  if (mode === 'toRoman') {
    let n = Math.round(safe(v.number, 1, 3999));
    if (n < 1 || n > 3999) return [{ label: 'Out of range', value: 'Enter a whole number from 1 to 3999.', main: true }];
    const map: [number, string][] = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let out = '';
    for (const [val, sym] of map) while (n >= val) { out += sym; n -= val; }
    return [{ label: 'Roman numeral', value: out, main: true }];
  }
  const s = String(v.roman || '').toUpperCase().trim();
  const vals: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  if (!/^[IVXLCDM]+$/.test(s)) return [{ label: 'Invalid', value: 'Enter valid Roman numerals (I, V, X, L, C, D, M).', main: true }];
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = vals[s[i]], next = vals[s[i + 1]] || 0;
    total += cur < next ? -cur : cur;
  }
  return [{ label: 'Number', value: int(total), main: true }];
}

// ---------- Wave 2 date (extra) ----------
export function timeDuration(v: Record<string, any>): CalcResult[] {
  const parseT = (s: string) => { const [h, m] = String(s || '0:0').split(':').map(Number); return (h || 0) * 60 + (m || 0); };
  let diff = parseT(String(v.end || '')) - parseT(String(v.start || ''));
  if (diff < 0) diff += 1440;
  return [
    { label: 'Duration', value: `${Math.floor(diff / 60)}h ${diff % 60}m`, main: true },
    { label: 'Total minutes', value: int(diff) },
    { label: 'Decimal hours', value: num(diff / 60, 2) },
  ];
}

// ---------- Wave 3 date/time ----------
export function dayOfWeek(v: Record<string, any>): CalcResult[] {
  const d = new Date(String(v.date || ''));
  if (isNaN(d.getTime())) return [{ label: 'Pick a date', value: '—', main: true }];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return [
    { label: 'Day of the week', value: days[d.getDay()], main: true },
    { label: 'Day of year', value: String(Math.ceil((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000)) },
    { label: 'Leap year?', value: isLeap(d.getFullYear()) ? 'Yes' : 'No' },
  ];
}

export function ageDifference(v: Record<string, any>): CalcResult[] {
  const a = new Date(String(v.date1 || '')), b = new Date(String(v.date2 || ''));
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return [{ label: 'Pick both dates', value: 'Two birth dates are required.', main: true }];
  const diffMs = Math.abs(a.getTime() - b.getTime());
  const days = Math.floor(diffMs / 86400000);
  const years = Math.floor(days / 365.25);
  const months = Math.floor((days - years * 365.25) / 30.44);
  return [
    { label: 'Age difference', value: `${years} yr ${months} mo`, main: true },
    { label: 'In days', value: int(days) },
    { label: 'In weeks', value: int(Math.floor(days / 7)) },
  ];
}

export function addBusinessDays(v: Record<string, any>): CalcResult[] {
  const start = new Date(String(v.date || ''));
  if (isNaN(start.getTime())) return [{ label: 'Pick a date', value: '—', main: true }];
  let n = Math.round(safe(v.days, -1000, 1000));
  const dir = n >= 0 ? 1 : -1; n = Math.abs(n);
  const cur = new Date(start); let added = 0;
  while (added < n) {
    cur.setDate(cur.getDate() + dir);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return [
    { label: 'Resulting date', value: cur.toDateString(), main: true },
    { label: 'Day of week', value: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][cur.getDay()] },
    { label: 'Note', value: 'Counts weekdays only; public holidays are not skipped.' },
  ];
}

export function weeksBetween(v: Record<string, any>): CalcResult[] {
  const a = new Date(String(v.start || '')), b = new Date(String(v.end || ''));
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return [{ label: 'Pick both dates', value: 'A start and end date are required.', main: true }];
  const days = Math.abs(b.getTime() - a.getTime()) / 86400000;
  return [
    { label: 'Weeks between', value: num(days / 7, 2), main: true },
    { label: 'Full weeks', value: int(Math.floor(days / 7)) },
    { label: 'Remaining days', value: int(Math.round(days % 7)) },
    { label: 'Total days', value: int(Math.round(days)) },
  ];
}
