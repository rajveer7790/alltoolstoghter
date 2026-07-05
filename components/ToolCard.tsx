import Link from 'next/link';
import { ToolDef } from '@/lib/types';
import { getCategory } from '@/lib/registry';

export default function ToolCard({ tool, showCat = false }: { tool: ToolDef; showCat?: boolean }) {
  return (
    <Link href={`/${tool.category}/${tool.slug}`} className="tcard">
      {showCat && <span className="t-cat">{getCategory(tool.category)?.name}</span>}
      <p className="t-name">{tool.name}</p>
      <p className="t-short">{tool.short}</p>
    </Link>
  );
}
