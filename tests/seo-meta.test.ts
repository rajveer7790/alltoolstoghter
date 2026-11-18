import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_TOOLS, CATEGORIES, bySlug } from '../lib/registry';
import { TOOL_ALIASES } from '../lib/toolPolicy';
import { CURATED } from '../lib/seo/curated';
import { CATEGORY_SEO } from '../lib/seo/categories';
import { toolSeo, processing, TITLE_MAX, DESC_MIN, DESC_MAX } from '../lib/seo/meta';
import { sampleTables, generatedFaqs } from '../lib/seo/content';

const canonical = ALL_TOOLS.filter(t => !TOOL_ALIASES[t.slug]);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '');

test('every canonical tool has a title and description inside search-result limits', () => {
  for (const t of canonical) {
    const { title, description } = toolSeo(t);
    assert.ok(title.length >= 15 && title.length <= TITLE_MAX, `${t.slug} title ${title.length}: ${title}`);
    assert.ok(description.length >= DESC_MIN && description.length <= DESC_MAX, `${t.slug} description ${description.length}`);
  }
});

test('titles and descriptions are unique across canonical tools', () => {
  const titles = new Map<string, string>(), descriptions = new Map<string, string>();
  for (const t of canonical) {
    const { title, description } = toolSeo(t);
    assert.ok(!titles.has(title), `${t.slug} duplicates the title of ${titles.get(title)}`);
    assert.ok(!descriptions.has(description), `${t.slug} duplicates the description of ${descriptions.get(description)}`);
    titles.set(title, t.slug); descriptions.set(description, t.slug);
  }
});

test('curated entries point at real tools and keep the primary keyword in the title', () => {
  for (const [slug, [title]] of Object.entries(CURATED)) {
    const tool = bySlug.get(slug);
    assert.ok(tool, `unknown curated slug ${slug}`);
    const keyword = norm(tool.keywords[0] || tool.name).replace(/\s+/g, '');
    const words = norm(tool.keywords[0] || tool.name).split(' ').filter(Boolean);
    const hit = words.filter(w => norm(title).replace(/\s+/g, '').includes(w)).length;
    assert.ok(hit >= Math.ceil(words.length / 2), `${slug}: "${title}" lacks keyword "${keyword}"`);
  }
});

test('"no upload / in your browser" is never claimed for server-processed tools', () => {
  for (const t of canonical) {
    if (processing(t) === 'local') continue;
    const { title, description } = toolSeo(t);
    assert.ok(!/no upload|nothing is uploaded|in your browser|not uploaded|runs in your browser/i.test(title + ' ' + description), `${t.slug}: ${title} | ${description}`);
  }
  for (const slug of ['pdf-to-word', 'word-to-pdf', 'ocr-pdf', 'grammar-checker', 'url-shortener']) assert.notEqual(processing(bySlug.get(slug)!), 'local', slug);
  for (const slug of ['merge-pdf', 'json-formatter', 'image-compressor']) assert.equal(processing(bySlug.get(slug)!), 'local', slug);
});

test('category hubs have bounded, unique titles for every category', () => {
  const seen = new Set<string>();
  for (const c of CATEGORIES) {
    const entry = CATEGORY_SEO[c.key];
    assert.ok(entry, c.key);
    assert.ok(entry[0].length <= TITLE_MAX, `${c.key} title ${entry[0].length}`);
    assert.ok(entry[1].length >= DESC_MIN - 10 && entry[1].length <= DESC_MAX, `${c.key} description ${entry[1].length}`);
    assert.ok(!seen.has(entry[0])); seen.add(entry[0]);
  }
});

test('sample tables come from the tool formula and stay well formed', () => {
  const mortgage = sampleTables(bySlug.get('mortgage-calculator')!);
  assert.ok(mortgage.length >= 1);
  assert.ok(mortgage[0].rows.some(r => r[0].includes('(default)') && r[1] === '$1,769.79'), 'default row must equal the documented $1,769.79 payment');
  let tables = 0;
  for (const t of canonical) for (const table of sampleTables(t)) {
    tables++;
    assert.ok(table.rows.length >= 3, t.slug);
    assert.ok(table.rows.every(r => r.length === table.headers.length && r.every(Boolean)), `${t.slug} ragged table`);
    assert.ok(!table.rows.some(r => r.some(c => /NaN|Infinity|undefined/.test(c))), t.slug);
  }
  assert.ok(tables > 100, `only ${tables} sample tables`);
});

test('generated FAQs add unique question-form answers without breaking existing FAQs', () => {
  for (const t of canonical) {
    const generated = generatedFaqs(t);
    const questions = [...t.content.faqs, ...generated].map(f => f[0]);
    for (const [q, a] of generated) assert.ok(q.endsWith('?') && a.length > 20, `${t.slug}: ${q}`);
    assert.equal(new Set(generated.map(f => f[0])).size, generated.length, t.slug);
    assert.ok(questions.length >= t.content.faqs.length);
  }
  const questions = generatedFaqs(bySlug.get('sip-calculator')!).map(f => f[0]).join('|');
  assert.match(questions, /How is the SIP Calculator \(India\) calculated\?/);
});

test('deep content entries are complete, honest and their worked examples are computed by the tool', async () => {
  const { DEEP } = await import('../lib/seo/deep');
  const { workedExample } = await import('../lib/seo/content');
  assert.ok(Object.keys(DEEP).length >= 200);
  const banned = /\b(best|most accurate|adobe|number one|top-rated)\b/i;
  for (const [slug, d] of Object.entries(DEEP)) {
    const tool = bySlug.get(slug);
    assert.ok(tool, slug);
    assert.equal(d.sections.length, 3, slug);
    assert.equal(d.faqs.length, 3, slug);
    const text = [d.answer, ...d.sections.flatMap(s => [s.heading, s.text]), ...d.faqs.flat()].join(' ');
    assert.ok(!banned.test(text), `${slug}: banned phrase`);
    if (processing(tool) !== 'local') assert.ok(!/no upload|not uploaded|in your browser|locally/i.test(text), `${slug}: privacy claim on a server tool`);
    const existing = new Set(tool.content.faqs.map(f => f[0].toLowerCase()));
    for (const [q] of d.faqs) assert.ok(!existing.has(q.toLowerCase()), `${slug}: duplicate FAQ ${q}`);
    if (d.exampleInputs && Object.keys(d.exampleInputs).length) {
      const example = workedExample(tool, d.exampleInputs);
      assert.ok(example && !/NaN|undefined/.test(example), `${slug}: example does not compute`);
    }
  }
});

test('declared target keywords are placed where search engines and answer engines read them', async () => {
  const { DEEP } = await import('../lib/seo/deep');
  const { keywordReport } = await import('../lib/seo/keywordCheck');
  let declared = 0;
  for (const [slug, d] of Object.entries(DEEP)) {
    if (!d.shortKeyword) continue;
    declared++;
    const tool = bySlug.get(slug)!;
    const r = keywordReport(tool);
    assert.equal(r.source, 'declared', slug);
    assert.ok(r.title, `${slug}: short keyword "${r.short}" missing from title`);
    assert.ok(r.description, `${slug}: short keyword missing from description`);
    assert.ok(r.answer, `${slug}: short keyword missing from the first 70 words of the answer`);
    assert.equal(d.longKeywords?.length, 3, slug);
    for (const l of r.long) assert.ok(l.where.some(w => w === 'heading' || w === 'faq' || w === 'answer' || w === 'summary'), `${slug}: long-tail "${l.phrase}" not in a heading, FAQ question, answer or summary`);
    assert.ok(r.long.filter(l => l.where.includes('heading') || l.where.includes('faq')).length >= 2, `${slug}: fewer than two long-tail phrases used as heading/FAQ question`);
    const words = (d.aiSummary || '').trim().split(/\s+/).length;
    assert.ok(words >= 30 && words <= 62, `${slug}: aiSummary ${words} words`);
    assert.notEqual((d.aiSummary || '').trim(), d.answer.trim(), slug);
    assert.ok(!/search volume|monthly searches|ranks? (first|#)|most popular/i.test(`${d.answer} ${d.aiSummary}`), `${slug}: ranking/volume claim`);
  }
  assert.ok(declared >= 100, `only ${declared} tools declare keywords`);
});
