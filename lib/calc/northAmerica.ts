import type { CalcResult } from '../types';

export const salesRegions = [
  ['AB', 'Alberta', 5], ['BC', 'British Columbia', 5], ['MB', 'Manitoba', 5],
  ['NB', 'New Brunswick', 15], ['NL', 'Newfoundland and Labrador', 15],
  ['NT', 'Northwest Territories', 5], ['NS', 'Nova Scotia', 14], ['NU', 'Nunavut', 5],
  ['ON', 'Ontario', 13], ['PE', 'Prince Edward Island', 15], ['QC', 'Quebec', 5],
  ['SK', 'Saskatchewan', 5], ['YT', 'Yukon', 5],
] as const;

const cad = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', currencyDisplay: 'code' });
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' });
const bad = (value: string): CalcResult[] => [{ label: 'Check inputs', value, main: true }];

export function canadaGstHst(values: Record<string, unknown>): CalcResult[] {
  const region = salesRegions.find(([code]) => code === values.region);
  const amount = Number(values.amount);
  if (!region || !String(values.amount ?? '').trim() || !Number.isFinite(amount) || amount < 0 || amount > 1e9) {
    return bad('Enter an amount from 0 to 1 billion CAD and select a province or territory.');
  }
  const rate = region[2];
  const cents = Math.round(amount * 100);
  const included = values.mode === 'included';
  const taxCents = Math.round(included ? cents * rate / (100 + rate) : cents * rate / 100);
  return [
    { label: included ? 'Before GST/HST' : 'Total including GST/HST', value: cad.format((included ? cents - taxCents : cents + taxCents) / 100), main: true },
    { label: rate === 5 ? 'GST' : 'HST', value: cad.format(taxCents / 100) },
    { label: 'Applicable rate', value: `${rate}%` },
  ];
}

export function usMileage2026(values: Record<string, unknown>): CalcResult[] {
  const first = Number(values.firstHalf), second = Number(values.secondHalf);
  if (![first, second].every(value => Number.isFinite(value) && value >= 0 && value <= 1e6)) {
    return bad('Enter nonnegative business miles for each half of 2026.');
  }
  const firstAmount = first * 0.725, secondAmount = second * 0.76;
  return [
    { label: 'Estimated standard mileage amount', value: usd.format(firstAmount + secondAmount), main: true },
    { label: 'January–June at 72.5¢/mi', value: usd.format(firstAmount) },
    { label: 'July–December at 76¢/mi', value: usd.format(secondAmount) },
  ];
}
