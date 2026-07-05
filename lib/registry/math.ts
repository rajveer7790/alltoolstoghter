import { ToolDef } from '../types';
const n = (key: string, label: string, def: number, extra: object = {}): any => ({ key, label, type: 'number', def, ...extra });

export const MATH: ToolDef[] = [
{
  slug: 'percentage-calculator', name: 'Percentage Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'Percent of a number, percent one number is of another, and percent change.',
  metaDescription: 'Free online percentage calculator. Calculate percent of a number, percent change, and percent differences instantly in your browser.',
  keywords: ['percentage calculator', 'percent calculator', 'percent change', 'calculate percentage'],
  fields: [{ key: 'mode', label: 'Question', type: 'select', def: 'of', options: [
      { value: 'of', label: 'What is A% of B?' }, { value: 'is', label: 'A is what % of B?' }, { value: 'change', label: '% change from A to B' }] },
    n('a', 'A', 25), n('b', 'B', 200)],
  content: {
    intro: 'The three percentage questions everyone needs, in one tool: a percent of a number, what percent one number is of another, and the percent change between two values.',
    how: 'X% of Y = (X÷100)·Y. "A is what % of B" = (A÷B)·100. Percent change = (new − old) ÷ |old| × 100, which is why a fall from 200 to 150 is −25%.',
    howSteps: [
      'Select the percentage formula you need (e.g., "What is A% of B?").',
      'Enter the numerical values for A and B.',
      'The calculator instantly applies the selected percent formula.'
    ],
    faqs: [
      ['Percent change vs percentage points?', 'Going from 10% to 15% is a 5 percentage-point rise but a 50% relative increase. This tool computes the relative change.'],
      ['Why is change from zero undefined?', 'Division by zero — there is no baseline to compare against.'],
      ['Can A or B be negative?', 'Yes; the math holds. Percent change uses the absolute value of the starting number as its base.'],
    ],
  },
  related: ['percentage-change-calculator', 'fraction-calculator', 'average-calculator', 'tip-calculator'],
},
{
  slug: 'fraction-calculator', name: 'Fraction Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'Add, subtract, multiply, or divide fractions — auto-simplified.',
  metaDescription: 'Add, subtract, multiply, and divide fractions online. Free fraction calculator that automatically simplifies results to their lowest terms.',
  keywords: ['fraction calculator', 'adding fractions calculator', 'divide fractions', 'simplify fraction'],
  fields: [n('n1', 'First numerator', 1), n('d1', 'First denominator', 2), { key: 'op', label: 'Operation', type: 'select', def: '+', options: [
      { value: '+', label: 'Add (+)' }, { value: '-', label: 'Subtract (−)' }, { value: '*', label: 'Multiply (×)' }, { value: '/', label: 'Divide (÷)' }] },
    n('n2', 'Second numerator', 1), n('d2', 'Second denominator', 3)],
  content: {
    intro: 'Fraction arithmetic with the answer automatically reduced to lowest terms, plus its decimal form.',
    how: 'Addition and subtraction cross-multiply to a common denominator; multiplication multiplies straight across; division multiplies by the reciprocal. The result is simplified using the greatest common divisor.',
    howSteps: [
      'Enter the numerator and denominator for the first fraction.',
      'Select the arithmetic operation (Add, Subtract, Multiply, Divide).',
      'Enter the second fraction and get the automatically simplified result.'
    ],
    faqs: [
      ['How does simplification work?', 'Divide numerator and denominator by their GCD: 4/8 → 1/2 because GCD(4,8)=4.'],
      ['What about mixed numbers?', 'Convert first: 1½ = 3/2. Multiply the whole part by the denominator and add the numerator.'],
      ['Why can\'t the denominator be zero?', 'Division by zero is undefined — a fraction\'s denominator states how many parts the whole splits into, and zero parts is meaningless.'],
      ['What is an improper fraction?', 'One where the numerator is larger than the denominator, like 7/4. The result panel shows the decimal equivalent so you can see the value right away.'],
    ],
  },
  related: ['percentage-calculator', 'lcm-calculator', 'average-calculator', 'square-root-calculator'],
},
{
  slug: 'average-calculator', name: 'Average Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Mean, median, mode, standard deviation, sum and count from any list.',
  metaDescription: 'Calculate average, mean, median, and mode from any list of numbers. Free statistical calculator with standard deviation and sum.',
  keywords: ['average calculator', 'mean median mode calculator', 'calculate mean online'],
  fields: [{ key: 'list', label: 'Numbers (comma or space separated)', type: 'text', def: '4, 8, 15, 16, 23, 42' }],
  content: {
    intro: 'Paste any list of numbers and get the full descriptive picture: mean, median, mode, population standard deviation, sum, and count.',
    how: 'Mean is the sum divided by count. Median is the middle of the sorted list (average of the two middles when even). Mode is the most frequent value. Standard deviation here is population (÷N).',
    howSteps: [
      'Paste your list of comma-separated or space-separated numbers.',
      'The statistical engine evaluates the entire dataset.',
      'Read the mean, median, mode, standard deviation, and sum.'
    ],
    faqs: [
      ['Mean vs median — which to use?', 'Median resists outliers: one billionaire skews a town\'s mean income but barely moves its median.'],
      ['What if no value repeats?', 'Then there is no mode — the tool says so rather than inventing one.'],
      ['Sample vs population SD?', 'Population divides by N (used here); sample divides by N−1. For large lists the difference is small.'],
      ['What is the difference between mean and median?', 'The mean is the sum divided by the count; the median is the middle value when sorted. For skewed data — like salaries — the median is often more representative.'],
    ],
  },
  related: ['percentage-calculator', 'gpa-calculator', 'lcm-calculator', 'fraction-calculator'],
},
{
  slug: 'gpa-calculator', name: 'GPA Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'Weighted GPA on the 4.0 scale from your grades and credit hours.',
  metaDescription: 'Free college and high school GPA calculator. Calculate your weighted grade point average on the standard 4.0 scale instantly.',
  keywords: ['gpa calculator', 'college gpa calculator', 'high school gpa', 'grade calculator'],
  fields: [{ key: 'rows', label: 'One course per line: grade, credits', type: 'text', def: 'A, 3\nB+, 4\nA-, 3\nB, 2' }],
  content: {
    intro: 'Compute a credit-weighted GPA on the standard 4.0 scale: enter each course as a letter grade and its credit hours, one per line.',
    how: 'Each grade maps to points (A=4.0, A−=3.7, B+=3.3 …). GPA = Σ(points × credits) ÷ Σ(credits) — a 4-credit course moves the average more than a 2-credit one.',
    howSteps: [
      'List each course on a new line using the format: Grade, Credits.',
      'The calculator maps letter grades to standard 4.0 scale points.',
      'It computes your weighted average based on course credit hours.'
    ],
    faqs: [
      ['Does A+ count above 4.0?', 'At most institutions A+ = 4.0; some use 4.3. This tool uses the common 4.0 cap.'],
      ['How do I raise my GPA fastest?', 'High grades in high-credit courses move the weighted average most — and earlier, when total credits are low.'],
      ['What about weighted (honors/AP) scales?', 'High-school weighted scales add bonus points per course type; enter the adjusted grade points as your institution defines them.'],
    ],
  },
  related: ['final-grade-calculator', 'average-calculator', 'percentage-calculator', 'fraction-calculator'],
},
{
  slug: 'final-grade-calculator', name: 'Final Grade Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: '"What do I need on the final?" — answered in one calculation.',
  metaDescription: 'Calculate what grade you need on your final exam. Free final grade calculator to help you hit your target class average.',
  keywords: ['final grade calculator', 'what do I need on my final', 'target grade calculator'],
  fields: [n('current', 'Current grade', 84, { unit: '%', min: 0, max: 120 }), n('desired', 'Grade you want', 90, { unit: '%', min: 0, max: 120 }), n('weight', 'Final exam weight', 30, { unit: '%', min: 1, max: 100 })],
  content: {
    intro: 'Enter your current grade, the grade you want, and how much the final is worth — get the exact score you need on exam day.',
    how: 'Required = (desired − current × (1 − w)) ÷ w, where w is the final\'s weight as a decimal. If the answer exceeds 100%, the tool says so honestly instead of pretending it\'s possible.',
    howSteps: [
      'Enter your current class grade as a percentage.',
      'Enter the target grade you wish to achieve.',
      'Enter the weight of the final exam, and see exactly what score you need.'
    ],
    faqs: [
      ['My required score is over 100 — now what?', 'The target isn\'t reachable from the final alone. Ask about extra credit, or recalculate for the best grade that is reachable.'],
      ['Where do I find the final\'s weight?', 'The course syllabus — look for the grading breakdown (e.g. "Final exam: 30%").'],
      ['Does this handle a cumulative final replacing other grades?', 'No — it models a standard weighted final. Replacement policies need their own arithmetic.'],
      ['What if I don\'t know my current grade?', 'Add each assignment with its score and weight, and the calculator will figure out your current weighted average automatically.'],
      ['Can I include extra credit?', 'Yes — enter extra-credit assignments as additional rows. They will be included in the weighted total.'],
      ['What if extra credit pushes my grade above 100%?', 'The calculator will show a grade above 100% if your weighted total exceeds the maximum. Whether an instructor caps it at 100 depends on their grading policy.'],
    ],
  },
  related: ['gpa-calculator', 'percentage-calculator', 'average-calculator', 'quadratic-formula-calculator'],
},
{
  slug: 'quadratic-formula-calculator', name: 'Quadratic Formula Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Roots of ax² + bx + c = 0 — real or complex — with the discriminant.',
  metaDescription: 'Solve quadratic equations instantly online. Free quadratic formula calculator finds real and complex roots with step-by-step discriminant math.',
  keywords: ['quadratic formula calculator', 'quadratic equation solver', 'solve for x'],
  fields: [n('a', 'a', 1), n('b', 'b', -3), n('c', 'c', 2)],
  content: {
    intro: 'Solve any quadratic equation: enter the coefficients and get both roots, including complex roots when the parabola never crosses the x-axis.',
    how: 'x = (−b ± √(b² − 4ac)) ÷ 2a. The discriminant b² − 4ac decides everything: positive → two real roots, zero → one repeated root, negative → a complex conjugate pair.',
    howSteps: [
      'Identify the coefficients a, b, and c in your ax² + bx + c = 0 equation.',
      'Enter the coefficients into the calculator.',
      'Read the calculated roots and discriminant value.'
    ],
    faqs: [
      ['What does the discriminant mean visually?', 'It counts x-intercepts: 2 crossings, 1 touch, or none (the parabola floats above or below the axis).'],
      ['What if a = 0?', 'Then it\'s linear, not quadratic — the tool solves bx + c = 0 instead and tells you.'],
      ['What are complex roots good for?', 'They appear throughout physics and engineering — oscillations, AC circuits, control systems.'],
      ['What do complex roots mean?', 'If the discriminant (b²−4ac) is negative, the parabola does not cross the x-axis and the roots are complex numbers — the tool will show them in a+bi form.'],
    ],
  },
  related: ['square-root-calculator', 'percentage-calculator', 'fraction-calculator', 'average-calculator'],
},
{
  slug: 'lcm-calculator', name: 'LCM & GCF Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Least common multiple and greatest common factor of any numbers.',
  metaDescription: 'Calculate Least Common Multiple (LCM) and Greatest Common Factor (GCF) online. Math tool for reducing fractions and solving ratios.',
  keywords: ['lcm calculator', 'gcf calculator', 'hcf calculator', 'least common multiple'],
  fields: [{ key: 'list', label: 'Whole numbers (comma or space separated)', type: 'text', def: '12, 18, 30' }],
  content: {
    intro: 'Find the least common multiple and greatest common factor (also called HCF) of two or more whole numbers at once.',
    how: 'GCF uses Euclid\'s algorithm — repeatedly replacing the larger number with the remainder. LCM of a pair = a×b ÷ GCF(a,b), folded across the whole list.',
    howSteps: [
      'Enter a list of two or more whole numbers.',
      'The engine uses Euclid\'s algorithm to extract common primes.',
      'View the lowest common multiple and highest common factor instantly.'
    ],
    faqs: [
      ['Where is LCM used in real life?', 'Common denominators for fractions, aligning repeating schedules, and gear/cycle problems.'],
      ['GCF vs HCF — different things?', 'Same concept, different names: greatest common factor (US) = highest common factor (UK/India).'],
      ['Why whole numbers only?', 'LCM/GCF are defined on integers. For decimals, scale them to integers first (×10, ×100…).'],
    ],
  },
  related: ['prime-factorization-calculator', 'fraction-calculator', 'average-calculator', 'percentage-calculator'],
},
{
  slug: 'square-root-calculator', name: 'Square Root Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'The square root of any number — including negative inputs.',
  metaDescription: 'Calculate square roots online. Find principal roots for any number, complete with imaginary root support for negative numbers.',
  keywords: ['square root calculator', 'sqrt calculator', 'square root online'],
  fields: [n('n', 'Number', 1764)],
  content: {
    intro: 'Take the square root of any number to 8-digit precision, with honest handling of negative inputs (imaginary results) instead of an error.',
    how: 'The principal square root of n is the non-negative value that squares back to n. For negative n, the result is imaginary: √(−n)·i — the tool labels it clearly.',
    howSteps: [
      'Type the number you want to find the root of.',
      'The calculator computes the principal root out to 8 decimal places.',
      'Copy the precise real or imaginary answer.'
    ],
    faqs: [
      ['Why does my calculator error on negatives?', 'Basic calculators only handle real numbers. Negative numbers have imaginary roots, shown here with the i notation.'],
      ['Is the answer exact?', 'Perfect squares are exact (√1764 = 42). Most roots are irrational and shown rounded to 8 digits.'],
      ['What is a principal root?', 'Both +42 and −42 square to 1764; the principal (default) root is the positive one.'],
    ],
  },
  related: ['quadratic-formula-calculator', 'percentage-calculator', 'lcm-calculator', 'fraction-calculator'],
},
{
  slug: 'standard-deviation-calculator', name: 'Standard Deviation Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Sample and population standard deviation, variance, and mean.',
  metaDescription: 'Calculate standard deviation online safely. Compute population and sample standard deviations, variance, and means from any data set.',
  keywords: ['standard deviation calculator', 'variance calculator', 'statistics calculator'],
  fields: [{ key: 'list', label: 'Numbers (comma or space separated)', type: 'text', def: '4, 8, 15, 16, 23, 42' }],
  content: {
    intro: 'Compute both sample and population standard deviation from a list of numbers, along with variance, mean, and count, the core measures of spread in statistics.',
    how: 'Variance is the average squared distance from the mean; standard deviation is its square root. Sample variance divides by n-1 (Bessel\'s correction), population by n.',
    howSteps: [
      'Paste your comma-separated list of data points.',
      'The statistical engine measures every variance from the mean.',
      'Read the detailed breakdown of sample vs population standard deviations.'
    ],
    faqs: [
      ['Sample or population standard deviation?', 'Use sample (n-1) when your data is a subset of a larger group, population (n) when it is the entire group.'],
      ['What does standard deviation tell me?', 'How spread out values are. A small SD means values cluster near the mean; a large SD means they are widely scattered.'],
      ['Why square the differences?', 'Squaring removes negative signs and weights larger deviations more heavily, then the square root returns to the original units.'],
    ],
  },
  related: ['average-calculator', 'probability-calculator', 'percentage-calculator', 'combination-calculator'],
},
{
  slug: 'ratio-calculator', name: 'Ratio Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Simplify ratios and solve for a missing term.',
  metaDescription: 'Free online ratio calculator. Simplify mathematical ratios to lowest terms or cross-multiply to solve proportion equations instantly.',
  keywords: ['ratio calculator', 'simplify ratio calculator', 'solve proportion'],
  fields: [{ key: 'a', label: 'First term (A)', type: 'number', def: 16 }, { key: 'b', label: 'Second term (B)', type: 'number', def: 24 }, { key: 'c', label: 'Solve A:B = C:? (optional)', type: 'number', def: 0 }],
  content: {
    intro: 'Reduce a ratio to its simplest form and, optionally, solve a proportion to find a missing term.',
    how: 'Ratios simplify by dividing both terms by their greatest common divisor. To solve A:B = C:?, the tool cross-multiplies: the missing term equals C x B / A.',
    howSteps: [
      'Enter your A and B terms to simplify a ratio.',
      'Optionally, enter a C term to solve a proportional equivalence.',
      'View the simplified ratio or the solved proportion.'
    ],
    faqs: [
      ['How do I simplify a ratio?', 'Divide both numbers by their greatest common divisor: 16:24 both divide by 8, giving 2:3.'],
      ['What is a proportion?', 'Two equal ratios. If A:B = C:D, then A x D = B x C, which lets you solve for any missing value.'],
      ['Where are ratios used?', 'Recipes, scale models, aspect ratios, mixing solutions, and financial analysis all rely on ratios.'],
    ],
  },
  related: ['fraction-calculator', 'percentage-calculator', 'average-calculator', 'slope-calculator'],
},
{
  slug: 'slope-calculator', name: 'Slope Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Slope, y-intercept, and the line equation from two points.',
  metaDescription: 'Calculate the slope of a line from two points. Free online slope calculator providing y-intercepts and full slope-intercept equations.',
  keywords: ['slope calculator', 'slope of a line calculator', 'y intercept calculator'],
  fields: [{ key: 'x1', label: 'x1', type: 'number', def: 1 }, { key: 'y1', label: 'y1', type: 'number', def: 2 }, { key: 'x2', label: 'x2', type: 'number', def: 4 }, { key: 'y2', label: 'y2', type: 'number', def: 8 }],
  content: {
    intro: 'Find the slope between two points, plus the y-intercept and the full slope-intercept equation of the line.',
    how: 'Slope m = (y2 - y1) / (x2 - x1) — rise over run. The y-intercept b comes from y = mx + b, giving the complete equation. A vertical line (x1 = x2) has undefined slope.',
    howSteps: [
      'Enter the X and Y coordinates for your first point.',
      'Enter the X and Y coordinates for your second point.',
      'The calculator derives the slope (m) and the y-intercept equation.'
    ],
    faqs: [
      ['What does slope mean?', 'The steepness and direction of a line: positive rises left to right, negative falls, zero is flat.'],
      ['Why is a vertical line undefined?', 'It has no horizontal change (run = 0), and dividing by zero is undefined.'],
      ['What is slope-intercept form?', 'y = mx + b, where m is the slope and b is where the line crosses the y-axis.'],
    ],
  },
  related: ['quadratic-formula-calculator', 'ratio-calculator', 'percentage-calculator', 'square-root-calculator'],
},
{
  slug: 'combination-calculator', name: 'Combination & Permutation Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Compute nCr and nPr for counting problems.',
  metaDescription: 'Calculate combinations (nCr) and permutations (nPr) online. Fast, secure probability counter for statistical and combinatorial math.',
  keywords: ['combination calculator', 'permutation calculator', 'ncr npr', 'probability counter'],
  fields: [{ key: 'n', label: 'n (total items)', type: 'number', def: 10, min: 0, max: 170 }, { key: 'r', label: 'r (chosen items)', type: 'number', def: 3, min: 0, max: 170 }],
  content: {
    intro: 'Calculate combinations (order does not matter) and permutations (order matters) for any n and r, the foundation of counting and probability.',
    how: 'Permutations nPr = n! / (n-r)!. Combinations nCr = n! / (r! (n-r)!). The difference: permutations count arrangements, combinations count selections.',
    howSteps: [
      'Enter the total number of items (n).',
      'Enter the number of items you are choosing (r).',
      'The engine computes the combinations and permutations formulas instantly.'
    ],
    faqs: [
      ['Combination vs permutation?', 'Use combinations when order does not matter (a committee of 3), permutations when it does (1st, 2nd, 3rd place).'],
      ['Why does n cap at 170?', 'Beyond 170!, the factorial exceeds JavaScript\'s number range. Larger cases need big-integer math.'],
      ['Where is this used?', 'Lottery odds, poker hands, password counting, and any "how many ways" question.'],
      ['When do I use combinations vs permutations?', 'Use combinations when order doesn\'t matter (choosing a committee); use permutations when it does (awarding first, second, third place).'],
      ['What is the formula for combinations?', 'C(n, r) = n! / (r! × (n−r)!). This counts the number of ways to choose r items from n items when order does not matter. The calculator handles the factorial arithmetic automatically.'],
    ],
  },
  related: ['probability-calculator', 'standard-deviation-calculator', 'average-calculator', 'percentage-calculator'],
},
{
  slug: 'sig-fig-calculator', name: 'Significant Figures Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'Round numbers to a chosen number of significant figures.',
  metaDescription: 'Free significant figures calculator. Round numbers to any number of sig figs with scientific notation — instant, accurate, runs in your browser.',
  keywords: ['significant figures calculator', 'sig fig calculator', 'sig figs', 'round significant figures'],
  fields: [
    n('number', 'Number', 3.14159, { step: 'any' }),
    n('figs', 'Significant figures', 3, { min: 1, max: 15, step: 1 }),
  ],
  content: {
    intro: 'Round any number to a specific count of significant figures — essential for science labs, chemistry homework, and reporting measurements with the correct precision.',
    how: 'Significant figures are the meaningful digits in a measurement. The calculator rounds your input to the requested number of sig figs using standard rounding rules and shows the result in scientific notation.',
    howSteps: [
      'Enter the number you want to round (e.g. 0.004520 or 12345).',
      'Set how many significant figures you need.',
      'View the rounded value and its scientific notation form.',
    ],
    faqs: [
      ['What counts as a significant figure?', 'All non-zero digits count, zeros between non-zero digits count, and trailing zeros after a decimal point count. Leading zeros do not.'],
      ['Why do sig figs matter?', 'They reflect measurement precision. Reporting more digits than you measured implies false accuracy.'],
      ['How is rounding handled?', 'Standard round-half-up rules apply at the last retained digit.'],
    ],
  },
  related: ['scientific-notation-converter', 'rounding-calculator', 'standard-deviation-calculator', 'percentage-calculator'],
},
{
  slug: 'probability-calculator', name: 'Probability Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Probability as a decimal, percentage, and odds.',
  metaDescription: 'Calculate statistical probabilities online. Convert outcomes into precise decimals, percentages, and odds securely in your browser.',
  keywords: ['probability calculator', 'odds calculator', 'chance calculator'],
  fields: [{ key: 'favorable', label: 'Favorable outcomes', type: 'number', def: 1, min: 0 }, { key: 'total', label: 'Total outcomes', type: 'number', def: 6, min: 1 }],
  content: {
    intro: 'Convert favorable and total outcomes into a probability, expressed as a decimal, a percentage, and odds, plus the chance of the event not happening.',
    how: 'Probability = favorable outcomes / total outcomes. Odds compare favorable to unfavorable. The complement (1 minus probability) is the chance the event does not occur.',
    howSteps: [
      'Enter the number of favorable outcomes (e.g., 1 for a specific die roll).',
      'Enter the total possible outcomes (e.g., 6).',
      'Review the calculated probability and true odds ratio.'
    ],
    faqs: [
      ['Probability vs odds?', 'Probability is favorable / total (1/6 for a die roll); odds compare favorable to unfavorable (1:5).'],
      ['What is the complement?', 'The probability an event does not happen: 1 minus the event probability. They always sum to 1.'],
      ['How do I combine probabilities?', 'For independent events, multiply for "and", add (minus overlap) for "or". This tool covers single events.'],
    ],
  },
  related: ['combination-calculator', 'standard-deviation-calculator', 'percentage-calculator', 'average-calculator'],
},
{
  slug: 'exponent-calculator', name: 'Exponent Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Raise any base to any power, including negative and fractional exponents.',
  metaDescription: 'Calculate mathematical exponents online safely. Raise numbers to any power including negative, zero, and fractional exponents.',
  keywords: ['exponent calculator', 'power calculator', 'base to power'],
  fields: [{ key: 'base', label: 'Base', type: 'number', def: 2 }, { key: 'exp', label: 'Exponent', type: 'number', def: 10 }],
  content: {
    intro: 'Compute a base raised to any power, handling negative exponents (reciprocals) and fractional exponents (roots).',
    how: 'Exponentiation multiplies the base by itself exponent times. A negative exponent gives the reciprocal; a fractional exponent gives a root (x^0.5 is the square root of x).',
    howSteps: [
      'Enter the base number you wish to multiply.',
      'Enter the exponent (power) to raise the base to.',
      'The calculator processes the algebraic power function.'
    ],
    faqs: [
      ['What does a negative exponent mean?', '2^-3 = 1 / 2^3 = 0.125. A negative exponent is the reciprocal of the positive power.'],
      ['What about fractional exponents?', 'x^(1/n) is the nth root. So 27^(1/3) = 3, the cube root of 27.'],
      ['What is anything to the power of 0?', 'Any nonzero number to the power 0 equals 1.'],
    ],
  },
  related: ['square-root-calculator', 'log-calculator', 'quadratic-formula-calculator', 'percentage-calculator'],
},
{
  slug: 'log-calculator', name: 'Logarithm Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Logarithm of a number in any base, plus ln and log base 10.',
  metaDescription: 'Calculate Logarithms online. Free log calculator supporting natural logs (ln), base 10, and custom logarithmic bases.',
  keywords: ['log calculator', 'logarithm calculator', 'natural log calculator'],
  fields: [{ key: 'number', label: 'Number', type: 'number', def: 1000, min: 0 }, { key: 'base', label: 'Base', type: 'number', def: 10, min: 0 }],
  content: {
    intro: 'Compute the logarithm of a number in any base, with natural log (ln) and log base 10 shown alongside.',
    how: 'A logarithm answers "what power gives this number?" log base b of x equals ln(x) / ln(b) by the change-of-base formula. The number must be positive.',
    howSteps: [
      'Enter the target number.',
      'Enter the mathematical base (e.g., 10 or 2).',
      'The system evaluates the change-of-base formula to output the log.'
    ],
    faqs: [
      ['What is a logarithm?', 'The inverse of exponentiation: log base 2 of 8 is 3, because 2^3 = 8.'],
      ['ln vs log?', 'ln is the natural log (base e ~ 2.718); log usually means base 10. Both are shown here.'],
      ['Why must the number be positive?', 'No real power of a positive base produces zero or a negative number, so their logarithms are undefined in real numbers.'],
    ],
  },
  related: ['scientific-calculator', 'exponent-calculator', 'square-root-calculator', 'quadratic-formula-calculator'],
},
{
  slug: 'rounding-calculator', name: 'Rounding Calculator', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Round any number to a chosen number of decimal places.',
  metaDescription: 'Round numbers and decimals online. Round up (ceiling), round down (floor), and standard round to any decimal place.',
  keywords: ['rounding calculator', 'round numbers calculator', 'decimal rounder'],
  fields: [{ key: 'number', label: 'Number', type: 'number', def: 3.14159 }, { key: 'places', label: 'Decimal places', type: 'number', def: 2, min: -10, max: 10 }],
  content: {
    intro: 'Round a number to any number of decimal places, with standard rounding plus round-up (ceiling) and round-down (floor) shown alongside.',
    how: 'Standard rounding goes to the nearest value, ties rounding up. Negative decimal places round to tens, hundreds, and so on. Ceiling always rounds toward positive infinity; floor toward negative.',
    howSteps: [
      'Type your full decimal number.',
      'Specify the amount of decimal places to round to.',
      'View the standard rounding, the ceiling, and the floor outputs.'
    ],
    faqs: [
      ['What is "round half up"?', 'When the digit is exactly 5, the value rounds up. Some fields use "round half to even" (banker\'s rounding) instead; this tool uses half up.'],
      ['Can I round to tens or hundreds?', 'Yes — use negative decimal places: -1 rounds to the nearest ten, -2 to the nearest hundred.'],
      ['Ceiling vs floor?', 'Ceiling always rounds up, floor always rounds down, regardless of the digit.'],
      ['What is banker\'s rounding?', 'Also called round-half-to-even, it rounds 0.5 to the nearest even number (2.5 → 2, 3.5 → 4) to reduce cumulative bias in financial calculations.'],
      ['How does rounding affect financial calculations?', 'Small rounding differences compound in repeated operations. That is why financial software typically uses exact decimal arithmetic or rounds only at the final display step, not at intermediate steps.'],
    ],
  },
  related: ['scientific-notation-converter', 'percentage-calculator', 'average-calculator', 'fraction-calculator'],
},
{
  slug: 'scientific-notation-converter', name: 'Scientific Notation Converter', prio: 'P3', category: 'math', widget: 'calc',
  short: 'Convert numbers to scientific notation, E notation, and back.',
  metaDescription: 'Convert numbers to Scientific Notation online. Instantly translate large and small decimals into standard E notation.',
  keywords: ['scientific notation converter', 'standard form calculator', 'e notation'],
  fields: [{ key: 'number', label: 'Number', type: 'number', def: 0.00042 }],
  content: {
    intro: 'Express any number in scientific notation and E notation, the compact forms used for very large and very small values in science and engineering.',
    how: 'Scientific notation writes a number as a mantissa between 1 and 10 times a power of ten. The exponent is the number of places the decimal point moves; the tool computes it from the base-10 logarithm.',
    howSteps: [
      'Paste your large integer or tiny decimal into the tool.',
      'The calculator processes the base-10 logarithm shift.',
      'Copy the output in proper Scientific or E notation.'
    ],
    faqs: [
      ['What is scientific notation good for?', 'Writing numbers like 0.00042 (4.2 x 10^-4) or 9,300,000 (9.3 x 10^6) compactly and comparing magnitudes at a glance.'],
      ['What is E notation?', 'A computer-friendly form: 4.2e-4 means 4.2 x 10^-4. Calculators and code use it widely.'],
      ['How do I read the exponent?', 'A positive exponent means a large number; negative means a small fraction. Its size is how many places the decimal shifts.'],
    ],
  },
  related: ['sig-fig-calculator', 'rounding-calculator', 'exponent-calculator', 'log-calculator'],
},
{
  slug: 'percentage-change-calculator', name: 'Percentage Change Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'Percentage increase or decrease between two values.',
  metaDescription: 'Calculate percentage change online for free. Find the exact percent increase or decrease between original and new numbers.',
  keywords: ['percentage change calculator', 'percent increase calculator', 'percent decrease', 'percent variance'],
  fields: [{ key: 'from', label: 'Original value', type: 'number', def: 80 }, { key: 'to', label: 'New value', type: 'number', def: 100 }],
  content: {
    intro: 'Find the percentage increase or decrease from one number to another — for prices, statistics, weights, or any before-and-after comparison.',
    how: 'Percentage change = (new - original) / |original| x 100. A positive result is an increase, negative a decrease. The tool shows direction and the raw difference too.',
    howSteps: [
      'Enter the baseline original value.',
      'Enter the new updated value.',
      'Read whether it is a percentage increase or decrease, and by exactly how much.'
    ],
    faqs: [
      ['How is this different from percentage difference?', 'Percentage change has a clear direction (from old to new). Percentage difference compares two values symmetrically without a baseline.'],
      ['Why divide by the original?', 'The change is measured relative to the starting point, which is the original value.'],
      ['Can it handle a decrease to zero?', 'A drop to zero is a 100% decrease. Change from zero, however, is undefined (you cannot divide by zero).'],
    ],
  },
  related: ['percentage-calculator', 'fraction-calculator', 'ratio-calculator', 'average-calculator'],
},
{
  slug: 'mean-median-mode-calculator', name: 'Mean, Median, Mode Calculator', prio: 'P1', category: 'math', widget: 'calc',
  short: 'All three averages plus range from a list of numbers.',
  metaDescription: 'Calculate Mean, Median, and Mode online. Free statistical tool to find averages and range from any list of values.',
  keywords: ['mean median mode calculator', 'average calculator', 'median calculator', 'range calculator'],
  fields: [{ key: 'list', label: 'Numbers (comma or space separated)', type: 'text', def: '12, 15, 12, 18, 22, 12, 30' }],
  content: {
    intro: 'Compute the mean, median, and mode of a data set at once, along with the range — the four most common measures of central tendency and spread.',
    how: 'Mean is the arithmetic average; median is the middle value when sorted; mode is the most frequent value (or values); range is max minus min.',
    howSteps: [
      'Paste your list of numbers into the tool.',
      'The engine sorts the data and evaluates frequencies.',
      'Read the calculated mean, median, mode, and range of your dataset.'
    ],
    faqs: [
      ['When should I use median instead of mean?', 'The median resists outliers. For skewed data like incomes or home prices, median is often more representative than mean.'],
      ['Can there be more than one mode?', 'Yes — data with two equally frequent peaks is bimodal. If no value repeats, there is no mode.'],
      ['What does range tell me?', 'The total spread between the smallest and largest values — a quick sense of variability.'],
    ],
  },
  related: ['average-calculator', 'standard-deviation-calculator', 'percentage-calculator', 'probability-calculator'],
},
{
  slug: 'prime-factorization-calculator', name: 'Prime Factorization Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Break any integer into its prime factors.',
  metaDescription: 'Calculate prime factorization online safely. Break down any integer into its prime factors using our free math tool.',
  keywords: ['prime factorization calculator', 'prime factors calculator', 'prime factor tree'],
  fields: [{ key: 'number', label: 'Number (2 or greater)', type: 'number', def: 360, min: 2, max: 1000000000000 }],
  content: {
    intro: 'Factor any whole number into its prime building blocks, shown both in exponent form and as a full list, with a check for whether the number itself is prime.',
    how: 'The tool divides by successive primes (trial division up to the square root), which is efficient for the everyday range. Each prime is recorded until only 1 remains.',
    howSteps: [
      'Type an integer to factorize.',
      'The engine divides by successive primes mathematically.',
      'Review the broken-down prime elements in exponent format.'
    ],
    faqs: [
      ['What is prime factorization?', 'Expressing a number as a product of primes — for example, 360 = 2^3 x 3^2 x 5. Every integer has a unique factorization.'],
      ['Why does it matter?', 'It underlies finding GCD and LCM, simplifying fractions, and much of number theory and cryptography.'],
      ['How big a number can it handle?', 'Up to about a trillion comfortably. Very large semiprimes (as used in cryptography) are deliberately hard to factor.'],
    ],
  },
  related: ['lcm-calculator', 'fraction-calculator', 'square-root-calculator', 'exponent-calculator'],
},
{
  slug: 'pythagorean-theorem-calculator', name: 'Pythagorean Theorem Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Solve for any side of a right triangle.',
  metaDescription: 'Pythagorean Theorem Calculator online. Solve for the hypotenuse or legs of any right triangle instantly.',
  keywords: ['pythagorean theorem calculator', 'hypotenuse calculator', 'right triangle calculator'],
  fields: [{ key: 'a', label: 'Side a', type: 'number', def: 3, min: 0 }, { key: 'b', label: 'Side b', type: 'number', def: 4, min: 0 }, { key: 'c', label: 'Hypotenuse c (leave 0 if unknown)', type: 'number', def: 0, min: 0 }],
  content: {
    intro: 'Solve a right triangle using the Pythagorean theorem: enter any two sides and the tool finds the third, plus the area and perimeter when you provide both legs.',
    how: 'The theorem states a² + b² = c², where c is the hypotenuse. Enter two known sides and leave the unknown as 0; the tool rearranges the formula to solve for it.',
    howSteps: [
      'Enter two known sides of your right triangle (e.g., side a and side b).',
      'Leave the third unknown side blank or 0.',
      'The calculator uses a² + b² = c² to find the exact missing length.'
    ],
    faqs: [
      ['What is the hypotenuse?', 'The longest side of a right triangle, opposite the right angle. It must be longer than either leg.'],
      ['Does this work for any triangle?', 'No — only right triangles. For others, use the law of cosines.'],
      ['What is a 3-4-5 triangle?', 'A classic right triangle where 3² + 4² = 5². Any multiple (6-8-10, etc.) also works.'],
    ],
  },
  related: ['square-root-calculator', 'triangle-area-calculator', 'slope-calculator', 'exponent-calculator'],
},
{
  slug: 'triangle-area-calculator', name: 'Triangle Area Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Area from base and height, or from three sides (Heron\'s).',
  metaDescription: 'Calculate the area of a triangle online. Solve via base and height, or use Heron\'s formula if you only know the three side lengths.',
  keywords: ['triangle area calculator', 'area of triangle calculator', 'herons formula'],
  fields: [{ key: 'mode', label: 'Method', type: 'select', def: 'base', options: [{ value: 'base', label: 'Base & height' }, { value: 'heron', label: 'Three sides (Heron\'s)' }] }, { key: 'base', label: 'Base', type: 'number', def: 10, min: 0 }, { key: 'height', label: 'Height', type: 'number', def: 6, min: 0 }, { key: 'a', label: 'Side a (Heron\'s)', type: 'number', def: 5, min: 0 }, { key: 'b', label: 'Side b (Heron\'s)', type: 'number', def: 6, min: 0 }, { key: 'c', label: 'Side c (Heron\'s)', type: 'number', def: 7, min: 0 }],
  content: {
    intro: 'Find the area of any triangle two ways: the simple base-times-height method, or Heron\'s formula when you only know the three side lengths.',
    how: 'Base-and-height: area = ½ x base x height. Heron\'s: with semi-perimeter s = (a+b+c)/2, area = sqrt(s(s-a)(s-b)(s-c)). The tool validates that the three sides form a real triangle.',
    howSteps: [
      'Choose your knowns: Base & Height or 3 Sides.',
      'Input the dimensions.',
      'The calculator computes the geometrical area (using Heron\'s formula for sides).'
    ],
    faqs: [
      ['When do I use Heron\'s formula?', 'When you know all three sides but not the height — common for irregular triangles.'],
      ['What makes three sides a valid triangle?', 'Each side must be shorter than the sum of the other two (the triangle inequality).'],
      ['Do the units matter?', 'Use consistent units; the area comes out in those units squared.'],
      ['Can I use this for right triangles?', 'Yes — for a right triangle, use base × height ÷ 2 where the two legs are the base and height. Heron\'s formula also works if you know all three sides.'],
      ['What units should I use?', 'Any consistent unit — the area comes out in those units squared. If your sides are in meters, the area is in square meters. If in feet, it is in square feet.'],
    ],
  },
  related: ['pythagorean-theorem-calculator', 'square-root-calculator', 'slope-calculator', 'percentage-calculator'],
},
{
  slug: 'scientific-calculator', name: 'Scientific Calculator', prio: 'P1', category: 'math', widget: 'scientificcalculator',
  short: 'Full scientific calculator with trig, log, memory, and keyboard support.',
  metaDescription: 'Free online scientific calculator. Perform trigonometry, logarithms, factorials, and complex math securely in your browser.',
  keywords: ['scientific calculator', 'online scientific calculator', 'sin cos tan calculator', 'trig calculator', 'advanced calculator'],
  content: {
    intro: 'A full-featured scientific calculator: arithmetic, trigonometry (sin, cos, tan and inverses), logarithms, powers, factorials, square roots, π, e, and memory — all running locally in your browser with full keyboard support.',
    how: 'The expression is parsed by a custom recursive-descent engine — no eval, no external libraries. Operator precedence (BODMAS), parentheses, and all standard functions are handled correctly. Switch between degree and radian mode with the DEG/RAD toggle before computing trig functions.',
    howSteps: [
      'Type your complex equation or use the on-screen buttons.',
      'Ensure you are in the right mode (DEG or RAD) before running trig functions.',
      'Press equals to calculate, or use Memory Save (MS) for multi-step math.'
    ],
    faqs: [
      ['How do I use trig functions?', 'Press sin/cos/tan, then type your angle in the bracket. Make sure DEG is active for degrees (default), or switch to RAD for radians before calculating.'],
      ['Can I type expressions directly?', 'Yes — click on the calculator and use your keyboard. Numbers, operators (+−×÷^%), parentheses, Enter for equals, and Backspace all work.'],
      ['What is the memory for?', 'MS stores the current result to memory, MR recalls it into the expression, and MC clears it — useful for multi-step calculations.'],
    ],
  },
  related: ['percentage-calculator', 'exponent-calculator', 'log-calculator', 'square-root-calculator'],
},
];
