import assert from 'node:assert/strict';
import { test } from 'node:test';
import { COMPUTES_ECOM2 as C, fmtHm } from '../lib/calc/viral/ecom2';
import { VIRAL_ECOM2 } from '../lib/registry/viralEcom2';

const val = (slug: string, v: Record<string, any>, label: string) => {
  const r = C[slug](v).find(x => x.label === label);
  assert.ok(r, `row ${label} missing`);
  return r!.value;
};
const defaults = (slug: string) => {
  const t = VIRAL_ECOM2.find(x => x.slug === slug)!;
  return Object.fromEntries(t.fields!.map(f => [f.key, String(f.def)]));
};
const numOf = (s: string) => Number(s.replace(/,/g, '').match(/-?[\d.]+/)![0]);

test('registry metadata is complete and in bounds', () => {
  assert.equal(VIRAL_ECOM2.length, 4);
  for (const t of VIRAL_ECOM2) {
    assert.ok(C[t.slug], t.slug);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, `${t.slug} meta ${t.metaDescription!.length}`);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]), t.slug);
    assert.ok(t.content.intro.split(/\s+/).length >= 35);
    assert.equal(t.content.howSteps!.length, 3);
    assert.ok(t.content.faqs.length >= 4);
    assert.ok(t.related.length <= 4);
    for (const f of t.fields!) assert.ok(['number', 'select', 'text', 'textarea'].includes(f.type));
  }
});

test('defaults give finite results with a main row', () => {
  for (const t of VIRAL_ECOM2) {
    const r = C[t.slug](defaults(t.slug));
    assert.ok(r.length <= 8 && r.some(x => x.main), t.slug);
    assert.notEqual(r[0].label, 'Check inputs');
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.value), `${t.slug}: ${x.value}`);
  }
});

// ---- reorder point / EOQ ----
test('EOQ textbook value: D=1000, S=10, H=0.5 -> sqrt(40000)=200', () => {
  const v = { annualDemand: '1000', orderCost: '10', holdingCost: '0.5', leadTime: '5', sdDaily: '0', service: '95', unitCost: '0' };
  assert.equal(val('reorder-point-eoq-calculator', v, 'Economic order quantity (EOQ)'), '200 units');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Orders per year'), '5');
  // order cycle = 200 / (1000/365) = 73 days
  assert.equal(val('reorder-point-eoq-calculator', v, 'Order cycle'), '73 days');
  // ordering 5*10=50 + holding 100*0.5=50 -> 100 (equal at EOQ)
  assert.equal(val('reorder-point-eoq-calculator', v, 'Annual ordering + holding cost'), '100');
  // sigma 0 -> safety stock 0; ROP = 1000/365*5 = 13.7
  assert.equal(val('reorder-point-eoq-calculator', v, 'Safety stock'), '0 units');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Reorder point (ROP)'), '13.7 units');
});
test('safety stock: z*sigma*sqrt(L), 99% sigma 10 L 4 -> 2.3263*10*2=46.5', () => {
  const v = { annualDemand: '3650', orderCost: '20', holdingCost: '2', leadTime: '4', sdDaily: '10', service: '99', unitCost: '0' };
  assert.equal(val('reorder-point-eoq-calculator', v, 'Safety stock'), '46.5 units');
  // d=10/day -> ROP = 40 + 46.526 = 86.5
  assert.equal(val('reorder-point-eoq-calculator', v, 'Reorder point (ROP)'), '86.5 units');
  // 90% -> 1.2816*20=25.6 ; 97.5% -> 1.96*20=39.2
  assert.equal(val('reorder-point-eoq-calculator', { ...v, service: '90' }, 'Safety stock'), '25.6 units');
  assert.equal(val('reorder-point-eoq-calculator', { ...v, service: '97.5' }, 'Safety stock'), '39.2 units');
});
test('reorder: purchase cost included only when > 0; worked example', () => {
  const v = defaults('reorder-point-eoq-calculator');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Economic order quantity (EOQ)'), '547.7 units');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Orders per year'), '21.91');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Average daily demand'), '32.88 units/day');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Safety stock'), '52.2 units');
  assert.equal(val('reorder-point-eoq-calculator', v, 'Reorder point (ROP)'), '282.4 units');
  // 2*sqrt(300000)... ordering = holding = 1095.445 -> 2,190.89 ; + 12000*20 = 242,190.89
  assert.equal(val('reorder-point-eoq-calculator', v, 'Total annual cost incl. purchases'), '242,190.89');
  assert.ok(!C['reorder-point-eoq-calculator']({ ...v, unitCost: '0' }).some(r => r.label.includes('purchases')));
  const ex = VIRAL_ECOM2[0].content.example!;
  for (const s of ['547.7', '21.91', '32.88', '230.1', '52.2', '282.4']) assert.ok(ex.includes(s), s);
});
test('reorder invalid input', () => {
  const v = defaults('reorder-point-eoq-calculator');
  assert.equal(C['reorder-point-eoq-calculator']({ ...v, holdingCost: '0' })[0].label, 'Check inputs');
  assert.equal(C['reorder-point-eoq-calculator']({ ...v, annualDemand: '' })[0].label, 'Check inputs');
  assert.equal(C['reorder-point-eoq-calculator']({ ...v, service: '50' })[0].label, 'Check inputs');
});

// ---- BOGO ----
test('percent off: 30% margin with 20% off needs +200% (m=30, d=20 -> d/(m-d)=2)', () => {
  const v = { price: '100', cost: '70', offer: 'pct', percentOff: '20', units: '100' };
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Break-even volume uplift'), '+200%');
  // unit profit 80-70=10; baseline 30*100=3000; need 300 units
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Units needed to match profit'), '300');
});
test('BOGO price 10 cost 4: profit/unit = (10-8)/2 = 1; baseline 6/unit', () => {
  const v = { price: '10', cost: '4', offer: 'bogo', units: '100' };
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Profit per unit (under offer)'), '1');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Units needed to match profit'), '600');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Break-even volume uplift'), '+500%');
});
test('B2G1 price 30 cost 10 -> (60-30)/3=10 ; baseline 20 ; custom 2/1 identical', () => {
  const v = { price: '30', cost: '10', offer: 'b2g1', units: '90' };
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Profit per unit (under offer)'), '10');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Effective discount'), '33.33%');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Break-even volume uplift'), '+100%');
  assert.deepEqual(C['bogo-discount-breakeven-calculator']({ ...v, offer: 'custom', buy: '2', free: '1' }), C['bogo-discount-breakeven-calculator'](v));
});
test('BOGO no-compensation guard and worked example', () => {
  // price 10 cost 5 BOGO: (10-10)/2 = 0 -> cannot compensate
  const r = C['bogo-discount-breakeven-calculator']({ price: '10', cost: '5', offer: 'bogo', units: '100' });
  assert.match(r[0].value, /No volume can compensate/);
  assert.ok(!r.some(x => /NaN|Infinity/.test(x.value)));
  const v = defaults('bogo-discount-breakeven-calculator');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Baseline profit per period'), '14,000');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Units needed to match profit'), '1,750');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Extra units needed'), '1,250');
  assert.equal(val('bogo-discount-breakeven-calculator', v, 'Break-even volume uplift'), '+250%');
  const ex = VIRAL_ECOM2[1].content.example!;
  for (const s of ['14,000', '1,750', '1,250', '+250%']) assert.ok(ex.includes(s), s);
});
test('BOGO invalid input', () => {
  const v = defaults('bogo-discount-breakeven-calculator');
  assert.equal(C['bogo-discount-breakeven-calculator']({ ...v, cost: '40' })[0].label, 'Check inputs');
  assert.equal(C['bogo-discount-breakeven-calculator']({ ...v, offer: 'pct', percentOff: '100' })[0].label, 'Check inputs');
  assert.equal(C['bogo-discount-breakeven-calculator']({ ...v, units: '0' })[0].label, 'Check inputs');
});

// ---- price elasticity ----
test('midpoint elasticity: 100->80 qty, 10->12 price. dQ=-20/90, dP=2/11 -> E=-1.222', () => {
  const v = { p1: '10', q1: '100', p2: '12', q2: '80', cost: '0' };
  assert.equal(val('price-elasticity-calculator', v, 'Arc (midpoint) elasticity E'), '-1.222');
  assert.equal(val('price-elasticity-calculator', v, 'Classification'), 'Elastic (|E| > 1)');
  // revenue 1000 -> 960 = -4%
  assert.equal(val('price-elasticity-calculator', v, 'Revenue change'), '-4%');
});
test('symmetry and unit elasticity: Q 100->50? E for P 2->4,Q 60->20 ; unit case', () => {
  const a = { p1: '10', q1: '100', p2: '12', q2: '80', cost: '0' };
  const b = { p1: '12', q1: '80', p2: '10', q2: '100', cost: '0' };
  assert.equal(val('price-elasticity-calculator', a, 'Arc (midpoint) elasticity E'), val('price-elasticity-calculator', b, 'Arc (midpoint) elasticity E'));
  // P 8->12 (dP = 4/10 = .4), Q 120->80 (dQ = -40/100 = -.4) -> E=-1 unit elastic
  const u = { p1: '8', q1: '120', p2: '12', q2: '80', cost: '0' };
  assert.equal(val('price-elasticity-calculator', u, 'Arc (midpoint) elasticity E'), '-1');
  assert.equal(val('price-elasticity-calculator', u, 'Classification'), 'Unit elastic (|E| = 1)');
  // inelastic: P 10->11 (2/21*... ) Q 100->99: dQ=-1/99.5, dP=1/10.5 -> E=-0.106
  const i = { p1: '10', q1: '100', p2: '11', q2: '99', cost: '0' };
  assert.equal(val('price-elasticity-calculator', i, 'Classification'), 'Inelastic (|E| < 1)');
});
test('Lerner price: E=-2 style check and not-defined guard; worked example', () => {
  // E exactly -2: P 10->12 -> dP=2/11; need dQ=-4/11: Q 150->100? dQ=-50/125=-0.4 no. Use Q1=70,Q2=... choose dQ=-4/11 => Q2/Q1 = (1-2/11)/(1+2/11)=9/13 -> Q1=130,Q2=90
  const v = { p1: '10', q1: '130', p2: '12', q2: '90', cost: '10' };
  assert.equal(val('price-elasticity-calculator', v, 'Arc (midpoint) elasticity E'), '-2');
  // P* = 10 * (-2)/(1-2) = 20
  assert.equal(val('price-elasticity-calculator', v, 'Profit-maximising price P* = c·E/(1+E)'), '20');
  // inelastic -> not defined
  const w = C['price-elasticity-calculator']({ p1: '10', q1: '100', p2: '11', q2: '99', cost: '5' });
  assert.match(w[w.length - 1].value, /Not defined/);
  const d = defaults('price-elasticity-calculator');
  assert.equal(val('price-elasticity-calculator', d, 'Arc (midpoint) elasticity E'), '-1.941');
  assert.equal(val('price-elasticity-calculator', d, 'Revenue after'), '8,400');
  assert.equal(val('price-elasticity-calculator', d, 'Revenue change'), '-16%');
  assert.equal(val('price-elasticity-calculator', d, 'Profit-maximising price P* = c·E/(1+E)'), '12.38');
  const ex = VIRAL_ECOM2[2].content.example!;
  for (const s of ['−1.941', '8,400', '−16%', '12.38', '−35.29%', '18.18%']) assert.ok(ex.includes(s), s);
});
test('elasticity invalid input', () => {
  const d = defaults('price-elasticity-calculator');
  assert.equal(C['price-elasticity-calculator']({ ...d, p2: d.p1 })[0].label, 'Check inputs');
  assert.equal(C['price-elasticity-calculator']({ ...d, q1: '0' })[0].label, 'Check inputs');
  assert.equal(C['price-elasticity-calculator']({ ...d, p1: '-3' })[0].label, 'Check inputs');
});

// ---- EV charging ----
test('EV: 60 kWh 20-80% at 7.4 kW, 90% -> 36 kWh added, 40 kWh grid, 5h24', () => {
  const v = { battery: '60', start: '20', target: '80', chargerKw: '7.4', carKw: '11', eff: '90', tariff: '0.25', consumption: '16' };
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Energy added to battery'), '36 kWh');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Energy drawn from grid'), '40 kWh');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Charging time'), '5.41 h (5 h 24 min)');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Cost of this charge'), '10');
});
test('EV: car limit caps power; 100% efficiency; simple arithmetic', () => {
  // 50 kWh, 0->100, 22 kW charger but 7 kW car, eff 100 -> 50/7 = 7.142857 h = 7h09
  const v = { battery: '50', start: '0', target: '100', chargerKw: '22', carKw: '7', eff: '100', tariff: '0.2', consumption: '20' };
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Effective charge power (limit)'), '7 kW');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Charging time'), '7.14 h (7 h 9 min)');
  // cost 50*0.2=10 ; per 100km 20*0.2=4 ; range 50/20*100=250 km
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Cost of this charge'), '10');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Cost per 100 km'), '4');
  assert.equal(val('ev-home-charging-time-cost-calculator', v, 'Estimated range added'), '250 km');
  assert.equal(fmtHm(2.5), '2 h 30 min');
});
test('EV worked example matches content', () => {
  const d = defaults('ev-home-charging-time-cost-calculator');
  assert.equal(val('ev-home-charging-time-cost-calculator', d, 'Cost per 100 km'), '4.44');
  assert.equal(val('ev-home-charging-time-cost-calculator', d, 'Estimated range added'), '225 km');
  const ex = VIRAL_ECOM2[3].content.example!;
  for (const s of ['36 kWh', '40 kWh', '5.41 h', '5 h 24 min', '225 km']) assert.ok(ex.includes(s), s);
  assert.equal(numOf(val('ev-home-charging-time-cost-calculator', d, 'Cost of this charge')), 10);
});
test('EV invalid input', () => {
  const d = defaults('ev-home-charging-time-cost-calculator');
  assert.equal(C['ev-home-charging-time-cost-calculator']({ ...d, target: '20' })[0].label, 'Check inputs');
  assert.equal(C['ev-home-charging-time-cost-calculator']({ ...d, eff: '0' })[0].label, 'Check inputs');
  assert.equal(C['ev-home-charging-time-cost-calculator']({ ...d, chargerKw: 'abc' })[0].label, 'Check inputs');
  assert.equal(C['ev-home-charging-time-cost-calculator']({ ...d, target: '120' })[0].label, 'Check inputs');
});
