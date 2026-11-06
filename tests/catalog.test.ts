import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ALL_TOOLS, CATEGORIES, bySlug } from '../lib/registry';
import { COMPUTES } from '../lib/calc/computes';
import { DEV_TRANSFORMS } from '../lib/calc/devtransforms';
import { UNIT_KINDS } from '../lib/calc/units';
import { TOOL_ALIASES } from '../lib/toolPolicy';
import { POPULAR_SLUGS, RELATED_CATEGORIES } from '../lib/linking';

const source = readFileSync('components/widgets/index.tsx', 'utf8');
const widgets = new Set([...source.matchAll(/^  (\w+): dynamic/gm)].map(m => m[1]));
test('every catalog route and slug is unique', () => {
  assert.equal(bySlug.size, ALL_TOOLS.length);
  assert.equal(new Set(ALL_TOOLS.map(t => `/${t.category}/${t.slug}`)).size, ALL_TOOLS.length);
});
for (const t of ALL_TOOLS) test(`catalog: ${t.category}/${t.slug}`, () => {
  assert.ok(CATEGORIES.some(c => c.key === t.category));
  assert.ok(widgets.has(t.widget), `missing widget ${t.widget}`);
  for (const slug of t.related) assert.ok(bySlug.has(slug), `missing related ${slug}`);
  assert.ok(t.content.intro && t.content.how && t.content.faqs.length);
  assert.ok(t.metaDescription || t.short);
  if (t.widget === 'calc') {
    assert.equal(typeof COMPUTES[t.slug], 'function', 'missing compute');
    const defaults = Object.fromEntries(t.fields!.map(f => [f.key, String(f.def ?? '')]));
    const results = COMPUTES[t.slug](defaults);
    assert.ok(results.length);
    for (const row of results) assert.doesNotMatch(row.value, /NaN|Infinity|∞/, JSON.stringify(results));
  }
  if (t.widget === 'devtransform') assert.ok(DEV_TRANSFORMS[t.transformKey!]);
  if (t.widget === 'converter') {
    const kind = UNIT_KINDS[t.converterKind || 'length']; assert.ok(kind);
    const preset = t.fields?.find(f => f.key === '_preset')?.def;
    if (preset) { const p = JSON.parse(String(preset)); assert.ok(kind.units[p.from]); assert.ok(kind.units[p.to]); }
  }
});
test('popular, category, and canonical aliases resolve', () => {
  for (const slug of POPULAR_SLUGS) assert.ok(bySlug.has(slug));
  for (const [alias, target] of Object.entries(TOOL_ALIASES)) {
    assert.ok(bySlug.has(target)); assert.equal(bySlug.get(alias)?.category, bySlug.get(target)?.category);
  }
  for (const list of Object.values(RELATED_CATEGORIES)) for (const key of list) assert.ok(CATEGORIES.some(c => c.key === key));
});
