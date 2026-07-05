import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u });
const BLANK = (k: string, l: string, u?: string): any => ({ key: k, label: l, type: 'number', def: '' as any, unit: u });

export const SCIENCE: ToolDef[] = [
{
  slug: 'ohms-law-calculator', name: "Ohm's Law Calculator", prio: 'P1', category: 'science', widget: 'calc',
  short: 'Solve for voltage, current, or resistance given any two values.',
  metaDescription: 'Free online Ohm\'s Law Calculator. Solve for voltage, current, and resistance easily in your browser without tracking.',
  keywords: ["ohm's law calculator",'voltage current resistance calculator','v ir calculator','electrical calculator'],
  fields: [BLANK('voltage','Voltage (V — leave blank to solve','V'), BLANK('current','Current (I — leave blank to solve','A'), BLANK('resistance','Resistance (R — leave blank to solve','Ω')],
  content: {
    intro: "Solve Ohm's Law for any unknown — voltage, current, or resistance — by entering any two known values. The tool also calculates power (P = V×I).",
    how: "Ohm's Law: V = I × R. Enter any two values and leave the third blank. Power P = V × I is always calculated from the result.",
    howSteps: [
      'Provide any two of the three variables: Voltage, Current, or Resistance.',
      'Leave the third variable blank to identify it as the target for calculation.',
      'The engine uses Ohm\'s Law (V=IR) to instantly calculate the missing value and total power.'
    ],
    faqs: [
      ['What are typical household voltages?','120 V AC in North America, 230 V AC in Europe. DC circuits vary widely — 5 V USB, 12 V automotive, 48 V PoE.'],
      ['What unit is resistance measured in?','Ohms (Ω). Real components range from milliohms (0.001 Ω) in wire to megaohms (1,000,000 Ω) in insulation.'],
      ['How do I measure resistance safely?','Always power off the circuit before measuring resistance with a multimeter. Never measure resistance in a live circuit.'],
    ],
  },
  related: ['voltage-divider-calculator','resistor-color-code-calculator','torque-calculator','density-calculator'],
},
{
  slug: 'resistor-color-code-calculator', name: 'Resistor Color Code Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Decode a 4-band resistor color code to its resistance value.',
  metaDescription: 'Resistor Color Code Calculator online. Decode 4-band resistor color patterns into resistance and tolerance values quickly.',
  keywords: ['resistor color code calculator','resistor color code','read resistor color bands','resistor calculator'],
  fields: [{key:'band1',label:'Band 1 (1st digit)',type:'select',def:'brown',options:['black','brown','red','orange','yellow','green','blue','violet','grey','white'].map(c=>({value:c,label:c.charAt(0).toUpperCase()+c.slice(1)}))},{key:'band2',label:'Band 2 (2nd digit)',type:'select',def:'black',options:['black','brown','red','orange','yellow','green','blue','violet','grey','white'].map(c=>({value:c,label:c.charAt(0).toUpperCase()+c.slice(1)}))},{key:'band3',label:'Band 3 (multiplier)',type:'select',def:'red',options:['black','brown','red','orange','yellow','green','blue','violet','grey','white'].map(c=>({value:c,label:c.charAt(0).toUpperCase()+c.slice(1)}))},{key:'tolerance',label:'Band 4 (tolerance)',type:'select',def:'gold',options:[{value:'gold',label:'Gold ±5%'},{value:'silver',label:'Silver ±10%'},{value:'brown',label:'Brown ±1%'},{value:'red',label:'Red ±2%'},{value:'green',label:'Green ±0.5%'},{value:'blue',label:'Blue ±0.25%'},{value:'violet',label:'Violet ±0.1%'},{value:'grey',label:'Grey ±0.05%'}]}],
  content: {
    intro: 'Decode any 4-band resistor color code to its resistance value and tolerance range — the essential tool for anyone working with electronics.',
    how: 'Bands 1 and 2 give the first two digits; band 3 is the multiplier (power of 10); band 4 is tolerance. Value = (10×d1 + d2) × 10^multiplier.',
    howSteps: [
      'Select the color for the first band (first digit).',
      'Select the color for the second band (second digit).',
      'Select the color for the multiplier band and tolerance band to receive the final resistance.'
    ],
    faqs: [
      ['How do I read the bands?','Hold the resistor with the tolerance band (gold/silver) on the right. Read left to right: two digits, multiplier, tolerance.'],
      ['What if there is no 4th band?','A resistor with no tolerance band is assumed ±20% — only found in older components.'],
      ['What is a 5-band resistor?','High-precision resistors add a third digit band before the multiplier. This calculator covers the common 4-band type.'],
    ],
  },
  related: ["ohms-law-calculator",'voltage-divider-calculator','number-base-converter','hash-generator'],
},
{
  slug: 'voltage-divider-calculator', name: 'Voltage Divider Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Output voltage, current, and power for a resistor voltage divider.',
  metaDescription: 'Free Voltage Divider Calculator. Find the exact output voltage for resistor voltage divider circuits in electronics prototyping.',
  keywords: ['voltage divider calculator','resistor divider calculator','vout calculator','voltage divider formula'],
  fields: [$('vin','Input voltage (Vin)',12,'V'),$('r1','R1 (top resistor)',10000,'Ω'),$('r2','R2 (bottom resistor)',10000,'Ω')],
  content: {
    intro: 'Calculate the output voltage, divider current, and power dissipation of a simple resistor voltage divider — one of the most common circuits in electronics.',
    how: 'Vout = Vin × R2 / (R1 + R2). Current = Vin / (R1 + R2). Power = Vin × I. The output is taken across R2.',
    howSteps: [
      'Enter the starting Input Voltage (Vin).',
      'Specify the resistance for both the top (R1) and bottom (R2) resistors.',
      'The tool processes the division ratio to output final Vout and dissipated power.'
    ],
    faqs: [
      ['When do I use a voltage divider?','To step down a voltage for signal conditioning, reference voltages, or biasing. Not suitable for powering loads — use a regulator for that.'],
      ['Why does a load affect the output?','A load in parallel with R2 reduces the effective resistance and pulls the output voltage down. Use a buffer op-amp if the load varies.'],
      ['How do I choose R1 and R2?','Target Vout = Vin × R2/(R1+R2). Keep total resistance high enough to limit current waste, but low enough to not be affected by load.'],
    ],
  },
  related: ["ohms-law-calculator",'resistor-color-code-calculator','torque-calculator','density-calculator'],
},
{
  slug: 'torque-calculator', name: 'Torque Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Calculate torque in N·m, ft·lb, and in·lb from force and moment arm.',
  metaDescription: 'Calculate mechanical torque online safely. Find rotational force in N-m or ft-lb from applied force and moment arm length.',
  keywords: ['torque calculator','torque formula calculator','newton meters calculator','ft lb torque calculator'],
  fields: [$('force','Force (Newtons)',100,'N'),$('arm','Moment arm / lever length (meters)',0.5,'m')],
  content: {
    intro: 'Calculate rotational torque in Newton-metres, foot-pounds, and inch-pounds from a force and its perpendicular distance from the pivot (moment arm).',
    how: 'Torque (τ) = Force (F) × Moment arm (r). SI unit is N·m. The moment arm is the perpendicular distance from the line of action of the force to the rotation axis.',
    howSteps: [
      'Input the force applied (in Newtons or pounds).',
      'Enter the length of the moment arm or lever.',
      'Read the calculated torque across multiple standard measurement units.'
    ],
    faqs: [
      ['What is a moment arm?','The perpendicular distance from the pivot (rotation axis) to the line along which the force acts. A longer wrench gives more torque for the same force.'],
      ['How do ft·lb and N·m relate?','1 ft·lb = 1.356 N·m. Bolt torque specs in the US are usually in ft·lb or in·lb; metric specs use N·m.'],
      ['What is angular vs linear force?','A linear force applied at a distance creates torque. Torque is what makes things rotate — it is the rotational equivalent of force.'],
    ],
  },
  related: ['newtons-second-law-calculator','density-calculator',"ohms-law-calculator",'kinematic-calculator'],
},
{
  slug: 'newtons-second-law-calculator', name: "Newton's Second Law Calculator", prio: 'P1', category: 'science', widget: 'calc',
  short: 'Solve F = ma for force, mass, or acceleration.',
  metaDescription: 'Newton\'s Second Law Calculator. Solve F = ma instantly for Force, Mass, or Acceleration. Completely free browser tool.',
  keywords: ["newton's second law calculator",'force mass acceleration calculator','f ma calculator','physics calculator'],
  fields: [BLANK('force','Force (F — leave blank to solve','N'), BLANK('mass','Mass (m — leave blank to solve','kg'), BLANK('acceleration','Acceleration (a — leave blank to solve','m/s²')],
  content: {
    intro: "Calculate force, mass, or acceleration using Newton's Second Law (F = ma) — the fundamental equation of classical mechanics.",
    how: 'F = m × a. Enter any two values and leave the third blank. The tool also shows the equivalent weight at Earth gravity (9.81 m/s²).',
    howSteps: [
      'Enter two of the three variables: Force, Mass, or Acceleration.',
      'Leave the variable you want to solve for completely blank.',
      'The calculator computes the remaining physical property using Newton\'s F=ma theorem.'
    ],
    faqs: [
      ['What are typical everyday force values?','Lifting a 1 kg book against gravity requires about 9.81 N. A car engine might produce 5,000–50,000 N of thrust.'],
      ['What is the difference between mass and weight?','Mass (kg) is the amount of matter and does not change. Weight (N) = mass × gravitational acceleration and varies by location.'],
      ['What is net force?','The sum of all forces acting on an object. Newton\'s Second Law applies to net force — individual forces must be added vectorially.'],
    ],
  },
  related: ['torque-calculator','kinematic-calculator','density-calculator',"ohms-law-calculator"],
},
{
  slug: 'density-calculator', name: 'Density Calculator', prio: 'P1', category: 'science', widget: 'calc',
  short: 'Solve for density, mass, or volume (ρ = m/V).',
  metaDescription: 'Calculate Density online. Solve for density, mass, or volume easily using the standard ρ = m/V physics equation securely.',
  keywords: ['density calculator','mass volume density calculator','how to calculate density','physics density formula'],
  fields: [BLANK('mass','Mass (m — leave blank to solve','kg'), BLANK('volume','Volume (V — leave blank to solve','m³'), BLANK('density','Density (ρ — leave blank to solve','kg/m³')],
  content: {
    intro: 'Calculate density, mass, or volume using ρ = m/V — with a float/sink comparison relative to water density.',
    how: 'Enter any two values and leave the third blank. Density relative to water (1,000 kg/m³) determines whether an object floats (< 1.0) or sinks (> 1.0).',
    howSteps: [
      'Enter two variables from Mass, Volume, or Density.',
      'Keep the variable you want to solve for blank.',
      'Review the calculated result along with a comparison of buoyancy to water.'
    ],
    faqs: [
      ['What are common material densities?','Water: 1,000 kg/m³. Aluminum: 2,700. Steel: 7,850. Lead: 11,340. Air: ~1.2. Gold: 19,300.'],
      ['Why do ships float if steel sinks?','A steel ship is mostly air inside. The average density of the ship (steel + air + cargo) is less than water, so it floats.'],
      ['How do I convert units?','This calculator uses SI (kg and m³). Convert: 1 g/cm³ = 1,000 kg/m³. 1 lb/ft³ = 16.02 kg/m³.'],
    ],
  },
  related: ['newtons-second-law-calculator','torque-calculator','ph-calculator','half-life-calculator'],
},
{
  slug: 'ph-calculator', name: 'pH Calculator', prio: 'P1', category: 'science', widget: 'calc',
  short: 'H⁺ concentration, pOH, and classification from a pH value.',
  metaDescription: 'Free online pH Calculator. Determine Hydrogen ion concentration and pOH values from simple pH numbers for chemistry tasks.',
  keywords: ['ph calculator','ph to hydrogen ion concentration','acid base calculator','poh calculator'],
  fields: [$('ph','pH value',7,undefined)],
  content: {
    intro: 'Enter a pH value to instantly see the hydrogen ion concentration, hydroxide concentration, pOH, acid/base classification, and a real-world example at that pH level.',
    how: '[H⁺] = 10^(-pH). pOH = 14 - pH. [OH⁻] = 10^(-pOH). pH below 7 is acidic; above 7 is alkaline; exactly 7 is neutral (pure water at 25°C).',
    howSteps: [
      'Enter the numerical pH value (0 to 14).',
      'The engine automatically processes the logarithmic formulas for concentration.',
      'View the specific Hydrogen and Hydroxide ion concentration levels alongside acidity classes.'
    ],
    faqs: [
      ['What is the pH scale?','A logarithmic scale from 0 (most acidic) to 14 (most basic), measuring hydrogen ion concentration. Each step is a 10× change.'],
      ['Why is the scale logarithmic?','Hydrogen ion concentrations span 14 orders of magnitude — from 10 mol/L at pH 0 to 10⁻¹⁴ mol/L at pH 14. Logarithms compress this range.'],
      ['What is the pH of blood?','Normal blood pH is tightly regulated at 7.35–7.45. Values outside 6.8–7.8 are life-threatening.'],
    ],
  },
  related: ['density-calculator','half-life-calculator','ohms-law-calculator','newtons-second-law-calculator'],
},
{
  slug: 'half-life-calculator', name: 'Half-Life Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Remaining quantity after radioactive decay over any time period.',
  metaDescription: 'Calculate Half-Life decay rates online. Free calculator to determine remaining quantities of radioactive isotopes securely.',
  keywords: ['half-life calculator','radioactive decay calculator','half life formula','nuclear decay calculator'],
  fields: [$('initial','Initial amount',1000),$('halfLife','Half-life (time units)',5),$('time','Time elapsed (same units)',15)],
  content: {
    intro: 'Calculate the remaining amount of a radioactive substance after decay, given the initial quantity, half-life, and elapsed time.',
    how: 'Remaining = initial × (0.5)^(time / half-life). The units of time and half-life must match (both in years, days, seconds, etc.).',
    howSteps: [
      'Input the initial quantity of the substance.',
      'Enter the specific half-life of the isotope in your time unit.',
      'Provide elapsed time to let the tool model exponential radioactive decay remaining.'
    ],
    faqs: [
      ['What is a half-life?','The time it takes for half of a radioactive substance to decay. Each half-life halves the remaining amount — never reaching exactly zero.'],
      ['How is half-life used in medicine?','Radioactive tracers and treatments are chosen partly by half-life — long enough to be effective, short enough to clear the body safely.'],
      ['What has a very short half-life?','Francium-223: 22 minutes. Technetium-99m (medical imaging): 6 hours. Carbon-14 (dating): 5,730 years.'],
    ],
  },
  related: ['ph-calculator','density-calculator','newtons-second-law-calculator','standard-deviation-calculator'],
},
{
  slug: 'kinematic-calculator', name: 'Kinematics Calculator', prio: 'P2', category: 'science', widget: 'calc',
  short: 'Solve SUVAT equations for velocity, acceleration, time, and displacement.',
  metaDescription: 'Kinematics Calculator online. Solve SUVAT physics equations instantly for velocity, displacement, and acceleration. Privacy first tool.',
  keywords: ['kinematics calculator','suvat calculator','velocity acceleration calculator','physics motion calculator'],
  fields: [BLANK('initial','Initial velocity u (m/s)','m/s'), BLANK('acceleration','Acceleration a (m/s²)','m/s²'), BLANK('time','Time t (s)','s'), BLANK('displacement','Displacement s (m)','m')],
  content: {
    intro: 'Solve SUVAT kinematics equations for any unknown — initial velocity, acceleration, time, or displacement — by entering at least two known values.',
    how: 'Uses the equations v = u + at and s = ut + ½at² to solve for unknowns. Enter any two values and the tool calculates the rest.',
    howSteps: [
      'Input any known variables (velocity, acceleration, time, displacement).',
      'Leave unknown fields blank.',
      'The SUVAT solver resolves the missing kinematic parameters accurately.'
    ],
    faqs: [
      ['What are SUVAT equations?','A set of equations for uniform (constant) acceleration: s=displacement, u=initial velocity, v=final velocity, a=acceleration, t=time.'],
      ['What if acceleration is not constant?','SUVAT only applies to constant acceleration. For variable acceleration, calculus (integration) is needed.'],
      ['How do I solve a free-fall problem?','Set a = 9.81 m/s² (or -9.81 if upward is positive), enter your known values, and leave the unknown blank.'],
    ],
  },
  related: ['newtons-second-law-calculator','torque-calculator','density-calculator','slope-calculator'],
},
];
