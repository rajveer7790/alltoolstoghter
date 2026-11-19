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
  "remove-duplicate-lines": {
    "answer": "Remove duplicate lines means deleting every repeated line from a list so each distinct line appears once. This tool compares each line against the lines already seen, drops any match, and keeps the first occurrence in its original order. Turn on the case-insensitive option to treat Apple and apple as the same line, and choose whether surrounding spaces are ignored.",
    "aiSummary": "A simple way to remove repeated lines from a text list. This tool keeps the first copy of each line in original order. An optional mode ignores letter case and surrounding spaces. The main limit: lines must match after those options, so near-copies with different wording are kept.",
    "shortKeyword": "remove duplicate lines",
    "longKeywords": [
      "how to remove duplicate lines in list",
      "ignore case when removing duplicate lines",
      "remove repeated lines from a text list"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to remove duplicate lines in list?",
        "text": "People use this to clean mailing lists, keyword lists, exported logs, and lists copied from several sources. Paste the list, run the removal, and copy the cleaned output. Because the original order is kept, the list still reads the way you built it, which matters when position carries meaning, such as a ranked list. Only exact line matches are removed, so the tool suits lists where each row should be one unique entry. Use it when you want a unique set without re-sorting anything."
      },
      {
        "heading": "What should I check in the cleaned output?",
        "text": "Compare the number of lines before and after to confirm how many repeats were dropped. Check that the first occurrence of each item is the one you wanted to keep, because the tool never picks a later copy. If you enabled case-insensitive mode, scan for items that differ only by capitalization and decide whether they really are the same entry. Read a few lines near the top and bottom to confirm nothing was cut by accident before you paste the result back into your project."
      },
      {
        "heading": "What are the common mistakes or limits?",
        "text": "The most common mistake is forgetting the case option. With it off, Apple and apple both stay, which can look like a failed cleanup. Surrounding spaces also matter: two lines that look identical may differ by an invisible space unless surrounding spaces are ignored. The tool does not merge near-duplicates such as lines with different punctuation or word order, and it does not look inside a line for repeated words. Review the output before using it for anything important."
      }
    ],
    "faqs": [
      [
        "Can I ignore case when removing duplicate lines?",
        "Yes. Turn on the case-insensitive option and lines that differ only in capitalization are treated as the same. The first version you typed is the one kept, so check the result if capitalization matters for your list."
      ],
      [
        "Which copy of a repeated line is kept?",
        "The first occurrence is kept and every later copy is dropped. Because original order is preserved, the kept line stays where it first appeared, so the overall structure of the list does not change."
      ],
      [
        "Is my text sent to a server?",
        "No. Processing happens in your browser, so the text you paste stays on your device while duplicates are removed. You can clean sensitive lists without uploading them anywhere."
      ]
    ]
  },
  "sort-text-lines": {
    "answer": "Sort text lines means rearranging each line of a list into alphabetical order, A to Z or Z to A, or by how long each line is. Empty lines are removed before sorting. Comparison is locale-aware, so accented letters land in natural positions instead of after z. The output keeps one item per line, ready to paste into a file, spreadsheet, or import list.",
    "aiSummary": "Use this to alphabetize a list without blank lines: pasted lines are sorted A to Z, Z to A, or by length. Blank lines are dropped first, and comparisons are locale-aware so accented letters sort sensibly. The main limit is that lines are ordered by text or length, not by meaning or dates.",
    "shortKeyword": "sort text lines",
    "longKeywords": [
      "sort lines alphabetically in either direction",
      "sort a list of lines by length",
      "alphabetize a list without blank lines"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why sort lines alphabetically in either direction?",
        "text": "Sorted lists are easier to scan, compare, and check for duplicates by eye. Reference lists, import files, glossary entries, and inventories of names all become easier to review when they follow a predictable order. Reverse alphabetical order is useful when you want the last entries first, and length order helps when you are checking which lines are longest, such as labels that must fit a fixed width. Choose the direction that matches how you will read the result."
      },
      {
        "heading": "How do I read the sorted result?",
        "text": "Scan the top and bottom of the output first, since those show the start and end of the chosen order. In length mode you can see the spread of your entries at a glance, with the shortest and longest lines at the two ends. Accented letters should sit beside their base letters rather than at the end, which is the locale-aware effect at work. Compare the line count against the original to confirm that only blank lines disappeared."
      },
      {
        "heading": "What limits should I know before sorting?",
        "text": "Sorting changes the order of your data, so keep a copy of the original if you may need its sequence later. Blank lines are removed, which is a problem if an empty row carries meaning, such as a separator in a template. The tool orders by text or length, not by the meaning of entries, so dates written in different formats and mixed name styles may not line up as you expect. Review the result against your intent before relying on it."
      }
    ],
    "faqs": [
      [
        "Does sorting by length put the shortest lines first?",
        "Length mode orders lines by how long each one is, which makes very short or very long entries easy to spot. Use the alphabetical options when you need a text order instead."
      ],
      [
        "Can I sort a list of lines by length?",
        "Yes. Choose the length option and each line is ordered by its character count. Empty lines are removed before sorting, so no blank entries remain at the top of the output."
      ],
      [
        "Will accented letters sort in a sensible place?",
        "Yes. The comparison is locale-aware, so letters with accents are placed beside their base letters instead of being pushed to the end. This keeps names and words with diacritics in a natural order."
      ]
    ]
  },
  "remove-extra-spaces": {
    "answer": "Remove extra spaces means cutting spacing that does not belong in a piece of text. Collapse mode reduces each run of spaces to one and trims trailing whitespace. Trim each line removes leading and trailing spaces on every line. Remove all strips every whitespace character, including line breaks, so it turns text into one unbroken string.",
    "aiSummary": "Cleans messy pasted text in the browser with three whitespace modes. Collapse reduces repeated spaces, trim each line removes edge spaces, and remove all is the way to strip all whitespace from a string. The main limit: remove all also deletes line breaks and indentation, so it can break layouts that rely on them.",
    "shortKeyword": "remove extra spaces",
    "longKeywords": [
      "fix double spaces from copied text",
      "trim leading and trailing spaces per line",
      "strip all whitespace from a string"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I fix double spaces from copied text?",
        "text": "Text copied from PDFs, web pages, and word processors often carries doubled spaces, stray tabs, or indentation that does not belong in your document. These gaps appear as uneven columns or extra room between words. Paste the text, choose collapse, and copy the cleaned result. This is a quick fix for emails, captions, and product descriptions before publishing, saving you from hunting down each gap by hand. Read the output once before you publish it."
      },
      {
        "heading": "Which mode should I pick for each job?",
        "text": "Collapse is the everyday choice for copy-paste spacing because it keeps line breaks while removing repeated spaces. Trim each line suits lists where every entry has accidental indentation. Remove all is for cases where every whitespace character must go, such as building a compact string from a sentence. Start with the gentlest mode and move to a stronger one only if the result still looks wrong. Each mode is one click, so comparing them takes seconds."
      },
      {
        "heading": "What mistakes should I avoid with whitespace cleanup?",
        "text": "The most common mistake is choosing remove all for prose, which joins every word together and removes paragraph breaks. Avoid running trim on code or poetry where indentation carries meaning. Check a sample of the output before using it on a full document. Remember that whitespace is treated as characters, so punctuation and visible symbols are left alone. Compare the result with the original for anything important before you publish it."
      }
    ],
    "faqs": [
      [
        "How do I trim leading and trailing spaces per line?",
        "Choose the trim each line mode. It removes spaces at the start and end of every line while keeping the lines themselves in place, so the list keeps its structure and only the edge spacing disappears."
      ],
      [
        "Does trimming affect spaces between words?",
        "No. Trim each line only touches the edges of a line, so spaces between words stay as they are. Use collapse if you also want repeated spaces between words reduced to a single space."
      ],
      [
        "Can remove all keep punctuation?",
        "Yes. Punctuation marks are not whitespace, so commas, periods, and symbols remain. Only spaces, tabs, and line breaks are removed, which is why the result can look like one long run of words and marks."
      ]
    ]
  },
  "keyword-density-checker": {
    "answer": "Keyword density checker means a tool that counts how often each word appears, divides that count by the total word count, and ranks the top terms as percentages. It is a simple way to count word frequency in text. Common stop words such as the and a can be filtered out so meaningful terms surface. The result describes only the text you pasted, not how it performs anywhere else.",
    "aiSummary": "Paste any passage and this browser tool lists its most frequent words with the share of total words each one takes. Each count is divided by the total, and common filler words can be skipped. The percentages only reflect word frequency in that passage, so short texts swing sharply with each edit.",
    "shortKeyword": "keyword density checker",
    "longKeywords": [
      "count word frequency in text",
      "find top keywords in an article",
      "check keyword balance for SEO"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I find top keywords in an article?",
        "text": "Drafting an article often drifts toward a few words you keep repeating. Paste the full draft and the checker lists the leading terms with their percentages, which makes repetition visible at a glance. Use the list the way an editor would: spot terms that dominate, check whether they carry the message, and swap some repeats for synonyms or specific details. Rerun the check after editing to see whether the balance shifted."
      },
      {
        "heading": "How should I interpret the percentages?",
        "text": "Each percentage is a term's count divided by the total word count of the text you pasted, so it is a share of that text only. Compare terms against each other rather than against any fixed target, because the right balance depends on your subject and audience. A term near the top is simply frequent, not necessarily important. Very short passages produce large swings, so read the numbers as a rough guide."
      },
      {
        "heading": "What are the common mistakes with word counts?",
        "text": "The first mistake is leaving common words in when you want meaningful terms; turn on stop word filtering to see content words instead. Another is assuming that different word forms are grouped without checking, since a count reflects the exact words in the text. Avoid reading the list as proof of quality. A high percentage can be a sign of repetition, but it can also simply reflect a topic that needs its key terms."
      }
    ],
    "faqs": [
      [
        "Can I check keyword balance for SEO with this?",
        "It gives a word-frequency snapshot of the text you paste, which is a useful starting point for reviewing repetition. It does not measure rankings or predict how a page will perform in search, so treat it as an editing aid."
      ],
      [
        "Does the checker send my text anywhere?",
        "No. Processing is local, so the text stays in your browser while the counts are calculated. You can check private drafts without uploading them to a server."
      ],
      [
        "Can I use this on a short paragraph?",
        "You can, but a short paragraph has few words, so each repeated term makes a large percentage. Results are more stable on longer passages, where a single word has less effect on the totals."
      ]
    ]
  },
  "url-encode-decode": {
    "answer": "URL encode means replacing characters that are unsafe in a web address with percent codes made of a percent sign and two hexadecimal digits. This tool uses the component-level encoding function, which encodes every reserved character, so it suits query string values. Decoding reverses the change. Invalid percent sequences show a clear error instead of producing corrupted output.",
    "aiSummary": "Converts text into percent-encoded form for safe use in a web address, and decodes encoded strings back to readable text. It applies the component-level encoding function, which handles every reserved character. Use it to encode a query string value safely. Its limit: it encodes one piece of text, so you still build the URL yourself.",
    "shortKeyword": "url encode",
    "longKeywords": [
      "how to encode spaces in a url",
      "decode percent encoded text back to readable",
      "encode a query string value safely"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to encode spaces in a url?",
        "text": "Spaces and symbols such as ampersands, question marks, and equals signs have special jobs inside a web address. When your text includes them as data, they must be encoded or the link will break. Paste the value, encode it, and place the result after the parameter name. This keeps the link intact whether the value is a search term, a file name, or a title with punctuation in it. Test it with a sample before using it widely."
      },
      {
        "heading": "How do I read the encoded output?",
        "text": "Each percent code stands for one byte of the original character, so an ampersand becomes a code that the web address can carry as data. Letters and digits stay the same, which makes the output easy to scan. Check the result by decoding it again: if you get your original text back, the round trip worked. Encoded strings produced by other tools can look similar, so compare against the source before trusting the result."
      },
      {
        "heading": "What mistakes break encoded URLs?",
        "text": "The most common mistake is encoding a whole URL when only one value needs encoding. That turns the colons and slashes into codes and the link stops working. Double encoding is another trap: encoding text that is already encoded makes the percent signs themselves encoded. When decoding fails, the input probably contains a stray percent sign or an incomplete code, which the tool reports as an error rather than guessing at the intent."
      }
    ],
    "faqs": [
      [
        "How do I decode percent encoded text back to readable form?",
        "Switch to decode mode and paste the encoded string. The tool reverses each percent code into its original character. If the string contains an incomplete code, you will see an error that points to a problem in the input."
      ],
      [
        "Does encoding change letters or digits?",
        "No. Letters and digits pass through unchanged, so only symbols, spaces, and other reserved characters gain codes. That keeps encoded values readable and easy to compare with the original."
      ],
      [
        "How can I encode a query string value safely?",
        "Encode only the value, not the whole address. Symbols inside the value, such as ampersands and equals signs, need codes so the receiving site reads them as data rather than as separators."
      ]
    ]
  },
  "uuid-generator": {
    "answer": "UUID generator means a tool that produces universally unique identifiers in the familiar eight-four-four-four-twelve hex layout. This one creates version 4 values from the browser's cryptographic random source, which supplies 122 random bits per value. Generate one at a time or in bulk. Collisions are so unlikely in practice that each value works as a unique key.",
    "aiSummary": "Creates random version 4 identifiers in the browser, one at a time or in batches, using the platform's cryptographic random generator. Each value is 122 random bits formatted as hex groups. The limit: values are random rather than time-ordered, so they do not sort by creation time.",
    "shortKeyword": "uuid generator",
    "longKeywords": [
      "generate random uuid values for test fixtures",
      "bulk uuid v4 for seeding databases",
      "make unique ids for database seed data"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I generate random uuid values for test fixtures?",
        "text": "Test fixtures need records with identifiers that look real but do not collide with each other. Generating a batch of version 4 values gives each fixture a distinct key without inventing strings by hand. Copy the list into your seed file or test setup, and keep the output in version control if the fixtures must stay stable. Because each value is random, regenerate only when you deliberately want new identifiers."
      },
      {
        "heading": "How should I read a generated UUID?",
        "text": "A UUID has five groups of hexadecimal characters separated by hyphens, following the eight-four-four-four-twelve pattern. In version 4 values the first character of the third group is always the version digit, which is how you recognize the type. Treat the whole string as an opaque identifier: do not try to read meaning into its characters, and compare values exactly, including the hyphens. Every value has the same length, so mismatches are easy to spot."
      },
      {
        "heading": "Is bulk uuid v4 for seeding databases safe?",
        "text": "For seeding development and test databases, bulk generation is a convenient approach because the random space is enormous. Still, check that your schema's unique constraints and foreign keys point at the right rows, since a generated list does not know your relationships. Avoid relying on the order of generated values, since they are random. Keep the generated set consistent across runs if other tests refer to specific identifiers. Write down which batch each fixture set came from."
      }
    ],
    "faqs": [
      [
        "Does the generator store the IDs it creates?",
        "Generation happens locally in your browser, so the values are created on your device. The page shows them to you, and you decide where to save or paste them."
      ],
      [
        "How do I make unique ids for database seed data?",
        "Generate a batch, paste the values into your seed script, and map each one to a row. Save the list if other fixtures refer to these identifiers, because a new batch will contain different values."
      ],
      [
        "Why are version four values random rather than ordered?",
        "Version four is defined by random bits, so it carries no timestamp or sequence. Choose a time-ordered version when you need values that sort by creation time, which is a different tradeoff."
      ]
    ]
  },
  "hash-generator": {
    "answer": "Hash generator means a tool that turns text into a fixed-length digest using a one-way function. This page computes SHA-256, SHA-512, or SHA-1 by UTF-8 encoding the text and passing it to the browser's Web Crypto digest function, then showing lowercase hexadecimal. The same input always gives the same hash, and a single changed character gives a completely different result.",
    "aiSummary": "Turns pasted text into a SHA-256, SHA-512, or SHA-1 digest inside the browser. The text is UTF-8 encoded, hashed with the native Web Crypto API, and displayed as lowercase hex. Use it to check whether two texts match by comparing digests. A hash is not encryption, and SHA-1 is considered weak for security purposes.",
    "shortKeyword": "hash generator",
    "longKeywords": [
      "compute a SHA-256 digest of text",
      "check whether two texts match",
      "why does one character change the hash"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I compare two texts with a hash generator?",
        "text": "Hashing gives each text a compact fingerprint. Paste the first text, note its digest, then paste the second and compare the two strings. If they match exactly, the inputs were identical as encoded. If they differ in any character, even a trailing space or a capital letter, the digests will be completely different. This is a practical way to verify a copied value, an exported text, or a template before and after an edit."
      },
      {
        "heading": "How do I compute a SHA-256 digest of text?",
        "text": "Paste your text, choose SHA-256, and the tool encodes the text as UTF-8 and returns a lowercase hexadecimal string. SHA-256 is a common default for integrity checks, while SHA-512 produces longer output and SHA-1 is kept mainly for legacy comparisons. Copy the digest exactly as shown, because uppercase letters or stray spaces will make a comparison fail even when the text looks the same. Paste it into your comparison notes exactly as copied."
      },
      {
        "heading": "What are the limits of hashing text?",
        "text": "A hash is a one-way fingerprint, so it cannot be used to recover the original text, but it is not encryption and it does not hide data from anyone who already has a candidate string. Hashing passwords calls for dedicated methods with salting, which a general digest tool does not provide. The digest also depends on the exact bytes you hashed, so line endings and invisible characters count. Confirm the input is the same before drawing conclusions."
      }
    ],
    "faqs": [
      [
        "Does a hash generator send my text to a server?",
        "No. The text is encoded and hashed in your browser with Web Crypto, so the input stays on your machine. The digest appears on the same page, so you can copy it immediately."
      ],
      [
        "Can I check whether two texts match with hashes?",
        "Yes. Generate the digest for each text using the same algorithm and compare the two hex strings. Identical digests indicate identical input, while any difference, however small, means the texts do not match."
      ],
      [
        "Why does one character change the hash so much?",
        "A good digest function spreads every input bit across the output, so even a one-character edit reshuffles the whole result. That avalanche effect is why a tiny difference looks like a completely new string."
      ]
    ]
  },
  "html-encode-decode": {
    "answer": "HTML encode means replacing the five reserved characters, ampersand, less-than, greater-than, double quote, and apostrophe, with safe entities such as &amp; and &lt;. This makes markup display as plain text instead of being interpreted by the browser. HTML decode reverses the change. Encoding is a display safeguard, not a complete sanitizer for untrusted markup.",
    "aiSummary": "Swaps characters that have special meaning in markup for their entity equivalents, so text shows literally rather than as HTML. Decoding reverses the swap. It works through a fixed map of five characters, and its limit is that it protects display only and does not clean untrusted code.",
    "shortKeyword": "html encode",
    "longKeywords": [
      "escape special characters for html display",
      "why encode user input before showing it",
      "convert html entities back to plain text"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why encode user input before showing it?",
        "text": "Anything a visitor types can contain characters that a browser reads as markup. Without encoding, a comment containing an angle bracket might be treated as a tag, breaking the layout or allowing injected elements. Encoding turns those characters into entities, so the browser displays them as ordinary text. Developers apply it at the point where data enters a page, which keeps content readable and prevents accidental formatting bugs. Encoding at the right place keeps that protection consistent."
      },
      {
        "heading": "Which characters should I check in encoded output?",
        "text": "Look for the five reserved characters: ampersand, less-than, greater-than, double quote, and apostrophe. An ampersand becomes an entity that starts with an ampersand, so seeing one in the output is normal. Confirm that angle brackets now appear as their entity codes, since those are the characters that would otherwise start a tag. Decode a sample to check that the original text returns exactly. Keep a few test strings with special characters for this purpose."
      },
      {
        "heading": "What mistakes do people make with entity encoding?",
        "text": "The most common mistake is encoding twice, which turns an existing entity into visible code on the page. Another is applying text encoding where an attribute context needs its own handling, so check the destination carefully. Decoding untrusted markup and then displaying it can reintroduce the danger that encoding prevented. Treat this tool as a helper for plain text, and use a proper sanitizer for HTML from unknown sources. Test any output in a page before you rely on it."
      }
    ],
    "faqs": [
      [
        "Can I escape special characters for HTML display in a code sample?",
        "Yes. Paste the snippet, encode it, and the angle brackets and quotes become entities that display as literal characters. This lets you show markup in documentation without the browser running it."
      ],
      [
        "Does encoding turn my text into a web page?",
        "No. The output is still plain text containing entity codes. Encoding does not create any layout or markup; it only changes how the characters are interpreted when a browser displays them."
      ],
      [
        "How do I convert html entities back to plain text?",
        "Switch to decode mode and paste the encoded string. Each entity is replaced with its original character, so the ampersand, brackets, and quotes return to normal text, ready for editing or copying."
      ]
    ]
  },
  "css-minifier": {
    "answer": "CSS minifier means a tool that compresses stylesheets by removing comment blocks, collapsing whitespace, and dropping spaces around braces, colons, and semicolons. The meaning of each rule is preserved in a smaller file. Keep your readable source, run the minifier on a copy, and test the result in the browser before publishing.",
    "aiSummary": "Minify CSS without changing styling rules by stripping comment blocks and collapsing whitespace around selectors, braces, and declarations. Everything runs in the browser, so your stylesheet stays on your device. The limit is that it compresses text only; it does not remove unused rules or restructure selectors.",
    "shortKeyword": "css minifier",
    "longKeywords": [
      "reduce css file size before deployment",
      "remove comments from a stylesheet",
      "minify css without changing styling rules"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I reduce css file size before deployment?",
        "text": "Production stylesheets benefit from smaller files because browsers download them before rendering the page. Long comments, indentation, and spacing that help you read the source add bytes without adding any styling. Run your final file through the minifier and publish the output while keeping the readable version in your repository. Small snippets pasted into a site builder also become lighter this way, which helps pages that load several stylesheets. Measure the sizes before and after to see the difference."
      },
      {
        "heading": "How do I check the minified output?",
        "text": "Compare file sizes before and after to confirm the reduction is real, then load the page and look at the parts that matter most: navigation, forms, and responsive breakpoints. Open the browser developer tools and check for console errors related to the stylesheet. Because the tool only removes comments and whitespace, a rule that was already broken stays broken, since minification is not a fix for invalid CSS. Keep a side-by-side copy until you are satisfied with the result."
      },
      {
        "heading": "What does a css minifier leave alone?",
        "text": "A minifier does not reorganize your selectors, merge duplicate rules, or delete styles that no page uses, so an unused rule remains in the output. It also does not add vendor prefixes or rewrite older syntax into newer forms. Think of it as a whitespace and comment cleanup rather than a full optimizer. For larger projects, a build pipeline with dedicated tools handles those extra steps. Use this tool for quick cleanups and a build pipeline for the rest."
      }
    ],
    "faqs": [
      [
        "Can I remove comments from a stylesheet without changing the layout?",
        "Yes. Comment blocks have no effect on how rules are applied, so removing them should leave the layout unchanged. Whitespace removal likewise keeps each declaration intact, but still check key pages after minifying."
      ],
      [
        "Does the minifier remove unused selectors?",
        "No. It only strips comments and whitespace and removes spacing around punctuation. Selectors that no page uses remain in the output, so removing dead code requires a separate tool or audit."
      ],
      [
        "Should I keep my unminified source file?",
        "Yes. Keep the readable version in your project so you can edit and review it later. Use the minified copy only for publishing, and regenerate it whenever the source changes."
      ]
    ]
  },
  "javascript-minifier": {
    "answer": "JavaScript minifier means a tool that shrinks script source by removing block and line comments and collapsing empty lines. This javascript minifier uses conservative minification that keeps code structure, so the logic stays readable and unchanged. Use it for quick cleanup, and use a real build tool when you need aggressive renaming or bundling.",
    "aiSummary": "Trims JavaScript by stripping comments and blank lines, a deliberately gentle pass that leaves statements in place. The work happens in your browser, so the source is not uploaded. Its main limit is that it does not shorten identifiers or bundle modules, so the output is only modestly smaller than the input.",
    "shortKeyword": "javascript minifier",
    "longKeywords": [
      "remove comments from javascript for smaller files",
      "light cleanup before shipping javascript",
      "conservative minification that keeps code structure"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should I do a light cleanup before shipping javascript?",
        "text": "A light cleanup suits small scripts, snippets pasted into a site builder, or files you want to keep easy to read for teammates. Comments that describe internal decisions can stay in your repository but add weight to the public file. Removing them and collapsing empty lines is a low-risk step before deployment. Choose it when the goal is modest savings with a clear diff rather than a dramatic reduction in size."
      },
      {
        "heading": "How do I check that my script still runs?",
        "text": "Load the minified file in a test page and exercise the features it powers, such as forms, animations, and event handlers. Watch the browser console for syntax errors, which would appear immediately if something went wrong. Compare behavior against the original, and keep the readable source so you can revert quickly. Because the tool stays conservative, the logic should behave the same, but a quick run through real interactions is still the right final step."
      },
      {
        "heading": "What are the limits of this conservative approach?",
        "text": "A conservative pass does not rename variables, bundle modules, or remove unused functions, so it will not match the output of a production toolchain. The size reduction is usually modest because most of the bytes live in the code itself. Source maps, transpilation, and dead code elimination are outside its scope. If you need those, a real build tool is the right choice, and this tool still helps with quick comment and spacing cleanup."
      }
    ],
    "faqs": [
      [
        "Can I remove comments from javascript for smaller files?",
        "Yes. Block and line comments are stripped, along with unnecessary blank lines. This trims the file without touching the statements, which is the main reason the cleanup is low risk for most scripts."
      ],
      [
        "Does minifying keep my code on my device?",
        "Yes. Processing happens locally in your browser, so the script you paste is not sent to a server. You can clean private code without uploading it anywhere."
      ],
      [
        "Should I minify a script I plan to edit later?",
        "Usually not. Keep the readable file as the working copy and produce the minified version only for publishing. That way edits stay easy, and you never need to reverse the cleanup."
      ]
    ]
  },
  "sql-formatter": {
    "answer": "A sql formatter rewrites a query so each major clause, such as SELECT, FROM, WHERE and JOIN, starts on its own line, with comma-separated column lists indented underneath. It changes only whitespace and line breaks, not what the query does. Use it to split sql clauses onto separate lines before reviewing or sharing a query.",
    "aiSummary": "Reflows a cramped SQL query by starting a new line at common keywords such as SELECT, FROM, WHERE and GROUP BY, then indenting comma-separated items. The core method is keyword detection plus whitespace layout. Its main limit is that it recognizes common keywords only, so unusual dialect syntax may not lay out cleanly.",
    "shortKeyword": "sql formatter",
    "longKeywords": [
      "how to make a sql query readable",
      "indent sql column lists for review",
      "split sql clauses onto separate lines"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to make a sql query readable?",
        "text": "Long queries written in one line are hard to scan. Pasting the query into the formatter gives each clause its own line, so you can follow the flow from SELECT down to any ORDER BY. This is useful when reviewing a colleague's query, debugging a join that returns surprising rows, or preparing a snippet for documentation. Each clause becomes a visual landmark, and indented column lists make it obvious which fields are being pulled. The result is the same query, just laid out so a human can read it in less time."
      },
      {
        "heading": "How should I read the formatted output?",
        "text": "Read the output from top to bottom, treating each line that starts with a keyword as a new step in the query. Indented lines belong to the clause above them, so a column list under SELECT is visually grouped apart from the table names that follow FROM. Check that table names and join conditions appear where you expect them. If a line looks out of place, the original query may have an unusual keyword order, and the layout is simply making that visible. Compare the formatted version with the original to confirm no words were lost."
      },
      {
        "heading": "What are the common mistakes or limits?",
        "text": "The most common mistake is assuming the formatter checks correctness. It changes spacing and line breaks, so a query with a misspelled column or a missing comma is still broken after formatting, just easier to see. Keyword recognition covers the common clauses named in the description, so less common or dialect-specific syntax may not be laid out as neatly. Very large or deeply nested queries can still be hard to follow. Always run the formatted query in your own database environment before relying on it, because only the database can confirm that the logic works."
      }
    ],
    "faqs": [
      [
        "Can I indent sql column lists for review?",
        "Yes. Comma-separated column lists are indented beneath their clause, which makes it easier to scan which fields a query returns. The indentation is only visual and does not change the query's results."
      ],
      [
        "Will the formatter catch syntax errors?",
        "No. The formatter only reflows text around recognized keywords and does not parse the whole statement. A missing parenthesis or misspelled keyword will still be present after formatting, so run the query in your database to find errors."
      ],
      [
        "Does the sql formatter send my query anywhere?",
        "No. This tool runs locally in your browser, so the query is processed on your device rather than uploaded to a server. You can still check the output in your own environment before using it."
      ]
    ]
  },
  "markdown-to-html": {
    "answer": "A markdown to html converter reads common Markdown syntax line by line and emits matching HTML tags for headings, bold and italic text, links, lists, inline code and code blocks. Code is escaped so characters display literally. Output is ready to paste into a web page, though you should review it first.",
    "aiSummary": "Turns Markdown text into HTML by parsing it line by line and emitting matching tags for headings, lists, links and code. The method will escape code blocks in html output so characters display literally. Its main limit is that only the listed features are covered, so unsupported syntax may not convert as expected.",
    "shortKeyword": "markdown to html",
    "longKeywords": [
      "convert markdown headings and lists",
      "escape code blocks in html output",
      "paste converted html into a web page"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I paste converted html into a web page?",
        "text": "Copy the HTML produced by the converter and place it inside the body of your page, in the spot where the content should appear. Most content management systems offer an HTML or code block for this. Paste the markup as it is rather than rewriting its tags, because the escaping inside code samples is already handled. Then preview the page on a staging copy to confirm the layout. If your editor reformats the markup, compare the result with the original output to be sure the code blocks still show literally."
      },
      {
        "heading": "What should I check in the converted output?",
        "text": "Start with the headings, since they define the outline of the page and should appear in the same order as in your source. Next, check links and confirm each one points to the intended address. Look closely at code blocks and inline code, because their characters should display literally rather than running as markup. Finally, scan the lists to confirm the items and their nesting match what you wrote. A quick side-by-side comparison of source and output catches most issues before publishing."
      },
      {
        "heading": "What are the common limits or mistakes?",
        "text": "A common mistake is assuming every Markdown feature is supported. The converter works from the features listed in its description, so extended syntax, such as some tables or custom blocks, may come out as plain text or be dropped. Another mistake is editing the HTML after conversion without understanding the tags, which can break the structure. The output is also not a security review, so check the content first if it comes from an untrusted source before publishing it on a site."
      }
    ],
    "faqs": [
      [
        "Can I convert markdown headings and lists at once?",
        "Yes. Headings and lists are both part of the supported syntax, so one conversion pass handles them together. Check the result in a preview, because list nesting and spacing in the source can affect how the output looks."
      ],
      [
        "Should I review the output before publishing it?",
        "Yes. The converter emits HTML from the syntax it recognizes, so it does not judge whether your content is accurate or appropriate. Read the rendered result and confirm links, code samples and headings look right before the page goes live."
      ],
      [
        "Does the tool handle tables in Markdown?",
        "This tool's listed features are headings, bold and italic, links, lists, inline code and code blocks, and table support is not part of that description. Test any table syntax in the output before relying on it, and fix it by hand if needed."
      ]
    ]
  },
  "number-base-converter": {
    "answer": "A number base converter takes a value written in one base, such as binary, octal, decimal or hexadecimal, converts it to an integer, then writes that integer in base 2, 8, 10 and 16. Hexadecimal output carries the conventional 0x prefix. Use it to check binary to decimal or hex to decimal conversions quickly.",
    "aiSummary": "Converts a number entered in binary, octal, decimal or hexadecimal into all four representations at once. The value is parsed into an integer and re-rendered in base 2, 8, 10 and 16, which suits hex to decimal conversion for programmers. Its main limit is that the description covers integers, so fractional input is not documented.",
    "shortKeyword": "number base converter",
    "longKeywords": [
      "how to convert binary to decimal",
      "see all four number bases at once",
      "hex to decimal conversion for programmers"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to convert binary to decimal?",
        "text": "Binary to decimal conversion means reading each digit as a power of two, starting from the right, and adding up the place values that contain a one. This tool does the work for you: enter the binary value with binary as its input base, and read the decimal result in the same view. Seeing the number re-rendered in other bases helps you confirm the answer, since octal and hexadecimal should line up with the same underlying value. It is a fast way to check homework, debugging output or a value copied from a register dump."
      },
      {
        "heading": "How should I read the four outputs?",
        "text": "Each output shows the same underlying integer written in a different base. Decimal is the everyday base, binary shows individual bits, octal groups bits in threes, and hexadecimal groups them in fours. Hexadecimal output carries the conventional 0x prefix, so it is easy to spot. If two outputs look different but refer to the same value, that is expected. Compare the decimal line first, because it is the easiest to check against a count you already know."
      },
      {
        "heading": "What are the common mistakes or limits?",
        "text": "A common mistake is entering digits that do not belong to the input base, such as a 9 in an octal value, which cannot be parsed correctly. Another is mixing up hexadecimal letters with decimal text. Remember that the tool works on the value as an integer, so fractional input is outside its described behavior. Finally, the result depends on the base you selected, so confirm that choice before trusting the output."
      }
    ],
    "faqs": [
      [
        "Can I see all four number bases at once?",
        "Yes. The tool renders the parsed value in binary, octal, decimal and hexadecimal together, so you do not need to convert each one separately. This makes it easy to compare a value across bases in a single view."
      ],
      [
        "Why does the 0x prefix appear?",
        "The 0x prefix is the conventional marker for hexadecimal numbers. It tells a reader that the digits that follow are base 16, which avoids confusing a hex value with a decimal one. The prefix is part of the notation, not extra data."
      ],
      [
        "What happens if I enter an invalid digit?",
        "The description does not say exactly how invalid input is reported, so do not rely on a partial result. Confirm that every digit fits the input base, such as only 0 and 1 for binary, before reading the output."
      ]
    ]
  },
  "http-status-codes": {
    "answer": "HTTP status codes are three-digit numbers a server returns to say how it handled a request. This reference lists them from 200 OK to 500 Internal Server Error, grouped into 1xx informational, 2xx success, 3xx redirection, 4xx client errors and 5xx server errors. Type a number or keyword to filter the list.",
    "aiSummary": "Looks up HTTP response codes and gives a plain explanation for each one. The method groups codes by their first digit, and you can search status codes by number or keyword. Its main limit is that it describes standard meanings, not how a particular application uses them, so check your own server logs as well.",
    "shortKeyword": "http status codes",
    "longKeywords": [
      "what each http response code means",
      "difference between client and server errors",
      "search status codes by number or keyword"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What is this reference used for?",
        "text": "Developers, site owners and support staff meet status codes in logs, browser tools and error reports. This reference lets you look up a code quickly and read a plain explanation of what it signals. It is useful when a page fails to load, a redirect behaves oddly, or an API returns an unfamiliar response. Because the list is searchable, you can type part of a number or a word from the meaning and jump to the entry rather than scanning every class by hand. Use it as a fast starting point for diagnosis."
      },
      {
        "heading": "How do I find what each http response code means?",
        "text": "Start with the first digit, because it groups the code into a class: 1xx informational, 2xx success, 3xx redirection, 4xx client errors and 5xx server errors. That tells you whether the request worked, whether the client needs to change something, or whether the server failed. Then read the specific entry for the exact meaning. Two codes in the same class can point to very different fixes, so the class is a direction rather than a full answer."
      },
      {
        "heading": "What are common mistakes when reading status codes?",
        "text": "A common mistake is treating the class as the whole story. A 4xx error means the request was problematic from the client side, but the right fix depends on the exact code and what the server expects. Another mistake is assuming the message a browser shows matches the server code exactly, since intermediaries, caches and proxies can change what you see. Read the entry for the precise code, and confirm it against the actual response when you can."
      }
    ],
    "faqs": [
      [
        "What is the difference between client and server errors?",
        "Client errors, the 4xx class, mean the request itself seems to be the problem, such as a missing page or missing permission. Server errors, the 5xx class, mean the request was reasonable but the server failed to handle it. The class tells you where to look first."
      ],
      [
        "Why does my browser show a different message than this list?",
        "Browsers and websites can display their own error text, and a page may be generated by an intermediary such as a proxy or cache. Check the response itself in developer tools when possible, since the code there is what matters for diagnosis."
      ],
      [
        "Can I search by a word instead of a number?",
        "Yes. Type a keyword from a meaning, such as a word from the explanation, and the list filters to matching entries. Searching by number works too, so you can use whichever is easier to remember or copy from a log."
      ]
    ]
  },
  "barcode-generator": {
    "answer": "A barcode generator encodes your value into the bar pattern for a chosen symbology, such as CODE128, EAN-13, UPC or CODE39, and renders it as vector SVG. It checks that the value fits that format's rules, for example that an EAN-13 value has 12 to 13 digits. The file can be downloaded and scaled without losing sharpness.",
    "aiSummary": "Generates CODE128, EAN-13, UPC and CODE39 barcodes from a typed value as a scalable svg barcode for print. The value is encoded into the bar pattern after a check against that format's rules. Its main limit is that it checks format rules only, so it cannot confirm a product's registration.",
    "shortKeyword": "barcode generator",
    "longKeywords": [
      "make a scannable barcode for a product",
      "validate barcode digits before printing",
      "scalable svg barcode for print"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I make a scannable barcode for a product?",
        "text": "Pick the symbology that the retailer, warehouse system or scanner expects, since formats differ in the characters and lengths they allow. Enter the value exactly as it should be encoded, then generate the barcode and download the SVG. Test a printed sample with the scanner you will actually use before printing a large batch. Keep the value and the format recorded together so future labels match the same product record."
      },
      {
        "heading": "How do I read the validation feedback?",
        "text": "The tool compares your value against the rules of the selected format, so a message usually points to a length or character problem. For a format such as EAN-13, the value must contain only digits and the right number of them, so an extra letter or a missing digit will be flagged. Read the message as a description of the format rule rather than a verdict on the product itself. Once the value follows the rule, the bar pattern is rendered from it."
      },
      {
        "heading": "What are the common mistakes or limits?",
        "text": "A frequent mistake is choosing a format that does not match the target system, which can produce a code the scanner cannot read in the expected way. Another is treating a valid pattern as a registered product code, since the generator encodes what you type and cannot confirm ownership or uniqueness. Also avoid shrinking a barcode until the bars blur, because print size and the blank quiet space around the symbol affect scanning. Check the printed result before relying on it."
      }
    ],
    "faqs": [
      [
        "Should I validate barcode digits before printing?",
        "Yes, because a value that fails the format rule will not scan correctly or may not render at all. The tool's checks catch length and character errors early, so you can fix the input before wasting paper or label stock on a bad print."
      ],
      [
        "Can the tool confirm a barcode is registered?",
        "No. The generator only builds the symbol from the value you enter and checks it against format rules. It cannot tell you whether a code belongs to a product or is unused elsewhere, so confirm registration through your own product records."
      ],
      [
        "Does the barcode leave my value on a server?",
        "No. This tool runs locally in your browser, so the value is encoded on your device and the SVG is created there. You can still review the downloaded file before using it in print or on a label."
      ]
    ]
  },
  "robots-txt-generator": {
    "answer": "A robots.txt generator writes a plain text file using the Robots Exclusion Standard, with User-agent lines followed by Allow and Disallow rules. It builds common policies: allow everything, block everything, or allow with specific exclusions, then appends your sitemap URL. Save the output at the root of your site so crawlers can find it.",
    "aiSummary": "Builds a robots.txt file that follows the Robots Exclusion Standard, using User-agent lines with Allow and Disallow rules. It supports allow-everything, block-everything and custom exclusion policies, then appends a sitemap URL. Its main limit is that it writes rules only; crawlers may ignore them, and the file does not secure private content.",
    "shortKeyword": "robots.txt generator",
    "longKeywords": [
      "block a staging site from crawlers",
      "add a sitemap line to robots.txt",
      "allow some folders but block others"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What is a robots.txt file for?",
        "text": "A robots.txt file sits at the root of a site and gives crawlers instructions about which paths they may crawl. It is a request that well-behaved crawlers follow, not a lock on the server. Use it to keep crawlers out of areas such as internal search results or admin pages, and to point them toward your sitemap. The generator produces a correctly formatted file so you do not have to remember the exact syntax of User-agent and Disallow lines."
      },
      {
        "heading": "How do I add a sitemap line to robots.txt?",
        "text": "The generator appends your sitemap URL as a separate line in the file. Enter the full address of the sitemap, including the protocol, so crawlers can fetch it directly without guessing the location. Keeping the sitemap line in robots.txt helps crawlers discover the sitemap even if you have not submitted it elsewhere. Check the final file to confirm the URL is correct and that it is not accidentally mixed into a Disallow line."
      },
      {
        "heading": "When should I block a staging site from crawlers?",
        "text": "Blocking a staging site with a Disallow rule is common, but it is only one piece of the picture. A robots.txt rule discourages compliant crawlers, yet it does not hide a page from people who have the link, and it cannot make a page private. If a staging site must stay out of search, pair the rule with password protection on the server. Also remember that a broad block copied onto a live site can hide important pages, so check the file before publishing. Review it again after any site change."
      }
    ],
    "faqs": [
      [
        "Can I use the generator to block all crawlers?",
        "Yes. The tool includes a block-everything policy, which tells every crawler to avoid the whole site. Use it with care, because a live site with that file can disappear from search results. Switch to a targeted policy once you are ready."
      ],
      [
        "Is robots.txt a security tool?",
        "No. It is a set of requests that well-behaved crawlers respect, and the file is publicly readable, so it can even reveal paths you list. Use real access controls such as passwords or server rules to protect content that must stay private."
      ],
      [
        "How do I allow some folders but block others?",
        "Choose the allow-with-exclusions policy, then list the folders to block as Disallow rules. Everything not listed stays open to crawlers under that policy. Check the generated file and test a few URLs before publishing."
      ]
    ]
  },
  "xml-sitemap-generator": {
    "answer": "An xml sitemap generator creates a file with one url entry per page inside a urlset element, following the sitemaps.org schema. Each URL can carry an optional last-modified date and a change frequency hint. Ampersands are escaped automatically, so the XML stays well formed. Submit the finished file to search engines so they can discover your pages.",
    "aiSummary": "Converts a list of URLs into an XML sitemap file, with optional last-modified dates and change frequency hints for each entry. It escapes ampersands and follows the sitemaps.org schema. Its main limit is that it only knows the URLs you list. Submit a sitemap to search engines once it is current.",
    "shortKeyword": "xml sitemap generator",
    "longKeywords": [
      "turn a url list into sitemap xml",
      "add a lastmod date to each entry",
      "submit a sitemap to search engines"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I turn a URL list into sitemap xml?",
        "text": "Paste or list one URL per line, using the full address for each page you want indexed. The generator wraps each address in a url entry inside a urlset element, which is the structure the sitemaps.org schema expects. Include only pages you actually want search engines to discover, such as public articles and product pages, and leave out drafts or duplicate addresses. The result is a single XML file you can save and place on your site."
      },
      {
        "heading": "What do the optional fields add to each entry?",
        "text": "The lastmod field records when a page last changed, which helps a crawler decide whether to revisit it. The changefreq field is a hint about how often the content tends to change, such as daily or monthly. Leave these blank if you do not know them, since a missing field is valid and an inaccurate date is worse than none. Use real modification dates from your content system rather than today's date on every entry."
      },
      {
        "heading": "What are the common mistakes or limits?",
        "text": "A common mistake is listing URLs that redirect, return errors or are blocked by robots rules, which wastes crawl attention and confuses the file. Another is assuming changefreq controls exactly when a page is crawled, when it is only a hint. The generator also cannot see your site, so it will not catch pages you forgot to list. Compare the output with your live pages before submitting, and regenerate the file whenever content is added or removed."
      }
    ],
    "faqs": [
      [
        "Should I add a lastmod date to each entry?",
        "Add it when you can supply an accurate date from your content system, because it tells crawlers when a page changed. Skip it rather than filling every entry with the same or guessed date, since misleading dates reduce the value of the field."
      ],
      [
        "Why does my URL need escaping?",
        "Ampersands and some other characters have special meaning in XML, so a raw ampersand inside a query string would break the file. The generator escapes them automatically, so you can paste addresses as they appear in your browser."
      ],
      [
        "Where should I host the finished sitemap file?",
        "Place it on your own domain, usually at a stable address such as the site root, and reference that exact location when you submit it. Keep the file updated as pages change, and make sure the address returns the XML without redirects."
      ]
    ]
  },
  "meta-tag-generator": {
    "answer": "A meta tag generator assembles the essential HTML meta tags for a page head, including title, description, robots and viewport, with special characters escaped. It shows live character counts against the rough limits search engines use when truncating, about 60 characters for titles and 160 for descriptions. Use the output to copy tags into your page.",
    "aiSummary": "Generates essential HTML meta tags, including title, description, robots and viewport, with escaped characters and live length feedback. It assembles head tags and compares their length against rough truncation targets. Its main limit is that the counts are approximate, so you should check head tags before publishing a page.",
    "shortKeyword": "meta tag generator",
    "longKeywords": [
      "how long should a seo title be",
      "write a meta description that fits",
      "check head tags before publishing a page"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How long should a seo title be?",
        "text": "Search engines often truncate long titles, so the title needs to communicate its purpose early. The generator flags titles that run past the rough limit of about 60 characters, which gives you a practical target. Lead with the most important words, because truncated titles lose their ending. Treat the count as a guide rather than a hard rule, since truncation depends on the characters used and the device. Write for people first and let the limit shape the wording, not the other way round."
      },
      {
        "heading": "How do I write a meta description that fits?",
        "text": "Describe what the page offers in plain sentences, using words a searcher would recognize. The live counter shows when the text passes about 160 characters, the point where descriptions are often cut off. Shorter descriptions are fine if they still say something specific. Avoid repeating the title word for word, and avoid stuffing in keywords, because the description is a summary for the reader. Read it aloud once to check that it makes sense on its own."
      },
      {
        "heading": "Which optional tags can I skip?",
        "text": "The robots tag tells crawlers whether a page may be indexed or whether its links should be followed, so an incorrect value can keep a page out of results. The viewport tag tells mobile browsers how wide to render the page, which affects layout on phones. Leave out tags you do not need, and check that each one sits inside the head section. Before publishing, review the generated markup once to confirm the values match what you intend."
      }
    ],
    "faqs": [
      [
        "Can I see character counts while I type?",
        "Yes. The tool shows live counts for the title and description, and flags when either runs past the rough limits it targets. Use those counts as a guide while you edit the wording."
      ],
      [
        "Should the title and description be identical?",
        "No. The title names the page and the description summarizes it for a searcher, so repeating the same words wastes space and gives less information. Make each one distinct while keeping both accurate to the page."
      ],
      [
        "Where do the meta tags go in my page?",
        "They belong inside the head section of the HTML document, which is where browsers and crawlers read page metadata. Paste the generated tags there, then reload the page and check that they appear in the source."
      ]
    ]
  },
  "open-graph-generator": {
    "answer": "An open graph generator builds og: property tags and matching twitter: tags for the title, description and preview image of a page. Platforms read these tags from the page head to render a rich link preview instead of a bare URL. Escaping is handled for you, and the output can be copied into your page's head section.",
    "aiSummary": "Creates Open Graph and Twitter Card meta tags for title, description and preview image from the same fields, so you can use og and twitter tags together. Platforms read the property and matching twitter tags from the head. Its main limit is that the tool writes tags only, and platforms may cache earlier previews.",
    "shortKeyword": "open graph generator",
    "longKeywords": [
      "choose an image size for link previews",
      "test open graph tags before sharing",
      "can one set of tags serve"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I choose an image size for link previews?",
        "text": "The preview image is the most visible part of a shared link, so choose an image that stays clear when it is scaled down. A landscape image with the main subject centered works well, and small text tends to be unreadable in a preview. The generator stores the address you provide, so make sure the image URL is public and loads without a login. Pick one consistent image per page so the preview matches what visitors expect when they arrive."
      },
      {
        "heading": "What do the title and description tags control?",
        "text": "The og title and description supply the headline and summary shown under the image in a shared link. Matching twitter tags let X and similar platforms show the same card. Because each platform reads its own tags, the generator outputs both sets from one set of fields. Keep the wording short and specific, since long text may be cut off in the preview. Test the wording in a preview before settling on it."
      },
      {
        "heading": "How can I test open graph tags before sharing?",
        "text": "Publish the page or a staging copy first, then paste its address into the link preview debugger offered by the platforms you care about. Platforms often cache earlier previews, so an old image or title may persist after you fix the tags. Check the final head section in your page source to confirm the tags match what you generated. Test the wording in a preview before settling on it. Test a few key pages rather than only the homepage, because templates can differ between them."
      }
    ],
    "faqs": [
      [
        "Can one set of tags serve every page?",
        "Technically yes, but every page should describe its own content, so a shared title and image make previews less useful. Generate tags for each important page, and keep the image relevant to that page's subject."
      ],
      [
        "Does the preview image need a specific file type?",
        "The tool does not specify a file type in its description, so check the platform's current requirements before publishing. Use a common web image format, and confirm the image address loads publicly in a private browser window."
      ],
      [
        "Does the generator upload my page or images?",
        "No. The tool runs locally in your browser, so the tags are built on your device from the values you enter. The image itself is referenced by its address, so the file still needs to be hosted publicly."
      ]
    ]
  },
  "extract-pdf-pages": {
    "answer": "Extract PDF pages means picking specific pages from a PDF and saving only those into a new document. List the pages to keep, such as 1, 3-4, and the tool builds a fresh PDF copied exactly from the original, in the order you listed. The original file is left unchanged.",
    "aiSummary": "Builds a new PDF from selected pages of an existing file, copied exactly and placed in the order you list them. It can keep pages in a chosen order for sharing or reference. Its main limit is that the new file is separate, so mistyped page numbers produce the wrong pages.",
    "shortKeyword": "extract pdf pages",
    "longKeywords": [
      "pull selected pages from a pdf",
      "keep pages in a chosen order",
      "save only needed pages from a long pdf"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I pull selected pages from a PDF?",
        "text": "Load the PDF into the tool and list the page numbers you want to keep, separated by commas. Ranges work as well, so a list such as 1, 3-4 keeps page one followed by pages three and four. The tool then builds a new document containing only those pages. Check the page count of the result before sharing it, because an incorrect range is an easy mistake to miss. Scan the list once more before extracting."
      },
      {
        "heading": "How should I order the pages I keep?",
        "text": "The output follows the order you type, not the order in the original, so the list is effectively the outline of the new file. Type the numbers in ascending sequence to keep the original order, or change the sequence to build a different flow. Read the list from left to right before extracting, since it describes the new document exactly. A short check of the list at this stage saves a second extraction later."
      },
      {
        "heading": "When should I save only needed pages from a long PDF?",
        "text": "Saving only the pages you need is useful when a long report must be shared with someone who only needs one section, or when a file is too large to send comfortably. It also helps when you want a clean copy of a chapter for reference. Keep in mind that the new file is separate, so later edits to the original will not appear in it. Note the page numbers used in the source so the extract is easy to trace back."
      }
    ],
    "faqs": [
      [
        "Does the extraction need an internet connection?",
        "No. The tool runs in your browser, so the PDF is processed on your device and does not need to be uploaded. Speed then depends on your computer, which matters most for large files."
      ],
      [
        "Can I keep pages in a chosen order?",
        "Yes. The new PDF follows the sequence you list, so you can keep pages in a chosen order by typing the numbers in that sequence. Check the final page count afterward to confirm nothing was dropped."
      ],
      [
        "What happens if a page number is wrong?",
        "A page number that does not match the document cannot give you the page you meant, so correct the list first. Open the new file afterward and check each page to confirm it is the one you expected."
      ]
    ]
  },
  "delete-pdf-pages": {
    "answer": "Delete PDF pages is the process of removing chosen page numbers from a PDF while every other page stays in its original order. You list the pages to drop, such as 2 or 5-6, and the tool saves a new file without them. Everything runs in your browser, and the remaining pages are copied across unchanged.",
    "aiSummary": "This tool lets you delete unwanted pages from a PDF in the browser by listing their numbers and saving a trimmed copy. Remaining pages keep their original order and content. The main limit is that you must type the page numbers yourself, so check them in your viewer to avoid removing the wrong pages.",
    "shortKeyword": "delete pdf pages",
    "longKeywords": [
      "how to remove pages from a pdf",
      "remove blank pages from a pdf",
      "delete unwanted pages from a pdf"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to remove pages from a PDF?",
        "text": "People trim PDFs for many reasons: a cover sheet is no longer needed, an appendix belongs in a different file, or a scanned report includes blank sheets. This tool handles those cases by removing only the pages you name. It is a quick way to shorten a contract or handout before sharing it. Because the output is a new file, your original document is left untouched on your device. Nothing needs to be installed first."
      },
      {
        "heading": "How do you read the page list before deleting?",
        "text": "Enter page numbers separated by commas, and use a dash for a range, such as 2 or 5-6. Check the page count in your viewer before typing anything, because the numbers are taken exactly as written. Count from the first page of the file you loaded, not from any earlier version. Download the result only after checking its page count yourself. A short check now prevents exporting a file that lost the wrong pages."
      },
      {
        "heading": "What mistakes should you avoid when trimming pages?",
        "text": "The most common mistake is typing a page number from memory instead of checking it, especially when a cover sheet shifts the numbering you expect. Listing every page is another trap, since nothing would be left to save, so confirm that some pages remain. Also watch overlapping ranges like 3-5 and 4, which can leave you unsure what was removed. Deleted pages are not in the new file, so keep your original copy safe."
      }
    ],
    "faqs": [
      [
        "Can I remove blank pages from a PDF in one go?",
        "Yes, if you know their page numbers. Type each blank page in the list, separated by commas, or use a dash for a run of consecutive blanks, then run the tool once. The trimmed PDF downloads with all other pages kept in order."
      ],
      [
        "What happens to the original file after I download the trimmed one?",
        "The trimmed file is a separate download, so the copy you loaded is not overwritten by the tool. Keep your original as a backup before sharing the new version. The work happens in your browser, so the edit stays on your device."
      ],
      [
        "How do I avoid removing the wrong pages?",
        "Open the file in a viewer first and note the page numbers you want gone, counting from the first page. Enter them in the tool exactly as you noted them, then check the page count of the result. If the number is off, reload the original and try again."
      ]
    ]
  },
  "rotate-pdf": {
    "answer": "Rotate PDF means turning selected pages a quarter turn, a half turn, or three quarters of a turn so they display the right way up. The rotation is added to each page's existing orientation and saved into the file. You can apply it to all pages or only odd or even ones.",
    "aiSummary": "This tool shows how to rotate pages in a PDF by a quarter, half or three-quarter turn, adding the turn to each page's orientation and saving the result. It can target all pages or only odd or even ones. The limit is fixed quarter steps, so a slightly crooked scan needs another tool.",
    "shortKeyword": "rotate pdf",
    "longKeywords": [
      "how to rotate pages in a pdf",
      "fix sideways scanned pages in a pdf",
      "rotate only odd or even pages"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do you fix sideways scanned pages in a PDF?",
        "text": "Scanners and phone cameras often save a page sideways, so pages in one batch often share the same fix. Rotating the file once is quicker than turning each page by hand in a viewer. Pick the quarter turn that makes the text read normally, then apply it to the whole document or just the affected pages. Check the first page after saving, because a wrong direction is easy to spot there. Nothing else in the layout is changed."
      },
      {
        "heading": "How do you rotate only odd or even pages?",
        "text": "Choose odd pages when a scanner fed alternating sheets in the wrong direction, which can occur with some duplex scans. Choose even pages to correct the opposite set. Choose all pages when the whole batch is turned the same way. Because the tool adds the rotation to each page's existing orientation, applying it twice to the same page turns it further, so apply it once and check the result. Look at a few pages first."
      },
      {
        "heading": "What limits should you know before rotating a file?",
        "text": "The tool turns pages in quarter steps, so a slightly crooked scan stays crooked and needs a different correction. Rotating only some pages can leave a mixed document, so scroll through the whole result before sharing it. Keep your original file, because a rotation applied and saved is easy to forget. If you are unsure which direction is right, test on a copy first. Preview the result in a viewer, since the direction is easy to misjudge at small sizes."
      }
    ],
    "faqs": [
      [
        "Can I fix sideways scanned pages in a PDF without re-scanning?",
        "Yes. Select the quarter turn that corrects the orientation, apply it to all pages or the affected ones, and download the saved file. Re-scanning is unnecessary because the tool changes only how each page is displayed and stored, not the scanned image itself."
      ],
      [
        "What turn should I pick for a page that is upside down?",
        "Choose the half turn, which turns the page completely around. Check the text direction in your viewer first, so you pick the correct option the first time."
      ],
      [
        "What should I do if the rotated file looks wrong?",
        "Do not overwrite the original, since it is still on your device. Reload the source PDF, choose a different turn or page selection, and run the tool again. Compare the first page of each attempt before sharing."
      ]
    ]
  },
  "add-page-numbers-to-pdf": {
    "answer": "PDF page numbers are digits stamped onto each page of a PDF at a position you choose, counting up from a starting number you set. The tool embeds a standard font and draws the number at that spot on every page. You can place them in a corner or in the center. The work happens in your browser, so the file never has to be sent anywhere.",
    "aiSummary": "Adds sequential page numbers to a PDF in the browser, drawn at a chosen corner or center with a custom starting value. The main limit is that numbers are stamped on top of existing content, so a chosen position may overlap text or images, and you should check the result in your viewer.",
    "shortKeyword": "pdf page numbers",
    "longKeywords": [
      "how to number pages in a pdf",
      "start page numbers from a custom number",
      "add page numbers to a pdf"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to number pages in a PDF?",
        "text": "Page numbers help readers find their place in a long report, a handout, or a printed manual. They also make it easier to refer to a specific page when someone discusses the document. This tool stamps the numbers directly onto the pages, so they show up wherever the file is opened or printed. Choose the corner that suits your layout, then download the new file. Your original stays as it was."
      },
      {
        "heading": "Can you start page numbers from a custom number?",
        "text": "Yes. Set the starting number, and the tool counts upward from that value on every page. This suits a document that is an excerpt of a longer work, where the first page should carry the number it had in the original. Choose the position before you run it, then check that the first page looks right. A quick look at the last page confirms the final number is what you expected."
      },
      {
        "heading": "What limits come with stamping numbers on a PDF?",
        "text": "Numbers are drawn on top of whatever already sits on the page, so a busy footer or a dark image can make them hard to read. Pick a position with open space, such as a bottom corner, rather than a center spot over a figure. Stamped numbers become part of the page, so a change later means running the tool again on a clean copy. Keep an unnumbered original in case a recipient needs the plain version."
      }
    ],
    "faqs": [
      [
        "Can I add page numbers to a PDF that has a cover page?",
        "Yes, but the tool stamps a number on every page, including the cover, since it does not skip pages. Set the starting value so the first body page shows the number you intend, and check the result before sharing."
      ],
      [
        "Can I change the font used for the page numbers?",
        "No. The tool embeds a standard font, so the numbers use that font rather than one you pick. Choose the corner or center that suits the layout instead. If you need a specific typeface, add numbers in your document editor before exporting to PDF."
      ],
      [
        "Where does the numbered PDF end up after I make it?",
        "It is saved as a download from your browser, separate from the file you loaded. Your browser's download folder or prompt shows where it went. Keep the original as a backup, since numbering is applied only to the new copy."
      ]
    ]
  },
  "watermark-pdf": {
    "answer": "A PDF watermark is a line of text, such as DRAFT or CONFIDENTIAL, stamped across every page of a document. The tool draws your text with a bold font at the chosen opacity and size, optionally rotated diagonally across the page center. The work happens in your browser, so the file is not sent to a server.",
    "aiSummary": "Places a text watermark across every page of a PDF in the browser, with chosen opacity, size and an optional diagonal angle. The main limit is that it handles text only, so a logo cannot be used here.",
    "shortKeyword": "pdf watermark",
    "longKeywords": [
      "add a draft watermark to a pdf",
      "set watermark opacity on a pdf",
      "mark a pdf as confidential before sharing"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do you add a draft watermark to a PDF?",
        "text": "Drafts are often shared for review, and a DRAFT stamp makes clear that the content is not final. Confidential documents benefit from a visible notice on every page, so a stray copy is easier to recognize. A watermark also signals ownership when a report leaves your team. This tool applies one line of text across all pages at once, which saves repeating the step page by page. Choose the wording once and it appears everywhere."
      },
      {
        "heading": "How do you set watermark opacity on a PDF?",
        "text": "Opacity controls how strongly the text shows. A lighter setting keeps the page readable underneath, which suits a draft that people still need to read. A stronger setting makes the notice hard to miss, which suits a confidential label. Test a couple of values on one page before running the whole file. Remember that a very faint watermark may not register at a glance, while a heavy one can hide the text beneath it."
      },
      {
        "heading": "What mistakes should you avoid with PDF watermarks?",
        "text": "The biggest mistake is choosing a watermark so faint that it does not register, or so heavy that the content cannot be read. Placing the text diagonally across the center is useful for drafts, but it can cover figures, so check a few pages before sharing. A watermark is a visual notice, not a security control, so do not rely on it to stop copying. Keep the source file if you need to make changes later."
      }
    ],
    "faqs": [
      [
        "Can I mark a PDF as confidential before sharing it?",
        "Yes. Type the label, such as CONFIDENTIAL, choose the opacity and whether to rotate it, then run the tool on the file. The new copy carries the notice on every page. Share that copy and keep your original unmarked for your own records."
      ],
      [
        "Does a watermark protect a PDF from being copied?",
        "No. A watermark makes a copy easier to trace back to its source, and it signals intent, but it does not block copying, printing or editing. Use access controls in your document system if the content must stay restricted."
      ],
      [
        "Can I change the watermark text after the file is saved?",
        "Not in the saved copy. The text is drawn into the new file, so changing it means starting again from your original and running the tool with the new wording. Keep the original so that edits are quick."
      ]
    ]
  },
  "png-to-webp": {
    "answer": "PNG to WebP means re-encoding a PNG image as a WebP file, a modern format built for web pages. The tool keeps optional transparency, and you choose the quality level before converting. WebP typically produces much smaller files than PNG, so pages load faster. The work runs in your browser.",
    "aiSummary": "Re-encodes PNG images as WebP files in your browser at a quality you pick, keeping transparency and usually giving a smaller file. The main limit is that WebP is not universal, so some older software may not open the converted image. Compare sizes before replacing originals.",
    "shortKeyword": "png to webp",
    "longKeywords": [
      "convert png images to webp",
      "reduce png file size for websites",
      "keep transparency when converting to webp"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why convert PNG images to WebP for a website?",
        "text": "Many websites carry PNG files that are far bigger than they need to be, which slows pages for visitors on slower connections. Converting to WebP is a common way to tackle that without redesigning anything. The format handles photos and graphics well and supports transparency. This tool re-encodes your image at the quality you choose and saves the result for download. Your original file is not changed. Compare the two files side by side before you swap anything."
      },
      {
        "heading": "Can you keep transparency when converting to WebP?",
        "text": "Yes, transparency is kept in the converted file, so logos and cut-out graphics still sit cleanly over a colored background. The quality setting still matters, because a low value can soften edges and fine detail. Try a middle setting on one image, view it over a dark and a light background, and adjust from there. Check the edges of any cut-out graphic over a dark background, since soft halos are easier to spot there."
      },
      {
        "heading": "What limits should you expect when using WebP?",
        "text": "WebP is not a fit for every workflow. Some older image editors and email programs may not open it, so keep the PNG for any file you might need to edit or send to people who use older software. Lossy settings discard detail each time you re-save, so do not repeatedly convert the same file. Keep a copy of the original image for future work, and treat the converted file as the delivery version."
      }
    ],
    "faqs": [
      [
        "How can I reduce PNG file size for websites?",
        "Convert the image to WebP at a quality level that still looks sharp at the size it will display. Compare the output with the original on a dark and a light background before publishing. Keep the original PNG so you can convert again later if needed."
      ],
      [
        "Does WebP keep the image's colors exactly the same?",
        "Not always, because lossy encoding trades some fine detail for size. At a high quality setting, differences are usually hard to see. Check brand colors by eye, since small shifts may matter for logos."
      ],
      [
        "Should I convert photos or only graphics?",
        "Both can be converted, but the gain varies. Flat graphics with few colors often shrink a lot, while busy photos may shrink less. Test a sample from each group before converting a whole library."
      ]
    ]
  },
  "image-rotator": {
    "answer": "An image rotator turns a photo left or right in quarter-turn steps and flips it horizontally or vertically. The tool applies each change on a canvas, so the preview matches the exported picture. Rotation and flipping are geometric transforms run in your browser, so the photo never leaves your device.",
    "aiSummary": "Rotates a photo in quarter-turn steps and flips it horizontally or vertically, with a live preview that matches the downloaded file. Edits are drawn on a canvas in the browser. The main limit is that rotation is fixed to right angles, so a tilted photo needs a different editor for straightening.",
    "shortKeyword": "image rotator",
    "longKeywords": [
      "how to rotate an image online",
      "flip a photo horizontally or vertically",
      "fix a sideways photo quickly"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to rotate an image online?",
        "text": "Photos from phones or cameras sometimes land sideways because of how the device was held, and a rotation fixes that in one step. Choose left or right to move the picture in quarter-turn steps until the subject stands upright. Then download the corrected image. The preview shows the result before you save, so you can see the change first. Work through one photo at a time, and keep the original file as it was."
      },
      {
        "heading": "When should you flip a photo horizontally or vertically?",
        "text": "Flipping mirrors a photo across one axis, which suits a selfie that should match a mirror view or a layout that faces the wrong way. A vertical flip is less common but can help with a reflected scene. Rotation, by contrast, turns the whole image in quarter steps and does not mirror it. Check any text or signage after flipping, since a mirrored sign is easy to misread at a glance."
      },
      {
        "heading": "What mistakes should you avoid when rotating images?",
        "text": "The most common mistake is rotating in the wrong direction, then exporting before noticing. Check the orientation in the preview before you export, and confirm the subject looks natural in the final file. Another mistake is expecting a freeform straighten, since this tool only moves in fixed steps. Finally, remember that a flipped image is a new file, so keep the original in case you need to start again later."
      }
    ],
    "faqs": [
      [
        "Can I fix a sideways photo quickly in the browser?",
        "Yes. Pick a left or right turn, watch the live preview until the photo looks upright, and download the result. If one step is not enough, apply another turn and check again."
      ],
      [
        "Can I combine a rotation and a flip in one export?",
        "The tool lets you apply rotations and flips to the preview before you download, so both changes appear in the exported picture. Set each one, confirm the preview, then save. Check the final result before sharing it."
      ],
      [
        "Does the export match what I see on screen?",
        "Yes, the tool draws each rotation and flip on a canvas, and the preview uses the same transforms as the export. What you see is what gets downloaded. If something looks off, adjust the setting and preview again before saving."
      ]
    ]
  },
  "image-color-picker": {
    "answer": "An image color picker reads the exact color of a single pixel where you click, then reports it as HEX, RGB and HSL codes. The image is drawn to a canvas, and each click converts the pixel into the common formats. You can copy the values with one tap. The picker works entirely in your browser, so the photo is not sent anywhere.",
    "aiSummary": "Reads the exact pixel color at any point you click on an image and converts it to HEX, RGB and HSL codes, keeping a history of recent picks. The main limit is that you get one pixel per click, so a color that varies across a surface may need several samples to judge.",
    "shortKeyword": "image color picker",
    "longKeywords": [
      "how to pick a color from an image",
      "get the hex code from a photo",
      "match colors from a photo"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to pick a color from an image?",
        "text": "Designers and marketers often need the exact shade used in a photo, such as a brand color that appears in a logo shot. Click the spot you want, and the tool reads that single pixel rather than an average. The reading is shown in HEX, RGB and HSL, so it fits whatever format your design tool expects. Pick several spots to compare. Recent picks stay listed for quick comparison, and you can copy the codes you need as you go."
      },
      {
        "heading": "Can you match colors from a photo for a design?",
        "text": "Yes, but treat a picked value as a starting point. Photos include lighting, shadows and camera settings, so the color you sample may differ from how it looks printed or on another screen. Pick a few neighboring pixels from the same area and compare them before choosing one. The HSL reading helps when you want to lighten or darken a shade while keeping its hue steady. Note the values before you move on."
      },
      {
        "heading": "What limits should you keep in mind when sampling colors?",
        "text": "A single click gives one pixel, which can be noisy in a compressed image. Sampling from the middle of a flat area is more dependable than sampling right on an edge, where blended pixels can shift the reading. Remember that the code describes the image as it was saved, not how a screen or print will show it. Confirm the final color in your own design tool before you commit to it."
      }
    ],
    "faqs": [
      [
        "Can I get the hex code from a photo for a design?",
        "Yes. Click the spot, copy the HEX value, and paste it into your design tool. Use the RGB or HSL values if the tool needs them instead. Verify the final color on the actual layout, since the sampled value came from a photo."
      ],
      [
        "Does the picker keep a list of colors I already chose?",
        "Yes, a history of recently picked colors is kept, so you can return to an earlier shade without clicking the image again. Use it to compare candidates side by side. Copy any value you plan to keep before closing the page, to be safe."
      ],
      [
        "Which color format should I use for CSS?",
        "HEX codes are common in stylesheets, while RGB and HSL are also valid CSS color formats. HSL is handy when you want to adjust lightness while keeping the same hue. Pick the one your project already uses so the code stays consistent."
      ]
    ]
  },
  "image-color-palette": {
    "answer": "An image color palette is a short set of the most prominent colors in a picture, returned as copyable swatches. The tool samples the image's pixels, groups similar colors into buckets, and ranks the buckets by how often they appear. The most common groups become the palette. Everything runs in your browser, so the image stays on your device.",
    "aiSummary": "Samples a photo's pixels, groups similar shades, and ranks them to list the dominant colors as swatches, all within the browser. This suits building a theme or matching a picture. The main limit is that the output depends on bucket grouping, so subtle shades can merge and the list may miss minor tones.",
    "shortKeyword": "image color palette",
    "longKeywords": [
      "extract colors from an image",
      "build a brand palette from a photo",
      "pick a theme palette from a photo"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why extract colors from an image for a project?",
        "text": "Designers often start a project by pulling colors from a reference image, such as a landscape or a product shot. The extractor saves that step by listing the main tones at once. It is useful for theming a website, building a mood board or checking that a photo fits an existing scheme. Each swatch can be copied directly, so you can move straight into a design tool. Use it early, before choices harden."
      },
      {
        "heading": "Can you build a brand palette from a photo?",
        "text": "You can, as long as the photo represents the look you want. Choose a reference image that shows the intended tones, not one dominated by a single color or heavy shadow. Review the swatches and keep only the ones that fit your brand. Some dominant colors are accents rather than core colors, so decide which role each one plays before building the set. Check contrast for text separately, since a palette does not measure readability."
      },
      {
        "heading": "What limits come with extracting dominant colors?",
        "text": "Grouping similar shades means close tones may merge, so a subtle highlight or a thin accent color can vanish from the list. The most frequent colors are not always the most important ones, since a small logo may carry the whole identity. Photos also reflect lighting, so the palette describes the picture as lit rather than the object's true paint. Treat the output as a useful starting point and adjust by hand."
      }
    ],
    "faqs": [
      [
        "Can I pick a theme palette from a photo for my site?",
        "Yes. Extract the palette, choose the swatches that match your content, and note their HEX values for your stylesheet. Pick one dominant color for backgrounds and one accent for buttons, then test text contrast on each pairing before publishing."
      ],
      [
        "Can I use the palette without the original photo?",
        "Yes, once you have the swatch values, they are plain color codes that work in most design tools and stylesheets. Copy the codes and keep a note of which photo they came from, so you can check them again later. The photo itself is not needed to use the values."
      ],
      [
        "Should I extract from a cropped or full photo?",
        "Crop to the area that represents the look you want, because a full photo may include backgrounds or borders that pull the result off target. Cropping before extraction keeps the palette focused. Compare the two results if you are unsure which framing suits the project."
      ]
    ]
  },
  "image-watermark": {
    "answer": "A photo watermark is a line of text, such as your name, a brand or a copyright notice, drawn onto an image at a position you choose. The text is painted on a canvas with the color, size, and opacity you set, and a subtle shadow helps it stay legible. The result is exported as a PNG. Everything happens in your browser, so the unwatermarked photo is not uploaded.",
    "aiSummary": "Stamps custom text onto a photo, with control over position, color, size and opacity, then exports a PNG. A soft shadow keeps the text readable on busy areas. The main limit is that a text mark can be cropped out or covered, so it is a visible notice not a security measure.",
    "shortKeyword": "photo watermark",
    "longKeywords": [
      "add a copyright notice to a photo",
      "place a name watermark on a photo",
      "label a photo with a visible text mark"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do you add a copyright notice to a photo?",
        "text": "Photographers and small businesses often publish images online where they can be copied with a single click. A copyright notice drawn on the picture states ownership in a way that travels with the image, even when it is shared without the original caption. This tool places your text at a chosen position, so the notice is visible to anyone who views the picture. Save the watermarked copy for public use and keep the unmarked master for your records."
      },
      {
        "heading": "How do you place a name watermark on a photo?",
        "text": "Choose a corner or the center, depending on how much of the photo you can afford to cover. A corner keeps the subject clear, while the center is harder to crop away. Pick a color that contrasts with the area under the text, then set the size so the name is readable without dominating. The soft shadow helps on bright or busy backgrounds. Preview the result carefully before you download it."
      },
      {
        "heading": "What limits come with a text watermark on a photo?",
        "text": "Text is easy to read, but it can also be cropped or painted over, so it deters casual reuse more than determined misuse. Heavy opacity may hide the image, while very light text may disappear on screens. Your watermark also changes the picture permanently in the exported file, so keep the unmarked original for editing or print work. Avoid placing the mark where a viewer's attention naturally falls. Check the result at the size people will see it."
      }
    ],
    "faqs": [
      [
        "Is it enough to label a photo with a visible text mark?",
        "For casual sharing, a visible notice reminds viewers who made the picture and discourages simple reuse. It does not stop a determined person from cropping or editing it. For stronger protection, combine the mark with careful publishing choices, such as sharing smaller web copies."
      ],
      [
        "Can I add the watermark to several photos in one session?",
        "Process each image in turn, reusing the same position, color and opacity so the set looks consistent. Name each saved file clearly so watermarked copies do not get mixed up with originals."
      ],
      [
        "Should the watermark text match my brand colors?",
        "It helps to choose a color that appears in your brand palette, so the mark feels consistent across your images. Keep contrast in mind, since a color close to the photo's tones can disappear. Test the choice on a bright and a dark image before settling on it."
      ]
    ]
  },
  "image-to-base64": {
    "answer": "Image to Base64 means encoding a picture as a text string, a data URI, that can be pasted straight into HTML or CSS. The bytes are read and converted into Base64 characters, and the tool wraps the result into ready-to-copy img and background snippets. Base64 is about a third larger than the binary file, so inlining suits only small images.",
    "aiSummary": "Converts an image file into a base64 image data URI for HTML or CSS, with copy-ready tag and background snippets. Base64 text is about a third bigger than the source file. The main limit is that inlined images cannot be cached separately, so large pictures are better served as normal files.",
    "shortKeyword": "image to base64",
    "longKeywords": [
      "embed an image in html as base64",
      "inline a small image in css",
      "base64 image data uri for html"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should you embed an image in HTML as Base64?",
        "text": "Inlining an image removes one network request, which can matter for a tiny icon or logo that appears on a page that already loads slowly. The approach is most sensible for small graphics used once or twice. For large photos, the Base64 text makes the HTML or CSS file heavier, which can slow the page instead. Use inlining as a deliberate choice for small assets. Measure before and after to confirm the change helps."
      },
      {
        "heading": "Can you inline a small image in CSS safely?",
        "text": "Yes, a small background such as a texture or an icon can live in a stylesheet as a data URI. Keep the snippet short, because long strings make the stylesheet harder to read and edit. Reusing the same image in many places repeats the Base64 text each time, so prefer a single class for repeated use. Check the stylesheet still loads quickly after the change. Keep a copy of the source file for future edits."
      },
      {
        "heading": "What mistakes should you avoid with inline images?",
        "text": "The most common mistake is inlining a large photo because it seems convenient, which bloats the page or stylesheet that holds it. Editing the start of a data URI, such as the type prefix, can stop the image from displaying, so copy the snippet as generated. Base64 is an encoding, not compression, so the text is larger than the file it came from. Keep original image files for editing later."
      }
    ],
    "faqs": [
      [
        "Can I paste the base64 image data URI for HTML straight into a page?",
        "Yes, that is the purpose of the generated snippet. Paste the img tag where the picture should appear, and the browser reads the data directly. Add descriptive alt text yourself, because the snippet cannot know what the picture shows."
      ],
      [
        "Does Base64 encoding make the image smaller in any way?",
        "No. Base64 turns binary data into text that is about a third larger, so the encoded string takes more space than the file. The benefit is one fewer network request, not a smaller payload. If size matters, compress the image before encoding it."
      ],
      [
        "Can I encode several images at once?",
        "Work through images one at a time, pasting each snippet where it belongs. Long data strings are easy to mix up, so label each one with its source file name in your notes."
      ]
    ]
  },
  "rental-yield-calculator": {
    "answer": "A rental yield calculator shows how much a rental property earns compared with its price. Gross yield is annual rent divided by purchase price. Net yield also deducts running costs and an allowance for vacancy, so it gives a more realistic figure. Cap rate uses net operating income before any loan payments. Enter the price, monthly rent, monthly expenses and vacancy rate to see each figure.",
    "aiSummary": "Calculates gross yield, net yield and cap rate for a rental. Gross yield is annual rent over price. Net yield after vacancy and expenses subtracts running costs from that income. Cap rate uses operating income before loan costs. Limitation: an educational estimate that ignores tax, financing and rent growth.",
    "shortKeyword": "rental yield calculator",
    "longKeywords": [
      "how to work out rental yield",
      "cap rate for a rental property",
      "net yield after vacancy and expenses"
    ],
    "exampleInputs": {
      "price": "285000",
      "rent": "1850",
      "expenses": "420",
      "vacancy": "6"
    },
    "sections": [
      {
        "heading": "How to work out rental yield for a property?",
        "text": "Use this tool when you want a quick comparison between two or more rental properties before you make an offer. Enter the purchase price and the expected monthly rent, then add the monthly running costs such as tax, insurance and management fees. The gross figure gives a starting point, and the net figure shows what remains after costs and an allowance for empty months. Because the calculator runs in your browser, you can test several scenarios without creating an account. This is an educational estimate, not professional financial advice."
      },
      {
        "heading": "Why does cap rate for a rental property matter?",
        "text": "Cap rate divides net operating income by the purchase price, and it leaves out loan payments. That makes it useful for comparing two properties that might be financed differently, because the number describes the building rather than your mortgage. Read a higher cap rate as more income per dollar of price, but remember it does not show risk, location quality or how fast rents will rise. Compare cap rates only between similar property types in the same area, and check that the same costs were deducted for each one."
      },
      {
        "heading": "What common mistakes make the result misleading?",
        "text": "The most common error is mixing up gross and net figures, then comparing one property's gross yield with another's net yield. Another is leaving out vacancy or a maintenance allowance, which makes the result look better than it will be. Check that the rent you enter is a realistic market figure rather than an optimistic figure from a listing, and that the purchase price includes any immediate repair costs. The calculator reflects only what you type, so every assumption is yours to verify."
      }
    ],
    "faqs": [
      [
        "Does the calculator include mortgage payments?",
        "No. Gross yield, net yield and cap rate are all calculated before financing, so loan repayments are not part of the result. If you want to know your cash flow after a mortgage, you need a separate calculation using your loan amount, interest and term."
      ],
      [
        "Can I use this for holiday lets?",
        "The formulas work for any property that earns rent, but short stays have different costs, seasonal gaps and occupancy patterns. Enter an average monthly income and realistic expenses, and treat the result as a rough starting point rather than a forecast."
      ],
      [
        "Why does vacancy matter for the net figure?",
        "Vacancy reduces the rent you actually collect over a year, so the net figure assumes some months earn nothing. Even a modest allowance protects you from an overly optimistic result, and you can change the rate to test how sensitive the deal is."
      ]
    ]
  },
  "house-price-to-income-ratio": {
    "answer": "An affordability ratio is a home's price divided by a household's gross annual income. It is a quick check on whether a purchase looks comfortable, stretched or hard to finance. Ratios below 3 are usually treated as affordable, 3 to 5 as manageable, above 5 as stretched and above 7 as difficult to finance conventionally. Enter the price and yearly income to see the ratio.",
    "aiSummary": "Divides a home price by annual household income to give an affordability ratio, then places it in a rough band. Ratios below 3 are affordable and above 7 are hard to finance. Its core is house price compared with annual income, so it ignores debts, deposits and interest rates.",
    "shortKeyword": "affordability ratio",
    "longKeywords": [
      "how to check if a home is affordable",
      "house price compared with annual income",
      "home price to income ratio calculator"
    ],
    "exampleInputs": {
      "price": "480000",
      "income": "110000"
    },
    "sections": [
      {
        "heading": "How to check if a home is affordable?",
        "text": "Start with the number this tool gives you and compare it with the bands listed above: below 3 is affordable, 3 to 5 is manageable, above 5 is stretched. The ratio is a first screen, so pair it with your monthly budget, savings for a deposit and the interest rate you would actually be offered. Use gross income, meaning before tax, because that is the figure most lenders quote. This is an educational estimate, not professional financial advice, so speak with a qualified adviser before committing."
      },
      {
        "heading": "What does the ratio miss about your budget?",
        "text": "A price-to-income ratio uses only two numbers, so it cannot see your monthly outgoings, existing debts, childcare costs or how much cash you hold for repairs and closing fees. Two households with the same income can have very different room in their budgets. Treat a high ratio as a warning to look closer, and a low one as encouragement rather than proof that a purchase is safe. Location matters too, since the same ratio can feel different where local prices and rents vary."
      },
      {
        "heading": "Which input mistakes change the result the most?",
        "text": "A common error is entering take-home pay instead of gross income, which produces a higher ratio than the lender would use and can make a purchase look more stretched than it is. The opposite error is adding a partner's income that will not be part of the mortgage application, or counting bonuses that are irregular. Use a steady, documented figure. Also remember that the bands are rough guides, so a ratio just above a boundary is not a clear yes or no."
      }
    ],
    "faqs": [
      [
        "Does a home price to income ratio calculator replace a mortgage check?",
        "No. This ratio is a simple first screen and ignores interest rates, deposits, debts and local prices. Lenders assess your full finances, so use the result only to decide which price range to explore further."
      ],
      [
        "Is a higher ratio always a reason to walk away?",
        "Not always. A high ratio is a signal to test the numbers more carefully, using your full budget, a realistic deposit and a stress-tested repayment figure. Only you can judge whether the payments fit your life."
      ],
      [
        "Does a higher ratio mean a home is overpriced?",
        "Not necessarily. Ratios describe affordability for a buyer on a given income, not whether a price matches the market value. Prices in some cities can be high relative to incomes for years, so compare with local listings too."
      ]
    ]
  },
  "fence-calculator": {
    "answer": "A fence calculator estimates how many posts, rails and pickets a wood fence needs. Posts equal the perimeter divided by post spacing, plus one. Rails are two per post for a standard two-rail design, and pickets equal the perimeter divided by board width in feet. Add about ten percent for waste. Everything runs in your browser.",
    "aiSummary": "Works out posts and rails for a fence line, plus the pickets, from total length, post spacing and board width. Posts equal length divided by spacing plus one, rails are two per post, and pickets equal length divided by board width. Limitation: gates, corners and slopes are not modelled.",
    "shortKeyword": "fence calculator",
    "longKeywords": [
      "how to calculate fence posts needed",
      "how many boards for a fence",
      "posts and rails for a fence line"
    ],
    "exampleInputs": {
      "perimeter": "150",
      "spacing": "8",
      "height": "6",
      "boardWidth": "5.5"
    },
    "sections": [
      {
        "heading": "How to calculate fence posts needed for a run?",
        "text": "Measure the total length of each straight run and add them together to get the perimeter you will fence. Divide that length by your chosen post spacing and add one, because a run needs a post at both ends. The tool starts with eight feet, but enter the spacing you intend to build with. Posts are only one part of the job, so check the rails and pickets afterwards before buying materials."
      },
      {
        "heading": "How many boards for a fence run should you order?",
        "text": "Pickets are the vertical boards, and the calculator divides the perimeter by the width of one board in feet. Enter the real board width, because a wider board means fewer pickets for the same length. The result includes a waste allowance, which covers cuts, splits and warped pieces. Check the fence height too, because each picket is cut to that length."
      },
      {
        "heading": "Which mistakes or limits affect the fence estimate?",
        "text": "The calculator gives a planning estimate, so it does not model gates, corners, slopes or uneven ground, each of which may need extra posts or sections. It also assumes a standard two-rail layout, so a three-rail or privacy design will need different rail counts. Common mistakes include entering the fence height in the wrong unit, or leaving out the plus-one step that adds the final post. Measure twice and buy a little spare material."
      }
    ],
    "faqs": [
      [
        "Does this fence calculator account for gates?",
        "No. Gates, corners and sloped ground are not modelled, so add the extra posts and boards for them by hand after the main estimate. Measure each gate opening separately and check the gate hardware with a supplier."
      ],
      [
        "How much waste should I plan for?",
        "The estimate adds about ten percent to the picket count to cover cuts, splits and warped pieces. Buy a few extra boards on top of that if your cuts are tricky or your ground slopes."
      ],
      [
        "Why is board width asked in inches?",
        "Boards are usually described by their width in inches, which is how you will read it on a supplier label. The calculator converts that figure to feet before dividing the perimeter, so you can type the number straight from the label."
      ]
    ]
  },
  "roof-pitch-calculator": {
    "answer": "A roof pitch calculator converts rise and run into a pitch written as X:12, an angle in degrees and an area multiplier. Pitch is the rise for every 12 inches of run. The angle is the arctangent of rise divided by run. Multiply your floor plan area by the multiplier to estimate the true sloped roof surface for shingles.",
    "aiSummary": "Turns the rise and run for roof pitch measurements into an X:12 ratio, an angle in degrees and an area multiplier. The angle is the arctangent of rise over run. Limitation: it models a single sloped plane, not complex roofs with several slopes.",
    "shortKeyword": "roof pitch calculator",
    "longKeywords": [
      "how to convert roof pitch to degrees",
      "roof area for shingle and material estimates",
      "rise and run for roof pitch"
    ],
    "exampleInputs": {
      "rise": "6",
      "run": "12",
      "planArea": "1500"
    },
    "sections": [
      {
        "heading": "How to convert roof pitch to degrees?",
        "text": "Pitch and angle describe the same slope in two forms. The angle in degrees is the arctangent of rise divided by run, so each rise and run pair gives its own angle. Degrees are useful when a drawing, a saw setting or a specification uses angles instead of X:12 ratios. Enter both measured values into the calculator rather than estimating either one. The result is an estimate for planning, not a structural check."
      },
      {
        "heading": "Why use a roof area for shingle and material estimates?",
        "text": "Shingles, underlay and sheathing cover the sloped surface, not the flat footprint on a plan. A steeper roof has more surface than its plan area suggests, and the area multiplier shows how much more. Multiply your floor plan area by it, then add an allowance for waste, overhangs and hips or valleys. Ordering from the flat plan area is an easy way to run short. Check the figure with a roofer before buying materials, since local practice and roof shape change the final count."
      },
      {
        "heading": "What mistakes make the roof pitch reading wrong?",
        "text": "The most common slip is measuring rise over a run that is not 12 inches, then reading the answer as X:12 without converting. Another is mixing up pitch with a percentage slope, which is a different number for the same roof. Measure rise with a level and a tape from a fixed point, and avoid rough guesses made from the ground. The calculator assumes a simple single plane, so complex roofs with several slopes need a separate calculation for each face."
      }
    ],
    "faqs": [
      [
        "Does a steeper roof always cost more?",
        "Steeper roofs have more surface per plan area, so material quantities rise with the multiplier. Labor costs depend on access and local rates, which this tool does not include. Use the calculator for material quantities only."
      ],
      [
        "Is a roof pitch calculator the same as a rafter calculator?",
        "No. Pitch and area describe the roof surface, while a rafter calculator also works out lengths, cuts and spacing for the timber framing. Pitch is one of the inputs a rafter calculation needs, so the two tools are related but do different jobs."
      ],
      [
        "What if my roof run is not 12 inches?",
        "The angle and area multiplier use rise and run directly, so they stay valid for any run you enter. Pitch is expressed per 12 inches, so convert it yourself if your run is a different length before comparing with plans."
      ]
    ]
  },
  "staircase-calculator": {
    "answer": "A staircase calculator divides the total rise between floors into equal steps, so every riser is the same height. Steps equal the rounded total rise divided by your target riser. Total run is the number of steps multiplied by tread depth. Comfortable stairs usually sit between thirty and forty-five degrees. Everything runs in your browser.",
    "aiSummary": "Works out step count, exact riser height, total run and stair angle from floor-to-floor height. The total run for a straight staircase equals steps multiplied by tread depth. Limitation: it does not model landings, winders or building code requirements.",
    "shortKeyword": "staircase calculator",
    "longKeywords": [
      "how to work out stair riser height",
      "riser height and tread depth",
      "total run for a straight staircase"
    ],
    "exampleInputs": {
      "rise": "114",
      "riserHeight": "7",
      "treadDepth": "10"
    },
    "sections": [
      {
        "heading": "How to work out stair riser height from floor height?",
        "text": "Start with the floor-to-floor height, which is the vertical distance you need to climb. Divide it by your target riser height and round to a whole number of steps. The calculator then divides the total rise by that step count to give the actual riser, which will usually differ slightly from the target. Use the actual figure when you cut stringers, because every step must match, and a small error repeats on each one."
      },
      {
        "heading": "Why does riser height and tread depth matter for comfort?",
        "text": "Riser height and tread depth work as a pair. A tall riser with a shallow tread feels steep and can catch the toe, while a low riser with a generous tread feels like walking on a ramp. The stair angle summarises that pairing, and the calculator reports it so you can check the stair sits in the usual comfortable band. Adjust the target riser or tread until the angle and step count both look right for your space."
      },
      {
        "heading": "Which errors or limits should you check before building?",
        "text": "The calculator assumes your floor-to-floor height is accurate and that the finished floor, including any screed or flooring, is measured correctly. Forgetting the thickness of the finished floor is a frequent source of error, and so is measuring to the wrong point at the top or bottom. It does not model landings, winders, headroom or specific building code requirements, which vary by location and must be checked with the authority that governs your build. Treat the output as a planning figure, not a compliance check."
      }
    ],
    "faqs": [
      [
        "Can I use the target riser as my final riser height?",
        "Only if the total rise divides exactly into the step count you want. Otherwise the calculator's actual riser is the figure to build to, because each step must be identical."
      ],
      [
        "Does tread depth need to include the nosing?",
        "The tread depth you enter should be the measured depth you plan to build, and it is worth confirming whether any nosing overhang is included in that figure. Nosing changes how far the step projects, so keep the value consistent across all steps."
      ],
      [
        "Is the stair angle a safety rating?",
        "No. The angle is a geometric result from rise and run, and it describes slope rather than safety. It helps you compare with commonly used ranges, but it cannot judge handrails, lighting or surface grip."
      ]
    ]
  },
  "resistor-color-code-calculator": {
    "answer": "A resistor color code calculator reads the four colored bands on a resistor. Bands one and two are the first two digits, band three is the power of ten multiplier, and band four is the tolerance. The value is ten times the first digit plus the second digit, times ten to the multiplier. Pick each color from the list to see the result.",
    "aiSummary": "Works out the resistance value from four color bands on a resistor, with digits from bands one and two, a power of ten from band three and tolerance from band four. Limitation: it covers only standard four-band codes, so faded bands need checking with a meter.",
    "shortKeyword": "resistor color code",
    "longKeywords": [
      "how to read resistor color bands",
      "resistance value from four color bands",
      "tolerance band for circuit design"
    ],
    "exampleInputs": {
      "band1": "yellow",
      "band2": "violet",
      "band3": "orange",
      "tolerance": "silver"
    },
    "sections": [
      {
        "heading": "How to read resistor color bands in order?",
        "text": "Hold the resistor so the tolerance band sits on the right, which is usually a gold or silver band. Read the first three bands from left to right: the first two give digits and the third sets the multiplier. The color order is fixed, so learn the sequence black, brown, red, orange, yellow, green, blue, violet, grey, white and use it for every value. Use the calculator to check your reading, especially when the bands are faded or hard to distinguish."
      },
      {
        "heading": "What do the tolerance bands tell you about accuracy?",
        "text": "The fourth band states how far the real resistance may differ from the printed value. Gold means plus or minus five percent, silver ten percent, and tighter bands such as brown, red, green and blue indicate smaller allowed differences. A part with a tight tolerance costs more and suits circuits where exact division matters. A loose tolerance is usually acceptable for pull-up resistors or general biasing. Check the tolerance on your parts list before ordering."
      },
      {
        "heading": "Which mistakes make a resistor reading wrong?",
        "text": "The most frequent mistake is reading the bands from the wrong end, which gives a completely different value. Another is confusing the multiplier band with the second digit, so the multiplier is applied to the wrong number. Faded paint, dust and lighting can make red and brown look alike, so check with a meter when the stakes are high. This calculator covers four-band resistors only, and five-band or six-band parts need a different method."
      }
    ],
    "faqs": [
      [
        "Why does the tolerance band for circuit design matter?",
        "The tolerance band sets how far a part can drift from its marked value, which affects timing, filters and voltage dividers. Choosing a tighter band costs more, so pick the tolerance your circuit actually needs rather than the tightest one available."
      ],
      [
        "Does the calculator read SMD resistor codes?",
        "No. Surface-mount parts use a different numeric marking system, usually printed digits rather than colored bands. This calculator reads only the four colored bands on through-hole parts, so enter the values from a printed code using a separate reference."
      ],
      [
        "Can a faded resistor be read without a meter?",
        "Sometimes. Compare the bands with a known chart under good light and check that the sequence starts from the correct end. If the colors are still unclear, measure the resistance with a multimeter to confirm."
      ]
    ]
  },
  "voltage-divider-calculator": {
    "answer": "A voltage divider calculator finds the output voltage taken across the bottom resistor of two resistors in series. Output equals input voltage times R2 divided by the sum of R1 and R2. Divider current is input voltage divided by the total resistance, and power is input voltage times that current. A connected load can lower the output.",
    "aiSummary": "Gives the output of a two-resistor divider, the current through it and the power it uses. Output equals input times R2 over R1 plus R2. Limitation: the figure is unloaded, so resistor divider output with a load connected is always somewhat lower.",
    "shortKeyword": "voltage divider calculator",
    "longKeywords": [
      "how to find divider output voltage",
      "resistor divider output with a load",
      "power dissipation in a divider circuit"
    ],
    "exampleInputs": {
      "vin": "9",
      "r1": "4700",
      "r2": "10000"
    },
    "sections": [
      {
        "heading": "How to find divider output voltage in a circuit?",
        "text": "Use the calculator when you need a fixed fraction of a supply voltage, for example to feed a sensor input or a reference pin. Enter the input voltage and the two resistor values, then read the output across R2. The result tells you the fraction the circuit produces, which the resistor pair sets. Choose resistor sizes that suit the current you can afford to waste, because a larger current uses more power."
      },
      {
        "heading": "Why does a load change the output of a divider?",
        "text": "The unloaded figure assumes nothing draws current from the output node. When you connect a load, it effectively sits in parallel with R2, lowering the combined resistance and pulling the output down. The heavier the load compared with R2, the larger the change. For that reason a divider works well for feeding a high-impedance input, such as a microcontroller pin, but is poor at supplying power to anything that draws real current."
      },
      {
        "heading": "What mistakes make a divider design fail?",
        "text": "A frequent error is treating the output as fixed while forgetting the load, so the real voltage ends up lower than the design value. Another is choosing resistors so small that they waste power, or so large that noise and leakage disturb the reading. Check the power in each resistor, not just the total, and remember that resistor tolerance shifts the output too. The formula assumes ideal resistors, so real designs need margin."
      }
    ],
    "faqs": [
      [
        "How do I check power dissipation in a divider circuit?",
        "Multiply input voltage by divider current to get total power, which the calculator reports. Each resistor also dissipates its own share, so check each part's rating against its own power rather than the total. Keep a margin below the rated limit."
      ],
      [
        "What happens if R1 and R2 have equal values?",
        "Both resistors then take half the input voltage, so the unloaded output is half the input. Equal values are a common choice for a simple halving circuit, although the current and power are set by the total resistance."
      ],
      [
        "Can a voltage divider set a supply voltage?",
        "Usually not for anything drawing real current. A divider gives a reference or sensing level, and its output changes with the load. For a stable supply, use a regulator, which keeps the output steady across a range of loads."
      ]
    ]
  },
  "torque-calculator": {
    "answer": "A torque calculator multiplies force by the moment arm to give a turning effect, measured in newton-metres. Torque equals force times the perpendicular distance from the pivot. Foot-pounds and inch-pounds are other units for the same quantity, so the calculator converts the result for you. Enter force and lever length to see it.",
    "aiSummary": "Multiplies a force by its moment arm to give torque in N·m, ft·lb and in·lb. Explains how a moment arm changes torque: doubling the lever length doubles the turning effect. Limitation: it assumes a perpendicular force and ignores friction and dynamic loads.",
    "shortKeyword": "torque calculator",
    "longKeywords": [
      "how to calculate torque from force",
      "how a moment arm changes torque",
      "torque units for bolt tightening"
    ],
    "exampleInputs": {
      "force": "250",
      "arm": "0.4"
    },
    "sections": [
      {
        "heading": "How to calculate torque from force and distance?",
        "text": "Torque depends on two things: how hard you push or pull, and how far from the pivot that push acts. Multiply the force in newtons by the moment arm in metres to get newton-metres. The moment arm must be the perpendicular distance from the pivot to the line of action, not the length of the handle if the force is angled. Enter the force and the arm, and the calculator reports the same torque in the other common units."
      },
      {
        "heading": "Why does a longer moment arm make torque larger?",
        "text": "Torque grows in direct proportion to the moment arm, so doubling the lever length doubles the turning effect for the same push. That is why a long wrench loosens a stuck nut more easily than a short one. The relationship only holds when the force stays perpendicular to the lever, because a sideways or angled pull reduces the effective arm. Keep that in mind when you use a force gauge or a cable, since the geometry can cut the result without you noticing."
      },
      {
        "heading": "Which unit or setup mistakes change the answer?",
        "text": "The most common slip is mixing units, such as entering a force in pounds-force while the calculator expects newtons, or a distance in centimetres while it expects metres. Each conversion is simple, but a single wrong unit scales the whole answer. Another mistake is using the total length of a lever instead of the perpendicular distance. Finally, the calculator gives only force times arm, so it does not model friction, angular acceleration or dynamic loads."
      }
    ],
    "faqs": [
      [
        "Which torque units for bolt tightening should I use?",
        "Use the unit your fastener specification or manual gives, because that is the value the tightening tool expects. N·m is the SI unit, while ft·lb or in·lb may be quoted on older or regional documents. Convert with the calculator rather than by memory, and avoid mixing units in one calculation."
      ],
      [
        "Is torque the same as a twisting force?",
        "Torque is a twisting effect that depends on force and distance, so it is not a force on its own. Two setups with the same force can produce different torques if their arms differ. Thinking of torque as force applied at a distance helps avoid confusion."
      ],
      [
        "Does the calculator handle a force applied at an angle?",
        "Not directly. Enter only the perpendicular component of the force, which is the force times the sine of its angle to the lever, or measure the perpendicular distance from the pivot to the line of action. Both approaches give the same torque."
      ]
    ]
  },
  "half-life-calculator": {
    "answer": "A half-life calculator estimates how much of a radioactive substance remains after a set time. The remaining amount equals the starting quantity multiplied by one half raised to the elapsed time divided by the half-life. Time and half-life must use the same units. Enter the initial amount, half-life and elapsed time to see the result.",
    "aiSummary": "Gives the amount left after radioactive decay over any time period, from the start amount, half-life and elapsed time. The formula is start times one half raised to elapsed time over half-life. Limitation: it assumes a single decaying substance with consistent units.",
    "shortKeyword": "half-life calculator",
    "longKeywords": [
      "how to work out remaining amount",
      "how many half-lives have passed",
      "radioactive decay over any time period"
    ],
    "exampleInputs": {
      "initial": "500",
      "halfLife": "8",
      "time": "24"
    },
    "sections": [
      {
        "heading": "How to work out remaining amount after decay?",
        "text": "Start with the initial quantity and the half-life of the material, which is the time for half of the atoms to decay. Enter the time that has passed in the same units, and the calculator returns the amount still remaining. Use it for teaching, lab planning or checking a decay chart, where the question is how much is left at a given moment. It is a model of an idealised decay, so treat the output as a guide."
      },
      {
        "heading": "How many half-lives have passed in your sample?",
        "text": "The exponent in the formula counts half-lives, so an elapsed time of two half-lives leaves one quarter of the starting amount. Each half-life halves whatever remains, which means the drop is fastest at the start in absolute terms and slows as the sample shrinks. The curve never reaches zero in the model, so very long times give very small numbers rather than an exact none. Read the result as a fraction of the start rather than a fixed count of atoms."
      },
      {
        "heading": "What limits and errors affect a decay estimate?",
        "text": "The model assumes a single isotope decaying in a steady way, with no new material being produced from parents and no loss from the sample. Real samples can contain mixtures with different half-lives, and each one behaves differently over the same period. Mixing up units is another frequent error, such as entering a half-life in years while the elapsed time is in days. For safety, medical or regulatory work, use the values from qualified sources rather than a quick estimate."
      }
    ],
    "faqs": [
      [
        "Does the result depend on the starting amount?",
        "The fraction left depends only on the number of half-lives that have passed, so a larger starting amount gives a larger remaining amount in the same proportion. Doubling the initial quantity doubles the answer, while the time pattern stays the same."
      ],
      [
        "Can I use this for carbon dating?",
        "The same decay formula applies, but dating needs measured isotope ratios, a known starting assumption and corrections that this calculator does not include. Treat it as an illustration of the math, not a dating method."
      ],
      [
        "Why does the calculator need matching time units?",
        "The exponent is the ratio of elapsed time to half-life, and that ratio is only a pure number when both values share the same unit. Converting one of them first avoids a result that is silently wrong."
      ]
    ]
  },
  "kinematic-calculator": {
    "answer": "A kinematics calculator solves the constant-acceleration equations of motion for any unknown. Given the known values among initial velocity, acceleration, time and displacement, it finds the rest using v = u + at and s = ut + ½at². Enter the values you know and leave the others blank. The method is only valid when acceleration stays constant.",
    "aiSummary": "Solves SUVAT equations for initial velocity, acceleration, time and displacement from known values. Velocity after a set time follows v = u + at, and displacement uses s = ut + ½at². Limitation: it assumes straight-line motion with constant acceleration, so it cannot model drag or changing forces.",
    "shortKeyword": "kinematics calculator",
    "longKeywords": [
      "how to solve suvat equations for displacement",
      "constant acceleration motion problems",
      "velocity after a set time"
    ],
    "exampleInputs": {
      "initial": "0",
      "acceleration": "9.8",
      "time": "3"
    },
    "sections": [
      {
        "heading": "How to solve SUVAT equations for displacement?",
        "text": "Pick the known values that match an equation with the unknown you want. Displacement, for example, follows s = ut + ½at², so you need initial velocity, acceleration and time. If you know final velocity instead, the relation v² = u² + 2as can give displacement without time. Enter the values you know and the calculator solves for the rest. Write down what you know before you start, and check the units match, because a mixed unit like kilometres per hour will give a wrong answer."
      },
      {
        "heading": "Which constant acceleration motion problems suit this tool?",
        "text": "This tool fits straight-line motion where acceleration stays steady, such as a car accelerating at a constant rate or an object falling with only gravity acting on it. It is a good match for textbook exercises that give three values and ask for the fourth. Problems involving drag, varying thrust or motion along curved paths need a different approach, because the SUVAT relations rely on constant acceleration and a straight line. Check that assumption before trusting any output."
      },
      {
        "heading": "What limits should you check before trusting the answer?",
        "text": "The equations assume constant acceleration, so changing forces, air resistance or a braking profile that varies over time will make the results approximate or wrong. Signs matter too: choose a positive direction, such as upward or forward, and keep it for every value. A negative acceleration then means slowing down or acting backwards. Also check that the answer is physically sensible, such as a time that cannot be negative. If the tool cannot find a unique answer, add another known quantity, because most problems need at least three independent values."
      }
    ],
    "faqs": [
      [
        "Why can the calculator return no answer for some inputs?",
        "The equations can give no real answer when the values you enter contradict each other, such as a stopping distance that a given speed and deceleration cannot produce. Check the signs and the inputs, then try a different combination of known values."
      ],
      [
        "Can I use this for projectile motion?",
        "Yes, if you split the motion into horizontal and vertical parts. Horizontal velocity stays constant when air resistance is ignored, and vertical motion has steady gravitational acceleration, so each part can use the same equations separately."
      ],
      [
        "Which values should I leave blank?",
        "Leave blank any quantity you do not know and want the calculator to find, and fill in the values the problem gives you. Blanks that are too many can leave the problem undetermined."
      ]
    ]
  },
  "correlation-coefficient-calculator": {
    "answer": "A correlation coefficient calculator measures how closely two sets of numbers move together. It computes Pearson r by comparing each value to its mean, multiplying the paired deviations, and dividing by the product of the spread of each list. The result runs from minus one to plus one. Squaring r gives R², the share of variation one variable explains in the other.",
    "aiSummary": "This calculator takes two equal-length lists of numbers and returns Pearson r, the linear link between them, plus R squared, the share of variation explained. It centers each list on its mean and divides summed cross-products by the spreads. It measures only straight line association, so outliers and curved patterns can mislead it.",
    "shortKeyword": "correlation coefficient calculator",
    "longKeywords": [
      "how to find pearson r between two lists",
      "strength of a linear relationship",
      "measures only straight line association"
    ],
    "exampleInputs": {
      "x": "1, 2, 3, 4, 5, 6",
      "y": "2, 3, 5, 4, 7, 8"
    },
    "sections": [
      {
        "heading": "How to find Pearson r between two lists?",
        "text": "Use this tool when you have paired observations, such as hours studied and exam scores for each student, and you want one number that summarizes how the two move together. Enter the X values and Y values in the same order, separated by commas or spaces. Each X must pair with the Y in the same position, or the result will not mean what you expect. The calculator returns Pearson r, along with R squared and a plain label for direction and strength. Everything is computed in your browser, so your figures are not uploaded anywhere."
      },
      {
        "heading": "How do you judge the strength of a linear relationship?",
        "text": "A value of r near plus one means that higher X values tend to come with higher Y values, while a value near minus one means the reverse. Values close to zero suggest little straight line pattern. Labels such as weak, moderate or strong are conventions rather than fixed laws, so read them in the context of your field. R squared is simpler to explain: it is r multiplied by itself, so an r near plus or minus one gives an R squared near one, and the share explained rises quickly as r grows."
      },
      {
        "heading": "What common mistakes should you avoid with correlation?",
        "text": "The most common error is treating correlation as proof that one variable causes the other, since a third factor may drive both. Another mistake is mixing up lists that do not line up, such as entering dates in one list and totals in another. Outliers can pull r sharply up or down, so check a scatter plot before trusting the number. Finally, r from a small sample can be unstable, and r only describes straight line association, so a clear curved pattern can still produce a weak r."
      }
    ],
    "faqs": [
      [
        "Can a correlation be negative?",
        "Yes. A negative r means that as one variable rises, the other tends to fall. The sign shows direction, while the size shows how tightly the points follow a straight line. A value of minus one is a perfect inverse line, and a value of zero means no linear pattern."
      ],
      [
        "How many data pairs do I need?",
        "There is no fixed minimum that makes r valid, but very small samples produce unstable values that can change sharply when one pair is added or removed. Collect as many pairs as your study design allows, and report the number alongside r so readers can judge how stable the figure is."
      ],
      [
        "Should I use Spearman instead?",
        "Spearman rank correlation is a useful alternative when the relationship is consistently rising or falling but not straight, or when the data are ranks or contain strong outliers. Pearson r assumes a roughly linear pattern and is sensitive to extreme values, so compare both when you are unsure which fits your data."
      ]
    ]
  },
  "p-value-calculator": {
    "answer": "A p-value calculator converts a z-statistic into the probability of seeing a result at least as extreme as yours if the null hypothesis were true. It uses the standard normal curve: for a two-tailed test, it doubles the area beyond the absolute value of z, while one-tailed tests use only one side. Smaller p-values mean the data are less consistent with the null hypothesis.",
    "aiSummary": "Takes a z-statistic and a test direction, two-tailed, right-tailed or left-tailed, and returns the matching p-value from the standard normal distribution. It is the chance of a result as extreme as yours under the null hypothesis. The output depends only on the z-statistic you enter, so it cannot check your model, sampling or assumptions.",
    "shortKeyword": "p-value calculator",
    "longKeywords": [
      "how to find a p value",
      "what a significance threshold means",
      "choosing between one-tailed and two-tailed tests"
    ],
    "exampleInputs": {
      "zstat": "1.96",
      "tail": "right"
    },
    "sections": [
      {
        "heading": "How to find a p value from a z score?",
        "text": "Enter the z-statistic from your test and choose whether the alternative hypothesis points in one direction or both. The calculator looks up the area under the standard normal curve beyond your value and reports the p-value. If your z-statistic is positive and you chose a right-tailed test, the tail is the area above z. Use this tool when you already have a z-statistic from a test, such as a z-test on a mean or a proportion, and need the matching probability."
      },
      {
        "heading": "What a significance threshold means for your test?",
        "text": "Researchers often compare the p-value with a cutoff set before the study, commonly a small value such as five percent. If the p-value falls below that cutoff, the result is called statistically significant at that level. The cutoff is a convention, not a proof, and it should be chosen before looking at the data. A result just above the line is not a failed study; it is weaker evidence that deserves a cautious reading, and effect size matters too."
      },
      {
        "heading": "What mistakes happen when choosing between one-tailed and two-tailed tests?",
        "text": "The most common error is picking a one-tailed test after seeing which direction the data moved, which inflates the chance of a false positive. The direction should follow from your hypothesis and be fixed in advance. A second mistake is entering the wrong sign for the z-statistic, which flips a right-tailed result into a left-tailed one. Finally, a small p-value does not measure how large or important an effect is, and it does not prove your hypothesis is true."
      }
    ],
    "faqs": [
      [
        "Is a p-value the chance my hypothesis is true?",
        "No. The p-value is calculated assuming the null hypothesis is true, so it describes how surprising your data would be under that assumption. It says nothing direct about the probability that either hypothesis is correct. Treat it as one piece of evidence next to study design, effect size and prior knowledge."
      ],
      [
        "What happens if my z-statistic is negative?",
        "The sign matters mainly for one-tailed tests. For a two-tailed test, the calculator uses the absolute value, so a negative z gives the same p-value as its positive counterpart. For a left-tailed test, a negative z points toward the tail being tested and gives a smaller p-value."
      ],
      [
        "Can I use this for a t-test?",
        "Not directly. This calculator uses the standard normal distribution, which matches a z-test. A t-test uses a t distribution whose shape depends on sample size, so its p-value can differ, especially with small samples. For a t-test, use a tool built for t distributions."
      ]
    ]
  },
  "email-marketing-roi-calculator": {
    "answer": "An email campaign ROI calculator projects the revenue and return from sending one campaign. It multiplies list size by open rate, click-through rate, conversion rate and average order value to estimate sales. Then it subtracts the total send cost and divides by that cost to give ROI. The output is a planning estimate, not a promise, because real audience behavior changes.",
    "aiSummary": "Projects revenue from one email send by multiplying list size by open, click and conversion rates and average order value. ROI is revenue minus send cost, divided by send cost. The core method is a simple multiplicative funnel that assumes steady rates, so it cannot capture list decay, seasonality or costs beyond sending.",
    "shortKeyword": "email campaign roi",
    "longKeywords": [
      "how to model email campaign revenue",
      "from list size to conversions",
      "what counts as a good open rate"
    ],
    "exampleInputs": {
      "listSize": "10000",
      "openRate": "25",
      "ctr": "3",
      "avgOrder": "60"
    },
    "sections": [
      {
        "heading": "How to model email campaign revenue from a list?",
        "text": "This calculator follows the funnel that most email programs share. You start with the number of people on the list, apply the share who open, the share who click, and the share who buy, then multiply by the average order value. The result is projected revenue for one campaign. Use it before sending to decide whether a campaign is worth the effort, or after sending by replacing the assumptions with your actual figures. Start with conservative rates so the first run is not too optimistic."
      },
      {
        "heading": "How do the funnel rates from list size to conversions interact?",
        "text": "Each rate multiplies the one before it, so small changes compound. Doubling the open rate has the same effect on revenue as doubling the click-through rate, because both sit in the product. Conversion rate and average order value often move the result most, and they are the figures teams can influence through offers and landing pages. Check which stage is weakest in your funnel before spending on list growth. Small gains in two stages can outweigh a large gain in one."
      },
      {
        "heading": "What mistakes make email ROI look better than it is?",
        "text": "A common mistake is using the full list size when many addresses are inactive or unsubscribed, which inflates every downstream figure. Another is applying an open rate from a welcome series to a general promotion. The calculator also treats each rate as independent and constant, while real audiences fade over time. Finally, the cost input covers only sending, so it may leave out design, copywriting, software and staff time. Review each assumption before sharing the figure."
      }
    ],
    "faqs": [
      [
        "Does a high ROI mean the campaign should be repeated?",
        "Not automatically. A high ROI on one send can reflect an unusually engaged segment or a one-off offer. Check whether the result holds across several sends and whether the costs you entered are complete. Repeating only the campaigns whose numbers hold up gives a more reliable picture."
      ],
      [
        "How should I count the cost of an email?",
        "Include the cost of the sending platform, any per-message fees, and time spent writing and designing the email. Many teams spread software costs across all campaigns. The cost input in this tool is per email, so divide monthly totals by the number of messages sent that month to get a usable figure."
      ],
      [
        "What counts as a good open rate?",
        "There is no universal figure, because open rates vary by industry, list quality and subject line quality. Use your own past campaigns as the baseline, and change one input at a time when testing scenarios with this calculator. The result is only as good as the rates you enter."
      ]
    ]
  },
  "employee-turnover-calculator": {
    "answer": "An employee turnover calculator divides the number of staff who left during a period by the average number of employees, then multiplies by one hundred to express a percentage. It also estimates replacement cost by applying a rough share of annual salary to each departure, covering recruiting, onboarding and lost productivity. The outputs are planning figures, so treat the replacement estimate as an approximation.",
    "aiSummary": "Computes an attrition rate as leavers divided by average headcount for the period, then estimates the cost of each departure as a share of annual salary. The core assumption is a fixed replacement share, which ignores role seniority and local hiring costs.",
    "shortKeyword": "employee turnover calculator",
    "longKeywords": [
      "how to calculate employee turnover rate",
      "estimating the cost of replacing staff",
      "average headcount for the period"
    ],
    "exampleInputs": {
      "left": "12",
      "avg": "100",
      "salary": "60000"
    },
    "sections": [
      {
        "heading": "How to calculate employee turnover rate?",
        "text": "Turnover rate compares departures with the team you actually run. Count the employees who left during the period, then find the average number of employees across that same period, often the mean of opening and closing headcount. Divide leavers by that average and multiply by one hundred. Use the result to track trends over time, compare teams of different sizes, or set retention goals. A rising line matters more than any single reading."
      },
      {
        "heading": "What goes into estimating the cost of replacing staff?",
        "text": "The replacement estimate in this tool uses a simple rule of thumb: a share of the average annual salary for each person who left. That share is meant to cover advertising and recruiter fees, interview time, onboarding, training and the weeks before a new hire reaches full output. Real costs depend on seniority, scarcity of the skill, and how long the role stays open. Read the figure as an order-of-magnitude guide rather than a budget line."
      },
      {
        "heading": "What limits should you keep in mind about turnover figures?",
        "text": "A single turnover rate hides who left and why. Voluntary exits, dismissals and retirements carry different meanings, so consider filtering them before drawing conclusions. Small teams swing sharply with one departure, which makes the percentage noisy. A high rate in one department may also reflect a management issue rather than pay. Finally, the replacement estimate ignores lost knowledge and customer relationships, so the true cost is often higher than shown."
      }
    ],
    "faqs": [
      [
        "Is a turnover rate the same as attrition?",
        "In everyday HR usage the two terms are used interchangeably, and both describe the share of staff leaving over a period. Some organizations separate voluntary and involuntary attrition, so check the definition a report uses before comparing numbers across sources."
      ],
      [
        "Which period should I use for the calculation?",
        "Most teams use a full year so seasonal hiring and exits average out, but a quarter or month can show recent changes faster. Use the same period each time you compare results, and calculate the headcount average over that same window. Mixing a monthly leaver count with an annual average gives misleading percentages."
      ],
      [
        "Should I include people hired and gone in the same period?",
        "Including or excluding them changes the result, so decide once and apply it consistently. Many people count them among leavers because they still cost recruiting effort. Document the choice alongside the rate so colleagues can reproduce it."
      ]
    ]
  },
  "dividend-yield-calculator": {
    "answer": "A dividend yield calculator shows the annual dividend per share as a percentage of the current share price. It divides the dividend by the price and multiplies by one hundred. It can also multiply the per-share dividend by the number of shares held to show annual income. Yield moves inversely with price, so it changes as the stock price changes, even when the payout stays the same.",
    "aiSummary": "Estimates dividend yield by dividing annual dividend per share by share price, then optionally multiplies by shares held to show annual income. The core method is a single ratio that assumes the dividend stays constant. It is an educational estimate, not investment advice, and it says nothing about whether the dividend is sustainable.",
    "shortKeyword": "dividend yield calculator",
    "longKeywords": [
      "how to work out dividend yield",
      "read a high dividend yield",
      "income from a dividend holding"
    ],
    "exampleInputs": {
      "price": "50",
      "annual": "2",
      "shares": "100"
    },
    "sections": [
      {
        "heading": "How to work out dividend yield from a share price?",
        "text": "Dividend yield expresses the cash a company pays each year as a percentage of what you pay for a share. Enter the current share price and the annual dividend per share, and the calculator returns the yield. Adding the number of shares you hold turns the per-share dividend into an annual income estimate. Use the tool to compare income-paying stocks on an equal footing, or to see what a holding might pay in a year. Check that the dividend figure is annual, not quarterly."
      },
      {
        "heading": "How should you read a high dividend yield?",
        "text": "A high yield is not automatically attractive. Because yield rises when price falls, an unusually high number can signal that the market expects the dividend to be cut, or that the share price has dropped for other reasons. Compare the yield with similar companies in the same sector, and look at the payout ratio and earnings history. The calculator shows the arithmetic only; judging whether the payment will last takes further research."
      },
      {
        "heading": "What mistakes do investors make with yield?",
        "text": "The most common error is using a quarterly dividend as if it were annual, which can badly misstate the yield. Another is ignoring special one-off payments, which can distort a single year. Yield also says nothing about total return, since price changes can outweigh income. Finally, the calculation assumes the dividend stays constant, which many companies do not promise. Compare the figure against the company's own history and against peers in the same sector, reading both together."
      }
    ],
    "faqs": [
      [
        "How do I compute income from a dividend holding?",
        "Multiply the annual dividend per share by the number of shares you own, then review the result before tax. Tax treatment varies by country and account type, so this is an educational estimate rather than a tax figure."
      ],
      [
        "Does a dividend reinvestment plan change the yield?",
        "The yield at any moment is still the annual dividend divided by the price. Reinvesting dividends adds shares over time, which increases future income, but it does not change the percentage shown for a given price. Check your plan's terms, since fees and timing rules differ."
      ],
      [
        "Why is yield lower after a share price rises?",
        "Yield is a ratio, so when the price rises and the dividend is unchanged, the numerator stays the same while the denominator grows. The percentage falls even though the company paid the same cash. This is why yield alone does not show whether the stock is cheap or expensive."
      ]
    ]
  },
  "pe-ratio-calculator": {
    "answer": "A P/E ratio calculator divides a share price by earnings per share, producing a multiple that describes how much investors pay for each unit of current earnings. It also shows earnings yield, the inverse: earnings per share divided by price, expressed as a percentage. Earnings yield can be set beside bond yields when comparing returns. The P/E ratio is a valuation shorthand, not a verdict on a company.",
    "aiSummary": "Computes a price to earnings multiple by dividing share price by earnings per share, and the earnings yield as its inverse. The method is one division. It does not show whether a multiple is high or low without context, and it ignores growth, debt and one-off items. Educational estimate, not investment advice.",
    "shortKeyword": "p/e ratio calculator",
    "longKeywords": [
      "how to calculate price to earnings",
      "comparing earnings yield to bond yields",
      "whether a multiple is high or low"
    ],
    "exampleInputs": {
      "price": "150",
      "eps": "5"
    },
    "sections": [
      {
        "heading": "How to calculate price to earnings for a stock?",
        "text": "Enter the current share price and the earnings per share for the same period. The calculator returns the P/E ratio, which tells you how many dollars investors pay for each dollar of annual earnings. It also returns earnings yield, a percentage you can set beside bond yields. Use it to screen companies in the same industry or to see how a valuation changes as the price moves. Make sure the share price and earnings are both current and on the same basis. Note the date each figure was reported."
      },
      {
        "heading": "What does a P/E ratio tell you about valuation?",
        "text": "A higher P/E usually means investors expect faster growth or are willing to pay a premium for stability, while a lower P/E can signal slower growth, higher risk, or simply an overlooked company. Typical values differ widely between industries, so comparing a software firm with a utility is rarely useful. Use P/E as a starting point for questions, not as a conclusion about whether a share is cheap or expensive."
      },
      {
        "heading": "What are the common mistakes with earnings figures?",
        "text": "The most frequent mistake is mixing trailing and forward earnings, which can change the ratio sharply. Another is using earnings that include large one-time gains or losses, which distorts the result. Companies with negative earnings do not produce a meaningful P/E at all. The ratio also ignores debt and cash, so two companies with equal multiples can carry very different risk. Check the earnings basis before comparing numbers, and write down which definition you used so the comparison can be repeated later."
      }
    ],
    "faqs": [
      [
        "Is a P/E ratio the same as a price target?",
        "No. A P/E is a current ratio built from today's price and reported earnings. A price target is a forecast of where a price might go, usually built on expected earnings and an assumed multiple. The calculator reports the ratio only and makes no forecast."
      ],
      [
        "How does comparing earnings yield to bond yields work?",
        "Earnings yield is the inverse of P/E, so it can be placed next to a bond's yield as a rough comparison. Earnings can grow or fall, while a bond pays fixed coupons, so the two are not like for like. Treat the comparison as a framing device, not a return forecast."
      ],
      [
        "Why do some stocks have no P/E?",
        "A P/E needs positive earnings per share to be meaningful. When earnings are zero or negative, the division does not help comparison, so analysts usually look at other measures such as revenue or cash flow instead."
      ]
    ]
  },
  "circle-area-calculator": {
    "answer": "A circle area calculator takes the radius and multiplies pi by the radius squared to give the area. It also computes circumference as two times pi times the radius, and shows the diameter as twice the radius. The tool uses a fixed decimal value for pi, so results are very close for everyday use but are approximations rather than exact values.",
    "aiSummary": "Computes the area of a circle as pi times radius squared, and the circumference as two pi times radius. The core method is standard geometry, approximating pi with a fixed constant, so results are close but rounded. It assumes a perfect circle and does not handle arcs, ellipses or unit conversion.",
    "shortKeyword": "circle area calculator",
    "longKeywords": [
      "how to find area from radius",
      "circumference from radius or diameter",
      "approximating pi with a fixed constant"
    ],
    "exampleInputs": {
      "radius": "5"
    },
    "sections": [
      {
        "heading": "How to find area from radius for any circle?",
        "text": "Use this tool when you know the distance from the center of a circle to its edge and need its area, such as the floor space of a round table or the surface of a round plate. Enter the radius and the calculator squares it, multiplies by pi, and reports the area. The same radius also gives the circumference and diameter, which helps when you need the length of trim, a ring or a pipe wrap. Keep the unit the same for every value you enter."
      },
      {
        "heading": "What is the circumference from radius or diameter?",
        "text": "Circumference is the distance around the circle, found by multiplying two by pi and then by the radius. If you measured across the middle instead, enter half of that diameter as the radius, because the tool takes the radius as its input. Circumference grows in a straight line with radius while area grows with its square, so doubling the radius doubles the length around but quadruples the area. Keep this distinction in mind when estimating materials."
      },
      {
        "heading": "What common mistakes lead to wrong circle results?",
        "text": "The most frequent error is entering the diameter where the radius belongs, which makes the area four times too large. Keep units consistent, so a radius in inches should not be treated as centimeters. Remember that the result is for an ideal circle; a real object with a flattened edge or a hole will differ. Finally, rounding the radius early in a multi-step calculation can shift the final value more than expected."
      }
    ],
    "faqs": [
      [
        "Why does the calculator use a decimal for pi?",
        "Pi is an irrational number, so its decimal digits never end or repeat. Software must stop at some finite precision, which is why the tool stores a fixed approximation. For construction, sewing or classroom work this precision is more than enough."
      ],
      [
        "How do I find a radius from a measured circle?",
        "Measure straight across the center to get the diameter, then halve it. Measuring the distance from the center to the edge directly is also valid. Keep the same unit throughout, because the area will be in square units and the circumference in linear units."
      ],
      [
        "Does this work for a semicircle?",
        "Not directly. A semicircle has half the area of a full circle with the same radius, so you can halve the result. Its curved boundary has half the circumference, but the flat edge adds the diameter to the perimeter. Calculate the full circle, then adjust for the part you need."
      ]
    ]
  },
  "electricity-bill-calculator": {
    "answer": "An electricity bill calculator estimates your monthly power cost by multiplying total kWh used by your price per kWh. Each kilowatt-hour is one kilowatt of power used for one hour, so the product gives the energy portion of the bill. Many utilities add fixed monthly charges and taxes, which this simple method leaves out unless you add them separately.",
    "aiSummary": "Estimates a monthly electricity cost by multiplying kilowatt-hours used by the rate per kWh, so the core method is one multiplication. It helps with comparing appliances by monthly cost before you buy. It leaves out fixed fees, taxes and tiered pricing, so the result is an educational estimate rather than your exact bill.",
    "shortKeyword": "electricity bill calculator",
    "longKeywords": [
      "how to estimate monthly electricity cost",
      "what does reading kWh involve",
      "comparing appliances by monthly cost"
    ],
    "exampleInputs": {
      "kwh": "900",
      "rate": "0.15"
    },
    "sections": [
      {
        "heading": "How to estimate monthly electricity cost from usage?",
        "text": "Start with the total kilowatt-hours your home used in a billing period, which appears on most utility statements. Multiply that figure by your rate per kWh to get the energy charge. Use the tool to plan a budget, to see what a new heater or a second refrigerator could add, or to check whether a bill looks reasonable. Repeat the calculation for each month to see seasonal swings in cost."
      },
      {
        "heading": "What does reading kWh involve on a utility bill?",
        "text": "A kWh figure counts energy, not money, so it must always be paired with a price. Look for the usage line on the bill, which usually shows the current period and sometimes a comparison with last year. Some plans charge different rates at different times of day, so one number may not capture your real cost. If your bill has several rate lines, enter a blended average rather than a single peak price."
      },
      {
        "heading": "What limits should you keep in mind for power estimates?",
        "text": "The calculator uses one flat rate, so tiered or time-of-use pricing will produce a different answer. Fixed monthly charges, taxes and surcharges are left out unless you add them. Appliance estimates depend on hours of use, which people often overestimate. Seasonal changes in heating or cooling can dominate the bill, so one month rarely represents a full year. Treat the result as a planning figure. Check your statement for any charges the tool leaves out."
      }
    ],
    "faqs": [
      [
        "Why does my real bill differ from this estimate?",
        "Real bills include fixed charges, taxes, demand fees, and tiered or time-of-use pricing that this simple method does not model. Meter reading dates may also not match the calendar month. Add those items separately if you need a closer match, and compare with the kWh total on your statement."
      ],
      [
        "Can I use this to compare two appliances?",
        "Yes, for a rough comparison. Estimate each appliance's kWh over a month by multiplying its power draw by its hours of use, then run both through this calculator with the same rate. The difference shows relative running cost, which is often more useful than the absolute figure."
      ],
      [
        "Should the rate include delivery charges?",
        "Your price per kWh may be split into supply and delivery components on the statement. Using only the supply rate understates your bill, while adding every line item gives a closer figure. Choose the approach that matches what you want to plan for, and state it when you share the result."
      ]
    ]
  },
  "calorie-deficit-calculator": {
    "answer": "A calorie deficit calculator works out how many calories you need to eat below your maintenance level to lose a target amount each week. It uses the rule that about seven thousand seven hundred kilocalories equals one kilogram of body fat, spreads the weekly target across seven days, and subtracts that daily deficit from maintenance calories.",
    "aiSummary": "Estimates daily calories by subtracting a daily deficit from maintenance calories, where the deficit is the weekly target in kilograms times a fixed energy value, divided by seven. It takes maintenance calories and target loss as inputs and assumes both are accurate and weight change is steady. Educational estimate, not medical advice.",
    "shortKeyword": "calorie deficit calculator",
    "longKeywords": [
      "how many calories to cut each day",
      "adjust a deficit when progress stalls",
      "maintenance calories and target loss"
    ],
    "exampleInputs": {
      "tdee": "2200",
      "target": "0.5"
    },
    "sections": [
      {
        "heading": "How many calories to cut each day to lose weight?",
        "text": "Enter your estimated maintenance calories, which is the intake that keeps your weight steady, and the weekly loss you want. The calculator converts that loss into a daily deficit, then shows how many calories to eat. A gentle target of around half a kilogram per week is a common starting point in general guidance. Use this as a starting plan, then watch the trend over several weeks and adjust. Pick a start date and record your weight at the same time of day to keep the trend readable."
      },
      {
        "heading": "How should you adjust a deficit when progress stalls?",
        "text": "Weight moves from day to day because water and digestion shift it, so judge the trend over two or more weeks before changing anything. If the trend is flat, first check how closely you are tracking intake, since small errors add up. Only then reduce the target or recalculate maintenance, which changes as body weight changes. Make one adjustment at a time so you can see what caused the change."
      },
      {
        "heading": "What mistakes come from using a big deficit?",
        "text": "A larger deficit is not always more useful. Very steep cuts can increase hunger, reduce training quality, and make the plan hard to keep. The formula also assumes maintenance is known, and estimates can be off by a wide margin. Avoid setting intake far below what you can sustain. Eating too little for long periods does not suit everyone, so people with medical conditions or who are pregnant should consult a clinician."
      }
    ],
    "faqs": [
      [
        "Why does weight loss slow down over time?",
        "As body weight falls, maintenance calories usually fall too, so the same intake produces a smaller deficit. Activity levels can also drift downward without notice. Recalculate with your new weight every so often, and check that your logged intake still matches what you eat."
      ],
      [
        "How can I estimate my maintenance calories?",
        "Many people start with a formula based on body size, age, sex and activity, then refine the figure using their own weight trend. If weight stays steady while eating a known amount, that intake is a practical estimate of maintenance. Treat it as a starting point rather than a fixed fact."
      ],
      [
        "Does the half kilogram target apply to everyone?",
        "No. It is a common moderate pace, not a rule. Some people choose a slower rate to protect muscle or energy. Pick a pace you can sustain, and speak with a qualified professional about weight goals, especially if you have a health condition."
      ]
    ]
  },
  "pregnancy-week-calculator": {
    "answer": "A pregnancy week calculator measures gestational age, the time since the first day of your last menstrual period, and reports it in completed weeks and days. It also shows the trimester. Clinicians count pregnancy from that date by convention, so the figure is usually a little ahead of conception timing. The result is an estimate for planning and does not replace a clinical dating scan.",
    "aiSummary": "Calculates gestational age in weeks and days from the first day of the last menstrual period, plus the trimester. The method is date subtraction, since gestational age from the first day counts from that date. It assumes regular cycles, so irregular cycles or ultrasound dating can change it. Educational estimate, not medical advice.",
    "shortKeyword": "pregnancy week calculator",
    "longKeywords": [
      "how to count weeks from last period",
      "what trimester you are in",
      "gestational age from the first day"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to count weeks from last period to today?",
        "text": "Enter the first day of your last period. The calculator counts the days between that date and today, then divides by seven to give full weeks and remaining days. This is the standard way pregnancy is dated in clinical settings, so it matches what many providers will say. Because the count starts before conception, the number can seem higher than you expect. Check the result against your own records and your care team's dating."
      },
      {
        "heading": "How do you tell what trimester you are in?",
        "text": "Pregnancy is commonly split into three trimesters. The first covers roughly weeks one to twelve, the second runs from about week thirteen to week twenty six, and the third covers the final stretch to about week forty. These boundaries are approximate and vary between guidelines, so the label is a rough guide to stages of development. Your care team will tell you which milestones and tests apply at each point."
      },
      {
        "heading": "What limits make the week count less reliable?",
        "text": "Irregular cycles make the start date hard to pin down, because ovulation may fall later than the usual middle of a cycle. If you do not remember the first day of your last period, the result will not be reliable. Early ultrasound measurements often override the date-based count when the two disagree. Treat this tool as a planning aid and confirm your dates with a healthcare professional. Keep a note of the start date you used so later checks can be compared with it."
      }
    ],
    "faqs": [
      [
        "How is a due date worked out?",
        "A due date is usually set about forty weeks after the first day of the last period, using the same dating method. Many people deliver before or after that date, so it is a target window rather than a fixed day. Your provider may revise it after an early ultrasound."
      ],
      [
        "Can I track a pregnancy without knowing my last period?",
        "Yes, but the estimate will be less precise. A clinician can date a pregnancy with an early ultrasound, which measures the embryo directly and is usually more reliable than counting from an uncertain start date. Ask your provider about dating options."
      ],
      [
        "Why do pregnancy weeks start before conception?",
        "Gestational age is counted from the start of the last period because that day is easy to identify, while the exact moment of conception is not. Ovulation typically happens about two weeks later in a standard cycle, so the first two weeks are counted before a pregnancy exists. This is a convention, not a sign that something went wrong."
      ]
    ]
  },
  "pdf-editor": {
    "answer": "A PDF editor is software for opening, reading and changing PDF documents. This PDF editor workspace lets you view pages, add annotations, organize pages, fill form fields and recognize text in scanned pages. It is hosted separately from this site and opens when you use it. Choose your file, use the tools you need, then save the result as a separate copy and keep the original.",
    "aiSummary": "This page describes an online PDF editor that lets you view, annotate, organize pages, fill out PDF forms online and recognize text in scanned pages. The workspace is hosted separately and loads when opened. Its main limitation is that processing depends on that separate workspace, so keep a copy of your original file.",
    "shortKeyword": "pdf editor",
    "longKeywords": [
      "how to annotate a PDF file",
      "fill out PDF forms online",
      "recognize text in scanned pages"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What tasks does this PDF editor cover?",
        "text": "Use this workspace when a PDF needs more than a viewer. Typical tasks include reading a long document, marking up a contract with notes, rearranging pages before sending a file, and completing a form that someone else created. The same workspace also includes optical text recognition for scanned pages, which helps when a document is an image and text cannot be selected. Because the workspace is a separate tool, check its own menus for the exact operation you need before you start."
      },
      {
        "heading": "How to annotate a PDF file?",
        "text": "Open the file in the workspace, select the annotation or markup tool, and place notes, highlights or drawings on the page you want to mark. Review each mark at normal zoom before you save, because small notes can be hard to see when a page is printed. Keep the original unchanged by saving the annotated version under a new name. If several people will review the file, agree on a naming rule first so that the latest copy is easy to find."
      },
      {
        "heading": "What limits should you check before relying on it?",
        "text": "Check that the workspace opens your file type and that the operation you need is available there. Scanned text recognition depends on image quality, so verify important names, numbers and dates against the page. Form filling works only where the form fields are present and readable. Also confirm that a saved copy contains your changes before you delete anything, and do not treat an annotated file as a secure redaction, since marks placed on top of content do not remove it."
      }
    ],
    "faqs": [
      [
        "Can I fill out PDF forms online?",
        "Yes, if the form has fillable fields that the workspace can read. Open the form in the editor, select the field you want to complete, type your entry and save a copy. Forms that are flat scans or use unsupported form technology may need a different approach, such as typing text as an annotation."
      ],
      [
        "Could editing here overwrite my source PDF?",
        "Not unless you save over it. Work on a copy when you can, and save changes under a new file name so the source document stays intact. Keep the original until you have checked the saved version in another viewer."
      ],
      [
        "What should I check after scanned text is recognized?",
        "Compare the recognized text with the page, especially names, amounts, dates and codes. Recognition quality falls with blurry, skewed or low-resolution scans, so correct errors before the text is used for search, copying or records. Keep the scanned image as the reference copy."
      ]
    ]
  },
  "reverse-pdf-pages": {
    "answer": "Reverse PDF pages means changing the order so the last page becomes the first and the first becomes the last, while the content of each page stays the same. This reverse PDF pages tool does that without rasterizing the document, which means the pages are not turned into images. Choose a supported file, process it and download the result. Keep and review the original.",
    "aiSummary": "Explains a browser-based tool that reverses the page order of a PDF so the last page comes first. The method rewrites page sequence without rasterizing, so content stays as-is. Main limitation: it changes only order, so check that the reversed file still reads correctly before sharing it.",
    "shortKeyword": "reverse pdf pages",
    "longKeywords": [
      "how to reverse PDF page order",
      "check reversed PDF page order",
      "without rasterizing the document"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When would you reverse PDF pages?",
        "text": "Reversing is useful when a scanned stack was fed into a scanner backward, or when a document was exported in the wrong sequence. It also helps when a stack of pages was numbered in reverse order. Reviewing the last pages first is another reason people use it. The tool changes only the sequence of pages, so the content of each page stays the same. Before you share the result, open it once to confirm that the first page is now the one you expected."
      },
      {
        "heading": "How do you check reversed PDF page order?",
        "text": "Compare the first and last pages of the output with the first and last pages of the original. Scroll through a few pages in the middle as well, because a reversal moves every page, so a mismatch is easy to spot near the ends. Note the page count too. A reversed file should have the same number of pages as the source, so any difference is a reason not to use the output until the cause is found."
      },
      {
        "heading": "What are the common mistakes with reversing pages?",
        "text": "A common mistake is reversing a file and then replacing the original without checking it, which leaves no way back if the order was wrong. Another is assuming the reversed order is the same as a booklet or duplex layout; reversal changes the sequence only, so any imposition for printing needs a separate step. Also remember that page labels, bookmarks and internal links may still refer to the old order, so review them before distribution."
      }
    ],
    "faqs": [
      [
        "How to reverse PDF page order?",
        "Choose the PDF, let the tool read its page count, and run the reverse operation. The result has the last page first and the first page last, with each page's content unchanged. Download the output and keep the original file in place."
      ],
      [
        "Does reversing keep the text searchable?",
        "Reversing does not rasterize the document, so the pages stay as document content rather than images. Searchability should be preserved in that case, but confirm with a quick search in the output, since some scanned files are already images before you start."
      ],
      [
        "Can I undo a reversal after downloading?",
        "Reversing a reversed file gives back the earlier order, so the same tool can undo a mistake. Still, the simplest protection is your original copy, which you should keep until the output has been checked in a viewer."
      ]
    ]
  },
  "add-blank-pdf-page": {
    "answer": "Adding a blank PDF page means placing an empty sheet into a document at a chosen position while the existing pages keep their order. This add blank pdf page tool places a blank page before or after a page you choose, in your browser. Choose a supported file, set the position, process the document and download the result. Keep and review the original to compare page counts.",
    "aiSummary": "Describes a browser-based tool that inserts one empty page before or after a chosen page in a PDF. The existing pages keep their order, while later pages move one place further along. Main limitation: the new page is only empty space, so any content, numbering or header must be added separately.",
    "shortKeyword": "add blank pdf page",
    "longKeywords": [
      "how to insert a blank page",
      "blank page before or after a page",
      "where to put a blank page"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why add a blank page to a PDF?",
        "text": "A blank page is useful when a document needs space for a handwritten note, when a page was accidentally left out, or when a deliberate separator should start a new section. Printing workflows also use blank sheets to begin a fresh section on its own page. Because the inserted page carries no content, it works as a placeholder you can fill later with a scan, a signature page or a note added in another editor. Choose the position carefully so that the surrounding pages still read in the right order."
      },
      {
        "heading": "Where to put a blank page in a PDF?",
        "text": "Choose the existing page you are working from, then decide whether the blank page should come before or after it. Before is the right choice when a missing page belongs at the start of a section, and after suits a sheet that follows the page you just finished. Check the page numbers in the result, because every page after the insertion point moves one place further along. Compare the new order against your outline before sharing."
      },
      {
        "heading": "What are the limits of adding a blank page?",
        "text": "The inserted page is truly empty, so it does not add a heading, page number or header unless you place those elements later. Bookmarks, page labels and cross-references that point to later pages may now point to the wrong place, which is a common surprise. Check the page size of the new sheet against its neighbors before printing, since a mismatch can cause scaling problems. Review the whole file in a viewer before you distribute it."
      }
    ],
    "faqs": [
      [
        "How to insert a blank page?",
        "Open the supported file, pick the page you are working from, and choose whether the blank page goes before or after it. Process the document and download the output. Then open it in a viewer to confirm that the blank sheet is in the position you intended."
      ],
      [
        "Will the blank page have a page number?",
        "No. The inserted sheet is empty, so any page number, header or footer does not appear unless you add it with another tool. Printed numbers on the original pages stay as they were, which can make the numbering look off by one until you check the result."
      ],
      [
        "Can I add several blank pages at once?",
        "Run the tool once for each position you need. After every pass, recheck the page order, because each insertion moves all later pages one place further along and changes the numbers you would use next."
      ]
    ]
  },
  "flatten-pdf-forms": {
    "answer": "To flatten PDF forms means converting the visible appearance of filled form fields into fixed page content. This flatten pdf forms tool does that in your browser. In effect, you turn form entries into PDF content so they can no longer be edited as fields. Choose a supported file, process it and download the result. Signatures may become invalid, so keep and review the original.",
    "aiSummary": "Describes a browser-based step that converts filled form appearances into fixed page content, so entries can no longer be edited as fields. The page content is rewritten rather than the form being edited. Main limitation: digital signatures become invalid, and not all annotations are removed, so check the output.",
    "shortKeyword": "flatten pdf forms",
    "longKeywords": [
      "how to flatten filled PDF forms",
      "turn form entries into PDF content",
      "flatten PDF form fields for printing"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Should you flatten PDF form fields for printing?",
        "text": "Flattening makes sense after a form has been completed and no further edits are expected, such as when an applicant's entries must be archived as they were submitted. It also helps when a printer or viewer does not display form fields reliably, because the entries become part of the page. Before flattening, confirm that every field you need is filled, since the result is harder to change afterward. Keep an editable copy in case corrections are needed later."
      },
      {
        "heading": "How do you read the flattened result?",
        "text": "Open the output in a viewer and check that each entry appears where you expect and matches the filled form. Try selecting text or clicking a field, because flattened entries should no longer behave as editable inputs. Look at the signature area too, since changes to a signed document can make an existing signature invalid. Compare the output with the original side by side to catch missing entries. Note any values that look truncated or shifted, because they often point to a layout problem that is easier to fix before you share the file."
      },
      {
        "heading": "What are the common mistakes and limits with flattening?",
        "text": "A common mistake is flattening a form before all its fields are complete, which fixes blanks into the page. Another is assuming flattening removes everything else in the file. It does not remove all annotations, and it is not a way to delete sensitive information. Also remember that a signed document may need to be signed again after changes, because the original signature no longer validates. Keep the unflattened source so that corrections remain possible."
      }
    ],
    "faqs": [
      [
        "How to flatten filled PDF forms?",
        "Choose the supported file, process it to convert the filled fields into fixed page content, and download the result. Before you do, make sure every entry is final, because the fields will not stay editable. Open the output in a viewer to confirm the values appear correctly."
      ],
      [
        "Can I still edit fields after flattening?",
        "Not as form fields. Flattening turns their appearance into page content, so you would need to keep an editable copy of the form if corrections might be needed. Keep that copy before you run the operation."
      ],
      [
        "Are digital signatures still valid after flattening?",
        "Usually not. Changing a signed document can make the existing digital signature invalid, so check the signature status after processing. If a signature is required, sign the flattened file again using a method suited to your process."
      ]
    ]
  },
  "fill-pdf-forms": {
    "answer": "Filling PDF forms means writing values into the named fields of a form, such as text boxes, checkboxes and choice lists. This fill pdf forms tool does that in your browser, matching each entry to the field name you provide. Choose a supported file, enter the values, process the document and download the result. Only supported AcroForm fields are filled, and XFA forms are unsupported.",
    "aiSummary": "Describes a browser-based method that fills text, checkbox and choice fields in a PDF by matching values to their field names. Only standard AcroForm fields are supported, not XFA forms. Main limitation: characters outside the built-in Latin font may need an embedded font to display correctly.",
    "shortKeyword": "fill pdf forms",
    "longKeywords": [
      "how to fill PDF forms by name",
      "find field names in a PDF",
      "check a filled PDF form"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do you find field names in a PDF?",
        "text": "Each fillable box in a PDF form carries an internal name, which is often different from the label printed next to it. This tool writes values by that name, so you need to know the names before filling. Inspect the form in an editor that lists fields, or note the names from an earlier run. Checkboxes and choice fields need values that match their settings, so enter data that fits each field type."
      },
      {
        "heading": "How should you check a filled PDF form?",
        "text": "Open the completed file in a viewer and compare every entry with your source data. Check that text is not cut off by the box size, that checkboxes are in the state you intended, and that choice fields show the option you chose. Because a fill can succeed while a field is misnamed, look for any value that did not appear at all and trace it back to its field name. Note which fields were missed, so the next run can be corrected."
      },
      {
        "heading": "What are the common limits of filling PDF forms?",
        "text": "The most common problem is an unsupported form type. Forms built with XFA technology cannot be filled by this method, so a blank result may mean the form itself is the cause rather than your entries. Non-Latin text can also fail to display if the built-in font lacks the characters, which may require an embedded font. Finally, do not assume a filled form is still signed or certified after editing. Keep the original form as a reference for comparison."
      }
    ],
    "faqs": [
      [
        "How to fill PDF forms by name?",
        "Open the supported file, enter each value against its exact field name, and choose only option values the field allows. Process the document and download the result. Then check the output in a viewer, since a value entered under a misspelled name will not appear."
      ],
      [
        "Can I fill a form that uses XFA?",
        "No. Only supported AcroForm fields are filled, and XFA forms are unsupported. If a form does not respond to any entry, check whether it uses XFA technology before assuming your values are wrong."
      ],
      [
        "Will filled values stay editable?",
        "They usually do, because the values are written into the form fields rather than flattened onto the page. Still, keep the original and review the output, because later steps such as flattening or printing can change how the entries behave."
      ]
    ]
  },
  "remove-pdf-metadata": {
    "answer": "Removing PDF metadata means clearing the descriptive details stored in a document, such as title, author and creation information, plus the XMP metadata block. This remove pdf metadata tool does that in your browser and can clear PDF document information fields for you. Choose a supported file, run the operation and download the cleaned copy. It does not redact content inside pages, so keep and review the original.",
    "aiSummary": "Explains a browser-based cleanup that clears standard document information and XMP metadata from a PDF. The page contents are not edited, so the visible text and images stay the same. Main limitation: this is metadata cleanup only, not redaction, so sensitive content inside pages must be handled separately.",
    "shortKeyword": "remove pdf metadata",
    "longKeywords": [
      "remove metadata from a PDF file",
      "clear PDF document information fields",
      "is metadata removal the same as redaction"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why remove metadata from a PDF file?",
        "text": "Metadata can record an author name, editing software, timestamps and document titles that you may not want to share. Removing it before publishing or sending a file reduces the background information that travels with the document. This is common when a file is shared outside an organization or uploaded to a public place. The visible pages remain as they were, so a reader sees the same document while the file carries less hidden detail."
      },
      {
        "heading": "How do you confirm the cleanup worked?",
        "text": "Open the cleaned file in a viewer and check its document properties, which should show empty or generic values where the originals appeared. Compare the page count and a few pages visually against the original, since the operation should not change page content. If a property still shows a value, the file may hold that information in a place this operation does not reach, so do not rely on the result alone for sensitive files."
      },
      {
        "heading": "What does metadata removal not protect?",
        "text": "Metadata cleanup does not remove text, images or annotations that sit on the pages, so a name written inside a document stays visible. It is not document redaction, and it does not remove content inside the pages themselves. Also remember that the file name, the place you send it and any email headers can reveal information outside the PDF itself. Review the content as well as the properties before you share."
      }
    ],
    "faqs": [
      [
        "Is metadata removal the same as redaction?",
        "No. Redaction removes or hides sensitive content on the pages, while this operation clears descriptive properties such as author and title. Text, images and annotations inside the pages are left as they were, so review the content separately."
      ],
      [
        "Will the visible pages change?",
        "The page content should look the same, because the operation targets document information and XMP metadata rather than the drawing on each page. Check a few pages after processing, especially if the file has form fields or annotations, to be sure nothing unexpected changed."
      ],
      [
        "Do I need to remove metadata before sharing?",
        "It depends on the file and its audience. Metadata can reveal authors, software and dates, so cleaning a copy before publishing or sending it outside your organization is a sensible precaution. Keep the original in case you need its properties later."
      ]
    ]
  },
  "crop-pdf": {
    "answer": "Cropping a PDF means trimming what readers see by setting visible margins in PDF points on each page. This crop pdf tool does that in your browser and changes the visible page box, while content outside that box stays in the file. Choose a supported file, enter the margin values, process the document and download the result. Keep and review the original, since hidden content remains.",
    "aiSummary": "Describes a browser-based way to reduce the visible area of PDF pages by setting margins in points. The method changes the page box that readers display, not the content stored behind it. Main limitation: anything outside the visible box still exists in the file and can be found by tools that read the whole file.",
    "shortKeyword": "crop pdf",
    "longKeywords": [
      "how to crop a PDF page",
      "setting visible margins in PDF points",
      "trim the margins of a PDF"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When should you trim the margins of a PDF?",
        "text": "Cropping helps when scanned pages have uneven borders, when a page carries a printed header you want hidden from view, or when a document needs a tighter layout before printing or viewing on a small screen. Because margins are entered in PDF points, you can set the same trim on every page so the layout stays consistent. Preview the result on several pages, including ones with different content, before you accept a trim that works for one page only."
      },
      {
        "heading": "How do you choose the margin values?",
        "text": "Start with a small trim and check the output carefully, since points are a fixed unit and large values can cut into text. Look at the edges of pages with dense content, such as tables or footnotes, because a margin that suits a plain page may clip them. Keep a record of the values you used, so the same setting can be reapplied to other files that share the same page layout."
      },
      {
        "heading": "What does cropping not change?",
        "text": "Cropping changes the visible page box, so the file still contains everything that was outside the new margins. Anyone who opens the file with a tool that shows full page boundaries may see the removed area again. Cropping also does not remove text, images or metadata, and it should not be treated as redaction for sensitive material. Review the cropped pages carefully before sharing. Keep the original file so that you can redo the trim if the margins need adjusting."
      }
    ],
    "faqs": [
      [
        "How to crop a PDF page?",
        "Open the supported file, enter the margin values in PDF points, and process the document. Download the result, then open it in a viewer to confirm that the trim sits where you expected on every page."
      ],
      [
        "Does cropping delete the hidden content?",
        "No. Cropping changes the visible page box, while the removed areas stay in the file. For a file that must not show that material, cropping alone is not enough, so check the output in a viewer that displays full page boundaries."
      ],
      [
        "Can cropping fix a scanned page with uneven edges?",
        "It can trim dark or uneven borders if the margin values are set to cover them. Choose values after looking at several pages, since scans often vary, and confirm that the trim does not clip any text near the edges."
      ]
    ]
  },
  "resize-pdf-pages": {
    "answer": "Resizing PDF pages means scaling each page so it sits inside a standard sheet without distorting its proportions. This resize pdf pages tool can fit pages to Letter sheets or A4 in your browser, keeping the aspect ratio of every page. Choose a supported file, pick the target sheet, process the document and download the result. Keep and review the original to compare page sizes.",
    "aiSummary": "Describes a browser-based method that scales each PDF page to fit inside an A4 or Letter sheet while preserving its proportions. Pages are fitted rather than stretched, so the layout is not distorted. Main limitation: pages that are much larger or smaller than the target may appear with empty margins or reduced text.",
    "shortKeyword": "resize pdf pages",
    "longKeywords": [
      "how to fit PDF pages to A4",
      "keep aspect ratio when resizing PDF",
      "fit pages to Letter sheets"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to fit PDF pages to A4 or Letter?",
        "text": "Documents assembled from mixed sources often contain pages of different sizes, which can print inconsistently or look uneven in a binder. Fitting them onto one standard sheet gives a uniform result for printing, emailing or archiving. A4 is the usual choice for metric-paper regions, while Letter suits North American office printers, so match the sheet to the printer tray you actually use. Check the paper loaded in the printer before you print a full batch."
      },
      {
        "heading": "How should you check the fitted pages?",
        "text": "Open the output and compare a page of known size with its original, looking at whether the content sits centered and fully visible. Because the aspect ratio is kept, a wide page shows larger top and bottom margins, and a tall page shows larger side margins. Check small text in particular, since a reduced page can be hard to read when printed. Repeat the check on one page from each source type so mixed inputs are covered."
      },
      {
        "heading": "What are the limits of fitting pages to a sheet?",
        "text": "Fitting does not crop or rearrange content, so a page with edge-to-edge artwork may still look crowded even though nothing is cut off. Pages that differ widely from the target shape will leave empty space, which can look odd in a booklet or binder. Check that scale-sensitive items such as forms still read correctly after resizing, since small labels and fine lines shrink with the page. Keep the original for comparison."
      }
    ],
    "faqs": [
      [
        "Does it keep aspect ratio when resizing PDF pages?",
        "Yes. Pages are scaled uniformly, so their proportions are kept rather than stretched. Expect empty space on the sheet when a page's shape differs from A4 or Letter, and check that the fitted content is still legible."
      ],
      [
        "Which sheet should I choose, A4 or Letter?",
        "Pick the size your printer and audience use. A4 is common for documents in metric-paper regions, while Letter is standard for many North American office printers. If you are unsure, test one page on the printer before processing a long file."
      ],
      [
        "Will small text become hard to read?",
        "It can. Shrinking a large page to fit a smaller sheet reduces everything on it, including small type. Check the output at the size you will print or view, and keep the original if the text needs to stay at full size."
      ]
    ]
  },
  "n-up-pdf": {
    "answer": "N-up PDF means printing several source pages on one sheet, so two or four pages appear side by side on each landscape page. This n-up pdf tool arranges them in your browser, which suits handouts and drafts. Choose a supported file, pick the number of pages per sheet, process the document and download the result. Keep and review the original, and check that small text still reads well.",
    "aiSummary": "Describes an n-up pdf layout for handouts that places two or four pages on each landscape sheet of a PDF. Each source page is reduced to fit its cell, which can save paper for review copies. Main limitation: with four pages per sheet, text can become very small, so check legibility before printing.",
    "shortKeyword": "n-up pdf",
    "longKeywords": [
      "how to print multiple pages per sheet",
      "two or four pages on each sheet",
      "n-up pdf layout for handouts"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What is N-up layout used for?",
        "text": "N-up layout helps when a long document needs to be reviewed or handed out in fewer sheets. Placing two or four pages on each landscape sheet gives a compact overview, which suits drafts, proofs or study notes. Each source page is reduced to fit its cell, so the overall look is smaller than the original. Because the output is a new arrangement, it is most useful for reading and distribution rather than for editing the content."
      },
      {
        "heading": "Should you use two or four pages on each sheet?",
        "text": "Two pages per sheet gives larger text and is easier to read, while four pages per sheet suits quick overviews where small type is acceptable. Print a single sheet first to judge readability at your chosen scale. If the source pages contain fine detail such as tables or charts, prefer two per sheet so those details remain legible. Compare both options on one sample page before committing to a full run."
      },
      {
        "heading": "What are the common mistakes with N-up output?",
        "text": "A common mistake is printing the whole output without checking the scale, which can make headers and small labels unreadable. Another is treating the output as a substitute for the original. It is a new arrangement, so keep the source file for edits and corrections. Also check the orientation of each sheet in the printer dialog, since a portrait setting can crop or shrink the landscape layout unexpectedly. Run a test sheet to confirm."
      }
    ],
    "faqs": [
      [
        "How to print multiple pages per sheet?",
        "Choose the supported file, select two or four pages per sheet, and process the document. Download the output and print one sheet first to confirm the scale and orientation. Set the printer to landscape and match the paper size used for the sheets."
      ],
      [
        "Does N-up change the page content?",
        "It reduces each source page so that it fits its cell on the new sheet, but the text and images of each page are kept. The layout is a new document, so review the output for legibility and check that no page has been clipped."
      ],
      [
        "Can I use N-up for a booklet?",
        "This tool arranges pages as an N-up sheet, not as a folded booklet. For booklet order, use the separate booklet arrangement, which pads to a multiple of four pages and is meant for duplex printing."
      ]
    ]
  },
  "pdf-booklet": {
    "answer": "A PDF booklet is a document whose pages are reordered so folded printed sheets read in sequence. This pdf booklet tool helps arrange pages for folded booklet printing in your browser, padding the document to a multiple of four pages. Choose a supported file, process it and download the result. Print duplex, flipping on the short edge, and test a small batch before printing a long run.",
    "aiSummary": "Explains how to reorder pdf pages for duplex booklet output, placing them in a folded, left-to-right sequence in the browser. The document is padded to a multiple of four pages so every sheet is full. Main limitation: the printer must flip on the short edge, so its setup decides whether the result works.",
    "shortKeyword": "pdf booklet",
    "longKeywords": [
      "how to make a booklet from PDF",
      "arrange pages for folded booklet printing",
      "pdf pages for duplex booklet"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why arrange pages for folded booklet printing?",
        "text": "A booklet layout lets you print a document on sheets that are folded into a small book, which suits brochures, programs, zines and study packets. Each folded sheet carries four pages, so the arrangement puts pages in an order that reads correctly after folding and stapling. The layout is useful when a finished piece should feel like a small bound object rather than a stack of loose pages. Choose it when the goal is a compact, readable result."
      },
      {
        "heading": "How do you print and fold the result?",
        "text": "Print the output duplex and flip on the short edge, so the back of each sheet lines up with its front. Fold the stack in half at the center and staple along the fold if the booklet needs binding. Test a small batch first, because printer driver settings differ and a wrong flip direction scrambles every spread. Check the first and last spread to confirm the page order matches your plan."
      },
      {
        "heading": "What limits should you check before printing a booklet?",
        "text": "Confirm the page count after padding, since blank pages are added to reach a multiple of four and will print as blank sheets. Single-sided printers need manual reloading for the second side, so plan that step in advance. Also check that margins near the fold are wide enough, because content placed too close to the center can be lost in the crease. Keep a copy of the output so you can compare the sheets later."
      }
    ],
    "faqs": [
      [
        "How to make a booklet from PDF?",
        "Choose the supported file, process it to get the left-to-right folded order, and download the result. Check that the output page count is a multiple of four, then print duplex on the short edge, using one test sheet first."
      ],
      [
        "Why are blank pages added to my booklet?",
        "The layout needs a multiple of four pages so that every folded sheet is full. If the source has a page count that is not a multiple of four, blank pages are added to reach that count. They may print, so check the final spread before using the file."
      ],
      [
        "Can I print a booklet on a single-sided printer?",
        "Yes, but only by printing one side, reloading the stack, and printing the other side in the correct orientation. Test the reload direction on a few sheets first, because a mistake is easy to make and wastes paper."
      ]
    ]
  },
  "alternate-merge-pdf": {
    "answer": "An alternate merge PDF combines two PDF files by taking one page from the first file, then one page from the second, and repeating. Any pages left over from the longer file are appended at the end. Choose the two files in front and back order to build a single document.",
    "aiSummary": "Alternate Merge PDF can combine two PDFs in alternating order, taking one page from each file in turn. Any extra pages from the longer file are added at the end. The method runs in the browser, but it only reorders and joins pages. It cannot repair page content or fix mismatched page sizes.",
    "shortKeyword": "alternate merge pdf",
    "longKeywords": [
      "how to interleave two PDF files",
      "merge scanned front and back pages",
      "combine two PDFs in alternating order"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to interleave two PDF files in order?",
        "text": "Use this when you have two PDFs that should alternate page by page, such as a set of fronts and a set of backs that were scanned separately. The tool takes one page from the first file, then one from the second, and keeps repeating that pattern. Because the output is built from the page order you choose, check which file goes first before you start. The result is a new document you download."
      },
      {
        "heading": "What order does the merged file follow?",
        "text": "The merged file starts with page one of the first PDF, followed by page one of the second PDF. The pattern continues page by page until one file has no pages left. If the first file is longer, its extra pages are placed at the end in their original order. If the second file is longer, the same rule applies to its extra pages. Check the page counts of both inputs so you can predict where the leftover pages will land in the final document."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "The most common mistake is swapping the two files, which reverses the whole sequence. Confirm the front and back order before processing, and then open the downloaded result to scan a few pages. The tool does not reorder pages within a single file, and it does not repair damaged pages or fix mismatched page sizes. If you need a different order, reorder the pages first in a separate step and then merge again."
      }
    ],
    "faqs": [
      [
        "How do I pick the right file order?",
        "Put the file whose pages should come first in the first slot, and the file whose pages should follow in the second slot. Check each file's page order before processing. If the result looks reversed, run the tool again with the two inputs swapped."
      ],
      [
        "Can I merge scanned front and back pages?",
        "Yes, that is a common use. Pick the scan of the fronts as the first file and the scan of the backs as the second. Make sure the backs are in the order that matches the fronts, because the tool does not reverse them for you. Then download the merged result."
      ],
      [
        "Is there a limit on how many files I can add?",
        "This tool takes exactly two PDF files for each run, so it cannot alternate three or more at once. Use a separate merge tool first if you need to join more files, then run this tool on the two results you want to interleave."
      ]
    ]
  },
  "annotate-pdf": {
    "answer": "Add text to PDF means placing a new text note on one or more chosen pages at a position you pick. The added text is an annotation layered on the page, so existing text is not rewritten. The built-in font supports Latin characters, so other scripts may not display. Choose the file, the pages, and the position, then download the result.",
    "aiSummary": "Add Text to PDF places a new text annotation on chosen pages at a position the user sets. It can annotate PDF without editing existing text, since the note is layered over the page. The method uses a built-in font, so the main limit is that only Latin characters are supported.",
    "shortKeyword": "add text to pdf",
    "longKeywords": [
      "how to add a note to a PDF page",
      "place text on specific PDF pages",
      "annotate PDF without editing existing text"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to add a note to a PDF page?",
        "text": "Use this tool when you want to mark up a document without changing what is already printed on it. Typical uses include adding a reviewer comment, a label, a reference number, or a short instruction at a fixed spot. Select the pages that need the note, type the text, and pick where it should appear. The result arrives as a downloaded file, so the note is part of that copy. Check the placement on the page before you download, because a fixed position is easier to get right at the start."
      },
      {
        "heading": "How should I choose the position and pages?",
        "text": "Choose a position that falls in clear space, because the added text sits on top of anything already printed there. When you apply one note to several pages, confirm that the same spot works on each page, since layouts often differ from page to page. Keep the wording short so that it fits within the available space on the page. Open the downloaded file and scroll through every marked page to confirm the note landed where you expected."
      },
      {
        "heading": "What are the common mistakes and limits?",
        "text": "A frequent mistake is assuming the tool rewrites existing words. It only adds a new text layer, so a typo in the original stays visible and cannot be corrected here. Another limit is the built-in font, which supports Latin text, so characters from other writing systems may not display correctly. Avoid very long paragraphs, which can run off the page edge. Finally, remember that the note sits above the page content, so a dark background may hide dark text."
      }
    ],
    "faqs": [
      [
        "Can I place text on specific PDF pages?",
        "Yes. Select only the pages that should receive the note, then set one position for them. Pages you leave out keep their original look. Confirm the page numbers before processing, since a wrong selection is easy to miss."
      ],
      [
        "Can the note be used to correct a typo?",
        "Not directly. The tool adds a new text layer and does not remove or replace what is already printed. To hide an error, you could place a note over it, but the original text remains underneath and may still be visible."
      ],
      [
        "Which languages does the built-in font handle?",
        "The built-in font is designed for Latin text, so languages that use other scripts may not render correctly. Keep the note in Latin characters, or check the downloaded file to confirm the result before sharing it."
      ]
    ]
  },
  "pdf-to-json": {
    "answer": "PDF to JSON is a method that reads the text layer of a PDF and exports each page as structured JSON. The output includes the text along with coordinates and page dimensions, so software can locate each piece of text on the page. It works on existing text only, so scanned pages need OCR before export. Choose a file, process it, and download the JSON.",
    "aiSummary": "PDF to JSON reads the existing text layer of a PDF and writes page text, coordinates and page dimensions as JSON. It can export PDF text with positions for parsing by other programs. It does not run text recognition, so the main limitation is that scanned pages with no text layer need OCR first.",
    "shortKeyword": "pdf to json",
    "longKeywords": [
      "how to export PDF text as JSON",
      "extract text coordinates from PDF pages",
      "export PDF text with positions for parsing"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to export PDF text as JSON?",
        "text": "Use this when a program needs the words on a PDF along with their positions, rather than a plain text copy. The export keeps each page as its own block, so you can match text to a location on that page. Typical uses include feeding document content into a data pipeline, checking which words appear where, or building a search index. Select your file, run the process, and download the JSON for use in your own code."
      },
      {
        "heading": "What do the coordinates and dimensions mean?",
        "text": "Coordinates describe where each piece of text sits on its page, usually measured from a corner of the page. Dimensions give the width and height of the page, which lets you convert positions into relative values if you need them. Because the export reflects the stored text layer, the order of items in the JSON may not match the order you read them visually. Compare a few known words with the original page before relying on positions in production code."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "The biggest limit is that the tool reads only the existing text layer. A scanned page usually contains an image of text rather than text itself, so it returns little or nothing until OCR has been applied. Another common mistake is building code on one sample without checking a few other pages first. Also check that you exported the right file, since a long export can be hard to review by eye."
      }
    ],
    "faqs": [
      [
        "Can I extract text coordinates from PDF pages?",
        "Yes, as long as the PDF has a text layer. The export lists each text item with its position and the size of its page. Scanned images without text will not produce usable content, so run OCR first if needed."
      ],
      [
        "Is the output useful for building a search index?",
        "It can be, because the text is paired with positions and page numbers. A search index usually needs the words and their page location, both of which the export provides. Check that the extracted words match the original spelling and spacing on a sample page."
      ],
      [
        "Why is some text missing from the export?",
        "Text missing from the export usually means the page is an image or the text is stored as outlines. Only the existing text layer is read, so nothing is recognized from pixels. Run OCR on the file, then export it again to see if the missing text appears."
      ]
    ]
  },
  "future-value-calculator": {
    "answer": "A future value calculator finds how much a lump sum will be worth after growing at a steady annual rate. It multiplies the present amount by one plus the rate, raised to the number of years. This compound growth means interest builds on earlier interest, so the total rises faster over longer periods. The result is nominal and does not adjust for inflation.",
    "aiSummary": "Future value calculator estimates what a single sum will grow to at a fixed annual rate over a set number of years. It models compound growth of a single amount, applying the rate to each year's new balance. The main limitation is that it assumes a steady rate and ignores inflation taxes and fees.",
    "shortKeyword": "future value calculator",
    "longKeywords": [
      "how to grow a lump sum",
      "compound growth of a single amount",
      "projected value of savings over years"
    ],
    "exampleInputs": {
      "present": "10000",
      "rate": "7",
      "years": "20"
    },
    "sections": [
      {
        "heading": "How to grow a lump sum over time?",
        "text": "Use this when you have an amount today and want to see its value at a later date under a steady growth assumption. Common cases include projecting a savings balance, comparing what a cash gift could become if invested, or comparing two growth rates side by side. Enter the present amount, the annual rate, and the number of years. The output shows the projected total, which you can use as a starting point for planning conversations or further study."
      },
      {
        "heading": "How should I read the projected total?",
        "text": "The total is the amount the present sum would reach if the rate held every year. Compare it with the starting figure to see the total growth over the period, not just the yearly gain. A higher rate or a longer period raises the result sharply because each year's growth is added to the balance. Treat the result as an educational estimate and one scenario among several, not professional advice or a promise of what will happen."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "A frequent mistake is treating a nominal result as spending power. The calculator does not subtract inflation, so a future total can look large while buying less. Another mistake is using an unrealistic rate for a long period, since small changes compound into big differences. Fees, taxes, and irregular deposits are also outside this single lump-sum view, so add them separately if they matter to your plan. Check the inputs twice before you rely on the output."
      }
    ],
    "faqs": [
      [
        "Can I use this for the projected value of savings over years?",
        "Yes, if you assume one lump sum and a steady rate. It is a simple projection, so it does not model regular contributions. For a stream of payments, the annuity calculator on this site is a better fit."
      ],
      [
        "How do I choose a realistic growth rate?",
        "Base the rate on a return you can justify from historical data or a stated plan, and test a lower and a higher value to see the range. The calculator cannot judge which rate is likely, so the choice is yours. Consider how sensitive the result is to small changes."
      ],
      [
        "Is future value the same as compound interest?",
        "They are closely related. Compound interest is the process of earning returns on earlier returns, and future value is the result of applying that process to a starting sum over a set period. The calculator shows the end result of that growth."
      ]
    ]
  },
  "present-value-calculator": {
    "answer": "A present value calculator works out how much a future amount is worth today, given a discount rate and a number of years. It divides the future amount by one plus the rate, raised to the number of years. The discount rate represents the return you could earn elsewhere, so money received later is worth less now. Results are estimates, not professional financial advice.",
    "aiSummary": "Present value calculator estimates the worth today of a future sum by discounting it at a chosen rate over a set number of years. Use it to see how to find today's value of a payment that arrives later. The main limitation is that the result depends on the discount rate.",
    "shortKeyword": "present value calculator",
    "longKeywords": [
      "discount a future payment to today",
      "value of money received later",
      "how to find today's value of a payment"
    ],
    "exampleInputs": {
      "future": "50000",
      "rate": "7",
      "years": "10"
    },
    "sections": [
      {
        "heading": "How to discount a future payment to today?",
        "text": "Use this when a payment, bond, or other future amount must be compared with money you have now. Discounting moves the amount backward in time, so a larger future number may be worth less than a smaller sum available immediately. Enter the future amount, the discount rate, and the years until payment. The result is the amount that, at that rate, would equal the future sum today. Read the output as a planning figure rather than a guarantee."
      },
      {
        "heading": "How should I pick the discount rate?",
        "text": "The discount rate stands for the return you could earn on the same money elsewhere over the same period. A higher rate reduces today's value more sharply, and a lower rate keeps it closer to the face amount. Many people test several rates to see how much the answer depends on that choice. Use a rate that reflects a realistic alternative for your situation, and state it clearly whenever you share the result with someone else."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "A common mistake is mixing units, such as entering a yearly rate with a monthly period. Another is forgetting that the discount rate is an assumption, not a measured fact, so results can shift a lot with small changes. The calculator also works from a single amount and does not account for fees, taxes, or uncertain payment timing. Treat the output as an educational estimate, and consult a qualified professional before making financial decisions."
      }
    ],
    "faqs": [
      [
        "Does the value of money received later depend on the rate?",
        "Yes. A higher discount rate lowers today's value, and a lower rate raises it, for the same future amount and timing. Changing the number of years also matters, because the discount compounds over each year that passes before payment."
      ],
      [
        "Can I compare two offers with different payment dates?",
        "Yes, that is a typical use. Convert each future amount to today's value using the same rate, then compare the two results. Make sure both offers use the same discount rate, since a different rate can reverse which offer looks better."
      ],
      [
        "What if the payment is uncertain?",
        "The calculator assumes the amount arrives on schedule. If a payment might be late, smaller, or never paid, the simple result overstates its value. You can test a lower future amount or a longer delay to see how sensitive the answer is."
      ]
    ]
  },
  "annuity-calculator": {
    "answer": "An annuity calculator works out the future value and present value of a series of equal payments made at regular intervals. Future value adds up each payment compounded to the end, while present value discounts each payment back to today. Both use standard formulas with monthly compounding, which is the basis of the results shown.",
    "aiSummary": "Annuity calculator estimates the future value of regular monthly payments and their present value using monthly compounding. The method sums each payment compounded to the end, or discounts each back to today. The main limitation is that it assumes equal payments and a fixed rate, so irregular contributions need separate modeling.",
    "shortKeyword": "annuity calculator",
    "longKeywords": [
      "how to plan a series of payments",
      "present value of annuity payments",
      "future value of regular monthly payments"
    ],
    "exampleInputs": {
      "payment": "500",
      "rate": "5",
      "years": "20"
    },
    "sections": [
      {
        "heading": "How to plan a series of payments?",
        "text": "Use this when you contribute or receive the same amount at each interval and want to know the total or the current worth of that stream. Savings plans, pension contributions, and loan schedules all follow this pattern. Enter the regular payment, the annual rate, and the number of years. The results let you compare saving toward a goal with paying a fixed amount over time, as long as the payment schedule stays the same."
      },
      {
        "heading": "How should I read the two results?",
        "text": "Future value shows what the payments add up to by the end of the period, including growth on each deposit. Present value shows what that same stream of payments is worth today, which is smaller because later payments are discounted more heavily. Read them together, since the gap between the two shows how much time and rate matter for the stream. Check that both numbers use the same payment timing and rate before comparing them."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "Many people mix up an annuity in this sense with an insurance product. This calculator covers only the math of equal payments, not contract terms, guarantees, or fees. Another mistake is entering a yearly payment in the monthly field, which changes the result by a large factor. Keep the rate and payment inputs consistent with each other before reading the output. Results are educational estimates and not professional financial advice, so confirm important decisions with a qualified professional."
      }
    ],
    "faqs": [
      [
        "Can I find the present value of annuity payments here?",
        "Yes. The calculator shows both the present value and the future value, so you can compare a stream of payments with a single lump sum. Enter the regular payment, rate, and years to see each result."
      ],
      [
        "Does the timing of payments change the result?",
        "Yes. Payments made earlier in each period compound longer, so an earlier schedule usually produces a larger future value than a later one, all else equal."
      ],
      [
        "Is an annuity calculator the same as a loan calculator?",
        "They use related math but answer different questions. A loan calculator usually solves for a payment that clears a debt, while this tool projects the value of a series of payments over time. Both rely on the same compounding idea."
      ]
    ]
  },
  "commission-calculator": {
    "answer": "A commission calculator works out the pay earned from a percentage of sales, then adds any base salary to show total pay. Commission equals total sales multiplied by the commission rate. The two parts are kept separate, so you can see how much comes from sales and how much from the fixed base. Results are estimates before any deductions.",
    "aiSummary": "Commission calculator estimates earnings from a percentage of total sales, then adds a fixed base pay. It shows commission on sales and base salary as separate lines for easy checking. The main limitation is that it does not model tiers, caps, bonuses, or deductions, so real pay may differ.",
    "shortKeyword": "commission calculator",
    "longKeywords": [
      "how to calculate sales commission pay",
      "total pay with base salary plus commission",
      "commission on sales and base salary"
    ],
    "exampleInputs": {
      "sales": "50000",
      "rate": "8",
      "base": "2000"
    },
    "sections": [
      {
        "heading": "How to calculate sales commission pay?",
        "text": "Use this when your earnings depend partly on sales you close and partly on a fixed base. Enter total sales for the period, the commission rate, and any base salary. The calculator multiplies sales by the rate to get commission, then adds the base to give total pay. Keeping the two numbers separate helps you see which part of your income moves with performance and which part stays steady from period to period."
      },
      {
        "heading": "How should I interpret the commission figure?",
        "text": "The commission figure is the rate applied to total sales, so it rises in direct proportion when sales rise. A small change in the rate can move the result noticeably, which is why it helps to test a few values. Compare commission-only pay with base plus commission before accepting a role, since the mix changes how much risk your income carries. Keep in mind that the output is before taxes and other deductions, so take-home pay will be lower."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "A common mistake is entering the rate as a whole number when it should be a percentage, or the reverse, which changes the result dramatically. Check whether the commission applies to gross sales or to net sales after returns, since the calculator uses the number you type. Also remember that many plans have thresholds, caps, or different rates for different products, and this simple model does not capture those rules. Confirm the actual plan terms with your employer or a qualified professional."
      }
    ],
    "faqs": [
      [
        "Can I see total pay with base salary plus commission?",
        "Yes. The calculator lists commission and base pay as separate lines, then shows their sum as total pay. Changing either input updates the total, which makes it easy to compare scenarios."
      ],
      [
        "Is a higher commission rate always better?",
        "Not necessarily. A higher rate helps only when sales volume stays strong, and it does not change the base pay. Look at the full package, including the base, the expected sales, and any conditions attached to the rate."
      ],
      [
        "How do I test different sales targets?",
        "Enter your expected sales as one value, then change it to match a lower and a higher target. Compare the totals side by side to see how sensitive your pay is to performance. Keep the rate and base fixed during the test so the only change is the sales figure."
      ]
    ]
  },
  "bac-calculator": {
    "answer": "A BAC calculator estimates blood alcohol concentration from the number of standard drinks, body weight, sex, and hours since the first drink. It uses the Widmark formula, which divides alcohol grams by body water grams and subtracts a small amount per hour for metabolism. The result is an approximation only. It must never be used to decide whether it is safe to drive.",
    "aiSummary": "BAC calculator estimates blood alcohol from drinks, body weight, sex and time using the Widmark approach. It shows how weight and time shape blood alcohol in a simple model. The main limitation is that individual factors such as food, medication and tolerance are not modeled, so the number is only approximate.",
    "shortKeyword": "bac calculator",
    "longKeywords": [
      "estimate blood alcohol from standard drinks",
      "how many drinks affect blood alcohol",
      "how weight and time shape blood alcohol"
    ],
    "exampleInputs": {
      "sex": "female",
      "weight": "70",
      "unit": "kg",
      "drinks": "3",
      "hours": "2"
    },
    "sections": [
      {
        "heading": "How to estimate blood alcohol from standard drinks?",
        "text": "The calculator is meant for learning how the Widmark approach works. It takes the number of standard drinks, converts that into grams of alcohol, and then adjusts for body water based on weight and sex. Time is subtracted through a steady hourly reduction. Because so many personal factors vary, the number is a rough model of a single average body, not a measurement of your actual level. Treat any output as a teaching aid."
      },
      {
        "heading": "How should I read the drinks and hours inputs?",
        "text": "Enter drinks as standard drinks rather than glasses or pours, because pour sizes vary widely. The hours field measures time since the first drink, so a long gap reduces the estimate while more drinks increase it. Weight and sex change the body water assumption, which is why the same drinks can produce different numbers. Use the inputs as a way to see the direction of each factor, not as a precise reading for any particular night."
      },
      {
        "heading": "What are the common mistakes and limits?",
        "text": "The most serious mistake is treating the result as permission to drive or as proof that you are fine. Alcohol affects people differently because of food, medication, health, fatigue, and tolerance, none of which the model captures. Another error is entering weight in the wrong unit, so confirm the kg or lb setting first. Finally, a result of zero is an estimate, not a guarantee, and it does not reflect the effects you may feel. If you are unsure, do not drive. This is an educational estimate, not professional advice."
      }
    ],
    "faqs": [
      [
        "How many drinks affect blood alcohol over a few hours?",
        "The estimate rises with each standard drink and falls over time as the model subtracts metabolism. Because the rate is an approximation, the same drinks can produce different results in different people. Use this as an educational estimate, not professional advice."
      ],
      [
        "Does body weight change the estimate?",
        "Yes. Body weight and sex change the assumed amount of body water, which shifts the result. Heavier body weight generally spreads the alcohol across more water, so the estimate tends to be lower for the same drinks. Choose the correct unit before reading the output."
      ],
      [
        "What does a zero result mean here?",
        "A zero result means the model estimates alcohol has cleared under its assumed rates. It does not confirm that you are sober or fit to act. Impairment can differ from what any number suggests, so never use it to decide about driving."
      ]
    ]
  },
  "heart-rate-zone-calculator": {
    "answer": "A heart rate zone calculator estimates training zones from your age and resting heart rate. Maximum heart rate comes from the Tanaka formula, then the Karvonen method uses heart rate reserve, the gap between maximum and resting, to set five zones from light recovery to maximum effort. The output is a training guide only and not medical advice.",
    "aiSummary": "Heart rate zone calculator uses age and resting heart rate to estimate five intensity bands. The output gives a target heart rate for cardio training sessions. It applies the Tanaka maximum and the Karvonen reserve method. The main limitation is that age-based formulas are population averages, so individual maximums can differ noticeably.",
    "shortKeyword": "heart rate zone calculator",
    "longKeywords": [
      "calculate five training zones from age",
      "how to find your heart rate zones",
      "target heart rate for cardio training"
    ],
    "exampleInputs": {
      "age": "30",
      "resting": "60"
    },
    "sections": [
      {
        "heading": "How to find your heart rate zones?",
        "text": "Use this when you want structure for cardio sessions rather than guessing how hard to push. The calculator first estimates your maximum heart rate from age, then removes your resting rate to find the reserve. Each zone is a percentage band of that reserve, added back onto resting heart rate. Lower zones suit recovery and base endurance, while higher zones target speed and near-maximum efforts. Enter your age and resting heart rate, then compare the five bands."
      },
      {
        "heading": "What do the five zones tell me?",
        "text": "The zones describe effort levels, from easy recovery pace through steady aerobic work to hard intervals close to your maximum. Heart rate is only one signal, so pair it with how you feel and how talk feels during exercise. A zone shows a target range, not a requirement. Many plans spend most time in easier zones and reserve the top zones for short, deliberate efforts. If the numbers look unfamiliar, start with lower zones and build gradually."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "The biggest limit is that age-based maximum formulas are averages, so your true maximum may be higher or lower. Resting heart rate should be measured under calm, consistent conditions, since a value taken after stress or caffeine skews every zone. Avoid treating the zones as medical thresholds; anyone with a heart condition, medication effects, or symptoms should seek advice from a qualified professional before intense training. This tool is an educational estimate, not medical advice."
      }
    ],
    "faqs": [
      [
        "What do I need to calculate five training zones from age?",
        "You need your age and your resting heart rate. Measure it when you are calm and rested for a more consistent value. The calculator then applies the same steps to produce all five zones."
      ],
      [
        "Why might my real maximum differ from the formula?",
        "Age-based formulas are averages drawn from groups of people, so any one person can sit above or below them. Fitness, genetics, and recent illness also influence how high your heart rate climbs. Use the zones as a starting point and adjust based on how sessions feel."
      ],
      [
        "How should I use the zones across a training week?",
        "Mix easy sessions with a smaller number of harder efforts rather than pushing every workout. Place the most intense work on separate days so you can recover. Adjust the balance as your fitness and schedule change."
      ]
    ]
  },
  "water-intake-calculator": {
    "answer": "A water intake calculator estimates a daily hydration target from body weight and exercise time. It uses a common baseline of about 35 ml per kilogram of body weight, then adds extra for exercise. Results appear in liters, cups, and fluid ounces. The number is a general starting point, not a medical requirement, since heat, illness, and pregnancy change needs.",
    "aiSummary": "Water intake calculator gives a starting hydration figure based on body weight, adding volume for exercise time. It helps estimate daily fluid needs from weight in liters, cups, or ounces. The main limitation is that a baseline cannot account for heat, altitude, illness, or pregnancy, which all raise needs.",
    "shortKeyword": "water intake calculator",
    "longKeywords": [
      "how much water to drink daily",
      "daily water target from body weight",
      "estimate daily fluid needs from weight"
    ],
    "exampleInputs": {
      "weight": "70",
      "unit": "kg",
      "activity": "30"
    },
    "sections": [
      {
        "heading": "How much water to drink daily?",
        "text": "Use this to get a starting figure before you think about specific drinks or foods. The calculator takes your body weight, converts it to kilograms if needed, and applies a baseline per kilogram. Exercise minutes add a further allowance on top. Results are shown in liters, cups, and fluid ounces, so you can use the unit that matches your measuring tools. Treat the total as a planning target that you adjust with experience."
      },
      {
        "heading": "How should I read the liters, cups, and ounces?",
        "text": "The three units show the same total in different measures, so pick the one that is easiest to track during the day. A liter bottle is a convenient way to track progress against the target, while cups suit people who count servings. Fluid ounces are common in some regions, and converting is mainly a matter of matching the scale on your bottle. Remember that the total is a daily figure, so spread intake through the day rather than drinking it all at once."
      },
      {
        "heading": "What common mistakes or limits should I check?",
        "text": "A common mistake is treating one number as a strict rule. Needs shift with heat, altitude, illness, and pregnancy, and the baseline does not account for those changes. Another error is entering the wrong weight unit, so confirm kilograms or pounds before reading the output. Food also supplies water, so the figure is a total for all intake rather than plain drinks only. This is an educational estimate, not medical advice, so ask a clinician about fluid limits if you have a health condition."
      }
    ],
    "faqs": [
      [
        "What is a daily water target from body weight?",
        "It is a starting estimate that scales with body weight, using a baseline of about 35 ml for each kilogram. Exercise minutes then add a further amount. Treat the result as a planning figure rather than a fixed prescription."
      ],
      [
        "Do hot weather and altitude raise my needs?",
        "They can. Heat and altitude increase fluid loss in many people, which is why the baseline is only a starting point. Pay attention to thirst, urine color, and how you feel, and adjust your intake to match the conditions around you."
      ],
      [
        "Should I drink the whole target in one sitting?",
        "No. Spreading fluids across the day is easier on your schedule and makes it simpler to track progress. Drinking a very large volume at once is rarely necessary, and it can be uncomfortable. Sip steadily and adjust with meals and activity."
      ]
    ]
  },
  "protein-intake-calculator": {
    "answer": "A protein calculator estimates how many grams of protein you need per day. It multiplies your body weight by a factor that rises with your goal, from a sedentary baseline to a higher range for building muscle, then gives a range and a per-meal split. The result is an educational estimate based on common sports-nutrition ranges, not individual medical advice.",
    "aiSummary": "This protein calculator takes body weight, unit and training goal, then returns a daily gram range and a protein grams per meal breakdown. It scales intake by goal using common sports-nutrition ranges. Results are estimates; it does not account for illness, kidney conditions or individual needs.",
    "shortKeyword": "protein calculator",
    "longKeywords": [
      "how much protein per day to build muscle",
      "daily protein target by body weight",
      "protein grams per meal breakdown"
    ],
    "exampleInputs": {
      "weight": "70",
      "unit": "kg",
      "goal": "muscle"
    },
    "sections": [
      {
        "heading": "How much protein per day to build muscle?",
        "text": "Pick the Build muscle goal when your main aim is adding lean mass through resistance training. The result then sits toward the upper end of the range, since higher daily intake is commonly used in that setting. Sedentary and general fitness goals use lower figures. Enter your weight, choose kilograms or pounds, and select the goal that matches your training. Treat the number as a starting estimate for planning meals, not a prescription."
      },
      {
        "heading": "What does the daily protein target by body weight mean?",
        "text": "The target is a gram range calculated from your body weight, so heavier people generally get a larger number. Read it as a daily total to aim for across all meals, not a minimum to hit at each sitting. If the range looks high or low for your situation, compare it with your own eating pattern over a couple of weeks. The per-meal split simply divides the total so that each meal carries a meaningful share."
      },
      {
        "heading": "What common mistakes should I avoid with protein targets?",
        "text": "A frequent mistake is treating the estimate as exact, when real needs vary with age, body composition, illness and training load. Another is counting only the protein powder and forgetting whole foods, which often supply most of the day's grams. People also tend to back-load almost everything into dinner. Spreading intake across meals is a simple habit to check against the per-meal breakdown. Consult a registered dietitian or doctor for medical or kidney-related diet questions."
      }
    ],
    "faqs": [
      [
        "Does the unit I choose change the result?",
        "No. The calculator works from your weight in whichever unit you select, so switching between kilograms and pounds should give the same target once the weight is entered correctly. Double-check the number you type, since a typo in weight is a common source of an odd result."
      ],
      [
        "Is protein powder a good way to hit the target?",
        "Protein powder is one convenient way to add grams, but it is not required. Whole foods such as eggs, dairy, fish, legumes and meat provide protein along with other nutrients. Use the tool's total as a guide and fill the gap with the foods you already enjoy, whichever sources you choose."
      ],
      [
        "When should I ask a professional about my protein?",
        "Talk with a doctor or registered dietitian if you have kidney disease, diabetes, pregnancy, an eating disorder history, or take medication that affects diet. A clinician can set targets around your full health picture. This calculator is an educational estimate and cannot assess those conditions."
      ]
    ]
  },
  "bsa-calculator": {
    "answer": "A BSA calculator estimates body surface area, the total skin area of a person in square meters, from height and weight. It applies a formula such as Mosteller's square root of height times weight divided by a constant, or the Du Bois power-law fit. Clinicians use this figure to scale medication doses by body size. Results are an educational estimate.",
    "aiSummary": "Computes body surface area from height and weight using the Mosteller and Du Bois formulas. Mosteller takes a square root of height multiplied by weight, scaled by a fixed constant; Du Bois uses a power-law fit. The values are estimates, and they do not account for body shape beyond these two inputs.",
    "shortKeyword": "bsa calculator",
    "longKeywords": [
      "body surface area from height and weight",
      "compare mosteller and du bois formulas",
      "scale medication doses by body size"
    ],
    "exampleInputs": {
      "height": "172",
      "hUnit": "cm",
      "weight": "70",
      "wUnit": "kg"
    },
    "sections": [
      {
        "heading": "What is body surface area from height and weight used for?",
        "text": "Body surface area is a single figure that puts people of different sizes on a common scale. Clinicians use it when a dose or a physiological measure should be adjusted for how large a person is, rather than for weight alone. The calculator gives you the figure from height and weight so you can see the value for a body size you enter. It is a planning and learning tool, not a basis for any dosing decision."
      },
      {
        "heading": "How do I compare Mosteller and Du Bois formulas?",
        "text": "Both formulas take height and weight and usually return values close to each other for typical adults. Mosteller is a simple square-root expression that is easy to check by hand. Du Bois uses a power-law fit with a different shape. Running both and seeing how close they land is a quick way to gauge how much the formula choice matters for your numbers. Use the formula that the relevant source or protocol names, since mixing methods makes results hard to compare."
      },
      {
        "heading": "What are common mistakes with BSA results?",
        "text": "A frequent mistake is mixing units, such as entering height in inches while the calculator expects centimeters, or weight in pounds without changing the unit selector. Check the unit dropdowns before you read the answer. Another mistake is treating BSA as a diagnosis; it is a size-scaling figure and says nothing about health on its own. Finally, people sometimes assume the result is exact, when rounding and the formula's simplifying assumptions both add uncertainty."
      }
    ],
    "faqs": [
      [
        "Does a larger body always need a larger dose?",
        "Not automatically. Scaling by body surface area is one approach used for certain drugs and measurements, while others follow weight, age or organ function. Whether BSA applies depends on the specific drug, protocol or test, so the prescriber or the official guidance for that treatment decides."
      ],
      [
        "Does the calculator work for every body size?",
        "It applies the same two formulas to whatever height and weight you enter. Very unusual body shapes, such as extreme muscularity or fluid retention, can make a height-and-weight estimate less representative. Treat the output as a standard-size estimate and confirm any clinical use with a professional."
      ],
      [
        "Does this calculator send my measurements anywhere?",
        "No. Processing is local, so the calculation runs in your browser and the values you type stay on your device. Still, check any clinical result with a qualified professional before acting on it."
      ]
    ]
  },
  "waist-to-hip-ratio-calculator": {
    "answer": "A WHR calculator divides your waist circumference by your hip circumference, using the same unit for both. The result is a ratio that indicates how fat is distributed around the body. Risk categories differ for men and women, so the tool applies the matching thresholds. Research links higher ratios with cardiovascular and metabolic risk. Treat the output as an educational estimate.",
    "aiSummary": "Lets you calculate waist to hip ratio at home by dividing waist circumference by hip circumference, then reports a risk category adjusted for male or female sex. The method is a simple ratio of two measurements, which is quick but cannot tell muscle from fat on its own. Treat results as an estimate.",
    "shortKeyword": "WHR calculator",
    "longKeywords": [
      "how to measure waist and hip circumference",
      "body fat distribution and health risk",
      "calculate waist to hip ratio at home"
    ],
    "exampleInputs": {
      "sex": "female",
      "waist": "85",
      "hip": "100"
    },
    "sections": [
      {
        "heading": "How to measure waist and hip circumference for this tool?",
        "text": "Measure waist and hip with the same flexible tape, keeping it level and snug without compressing the skin. The waist point is commonly taken at the narrowest visible part of the torso, while the hip is measured at the widest part of the buttocks. Enter both figures in the same unit, because mixing centimeters and inches gives a meaningless ratio. Measuring at the same time of day, relaxed and standing, makes repeat checks more comparable."
      },
      {
        "heading": "How does body fat distribution and health risk connect?",
        "text": "Where fat sits matters as well as how much there is. Fat stored around the midsection is generally linked with a higher cardiovascular and metabolic risk than fat on the hips and thighs, which is why a ratio can add information beyond overall weight. Two people with the same BMI may have very different ratios. The tool applies the category that fits your sex, because typical distribution patterns differ between men and women."
      },
      {
        "heading": "What are common mistakes with waist to hip ratio results?",
        "text": "A common error is measuring over thick clothing or letting the tape drift to different heights, which shifts the waist figure. Another is comparing your number with a chart meant for the other sex, since the category thresholds are not interchangeable. The ratio also does not capture height, muscle mass or total body fat, so it should sit alongside other information. A single reading is less useful than a repeated measurement taken the same way."
      }
    ],
    "faqs": [
      [
        "Does a high ratio mean I have a medical problem?",
        "Not by itself. A ratio above the category for your sex is a signal worth discussing with a clinician, alongside blood pressure, blood glucose, lipids and family history. The number is one input among several, and it does not diagnose any condition on its own."
      ],
      [
        "Can I use a waist measurement alone instead?",
        "A waist measurement alone is a useful tracking number for many people, since it changes over time with the same tape. It does not account for hip size, which is why the ratio exists. Whichever you track, measure the same way each time and compare trends rather than single readings."
      ],
      [
        "Why does this tool ask for my sex?",
        "The risk categories used for waist-to-hip ratio are set separately for men and women, because typical fat distribution differs between the sexes. Selecting the correct option makes the category meaningful. The sex field affects only which category is applied, not the ratio itself."
      ]
    ]
  },
  "smoking-cost-calculator": {
    "answer": "A smoking cost calculator estimates how much money cigarettes take out of a budget. It works out the daily cost from cigarettes smoked per day, pack size and price per pack, then multiplies that across a month, a year and ten years. The result is a simple projection of spending, not a full measure of the costs of smoking, which can include health expenses.",
    "aiSummary": "Projects the spending on cigarettes over a day, month, year and ten years, using cigarettes per day, pack size and pack price. The method works out the daily share of packs and multiplies by price, then scales it forward. It covers cash spending only, leaving out health costs, lost income and future price changes.",
    "shortKeyword": "smoking cost calculator",
    "longKeywords": [
      "how much does smoking cost per year",
      "cumulative cost of cigarettes over time",
      "save money by quitting smoking"
    ],
    "exampleInputs": {
      "perDay": "5",
      "price": "8",
      "packSize": "20"
    },
    "sections": [
      {
        "heading": "How much does smoking cost per year?",
        "text": "Use the calculator to turn a habit into a number you can see. Enter cigarettes per day, the cigarettes in a pack and the price of one pack. The tool shows a daily figure first, then projects it over a month, a year and ten years. Seeing the annual total is often the most useful step, because small daily amounts feel minor until they are added up across the year. Enter honest figures, since the total is only as reliable as the inputs."
      },
      {
        "heading": "How do I read the cumulative cost of cigarettes over time?",
        "text": "The monthly figure is the daily amount multiplied by the days in a month, which gives a simple monthly budget line. The ten-year figure is the same arithmetic over a longer period, so it shows the cumulative total rather than a forecast. Treat all of these as fixed-price projections: if the pack price rises or you smoke more or less, the totals change in proportion. Compare the figure with other spending you already track, such as groceries or a subscription, to put the number in context."
      },
      {
        "heading": "What common mistakes make the savings estimate misleading?",
        "text": "A frequent error is entering a pack price from a different brand or country than the one you actually buy, which skews every total. Another is forgetting that partial packs, gifts or cheaper purchases change the real average. People also tend to ignore the wider picture, such as health costs, which this tool does not include. Finally, treating the projection as a promise rather than a rough picture of spending can set unrealistic expectations."
      }
    ],
    "faqs": [
      [
        "How can I save money by quitting smoking?",
        "Take the yearly total from the calculator as a baseline, since that is the amount that stopping would keep in your budget. Set that figure against the cost of any nicotine replacement or support you plan to use, and compare the two honestly."
      ],
      [
        "How many packs a day does the calculator assume?",
        "It converts the cigarettes per day you enter into packs using the pack size you enter, then multiplies by the price per pack. It does not assume a brand or a fixed pack, so change the pack size if yours holds a different number of cigarettes."
      ],
      [
        "Does the ten-year total include future price increases?",
        "No. It repeats today's price, so the ten-year figure is a fixed-price projection. If pack prices rise, or you smoke more or less over time, the real total will be different."
      ]
    ]
  },
  "ratio-calculator": {
    "answer": "A ratio calculator reduces two numbers to their simplest form by dividing both by their greatest common divisor. It can also solve a proportion: enter A, B and C, and the missing term equals C times B divided by A. Ratios appear in recipes, scale drawings and mixtures, so the same steps apply wherever two quantities are compared.",
    "aiSummary": "Helps you simplify a ratio to lowest terms by dividing both terms by their greatest common divisor, and solves a missing term in an equal-ratio pair. The method is straightforward arithmetic, but it needs a non-zero first term and assumes the two pairs truly match.",
    "shortKeyword": "ratio calculator",
    "longKeywords": [
      "simplify a ratio to lowest terms",
      "solve a proportion for a missing term",
      "ratio of two numbers in simplest form"
    ],
    "exampleInputs": {
      "a": "2",
      "b": "3",
      "c": "6"
    },
    "sections": [
      {
        "heading": "Why would I need to simplify a ratio to lowest terms?",
        "text": "Simplified ratios are easier to read and compare. A recipe that calls for 16 cups to 24 cups is clearer as 2 to 3, and the same reduction makes two mixtures comparable at a glance. The tool divides both terms by their greatest common divisor, so the result keeps the same relationship with fewer, smaller numbers. Use the reduced form when you want to communicate a relationship rather than exact quantities."
      },
      {
        "heading": "How do I solve a proportion for a missing term?",
        "text": "Write the known pairs as A to B equals C to an unknown. The optional third field holds C, so the tool cross-multiplies and divides: the missing term equals C times B, divided by A. Cross-multiplication works because both ratios describe the same relationship. Check the answer by substituting it back into the original pair; the two ratios should reduce to the same form. Keep the first term nonzero, because division by zero has no meaningful result."
      },
      {
        "heading": "What are common mistakes when reading a ratio?",
        "text": "A frequent mistake is reversing the order of the terms, which swaps the meaning of the answer. A ratio of 2 to 3 is not the same as 3 to 2 for a recipe or a map. Another is simplifying a ratio that compares different units without converting first, such as minutes against hours. Finally, mixing up which term is the first when solving a proportion throws off the result, so label A, B and C before entering them."
      }
    ],
    "faqs": [
      [
        "What is the ratio of two numbers in simplest form?",
        "It is the pair you get after dividing both numbers by their greatest common divisor, so no whole number greater than one divides both evenly. For example, 16 and 24 reduce to 2 and 3. The reduced pair keeps the same relationship as the original, just with smaller values."
      ],
      [
        "Can a ratio have more than two terms?",
        "Yes. A ratio such as 2:3:5 compares three quantities at once, and it can be simplified by dividing every term by their common divisor. This calculator handles two terms at a time, so a three-part ratio can be checked pair by pair."
      ],
      [
        "Why must the first term be nonzero?",
        "The missing term is found by dividing by the first term A, and division by zero is undefined. A zero first term therefore leaves no usable answer, so check the input before reading the result. Enter a non-zero first term whenever you solve for a missing value."
      ]
    ]
  },
  "slope-calculator": {
    "answer": "A slope calculator finds the steepness of the line through two points as rise over run: the change in y divided by the change in x. It then solves for the y-intercept and writes the full slope-intercept equation, y = mx + b. A vertical line has an undefined slope because its change in x is zero.",
    "aiSummary": "Computes the slope of a line from two coordinate points, the y-intercept, and the equation in slope-intercept form. The core method is rise over run, with the intercept found by substitution. It applies only to non-vertical lines, since a vertical line has no defined slope.",
    "shortKeyword": "slope calculator",
    "longKeywords": [
      "find the slope from two points",
      "write the equation of a line",
      "vertical line has no defined slope"
    ],
    "exampleInputs": {
      "x1": "2",
      "y1": "3",
      "x2": "5",
      "y2": "9"
    },
    "sections": [
      {
        "heading": "How do I find the slope from two points?",
        "text": "Slope measures how steeply a line rises or falls. Take two points, subtract the y-values to get the rise, subtract the x-values to get the run, and divide. Keep the same order of points for both subtractions to avoid a sign error. A positive result means the line climbs left to right, while a negative result means it falls. The calculator performs this arithmetic for you, so you can focus on entering the coordinates correctly and reading the sign of the result."
      },
      {
        "heading": "How do I write the equation of a line from slope?",
        "text": "Once you have the slope m, the intercept b is the value of y where the line crosses the vertical axis. The tool substitutes one of your points into y = mx + b and solves for b. The result gives the complete equation, which you can use to predict y for any x. Two distinct points define exactly one line, so the equation is unique."
      },
      {
        "heading": "What are common mistakes with vertical lines and slope?",
        "text": "The most common mistake is dividing by zero when two points share an x-value. That situation is a vertical line, and its slope is undefined rather than zero or very large. Another error is swapping x and y while subtracting, which flips the sign or inverts the slope. Finally, reading the intercept from the wrong form of the equation can give a false value, so confirm the line is written as y = mx + b before reading b."
      }
    ],
    "faqs": [
      [
        "Does a horizontal line have a slope of zero?",
        "Yes. A horizontal line has the same y-value at every point, so the change in y is zero and the slope is zero. Its equation takes the form y = b, with no x term because the slope multiplies nothing. The constant value is the y-intercept."
      ],
      [
        "Can two different lines share the same slope?",
        "Yes. Parallel lines have equal slopes but different y-intercepts, so they never meet. Two lines with the same slope and the same intercept are the same line. Comparing slopes is therefore a quick first test for whether two lines are parallel."
      ],
      [
        "How do I check that my equation is correct?",
        "Substitute each of your original points into the equation and confirm both sides match. If either point fails, recheck the intercept or the sign in the slope. A correct line passes through both points exactly, so a single mismatch tells you the calculation or the input needs another look."
      ]
    ]
  },
  "combination-calculator": {
    "answer": "A combination calculator counts how many ways to choose r items from n when order does not matter, using nCr = n! / (r! (n-r)!). The related permutation count nPr applies when order matters and drops the division by r!. Both are the foundation of counting and probability, and they answer different questions about the same set of items.",
    "aiSummary": "Computes permutations nPr and combinations nCr for n total items and r chosen items, using factorial ratios. Combinations divide out the arrangements of the chosen items, so the result counts selections. The method assumes distinct items, and results grow very fast as n rises.",
    "shortKeyword": "combination calculator",
    "longKeywords": [
      "count selections when order does not matter",
      "nPr formula count ordered arrangements",
      "choose r items from n"
    ],
    "exampleInputs": {
      "n": "10",
      "r": "4"
    },
    "sections": [
      {
        "heading": "How do I count selections when order does not matter?",
        "text": "Use combinations when the group is what matters and the order of picking does not. Choosing three toppings from ten is a combination, because picking pepperoni then olives gives the same pizza as olives then pepperoni. The calculator takes n as the total pool and r as the number you select, then returns the count of distinct groups. Keep n and r as whole numbers, with r no larger than n."
      },
      {
        "heading": "Does the nPr formula count ordered arrangements?",
        "text": "Permutations apply when position matters, such as ranking the top three finishers in a race. The formula nPr multiplies n by one fewer each time, for r factors in total, which lists every ordered result. Compared with combinations, the count is larger because each group can be arranged in several orders. The difference between the two is exactly the arrangements inside each chosen group, which is the r factorial term. Check small cases by hand to build intuition."
      },
      {
        "heading": "What are common mistakes with combinations and permutations?",
        "text": "The most frequent error is using a combination when order matters, which undercounts arrangements. Users also mix up n and r, entering the chosen count where the pool size belongs. Another mistake is applying the formulas to repeated items, such as letters in a word with duplicates, since the standard formulas assume each item is distinct. Finally, very large n gives huge numbers, so read the result as a count, not a probability."
      }
    ],
    "faqs": [
      [
        "What does the factorial symbol mean here?",
        "The factorial of a whole number is the product of every whole number from that value down to one, so 4 factorial is 4 times 3 times 2 times 1. The formulas use factorials because they count how many orders exist for a set of items. By convention, 0 factorial is defined as 1 so the formulas work at the edges."
      ],
      [
        "Can r be zero or equal to n?",
        "Yes, both are valid edge cases. Choosing zero items gives one way, and choosing all n items also gives one way, because only a single group exists. The formulas handle these cases correctly, so you do not need a special rule."
      ],
      [
        "Can I count outcomes for a lottery with this tool?",
        "Yes, for the count of possible picks. A lottery with a fixed number of chosen balls from a larger pool is a combination problem. Multiply by any extra choices, such as a bonus ball, separately. The tool gives the number of possible tickets, not your chance of winning, which needs the probability step as well."
      ]
    ]
  },
  "probability-calculator": {
    "answer": "A probability calculator divides favorable outcomes by total outcomes to give the chance an event occurs, shown as a decimal and a percentage. It also converts that value into odds, which compare favorable to unfavorable outcomes, and reports the complement, the chance that an event does not happen. Probabilities always fall between zero and one.",
    "aiSummary": "Converts favorable and total outcome counts into a probability, reported as a decimal, a percentage, odds, and the complement. The core method is a ratio of counts, valid only when every outcome is equally likely. Real events with unequal chances need a different model than this simple count.",
    "shortKeyword": "probability calculator",
    "longKeywords": [
      "probability of an event from outcomes",
      "convert probability to odds",
      "chance that an event does not happen"
    ],
    "exampleInputs": {
      "favorable": "3",
      "total": "8"
    },
    "sections": [
      {
        "heading": "How do I find the probability of an event from outcomes?",
        "text": "Start by counting the outcomes that count as success, then count every outcome that could occur. Divide the first number by the second to get the probability. The result sits between zero, meaning impossible, and one, meaning certain. This works cleanly when each outcome is equally likely, such as a fair die where one face out of six lands on a particular number. Make sure both counts come from the same list of outcomes so the ratio stays meaningful."
      },
      {
        "heading": "How do I convert probability to odds?",
        "text": "Odds compare favorable outcomes with unfavorable ones, so they are a different way of describing the same chance. Subtract favorable from total to get the unfavorable count, then write favorable to unfavorable. A probability of one in six therefore corresponds to odds of one to five. Converting back and forth is reversible, so no information is lost. Odds are common in betting and games, while probability is more common in science and statistics, so choose the form your audience expects."
      },
      {
        "heading": "What are common mistakes when reading probability results?",
        "text": "A frequent error is treating odds and probability as interchangeable, which can overstate or understate a chance by a large margin. Another is adding probabilities of events that overlap, which double-counts the shared outcomes. People also forget that a very small probability is not the same as impossibility. Finally, a probability computed from a small sample of outcomes may not match the underlying chance, so check the assumptions behind the counts."
      }
    ],
    "faqs": [
      [
        "Can a probability be greater than one?",
        "No. A probability can never exceed one, because favorable outcomes are a subset of total outcomes, so the ratio cannot be larger than one. If you enter more favorable outcomes than total outcomes, the input is wrong. Check that both counts describe the same set of possibilities."
      ],
      [
        "Why is a probability of zero called impossible?",
        "A probability of zero means that no favorable outcome exists among the total outcomes, so the event cannot happen under the setup you entered. Probabilities of one mean the event is certain under that same setup. Both extremes depend entirely on how the outcomes were defined."
      ],
      [
        "What does a half chance mean in practice?",
        "A half chance means that, across many repeated trials under the same conditions, the event happens about half the time. It does not guarantee that a single trial will split evenly. Each individual outcome still either happens or does not, even when the long-run rate is one half."
      ]
    ]
  },
  "exponent-calculator": {
    "answer": "An exponent calculator raises a base to a power by multiplying the base by itself exponent times. A negative exponent gives the reciprocal of the positive power, and a fractional exponent gives a root, so x to the one-half power is the square root of x. Results grow very quickly for large exponents, so check the magnitude as well as the value.",
    "aiSummary": "Raises a base to any power, handling whole, negative and fractional exponents with the rule that repeated multiplication defines the result. Negative exponents give the reciprocal of the positive power, and fractional exponents take roots. Very large exponents produce numbers that are hard to read, and zero bases need care.",
    "shortKeyword": "exponent calculator",
    "longKeywords": [
      "raise a number to a power",
      "turn a fractional exponent into a root",
      "reciprocal of the positive power"
    ],
    "exampleInputs": {
      "base": "3",
      "exp": "5"
    },
    "sections": [
      {
        "heading": "How do I raise a number to a power by hand?",
        "text": "Base two raised to ten means two multiplied by itself ten times. Writing out the steps for small exponents helps you see the pattern before you rely on a tool for larger ones. Each extra exponent multiplies the result by the base once more, so the value grows geometrically rather than in equal steps. The calculator performs the same multiplication, returning the result without manual steps. Use it for quick checks on homework or spreadsheets, where mistakes in repeated multiplication are easy to make."
      },
      {
        "heading": "How do I turn a fractional exponent into a root?",
        "text": "A fractional exponent with numerator one is a root: x to the power one half is the square root of x, and x to the power one third is the cube root. Larger numerators raise the root result to that power, so the exponent combines both ideas. The calculator follows this rule automatically when you enter a fraction as a decimal. A negative base with a fractional exponent may have no real result, so an error is possible."
      },
      {
        "heading": "What common mistakes happen with exponents?",
        "text": "A frequent mistake is reading a negative exponent as a negative number, when it actually means the reciprocal. Another is the order of operations: a negative sign in front of a number is not the same as a negative base raised to a power, so parentheses matter. People also tend to round intermediate steps, which compounds small errors when the exponent is large. Keep in mind that exponents are evaluated before multiplication, so two times three squared is not the same as six squared. Check each step by estimating the size of the answer first, which catches many slips before they reach a report. Finally, very large results can be hard to read, so report the base and exponent alongside the answer."
      }
    ],
    "faqs": [
      [
        "Why does a base of one always give one?",
        "Multiplying one by itself any number of times leaves it unchanged, so one raised to any power is one. This holds for negative and fractional exponents as well, since the reciprocal of one is one and the root of one is one. It is a useful check when a result looks unexpected."
      ],
      [
        "Can I raise a negative base to a power?",
        "Yes, with whole-number exponents. A negative base raised to an even power gives a positive result, while an odd power keeps the sign negative. Fractional exponents on negative bases are the tricky case, because the root may not be a real number."
      ],
      [
        "Why do exponents show up in growth and decay?",
        "Repeated multiplication by a fixed factor produces exponential patterns, which is why exponents model compound growth, population change and radioactive decay. Each step multiplies by the same ratio, so the amount changes by a constant share rather than a constant amount. Calculators make these projections quick to test."
      ]
    ]
  },
  "log-calculator": {
    "answer": "A logarithm calculator finds the power a base must be raised to in order to produce a given number. In general, the logarithm of a number in base b equals ln(x) divided by ln(b), the change-of-base formula. The tool also shows the natural log and the common log, and the input number must be positive.",
    "aiSummary": "Computes the logarithm of a positive number in any base, alongside the natural log and base-ten log. The core method is change of base: divide the natural log of the number by the natural log of the base. Inputs of zero or below have no real logarithm, so the tool needs a positive value.",
    "shortKeyword": "logarithm calculator",
    "longKeywords": [
      "find the logarithm of any number",
      "change of base formula for logs",
      "logarithm of zero or negative numbers"
    ],
    "exampleInputs": {
      "number": "8",
      "base": "2"
    },
    "sections": [
      {
        "heading": "How do I find the logarithm of any number?",
        "text": "A logarithm answers the question of which power a base needs to reach a number. Logarithm base ten of one thousand asks how many tens multiply to give one thousand, which is three. The calculator takes the number and the base, then returns the answer with ln and log base 10 for comparison. Use it for pH-style scales, sound levels, or growth problems where values span many orders of magnitude. Check the result by raising the base to that power and confirming you return the original number."
      },
      {
        "heading": "How does the change of base formula for logs work?",
        "text": "Many calculators provide only the natural log and the base-ten log directly, so other bases need a conversion. The change of base rule says the log of x in base b equals the natural log of x divided by the natural log of b. Dividing the two natural logs gives the answer directly, because the conversion uses the same scale in both terms. The tool applies this step internally and shows the natural log and log base 10, so you can verify the division yourself."
      },
      {
        "heading": "What goes wrong with the logarithm of zero or negative numbers?",
        "text": "The logarithm is defined only for positive inputs in real numbers, because no power of a positive base yields zero or a negative value. Entering zero or a negative number may produce an error or no meaningful answer, which is a signal to recheck the input. A related pitfall is a base of one, which cannot be used because every positive power of one is one, so no power reaches a different number. Also watch for bases that are zero or negative, since those break the standard definition."
      }
    ],
    "faqs": [
      [
        "Why is ln used in mathematics?",
        "The natural log uses the base e, a constant that appears naturally in continuous growth and calculus. Its derivative is especially simple, which is why it turns up in formulas for rates and models. The tool shows ln alongside your chosen base so you can compare the values directly."
      ],
      [
        "Are logs of negative numbers possible with complex numbers?",
        "They exist in the complex number system, but this calculator works in real numbers only. Within real numbers, the logarithm of a negative value has no answer, so the tool expects a positive input. If you are studying complex analysis, a different treatment applies."
      ],
      [
        "How do I check a logarithm result?",
        "Raise the base to the logarithm you calculated and confirm that the outcome matches your original number, allowing for rounding. Doing this check catches mistakes in the base or the input. It takes only a moment and is a good habit for any logarithm problem."
      ]
    ]
  },
  "rounding-calculator": {
    "answer": "A rounding calculator takes a number and a count of decimal places, then returns that number rounded to the nearest value, with ties rounding up. Ceiling rounds toward positive infinity and floor rounds toward negative infinity, so both results are shown alongside. This runs entirely in your browser, so the numbers you enter stay on your device.",
    "aiSummary": "Rounds a number to a chosen count of decimal places using standard half-up rounding, and also shows ceiling and floor results, so you can round a number up or down. Negative places round to tens and hundreds. The main limit is that it rounds only the value entered, not any wider calculation.",
    "shortKeyword": "rounding calculator",
    "longKeywords": [
      "how to round a number to decimal places",
      "rounding numbers to tens or hundreds",
      "round a number up or down"
    ],
    "exampleInputs": {
      "number": "3.14159",
      "places": "3"
    },
    "sections": [
      {
        "heading": "What is a rounding calculator used for?",
        "text": "People use a rounding calculator to tidy numbers before they go into a report, a receipt, a spreadsheet cell, or a measurement log. Rounding to two decimal places is common for money, while three or four places can suit lab readings. Because the tool shows standard rounding next to ceiling and floor results, you can see at a glance which direction each rule pushes the value. Everything runs in your browser, so the figures you type never leave the page."
      },
      {
        "heading": "How to round a number to decimal places?",
        "text": "Enter the number and the count of decimal places. The main result is standard rounding, which moves to the nearest value at that precision and rounds a tie up. The ceiling result is never smaller than the input, because it rounds toward positive infinity. The floor result is never larger than the input, because it rounds toward negative infinity. When the digits after the cut-off are all zero, the three figures match."
      },
      {
        "heading": "What mistakes happen when rounding numbers to tens or hundreds?",
        "text": "A common mistake is rounding too early. If you round an intermediate result and keep calculating, small differences can add up, so keep full precision until the final step. Another slip is mixing up the three modes: ceiling and floor always move in one fixed direction, which can differ from nearest rounding when the number is negative. Rounding to tens or hundreds is a separate step, so enter a negative place count deliberately. This tool rounds only the single value you enter. It does not apply currency rules, units or any reporting requirement, so check those separately."
      }
    ],
    "faqs": [
      [
        "Can rounding ever add precision to a number?",
        "No. Rounding only removes digits past the chosen place and never adds real precision. The result has at most the number of decimal places you asked for, though trailing zeros may still display to fill that count."
      ],
      [
        "Why does the same value round differently in two tools?",
        "Tools can differ in tie handling and in whether they use nearest, ceiling or floor by default. This calculator uses round-half-up for the standard result and shows ceiling and floor separately, so compare the rule each tool names before matching results."
      ],
      [
        "Should I round before or after adding values?",
        "Usually after. Adding full-precision values first and rounding the total avoids compounding small errors. If a form or invoice requires rounding each line, follow that rule instead, because it defines the figure people will check."
      ]
    ]
  },
  "scientific-notation-converter": {
    "answer": "A scientific notation converter rewrites a number as a mantissa between 1 and 10 multiplied by a power of ten, such as a value times ten raised to a negative power. It also gives the compact E notation form used in calculators and software. The exponent counts how far the decimal point moves, and the tool works it out from the base-10 logarithm. Everything runs in your browser.",
    "aiSummary": "Turns any number into scientific notation or E notation by finding a mantissa between 1 and 10 and an exponent from its base-10 logarithm, and converts back the other way. Good for very large or very small values. Main limit: the displayed form is a finite approximation for numbers with many digits.",
    "shortKeyword": "scientific notation converter",
    "longKeywords": [
      "how to write numbers in scientific notation",
      "converting very small decimals to E notation",
      "reading the exponent in scientific notation"
    ],
    "exampleInputs": {
      "number": "0.00042"
    },
    "sections": [
      {
        "heading": "How to write numbers in scientific notation?",
        "text": "Scientific notation is a common way to handle values that run from extremely large to extremely small, such as distances in astronomy or sizes of particles in physics. A number is written as a mantissa from 1 up to 10, multiplied by a power of ten. The converter does this for you, and it also reverses the process, so a value typed in scientific or E form returns to ordinary digits. Results are computed in your browser."
      },
      {
        "heading": "What helps with reading the exponent in scientific notation?",
        "text": "The exponent is the power of ten at the end. A positive exponent means the original number is large, and the decimal point moved left to reach the mantissa. A negative exponent means the number is small, because the decimal point moved right. Count the places the point travels to confirm the exponent by hand. Then check that the mantissa sits between 1 and 10, since that rule keeps the form consistent."
      },
      {
        "heading": "What mistakes should you avoid when entering very small decimals?",
        "text": "A frequent mistake is miscounting leading zeros in a small decimal, which shifts the exponent by a full power of ten. Another is assuming E notation is a different number. The letter E followed by an exponent names the same value as the spelled-out form, so only the appearance changes. Very long inputs may also be shortened in the mantissa, so compare the converted value with the original wherever precision matters for your work."
      }
    ],
    "faqs": [
      [
        "What changes when converting very small decimals to E notation?",
        "The digits stay the same, but the decimal point moves and the exponent is written after the letter E with a minus sign for small values. The mantissa keeps one non-zero digit before the point, so the form stays uniform across very different sizes."
      ],
      [
        "Is standard form the same as scientific notation?",
        "Yes. Standard form is another name for the same format, a mantissa between 1 and 10 times a power of ten. Scientific notation is the term most common in science and engineering texts."
      ],
      [
        "Does E notation work in every program?",
        "Many calculators, spreadsheets and programming languages read the letter E as times ten to a power, but the exact input rules vary by program. Check how your software expects the exponent before pasting a value into it."
      ]
    ]
  },
  "days-until-calculator": {
    "answer": "A days until calculator counts the full calendar days between today and a chosen future date. Both dates are set to midnight before subtracting, so the answer means whole days remaining rather than 24-hour blocks from this moment. It is a static count, not a live timer, and everything is computed in your browser.",
    "aiSummary": "Counts the whole calendar days from today to a target date by setting both dates to midnight and subtracting. Useful for launches, deadlines and holidays. The main limit is that it is a fixed count for the day it is viewed, not a ticking countdown to the minute.",
    "shortKeyword": "days until calculator",
    "longKeywords": [
      "how many days until a deadline",
      "counting full calendar days remaining",
      "days between today and a launch date"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How many days until a deadline or holiday?",
        "text": "People use this when a date is fixed and they want a plain number: days left before a product launch, a school exam, a family holiday or a contract deadline. A single figure is easier to share in a plan or message than a calendar date alone. Enter the target date, and the result gives the number of full calendar days between the current day and that target. The field takes one calendar date at a time, so compare several deadlines by running each one separately."
      },
      {
        "heading": "What does counting full calendar days remaining mean?",
        "text": "The tool sets both the current day and the target to midnight before it subtracts. That step means the result is a count of whole calendar days, not a number of 24-hour periods from the exact moment you open the page. Using the calendar keeps the number steady across a day, so the result reads the same whenever you check it that day. A target of tomorrow therefore reads as one day remaining."
      },
      {
        "heading": "What mistakes should you avoid when a deadline has a specific hour?",
        "text": "Check the year first, because a typo in the target date changes the count directly. Also remember this is a static count, not a live countdown, so a deadline with a specific hour will show only days. If you need hours or minutes left, use a dedicated timer. Agree in advance whether the starting day counts, since teams often disagree on that, and state the rule next to any figure you share."
      }
    ],
    "faqs": [
      [
        "Can I count days between today and a launch date?",
        "Yes. Enter the launch date as the target and the tool returns the full calendar days remaining from the current day to that date. Because both dates are set to midnight, the count matches the calendar rather than hours."
      ],
      [
        "Does the count change if I open the page on another day?",
        "Yes, because the starting point is the current day. A later visit gives a smaller number for the same target, so record the date you calculated on when you share a count with someone."
      ],
      [
        "Why does the result show only whole days?",
        "The tool counts calendar days, so each step is one whole day and no fractions appear. Hours and minutes would need a different calculation based on the exact time of day."
      ]
    ]
  },
  "week-number-calculator": {
    "answer": "A week number calculator finds the ISO 8601 week for a date, where week 1 is the week containing the year's first Thursday and weeks start on Monday. It also reports the day of the year. The rule is applied exactly, including dates near 1 January or the end of December, where the week can belong to the adjacent year. Runs in your browser.",
    "aiSummary": "Answers what week number is this date by returning the ISO 8601 week and the day of the year. The rule: week 1 holds the first Thursday, and weeks begin on Monday. Main limit: numbering systems differ, so confirm which one your schedule or payroll uses.",
    "shortKeyword": "week number calculator",
    "longKeywords": [
      "how to find the iso week number",
      "which week of the year is it",
      "what week number is this date"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to find the ISO week number for a date?",
        "text": "Planners, project managers and payroll teams often refer to weeks by number, so a shared reference matters. This calculator returns the ISO week for the date you enter, along with the day of the year. That gives a fixed label for scheduling sprints, reporting periods or shift rotas. Because the calculation follows one rule across every date, two people entering the same date get the same answer. Enter the date and read both figures."
      },
      {
        "heading": "Which week of the year is it for my date?",
        "text": "Read the week number first, then the day of the year, which counts from 1 at the start of the calendar year. Week 1 is the week that contains the first Thursday, and it may start in late December of the previous year. Likewise the final days of December can already belong to week 1 of the next year. Treat the week number as the ISO value, not as a simple count of seven-day blocks from 1 January."
      },
      {
        "heading": "What mistakes happen with week numbers near New Year?",
        "text": "The most common mistake is assuming the week number resets on 1 January. Early January dates can belong to the last week of the old year, and late December dates can show week 1. Another slip is mixing up systems: some start weeks on Sunday, so a schedule built on a different rule can be off by one week. Check which system your team uses, and keep the ISO value in any shared document so everyone reads it the same way."
      }
    ],
    "faqs": [
      [
        "Can I use this to plan a sprint or shift rota?",
        "Yes. Enter any date in the sprint or rota and use the week number as a shared label. Because the rule is fixed, everyone who checks the same date will see the same week, which avoids disagreement about which week is meant."
      ],
      [
        "How do I count the day of the year by hand?",
        "Add the days in each completed month to the day of the month. The result is the day of the year, starting from 1 on 1 January. Leap years add one extra day after February, so check that month when the year is a leap year."
      ],
      [
        "Does a late December date always fall in the last week?",
        "No. A late December date can fall in week 1 of the following year, because week 1 is set by the year's first Thursday. Check the calculator instead of assuming the calendar year and week number move together."
      ]
    ]
  },
  "roman-numeral-converter": {
    "answer": "A roman numeral converter changes a whole number from 1 to 3999 into Roman symbols, using greedy subtraction over values such as M, CM and D, and it reads Roman numerals back into numbers by adding symbols and subtracting where a smaller value comes first. Everything runs in your browser.",
    "aiSummary": "Converts whole numbers from 1 to 3999 into Roman numerals and converts Roman numerals back, using the standard symbols. Number-to-Roman uses greedy subtraction; Roman-to-number adds symbols and subtracts where a smaller value precedes a larger one. Main limit: the standard notation only covers that range, so larger values are outside it.",
    "shortKeyword": "roman numeral converter",
    "longKeywords": [
      "converting numbers to roman numerals by hand",
      "how to read roman numerals",
      "what is the largest roman numeral"
    ],
    "exampleInputs": {
      "mode": "toRoman",
      "number": "2026"
    },
    "sections": [
      {
        "heading": "When is converting numbers to Roman numerals by hand useful?",
        "text": "Roman numerals still appear in book chapters, film copyright lines, clock faces, movie sequels and some formal documents. Converting by hand is slow and error-prone for large values, so a tool helps when you need a quick, correct form. The converter handles both directions, so it can also check a numeral someone else wrote. In the Direction field, choose Number to Roman or Roman to number before you enter a value."
      },
      {
        "heading": "How to read Roman numerals in a clock or title?",
        "text": "Read Roman numerals from left to right. Letters that appear in descending order simply add, so XVI means ten plus five plus one. When a smaller value sits before a larger one, subtract it, as in IV for four or IX for nine. Symbols such as I, X and C can repeat up to three times in a row, while V, L and D do not repeat. Check the result by converting it back to a number with the Roman-to-number mode, which confirms the reading."
      },
      {
        "heading": "What mistakes should you avoid with Roman numerals above 3999?",
        "text": "The standard system covers 1 to 3999 only. Values above that range need extra notation that the standard rules do not cover. A frequent mistake is copying a numeral from an old source with a non-standard form, such as IIII for four, and expecting the standard reading. Check any unusual numeral against the standard rules before relying on it. Keep the original source beside the result so you can compare the two."
      }
    ],
    "faqs": [
      [
        "Can I write zero as a Roman numeral?",
        "No. The standard Roman system has no symbol for zero, so the converter starts at 1, which matches the range shown in the number field above."
      ],
      [
        "Does the order of letters ever change the value?",
        "Yes. Placing a smaller symbol before a larger one subtracts it, so IV is four while VI is six. Reversing the pair changes the meaning, which is why the order of symbols matters."
      ],
      [
        "What is the largest roman numeral this tool can write?",
        "The converter covers numbers from 1 to 3999, so the largest numeral it writes is MMMCMXCIX, which is 3999 in standard notation. Its symbols are M, D, C, L, X, V and I, with the subtractive pairs CM, CD, XC, XL, IX and IV."
      ]
    ]
  },
  "age-difference-calculator": {
    "answer": "An age difference calculator measures the gap between two birth dates in years and months, and also in total days and weeks. Dates can be entered in either order, because the tool takes the absolute difference. The years-and-months figure uses an average year length, so it suits practical use but is not a calendar-exact count. Everything runs in your browser.",
    "aiSummary": "Finds the gap between two birth dates, whichever is entered first, and expresses it in years and months plus total days and weeks. It uses an average year length for long spans. Limitation: the years-and-months figure is an approximation, so use the day count where an exact figure is needed.",
    "shortKeyword": "age difference calculator",
    "longKeywords": [
      "how many years between two birth dates",
      "comparing the ages of two people",
      "days and weeks between two birth dates"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "Why check how many years between two birth dates?",
        "text": "A gap in years is often asked for in family, school and sports settings, where grade cut-offs, sibling spacing or team age rules depend on exact timing. The tool gives the gap in years and months, so you can see whether a cut-off applies. It also shows days and weeks, which helps when a rule counts in units smaller than a month. Enter the two birth dates as they appear on your documents to keep the result tied to real records."
      },
      {
        "heading": "What is useful about comparing the ages of two people?",
        "text": "Comparing ages shows whether two people are close in age or separated by a generation, which can matter for mentoring, family trees, or historical research. The tool takes the absolute difference, so the order you type the dates does not change the result. Read the years-and-months line first, then check the total days for an exact figure. Keep in mind that the gap is a plain difference, not a judgment about the people involved, and it says nothing about their experience or maturity."
      },
      {
        "heading": "What limits should you keep in mind for the years-and-months figure?",
        "text": "The years-and-months figure relies on an average year length, so it can drift slightly from a count that follows each calendar anniversary. Leap years and month lengths are the usual sources of that difference. For legal ages, contract dates or official records, confirm the result against the official rule that applies rather than relying on this estimate. Another common mistake is swapping the two fields, so double-check which box holds which person's birth date."
      }
    ],
    "faqs": [
      [
        "How are days and weeks between two birth dates counted?",
        "The day count is the plain difference between the two dates. The weeks figure expresses that same count in seven-day units, so it stays consistent with the days line."
      ],
      [
        "Can I use the result on an official form?",
        "Use it as a quick estimate or a cross-check. For forms, legal records or eligibility decisions, use the rule or record that governs your situation, since this tool does not apply jurisdiction-specific counting."
      ],
      [
        "Why would the years figure differ from a day count?",
        "The years-and-months figure is scaled with an average year length, while the day count is exact. Over long spans, the two can seem slightly out of step, so the day count is the more literal figure."
      ]
    ]
  },
  "add-business-days-calculator": {
    "answer": "An add business days calculator finds the date that falls a given number of working days before or after a start date. It steps one day at a time and counts only Monday through Friday, so weekends never add to the total. Enter a negative number to count backward. Everything runs in your browser.",
    "aiSummary": "Moves a start date forward or backward by a chosen number of working days, stepping through the calendar and counting only Monday to Friday. Useful for delivery promises and service deadlines. Limitation: the count is based on Monday to Friday, so holidays in the range need a manual check.",
    "shortKeyword": "add business days calculator",
    "longKeywords": [
      "how to count working days after a date",
      "delivery date after several business days",
      "subtract business days from a deadline"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to count working days after a date?",
        "text": "Service teams, legal offices and shipping desks often promise a response or delivery in working days, not calendar days, so weekends must be skipped. This tool lets you enter a start date and a number of days, then returns the matching date. Set the number to a positive value for a future date or a negative one to look back. Use the result as a planning date, and confirm any contractual deadline against the wording of the agreement."
      },
      {
        "heading": "What does a delivery date after several business days mean?",
        "text": "Read the output as the date reached after stepping through working days, not as a calendar-day offset. A weekend in the range adds nothing to the count, so a span that crosses one or more weekends lands later than a plain day count would suggest. Compare the result with the start date and a calendar to confirm the logic before you share it with a client. The same rule works in reverse for negative inputs."
      },
      {
        "heading": "What limits or mistakes affect a business day deadline?",
        "text": "The main limit is that the tool counts Monday to Friday only, so public holidays inside the range are not treated as special days by this rule. Check the calendar of your region or client and adjust by hand when a holiday falls in the period. Another mistake is mixing up calendar and working days: a promise of ten days may mean ten working days, which can stretch across two weeks or more."
      }
    ],
    "faqs": [
      [
        "How do I subtract business days from a deadline?",
        "Enter the deadline as the start date, then type a negative number of business days. The tool steps backward one day at a time, counting only Monday through Friday, until it reaches the requested total. Compare the result against a calendar before committing to a plan."
      ],
      [
        "Does a weekend start date change the answer?",
        "Only Monday to Friday days are counted as steps, so the weekend itself never adds to the number. Test the same input with a weekday start to see how the result shifts."
      ],
      [
        "Can I use this for a timeline with holidays?",
        "The rule described here counts Monday to Friday only. For each holiday inside the period, check the result by hand and shift it one working day further for every closed day in your schedule."
      ]
    ]
  },
  "weeks-between-dates-calculator": {
    "answer": "A weeks between dates calculator takes the day difference between two dates and divides it by seven. It shows the exact decimal weeks, the whole weeks with leftover days, and the total day count. Everything runs in your browser, so the dates you enter stay on your device.",
    "aiSummary": "Counts how many weeks lie between two dates by dividing the day difference by seven, showing a decimal figure, whole weeks with leftover days, and total days. Useful for sprint planning and project timelines. Limitation: the ratio is simple, so it does not account for weekends or holidays within the span.",
    "shortKeyword": "weeks between dates calculator",
    "longKeywords": [
      "how many weeks are between two dates",
      "whole weeks plus leftover days",
      "counting weeks for a project timeline"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When is it handy to know how many weeks are between two dates?",
        "text": "Weeks are a common unit for short and medium spans, such as a sprint, a training block, a lease notice or a school term. Counting in weeks gives a feel for scale that a day count often hides. This tool shows the total in three forms, so you can pick the one that fits the message. The decimal suits calculations, the whole weeks with leftover days suits people, and the total days suits systems that store dates."
      },
      {
        "heading": "What do whole weeks plus leftover days tell you?",
        "text": "The whole-weeks figure counts complete seven-day blocks between the two dates. The leftover figure is the number of days that do not fill another full block. Reading the two together tells you both the rhythm of the span and its exact length. Use the whole weeks for a plain estimate and the leftover days when you need the exact arrangement of the last partial week. Both figures come from the same day difference, so they never disagree."
      },
      {
        "heading": "What mistakes come up when counting weeks for a project timeline?",
        "text": "A common slip is counting the start and end days inconsistently, which can shift the total by a day. Another is treating a fractional week as a deliverable week, so work that needs a full week gets planned as a partial one. The tool counts calendar days, so weekends and holidays are included in the total. If your timeline runs on working days, use a working-day method instead of dividing this total by seven."
      }
    ],
    "faqs": [
      [
        "Can this tool show weeks for a span longer than one year?",
        "Yes. The day difference is divided by seven regardless of span, so a multi-year range gives a larger week count using the same method. Expect a long decimal, and read the whole-weeks line for planning."
      ],
      [
        "Why does the decimal figure run on for so long?",
        "Division by seven rarely gives a clean result, so the decimal goes on. The tool shows it to make the exact ratio visible. For everyday planning, the whole weeks and leftover days are usually easier to read."
      ],
      [
        "Can I work out the weeks by hand?",
        "Yes. Divide the total day count by seven, then take the whole part as full weeks and multiply the fraction by seven to get leftover days. The calculator does the same arithmetic, so you can check it by hand."
      ]
    ]
  },
  "reverse-text": {
    "answer": "Reverse text flips a string so its last character comes first, either letter by letter or word by word. This reverse text tool splits the input into characters, reverses the list, and rejoins it, with Unicode-aware handling so emoji stay intact. Word mode splits on spaces and reverses the sequence. Everything runs in your browser.",
    "aiSummary": "Mirrors a piece of text by reversing its characters, or reorders it by flipping the sequence of words while keeping each word spelled normally. It handles emoji safely by working on Unicode characters. Limitation: the result is plain reordered text, so display in some scripts or apps may look unexpected.",
    "shortKeyword": "reverse text",
    "longKeywords": [
      "flip text backwards character by character",
      "reverse the order of words",
      "reversing a sentence for a word puzzle"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "When do people flip text backwards character by character?",
        "text": "Flipping text backwards is a common way to make puzzles, create mirror-style captions, or check whether a word reads the same in reverse. Playful headers and social posts also use it. Character mode mirrors every symbol in order, so the last letter becomes the first. Word mode is a different task, because it keeps every word intact and changes only the sequence. Because the tool runs in your browser, the text you paste stays on your device."
      },
      {
        "heading": "How to read the output when you reverse the order of words?",
        "text": "Word mode splits on spaces, so each word stays readable and only its position changes. Punctuation attached to a word moves with that word, which can look odd at the end of a sentence. A sentence ending in a full stop attached to its last word will start with that word and its stop after reversal, so the sentence can read oddly until you edit it. Check the output for these edges before you publish it."
      },
      {
        "heading": "What limits show up when reversing a sentence for a word puzzle?",
        "text": "Reversed text is plain text, so the result may look unexpected in some scripts, fonts or apps. Emoji stay whole in character mode because the method is Unicode-aware, but a reversed string can still read as nonsense to anyone expecting normal letter order. Reversing a second time usually returns the original, though extra spaces may differ. Keep an unedited copy of the source text in case you need to go back to it."
      }
    ],
    "faqs": [
      [
        "Does reversing text change punctuation?",
        "Yes, in word mode punctuation stays attached to its word, so a comma or full stop moves with that word. In character mode every symbol, including punctuation, moves to the opposite position."
      ],
      [
        "Which mode should I pick for a poem?",
        "Pick character mode for a mirror effect or a puzzle, where every letter must flip. Pick word mode for a line of verse you want to read backwards by phrase, since each word keeps its spelling."
      ],
      [
        "Is my text sent anywhere when I reverse it?",
        "No. Processing happens locally in your browser, so the reversing step does not send your text anywhere. Close the tab once you are finished if the text is sensitive."
      ]
    ]
  },
  "remove-line-breaks": {
    "answer": "To remove line breaks means joining hard-wrapped lines into flowing text. This tool can replace breaks with spaces, delete them, or keep paragraph gaps, which is usually what PDF text needs. Use the mode that matches the text's structure. Everything runs in your browser, so the text you paste stays on your device.",
    "aiSummary": "Strips or replaces hard line breaks in pasted text, either joining every line with spaces, removing breaks completely, or keeping blank-line paragraph gaps. Built for text copied from PDFs and emails. Limitation: the paragraph-preserving mode relies on blank lines already being present, so check results before using them.",
    "shortKeyword": "remove line breaks",
    "longKeywords": [
      "how to clean text copied from a PDF",
      "joining broken lines into one paragraph",
      "keeping paragraph gaps when pasting email text"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to clean text copied from a PDF?",
        "text": "PDF text often arrives with a hard break at the end of every visual line, so a sentence is split across several lines when pasted. Email text can do the same when a mail client wraps lines at a fixed width. Cleaning those breaks by hand is slow, and it is easy to miss one. The tool removes or replaces them in one pass, which keeps the wording intact while making the text easier to edit or search."
      },
      {
        "heading": "Which mode fits joining broken lines into one paragraph?",
        "text": "Replace with spaces joins every line into one continuous block, which suits a single short passage or a quote. Remove entirely closes the gaps without adding spaces, so use it only when the lines already carry their own spacing. Keep paragraphs is usually the right fit for PDF cleanup because it joins single breaks while preserving blank-line separations. Try the mode on a short sample first and read the output before you process the full document."
      },
      {
        "heading": "What should you check before trusting the cleaned text?",
        "text": "Look for words that were hyphenated across a line break, since removing the break can leave a stray hyphen. Check headings and list items, because a bullet or number at the start of a line may now sit inside a sentence. Tables and columns copied from PDFs can lose their structure entirely, so review those by hand. The tool changes only line breaks, not the layout around them. Keep a copy of the original for comparison."
      }
    ],
    "faqs": [
      [
        "Is keeping paragraph gaps when pasting email text reliable?",
        "It works when the email already separates paragraphs with blank lines. If the mail client removed those blanks, the mode has nothing to preserve, so check the output and add paragraph spacing by hand where needed."
      ],
      [
        "Can I use this on text that has no line breaks?",
        "Yes, but it will have nothing to change, so the output matches the input. Breaks are the only thing the tool edits, so text without them passes through as it is."
      ],
      [
        "How do I handle hyphenated words after cleaning?",
        "Search the cleaned output for a hyphen followed by a space, which often marks a word split across lines, and rejoin those words by hand. Some hyphens are real, so read each match before editing."
      ]
    ]
  },
  "text-repeater": {
    "answer": "A text repeater copies a word or phrase a chosen number of times and places each copy on its own line. Pick a count such as five, ten, twenty-five or one hundred, and the tool joins the copies with line breaks. It is useful for test data, filler text and layout checks. The work runs in your browser.",
    "aiSummary": "Repeat a word many times online by entering text and choosing a count. The tool joins identical copies with line breaks and runs entirely in the browser. It cannot vary the copies, and output size is capped, so very large repeats are limited.",
    "shortKeyword": "text repeater",
    "longKeywords": [
      "how to repeat text many times",
      "filler text for testing",
      "repeat a word many times online"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to repeat text many times in one list?",
        "text": "Paste a word, phrase, or short sentence into the input and choose how many copies you need. The tool outputs the same line the chosen number of times, with each copy on its own line. This is handy when you need a long column of identical entries to paste into a spreadsheet, a form field, or a test script. Because each copy sits on its own line, you can also count lines or scan the result quickly."
      },
      {
        "heading": "When is filler text for testing useful?",
        "text": "Filler text fills a layout so you can check spacing, wrapping, and scrolling before real content exists. Repeating a short phrase works well for that, since the line lengths stay predictable. Developers also use repeated strings to test input length limits, and writers use them as placeholders in drafts. Choose a phrase that matches the length of the content you plan to replace, because a single word and a full sentence stress a layout in very different ways."
      },
      {
        "heading": "What mistakes should I avoid when repeating a phrase?",
        "text": "The most common mistake is forgetting that the output is a single block, so copying it straight into a document may add unwanted line breaks. Check the count before you copy, since a high multiplier produces a large block that is slow to scroll or edit. Another limit is that the tool repeats text exactly, so it does not vary wording or numbering for you. If you need unique items, a list generator or a spreadsheet fill handle works better than a repeater."
      }
    ],
    "faqs": [
      [
        "Does the text I enter leave my device?",
        "No. Processing runs locally in your browser, so the text you paste is not sent to a server by this tool. You still control where the copied output goes, and you can clear the input at any time."
      ],
      [
        "Can the repeater add numbers to each copy?",
        "No. The tool repeats the exact text you enter, so every line is identical. If you want numbered copies, add the numbers in a spreadsheet or an editor with a column or multi-cursor feature after copying the output."
      ],
      [
        "Why does the output sometimes look very long?",
        "A large count multiplied by a long phrase creates a big block of text. Reduce the count or shorten the phrase to get a smaller result. Output is capped at a set size so that the page stays responsive in your browser."
      ]
    ]
  },
  "title-case-converter": {
    "answer": "A title case converter capitalizes a headline by making major words capitalized and leaving small words such as a, of, and the in lowercase. This one applies the AP-style convention with a fixed list of small words. The first and last words always capitalize, whatever the list says. Each word is checked against that list, so you can copy the result straight into a draft.",
    "aiSummary": "Capitalizes headlines by applying AP-style small-word rules: major words get capitals, short function words stay lowercase in the middle, and the first and last words always capitalize. It cannot judge meaning or house style. Capitalize headlines for a blog post by running the text through it and checking the output.",
    "shortKeyword": "title case converter",
    "longKeywords": [
      "how to title case a headline",
      "capitalize headlines for a blog post",
      "AP-style capitalization for titles"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to title case a headline correctly?",
        "text": "Start by capitalizing the first word and every word that carries meaning, such as nouns, verbs, and adjectives. Then lowercase short function words in the middle of the line, like a, an, of, in, and the. Finally, check that the last word is capitalized even when it is a small word. The converter does these steps for you, so you can paste a full headline and compare the output with your own draft."
      },
      {
        "heading": "What does AP-style capitalization for titles change?",
        "text": "AP-style capitalization for titles keeps a fixed list of short words in lowercase, which is why a headline can look different from a sentence-case version. The list covers small words such as articles, short conjunctions, and short prepositions. Notice that the tool does not judge whether a word is correct for your context; it applies one rule set consistently. If your publication follows a different guide, the same headline may come out with different small words lowercased."
      },
      {
        "heading": "What common mistakes should I avoid with headlines?",
        "text": "A frequent mistake is running the converter on a headline that already has deliberate branding or unusual spelling, which can be overwritten. Another is assuming the output is final for every publication, since house styles differ. Watch hyphenated compounds and words with apostrophes, and review those by eye. Remember that a converter cannot judge meaning, so proper nouns and product names need a manual check before you publish. Keep a copy of your original text in case you need to compare."
      }
    ],
    "faqs": [
      [
        "Does the title case converter store my headlines?",
        "No. Processing runs locally in your browser, so the headlines you paste stay on your device. You can copy the result into your editor and clear the input whenever you like."
      ],
      [
        "Does it handle headlines written in all capital letters?",
        "The converter applies the small-word rules to the words it receives, so an all-caps headline may need lowercasing first. Lowercase the text, then run the converter for the cleanest result. Review the output because a tool cannot tell a true acronym from an ordinary word."
      ],
      [
        "Which words does the converter keep lowercase?",
        "It keeps a fixed set of short function words in lowercase when they fall in the middle of a headline, such as a, an, of, in, and the. The first and last words still capitalize. Check the output against your house style when it differs."
      ]
    ]
  },
  "text-to-binary": {
    "answer": "A text to binary converter turns each character into an 8-bit code made of ones and zeros, then separates the codes with spaces. Paste binary into the same box to decode it, and each group of eight digits maps back to one character. The method is a direct character-code lookup, which makes it well suited to learning and puzzles.",
    "aiSummary": "Converts text into space-separated 8-bit binary, and can decode binary back into readable text. Each character is looked up by its character code and written as eight bits. It is a direct lookup for learning and puzzles, not encryption, and it needs correctly grouped input.",
    "shortKeyword": "text to binary",
    "longKeywords": [
      "convert text into 8-bit binary",
      "binary code for each letter",
      "decode binary back into readable text"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I convert text into 8-bit binary?",
        "text": "Each character in your input is looked up by its character code, and that number is written as eight bits. Eight bits give a group of zeros and ones, so a short word becomes a row of groups separated by spaces. Spaces and punctuation also get their own codes. To go the other way, split the binary into groups of eight and map each group back to a character. Keep the groups aligned, or the decoded text will come out wrong."
      },
      {
        "heading": "What does binary code for each letter look like?",
        "text": "A capital A and a lowercase a have different character codes, so their binary strings differ. Digits, such as the character 1, also have their own codes, which means the digit 1 typed as text is not the same as the binary value 1. Read each group from left to right, because the leftmost bit is the most significant. Comparing a known letter with its output is the quickest way to check your understanding of the mapping."
      },
      {
        "heading": "What mistakes or limits should I watch for?",
        "text": "The most common error is pasting binary with missing or extra spaces, which shifts every later group and produces unreadable characters. Check that each group has exactly eight digits before decoding. Also remember that this tool works on characters, so emoji and characters outside the basic range may not split into one clean byte each. Binary is only a representation; it does not compress or hide your text, and anyone can decode it."
      }
    ],
    "faqs": [
      [
        "Is my text sent anywhere when I convert it?",
        "No. The conversion runs locally in your browser, so the text you paste is not sent to a server by this tool. You can clear the input at any time and copy the result wherever you need it."
      ],
      [
        "Can I use binary to hide a message?",
        "Not in any real sense. Binary is a plain encoding of characters, so anyone who recognizes the format can decode it. Use proper encryption if you need privacy, and treat this tool as a learning aid for representation rather than security."
      ],
      [
        "Does the converter handle spaces between my words?",
        "Yes. A space is a character too, so it receives its own eight-bit code and appears as its own group. When you decode, keep the spaces that separate groups, because they tell the tool where each character starts."
      ]
    ]
  },
  "html-minifier": {
    "answer": "An html minifier removes HTML comments and the whitespace between tags, then collapses runs of spaces to a single space. The output is smaller, which can speed up delivery over a network. The tool keeps the document structure valid while collapsing that whitespace. Use the result as a smaller production copy and keep your readable source.",
    "aiSummary": "This tool can remove html comments and whitespace between tags to produce a smaller file for delivery. It strips comments and collapses spaces while keeping the document structure valid. Its main limit is whitespace-sensitive content, such as preformatted text, which may look different afterward.",
    "shortKeyword": "html minifier",
    "longKeywords": [
      "reduce html file size",
      "minify html for faster pages",
      "remove html comments and whitespace"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I reduce html file size safely?",
        "text": "Start by pasting the markup you plan to publish, not a half-finished draft, because the output is meant to be shipped. The tool removes comments first, then collapses the whitespace between elements and inside long runs of spaces. Those changes can make a noticeable difference in size on template-heavy pages with lots of indentation. Compare the rendered page before and after to confirm nothing shifted, and keep the original file for editing."
      },
      {
        "heading": "What does minify html for faster pages mean?",
        "text": "Minifying means producing the same document with fewer characters, so each byte sent over the network is useful content. Faster delivery is the goal, but the real gain depends on your server, caching, and compression settings. Minification does not replace compression, and the two work well together. Think of it as tidying the file before the server or browser handles it. Measure before and after so you can see whether the change is worth keeping."
      },
      {
        "heading": "Which mistakes can break markup after minifying?",
        "text": "The main risk is over-trusting the output on pages that depend on whitespace, such as preformatted blocks, code samples, or inline text where a space separates two words. Check those sections by eye after minifying. Keep your readable source under version control, so you can always regenerate a smaller copy when the page changes. Avoid minifying a file you still plan to edit by hand, because the compact result is harder to read and review."
      }
    ],
    "faqs": [
      [
        "Does the minifier send my HTML to a server?",
        "No. Processing runs locally in your browser, so the markup you paste is not uploaded by this tool. You can keep your original file untouched and copy only the compressed result when you are ready to publish it."
      ],
      [
        "Should I minify HTML that I edit by hand?",
        "Usually not. Keep the readable version for editing and run the minifier only on the copy you deploy. That way comments and indentation stay available for later changes, and the compact file is generated rather than maintained."
      ],
      [
        "Can minifying break a page that uses preformatted text?",
        "It can, because whitespace inside preformatted blocks carries meaning. Check those sections after minifying, or leave them out of the input. Compare the rendered result to make sure spacing still matches the original."
      ]
    ]
  },
  "json-escape": {
    "answer": "JSON escape means changing quotes, backslashes, and newlines into the backslash sequences that a JSON string requires, so the text can sit safely inside quotes. Unescaping reverses this and turns those sequences back into the original characters. Each quote becomes a backslash followed by a quote, and each newline becomes a backslash followed by n. The rules are fixed by the JSON format itself.",
    "aiSummary": "Escapes text for a JSON string by adding backslashes before quotes and backslashes and turning newlines into backslash-n. It can also unescape a json string value back to the original characters. The main limit is that only standard JSON sequences decode cleanly, so broken input may fail.",
    "shortKeyword": "json escape",
    "longKeywords": [
      "escape quotes in a json string",
      "unescape a json string value",
      "how to escape newlines in json"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I escape quotes in a JSON string?",
        "text": "Paste the raw text into the input and choose escape. Every double quote gets a backslash in front of it, and every backslash doubles so the parser reads it literally. The result can then be placed between two double quotes in a JSON document, API payload, or config file. This is handy when you embed a snippet of code, a message, or a sentence that contains quotation marks in a larger data structure."
      },
      {
        "heading": "How to escape newlines in JSON for a multi-line value?",
        "text": "A newline is a real line break, which JSON strings cannot contain directly. The escape turns it into the two characters backslash and n, so the whole value stays on one line in the file. Tabs and carriage returns follow the same idea with their own sequences. When you unescape, those sequences come back as real line breaks, which is useful for reading a value copied from a log, a database export, or an API response."
      },
      {
        "heading": "Which mistakes happen when escaping JSON by hand?",
        "text": "The most common mistake is escaping twice, which adds more backslashes each time and corrupts the value after parsing. Check whether your input is already escaped before you run it again. Another error is forgetting that single quotes do not need escaping in JSON, so adding backslashes to them adds noise without changing meaning. Finally, remember that escaping is only one layer; the destination system may apply its own encoding on top."
      }
    ],
    "faqs": [
      [
        "Does this tool send my text to a server?",
        "No. Escaping and unescaping run locally in your browser, so the text you paste stays on your device. You can copy the result directly into your editor or request body once it looks right."
      ],
      [
        "Can I unescape text that is not valid JSON?",
        "Unescaping expects the standard JSON sequences, so an unusual or broken sequence may not decode cleanly. Check the input for stray backslashes or missing quotes first. If decoding fails, fix the source value rather than forcing the output."
      ],
      [
        "Should I escape the whole JSON document or only the values?",
        "Only the values. A JSON document is already structured, so you escape each string value that contains special characters, not the braces, brackets, or keys. Escaping the whole document would turn it into one big string and break its structure."
      ]
    ]
  },
  "json-to-yaml": {
    "answer": "A json to yaml converter walks the JSON structure and writes equivalent YAML, using indentation for nesting and dashes for list items. The format is favored for configuration files in tools such as Docker, Kubernetes, and CI pipelines. The two formats describe the same kinds of data: objects, arrays, strings, and numbers. Conversion rewrites the syntax without changing the values.",
    "aiSummary": "Converts JSON into YAML, a readable indentation-based format common in config files. Object keys become mapping entries and arrays become dash-prefixed lists. The method rewrites notation only, aiming to keep values the same after conversion. Its limits are quoting subtleties and missing comments, so test the output before deploying.",
    "shortKeyword": "json to yaml",
    "longKeywords": [
      "convert json to yaml for configs",
      "json yaml parser for config files",
      "keep values the same after conversion"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I convert json to yaml for configs?",
        "text": "Paste your JSON into the input and check that it is valid first, because a missing comma or bracket will stop the conversion. The converter then emits keys as YAML mappings and arrays as dash-prefixed lists, using two-space indentation for each level. Strings are written plainly unless they need quotes, so the output reads more like a hand-written config. Review the result before using it, especially for keys that contain special characters or values that look like numbers or booleans."
      },
      {
        "heading": "Why use a json yaml parser for config files?",
        "text": "A YAML config is easier to scan because it drops braces and quotation marks, so nested settings line up by indentation. That makes it a common choice for files that people read and edit often. A converter lets you start from JSON that a program already produces and turn it into the format a tool expects. The structure stays the same, so you are changing the notation rather than redesigning the data. Keep the JSON as the source of truth when that is easier to generate automatically."
      },
      {
        "heading": "What limits or mistakes should I check after converting?",
        "text": "YAML has its own quirks, such as values that parse differently depending on how they are written. A string like yes or a value with a leading zero can turn into something other than you intended, so compare key values by eye. Also note that JSON has no comments, anchors, or tags, so the output will not include any of those, and you may want to add comments by hand. Test the output in the tool that will read it before you deploy."
      }
    ],
    "faqs": [
      [
        "Will the converter keep my key order?",
        "Key order is not part of the JSON standard, so do not rely on it. Check the result against your original file if entry sequence matters to the program that reads it."
      ],
      [
        "How do I handle a value that looks like a number?",
        "Check values such as numeric-looking strings after conversion. The converter quotes strings only when needed, but a consuming tool may still read a plain-looking value as a number or boolean. If that matters, check the output by eye and quote the value in the YAML before deploying."
      ],
      [
        "Is the converter safe for production config files?",
        "Treat it as a helper rather than a substitute for testing. Run the output through the program that will load it, and review the result against your original JSON before deploying. Keep the JSON source under version control so you can regenerate the YAML."
      ]
    ]
  },
  "yaml-to-json": {
    "answer": "A yaml to json converter reads indentation-based YAML, including keys, nested maps, and lists, and produces equivalent formatted JSON. It targets the common configuration subset of YAML rather than every advanced feature. Use the output when a tool or API expects JSON but your config is written in YAML.",
    "aiSummary": "Converts yaml config into formatted json by reading indentation-based keys, nested maps, and lists. Fix yaml errors before converting, since a parse failure stops the output. It targets the common configuration subset, so advanced features are the main limit.",
    "shortKeyword": "yaml to json",
    "longKeywords": [
      "convert yaml config to json",
      "parse yaml config into json",
      "fix yaml errors before converting"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I convert yaml config to json?",
        "text": "Paste the YAML config into the input and run the conversion. The parser reads keys, nested maps, and lists by their indentation, then writes out the same structure as formatted JSON. Check that indentation uses spaces rather than tabs, because YAML does not accept tabs for nesting. When the output appears, copy it directly into the API request or config file that needs JSON. Keep a copy of the original YAML so you can compare the two if anything looks off."
      },
      {
        "heading": "When should I parse yaml config into json?",
        "text": "Parsing into JSON is useful when the consumer reads only JSON, such as a web API, a JavaScript build step, or a service that does not handle YAML. JSON is stricter and more uniform, so a program can read it with fewer surprises. The conversion keeps the data structure intact, which means you can edit in the friendlier YAML and generate JSON only when a tool needs it. Treat the JSON as a build artifact rather than the file you maintain."
      },
      {
        "heading": "What can go wrong when turning YAML into JSON?",
        "text": "A parse failure usually comes from indentation, a missing colon, or a stray character, and the error can point to a line that is not the real cause. Look at the lines just above the reported position first. Another limit is that the tool targets the common configuration subset of YAML, so advanced features may not convert as you expect. Anchors, custom tags, and multi-document files are the kinds of features to check by hand after converting."
      }
    ],
    "faqs": [
      [
        "Does the converter send my config to a server?",
        "No. The conversion runs locally in your browser, so your YAML stays on your device. Secrets still deserve care, so avoid pasting credentials into any tool, and remove them from examples before sharing the output."
      ],
      [
        "Can I convert a file with multiple YAML documents?",
        "Multi-document files are among the features to check carefully. Split the file into one document per conversion if the tool does not handle the separator, and confirm each JSON output matches what you expected from the original."
      ],
      [
        "Why does my JSON look longer than the YAML?",
        "JSON uses braces, brackets, and quoted keys, so it often takes more characters for the same data. The extra syntax is what makes JSON strict and easy for programs to read. Length alone is not a sign of a conversion error."
      ]
    ]
  },
  "xml-formatter": {
    "answer": "An xml formatter adds line breaks between elements and indents each level by its nesting depth, producing a readable tree. The data and attribute values stay the same; only whitespace between tags changes. Reading the hierarchy becomes much easier, which helps when you inspect a config, feed, or export. Formatting does not check whether the document is valid against a schema.",
    "aiSummary": "Use this to format xml online for inspection: it indents each element by its nesting depth so the tree shape is visible. It changes only whitespace between tags, leaving values intact. The main limit is that it does not validate the document against a schema.",
    "shortKeyword": "xml formatter",
    "longKeywords": [
      "pretty print xml for reading",
      "indent xml by nesting depth",
      "format xml online for inspection"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I pretty print xml for reading?",
        "text": "Paste the compact or messy XML into the input and run the formatter. The output places each element on its own line, which makes parent and child relationships visible at a glance. Attributes stay on the opening tag, and text content keeps its characters. Once formatted, you can scan for a missing closing tag, find a repeated section, or spot where an unexpected element sits. Keep your original file as the untouched source of truth."
      },
      {
        "heading": "How does indent xml by nesting depth work?",
        "text": "Each opening tag increases the depth by one, and its children are indented one step further than it is. Closing tags return to the matching level, so the indentation shows the tree shape. Siblings at the same depth line up in a column, which helps you compare repeated records. Because the indent follows nesting rather than content, a deeply nested element appears far to the right, a visual hint that the structure is complicated."
      },
      {
        "heading": "What limits should I keep in mind with XML formatting?",
        "text": "Formatting improves readability but does not validate the document, so a file can look neat and still break a strict parser. Namespaces, schema rules, and encoding declarations lie outside what indentation reveals. Whitespace inside text nodes can matter in some documents, so a formatted copy may not be safe to use where exact spacing counts. Use the formatted version for reading and review, and keep the compact original for anything sensitive to whitespace."
      }
    ],
    "faqs": [
      [
        "Does the formatter send my XML anywhere?",
        "No. Formatting runs locally in your browser, so the XML you paste is not sent to a server by this tool. You can clear the input at any time and copy the formatted result into your own editor."
      ],
      [
        "Why does my XML still look hard to read after formatting?",
        "Formatting fixes indentation, but it cannot shorten long element names or simplify a complex structure. Look at the depth of the tree and the repeated sections, and consider a viewer that collapses branches if the file is very large."
      ],
      [
        "Should I format XML before committing it to version control?",
        "It depends on the project. Formatting can make diffs easier to read, but it also changes whitespace in the file. Agree on one convention with your team and apply it consistently, so that reformatting does not create noisy changes."
      ]
    ]
  },
  "mime-types-lookup": {
    "answer": "A mime type lookup matches a file extension to its MIME type, the value servers send in the Content-Type header so browsers know how to handle a file. Search by extension or by keyword to find the standard type and a short description. MIME types tell software what kind of file it is. A wrong value can cause a file to display or download incorrectly.",
    "aiSummary": "Maps a file extension to its content type. Search by extension or keyword to see the standard type and a short description. The main limit is that the extension is only a hint, so consider what happens with the wrong mime type before you trust a result.",
    "shortKeyword": "mime type lookup",
    "longKeywords": [
      "find the correct content type for a file",
      "file extension to mime type mapping",
      "what happens with the wrong mime type"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I find the correct content type for a file?",
        "text": "Type a file extension such as .png into the search box, or type a keyword such as image to see matching types. Each result shows the standard MIME type string and a short description. Copy that string into your server configuration, response header, or upload form where it is needed. If several types share a keyword, read the descriptions to pick the one that matches your file format. Double-check the spelling, since a near-match can return a different type."
      },
      {
        "heading": "How is a file extension to mime type mapping used?",
        "text": "The mapping is a lookup from the end of a file name to the content type that describes its format. Servers use it when they set the Content-Type header, and browsers use that header to decide whether to render, play, or download a response. Developers also check it when a file upload is rejected or when a download opens with the wrong program. Keep in mind that the extension is only a hint, so the mapping works well when filenames are reliable."
      },
      {
        "heading": "Which mistakes or limits matter with content types?",
        "text": "A common mistake is trusting the extension alone, because a renamed file can carry a type that does not match its contents. Another is copying a type that is not the standard one, such as an invented vendor string, when a well-known type exists. Also remember that application/octet-stream is a generic fallback for unknown binary data, so it tells the browser little about the file. Check the type against the format you actually serve before publishing."
      }
    ],
    "faqs": [
      [
        "Is the lookup performed on my device?",
        "Yes. The search runs locally in your browser, so the extension or keyword you type is not sent to a server by this tool. You can search as many times as you like."
      ],
      [
        "Why might one extension have more than one type?",
        "Some extensions have historical or vendor-specific types alongside the standard one, so a search can return several rows. Choose the type that matches the format and the software that will read the file. Read each short description before you copy a value."
      ],
      [
        "Should I edit the server config by hand after looking up a type?",
        "Usually you add the mapping to your server or framework config, following its own syntax. Test one file in the browser after the change, and check the response headers to confirm the type reached the client as intended."
      ]
    ]
  },
  "htaccess-redirect-generator": {
    "answer": "An htaccess redirect generator writes ready-to-paste Apache rules for 301 redirects, forced HTTPS, a single www variant, and trailing-slash normalization. The rules use mod_rewrite, with RewriteEngine, RewriteCond, and RewriteRule lines for each scenario. A 301 status tells search engines the move is permanent. Review the output before uploading, because a loop in redirect rules can break a site.",
    "aiSummary": "Generates Apache .htaccess rules that use mod_rewrite for 301 redirects, forced HTTPS, one www variant, and trailing-slash handling. The core method is RewriteEngine, RewriteCond, and RewriteRule lines per scenario, with the 301 status signalling a permanent move. Redirect old pages with mod_rewrite, then test each rule because conflicting rules can cause loops.",
    "shortKeyword": "htaccess redirect generator",
    "longKeywords": [
      "create a 301 redirect in htaccess",
      "force https and one www version",
      "redirect old pages with mod_rewrite"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How do I create a 301 redirect in htaccess?",
        "text": "Open the generator, choose the scenario, and enter the old and new paths. The tool writes a RewriteRule line that matches the old path and sends a 301 response to the new one. Place the output in the .htaccess file at the site root, or in the directory where the rules should apply. Test a few old URLs after uploading to confirm each one lands on the right page with the correct status."
      },
      {
        "heading": "When should I force https and one www version?",
        "text": "Forcing HTTPS sends visitors from the plain http address to the secure version, so the site has one canonical address scheme. Choosing one www variant does the same for the hostname, sending either www or the bare domain to the other. Pick the version you already use in your sitemap and links, then redirect the rest to it. Using one variant avoids the same page appearing under two addresses, which can split signals between them."
      },
      {
        "heading": "What mistakes can cause redirect loops or errors?",
        "text": "The most serious mistake is a loop, where two rules keep sending a request back and forth and the page never loads. This can happen when HTTPS or www rules conflict with an existing rule or a host-level setting. Test each rule on its own before combining them. Also avoid redirecting a page to a URL that itself redirects, since each extra hop slows visitors and adds delay. Check the final status code with a browser tool or command-line request."
      }
    ],
    "faqs": [
      [
        "Can these rules break a site if pasted in the wrong place?",
        "They can. A rule placed in the wrong directory may apply to pages you did not intend, or a conflicting rule above it can cause a loop. Upload to a staging copy first and check several URLs before making the change live."
      ],
      [
        "Do I need mod_rewrite enabled on my server?",
        "The generated rules depend on mod_rewrite and RewriteEngine, so the server must support them. Hosts differ in how they configure it, so confirm with yours before relying on it. Without it, the rules will not work."
      ],
      [
        "Should I redirect every old URL one by one?",
        "Not always. Map only the pages that have moved, and let unchanged pages stay as they are. For a large set of moved pages, plan the mapping in a spreadsheet first so that every old path has one clear target."
      ]
    ]
  },
  "reorder-pdf-pages": {
    "answer": "Reorder PDF pages means changing the sequence of pages in a document without editing their content. This reorder PDF pages tool loads your file, shows each page in a list, and lets you move pages up or down with arrows. When you save, it builds a new PDF using the order you chose. The processing happens in your browser, so the original file is not changed.",
    "aiSummary": "Reorder PDF pages in a browser-based tool that lists each page and moves it up or down, then builds a new PDF in the chosen sequence. The core method is list-based reordering with no upload. It is useful to organize pages in a PDF file, but it does not repair or edit page content.",
    "shortKeyword": "reorder pdf pages",
    "longKeywords": [
      "how to rearrange pages in a PDF",
      "change the page order of a PDF",
      "organize pages in a PDF file"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to rearrange pages in a PDF?",
        "text": "Use this tool when a PDF has pages in the wrong sequence, such as a scanned stack that came out backwards, a cover page that needs to move to the front, or an appendix that belongs at the end. Load the file, then use the arrows beside each page to move it up or down. Each move changes only the position of that page; the page content itself is not edited. Once the list matches what you need, save the result as a new PDF in that sequence."
      },
      {
        "heading": "What does the page list show after loading?",
        "text": "After the PDF loads, every page appears in a list in its current order. Read the list from top to bottom: the first entry becomes page one in the saved file. Use the arrows to shift an entry up or down, and watch how the rest of the list adjusts. The list is the only thing that defines the output, so it is the right place to check your plan before saving."
      },
      {
        "heading": "What mistakes or limits should you watch for?",
        "text": "A common mistake is saving before checking the final list, which can lock in a sequence you did not intend. Another is expecting the tool to edit page content. It only changes order, so it is not a way to fix typos or crop margins. Long documents take more care to sort by hand, so move pages in smaller groups and confirm the list as you go. Keep the original file until you have checked the saved copy."
      }
    ],
    "faqs": [
      [
        "Can I change the page order of a PDF more than once?",
        "Yes. After you save the rearranged document, you can load the new PDF again and move its pages further. Each save creates a fresh file in the sequence you last set, so you can keep adjusting until the order is right. Keep the earlier version if you want to compare."
      ],
      [
        "Do I have to move every page before saving?",
        "No. Pages you leave where they are keep their current position in the list. Only move the pages that need to change, then save. The saved file follows the list exactly as it looks at that moment, so check the final sequence before you save."
      ],
      [
        "Is my PDF sent anywhere during reordering?",
        "No. The tool is set to process locally, so the page list and the new PDF are built inside your browser. Nothing is sent to a server as part of reordering. Your file stays on your device unless you choose to share the saved copy yourself."
      ]
    ]
  },
  "edit-pdf-metadata": {
    "answer": "Edit PDF metadata means viewing and changing the document properties stored inside a PDF, such as its title, author, subject, and keywords. This edit PDF metadata tool loads the existing values into editable fields. When you save, it writes your changes back into the file and updates the modification date. Processing runs in your browser, so the document is not uploaded.",
    "aiSummary": "Edits a PDF's title, author, subject and keywords by reading the existing document properties and writing new values back into the file. The method is direct field replacement with an updated modification date. Limitation: it changes only document properties, so visible page content is not altered.",
    "shortKeyword": "edit pdf metadata",
    "longKeywords": [
      "change pdf author and title",
      "view and edit PDF document properties",
      "clear a pdf metadata field"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "What does it mean to view and edit PDF document properties?",
        "text": "Every PDF can carry hidden details called document properties, including a title, author, subject, and keywords. Search tools, file libraries, and document managers often read these fields when they list or sort files. This tool shows the current values so you can see what the file declares about itself, then lets you replace them. The page text and images are not part of this step. Reviewing them before you share a file helps you spot an old author name or a misleading title."
      },
      {
        "heading": "How to change PDF author and title?",
        "text": "Load the PDF and the form fills with its existing values. Edit the title, author, subject, or keywords fields directly, then save. Clearing a field removes the value it held, while changing a field replaces what was there before. After saving, reload the file in a viewer that shows document properties to confirm the new values appear. Some viewers keep showing older values, so a fresh open is the simplest check."
      },
      {
        "heading": "Should I clear a PDF metadata field I do not need?",
        "text": "Clearing a field can be useful when an old keyword or a personal name is still stored in the file, but it has limits. Metadata is only one layer: the visible pages, embedded images, and any text inside the document are not changed by this tool. A metadata field may also be set again by the program that exports the PDF, so check the result after your next export. Keep a copy of the original file in case you need to compare values later."
      }
    ],
    "faqs": [
      [
        "Will my edits show up in every PDF viewer?",
        "Most viewers read the standard document properties, so the new title and author usually appear after you reopen the file. Some programs display their own cached information, and a few may not show every field. Open the saved file in a second viewer to check."
      ],
      [
        "Does this tool send my document anywhere?",
        "No. Processing is set to local, so the PDF is opened and rewritten entirely in your browser. Its metadata never needs a server to be read or saved. Sharing the finished copy is the only step that moves it off your device, and that is your decision."
      ],
      [
        "When should I update the author or subject field?",
        "Author and subject fields help people and software identify a file when it is shared or filed. A clear title and subject can make a document easier to locate in a folder or library. Updating them is a quick way to tidy a file before you send it on, though it does not change what the pages say."
      ]
    ]
  },
  "pdf-info-viewer": {
    "answer": "A PDF info viewer is a tool that reports a document's structure and metadata without opening it for reading. This tool reads the page count, page dimensions in points, file size, title, author, creator, creation date, PDF version, and encryption status. The information is gathered with PDF.js inside your browser, so the file stays on your device.",
    "aiSummary": "Reads a PDF's page count, page dimensions, file size, and metadata such as title, author, and creation date. It parses the document structure with PDF.js and shows the results in a table. Limitation: it reports what the file declares, so the values can be missing or wrong if the creator left them blank.",
    "shortKeyword": "pdf info viewer",
    "longKeywords": [
      "check pdf page count and size",
      "how to see pdf page dimensions",
      "read pdf document properties"
    ],
    "exampleInputs": {},
    "sections": [
      {
        "heading": "How to see PDF page dimensions?",
        "text": "Page dimensions tell you how large each page is, which matters when you plan printing, scanning, or resizing. The tool reads the size from the document structure and presents it in the results table. Dimensions are shown in points, a print unit, so compare them with the same unit on any other document you check. Check the values across pages if the document mixes page sizes, since one file can hold more than one format."
      },
      {
        "heading": "How do you read PDF document properties in the table?",
        "text": "The results table groups information into sections you can scan quickly. Page count and file size give you a sense of scope, while the title, author, subject, and creation date describe the document itself. The PDF version and an encryption flag tell you how the file was built and whether it is protected. Read the table from top to bottom, then check any blank rows, since missing values usually mean the creator did not set them."
      },
      {
        "heading": "What limits come with the info a file reports?",
        "text": "The viewer shows only what the file contains, so a missing or wrong title reflects the document rather than a fault in the tool. Some values are optional in the PDF format, and creators can fill them in inconsistently. A file that is encrypted may limit what can be read, so the report can be shorter than you expect. Treat the results as a description of the file, not a guarantee that the content inside is correct."
      }
    ],
    "faqs": [
      [
        "Can I check PDF page count and size before printing?",
        "Yes. Load the file and read the page count and page dimensions in the results table. Compare the dimensions with the paper size your printer uses, which helps you avoid surprises. The file is inspected in your browser, so nothing is uploaded for this check."
      ],
      [
        "Do I need to install anything to use this viewer?",
        "Nothing needs to be installed. It runs in a browser page, so you open the page, load a PDF, and read the table. Nothing else is needed for the basic check."
      ],
      [
        "Why is the PDF version useful to know?",
        "The PDF version shows which edition of the format the file follows, which can affect which readers handle it well. Encryption status is listed next to it, because a locked file may limit what the viewer can read. Use both values when you troubleshoot a file that will not open correctly."
      ]
    ]
  },
  "military-time-converter": {
    "answer": "Military time is the 24-hour clock format that runs from 00:00 to 23:59, with no AM or PM labels. This military time converter changes a 12-hour time such as 2:30 PM into its 24-hour equivalent, 14:30, and back again. For times after 12 noon, add 12 to the hour; 12 AM becomes 00. The conversion runs in your browser.",
    "aiSummary": "Converts clock times between 12-hour AM/PM notation and 24-hour military time. It uses a fixed rule: add 12 to afternoon hours, and map 12 AM to 00 and 12 PM to 12. Limitation: it converts one entered time at a time and does not account for time zones or daylight saving changes.",
    "shortKeyword": "military time converter",
    "longKeywords": [
      "convert 12 hour time to 24 hour",
      "how to read 24 hour clock times",
      "what is military time in 24 hour format"
    ],
    "exampleInputs": {
      "time": "14:30"
    },
    "sections": [
      {
        "heading": "How do you convert 12 hour time to 24 hour?",
        "text": "Start with the clock time you have. If it is an AM time, keep the hour unless it is 12 AM, which becomes 00. If it is a PM time, add 12 to the hour unless it is 12 PM, which stays 12. Minutes never change in the conversion, so 2:30 PM becomes 14:30. Use the same logic in reverse when you convert 24-hour times back. Check the result against the time of day to confirm it makes sense."
      },
      {
        "heading": "How to read 24 hour clock times?",
        "text": "A 24-hour clock counts from 00:00 at midnight through 23:59 just before midnight again. Noon is 12:00, and 13:00 is 1 PM, so any hour above 12 is afternoon or evening. Reading the number as a sequence of hours and minutes is easier than memorizing pairs, because the hour alone tells you the part of the day. Times such as 14:30 are simply the afternoon time you already know, written in a different format."
      },
      {
        "heading": "What mistakes should you avoid with military time?",
        "text": "A frequent mistake is treating 12:00 as midnight, when in military time it is noon. Another error is mixing up 12 AM and 12 PM when you write times quickly. Keep the AM or PM label until the conversion is done, so the direction of the change stays clear. The converter only changes notation, so it cannot tell you which time zone an appointment uses or whether a schedule is correct. Double-check any time that affects travel or a flight plan before you rely on it."
      }
    ],
    "faqs": [
      [
        "What is military time in 24 hour format?",
        "It is a way of writing the time of day as a number from 00:00 to 23:59, with no AM or PM. The hour runs from 0 to 23 and the minutes follow after the colon. Military time is used in fields such as aviation and the armed forces, where clear, unambiguous times matter."
      ],
      [
        "How do I convert a 24-hour time to AM or PM?",
        "Subtract 12 from any hour from 13 to 23 and add PM, so 14:30 becomes 2:30 PM. Hours 00 through 11 are AM, with 00 read as 12 AM. Hour 12 is PM and stays as 12 PM. Minutes do not change in either direction."
      ],
      [
        "Why does 12 PM stay 12 in military time?",
        "Noon is the midpoint of the day, so the 24-hour clock keeps it at 12:00 rather than adding 12. Afternoon hours from 1 PM to 11 PM gain 12, but 12 PM is already the twelfth hour. This keeps noon and midnight from being confused when the clock runs from 00:00 onward."
      ]
    ]
  },
  "rectangle-area-calculator": {
    "answer": "A rectangle area calculator finds how much flat space a four-sided shape covers, using area equals length times width. It also reports perimeter, the distance around the edges, which equals two times the sum of length and width. Enter both sides in the same unit, and the result is given in that unit squared for area and in that unit for perimeter.",
    "aiSummary": "Computes the area and perimeter of a rectangle from its length and width. Area multiplies the two sides, and perimeter adds them and doubles the result. The method is plain arithmetic, so the main limitation is that both sides must use the same unit and the shape must truly be a rectangle.",
    "shortKeyword": "rectangle area calculator",
    "longKeywords": [
      "find area of a rectangle from sides",
      "how to calculate rectangle perimeter from length",
      "area and perimeter of a rectangle"
    ],
    "exampleInputs": {
      "length": "12",
      "width": "5"
    },
    "sections": [
      {
        "heading": "How to calculate rectangle perimeter from length?",
        "text": "Perimeter is the total distance around the outside of a rectangle, so it adds all four sides. Because opposite sides are equal, you add length and width once, then double that sum. For a length of 12 and a width of 5, add the two sides, then double the sum. Keep the units consistent so the total stays meaningful. This is the amount of fencing or edging needed for a flat rectangular shape, which is one common reason people run the calculation."
      },
      {
        "heading": "How do you read the area result?",
        "text": "Area tells you how much flat space the rectangle covers inside its edges. The number is always in square units, so a result from centimeter sides is in square centimeters. Area is not the same as perimeter, which measures the boundary instead of the surface. Read the two results together when you plan materials, because one describes coverage and the other describes edges. Using the result this way keeps the planning step simple."
      },
      {
        "heading": "What mistakes should you avoid with length and width?",
        "text": "The most common mistake is mixing units, such as entering one side in feet and the other in inches. The result can look reasonable but be wrong. Another point is that the order of the two sides does not matter for these formulas, since multiplication and addition both work either way. Also remember that this shape assumes four right angles. A slanted quadrilateral needs a different method. Check each side against the drawing before you calculate, since a single typo changes both results."
      }
    ],
    "faqs": [
      [
        "Can I find area of a rectangle from sides I measured myself?",
        "Yes. Measure the length and width of the shape in the same unit, enter both values, and read the area. Area is found by multiplying the two sides. Measuring the sides carefully matters more than the arithmetic, since small measuring errors carry directly into the result."
      ],
      [
        "Does the calculator work for a shape that is not a rectangle?",
        "No. The formulas assume four sides with right angles, so an irregular or slanted shape does not fit them. For those shapes, split the figure into smaller rectangles or use a method that matches the actual geometry."
      ],
      [
        "When should I use perimeter instead of area?",
        "Use perimeter when the question is about the edges, such as how much border, trim, or fencing a rectangular space needs. Use area when the question is about coverage, such as how much floor or paint a surface needs. Choosing the right measure first avoids buying the wrong quantity."
      ]
    ]
  },
  "llm-vram-calculator": {
    "answer": "An LLM VRAM calculator estimates how much GPU memory a language model needs for inference. It adds the weight memory, which is parameters times bytes per weight, to the KV cache, which is two times layers times KV heads times head dimension times context tokens times batch times bytes per element. The total is then increased by your overhead percentage.",
    "aiSummary": "Computes estimated GPU memory for a transformer language model, from parameter count, weight format, layer count, KV heads, head dimension, context length and batch size. Weights and cached keys and values are summed, then an overhead allowance is added. Runtime buffers, fragmentation and paged attention are not modelled, so real usage can differ.",
    "shortKeyword": "llm vram calculator",
    "longKeywords": [
      "how much gpu memory does an llm need",
      "kv cache memory for long context",
      "estimate memory for quantized model weights"
    ],
    "exampleInputs": {
      "params": "8",
      "quant": "q4_k_m",
      "context": "8192",
      "gpu": "12"
    },
    "sections": [
      {
        "heading": "How much GPU memory does an LLM need?",
        "text": "Use this tool before you download a model or rent a card, to check whether the weights and the cache for your planned context will fit. Enter the parameter count and the weight format first, because they set the largest fixed block. Then add the layer, KV head and head dimension values from the model's configuration file, since the cache scales with them. Context length and batch size set how large the cache gets for each request. The result is a planning estimate, so leave headroom on the card for the runtime itself."
      },
      {
        "heading": "Why does KV cache memory for long context matter?",
        "text": "The KV cache stores keys and values for every token in the context, so its size grows in step with the context length and the batch. Each stored value takes the bytes set by the cache precision option, which can differ from the weight format. In the result, the cache line is shown separately from the weights, so you can see whether a longer prompt or a bigger batch is the thing that pushes the total past your card. Read the total as the figure after overhead, not as the sum of the bare numbers."
      },
      {
        "heading": "Where do estimates like this go wrong?",
        "text": "The most common mistake is treating the number as a guarantee. Runtime buffers, activation memory, fragmentation and features such as paged attention change real usage, and runtime choices change what is reserved. Another mistake is mixing units: the tool reports gigabytes in powers of ten and the GPU check uses gibibytes, so a figure that looks close to the card size may still fail. Finally, the layer and head values must come from the same model variant, because the cache depends on them directly."
      }
    ],
    "faqs": [
      [
        "How do I estimate memory for quantized model weights?",
        "Pick the weight format that matches your file. Each option has a fixed byte count per weight, such as two bytes for FP16 or half a byte for the smallest integer option, and the tool multiplies that by the parameter count. GGUF options use approximate effective bits, so their results are approximate too."
      ],
      [
        "Can this estimate an unusual attention design?",
        "Only roughly. The cache formula assumes every layer stores keys and values for each KV head, which is the usual layout for transformer decoders. Designs that share or compress the cache need a smaller effective KV head count, so you may need to adjust that input by hand."
      ],
      [
        "What GPU memory figure should I compare against?",
        "Compare the total against the free memory your GPU reports after the operating system and other programs take their share, not the advertised size on the box. Enter that free amount in GiB in the GPU field. Set the field to zero to skip the check and see only the total."
      ]
    ]
  },
  "rag-chunking-vector-storage-calculator": {
    "answer": "A RAG chunk size calculator estimates how many chunks a document set produces for a chosen chunk size and overlap. Per document, chunks equal the tokens minus overlap, divided by chunk size minus overlap, rounded up. It then multiplies chunks by the embedding dimension and bytes per value to size the raw vectors, and adds index overhead and metadata.",
    "aiSummary": "Counts text chunks, vector storage and embedding tokens for a corpus, given document count, tokens per document, chunk size, overlap, embedding dimension and precision. Overlap is embedded twice, which raises the token total. Index overhead is a multiplier you set, not a database constant, and no real text is tokenized.",
    "shortKeyword": "rag chunk size calculator",
    "longKeywords": [
      "how many chunks does a document need",
      "vector storage size for embeddings",
      "chunk overlap and embedding token cost"
    ],
    "exampleInputs": {
      "docs": "1000",
      "chunk": "512",
      "overlap": "64",
      "precision": "f16"
    },
    "sections": [
      {
        "heading": "How many chunks does a document need?",
        "text": "Use this planner before you index a corpus, so you know roughly how many vectors you will store and how many tokens the embedding job will process. Set the document count and the average tokens per document, then choose the chunk size your pipeline will use. The results show chunks per document and in total, which is the number you need when you size a storage tier or estimate an embedding bill."
      },
      {
        "heading": "How do I read the chunk and token totals?",
        "text": "Chunks per document is rounded up, so a short file still counts as one chunk. The total chunk count multiplies that by the document count, and the raw vector size follows from the embedding dimension and the stored precision. The index line adds your overhead multiplier and the metadata bytes for each chunk. Check the embedding token total as well, because it counts every chunk in full and is the figure that drives the price."
      },
      {
        "heading": "Where do chunk plans go wrong?",
        "text": "A common mistake is treating the index multiplier as a fixed fact. It is an assumption you set, and real vector databases vary with their index type and settings. Another is forgetting that tokens are estimated, not counted: this tool does not tokenize your text, so the tokenizer of your embedding model decides the real number. Also remember that the sizes cover vectors and metadata only, not the original document text, which you must budget separately."
      }
    ],
    "faqs": [
      [
        "How should I think about chunk overlap and embedding token cost?",
        "Overlap repeats the last part of each chunk at the start of the next one. Those repeated tokens are embedded again, so the embedding total is larger than the corpus. The result compares the embedding total with the corpus size, so you can see the cost of the overlap you chose."
      ],
      [
        "How do I estimate vector storage size for embeddings?",
        "Multiply the chunk count by the embedding dimension and the bytes per stored value, which is four for float32 and two for float16. Then apply your index multiplier and add the metadata bytes for each chunk. The result is an estimate that depends on the assumptions you enter."
      ],
      [
        "Does the tool count tokens in my text?",
        "No. You enter a token count per document, and the tool does not split your text. Use the tokenizer of your embedding model to measure real token counts, then enter those figures for a more reliable plan."
      ]
    ]
  },
  "prompt-caching-savings-calculator": {
    "answer": "A prompt caching calculator estimates input cost when a provider reuses a repeated prompt prefix at a lower read price. It bills cached prefix tokens at a write multiplier on a miss and a read multiplier on a hit, and uncached tokens at the base price. Enter your own prices, so the result is an estimate and not a quote.",
    "aiSummary": "Estimates input token spend with and without prompt caching, given your prices, daily requests, hit rate and multipliers. Each request blends write and read prices by hit rate. Output tokens, storage fees and cache expiry are left out, so treat the figure as an educational estimate, not professional advice.",
    "shortKeyword": "prompt caching calculator",
    "longKeywords": [
      "when does prompt caching pay off",
      "cached prefix write and read multipliers",
      "compare daily input cost with caching"
    ],
    "exampleInputs": {
      "price": "3",
      "prefix": "20000",
      "requests": "1000",
      "hit": "90"
    },
    "sections": [
      {
        "heading": "When does prompt caching pay off?",
        "text": "Prompt caching suits applications that send the same long block of text on many requests, such as a fixed system prompt, a reference document or a tool schema. The provider stores that prefix so later requests read it at a lower price. Use this calculator to check whether your traffic repeats the prefix often enough to offset the extra cost of the first write. Low traffic or a prefix that changes every call rarely benefits."
      },
      {
        "heading": "How do cached prefix write and read multipliers change cost?",
        "text": "Each request pays the base price for uncached tokens. The cached prefix is billed at the write multiplier when it is first stored, and at the read multiplier on each later hit. The hit rate is the share of requests that find the prefix already stored. Raising the hit rate moves the blended price of the prefix toward the read multiplier, which is why traffic volume and request spacing matter as much as the list price."
      },
      {
        "heading": "Where do caching estimates mislead?",
        "text": "The main mistake is using a provider's published multipliers from memory. Enter the values from the current price sheet you are billed under, because this tool does not know them. Also remember that output tokens, storage fees, cache lifetimes and expiry are not modelled, and batch discounts are not included. Savings shown here are an educational estimate, not professional advice, so check a few real invoices before you commit a budget."
      }
    ],
    "faqs": [
      [
        "Can I compare daily input cost with caching on and off?",
        "Yes. The calculator prices the same traffic twice: once with every prefix token at the base price, and once with the write and read multipliers applied to the prefix. The difference is the daily saving, and the break-even hit rate shows the lowest hit rate at which caching starts to pay off."
      ],
      [
        "How do I find my own cache hit rate?",
        "Estimate it from your traffic pattern: count how many requests reuse the same prefix within the cache lifetime, and divide by all requests. Your provider's usage data may show this directly. Start with a conservative figure, then recalculate with real numbers."
      ],
      [
        "Does the calculator use live provider prices?",
        "No. Every price and multiplier is an input you type in, so the result is only as current as the figures you enter. Check the pricing page you are billed under before you rely on the totals, and update the fields whenever the rates change."
      ]
    ]
  },
  "agent-loop-token-cost-calculator": {
    "answer": "An AI agent cost calculator estimates the tokens and dollars a multi-turn agent uses when it re-sends its growing conversation on every model call. Each turn adds the assistant output and tool result to the history, so total input grows roughly with the square of the turn count. Totals are summed per turn from the prices you enter.",
    "aiSummary": "Calculates total input and output tokens across an agent loop where each model call resends the system prompt, user message and all prior turns. Inputs are per-turn output and tool result sizes plus per-million prices. It assumes constant turn sizes, no provider caching and no truncation, so real agents will differ.",
    "shortKeyword": "ai agent cost calculator",
    "longKeywords": [
      "why does agent cost grow each turn",
      "budget a multi-step tool calling loop",
      "re-read history share of cost"
    ],
    "exampleInputs": {
      "turns": "12",
      "system": "2000",
      "tool": "1500",
      "inPrice": "3"
    },
    "sections": [
      {
        "heading": "Why does agent cost grow each turn?",
        "text": "Every model call in an agent loop includes the full conversation so far: the system prompt, the first user message, each earlier assistant reply and each tool result. This calculator is for planning a run before you launch it, such as comparing a short loop with ten model calls against a longer one. Set the per-turn sizes to match a realistic trace from your own logs, because the total depends heavily on how big the tool results are."
      },
      {
        "heading": "How should I read the re-read history share of cost?",
        "text": "The result splits input tokens into the first send of each token and the extra sends that repeat earlier history. A large share means most of the bill pays for the same text again on later turns. In that case, shortening tool outputs, trimming old turns or caching the stable prefix can do more than changing the model. Compare turn one with the final turn too, since the last call often costs several times as much as the first."
      },
      {
        "heading": "Where does this estimate fall short?",
        "text": "The model assumes every turn has the same size, so it cannot show a run where early steps are short and late steps carry large documents. It also ignores provider caching, which can cut the repeated input cost, and any context truncation the agent framework applies. Any extra tokens beyond the output field are not counted. Because these cost figures depend on your inputs, treat them as an educational estimate, not professional advice, and confirm them against real usage."
      }
    ],
    "faqs": [
      [
        "How do I budget a multi-step tool calling loop?",
        "Estimate the number of model calls, then size a typical tool result and assistant reply from a real trace. Enter those values, and check the turn-one and final-turn costs to see the range. Add a margin, because loops often run longer than planned."
      ],
      [
        "Does a longer system prompt cost more on every turn?",
        "Yes, if it is re-sent in full. The system prompt counts as input on every model call in this calculator, so each extra token there adds to every turn. Prompt caching can reduce the repeated part, but this calculator does not model that discount."
      ],
      [
        "Can I use this for a single model call?",
        "Set Turns to one and the calculator reduces to a single request, with the system prompt, user message and output priced once. For anything with several calls, the growth term is what matters."
      ]
    ]
  },
  "local-llm-vs-cloud-api-breakeven-calculator": {
    "answer": "An LLM cost calculator compares the cost of running a model on your own hardware with a cloud API price. It spreads hardware cost over its lifetime, adds electricity for the hours under load, and divides by the monthly tokens that throughput allows. Break-even is the monthly volume at which your fixed and energy costs equal what the cloud API would charge for the same tokens.",
    "aiSummary": "Compares monthly cost of self-hosting a language model, from amortised hardware, electricity and measured throughput, with a cloud API price per million tokens. Reports cost per million tokens and the monthly volume where local becomes cheaper. Idle power, maintenance, staff time and quality differences are excluded, so the result is an estimate.",
    "shortKeyword": "LLM cost calculator",
    "longKeywords": [
      "electricity cost per million tokens",
      "when does local hardware pay back",
      "measure throughput for a self-hosted setup"
    ],
    "exampleInputs": {
      "hardware": "2500",
      "watts": "350",
      "hours": "8",
      "cloud": "10"
    },
    "sections": [
      {
        "heading": "How do I work out electricity cost per million tokens?",
        "text": "Start with the monthly energy bill for the machine. Multiply its draw in watts, converted to kilowatts, by the hours it runs under load each day and by the days in a month, then by your electricity price. Add the monthly hardware share to that energy cost, then divide by the monthly tokens the throughput allows. The machine's idle draw is not included here, so running it always-on adds a cost this calculator does not show. Use the power figure that you measure at the wall where possible."
      },
      {
        "heading": "When does local hardware pay back against the cloud?",
        "text": "Payback depends on volume. Below the break-even volume, paying per token is cheaper, because you still carry the full monthly hardware cost. Above it, the hardware is spread over more tokens, so the local cost per million falls below the cloud price. Read the payback months as the time to recover the purchase at full capacity, which assumes the machine runs at the utilisation you entered every month. Real projects rarely stay at full capacity for the whole life of the hardware."
      },
      {
        "heading": "Where can a local versus cloud comparison mislead?",
        "text": "The biggest risk is comparing a local model with a cloud model as if they were equal. Quality, context limits and latency can differ, so the cheaper option may not do the same job. Throughput is also easy to overstate; measure it on your own setup under your own prompts, not on a marketing figure. Maintenance, staff time, resale value and idle power are left out. Use the result as an educational estimate, not professional advice, before committing to hardware spending."
      }
    ],
    "faqs": [
      [
        "How do I measure throughput for a self-hosted setup?",
        "Run your real workload on the hardware, count the output tokens generated over a steady stretch, and divide by the seconds it took. Repeat with your typical prompt lengths and batch size. Use that sustained figure, not the peak number from a single short test."
      ],
      [
        "Should I include the cost of a machine I already own?",
        "You can. If the hardware is already paid for, set its cost to zero or to a resale-based figure, and the comparison becomes mostly electricity against the cloud price. Keep the amortisation lifetime in mind if you plan to replace the machine."
      ],
      [
        "What if my hardware is shared with other work?",
        "Then only part of the machine's time serves this model, so the utilisation input should reflect that share. Lower utilisation raises the local cost per million tokens, because the same hardware cost is spread over fewer tokens."
      ]
    ]
  },
  "llm-tokens-per-second-estimator": {
    "answer": "An LLM tokens per second calculator gives theoretical bounds for generation speed. Decode is capped by memory bandwidth, because each token streams the weights, so the ceiling is bandwidth times efficiency divided by bytes read per token. Prefill time to first token is estimated from compute, as two times parameters times prompt tokens divided by usable FLOPS.",
    "aiSummary": "Gives upper-bound decode speed in tokens per second from model size, bytes per parameter, memory bandwidth and efficiency, plus a lower-bound time to first token from prompt length, peak compute and utilisation. Real throughput is lower because batching, scheduling and attention cost are ignored.",
    "shortKeyword": "llm tokens per second calculator",
    "longKeywords": [
      "why is LLM decode memory bound",
      "estimate time to first token for prompts",
      "compare memory bandwidth across hardware options"
    ],
    "exampleInputs": {
      "params": "8",
      "bytes": "0.5",
      "bandwidth": "1000",
      "prompt": "1000"
    },
    "sections": [
      {
        "heading": "Why is LLM decode memory bound?",
        "text": "At batch size one, generating each token needs the model weights read from memory once, so memory speed limits how fast tokens can appear. Compute is often idle during that stretch. Halving the bytes per parameter roughly doubles this ceiling, which is why the bytes-per-parameter input matters so much. The same logic explains why a larger model or a slower memory system both reduce the ceiling. This calculator is for reasoning about that trade-off before you pick a model size or a quantization format."
      },
      {
        "heading": "How should I read the prefill lower bound?",
        "text": "Prefill processes the whole prompt in parallel, so its time grows with prompt length and is usually limited by compute. The estimate uses the common approximation of two floating point operations per parameter per prompt token, then divides by peak compute scaled by your utilisation. Because the estimate ignores attention cost that grows with context, network hops and scheduling, the number is a floor, not a forecast. Use it to see how a long prompt changes the wait before the first token."
      },
      {
        "heading": "Can I compare memory bandwidth across hardware options?",
        "text": "Yes, for the decode ceiling, because bandwidth is the main input there. Enter each device's memory bandwidth and keep the model, bytes per parameter and efficiency the same, so only the hardware changes. The result is a ranking of ceilings, not a benchmark. Measured speed depends on the runtime, the quantization kernels, the thermal state and context length, none of which this tool models. Treat the figures as a planning starting point, not a promise of speed."
      }
    ],
    "faqs": [
      [
        "How do I estimate time to first token for prompts?",
        "Enter the prompt length in tokens, then the compute figure for your device and the utilisation you expect. The tool returns a lower bound in milliseconds, which grows roughly in proportion to prompt length. Long prompts with large contexts will be slower than this floor."
      ],
      [
        "What does the KV cache input add?",
        "It adds bytes read per token on top of the weights, so the decode ceiling falls as the cache grows. Use the cache size you expect at your target context length. Leave it at zero to see the weights-only ceiling, which is the simplest starting point."
      ],
      [
        "Why are my real results slower than the ceiling?",
        "The ceiling assumes the bandwidth is used at your efficiency figure and nothing else limits the run. Real systems also pay for scheduling, attention cost at long context, and framework overhead. Expect measured speed to sit below this bound, and measure it on your own setup."
      ]
    ]
  },
  "lora-trainable-parameters-calculator": {
    "answer": "A LORA rank alpha calculator counts the trainable parameters a low-rank adapter adds to a model. For each adapted matrix of size input by output, LORA adds rank times the sum of those two sizes, multiplied across the adapted modules and layers. It also reports the scaling factor alpha divided by rank and the adapter size in megabytes.",
    "aiSummary": "Calculates trainable LORA parameters for a transformer from hidden size, layer count, rank, adapted module set and MLP width. Adds the alpha over rank scaling factor and adapter size. Assumes square attention projections, so grouped-query models are overcounted; optimiser state and base weights are excluded.",
    "shortKeyword": "lora rank alpha calculator",
    "longKeywords": [
      "how many trainable parameters in lora",
      "lora scaling factor alpha over rank",
      "estimate adapter file size for fine-tuning"
    ],
    "exampleInputs": {
      "hidden": "4096",
      "layers": "32",
      "rank": "16",
      "modules": "qkvo"
    },
    "sections": [
      {
        "heading": "How many trainable parameters in LORA does a model get?",
        "text": "Use this tool when you plan a fine-tune and want to know how much the trainable part changes with rank and module choice. Trainable count is what the optimiser updates, while the base weights stay frozen. Raising rank increases the count linearly, and adding MLP projections adds more than attention alone. Read the result as the size of the adapter rather than of the full model, since the frozen base still has to fit in memory."
      },
      {
        "heading": "How should I read alpha and the scaling factor?",
        "text": "The update is multiplied by alpha divided by rank, so doubling alpha at the same rank doubles the scale, while raising rank with alpha fixed lowers it. This tool shows that factor so you can see the effect before you train. The rsLoRA variant replaces the divisor with the square root of rank, which changes how the scale behaves as rank grows. Choose the scaling convention your training library uses, because the same numbers mean different things under each."
      },
      {
        "heading": "How do I estimate adapter file size for fine-tuning?",
        "text": "The file size is the parameter count times the bytes per stored value, where half precision stores two bytes and single precision stores four, reported in megabytes using ten to the sixth bytes. Optimiser state, base weights and any merged copy are not part of this number, so the disk you need for a full training run is larger. Also remember that the parameter count assumes standard attention layouts; grouped-query models will have a smaller count than shown. Treat the figure as an estimate of the adapter alone."
      }
    ],
    "faqs": [
      [
        "What does the LORA scaling factor alpha over rank do?",
        "It multiplies the learned update before it is added to the frozen weight, so it sets how strongly the adapter changes the model. Changing alpha or rank changes this scale, which can interact with the learning rate you choose."
      ],
      [
        "Can I use this for a model with a different hidden size?",
        "Yes, as long as you enter that model's hidden size, layer count and intermediate size from its configuration. The formula only depends on those numbers and the chosen modules, so it applies to any standard transformer of that shape."
      ],
      [
        "Are the base model parameters used in the calculation?",
        "Not for the adapter count. Base model size is shown only to express the adapter as a percentage of the full model. The adapter count comes from hidden size, layers, rank and modules, so the base figure should match the model you are tuning."
      ]
    ]
  },
  "softmax-temperature-calculator": {
    "answer": "A softmax temperature calculator turns raw logits into next-token probabilities by dividing each by the temperature, exponentiating and normalising. Lower temperature sharpens the distribution toward the top token, while higher temperature flattens it. Top-k and top-p then cut the tail and renormalise the rest, so you can see the effect of each setting.",
    "aiSummary": "Converts a list of logits into token probabilities with temperature scaling, then applies optional top-k and top-p filtering and renormalises the survivors. Reports the probabilities before and after truncation and their entropy in bits. Individual libraries may order or combine filters differently, and min-p and repetition penalties are not modelled.",
    "shortKeyword": "softmax temperature calculator",
    "longKeywords": [
      "temperature reshapes token probabilities",
      "nucleus sampling with top p cutoff",
      "entropy of a token distribution in bits"
    ],
    "exampleInputs": {
      "logits": "2.0, 1.0, 0.5, 0.0, -1.0, -2.0",
      "temperature": "0.8",
      "topk": "3",
      "topp": "0.9"
    },
    "sections": [
      {
        "heading": "How temperature reshapes token probabilities?",
        "text": "Temperature divides every logit before the softmax, so it controls how peaked the output distribution is. A temperature below one makes high logits dominate and suits tasks that need predictable wording. A temperature above one spreads probability across more tokens, which adds variety and also adds risk of unlikely choices. Setting temperature to zero is a separate case, since the formula divides by it, so the tool asks for a value above a small minimum."
      },
      {
        "heading": "How does nucleus sampling with top p cutoff work?",
        "text": "Top-p keeps the smallest group of most likely tokens whose cumulative probability reaches the cutoff, then renormalises that group. Top-k instead keeps a fixed count, however the probability is spread. The two filters can behave very differently: on a sharp distribution top-p may keep one token, while on a flat one it may keep many. Check the candidate list after each change to see which rule is doing the work."
      },
      {
        "heading": "Where do these sampling sliders mislead?",
        "text": "The logits in this tool are typed in by you, so the probabilities describe your example, not a particular model's behaviour. Real models may apply extra steps such as repetition penalties or a min-p filter, which change the outcome and are not included. Temperature and top-p also interact, so changing both at once can be hard to read. Compare one setting at a time, and remember that the entropy shown is a property of the distribution, not a measure of answer quality."
      }
    ],
    "faqs": [
      [
        "How do I read the entropy of a token distribution in bits?",
        "Entropy is the average surprise of the distribution, measured in bits. A single token with probability one gives zero, and a spread-out distribution gives a larger number. After truncation it usually falls, because fewer candidates remain. Compare the before and after values to see how much a filter narrowed the choice."
      ],
      [
        "Can I use these results to choose settings for a specific model?",
        "Use them to build intuition, not as proof for one model. Every model produces its own logits, so the same temperature can look very different on another system. Test your chosen settings on your actual prompts, and check the output quality directly."
      ],
      [
        "How many candidates should I keep?",
        "There is no single right number. A small top-k keeps the list tight and predictable, while a larger one leaves room for variety. Judge the choice by the candidate list shown here, then by the text your model actually writes on your prompts."
      ]
    ]
  },
  "classification-metrics-calculator": {
    "answer": "A confusion matrix calculator takes true positives, false positives, false negatives and true negatives from a binary classifier and returns the usual metrics. Precision is true positives over predicted positives, recall is true positives over actual positives, and accuracy is the share of all examples that are correct. MCC summarises all four counts in one value.",
    "aiSummary": "Computes accuracy, precision, recall, specificity, F-beta, balanced accuracy and Matthews correlation from the four counts of a binary classifier. Zero denominators show n/a instead of a guessed value. Counts can be fractional, but ROC-AUC needs per-example scores and is not computed, and multi-class problems are out of scope.",
    "shortKeyword": "confusion matrix calculator",
    "longKeywords": [
      "accuracy misleading on imbalanced data",
      "choose between precision and recall",
      "matthews correlation for imbalanced classifiers"
    ],
    "exampleInputs": {
      "tp": "80",
      "fp": "10",
      "fn": "20",
      "tn": "890"
    },
    "sections": [
      {
        "heading": "Why is accuracy misleading on imbalanced data?",
        "text": "Accuracy counts every correct prediction equally, so a classifier that always predicts the common class can look strong when that class dominates. Entering your counts here shows the damage: accuracy may stay high while recall for the rare class collapses. The tool is useful for seeing that gap, because it lists precision, recall, specificity and balanced accuracy side by side for the same four counts. Use it before you report one number from a skewed test set."
      },
      {
        "heading": "How do I choose between precision and recall?",
        "text": "Precision answers how many of the positive calls were right, while recall answers how many real positives were found. Which one matters more depends on the cost of each error. A spam filter that blocks legitimate mail needs high precision, while a screening test that misses cases needs high recall. Changing the decision threshold usually moves the two in opposite directions, so compare them at the operating point you will actually deploy, not at a default."
      },
      {
        "heading": "Where do these metrics go wrong?",
        "text": "The counts must come from one fixed threshold and one test set. Mixing counts from different thresholds or averaging folds without care gives a number that matches no real classifier. Fractional counts are accepted for averaged results, but you should say so when you report them. Remember that the tool does not compute ROC-AUC, because that needs a score for every example, and that multi-class problems need a separate per-class or averaged approach. Zero denominators show n/a on purpose."
      }
    ],
    "faqs": [
      [
        "Why use matthews correlation for imbalanced classifiers?",
        "MCC uses all four cells of the confusion matrix, so it stays informative when one class is rare. It ranges from minus one to one, where values near zero mean the classifier is little better than chance. It is a single number, but read it alongside precision and recall rather than instead of them."
      ],
      [
        "How do I find the four counts for my data?",
        "Tally them from a labelled test set after you choose a threshold. True positives are positive examples predicted positive, and so on for the other cells. Count on held-out data, not the training set, or the numbers will look better than they are."
      ],
      [
        "What beta should I pick for F-beta?",
        "Beta above one weights recall more than precision, and below one weights precision more. The default of one gives equal weight, which is the familiar F1 score. Pick beta from how costly a missed positive is compared with a false alarm."
      ]
    ]
  },
  "word-error-rate-calculator": {
    "answer": "A word error rate calculator compares a reference transcript with a hypothesis, usually from speech recognition, and counts the substitutions, deletions and insertions needed to match them. WER is those errors divided by the number of reference words. It can exceed one hundred percent, and the character error rate applies the same method to letters.",
    "aiSummary": "Scores a transcript against a reference by word error rate and character error rate, from a Levenshtein alignment that counts substitutions, deletions and insertions. Text is split on whitespace and optionally normalised for case and punctuation. Scores can exceed one hundred percent, and the split between error types can vary between tools.",
    "shortKeyword": "word error rate calculator",
    "longKeywords": [
      "measure speech recognition accuracy for transcripts",
      "count substitutions deletions and insertions",
      "normalise text before scoring a transcript"
    ],
    "exampleInputs": {
      "reference": "the cat sat on the mat",
      "hypothesis": "the cat sit on mat",
      "normalise": "raw"
    },
    "sections": [
      {
        "heading": "How do I measure speech recognition accuracy for transcripts?",
        "text": "Use this tool after you run a recogniser on audio that already has a trusted human transcript. Paste the human version as the reference and the machine output as the hypothesis. The word error rate then tells you how far the output is from the reference, relative to the length of the reference. Lower is better, and the same test set should be used when you compare two systems, otherwise the numbers are not comparable."
      },
      {
        "heading": "How should I read substitutions, deletions and insertions?",
        "text": "The tool reports three error counts that add up to the numerator of the score. A substitution is a wrong word in place of the right one, a deletion is a reference word the system missed, and an insertion is an extra word it added. Two systems with the same WER can have different mixes, which matters when you are fixing a specific problem, such as dropped words in a meeting. Read the counts together with the score rather than the score alone."
      },
      {
        "heading": "Should I normalise text before scoring a transcript?",
        "text": "Normalisation makes the score about words rather than capitals and punctuation. With it on, the tool lowercases text and replaces punctuation with spaces, while apostrophes stay. Turn it off when case or punctuation is part of what you measure, such as in a formatted output. Remember that each text is limited in length, so long recordings should be scored in segments and then combined by summing their counts, not by averaging their rates. The same setting should be used on both sides."
      }
    ],
    "faqs": [
      [
        "How do I count substitutions deletions and insertions by hand?",
        "Align the two word lists so that matching words line up, using the fewest changes. A mismatched word in the same slot is a substitution, a missing one is a deletion, and an extra one is an insertion. Add those counts, then divide by the reference word count to check the score."
      ],
      [
        "Does capitalisation count as an error?",
        "Only if you choose raw text. With lowercase normalisation on, Hello and hello are the same word, so no error is counted. With it off, the case difference is a substitution, which adds to the error rate."
      ],
      [
        "How long a transcript can I score?",
        "Each text is limited in characters, so very long recordings need to be split. Score each segment against its own part of the reference, then add the error counts across segments and divide by the total reference words. Averaging the percentages instead can give a different answer."
      ]
    ]
  },
  "vector-similarity-calculator": {
    "answer": "A cosine similarity calculator measures how closely two vectors point in the same direction. It divides their dot product, the sum of matching components multiplied together, by the product of their two lengths. The result runs from minus one to one. This page also reports Euclidean and Manhattan distance for the same pair.",
    "aiSummary": "Computes dot product, cosine similarity, cosine distance, the angle between two vectors, their norms, and L2 and L1 distances. Method: dot product divided by the product of the norms. Limitation: cosine ignores vector length, and zero vectors give no result.",
    "shortKeyword": "cosine similarity calculator",
    "longKeywords": [
      "how to compare two embedding vectors",
      "dot product vs cosine similarity",
      "check whether a vector has unit length"
    ],
    "exampleInputs": {
      "a": "2, 0, 5, 1",
      "b": "1, 3, 4, 2"
    },
    "sections": [
      {
        "heading": "How to compare two embedding vectors with this tool?",
        "text": "Embedding search, recommendation and retrieval systems all need a way to score how alike two vectors are. Enter two vectors of the same length, such as the output of an embedding model, and the tool lists the common measures together: dot product, cosine similarity, cosine distance, the angle between the vectors, the norm of each one, and the Euclidean and Manhattan distances. Seeing them side by side helps you choose a measure that matches how your system was built, before you set any thresholds in code."
      },
      {
        "heading": "How should I read dot product vs cosine similarity?",
        "text": "Read cosine similarity first when vector length should not matter: it lies between minus one and one, where one means the same direction, zero means perpendicular and minus one means opposite. Dot product also depends on length, so a long vector can score high even when its direction is only loosely aligned. Distances behave the other way: smaller Euclidean or Manhattan values mean closer vectors. The angle field converts similarity to degrees for intuition. If an input is all zeros, the similarity shows n/a."
      },
      {
        "heading": "What mistakes should I avoid with these vector measures?",
        "text": "The most common mistake is treating one number as universal. A cosine threshold that works for one embedding model can be meaningless for another, so calibrate on your own data. Vectors must have the same length, and an all-zero vector has no direction, so cosine similarity is undefined. Also remember that unnormalized vectors make dot product and cosine disagree. The tool checks norms against unit length but does not change your data, and it says nothing about retrieval quality."
      }
    ],
    "faqs": [
      [
        "Can I check whether a vector has unit length?",
        "Yes. The tool reads the norm of each vector and flags it when it is within a very small tolerance of one. For such vectors cosine similarity equals the dot product, so both give the same ranking. Otherwise, divide each vector by its own norm first."
      ],
      [
        "Does the order of the two vectors change the result?",
        "No. Dot product, cosine similarity and both distances are symmetric, so swapping Vector A and Vector B gives the same value. The angle and norms are also unchanged. Both vectors still need equal length."
      ],
      [
        "Does this calculator store or upload my vectors?",
        "No. The calculation runs locally in your browser, so the vectors you enter stay on your device and are not sent to a server. That lets you test real embedding values from internal data without uploading them, though your own data policy still applies. The results are only as good as the vectors you provide."
      ]
    ]
  },
  "adc-resolution-calculator": {
    "answer": "An ADC resolution calculator shows how finely an N-bit converter divides its input range. The LSB, the smallest voltage step, equals the reference voltage divided by two to the power N. Ideal SNR is 6.02 times N plus 1.76 dB for a full-scale sine wave, and ENOB is found from a measured SINAD. It models an ideal unipolar converter only.",
    "aiSummary": "Computes step size, code count, ideal SNR and effective number of bits for an N-bit converter, plus the output code for a chosen input. Method: reference voltage divided by two to the power N, with SNR from the six-dB-per-bit rule. Limitation: ideal, unipolar converters only; real offset, gain and noise errors are not modelled.",
    "shortKeyword": "adc resolution calculator",
    "longKeywords": [
      "calculate lsb step size voltage",
      "enob from measured sinad value",
      "adc code for an input voltage"
    ],
    "exampleInputs": {
      "bits": "10",
      "vref": "5",
      "vin": "2"
    },
    "sections": [
      {
        "heading": "How do I calculate LSB step size voltage?",
        "text": "The least significant bit, or LSB, is the smallest change in input voltage that moves the output code by one step. The tool finds it by dividing the reference voltage by two raised to the power of N, where N is the resolution in bits, because the converter splits the full range from zero to the reference into that many codes. Use the LSB as a yardstick: a change smaller than one LSB is lost in quantisation, and the step gets smaller as resolution rises."
      },
      {
        "heading": "How to read the ADC code for an input voltage?",
        "text": "The output code is the input voltage divided by the LSB, rounded down and kept between zero and the largest code. The quantisation error shows how far the input sits above the code step, which is the part of the voltage the converter cannot represent. Read a small error as the input sitting just above a code step, not as a fault in the converter. Compare the measured SINAD against the ideal SNR: a gap between them, expressed as ENOB, indicates how many useful bits the real converter delivers."
      },
      {
        "heading": "What mistakes should I avoid with this ADC estimate?",
        "text": "Do not treat the ideal SNR as the performance you will measure. Real converters add offset, gain error, nonlinearity and clock jitter, which this model leaves out, so the measured SINAD is usually lower. Bipolar and differential input ranges are not covered either, so check the datasheet before mapping a signal onto this unipolar model. Also, the 1.76 dB term assumes a sine wave; other waveforms have a different crest factor and need their own calculation."
      }
    ],
    "faqs": [
      [
        "Can I get ENOB from measured SINAD value?",
        "Yes. Enter the SINAD your test reports in decibels and the tool applies the standard relation, subtracting 1.76 and dividing by 6.02, to give effective bits. That figure is the resolution a real converter behaves like at that input, so a 12-bit part with a poor SINAD may deliver far fewer useful bits."
      ],
      [
        "What happens if the input voltage is above the reference?",
        "The code is clamped to the largest value the converter can output, so the result shows the top code rather than a higher number. Check that your signal stays inside zero to the reference voltage, because a real converter also saturates, but its exact behaviour depends on the part."
      ],
      [
        "Why does a larger bit count reduce the LSB?",
        "The range from zero to the reference is split into two to the power N codes, so each extra bit doubles the number of codes and halves the step. Moving from 8 bits to 9 bits, for example, halves the LSB at the same reference voltage. Adding a bit does not add real accuracy if noise already dominates."
      ]
    ]
  },
  "ieee-754-converter": {
    "answer": "An IEEE 754 converter turns a decimal number into its sign, exponent and mantissa bits, and back again. It reads the decimal exactly, rounds to the nearest representable value with ties to even, and shows the hex word for half, bfloat16, single or double precision. Use it to check how 0.1 is actually stored.",
    "aiSummary": "Converts decimal numbers to IEEE 754 bit fields and hex for four floating-point formats, and converts hex back to its exact decimal value. Method: round the decimal to the nearest representable value, then pack sign, biased exponent and fraction. Limitation: encoding writes only the default quiet NaN, so NaN payloads are not kept.",
    "shortKeyword": "ieee 754 converter",
    "longKeywords": [
      "convert decimal to ieee 754 bits",
      "decode a hex word to decimal",
      "check rounding error of a float value"
    ],
    "exampleInputs": {
      "mode": "encode",
      "format": "bfloat16",
      "value": "3"
    },
    "sections": [
      {
        "heading": "How do I convert decimal to IEEE 754 bits?",
        "text": "Pick a format, enter a decimal and choose encode. The tool first reads your text exactly as a fraction rather than through a binary double, then rounds it to the nearest value the format can hold, with ties going to even. It then splits the result into sign, exponent and mantissa fields. Half precision and bfloat16 use fewer bits, so they round more coarsely, while double precision stores the most detail. Compare the hex word with the bit fields to see how each part is laid out."
      },
      {
        "heading": "How do I decode a hex word to decimal?",
        "text": "Set the mode to hex to decimal and paste the bits. Choose the format that matches where the word came from, because the same hex digits mean different numbers under single and double precision. The result is the exact decimal value that word stores, which can be much longer than the number you started with. To check it by hand, read the sign bit, then the exponent against its bias, then the fraction."
      },
      {
        "heading": "What mistakes should I avoid with float conversions?",
        "text": "Do not expect a decimal such as 0.1 to be stored exactly; the gap is the rounding error, and the tool reports it so you can see the size. Watch the format as well, because bfloat16 keeps the exponent range of single precision but has far less fraction precision, so a value can fit in one format and round badly in another. Also note that NaN payloads are not preserved when encoding, so any custom payload bits are lost."
      }
    ],
    "faqs": [
      [
        "Can I use it to check rounding error of a float value?",
        "Yes. Enter the decimal you need, encode it, and read the difference between the stored value and what you typed. That gap is the rounding error for the chosen format, and it shrinks as the format gets wider. Use the result to decide whether a format is precise enough before writing firmware or test code."
      ],
      [
        "Which format suits machine learning weights?",
        "The tool does not recommend a format, but its fields show what each keeps. Bfloat16 keeps single precision's exponent range with fewer fraction bits, which is why it is common for training. Half precision has more fraction bits but a smaller range, so large values can overflow."
      ],
      [
        "Does decoding need the same format as encoding?",
        "Yes. Both directions use the format you select, so a word written as binary32 must be decoded as binary32 to give the original value. Decoding it as binary64 reads the same bits with a different layout and gives a different number. Check the format of the source before trusting the output."
      ]
    ]
  },
  "pcb-trace-width-calculator": {
    "answer": "A trace width calculator estimates the narrowest copper track that carries a set current while staying within your allowed temperature rise. It uses the empirical IPC-2221 relation, which links current, temperature rise and cross-sectional area, then converts the area to width using copper weight. The result is an estimate for planning, not a design sign-off.",
    "aiSummary": "Computes the minimum width of a copper trace for a given current, allowed temperature rise, copper weight and layer, with approximate DC resistance and voltage drop over a length. Method: the empirical IPC-2221 power law for cross-section, converted to width. Limitation: ignores planes, neighbouring traces and airflow.",
    "shortKeyword": "trace width calculator",
    "longKeywords": [
      "find minimum trace width for current",
      "size trace width for copper weight",
      "estimate pcb trace resistance from length"
    ],
    "exampleInputs": {
      "current": "3",
      "rise": "10",
      "oz": "2",
      "layer": "internal"
    },
    "sections": [
      {
        "heading": "How do I find minimum trace width for current?",
        "text": "Enter the current you expect the trace to carry and the temperature rise you can accept above ambient. The tool solves the IPC-2221 relation for the cross-sectional area, which grows as current rises and as allowed rise falls, then divides by the copper thickness to get a width in mil and millimetres. Treat the figure as a minimum. Round up to the next standard width in your layout tool, since a wider track only lowers resistance and temperature."
      },
      {
        "heading": "How do I size trace width for copper weight?",
        "text": "Copper weight is the thickness in ounces per square foot, and the tool converts each option to a thickness in mil. Heavier copper gives a thicker track, so the same current needs a narrower width, which saves board space. Keep the layer setting honest as well: internal traces run hotter because they lose heat less easily, so the same current calls for a wider internal track. Check the number against the layer and copper you actually order."
      },
      {
        "heading": "What mistakes should I avoid with trace width results?",
        "text": "The curves are conservative and cover only a limited range, roughly up to 35 A and 10-100 °C, so treat results outside that range with caution. Do not assume the estimate accounts for planes, neighbouring traces or airflow, which it ignores. Remember that IPC-2152 is a different method and is not implemented here. Finally, a width that passes a current check does not prove a safety-critical board is safe, so verify with your fabricator and test."
      }
    ],
    "faqs": [
      [
        "Can I estimate PCB trace resistance from length?",
        "Yes, when you enter a trace length. The tool uses resistance equals resistivity times length divided by cross-sectional area, with copper resistivity near 20 °C. The result is approximate because it ignores the warming that current causes. For a 50 mm run, the drop is then current times that resistance."
      ],
      [
        "What does the layer setting change in the result?",
        "Choosing internal switches the constant from 0.048 to 0.024, which halves the current capability of a given cross-section and so raises the width the tool reports. Resistance uses the computed cross-section, so it also changes with the layer."
      ],
      [
        "Does the tool work above 35 A?",
        "The IPC-2221 curves are described as covering roughly up to 35 A, so results above that range are less reliable. The formula still computes a number, but treat it as a rough starting point. For heavy currents, consider wider traces or copper pours and confirm the design with a thermal test or your fabricator's guidance."
      ]
    ]
  },
  "crc-calculator": {
    "answer": "A CRC calculator computes a cyclic redundancy check, a short checksum that detects corrupted data on serial links. It divides the message bits by a fixed polynomial over GF(2), using the parameters of the chosen standard. Paste ASCII text or hex bytes, pick CRC-8, CRC-16/CCITT-FALSE, CRC-16/MODBUS or CRC-32, and read the result in hex and decimal.",
    "aiSummary": "Computes CRC-8, CRC-16/CCITT-FALSE, CRC-16/MODBUS or CRC-32 for ASCII text or hex bytes, shown in hex and decimal, with Modbus wire order. Method: bitwise polynomial division over GF(2) using each standard's width, initial value and reflection settings. Limitation: custom polynomials and lookup-table code generation are not included.",
    "shortKeyword": "crc calculator",
    "longKeywords": [
      "verify a checksum on a serial frame",
      "CRC-32 checksum of hex bytes",
      "calculate Modbus RTU frame CRC"
    ],
    "exampleInputs": {
      "algo": "modbus",
      "mode": "hex",
      "data": "01 03 00 00 00 0A"
    },
    "sections": [
      {
        "heading": "How do I verify a checksum on a serial frame?",
        "text": "Compute the CRC over the data bytes your device sends, then compare the result with the two check bytes appended to the frame. For Modbus, the checksum is sent low byte first, so the tool shows the wire order next to the hex and decimal values. If the receiver computes the same value over the same bytes, the frame is consistent. A mismatch means the data or the check bytes changed in transit or were calculated with different settings."
      },
      {
        "heading": "How do I read the CRC-32 checksum of hex bytes?",
        "text": "Choose hex bytes as the input mode when your data comes from a register dump or a packet capture, and type the bytes in pairs. The tool reports the checksum in hex and decimal, so you can match it against a datasheet value or another program. Check the algorithm first, because each choice uses a different width, initial value and reflection, and the same bytes give a different result under each. Use the standard check string to confirm your setup before trusting your own data."
      },
      {
        "heading": "What limits should I keep in mind with CRC checks?",
        "text": "A CRC detects accidental corruption, not tampering. Anyone can compute the same value for altered data, so it cannot prove that a message is authentic. It covers only the bytes you feed it. In Modbus RTU the address byte is part of the checked frame, so include it in the input when you check a full frame. Other CRC variants, custom polynomials and generated lookup-table code are not part of this tool, so use a dedicated library for those."
      }
    ],
    "faqs": [
      [
        "Can I calculate Modbus RTU frame CRC here?",
        "Yes. Choose CRC-16/MODBUS, paste the frame bytes in hex, and the tool returns the CRC with its two bytes in transmission order, low byte first. The output also shows the frame with the CRC already appended."
      ],
      [
        "Which input format should I use for binary data?",
        "Choose hex bytes. ASCII mode encodes your typed characters as UTF-8 first, so it cannot express arbitrary byte values such as a raw zero byte. Hex mode lets you enter exact byte values, which is what a protocol frame or memory dump gives you."
      ],
      [
        "Does the choice of algorithm change the CRC for the same data?",
        "Yes. Each algorithm uses its own width, polynomial, initial value and reflection rules, so the same input gives a different checksum under each. The standard check string 123456789 is useful for confirming your setup, because every algorithm has a published value for it. If your device disagrees with the tool, compare the settings before suspecting the data."
      ]
    ]
  },
  "i2c-pull-up-resistor-calculator": {
    "answer": "An I2C pull-up resistor sets the rise time on SDA and SCL. The minimum value keeps the sink current within the limit of a device pulling the line low, and the maximum keeps the rising edge fast enough for the speed mode. This calculator returns both limits for a single pull-up per line and suggests a standard value between them.",
    "aiSummary": "Gives the minimum and maximum pull-up resistance for an I2C line from supply voltage, low-level output voltage, sink current, bus capacitance and speed mode, plus a nearby E24 value. Method: minimum from sink current, maximum from the rise-time RC limit. Limitation: one pull-up per line, ignoring leakage and resistor tolerance.",
    "shortKeyword": "i2c pull-up resistor",
    "longKeywords": [
      "choose pull-up resistor value for i2c bus",
      "check rise time with bus capacitance",
      "how to pick a standard resistor value"
    ],
    "exampleInputs": {
      "vcc": "3.3",
      "iol": "3",
      "cb": "100",
      "mode": "fast"
    },
    "sections": [
      {
        "heading": "How do I choose pull-up resistor value for I2C bus?",
        "text": "Start from your supply voltage, the low-level output voltage the driver guarantees, and the sink current it can take. Those set the lowest resistor that keeps the line from drawing too much current when it is pulled low. Then pick the speed mode and total bus capacitance, which set the highest resistor that still gives a fast enough rising edge. The tool suggests a standard value between those two limits, ideally near the middle on a log scale."
      },
      {
        "heading": "How do I check rise time with bus capacitance?",
        "text": "The rise-time limit scales with bus capacitance, so adding sensors, cable or long traces pushes the maximum resistance down. Enter the total capacitance of the line, not one device. Speed mode also changes the limit: Standard mode allows a much slower edge than Fast-mode Plus. If the tool reports that the minimum is above the maximum, the bus cannot meet that speed with a single pull-up, and you should reduce capacitance or choose a slower mode."
      },
      {
        "heading": "What mistakes should I avoid with pull-up sizing?",
        "text": "Do not size only from the minimum. A value at the lower limit draws the most current from every device on the line, which can exceed power budgets. Do not forget that resistor tolerance, input leakage and very low supplies change the answer, and this tool does not model them. Also avoid choosing a value above the maximum just to save power, because the edges will then be too slow to meet the speed mode."
      }
    ],
    "faqs": [
      [
        "How to pick a standard resistor value when no E24 fits?",
        "When no E24 value falls inside the window, the tool shows the geometric mean of the two limits instead, which is not a standard part. Try the E96 series next, and check that your choice still keeps sink current and rise time within limits."
      ],
      [
        "Does the speed mode change the minimum resistance?",
        "No. The minimum depends only on supply voltage, the low-level output voltage and the sink current, so it stays the same in every speed mode. Only the maximum changes, because the allowed rise time is shorter in faster modes. That is why Fast-mode Plus usually leaves the narrowest window."
      ],
      [
        "What changes with more than one pull-up on a line?",
        "Parallel pull-ups lower the effective resistance, so the sink current rises when the line is pulled low. This estimate assumes one pull-up per line, so recalculate with the equivalent value and check both limits if you add another."
      ]
    ]
  },
  "timer-prescaler-calculator": {
    "answer": "A timer prescaler calculator finds the divider and reload values that give a target update frequency from a known timer clock. The timer divides its clock by the prescaler plus one and then counts to the auto-reload value plus one, so both registers are one less than the divisors. The tool searches every prescaler value and keeps the closest match.",
    "aiSummary": "Finds the PSC prescaler and ARR auto-reload register values that produce a chosen update frequency from a timer clock, reporting the frequency error in ppm and the period. Method: search every prescaler and pick the reload closest to the target. Limitation: assumes an up-counting timer with no repetition counter.",
    "shortKeyword": "timer prescaler calculator",
    "longKeywords": [
      "calculate PSC and ARR for timer frequency",
      "timer interrupt period from frequency",
      "choose 16-bit or 32-bit counter width"
    ],
    "exampleInputs": {
      "fclk": "72000000",
      "ftarget": "1000",
      "width": "16"
    },
    "sections": [
      {
        "heading": "How do I calculate PSC and ARR for timer frequency?",
        "text": "Enter the timer clock in hertz and the frequency you want the timer to update at. The tool loops over every prescaler value from zero upward, works out the reload value that would give the target at that divider, and keeps the pair with the smallest error that fits the chosen counter width. The result is shown as register values, ready to write. Check the clock settings in your configuration, because the timer clock is often not the same as the CPU clock."
      },
      {
        "heading": "How do I read the timer interrupt period from frequency?",
        "text": "The period is the inverse of the achieved update frequency, not the target, so a small error will shift it slightly. Check the reported error in ppm: a value of zero means the timer hits your target exactly with those dividers. When two pairs tie, the tool prefers the larger reload value, which gives finer PWM duty steps. Use the period when setting interrupt handlers, and remember that the register values are one less than the divisors you actually get."
      },
      {
        "heading": "What mistakes should I avoid with timer dividers?",
        "text": "Do not copy the register values into a timer that has a different clock. The pair is only valid for the clock you entered, so a change in the system clock setup changes every result. Watch out for a timer with different hardware limits, because the tool assumes a 16-bit prescaler and your part may differ. Finally, choosing a 32-bit counter widens the range of reload values, but it does not change the 16-bit prescaler limit."
      }
    ],
    "faqs": [
      [
        "Should I choose 16-bit or 32-bit counter width?",
        "Choose the width that matches your timer's ARR register. A 16-bit counter has a limited reload range, while a 32-bit counter allows far longer periods and finer steps at low frequency. The tool returns a valid pair for either width whenever one exists."
      ],
      [
        "Why does the frequency error sometimes not reach zero?",
        "Integer dividers only reach certain frequencies. The timer clock divided by a whole number of steps rarely lands exactly on your target, so the tool keeps the closest pair and shows the leftover error in ppm. A small leftover is usually acceptable for timing, but a precise baud rate may need a different clock."
      ],
      [
        "How do I apply the register values in code?",
        "Write the PSC value to the prescaler register and the ARR value to the auto-reload register, then enable the counter. Remember that the hardware adds one to each, so the values you write are the divisors minus one. Check your reference manual for the exact register names and any preload or update-event settings on your timer."
      ]
    ]
  },
  "op-amp-gain-calculator": {
    "answer": "An op amp gain calculator sets the feedback ratio of a non-inverting or inverting stage. A non-inverting gain equals one plus Rf over Rg, and an inverting gain equals minus Rf over Rin. Real resistors come in standard series, so the tool finds the E24 or E96 value that lands closest to your target and reports the achieved gain.",
    "aiSummary": "Chooses the standard E24 or E96 feedback resistor closest to a target op-amp gain from a fixed resistor, reporting the achieved gain, percentage error and approximate closed-loop bandwidth from gain-bandwidth product. Method: ratio of standard values, ranked by error. Limitation: bandwidth is a first-order estimate and tolerance is ignored.",
    "shortKeyword": "op amp gain",
    "longKeywords": [
      "find nearest standard resistor for gain",
      "estimate closed-loop bandwidth from GBW",
      "choose between E24 and E96 series"
    ],
    "exampleInputs": {
      "mode": "inv",
      "gain": "5",
      "rfixed": "10000",
      "series": "e96"
    },
    "sections": [
      {
        "heading": "How do I find nearest standard resistor for gain?",
        "text": "Pick the configuration, enter the target gain magnitude and the fixed resistor you already have, which is Rg for non-inverting or Rin for inverting. The tool computes the ideal feedback resistor, then checks every E24 or E96 value between 10 ohms and 10 megohms to find the closest result. Read the achieved gain and percentage error, and compare the runner-up, which is often a useful alternative when the first choice has a poor gain error."
      },
      {
        "heading": "How can I estimate closed-loop bandwidth from GBW?",
        "text": "Enter the op-amp gain-bandwidth product in megahertz. The tool divides it by the noise gain, which is one plus Rf over R, to estimate the closed-loop bandwidth. Higher gain therefore means lower bandwidth, so a stage set for gain of five will be slower than one set for gain of two with the same op amp. The figure is a first-order approximation, so it ignores slew rate and output swing, and it should be checked on the bench."
      },
      {
        "heading": "What mistakes should I avoid with op-amp gain?",
        "text": "Do not expect the achieved gain to match the target exactly, because standard series are coarse and the nearest value may be a few percent off. Resistor tolerance is not modelled, so a 1% part and a 5% part can both shift the result. Also remember that the bandwidth figure ignores slew rate and output swing, which limit large signals. Finally, verify the final circuit on the bench, because this estimate does not model every real op-amp limit."
      }
    ],
    "faqs": [
      [
        "Should I choose between E24 and E96 series for my design?",
        "E24 suits 5 percent and 1 percent parts but gives a coarser match. E96 has finer steps, so it usually gets closer to the target, and its values are listed as 1 percent parts. Pick E96 when the gain must sit close to a specification."
      ],
      [
        "Why does the tool show a runner-up value?",
        "The runner-up is the next closest standard value by gain error. Showing it lets you compare two practical options quickly, for example when one of them is easier to source. Check both before you commit to a resistor."
      ],
      [
        "Can I use this for an inverting amplifier?",
        "Yes. Select inverting, and the tool treats the target as the magnitude and applies gain equals minus Rf over Rin. The fixed resistor you enter is Rin, which sets the input impedance. Use the magnitude of the result to match your target."
      ]
    ]
  },
  "ntc-thermistor-calculator": {
    "answer": "An NTC thermistor calculator converts the resistance of a negative temperature coefficient sensor into temperature, and the reverse. It uses either the Beta model, which assumes a single parameter, or the Steinhart-Hart equation with three coefficients. A voltage divider reading is first converted to resistance using the fixed resistor value and reference voltage.",
    "aiSummary": "Converts an NTC thermistor's resistance, divider voltage or temperature using the Beta equation or Steinhart-Hart, with reference resistance and voltage inputs. Method: exponential Beta relation or inverted Steinhart-Hart polynomial. Limitation: Beta is an approximation away from its reference point, and self-heating is not modelled.",
    "shortKeyword": "ntc thermistor calculator",
    "longKeywords": [
      "convert thermistor resistance to temperature",
      "read temperature from voltage divider output",
      "choose a beta value for your thermistor"
    ],
    "exampleInputs": {
      "mode": "div",
      "vout": "1.65",
      "vref": "3.3",
      "place": "low"
    },
    "sections": [
      {
        "heading": "How to convert thermistor resistance to temperature?",
        "text": "Choose resistance to temperature, select the model, and enter the resistance you measured. With Beta, the tool uses the reference resistance R0 at T0, usually 25 °C, and the Beta from the datasheet. With Steinhart-Hart, it uses the A, B and C coefficients instead and solves the equation in kelvin. The result is a temperature you can compare against your operating range. Results are most reliable near the reference point, so measure close to T0 when you can."
      },
      {
        "heading": "How do I read temperature from voltage divider output?",
        "text": "Choose divider voltage to temperature and enter the measured voltage, the reference voltage, and the fixed resistor value. Placement matters: with the NTC to ground, the fixed resistor sits on top, and the tool derives resistance from the voltage ratio accordingly. With the NTC to the reference, the mirror formula applies. Get the position right first, because swapping it gives a plausible-looking but wrong temperature. Then the usual Beta or Steinhart-Hart conversion runs on the derived resistance."
      },
      {
        "heading": "What mistakes should I avoid with thermistor readings?",
        "text": "Do not treat the Beta value on a datasheet as exact across the whole range, because the model is an approximation that drifts away from its reference point. Self-heating from the measurement current warms the sensor and is not included here, and neither are ADC errors or the tolerance of the fixed resistor. Also avoid mixing units: resistance in ohms, temperature in degrees, and kelvin only inside the equation. For a safety-critical reading, verify against a calibrated reference."
      }
    ],
    "faqs": [
      [
        "How do I choose a Beta value for your thermistor?",
        "Use the Beta given in your thermistor's datasheet, and note the temperature range it is specified for. Beta is usually quoted between two reference temperatures, so check that the reference matches the R0 and T0 you enter here. If the datasheet gives Steinhart-Hart coefficients instead, use those with the Steinhart-Hart model."
      ],
      [
        "Why is my reading far from the expected temperature?",
        "A common cause is a mismatch between the NTC position and the divider setting, or a wrong fixed resistor value. Check which side of the divider the thermistor sits on, then confirm that R0 and T0 match the part you measured."
      ],
      [
        "What happens far from the reference temperature?",
        "Beta is an approximation, so its error grows as you move away from T0, the reference temperature. Within the datasheet range the error is usually small, but outside it the calculated temperature can be noticeably off. For a wider range, use Steinhart-Hart coefficients fitted to your sensor."
      ]
    ]
  },
  "ble-battery-life-calculator": {
    "answer": "A battery life calculator estimates how long a cell lasts when a device sleeps most of the time and wakes briefly to transmit. It averages the sleep and active currents over one repeat interval, then divides the usable capacity by that average. Self-discharge is added as a small constant drain, and the result is shown in hours, days and years.",
    "aiSummary": "Estimates runtime of a battery-powered device from its sleep current, active current, active time per event, event interval, nominal capacity, derating and self-discharge. Method: time-weighted average current, then usable capacity divided by it. Limitation: single active state, and real cells lose capacity at high pulse current and low temperature.",
    "shortKeyword": "battery life calculator",
    "longKeywords": [
      "estimate battery life from sleep current",
      "average current of a duty cycle",
      "how long will a battery last"
    ],
    "exampleInputs": {
      "sleep": "5",
      "interval": "60",
      "active": "8",
      "cap": "220"
    },
    "sections": [
      {
        "heading": "How do I estimate battery life from sleep current?",
        "text": "Enter the sleep current in microamps, the interval between events in seconds, and the active current and its duration per event. The tool first works out the average load over one interval, since the device spends nearly all of that time asleep. Sleep current usually dominates the result for long intervals, so small savings in sleep current can matter more than shorter transmit time. Enter the nominal capacity and derating to get the usable charge."
      },
      {
        "heading": "How do I read the average current of a duty cycle?",
        "text": "The average current, in microamps, is the number to compare with your power budget. When the duty cycle is small, the sleep current accounts for nearly all of it and the active burst adds only a little. Doubling the wake rate roughly doubles the active share, so check how much of the average comes from each part before changing firmware. Treat the years figure with care, because it also depends on the self-discharge input."
      },
      {
        "heading": "What mistakes should I avoid when estimating battery life?",
        "text": "Do not treat the ideal figure as a guarantee. The model applies one derating factor and a single steady load between events, but real cells lose capacity at higher pulse currents, at low temperature and as voltage drops toward cut-off. A device with several radio phases, such as scanning then connecting, also needs more than one active state, which this single-state model does not capture. Measure the actual current profile with a power analyser and use the estimate only to compare designs."
      }
    ],
    "faqs": [
      [
        "How long will a battery last in practice?",
        "Expect the figure to be optimistic. Real runtime is shorter when pulse currents are high, the temperature is low, or the cell sags near its cut-off voltage. Adjust the derating percentage to reflect your cell's datasheet and test a prototype, because a bench measurement is the most reliable check."
      ],
      [
        "Does sleep current matter more than wake time?",
        "It depends on the duty cycle. At long intervals the sleep current usually sets most of the average, so lowering it has the biggest effect. At short intervals or with long active bursts, the active current takes a larger share and reducing transmit time pays off more."
      ],
      [
        "Which capacity should I enter for a coin cell?",
        "Enter the nominal capacity printed on the datasheet at the discharge current closest to your average load, because capacity falls as the load rises. Then choose a derating percentage that reflects the temperature and cut-off voltage you expect."
      ]
    ]
  },
  "cctv-storage-calculator": {
    "answer": "A CCTV storage calculator estimates how much hard drive space a camera recorder needs. It takes each camera's bitrate in Mbps, converts it to bytes per second, multiplies by seconds recorded per day, then by the number of cameras and the retention days. The total is shown in decimal terabytes, the unit drive makers use. Variable-bitrate footage makes real use fluctuate, so treat the figure as an estimate.",
    "aiSummary": "Estimates the hard-drive space a camera system needs. Bitrate per camera for retention days is multiplied out with recording share and camera count, with bits converted to bytes, giving decimal terabytes. Main limit: variable-bitrate footage and a drive's usable capacity make real results differ.",
    "shortKeyword": "cctv storage calculator",
    "longKeywords": [
      "how much hard drive space for cameras",
      "estimate storage for security camera retention",
      "bitrate per camera for retention days"
    ],
    "exampleInputs": {
      "cameras": "4",
      "mbps": "4",
      "rec": "60",
      "days": "14"
    },
    "sections": [
      {
        "heading": "How much hard drive space for cameras do I need?",
        "text": "Use this tool when you are choosing or checking a recorder's disk for a home or business camera system. Enter how many cameras you run, the bitrate each one records at, how much of the day they record and how many days of footage you want to keep. The output is a planning figure in decimal terabytes, so you can compare it with the labelled capacity of a drive or a set of drives in a recorder. Re-run it whenever you add cameras or change recording settings."
      },
      {
        "heading": "How should I read the terabyte result?",
        "text": "The result is the total footage the system writes over the retention period, expressed in decimal terabytes, where one terabyte is one trillion bytes. Drive labels use this same decimal convention, but operating systems often show space in binary units, so the same drive can look smaller on your computer. Leave some headroom beyond the figure, because a drive's usable capacity is a little lower than its label and recorders may reserve space for their own files."
      },
      {
        "heading": "What mistakes make the storage estimate wrong?",
        "text": "A common mistake is using the peak bitrate from a camera's settings page instead of a typical average, which overstates the need. The reverse happens when you assume a low bitrate and then point cameras at busy scenes with motion and changing light. Variable-bitrate cameras fluctuate, so check a sample of real recordings over several days. Recording share matters too, because continuous recording and motion-only recording use very different amounts of space."
      }
    ],
    "faqs": [
      [
        "How do I estimate storage for security camera retention?",
        "Start from the bitrate each camera reports, then set recording share to the share of time it actually records. Multiply the daily total by the retention days you need and by the number of cameras. Add a small overhead percentage if you want a safety margin for file metadata and bitrate spikes."
      ],
      [
        "Does a higher frame rate need more storage?",
        "Usually yes, because a higher frame rate normally means a higher bitrate for the same resolution and codec. This tool does not set the bitrate for you, so change the bitrate input to match your camera's frame rate and quality settings, and the result will follow."
      ],
      [
        "Can I just buy a drive that matches the total?",
        "Pick a drive or set of drives with at least the calculated capacity plus some headroom. Confirm in your recorder's manual how it handles several drives before you buy hardware."
      ]
    ]
  },
  "3d-printing-filament-cost-calculator": {
    "answer": "A 3d print cost calculator adds up what one print costs to make and suggests a selling price. Material is the grams used times the spool price per gram. Electricity is printer watts times hours times the price per kWh. A failure allowance and machine wear are added, then the markup percentage sets the price you charge. Results are planning estimates in any currency.",
    "aiSummary": "Estimates the production cost and selling price of one 3d print. It adds filament material, electricity from printer power and print time, a failure allowance, machine wear and labour, then applies markup. Main limit: electricity cost of a long print depends on real power draw and slicer weights, so the figures are planning estimates.",
    "shortKeyword": "3d print cost calculator",
    "longKeywords": [
      "how much to charge for 3d printing",
      "calculate filament cost per gram",
      "electricity cost of a long print"
    ],
    "exampleInputs": {
      "grams": "120",
      "spoolGrams": "1000",
      "spoolPrice": "25",
      "hours": "8"
    },
    "sections": [
      {
        "heading": "How much to charge for 3d printing once costs are known?",
        "text": "This tool is useful when you quote prints for customers or price your own parts. It splits the cost into material, electricity, a failure allowance, machine wear and optional labour, then applies a markup you choose. Keeping each part visible shows where the price comes from, so you can change one input, such as spool price or print time, without guessing at the whole total. Revisit the figures whenever your filament or power costs change."
      },
      {
        "heading": "How should I read the selling price and per-gram figures?",
        "text": "The production cost is what the print costs you before any profit. The selling price is that cost plus your markup percentage, so a higher markup raises the price proportionally. Dividing the selling price by the grams used gives a per-gram figure, which helps when customers compare prints of different sizes. If you enter the grams left on a spool, the tool also shows how much filament remains after the print. Compare the result with your own time rates before you publish any price."
      },
      {
        "heading": "What mistakes make a print quote too low?",
        "text": "The most frequent mistake is leaving out machine wear, which adds up quietly over many hours of printing. Using slicer weights with no waste margin is another, because supports and failed starts consume filament that the slicer may not count. Ignoring post-processing labour also understates the price for prints that need sanding, painting or assembly. Finally, a single average power figure may not match a printer that runs its heater hard at the start of each job."
      }
    ],
    "faqs": [
      [
        "How do I calculate filament cost per gram for a print?",
        "Divide the spool price by the spool's net grams to get the cost per gram, then multiply by the grams the print uses. Weigh the spool before and after a test print if your slicer estimate looks unreliable. The tool does this arithmetic for you when you enter the spool price and net weight."
      ],
      [
        "Should I include my own time in the price?",
        "The calculator has a labour field for post-processing and handling, so you can add the time you spend. Enter the amount per print as a flat number, or convert your hourly rate into the share of time each print takes. The figure is only as good as the inputs you choose."
      ],
      [
        "Does the estimate account for failed prints?",
        "Yes, through the failure allowance percentage. It applies to material and electricity costs, so a failed print still uses filament and power. Raise the percentage for experimental or fragile parts and keep it lower for well-tested designs."
      ]
    ]
  },
  "dmarc-record-generator": {
    "answer": "A DMARC record generator builds the DNS TXT value that states your DMARC policy for a domain. Choose a policy (none, quarantine or reject), a report mailbox and alignment modes. The tool adds only tags that differ from the defaults and shows the host name, _dmarc with your domain. It checks syntax only, so you still need to publish DMARC policy in DNS yourself.",
    "aiSummary": "Creates a DMARC TXT record from a chosen policy, reporting mailbox and alignment settings, and gives the host name to publish it at. It writes only non-default tags. Main limit: it validates syntax alone and does not check your SPF or DKIM setup or confirm mail delivery.",
    "shortKeyword": "dmarc record generator",
    "longKeywords": [
      "which dmarc policy should I start with",
      "dmarc txt record for my domain",
      "publish dmarc policy in dns"
    ],
    "exampleInputs": {
      "domain": "example.com",
      "policy": "quarantine",
      "adkim": "s",
      "aspf": "r"
    },
    "sections": [
      {
        "heading": "Which DMARC policy should I start with for a new domain?",
        "text": "Starting with none is the usual approach when you are new to DMARC, because it asks receivers to report on mail without changing delivery. Use the aggregate reports for a few weeks to find legitimate senders that fail alignment. Once they are fixed, move to quarantine and later to reject. Choose the policy from what the reports show rather than from a guess, and keep the report mailbox in place throughout the change."
      },
      {
        "heading": "What do the alignment and percentage settings change?",
        "text": "Alignment settings decide how closely the sending domain in the authentication results must match the domain in the From address. Relaxed mode allows subdomains to match, while strict mode requires an exact match. The percentage tag limits the policy to a share of failing mail, which is useful during a gradual rollout. The tool writes these tags only when they differ from the defaults, so a relaxed setup produces a shorter record."
      },
      {
        "heading": "What mistakes break a DMARC rollout?",
        "text": "A common mistake is jumping straight to reject before reading any reports, which can block legitimate mail from services you forgot about, such as invoicing or newsletter tools. Another is publishing a record with a typo in the host name or the mailto address, so reports never arrive. Remember too that the record only helps when SPF or DKIM pass with alignment, so check those separately with your mail provider."
      }
    ],
    "faqs": [
      [
        "Where do I publish the DMARC TXT record for my domain?",
        "Create the record as a TXT entry at the host name the tool shows, which is the _dmarc label under your domain. The exact steps depend on your DNS provider, so look for a TXT record type in its control panel. Paste the value exactly as generated and let your provider handle any quoting."
      ],
      [
        "What do I do with the failure report address?",
        "The ruf tag requests failure reports, which contain details of individual messages. Leave it blank unless you need those details and have a mailbox that can handle that sensitive data. The aggregate report address is the one most setups need first."
      ],
      [
        "Is a TXT record enough to protect my domain?",
        "No. The record is one part of the setup. Mail is handled by policy only when SPF or DKIM pass with alignment, so set those up as well. Reports show whether senders match your settings, which tells you when the record needs changing."
      ]
    ]
  },
  "sla-downtime-calculator": {
    "answer": "An SLA uptime calculator converts an availability target into the downtime it allows over a day, week, month, quarter or year. Allowed downtime equals the period in seconds times one minus the availability fraction. Services in series multiply their availabilities together. Measured downtime can also be turned into achieved availability and the share of error budget used.",
    "aiSummary": "Converts an uptime target into allowed downtime for a chosen period, multiplies availabilities for serial services, and reports achieved uptime from measured minutes in a 30-day month. Core method is simple multiplication of seconds and fractions. Main limit: contracts define measurement windows and exclusions differently, so check the wording.",
    "shortKeyword": "sla uptime calculator",
    "longKeywords": [
      "downtime per month does a target allow",
      "composite availability of serial services",
      "share of error budget used"
    ],
    "exampleInputs": {
      "mode": "allowed",
      "sla": "99.5",
      "period": "month30",
      "services": "2"
    },
    "sections": [
      {
        "heading": "How many minutes of downtime per month does a target allow?",
        "text": "This is the main job of the tool. Pick an availability target, choose a period and read off the allowed downtime. A monthly view helps operations teams plan maintenance windows, while a yearly figure helps leaders compare vendor promises. Because the period can be a day, week, month or year, the same target gives different minute budgets. Choose the period that matches how your service is reported and reviewed in your own status meetings."
      },
      {
        "heading": "How should I read the composite result for serial services?",
        "text": "When several services must all be up for a request to succeed, their availabilities multiply, so the combined figure is lower than any single one. Adding a dependency reduces the total even when each part is reliable. Enter the number of services in series to see the composite availability and the downtime it implies. Redundant paths work differently, so do not enter them as serial services, because the tool does not model parallel systems."
      },
      {
        "heading": "What mistakes make an uptime figure misleading?",
        "text": "Comparing a monthly figure with an annual one without converting is a common error, as is mixing a 30-day month with an average month. Ignoring how a contract defines downtime, such as planned maintenance or partial outages, changes the answer. Measured downtime also depends on your monitoring interval, so short outages can be missed entirely. Treat the output as arithmetic on the inputs, not as proof of how a service performed."
      }
    ],
    "faqs": [
      [
        "How do I calculate composite availability of serial services?",
        "Multiply each service's availability as a fraction. For three services at the same target, the product is lower than any one of them. Enter the count in the services field and the tool applies the same multiplication, then converts the result into downtime for the period you select."
      ],
      [
        "How do I compare a target with the downtime I measured?",
        "Choose measured mode, enter the minutes of downtime you recorded in a 30-day month, and read the achieved availability. Compare it with your target and check the share of error budget you used. The result is only as complete as the monitoring data behind it."
      ],
      [
        "Can I use this for a service that has planned maintenance?",
        "Only if your contract excludes that time. The calculator counts every second in the period and cannot know which windows an agreement excludes. Subtract agreed exclusions from the measured figure yourself, then enter the adjusted minutes."
      ]
    ]
  },
  "css-fluid-typography-clamp-calculator": {
    "answer": "A CSS clamp generator writes a CSS clamp() declaration that scales a font size linearly between a minimum and maximum viewport width. It uses the slope between the two sizes and viewports, adds an intercept, and expresses the middle part in vw. The output is clamp(min, preferred, max) in rem with up to four decimals.",
    "aiSummary": "Builds a CSS clamp() value that grows a font size linearly from a minimum to a maximum viewport width. It converts a slope and intercept into rem and vw units. Helpful for smooth font size growth on screens. Main limit: the formula sets size only, so readability and zoom still need checking.",
    "shortKeyword": "css clamp generator",
    "longKeywords": [
      "scale font size between two viewports",
      "convert pixel font sizes to rem",
      "smooth font size growth on screens"
    ],
    "exampleInputs": {
      "minPx": "14",
      "maxPx": "20",
      "minVw": "360",
      "maxVw": "1440",
      "root": "16",
      "at": "900"
    },
    "sections": [
      {
        "heading": "How do I scale font size between two viewports?",
        "text": "Set the smallest size you want on a narrow phone and the largest on a wide desktop, then choose the minimum and maximum viewport widths where that change should happen. The tool derives a straight line between those points, so the size grows steadily rather than jumping at breakpoints. The same approach works for spacing, padding or any other length. Preview at a width in the middle of the range to confirm the size looks right there too."
      },
      {
        "heading": "How should I read the rem and vw parts of the output?",
        "text": "The rem parts are the minimum, the maximum and the intercept, so they scale when a visitor changes the browser text size. The vw part is the slope, which depends on the viewport width. Read the output as three values inside clamp(): the floor, the fluid expression and the ceiling. The preview width shows the computed size at one viewport, which helps you check a single point on the line before you ship."
      },
      {
        "heading": "What common mistakes make a clamp value misbehave?",
        "text": "Swapping the minimum and maximum produces a line that shrinks as the screen grows, which is rarely what you want. Using a root font size that differs from the one in your stylesheet shifts every rem value. A very wide size range can make text look too small or too large at intermediate widths. Remember that a formula does not guarantee contrast or comfortable line length, so check those separately in your own design."
      }
    ],
    "faqs": [
      [
        "How do I convert pixel font sizes to rem in clamp?",
        "Divide each pixel size by the root font size, then express the result in rem. Enter your root size in the tool so the rem values match your stylesheet. The generator does this division for you, so you only type pixels."
      ],
      [
        "Is there a fallback when clamp is not supported?",
        "Declare a plain font-size value before the clamp line, so older browsers use it and newer ones take the fluid value. Choose a fallback close to the middle of your range. The tool produces only the clamp declaration, so add the fallback yourself."
      ],
      [
        "Can I use the result for line height or spacing?",
        "Yes. The same slope method works for any length that should grow with the viewport, such as margins or gaps. Enter the sizes in pixels as before. Check the result in context, because a value that suits a heading may be too large for a button or an input."
      ]
    ]
  },
  "video-bitrate-file-size-calculator": {
    "answer": "A video file size calculator estimates how big a clip will be from its bitrates and duration. It applies the kbps to megabytes conversion: add video and audio kbps, multiply by 1,000, divide by eight for bytes per second, then multiply by seconds. The same method works in reverse for a target size. Results are constant-bitrate estimates, so variable-rate encodes land near the figure, not exactly on it.",
    "aiSummary": "Estimates video file size from total bitrate and duration, and works backwards to the video bitrate that fits a target size. Core method: kilobits per second times seconds, converted to bytes. Main limit: the figure assumes constant bitrate, so variable-rate encodes and container overhead can shift the result.",
    "shortKeyword": "video file size calculator",
    "longKeywords": [
      "bitrate needed for a target file size",
      "file size of a long video",
      "kbps to megabytes conversion"
    ],
    "exampleInputs": {
      "video_kbps": "6000",
      "audio_kbps": "128",
      "minutes": "20"
    },
    "sections": [
      {
        "heading": "How do I find the bitrate needed for a target file size?",
        "text": "Start with the size limit that an upload site or storage plan enforces, then enter the duration and audio bitrate. The tool subtracts the audio share from the total it can afford and returns the video bitrate that should land near your target. Container overhead matters more at small sizes, so add a percentage if your format adds padding. Run the calculation again when you change the length, since a shorter clip allows a higher video bitrate for the same size."
      },
      {
        "heading": "How should I read MB and MiB results?",
        "text": "Decimal results use one megabyte equal to one million bytes, the convention most storage and upload limits use. Binary results use mebibytes at 1,048,576 bytes each, which operating systems sometimes show instead. Compare the number on your screen with the unit on the limit you need to meet, because the same file can look larger or smaller depending on the unit. Checking the unit first avoids surprises when an upload is rejected just over a limit."
      },
      {
        "heading": "What limits make a bitrate estimate too optimistic?",
        "text": "Constant-bitrate math assumes every second costs the same, but scenes with motion, grain or fast cuts need more data. Variable-bitrate and two-pass encodes therefore land near the figure rather than on it. Container overhead, metadata and chapter markers add bytes as well. Use the result to plan, then encode a short test clip and measure its real size before committing to a full export. Compare the measured size with the estimate and adjust the target you entered."
      }
    ],
    "faqs": [
      [
        "How do I estimate the file size of a long video?",
        "Add the video and audio bitrates together, multiply by the duration in seconds, then divide by eight to convert bits to bytes. Enter hours, minutes and seconds in their own fields so the length is exact. The tool handles this conversion, and you can add an overhead percentage for the container."
      ],
      [
        "What if my target is smaller than the audio alone?",
        "If the audio bitrate alone uses most of the target, there is little room left for video. Lower the audio bitrate, shorten the clip, or raise the target size and recalculate. Keep the target above the audio share, otherwise the video bitrate figure will not be meaningful."
      ],
      [
        "Which encoder settings change the final size?",
        "Settings such as variable-rate mode, two-pass encoding and keyframe spacing all change how many bits each second receives. The calculator only sees the average bitrate you give it. Test a short clip with your exact encoder settings and measure its size to calibrate the estimate."
      ]
    ]
  },
  "bpm-delay-time-calculator": {
    "answer": "A BPM to ms calculator converts a song tempo into millisecond delay times for each note value. One quarter-note beat lasts 60,000 divided by BPM milliseconds, and other notes scale from that. Dotted notes are one and a half times the straight length, and triplets are two thirds. The tool also gives Hz rates and 1/32 and 1/64 lengths as reverb pre delay starting points.",
    "aiSummary": "Converts BPM into delay times for straight, dotted and triplet notes in milliseconds, plus matching Hz values. Core method: one beat is sixty thousand divided by tempo, and note lengths scale from it. Main limit: it assumes steady tempo with no swing, so real timing choices still depend on the music.",
    "shortKeyword": "bpm to ms calculator",
    "longKeywords": [
      "dotted eighth delay time at a tempo",
      "tempo synced lfo rate in hz",
      "reverb pre delay starting points"
    ],
    "exampleInputs": {
      "bpm": "96"
    },
    "sections": [
      {
        "heading": "What is a dotted eighth delay time at a tempo?",
        "text": "A dotted eighth is one and a half times the length of an eighth note, a popular choice for delays because it sits off the straight grid and creates a rhythmic echo. Find the quarter-note length first, halve it for an eighth, then multiply by one and a half. The tool lists this value next to the straight and triplet options so you can compare them quickly. Confirm the choice by ear against the actual track before settling on it."
      },
      {
        "heading": "How should I use the Hz values for modulation?",
        "text": "The Hz value is one cycle per note, so a given note setting at a given tempo produces a rate you can enter on a low-frequency oscillator. Slower rates suit broad, slow movement, while faster rates suit quick pulsing effects. Because the tool computes from the tempo you enter, it does not follow a tempo change within your session. Set the oscillator to the note value you want and confirm that the rate matches the figure shown."
      },
      {
        "heading": "What mistakes come from using these delay values?",
        "text": "A common mistake is treating a pre-delay starting point as a rule, when the right value depends on the source and the room. Another is ignoring swing, because the straight values assume perfectly even timing. Changing tempo partway through a song also breaks the calculation, since every value depends on one BPM figure. Check each setting by ear and fine-tune it for the material. Keeping a short list of the values you use most saves time in later sessions."
      }
    ],
    "faqs": [
      [
        "How do I set a tempo synced LFO rate in Hz?",
        "Use the frequency that matches the note length you want, which the tool gives as one cycle per note. For a rate that repeats once per quarter note, use the quarter-note Hz value. Enter that number into your modulation device, then listen to confirm the pulse lands where you expect."
      ],
      [
        "Why does my delay drift away from the groove?",
        "Delay times in milliseconds are fixed, so if the tempo of your track changes or the project was built at a slightly different BPM, the echoes fall off the beat. Recalculate with the exact tempo and check the timing against a metronome. Small differences from rounding are normal."
      ],
      [
        "How precise do the millisecond values need to be?",
        "Triplet values repeat a fraction, so keep the decimals when your plugin accepts them. A rounded value is usually close enough for a delay, but check it on fast passages where small timing errors are easier to hear."
      ]
    ]
  },
  "smpte-timecode-calculator": {
    "answer": "A timecode calculator converts hours, minutes, seconds and frames into a frame count, turns a frame count back into timecode, or adds two timecodes. Timecode counts frames at the nominal rate, while NTSC-style rates run slightly slower. Drop-frame numbering skips frame labels to stay near the clock, and the tool reports the real elapsed time from frames at the chosen rate.",
    "aiSummary": "Converts timecode to a frame count and back, or adds two timecodes, at common frame rates. Core method: nominal rate times total seconds, plus frames, with drop-frame labels skipped on most minutes. Main limit: non-drop NTSC-style timecode drifts from the clock, and hours are not wrapped at 24.",
    "shortKeyword": "timecode calculator",
    "longKeywords": [
      "convert timecode to frame count",
      "drop frame timecode at 29.97",
      "real elapsed time from frames"
    ],
    "exampleInputs": {
      "mode": "f2tc",
      "rate": "25",
      "frames": "90000"
    },
    "sections": [
      {
        "heading": "How do I convert timecode to frame count?",
        "text": "Enter the timecode and the frame rate it was recorded at, then read the total frames. The tool multiplies the hours, minutes and seconds by the nominal rate, adds the frame field, and applies a drop correction when you choose drop-frame. Going the other way takes a frame count and returns the matching label. Use the same rate on both sides, because a frame count only means something at a stated rate."
      },
      {
        "heading": "How should I read the real duration result?",
        "text": "The real duration is the frame count divided by the true frame rate, which for NTSC-style rates is slightly below the nominal figure. A drop-frame label stays close to the wall clock, while non-drop drifts a little over long runs. Compare the duration against the clock before you trust a runtime for delivery. Short clips barely show the difference, but long programs can. Note the frame rate beside any duration you share, so others can reproduce it."
      },
      {
        "heading": "What mistakes come from mixing frame rates?",
        "text": "The most frequent error is mixing a 29.97 drop-frame timecode with a 30 fps non-drop one, which produces totals that are off by a few frames. Another is adding timecodes recorded at different rates, because the sum only means something when both sides share a rate. Check the rate setting on the project before doing any arithmetic, and note the rate on every delivery file. These mistakes are easy to miss because the numbers still look plausible. A quick check of the rate field before each calculation prevents most of them."
      }
    ],
    "faqs": [
      [
        "What does drop frame timecode at 29.97 mean?",
        "Drop-frame numbering skips two frame labels at the start of most minutes, except every tenth minute, so the labels stay close to real time. No picture frames are removed. Use it for 29.97 material that must match the clock, such as broadcast runtimes."
      ],
      [
        "Can I add timecodes to get a total runtime?",
        "Yes. Choose the add mode and enter two timecodes at the same rate. The result is the sum in timecode form, which is handy for joining clips. Check the frame rate first, because adding values from different rates gives a misleading total."
      ],
      [
        "Why do frames and timecode sometimes disagree after editing?",
        "Edits can shift the frame count in ways you did not expect, especially when a clip starts partway through a minute on a drop-frame timeline. Recalculate with the same rate your editor uses and confirm the starting timecode. The calculator gives the arithmetic, while the editor remains the source of truth for your project."
      ]
    ]
  },
  "camera-crop-factor-calculator": {
    "answer": "A lens crop factor calculator finds how much a sensor is smaller than 35mm full frame and converts a lens to its full-frame equivalent focal length and aperture. Crop factor is the full-frame diagonal divided by your sensor diagonal. Multiply focal length by it for field of view. It also gives the equivalent ISO for noise matching on full frame.",
    "aiSummary": "Gives the crop factor of a sensor relative to 35mm full frame, plus equivalent focal length, aperture and ISO for a lens. Core method: diagonal ratio, then multiplication for focal length and aperture and a squared factor for ISO. Main limit: these are equivalence approximations, not a change to the lens's actual exposure.",
    "shortKeyword": "lens crop factor calculator",
    "longKeywords": [
      "full frame equivalent focal length",
      "equivalent aperture for depth of field",
      "equivalent ISO for noise matching"
    ],
    "exampleInputs": {
      "sensor": "mft",
      "focal": "25",
      "aperture": "1.8",
      "iso": "200"
    },
    "sections": [
      {
        "heading": "How do I find the full frame equivalent focal length?",
        "text": "Pick your sensor size from the list, or type its width and height in millimetres if your camera is not listed. The tool works out the crop factor, then multiplies your lens focal length by it. A standard lens on a crop sensor frames the same view as a longer lens on full frame, which helps when you compare camera kits. Use this figure for framing decisions rather than as a claim about optical quality."
      },
      {
        "heading": "What do the aperture and ISO results actually mean?",
        "text": "The equivalent aperture describes depth of field and total light gathered for the same framing, not the real brightness of your exposure. The lens still opens to its marked f-number, so the exposure you meter does not change. Equivalent ISO describes noise: the same total light on full frame would need that ISO for a similar result. Read these as comparisons between systems rather than as settings to dial in on the camera."
      },
      {
        "heading": "What mistakes come from comparing sensor specifications?",
        "text": "Sensor dimensions are nominal, so two cameras with the same sensor label can differ slightly. Using a custom size with rounded numbers introduces small errors that grow when you multiply them. Another mistake is treating crop factor as a measure of image quality, when sensor technology and lens design also matter. Treat the equivalent values as a comparison tool, not as exact camera specifications. Confirm any figure you need for a purchase against the manufacturer's own published specification."
      }
    ],
    "faqs": [
      [
        "How does equivalent aperture for depth of field work?",
        "Multiply the f-number by the crop factor to get the aperture that gives similar depth of field on full frame at the same framing. The lens itself still has the same marked aperture and light gathering. Use the result to compare systems, not to change your exposure."
      ],
      [
        "Is the custom sensor option worth using?",
        "Use it when your camera model is not in the list and you know the sensor width and height from its specification sheet. Enter the values in millimetres, because the tool calculates the diagonal from them. Small errors in those numbers shift the crop factor slightly."
      ],
      [
        "Does the focal length change when I switch sensors?",
        "No. The physical focal length of the lens stays the same, and only the field of view on a given sensor changes. The equivalent focal length is a way of describing that field of view in full-frame terms."
      ]
    ]
  },
  "timelapse-calculator": {
    "answer": "A timelapse calculator works out how many frames a shoot produces, how long the finished clip runs and how much storage it needs. Frames equal the event seconds divided by the shooting interval, rounded down. Clip length is frames divided by playback frame rate. It also reports the speed-up factor of a timelapse so you can judge the motion.",
    "aiSummary": "Calculates frames, clip length, speed-up and storage from event duration and shooting interval, or the interval for a target clip length. Core method: event seconds divided by interval gives frames, then frames divided by fps gives seconds. Main limit: the figures ignore battery and card limits and assume equal frame sizes.",
    "shortKeyword": "timelapse calculator",
    "longKeywords": [
      "event duration to clip length",
      "timelapse shooting interval for a clip",
      "speed-up factor of a timelapse"
    ],
    "exampleInputs": {
      "ev_hours": "3",
      "ev_min": "30",
      "interval": "10",
      "fps": "25"
    },
    "sections": [
      {
        "heading": "How do I convert event duration to clip length?",
        "text": "Enter how long the event lasts, the interval between shots and the playback frame rate. The tool counts how many frames the interval produces, then divides by the frame rate to give the clip length. The speed-up figure compares real time with clip time, which tells you how fast things will appear to move. This is the core planning loop: choose a clip length you like, then adjust the interval until the numbers fit."
      },
      {
        "heading": "How should I pick the interval and shutter setting?",
        "text": "Shorter intervals give smoother motion but produce more frames and more storage, so match the interval to how fast the scene changes. Clouds may need a few seconds between shots, while a slow sunset can use longer gaps. The 180-degree rule of thumb sets the exposure to half the interval, which many shooters use for natural-looking blur. Treat it as a starting point and test a few frames before the full shoot."
      },
      {
        "heading": "What mistakes make a timelapse clip shorter than planned?",
        "text": "The most common cause is a camera that stops early because of a dead battery or a full card, so fewer frames exist than the plan assumed. Rounding down also matters, since a final partial interval produces no frame. Changing the playback rate after planning shifts the clip length too, so recalculate whenever the fps changes. Check that storage covers the frames before you start, because a full card ends the shoot early."
      }
    ],
    "faqs": [
      [
        "How do I choose a timelapse shooting interval for a clip?",
        "Start with the clip length you want, then use the target mode to get the interval. Divide the event length by the frame count the clip needs. Check that the result suits the motion in the scene, and adjust it if the footage looks too choppy or too slow."
      ],
      [
        "Why are frames rounded down in the count?",
        "Frames are whole numbers, and a final partial interval cannot produce one. So the tool rounds down, and the clip can end up a fraction shorter than a perfect division would give. For storage planning, use the rounded count, since it is the figure the camera will actually record."
      ],
      [
        "Should I add a margin to the storage estimate?",
        "Yes. Frame sizes vary with scene detail, file formats and camera settings, so an average can be off. Add a margin of spare space, then check the first few minutes of footage to measure the real frame sizes."
      ]
    ]
  },
  "youtube-revenue-estimator": {
    "answer": "A YouTube revenue estimator projects ad revenue from views and an RPM you enter. Revenue equals views divided by 1,000, multiplied by RPM, and monthly growth compounds the view count over the months you choose. RPM is revenue per 1,000 views after YouTube's platform share, so it varies by niche, audience location and format. Treat the result as a projection, not a payout.",
    "aiSummary": "Estimates monthly and multi-month YouTube ad revenue from views and an RPM you enter, compounding a monthly growth rate. It multiplies total revenue by 0.5 and 1.5 to show low and high YouTube RPM scenarios. The main limitation is that RPM is an input you supply, not a fixed rate.",
    "shortKeyword": "youtube revenue estimator",
    "longKeywords": [
      "how to estimate youtube ad revenue",
      "project youtube revenue with monthly growth",
      "low and high youtube rpm scenarios"
    ],
    "exampleInputs": {
      "views": "100000",
      "rpm": "1.5",
      "growth": "5",
      "months": "12"
    },
    "sections": [
      {
        "heading": "How to estimate YouTube ad revenue from views?",
        "text": "Use this tool when you want a planning figure for ad income from a video or channel. Enter your monthly views and the RPM you see in your own analytics. The tool divides views by 1,000 and multiplies by RPM, so each thousand views earns the RPM you entered. Because the platform share is already removed from RPM, you should not subtract it again. Set the number of months to project if you are planning a longer period. The output is revenue in the same currency as the RPM, which helps you compare a few plausible channel scenarios side by side without committing to any one figure."
      },
      {
        "heading": "How should you project YouTube revenue with monthly growth?",
        "text": "Monthly growth compounds the starting views, so month two uses the first month's views multiplied by one plus the growth rate, and later months keep compounding. A 5 percent rate means views rise by that share each month. Totals are the sum across all months you choose. Read the total as a sum of monthly estimates, not a single number to plan around. The 0.5 and 1.5 scenarios multiply the total revenue, so they show sensitivity to RPM rather than real benchmarks. Treat growth as the least predictable input and vary it by running the tool again with a lower and higher figure."
      },
      {
        "heading": "What are the common mistakes with this revenue estimate?",
        "text": "Common mistakes include using a generic RPM copied from a forum instead of your own analytics, and forgetting that RPM already excludes the platform share. Another mistake is treating the low and high scenarios as ranges of likely outcomes. They are only multipliers of the total. The tool also leaves out Partner Program rules, taxes and sponsorship income, so the figure is not your take-home pay. Format matters too, because short and long videos can earn different RPM values."
      }
    ],
    "faqs": [
      [
        "How are the low and high YouTube RPM scenarios calculated?",
        "Each scenario multiplies the total projected revenue by a fixed factor: 0.5 for the low case and 1.5 for the high case. The factors show how sensitive your result is to RPM. They are not benchmarks for any niche or country, so replace them with RPM figures from your own analytics when you have them."
      ],
      [
        "Does the estimate include tax or sponsorship income?",
        "No. The tool does not model taxes, Partner Program rules or sponsorship income. Your RPM already reflects the platform share, so add any extra items yourself if they matter for your plan. Check your own tax position with a qualified adviser. This is an educational estimate, not professional advice."
      ],
      [
        "How often should I update the views and RPM inputs?",
        "Update the inputs whenever you have fresh analytics, such as after a month closes or a new upload changes your audience mix. Comparing the projection with your actual monthly revenue shows whether your growth and RPM assumptions were reasonable. Adjust the inputs and run the tool again rather than relying on the first estimate."
      ]
    ]
  },
  "cod-vs-prepaid-rto-breakeven-calculator": {
    "answer": "An RTO calculator ecommerce tool estimates expected profit for one order sold as cash on delivery and as prepaid. Return-to-origin orders lose forward shipping, return shipping and unrecovered product cost, so their rate matters. The tool weights each channel by its RTO rate and finds the COD RTO rate at which both channels earn the same expected profit.",
    "aiSummary": "The tool estimates expected profit from COD orders with returns, and the same for prepaid orders with a discount. It subtracts return shipping and unrecovered product cost on each returned order. Its main limitation is that carrier and gateway terms vary, so the output is an estimate, not a forecast.",
    "shortKeyword": "rto calculator ecommerce",
    "longKeywords": [
      "how to compare cod and prepaid profit",
      "find the break-even cod rto rate",
      "expected profit from cod orders with returns"
    ],
    "exampleInputs": {
      "price": "999",
      "cost": "350",
      "codRto": "30",
      "prepaidRto": "5"
    },
    "sections": [
      {
        "heading": "How to compare COD and prepaid profit per order?",
        "text": "This calculator is for choosing between offering cash on delivery and prepaid checkout on the same product. Enter the selling price, product cost, shipping both ways and the COD fee. Then add your RTO rate for each channel and the prepaid discount. The result shows expected profit per order for each option and the difference between them, so you can see which channel earns more after returns. It works per order, so scale the result by your monthly order count when you plan."
      },
      {
        "heading": "How do you find the break-even COD RTO rate?",
        "text": "The break-even rate is the COD return rate at which expected COD profit equals expected prepaid profit. Above it, prepaid is ahead; below it, cash on delivery earns more. The tool solves this directly from the other inputs rather than by trial and error. Read the number as a threshold for your own operations: if your real COD return rate sits well above it, the prepaid discount is doing useful work. A break-even figure below zero or above one hundred percent means no COD return rate can make the two channels equal."
      },
      {
        "heading": "Which inputs cause the most errors here?",
        "text": "A common mistake is entering a return rate from a different seller, category or city and treating it as your own. Another is forgetting that the COD fee and gateway fee apply only to delivered orders in this model. Prepaid returns are assumed fully refunded, and product cost is recovered only at the percentage you set. The model holds rates constant, so it does not capture seasonal spikes in refusals or changes in carrier terms. Use your own order history to set the rates, and rerun the calculation whenever they change."
      }
    ],
    "faqs": [
      [
        "Why does a higher COD RTO rate hurt profit so much?",
        "A returned order loses both shipping legs and any product cost you do not recover, and it earns no revenue. Because the expected profit weights that loss by the RTO rate, each extra point of returns reduces average profit per order. The effect grows with higher shipping and product costs."
      ],
      [
        "Does this calculator work for every marketplace?",
        "Yes, in the sense that it is marketplace-neutral: it takes the prices, fees and rates you enter and does not look up any platform's terms. You need to supply each platform's actual fees and return rates yourself. Results are estimates, because carrier and gateway terms differ from one seller account to another."
      ],
      [
        "Should I set the prepaid discount to zero for a test?",
        "Setting the discount to zero shows how the two channels compare at full price, which is useful if you are deciding whether a discount is needed at all. Enter the same return rates you would expect, and compare the expected profit per order in each channel. The break-even rate will shift, so read it after changing the discount."
      ]
    ]
  },
  "volumetric-weight-calculator": {
    "answer": "A volumetric weight calculator converts carton length, width and height into a weight using a carrier divisor, such as cubic centimetres divided by 5000 for kilograms. The billed weight is the larger of this volumetric figure and the actual weight. The tool also converts each carton to cubic metres (CBM) for container planning and multiplies by carton count.",
    "aiSummary": "Converts carton dimensions into volumetric weight with a divisor you choose, then bills the larger of that and actual weight per carton. It also reports total chargeable weight, carton volume in cubic metres and freight cost at a rate per kilogram. The main limitation is that carriers may round weights or measure consignments differently.",
    "shortKeyword": "volumetric weight calculator",
    "longKeywords": [
      "how to calculate chargeable weight for cartons",
      "convert carton size to cubic metres",
      "pick a divisor for courier shipments"
    ],
    "exampleInputs": {
      "unit": "cm",
      "l": "50",
      "w": "40",
      "h": "30"
    },
    "sections": [
      {
        "heading": "How to calculate chargeable weight for cartons?",
        "text": "Use this to estimate what a carrier will bill for a box that is light but bulky. Enter the carton size in your chosen unit, the actual weight in kilograms, the divisor from your carrier, and the number of cartons. The tool converts inches to centimetres at 2.54 per inch, computes volumetric weight for each carton, and keeps the larger of that and the actual weight. Multiply the result by the carton count for the total chargeable weight, then by your freight rate for a cost estimate."
      },
      {
        "heading": "How do I convert carton size to cubic metres?",
        "text": "The CBM figure is the carton volume in cubic metres, which is length times width times height in centimetres divided by one million. Use it for planning how many cartons fit in a container or pallet load, because it measures space rather than weight. A carton can have a small CBM and still be charged by weight, or a large CBM and be charged by volume. Compare the two figures before choosing a shipping mode, and check which one your carrier uses to bill."
      },
      {
        "heading": "What mistakes should I avoid with the divisor?",
        "text": "A frequent mistake is using the 5000 default without checking your carrier, since the divisor differs by carrier and service, and common values run from 4000 to 6000. Another is mixing units, for example entering inches while the unit selector is still on centimetres. Carriers may round chargeable weight or measure whole consignments differently, which this estimate does not model. The tool also ignores dead weight from pallets, surcharges and minimum charges. Treat the output as a planning figure and confirm it against a real invoice."
      }
    ],
    "faqs": [
      [
        "What should I check before I pick a divisor for courier shipments?",
        "Check the divisor in your carrier's current rate terms for the exact service you use, because it varies between carriers and service levels. The 5000 default is only a starting point. Enter the same divisor the carrier applies when it weighs your cartons, and recheck the setting if you change service."
      ],
      [
        "Does a larger carton always cost more to ship?",
        "Not necessarily. A large carton that weighs little may be billed at its volumetric weight, so its size matters, but a small dense carton can be billed on its actual weight and cost less in total. Compare the chargeable weight for each carton type before choosing packaging."
      ],
      [
        "Can I use it for sea freight pricing?",
        "Yes for planning, since the CBM output gives the carton volume, which is the figure used to estimate container space. The chargeable weight and freight rate are per kilogram, so check whether your ocean or air quote uses weight or volume before you rely on the total. Local terms and minimum charges will change the final cost."
      ]
    ]
  },
  "ecommerce-mer-break-even-roas-calculator": {
    "answer": "A breakeven ROAS calculator finds the return on ad spend at which advertising neither makes nor loses money after product and order costs. It divides average order value by contribution margin per order, which is order value times gross margin minus other variable costs. MER, meaning total revenue divided by total ad spend, is a blended figure you can compare against it.",
    "aiSummary": "Works out break-even ROAS, maximum CPA, blended MER and net profit after ads. It also gives a target CPA from order value and margin for a chosen profit goal. The main limitation is that fixed costs are excluded and MER is not platform-attributed.",
    "shortKeyword": "breakeven roas calculator",
    "longKeywords": [
      "how to find breakeven roas for ads",
      "what cpa can i afford per order",
      "target cpa from order value and margin"
    ],
    "exampleInputs": {
      "revenue": "50000",
      "adSpend": "12000",
      "orders": "500",
      "gm": "60"
    },
    "sections": [
      {
        "heading": "How to find breakeven ROAS for ads?",
        "text": "Use this tool when you need to know how much return your ads must generate before they stop losing money. Enter total revenue and the number of orders, which gives average order value, then add gross margin on the product price and any other variable cost per order such as shipping or fees. Then enter total ad spend. The breakeven figure appears as a ratio, so a result of two means each unit of spend must bring back two units of revenue."
      },
      {
        "heading": "What CPA can I afford per order at my margin?",
        "text": "Break-even CPA equals contribution margin per order, so it is the most you can pay to acquire one order before ads push you into a loss. Target CPA is lower: it subtracts the profit margin you want after ads, expressed as a share of order value. Net profit after ads is orders times contribution margin, minus total ad spend. Compare the actual CPA, which is ad spend divided by orders, with the target. That tells you whether the campaign is above or below the profit goal you set."
      },
      {
        "heading": "What common mistakes should I avoid with MER and ROAS?",
        "text": "MER is a blended ratio across all channels and includes revenue you would have earned anyway, so it does not show what a single campaign returned. Platform-reported ROAS uses attribution windows and can differ from MER, so comparing the two directly is misleading. Breakeven figures also ignore fixed costs such as salaries and software. If contribution margin is zero or negative, no ROAS can break even, and the tool will say so. Use the output to set a floor for campaigns, not as a precise forecast."
      }
    ],
    "faqs": [
      [
        "Why would a campaign with high ROAS still lose money?",
        "A ROAS figure ignores costs other than the ad itself. If order value is small, or shipping, fees and returns take a large share of each sale, the margin left to cover ads can be thin or negative. Compare contribution margin per order with your actual CPA rather than trusting the ratio alone."
      ],
      [
        "How do I set a target profit margin for ads?",
        "Enter the profit you want to keep after ad costs as a percentage of order value. The tool subtracts that share of order value from contribution margin to give a target CPA. A higher goal lowers the CPA you can pay, so the ads must be more efficient to hit it."
      ],
      [
        "Does this tool count fixed costs like rent?",
        "No. It uses only the revenue, orders, gross margin, other variable cost per order and ad spend you enter, so salaries, software and rent are left out. Subtract your monthly fixed costs from net profit after ads to see the result that reflects the whole business. This is an educational estimate, not professional financial advice."
      ]
    ]
  },
  "ab-test-significance-calculator": {
    "answer": "An AB test significance calculator compares conversion rates for two variants using a pooled two-proportion z-test. It reports each rate, the absolute and relative lift, a z statistic and a two-sided p-value. The result counts as significant when the p-value is below one minus your chosen confidence level, and a confidence interval shows the plausible range of the difference.",
    "aiSummary": "Tests whether two variants differ in conversion rate, using a two-sided pooled z-test on visitors and conversions. It is useful to compare conversion rates of two variants once the sample size is fixed in advance. Stopping early or testing many variants raises the false-positive rate.",
    "shortKeyword": "ab test significance calculator",
    "longKeywords": [
      "check if conversion test result is significant",
      "confidence interval for conversion rate difference",
      "compare conversion rates of two variants"
    ],
    "exampleInputs": {
      "nA": "10000",
      "xA": "500",
      "nB": "10000",
      "xB": "570",
      "confidence": "95"
    },
    "sections": [
      {
        "heading": "How do I check if conversion test result is significant?",
        "text": "Enter visitors and conversions for the control and the variant, then pick the confidence level you agreed before the test started. The calculator gives both conversion rates and the lift in percentage points and in relative terms. Significance comes from the p-value: if it is below one minus your confidence level, a difference this large would be unlikely if the variants truly converted alike. Keep the decision rule fixed in advance, and treat a significant result as evidence, not proof, that the variant is better in the future."
      },
      {
        "heading": "What does the confidence interval for conversion rate difference show?",
        "text": "The interval gives a range of plausible values for B minus A in percentage points. It is computed with the unpooled standard error, using the normal critical value for your confidence level. If the interval excludes zero, the test is significant at that level, and the interval also tells you how small or large the lift might be. A wide interval means the test has too few conversions to pin down the effect, even when the point estimate looks positive."
      },
      {
        "heading": "What common mistakes or limits should I watch for?",
        "text": "The most common mistake is checking the result every day and stopping when the p-value first dips under the threshold. That inflates false positives, because repeated looks give chance many chances to look significant. Another is testing many variants or metrics and reporting only the winner. The normal approximation is weaker with few conversions, so aim for at least about ten conversions and ten non-conversions per variant. Finally, a significant result does not show why the variant worked."
      }
    ],
    "faqs": [
      [
        "What sample size do I need before starting?",
        "The tool does not calculate sample size, so decide it before the test begins. Use a standard sample-size calculator with your current baseline rate and the smallest lift that would matter to you. Then run the test until you reach that size, and avoid stopping early when the result looks convincing."
      ],
      [
        "Does a one-sided test give a different answer?",
        "This calculator runs a two-sided test, so it checks for a difference in either direction. A one-sided test would put the whole error rate in one tail and can reach significance with less evidence, but only if you chose that direction before seeing the data. Pick the test type before you start."
      ],
      [
        "What if my conversion counts are very small?",
        "The z-test relies on a normal approximation, which is most reliable with at least about ten conversions and ten non-conversions per variant. With fewer events, the p-value and interval can be unreliable. Collect more traffic or run the test for longer before reading the result as significant or not."
      ]
    ]
  },
  "reorder-point-eoq-calculator": {
    "answer": "A reorder point calculator tells you the stock level at which to place a new order, and how much to order each time. It combines the economic order quantity (EOQ), which balances ordering and holding costs, with safety stock sized from demand variability and your chosen service level. Reorder point equals average daily demand times lead time, plus safety stock.",
    "aiSummary": "Computes economic order quantity, safety stock and reorder point from annual demand, daily demand variation, lead time and service level. It also gives safety stock for lead time demand and yearly cost. The main limitation is that lead-time variability is not modelled and demand is assumed normal.",
    "shortKeyword": "reorder point calculator",
    "longKeywords": [
      "how much stock to reorder and when",
      "economic order quantity for steady demand",
      "safety stock for lead time demand"
    ],
    "exampleInputs": {
      "annualDemand": "12000",
      "sdDaily": "12",
      "leadTime": "7",
      "service": "95"
    },
    "sections": [
      {
        "heading": "How much stock to reorder and when do I order?",
        "text": "This tool answers two questions for one product: how many units to buy in each order, and at what stock level to place the next order. Enter annual demand, the daily demand standard deviation, supplier lead time in days, the service level you want, and your ordering and holding cost. Optionally add unit cost to see total yearly spend. The reorder point is the level of stock that triggers the next purchase, so that stock does not run out during the lead time."
      },
      {
        "heading": "How should I read economic order quantity for steady demand?",
        "text": "EOQ is the order size that balances the yearly cost of placing orders against the yearly cost of holding stock. Bigger orders mean fewer orders and higher holding cost, smaller orders mean the reverse, and EOQ sits where the two curves cross. Read the reorder point as the trigger and the safety stock as the buffer against demand swings during the lead time. Higher service levels increase the buffer, so they raise average stock and holding cost. Treat the EOQ as a starting point to test against your supplier minimums."
      },
      {
        "heading": "What common mistakes or limits should I watch for?",
        "text": "A common mistake is using annual demand from a peak season as if it were constant, which inflates the order size. Another is entering a daily standard deviation that does not match the demand period you used for the average. The model assumes a fixed lead time, so a supplier who is often late needs a larger buffer than this shows. Quantity discounts, minimum order sizes and perishability are not modelled. Use the outputs as a first draft and review them against real stock-outs."
      }
    ],
    "faqs": [
      [
        "How do I convert a yearly demand figure to daily?",
        "Divide annual demand by 365 to get average daily demand. The tool uses that figure to compute demand over the lead time, which is average daily demand multiplied by lead time in days. Use the same time basis for the standard deviation, so daily variation is paired with daily demand."
      ],
      [
        "Should I use EOQ if my orders have a minimum quantity?",
        "Check it first. EOQ assumes you can order any quantity and that discounts do not apply, so a supplier minimum can force an order larger than the calculated figure. Round the EOQ to the nearest allowed pack or minimum, then recalculate the yearly cost to see the difference."
      ],
      [
        "Why is my reorder point higher than average demand?",
        "Because the reorder point adds safety stock to the demand that arrives during the lead time. The buffer is larger when demand varies more, when lead time is longer, or when you pick a higher service level. Average demand alone could run out during any unusually busy period."
      ]
    ]
  },
  "bogo-discount-breakeven-calculator": {
    "answer": "A discount breakeven calculator shows how many extra units a promotion must sell to earn the same profit as the normal price. It compares baseline profit with profit per unit under a buy one get one free, buy X get Y free, or percent-off offer. If profit per unit under the offer is zero or negative, no extra volume can make up the difference.",
    "aiSummary": "Finds the volume needed to offset a discount, so a promotion matches baseline profit at the normal price. It covers BOGO, buy X get Y free and percent-off offers, and reports the uplift in units and percent. The main limitation is that it assumes complete sets and flat unit costs.",
    "shortKeyword": "discount breakeven calculator",
    "longKeywords": [
      "how many extra units a promotion needs",
      "compare bogo and percent off margins",
      "volume needed to offset a discount"
    ],
    "exampleInputs": {
      "price": "40",
      "cost": "12",
      "offer": "bogo",
      "units": "500"
    },
    "sections": [
      {
        "heading": "How many extra units a promotion needs to break even?",
        "text": "Use this when you are deciding whether a discount or buy-more offer is worth running. Enter the normal price, the unit cost, the offer type and your usual baseline units for the period. The calculator works out baseline profit, which is the profit per unit times units sold at full price. It then finds how many units the offer must sell to make the same total profit, and shows the extra volume as units and as a percentage of the baseline. That gap is the minimum uplift you need to justify the promotion."
      },
      {
        "heading": "How do I compare BOGO and percent off margins?",
        "text": "Each offer has a different effective discount and therefore a different profit per unit. For buy X get Y free, the effective discount is Y divided by X plus Y, which is why buy one get one free equals half off on paper. Percent off reduces every unit's price directly. Compare the profit per unit under each offer, not just the sticker discount, and then the units needed to match baseline. Two offers that look similar can need very different volumes once the cost of the free units is counted."
      },
      {
        "heading": "Which assumptions can make this estimate wrong?",
        "text": "The model assumes customers buy complete sets, which may not hold: a shopper might take one free unit without buying the paid units. It also assumes unit costs stay flat, so bulk discounts from suppliers are not included. Extra fixed costs such as staff time are ignored, and so are returns and repeat purchases that a promotion might bring. If the profit per unit under the offer is zero or negative, the calculator says no volume can compensate. Use it to screen offers before testing them on real customers."
      }
    ],
    "faqs": [
      [
        "Can I enter a custom buy and free quantity?",
        "Yes. Choose the custom option, then set X as the number customers buy and Y as the number they get free. The effective discount is Y divided by X plus Y, and the same profit logic applies as for the standard offers, so compare the result with the baseline units you entered."
      ],
      [
        "How do I set the baseline units?",
        "Use units sold per period at the normal price, such as the same month last year or a typical week, so the comparison is fair. If sales vary a lot, use an average. The baseline sets the profit target the promotion must reach, so an unrealistic figure will give a misleading uplift."
      ],
      [
        "Should I test an offer before running it everywhere?",
        "Yes, where possible. A calculator can show the volume you need, but it cannot predict how customers respond. Run the offer on a limited set of products or a short window, compare results with your baseline, and roll it out only if the real volume beats the target."
      ]
    ]
  },
  "price-elasticity-calculator": {
    "answer": "A price elasticity of demand calculator measures how much quantity changes when price changes, using the midpoint formula on two observations. An absolute value above one means demand is elastic, below one inelastic. The tool also shows the revenue change between the two points and, if you enter unit cost, a constant-elasticity price that maximises profit.",
    "aiSummary": "Uses the midpoint method for two price points to measure price sensitivity from two price and quantity observations. It reports whether demand is elastic or inelastic, the revenue change, and an optional profit-maximising price. Its main limitation is that two points cannot describe a whole demand curve.",
    "shortKeyword": "price elasticity of demand calculator",
    "longKeywords": [
      "how to tell elastic from inelastic demand",
      "estimate revenue change after a price rise",
      "midpoint method for two price points"
    ],
    "exampleInputs": {
      "p1": "10",
      "q1": "1000",
      "p2": "12",
      "q2": "700",
      "cost": "6"
    },
    "sections": [
      {
        "heading": "How to tell elastic from inelastic demand?",
        "text": "Elasticity tells you how strongly buyers respond to a price change. A value with absolute size above one means quantity falls proportionally more than price rises, so revenue drops when you raise price. A value below one means buyers are less sensitive, so a price rise tends to lift revenue even as units fall. A value of exactly one means revenue stays flat. Read the sign as well: for normal goods the value is negative because higher price means lower quantity."
      },
      {
        "heading": "Why use the midpoint method for two price points?",
        "text": "The midpoint formula divides the change by the average of the old and new values, for both price and quantity. That makes the answer the same whichever point you call the start, which a simple percentage change does not. Enter the original and new price and quantity, and the tool does this for you. The result is a single estimate from two observations, so it describes movement between those two points rather than the whole demand curve. Use the revenue figures alongside it to see whether the change pays off."
      },
      {
        "heading": "What common mistakes should I avoid with elasticity?",
        "text": "A frequent mistake is treating one price change as a reliable elasticity for every price level, because demand curves are rarely constant-elasticity over a wide range. Another is changing price and something else at once, such as a promotion or a season, so the quantity change is not caused by price alone. Small price changes can be swamped by noise in the sales data, which makes the estimate unstable. Also remember that the profit-maximising price needs unit cost and a constant-elasticity assumption, so treat it as a starting point for testing rather than a final answer."
      }
    ],
    "faqs": [
      [
        "How do I estimate revenue change after a price rise?",
        "Multiply each price by its quantity to get revenue at both points, then compare the two totals. If units fall by more than the price rises in percentage terms, revenue drops; if they fall by less, revenue rises. The calculator shows the percentage change in revenue directly."
      ],
      [
        "What is a constant-elasticity price estimate?",
        "It assumes the same elasticity holds across all prices, so the profit-maximising price follows from unit cost and that elasticity. The tool uses the formula cost times elasticity divided by one plus elasticity, and only when elasticity is below minus one. Treat it as an illustration, because real demand is rarely constant."
      ],
      [
        "Can the elasticity be positive?",
        "Normally no for a standard demand curve, since higher prices reduce quantity and the sign is negative. A positive result usually points to a data problem, such as a supply shift or a change in demand at the same time as price. Check the inputs and the timing before drawing conclusions."
      ]
    ]
  },
  "ev-home-charging-time-cost-calculator": {
    "answer": "An EV charging time calculator estimates how long a home charge takes from battery size, starting and target charge, and the slower of the wallbox and onboard charger limits. It adjusts for charging efficiency, then converts the energy into grid kWh and cost at your electricity price. Taper at high charge levels is not modelled, so long top-ups often run longer than estimated.",
    "aiSummary": "Calculates charging time, grid energy and the cost of charging an EV at home, using the slower of charger and onboard limits plus efficiency loss. The main limitation is constant charge power, so slowdown at high charge and cold weather are not captured.",
    "shortKeyword": "ev charging time calculator",
    "longKeywords": [
      "how long does a home ev charge take",
      "work out wallbox charging time",
      "the cost of charging an ev at home"
    ],
    "exampleInputs": {
      "battery": "60",
      "start": "20",
      "target": "80",
      "chargerKw": "7.4"
    },
    "sections": [
      {
        "heading": "How long does a home EV charge take in hours?",
        "text": "Use this tool to plan overnight charging or to compare wallbox sizes before buying. Enter the usable battery capacity, the starting and target percentages, your charger's power, and the car's onboard AC limit, which is often the real cap. The calculator works out the energy needed for the range you choose, then divides by effective power and efficiency to give hours. Compare the result with the hours you have overnight to see if a full top-up fits."
      },
      {
        "heading": "How do I work out wallbox charging time for my car?",
        "text": "Work from the effective power, which is the lower of the charger rating and the car's AC limit, not the larger one. A 7.4 kW wallbox into an 11 kW car still charges at 7.4 kW before losses. Efficiency then reduces what reaches the battery, so the grid draws more energy than the battery stores. Cost follows the grid energy at your price per kWh, and range added comes from consumption per 100 km. Those four outputs together tell you the time, the energy, the money and the distance you gain."
      },
      {
        "heading": "What common mistakes or limits affect this estimate?",
        "text": "The biggest limit is constant power. Real sessions slow down as the battery fills and in cold weather, so times above about 80 percent are often longer than shown. A common mistake is entering the charger's rated power while the car's onboard charger is smaller, which overstates speed. Another is forgetting that the grid bill includes losses, so entering battery kWh alone understates cost. Public DC fast charging uses different rates and is not what this tool models. Treat the result as a home estimate and check your actual meter reading after one session."
      }
    ],
    "faqs": [
      [
        "What does the efficiency setting change?",
        "Efficiency is the share of grid energy that reaches the battery, so the rest is lost as heat in the charger and cable. Lowering it increases the grid energy and cost for the same battery gain, and it also lengthens the charge time. The default is only a starting point, and your own meter readings are a good check."
      ],
      [
        "How do I find the usable battery capacity?",
        "Use usable capacity from the manufacturer's specification or your car's app, not the gross figure printed on a marketing page, since usable capacity is what you can actually charge into. Results are only as reliable as this input, so check it first when your estimate looks off."
      ],
      [
        "Can I charge to full every night?",
        "The calculator will estimate that time, but charging to the top every night is a battery-care question rather than a calculation one. A lower daily target is one option, and it also shortens the session. Check your car's guidance on daily limits before changing the target."
      ]
    ]
  },
  "ac-btu-room-size-calculator": {
    "answer": "An AC tonnage calculator estimates the cooling capacity a room air conditioner needs, in BTU per hour and in tons. It starts from a floor-area chart and adjusts for sun exposure, extra people and kitchen heat. One ton equals 12,000 BTU per hour, so the result converts directly. Ceiling height, insulation and climate are not part of the estimate.",
    "aiSummary": "Estimates room air conditioner capacity in BTU per hour and tons from floor area, with adjustments for sun, occupants and kitchens. It helps answer how big an AC for a room should be. The main limitation is that it assumes a typical ceiling height and ignores insulation and climate.",
    "shortKeyword": "ac tonnage calculator",
    "longKeywords": [
      "choose a room ac by floor area",
      "convert btu per hour to tons",
      "how big an ac for a room"
    ],
    "exampleInputs": {
      "area": "300",
      "unit": "sqft",
      "sun": "sunny",
      "people": "4"
    },
    "sections": [
      {
        "heading": "How do I choose a room AC by floor area?",
        "text": "Start with the floor area of the room you want to cool, in square feet or square metres. The calculator reads that area against a sizing chart and returns a base capacity in BTU per hour. Then it adjusts the figure for very sunny or heavily shaded rooms, for each person beyond two in the room, and for a kitchen. Use the result to shortlist units, but compare the nearest rated sizes on a manufacturer label before buying."
      },
      {
        "heading": "How do I convert BTU per hour to tons?",
        "text": "Cooling capacity is quoted in two common units. Divide BTU per hour by 12,000 to get tons of refrigeration, which is the figure shown beside the BTU result. Some manufacturers and shops also quote kilowatts, a different unit, so check the label before comparing. Rounding up to the next available size is common, but a unit that is much too large can cycle on and off and struggle to remove humidity in hot weather."
      },
      {
        "heading": "What mistakes or limits should I know about sizing?",
        "text": "A common mistake is sizing by floor area alone and ignoring a very sunny room or heavy daily use by many people. Another is forgetting that the base figure assumes a typical ceiling height, so tall rooms may need more capacity. Large windows, insulation and local climate also change the real load. The calculator refuses areas below 100 or above 2,500 sq ft because the chart does not cover them. Confirm the final choice with an installer before buying."
      }
    ],
    "faqs": [
      [
        "How much does each extra person add to the estimate?",
        "Each person beyond two adds 600 BTU per hour, because people give off body heat. Two people or fewer add nothing, so a studio with one occupant uses only the chart and sun adjustments. A kitchen adds a separate fixed amount on top."
      ],
      [
        "Should I use square metres or square feet?",
        "Either works, as long as the unit selector matches the number you type. Square metres are converted at 1 square metre equals 10.7639 square feet before the chart lookup, so the result is the same for the same room. Double check the unit before you read the output."
      ],
      [
        "What should I do if my room is outside the chart range?",
        "The calculator will not give a figure for areas below 100 or above 2,500 sq ft, because the chart does not cover them. For a very small space, a compact unit is usually the practical choice. For a very large space, ask an installer to size a system with a proper load calculation."
      ]
    ]
  },
  "tv-viewing-distance-calculator": {
    "answer": "The TV viewing distance calculator estimates how far you should sit from a screen for a chosen horizontal field of view. Enter the diagonal size and aspect ratio and it works out the screen width, then finds the distance with a tangent. Pick 30 degrees, 40 degrees or a custom angle, or enter your seating distance to find the angle you get.",
    "aiSummary": "Computes the seating distance from a TV for a given horizontal field of view. It helps you work out screen width from a diagonal and aspect ratio, then uses half the width and half the angle to solve for distance. Runs in the browser. Limitation: only width is used, so mounting height is ignored.",
    "shortKeyword": "tv viewing distance calculator",
    "longKeywords": [
      "how far to sit from a TV",
      "seating distance for a chosen viewing angle",
      "work out screen width from a diagonal"
    ],
    "exampleInputs": {
      "diag": "65",
      "aspect": "16:9",
      "unit": "in",
      "dist": "100"
    },
    "sections": [
      {
        "heading": "How far to sit from a TV?",
        "text": "People use this to plan a living room before buying or mounting a set. Pick the diagonal and aspect ratio, then choose a horizontal field of view. The result is the distance at which the screen spans that angle. A larger angle means a bigger picture filling more of your vision and a shorter seat. Use it to compare a few screen sizes against the sofa you already have, rather than guessing from the box."
      },
      {
        "heading": "What do the 30 and 40 degree results tell you?",
        "text": "The 30 degree figure is often cited from SMPTE guidance and the 40 degree figure from THX guidance. Both are widely quoted starting points, not rules. Treat the shorter distance as a closer, more immersive seat and the longer one as a more relaxed view that shows the whole screen. The custom angle lets you test any value in between. If you enter a seating distance instead, the tool reports the angle that distance produces, so you can check whether an existing room already suits you."
      },
      {
        "heading": "What limits should you keep in mind?",
        "text": "The calculation uses screen width only, so the height of the screen above the floor is not included. That matters when you plan eye level and wall mount height, so check that separately. Personal comfort, room layout and the kind of content you watch all change what feels right. Treat the numbers as a starting range, then sit at a few distances and check what looks comfortable before you settle on a spot."
      }
    ],
    "faqs": [
      [
        "Which seating distance for a chosen viewing angle suits you?",
        "No single distance suits everyone. The calculator shows the distance for each angle so you can compare. Pick the angle that feels comfortable for your room and content, then use the distance it gives as your starting seat. Moving closer makes the picture feel larger; moving back gives a wider view of the whole screen."
      ],
      [
        "Can I check the angle my current seat gives?",
        "Yes. Enter the screen size, aspect ratio and the distance from your seat to the screen, and the calculator returns the horizontal field of view you get there. Measure from the screen to your eyes in the seat, using the same unit as the diagonal. The result is an estimate that uses width only."
      ],
      [
        "Why do the three distances differ so much?",
        "Each angle is a different share of your field of vision, so the distance changes with it. A smaller angle means you sit farther back, since the same screen spans less of your view. Larger angles bring you closer. Only the angle changes in the formula, so the spread follows directly from it."
      ]
    ]
  },
  "coffee-brew-ratio-calculator": {
    "answer": "The coffee to water ratio calculator works out how much water to pour for a given coffee dose, measured by weight. Ratios are written as grams of water per gram of coffee, so 16 means 1:16. Start from a dose or a target volume, then the tool multiplies the dose by the ratio. It can estimate extraction yield from a TDS reading and the amount in your cup.",
    "aiSummary": "Converts a coffee dose into brew water using a weight ratio, or works back from a target volume. It estimates extraction yield from the TDS of a brew, and calculates how much water dilutes a concentrate to a target ratio. Ratios are only starting points, and brewed liquid is less than water poured.",
    "shortKeyword": "coffee to water ratio calculator",
    "longKeywords": [
      "how much water for a coffee dose",
      "extraction yield from a TDS reading",
      "plan cold brew concentrate dilution water"
    ],
    "exampleInputs": {
      "mode": "dose",
      "dose": "20",
      "ratio": "16",
      "tds": "1.4",
      "bevG": "290"
    },
    "sections": [
      {
        "heading": "How much water for a coffee dose?",
        "text": "Start with the dose in grams, since weighing coffee is more repeatable than scooping it. Multiply that dose by the ratio to get the brew water in grams. Stronger coffee uses a lower number of grams of water per gram of coffee, while a higher ratio gives a lighter cup. Weigh the water too, because a scale keeps the proportions consistent from one brew to the next. Use the ratio as a starting point and adjust it after tasting."
      },
      {
        "heading": "How should you read the yield and TDS numbers?",
        "text": "Extraction yield estimates how much of the coffee ends up dissolved in the cup. It is calculated from the brew strength (TDS) and the beverage weight, divided by the dose. Yield is a diagnostic rather than a score. A low figure often means the coffee was under-extracted, and a high one can point to over-extraction, but taste is the final check. Compare changes between brews, changing one variable at a time."
      },
      {
        "heading": "What mistakes or limits should you watch for?",
        "text": "The most common mistake is mixing units, such as entering a cup size in ounces while the ratio expects grams. Remember that brewed coffee holds less liquid than the water you poured, because grounds absorb some of it. Also, the calculator does not know your beans, grind or equipment, so a ratio that suits one coffee may taste thin or harsh with another. Keep the TDS reading honest by measuring with a refractometer, and note your settings so you can repeat a good brew."
      }
    ],
    "faqs": [
      [
        "Can I check extraction yield from a TDS reading?",
        "Yes. Enter your brew TDS as a percentage, then the weight of the beverage in the cup. The tool multiplies TDS by that beverage weight and divides by the coffee dose, giving the extraction yield as a percentage. Use the result to compare brews against each other rather than as a pass or fail mark."
      ],
      [
        "Can I use it to plan cold brew concentrate dilution water?",
        "Yes. Set the concentrate ratio to how many grams of concentrate you make per gram of coffee, then set the target ratio you want after dilution. The tool gives the water to add as the dose multiplied by the difference between those two ratios. Taste the result, since concentrate strength is a matter of preference."
      ],
      [
        "How do I start from a target volume instead?",
        "Switch the calculate-from setting to target volume, then enter the number of cups and the size of each cup in millilitres. The tool treats that total as the brew water and divides it by the ratio to find the dose. Because grounds hold some water, the cup will hold less than the water you poured."
      ]
    ]
  },
  "sourdough-bakers-percentage-calculator": {
    "answer": "The bakers percentage calculator expresses every ingredient as a share of total flour, which is the base and always counts as the full amount. Enter the total dough weight, hydration, salt and starter, and it solves for the grams of flour, water, salt and starter. Starter flour and water are counted toward the totals, so only the remaining amounts are added.",
    "aiSummary": "Turns baker's percentages into ingredient weights for a total dough weight, hydration, salt level and starter share. It works out how starter flour and water are counted, then subtracts them from the totals to give the amounts to add. Limitation: it sets weights only and does not model fermentation time or temperature.",
    "shortKeyword": "bakers percentage calculator",
    "longKeywords": [
      "how to scale a sourdough recipe",
      "how many grams of flour per dough ball",
      "how starter flour and water are counted"
    ],
    "exampleInputs": {
      "total": "1000",
      "hydration": "70",
      "starterPct": "20",
      "balls": "4"
    },
    "sections": [
      {
        "heading": "How to scale a sourdough recipe by weight?",
        "text": "Scaling a recipe by weight is simpler when you work from percentages. Flour is always the base, so every other ingredient is a fixed share of it. Choose the total dough weight you want, and the calculator sets the proportions for you. Doubling a batch means doubling the total while keeping the same hydration, salt and starter percentages, so the flavour and texture stay consistent. Write the result down as a formula you can reuse next time."
      },
      {
        "heading": "What do the starter percentages change?",
        "text": "The starter is a mix of flour and water that already contains fermenting culture. Its percentage sets how much of the total flour is held in the starter, so a larger starter share reduces the flour you add later. Starter hydration matters because a stiff starter and a loose starter hold different amounts of water per gram of flour. The calculator splits the starter into its flour and water first, then subtracts those from the totals so the dough still reaches the hydration you set."
      },
      {
        "heading": "What mistakes or limits should you avoid?",
        "text": "A common mistake is entering the total dough weight in the wrong unit. Remember that the total includes salt, water and starter, not only flour. If the starter needs more water or flour than the recipe contains, the calculator shows an error rather than guessing. The tool also does not account for flour absorption differences, so expect to adjust water by feel. Check the sum of all ingredients shown as a check against your target."
      }
    ],
    "faqs": [
      [
        "How many grams of flour per dough ball?",
        "Divide the dough into equal parts by the number of balls. The calculator gives you the total dough weight, so each ball is that figure divided by your ball count. To find the flour in one ball, multiply that ball weight by the flour share of the dough, which you can read from the flour and total figures."
      ],
      [
        "What if the starter needs more water than I have?",
        "The calculator checks the starter split against your recipe totals. If the starter needs more water or flour than the recipe contains, it shows an error instead of producing unreliable weights. Reduce the starter share or raise the total hydration, then calculate again to get a valid set of amounts."
      ],
      [
        "Can I use it for a dough with no starter?",
        "Yes. Set the starter percentage to zero and the calculator treats all the flour and water as added directly. Hydration, salt and total weight still work the same way, so you can use it for a plain yeasted dough. It has no yeast field, so note yeast separately in your own recipe."
      ]
    ]
  },
  "caffeine-half-life-calculator": {
    "answer": "The caffeine half life calculator estimates how much caffeine remains in your body after a given time, using exponential decay. Each half-life, the amount falls by half. Enter the dose, hours since it was taken and your chosen half-life, and the tool returns what is left. It is an educational model, not medical advice, and the half-life you enter drives every result.",
    "aiSummary": "Estimates caffeine left in the body from one or two doses, using exponential decay with a half-life you supply. It also reports the time to a threshold. The core formula is dose times one half raised to hours divided by half-life. Limitation: a simplified model that ignores absorption time and individual differences.",
    "shortKeyword": "caffeine half life calculator",
    "longKeywords": [
      "how much caffeine is left after a drink",
      "how long until caffeine drops below a threshold",
      "adding a second dose to the total"
    ],
    "exampleInputs": {
      "dose": "200",
      "hours": "5",
      "halfLife": "5",
      "threshold": "50"
    },
    "sections": [
      {
        "heading": "How much caffeine is left after a drink?",
        "text": "The tool starts from the dose you enter and the time since you had it. Each half-life that passes cuts the remaining amount in half, so the curve falls quickly at first and then more slowly in absolute terms. With a 200 mg dose, 5 hours and a 5 hour half-life, about half the dose remains. Change the half-life to see how much the answer depends on it, since individuals differ."
      },
      {
        "heading": "How long until caffeine drops below a threshold?",
        "text": "The threshold is a level you choose, such as a level you want to stay under. The tool uses the fact that all doses decay at the same rate, so the time to fall below the threshold is the half-life multiplied by the base-two logarithm of the current total divided by the threshold. A larger gap between the current amount and the threshold means more time. The threshold is only a number you pick, not a medical limit."
      },
      {
        "heading": "Where does this model fall short?",
        "text": "The model is simple: one half-life applies to every dose, and absorption is ignored, so the peak after a drink may come later than the decay curve suggests. Half-life varies widely from person to person and is affected by pregnancy, some medications, liver function and other factors. The tool does not know how much caffeine a drink contains, so look up that figure separately. Use the result as a rough guide and not as advice about what you should consume."
      }
    ],
    "faqs": [
      [
        "Why does the threshold matter?",
        "The threshold gives the tool a level to measure against. Without one, you see the remaining amount only. With one, you also see how many more hours it takes to drop below that number. Pick a value that reflects what you want to know, and keep in mind it is an estimate rather than a clinical figure."
      ],
      [
        "Can I use the tool for tea or energy drinks?",
        "Yes, as long as you enter the caffeine content yourself in milligrams. The tool treats any source the same, so tea, coffee and energy drinks all work once you know their total caffeine. The result is only as accurate as the figure you type in, so check the label or a reliable reference."
      ],
      [
        "How does adding a second dose to the total work?",
        "Adding a second dose to the total works this way: each dose decays on its own timeline, so the tool calculates what remains from each one and adds the results. Enter the second dose with its own hours-since value. Set it to zero if you had only one drink."
      ]
    ]
  },
  "vdot-race-equivalency-calculator": {
    "answer": "The running pace calculator turns a recent race result into a VDOT score, based on the Daniels and Gilbert equations. From that score it gives your average pace per kilometre and mile, plus predicted finish times at 5K, 10K, half marathon and marathon distances. Results are model predictions, so real races depend on training, weather and pacing.",
    "aiSummary": "Converts one race time into a VDOT value using Daniels-style equations, then estimates equivalent finish times for half marathon and other standard distances. It also reports average pace per kilometre and mile for the race. The method is a published physiological model, so predictions are approximate. Training paces are not included.",
    "shortKeyword": "running pace calculator",
    "longKeywords": [
      "convert race time to pace per kilometre",
      "predict my marathon time from a 5K",
      "equivalent finish times for half marathon"
    ],
    "exampleInputs": {
      "distance": "5000",
      "h": "0",
      "m": "20",
      "s": "0"
    },
    "sections": [
      {
        "heading": "Can I convert race time to pace per kilometre?",
        "text": "Yes. Enter the distance you raced and your finish time in hours, minutes and seconds. The calculator divides the distance by the time to get your average speed, then shows the pace for each kilometre and each mile. Average pace is useful for planning splits, but you will still pace the first kilometres more gently than the last if the race is hard. Use the per-mile figure if your race signage uses miles."
      },
      {
        "heading": "What does the VDOT number actually mean?",
        "text": "VDOT is a score that tries to describe your running ability from one race result, combining how fast you ran with how long you could hold that pace. A higher figure means a faster predicted race at every distance. Compare VDOT values from similar races, since a short race done flat out and a longer race at steady effort can produce different scores. Treat VDOT as a relative guide to your current fitness, not as a fixed rating that will remain the same."
      },
      {
        "heading": "Where do these predictions go wrong?",
        "text": "Predictions assume that the race was run with a sensible pace and that your training matches the event. Hills, heat, wind, a poor taper or a bad day all move the real result away from the estimate. A single fast 5K does not guarantee a strong marathon, because the longer distance depends on endurance that a short race does not test. The tool also does not give training paces, so use a separate plan for those sessions. Treat the output as an educational estimate, not professional coaching advice."
      }
    ],
    "faqs": [
      [
        "Can I predict my marathon time from a 5K?",
        "You can enter a 5K result and read the equivalent marathon time the tool produces. Equivalent times are estimates that assume similar training and pacing across distances. Longer races are harder to predict, so treat the marathon figure as a rough target."
      ],
      [
        "Does the result work for trail or treadmill runs?",
        "The equations assume a race run at a steady, measured effort on a course that allows an honest pace. Trail courses, hills, heat and treadmill sessions can change the speed you achieved, so the VDOT may not reflect your fitness well. Use the result with care, and prefer flat, recent road races when you have the choice."
      ],
      [
        "What if my race length is not in the menu?",
        "Choose the listed distance that matches your race exactly. The tool only accepts the distances in its menu, so a race of another length cannot be entered as it stands. Check the hours, minutes and seconds carefully, because a typing slip changes the score as much as a wrong distance would."
      ]
    ]
  },
  "rupee-number-to-words-converter": {
    "answer": "The rupee words converter writes an Indian rupee amount in words using crore, lakh, thousand and hundred, with paise spelled out as well. It also shows the Indian comma format, such as the grouping of lakh and crore, and a cheque-style line ending in Only. It is a formatting aid, so check the wording against your bank or organisation before you rely on it.",
    "aiSummary": "Converts a rupee amount into Indian-English words, using crore, lakh, thousand and hundred blocks, and rounds paise to two places. It also produces the Indian digit-grouping format and a cheque-style line. Runs in the browser. Limitation: the wording is a formatting aid and up to 12 digits before the decimal point are handled.",
    "shortKeyword": "rupee words converter",
    "longKeywords": [
      "number to words in lakhs and crores",
      "cheque amount in words for a bank",
      "indian comma format for invoices"
    ],
    "exampleInputs": {
      "amount": "1234567.89"
    },
    "sections": [
      {
        "heading": "Can I write a number to words in lakhs and crores?",
        "text": "The Indian system groups digits differently from the western thousands system. After the last three digits, the groups are of two, so the next block is thousands, then lakhs of hundred thousands, then crores of ten million. The converter splits the whole rupee part into these blocks and spells out each one. Each block of digits is read as its own phrase. Read the words from the largest block down to the smallest for the amount to make sense."
      },
      {
        "heading": "How is the Indian comma format for invoices built?",
        "text": "The comma format puts the last three digits in one group, then groups the rest in pairs moving left. A value of one lakh twenty three thousand is written with commas after the hundreds and then every two digits. Use the same grouping on invoices so totals match what your readers expect. Keep the decimal point with the paise, which are rounded half up to two places before grouping. Check the result against a printed example before you send it."
      },
      {
        "heading": "Where could the wording go wrong?",
        "text": "Zero and single-rupee amounts need special handling, since a one rupee amount uses the singular form. Very large values beyond the supported digit limit are not converted, so keep the amount within that limit. The tool does not follow any single bank's rules, and some banks prefer particular wording or spacing on cheques. Check the final line against your bank or organisation before you sign or send a document, rather than assuming it will be accepted."
      }
    ],
    "faqs": [
      [
        "Should a cheque amount in words for a bank follow a set format?",
        "The tool produces a standard Indian-English line ending in Only, which is the usual style on cheques and vouchers. Some banks have their own rules for capitalisation, punctuation or spacing. Compare the output with a cheque from your bank or ask them directly, and adjust the line by hand if they require something different."
      ],
      [
        "Can I get the Indian comma format as well?",
        "Yes. The same amount is shown in the Indian comma format, grouping the last three digits and then pairs of digits, with the rupee sign in front. This lets you check the number you typed against the words. If the two do not match, look for a typing slip in the amount field before you copy the result."
      ],
      [
        "Is there a limit on how large the amount can be?",
        "Yes. The converter handles up to 12 digits before the decimal point, which covers very large sums but not unlimited values. Amounts with more digits than that will not be converted correctly. For anything beyond that size, write the amount in a standard format by hand and have it checked."
      ]
    ]
  },
  "exam-negative-marking-calculator": {
    "answer": "The negative marking calculator works out your net exam score when correct answers earn marks and wrong answers lose marks. It also gives accuracy, the share of attempts you got right, and attempt rate. Break-even accuracy shows the level at which a guess has zero expected gain. You enter the marking scheme yourself, since rules vary between exams.",
    "aiSummary": "Calculates exam score from correct and wrong answers, using marks per correct answer and a penalty per wrong one that you supply. It reports accuracy, the attempt rate for an exam section, marks lost to penalties and break-even accuracy. Limitation: it applies your inputs and does not know any exam's official rules.",
    "shortKeyword": "negative marking calculator",
    "longKeywords": [
      "how to calculate break-even guessing accuracy",
      "should I guess on negative marking exams",
      "attempt rate for an exam section"
    ],
    "exampleInputs": {
      "correct": "120",
      "wrong": "40",
      "mpos": "4",
      "mneg": "1"
    },
    "sections": [
      {
        "heading": "How to calculate break-even guessing accuracy?",
        "text": "Break-even accuracy balances the gain of a correct guess against the loss of a wrong one. If a right answer earns m marks and a wrong answer costs n, the expected gain is zero when your chance of being right equals n divided by m plus n. With +4 and −1 it is one fifth. Above it, guessing adds value on average, and below it, guessing tends to lower your score. Use the figure to decide how much to guess."
      },
      {
        "heading": "What do accuracy and attempt rate tell you?",
        "text": "Accuracy looks only at the questions you answered, dividing correct answers by the sum of correct and wrong answers. Attempt rate looks at the whole paper, showing how much of it you tried. A student can have high accuracy and a low attempt rate, which means they were careful but left many questions blank. Reading the two together shows whether a score is limited by knowledge, by time or by a cautious approach to guessing."
      },
      {
        "heading": "What can the calculator not tell you?",
        "text": "The calculator applies the marking scheme you type in, so a wrong scheme gives a wrong score. It does not know the official rules for any exam, which change between years and sections. It also cannot predict your rank, because rank depends on how other candidates perform. The break-even figure assumes every guess has the same chance of being right, which may not hold for every question."
      }
    ],
    "faqs": [
      [
        "Should I guess on negative marking exams?",
        "Guess only when you can eliminate some options or have a real reason to prefer one answer. Compare your accuracy on attempted questions with the break-even figure from the calculator. If your accuracy is above that level, guessing adds value on average, and if it is below, leaving questions blank protects your score."
      ],
      [
        "What if I leave questions blank?",
        "Blank questions earn nothing and lose nothing, so they do not appear in the wrong count. The attempt rate drops as you skip more questions, while accuracy is measured only on the ones you answered. A blank is therefore the safe choice when you cannot narrow the options."
      ],
      [
        "Is the maximum marks field needed?",
        "No. The maximum marks field is optional, and the net score, accuracy, attempt rate and break-even figure are worked out from the other inputs. Enter it only if your exam reports a total you want to compare against. The score itself does not depend on it."
      ]
    ]
  },
  "attendance-percentage-calculator": {
    "answer": "This 75 percent attendance calculator divides the classes you attended by the total held so far, then shows how many you can miss or must attend in a row to reach your required percentage. It works for any target you enter, not only 75. Institutions and courses set their own rules, so confirm yours before planning around the result.",
    "aiSummary": "Computes attendance as classes attended divided by classes held, then works out how many classes can be missed, or how many must be attended in a row, to meet a required percentage. An optional end-of-term projection assumes all remaining classes count. Limitation: the required percentage must match your institution's own rule.",
    "shortKeyword": "75 percent attendance calculator",
    "longKeywords": [
      "classes you can miss this term",
      "classes to attend in a row",
      "projected attendance at the end of term"
    ],
    "exampleInputs": {
      "attended": "60",
      "total": "90",
      "required": "75",
      "remaining": "30"
    },
    "sections": [
      {
        "heading": "Can you check the classes you can miss this term?",
        "text": "Start with the classes attended and the total held so far. The calculator turns those into a percentage, then compares it with the required figure you enter. If you are above the requirement, it shows how many more classes you could miss before dropping below. Keep track of this number each week, because a few missed sessions can change it more than you expect. Recheck the numbers after each class so the answer stays current."
      },
      {
        "heading": "How many classes to attend in a row when you are short?",
        "text": "When your attendance is below the required figure, missing more classes will not help. Each class you attend adds to both the attended count and the total held, so the calculator works out the smallest run of attended classes that lifts the percentage to your target. That figure assumes you attend every one of them with no misses in between, and that every new class is counted. Compare it with the classes left in the term to judge whether recovery is realistic."
      },
      {
        "heading": "What does projected attendance at the end of term show?",
        "text": "The projection assumes every remaining class is counted and shows the percentage you would finish with under a chosen pattern. Two extremes are useful: attending all remaining classes and missing all of them. Seeing both lets you judge how much room you have. The projection does not account for holidays, exemptions, late marks or institutional rules, so check those separately before relying on any final figure."
      }
    ],
    "faqs": [
      [
        "Can I use it for a required percentage other than 75?",
        "Yes. Replace the required figure with the percentage your course uses, and the calculator updates the miss and attend results to match. The formulas work for any sensible percentage, so enter the rule exactly as your institution states it."
      ],
      [
        "What if I have already missed too many classes?",
        "Once attendance falls below the required figure, the tool switches to the calculation for classes to attend in a row. Missing further classes makes the required run longer, so the sooner you attend, the smaller it is. If the run needed is larger than the classes left in term, the target cannot be met through this method."
      ],
      [
        "How do I read projected attendance at the end of term?",
        "Look at the figure assuming you attend every remaining class, then the figure assuming you miss them all. Anything in between depends on how many you actually attend. Use the two as a range, and recheck it as the term moves on, since the total held changes each week."
      ]
    ]
  },
};
