'use client';
import { useMemo, useState } from 'react';
import { Field, CalcResult } from '@/lib/types';
import { COMPUTES } from '@/lib/calc/computes';
import Readout from './Readout';

/** Schema-driven calculator island. Receives serializable fields from the server page;
 *  looks its compute function up by slug on the client (functions can't cross the boundary). */
export default function CalcWidget({ slug, fields }: { slug: string; fields: Field[] }) {
  const defaults = useMemo(() => Object.fromEntries(fields.map(f => [f.key, String(f.def ?? '')])), [fields]);
  const [values, setValues] = useState(defaults);
  const [copyStatus, setCopyStatus] = useState('');
  const [showResultText, setShowResultText] = useState(false);

  const results: CalcResult[] = useMemo(() => {
    const fn = COMPUTES[slug];
    if (!fn) return [{ label: 'Unavailable', value: 'This tool failed to load.', main: true }];
    for (const field of fields.filter(f => f.type === 'number')) {
      const input = values[field.key]?.trim();
      if (!input && field.def === '') continue; // explicitly optional solver input
      const n = Number(input);
      if (!input || !Number.isFinite(n) || (field.min !== undefined && n < field.min) || (field.max !== undefined && n > field.max)) {
        return [{ label: 'Check inputs', value: `Enter a valid value for ${field.label}${field.min !== undefined ? ` (minimum ${field.min})` : ''}${field.max !== undefined ? ` (maximum ${field.max})` : ''}.`, main: true }];
      }
    }
    try {
      const output = fn(values);
      return output.some(row => /NaN|Infinity|∞/.test(row.value))
        ? [{ label: 'Check inputs', value: 'These inputs do not produce a finite result. Check zero divisors and supported ranges.', main: true }]
        : output;
    }
    catch { return [{ label: 'Check inputs', value: 'Something in the inputs could not be computed.', main: true }]; }
  }, [slug, values, fields]);

  const resultText = results.map(row => `${row.label}: ${row.value}`).join('\n');
  const set = (k: string, v: string) => {
    setValues(prev => ({ ...prev, [k]: v }));
    setCopyStatus('');
  };
  const reset = () => {
    setValues(defaults);
    setCopyStatus('');
    setShowResultText(false);
  };
  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopyStatus('Result copied.');
      setShowResultText(false);
    } catch {
      setCopyStatus('Select and copy the result below.');
      setShowResultText(true);
    }
  };

  return (
    <div className="tool-card">
      <div className="field-grid">
        {fields.map(f => (
          <div className="field" key={f.key}>
            <label htmlFor={`f-${f.key}`}>{f.label}</label>
            {f.type === 'select' ? (
              <select id={`f-${f.key}`} value={values[f.key]} onChange={e => set(f.key, e.target.value)}>
                {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === 'text' ? (
              <textarea id={`f-${f.key}`} value={values[f.key]} onChange={e => set(f.key, e.target.value)} spellCheck={false} />
            ) : (
              <span className="inwrap">
                <input
                  id={`f-${f.key}`} type={f.type}
                  inputMode={f.type === 'number' ? 'decimal' : undefined}
                  value={values[f.key]} min={f.min} max={f.max} step={f.step ?? 'any'}
                  data-unit={f.unit ? '1' : undefined}
                  onChange={e => set(f.key, e.target.value)}
                />
                {f.unit && <span className="unit">{f.unit}</span>}
              </span>
            )}
          </div>
        ))}
      </div>
      <Readout results={results} />
      <div className="btn-row">
        <button className="btn" type="button" onClick={copyResult} disabled={!results.length}>Copy result</button>
        <button className="btn" type="button" onClick={reset}>Reset inputs</button>
        <span role="status">{copyStatus}</span>
      </div>
      {showResultText && <div className="field">
        <label htmlFor="calc-result-copy">Result text</label>
        <textarea id="calc-result-copy" readOnly value={resultText} onFocus={event => event.currentTarget.select()} />
      </div>}
      <p className="privacy-note"><span className="dot" />computed locally — nothing leaves your browser</p>
    </div>
  );
}
