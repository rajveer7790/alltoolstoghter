import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (why: string): CalcResult[] => [{ label: 'Check inputs', value: why, main: true }];
const fin = (n: number) => Number.isFinite(n);
const pad = (n: number, w = 2) => String(Math.trunc(n)).padStart(w, '0');

/* ------------------------------------------------------------------ */
/* 1. Video file size / bitrate                                        */
/* ------------------------------------------------------------------ */

/** Size in bytes for a given total bitrate (decimal kilobits per second). */
export function videoBytes(totalKbps: number, seconds: number, overheadPct = 0): number {
  return (totalKbps * 1000 / 8) * seconds * (1 + overheadPct / 100);
}

export function videoFileSize(v: Record<string, any>): CalcResult[] {
  const vk = safe(v.video_kbps, 0, 1e7), ak = safe(v.audio_kbps, 0, 1e6);
  const h = safe(v.hours, 0, 10000), m = safe(v.minutes, 0, 600000), s = safe(v.seconds, 0, 3.6e7);
  const ov = safe(v.overhead, 0, 100), target = safe(v.target_mb, 0, 1e9);
  const dur = h * 3600 + m * 60 + s;
  if (!(dur > 0)) return bad('Enter a duration greater than 0 (hours, minutes or seconds).');
  if (vk < 0 || ak < 0) return bad('Bitrates cannot be negative.');
  const durTxt = `${int(Math.floor(dur / 3600))}:${pad(Math.floor((dur % 3600) / 60))}:${pad(dur % 60)}`;

  if (target > 0) {
    // Reverse mode: choose the bitrate that fills the target size.
    const totalKbps = (target * 1e6 * 8) / dur / 1000 / (1 + ov / 100);
    const videoKbps = totalKbps - ak;
    if (!(videoKbps > 0)) return bad(`The target size is too small for ${num(ak)} kbps of audio over ${durTxt}; raise the target or lower audio.`);
    return [
      { label: 'Video bitrate to hit the target', value: `${num(videoKbps, 1)} kbps (${num(videoKbps / 1000, 2)} Mbps)`, main: true },
      { label: 'Total bitrate (video + audio)', value: `${num(totalKbps, 1)} kbps` },
      { label: 'Audio bitrate used', value: `${num(ak)} kbps` },
      { label: 'Target size', value: `${num(target, 2)} MB (${num(target * 1e6 / 1048576, 2)} MiB)` },
      { label: 'Duration', value: durTxt },
      { label: 'Container overhead assumed', value: `${num(ov)}%` },
    ];
  }

  const totalKbps = vk + ak;
  if (!(totalKbps > 0)) return bad('Enter a video or audio bitrate greater than 0.');
  const bytes = videoBytes(totalKbps, dur, ov);
  if (!fin(bytes)) return bad('Values are too large to calculate.');
  return [
    { label: 'File size (decimal)', value: `${num(bytes / 1e6, 2)} MB (${num(bytes / 1e9, 3)} GB)`, main: true },
    { label: 'File size (binary)', value: `${num(bytes / 1048576, 2)} MiB (${num(bytes / 1073741824, 3)} GiB)` },
    { label: 'Total bitrate', value: `${num(totalKbps, 1)} kbps (${num(totalKbps / 1000, 3)} Mbps)` },
    { label: 'Duration', value: `${durTxt} (${int(dur)} s)` },
    { label: 'Per minute', value: `${num(bytes / dur * 60 / 1e6, 2)} MB` },
    { label: 'Per hour', value: `${num(bytes / dur * 3600 / 1e9, 3)} GB` },
    { label: 'Container overhead assumed', value: `${num(ov)}%` },
  ];
}

/* ------------------------------------------------------------------ */
/* 2. BPM to delay time                                                */
/* ------------------------------------------------------------------ */

/** Straight note length in ms for a 1/div note at the given BPM (quarter-note beat). */
export function noteMs(bpm: number, div: number): number {
  return (60000 / bpm) * (4 / div);
}

export function bpmDelay(v: Record<string, any>): CalcResult[] {
  const bpm = safe(v.bpm, 0, 1e6);
  if (!(bpm >= 1 && bpm <= 999)) return bad('Enter a tempo between 1 and 999 BPM.');
  const rows: CalcResult[] = [];
  for (const div of [1, 2, 4, 8, 16, 32]) {
    const ms = noteMs(bpm, div);
    rows.push({
      label: `1/${div} note`,
      value: `${num(ms)} ms | dotted ${num(ms * 1.5)} ms | triplet ${num(ms * 2 / 3)} ms | ${num(1000 / ms, 3)} Hz`,
      main: div === 4,
    });
  }
  rows.push({ label: 'Common pre-delay values', value: `1/64: ${num(noteMs(bpm, 64))} ms | 1/32: ${num(noteMs(bpm, 32))} ms` });
  return rows;
}

/* ------------------------------------------------------------------ */
/* 3. SMPTE timecode                                                   */
/* ------------------------------------------------------------------ */

export interface Rate { nominal: number; drop: number; num: number; den: number; label: string; }
export const RATES: Record<string, Rate> = {
  '23.976': { nominal: 24, drop: 0, num: 24000, den: 1001, label: '23.976 fps' },
  '24': { nominal: 24, drop: 0, num: 24, den: 1, label: '24 fps' },
  '25': { nominal: 25, drop: 0, num: 25, den: 1, label: '25 fps' },
  '29.97ndf': { nominal: 30, drop: 0, num: 30000, den: 1001, label: '29.97 fps non-drop' },
  '29.97df': { nominal: 30, drop: 2, num: 30000, den: 1001, label: '29.97 fps drop-frame' },
  '30': { nominal: 30, drop: 0, num: 30, den: 1, label: '30 fps' },
  '50': { nominal: 50, drop: 0, num: 50, den: 1, label: '50 fps' },
  '59.94df': { nominal: 60, drop: 4, num: 60000, den: 1001, label: '59.94 fps drop-frame' },
  '60': { nominal: 60, drop: 0, num: 60, den: 1, label: '60 fps' },
};

export interface TC { h: number; m: number; s: number; f: number; }

/** Timecode fields -> frame count (0-based frame number). */
export function tcToFrames(tc: TC, r: Rate): number {
  const totalMinutes = 60 * tc.h + tc.m;
  const n = r.nominal;
  return n * 3600 * tc.h + n * 60 * tc.m + n * tc.s + tc.f - r.drop * (totalMinutes - Math.floor(totalMinutes / 10));
}

/** Frame count -> timecode fields (standard drop-frame algorithm). */
export function framesToTc(frames: number, r: Rate): TC {
  let f = frames;
  if (r.drop > 0) {
    const perMin = r.nominal * 60 - r.drop;          // 1798 for 29.97
    const per10 = r.nominal * 600 - 9 * r.drop;      // 17982 for 29.97
    const D = Math.floor(f / per10), M = f % per10;
    f += 9 * r.drop * D + (M < r.drop ? 0 : r.drop * Math.floor((M - r.drop) / perMin));
  }
  const n = r.nominal;
  return { f: f % n, s: Math.floor(f / n) % 60, m: Math.floor(f / (n * 60)) % 60, h: Math.floor(f / (n * 3600)) };
}

export function fmtTc(tc: TC, r: Rate): string {
  return `${pad(tc.h)}:${pad(tc.m)}:${pad(tc.s)}${r.drop > 0 ? ';' : ':'}${pad(tc.f)}`;
}

/** Parse "HH:MM:SS:FF" (separators : ; . or ,). Returns an error string when invalid. */
export function parseTc(text: unknown, r: Rate): TC | string {
  const parts = String(text ?? '').trim().split(/[:;.,]/);
  if (parts.length !== 4 || parts.some(p => !/^\d{1,3}$/.test(p.trim()))) return 'Timecode must look like HH:MM:SS:FF (for example 01:00:00:00).';
  const [h, m, s, f] = parts.map(p => parseInt(p, 10));
  if (m > 59 || s > 59) return 'Minutes and seconds must be 0-59.';
  if (f >= r.nominal) return `Frames must be 0-${r.nominal - 1} at ${r.label}.`;
  if (r.drop > 0 && s === 0 && m % 10 !== 0 && f < r.drop) return `${pad(h)}:${pad(m)}:00;${pad(f)} does not exist in drop-frame (frame numbers 0-${r.drop - 1} are skipped at the start of every minute except every 10th).`;
  return { h, m, s, f };
}

const secToClock = (sec: number) => {
  const ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms % 1000, 3)}`;
};

export function smpteTimecode(v: Record<string, any>): CalcResult[] {
  const r = RATES[String(v.rate)];
  if (!r) return bad('Choose a frame rate.');
  const mode = String(v.mode);
  let frames: number;
  let tcText: string;
  if (mode === 'tc2f') {
    const tc = parseTc(v.tc1, r);
    if (typeof tc === 'string') return bad(tc);
    frames = tcToFrames(tc, r); tcText = fmtTc(tc, r);
  } else if (mode === 'f2tc') {
    const raw = parseFloat(String(v.frames ?? ''));
    if (!Number.isFinite(raw) || raw < 0 || raw !== Math.floor(raw) || raw > 1e8) return bad('Frames must be a whole number from 0 to 100,000,000.');
    frames = raw; tcText = fmtTc(framesToTc(frames, r), r);
  } else if (mode === 'add') {
    const a = parseTc(v.tc1, r), b = parseTc(v.tc2, r);
    if (typeof a === 'string') return bad('Timecode A: ' + a);
    if (typeof b === 'string') return bad('Timecode B: ' + b);
    frames = tcToFrames(a, r) + tcToFrames(b, r);
    if (frames > 1e8) return bad('The sum is too large.');
    tcText = fmtTc(framesToTc(frames, r), r);
  } else return bad('Choose a mode.');

  const fps = r.num / r.den;
  const real = frames / fps;
  const t = framesToTc(frames, r);
  const labelSec = t.h * 3600 + t.m * 60 + t.s + t.f / r.nominal;
  const drift = real - labelSec;
  const driftTxt = r.den === 1 ? 'none (integer frame rate)' : `${drift >= 0 ? '+' : ''}${num(drift, 3)} s`;
  const rows: CalcResult[] = [
    mode === 'tc2f'
      ? { label: 'Total frames', value: int(frames), main: true }
      : { label: mode === 'add' ? 'Sum as timecode' : 'Timecode', value: tcText, main: true },
    mode === 'tc2f' ? { label: 'Timecode', value: tcText } : { label: 'Total frames', value: int(frames) },
    { label: 'Real duration', value: `${num(real, 3)} s (${secToClock(real)})` },
    { label: 'Actual frame rate', value: `${num(fps, 3)} fps (${r.num}/${r.den})` },
    { label: 'Real time minus timecode label', value: driftTxt },
  ];
  return rows;
}

/* ------------------------------------------------------------------ */
/* 4. Camera crop factor                                               */
/* ------------------------------------------------------------------ */

export const FF_DIAG = Math.hypot(36, 24); // 43.2666 mm
export function cropFactor(w: number, h: number): number { return FF_DIAG / Math.hypot(w, h); }

export const SENSORS: Record<string, { w: number; h: number; label: string }> = {
  ff: { w: 36, h: 24, label: 'Full frame 36 x 24 mm' },
  apsc_sony: { w: 23.5, h: 15.6, label: 'APS-C (Sony/Nikon/Fuji) 23.5 x 15.6 mm' },
  apsc_canon: { w: 22.3, h: 14.9, label: 'APS-C (Canon) 22.3 x 14.9 mm' },
  mft: { w: 17.3, h: 13, label: 'Micro Four Thirds 17.3 x 13 mm' },
  inch1: { w: 13.2, h: 8.8, label: '1-inch type 13.2 x 8.8 mm' },
};

export function cameraCrop(v: Record<string, any>): CalcResult[] {
  const key = String(v.sensor);
  let w: number, h: number, name: string;
  if (key === 'custom') {
    w = safe(v.width, 0, 1e4); h = safe(v.height, 0, 1e4);
    if (!(w > 0.5 && h > 0.5)) return bad('Enter a custom sensor width and height in mm (each at least 0.5).');
    name = `Custom ${num(w, 2)} x ${num(h, 2)} mm`;
  } else {
    const s = SENSORS[key];
    if (!s) return bad('Choose a sensor size.');
    w = s.w; h = s.h; name = s.label;
  }
  const f = safe(v.focal, 0, 1e5), n = safe(v.aperture, 0, 1e3), iso = safe(v.iso, 0, 1e7);
  if (!(f > 0)) return bad('Enter a focal length greater than 0 mm.');
  if (!(n >= 0.5)) return bad('Enter an f-number of at least 0.5.');
  if (!(iso > 0)) return bad('Enter an ISO greater than 0.');
  const c = cropFactor(w, h);
  return [
    { label: 'Crop factor', value: `${num(c, 2)}x`, main: true },
    { label: 'Sensor', value: `${name}, diagonal ${num(Math.hypot(w, h), 2)} mm` },
    { label: '35mm-equivalent focal length', value: `${num(f * c, 1)} mm` },
    { label: 'Equivalent aperture (depth of field)', value: `f/${num(n * c, 1)}` },
    { label: 'Equivalent ISO (same total light)', value: `ISO ${num(iso * c * c, 0)}` },
    { label: 'Note', value: 'Equivalence is an approximation of framing, depth of field and noise; it does not change the lens or the exposure.' },
  ];
}

/* ------------------------------------------------------------------ */
/* 5. Timelapse                                                        */
/* ------------------------------------------------------------------ */

export function timelapse(v: Record<string, any>): CalcResult[] {
  const dur = safe(v.ev_hours, 0, 1e5) * 3600 + safe(v.ev_min, 0, 1e7) * 60;
  const interval = safe(v.interval, 0, 1e7), fps = safe(v.fps, 0, 1000);
  const target = safe(v.clip_target, 0, 1e6), mb = safe(v.file_mb, 0, 1e5);
  if (!(dur > 0)) return bad('Enter an event duration greater than 0 (hours and/or minutes).');
  if (!(fps > 0)) return bad('Enter a playback frame rate greater than 0.');
  const durTxt = `${int(Math.floor(dur / 3600))} h ${int(Math.round((dur % 3600) / 60))} min`;

  if (target > 0) {
    const frames = Math.round(target * fps);
    if (frames < 1) return bad('The target clip is shorter than one frame.');
    const req = dur / frames;
    return [
      { label: 'Required shooting interval', value: `${num(req, 2)} s`, main: true },
      { label: 'Frames to shoot', value: int(frames) },
      { label: 'Clip length', value: `${num(frames / fps, 2)} s at ${num(fps)} fps` },
      { label: 'Speed-up factor', value: `${num(dur / (frames / fps), 1)}x` },
      { label: 'Storage', value: `${num(frames * mb / 1000, 2)} GB at ${num(mb)} MB per frame` },
      { label: 'Shutter for a 180-degree look', value: `${num(req / 2, 2)} s (interval / 2, rule of thumb)` },
    ];
  }

  if (!(interval > 0)) return bad('Enter a shooting interval greater than 0 seconds, or a target clip length.');
  const frames = Math.floor(dur / interval + 1e-9);
  if (frames < 1) return bad(`The interval (${num(interval)} s) is longer than the event (${durTxt}); no frames would be shot.`);
  const clip = frames / fps;
  return [
    { label: 'Clip length', value: `${num(clip, 2)} s at ${num(fps)} fps`, main: true },
    { label: 'Frames to shoot', value: int(frames) },
    { label: 'Speed-up factor', value: `${num(dur / clip, 1)}x` },
    { label: 'Event duration', value: durTxt },
    { label: 'Storage', value: `${num(frames * mb / 1000, 2)} GB at ${num(mb)} MB per frame` },
    { label: 'Shutter for a 180-degree look', value: `${num(interval / 2, 2)} s (interval / 2, rule of thumb)` },
  ];
}

/* ------------------------------------------------------------------ */
/* 6. YouTube revenue estimator                                        */
/* ------------------------------------------------------------------ */

export interface Projection { monthlyViews: number[]; totalViews: number; }
export function project(views: number, growthPct: number, months: number): Projection {
  const monthlyViews: number[] = [];
  let totalViews = 0;
  for (let i = 0; i < months; i++) {
    const mv = views * Math.pow(1 + growthPct / 100, i);
    monthlyViews.push(mv); totalViews += mv;
  }
  return { monthlyViews, totalViews };
}

export function youtubeRevenue(v: Record<string, any>): CalcResult[] {
  const views = safe(v.views, 0, 1e12), rpm = safe(v.rpm, 0, 1e4);
  const g = safe(v.growth, -90, 100), months = Math.floor(safe(v.months, 0, 1e3));
  if (!(views > 0)) return bad('Enter monthly views greater than 0.');
  if (!(rpm > 0)) return bad('Enter an RPM (revenue per 1,000 views) greater than 0.');
  if (!(months >= 1 && months <= 60)) return bad('Enter a number of months from 1 to 60.');
  if (g < -90 || g > 100) return bad('Monthly growth must be between -90% and 100%.');
  const p = project(views, g, months);
  const last = p.monthlyViews[months - 1];
  const rev = (x: number) => (x / 1000) * rpm;
  return [
    { label: 'Estimated revenue, month 1', value: num(rev(views), 2), main: true },
    { label: `Estimated views, month ${months}`, value: int(last) },
    { label: `Estimated revenue, month ${months}`, value: num(rev(last), 2) },
    { label: `Total views over ${months} months`, value: int(p.totalViews) },
    { label: `Total revenue over ${months} months`, value: num(rev(p.totalViews), 2) },
    { label: 'Scenario: RPM x 0.5 (total)', value: num(rev(p.totalViews) * 0.5, 2) },
    { label: 'Scenario: RPM x 1.5 (total)', value: num(rev(p.totalViews) * 1.5, 2) },
    { label: 'Currency', value: 'Same as the RPM you entered' },
  ];
}

export const COMPUTES_CREATOR: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'video-bitrate-file-size-calculator': videoFileSize,
  'bpm-delay-time-calculator': bpmDelay,
  'smpte-timecode-calculator': smpteTimecode,
  'camera-crop-factor-calculator': cameraCrop,
  'timelapse-calculator': timelapse,
  'youtube-revenue-estimator': youtubeRevenue,
};
