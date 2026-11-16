import type { ToolDef } from '../types';
export const INDIA: ToolDef[] = [
  {
    "slug": "emi-calculator",
    "name": "EMI Calculator (India)",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Calculate a fixed-rate loan EMI in rupees with total interest and repayment.",
    "metaDescription": "Calculate a fixed-rate loan EMI in rupees with total interest and repayment. See the formula, worked example and assumptions.",
    "keywords": [
      "emi calculator (india)",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "principal",
        "label": "Loan amount",
        "type": "number",
        "def": 100000,
        "min": 0,
        "max": 1000000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Annual interest rate",
        "type": "number",
        "def": 12,
        "min": 0,
        "max": 100,
        "unit": "%"
      },
      {
        "key": "months",
        "label": "Loan term",
        "type": "number",
        "def": 12,
        "min": 1,
        "max": 600,
        "unit": "months"
      }
    ],
    "content": {
      "intro": "Calculate a fixed-rate loan EMI in rupees with total interest and repayment.",
      "how": "EMI = P × r / (1 − (1+r)^−n), using monthly decimal rate r and number of months n. At 0%, EMI is principal divided by months. Fees and floating-rate resets are excluded.",
      "example": "₹1,00,000 at 12% annually for 12 months gives an EMI of approximately ₹8,884.88.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Is this a lender quote?",
          "No. Enter your quoted rate and add fees separately. Floating-rate loans can change."
        ],
        [
          "Can I enter zero interest?",
          "Yes. Principal is divided equally over the term."
        ],
        [
          "Is APR the same as interest rate?",
          "No. APR may include fees; this formula uses the periodic note rate."
        ]
      ]
    },
    "sources": [
      {
        "label": "RBI: financial education and borrowing",
        "url": "https://www.rbi.org.in/FinancialEducation/"
      }
    ],
    "related": [
      "loan-calculator",
      "home-affordability-calculator"
    ]
  },
  {
    "slug": "sip-calculator",
    "name": "SIP Calculator (India)",
    "category": "investing",
    "widget": "calc",
    "prio": "P1",
    "short": "Project monthly SIP contributions in rupees using an assumed return and contribution timing.",
    "metaDescription": "Project monthly SIP contributions in rupees using an assumed return and contribution timing. See the formula, worked example and assumptions.",
    "keywords": [
      "sip calculator (india)",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "monthly",
        "label": "Monthly contribution",
        "type": "number",
        "def": 5000,
        "min": 0,
        "max": 10000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Assumed annual nominal return",
        "type": "number",
        "def": 10,
        "min": 0,
        "max": 50,
        "unit": "%"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "def": 10,
        "min": 1,
        "max": 50
      },
      {
        "key": "timing",
        "label": "Deposit timing",
        "type": "select",
        "def": "end",
        "options": [
          {
            "value": "end",
            "label": "End of month"
          },
          {
            "value": "begin",
            "label": "Beginning of month"
          }
        ]
      }
    ],
    "content": {
      "intro": "Project monthly SIP contributions in rupees using an assumed return and contribution timing.",
      "how": "The future value of monthly deposits is C × ((1+r)^n − 1) / r. Beginning-of-month deposits multiply this by (1+r). Return is an assumption, not a mutual-fund forecast; taxes and charges are excluded.",
      "example": "₹1,000 each month for one year at an assumed 0% return gives ₹12,000. Positive assumed returns are not guaranteed.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Are returns guaranteed?",
          "No. Market returns vary and may be negative. This constant-rate projection is illustrative."
        ],
        [
          "Are taxes or fund expenses included?",
          "No. Adjust assumptions or calculate them separately."
        ],
        [
          "Does SIP remove investment risk?",
          "No. Periodic investing does not guarantee a profit."
        ]
      ]
    },
    "sources": [
      {
        "label": "SEBI investor education",
        "url": "https://investor.sebi.gov.in/"
      }
    ],
    "related": [
      "compound-interest-calculator",
      "dollar-cost-averaging-calculator"
    ]
  },
  {
    "slug": "india-gst-calculator",
    "name": "GST Calculator (India)",
    "category": "tax",
    "widget": "calc",
    "prio": "P1",
    "short": "Add or reverse Indian GST and split tax into IGST or CGST plus SGST/UTGST.",
    "metaDescription": "Add or reverse Indian GST and split tax into IGST or CGST plus SGST/UTGST. See the formula, worked example and assumptions.",
    "keywords": [
      "gst calculator (india)",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "amount",
        "label": "Amount",
        "type": "number",
        "def": 1180,
        "min": 0,
        "max": 1000000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Applicable total GST rate",
        "type": "number",
        "def": 18,
        "min": 0,
        "max": 100,
        "unit": "%"
      },
      {
        "key": "mode",
        "label": "Price basis",
        "type": "select",
        "def": "included",
        "options": [
          {
            "value": "before",
            "label": "Before tax"
          },
          {
            "value": "included",
            "label": "Tax inclusive"
          }
        ]
      },
      {
        "key": "supply",
        "label": "Supply type",
        "type": "select",
        "def": "intra",
        "options": [
          {
            "value": "intra",
            "label": "Intrastate"
          },
          {
            "value": "inter",
            "label": "Interstate"
          }
        ]
      }
    ],
    "content": {
      "intro": "Add or reverse Indian GST and split tax into IGST or CGST plus SGST/UTGST.",
      "how": "Add GST as base × rate. Reverse an inclusive price by dividing by 1 + rate. Interstate mode shows IGST; intrastate mode splits the arithmetic equally. Select the rate applicable to the supply; this tool does not determine classification or place of supply.",
      "example": "₹1,180 inclusive of an assumed 18% GST has a ₹1,000 base and ₹180 GST. In intrastate mode that is ₹90 each CGST and SGST/UTGST.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Does the tool choose the legal GST rate?",
          "No. Confirm HSN/SAC classification, transaction date and applicable notifications."
        ],
        [
          "Are cess and reverse charge included?",
          "No. This is a basic percentage and split calculation."
        ],
        [
          "Does it file a return?",
          "No. It is not a filing or compliance service."
        ]
      ]
    },
    "sources": [
      {
        "label": "CBIC: GST invoice rules",
        "url": "https://cbic-gst.gov.in/gst-invoice-rules.html"
      }
    ],
    "related": [
      "canada-gst-hst-calculator",
      "vat-calculator"
    ]
  },
  {
    "slug": "ppf-calculator",
    "name": "PPF Calculator — Annual Projection",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Project a PPF-style annual savings balance using an assumed interest rate and annual contribution.",
    "metaDescription": "Project a PPF-style annual savings balance using an assumed interest rate and annual contribution. See the formula, worked example and assumptions.",
    "keywords": [
      "ppf calculator — annual projection",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "annual",
        "label": "Annual contribution",
        "type": "number",
        "def": 150000,
        "min": 500,
        "max": 150000,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Assumed annual interest",
        "type": "number",
        "def": 7.1,
        "min": 0,
        "max": 20,
        "unit": "%"
      },
      {
        "key": "years",
        "label": "Projection years",
        "type": "number",
        "def": 15,
        "min": 1,
        "max": 50
      }
    ],
    "content": {
      "intro": "Project a PPF-style annual savings balance using an assumed interest rate and annual contribution.",
      "how": "The model deposits the annual contribution at the start of each modeled year and compounds yearly at a constant assumed rate. Actual PPF interest uses monthly qualifying balances, credited yearly, and rates can change quarterly. This is not an account statement or exact maturity-date calculation.",
      "example": "₹1,000 contributed at the start of a modeled year at an assumed 7% earns ₹70 by year end.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Is 7.1% guaranteed for the full term?",
          "No. The input is an assumption. Government-notified PPF rates can change."
        ],
        [
          "Does this model deposits after the fifth day?",
          "No. It assumes an early contribution and simplifies monthly qualifying-balance rules."
        ],
        [
          "Is the projection date a legal maturity date?",
          "No. PPF maturity depends on financial-year and account-opening rules."
        ]
      ]
    },
    "sources": [
      {
        "label": "India Post: savings schemes and PPF",
        "url": "https://www.indiapost.gov.in/banking-services/savings"
      }
    ],
    "related": [
      "sip-calculator",
      "fd-calculator"
    ]
  },
  {
    "slug": "fd-calculator",
    "name": "FD Calculator — Deposit Maturity",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Estimate fixed-deposit maturity and interest before tax using an assumed compounding frequency.",
    "metaDescription": "Estimate fixed-deposit maturity and interest before tax using an assumed compounding frequency. See the formula, worked example and assumptions.",
    "keywords": [
      "fd calculator — deposit maturity",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "principal",
        "label": "Deposit",
        "type": "number",
        "def": 100000,
        "min": 0,
        "max": 1000000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Annual interest",
        "type": "number",
        "def": 7,
        "min": 0,
        "max": 30,
        "unit": "%"
      },
      {
        "key": "years",
        "label": "Term in years",
        "type": "number",
        "def": 1,
        "min": 0.01,
        "max": 50
      },
      {
        "key": "frequency",
        "label": "Compounding",
        "type": "select",
        "def": "4",
        "options": [
          {
            "value": "1",
            "label": "Annual"
          },
          {
            "value": "2",
            "label": "Half-yearly"
          },
          {
            "value": "4",
            "label": "Quarterly"
          },
          {
            "value": "12",
            "label": "Monthly"
          }
        ]
      }
    ],
    "content": {
      "intro": "Estimate fixed-deposit maturity and interest before tax using an assumed compounding frequency.",
      "how": "Maturity = principal × (1 + annual rate / compounding frequency)^(frequency × years). This models a cumulative deposit without withdrawals. Bank day counts, payout options, premature closure and TDS can differ.",
      "example": "₹10,000 at 8% for one year with annual compounding becomes ₹10,800 before tax.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Is TDS included?",
          "No. The result is interest before tax and withholding."
        ],
        [
          "Does it handle premature withdrawals?",
          "No. Bank penalties and revised rates must be modeled separately."
        ],
        [
          "Is the example a current bank offer?",
          "No. All entered rates are assumptions."
        ]
      ]
    },
    "sources": [
      {
        "label": "RBI: financial education and borrowing",
        "url": "https://www.rbi.org.in/FinancialEducation/"
      }
    ],
    "related": [
      "rd-calculator",
      "compound-interest-calculator"
    ]
  },
  {
    "slug": "rd-calculator",
    "name": "RD Calculator — Monthly Deposits",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Estimate recurring-deposit maturity from equal monthly deposits and quarterly-compounding assumptions.",
    "metaDescription": "Estimate recurring-deposit maturity from equal monthly deposits and quarterly-compounding assumptions. See the formula, worked example and assumptions.",
    "keywords": [
      "rd calculator — monthly deposits",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "monthly",
        "label": "Monthly deposit",
        "type": "number",
        "def": 1000,
        "min": 0,
        "max": 10000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Annual nominal interest",
        "type": "number",
        "def": 7,
        "min": 0,
        "max": 30,
        "unit": "%"
      },
      {
        "key": "months",
        "label": "Term",
        "type": "number",
        "def": 12,
        "min": 1,
        "max": 600,
        "unit": "months"
      }
    ],
    "content": {
      "intro": "Estimate recurring-deposit maturity from equal monthly deposits and quarterly-compounding assumptions.",
      "how": "Each monthly installment is assumed to arrive at the beginning of the month. The equivalent monthly growth factor is (1 + annual rate/4)^(1/3). Bank day-count conventions, delays, tax and penalties are excluded.",
      "example": "At 0% interest, twelve ₹1,000 monthly deposits produce ₹12,000. At a positive assumed rate, earlier installments earn longer.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Why is my bank amount slightly different?",
          "Actual deposit dates, day counts and rounding conventions can differ."
        ],
        [
          "Does it include missed-installment penalties?",
          "No. Deposits are assumed equal and on time."
        ],
        [
          "Is maturity shown before tax?",
          "Yes. Tax and withholding are excluded."
        ]
      ]
    },
    "sources": [
      {
        "label": "RBI: financial education and borrowing",
        "url": "https://www.rbi.org.in/FinancialEducation/"
      }
    ],
    "related": [
      "fd-calculator",
      "sip-calculator"
    ]
  },
  {
    "slug": "epf-calculator",
    "name": "EPF Calculator — Balance Projection",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Project an EPF balance from actual employee and employer EPF deposits, excluding EPS.",
    "metaDescription": "Project an EPF balance from actual employee and employer EPF deposits, excluding EPS. See the formula, worked example and assumptions.",
    "keywords": [
      "epf calculator — balance projection",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "balance",
        "label": "Opening EPF balance",
        "type": "number",
        "def": 100000,
        "min": 0,
        "max": 1000000000.0,
        "unit": "₹"
      },
      {
        "key": "employee",
        "label": "Monthly employee EPF credit",
        "type": "number",
        "def": 1800,
        "min": 0,
        "max": 10000000.0,
        "unit": "₹"
      },
      {
        "key": "employer",
        "label": "Monthly employer EPF credit (exclude EPS)",
        "type": "number",
        "def": 550,
        "min": 0,
        "max": 10000000.0,
        "unit": "₹"
      },
      {
        "key": "rate",
        "label": "Assumed annual credited interest",
        "type": "number",
        "def": 8,
        "min": 0,
        "max": 20,
        "unit": "%"
      },
      {
        "key": "years",
        "label": "Years",
        "type": "number",
        "def": 10,
        "min": 1,
        "max": 50
      }
    ],
    "content": {
      "intro": "Project an EPF balance from actual employee and employer EPF deposits, excluding EPS.",
      "how": "Monthly deposits are held constant. Estimated monthly interest accrues on the balance before that month’s contribution and is added annually. Enter only the employer amount credited to EPF, not its separate EPS allocation. Rates, wages and contributions are assumptions; compare the passbook for actual credits.",
      "example": "With ₹0 opening balance, ₹1,000 employee and ₹500 employer EPF deposits per month, zero assumed interest gives ₹18,000 after one year.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Does this calculate EPS pension?",
          "No. EPS contributions and pension are separate."
        ],
        [
          "Are future EPF rates guaranteed?",
          "No. Replace the assumed rate with your scenario; actual rates are notified by year."
        ],
        [
          "Are salary increments included?",
          "No. Monthly contribution credits stay constant in this simplified projection."
        ]
      ]
    },
    "sources": [
      {
        "label": "EPFO member information",
        "url": "https://www.epfindia.gov.in/"
      }
    ],
    "related": [
      "ppf-calculator",
      "retirement-calculator"
    ]
  },
  {
    "slug": "gratuity-calculator",
    "name": "Gratuity Calculator — Formula Estimate",
    "category": "finance",
    "widget": "calc",
    "prio": "P1",
    "short": "Apply the 15/26 gratuity formula to eligible monthly wages and counted service years.",
    "metaDescription": "Apply the 15/26 gratuity formula to eligible monthly wages and counted service years. See the formula, worked example and assumptions.",
    "keywords": [
      "gratuity calculator — formula estimate",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "wage",
        "label": "Eligible monthly wages (confirm with payroll)",
        "type": "number",
        "def": 26000,
        "min": 0,
        "max": 100000000.0,
        "unit": "₹"
      },
      {
        "key": "years",
        "label": "Completed service years",
        "type": "number",
        "def": 5,
        "min": 0,
        "max": 60
      },
      {
        "key": "extraMonths",
        "label": "Additional completed months",
        "type": "number",
        "def": 0,
        "min": 0,
        "max": 11
      }
    ],
    "content": {
      "intro": "Apply the 15/26 gratuity formula to eligible monthly wages and counted service years.",
      "how": "The illustration uses eligible monthly wages × 15 / 26 × counted service years. Extra service strictly greater than six months rounds up. This does not determine legal eligibility, wage components, statutory ceiling, fixed-term treatment or tax exemption. Current labour-code rules and employment terms require separate review.",
      "example": "₹26,000 eligible wages and 5 completed years give ₹75,000 under the illustrated 15/26 formula.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Does this decide whether I am eligible?",
          "No. Eligibility differs with circumstances, contract type and current rules."
        ],
        [
          "Are all salary allowances automatically included?",
          "No. Confirm the legally applicable wage definition with payroll."
        ],
        [
          "Does this apply a tax-exempt ceiling?",
          "No. Formula amount, payable cap and tax exemption are separate questions."
        ]
      ]
    },
    "sources": [
      {
        "label": "Ministry of Labour: social security code FAQs (2026)",
        "url": "https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf"
      }
    ],
    "related": [
      "salary-calculator",
      "epf-calculator"
    ]
  },
  {
    "slug": "hra-calculator",
    "name": "HRA Calculator — Old-Regime Exemption",
    "category": "tax",
    "widget": "calc",
    "prio": "P1",
    "short": "Estimate an eligible old-regime HRA exemption using matching-period salary, rent and HRA.",
    "metaDescription": "Estimate an eligible old-regime HRA exemption using matching-period salary, rent and HRA. See the formula, worked example and assumptions.",
    "keywords": [
      "hra calculator — old-regime exemption",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "salary",
        "label": "Rule 2A salary for the period",
        "type": "number",
        "def": 600000,
        "min": 0,
        "max": 100000000.0,
        "unit": "₹"
      },
      {
        "key": "hra",
        "label": "HRA received for same period",
        "type": "number",
        "def": 240000,
        "min": 0,
        "max": 100000000.0,
        "unit": "₹"
      },
      {
        "key": "rent",
        "label": "Rent paid for same period",
        "type": "number",
        "def": 240000,
        "min": 0,
        "max": 100000000.0,
        "unit": "₹"
      },
      {
        "key": "metro",
        "label": "Qualifying metro under HRA rules?",
        "type": "select",
        "def": "no",
        "options": [
          {
            "value": "no",
            "label": "No — 40%"
          },
          {
            "value": "yes",
            "label": "Yes — 50%"
          }
        ]
      }
    ],
    "content": {
      "intro": "Estimate an eligible old-regime HRA exemption using matching-period salary, rent and HRA.",
      "how": "Exemption is the nonnegative minimum of actual HRA, rent minus 10% of Rule 2A salary, and 50% of that salary in qualifying metro cities or 40% elsewhere. Use the same period for every input. Salary definitions, evidence and regime eligibility must be confirmed separately.",
      "example": "With ₹6,00,000 Rule 2A salary, ₹2,40,000 HRA, ₹2,40,000 rent and non-metro status, the minimum is ₹1,80,000.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Is HRA exemption available in the new regime?",
          "The ordinary HRA exemption is an old-regime benefit; verify eligibility before claiming."
        ],
        [
          "Does Bengaluru qualify for the 50% HRA category?",
          "The qualifying metro list is Delhi, Mumbai, Kolkata and Chennai, not every large city."
        ],
        [
          "Can I mix monthly rent with annual salary?",
          "No. Enter all amounts for the same period."
        ]
      ]
    },
    "sources": [
      {
        "label": "Income Tax Department: HRA validation rules",
        "url": "https://www.incometax.gov.in/iec/foportal/sites/default/files/2025-07/CBDT_e-filing_ITR-3_Validation%20Rules_V1.0_AY%2025-26.pdf"
      }
    ],
    "related": [
      "india-income-tax-calculator",
      "salary-calculator"
    ]
  },
  {
    "slug": "india-income-tax-calculator",
    "name": "India Income Tax Calculator — AY 2026–27",
    "category": "tax",
    "widget": "calc",
    "prio": "P1",
    "short": "Compare AY 2026–27 old and new regime tax on ordinary taxable income up to ₹50 lakh.",
    "metaDescription": "Compare AY 2026–27 old and new regime tax on ordinary taxable income up to ₹50 lakh. See the formula, worked example and assumptions.",
    "keywords": [
      "india income tax calculator — ay 2026–27",
      "india calculator",
      "INR"
    ],
    "fields": [
      {
        "key": "taxable",
        "label": "Ordinary taxable income after deductions",
        "type": "number",
        "def": 1200000,
        "min": 0,
        "max": 5000000,
        "unit": "₹"
      }
    ],
    "content": {
      "intro": "Compare AY 2026–27 old and new regime tax on ordinary taxable income up to ₹50 lakh.",
      "how": "For resident individuals below 60 only. Enter taxable income after deductions, not gross salary. The comparison applies each regime’s slab rates, 87A rebate, new-regime marginal relief near ₹12 lakh and 4% cess. Income and final tax are rounded to ₹10. Surcharge, capital gains, special rates, agricultural income and other relief are excluded. Run each regime separately with its own taxable income when deductions differ.",
      "example": "At ₹12,00,000 ordinary taxable income, new-regime tax is zero after the eligible rebate; old-regime tax including cess is ₹1,79,400. This is not a comparison of the same gross salary after different deductions.",
      "howSteps": [
        "Enter values using the units shown.",
        "Adjust the rate and timing assumptions to your situation.",
        "Review the result and limitations before using it in a decision."
      ],
      "faqs": [
        [
          "Which financial year does this cover?",
          "AY 2026–27 corresponds to FY 2025–26. This page does not claim FY 2026–27 rules."
        ],
        [
          "Should I enter gross salary?",
          "No. Calculate taxable income using the deductions available under each regime, then run separate scenarios."
        ],
        [
          "Does this handle capital gains or surcharge?",
          "No. Special-rate income and taxable income above ₹50 lakh are outside scope."
        ]
      ]
    },
    "sources": [
      {
        "label": "Income Tax Department: salaried individuals, AY 2026–27",
        "url": "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
      },
      {
        "label": "Income Tax Department: AY 2026–27 ITR-2 FAQs",
        "url": "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/itr-2/itr-2-faqs"
      }
    ],
    "related": [
      "hra-calculator",
      "india-gst-calculator"
    ]
  }
];
