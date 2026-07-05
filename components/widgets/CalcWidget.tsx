'use client';
import { useMemo, useState } from 'react';
import { Field, CalcResult } from '@/lib/types';
import { COMPUTES } from '@/lib/calc/computes';
import Readout from './Readout';

/** Schema-driven calculator island. Receives serializable fields from the server page;
 *  looks its compute function up by slug on the client (functions can't cross the boundary). */
export default function CalcWidget({ slug, fields }: { slug: string; fields: Field[] }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map(f => [f.key, String(f.def ?? '')])));

  const results: CalcResult[] = useMemo(() => {
    const fn = COMPUTES[slug];
    if (!fn) return [{ label: 'Unavailable', value: 'This tool failed to load.', main: true }];
    try { return fn(values); }
    catch { return [{ label: 'Check inputs', value: 'Something in the inputs could not be computed.', main: true }]; }
  }, [slug, values]);

  const set = (k: string, v: string) => setValues(prev => ({ ...prev, [k]: v }));

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
                  id={`f-${f.key}`} type={f.type === 'date' ? 'date' : 'number'}
                  inputMode={f.type === 'date' ? undefined : 'decimal'}
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
      <p className="privacy-note"><span className="dot" />computed locally — nothing leaves your browser</p>
    </div>
  );
}
