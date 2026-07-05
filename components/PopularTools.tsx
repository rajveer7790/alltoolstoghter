import Link from 'next/link';
import { popularTools } from '@/lib/linking';
import ToolCard from './ToolCard';

export default function PopularTools({ title = 'Popular tools', limit = 12 }: { title?: string; limit?: number }) {
  const tools = popularTools.slice(0, limit);
  return (
    <section className="popular-tools" aria-labelledby="popular-h">
      <div className="cat-band"><h2 id="popular-h">{title}</h2></div>
      <div className="grid grid-tools">
        {tools.map(t => <ToolCard key={t.slug} tool={t} showCat />)}
      </div>
    </section>
  );
}