import Link from 'next/link';
import type { ReactNode } from 'react';

export default function StaticPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="content">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">home</Link> / {title.toLowerCase()}
      </nav>
      <h1 className="tool-h1">{title}</h1>
      {subtitle && <p className="tool-sub">{subtitle}</p>}
      <article className="prose static-prose">{children}</article>
    </div>
  );
}