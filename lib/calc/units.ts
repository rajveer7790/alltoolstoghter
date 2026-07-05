/** Factor tables: value_in_base = value * factor. Temperature handled specially. */
export interface UnitKind { name: string; base: string; units: Record<string, { label: string; factor: number }> }

export const UNIT_KINDS: Record<string, UnitKind> = {
  length: { name: 'Length', base: 'm', units: {
    mm: { label: 'Millimeters', factor: 0.001 }, cm: { label: 'Centimeters', factor: 0.01 },
    m: { label: 'Meters', factor: 1 }, km: { label: 'Kilometers', factor: 1000 },
    in: { label: 'Inches', factor: 0.0254 }, ft: { label: 'Feet', factor: 0.3048 },
    yd: { label: 'Yards', factor: 0.9144 }, mi: { label: 'Miles', factor: 1609.344 } } },
  weight: { name: 'Weight', base: 'kg', units: {
    mg: { label: 'Milligrams', factor: 1e-6 }, g: { label: 'Grams', factor: 0.001 },
    kg: { label: 'Kilograms', factor: 1 }, t: { label: 'Metric tons', factor: 1000 },
    oz: { label: 'Ounces', factor: 0.028349523125 }, lb: { label: 'Pounds', factor: 0.45359237 },
    st: { label: 'Stone', factor: 6.35029318 } } },
  area: { name: 'Area', base: 'm2', units: {
    m2: { label: 'Square meters', factor: 1 }, km2: { label: 'Square kilometers', factor: 1e6 },
    ft2: { label: 'Square feet', factor: 0.09290304 }, yd2: { label: 'Square yards', factor: 0.83612736 },
    ac: { label: 'Acres', factor: 4046.8564224 }, ha: { label: 'Hectares', factor: 10000 } } },
  volume: { name: 'Volume', base: 'l', units: {
    ml: { label: 'Milliliters', factor: 0.001 }, l: { label: 'Liters', factor: 1 },
    galUS: { label: 'Gallons (US)', factor: 3.785411784 }, galUK: { label: 'Gallons (UK)', factor: 4.54609 },
    qt: { label: 'Quarts (US)', factor: 0.946352946 }, pt: { label: 'Pints (US)', factor: 0.473176473 },
    cup: { label: 'Cups (US)', factor: 0.2365882365 }, floz: { label: 'Fluid ounces (US)', factor: 0.0295735295625 } } },
  speed: { name: 'Speed', base: 'mps', units: {
    mps: { label: 'Meters/second', factor: 1 }, kmh: { label: 'Kilometers/hour', factor: 0.2777777778 },
    mph: { label: 'Miles/hour', factor: 0.44704 }, kn: { label: 'Knots', factor: 0.5144444444 } } },
  data: { name: 'Data storage', base: 'B', units: {
    B: { label: 'Bytes', factor: 1 }, KB: { label: 'Kilobytes (1000)', factor: 1e3 },
    MB: { label: 'Megabytes (1000²)', factor: 1e6 }, GB: { label: 'Gigabytes (1000³)', factor: 1e9 },
    TB: { label: 'Terabytes (1000⁴)', factor: 1e12 }, KiB: { label: 'Kibibytes (1024)', factor: 1024 },
    MiB: { label: 'Mebibytes (1024²)', factor: 1048576 }, GiB: { label: 'Gibibytes (1024³)', factor: 1073741824 } } },
  pressure: { name: 'Pressure', base: 'pa', units: {
    pa: { label: 'Pascals', factor: 1 }, kpa: { label: 'Kilopascals', factor: 1000 },
    bar: { label: 'Bar', factor: 100000 }, psi: { label: 'PSI', factor: 6894.757293 },
    atm: { label: 'Atmospheres', factor: 101325 }, mmhg: { label: 'mmHg (Torr)', factor: 133.322 } } },
  energy: { name: 'Energy', base: 'j', units: {
    j: { label: 'Joules', factor: 1 }, kj: { label: 'Kilojoules', factor: 1000 },
    cal: { label: 'Calories', factor: 4.184 }, kcal: { label: 'Kilocalories', factor: 4184 },
    wh: { label: 'Watt-hours', factor: 3600 }, kwh: { label: 'Kilowatt-hours', factor: 3600000 } } },
  power: { name: 'Power', base: 'w', units: {
    w: { label: 'Watts', factor: 1 }, kw: { label: 'Kilowatts', factor: 1000 },
    hp: { label: 'Horsepower (mech)', factor: 745.6999 }, ps: { label: 'Metric horsepower', factor: 735.49875 } } },
  time: { name: 'Time', base: 's', units: {
    ms: { label: 'Milliseconds', factor: 0.001 }, s: { label: 'Seconds', factor: 1 },
    min: { label: 'Minutes', factor: 60 }, h: { label: 'Hours', factor: 3600 },
    day: { label: 'Days', factor: 86400 }, week: { label: 'Weeks', factor: 604800 } } },
  temperature: { name: 'Temperature', base: 'C', units: {
    C: { label: 'Celsius', factor: 1 }, F: { label: 'Fahrenheit', factor: 1 }, K: { label: 'Kelvin', factor: 1 } } },
};

export function convertUnit(kind: string, value: number, from: string, to: string): number | null {
  if (!Number.isFinite(value)) return null;
  if (kind === 'temperature') {
    let c: number;
    if (from === 'C') c = value; else if (from === 'F') c = (value - 32) * 5 / 9; else c = value - 273.15;
    if (to === 'C') return c; if (to === 'F') return c * 9 / 5 + 32; return c + 273.15;
  }
  const k = UNIT_KINDS[kind]; if (!k) return null;
  const f = k.units[from], t = k.units[to]; if (!f || !t) return null;
  return (value * f.factor) / t.factor;
}
