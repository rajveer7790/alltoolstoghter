import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];

/** Parse a list of numbers separated by commas, semicolons or whitespace. Returns null if any token is not a finite number. */
export function parseNumberList(s: unknown): number[] | null {
  const toks = String(s ?? '').split(/[\s,;]+/).filter(t => t.length > 0);
  const out: number[] = [];
  for (const t of toks) {
    const n = Number(t);
    if (!Number.isFinite(n)) return null;
    out.push(n);
  }
  return out;
}

/* ───────────── 1. LLM tokens/s + TTFT roofline ───────────── */
export function llmRoofline(v: Record<string, any>): CalcResult[] {
  const params = safe(v.params), bytes = safe(v.bytes), bw = safe(v.bandwidth), tflops = safe(v.tflops);
  const prompt = safe(v.prompt, 0), eff = safe(v.efficiency), util = safe(v.utilisation), kv = safe(v.kv, 0);
  if (!(params > 0)) return bad('Parameters read per token must be greater than 0 (billions).');
  if (!(bytes > 0)) return bad('Bytes per parameter must be greater than 0.');
  if (!(bw > 0)) return bad('Memory bandwidth must be greater than 0 GB/s.');
  if (!(tflops > 0)) return bad('Peak compute must be greater than 0 TFLOPS.');
  if (!(eff > 0 && eff <= 100)) return bad('Bandwidth efficiency must be between 0 and 100%.');
  if (!(util > 0 && util <= 100)) return bad('Compute utilisation must be between 0 and 100%.');
  if (!(prompt >= 1)) return bad('Prompt length must be at least 1 token.');
  const weightsGB = params * bytes; // 1e9 params * bytes / 1e9 bytes per GB
  const readGB = weightsGB + kv;
  const tokS = (bw * eff / 100) / readGB;
  const msTok = 1000 / tokS;
  const flops = 2 * params * 1e9 * prompt;
  const ttftMs = flops / (tflops * 1e12 * util / 100) * 1000;
  return [
    { label: 'Weights read per token', value: `${num(weightsGB, 2)} GB` },
    { label: 'Total bytes read per token (weights + KV)', value: `${num(readGB, 2)} GB` },
    { label: 'Decode upper bound', value: `${num(tokS, 2)} tokens/s`, main: true },
    { label: 'Decode time per token (lower bound)', value: `${num(msTok, 2)} ms` },
    { label: 'Prefill compute (2 × params × prompt)', value: `${num(flops / 1e12, 2)} TFLOP` },
    { label: 'Prefill TTFT lower bound', value: `${num(ttftMs, 1)} ms` },
    { label: 'Note', value: 'Theoretical bounds; real throughput is lower.' },
  ];
}

/* ───────────── 2. LoRA trainable parameters ───────────── */
export function loraParams(v: Record<string, any>): CalcResult[] {
  const h = Math.round(safe(v.hidden)), L = Math.round(safe(v.layers)), r = Math.round(safe(v.rank));
  const alpha = safe(v.alpha), base = safe(v.baseParams), preset = String(v.modules ?? 'qv');
  const inter = Math.round(safe(v.inter));
  if (!(h >= 1)) return bad('Hidden size must be at least 1.');
  if (!(L >= 1)) return bad('Number of layers must be at least 1.');
  if (!(r >= 1)) return bad('Rank r must be at least 1.');
  if (!(alpha > 0)) return bad('Alpha must be greater than 0.');
  if (!(base > 0)) return bad('Base model size must be greater than 0 (billions).');
  if (preset === 'all' && !(inter >= 1)) return bad('Intermediate (MLP) size must be at least 1 for the all-linear preset.');
  let perLayer: number;
  if (preset === 'qv') perLayer = 2 * r * (h + h);
  else if (preset === 'qkvo') perLayer = 4 * r * (h + h);
  else if (preset === 'all') perLayer = 4 * r * (h + h) + 3 * r * (h + inter);
  else return bad('Unknown module preset.');
  const total = perLayer * L;
  const pctBase = total / (base * 1e9) * 100;
  return [
    { label: 'Trainable LoRA parameters', value: int(total), main: true },
    { label: 'Per layer', value: int(perLayer) },
    { label: '% of base model parameters', value: `${num(pctBase, 4)}%` },
    { label: 'Scaling factor α / r', value: num(alpha / r, 4) },
    { label: 'rsLoRA scaling α / √r (for comparison)', value: num(alpha / Math.sqrt(r), 4) },
    { label: 'Adapter size at fp16', value: `${num(total * 2 / 1e6, 2)} MB` },
    { label: 'Adapter size at fp32', value: `${num(total * 4 / 1e6, 2)} MB` },
  ];
}

/* ───────────── 3. Softmax temperature / top-k / top-p ───────────── */
export function softmax(z: number[], T: number): number[] {
  const s = z.map(x => x / T);
  const m = Math.max(...s);
  const e = s.map(x => Math.exp(x - m));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map(x => x / sum);
}
export function entropyBits(p: number[]): number {
  let h = 0;
  for (const x of p) if (x > 0) h -= x * Math.log2(x);
  return h;
}
/** Returns truncated, renormalised probabilities (same order as input). Top-k first, then nucleus on the renormalised distribution. */
export function truncate(p: number[], topK: number, topP: number): number[] {
  const order = p.map((x, i) => i).sort((a, b) => p[b] - p[a] || a - b);
  let keep = order.slice(0, topK > 0 ? Math.min(topK, order.length) : order.length);
  let tot = keep.reduce((a, i) => a + p[i], 0);
  if (topP < 1) {
    let cum = 0; const kept: number[] = [];
    for (const i of keep) {
      kept.push(i); cum += p[i] / tot;
      if (cum >= topP - 1e-12) break;
    }
    keep = kept; tot = keep.reduce((a, i) => a + p[i], 0);
  }
  const out = p.map(() => 0);
  for (const i of keep) out[i] = p[i] / tot;
  return out;
}
export function softmaxSampling(v: Record<string, any>): CalcResult[] {
  const z = parseNumberList(v.logits);
  const T = safe(v.temperature), k = Math.round(safe(v.topk)), topP = safe(v.topp);
  if (!z) return bad('Logits must be numbers separated by commas or spaces.');
  if (z.length < 2 || z.length > 50) return bad('Enter between 2 and 50 logits.');
  if (z.some(x => Math.abs(x) > 1e6)) return bad('Logits must be between -1,000,000 and 1,000,000.');
  if (!(T > 0)) return bad('Temperature must be greater than 0.');
  if (T < 1e-3) return bad('Temperature below 0.001 is treated as greedy decoding; use a value of at least 0.001.');
  if (!(k >= 0)) return bad('Top-k must be 0 (off) or a positive integer.');
  if (!(topP > 0 && topP <= 1)) return bad('Top-p must be greater than 0 and at most 1 (1 = off).');
  const p = softmax(z, T);
  const q = truncate(p, k, topP);
  const order = p.map((x, i) => i).sort((a, b) => p[b] - p[a] || a - b);
  const kept = q.filter(x => x > 0).length;
  const rows: CalcResult[] = [{ label: 'Candidates kept', value: `${kept} of ${z.length}`, main: true }];
  order.slice(0, 5).forEach((i, rank) => {
    rows.push({ label: `#${rank + 1}: token ${i + 1} (logit ${num(z[i], 3)})`, value: `${num(p[i] * 100, 2)}% → ${num(q[i] * 100, 2)}%` });
  });
  rows.push({ label: 'Entropy before → after truncation', value: `${num(entropyBits(p), 3)} → ${num(entropyBits(q), 3)} bits` });
  rows.push({ label: 'Mass kept before renormalising', value: `${num(order.filter(i => q[i] > 0).reduce((a, i) => a + p[i], 0) * 100, 2)}%` });
  return rows.slice(0, 8);
}

/* ───────────── 4. Confusion matrix metrics ───────────── */
export function classificationMetrics(v: Record<string, any>): CalcResult[] {
  const raw = [v.tp, v.fp, v.fn, v.tn].map(x => Number(String(x ?? '').trim() === '' ? NaN : x));
  if (raw.some(x => !Number.isFinite(x) || x < 0)) return bad('TP, FP, FN and TN must be non-negative numbers.');
  const [TP, FP, FN, TN] = raw;
  const beta = safe(v.beta, 0, 1e6);
  if (!(beta > 0)) return bad('Beta must be greater than 0.');
  const N = TP + FP + FN + TN;
  if (!(N > 0)) return bad('At least one count must be greater than 0.');
  if (!Number.isFinite(N)) return bad('Counts are too large.');
  const ratio = (a: number, b: number) => (b > 0 ? a / b : null);
  const P = ratio(TP, TP + FP), R = ratio(TP, TP + FN), S = ratio(TN, TN + FP);
  const b2 = beta * beta;
  const fDen = (1 + b2) * TP + b2 * FN + FP;
  const F = fDen > 0 ? (1 + b2) * TP / fDen : null;
  const bal = R !== null && S !== null ? (R + S) / 2 : null;
  const mccDen = Math.sqrt(TP + FP) * Math.sqrt(TP + FN) * Math.sqrt(TN + FP) * Math.sqrt(TN + FN);
  const mcc = mccDen > 0 ? (TP * TN - FP * FN) / mccDen : null;
  const p = (x: number | null) => (x === null ? 'n/a' : `${num(x * 100, 2)}%`);
  const d = (x: number | null) => (x === null ? 'n/a' : num(x, 4));
  return [
    { label: 'Accuracy', value: p((TP + TN) / N) },
    { label: 'Precision', value: p(P) },
    { label: 'Recall (sensitivity)', value: p(R) },
    { label: 'Specificity', value: p(S) },
    { label: beta === 1 ? 'F1 score' : `F-beta score (β = ${num(beta, 3)})`, value: d(F), main: true },
    { label: 'Balanced accuracy', value: p(bal) },
    { label: 'Matthews correlation (MCC)', value: d(mcc) },
    { label: 'Prevalence', value: p((TP + FN) / N) },
  ];
}

/* ───────────── 5. WER / CER ───────────── */
export function normaliseText(s: string, mode: string): string {
  let t = s;
  if (mode === 'norm') t = t.toLowerCase().replace(/[^\p{L}\p{N}\s']+/gu, ' ');
  return t.trim().split(/\s+/).filter(Boolean).join(' ');
}
export interface Align { S: number; D: number; I: number; H: number; dist: number; }
export function alignWords(ref: string[], hyp: string[]): Align {
  const n = ref.length, m = hyp.length, w = m + 1;
  const d = new Uint16Array((n + 1) * w);
  for (let i = 0; i <= n; i++) d[i * w] = i;
  for (let j = 0; j <= m; j++) d[j] = j;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const c = d[(i - 1) * w + j - 1] + (ref[i - 1] === hyp[j - 1] ? 0 : 1);
    d[i * w + j] = Math.min(c, d[(i - 1) * w + j] + 1, d[i * w + j - 1] + 1);
  }
  let i = n, j = m, S = 0, D = 0, I = 0, H = 0;
  while (i > 0 || j > 0) {
    const cur = d[i * w + j];
    if (i > 0 && j > 0 && ref[i - 1] === hyp[j - 1] && cur === d[(i - 1) * w + j - 1]) { H++; i--; j--; }
    else if (i > 0 && j > 0 && cur === d[(i - 1) * w + j - 1] + 1) { S++; i--; j--; }
    else if (i > 0 && cur === d[(i - 1) * w + j] + 1) { D++; i--; }
    else { I++; j--; }
  }
  return { S, D, I, H, dist: d[n * w + m] };
}
export function editDistance(a: string, b: string): number {
  const A = Array.from(a), B = Array.from(b);
  let prev = Array.from({ length: B.length + 1 }, (_, j) => j);
  for (let i = 1; i <= A.length; i++) {
    const cur = [i];
    for (let j = 1; j <= B.length; j++)
      cur[j] = Math.min(prev[j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1), prev[j] + 1, cur[j - 1] + 1);
    prev = cur;
  }
  return prev[B.length];
}
export function werCer(v: Record<string, any>): CalcResult[] {
  const mode = String(v.normalise ?? 'norm');
  const ref = normaliseText(String(v.reference ?? ''), mode), hyp = normaliseText(String(v.hypothesis ?? ''), mode);
  if (ref.length > 8000 || hyp.length > 8000) return bad('Each text is limited to 8,000 characters.');
  if (ref === '') return bad('The reference text is empty, so the word error rate (errors / reference words) is undefined.');
  const rw = ref.split(' '), hw = hyp === '' ? [] : hyp.split(' ');
  const a = alignWords(rw, hw);
  const N = rw.length;
  const wer = (a.S + a.D + a.I) / N;
  const cer = editDistance(ref, hyp) / Array.from(ref).length;
  return [
    { label: 'Word error rate (WER)', value: `${num(wer * 100, 2)}%`, main: true },
    { label: 'Substitutions (S)', value: int(a.S) },
    { label: 'Deletions (D)', value: int(a.D) },
    { label: 'Insertions (I)', value: int(a.I) },
    { label: 'Reference words (N)', value: int(N) },
    { label: 'Character error rate (CER)', value: `${num(cer * 100, 2)}%` },
    { label: 'Accuracy (1 − WER)', value: `${num((1 - wer) * 100, 2)}%` },
  ];
}

/* ───────────── 6. Vector similarity ───────────── */
export function vectorSimilarity(v: Record<string, any>): CalcResult[] {
  const a = parseNumberList(v.a), b = parseNumberList(v.b);
  if (!a || !b) return bad('Vectors must contain only numbers separated by commas or spaces.');
  if (a.length < 1 || b.length < 1) return bad('Both vectors need at least one number.');
  if (a.length !== b.length) return bad(`Vectors must have equal length (A has ${a.length}, B has ${b.length}).`);
  if (a.length > 4096) return bad('Vectors are limited to 4,096 dimensions.');
  if ([...a, ...b].some(x => Math.abs(x) > 1e100)) return bad('Values must be between -1e100 and 1e100.');
  let dot = 0, na = 0, nb = 0, l2 = 0, l1 = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i];
    l2 += (a[i] - b[i]) ** 2; l1 += Math.abs(a[i] - b[i]);
  }
  const normA = Math.sqrt(na), normB = Math.sqrt(nb), dist = Math.sqrt(l2);
  const hasCos = normA > 0 && normB > 0;
  const cos = hasCos ? Math.min(1, Math.max(-1, dot / (normA * normB))) : 0;
  const unit = (x: number) => Math.abs(x - 1) < 1e-6;
  return [
    { label: 'Cosine similarity', value: hasCos ? num(cos, 6) : 'n/a (zero vector)', main: true },
    { label: 'Cosine distance (1 − cos)', value: hasCos ? num(1 - cos, 6) : 'n/a (zero vector)' },
    { label: 'Dot product', value: num(dot, 6) },
    { label: 'Euclidean (L2) distance', value: num(dist, 6) },
    { label: 'Manhattan (L1) distance', value: num(l1, 6) },
    { label: 'Norms ‖A‖₂ / ‖B‖₂', value: `${num(normA, 6)} / ${num(normB, 6)}` },
    { label: 'Angle between vectors', value: hasCos ? `${num(Math.acos(cos) * 180 / Math.PI, 4)}°` : 'n/a (zero vector)' },
    { label: 'Unit-normalised?', value: `A: ${unit(normA) ? 'yes' : 'no'}, B: ${unit(normB) ? 'yes' : 'no'}` },
  ];
}

export const COMPUTES_AI2: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'llm-tokens-per-second-estimator': llmRoofline,
  'lora-trainable-parameters-calculator': loraParams,
  'softmax-temperature-calculator': softmaxSampling,
  'classification-metrics-calculator': classificationMetrics,
  'word-error-rate-calculator': werCer,
  'vector-similarity-calculator': vectorSimilarity,
};
