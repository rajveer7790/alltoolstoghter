'use client';
import { useMemo, useState } from 'react';

function b64urlDecode(s: string): string {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function JwtWidget() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzAwMDAwMDAwfQ.signature');
  const parsed = useMemo(() => {
    const parts = token.trim().split('.');
    if (parts.length < 2) return { err: 'A JWT has three dot-separated parts: header.payload.signature' };
    try {
      const header = JSON.parse(b64urlDecode(parts[0]));
      const payload = JSON.parse(b64urlDecode(parts[1]));
      let expNote = '';
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        expNote = expDate < new Date() ? `Expired ${expDate.toLocaleString()}` : `Expires ${expDate.toLocaleString()}`;
      }
      return { header, payload, sig: parts[2] || '(none)', expNote, err: '' };
    } catch {
      return { err: 'Could not decode — check that the token is a valid JWT.' };
    }
  }, [token]);

  return (
    <div className="tool-card">
      <div className="field">
        <label htmlFor="jwt-in">JWT token</label>
        <textarea id="jwt-in" value={token} onChange={e => setToken(e.target.value)} spellCheck={false} style={{ minHeight: 90 }} />
      </div>
      {'err' in parsed && parsed.err ? (
        <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {parsed.err}</p>
      ) : (
        <div style={{ marginTop: 10 }} aria-live="polite">
          <div className="field"><label>Header</label>
            <textarea readOnly value={JSON.stringify((parsed as any).header, null, 2)} style={{ minHeight: 80 }} spellCheck={false} /></div>
          <div className="field" style={{ marginTop: 10 }}><label>Payload</label>
            <textarea readOnly value={JSON.stringify((parsed as any).payload, null, 2)} style={{ minHeight: 120 }} spellCheck={false} /></div>
          {(parsed as any).expNote && (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, marginTop: 8,
              color: (parsed as any).expNote.startsWith('Expired') ? '#DC2626' : '#16A34A' }}>
              {(parsed as any).expNote}
            </p>
          )}
        </div>
      )}
      <p className="privacy-note"><span className="dot" />decoded locally — the signature is NOT verified, and the token never leaves your browser</p>
    </div>
  );
}
