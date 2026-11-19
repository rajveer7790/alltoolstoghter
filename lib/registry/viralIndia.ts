import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string, help?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u, help });

export const VIRAL_INDIA: ToolDef[] = [
{
  slug: 'rupee-number-to-words-converter', name: 'Rupee Number to Words Converter (Lakhs & Crores)', prio: 'P2', category: 'text', widget: 'calc',
  short: 'Convert a rupee amount to Indian-English words, Indian comma format and a cheque-style line.',
  metaDescription: 'Number to words in lakhs and crores: convert a rupee amount with paise to words, Indian comma format (12,34,567.89) and a cheque-style line.',
  keywords: ['number to words in lakhs and crores', 'cheque amount in words converter india', 'rupees in words generator', 'indian numbering system comma formatter'],
  fields: [{ key: 'amount', label: 'Amount (₹)', type: 'text', def: '1234567.89', help: 'Digits with an optional decimal point; commas are ignored. Up to 12 digits before the decimal point.' }],
  content: {
    intro: 'Type a rupee amount and get it written out in Indian-English words using Crore, Lakh, Thousand and Hundred, plus the Indian comma format and a cheque-style line ending in Only. Useful when filling a cheque, invoice or voucher by hand.',
    how: 'The whole-rupee part is split the Indian way: crores (10,000,000s), lakhs (100,000s), thousands and the last three digits, and each block is spelled out. The decimal part is rounded half up to two places and read as paise. Comma grouping puts the last three digits together and then groups of two. Amounts of exactly one rupee use the singular. The tool handles up to 12 digits before the decimal point and is a formatting aid: check the wording against your bank or organisation before relying on it.',
    howSteps: ['Enter the amount, with or without commas and decimals.', 'Read the amount in words and the Indian-format number.', 'Copy the cheque-style line if you need it.'],
    example: 'For 12,34,567.89 the words are "Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven Rupees and Eighty Nine Paise Only" and the Indian format is ₹12,34,567.89.',
    faqs: [
      ['How does the Indian numbering system group digits?', 'The last three digits form one group and every group to the left has two digits, for example 12,34,567. Names used are Thousand, Lakh (1,00,000) and Crore (1,00,00,000).'],
      ['How are paise written?', 'Paise are the two digits after the decimal point. A third decimal digit of 5 or more rounds the paise up, so 10.995 becomes 11.00.'],
      ['What about zero or one rupee?', 'Zero gives "Zero Rupees Only", exactly one rupee gives "One Rupee Only", and a paise-only amount such as 0.25 gives "Twenty Five Paise Only".'],
      ['Is the wording accepted by every bank?', 'Not necessarily. Conventions on hyphens, capitalisation and the word "Only" vary, so treat the output as a draft and follow the instructions of the institution you are writing for.'],
    ],
  },
  related: ['percentage-calculator', 'percentage-change-calculator'],
},
{
  slug: 'exam-negative-marking-calculator', name: 'Exam Negative Marking Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Net score, accuracy, attempt rate and break-even guessing accuracy for any marking scheme you enter.',
  metaDescription: 'Negative marking calculator: enter total, correct and wrong answers plus your marks and penalty to get net score, accuracy and break-even guess accuracy.',
  keywords: ['negative marking calculator', 'neet +4 -1 score calculator', 'ssc negative marking calculator', 'accuracy percentage exam'],
  fields: [
    $('total', 'Total questions', 180), $('correct', 'Correct answers', 120), $('wrong', 'Wrong answers', 40),
    $('mpos', 'Marks per correct answer', 4, 'marks'), $('mneg', 'Penalty per wrong answer', 1, 'marks', 'Decimals allowed, e.g. 0.25. Enter 0 for no negative marking.'),
    $('max', 'Maximum marks (optional)', 720, 'marks', 'Leave blank or 0 to use total questions × marks per correct.'),
  ],
  content: {
    intro: 'Work out your net score for any exam with negative marking. Enter the marking scheme yourself, since rules differ between exams and years, and see your accuracy, attempt rate, marks lost to penalties and the accuracy at which guessing breaks even.',
    how: 'Net score = correct × marks per correct − wrong × penalty per wrong. Accuracy = correct ÷ (correct + wrong). Attempt rate = (correct + wrong) ÷ total. Break-even accuracy comes from setting the expected gain of a guess to zero: p × m − (1 − p) × n = 0, so p = n ÷ (m + n). Above that accuracy a guess has a positive expected value, below it a negative one. The tool does not know any exam\'s official rules; it applies the numbers you enter.',
    howSteps: ['Enter total questions and how many you got correct and wrong.', 'Enter the marks per correct answer and the penalty per wrong answer from your exam notice.', 'Read net score, accuracy and break-even accuracy.'],
    example: 'With 180 questions, 120 correct, 40 wrong, +4 per correct and −1 per wrong: net score = 120×4 − 40×1 = 440 marks, accuracy 75%, attempt rate 88.89%, and break-even accuracy 1 ÷ (4 + 1) = 20%.',
    faqs: [
      ['How is the net score calculated?', 'Marks for correct answers minus the penalty for wrong answers. Unattempted questions score zero.'],
      ['What is break-even accuracy?', 'The chance of being right at which a guess has an expected gain of zero marks. It equals penalty ÷ (marks per correct + penalty).'],
      ['Which exam rules does it use?', 'None. You enter the marks and penalty, so check the official notice for your exam; schemes can change between years and papers.'],
      ['Can I use a fractional penalty?', 'Yes. Enter a decimal such as 0.25 or 0.33. A one-third penalty is better entered as 0.3333, so the result is an approximation.'],
      ['Is this a prediction of rank or result?', 'No. It only does the arithmetic for the numbers you give it, and cannot account for normalisation or cut-offs.'],
    ],
  },
  related: ['percentage-calculator', 'gpa-calculator', 'attendance-percentage-calculator'],
},
{
  slug: 'attendance-percentage-calculator', name: 'Attendance Percentage & Bunk Planner Calculator', prio: 'P2', category: 'math', widget: 'calc',
  short: 'Attendance percentage, classes you can miss or must attend to reach your required percentage.',
  metaDescription: '75 percent attendance calculator: find your current attendance, how many classes you can miss or must attend in a row to reach your required percentage.',
  keywords: ['75 percent attendance calculator', 'how many classes to attend for 75 attendance', 'college bunk calculator', 'attendance shortage calculator'],
  fields: [
    $('attended', 'Classes attended', 60), $('total', 'Total classes held so far', 90),
    $('required', 'Required attendance', 75, '%', 'Set the percentage your institution requires; it differs between institutions.'),
    $('remaining', 'Classes remaining in term (optional)', 30, undefined, 'Used for the projected attendance if you attend all or miss all.'),
  ],
  content: {
    intro: 'Enter the classes you have attended and the total held to see your attendance percentage. The tool shows how many classes you can still miss, or how many you must attend in a row, to reach the percentage you need, with an optional end-of-term projection.',
    how: 'Attendance % = attended ÷ total × 100. If you are below the required percentage R, the classes to attend consecutively is the smallest x with (attended + x) ÷ (total + x) ≥ R%, which gives x = ceil((R × total − 100 × attended) ÷ (100 − R)). If you are at or above R, classes you can miss = floor(attended × 100 ÷ R − total). The required percentage is whatever you enter; institutions and courses have different rules, so confirm yours. Projections assume every remaining class is counted.',
    howSteps: ['Enter classes attended and total classes held.', 'Enter the required percentage and, optionally, classes remaining.', 'Read how many to attend or miss, and the projected percentage.'],
    example: 'Attended 60 of 90 classes with 75% required: current attendance is 66.67%. Classes to attend in a row = ceil((75×90 − 100×60) ÷ 25) = 30, giving 90 of 120 = 75%. With 30 classes remaining, missing all gives 50%.',
    faqs: [
      ['How is attendance percentage calculated?', 'Classes attended divided by total classes held, times 100.'],
      ['Does 75% apply to every college?', 'No. The required percentage varies by institution, course and sometimes by condonation rules, so enter the figure from your own rules.'],
      ['What does "classes to attend in a row" mean?', 'The number of upcoming classes you would have to attend without missing any for your percentage to reach the required level.'],
      ['Why can the answer say the target is not reachable?', 'If even attending every remaining class leaves you below the required percentage, no plan within the remaining classes reaches it.'],
    ],
  },
  related: ['percentage-calculator', 'gpa-calculator', 'exam-negative-marking-calculator'],
},
];
