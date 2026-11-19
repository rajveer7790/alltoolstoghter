import { CalcResult } from '../../types';
import { num } from '../../format';

const bad = (why: string): CalcResult[] => [{ label: 'Check inputs', value: why, main: true }];
/** Strict numeric parse: empty / non-numeric / non-finite -> NaN. */
const n = (v: unknown): number => {
  const s = String(v ?? '').trim();
  if (s === '') return NaN;
  const x = Number(s);
  return Number.isFinite(x) ? x : NaN;
};
const inRange = (x: number, lo: number, hi: number) => Number.isFinite(x) && x >= lo && x <= hi;

/* ------------------------------------------------------------------ */
/* CCTV storage                                                        */
/* ------------------------------------------------------------------ */
export function cctvStorage(cameras: number, mbps: number, recPct: number, days: number, overheadPct: number) {
  const bytesPerSecond = (mbps * 1e6) / 8;
  const perCamDayGB = (bytesPerSecond * 86400 * (recPct / 100)) / 1e9;
  const perCamTotalGB = perCamDayGB * days * (1 + overheadPct / 100);
  const totalGB = perCamTotalGB * cameras;
  return { perCamDayGB, perCamTotalGB, totalGB, totalTB: totalGB / 1000, totalTiB: (totalGB * 1e9) / 2 ** 40 };
}

function cctv(v: Record<string, any>): CalcResult[] {
  const cams = n(v.cameras), mbps = n(v.mbps), rec = n(v.rec), days = n(v.days), oh = n(v.overhead);
  if (!inRange(cams, 1, 10000) || !Number.isInteger(cams)) return bad('Number of cameras must be a whole number from 1 to 10,000.');
  if (!inRange(mbps, 0.001, 1000)) return bad('Bitrate must be between 0.001 and 1,000 Mbps.');
  if (!(rec > 0 && rec <= 100)) return bad('Recording time must be above 0% and at most 100%.');
  if (!inRange(days, 1, 3650)) return bad('Retention must be between 1 and 3,650 days.');
  if (!inRange(oh, 0, 200)) return bad('Overhead must be between 0% and 200%.');
  const r = cctvStorage(cams, mbps, rec, days, oh);
  return [
    { label: 'Total storage needed (decimal)', value: `${num(r.totalTB, 2)} TB`, main: true },
    { label: 'Total storage (GB)', value: `${num(r.totalGB, 1)} GB` },
    { label: 'Total storage (binary)', value: `${num(r.totalTiB, 2)} TiB` },
    { label: 'Per camera, per day', value: `${num(r.perCamDayGB, 2)} GB` },
    { label: 'Per camera, whole retention', value: `${num(r.perCamTotalGB, 1)} GB` },
    { label: 'Average bitrate, all cameras', value: `${num(mbps * cams * (rec / 100), 2)} Mbps` },
  ];
}

/* ------------------------------------------------------------------ */
/* 3D print cost                                                       */
/* ------------------------------------------------------------------ */
export interface PrintCostIn {
  grams: number; spoolGrams: number; spoolPrice: number; hours: number; watts: number; kwhPrice: number;
  failPct: number; wearPerHour: number; labour: number; markupPct: number;
}
export function printCost(i: PrintCostIn) {
  const material = (i.grams / i.spoolGrams) * i.spoolPrice;
  const energy = (i.watts / 1000) * i.hours * i.kwhPrice;
  const failure = (material + energy) * (i.failPct / 100);
  const wear = i.wearPerHour * i.hours;
  const cost = material + energy + failure + wear + i.labour;
  const selling = cost * (1 + i.markupPct / 100);
  return { material, energy, failure, wear, cost, selling, perGram: selling / i.grams };
}

function print3d(v: Record<string, any>): CalcResult[] {
  const i: PrintCostIn = {
    grams: n(v.grams), spoolGrams: n(v.spoolGrams), spoolPrice: n(v.spoolPrice), hours: n(v.hours), watts: n(v.watts),
    kwhPrice: n(v.kwhPrice), failPct: n(v.failPct), wearPerHour: n(v.wearPerHour), labour: n(v.labour), markupPct: n(v.markupPct),
  };
  const remaining = String(v.remaining ?? '').trim() === '' ? 0 : n(v.remaining);
  if (!inRange(i.grams, 0.01, 100000)) return bad('Filament used must be between 0.01 and 100,000 g.');
  if (!inRange(i.spoolGrams, 1, 100000)) return bad('Spool net weight must be between 1 and 100,000 g.');
  if (!inRange(i.spoolPrice, 0, 1e6)) return bad('Spool price must be zero or more.');
  if (!inRange(i.hours, 0, 10000)) return bad('Print time must be between 0 and 10,000 hours.');
  if (!inRange(i.watts, 0, 100000)) return bad('Average printer power must be between 0 and 100,000 W.');
  if (!inRange(i.kwhPrice, 0, 1000)) return bad('Electricity price must be zero or more.');
  if (!inRange(i.failPct, 0, 500)) return bad('Failure allowance must be between 0% and 500%.');
  if (!inRange(i.wearPerHour, 0, 1e5)) return bad('Machine wear per hour must be zero or more.');
  if (!inRange(i.labour, 0, 1e7)) return bad('Labour cost must be zero or more.');
  if (!inRange(i.markupPct, 0, 10000)) return bad('Markup must be between 0% and 10,000%.');
  if (!inRange(remaining, 0, 100000)) return bad('Spool remaining must be zero or more.');
  const r = printCost(i);
  let left = 'Enter spool grams left to see this';
  if (remaining > 0) {
    left = remaining >= i.grams ? `${num(remaining - i.grams, 1)} g` : `Short by ${num(i.grams - remaining, 1)} g (spool too light)`;
  }
  return [
    { label: 'Selling price', value: num(r.selling, 2), main: true },
    { label: 'Production cost', value: num(r.cost, 2) },
    { label: 'Material cost', value: num(r.material, 2) },
    { label: 'Electricity', value: num(r.energy, 2) },
    { label: 'Failure allowance', value: num(r.failure, 2) },
    { label: 'Machine wear', value: num(r.wear, 2) },
    { label: 'Selling price per gram', value: num(r.perGram, 3) },
    { label: 'Spool remaining after print', value: left },
  ];
}

/* ------------------------------------------------------------------ */
/* DMARC record generator                                              */
/* ------------------------------------------------------------------ */
const POLICIES = ['none', 'quarantine', 'reject'];
const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$|^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+xn--[a-z0-9-]{1,59}$/;
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z0-9-]{2,63}$/;

export function parseMailboxes(raw: string): { uris: string[]; invalid?: string } {
  const parts = raw.split(/[\s,;]+/).filter(Boolean);
  const uris: string[] = [];
  for (const p of parts) {
    const addr = p.replace(/^mailto:/i, '');
    if (!EMAIL_RE.test(addr)) return { uris: [], invalid: p };
    uris.push('mailto:' + addr);
  }
  return { uris };
}

export interface DmarcIn {
  domain: string; policy: string; sp: string; pct: number; rua: string; ruf: string; adkim: string; aspf: string; ri: number;
}
export function buildDmarc(i: DmarcIn): { host: string; value: string; warnings: string[] } | { error: string } {
  const domain = i.domain.trim().toLowerCase().replace(/\.$/, '');
  if (!DOMAIN_RE.test(domain)) return { error: 'Enter a valid domain such as example.com (letters, digits, hyphens and dots only).' };
  if (!POLICIES.includes(i.policy)) return { error: 'Policy must be none, quarantine or reject.' };
  if (i.sp !== 'inherit' && !POLICIES.includes(i.sp)) return { error: 'Subdomain policy must be inherit, none, quarantine or reject.' };
  if (!Number.isInteger(i.pct) || i.pct < 0 || i.pct > 100) return { error: 'pct must be a whole number from 0 to 100.' };
  if (!['r', 's'].includes(i.adkim) || !['r', 's'].includes(i.aspf)) return { error: 'Alignment modes must be r (relaxed) or s (strict).' };
  if (!Number.isInteger(i.ri) || i.ri < 1 || i.ri > 4294967295) return { error: 'Report interval must be a whole number of seconds from 1 to 4294967295.' };
  const rua = parseMailboxes(i.rua);
  if (rua.invalid) return { error: `Aggregate report address "${rua.invalid}" is not a valid email address.` };
  const ruf = parseMailboxes(i.ruf);
  if (ruf.invalid) return { error: `Forensic report address "${ruf.invalid}" is not a valid email address.` };

  const tags = ['v=DMARC1', `p=${i.policy}`];
  if (i.sp !== 'inherit') tags.push(`sp=${i.sp}`);
  if (i.pct !== 100) tags.push(`pct=${i.pct}`);
  if (rua.uris.length) tags.push(`rua=${rua.uris.join(',')}`);
  if (ruf.uris.length) tags.push(`ruf=${ruf.uris.join(',')}`);
  if (i.adkim === 's') tags.push('adkim=s');
  if (i.aspf === 's') tags.push('aspf=s');
  if (i.ri !== 86400) tags.push(`ri=${i.ri}`);

  const w: string[] = [];
  if (i.policy === 'none') w.push('p=none only monitors: start here, read the aggregate reports, then move to quarantine or reject.');
  w.push('A message passes DMARC only if SPF or DKIM passes AND aligns with the visible From domain.');
  if (!rua.uris.length) w.push('No rua address: you will not receive aggregate reports.');
  if (ruf.uris.length) w.push('ruf (failure reports) is honoured by few receivers; do not rely on it.');
  if (i.pct !== 100 && i.policy === 'none') w.push('pct has no effect while p=none.');
  const ext = rua.uris.concat(ruf.uris).some((u) => {
    const d = u.split('@')[1].toLowerCase();
    return d !== domain && !d.endsWith('.' + domain);
  });
  if (ext) w.push('A report address on another domain needs an authorisation TXT record published by that domain (RFC 7489 section 7.1).');
  return { host: `_dmarc.${domain}`, value: tags.join('; '), warnings: w };
}

function dmarc(v: Record<string, any>): CalcResult[] {
  const r = buildDmarc({
    domain: String(v.domain ?? ''), policy: String(v.policy ?? ''), sp: String(v.sp ?? 'inherit'),
    pct: n(v.pct), rua: String(v.rua ?? ''), ruf: String(v.ruf ?? ''),
    adkim: String(v.adkim ?? 'r'), aspf: String(v.aspf ?? 'r'), ri: n(v.ri),
  });
  if ('error' in r) return bad(r.error);
  return [
    { label: 'TXT record value', value: r.value, main: true },
    { label: 'DNS host (name)', value: r.host },
    { label: 'Record type', value: 'TXT' },
    { label: 'Value length', value: `${r.value.length} characters` },
    { label: 'Notes', value: r.warnings.join(' ') },
  ];
}

/* ------------------------------------------------------------------ */
/* SLA uptime / downtime                                               */
/* ------------------------------------------------------------------ */
export const PERIODS: Record<string, { s: number; label: string }> = {
  day: { s: 86400, label: 'Day (24 h)' },
  week: { s: 604800, label: 'Week (7 d)' },
  month30: { s: 2592000, label: '30-day month' },
  month: { s: 2629746, label: 'Average month (365.2425 d / 12)' },
  quarter: { s: 7889400, label: 'Quarter (365.25 d / 4)' },
  year365: { s: 31536000, label: 'Year (365 d)' },
  year: { s: 31556952, label: 'Year (365.2425 d)' },
};

/** Format seconds as "Xh Ym Z.Zs" using integer tenths to avoid float drift. */
export function fmtDuration(sec: number): string {
  const t = Math.round(sec * 10);
  if (t < 600) return `${num(t / 10, 1)} s`;
  const h = Math.floor(t / 36000);
  const rem = t % 36000;
  const m = Math.floor(rem / 600);
  const s = (rem % 600) / 10;
  const parts: string[] = [];
  if (h) parts.push(`${num(h, 0)} h`);
  parts.push(`${m} m`);
  parts.push(`${num(s, 1)} s`);
  return parts.join(' ');
}

export const allowedDowntimeSeconds = (slaPct: number, periodSeconds: number, services = 1) =>
  periodSeconds * (1 - Math.pow(slaPct / 100, services));

function sla(v: Record<string, any>): CalcResult[] {
  const mode = String(v.mode ?? 'allowed');
  const s = n(v.sla);
  const per = PERIODS[String(v.period ?? 'month30')];
  const svc = n(v.services);
  if (!inRange(s, 0, 100)) return bad('Availability must be between 0 and 100 percent.');
  if (!per) return bad('Choose a period from the list.');
  if (!inRange(svc, 1, 1000) || !Number.isInteger(svc)) return bad('Number of serial services must be a whole number from 1 to 1,000.');
  if (mode === 'achieved') {
    const mins = n(v.measured);
    if (!inRange(mins, 0, 43200)) return bad('Measured downtime must be between 0 and 43,200 minutes (one 30-day month).');
    const avail = (1 - (mins * 60) / 2592000) * 100;
    const budget = allowedDowntimeSeconds(s, 2592000, 1) / 60;
    const used = budget > 0 ? `${num((mins / budget) * 100, 1)}%` : mins > 0 ? 'Over budget (no downtime allowed)' : '0%';
    return [
      { label: 'Achieved availability (30-day month)', value: `${num(avail, 4)}%`, main: true },
      { label: 'Measured downtime', value: fmtDuration(mins * 60) },
      { label: `Allowed at ${num(s, 4)}% target`, value: fmtDuration(budget * 60) },
      { label: 'Error budget used', value: used },
      { label: 'Target met?', value: mins <= budget + 1e-9 ? 'Yes' : 'No' },
    ];
  }
  if (mode !== 'allowed') return bad('Mode must be allowed downtime or achieved availability.');
  const eff = Math.pow(s / 100, svc) * 100;
  const dt = allowedDowntimeSeconds(s, per.s, svc);
  return [
    { label: `Allowed downtime per ${per.label}`, value: fmtDuration(dt), main: true },
    { label: 'Allowed downtime (seconds)', value: `${num(dt, 2)} s` },
    { label: svc > 1 ? `Composite availability (${svc} in series)` : 'Availability', value: `${num(eff, 5)}%` },
    { label: 'Per 30-day month', value: fmtDuration(allowedDowntimeSeconds(s, 2592000, svc)) },
    { label: 'Per year (365.2425 d)', value: fmtDuration(allowedDowntimeSeconds(s, 31556952, svc)) },
  ];
}

/* ------------------------------------------------------------------ */
/* CSS clamp()                                                         */
/* ------------------------------------------------------------------ */
const trim4 = (x: number): string => {
  const s = (Math.round(x * 10000) / 10000).toFixed(4).replace(/\.?0+$/, '');
  return s === '-0' || s === '' ? '0' : s;
};

export function fluidClamp(minPx: number, maxPx: number, minVw: number, maxVw: number, root: number, atVw: number) {
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const interceptPx = minPx - slope * minVw;
  const css = `clamp(${trim4(minPx / root)}rem, ${trim4(interceptPx / root)}rem + ${trim4(slope * 100)}vw, ${trim4(maxPx / root)}rem)`;
  const atPx = Math.min(maxPx, Math.max(minPx, interceptPx + slope * atVw));
  return { slope, interceptPx, css, atPx };
}

function clampGen(v: Record<string, any>): CalcResult[] {
  const minPx = n(v.minPx), maxPx = n(v.maxPx), minVw = n(v.minVw), maxVw = n(v.maxVw), root = n(v.root), at = n(v.at);
  if (!inRange(minPx, 0.1, 1000) || !inRange(maxPx, 0.1, 1000)) return bad('Sizes must be between 0.1 and 1,000 px.');
  if (maxPx < minPx) return bad('Maximum size must be greater than or equal to the minimum size.');
  if (!inRange(minVw, 1, 100000) || !inRange(maxVw, 1, 100000)) return bad('Viewport widths must be between 1 and 100,000 px.');
  if (maxVw <= minVw) return bad('Maximum viewport width must be larger than the minimum viewport width.');
  if (!inRange(root, 1, 100)) return bad('Root font size must be between 1 and 100 px.');
  if (!inRange(at, 0, 100000)) return bad('Preview viewport width must be between 0 and 100,000 px.');
  const r = fluidClamp(minPx, maxPx, minVw, maxVw, root, at);
  return [
    { label: 'CSS value', value: r.css, main: true },
    { label: 'Slope (vw part)', value: `${trim4(r.slope * 100)}vw` },
    { label: 'Intercept', value: `${trim4(r.interceptPx / root)}rem (${trim4(r.interceptPx)} px)` },
    { label: 'Minimum / maximum', value: `${trim4(minPx / root)}rem / ${trim4(maxPx / root)}rem` },
    { label: `Size at ${trim4(at)} px viewport`, value: `${trim4(r.atPx)} px (${trim4(r.atPx / root)}rem)` },
  ];
}

export const COMPUTES_MIXED: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'cctv-storage-calculator': cctv,
  '3d-printing-filament-cost-calculator': print3d,
  'dmarc-record-generator': dmarc,
  'sla-downtime-calculator': sla,
  'css-fluid-typography-clamp-calculator': clampGen,
};
