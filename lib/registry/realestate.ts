import { ToolDef } from '../types';
const $ = (key: string, label: string, def: number, unit?: string) =>
  ({ key, label, type: 'number' as const, def, unit, min: 0 });
const pctF = (key: string, label: string, def: number) =>
  ({ key, label, type: 'number' as const, def, unit: '%', min: 0, max: 100, step: 0.1 });

export const REALESTATE: ToolDef[] = [
{
  slug: 'rent-vs-buy-calculator', name: 'Rent vs Buy Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'Find out whether renting or buying makes better financial sense over your time horizon.',
  metaDescription: 'Free Rent vs Buy Calculator. Make smart housing decisions by mathematically comparing mortgage costs against renting across your time horizon.',
  keywords: ['rent vs buy calculator', 'should i rent or buy', 'rent or buy calculator', 'renting vs buying calculator'],
  fields: [
    $('homePrice', 'Home price', 400000, '$'),
    pctF('down', 'Down payment %', 20),
    pctF('rate', 'Mortgage rate', 6.8),
    { key: 'years', label: 'Years in home', type: 'number', def: 7, unit: 'yrs', min: 1, max: 40 },
    $('rent', 'Monthly rent (alternative)', 2200, '$/mo'),
    pctF('appreciation', 'Annual home appreciation', 3),
    pctF('propTax', 'Property tax rate', 1.1),
  ],
  content: {
    intro: 'The rent vs buy question depends on more than the mortgage payment — it includes opportunity cost of the down payment, property tax, maintenance, and how long you stay. This calculator models the full financial picture over your chosen time horizon.',
    how: 'Buying costs include P&I, estimated property tax, and insurance. The home\'s projected equity at sale is subtracted to give a net buy cost. That\'s compared to total rent paid over the same period.',
    howSteps: [
      'Enter the target home price and your down payment details.',
      'Specify expected years in the home and your current alternative monthly rent.',
      'Include expected appreciation and tax rates to reveal the exact financial winner over time.'
    ],
    faqs: [
      ['What appreciation rate should I use?', 'US homes have averaged roughly 3–4% annual appreciation over long periods, though this varies enormously by location. Use local data if you have it.'],
      ['Why does time horizon matter so much?', 'Buying has high upfront costs (down payment, closing costs). Over a short period those aren\'t recovered; over 7+ years ownership usually wins financially.'],
      ['Does this include tax deductions?', 'No — mortgage interest deduction eligibility varies by taxpayer situation. For a tax-adjusted comparison, consult a financial advisor.'],
      ['What is the 5% rule for renting vs buying?', 'A rough guideline: multiply the home price by 5%, then divide by 12. If your monthly rent is below that number, renting may make financial sense. This calculator gives a more precise comparison using your actual inputs.'],
    ],
  },
  related: ['home-affordability-calculator', 'mortgage-calculator', 'closing-costs-calculator', 'property-tax-calculator'],
},
{
  slug: 'home-affordability-calculator', name: 'Home Affordability Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'How much house can you afford? Based on the 28/36 rule lenders use.',
  metaDescription: 'Calculate Home Affordability online. Find out exactly how much house you can afford based on lender qualifying standards and the 28/36 rule.',
  keywords: ['home affordability calculator', 'how much house can i afford', 'house affordability calculator', 'mortgage affordability calculator'],
  fields: [
    $('income', 'Annual gross income', 90000, '$/yr'),
    $('debt', 'Monthly debt payments', 400, '$/mo'),
    pctF('rate', 'Mortgage rate', 6.8),
    pctF('down', 'Down payment %', 20),
    pctF('propTax', 'Annual property tax rate', 1.1),
    { key: 'term', label: 'Loan term', type: 'select', def: '30', options: [{ value: '30', label: '30 years' }, { value: '20', label: '20 years' }, { value: '15', label: '15 years' }] },
  ],
  content: {
    intro: 'Calculate the maximum home price you can afford based on your income, debts, and the 28/36 qualifying ratios that most conventional lenders use — before you start browsing listings.',
    how: 'The 28% rule caps housing costs (P&I, tax, insurance) at 28% of gross monthly income. The 36% rule caps total monthly debt at 36%. The tool applies both and uses the more restrictive result.',
    howSteps: [
      'Enter your total annual gross income.',
      'Input any ongoing monthly debt payments.',
      'Provide current mortgage rates and down payment plans to reveal your maximum buying power.'
    ],
    faqs: [
      ['What is the 28/36 rule?', 'Lenders prefer that your housing payment not exceed 28% of gross income, and that all debt payments not exceed 36%. It is a guideline, not a hard cap.'],
      ['Does this include PMI?', 'PMI (private mortgage insurance) applies when down payment is below 20% and adds roughly 0.5–1% of the loan annually. This calculator does not include PMI — subtract ~$100–300/mo from the result if your down is under 20%.'],
      ['What credit score do I need?', 'Most conventional lenders want 620+; the best rates need 740+. This calculator focuses on income ratios, not credit score minimums.'],
    ],
  },
  related: ['house-price-to-income-ratio', 'rent-vs-buy-calculator', 'mortgage-calculator', 'down-payment-calculator'],
},
{
  slug: 'property-tax-calculator', name: 'Property Tax Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'Estimate annual and monthly property tax from home value and mill rate.',
  metaDescription: 'Free Property Tax Calculator. Estimate your annual real estate taxes based on home valuation, assessment ratio, and local mill rates safely.',
  keywords: ['property tax calculator', 'property tax estimator', 'how much is property tax', 'property tax by state'],
  fields: [
    $('value', 'Market value', 350000, '$'),
    pctF('rate', 'Effective tax rate', 1.1),
    { key: 'assessed', label: 'Assessment ratio', type: 'number', def: 100, unit: '%', min: 10, max: 100, step: 1 },
  ],
  content: {
    intro: 'Estimate your annual property tax bill from your home\'s market value, the local tax rate (often called a mill rate or effective rate), and your jurisdiction\'s assessment ratio.',
    how: 'Property tax = assessed value × rate. Some jurisdictions assess at a percentage of market value (e.g. 85%). The effective rate field accepts what you\'ll find on your county assessor\'s website.',
    howSteps: [
      'Input the current market value of your home.',
      'Enter the effective property tax rate (mill rate) for your county.',
      'Adjust the assessment ratio (if less than 100%) to calculate your exact tax bill.'
    ],
    faqs: [
      ['Where do I find the tax rate?', 'Your county or municipality assessor\'s website lists the mill rate. One mill = $1 per $1,000 of assessed value, or 0.1%. Typical US rates run 0.5–2.5%.'],
      ['Can I appeal my assessment?', 'Yes — most jurisdictions have an appeals process. If your assessment exceeds comparable home sales, an appeal can reduce your bill.'],
      ['Is property tax deductible?', 'In the US, up to $10,000 of state and local taxes (SALT) including property tax can be deducted on federal returns if you itemize.'],
      ['How do I find the assessment ratio for my area?', 'Your county or municipal assessor\'s website publishes the assessment ratio (sometimes called the equalization rate). It may be 100% (assessed at full market value) or a lower percentage like 85% or 70%.'],
    ],
  },
  related: ['home-affordability-calculator', 'rent-vs-buy-calculator', 'closing-costs-calculator', 'mortgage-calculator'],
},
{
  slug: 'closing-costs-calculator', name: 'Closing Costs Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'Estimate buyer or seller closing costs as a percentage of the home price.',
  metaDescription: 'Closing Costs Calculator for buyers and sellers. Estimate final home sale closing costs privately without sharing your real estate data.',
  keywords: ['closing costs calculator', 'closing cost estimator', 'home closing costs', 'how much are closing costs'],
  fields: [
    $('price', 'Home price', 400000, '$'),
    $('loan', 'Loan amount', 320000, '$'),
    { key: 'role', label: 'I am the', type: 'select', def: 'buyer', options: [{ value: 'buyer', label: 'Buyer' }, { value: 'seller', label: 'Seller' }] },
  ],
  content: {
    intro: 'Estimate the closing costs you\'ll pay as a buyer or seller, broken down by line item — origination fees, title insurance, prepaid items, and more.',
    how: 'Buyer closing costs typically run 2–5% of the loan amount. Seller costs run 7–10% of the sale price, dominated by agent commission. This calculator uses national average percentages as starting estimates.',
    howSteps: [
      'Enter the purchase price of the home.',
      'Enter the loan amount you are borrowing (if applicable).',
      'Select whether you are the Buyer or Seller to view the correct cost breakdown.'
    ],
    faqs: [
      ['Can closing costs be negotiated?', 'Yes — lender fees, some title fees, and in some markets, commission rates are negotiable. Compare Loan Estimates from multiple lenders.'],
      ['Can I roll closing costs into the loan?', 'In some cases — lenders may offer "no-closing-cost" loans at a higher rate, or allow financing some fees into the loan balance. Ask your lender.'],
      ['When will I get the exact figure?', 'Lenders are required to provide a Loan Estimate within 3 days of application and a Closing Disclosure 3 days before closing with final figures.'],
    ],
  },
  related: ['home-affordability-calculator', 'down-payment-calculator', 'mortgage-calculator', 'property-tax-calculator'],
},
{
  slug: 'rental-yield-calculator', name: 'Rental Yield Calculator', prio: 'P2', category: 'real-estate', widget: 'calc',
  short: 'Gross yield, net yield, cap rate, and payback period for a rental property.',
  metaDescription: 'Free Rental Yield Calculator online. Compare real estate investments by easily calculating gross yield, net yield, and cap rates directly.',
  keywords: ['rental yield calculator', 'rental property calculator', 'cap rate calculator', 'buy to let calculator'],
  fields: [
    $('price', 'Purchase price', 350000, '$'),
    $('rent', 'Monthly rent', 2000, '$/mo'),
    $('expenses', 'Monthly expenses (tax, ins, mgmt)', 500, '$/mo'),
    pctF('vacancy', 'Vacancy rate', 5),
  ],
  content: {
    intro: 'Calculate the gross and net rental yield and cap rate for an investment property — the core metrics every real estate investor uses to compare deals.',
    how: 'Gross yield = annual rent / price. Net yield deducts operating expenses and vacancy. Cap rate uses NOI (net operating income) before financing, making it useful for comparing properties regardless of how they\'re funded.',
    howSteps: [
      'Enter the purchase price of the rental property.',
      'Enter expected monthly rent and total monthly expenses.',
      'Adjust the expected vacancy rate to view the property cap rate and net yield.'
    ],
    faqs: [
      ['What is a good rental yield?', 'In the US, 5–8% gross yield is considered reasonable. Net yield after expenses is typically 3–5%. Location matters enormously — high-appreciation markets often have lower yields.'],
      ['Cap rate vs net yield?', 'Net yield includes your specific financing; cap rate ignores it — making cap rate the standard for comparing properties on their own merits.'],
      ['What counts as expenses?', 'Property tax, insurance, property management (typically 8–10% of rent), maintenance reserves (~1% of value/year), and vacancy losses.'],
    ],
  },
  related: ['rent-vs-buy-calculator', 'mortgage-calculator', 'roi-calculator', 'property-tax-calculator'],
},
{
  slug: 'house-price-to-income-ratio', name: 'House Price-to-Income Ratio', prio: 'P2', category: 'real-estate', widget: 'calc',
  short: 'Is a home priced within your income range? Check the price-to-income ratio.',
  metaDescription: 'House Price to Income Ratio Calculator. Instantly assess if a house price is affordable based on your total household income ratio.',
  keywords: ['house price to income ratio', 'home price to income', 'affordability ratio', 'price income ratio calculator'],
  fields: [
    $('price', 'Home price', 400000, '$'),
    $('income', 'Annual household income', 90000, '$/yr'),
  ],
  content: {
    intro: 'The price-to-income ratio is the simplest affordability check: it compares the home price to your annual income and flags whether you\'re in comfortable or stretched territory.',
    how: 'Divide the home price by gross annual income. Ratios below 3× are affordable; 3–5× is manageable; above 5× is stretched; above 7× is difficult to finance conventionally.',
    howSteps: [
      'Enter the total sale price of the house.',
      'Enter your total annual household income.',
      'The calculator divides the two to evaluate your affordability safety ratio.'
    ],
    faqs: [
      ['What ratio do lenders use?', 'Lenders focus more on DTI (monthly payment vs income), but the price-to-income ratio is a useful quick filter before calculating payments.'],
      ['How does this vary by city?', 'Ratios above 10× are common in San Francisco, New York, and London. Ratios below 3× are found in many midwestern US cities.'],
      ['What income to use?', 'Use combined gross household income before taxes, which is the figure lenders use for qualifying.'],
    ],
  },
  related: ['home-affordability-calculator', 'rent-vs-buy-calculator', 'mortgage-calculator', 'dti-calculator'],
},
{
  slug: 'square-footage-calculator', name: 'Square Footage Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'Calculate area in square feet, square meters, and square yards.',
  metaDescription: 'Free Square Footage Calculator. Calculate total area for rooms and properties in square feet, meters, and yards for flooring and listings.',
  keywords: ['square footage calculator', 'square foot calculator', 'calculate square footage', 'room area calculator'],
  fields: [
    { key: 'mode', label: 'Shape', type: 'select', def: 'rect', options: [{ value: 'rect', label: 'Rectangle / Room' }, { value: 'triangle', label: 'Triangle' }, { value: 'circle', label: 'Circle' }] },
    { key: 'length', label: 'Length (ft)', type: 'number', def: 20, min: 0 },
    { key: 'width', label: 'Width (ft)', type: 'number', def: 15, min: 0 },
    { key: 'base', label: 'Base (ft) — triangle', type: 'number', def: 20, min: 0 },
    { key: 'height', label: 'Height (ft) — triangle', type: 'number', def: 15, min: 0 },
    { key: 'radius', label: 'Radius (ft) — circle', type: 'number', def: 10, min: 0 },
  ],
  content: {
    intro: 'Calculate the area of a room or space in square feet, square meters, and square yards — for flooring, paint, carpet, tile, and real estate listings.',
    how: 'For rectangles (most rooms): length × width. For triangles: base × height ÷ 2. For circles: π × radius². All results are shown in sq ft, sq m, sq yd, and acres.',
    howSteps: [
      'Select the shape of the room (Rectangle, Triangle, or Circle).',
      'Input the primary dimensions in feet.',
      'The calculator converts these dimensions into exact square feet, yards, and meters.'
    ],
    faqs: [
      ['How do I measure an L-shaped room?', 'Break it into two rectangles, calculate each separately, and add the results.'],
      ['How much does one square foot of hardwood flooring cost?', 'Typical installed hardwood costs $6–12 per square foot in the US; laminate runs $3–7/sqft. Add 10% for waste and cuts.'],
      ['How many square feet in a square meter?', 'Exactly 10.7639 — the calculator shows both automatically.'],
    ],
  },
  related: ['home-affordability-calculator', 'rent-vs-buy-calculator', 'area-converter', 'unit-converter'],
},
{
  slug: 'capital-gains-tax-calculator', name: 'Capital Gains Tax Calculator', prio: 'P1', category: 'real-estate', widget: 'calc',
  short: 'Estimate US federal capital gains tax on real estate or investment sales.',
  metaDescription: 'Free Capital Gains Tax Calculator online. Safely estimate US federal capital gains taxes on real estate and investment sales directly in your browser.',
  keywords: ['capital gains tax calculator', 'capital gains calculator', 'long term capital gains calculator', 'real estate capital gains'],
  fields: [
    $('buy', 'Purchase price (basis)', 250000, '$'),
    $('sell', 'Sale price', 400000, '$'),
    $('improvements', 'Capital improvements', 20000, '$'),
    { key: 'held', label: 'Months held', type: 'number', def: 24, unit: 'mo', min: 0 },
    $('income', 'Annual taxable income', 90000, '$/yr'),
  ],
  content: {
    intro: 'Estimate the US federal capital gains tax on a property or investment sale — accounting for your holding period (short vs long term), adjusted cost basis including improvements, and your income bracket.',
    how: 'Capital gain = sale price − adjusted basis (purchase + improvements). Long-term (held 12+ months) uses the preferential 0/15/20% federal rate based on income; short-term uses ordinary income rates.',
    howSteps: [
      'Enter the original purchase price (cost basis) of the asset.',
      'Enter the final sale price and the value of any capital improvements.',
      'Input your holding period and annual income to determine the correct tax bracket and gain.'
    ],
    faqs: [
      ['What is the primary residence exclusion?', 'If you lived in the home as your primary residence for 2 of the last 5 years, you may exclude up to $250,000 ($500,000 married filing jointly) of gain from federal tax.'],
      ['What improvements count?', 'Permanent improvements that add value (new roof, addition, kitchen remodel) increase your basis and reduce taxable gain. Repairs and maintenance do not count.'],
      ['Does my state tax capital gains?', 'Most US states tax capital gains as ordinary income. This calculator covers federal tax only — add your state rate on top.'],
    ],
  },
  related: ['rent-vs-buy-calculator', 'rental-yield-calculator', 'roi-calculator', 'inflation-calculator'],
},
];
