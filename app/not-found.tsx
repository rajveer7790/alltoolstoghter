import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="content" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 className="tool-h1">No instrument at this address</h1>
      <p className="tool-sub" style={{ margin: '0 auto 22px' }}>The tool you are looking for moved or never existed.</p>
      <Link className="btn btn-primary" href="/">Browse all tools</Link>
    </div>
  );
}
