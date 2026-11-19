import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
const fin = (n: number) => Number.isFinite(n);

/* ------------------------------------------------------------------ */
/* 1. Room air conditioner sizing (ENERGY STAR chart)                  */
/* ------------------------------------------------------------------ */
// ENERGY STAR room AC sizing chart: [upper bound of floor area in sq ft, BTU/h].
// Every row was confirmed against ENERGY STAR text via web search except the last
// (2,000-2,500 sq ft -> 34,000), where the search snippet was cut off at "34,00";
// 34,000 comes from the implementation notes and is not independently confirmed.
export const AC_CHART: [number, number][] = [
  [150, 5000], [250, 6000], [300, 7000], [350, 8000], [400, 9000], [450, 10000],
  [550, 12000], [700, 14000], [1000, 18000], [1200, 21000], [1400, 23000],
  [1500, 24000], [2000, 30000], [2500, 34000],
];
export const SQM_TO_SQFT = 10.7639;
export const BTU_PER_TON = 12000;
export const BTU_H_TO_W = 0.29307107;

export function acChartBtu(sqft: number): number | null {
  if (!fin(sqft) || sqft < 100 || sqft > 2500) return null;
  for (const [upper, btu] of AC_CHART) if (sqft <= upper) return btu;
  return null;
}

function acSizing(v: Record<string, any>): CalcResult[] {
  const raw = safe(v.area);
  if (raw <= 0) return bad('Enter a floor area greater than 0.');
  const sqft = String(v.unit) === 'sqm' ? raw * SQM_TO_SQFT : raw;
  const base = acChartBtu(sqft);
  if (base === null) return bad(`Area of ${num(sqft, 0)} sq ft is outside the 100–2,500 sq ft sizing chart range.`);
  const sun = String(v.sun);
  const sunFactor = sun === 'sunny' ? 1.1 : sun === 'shaded' ? 0.9 : 1;
  const people = Math.floor(safe(v.people, 0, 100));
  const extraPeople = Math.max(0, people - 2);
  const kitchen = String(v.kitchen) === 'yes';
  const total = base * sunFactor + extraPeople * 600 + (kitchen ? 4000 : 0);
  return [
    { label: 'Estimated capacity needed', value: `${int(total)} BTU/h`, main: true },
    { label: 'Tons of refrigeration', value: `${num(total / BTU_PER_TON, 2)} tons` },
    { label: 'Cooling capacity', value: `${num(total * BTU_H_TO_W / 1000, 2)} kW` },
    { label: 'Chart value for the area', value: `${int(base)} BTU/h (${num(sqft, 0)} sq ft)` },
    { label: 'Sun adjustment', value: sun === 'sunny' ? '+10%' : sun === 'shaded' ? '-10%' : 'none' },
    { label: 'Extra people (beyond 2)', value: `${extraPeople} × 600 = ${int(extraPeople * 600)} BTU/h` },
    { label: 'Kitchen allowance', value: kitchen ? '+4,000 BTU/h' : 'none' },
    { label: 'Note', value: 'Estimate only; confirm with an installer.' },
  ];
}

/* ------------------------------------------------------------------ */
/* 2. TV viewing distance                                              */
/* ------------------------------------------------------------------ */
const ASPECTS: Record<string, [number, number]> = { '16:9': [16, 9], '21:9': [21, 9], '4:3': [4, 3], '16:10': [16, 10] };
export const screenWidth = (diag: number, w: number, h: number) => diag * Math.cos(Math.atan(h / w));
export const screenHeight = (diag: number, w: number, h: number) => diag * Math.sin(Math.atan(h / w));
const rad = (deg: number) => (deg * Math.PI) / 180;
export const distanceForFov = (width: number, fovDeg: number) => width / 2 / Math.tan(rad(fovDeg) / 2);
export const fovForDistance = (width: number, dist: number) => (2 * Math.atan(width / (2 * dist)) * 180) / Math.PI;

function tvDistance(v: Record<string, any>): CalcResult[] {
  const diag = safe(v.diag);
  if (diag <= 0) return bad('Enter a screen diagonal greater than 0.');
  let aw: number, ah: number;
  const key = String(v.aspect);
  if (key === 'custom') {
    aw = safe(v.cw); ah = safe(v.ch);
    if (aw <= 0 || ah <= 0) return bad('Enter custom aspect ratio width and height greater than 0.');
  } else [aw, ah] = ASPECTS[key] ?? ASPECTS['16:9'];
  const fov = safe(v.fov);
  if (fov < 5 || fov > 120) return bad('Custom field of view must be between 5 and 120 degrees.');
  const unit = String(v.unit) === 'cm' ? 'cm' : 'in';
  const w = screenWidth(diag, aw, ah), h = screenHeight(diag, aw, ah);
  const rows: CalcResult[] = [
    { label: 'Distance for 30° field of view (SMPTE guidance)', value: `${num(distanceForFov(w, 30), 1)} ${unit}`, main: true },
    { label: 'Distance for 40° field of view (THX guidance)', value: `${num(distanceForFov(w, 40), 1)} ${unit}` },
    { label: `Distance for ${num(fov, 1)}° field of view`, value: `${num(distanceForFov(w, fov), 1)} ${unit}` },
    { label: 'Screen width × height', value: `${num(w, 1)} × ${num(h, 1)} ${unit}` },
  ];
  const d = safe(v.dist);
  if (d > 0) rows.push({ label: `Field of view from ${num(d, 1)} ${unit}`, value: `${num(fovForDistance(w, d), 1)}°` });
  rows.push({ label: 'Note', value: 'Guidelines, not rules; comfort varies by person and content.' });
  return rows;
}

/* ------------------------------------------------------------------ */
/* 3. Coffee brew ratio                                                */
/* ------------------------------------------------------------------ */
function coffeeRatio(v: Record<string, any>): CalcResult[] {
  const ratio = safe(v.ratio);
  if (ratio <= 0 || ratio > 100) return bad('Ratio (water per 1 g coffee) must be between 0 and 100.');
  let dose: number, water: number;
  if (String(v.mode) === 'volume') {
    const vol = safe(v.cups, 0, 1000) * safe(v.cupMl, 0, 100000);
    if (vol <= 0) return bad('Enter cups and cup size greater than 0 for target-volume mode.');
    water = vol; dose = water / ratio;
  } else {
    dose = safe(v.dose);
    if (dose <= 0) return bad('Enter a coffee dose greater than 0 g.');
    water = dose * ratio;
  }
  const rows: CalcResult[] = [
    { label: 'Brew water', value: `${num(water, 1)} g (${num(water, 1)} ml)`, main: true },
    { label: 'Coffee dose', value: `${num(dose, 1)} g` },
    { label: 'Ratio', value: `1:${num(ratio, 2)} (coffee:water by mass)` },
  ];
  const tds = safe(v.tds, 0, 100), out = safe(v.bevG, 0, 1e6);
  if (tds > 0 && out > 0) rows.push({ label: 'Extraction yield', value: `${num(tds * out / dose, 1)}% (TDS × beverage g ÷ dose g)` });
  const conc = safe(v.concRatio, 0, 1000), target = safe(v.targetRatio, 0, 1000);
  if (conc > 0) {
    if (target <= conc) return bad('Target ratio must be higher (more dilute) than the concentrate ratio.');
    rows.push({ label: 'Water to add to concentrate', value: `${num(dose * (target - conc), 1)} g` });
    rows.push({ label: 'Diluted beverage mass', value: `${num(dose * target, 1)} g at 1:${num(target, 2)}` });
  }
  rows.push({ label: 'Note', value: 'A ratio is a starting point; adjust to taste.' });
  return rows;
}

/* ------------------------------------------------------------------ */
/* 4. Baker's percentage                                               */
/* ------------------------------------------------------------------ */
export function bakersSolve(total: number, hydr: number, salt: number, starterPct: number, starterHyd: number) {
  const h = hydr / 100, s = salt / 100, p = starterPct / 100, hs = starterHyd / 100;
  const flour = total / (1 + h + s);
  const water = h * flour;
  const saltG = s * flour;
  const starter = p * flour;
  const sFlour = starter / (1 + hs);
  const sWater = starter - sFlour;
  return { flour, water, saltG, starter, sFlour, sWater, addFlour: flour - sFlour, addWater: water - sWater };
}

function bakers(v: Record<string, any>): CalcResult[] {
  const total = safe(v.total), hydr = safe(v.hydration), salt = safe(v.salt, 0, 100);
  const sp = safe(v.starterPct, 0, 1000), sh = safe(v.starterHyd, 0, 1000);
  const balls = Math.max(1, Math.floor(safe(v.balls, 1, 1000)));
  if (total <= 0) return bad('Enter a total dough weight greater than 0 g.');
  if (hydr < 30 || hydr > 150) return bad('Hydration must be between 30% and 150%.');
  if (salt > 10) return bad('Salt above 10% of flour is not supported.');
  if (sp > 100) return bad('Starter above 100% of flour is not supported.');
  if (sp > 0 && sh < 20) return bad('Starter hydration must be at least 20%.');
  const r = bakersSolve(total, hydr, salt, sp, sh);
  if (r.addWater < 0 || r.addFlour < 0) return bad('Starter contains more water or flour than the recipe allows; lower starter % or raise hydration.');
  const sum = r.addFlour + r.addWater + r.saltG + r.starter;
  return [
    { label: 'Total flour (100%)', value: `${num(r.flour, 1)} g`, main: true },
    { label: 'Flour to add', value: `${num(r.addFlour, 1)} g` },
    { label: 'Water to add', value: `${num(r.addWater, 1)} g` },
    { label: 'Salt', value: `${num(r.saltG, 1)} g` },
    { label: 'Starter', value: `${num(r.starter, 1)} g (${num(r.sFlour, 1)} g flour + ${num(r.sWater, 1)} g water)` },
    { label: 'Total water', value: `${num(r.water, 1)} g` },
    { label: `Per dough ball (${balls})`, value: `${num(total / balls, 1)} g` },
    { label: 'Check: ingredients sum', value: `${num(sum, 1)} g = ${num(total, 1)} g` },
  ];
}

/* ------------------------------------------------------------------ */
/* 5. Caffeine half-life                                               */
/* ------------------------------------------------------------------ */
export const decay = (dose: number, hours: number, halfLife: number) => dose * Math.pow(0.5, hours / halfLife);

function caffeine(v: Record<string, any>): CalcResult[] {
  const d1 = safe(v.dose), hl = safe(v.halfLife), t1 = safe(v.hours), d2 = safe(v.dose2), t2 = safe(v.hours2), thr = safe(v.threshold);
  if (d1 <= 0) return bad('Enter a first caffeine dose greater than 0 mg.');
  if (hl < 0.5 || hl > 30) return bad('Half-life must be between 0.5 and 30 hours.');
  if (t1 < 0 || t1 > 168 || t2 < 0 || t2 > 168) return bad('Hours since intake must be between 0 and 168.');
  if (d2 < 0) return bad('Second dose cannot be negative.');
  if (thr <= 0) return bad('Enter a threshold greater than 0 mg.');
  const now = decay(d1, t1, hl) + (d2 > 0 ? decay(d2, t2, hl) : 0);
  const ingested = d1 + d2;
  // both doses decay at the same rate, so the sum follows now * 0.5^(x / halfLife)
  const wait = now > thr ? hl * Math.log2(now / thr) : 0;
  return [
    { label: 'Caffeine remaining now', value: `${num(now, 1)} mg`, main: true },
    { label: 'Share of caffeine ingested', value: `${num(now / ingested * 100, 1)}%` },
    { label: `Hours until below ${num(thr, 1)} mg`, value: `${num(wait, 1)} h` },
    { label: 'Half-life used', value: `${num(hl, 1)} h` },
    { label: 'Note', value: 'Simple model; half-life varies widely between people. Not medical advice.' },
  ];
}

/* ------------------------------------------------------------------ */
/* 6. VDOT (Daniels & Gilbert)                                         */
/* ------------------------------------------------------------------ */
export function vdotOf(distM: number, tMin: number): number {
  const vel = distM / tMin;
  const vo2 = -4.6 + 0.182258 * vel + 0.000104 * vel * vel;
  const pct = 0.8 + 0.1894393 * Math.exp(-0.012778 * tMin) + 0.2989558 * Math.exp(-0.1932605 * tMin);
  return vo2 / pct;
}
/** Time (minutes) at which the given distance yields the given VDOT; bisection. */
export function timeForVdot(distM: number, vdot: number): number | null {
  let lo = distM / 500, hi = distM / 50;           // fast ... slow
  if (!(vdotOf(distM, lo) > vdot && vdotOf(distM, hi) < vdot)) return null;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (vdotOf(distM, mid) > vdot) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
export function fmtTime(min: number): string {
  const total = Math.round(min * 60);
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  const p = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`;
}
const RACES: [string, number][] = [['5K', 5000], ['10K', 10000], ['Half marathon', 21097.5], ['Marathon', 42195]];

function vdot(v: Record<string, any>): CalcResult[] {
  const dist = safe(v.distance);
  const t = safe(v.h, 0, 1000) * 60 + safe(v.m, 0, 100000) + safe(v.s, 0, 1e7) / 60;
  if (dist <= 0) return bad('Choose a race distance.');
  if (t <= 0) return bad('Enter a finish time greater than 0.');
  const vd = vdotOf(dist, t);
  if (!fin(vd) || vd < 15 || vd > 90) return bad('That time gives a VDOT outside 15–90, where the equations are meaningful.');
  const rows: CalcResult[] = [
    { label: 'VDOT', value: num(vd, 1), main: true },
    { label: 'Average pace', value: `${fmtTime(t / (dist / 1000))} /km (${fmtTime(t / (dist / 1609.344))} /mile)` },
  ];
  for (const [name, d] of RACES) {
    const pt = timeForVdot(d, vd);
    rows.push({ label: `Equivalent ${name}`, value: pt === null ? 'n/a' : fmtTime(pt) });
  }
  rows.push({ label: 'Note', value: 'Prediction from published Daniels equations, not a guarantee.' });
  return rows;
}

export const COMPUTES_LIFE: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'ac-btu-room-size-calculator': acSizing,
  'tv-viewing-distance-calculator': tvDistance,
  'coffee-brew-ratio-calculator': coffeeRatio,
  'sourdough-bakers-percentage-calculator': bakers,
  'caffeine-half-life-calculator': caffeine,
  'vdot-race-equivalency-calculator': vdot,
};
