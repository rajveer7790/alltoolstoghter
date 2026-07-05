import { ToolDef } from '../types';

export const UNITS: ToolDef[] = [
{
  slug: 'unit-converter', name: 'Unit Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'length',
  short: 'Convert length, weight, temperature, area, volume, speed, and data units.',
  metaDescription: 'Free online Unit Converter. Convert length, weight, temperature, speed, area, volume, and data sizes instantly with exact international definitions.',
  keywords: ['unit converter', 'unit conversion', 'measurement converter', 'metric to imperial'],
  content: {
    intro: 'One converter for every common measurement: pick a category, choose your units, and the conversion updates as you type — using exact international definitions.',
    how: 'All conversions normalize through a base unit with exact factors (1 in = 0.0254 m, 1 lb = 0.45359237 kg). Temperature converts by formula because its scales have different zero points.',
    howSteps: [
      'Select the category of measurement you want to convert (e.g., Length or Weight).',
      'Choose your starting unit and your target unit.',
      'Enter the value, and the engine calculates the exact conversion instantly.'
    ],
    faqs: [
      ['Are the factors exact?', 'Yes — they are the international (SI) definitions, not approximations: the inch is defined as exactly 25.4 mm.'],
      ['US vs UK gallons?', 'Different units: 1 US gal = 3.785 L, 1 UK gal = 4.546 L. The volume converter lists both.'],
      ['KB vs KiB?', 'Decimal (1000-based) vs binary (1024-based). Storage marketing uses decimal; operating systems often report binary.']
    ],
  },
  related: ['cm-to-inches', 'kg-to-lbs', 'fuel-economy-converter', 'time-converter'],
},
{
  slug: 'length-converter', name: 'Length Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'length',
  short: 'Meters, feet, inches, kilometers, miles — converted exactly.',
  metaDescription: 'Convert length units online. Calculate meters, feet, inches, kilometers, and miles accurately using international measurement standards.',
  keywords: ['length converter', 'meters to feet', 'distance converter', 'inches to cm'],
  content: {
    intro: 'Convert between every common length unit, metric and imperial, with exact definitions.',
    how: 'Each unit has an exact meter factor (1 ft = 0.3048 m); the value converts through meters. No rounding is introduced beyond display precision.',
    howSteps: [
      'Select your starting length unit and your target length unit.',
      'Input the distance value you wish to translate.',
      'The engine multiplies by the exact SI definition factor for the result.'
    ],
    faqs: [
      ['How many feet in a meter?', 'About 3.28084 — exactly 1 ÷ 0.3048.'],
      ['Miles vs kilometers quick rule?', 'Multiply miles by 1.609. For a head estimate, add 60%.'],
      ['Why is the inch exactly 2.54 cm?', 'By international agreement (1959), the inch is defined as exactly 25.4 mm.']
    ],
  },
  related: ['cm-to-inches', 'unit-converter', 'weight-converter', 'area-converter'],
},
{
  slug: 'weight-converter', name: 'Weight Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'weight',
  short: 'Kilograms, pounds, ounces, stone, and tons — converted exactly.',
  metaDescription: 'Convert weight and mass online. Free calculator for kilograms, pounds, ounces, stone, and tons with exact precision.',
  keywords: ['weight converter', 'kg to pounds', 'mass converter', 'lbs to kg'],
  content: {
    intro: 'Every common mass unit in one place: metric (mg → tons) and imperial (oz, lb, stone).',
    how: 'Conversions pass through kilograms using exact definitions: 1 lb = 0.45359237 kg, 1 stone = 14 lb.',
    howSteps: [
      'Choose the mass unit you have, and the one you want to calculate.',
      'Type in the weight value.',
      'The tool processes the conversion locally using the standard 0.45359237 kg baseline.'
    ],
    faqs: [
      ['Pounds to kg quick rule?', 'Divide by 2.2 (precisely 2.20462).'],
      ['What is a stone?', 'A British unit equal to 14 lb (~6.35 kg), still standard for body weight in the UK.'],
      ['Is weight the same as mass?', 'Technically mass is matter and weight is gravitational force; in everyday conversion they are used interchangeably.']
    ],
  },
  related: ['kg-to-lbs', 'unit-converter', 'length-converter', 'volume-converter'],
},
{
  slug: 'temperature-converter', name: 'Temperature Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'temperature',
  short: 'Celsius, Fahrenheit, and Kelvin with the exact formulas.',
  metaDescription: 'Convert temperatures online safely. Translate between Celsius, Fahrenheit, and Kelvin instantly using exact physics formulas.',
  keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'c to f'],
  content: {
    intro: 'Convert between Celsius, Fahrenheit, and Kelvin instantly — the three temperature scales used in daily life and science.',
    how: 'Temperature scales have different zero points, so factors don\'t work: °F = °C × 9/5 + 32; K = °C + 273.15. The tool applies the formulas exactly.',
    howSteps: [
      'Select Celsius, Fahrenheit, or Kelvin for your starting and target inputs.',
      'Enter the degrees.',
      'The calculator runs the exact algebraic conversion formula to give you the precise temperature.'
    ],
    faqs: [
      ['Where do the scales meet?', '−40° — the one temperature where Celsius and Fahrenheit read the same.'],
      ['Why does science use Kelvin?', 'Kelvin starts at absolute zero, so it has no negative values and works directly in physics equations.'],
      ['Body temperature in each scale?', '37 °C = 98.6 °F = 310.15 K (typical, varies by person and time of day).']
    ],
  },
  related: ['celsius-to-fahrenheit', 'unit-converter', 'length-converter', 'weight-converter'],
},
{
  slug: 'area-converter', name: 'Area Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'area',
  short: 'Square meters, square feet, acres, and hectares.',
  metaDescription: 'Convert area measurements online. Calculate square meters, square feet, acres, and hectares for real estate and construction.',
  keywords: ['area converter', 'square meters to square feet', 'acres to hectares', 'sq ft calculator'],
  content: {
    intro: 'Convert land and floor areas across metric and imperial units, from square meters to acres.',
    how: 'All areas convert through square meters: 1 ft² = 0.09290304 m² exactly; 1 acre = 4,046.856 m²; 1 hectare = 10,000 m².',
    howSteps: [
      'Pick the area units you are converting from and to.',
      'Input the acreage or square footage.',
      'The engine converts the surface area two-dimensionally and outputs the exact figure.'
    ],
    faqs: [
      ['How big is an acre, really?', 'About 75% of an American football field (without end zones), or ~4,047 m².'],
      ['Square feet quick estimate from m²?', 'Multiply m² by ~10.76.'],
      ['Hectares vs acres?', '1 hectare ≈ 2.47 acres — hectares are the metric standard for land worldwide.']
    ],
  },
  related: ['square-feet-to-square-meters', 'unit-converter', 'length-converter', 'volume-converter'],
},
{
  slug: 'volume-converter', name: 'Volume Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'volume',
  short: 'Liters, gallons (US & UK), cups, pints, and fluid ounces.',
  metaDescription: 'Convert volume and liquid measurements online. Free calculator for liters, US/UK gallons, cups, pints, and fluid ounces.',
  keywords: ['volume converter', 'liters to gallons', 'cups to ml', 'fl oz converter'],
  content: {
    intro: 'Kitchen and fuel volumes converted correctly — including the US/UK gallon difference that trips everyone up.',
    how: 'Conversions pass through liters with exact factors: 1 US gal = 3.785411784 L, 1 UK gal = 4.54609 L, 1 US cup = 236.59 mL.',
    howSteps: [
      'Select your starting and ending volume units.',
      'Type the liquid measurement (e.g., 5 gallons).',
      'Get the precise converted volume for cooking or engineering.'
    ],
    faqs: [
      ['Why two gallons?', 'The US kept the old wine gallon; the UK redefined to the imperial gallon in 1824. They differ by ~20%.'],
      ['Is a "cup" universal?', 'No — US legal cup is 240 mL, US customary 236.6 mL, metric cup 250 mL. This tool uses US customary.'],
      ['mL to fl oz quick rule?', 'Divide mL by ~29.6 for US fluid ounces.']
    ],
  },
  related: ['liters-to-gallons', 'unit-converter', 'weight-converter', 'area-converter'],
},
{
  slug: 'speed-converter', name: 'Speed Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'speed',
  short: 'km/h, mph, m/s, and knots converted exactly.',
  metaDescription: 'Convert speed units online. Translate kilometers per hour (km/h), miles per hour (mph), meters per second, and knots instantly.',
  keywords: ['speed converter', 'kmh to mph', 'knots to mph', 'velocity calculator'],
  content: {
    intro: 'Convert speeds across road, science, and marine units.',
    how: 'Everything converts through meters per second: 1 mph = 0.44704 m/s exactly; 1 knot = 1 nautical mile per hour = 0.5144 m/s.',
    howSteps: [
      'Select the initial speed metric and your desired converted metric.',
      'Enter the speed value.',
      'The calculator maps the value via meters per second to give you an exact speed.'
    ],
    faqs: [
      ['km/h to mph quick rule?', 'Multiply by 0.62 — 100 km/h ≈ 62 mph.'],
      ['Why do ships and planes use knots?', 'Nautical miles tie to degrees of latitude, making navigation math cleaner.'],
      ['What is a fast sprint in these units?', 'Elite sprinters peak near 12 m/s ≈ 43 km/h ≈ 27 mph.']
    ],
  },
  related: ['fuel-economy-converter', 'unit-converter', 'length-converter', 'pace-calculator'],
},
{
  slug: 'data-storage-converter', name: 'Data Storage Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'data',
  short: 'Bytes through terabytes, in both decimal (GB) and binary (GiB).',
  metaDescription: 'Convert computer data storage units online. Translate safely between Megabytes (MB), Gigabytes (GB), and binary (GiB) formats.',
  keywords: ['data storage converter', 'mb to gb', 'gib vs gb', 'terabyte calculator'],
  content: {
    intro: 'Convert file and drive sizes across bytes, KB/MB/GB/TB and their binary siblings KiB/MiB/GiB.',
    how: 'Decimal units step by 1000 (drive marketing); binary units step by 1024 (how operating systems often report). The converter holds both so you can see why a "1 TB" drive shows ~931 GiB.',
    howSteps: [
      'Choose the storage unit format (Decimal GB vs Binary GiB).',
      'Input the file size or drive capacity.',
      'The tool processes the bit-math locally to show exact bytes and multiples.'
    ],
    faqs: [
      ['Why does my 1 TB drive show 931 GB?', 'It holds 10¹² bytes; your OS reports in binary GiB (1024³), and 10¹² ÷ 1024³ ≈ 931.'],
      ['Which should I use?', 'Match your context: storage products use decimal; RAM and many OS displays use binary.'],
      ['Bits vs bytes?', '8 bits = 1 byte. Internet speeds are usually megabits (Mb), file sizes megabytes (MB) — an 8× difference.']
    ],
  },
  related: ['unit-converter', 'length-converter', 'speed-converter', 'weight-converter'],
},
{
  slug: 'cm-to-inches', name: 'CM to Inches Converter', prio: 'P1', category: 'unit-converters', widget: 'converter', converterKind: 'length',
  fields: [{ key: '_preset', label: '', type: 'text', def: JSON.stringify({ from: 'cm', to: 'in', def: 170 }) }],
  short: 'Centimeters to inches (and back) with the exact 2.54 definition.',
  metaDescription: 'Convert CM to Inches easily online. Fast, precise centimeter to inch calculator using the exact 2.54 international standard.',
  keywords: ['cm to inches', 'centimeters to inches', 'inches to cm'],
  content: {
    intro: 'The fastest cm ⇄ inches conversion: type a value, get the exact answer both ways.',
    how: 'Inches = cm ÷ 2.54 — exact by definition since 1959. Common anchors: 30 cm ≈ 11.8 in (a school ruler), 2.54 cm = 1 in.',
    howSteps: [
      'Enter the length in centimeters.',
      'The tool divides the value precisely by 2.54.',
      'Copy the converted length in inches.'
    ],
    faqs: [
      ['How many inches is 170 cm?', '66.93 inches — about 5 feet 7 inches.'],
      ['Quick mental rule?', 'Divide cm by 2.5 for a close estimate; refine by subtracting 1.6%.'],
      ['Why 2.54 exactly?', 'The 1959 international yard agreement fixed the inch at exactly 25.4 mm worldwide.']
    ],
  },
  related: ['length-converter', 'unit-converter', 'kg-to-lbs', 'celsius-to-fahrenheit'],
},
{
  slug: 'kg-to-lbs', name: 'KG to LBS Converter', prio: 'P1', category: 'unit-converters', widget: 'converter', converterKind: 'weight',
  fields: [{ key: '_preset', label: '', type: 'text', def: JSON.stringify({ from: 'kg', to: 'lb', def: 70 }) }],
  short: 'Kilograms to pounds (and back) using the exact definition.',
  metaDescription: 'Convert KG to LBS instantly. Accurate kilogram to pound mass calculator for fitness, shipping, and travel.',
  keywords: ['kg to lbs', 'kilograms to pounds', 'lbs to kg'],
  content: {
    intro: 'Convert body weight, luggage, or shipping mass between kilograms and pounds instantly.',
    how: 'Pounds = kg × 2.20462 (the pound is defined as exactly 0.45359237 kg). Airline luggage example: a 23 kg allowance is 50.7 lb.',
    howSteps: [
      'Enter the mass in kilograms.',
      'The engine multiplies by 2.20462.',
      'Read the precise equivalent in pounds.'
    ],
    faqs: [
      ['How many pounds is 70 kg?', '154.3 lb.'],
      ['Quick mental rule?', 'Double the kg and add 10%: 70 → 140 + 14 = 154.'],
      ['Which countries use pounds?', 'Mainly the US for everyday weight; most of the world uses kilograms.']
    ],
  },
  related: ['weight-converter', 'unit-converter', 'cm-to-inches', 'bmi-calculator'],
},
{
  slug: 'celsius-to-fahrenheit', name: 'Celsius to Fahrenheit Converter', prio: 'P1', category: 'unit-converters', widget: 'converter', converterKind: 'temperature',
  fields: [{ key: '_preset', label: '', type: 'text', def: JSON.stringify({ from: 'C', to: 'F', def: 25 }) }],
  short: '°C to °F (and back) with the exact formula.',
  metaDescription: 'Convert Celsius to Fahrenheit online instantly. Accurate C to F temperature calculator for weather, travel, and cooking.',
  keywords: ['celsius to fahrenheit', 'c to f', 'fahrenheit to celsius'],
  content: {
    intro: 'Convert temperatures between Celsius and Fahrenheit for weather, cooking, and travel.',
    how: '°F = °C × 9/5 + 32. Anchors worth memorizing: 0 °C = 32 °F (freezing), 100 °C = 212 °F (boiling), 180 °C = 356 °F (common oven setting).',
    howSteps: [
      'Enter the temperature in Celsius.',
      'The tool applies the specific offset formula (°C × 9/5 + 32).',
      'Read the temperature in Fahrenheit.'
    ],
    faqs: [
      ['What is 25 °C in Fahrenheit?', '77 °F — pleasant room-to-warm weather.'],
      ['Quick mental rule?', 'Double the °C and add 30 (approximate): 20 °C → ~70 °F (exact: 68).'],
      ['Why does the US use Fahrenheit?', 'Historical adoption; Fahrenheit\'s finer degrees suited weather reporting before decimals were common.']
    ],
  },
  related: ['temperature-converter', 'unit-converter', 'cm-to-inches', 'kg-to-lbs'],
},
{
  slug: 'liters-to-gallons', name: 'Liters to Gallons Converter', prio: 'P1', category: 'unit-converters', widget: 'converter', converterKind: 'volume',
  fields: [{ key: '_preset', label: '', type: 'text', def: JSON.stringify({ from: 'l', to: 'galUS', def: 50 }) }],
  short: 'Liters to US gallons (and back), with the UK gallon one click away.',
  metaDescription: 'Convert Liters to Gallons online. Fast volume calculator supporting both US and UK Imperial Gallons for precision liquid measuring.',
  keywords: ['liters to gallons', 'l to gal', 'gallons to liters'],
  content: {
    intro: 'Convert fuel and liquid volumes between liters and gallons — defaulting to US gallons, with UK gallons available in the unit list.',
    how: 'US gallons = liters ÷ 3.785411784. A 50 L fuel tank is 13.2 US gal; remember UK gallons are ~20% larger.',
    howSteps: [
      'Enter the liquid volume in liters.',
      'Choose whether you want US Gallons or UK (Imperial) Gallons.',
      'The tool calculates the volume instantly based on the correct regional divisor.'
    ],
    faqs: [
      ['How many liters in a US gallon?', '3.785 L exactly (3.785411784).'],
      ['US or UK gallon for fuel economy?', 'US mpg uses US gallons; UK mpg uses imperial gallons — the same car scores ~20% "better" in UK mpg.'],
      ['Quick mental rule?', 'Divide liters by 4 for a rough US-gallon estimate, then add 5%.']
    ],
  },
  related: ['volume-converter', 'unit-converter', 'kg-to-lbs', 'cm-to-inches'],
},
{
  slug: 'pressure-converter', name: 'Pressure Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'pressure',
  short: 'Pascals, bar, PSI, atmospheres, and mmHg converted exactly.',
  metaDescription: 'Convert pressure measurements online. Calculate Pascals, Bar, PSI, and Atmospheres securely with our engineering tool.',
  keywords: ['pressure converter', 'psi to bar', 'bar to psi'],
  content: {
    intro: 'Convert between every common pressure unit, from scientific pascals to automotive PSI and barometric mmHg.',
    how: 'All pressures normalize through pascals using exact factors: 1 PSI = 6894.757 Pa, 1 bar = 100,000 Pa, 1 atm = 101,325 Pa.',
    howSteps: [
      'Select your starting and ending pressure units.',
      'Enter the known pressure value.',
      'The engine normalizes via Pascals to output the converted metric.'
    ],
    faqs: [
      ['PSI to bar quick rule?', 'Divide PSI by about 14.5; 30 PSI is roughly 2.07 bar.'],
      ['What is standard atmospheric pressure?', '1 atm = 101,325 Pa = 14.7 PSI = 1.013 bar at sea level.'],
      ['Why is tire pressure in PSI or bar?', 'Regional convention: PSI dominates in the US, bar in much of Europe. The numbers differ ~14.5x.']
    ],
  },
  related: ['unit-converter', 'energy-converter', 'power-converter', 'temperature-converter'],
},
{
  slug: 'energy-converter', name: 'Energy Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'energy',
  short: 'Joules, calories, kilowatt-hours, and more converted exactly.',
  metaDescription: 'Convert energy units online. Free tool to calculate Joules, calories, and kilowatt-hours accurately for science and fitness.',
  keywords: ['energy converter', 'joules to calories', 'kwh to joules'],
  content: {
    intro: 'Convert energy across scientific, nutritional, and electrical units, from joules to food calories to kilowatt-hours.',
    how: 'Everything normalizes through joules: 1 calorie = 4.184 J, 1 kWh = 3,600,000 J. Note the food Calorie is actually a kilocalorie.',
    howSteps: [
      'Select the initial energy format and the format you want to translate to.',
      'Input your energy value.',
      'Read the converted result.'
    ],
    faqs: [
      ['Is a food Calorie the same as a calorie?', 'No — the dietary Calorie (capital C) is 1000 small calories, i.e. a kilocalorie. This trips up many conversions.'],
      ['How many joules in a kWh?', 'Exactly 3.6 million (3,600,000 J), since 1 watt for 1 hour is 3600 J.'],
      ['Where are these units used?', 'Joules in physics, calories in nutrition, kWh on electricity bills.']
    ],
  },
  related: ['unit-converter', 'power-converter', 'pressure-converter', 'temperature-converter'],
},
{
  slug: 'power-converter', name: 'Power Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'power',
  short: 'Watts, kilowatts, and horsepower converted exactly.',
  metaDescription: 'Convert power metrics online instantly. Calculate watts, kilowatts, and horsepower (mechanical and metric) accurately.',
  keywords: ['power converter', 'watts to hp', 'kw to horsepower'],
  content: {
    intro: 'Convert power between watts, kilowatts, and both mechanical and metric horsepower.',
    how: 'Power normalizes through watts: 1 mechanical horsepower = 745.7 W, 1 metric horsepower (PS) = 735.5 W. The two horsepower definitions differ slightly.',
    howSteps: [
      'Choose between watts, kilowatts, or horsepower.',
      'Enter the numerical power rating.',
      'The engine calculates the conversion using the standard Watt baseline.'
    ],
    faqs: [
      ['HP to kW quick rule?', 'Multiply horsepower by about 0.746; 200 HP is roughly 149 kW.'],
      ['Mechanical vs metric horsepower?', 'Mechanical (Imperial) HP is 745.7 W; metric HP (PS, used in Europe) is 735.5 W, about 1.4% less.'],
      ['Why do car specs use kW and HP?', 'Regional convention; the EU lists kW officially, while HP/PS remains popular in marketing.']
    ],
  },
  related: ['unit-converter', 'energy-converter', 'pressure-converter', 'speed-converter'],
},
{
  slug: 'time-converter', name: 'Time Unit Converter', prio: 'P2', category: 'unit-converters', widget: 'converter', converterKind: 'time',
  short: 'Milliseconds, seconds, minutes, hours, days, and weeks.',
  metaDescription: 'Convert time units instantly online. Calculate milliseconds, seconds, minutes, hours, days, and weeks safely without server pinging.',
  keywords: ['time converter', 'hours to minutes', 'seconds to hours', 'time calculator'],
  content: {
    intro: 'Convert durations across time units, from milliseconds to weeks.',
    how: 'All durations normalize through seconds with exact factors: 1 hour = 3600 s, 1 day = 86,400 s, 1 week = 604,800 s.',
    howSteps: [
      'Pick the source duration unit and target duration unit.',
      'Enter the amount of time.',
      'The system parses it down to seconds and converts it back up to your target.'
    ],
    faqs: [
      ['How many seconds in a day?', 'Exactly 86,400 (24 x 60 x 60).'],
      ['How many minutes in a week?', '10,080 minutes (7 x 24 x 60).'],
      ['Does this handle months or years?', 'No — months and years vary in length, so this tool covers fixed-length units up to weeks.']
    ],
  },
  related: ['unit-converter', 'speed-converter', 'data-storage-converter', 'energy-converter'],
},
{
  slug: 'square-feet-to-square-meters', name: 'Square Feet to Square Meters', prio: 'P1', category: 'unit-converters', widget: 'converter', converterKind: 'area',
  fields: [{ key: '_preset', label: '', type: 'text', def: JSON.stringify({ from: 'ft2', to: 'm2', def: 1000 }) }],
  short: 'Convert sq ft to sq m (and back) with the exact factor.',
  metaDescription: 'Convert Square Feet to Square Meters (sqft to sqm) online quickly. Accurate area conversion calculator for homes and property.',
  keywords: ['square feet to square meters', 'sqft to sqm', 'square meters to square feet'],
  content: {
    intro: 'The fast square-feet to square-meters converter for floor plans, real estate, and flooring estimates.',
    how: 'Square meters = square feet x 0.092903 (exactly, since 1 ft = 0.3048 m and area scales by the square). A 1000 sq ft apartment is about 92.9 sq m.',
    howSteps: [
      'Enter the square footage of the room or property.',
      'The engine multiplies by 0.092903 to derive the precise area.',
      'Copy the converted value in square meters.'
    ],
    faqs: [
      ['How many square meters is 1000 sq ft?', '92.9 sq m.'],
      ['Quick mental rule?', 'Divide square feet by about 10.76 to get square meters.'],
      ['Why does area use a squared factor?', 'Area is two-dimensional, so the linear factor (0.3048) is squared to 0.092903.']
    ],
  },
  related: ['area-converter', 'unit-converter', 'length-converter', 'cm-to-inches'],
},
{
  slug: 'fuel-economy-converter', name: 'Fuel Economy Converter', prio: 'P2', category: 'unit-converters', widget: 'fuel',
  short: 'Convert MPG (US & UK) to L/100km and back.',
  metaDescription: 'Convert Fuel Economy ratings online instantly. Switch between US MPG, UK MPG, and liters per 100km (l/100km) to compare cars accurately.',
  keywords: ['fuel economy converter', 'mpg to l/100km', 'l/100km to mpg'],
  content: {
    intro: 'Convert fuel economy between US MPG, UK MPG, and metric liters per 100 km — the inverse relationship that trips up many drivers comparing cars across regions.',
    how: 'MPG and L/100km are inversely related: L/100km = 235.215 / US MPG (or 282.481 / UK MPG). The tool converts everything through L/100km, so all three figures stay in sync.',
    howSteps: [
      'Enter your vehicle\'s fuel rating.',
      'Select whether it is stated in US MPG, UK MPG, or L/100km.',
      'The calculator determines the inverse metrics to show the exact equivalent in other regions.'
    ],
    faqs: [
      ['Why is the relationship inverse?', 'MPG measures distance per unit of fuel; L/100km measures fuel per fixed distance. As one rises, the other falls — they are reciprocals.'],
      ['Why do US and UK MPG differ?', 'The UK gallon is about 20% larger than the US gallon, so the same efficiency shows a higher number in UK MPG.'],
      ['What is a good L/100km?', 'Lower is better. Efficient cars often sit around 5 to 7 L/100km, roughly 34 to 47 US MPG.'],
    ],
  },
  related: ['volume-converter', 'liters-to-gallons', 'speed-converter', 'unit-converter'],
},
{
  slug: 'currency-converter', name: 'Currency Converter', prio: 'P1', category: 'unit-converters', widget: 'currencyconverter',
  short: 'Convert between 50+ currencies with live ECB exchange rates.',
  metaDescription: 'Live Currency Converter online. Convert between 50+ global currencies using daily mid-market rates from the European Central Bank.',
  keywords: ['currency converter', 'currency exchange', 'exchange rate calculator', 'foreign currency converter', 'money converter'],
  content: {
    intro: 'Convert between more than 50 world currencies using live exchange rates from the European Central Bank, updated every business day — with a quick comparison table showing your amount in all major currencies at once.',
    how: 'Rates are fetched from Frankfurter (an ECB data mirror), which publishes official reference rates after the 4 PM CET fix each business day. The comparison grid lets you tap any currency to instantly make it your target.',
    howSteps: [
      'Select the currency you hold and the currency you wish to buy.',
      'Enter the monetary amount.',
      'The engine fetches the latest ECB mid-market reference rate to give you a precise conversion.'
    ],
    faqs: [
      ['How current are the rates?', 'The ECB publishes official reference rates once per business day at approximately 4 PM CET. Weekends and public holidays show the last business-day rate.'],
      ['Are these rates what banks charge?', 'No — these are mid-market (interbank) rates. Banks and money transfer services add a spread or fee on top, so your actual rate will differ.'],
      ['Why are some currencies missing?', 'The ECB tracks the currencies it actively monitors. Major currencies like USD, GBP, JPY, and CNY are included; some smaller currencies are not tracked.'],
    ],
  },
  related: ['unit-converter', 'tip-calculator', 'sales-tax-calculator', 'discount-calculator'],
},
{
  slug: 'usd-to-eur', name: 'USD to EUR', prio: 'P1', category: 'unit-converters', widget: 'currencyconverter',
  short: 'Convert US Dollars to Euros at today\'s live rate.',
  metaDescription: 'Convert US Dollars (USD) to Euros (EUR) instantly. Check today\'s official mid-market exchange rate directly from the ECB.',
  keywords: ['usd to eur', 'dollars to euros', 'dollar euro converter', 'usd eur exchange rate'],
  content: {
    intro: 'Convert US Dollars to Euros instantly using the live ECB reference rate — the most-searched currency pair in the world.',
    how: 'The rate is the ECB official mid-market fix, published daily. Enter any dollar amount and see euros, plus the inverse rate and a full cross-currency comparison.',
    howSteps: [
      'Type your USD amount into the converter.',
      'The system queries the latest European Central Bank fixing rate.',
      'Read the exact Euro output and view the cross-currency grid for global rates.'
    ],
    faqs: [
      ['When does the USD/EUR rate update?', 'The ECB publishes its reference rate each business day around 4 PM CET. The rate shown is always the latest available fix.'],
      ['Is 1 USD always less than 1 EUR?', 'Not always — the rate fluctuates. The EUR has traded both above and below 1 USD historically.'],
      ['Why does my bank show a different rate?', 'Banks add a margin to the mid-market rate. The ECB rate is the theoretical midpoint with no spread built in.'],
    ],
  },
  related: ['currency-converter', 'eur-to-usd', 'usd-to-gbp', 'usd-to-inr'],
},
{
  slug: 'eur-to-usd', name: 'EUR to USD', prio: 'P1', category: 'unit-converters', widget: 'currencyconverter',
  short: 'Convert Euros to US Dollars at today\'s live rate.',
  metaDescription: 'Convert Euros (EUR) to US Dollars (USD) online. Fast, live currency calculator using official European Central Bank reference rates.',
  keywords: ['eur to usd', 'euros to dollars', 'euro dollar converter', 'eur usd exchange rate'],
  content: {
    intro: 'Convert Euros to US Dollars at the live ECB reference rate — the most traded currency pair in the world by volume.',
    how: 'The ECB mid-market rate is fetched live and the inverse is shown automatically, so you can convert in either direction without swapping manually.',
    howSteps: [
      'Enter your Euro amount into the tool.',
      'The API retrieves the daily mid-market fix from the ECB.',
      'Copy the converted USD amount.'
    ],
    faqs: [
      ['What is the EUR/USD rate today?', 'The widget shows the current ECB fix. Tap the tool to see the live rate — it updates each business day.'],
      ['Is EUR always stronger than USD?', 'Historically the euro has traded above one dollar, but the rate fluctuates and parity (1:1) has occurred.'],
      ['Can I use this for travel budgeting?', 'Yes — it gives you the midmarket rate for planning. Add 2–5% for a realistic estimate of what you will pay at exchange counters.'],
    ],
  },
  related: ['currency-converter', 'usd-to-eur', 'usd-to-gbp', 'usd-to-inr'],
},
{
  slug: 'usd-to-gbp', name: 'USD to GBP', prio: 'P2', category: 'unit-converters', widget: 'currencyconverter',
  short: 'Convert US Dollars to British Pounds at the live rate.',
  metaDescription: 'Convert USD to GBP online instantly. Check the real-time Dollar to British Pound exchange rate using official daily fixes.',
  keywords: ['usd to gbp', 'dollars to pounds', 'dollar pound converter', 'usd gbp exchange rate'],
  content: {
    intro: 'Convert US Dollars to British Pounds Sterling at the live ECB reference rate, with the inverse rate and cross-currency comparison included.',
    how: 'Rates are the ECB official fix from the latest business day. Swap the currencies with one click to convert GBP back to USD.',
    howSteps: [
      'Enter the USD volume to convert.',
      'The application fetches the latest market fix for the Pound Sterling.',
      'Instantly read the accurate GBP amount.'
    ],
    faqs: [
      ['Is GBP always worth more than USD?', 'The British pound has historically been worth more than one US dollar, but the rate fluctuates with economic conditions.'],
      ['What is cable in forex?', 'GBP/USD is nicknamed "cable" after the 19th-century transatlantic telegraph cable used to transmit exchange rates.'],
      ['How does Brexit affect GBP?', 'GBP experienced significant volatility around Brexit events. The ECB rate shown reflects current market conditions.'],
    ],
  },
  related: ['currency-converter', 'usd-to-eur', 'eur-to-usd', 'usd-to-inr'],
},
{
  slug: 'usd-to-inr', name: 'USD to INR', prio: 'P2', category: 'unit-converters', widget: 'currencyconverter',
  short: 'Convert US Dollars to Indian Rupees at the live rate.',
  metaDescription: 'Convert USD to INR online using live market rates. Check the US Dollar to Indian Rupee exchange securely for remittances or travel.',
  keywords: ['usd to inr', 'dollar to rupee', 'usd inr converter', 'dollar rupee exchange rate'],
  content: {
    intro: 'Convert US Dollars to Indian Rupees at the live ECB reference rate — one of the most-searched currency pairs globally, popular with NRIs and businesses trading with India.',
    how: 'The ECB tracks INR as part of its global basket. Rates update each business day. The comparison grid shows your dollar amount in all major currencies simultaneously.',
    howSteps: [
      'Enter your USD figure.',
      'The tool queries the live international exchange data feed.',
      'Use the generated INR output for remittance estimations or financial planning.'
    ],
    faqs: [
      ['Why does the USD/INR rate keep rising?', 'Long-term INR depreciation against USD reflects differences in inflation rates and monetary policy. Short-term moves can go either way.'],
      ['What is RBI\'s role in the exchange rate?', 'The Reserve Bank of India intervenes to manage excessive volatility. The rate shown is the ECB midmarket reference, not the RBI fixing.'],
      ['Can I use this for remittance calculations?', 'Good for estimating — but add 1–3% for the spread money transfer services charge. Services like Wise show their exact rates live.'],
      ['How do I calculate INR from USD manually?', 'Multiply the dollar amount by the current exchange rate. For example, if the rate is 83.5, then 100 USD × 83.5 = ₹8,350. This tool fetches the live ECB rate and does that multiplication for you.'],
    ],
  },
  related: ['currency-converter', 'usd-to-eur', 'usd-to-gbp', 'unit-converter'],
},
];
