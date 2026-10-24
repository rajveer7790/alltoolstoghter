import { ToolDef } from '../types';
const $ = (k: string, label: string, def: number, unit = '$', min = 0): any => ({ key: k, label, type: 'number', def, unit, min });
const pctF = (k: string, label: string, def: number): any => ({ key: k, label, type: 'number', def, unit: '%', min: 0, max: 100, step: 0.01 });

export const FINANCE: ToolDef[] = [
{
  slug: 'mortgage-calculator', name: 'Mortgage Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'See your monthly payment, total interest, and PMI risk for any home loan.',
  metaDescription: 'Free online mortgage calculator. Calculate monthly payment and total interest with the standard amortization formula.',
  keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment', 'amortization calculator'],
  fields: [$( 'price', 'Home price', 350000), $('down', 'Down payment', 70000), pctF('rate', 'Interest rate', 6.5), { key: 'years', label: 'Loan term', type: 'number', def: 30, unit: 'yrs', min: 1, max: 50 }, $('tax', 'Property tax (yearly, optional)', 0), $('ins', 'Home insurance (yearly, optional)', 0)],
  content: {
    intro: 'Calculate your monthly principal-and-interest payment and total interest using the standard amortization formula. Example: $350,000 home with $70,000 down (loan $280,000) at 6.5% for 30 years = about $1,770/month P&I.',
    how: 'M = P · r(1+r)^n / ((1+r)^n − 1), where P is loan amount, r is monthly rate, n is number of payments. LTV above 80% usually requires PMI.',
    howSteps: [
      'Enter home price and down payment to get the loan amount.',
      'Set annual interest rate and loan term in years.',
      'Review monthly P&I payment and total interest over the life of the loan.',
      'Optionally add yearly property tax and insurance for a fuller monthly cost.'
    ],
    faqs: [
      ['What is the amortization formula?', 'M = P · r(1+r)^n / ((1+r)^n − 1). P = loan amount, r = monthly rate, n = total months.'],
      ['Why does a small rate change matter?', 'On a 30-year loan, 0.5% higher rate can add tens of thousands in total interest.'],
      ['What is LTV and PMI?', 'LTV = loan / home price. Above 80% LTV, most lenders require PMI until you reach 20% equity.'],
      ['Does this include taxes and insurance?', 'The core payment is principal + interest. Add tax and insurance separately for a full monthly estimate.'],
      ['What is a typical US mortgage term?', '30 years is most common. 15-year loans have higher payments but much lower total interest.'],
    ],
  },
  related: ['loan-calculator', 'down-payment-calculator', 'mortgage-payoff-calculator', 'dti-calculator'],
},
{
  slug: 'loan-calculator', name: 'Loan Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Monthly payment, total interest, and total cost for any fixed-rate loan.',
  metaDescription: 'Fixed-rate loan calculator. See monthly payment and total interest using standard amortization.',
  keywords: ['loan calculator', 'loan payment calculator', 'emi calculator', 'personal loan calculator'],
  fields: [$('amount', 'Loan amount', 20000), pctF('rate', 'Annual interest rate', 8), { key: 'years', label: 'Term', type: 'number', def: 5, unit: 'yrs', min: 0.5, max: 50, step: 0.5 }],
  content: {
    intro: 'Calculate monthly payment and total cost for any fixed-rate loan. Example: $20,000 at 8% for 5 years ≈ $405/month.',
    how: 'Uses the standard amortization formula. Each payment covers interest first, then principal.',
    howSteps: [
      'Enter the loan amount (principal).',
      'Enter the annual interest rate and term in years.',
      'Review the monthly payment and total interest.'
    ],
    faqs: [
      ['Does this work for any fixed-rate loan?', 'Yes — personal, auto, student, or business loans with a fixed rate and monthly payments.'],
      ['What if the rate is 0%?', 'Payment = amount ÷ number of months.'],
      ['Why is total repayment higher?', 'The difference is interest. Shorter terms reduce total interest.'],
    ],
  },
  related: ['mortgage-calculator', 'auto-loan-calculator', 'apr-calculator', 'credit-card-payoff-calculator'],
},
{
  slug: 'auto-loan-calculator', name: 'Auto Loan Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Car payment including sales tax, trade-in value, and dealer fees.',
  metaDescription: 'Auto loan calculator with sales tax, trade-in, and fees. See your real monthly car payment.',
  keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator'],
  fields: [$('price', 'Vehicle price', 30000), $('down', 'Cash down', 3000), $('trade', 'Trade-in value', 0), pctF('taxRate', 'Sales tax', 7), $('fees', 'Fees (title, doc…)', 500), pctF('rate', 'APR', 7.5), { key: 'months', label: 'Term', type: 'number', def: 60, unit: 'mo', min: 12, max: 96 }],
  content: {
    intro: 'Realistic car payment calculator that includes sales tax, trade-in, fees, and down payment. Amount financed = price + tax + fees − down − trade-in.',
    how: 'Most US states apply sales tax to the price minus trade-in. Then standard amortization is used.',
    howSteps: [
      'Enter vehicle price, down payment, and trade-in value.',
      'Add sales tax rate and dealer fees.',
      'Set APR and term to see the monthly payment.'
    ],
    faqs: [
      ['Does trade-in reduce tax?', 'In most US states yes — trade-in lowers the taxable amount.'],
      ['Longer term better?', 'Lower payment but more total interest and longer negative equity risk.'],
      ['What APR should I use?', 'Use your pre-approval or lender quote, not just advertised rates.'],
    ],
  },
  related: ['loan-calculator', 'car-payment-calculator', 'sales-tax-calculator', 'dti-calculator'],
},
{
  slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Project how savings grow with compounding and regular contributions.',
  metaDescription: 'Compound interest calculator with regular contributions. See future value with monthly, quarterly, or daily compounding.',
  keywords: ['compound interest calculator', 'investment growth calculator', 'compound interest formula'],
  fields: [$('principal', 'Starting amount', 10000), pctF('rate', 'Annual rate', 7), { key: 'years', label: 'Years', type: 'number', def: 20, unit: 'yrs', min: 0, max: 100 }, { key: 'freq', label: 'Compounding', type: 'select', def: '12', options: [{ value: '1', label: 'Yearly' }, { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' }] }, $('contrib', 'Contribution per period', 200)],
  content: {
    intro: 'Future value of a starting amount plus regular contributions. Example: $10,000 starting + $200/month at 7% for 20 years grows significantly due to compounding.',
    how: 'FV = P(1+r/n)^(nt) + PMT · ((1+r/n)^(nt)−1)/(r/n). Contribution is per compounding period.',
    howSteps: [
      'Enter starting principal and annual rate.',
      'Choose compounding frequency and contribution amount.',
      'Set years to see projected future value.'
    ],
    faqs: [
      ['Why is compounding powerful?', 'Interest earns interest. Starting early matters more than larger later contributions.'],
      ['Monthly vs yearly?', 'Difference is moderate at normal rates but grows over long periods.'],
      ['Is the rate guaranteed?', 'No — this is a projection, not a promise of market returns.'],
    ],
  },
  related: ['savings-calculator', 'simple-interest-calculator', 'roi-calculator', 'inflation-calculator'],
},
{
  slug: 'credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'How long to clear a card balance — and the interest it will cost.',
  metaDescription: 'Credit card payoff calculator. See months to payoff and total interest at your APR and payment.',
  keywords: ['credit card payoff calculator', 'credit card interest calculator', 'debt free calculator'],
  fields: [$('balance', 'Card balance', 5000), pctF('apr', 'APR', 24), $('payment', 'Monthly payment', 250)],
  content: {
    intro: 'See how many months and how much interest to pay off a credit card. Example: $5,000 at 24% APR with $250/month ≈ 26 months and about $1,449 in interest.',
    how: 'Each month: interest = balance × (APR/12), then payment is applied. Continues until balance reaches zero.',
    howSteps: [
      'Enter current card balance and APR.',
      'Enter the fixed monthly payment you plan to make.',
      'Review months to payoff and total interest.'
    ],
    faqs: [
      ['Why does paying more help so much?', 'Extra payment goes straight to principal and reduces all future interest.'],
      ['Typical card APR?', 'Often 20–30%. Minimum payments can stretch payoff for years.'],
      ['Fixed vs minimum payment?', 'Fixed payments clear the balance much faster than shrinking minimums.'],
    ],
  },
  related: ['loan-calculator', 'dti-calculator', 'simple-interest-calculator', 'savings-calculator'],
},
];
