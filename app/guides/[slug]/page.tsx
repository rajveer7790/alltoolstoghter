import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDES } from '@/lib/guides';
import { AUTHOR, CONTENT_UPDATED } from '@/lib/contentDates';
import { bySlug, SITE } from '@/lib/registry';
import { canonicalToolPath } from '@/lib/toolPolicy';
import JsonLd from '@/components/JsonLd';
export function generateStaticParams() { return GUIDES.map(g => ({ slug: g.slug })); }
export async function generateMetadata({params: pendingParams}:{params:Promise<{slug:string}>}): Promise<Metadata> { const params=await pendingParams; const g=GUIDES.find(g=>g.slug===params.slug); return g ? { title: g.title, description:g.description,alternates:{canonical:`/guides/${g.slug}`},openGraph:{type:'article',title:g.title,description:g.description,url:`/guides/${g.slug}`,modifiedTime:CONTENT_UPDATED,authors:[SITE.url+AUTHOR.path]}, twitter:{card:'summary_large_image',title:g.title,description:g.description,images:['/opengraph-image.png']} } : {}; }
export default async function GuidePage({params: pendingParams}:{params:Promise<{slug:string}>}) {
 const params=await pendingParams;
 const g=GUIDES.find(g=>g.slug===params.slug); if(!g) notFound();
 return <div className="content"><JsonLd data={{'@context':'https://schema.org','@type':'Article',headline:g.title,description:g.description,datePublished:CONTENT_UPDATED,dateModified:CONTENT_UPDATED,mainEntityOfPage:SITE.url+'/guides/'+g.slug,image:SITE.url+'/opengraph-image.png',author:{'@type':'Person',name:AUTHOR.name,url:SITE.url+AUTHOR.path},publisher:{'@type':'Organization',name:SITE.name,url:SITE.url}}}/><nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link> / {g.title}</nav><h1 className="tool-h1">{g.title}</h1><p className="tool-sub">{g.description}</p><p className="content-byline">By <Link href={AUTHOR.path}>{AUTHOR.name}</Link> · Published and updated <time dateTime={CONTENT_UPDATED}>16 November 2026</time> · <Link href="/editorial-policy">Editorial policy</Link></p><article className="prose"><aside className="guide-takeaways"><h2>Key takeaways</h2><ul>{g.takeaways.map(t=><li key={t}>{t}</li>)}</ul></aside>{g.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}<h2>Try the tools</h2><ul>{g.tools.map(slug=>{const t=bySlug.get(slug);return t?<li key={slug}><Link href={canonicalToolPath(t)}>{t.name}</Link> — {t.short}</li>:null;})}</ul><h2>Sources and scope</h2><ul>{g.sources.map(s=><li key={s.url}><a href={s.url}>{s.label}</a></li>)}</ul><p>Examples are educational. Financial, tax and health topics require professional advice for individual decisions. No independent professional review is claimed.</p></article><section className="prose"><h2>More guides</h2><ul>{GUIDES.filter(other=>other.slug!==g.slug).slice(0,3).map(other=><li key={other.slug}><Link href={`/guides/${other.slug}`}>{other.title}</Link></li>)}</ul></section></div>;
}
