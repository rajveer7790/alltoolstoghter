import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
import { ALL_TOOLS, CATEGORIES, SITE } from '../lib/registry';
import { canonicalToolPath, isIndexableTool, BACKEND_REQUIRED } from '../lib/toolPolicy';

const root = 'out';
const origin = new URL(SITE.url);
const exists = (path: string) => [path, `${path}.html`, `${path}/index.html`].some(p => existsSync(join(root, p)));
const files = (dir: string): string[] => readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(join(dir,e.name)) : [join(dir,e.name)]);
const htmlFiles = files(root).filter(f => f.endsWith('.html'));
const titles = new Map<string,string>();
let links = 0, schemas = 0;
for (const file of htmlFiles) {
  const path = '/' + file.slice(root.length+1).replace(/\.html$/, '').replace(/^index$/, '');
  const document = parse(readFileSync(file,'utf8'));
  const nodes:any[] = []; const walk=(n:any)=>{nodes.push(n);(n.childNodes||[]).forEach(walk);};walk(document);
  const attrs = (n:any) => Object.fromEntries((n.attrs||[]).map((a:any)=>[a.name,a.value]));
  const meta = (name:string) => nodes.find(n=>n.tagName==='meta' && attrs(n).name===name);
  const text=(n:any):string => n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
  const title = text(nodes.find(n=>n.tagName==='title') || {});
  assert.ok(title, `Missing title: ${path}`);
  if (path !== '/404') {
    assert.ok(meta('description') && attrs(meta('description')).content, `Missing description: ${path}`);
    assert.equal(nodes.filter(n=>n.tagName==='h1').length,1,`Expected one h1: ${path}`);
    const canonical = nodes.find(n=>n.tagName==='link'&&attrs(n).rel==='canonical');
    assert.ok(canonical,`Missing canonical: ${path}`);
    const url = new URL(attrs(canonical).href);assert.equal(url.origin,origin.origin);assert.ok(exists(url.pathname),`Canonical missing: ${url}`);
    const tool = ALL_TOOLS.find(t=>`/${t.category}/${t.slug}`===path);
    if (!tool || isIndexableTool(tool)) {
      assert.ok(!titles.has(title), `Duplicate indexable title: ${path} and ${titles.get(title)}`);
      titles.set(title,path);
    }
    if(tool){ assert.equal(url.pathname,canonicalToolPath(tool)); if(BACKEND_REQUIRED.has(tool.slug))assert.match(attrs(meta('robots')).content,/noindex/); }
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
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap URLs');
assert.equal(urls.length,6+CATEGORIES.length+ALL_TOOLS.filter(isIndexableTool).length);
for(const url of urls){const u=new URL(url);assert.equal(u.origin,origin.origin);assert.ok(exists(u.pathname));}
for(const t of ALL_TOOLS) assert.equal(urls.includes(SITE.url+`/${t.category}/${t.slug}`),isIndexableTool(t),`Sitemap policy mismatch: ${t.slug}`);
assert.ok(exists('/opengraph-image.png'));assert.match(readFileSync('out/robots.txt','utf8'),/Sitemap: https:\/\/alltoolstogether.com\/sitemap.xml/);
console.log(JSON.stringify({pages:htmlFiles.length,internalLinksAndAssets:links,jsonLdBlocks:schemas,sitemapUrls:urls.length,tools:ALL_TOOLS.length},null,2));
