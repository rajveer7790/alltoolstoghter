/** Renders JSON-LD. Content is JSON.stringify'd from our own static registry (no user input),
 *  and '<' is escaped to prevent any script-context breakout. */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
