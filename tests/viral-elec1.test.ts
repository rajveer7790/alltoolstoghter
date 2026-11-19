import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as zlib from 'node:zlib';
// zlib.crc32 exists in Node >= 22.2; older @types/node do not declare it.
const zcrc32 = (zlib as unknown as { crc32: (data: string) => number }).crc32;
import { COMPUTES_ELEC1 as C, crc, CRC_ALGOS, parseHexBytes, traceAreaSqMil, IPC2221 } from '../lib/calc/viral/elec1';
import { VIRAL_ELEC1 } from '../lib/registry/viralElec1';

const row = (r: { label: string; value: string }[], l: string) => r.find(x => x.label.startsWith(l))?.value;
const main = (r: { value: string; main?: boolean }[]) => r.find(x => x.main)?.value;
const hexOf = (v: any) => row(C['ieee-754-converter'](v), 'Hex');
const enc = (format: string, value: string) => hexOf({ mode: 'encode', format, value });
const defaults = (slug: string) => Object.fromEntries((VIRAL_ELEC1.find(t => t.slug === slug)!.fields as any[]).map(f => [f.key, String(f.def)]));

test('defaults: no NaN/Infinity, main set', () => {
  for (const t of VIRAL_ELEC1) {
    const r = C[t.slug](defaults(t.slug));
    assert.ok(r.some(x => x.main), t.slug);
    assert.ok(r.length <= 8);
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.value.replace(/^NaN$|^-?Infinity$/, '')) || t.slug === 'ieee-754-converter', x.label + x.value);
    assert.notEqual(main(r), undefined);
    assert.notEqual(r[0].label, 'Check inputs');
  }
});

test('catalog entries are well formed', () => {
  for (const t of VIRAL_ELEC1) {
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, `${t.slug} meta ${t.metaDescription!.length}`);
    assert.ok(t.content.faqs.length >= 4 && t.related.length <= 4);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]) || t.slug === 'crc-calculator', t.slug);
  }
});

test('ADC: reference vectors', () => {
  const f = (v: any) => C['adc-resolution-calculator'](v);
  // 8 bit, 2.56 V: LSB = 2.56/256 = 0.01 V = 10 mV; ideal SNR = 6.02*8+1.76 = 49.92 dB
  let r = f({ bits: '8', vref: '2.56', sinad: '', vin: '' });
  assert.equal(main(r), '10 mV'); assert.equal(row(r, 'Ideal SNR'), '49.92 dB'); assert.equal(row(r, 'Number of codes'), '256');
  // 16 bit, 5 V: LSB = 5/65536 = 76.294 uV ; ENOB(SINAD 98) = (98-1.76)/6.02 = 15.987 -> 15.99
  r = f({ bits: '16', vref: '5', sinad: '98', vin: '' });
  assert.equal(main(r), '76.294 µV'); assert.equal(row(r, 'ENOB'), '15.99 bits');
  // 10 bit, 1.024 V: LSB 1 mV; Vin 0.5005 V -> code floor(500.5)=500, error 0.5 mV = 0.5 LSB
  r = f({ bits: '10', vref: '1.024', vin: '0.5005' });
  assert.equal(row(r, 'Output code'), '500'); assert.equal(row(r, 'Quantisation error'), '500 µV (0.5 LSB)');
  // clipping at/above V_ref -> code 2^N - 1
  r = f({ bits: '4', vref: '1.6', vin: '5' });
  assert.match(row(r, 'Output code')!, /^15 \(clipped/);
});
test('ADC: invalid inputs', () => {
  for (const v of [{ bits: '0', vref: '3' }, { bits: '33', vref: '3' }, { bits: '12.5', vref: '3' }, { bits: '12', vref: '0' }, { bits: '12', vref: '3', sinad: '1' }, { bits: '12', vref: '3', vin: '-1' }]) {
    const r = C['adc-resolution-calculator'](v); assert.equal(r[0].label, 'Check inputs');
  }
});
test('ADC: example text matches', () => {
  const r = C['adc-resolution-calculator'](defaults('adc-resolution-calculator'));
  const ex = VIRAL_ELEC1[0].content.example!;
  for (const s of [main(r)!, row(r, 'Number of codes')!, row(r, 'Ideal SNR')!, row(r, 'ENOB')!.replace(' bits', ''), row(r, 'Output code')!, '170.898 µV', '0.212 LSB']) assert.ok(ex.includes(s), s);
});

test('IEEE754: published vectors', () => {
  assert.equal(enc('binary32', '1'), '0x3F800000');
  assert.equal(enc('binary16', '1'), '0x3C00');
  assert.equal(enc('bfloat16', '1'), '0x3F80');
  assert.equal(enc('binary64', '1'), '0x3FF0000000000000');
  assert.equal(enc('binary32', '0.1'), '0x3DCCCCCD');
  assert.equal(enc('binary16', '-2'), '0xC000');
  // half max 65504 = 0x7BFF; 65520 is a tie between 65504 and 65536 -> even -> infinity 0x7C00
  assert.equal(enc('binary16', '65504'), '0x7BFF'); assert.equal(enc('binary16', '65520'), '0x7C00');
  // smallest half subnormal 2^-24 = 5.9604644775390625e-8 -> 0x0001 ; 2^-25 tie -> 0
  assert.equal(enc('binary16', '5.9604644775390625e-8'), '0x0001'); assert.equal(enc('binary16', '2.98023223876953125e-8'), '0x0000');
  // 0.1 half = 0x2E66; bfloat16 0.1: top16 of 3DCCCCCD is 3DCC, low half CCCD>8000 -> 0x3DCD
  assert.equal(enc('binary16', '0.1'), '0x2E66'); assert.equal(enc('bfloat16', '0.1'), '0x3DCD');
  assert.equal(enc('binary64', '0.1'), '0x3FB999999999999A');
  assert.equal(enc('binary32', '-0'), '0x80000000'); assert.equal(enc('binary32', 'inf'), '0x7F800000');
  assert.equal(enc('binary32', '-inf'), '0xFF800000'); assert.equal(enc('binary32', 'nan'), '0x7FC00000');
  assert.equal(enc('binary16', 'nan'), '0x7E00'); assert.equal(enc('bfloat16', 'nan'), '0x7FC0');
});
test('IEEE754: agrees with hardware float32/float64 on many values', () => {
  const dv = new DataView(new ArrayBuffer(8));
  let seed = 12345; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let i = 0; i < 300; i++) {
    const s = ((rnd() - 0.5) * 2 * 10 ** Math.floor(rnd() * 60 - 30)).toPrecision(1 + Math.floor(rnd() * 16));
    dv.setFloat32(0, Number(s)); assert.equal(enc('binary32', s), '0x' + dv.getUint32(0).toString(16).toUpperCase().padStart(8, '0'), s);
    dv.setFloat64(0, Number(s)); assert.equal(enc('binary64', s), '0x' + dv.getBigUint64(0).toString(16).toUpperCase().padStart(16, '0'), s);
  }
});
test('IEEE754: decode and exact value', () => {
  const d = (format: string, hex: string) => C['ieee-754-converter']({ mode: 'decode', format, hex });
  assert.equal(row(d('binary32', '3DCCCCCD'), 'Stored value'), '0.100000001490116119384765625');
  assert.equal(row(d('binary16', '0001'), 'Stored value'), '0.000000059604644775390625');
  assert.equal(row(d('binary16', '7BFF'), 'Stored value'), '65504');
  assert.equal(row(d('binary32', 'FF800000'), 'Stored value'), '-Infinity');
  assert.equal(row(d('binary32', '7FC00001'), 'Class'), 'NaN');
  assert.equal(row(d('binary32', '00000001'), 'Class'), 'Subnormal');
  assert.equal(row(d('bfloat16', '0x3F80'), 'Stored value'), '1');
  assert.equal(row(C['ieee-754-converter']({ mode: 'encode', format: 'binary32', value: '0.5' }), 'Rounding error'), '0 (exactly representable)');
  assert.equal(row(C['ieee-754-converter']({ mode: 'encode', format: 'binary32', value: '1e50' }), 'Rounding error'), 'Overflowed to infinity');
});
test('IEEE754: invalid inputs', () => {
  const f = (v: any) => C['ieee-754-converter'](v);
  assert.equal(f({ mode: 'encode', format: 'binary32', value: 'abc' })[0].label, 'Check inputs');
  assert.equal(f({ mode: 'encode', format: 'binary32', value: '' })[0].label, 'Check inputs');
  assert.equal(f({ mode: 'decode', format: 'binary32', hex: '3DCC' })[0].label, 'Check inputs');
  assert.equal(f({ mode: 'decode', format: 'binary16', hex: 'ZZZZ' })[0].label, 'Check inputs');
  assert.equal(f({ mode: 'encode', format: 'nope', value: '1' })[0].label, 'Check inputs');
});
test('IEEE754: example text matches', () => {
  const r = C['ieee-754-converter'](defaults('ieee-754-converter'));
  const ex = VIRAL_ELEC1[1].content.example!;
  assert.ok(ex.includes(row(r, 'Hex')!)); assert.ok(ex.includes(row(r, 'Sign')!));
  assert.ok(ex.includes(row(r, 'Stored value')!)); assert.ok(ex.includes('1.490e-9'));
  assert.equal(row(r, 'Rounding error'), '1.490e-9 (absolute)');
});

test('PCB: reference vectors', () => {
  const f = (v: any) => C['pcb-trace-width-calculator'](v);
  // 1 A, 10 C, ext: 10^0.44 = 2.75423; k*that = 0.132203; 1/0.132203 = 7.5640; 7.5640^(1/0.725)=16.30 mil^2; /1.378 = 11.83 mil = 0.3005 mm
  assert.ok(Math.abs(traceAreaSqMil(1, 10, 0.048) - 16.30) < 0.01);
  let r = f({ current: '1', rise: '10', oz: '1', layer: 'external', length: '' });
  assert.equal(main(r), '11.83 mil (0.3 mm)');
  // internal k is half -> area ratio = 2^(1/0.725) = 2.6 ; 1 A internal: 16.30*2.6 = 42.4 mil^2 -> 30.8 mil
  r = f({ current: '1', rise: '10', oz: '1', layer: 'internal', length: '' });
  assert.ok(Math.abs(parseFloat(main(r)!) - 30.76) < 0.1, main(r));
  // 2 oz halves width vs 1 oz: 11.83/2 = 5.92
  r = f({ current: '1', rise: '10', oz: '2', layer: 'external', length: '' });
  assert.ok(Math.abs(parseFloat(main(r)!) - 5.92) < 0.01);
  // round trip I = k dT^0.44 A^0.725 for 5 A, 20 C
  const A = traceAreaSqMil(5, 20, 0.048); assert.ok(Math.abs(0.048 * Math.pow(20, 0.44) * Math.pow(A, 0.725) - 5) < 1e-9);
  // resistance: 1 mil^2 = 6.4516e-10 m^2; 16.30 mil^2 = 1.0516e-8 m^2; R = 1.72e-8*0.05/1.0516e-8 = 0.0818 ohm
  r = f({ current: '1', rise: '10', oz: '1', layer: 'external', length: '50' });
  assert.equal(row(r, 'DC resistance'), '81.8 mΩ'); assert.equal(row(r, 'Voltage drop'), '81.8 mV');
  assert.equal(IPC2221.milPerOz, 1.378);
});
test('PCB: invalid inputs and range note', () => {
  const f = (v: any) => C['pcb-trace-width-calculator'](v);
  assert.equal(f({ current: '0', rise: '10', oz: '1', layer: 'external' })[0].label, 'Check inputs');
  assert.equal(f({ current: '1', rise: '-5', oz: '1', layer: 'external' })[0].label, 'Check inputs');
  assert.equal(f({ current: '1', rise: '10', oz: '5', layer: 'external' })[0].label, 'Check inputs');
  assert.equal(f({ current: '1', rise: '10', oz: '1', layer: 'external', length: '-1' })[0].label, 'Check inputs');
  assert.match(row(f({ current: '40', rise: '10', oz: '1', layer: 'external' }), 'Range note')!, /Outside/);
});
test('PCB: example text matches', () => {
  const r = C['pcb-trace-width-calculator'](defaults('pcb-trace-width-calculator'));
  const ex = VIRAL_ELEC1[2].content.example!;
  for (const s of ['16.3 mil²', '11.83 mil (0.3 mm)', '81.8 mΩ', '81.8 mV']) assert.ok(ex.includes(s), s);
  assert.equal(row(r, 'Cross-section')!.startsWith('16.3 mil²'), true);
});

const ascii = (s: string) => [...s].map(c => c.charCodeAt(0));
test('CRC: catalogue check values for 123456789', () => {
  const f = (algo: string) => main(C['crc-calculator']({ algo, mode: 'ascii', data: '123456789' }));
  assert.equal(f('crc8'), '0xF4'); assert.equal(f('ccitt'), '0x29B1'); assert.equal(f('modbus'), '0x4B37'); assert.equal(f('crc32'), '0xCBF43926');
});
test('CRC: Modbus frames and cross-check with zlib', () => {
  // Widely published Modbus RTU frames: 01 03 00 00 00 0A C5 CD ; 01 04 02 FF FF B8 80
  let r = C['crc-calculator']({ algo: 'modbus', mode: 'hex', data: '01 03 00 00 00 0A' });
  assert.equal(main(r), '0xCDC5'); assert.equal(row(r, 'Modbus RTU bytes'), 'C5 CD'); assert.equal(row(r, 'Frame'), '01 03 00 00 00 0A C5 CD');
  r = C['crc-calculator']({ algo: 'modbus', mode: 'hex', data: '0x01,0x04,0x02,0xFF,0xFF' });
  assert.equal(row(r, 'Frame'), '01 04 02 FF FF B8 80');
  // independent CRC-32 implementation shipped with Node
  for (const s of ['', 'a', 'hello world', 'The quick brown fox jumps over the lazy dog']) {
    if (s) assert.equal(crc(CRC_ALGOS.crc32, ascii(s)), zcrc32(s));
  }
  assert.equal(crc(CRC_ALGOS.crc32, ascii('The quick brown fox jumps over the lazy dog')), 0x414fa339);
  assert.deepEqual(parseHexBytes('0A:ff 10'), [10, 255, 16]);
});
test('CRC: invalid inputs', () => {
  const f = (v: any) => C['crc-calculator'](v);
  assert.equal(f({ algo: 'crc8', mode: 'hex', data: 'ABC' })[0].label, 'Check inputs');
  assert.equal(f({ algo: 'crc8', mode: 'hex', data: 'GG' })[0].label, 'Check inputs');
  assert.equal(f({ algo: 'crc8', mode: 'ascii', data: '' })[0].label, 'Check inputs');
  assert.equal(f({ algo: 'zzz', mode: 'ascii', data: 'a' })[0].label, 'Check inputs');
});
test('CRC: example text matches', () => {
  const ex = VIRAL_ELEC1[3].content.example!;
  for (const s of ['0xF4', '0x29B1', '0x4B37', '0xCBF43926', '37 4B', '0xCDC5', '01 03 00 00 00 0A C5 CD']) assert.ok(ex.includes(s), s);
});
