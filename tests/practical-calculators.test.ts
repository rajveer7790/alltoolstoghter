import assert from 'node:assert/strict';
import { test } from 'node:test';
import { COMPUTES } from '../lib/calc/computes';

test('download time converts megabits, megabytes and binary file sizes', () => {
  const calculate = COMPUTES['download-time-calculator'];
  assert.equal(calculate({ size: '5', sizeUnit: 'GB', speed: '100', speedUnit: 'Mbps' })[0].value, '6 min 40 sec');
  assert.equal(calculate({ size: '5', sizeUnit: 'GB', speed: '12.5', speedUnit: 'MB/s' })[0].value, '6 min 40 sec');
  assert.equal(calculate({ size: '1', sizeUnit: 'GiB', speed: '1', speedUnit: 'Gbps' })[0].value, '9 sec');
  assert.equal(calculate({ size: '5', sizeUnit: 'GB', speed: '0', speedUnit: 'Mbps' })[0].label, 'Check inputs');
});

test('pixel density converts centimeters and rejects fractional pixel resolutions', () => {
  const calculate = COMPUTES['ppi-calculator'];
  const display = { width: '1920', height: '1080', diagonal: '24', diagonalUnit: 'in' };
  assert.equal(calculate(display)[0].value, '91.79 PPI');
  assert.deepEqual(calculate(display), calculate({ ...display, diagonal: '60.96', diagonalUnit: 'cm' }));
  assert.equal(calculate({ ...display, width: '1920.5' })[0].label, 'Check inputs');
});

test('battery runtime uses the specified fraction of rated capacity', () => {
  const calculate = COMPUTES['battery-life-calculator'];
  const device = { capacity: '500', current: '2.4', usablePercent: '80' };
  assert.deepEqual(calculate(device).map(result => result.value), ['166.6667 hr', '6.9444 days', '400 mAh']);
  assert.equal(calculate({ ...device, usablePercent: '101' })[0].label, 'Check inputs');
  assert.equal(calculate({ ...device, current: '0' })[0].label, 'Check inputs');
});
