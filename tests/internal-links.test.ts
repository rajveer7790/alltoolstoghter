import test from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES, INDEXABLE_TOOLS, bySlug } from '../lib/registry';
import { canonicalToolPath, isIndexableTool, TOOL_ALIASES } from '../lib/toolPolicy';
import { getToolLinks, getDiscoveryTools } from '../lib/linking';
import { EDITORIAL } from '../lib/toolEditorial';

test('every canonical tool receives category-peer links, without relying on popularity or JavaScript', () => {
  const incoming = new Map(INDEXABLE_TOOLS.map(tool => [tool.slug, new Set<string>()]));
  for (const tool of INDEXABLE_TOOLS) {
    const enriched = { ...tool, related: [...new Set([...(EDITORIAL[tool.slug]?.related || []), ...tool.related])] };
    const { related, more } = getToolLinks(enriched);
    const links = [...related, ...more];
    const paths = links.map(canonicalToolPath);
    assert.ok(links.length <= 10, tool.slug);
    assert.equal(new Set(paths).size, paths.length, tool.slug);
    assert.ok(!paths.includes(canonicalToolPath(tool)), tool.slug);
    for (const target of links) {
      assert.ok(isIndexableTool(target), target.slug);
      assert.ok(incoming.has(target.slug), target.slug);
      incoming.get(target.slug)!.add(tool.slug);
    }
  }
  for (const tool of INDEXABLE_TOOLS) {
    const categorySize = INDEXABLE_TOOLS.filter(other => other.category === tool.category).length;
    assert.ok(incoming.get(tool.slug)!.size >= Math.min(2, categorySize - 1), `Missing peer links: ${tool.slug}`);
  }
});

test('category discovery links stay canonical, distinct and relevant', () => {
  for (const category of CATEGORIES) {
    const tools = getDiscoveryTools(category.key);
    const categorySize = INDEXABLE_TOOLS.filter(t => t.category === category.key).length;
    assert.equal(tools.length, Math.min(2, categorySize));
    assert.equal(new Set(tools.map(canonicalToolPath)).size, tools.length);
    assert.ok(tools.every(t => t.category === category.key && isIndexableTool(t)));
    assert.deepEqual(tools.map(t => t.slug), getDiscoveryTools(category.key).map(t => t.slug));
  }
});

test('alias inputs never introduce alias destinations or a self-link', () => {
  for (const alias of Object.keys(TOOL_ALIASES)) {
    const tool = bySlug.get(alias)!;
    const { related, more } = getToolLinks(tool);
    assert.ok([...related, ...more].every(target => isIndexableTool(target) && canonicalToolPath(target) !== canonicalToolPath(tool)));
  }
});
