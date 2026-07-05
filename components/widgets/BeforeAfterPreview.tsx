'use client';

/** Side-by-side original vs result preview (iLoveIMG-style). */
export default function BeforeAfterPreview({
  originalUrl,
  resultUrl,
  originalLabel = 'Original',
  resultLabel = 'Result',
  stats,
}: {
  originalUrl: string;
  resultUrl: string;
  originalLabel?: string;
  resultLabel?: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <div className="before-after">
      <div className="before-after-pair">
        <div className="before-after-pane">
          <div className="before-after-label">{originalLabel}</div>
          <img src={originalUrl} alt={originalLabel} className="before-after-img" />
        </div>
        <div className="before-after-pane">
          <div className="before-after-label">{resultLabel}</div>
          <img src={resultUrl} alt={resultLabel} className="before-after-img" />
        </div>
      </div>
      {stats && stats.length > 0 && (
        <div className="readout" style={{ marginTop: 12 }}>
          <div className="readout-rows">
            {stats.map(s => (
              <div className="readout-row" key={s.label}>
                <span className="k">{s.label}</span><span className="v">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}