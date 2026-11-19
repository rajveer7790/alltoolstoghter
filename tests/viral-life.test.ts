import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_LIFE as C, acChartBtu, screenWidth, distanceForFov, fovForDistance, bakersSolve, decay, vdotOf, timeForVdot } from '../lib/calc/viral/life';
import { VIRAL_LIFE } from '../lib/registry/viralLife';

const near = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}`);
const defaults = (slug: string) => {
  const t = VIRAL_LIFE.find(x => x.slug === slug)!;
  return Object.fromEntries((t.fields ?? []).map(f => [f.key, String(f.def ?? '')]));
};
const run = (slug: string, over: Record<string, string> = {}) => C[slug]({ ...defaults(slug), ...over });
const val = (rs: { label: string; value: string }[], label: string) => rs.find(r => r.label.startsWith(label))?.value;

test('every tool: defaults valid, main set, no NaN/Infinity, metadata sane', () => {
  assert.equal(VIRAL_LIFE.length, 6);
  for (const t of VIRAL_LIFE) {
    const rs = run(t.slug);
    assert.ok(rs.length <= 8 && rs.some(r => r.main), t.slug);
    assert.ok(!rs.some(r => r.label === 'Check inputs'), t.slug);
    for (const r of rs) assert.ok(!/NaN|Infinity|∞/.test(r.label + r.value), t.slug);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    const md = t.metaDescription!.length;
    assert.ok(md >= 120 && md <= 158, `${t.slug} meta ${md}`);
    assert.ok(t.content.faqs.length >= 4 && t.content.howSteps!.length === 3 && t.related.length <= 4);
    assert.ok(t.content.intro.split(' ').length >= 35, t.slug);
    assert.ok(t.keywords[0] === t.keywords[0].toLowerCase());
  }
});

test('ac: chart lookups (ENERGY STAR chart rows) and adjustments', () => {
  assert.equal(acChartBtu(100), 5000);
  assert.equal(acChartBtu(150), 5000);
  assert.equal(acChartBtu(151), 6000);
  assert.equal(acChartBtu(2500), 34000);
  assert.equal(acChartBtu(99), null);
  assert.equal(acChartBtu(2501), null);
  // 200 sq ft -> 6,000; shaded -10% = 5,400; 2 people no extra; no kitchen
  assert.equal(val(run('ac-btu-room-size-calculator', { area: '200', sun: 'shaded', people: '2' }), 'Estimated'), '5,400 BTU/h');
  // 120 sq ft kitchen -> 5,000 + 4,000 = 9,000 BTU/h = 0.75 tons
  const k = run('ac-btu-room-size-calculator', { area: '120', sun: 'normal', people: '1', kitchen: 'yes' });
  assert.equal(val(k, 'Estimated'), '9,000 BTU/h'); assert.equal(val(k, 'Tons'), '0.75 tons');
  // 30 m2 = 322.917 sq ft -> 8,000 BTU/h row (300-350)
  assert.equal(val(run('ac-btu-room-size-calculator', { area: '30', unit: 'sqm', sun: 'normal', people: '2' }), 'Estimated'), '8,000 BTU/h');
});
test('ac: invalid and example', () => {
  assert.equal(run('ac-btu-room-size-calculator', { area: '50' })[0].label, 'Check inputs');
  assert.equal(run('ac-btu-room-size-calculator', { area: '3000' })[0].label, 'Check inputs');
  assert.equal(run('ac-btu-room-size-calculator', { area: '' })[0].label, 'Check inputs');
  const r = run('ac-btu-room-size-calculator');
  assert.equal(val(r, 'Estimated'), '8,900 BTU/h'); assert.equal(val(r, 'Tons'), '0.74 tons'); assert.equal(val(r, 'Cooling'), '2.61 kW');
});

test('tv: geometry vectors', () => {
  // 3-4-5 triangle: 5" diagonal 4:3 -> width 4
  near(screenWidth(5, 4, 3), 4, 1e-9);
  // distance = half width when FOV = 90 deg (tan 45 = 1): width 4 -> 2
  near(distanceForFov(4, 90), 2, 1e-9);
  near(fovForDistance(4, 2), 90, 1e-9);
  // 65" 16:9: width = 65*16/sqrt(337) = 56.65; d30 = 28.327/tan 15deg(0.267949) = 105.72
  near(screenWidth(65, 16, 9), 56.6524, 1e-3);
  near(distanceForFov(screenWidth(65, 16, 9), 30), 105.72, 0.01);
  const r = run('tv-viewing-distance-calculator', { diag: '5', aspect: '4:3', fov: '90', dist: '2' });
  assert.equal(val(r, 'Distance for 90'), '2 in');
  assert.equal(val(r, 'Field of view from'), '90°');
});
test('tv: invalid and example', () => {
  assert.equal(run('tv-viewing-distance-calculator', { diag: '0' })[0].label, 'Check inputs');
  assert.equal(run('tv-viewing-distance-calculator', { fov: '180' })[0].label, 'Check inputs');
  assert.equal(run('tv-viewing-distance-calculator', { aspect: 'custom', cw: '0' })[0].label, 'Check inputs');
  const r = run('tv-viewing-distance-calculator');
  assert.equal(val(r, 'Distance for 30'), '105.7 in'); assert.equal(val(r, 'Distance for 40'), '77.8 in');
  assert.equal(val(r, 'Distance for 50'), '60.7 in'); assert.equal(val(r, 'Screen width'), '56.7 × 31.9 in');
  assert.equal(val(r, 'Field of view from'), '31.6°');
});

test('coffee: arithmetic vectors', () => {
  // 20 g x 16 = 320 g water
  assert.equal(val(run('coffee-brew-ratio-calculator'), 'Brew water'), '320 g (320 ml)');
  // volume mode: 2 x 250 = 500 ml at 1:15 -> dose 33.333 g
  const v = run('coffee-brew-ratio-calculator', { mode: 'volume', ratio: '15' });
  assert.equal(val(v, 'Brew water'), '500 g (500 ml)'); assert.equal(val(v, 'Coffee dose'), '33.3 g');
  // EY = 1.4 * 290 / 20 = 20.3
  assert.ok(val(run('coffee-brew-ratio-calculator'), 'Extraction')!.startsWith('20.3%'));
  // espresso 18 g in, 36 g out, TDS 9% => EY = 9*36/18 = 18%
  assert.ok(val(run('coffee-brew-ratio-calculator', { dose: '18', ratio: '2', tds: '9', bevG: '36' }), 'Extraction')!.startsWith('18%'));
  // 20 g * (16 - 5) = 220
  assert.equal(val(run('coffee-brew-ratio-calculator'), 'Water to add'), '220 g');
});
test('coffee: invalid', () => {
  assert.equal(run('coffee-brew-ratio-calculator', { dose: '0' })[0].label, 'Check inputs');
  assert.equal(run('coffee-brew-ratio-calculator', { ratio: '0' })[0].label, 'Check inputs');
  assert.equal(run('coffee-brew-ratio-calculator', { targetRatio: '4' })[0].label, 'Check inputs');
  assert.equal(run('coffee-brew-ratio-calculator', { mode: 'volume', cups: '0' })[0].label, 'Check inputs');
});

test("baker's: hand-derived vectors", () => {
  // no starter: 1000/(1+0.65+0.02)=598.8 flour, water 389.2
  let r = bakersSolve(1000, 65, 2, 0, 100);
  near(r.flour, 598.802, 0.001); near(r.water, 389.222, 0.001);
  // 100% hydration, no salt: 500 flour + 500 water
  r = bakersSolve(1000, 100, 0, 0, 100); near(r.flour, 500, 1e-9); near(r.water, 500, 1e-9);
  // + 20% starter at 100%: starter 100 g = 50 flour + 50 water; add 450 + 450
  r = bakersSolve(1000, 100, 0, 20, 100);
  near(r.starter, 100, 1e-9); near(r.addFlour, 450, 1e-9); near(r.addWater, 450, 1e-9);
  near(r.addFlour + r.addWater + r.saltG + r.starter, 1000, 1e-9);
});
test("baker's: invalid and example", () => {
  assert.equal(run('sourdough-bakers-percentage-calculator', { total: '0' })[0].label, 'Check inputs');
  assert.equal(run('sourdough-bakers-percentage-calculator', { hydration: '10' })[0].label, 'Check inputs');
  assert.equal(run('sourdough-bakers-percentage-calculator', { hydration: '50', starterPct: '100', starterHyd: '200' })[0].label, 'Check inputs');
  const r = run('sourdough-bakers-percentage-calculator');
  assert.equal(val(r, 'Total flour'), '581.4 g'); assert.equal(val(r, 'Flour to add'), '523.3 g');
  assert.equal(val(r, 'Water to add'), '348.8 g'); assert.equal(val(r, 'Salt'), '11.6 g');
  assert.ok(val(r, 'Starter')!.startsWith('116.3 g (58.1 g flour + 58.1 g water)'));
  assert.equal(val(r, 'Per dough ball'), '250 g');
});

test('caffeine: decay vectors', () => {
  near(decay(200, 5, 5), 100, 1e-9);   // one half-life
  near(decay(200, 10, 5), 50, 1e-9);   // two half-lives
  near(decay(200, 0, 5), 200, 1e-9);
  // two doses: 200 @5h + 100 @0h -> 100 + 100 = 200 mg; time to 50 mg = 5*log2(4)=10 h
  const r = run('caffeine-half-life-calculator', { dose2: '100', hours2: '0' });
  assert.equal(val(r, 'Caffeine remaining'), '200 mg'); assert.equal(val(r, 'Hours until'), '10 h');
  // already below threshold -> 0 h
  assert.equal(val(run('caffeine-half-life-calculator', { threshold: '150' }), 'Hours until'), '0 h');
});
test('caffeine: invalid and example', () => {
  assert.equal(run('caffeine-half-life-calculator', { dose: '0' })[0].label, 'Check inputs');
  assert.equal(run('caffeine-half-life-calculator', { halfLife: '0' })[0].label, 'Check inputs');
  assert.equal(run('caffeine-half-life-calculator', { threshold: '0' })[0].label, 'Check inputs');
  const r = run('caffeine-half-life-calculator');
  assert.equal(val(r, 'Caffeine remaining'), '100 mg'); assert.equal(val(r, 'Share'), '50%'); assert.equal(val(r, 'Hours until'), '5 h');
});

test('vdot: published-table vectors and consistency', () => {
  // hand: 5K 20:00 -> v=250, VO2=-4.6+45.5645+6.5=47.4645; fraction=0.95297 -> 49.81
  near(vdotOf(5000, 20), 49.81, 0.05);
  // Daniels VDOT 50 table values recalled from memory, not re-verified online: 5K 19:57, marathon 3:10:49
  near(vdotOf(5000, 19 + 57 / 60), 50, 0.2);
  near(vdotOf(42195, 190 + 49 / 60), 50, 0.3);
  // round trip
  near(timeForVdot(10000, vdotOf(10000, 41.5))!, 41.5, 1e-6);
  const r = run('vdot-race-equivalency-calculator');
  const tenK = val(r, 'Equivalent 10K')!; assert.ok(['41:21', '41:28'].includes(tenK) || /^41:/.test(tenK));
});
test('vdot: invalid and example', () => {
  assert.equal(run('vdot-race-equivalency-calculator', { m: '0' })[0].label, 'Check inputs');
  assert.equal(run('vdot-race-equivalency-calculator', { m: '120' })[0].label, 'Check inputs');
  assert.equal(run('vdot-race-equivalency-calculator', { m: '5' })[0].label, 'Check inputs');
  const r = run('vdot-race-equivalency-calculator');
  assert.equal(val(r, 'VDOT'), '49.8'); assert.equal(val(r, 'Average pace'), '4:00 /km (6:26 /mile)');
  assert.equal(val(r, 'Equivalent 5K'), '20:00'); assert.equal(val(r, 'Equivalent 10K'), '41:28');
  assert.equal(val(r, 'Equivalent Half'), '1:31:50'); assert.equal(val(r, 'Equivalent Marathon'), '3:11:17');
});
