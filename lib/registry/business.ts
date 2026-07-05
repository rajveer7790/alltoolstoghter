import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, min: 0 });

export const BUSINESS: ToolDef[] = [
{
  slug: 'cac-calculator', name: 'CAC Calculator', prio: 'P1', category: 'business', widget: 'calc',
  short: 'Customer Acquisition Cost and LTV:CAC ratio for your marketing spend.',
  metaDescription: 'Free online CAC Calculator. Calculate your Customer Acquisition Cost and LTV:CAC ratio securely to measure marketing sustainability.',
  keywords: ['cac calculator','customer acquisition cost calculator','ltv cac ratio','marketing cost calculator'],
  fields: [$('spend','Total sales & marketing spend',50000,'$'),$('customers','New customers acquired',200),$('ltv','Customer lifetime value (optional)',2000,'$')],
  content: {
    intro: 'Calculate your Customer Acquisition Cost (CAC) and the critical LTV:CAC ratio — the metrics investors and founders use to judge whether growth is sustainable.',
    how: 'CAC = total sales and marketing spend ÷ new customers acquired. The LTV:CAC ratio divides lifetime value by CAC — a ratio of 3:1 or higher is generally considered healthy.',
    howSteps: [
      'Enter your total sales and marketing spend over a given period.',
      'Enter the number of new customers acquired during that same period.',
      'Optionally input Customer Lifetime Value (LTV) to generate your LTV:CAC ratio.'
    ],
    faqs: [
      ['What should be included in CAC?','All sales and marketing costs: ad spend, salaries, tools, agency fees, and commissions — divided by the customers those efforts acquired in the same period.'],
      ['What is a good LTV:CAC ratio?','3:1 is the common benchmark. Below 1:1 means you lose money on each customer. Above 5:1 may suggest you are under-investing in growth.'],
      ['How long until I recover CAC?','Track CAC payback period separately — the months of gross margin needed to recover acquisition cost. Under 12 months is strong for SaaS.'],
    ],
  },
  related: ['employee-turnover-calculator','customer-lifetime-value-calculator','roas-calculator','gross-margin-calculator'],
},
{
  slug: 'customer-lifetime-value-calculator', name: 'Customer Lifetime Value Calculator', prio: 'P1', category: 'business', widget: 'calc',
  short: 'Customer lifetime value (LTV) from purchase value, frequency, and lifespan.',
  metaDescription: 'Calculate Customer Lifetime Value (LTV or CLV) online. Free business calculator projecting exactly how much revenue a customer generates over time.',
  keywords: ['customer lifetime value calculator','ltv calculator','clv calculator','lifetime value calculator'],
  fields: [$('avgPurchase','Average purchase value',80,'$'),$('frequency','Purchases per year',4),$('lifespan','Customer lifespan (years)',3),$('margin','Gross margin (%)',60,'%')],
  content: {
    intro: 'Calculate Customer Lifetime Value (LTV or CLV) — the total revenue and gross profit a typical customer generates over their relationship with your business.',
    how: 'LTV = average purchase value × purchase frequency × customer lifespan. Applying your gross margin gives the profit-based LTV, which is more meaningful for unit economics.',
    howSteps: [
      'Input the average purchase value per customer transaction.',
      'Input the average purchase frequency per year.',
      'Enter the expected customer lifespan and gross margin to compute true Profit LTV.'
    ],
    faqs: [
      ['Should I use revenue or margin for LTV?','Margin-based LTV is more accurate for unit economics, since it reflects actual profit. Revenue-based LTV overstates the value a customer truly contributes.'],
      ['How do I estimate customer lifespan?','Lifespan = 1 ÷ churn rate. If 25% of customers leave each year, the average lifespan is 4 years.'],
      ['Why does LTV matter?','It sets the ceiling on what you can profitably spend to acquire a customer (CAC). LTV must comfortably exceed CAC for sustainable growth.'],
    ],
  },
  related: ['cac-calculator','roas-calculator','gross-margin-calculator','roi-calculator'],
},
{
  slug: 'roas-calculator', name: 'ROAS Calculator', prio: 'P1', category: 'business', widget: 'calc',
  short: 'Return on ad spend, net profit, and break-even ROAS.',
  metaDescription: 'Free online ROAS Calculator. Measure Return On Ad Spend and calculate your break-even ad cost privately without uploading your data.',
  keywords: ['roas calculator','return on ad spend calculator','advertising roi calculator','roas formula'],
  fields: [$('revenue','Revenue from ads',20000,'$'),$('spend','Ad spend',5000,'$'),$('cogs','Cost of goods sold (optional)',6000,'$')],
  content: {
    intro: 'Calculate Return On Ad Spend (ROAS), net profit, and your break-even ROAS — so you know whether your advertising is actually making money, not just generating revenue.',
    how: 'ROAS = revenue ÷ ad spend, expressed as a ratio. Break-even ROAS accounts for product cost (COGS): you need revenue to cover both ad spend and the cost of goods sold.',
    howSteps: [
      'Enter your total revenue directly generated from ads.',
      'Enter the ad spend used to generate that revenue.',
      'Optionally include Cost of Goods Sold (COGS) to calculate your exact break-even ROAS threshold.'
    ],
    faqs: [
      ['What is a good ROAS?','It depends on margins. A common target is 4:1 (400%), but high-margin products can be profitable at 2:1 while low-margin ones need 6:1 or more.'],
      ['ROAS vs ROI — what is the difference?','ROAS measures revenue per ad dollar; ROI measures profit per dollar after all costs. ROAS can look great while ROI is negative if margins are thin.'],
      ['What is break-even ROAS?','The ROAS at which ad revenue exactly covers ad spend plus product cost. Below it you lose money; above it you profit.'],
    ],
  },
  related: ['cac-calculator','gross-margin-calculator','email-marketing-roi-calculator','roi-calculator'],
},
{
  slug: 'email-marketing-roi-calculator', name: 'Email Marketing ROI Calculator', prio: 'P2', category: 'business', widget: 'calc',
  short: 'Projected revenue and ROI from an email campaign funnel.',
  metaDescription: 'Calculate Email Marketing ROI. Free online tool estimating revenue from list size, open rates, CTR, and conversion rates securely.',
  keywords: ['email marketing roi calculator','email campaign roi','email revenue calculator','email conversion calculator'],
  fields: [$('listSize','Email list size',10000),$('openRate','Open rate (%)',25,'%'),$('ctr','Click-through rate (%)',3,'%'),$('convRate','Conversion rate (%)',5,'%'),$('avgOrder','Average order value',60,'$'),$('cost','Cost per email',0.01,'$')],
  content: {
    intro: 'Project the revenue and return on investment of an email marketing campaign by modelling the full funnel — from list size through opens, clicks, and conversions.',
    how: 'Revenue = list × open rate × click rate × conversion rate × average order value. ROI = (revenue − cost) ÷ cost. Email consistently delivers one of the highest ROIs in marketing.',
    howSteps: [
      'Input the size of your email list and your average open and click-through rates.',
      'Specify your conversion rate and average order value.',
      'Enter your email platform sending costs to calculate your expected final campaign ROI.'
    ],
    faqs: [
      ['What are typical email benchmarks?','Open rates average 20–30%, click rates 2–5%, and conversion rates 1–5% — but these vary widely by industry and list quality.'],
      ['Why is email ROI so high?','Email has very low cost per send and reaches an audience that already opted in. Industry studies often cite ROI of $30–40 per dollar spent.'],
      ['How do I improve these numbers?','Segment your list, personalise subject lines, optimise send times, and clean inactive subscribers to lift every stage of the funnel.'],
    ],
  },
  related: ['roas-calculator','cac-calculator','gross-margin-calculator','customer-lifetime-value-calculator'],
},
{
  slug: 'employee-turnover-calculator', name: 'Employee Turnover Calculator', prio: 'P2', category: 'business', widget: 'calc',
  short: 'Turnover rate and estimated replacement cost for your team.',
  metaDescription: 'Calculate employee turnover rate and replacement costs online securely. Free HR tool evaluating attrition impact directly in your browser.',
  keywords: ['employee turnover calculator','turnover rate calculator','staff turnover calculator','attrition rate calculator'],
  fields: [$('left','Employees who left',12),$('avg','Average number of employees',100),$('salary','Average annual salary',60000,'$')],
  content: {
    intro: 'Calculate your employee turnover rate and estimate the financial cost of replacing departing staff — a hidden expense that often exceeds half an annual salary per role.',
    how: 'Turnover rate = (employees who left ÷ average headcount) × 100. Replacement cost is estimated at roughly 50% of annual salary, covering recruiting, onboarding, and lost productivity.',
    howSteps: [
      'Enter the number of employees who left the company over the period.',
      'Enter the average total headcount for that same period.',
      'Input the average annual salary to reveal the hidden financial cost of turnover.'
    ],
    faqs: [
      ['What is a healthy turnover rate?','It varies by industry, but under 10% annually is generally considered healthy. Retail and hospitality run much higher than professional services.'],
      ['Why is replacement so expensive?','Costs include recruiting, interviewing, onboarding, training, and the productivity gap while the role is vacant and the new hire ramps up.'],
      ['How can I reduce turnover?','Competitive pay, career development, good management, and regular feedback are consistently the strongest retention factors in research.'],
    ],
  },
  related: ['salary-calculator','gross-margin-calculator','cac-calculator','roi-calculator'],
},
{
  slug: 'gross-margin-calculator', name: 'Gross Margin Calculator', prio: 'P1', category: 'business', widget: 'calc',
  short: 'Gross margin, gross profit, and markup from revenue and cost.',
  metaDescription: 'Gross Margin Calculator online. Calculate gross profit, gross margin, and markup clearly with this free, private browser tool.',
  keywords: ['gross margin calculator','profit margin calculator','markup calculator','margin vs markup'],
  fields: [$('revenue','Revenue / selling price',100,'$'),$('cogs','Cost of goods sold',40,'$')],
  content: {
    intro: 'Calculate gross margin, gross profit, and markup from your revenue and cost of goods sold — and understand the crucial difference between margin and markup.',
    how: 'Gross margin = (revenue − COGS) ÷ revenue. Markup = (revenue − COGS) ÷ COGS. They describe the same profit but from different bases, which is why they differ.',
    howSteps: [
      'Input your total revenue or the selling price per unit.',
      'Input the Cost of Goods Sold (COGS).',
      'The engine outputs the difference between margin and markup automatically.'
    ],
    faqs: [
      ['Margin vs markup — what is the difference?','Margin is profit as a percent of the selling price; markup is profit as a percent of cost. A 50% markup equals only a 33% margin.'],
      ['What is a good gross margin?','It varies enormously: software 70–90%, retail 20–50%, grocery 5–15%. Compare within your own industry.'],
      ['Is gross margin the same as net margin?','No — gross margin only deducts direct product costs. Net margin also subtracts operating expenses, interest, and taxes.'],
    ],
  },
  related: ['profit-margin-calculator','markup-calculator','roas-calculator','cac-calculator'],
},
];
