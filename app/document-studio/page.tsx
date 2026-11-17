import Link from 'next/link';
import type { Metadata } from 'next';
import { socialMetadata } from '@/lib/pageMetadata';
import { DOCUMENT_TOOLS, PDF_EDITOR_URL } from '@/lib/documents/catalog';
import DocumentStudio from '@/components/documents/DocumentStudio';

export const metadata: Metadata = socialMetadata({ title: 'Document Studio — PDF, Word, OCR & Office Tools', description: 'Edit PDFs locally, organize pages, fill forms and extract content. Use self-hosted services for Office conversion, OCR and structured document extraction when available.', alternates: { canonical: '/document-studio' } });
export default function DocumentStudioPage() {
  return <div className="wrap ds-page">
    <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / Document Studio</nav>
    <section className="ds-hero"><div><p className="ds-eyebrow">ALL TOOLS TOGETHER / DOCUMENT STUDIO</p><h1>Your documents.<br /><em>More possibilities.</em></h1><p className="ds-lede">From a quick page fix to a complete PDF workspace. Organize, convert and extract with a clear choice of local or server processing.</p><div className="btn-row"><Link href={PDF_EDITOR_URL} className="btn btn-primary" prefetch={false}>Open PDF editor ↗</Link><a href="#document-tools" className="btn">Explore tools ↓</a></div><div className="ds-hero-notes"><span>Local tools need no account</span><span>Original files stay unchanged</span><Link href="/open-source">Open-source engines</Link></div></div>
      <div className="ds-hero-art" aria-hidden="true"><div className="ds-paper ds-paper-back" /><div className="ds-paper"><span className="ds-paper-label">DOCUMENT WORKSPACE</span><div className="ds-paper-line ds-line-title"/><div className="ds-paper-line"/><div className="ds-paper-line"/><div className="ds-paper-columns"><div/><div/></div><div className="ds-paper-stamp">Ready for your next step ↗</div></div><span className="ds-art-chip ds-chip-one">PDF → WORD</span><span className="ds-art-chip ds-chip-two">EDIT · ORGANIZE · EXTRACT</span></div>
    </section>
    <section id="document-tools" className="ds-tools"><DocumentStudio /></section>
    <section className="ds-directory"><h2>Browse individual document tools</h2><p>Local operations work on your device. Server tools show their current availability before you upload.</p><ul>{DOCUMENT_TOOLS.filter(tool => tool.page).map(tool => <li key={tool.id}><Link href={'/pdf/' + tool.id}>{tool.name}</Link><small>{tool.mode === 'server' ? 'Server processing' : 'On your device'}</small></li>)}</ul><p><Link href="/pdf">Existing PDF tools</Link> · <Link href="/image">Image tools</Link> · <Link href="/open-source">Sources, licenses and processing details</Link></p></section>
  </div>;
}
