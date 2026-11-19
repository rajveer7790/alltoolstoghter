import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_CREATOR as C, noteMs, cropFactor, tcToFrames, framesToTc, fmtTc, RATES, videoBytes, project } from '../lib/calc/viral/creator';
import { VIRAL_CREATOR } from '../lib/registry/viralCreator';

const row = (r: { label: string; value: string }[], label: string) => r.find(x => x.label === label)!.value;
const defaults = (slug: string) => {
  const t = VIRAL_CREATOR.find(x => x.slug === slug)!;
  const d: Record<string, string> = {};
  for (const f of t.fields ?? []) d[f.key] = String(f.def);
  return d;
};
const run = (slug: string, o: Record<string, any> = {}) => C[slug]({ ...defaults(slug), ...o });
const isBad = (r: { label: string }[]) => r.length === 1 && r[0].label === 'Check inputs';

test('registry/compute consistency and defaults', () => {
  assert.equal(VIRAL_CREATOR.length, Object.keys(C).length);
  for (const t of VIRAL_CREATOR) {
    assert.ok(C[t.slug], t.slug);
    const r = run(t.slug);
    assert.ok(r.length >= 1 && r.length <= 8, t.slug);
    assert.ok(r.some(x => x.main), t.slug);
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.label + x.value), `${t.slug}: ${x.value}`);
    assert.ok(!isBad(r), t.slug);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    const md = t.metaDescription!.length;
    assert.ok(md >= 120 && md <= 158, `${t.slug} meta ${md}`);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]), t.slug);
    assert.ok(t.content.faqs.length >= 4 && t.content.intro.split(/\s+/).length >= 35 && t.content.howSteps!.length === 3);
    assert.ok(t.related.length <= 4);
  }
});

// ---- video file size
// 100 Mbps = 100,000 kbps = 12,500,000 B/s; x 3600 s = 45e9 B = 45 GB.
test('video size reference vectors', () => {
  assert.equal(videoBytes(100000, 3600), 45e9);
  const r = run('video-bitrate-file-size-calculator', { video_kbps: 100000, audio_kbps: 0, hours: 1, minutes: 0, seconds: 0 });
  assert.equal(row(r, 'File size (decimal)'), '45,000 MB (45 GB)');
  // 1000 kbps for 8 s = 1,000,000 bytes = 1 MB.
  assert.equal(row(run('video-bitrate-file-size-calculator', { video_kbps: 1000, audio_kbps: 0, hours: 0, minutes: 0, seconds: 8 }), 'File size (decimal)'), '1 MB (0.001 GB)');
  // 10% overhead on 1 MB -> 1.1 MB.
  assert.equal(row(run('video-bitrate-file-size-calculator', { video_kbps: 1000, audio_kbps: 0, hours: 0, minutes: 0, seconds: 8, overhead: 10 }), 'File size (decimal)'), '1.1 MB (0.001 GB)');
  // Reverse: 700 MB over 5400 s: 700e6*8/5400/1000 = 1037.037 kbps total; minus 128 audio = 909.037 video.
  const rev = run('video-bitrate-file-size-calculator', { audio_kbps: 128, hours: 1, minutes: 30, seconds: 0, target_mb: 700 });
  assert.match(row(rev, 'Video bitrate to hit the target'), /^909 kbps/);
  assert.equal(row(rev, 'Total bitrate (video + audio)'), '1,037 kbps');
});
test('video size invalid', () => {
  assert.ok(isBad(run('video-bitrate-file-size-calculator', { hours: 0, minutes: 0, seconds: 0 })));
  assert.ok(isBad(run('video-bitrate-file-size-calculator', { video_kbps: 0, audio_kbps: 0 })));
  assert.ok(isBad(run('video-bitrate-file-size-calculator', { audio_kbps: 1000, target_mb: 1, minutes: 10 })));
});
test('video size example', () => {
  const ex = VIRAL_CREATOR[0].content.example!;
  const r = run('video-bitrate-file-size-calculator');
  assert.equal(row(r, 'File size (decimal)'), '614.4 MB (0.614 GB)');
  assert.equal(row(r, 'File size (binary)'), '585.94 MiB (0.572 GiB)');
  for (const s of ['8,192 kbps', '1,024,000 bytes', '614.4 MB', '0.614 GB', '585.94 MiB', '0.572 GiB']) assert.ok(ex.includes(s), s);
});

// ---- BPM
// 120 BPM: quarter = 500 ms; 1/8 = 250; dotted 375; triplet 250*2/3 = 166.67.
test('bpm vectors', () => {
  assert.equal(noteMs(120, 4), 500);
  assert.equal(noteMs(120, 8), 250);
  assert.equal(noteMs(60, 1), 4000);          // 1000 ms quarter x 4
  assert.equal(noteMs(120, 64), 31.25);       // 500 x 4/64
  const r = run('bpm-delay-time-calculator', { bpm: 120 });
  assert.equal(row(r, '1/8 note'), '250 ms | dotted 375 ms | triplet 166.67 ms | 4 Hz');
  assert.equal(row(r, 'Common pre-delay values'), '1/64: 31.25 ms | 1/32: 62.5 ms');
  // 90 BPM: 60000/90 = 666.67; 1/16 = 166.67 ms.
  const r90 = run('bpm-delay-time-calculator', { bpm: 90 });
  assert.match(row(r90, '1/4 note'), /^666\.67 ms/);
  assert.match(row(r90, '1/16 note'), /^166\.67 ms/);
});
test('bpm invalid and example', () => {
  assert.ok(isBad(run('bpm-delay-time-calculator', { bpm: 0 })));
  assert.ok(isBad(run('bpm-delay-time-calculator', { bpm: 'abc' })));
  assert.ok(isBad(run('bpm-delay-time-calculator', { bpm: 5000 })));
  const ex = VIRAL_CREATOR[1].content.example!;
  const r = run('bpm-delay-time-calculator');
  assert.equal(row(r, '1/4 note').split(' ')[0], '500');
  for (const s of ['500 ms', '250 ms', '375 ms', '166.67 ms', '4 Hz', '31.25 ms', '62.5 ms']) assert.ok(ex.includes(s), s);
});

// ---- SMPTE
test('smpte reference vectors from spec', () => {
  assert.equal(fmtTc(framesToTc(1800, RATES['29.97df']), RATES['29.97df']), '00:01:00;02');
  assert.equal(fmtTc(framesToTc(17982, RATES['29.97df']), RATES['29.97df']), '00:10:00;00');
  assert.equal(fmtTc(framesToTc(1800, RATES['29.97ndf']), RATES['29.97ndf']), '00:01:00:00');
  assert.equal(fmtTc(framesToTc(90000, RATES['25']), RATES['25']), '01:00:00:00');
  // 59.94 DF drops 0-3: frame 3600 -> 3600 + 4 = 3604 = 60 s + 4 frames.
  assert.equal(fmtTc(framesToTc(3600, RATES['59.94df']), RATES['59.94df']), '00:01:00;04');
  // 1 h of 29.97 DF = 108000 - 2*(60 - 6) = 107892 frames.
  assert.equal(tcToFrames({ h: 1, m: 0, s: 0, f: 0 }, RATES['29.97df']), 107892);
  assert.equal(tcToFrames({ h: 1, m: 0, s: 0, f: 0 }, RATES['24']), 86400);
  // round trip across a range
  for (let f = 0; f < 120000; f += 7) {
    for (const k of ['29.97df', '59.94df', '25']) assert.equal(tcToFrames(framesToTc(f, RATES[k]), RATES[k]), f);
  }
});
test('smpte modes', () => {
  assert.equal(row(run('smpte-timecode-calculator', { mode: 'f2tc', rate: '29.97df', frames: 17982 }), 'Timecode'), '00:10:00;00');
  assert.equal(row(run('smpte-timecode-calculator', { mode: 'tc2f', rate: '25', tc1: '01:00:00:00' }), 'Total frames'), '90,000');
  // 00:30:00:00 + 00:30:00:00 at 24 fps = 1:00:00:00
  assert.equal(row(run('smpte-timecode-calculator', { mode: 'add', rate: '24', tc1: '00:30:00:00', tc2: '00:30:00:00' }), 'Sum as timecode'), '01:00:00:00');
  // 29.97 NDF: 108000 frames (1 h label) is 108000*1001/30000 = 3603.6 s real, +3.6 s.
  const nd = run('smpte-timecode-calculator', { mode: 'tc2f', rate: '29.97ndf', tc1: '01:00:00:00' });
  assert.equal(row(nd, 'Real time minus timecode label'), '+3.6 s');
  assert.equal(row(run('smpte-timecode-calculator', { mode: 'tc2f', rate: '25', tc1: '00:00:10:00' }), 'Real time minus timecode label'), 'none (integer frame rate)');
});
test('smpte invalid and example', () => {
  assert.ok(isBad(run('smpte-timecode-calculator', { mode: 'tc2f', rate: '29.97df', tc1: '00:01:00;00' })));
  assert.ok(isBad(run('smpte-timecode-calculator', { mode: 'tc2f', rate: '25', tc1: '00:00:00:25' })));
  assert.ok(isBad(run('smpte-timecode-calculator', { mode: 'tc2f', rate: '25', tc1: 'abc' })));
  assert.ok(isBad(run('smpte-timecode-calculator', { mode: 'f2tc', rate: '25', frames: -3 })));
  assert.ok(isBad(run('smpte-timecode-calculator', { mode: 'f2tc', rate: '25', frames: 1.5 })));
  const ex = VIRAL_CREATOR[2].content.example!;
  const r = run('smpte-timecode-calculator');
  assert.equal(row(r, 'Total frames'), '107,892');
  assert.equal(row(r, 'Real duration').split(' ')[0] + ' s', '3,599.996 s');
  assert.equal(row(r, 'Real time minus timecode label'), '-0.004 s');
  for (const s of ['107,892', '3,599.996', '0.004 s', '00:01:00;02', '00:10:00;00']) assert.ok(ex.includes(s), s);
});

// ---- crop factor
test('crop factor vectors', () => {
  // 36x24 -> sqrt(1296+576) = sqrt(1872) = 43.2666; crop 1.
  assert.ok(Math.abs(cropFactor(36, 24) - 1) < 1e-12);
  // 6x8 -> diagonal exactly 10; crop = 43.2666/10.
  assert.ok(Math.abs(cropFactor(6, 8) - 4.32666) < 1e-4);
  // MFT 17.3x13: sqrt(299.29+169)=21.640; 43.2666/21.640 = 1.9994.
  assert.equal(row(run('camera-crop-factor-calculator', { sensor: 'mft' }), 'Crop factor'), '2x');
  // Canon APS-C: sqrt(497.29+222.01)=26.8197 -> 1.6133
  assert.equal(row(run('camera-crop-factor-calculator', { sensor: 'apsc_canon' }), 'Crop factor'), '1.61x');
  // Custom 18x12 is half of full frame -> crop 2; 50 mm -> 100 mm, f/2 -> f/4, ISO 100 -> 400.
  const c = run('camera-crop-factor-calculator', { sensor: 'custom', width: 18, height: 12, focal: 50, aperture: 2, iso: 100 });
  assert.equal(row(c, 'Crop factor'), '2x');
  assert.equal(row(c, '35mm-equivalent focal length'), '100 mm');
  assert.equal(row(c, 'Equivalent aperture (depth of field)'), 'f/4');
  assert.equal(row(c, 'Equivalent ISO (same total light)'), 'ISO 400');
});
test('crop invalid and example', () => {
  assert.ok(isBad(run('camera-crop-factor-calculator', { sensor: 'custom', width: 0, height: 10 })));
  assert.ok(isBad(run('camera-crop-factor-calculator', { focal: 0 })));
  assert.ok(isBad(run('camera-crop-factor-calculator', { iso: 0 })));
  const ex = VIRAL_CREATOR[3].content.example!;
  const r = run('camera-crop-factor-calculator');
  assert.equal(row(r, 'Crop factor'), '1.53x');
  assert.equal(row(r, '35mm-equivalent focal length'), '76.7 mm');
  assert.equal(row(r, 'Equivalent aperture (depth of field)'), 'f/2.8');
  assert.equal(row(r, 'Equivalent ISO (same total light)'), 'ISO 235');
  for (const s of ['28.21 mm', '1.53', '76.7 mm', 'f/2.8', 'ISO 235']) assert.ok(ex.includes(s), s);
});

// ---- timelapse
test('timelapse vectors', () => {
  // 1 h = 3600 s / 10 s = 360 frames; /30 fps = 12 s; speed-up 300x.
  const a = run('timelapse-calculator', { ev_hours: 1, ev_min: 0, interval: 10, fps: 30 });
  assert.equal(row(a, 'Frames to shoot'), '360'); assert.equal(row(a, 'Clip length'), '12 s at 30 fps'); assert.equal(row(a, 'Speed-up factor'), '300x');
  // 90 min = 5400 s / 2 = 2700 frames; /25 = 108 s; 50x.
  const b = run('timelapse-calculator', { ev_hours: 1, ev_min: 30, interval: 2, fps: 25 });
  assert.equal(row(b, 'Frames to shoot'), '2,700'); assert.equal(row(b, 'Clip length'), '108 s at 25 fps'); assert.equal(row(b, 'Speed-up factor'), '50x');
  // Reverse: 3 h = 10800 s; 30 s x 24 fps = 720 frames; interval 15 s; 720 x 30 MB = 21.6 GB.
  const c = run('timelapse-calculator', { ev_hours: 3, ev_min: 0, fps: 24, clip_target: 30, file_mb: 30 });
  assert.equal(row(c, 'Required shooting interval'), '15 s'); assert.equal(row(c, 'Frames to shoot'), '720'); assert.equal(row(c, 'Storage'), '21.6 GB at 30 MB per frame');
  // Floor: 100 s at 30 s interval -> 3 frames.
  assert.equal(row(run('timelapse-calculator', { ev_hours: 0, ev_min: 100 / 60, interval: 30, fps: 24 }), 'Frames to shoot'), '3');
});
test('timelapse invalid and example', () => {
  assert.ok(isBad(run('timelapse-calculator', { ev_hours: 0, ev_min: 0 })));
  assert.ok(isBad(run('timelapse-calculator', { interval: 0 })));
  assert.ok(isBad(run('timelapse-calculator', { fps: 0 })));
  assert.ok(isBad(run('timelapse-calculator', { ev_hours: 0, ev_min: 1, interval: 120 })));
  const ex = VIRAL_CREATOR[4].content.example!;
  const r = run('timelapse-calculator');
  assert.equal(row(r, 'Frames to shoot'), '1,440'); assert.equal(row(r, 'Clip length'), '60 s at 24 fps');
  assert.equal(row(r, 'Speed-up factor'), '120x'); assert.equal(row(r, 'Storage'), '36 GB at 25 MB per frame');
  for (const s of ['7,200', '1,440', '60 s', '120x', '36 GB']) assert.ok(ex.includes(s), s);
});

// ---- YouTube
test('youtube vectors', () => {
  // 1,000,000 views at RPM 4, no growth, 1 month: 1000 x 4 = 4000.
  assert.equal(row(run('youtube-revenue-estimator', { views: 1e6, rpm: 4, growth: 0, months: 1 }), 'Estimated revenue, month 1'), '4,000');
  // Growth 100% for 3 months from 1000 views: 1000+2000+4000 = 7000 views; RPM 10 -> 70.
  const g = run('youtube-revenue-estimator', { views: 1000, rpm: 10, growth: 100, months: 3 });
  assert.equal(row(g, 'Total views over 3 months'), '7,000'); assert.equal(row(g, 'Total revenue over 3 months'), '70');
  assert.equal(row(g, 'Scenario: RPM x 0.5 (total)'), '35'); assert.equal(row(g, 'Scenario: RPM x 1.5 (total)'), '105');
  // Flat 12 months: 100000 x 12 / 1000 x 2 = 2400.
  assert.equal(row(run('youtube-revenue-estimator', { growth: 0 }), 'Total revenue over 12 months'), '2,400');
  assert.equal(project(1000, 100, 3).totalViews, 7000);
});
test('youtube invalid and example', () => {
  assert.ok(isBad(run('youtube-revenue-estimator', { views: 0 })));
  assert.ok(isBad(run('youtube-revenue-estimator', { rpm: 0 })));
  assert.ok(isBad(run('youtube-revenue-estimator', { months: 0 })));
  assert.ok(isBad(run('youtube-revenue-estimator', { months: 100 })));
  const ex = VIRAL_CREATOR[5].content.example!;
  const r = run('youtube-revenue-estimator');
  assert.equal(row(r, 'Estimated revenue, month 1'), '200');
  assert.equal(row(r, 'Total views over 12 months'), '1,591,713'); assert.equal(row(r, 'Total revenue over 12 months'), '3,183.43');
  assert.equal(row(r, 'Scenario: RPM x 0.5 (total)'), '1,591.71'); assert.equal(row(r, 'Scenario: RPM x 1.5 (total)'), '4,775.14');
  for (const s of ['200', '1,591,713', '3,183.43', '1,591.71', '4,775.14']) assert.ok(ex.includes(s), s);
});
