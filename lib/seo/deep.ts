// Deeper written content for high-intent tools. Numbers in worked examples are computed from the tool's own
// formula (see workedExample); this file holds only qualitative text and example *inputs*.
// Generated and validated by the content pipeline described in docs/SEO_AEO_GEO_PLAN_2026-11-18.md.
export interface DeepContent {
  answer: string;
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
};
