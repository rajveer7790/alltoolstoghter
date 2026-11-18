import type { ToolDef } from '@/lib/types';
import { inputsSummary, resultLabels } from '@/lib/seo/content';
import { processing } from '@/lib/seo/meta';

const firstSentence = (text: string, max = 220) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  const sentence = (match ? match[0] : text).trim();
  return sentence.length > max ? sentence.slice(0, max - 1).replace(/[\s,;:]+\S*$/, '') + '…' : sentence;
};

/**
 * Compact, extractable summary for readers and answer engines. Every fact is derived from the tool's own
 * data (method text, input fields, result labels, processing mode); nothing here is a ranking claim.
 */
export function AtAGlance({ tool, summary }: { tool: ToolDef; summary?: string }) {
  const mode = processing(tool);
  const inputs = inputsSummary(tool)?.replace(/^Inputs:\s*/, '').replace(/\.$/, '');
  const results = resultLabels(tool);
  const rows: [string, string][] = [
    ['Method', firstSentence(tool.content.how)],
    ...(inputs ? [['Inputs', inputs] as [string, string]] : []),
    ...(results.length ? [['Results', results.join(', ')] as [string, string]] : []),
    ['Where it runs', mode === 'local' ? 'In your browser; the values or files you use are not sent to a server.' : mode === 'server' ? 'On a server; what you submit is sent when you press the action button.' : 'In a separate workspace.'],
  ];
  return (
    <section className="at-a-glance" aria-labelledby="glance-h">
      <h2 id="glance-h">{tool.name} at a glance</h2>
      {summary && <p className="glance-summary">{summary}</p>}
      <dl>{rows.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl>
    </section>
  );
}
