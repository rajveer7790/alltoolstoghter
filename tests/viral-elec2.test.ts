import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_ELEC2 as C, E24, E96, seriesValues, shRes, shTempK, betaRes, betaTempK } from '../lib/calc/viral/elec2';
import { VIRAL_ELEC2 } from '../lib/registry/viralElec2';

const defaults = (slug: string) => {
  const t = VIRAL_ELEC2.find((x) => x.slug === slug)!;
  const v: Record<string, string> = {};
  for (const f of t.fields ?? []) v[f.key] = String(f.def);
  return v;
};
const run = (slug: string, over: Record<string, string> = {}) => C[slug]({ ...defaults(slug), ...over });
const row = (r: { label: string; value: string }[], re: RegExp) => r.find((x) => re.test(x.label))!.value;
const approx = (a: number, b: number, tol: number) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}`);
const numOf = (s: string) => parseFloat(s.replace(/,/g, ''));

test('every tool has a compute fn, defaults are finite and main is set', () => {
  assert.equal(VIRAL_ELEC2.length, 5);
  for (const t of VIRAL_ELEC2) {
    const r = run(t.slug);
    assert.ok(r.some((x) => x.main), t.slug);
    assert.ok(r.length <= 8);
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.label + x.value), t.slug + ' ' + x.value);
    assert.notEqual(r[0].label, 'Check inputs');
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, t.slug + ' meta ' + t.metaDescription!.length);
    assert.ok(t.short.length <= 110 && t.name.length <= 60);
    assert.ok(t.content.faqs.length >= 4 && t.related.length <= 4);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0].split(' ').slice(0, 2).join(' ')));
  }
});

test('E24 / E96 tables', () => {
  assert.equal(E24.length, 24);
  assert.equal(E96.length, 96);
  for (const s of [E24, E96]) for (let i = 1; i < s.length; i++) assert.ok(s[i] > s[i - 1]);
  // spot values from IEC 60063
  assert.equal(E96[48], 3.16); assert.equal(E24[13], 3.6); assert.equal(E96[95], 9.76);
  // every E96 value is within 1% of the 10^(i/96) series (true values are rounded to 3 digits)
  E96.forEach((x, i) => approx(x / Math.pow(10, i / 96), 1, 0.006));
  assert.deepEqual(seriesValues(E24, 1000, 2200), [1000, 1100, 1200, 1300, 1500, 1600, 1800, 2000, 2200]);
});

test('i2c: reference vectors', () => {
  // Rp_min = (5-0.4)/0.003 = 1533.33 ohm ; Rp_max(fast,100pF) = 300e-9/(0.8473*100e-12) = 3540.7 ohm
  const r = run('i2c-pull-up-resistor-calculator', { vcc: '5', cb: '100', mode: 'fast' });
  assert.equal(row(r, /minimum/), '1.533 kΩ');
  assert.equal(row(r, /maximum/), '3.541 kΩ');
  // standard, 100pF: 1000e-9/(0.8473*100e-12) = 11802 ohm
  assert.equal(row(run('i2c-pull-up-resistor-calculator', { mode: 'std' }), /maximum/), '11.802 kΩ');
  // Fm+, 100pF: 120e-9/8.473e-11 = 1416.2 ohm
  assert.equal(row(run('i2c-pull-up-resistor-calculator', { mode: 'fmp', iol: '20' }), /maximum/), '1.416 kΩ');
  // Fm+ 20mA at 3.3V: min = 2.9/0.02 = 145 ohm
  assert.equal(row(run('i2c-pull-up-resistor-calculator', { mode: 'fmp', iol: '20' }), /minimum/), '145 Ω');
  assert.equal(ln(), 0.8473);
});
function ln() { return Math.round(Math.log(0.7 / 0.3) * 1e4) / 1e4; }

test('i2c: no valid value warns', () => {
  // Cb 1000 pF fast: max = 300e-9/(8.473e-10)= 354 ohm < min 967
  const r = run('i2c-pull-up-resistor-calculator', { cb: '1000' });
  assert.match(r[0].value, /reduce Cb or lower speed/);
});

test('i2c: invalid inputs', () => {
  for (const o of [{ vcc: '0' }, { vol: '5' }, { iol: '0' }, { cb: '-1' }, { cb: 'abc' }]) {
    const r = run('i2c-pull-up-resistor-calculator', o as unknown as Record<string, string>);
    assert.equal(r[0].label, 'Check inputs');
  }
});

test('timer: reference vectors', () => {
  // 72MHz/1kHz: total 72000 = 2*36000 (PSC=0 would need ARR+1=72000 > 65536) -> PSC 1, ARR 35999
  let r = run('timer-prescaler-calculator');
  assert.equal(row(r, /PSC/), '1'); assert.equal(row(r, /ARR/), '35,999'); assert.equal(row(r, /error/), '0 ppm');
  // 16MHz/1Hz: 16e6 = 2^10*5^6, smallest divisor >= 16e6/65536=244.14 is 250 -> N=64000
  r = run('timer-prescaler-calculator', { fclk: '16000000', ftarget: '1' });
  assert.equal(row(r, /PSC/), '249'); assert.equal(row(r, /ARR/), '63,999');
  // 8MHz/440Hz: 18181.82 -> nearest integer total 18182, error = -0.1818/18181.82 = -10.0 ppm, PSC 0
  r = run('timer-prescaler-calculator', { fclk: '8000000', ftarget: '440' });
  assert.equal(row(r, /PSC/), '0'); assert.equal(row(r, /ARR/), '18,181');
  approx(numOf(row(r, /error/)), -10.0, 0.05);
  // 32-bit: 16MHz/1Hz needs no prescaler
  r = run('timer-prescaler-calculator', { fclk: '16000000', ftarget: '1', width: '32' });
  assert.equal(row(r, /PSC/), '0'); assert.equal(row(r, /ARR/), '15,999,999');
});

test('timer: invalid inputs', () => {
  for (const o of [{ fclk: '0' }, { ftarget: '-5' }, { ftarget: '80000000' }, { fclk: '16000000', ftarget: '0.001' }, { fclk: 'x' }]) {
    assert.equal(run('timer-prescaler-calculator', o as unknown as Record<string, string>)[0].label, 'Check inputs');
  }
});

test('op-amp: reference vectors', () => {
  // inverting G=10, Rin=10k -> Rf=100k which is an E24 value (1.0 x 10^5): exact
  let r = run('op-amp-gain-calculator', { mode: 'inv', gain: '10' });
  assert.equal(row(r, /Nearest/), '100 kΩ'); assert.equal(row(r, /Gain error/), '0%'); assert.equal(row(r, /Achieved/), '-10 V/V');
  // non-inverting G=11, Rg=1k -> Rf = 10k exactly
  r = run('op-amp-gain-calculator', { gain: '11', rfixed: '1000' });
  assert.equal(row(r, /Nearest/), '10 kΩ');
  // non-inverting G=5, Rg=10k, E96: ideal 40k; nearest E96 is 40.2k -> gain 5.02, +0.4%
  r = run('op-amp-gain-calculator', { series: 'e96' });
  assert.equal(row(r, /Nearest/), '40.2 kΩ'); assert.equal(row(r, /Achieved/), '5.02 V/V'); assert.equal(row(r, /Gain error/), '0.4%');
  // GBW 1MHz / noise gain 4.9 = 204.08 kHz
  assert.equal(row(run('op-amp-gain-calculator'), /bandwidth/), '204.08 kHz');
});

test('op-amp: invalid inputs', () => {
  for (const o of [{ gain: '1' }, { gain: '0' }, { rfixed: '0' }, { gain: 'abc' }, { gbw: '-1' }]) {
    assert.equal(run('op-amp-gain-calculator', o as unknown as Record<string, string>)[0].label, 'Check inputs');
  }
});

test('ntc: reference vectors', () => {
  // T=0C: R = 10000*exp(3950*(1/273.15-1/298.15)) = 10000*exp(1.21254) = 33,622 ohm
  approx(betaRes(273.15, 10000, 298.15, 3950), 33622, 15);
  // T=50C: 10000*exp(3950*(1/323.15-1/298.15)) = 10000*exp(-1.0249) = 3,588 ohm
  approx(betaRes(323.15, 10000, 298.15, 3950), 3588, 5);
  // R=R0 gives T0
  approx(betaTempK(10000, 10000, 298.15, 3950), 298.15, 1e-9);
  // R = 5k: 1/T = 1/298.15 + ln(0.5)/3950 = 0.00335402-0.00017548 -> 314.61 K
  const r = run('ntc-thermistor-calculator');
  assert.equal(row(r, /^Temperature$/), '41.46 °C');
  assert.equal(row(r, /°F/), '106.63 °F');
  // Steinhart-Hart, A=1.009249522e-3 B=2.378405444e-4 C=2.019202697e-7, R=10k:
  // ln R = 9.21034; sum = 1.009250e-3+2.19059e-3+1.5776e-4 = 3.35760e-3 -> 297.83 K
  approx(shTempK(10000, 1.009249522e-3, 2.378405444e-4, 2.019202697e-7), 297.83, 0.02);
  // inverse round-trip
  const R = shRes(shTempK(3000, 1.009249522e-3, 2.378405444e-4, 2.019202697e-7), 1.009249522e-3, 2.378405444e-4, 2.019202697e-7);
  approx(R, 3000, 1e-6);
  // divider: Vout=Vref/2 with NTC to ground -> R = Rfixed = 10k -> 25 C
  const d = run('ntc-thermistor-calculator', { mode: 'div', vout: '1.65' });
  assert.equal(row(d, /^Temperature$/), '25 °C');
  // t2r at 25C -> 10 kOhm
  assert.equal(row(run('ntc-thermistor-calculator', { mode: 't2r', temp: '25' }), /Resistance \(ohms\)/), '10,000 Ω');
  // SH mode via compute
  assert.equal(row(run('ntc-thermistor-calculator', { model: 'sh', res: '10000' }), /^Temperature$/), '24.68 °C');
});

test('ntc: invalid inputs', () => {
  for (const o of [{ res: '0' }, { beta: '-1' }, { t0: '-300' }, { mode: 'div', vout: '3.3' }, { mode: 't2r', temp: '-400' }, { r0: 'x' }]) {
    assert.equal(run('ntc-thermistor-calculator', o as unknown as Record<string, string>)[0].label, 'Check inputs');
  }
});

test('ble: reference vectors', () => {
  // sleep 0, 10mA for 100ms each 1s -> avg 1 mA; 100 mAh at 100% -> 100 h = 4.17 d
  let r = run('ble-battery-life-calculator', { sleep: '0', interval: '1', active: '10', activems: '100', cap: '100', usable: '100', selfd: '0' });
  assert.equal(row(r, /hours/), '100 h'); assert.equal(row(r, /Average load/), '1,000 µA');
  // avg = (0.01*9.95 + 20*0.05)/10 = 0.10995 mA ; 160/0.10995 = 1455.2 h
  r = run('ble-battery-life-calculator', { sleep: '10', interval: '10', active: '20', activems: '50', cap: '200', usable: '80', selfd: '0' });
  assert.equal(row(r, /hours/), '1,455 h'); assert.equal(row(r, /Average load/), '109.95 µA');
  // self-discharge 5%/yr of 100 mAh = 5/8760 = 0.000571 mA; avg 0.01 mA -> 100/0.010571=9459.6 h
  r = run('ble-battery-life-calculator', { sleep: '10', interval: '10', active: '0', activems: '0', cap: '100', usable: '100', selfd: '5' });
  assert.equal(row(r, /hours/), '9,460 h');
});

test('ble: invalid inputs', () => {
  for (const o of [{ interval: '0' }, { activems: '70000' }, { cap: '0' }, { usable: '120' }, { sleep: '-1' }]) {
    assert.equal(run('ble-battery-life-calculator', o as unknown as Record<string, string>)[0].label, 'Check inputs');
  }
});

test('content.example numbers match compute output', () => {
  const ex = (s: string) => VIRAL_ELEC2.find((t) => t.slug === s)!.content.example!;
  let r = run('i2c-pull-up-resistor-calculator');
  assert.ok(ex('i2c-pull-up-resistor-calculator').includes('966.67 Ω'));
  assert.equal(row(r, /minimum/), '966.67 Ω');
  assert.ok(ex('i2c-pull-up-resistor-calculator').includes('3.541 kΩ') && row(r, /maximum/) === '3.541 kΩ');
  assert.ok(ex('i2c-pull-up-resistor-calculator').includes('1.85 kΩ') && row(r, /Geometric/) === '1.85 kΩ');
  assert.ok(ex('i2c-pull-up-resistor-calculator').includes('1.8 kΩ') && r[0].value === '1.8 kΩ');
  assert.ok(ex('i2c-pull-up-resistor-calculator').includes('196.7 pF') && row(r, /Max bus/) === '196.7 pF');
  r = run('timer-prescaler-calculator');
  const t = ex('timer-prescaler-calculator');
  assert.ok(t.includes('PSC = 1') && t.includes('ARR = 35999') && t.includes('72000') && t.includes('15.14 bits'));
  assert.equal(row(r, /Counter steps/), '15.14 bits'); assert.equal(row(r, /Divider/), '72,000'); assert.equal(row(r, /period/), '1 ms');
  r = run('op-amp-gain-calculator');
  const o = ex('op-amp-gain-calculator');
  assert.ok(o.includes('39 kΩ') && o.includes('4.9') && o.includes('43 kΩ') && o.includes('5.3') && o.includes('204.08 kHz'));
  assert.equal(r[0].value, '39 kΩ'); assert.equal(row(r, /Second/), '43 kΩ (gain 5.3, 6%)'); assert.equal(row(r, /Gain error/), '-2%');
  r = run('ntc-thermistor-calculator');
  const n = ex('ntc-thermistor-calculator');
  assert.ok(n.includes('314.61 K') && n.includes('41.46 °C') && n.includes('106.63 °F'));
  assert.equal(row(r, /\(K\)/), '314.61 K');
  r = run('ble-battery-life-calculator');
  const b = ex('ble-battery-life-calculator');
  for (const s of ['5.666 µA', '187 mAh', '0.251 µA', '31,602 h', '1,317 days', '3.61 years']) assert.ok(b.includes(s), s);
  assert.equal(row(r, /Average load/), '5.666 µA'); assert.equal(row(r, /Self-discharge/), '0.251 µA');
  assert.equal(row(r, /hours/), '31,602 h'); assert.equal(row(r, /days/), '1,317 days'); assert.equal(r[0].value, '3.61 years');
});
