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
{
  slug: 'loan-calculator', name: 'Loan Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Monthly payment, total interest, and total cost for any fixed-rate loan.',
  metaDescription: 'Calculate fixed-rate loan payments online. Free calculator to determine your exact monthly cost and total interest for personal, auto, or business loans.',
  keywords: ['loan calculator', 'loan payment calculator', 'emi calculator', 'personal loan calculator'],
  fields: [$('amount', 'Loan amount', 20000), pctF('rate', 'Annual interest rate', 8), { key: 'years', label: 'Term', type: 'number', def: 5, unit: 'yrs', min: 0.5, max: 50, step: 0.5 }],
  content: {
    intro: 'A universal fixed-rate loan calculator: enter the amount, rate, and term to see the monthly payment and the true total cost of borrowing.',
    how: 'It applies the amortization formula used by banks worldwide. Each payment covers that month\'s interest first; the remainder reduces principal, which is why early payments are interest-heavy.',
    howSteps: [
      'Enter the total principal amount of your loan.',
      'Enter the expected annual interest rate and loan term.',
      'The calculator runs standard amortization math to show your exact monthly payment.'
    ],
    faqs: [
      ['Does this work for any loan type?', 'Yes — personal, auto, student or business loans, as long as the rate is fixed and payments are monthly.'],
      ['What if my rate is 0%?', 'The tool handles it: the payment is simply the amount divided by the number of months.'],
      ['Why is total repayment higher than the loan?', 'The difference is interest — the price of borrowing. Shorter terms cut total interest sharply.'],
    ],
  },
  related: ['mortgage-calculator', 'auto-loan-calculator', 'apr-calculator', 'credit-card-payoff-calculator'],
},
{
  slug: 'auto-loan-calculator', name: 'Auto Loan Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Car payment including sales tax, trade-in value, and dealer fees.',
  metaDescription: 'Free Auto Loan Calculator. Calculate your monthly car payments accurately by including sales tax, trade-ins, and dealer fees.',
  keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator'],
  fields: [$('price', 'Vehicle price', 30000), $('down', 'Cash down', 3000), $('trade', 'Trade-in value', 0), pctF('taxRate', 'Sales tax', 7), $('fees', 'Fees (title, doc…)', 500), pctF('rate', 'APR', 7.5), { key: 'months', label: 'Term', type: 'number', def: 60, unit: 'mo', min: 12, max: 96 }],
  content: {
    intro: 'A realistic car payment: this calculator includes sales tax, your trade-in, dealer fees, and your down payment — not just the sticker price.',
    how: 'Amount financed = price + tax + fees − down payment − trade-in, then the standard amortization formula computes the payment. Tax is applied to the price minus trade-in, the rule in most US states (a few differ — check yours).',
    howSteps: [
      'Input the sticker price of the vehicle along with expected dealer fees.',
      'Include your down payment and trade-in value to reduce the taxable amount.',
      'Enter the APR and term length to generate the accurate monthly payment schedule.'
    ],
    faqs: [
      ['Should I include the trade-in?', 'Yes — in most states the trade-in reduces the taxable amount, so it saves you tax as well as principal.'],
      ['Is a longer term better?', 'It lowers the monthly payment but raises total interest, and increases the time you owe more than the car is worth.'],
      ['What APR should I enter?', 'Use the rate from your pre-approval or lender quote. Advertised teaser rates often require top-tier credit.'],
    ],
  },
  related: ['loan-calculator', 'car-payment-calculator', 'sales-tax-calculator', 'dti-calculator'],
},
{
  slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Project how savings grow with compounding and regular contributions.',
  metaDescription: 'Calculate compound interest growth online. Free investment calculator showing how your savings multiply via regular contributions and compounding returns.',
  keywords: ['compound interest calculator', 'investment growth calculator', 'compound interest formula'],
  fields: [$('principal', 'Starting amount', 10000), pctF('rate', 'Annual rate', 7), { key: 'years', label: 'Years', type: 'number', def: 20, unit: 'yrs', min: 0, max: 100 }, { key: 'freq', label: 'Compounding', type: 'select', def: '12', options: [{ value: '1', label: 'Yearly' }, { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' }] }, $('contrib', 'Contribution per period', 200)],
  content: {
    intro: 'See the future value of a starting amount plus regular contributions, with interest compounding yearly, quarterly, monthly, or daily.',
    how: 'Future value = P(1+r/n)ⁿᵗ for the lump sum, plus PMT·((1+r/n)ⁿᵗ−1)/(r/n) for end-of-period contributions. Note the contribution is per compounding period — with monthly compounding, it is a monthly deposit.',
    howSteps: [
      'Enter your starting principal amount.',
      'Set your recurring contribution and select a compounding frequency.',
      'The engine applies exponential growth formulas to project your future value.'
    ],
    faqs: [
      ['What makes compounding powerful?', 'Interest earns interest. The growth curve is exponential, which is why starting early beats contributing more later.'],
      ['Monthly vs yearly compounding — big difference?', 'Moderate at typical rates, but it grows with time and rate. Daily vs monthly matters less than people expect.'],
      ['Is the rate guaranteed?', 'No — this is a projection. Market returns vary year to year; long-run averages are assumptions, not promises.'],
    ],
  },
  related: ['savings-calculator', 'simple-interest-calculator', 'roi-calculator', 'inflation-calculator'],
},
{
  slug: 'simple-interest-calculator', name: 'Simple Interest Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'I = P × R × T, computed instantly with the total repayment amount.',
  metaDescription: 'Calculate simple interest online safely. Find interest earned or owed quickly using the classic I = P × R × T formula.',
  keywords: ['simple interest calculator', 'simple interest formula', 'interest earned'],
  fields: [$('principal', 'Principal', 5000), pctF('rate', 'Annual rate', 6), { key: 'years', label: 'Time', type: 'number', def: 3, unit: 'yrs', min: 0, max: 100, step: 0.25 }],
  content: {
    intro: 'The classic I = PRT calculation: interest earned or owed when it does not compound.',
    how: 'Interest = Principal × annual rate × years. Unlike compound interest, the base never grows — simple interest is common for short-term loans and some bonds.',
    howSteps: [
      'Input the principal amount (the initial sum).',
      'Input the annual interest rate and timeframe.',
      'Read the calculated total interest using standard simple math.'
    ],
    faqs: [
      ['Simple vs compound — which applies to me?', 'Most savings accounts and credit cards compound. Some personal loans, car loans, and bonds use simple interest. Check your agreement.'],
      ['Can time be in months?', 'Enter fractions of a year: 18 months = 1.5 years.'],
      ['Why is my bank quote different?', 'Banks may use day-count conventions (360 vs 365 days) that shift the result slightly.'],
    ],
  },
  related: ['compound-interest-calculator', 'loan-calculator', 'savings-calculator', 'roi-calculator'],
},
{
  slug: 'savings-calculator', name: 'Savings Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'How your balance grows with monthly deposits at a given APY.',
  metaDescription: 'Calculate savings growth online. Project how your bank balance expands with monthly deposits and a high-yield APY safely in your browser.',
  keywords: ['savings calculator', 'savings goal calculator', 'high yield savings calculator'],
  fields: [$('initial', 'Starting balance', 1000), $('monthly', 'Monthly deposit', 250), pctF('apy', 'APY', 4.5), { key: 'years', label: 'Years', type: 'number', def: 10, unit: 'yrs', min: 0, max: 80 }],
  content: {
    intro: 'Project a savings balance from a starting amount plus steady monthly deposits at your account\'s APY.',
    how: 'It compounds the balance monthly and adds your deposit each month — the same future-value-of-a-series math banks use. The split between your deposits and earned interest is shown separately.',
    howSteps: [
      'Type in your starting savings balance.',
      'Enter your monthly deposit amount and your bank\'s APY.',
      'The calculator runs a monthly compound cycle to determine your final savings.'
    ],
    faqs: [
      ['What is APY vs APR?', 'APY includes compounding; APR does not. Savings accounts advertise APY, so this tool expects APY.'],
      ['Are high-yield savings rates fixed?', 'No — they float with the market. Re-run the numbers when your bank changes its rate.'],
      ['Is interest taxed?', 'In most countries savings interest is taxable income; this projection is pre-tax.'],
    ],
  },
  related: ['compound-interest-calculator', 'inflation-calculator', 'smoking-cost-calculator', 'roi-calculator'],
},
{
  slug: 'roi-calculator', name: 'ROI Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Return on investment as a percentage, plus annualized ROI.',
  metaDescription: 'Free ROI Calculator. Discover your Return on Investment percentage and annualized ROI for any financial asset or campaign securely.',
  keywords: ['roi calculator', 'return on investment calculator', 'annualized roi'],
  fields: [$('cost', 'Amount invested', 10000), $('ret', 'Amount returned', 14000), { key: 'years', label: 'Holding period (optional)', type: 'number', def: 2, unit: 'yrs', min: 0, max: 100, step: 0.25 }],
  content: {
    intro: 'Measure how an investment performed: net profit, ROI percent, and — if you enter a holding period — the annualized return for fair comparisons.',
    how: 'ROI = (returned − invested) / invested. Annualized ROI = (1 + ROI)^(1/years) − 1, which converts a multi-year gain into a per-year rate you can compare against other investments.',
    howSteps: [
      'Enter the initial cost or amount invested.',
      'Enter the final amount returned.',
      'Provide an optional holding period for the tool to compute annualized ROI alongside total ROI.'
    ],
    faqs: [
      ['Why annualize?', 'A 40% gain over 5 years is very different from 40% in 1 year. Annualizing puts both on the same per-year scale.'],
      ['Does ROI include fees and taxes?', 'Only if you include them — subtract fees from the returned amount for a true net figure.'],
      ['Can ROI be negative?', 'Yes. If the returned amount is below the cost, the tool shows a negative ROI — a loss.'],
    ],
  },
  related: ['compound-interest-calculator', 'inflation-calculator', 'savings-calculator', 'percentage-calculator'],
},
{
  slug: 'inflation-calculator', name: 'Inflation Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'What today\'s money will cost — and buy — years from now.',
  metaDescription: 'Inflation Calculator online. Track how purchasing power shrinks over time using accurate consumer price indexing mathematics.',
  keywords: ['inflation calculator', 'purchasing power calculator', 'cpi calculator'],
  fields: [$('amount', 'Amount today', 1000), pctF('rate', 'Average inflation rate', 3), { key: 'years', label: 'Years', type: 'number', def: 10, unit: 'yrs', min: 0, max: 200 }],
  content: {
    intro: 'See how inflation erodes purchasing power: what an amount today will cost in the future, and what today\'s cash will actually buy then.',
    how: 'Future cost = amount × (1 + i)ʸᵉᵃʳˢ. The default 3% approximates long-run averages in many developed economies — adjust it to model different scenarios.',
    howSteps: [
      'Enter a monetary amount.',
      'Enter the projected average inflation rate and timeframe.',
      'The calculator compounds the inflation rate to show the decreased future purchasing power.'
    ],
    faqs: [
      ['What rate should I use?', 'Long-run US CPI averages near 3%; recent years have varied widely. Try a range (2–5%) to see best and worst cases.'],
      ['Why does my savings rate matter here?', 'If your savings earn less than inflation, you are losing purchasing power even while the balance grows.'],
      ['Is this an official CPI lookup?', 'No — it is a constant-rate projection. Official CPI data varies year by year.'],
    ],
  },
  related: ['compound-interest-calculator', 'savings-calculator', 'roi-calculator', 'salary-calculator'],
},
{
  slug: 'credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'How long to clear a card balance — and the interest it will cost.',
  metaDescription: 'Credit Card Payoff Calculator. See exactly how many months and interest charges it will take to become debt-free. 100% private in-browser tool.',
  keywords: ['credit card payoff calculator', 'credit card interest calculator', 'debt free calculator'],
  fields: [$('balance', 'Card balance', 5000), pctF('apr', 'APR', 24), $('payment', 'Monthly payment', 250)],
  content: {
    intro: 'Enter your balance, APR, and monthly payment to see exactly how many months until you are debt-free and how much interest the card will collect.',
    how: 'Each month the simulator adds interest (balance × APR/12) and subtracts your payment, repeating until the balance reaches zero. If your payment doesn\'t even cover the monthly interest, it warns you the balance will never shrink.',
    howSteps: [
      'Enter your current total credit card balance.',
      'Type in your card\'s exact APR and your planned monthly payment.',
      'Review the projected payoff timeline and total interest cost.'
    ],
    faqs: [
      ['Why does paying a little more help so much?', 'Extra payment goes 100% to principal, which shrinks every future interest charge — the effect compounds in your favor.'],
      ['What is a typical card APR?', 'Often 20–30%. At those rates, minimum payments can take decades to clear a balance.'],
      ['Minimum payment vs fixed payment?', 'Minimums shrink as the balance falls, stretching payoff time enormously. A fixed payment, as modeled here, is far faster.'],
    ],
  },
  related: ['loan-calculator', 'dti-calculator', 'simple-interest-calculator', 'savings-calculator'],
},
{
  slug: 'salary-calculator', name: 'Salary Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Convert pay between hourly, weekly, monthly, and annual instantly.',
  metaDescription: 'Convert salary and wages online for free. Instantly translate hourly, weekly, monthly, and annual pay securely in your browser.',
  keywords: ['salary calculator', 'salary to hourly calculator', 'pay converter'],
  fields: [$('amount', 'Pay amount', 25), { key: 'period', label: 'Per', type: 'select', def: 'hour', options: [{ value: 'hour', label: 'Hour' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }] }, { key: 'hours', label: 'Hours per week', type: 'number', def: 40, unit: 'h', min: 1, max: 100 }, { key: 'weeks', label: 'Paid weeks per year', type: 'number', def: 52, unit: 'wk', min: 1, max: 52 }],
  content: {
    intro: 'Enter any pay figure — hourly, weekly, monthly, or annual — and see all the equivalents at once, adjusted for your real hours and paid weeks.',
    how: 'Everything converts through the annual figure: annual = hourly × hours/week × weeks/year. Part-time hours or unpaid weeks change the picture significantly, so both are adjustable.',
    howSteps: [
      'Enter your known pay amount and its period (e.g., hourly or annual).',
      'Adjust your standard working hours and paid weeks per year.',
      'The engine automatically translates your wage across all timeframes.'
    ],
    faqs: [
      ['Is this gross or net pay?', 'Gross (pre-tax). Take-home pay depends on your tax situation and deductions.'],
      ['Why 52 weeks if I get vacation?', 'Paid vacation still counts as paid weeks. Reduce the weeks only for unpaid time off.'],
      ['What about overtime?', 'Overtime varies week to week; this tool models your base schedule. Add average overtime hours to approximate it.'],
    ],
  },
  related: ['hourly-to-salary-calculator', 'tip-calculator', 'inflation-calculator', 'dti-calculator'],
},
{
  slug: 'hourly-to-salary-calculator', name: 'Hourly to Salary Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Your annual salary from an hourly wage in one step.',
  metaDescription: 'Hourly to Salary Calculator online. Find out exactly how much your hourly rate equals as an annual salary based on your working hours.',
  keywords: ['hourly to salary calculator', 'hourly to annual salary', 'wage converter'],
  fields: [$('rate', 'Hourly rate', 22), { key: 'hours', label: 'Hours per week', type: 'number', def: 40, unit: 'h', min: 1, max: 100 }, { key: 'weeks', label: 'Weeks per year', type: 'number', def: 52, unit: 'wk', min: 1, max: 52 }],
  content: {
    intro: 'Multiply out an hourly wage to its yearly equivalent — useful for comparing a contract rate against a salaried offer.',
    how: 'Annual = hourly rate × hours per week × weeks per year. At the default 40 hours and 52 weeks, a quick mental shortcut is hourly × 2,080.',
    howSteps: [
      'Enter your exact hourly rate.',
      'Define your expected hours per week and working weeks per year.',
      'Read the calculated annual salary.'
    ],
    faqs: [
      ['Quick rule of thumb?', 'Double the hourly rate and add three zeros: $25/h ≈ $50,000/yr (at 40h/52wk it is $52,000 exactly).'],
      ['Contractor vs employee comparison?', 'Contractors usually need a higher hourly rate to match a salary, since they cover benefits, taxes, and unpaid time themselves.'],
      ['Does it handle part-time?', 'Yes — set your real weekly hours and paid weeks.'],
    ],
  },
  related: ['salary-calculator', 'tip-calculator', 'roi-calculator', 'inflation-calculator'],
},
{
  slug: 'tip-calculator', name: 'Tip Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Tip amount, total bill, and per-person split in one tap.',
  metaDescription: 'Free online Tip Calculator. Calculate restaurant tips, full totals, and easily split the bill among your group without doing math in your head.',
  keywords: ['tip calculator', 'tip and split calculator', 'restaurant bill calculator'],
  fields: [$('bill', 'Bill amount', 86.4), pctF('tip', 'Tip', 18), { key: 'people', label: 'Split between', type: 'number', def: 2, unit: 'ppl', min: 1, max: 100 }],
  content: {
    intro: 'Work out the tip, the grand total, and exactly what each person owes when splitting the bill.',
    how: 'Tip = bill × tip%; the total is split evenly across the group. Adjust the percentage for service quality or local custom.',
    howSteps: [
      'Enter the pre-tax or total bill amount.',
      'Input the percentage you wish to tip.',
      'Indicate how many people are splitting the bill to see exact per-person costs.'
    ],
    faqs: [
      ['What is a standard tip in the US?', 'Commonly 15–20% for table service; 18% is a typical default. Customs differ widely by country.'],
      ['Tip on pre-tax or post-tax?', 'Convention varies; tipping on the pre-tax amount is traditional, on the total is simpler. Enter whichever amount you prefer.'],
      ['Uneven split?', 'This tool splits evenly. For itemized splitting, total each person\'s items separately.'],
      ['Should I tip before or after tax?', 'Tipping on the pre-tax subtotal is the standard practice in most places. This calculator uses the bill amount you enter, so enter the pre-tax total if you prefer.'],
    ],
  },
  related: ['sales-tax-calculator', 'percentage-calculator', 'salary-calculator', 'loan-calculator'],
},
{
  slug: 'dti-calculator', name: 'Debt-to-Income (DTI) Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Front-end and back-end DTI — the ratios lenders actually check.',
  metaDescription: 'Calculate your Debt-to-Income (DTI) ratio online. Check your front-end and back-end DTI to see what mortgage lenders see. Completely private.',
  keywords: ['dti calculator', 'debt to income ratio calculator', 'mortgage dti'],
  fields: [$('income', 'Gross monthly income', 6500), $('housing', 'Monthly housing payment', 1800), $('debts', 'Other monthly debt payments', 450)],
  content: {
    intro: 'Before applying for a mortgage or loan, check the two ratios underwriters compute first: housing-only (front-end) and all-debts (back-end) DTI.',
    how: 'Front-end DTI = housing ÷ gross income. Back-end DTI = (housing + other debts) ÷ gross income. Conventional guidelines favor back-end ratios at or below 36%, with 43% a common ceiling for qualified mortgages.',
    howSteps: [
      'Enter your gross monthly income.',
      'Input your current or expected monthly housing payment.',
      'Enter any other minimum debt payments (credit cards, loans) to evaluate your ratios.'
    ],
    faqs: [
      ['What counts as debt here?', 'Required monthly payments: loans, card minimums, leases, support obligations. Utilities and groceries don\'t count.'],
      ['Gross or net income?', 'Gross (pre-tax) — that is what lenders use.'],
      ['How do I lower my DTI?', 'Pay down balances to cut required payments, avoid new debt before applying, or document additional income.'],
      ['Does DTI affect my credit score?', 'DTI itself is not on your credit report, but lenders check it manually during underwriting. A high DTI can lead to denial even if your credit score is excellent.'],
    ],
  },
  related: ['mortgage-calculator', 'credit-card-payoff-calculator', 'loan-calculator', 'down-payment-calculator'],
},
{
  slug: 'down-payment-calculator', name: 'Down Payment Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Down payment amount, resulting loan size, and your LTV at a glance.',
  metaDescription: 'Calculate your mortgage down payment online. See loan-to-value (LTV) ratios and exact dollar amounts instantly before buying a home.',
  keywords: ['down payment calculator', 'down payment percentage', 'house deposit calculator'],
  fields: [$('price', 'Home price', 400000), pctF('percent', 'Down payment', 20)],
  content: {
    intro: 'Translate a down-payment percentage into dollars, see the loan you would need, and check whether you clear the 80% LTV line that avoids PMI.',
    how: 'Down payment = price × percent. LTV = loan ÷ price. Above 80% LTV, conventional loans generally require private mortgage insurance until equity grows.',
    howSteps: [
      'Enter the target home price.',
      'Provide your down payment as a percentage.',
      'Review your exact deposit amount and resulting LTV ratio.'
    ],
    faqs: [
      ['Is 20% down required?', 'No — many programs allow far less (FHA from 3.5%, some conventional from 3%) — but below 20% usually means paying PMI.'],
      ['What does PMI cost?', 'Commonly around 0.3–1.5% of the loan per year, depending on credit and LTV, added to your monthly payment.'],
      ['Should I put more down?', 'More down means smaller payments and less interest, but weigh it against keeping an emergency fund.'],
    ],
  },
  related: ['mortgage-calculator', 'dti-calculator', 'loan-calculator', 'percentage-calculator'],
},
{
  slug: 'sales-tax-calculator', name: 'Sales Tax Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Add tax to a price — or extract the pre-tax price from a total.',
  metaDescription: 'Sales Tax Calculator online. Easily add sales tax to a price or extract it from a total receipt. Perfect for quick bookkeeping.',
  keywords: ['sales tax calculator', 'tax calculator', 'reverse sales tax'],
  fields: [$('amount', 'Amount', 100), pctF('rate', 'Tax rate', 8.25), { key: 'mode', label: 'Direction', type: 'select', def: 'add', options: [{ value: 'add', label: 'Add tax to price' }, { value: 'extract', label: 'Extract tax from total' }] }],
  content: {
    intro: 'Two-way sales tax math: add tax to a sticker price, or work backwards from a receipt total to the pre-tax price.',
    how: 'Adding: total = price × (1 + rate). Extracting: pre-tax = total ÷ (1 + rate) — the reverse operation, useful for expense reports and bookkeeping.',
    howSteps: [
      'Select your calculation direction (Add tax or Extract tax).',
      'Input the price or receipt total.',
      'Enter the tax rate percentage to complete the calculation.'
    ],
    faqs: [
      ['Why does reverse tax matter?', 'Receipts show totals. To book the expense and the tax separately, you need the pre-tax figure — dividing, not subtracting a percentage.'],
      ['Do US states have one rate?', 'No — state, county, and city rates stack. Enter the combined rate for your location.'],
      ['Is this VAT-compatible?', 'Yes, the math is identical for VAT and GST systems.'],
    ],
  },
  related: ['tip-calculator', 'percentage-calculator', 'auto-loan-calculator', 'salary-calculator'],
},
{
  slug: 'refinance-calculator', name: 'Refinance Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Should you refinance? See the new payment, savings, and break-even point.',
  metaDescription: 'Free online Refinance Calculator. Compare your current mortgage against new rates to see if refinancing will save you money and compute your break-even point.',
  keywords: ['refinance calculator', 'mortgage refinance calculator', 'refinance savings', 'break even mortgage'],
  fields: [$('balance', 'Current loan balance', 280000), pctF('curRate', 'Current rate', 7.2), { key: 'remYears', label: 'Years remaining', type: 'number', def: 27, unit: 'yrs', min: 1, max: 50 }, pctF('newRate', 'New rate', 6.0), { key: 'newYears', label: 'New term', type: 'number', def: 30, unit: 'yrs', min: 1, max: 50 }, $('costs', 'Closing costs', 4000)],
  content: {
    intro: 'Compare your current loan against a new one to see the monthly savings and exactly how many months it takes to recoup the closing costs — the break-even that decides whether refinancing is worth it.',
    how: 'The tool amortizes both loans and subtracts the payments. Break-even = closing costs / monthly savings. If you sell or refinance again before break-even, the refi loses money even at a lower rate.',
    howSteps: [
      'Enter details of your current mortgage balance, rate, and remaining years.',
      'Enter the proposed new rate, term, and expected closing costs.',
      'The engine amortizes both scenarios to pinpoint your exact break-even month.'
    ],
    faqs: [
      ['What is the break-even point?', 'The month when accumulated savings finally cover the closing costs. Past it you are ahead; before it you have lost money on the deal.'],
      ['Does a lower rate always save money?', 'Not necessarily — resetting a 27-year loan to a fresh 30 years can raise total interest even at a lower rate. Watch the lifetime figure.'],
      ['What closing costs should I expect?', 'Typically 2 to 5 percent of the loan: appraisal, title, origination, and recording fees.'],
    ],
  },
  related: ['mortgage-calculator', 'amortization-calculator', 'dti-calculator', 'loan-calculator'],
},
{
  slug: 'amortization-calculator', name: 'Amortization Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Monthly payment plus how each year splits between principal and interest.',
  metaDescription: 'Calculate full loan amortization schedules online safely. Break down monthly payments to see exactly how much goes to principal versus interest.',
  keywords: ['amortization calculator', 'amortization schedule', 'loan amortization'],
  fields: [$('amount', 'Loan amount', 250000), pctF('rate', 'Interest rate', 6.5), { key: 'years', label: 'Term', type: 'number', def: 30, unit: 'yrs', min: 0.5, max: 50 }],
  content: {
    intro: 'See your monthly payment and how an amortized loan shifts from mostly-interest to mostly-principal over time, including the year-one split that surprises most borrowers.',
    how: 'Each payment is fixed, but its makeup changes: interest = current balance x monthly rate, and the rest reduces principal. Early on the balance is large, so most of the payment is interest.',
    howSteps: [
      'Enter the total principal of the loan.',
      'Provide the interest rate and the length of the loan.',
      'Review the generated schedule showing your principal/interest split evolving over time.'
    ],
    faqs: [
      ['Why is year one almost all interest?', 'Interest is charged on the outstanding balance, which is highest at the start. As principal falls, the interest share shrinks every month.'],
      ['How do extra payments help?', 'Extra money goes straight to principal, shrinking every future interest charge — the savings compound over the life of the loan.'],
      ['Is the monthly payment really fixed?', 'On a fixed-rate loan, yes. Only the internal principal and interest split changes month to month.'],
    ],
  },
  related: ['mortgage-calculator', 'loan-calculator', 'refinance-calculator', 'compound-interest-calculator'],
},
{
  slug: '401k-calculator', name: '401(k) Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Project your 401(k) balance, including the full employer match.',
  metaDescription: 'Free online 401(k) Calculator. Project your retirement savings over time by factoring in employer matches, returns, and raises entirely in your browser.',
  keywords: ['401k calculator', '401k growth calculator', 'employer match'],
  fields: [$('salary', 'Annual salary', 75000), pctF('contribPct', 'Your contribution', 10), pctF('matchPct', 'Employer match rate', 50), pctF('matchCap', 'Match cap (% of salary)', 6), $('balance', 'Current 401(k) balance', 20000), pctF('return', 'Expected annual return', 7), { key: 'years', label: 'Years to retirement', type: 'number', def: 30, unit: 'yrs', min: 1, max: 60 }, pctF('raise', 'Annual raise', 2)],
  content: {
    intro: 'Project your 401(k) at retirement from your contribution rate, your employer match, expected returns, and annual raises, and see how much free money the match adds.',
    how: 'Each year your contribution plus the employer match (match rate up to the cap) are added and grown by the expected return; salary increases by your raise. The match is the highest-return part of any retirement plan.',
    howSteps: [
      'Provide your salary and your personal contribution percentage.',
      'Enter your company\'s match rate and cap to maximize free money projections.',
      'Adjust return expectations and timeline to view your future projected balance.'
    ],
    faqs: [
      ['What is a typical employer match?', 'A common formula is 50 percent of contributions up to 6 percent of salary. Always contribute at least to the cap or you leave free money behind.'],
      ['Is the return guaranteed?', 'No, it is an assumption. Historical stock averages are often cited near 7 percent after inflation, but real returns vary widely.'],
      ['What about contribution limits?', 'The IRS caps annual 401(k) contributions and adjusts the limit yearly; check the current figure before maxing out.'],
    ],
  },
  related: ['retirement-calculator', 'roth-ira-calculator', 'compound-interest-calculator', 'investment-calculator'],
},
{
  slug: 'retirement-calculator', name: 'Retirement Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Will your savings last? Projected nest egg and the income it supports.',
  metaDescription: 'Calculate if your retirement savings will last. Free online retirement calculator projecting your nest egg and a safe withdrawal rate.',
  keywords: ['retirement calculator', 'retirement savings calculator', 'will my money last'],
  fields: [{ key: 'age', label: 'Current age', type: 'number', def: 35, unit: 'yrs', min: 18, max: 90 }, { key: 'retAge', label: 'Retirement age', type: 'number', def: 65, unit: 'yrs', min: 40, max: 90 }, $('savings', 'Current savings', 50000), $('monthly', 'Monthly contribution', 800), pctF('return', 'Expected annual return', 7)],
  content: {
    intro: 'Estimate the nest egg you will have at retirement and the yearly income it can safely provide using the well-known 4 percent guideline.',
    how: 'Your balance compounds monthly with your contributions added each month until retirement. The 4 percent rule then estimates a sustainable annual withdrawal, a rough planning benchmark, not a guarantee.',
    howSteps: [
      'Input your current age and planned retirement age.',
      'Enter your current savings and ongoing monthly contributions.',
      'Review the projected safe-withdrawal-rate income the calculator determines.'
    ],
    faqs: [
      ['What is the 4% rule?', 'A guideline that withdrawing about 4 percent of your starting balance per year (adjusted for inflation) has historically lasted around 30 years. It is a starting point, not a promise.'],
      ['Does this account for inflation?', 'Returns here are nominal. For a real-terms view, enter an inflation-adjusted return (expected return minus inflation).'],
      ['How much should I save?', 'More is better, but consistency and starting early matter most; compounding rewards time above all.'],
    ],
  },
  related: ['401k-calculator', 'roth-ira-calculator', 'compound-interest-calculator', 'inflation-calculator'],
},
{
  slug: 'roth-ira-calculator', name: 'Roth IRA Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Project tax-free Roth IRA growth to retirement.',
  metaDescription: 'Free Roth IRA Calculator. Project your tax-free retirement growth securely online based on your age and contributions.',
  keywords: ['roth ira calculator', 'roth ira growth', 'tax free retirement'],
  fields: [{ key: 'age', label: 'Current age', type: 'number', def: 30, unit: 'yrs', min: 18, max: 90 }, { key: 'retAge', label: 'Retirement age', type: 'number', def: 65, unit: 'yrs', min: 40, max: 90 }, $('balance', 'Current balance', 5000), $('annual', 'Annual contribution', 7000), pctF('return', 'Expected annual return', 7)],
  content: {
    intro: 'See how a Roth IRA grows when every dollar of qualified withdrawal in retirement is tax-free, the defining advantage of the Roth.',
    how: 'Contributions are made with after-tax money and compound at your expected return. Because you already paid tax going in, qualified withdrawals (age 59 and a half plus, account 5 plus years) come out tax-free.',
    howSteps: [
      'Type your current age and target retirement age.',
      'Input your current balance and planned annual contributions.',
      'See your projected tax-free growth output based on expected returns.'
    ],
    faqs: [
      ['Roth vs Traditional IRA?', 'Roth: pay tax now, withdraw tax-free later, best if you expect higher future tax rates. Traditional defers tax until withdrawal.'],
      ['What are the contribution limits?', 'The IRS sets an annual limit (higher if you are 50 plus) and phases eligibility out at higher incomes. Check the current year figures.'],
      ['Can I withdraw contributions early?', 'Your own contributions (not earnings) can generally be withdrawn anytime tax and penalty-free, a Roth flexibility perk.'],
    ],
  },
  related: ['401k-calculator', 'retirement-calculator', 'compound-interest-calculator', 'investment-calculator'],
},
{
  slug: 'investment-calculator', name: 'Investment Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Future value of a lump sum plus regular contributions.',
  metaDescription: 'Investment calculator for stocks and assets. Free tool to calculate future values based on initial lump sums and periodic contributions.',
  keywords: ['investment calculator', 'investment return calculator', 'future value'],
  fields: [$('principal', 'Initial investment', 10000), $('contrib', 'Contribution per period', 500), { key: 'freq', label: 'Contributions per year', type: 'select', def: '12', options: [{ value: '12', label: 'Monthly' }, { value: '4', label: 'Quarterly' }, { value: '1', label: 'Yearly' }] }, pctF('return', 'Expected annual return', 8), { key: 'years', label: 'Years', type: 'number', def: 20, unit: 'yrs', min: 0, max: 100 }],
  content: {
    intro: 'Project the future value of an investment combining an upfront amount with steady contributions, and see how much of the result is growth versus what you put in.',
    how: 'The lump sum compounds at your expected return while each contribution compounds from the period it is added, the future-value-of-a-series calculation used across finance.',
    howSteps: [
      'Provide your starting lump sum investment.',
      'Select a contribution schedule (monthly, quarterly, yearly).',
      'Enter an expected rate of return to run the projection calculation.'
    ],
    faqs: [
      ['What return should I assume?', 'Broad stock-market averages are often modeled near 7 to 10 percent before inflation, but past performance does not guarantee future results.'],
      ['Lump sum or regular investing?', 'This models both together. Regular investing (dollar-cost averaging) smooths out market-timing risk.'],
      ['Are taxes included?', 'No, this is a pre-tax projection. Tax-advantaged accounts (401k, IRA) change the after-tax picture.'],
    ],
  },
  related: ['compound-interest-calculator', 'roi-calculator', 'retirement-calculator', '401k-calculator'],
},
{
  slug: 'debt-snowball-calculator', name: 'Debt Snowball Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'A payoff plan and debt-free date, snowball or avalanche.',
  metaDescription: 'Debt Snowball Calculator online. Compare the Debt Snowball and Debt Avalanche methods for free to find your exact debt-free date securely.',
  keywords: ['debt snowball calculator', 'debt payoff calculator', 'debt avalanche', 'pay off debt'],
  fields: [{ key: 'debts', label: 'One debt per line: balance, APR%, min payment', type: 'text', def: '5000, 22, 150\n12000, 6.5, 200\n3000, 28, 90' }, $('extra', 'Extra monthly payment', 300), { key: 'method', label: 'Method', type: 'select', def: 'snowball', options: [{ value: 'snowball', label: 'Snowball (smallest balance first)' }, { value: 'avalanche', label: 'Avalanche (highest rate first)' }] }],
  content: {
    intro: 'Enter your debts and a monthly extra payment to get a clear debt-free date and total interest, comparing the motivational snowball method against the math-optimal avalanche.',
    how: 'Every debt gets its minimum each month; the extra payment plus any freed-up minimums roll onto the target debt. Snowball targets the smallest balance first (quick wins); avalanche targets the highest rate first (least interest).',
    howSteps: [
      'List your debts line-by-line (Balance, APR, Minimum Payment).',
      'Enter how much extra cash you can put towards debt monthly.',
      'Toggle between Snowball and Avalanche to see which method clears you faster.'
    ],
    faqs: [
      ['Snowball or avalanche, which is better?', 'Avalanche saves the most interest mathematically. Snowball gives faster psychological wins, which helps many people actually finish.'],
      ['What is the rolling effect?', 'When one debt is cleared, its payment is added to the next debt; the freed-up money snowballs, accelerating each payoff.'],
      ['Does it count new debt?', 'No, it assumes you stop adding debt. New balances reset the plan.'],
    ],
  },
  related: ['credit-card-payoff-calculator', 'loan-calculator', 'dti-calculator', 'simple-interest-calculator'],
},
{
  slug: 'car-lease-calculator', name: 'Car Lease Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Monthly lease payment from price, residual, and money factor.',
  metaDescription: 'Calculate car lease payments safely online. Demystify auto leases by factoring MSRP, negotiated price, and the money factor completely privately.',
  keywords: ['car lease calculator', 'lease payment calculator', 'auto lease calculator'],
  fields: [$('msrp', 'MSRP (sticker price)', 35000), $('price', 'Negotiated price', 32000), pctF('residual', 'Residual value (% of MSRP)', 55), { key: 'mf', label: 'Money factor', type: 'number', def: 0.00125, min: 0, max: 0.01, step: 0.00001 }, { key: 'term', label: 'Lease term', type: 'number', def: 36, unit: 'mo', min: 12, max: 60 }, $('down', 'Down payment', 2000), pctF('tax', 'Sales tax', 8)],
  content: {
    intro: 'Calculate a monthly lease payment from its real components, depreciation and finance charge, using the negotiated price, residual value, and money factor.',
    how: 'Depreciation = (capitalized cost - residual) / term. Finance charge = (cap cost + residual) x money factor. The payment is their sum plus tax. Multiply the money factor by 2400 to see its APR equivalent.',
    howSteps: [
      'Enter the MSRP and your negotiated sale price.',
      'Input the leasing company\'s residual value and money factor.',
      'The calculator combines depreciation and finance charges to reveal your true monthly cost.'
    ],
    faqs: [
      ['What is a money factor?', 'The lease equivalent of an interest rate. Multiply by 2400 to convert: 0.00125 x 2400 = 3 percent APR.'],
      ['What is residual value?', 'The car predicted worth at lease end, set by the leasing company. A higher residual means less depreciation to pay for, a lower payment.'],
      ['Should I put money down on a lease?', 'Often not recommended; a down payment is lost if the car is totaled early. Many advisors prefer rolling it into the payment.'],
    ],
  },
  related: ['auto-loan-calculator', 'sales-tax-calculator', 'loan-calculator', 'dti-calculator'],
},
{
  slug: 'budget-calculator', name: 'Budget Calculator (50/30/20)', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Split your income into needs, wants, and savings with the 50/30/20 rule.',
  metaDescription: 'Free 50/30/20 Budget Calculator online. Quickly split your take-home pay into Needs, Wants, and Savings using this simple, private tool.',
  keywords: ['budget calculator', '50 30 20 budget', 'monthly budget calculator', 'personal finance planner'],
  fields: [$('income', 'Monthly after-tax income', 5000)],
  content: {
    intro: 'Turn your monthly take-home pay into a simple, balanced budget using the popular 50/30/20 framework — half to needs, a third to wants, and the rest to savings and debt.',
    how: 'The rule allocates 50 percent of after-tax income to needs (housing, food, utilities), 30 percent to wants, and 20 percent to savings and extra debt payments. It is a starting template you can adjust to your costs.',
    howSteps: [
      'Enter your monthly take-home (after-tax) pay.',
      'The engine automatically splits your income three ways.',
      'Review your target allocation for Needs, Wants, and Savings/Debt.'
    ],
    faqs: [
      ['What counts as a need versus a want?', 'Needs are essentials you cannot skip — rent, groceries, minimum debt payments. Wants are discretionary — dining out, subscriptions, travel.'],
      ['Is 50/30/20 right for everyone?', 'It is a guideline, not a law. High-cost-of-living areas often need a larger needs share; aggressive savers shrink wants.'],
      ['Should I budget gross or net income?', 'Use after-tax (take-home) income, since that is what actually lands in your account.'],
    ],
  },
  related: ['salary-calculator', 'debt-snowball-calculator', 'net-worth-calculator', 'dti-calculator'],
},
{
  slug: 'car-payment-calculator', name: 'Car Payment Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Find the vehicle price a target monthly payment can afford.',
  metaDescription: 'Car Payment Affordability Calculator. Start with a monthly payment you want and find out exactly what vehicle price you can afford.',
  keywords: ['car payment calculator', 'car affordability calculator', 'auto finance calculator'],
  fields: [$('payment', 'Target monthly payment', 450), pctF('rate', 'Interest rate (APR)', 7), { key: 'months', label: 'Loan term', type: 'number', def: 60, unit: 'mo', min: 12, max: 96 }, $('down', 'Down payment', 3000)],
  content: {
    intro: 'Work backward from the monthly payment you are comfortable with to see the total vehicle price you can afford, including your down payment.',
    how: 'The tool reverses the loan formula: given a payment, rate, and term, it solves for the financed principal, then adds your down payment to get the affordable sticker price.',
    howSteps: [
      'Input the monthly car payment you are comfortable making.',
      'Enter expected loan terms (APR and months).',
      'The calculator reverses the math to give you the maximum car price you should shop for.'
    ],
    faqs: [
      ['Why start from the payment?', 'Most buyers budget by monthly payment. Solving for price keeps you from overspending on the sticker.'],
      ['Does this include taxes and fees?', 'No — sales tax, registration, and dealer fees are extra. Leave room in your budget for them.'],
      ['How does the term affect affordability?', 'A longer term lowers the payment but raises total interest, so you pay more for the same car overall.'],
    ],
  },
  related: ['auto-loan-calculator', 'car-lease-calculator', 'loan-calculator', 'sales-tax-calculator'],
},
{
  slug: 'apr-calculator', name: 'APR Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Find the true APR of a loan once fees are included.',
  metaDescription: 'True APR Calculator online. Calculate the actual Annual Percentage Rate of a loan by factoring in hidden upfront fees safely in your browser.',
  keywords: ['apr calculator', 'true apr calculator', 'annual percentage rate'],
  fields: [$('amount', 'Loan amount', 20000), pctF('rate', 'Nominal interest rate', 6), { key: 'months', label: 'Term', type: 'number', def: 48, unit: 'mo', min: 1, max: 480 }, $('fees', 'Upfront fees', 600)],
  content: {
    intro: 'See a loan\'s real annual cost — the APR — after upfront fees are folded in, which is almost always higher than the advertised interest rate.',
    how: 'The monthly payment is computed from the nominal rate, but the fees reduce the cash you actually receive. The tool solves for the rate that equates those payments to the net amount, giving the true APR.',
    howSteps: [
      'Enter the loan amount and the advertised interest rate.',
      'Provide the upfront fees charged by the lender.',
      'The engine finds the rate that matches the net disbursement to reveal your true APR.'
    ],
    faqs: [
      ['APR vs interest rate?', 'The interest rate is the cost of borrowing the principal; APR adds fees to reflect the true yearly cost. Lenders must disclose APR.'],
      ['Why is APR higher than the rate?', 'Because upfront fees mean you receive less money but still repay as if you borrowed the full amount.'],
      ['Is a lower APR always better?', 'Usually, when comparing similar loans — APR captures both rate and fees in one number.'],
    ],
  },
  related: ['loan-calculator', 'auto-loan-calculator', 'mortgage-calculator', 'refinance-calculator'],
},
{
  slug: 'discount-calculator', name: 'Discount Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Final sale price and savings, including stacked discounts.',
  metaDescription: 'Free online Discount Calculator. Calculate final sale prices securely. Supports percentage off and stacked coupons perfectly for shopping.',
  keywords: ['discount calculator', 'percent off calculator', 'sale price calculator'],
  fields: [$('price', 'Original price', 80), pctF('percent', 'Discount', 25), pctF('extra', 'Extra discount (optional)', 0)],
  content: {
    intro: 'Find the final price after a discount and exactly how much you save, with support for a second stacked discount like a coupon applied on top of a sale.',
    how: 'The first discount comes off the original price; any extra discount applies to that already-reduced amount, not the original — which is why stacked percentages never simply add up.',
    howSteps: [
      'Enter the original retail price.',
      'Provide the primary discount percentage.',
      'Add an extra stacked discount (if applicable) to see your final cost and total saved.'
    ],
    faqs: [
      ['Do two discounts just add together?', 'No. A 25 percent sale plus an extra 10 percent is not 35 percent off — the 10 percent comes off the reduced price, giving about 32.5 percent total.'],
      ['How do I find the percent saved?', 'Divide the amount saved by the original price. The tool shows this as the total discount figure.'],
      ['Is tax included?', 'No — this calculates the pre-tax price. Add sales tax separately with the Sales Tax Calculator.'],
    ],
  },
  related: ['sales-tax-calculator', 'tip-calculator', 'percentage-calculator', 'budget-calculator'],
},
{
  slug: 'net-worth-calculator', name: 'Net Worth Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Add up assets and subtract liabilities to find your net worth.',
  metaDescription: 'Calculate your Net Worth online safely. An entirely private calculator tracking your assets and liabilities to show your true financial position.',
  keywords: ['net worth calculator', 'net worth tracker', 'assets and liabilities'],
  fields: [$('cash', 'Cash & savings', 15000), $('investments', 'Investments & retirement', 60000), $('property', 'Property & vehicles', 250000), $('other', 'Other assets', 5000), $('mortgage', 'Mortgage balance', 180000), $('loans', 'Loans (auto, student)', 25000), $('creditCards', 'Credit card debt', 4000)],
  content: {
    intro: 'Calculate your net worth — everything you own minus everything you owe — the single clearest snapshot of your financial position.',
    how: 'Net worth = total assets - total liabilities. Track it over time; a rising number means you are building wealth, regardless of income.',
    howSteps: [
      'Fill out the values of your current assets (cash, property, investments).',
      'Fill out the values of your liabilities (mortgages, loans, debts).',
      'The calculator subtracts liabilities from assets to display your net worth.'
    ],
    faqs: [
      ['What counts as an asset?', 'Anything with cash value you own: bank balances, investments, property, vehicles, and valuables.'],
      ['Should I include my home?', 'Yes — list its market value as an asset and the mortgage as a liability. The difference is your home equity.'],
      ['Is negative net worth bad?', 'Common early in life (student loans, mortgages). What matters is the trend over time.'],
    ],
  },
  related: ['budget-calculator', 'debt-snowball-calculator', 'retirement-calculator', 'savings-calculator'],
},
{
  slug: 'mortgage-payoff-calculator', name: 'Mortgage Payoff Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'See how extra payments cut years and interest off your mortgage.',
  metaDescription: 'Mortgage Payoff Calculator online. Calculate how much time and interest you save by making extra principal payments on your home loan.',
  keywords: ['mortgage payoff calculator', 'extra mortgage payment calculator', 'pay off mortgage early'],
  fields: [$('balance', 'Current balance', 250000), pctF('rate', 'Interest rate', 6.5), { key: 'years', label: 'Years remaining', type: 'number', def: 28, unit: 'yrs', min: 0.5, max: 50 }, $('extra', 'Extra monthly payment', 200)],
  content: {
    intro: 'Discover how adding a little extra to each mortgage payment can shave years off your loan and save tens of thousands in interest.',
    how: 'The tool simulates your payoff month by month, applying the extra amount entirely to principal. Because interest is charged on the remaining balance, every extra dollar compounds into future savings.',
    howSteps: [
      'Enter the current details of your mortgage.',
      'Specify the extra principal payment you intend to make monthly.',
      'The calculator demonstrates the exact interest saved and years shaved off your loan.'
    ],
    faqs: [
      ['Why do small extra payments help so much?', 'Extra money goes straight to principal, which reduces every future interest charge — the effect snowballs over decades.'],
      ['Is paying off early always smart?', 'Compare your mortgage rate to other returns. If investments reliably beat your rate, investing may win — but guaranteed interest savings are appealing too.'],
      ['Should I tell my lender it is extra principal?', 'Yes — specify that additional payments apply to principal, or some lenders credit them to future interest instead.'],
    ],
  },
  related: ['mortgage-calculator', 'amortization-calculator', 'refinance-calculator', 'loan-calculator'],
},
{
  slug: 'cd-calculator', name: 'CD Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Maturity value and APY for a certificate of deposit.',
  metaDescription: 'Free online CD Calculator. Project the maturity value and effective APY for a Certificate of Deposit safely in your browser.',
  keywords: ['cd calculator', 'certificate of deposit calculator', 'cd interest calculator'],
  fields: [$('principal', 'Deposit amount', 10000), pctF('rate', 'Interest rate', 4.5), { key: 'years', label: 'Term', type: 'number', def: 2, unit: 'yrs', min: 0, max: 30 }, { key: 'freq', label: 'Compounding', type: 'select', def: '12', options: [{ value: '365', label: 'Daily' }, { value: '12', label: 'Monthly' }, { value: '4', label: 'Quarterly' }, { value: '1', label: 'Annually' }] }],
  content: {
    intro: 'Calculate what a certificate of deposit will be worth at maturity, including the effective annual yield (APY) once compounding is taken into account.',
    how: 'The deposit compounds at the stated rate and frequency. APY expresses the true yearly return including compounding, which is always slightly higher than the nominal rate.',
    howSteps: [
      'Enter your initial CD deposit amount.',
      'Set the interest rate and term.',
      'Review the projected end-of-term payout and compound growth.'
    ],
    faqs: [
      ['Rate vs APY?', 'The rate is the nominal interest; APY includes compounding and is the real return. Compare CDs by APY.'],
      ['What if I withdraw early?', 'CDs usually charge an early-withdrawal penalty, often several months of interest. This tool assumes you hold to maturity.'],
      ['Are CDs safe?', 'In the US, bank CDs are FDIC-insured up to limits, making them very low risk.'],
    ],
  },
  related: ['savings-calculator', 'compound-interest-calculator', 'future-value-calculator', 'investment-calculator'],
},
{
  slug: 'future-value-calculator', name: 'Future Value Calculator', prio: 'P3', category: 'finance', widget: 'calc',
  short: 'What a sum today will grow to at a given rate.',
  metaDescription: 'Calculate the Future Value (FV) of an asset online. Project what a sum today will be worth at a specific growth rate securely.',
  keywords: ['future value calculator', 'fv calculator', 'time value of money'],
  fields: [$('present', 'Present amount', 10000), pctF('rate', 'Annual growth rate', 7), { key: 'years', label: 'Years', type: 'number', def: 20, unit: 'yrs', min: 0, max: 100 }],
  content: {
    intro: 'Find the future value of a lump sum — how much an amount today will be worth after growing at a steady annual rate.',
    how: 'Future value = present value x (1 + rate)^years. It is the core of compound growth: time and rate together drive the result.',
    howSteps: [
      'Input the present value of the asset.',
      'Define the expected annual growth rate.',
      'The engine uses the FV formula to determine the valuation at your set future year.'
    ],
    faqs: [
      ['What is future value used for?', 'Projecting investments, comparing offers, and understanding the long-term effect of a growth rate.'],
      ['Does it account for inflation?', 'No — it shows nominal value. Subtract expected inflation from the rate for real (purchasing-power) value.'],
      ['How is this different from present value?', 'Future value grows a number forward; present value discounts a future number back to today.'],
    ],
  },
  related: ['present-value-calculator', 'compound-interest-calculator', 'investment-calculator', 'cd-calculator'],
},
{
  slug: 'present-value-calculator', name: 'Present Value Calculator', prio: 'P3', category: 'finance', widget: 'calc',
  short: 'What a future sum is worth in today\'s money.',
  metaDescription: 'Free online Present Value Calculator. Discount future cash amounts to today\'s valuation instantly based on your required return rate.',
  keywords: ['present value calculator', 'pv calculator', 'discounted cash flow'],
  fields: [$('future', 'Future amount', 50000), pctF('rate', 'Discount rate', 7), { key: 'years', label: 'Years from now', type: 'number', def: 10, unit: 'yrs', min: 0, max: 100 }],
  content: {
    intro: 'Calculate present value — how much a future amount of money is worth today, given a discount rate. The foundation of investment and finance decisions.',
    how: 'Present value = future value / (1 + rate)^years. The discount rate reflects the return you could earn elsewhere, so future money is worth less today.',
    howSteps: [
      'Enter the future monetary value.',
      'Set the required discount rate (your opportunity cost).',
      'The calculator reverses compound growth to show what that cash is worth right now.'
    ],
    faqs: [
      ['Why is future money worth less?', 'Because money today can be invested to grow. A dollar in ten years is worth less than a dollar now.'],
      ['What discount rate should I use?', 'Often your expected investment return or cost of capital. A higher rate discounts future money more steeply.'],
      ['Where is present value used?', 'Valuing investments, comparing a lump sum against installments, and capital budgeting.'],
    ],
  },
  related: ['future-value-calculator', 'annuity-calculator', 'investment-calculator', 'roi-calculator'],
},
{
  slug: 'annuity-calculator', name: 'Annuity Calculator', prio: 'P3', category: 'finance', widget: 'calc',
  short: 'Present and future value of a stream of regular payments.',
  metaDescription: 'Calculate annuity values online. Determine both the present and future value of regular periodic payments like pensions or loans safely.',
  keywords: ['annuity calculator', 'annuity payment calculator', 'present value of annuity'],
  fields: [$('payment', 'Payment per month', 500), pctF('rate', 'Annual interest rate', 5), { key: 'years', label: 'Years', type: 'number', def: 20, unit: 'yrs', min: 0, max: 100 }],
  content: {
    intro: 'Calculate both the future and present value of an annuity — a series of equal payments made at regular intervals, such as pension contributions or loan payments.',
    how: 'Future value sums each payment compounded to the end; present value discounts each payment back to today. Both use the standard annuity formulas with monthly compounding.',
    howSteps: [
      'Enter the regular monthly payment amount.',
      'Specify the interest rate and length of the annuity stream.',
      'Read the calculated Present Value and Future Value of the annuity contract.'
    ],
    faqs: [
      ['What is an annuity?', 'A sequence of equal periodic payments. Examples include rent, pension payouts, and loan installments.'],
      ['Present vs future value of an annuity?', 'Present value is what the whole stream is worth today; future value is what it accumulates to at the end.'],
      ['Is this an insurance annuity?', 'This computes the time-value math. Insurance annuity products add fees and guarantees beyond this calculation.'],
    ],
  },
  related: ['present-value-calculator', 'future-value-calculator', 'retirement-calculator', 'investment-calculator'],
},
{
  slug: 'break-even-calculator', name: 'Break-Even Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Units and revenue needed to cover your costs.',
  metaDescription: 'Free online Break-Even Calculator. Discover exactly how many units your business must sell to cover fixed costs and become profitable.',
  keywords: ['break even calculator', 'break even analysis', 'business break even'],
  fields: [$('fixed', 'Fixed costs', 10000), $('price', 'Price per unit', 50), $('variable', 'Variable cost per unit', 20)],
  content: {
    intro: 'Find your break-even point — the number of units you must sell to cover all costs — plus the contribution margin that drives your profitability.',
    how: 'Break-even units = fixed costs / (price - variable cost per unit). The denominator is the contribution margin: how much each sale contributes toward fixed costs and profit.',
    howSteps: [
      'Detail your total fixed overhead costs.',
      'Enter the unit selling price and the variable cost to produce one unit.',
      'The engine divides fixed costs by contribution margin to output your break-even units.'
    ],
    faqs: [
      ['What is contribution margin?', 'Price minus variable cost per unit — the amount each sale contributes to covering fixed costs, then profit.'],
      ['What are fixed vs variable costs?', 'Fixed costs (rent, salaries) stay constant; variable costs (materials, shipping) rise with each unit sold.'],
      ['Why does break-even matter?', 'It tells you the minimum sales to avoid a loss — essential for pricing and planning.'],
    ],
  },
  related: ['profit-margin-calculator', 'markup-calculator', 'roi-calculator', 'commission-calculator'],
},
{
  slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Profit margin and markup from cost and selling price.',
  metaDescription: 'Calculate Profit Margin safely online. Find your true gross profit margin and markup percentages based on cost and retail price instantly.',
  keywords: ['profit margin calculator', 'margin calculator', 'gross margin'],
  fields: [$('cost', 'Cost', 60), $('revenue', 'Selling price', 100)],
  content: {
    intro: 'Calculate profit margin and markup from your cost and selling price — two related but distinct numbers that businesses often confuse.',
    how: 'Margin = profit / selling price; markup = profit / cost. The same dollar profit gives a smaller margin percentage than markup percentage, since the denominators differ.',
    howSteps: [
      'Input the cost of producing or acquiring the item.',
      'Input your selling (retail) price.',
      'The calculator processes the difference to reveal both your margin and your markup.'
    ],
    faqs: [
      ['Margin vs markup?', 'Margin is profit as a share of the selling price; markup is profit as a share of cost. A 50% markup is only a 33% margin.'],
      ['What is a good profit margin?', 'It varies widely by industry — grocery is thin (single digits), software can exceed 80%.'],
      ['Which should I price with?', 'Markup is easy to apply to cost; margin is what shows on financial statements. Know both.'],
    ],
  },
  related: ['markup-calculator', 'break-even-calculator', 'discount-calculator', 'sales-tax-calculator'],
},
{
  slug: 'markup-calculator', name: 'Markup Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Selling price and profit from cost and markup percentage.',
  metaDescription: 'Free online Markup Calculator. Enter your cost and desired markup percentage to easily generate the correct retail selling price.',
  keywords: ['markup calculator', 'markup percentage calculator', 'retail pricing calculator'],
  fields: [$('cost', 'Cost', 60), pctF('markup', 'Markup', 40)],
  content: {
    intro: 'Set a selling price by applying a markup percentage to your cost, and see the resulting profit and profit margin.',
    how: 'Selling price = cost x (1 + markup%). The tool also converts the markup into the equivalent profit margin, which is always the smaller number.',
    howSteps: [
      'Enter the base cost of your product.',
      'Select the markup percentage you wish to apply.',
      'View the calculated final retail price and equivalent profit margin.'
    ],
    faqs: [
      ['How do I choose a markup?', 'Cover your costs and target margin. Retail markups often range from 50% to 100% or more depending on the category.'],
      ['Why is my margin lower than my markup?', 'Margin divides profit by the higher selling price, markup by the lower cost — so margin is always the smaller percentage.'],
      ['Does markup include overhead?', 'It should account for it. Mark up enough above unit cost to cover overhead and still profit.'],
    ],
  },
  related: ['profit-margin-calculator', 'break-even-calculator', 'discount-calculator', 'commission-calculator'],
},
{
  slug: 'commission-calculator', name: 'Commission Calculator', prio: 'P3', category: 'finance', widget: 'calc',
  short: 'Total pay from a commission rate, sales, and base salary.',
  metaDescription: 'Calculate sales commissions online. Combine your base pay, sales volume, and commission rate to accurately project total earnings.',
  keywords: ['commission calculator', 'sales commission calculator', 'commission earnings'],
  fields: [$('sales', 'Total sales', 50000), pctF('rate', 'Commission rate', 8), $('base', 'Base pay', 2000)],
  content: {
    intro: 'Calculate commission earnings and total pay from your sales volume, commission rate, and any base salary.',
    how: 'Commission = sales x rate. Total pay adds your base salary. The tool keeps the two separate so you can see each component.',
    howSteps: [
      'Enter the total value of sales made.',
      'Specify the commission percentage rate you earn.',
      'Include any base salary to receive a full breakdown of your total pay.'
    ],
    faqs: [
      ['What is a typical commission rate?', 'It varies enormously by industry — from 1–2% on high-volume goods to 20%+ on high-margin services.'],
      ['Base plus commission vs commission-only?', 'A base provides stability; commission-only offers higher upside. The mix shapes total earnings and risk.'],
      ['Is commission taxed differently?', 'It is taxable income; withholding rules can differ, but it counts toward your total earnings.'],
    ],
  },
  related: ['salary-calculator', 'overtime-calculator', 'profit-margin-calculator', 'markup-calculator'],
},
{
  slug: 'overtime-calculator', name: 'Overtime Pay Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Total pay including overtime at a chosen multiplier.',
  metaDescription: 'Calculate Overtime Pay online safely. Estimate time-and-a-half or custom overtime multipliers to quickly tally your full paycheck.',
  keywords: ['overtime calculator', 'overtime pay calculator', 'time and a half calculator'],
  fields: [$('rate', 'Hourly rate', 25), { key: 'regular', label: 'Regular hours', type: 'number', def: 40, unit: 'h', min: 0, max: 168 }, { key: 'overtime', label: 'Overtime hours', type: 'number', def: 8, unit: 'h', min: 0, max: 168 }, { key: 'multiplier', label: 'Overtime multiplier', type: 'number', def: 1.5, min: 1, max: 5, step: 0.1 }],
  content: {
    intro: 'Calculate total pay including overtime, with an adjustable multiplier for time-and-a-half, double time, or other rates.',
    how: 'Regular pay = rate x regular hours. Overtime pay = overtime hours x rate x multiplier (1.5 for time-and-a-half). The total combines both.',
    howSteps: [
      'Input your base hourly rate and normal working hours.',
      'Enter the extra hours worked.',
      'Select the overtime multiplier (e.g., 1.5 for time-and-a-half) to see total earnings.'
    ],
    faqs: [
      ['What is time-and-a-half?', 'Overtime paid at 1.5x the regular rate, the common US standard for hours over 40 per week for eligible employees.'],
      ['When does overtime apply?', 'Rules vary by country and role. In the US, non-exempt employees typically earn overtime past 40 hours a week.'],
      ['What is double time?', 'Pay at 2x the regular rate, sometimes required for holidays or very long shifts depending on local law or contract.'],
    ],
  },
  related: ['salary-calculator', 'hourly-to-salary-calculator', 'commission-calculator', 'hours-calculator'],
},
];
