import { ToolDef } from '../types';

export const DATETIME: ToolDef[] = [
{
  slug: 'age-calculator', name: 'Age Calculator', prio: 'P1', category: 'date-time', widget: 'calc',
  short: 'Exact age in years, months, and days — plus days to your next birthday.',
  metaDescription: 'Free online age calculator. Calculate your exact age in years, months, and days, and see the precise countdown to your next birthday.',
  keywords: ['age calculator', 'how old am i', 'exact age calculator'],
  fields: [{ key: 'dob', label: 'Date of birth', type: 'date', def: '1995-06-15' }, { key: 'asof', label: 'Age as of (default: today)', type: 'date', def: '' }],
  content: {
    intro: 'Your precise age broken into years, months, and days, with total days lived and a countdown to your next birthday.',
    how: 'Calendar-aware subtraction: days borrow from months and months from years, respecting each month\'s real length and leap years — which is why it beats dividing by 365.',
    howSteps: [
      'Enter your date of birth in the provided field.',
      'Optionally set a target date to calculate your age at a specific point in time.',
      'Review your exact age in years, months, and days, along with your birthday countdown.'
    ],
    faqs: [
      ['Why not just divide days by 365?', 'Leap years and unequal months make that drift. Calendar borrowing gives the legally and culturally correct age.'],
      ['Can I compute age at a past or future date?', 'Yes — set the "as of" date to anything: visa forms, school cutoffs, retirement dates.'],
      ['How are leap-day birthdays handled?', 'Feb 29 birthdays roll to Mar 1 in non-leap years for the next-birthday countdown.'],
    ],
  },
  related: ['days-between-dates', 'days-until-calculator', 'roman-numeral-converter', 'add-days-to-date'],
},
{
  slug: 'days-between-dates', name: 'Days Between Dates', prio: 'P1', category: 'date-time', widget: 'calc',
  short: 'Count the days, weeks, and months separating any two dates.',
  metaDescription: 'Calculate the days between dates online for free. Instantly find out how many days, weeks, and months separate two calendar dates.',
  keywords: ['days between dates', 'date duration calculator', 'calculate days'],
  fields: [{ key: 'start', label: 'Start date', type: 'date', def: '2026-01-01' }, { key: 'end', label: 'End date', type: 'date', def: '2026-12-31' }],
  content: {
    intro: 'The number of days between two dates, with the week breakdown and the inclusive count (handy for billing periods and deadlines).',
    how: 'Difference in milliseconds divided by 86,400,000, rounded — order doesn\'t matter, the result is always positive. "Including end date" adds one for ranges where both endpoints count.',
    howSteps: [
      'Select your starting calendar date.',
      'Select your ending calendar date.',
      'Read the calculated total days between the two dates (inclusive and exclusive).'
    ],
    faqs: [
      ['Inclusive or exclusive — which do I need?', 'Rentals and subscriptions usually count nights/periods (exclusive); event durations like "days 1–3" often count inclusively.'],
      ['Are leap years handled?', 'Yes — the calculation uses real calendar dates, so Feb 29 counts when it exists.'],
      ['Does it count business days?', 'This counts all days. Weekend/holiday-aware counting is a separate (business-days) calculation.'],
    ],
  },
  related: ['add-days-to-date', 'days-until-calculator', 'age-calculator', 'percentage-calculator'],
},
{
  slug: 'add-days-to-date', name: 'Add or Subtract Days From a Date', prio: 'P2', category: 'date-time', widget: 'calc',
  short: 'What date is 30, 90, or N days (or weeks, months, years) from any date?',
  metaDescription: 'Add or subtract days from a date online. Free calculator to find what date is a certain number of days, weeks, or months away.',
  keywords: ['add days to date', '90 days from today', 'date plus days', 'subtract days'],
  fields: [{ key: 'start', label: 'Start date (default: today)', type: 'date', def: '' },
    { key: 'amount', label: 'Add (negative to subtract)', type: 'number', def: 90 },
    { key: 'unit', label: 'Unit', type: 'select', def: 'days', options: [
      { value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }] }],
  content: {
    intro: 'Project forward or backward from any date: deadlines 90 days out, warranty ends, notice periods, follow-up dates — with the weekday named.',
    how: 'Date arithmetic on the real calendar. Month and year additions clamp sensibly (Jan 31 + 1 month lands at the end of February), matching how deadlines are interpreted in practice.',
    howSteps: [
      'Set your starting date (or leave blank to use today).',
      'Enter the numerical amount to add (use a negative number to subtract).',
      'Select your unit (days, weeks, months, years) and see the exact resulting date.'
    ],
    faqs: [
      ['What is 90 days from today?', 'Leave the start date blank — it defaults to today — and the result updates instantly.'],
      ['Why did Jan 31 + 1 month give Feb 28?', 'February has no 31st; calendar math clamps to the month\'s last day, the standard convention.'],
      ['Can I subtract?', 'Yes — enter a negative amount to go backward.'],
      ['Does it skip holidays?', 'No — it adds calendar days. For business-day addition that skips weekends, use the Add Business Days calculator.'],
    ],
  },
  related: ['days-between-dates', 'days-until-calculator', 'age-calculator', 'percentage-calculator'],
},
{
  slug: 'days-until-calculator', name: 'Days Until Calculator', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'A clean count of days remaining until any date.',
  metaDescription: 'Countdown calculator to find out how many days until a specific date. Track days remaining until your event, holiday, or deadline.',
  keywords: ['days until', 'countdown to date', 'how many days until'],
  fields: [{ key: 'target', label: 'Target date', type: 'date', def: '2026-12-25' }],
  content: {
    intro: 'A static day-count to any future date — the answer to "how many days until…" for launches, exams, holidays, and deadlines.',
    how: 'Both dates are normalized to midnight and subtracted, so the count means full calendar days remaining, not 24-hour blocks from this moment.',
    howSteps: [
      'Select the future target date you are counting down to.',
      'The calculator subtracts today from the target to find the difference.',
      'See exactly how many full days remain.'
    ],
    faqs: [
      ['Does today count?', 'No — the count is days remaining after today, the everyday meaning of "days until".'],
      ['The date already passed?', 'The tool flips to "days ago" instead of showing a negative.'],
      ['Is this a live ticking countdown?', 'No — it is a day count. The number changes once per day, at midnight.'],
    ],
  },
  related: ['days-between-dates', 'add-days-to-date', 'age-calculator', 'percentage-calculator'],
},
{
  slug: 'hours-calculator', name: 'Hours Calculator (Time Card)', prio: 'P1', category: 'date-time', widget: 'calc',
  short: 'Total worked hours from clock-in/out times, with optional pay.',
  metaDescription: 'Free online hours calculator for time cards. Add up work hours, deduct unpaid breaks, and calculate total pay easily.',
  keywords: ['hours calculator', 'time card calculator', 'work hours calculator', 'payroll hours'],
  fields: [{ key: 'in1', label: 'Clock in (24h, e.g. 09:00)', type: 'text', def: '09:00' }, { key: 'out1', label: 'Clock out', type: 'text', def: '17:30' }, { key: 'in2', label: 'Day 2 in (optional)', type: 'text', def: '' }, { key: 'out2', label: 'Day 2 out', type: 'text', def: '' }, { key: 'breakMin', label: 'Unpaid break (minutes)', type: 'number', def: 30, unit: 'min', min: 0, max: 1440 }, { key: 'rate', label: 'Hourly pay (optional)', type: 'number', def: 0, unit: '$' }],
  content: {
    intro: 'Add up worked hours from clock-in and clock-out times, subtract unpaid breaks, and optionally calculate gross pay, handling overnight shifts correctly.',
    how: 'Each shift\'s minutes are summed (rolling past midnight when the clock-out is earlier than the clock-in), the break is deducted, and the total converts to decimal hours, then multiplied by your rate if provided.',
    howSteps: [
      'Enter your shift\'s clock-in time.',
      'Enter your shift\'s clock-out time.',
      'Provide your unpaid break time in minutes to see your total hours (and optionally provide pay rate to see gross pay).'
    ],
    faqs: [
      ['Does it handle overnight shifts?', 'Yes — if clock-out is earlier than clock-in, the tool assumes the shift crossed midnight and adds 24 hours.'],
      ['What are decimal hours?', 'Hours expressed as a decimal (8h 30m = 8.5), the format payroll systems use.'],
      ['Can I add more days?', 'Two shift rows are provided; sum multiple time cards by running each and adding the decimal totals.'],
    ],
  },
  related: ['days-between-dates', 'business-days-calculator', 'salary-calculator', 'hourly-to-salary-calculator'],
},
{
  slug: 'business-days-calculator', name: 'Business Days Calculator', prio: 'P2', category: 'date-time', widget: 'calc',
  short: 'Count working days (excluding weekends) between two dates.',
  metaDescription: 'Calculate the number of business days between two dates. Free tool to find working days excluding weekends for projects and SLAs.',
  keywords: ['business days calculator', 'working days calculator', 'weekdays between'],
  fields: [{ key: 'start', label: 'Start date', type: 'date', def: '2026-06-01' }, { key: 'end', label: 'End date', type: 'date', def: '2026-06-30' }],
  content: {
    intro: 'Count the number of business days, weekend days, and total days between two dates, useful for delivery estimates, project timelines, and notice periods.',
    how: 'The tool steps through each date in the range and tallies weekdays separately from weekends. Both endpoints are included in the count.',
    howSteps: [
      'Pick a starting calendar date.',
      'Pick an ending calendar date.',
      'Read the total number of Monday-to-Friday business days between the two dates.'
    ],
    faqs: [
      ['Does it include holidays?', 'No — it excludes weekends only. Public holidays vary by country and are not deducted.'],
      ['Are both dates counted?', 'Yes, the range is inclusive of both the start and end dates.'],
      ['What counts as a business day?', 'Monday through Friday. Saturday and Sunday are treated as weekend days.'],
    ],
  },
  related: ['days-between-dates', 'hours-calculator', 'add-days-to-date', 'week-number-calculator'],
},
{
  slug: 'week-number-calculator', name: 'Week Number Calculator', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'The ISO 8601 week number for any date.',
  metaDescription: 'Find the ISO 8601 week number for any date. Free online calculator providing calendar week numbers for European and business systems.',
  keywords: ['week number calculator', 'iso week number', 'what week is it'],
  fields: [{ key: 'date', label: 'Date', type: 'date', def: '2026-06-11' }],
  content: {
    intro: 'Find the ISO 8601 week number for any date, along with the day of the year, the standard used across business and European calendars.',
    how: 'ISO 8601 defines week 1 as the week containing the year\'s first Thursday, with weeks starting on Monday. The tool applies this rule precisely, including year-boundary edge cases.',
    howSteps: [
      'Select a specific calendar date.',
      'The engine calculates the week based on ISO 8601 Thursday rules.',
      'Read the week number and the day-of-the-year figure.'
    ],
    faqs: [
      ['What is an ISO week?', 'A Monday-to-Sunday week numbered so that week 1 contains the first Thursday of the year.'],
      ['Why can early January be week 52 or 53?', 'If the first days of January fall before that year\'s first Thursday, they belong to the final week of the previous year.'],
      ['Who uses week numbers?', 'Business planning, manufacturing, payroll, and much of Europe schedule by ISO week number.'],
      ['Why does week 1 sometimes start in the previous year?', 'Under ISO 8601, week 1 is the week containing the year\'s first Thursday. If January 1 falls late in the week, it belongs to week 52 or 53 of the previous year.'],
      ['Does the US use the same week numbering as Europe?', 'No — the US traditionally starts weeks on Sunday and counts from January 1, while ISO 8601 (used in Europe) starts weeks on Monday and defines week 1 as the week containing the first Thursday.'],
    ],
  },
  related: ['days-between-dates', 'business-days-calculator', 'age-calculator', 'add-days-to-date'],
},
{
  slug: 'roman-numeral-converter', name: 'Roman Numeral Converter', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'Convert numbers to Roman numerals and back.',
  metaDescription: 'Convert Arabic numbers to Roman Numerals or vice versa online for free. Support for all numerals between 1 and 3999.',
  keywords: ['roman numeral converter', 'roman numerals', 'numbers to roman'],
  fields: [{ key: 'mode', label: 'Direction', type: 'select', def: 'toRoman', options: [{ value: 'toRoman', label: 'Number to Roman' }, { value: 'toNumber', label: 'Roman to number' }] }, { key: 'number', label: 'Number (1-3999)', type: 'number', def: 2026, min: 1, max: 3999 }, { key: 'roman', label: 'Roman numeral', type: 'text', def: 'MMXXVI' }],
  content: {
    intro: 'Convert between Arabic numbers and Roman numerals in both directions, covering the standard range of 1 to 3999.',
    how: 'Number-to-Roman uses greedy subtraction over the standard symbol values (M, CM, D, CD, C ...). Roman-to-number sums symbols, subtracting when a smaller value precedes a larger one (as in IV = 4).',
    howSteps: [
      'Select whether to convert a Number to Roman or a Roman to Number.',
      'Input the value you wish to convert.',
      'The calculator displays the direct conversion instantly.'
    ],
    faqs: [
      ['Why the 1 to 3999 limit?', 'Standard Roman numerals have no symbol for zero and use bars for thousands above 3999, which this tool does not encode.'],
      ['How does subtractive notation work?', 'A smaller numeral before a larger one subtracts: IV = 4, IX = 9, XL = 40.'],
      ['Where are Roman numerals still used?', 'Clock faces, book chapters, movie sequels, Super Bowl numbering, and copyright years.'],
    ],
  },
  related: ['age-calculator', 'days-between-dates', 'week-number-calculator', 'percentage-calculator'],
},
{
  slug: 'time-duration-calculator', name: 'Time Duration Calculator', prio: 'P2', category: 'date-time', widget: 'calc',
  short: 'The length of time between two clock times.',
  metaDescription: 'Calculate the time duration between two hours. Free online time clock calculator to find hours and minutes between start and end times.',
  keywords: ['time duration calculator', 'time between calculator', 'hours and minutes calculator'],
  fields: [{ key: 'start', label: 'Start time (24h, e.g. 09:15)', type: 'text', def: '09:15' }, { key: 'end', label: 'End time (24h, e.g. 17:45)', type: 'text', def: '17:45' }],
  content: {
    intro: 'Find the elapsed time between two clock times, shown as hours and minutes, total minutes, and decimal hours — handling times that cross midnight.',
    how: 'Both times convert to minutes from midnight and subtract. If the end is earlier than the start, the tool assumes the span crosses midnight and adds 24 hours.',
    howSteps: [
      'Enter the starting time of your event.',
      'Enter the ending time of your event.',
      'View the total duration expressed in hours and minutes.'
    ],
    faqs: [
      ['Does it handle overnight spans?', 'Yes — an end time earlier than the start is treated as the next day.'],
      ['What are decimal hours?', 'Hours as a decimal (8h 30m = 8.5), the format used by payroll and time-tracking systems.'],
      ['Can I add dates too?', 'For spans across multiple days, use the Hours Calculator or Days Between Dates tool.'],
    ],
  },
  related: ['hours-calculator', 'days-between-dates', 'business-days-calculator', 'add-days-to-date'],
},
{
  slug: 'day-of-week-calculator', name: 'Day of the Week Calculator', prio: 'P2', category: 'date-time', widget: 'calc',
  short: 'What day of the week any date falls on.',
  metaDescription: 'Find what day of the week a date falls on. Free weekday calculator to determine if a past or future date is a Monday, Tuesday, etc.',
  keywords: ['day of the week calculator', 'what day was i born', 'weekday calculator'],
  fields: [{ key: 'date', label: 'Date', type: 'date', def: '2000-01-01' }],
  content: {
    intro: 'Find out which day of the week any date falls on — past, present, or future — along with the day of the year and whether it is a leap year.',
    how: 'The tool reads the calendar date and returns its weekday directly from the date system, which accounts for leap years and the Gregorian calendar rules automatically.',
    howSteps: [
      'Choose the date you want to query.',
      'The calculator queries the Gregorian calendar for that exact day.',
      'Read the resulting day of the week and day of the year.'
    ],
    faqs: [
      ['What day was I born?', 'Enter your birth date to see the weekday. January 1, 2000, for example, was a Saturday.'],
      ['Does it handle old dates?', 'Yes, within the standard proleptic Gregorian calendar that modern date systems use.'],
      ['What is the day of the year?', 'The count of days since January 1 — useful for scheduling and data work (1 to 365, or 366 in leap years).'],
    ],
  },
  related: ['age-calculator', 'week-number-calculator', 'days-between-dates', 'add-days-to-date'],
},
{
  slug: 'age-difference-calculator', name: 'Age Difference Calculator', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'The exact age gap between two birth dates.',
  metaDescription: 'Calculate the exact age difference between two dates. Free age gap calculator showing exact years, months, and days separating birthdates.',
  keywords: ['age difference calculator', 'age gap calculator', 'time between births'],
  fields: [{ key: 'date1', label: 'First birth date', type: 'date', def: '1990-05-15' }, { key: 'date2', label: 'Second birth date', type: 'date', def: '1993-11-20' }],
  content: {
    intro: 'Calculate the precise age difference between two people in years and months, plus the gap in days and weeks.',
    how: 'The tool takes the absolute difference between the two dates and expresses it in years and months, using the average year length to keep the figure accurate over long spans.',
    howSteps: [
      'Enter the birth date for the first person.',
      'Enter the birth date for the second person.',
      'Review the age gap output in total years, months, and days.'
    ],
    faqs: [
      ['Does the order of dates matter?', 'No — the tool uses the absolute difference, so it works regardless of which date is earlier.'],
      ['How precise is the years-and-months figure?', 'It is a close approximation using average month and year lengths; the days figure is exact.'],
      ['Can I compare any two dates?', 'Yes — though labeled for birth dates, it works for any pair of dates.'],
    ],
  },
  related: ['age-calculator', 'days-between-dates', 'weeks-between-dates-calculator', 'day-of-week-calculator'],
},
{
  slug: 'add-business-days-calculator', name: 'Add Business Days Calculator', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'Add or subtract working days from a date.',
  metaDescription: 'Calculate dates by adding business days online. Avoid weekends and calculate exact delivery times and SLA deadlines securely.',
  keywords: ['add business days calculator', 'working days from date', 'business days to date'],
  fields: [{ key: 'date', label: 'Start date', type: 'date', def: '2026-06-12' }, { key: 'days', label: 'Business days to add (negative to subtract)', type: 'number', def: 10 }],
  content: {
    intro: 'Find the date that falls a given number of working days before or after a start date — handy for delivery promises, SLAs, and deadlines that skip weekends.',
    how: 'The tool steps forward (or backward) one day at a time, counting only Monday through Friday, until it has counted the requested number of business days.',
    howSteps: [
      'Choose the starting date for your calculation.',
      'Enter the amount of business days to add or subtract.',
      'Read the resulting target date that strictly omits weekends.'
    ],
    faqs: [
      ['Does it skip holidays?', 'It skips weekends only. Public holidays vary by country and are not removed.'],
      ['Can I subtract days?', 'Yes — enter a negative number to count business days backward from the start date.'],
      ['Is the start date counted?', 'No — counting begins from the next business day, the usual convention for "in N business days".'],
    ],
  },
  related: ['business-days-calculator', 'add-days-to-date', 'days-between-dates', 'days-until-calculator'],
},
{
  slug: 'weeks-between-dates-calculator', name: 'Weeks Between Dates Calculator', prio: 'P3', category: 'date-time', widget: 'calc',
  short: 'Count the weeks (and days) between two dates.',
  metaDescription: 'Calculate the exact amount of weeks between two dates online. Find out how many weeks apart your events or milestones are.',
  keywords: ['weeks between dates calculator', 'how many weeks between', 'weeks apart'],
  fields: [{ key: 'start', label: 'Start date', type: 'date', def: '2026-01-01' }, { key: 'end', label: 'End date', type: 'date', def: '2026-06-12' }],
  content: {
    intro: 'Count how many weeks fall between two dates, shown as a decimal, as full weeks plus leftover days, and as a total day count.',
    how: 'The tool takes the day difference between the two dates and divides by seven. Both the exact decimal and the whole-weeks-plus-days breakdown are provided.',
    howSteps: [
      'Pick the first date on the calendar.',
      'Pick the second date on the calendar.',
      'The engine finds the difference and displays it as exact weeks.'
    ],
    faqs: [
      ['Pregnancy weeks?', 'For gestational age, use the Due Date Calculator, which counts from your last period with the standard medical convention.'],
      ['Does order matter?', 'No — the tool uses the absolute difference between the dates.'],
      ['How are partial weeks shown?', 'As both a decimal (e.g. 23.43 weeks) and as full weeks with the remaining days.'],
    ],
  },
  related: ['days-between-dates', 'business-days-calculator', 'week-number-calculator', 'age-difference-calculator'],
},
{
  slug: 'time-zone-converter', name: 'Time Zone Converter', prio: 'P1', category: 'date-time', widget: 'timezone',
  short: 'Convert a time between world time zones, DST-aware.',
  metaDescription: 'Convert times across world time zones instantly. Free DST-aware time zone calculator and meeting planner running fully in-browser.',
  keywords: ['time zone converter', 'timezone converter', 'world clock converter', 'dst calculator'],
  content: {
    intro: 'Convert a date and time from one time zone to another across major world cities, with daylight saving time handled automatically by your browser\'s time-zone data.',
    how: 'You enter a wall-clock time in a source zone; the tool finds the matching universal instant and reformats it for the target zone. Because it uses the IANA time-zone database, DST transitions are applied correctly for the chosen date.',
    howSteps: [
      'Enter the specific time and the starting time zone.',
      'Select the target time zone for conversion.',
      'View the converted time, accurately accounting for daylight savings.'
    ],
    faqs: [
      ['Does it handle daylight saving time?', 'Yes — the conversion uses the full time-zone rules for the specific date, so DST is applied automatically.'],
      ['Why these particular cities?', 'They span the major business time zones. Each represents its whole zone, so nearby cities share the result.'],
      ['Is the conversion done online?', 'No — it uses the time-zone database already built into your browser, entirely locally.'],
    ],
  },
  related: ['unix-timestamp-converter', 'time-duration-calculator', 'hours-calculator', 'day-of-week-calculator'],
},
];
