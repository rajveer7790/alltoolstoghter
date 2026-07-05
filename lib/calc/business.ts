import { CalcResult } from '../types';
import { money, pct, num, int, safe } from '../format';

export function cacCalc(v: Record<string, any>): CalcResult[] {
  const spend = safe(v.spend, 0), customers = Math.max(1, safe(v.customers, 1));
  const cac = spend / customers;
  const ltv = safe(v.ltv, 0);
  const ratio = ltv > 0 ? ltv / cac : 0;
  return [
    { label: 'Customer Acquisition Cost', value: money(cac), main: true },
    { label: 'LTV:CAC ratio', value: ltv > 0 ? num(ratio, 2) + ':1' : '—' },
    { label: 'Interpretation', value: ratio >= 3 ? 'Healthy (≥3:1)' : ratio > 0 ? 'Below benchmark (<3:1)' : 'Enter LTV to see ratio' },
    { label: 'Total spend', value: money(spend) },
  ];
}

export function ltvCalc(v: Record<string, any>): CalcResult[] {
  const avgPurchase = safe(v.avgPurchase, 0), freq = safe(v.frequency, 0), lifespan = safe(v.lifespan, 0);
  const margin = safe(v.margin, 0, 100) / 100;
  const ltv = avgPurchase * freq * lifespan;
  const ltvMargin = ltv * margin;
  return [
    { label: 'Customer Lifetime Value', value: money(ltv), main: true },
    { label: 'LTV at gross margin', value: money(ltvMargin) },
    { label: 'Annual revenue per customer', value: money(avgPurchase * freq) },
    { label: 'Gross margin %', value: pct(margin * 100, 1) },
  ];
}

export function roasCalc(v: Record<string, any>): CalcResult[] {
  const revenue = safe(v.revenue, 0), spend = safe(v.spend, 0);
  if (spend <= 0) return [{ label: 'Enter ad spend', value: '—', main: true }];
  const roas = revenue / spend;
  const cogs = safe(v.cogs, 0);
  const profit = revenue - spend - cogs;
  const breakEvenRoas = (spend + cogs) / spend;
  return [
    { label: 'ROAS', value: num(roas, 2) + ':1', main: true },
    { label: 'Revenue per $1 spent', value: money(roas) },
    { label: 'Net profit', value: money(profit) },
    { label: 'Break-even ROAS', value: cogs > 0 ? num(breakEvenRoas, 2) + ':1' : '—' },
    { label: 'Status', value: roas >= 4 ? 'Strong (≥4:1)' : roas >= 2 ? 'Moderate (2-4:1)' : 'Weak (<2:1)' },
  ];
}

export function emailRoi(v: Record<string, any>): CalcResult[] {
  const listSize = safe(v.listSize, 0), openRate = safe(v.openRate, 0, 100)/100;
  const ctr = safe(v.ctr, 0, 100)/100, convRate = safe(v.convRate, 0, 100)/100;
  const avgOrder = safe(v.avgOrder, 0), costPerEmail = safe(v.cost, 0);
  const opens = listSize * openRate, clicks = opens * ctr;
  const conversions = clicks * convRate, revenue = conversions * avgOrder;
  const totalCost = listSize * costPerEmail;
  const roi = totalCost > 0 ? ((revenue - totalCost) / totalCost) * 100 : 0;
  return [
    { label: 'Estimated revenue', value: money(revenue), main: true },
    { label: 'ROI', value: pct(roi, 1) },
    { label: 'Opens', value: int(Math.round(opens)) },
    { label: 'Clicks', value: int(Math.round(clicks)) },
    { label: 'Conversions', value: int(Math.round(conversions)) },
    { label: 'Total cost', value: money(totalCost) },
  ];
}

export function employeeTurnover(v: Record<string, any>): CalcResult[] {
  const left = safe(v.left, 0), avgEmployees = safe(v.avg, 1);
  const rate = (left / avgEmployees) * 100;
  const annualCost = safe(v.salary, 0) * 0.5; // typical: 50% of salary to replace
  const totalCost = annualCost * left;
  return [
    { label: 'Turnover rate', value: pct(rate, 1), main: true },
    { label: 'Est. replacement cost per employee', value: money(annualCost) },
    { label: 'Total estimated cost', value: money(totalCost) },
    { label: 'Benchmark', value: rate < 10 ? 'Below 10% — healthy' : rate < 20 ? '10-20% — watch trend' : 'Above 20% — investigate causes' },
  ];
}

export function grossMarginCalc(v: Record<string, any>): CalcResult[] {
  const revenue = safe(v.revenue, 0), cogs = safe(v.cogs, 0);
  if (revenue <= 0) return [{ label: 'Enter revenue', value: '—', main: true }];
  const grossProfit = revenue - cogs;
  const grossMargin = (grossProfit / revenue) * 100;
  const markup = cogs > 0 ? (grossProfit / cogs) * 100 : 0;
  return [
    { label: 'Gross margin', value: pct(grossMargin, 2), main: true },
    { label: 'Gross profit', value: money(grossProfit) },
    { label: 'Markup on cost', value: cogs > 0 ? pct(markup, 2) : '—' },
    { label: 'Industry context', value: grossMargin > 60 ? 'High (SaaS/software)' : grossMargin > 30 ? 'Moderate (retail/services)' : 'Low (manufacturing/distribution)' },
  ];
}
