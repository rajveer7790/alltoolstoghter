'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/** All ISO 4217 currencies supported by Frankfurter (ECB-sourced, free, no key). */
const CURRENCIES: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar', AUD: 'Australian Dollar', CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan', INR: 'Indian Rupee', MXN: 'Mexican Peso',
  BRL: 'Brazilian Real', KRW: 'South Korean Won', SGD: 'Singapore Dollar',
  HKD: 'Hong Kong Dollar', NOK: 'Norwegian Krone', SEK: 'Swedish Krona',
  DKK: 'Danish Krone', NZD: 'New Zealand Dollar', ZAR: 'South African Rand',
  TRY: 'Turkish Lira', PLN: 'Polish Złoty', THB: 'Thai Baht',
  MYR: 'Malaysian Ringgit', IDR: 'Indonesian Rupiah', PHP: 'Philippine Peso',
  CZK: 'Czech Koruna', HUF: 'Hungarian Forint', RON: 'Romanian Leu',
  ILS: 'Israeli Shekel', AED: 'UAE Dirham', SAR: 'Saudi Riyal',
  QAR: 'Qatari Riyal', KWD: 'Kuwaiti Dinar', BHD: 'Bahraini Dinar',
  EGP: 'Egyptian Pound', PKR: 'Pakistani Rupee', BDT: 'Bangladeshi Taka',
  VND: 'Vietnamese Dong', NGN: 'Nigerian Naira', KES: 'Kenyan Shilling',
  GHS: 'Ghanaian Cedi', CLP: 'Chilean Peso', COP: 'Colombian Peso',
  PEN: 'Peruvian Sol', ARS: 'Argentine Peso', BGN: 'Bulgarian Lev',
  HRK: 'Croatian Kuna', ISK: 'Icelandic Króna',
};

const POPULAR = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'INR', 'CNY', 'MXN'];

type Rates = Record<string, number>;

function fmt(n: number, code: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: code,
      minimumFractionDigits: 2, maximumFractionDigits: code === 'JPY' || code === 'KRW' || code === 'IDR' || code === 'VND' ? 0 : 4,
    }).format(n);
  } catch {
    return n.toFixed(4);
  }
}

export default function CurrencyConverterWidget() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rates, setRates] = useState<Rates | null>(null);
  const [base, setBase] = useState('USD');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cache = useRef<Record<string, { rates: Rates; date: string }>>({});

  const fetchRates = useCallback(async (b: string) => {
    if (cache.current[b]) { setRates(cache.current[b].rates); setDate(cache.current[b].date); setBase(b); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${b}`);
      if (!res.ok) throw new Error(`Rate service responded ${res.status}.`);
      const data = await res.json();
      const r: Rates = { ...data.rates, [b]: 1 };
      cache.current[b] = { rates: r, date: data.date };
      setRates(r); setDate(data.date); setBase(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not fetch exchange rates.');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchRates(from); }, [from, fetchRates]);

  const swap = () => { setFrom(to); setTo(from); };
  const n = parseFloat(amount);
  const result = rates && Number.isFinite(n) && rates[to] ? n * rates[to] : null;
  const rate = rates && rates[to] ? rates[to] : null;

  // All popular comparisons when amount is valid
  const comparisons = rates && Number.isFinite(n)
    ? POPULAR.filter(c => c !== from).map(c => ({ code: c, name: CURRENCIES[c] ?? c, value: n * (rates[c] ?? 0) }))
    : [];

  const CurrencySelect = ({ id, val, onChange }: { id: string; val: string; onChange: (v: string) => void }) => (
    <select id={id} value={val} onChange={e => onChange(e.target.value)}>
      <optgroup label="Popular">
        {POPULAR.map(c => <option key={c} value={c}>{c} — {CURRENCIES[c]}</option>)}
      </optgroup>
      <optgroup label="All currencies">
        {Object.entries(CURRENCIES).filter(([c]) => !POPULAR.includes(c)).sort((a, b) => a[0].localeCompare(b[0]))
          .map(([c, name]) => <option key={c} value={c}>{c} — {name}</option>)}
      </optgroup>
    </select>
  );

  return (
    <div className="tool-card">
      <div className="field-grid">
        <div className="field">
          <label htmlFor="cc-amt">Amount</label>
          <input id="cc-amt" type="number" inputMode="decimal" step="any" value={amount}
            onChange={e => setAmount(e.target.value)} style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600 }} />
        </div>
        <div className="field">
          <label htmlFor="cc-from">From</label>
          <CurrencySelect id="cc-from" val={from} onChange={v => setFrom(v)} />
        </div>
      </div>

      {/* Swap + To */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="cc-to">To</label>
          <CurrencySelect id="cc-to" val={to} onChange={setTo} />
        </div>
        <button type="button" className="btn" onClick={swap} style={{ marginBottom: 2 }} aria-label="Swap currencies">⇄</button>
      </div>

      {/* Main result */}
      {loading && <p style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 14 }}>Fetching live rates…</p>}
      {error && <p style={{ fontSize: 13.5, color: '#DC2626', marginTop: 14 }} aria-live="polite">✗ {error}</p>}
      {result !== null && !loading && (
        <>
          <div className="readout" style={{ marginTop: 16 }} aria-live="polite">
            <div className="readout-main" style={{ fontSize: 22 }}>
              <span className="rlabel">{from} → {to}</span>
              {fmt(result, to)}
            </div>
            <div className="readout-rows">
              <div className="readout-row">
                <span className="k">Exchange rate</span>
                <span className="v">1 {from} = {rate?.toFixed(6)} {to}</span>
              </div>
              <div className="readout-row">
                <span className="k">Inverse rate</span>
                <span className="v">1 {to} = {(1 / (rate ?? 1)).toFixed(6)} {from}</span>
              </div>
              <div className="readout-row">
                <span className="k">Rate source date</span>
                <span className="v">{date}</span>
              </div>
            </div>
          </div>

          {/* Quick comparison table */}
          {comparisons.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                {fmt(n, from)} in other currencies
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6 }}>
                {comparisons.map(({ code, value }) => (
                  <button key={code} type="button"
                    onClick={() => setTo(code)}
                    style={{ textAlign: 'left', background: to === code ? 'rgba(11,95,255,0.06)' : 'var(--card)', border: `1px solid ${to === code ? 'var(--signal)' : 'var(--line)'}`, borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--signal-ink)', display: 'block' }}>{code}</span>
                    <span style={{ fontSize: 14, fontFamily: 'var(--mono)', fontWeight: 600 }}>{fmt(value, code)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <p className="privacy-note" style={{ marginTop: 14 }}>
        <span className="dot" />rates from European Central Bank via Frankfurter — updated daily on business days
      </p>
    </div>
  );
}
