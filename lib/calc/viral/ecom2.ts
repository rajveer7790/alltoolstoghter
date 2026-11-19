import { CalcResult } from '../../types';
import { num } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
/** Strict numeric parse: blank / non-numeric becomes NaN (never silently 0). */
const n = (x: unknown): number => {
  if (typeof x === 'number') return x;
  const s = String(x ?? '').trim();
  return s === '' ? NaN : Number(s);
};
const LIM = 1e12;
const ok = (x: number, min: number, max = LIM) => Number.isFinite(x) && x >= min && x <= max;

/** One-sided standard normal quantiles for the service levels offered. */
export const Z_BY_LEVEL: Record<string, number> = { '90': 1.2816, '95': 1.6449, '97.5': 1.96, '99': 2.3263 };

export function reorderEoq(v: Record<string, any>): CalcResult[] {
  const D = n(v.annualDemand), S = n(v.orderCost), H = n(v.holdingCost);
  const L = n(v.leadTime), sd = n(v.sdDaily), cost = n(v.unitCost);
  const z = Z_BY_LEVEL[String(v.service ?? '95')];
  if (!ok(D, 1e-9)) return bad('Annual demand must be greater than 0');
  if (!ok(S, 1e-9)) return bad('Order (setup) cost must be greater than 0');
  if (!ok(H, 1e-9)) return bad('Holding cost per unit per year must be greater than 0');
  if (!ok(L, 1e-9, 3650)) return bad('Lead time must be greater than 0 days');
  if (!ok(sd, 0)) return bad('Daily demand standard deviation must be 0 or more');
  if (!ok(cost, 0)) return bad('Unit cost must be 0 or more');
  if (z === undefined) return bad('Choose a service level');
  const d = D / 365;
  const eoq = Math.sqrt((2 * D * S) / H);
  const orders = D / eoq;
  const cycle = eoq / d;
  const ss = z * sd * Math.sqrt(L);
  const rop = d * L + ss;
  const ordering = orders * S, holding = (eoq / 2) * H;
  const out: CalcResult[] = [
    { label: 'Economic order quantity (EOQ)', value: `${num(eoq, 1)} units`, main: true },
    { label: 'Reorder point (ROP)', value: `${num(rop, 1)} units` },
    { label: 'Safety stock', value: `${num(ss, 1)} units` },
    { label: 'Average daily demand', value: `${num(d, 2)} units/day` },
    { label: 'Orders per year', value: num(orders, 2) },
    { label: 'Order cycle', value: `${num(cycle, 1)} days` },
    { label: 'Annual ordering + holding cost', value: num(ordering + holding, 2) },
  ];
  if (cost > 0) out.push({ label: 'Total annual cost incl. purchases', value: num(ordering + holding + D * cost, 2) });
  return out;
}

const OFFERS: Record<string, [number, number]> = { bogo: [1, 1], b2g1: [2, 1] };

export function bogoBreakeven(v: Record<string, any>): CalcResult[] {
  const price = n(v.price), cost = n(v.cost), units = n(v.units);
  const offer = String(v.offer ?? 'bogo');
  if (!ok(price, 1e-9)) return bad('Price must be greater than 0');
  if (!ok(cost, 0)) return bad('Unit cost must be 0 or more');
  if (cost >= price) return bad('Unit cost must be below the normal price (baseline profit must be positive)');
  if (!ok(units, 1e-9)) return bad('Baseline units must be greater than 0');
  let discount: number, offerProfit: number;
  if (offer === 'pct') {
    const x = n(v.percentOff);
    if (!ok(x, 0, 99.999)) return bad('Percent off must be from 0 to below 100');
    discount = x / 100;
    offerProfit = price * (1 - discount) - cost;
  } else {
    let buy: number, free: number;
    if (offer === 'custom') { buy = n(v.buy); free = n(v.free); }
    else if (OFFERS[offer]) [buy, free] = OFFERS[offer];
    else return bad('Choose an offer type');
    if (!ok(buy, 1e-9, 1e6)) return bad('Buy quantity must be greater than 0');
    if (!ok(free, 0, 1e6)) return bad('Free quantity must be 0 or more');
    discount = free / (buy + free);
    offerProfit = (price * buy - cost * (buy + free)) / (buy + free);
  }
  const baseProfit = price - cost;
  const baseTotal = baseProfit * units;
  const out: CalcResult[] = [];
  const offerRevenue = price * (1 - discount);
  const common: CalcResult[] = [
    { label: 'Effective discount', value: `${num(discount * 100, 2)}%` },
    { label: 'Profit per unit (normal price)', value: num(baseProfit, 2) },
    { label: 'Profit per unit (under offer)', value: num(offerProfit, 2) },
    { label: 'Margin under offer', value: `${num((offerProfit / offerRevenue) * 100, 2)}%` },
    { label: 'Baseline profit per period', value: num(baseTotal, 2) },
  ];
  if (offerProfit <= 0) {
    out.push({ label: 'Break-even volume uplift', value: 'No volume can compensate (profit per unit under the offer is zero or negative)', main: true });
    return [...out, ...common.slice(0, 4)];
  }
  const needed = baseTotal / offerProfit;
  out.push({ label: 'Break-even volume uplift', value: `+${num(((needed - units) / units) * 100, 1)}%`, main: true });
  out.push(...common);
  out.push({ label: 'Units needed to match profit', value: num(needed, 1) });
  out.push({ label: 'Extra units needed', value: num(needed - units, 1) });
  return out;
}

export function priceElasticity(v: Record<string, any>): CalcResult[] {
  const P1 = n(v.p1), Q1 = n(v.q1), P2 = n(v.p2), Q2 = n(v.q2);
  const c = n(v.cost);
  if (!ok(P1, 1e-9) || !ok(P2, 1e-9)) return bad('Both prices must be greater than 0');
  if (!ok(Q1, 1e-9) || !ok(Q2, 1e-9)) return bad('Both quantities must be greater than 0');
  if (P1 === P2) return bad('The two prices must differ (elasticity is undefined for no price change)');
  if (!ok(c, 0)) return bad('Unit cost must be 0 or more');
  const dQ = (Q2 - Q1) / ((Q1 + Q2) / 2);
  const dP = (P2 - P1) / ((P1 + P2) / 2);
  const E = dQ / dP;
  const a = Math.abs(E);
  const cls = Math.abs(a - 1) < 1e-9 ? 'Unit elastic (|E| = 1)' : a > 1 ? 'Elastic (|E| > 1)' : a === 0 ? 'Perfectly inelastic (E = 0)' : 'Inelastic (|E| < 1)';
  const r1 = P1 * Q1, r2 = P2 * Q2;
  const out: CalcResult[] = [
    { label: 'Arc (midpoint) elasticity E', value: num(E, 3), main: true },
    { label: 'Classification', value: cls },
    { label: '% change in quantity (midpoint)', value: `${num(dQ * 100, 2)}%` },
    { label: '% change in price (midpoint)', value: `${num(dP * 100, 2)}%` },
    { label: 'Revenue before', value: num(r1, 2) },
    { label: 'Revenue after', value: num(r2, 2) },
    { label: 'Revenue change', value: `${num(((r2 - r1) / r1) * 100, 2)}%` },
  ];
  out.push(E < -1 && c > 0
    ? { label: 'Profit-maximising price P* = c·E/(1+E)', value: num((c * E) / (1 + E), 2) }
    : { label: 'Profit-maximising price P*', value: c > 0 ? 'Not defined (needs E below -1)' : 'Enter a unit cost above 0' });
  return out;
}

export function fmtHm(hours: number): string {
  const total = Math.round(hours * 60);
  return `${Math.floor(total / 60)} h ${total % 60} min`;
}

export function evCharging(v: Record<string, any>): CalcResult[] {
  const B = n(v.battery), s = n(v.start), t = n(v.target);
  const kw = n(v.chargerKw), car = n(v.carKw), eff = n(v.eff);
  const tariff = n(v.tariff), cons = n(v.consumption);
  if (!ok(B, 1e-9, 1000)) return bad('Usable battery size must be greater than 0 kWh');
  if (!ok(s, 0, 100) || !ok(t, 0, 100)) return bad('State of charge values must be between 0 and 100%');
  if (t <= s) return bad('Target charge must be higher than the starting charge');
  if (!ok(kw, 1e-9, 1000)) return bad('Charger power must be greater than 0 kW');
  if (!ok(car, 1e-9, 1000)) return bad('Car onboard AC charger limit must be greater than 0 kW');
  if (!ok(eff, 1, 100)) return bad('Charging efficiency must be from 1 to 100%');
  if (!ok(tariff, 0)) return bad('Electricity price must be 0 or more');
  if (!ok(cons, 1e-9, 1000)) return bad('Consumption must be greater than 0 kWh/100 km');
  const added = (B * (t - s)) / 100;
  const effKw = Math.min(kw, car);
  const e = eff / 100;
  const hours = added / (effKw * e);
  const grid = added / e;
  return [
    { label: 'Charging time', value: `${num(hours, 2)} h (${fmtHm(hours)})`, main: true },
    { label: 'Energy added to battery', value: `${num(added, 2)} kWh` },
    { label: 'Energy drawn from grid', value: `${num(grid, 2)} kWh` },
    { label: 'Effective charge power (limit)', value: `${num(effKw, 2)} kW` },
    { label: 'Cost of this charge', value: num(grid * tariff, 2) },
    { label: 'Cost per 100 km', value: num((cons / e) * tariff, 2) },
    { label: 'Estimated range added', value: `${num((added / cons) * 100, 0)} km` },
  ];
}

export const COMPUTES_ECOM2: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'reorder-point-eoq-calculator': reorderEoq,
  'bogo-discount-breakeven-calculator': bogoBreakeven,
  'price-elasticity-calculator': priceElasticity,
  'ev-home-charging-time-cost-calculator': evCharging,
};
