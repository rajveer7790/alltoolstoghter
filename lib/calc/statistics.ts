import { CalcResult } from '../types';
import { num, pct, safe } from '../format';

// Standard normal CDF approximation (Abramowitz & Stegun)
function normalCDF(z: number): number {
  if (z < -6) return 0; if (z > 6) return 1;
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z);
  const t = 1 / (1 + p * z);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  return 0.5 * (1 + sign * y);
}
// Inverse normal (Beasley-Springer-Moro)
function normalInv(p: number): number {
  if (p <= 0) return -Infinity; if (p >= 1) return Infinity;
  const a=[2.50662823884,-18.61500062529,41.39119773534,-25.44106049637];
  const b=[-8.47351093090,23.08336743743,-21.06224101826,3.13082909833];
  const c=[0.3374754822726147,0.9761690190917186,0.1607979714918209,0.0276438810333863,0.0038405729373609,0.0003951896511349,0.0000321767881768,0.0000002888167364,0.0000003960315187];
  const q = p - 0.5;
  if (Math.abs(q) < 0.42) {
    const r = q*q; return q*(((a[3]*r+a[2])*r+a[1])*r+a[0])/((((b[3]*r+b[2])*r+b[1])*r+b[0])*r+1);
  }
  const r = q < 0 ? p : 1 - p;
  const s = Math.sqrt(-Math.log(r));
  let x = c[0]; for (let i=1;i<9;i++) x = x*s+c[i];
  return q < 0 ? -x : x;
}

export function zScore(v: Record<string, any>): CalcResult[] {
  const x = safe(v.value), mu = safe(v.mean), sigma = safe(v.std, 0);
  if (sigma <= 0) return [{ label: 'Standard deviation must be > 0', value: '—', main: true }];
  const z = (x - mu) / sigma;
  const pBelow = normalCDF(z), pAbove = 1 - pBelow;
  return [
    { label: 'Z-score', value: num(z, 4), main: true },
    { label: 'Percentile (below)', value: pct(pBelow * 100, 2) },
    { label: 'Probability above', value: pct(pAbove * 100, 2) },
    { label: 'Interpretation', value: `This value is ${num(Math.abs(z), 2)} standard deviations ${z >= 0 ? 'above' : 'below'} the mean.` },
  ];
}

export function confidenceInterval(v: Record<string, any>): CalcResult[] {
  const mean = safe(v.mean), sd = safe(v.sd, 0), n = Math.round(safe(v.n, 1));
  const conf = safe(v.confidence, 90, 99.9);
  if (sd <= 0 || n < 1) return [{ label: 'Check inputs', value: '—', main: true }];
  const alpha = 1 - conf / 100;
  const z = normalInv(1 - alpha / 2);
  const se = sd / Math.sqrt(n);
  const margin = z * se;
  return [
    { label: 'Confidence interval', value: `${num(mean - margin, 4)} to ${num(mean + margin, 4)}`, main: true },
    { label: 'Margin of error', value: num(margin, 4) },
    { label: 'Standard error', value: num(se, 4) },
    { label: 'Z-critical value', value: num(z, 4) },
    { label: 'Interpretation', value: `We are ${conf}% confident the true mean lies in this interval.` },
  ];
}

export function sampleSize(v: Record<string, any>): CalcResult[] {
  const conf = safe(v.confidence, 90, 99.9), margin = safe(v.margin, 0, 50), p = safe(v.proportion, 0, 100) / 100;
  if (margin <= 0) return [{ label: 'Enter margin of error', value: '—', main: true }];
  const alpha = 1 - conf / 100;
  const z = normalInv(1 - alpha / 2);
  const mFrac = margin / 100;
  const n = Math.ceil((z * z * p * (1 - p)) / (mFrac * mFrac));
  return [
    { label: 'Required sample size', value: String(n), main: true },
    { label: 'Confidence level', value: conf + '%' },
    { label: 'Margin of error', value: margin + '%' },
    { label: 'Z-critical', value: num(z, 4) },
    { label: 'Note', value: 'Assumes simple random sampling and large population. Adjust for finite populations.' },
  ];
}

export function correlationCoeff(v: Record<string, any>): CalcResult[] {
  const parse = (s: string) => String(s || '').split(/[\s,]+/).map(Number).filter(Number.isFinite);
  const xs = parse(String(v.x || '')), ys = parse(String(v.y || ''));
  if (xs.length < 3 || xs.length !== ys.length)
    return [{ label: 'Enter matching X and Y lists (≥3 pairs)', value: '—', main: true }];
  const n = xs.length;
  const mx = xs.reduce((a,b)=>a+b,0)/n, my = ys.reduce((a,b)=>a+b,0)/n;
  const num_ = xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0);
  const dx = Math.sqrt(xs.reduce((s,x)=>s+(x-mx)**2,0));
  const dy = Math.sqrt(ys.reduce((s,y)=>s+(y-my)**2,0));
  const r = dx*dy > 0 ? num_/(dx*dy) : 0;
  const strength = Math.abs(r) > 0.7 ? 'strong' : Math.abs(r) > 0.4 ? 'moderate' : 'weak';
  const direction = r > 0 ? 'positive' : 'negative';
  return [
    { label: 'Pearson r', value: num(r, 4), main: true },
    { label: 'R² (explained variance)', value: pct(r*r*100, 2) },
    { label: 'Interpretation', value: `${strength.charAt(0).toUpperCase()+strength.slice(1)} ${direction} correlation` },
    { label: 'Data pairs', value: String(n) },
  ];
}

export function pValue(v: Record<string, any>): CalcResult[] {
  const z = safe(v.zstat), tail = String(v.tail || 'two');
  const p1 = 1 - normalCDF(Math.abs(z));
  const pVal = tail === 'two' ? 2 * p1 : tail === 'right' ? p1 : normalCDF(z);
  const sig = pVal < 0.001 ? 'Highly significant (p < 0.001)' : pVal < 0.01 ? 'Very significant (p < 0.01)' : pVal < 0.05 ? 'Significant (p < 0.05)' : pVal < 0.10 ? 'Marginally significant (p < 0.10)' : 'Not significant (p ≥ 0.10)';
  return [
    { label: 'P-value', value: pVal < 0.0001 ? '< 0.0001' : num(pVal, 4), main: true },
    { label: 'Significance', value: sig },
    { label: 'Test type', value: tail === 'two' ? 'Two-tailed' : tail === 'right' ? 'Right-tailed' : 'Left-tailed' },
    { label: 'Z-statistic', value: num(z, 4) },
  ];
}
