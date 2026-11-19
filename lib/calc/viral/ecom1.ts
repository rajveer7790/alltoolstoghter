import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
const isNum = (x: unknown) => x !== '' && x !== null && x !== undefined && Number.isFinite(typeof x === 'number' ? x : parseFloat(String(x)));

// ---------- 1. COD vs prepaid expected profit ----------
export function codVsPrepaid(v: Record<string, any>): CalcResult[] {
  for (const k of ['price', 'cost', 'fwd', 'ret', 'codFee', 'gateway', 'codRto', 'prepaidRto', 'discount', 'recovery'])
    if (!isNum(v[k])) return bad('Every field must be a number.');
  const price = safe(v.price), cost = safe(v.cost), fwd = safe(v.fwd), ret = safe(v.ret), fee = safe(v.codFee);
  const gw = safe(v.gateway), rc = safe(v.codRto), rp = safe(v.prepaidRto), disc = safe(v.discount), rec = safe(v.recovery);
  if (price <= 0) return bad('Selling price must be greater than 0.');
  if (cost < 0 || fwd < 0 || ret < 0 || fee < 0 || disc < 0) return bad('Costs, fees and discount cannot be negative.');
  if (disc >= price) return bad('Prepaid discount must be smaller than the selling price.');
  if (gw < 0 || gw >= 100) return bad('Gateway fee must be between 0 and 99.99%.');
  if (rc < 0 || rc > 100 || rp < 0 || rp > 100) return bad('RTO rates must be between 0% and 100%.');
  if (rec < 0 || rec > 100) return bad('Product recovery must be between 0% and 100%.');
  const rC = rc / 100, rP = rp / 100;
  const loss = fwd + ret + cost * (1 - rec / 100); // loss on one returned (RTO) order
  const dCod = price - cost - fwd - fee; // profit on a delivered COD order
  const dPre = (price - disc) * (1 - gw / 100) - cost - fwd; // profit on a delivered prepaid order
  const eCod = (1 - rC) * dCod - rC * loss;
  const ePre = (1 - rP) * dPre - rP * loss;
  const diff = ePre - eCod;
  const denom = dCod + loss;
  const rows: CalcResult[] = [
    { label: 'Expected profit per COD order', value: num(eCod, 2) },
    { label: 'Expected profit per prepaid order', value: num(ePre, 2) },
    { label: 'Prepaid minus COD (per order)', value: (diff >= 0 ? '+' : '') + num(diff, 2), main: true },
    { label: 'Loss on one returned order', value: num(loss, 2) },
  ];
  if (denom > 0) {
    const be = ((dCod - ePre) / denom) * 100;
    rows.push({ label: 'Break-even COD RTO rate', value: be < 0 ? 'Below 0% (prepaid is ahead even at no COD returns)' : be > 100 ? 'Above 100% (COD is ahead at any RTO rate)' : num(be, 2) + '%' });
  } else rows.push({ label: 'Break-even COD RTO rate', value: 'Not defined for these inputs' });
  rows.push({ label: 'Better option', value: Math.abs(diff) < 0.005 ? 'Equal' : diff > 0 ? 'Prepaid' : 'COD' });
  return rows;
}

// ---------- 2. Volumetric weight / CBM ----------
export function volumetric(v: Record<string, any>): CalcResult[] {
  for (const k of ['l', 'w', 'h', 'actual', 'divisor', 'qty', 'rate'])
    if (!isNum(v[k])) return bad('Every field must be a number.');
  const inch = String(v.unit) === 'in';
  const f = inch ? 2.54 : 1;
  const l = safe(v.l) * f, w = safe(v.w) * f, h = safe(v.h) * f;
  const actual = safe(v.actual), div = safe(v.divisor), qty = Math.floor(safe(v.qty)), rate = safe(v.rate);
  if (l <= 0 || w <= 0 || h <= 0) return bad('Length, width and height must be greater than 0.');
  if (actual < 0) return bad('Actual weight cannot be negative.');
  if (div <= 0) return bad('Divisor must be greater than 0 (ask your carrier; often 4000 to 6000).');
  if (qty < 1) return bad('Quantity must be at least 1.');
  if (rate < 0) return bad('Rate per kg cannot be negative.');
  const cm3 = l * w * h;
  const vol = cm3 / div;
  const chargeable = Math.max(actual, vol);
  const cbm = cm3 / 1e6;
  const rows: CalcResult[] = [
    { label: 'Volumetric weight per carton', value: num(vol, 3) + ' kg' },
    { label: 'Chargeable weight per carton', value: num(chargeable, 3) + ' kg', main: true },
    { label: 'Binding weight', value: Math.abs(actual - vol) < 1e-9 ? 'Equal' : vol > actual ? 'Volumetric' : 'Actual' },
    { label: `Total chargeable weight (${int(qty)} cartons)`, value: num(chargeable * qty, 3) + ' kg' },
    { label: 'CBM per carton', value: num(cbm, 4) + ' m³' },
    { label: 'Total CBM', value: num(cbm * qty, 4) + ' m³' },
  ];
  if (rate > 0) rows.push({ label: 'Freight at your rate', value: num(chargeable * qty * rate, 2) });
  return rows;
}

// ---------- 3. MER / break-even ROAS ----------
export function merBreakEven(v: Record<string, any>): CalcResult[] {
  for (const k of ['revenue', 'adSpend', 'orders', 'gm', 'varCost', 'targetMargin'])
    if (!isNum(v[k])) return bad('Every field must be a number.');
  const revenue = safe(v.revenue), ad = safe(v.adSpend), orders = safe(v.orders), gm = safe(v.gm), vc = safe(v.varCost), tm = safe(v.targetMargin);
  if (revenue <= 0) return bad('Total revenue must be greater than 0.');
  if (ad <= 0) return bad('Ad spend must be greater than 0.');
  if (orders <= 0) return bad('Orders must be greater than 0.');
  if (gm <= 0 || gm > 100) return bad('Gross margin must be between 0% and 100%.');
  if (vc < 0) return bad('Other variable cost cannot be negative.');
  if (tm < 0 || tm >= 100) return bad('Target profit margin must be between 0% and 99.99%.');
  const aov = revenue / orders;
  const cm = aov * (gm / 100) - vc;
  if (cm <= 0) return bad('Contribution margin per order is zero or negative (' + num(cm, 2) + '), so no ad spend can break even. Lower costs or raise AOV or margin.');
  const profit = orders * cm - ad;
  const targetCpa = cm - (tm / 100) * aov;
  return [
    { label: 'Break-even ROAS', value: num(aov / cm, 2) + 'x', main: true },
    { label: 'Break-even CPA (max)', value: num(cm, 2) },
    { label: 'MER (revenue / ad spend)', value: num(revenue / ad, 2) + 'x' },
    { label: 'Average order value', value: num(aov, 2) },
    { label: 'Contribution margin per order (before ads)', value: num(cm, 2) },
    { label: 'Actual CPA (ad spend / orders)', value: num(ad / orders, 2) },
    { label: `Target CPA for ${num(tm, 1)}% profit margin`, value: targetCpa > 0 ? num(targetCpa, 2) : 'Not reachable at this margin' },
    { label: 'Net profit after ads', value: num(profit, 2) },
  ];
}

// ---------- 4. A/B significance ----------
/** Complementary error function, accurate to ~1e-15 relative for x >= 0. */
export function erfc(x: number): number {
  if (!Number.isFinite(x)) return x > 0 ? 0 : 2;
  if (x < 0) return 2 - erfc(-x);
  if (x < 3) {
    // erf(x) = 2/sqrt(pi) * exp(-x^2) * sum_{n>=0} 2^n x^(2n+1) / (1*3*...*(2n+1)); all terms positive
    let term = x, sum = x;
    for (let n = 1; n < 200; n++) {
      term *= (2 * x * x) / (2 * n + 1);
      sum += term;
      if (term < sum * 1e-17) break;
    }
    return 1 - (2 / Math.sqrt(Math.PI)) * Math.exp(-x * x) * sum;
  }
  // continued fraction: erfc(x) = exp(-x^2)/sqrt(pi) / (x + (1/2)/(x + 1/(x + (3/2)/(x + ...))))
  let t = x;
  for (let k = 80; k >= 1; k--) t = x + (k / 2) / t;
  return Math.exp(-x * x) / Math.sqrt(Math.PI) / t;
}
export const twoSidedP = (z: number) => erfc(Math.abs(z) / Math.SQRT2);
const Z_CRIT: Record<string, number> = { '90': 1.6448536269514722, '95': 1.959963984540054, '99': 2.5758293035489004 };

export function abTest(v: Record<string, any>): CalcResult[] {
  for (const k of ['nA', 'xA', 'nB', 'xB'])
    if (!isNum(v[k])) return bad('Visitors and conversions must be numbers.');
  const nA = safe(v.nA), xA = safe(v.xA), nB = safe(v.nB), xB = safe(v.xB);
  const conf = String(v.confidence ?? '95');
  const zc = Z_CRIT[conf];
  if (!zc) return bad('Confidence level must be 90, 95 or 99.');
  if (nA < 1 || nB < 1) return bad('Visitors in each variant must be at least 1.');
  if (xA < 0 || xB < 0) return bad('Conversions cannot be negative.');
  if (xA > nA || xB > nB) return bad('Conversions cannot exceed visitors.');
  const pA = xA / nA, pB = xB / nB;
  const pool = (xA + xB) / (nA + nB);
  if (pool <= 0 || pool >= 1) return bad('Both variants have 0% or both have 100% conversion, so the test statistic is undefined.');
  const se = Math.sqrt(pool * (1 - pool) * (1 / nA + 1 / nB));
  const diff = pB - pA;
  const z = diff / se;
  const p = twoSidedP(z);
  const alpha = 1 - Number(conf) / 100;
  const seU = Math.sqrt((pA * (1 - pA)) / nA + (pB * (1 - pB)) / nB);
  const lo = (diff - zc * seU) * 100, hi = (diff + zc * seU) * 100;
  const sig = p < alpha;
  return [
    { label: 'Significant at ' + conf + '% confidence?', value: sig ? 'Yes (p < ' + num(alpha, 2) + ')' : 'No (p ≥ ' + num(alpha, 2) + ')', main: true },
    { label: 'Two-sided p-value', value: p < 0.0001 ? '< 0.0001' : num(p, 4) },
    { label: 'z statistic', value: num(z, 3) },
    { label: 'Conversion rate A / B', value: num(pA * 100, 2) + '% / ' + num(pB * 100, 2) + '%' },
    { label: 'Absolute lift (B - A)', value: (diff >= 0 ? '+' : '') + num(diff * 100, 2) + ' pp' },
    { label: 'Relative lift', value: pA > 0 ? (diff >= 0 ? '+' : '') + num((diff / pA) * 100, 1) + '%' : 'n/a (A has 0 conversions)' },
    { label: conf + '% CI for difference', value: num(lo, 2) + ' to ' + num(hi, 2) + ' pp' },
    { label: 'Note', value: 'Fix sample size in advance; repeated peeking or many variants inflate false positives.' },
  ];
}

export const COMPUTES_ECOM1: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'cod-vs-prepaid-rto-breakeven-calculator': codVsPrepaid,
  'volumetric-weight-calculator': volumetric,
  'ecommerce-mer-break-even-roas-calculator': merBreakEven,
  'ab-test-significance-calculator': abTest,
};
