import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_TOOLS, bySlug } from '../lib/registry';
import { isIndexableTool, TOOL_ALIASES, canonicalToolPath } from '../lib/toolPolicy';
import { PENDING_ANCHORS, pendingToolsFor, indexableAlternativesFor, pendingCoverage } from '../lib/seo/autolink';
import { processing } from '../lib/seo/meta';

const canonical = ALL_TOOLS.filter(t => !TOOL_ALIASES[t.slug]);

test('curated anchor map references real tools of the right kind', () => {
  for (const [pending, anchors] of Object.entries(PENDING_ANCHORS)) {
    assert.ok(bySlug.has(pending), pending);
    for (const a of anchors) { assert.ok(bySlug.has(a), `${pending} -> ${a}`); assert.ok(a !== pending); }
  }
});

test('indexable pages link only to not-indexed tools here, capped, unique and never to themselves', () => {
  for (const tool of canonical.filter(isIndexableTool)) {
    const links = pendingToolsFor(tool);
    assert.ok(links.length <= 5, tool.slug);
    assert.equal(new Set(links.map(t => t.slug)).size, links.length, tool.slug);
    for (const target of links) { assert.ok(!isIndexableTool(target), `${tool.slug} -> ${target.slug}`); assert.notEqual(canonicalToolPath(target), canonicalToolPath(tool)); }
  }
});

test('not-indexed pages link only to indexable browser-only alternatives', () => {
  for (const tool of canonical.filter(t => !isIndexableTool(t))) {
    const links = indexableAlternativesFor(tool);
    assert.ok(links.length >= 2, `${tool.slug} has only ${links.length} alternatives`);
    for (const target of links) { assert.ok(isIndexableTool(target), target.slug); assert.equal(processing(target), 'local', target.slug); }
  }
});

test('every not-indexed tool is reachable from at least two indexable pages', () => {
  for (const [slug, count] of pendingCoverage()) assert.ok(count >= 2, `${slug} has ${count} incoming links`);
});

test('indexable tools outside PDF/image topics do not get unrelated server-tool links', () => {
  for (const slug of ['mortgage-calculator', 'json-formatter', 'bmi-calculator', 'word-counter']) assert.equal(pendingToolsFor(bySlug.get(slug)!).length, 0, slug);
});

test('alias pages (which are rendered but never canonical) produce no auto-links and do not throw', () => {
  for (const alias of Object.keys(TOOL_ALIASES)) {
    const tool = bySlug.get(alias)!;
    assert.deepEqual(pendingToolsFor(tool), [], alias);
    assert.deepEqual(indexableAlternativesFor(tool), [], alias);
  }
  for (const tool of ALL_TOOLS) { pendingToolsFor(tool); indexableAlternativesFor(tool); }
});
