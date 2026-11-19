import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_INDIA, indianWords, indianGroup } from '../lib/calc/viral/india';
import { VIRAL_INDIA } from '../lib/registry/viralIndia';

const run = (slug: string, v: Record<string, any>) => COMPUTES_INDIA[slug](v);
const val = (r: { label: string; value: string }[], label: string) => r.find((x) => x.label === label)?.value;
const main = (r: { value: string; main?: boolean }[]) => r.find((x) => x.main)?.value;
const RUPEE = 'rupee-number-to-words-converter', NEG = 'exam-negative-marking-calculator', ATT = 'attendance-percentage-calculator';
const defaults = (slug: string) => Object.fromEntries((VIRAL_INDIA.find((t) => t.slug === slug)!.fields || []).map((f) => [f.key, String(f.def)]));

test('registry and compute keys match', () => {
  assert.deepEqual(VIRAL_INDIA.map((t) => t.slug).sort(), Object.keys(COMPUTES_INDIA).sort());
  for (const t of VIRAL_INDIA) { assert.ok(t.content.faqs.length >= 4); assert.ok(t.related.length <= 4); assert.equal(t.content.howSteps?.length, 3); }
});

test('defaults: no NaN/Infinity and main set', () => {
  for (const t of VIRAL_INDIA) {
    const r = run(t.slug, defaults(t.slug));
    assert.ok(r.length <= 8);
    assert.ok(r.some((x) => x.main));
    for (const x of r) assert.doesNotMatch(x.value, /NaN|Infinity|∞/);
    assert.notEqual(r[0].label, 'Check inputs');
  }
});

// ---- rupee words ----
test('rupee: reference vectors', () => {
  // Hand-derived from Indian place values: 1 Lakh = 1,00,000; 1 Crore = 1,00,00,000.
  assert.equal(main(run(RUPEE, { amount: '0' })), 'Zero Rupees Only');
  assert.equal(main(run(RUPEE, { amount: '1' })), 'One Rupee Only');
  assert.equal(main(run(RUPEE, { amount: '100000' })), 'One Lakh Rupees Only');
  assert.equal(main(run(RUPEE, { amount: '10000000' })), 'One Crore Rupees Only');
  assert.equal(main(run(RUPEE, { amount: '0.25' })), 'Twenty Five Paise Only');
  assert.equal(main(run(RUPEE, { amount: '₹ 1,05,000.50' })), 'One Lakh Five Thousand Rupees and Fifty Paise Only');
  assert.equal(main(run(RUPEE, { amount: '100' })), 'One Hundred Rupees Only');
  assert.equal(main(run(RUPEE, { amount: '119' })), 'One Hundred Nineteen Rupees Only');
  // 12 nines: 99,999 crore + 99 lakh + 99 thousand + 999
  assert.equal(main(run(RUPEE, { amount: '999999999999' })), 'Ninety Nine Thousand Nine Hundred Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine Rupees Only');
});
test('rupee: grouping, rounding half up, cheque line', () => {
  assert.equal(indianGroup('1234567'), '12,34,567');
  assert.equal(indianGroup('999'), '999');
  assert.equal(indianGroup('10000000'), '1,00,00,000');
  assert.equal(val(run(RUPEE, { amount: '10.995' }), 'Indian format'), '₹11.00');
  assert.equal(val(run(RUPEE, { amount: '10.994' }), 'Indian format'), '₹10.99');
  assert.equal(val(run(RUPEE, { amount: '0.995' }), 'Indian format'), '₹1.00');
  assert.equal(val(run(RUPEE, { amount: '1234567.89' }), 'Cheque-style line'), 'Rupees Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven and Eighty Nine Paise Only');
  assert.equal(indianWords(21), 'Twenty One');
});
test('rupee: invalid input', () => {
  for (const a of ['', 'abc', '-5', '1.2.3', '1234567890123', '.']) {
    const r = run(RUPEE, { amount: a });
    assert.equal(r[0].label, 'Check inputs', a);
  }
});
test('rupee: content example matches', () => {
  const r = run(RUPEE, { amount: '1234567.89' });
  const ex = VIRAL_INDIA[0].content.example!;
  assert.ok(ex.includes(main(r)!));
  assert.ok(ex.includes(val(r, 'Indian format')!));
});

// ---- negative marking ----
const neg = (total: any, correct: any, wrong: any, mpos: any, mneg: any, max: any = '') => run(NEG, { total, correct, wrong, mpos, mneg, max });
test('negative marking: reference vectors', () => {
  // 120*4 - 40*1 = 440; accuracy 120/160 = 75%; break-even 1/(4+1) = 20%
  const a = neg(180, 120, 40, 4, 1, 720);
  assert.equal(main(a), '440 marks');
  assert.equal(val(a, 'Accuracy (of attempted)'), '75%');
  assert.equal(val(a, 'Break-even accuracy for a guess'), '20%');
  assert.equal(val(a, 'Marks lost to negative marking'), '40 marks');
  assert.equal(val(a, 'Unattempted'), '20 questions');
  // 50 correct, 20 wrong, +1/-0.25 => 50 - 5 = 45; break-even 0.25/1.25 = 20%
  const b = neg(100, 50, 20, 1, 0.25);
  assert.equal(main(b), '45 marks');
  assert.equal(val(b, 'Break-even accuracy for a guess'), '20%');
  assert.equal(val(b, 'Score as % of maximum'), '45% of 100');
  // +3/-1 => 25%; 10 correct 10 wrong => 20 marks; accuracy 50%
  const c = neg(20, 10, 10, 3, 1);
  assert.equal(main(c), '20 marks');
  assert.equal(val(c, 'Break-even accuracy for a guess'), '25%');
  assert.equal(val(c, 'Accuracy (of attempted)'), '50%');
  // more wrong than correct can go negative: 2*4 - 10*1 = -2
  assert.equal(main(neg(30, 2, 10, 4, 1)), '-2 marks');
  // nothing attempted: no division by zero
  assert.equal(val(neg(30, 0, 0, 4, 1), 'Accuracy (of attempted)'), 'n/a (nothing attempted)');
  // no penalty => break-even 0
  assert.equal(val(neg(30, 10, 5, 2, 0), 'Break-even accuracy for a guess'), '0%');
});
test('negative marking: invalid input', () => {
  assert.equal(neg(10, 8, 5, 4, 1)[0].label, 'Check inputs');
  assert.equal(neg(10, 5, 2, 0, 1)[0].label, 'Check inputs');
  assert.equal(neg(10, 5, 2, 4, -1)[0].label, 'Check inputs');
  assert.equal(neg(0, 0, 0, 4, 1)[0].label, 'Check inputs');
  assert.equal(neg(10, 'x', 2, 4, 1)[0].label, 'Check inputs');
  assert.equal(neg(10, 2.5, 2, 4, 1)[0].label, 'Check inputs');
});
test('negative marking: content example matches', () => {
  const r = neg(180, 120, 40, 4, 1, 720);
  const ex = VIRAL_INDIA[1].content.example!;
  for (const s of [num0(main(r)!), val(r, 'Accuracy (of attempted)')!, '88.89%', val(r, 'Break-even accuracy for a guess')!]) assert.ok(ex.includes(s), s);
  assert.ok(val(r, 'Attempt rate')!.startsWith('88.89%'));
});
const num0 = (s: string) => s.replace(' marks', '');

// ---- attendance ----
const att = (attended: any, total: any, required: any, remaining: any = '') => run(ATT, { attended, total, required, remaining });
test('attendance: reference vectors', () => {
  // 50/100 at 75%: x = (7500-5000)/25 = 100; check 150/200 = 75%
  assert.equal(val(att(50, 100, 75), 'Classes to attend in a row'), '100 (to reach 75%)');
  // 70/100: x = (7500-7000)/25 = 20; 90/120 = 75%
  assert.equal(val(att(70, 100, 75), 'Classes to attend in a row'), '20 (to reach 75%)');
  // 80/100: floor(8000/75 - 100) = floor(6.67) = 6; 80/106 = 75.47%, 80/107 = 74.77%
  assert.equal(val(att(80, 100, 75), 'Classes you can still miss'), '6 (stays at or above 75%)');
  // exactly 75%: can miss 0
  assert.equal(val(att(75, 100, 75), 'Classes you can still miss'), '0 (stays at or above 75%)');
  assert.equal(val(att(75, 100, 75), 'Current attendance'), '75% (75 of 100)');
  // 60/90 with 30 remaining: attend all 90/120 = 75%, miss all 60/120 = 50%, may miss 60+30-0.75*120 = 0
  const p = att(60, 90, 75, 30);
  assert.equal(val(p, 'If you attend all 30 remaining'), '75%');
  assert.equal(val(p, 'If you miss all 30 remaining'), '50%');
  assert.equal(val(p, 'Most you can miss of the remaining'), '0 of 30');
  // 90/100 with 20 remaining at 75%: may miss floor(110 - 0.75*120) = 20 of 20? 110-90 = 20
  assert.equal(val(att(90, 100, 75, 20), 'Most you can miss of the remaining'), '20 of 20');
  // 10/40 req 75 with 4 remaining: attend all 14/44 = 31.82% => unreachable
  assert.equal(val(att(10, 40, 75, 4), 'Target reachable by term end?'), 'No, even attending all gives 31.82%');
});
test('attendance: invalid input', () => {
  assert.equal(att(10, 0, 75)[0].label, 'Check inputs');
  assert.equal(att(11, 10, 75)[0].label, 'Check inputs');
  assert.equal(att(5, 10, 100)[0].label, 'Check inputs');
  assert.equal(att(5, 10, 0)[0].label, 'Check inputs');
  assert.equal(att(5, 10, 75, -1)[0].label, 'Check inputs');
  assert.equal(att('', 10, 75)[0].label, 'Check inputs');
  assert.equal(att(2.5, 10, 75)[0].label, 'Check inputs');
});
test('attendance: content example matches', () => {
  const r = att(60, 90, 75, 30);
  const ex = VIRAL_INDIA[2].content.example!;
  assert.ok(ex.includes('66.67%'));
  assert.equal(val(r, 'Current attendance'), '66.67% (60 of 90)');
  assert.equal(val(r, 'Classes to attend in a row'), '30 (to reach 75%)');
  assert.ok(ex.includes('= 30') && ex.includes('90 of 120 = 75%'));
  assert.equal(val(r, 'If you miss all 30 remaining'), '50%');
  assert.ok(ex.includes('gives 50%'));
});
