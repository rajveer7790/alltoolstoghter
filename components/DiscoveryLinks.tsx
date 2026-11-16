import Link from 'next/link';
import { CATEGORIES } from '@/lib/registry';
import { getDiscoveryTools } from '@/lib/linking';
import { canonicalToolPath } from '@/lib/toolPolicy';

/** Server-rendered links; no search interaction or JavaScript is needed to discover them. */
export default function DiscoveryLinks() {
  return <section className="wrap discovery-links" aria-labelledby="explore-tools-heading">
    <h2 id="explore-tools-heading">Explore more tools by category</h2>
    <p>Continue with a useful tool, or <Link href="/tools">browse the complete directory</Link>.</p>
    <div className="discovery-grid">{CATEGORIES.map(category => <section key={category.key} className="discovery-group">
      <h3><Link href={`/${category.key}`}>{category.name}</Link></h3>
      <ul>{getDiscoveryTools(category.key).map(tool => <li key={tool.slug}>
        <Link prefetch={false} href={canonicalToolPath(tool)}>{tool.name}</Link>
      </li>)}</ul>
    </section>)}</div>
  </section>;
}
