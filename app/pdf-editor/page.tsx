import type { Metadata } from 'next';
import PdfEditor from '@/components/pdf-editor/PdfEditor';
export const metadata: Metadata = {
  title: 'PDF Editor — Edit Text, Add Notes & Fill Forms',
  description: 'Edit PDF text, add text and images, highlight sections, fill forms and organize pages in your browser with All Tools Together.',
  alternates: { canonical: '/pdf/pdf-editor' },
  robots: { index: false, follow: true },
};
export default function EditorPage() { return <PdfEditor />; }
