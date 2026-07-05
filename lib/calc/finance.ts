import { CalcResult } from '../types';
import { money, pct, int, num, safe } from '../format';

/** Standard amortized payment. rate=0 handled. */
function pmt(P: number, annualRate: number, months: number): number {
  if (months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return P / months;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
}

export function mortgage(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), down = safe(v.down, 0);
  const P = Math.max(0, price - down);
  const years = safe(v.years, 1, 50), rate = safe(v.rate, 0, 30);
  const n = years * 12, M = pmt(P, rate, n);
  const tax = safe(v.tax, 0) / 12, ins = safe(v.ins, 0) / 12;
  const total = M * n, interest = total - P;
  const ltv = price > 0 ? (P / price) * 100 : 0;
  const out: CalcResult[] = [
    { label: 'Monthly payment (P&I)', value: money(M), main: true },
    { label: 'Full monthly cost', value: money(M + tax + ins) },
    { label: 'Loan amount', value: money(P) },
    { label: 'Total interest', value: money(interest) },
    { label: 'Total of payments', value: money(total) },
  ];
  if (ltv > 80) out.push({ label: 'Note', value: `LTV ${num(ltv, 1)}% — PMI likely required above 80%` });
  return out;
}

export function loan(v: Record<string, any>): CalcResult[] {
  const P = safe(v.amount, 0), rate = safe(v.rate, 0, 100), years = safe(v.years, 0.1, 50);
  const n = Math.round(years * 12), M = pmt(P, rate, n);
  return [
    { label: 'Monthly payment', value: money(M), main: true },
    { label: 'Total interest', value: money(M * n - P) },
    { label: 'Total repayment', value: money(M * n) },
  ];
}

export function autoLoan(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), down = safe(v.down, 0), trade = safe(v.trade, 0);
  const taxRate = safe(v.taxRate, 0, 30), fees = safe(v.fees, 0);
  const taxed = Math.max(0, price - trade) * (taxRate / 100);
  const financed = Math.max(0, price + taxed + fees - down - trade);
  const M = pmt(financed, safe(v.rate, 0, 30), safe(v.months, 1, 120));
  const n = safe(v.months, 1, 120);
  return [
    { label: 'Monthly payment', value: money(M), main: true },
    { label: 'Amount financed', value: money(financed) },
    { label: 'Sales tax', value: money(taxed) },
    { label: 'Total interest', value: money(M * n - financed) },
  ];
}

export function compound(v: Record<string, any>): CalcResult[] {
  const P = safe(v.principal, 0), rate = safe(v.rate, 0, 100) / 100;
  const years = safe(v.years, 0, 100), n = safe(v.freq, 1, 365);
  const pmtAmt = safe(v.contrib, 0);
  const periods = n * years, r = rate / n;
  const lump = P * Math.pow(1 + r, periods);
  const series = r === 0 ? pmtAmt * periods : pmtAmt * ((Math.pow(1 + r, periods) - 1) / r);
  const A = lump + series, invested = P + pmtAmt * periods;
  return [
    { label: 'Future value', value: money(A), main: true },
    { label: 'Total contributed', value: money(invested) },
    { label: 'Interest earned', value: money(A - invested) },
  ];
}

export function simpleInterest(v: Record<string, any>): CalcResult[] {
  const P = safe(v.principal, 0), r = safe(v.rate, 0, 100) / 100, t = safe(v.years, 0, 100);
  const I = P * r * t;
  return [
    { label: 'Interest', value: money(I), main: true },
    { label: 'Total amount', value: money(P + I) },
  ];
}

export function savings(v: Record<string, any>): CalcResult[] {
  const P = safe(v.initial, 0), m = safe(v.monthly, 0), apy = safe(v.apy, 0, 50) / 100, years = safe(v.years, 0, 80);
  const r = apy / 12, n = years * 12;
  const A = P * Math.pow(1 + r, n) + (r === 0 ? m * n : m * ((Math.pow(1 + r, n) - 1) / r));
  return [
    { label: 'Balance after ' + num(years, 0) + ' years', value: money(A), main: true },
    { label: 'Total deposits', value: money(P + m * n) },
    { label: 'Interest earned', value: money(A - P - m * n) },
  ];
}

export function roi(v: Record<string, any>): CalcResult[] {
  const cost = safe(v.cost, 0.000001), ret = safe(v.ret, 0), years = safe(v.years, 0, 100);
  const gain = ret - cost, r = gain / cost;
  const out: CalcResult[] = [
    { label: 'ROI', value: pct(r * 100), main: true },
    { label: 'Net profit', value: money(gain) },
  ];
  if (years > 0) out.push({ label: 'Annualized ROI', value: pct((Math.pow(1 + r, 1 / years) - 1) * 100) });
  return out;
}

export function inflation(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0), rate = safe(v.rate, -20, 100) / 100, years = safe(v.years, 0, 200);
  const future = amount * Math.pow(1 + rate, years);
  return [
    { label: `Cost in ${num(years, 0)} years`, value: money(future), main: true },
    { label: 'Cumulative inflation', value: pct((Math.pow(1 + rate, years) - 1) * 100) },
    { label: `Buying power of ${money(amount)} then`, value: money(amount * amount / Math.max(future, 1e-9)) },
  ];
}

export function ccPayoff(v: Record<string, any>): CalcResult[] {
  let bal = safe(v.balance, 0);
  const apr = safe(v.apr, 0, 100) / 100 / 12, pay = safe(v.payment, 0);
  if (pay <= bal * apr) return [{ label: 'Warning', value: 'Payment does not cover monthly interest — the balance will never be paid off. Increase the payment.', main: true }];
  let months = 0, interest = 0;
  while (bal > 0 && months < 1200) {
    const i = bal * apr; interest += i; bal = bal + i - pay; months++;
  }
  return [
    { label: 'Months to pay off', value: int(months), main: true },
    { label: 'That is', value: `${Math.floor(months / 12)} yr ${months % 12} mo` },
    { label: 'Total interest paid', value: money(interest) },
  ];
}

export function salary(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0), period = String(v.period || 'hour');
  const hours = safe(v.hours, 1, 100), weeks = safe(v.weeks, 1, 52);
  let annual = 0;
  if (period === 'hour') annual = amount * hours * weeks;
  else if (period === 'week') annual = amount * weeks;
  else if (period === 'month') annual = amount * 12;
  else annual = amount;
  return [
    { label: 'Annual', value: money(annual), main: true },
    { label: 'Monthly', value: money(annual / 12) },
    { label: 'Weekly', value: money(annual / weeks) },
    { label: 'Hourly', value: money(annual / (hours * weeks)) },
  ];
}

export function hourlyToSalary(v: Record<string, any>): CalcResult[] {
  const rate = safe(v.rate, 0), hours = safe(v.hours, 1, 100), weeks = safe(v.weeks, 1, 52);
  const annual = rate * hours * weeks;
  return [
    { label: 'Annual salary', value: money(annual), main: true },
    { label: 'Monthly', value: money(annual / 12) },
    { label: 'Weekly', value: money(rate * hours) },
  ];
}

export function tip(v: Record<string, any>): CalcResult[] {
  const bill = safe(v.bill, 0), t = safe(v.tip, 0, 100) / 100, people = Math.max(1, Math.round(safe(v.people, 1, 1000)));
  const tipAmt = bill * t, total = bill + tipAmt;
  return [
    { label: 'Tip', value: money(tipAmt), main: true },
    { label: 'Total', value: money(total) },
    { label: `Per person (${people})`, value: money(total / people) },
  ];
}

export function dti(v: Record<string, any>): CalcResult[] {
  const income = safe(v.income, 0.01), housing = safe(v.housing, 0), debts = safe(v.debts, 0);
  const front = (housing / income) * 100, back = ((housing + debts) / income) * 100;
  const band = back <= 36 ? 'Strong (most lenders approve)' : back <= 43 ? 'Acceptable (typical max for qualified mortgages)' : 'High (financing will be difficult)';
  return [
    { label: 'Back-end DTI', value: pct(back, 1), main: true },
    { label: 'Front-end DTI', value: pct(front, 1) },
    { label: 'Lender view', value: band },
  ];
}

export function downPayment(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0.01), p = safe(v.percent, 0, 100) / 100;
  const down = price * p, loanAmt = price - down, ltv = (loanAmt / price) * 100;
  const out: CalcResult[] = [
    { label: 'Down payment', value: money(down), main: true },
    { label: 'Loan amount', value: money(loanAmt) },
    { label: 'LTV', value: pct(ltv, 1) },
  ];
  if (ltv > 80) out.push({ label: 'Note', value: 'LTV above 80% — PMI usually required on conventional loans' });
  return out;
}

export function salesTax(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0), rate = safe(v.rate, 0, 50) / 100;
  const mode = String(v.mode || 'add');
  if (mode === 'add') {
    return [
      { label: 'Total with tax', value: money(amount * (1 + rate)), main: true },
      { label: 'Tax amount', value: money(amount * rate) },
    ];
  }
  const pre = amount / (1 + rate);
  return [
    { label: 'Price before tax', value: money(pre), main: true },
    { label: 'Tax included', value: money(amount - pre) },
  ];
}

// ---------- Wave 2 finance ----------
function pmt2(P: number, annualRate: number, months: number): number {
  if (months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return P / months;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
}

export function refinance(v: Record<string, any>): CalcResult[] {
  const bal = safe(v.balance, 0), curRate = safe(v.curRate, 0, 30), remYears = safe(v.remYears, 0.1, 50);
  const newRate = safe(v.newRate, 0, 30), newYears = safe(v.newYears, 0.1, 50), costs = safe(v.costs, 0);
  const oldPay = pmt2(bal, curRate, remYears * 12);
  const newPay = pmt2(bal, newRate, newYears * 12);
  const monthlySave = oldPay - newPay;
  const out: CalcResult[] = [
    { label: 'New monthly payment', value: money(newPay), main: true },
    { label: 'Monthly change', value: (monthlySave >= 0 ? '−' : '+') + money(Math.abs(monthlySave)).slice(1) + (monthlySave >= 0 ? ' saved' : ' more') },
  ];
  if (monthlySave > 0) out.push({ label: 'Break-even', value: `${Math.ceil(costs / monthlySave)} months to recoup ${money(costs)}` });
  else out.push({ label: 'Note', value: 'New payment is higher — refinancing only helps if the term or rate goal is different.' });
  out.push({ label: 'Lifetime interest change', value: money((newPay * newYears * 12) - (oldPay * remYears * 12)) });
  return out;
}

export function amortization(v: Record<string, any>): CalcResult[] {
  const P = safe(v.amount, 0), rate = safe(v.rate, 0, 30), years = safe(v.years, 0.1, 50);
  const n = Math.round(years * 12), M = pmt2(P, rate, n), r = rate / 100 / 12;
  // Year-1 split + totals (full table would render in a dedicated widget; here: summary readout)
  let bal = P, y1Interest = 0, y1Principal = 0;
  for (let i = 0; i < Math.min(12, n); i++) { const int = bal * r; y1Interest += int; y1Principal += (M - int); bal -= (M - int); }
  return [
    { label: 'Monthly payment', value: money(M), main: true },
    { label: 'Total interest', value: money(M * n - P) },
    { label: 'Total paid', value: money(M * n) },
    { label: 'Year 1 — to interest', value: money(y1Interest) },
    { label: 'Year 1 — to principal', value: money(y1Principal) },
    { label: 'Payments', value: `${n} months` },
  ];
}

export function k401(v: Record<string, any>): CalcResult[] {
  let salary = safe(v.salary, 0), contribPct = safe(v.contribPct, 0, 100) / 100;
  const matchPct = safe(v.matchPct, 0, 100) / 100, matchCap = safe(v.matchCap, 0, 100) / 100;
  let bal = safe(v.balance, 0); const ret = safe(v.return, -20, 50) / 100;
  const years = Math.round(safe(v.years, 0, 60)), raise = safe(v.raise, 0, 30) / 100;
  let totalMatch = 0;
  for (let i = 0; i < years; i++) {
    const yourContrib = salary * contribPct;
    const match = salary * Math.min(contribPct, matchCap) * matchPct;
    totalMatch += match;
    bal = (bal + yourContrib + match) * (1 + ret);
    salary *= (1 + raise);
  }
  return [
    { label: `Balance in ${years} years`, value: money(bal), main: true },
    { label: 'Employer match captured', value: money(totalMatch) },
    { label: 'That match is free money', value: 'Contribute at least to the cap to capture it all' },
  ];
}

export function retirement(v: Record<string, any>): CalcResult[] {
  const age = safe(v.age, 0, 100), retAge = safe(v.retAge, age + 1, 100);
  let bal = safe(v.savings, 0); const monthly = safe(v.monthly, 0);
  const ret = safe(v.return, -20, 50) / 100 / 12, years = retAge - age, n = years * 12;
  for (let i = 0; i < n; i++) bal = (bal + monthly) * (1 + ret);
  const safeIncome = bal * 0.04; // 4% rule
  return [
    { label: 'Projected nest egg', value: money(bal), main: true },
    { label: 'Annual income (4% rule)', value: money(safeIncome) },
    { label: 'Monthly income', value: money(safeIncome / 12) },
    { label: 'Years until retirement', value: String(years) },
  ];
}

export function debtSnowball(v: Record<string, any>): CalcResult[] {
  // Parse "balance,rate,minPayment" lines
  type D = { bal: number; rate: number; min: number };
  const debts: D[] = String(v.debts || '').trim().split(/\n+/).map(line => {
    const m = line.split(/[,\s]+/).map(Number);
    return { bal: m[0] || 0, rate: (m[1] || 0) / 100 / 12, min: m[2] || 0 };
  }).filter(d => d.bal > 0);
  if (!debts.length) return [{ label: 'Enter debts', value: 'One per line: balance, APR%, minimum payment (e.g. "5000, 22, 150").', main: true }];
  const extra = safe(v.extra, 0);
  const method = String(v.method || 'snowball');
  debts.sort((a, b) => method === 'snowball' ? a.bal - b.bal : (b.rate - a.rate));
  let months = 0, totalInterest = 0, pool = extra;
  const active = debts.map(d => ({ ...d }));
  while (active.some(d => d.bal > 0) && months < 1200) {
    months++;
    let budget = active.reduce((s, d) => s + (d.bal > 0 ? d.min : 0), 0) + pool;
    for (const d of active) {
      if (d.bal <= 0) continue;
      const int = d.bal * d.rate; totalInterest += int; d.bal += int;
      const pay = Math.min(budget, d.bal === 0 ? 0 : Math.max(d.min, 0));
    }
    // apply: minimums first, then snowball extra to first active
    for (const d of active) { if (d.bal > 0) { const p = Math.min(d.min, d.bal); d.bal -= p; budget -= p; } }
    for (const d of active) { if (d.bal > 0 && budget > 0) { const p = Math.min(budget, d.bal); d.bal -= p; budget -= p; } }
  }
  return [
    { label: 'Debt-free in', value: `${Math.floor(months / 12)} yr ${months % 12} mo`, main: true },
    { label: 'Total interest paid', value: money(totalInterest) },
    { label: 'Method', value: method === 'snowball' ? 'Snowball (smallest balance first)' : 'Avalanche (highest rate first)' },
  ];
}

export function carLease(v: Record<string, any>): CalcResult[] {
  const msrp = safe(v.msrp, 0), price = safe(v.price, 0), residPct = safe(v.residual, 0, 100) / 100;
  const mf = safe(v.mf, 0, 1), term = safe(v.term, 1, 120), down = safe(v.down, 0), taxRate = safe(v.tax, 0, 30) / 100;
  const residual = msrp * residPct;
  const capCost = price - down;
  const depreciation = (capCost - residual) / term;
  const finance = (capCost + residual) * mf;
  const base = depreciation + finance;
  const payment = base * (1 + taxRate);
  return [
    { label: 'Monthly lease payment', value: money(payment), main: true },
    { label: 'Depreciation portion', value: money(depreciation) },
    { label: 'Finance (rent) portion', value: money(finance) },
    { label: 'Money factor as APR', value: pct(mf * 2400, 2) },
    { label: 'Residual value', value: money(residual) },
  ];
}

export function rothIra(v: Record<string, any>): CalcResult[] {
  const age = safe(v.age, 0, 100), retAge = safe(v.retAge, age + 1, 100);
  let bal = safe(v.balance, 0); const annual = safe(v.annual, 0), ret = safe(v.return, -20, 50) / 100;
  const years = retAge - age;
  for (let i = 0; i < years; i++) bal = (bal + annual) * (1 + ret);
  const contributed = safe(v.balance, 0) + annual * years;
  return [
    { label: 'Tax-free balance at retirement', value: money(bal), main: true },
    { label: 'Total contributed', value: money(contributed) },
    { label: 'Tax-free growth', value: money(bal - contributed) },
    { label: 'Note', value: 'Roth withdrawals in retirement are generally tax-free (qualified distributions).' },
  ];
}

export function investment(v: Record<string, any>): CalcResult[] {
  const P = safe(v.principal, 0), contrib = safe(v.contrib, 0), ret = safe(v.return, -20, 50) / 100, years = safe(v.years, 0, 100);
  const freq = safe(v.freq, 1, 365), r = ret / freq, n = freq * years;
  const lump = P * Math.pow(1 + r, n);
  const series = r === 0 ? contrib * n : contrib * ((Math.pow(1 + r, n) - 1) / r);
  const fv = lump + series, invested = P + contrib * n;
  return [
    { label: 'Future value', value: money(fv), main: true },
    { label: 'Total invested', value: money(invested) },
    { label: 'Total gains', value: money(fv - invested) },
  ];
}

// ---------- Wave 2 finance (extra) ----------
export function budget(v: Record<string, any>): CalcResult[] {
  const income = safe(v.income, 0.01);
  const needs = income * 0.5, wants = income * 0.3, savings = income * 0.2;
  return [
    { label: 'Needs (50%)', value: money(needs), main: true },
    { label: 'Wants (30%)', value: money(wants) },
    { label: 'Savings & debt (20%)', value: money(savings) },
    { label: 'Note', value: 'The 50/30/20 rule — a simple starting framework, adjust to your situation.' },
  ];
}

export function carPayment(v: Record<string, any>): CalcResult[] {
  const target = safe(v.payment, 0), rate = safe(v.rate, 0, 30), months = safe(v.months, 1, 120), down = safe(v.down, 0);
  const r = rate / 100 / 12;
  const financed = r === 0 ? target * months : target * (1 - Math.pow(1 + r, -months)) / r;
  return [
    { label: 'Affordable vehicle price', value: money(financed + down), main: true },
    { label: 'Amount financed', value: money(financed) },
    { label: 'With down payment of', value: money(down) },
  ];
}

export function apr(v: Record<string, any>): CalcResult[] {
  const amount = safe(v.amount, 0.01), rate = safe(v.rate, 0, 100), months = safe(v.months, 1, 480), fees = safe(v.fees, 0);
  const r = rate / 100 / 12;
  const payment = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  const net = amount - fees;
  // Solve APR via bisection on net proceeds
  let lo = 0, hi = 1;
  for (let k = 0; k < 60; k++) {
    const mid = (lo + hi) / 2;
    const pv = mid === 0 ? payment * months : payment * (1 - Math.pow(1 + mid, -months)) / mid;
    if (pv > net) lo = mid; else hi = mid;
  }
  const apr = ((lo + hi) / 2) * 12 * 100;
  return [
    { label: 'True APR (incl. fees)', value: pct(apr, 2), main: true },
    { label: 'Nominal rate', value: pct(rate, 2) },
    { label: 'Monthly payment', value: money(payment) },
    { label: 'Total cost of credit', value: money(payment * months - net) },
  ];
}

export function discount(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), pctOff = safe(v.percent, 0, 100), extra = safe(v.extra, 0, 100);
  const afterFirst = price * (1 - pctOff / 100);
  const finalPrice = afterFirst * (1 - extra / 100);
  return [
    { label: 'Final price', value: money(finalPrice), main: true },
    { label: 'You save', value: money(price - finalPrice) },
    { label: 'Total discount', value: pct(price > 0 ? (1 - finalPrice / price) * 100 : 0, 1) },
    ...(extra > 0 ? [{ label: 'Note', value: 'Stacked discounts apply to the already-reduced price, not the original.' }] : []),
  ];
}

// ---------- Wave 3 finance ----------
export function netWorth(v: Record<string, any>): CalcResult[] {
  const assets = safe(v.cash, 0) + safe(v.investments, 0) + safe(v.property, 0) + safe(v.other, 0);
  const liabilities = safe(v.mortgage, 0) + safe(v.loans, 0) + safe(v.creditCards, 0);
  const nw = assets - liabilities;
  return [
    { label: 'Net worth', value: money(nw), main: true },
    { label: 'Total assets', value: money(assets) },
    { label: 'Total liabilities', value: money(liabilities) },
    { label: 'Debt-to-asset ratio', value: assets > 0 ? pct((liabilities / assets) * 100, 1) : '—' },
  ];
}

export function mortgagePayoff(v: Record<string, any>): CalcResult[] {
  const bal = safe(v.balance, 0), rate = safe(v.rate, 0, 30), years = safe(v.years, 0.1, 50), extra = safe(v.extra, 0);
  const r = rate / 100 / 12, n = Math.round(years * 12);
  const basePay = r === 0 ? bal / n : (bal * r) / (1 - Math.pow(1 + r, -n));
  // simulate with extra
  let b = bal, months = 0, interestPaid = 0;
  const pay = basePay + extra;
  while (b > 0 && months < n + 1200) {
    const int = b * r; interestPaid += int;
    b = b + int - pay;
    months++;
    if (pay <= b * r) break; // never payoff guard
  }
  const baseInterest = basePay * n - bal;
  const monthsSaved = n - months;
  return [
    { label: 'New payoff time', value: `${Math.floor(months / 12)} yr ${months % 12} mo`, main: true },
    { label: 'Time saved', value: monthsSaved > 0 ? `${Math.floor(monthsSaved / 12)} yr ${monthsSaved % 12} mo` : 'none' },
    { label: 'Interest paid (with extra)', value: money(Math.max(0, interestPaid)) },
    { label: 'Interest saved', value: money(Math.max(0, baseInterest - interestPaid)) },
    { label: 'New monthly payment', value: money(pay) },
  ];
}

export function cd(v: Record<string, any>): CalcResult[] {
  const P = safe(v.principal, 0), rate = safe(v.rate, 0, 50), years = safe(v.years, 0, 100), freq = safe(v.freq, 1, 365);
  const r = rate / 100 / freq, n = freq * years;
  const fv = P * Math.pow(1 + r, n);
  return [
    { label: 'Maturity value', value: money(fv), main: true },
    { label: 'Interest earned', value: money(fv - P) },
    { label: 'Effective annual yield (APY)', value: pct((Math.pow(1 + r, freq) - 1) * 100, 3) },
  ];
}

export function futureValue(v: Record<string, any>): CalcResult[] {
  const P = safe(v.present, 0), rate = safe(v.rate, 0, 100) / 100, years = safe(v.years, 0, 100);
  const fv = P * Math.pow(1 + rate, years);
  return [
    { label: 'Future value', value: money(fv), main: true },
    { label: 'Total growth', value: money(fv - P) },
    { label: 'Growth multiple', value: P > 0 ? num(fv / P, 2) + '×' : '—' },
  ];
}

export function presentValue(v: Record<string, any>): CalcResult[] {
  const F = safe(v.future, 0), rate = safe(v.rate, 0, 100) / 100, years = safe(v.years, 0, 100);
  const pv = F / Math.pow(1 + rate, years);
  return [
    { label: 'Present value', value: money(pv), main: true },
    { label: 'Discount applied', value: money(F - pv) },
    { label: 'Note', value: 'The amount you would need today to equal that future sum at the given rate.' },
  ];
}

export function annuity(v: Record<string, any>): CalcResult[] {
  const pmt = safe(v.payment, 0), rate = safe(v.rate, 0, 100) / 100 / 12, n = safe(v.years, 0, 100) * 12;
  const fv = rate === 0 ? pmt * n : pmt * ((Math.pow(1 + rate, n) - 1) / rate);
  const pv = rate === 0 ? pmt * n : pmt * ((1 - Math.pow(1 + rate, -n)) / rate);
  return [
    { label: 'Future value of annuity', value: money(fv), main: true },
    { label: 'Present value of annuity', value: money(pv) },
    { label: 'Total contributions', value: money(pmt * n) },
  ];
}

export function breakEven(v: Record<string, any>): CalcResult[] {
  const fixed = safe(v.fixed, 0), price = safe(v.price, 0), variable = safe(v.variable, 0);
  const margin = price - variable;
  if (margin <= 0) return [{ label: 'Check inputs', value: 'Price must exceed variable cost per unit to break even.', main: true }];
  const units = fixed / margin;
  return [
    { label: 'Break-even units', value: int(Math.ceil(units)), main: true },
    { label: 'Break-even revenue', value: money(Math.ceil(units) * price) },
    { label: 'Contribution margin per unit', value: money(margin) },
    { label: 'Contribution margin ratio', value: pct((margin / price) * 100, 1) },
  ];
}

export function margin(v: Record<string, any>): CalcResult[] {
  const cost = safe(v.cost, 0), revenue = safe(v.revenue, 0);
  if (revenue <= 0) return [{ label: 'Enter revenue', value: 'Selling price must be greater than zero.', main: true }];
  const profit = revenue - cost;
  const marginPct = (profit / revenue) * 100;
  const markupPct = cost > 0 ? (profit / cost) * 100 : 0;
  return [
    { label: 'Profit margin', value: pct(marginPct, 2), main: true },
    { label: 'Markup', value: cost > 0 ? pct(markupPct, 2) : '—' },
    { label: 'Profit', value: money(profit) },
  ];
}

export function markup(v: Record<string, any>): CalcResult[] {
  const cost = safe(v.cost, 0), markupPct = safe(v.markup, 0, 1000);
  const price = cost * (1 + markupPct / 100);
  const profit = price - cost;
  return [
    { label: 'Selling price', value: money(price), main: true },
    { label: 'Profit per unit', value: money(profit) },
    { label: 'Resulting margin', value: price > 0 ? pct((profit / price) * 100, 2) : '—' },
  ];
}

export function commission(v: Record<string, any>): CalcResult[] {
  const sales = safe(v.sales, 0), rate = safe(v.rate, 0, 100), base = safe(v.base, 0);
  const comm = sales * rate / 100;
  return [
    { label: 'Total earnings', value: money(comm + base), main: true },
    { label: 'Commission', value: money(comm) },
    { label: 'Base pay', value: money(base) },
  ];
}

export function overtime(v: Record<string, any>): CalcResult[] {
  const rate = safe(v.rate, 0), regHours = safe(v.regular, 0, 168), otHours = safe(v.overtime, 0, 168), otMult = safe(v.multiplier, 1, 5);
  const regPay = rate * Math.min(regHours, 40) + rate * Math.max(0, regHours - 40) * otMult;
  const otPay = otHours * rate * otMult;
  const base = rate * regHours;
  return [
    { label: 'Total pay', value: money(rate * regHours + otHours * rate * otMult), main: true },
    { label: 'Regular pay', value: money(base) },
    { label: 'Overtime pay', value: money(otPay) },
    { label: 'Overtime rate', value: money(rate * otMult) + '/hr' },
  ];
}

// ── Real Estate calculators ────────────────────────────────────────────────
export function rentVsBuy(v: Record<string, any>): CalcResult[] {
  const homePrice = safe(v.homePrice, 0), downPct = safe(v.down, 0, 100);
  const rate = safe(v.rate, 0, 20), years = safe(v.years, 1, 40);
  const rent = safe(v.rent, 0), appreciation = safe(v.appreciation, 0, 20);
  const propTaxRate = safe(v.propTax, 0, 5);
  const down = homePrice * downPct / 100;
  const loan = homePrice - down;
  const months = years * 12;
  const monthly = pmt(loan, rate, months);
  const propTaxMonthly = homePrice * propTaxRate / 100 / 12;
  const insurance = homePrice * 0.005 / 12; // ~0.5%/yr estimate
  const totalBuyCost = (monthly + propTaxMonthly + insurance) * months + down;
  const totalRentCost = rent * months;
  const homeValueAtSale = homePrice * Math.pow(1 + appreciation / 100, years);
  const loanBalance = (() => { let b = loan; const r = rate / 100 / 12; for (let i = 0; i < months; i++) b = b * (1 + r) - monthly; return Math.max(0, b); })();
  const equityAtSale = homeValueAtSale - loanBalance;
  const buyNetCost = totalBuyCost - equityAtSale;
  const diff = totalRentCost - buyNetCost;
  return [
    { label: diff > 0 ? 'Buying saves' : 'Renting saves', value: money(Math.abs(diff)) + ` over ${years} yr`, main: true },
    { label: 'Monthly mortgage (P&I)', value: money(monthly) },
    { label: 'Monthly all-in (+ tax & ins.)', value: money(monthly + propTaxMonthly + insurance) },
    { label: 'Total rent paid', value: money(totalRentCost) },
    { label: 'Projected home value', value: money(homeValueAtSale) },
    { label: 'Est. equity at sale', value: money(equityAtSale) },
    { label: 'Verdict', value: diff > 0 ? 'Buying appears cheaper at these assumptions' : 'Renting appears cheaper — review appreciation & horizon' },
  ];
}

export function homeAffordability(v: Record<string, any>): CalcResult[] {
  const income = safe(v.income, 0), debt = safe(v.debt, 0);
  const rate = safe(v.rate, 0, 20), downPct = safe(v.down, 3, 100);
  const propTaxRate = safe(v.propTax, 0, 5), term = safe(v.term, 1, 40);
  // Conservative: housing ≤ 28%, total debt ≤ 36%
  const maxHousingPayment = income * 0.28 / 12;
  const maxTotalDebt = income * 0.36 / 12;
  const maxFromDTI = Math.max(0, maxTotalDebt - debt);
  const maxPayment = Math.min(maxHousingPayment, maxFromDTI);
  const r = rate / 100 / 12, n = term * 12;
  const factor = r === 0 ? n : (1 - Math.pow(1 + r, -n)) / r;
  const propTaxMonthly = (hp: number) => hp * propTaxRate / 100 / 12;
  // Iterate: payment includes tax, so solve
  let hp = maxPayment * factor; // first estimate
  for (let i = 0; i < 10; i++) {
    const payForTax = propTaxMonthly(hp / (1 - downPct / 100)); // approx home price
    const piPayment = Math.max(0, maxPayment - payForTax - hp * 0.0005 / 12);
    hp = piPayment * factor;
  }
  const maxHomePrice = hp / (1 - downPct / 100);
  const downAmt = maxHomePrice * downPct / 100;
  return [
    { label: 'Max home price', value: money(Math.max(0, maxHomePrice)), main: true },
    { label: 'Down payment needed', value: money(Math.max(0, downAmt)) },
    { label: 'Max monthly payment', value: money(maxPayment) },
    { label: 'Rule used', value: '28% of gross income for housing; 36% including all debts' },
    { label: 'Note', value: 'Assumes conventional qualifying. Actual approval depends on credit score, reserves, and lender.' },
  ];
}

export function propertyTax(v: Record<string, any>): CalcResult[] {
  const value = safe(v.value, 0), rate = safe(v.rate, 0, 10);
  const assessed = value * safe(v.assessed, 10, 100) / 100;
  const annual = assessed * rate / 100;
  return [
    { label: 'Annual property tax', value: money(annual), main: true },
    { label: 'Monthly (escrow)', value: money(annual / 12) },
    { label: 'Assessed value', value: money(assessed) },
    { label: 'Effective tax on market value', value: pct(annual / value * 100, 3) },
  ];
}

export function closingCosts(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), loan = safe(v.loan, 0);
  const isBuyer = String(v.role) !== 'seller';
  // Buyer costs (typical US ranges)
  const origination = loan * 0.01;          // 1% origination
  const appraisal = 500;
  const title = price * 0.005;              // ~0.5%
  const escrow = price * 0.002;
  const recording = 125;
  const prepaid = loan * 0.02;              // ~2 months reserves + prepaid interest
  const buyerTotal = origination + appraisal + title + escrow + recording + prepaid;
  // Seller costs
  const agentComm = price * 0.05;           // 5% typical
  const sellerTitle = price * 0.002;
  const transferTax = price * 0.001;
  const sellerTotal = agentComm + sellerTitle + transferTax;
  const total = isBuyer ? buyerTotal : sellerTotal;
  return [
    { label: isBuyer ? 'Estimated buyer closing costs' : 'Estimated seller closing costs', value: money(total), main: true },
    ...(isBuyer ? [
      { label: 'Loan origination (~1%)', value: money(origination) },
      { label: 'Appraisal', value: money(appraisal) },
      { label: 'Title insurance (~0.5%)', value: money(title) },
      { label: 'Escrow / settlement', value: money(escrow) },
      { label: 'Prepaid items (reserves)', value: money(prepaid) },
    ] : [
      { label: 'Agent commission (~5%)', value: money(agentComm) },
      { label: 'Title / transfer fees', value: money(sellerTitle + transferTax) },
    ]),
    { label: 'As % of price', value: pct(total / price * 100, 1) },
    { label: 'Note', value: 'Estimates only. Actual costs vary by state, lender, and negotiation.' },
  ];
}

export function rentalYield(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), rentMonthly = safe(v.rent, 0);
  const expenses = safe(v.expenses, 0), vacancy = safe(v.vacancy, 0, 100);
  const annualRent = rentMonthly * 12 * (1 - vacancy / 100);
  const annualExpenses = expenses * 12;
  const grossYield = price > 0 ? annualRent / price * 100 : 0;
  const netYield = price > 0 ? (annualRent - annualExpenses) / price * 100 : 0;
  const noi = annualRent - annualExpenses;
  const capRate = price > 0 ? noi / price * 100 : 0;
  return [
    { label: 'Gross rental yield', value: pct(grossYield, 2), main: true },
    { label: 'Net rental yield', value: pct(netYield, 2) },
    { label: 'Cap rate', value: pct(capRate, 2) },
    { label: 'Annual NOI', value: money(noi) },
    { label: 'Annual gross rent', value: money(annualRent) },
    { label: 'Payback period', value: netYield > 0 ? num(100 / netYield, 1) + ' years' : '—' },
  ];
}

export function houseAffordabilityRatio(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), income = safe(v.income, 0);
  const ratio = income > 0 ? price / income : 0;
  let verdict = '';
  if (ratio < 3) verdict = 'Very affordable — below 3× is considered a healthy ratio.';
  else if (ratio < 5) verdict = 'Moderate — 3–5× is manageable with good credit and low debt.';
  else if (ratio < 7) verdict = 'Stretched — above 5× requires large down payment or high income growth.';
  else verdict = 'High — above 7× is difficult to finance conventionally.';
  return [
    { label: 'Price-to-income ratio', value: num(ratio, 1) + '×', main: true },
    { label: 'Verdict', value: verdict },
    { label: 'Conventional benchmark', value: '≤ 4–5× considered affordable by most lenders' },
  ];
}

export function squareFootageCalc(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode || 'rect');
  let sqft = 0;
  if (mode === 'rect') sqft = safe(v.length, 0) * safe(v.width, 0);
  else if (mode === 'triangle') sqft = safe(v.base, 0) * safe(v.height, 0) / 2;
  else if (mode === 'circle') sqft = Math.PI * safe(v.radius, 0) ** 2;
  const sqm = sqft * 0.092903;
  const sqyd = sqft / 9;
  return [
    { label: 'Area (sq ft)', value: num(sqft, 2), main: true },
    { label: 'Square meters', value: num(sqm, 2) },
    { label: 'Square yards', value: num(sqyd, 2) },
    { label: 'Acres', value: num(sqft / 43560, 4) },
  ];
}

export function capitalGains(v: Record<string, any>): CalcResult[] {
  const buy = safe(v.buy, 0), sell = safe(v.sell, 0);
  const held = safe(v.held, 0), income = safe(v.income, 0);
  const improvements = safe(v.improvements, 0);
  const basis = buy + improvements;
  const gain = Math.max(0, sell - basis);
  const isLong = held >= 12;
  // Long-term federal rates (2025): 0% / 15% / 20% based on taxable income
  const ltRate = income <= 47025 ? 0 : income <= 518900 ? 15 : 20;
  const stRate = income <= 11600 ? 10 : income <= 47150 ? 12 : income <= 100525 ? 22 : income <= 191950 ? 24 : income <= 243725 ? 32 : income <= 609350 ? 35 : 37;
  const taxRate = isLong ? ltRate : stRate;
  const tax = gain * taxRate / 100;
  return [
    { label: 'Estimated capital gains tax', value: money(tax), main: true },
    { label: 'Capital gain', value: money(gain) },
    { label: 'Type', value: isLong ? `Long-term (${ltRate}% federal rate)` : `Short-term (${stRate}% federal rate)` },
    { label: 'Net proceeds after tax', value: money(sell - tax) },
    { label: 'Note', value: 'Federal estimate only. Add state tax and consult a tax advisor for accuracy.' },
  ];
}

// ── Construction calculators ───────────────────────────────────────────────
export function concreteCalc(v: Record<string, any>): CalcResult[] {
  const l = safe(v.length,0), w = safe(v.width,0), d = safe(v.depth,0)/12; // depth in inches→ft
  const cubicFt = l * w * d;
  const cubicYd = cubicFt / 27;
  const bags60 = Math.ceil(cubicFt / 0.45); // 60lb bag ≈ 0.45 cu ft
  const bags80 = Math.ceil(cubicFt / 0.60); // 80lb bag ≈ 0.60 cu ft
  return [
    { label: 'Concrete needed', value: num(cubicYd, 2) + ' cubic yards', main: true },
    { label: 'Cubic feet', value: num(cubicFt, 2) },
    { label: '60 lb bags needed', value: int(bags60) },
    { label: '80 lb bags needed', value: int(bags80) },
    { label: 'Note', value: 'Add 10% for waste. 1 cubic yard = 27 cubic feet.' },
  ];
}

export function paintCalc(v: Record<string, any>): CalcResult[] {
  const length = safe(v.length,0), width = safe(v.width,0), height = safe(v.height,0);
  const doors = safe(v.doors,0), windows = safe(v.windows,0), coats = safe(v.coats,1,4);
  const wallArea = 2 * (length + width) * height;
  const deductions = doors * 20 + windows * 15; // avg sq ft per door/window
  const paintableArea = Math.max(0, wallArea - deductions) * coats;
  const gallons = paintableArea / 350; // 1 gal ≈ 350 sq ft
  return [
    { label: 'Paint needed', value: num(gallons, 2) + ' gallons', main: true },
    { label: 'Paintable area', value: int(Math.round(paintableArea)) + ' sq ft' },
    { label: 'Quarts (round up)', value: int(Math.ceil(gallons * 4)) },
    { label: 'Coats', value: int(coats) },
    { label: 'Note', value: 'Coverage varies by paint brand (300–400 sq ft/gal). Add 10% for trim.' },
  ];
}

export function flooringCalc(v: Record<string, any>): CalcResult[] {
  const length = safe(v.length,0), width = safe(v.width,0), waste = safe(v.waste,5,30);
  const roomSqFt = length * width;
  const totalSqFt = roomSqFt * (1 + waste/100);
  const boxes = safe(v.sqftPerBox,20,0);
  return [
    { label: 'Flooring needed', value: num(totalSqFt, 1) + ' sq ft', main: true },
    { label: 'Room area', value: num(roomSqFt, 1) + ' sq ft' },
    { label: 'Waste allowance', value: num(roomSqFt * waste/100, 1) + ' sq ft' },
    ...(boxes > 0 ? [{ label: 'Boxes needed', value: int(Math.ceil(totalSqFt / boxes)) }] : []),
    { label: 'Square meters', value: num(totalSqFt * 0.0929, 2) },
  ];
}

export function gravelCalc(v: Record<string, any>): CalcResult[] {
  const l = safe(v.length,0), w = safe(v.width,0), d = safe(v.depth,0)/12;
  const cubicYd = (l * w * d) / 27;
  const tons = cubicYd * 1.4; // gravel ≈ 1.4 tons/yd³
  return [
    { label: 'Gravel needed', value: num(cubicYd, 2) + ' cubic yards', main: true },
    { label: 'Approx. weight', value: num(tons, 2) + ' tons' },
    { label: 'Cubic feet', value: num(l * w * d, 2) },
    { label: 'Note', value: 'Add 10% for compaction and waste. 1.4 tons/yd³ is typical for pea gravel.' },
  ];
}

export function mulchCalc(v: Record<string, any>): CalcResult[] {
  const l = safe(v.length,0), w = safe(v.width,0), d = safe(v.depth,0)/12;
  const cubicYd = (l * w * d) / 27;
  const bags2cuFt = Math.ceil(cubicYd * 13.5); // 2 cu ft bags per yd³ ≈ 13.5
  return [
    { label: 'Mulch needed', value: num(cubicYd, 2) + ' cubic yards', main: true },
    { label: '2 cu ft bags', value: int(bags2cuFt) },
    { label: 'Cubic feet', value: num(l * w * d, 2) },
    { label: 'Note', value: '2–4 inches deep is standard. Deeper suppresses weeds better.' },
  ];
}

export function fenceCalc(v: Record<string, any>): CalcResult[] {
  const perimeter = safe(v.perimeter,0), postSpacing = safe(v.spacing,1,20) || 8;
  const height = safe(v.height,6), boardWidth = safe(v.boardWidth,6)/12; // inches→ft
  const posts = Math.ceil(perimeter / postSpacing) + 1;
  const rails = posts * 2; // 2 rails per section is typical
  const pickets = Math.ceil(perimeter / boardWidth);
  return [
    { label: 'Posts needed', value: int(posts), main: true },
    { label: 'Fence boards / pickets', value: int(pickets) },
    { label: 'Rails (2 per section)', value: int(rails) },
    { label: 'Linear feet', value: num(perimeter, 0) + ' ft' },
    { label: 'Note', value: 'Add 10% for waste and damaged boards.' },
  ];
}

export function roofPitch(v: Record<string, any>): CalcResult[] {
  const run = safe(v.run,0), rise = safe(v.rise,0);
  if (run <= 0) return [{ label: 'Enter run', value: '—', main: true }];
  const pitchRatio = rise / run;
  const angleDeg = Math.atan(pitchRatio) * (180 / Math.PI);
  const multiplier = Math.sqrt(1 + pitchRatio ** 2); // roof area = plan area × multiplier
  const planArea = safe(v.planArea,0);
  return [
    { label: 'Pitch', value: num(rise,1) + ':12', main: true },
    { label: 'Angle', value: num(angleDeg, 1) + '°' },
    { label: 'Roof area multiplier', value: num(multiplier, 4) },
    ...(planArea > 0 ? [{ label: 'Roof area', value: num(planArea * multiplier, 1) + ' sq ft' }] : []),
    { label: 'Category', value: pitchRatio < 4/12 ? 'Low slope (<4:12)' : pitchRatio < 9/12 ? 'Conventional (4–9:12)' : 'Steep (>9:12)' },
  ];
}

export function staircaseCalc(v: Record<string, any>): CalcResult[] {
  const totalRise = safe(v.rise,0), riserH = safe(v.riserHeight,4,9) || 7;
  const steps = Math.round(totalRise / riserH);
  const actualRiser = totalRise / (steps || 1);
  const treadDepth = safe(v.treadDepth,9,14) || 11;
  const totalRun = steps * treadDepth;
  const stairAngle = Math.atan(actualRiser / treadDepth) * (180 / Math.PI);
  return [
    { label: 'Number of steps', value: int(steps), main: true },
    { label: 'Actual riser height', value: num(actualRiser, 3) + '"' },
    { label: 'Total run (horizontal)', value: num(totalRun / 12, 2) + ' ft' },
    { label: 'Stair angle', value: num(stairAngle, 1) + '°' },
    { label: 'Note', value: 'Building code: risers 7–7¾", treads min 10". Verify with local code.' },
  ];
}
