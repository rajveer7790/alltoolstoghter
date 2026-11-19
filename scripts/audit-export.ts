import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
import { ALL_TOOLS, CATEGORIES, SITE } from '../lib/registry';
import { STATIC_PATHS, CONTENT_UPDATED } from '../lib/contentDates';
import { GUIDES } from '../lib/guides';
import { canonicalToolPath, isIndexableTool } from '../lib/toolPolicy';

const root = 'out';
const origin = new URL(SITE.url);
const exists = (path: string) => [path, `${path}.html`, `${path}/index.html`].some(p => existsSync(join(root, p)));
const files = (dir: string): string[] => readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)]);
const htmlFiles = files(root).filter(f => f.endsWith('.html') && !f.startsWith(join(root, 'pdf-editor') + '/') && f !== join(root, 'pdf-editor.html'));
const titles = new Map<string,string>();
const descriptions = new Map<string,string>();
const pageAudit: { path: string; title: string; description: string; canonical: string; robots: string; inSitemap?: boolean }[] = [];
const manifest: Record<string,string> = {};
const renderedLinks = new Map<string, Set<string>>();
let links = 0, schemas = 0;
for (const file of htmlFiles) {
  const path = '/' + file.slice(root.length+1).replace(/\.html$/, '').replace(/^index$/, '');
  const document = parse(readFileSync(file,'utf8'));
  const nodes:any[] = []; const walk=(n:any)=>{nodes.push(n);(n.childNodes||[]).forEach(walk);};walk(document);
  assert.ok(!nodes.some(n => (n.attrs || []).some((a:any) => a.name === 'class' && a.value.split(/\s+/).includes('drawer'))), `Closed mobile drawer must not render in page HTML: ${path}`);
  const attrs = (n:any) => Object.fromEntries((n.attrs||[]).map((a:any)=>[a.name,a.value]));
  const outgoing = new Set<string>();
  for (const node of nodes.filter(n => n.tagName === 'a')) {
    const href = attrs(node).href;
    if (!href || /^(mailto:|tel:|data:|blob:)/.test(href)) continue;
    const target = new URL(href, origin.origin + path);
    if (target.origin === origin.origin) outgoing.add(target.pathname);
  }
  renderedLinks.set(path, outgoing);
  const meta = (name:string) => nodes.find(n=>n.tagName==='meta' && attrs(n).name===name);
  const text=(n:any):string => n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
  const title = text(nodes.find(n=>n.tagName==='title') || {});
  assert.ok(title, `Missing title: ${path}`);
  if (path !== '/404') {
    const description = meta('description') && attrs(meta('description')).content;
    const robots = meta('robots') ? attrs(meta('robots')).content : '';
    assert.ok(description, `Missing description: ${path}`);
    assert.match(path, /^(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\/?$/, `Non-descriptive URL format: ${path}`);
    assert.equal(nodes.filter(n=>n.tagName==='h1').length,1,`Expected one h1: ${path}`);
    const canonical = nodes.find(n=>n.tagName==='link'&&attrs(n).rel==='canonical');
    assert.ok(canonical,`Missing canonical: ${path}`);
    const url = new URL(attrs(canonical).href);assert.equal(url.origin,origin.origin);assert.ok(exists(url.pathname),`Canonical missing: ${url}`);
    const tool = ALL_TOOLS.find(t=>`/${t.category}/${t.slug}`===path);
    if (!tool || isIndexableTool(tool)) {
      assert.ok(!titles.has(title), `Duplicate indexable title: ${path} and ${titles.get(title)}`);
      titles.set(title,path);
      assert.ok(!descriptions.has(description), `Duplicate indexable description: ${path} and ${descriptions.get(description)}`);
      descriptions.set(description, path);
      assert.doesNotMatch(robots, /\bnoindex\b/i, `Indexable page is blocked: ${path}`);
      assert.equal(url.pathname, path, `Indexable page must be self-canonical: ${path}`);
    }
    if (tool) assert.equal(url.pathname, canonicalToolPath(tool));
    pageAudit.push({ path, title, description, canonical: url.href, robots });
  }
  if(path !== '/404') {
    const visible=(n:any):string => ['script','style'].includes(n.tagName) ? '' : n.nodeName==='#text' ? n.value : (n.childNodes||[]).map(visible).join(' ');
    const payload={ title, description:meta('description') && attrs(meta('description')).content, text:visible(document).replace(/\s+/g,' ').trim(), schema:nodes.filter(n=>n.tagName==='script'&&attrs(n).type==='application/ld+json').map(text), links:nodes.filter(n=>n.tagName==='a').map(n=>attrs(n).href) };
    manifest[origin.origin+path]=createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  }
  for (const n of nodes) {
    const a=attrs(n);
    if(n.tagName==='script'&&a.type==='application/ld+json'){JSON.parse(text(n));schemas++;}
    const raw = n.tagName==='a'||n.tagName==='link'?a.href:['img','script'].includes(n.tagName)?a.src:undefined;
    if(!raw || /^(mailto:|tel:|data:|blob:)/.test(raw))continue;
    const url=new URL(raw,origin.origin+path);
    if(url.origin!==origin.origin)continue;
    assert.ok(exists(decodeURIComponent(url.pathname)),`Broken link/asset ${raw} on ${path}`);links++;
    if(url.hash && url.pathname===path) assert.ok(nodes.some(x=>attrs(x).id===decodeURIComponent(url.hash.slice(1))),`Missing anchor ${raw} on ${path}`);
  }
}
const xml=readFileSync('out/sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].length, urls.length, 'Every sitemap entry needs a maintained modification date');
assert.ok([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every(m=>m[1].startsWith(CONTENT_UPDATED)));
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap URLs');
assert.equal(urls.length,1+STATIC_PATHS.length+GUIDES.length+CATEGORIES.length+ALL_TOOLS.filter(isIndexableTool).length);
for(const url of urls){const u=new URL(url);assert.equal(u.origin,origin.origin);assert.ok(exists(u.pathname));}
for (const row of pageAudit) {
  row.inSitemap = urls.some(url => new URL(url).pathname === row.path);
  assert.equal(row.inSitemap, new URL(row.canonical).pathname === row.path && !/\bnoindex\b/i.test(row.robots), `Sitemap and canonical mismatch: ${row.path}`);
}
// Audit actual exported anchors: discovery must work before JavaScript runs.
const canonicalToolPaths = new Map(ALL_TOOLS.filter(isIndexableTool).map(tool => [canonicalToolPath(tool), tool]));
const incoming = new Map([...canonicalToolPaths.keys()].map(path => [path, new Set<string>()]));
const peerIncoming = new Map([...canonicalToolPaths.keys()].map(path => [path, new Set<string>()]));
for (const [source, targets] of renderedLinks) {
  for (const target of targets) {
    if (source === target || !incoming.has(target)) continue;
    incoming.get(target)!.add(source);
    if (canonicalToolPaths.has(source)) peerIncoming.get(target)!.add(source);
  }
}
const depths = new Map<string, number>([['/', 0]]);
const queue = ['/'];
for (let index = 0; index < queue.length; index++) {
  const source = queue[index];
  for (const target of renderedLinks.get(source) || []) {
    if (depths.has(target) || !renderedLinks.has(target)) continue;
    depths.set(target, depths.get(source)! + 1);
    queue.push(target);
  }
}
const linkCoverage = [...canonicalToolPaths].map(([path, tool]) => {
  const refs = incoming.get(path)!;
  const peers = peerIncoming.get(path)!;
  const minimumPeers = Math.min(2, ALL_TOOLS.filter(t => isIndexableTool(t) && t.category === tool.category).length - 1);
  assert.ok(refs.has('/tools'), `Tool missing from rendered directory: ${path}`);
  assert.ok(refs.has('/' + tool.category), `Tool missing from category hub: ${path}`);
  assert.ok(peers.size >= minimumPeers, `Too few rendered peer links: ${path}`);
  assert.ok(depths.has(path) && depths.get(path)! <= 2, `Tool deeper than two crawl steps: ${path}`);
  return { path, depth: depths.get(path), incomingPages: refs.size, peerIncomingPages: peers.size, exampleReferrers: [...refs].sort().slice(0, 8) };
});
writeFileSync('out/internal-link-audit.json', JSON.stringify({ scope: 'Rendered link coverage, not Google index status', tools: linkCoverage }, null, 2) + '\n');
console.log(JSON.stringify({ canonicalToolsWithVerifiedLinks: linkCoverage.length, maximumToolDepth: Math.max(...linkCoverage.map(row => row.depth!)), minimumPeerReferrers: Math.min(...linkCoverage.map(row => row.peerIncomingPages)) }, null, 2));

if (process.env.SEO_AUDIT_REPORT) writeFileSync(process.env.SEO_AUDIT_REPORT, JSON.stringify(pageAudit, null, 2) + '\n');
for(const t of ALL_TOOLS) assert.equal(urls.includes(SITE.url+`/${t.category}/${t.slug}`),isIndexableTool(t),`Sitemap policy mismatch: ${t.slug}`);
assert.ok(exists('/opengraph-image.png'));assert.match(readFileSync('out/robots.txt','utf8'),/Sitemap: https:\/\/alltoolstogether.com\/sitemap.xml/);
console.log(JSON.stringify({pages:htmlFiles.length,internalLinksAndAssets:links,jsonLdBlocks:schemas,sitemapUrls:urls.length,tools:ALL_TOOLS.length},null,2));

writeFileSync('out/indexnow-manifest.json',JSON.stringify(Object.fromEntries(urls.map(url=>[url,manifest[url] || manifest[url+'/']]))));
