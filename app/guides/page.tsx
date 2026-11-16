import { socialMetadata } from '@/lib/pageMetadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guides';
export const metadata: Metadata = socialMetadata({ title: 'Practical Guides — Calculations, Files & Developer Tools', description: 'Worked examples and practical checklists for mortgage payments, JSON debugging, PDF workflows, Markdown, BMI and tax calculations.', alternates: { canonical: '/guides' } });
export default function Guides() { return <div className="content"><h1 className="tool-h1">Practical guides</h1><p className="tool-sub">Understand the method, try a worked example and check the limits.</p><div className="grid grid-tools">{GUIDES.map(g => <article className="tool-card" key={g.slug}><h2><Link href={`/guides/${g.slug}`}>{g.title}</Link></h2><p>{g.description}</p></article>)}</div><p><a href="/feed.xml">RSS feed</a></p></div>; }
