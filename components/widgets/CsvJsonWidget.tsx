'use client';
import { useState } from 'react';

function csvToJson(csv: string, delim: string): string {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 1) return '[]';
  const split = (line: string) => {
    const out: string[] = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
      else if (c === delim && !inQ) { out.push(cur); cur = ''; }
      else cur += c;
    }
    out.push(cur); return out;
  };
  const headers = split(lines[0]);
  const rows = lines.slice(1).map(l => {
    const vals = split(l); const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h.trim()] = (vals[i] ?? '').trim(); });
    return obj;
  });
  return JSON.stringify(rows, null, 2);
}

function jsonToCsv(json: string, delim: string): string {
  const data = JSON.parse(json);
  const arr = Array.isArray(data) ? data : [data];
  if (!arr.length) return '';
  const headers = [...new Set(arr.flatMap(o => Object.keys(o)))];
  const esc = (v: any) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) || s.includes(delim) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [headers.join(delim), ...arr.map(o => headers.map(h => esc(o[h])).join(delim))].join('\n');
}

export default function CsvJsonWidget() {
  const [mode, setMode] = useState<'csv2json' | 'json2csv'>('csv2json');
  const [input, setInput] = useState('name,age,city\nJane,32,Austin\nMo,28,Denver');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  const run = () => {
    setErr('');
    try { setOutput(mode === 'csv2json' ? csvToJson(input, ',') : jsonToCsv(input, ',')); }
    catch (e) { setOutput(''); setErr(e instanceof Error ? e.message : 'Conversion failed — check your input format.'); }
  };
  const copy = async () => { try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} };
  const swap = (m: typeof mode) => {
    setMode(m);
    setInput(m === 'csv2json' ? 'name,age,city\nJane,32,Austin\nMo,28,Denver' : '[\n  { "name": "Jane", "age": 32 },\n  { "name": "Mo", "age": 28 }\n]');
    setOutput(''); setErr('');
  };

  return (
    <div className="tool-card">
      <div className="pills" style={{ marginBottom: 14 }}>
        <button type="button" className="pill" aria-pressed={mode === 'csv2json'} onClick={() => swap('csv2json')}>CSV → JSON</button>
        <button type="button" className="pill" aria-pressed={mode === 'json2csv'} onClick={() => swap('json2csv')}>JSON → CSV</button>
      </div>
      <div className="field">
        <label htmlFor="cj-in">{mode === 'csv2json' ? 'CSV input' : 'JSON input'}</label>
        <textarea id="cj-in" value={input} onChange={e => setInput(e.target.value)} spellCheck={false} style={{ minHeight: 130 }} />
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={run}>Convert</button>
        <button type="button" className="btn" onClick={copy} disabled={!output}>{copied ? 'Copied ✓' : 'Copy output'}</button>
      </div>
      {err && <p style={{ color: '#DC2626', fontSize: 13.5, marginTop: 10 }} aria-live="polite">✗ {err}</p>}
      {output && (
        <div className="field" style={{ marginTop: 6 }}>
          <label htmlFor="cj-out">Output</label>
          <textarea id="cj-out" readOnly value={output} spellCheck={false} style={{ minHeight: 130 }} />
        </div>
      )}
      <p className="privacy-note"><span className="dot" />converted locally — your data never leaves your browser</p>
    </div>
  );
}
