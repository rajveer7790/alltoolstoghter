'use client';
import { CalcResult } from '@/lib/types';

/** The signature output panel. aria-live announces recomputed results to screen readers. */
export default function Readout({ results }: { results: CalcResult[] }) {
  const main = results.find(r => r.main) ?? results[0];
  const rest = results.filter(r => r !== main);
  if (!main) return null;
  return (
    <div className="readout" aria-live="polite">
      <div className="readout-main">
        <span className="rlabel">{main.label}</span>
        {main.value}
      </div>
      {rest.length > 0 && (
        <div className="readout-rows">
          {rest.map((r, i) => (
            <div className="readout-row" key={i}>
              <span className="k">{r.label}</span>
              <span className="v">{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
