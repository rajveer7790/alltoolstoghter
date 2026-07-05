'use client';
import { useState } from 'react';
import { apiPost, hasBackend } from '@/lib/apiClient';

type Match = { message: string; offset: number; length: number; bad: string; suggestions: string[]; rule: string; type: string };

export default function GrammarCheckerWidget() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const check = async (t = text) => {
    if (!t.trim()) { setError('Enter some text to check.'); return; }
    setBusy(true); setError(''); setMatches(null);
    try {
      const data = await apiPost<{ matches: Match[] }>('/api/grammar', { text: t, language });
      setMatches(data.matches);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong.';
      setError(msg === 'BACKEND_NOT_CONFIGURED'
        ? 'The grammar backend is not connected yet. Deploy the All Tools Together backend (it uses LanguageTool) and set NEXT_PUBLIC_API_BASE to activate this tool.'
        : msg);
    }
    setBusy(false);
  };

  const apply = (m: Match, replacement: string) => {
    const next = text.slice(0, m.offset) + replacement + text.slice(m.offset + m.length);
    setText(next);
    check(next); // re-check with corrected text
  };

  return (
    <div className="tool-card">
      {!hasBackend && (
        <p style={{ fontSize: 13, color: 'var(--ink-2)', background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.25)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
          This tool needs the All Tools Together backend (included under <code>/backend</code>, powered by LanguageTool). Deploy it and set <code>NEXT_PUBLIC_API_BASE</code> to activate.
        </p>
      )}
      <div className="field"><label htmlFor="gc-in">Your text</label>
        <textarea id="gc-in" value={text} onChange={e => setText(e.target.value)} placeholder="Paste text to check for grammar and spelling…" style={{ minHeight: 160 }} /></div>
      <div className="field-grid">
        <div className="field"><label htmlFor="gc-lang">Language</label>
          <select id="gc-lang" value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="en-US">English (US)</option><option value="en-GB">English (UK)</option>
            <option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option><option value="pt">Portuguese</option>
          </select></div>
        <div className="field" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={() => check()} disabled={busy || !text.trim()}>{busy ? 'Checking…' : 'Check grammar →'}</button>
        </div>
      </div>
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 10 }} aria-live="polite">✗ {error}</p>}
      {matches && (
        matches.length === 0
          ? <p style={{ fontSize: 14, color: '#047857', marginTop: 14 }} aria-live="polite">✓ No issues found — looks clean.</p>
          : (
            <div style={{ marginTop: 16 }} aria-live="polite">
              <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginBottom: 10 }}><strong>{matches.length}</strong> issue{matches.length !== 1 ? 's' : ''} found:</p>
              {matches.map((m, i) => (
                <div key={i} style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{m.rule}</div>
                  <div style={{ fontSize: 14, margin: '4px 0' }}>{m.message}</div>
                  {m.bad && <div style={{ fontSize: 13, fontFamily: 'var(--mono)', background: 'rgba(220,38,38,0.08)', display: 'inline-block', padding: '2px 6px', borderRadius: 4 }}>{m.bad}</div>}
                  {m.suggestions.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      {m.suggestions.map((s, j) => (
                        <button key={j} type="button" className="pill" onClick={() => apply(m, s)} title="Apply this fix">{s || '(remove)'}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
      )}
      <p className="privacy-note"><span className="dot" />checked via your own backend — self-host LanguageTool for full privacy</p>
    </div>
  );
}
