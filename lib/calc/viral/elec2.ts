import { CalcResult } from '../../types';
import { num, int } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
const pos = (x: number) => Number.isFinite(x) && x > 0;
const raw = (v: Record<string, any>, k: string): number => {
  const n = parseFloat(String(v[k] ?? ''));
  return Number.isFinite(n) ? n : NaN;
};
const fmtOhm = (r: number): string =>
  r >= 1e6 ? num(r / 1e6, 3) + ' MΩ' : r >= 1e3 ? num(r / 1e3, 3) + ' kΩ' : num(r, 2) + ' Ω';

/* ------------------------------------------------------------------ */
/* Standard value series (IEC 60063)                                   */
/* ------------------------------------------------------------------ */
export const E24 = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];
export const E96 = [
  1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43,
  1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10,
  2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09,
  3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53,
  4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65,
  6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76,
];

/** All standard values from `minR` to `maxR` ohms (inclusive) for a series. */
export function seriesValues(series: number[], minR: number, maxR: number): number[] {
  const out: number[] = [];
  for (let k = -1; k <= 8; k++) {
    const m = Math.pow(10, k);
    for (const b of series) {
      const r = Number((b * m).toPrecision(6));
      if (r >= minR * (1 - 1e-9) && r <= maxR * (1 + 1e-9)) out.push(r);
    }
  }
  return out.sort((a, b) => a - b);
}

/* ------------------------------------------------------------------ */
/* 1. I2C pull-up resistor                                             */
/* ------------------------------------------------------------------ */
export const I2C_K = 0.8473; // ln(0.7/0.3) = 0.84730, NXP UM10204 rise-time definition
export const I2C_MODES: Record<string, { label: string; tr: number }> = {
  std: { label: 'Standard-mode (100 kHz)', tr: 1000e-9 },
  fast: { label: 'Fast-mode (400 kHz)', tr: 300e-9 },
  fmp: { label: 'Fast-mode Plus (1 MHz)', tr: 120e-9 },
};

export function i2cPullUp(vcc: number, vol: number, iolMa: number, cbPf: number, mode: string) {
  const tr = I2C_MODES[mode].tr;
  const rMin = (vcc - vol) / (iolMa / 1000);
  const rMax = tr / (I2C_K * cbPf * 1e-12);
  return { tr, rMin, rMax };
}

function i2c(v: Record<string, any>): CalcResult[] {
  const vcc = raw(v, 'vcc'), vol = raw(v, 'vol'), iol = raw(v, 'iol'), cb = raw(v, 'cb');
  const mode = String(v.mode ?? 'fast');
  if (!I2C_MODES[mode]) return bad('Choose a bus mode.');
  if (!pos(vcc) || vcc > 60) return bad('Supply voltage must be between 0 and 60 V.');
  if (!Number.isFinite(vol) || vol < 0 || vol >= vcc) return bad('VOL max must be 0 or more and below the supply voltage.');
  if (!pos(iol) || iol > 1000) return bad('IOL must be a positive current in mA.');
  if (!pos(cb) || cb > 1e6) return bad('Bus capacitance must be a positive value in pF.');
  const { tr, rMin, rMax } = i2cPullUp(vcc, vol, iol, cb, mode);
  const head: CalcResult[] = [
    { label: 'Rp minimum (sink current limit)', value: fmtOhm(rMin) },
    { label: 'Rp maximum (rise time limit)', value: fmtOhm(rMax) },
  ];
  if (rMin > rMax) {
    return [
      { label: 'Recommended Rp', value: 'No valid value: reduce Cb or lower speed', main: true },
      ...head,
      { label: 'Max rise time (' + I2C_MODES[mode].label + ')', value: num(tr * 1e9, 0) + ' ns' },
    ];
  }
  const e24 = seriesValues(E24, 1, 1e7).filter((r) => r >= rMin && r <= rMax);
  const gm = Math.sqrt(rMin * rMax);
  let rp = gm, kind = 'geometric mean (no E24 value in range)';
  if (e24.length) {
    rp = e24.reduce((a, b) => (Math.abs(Math.log(b / gm)) < Math.abs(Math.log(a / gm)) ? b : a));
    kind = 'nearest E24 to geometric mean';
  }
  const cbMax = tr / (I2C_K * rp) * 1e12;
  return [
    { label: 'Recommended Rp (' + kind + ')', value: fmtOhm(rp), main: true },
    ...head,
    { label: 'Geometric mean of limits', value: fmtOhm(gm) },
    { label: 'E24 values inside range', value: String(e24.length) },
    { label: 'Max bus capacitance at this Rp', value: num(cbMax, 1) + ' pF' },
    { label: 'Max rise time (' + I2C_MODES[mode].label + ')', value: num(tr * 1e9, 0) + ' ns' },
  ];
}

/* ------------------------------------------------------------------ */
/* 2. Timer prescaler / auto-reload                                    */
/* ------------------------------------------------------------------ */
export interface TimerSolution { psc: number; arr: number; fActual: number; errPpm: number; }

export function solveTimer(fClk: number, fTarget: number, arrMax: number, pscMax = 65535): TimerSolution | null {
  let best: TimerSolution | null = null;
  let bestAbs = Infinity;
  for (let psc = 0; psc <= pscMax; psc++) {
    const n = Math.round(fClk / (fTarget * (psc + 1)));
    if (n < 1 || n - 1 > arrMax) continue;
    const f = fClk / ((psc + 1) * n);
    const abs = Math.abs(f - fTarget);
    if (best === null || abs < bestAbs * (1 - 1e-12)) {
      best = { psc, arr: n - 1, fActual: f, errPpm: ((f - fTarget) / fTarget) * 1e6 };
      bestAbs = abs;
    } else if (abs <= bestAbs * (1 + 1e-12) && n - 1 > best.arr) {
      best = { psc, arr: n - 1, fActual: f, errPpm: ((f - fTarget) / fTarget) * 1e6 };
      bestAbs = Math.min(abs, bestAbs);
    }
  }
  return best;
}

function fmtTime(s: number): string {
  if (s >= 1) return num(s, 6) + ' s';
  if (s >= 1e-3) return num(s * 1e3, 6) + ' ms';
  return num(s * 1e6, 4) + ' µs';
}

function timer(v: Record<string, any>): CalcResult[] {
  const fClk = raw(v, 'fclk'), fT = raw(v, 'ftarget');
  const width = String(v.width ?? '16');
  if (!pos(fClk) || fClk > 1e10) return bad('Timer clock must be a positive frequency in Hz (up to 10 GHz).');
  if (!pos(fT)) return bad('Target frequency must be a positive number in Hz.');
  if (fT > fClk) return bad('Target frequency cannot exceed the timer clock.');
  const arrMax = width === '32' ? 4294967295 : 65535;
  const sol = solveTimer(fClk, fT, arrMax);
  if (!sol) return bad('No PSC/ARR pair reaches this frequency with a ' + (width === '32' ? '32' : '16') + '-bit counter; use a higher target or a 32-bit timer.');
  const bits = Math.log2(sol.arr + 1);
  return [
    { label: 'PSC register value', value: int(sol.psc), main: true },
    { label: 'ARR register value', value: int(sol.arr) },
    { label: 'Actual update frequency', value: num(sol.fActual, 6) + ' Hz' },
    { label: 'Frequency error', value: num(sol.errPpm, 2) + ' ppm' },
    { label: 'Update period', value: fmtTime(1 / sol.fActual) },
    { label: 'Divider (PSC+1) × (ARR+1)', value: int((sol.psc + 1) * (sol.arr + 1)) },
    { label: 'Counter steps per period (PWM resolution)', value: num(bits, 2) + ' bits' },
  ];
}

/* ------------------------------------------------------------------ */
/* 3. Op-amp gain / standard resistor finder                           */
/* ------------------------------------------------------------------ */
export function opampGain(mode: string, rf: number, rFixed: number): number {
  return mode === 'inv' ? -rf / rFixed : 1 + rf / rFixed;
}

export interface RfCandidate { rf: number; gain: number; errPct: number; }

export function rankRf(mode: string, target: number, rFixed: number, series: number[]): RfCandidate[] {
  const vals = seriesValues(series, 10, 1e7);
  return vals
    .map((rf) => {
      const gain = opampGain(mode, rf, rFixed);
      return { rf, gain, errPct: ((Math.abs(gain) - target) / target) * 100 };
    })
    .sort((a, b) => Math.abs(a.errPct) - Math.abs(b.errPct) || a.rf - b.rf);
}

function opamp(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode ?? 'non');
  const series = String(v.series ?? 'e24');
  const target = raw(v, 'gain'), rFixed = raw(v, 'rfixed'), gbwMhz = raw(v, 'gbw');
  if (mode !== 'inv' && mode !== 'non') return bad('Choose inverting or non-inverting.');
  if (!pos(target) || target > 1e5) return bad('Target gain magnitude must be a positive number.');
  if (mode === 'non' && target <= 1) return bad('A non-inverting amplifier needs a gain above 1 (gain 1 means Rf = 0).');
  if (!pos(rFixed) || rFixed > 1e8) return bad('The fixed resistor must be a positive value in ohms.');
  if (Number.isFinite(gbwMhz) && gbwMhz < 0) return bad('Gain-bandwidth product cannot be negative.');
  const rfIdeal = mode === 'inv' ? target * rFixed : (target - 1) * rFixed;
  const ranked = rankRf(mode, target, rFixed, series === 'e96' ? E96 : E24);
  const best = ranked[0], second = ranked[1];
  const noise = 1 + best.rf / rFixed;
  const rows: CalcResult[] = [
    { label: 'Nearest standard Rf', value: fmtOhm(best.rf), main: true },
    { label: 'Ideal Rf', value: fmtOhm(rfIdeal) },
    { label: 'Achieved gain', value: num(best.gain, 4) + ' V/V' },
    { label: 'Gain error', value: num(best.errPct, 3) + '%' },
    { label: 'Second-best Rf', value: fmtOhm(second.rf) + ' (gain ' + num(second.gain, 4) + ', ' + num(second.errPct, 3) + '%)' },
    { label: 'Noise gain (1 + Rf/R)', value: num(noise, 4) + ' V/V' },
  ];
  if (pos(gbwMhz)) rows.push({ label: 'Closed-loop −3 dB bandwidth (GBW ÷ noise gain)', value: num((gbwMhz * 1e6) / noise / 1e3, 2) + ' kHz' });
  return rows;
}

/* ------------------------------------------------------------------ */
/* 4. NTC thermistor                                                   */
/* ------------------------------------------------------------------ */
const K0 = 273.15;

export const betaTempK = (r: number, r0: number, t0K: number, beta: number) => 1 / (1 / t0K + Math.log(r / r0) / beta);
export const betaRes = (tK: number, r0: number, t0K: number, beta: number) => r0 * Math.exp(beta * (1 / tK - 1 / t0K));
export const shTempK = (r: number, a: number, b: number, c: number) => {
  const l = Math.log(r);
  return 1 / (a + b * l + c * l * l * l);
};
/** Invert Steinhart-Hart (closed-form cubic solution). */
export const shRes = (tK: number, a: number, b: number, c: number) => {
  const x = (a - 1 / tK) / c;
  const y = Math.sqrt(Math.pow(b / (3 * c), 3) + (x * x) / 4);
  return Math.exp(Math.cbrt(y - x / 2) - Math.cbrt(y + x / 2));
};

function tempRows(tK: number): CalcResult[] {
  const c = tK - K0;
  return [
    { label: 'Temperature', value: num(c, 2) + ' °C', main: true },
    { label: 'Temperature (°F)', value: num(c * 1.8 + 32, 2) + ' °F' },
    { label: 'Temperature (K)', value: num(tK, 2) + ' K' },
  ];
}

function ntc(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode ?? 'r2t');
  const model = String(v.model ?? 'beta');
  const r0 = raw(v, 'r0'), t0 = raw(v, 't0'), beta = raw(v, 'beta');
  const a = raw(v, 'sha'), b = raw(v, 'shb'), c = raw(v, 'shc');
  if (!['r2t', 't2r', 'div'].includes(mode)) return bad('Choose a calculation mode.');
  if (model === 'beta') {
    if (!pos(r0)) return bad('R0 (resistance at T0) must be a positive number of ohms.');
    if (!Number.isFinite(t0) || t0 <= -K0) return bad('T0 must be above −273.15 °C.');
    if (!pos(beta)) return bad('Beta must be a positive number of kelvin.');
  } else if (model === 'sh') {
    if (![a, b, c].every(Number.isFinite) || c === 0) return bad('Steinhart-Hart A, B and C must be numbers and C cannot be 0.');
  } else return bad('Choose Beta or Steinhart-Hart model.');
  const t0K = t0 + K0;
  const toT = (r: number) => (model === 'beta' ? betaTempK(r, r0, t0K, beta) : shTempK(r, a, b, c));

  if (mode === 't2r') {
    const tc = raw(v, 'temp');
    if (!Number.isFinite(tc) || tc <= -K0 || tc > 1000) return bad('Temperature must be between −273.15 °C and 1000 °C.');
    const tK = tc + K0;
    const r = model === 'beta' ? betaRes(tK, r0, t0K, beta) : shRes(tK, a, b, c);
    if (!pos(r)) return bad('The model gives no valid resistance at this temperature.');
    return [
      { label: 'NTC resistance', value: fmtOhm(r), main: true },
      { label: 'Resistance (ohms)', value: num(r, 1) + ' Ω' },
      { label: 'Temperature (K)', value: num(tK, 2) + ' K' },
    ];
  }
  let r: number;
  const extra: CalcResult[] = [];
  if (mode === 'div') {
    const vout = raw(v, 'vout'), vref = raw(v, 'vref'), rf = raw(v, 'rfixed');
    if (!pos(vref)) return bad('Reference voltage must be positive.');
    if (!Number.isFinite(vout) || vout <= 0 || vout >= vref) return bad('Measured voltage must be above 0 and below the reference voltage.');
    if (!pos(rf)) return bad('The fixed resistor must be a positive value in ohms.');
    r = String(v.place ?? 'low') === 'high' ? (rf * (vref - vout)) / vout : (rf * vout) / (vref - vout);
    extra.push({ label: 'Calculated NTC resistance', value: fmtOhm(r) });
  } else {
    r = raw(v, 'res');
    if (!pos(r)) return bad('Measured resistance must be a positive number of ohms.');
  }
  const tK = toT(r);
  if (!Number.isFinite(tK) || tK <= 0 || tK > 3000) return bad('The model gives no valid temperature for this resistance.');
  return [...tempRows(tK), ...extra];
}

/* ------------------------------------------------------------------ */
/* 5. IoT / BLE battery life                                           */
/* ------------------------------------------------------------------ */
export function batteryLife(p: { sleepUa: number; intervalS: number; activeMa: number; activeMs: number; capMah: number; usablePct: number; selfDischPctYr: number }) {
  const tActive = p.activeMs / 1000;
  const tSleep = p.intervalS - tActive;
  const avgMa = ((p.sleepUa / 1000) * tSleep + p.activeMa * tActive) / p.intervalS;
  const selfMa = (p.capMah * (p.selfDischPctYr / 100)) / 8760;
  const usable = p.capMah * (p.usablePct / 100);
  const hours = usable / (avgMa + selfMa);
  return { avgMa, selfMa, usable, hours, days: hours / 24, years: hours / 8760, duty: (tActive / p.intervalS) * 100 };
}

function ble(v: Record<string, any>): CalcResult[] {
  const sleepUa = raw(v, 'sleep'), intervalS = raw(v, 'interval'), activeMa = raw(v, 'active'), activeMs = raw(v, 'activems');
  const capMah = raw(v, 'cap'), usablePct = raw(v, 'usable'), sd = Number.isFinite(raw(v, 'selfd')) ? raw(v, 'selfd') : 0;
  if (!Number.isFinite(sleepUa) || sleepUa < 0) return bad('Sleep current must be 0 or more (µA).');
  if (!pos(intervalS) || intervalS > 1e8) return bad('Event interval must be a positive number of seconds.');
  if (!Number.isFinite(activeMa) || activeMa < 0) return bad('Active current must be 0 or more (mA).');
  if (!Number.isFinite(activeMs) || activeMs < 0) return bad('Active time must be 0 or more (ms).');
  if (activeMs / 1000 >= intervalS) return bad('Active time must be shorter than the event interval.');
  if (!pos(capMah)) return bad('Battery capacity must be a positive number of mAh.');
  if (!pos(usablePct) || usablePct > 100) return bad('Usable capacity must be above 0 and at most 100%.');
  if (sd < 0 || sd > 100) return bad('Self-discharge must be between 0 and 100 % per year.');
  if (sleepUa === 0 && (activeMa === 0 || activeMs === 0) && sd === 0) return bad('Average current is zero; enter a non-zero current.');
  const r = batteryLife({ sleepUa, intervalS, activeMa, activeMs, capMah, usablePct, selfDischPctYr: sd });
  return [
    { label: 'Estimated battery life', value: num(r.years, 2) + ' years', main: true },
    { label: 'Battery life (days)', value: num(r.days, 0) + ' days' },
    { label: 'Battery life (hours)', value: num(r.hours, 0) + ' h' },
    { label: 'Average load current', value: num(r.avgMa * 1000, 3) + ' µA' },
    { label: 'Self-discharge equivalent current', value: num(r.selfMa * 1000, 3) + ' µA' },
    { label: 'Usable capacity', value: num(r.usable, 1) + ' mAh' },
    { label: 'Active duty cycle', value: num(r.duty, 4) + '%' },
  ];
}

export const COMPUTES_ELEC2: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'i2c-pull-up-resistor-calculator': i2c,
  'timer-prescaler-calculator': timer,
  'op-amp-gain-calculator': opamp,
  'ntc-thermistor-calculator': ntc,
  'ble-battery-life-calculator': ble,
};

