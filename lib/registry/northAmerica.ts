import type { ToolDef } from '../types';
import { salesRegions } from '../calc/northAmerica';

export const NORTH_AMERICA: ToolDef[] = [
  {
    slug: 'canada-gst-hst-calculator', name: 'Canada GST/HST Calculator', category: 'tax', widget: 'calc', prio: 'P1',
    short: 'Add or reverse Canadian GST or HST using the province or territory of supply.',
    metaDescription: 'Calculate Canadian GST or HST by province or territory. Add tax to a price or find the pre-tax amount from a tax-inclusive total.',
    keywords: ['GST HST calculator Canada', 'reverse HST calculator', 'Ontario HST calculator', 'Nova Scotia HST calculator'],
    fields: [
      { key: 'amount', label: 'Price', type: 'number', def: 100, min: 0, max: 1e9, step: 0.01, unit: 'CAD' },
      { key: 'region', label: 'Province or territory of supply', type: 'select', def: 'ON', options: salesRegions.map(([value, label]) => ({ value, label })) },
      { key: 'mode', label: 'Price includes GST/HST?', type: 'select', def: 'before', options: [{ value: 'before', label: 'No, add tax' }, { value: 'included', label: 'Yes, extract tax' }] },
    ],
    content: {
      intro: 'Find GST or HST on a standard taxable purchase in Canada. The estimate uses the selected place of supply and excludes separately charged PST, RST and QST.',
      how: 'Multiply the pre-tax amount by the GST/HST rate to add tax. To reverse a tax-inclusive amount, divide it by one plus the rate. Only enter a total that includes GST/HST alone for the reverse calculation.',
      example: 'A standard taxable CAD 100 purchase in Ontario has CAD 13 HST and a CAD 113 total. In Nova Scotia, CAD 100 plus 14% HST is CAD 114.',
      faqs: [
        ['What is the GST/HST rate in Canada?', 'GST is 5% in non-HST provinces and territories. HST is 13% in Ontario, 14% in Nova Scotia, and 15% in New Brunswick, Newfoundland and Labrador, and Prince Edward Island.'],
        ['Does this include PST or QST?', 'No. Separate provincial sales taxes are excluded. Use the CRA reference and the applicable provincial tax rules for a complete transaction estimate.'],
        ['Do these rates apply to every item?', 'No. Zero-rated and exempt items, rebates and special rules can change the amount charged. This calculator assumes a standard taxable sale.'],
      ],
    },
    sources: [{ label: 'CRA GST/HST calculator and rates', url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html' }],
    related: ['sales-tax-calculator', 'vat-calculator', 'discount-calculator'],
  },
  {
    slug: 'us-mileage-calculator-2026', name: 'US Business Mileage Calculator 2026', category: 'tax', widget: 'calc', prio: 'P1',
    short: 'Estimate the 2026 IRS business mileage amount using separate rates for each half of the year.',
    metaDescription: 'Calculate the 2026 IRS business mileage amount. Apply 72.5 cents per mile for January–June and 76 cents for July–December.',
    keywords: ['2026 mileage calculator', 'IRS business mileage rate 2026', 'mileage deduction calculator', 'July 2026 mileage rate'],
    fields: [
      { key: 'firstHalf', label: 'Business miles from Jan 1 to Jun 30', type: 'number', def: 100, min: 0, max: 1e6, unit: 'mi' },
      { key: 'secondHalf', label: 'Business miles from Jul 1 to Dec 31', type: 'number', def: 100, min: 0, max: 1e6, unit: 'mi' },
    ],
    content: {
      intro: 'Estimate the optional IRS standard mileage amount for qualifying U.S. business miles in 2026. Enter mileage by travel date so each trip uses the correct rate.',
      how: 'Multiply January through June business miles by $0.725 and July through December business miles by $0.76, then add the two amounts.',
      example: '100 qualifying business miles in May and 100 in August give $72.50 plus $76.00, for an estimated standard mileage amount of $148.50.',
      faqs: [
        ['Did the 2026 business mileage rate change midyear?', 'Yes. The IRS lists 72.5 cents per mile for January 1 through June 30 and 76 cents per mile for July 1 through December 31.'],
        ['Is this my tax refund or employer reimbursement?', 'The result is a standard mileage amount before eligibility rules. A tax deduction and an employer reimbursement are different calculations.'],
        ['Can I use this for commuting, charitable or medical trips?', 'This calculator covers qualifying business mileage only. Ordinary commuting is generally personal, and other eligible uses have separate rates and rules.'],
      ],
    },
    sources: [{ label: 'IRS standard mileage rates by date and purpose', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' }],
    related: ['fuel-cost-calculator', 'business-days-calculator', 'self-employment-tax-calculator'],
  },
];
