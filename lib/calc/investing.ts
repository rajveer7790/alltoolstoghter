import { CalcResult } from '../types';
import { money, pct, num, safe } from '../format';

export function dcaCalc(v: Record<string, any>): CalcResult[] {
  const monthly = safe(v.monthly, 0), months = safe(v.months, 1, 600);
  const annualReturn = safe(v.return, 0, 100) / 100;
  const r = annualReturn / 12;
  const fv = r === 0 ? monthly * months : monthly * ((Math.pow(1+r, months) - 1) / r);
  const invested = monthly * months;
  return [
    { label: 'Portfolio value', value: money(fv), main: true },
    { label: 'Total invested', value: money(invested) },
    { label: 'Investment gain', value: money(fv - invested) },
    { label: 'Return on invested', value: invested > 0 ? pct((fv-invested)/invested*100, 1) : '—' },
  ];
}

export function cryptoProfitLoss(v: Record<string, any>): CalcResult[] {
  const buyPrice = safe(v.buyPrice, 0), sellPrice = safe(v.sellPrice, 0);
  const quantity = safe(v.quantity, 0), fee = safe(v.fee, 0, 100) / 100;
  const invested = buyPrice * quantity;
  const gross = sellPrice * quantity;
  const feeAmt = gross * fee;
  const net = gross - feeAmt - invested;
  const pnlPct = invested > 0 ? (net / invested) * 100 : 0;
  return [
    { label: net >= 0 ? 'Profit' : 'Loss', value: money(Math.abs(net)), main: true },
    { label: 'P&L %', value: pct(pnlPct, 2) },
    { label: 'Gross proceeds', value: money(gross) },
    { label: 'Trading fees', value: money(feeAmt) },
    { label: 'Net proceeds', value: money(gross - feeAmt) },
    { label: 'Cost basis', value: money(invested) },
  ];
}

export function stockReturn(v: Record<string, any>): CalcResult[] {
  const buy = safe(v.buy, 0), sell = safe(v.sell, 0), shares = safe(v.shares, 0);
  const dividends = safe(v.dividends, 0), years = safe(v.years, 0.001, 100);
  const capitalGain = (sell - buy) * shares;
  const totalReturn = capitalGain + dividends;
  const totalReturnPct = buy * shares > 0 ? (totalReturn / (buy * shares)) * 100 : 0;
  const annualized = buy * shares > 0 ? (Math.pow(1 + totalReturn / (buy * shares), 1/years) - 1) * 100 : 0;
  return [
    { label: 'Total return', value: pct(totalReturnPct, 2), main: true },
    { label: 'Dollar return', value: money(totalReturn) },
    { label: 'Capital gain', value: money(capitalGain) },
    { label: 'Dividend income', value: money(dividends) },
    { label: 'Annualized return (CAGR)', value: years > 0 ? pct(annualized, 2) : '—' },
  ];
}

export function dividendYield(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), annualDiv = safe(v.annual, 0);
  if (price <= 0) return [{ label: 'Enter stock price', value: '—', main: true }];
  const yield_ = (annualDiv / price) * 100;
  const quarterly = annualDiv / 4;
  const shares = safe(v.shares, 0);
  return [
    { label: 'Dividend yield', value: pct(yield_, 2), main: true },
    { label: 'Annual dividend per share', value: money(annualDiv) },
    { label: 'Quarterly dividend', value: money(quarterly) },
    ...(shares > 0 ? [{ label: 'Annual income from holding', value: money(annualDiv * shares) }] : []),
    { label: 'Context', value: yield_ > 6 ? 'High yield — verify sustainability' : yield_ > 2 ? 'Moderate yield' : 'Low yield / growth stock' },
  ];
}

export function peRatio(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price, 0), eps = safe(v.eps, 0);
  if (eps <= 0 && price <= 0) return [{ label: 'Enter price and EPS', value: '—', main: true }];
  if (eps <= 0) return [{ label: 'Negative or zero EPS — P/E undefined', value: '—', main: true }];
  const pe = price / eps;
  const earningsYield = (eps / price) * 100;
  return [
    { label: 'P/E ratio', value: num(pe, 2) + '×', main: true },
    { label: 'Earnings yield', value: pct(earningsYield, 2) },
    { label: 'Interpretation', value: pe < 10 ? 'Low — value territory or declining earnings' : pe < 20 ? 'Moderate — historically average for S&P 500' : pe < 35 ? 'High — growth expectations priced in' : 'Very high — strong growth required to justify' },
    { label: 'Implied earnings growth', value: 'Use PEG ratio = P/E ÷ growth rate for context' },
  ];
}
