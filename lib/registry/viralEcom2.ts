import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string, help?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, help });
// The 'ecommerce' category key is requested by the batch spec; cast keeps this file type-safe until CatKey includes it.
const CAT = 'ecommerce' as ToolDef['category'];

export const VIRAL_ECOM2: ToolDef[] = [
{
  slug: 'reorder-point-eoq-calculator', name: 'Reorder Point, Safety Stock & EOQ Calculator', prio: 'P2', category: CAT, widget: 'calc',
  short: 'Economic order quantity, safety stock and reorder point from demand, lead time and service level.',
  metaDescription: 'Reorder point calculator: get economic order quantity, safety stock and reorder point from annual demand, lead time, demand variability and service level.',
  keywords: ['reorder point calculator', 'safety stock calculator', 'eoq calculator', 'economic order quantity formula'],
  fields: [
    $('annualDemand', 'Annual demand', 12000, 'units'),
    $('sdDaily', 'Daily demand standard deviation (σ)', 12, 'units', 'Spread of day-to-day demand.'),
    $('leadTime', 'Supplier lead time', 7, 'days'),
    { key: 'service', label: 'Service level', type: 'select', def: '95', options: [
      { value: '90', label: '90% (z = 1.2816)' }, { value: '95', label: '95% (z = 1.6449)' },
      { value: '97.5', label: '97.5% (z = 1.9600)' }, { value: '99', label: '99% (z = 2.3263)' }] },
    $('orderCost', 'Cost per order (setup)', 50, undefined, 'Fixed cost each time you place an order.'),
    $('holdingCost', 'Holding cost per unit per year', 4),
    $('unitCost', 'Unit purchase cost (optional, 0 to skip)', 20),
  ],
  content: {
    intro: 'Work out how much to order each time and when to reorder. This calculator combines the Wilson economic order quantity (EOQ) with a safety stock based on your chosen service level, so you can see the order size, the reorder point and the yearly ordering and holding cost in one place.',
    how: 'EOQ = √(2 × D × S / H), where D is annual demand, S the cost per order and H the holding cost per unit per year. Average daily demand d = D / 365. Safety stock = z × σ × √L, where σ is the daily demand standard deviation, L the lead time in days and z the one-sided normal quantile for the service level. Reorder point = d × L + safety stock. Annual cost = (D / Q) × S + (Q / 2) × H, plus D × unit cost if you enter one. Assumptions: constant demand rate, fixed lead time, no quantity discounts and normally distributed daily demand. Lead-time variability is not modelled. Results are estimates.',
    howSteps: ['Enter annual demand, daily demand spread (σ) and lead time in days.', 'Pick a service level and enter the cost per order and holding cost per unit per year.', 'Read the EOQ, reorder point, safety stock and annual cost.'],
    example: 'Annual demand 12,000 units, σ = 12 units/day, lead time 7 days, 95% service, order cost 50, holding cost 4 per unit per year. EOQ = √(2 × 12,000 × 50 / 4) = 547.7 units, about 21.91 orders a year. Daily demand is 32.88 units, so demand over the lead time is 230.1 units. Safety stock = 1.6449 × 12 × √7 = 52.2 units, giving a reorder point of 282.4 units.',
    faqs: [
      ['What is the difference between reorder point and safety stock?', 'The reorder point is the stock level that triggers a new order. It equals expected demand during the lead time plus safety stock, which is the buffer against demand being higher than average.'],
      ['Does this account for lead time variability?', 'No. It assumes a fixed lead time and only variable daily demand. If your supplier lead time varies a lot, the true safety stock needed is higher than shown.'],
      ['What does a service level of 95% mean here?', 'It is the target probability of not running out of stock during one replenishment cycle, assuming normally distributed demand. It is not the same as a fill rate.'],
      ['When is EOQ not suitable?', 'EOQ assumes steady demand and constant costs. Seasonal items, quantity discounts, minimum order quantities or perishable stock need adjustments, so treat the result as a starting estimate.'],
    ],
  },
  related: ['bogo-discount-breakeven-calculator', 'break-even-calculator', 'gross-margin-calculator'],
},
{
  slug: 'bogo-discount-breakeven-calculator', name: 'Discount & BOGO Breakeven Calculator', prio: 'P2', category: CAT, widget: 'calc',
  short: 'Extra sales volume needed for a BOGO, buy X get Y free or percent-off offer to match baseline profit.',
  metaDescription: 'Discount breakeven calculator: find the extra unit volume a BOGO, buy X get Y free or percent-off offer needs to match your normal profit.',
  keywords: ['discount breakeven calculator', 'bogo profit calculator', 'volume needed to offset discount', 'buy one get one free margin'],
  fields: [
    $('price', 'Normal selling price per unit', 40),
    $('cost', 'Unit cost', 12),
    { key: 'offer', label: 'Offer', type: 'select', def: 'bogo', options: [
      { value: 'bogo', label: 'Buy 1 Get 1 Free' }, { value: 'b2g1', label: 'Buy 2 Get 1 Free' },
      { value: 'pct', label: 'Percent off' }, { value: 'custom', label: 'Buy X Get Y Free (custom)' }] },
    $('percentOff', 'Percent off (used for "Percent off")', 20, '%'),
    $('buy', 'Buy quantity X (used for custom)', 3),
    $('free', 'Free quantity Y (used for custom)', 1),
    $('units', 'Baseline units sold per period', 500, 'units'),
  ],
  content: {
    intro: 'See how much extra volume a promotion has to bring in just to earn the same profit as selling at the normal price. It handles buy one get one free, buy X get Y free and simple percent-off discounts, and warns when no amount of volume can make up the lost margin.',
    how: 'For a set offer, the effective discount is Y / (X + Y) and profit per unit under the offer = (price × X − cost × (X + Y)) / (X + Y). For a percent-off offer, profit per unit = price × (1 − discount) − cost. Baseline profit = (price − cost) × baseline units. Units needed to match = baseline profit / profit per unit under the offer, and the required uplift is that figure minus baseline units, shown also as a percentage. Assumption: customers buy complete sets, and costs per unit stay the same. If profit per unit under the offer is zero or negative, no volume can compensate. This is an estimate and ignores extra fixed costs and repeat-purchase effects.',
    howSteps: ['Enter the normal price, unit cost and baseline units per period.', 'Choose the offer type and fill in the percent or the buy/free quantities.', 'Read the extra units and percentage uplift needed to break even.'],
    example: 'Price 40, unit cost 12, baseline 500 units, Buy 1 Get 1 Free. Baseline profit = (40 − 12) × 500 = 14,000. Under the offer, profit per unit = (40 × 1 − 12 × 2) / 2 = 8, so 14,000 / 8 = 1,750 units are needed: 1,250 extra units, an uplift of +250%.',
    faqs: [
      ['Why does a small discount need so much extra volume?', 'The discount comes straight out of your margin, so profit per unit falls by a larger proportion than the price. A 20% discount on a 30% margin product leaves one third of the unit profit, so volume must triple.'],
      ['What does "no volume can compensate" mean?', 'Under the offer you earn nothing or lose money on every unit, so selling more units cannot restore the baseline profit.'],
      ['Does this assume customers buy full sets?', 'Yes. For BOGO-style offers it assumes every customer takes complete sets, which is the simplest case and usually the most favourable one.'],
      ['Does it include fixed costs, returns or repeat customers?', 'No. It looks only at per-unit profit, so effects like customer acquisition, returns or later repeat purchases are not included.'],
    ],
  },
  related: ['discount-calculator', 'profit-margin-calculator', 'markup-calculator', 'price-elasticity-calculator'],
},
{
  slug: 'price-elasticity-calculator', name: 'Price Elasticity of Demand Calculator', prio: 'P2', category: CAT, widget: 'calc',
  short: 'Midpoint (arc) price elasticity of demand, revenue change and a constant-elasticity price estimate.',
  metaDescription: 'Price elasticity of demand calculator using the midpoint formula: get elasticity, elastic or inelastic class, revenue change and a markup price estimate.',
  keywords: ['price elasticity of demand calculator', 'midpoint elasticity formula', 'elastic vs inelastic demand', 'profit maximizing price'],
  fields: [
    $('p1', 'Original price (P1)', 10), $('q1', 'Original quantity (Q1)', 1000, 'units'),
    $('p2', 'New price (P2)', 12), $('q2', 'New quantity (Q2)', 700, 'units'),
    $('cost', 'Unit cost (optional, 0 to skip)', 6),
  ],
  content: {
    intro: 'Measure how sensitive demand is to a price change using the midpoint (arc) elasticity formula. Enter two price and quantity observations to see the elasticity, whether demand is elastic or inelastic, and how revenue changed between the two points.',
    how: 'E = [(Q2 − Q1) / ((Q1 + Q2) / 2)] / [(P2 − P1) / ((P1 + P2) / 2)]. |E| above 1 is elastic, below 1 inelastic, and equal to 1 unit elastic. Revenue is price × quantity at each point. If you add a unit cost c and assume constant elasticity with E below −1, the profit-maximising price is P* = c × E / (1 + E); otherwise it is not defined. The midpoint method gives the same value whichever point you call first, but it is only an estimate from two observations, and real demand curves are rarely constant-elasticity.',
    howSteps: ['Enter the original and new price with the quantities sold at each.', 'Optionally add a unit cost for the markup price estimate.', 'Read the elasticity, its class and the revenue change.'],
    example: 'Price rises from 10 to 12 and quantity falls from 1,000 to 700. Midpoint quantity change = −300 / 850 = −35.29%, price change = 2 / 11 = 18.18%, so E = −1.941 (elastic). Revenue falls from 10,000 to 8,400 (−16%). With unit cost 6, P* = 6 × (−1.941) / (1 − 1.941) = 12.38.',
    faqs: [
      ['What does elastic demand mean?', 'When |E| is above 1, quantity falls proportionally more than price rises, so a price increase reduces total revenue and a price cut increases it.'],
      ['Why use the midpoint formula?', 'It uses average price and quantity as the base, so the elasticity is the same whether the price goes up or down between the two points.'],
      ['When is the profit-maximising price shown?', 'Only when E is below −1 and a unit cost is entered. It assumes constant elasticity, which is a strong assumption, so treat it as a rough guide rather than a pricing recommendation.'],
      ['Is one price change enough to estimate elasticity?', 'It gives a single estimate. Other factors such as seasonality, promotion or competitors also move sales, so results from one test can mislead.'],
    ],
  },
  related: ['bogo-discount-breakeven-calculator', 'profit-margin-calculator', 'markup-calculator', 'discount-calculator'],
},
{
  slug: 'ev-home-charging-time-cost-calculator', name: 'EV Home Charging Time & Cost Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Charging time, grid energy and cost for an EV from battery size, charge levels, charger power and tariff.',
  metaDescription: 'EV charging time calculator: estimate home charging time, grid energy and cost from battery size, start and target charge, charger kW and tariff.',
  keywords: ['ev charging time calculator', 'home charger cost calculator', 'ev charging cost per kwh', 'wallbox charging time'],
  fields: [
    $('battery', 'Usable battery capacity', 60, 'kWh'),
    $('start', 'Starting charge', 20, '%'), $('target', 'Target charge', 80, '%'),
    $('chargerKw', 'Home charger power', 7.4, 'kW', 'Common AC sizes: 3.7, 7.4, 11, 22 kW.'),
    $('carKw', "Car's onboard AC charger limit", 11, 'kW'),
    $('eff', 'Charging efficiency', 90, '%', 'Share of grid energy that reaches the battery. Assumption, adjust to your setup.'),
    $('tariff', 'Electricity price per kWh', 0.25, undefined, 'Any currency.'),
    $('consumption', 'Vehicle consumption (battery side)', 16, 'kWh/100 km'),
  ],
  content: {
    intro: 'Estimate how long an electric car takes to charge at home, how much energy you draw from the grid and what it costs. It uses the slower of your wallbox and the car\'s onboard AC charger, plus an adjustable charging-efficiency loss.',
    how: 'Energy added = battery kWh × (target% − start%) / 100. Effective power = the lower of the charger kW and the car\'s onboard AC limit. Time = energy added / (effective kW × efficiency). Grid energy = energy added / efficiency, and cost = grid energy × your price per kWh. Cost per 100 km = consumption / efficiency × price, treating consumption as battery-side energy. Range added = energy added / consumption × 100. Assumptions: constant charge power throughout. Real charging slows at high state of charge and in cold weather, and this is not modelled, so times are estimates and often longer above about 80%.',
    howSteps: ['Enter battery capacity and the start and target charge percentages.', 'Enter charger power, the car\'s AC limit and your efficiency assumption.', 'Add your tariff per kWh and consumption to see cost and range.'],
    example: '60 kWh battery, 20% to 80%, 7.4 kW charger, 11 kW car limit, 90% efficiency, price 0.25/kWh, consumption 16 kWh/100 km. Energy added = 60 × 0.6 = 36 kWh; grid energy = 36 / 0.9 = 40 kWh; time = 36 / (7.4 × 0.9) = 5.41 h (5 h 24 min); cost = 40 × 0.25 = 10; range added about 225 km.',
    faqs: [
      ['Why is grid energy higher than the energy added to the battery?', 'Charger electronics and battery thermal management lose some energy as heat. The default 90% is an assumption; actual losses vary with the car, charger and temperature.'],
      ['Which charger power is used?', 'The lower of your wallbox rating and the car\'s onboard AC charger limit, because the car cannot accept AC power faster than its onboard charger allows.'],
      ['Does this model charging taper?', 'No. Charging power usually drops near full charge, so charging to high percentages typically takes longer than shown.'],
      ['Can I use it for public DC fast charging?', 'It is designed for AC home charging. DC fast charging follows a power curve set by the car and charger, which a constant-power estimate does not capture.'],
    ],
  },
  related: ['electricity-bill-calculator', 'fuel-cost-calculator', 'power-converter', 'energy-converter'],
},
];
