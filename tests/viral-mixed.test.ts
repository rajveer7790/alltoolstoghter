import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_MIXED as C, cctvStorage, printCost, buildDmarc, fmtDuration, allowedDowntimeSeconds, fluidClamp } from '../lib/calc/viral/mixed';
import { VIRAL_MIXED } from '../lib/registry/viralMixed';

const approx = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);
const defaults = (slug: string) => {
  const t = VIRAL_MIXED.find((x) => x.slug === slug)!;
  return Object.fromEntries((t.fields ?? []).map((f) => [f.key, String(f.def)]));
};
const run = (slug: string, over: Record<string, string> = {}) => C[slug]({ ...defaults(slug), ...over });
const val = (rows: { label: string; value: string }[], label: string) => rows.find((r) => r.label.startsWith(label))!.value;

test('registry/compute alignment and content rules', () => {
  for (const t of VIRAL_MIXED) {
    assert.ok(C[t.slug], t.slug);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    const m = t.metaDescription!;
    assert.ok(m.length >= 120 && m.length <= 158, `${t.slug} meta ${m.length}`);
    assert.ok(m.toLowerCase().includes(t.keywords[0]), t.slug);
    assert.ok(t.content.intro.split(/\s+/).length >= 35 && t.content.faqs.length >= 4 && t.content.howSteps!.length === 3);
    assert.ok(t.related.length <= 4);
    assert.ok(!/\b(best|most accurate|guaranteed|#1)\b/i.test(JSON.stringify(t.content)), t.slug);
  }
  assert.equal(VIRAL_MIXED.length, 5);
});

test('defaults: finite, main set, no NaN/Infinity', () => {
  for (const t of VIRAL_MIXED) {
    const rows = run(t.slug);
    assert.ok(rows.length <= 8 && rows.some((r) => r.main), t.slug);
    for (const r of rows) assert.ok(!/NaN|Infinity|∞/.test(r.value + r.label), `${t.slug}: ${r.value}`);
    assert.notEqual(rows[0].label, 'Check inputs');
  }
});

/* ---------------- CCTV ---------------- */
test('cctv reference vectors', () => {
  // 1 Mbps = 125,000 B/s; x86,400 = 10.8e9 B = 10.8 GB/day.
  approx(cctvStorage(1, 1, 100, 1, 0).perCamDayGB, 10.8);
  // 4 cams, 4 Mbps, 50% recording, 10 days: 43.2 GB/day x 0.5 = 21.6; x10 = 216; x4 = 864 GB = 0.864 TB.
  const a = cctvStorage(4, 4, 50, 10, 0);
  approx(a.totalGB, 864); approx(a.totalTB, 0.864);
  // 10% overhead: 864 x 1.1 = 950.4
  approx(cctvStorage(4, 4, 50, 10, 10).totalGB, 950.4);
  // 1 TB = 1e12 B / 2^40 = 0.9094947 TiB
  approx(cctvStorage(1, 8, 100, 1, 0).totalTiB, (1e9 * 86.4) / 2 ** 40, 1e-12);
});
test('cctv invalid', () => {
  assert.equal(run('cctv-storage-calculator', { cameras: '0' })[0].label, 'Check inputs');
  assert.equal(run('cctv-storage-calculator', { mbps: 'abc' })[0].label, 'Check inputs');
  assert.equal(run('cctv-storage-calculator', { rec: '150' })[0].label, 'Check inputs');
  assert.equal(run('cctv-storage-calculator', { cameras: '2.5' })[0].label, 'Check inputs');
});
test('cctv example', () => {
  const r = run('cctv-storage-calculator');
  assert.equal(val(r, 'Per camera, per day'), '21.6 GB');
  assert.equal(val(r, 'Per camera, whole'), '648 GB');
  assert.equal(val(r, 'Total storage (GB)'), '5,184 GB');
  assert.equal(val(r, 'Total storage needed'), '5.18 TB');
  assert.equal(val(r, 'Total storage (binary)'), '4.71 TiB');
  const ex = VIRAL_MIXED[0].content.example!;
  for (const s of ['21.6 GB', '648 GB', '5,184 GB', '5.18 TB', '4.71 TiB']) assert.ok(ex.includes(s));
});

/* ---------------- 3D print ---------------- */
const base = { grams: 120, spoolGrams: 750, spoolPrice: 25, hours: 8, watts: 250, kwhPrice: 0.3, failPct: 10, wearPerHour: 0.2, labour: 3, markupPct: 50 };
test('3d print reference vectors', () => {
  // material 120/750*25 = 4.00; energy 0.25 kW*8 h*0.3 = 0.60; failure 10% of 4.60 = 0.46;
  // wear 0.2*8 = 1.60; cost = 4+0.6+0.46+1.6+3 = 9.66; selling = 9.66*1.5 = 14.49; per g = 0.12075
  const r = printCost(base);
  approx(r.material, 4); approx(r.energy, 0.6); approx(r.failure, 0.46); approx(r.wear, 1.6);
  approx(r.cost, 9.66); approx(r.selling, 14.49); approx(r.perGram, 0.12075);
  // zero allowances: only material + energy: 10 g of 1000 g at 30 = 0.30; 100 W*1 h*0.2=0.02
  approx(printCost({ ...base, grams: 10, spoolGrams: 1000, spoolPrice: 30, hours: 1, watts: 100, kwhPrice: 0.2, failPct: 0, wearPerHour: 0, labour: 0, markupPct: 0 }).selling, 0.32);
  // markup 100% doubles cost
  approx(printCost({ ...base, markupPct: 100 }).selling, 19.32);
});
test('3d print invalid and remaining', () => {
  const s = '3d-printing-filament-cost-calculator';
  assert.equal(run(s, { spoolGrams: '0' })[0].label, 'Check inputs');
  assert.equal(run(s, { grams: '-5' })[0].label, 'Check inputs');
  assert.equal(run(s, { markupPct: 'x' })[0].label, 'Check inputs');
  assert.equal(val(run(s, { remaining: '30' }), 'Spool remaining'), 'Short by 20 g (spool too light)');
  assert.ok(val(run(s, { remaining: '' }), 'Spool remaining').startsWith('Enter'));
});
test('3d print example', () => {
  const r = run('3d-printing-filament-cost-calculator');
  assert.equal(val(r, 'Material cost'), '1');
  assert.equal(val(r, 'Electricity'), '0.15');
  assert.equal(val(r, 'Failure allowance'), '0.06');
  assert.equal(val(r, 'Machine wear'), '2.5');
  assert.equal(val(r, 'Production cost'), '3.71');
  assert.equal(val(r, 'Selling price'), '4.82');
  assert.equal(val(r, 'Selling price per gram'), '0.096');
  assert.equal(val(r, 'Spool remaining'), '350 g');
  const ex = VIRAL_MIXED[1].content.example!;
  for (const s of ['1.00', '0.15', '0.06', '2.50', '3.71', '4.82', '0.096', '350 g']) assert.ok(ex.includes(s), s);
});

/* ---------------- DMARC ---------------- */
const dm = { domain: 'example.com', policy: 'none', sp: 'inherit', pct: 100, rua: '', ruf: '', adkim: 'r', aspf: 'r', ri: 86400 };
test('dmarc reference vectors', () => {
  // RFC 7489: v first, p second; defaults omitted.
  const a = buildDmarc(dm) as any;
  assert.equal(a.value, 'v=DMARC1; p=none');
  assert.equal(a.host, '_dmarc.example.com');
  const b = buildDmarc({ ...dm, domain: 'Mail.Example.org.', policy: 'reject', sp: 'quarantine', pct: 25, rua: 'mailto:a@example.org, b@x.io', adkim: 's', aspf: 's', ri: 3600 }) as any;
  assert.equal(b.host, '_dmarc.mail.example.org');
  assert.equal(b.value, 'v=DMARC1; p=reject; sp=quarantine; pct=25; rua=mailto:a@example.org,mailto:b@x.io; adkim=s; aspf=s; ri=3600');
  assert.ok(b.warnings.some((w: string) => w.includes('7489 section 7.1')));
  const c = buildDmarc({ ...dm, policy: 'quarantine', ruf: 'f@example.com' }) as any;
  assert.equal(c.value, 'v=DMARC1; p=quarantine; ruf=mailto:f@example.com');
});
test('dmarc invalid', () => {
  const s = 'dmarc-record-generator';
  assert.equal(run(s, { domain: 'not a domain' })[0].label, 'Check inputs');
  assert.equal(run(s, { domain: 'localhost' })[0].label, 'Check inputs');
  assert.equal(run(s, { rua: 'nobody' })[0].label, 'Check inputs');
  assert.equal(run(s, { pct: '101' })[0].label, 'Check inputs');
  assert.equal(run(s, { policy: 'block' })[0].label, 'Check inputs');
  assert.equal(run(s, { ri: '0' })[0].label, 'Check inputs');
});
test('dmarc example', () => {
  const r = run('dmarc-record-generator');
  assert.equal(val(r, 'TXT record value'), 'v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com');
  assert.equal(val(r, 'DNS host'), '_dmarc.example.com');
  assert.equal(val(r, 'Value length'), '54 characters');
  const ex = VIRAL_MIXED[2].content.example!;
  for (const s of ['_dmarc.example.com', 'v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com', '54 characters']) assert.ok(ex.includes(s));
});

/* ---------------- SLA ---------------- */
test('sla reference vectors', () => {
  approx(allowedDowntimeSeconds(99.9, 2592000), 2592, 1e-6); // 30 d x 86400 x 0.001
  approx(allowedDowntimeSeconds(99.99, 31536000), 3153.6, 1e-6); // 365 d x 0.0001
  approx(allowedDowntimeSeconds(99.999, 31556952), 315.56952, 1e-6);
  approx(allowedDowntimeSeconds(99.9, 86400, 2), 86400 * (1 - 0.999 ** 2), 1e-9); // 0.998001 => 172.4... s
  assert.equal(fmtDuration(2592), '43 m 12 s');
  assert.equal(fmtDuration(3153.6), '52 m 33.6 s');
  assert.equal(fmtDuration(315.57), '5 m 15.6 s');
  assert.equal(fmtDuration(3600 * 8.76), '8 h 45 m 36 s');
  assert.equal(fmtDuration(45), '45 s');
});
test('sla modes and invalid', () => {
  const s = 'sla-downtime-calculator';
  assert.equal(val(run(s, { sla: '99.99', period: 'year365' }), 'Allowed downtime per'), '52 m 33.6 s');
  // achieved: 43.2 min in 30 d => exactly 99.9%
  const a = run(s, { mode: 'achieved', measured: '43.2' });
  assert.equal(val(a, 'Achieved availability'), '99.9%');
  assert.equal(val(a, 'Target met?'), 'Yes');
  assert.equal(val(run(s, { mode: 'achieved', measured: '60' }), 'Target met?'), 'No');
  assert.equal(run(s, { sla: '101' })[0].label, 'Check inputs');
  assert.equal(run(s, { services: '0' })[0].label, 'Check inputs');
  assert.equal(run(s, { period: 'decade' })[0].label, 'Check inputs');
  assert.equal(run(s, { mode: 'achieved', measured: '-1' })[0].label, 'Check inputs');
  assert.ok(!/NaN|Infinity/.test(JSON.stringify(run(s, { sla: '100', mode: 'achieved', measured: '5' }))));
});
test('sla example', () => {
  const s = 'sla-downtime-calculator';
  const r = run(s);
  assert.equal(val(r, 'Allowed downtime (seconds)'), '2,592 s');
  assert.equal(val(r, 'Per year'), '8 h 45 m 57 s');
  const r3 = run(s, { services: '3' });
  assert.equal(val(r3, 'Composite'), '99.7003%'); // 0.999^3 = 0.997002999
  assert.equal(val(r3, 'Allowed downtime per'), '2 h 9 m 28.2 s');
  const ex = VIRAL_MIXED[3].content.example!;
  for (const x of ['2,592 seconds', '43 m 12 s', '8 h 45 m 57 s', '99.7003%', '2 h 9 m 28 s']) assert.ok(ex.includes(x), x);
});

/* ---------------- CSS clamp ---------------- */
test('css clamp reference vectors', () => {
  // 16->24 px over 320->1280: slope 8/960; intercept 16-320*8/960 = 13.3333 px
  const a = fluidClamp(16, 24, 320, 1280, 16, 800);
  assert.equal(a.css, 'clamp(1rem, 0.8333rem + 0.8333vw, 1.5rem)');
  approx(a.atPx, 20, 1e-9);
  // 14->18 over 400->1200: slope 0.005; intercept 14-2 = 12 px = 0.75rem; 0.5vw
  assert.equal(fluidClamp(14, 18, 400, 1200, 16, 0).css, 'clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem)');
  // clamped below min and above max
  approx(fluidClamp(14, 18, 400, 1200, 16, 100).atPx, 14);
  approx(fluidClamp(14, 18, 400, 1200, 16, 5000).atPx, 18);
  // root 10: 20->40 over 500->1500: slope 0.02, intercept 10 px = 1rem; 2vw
  assert.equal(fluidClamp(20, 40, 500, 1500, 10, 1000).css, 'clamp(2rem, 1rem + 2vw, 4rem)');
});
test('css clamp invalid and example', () => {
  const s = 'css-fluid-typography-clamp-calculator';
  assert.equal(run(s, { maxVw: '320' })[0].label, 'Check inputs');
  assert.equal(run(s, { maxPx: '10' })[0].label, 'Check inputs');
  assert.equal(run(s, { root: '0' })[0].label, 'Check inputs');
  assert.equal(run(s, { minPx: '' })[0].label, 'Check inputs');
  const r = run(s);
  assert.equal(val(r, 'CSS value'), 'clamp(1rem, 0.8333rem + 0.8333vw, 1.5rem)');
  assert.equal(val(r, 'Size at'), '20 px (1.25rem)');
  const ex = VIRAL_MIXED[4].content.example!;
  for (const x of ['clamp(1rem, 0.8333rem + 0.8333vw, 1.5rem)', '20 px', '13.3333 px']) assert.ok(ex.includes(x), x);
});
