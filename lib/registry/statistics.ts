import { ToolDef } from '../types';
const $ = (k: string, l: string, d: number, u?: string): any => ({ key: k, label: l, type: 'number', def: d, unit: u });
const T = (k: string, l: string, d: string): any => ({ key: k, label: l, type: 'textarea', def: d });

export const STATISTICS: ToolDef[] = [
{
  slug: 'z-score-calculator', name: 'Z-Score Calculator', prio: 'P1', category: 'statistics', widget: 'calc',
  short: 'Z-score, percentile, and probability from a value, mean, and standard deviation.',
  metaDescription: 'Free Z-Score Calculator. Calculate z-scores, percentiles, and normal distribution probabilities securely online without saving data.',
  keywords: ['z-score calculator','z score calculator','standard score calculator','percentile from z-score'],
  fields: [$('value','Value (x)',85),$('mean','Mean (μ)',70),$('std','Standard deviation (σ)',10)],
  content: {
    intro: 'Calculate the z-score (standard score) of a value, along with its percentile rank and the probability of observing a value above or below it in a normal distribution.',
    how: 'Z = (x − μ) / σ. The z-score measures how many standard deviations a value is from the mean. The percentile is derived from the standard normal cumulative distribution.',
    howSteps: [
      'Enter the raw value (x) you are analyzing.',
      'Input the population or sample mean.',
      'Provide the standard deviation to calculate the precise z-score and probability.'
    ],
    faqs: [
      ['What does a z-score tell me?','How far a value is from the mean, in standard deviations. A z of +2 means the value is 2 standard deviations above average — higher than ~97.7% of values.'],
      ['What is a normal z-score range?','About 68% of values fall within ±1, 95% within ±2, and 99.7% within ±3. Z-scores beyond ±3 are rare.'],
      ['Can z-scores be negative?','Yes — a negative z-score means the value is below the mean. The sign indicates direction; the magnitude indicates distance.'],
    ],
  },
  related: ['correlation-coefficient-calculator','confidence-interval-calculator','standard-deviation-calculator','p-value-calculator'],
},
{
  slug: 'confidence-interval-calculator', name: 'Confidence Interval Calculator', prio: 'P1', category: 'statistics', widget: 'calc',
  short: 'Confidence interval and margin of error from sample statistics.',
  metaDescription: 'Confidence Interval Calculator online. Calculate statistical margins of error and confidence levels (90%, 95%, 99%) quickly and privately.',
  keywords: ['confidence interval calculator','margin of error calculator','ci calculator','95 confidence interval'],
  fields: [$('mean','Sample mean',50),$('sd','Standard deviation',10),$('n','Sample size',100),{key:'confidence',label:'Confidence level',type:'select',def:'95',options:[{value:'90',label:'90%'},{value:'95',label:'95%'},{value:'99',label:'99%'}]}],
  content: {
    intro: 'Calculate the confidence interval and margin of error for a sample mean, at 90%, 95%, or 99% confidence — the foundation of statistical inference and polling.',
    how: 'CI = mean ± (z × standard error), where standard error = sd / √n. The z-critical value depends on the confidence level (1.96 for 95%).',
    howSteps: [
      'Enter the sample mean and standard deviation.',
      'Provide the sample size (n) from your research.',
      'Choose your required confidence level to output the interval bounds and margin.'
    ],
    faqs: [
      ['What does a 95% confidence interval mean?','If you repeated the sampling many times, about 95% of the calculated intervals would contain the true population mean. It is not a 95% probability for this specific interval.'],
      ['How do I narrow the interval?','Increase your sample size (n) — the margin of error shrinks with the square root of n. Lowering the confidence level also narrows it but reduces certainty.'],
      ['When should I use a t-distribution instead?','For small samples (n < 30) with unknown population variance, the t-distribution is more accurate. This calculator uses the normal (z) approximation.'],
    ],
  },
  related: ['z-score-calculator','sample-size-calculator','standard-deviation-calculator','p-value-calculator'],
},
{
  slug: 'sample-size-calculator', name: 'Sample Size Calculator', prio: 'P1', category: 'statistics', widget: 'calc',
  short: 'Required sample size for a survey at a given confidence and margin of error.',
  metaDescription: 'Free Sample Size Calculator. Determine exactly how many survey respondents you need to achieve statistically significant results with your target error margin.',
  keywords: ['sample size calculator','survey sample size','statistical sample size calculator','how many respondents do i need'],
  fields: [{key:'confidence',label:'Confidence level',type:'select',def:'95',options:[{value:'90',label:'90%'},{value:'95',label:'95%'},{value:'99',label:'99%'}]},$('margin','Margin of error (%)',5,'%'),$('proportion','Expected proportion (%)',50,'%')],
  content: {
    intro: 'Calculate the sample size you need for a survey or study to achieve a target margin of error at your chosen confidence level — essential for polling and market research.',
    how: 'n = (z² × p × (1−p)) / margin². Use p = 50% for the most conservative (largest) sample size when you have no prior estimate of the proportion.',
    howSteps: [
      'Set the desired confidence level (typically 95%).',
      'Input the acceptable margin of error as a percentage.',
      'Specify expected proportion (default to 50%) to see the exact sample size needed.'
    ],
    faqs: [
      ['Why use 50% as the proportion?','It produces the maximum required sample size, giving a safe estimate when you do not know the true proportion in advance.'],
      ['Does population size matter?','For large populations (over ~20,000), it barely changes the result. For small populations, apply a finite population correction to reduce the required sample.'],
      ['What is a typical survey sample size?','National polls often use ~1,000 respondents for roughly a 3% margin of error at 95% confidence.'],
    ],
  },
  related: ['confidence-interval-calculator','z-score-calculator','p-value-calculator','percentage-calculator'],
},
{
  slug: 'correlation-coefficient-calculator', name: 'Correlation Coefficient Calculator', prio: 'P2', category: 'statistics', widget: 'calc',
  short: 'Pearson correlation coefficient (r) and R² from two data lists.',
  metaDescription: 'Calculate Pearson Correlation Coefficients online. Free tool linking X and Y datasets to find r and R-squared safely within your browser.',
  keywords: ['correlation coefficient calculator','pearson r calculator','correlation calculator','r value calculator'],
  fields: [T('x','X values (comma or space separated)','1, 2, 3, 4, 5'),T('y','Y values (comma or space separated)','2, 4, 5, 4, 6')],
  content: {
    intro: 'Calculate the Pearson correlation coefficient (r) and the coefficient of determination (R²) between two variables, with an interpretation of strength and direction.',
    how: 'Pearson r measures the linear relationship between two variables, ranging from −1 (perfect negative) to +1 (perfect positive). R² is r squared — the proportion of variance explained.',
    howSteps: [
      'Paste a comma-separated list of values for the X variable.',
      'Paste a matching length list of values for the Y variable.',
      'The calculator processes the lists to define Pearson r correlation and R-squared variance.'
    ],
    faqs: [
      ['What is a strong correlation?','As a rough guide: |r| above 0.7 is strong, 0.4–0.7 is moderate, below 0.4 is weak. Context matters — standards differ between fields.'],
      ['Does correlation imply causation?','No. A strong correlation may be coincidental, driven by a third variable, or reverse-caused. Correlation alone never proves causation.'],
      ['What does R² mean?','It is the proportion of variation in Y explained by X. An R² of 0.64 means 64% of the variance in Y is accounted for by its linear relationship with X.'],
    ],
  },
  related: ['standard-deviation-calculator','z-score-calculator','mean-median-mode-calculator','slope-calculator'],
},
{
  slug: 'p-value-calculator', name: 'P-Value Calculator', prio: 'P2', category: 'statistics', widget: 'calc',
  short: 'P-value and significance from a z-statistic (one- or two-tailed).',
  metaDescription: 'Calculate P-Values from Z-scores. Free statistical significance calculator computing p-values for hypothesis testing instantly online.',
  keywords: ['p-value calculator','p value from z score','statistical significance calculator','hypothesis test calculator'],
  fields: [$('zstat','Z-statistic',1.96),{key:'tail',label:'Test type',type:'select',def:'two',options:[{value:'two',label:'Two-tailed'},{value:'right',label:'Right-tailed'},{value:'left',label:'Left-tailed'}]}],
  content: {
    intro: 'Convert a z-statistic into a p-value for hypothesis testing, with a clear interpretation of statistical significance at common thresholds.',
    how: 'The p-value is the probability of observing a result as extreme as yours if the null hypothesis were true. It is derived from the standard normal distribution based on your z-statistic and test direction.',
    howSteps: [
      'Input the calculated Z-statistic from your test.',
      'Select whether your hypothesis is one-tailed (left/right) or two-tailed.',
      'The system evaluates normal distribution probability to extract the P-value significance.'
    ],
    faqs: [
      ['What is statistical significance?','By convention, p < 0.05 is considered statistically significant — there is less than a 5% chance the result is due to random variation under the null hypothesis.'],
      ['One-tailed vs two-tailed?','Use two-tailed when testing for any difference (higher or lower). Use one-tailed when you specifically predict the direction of the effect.'],
      ['Does a low p-value prove my hypothesis?','No — it only provides evidence against the null hypothesis. It does not measure effect size or practical importance, and is often misinterpreted.'],
    ],
  },
  related: ['z-score-calculator','confidence-interval-calculator','sample-size-calculator','standard-deviation-calculator'],
},
];
