import Link from 'next/link';
import type { ToolDef } from '@/lib/types';
import { canonicalToolPath } from '@/lib/toolPolicy';
import { indexableAlternativesFor, pendingToolsFor } from '@/lib/seo/autolink';

const list = (tools: ToolDef[]) => (
  <ul>
    {tools.map(t => <li key={t.slug}><Link href={canonicalToolPath(t)} prefetch={false}>{t.name}</Link> — {t.short}</li>)}
  </ul>
);

/** Topical links between indexable tools and server-processed tools that are served but not yet indexed. */
export default function AutoLinks({ tool }: { tool: ToolDef }) {
  const servers = pendingToolsFor(tool);
  const local = indexableAlternativesFor(tool);
  if (!servers.length && !local.length) return null;
  return (
    <>
      {servers.length > 0 && (
        <section className="prose" aria-labelledby="server-links-h">
          <h2 id="server-links-h">Related document tools that use a server</h2>
          <p>These tools send the file you choose to the document server when you press the action button. Read the <Link href="/privacy">privacy details</Link> before submitting anything confidential.</p>
          {list(servers)}
        </section>
      )}
      {local.length > 0 && (
        <section className="prose" aria-labelledby="local-links-h">
          <h2 id="local-links-h">Browser-only alternatives</h2>
          <p>These tools process files in your browser, so the file is not sent to a server.</p>
          {list(local)}
        </section>
      )}
    </>
  );
}
