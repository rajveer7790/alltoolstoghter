'use client';
import { useMemo, useState } from 'react';
import TextDownloadButton from './TextDownloadButton';

export default function HtaccessWidget() {
  const [kind, setKind] = useState<'301' | 'www' | 'nowww' | 'https' | 'slash'>('301');
  const [from, setFrom] = useState('/old-page');
  const [to, setTo] = useState('/new-page');
  const [domain, setDomain] = useState('example.com');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const head = 'RewriteEngine On';
    switch (kind) {
      case '301': return `${head}\nRewriteRule ^${from.replace(/^\//, '')}/?$ ${to} [R=301,L]`;
      case 'https': return `${head}\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
      case 'www': return `${head}\nRewriteCond %{HTTP_HOST} ^${domain.replace(/^www\./, '')} [NC]\nRewriteRule ^(.*)$ https://www.${domain.replace(/^www\./, '')}/$1 [L,R=301]`;
      case 'nowww': return `${head}\nRewriteCond %{HTTP_HOST} ^www\\.${domain.replace(/^www\./, '').replace(/\./g, '\\.')} [NC]\nRewriteRule ^(.*)$ https://${domain.replace(/^www\./, '')}/$1 [L,R=301]`;
      case 'slash': return `${head}\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_URI} !(/$|\\.) \nRewriteRule (.*) %{REQUEST_URI}/ [R=301,L]`;
    }
  }, [kind, from, to, domain]);

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };

  return (
    <div className="tool-card">
      <div className="field"><label htmlFor="ht-kind">Redirect type</label>
        <select id="ht-kind" value={kind} onChange={e => setKind(e.target.value as any)}>
          <option value="301">Single page 301 redirect</option>
          <option value="https">Force HTTPS (all pages)</option>
          <option value="www">Force www</option>
          <option value="nowww">Force non-www</option>
          <option value="slash">Force trailing slash</option>
        </select></div>
      {kind === '301' && (
        <div className="field-grid">
          <div className="field"><label htmlFor="ht-from">From path</label><input id="ht-from" type="text" value={from} onChange={e => setFrom(e.target.value)} spellCheck={false} /></div>
          <div className="field"><label htmlFor="ht-to">To URL or path</label><input id="ht-to" type="text" value={to} onChange={e => setTo(e.target.value)} spellCheck={false} /></div>
        </div>
      )}
      {(kind === 'www' || kind === 'nowww') && (
        <div className="field"><label htmlFor="ht-dom">Domain</label><input id="ht-dom" type="text" value={domain} onChange={e => setDomain(e.target.value)} spellCheck={false} /></div>
      )}
      <div className="field" style={{ marginTop: 6 }}><label htmlFor="ht-out">.htaccess rule (Apache)</label>
        <textarea id="ht-out" readOnly value={result} style={{ minHeight: 110, fontFamily: 'var(--mono)', fontSize: 12.5 }} /></div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy rule'}</button>
        <TextDownloadButton content={result} filename=".htaccess" mime="text/plain" label="Preview & Download" />
      </div>
      <p className="privacy-note"><span className="dot" />for Apache servers — add to the .htaccess file in your site root</p>
    </div>
  );
}
