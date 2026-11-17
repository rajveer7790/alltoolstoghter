'use client';
import { DOCUMENT_BY_ID } from '@/lib/documents/catalog';
import DocumentWorkbench from '@/components/documents/DocumentWorkbench';
export default function DocumentWidget({ operationId }: { operationId: string }) {
  const tool = DOCUMENT_BY_ID.get(operationId);
  return tool ? <DocumentWorkbench key={tool.id} tool={tool} /> : null;
}
