import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFragment } from 'parse5';
import { mdToHtml } from '../lib/mdPreview';
import { DEV_TRANSFORMS as T } from '../lib/calc/devtransforms';
import { parseIntegerBase } from '../lib/calc/numberbase';
import { parsePageRange } from '../lib/pdfPages';
import { dayOfWeek, daysBetween, businessDays, addDays } from '../lib/calc/datecalc';
import { ohmsLaw, newtonsSecondLaw, densityCalc, resistorColorCode, phCalc } from '../lib/calc/science';
import { fuelCost, electricityBill, militaryTime, rectangleArea, circleArea } from '../lib/calc/extra';
import { paycheckCalc, selfEmploymentTax } from '../lib/calc/tax';
import { scientificNotation } from '../lib/calc/math';
import { parseCalendarDate } from '../lib/calendar';
const main = (rows: {value:string}[]) => rows[0].value;

test('Markdown blocks script links and attribute injection', () => {
  for (const payload of ['[x](javascript:alert)', '[x](data:text/html,test)', '[x](https://ok.test/\" onmouseover=\"alert)', '[x](//evil.test)', '<img src=x onerror=alert(1)>']) {
    const root = parseFragment(mdToHtml(payload));
    const walk = (node:any) => { for (const a of node.attrs || []) { assert.ok(!a.name.startsWith('on')); if (a.name === 'href') assert.match(a.value, /^(https?:\/\/|mailto:|\/|#)/); } (node.childNodes || []).forEach(walk); };
    walk(root);
  }
  assert.match(mdToHtml('[safe](https://example.com/?a=1&b=2)'), /href="https:\/\/example.com\/\?a=1&amp;b=2"/);
});
test('JS minifier preserves URL strings, regex and template literals', async () => {
  const source = 'const url = "https://example.com/a"; const r = /a\\/b/; const t = `hello // text`;';
  const result = await T.jsMinify.fn(source);
  assert.match(result, /https:\/\/example.com\/a/); assert.match(result, /hello \/\/ text/);
});
test('CSS minifier preserves strings and calc operators', async () => {
  const output = await T.cssMinify.fn('.x { content: "a  b"; width: calc(100% - 2px); }');
  assert.match(output, /a  b/); assert.match(output, /100% - 2px/);
});
test('HTML minifier preserves preformatted text and script strings', async () => {
  const input = '<!-- remove --><pre>a  b\n  c</pre><script>let x="<!--keep-->";</script>';
  const output = await T.htmlMinify.fn(input);
  assert.match(output, /a  b\n  c/); assert.match(output, /<!--keep-->/); assert.doesNotMatch(output, /<!-- remove -->/);
});
test('YAML roundtrip keeps string types, arrays, and quoted keys', async () => {
  const input = { bool: 'true', number: '123', 'key: key': [{ value: 'a\nb' }], empty: [] };
  assert.deepEqual(JSON.parse(await T.yamlToJson.fn(await T.jsonToYaml.fn(JSON.stringify(input)))), input);
});
test('JSON escape and unescape roundtrip', async () => {
  const input = 'Line "one"\nC:\\test';
  assert.equal(await T.jsonUnescape.fn(await T.jsonEscape.fn(input)), input);
});
test('base conversion rejects partial parses and keeps large integers exact', () => {
  assert.equal(parseIntegerBase('102', 2), null); assert.equal(parseIntegerBase('12garbage', 10), null);
  assert.equal(parseIntegerBase('9007199254740993', 10), 9007199254740993n);
  assert.equal(parseIntegerBase('-0xff', 16), -255n);
});
test('page ranges reject excessive and malformed ranges without iterating them', () => {
  assert.deepEqual(parsePageRange('1, 3-5', 5), [0,2,3,4]);
  assert.throws(() => parsePageRange('1-99999999999999999', 5));
  assert.throws(() => parsePageRange('2foo', 5));
});
test('science solvers handle blanks and valid zero inputs', () => {
  assert.equal(main(ohmsLaw({ voltage:120, current:'', resistance:10 })), '120 V');
  assert.equal(ohmsLaw({ voltage:120, current:'', resistance:10 })[1].value, '12 A');
  assert.equal(main(newtonsSecondLaw({force:'',mass:2,acceleration:3})), '6 N');
  assert.equal(main(densityCalc({mass:10,volume:2,density:''})), '5 kg/m³');
  assert.equal(main(newtonsSecondLaw({force:'',mass:2,acceleration:0})), '0 N');
});
test('resistor tolerance and multipliers are numeric', () => {
  assert.equal(resistorColorCode({})[2].value, '950 – 1,050 Ω');
  assert.equal(resistorColorCode({band1:'brown',band2:'black',band3:'grey'})[3].value, '1,000,000,000 Ω');
});
test('small concentrations and large scientific notation do not round or clamp to zero', () => {
  assert.equal(phCalc({ph:7})[1].value, '1.000e-7 mol/L');
  assert.match(main(scientificNotation({number:'6.02e23'})), /10\^23/);
});
test('date-only parsing survives western timezones and DST', () => {
  const old = process.env.TZ;
  for (const zone of ['UTC','America/Los_Angeles','Asia/Kolkata']) {
    process.env.TZ = zone;
    assert.equal(main(dayOfWeek({date:'2026-11-03'})), 'Tuesday');
    assert.equal(main(daysBetween({start:'2026-03-07',end:'2026-03-10'})), '3');
    assert.equal(main(businessDays({start:'2026-11-02',end:'2026-11-08'})), '5');
    assert.match(main(addDays({start:'2026-01-31',amount:1,unit:'months'})), /Feb 28 2026/);
  }
  if (old === undefined) delete process.env.TZ; else process.env.TZ = old;
  assert.equal(parseCalendarDate('2026-02-30'), null);
});
test('new calculators produce known reference values', () => {
  assert.equal(main(fuelCost({distance:100,economy:25,price:3.5,unit:'us'})), '$14');
  assert.equal(main(fuelCost({distance:100,economy:8,price:2,unit:'metric'})), '$16');
  assert.equal(main(electricityBill({kwh:900,rate:0.15})), '$135');
  assert.equal(main(rectangleArea({length:10,width:5})), '50 square units');
  assert.equal(circleArea({radius:5})[2].value, '10');
  assert.equal(main(militaryTime({time:'12:00 AM'})), '00:00');
  assert.equal(main(militaryTime({time:'2:30 PM'})), '14:30');
  assert.match(main(militaryTime({time:'25:99'})), /Check/);
});
test('2026 tax deductions depend on filing status and SE wage cap is current', () => {
  const values = {gross:32200,frequency:1,stateRate:0,k401:0};
  const married = paycheckCalc({...values,filing:'married'});
  const single = paycheckCalc({...values,filing:'single'});
  assert.equal(married[1].value, '$0/check'); assert.equal(single[1].value, '$1,684/check');
  assert.equal(selfEmploymentTax({netProfit:300000})[2].value, '$22,878');
  assert.equal(main(selfEmploymentTax({netProfit:100})), '$0');
});

import { wallTimeToInstant } from '../lib/timezone';
import { age } from '../lib/calc/datecalc';
test('time zones handle midnight, DST offsets, gaps and ambiguous times', () => {
  assert.equal(new Date(wallTimeToInstant('2026-07-01T12:00','America/New_York')).toISOString(),'2026-07-01T16:00:00.000Z');
  assert.equal(new Date(wallTimeToInstant('2026-01-01T00:00','America/New_York')).toISOString(),'2026-01-01T05:00:00.000Z');
  assert.throws(()=>wallTimeToInstant('2026-03-08T02:30','America/New_York'), /does not exist/);
  assert.throws(()=>wallTimeToInstant('2026-11-01T01:30','America/New_York'), /twice/);
});
test('age across short months never produces negative days', () => {
  assert.equal(main(age({dob:'2026-01-31',asof:'2026-03-01'})), '0 years, 1 months, 1 days');
});
