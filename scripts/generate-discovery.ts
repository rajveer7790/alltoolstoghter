import { writeFileSync, mkdirSync } from 'node:fs';
import { INDEXABLE_TOOLS, CATEGORIES, SITE, TOOL_COUNT } from '../lib/registry';
import { GUIDES } from '../lib/guides';
import { CONTENT_UPDATED, STATIC_PATHS } from '../lib/contentDates';
const link = (path: string) => SITE.url + path;
const heading = `# ${SITE.name}\n\nUpdated: ${CONTENT_UPDATED} (maintained content revision)\n\n> ${TOOL_COUNT} free tools across ${CATEGORIES.length} categories. Tools marked local process on the device; advanced document conversion, writing services and URL shortening use a backend when available. Currency conversion fetches external rates. No professional review or guaranteed accuracy is implied.\n\n`;
const main = '## Main pages\n\n' + STATIC_PATHS.map(p=>`- [${p.split('/').filter(Boolean).join(' / ')}](${link(p)})`).join('\n') + `\n- [XML sitemap](${link('/sitemap.xml')})\n- [Full catalog](${link('/llms-full.txt')})\n\n`;
const categories = CATEGORIES.map(c=>`## ${c.name}\n\n- [Category](${link('/'+c.key)})\n` + INDEXABLE_TOOLS.filter(t=>t.category===c.key).slice(0,5).map(t=>`- [${t.name}](${link('/'+t.category+'/'+t.slug)}): ${t.short}`).join('\n')).join('\n\n');
const note = '\n\n## Citation and processing notes\n\nCite the specific tool URL, its stated assumptions and effective period. Decoding is not verification; health and financial estimates are not individual advice. Source links do not imply endorsement. Local file processing does not guarantee lossless conversion. llms.txt is informational, not an indexing or citation guarantee.\n';
writeFileSync('public/llms.txt',heading+main+categories+note);
writeFileSync('public/llms-full.txt',heading+INDEXABLE_TOOLS.map(t=>`## ${t.name}\n\nURL: ${link('/'+t.category+'/'+t.slug)}\n\n${t.short}\n\nMethod: ${t.content.how}\n`).join('\n')+note);
const xml = (v:string)=>v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
writeFileSync('public/feed.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.name} Guides</title><link>${link('/guides')}</link><description>Practical worked examples and tool workflows</description>${GUIDES.map(g=>`<item><title>${xml(g.title)}</title><link>${link('/guides/'+g.slug)}</link><guid isPermaLink="true">${link('/guides/'+g.slug)}</guid><description>${xml(g.description)}</description><pubDate>${new Date(CONTENT_UPDATED+'T00:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>\n`);

writeFileSync('public/tool-catalog.json',JSON.stringify(INDEXABLE_TOOLS.map(t=>({slug:t.slug,name:t.name,short:t.short,category:t.category,kw:t.keywords.join(' ')})))+'\n');
