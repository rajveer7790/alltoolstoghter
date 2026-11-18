// Deeper written content for high-intent tools. Numbers in worked examples are computed from the tool's own
// formula (see workedExample); this file holds only qualitative text and example *inputs*.
// Generated and validated by the content pipeline described in docs/SEO_AEO_GEO_PLAN_2026-11-18.md.
export interface DeepContent {
  answer: string;
  /** 35–55 word self-contained summary, written for answer engines and AI overviews. */
  aiSummary?: string;
  /** Head term (1–3 words). Must appear in the title, description and answer. */
  shortKeyword?: string;
  /** Natural long-tail phrases. Each must appear verbatim in a heading, FAQ question, the answer or the summary. */
  longKeywords?: string[];
  exampleInputs?: Record<string, string>;
  sections: { heading: string; text: string }[];
  faqs: [string, string][];
}
export const DEEP: Record<string, DeepContent> = {
  "due-date-calculator": {
    "answer": "This calculator estimates your due date, current gestational age, and trimester from the first day of your last period. It uses Naegele's rule: add 280 days, which is 40 weeks, to that date, then adjust if your cycle is longer or shorter than 28 days. The output is an estimate, and ultrasound dating from a provider is the more accurate reference.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I use a due date calculator?",
        "text": "Use it early in pregnancy, when you know the first day of your last period and need a working date for planning prenatal visits, arranging time off work, or thinking about childcare. Enter that date in the first field, then your usual cycle length in the second. The calculator runs in your browser and recalculates as soon as either value changes, so you can try a few cycle lengths and see how the estimate shifts. Treat the date as a starting point for conversations with your provider rather than a replacement for them."
      },
      {
        "heading": "How do I interpret the week and trimester shown?",
        "text": "The week value counts from the first day of your last period, which is the convention behind Naegele's rule, not from the day of conception. The trimester label groups those weeks into three ranges, so a date close to a boundary can change category after a single day. Read the output as the result of a counting method rather than a measurement. When your provider has dated the pregnancy by ultrasound, their estimate takes priority over the one shown here."
      },
      {
        "heading": "What mistakes make the estimate less reliable?",
        "text": "One easy mistake is entering a date that is not the first day of full flow, such as a day of light spotting or an unrelated event. Another is leaving the cycle length at the default when your own cycles usually run longer or shorter, since that shifts the result. Irregular cycles weaken the whole method, because the calculation assumes your last period marks a regular starting point. If you are unsure of the date, say so to your provider rather than guessing. This is an educational estimate, not medical advice."
      }
    ],
    "faqs": [
      [
        "Why is my due date different from the one my clinic gave me?",
        "Clinics often revise the due date after an early ultrasound, because a scan measures the baby directly. Ultrasound dating is described here as the more accurate method, so if the two dates disagree, follow the clinic's estimate for scheduling. This calculator only reflects the inputs you typed, so a change in your medical records does not update it."
      ],
      [
        "Does the week count start from conception?",
        "No. The count starts from the first day of your last period, so the week number runs ahead of the time since conception. This convention is used in dating because the last period is usually the easiest date to recall. Conception itself does not appear anywhere in the calculation."
      ],
      [
        "What should I do if my estimated date has already passed?",
        "A date that has passed does not mean something has gone wrong, since many pregnancies continue beyond the estimate. The date is a guide, not a deadline. Contact your provider about any concerns, because only a clinician can assess your pregnancy and its progress."
      ]
    ]
  },
  "ovulation-calculator": {
    "answer": "This calculator estimates your likely ovulation day and fertile window from the first day of your last period. Ovulation is estimated as the next period date minus your luteal phase length. The fertile window spans roughly the five days before ovulation through the day after, because sperm can survive for several days.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is an ovulation estimate useful?",
        "text": "People who track their cycles often use an estimate like this to plan around the fertile window, or to compare predicted dates with what they observe over several months. It also shows how cycle length and luteal phase length combine, since the same period date can produce very different ovulation days. Enter your last period date, your typical cycle length, and your luteal phase length. Then read the ovulation day and the range of days around it, rather than fixating on one date."
      },
      {
        "heading": "How should I read the fertile window?",
        "text": "The window is a range, not a single day. It runs from about five days before the estimated ovulation day through the day after, because sperm can survive for several days while waiting for an egg. Read the edges as soft boundaries rather than sharp cutoffs. The calculation works backward from the next expected period, so an error in your luteal phase length moves the ovulation day by the same amount. That relationship is worth remembering when you compare two different inputs."
      },
      {
        "heading": "What limits does this estimate have?",
        "text": "The tool assumes your cycle and luteal phase stay steady. If cycles vary from month to month, one calculated date can miss the real ovulation by several days, and the fertile window may shift too. Many people use the output as a starting point, then compare it with body signs or another tracking method over a few cycles. The luteal phase is usually the input people know least well, so an average from your own records beats a guess. This is an educational estimate, not medical advice, and it should not be relied on to prevent or plan a pregnancy."
      }
    ],
    "faqs": [
      [
        "Do I need to know my luteal phase length?",
        "The luteal phase is the time between ovulation and the next period, and the calculator needs it to work backward to an ovulation day. If you do not know it, the default value is only a starting point that you can change. Records from several cycles, or guidance from a clinician, give a better input than a single estimate."
      ],
      [
        "Why does the ovulation date move when I change my last period date?",
        "Every date in this calculation is anchored to the period start you enter, so a different start date shifts the predicted cycle and the ovulation estimate with it. This is expected behavior rather than an error. Use the start date of your most recent period, and confirm it against your records if you have them."
      ],
      [
        "Can ovulation happen on different days from one month to the next?",
        "Yes, timing can differ between cycles, which is why a single calculated day is less dependable than a range. Comparing several months of your own dates shows whether your pattern is steady or variable. An estimate built from a steady pattern is more useful than one built from an irregular pattern."
      ]
    ]
  },
  "fraction-calculator": {
    "answer": "This calculator performs one of four operations on two fractions and reduces the result to lowest terms, with the decimal form beside it. Addition and subtraction cross-multiply to a common denominator. Multiplication multiplies numerators and denominators straight across. Division multiplies by the reciprocal of the second fraction, then the result is divided by the greatest common divisor.",
    "exampleInputs": {
      "n1": "3",
      "d1": "4",
      "op": "*",
      "n2": "2",
      "d2": "5"
    },
    "sections": [
      {
        "heading": "When do I need to add or divide fractions?",
        "text": "Fraction arithmetic shows up in recipes that need scaling, in measurements that combine partial units, and in homework that asks for exact answers rather than rounded decimals. Use the tool to check a result you worked by hand, or to see the simplified form of an answer you already have. Choose the operation from the dropdown, enter the numerator and denominator of each fraction, and compare the reduced fraction with its decimal. Keeping values exact avoids the small rounding errors that decimals can introduce partway through a problem."
      },
      {
        "heading": "How should I read a negative or zero result?",
        "text": "Subtraction can return a negative value, and the sign belongs to the whole fraction, so the answer is negative no matter where you place the sign. A result of zero appears when the first numerator is zero or when the subtraction cancels exactly. Read the decimal next to the answer as a quick sense check. A product of two positive proper fractions is always smaller than either factor, while dividing by a fraction smaller than one gives a result larger than the number you started with."
      },
      {
        "heading": "What mistakes do people make with fraction operations?",
        "text": "A frequent slip is adding denominators directly, so that one half plus one third becomes two fifths instead of five sixths. Another is forgetting to flip the second fraction before dividing, which turns the quotient into a product by accident. Mixed numbers need converting to improper fractions before any operation. Check that no denominator is zero, because a zero denominator has no value. Working the problem once by hand and comparing it with the output catches most of these errors."
      }
    ],
    "faqs": [
      [
        "Why does addition need a common denominator?",
        "Fractions can only be combined when their parts are the same size. A common denominator rewrites each fraction so its pieces match, and then the numerators can be added. The tool does this with cross-multiplication before reducing the sum. Subtraction follows the same logic."
      ],
      [
        "Does the order of the two fractions matter?",
        "For addition and multiplication, swapping the two fractions gives the same result. Subtraction and division do not behave that way, since one half minus one third differs from one third minus one half. Keep the fractions in the order the problem gives them."
      ],
      [
        "How can I check a fraction answer quickly?",
        "Convert the result to a decimal and estimate the operation with rounded values. If three quarters times two fifths gives three tenths, the decimal 0.3 should look reasonable, because three quarters of two fifths is less than half of two fifths. A check like this catches most order-of-magnitude mistakes."
      ]
    ]
  },
  "final-grade-calculator": {
    "answer": "This calculator finds the score you need on a final exam to reach a target course grade. It uses your current grade, your desired grade, and the final's weight as a share of the course. The required score equals the desired grade minus the current grade times one minus the weight, divided by the weight. If the result is above 100%, the target cannot be reached with the final alone.",
    "exampleInputs": {
      "current": "78",
      "desired": "80",
      "weight": "25"
    },
    "sections": [
      {
        "heading": "When does this calculator help most?",
        "text": "Use it in the weeks before a final, when you want a concrete number to aim for rather than a vague goal of doing well. It is especially handy when your current grade is settled and the final is the only remaining graded item. Enter the grade you have now, the target you are aiming for, and the percentage of the course the final carries. Then compare the required score with your recent test results to judge whether the target is realistic and where your study time should go."
      },
      {
        "heading": "How do I interpret the required score?",
        "text": "The output is the score you must earn on the final itself, expressed as a percentage of that exam. A required score lower than your current grade means you have room to score below your current level on the final and still reach the target. A required score above 100% means the target is out of reach, and the tool says so instead of showing an impossible number. Scores between those extremes show how demanding the exam must be. The formula assumes your current grade is accurate, so a correction to an earlier grade changes the answer."
      },
      {
        "heading": "What mistakes make the result misleading?",
        "text": "A frequent mistake is entering the weight as a decimal, such as 0.3, when the field expects a percentage. Check the syllabus for the exact weight, because a rounded figure can shift the answer noticeably. Another mistake is treating a cumulative final as if it replaced only one earlier exam. The calculator is a planning aid built on the numbers you enter, not a guarantee from your instructor. If the final policy is unclear, confirm the rules with your instructor before relying on the result."
      }
    ],
    "faqs": [
      [
        "Do the course weights have to add up to 100%?",
        "The weight only describes the share of your course grade that the final represents, so it should be a percentage between 0 and 100. The formula does not check the rest of the syllabus. If your other components do not account for the remaining share, your real grade will differ from the calculation."
      ],
      [
        "Should I use my grade before or after the final?",
        "Use the grade you have earned so far, excluding the final. The formula treats the current grade as everything except the final and blends it with the final's share. Including the final in the current grade counts it twice and gives a wrong answer."
      ],
      [
        "How do I turn the target into a letter grade?",
        "Convert the letter grade to a percentage first, because the calculator works in percentages. Your school's grading scale decides which percentage each letter requires, and that scale is not part of this tool. Look up the cutoffs in your course policy, then enter the matching percentage as the desired grade."
      ]
    ]
  },
  "scientific-calculator": {
    "answer": "This scientific calculator evaluates full expressions that include trigonometric, logarithmic, power, factorial, and root functions, plus the constants pi and e. A custom parser reads the expression, applies BODMAS order and parentheses, then computes the result. Set the DEG or RAD toggle before evaluating trig functions, because angles are read in whichever unit is selected.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a scientific calculator better than a basic one?",
        "text": "A basic calculator handles one operation at a time, which forces you to write down intermediate results and retype them. This tool accepts a whole expression, such as a bracketed sum multiplied by a sine value, so the steps stay on one line. It suits formulas from physics, engineering, and statistics coursework, where logarithms, powers, and trig often appear together. Type the expression the way you would write it on paper, and the parser handles the order of operations for you."
      },
      {
        "heading": "Why does the DEG or RAD setting change my answer?",
        "text": "Trig functions need an angle unit, and the same input gives different outputs in each mode. The sine of 30 is one half in degree mode, but in radian mode the same input means 30 radians, which is a much larger angle. Check the toggle first whenever an angle-based answer looks unexpected. Degrees suit right-triangle geometry, while many calculus and physics formulas assume radians, so match the mode to the formula you are using."
      },
      {
        "heading": "What should I watch for when typing expressions?",
        "text": "Use parentheses wherever you want a grouping to be explicit, even when precedence rules would give the same result, because the expression is easier to check later. Watch for a missing closing bracket, which leaves the expression incomplete. Factorials apply to whole numbers, and a logarithm of zero or of a negative number is undefined. Reading the displayed expression back before you press equals catches most typing mistakes, especially a minus sign typed where a negative value was intended."
      }
    ],
    "faqs": [
      [
        "Why does my answer show a tiny number instead of zero?",
        "Calculators store decimals in binary, so some results that should be exactly zero come back as a very small nonzero value. The difference is a rounding artifact of the arithmetic, not a mistake in your input. When the context allows, treat values very close to zero as zero."
      ],
      [
        "What order of operations does this tool follow?",
        "It follows BODMAS, which puts brackets first, then orders such as powers and roots, then division and multiplication, and finally addition and subtraction. Multiplication and division share one rank and run left to right, as do addition and subtraction. Functions such as sine act on the value inside their brackets."
      ],
      [
        "How do I check a long expression I entered?",
        "Break the expression into its parts and evaluate each one separately, storing intermediate results in memory where that helps. Then compare the total with a rough estimate made by rounding each value. A large gap usually signals a missing bracket or a sign error."
      ]
    ]
  },
  "hours-calculator": {
    "answer": "This time card calculator adds up to seven work shifts and subtracts an unpaid break from each one. For every day, it finds the gap between clock-in and clock-out, rolls past midnight when needed, and removes the break. Paid minutes are summed across the week, then shown as hours and minutes and as decimal hours, with an optional pay estimate.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I use a weekly time card calculator?",
        "text": "Use it at the end of a pay period, when you have clock times for several shifts and want one total instead of working each day by hand. It helps when you need decimal hours for a payroll entry, since that format multiplies directly by an hourly rate, and hours-and-minutes for a written timesheet. Enter the shifts you worked and leave unused days empty. The optional hourly rate turns the total into a simple gross figure you can compare with a pay stub."
      },
      {
        "heading": "How does an overnight shift get counted?",
        "text": "When clock-out is earlier than clock-in, the calculator treats the shift as running past midnight and adds the missing time before subtracting the break. A shift from 22:00 to 06:00 spans eight hours on the clock. The break is subtracted once from that span, not from each hour. Enter times in 24-hour format, and record each break in minutes against the day it was taken. The decimal total then reads as hours worked, so 8:30 appears as 8.5."
      },
      {
        "heading": "What mistakes can distort the weekly total?",
        "text": "A common error is entering a break as a clock time rather than a number of minutes. Another is leaving an overnight shift's clock-out on the same day, which produces a backward span. Check that no break is longer than the shift it belongs to. Hours shown as hours and minutes are not decimals, so adding 8:30 and 7:45 as if they were decimal numbers gives the wrong total. The pay figure is a simple estimate, not a payroll calculation, so check your employer's rules for overtime, taxes, and deductions."
      }
    ],
    "faqs": [
      [
        "Why does my total show fewer hours than the clock times suggest?",
        "The most likely reason is unpaid break minutes, which are subtracted from each day before the totals are added. The tool's own example shows a 9:00 AM to 5:30 PM shift with a 30-minute unpaid lunch counting as 8 hours. Check that each break value matches the break you actually took."
      ],
      [
        "What format should the clock times use?",
        "Enter times in 24-hour format with a colon, such as 09:00 for 9 AM or 17:30 for 5:30 PM. Using 24-hour values avoids confusion between morning and afternoon shifts. The default fields show this pattern, so copying it is the simplest way to enter a time."
      ],
      [
        "Can I use this for a two-week pay period?",
        "The tool has seven day slots, so it covers one week at a time. For a two-week period, total each week separately and add the two decimal totals, rather than mixing hours and minutes. Then apply your employer's pay rule to the combined figure."
      ]
    ]
  },
  "currency-converter": {
    "answer": "This converter multiplies an amount by the exchange rate between two currencies, using daily reference rates published by the European Central Bank through the Frankfurter data service. Rates are quoted against a common base currency, so converting between two other currencies passes through that base. A comparison grid shows your amount in all major currencies at once.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a daily reference rate the right number?",
        "text": "Reference rates suit planning, budgeting, and quick comparisons, such as estimating the cost of an invoice in another currency or checking how a foreign price compares with home prices. They are official reference figures, not the rates a bank or card network charges you. Enter the amount, choose the source and target currencies, and read the converted value. Use the comparison grid to see the same amount across several currencies before deciding which one to focus on."
      },
      {
        "heading": "How do I read conversions between two non-base currencies?",
        "text": "Because every rate is quoted against one base currency, a conversion between two other currencies is effectively two steps: into the base, then out to the target. Mathematically, the result matches going through the base directly. Rounding can make a conversion and its return trip differ by a small amount, so use back-and-forth conversions to check the display rather than to measure precision. Tapping a currency in the grid makes it the target, which speeds up comparing several options."
      },
      {
        "heading": "What limits should I keep in mind?",
        "text": "Reference rates are published once per business day, after the 4 PM CET fix, so they do not follow intraday market moves. A rate shown today reflects the last published fix, not a live quote from a moment ago. Some currencies are missing because the source does not publish a rate for them. Banks and card networks typically add margins and fees that this tool does not show, so treat the converted amount as an educational estimate of value, not financial advice or a price you can pay."
      }
    ],
    "faqs": [
      [
        "Why does the rate stay the same over a weekend?",
        "Reference rates are published on business days, so the tool shows the most recent published value on days without a publication. Currency markets trade at other times, so a figure here may differ from a quote you see on a weekend. Check the date shown with the rate before relying on it."
      ],
      [
        "Can I convert into a currency that is not on the list?",
        "No. The tool can only use currencies that the data source publishes. For a missing currency, look for an official rate from your central bank or a bank statement, then convert by hand using the same method the tool uses."
      ],
      [
        "How can I convert by hand to check the tool?",
        "Divide your amount by the source rate, then multiply by the target rate, with both rates quoted against the same base currency. The product is the converted amount. Running this calculation once on paper is a quick way to confirm the tool's result."
      ]
    ]
  },
  "css-gradient-generator": {
    "answer": "This generator builds a CSS linear-gradient() background value from two colors and an angle. The angle sets the direction the color transition travels, and the tool writes the full value into a single line of CSS. You see the result on a live preview as you adjust the colors, then copy the code into a background property.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a linear gradient a good background choice?",
        "text": "A linear gradient suits hero sections, buttons, cards, and dividers, where a smooth color shift adds depth without an image file. Because the browser generates the background, it scales to any element size and needs no extra download. Choose colors with enough contrast against any text placed on top, and test the gradient at the sizes your layout actually uses. Start with two related hues, then adjust the angle until the transition follows the shape of the element."
      },
      {
        "heading": "How does the angle change the result?",
        "text": "The angle controls the direction in which the first color transitions into the second. A value of 90 degrees runs left to right, while 180 degrees runs top to bottom. CSS uses 180 degrees when no angle is given, so the top-to-bottom direction is the default. Small angle changes can shift where the highlight falls across text or an image. Because the preview updates as you drag, judge the angle by how it reads on the element rather than by the slider position alone."
      },
      {
        "heading": "What should I check before using the CSS on a live site?",
        "text": "The output is a standard linear-gradient() value, but older browsers may handle it differently, so test in the browsers your audience uses. Check that the gradient still reads well in dark mode and on small screens. If text sits on the gradient, verify the contrast with a checker rather than trusting your eye. Set a solid background-color before the gradient, so browsers that cannot render the gradient still show a readable background."
      }
    ],
    "faqs": [
      [
        "Which property should I put the gradient in?",
        "Use the value with the background or background-image property. The background shorthand accepts the gradient together with a fallback color. If you stack several backgrounds, the first listed layer appears on top, so place the gradient in the layer order that matches your design."
      ],
      [
        "Why does the gradient look banded on some screens?",
        "A gradient across a small range of colors can show visible steps, especially over large areas and low-contrast palettes. Choosing colors that differ more from each other usually reduces the effect. Compare the result on a few displays before you decide the banding is a problem."
      ],
      [
        "Can I apply a gradient to text?",
        "Yes, by setting background-clip to text and making the text color transparent. The technique still needs testing across browsers. Keep the contrast in mind, because the colors appear only through the letters, and a faint gradient can make thin text hard to read."
      ]
    ]
  },
  "box-shadow-generator": {
    "answer": "This generator builds a CSS box-shadow value from offset, blur, spread, color, opacity, and an inset toggle. The color and opacity combine into an rgba() value, and each slider updates the preview as you move it. The result is a single box-shadow declaration that you can copy straight into a stylesheet.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I add a box shadow to an element?",
        "text": "Shadows help a card, modal, or button read as sitting above the page, and a shadow that lifts on hover can signal that an element is interactive. Keep the shadow subtle for ordinary content, because heavy shadows can crowd nearby elements. Choose the offset direction to match the light source your layout implies. Avoid relying on a shadow as the only indicator of state, since some users and some displays will not make it out clearly."
      },
      {
        "heading": "How do offset, blur, and spread change the edge?",
        "text": "Horizontal and vertical offsets move the shadow sideways and downward, so positive values push it right and down. Blur softens the edge: a larger value spreads the shadow over a wider area and fades it more gradually. Spread expands or contracts the shape before blur is applied, so a positive spread makes the shadow larger than the element outline. Adjust one slider at a time and watch the preview to see which edge each one changes."
      },
      {
        "heading": "What mistakes make a box shadow look wrong?",
        "text": "A common problem is a shadow that is too dark for its background, which reads as a dirty edge rather than depth. Lower the opacity before changing the color. Another is applying an inset shadow where a regular shadow was intended, which pushes the effect inside the box and can obscure content. Also check the shadow on the background it will actually sit on, because a shadow that works on white can disappear on a dark theme. Compare against the real page rather than the preview alone."
      }
    ],
    "faqs": [
      [
        "Why is my shadow cut off at the edge of a container?",
        "A parent element with overflow set to hidden clips anything outside its box, including a shadow. Remove the clipping or add padding to the container so the shadow has room to render. When a shadow stops abruptly, check the parent's overflow property first."
      ],
      [
        "Should I use rgba or a named color for the shadow?",
        "The tool expresses color with opacity as rgba(), which keeps transparency adjustable without changing the hue. A named or hex color also works, but it is fully opaque unless you add an alpha value. A translucent dark tone is a common choice for shadows because it blends with whatever sits underneath."
      ],
      [
        "Does a box shadow change the layout of nearby elements?",
        "No. A box shadow is painted without changing the element's box size or its position in the flow, so surrounding content stays where it is. The shadow can still overlap neighboring elements visually, so leave enough space between them when the blur is large."
      ]
    ]
  },
  "color-palette-generator": {
    "answer": "This tool builds a color palette from a single base color. It converts the base to HSL, then either changes lightness to create shades and tints, or rotates the hue to create complementary, analogous, and triadic schemes. Each result converts back to hex, so you can copy any swatch straight into your code or design file.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a generated palette more useful than picking colors by eye?",
        "text": "A generated palette gives you related colors that share a logic, so a button, its hover state, and a background tint sit together without clashing. Picking by eye tends to drift, with each new swatch slightly off from the last. Start with the base color you must keep, generate a scheme, and then use the shades for backgrounds and borders while the strongest hue handles calls to action. Check that the set still feels coherent once it sits on the actual page."
      },
      {
        "heading": "How do the schemes differ in practice?",
        "text": "Shades and tints move only in lightness, so they form a single-hue ramp that suits layered interface surfaces. Complementary colors sit opposite each other on the color wheel, which produces strong contrast when they are used together. Analogous colors sit next to each other and feel calm and unified. Triadic colors are spaced evenly around the wheel, giving more variety while staying balanced. Choose the scheme by the mood you want, then limit the palette to a few roles so the extra hues do not compete."
      },
      {
        "heading": "What limits should I remember when applying a palette?",
        "text": "A palette is a starting point, not a finished design system. Harmony in HSL does not guarantee that text on a background meets contrast requirements, so check contrast with a dedicated tool. HSL lightness can also look uneven to the eye, because perceived brightness differs from one hue to another. A shade that looks right in yellow may look too strong or too weak in blue. Test the chosen colors in both light and dark themes before you commit to them."
      }
    ],
    "faqs": [
      [
        "Why does the palette base look slightly different from my original color?",
        "The base goes through an HSL conversion and back to hex, so rounding can shift the value by a small amount. The swatch is a close match rather than a guaranteed identical copy. If an exact brand value matters, keep the original hex in your style guide and use the palette for supporting colors."
      ],
      [
        "How many colors should a palette include?",
        "Start with a few roles, such as a base, a light tint, a dark shade, and an accent, rather than every generated swatch. Fewer colors keep the interface easier to maintain and make the relationships between them easier to see. Add more only when a specific state or component needs its own value."
      ],
      [
        "Can I pair a palette with a neutral background?",
        "Yes. Neutral backgrounds usually work well with one accent hue taken from the palette, and the shades can supply subtle borders and surfaces. Choose a background tint with very low saturation so the accent stands out. Check the text contrast on that background before you finalize the choice."
      ]
    ]
  },
  "ip-subnet-calculator": {
    "answer": "An IP subnet calculator takes an IPv4 address and a CIDR prefix, such as /24, and works out the network that address belongs to. The prefix sets how many leading bits are the network portion. A bitwise AND of the address and mask gives the network address, and setting all host bits to one gives the broadcast address. Usable hosts sit between those two addresses.",
    "exampleInputs": {
      "ip": "172.16.10.0",
      "cidr": "26"
    },
    "sections": [
      {
        "heading": "When should I use a subnet calculator?",
        "text": "Network engineers use a subnet calculator when they plan address space for a new VLAN, split a block into smaller segments, or check whether two hosts share a network. Start with the prefix from a router or cloud console, such as a /24, and the calculator shows where that block begins and ends. That range tells you which addresses you can assign to devices and which should stay reserved. It also helps when you write firewall or routing rules that need a network address instead of a single host."
      },
      {
        "heading": "How do I read the results?",
        "text": "Read the network address first, since it identifies the block as a whole. The broadcast address is the highest address in the block and is not assigned to a host. The usable range runs from the address just above the network address to the one just below broadcast. The subnet mask expresses the same prefix in dotted-decimal form. Compare it with the prefix you typed so you know both describe the same block."
      },
      {
        "heading": "What mistakes do people make with subnets?",
        "text": "A common mistake is entering a host address, such as 192.168.1.37 with a /24, and assuming the result describes that host. The calculator returns the block that contains the address, which may not match your plan. Another error is confusing prefix length with host count, since a larger prefix number means a smaller block. Always compare the calculated range with your addressing document before you configure devices or routes. Doing this check takes seconds and prevents misconfigured gateways."
      }
    ],
    "faqs": [
      [
        "Can I use this for IPv6 addresses?",
        "This calculator is built for IPv4, so it accepts dotted-decimal addresses and prefixes from /0 to /32. IPv6 uses 128-bit addresses and its own addressing conventions, so its prefix sizes and host counts do not map onto these fields. Enter an IPv4 address to see its network, broadcast, and host range."
      ],
      [
        "What does a /32 prefix mean?",
        "A /32 prefix fixes all 32 bits as network bits, leaving no host bits in the block. The network address is then the only address in the block. Engineers use /32 for host routes and loopback addresses. Enter 32 in the CIDR field to see how the calculator presents the smallest possible block."
      ],
      [
        "Can two subnets overlap?",
        "Two CIDR blocks overlap when one contains the other, because a shorter prefix block includes every address in any smaller block inside its range. A /16 contains every /24 that falls within it. Compare the network and broadcast addresses of both blocks to see whether their ranges intersect before you assign them to separate sites or cloud networks."
      ]
    ]
  },
  "html-to-markdown": {
    "answer": "An HTML to Markdown converter reads HTML markup and rewrites each element as its Markdown equivalent. An h1 becomes a leading hash sign, strong text becomes double asterisks, and a link becomes bracketed text followed by its URL in parentheses. Leftover tags are removed and HTML entities are decoded into plain characters. The conversion runs locally in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is HTML to Markdown conversion useful?",
        "text": "Documentation writers often have content in a content management system or on a web page, and need the same text in a repository README, a wiki, or a static site generator that reads Markdown. Copying rendered HTML into those tools tends to bring layout noise along with the words. Converting the markup first keeps headings, lists, and links intact so the source stays readable as plain text. It also helps when you want to review content changes in version control, since Markdown diffs show up line by line."
      },
      {
        "heading": "How should I review the converted output?",
        "text": "Start with the headings, and confirm that each level matches the outline of the original page. Next, check links and image addresses, especially if the source used relative paths that will break when the Markdown moves to a new location. Look at code sections as well, since inline code and fenced blocks are easy to mangle when they are copied from a rendered page. Finally, search the result for leftover angle brackets or entity names, which point to markup the converter did not map."
      },
      {
        "heading": "What does the converter not handle?",
        "text": "Markdown describes document structure, not page layout, so grid systems, floating panels, and visual styling have no direct equivalent. Interactive widgets and custom components cannot make the trip either. Because scripts and styles are stripped, any behavior or appearance they supplied will not appear in the output. Treat the result as a clean draft for a document rather than a copy of the page as it looks in a browser."
      }
    ],
    "faqs": [
      [
        "Does the converter keep my HTML private?",
        "Yes. The conversion runs in your browser, so the HTML you paste is processed on your device and is not sent to a server by this tool. Clearing the input box removes it from the page. Browser extensions or clipboard managers on your device may still keep copies, depending on their settings."
      ],
      [
        "What happens to images during conversion?",
        "Image tags are converted to Markdown image syntax, which points to the file by its address rather than embedding the picture. The output keeps the address from the source. If your Markdown file will live somewhere else, make sure the address is absolute or that the image is copied along with the document so it still loads."
      ],
      [
        "Can I turn Markdown back into HTML here?",
        "This converter only runs in one direction, from HTML to Markdown. To see how Markdown will render, paste the output into the Markdown previewer on this site, which shows a live HTML view as you type. That lets you confirm headings, lists, and links before the file goes anywhere else."
      ]
    ]
  },
  "markdown-previewer": {
    "answer": "A Markdown previewer is an editor that shows your plain-text Markdown next to its rendered HTML output. Syntax such as a pound sign for headings, asterisks for emphasis, and brackets for links is converted as you type. Input is escaped before parsing, so pasted HTML is displayed as text rather than run. The rendering happens in your browser on each change.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When does a live Markdown preview help?",
        "text": "A live preview helps when you are writing README files, technical notes, or blog drafts that will later be rendered by a code host, a static site generator, or a wiki. Seeing the output as you type catches problems early, such as a list that did not start, a link with a missing bracket, or a code fence that never closed. It also shows how nested blockquotes and lists are grouped, which is hard to judge from the raw text alone. Use it while drafting, then check the final file on the platform where it will be published."
      },
      {
        "heading": "How do I read the preview output?",
        "text": "Compare the rendered panel with what you intended for each block. Headings should appear at the level you chose. A single line break often merges into the paragraph above unless you leave a blank line. Emphasis markers that show up as literal asterisks mean the closing marker is missing or the spacing around it is off. Links that display as raw brackets usually have a space between the bracket and the parenthesis."
      },
      {
        "heading": "What are the limits of a browser preview?",
        "text": "This preview follows the parser built into the page, which handles the common elements listed above. Hosting platforms such as code repositories or static site generators may support extra syntax like tables, task lists, or footnotes, and they can render some constructs differently. Treat the preview as a check on structure and wording. Then test the finished file in the place where readers will actually see it. Problems you find in the preview are usually worth fixing before you publish."
      }
    ],
    "faqs": [
      [
        "Does my text get sent anywhere while I type?",
        "No. The parser and renderer run in your browser, so the text you type stays on your device and is not sent to a server by this tool. Each change re-renders the preview panel locally. Browser extensions or history features on your device may still record what you typed, depending on their settings."
      ],
      [
        "Why do my line breaks disappear in the preview?",
        "In standard Markdown, a single line break inside a paragraph is treated as a space, so the lines join together. Insert a blank line to start a new paragraph, or end a line with two spaces or a backslash for a hard break. Parsers differ in small ways, so check the preview before you publish."
      ],
      [
        "How should I document code in a Markdown file?",
        "Wrap code in fenced blocks, with three backticks on their own lines before and after. Add the language name after the opening fence, such as json or bash, so later renderers can apply syntax coloring. The preview shows the block as monospaced text, which helps you confirm the fence closed and nothing spilled into the paragraphs around it."
      ]
    ]
  },
  "password-strength-checker": {
    "answer": "A password strength checker estimates how many guesses an attacker might need by measuring the character pool and the length. Entropy in bits grows with both, and the tool turns that figure into a rough crack time based on a fast offline guessing rate of about 10 billion guesses per second. It also flags patterns that shrink the real search space, such as repeats, keyboard sequences, and common words.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I test a password here?",
        "text": "Test a password before you use it for an account that controls money, email, or work access, especially when a site's rules pushed you toward a particular pattern. The checker also helps when you compare two candidate passphrases side by side and want to see which one scores better. Teams can use it to show colleagues how common habits change the result. Because the password is evaluated on your device, you can run these checks without sending a real credential anywhere."
      },
      {
        "heading": "How do I interpret entropy and crack time?",
        "text": "Entropy is measured in bits, and each extra bit doubles the number of guesses needed in a brute-force search. Crack time depends on the assumed guessing speed, so it describes one attack model rather than every possible attacker. A long-looking password built from a predictable pattern can still score poorly, which is why the list of weaknesses matters as much as the headline figure. Use the entropy number to compare candidates, not as a fixed security grade."
      },
      {
        "heading": "What habits weaken passwords the most?",
        "text": "A common habit is adding a digit or symbol to the end of a dictionary word, because guessing tools try those variations early. Reusing one password across sites is another problem, since a single leak exposes every account that shares it. Keyboard walks such as qwerty or 1234 are also easy to guess. A password manager can generate and store unique values, which avoids most of these habits without requiring you to memorize them."
      }
    ],
    "faqs": [
      [
        "Should I use a passphrase instead of a password?",
        "A passphrase is several unrelated words joined together. It often yields more entropy than a short mixed-character password of similar length, and it is usually easier to remember. Test a few candidates here and compare their scores. Avoid words from a famous quote or a common phrase, since those patterns can be guessed."
      ],
      [
        "Why does the crack time seem so short for some passwords?",
        "The estimate assumes a fast offline attack making about 10 billion guesses per second. Real-world attacks depend on how passwords were stored and what defenses the service uses, so the figure is a model, not a prediction. If a password scores low, lengthen it and remove any predictable pattern before comparing again."
      ],
      [
        "Is a high score enough if my password was exposed before?",
        "No. The checker measures structure, not whether a password has already appeared in a leak. A reused or previously exposed password should be replaced even if it scores well. Use a unique password for each account and turn on two-factor authentication where a site offers it."
      ]
    ]
  },
  "utm-link-builder": {
    "answer": "A UTM link builder adds tracking parameters to the end of a URL so analytics tools can record where a visit came from. It appends utm_source, utm_medium and utm_campaign as key-value pairs after a question mark, joining extra parameters with ampersands. Each value is URL-encoded, so spaces and special characters survive the trip through a browser. The result is a single link you can share.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I tag a link with UTM parameters?",
        "text": "Tag links whenever you want analytics to separate traffic from different sources, such as a newsletter, a paid social post, or a partner article. Untagged links often appear under direct or referral traffic, which hides where the visit began. Use one tagged link per placement so the report can compare them. Tagging is most useful for links you control, like emails, ads, and social profile bios, rather than links other people publish for you."
      },
      {
        "heading": "How should I name UTM values?",
        "text": "Choose a naming scheme and apply it to every link, because analytics platforms often treat spring_sale and Spring-Sale as two separate campaigns. Use lowercase values, one consistent separator, and short descriptive names. The source names where the link appears, such as newsletter or facebook, while the medium describes the channel, such as email or cpc. Write the scheme in a shared sheet so teammates build links the same way. Consistent names make later reports much easier to read."
      },
      {
        "heading": "What mistakes break UTM reporting?",
        "text": "The most common error is tagging an internal link, which can override the original source and start a new visit under the campaign name. Another is misspelling a parameter name, such as utm-source with a hyphen, which analytics will not recognize. Forgetting to tag a link in one channel leaves its traffic unexplained. Check each built URL by opening it once and confirming the parameters appear in the address bar before you publish."
      }
    ],
    "faqs": [
      [
        "Should I put UTM links on internal navigation?",
        "Usually not. Tagging internal links makes analytics treat a visit from your own site as a new campaign session, which distorts source reporting. Reserve tagged links for external placements where you want to measure outside traffic. If you need to track a click on a menu or button, use an event in your analytics tool instead."
      ],
      [
        "Can I add extra parameters like term and content?",
        "Yes. The optional term and content fields help you tell apart keywords in a paid search campaign, or two text links inside the same email. They append as utm_term and utm_content. Keep their values consistent with your other parameters so reports group correctly."
      ],
      [
        "Will the link still work if a value has spaces?",
        "Yes, because the builder URL-encodes each value before appending it, so a space becomes an encoded character that a browser can read. The visitor reaches the same destination page. Most analytics tools decode the value back into readable text, although it is still cleaner to avoid spaces altogether."
      ]
    ]
  },
  "image-cropper": {
    "answer": "An image cropper keeps only the part of a picture that falls inside a selection you position. This tool maps the on-screen selection back to the original pixel dimensions, then exports that region as a PNG. Preset aspect ratios such as 1:1, 4:3, 16:9 and 3:2 lock the proportion of width to height, while free mode lets you set any shape. The cropping runs locally in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is cropping better than resizing?",
        "text": "Resizing shrinks an entire picture, but cropping removes unwanted areas while keeping the original scale of what remains. Use a crop when a subject sits off-center, when a screenshot includes browser chrome, or when a photo needs to fit a specific frame. Cropping does not stretch or distort the image, so people and objects keep their true proportions. Crop first, then resize for the final destination if you need a particular file size."
      },
      {
        "heading": "Which aspect ratio should I choose?",
        "text": "Match the ratio to where the image will appear. A 1:1 square suits profile pictures and many social posts, 16:9 fits widescreen video thumbnails and banners, and 4:3 is common for older display formats and presentation slides. A 3:2 ratio matches the proportions of many camera sensors and standard print sizes. Choose free mode when the layout is flexible, then check the crop against the surrounding design before you commit."
      },
      {
        "heading": "What should I check after cropping?",
        "text": "Look at the edges of the selection first, since a small shift can cut off a hand, a headline, or the top of a head. Confirm the output is still large enough for the place it will be shown, because a tight crop from a small original looks soft when enlarged later. Keep the original file, since the exported PNG is a new file and you may want a different crop later."
      }
    ],
    "faqs": [
      [
        "Why does the cropper export PNG instead of JPG?",
        "This tool exports PNG, which is a lossless format, so the cropped pixels are saved without added compression artifacts. The file can be larger than a JPG of the same picture. If you need a smaller file for the web, convert the PNG afterward with an image converter and choose a quality setting that suits the picture."
      ],
      [
        "Does cropping change or delete my original file?",
        "No. The tool reads the picture you choose and writes a new PNG file for the selected region. Your original stays where it was on your device, so you can crop it again with a different selection."
      ],
      [
        "How large should the source image be?",
        "The export uses the original image's full resolution, so the cropped result can be no larger in pixels than the source region. A selection drawn on a small preview still maps back to the detailed original. Start with the highest-resolution copy you have, since cropping a small image cannot add detail."
      ]
    ]
  },
  "image-converter": {
    "answer": "An image converter decodes a picture and re-encodes it in another format, such as PNG, JPG or WebP. This tool draws the image onto a canvas and exports it in the format you choose. For lossy formats, a quality setting controls how much detail is discarded during compression. Converting to JPG flattens transparent areas onto a white background, because JPG has no transparency channel.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Which format should I convert to?",
        "text": "PNG suits graphics with sharp edges, text, or transparency, since it preserves every pixel. JPG is a lossy format suited to photographs, where smaller files matter more than perfect fine detail. WebP is a newer option that can produce smaller files at similar visual quality, though some older software does not open it. Pick the format the destination accepts first, then decide how much file size you can trade for detail."
      },
      {
        "heading": "How does the quality setting change the result?",
        "text": "For JPG and WebP, the quality control sets how aggressively the encoder discards detail. High settings keep fine texture and produce larger files, while low settings save space and can introduce visible blocks or smoothing in gradients. Each re-save compounds the loss, so convert from the original rather than from an already compressed copy. Compare the file size and a zoomed view before choosing a final value. Most people settle on a value by comparing the two versions side by side."
      },
      {
        "heading": "What is lost when converting between formats?",
        "text": "Converting to a lossy format discards data that cannot be recovered, so the converted file cannot return to its original quality. Transparency disappears in JPG, where the background becomes white. Re-encoding also usually drops embedded details such as camera information. Keep the source file if you may need another conversion later, and check the output before replacing anything. Each new format also means another round of testing with the destination platform."
      }
    ],
    "faqs": [
      [
        "Why does my WebP file not open in some apps?",
        "WebP is supported by modern browsers and many current editors, but some older image viewers, presentation tools and upload forms only accept PNG or JPG. If a destination rejects the file, export a PNG or JPG instead. Checking the platform's accepted formats before converting saves a round of rework."
      ],
      [
        "Will converting a PNG to JPG make it smaller?",
        "Usually yes for photographs, because JPG compression discards detail that the eye notices less. Simple graphics with flat colors may not shrink much and can look worse with lossy compression. The file size you get depends on the picture and the quality setting, so compare the output before deciding."
      ],
      [
        "Can I convert several images at once?",
        "Convert one image at a time with this tool, and repeat the same steps for each file. Use the same format and quality setting every time so the results stay consistent, and name each output after its source so you can match them later."
      ]
    ]
  },
  "favicon-generator": {
    "answer": "A favicon generator takes one source image and resamples it to the pixel sizes browsers and devices request, such as 16, 32, 48, 64, 192 and 512 pixels. It also creates an Apple touch icon for home-screen shortcuts on iOS. The results are packaged in a zip file with the HTML link tags to paste into your page head.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Which icon sizes do I actually need?",
        "text": "Browsers pick different sizes depending on the tab, bookmark, or device, so one complete set covers many cases. The small sizes such as 16 and 32 pixels appear in browser tabs and address bars. Larger icons like 192 and 512 pixels serve home screens and install prompts for web apps. Keeping the full set means the browser never has to scale a tiny icon up to fill a larger slot."
      },
      {
        "heading": "How do I add the generated files to my site?",
        "text": "Unzip the package into your site's root or a known assets folder, then paste the included link tags into the head of each page. The paths in those tags must match where you placed the files, or the icons will fail to load. Clear your browser cache after updating, since browsers hold on to old icons for a long time. Test by opening the page in a fresh tab and checking the tab icon."
      },
      {
        "heading": "What should I prepare in the source image?",
        "text": "Start with a square image that has a simple shape, since small sizes lose fine lines. A logo with a solid background and bold contrast usually reads better at 16 pixels than a detailed illustration does. If your source is rectangular, pad it to a square first so the icon is not cropped in an unexpected way. Use the largest clean version you have, because shrinking an image generally looks better than enlarging one."
      }
    ],
    "faqs": [
      [
        "Do I still need a favicon.ico file?",
        "Some browsers and tools request a favicon.ico file at the site root, even when the page declares other icons. The generated set is PNG-based. If you want an ICO file too, create one with a separate tool from the 32 pixel image and place it at the root."
      ],
      [
        "Should I add a web app manifest?",
        "A web app manifest is a separate file that lists icons for installable apps and sets display options. It is only needed if your site works as an installable web app, and it typically references the larger 192 and 512 pixel images. The tool's output covers the favicon and touch icon tags only."
      ],
      [
        "How do I make browsers show a new favicon?",
        "Browsers and devices cache icons aggressively, so an updated file can keep showing the old one for a while. Change the filename, such as favicon-v2.png, or add a version query string to the link tag. Then reload the page in a fresh tab to confirm the new icon appears."
      ]
    ]
  },
  "square-footage-calculator": {
    "answer": "Square footage is the area of a flat surface measured in square feet. For a rectangle or room, multiply length by width. A triangle uses base times height divided by two, and a circle uses pi times the radius squared. The calculator reports the result in square feet, square meters, square yards and acres, so you can compare listings or match the unit a supplier uses.",
    "exampleInputs": {
      "mode": "rect",
      "length": "18",
      "width": "12"
    },
    "sections": [
      {
        "heading": "When should I use a square footage calculator?",
        "text": "Use it when you are ordering flooring, carpet, or tile and need the total area of a room before adding allowance for waste. Paint calculations also start from wall or floor area, so a quick measurement saves a trip to the store. Real estate listings report living space in square feet, and a calculator helps you check whether a stated number matches the dimensions. Measure every room separately, then add the results together."
      },
      {
        "heading": "What about rooms that are not simple rectangles?",
        "text": "Split the floor plan into simple shapes, such as two rectangles for a stepped or notched space, and calculate each one. Add the results to get the total area. Triangles and circles cover alcoves, bay windows, or round table footprints where the outline has a clear geometric form. Sketch the layout on paper first, label each dimension, and check that the pieces neither overlap nor leave gaps. Label each piece so the totals are easy to add up."
      },
      {
        "heading": "What mistakes change the result most?",
        "text": "Mixing units is the most frequent error, such as entering a width in inches when the field expects feet. Measuring wall to wall without accounting for closets or built-in cabinets can overstate the usable floor. For a circle, the field asks for the radius, which is half the diameter, so entering the full diameter makes the area four times too large. Round only at the final step, after all the pieces are added together."
      }
    ],
    "faqs": [
      [
        "Does square footage include wall thickness?",
        "It depends on the convention you need. Many listings measure to the interior face of the walls, while construction plans may use outer dimensions. Check how the listing or supplier defines the figure, then measure to match. For flooring orders, interior dimensions are usually what matters."
      ],
      [
        "Should I add extra material when ordering?",
        "The calculated area gives the minimum you need, and most installers add an allowance for cuts, pattern matching, and mistakes. The amount depends on the material and the layout, so ask your supplier for their recommendation. Use the area from this calculator as the base figure before adding that allowance."
      ],
      [
        "What is the difference between area and perimeter?",
        "Area measures the surface inside a shape and is shown in square units. Perimeter measures the distance around its outer edge in linear units such as feet. Flooring and paint depend on area, while baseboards and trim depend on perimeter. Mixing up the two can lead to ordering the wrong quantity."
      ]
    ]
  },
  "capital-gains-tax-calculator": {
    "answer": "A capital gains tax calculator estimates the tax owed on the profit from selling an asset. Gain is the sale price minus your adjusted basis, which equals the purchase price plus capital improvements. Holdings kept at least 12 months use long-term federal rates of 0, 15 or 20 percent based on income, while shorter holds use ordinary income rates. This output is an educational estimate, not professional tax advice.",
    "exampleInputs": {
      "buy": "250000",
      "sell": "400000",
      "improvements": "20000",
      "held": "24"
    },
    "sections": [
      {
        "heading": "When is this estimate useful?",
        "text": "Sellers use an estimate like this to plan before closing, when they want a rough sense of how much of a sale may be taxable. It is also useful for comparing outcomes, such as selling now versus holding past the twelve-month mark. The result is a planning figure only, because individual circumstances change the answer. Confirm the final numbers with a qualified tax professional who can review your records. The figure can change once your records are reviewed."
      },
      {
        "heading": "How should I enter the holding period and income?",
        "text": "The holding period determines the rate category, so count from the day you acquired the asset to the day you sell it. Enter your annual taxable income as well, because the long-term federal rate depends on the income bracket you fall into. Short holding periods fall under ordinary income rates, which can be higher, so a difference of a few months may change the result substantially. Check the month count carefully before reading the output."
      },
      {
        "heading": "What does this formula leave out?",
        "text": "The model covers a single sale with a basis of purchase price plus improvements. Costs such as commissions or closing fees, which many sellers subtract from the gain, are not part of the stated formula. Depreciation recapture, state taxes, and other federal items are outside this estimate as well. Read the output as a starting point, and add those items with professional guidance. The estimate is simplified, so treat each omission as a question to ask."
      }
    ],
    "faqs": [
      [
        "Is this the same as a tax return calculation?",
        "No. This tool produces an educational estimate using the formula and federal rates described on the page. A tax return involves your full set of income, deductions, credits and filing status, which this simplified model does not capture. Use the estimate to ask better questions, then verify the figures with a tax professional."
      ],
      [
        "What does a 12 month holding period mean?",
        "Under the rule described on this page, a holding period of 12 or more months is treated as long-term, which uses the preferential federal rates. Count from the purchase date to the sale date. Shorter holds fall under ordinary income rates, so the timing of a sale can matter a great deal."
      ],
      [
        "Can I use this for stocks as well as real estate?",
        "Yes, the formula is the same for investments: sale proceeds minus your cost basis. Enter the purchase cost as the basis, and confirm that figure against your brokerage statement before relying on the estimate."
      ]
    ]
  },
  "paint-calculator": {
    "answer": "This paint calculator estimates how many gallons of paint a room's walls need. It finds wall area as 2 times the sum of length and width, times the ceiling height, then subtracts 20 square feet per door and 15 per window. That area is divided by 350 square feet per gallon and multiplied by the number of coats.",
    "exampleInputs": {
      "length": "14",
      "width": "11",
      "height": "8",
      "coats": "2"
    },
    "sections": [
      {
        "heading": "When should I use a paint calculator before buying?",
        "text": "Run the numbers before you visit a store, so you buy a realistic number of gallons instead of estimating by eye. Measure the room's length, width, and ceiling height in feet. Then count the doors and windows on the walls you plan to paint, because each opening is subtracted from the total. Choose the number of coats you intend to apply. The result covers wall area only, so the ceiling and trim need their own measurement."
      },
      {
        "heading": "How do I read the gallon figure?",
        "text": "The gallon figure is the wall area after deductions, divided by the 350 square feet one gallon is expected to cover, then multiplied by the coat count. Two coats roughly double the base amount, which is why the coat setting moves the result so much. Treat the number as a planning figure, and compare it with the coverage printed on the can you choose. Many people round up to a whole can, and a little extra helps with touch-ups later."
      },
      {
        "heading": "What mistakes make the estimate too high or too low?",
        "text": "A common error is measuring floor dimensions and skipping the ceiling height, which leaves the wall area far too small. Another is miscounting doors, since each one is deducted as a fixed 20 square feet. The fixed deductions assume typical openings, so an oversized picture window or a sliding door may be deducted by too little or too much. The formula also treats walls as flat rectangles, so textured surfaces, built-in shelving, and alcoves are not captured."
      }
    ],
    "faqs": [
      [
        "Does the gallon estimate include the ceiling?",
        "No. The formula covers the four walls only, using 2 times the sum of length and width, times the ceiling height. To paint the ceiling, multiply its length and width, then work out coverage for that area separately with the same 350 square feet per gallon rule. Add the two results for the total."
      ],
      [
        "What should I do if my room is not a rectangle?",
        "Measure each wall run, add the wall areas together, and subtract doors and windows from the total. Then divide by 350 square feet per gallon and multiply by the number of coats. The calculator assumes one rectangle, so an L-shaped room has to be handled in pieces."
      ],
      [
        "Does the coat count change the result?",
        "Yes. The tool first finds gallons for one coat, then multiplies by the coat count. Going from one coat to two doubles the base amount, so a second coat can add a meaningful amount of paint to buy. Entering the real number of coats keeps the estimate in line with your plan."
      ]
    ]
  },
  "flooring-calculator": {
    "answer": "This flooring calculator finds the total square footage to order for a room. It multiplies length by width to get the floor area, then adds a waste percentage for cuts and damaged pieces. That total is divided by the coverage per box and rounded up to whole boxes. Set box coverage to 0 to skip the box count.",
    "exampleInputs": {
      "length": "18",
      "width": "13",
      "waste": "15",
      "sqftPerBox": "20"
    },
    "sections": [
      {
        "heading": "When should I add a waste allowance to flooring?",
        "text": "Waste covers pieces lost to cuts, edges, and defects, so the order is larger than the bare floor area. The how text suggests 10 percent for a straight installation and 15 percent when the pattern runs diagonally or in herringbone. Angled layouts produce more offcuts, which is why the higher figure applies there. Enter the percentage in the waste field, and the total square footage updates to match, so you can compare a straight and a diagonal layout before ordering."
      },
      {
        "heading": "How do I read the box count?",
        "text": "The box count is total square footage divided by the coverage printed for one box. Enter that coverage in square feet in the box field. If you leave it at 0, the tool skips the count and reports only the area. Round the box count up, since you cannot buy part of a box. Rounding up is the standard way to make sure the job does not stall partway through."
      },
      {
        "heading": "What causes flooring estimates to come up short?",
        "text": "Short orders usually come from measuring only the main room and forgetting an adjoining hallway, closet, or alcove. Measure at the widest points and sketch the space as rectangles first, since the calculator multiplies one length by one width. Another mistake is entering the size of a single piece instead of the coverage per box, which changes the count dramatically. Confirm the coverage figure on the product label before you enter it."
      }
    ],
    "faqs": [
      [
        "What if the room has an irregular shape?",
        "Split the floor into rectangles, record the square footage of each, and add the totals. Because waste is a percentage, applying it to each part or to the combined sum gives the same result. Enter the combined square footage in the way that fits your ordering, then confirm the box count."
      ],
      [
        "Where do I find the sq ft per box?",
        "Check the coverage listed on the product label or spec sheet, then enter that square footage in the box field. If the product is sold by the piece or by the square foot instead of boxes, set the box field to 0 so the tool reports area only."
      ],
      [
        "Can I use this for areas with cabinets or a kitchen island?",
        "The tool takes only a length and width, so it does not subtract fixed cabinets or islands. Measure the open floor as rectangles, subtract the footprints you will not floor, and enter the remaining areas separately. Add the results and apply the waste percentage to the total."
      ]
    ]
  },
  "gravel-calculator": {
    "answer": "This gravel calculator converts a project's dimensions into the volume of stone you need. It multiplies length by width by depth in feet, which is inches divided by 12, then divides by 27 cubic feet per cubic yard. Tons are estimated at 1.4 tons per cubic yard, a typical figure for pea gravel or crushed stone.",
    "exampleInputs": {
      "length": "30",
      "width": "12",
      "depth": "4"
    },
    "sections": [
      {
        "heading": "When should I order gravel by the cubic yard?",
        "text": "Cubic yards suit bulk orders, where a supplier delivers loose stone by volume or weight to your site. Use this tool to size an area such as a driveway, footpath, or drainage trench before you call. Enter the length and width of the area in feet, then the depth you plan to spread. Read the cubic yard total first, then check the approximate tonnage if the supplier sells by weight."
      },
      {
        "heading": "How should I use the depth input?",
        "text": "Depth is entered in inches, and the tool divides it by 12 to convert to feet before calculating volume. Volume scales directly with depth, so a change of one inch can shift the total noticeably on a large area. Compare two depths side by side to see how the order changes before you commit. The tonnage is a rough conversion from cubic yards, so treat it as a planning figure rather than a weight for a delivery ticket."
      },
      {
        "heading": "What errors can throw off a gravel order?",
        "text": "A common error is mixing units, such as entering depth in feet or length in inches. Measuring the outside edges of a border instead of the usable interior can inflate the order, while leaving out a slope or dip can understate it. The conversion from cubic feet to cubic yards is built in, so you do not need to apply it yourself. Confirm the stone type before ordering, because the 1.4 tons figure assumes pea gravel or crushed stone."
      }
    ],
    "faqs": [
      [
        "Why might the tonnage differ from my supplier's figure?",
        "The tool uses a fixed 1.4 tons per cubic yard, which is typical for pea gravel or crushed stone. Other stone types weigh differently, and moisture changes weight too. Ask your supplier for the density of the specific material, then multiply your cubic yards by that figure for a closer match."
      ],
      [
        "Does the calculator add extra for settling or compaction?",
        "No. It calculates the volume of a flat, even layer at the depth you enter. If the base is soft or uneven, the finished layer may need more material than the number shows, so many people round up. Enter the depth you actually plan to spread to keep the result realistic."
      ],
      [
        "How do I estimate a curved path?",
        "Break the path into straight sections, measure each section's length and width, and calculate each one. Add the cubic yards together to get the total. Using one average width across a curve can miss area, so shorter sections give a closer total."
      ]
    ]
  },
  "mulch-calculator": {
    "answer": "This mulch calculator estimates the volume of mulch for a garden bed or landscape area. It multiplies length by width by depth in feet, which is inches divided by 12, and divides by 27 to get cubic yards. For bagged mulch, one cubic yard equals about 13.5 bags of 2 cubic feet, so the tool converts the volume into a bag count as well.",
    "exampleInputs": {
      "length": "25",
      "width": "10",
      "depth": "2"
    },
    "sections": [
      {
        "heading": "When is bulk mulch better than bags?",
        "text": "Bulk mulch, measured in cubic yards, suits large beds or whole landscape areas where a delivery makes sense. Bagged mulch from a garden center is easier to handle for small beds, containers, or a quick top-up. Run the numbers for your area first, then compare the bag count with the cubic yard total. The tool shows both, so you can decide which format fits your project and how you plan to haul it."
      },
      {
        "heading": "How do I convert cubic yards into bags?",
        "text": "One cubic yard holds roughly 13.5 bags of 2 cubic foot mulch. If you buy bags of a different size, the count changes, so check the volume printed on the bag before you buy. The bag count is the cubic yard total multiplied by 13.5. Rounding up to a whole bag keeps you from running short partway through the job, and buying the full count at once avoids a second trip to the garden center."
      },
      {
        "heading": "What mistakes lead to the wrong mulch amount?",
        "text": "Entering the planting area instead of the bed's full footprint is a common slip, and so is measuring depth in feet rather than inches. A round bed does not fit a rectangle neatly, so measure its widest length and width and treat it as a rectangle, which slightly overestimates the volume. Also check whether you are covering one bed or several. The tool calculates one rectangle, so add separate beds together or run each depth separately."
      }
    ],
    "faqs": [
      [
        "How many bags do I need for a tiny garden bed?",
        "Work out the bed's volume, then convert cubic yards to bags by multiplying by 13.5 for 2 cubic foot bags. Small beds can produce fractions of a bag, so round up to the next whole bag. Buying one spare bag at the start is a simple way to avoid a short finish."
      ],
      [
        "Can I enter one depth for several beds of different sizes?",
        "Yes, as long as they all need the same depth. Calculate each bed separately and add the cubic yards together. Entering one combined rectangle would misrepresent beds with different shapes, so keep them as separate calculations."
      ],
      [
        "What if the beds need different depths?",
        "Run the tool once for each depth and add the totals. Depth is a single input here, so one calculation covers one depth. Keep a note of each result so the final order reflects every bed's requirement."
      ]
    ]
  },
  "grams-to-cups-converter": {
    "answer": "This converter changes a weight in grams into a volume in cups for a chosen ingredient. Each ingredient has its own approximate weight per cup, such as about 125 grams for flour and 200 grams for sugar. The tool divides the grams by that ingredient's grams-per-cup value, so the same weight gives different cup amounts for different foods.",
    "exampleInputs": {
      "grams": "250",
      "ingredient": "flour_bread"
    },
    "sections": [
      {
        "heading": "When should I convert grams to cups?",
        "text": "Convert when a recipe lists weight but your kitchen only has measuring cups, or when a cup-based recipe needs to be measured by scale instead. Enter the weight in grams and choose the ingredient closest to what you are using. The output is an approximate cup measure, so it suits estimating a batch rather than matching a formula to the gram. A scale remains the more exact option, and the cup figure serves as a fallback."
      },
      {
        "heading": "How does the ingredient choice change the result?",
        "text": "Each option carries its own density, so the cup figure shifts depending on what you pick. Bread flour and cake flour appear as separate entries because they are not interchangeable by weight. Brown sugar is listed as packed, which matters because packing compresses the volume. If your ingredient is not on the list, choose the closest match by texture and grain size, and treat the cup figure as a rough guide."
      },
      {
        "heading": "What are the limits of weight-to-volume conversion?",
        "text": "Volume depends on how an ingredient was scooped, sifted, or packed, so the same weight can fill a cup differently. Liquids such as milk and water are less affected by packing, while powders and grains vary more. Butter is often sold in sticks with printed markings, which can be easier to measure directly. Treat the converter as a starting point, and weigh ingredients whenever a recipe depends on tight ratios."
      }
    ],
    "faqs": [
      [
        "Can I convert cups back into grams?",
        "Yes. Multiply the number of cups by the grams-per-cup value the tool uses for that ingredient. Use the same ingredient in both directions so the density matches. Results are approximate for the same reasons as the forward conversion."
      ],
      [
        "Why does my result differ from a chart I found online?",
        "Charts list different densities based on brand, measuring method, or a different reference. Check which grams-per-cup value the chart uses, and compare it with the value this tool applies to the same ingredient. Using one consistent source across a recipe avoids mixed results."
      ],
      [
        "Does this work for liquids like milk or oil?",
        "Yes. Milk, water, olive oil, and vegetable oil are all included. Liquids pack less variably than powders, so their results tend to be more consistent. Measure in the same units the recipe uses, and check the ingredient entry before you calculate."
      ]
    ]
  },
  "recipe-scaling-calculator": {
    "answer": "This recipe scaling calculator finds the factor needed to change a recipe's serving count. The scale factor is the target servings divided by the original servings. Multiplying each ingredient amount by that factor gives the scaled quantity, so every item in the recipe changes by the same ratio.",
    "exampleInputs": {
      "original": "4",
      "target": "10",
      "amount": "1.5"
    },
    "sections": [
      {
        "heading": "When is scaling a recipe worth doing?",
        "text": "Scaling helps when a family meal needs to feed more people, when you cook for fewer, or when a batch needs to fill a specific pan. It is also useful for meal prep, where portions must match a container size. Enter the original servings the recipe lists, then the number you want to make. Check the output before you cook, because a scaled recipe depends on the original being written for that serving size."
      },
      {
        "heading": "How do I apply the factor to every ingredient?",
        "text": "Multiply each listed amount by the scale factor and keep the same unit. Work with the exact decimal first, then round to a measure you can use easily, such as a half cup or a teaspoon. The math is linear, so a factor of 1.5 turns one cup into one and a half cups. Write the scaled list down before you start, so no ingredient gets skipped while you are measuring. Round only at the final step to avoid compounding small errors."
      },
      {
        "heading": "What mistakes come from scaling by servings alone?",
        "text": "Serving counts are estimates, so a recipe for 4 that serves 8 may not behave identically when doubled. Some items, such as seasonings, leavening, or thickeners, can need adjustment rather than simple multiplication. Also check the cooking vessel, since a doubled batch may need a larger pan, and the calculator does not change that for you. Taste or check doneness as you go instead of trusting the math alone, because small corrections at the end are easier than fixing a full batch."
      }
    ],
    "faqs": [
      [
        "What if the recipe yields a count instead of servings?",
        "Use the yield in the unit the recipe lists, such as 12 cookies or 24 muffins. Enter the original count as the starting number and the desired count as the target. The factor works the same way because it compares two numbers in one unit."
      ],
      [
        "Can I scale a recipe down to a single serving?",
        "Yes. Enter a target below the original, and the factor becomes less than one, so every ingredient shrinks. Very small amounts can be hard to measure, so weighing ingredients or using a fine measuring set helps."
      ],
      [
        "Can I use this for ingredients listed as to taste?",
        "No, because an ingredient without a measured amount has no number to multiply. Scale the measured items with the calculator, then adjust the unmeasured ones by taste as you cook. Tasting at each stage is the most reliable way to handle them."
      ]
    ]
  },
  "cooking-unit-converter": {
    "answer": "This cooking unit converter changes an amount from one kitchen measure to another. Every unit is first converted to millilitres using exact US customary definitions, such as 4.92892 millilitres per teaspoon and 236.588 millilitres per cup. That value is then divided by the target unit's millilitre value to produce the answer.",
    "exampleInputs": {
      "amount": "2",
      "from": "cup"
    },
    "sections": [
      {
        "heading": "When do I need a cooking unit converter?",
        "text": "Use a converter when a recipe is written in a unit your tools do not show, such as converting cups to millilitres for a metric scale, or tablespoons to teaspoons for a small spoon set. It is also helpful with imported cookbooks, which often use metric or different volume standards. Choose the source unit in the From menu, enter the amount, and read the result in every common kitchen unit at once. Keep the source unit exactly as the recipe prints it."
      },
      {
        "heading": "How does the converter move between units?",
        "text": "Each unit has a fixed millilitre equivalent, so the tool converts the amount to millilitres and then into the target unit. This two-step path keeps the math consistent, because any pair of units produces the same answer whichever direction you go. The figures come from fixed definitions rather than estimates from a typical recipe. Confirm that you are working in US measures before converting, since other countries use different spoon and cup sizes."
      },
      {
        "heading": "What should I check before trusting a converted amount?",
        "text": "Confirm the From unit first, because choosing tablespoons instead of teaspoons changes the result by a large factor. Some results are long decimals, so round them to a measure you can actually read, such as a quarter teaspoon. Spoon sizes and cup standards vary across countries, so a recipe from abroad can differ from the US values. For small amounts, the rounding decision alone can change the outcome of a delicate recipe."
      }
    ],
    "faqs": [
      [
        "Why does a UK recipe give different results?",
        "The tool uses US customary definitions. Recipes from the United Kingdom or Australia may use imperial pints or other volume standards that differ from US measures. Check which system the recipe uses, then choose the matching unit in the From menu before you convert."
      ],
      [
        "Can I use this converter for dry ingredients by weight?",
        "No. The tool converts volume to volume, so one cup of flour and one cup of water are treated identically. Dry ingredients weigh different amounts per volume, so use the grams-to-cups converter when a recipe gives weight."
      ],
      [
        "Why do some results show many decimal places?",
        "The conversion uses exact factors, so a result can carry many decimals. Those digits do not promise precision for your ingredient. Round to a practical measure, such as a half teaspoon or a quarter cup, before you measure."
      ]
    ]
  },
  "calories-burned-calculator": {
    "answer": "This calories burned calculator estimates energy spent during exercise. It multiplies the activity's MET value by your body weight in kilograms and by the duration in hours. MET, short for metabolic equivalent, measures how intense an activity is compared with resting. The result is an educational estimate, not professional advice.",
    "exampleInputs": {
      "weight": "72",
      "minutes": "45",
      "activity": "cycling_moderate"
    },
    "sections": [
      {
        "heading": "When is this calorie estimate useful?",
        "text": "The calculator helps you compare activities on an even footing, such as a 30-minute brisk walk against a 30-minute run at the same body weight. It can also help you plan a weekly routine by testing how duration or activity choice changes the total. Treat the output as an educational estimate, not professional advice. If you have a health condition or are planning a medical or training change, speak with a qualified clinician or coach before relying on any figure."
      },
      {
        "heading": "How do MET values change the result?",
        "text": "A MET value expresses the energy cost of an activity relative to sitting still. Higher values mean more energy used per hour for the same body weight. The formula multiplies that value by weight in kilograms and by hours, so doubling the duration doubles the estimate, and a heavier body produces a larger figure. Activities with similar names can carry very different values, so the activity menu matters as much as the timing. If you use a wearable device, compare trends over weeks rather than single sessions."
      },
      {
        "heading": "What limits should I keep in mind?",
        "text": "Individual factors such as fitness level, efficiency, terrain, heat, and body composition are not modeled. Two people of the same weight can burn different amounts doing the same activity. Wearable devices and gym machines use their own methods, so their numbers will not match this tool exactly. Pick the activity option closest to the effort you actually put in, and avoid treating any single number as a target, since an estimate is a starting point for planning."
      }
    ],
    "faqs": [
      [
        "Why does a heavier person get a higher estimate?",
        "The formula multiplies the MET value by body weight in kilograms, so more mass means more energy for the same activity and time. This is an educational estimate for comparison, not professional advice about diet or training."
      ],
      [
        "Can I enter my weight in pounds?",
        "The field expects kilograms. To convert, divide your weight in pounds by about 2.2 and enter the result in the weight box. Results are estimates either way, so the conversion does not change how to read them."
      ],
      [
        "What should I pick for a mixed workout?",
        "Choose the activity that matches most of the session, or run the calculator separately for each segment and add the results. A session with warm-up walking followed by harder work can be split into two entries with their own durations. Keep the total as a rough guide, not a precise log."
      ]
    ]
  },
  "ohms-law-calculator": {
    "answer": "This Ohm's Law calculator solves for voltage, current, or resistance when you enter the other two values. It uses V = I x R, so voltage equals current times resistance, current equals voltage divided by resistance, and resistance equals voltage divided by current. It also reports power as P = V x I, measured in watts.",
    "exampleInputs": {
      "voltage": "12",
      "resistance": "6"
    },
    "sections": [
      {
        "heading": "When should I use Ohm's Law for a circuit?",
        "text": "Ohm's Law works well for quick checks on resistive parts, such as a heating element, a resistor in a test circuit, or a simple lamp load. Use it to estimate how much current a known resistance draws from a known supply, or to find the resistance needed for a target current. Enter the two values you already know and leave the third blank. The tool then shows the unknown and the power, which helps you judge whether a part is rated for the load."
      },
      {
        "heading": "How do I read the solved value and power?",
        "text": "The solved value appears in its matching unit, and power is calculated from the final voltage and current. Power matters because a resistor or load must be rated to handle its wattage. A high current at modest voltage and a low current at high voltage can produce the same power, so check both numbers. The default example in the how text shows the chain: solve for current first, then compute power from it."
      },
      {
        "heading": "Which unit errors cause the most trouble?",
        "text": "Unit prefixes are the biggest trap. Milliamps entered as amps overstate current by a factor of a thousand, and kilo-ohms entered as ohms understate resistance by the same factor. Check the unit next to each field before you calculate. Ohm's Law also describes a simple resistive relationship, so for diodes, capacitors, or switching supplies the result is only a starting point. Mains wiring should be handled by a qualified electrician."
      }
    ],
    "faqs": [
      [
        "What happens if I leave two fields blank?",
        "Ohm's Law needs two known values to solve for the third. If two fields are empty, the tool cannot determine a single answer. Enter exactly two values, leave one blank, and confirm the units before reading the result."
      ],
      [
        "Why does the calculator show power too?",
        "Power measures how fast electrical energy is used, and it is calculated as voltage times current once the unknown is solved. Comparing power against a part's rated wattage helps you check whether that part can handle the load over time."
      ],
      [
        "Does Ohm's Law hold for every component?",
        "It describes ohmic materials, where current is proportional to voltage at a fixed temperature. Diodes, transistors, and some lamps behave non-linearly, so their resistance changes with the operating point. Treat results for those parts as approximate and check the manufacturer's data sheet."
      ]
    ]
  },
  "newtons-second-law-calculator": {
    "answer": "This Newton's second law calculator solves F = ma for whichever value you leave blank. Force equals mass times acceleration, measured in newtons when mass is in kilograms and acceleration is in meters per second squared. Enter any two known values and the tool rearranges the formula to find the third. It also shows the equivalent weight at Earth gravity, 9.81 m/s².",
    "exampleInputs": {
      "mass": "1200",
      "acceleration": "2.5"
    },
    "sections": [
      {
        "heading": "When is F = ma the right model?",
        "text": "F = ma applies when you want the net force acting on an object, meaning all forces combined, and the mass is treated as constant. It fits carts rolling on a track, a car accelerating along a straight road, or a block sliding once you know the net pull. Use the calculator to size a force for a target acceleration, or to see what acceleration a known force produces. Sketch the forces first so you know which one is the net value."
      },
      {
        "heading": "How do I choose which field to leave blank?",
        "text": "Leave the unknown blank and enter the other two. To find force, enter mass and acceleration. To find acceleration, enter force and mass, since acceleration is force divided by mass. To find mass, enter force and acceleration, because mass is force divided by acceleration. Writing the formula with the unknown alone on one side makes that rearrangement clear. The fields use standard SI units, so each result comes out in newtons, kilograms, or meters per second squared."
      },
      {
        "heading": "What mistakes change the answer most?",
        "text": "Mixing mass units is a frequent error: entering grams where kilograms are expected produces a result off by a factor of a thousand. Confusing weight with mass is another, since weight is a force that depends on gravity while mass stays the same. Use the net force rather than a single push when several forces act on the object. Finally, check acceleration units, because a speed in kilometers per hour needs converting before it can be used."
      }
    ],
    "faqs": [
      [
        "Why must mass be in kilograms?",
        "In SI units, a force of one newton accelerates one kilogram at one meter per second squared. Using kilograms with meters per second squared produces newtons directly. Other unit combinations give a result in a different unit, so convert the inputs before calculating."
      ],
      [
        "How is the Earth-gravity weight figure calculated?",
        "Weight equals mass times the gravitational acceleration at Earth's surface, which the tool uses as 9.81 meters per second squared. Multiply the mass in kilograms by 9.81 to get the weight in newtons. The figure applies to Earth only, so it would change on the Moon or in orbit."
      ],
      [
        "What does a negative acceleration mean in the result?",
        "A negative value means the acceleration points opposite to the direction you chose as positive. Force follows the same sign convention, so a negative force acts in the opposite direction. Keep one direction as positive throughout the problem to avoid mixed signs."
      ]
    ]
  },
  "density-calculator": {
    "answer": "Density is mass divided by volume, written ρ = m/V. This calculator rearranges that formula so you enter any two values and solve for the third: mass in kilograms, volume in cubic meters, or density in kilograms per cubic meter. It also compares the result with water at 1,000 kg/m³, so you can see whether an object is likely to float or sink.",
    "exampleInputs": {
      "mass": "12",
      "volume": "0.004"
    },
    "sections": [
      {
        "heading": "When should I use a density calculator?",
        "text": "Density calculations come up whenever you know how heavy a material is and need its size, or the reverse. A lab student might weigh a metal block on a balance and need its volume to identify the material. A product designer working toward a target density can work out the mass a given volume should have, which helps estimate shipping weight. Because the formula is a simple division, the same relationship answers both directions. Leave the field you do not know blank, and the tool solves for it from the two you filled in."
      },
      {
        "heading": "How do I read the float or sink result?",
        "text": "The tool compares the density you get with the density of water, which is 1,000 kg/m³. A value below 1.0 means the object is less dense than water and should float, while a value above 1.0 means it should sink. Results very close to 1.0 are sensitive to small measurement errors, so a borderline case deserves a second measurement. Keep in mind that the number describes the material as a whole. A hollow metal container can float because its average density includes the air inside it."
      },
      {
        "heading": "What causes wrong density values?",
        "text": "Mixing units is the most frequent problem. Grams paired with cubic meters, or liters paired with kilograms, produce an answer that is far off. Convert every input to the units shown in the field labels before you start. Volume measured by displacement is another source of error, since trapped bubbles or an item that is not fully submerged will shift the reading. Density also depends on temperature and pressure, especially for gases, so a value measured under one condition does not transfer cleanly to another."
      }
    ],
    "faqs": [
      [
        "What is the difference between density and specific gravity?",
        "Specific gravity is a substance's density divided by the density of water, so it has no unit. The float or sink comparison here uses the same idea: a result below 1.0 means the material is less dense than water. Density itself is reported in kilograms per cubic meter, the unit this calculator uses."
      ],
      [
        "Does temperature change the answer?",
        "Yes. Most materials expand when warmed, so their volume grows and their density falls slightly. Water is a good example because its density changes with temperature, which is why the 1,000 kg/m³ reference used here is a standard value rather than a fixed property. For precise work, use a density measured at the temperature you care about."
      ],
      [
        "Why does my result look wrong even though the formula is simple?",
        "Simple formulas still depend on consistent inputs. Check that both values use the units shown in the field labels, confirm that the blank field is the one you want solved, and confirm that the measurement was taken under the same conditions as the material you are comparing it with."
      ]
    ]
  },
  "ph-calculator": {
    "answer": "Enter a pH value and the calculator returns the hydrogen ion concentration, computed as 10 to the power of negative pH. It then finds pOH as 14 minus pH, converts pOH into hydroxide concentration, and labels the sample acidic, neutral or alkaline. Because pH is logarithmic, each whole step changes the ion concentration by a factor of ten.",
    "exampleInputs": {
      "ph": "4.5"
    },
    "sections": [
      {
        "heading": "When is a pH calculator useful?",
        "text": "pH values sit on a compressed scale, so converting them into concentrations helps when you need to compare samples or follow a reaction. A chemistry student checking a titration endpoint might convert a measured pH into hydrogen ion concentration to compare two solutions directly. Someone preparing a solution for an experiment can read the hydroxide value to confirm that a base is as strong as expected. The calculator is also a quick way to check homework, because each conversion reduces to a single exponent you can verify by hand."
      },
      {
        "heading": "How do I interpret the acidic, neutral and alkaline labels?",
        "text": "The labels follow the pH value directly. Values below the neutral point are acidic, values above it are alkaline, and the neutral point describes pure water at 25°C. Temperature matters here: the neutral point shifts as temperature changes, so the neutral label only holds for that reference condition. The classification also describes the solution's hydrogen ion concentration at one moment. It says nothing about how strong, concentrated or hazardous a substance is in practice."
      },
      {
        "heading": "What errors come from reading pH on a logarithmic scale?",
        "text": "The usual error is treating pH as a linear scale. A solution at pH 4 does not have twice the hydrogen ion concentration of pH 8; the difference is far larger, because each unit represents a tenfold change. A second error is accepting a value that falls outside the usual range without checking the reading. Calibrate the meter before measuring. Finally, the formulas assume dilute, ideal behavior, so concentrated solutions or unusual solvents need more careful analysis than a single conversion."
      }
    ],
    "faqs": [
      [
        "Can pH be negative or above 14?",
        "Yes, in principle. Very concentrated strong acids can have a calculated pH below zero, and strong bases can exceed 14. The common scale runs roughly from zero to 14, and this calculator's pOH step assumes that total of 14. Results at the extremes are better read as approximate idealized values."
      ],
      [
        "Why is pH 7 labeled neutral?",
        "At 25°C, pure water produces equal amounts of hydrogen ions and hydroxide ions. Equal amounts make the solution neutral, and that balance point corresponds to a pH of 7 at that temperature. The calculator uses this reference point, so the neutral label is exact only at 25°C."
      ],
      [
        "How do I convert a hydrogen ion concentration back to pH?",
        "Take the base-ten logarithm of the hydrogen ion concentration in moles per liter and make the result negative. This page takes pH as its input, so use the same relationship by hand to check a reverse conversion before relying on it."
      ]
    ]
  },
  "z-score-calculator": {
    "answer": "A z-score measures how many standard deviations a value sits above or below the mean. The calculator subtracts the mean from your value and divides by the standard deviation: Z = (x − μ) / σ. It then reads the standard normal cumulative distribution to give the percentile rank and the probability of a value falling above or below yours in a normal distribution.",
    "exampleInputs": {
      "value": "85",
      "mean": "70",
      "std": "10"
    },
    "sections": [
      {
        "heading": "When should I use a z-score?",
        "text": "Use a z-score when you need to compare values measured on different scales. A raw test score means little until you know the class average and how far scores typically spread around it. The z-score places that result on a common scale, so a score from one exam can be compared with a score from another. Quality teams also use it to flag measurements that sit unusually far from the process mean. The method assumes the data are roughly normal, so check that assumption before relying on the percentile."
      },
      {
        "heading": "How do I interpret z-scores and percentiles?",
        "text": "A positive z-score means the value is above the mean, and a negative one means it is below. The percentile is the share of a normal distribution that falls at or below your value, so a z-score of zero sits at the middle, the 50th percentile. Keep the direction of the measure in mind. A high percentile on a metric where lower is better, such as response time, is a poor outcome even though the number looks large. The probability output gives a tail area, which is the right figure for a one-sided question."
      },
      {
        "heading": "What are the limits of a z-score?",
        "text": "A z-score is only as sound as the mean and standard deviation you supply. Those inputs should describe a population or sample that resembles the case you are judging. A mean from a small or unrepresentative group, or a spread taken from a different period, shifts every result. The percentile also assumes a symmetric bell shape. Skewed data such as incomes or waiting times can produce a z-score that looks ordinary while the real tail is much heavier than the normal curve predicts."
      }
    ],
    "faqs": [
      [
        "Should I use the population or sample standard deviation?",
        "Use the population standard deviation when your mean and spread describe the whole group you are judging. When they come from a sample and you are reasoning about a wider population, the sample standard deviation is the usual choice. The formula is identical either way. Only the input changes, so the percentile reflects whichever spread you enter."
      ],
      [
        "Why does my percentile differ from a printed table?",
        "Printed tables round z-scores to a fixed number of decimal places, so small differences can appear. Check which tail the table reports as well, since some tables give the area below the z-score and others give the area above it. Matching the tail usually resolves the gap."
      ],
      [
        "What if my data are not normally distributed?",
        "The z-score still measures distance from the mean in standard deviations, but the percentile and probability outputs assume a normal shape. With skewed data, a normal-curve percentile may understate or overstate how rare a value is. Plot your data first, and consider a rank-based percentile computed directly from the observations."
      ]
    ]
  },
  "confidence-interval-calculator": {
    "answer": "A confidence interval gives a range likely to contain the true population mean. This calculator divides the standard deviation by the square root of the sample size to get the standard error, then multiplies that by the z-critical value for your chosen confidence level. The result is the margin of error, and the interval runs from the sample mean minus that margin to the mean plus it.",
    "exampleInputs": {
      "mean": "72",
      "sd": "12",
      "n": "400",
      "confidence": "95"
    },
    "sections": [
      {
        "heading": "When should I build a confidence interval?",
        "text": "Build an interval when you have a sample average and want to show how precisely it estimates a population average. A survey might report a mean satisfaction score together with its interval, so readers can judge whether two groups truly differ or whether their ranges overlap. Analysts also use intervals to decide whether a difference is large enough to justify further testing. In practice, the width of the interval is the most useful output, because it indicates how much the estimate could move with a different sample."
      },
      {
        "heading": "How should I read the interval and margin of error?",
        "text": "The margin of error is the half-width of the interval, so the full range extends that distance on both sides of the mean. A higher confidence level produces a wider interval, because capturing the true mean in more of the repeated samples requires more room. A 95% interval does not mean there is a 95% probability that the true mean lies inside this particular range. It means the method yields intervals that contain the true mean in about that share of repeated samples. Report the level you used alongside the numbers."
      },
      {
        "heading": "What makes an interval misleading?",
        "text": "The formula assumes the sample is random and that observations are independent. A convenience sample or a biased survey yields an interval that looks precise but describes the wrong population. Another frequent error is mixing up standard deviation and standard error, which differ by the square root of the sample size. Small samples from skewed distributions can also make a normal-based interval too narrow, and a method based on the t-distribution may be more suitable in that case."
      }
    ],
    "faqs": [
      [
        "How does sample size change the margin of error?",
        "The standard error divides the standard deviation by the square root of the sample size, so a larger sample shrinks the margin of error. Because the square root is involved, halving the margin requires roughly four times as many observations. Doubling the sample alone does not halve the interval."
      ],
      [
        "Is a 90% interval less reliable than a 95% one?",
        "Not in the sense of being wrong. The 90% interval is narrower, but it captures the true mean in a smaller share of repeated samples, so it carries more risk of missing it. Choose the level based on how costly a miss would be, and state the level you chose."
      ],
      [
        "Can I use this for poll percentages?",
        "This calculator works from a mean and a standard deviation. A poll reported as a percentage uses a related standard error formula built on the proportion and the sample size instead. Check which formula your source used before comparing the two results side by side."
      ]
    ]
  },
  "sample-size-calculator": {
    "answer": "This calculator returns the number of survey respondents needed to reach a target margin of error at a chosen confidence level. It applies n = (z² × p × (1 − p)) ÷ margin², where z is the critical value for your confidence level, p is the expected proportion, and the margin is expressed as a decimal. Setting p to 50% gives the largest, most conservative sample size.",
    "exampleInputs": {
      "confidence": "95",
      "margin": "3",
      "proportion": "50"
    },
    "sections": [
      {
        "heading": "When should I size a survey this way?",
        "text": "Run the numbers before fielding a survey, when you still have room to change the plan. Suppose a market research team wants results accurate to within a few points on a yes-or-no question. The calculator shows how the required count rises as the margin tightens or the confidence level increases. It is also useful for comparing options, since you can see what a tighter margin costs in respondents before committing budget to a larger panel. Remember that the figure is the number of completed responses, so the invitation list must be larger."
      },
      {
        "heading": "How do I read the result and the proportion input?",
        "text": "The result is a required count, normally rounded up to the next whole respondent. The expected proportion matters because the product of p and one minus p peaks at 50%. If earlier data suggest the answer will be lopsided, a lower expected proportion gives a smaller sample, but that saving is only as good as the estimate behind it. When you have no reliable estimate, keep 50% so the sample holds up across possible outcomes. The margin applies to the overall result, so any subgroup you plan to report needs its own sizing."
      },
      {
        "heading": "What errors do people make when sizing a sample?",
        "text": "A common error is treating one margin of error as if it applied to every question on the survey. Each question with a different expected proportion has its own margin. Another error is ignoring response rates, which leaves the survey with fewer usable answers than planned. The formula also assumes random sampling. A self-selected online panel does not meet that assumption, and a larger sample cannot correct selection bias. Population size only changes the result for small populations, which the basic formula does not account for."
      }
    ],
    "faqs": [
      [
        "What confidence level should I pick?",
        "The 95% level is a common default across many fields, and the 90% and 99% options show how the required count changes at each level. A higher confidence level demands more respondents for the same margin. Choose the level that suits the stakes of the decision, and report it with your results."
      ],
      [
        "Does a smaller margin of error always mean a better survey?",
        "A smaller margin of error reduces sampling variation, but it does not fix bias. A tight margin drawn from the wrong people still produces a precise but misleading answer. Balance the precision you need against cost, and invest in sampling quality as well as sample size."
      ],
      [
        "What if I want to compare two groups?",
        "This calculator sizes a single proportion for one overall estimate. Comparing groups needs each group to be large enough on its own, and the difference between two groups is usually less precise than an overall figure. Run a separate sizing for each subgroup you plan to report, using the expected proportion for that group."
      ]
    ]
  },
  "cac-calculator": {
    "answer": "Customer acquisition cost, or CAC, is total sales and marketing spend divided by the number of new customers acquired in the same period. This calculator also divides customer lifetime value by CAC to produce the LTV:CAC ratio. A ratio of 3:1 or higher is generally considered healthy, but the figure is only as complete as the spend and lifetime value you enter.",
    "exampleInputs": {
      "spend": "120000",
      "customers": "300",
      "ltv": "1500"
    },
    "sections": [
      {
        "heading": "When should I calculate CAC?",
        "text": "Calculate CAC when you want to know what it costs to win a new customer through sales and marketing effort. A subscription business might track it monthly to see whether a new campaign brings in customers more cheaply than the last one. Founders often compare CAC with lifetime value before deciding how much to spend on growth. The calculation uses one period's totals, so spend and new customer counts should cover the same window. Otherwise, a lag between spending and sign-ups will distort the figure."
      },
      {
        "heading": "How do I read the LTV:CAC ratio?",
        "text": "The ratio compares what a customer is worth over time with what it cost to acquire them. This tool treats a ratio of 3:1 or higher as generally healthy. A ratio well below that suggests each customer returns too little to justify the spend. A very high ratio can point the other way, indicating that the business may be underinvesting in growth. Read the ratio together with payback time and its trend over several periods rather than as a single verdict."
      },
      {
        "heading": "What distorts a CAC figure?",
        "text": "The largest distortion comes from an incomplete cost base. If sales salaries, software or agency fees are left out of spend, CAC looks lower than it really is. Loose customer counting causes trouble too. Free accounts, trials or returning buyers may not match the definition used for paid acquisition. Keep the definitions consistent across periods. This output is an educational estimate, not professional financial advice, so check the inputs with your finance team before using the figure in a budget or investor update."
      }
    ],
    "faqs": [
      [
        "Should free trials count as new customers?",
        "That depends on how your business defines a customer. If a free trial does not produce a paying account, counting it as a new customer artificially lowers CAC. Use the same definition you apply to revenue, and state it so the figure stays comparable over time."
      ],
      [
        "Is CAC the same for every channel?",
        "No. Paid search, referrals and outbound sales usually carry different costs and conversion patterns. A blended CAC hides those differences. Split spend and customer counts by channel where your data allows, so you can see which source is earning its budget."
      ],
      [
        "How often should I recalculate CAC?",
        "Recalculate on a schedule that matches your sales cycle, such as monthly or quarterly. Short cycles show trends sooner, while long sales cycles need a wider window so that spend and customers line up. Compare each period using the same definitions to keep the trend meaningful."
      ]
    ]
  },
  "customer-lifetime-value-calculator": {
    "answer": "Customer lifetime value, or LTV, estimates the total revenue a typical customer produces over their relationship with your business. The calculator multiplies average purchase value by purchases per year and by customer lifespan in years. Applying your gross margin converts that revenue into profit-based LTV, which is more useful for comparing against acquisition costs.",
    "exampleInputs": {
      "avgPurchase": "65",
      "frequency": "6",
      "lifespan": "2.5",
      "margin": "55"
    },
    "sections": [
      {
        "heading": "When should I use customer lifetime value?",
        "text": "Use LTV to judge how much a customer relationship is worth to the business. It guides retention spending, because keeping a customer for longer raises lifetime value directly. It also sets a ceiling for acquisition: paying more to win a customer than their lifetime profit can return is hard to justify. Subscription businesses, repeat-purchase shops and service firms with renewals all benefit, since each one models a relationship that continues beyond the first sale."
      },
      {
        "heading": "How do revenue LTV and margin LTV differ?",
        "text": "Revenue LTV shows the top-line money a customer brings in. It can look impressive, but it overstates what the company keeps. Profit-based LTV applies gross margin, which removes the cost of the goods or services sold. The calculator reports the margin-adjusted figure because it is more meaningful for unit economics. Compare the two numbers to see how much of each sale is retained before marketing, support and overhead costs are subtracted."
      },
      {
        "heading": "What limits does this LTV estimate have?",
        "text": "The result depends on averages. A business with a few very large buyers and many small ones will produce an average that describes few real customers. Lifespan is usually the most uncertain input, especially for newer businesses that have not watched customers for long. The estimate also assumes purchase habits stay constant over time. Treat the output as an educational estimate, not professional financial advice, and update the inputs as cohort data accumulates."
      }
    ],
    "faqs": [
      [
        "Should I discount future purchases?",
        "A simple LTV like this one adds future purchases at face value, which can overstate value because money received later is worth less today. Discounting converts each future period into present value using a rate you choose. This calculator applies no discount, so use a discounted model when the decision depends heavily on distant revenue."
      ],
      [
        "Does lifetime value include upsells?",
        "Only if you build them into the inputs. Average purchase value and frequency should reflect the total spend a customer makes, including add-ons and renewals. If upsells are tracked separately, fold their contribution into average purchase value so the spend per customer is complete."
      ],
      [
        "Can I use this for a single product line?",
        "Yes, as long as all the inputs describe customers buying that line. Average purchase value, frequency and lifespan should come from the same group of customers. Mixing product lines with very different margins makes the blended result hard to act on, so run separate calculations when margins differ widely."
      ]
    ]
  },
  "roas-calculator": {
    "answer": "Return on ad spend, or ROAS, is the revenue generated by advertising divided by the amount spent on that advertising. This calculator also reports net profit after ad spend and cost of goods sold, plus break-even ROAS, the level at which revenue covers both ad spend and product cost. A campaign whose ROAS clears the break-even figure is profitable on the inputs you entered.",
    "exampleInputs": {
      "revenue": "36000",
      "spend": "8000",
      "cogs": "9000"
    },
    "sections": [
      {
        "heading": "When should I measure ROAS?",
        "text": "ROAS is most useful when comparing campaigns, ad sets or channels that share a similar margin. Marketers use it to decide where to move budget and which creative is earning its place. Because the metric links spending directly to revenue, it offers a fast read on whether a campaign is pulling its weight. Measure over a window long enough for conversions to arrive, since purchases made days after a click can otherwise go uncounted."
      },
      {
        "heading": "How do I interpret ROAS against break-even ROAS?",
        "text": "A raw ROAS figure shows revenue per unit of advertising, but it says nothing about profit. Compare it with break-even ROAS, which accounts for product cost. A campaign can clear its ad spend and still lose money once cost of goods is included. Net profit gives the dollar answer, while ROAS gives efficiency. Use both, because a campaign with a strong ratio may still produce little net profit if its volume is small."
      },
      {
        "heading": "What distorts ROAS?",
        "text": "Attribution is the biggest source of error. Ad platforms often credit themselves for sales that other channels helped create, so ROAS can look higher than the business actually earns. Using gross revenue instead of net revenue, or leaving out shipping, returns and fees, also inflates the figure. ROAS is also a snapshot. A campaign with a high ratio may simply be reaching people who would have bought anyway. This output is an educational estimate, not professional financial advice."
      }
    ],
    "faqs": [
      [
        "Should I use gross revenue or revenue after refunds?",
        "Use revenue after refunds and cancellations whenever you can. Gross revenue counts money you will hand back, which makes the ratio look better than the campaign deserves. Apply the same rule to every campaign so comparisons stay fair over time."
      ],
      [
        "Why does my ROAS differ between ad platforms and my analytics?",
        "Each platform uses its own attribution window and counting rules, and several platforms may claim the same conversion. Your analytics tool may credit it differently again. Pick one source for revenue, document the window you used, and compare platforms only with that caveat in mind."
      ],
      [
        "How long should a campaign run before I judge its ROAS?",
        "Wait until enough purchases have arrived for the figure to settle, which depends on your sales cycle and volume. Early numbers swing widely with a handful of orders. Compare campaigns over the same length of time, and avoid cutting spend based on only a few days of data."
      ]
    ]
  },
  "dollar-cost-averaging-calculator": {
    "answer": "A dollar-cost averaging calculator projects the future value of investing a fixed amount at regular intervals. This one converts your expected annual return into a monthly rate, compounds each contribution for the months it stays invested, and sums the results using the annuity formula. It also separates total contributions from growth, so you can see how much of the projected value comes from returns.",
    "exampleInputs": {
      "monthly": "300",
      "months": "60",
      "return": "7"
    },
    "sections": [
      {
        "heading": "When is a recurring investment plan worth modeling?",
        "text": "Model a recurring plan when you want to see how steady contributions grow over several years. Someone setting aside a fixed amount from each paycheck can test different monthly amounts and time horizons to see what the plan could reach. The calculator also supports goal planning, because changing the return assumption shows how sensitive the outcome is to market conditions. The projection is a formula, not a forecast of real markets, so use it to compare scenarios rather than to predict a specific balance."
      },
      {
        "heading": "How do I read the contributions and growth split?",
        "text": "The projected value combines two parts. Contributions are the total you deposit, which is the monthly amount multiplied by the number of months. Growth is everything above that total, produced by compounding. Early contributions have the most time to grow, so growth becomes a larger share as the horizon lengthens. Watch this split when you change the time frame. A short plan is mostly contributions, while a long one shows compounding doing much of the work."
      },
      {
        "heading": "What does this projection leave out?",
        "text": "The most common mistake is treating the expected return as a promise. Real returns vary from year to year, and a single average hides large swings. Fees, taxes and inflation also reduce what you keep, and the basic projection does not subtract them. Dollar-cost averaging does not promise a better result than investing a lump sum either. The output is an educational estimate, not professional investment advice, so consider speaking with a qualified adviser before making decisions."
      }
    ],
    "faqs": [
      [
        "Does the calculator adjust for inflation?",
        "The projection uses the nominal return you enter and does not subtract inflation. To estimate purchasing power, lower the expected return by your inflation assumption before running the calculation. Treat the result as an educational estimate rather than professional advice."
      ],
      [
        "What happens if I pause contributions?",
        "The calculator assumes contributions continue every month for the full number of months. A pause lowers the total contributed, and the balance then compounds from a smaller base. To model a pause, run separate scenarios for each period and compare the results side by side."
      ],
      [
        "Can I model investing every week or every quarter?",
        "This calculator is built around monthly contributions, with the months input setting the length of the plan. For weekly or quarterly investing, convert the amount to a monthly equivalent, such as a quarterly contribution divided by three, and check whether the result still matches your actual schedule."
      ]
    ]
  },
  "crypto-profit-loss-calculator": {
    "answer": "This crypto profit and loss calculator works out the result of one trade. It multiplies the buy price and the sell price by the quantity of coins, deducts the trading fee calculated on gross sale proceeds, and subtracts the original cost. The output is the net profit or loss in dollars, along with the percentage return on the amount invested. It runs in your browser.",
    "exampleInputs": {
      "buyPrice": "2000",
      "sellPrice": "2600",
      "quantity": "1.5",
      "fee": "0.1"
    },
    "sections": [
      {
        "heading": "When should I use a crypto profit calculator?",
        "text": "Use this calculator after a trade, or before one, to see the outcome at a target sale price. A holder deciding whether to take some profit can model several sell prices and compare the net results. It is also helpful for measuring the effect of fees, which are easy to overlook when a price chart looks strong. Enter the quantity you actually bought or plan to sell, since a partial sale changes both the cost basis and the proceeds."
      },
      {
        "heading": "How do I read the dollar and percentage results?",
        "text": "The dollar figure is the cash difference after fees, so a positive number means the trade returned more than it cost. The percentage return divides that net gain by the original cost. Because fees come out of sale proceeds, a small fee rate still reduces the result, and its effect is larger on short trades with modest gains. A loss works the same way in reverse, although a loss needs a larger percentage gain to recover back to the original cost."
      },
      {
        "heading": "What does this calculator leave out?",
        "text": "The calculator covers one buy and one sell with a single fee. It does not include taxes, which depend on your location, holding period and records. It also does not account for staking rewards, airdrops, funding costs or the spread between quoted buy and sell prices. Exchange fee schedules can differ for makers, takers and withdrawals. Treat the result as an educational estimate rather than professional tax or financial advice, and keep your own transaction records."
      }
    ],
    "faqs": [
      [
        "Why does my exchange show a different profit?",
        "Exchanges may use different fee tiers, rounding rules or the price at the moment of execution. Some display spreads or conversion costs separately. Compare the buy price, sell price and fee amounts on your statement with the inputs here, and adjust the fee percentage to match the rate you actually paid."
      ],
      [
        "Can I calculate a partial sale?",
        "Yes. Enter the quantity you are selling and the cost per coin that applies to those coins, not your full holdings. If you bought the same asset at several prices, the cost basis of the sold portion depends on your accounting method, which this tool does not track."
      ],
      [
        "Does the calculator handle losses as well as gains?",
        "Yes. A negative net result shows the loss in dollars and as a negative percentage of the original cost. The same fee deduction applies, so a loss is slightly larger once fees are included. Use the result to see how much of the loss came from price movement and how much from fees."
      ]
    ]
  },
  "stock-return-calculator": {
    "answer": "This stock return calculator measures how much a share investment grew, counting both price change and dividends received. Total return is capital gain plus dividends, divided by the amount you paid. Annualized return, also called CAGR, converts that total into the steady yearly rate that would produce the same result over your holding period. It runs in your browser.",
    "exampleInputs": {
      "buy": "42.5",
      "sell": "61",
      "dividends": "180",
      "years": "2"
    },
    "sections": [
      {
        "heading": "When should I count dividends in my return?",
        "text": "Price change alone can understate what a dividend-paying stock earned. Dividends are cash you received while holding the shares, so they belong in the gain even though the share price does not show them. Enter every dividend payment received during the holding period, not just the most recent one. If you leave the dividend field at zero, label the result as a price-only view so it is not compared with total return figures. Total return is the fairer basis when you weigh a dividend stock against one that pays nothing."
      },
      {
        "heading": "How do I read the annualized return number?",
        "text": "CAGR is a smoothed figure. It gives one compounded yearly rate between your purchase and sale, but it does not show the path in between. A stock that fell and recovered can show the same CAGR as one that rose steadily. Short holding periods make the annualized number swing sharply, because a small change in total return is spread across fewer years. When comparing investments, use the same start and end dates so the rates describe the same window."
      },
      {
        "heading": "What mistakes make the result misleading?",
        "text": "A common slip is mixing per-share prices with totals. Buy and sell prices are per share, while dividends are a lump sum, so check which unit each field expects. Entering months where the calculator expects years changes the annualized rate sharply. The calculator has no field for brokerage fees or taxes, so subtract those from the sale value yourself before comparing. This is an educational estimate, not professional investment advice."
      }
    ],
    "faqs": [
      [
        "What if I bought the shares on different dates?",
        "Enter one average buy price, found by dividing total cost by total shares, and use the holding period from the average purchase date to the sale. Staggered purchases make a single period an approximation, so treat the CAGR as a summary rather than an exact figure. A spreadsheet listing each purchase date gives a more precise rate."
      ],
      [
        "Can I enter a holding period in months?",
        "Enter it as a decimal number of years. Eighteen months becomes 1.5 and six months becomes 0.5. The annualized rate then compounds over that fractional period, which keeps the comparison consistent with multi-year results."
      ],
      [
        "Does a strong past return mean the stock will keep performing?",
        "No. The result describes only the dates you entered. It says nothing about future prices, and a high past return can coincide with a stock that is now expensive. This output is an educational estimate, not professional investment advice."
      ]
    ]
  },
  "self-employment-tax-calculator": {
    "answer": "This self-employment tax calculator estimates the US Social Security and Medicare tax owed on net business profit. It first takes 92.35 percent of net profit, then applies 15.3 percent: 12.4 percent for Social Security up to the wage base, and 2.9 percent for Medicare. The result is an educational estimate, and the calculation runs in your browser.",
    "exampleInputs": {
      "netProfit": "64000"
    },
    "sections": [
      {
        "heading": "Who needs to estimate self-employment tax?",
        "text": "Freelancers, independent contractors who receive 1099 forms, sole proprietors, and single-member LLC owners often owe this tax on profit from their work. Employees usually see Social Security and Medicare withheld from each paycheck, with the employer paying a matching share. Self-employed people pay both halves themselves, which is why the rate looks higher than a typical payroll deduction. Running the estimate early in the year helps you set money aside before a bill arrives."
      },
      {
        "heading": "How do I use the result alongside income tax?",
        "text": "Self-employment tax is calculated separately from income tax, so the two add together. The estimate includes the deductible employer-equivalent portion, which is half of the total. That deductible half reduces the income base used for income tax, so it is not a dollar-for-dollar cut in the bill. Keep this figure on its own line in your planning, because the deduction itself is applied on your income tax return rather than inside this tool."
      },
      {
        "heading": "What mistakes make the estimate too high or low?",
        "text": "Entering gross receipts instead of net profit is a common cause of overstatement, because the tax applies only to what remains after legitimate business expenses. Leaving out a wage-earning job can also throw the Social Security portion off, since wages count toward the same wage base. Check your bookkeeping before entering a figure, and treat the output as a planning estimate. Final amounts should be confirmed with a qualified tax professional who can review your full situation."
      }
    ],
    "faqs": [
      [
        "Does my net profit already subtract business expenses?",
        "It should. Net profit equals business income minus ordinary and necessary business expenses, such as supplies, software and eligible home office costs. Entering total invoices instead overstates the base and pushes the estimate upward. Check your records before entering the figure."
      ],
      [
        "What if I also have a W-2 job?",
        "Wages from an employer count toward the same Social Security wage base, which can reduce how much of your self-employment earnings are taxed at the Social Security rate. This calculator does not ask for wages, so treat its Social Security portion as a rough upper estimate and confirm the final figure with a tax professional."
      ],
      [
        "Is the deductible half the same as a tax credit?",
        "No. A deduction reduces the income that is taxed, so its value depends on your income tax rate. A credit reduces the tax owed directly. Half of the self-employment tax works as a deduction, so it lowers taxable income rather than the tax bill dollar for dollar. This is educational information, not tax advice."
      ]
    ]
  },
  "fuel-cost-calculator": {
    "answer": "This fuel cost calculator estimates what a trip costs in fuel. In US mode, gallons equal miles divided by MPG, and cost equals gallons times the price per gallon. In metric mode, liters equal kilometers divided by 100 and multiplied by the L/100km figure, and cost equals liters times the price per liter. Only fuel is counted, and the calculation runs in your browser.",
    "exampleInputs": {
      "distance": "320",
      "economy": "28",
      "price": "3.79"
    },
    "sections": [
      {
        "heading": "When is a trip fuel estimate most useful?",
        "text": "Trip fuel estimates help when you plan a road trip budget, compare two cars on the same route, or check whether a longer detour is worth the extra fuel. Enter the distance you will drive, and double it for a round trip, since the calculator works on a single distance value. Running the same distance and price through two fuel economy figures shows the cost gap for that trip. The result is most helpful as a starting point for planning, not as a final bill."
      },
      {
        "heading": "How do I read MPG versus L/100km?",
        "text": "The two systems measure fuel economy in opposite directions. Higher MPG means fewer gallons per mile, while a lower L/100km figure means fewer liters per 100 kilometers. Entering a metric figure while the selector is set to US mode produces a plausible-looking but wrong result. Check the unit selector before every calculation, and keep the price unit matched to the volume unit: dollars per gallon with MPG, dollars per liter with L/100km."
      },
      {
        "heading": "What mistakes make the trip cost misleading?",
        "text": "Using a label figure or a city-driving number for a highway trip can misstate the fuel needed, because real economy changes with speed, load, weather and terrain. Mixing a price per liter with a US gallon setting also causes large errors. The calculator does not include tolls, parking, or the extra fuel burned while idling in traffic. Treat the output as an educational estimate of fuel alone, not a fixed bill."
      }
    ],
    "faqs": [
      [
        "Should I enter the sticker MPG or my own numbers?",
        "Your own fill-up records usually reflect your driving better than a label figure does. Divide the miles driven between two fill-ups by the gallons or liters added, then enter that result as the economy value. Keep the unit system consistent with that calculation."
      ],
      [
        "How do I estimate a round trip?",
        "Double the one-way distance before entering it. A 150-mile one-way trip becomes 300 in the distance field, while the economy and price stay the same. This works in either unit system, as long as the distance uses the same units as the economy figure."
      ],
      [
        "Can I compare two vehicles with this tool?",
        "Yes. Run the same distance and fuel price twice, once with each vehicle's economy. The gap between the two costs is the fuel difference for that trip. The result covers fuel only, so add maintenance, insurance or depreciation separately for a full ownership comparison."
      ]
    ]
  },
  "battery-life-calculator": {
    "answer": "This battery life calculator estimates runtime with a charge budget. It multiplies capacity in mAh by the usable percentage to get usable charge, then divides by the average battery-side current in mA. The result is in hours, and dividing by 24 gives days. Real runtime also depends on age, temperature and voltage cutoffs, and the calculation runs in your browser.",
    "exampleInputs": {
      "capacity": "2000",
      "current": "12.5",
      "usablePercent": "90"
    },
    "sections": [
      {
        "heading": "When should I size a battery with this calculator?",
        "text": "Use this calculator early in a design, before you choose a cell. Enter the capacity you are considering and the average current your device draws, and the output shows whether the target runtime is realistic. It also helps compare two capacities on the same load, such as a larger cell that adds weight against a smaller one that runs for less time. Running the numbers before prototyping keeps a sizing problem from surfacing after the enclosure is built."
      },
      {
        "heading": "How do I interpret hours and days?",
        "text": "The hours figure assumes a steady average draw. Days are the hours divided by 24, so a result of several days still means continuous operation at the same average. For a device that cycles between sleep and active modes, the value you enter must be the time-weighted average over a full cycle, not the peak draw. Treat the result as a planning figure. Real runtime is often shorter in cold conditions or as a battery ages, so build margin into the design."
      },
      {
        "heading": "What input errors skew the runtime?",
        "text": "Entering rated capacity without adjusting the usable percentage overstates runtime, because the calculation assumes only part of the charge can be drawn. Using a peak current figure instead of the average understates runtime and can lead to an unnecessarily large battery. Current measured after a regulator may not match the battery side once conversion losses are counted. Keep units consistent as well, since a value entered as Ah instead of mAh is off by a factor of a thousand."
      }
    ],
    "faqs": [
      [
        "Do I enter capacity in mAh or Ah?",
        "Enter it in mAh. A battery labeled in Ah needs multiplying by 1000 first, so 2.2 Ah becomes 2200 mAh. Current also needs to be in mA, so a 0.5 A draw becomes 500 mA. Mixing units produces results off by a factor of a thousand."
      ],
      [
        "Why does the result differ from the rated life on a datasheet?",
        "Datasheet ratings are measured under specific conditions, such as a fixed temperature and discharge rate. Your device may draw at a different rate or run in cooler or warmer conditions, which changes usable capacity. Treat the calculator result as a planning figure and test the real device to confirm."
      ],
      [
        "Does this work for rechargeable cells?",
        "Yes. The formula does not depend on chemistry. For a rechargeable cell, enter the capacity you expect after aging, and lower the usable percentage if the cell has lost capacity over many cycles. The output is still a charge-budget estimate for one discharge."
      ]
    ]
  },
  "random-number-generator": {
    "answer": "This random number generator picks a whole number between a minimum and a maximum you set, with both ends included. It draws 32-bit values from your browser's cryptographic random source and uses rejection sampling, which discards draws that would favor some numbers over others. Every integer in the range then has the same chance on each draw. It runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a random integer useful?",
        "text": "A random whole number works well for choosing an item from a numbered list, rolling a virtual die, or assigning people to groups by index. Set the minimum to 1 and the maximum to the list length, then use the result as the position. Because both bounds are included, a range from 1 to 6 covers every face of a standard die. Use it for quick, low-stakes selections where a fair draw is enough, such as ordering a classroom presentation."
      },
      {
        "heading": "How should I read a single result?",
        "text": "Each draw stands alone. A number that appeared a moment ago has the same chance as any other number on the next draw, so a repeat is not a sign of a problem. Over many draws, counts across the range tend to even out, but any short run can look lopsided. If you need a sequence with no repeats, a single integer draw does not provide that, and you would need to track the results yourself. The minimum and maximum are as likely to appear as any value between them."
      },
      {
        "heading": "What limits should I keep in mind?",
        "text": "Bounds must be safe integers, and the span cannot exceed 2 to the 32nd power possible values, so very wide ranges fall outside the tool. The generator is not a certified gaming, lottery or prize service. If an outcome must be audited or legally verifiable, use a method that meets that requirement rather than a browser demonstration. The tool also offers no seed, so a previous sequence cannot be reproduced."
      }
    ],
    "faqs": [
      [
        "Can I reproduce a sequence of results?",
        "No. The generator has no seed, so each run is independent and cannot be replayed. For repeatable sequences in testing, use a seeded pseudorandom generator in your own code, where you control the starting value."
      ],
      [
        "What if I enter the minimum higher than the maximum?",
        "Put the smaller number in the minimum field. The bounds describe one interval, so reversing them changes what the tool is asked to do. Bounds must also be whole numbers within the safe integer range."
      ],
      [
        "Can the generator return several unique numbers at once?",
        "This tool returns one integer per draw, and repeated draws can repeat values. To get unique picks, discard any repeat and draw again, or list every value in the range and shuffle it. Track the results you have already accepted."
      ]
    ]
  },
  "coin-flip": {
    "answer": "This coin flip tool picks heads or tails by generating a random integer from your browser's cryptographic random source and mapping one value to each side. The selection is unbiased, so each side has an equal chance on every flip. Each flip is independent, meaning earlier results do not change the odds of the next one. It runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a virtual coin flip a good choice?",
        "text": "A coin flip suits quick two-option decisions, such as which team starts, which restaurant to try first, or which of two tasks comes first in a shared plan. Its value comes from the outcome being unpredictable to everyone at the table, not from the result carrying any meaning of its own. Agree on the two options before flipping, and state which side means which. That prevents the outcome from being reinterpreted after it appears."
      },
      {
        "heading": "How do I read a streak of identical results?",
        "text": "Streaks are normal in random sequences. After five heads, the next flip still has the same one-half chance of heads, so a streak does not signal that tails is due. Short sequences often look more uneven than they are, because people expect results to alternate. Counts drift over longer runs, but each individual flip stays fifty-fifty. Judge the process over many flips rather than the look of a short run before deciding that something is wrong."
      },
      {
        "heading": "What limits does a browser coin flip have?",
        "text": "The tool produces a two-outcome draw, so it has no edge landing, no physical weight to inspect, and no mechanism to watch. It is not suitable where a certified random result is legally required, such as formal gambling or regulated selection. If several people must trust the outcome, a written record of each flip or a witnessed method gives more confidence. For casual decisions among friends, the browser method is usually enough."
      }
    ],
    "faqs": [
      [
        "Why does a run of results feel predictable?",
        "People tend to see patterns in short sequences, so a run of identical results can feel unlikely even when it is ordinary. Each flip still has an equal chance of heads and tails. The feeling reflects perception, not a flaw in the generator."
      ],
      [
        "Is a coin flip the same as picking a random number from 1 to 2?",
        "In terms of probability, yes. Assigning heads to one value and tails to the other gives the same odds as any two-value draw. The coin label simply makes the result easier to read at a glance."
      ],
      [
        "How do I flip several coins and keep a combined total?",
        "Press flip once for each coin. Each flip is separate, so the results do not depend on one another. Write down each outcome as it appears so the running total stays correct."
      ]
    ]
  },
  "random-name-picker": {
    "answer": "This random name picker chooses one entry from a list you type in, one name per line. It trims spaces at the ends of each line, ignores empty lines, and gives every remaining line the same chance. A name listed twice gets two entries and double the chance. The selection uses your browser's random source, and the list stays in the browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a random name picker useful?",
        "text": "Use a name picker when a group needs a fair choice without debate. Common cases include choosing a presenter, picking a volunteer for a task, deciding which student answers first, or dividing turns during a meeting. It keeps the person doing the choosing from shaping the result, since nobody picks the order by hand. Type the names as they should appear, then draw once. Keeping the list visible lets the group see exactly which names went in."
      },
      {
        "heading": "How do duplicate entries change the odds?",
        "text": "Each line is one entry, so a name typed twice holds two of the total entries and has a larger share of the draw than a name listed once. This is useful when you want to weight a choice, but it happens by accident when a list is pasted from several sources. Scan the list for repeats before drawing. If each person should have one equal chance, delete the extra lines so every name appears exactly once."
      },
      {
        "heading": "What should I check before a draw?",
        "text": "Spelling variants count as different entries, so Ann and Anne are separate lines with separate chances. Check each name once, since a misspelled name is treated as its own entry rather than as the person intended. Blank lines are ignored, and spaces at the start or end of a line are trimmed before the draw. The tool is not a certified prize-drawing service, so an official raffle or contest needs a documented, auditable process instead."
      }
    ],
    "faqs": [
      [
        "Can I draw several names in one go?",
        "This tool gives one entry per draw. To select several, remove each chosen name from the list after it appears, then draw again. Removing winners prevents the same person from being selected twice."
      ],
      [
        "How are extra spaces handled?",
        "Spaces at the start and end of each line are trimmed before the draw, so a name with a trailing space counts as the same entry as the name without one. Blank lines are skipped completely, so they never receive a chance."
      ],
      [
        "Can I use the picker to put a group in random order?",
        "Yes. Draw one name, write it down, and remove it from the list. Repeat until the list is empty, and the sequence you recorded is a random order. Each draw is independent of earlier ones, so the removal step is what prevents repeats."
      ]
    ]
  },
  "typing-speed-test": {
    "answer": "This typing speed test measures correct words per minute during a practice run of up to 60 seconds. The timer starts at your first keystroke. Correctly matched characters are divided by five to count words, then divided by elapsed minutes. Accuracy compares each typed character with the text at the same position, and pasting is disabled so the score reflects typing.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is a typing test worth taking?",
        "text": "A typing test is useful before a job that involves heavy data entry, when you want a baseline before a practice routine, or when you are tracking progress over several weeks. Take it under the same conditions each time, with the same chair, keyboard and time of day. Changing those variables makes week-to-week comparisons unreliable. One session shows where you stand that day, while a series of sessions shows the direction you are heading."
      },
      {
        "heading": "How do I read correct WPM alongside accuracy?",
        "text": "Correct WPM counts only characters that match, so a fast run with many errors scores lower than a steadier run with clean text. Accuracy shows how clean the text is at the end, which tells you whether speed is costing you mistakes. Read the two together as a pair. If WPM is high but accuracy is weak, the next practice session should slow down to build control. If accuracy is strong but speed lags, the focus shifts to pace and rhythm across the whole passage."
      },
      {
        "heading": "What makes a typing result inconsistent?",
        "text": "A 60-second window is a short sample, so a single unfamiliar word, a pause to check something, or an unfamiliar passage can move the score noticeably. Keyboard layout and the device you use also change how quickly your hands move. The timer starts on first input, so waiting before you begin does not lower the score. Compare results across several attempts rather than trusting one run. Note the date and time of each run so patterns are easier to spot."
      }
    ],
    "faqs": [
      [
        "Why does the timer start only on my first keystroke?",
        "Starting on the first input means idle time before you begin does not count against you. The clock measures time spent typing, so the result reflects your speed while you work rather than the time you took to start."
      ],
      [
        "Can I correct a mistake and still keep my accuracy score?",
        "Yes. Accuracy compares the text as it stands, so a corrected character matches again. Edits can fix earlier errors, but each correction takes time, and a long pause to fix something will show up in your correct WPM."
      ],
      [
        "Does my keyboard layout change the score?",
        "The test records what you type into the box, so the score reflects your hardware and layout during that run. Switching keyboards or layouts between attempts can change speed, so keep the setup constant when you compare sessions."
      ]
    ]
  },
  "tip-calculator": {
    "answer": "This tip calculator works out the tip, the grand total, and what each person owes when a bill is split evenly. The tip equals the bill multiplied by the tip percentage. The grand total is the bill plus the tip, and dividing that total by the number of people gives each share. It is an even-split estimate and runs in your browser.",
    "exampleInputs": {
      "bill": "142.6",
      "tip": "20",
      "people": "4"
    },
    "sections": [
      {
        "heading": "When should I work out the tip before paying?",
        "text": "Working out the tip before the bill arrives lets your group agree on a number without awkward math at the table. It helps when a party is large, when one person will front the payment, or when the group wants to match the tip to the quality of service. The percentage is your choice, shaped by service and local custom. Setting it in advance keeps the decision calm and lets everyone see the same figures."
      },
      {
        "heading": "How do I read the per-person amount?",
        "text": "Each share is the grand total divided by the number of people, so it can contain a fraction of a cent that cannot be paid exactly. Round each share to a practical amount, and agree in advance who covers any remainder. The per-person figure already includes the tip, so do not add a tip on top of it. Check that the bill matches the receipt before dividing, because a misread amount carries into every share."
      },
      {
        "heading": "What mistakes lead to paying the wrong amount?",
        "text": "Entering the tip as a dollar figure instead of a percentage inflates the result by a large margin. Check whether the bill already includes a gratuity, since some large parties receive one automatically. An even split also assumes everyone ordered similar amounts; if they did not, splitting by item is fairer. This tool gives an educational estimate of the tip, not professional financial advice, so confirm the total against the receipt."
      }
    ],
    "faqs": [
      [
        "What if the bill already includes a gratuity?",
        "Enter the amount exactly as printed, and skip adding a second tip. Some bills add a gratuity automatically for large groups, so reading the receipt first helps you avoid paying for service twice. If the included amount is lower than you want, you can add the difference separately."
      ],
      [
        "Can I round the total to an easier number?",
        "Yes. Round the grand total or each person's share up to a convenient figure, such as the nearest dollar, and pay the difference in cash or by card. Rounding up slightly keeps payment simple, and it is easier to confirm when everyone can see the rounded number."
      ],
      [
        "Does the calculator work for cash and card payments?",
        "The output is a number, so it works for either method. Enter the agreed bill and percentage, then pay each share by whichever method your group prefers. The calculator does not include card fees or currency conversion, so add those separately if they apply."
      ]
    ]
  },
  "roi-calculator": {
    "answer": "This ROI calculator measures an investment's return as a percentage. It subtracts the amount invested from the amount returned, divides by the amount invested, and multiplies by 100. If you enter a holding period, annualized ROI converts the total into a per-year rate: one plus ROI, raised to the power of one divided by the years, minus one. The math runs in your browser.",
    "exampleInputs": {
      "cost": "8500",
      "ret": "10200",
      "years": "3"
    },
    "sections": [
      {
        "heading": "When is ROI the right comparison tool?",
        "text": "ROI works well when you have a clear amount put in and a clear amount returned, such as equipment that produces measurable savings, or a campaign with tracked revenue set against its spend. Use the same definition of returned value for every option you compare. If one option counts gross revenue and another counts profit, the percentages describe different things and cannot be ranked fairly against each other. Write each option on the same basis before comparing."
      },
      {
        "heading": "Why does annualizing change the comparison?",
        "text": "Total ROI ignores time. A gain of the same size over two years and over ten years looks identical as a total, yet the annualized rates differ a great deal. Annualizing puts both on a per-year basis, so you can compare them directly. The annualized figure assumes growth is steady across the period, so a single endpoint value hides the path the money actually followed. Read annualized results as a rough comparison tool, not a forecast."
      },
      {
        "heading": "What mistakes distort an ROI figure?",
        "text": "Leaving out costs such as fees, taxes, maintenance or staff time makes the return look better than it was. Mixing gross and net values in the same comparison has the same effect. If you added money at different times, one total invested figure misstates the timing. This calculator gives an educational estimate, not professional financial advice, so check the inputs before using the result to decide. Re-check each input before relying on it."
      }
    ],
    "faqs": [
      [
        "What if I invested money in several installments?",
        "Add all contributions into the amount invested. Because one holding period then covers money that was in place for different lengths of time, the annualized figure is only approximate. An internal rate of return calculation handles uneven timing more precisely."
      ],
      [
        "Is a higher ROI always the better investment?",
        "Not by itself. ROI does not show the size of the investment or the risk taken to earn the return. A smaller outlay with a high percentage can produce less total profit than a larger outlay with a lower percentage, so compare net profit alongside the percentage."
      ],
      [
        "Can I use ROI without a holding period?",
        "Yes. The holding period field is optional. Leave it empty and the calculator shows total ROI only. That suits a single-period result, but for comparing investments held for different lengths, enter the years so the annualized rate is available."
      ]
    ]
  },
  "simple-interest-calculator": {
    "answer": "A simple interest calculator finds interest charged or earned only on the original principal, never on interest already added. The formula is I = P × R × T, meaning principal times the annual rate as a decimal times the number of years. Add that interest to the principal to get the total repaid or owed. Because the base stays fixed, the interest grows by the same amount each year.",
    "exampleInputs": {
      "principal": "12000",
      "rate": "4.75",
      "years": "5"
    },
    "sections": [
      {
        "heading": "What situations use simple interest?",
        "text": "Simple interest appears in short-term loans and some bonds, where interest is calculated only on the original principal. It is also handy for a quick check on an informal loan between people or a promissory note with a fixed rate. Enter the principal, the annual rate as a percentage, and the term in years. The tool multiplies the three values to give interest for the full term, then adds it to the principal for the total. Use the figure to compare offers before you sign. This is an educational estimate, not professional financial advice."
      },
      {
        "heading": "How should I read the interest result?",
        "text": "The interest figure is the total earned or owed across the whole term, not a yearly amount. For the yearly figure, multiply the principal by the rate as a decimal, since that product is the interest for one year. Because the base never grows, each year adds the same amount, so the total rises in a straight line when plotted over time. Compare that with compound interest, where each period's interest joins the base and the curve bends upward. If the repayment total looks too high, check that the rate was entered as a percentage and the term was in years, not months."
      },
      {
        "heading": "What mistakes make the result misleading?",
        "text": "The most common error is mixing units. A rate of six percent should be entered as six in the rate field, and a term in months must be converted to years first. Another mistake is assuming the quoted rate is the true cost. Fees, required insurance, and payment timing can change what you actually pay, which is why an APR check helps when a loan has upfront charges. Simple interest also does not model extra payments or missed payments that change the balance. This is an educational estimate, not professional financial advice, so verify terms with the lender."
      }
    ],
    "faqs": [
      [
        "Is simple interest ever paid on interest?",
        "No. Simple interest is calculated only on the original principal for the whole term. Interest already earned is not added to the base, so it never earns interest of its own. If interest is reinvested each period, the balance grows on its own growth, which is compounding and needs a different formula."
      ],
      [
        "What balance applies partway through a term?",
        "Multiply the principal by the rate as a decimal and by the years elapsed so far, then add that interest to the principal. For example, halfway through the term, half of the total interest has accrued. Because the base never changes, the calculation is linear and easy to check by hand."
      ],
      [
        "Does this calculator account for taxes on interest?",
        "No. The result shows interest before any tax. Interest income may be taxable depending on where you live and the type of account, and interest paid on some loans may have its own rules. Confirm those rules with a qualified tax professional. This tool gives an educational estimate only, not tax or financial advice."
      ]
    ]
  },
  "savings-calculator": {
    "answer": "A savings calculator projects an account balance by starting from your current amount, adding a fixed deposit each month, and compounding interest monthly at your APY. The result separates what you deposited from the interest the account earned. It uses the future-value-of-a-series method that banks use, so the outcome depends on the starting balance, deposit size, APY, and time.",
    "exampleInputs": {
      "initial": "2500",
      "monthly": "300",
      "apy": "4.25",
      "years": "8"
    },
    "sections": [
      {
        "heading": "Which goals fit a savings projection?",
        "text": "A projection works well for goals with a clear timeline, such as an emergency cushion, a down payment fund, or a planned purchase in a few years. Enter the balance you have today, the amount you can deposit each month, and the number of years until you need the money. Then change one input at a time to see its effect. Testing a bigger deposit against a higher APY shows which lever moves the total more for your timeline. The result tells you whether the goal is reachable at the current pace."
      },
      {
        "heading": "How should I read deposits versus interest?",
        "text": "The breakdown separates the money you put in from the money the account earned. Early in a projection, deposits make up most of the ending balance because interest has had little time to build. Over longer periods the earned share grows, since each month's interest joins the balance and then earns interest itself. Compare the two totals to judge how much of the outcome depends on steady saving and how much depends on the rate. A higher APY only changes the earned portion, so a long, consistent habit often matters more than small rate differences."
      },
      {
        "heading": "What limits should I keep in mind?",
        "text": "The model assumes the APY stays the same for the whole period and that every deposit lands on schedule. Real high-yield accounts can change their rate, and some have minimum balances or withdrawal limits that this calculator does not model. Inflation is not subtracted, so the ending balance is a nominal figure, and withdrawals are not modeled either. Use the output for planning and comparison only. This is an educational estimate, not professional financial advice."
      }
    ],
    "faqs": [
      [
        "Should deposits land at the start or end of each month?",
        "The calculator assumes deposits are added at one consistent point each month, with interest compounded monthly. Depositing earlier in the month gives money a little more time to earn, so the real balance could finish slightly higher than the projection. For planning, the monthly model is a sensible baseline for comparison."
      ],
      [
        "What amount should an emergency fund reach?",
        "This tool does not set a target, because the right amount depends on your income, expenses, and obligations. A personal budget is the right place to size that figure. Once you have a number, enter it as your goal and adjust the monthly deposit until the projected balance reaches it. This is an educational estimate, not professional financial advice."
      ],
      [
        "Can I model a retirement account with this tool?",
        "The same math applies to any balance that compounds at a steady rate, but retirement accounts carry contribution rules, tax treatment, and investment returns that vary. A savings APY is fixed, while investments fluctuate. For retirement planning, use a tool that reflects your account type, then confirm the details with a qualified professional."
      ]
    ]
  },
  "dti-calculator": {
    "answer": "A debt-to-income calculator divides monthly debt obligations by gross monthly income to show what share of income is committed to debt. Front-end DTI uses only the housing payment. Back-end DTI adds all other monthly debt payments to housing. Each ratio is expressed as a percentage, and lenders review both figures when assessing a mortgage or loan application.",
    "exampleInputs": {
      "income": "7200",
      "housing": "2050",
      "debts": "600"
    },
    "sections": [
      {
        "heading": "Who looks at DTI during an application?",
        "text": "Mortgage underwriters review DTI early because it shows how much room your income leaves for a new payment. Auto lenders and personal loan providers also weigh debt load, though their limits differ. Before applying, enter gross monthly income, the expected housing payment, and your other monthly debt payments. Treat the result as a screening check. If the back-end ratio sits above the common guideline, lowering a balance or delaying a new loan may help before you apply. This is an educational estimate, not professional financial advice."
      },
      {
        "heading": "What do the two ratios tell me?",
        "text": "The front-end ratio isolates housing cost and answers whether the home payment alone fits your income. The back-end ratio includes everything owed each month, such as car loans, student loans, and credit card minimums. Conventional guidelines favor back-end ratios at or below 36%, with 43% a common ceiling for qualified mortgages. Falling under those lines does not settle approval, because lenders also weigh credit history, savings, and down payment. Read the two numbers together, since a high back-end figure can exist even when the front-end looks fine."
      },
      {
        "heading": "Which errors skew the ratio?",
        "text": "The most frequent error is using take-home pay instead of gross income. Lenders typically work from income before tax and payroll deductions, so a net figure makes the ratio look higher than the one they compute. Another mistake is leaving out a recurring obligation, such as a co-signed loan or a required monthly payment. Also use scheduled payments rather than total balances. For the housing field, enter the full expected payment, including any taxes and insurance you will pay monthly. This is an educational estimate, not professional financial advice."
      }
    ],
    "faqs": [
      [
        "Is a lower DTI always better?",
        "Generally a lower ratio leaves more room in your budget and can make an application easier to approve. A very low ratio still does not prove a payment is affordable, since savings, job stability, and living costs matter too. Use the ratio as one input in a wider budget review. This is an educational estimate, not professional financial advice."
      ],
      [
        "Can an application succeed above the usual benchmarks?",
        "Some lenders accept higher ratios when other factors are strong, such as substantial savings, a larger down payment, or a steady income history. Program rules differ, so the benchmarks are guidelines rather than hard cutoffs. Ask a lender to explain its specific limits and compare their figure with this calculator's result."
      ],
      [
        "Should I count the monthly payment or the loan balance?",
        "Lenders generally use the required monthly payment for each debt, not the total balance. A large balance with a small required minimum contributes only that minimum. Enter the scheduled payment shown on your statement. If a payment will change after a new loan or rate reset, use the expected future payment."
      ]
    ]
  },
  "down-payment-calculator": {
    "answer": "A down payment calculator converts a percentage of the home price into a dollar amount, then subtracts that from the price to find the loan you would need. Down payment equals price times the percent you put down. Loan-to-value, or LTV, equals the loan divided by the price, shown as a percentage. Above 80% LTV, conventional loans generally require private mortgage insurance until equity grows.",
    "exampleInputs": {
      "price": "525000",
      "percent": "10"
    },
    "sections": [
      {
        "heading": "What does the down payment actually fund?",
        "text": "The down payment is the share of the price you pay from your own funds, and the rest is borrowed. A larger down payment means a smaller loan, which lowers the monthly principal and interest and reduces the loan-to-value ratio that lenders review. Enter the home price and the percentage you plan to put down. The calculator returns the dollar amount to bring to the purchase, the resulting loan, and the LTV. Use it to compare scenarios, such as a smaller percentage now versus a larger one after more saving. Closing costs are separate from this figure."
      },
      {
        "heading": "How should I interpret the LTV line?",
        "text": "LTV compares what you borrow with what the home costs. A loan at 80 percent of the price sits at the line where conventional loans generally begin requiring private mortgage insurance. Above that line, insurance adds to the monthly cost until enough equity builds. Below it, that coverage is usually not part of the payment. Watch how LTV moves as you change the percentage, since each step shows the trade between cash on hand and the size of the loan. A lower LTV typically supports more favorable loan terms, though exact pricing depends on the lender."
      },
      {
        "heading": "What can make the number misleading?",
        "text": "The calculator uses only the home price and the percentage. It does not include closing costs, inspection fees, moving costs, or the cash reserves some lenders want after closing. Many buyers underestimate the total cash they need, so save for those separately. Check that the price is the agreed purchase price, since an appraisal that differs from the contract can change the loan amount. PMI cost is not calculated here. This is an educational estimate, not professional financial advice, so confirm figures with your lender."
      }
    ],
    "faqs": [
      [
        "Does the result include closing costs?",
        "No. The tool computes the down payment, loan amount, and LTV from the home price and percentage alone. Closing costs, prepaid items, and lender fees are excluded, so the cash needed at closing will be higher than the down payment. Ask your lender for a written estimate of those charges before deciding how much to save."
      ],
      [
        "What changes if the agreed price moves?",
        "The down payment dollar amount and the loan both move with the price, because the percentage applies to whatever price you agree on. At a fixed percentage, the LTV stays the same. Rerun the calculator with the new price to see updated figures. This is an educational estimate, not professional financial advice."
      ],
      [
        "What happens with a smaller down payment percentage?",
        "A smaller down payment produces a higher LTV and a larger loan. The calculator shows where the resulting LTV sits relative to the 80% line, but whether a particular loan requires insurance depends on the loan program and lender. Confirm those rules directly with the lender before you choose a percentage."
      ]
    ]
  },
  "sales-tax-calculator": {
    "answer": "A sales tax calculator either adds tax to a pre-tax price or works backward from a tax-inclusive total. To add tax, total equals price times one plus the rate. To extract it, the pre-tax amount equals the total divided by one plus the rate. The rate is entered as a percentage and converted to a decimal first, so the same formula covers both directions.",
    "exampleInputs": {
      "amount": "86.40",
      "rate": "7.5",
      "mode": "extract"
    },
    "sections": [
      {
        "heading": "When is the reverse calculation the right tool?",
        "text": "Reverse calculation helps when you only have a receipt total and need the pre-tax cost, such as when recording an expense for reimbursement or splitting a business purchase. Bookkeepers often need the net amount for a ledger entry while tracking the tax separately. Choose the extract direction, enter the total as the amount, and enter the rate that applied to the sale. The output is the pre-tax figure. Forward math is what you need when pricing an item before checkout. Pick the direction that matches the number you already have."
      },
      {
        "heading": "How can I check a result quickly?",
        "text": "A simple check is to reverse your own answer. If you add tax to a price, then run the extract direction on the total with the same rate, you should return to the original price, apart from rounding. Confirm that the rate is the combined rate for your purchase, since local and state components can stack. Receipts may differ by a cent because stores round each line or the final total under their own rules. Note the rounding method alongside the figure you record, so future comparisons stay consistent."
      },
      {
        "heading": "What mistakes lead to wrong totals?",
        "text": "The most common error is applying the rate in the wrong direction. Adding tax to a total that already includes tax counts the tax twice, while extracting tax from a pre-tax price removes tax that was never added. Another mistake is using a rate from the wrong place or ignoring items that may be exempt. This calculator does not check tax rules for specific goods or jurisdictions, and it is not a substitute for a tax professional's advice. Treat results as an educational estimate and verify against the receipt before filing or reimbursing."
      }
    ],
    "faqs": [
      [
        "Can I enter a rate with decimal places?",
        "Yes. A rate with decimal places works the same way, because the formula uses one plus the rate as a decimal. Enter the rate only in the percentage field, without typing a percent sign, so the percentage is not applied twice. Round the final figure to cents after the calculation, not before."
      ],
      [
        "Why does my total differ by a cent from the receipt?",
        "Stores often round tax per item, on the subtotal, or on the final total, and each method can land a cent apart. The calculator computes exact values and does not know a store's rounding rule. When the gap is one cent, the receipt is usually the record to use for expense reports."
      ],
      [
        "Should shipping be included in the taxable amount?",
        "Whether shipping or service fees are taxable depends on the rules where you buy and on the type of charge, so the calculator cannot decide that. Enter only the portion you know is subject to the rate you plan to apply, and keep other charges on a separate line. For business filings, confirm treatment with a qualified tax professional."
      ]
    ]
  },
  "roth-ira-calculator": {
    "answer": "A Roth IRA calculator projects how an account grows until retirement age. It compounds your current balance and each annual contribution at an expected yearly return across the years remaining. Roth contributions use after-tax money, so qualified withdrawals in retirement can come out tax-free. The output is an educational estimate that assumes a steady return and does not model taxes, fees, or market swings.",
    "exampleInputs": {
      "age": "35",
      "retAge": "62",
      "balance": "24000",
      "annual": "6500"
    },
    "sections": [
      {
        "heading": "Who gets the most from a Roth projection?",
        "text": "A Roth projection is useful for anyone who expects a higher tax rate in retirement or values tax-free withdrawals later. The calculator needs your current age, target retirement age, current balance, the amount you contribute each year, and an expected annual return. The years between your age and retirement age set how long compounding runs. Start with a realistic contribution, then test a higher and a lower return to see the range. A longer timeline can change the result more than a small change in the annual amount. This is an educational estimate, not professional financial advice."
      },
      {
        "heading": "What does the tax-free part really mean?",
        "text": "The advantage comes from when tax is paid, not from avoiding tax on growth. Contributions go in after tax, so growth is not taxed as it builds, and qualified withdrawals made after age fifty-nine and a half, once the account is five plus years old, come out tax-free. The calculator projects the balance, not spending power after inflation, because it does not model inflation, fees, or changes to the tax rules. Read the result as a nominal figure unless you lower the return yourself to reflect inflation."
      },
      {
        "heading": "Which limits should I keep in view?",
        "text": "The projection assumes the same return every year, but real returns vary and can be negative in some years. It does not apply contribution caps, income eligibility rules, or early-withdrawal rules, which matter for Roth accounts. Enter only what you can realistically contribute each year, since a planned amount you later cannot afford changes the outcome. Consider fees and investment choices separately. Transfers and rollovers are not modeled either. This output is an educational estimate, not professional financial advice, so review account rules with a qualified advisor."
      }
    ],
    "faqs": [
      [
        "What return should I enter for a Roth projection?",
        "Use a return you can justify from your own mix of investments, rather than an optimistic figure. Then run one lower and one higher case so you see a range. The calculator treats the rate as constant, so results are sensitive to that single input. This is an educational estimate, not professional financial advice."
      ],
      [
        "Does starting earlier matter more than contributing more?",
        "Both matter, but time is powerful because growth compounds on prior growth. Compare two runs: one with more years and a modest annual amount, and one with a larger amount over fewer years. Seeing both side by side clarifies which lever you can actually control, and it is an educational estimate, not professional advice."
      ],
      [
        "Can this tool handle a rollover from another account?",
        "No. The calculator projects only the balance you enter, and it does not model transfers, rollovers, or conversions from other accounts. Those follow their own rules and can carry tax consequences. Before moving money, confirm the process and any tax effects with the plan administrator or a qualified professional."
      ]
    ]
  },
  "investment-calculator": {
    "answer": "An investment calculator estimates future value by compounding an upfront lump sum at an expected annual return, while each periodic contribution compounds from the period it is added. Future value is the sum of all those compounded amounts. The tool separates what you put in from the growth it generated, so you can see how much of the result comes from returns. Projections assume a constant return.",
    "exampleInputs": {
      "principal": "15000",
      "contrib": "400",
      "freq": "12",
      "return": "7"
    },
    "sections": [
      {
        "heading": "What situations fit this projection?",
        "text": "This projection suits someone with money to start and a plan to keep adding on a schedule, such as regular payments into a brokerage account. Enter the initial investment, the amount added each period, how often you contribute, the expected annual return, and the number of years. Switching frequency while keeping the annual total the same still changes the result, because earlier contributions have more time to compound. Use the calculator to set a target and test what contribution would reach it. It describes one path, not a forecast for any specific holding."
      },
      {
        "heading": "How should I read growth versus contributions?",
        "text": "The result has two parts: the money you put in and the growth earned on it. Early in a long projection, contributions dominate the balance. As years pass, growth takes a larger share, because returns join the base and earn returns themselves. If the growth share looks small, check the years and the return first, since both drive compounding more strongly than the size of each contribution. Compare the lump sum and periodic portions separately to see which decision you control most directly."
      },
      {
        "heading": "What assumptions could overstate the outcome?",
        "text": "A fixed return is the biggest simplification. Markets move up and down, and a steady rate hides sequence risk, meaning the order of good and bad years matters when money is withdrawn. Taxes, fees, and inflation are not part of the basic result, so after-tax, after-fee, inflation-adjusted value will be lower. Test a conservative return alongside an optimistic one rather than planning around a single figure. Past performance does not predict future results. This is an educational estimate, not professional investment advice."
      }
    ],
    "faqs": [
      [
        "Why does contribution frequency change the total?",
        "Each contribution starts compounding from the period it is added. Monthly deposits put money to work sooner than yearly deposits of the same total, so the ending value is usually somewhat higher when the return is positive. The gap widens with more time and a higher return. Switching the frequency option shows the effect directly."
      ],
      [
        "Can I apply this to individual stocks or funds?",
        "You can use the same math for any holding where you can enter an expected annual return. Individual stocks can be volatile and may lose value, so a single steady return is only a planning placeholder. Use the output to compare scenarios rather than to predict a specific security. This is an educational estimate, not professional investment advice."
      ],
      [
        "What if I withdraw money partway through the period?",
        "This calculator does not model withdrawals and assumes money stays invested to the end year. A withdrawal reduces the base that compounds, so over long periods the future value drops by more than the amount taken out. To test this, project to the withdrawal year, subtract the amount, then project the remainder forward manually."
      ]
    ]
  },
  "debt-snowball-calculator": {
    "answer": "A debt snowball calculator builds a month-by-month payoff plan. Every debt receives its minimum payment, and the extra monthly amount plus any freed-up minimums go to one target debt at a time. The snowball method targets the smallest balance first, while the avalanche method targets the highest rate first. The output is a debt-free date and total interest for each approach.",
    "exampleInputs": {
      "debts": "4200, 19.99, 110\n8500, 9.5, 240\n1900, 26, 60",
      "extra": "350",
      "method": "avalanche"
    },
    "sections": [
      {
        "heading": "Which debts belong in the plan?",
        "text": "List every debt with a required monthly payment, such as credit cards, personal loans, auto loans, and student loans. For each one, enter the current balance, the annual percentage rate, and the minimum payment shown on your statement, with one debt per line in the format the field describes. Small debts matter under the snowball method because they free up minimums sooner. Leave out money you owe without a scheduled payment, and refresh the figures after each billing cycle so the plan reflects what you actually owe."
      },
      {
        "heading": "How should I compare the two methods?",
        "text": "Run both options with the same debts and extra payment, then compare the debt-free date and total interest. The snowball method often delivers quick wins, because closing a small account frees its payment and builds momentum. The avalanche method usually pays less interest, since money goes first to the costliest rate. If the two results are close, the snowball may be easier to sustain. If the interest gap is large, the avalanche may be worth the slower first win."
      },
      {
        "heading": "What limits should I keep in mind?",
        "text": "The plan assumes every minimum is paid on time and no new debt is added. New charges, rate changes, and missed payments can push the date later. Balances and rates are held fixed for the whole plan, so variable-rate debt may drift. Fees, expiring promotional rates, and payment rounding are not modeled. Use the output to plan and compare, not as a lender's payoff statement. This is an educational estimate, not professional financial advice; a nonprofit credit counselor or your lender can confirm exact figures."
      }
    ],
    "faqs": [
      [
        "What if I cannot afford an extra payment every month?",
        "Start with minimums you can keep up with, then add extra whenever your budget allows. Irregular extra payments still help. Re-run the plan each time your budget changes to see the updated debt-free date, and cover essential bills before adding money to debt."
      ],
      [
        "Can I include a debt with no interest?",
        "Yes. Enter zero as the rate. The avalanche method places that debt last because it carries no interest, while the snowball method may still target it first if its balance is small. Its minimum payment rolls forward once it is paid off."
      ],
      [
        "Why does the debt-free date shift with a different extra amount?",
        "A larger extra payment reduces principal faster, which lowers the interest charged in later months and speeds up the rollover of minimums. Even a modest change can move the finish date noticeably over a long plan. Compare two extra amounts to see what an added monthly payment is worth."
      ]
    ]
  },
  "budget-calculator": {
    "answer": "A 50/30/20 budget calculator divides monthly after-tax income into three buckets. Needs get 50 percent, covering essentials such as housing, food, and utilities. Wants get 30 percent for discretionary spending. Savings and extra debt payments get the remaining 20 percent. Multiply your take-home pay by each percentage to get the dollar target for each bucket.",
    "exampleInputs": {
      "income": "4200"
    },
    "sections": [
      {
        "heading": "Where does this framework fit in planning?",
        "text": "The 50/30/20 rule works as a starting template for people who want a simple split instead of tracking every category. It suits a first budget or a reset after spending has drifted. Enter monthly income after tax, since the rule is built on take-home pay. Then compare each dollar target with your real bills. The figures show whether essentials fit inside the needs bucket before discretionary spending is planned. Adjust the percentages if your costs require it, while keeping the overall structure visible."
      },
      {
        "heading": "How should I use the three buckets?",
        "text": "Treat the needs bucket as the ceiling for fixed obligations. If essential costs add up to more than that bucket, the template signals a mismatch that needs attention, such as housing cost or the balance between categories. The wants bucket is flexible by design, so it is usually the first place to trim when savings fall short. The savings bucket also covers extra debt payments, so a costly balance may justify directing more of it there. Review the split monthly rather than once."
      },
      {
        "heading": "Which mistakes make the split misleading?",
        "text": "The biggest mistake is entering gross pay. The rule uses after-tax income, so a gross figure makes every bucket look larger than money you can really spend. Another error is labeling wants as needs to make the numbers fit, which hides spending that could fund savings. Avoid treating 50/30/20 as a fixed law. It is a planning template, not a benchmark every household must meet. This is an educational estimate, not professional financial advice, so consult a qualified adviser for your situation."
      }
    ],
    "faqs": [
      [
        "What if rent alone takes more than half my income?",
        "The template will show a needs bucket that cannot cover rent and other essentials together. That is a signal to review housing costs or plan additional income, not a reason to abandon the budget. Use the dollar figures to see the gap, then decide which category has the most room to adjust."
      ],
      [
        "Should the savings bucket fund an emergency reserve first?",
        "The calculator does not rank savings goals. Many people direct the savings bucket toward an emergency cushion first, but the right order depends on your debts, income stability, and existing reserves. Treat the dollar target as the total, then assign it to your priorities in a separate plan."
      ],
      [
        "How should I plan for annual bills that come up once a year?",
        "Divide each annual bill by twelve and include that monthly amount in the needs or wants bucket, depending on its purpose. Setting money aside each month avoids surprise shortfalls. The calculator only splits the income you enter, so tracking those set-asides is up to you."
      ]
    ]
  },
  "apr-calculator": {
    "answer": "An APR calculator finds a loan's true annual cost by including upfront fees. It computes the payment from the nominal rate, then solves for the rate that makes those payments match the net cash you actually receive after fees. That solved rate is the annual percentage rate, which is usually higher than the advertised rate when fees are charged.",
    "exampleInputs": {
      "amount": "18500",
      "rate": "7.25",
      "months": "60",
      "fees": "450"
    },
    "sections": [
      {
        "heading": "Why does the advertised rate understate cost?",
        "text": "A quoted interest rate describes what you pay on the borrowed balance, but it ignores money taken out of the loan at closing. Origination charges, processing fees, and similar upfront costs reduce the cash you receive, while the repayment schedule stays the same. That gap between cash received and cash repaid raises the effective cost. Enter the loan amount, nominal rate, term in months, and upfront fees. The result shows the APR that reflects those charges, which is the figure to use for comparing offers side by side."
      },
      {
        "heading": "How should I compare two loan offers?",
        "text": "Compare offers on the same loan amount and term, because the same fees spread over a different number of months change the APR. Enter each offer's fees and compare the resulting APRs, not the advertised rates alone. A lower rate with high fees can cost more than a slightly higher rate with minimal fees. Confirm the fee list with the lender, since some charges are optional or apply only at certain points. Use APR as one input alongside the total you will repay over the full term."
      },
      {
        "heading": "Does the lowest APR always win?",
        "text": "Not automatically. APR is a standardized comparison, but it assumes the loan runs its full term without early payoff, refinancing, or missed payments. If you expect to repay early, fees spread over a shorter life can change which offer is cheapest. Variable-rate loans may move after closing, and the APR shown reflects current terms only. This is an educational estimate, not professional financial advice, so confirm the disclosed APR with the lender before you sign."
      }
    ],
    "faqs": [
      [
        "Does the loan term change the APR?",
        "Yes, because the same upfront fees are spread across a different number of months. A shorter term places fees into fewer payments, which generally raises the effective rate, while a longer term spreads them out. Test a few term lengths with the same amount, rate, and fees to see how the figure shifts."
      ],
      [
        "Are all fees counted in the APR?",
        "Not every charge is treated the same way. Some fees are finance charges that affect the disclosed APR, while others may be classified differently in official disclosures. This calculator uses the upfront fees you enter, so include charges you know will be paid at closing and confirm the official figure before deciding."
      ],
      [
        "What if a lender will not itemize its fees?",
        "Ask for a written list of all upfront charges and the official disclosed APR before committing. Without those figures, any APR estimate is only a guess. Compare offers only when each one lists the same types of fees, and be cautious with any quote that will not itemize its charges."
      ]
    ]
  },
  "net-worth-calculator": {
    "answer": "Net worth is what you own minus what you owe. This calculator adds your cash, investments, property and other assets, then subtracts your mortgage, loans and credit card balances. The result is total assets minus total liabilities, computed entirely in your browser, so the figures you type are never sent anywhere.",
    "exampleInputs": {
      "cash": "15000",
      "investments": "60000",
      "property": "250000",
      "mortgage": "180000"
    },
    "sections": [
      {
        "heading": "What should go on each side of the ledger?",
        "text": "Assets are things with resale or cash value: checking and savings balances, brokerage and retirement accounts, the estimated value of a home or car, and collectibles you could sell. Liabilities are what you owe: mortgage principal, auto and student loans, and credit card balances. Use the balance you would see on a statement today rather than the original loan amount. Home and vehicle values are estimates, so a conservative figure is often more useful than an optimistic one. Keep the same method each time you update, so changes reflect real movement rather than shifting assumptions."
      },
      {
        "heading": "Why does the trend matter more than one number?",
        "text": "A single net worth figure is a snapshot, and it can swing with market prices or a car's depreciation. The more useful signal is the direction across several review periods. If assets grow faster than debts shrink, the figure rises even when income stays flat. Because the calculator is only arithmetic, a falling number is not automatically a problem. Paying down a mortgage moves money from liabilities into equity without changing the total much. Compare the same categories each time to see where a change came from."
      },
      {
        "heading": "What mistakes make the total misleading?",
        "text": "A common error is listing a home at its full value while omitting the mortgage that funds it, which inflates the result. Another is valuing retirement accounts without considering that withdrawals may later be taxed, so the balance can overstate what you could spend. Leaving out a credit card balance because you pay it off each month also distorts a single snapshot. Finally, mixing rough estimates with hard bank balances makes trends hard to trust. Note which figures are estimates so you know where the uncertainty sits."
      }
    ],
    "faqs": [
      [
        "Do I need to include my paycheck in net worth?",
        "No. Net worth measures a balance sheet at one moment, not cash flow. Income matters because it funds savings, and those savings then appear as assets, but the salary itself is not an asset. Use the calculator for what you hold and owe, and track income separately."
      ],
      [
        "How often should I update my net worth?",
        "Many people review it once a quarter or once a year. Updating monthly can help you spot debt growth, but daily market swings add noise without much insight. Pick a fixed schedule and use the same sources each time so the comparison stays meaningful."
      ],
      [
        "Can this calculator tell me how to reach a goal?",
        "No. It reports your current position and nothing about future returns, savings rates or spending. The output is an educational estimate, not financial advice. For retirement or debt payoff planning, a qualified professional can model scenarios using your full situation."
      ]
    ]
  },
  "cd-calculator": {
    "answer": "A certificate of deposit pays interest on a fixed deposit for a set term. This calculator compounds your deposit at the stated rate and frequency, then reports the maturity value. It also converts the result to annual percentage yield (APY), the effective yearly return that includes compounding. The math runs in your browser, and the output is an educational estimate.",
    "exampleInputs": {
      "principal": "10000",
      "rate": "4.5",
      "years": "2"
    },
    "sections": [
      {
        "heading": "When is a CD a good fit for savings?",
        "text": "A CD suits money you will not need until a known date, such as a down payment planned for next year or a reserve you prefer to leave untouched. Because the rate and term are fixed when you open the account, you can see the likely outcome in advance. Compare the maturity value against what a savings account might return over the same period, and remember that the deposit is locked. Matching the term to when you actually need the cash helps you avoid early withdrawal penalties later."
      },
      {
        "heading": "Why does APY read higher than the stated rate?",
        "text": "The stated rate is a nominal annual rate. When interest is added back to the balance and then earns interest of its own, the effective yield grows. That effective yield is the APY. Daily compounding produces a slightly higher APY than monthly compounding at the same rate, and annual compounding produces the lowest. Read the APY when comparing products, because it puts accounts with different compounding schedules on the same footing. The gap is small at low rates and grows as rates rise."
      },
      {
        "heading": "Where can a projection go wrong?",
        "text": "A projection assumes the rate stays fixed for the whole term and that you leave the money untouched. Many issuers charge a penalty for early withdrawal, which can reduce or eliminate the interest you earned. Inflation also erodes purchasing power, so a positive return can still lose ground after prices rise. Check whether the rate is promotional, whether interest is paid out or compounded, and whether the account renews automatically at a different rate when it matures."
      }
    ],
    "faqs": [
      [
        "Does compounding frequency change the final balance much?",
        "It changes the balance, but usually by a modest amount. Compounding more often adds a little interest on interest each period. Moving from annual to daily can noticeably raise the total on large deposits or long terms, while the gap between monthly and daily is often small. Use the calculator to compare the options side by side."
      ],
      [
        "Should I ladder CDs with different terms?",
        "A CD ladder splits savings across several maturity dates so that part of the money becomes available regularly. Each rung can be reinvested at prevailing rates when it matures. The tradeoffs are more accounts to track and possibly lower yields on some rungs. Model each rung separately with this calculator, then compare the total to a single longer term."
      ],
      [
        "Is an educational estimate the same as a bank quote?",
        "No. The calculator applies the standard compounding formula to the numbers you enter, so it shows what those terms imply on paper. The issuer's disclosure documents control the actual rate, fees, penalties and payment schedule. Confirm those terms directly with the bank before you open an account."
      ]
    ]
  },
  "break-even-calculator": {
    "answer": "The break-even point is the number of units you must sell so total revenue equals total costs. This calculator divides fixed costs by the contribution margin, which is price per unit minus variable cost per unit. Each sale contributes that margin toward covering fixed costs, and any units sold beyond break-even add to profit. Everything runs locally in your browser.",
    "exampleInputs": {
      "fixed": "10000",
      "price": "50",
      "variable": "20"
    },
    "sections": [
      {
        "heading": "Which costs belong in the fixed column?",
        "text": "Fixed costs stay roughly the same whether you sell ten units or a thousand. Typical examples include rent, insurance, software subscriptions, salaried staff and loan payments. Variable costs rise with each unit sold, such as materials, packaging, shipping and sales commissions. Some expenses are semi-variable, like a utility bill that climbs with production. Split those according to how they behave across the range of output you plan to run, and write down the assumption you made so you can revisit it."
      },
      {
        "heading": "What does the contribution margin tell me?",
        "text": "Contribution margin is the amount each unit adds toward fixed costs. If a product sells for fifty dollars and costs twenty to make, each sale contributes thirty. A higher margin means fewer sales are needed to break even. Margin also shows how sensitive profit is to price changes: a price cut shrinks the margin directly, which pushes the break-even count up. Compare margin per unit across products before deciding which to promote, since a high-volume product with a thin margin may still be the weaker line."
      },
      {
        "heading": "Where does the break-even model fall short?",
        "text": "The model assumes one constant price and one constant variable cost, which real businesses rarely have. Discounts, bulk pricing and rising supplier costs make the real cost curve bend. The model also ignores demand: knowing you need a certain number of sales does not tell you whether customers will buy that many. Taxes, interest on debt and working capital needs fall outside the calculation. Treat the output as a starting point for a conversation about pricing and volume rather than a forecast of profit."
      }
    ],
    "faqs": [
      [
        "How do I calculate break-even revenue instead of units?",
        "Multiply the break-even unit count by the price per unit. Equivalently, divide fixed costs by the contribution margin ratio, which is contribution margin divided by price. Both routes give the same revenue figure, so pick whichever matches the way your sales targets are written."
      ],
      [
        "Can break-even help me decide on a price change?",
        "Yes, by testing scenarios. Enter a higher or lower price and watch how the unit count moves. A small price cut can require a large jump in volume to hold the same profit, which is why sensitivity matters. Pair the result with an honest estimate of how demand would respond."
      ],
      [
        "What if my costs change every month?",
        "Recalculate with the updated figures, or use an average over a period you consider representative. Seasonal or unpredictable costs can make a single break-even number misleading, so consider running a few scenarios instead of relying on one. Keep notes on the assumptions behind each run so you can compare them later."
      ]
    ]
  },
  "overtime-calculator": {
    "answer": "Overtime pay is your hourly rate multiplied by overtime hours and by an overtime multiplier, commonly 1.5 for time-and-a-half. This calculator adds regular pay, which is rate times regular hours, to overtime pay, which is rate times overtime hours times the multiplier. You can change the multiplier for double time or other agreements. The math runs locally in your browser, and the result is an estimate.",
    "exampleInputs": {
      "rate": "25",
      "regular": "40",
      "overtime": "8",
      "multiplier": "1.5"
    },
    "sections": [
      {
        "heading": "Which hours count toward the overtime rate?",
        "text": "Overtime rules depend on where you work and the agreement you have, so the hours you enter should match your own pay terms. Hours above a weekly limit often qualify, while some salaried or exempt roles receive no overtime at all. Some arrangements use daily thresholds or special premiums for weekends or holidays. Check your pay stub or employment contract for the exact trigger. Enter the hours that earn the overtime premium in the overtime field, and the remaining hours in the regular field."
      },
      {
        "heading": "What does the multiplier do to the total?",
        "text": "The multiplier scales the hourly rate for each overtime hour. A multiplier of one means overtime is paid at the normal rate, which adds no premium. Time-and-a-half raises each overtime hour to one and a half times the base, and double time doubles it. Because only overtime hours use the multiplier, a larger overtime share changes the total far more than a small increase in the regular rate would. Change the multiplier and watch the total move to see that effect."
      },
      {
        "heading": "Why might my actual paycheck differ?",
        "text": "This calculator reports gross pay, before taxes, retirement contributions, insurance premiums and other deductions, so net pay will be lower. Hours logged in a timekeeping system may be rounded differently from the hours you enter, and some employers pay overtime on a different cycle than regular wages. Shift differentials, bonuses and commissions can also change the base rate used for overtime. Compare the estimate with a recent pay stub before relying on it."
      }
    ],
    "faqs": [
      [
        "Can I use this to estimate the effect of a raise?",
        "Yes. Change the hourly rate to the new figure and compare totals. Because overtime is calculated from the base rate, a raise increases both the regular and overtime portions. Run the calculation once with the old rate and once with the new, then subtract to see the difference."
      ],
      [
        "Does overtime pay include bonuses or tips?",
        "Not in this calculator. It multiplies a single hourly rate by the hours you enter. Some employers and jurisdictions include certain bonuses or shift premiums in the overtime base, which would raise the figure. If that applies to you, add the adjusted rate manually or confirm the treatment with your payroll team."
      ],
      [
        "Is the output professional payroll advice?",
        "No. The output is an educational estimate based on the numbers you enter. It does not account for local rules, deductions or exemptions, and it is not payroll or legal advice. Confirm your pay terms with your employer or a qualified professional."
      ]
    ]
  },
  "one-rep-max-calculator": {
    "answer": "A one-rep max is the heaviest weight you can lift for a single clean repetition. This calculator estimates it from a submaximal set using two formulas: Epley, weight times one plus reps divided by thirty, and Brzycki, weight times thirty-six divided by thirty-seven minus reps. It then lists 90 and 80 percent loads for training. Everything is computed locally in your browser.",
    "exampleInputs": {
      "weight": "100",
      "reps": "8"
    },
    "sections": [
      {
        "heading": "Which set should I enter?",
        "text": "The estimate is steadiest when the set is moderate, neither very light nor grinding to failure, and performed with good form. Sets close to failure can produce estimates that drift, because the formulas assume consistent effort throughout the set. Very high rep sets carry more error, since fatigue rather than maximal strength becomes the limit. Choose a load that you can repeat cleanly and that ends with a few reps left in reserve. Record the exercise and the rep count so you can compare results over time."
      },
      {
        "heading": "How do the Epley and Brzycki results compare?",
        "text": "Both formulas convert a submaximal set into a projected single-rep load, but they weight reps differently. Epley adds a fixed share for each rep, so its estimate rises gently with reps. Brzycki divides by a term that shrinks as reps increase, so its estimate climbs faster at higher reps. When the two results are close, the estimate is more stable. When they diverge, the set is probably far from a single-rep effort, and a lower-rep set will give a firmer number."
      },
      {
        "heading": "What are the limits of a calculated max?",
        "text": "A calculated one-rep max is an estimate built from one set, not a measured limit. Sleep, fatigue, technique and equipment can shift the result from day to day. Exercise choice matters as well: the formulas are generally applied to multi-joint lifts, and isolation movements may not follow the same pattern. The percentages are planning guides, so adjust loads based on how sets actually feel. Anyone with an injury or medical concern should discuss heavy training with a qualified coach or clinician before testing a true maximum."
      }
    ],
    "faqs": [
      [
        "Why does the estimate change with fewer reps?",
        "A set with fewer reps is usually performed closer to your limit, so the estimate tends to track the real maximum more closely. Longer sets rely more on endurance and pacing, which the formulas cannot see. Use a set you can complete with consistent form, and compare results across a few different rep counts."
      ],
      [
        "Is it safe to lift heavy without a spotter?",
        "Heavy lifting carries real risk, especially when testing a true maximum. Warm up thoroughly, use safety stands or a spotter, and stop if your form breaks down. This calculator does not replace supervised instruction. If you have a health condition, speak with a clinician before testing heavy loads."
      ],
      [
        "Can I use this for every exercise?",
        "You can enter any weight and reps, so the arithmetic works for any lift. Accuracy depends on how well the exercise fits the formulas, which are generally applied to common multi-joint barbell lifts. Machines, single-limb work and bodyweight movements can behave differently, so treat their estimates as rough guides."
      ]
    ]
  },
  "pace-calculator": {
    "answer": "Running pace is the time it takes to cover one unit of distance, usually minutes per kilometer or per mile. This calculator divides your total time in minutes by the distance, then formats the result as minutes and seconds per unit. It also shows speed, the distance covered per hour. Everything is computed locally in your browser, so your times stay on your device.",
    "exampleInputs": {
      "distance": "10",
      "hours": "0",
      "minutes": "55",
      "seconds": "0"
    },
    "sections": [
      {
        "heading": "How can I use this for race planning?",
        "text": "Enter a target finish time and the race distance to get the pace you need to hold. Then break the race into splits, such as each kilometer or mile, and print the list to carry on a card or set on your watch. Plan a slightly slower pace for the opening stretch, since early adrenaline often leads to overpacing. Treat the number as a target to test in training rather than a promise, because elevation, heat and crowds all affect real results."
      },
      {
        "heading": "Why do my watch and this result differ?",
        "text": "Pace from this tool is only as precise as the distance and time you type. GPS watches estimate distance from satellite signals, which can drift on winding routes, under tree cover or between tall buildings. Many devices also smooth pace over a rolling window, so their average may not match a simple division. Compare totals rather than single splits, and use a measured course when you need a reliable reference distance."
      },
      {
        "heading": "What mistakes do runners make with pace units?",
        "text": "The most common error is mixing kilometers with miles. A pace per mile is a longer time than the same pace per kilometer, so reading one as the other can throw a race plan badly off. Another is entering minutes in the seconds field, or leaving hours at zero while entering a time over an hour. Check that the total time matches your watch before trusting the output, and confirm that the distance matches the event."
      }
    ],
    "faqs": [
      [
        "Does pace change on hills?",
        "Yes. Uphill sections are slower, and downhill sections can be faster even at a similar effort. A flat average pace hides that variation. Many runners plan by effort on hilly courses rather than by a fixed split, and this calculator can help you check the overall average."
      ],
      [
        "Can I convert a pace from miles to kilometers?",
        "Yes. Convert the distance to the new unit first, then enter it with the same total time. The calculator is simplest when the distance is in the unit you want the pace in. Keep the total time unchanged, because only the distance unit changes."
      ],
      [
        "How much does a fast start affect the finish?",
        "A fast start spends energy you may need later. Starting a few seconds per unit slower than goal pace can help you hold the target through the end. Use the splits list to check that early pace stays controlled, and compare your finish to the plan after each training run."
      ]
    ]
  },
  "ideal-weight-calculator": {
    "answer": "Ideal body weight is a clinical reference weight estimated from height and sex. This calculator applies three published formulas, Devine, Robinson and Miller. Each takes a base weight for five feet and adds a fixed increment for every inch above that height. The three results are shown as a range, and the calculation runs locally in your browser as an educational estimate.",
    "exampleInputs": {
      "height": "172",
      "hUnit": "cm"
    },
    "sections": [
      {
        "heading": "What does a range tell me that one number does not?",
        "text": "Each formula was developed separately and produces a slightly different base, so a single figure would hide that spread. Showing the lowest and highest results gives a sense of how sensitive the estimate is to the method. A narrow range suggests the formulas agree at your height, while a wide one signals that the estimate depends heavily on assumptions. Treat the band as a reference zone rather than a target you must hit exactly, and avoid reading it as a verdict on your health."
      },
      {
        "heading": "Which height unit should I select?",
        "text": "Choose centimeters or inches to match the tape measure or chart you have. The calculator converts internally, so the same height should give the same range in either unit. Measure without shoes, and check that the number is in the unit you selected before reading the output. Mixing a height in centimeters with the inches setting is the most common error here, and it produces an implausible range, which is a quick sign to recheck the unit."
      },
      {
        "heading": "Where does ideal weight stop being useful?",
        "text": "Ideal body weight was developed for clinical dosing and does not measure body composition. Two people of the same height can differ widely in muscle, bone and fat. The formulas also ignore age, frame size and activity level. A person with a lot of muscle may read above the range while being healthy. Use the output as one reference point alongside waist measurements, activity levels and guidance from a clinician."
      }
    ],
    "faqs": [
      [
        "Does the sex setting change the result?",
        "Yes. Each formula uses separate constants for men and women, so changing the setting moves the whole range. The formulas are population-level approximations, so the setting is a modeling input rather than a measurement of your body."
      ],
      [
        "Can children use this calculator?",
        "These formulas are intended for adults, so this calculator is not designed for children or teenagers. Growth charts that account for age and development are the appropriate reference for younger people. If you are unsure whether a result applies to you, ask a pediatrician or physician."
      ],
      [
        "Why would a clinician use ideal body weight?",
        "Clinicians sometimes use ideal body weight to set certain medication doses or to calculate settings in specialized care, where actual weight can be misleading. It is a calculation input in those settings rather than a personal goal. This calculator does not provide clinical guidance."
      ]
    ]
  },
  "body-fat-calculator": {
    "answer": "Body fat percentage is the share of your body weight that is fat tissue. The US Navy tape method estimates it from height, neck and waist circumference, adding hip circumference for women, and then runs those lengths through logarithmic equations. The formula produces a quick estimate, not a measured value, and this calculator then places the result into a fitness category. Calculations run in your browser.",
    "exampleInputs": {
      "height": "172",
      "neck": "38",
      "waist": "85",
      "unit": "cm"
    },
    "sections": [
      {
        "heading": "Why does the tape method suit repeat checks?",
        "text": "Tape measurements need only a flexible tape and a few minutes, so they are easy to repeat at home. Because the same method is applied each time, changes over weeks are more informative than any single reading. Measure at the same time of day, with the same posture and tape placement, and record the unit you used. Small differences in tension or breathing can shift a result noticeably, so consistency matters more than chasing a precise number."
      },
      {
        "heading": "Which measurement points should the tape follow?",
        "text": "Wrap the tape around the neck just below the larynx, keeping it level and snug without compressing the skin. For the waist, the usual reference is at the navel, measured at the end of a normal exhale. For women, measure the hips at the widest point of the buttocks. Keep the tape parallel to the floor all the way around. A tape that slopes or sags between measurements will change the numbers and make comparisons unreliable."
      },
      {
        "heading": "What should the number not be used for?",
        "text": "The estimate is not a diagnosis, and it does not separate fat from muscle, bone or water the way a scan would. Athletes with dense muscle can read higher than their health status suggests, and the broad fitness categories may not fit every body type. The category is a general label drawn from typical ranges, so it should not drive crash dieting or extreme training. If the result worries you, discuss body composition with a qualified clinician."
      }
    ],
    "faqs": [
      [
        "Why does the hip measurement matter only for women?",
        "The US Navy equations use a different formula for women that includes hip circumference, reflecting how fat is distributed differently between the sexes. The men's calculation uses only neck and waist. If you choose the female setting, make sure the hip value is filled in and uses the same unit as the other measurements."
      ],
      [
        "Should I measure in the morning?",
        "Many people measure first thing in the morning, before eating or drinking, to reduce variation from food and fluid. The goal is consistency rather than a perfect time. Use the same time, posture and tape for every check so that trends reflect your body rather than your schedule."
      ],
      [
        "What if my measurements jump between sessions?",
        "Some change is normal because tape placement, breathing and tension all vary. Compare averages across two or three measurements taken on the same day, and look for trends over several weeks. A single large jump is often a measurement error rather than a real change in body composition."
      ]
    ]
  },
  "sleep-calculator": {
    "answer": "A sleep cycle calculator counts backward or forward from a target time in blocks of 90 minutes, the length of a typical sleep cycle. It adds about 15 minutes to fall asleep and returns times that align with cycle ends. Waking at a cycle end is the goal. The timing logic runs locally in your browser and is a planning guide, not a medical measure.",
    "exampleInputs": {
      "time": "07:00"
    },
    "sections": [
      {
        "heading": "Why does timing within a cycle matter?",
        "text": "Sleep moves through stages in cycles, with lighter and deeper phases. Waking during a deep phase often feels heavy and groggy, even after a long night. Timing an alarm near the end of a cycle tends to make the transition smoother. Total hours still matter most for recovery, so use cycle alignment as a fine-tuning tool rather than a reason to cut sleep short. If you must choose between a slightly later alarm and a cycle-aligned one, pick whichever gives you enough total sleep."
      },
      {
        "heading": "Which direction should I calculate?",
        "text": "Choose the wake up option when your schedule is fixed, such as a work start, and the tool will suggest bedtimes that finish cycles just before the alarm. Choose the go to sleep option when you can start winding down immediately and want to know when to set the alarm. Both directions use the same cycle length and the same fall-asleep allowance, so the results mirror each other. Enter times in 24-hour format, so seven in the evening is written as nineteen hundred."
      },
      {
        "heading": "What assumptions should I keep in mind?",
        "text": "Real sleep cycles vary in length from person to person and night to night, so the cycle grid is an approximation. The fall-asleep allowance is a typical average: some people drift off faster, and those who struggle to sleep may need longer. Caffeine, alcohol, room temperature and screen use all affect how quickly sleep begins and how deep it becomes. A neat plan cannot fix sleep deprivation. If you regularly wake unrefreshed, talk with a clinician about your sleep."
      }
    ],
    "faqs": [
      [
        "Can I use the calculator for a nap?",
        "Yes, but the model is built for overnight sleep. Naps are usually kept short so they end before deeper stages begin, and that timing varies by person. Use the calculator to plan a longer nap that ends at a cycle boundary, and treat the output as a starting point."
      ],
      [
        "What should I do if I wake before my alarm?",
        "Waking early often comes from stress, light exposure, timing or an irregular schedule rather than from the calculator itself. Keep a consistent wake time on most days, get morning light, and limit caffeine late in the day. If early waking persists, a clinician can help identify the cause."
      ],
      [
        "Does using the calculator replace medical advice?",
        "No. The calculator applies a simple timing model to the numbers you enter. It does not diagnose sleep disorders, and it cannot judge whether your sleep is adequate for your health. If you snore loudly, feel sleepy during the day or have trouble sleeping most nights, speak with a healthcare professional."
      ]
    ]
  },
  "a1c-calculator": {
    "answer": "An A1C result is a percentage that reflects average blood sugar over roughly the prior three months. This calculator converts it to estimated average glucose (eAG) in mg/dL using the ADA formula: eAG equals 28.7 times A1C minus 46.7. It also runs in reverse, turning a glucose average back into an estimated A1C. The math runs locally in your browser, and the output is educational, not a diagnosis.",
    "exampleInputs": {
      "value": "7"
    },
    "sections": [
      {
        "heading": "Why does an A1C-to-glucose conversion help?",
        "text": "Meter readings capture one moment, while A1C reflects a longer average. Translating A1C into eAG lets you compare it with the glucose numbers you see day to day. That comparison can make a lab result feel more concrete, and it gives you a shared language for conversations with a care team. The conversion describes an average relationship across many people. Individual results can differ because of red blood cell lifespan, anemia or other factors that change how glucose attaches to those cells."
      },
      {
        "heading": "Which way should the conversion run?",
        "text": "Pick A1C to average glucose when you start with a lab percentage and want the estimated glucose equivalent. Pick average glucose to A1C when you have a set of meter readings and want the percentage they would correspond to. Enter the value in the matching units, percent for A1C and mg/dL for glucose. Confirm the direction before reading the output, because entering the wrong unit produces a number that is valid arithmetic but clinically meaningless."
      },
      {
        "heading": "What should the conversion not be used for?",
        "text": "The eAG figure is a statistical estimate, not a measured average, and it can be less reliable for people with conditions that change red blood cell turnover, such as some anemias, pregnancy, recent blood loss or kidney disease. Decisions about diagnosis, dosing or treatment changes should rest on clinical testing and the advice of a care team. A converted number is useful for context and conversation, but it does not replace a lab report or a clinician's review."
      }
    ],
    "faqs": [
      [
        "Can I convert a glucose reading into A1C?",
        "Yes, using the reverse direction of the same formula. Average glucose in mg/dL is converted by adding 46.7 and dividing by 28.7. The result is an estimate, and it is steadier with averages built from many readings over several weeks rather than a single value."
      ],
      [
        "Why do my meter readings and A1C sometimes disagree?",
        "Meter readings are snapshots that rise and fall with meals, activity and medication timing, while A1C averages a longer window. Differences also come from how many readings you took and when you took them. Conditions that alter red blood cell lifespan can push the two apart. Discuss persistent gaps with your clinician."
      ],
      [
        "Should I change my medication based on this result?",
        "No. Any change to medication or treatment goals should come from a clinician who knows your history and lab results. This calculator only performs a unit conversion between two measures. Bring the converted numbers to your appointment if they help the discussion."
      ]
    ]
  },
  "quadratic-formula-calculator": {
    "answer": "This calculator solves a quadratic equation in the form ax² + bx + c = 0 using the quadratic formula: x equals negative b, plus or minus the square root of b squared minus 4ac, all divided by 2a. The discriminant, b squared minus 4ac, decides the result. Positive gives two real roots, zero gives one repeated root, and negative gives a complex conjugate pair.",
    "exampleInputs": {
      "a": "2",
      "b": "-5",
      "c": "3"
    },
    "sections": [
      {
        "heading": "When should I use the quadratic formula?",
        "text": "Reach for this tool when a problem reduces to a second-degree polynomial set equal to zero, such as the height of a thrown object over time or a break-even point in a simple profit model. Factoring is faster when the numbers split neatly, but many real coefficients do not factor cleanly, and the formula works either way. Enter a, b, and c exactly as they appear in your equation, keeping every sign. If the equation is not yet in standard form, move all terms to one side first so the right side is zero. The calculator reads each coefficient literally, so a missing term means its coefficient is zero."
      },
      {
        "heading": "How should I read a complex root result?",
        "text": "A complex root appears when the discriminant is negative, which means the parabola never touches the x-axis. The two roots are conjugates: they share the same real part, negative b over 2a, and their imaginary parts are equal in size but opposite in sign. Complex roots are not errors. They tell you the equation has no real solution, while still carrying meaning in fields such as electrical engineering, where they describe oscillating behavior. When the discriminant is exactly zero, the two roots merge into one repeated real value, and the parabola just touches the axis at its vertex."
      },
      {
        "heading": "What mistakes make the roots look wrong?",
        "text": "The most common error is a sign slip on b. Because the formula starts with negative b, entering b with the wrong sign flips the answer. Another is mixing up c, which is the constant term, with the coefficient of x. Rounding also matters: when b squared and 4ac are very close, subtracting them loses precision, so a tiny discriminant can look like zero even when it is not. Finally, check the answer by substituting each root back into the original equation. If both return zero, the roots are correct for the coefficients you entered."
      }
    ],
    "faqs": [
      [
        "Can the coefficients be decimals or fractions?",
        "Yes. The formula works with decimal coefficients, and the roots are shown as rounded decimals for readability. If you need exact fractional roots, simplify the square root of the discriminant by hand, since the displayed values are approximations for most inputs."
      ],
      [
        "Does the order of a, b, and c matter?",
        "Yes, because each letter has a fixed role. a multiplies x squared, b multiplies x, and c is the constant term. Swapping b and c produces a different equation with different roots, so always write the equation in standard form before reading off the coefficients."
      ],
      [
        "Why can the formula return the same answer twice?",
        "That happens when the discriminant equals zero, so the plus-or-minus part adds nothing to the result. The parabola's vertex then sits exactly on the x-axis, which creates one repeated root. Mathematicians sometimes call this a double root, and it marks the boundary between real and complex solutions."
      ]
    ]
  },
  "lcm-calculator": {
    "answer": "This calculator returns the greatest common factor and least common multiple of a list of whole numbers. The GCF is found with Euclid's algorithm, which repeatedly replaces the larger number with the remainder until nothing remains. The LCM of a pair equals their product divided by their GCF, and that rule is applied across the whole list one pair at a time.",
    "exampleInputs": {
      "list": "8, 12, 20"
    },
    "sections": [
      {
        "heading": "Where do LCM and GCF show up in practice?",
        "text": "Least common multiples help when events repeat on different cycles. If one bus leaves every twelve minutes and another every eighteen, the LCM of those gaps tells you when both leave together again. Greatest common factors help when splitting things into equal groups, such as dividing twelve red and eighteen blue tiles into identical packs with nothing left over. The GCF gives the largest pack size that works for both colors. Fraction simplification uses the same idea: dividing the top and bottom by their GCF reduces the fraction to lowest terms."
      },
      {
        "heading": "How should I interpret the list output?",
        "text": "Read the GCF as the biggest number that divides every entry without a remainder, and the LCM as the smallest number that every entry divides into evenly. When you enter three or more values, the calculation runs pairwise, so each intermediate result feeds the next step. Check any result by dividing the LCM by each input; every division should come out whole. If one value is a multiple of all the others, it becomes the LCM of the list, which is a quick shortcut to recognize."
      },
      {
        "heading": "What mistakes should I avoid with these numbers?",
        "text": "The most frequent mistake is mixing up GCF and LCM. The GCF is never larger than the smallest input, while the LCM is never smaller than the largest. Another is entering decimals or negative numbers, since the method is defined for whole numbers. Separate entries with commas or spaces, and confirm that every value you intended is in the list before reading the result. Finally, adding one more number can change both answers, so recompute whenever you extend a list rather than reusing an earlier result."
      }
    ],
    "faqs": [
      [
        "Is the GCF always smaller than the LCM?",
        "For distinct positive whole numbers, the GCF is never larger than the smallest input and the LCM is never smaller than the largest, so the GCF comes out smaller. A special case is a pair where one divides the other, like 4 and 8, which gives a GCF of 4 and an LCM of 8."
      ],
      [
        "How do I find these by hand for a long list?",
        "Write each number as a product of primes. The GCF takes each shared prime at its lowest power, and the LCM takes every prime at its highest power. For longer lists the pairwise method used here is faster, but the prime method makes the logic visible for homework."
      ],
      [
        "Can I use the GCF to simplify a fraction?",
        "Yes. Divide the numerator and the denominator by their GCF, and the fraction reduces to lowest terms. Entering the two numbers as a pair gives you the value to divide by, and the reduced fraction has no common factor left above one."
      ]
    ]
  },
  "square-root-calculator": {
    "answer": "This tool returns the principal square root of a number, the non-negative value that multiplied by itself gives back the original input. For a negative input, the result is imaginary: the square root of the absolute value, multiplied by i, where i is the imaginary unit. Results are shown to eight-digit precision and labeled so the real and imaginary parts stay clear.",
    "exampleInputs": {
      "n": "144"
    },
    "sections": [
      {
        "heading": "When is a square root the right tool?",
        "text": "Square roots appear whenever you know an area or a squared quantity and need the side or base that produced it. A square tile with a known area needs its root to find the edge length. Standard deviation is the square root of variance, and distance formulas in coordinate geometry take the root of a sum of squares. Use the principal, positive result for ordinary real problems. Use the imaginary result for negative inputs only when your work involves complex numbers, because it has no meaning on a real number line."
      },
      {
        "heading": "How do I read an imaginary result?",
        "text": "A negative input has no real square root, because squaring any real number produces a non-negative value. The tool writes the answer as a real magnitude multiplied by i, where i is defined as the square root of negative one. The root of a negative number therefore equals the root of its positive counterpart times i. Treat this as a correct mathematical result rather than a failure, and confirm whether your context calls for complex numbers before using it."
      },
      {
        "heading": "What common mistakes come with roots?",
        "text": "A frequent mistake is treating the principal root as the only solution to an equation. The principal square root is positive, but solving x squared equals a positive number gives two answers, one positive and one negative. Squaring both sides of an equation can also introduce false solutions, so test each candidate in the original equation. Rounding is another limit: an irrational root is shown as an approximation, so do not treat the displayed value as exact unless the input is a perfect square."
      }
    ],
    "faqs": [
      [
        "Does the tool handle very large or very small numbers?",
        "It handles ordinary decimal inputs well, and results are shown with a fixed level of precision. Extremely large or tiny values can lose detail in display, so compare the magnitude of the result against your expectation before relying on it."
      ],
      [
        "Is the square root of a decimal found the same way?",
        "Yes. The principal root of a decimal is the non-negative number that squares back to it, so a quarter has a root of one half. Decimal inputs follow the same rule as whole numbers, and the output uses the same display precision."
      ],
      [
        "Can I take a cube root with this tool?",
        "No, this tool only computes square roots. A cube root asks for a number that, multiplied by itself three times, gives the input, which is a different operation. Use a dedicated cube root or exponent tool for that calculation."
      ]
    ]
  },
  "standard-deviation-calculator": {
    "answer": "This calculator finds the mean of a list, then the variance as the average squared distance from that mean, and the standard deviation as the square root of the variance. Population variance divides the sum of squared differences by n. Sample variance divides by n minus one, a correction for estimating spread from a subset of a larger group.",
    "exampleInputs": {
      "list": "2, 4, 4, 4, 5, 5, 7, 9"
    },
    "sections": [
      {
        "heading": "When should I pick sample or population?",
        "text": "Use population when your list includes every member of the group you care about, such as all students in a single class. Use sample when your list is a subset meant to estimate a larger group, such as surveying a few hundred customers to describe thousands. The sample version divides by n minus one because a sample tends to understate spread, and that correction offsets the bias. If you are unsure, ask whether the list is the whole group or a slice of it."
      },
      {
        "heading": "How do I interpret the spread number?",
        "text": "Standard deviation is in the same units as your data, which makes it easier to read than variance, whose units are squared. A small value means most numbers sit close to the mean, and a large value means they are scattered widely. For data that is roughly bell-shaped, most values usually fall within one standard deviation of the mean, though that pattern depends on the shape of the distribution. Compare standard deviations only between data sets measured in the same units."
      },
      {
        "heading": "What mistakes distort the result?",
        "text": "Outliers pull both the mean and the squared distances upward, so a single extreme value can inflate the standard deviation dramatically. Mixing separate groups into one list hides real differences between them, and the combined spread may look misleading. Treating a sample as if it were a full population is another common error, and it slightly underestimates the spread. Check for typos as well, such as an extra zero, because one misplaced value changes the mean and the spread together."
      }
    ],
    "faqs": [
      [
        "Can I enter negative or decimal numbers?",
        "Yes. The formulas work for any real numbers, including negatives and decimals, because they rely only on addition, subtraction, multiplication, division, and a square root. Keep the entries separated by commas or spaces so each one is read as its own value."
      ],
      [
        "How many values do I need?",
        "A single number has no spread around its mean, so at least two values are needed for a meaningful result. Sample standard deviation requires at least two values as well, because dividing by n minus one with only one value would mean dividing by zero. More values generally give a steadier estimate of spread."
      ],
      [
        "Does the order of the numbers matter?",
        "No. Variance and standard deviation depend only on which values appear and how often, not on their sequence. Reordering the list leaves the mean, variance, and standard deviation unchanged, so you can paste data in any order."
      ]
    ]
  },
  "prime-factorization-calculator": {
    "answer": "This calculator splits a whole number into the prime numbers that multiply together to produce it. It divides by successive primes, up to the square root of what remains, and records each prime until only one is left. The result appears in exponent form, where repeated primes are grouped, and as a full list.",
    "exampleInputs": {
      "number": "360"
    },
    "sections": [
      {
        "heading": "When do I need prime factors?",
        "text": "Prime factors help when you simplify fractions, find a common denominator, or check whether one number divides another. They also reveal the structure behind the GCF and LCM, since shared primes determine both. In cryptography and computing, prime factors matter because multiplying two large primes is easy while recovering them from the product is hard. This tool is meant for everyday-sized integers, though, so treat it as a learning and checking aid rather than a security tool."
      },
      {
        "heading": "How do I read exponent form?",
        "text": "Exponent form groups repeated primes, so a prime that appears three times is written once with a small raised three. Read each base as a prime and each exponent as the number of copies multiplied together. Multiplying every base raised to its exponent returns the original number, which makes a quick check. If the number is itself prime, the factorization is just that number, and the primality check reports it directly."
      },
      {
        "heading": "What mistakes come up with factor trees?",
        "text": "A common error is treating one as a prime. It is neither prime nor composite, so it never appears in a factorization. Another is stopping early on a factor tree and leaving a composite branch unfinished. Different tree layouts can look unlike each other, yet the final set of primes stays the same. Input size also matters: trial division is efficient for everyday integers, so very large values may take noticeably longer to process."
      }
    ],
    "faqs": [
      [
        "Is 1 a prime number?",
        "No. A prime has exactly two distinct positive divisors, one and itself, and the number 1 has only one. For that reason 1 is excluded from prime factorizations, so the list for any number greater than one contains only primes."
      ],
      [
        "Does the order of the factors matter?",
        "The list is usually written from the smallest prime to the largest, which makes comparison easy. Any order of the same primes gives the same product, and the fundamental theorem of arithmetic states that each whole number greater than one has exactly one such factorization apart from ordering."
      ],
      [
        "Can I use the factorization to find the GCF?",
        "Yes. The GCF takes each prime that appears in both factorizations, using the smaller exponent. The LCM takes every prime that appears in either one, using the larger exponent. Comparing exponent forms makes both values quick to read."
      ]
    ]
  },
  "pythagorean-theorem-calculator": {
    "answer": "This calculator solves a right triangle with the Pythagorean theorem, which states that the square of the hypotenuse equals the sum of the squares of the two legs: a squared plus b squared equals c squared. Enter any two sides, leave the unknown as zero, and the tool rearranges the formula to find the third side.",
    "exampleInputs": {
      "a": "5",
      "b": "12",
      "c": "0"
    },
    "sections": [
      {
        "heading": "When can I use this on a real project?",
        "text": "Use it when a triangle has a verified right angle, such as a room corner, a square frame, or a ramp meeting a level floor. Carpenters and surveyors use the same relationship to check that corners are square by comparing diagonals. Confirm the corner is actually a right angle before trusting the output, because a slightly off angle changes the hypotenuse. Measure both legs from the same reference point and in the same units so the inputs line up."
      },
      {
        "heading": "How do I tell the hypotenuse from a leg?",
        "text": "The hypotenuse is always the longest side and sits opposite the right angle. When you solve for a leg, the calculation subtracts the known leg's square from the hypotenuse's square, so the hypotenuse must be longer than the other known side. If you enter a hypotenuse shorter than a leg, no real triangle exists. Area uses half the product of the legs, and perimeter adds all three sides, so area is only meaningful once both legs are known."
      },
      {
        "heading": "What common mistakes should I avoid?",
        "text": "The biggest mistake is entering the hypotenuse as a leg, which swaps the roles inside the formula. Another is leaving an unknown side blank when the tool expects zero. Mixing units, such as feet for one side and inches for another, produces a meaningless result. Finally, the theorem applies only to right triangles, so this tool does not describe general triangles. For other shapes, use a method that works from the sides or angles you actually have."
      }
    ],
    "faqs": [
      [
        "Can I solve for a leg if I know the hypotenuse?",
        "Yes. Enter the hypotenuse and one leg, leave the other leg as zero, and the tool subtracts the known leg's square from the hypotenuse's square before taking the square root. The result must be positive, which requires the hypotenuse to be longer than the leg you entered."
      ],
      [
        "Does the unit I choose change the result?",
        "No. The theorem works in any unit, so the output uses whatever unit you entered. If both legs are in meters, the hypotenuse is in meters too, while the area is in square meters. Mixed units are the real risk, so convert every side before entering it."
      ],
      [
        "Why is my hypotenuse a long decimal?",
        "Many side lengths produce square roots that cannot be written as a finite decimal. The tool rounds these for display, so the value is a close approximation. Triangles whose sides are all whole numbers are the special case where the result comes out as a whole number."
      ]
    ]
  },
  "triangle-area-calculator": {
    "answer": "This calculator finds the area of a triangle two ways. Base and height multiplies the base by the perpendicular height and halves the product. Heron's formula uses only the three side lengths: it computes the semi-perimeter, half the sum of the sides, then takes the square root of the semi-perimeter times each side's difference from it.",
    "exampleInputs": {
      "base": "12",
      "height": "5"
    },
    "sections": [
      {
        "heading": "When should I use Heron's formula instead?",
        "text": "Use Heron's formula when you know the three side lengths but cannot measure a perpendicular height, such as a triangular plot bounded by three straight edges. It is also useful in surveying and design when the height falls outside the drawing. Base and height is faster when the height is easy to measure, like a triangle drawn on graph paper with a visible altitude. Both methods give the same area for the same triangle, so choose whichever inputs you already have."
      },
      {
        "heading": "How do I know three sides form a triangle?",
        "text": "Three lengths form a real triangle only when the two shorter sides together are longer than the longest side. If they are not, the sides cannot meet to close a shape, and the product inside Heron's formula turns negative. The tool validates the sides before computing, so an impossible set is caught rather than silently producing a number. If you hit that check, re-measure, since a typo is a frequent cause."
      },
      {
        "heading": "What mistakes lead to a wrong area?",
        "text": "Mixing units is the most common error, such as entering the base in feet and the height in inches. Using a slanted side as the height is another, because the height must be perpendicular to the base. For Heron's formula, sides that do not belong to the same triangle can produce a plausible number that describes nothing real. Area is always expressed in square units of the input, so label the answer accordingly."
      }
    ],
    "faqs": [
      [
        "Is the base always the bottom side?",
        "No. Any side can serve as the base, as long as you use the height measured perpendicular to that same side. Choosing the longest side often makes the height easier to see in a drawing. The area stays the same no matter which side you pick."
      ],
      [
        "Does a triangle's area change if I rotate it?",
        "No. Area depends only on the shape and size of the triangle, not its orientation on the page. Rotating or moving it leaves the base, height, and side lengths unchanged, so the computed area stays identical."
      ],
      [
        "Why must the height be perpendicular?",
        "The height is the straight distance from the opposite corner to the line containing the base, measured at a right angle. A slanted line would be longer than the true height and overstate the area. Perpendicular height matches the geometry that the half base times height formula assumes."
      ]
    ]
  },
  "add-days-to-date": {
    "answer": "This calculator adds or subtracts a chosen number of days, weeks, months, or years from a start date, using the real calendar. Days and weeks are straight counts of calendar days. Months and years keep the same day of the month when possible, and if that day does not exist in the target month, the result moves to the last day of that month.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is this useful for deadlines?",
        "text": "Use it to project a deadline forward, such as a warranty end, a follow-up call, or a review window measured from a signing or delivery date. It also works backward: subtract a number of days from a due date to find when a task should begin. Because the output names the weekday, you can see at once whether a deadline lands on a weekend and plan around it. Confirm with the party who set the deadline whether counting begins on the day after the event or on the event itself."
      },
      {
        "heading": "How do month and year additions behave?",
        "text": "Adding months keeps the day of the month when possible. When the start falls on a day that the target month lacks, the calendar clamps the result to that month's last day, so a date near the end of a long month can land at the end of a shorter one. Adding years follows the same logic, which matters for a date on a leap day. Month results can look surprising at first, so check the output against your own calendar before committing to it."
      },
      {
        "heading": "What mistakes change the answer?",
        "text": "The most common mistake is counting the start date itself, which shifts the result by one day. Another is mixing weeks with working days, because adding weeks is pure calendar time with weekends included. Time zones can matter when a date sits near midnight on a shared deadline. Finally, negative amounts subtract, so confirm the sign before reading the result, especially when you are working backward from a fixed date."
      }
    ],
    "faqs": [
      [
        "Does the start date count as day one?",
        "Usually not. Adding a set number of days to a date gives the date that many calendar days later, so the start itself is day zero. If your policy counts the start as day one, subtract one day from the result. Check the convention in the contract or policy that sets the deadline."
      ],
      [
        "Can I leave the start date empty?",
        "Yes. The start date field defaults to today, so leaving it blank projects forward from the current day. Enter a specific date when you need a fixed answer, because a blank field gives a different result on each day you check it."
      ],
      [
        "Why does the weekday matter?",
        "Many deadlines fall on weekends, and some offices or processes do not accept submissions then. Seeing the weekday next to the result helps you decide whether to move the date earlier. The tool names the weekday of the computed date, but it does not decide which days count as working days."
      ]
    ]
  },
  "business-days-calculator": {
    "answer": "This calculator counts the working days between two dates by stepping through each calendar day in the range and tallying weekdays separately from weekend days. Both the start and end dates are included. The tool reports business days, weekend days, and total days, so the three figures reconcile with each other.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do business day counts matter?",
        "text": "Delivery estimates, project schedules, and service-level agreements often promise results in working days rather than calendar days. A ticket with a three-business-day target, for instance, is measured in weekdays only, so a Friday request and a Monday request follow different calendars. Notice periods and review windows follow similar logic in many workplaces. Counting only weekdays prevents the common error of promising a delivery on a day when nobody is working."
      },
      {
        "heading": "How should I read the three totals?",
        "text": "The business day count and the weekend count should add up to the total day count, which is a quick sanity check. Because both endpoints are included, a range that starts and ends on a Monday contains more days than a simple subtraction suggests. If you need the gap between two dates rather than an inclusive count, subtract one from the total. Read the business day figure as the number of working days you have to act within, not as a calendar span."
      },
      {
        "heading": "What mistakes change the business day count?",
        "text": "Public holidays are a separate question. Check whether the count accounts for closures before relying on it for a schedule that includes them, since a week with a holiday has fewer working days than the weekday tally shows. Another mistake is treating the end date as exclusive when your agreement counts it. Also confirm whether your organization works a different week, because the standard Monday-to-Friday assumption may not match your team."
      }
    ],
    "faqs": [
      [
        "What if the start date falls on a weekend?",
        "The start date still appears in the total, but as a weekend day, so it adds to the weekend tally and not to the business day count. The same rule applies to the end date. The three numbers stay consistent with each other."
      ],
      [
        "What happens if the end date is earlier than the start?",
        "Put the earlier date first. A count is defined from a start to a later end, so a reversed pair does not describe a forward span. Reorder the two entries before reading the totals so the result matches the period you meant to measure."
      ],
      [
        "Is Saturday always a non-working day?",
        "For most standard schedules, yes, but the definition is set by your organization or contract, not by the calendar. Some industries work weekends or use rotating shifts. The tool follows the usual weekend assumption, so adjust your reading if your working week is different."
      ]
    ]
  },
  "time-duration-calculator": {
    "answer": "This calculator finds the elapsed time between a start and an end clock time in 24-hour format. It converts both times to minutes from midnight and subtracts them. If the end time is earlier than the start, the span is treated as crossing midnight and 24 hours are added before the result appears as hours, minutes, total minutes, and decimal hours.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When do I need a duration rather than a time?",
        "text": "A duration answers how long something took, such as a shift, a meeting block, or a repair window, while two clock times describe when it began and ended. Timesheets, hourly billing, and travel planning usually need the length rather than the endpoints. Subtracting times by hand invites errors when the span crosses midnight or when minutes do not divide evenly, so a calculator removes that friction. Enter the start and end as they appear on your clock or schedule."
      },
      {
        "heading": "Why are decimal hours useful?",
        "text": "Decimal hours express a duration as one number, which makes multiplying by an hourly rate straightforward. A span of hours and minutes becomes decimal by dividing the minutes by sixty and adding the result to the whole hours. Many invoicing forms ask for decimal hours, though the rounding rules come from your billing system. Read the decimal as a fraction of an hour, not as hours and hundredths of a clock."
      },
      {
        "heading": "What mistakes come from overnight spans?",
        "text": "The most common error is entering a late evening start and an early morning end and reading the result as negative or wrong. The tool assumes a span crosses midnight when the end precedes the start, so a span lasting a full day or longer cannot be expressed by clock times alone. Also watch the format: the field expects 24-hour times, so an afternoon time entered as a morning time shifts the answer by hours."
      }
    ],
    "faqs": [
      [
        "What if the start and end times are identical?",
        "Identical times produce a zero-length duration under the midnight rule, because the end is not earlier than the start and no 24 hours is added. Whether you need zero or a full day depends on the situation, so check the span manually for shifts that repeat every day."
      ],
      [
        "Can I use the total minutes in a spreadsheet?",
        "Yes. The total minutes figure is the whole span expressed as minutes, which pastes cleanly into a spreadsheet and sums easily across rows. Decimal hours serve the same purpose. Keep the original start and end times beside the result so you can verify each entry later."
      ],
      [
        "Does the tool account for daylight saving changes?",
        "The calculation uses the clock times you type, so it does not know whether a clock change happened between them. On a night when clocks shift, the real elapsed time can differ by an hour from the clock difference. Check the change manually when a span crosses that boundary."
      ]
    ]
  },
  "day-of-week-calculator": {
    "answer": "This day of the week calculator takes a calendar date and returns the weekday it falls on, such as Monday or Friday. It also reports the day of the year and whether the year is a leap year. The weekday comes from the Gregorian calendar rules, which account for leap years automatically, so past and future dates both work. Everything is computed in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What is a day of the week calculator used for?",
        "text": "People use a day of the week calculator to answer practical date questions. You can find the weekday of a birthday, an anniversary, or a historical event to see whether it fell on a weekend. Planners use it to check whether a deadline lands on a business day, and teachers use it when building lesson calendars. Because the answer comes from the calendar date alone, the same entry always returns the same weekday. That makes it useful for checking a date you have written down before you commit to it in a contract, invitation, or schedule."
      },
      {
        "heading": "What does the day of the year number tell me?",
        "text": "The day of the year counts how far a date sits from the start of its calendar year. January 1 is day 1, and the count runs until the last day of December. The total is three hundred sixty five in an ordinary year and three hundred sixty six in a leap year. The number is useful for logs, project timelines, and any system that numbers days in sequence. Two dates in different years can share the same day of the year while falling on different weekdays, so read the weekday and the year together."
      },
      {
        "heading": "Why can a weekday look wrong for very old dates?",
        "text": "Weekday results depend on the calendar system used at the time. The calculator follows the Gregorian calendar rules, which most countries now use. Before those rules were adopted in a given region, people counted dates with the older Julian calendar, which ran several days behind. A date written in a historical record may therefore name a different weekday than the same date would in the calendar used today. Check which calendar a source used before you rely on a computed weekday for historical research. For modern dates, the result matches the calendar on your wall."
      }
    ],
    "faqs": [
      [
        "Can I check a date that is years in the future?",
        "Yes. The calculator applies the same calendar rules to future dates as to past ones, so you can check a deadline, a planned event, or an anniversary that has not happened yet. The result is computed from the date you enter, so nothing needs updating as time passes."
      ],
      [
        "Does the leap day fall on the same weekday every year?",
        "No. A fixed calendar date usually shifts forward by one weekday each year, and a leap day falling in between moves it by two. That is why a birthday on a Friday one year may land on a Sunday a few years later."
      ],
      [
        "Is the weekday the same in every time zone?",
        "Yes, for a plain calendar date. The weekday is set by the date itself, not by the clock time or your location. Time zones only matter when you compare a specific moment, such as an event starting late in the evening, against a date stored in another zone."
      ]
    ]
  },
  "unit-converter": {
    "answer": "A unit converter changes a value from one unit to another by passing through a shared base unit. Each unit has a fixed factor relating it to that base, so you multiply the input by its factor and divide by the target's factor. Temperature is the exception because its scales start at different zero points, so it uses formulas instead. Every calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I reach for a unit converter?",
        "text": "A unit converter helps whenever a number arrives in a unit you do not use daily. Travelers meet road distances in kilometers, cooks see recipes written in grams or milliliters, and shoppers compare product specs listed in different systems. Engineers and students use the same tool to check a hand calculation before submitting it. The main benefit is speed and consistency: once the units are set, you can change the value and see every related result without rebuilding the arithmetic yourself each time."
      },
      {
        "heading": "What role does the base unit play?",
        "text": "The base unit is the common reference that every other unit links to. Instead of storing a separate factor for every possible pair, the converter stores one factor per unit, relative to the base. To move from feet to yards, it first converts feet into the base, then converts that amount into yards. This keeps the logic consistent across categories and avoids chains of rounding errors, because only the final display step rounds the value. Understanding this helps explain why two different paths between the same units always agree."
      },
      {
        "heading": "Where do unit conversions usually go wrong?",
        "text": "The most common mistake is mixing units that share a name but differ in size. Gallons, ounces, and tons each come in more than one version, so the label alone does not tell you the amount. Another frequent problem is converting a rate or density as if it were a plain quantity, which changes the meaning of the result. Finally, avoid rounding intermediate steps by hand. Enter the original value and let the converter handle the full chain, then round only the final answer to the precision you need."
      }
    ],
    "faqs": [
      [
        "Can I convert between different categories, such as length and weight?",
        "No. A length cannot become a mass, because the units measure different physical quantities. Each category has its own set of units and its own base unit. Pick the category first, then choose the units within it. If a result seems to mix categories, check that both units belong to the same group."
      ],
      [
        "Why does the displayed result sometimes look shorter than the full value?",
        "The converter keeps the full value internally and shows it at a readable precision, which can cut off long decimal tails. For a result that will feed into another calculation, carry the extra decimals forward instead of copying the rounded display."
      ],
      [
        "Is my data sent to a server when I convert?",
        "No. The calculation happens in your browser, so the values you type are processed on your own device. You do not need to create an account to run ordinary conversions."
      ]
    ]
  },
  "length-converter": {
    "answer": "The length converter turns a distance from one unit into another, such as meters into feet or kilometers into miles. Each unit is defined as an exact amount of meters, so the converter multiplies your value by the source unit's meter factor and divides by the target's. Metric and imperial units are covered in one place, and the calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Who gets the most use from a length converter?",
        "text": "Length conversions show up in many everyday tasks. Someone reading a race course description in kilometers may want the figure in miles, and a traveler checking road signs may need meters translated into feet. Sewers, woodworkers, and home renovators often work from plans written in another system, and a quick conversion prevents cutting material to the wrong size. Students comparing textbook values with local measurements also rely on the same conversions. Anyone who switches between metric and imperial benefits from having both units in one place."
      },
      {
        "heading": "What does an inch to centimeter result mean?",
        "text": "Some length units are defined directly in terms of other units, which is why certain conversions look unusually tidy. The inch is fixed in relation to the centimeter, so the converter applies that fixed relation rather than an estimate taken from a physical ruler. When you see a long string of decimal places, that is usually the exact factor at work rather than an error. The displayed precision controls how many decimals appear, while the underlying calculation uses the full defined factor. Keep this in mind when comparing a converted figure with a physical measurement, since a tape measure has its own tolerance."
      },
      {
        "heading": "What mistakes come up with distances?",
        "text": "Distance mistakes are usually about the unit, not the arithmetic. Statute miles and nautical miles are different lengths, and a marine chart uses the nautical version. The US survey foot differs slightly from the international foot, which matters for surveying and land records. Another common error is rounding too early: convert the original value, then round the final answer. If you convert in several steps, keep the extra decimals until the end. Finally, check whether a number is a length or a speed before you convert, since both can look similar on a page."
      }
    ],
    "faqs": [
      [
        "Can I convert feet and inches together in one step?",
        "Convert the feet and inches as separate values, then add the results in the target unit. Because a foot is twelve inches, you can also turn the whole height into inches first, which is often the cleanest route to one final figure. Either path gives the same total because the factors are exact."
      ],
      [
        "Is a yard longer than a meter?",
        "No. A yard is shorter than a meter, so a meter always converts to more than one yard. The difference is small enough that people often mix the two in rough estimates, but the converter uses the exact definition for each unit and will not confuse them."
      ],
      [
        "Does the converter round my number before it converts?",
        "No. The calculation uses the exact factors and only limits the decimals shown on screen. If you need a rounded figure for a document, round the final result rather than the input, so the error stays small."
      ]
    ]
  },
  "weight-converter": {
    "answer": "The weight converter changes a mass from one unit to another, such as kilograms to pounds or stone to kilograms. Each unit passes through kilograms using a fixed factor, with one pound defined exactly in kilograms and one stone equal to fourteen pounds. You multiply the input by its kilogram factor and divide by the target's factor. The calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Which tasks call for a weight converter?",
        "text": "A weight converter is handy for shipping, where carriers may list limits in pounds while your scale reads kilograms. It also helps with luggage, recipes that switch between grams and ounces, and product labels from other countries. Gym equipment, fishing gear, and garden supplies often carry weights in mixed units. Because the converter works from exact definitions, you can enter the number printed on the item and get a figure you can compare directly with your own limit or scale, without estimating the conversion in your head."
      },
      {
        "heading": "What is a stone, and why does it show up?",
        "text": "The stone is an imperial unit that is still used in some places, most often for describing body weight in the United Kingdom. One stone equals fourteen pounds, so a value in stone converts to pounds by multiplying by fourteen, and then to kilograms through the pound factor. The converter includes it so you do not need to work through that chain yourself. If a source gives a weight as stone and pounds together, convert each part separately and add the totals in the unit you need."
      },
      {
        "heading": "What limits should I keep in mind with mass?",
        "text": "Mass and weight are different physical quantities, and this converter handles mass units. It does not adjust for gravity, so it will not tell you how something would weigh on the Moon. Also watch the word ton. A metric ton, a short ton, and a long ton differ in size, so confirm which one a source means before you convert. For shipping rules and similar limits, use the figure the carrier or issuing body publishes, and treat the converted value as a cross-check rather than the official number."
      }
    ],
    "faqs": [
      [
        "Can I convert tons to pounds in one step?",
        "Yes. Choose the ton unit you mean, then select pounds as the target. Because the converter passes through kilograms, tons, pounds, and ounces are linked directly. Before you convert, confirm whether the source means a metric ton or a short ton, since those two differ in size."
      ],
      [
        "Why do ounces show larger numbers than pounds?",
        "An ounce is the smaller unit. A pound contains sixteen ounces, so the same weight expressed in ounces becomes a bigger number. The converter makes this shift automatically, so the value stays correct even though the figure grows."
      ],
      [
        "Can I convert very small weights such as milligrams?",
        "Yes. The converter covers metric mass units from milligrams up to tons, so small amounts such as spices or lab samples can be converted the same way as large loads. Very small results may need more decimal places before they become meaningful to read."
      ]
    ]
  },
  "temperature-converter": {
    "answer": "The temperature converter translates a reading between Celsius, Fahrenheit, and Kelvin. Fahrenheit equals Celsius multiplied by nine fifths, then increased by thirty-two. Kelvin equals Celsius increased by 273.15. Because these scales start from different zero points, the converter applies these formulas rather than a simple multiplier, and the calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When do temperature scales need converting?",
        "text": "Temperature conversions show up in several everyday places. Oven settings and food safety guidance may be written in one scale while your appliance uses another. Weather forecasts from abroad, laboratory readings, and scientific papers can all use a scale you do not normally read. Students often convert between Celsius and Kelvin when working through physics problems, while travelers want to know how a forecast feels compared with home. A quick conversion avoids the confusion of reading a number on the wrong scale."
      },
      {
        "heading": "How should I read a Kelvin value?",
        "text": "Kelvin starts at absolute zero, the theoretical lowest temperature, so Kelvin readings never fall below zero. Its degree size matches Celsius exactly, which means a change of one kelvin equals a change of one degree Celsius. The only difference between the two scales is the offset between their zero points. Scientists prefer Kelvin in calculations because many physical formulas need a scale that starts at zero. When you convert a Celsius reading to Kelvin, add the fixed offset, then use the Kelvin value in any equation that expects an absolute temperature."
      },
      {
        "heading": "Why do simple multipliers fail for temperature?",
        "text": "Temperature conversions are not just scaling. Celsius and Fahrenheit both allow negative values and have different zero points, so multiplying by a ratio alone gives the wrong answer for an absolute reading. A common mistake is converting a temperature change as if it were a reading. A rise of ten degrees Celsius equals a rise of eighteen degrees Fahrenheit, but the readings themselves need the offset. Keep these two cases separate. Use the full formula for absolute readings, and use only the ratio when you are describing a difference between two temperatures."
      }
    ],
    "faqs": [
      [
        "Can Kelvin and Celsius ever show the same number?",
        "No. Kelvin is offset from Celsius by a fixed amount of 273.15, so a Kelvin reading is always higher than the same temperature in Celsius. The two scales share the same degree size, which is why changes look identical on both."
      ],
      [
        "Is absolute zero the coldest anything can get?",
        "On the Kelvin scale, absolute zero is the lowest possible value, and no physical temperature reads below it. In practice, labs can cool matter very close to absolute zero but cannot reach it exactly. A Kelvin result below zero signals an invalid input and should be checked."
      ],
      [
        "Can I enter negative temperatures?",
        "Yes for Celsius and Fahrenheit, where negative readings are normal cold weather values. Kelvin does not use negative numbers for real temperatures, so a negative Kelvin result usually means the input is not a valid physical temperature. Check the source before relying on that output."
      ]
    ]
  },
  "area-converter": {
    "answer": "The area converter changes a surface measurement between square meters, square feet, acres, and hectares. Every unit converts through square meters using an exact factor. Because area covers two dimensions, each length factor is squared, so a square foot is the square of a foot's meter value. Multiply your value by the source factor and divide by the target factor. The calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is an area converter worth using?",
        "text": "Area units matter whenever a surface is priced, covered, or permitted by size. Property listings may give floor space in square feet while your plans use square meters. Flooring, paint, and turf are often sold by area, so a conversion tells you how many units to buy. Farmers and land buyers compare plots reported in acres or hectares. In each case, converting the total area first lets you compare offers and estimates on equal terms."
      },
      {
        "heading": "How does a hectare compare with an acre?",
        "text": "A hectare is a metric unit of 10,000 square meters, while an acre is an imperial unit that is somewhat smaller. An acre is a little less than half a hectare, so a single hectare holds roughly two and a half acres. People often lose track of this difference when reading land reports. The converter removes the guesswork by placing both units on the same square meter base, so you can see the exact ratio rather than relying on a rough sense of size."
      },
      {
        "heading": "Why do area results come out wrong?",
        "text": "The most common area mistake is applying a length factor directly. Because area is two-dimensional, converting a length of one foot into meters is not the same as converting a square foot into square meters. Using the length factor for area gives a result that is off by the difference between the factor and its square, which is large enough to matter. A second issue is combining dimensions in different units, such as multiplying feet by meters. Convert each side to the same unit first, multiply to get the area, then convert the total."
      }
    ],
    "faqs": [
      [
        "Can I convert a room if I know its width and length?",
        "Yes. Multiply width by length first to get the floor area in square feet or square meters, then convert that total. Make sure both sides use the same unit before you multiply, because mixing feet and meters produces a figure that matches neither system."
      ],
      [
        "Does the converted area reflect the shape of a plot?",
        "No. The converter changes units for a total area you already have. It does not measure irregular boundaries, slopes, or easements. For land purchases, use the area stated in an official survey or deed, then convert it here for comparison."
      ],
      [
        "Is the area on a listing the same as usable floor space?",
        "Not always. A listed area can follow a measuring method that includes or excludes certain spaces, and the converter only changes the number you provide. Check how the seller defines the figure before comparing it with another property."
      ]
    ]
  },
  "volume-converter": {
    "answer": "The volume converter changes a liquid or container measurement between liters, US and UK gallons, cups, pints, and fluid ounces. Each unit converts through liters using an exact factor, so you multiply by the source unit's liter value and divide by the target's. US and UK gallons differ in size, so the unit name must match the source you are reading. The calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do liquid volume conversions matter?",
        "text": "Liquid volume matters in recipes, fuel purchases, and product labels. A cookbook from another country may list ingredients in cups or pints that do not match your measuring set, and a bottle label may use milliliters while your jug is marked in gallons. Aquarium, garden, and cleaning instructions often specify dosing volumes, where a small error changes the result. Converting before you pour keeps the amount you intended, and it works the same whether you are scaling up a batch or checking a container's capacity."
      },
      {
        "heading": "How do US and UK measurements differ?",
        "text": "The US and UK systems both use gallons, pints, and fluid ounces, but the sizes are not the same. A UK imperial gallon is larger than a US gallon, and the pint and fluid ounce also differ between the two. This is why a recipe or fuel figure can look correct yet give the wrong amount when used with the other system. The converter keeps the two gallons separate and converts each through liters, so you can see the true difference rather than guess it. Always confirm which system a source uses."
      },
      {
        "heading": "What mistakes happen when measuring by volume?",
        "text": "A frequent error is treating volume and weight as interchangeable. A cup of a dry ingredient can weigh very different amounts depending on how it was packed, so recipes that specify weight are more reliable for baking. The converter changes volume units into each other, but it cannot tell you how dense a substance is. Another mistake is using a cup from a different country without checking its size. Measure liquids at eye level in a clear container, and convert the target figure before you start pouring."
      }
    ],
    "faqs": [
      [
        "Is a US fluid ounce the same as an ounce of weight?",
        "No. A fluid ounce measures volume, while an ounce on a scale measures mass. Water makes the two feel related, but other liquids weigh different amounts for the same volume. Use the unit that matches what you are actually measuring."
      ],
      [
        "Can I convert a bottle label in milliliters into gallons?",
        "Yes. Enter the milliliter value from the label and select gallons as the target. The converter moves through liters, so the result uses the exact factor. Choose US or UK gallons deliberately, since the answer depends on which one you select."
      ],
      [
        "Should I convert liquid volumes to weight for a recipe?",
        "Sometimes. For water-like liquids, volume and weight are close enough for most cooking. For dry ingredients or thick liquids, recipes that give a weight are more dependable, because density changes the relationship. The converter handles volume to volume, not volume to weight."
      ]
    ]
  },
  "speed-converter": {
    "answer": "The speed converter changes a rate of travel between kilometers per hour, miles per hour, meters per second, and knots. Each speed converts through meters per second using an exact factor, so you multiply by the source factor and divide by the target factor. A knot is one nautical mile per hour, which makes it a distance-per-time unit like the others. The calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do these speed units appear?",
        "text": "Road speed is usually posted in miles per hour or kilometers per hour, depending on the country, so a converter helps when you drive or compare vehicles across borders. Weather data and physics problems often use meters per second, which is common in scientific work. Knots appear in marine and aviation contexts, where charts and instruments report speed in that unit. Sports and fitness apps may switch between these measures too. Converting into the unit your context uses prevents you from misreading a speed."
      },
      {
        "heading": "How does a knot relate to miles per hour?",
        "text": "A knot is one nautical mile per hour, and a nautical mile is longer than a statute mile. That means one knot is faster than one mile per hour, so the two should never be treated as the same number. Nautical distances are based on the earth's geometry, which is why marine charts use them. The converter places both units on the meters-per-second base, so the relationship is exact. You can check the difference by converting a known speed and watching how the figure changes between the two units."
      },
      {
        "heading": "What do speed conversions not tell me?",
        "text": "A speed conversion changes units, but it does not describe a whole trip. An average speed over a long journey depends on stops, slowdowns, and route changes, which the converter does not model. Be careful not to convert a distance when you meant a speed, or a time when you meant a rate. Another common error is using a sustained speed where a peak value is needed. Read the source to see whether a figure is an instantaneous reading, a maximum, or an average, and convert it with that meaning intact."
      }
    ],
    "faqs": [
      [
        "Does the converter account for changing speed?",
        "No. It converts one stated speed, which is a single rate. A speed that changes over time needs an average or a set of readings, and you would convert each value separately before comparing them."
      ],
      [
        "How do I tell whether a meter-per-second value is fast?",
        "The converter does not judge speed. It shows the same rate in each unit, so you can compare it with a reference you trust for your field. Walking pace and running pace are very different numbers, and only a known benchmark can tell you which one a value resembles."
      ],
      [
        "Does a knot differ from a nautical mile?",
        "Yes. A nautical mile measures distance, while a knot measures speed. One knot means covering one nautical mile in one hour. Keeping the two terms separate helps when you read charts or weather reports that mix distance and rate figures."
      ]
    ]
  },
  "data-storage-converter": {
    "answer": "The data storage converter changes file and drive sizes between bytes, kilobytes, megabytes, gigabytes, terabytes, and their binary counterparts. Decimal units step up by a factor of one thousand, while binary units step up by one thousand twenty-four. Every size converts through bytes, so you can move between any two units, and the calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When do storage conversions help?",
        "text": "Storage conversions help when you plan space before a transfer or purchase. You might check whether a folder fits on a flash drive, estimate how much room a backup set needs in a cloud plan, or compare a file size listed in megabytes with a limit given in gigabytes. Photographers, video editors, and game players often hit these comparisons. Converting the numbers into one unit before deciding avoids the mistake of comparing a decimal figure with a binary figure, which is easy to do without noticing."
      },
      {
        "heading": "What do decimal and binary units mean?",
        "text": "Decimal units step by one thousand, so a gigabyte is one thousand megabytes. Storage manufacturers usually label drives this way. Binary units step by one thousand twenty-four, and the names gibibyte and mebibyte mark that difference. Many operating systems report sizes using binary steps while still labeling them with decimal names. The drive itself has not changed, but the same bytes produce a smaller number when counted in the larger binary unit. The converter shows both families so the two readings can be matched."
      },
      {
        "heading": "Which unit should I trust for planning?",
        "text": "Choose the unit that matches the source. Network speeds are usually stated in bits per second, while file and drive sizes are stated in bytes, and a byte holds eight bits. Mixing the two produces answers that look plausible but are off by a factor of eight. Also remember that formatted storage holds less than its label, because the file system uses part of the space for its own structures. Use the converter for unit translation, then leave a margin when planning space."
      }
    ],
    "faqs": [
      [
        "Do file sizes include file system overhead?",
        "A file's listed size usually reflects its content. The drive's used space also includes file system structures, so the total used can appear larger than the sum of the visible files. The converter changes units for any size you enter but cannot see those hidden structures."
      ],
      [
        "Can I convert megabytes to gigabytes in one step?",
        "Yes. Enter the megabyte figure, select gigabytes as the target, and the converter passes the value through bytes. Choose decimal or binary units explicitly, since the result differs depending on which family you pick."
      ],
      [
        "Is a gigabit the same as a gigabyte?",
        "No. A bit is a single binary digit, and a byte holds eight bits. A gigabit is therefore one eighth the size of a gigabyte, which is why download speeds and file sizes can look inconsistent when read side by side."
      ]
    ]
  },
  "pressure-converter": {
    "answer": "The pressure converter changes a pressure reading between pascals, bar, PSI, atmospheres, and mmHg. Every unit normalizes through pascals using an exact factor, so you multiply the input by its pascal factor and divide by the target's. Pascals serve as the common base because pressure is force spread over an area. The calculation runs in your browser.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do pressure readings appear?",
        "text": "Pressure shows up in more places than most people expect. Tire gauges often display PSI or bar, while industrial equipment, hydraulic systems, and engineering specifications may use pascals or bar. Barometers and some weather readings use millimeters of mercury, and science texts usually use the atmosphere as a reference. If you are reading a manual from another region, the unit may differ from the one on your gauge. A converter lets you compare each reading against the figure you actually need."
      },
      {
        "heading": "Why is one atmosphere a common reference?",
        "text": "One standard atmosphere is a reference value that many pressure units are defined against. Scientists use it to describe conditions relative to the air around us, and it sits close to one bar. A reading of one atmosphere is therefore a convenient anchor when you need to judge whether a pressure is higher or lower than everyday air. The converter treats atmospheres like any other unit, using the exact pascal value, so you can move between the reference and any other scale without memorizing separate factors."
      },
      {
        "heading": "How do gauge and absolute pressure differ?",
        "text": "Many gauges report gauge pressure, which measures the amount above surrounding air pressure, while some scientific figures report absolute pressure, which starts from a perfect vacuum. The converter changes units but does not add or subtract atmospheric pressure, so it cannot turn one type into the other. Check how the source defines its reading before converting. Another mistake is assuming all pressure units mean the same thing in every industry. The number you convert is only as meaningful as the definition behind it."
      }
    ],
    "faqs": [
      [
        "Does the converter tell me whether a tire pressure is safe?",
        "No. The converter changes units only. Recommended pressures come from the vehicle or tire manufacturer's specifications, and those are the figures to follow. Once you have the correct recommended value, the converter can show it in the unit your gauge uses."
      ],
      [
        "Why do pascals produce such large numbers?",
        "A pascal is a small unit, equal to one newton per square meter. Everyday pressures are often thousands of pascals, so bigger units such as bar keep the figures short. The converter shows the same pressure in each unit, so you can pick the scale that reads most easily."
      ],
      [
        "Is mmHg the same as millimeters of water?",
        "No. The mmHg unit refers to a column of mercury, which is much denser than water. The same pressure therefore produces a much shorter column of mercury than a column of water. Keep the two units separate, and check which liquid a gauge or source is referring to."
      ]
    ]
  },
  "energy-converter": {
    "answer": "The energy converter changes a value from one energy unit to another, such as joules, food calories, or kilowatt-hours. It converts every input to joules first, using fixed factors: one calorie equals 4.184 joules and one kilowatt-hour equals 3,600,000 joules. The result is then expressed in the unit you choose.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Which energy unit fits my task?",
        "text": "Physics and engineering work usually runs in joules, the SI unit, so formulas stay consistent across sources. Nutrition labels quote food energy in Calories, while electricity bills use kilowatt-hours. Those are different scales for the same kind of quantity. Pick the unit your source document uses, then convert once when you need to compare it with a figure written in another unit. Scientists and engineers prefer the SI base so calculations need no extra conversion step."
      },
      {
        "heading": "What does a converted energy value mean?",
        "text": "A converted value describes the same amount of energy, only expressed on a different scale. Converting does not change how much energy is involved, so one kilowatt-hour and its joule equivalent represent the same work or heat. Large units produce small numbers and small units produce large ones. A day of household electricity yields an enormous count in joules but a modest figure in kilowatt-hours, which is why billing uses the larger unit."
      },
      {
        "heading": "Where do energy conversions go wrong?",
        "text": "The most common error is mixing the food Calorie with the small physics calorie, which differ by a factor of a thousand. The second is confusing kilowatts with kilowatt-hours. A kilowatt measures power, the rate of energy transfer, while a kilowatt-hour measures total energy over time. A converter also cannot tell you how much energy an appliance will use, because that depends on runtime and load. Check the unit on a label before you copy the figure elsewhere."
      }
    ],
    "faqs": [
      [
        "Why do nutrition labels and physics textbooks disagree on calories?",
        "They are not disagreeing about the same unit. A physics calorie is a small unit, while the food Calorie on labels is a kilocalorie, which is a thousand times larger. Converting both into joules puts them on one scale, so the two values can be compared directly without guessing which one a source meant."
      ],
      [
        "Is kWh a measure of energy or power?",
        "A kilowatt-hour is a measure of energy. Power is the rate at which energy moves, measured in kilowatts. Multiply a power rating by the hours it runs to get energy in kilowatt-hours, which is why a utility bill counts energy and not the appliance size alone."
      ],
      [
        "Does the converter treat heat and electrical work differently?",
        "No. Heat, work, and electrical energy all share the joule as a common base, so the converter scales them the same way. The unit tells you what the number is counted in, not a different kind of quantity. Use the same tool for any of them when the question is only about units."
      ]
    ]
  },
  "power-converter": {
    "answer": "The power converter changes a rate of energy transfer from one unit to another, such as watts, kilowatts, or horsepower. Every value is first converted to watts. One mechanical horsepower equals 745.7 watts and one metric horsepower, also called PS, equals 735.5 watts. The converted figure then appears in the unit you select.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I compare power in watts or horsepower?",
        "text": "Electronics, appliances, and motor nameplates often list watts, while kilowatts suit larger machines and building loads. Automotive and motorcycle specs commonly use horsepower, and many European and Japanese sheets use metric horsepower, labeled PS. Choose the unit used by both documents you plan to compare. If one side lists kilowatts and the other lists horsepower, convert both into watts first so the comparison rests on a single base. Matching units first avoids most of the confusion."
      },
      {
        "heading": "What does a converted power figure tell me?",
        "text": "Power is energy transferred per unit of time, so a converted figure states the same rate on a different scale. One kilowatt equals a thousand watts, and the two units are simply different markings on the same ruler. Converting a rating does not reveal torque, efficiency, or how hard a machine works under load. Those need separate measurements. Treat the output as an exact translation of the number you entered, nothing more."
      },
      {
        "heading": "Why do two horsepower figures sometimes conflict?",
        "text": "Mechanical horsepower and metric horsepower are defined with slightly different constants, so the same engine can carry two numbers that look inconsistent. The gap is small, but it is real and can matter when two specs are compared closely. Before comparing, confirm which standard each brochure or database uses. Mixing standards is a common mistake, and the converter cannot fix it unless you tell it which horsepower you started with."
      }
    ],
    "faqs": [
      [
        "Is one kilowatt the same as one horsepower?",
        "No. A kilowatt is a thousand watts, while one mechanical horsepower is roughly three-quarters of a kilowatt. Metric horsepower is a bit smaller again. The units are close enough that people trade them casually, but a conversion gives an exact answer when a spec needs precision."
      ],
      [
        "Can I convert a motor's power into torque here?",
        "No. Torque depends on rotational speed as well as power, and this tool only changes the unit of power. If you have a power rating and a speed in revolutions per minute, you would need a separate calculation to find torque. The converter handles unit scaling only."
      ],
      [
        "Does the converter account for efficiency losses?",
        "No. The tool multiplies your value by a fixed factor for the chosen unit. It does not model friction, heat, drivetrain losses, or electrical conversion efficiency. If you need the power delivered after losses, apply the efficiency figure yourself before or after converting."
      ]
    ]
  },
  "time-converter": {
    "answer": "The time converter turns a duration from one unit into another, covering milliseconds, seconds, minutes, hours, days, and weeks. It converts the input to seconds first, then scales the result to the unit you select. Each unit uses a fixed factor, so one hour is 3600 seconds, one day is 86,400 seconds, and one week is 604,800 seconds.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do duration conversions come up?",
        "text": "Timesheets often record hours and minutes, while billing software may expect decimal hours, so a conversion keeps the two in agreement. Developers switch between milliseconds for timeouts and seconds for log entries. Project managers convert a total of minutes into hours to plan capacity. Any time you have a duration in one unit and need it in another, a converter removes the manual multiplication that causes slips. Each use case benefits from a single, consistent unit."
      },
      {
        "heading": "How should I interpret a converted duration?",
        "text": "A converted duration describes the same length of time, only written in a different unit. Ninety minutes becomes one and a half hours, and that value is correct as written. Decimal results appear when the input does not divide evenly into the target unit, so a duration may show a long fraction of an hour. Round only at the final step, because rounding each intermediate value can drift a total over several entries."
      },
      {
        "heading": "What are the limits of a fixed-factor converter?",
        "text": "Every unit here uses a fixed number of seconds, which works for milliseconds through weeks. Months and years vary in length, so they do not map to one factor, and this converter stops at weeks for that reason. Calendar arithmetic, time zones, and daylight saving shifts fall outside its scope. For those, use a date-aware calculator. Also remember that a week always means seven days in this tool, whatever calendar period you are measuring."
      }
    ],
    "faqs": [
      [
        "Are milliseconds useful outside of programming?",
        "Yes. Milliseconds appear in race timing, sports analytics, audio editing, and performance logs, where a fraction of a second matters. The converter treats one thousandth of a second as the base step, so a value in milliseconds converts to seconds, minutes, or hours using exact factors."
      ],
      [
        "Can I turn a clock time into a duration?",
        "Not directly. A clock time such as mid-afternoon is a point in the day, not a length of time. To get a duration, subtract a start time from an end time, then convert the difference with this tool. Durations that cross midnight or time zones need a calculator that understands calendars."
      ],
      [
        "Is a week always the same length here?",
        "Yes. The week factor is seven days, which equals 604,800 seconds, so every week converts identically. That is a fixed definition, not a calendar count, so it gives consistent results for planning and billing. If your report counts weeks by a calendar boundary, check that boundary separately."
      ]
    ]
  },
  "fuel-economy-converter": {
    "answer": "The fuel economy converter translates a vehicle rating between US miles per gallon, UK miles per gallon, and liters per 100 km. MPG and L/100km are inversely related, so the tool divides a fixed constant by the MPG value to get L/100km. Using the stated constants, US MPG uses 235.215 and UK MPG uses 282.481, and every figure stays in sync.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is L/100km easier to use than MPG?",
        "text": "Many markets outside the US and UK publish fuel consumption as liters per 100 km, so European and Asian spec sheets often use that scale. Using the same unit as the source avoids mental flips. L/100km also gives a direct sense of fuel burned over a trip, since a lower figure means less fuel used. If you are reviewing a rental in one country and a manual in another, convert both to L/100km before deciding which car is more economical."
      },
      {
        "heading": "How should I read the relationship between the units?",
        "text": "MPG and L/100km move in opposite directions, so a higher MPG means a lower L/100km. The relationship is inverse rather than linear, which means each extra mile per gallon saves less fuel than the one before it. Moving from a poor rating to a moderate one produces a large change in consumption, while the same numerical gain at a high rating yields a smaller one. Keep this curve in mind when a small MPG bump seems to promise a large saving."
      },
      {
        "heading": "What mistakes skew fuel economy comparisons?",
        "text": "Mixing US and UK MPG is the classic error, because the UK uses an imperial gallon that is larger than the US gallon, so the same car shows a higher UK figure. Comparing a combined rating with a city rating is another, since the converter translates units but does not know the test cycle behind a number. Real driving depends on speed, load, weather, and habits. Use the converted values to compare like with like, not as a prediction of your own trip."
      }
    ],
    "faqs": [
      [
        "Does a lower L/100km always mean lower running costs?",
        "A lower figure means less fuel per distance, which helps running costs. Total cost also depends on fuel prices, how many kilometers you drive, insurance, and maintenance. Treat the converted number as one input to a cost estimate rather than the whole answer, and compare alternatives under the same driving conditions."
      ],
      [
        "Can this tool show kilometers per liter?",
        "Not directly. Kilometers per liter is the reciprocal of liters per 100 km, so divide a hundred by the L/100km value to get it. The tool covers US MPG, UK MPG, and L/100km, so use that division yourself for the kilometers per liter figure."
      ],
      [
        "Is the converted figure a real-world consumption number?",
        "No. The converter changes a rating from one unit system to another. It does not measure the car you own or estimate your actual consumption. Ratings come from standard test conditions, while actual fuel use varies with driving style and conditions, so the figure describes the rating only."
      ]
    ]
  },
  "usd-to-gbp": {
    "answer": "The USD to GBP converter multiplies a US dollar amount by the ECB reference rate for British pounds sterling. The European Central Bank publishes an official daily fix from the latest business day. The tool also shows the inverse rate, so a pound-to-dollar figure is just the reciprocal of the displayed rate.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When do I need a dollar to pound conversion?",
        "text": "Travel budgets for the United Kingdom are often planned in dollars, so converting a daily spending target into pounds makes it easier to track. Freelancers and buyers comparing a UK product with a US price use the same figure to line up quotes. Before you send money, though, treat this converter as a starting estimate. The rate it shows is the reference figure, which helps you understand the baseline before you check the offer your provider gives."
      },
      {
        "heading": "What does the reference rate represent?",
        "text": "The European Central Bank publishes one reference rate per currency each business day. It is not the buy or sell price that a bank, card network, or currency service quotes. Those providers add margins and fees on top, so the pounds you receive can be lower than the reference suggests. The inverse rate shown alongside helps you check that a reverse conversion is consistent with the same published figure. Treat the figure as a benchmark, not a promise."
      },
      {
        "heading": "Which mistakes change the converted amount?",
        "text": "Reading a currency pair backward is the most common slip. A dollar amount converts to fewer pounds than its face value, so an answer that looks too large often means the direction was reversed. Round only at the end of a calculation, not on each intermediate step. Also check the date of the rate, since a published figure applies to a specific business day. Converters cannot forecast how the pound will move, so avoid using a single rate to predict a future price."
      }
    ],
    "faqs": [
      [
        "Do banks charge the same rate this converter shows?",
        "Usually not. Banks and payment providers apply their own exchange margins and fees, so the rate you receive differs from the published reference figure. This converter gives the reference value for comparison. Ask your provider for its final quoted rate and total fees before you commit to a transfer."
      ],
      [
        "Can I convert pounds back into dollars with this tool?",
        "Yes. The inverse rate covers the reverse direction, and the swap control reverses the currencies in one click. Check that the reversed result matches the reciprocal of the forward rate, since small rounding differences are normal. The same published figure underlies both directions."
      ],
      [
        "Is this converter enough for a binding exchange?",
        "It is an educational estimate, not professional financial advice, and it is not a quote. For any transaction, confirm the exact rate, timing, and fees with the institution handling your money. Rates move between the moment you check and the moment you act."
      ]
    ]
  },
  "usd-to-inr": {
    "answer": "The USD to INR converter multiplies a US dollar amount by the ECB reference rate for the Indian rupee. The European Central Bank updates its reference rates each business day, and INR is among the currencies it publishes. A comparison grid shows the same dollar amount converted into other major currencies at once.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When would I convert dollars to rupees?",
        "text": "Families sending money home to India often want to see what a dollar amount becomes in rupees before choosing a transfer. Travelers budget trips with a daily rupee target, and businesses paying Indian vendors need a rough figure before invoicing. In each case, the reference rate gives a clear starting point. It answers the question of scale quickly, while the final transfer amount depends on the provider you use. Clear arithmetic makes those conversations easier."
      },
      {
        "heading": "How do I use the comparison grid?",
        "text": "The grid shows the same dollar amount converted into several major currencies at once. Each row is an independent conversion from dollars, so compare the rows to understand how one amount looks across markets, not to derive exchange rates between those currencies. This is useful when a quote could be priced in more than one currency. Read the rupee row as the figure this page is about and the others as context."
      },
      {
        "heading": "What is this converter unable to tell me?",
        "text": "The figure is a reference, not a live market quote. The ECB publishes rates on business days, so the value reflects the most recent published fix rather than a continuously moving price. It does not include transfer fees, spreads, or the rate your bank will apply. It also cannot forecast where the rupee is heading. Remittance rules differ by country and are outside this tool, so verify the final amount with your provider before sending."
      }
    ],
    "faqs": [
      [
        "Will the converted amount change from one day to the next?",
        "It can. Reference rates update each business day, so the figure reflects the most recent published value. A calculation made on a non-business day uses the last rate that was published, which may differ from the rate on the following business day."
      ],
      [
        "Does this converter include transfer fees?",
        "No. It shows the reference rate and the arithmetic built from it. Transfer fees, currency margins, and any charges applied by your provider are separate and can change the amount received. Add those costs yourself after you see the quote from your service."
      ],
      [
        "Is a reference rate the same as a live market quote?",
        "No. A reference rate is a single figure published for each business day. A live market quote changes continuously during trading hours and can differ between dealers. Use the reference value to understand scale and compare options, then check a live quote from your provider when you are ready to transact."
      ]
    ]
  },
  "slug-generator": {
    "answer": "A URL slug is the readable part of a web address that identifies a page, such as the words after the last slash. This generator normalizes the title with Unicode normalization so accented letters become plain letters, lowercases everything, replaces each run of non-alphanumeric characters with one hyphen, and trims hyphens from the edges. The output is ready to paste into a CMS.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Where do I paste a generated slug?",
        "text": "Most content management systems offer a slug field under the title of a post, page, or product. Static site generators often read the slug from the file name, so the same string keeps the link consistent across tools. Generate the slug from the finished title, then paste it into the field before publishing. Changing it later is possible, but it affects every link that already points to the old address, so settle it early."
      },
      {
        "heading": "What makes a slug easy to read and share?",
        "text": "A readable slug uses lowercase words separated by hyphens, so a reader can guess the page topic from the address alone. Shorten long titles by dropping filler words, keeping the terms a visitor would search for. Avoid stacking dates, stop words, and repeated phrases, since they add length without adding meaning. Clean slugs also look better when pasted into messages and social posts, where a long string can break across lines."
      },
      {
        "heading": "What does this generator leave for me to check?",
        "text": "The generator changes characters in the text you provide, but it cannot see your site. It does not confirm that the slug is unused, so two pages can end up with the same address unless you check. It does not create redirects when you change a slug later. After generating, review the result against existing pages and make sure the page you publish matches the address you planned. A short checklist keeps the process consistent."
      }
    ],
    "faqs": [
      [
        "Should I change a slug after a page is published?",
        "Only when there is a strong reason. Changing it breaks existing links unless you set up a redirect from the old address to the new one. Most content management systems and hosting tools offer redirect settings. Check that every internal link points to the new address after the change."
      ],
      [
        "Why do accented letters become plain letters?",
        "Unicode normalization splits an accented character into a base letter and a separate combining mark. The generator then removes the marks, so an e with an acute accent becomes a plain e. This keeps the slug in the basic character set that URLs handle most reliably."
      ],
      [
        "Can a slug include numbers or a year?",
        "Yes. Numbers are alphanumeric, so they survive generation and stay in place. A year in the slug can help readers see when a guide was written, but it also makes the page look outdated sooner. Decide based on whether the content will stay current for a long time."
      ]
    ]
  },
  "lorem-ipsum-generator": {
    "answer": "The lorem ipsum generator produces placeholder Latin text, starting with the traditional opening phrase, in the number of paragraphs you request. It draws words from a standard lorem word pool and varies sentence lengths within each paragraph, so the paragraphs vary in rhythm. Because it is deterministic per page load, a layout tested with it looks the same each time.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is placeholder text the right choice?",
        "text": "Placeholder text is useful when a layout must be judged before final copy exists. Designers use it to test typography, line length, spacing, and how a grid handles long or short blocks. Stakeholders can react to the design without getting stuck on wording that has not been written yet. Keep a clear label on placeholder sections, so nobody mistakes filler for approved content during a review. Real copy often arrives late in a project, so placeholders keep work moving."
      },
      {
        "heading": "How many paragraphs should I generate?",
        "text": "Match the paragraph count to the content you expect, then test a range around it. A single long block can hide spacing problems that appear when three short sections stack. Include headings, captions, and buttons in the same mockup, because the surrounding elements change how paragraphs wrap and align. Changing the count only tells you about the paragraphs themselves, so check the full page too. Three or four paragraphs is a useful spread for most cards and columns."
      },
      {
        "heading": "What can placeholder copy not reveal?",
        "text": "Latin filler looks neutral, but it is not meaningful, so it cannot expose readability problems or tone issues. Languages with longer words or different scripts can break a layout that the Latin sample handles well, so test with real text in the target language before launch. For accessibility, check contrast and heading structure with real content. Replace every placeholder before publishing, and rerun the layout check afterward. Agree on a replacement deadline before the design review begins."
      }
    ],
    "faqs": [
      [
        "Can I use this text on a live website?",
        "It is meant for drafts, mockups, and staging environments. Before a site goes live, replace every placeholder paragraph with approved copy, since visitors and search engines should read content that describes your product or service. Lorem text left on a live page looks unfinished."
      ],
      [
        "Will the same paragraph count give the same layout each time?",
        "The generator is built to be deterministic, so the text for a given paragraph count stays consistent between loads. That consistency matters when you compare screenshots or test a layout across browsers, because a changing sample would make differences hard to attribute."
      ],
      [
        "Should I use placeholder text in my own language?",
        "Often yes, for layouts meant for that market. Words in a target language can be longer or shorter than Latin filler, and that changes wrapping, button widths, and navigation labels. A sample in the real language reveals problems the standard filler will hide, so use it for final layout checks."
      ]
    ]
  },
  "find-and-replace": {
    "answer": "A find and replace tool scans a block of text for a search string and substitutes a new string at every match. In plain mode, your search term is escaped so symbols are treated literally. In regex mode, the input is read as a regular expression pattern, letting one rule match many variations. A live counter shows the number of replacements before you copy the result.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is bulk replacement faster than editing by hand?",
        "text": "Bulk replacement saves time when the same term appears dozens of times, such as a product name that changed, a retired domain in links, or a repeated typo across a long draft. Run a plain search first to see the scale of the change. A tool that reports the count helps you confirm the scope before you commit, and you can decide whether a targeted manual edit is safer for a few special cases."
      },
      {
        "heading": "How should I read the replacement counter?",
        "text": "The counter reports how many matches were replaced under your current options. If the number is zero, check the search term, the case setting, and whether plain mode is active. An unexpectedly large count usually means the term is too general, such as a short word that appears inside longer ones. Compare the count with what you expected, then review a few replaced sections in the output before you copy the whole result."
      },
      {
        "heading": "Which mistakes do regex replacements cause?",
        "text": "Switching to regex mode without escaping punctuation is a frequent problem, because characters such as a period or a question mark change meaning as patterns. Greedy patterns can match far more text than intended, swallowing content between two markers. Patterns that look precise may still match inside larger words unless you anchor them with boundaries. Test a pattern on a short sample first, then apply it to the full text."
      }
    ],
    "faqs": [
      [
        "Why does my search match part of a longer word?",
        "Plain substring matching replaces every occurrence, including occurrences inside longer words. A search for cat also matches category. In regex mode, add word boundaries around the term, or use a more specific phrase, so only the whole word is replaced."
      ],
      [
        "Should I keep a copy of the original text?",
        "Yes. A bulk replacement changes every match at once, and it can be hard to reconstruct the original after you paste over the source. Keep the unchanged version in a separate file or tab, so you can compare the output or start again if a pattern matched more than expected."
      ],
      [
        "Does case-insensitive matching change the replacement text?",
        "No. The option controls which occurrences count as matches, while the replacement string is inserted exactly as you typed it. For example, a case-insensitive search for the word cat will catch Cat and CAT, and each of them will be replaced with the text you entered."
      ]
    ]
  },
  "readability-checker": {
    "answer": "A readability checker estimates how easily a reader can understand a text. The Flesch Reading Ease score uses average sentence length and average syllables per word: longer sentences and longer words lower the score. The Flesch-Kincaid grade level uses the same inputs to estimate a US school grade. Higher ease scores mean easier text, and higher grade levels mean harder text.",
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Who benefits from checking readability?",
        "text": "Writers of public guides, product help articles, and health or legal explainers benefit when a reader needs to act on the information. Teachers adapting material for different reading levels can compare drafts quickly. Editors can score each section separately to find where a piece becomes dense. Run the check on the final draft, and also on individual sections when a document mixes plain prose with technical passages. Each group gains a different kind of feedback from the same score."
      },
      {
        "heading": "How should I respond to a low ease score?",
        "text": "Start with the longest sentences, because splitting them usually raises the score more than swapping single words. Replace multi-syllable words where a simpler equivalent keeps the meaning. Break dense paragraphs into shorter blocks and move the key point to the first sentence. Re-score after each edit to see which change helped, rather than rewriting everything at once. Do not sacrifice precision just to reach a number. Keep notes on which edits worked for the next draft."
      },
      {
        "heading": "What does the formula overlook?",
        "text": "Flesch scores count sentences, words, and syllables. They do not judge meaning, logical structure, tone, or whether a reader knows the vocabulary. A short sentence full of unfamiliar jargon can score as easy yet still confuse people. Headings, bullet lists, and code can also distort sentence counts. Syllable counting is an estimate, so treat the result as a guide for revision, not a verdict on quality. Pair the score with a careful human read before deciding."
      }
    ],
    "faqs": [
      [
        "Can a text score well and still be confusing?",
        "Yes. The formula rewards short sentences and short words, but it cannot check whether ideas connect or whether terms are defined. A clear text usually scores well, yet a high score alone does not prove that the content is organized logically or useful to its audience."
      ],
      [
        "Does the checker work on a single sentence?",
        "It will return a figure for one sentence, but that result is unstable because the formula averages across sentences. Score a full paragraph or section for a meaningful reading. Short samples swing widely when one sentence changes, so compare longer passages when deciding between drafts."
      ],
      [
        "Is my text uploaded when I run the check?",
        "The scoring runs in your browser, so the calculation happens on your device rather than on a server. Keep your own copy of the draft as you revise, so you can compare versions and roll back an edit that did not help."
      ]
    ]
  },
};
