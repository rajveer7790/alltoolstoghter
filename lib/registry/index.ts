import { Category, CatKey, ToolDef } from '../types';
import { FINANCE } from './finance';
import { HEALTH } from './health';
import { MATH } from './math';
import { DATETIME } from './datetime';
import { UNITS } from './units';
import { TEXT } from './text';
import { DEV } from './dev';
import { SEO } from './seo';
import { PDF } from './pdf';
import { IMAGE } from './image';
import { WRITING } from './writing';
import { REALESTATE } from './realestate';
import { CONSTRUCTION } from './construction';
import { COOKING } from './cooking';
import { SCIENCE } from './science';
import { STATISTICS } from './statistics';
import { BUSINESS } from './business';
import { INVESTING } from './investing';
import { TAX } from './tax';
import { EXTRA } from './extra';

export const CATEGORIES: Category[] = [
  { key: 'finance', name: 'Finance & Money', tagline: 'Loans, savings, salaries — the numbers behind big decisions.', accent: '#9A6700' },
  { key: 'health', name: 'Health & Fitness', tagline: 'Evidence-based formulas for body and training metrics.', accent: '#0F766E' },
  { key: 'math', name: 'Math & Education', tagline: 'From percentages to quadratics, with the steps that matter.', accent: '#6D28D9' },
  { key: 'date-time', name: 'Date & Time', tagline: 'Calendar-correct date math for deadlines and milestones.', accent: '#B91C1C' },
  { key: 'unit-converters', name: 'Unit Converters', tagline: 'Exact international definitions, every common unit.', accent: '#0B5FFF' },
  { key: 'text', name: 'Text Tools', tagline: 'Count, clean, and transform text — all in your browser.', accent: '#A21CAF' },
  { key: 'developer', name: 'Developer Tools', tagline: 'JSON, Base64, hashes, UUIDs — local-only and dependency-free.', accent: '#1D4ED8' },
  { key: 'seo', name: 'SEO & Web', tagline: 'QR codes, meta tags, redirects — ship sites that rank and scan.', accent: '#047857' },
  { key: 'pdf', name: 'PDF Tools', tagline: 'Merge, split, rotate, and stamp PDFs — entirely in your browser.', accent: '#B91C1C' },
  { key: 'image', name: 'Image Tools', tagline: 'Resize, crop, compress, and convert images — privately, on your device.', accent: '#7C3AED' },
  { key: 'construction', name: 'Construction', tagline: 'Concrete, paint, flooring, roofing — estimate materials before you build.', accent: '#92400E' },
  { key: 'cooking', name: 'Cooking & Food', tagline: 'Scale recipes, convert cooking units, and track nutrition.', accent: '#065F46' },
  { key: 'science', name: 'Science & Engineering', tagline: "Ohm's law, pH, density, kinematics — tools for students and engineers.", accent: '#1E40AF' },
  { key: 'statistics', name: 'Statistics', tagline: 'Z-scores, confidence intervals, sample sizes, and more.', accent: '#5B21B6' },
  { key: 'business', name: 'Business & Marketing', tagline: 'CAC, LTV, ROAS, margins — metrics every business needs.', accent: '#0F766E' },
  { key: 'investing', name: 'Investing & Crypto', tagline: 'Stock returns, DCA, dividend yield, P/E ratios, and more.', accent: '#B45309' },
  { key: 'tax', name: 'Tax & Payroll', tagline: 'Take-home pay, VAT, and self-employment tax — calculated clearly.', accent: '#6B21A8' },
  { key: 'real-estate', name: 'Real Estate', tagline: 'Rent vs buy, affordability, property tax — smarter home decisions.', accent: '#B45309' },
  { key: 'writing', name: 'Writing Tools', tagline: 'Grammar, paraphrasing, and plagiarism checks — powered by your own backend.', accent: '#0891B2' },
];

export const ALL_TOOLS: ToolDef[] = [...FINANCE, ...HEALTH, ...MATH, ...DATETIME, ...UNITS, ...TEXT, ...DEV, ...SEO, ...PDF, ...IMAGE, ...WRITING, ...REALESTATE, ...CONSTRUCTION, ...COOKING, ...SCIENCE, ...STATISTICS, ...BUSINESS, ...INVESTING, ...TAX, ...EXTRA];

export const bySlug = new Map(ALL_TOOLS.map(t => [t.slug, t]));
export const byCategory = (key: CatKey) => ALL_TOOLS.filter(t => t.category === key);
export const getCategory = (key: string) => CATEGORIES.find(c => c.key === key);
export const SITE = {
  name: 'All Tools Together',
  url: 'https://alltoolstogether.com',
  description: 'Fast, free online calculators, converters, PDF and image tools that run entirely in your browser — no signup, no uploads.',
  email: 'hello@alltoolstogether.com',
};
