import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_ECOM1, erfc, twoSidedP } from '../lib/calc/viral/ecom1';
import { VIRAL_ECOM1 } from '../lib/registry/viralEcom1';

const defaults = (slug: string) => {
  const t = VIRAL_ECOM1.find(x => x.slug === slug)!;
  return Object.fromEntries((t.fields || []).map(f => [f.key, String(f.def)]));
};
const run = (slug: string, over: Record<string, any> = {}) => COMPUTES_ECOM1[slug]({ ...defaults(slug), ...over });
const row = (r: { label: string; value: string }[], re: RegExp) => r.find(x => re.test(x.label))!.value;
const bad = (r: { label: string }[]) => r.length === 1 && r[0].label === 'Check inputs';
const COD = 'cod-vs-prepaid-rto-breakeven-calculator', VOL = 'volumetric-weight-calculator', MER = 'ecommerce-mer-break-even-roas-calculator', AB = 'ab-test-significance-calculator';

test('registry metadata and defaults', () => {
  assert.equal(VIRAL_ECOM1.length, 4);
  for (const t of VIRAL_ECOM1) {
    assert.ok(COMPUTES_ECOM1[t.slug]);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, t.slug + ' meta ' + t.metaDescription!.length);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]), t.slug);
    assert.ok(t.content.intro.split(/\s+/).length >= 35 && t.content.faqs.length >= 4 && t.related.length <= 4);
    const r = run(t.slug);
    assert.ok(r.some(x => x.main) && r.length <= 8);
    assert.ok(!r.some(x => /NaN|Infinity|∞/.test(x.value + x.label)), t.slug);
    assert.ok(!r.some(x => x.label === 'Check inputs'));
  }
});

test('COD vs prepaid', () => {
  // Hand: Dc=999-350-70-30=549; L=70+70+0=140; Ecod=.7*549-.3*140=342.3
  // Dp=959*.98-420=519.82; Epre=.95*519.82-.05*140=486.829; diff=144.529; BE=(549-486.829)/689=9.0233%
  const r = run(COD);
  assert.equal(row(r, /per COD/), '342.3');
  assert.equal(row(r, /per prepaid/), '486.83');
  assert.equal(row(r, /Prepaid minus/), '+144.53');
  assert.equal(row(r, /Break-even/), '9.02%');
  assert.equal(row(r, /Loss on one/), '140');
  // Equal RTO, no fees/discount: price100 cost40 fwd10 ret10 -> both 60*0.9-... identical -> diff 0
  const e = run(COD, { price: 100, cost: 40, fwd: 10, ret: 10, codFee: 0, gateway: 0, codRto: 20, prepaidRto: 20, discount: 0 });
  assert.equal(row(e, /Prepaid minus/), '+0');
  assert.equal(row(e, /Better/), 'Equal');
  // Break-even consistency: at 9.0233% COD RTO the profits match. Dc=50,L=20 (rec 100%), r=(50-Epre)/70; Epre=0.9*50-0.1*20=43 -> r=10%
  const b = run(COD, { price: 100, cost: 40, fwd: 10, ret: 10, codFee: 0, gateway: 0, codRto: 10, prepaidRto: 10, discount: 0 });
  assert.equal(row(b, /Break-even/), '10%');
  // Recovery 0%: L = 70+70+350 = 490
  assert.equal(row(run(COD, { recovery: 0 }), /Loss on one/), '490');
  assert.ok(bad(run(COD, { price: 0 })) && bad(run(COD, { codRto: 120 })) && bad(run(COD, { discount: 5000 })) && bad(run(COD, { price: 'abc' })));
});

test('volumetric weight', () => {
  // 50*40*30=60000 cm3 /5000 = 12 kg; 8kg actual -> 12; x10 = 120; CBM .06, .6; freight 600
  const r = run(VOL);
  assert.equal(row(r, /Volumetric weight per/), '12 kg');
  assert.equal(row(r, /Chargeable weight per/), '12 kg');
  assert.equal(row(r, /Binding/), 'Volumetric');
  assert.equal(row(r, /Total chargeable/), '120 kg');
  assert.equal(row(r, /CBM per/), '0.06 m³');
  assert.equal(row(r, /Total CBM/), '0.6 m³');
  assert.equal(row(r, /Freight/), '600');
  // Heavy small box: 10x10x10 =1000/5000=0.2 kg < 5 kg actual
  const h = run(VOL, { l: 10, w: 10, h: 10, actual: 5, qty: 1 });
  assert.equal(row(h, /Binding/), 'Actual');
  assert.equal(row(h, /Chargeable weight per/), '5 kg');
  // Inches: 20x16x12 in = 50.8*40.64*30.48 = 62926.32576 cm3 /5000 = 12.585 kg
  assert.equal(row(run(VOL, { unit: 'in', l: 20, w: 16, h: 12 }), /Volumetric weight per/), '12.585 kg');
  // 1 m cube = 1 CBM
  assert.equal(row(run(VOL, { l: 100, w: 100, h: 100, qty: 1 }), /CBM per/), '1 m³');
  assert.ok(bad(run(VOL, { l: 0 })) && bad(run(VOL, { divisor: 0 })) && bad(run(VOL, { qty: 0 })));
});

test('MER / break-even ROAS', () => {
  // AOV=100; CM=100*.6-12=48; BE ROAS=100/48=2.0833; MER=50000/12000=4.1667; CPA=24; profit=500*48-12000=12000; target CPA=48-10=38
  const r = run(MER);
  assert.equal(row(r, /Break-even ROAS/), '2.08x');
  assert.equal(row(r, /Break-even CPA/), '48');
  assert.equal(row(r, /MER/), '4.17x');
  assert.equal(row(r, /Actual CPA/), '24');
  assert.equal(row(r, /Net profit/), '12,000');
  assert.equal(row(r, /Target CPA/), '38');
  // Blueprint example: AOV 100, 40% margin -> ROAS 2.5, CPA 40
  const b = run(MER, { gm: 40, varCost: 0 });
  assert.equal(row(b, /Break-even ROAS/), '2.5x');
  assert.equal(row(b, /Break-even CPA/), '40');
  assert.ok(bad(run(MER, { gm: 10, varCost: 20 })) && bad(run(MER, { adSpend: 0 })) && bad(run(MER, { orders: 0 })));
});

test('erfc / p-values', () => {
  // Published normal-table values (two-sided): z=1.96 -> 0.0499958, z=1 -> 0.3173105, z=3 -> 0.0026998, z=5 -> 5.733e-7
  assert.ok(Math.abs(twoSidedP(1.96) - 0.04999579) < 1e-8);
  assert.ok(Math.abs(twoSidedP(1) - 0.3173105079) < 1e-9);
  assert.ok(Math.abs(twoSidedP(3) - 0.0026997961) < 1e-9);
  assert.ok(Math.abs(twoSidedP(5) / 5.733031e-7 - 1) < 1e-5);
  assert.ok(Math.abs(twoSidedP(2.5758293035) - 0.01) < 1e-9);
  assert.equal(erfc(0), 1);
  assert.ok(Math.abs(erfc(0.5) - 0.4795001222) < 1e-9);
});

test('A/B test', () => {
  // pool=1070/20000; se=sqrt(pool(1-pool)*2/10000)=0.003182; z=.007/se=2.1996; p=0.02783
  const r = run(AB);
  assert.equal(row(r, /Significant/), 'Yes (p < 0.05)');
  assert.equal(row(r, /p-value/), '0.0278');
  assert.equal(row(r, /z statistic/), '2.2');
  assert.equal(row(r, /Absolute/), '+0.7 pp');
  assert.equal(row(r, /Relative/), '+14%');
  assert.equal(row(r, /CI/), '0.08 to 1.32 pp');
  // Same data at 99% -> not significant (p .0278 > .01)
  assert.match(row(run(AB, { confidence: '99' }), /Significant/), /^No/);
  // Identical groups: z=0, p=1
  const z = run(AB, { xB: 500 });
  assert.equal(row(z, /p-value/), '1');
  assert.equal(row(z, /z statistic/), '0');
  // Textbook-style: 200/1000 vs 240/1000 -> pool .22, se=sqrt(.22*.78*.002)=.018526, z=2.1592, p=.0308
  const t = run(AB, { nA: 1000, xA: 200, nB: 1000, xB: 240 });
  assert.equal(row(t, /z statistic/), '2.159');
  assert.equal(row(t, /p-value/), '0.0308');
  assert.ok(bad(run(AB, { xA: 0, xB: 0 })) && bad(run(AB, { xA: 20000 })) && bad(run(AB, { nA: 0 })) && bad(run(AB, { xA: -1 })));
});

test('content.example quotes match output', () => {
  const ex = (s: string) => VIRAL_ECOM1.find(t => t.slug === s)!.content.example!;
  for (const q of ['342.3', '486.83', '144.53', '9.02%', '140']) assert.ok(ex(COD).includes(q), q);
  for (const q of ['12 kg', '120 kg', '0.6 m³', '0.06 m³', '600']) assert.ok(ex(VOL).includes(q), q);
  for (const q of ['2.08x', '4.17x', '12,000', '38', '48']) assert.ok(ex(MER).includes(q), q);
  for (const q of ['0.0278', '2.2', '+14%', '0.08 to 1.32']) assert.ok(ex(AB).includes(q), q);
});
