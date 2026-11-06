import test from 'node:test';
import assert from 'node:assert/strict';
import { canadaGstHst, usMileage2026 } from '../lib/calc/northAmerica';
import { hoursWorked } from '../lib/calc/datecalc';

test('GST/HST adds Ontario HST and extracts Nova Scotia HST', () => {
  assert.match(canadaGstHst({ amount: 100, region: 'ON' })[0].value, /113\.00/);
  assert.match(canadaGstHst({ amount: 114, region: 'NS', mode: 'included' })[0].value, /100\.00/);
  assert.equal(canadaGstHst({ amount: 100, region: 'AB' })[2].value, '5%');
});

test('2026 US business mileage uses both effective rates', () => {
  assert.match(usMileage2026({ firstHalf: 100, secondHalf: 100 })[0].value, /148\.50/);
});

test('weekly time card deducts lunch per shift and handles midnight', () => {
  const result = hoursWorked({ in1: '09:00', out1: '17:30', break1: 30, in7: '22:00', out7: '06:15', break7: 45 });
  assert.equal(result[0].value, '15h 30m');
  assert.equal(hoursWorked({ in1: '09:00', out1: '' })[0].label, 'Check inputs');
  assert.equal(hoursWorked({ in1: '09:00', out1: '09:10', break1: 30 })[0].label, 'Check inputs');
});
