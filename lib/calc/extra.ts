import type { CalcResult } from '../types';
import { money, num, safe } from '../format';

const result = (label: string, value: string): CalcResult => ({ label, value, main: true });
export function fuelCost(v: Record<string, any>): CalcResult[] {
  const distance = safe(v.distance, 0), economy = safe(v.economy, 0), price = safe(v.price, 0);
  if (economy <= 0) return [result('Check inputs', 'Fuel economy must be greater than zero.')];
  const metric = v.unit === 'metric';
  const fuel = metric ? distance * economy / 100 : distance / economy;
  return [result('Fuel cost', money(fuel * price)), { label: 'Fuel required', value: num(fuel, 3) + (metric ? ' liters' : ' US gallons') }];
}
export function circleArea(v: Record<string, any>): CalcResult[] {
  const r = safe(v.radius, 0);
  return [result('Area', num(Math.PI * r * r, 6) + ' square units'), { label: 'Circumference', value: num(2 * Math.PI * r, 6) }, { label: 'Diameter', value: num(2 * r, 6) }];
}
export function rectangleArea(v: Record<string, any>): CalcResult[] {
  const l = safe(v.length, 0), w = safe(v.width, 0);
  return [result('Area', num(l * w, 6) + ' square units'), { label: 'Perimeter', value: num(2 * (l + w), 6) }];
}
export function concreteVolume(v: Record<string, any>): CalcResult[] {
  const ft3 = safe(v.length, 0) * safe(v.width, 0) * safe(v.thickness, 0);
  return [result('Volume', num(ft3, 4) + ' ft³'), { label: 'Cubic yards', value: num(ft3 / 27, 4) + ' yd³' }, { label: 'Cubic meters', value: num(ft3 * 0.028316846592, 4) + ' m³' }, { label: 'With 10% allowance', value: num(ft3 * 1.1 / 27, 4) + ' yd³' }];
}
export function electricityBill(v: Record<string, any>): CalcResult[] {
  return [result('Monthly energy charge', money(safe(v.kwh, 0) * safe(v.rate, 0))), { label: 'Excludes', value: 'Fixed fees, taxes and tiered or time-of-use pricing.' }];
}
export function calorieDeficit(v: Record<string, any>): CalcResult[] {
  const maintenance = safe(v.tdee, 0), deficit = safe(v.target, 0) * 7700 / 7;
  const target = maintenance - deficit;
  if (target < 1200 || deficit > maintenance * 0.25) return [result('Review your target', 'This request implies a large deficit or very low intake. Choose a smaller target and discuss individual needs with a qualified clinician.')];
  return [result('Estimated daily intake', num(target, 0) + ' kcal'), { label: 'Daily deficit', value: num(deficit, 0) + ' kcal' }, { label: 'Limitation', value: 'Simple energy estimate, not a weight-loss prediction. Metabolism and body weight change over time.' }];
}
export function waistHeight(v: Record<string, any>): CalcResult[] {
  const height = safe(v.height, 0), waist = safe(v.waist, 0);
  if (!height || !waist) return [result('Check inputs', 'Enter positive waist and height measurements in the same unit.')];
  return [result('Waist-to-height ratio', num(waist / height, 3)), { label: 'Interpretation', value: 'A screening measurement, not a diagnosis. Discuss your result with a clinician.' }];
}
export function militaryTime(v: Record<string, any>): CalcResult[] {
  const s = String(v.time || '').trim();
  const m = s.match(/^(\d{1,2}):?(\d{2})\s*(AM|PM)?$/i);
  if (!m) return [result('Invalid time', 'Enter HH:MM, HHMM, or h:mm AM/PM.')];
  let h = Number(m[1]); const minute = Number(m[2]), suffix = m[3]?.toUpperCase();
  if (minute > 59 || h > (suffix ? 12 : 23) || (suffix && h < 1)) return [result('Invalid time', 'Check the hours and minutes.')];
  if (suffix) h = h % 12 + (suffix === 'PM' ? 12 : 0);
  return [result('24-hour time', `${String(h).padStart(2, '0')}:${m[2]}`), { label: '12-hour time', value: `${h % 12 || 12}:${m[2]} ${h >= 12 ? 'PM' : 'AM'}` }];
}
export function pregnancyWeek(v: Record<string, any>): CalcResult[] {
  const text = String(v.lmp || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return [result('Pick a date', 'Enter the first day of your last period.')];
  const start = new Date(text + 'T00:00:00Z'), today = new Date();
  const days = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - start.getTime()) / 86400000);
  if (!Number.isFinite(days) || days < 0 || days > 294) return [result('Check the date', 'Enter an LMP within the past 42 weeks. This estimate does not confirm pregnancy or replace clinical dating.')];
  return [result('Estimated gestational age', `${Math.floor(days / 7)} weeks, ${days % 7} days`), { label: 'Estimated due date', value: new Date(start.getTime() + 280 * 86400000).toISOString().slice(0, 10) }, { label: 'Limitation', value: 'Assumes a 28-day cycle. Clinical dating may differ.' }];
}
