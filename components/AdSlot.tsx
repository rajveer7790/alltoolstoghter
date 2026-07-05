/** Reserved-size ad container. Replace inner content with your ad network tag when ready. */
export default function AdSlot({ id }: { id: string }) {
  return <div className="ad-slot" id={`ad-${id}`} aria-hidden="true" />;
}
