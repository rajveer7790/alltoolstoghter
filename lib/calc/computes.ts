import { CalcResult } from '../types';
import * as F from './finance';
import * as H from './health';
import * as M from './math';
import * as D from './datecalc';

import * as COOK from './cooking';
import * as SCI from './science';
import * as STAT from './statistics';
import * as BIZ from './business';
import * as INV from './investing';
import * as TX from './tax';
export const COMPUTES: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  // Wave 1 finance
  'mortgage-calculator': F.mortgage, 'loan-calculator': F.loan, 'auto-loan-calculator': F.autoLoan,
  'compound-interest-calculator': F.compound, 'simple-interest-calculator': F.simpleInterest,
  'savings-calculator': F.savings, 'roi-calculator': F.roi, 'inflation-calculator': F.inflation,
  'credit-card-payoff-calculator': F.ccPayoff, 'salary-calculator': F.salary,
  'hourly-to-salary-calculator': F.hourlyToSalary, 'tip-calculator': F.tip, 'dti-calculator': F.dti,
  'down-payment-calculator': F.downPayment, 'sales-tax-calculator': F.salesTax,
  // Wave 2 finance
  'refinance-calculator': F.refinance, 'amortization-calculator': F.amortization,
  '401k-calculator': F.k401, 'retirement-calculator': F.retirement, 'debt-snowball-calculator': F.debtSnowball,
  'car-lease-calculator': F.carLease, 'roth-ira-calculator': F.rothIra, 'investment-calculator': F.investment,
  // Wave 1 health
  'bmi-calculator': H.bmi, 'bmr-calculator': H.bmr, 'tdee-calculator': H.tdee, 'calorie-calculator': H.calories,
  'macro-calculator': H.macros, 'one-rep-max-calculator': H.oneRepMax, 'pace-calculator': H.pace,
  'ideal-weight-calculator': H.idealWeight,
  // Wave 2 health
  'body-fat-calculator': H.bodyFat, 'due-date-calculator': H.dueDate, 'ovulation-calculator': H.ovulation,
  'sleep-calculator': H.sleep, 'bac-calculator': H.bac, 'a1c-calculator': H.a1c,
  'heart-rate-zone-calculator': H.heartRateZones, 'water-intake-calculator': H.waterIntake,
  'protein-intake-calculator': H.protein,
  // Wave 1 math
  'percentage-calculator': M.percentage, 'fraction-calculator': M.fractions, 'average-calculator': M.average,
  'gpa-calculator': M.gpa, 'final-grade-calculator': M.finalGrade, 'quadratic-formula-calculator': M.quadratic,
  'lcm-calculator': M.lcmGcf, 'square-root-calculator': M.squareRoot,
  // Wave 2 math
  'standard-deviation-calculator': M.stdDeviation, 'ratio-calculator': M.ratio, 'slope-calculator': M.slope,
  'combination-calculator': M.nCrnPr, 'sig-fig-calculator': M.sigFigs, 'probability-calculator': M.probability,
  'exponent-calculator': M.exponent, 'log-calculator': M.logarithm,
  // Wave 1 date
  'age-calculator': D.age, 'days-between-dates': D.daysBetween, 'add-days-to-date': D.addDays,
  'days-until-calculator': D.daysUntil,
  // Wave 2 date
  'hours-calculator': D.hoursWorked, 'business-days-calculator': D.businessDays,
  'week-number-calculator': D.weekNumber, 'roman-numeral-converter': D.romanNumeral,
  // Wave 2 extras
  'budget-calculator': F.budget, 'car-payment-calculator': F.carPayment, 'apr-calculator': F.apr,
  'bsa-calculator': H.bsa, 'waist-to-hip-ratio-calculator': H.whr, 'smoking-cost-calculator': H.smokingCost,
  'rounding-calculator': M.rounding, 'scientific-notation-converter': M.scientificNotation,
  'time-duration-calculator': D.timeDuration,
  'discount-calculator': F.discount,
  // Wave 3 finance
  'net-worth-calculator': F.netWorth, 'mortgage-payoff-calculator': F.mortgagePayoff, 'cd-calculator': F.cd,
  'future-value-calculator': F.futureValue, 'present-value-calculator': F.presentValue, 'annuity-calculator': F.annuity,
  'break-even-calculator': F.breakEven, 'profit-margin-calculator': F.margin, 'markup-calculator': F.markup,
  'commission-calculator': F.commission, 'overtime-calculator': F.overtime,
  // Wave 3 math
  'percentage-change-calculator': M.percentageChange, 'mean-median-mode-calculator': M.meanMedianMode,
  'prime-factorization-calculator': M.primeFactorization, 'pythagorean-theorem-calculator': M.pythagorean,
  'triangle-area-calculator': M.triangleArea,
  // Wave 3 date
  'day-of-week-calculator': D.dayOfWeek, 'age-difference-calculator': D.ageDifference,
  'add-business-days-calculator': D.addBusinessDays, 'weeks-between-dates-calculator': D.weeksBetween,
  // Real Estate
  'rent-vs-buy-calculator': F.rentVsBuy, 'home-affordability-calculator': F.homeAffordability,
  'property-tax-calculator': F.propertyTax, 'closing-costs-calculator': F.closingCosts,
  'rental-yield-calculator': F.rentalYield, 'house-price-to-income-ratio': F.houseAffordabilityRatio,
  'square-footage-calculator': F.squareFootageCalc, 'capital-gains-tax-calculator': F.capitalGains,
  // Construction
  'concrete-calculator': F.concreteCalc, 'paint-calculator': F.paintCalc,
  'flooring-calculator': F.flooringCalc, 'gravel-calculator': F.gravelCalc,
  'mulch-calculator': F.mulchCalc, 'fence-calculator': F.fenceCalc,
  'roof-pitch-calculator': F.roofPitch, 'staircase-calculator': F.staircaseCalc,

  // Cooking
  'grams-to-cups-converter': COOK.gramsToCups, 'recipe-scaling-calculator': COOK.recipeScaling,
  'cooking-unit-converter': COOK.cookingUnitConverter, 'calories-burned-calculator': COOK.caloriesBurned,
  // Science & Engineering
  'ohms-law-calculator': SCI.ohmsLaw, 'resistor-color-code-calculator': SCI.resistorColorCode,
  'voltage-divider-calculator': SCI.voltageDivider, 'torque-calculator': SCI.torque,
  'newtons-second-law-calculator': SCI.newtonsSecondLaw, 'density-calculator': SCI.densityCalc,
  'ph-calculator': SCI.phCalc, 'half-life-calculator': SCI.halfLife,
  'kinematic-calculator': SCI.kinematicCalc,
  // Statistics
  'z-score-calculator': STAT.zScore, 'confidence-interval-calculator': STAT.confidenceInterval,
  'sample-size-calculator': STAT.sampleSize, 'correlation-coefficient-calculator': STAT.correlationCoeff,
  'p-value-calculator': STAT.pValue,
  // Business
  'cac-calculator': BIZ.cacCalc, 'customer-lifetime-value-calculator': BIZ.ltvCalc,
  'roas-calculator': BIZ.roasCalc, 'email-marketing-roi-calculator': BIZ.emailRoi,
  'employee-turnover-calculator': BIZ.employeeTurnover, 'gross-margin-calculator': BIZ.grossMarginCalc,
  // Investing
  'dollar-cost-averaging-calculator': INV.dcaCalc, 'crypto-profit-loss-calculator': INV.cryptoProfitLoss,
  'stock-return-calculator': INV.stockReturn, 'dividend-yield-calculator': INV.dividendYield,
  'pe-ratio-calculator': INV.peRatio,
  // Tax & Payroll
  'paycheck-calculator': TX.paycheckCalc, 'vat-calculator': TX.vatCalc,
  'self-employment-tax-calculator': TX.selfEmploymentTax,
  // Developer extras
  'ip-subnet-calculator': M.ipSubnet, 'aspect-ratio-calculator': M.aspectRatio,
};
