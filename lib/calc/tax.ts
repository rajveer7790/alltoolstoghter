import { CalcResult } from '../types';
import { money, pct, num, safe } from '../format';

// 2025 US Federal tax brackets (single filer)
const FED_BRACKETS_SINGLE = [
  [0, 11925, 0.10], [11925, 48475, 0.12], [48475, 103350, 0.22],
  [103350, 197300, 0.24], [197300, 250525, 0.32], [250525, 626350, 0.35], [626350, Infinity, 0.37],
];
const FED_BRACKETS_MARRIED = [
  [0, 23850, 0.10], [23850, 96950, 0.12], [96950, 206700, 0.22],
  [206700, 394600, 0.24], [394600, 501050, 0.32], [501050, 751600, 0.35], [751600, Infinity, 0.37],
];

function calcFedTax(income: number, brackets: number[][]): number {
  let tax = 0;
  for (const [lo, hi, rate] of brackets) {
    if (income <= lo) break;
    tax += (Math.min(income, hi) - lo) * rate;
  }
  return tax;
}

export function paycheckCalc(v: Record<string, any>): CalcResult[] {
  const gross = safe(v.gross, 0);
  const filing = String(v.filing || 'single');
  const stateRate = safe(v.stateRate, 0, 20) / 100;
  const pay401k = safe(v.k401, 0, 100) / 100;
  const freq = safe(v.frequency, 1); // paychecks per year
  const annualGross = gross * freq;
  const k401Contrib = annualGross * pay401k;
  const taxableIncome = Math.max(0, annualGross - k401Contrib - 14600); // 2025 std deduction single ~$14,600
  const brackets = filing === 'married' ? FED_BRACKETS_MARRIED : FED_BRACKETS_SINGLE;
  const fedTax = calcFedTax(taxableIncome, brackets);
  const ficaSS = Math.min(annualGross, 176100) * 0.062; // 2025 SS wage base ~$176,100
  const ficaMedi = annualGross * 0.0145;
  const stateTax = annualGross * stateRate;
  const totalTax = fedTax + ficaSS + ficaMedi + stateTax;
  const netAnnual = annualGross - totalTax - k401Contrib;
  const netPerPaycheck = netAnnual / freq;
  const effRate = annualGross > 0 ? (totalTax / annualGross) * 100 : 0;
  return [
    { label: 'Net per paycheck', value: money(netPerPaycheck), main: true },
    { label: 'Federal income tax', value: money(fedTax / freq) + '/check' },
    { label: 'Social Security', value: money(ficaSS / freq) + '/check' },
    { label: 'Medicare', value: money(ficaMedi / freq) + '/check' },
    { label: 'State tax (estimated)', value: money(stateTax / freq) + '/check' },
    { label: '401(k) contribution', value: money(k401Contrib / freq) + '/check' },
    { label: 'Effective tax rate', value: pct(effRate, 2) },
    { label: 'Note', value: '2025 federal brackets. State tax varies — enter your rate above.' },
  ];
}

export function vatCalc(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0), rate = safe(v.rate, 0, 100);
  const mode = String(v.mode || 'add'); // add VAT or extract VAT
  let exVat: number, vatAmt: number, incVat: number;
  if (mode === 'add') {
    exVat = amount; vatAmt = amount * rate / 100; incVat = amount + vatAmt;
  } else {
    incVat = amount; exVat = amount / (1 + rate/100); vatAmt = incVat - exVat;
  }
  return [
    { label: mode === 'add' ? 'Total including VAT' : 'Amount before VAT', value: money(mode === 'add' ? incVat : exVat), main: true },
    { label: 'VAT amount', value: money(vatAmt) },
    { label: 'Excluding VAT', value: money(exVat) },
    { label: 'Including VAT', value: money(incVat) },
    { label: 'VAT rate', value: pct(rate, 1) },
  ];
}

export function selfEmploymentTax(v: Record<string, any>): CalcResult[] {
  const netProfit = safe(v.netProfit, 0);
  // SE tax: 15.3% on 92.35% of net profit (half of SECA is deductible)
  const seTaxableIncome = netProfit * 0.9235;
  const ssTax = Math.min(seTaxableIncome, 176100) * 0.124; // 12.4% SS
  const mediTax = seTaxableIncome * 0.029;                  // 2.9% Medicare
  const totalSeTax = ssTax + mediTax;
  const deduction = totalSeTax / 2; // employer-equivalent half is deductible
  const quarterlyPayment = totalSeTax / 4;
  const effRate = netProfit > 0 ? (totalSeTax / netProfit) * 100 : 0;
  return [
    { label: 'Self-employment tax', value: money(totalSeTax), main: true },
    { label: 'Quarterly estimated payment', value: money(quarterlyPayment) },
    { label: 'Social Security portion', value: money(ssTax) },
    { label: 'Medicare portion', value: money(mediTax) },
    { label: 'Deductible half', value: money(deduction) },
    { label: 'Effective SE tax rate', value: pct(effRate, 2) },
    { label: 'Note', value: 'SE tax is on top of regular income tax. Deduct the employer-half from your AGI. Use IRS Schedule SE for your actual filing.' },
  ];
}
