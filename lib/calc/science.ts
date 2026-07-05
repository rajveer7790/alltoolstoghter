import { CalcResult } from '../types';
import { num, pct, safe } from '../format';

export function ohmsLaw(v: Record<string, any>): CalcResult[] {
  const V = safe(v.voltage, -1e15), I = safe(v.current, -1e15), R = safe(v.resistance, -1e15);
  const known = [V, I, R].filter(x => x !== -1e15).length;
  if (known < 2) return [{ label: 'Enter any two values', value: '—', main: true }];
  let voltage = V, current = I, resistance = R;
  if (V === -1e15) voltage = I * R;
  else if (I === -1e15) current = V / R;
  else resistance = V / I;
  const power = voltage * current;
  return [
    { label: 'Voltage (V)', value: num(voltage, 4) + ' V', main: true },
    { label: 'Current (I)', value: num(current, 4) + ' A' },
    { label: 'Resistance (R)', value: num(resistance, 4) + ' Ω' },
    { label: 'Power (P = V×I)', value: num(power, 4) + ' W' },
  ];
}

export function resistorColorCode(v: Record<string, any>): CalcResult[] {
  const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
  const MULT = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 0.01, 0.1];
  const TOL: Record<string, string> = { gold: '±5%', silver: '±10%', brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%', violet: '±0.1%', grey: '±0.05%' };
  const b1 = String(v.band1 || 'brown'), b2 = String(v.band2 || 'black'), b3 = String(v.band3 || 'red'), bt = String(v.tolerance || 'gold');
  const d1 = COLORS.indexOf(b1), d2 = COLORS.indexOf(b2), mult = MULT[COLORS.indexOf(b3)] ?? 1;
  if (d1 < 0 || d2 < 0) return [{ label: 'Invalid band color', value: '—', main: true }];
  const ohms = (d1 * 10 + d2) * mult;
  const tol = TOL[bt] || '±5%';
  const display = ohms >= 1e6 ? num(ohms/1e6,3)+' MΩ' : ohms >= 1000 ? num(ohms/1000,3)+' kΩ' : num(ohms,2)+' Ω';
  return [
    { label: 'Resistance', value: display, main: true },
    { label: 'Tolerance', value: tol },
    { label: 'Range', value: `${num(ohms*(1-parseFloat(tol)/100),1)} – ${num(ohms*(1+parseFloat(tol)/100),1)} Ω` },
    { label: 'Exact value', value: num(ohms,0)+' Ω' },
  ];
}

export function voltageDivider(v: Record<string, any>): CalcResult[] {
  const Vin = safe(v.vin, 0), R1 = safe(v.r1, 0), R2 = safe(v.r2, 0);
  if (R1 + R2 === 0) return [{ label: 'Enter R1 and R2', value: '—', main: true }];
  const Vout = Vin * R2 / (R1 + R2);
  const ratio = R2 / (R1 + R2);
  const current = Vin / (R1 + R2);
  return [
    { label: 'Output voltage (Vout)', value: num(Vout, 4) + ' V', main: true },
    { label: 'Voltage ratio', value: num(ratio, 4) },
    { label: 'Current', value: num(current * 1000, 4) + ' mA' },
    { label: 'Power dissipated', value: num(Vin * current, 4) + ' W' },
  ];
}

export function torque(v: Record<string, any>): CalcResult[] {
  const force = safe(v.force, 0), arm = safe(v.arm, 0);
  const torqueNm = force * arm;
  return [
    { label: 'Torque', value: num(torqueNm, 4) + ' N·m', main: true },
    { label: 'Foot-pounds', value: num(torqueNm * 0.737562, 4) + ' ft·lb' },
    { label: 'Inch-pounds', value: num(torqueNm * 8.85075, 4) + ' in·lb' },
    { label: 'Formula', value: 'τ = F × r (torque = force × moment arm)' },
  ];
}

export function newtonsSecondLaw(v: Record<string, any>): CalcResult[] {
  const F = safe(v.force, -1e15), m = safe(v.mass, -1e15), a = safe(v.acceleration, -1e15);
  const known = [F, m, a].filter(x => x !== -1e15).length;
  if (known < 2) return [{ label: 'Enter any two values', value: '—', main: true }];
  let force = F, mass = m, accel = a;
  if (F === -1e15) force = mass * accel;
  else if (m === -1e15) mass = F / a;
  else accel = F / m;
  return [
    { label: 'Force (F)', value: num(force, 4) + ' N', main: true },
    { label: 'Mass (m)', value: num(mass, 4) + ' kg' },
    { label: 'Acceleration (a)', value: num(accel, 4) + ' m/s²' },
    { label: 'Weight at 1g', value: num(mass * 9.81, 4) + ' N' },
  ];
}

export function densityCalc(v: Record<string, any>): CalcResult[] {
  const mass = safe(v.mass, -1e15), vol = safe(v.volume, -1e15), dens = safe(v.density, -1e15);
  const known = [mass, vol, dens].filter(x => x !== -1e15).length;
  if (known < 2) return [{ label: 'Enter any two values', value: '—', main: true }];
  let m = mass, V = vol, d = dens;
  if (mass === -1e15) m = dens * vol;
  else if (vol === -1e15) V = mass / dens;
  else d = mass / vol;
  const vs_water = d / 1000; // relative to water density 1000 kg/m³
  return [
    { label: 'Density (ρ)', value: num(d, 4) + ' kg/m³', main: true },
    { label: 'Mass', value: num(m, 4) + ' kg' },
    { label: 'Volume', value: num(V, 6) + ' m³' },
    { label: 'Relative to water', value: num(vs_water, 4) + ' (floats if < 1.0)' },
  ];
}

export function phCalc(v: Record<string, any>): CalcResult[] {
  const ph = safe(v.ph, 0, 14);
  const hConc = Math.pow(10, -ph);
  const ohConc = Math.pow(10, -(14 - ph));
  const type = ph < 7 ? 'Acidic' : ph > 7 ? 'Basic (alkaline)' : 'Neutral';
  const examples: Record<number, string> = {1:'Battery acid',2:'Lemon juice',3:'Vinegar',4:'Coffee',5:'Rainwater',6:'Milk',7:'Pure water',8:'Seawater',9:'Baking soda',10:'Antacid',11:'Ammonia',12:'Soapy water',13:'Bleach',14:'Drain cleaner'};
  const rounded = Math.round(ph);
  return [
    { label: 'Classification', value: type, main: true },
    { label: 'H⁺ concentration', value: num(hConc, 3) + ' mol/L' },
    { label: 'OH⁻ concentration', value: num(ohConc, 3) + ' mol/L' },
    { label: 'pOH', value: num(14 - ph, 2) },
    { label: 'Example at this pH', value: examples[rounded] || '—' },
  ];
}

export function halfLife(v: Record<string, any>): CalcResult[] {
  const initial = safe(v.initial, 0), hl = safe(v.halfLife, 0), time = safe(v.time, 0);
  if (hl <= 0) return [{ label: 'Enter half-life', value: '—', main: true }];
  const remaining = initial * Math.pow(0.5, time / hl);
  const decayed = initial - remaining;
  const halfLivesElapsed = time / hl;
  return [
    { label: 'Remaining amount', value: num(remaining, 4), main: true },
    { label: 'Decayed amount', value: num(decayed, 4) },
    { label: 'Percent remaining', value: pct((remaining / initial) * 100, 2) },
    { label: 'Half-lives elapsed', value: num(halfLivesElapsed, 3) },
  ];
}

export function kinematicCalc(v: Record<string, any>): CalcResult[] {
  const u = safe(v.initial, -1e15), a = safe(v.acceleration, -1e15), t = safe(v.time, -1e15), s = safe(v.displacement, -1e15);
  // Solve using SUVAT: s=ut+½at², v=u+at, v²=u²+2as
  let vi = u === -1e15 ? null : u;
  let acc = a === -1e15 ? null : a;
  let time = t === -1e15 ? null : t;
  let disp = s === -1e15 ? null : s;
  // If we have enough, solve for the rest
  let vf: number | null = null;
  if (vi !== null && acc !== null && time !== null) {
    vf = vi + acc * time;
    if (disp === null) disp = vi * time + 0.5 * acc * time ** 2;
  } else if (vi !== null && acc !== null && disp !== null) {
    const disc = vi ** 2 + 2 * acc * disp;
    vf = disc >= 0 ? Math.sqrt(disc) : null;
    if (time === null && acc !== 0 && vf !== null) time = (vf - vi) / acc;
  }
  if (vi === null && vf === null) return [{ label: 'Enter at least 3 known values', value: '—', main: true }];
  return [
    { label: 'Initial velocity (u)', value: vi !== null ? num(vi, 4) + ' m/s' : '—', main: true },
    { label: 'Final velocity (v)', value: vf !== null ? num(vf, 4) + ' m/s' : '—' },
    { label: 'Acceleration (a)', value: acc !== null ? num(acc, 4) + ' m/s²' : '—' },
    { label: 'Time (t)', value: time !== null ? num(time, 4) + ' s' : '—' },
    { label: 'Displacement (s)', value: disp !== null ? num(disp, 4) + ' m' : '—' },
  ];
}
