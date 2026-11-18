import { COMPUTES } from '../calc/computes';
import type { CalcResult, Field, ToolDef } from '../types';
import { processing } from './meta';

export interface SampleTable { caption: string; headers: string[]; rows: string[][] }

const numberFields = (tool: ToolDef) => (tool.fields || []).filter(f => f.type === 'number');
const unitLabel = (f: Field) => f.unit ? ` (${f.unit})` : '';
const nice = (n: number) => {
  if (!Number.isFinite(n)) return NaN;
  const digits = Math.max(0, 2 - Math.floor(Math.log10(Math.abs(n) || 1)));
  return Number(n.toFixed(Math.min(digits, 4)));
};
const show = (f: Field, n: number) => `${f.unit === '$' || f.unit === '₹' ? f.unit : ''}${n.toLocaleString('en-US', { maximumFractionDigits: 4 })}${f.unit && f.unit !== '$' && f.unit !== '₹' ? ' ' + f.unit : ''}`;

function run(tool: ToolDef, values: Record<string, string>): CalcResult[] | null {
  const fn = COMPUTES[tool.slug];
  if (!fn) return null;
  try {
    const out = fn(values);
    if (!out.length || out.some(row => /NaN|Infinity|∞|Check inputs|Unavailable/.test(row.value + row.label))) return null;
    return out;
  } catch { return null; }
}

/** Calculators that read the clock or a date field would make builds non-deterministic; skip them. */
const deterministic = (tool: ToolDef) => (tool.fields || []).every(f => f.type === 'number' || f.type === 'select');

/**
 * Scenario tables produced by the tool's own compute function. Each table varies one input and
 * holds every other input at its default, so every number matches what the live tool returns.
 */
export function sampleTables(tool: ToolDef): SampleTable[] {
  if (tool.widget !== 'calc' || !deterministic(tool)) return [];
  const fields = tool.fields || [];
  const defaults = Object.fromEntries(fields.map(f => [f.key, String(f.def ?? '')]));
  const base = run(tool, defaults);
  if (!base) return [];
  const main = base.findIndex(r => r.main) >= 0 ? base.findIndex(r => r.main) : 0;
  const extra = base.length > 1 ? (main === 0 ? 1 : 0) : -1;
  const candidates = numberFields(tool).filter(f => Number(f.def) > 0).slice(0, 2);
  const tables: SampleTable[] = [];
  for (const field of candidates) {
    const rows: string[][] = [];
    const seen = new Set<number>();
    // Money, rate and count inputs can sensibly vary widely; physical measurements only within a plausible band.
    const wide = ['$', '₹', '%', '€', '£', 'yrs', 'years', 'months'].includes(String(field.unit || '')) || /price|amount|income|salary|balance|rate|principal|contribution|deposit/i.test(field.label);
    for (const m of wide ? [0.5, 0.75, 1, 1.25, 1.5, 2] : [0.85, 0.92, 1, 1.08, 1.15]) {
      const value = nice(Number(field.def) * m);
      if (!Number.isFinite(value) || seen.has(value)) continue;
      if ((field.min !== undefined && value < field.min) || (field.max !== undefined && value > field.max)) continue;
      const out = run(tool, { ...defaults, [field.key]: String(value) });
      if (!out) continue;
      seen.add(value);
      if (!out[main] || (extra >= 0 && !out[extra])) continue;
      rows.push([show(field, value) + (m === 1 ? ' (default)' : ''), out[main].value, ...(extra >= 0 ? [out[extra].value] : [])]);
    }
    // Drop a second result column that merely repeats the first (e.g. total cost equals payment when optional costs are zero).
    const redundant = extra >= 0 && rows.every(r => r[1] === r[2]);
    if (redundant) rows.forEach(r => r.pop());
    if (rows.length >= 3) {
      tables.push({
        caption: `${tool.name}: how the result changes with ${field.label.toLowerCase()} (other inputs at their defaults)`,
        headers: [field.label, base[main].label, ...(extra >= 0 && !redundant ? [base[extra].label] : [])],
        rows,
      });
    }
  }
  return tables;
}

export const inputsSummary = (tool: ToolDef): string | null => {
  const fields = tool.fields || [];
  if (tool.widget !== 'calc' || !fields.length) return null;
  const inputs = fields.map(f => f.label + unitLabel(f)).join(', ');
  return `Inputs: ${inputs}.`;
};

export const resultLabels = (tool: ToolDef): string[] => {
  if (tool.widget !== 'calc' || !deterministic(tool)) return [];
  const defaults = Object.fromEntries((tool.fields || []).map(f => [f.key, String(f.def ?? '')]));
  return (run(tool, defaults) || []).map(r => r.label);
};

/** Question-form FAQs mirroring common People-Also-Ask phrasing. All answers come from tool data. */
export function generatedFaqs(tool: ToolDef): [string, string][] {
  const mode = processing(tool);
  const faqs: [string, string][] = [];
  const name = tool.name;
  const isCalc = tool.widget === 'calc';
  const convert = tool.widget === 'converter' || tool.widget === 'currencyconverter';
  if (isCalc || convert) faqs.push([`How is the ${name} calculated?`, tool.content.how]);
  const inputs = inputsSummary(tool);
  if (inputs) faqs.push([`What do I need to enter in the ${name}?`, `${inputs} Change any value and the result updates immediately. Optional inputs can be left at their defaults.`]);
  const results = resultLabels(tool);
  if (results.length) faqs.push([`What results does the ${name} show?`, `It shows ${results.length === 1 ? results[0] : results.slice(0, -1).join(', ') + ' and ' + results[results.length - 1]}, computed from the inputs above.`]);
  if (mode === 'local') {
    faqs.push([`Is ${name} free and private?`, `Yes. It is free, needs no account and runs in your browser, so the ${tool.category === 'pdf' || tool.category === 'image' ? 'files you select' : 'values you enter'} are not sent to a server.`]);
  } else if (mode === 'server') {
    faqs.push([`Are my files uploaded when I use ${name}?`, 'Yes. This tool needs server processing, so what you submit is sent to the document or writing service only when you press the action button. Read the privacy policy for retention details, and do not submit confidential material you are not comfortable sending.']);
  }
  return faqs;
}
