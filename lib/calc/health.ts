import { CalcResult } from '../types';
import { int, money, num, safe } from '../format';

const toKg = (w: number, u: string) => (u === 'lb' ? w * 0.45359237 : w);
const toCm = (h: number, u: string) => (u === 'in' ? h * 2.54 : h);

export function bmi(v: Record<string, any>): CalcResult[] {
  const kg = toKg(safe(v.weight, 1, 700), String(v.wUnit || 'kg'));
  const cm = toCm(safe(v.height, 30, 280), String(v.hUnit || 'cm'));
  const m = cm / 100, val = kg / (m * m);
  const cat = val < 18.5 ? 'Underweight' : val < 25 ? 'Normal weight' : val < 30 ? 'Overweight' : 'Obesity';
  const lo = 18.5 * m * m, hi = 24.9 * m * m;
  return [
    { label: 'BMI', value: num(val, 1), main: true },
    { label: 'Category (WHO)', value: cat },
    { label: 'Healthy range for your height', value: `${num(lo, 1)}–${num(hi, 1)} kg` },
  ];
}

export function bmr(v: Record<string, any>): CalcResult[] {
  const kg = toKg(safe(v.weight, 1, 700), String(v.wUnit || 'kg'));
  const cm = toCm(safe(v.height, 30, 280), String(v.hUnit || 'cm'));
  const age = safe(v.age, 1, 120);
  const male = String(v.sex || 'male') === 'male';
  const val = 10 * kg + 6.25 * cm - 5 * age + (male ? 5 : -161); // Mifflin-St Jeor
  return [{ label: 'BMR (Mifflin-St Jeor)', value: int(val) + ' kcal/day', main: true }];
}

const ACTIVITY: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 };

export function tdee(v: Record<string, any>): CalcResult[] {
  const base = bmrValue(v), f = ACTIVITY[String(v.activity || 'moderate')] ?? 1.55;
  return [
    { label: 'TDEE', value: int(base * f) + ' kcal/day', main: true },
    { label: 'BMR', value: int(base) + ' kcal/day' },
  ];
}

function bmrValue(v: Record<string, any>): number {
  const kg = toKg(safe(v.weight, 1, 700), String(v.wUnit || 'kg'));
  const cm = toCm(safe(v.height, 30, 280), String(v.hUnit || 'cm'));
  const age = safe(v.age, 1, 120);
  return 10 * kg + 6.25 * cm - 5 * age + (String(v.sex || 'male') === 'male' ? 5 : -161);
}

export function calories(v: Record<string, any>): CalcResult[] {
  const t = bmrValue(v) * (ACTIVITY[String(v.activity || 'moderate')] ?? 1.55);
  return [
    { label: 'Maintain weight', value: int(t) + ' kcal/day', main: true },
    { label: 'Mild loss (~0.25 kg/wk)', value: int(t - 250) + ' kcal/day' },
    { label: 'Loss (~0.5 kg/wk)', value: int(t - 500) + ' kcal/day' },
    { label: 'Gain (~0.25 kg/wk)', value: int(t + 250) + ' kcal/day' },
  ];
}

export function macros(v: Record<string, any>): CalcResult[] {
  const cal = safe(v.calories, 800, 10000);
  const p = safe(v.protein, 0, 100), c = safe(v.carbs, 0, 100), f = safe(v.fat, 0, 100);
  const sum = p + c + f;
  if (Math.round(sum) !== 100) return [{ label: 'Check split', value: `Your percentages add to ${num(sum, 0)}% — they must total 100%.`, main: true }];
  return [
    { label: 'Protein', value: int((cal * p) / 100 / 4) + ' g', main: true },
    { label: 'Carbs', value: int((cal * c) / 100 / 4) + ' g' },
    { label: 'Fat', value: int((cal * f) / 100 / 9) + ' g' },
  ];
}

export function oneRepMax(v: Record<string, any>): CalcResult[] {
  const w = safe(v.weight, 1, 2000), reps = safe(v.reps, 1, 30);
  if (reps === 1) return [{ label: '1RM', value: num(w, 1), main: true }];
  const epley = w * (1 + reps / 30);
  const brzycki = w * (36 / (37 - Math.min(reps, 36)));
  return [
    { label: '1RM (Epley)', value: num(epley, 1), main: true },
    { label: '1RM (Brzycki)', value: num(brzycki, 1) },
    { label: '90% (3-rep work)', value: num(epley * 0.9, 1) },
    { label: '80% (8-rep work)', value: num(epley * 0.8, 1) },
  ];
}

export function pace(v: Record<string, any>): CalcResult[] {
  const dist = safe(v.distance, 0.01, 10000);
  const h = safe(v.hours, 0, 200), m = safe(v.minutes, 0, 59), s = safe(v.seconds, 0, 59);
  const totalMin = h * 60 + m + s / 60;
  if (totalMin <= 0) return [{ label: 'Enter a time', value: 'Add hours, minutes or seconds to compute pace.', main: true }];
  const paceMin = totalMin / dist;
  const pm = Math.floor(paceMin), ps = Math.round((paceMin - pm) * 60);
  return [
    { label: 'Pace', value: `${pm}:${String(ps).padStart(2, '0')} per unit distance`, main: true },
    { label: 'Speed', value: num(dist / (totalMin / 60), 2) + ' units/hour' },
  ];
}

export function idealWeight(v: Record<string, any>): CalcResult[] {
  const cm = toCm(safe(v.height, 100, 280), String(v.hUnit || 'cm'));
  const male = String(v.sex || 'male') === 'male';
  const inchesOver5ft = Math.max(0, cm / 2.54 - 60);
  const devine = (male ? 50 : 45.5) + 2.3 * inchesOver5ft;
  const robinson = (male ? 52 : 49) + (male ? 1.9 : 1.7) * inchesOver5ft;
  const miller = (male ? 56.2 : 53.1) + (male ? 1.41 : 1.36) * inchesOver5ft;
  return [
    { label: 'Devine formula', value: num(devine, 1) + ' kg', main: true },
    { label: 'Robinson formula', value: num(robinson, 1) + ' kg' },
    { label: 'Miller formula', value: num(miller, 1) + ' kg' },
  ];
}

// ---------- Wave 2 health ----------
export function bodyFat(v: Record<string, any>): CalcResult[] {
  const male = String(v.sex || 'male') === 'male';
  const cm = (x: number) => toCm(x, String(v.unit || 'cm'));
  const height = cm(safe(v.height, 30, 280));
  const neck = cm(safe(v.neck, 1, 100));
  const waist = cm(safe(v.waist, 1, 300));
  const hip = cm(safe(v.hip, 1, 300));
  let bf: number;
  if (male) {
    if (waist - neck <= 0) return [{ label: 'Check measurements', value: 'Waist must exceed neck circumference.', main: true }];
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (waist + hip - neck <= 0) return [{ label: 'Check measurements', value: 'Waist + hip must exceed neck.', main: true }];
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  const cat = bf < (male ? 6 : 14) ? 'Essential fat' : bf < (male ? 14 : 21) ? 'Athletic' : bf < (male ? 18 : 25) ? 'Fitness' : bf < (male ? 25 : 32) ? 'Average' : 'Above average';
  return [
    { label: 'Body fat (US Navy method)', value: num(bf, 1) + '%', main: true },
    { label: 'Category', value: cat },
  ];
}

export function dueDate(v: Record<string, any>): CalcResult[] {
  const lmp = new Date(String(v.lmp || ''));
  if (isNaN(lmp.getTime())) return [{ label: 'Enter LMP date', value: 'Pick the first day of your last menstrual period.', main: true }];
  const cycle = safe(v.cycle, 20, 45);
  const adjust = cycle - 28;
  const due = new Date(lmp.getTime() + (280 + adjust) * 86400000);
  const today = new Date();
  const daysPreg = Math.floor((today.getTime() - lmp.getTime()) / 86400000);
  const week = Math.floor(daysPreg / 7);
  const trimester = week < 13 ? 'First' : week < 27 ? 'Second' : 'Third';
  return [
    { label: 'Estimated due date', value: due.toDateString(), main: true },
    { label: 'Current gestational age', value: daysPreg >= 0 && daysPreg < 300 ? `${week} weeks, ${daysPreg % 7} days` : '—' },
    { label: 'Trimester', value: daysPreg >= 0 && daysPreg < 300 ? trimester : '—' },
    { label: 'Note', value: 'An estimate (Naegele\'s rule). Your provider\'s ultrasound dating is more accurate.' },
  ];
}

export function ovulation(v: Record<string, any>): CalcResult[] {
  const lmp = new Date(String(v.lmp || ''));
  if (isNaN(lmp.getTime())) return [{ label: 'Enter LMP date', value: 'Pick the first day of your last period.', main: true }];
  const cycle = safe(v.cycle, 20, 45), luteal = safe(v.luteal, 10, 16);
  const nextPeriod = new Date(lmp.getTime() + cycle * 86400000);
  const ovDay = new Date(nextPeriod.getTime() - luteal * 86400000);
  const fertileStart = new Date(ovDay.getTime() - 5 * 86400000);
  const fertileEnd = new Date(ovDay.getTime() + 1 * 86400000);
  return [
    { label: 'Estimated ovulation', value: ovDay.toDateString(), main: true },
    { label: 'Fertile window', value: `${fertileStart.toLocaleDateString()} – ${fertileEnd.toLocaleDateString()}` },
    { label: 'Next period (est.)', value: nextPeriod.toDateString() },
    { label: 'Note', value: 'Estimates assume a regular cycle; actual ovulation varies.' },
  ];
}

export function sleep(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'wake');
  const t = String(v.time || '07:00').split(':');
  const base = new Date(); base.setHours(parseInt(t[0]) || 7, parseInt(t[1]) || 0, 0, 0);
  const latency = 15; // min to fall asleep
  const results: string[] = [];
  for (let cycles = 6; cycles >= 3; cycles--) {
    const delta = (cycles * 90 + latency) * 60000;
    const target = mode === 'wake' ? new Date(base.getTime() - delta) : new Date(base.getTime() + delta);
    results.push(`${target.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} (${cycles} cycles · ${(cycles * 1.5).toFixed(1)}h)`);
  }
  return [
    { label: mode === 'wake' ? 'To wake refreshed, fall asleep at' : 'Best wake times', value: results[0], main: true },
    ...results.slice(1).map(r => ({ label: 'Alternative', value: r })),
  ];
}

export function bac(v: Record<string, any>): CalcResult[] {
  const male = String(v.sex || 'male') === 'male';
  const weightKg = toKg(safe(v.weight, 1, 700), String(v.unit || 'kg'));
  const drinks = safe(v.drinks, 0, 50);
  const hours = safe(v.hours, 0, 24);
  const r = male ? 0.68 : 0.55;
  const alcoholGrams = drinks * 14; // 1 US standard drink ≈ 14g
  const bodyWaterGrams = weightKg * 1000 * r;
  let bacPct = (alcoholGrams / bodyWaterGrams) * 100 - 0.015 * hours;
  bacPct = Math.max(0, bacPct);
  const status = bacPct === 0 ? 'Sober' : bacPct < 0.08 ? 'Impaired — do not drive' : 'Over US legal limit (0.08%)';
  return [
    { label: 'Estimated BAC', value: num(bacPct, 3) + '%', main: true },
    { label: 'Status', value: status },
    { label: 'Warning', value: 'A rough estimate only. Never use this to decide whether to drive — never drink and drive.' },
  ];
}

export function a1c(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'a1c');
  if (mode === 'a1c') {
    const a1cVal = safe(v.value, 0, 20);
    const eag = 28.7 * a1cVal - 46.7;
    return [
      { label: 'Estimated average glucose', value: num(eag, 0) + ' mg/dL', main: true },
      { label: 'In mmol/L', value: num(eag / 18, 1) + ' mmol/L' },
      { label: 'Note', value: 'Educational estimate (ADA formula). Discuss results with your doctor.' },
    ];
  }
  const eag = safe(v.value, 0, 600);
  const a1cVal = (eag + 46.7) / 28.7;
  return [
    { label: 'Estimated A1C', value: num(a1cVal, 1) + '%', main: true },
    { label: 'Note', value: 'Educational estimate only; lab A1C is definitive.' },
  ];
}

export function heartRateZones(v: Record<string, any>): CalcResult[] {
  const age = safe(v.age, 1, 120), resting = safe(v.resting, 30, 120);
  const maxHr = 208 - 0.7 * age; // Tanaka
  const reserve = maxHr - resting;
  const zone = (lo: number, hi: number) => `${Math.round(resting + reserve * lo)}–${Math.round(resting + reserve * hi)} bpm`;
  return [
    { label: 'Max heart rate (Tanaka)', value: Math.round(maxHr) + ' bpm', main: true },
    { label: 'Zone 1 — recovery (50–60%)', value: zone(0.5, 0.6) },
    { label: 'Zone 2 — endurance (60–70%)', value: zone(0.6, 0.7) },
    { label: 'Zone 3 — aerobic (70–80%)', value: zone(0.7, 0.8) },
    { label: 'Zone 4 — threshold (80–90%)', value: zone(0.8, 0.9) },
    { label: 'Zone 5 — max (90–100%)', value: zone(0.9, 1.0) },
  ];
}

export function waterIntake(v: Record<string, any>): CalcResult[] {
  const kg = toKg(safe(v.weight, 1, 700), String(v.unit || 'kg'));
  const activityMin = safe(v.activity, 0, 600);
  const base = kg * 35; // ml
  const bonus = (activityMin / 30) * 350;
  const total = base + bonus;
  return [
    { label: 'Daily water target', value: num(total / 1000, 1) + ' liters', main: true },
    { label: 'In US cups', value: num(total / 236.6, 1) + ' cups' },
    { label: 'In fluid ounces', value: num(total / 29.57, 0) + ' fl oz' },
    { label: 'Note', value: 'A general estimate; needs vary with climate, health, and diet.' },
  ];
}

export function protein(v: Record<string, any>): CalcResult[] {
  const kg = toKg(safe(v.weight, 1, 700), String(v.unit || 'kg'));
  const goal = String(v.goal || 'maintain');
  const range: Record<string, [number, number]> = { sedentary: [0.8, 1.0], maintain: [1.2, 1.6], active: [1.6, 2.0], muscle: [1.8, 2.2] };
  const [lo, hi] = range[goal] || range.maintain;
  return [
    { label: 'Daily protein target', value: `${num(kg * lo, 0)}–${num(kg * hi, 0)} g`, main: true },
    { label: 'Per meal (4 meals)', value: `${num(kg * lo / 4, 0)}–${num(kg * hi / 4, 0)} g` },
  ];
}

// ---------- Wave 2 health (extra) ----------
export function bsa(v: Record<string, any>): CalcResult[] {
  const cm = toCm(safe(v.height, 30, 280), String(v.hUnit || 'cm'));
  const kg = toKg(safe(v.weight, 1, 700), String(v.wUnit || 'kg'));
  const mosteller = Math.sqrt((cm * kg) / 3600);
  const dubois = 0.007184 * Math.pow(cm, 0.725) * Math.pow(kg, 0.425);
  return [
    { label: 'BSA (Mosteller)', value: num(mosteller, 3) + ' m²', main: true },
    { label: 'BSA (Du Bois)', value: num(dubois, 3) + ' m²' },
    { label: 'Note', value: 'Used for medication dosing and clinical indices. Educational estimate only.' },
  ];
}

export function whr(v: Record<string, any>): CalcResult[] {
  const waist = safe(v.waist, 1, 300), hip = safe(v.hip, 1, 300);
  const male = String(v.sex || 'male') === 'male';
  const ratio = waist / hip;
  const risk = male
    ? (ratio < 0.9 ? 'Low risk' : ratio < 1.0 ? 'Moderate risk' : 'High risk')
    : (ratio < 0.8 ? 'Low risk' : ratio < 0.85 ? 'Moderate risk' : 'High risk');
  return [
    { label: 'Waist-to-hip ratio', value: num(ratio, 2), main: true },
    { label: 'Health risk category', value: risk },
  ];
}

export function smokingCost(v: Record<string, any>): CalcResult[] {
  const perDay = safe(v.perDay, 0, 200), packPrice = safe(v.price, 0), packSize = safe(v.packSize, 1, 50);
  const dailyCost = (perDay / packSize) * packPrice;
  return [
    { label: 'Daily cost', value: money(dailyCost), main: true },
    { label: 'Monthly', value: money(dailyCost * 30.44) },
    { label: 'Yearly', value: money(dailyCost * 365) },
    { label: 'Over 10 years', value: money(dailyCost * 365 * 10) },
  ];
}
