import { ToolDef } from '../types';

export const EXTRA: ToolDef[] = [
{
  slug: 'sleep-calculator', name: 'Sleep Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Best bedtimes and wake times based on 90-minute sleep cycles.',
  metaDescription: 'Free Sleep Calculator. Find the best bedtime or wake-up time using 90-minute sleep cycles for better rest.',
  keywords: ['sleep calculator', 'sleep cycle calculator', 'best bedtime calculator', 'when to wake up'],
  fields: [{ key: 'wake', label: 'Desired wake time (24h)', type: 'text', def: '07:00' }],
  content: {
    intro: 'Calculate ideal bedtimes based on 90-minute sleep cycles so you wake up at the end of a cycle instead of in the middle of deep sleep.',
    how: 'A full sleep cycle is roughly 90 minutes. The tool subtracts 4–6 cycles (6–9 hours) from your wake time, plus ~15 minutes to fall asleep.',
    howSteps: [
      'Enter the time you need to wake up.',
      'The calculator lists bedtimes for 4, 5, and 6 full sleep cycles.',
      'Choose the bedtime that gives you enough sleep without waking mid-cycle.'
    ],
    faqs: [
      ['Why 90-minute cycles?', 'Sleep progresses through light, deep, and REM stages in roughly 90-minute cycles. Waking at the end of a cycle feels more refreshed.'],
      ['How much sleep do I need?', 'Most adults need 7–9 hours. The tool shows options in that range.'],
      ['Does this replace a sleep study?', 'No. It is a practical guide based on average cycle length. Individual sleep varies.'],
    ],
  },
  related: ['bmi-calculator', 'tdee-calculator', 'pace-calculator', 'water-intake-calculator'],
},
{
  slug: 'water-intake-calculator', name: 'Water Intake Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Daily water recommendation based on weight and activity.',
  metaDescription: 'Calculate how much water you should drink daily. Free water intake calculator based on weight and activity level.',
  keywords: ['water intake calculator', 'how much water should I drink', 'daily water calculator'],
  fields: [{ key: 'weight', label: 'Weight (kg)', type: 'number', def: 70, min: 30, max: 300 }, { key: 'activity', label: 'Activity', type: 'select', def: 'moderate', options: [{ value: 'sedentary', label: 'Sedentary' }, { value: 'moderate', label: 'Moderate' }, { value: 'active', label: 'Active' }] }],
  content: {
    intro: 'Estimate your daily water needs. A common starting point is 30–35 ml per kg of body weight, adjusted for activity.',
    how: 'Base = weight(kg) × 33 ml. Active people may need more. This is a general guide, not medical advice.',
    howSteps: [
      'Enter your weight in kilograms.',
      'Select your typical activity level.',
      'See the suggested daily water intake in liters and ounces.'
    ],
    faqs: [
      ['Is 8 glasses enough?', '8 glasses (~2 L) is a rough average. Needs vary by weight, climate, and exercise.'],
      ['Does coffee count?', 'Yes, most beverages contribute to fluid intake, though water is best for pure hydration.'],
      ['When should I drink more?', 'Hot weather, intense exercise, or illness increases needs.'],
    ],
  },
  related: ['bmi-calculator', 'tdee-calculator', 'calorie-calculator', 'sleep-calculator'],
},
{
  slug: 'heart-rate-zone-calculator', name: 'Heart Rate Zone Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Training heart rate zones from your age and resting HR.',
  metaDescription: 'Calculate your heart rate training zones. Free calculator for fat burn, cardio, and peak zones.',
  keywords: ['heart rate zone calculator', 'target heart rate', 'cardio zones'],
  fields: [{ key: 'age', label: 'Age', type: 'number', def: 30, min: 10, max: 100 }, { key: 'resting', label: 'Resting heart rate (optional)', type: 'number', def: 60, min: 40, max: 120 }],
  content: {
    intro: 'Find your heart rate zones for different training goals using the Karvonen formula or simple percentage of max heart rate.',
    how: 'Estimated max HR = 220 − age. Zones are typically 50–60% (warm-up), 60–70% (fat burn), 70–80% (cardio), 80–90% (peak).',
    howSteps: [
      'Enter your age.',
      'Optionally enter your resting heart rate for the Karvonen method.',
      'Review the BPM ranges for each training zone.'
    ],
    faqs: [
      ['What is the Karvonen method?', 'It uses heart rate reserve (max − resting) for more personalized zones.'],
      ['Is 220 − age accurate?', 'It is a rough estimate. A lab test or field test is more precise.'],
      ['Which zone for weight loss?', 'The fat-burn zone (60–70%) is often recommended, but total calorie burn matters more.'],
    ],
  },
  related: ['pace-calculator', 'tdee-calculator', 'one-rep-max-calculator', 'bmi-calculator'],
},
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
  slug: 'triangle-area-calculator', name: 'Triangle Area Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Area of a triangle from base and height, or three sides (Heron\'s formula).',
  metaDescription: 'Calculate triangle area. Free calculator using base×height or Heron\'s formula from three sides.',
  keywords: ['triangle area calculator', 'herons formula', 'area of triangle'],
  fields: [{ key: 'base', label: 'Base', type: 'number', def: 10, min: 0 }, { key: 'height', label: 'Height', type: 'number', def: 5, min: 0 }],
  content: {
    intro: 'Calculate the area of a triangle. The simplest method is (base × height) ÷ 2. For three sides, use Heron\'s formula.',
    how: 'Area = (b × h) / 2. Heron\'s formula: s = (a+b+c)/2, Area = √[s(s−a)(s−b)(s−c)].',
    howSteps: [
      'Enter the base and height of the triangle.',
      'The calculator applies the standard area formula.',
      'View the area in the same units squared.'
    ],
    faqs: [
      ['What if I only know the three sides?', 'Use Heron\'s formula. Many geometry calculators support both methods.'],
      ['Does the height have to be inside the triangle?', 'No. For obtuse triangles the height may fall outside, but the formula still works.'],
      ['Units?', 'The result is in square units of whatever you entered (cm², in², etc.).'],
    ],
  },
  related: ['percentage-calculator', 'circle-area-calculator', 'slope-calculator', 'quadratic-formula-calculator'],
},
{
  slug: 'circle-area-calculator', name: 'Circle Area Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Area and circumference of a circle from radius or diameter.',
  metaDescription: 'Calculate circle area and circumference. Free online circle calculator using radius or diameter.',
  keywords: ['circle area calculator', 'circumference calculator', 'area of circle'],
  fields: [{ key: 'radius', label: 'Radius', type: 'number', def: 5, min: 0 }],
  content: {
    intro: 'Calculate the area and circumference of a circle from its radius. Area = πr², Circumference = 2πr.',
    how: 'Uses the mathematical constant π ≈ 3.14159. Diameter = 2 × radius.',
    howSteps: [
      'Enter the radius of the circle.',
      'The tool computes area and circumference.',
      'Optionally convert between radius and diameter.'
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
  fields: [{ key: 'length', label: 'Length (ft or m)', type: 'number', def: 10, min: 0 }, { key: 'width', label: 'Width', type: 'number', def: 10, min: 0 }, { key: 'thickness', label: 'Thickness', type: 'number', def: 0.33, min: 0 }],
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
];
