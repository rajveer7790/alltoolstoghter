import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, min: 0 });

export const INVESTING: ToolDef[] = [
{
  slug: 'dollar-cost-averaging-calculator', name: 'Dollar-Cost Averaging Calculator', prio: 'P1', category: 'investing', widget: 'calc',
  short: 'Projected portfolio value from regular monthly investments.',
  metaDescription: 'Calculate Dollar-Cost Averaging (DCA) returns online. Free, private calculator tracking recurring investments over time to project future wealth.',
  keywords: ['dollar cost averaging calculator','dca calculator','recurring investment calculator','sip calculator'],
  fields: [$('monthly','Monthly investment',500,'$'),$('months','Number of months',120),$('return','Expected annual return (%)',8,'%')],
  content: {
    intro: 'Project the future value of a dollar-cost averaging strategy — investing a fixed amount at regular intervals — and see how much comes from contributions versus growth.',
    how: 'Each monthly contribution compounds at the monthly equivalent of your annual return. The future value uses the annuity formula, summing all contributions plus their compounded growth.',
    howSteps: [
      'Enter the fixed amount you plan to invest monthly.',
      'Set the total duration in months for your DCA strategy.',
      'Provide an expected annual return percentage to calculate your final projected portfolio balance.'
    ],
    faqs: [
      ['What is dollar-cost averaging?','Investing a fixed amount at regular intervals regardless of price. It reduces the impact of volatility and removes the need to time the market.'],
      ['What return should I assume?','Historically the US stock market has averaged around 7–10% annually before inflation. Use a conservative figure for planning.'],
      ['Is DCA better than lump-sum?','Lump-sum investing wins on average because markets trend up, but DCA reduces risk and is practical for those investing from regular income.'],
    ],
  },
  related: ['crypto-profit-loss-calculator','compound-interest-calculator','stock-return-calculator','retirement-calculator'],
},
{
  slug: 'crypto-profit-loss-calculator', name: 'Crypto Profit/Loss Calculator', prio: 'P1', category: 'investing', widget: 'calc',
  short: 'Profit or loss on a crypto trade, including fees.',
  metaDescription: 'Free Crypto Profit & Loss Calculator. Quickly calculate your Bitcoin and crypto trading gains, losses, and net proceeds safely without logging into exchanges.',
  keywords: ['crypto profit calculator','crypto profit loss calculator','bitcoin profit calculator','crypto pnl calculator'],
  fields: [$('buyPrice','Buy price per coin',30000,'$'),$('sellPrice','Sell price per coin',45000,'$'),$('quantity','Quantity (coins)',0.5),$('fee','Trading fee (%)',0.5,'%')],
  content: {
    intro: 'Calculate the profit or loss on a cryptocurrency trade, including exchange trading fees, with the percentage return and net proceeds clearly broken down.',
    how: 'Profit = (sell price × quantity) − fees − (buy price × quantity). Fees are applied to the gross sale proceeds. The result shows both dollar P&L and percentage return.',
    howSteps: [
      'Enter the original buy price and current sell price per coin.',
      'Input the total coin quantity traded.',
      'Include the exchange trading fee percentage to find your true net profit or loss.'
    ],
    faqs: [
      ['Are trading fees significant?','They can be — frequent trading at 0.5% per trade compounds quickly. Some exchanges charge maker/taker fees that differ; check your actual rate.'],
      ['Does this account for taxes?','No — crypto gains are taxable in most countries. Use the Capital Gains Tax calculator and consult a tax advisor for your jurisdiction.'],
      ['What about staking or airdrops?','This tool covers buy/sell trades only. Staking rewards and airdrops have separate cost-basis and tax treatment.'],
    ],
  },
  related: ['stock-return-calculator','capital-gains-tax-calculator','dollar-cost-averaging-calculator','roi-calculator'],
},
{
  slug: 'stock-return-calculator', name: 'Stock Return Calculator', prio: 'P1', category: 'investing', widget: 'calc',
  short: 'Total and annualized return on a stock investment, including dividends.',
  metaDescription: 'Calculate Stock Returns instantly. Find your total return and annualized rate (CAGR) on stock investments, including dividends. 100% private.',
  keywords: ['stock return calculator','investment return calculator','annualized return calculator','total return calculator'],
  fields: [$('buy','Buy price per share',100,'$'),$('sell','Sell price per share',150,'$'),$('shares','Number of shares',50),$('dividends','Total dividends received',300,'$'),$('years','Holding period (years)',3)],
  content: {
    intro: 'Calculate the total return and annualized return (CAGR) on a stock investment, including both capital gains and dividend income.',
    how: 'Total return = capital gain + dividends, as a percent of cost. Annualized return (CAGR) converts the total return into an equivalent compounded yearly rate over your holding period.',
    howSteps: [
      'Enter the buy and sell prices of the stock alongside your share count.',
      'Enter the total amount of dividends collected.',
      'Provide your holding period to see the calculation convert total return into an annualized CAGR rate.'
    ],
    faqs: [
      ['What is the difference between total and annualized return?','Total return is the overall gain. Annualized (CAGR) expresses it as a steady yearly rate, making investments of different durations comparable.'],
      ['Should I include dividends?','Yes — dividends are a major part of long-term equity returns. Total return including reinvested dividends is the truest measure of performance.'],
      ['How does this compare to the market?','Compare your annualized return to a benchmark like the S&P 500 (historically ~10% nominal) to judge relative performance.'],
    ],
  },
  related: ['dividend-yield-calculator','roi-calculator','dollar-cost-averaging-calculator','compound-interest-calculator'],
},
{
  slug: 'dividend-yield-calculator', name: 'Dividend Yield Calculator', prio: 'P2', category: 'investing', widget: 'calc',
  short: 'Dividend yield and annual income from a dividend stock.',
  metaDescription: 'Dividend Yield Calculator online. Calculate yield and total annual income from a dividend stock to judge passive income safely.',
  keywords: ['dividend yield calculator','dividend calculator','dividend income calculator','yield calculator'],
  fields: [$('price','Current share price',50,'$'),$('annual','Annual dividend per share',2,'$'),$('shares','Shares held (optional)',100)],
  content: {
    intro: 'Calculate the dividend yield of a stock and the annual income from your holding — with context on what the yield level typically signals.',
    how: 'Dividend yield = (annual dividend per share ÷ share price) × 100. As price rises, yield falls; as price falls, yield rises (assuming the dividend is held constant).',
    howSteps: [
      'Enter the current market price of one share.',
      'Enter the annual dividend amount paid out per share.',
      'Optionally enter your total shares held to compute the gross annual dividend income.'
    ],
    faqs: [
      ['What is a good dividend yield?','2–4% is typical for established dividend payers. Yields above 6% can signal either high income or elevated risk — always check sustainability.'],
      ['Is a high yield always good?','Not necessarily — an unusually high yield can result from a falling share price reflecting trouble, and may precede a dividend cut.'],
      ['What is the payout ratio?','The percent of earnings paid as dividends. A ratio above 100% means the company pays more than it earns, which is unsustainable long-term.'],
    ],
  },
  related: ['stock-return-calculator','pe-ratio-calculator','roi-calculator','compound-interest-calculator'],
},
{
  slug: 'pe-ratio-calculator', name: 'P/E Ratio Calculator', prio: 'P2', category: 'investing', widget: 'calc',
  short: 'Price-to-earnings ratio and earnings yield for a stock.',
  metaDescription: 'Free online P/E Ratio Calculator. Calculate Price-to-Earnings (P/E) ratios and earnings yields privately to evaluate stock market values.',
  keywords: ['pe ratio calculator','price to earnings ratio calculator','p/e calculator','earnings yield calculator'],
  fields: [$('price','Share price',150,'$'),$('eps','Earnings per share (EPS)',5,'$')],
  content: {
    intro: 'Calculate the price-to-earnings (P/E) ratio and earnings yield of a stock — the most widely used valuation metric for comparing companies.',
    how: 'P/E = share price ÷ earnings per share. Earnings yield is the inverse (EPS ÷ price), showing earnings as a percentage of price — useful for comparing to bond yields.',
    howSteps: [
      'Input the current share price of the asset.',
      'Input the reported Earnings Per Share (EPS).',
      'The calculator runs the P/E formula to reveal valuation multiple and equivalent yield.'
    ],
    faqs: [
      ['What does the P/E ratio tell me?','How much investors pay per dollar of earnings. A P/E of 20 means you pay $20 for every $1 of annual earnings — higher P/E implies higher growth expectations.'],
      ['What is a normal P/E?','The S&P 500 has historically averaged around 15–20. Growth stocks trade much higher; mature value stocks lower. Compare within an industry.'],
      ['What is the PEG ratio?','P/E divided by the earnings growth rate. It contextualises a high P/E — a PEG near 1 suggests the valuation is reasonable given growth.'],
    ],
  },
  related: ['dividend-yield-calculator','stock-return-calculator','roi-calculator','gross-margin-calculator'],
},
];
