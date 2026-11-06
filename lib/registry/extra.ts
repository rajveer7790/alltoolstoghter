import { ToolDef } from '../types';

export const EXTRA: ToolDef[] = [
{
  slug: 'fuel-cost-calculator', name: 'Fuel Cost Calculator', prio: 'P1', category: 'finance', widget: 'calc',
  short: 'Estimate trip fuel cost from distance, MPG/L/100km, and fuel price.',
  metaDescription: 'Calculate trip fuel cost. Free fuel cost calculator for US MPG or metric fuel economy.',
  keywords: ['fuel cost calculator', 'gas cost calculator', 'trip fuel calculator', 'mpg calculator'],
  fields: [{ key: 'distance', label: 'Distance (miles or km)', type: 'number', def: 100, min: 1 }, { key: 'economy', label: 'Fuel economy (MPG or L/100km)', type: 'number', def: 25, min: 1 }, { key: 'price', label: 'Fuel price per unit', type: 'number', def: 3.5, min: 0 }, { key: 'unit', label: 'Unit system', type: 'select', def: 'us', options: [{ value: 'us', label: 'US (miles, MPG, $/gallon)' }, { value: 'metric', label: 'Metric (km, L/100km, $/liter)' }] }],
  content: {
    intro: 'Estimate how much a trip will cost in fuel. Supports both US (miles + MPG) and metric (km + L/100km) systems.',
    how: 'US: gallons = miles ÷ MPG; cost = gallons × price. Metric: liters = (km ÷ 100) × L/100km; cost = liters × price.',
    howSteps: [
      'Enter trip distance and your vehicle fuel economy.',
      'Enter the current fuel price.',
      'Choose US or metric units and see the estimated fuel cost.'
    ],
    faqs: [
      ['How accurate is this?', 'It uses your stated economy. Real-world MPG can vary with speed, load, and driving style.'],
      ['Does it include tolls or parking?', 'No — fuel only. Add other costs separately.'],
      ['What if I have an EV?', 'Use electricity price and kWh/100km or mi/kWh instead of fuel.'],
    ],
  },
  related: ['auto-loan-calculator', 'salary-calculator', 'tip-calculator', 'discount-calculator'],
},
{
  slug: 'circle-area-calculator', name: 'Circle Area Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Area and circumference of a circle from its radius.',
  metaDescription: 'Calculate circle area and circumference. Free online circle calculator using radius or diameter.',
  keywords: ['circle area calculator', 'circumference calculator', 'area of circle'],
  fields: [{ key: 'radius', label: 'Radius', type: 'number', def: 5, min: 0 }],
  content: {
    intro: 'Calculate the area and circumference of a circle from its radius. Area = πr², Circumference = 2πr.',
    how: 'Uses the mathematical constant π ≈ 3.14159. Diameter = 2 × radius.',
    howSteps: [
      'Enter the radius of the circle.',
      'The tool computes area and circumference.',
      'The diameter is also shown as twice the radius.'
    ],
    faqs: [
      ['What is π?', 'Pi is the ratio of a circle\'s circumference to its diameter, approximately 3.14159.'],
      ['Can I use diameter?', 'Yes — radius = diameter ÷ 2, then apply the formulas.'],
      ['Units?', 'Area is in square units; circumference is in linear units.'],
    ],
  },
  related: ['triangle-area-calculator', 'percentage-calculator', 'square-root-calculator', 'slope-calculator'],
},
{
  slug: 'scientific-notation-calculator', name: 'Scientific Notation Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Convert numbers to and from scientific notation.',
  metaDescription: 'Convert numbers to scientific notation and back. Free calculator for very large or small numbers.',
  keywords: ['scientific notation calculator', 'standard form calculator', 'convert to scientific notation'],
  fields: [{ key: 'number', label: 'Number', type: 'number', def: 123456789 }],
  content: {
    intro: 'Convert ordinary numbers into scientific notation (a × 10^b) and vice versa. Useful for very large or very small values.',
    how: 'Scientific notation expresses a number as a coefficient between 1 and 10 multiplied by a power of 10.',
    howSteps: [
      'Enter any number.',
      'The calculator shows it in scientific notation.',
      'You can also enter scientific notation to expand it.'
    ],
    faqs: [
      ['Why use scientific notation?', 'It makes very large (e.g. 6.02 × 10^23) or very small numbers easier to read and calculate.'],
      ['What is the coefficient?', 'The number between 1 and 10 in front of the power of 10.'],
      ['How do I enter it?', 'Most calculators accept forms like 1.23e4 or 1.23 × 10^4.'],
    ],
  },
  related: ['square-root-calculator', 'percentage-calculator', 'logarithm-calculator', 'quadratic-formula-calculator'],
},
{
  slug: 'logarithm-calculator', name: 'Logarithm Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Calculate logarithms with any base (common, natural, or custom).',
  metaDescription: 'Free logarithm calculator. Calculate log, ln, and custom-base logarithms instantly.',
  keywords: ['logarithm calculator', 'log calculator', 'natural log calculator', 'ln calculator'],
  fields: [{ key: 'number', label: 'Number', type: 'number', def: 100, min: 0.0001 }, { key: 'base', label: 'Base (default 10)', type: 'number', def: 10, min: 0.1 }],
  content: {
    intro: 'Calculate the logarithm of a number with any base. Common log (base 10), natural log (base e), or custom base.',
    how: 'log_b(a) = ln(a) / ln(b). The tool handles common, natural, and arbitrary bases.',
    howSteps: [
      'Enter the number you want the log of.',
      'Choose the base (10 for common log, e for natural, or any other).',
      'View the result.'
    ],
    faqs: [
      ['What is a natural logarithm?', 'A logarithm with base e (≈ 2.718). Written as ln(x).'],
      ['What is log without a base?', 'In most contexts it means base 10 (common log).'],
      ['Why can\'t I take log of zero or negative?', 'Logarithms are only defined for positive numbers.'],
    ],
  },
  related: ['scientific-notation-calculator', 'square-root-calculator', 'percentage-calculator', 'quadratic-formula-calculator'],
},
{
  slug: 'permutation-combination-calculator', name: 'Permutation & Combination Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Calculate nPr and nCr for any n and r.',
  metaDescription: 'Calculate permutations and combinations. Free nPr and nCr calculator for probability and statistics.',
  keywords: ['permutation calculator', 'combination calculator', 'npr ncr', 'how many ways'],
  fields: [{ key: 'n', label: 'n (total items)', type: 'number', def: 10, min: 0 }, { key: 'r', label: 'r (chosen)', type: 'number', def: 3, min: 0 }],
  content: {
    intro: 'Calculate permutations (order matters) and combinations (order does not matter). Useful for probability, lottery, and team selection problems.',
    how: 'nPr = n! / (n−r)!. nCr = n! / (r! × (n−r)!).',
    howSteps: [
      'Enter total items (n) and how many you are choosing (r).',
      'The calculator shows both permutations and combinations.',
      'Use the result for probability or counting problems.'
    ],
    faqs: [
      ['Permutation vs combination?', 'Permutations care about order (ABC ≠ BAC). Combinations do not (ABC = BAC).'],
      ['What if r > n?', 'The result is zero — you cannot choose more items than exist.'],
      ['Where is this used?', 'Lottery odds, team selection, password possibilities, and statistics.'],
    ],
  },
  related: ['probability-calculator', 'average-calculator', 'percentage-calculator', 'standard-deviation-calculator'],
},
{
  slug: 'concrete-volume-calculator', name: 'Concrete Volume Calculator', prio: 'P2', category: 'construction', widget: 'calc',
  short: 'Calculate concrete volume for slabs, footings, and columns.',
  metaDescription: 'Free concrete calculator. Estimate volume in cubic yards or cubic meters for slabs and footings.',
  keywords: ['concrete calculator', 'concrete volume calculator', 'how much concrete do I need'],
  fields: [{ key: 'length', label: 'Length (ft)', type: 'number', def: 10, min: 0 }, { key: 'width', label: 'Width (ft)', type: 'number', def: 10, min: 0 }, { key: 'thickness', label: 'Thickness (ft)', type: 'number', def: 0.33, min: 0 }],
  content: {
    intro: 'Estimate the volume of concrete needed for a slab, footing, or similar rectangular pour. Results in cubic feet, cubic yards, and cubic meters.',
    how: 'Volume = length × width × thickness. Convert cubic feet to cubic yards by dividing by 27.',
    howSteps: [
      'Enter length, width, and thickness of the pour.',
      'The calculator computes volume in cubic feet and cubic yards.',
      'Add 5–10% extra for waste and uneven subgrade.'
    ],
    faqs: [
      ['How many cubic yards in a truck?', 'A standard concrete truck holds about 8–10 cubic yards.'],
      ['Should I order extra?', 'Yes — most contractors order 5–10% more to account for waste and uneven ground.'],
      ['What thickness for a driveway?', 'Typically 4 inches (0.33 ft) for residential driveways.'],
    ],
  },
  related: ['paint-calculator', 'flooring-calculator', 'roof-pitch-calculator', 'percentage-calculator'],
},
{
  slug: 'electricity-bill-calculator', name: 'Electricity Bill Calculator', prio: 'P2', category: 'finance', widget: 'calc',
  short: 'Estimate monthly electricity cost from kWh usage and rate.',
  metaDescription: 'Calculate your electricity bill. Free calculator for monthly cost based on kWh used and your rate.',
  keywords: ['electricity bill calculator', 'electric bill calculator', 'kwh cost calculator'],
  fields: [{ key: 'kwh', label: 'kWh used per month', type: 'number', def: 900, min: 0 }, { key: 'rate', label: 'Rate per kWh ($)', type: 'number', def: 0.15, min: 0, step: 0.01 }],
  content: {
    intro: 'Estimate your monthly electricity bill from total kWh used and your utility rate. Useful for comparing appliances or planning usage.',
    how: 'Bill = kWh × rate. Many utilities also add fixed fees — add those separately if needed.',
    howSteps: [
      'Enter your monthly kWh usage (from your bill or meter).',
      'Enter the rate per kWh.',
      'See the estimated energy charge.'
    ],
    faqs: [
      ['Where do I find kWh?', 'On your electric bill or by reading your meter.'],
      ['Does this include fixed fees?', 'No. Many utilities add a monthly service charge. Add it on top of the energy cost.'],
      ['How can I lower it?', 'Switch to LED bulbs, unplug devices, and improve insulation.'],
    ],
  },
  related: ['fuel-cost-calculator', 'savings-calculator', 'salary-calculator', 'tip-calculator'],
},
{
  slug: 'calorie-deficit-calculator', name: 'Calorie Deficit Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'How many calories to cut for a target weekly weight loss.',
  metaDescription: 'Calculate calorie deficit for weight loss. See how many calories to eat to lose 0.5 kg or 1 lb per week.',
  keywords: ['calorie deficit calculator', 'weight loss calorie calculator', 'how many calories to lose weight'],
  fields: [{ key: 'tdee', label: 'Your TDEE (maintenance calories)', type: 'number', def: 2200, min: 1000 }, { key: 'target', label: 'Target loss per week (kg)', type: 'number', def: 0.5, min: 0.1, step: 0.1 }],
  content: {
    intro: 'Calculate the daily calorie deficit needed for a target rate of weight loss. A common sustainable rate is 0.5 kg (about 1 lb) per week.',
    how: '1 kg of fat ≈ 7700 kcal. Daily deficit = (target kg × 7700) ÷ 7. Then calories to eat = TDEE − deficit.',
    howSteps: [
      'Enter your maintenance calories (TDEE).',
      'Enter how many kg you want to lose per week.',
      'See the required daily deficit and new calorie target.'
    ],
    faqs: [
      ['Is a bigger deficit better?', 'Faster loss increases muscle loss and rebound risk. 0.5 kg/week is often more sustainable.'],
      ['What if my TDEE is wrong?', 'Track weight for 2–3 weeks and adjust. Real results beat formulas.'],
      ['Should I go below 1200 calories?', 'Generally not without medical supervision. Very low intakes risk nutrient deficiencies.'],
    ],
  },
  related: ['tdee-calculator', 'calorie-calculator', 'macro-calculator', 'bmi-calculator'],
},
{
  slug: 'waist-to-height-ratio-calculator', name: 'Waist-to-Height Ratio Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'Waist-to-height ratio as a simple health risk indicator.',
  metaDescription: 'Calculate waist-to-height ratio. A simple screening tool for central obesity and health risk.',
  keywords: ['waist to height ratio', 'whtr calculator', 'waist height ratio'],
  fields: [{ key: 'waist', label: 'Waist circumference (cm)', type: 'number', def: 85, min: 40, max: 200 }, { key: 'height', label: 'Height (cm)', type: 'number', def: 172, min: 100, max: 250 }],
  content: {
    intro: 'Waist-to-height ratio (WHtR) is a simple screening tool. Values under 0.5 are generally considered lower risk for many adults.',
    how: 'WHtR = waist ÷ height. Both measurements should be in the same unit.',
    howSteps: [
      'Measure your waist at the navel.',
      'Enter your height.',
      'See your ratio and a general risk category.'
    ],
    faqs: [
      ['What is a healthy ratio?', 'Under 0.5 is often cited as lower risk. This is a population screen, not a diagnosis.'],
      ['How do I measure waist?', 'At the midpoint between the bottom of the ribs and the top of the hips, or at the navel.'],
      ['Is this better than BMI?', 'It focuses on abdominal fat, which is more strongly linked to metabolic risk than BMI alone for some people.'],
    ],
  },
  related: ['bmi-calculator', 'body-fat-calculator', 'waist-to-hip-ratio-calculator', 'tdee-calculator'],
},
{
  slug: 'military-time-converter', name: 'Military Time Converter', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'Convert between 12-hour and 24-hour (military) time.',
  metaDescription: 'Convert military time to standard time and vice versa. Free 24-hour clock converter.',
  keywords: ['military time converter', '24 hour time converter', 'army time converter'],
  fields: [{ key: 'time', label: 'Time (e.g. 14:30 or 2:30 PM)', type: 'text', def: '14:30' }],
  content: {
    intro: 'Convert between 12-hour clock (with AM/PM) and 24-hour military time. Useful for schedules, aviation, and international communication.',
    how: '24-hour time runs from 00:00 to 23:59. 00:00 is midnight, 12:00 is noon, 13:00 is 1 PM, etc.',
    howSteps: [
      'Enter a time in either 12-hour or 24-hour format.',
      'The converter shows the equivalent in the other format.',
      'Midnight is 00:00; noon is 12:00.'
    ],
    faqs: [
      ['What is 0000?', 'Midnight (12:00 AM).'],
      ['What is 1200?', 'Noon (12:00 PM).'],
      ['Why use 24-hour time?', 'It removes AM/PM ambiguity and is standard in military, aviation, and many countries.'],
    ],
  },
  related: ['hours-calculator', 'time-duration-calculator', 'days-between-dates', 'age-calculator'],
},
{
  slug: 'pregnancy-week-calculator', name: 'Pregnancy Week Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Current pregnancy week and trimester from last period.',
  metaDescription: 'Calculate how many weeks pregnant you are. Free pregnancy week calculator from LMP.',
  keywords: ['pregnancy week calculator', 'how many weeks pregnant', 'gestational age calculator'],
  fields: [{ key: 'lmp', label: 'First day of last period', type: 'date', def: '' }],
  content: {
    intro: 'Calculate your current gestational age in weeks and days from the first day of your last menstrual period. Also shows trimester.',
    how: 'Gestational age starts from LMP. A full term pregnancy is about 40 weeks. Trimesters are roughly weeks 1–12, 13–26, and 27–40.',
    howSteps: [
      'Enter the first day of your last period.',
      'The calculator shows weeks and days pregnant.',
      'See which trimester you are in.'
    ],
    faqs: [
      ['Is this the same as due date?', 'Yes — gestational age is how the due date is calculated (LMP + 280 days).'],
      ['What if my cycles are irregular?', 'Ultrasound dating is more accurate. This is an estimate based on LMP.'],
      ['When does the third trimester start?', 'Around week 27.'],
    ],
  },
  related: ['due-date-calculator', 'ovulation-calculator', 'age-calculator', 'days-until-calculator'],
},
{
  slug: 'rectangle-area-calculator', name: 'Rectangle Area Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Area and perimeter of a rectangle from length and width.',
  metaDescription: 'Calculate rectangle area and perimeter. Free online rectangle calculator.',
  keywords: ['rectangle area calculator', 'area of rectangle', 'perimeter calculator'],
  fields: [{ key: 'length', label: 'Length', type: 'number', def: 10, min: 0 }, { key: 'width', label: 'Width', type: 'number', def: 5, min: 0 }],
  content: {
    intro: 'Calculate the area and perimeter of a rectangle. Area = length × width. Perimeter = 2 × (length + width).',
    how: 'Simple multiplication and addition. Works for any units as long as length and width use the same unit.',
    howSteps: [
      'Enter length and width.',
      'View area (square units) and perimeter (linear units).',
      'Use the result for flooring, fencing, or other measurements.'
    ],
    faqs: [
      ['What is the difference between area and perimeter?', 'Area is the space inside (square units). Perimeter is the distance around (linear units).'],
      ['Can I use this for a square?', 'Yes — just enter the same number for length and width.'],
      ['Units?', 'Keep length and width in the same unit. The area will be in square units of that measurement.'],
    ],
  },
  related: ['triangle-area-calculator', 'circle-area-calculator', 'percentage-calculator', 'slope-calculator'],
},
];
