import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
const blank = (x: unknown) => String(x ?? '').trim() === '';
const parseNum = (x: unknown): number => {
  const n = parseFloat(String(x ?? '').trim());
  return Number.isFinite(n) ? n : NaN;
};

/* ---------------------------------------------------------------- ADC */

export function fmtVolts(v: number): string {
  const a = Math.abs(v);
  if (a === 0) return '0 V';
  if (a >= 1) return `${num(v, 4)} V`;
  if (a >= 1e-3) return `${num(v * 1e3, 4)} mV`;
  if (a >= 1e-6) return `${num(v * 1e6, 3)} µV`;
  return `${num(v * 1e9, 3)} nV`;
}

export function adcResolution(v: Record<string, any>): CalcResult[] {
  const n = parseNum(v.bits), vref = parseNum(v.vref);
  if (!Number.isInteger(n) || n < 1 || n > 32) return bad('Resolution must be a whole number of bits from 1 to 32.');
  if (!(vref > 0) || vref > 1e6) return bad('Reference voltage must be greater than 0 V (and at most 1,000,000 V).');
  const codes = 2 ** n;
  const lsb = vref / codes;
  const idealSnr = 6.02 * n + 1.76;
  const out: CalcResult[] = [
    { label: 'LSB size (V_ref / 2^N)', value: fmtVolts(lsb), main: true },
    { label: 'Number of codes (2^N)', value: int(codes) },
    { label: 'Full-scale range (unipolar)', value: `0 to ${fmtVolts(vref)}` },
    { label: 'Ideal SNR (6.02 N + 1.76)', value: `${num(idealSnr, 2)} dB` },
  ];
  if (!blank(v.sinad)) {
    const s = parseNum(v.sinad);
    if (!Number.isFinite(s) || s < 1.76 || s > 250) return bad('Measured SINAD must be a number between 1.76 and 250 dB (or leave it empty).');
    const enob = (s - 1.76) / 6.02;
    out.push({ label: 'ENOB from SINAD', value: `${num(enob, 2)} bits${enob > n ? ' (above the ideal for N)' : ''}` });
  }
  if (!blank(v.vin)) {
    const vin = parseNum(v.vin);
    if (!Number.isFinite(vin) || vin < 0) return bad('Input voltage must be 0 V or more (unipolar ADC), or leave it empty.');
    const clipped = vin >= vref;
    const code = clipped ? codes - 1 : Math.min(codes - 1, Math.floor(vin / lsb));
    const err = vin - code * lsb;
    out.push({ label: 'Output code (floor)', value: `${int(code)}${clipped ? ' (clipped at full scale)' : ''}` });
    out.push({ label: 'Quantisation error', value: clipped ? 'n/a (input at or above V_ref)' : `${fmtVolts(err)} (${num(err / lsb, 3)} LSB)` });
  }
  return out;
}

/* ------------------------------------------------------------ IEEE 754 */

export interface FpFormat { name: string; e: number; m: number }
export const FP_FORMATS: Record<string, FpFormat> = {
  binary16: { name: 'binary16 (half)', e: 5, m: 10 },
  bfloat16: { name: 'bfloat16', e: 8, m: 7 },
  binary32: { name: 'binary32 (single)', e: 8, m: 23 },
  binary64: { name: 'binary64 (double)', e: 11, m: 52 },
};

type Parsed = { kind: 'nan' } | { kind: 'inf'; neg: boolean } | { kind: 'num'; neg: boolean; num: bigint; den: bigint };

const bl = (x: bigint) => (x === 0n ? 0 : x.toString(2).length);

export function parseDecimal(raw: string): Parsed | null {
  const s = raw.trim().toLowerCase();
  if (s === 'nan' || s === '+nan' || s === '-nan') return { kind: 'nan' };
  const sp = /^([+-]?)(inf|infinity)$/.exec(s);
  if (sp) return { kind: 'inf', neg: sp[1] === '-' };
  const m = /^([+-]?)(\d*)\.?(\d*)(?:e([+-]?\d+))?$/.exec(s);
  if (!m || (m[2] + m[3]).length === 0) return null;
  const digits = m[2] + m[3];
  if (digits.length > 400) return null;
  const e10 = (m[4] ? parseInt(m[4], 10) : 0) - m[3].length;
  if (!Number.isFinite(e10) || Math.abs(e10) > 400) return null;
  let n = BigInt(digits), d = 1n;
  if (e10 >= 0) n *= 10n ** BigInt(e10); else d = 10n ** BigInt(-e10);
  return { kind: 'num', neg: m[1] === '-', num: n, den: d };
}

/** Round-to-nearest-even encode of an exact rational into an IEEE-style format. */
export function encodeFp(f: FpFormat, p: Parsed): bigint {
  const E = BigInt(f.e), M = BigInt(f.m);
  const bias = (1 << (f.e - 1)) - 1;
  const expAll = (1n << E) - 1n;
  const signBit = (neg: boolean) => (neg ? 1n << (E + M) : 0n);
  if (p.kind === 'nan') return (expAll << M) | (1n << (M - 1n));
  if (p.kind === 'inf') return signBit(p.neg) | (expAll << M);
  if (p.num === 0n) return signBit(p.neg);
  const { num: n0, den: d0 } = p;
  const ge2 = (e: number) => (e >= 0 ? n0 >= d0 << BigInt(e) : n0 << BigInt(-e) >= d0);
  let e = bl(n0) - bl(d0);
  if (!ge2(e)) e--;
  const emin = 1 - bias;
  const q = (e < emin ? emin : e) - f.m;
  const n2 = q >= 0 ? n0 : n0 << BigInt(-q);
  const d2 = q >= 0 ? d0 << BigInt(q) : d0;
  let sig = n2 / d2;
  const rem = n2 % d2;
  if (rem * 2n > d2 || (rem * 2n === d2 && (sig & 1n) === 1n)) sig += 1n;
  const hidden = 1n << M;
  let biased: number;
  let mant: bigint;
  if (e < emin) {
    if (sig >= hidden) { biased = 1; mant = sig - hidden; } else { biased = 0; mant = sig; }
  } else {
    if (sig >= hidden << 1n) { sig >>= 1n; e++; }
    biased = e + bias;
    mant = sig - hidden;
  }
  if (biased >= Number(expAll)) return signBit(p.neg) | (expAll << M);
  return signBit(p.neg) | (BigInt(biased) << M) | mant;
}

export interface FpDecoded {
  sign: number; expField: bigint; mant: bigint;
  cls: 'zero' | 'subnormal' | 'normal' | 'inf' | 'nan';
  sig: bigint; k: number; // |value| = sig * 2^k for finite values
}

export function decodeFp(f: FpFormat, bits: bigint): FpDecoded {
  const M = BigInt(f.m), E = BigInt(f.e);
  const bias = (1 << (f.e - 1)) - 1;
  const mant = bits & ((1n << M) - 1n);
  const expField = (bits >> M) & ((1n << E) - 1n);
  const sign = Number((bits >> (E + M)) & 1n);
  if (expField === (1n << E) - 1n) return { sign, expField, mant, cls: mant === 0n ? 'inf' : 'nan', sig: 0n, k: 0 };
  if (expField === 0n) return { sign, expField, mant, cls: mant === 0n ? 'zero' : 'subnormal', sig: mant, k: 1 - bias - f.m };
  return { sign, expField, mant, cls: 'normal', sig: (1n << M) | mant, k: Number(expField) - bias - f.m };
}

export function exactDecimal(sig: bigint, k: number): string {
  if (sig === 0n) return '0';
  if (k >= 0) return (sig << BigInt(k)).toString();
  const n = -k;
  let s = (sig * 5n ** BigInt(n)).toString();
  if (s.length < n + 1) s = '0'.repeat(n + 1 - s.length) + s;
  const ip = s.slice(0, s.length - n);
  const fp = s.slice(s.length - n).replace(/0+$/, '');
  return fp ? `${ip}.${fp}` : ip;
}

function ratToNumber(n: bigint, d: bigint): number {
  if (n === 0n) return 0;
  const scale = 64 - (bl(n) - bl(d));
  const q = scale >= 0 ? (n << BigInt(scale)) / d : n / (d << BigInt(-scale));
  return Number(q) * 2 ** Math.trunc(-scale / 2) * 2 ** (-scale - Math.trunc(-scale / 2));
}

const clip = (s: string) => (s.length > 70 ? `${s.slice(0, 50)}… (${s.length} characters, truncated)` : s);
const hexOf = (bits: bigint, f: FpFormat) => bits.toString(16).toUpperCase().padStart((f.e + f.m + 1) / 4, '0');
const binFields = (bits: bigint, f: FpFormat) => {
  const b = bits.toString(2).padStart(1 + f.e + f.m, '0');
  return `${b.slice(0, 1)} | ${b.slice(1, 1 + f.e)} | ${b.slice(1 + f.e)}`;
};
const CLS: Record<string, string> = { zero: 'Zero', subnormal: 'Subnormal', normal: 'Normal', inf: 'Infinity', nan: 'NaN' };

function fpRows(f: FpFormat, bits: bigint, input?: Parsed): CalcResult[] {
  const d = decodeFp(f, bits);
  const bias = (1 << (f.e - 1)) - 1;
  const sgn = d.sign ? '-' : '';
  let stored: string;
  if (d.cls === 'nan') stored = 'NaN';
  else if (d.cls === 'inf') stored = `${sgn}Infinity`;
  else if (d.cls === 'zero') stored = `${sgn}0`;
  else stored = sgn + clip(exactDecimal(d.sig, d.k));
  const unb = d.cls === 'normal' ? `${Number(d.expField) - bias}` : d.cls === 'subnormal' ? `${1 - bias} (subnormal)` : 'n/a';
  const rows: CalcResult[] = [];
  if (input) rows.push({ label: 'Hex', value: `0x${hexOf(bits, f)}`, main: true });
  rows.push({ label: 'Sign | exponent | mantissa', value: binFields(bits, f) });
  rows.push({ label: 'Class', value: CLS[d.cls] });
  rows.push({ label: 'Exponent field / bias / unbiased', value: `${d.expField} / ${bias} / ${unb}` });
  rows.push({ label: 'Stored value (exact decimal)', value: stored, main: !input });
  if (input) {
    let err = 'n/a';
    if (input.kind === 'num' && (d.cls === 'zero' || d.cls === 'subnormal' || d.cls === 'normal')) {
      const sn = d.sig, sd = d.k >= 0 ? 1n : 1n << BigInt(-d.k);
      const sN = d.k >= 0 ? sn << BigInt(d.k) : sn;
      const sSigned = d.sign ? -sN : sN;
      const iSigned = input.neg ? -input.num : input.num;
      let diff = sSigned * input.den - iSigned * sd;
      if (diff < 0n) diff = -diff;
      err = diff === 0n ? '0 (exactly representable)' : `${ratToNumber(diff, sd * input.den).toPrecision(4)} (absolute)`;
    } else if (input.kind === 'num') err = 'Overflowed to infinity';
    else err = 'n/a (special value)';
    rows.push({ label: 'Rounding error vs input', value: err });
  }
  rows.push({ label: 'Layout', value: `1 sign + ${f.e} exponent + ${f.m} mantissa bits` });
  return rows;
}

export function ieee754(v: Record<string, any>): CalcResult[] {
  const f = FP_FORMATS[String(v.format)];
  if (!f) return bad('Choose a format.');
  if (String(v.mode) === 'decode') {
    const h = String(v.hex ?? '').replace(/^\s*0x/i, '').replace(/[\s_]/g, '');
    const want = (f.e + f.m + 1) / 4;
    if (!/^[0-9a-fA-F]+$/.test(h)) return bad('Hex input may contain only 0-9 and A-F.');
    if (h.length !== want) return bad(`${f.name} needs exactly ${want} hex digits (got ${h.length}).`);
    return fpRows(f, BigInt('0x' + h));
  }
  const raw = String(v.value ?? '');
  if (raw.trim() === '') return bad('Enter a decimal number (or NaN, inf, -inf).');
  const p = parseDecimal(raw);
  if (!p) return bad('Could not read the number. Use forms like 0.1, -2, 1.5e-7, inf or NaN (at most 400 digits and |exponent| ≤ 400).');
  return fpRows(f, encodeFp(f, p), p);
}

/* ----------------------------------------------------------------- PCB */

export const IPC2221 = { kExternal: 0.048, kInternal: 0.024, bTemp: 0.44, cArea: 0.725, milPerOz: 1.378, rhoCu: 1.72e-8 };

export function traceAreaSqMil(current: number, dT: number, k: number): number {
  return Math.pow(current / (k * Math.pow(dT, IPC2221.bTemp)), 1 / IPC2221.cArea);
}

export function pcbTrace(v: Record<string, any>): CalcResult[] {
  const I = parseNum(v.current), dT = parseNum(v.rise), oz = parseNum(v.oz);
  const len = blank(v.length) ? 0 : parseNum(v.length);
  if (!(I > 0) || I > 1000) return bad('Current must be greater than 0 A (at most 1000 A).');
  if (!(dT > 0) || dT > 200) return bad('Temperature rise must be greater than 0 °C (at most 200 °C).');
  if (![0.5, 1, 2, 3].includes(oz)) return bad('Copper weight must be 0.5, 1, 2 or 3 oz.');
  if (!Number.isFinite(len) || len < 0 || len > 100000) return bad('Trace length must be 0 or more mm (leave empty to skip resistance).');
  const internal = String(v.layer) === 'internal';
  const k = internal ? IPC2221.kInternal : IPC2221.kExternal;
  const area = traceAreaSqMil(I, dT, k);
  const thick = oz * IPC2221.milPerOz;
  const wMil = area / thick;
  const wMm = wMil * 0.0254;
  const out: CalcResult[] = [
    { label: 'Minimum trace width', value: `${num(wMil, 2)} mil (${num(wMm, 3)} mm)`, main: true },
    { label: 'Cross-section', value: `${num(area, 2)} mil² (${num(area * 0.0254 * 0.0254, 5)} mm²)` },
    { label: 'Copper thickness', value: `${num(thick, 3)} mil (${num(thick * 0.0254 * 1000, 1)} µm)` },
  ];
  if (len > 0) {
    const areaM2 = area * 0.0254 * 0.0254 * 1e-6;
    const R = (IPC2221.rhoCu * (len / 1000)) / areaM2;
    out.push({ label: 'DC resistance (approx., 20 °C)', value: `${num(R * 1000, 2)} mΩ` });
    out.push({ label: 'Voltage drop at this current', value: `${num(R * I * 1000, 2)} mV` });
    out.push({ label: 'Power dissipated (I²R)', value: `${num(R * I * I * 1000, 2)} mW` });
  }
  out.push({ label: 'Range note', value: I > 35 || dT < 10 || dT > 100 ? 'Outside the 35 A / 10-100 °C span of the IPC-2221 charts; treat as extrapolation' : 'Within the 35 A / 10-100 °C span of the IPC-2221 charts' });
  return out;
}

/* ----------------------------------------------------------------- CRC */

export interface CrcAlgo { name: string; width: number; poly: number; init: number; refin: boolean; refout: boolean; xorout: number }
export const CRC_ALGOS: Record<string, CrcAlgo> = {
  crc8: { name: 'CRC-8', width: 8, poly: 0x07, init: 0x00, refin: false, refout: false, xorout: 0x00 },
  ccitt: { name: 'CRC-16/CCITT-FALSE', width: 16, poly: 0x1021, init: 0xffff, refin: false, refout: false, xorout: 0x0000 },
  modbus: { name: 'CRC-16/MODBUS', width: 16, poly: 0x8005, init: 0xffff, refin: true, refout: true, xorout: 0x0000 },
  crc32: { name: 'CRC-32 (IEEE 802.3)', width: 32, poly: 0x04c11db7, init: 0xffffffff, refin: true, refout: true, xorout: 0xffffffff },
};

const rev = (x: number, bits: number) => { let r = 0; for (let i = 0; i < bits; i++) { r = (r * 2) + (x & 1); x = x >>> 1; } return r; };

export function crc(a: CrcAlgo, data: number[]): number {
  const mask = a.width === 32 ? 0xffffffff : (1 << a.width) - 1;
  const top = a.width === 32 ? 0x80000000 : 1 << (a.width - 1);
  let c = a.init >>> 0;
  for (const byte of data) {
    const b = a.refin ? rev(byte, 8) : byte;
    c = (c ^ ((b * 2 ** (a.width - 8)) >>> 0)) >>> 0;
    for (let i = 0; i < 8; i++) c = ((((c & top) !== 0 ? (c << 1) ^ a.poly : c << 1) & mask) >>> 0);
  }
  if (a.refout) c = rev(c, a.width) >>> 0;
  return (c ^ a.xorout) >>> 0;
}

export function parseHexBytes(s: string): number[] | string {
  const h = s.replace(/0x/gi, '').replace(/[\s,:_-]/g, '');
  if (h.length === 0) return 'Enter at least one byte.';
  if (!/^[0-9a-fA-F]+$/.test(h)) return 'Hex bytes may contain only 0-9, A-F and separators (space, comma, colon).';
  if (h.length % 2 !== 0) return 'Hex input has an odd number of digits; each byte needs two.';
  const out: number[] = [];
  for (let i = 0; i < h.length; i += 2) out.push(parseInt(h.slice(i, i + 2), 16));
  return out;
}

export function crcCalc(v: Record<string, any>): CalcResult[] {
  const a = CRC_ALGOS[String(v.algo)];
  if (!a) return bad('Choose an algorithm.');
  const text = String(v.data ?? '');
  let bytes: number[];
  if (String(v.mode) === 'hex') {
    const r = parseHexBytes(text);
    if (typeof r === 'string') return bad(r);
    bytes = r;
  } else {
    if (text.length === 0) return bad('Enter at least one byte.');
    bytes = Array.from(new TextEncoder().encode(text));
  }
  if (bytes.length > 100000) return bad('Input is limited to 100,000 bytes.');
  const c = crc(a, bytes);
  const digits = a.width / 4;
  const hx = c.toString(16).toUpperCase().padStart(digits, '0');
  const out: CalcResult[] = [
    { label: `${a.name} (hex)`, value: `0x${hx}`, main: true },
    { label: 'Decimal', value: int(c) },
    { label: 'Input length', value: `${bytes.length} byte${bytes.length === 1 ? '' : 's'}` },
    { label: 'Parameters', value: `poly 0x${a.poly.toString(16).toUpperCase().padStart(digits, '0')}, init 0x${a.init.toString(16).toUpperCase().padStart(digits, '0')}, refin ${a.refin ? 'yes' : 'no'}, refout ${a.refout ? 'yes' : 'no'}, xorout 0x${a.xorout.toString(16).toUpperCase().padStart(digits, '0')}` },
  ];
  if (String(v.algo) === 'modbus') {
    const lo = hx.slice(2), hi = hx.slice(0, 2);
    out.push({ label: 'Modbus RTU bytes (low byte first)', value: `${lo} ${hi}` });
    out.push({ label: 'Frame with CRC appended', value: bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')).concat([lo, hi]).join(' ') });
  }
  return out;
}

export const COMPUTES_ELEC1: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'adc-resolution-calculator': adcResolution,
  'ieee-754-converter': ieee754,
  'pcb-trace-width-calculator': pcbTrace,
  'crc-calculator': crcCalc,
};
void safe;
