import { CalcResult } from '../types';
import { money, pct, num, safe } from '../format';

// 2026 US Federal tax brackets. Sources are linked on the tool pages.
const FED_BRACKETS_SINGLE = [
  [0, 12400, 0.10], [12400, 50400, 0.12], [50400, 105700, 0.22],
  [105700, 201775, 0.24], [201775, 256225, 0.32], [256225, 640600, 0.35], [640600, Infinity, 0.37],
];
const FED_BRACKETS_MARRIED = [
  [0, 24800, 0.10], [24800, 100800, 0.12], [100800, 211400, 0.22],
  [211400, 403550, 0.24], [403550, 512450, 0.32], [512450, 768700, 0.35], [768700, Infinity, 0.37],
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
  const deduction = filing === 'married' ? 32200 : 16100;
  const taxableIncome = Math.max(0, annualGross - k401Contrib - deduction);
  const brackets = filing === 'married' ? FED_BRACKETS_MARRIED : FED_BRACKETS_SINGLE;
  const fedTax = calcFedTax(taxableIncome, brackets);
  const ficaSS = Math.min(annualGross, 184500) * 0.062; // 2026 SS wage base $184,500
  const ficaMedi = annualGross * 0.0145;
  const stateTax = annualGross * stateRate;
  const totalTax = fedTax + ficaSS + ficaMedi + stateTax;
  if (freq <= 0) return [{ label: 'Check frequency', value: 'Choose a valid pay frequency.', main: true }];
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
    { label: 'Note', value: '2026 annual-tax estimate, not a W-4 withholding calculation. Excludes credits, additional Medicare tax, local taxes, catch-up limits and other benefits. State tax uses your flat rate.' },
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
  if (seTaxableIncome < 400) return [{ label: 'Estimated SE tax', value: money(0), main: true }, { label: 'Note', value: 'Net earnings below $400 generally do not trigger SE tax; special rules can apply.' }];
  const ssTax = Math.min(seTaxableIncome, 184500) * 0.124; // 12.4% SS
  const mediTax = seTaxableIncome * 0.029;                  // 2.9% Medicare
  const totalSeTax = ssTax + mediTax;
  const deduction = totalSeTax / 2; // employer-equivalent half is deductible
  const quarterlyPayment = totalSeTax / 4;
  const effRate = netProfit > 0 ? (totalSeTax / netProfit) * 100 : 0;
  return [
    { label: 'Self-employment tax', value: money(totalSeTax), main: true },
    { label: 'Quarterly SE tax share (only)', value: money(quarterlyPayment) },
    { label: 'Social Security portion', value: money(ssTax) },
    { label: 'Medicare portion', value: money(mediTax) },
    { label: 'Deductible half', value: money(deduction) },
    { label: 'Effective SE tax rate', value: pct(effRate, 2) },
    { label: 'Note', value: '2026 estimate assuming no other Social Security wages. Excludes income tax and Additional Medicare Tax. The quarterly amount is only SE tax, not your full estimated tax payment. Use IRS Schedule SE.' },
  ];
}
