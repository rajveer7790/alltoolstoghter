import { ToolDef } from '../types';
const $ = (k: string, label: string, def: number, unit = '$', min = 0): any => ({ key: k, label, type: 'number', def, unit, min });
const pctF = (k: string, label: string, def: number): any => ({ key: k, label, type: 'number', def, unit: '%', min: 0, max: 100, step: 0.01 });

export const FINANCE: ToolDef[] = [
{
  slug: 'mortgage-calculator', name: 'Mortgage Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'See your monthly payment, total interest, and PMI risk for any home loan.',
  metaDescription: 'Free online mortgage calculator. Calculate your monthly home loan payment, total interest, and PMI safely and privately in your browser.',
  keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment', 'pmi calculator'],
  fields: [$( 'price', 'Home price', 350000), $('down', 'Down payment', 70000), pctF('rate', 'Interest rate', 6.5), { key: 'years', label: 'Loan term', type: 'number', def: 30, unit: 'yrs', min: 1, max: 50 }, $('tax', 'Property tax (yearly, optional)', 0), $('ins', 'Home insurance (yearly, optional)', 0)],
  content: {
    intro: 'Enter a home price, down payment, rate and term to get your monthly principal-and-interest payment instantly, plus the total interest you will pay over the life of the loan.',
    how: 'The payment uses the standard amortization formula M = P·r(1+r)ⁿ / ((1+r)ⁿ − 1), where P is the loan amount, r the monthly rate, and n the number of monthly payments. If your loan-to-value ratio is above 80%, the tool flags that private mortgage insurance (PMI) is usually required.',
    howSteps: [
      'Enter the home price and your desired down payment.',
      'Set the interest rate and the length of the loan in years.',
      'The calculator computes the amortization formula and displays your monthly P&I payment.'
    ],
    faqs: [
      ['What does P&I mean?', 'Principal and interest — the core loan payment, before property tax, insurance, PMI or HOA dues are added.'],
      ['Why does a small rate change matter so much?', 'Interest compounds over hundreds of payments. On a 30-year loan, even 0.5% more in rate typically adds tens of thousands of dollars in total interest.'],
      ['What is LTV?', 'Loan-to-value: the loan amount divided by the home price. Above 80% LTV, conventional lenders usually require PMI until you build more equity.'],
    ],
  },
  related: ['loan-calculator', 'down-payment-calculator', 'mortgage-payoff-calculator', 'dti-calculator'],
},
];
