import { EDITORIAL } from '../toolEditorial';
import type { ToolDef } from '../types';
import { DEEP } from './deep';

// Rewritten meta description and opening answer for tools whose head keyword (already in the page title)
// was missing from the description or answer. Drafted by a writer model, validated by script, and checked
// against each tool's code. Editorial pages keep their hand-written, numeric answer; only their description is replaced.
export interface Opener { shortKeyword: string; description: string; answer: string }
export const OPENERS: Record<string, Opener> = {};

/** The answer-first paragraph shown above the tool, in priority order. */
export function answerFor(tool: ToolDef): string {
  return EDITORIAL[tool.slug]?.answer || OPENERS[tool.slug]?.answer || DEEP[tool.slug]?.answer || tool.content.intro;
}
