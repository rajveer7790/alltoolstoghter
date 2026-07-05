import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, min: 0 });

export const TAX: ToolDef[] = [
{
  slug: 'paycheck-calculator', name: 'Paycheck Calculator', prio: 'P1', category: 'tax', widget: 'calc',
  short: 'Estimate take-home pay after federal tax, FICA, state tax, and 401(k).',
  metaDescription: 'Free Paycheck Calculator. Estimate your net take-home pay safely in your browser after deducting federal tax, FICA, state tax, and 401k.',
  keywords: ['paycheck calculator','take home pay calculator','net pay calculator','salary after tax calculator'],
  fields: [$('gross','Gross pay per paycheck',2500,'$'),{key:'frequency',label:'Pay frequency',type:'select',def:'26',options:[{value:'52',label:'Weekly'},{value:'26',label:'Bi-weekly'},{value:'24',label:'Semi-monthly'},{value:'12',label:'Monthly'}]},{key:'filing',label:'Filing status',type:'select',def:'single',options:[{value:'single',label:'Single'},{value:'married',label:'Married filing jointly'}]},$('stateRate','State tax rate (%)',5,'%'),$('k401','401(k) contribution (%)',5,'%')],
  content: {
    intro: 'Estimate your take-home pay after federal income tax, Social Security, Medicare, state tax, and 401(k) contributions — using 2025 federal tax brackets.',
    how: 'Federal tax uses 2025 bracket tables and the standard deduction. FICA is 6.2% Social Security (up to the wage base) plus 1.45% Medicare. State tax and 401(k) use the rates you enter.',
    howSteps: [
      'Enter your gross pay per paycheck and select the pay frequency.',
      'Provide your filing status to apply the correct IRS standard deduction.',
      'Include your estimated state tax rate and 401(k) percentage to review your net take-home pay.'
    ],
    faqs: [
      ['How accurate is this estimate?','It is a close approximation using 2025 federal brackets and the standard deduction. Actual pay depends on your W-4, local taxes, and benefit deductions.'],
      ['Why is my take-home less than expected?','Combined federal tax, FICA (7.65%), state tax, and pre-tax deductions typically reduce gross pay by 25–35% for middle incomes.'],
      ['Does a 401(k) reduce my taxes?','Yes — traditional 401(k) contributions are pre-tax, lowering your taxable income now. You pay tax when you withdraw in retirement.'],
    ],
  },
  related: ['salary-calculator','self-employment-tax-calculator','hourly-to-salary-calculator','401k-calculator'],
},
{
  slug: 'vat-calculator', name: 'VAT Calculator', prio: 'P1', category: 'tax', widget: 'calc',
  short: 'Add or remove VAT at any rate, with the tax amount broken out.',
  metaDescription: 'Calculate VAT online. Free Value Added Tax calculator to instantly add or extract VAT from a gross price. No data is stored on our servers.',
  keywords: ['vat calculator','value added tax calculator','add vat calculator','remove vat calculator'],
  fields: [$('amount','Amount',100,'$'),$('rate','VAT rate (%)',20,'%'),{key:'mode',label:'Mode',type:'select',def:'add',options:[{value:'add',label:'Add VAT (amount excludes VAT)'},{value:'remove',label:'Remove VAT (amount includes VAT)'}]}],
  content: {
    intro: 'Add VAT to a net price or extract VAT from a gross price at any rate — with the VAT amount, net price, and gross price all shown clearly.',
    how: 'To add VAT: gross = net × (1 + rate). To remove VAT: net = gross ÷ (1 + rate). The VAT amount is the difference between gross and net.',
    howSteps: [
      'Choose whether to Add VAT to an amount or Remove VAT from a total.',
      'Enter the numerical amount.',
      'Set the required VAT rate percentage to instantly calculate the split.'
    ],
    faqs: [
      ['What is VAT?','Value Added Tax — a consumption tax applied at each stage of production. It is common in the UK, EU, and many other countries (the US uses sales tax instead).'],
      ['What are typical VAT rates?','The UK standard rate is 20%; EU rates range from 17% to 27%. Many countries have reduced rates for food, books, and essentials.'],
      ['How do I remove VAT from a total?','Divide the gross amount by (1 + rate/100). For 20% VAT, divide by 1.2 to get the net price, then subtract to find the VAT.'],
    ],
  },
  related: ['sales-tax-calculator','paycheck-calculator','discount-calculator','markup-calculator'],
},
{
  slug: 'self-employment-tax-calculator', name: 'Self-Employment Tax Calculator', prio: 'P1', category: 'tax', widget: 'calc',
  short: 'Estimate US self-employment (SECA) tax on your net business profit.',
  metaDescription: 'Free Self-Employment Tax Calculator. Estimate your SECA tax liability accurately and entirely locally based on your freelance net profit.',
  keywords: ['self employment tax calculator','seca tax calculator','1099 tax calculator','freelancer tax calculator'],
  fields: [$('netProfit','Net self-employment profit',80000,'$')],
  content: {
    intro: 'Estimate your US self-employment tax (Social Security and Medicare for the self-employed) on your net business profit, including the deductible employer-equivalent portion.',
    how: 'SE tax is 15.3% on 92.35% of net profit — 12.4% Social Security (up to the wage base) plus 2.9% Medicare. Half of the SE tax is deductible against your income tax.',
    howSteps: [
      'Input your final net self-employment profit for the year.',
      'The calculator processes the 15.3% base rate over the taxable 92.35% portion of the net.',
      'Review your estimated total self-employment tax and the half-deductible amount.'
    ],
    faqs: [
      ['Why is self-employment tax 15.3%?','Employees split FICA with their employer (7.65% each). The self-employed pay both halves — but can deduct the employer-equivalent half from taxable income.'],
      ['Is this on top of income tax?','Yes — SE tax is separate from and in addition to federal and state income tax. Budget for both when setting aside money.'],
      ['When do I pay it?','Through quarterly estimated tax payments to the IRS. The calculator shows a quarterly figure. Missing payments can trigger penalties.'],
    ],
  },
  related: ['paycheck-calculator','salary-calculator','capital-gains-tax-calculator','vat-calculator'],
},
];
