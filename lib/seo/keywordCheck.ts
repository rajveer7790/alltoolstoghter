import { EDITORIAL } from '../toolEditorial';
import type { ToolDef } from '../types';
import { DEEP } from './deep';
import { OPENERS, answerFor } from './openers';
import { generatedFaqs } from './content';
import { toolSeo } from './meta';

/** Normalise for verbatim phrase matching: lowercase, strip punctuation, collapse spaces. */
export const norm = (s: string) => ` ${s.toLowerCase().replace(/&/g, ' and ').replace(/[()/'’.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()} `;
const has = (text: string, phrase: string) => norm(text).includes(norm(phrase));
const firstWords = (text: string, n: number) => text.split(/\s+/).slice(0, n).join(' ');

export interface KeywordReport {
  slug: string;
  short: string;
  source: 'declared' | 'registry';
  title: boolean; description: boolean; h1: boolean; answer: boolean; heading: boolean;
  long: { phrase: string; where: string[] }[];
}

/** Everything a visitor or crawler sees on the page, grouped by role. */
export function pageParts(tool: ToolDef) {
  const seo = toolSeo(tool);
  const deep = DEEP[tool.slug];
  const editorial = EDITORIAL[tool.slug];
  const answer = answerFor(tool);
  const headings = [
    'How it works', 'Worked example', 'Frequently asked questions',
    ...(deep?.sections || []).map(s => s.heading), ...(editorial?.sections || []).map(s => s.heading),
  ];
  const faqQuestions = [...tool.content.faqs, ...(editorial?.faqs || []), ...(deep?.faqs || []), ...generatedFaqs(tool)].map(f => f[0]);
  const body = [tool.content.intro, tool.content.how, tool.content.example || '', ...(deep?.sections || []).map(s => s.text), ...(deep?.faqs || []).map(f => f[1])].join(' ');
  return { seo, deep, answer, headings, faqQuestions, body, summary: deep?.aiSummary || '' };
}

export function keywordReport(tool: ToolDef): KeywordReport {
  const { seo, deep, answer, headings, faqQuestions, body, summary } = pageParts(tool);
  const declared = !!(deep?.shortKeyword || OPENERS[tool.slug]?.shortKeyword);
  const short = deep?.shortKeyword || OPENERS[tool.slug]?.shortKeyword || tool.keywords[0] || tool.name;
  const longs = deep?.longKeywords || tool.keywords.slice(1, 4);
  return {
    slug: tool.slug, short, source: declared ? 'declared' : 'registry',
    title: has(seo.title, short), description: has(seo.description, short), h1: has(tool.name, short),
    answer: has(firstWords(answer, 70), short),
    heading: headings.some(h => has(h, short)),
    long: longs.map(phrase => ({
      phrase,
      where: [
        headings.some(h => has(h, phrase)) && 'heading',
        faqQuestions.some(q => has(q, phrase)) && 'faq',
        has(answer, phrase) && 'answer',
        has(summary, phrase) && 'summary',
        has(body, phrase) && 'body',
      ].filter(Boolean) as string[],
    })),
  };
}
