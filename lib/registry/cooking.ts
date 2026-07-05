import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, min: 0 });

export const COOKING: ToolDef[] = [
{
  slug: 'grams-to-cups-converter', name: 'Grams to Cups Converter', prio: 'P1', category: 'cooking', widget: 'calc',
  short: 'Convert grams to cups for flour, sugar, butter, and 20+ ingredients.',
  metaDescription: 'Convert grams to cups instantly. Free baking conversion calculator for flour, sugar, butter, and more using ingredient-specific weight densities.',
  keywords: ['grams to cups','grams to cups converter','how many cups is 100 grams','cooking measurements'],
  fields: [$('grams','Grams',250,'g'),{key:'ingredient',label:'Ingredient',type:'select',def:'flour_ap',options:[{value:'flour_ap',label:'All-purpose flour'},{value:'flour_bread',label:'Bread flour'},{value:'flour_cake',label:'Cake flour'},{value:'flour_whole',label:'Whole-wheat flour'},{value:'sugar_white',label:'White sugar'},{value:'sugar_brown',label:'Brown sugar (packed)'},{value:'sugar_powder',label:'Powdered sugar'},{value:'butter',label:'Butter'},{value:'cocoa',label:'Cocoa powder'},{value:'honey',label:'Honey'},{value:'milk',label:'Milk'},{value:'water',label:'Water'},{value:'salt',label:'Table salt'},{value:'oats',label:'Rolled oats'},{value:'rice',label:'Uncooked white rice'},{value:'cornstarch',label:'Cornstarch'},{value:'olive_oil',label:'Olive oil'},{value:'vegetable_oil',label:'Vegetable oil'}]}],
  content: {
    intro: 'Convert grams to cups for 20+ common baking and cooking ingredients, using the exact weight-per-cup for each ingredient rather than a generic conversion.',
    how: 'Each ingredient has a specific density. Flour weighs about 125 g/cup, while sugar weighs 200 g/cup. Using weight (grams) in recipes is more accurate than volume because packing varies.',
    howSteps: [
      'Enter the weight amount in grams.',
      'Select the exact ingredient you are converting from the dropdown list.',
      'The calculator outputs the precise measurement in cups and smaller fractions.'
    ],
    faqs: [
      ['Why do I need different conversions for different ingredients?','Because density varies — a cup of flour weighs about 125 g while a cup of sugar weighs 200 g. A single "grams per cup" figure is only valid for water.'],
      ['Should I measure by weight or volume?','Professional bakers weigh ingredients because it is more consistent and accurate. Volume (cups/spoons) can vary by up to 20% depending on how tightly you pack the measure.'],
      ['How do I measure butter in grams?','1 cup of butter = 227 g = 2 sticks (US). Most butter wrappers have tablespoon marks — 1 tbsp = ~14 g.'],
    ],
  },
  related: ['cooking-unit-converter','recipe-scaling-calculator','calories-burned-calculator','unit-converter'],
},
{
  slug: 'recipe-scaling-calculator', name: 'Recipe Scaling Calculator', prio: 'P1', category: 'cooking', widget: 'calc',
  short: 'Scale any recipe ingredient up or down to a new serving count.',
  metaDescription: 'Free Recipe Scaling Calculator online. Instantly adjust recipe serving sizes and calculate exact ingredient multipliers for cooking or baking.',
  keywords: ['recipe scaling calculator','scale recipe','adjust recipe servings','recipe converter'],
  fields: [$('original','Original servings',4),$('target','Target servings',8),$('amount','Ingredient amount',2)],
  content: {
    intro: 'Scale any recipe ingredient to a different number of servings in seconds — find the exact multiplier and the scaled amount for any quantity.',
    how: 'Scale factor = target ÷ original servings. Multiply every ingredient amount by this factor. The calculator gives the factor so you can apply it to your whole recipe.',
    howSteps: [
      'Enter the original number of servings the recipe yields.',
      'Enter your desired target number of servings.',
      'Input any specific ingredient amount to instantly see its scaled output.'
    ],
    faqs: [
      ['Does scaling affect cooking time?','Not linearly — a doubled recipe may take only 20-30% longer, not double the time. Thicker items need more time; thinner items may need less.'],
      ['What about baking powder and salt?','Scale them fully but taste as you go — leavening agents and salt do not always scale perfectly, especially for small batches.'],
      ['How do I scale to a fraction?','Set original to 4 and target to 1 for a quarter recipe, for example. The factor works for any ratio.'],
    ],
  },
  related: ['grams-to-cups-converter','cooking-unit-converter','calories-burned-calculator','calorie-calculator'],
},
{
  slug: 'cooking-unit-converter', name: 'Cooking Unit Converter', prio: 'P1', category: 'cooking', widget: 'calc',
  short: 'Convert between teaspoons, tablespoons, cups, fluid ounces, and millilitres.',
  metaDescription: 'Cooking Unit Converter online. Freely convert between teaspoons, tablespoons, cups, fluid ounces, and milliliters safely in your browser.',
  keywords: ['cooking unit converter','teaspoons to tablespoons','cups to ml','tablespoons to cups','kitchen measurements'],
  fields: [$('amount','Amount',1),{key:'from',label:'From unit',type:'select',def:'tbsp',options:[{value:'tsp',label:'Teaspoon (tsp)'},{value:'tbsp',label:'Tablespoon (tbsp)'},{value:'cup',label:'Cup'},{value:'fl_oz',label:'Fluid ounce'},{value:'pint',label:'Pint'},{value:'quart',label:'Quart'},{value:'gallon',label:'Gallon'},{value:'ml',label:'Millilitre (ml)'},{value:'liter',label:'Litre'}]}],
  content: {
    intro: 'Convert between every cooking volume measurement — teaspoons, tablespoons, cups, fluid ounces, pints, quarts, gallons, millilitres, and litres — in one tool.',
    how: 'All units convert through millilitres using exact US customary definitions (1 US tsp = 4.92892 ml, 1 US cup = 236.588 ml). Results include all common kitchen units.',
    howSteps: [
      'Input the cooking amount (e.g., 2.5).',
      'Select the starting unit from the dropdown list.',
      'The converter immediately displays equivalent quantities in all other major kitchen units.'
    ],
    faqs: [
      ['How many teaspoons in a tablespoon?','3 teaspoons = 1 tablespoon. 16 tablespoons = 1 cup.'],
      ['US cups vs metric?','A US cup is 236.6 ml. An Australian cup is 250 ml. A UK cup is also 250 ml. This tool uses the US definition.'],
      ['How many ml in a tablespoon?','1 US tablespoon = 14.79 ml, typically rounded to 15 ml in metric recipes.'],
    ],
  },
  related: ['grams-to-cups-converter','recipe-scaling-calculator','unit-converter','temperature-converter'],
},
{
  slug: 'calories-burned-calculator', name: 'Calories Burned Calculator', prio: 'P1', category: 'cooking', widget: 'calc',
  short: 'Calories burned during exercise by activity, weight, and duration.',
  metaDescription: 'Calculate Calories Burned online for free. Find out exactly how many calories you burn during walking, running, or cycling based on your weight.',
  keywords: ['calories burned calculator','how many calories do i burn','exercise calorie calculator','calories burned walking'],
  fields: [$('weight','Body weight (kg)',70,'kg'),$('minutes','Duration (minutes)',30,'min'),{key:'activity',label:'Activity',type:'select',def:'walking_brisk',options:[{value:'walking_slow',label:'Walking (slow, 2 mph)'},{value:'walking_brisk',label:'Walking (brisk, 3.5 mph)'},{value:'jogging',label:'Jogging (5 mph)'},{value:'running',label:'Running (7.5 mph)'},{value:'cycling_moderate',label:'Cycling (moderate)'},{value:'cycling_vigorous',label:'Cycling (vigorous)'},{value:'swimming',label:'Swimming (laps)'},{value:'yoga',label:'Yoga'},{value:'weight_training',label:'Weight training'},{value:'hiit',label:'HIIT'},{value:'dancing',label:'Dancing'},{value:'basketball',label:'Basketball'},{value:'soccer',label:'Soccer'},{value:'tennis',label:'Tennis'},{value:'jump_rope',label:'Jump rope'},{value:'hiking',label:'Hiking'}]}],
  content: {
    intro: 'Estimate the calories burned during exercise based on your weight, the activity, and duration — using MET (Metabolic Equivalent) values from exercise science research.',
    how: 'Calories = MET × body weight (kg) × duration (hours). MET values quantify the energy cost of physical activities relative to rest. Higher MET = more intense activity.',
    howSteps: [
      'Enter your total body weight in kilograms.',
      'Input the duration of your exercise in minutes.',
      'Select the exact activity performed to view estimated calories burned via MET science.'
    ],
    faqs: [
      ['How accurate is this estimate?','MET-based estimates are within 10-20% for most people. Actual burn varies with fitness level, age, terrain, and effort intensity.'],
      ['What is a MET value?','MET (Metabolic Equivalent of Task) measures how hard your body is working. Sitting is ~1 MET; walking is ~3.5 MET; running is ~10 MET.'],
      ['Should I eat back exercise calories?','Depends on your goals. Many nutrition experts suggest eating back only 50-75% of exercise calories to account for estimation error.'],
    ],
  },
  related: ['calorie-calculator','bmr-calculator','tdee-calculator','macro-calculator'],
},
];
