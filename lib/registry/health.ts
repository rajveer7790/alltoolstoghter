import { ToolDef } from '../types';
const wField: any = { key: 'weight', label: 'Weight', type: 'number', def: 70, min: 1, max: 700 };
const wUnit: any = { key: 'wUnit', label: 'Weight unit', type: 'select', def: 'kg', options: [{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }] };
const hField: any = { key: 'height', label: 'Height', type: 'number', def: 172, min: 30, max: 280 };
const hUnit: any = { key: 'hUnit', label: 'Height unit', type: 'select', def: 'cm', options: [{ value: 'cm', label: 'cm' }, { value: 'in', label: 'inches' }] };
const sexField: any = { key: 'sex', label: 'Sex', type: 'select', def: 'male', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] };
const ageField: any = { key: 'age', label: 'Age', type: 'number', def: 30, unit: 'yrs', min: 1, max: 120 };
const actField: any = { key: 'activity', label: 'Activity level', type: 'select', def: 'moderate', options: [
  { value: 'sedentary', label: 'Sedentary (desk job)' }, { value: 'light', label: 'Light (1–3 workouts/wk)' },
  { value: 'moderate', label: 'Moderate (3–5/wk)' }, { value: 'active', label: 'Active (6–7/wk)' }, { value: 'athlete', label: 'Athlete (2×/day)' }] };

export const HEALTH: ToolDef[] = [
{
  slug: 'bmi-calculator', name: 'BMI Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Body mass index, WHO category, and your healthy weight range.',
  metaDescription: 'Free online BMI Calculator. Calculate your Body Mass Index safely and privately in your browser to see your WHO health category.',
  keywords: ['bmi calculator', 'body mass index calculator', 'check bmi'],
  fields: [wField, wUnit, hField, hUnit],
  content: {
    intro: 'Calculate your body mass index in metric or imperial units and see where it falls on the WHO scale, plus the weight range considered healthy for your height.',
    how: 'BMI = weight(kg) ÷ height(m)². Categories: under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30+ obesity. BMI is a screening number, not a diagnosis — it doesn\'t distinguish muscle from fat.',
    howSteps: [
      'Enter your current weight using kg or lbs.',
      'Enter your height using cm or inches.',
      'The calculator returns your BMI score and the matching WHO category.'
    ],
    faqs: [
      ['Is BMI accurate for athletes?', 'Often not — muscular builds can read "overweight" with low body fat. Treat BMI as a population screen, not a personal verdict.'],
      ['Does age or sex change BMI?', 'The formula is the same; interpretation can differ. Children use age-specific percentile charts instead.'],
      ['What should I do about my result?', 'Use it as one data point. For health decisions, talk to a medical professional who can consider the full picture.'],
    ],
  },
  related: ['bmr-calculator', 'tdee-calculator', 'waist-to-hip-ratio-calculator', 'calorie-calculator'],
},
{
  slug: 'bmr-calculator', name: 'BMR Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Calories your body burns at complete rest (Mifflin-St Jeor).',
  metaDescription: 'Calculate Basal Metabolic Rate (BMR) online. Find out how many calories your body burns at rest using the Mifflin-St Jeor equation.',
  keywords: ['bmr calculator', 'basal metabolic rate calculator', 'resting calories'],
  fields: [sexField, ageField, wField, wUnit, hField, hUnit],
  content: {
    intro: 'Your basal metabolic rate is the energy your body uses just to stay alive — breathing, circulation, cell repair. It is the foundation for any calorie target.',
    how: 'Uses the Mifflin-St Jeor equation, the formula most validated in research: men 10w + 6.25h − 5a + 5; women 10w + 6.25h − 5a − 161 (w in kg, h in cm, a in years).',
    howSteps: [
      'Select your sex, age, weight, and height.',
      'The engine processes the Mifflin-St Jeor formula securely.',
      'Read your BMR, which is the exact number of resting calories burned daily.'
    ],
    faqs: [
      ['BMR vs TDEE?', 'BMR is at rest only. TDEE multiplies BMR by your activity level — it is the number to use for diet planning.'],
      ['Why Mifflin-St Jeor and not Harris-Benedict?', 'Studies show Mifflin-St Jeor predicts measured metabolic rates more accurately for most modern adults.'],
      ['Can I raise my BMR?', 'Muscle tissue burns more at rest than fat, so resistance training nudges BMR up over time.'],
    ],
  },
  related: ['tdee-calculator', 'calorie-calculator', 'macro-calculator', 'bmi-calculator'],
},
{
  slug: 'tdee-calculator', name: 'TDEE Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Total daily energy expenditure: BMR scaled by real activity.',
  metaDescription: 'Free online TDEE Calculator. Calculate Total Daily Energy Expenditure to find the exact calories you need for maintenance, loss, or gain.',
  keywords: ['tdee calculator', 'total daily energy expenditure', 'maintenance calories'],
  fields: [sexField, ageField, wField, wUnit, hField, hUnit, actField],
  content: {
    intro: 'TDEE is the full number of calories you burn in a day — resting metabolism plus movement and exercise. It is your maintenance intake.',
    how: 'TDEE = BMR (Mifflin-St Jeor) × an activity factor from 1.2 (sedentary) to 1.9 (twice-daily training). Eat at TDEE to maintain, below to lose, above to gain.',
    howSteps: [
      'Provide your basic physical metrics (age, height, weight).',
      'Select an activity level that accurately represents your daily life.',
      'Review your TDEE, indicating your daily calorie maintenance baseline.'
    ],
    faqs: [
      ['Which activity level should I pick?', 'Most people overestimate. If you have a desk job and train 3–4 times a week, "moderate" is usually right.'],
      ['How accurate is TDEE?', 'Within ~10% for most people. Track weight over 2–3 weeks and adjust the number based on real results.'],
      ['Does TDEE change?', 'Yes — it falls as you lose weight and rises with muscle gain or more activity. Recalculate after every ~5 kg change.'],
    ],
  },
  related: ['bmr-calculator', 'calorie-calculator', 'macro-calculator', 'bmi-calculator'],
},
{
  slug: 'calorie-calculator', name: 'Calorie Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Daily calories to maintain, lose, or gain weight at a healthy pace.',
  metaDescription: 'Calculate your daily calorie needs for weight loss, gain, or maintenance. Fast, private calorie calculator relying on metabolic science.',
  keywords: ['calorie calculator', 'daily calorie needs', 'calories to lose weight'],
  fields: [sexField, ageField, wField, wUnit, hField, hUnit, actField],
  content: {
    intro: 'Get calorie targets for maintaining your weight, losing at a sustainable pace, or gaining lean mass — derived from your personal TDEE.',
    how: 'Maintenance = TDEE. A ~250 kcal daily deficit targets roughly 0.25 kg of loss per week; ~500 kcal targets 0.5 kg. Slow, steady deficits preserve muscle and are easier to sustain.',
    howSteps: [
      'Enter your physiological data and activity factor.',
      'The calculator computes your basal rate and multiplies it by activity.',
      'See tailored recommendations for how many calories to eat daily for your specific goal.'
    ],
    faqs: [
      ['Is a bigger deficit faster?', 'Faster on paper, but large deficits increase muscle loss, hunger, and rebound risk. Moderate deficits win long-term.'],
      ['Do I need to hit the number exactly?', 'No — weekly averages matter more than any single day.'],
      ['Are these numbers medical advice?', 'No. They are standard estimates; for medical conditions or significant weight change, work with a professional.'],
    ],
  },
  related: ['tdee-calculator', 'macro-calculator', 'bmr-calculator', 'a1c-calculator'],
},
{
  slug: 'macro-calculator', name: 'Macro Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Grams of protein, carbs, and fat from your calorie target and split.',
  metaDescription: 'Calculate dietary macros for free online. Discover exactly how many grams of protein, carbs, and fat you need to meet your diet goals.',
  keywords: ['macro calculator', 'macronutrient calculator', 'macros for cutting'],
  fields: [{ key: 'calories', label: 'Daily calories', type: 'number', def: 2200, unit: 'kcal', min: 800, max: 10000 },
    { key: 'protein', label: 'Protein', type: 'number', def: 30, unit: '%', min: 0, max: 100 },
    { key: 'carbs', label: 'Carbs', type: 'number', def: 40, unit: '%', min: 0, max: 100 },
    { key: 'fat', label: 'Fat', type: 'number', def: 30, unit: '%', min: 0, max: 100 }],
  content: {
    intro: 'Turn a calorie target and a percentage split into exact daily grams of protein, carbohydrate, and fat.',
    how: 'Protein and carbs provide 4 kcal per gram; fat provides 9. Grams = (calories × percent) ÷ kcal-per-gram. The three percentages must total 100 — the tool checks.',
    howSteps: [
      'Enter your daily calorie goal.',
      'Adjust the percentage split between Proteins, Carbs, and Fats (must equal 100%).',
      'The tool breaks down the percentages into precise daily grams.'
    ],
    faqs: [
      ['What split should I use?', '30/40/30 (P/C/F) is a balanced default. Higher protein (30–35%) helps preserve muscle in a deficit.'],
      ['How much protein do I need?', 'Common evidence-based range: 1.6–2.2 g per kg of body weight for active people.'],
      ['Do macros matter more than calories?', 'Calories decide weight change; macros shape body composition, satiety, and performance.'],
    ],
  },
  related: ['calorie-calculator', 'tdee-calculator', 'bmr-calculator', 'one-rep-max-calculator'],
},
{
  slug: 'one-rep-max-calculator', name: 'One Rep Max Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Estimate your 1RM from any set, with training percentages.',
  metaDescription: 'Calculate your One Rep Max (1RM) safely online. Use submaximal sets to find your lifting maxes for bench, squat, and deadlift.',
  keywords: ['one rep max calculator', '1rm calculator', 'lifting max'],
  fields: [{ key: 'weight', label: 'Weight lifted', type: 'number', def: 100, min: 1, max: 2000 },
    { key: 'reps', label: 'Reps completed', type: 'number', def: 5, unit: 'reps', min: 1, max: 30 }],
  content: {
    intro: 'Estimate your one-rep max safely from a submaximal set, and get the working percentages coaches actually program with.',
    how: 'Shows two validated estimates — Epley: w × (1 + reps/30); Brzycki: w × 36/(37 − reps) — plus 90% and 80% loads for strength and hypertrophy work.',
    howSteps: [
      'Enter the weight you lifted.',
      'Enter the amount of reps you completed.',
      'Review your estimated 1RM using Epley and Brzycki formulas.'
    ],
    faqs: [
      ['Which formula is right?', 'They converge for 2–10 reps. Above ~10 reps, all 1RM formulas lose accuracy — test with lower-rep sets.'],
      ['Should I actually test a true 1RM?', 'Estimates are safer for most lifters. True maxes are best reserved for experienced lifters with spotters.'],
      ['How do I use the percentages?', 'Typical programming: 80–90% for strength sets of 3–5; 65–75% for hypertrophy sets of 8–12.'],
    ],
  },
  related: ['macro-calculator', 'tdee-calculator', 'pace-calculator', 'bmi-calculator'],
},
{
  slug: 'pace-calculator', name: 'Running Pace Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Pace per km or mile from your distance and finish time.',
  metaDescription: 'Free Running Pace Calculator. Determine your pace per mile or km instantly to plan marathons, 5Ks, or track sessions securely.',
  keywords: ['pace calculator', 'running pace calculator', 'marathon pace'],
  fields: [{ key: 'distance', label: 'Distance (km or mi)', type: 'number', def: 10, min: 0.1, max: 1000, step: 0.1 },
    { key: 'hours', label: 'Hours', type: 'number', def: 0, min: 0, max: 100 },
    { key: 'minutes', label: 'Minutes', type: 'number', def: 55, min: 0, max: 59 },
    { key: 'seconds', label: 'Seconds', type: 'number', def: 0, min: 0, max: 59 }],
  content: {
    intro: 'Find your pace per kilometer or mile from a distance and total time — works for race results or planning target splits.',
    how: 'Pace = total minutes ÷ distance, displayed as min:sec per unit. Speed (distance per hour) is shown alongside. Use the same unit for distance as you want for pace.',
    howSteps: [
      'Enter your running distance (km or miles).',
      'Input the total time you ran or wish to run.',
      'View the necessary pace broken down to the second.'
    ],
    faqs: [
      ['How do I pace a race from this?', 'Enter the race distance and goal time; the pace shown is what every km/mile must average.'],
      ['Why is my GPS pace different?', 'GPS measures slightly long on weaving courses, so watch pace often reads faster than official results.'],
      ['What is a good 10K pace?', 'Completely individual — recreational finishers commonly range from 5:00 to 7:30 per km.'],
    ],
  },
  related: ['one-rep-max-calculator', 'calorie-calculator', 'tdee-calculator', 'bmi-calculator'],
},
{
  slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Ideal body weight by three clinical formulas, shown as a range.',
  metaDescription: 'Calculate ideal body weight (IBW) online safely. Uses Devine, Robinson, and Miller clinical formulas to present a healthy range.',
  keywords: ['ideal weight calculator', 'ideal body weight', 'healthy weight range'],
  fields: [sexField, hField, hUnit],
  content: {
    intro: 'Three published ideal-body-weight formulas — Devine, Robinson, and Miller — computed from your height and sex, presented as a range rather than a single "perfect" number.',
    how: 'Each formula is a base weight plus an increment per inch over 5 feet (e.g. Devine: 50 kg + 2.3 kg/inch for men). They were developed for clinical dosing, which is why results differ slightly.',
    howSteps: [
      'Select your biological sex.',
      'Input your height.',
      'The tool calculates clinical IBW formulas to show you an ideal weight range.'
    ],
    faqs: [
      ['Why do the formulas disagree?', 'They were fit to different datasets and purposes. The spread between them is a healthy reminder that "ideal" is a range.'],
      ['Is ideal weight the same as healthy weight?', 'Not exactly — body composition, frame, and health markers matter more than any single formula output.'],
      ['Which should I trust?', 'Use the range. If a goal weight falls inside it and feels sustainable, that is a reasonable target to discuss with a professional.'],
    ],
  },
  related: ['bmi-calculator', 'calorie-calculator', 'tdee-calculator', 'bmr-calculator'],
},
{
  slug: 'body-fat-calculator', name: 'Body Fat Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Estimate body fat percentage with the US Navy tape method.',
  metaDescription: 'Calculate your body fat percentage online. Free, private calculator using the reliable US Navy tape measurement method.',
  keywords: ['body fat calculator', 'body fat percentage calculator', 'navy body fat'],
  fields: [sexField, hField, hUnit, { key: 'neck', label: 'Neck circumference', type: 'number', def: 38, min: 1, max: 100 }, { key: 'waist', label: 'Waist circumference', type: 'number', def: 85, min: 1, max: 300 }, { key: 'hip', label: 'Hip circumference (women)', type: 'number', def: 95, min: 1, max: 300 }, { key: 'unit', label: 'Measurement unit', type: 'select', def: 'cm', options: [{ value: 'cm', label: 'cm' }, { value: 'in', label: 'inches' }] }],
  content: {
    intro: 'Estimate your body fat percentage from simple tape measurements using the US Navy circumference method, then see which fitness category it falls into.',
    how: 'The US Navy formula uses log-based equations on neck, waist (and hip for women) relative to height. It is a quick estimate; methods like DEXA scans are more precise but far less accessible.',
    howSteps: [
      'Provide your height and sex.',
      'Measure and enter your neck and waist circumferences (and hip if female).',
      'The Navy algorithm will output an estimated body fat percentage.'
    ],
    faqs: [
      ['How accurate is the tape method?', 'Within a few percentage points for most people, good enough for tracking trends. For clinical precision, DEXA or hydrostatic weighing is better.'],
      ['Where do I measure?', 'Neck below the larynx, waist at the navel, hips at the widest point. Keep the tape snug and level.'],
      ['What is a healthy body fat range?', 'Roughly 14 to 24 percent for men and 21 to 31 percent for women is often cited as healthy, but ranges vary by age and source.'],
    ],
  },
  related: ['bmi-calculator', 'ideal-weight-calculator', 'tdee-calculator', 'calorie-calculator'],
},
{
  slug: 'due-date-calculator', name: 'Pregnancy Due Date Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Your estimated due date and current pregnancy week from your last period.',
  metaDescription: 'Pregnancy due date calculator. Find out your exact estimated due date based on your cycle and last period. 100% private.',
  keywords: ['due date calculator', 'pregnancy due date calculator', 'baby due date'],
  fields: [{ key: 'lmp', label: 'First day of last period (LMP)', type: 'date', def: '2026-02-01' }, { key: 'cycle', label: 'Average cycle length', type: 'number', def: 28, unit: 'days', min: 20, max: 45 }],
  content: {
    intro: 'Estimate your due date, current gestational age, and trimester from the first day of your last menstrual period, adjusted for your cycle length.',
    how: 'Naegele\'s rule adds 280 days (40 weeks) to the first day of your last period, adjusted if your cycle differs from 28 days. It is an estimate; ultrasound dating from your provider is more accurate.',
    howSteps: [
      'Select the first day of your last menstrual period.',
      'Adjust your average cycle length if different from the 28-day norm.',
      'View your estimated due date and current trimester phase.'
    ],
    faqs: [
      ['How accurate is the due date?', 'Only about 1 in 20 babies arrive on the exact due date. It marks the center of a normal delivery window (37 to 42 weeks).'],
      ['What if my cycle is not 28 days?', 'The tool adjusts: a longer cycle pushes the due date later, since ovulation happens later.'],
      ['Should I rely on this instead of my doctor?', 'No. This is an educational estimate; your provider\'s dating ultrasound is the medical standard.'],
      ['What if my LMP was irregular?', 'LMP-based calculations assume a standard 28-day cycle. If yours differs, use an ultrasound dating instead — your healthcare provider can give you the most accurate date.'],
    ],
  },
  related: ['ovulation-calculator', 'age-calculator', 'days-until-calculator', 'bmi-calculator'],
},
{
  slug: 'ovulation-calculator', name: 'Ovulation Calculator', prio: 'P1', category: 'health', widget: 'calc',
  short: 'Estimate your fertile window and ovulation day.',
  metaDescription: 'Free online Ovulation Calculator. Estimate your most fertile days securely in your browser to help plan or prevent pregnancy.',
  keywords: ['ovulation calculator', 'fertile window calculator', 'fertility calendar'],
  fields: [{ key: 'lmp', label: 'First day of last period', type: 'date', def: '2026-06-01' }, { key: 'cycle', label: 'Cycle length', type: 'number', def: 28, unit: 'days', min: 20, max: 45 }, { key: 'luteal', label: 'Luteal phase length', type: 'number', def: 14, unit: 'days', min: 10, max: 16 }],
  content: {
    intro: 'Estimate your most fertile days and likely ovulation date based on your cycle and luteal phase length.',
    how: 'Ovulation is estimated as the next period date minus the luteal phase length. The fertile window spans roughly the five days before ovulation through the day after, since sperm can survive several days.',
    howSteps: [
      'Enter the date of your last period.',
      'Indicate your cycle and luteal phase lengths.',
      'The calculator establishes your primary fertile window based on luteal estimates.'
    ],
    faqs: [
      ['When am I most fertile?', 'The two to three days before ovulation are typically the most fertile, as the egg and surviving sperm overlap.'],
      ['How reliable is this for irregular cycles?', 'Less reliable — irregular cycles shift ovulation unpredictably. Ovulation tests or tracking basal temperature add accuracy.'],
      ['Can I use this to avoid pregnancy?', 'Calendar estimates alone are not a reliable contraceptive. Consult a healthcare provider about effective methods.'],
    ],
  },
  related: ['due-date-calculator', 'days-between-dates', 'age-calculator', 'bmi-calculator'],
},
{
  slug: 'sleep-calculator', name: 'Sleep Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Best bedtimes or wake times based on 90-minute sleep cycles.',
  metaDescription: 'Sleep Calculator online. Discover the best bedtimes and wake times by calculating optimal 90-minute REM sleep cycles.',
  keywords: ['sleep calculator', 'sleep cycle calculator', 'bedtime calculator'],
  fields: [{ key: 'mode', label: 'I want to', type: 'select', def: 'wake', options: [{ value: 'wake', label: 'Wake up at a set time' }, { value: 'sleep', label: 'Go to sleep now' }] }, { key: 'time', label: 'Time (24h, e.g. 07:00)', type: 'text', def: '07:00' }],
  content: {
    intro: 'Find bedtimes or wake times that align with complete 90-minute sleep cycles, so you wake between cycles rather than mid-cycle when you feel groggiest.',
    how: 'Sleep runs in roughly 90-minute cycles. Working backward (or forward) in 90-minute blocks, plus about 15 minutes to fall asleep, lands your alarm at the lighter end of a cycle.',
    howSteps: [
      'Select whether you want to calculate a wake-up time or a bedtime.',
      'Enter your desired sleep or wake hour.',
      'See a list of optimized alarm times that prevent you from waking up mid-cycle.'
    ],
    faqs: [
      ['Why 90 minutes?', 'A full sleep cycle (light, deep, REM) averages about 90 minutes. Waking at a cycle\'s end feels more refreshing than waking mid-deep-sleep.'],
      ['How many cycles do I need?', 'Most adults do best with 5 to 6 cycles (7.5 to 9 hours).'],
      ['Is 15 minutes to fall asleep accurate?', 'It is a common average; adjust mentally if you usually drift off faster or slower.'],
      ['Should I aim for a specific bedtime?', 'Consistency matters more than the exact hour — going to bed and waking at the same time each day stabilises your circadian rhythm more than any single sleep target.'],
    ],
  },
  related: ['age-calculator', 'heart-rate-zone-calculator', 'water-intake-calculator', 'bac-calculator'],
},
{
  slug: 'bac-calculator', name: 'Blood Alcohol (BAC) Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'A rough blood alcohol estimate from drinks, weight, and time.',
  metaDescription: 'Free BAC Calculator online. Get a rough Blood Alcohol Concentration estimate based on your drinks, body weight, and time passed.',
  keywords: ['bac calculator', 'blood alcohol calculator', 'drink limits'],
  fields: [sexField, wField, { key: 'unit', label: 'Weight unit', type: 'select', def: 'kg', options: [{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }] }, { key: 'drinks', label: 'Standard drinks', type: 'number', def: 3, min: 0, max: 50 }, { key: 'hours', label: 'Hours since first drink', type: 'number', def: 2, unit: 'h', min: 0, max: 24 }],
  content: {
    intro: 'Estimate blood alcohol concentration from the number of standard drinks, your weight and sex, and time elapsed using the Widmark formula.',
    how: 'BAC = (alcohol grams / (body water grams)) x 100, minus roughly 0.015 per hour of metabolism. One US standard drink contains about 14 grams of alcohol. Many personal factors make this only an approximation.',
    howSteps: [
      'Enter your physiological data (weight, sex).',
      'Enter the number of standard drinks you consumed and hours elapsed.',
      'The calculator uses the Widmark formula to provide a BAC estimate.'
    ],
    faqs: [
      ['Can I use this to decide if I can drive?', 'Absolutely not. This is a rough estimate that ignores food, medication, and individual metabolism. Never drink and drive, period.'],
      ['What is a standard drink?', 'In the US, about 14 grams of pure alcohol: a 12 oz beer, 5 oz wine, or 1.5 oz spirits.'],
      ['Why is my real BAC different?', 'Food, hydration, medications, health, and genetics all shift actual BAC well beyond what any formula predicts.'],
    ],
  },
  related: ['water-intake-calculator', 'bmr-calculator', 'calorie-calculator', 'bmi-calculator'],
},
{
  slug: 'a1c-calculator', name: 'A1C Calculator', prio: 'P2', category: 'health', widget: 'calc',
  short: 'Convert between A1C and estimated average glucose.',
  metaDescription: 'A1C Calculator and converter. Safely translate A1C percentages to average glucose (eAG) metrics instantly in your browser.',
  keywords: ['a1c calculator', 'a1c to glucose calculator', 'diabetes tracker'],
  fields: [{ key: 'mode', label: 'Convert', type: 'select', def: 'a1c', options: [{ value: 'a1c', label: 'A1C to average glucose' }, { value: 'glucose', label: 'Average glucose to A1C' }] }, { key: 'value', label: 'Value (A1C % or mg/dL)', type: 'number', def: 7, min: 0, max: 600, step: 0.1 }],
  content: {
    intro: 'Convert between an A1C percentage and estimated average glucose (eAG), the two ways diabetes control is commonly expressed.',
    how: 'The ADA formula relates them: eAG (mg/dL) = 28.7 x A1C - 46.7. A1C reflects average blood sugar over roughly the prior three months.',
    howSteps: [
      'Select whether to convert from A1C to glucose or vice versa.',
      'Enter the clinical value.',
      'The calculator runs the ADA formula to translate the number.'
    ],
    faqs: [
      ['What A1C is considered normal?', 'Below 5.7 percent is typically normal, 5.7 to 6.4 prediabetes, and 6.5 or above diabetes, per common guidelines. Your doctor interprets your numbers.'],
      ['Why three months?', 'A1C measures glucose bound to hemoglobin, and red blood cells live about three months, so it captures a long-term average.'],
      ['Is this a substitute for lab testing?', 'No. This is an educational conversion; lab A1C and glucose tests are definitive.'],
    ],
  },
  related: ['bmi-calculator', 'calorie-calculator', 'water-intake-calculator', 'tdee-calculator'],
},
{
  slug: 'heart-rate-zone-calculator', name: 'Heart Rate Zone Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'Your five training heart-rate zones from age and resting rate.',
  metaDescription: 'Calculate Heart Rate Zones online. Optimize your cardio training by finding your 5 precise heart rate zones for burning fat or building endurance.',
  keywords: ['heart rate zone calculator', 'target heart rate calculator', 'cardio zones'],
  fields: [ageField, { key: 'resting', label: 'Resting heart rate', type: 'number', def: 60, unit: 'bpm', min: 30, max: 120 }],
  content: {
    intro: 'Calculate your maximum heart rate and the five training zones used to structure cardio, from recovery to maximum effort.',
    how: 'Maximum heart rate uses the Tanaka formula (208 - 0.7 x age), more accurate than the old 220 minus age. Zones are computed with the Karvonen method using your heart-rate reserve (max minus resting).',
    howSteps: [
      'Enter your age and resting heart rate.',
      'The engine uses the Tanaka formula and Karvonen method to compute thresholds.',
      'View your optimal Beats Per Minute for all five training zones.'
    ],
    faqs: [
      ['What are the zones for?', 'Zone 2 builds aerobic base, zone 4 raises threshold, zone 5 develops peak power. Most training should sit in lower zones.'],
      ['Why use resting heart rate?', 'The Karvonen method personalizes zones to your fitness via heart-rate reserve, giving better targets than max-only formulas.'],
      ['How do I find my resting heart rate?', 'Measure first thing in the morning before getting up, or read it from a fitness tracker over several nights.'],
    ],
  },
  related: ['pace-calculator', 'tdee-calculator', 'calorie-calculator', 'sleep-calculator'],
},
{
  slug: 'water-intake-calculator', name: 'Water Intake Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'A daily hydration target from your weight and activity.',
  metaDescription: 'Calculate your ideal water intake online. Free hydration calculator using your weight and activity levels to recommend daily water amounts.',
  keywords: ['water intake calculator', 'daily water calculator', 'hydration calculator'],
  fields: [wField, { key: 'unit', label: 'Weight unit', type: 'select', def: 'kg', options: [{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }] }, { key: 'activity', label: 'Daily exercise', type: 'number', def: 30, unit: 'min', min: 0, max: 600 }],
  content: {
    intro: 'Estimate how much water to drink per day based on your body weight and exercise time, shown in liters, cups, and fluid ounces.',
    how: 'A common baseline is about 35 ml per kilogram of body weight, with extra added for exercise. Needs also rise with heat, altitude, illness, and pregnancy.',
    howSteps: [
      'Enter your body weight.',
      'Enter your typical daily exercise time in minutes.',
      'Review your recommended hydration target in liters, cups, and ounces.'
    ],
    faqs: [
      ['Is the 8-glasses rule real?', 'It is a rough rule of thumb. Actual needs scale with body size and activity, which is what this tool estimates.'],
      ['Does coffee or tea count?', 'Mostly yes; the mild diuretic effect of caffeine is outweighed by the fluid. Water remains the best choice.'],
      ['Can I drink too much?', 'Rarely, but overhydration (hyponatremia) is possible with extreme intake. Let thirst and urine color guide you alongside this estimate.'],
    ],
  },
  related: ['calorie-calculator', 'tdee-calculator', 'protein-intake-calculator', 'bmr-calculator'],
},
{
  slug: 'protein-intake-calculator', name: 'Protein Intake Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'Daily protein grams matched to your weight and goal.',
  metaDescription: 'Calculate how much protein you need. Free online protein calculator using body weight and fitness goals to map precise gram targets.',
  keywords: ['protein calculator', 'protein intake calculator', 'daily protein needs'],
  fields: [wField, { key: 'unit', label: 'Weight unit', type: 'select', def: 'kg', options: [{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }] }, { key: 'goal', label: 'Goal', type: 'select', def: 'maintain', options: [{ value: 'sedentary', label: 'Sedentary' }, { value: 'maintain', label: 'General fitness' }, { value: 'active', label: 'Active / endurance' }, { value: 'muscle', label: 'Build muscle' }] }],
  content: {
    intro: 'Get a daily protein target range in grams based on your body weight and training goal, plus a per-meal breakdown.',
    how: 'Targets scale with body weight: about 0.8 g/kg for sedentary up to 1.8 to 2.2 g/kg for muscle building, based on common sports-nutrition ranges. Spreading intake across meals aids absorption.',
    howSteps: [
      'Enter your current weight.',
      'Select your physical activity goal (e.g., Build muscle or Active/Endurance).',
      'Get a custom daily protein target and a per-meal breakdown.'
    ],
    faqs: [
      ['How much protein do I really need?', 'Active people often do well at 1.6 to 2.2 g per kg. Sedentary needs are lower; this tool sets the range from your goal.'],
      ['Can I eat too much protein?', 'For healthy people, high protein is generally safe. Those with kidney conditions should consult a doctor.'],
      ['Does timing matter?', 'Total daily intake matters most; spreading protein across meals (20 to 40 g each) is a reasonable practice.'],
    ],
  },
  related: ['macro-calculator', 'calorie-calculator', 'water-intake-calculator', 'one-rep-max-calculator'],
},
{
  slug: 'bsa-calculator', name: 'Body Surface Area (BSA) Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'Body surface area by the Mosteller and Du Bois formulas.',
  metaDescription: 'Calculate Body Surface Area (BSA) safely online. Instant and private clinical calculator using Mosteller and Du Bois equations.',
  keywords: ['bsa calculator', 'body surface area calculator', 'mosteller formula'],
  fields: [hField, { key: 'hUnit', label: 'Height unit', type: 'select', def: 'cm', options: [{ value: 'cm', label: 'cm' }, { value: 'in', label: 'inches' }] }, wField, { key: 'wUnit', label: 'Weight unit', type: 'select', def: 'kg', options: [{ value: 'kg', label: 'kg' }, { value: 'lb', label: 'lb' }] }],
  content: {
    intro: 'Calculate body surface area from height and weight using the two most widely used clinical formulas, Mosteller and Du Bois.',
    how: 'Mosteller: BSA = sqrt(height_cm x weight_kg / 3600). Du Bois uses a power-law fit. BSA is used to normalize medication doses and physiological measurements across body sizes.',
    howSteps: [
      'Enter your height.',
      'Enter your weight.',
      'Review the calculated Body Surface Area results from both standard clinical models.'
    ],
    faqs: [
      ['What is BSA used for?', 'Dosing chemotherapy and other drugs, indexing cardiac output, and burn assessment — anywhere body size must be standardized.'],
      ['Which formula should I use?', 'Mosteller is simplest and most common in practice; Du Bois is the historical standard. They agree closely for most adults.'],
      ['Is this medical advice?', 'No — it is an educational estimate. Clinical dosing must be done by a qualified professional.'],
    ],
  },
  related: ['bmi-calculator', 'ideal-weight-calculator', 'body-fat-calculator', 'bmr-calculator'],
},
{
  slug: 'waist-to-hip-ratio-calculator', name: 'Waist-to-Hip Ratio Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'Your waist-to-hip ratio and its health-risk category.',
  metaDescription: 'Calculate Waist-to-Hip Ratio online for free. Track fat distribution and cardiovascular risk securely from your browser.',
  keywords: ['waist to hip ratio calculator', 'whr calculator', 'body shape calculator'],
  fields: [sexField, { key: 'waist', label: 'Waist circumference', type: 'number', def: 85, min: 1, max: 300 }, { key: 'hip', label: 'Hip circumference', type: 'number', def: 100, min: 1, max: 300 }],
  content: {
    intro: 'Calculate your waist-to-hip ratio — a quick indicator of fat distribution that research links to cardiovascular and metabolic risk, sometimes better than BMI alone.',
    how: 'The ratio is simply waist circumference divided by hip circumference (use the same units for both). Risk thresholds differ for men and women, and the tool applies the appropriate category.',
    howSteps: [
      'Select your biological sex.',
      'Input the circumference of your waist and hips.',
      'The engine divides waist by hip to establish your metabolic risk category.'
    ],
    faqs: [
      ['What is a healthy ratio?', 'Often cited: below 0.90 for men and 0.80 for women is lower risk. Higher ratios suggest more abdominal fat.'],
      ['Why does fat location matter?', 'Abdominal (visceral) fat is more strongly associated with heart and metabolic risk than fat carried on the hips.'],
      ['WHR or BMI?', 'They measure different things. WHR captures fat distribution; BMI captures overall weight relative to height. Together they give a fuller picture.'],
    ],
  },
  related: ['bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'bsa-calculator'],
},
{
  slug: 'smoking-cost-calculator', name: 'Smoking Cost Calculator', prio: 'P3', category: 'health', widget: 'calc',
  short: 'See what smoking costs per day, month, year, and decade.',
  metaDescription: 'Calculate the cost of smoking cigarettes online. Free tool to uncover how much money you spend (and can save) by quitting smoking.',
  keywords: ['smoking cost calculator', 'cost of smoking calculator', 'save money quit smoking'],
  fields: [{ key: 'perDay', label: 'Cigarettes per day', type: 'number', def: 10, min: 0, max: 200 }, { key: 'price', label: 'Price per pack', type: 'number', def: 8, unit: '$' }, { key: 'packSize', label: 'Cigarettes per pack', type: 'number', def: 20, min: 1, max: 50 }],
  content: {
    intro: 'Add up the financial cost of smoking over time — a concrete number that many people find motivating when weighing whether to quit.',
    how: 'Daily cost = (cigarettes per day / pack size) x price per pack. The tool then projects that across a month, a year, and ten years to show the cumulative total.',
    howSteps: [
      'Input your daily cigarette habit.',
      'Enter the average price per pack.',
      'Review the terrifying compound cost over months, years, and decades.'
    ],
    faqs: [
      ['Does this include health costs?', 'No — only the direct cost of cigarettes. Healthcare, insurance, and lost productivity costs are additional and often far larger.'],
      ['How fast does it add up?', 'A 10-a-day habit at typical prices runs into thousands per year and tens of thousands over a decade.'],
      ['Where can I get help quitting?', 'Many countries offer free quitlines and programs; your doctor can also recommend proven cessation aids.'],
    ],
  },
  related: ['savings-calculator', 'investment-calculator', 'water-intake-calculator', 'bmi-calculator'],
},
];
