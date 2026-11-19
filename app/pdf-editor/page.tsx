import type { Metadata } from 'next';
import PdfEditor from '@/components/pdf-editor/PdfEditor';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import RelatedTools from '@/components/RelatedTools';
import { bySlug, SITE } from '@/lib/registry';
import { DEEP } from '@/lib/seo/deep';
import { toolSeo } from '@/lib/seo/meta';
import { socialMetadata } from '@/lib/pageMetadata';
import { lastModifiedFor } from '@/lib/contentDates';
const tool = bySlug.get('pdf-editor')!;
const seo = toolSeo(tool);
const content = DEEP['pdf-editor'];
export const metadata: Metadata = {
  ...socialMetadata({ title: seo.title, description: seo.description, alternates: { canonical: '/pdf-editor' } }),
  title: { absolute: seo.title },
  robots: { index: true, follow: true },
};
export default function EditorPage() {
  return <>
    <PdfEditor />
    <div className="wrap">
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebApplication', '@id': SITE.url + '/pdf-editor#application', name: 'PDF Editor', url: SITE.url + '/pdf-editor', description: seo.description, applicationCategory: 'ProductivityApplication', operatingSystem: 'Web browser', isAccessibleForFree: true, dateModified: lastModifiedFor('/pdf-editor'), offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
        { '@type': 'FAQPage', mainEntity: content.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
      ] }} />
      <section className="prose" aria-labelledby="pdf-editor-help">
        <h2 id="pdf-editor-help">How to use this PDF editor</h2>
        <p>{content.answer}</p>
        {content.sections.map(section => <section key={section.heading}><h3>{section.heading}</h3><p>{section.text}</p></section>)}
        <h2>PDF editor questions</h2>
        {content.faqs.map(([question, answer]) => <section key={question}><h3>{question}</h3><p>{answer}</p></section>)}
        <p>Editor updated: <time dateTime={lastModifiedFor('/pdf-editor')}>{lastModifiedFor('/pdf-editor')}</time>. <Link href="/open-source">Sources and licenses</Link> · <Link href="/privacy">Privacy details</Link></p>
      </section>
      <RelatedTools tool={tool} />
    </div>
  </>;
}
