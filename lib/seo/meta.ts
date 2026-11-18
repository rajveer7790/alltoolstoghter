import documentTools from '../documents/tools.json';
import { BACKEND_REQUIRED } from '../toolPolicy';
import { INTENT_NOTES } from '../intentNotes';
import { EDITORIAL } from '../toolEditorial';
import type { ToolDef } from '../types';
import { CURATED } from './curated';
import { OPENERS } from './openers';

export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 158;

export type Processing = 'local' | 'server' | 'workspace';

const documentMode = new Map(documentTools.map(t => [t.id, t.mode as string]));

/** Where the tool actually runs. Used so that "in your browser / no upload" is never claimed for server tools. */
export function processing(tool: ToolDef): Processing {
  if (BACKEND_REQUIRED.has(tool.slug)) return 'server';
  if (tool.widget === 'document') {
    const mode = documentMode.get(tool.dataset || tool.slug);
    if (mode === 'server') return 'server';
    if (mode === 'workspace') return 'workspace';
  }
  return 'local';
}

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const fits = (s: string) => s.length <= TITLE_MAX;

function trimToWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:—-]+$/, '') + '…';
}

function firstFit(options: string[]): string {
  return options.find(fits) || options[options.length - 1];
}

function patternTitle(tool: ToolDef): string {
  const name = tool.name;
  const mode = processing(tool);
  const isCalc = /calculator$/i.test(name);
  if (tool.widget === 'converter' || tool.widget === 'currencyconverter') {
    const base = /convert/i.test(name) ? name : `${name} Converter`;
    return firstFit([`${base} — Formula, Chart & Examples`, `${base} — Formula & Chart`, base]);
  }
  if (tool.category === 'pdf' || tool.category === 'image') {
    if (mode === 'local') return firstFit([`${name} Online Free — No Upload, In Your Browser`, `${name} Online — Free, No Upload`, `${name} Online Free`, name]);
    return firstFit([`${name} Online — Free PDF Document Tool`, `${name} Online Free`, name]);
  }
  if (isCalc) return firstFit([`${name} — Free, with Formula & Examples`, `${name} — Free Online Calculator`, `${name} — Free & Accurate`, name]);
  if (mode === 'local') return firstFit([`${name} Online — Free, Runs in Your Browser`, `${name} Online — Free & Private`, `${name} Online Free`, name]);
  return firstFit([`${name} — Free Online Tool`, name]);
}

function patternDescription(tool: ToolDef): string {
  const mode = processing(tool);
  const base = clean(tool.metaDescription || tool.short);
  const tail = mode === 'local'
    ? ' No signup, and it runs in your browser.'
    : mode === 'workspace' ? ' No signup required.' : ' See the privacy details on this page.';
  let out = base;
  if (out.length < DESC_MIN) out = clean(`${out.replace(/\s*$/, '')}${/[.!?]$/.test(out) ? '' : '.'}${tail}`);
  if (out.length < DESC_MIN) out = clean(`${out} ${clean(tool.content.intro)}`);
  return trimToWords(out, DESC_MAX);
}

export interface ToolSeo { title: string; description: string; source: 'curated' | 'intent' | 'editorial' | 'pattern' }

export function toolSeo(tool: ToolDef): ToolSeo {
  const curated = CURATED[tool.slug];
  const intent = INTENT_NOTES[tool.slug]?.title;
  const editorial = EDITORIAL[tool.slug]?.title;
  const existing = clean(tool.metaDescription || '');
  const existingOk = existing.length >= DESC_MIN && existing.length <= DESC_MAX;
  const description = OPENERS[tool.slug]?.description || curated?.[1] || (existingOk ? existing : patternDescription(tool));
  if (intent && fits(intent)) return { title: intent, description, source: 'intent' };
  if (curated) return { title: curated[0], description, source: 'curated' };
  if (editorial && fits(editorial)) return { title: editorial, description, source: 'editorial' };
  return { title: patternTitle(tool), description, source: 'pattern' };
}
