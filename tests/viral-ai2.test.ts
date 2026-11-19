import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_AI2 as C, softmax, truncate, entropyBits, alignWords, editDistance } from '../lib/calc/viral/ai2';
import { VIRAL_AI2 } from '../lib/registry/viralAi2';

const run = (slug: string, v: Record<string, any>) => C[slug](v);
const val = (r: { label: string; value: string }[], label: string) => {
  const row = r.find(x => x.label === label);
  assert.ok(row, `missing row ${label}`);
  return row!.value;
};
const tool = (slug: string) => VIRAL_AI2.find(t => t.slug === slug)!;
const defaults = (slug: string) => Object.fromEntries((tool(slug).fields ?? []).map(f => [f.key, String(f.def)]));
const isCheck = (r: { label: string }[]) => r.length === 1 && r[0].label === 'Check inputs';

test('registry shape and content rules', () => {
  assert.equal(VIRAL_AI2.length, 6);
  for (const t of VIRAL_AI2) {
    assert.ok(C[t.slug], t.slug);
    assert.ok(t.name.length <= 60, t.name);
    assert.ok(t.short.length <= 110, t.short);
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, `${t.slug} meta ${t.metaDescription!.length}`);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]), `${t.slug} primary keyword in meta`);
    assert.ok(t.content.intro.split(/\s+/).length >= 35);
    assert.equal(t.content.howSteps!.length, 3);
    assert.ok(t.content.faqs.length >= 4);
    assert.ok(t.related.length <= 4);
    for (const f of t.fields!) assert.ok(['number', 'select', 'text', 'textarea'].includes(f.type));
  }
});

test('defaults: no NaN/Infinity and main row set', () => {
  for (const t of VIRAL_AI2) {
    const r = run(t.slug, defaults(t.slug));
    assert.ok(r.length <= 8);
    assert.ok(r.some(x => x.main), t.slug);
    assert.ok(!isCheck(r), t.slug);
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.label + x.value), `${t.slug}: ${x.value}`);
  }
});

// ---------- 1. LLM roofline ----------
const llm = { params: '8', bytes: '2', bandwidth: '1000', efficiency: '70', kv: '0', tflops: '100', utilisation: '50', prompt: '1000' };
test('llm roofline vectors', () => {
  // 8B * 2 B = 16 GB; 1000*0.7/16 = 43.75 tok/s; 1000/43.75 = 22.857 ms
  const r = run('llm-tokens-per-second-estimator', llm);
  assert.equal(val(r, 'Decode upper bound'), '43.75 tokens/s');
  assert.equal(val(r, 'Prefill TTFT lower bound'), '320 ms');
  // 70B at 4-bit = 35 GB; 936 GB/s * 100% / 35 = 26.742857 tok/s
  const r2 = run('llm-tokens-per-second-estimator', { ...llm, params: '70', bytes: '0.5', bandwidth: '936', efficiency: '100' });
  assert.equal(val(r2, 'Decode upper bound'), '26.74 tokens/s');
  // KV 4 GB added to 16 GB -> 20 GB; 700/20 = 35 tok/s
  assert.equal(val(run('llm-tokens-per-second-estimator', { ...llm, kv: '4' }), 'Decode upper bound'), '35 tokens/s');
  // prompt 2000, 1B params, 10 TFLOPS 100%: 2*1e9*2000 = 4e12 FLOP / 1e13 = 0.4 s = 400 ms
  const r4 = run('llm-tokens-per-second-estimator', { ...llm, params: '1', tflops: '10', utilisation: '100', prompt: '2000' });
  assert.equal(val(r4, 'Prefill TTFT lower bound'), '400 ms');
});
test('llm roofline invalid', () => {
  for (const bad of [{ params: '0' }, { bandwidth: '-5' }, { efficiency: '150' }, { utilisation: '0' }, { prompt: '0' }, { tflops: 'abc' }])
    assert.ok(isCheck(run('llm-tokens-per-second-estimator', { ...llm, ...bad })));
});
test('llm example matches', () => {
  const ex = tool('llm-tokens-per-second-estimator').content.example!;
  const r = run('llm-tokens-per-second-estimator', defaults('llm-tokens-per-second-estimator'));
  for (const s of ['16 GB', '43.75', '16 TFLOP', '320 ms']) assert.ok(ex.includes(s.replace(' GB', ' GB')), s);
  assert.equal(val(r, 'Weights read per token'), '16 GB');
  assert.equal(val(r, 'Decode upper bound'), '43.75 tokens/s');
  assert.equal(val(r, 'Prefill compute (2 × params × prompt)'), '16 TFLOP');
  assert.equal(val(r, 'Prefill TTFT lower bound'), '320 ms');
});

// ---------- 2. LoRA ----------
const lora = { hidden: '4096', layers: '32', rank: '16', alpha: '32', modules: 'all', inter: '11008', baseParams: '6.74' };
test('lora vectors', () => {
  // q,v: 2 matrices * r*(4096+4096) = 2*16*8192 = 262,144 per layer; *32 = 8,388,608
  assert.equal(val(run('lora-trainable-parameters-calculator', { ...lora, modules: 'qv' }), 'Trainable LoRA parameters'), '8,388,608');
  // q,k,v,o: 4*16*8192 = 524,288 per layer; *32 = 16,777,216
  assert.equal(val(run('lora-trainable-parameters-calculator', { ...lora, modules: 'qkvo' }), 'Trainable LoRA parameters'), '16,777,216');
  // all: 524,288 + 3*16*(4096+11008)=724,992 -> 1,249,280 per layer; *32 = 39,976,960
  const r = run('lora-trainable-parameters-calculator', lora);
  assert.equal(val(r, 'Trainable LoRA parameters'), '39,976,960');
  assert.equal(val(r, 'Per layer'), '1,249,280');
  // alpha/r = 2; alpha/sqrt(16) = 8; fp16 = 2 bytes/param
  assert.equal(val(r, 'Scaling factor α / r'), '2');
  assert.equal(val(r, 'rsLoRA scaling α / √r (for comparison)'), '8');
  // tiny: hidden 10, 1 layer, r 2, q,v: 2*2*20 = 80 params, base 0.000001B=1000 params -> 8%
  const t = run('lora-trainable-parameters-calculator', { hidden: '10', layers: '1', rank: '2', alpha: '4', modules: 'qv', inter: '0', baseParams: '0.000001' });
  assert.equal(val(t, 'Trainable LoRA parameters'), '80');
  assert.equal(val(t, '% of base model parameters'), '8%');
});
test('lora invalid', () => {
  for (const bad of [{ rank: '0' }, { layers: '-1' }, { alpha: '0' }, { baseParams: '0' }, { inter: '0' }, { hidden: 'x' }])
    assert.ok(isCheck(run('lora-trainable-parameters-calculator', { ...lora, ...bad })));
});
test('lora example matches', () => {
  const ex = tool('lora-trainable-parameters-calculator').content.example!;
  const r = run('lora-trainable-parameters-calculator', lora);
  for (const k of ['Trainable LoRA parameters', 'Per layer']) assert.ok(ex.includes(val(r, k)));
  assert.ok(ex.includes(val(r, '% of base model parameters')));
  assert.ok(ex.includes('79.95 MB') && val(r, 'Adapter size at fp16') === '79.95 MB');
});

// ---------- 3. Softmax ----------
test('softmax vectors', () => {
  // equal logits -> uniform 0.5, entropy 1 bit
  const u = softmax([0, 0], 1);
  assert.deepEqual(u, [0.5, 0.5]);
  assert.equal(entropyBits(u), 1);
  // [2,1,0], T=1: e^2=7.389056, e=2.718282, 1 -> sum 11.107338 -> 0.665241, 0.244728, 0.090031
  const p = softmax([2, 1, 0], 1);
  assert.ok(Math.abs(p[0] - 0.665241) < 1e-6 && Math.abs(p[1] - 0.244728) < 1e-6 && Math.abs(p[2] - 0.090031) < 1e-6);
  // T=0.5 -> logits 4,2,0: 54.59815, 7.389056, 1 -> sum 62.987206 -> 0.866813
  assert.ok(Math.abs(softmax([2, 1, 0], 0.5)[0] - 0.866813) < 1e-6);
  // top-p 0.7 on p: 0.665 < 0.7 so keep two; renormalise 0.665241/0.909969 = 0.731059
  const q = truncate(p, 0, 0.7);
  assert.ok(Math.abs(q[0] - 0.731059) < 1e-5 && q[2] === 0);
  // top-k 1 -> greedy
  assert.deepEqual(truncate(p, 1, 1), [1, 0, 0]);
  // top-p 0.6: first token alone reaches 0.665 >= 0.6
  assert.deepEqual(truncate(p, 0, 0.6), [1, 0, 0]);
  // large logits stay finite thanks to max subtraction
  const big = softmax([1000, 999], 1);
  assert.ok(Math.abs(big[0] - 0.731059) < 1e-5);
  const r = run('softmax-temperature-calculator', { logits: '2 1 0', temperature: '1', topk: '0', topp: '0.7' });
  assert.equal(val(r, 'Candidates kept'), '2 of 3');
});
test('softmax invalid', () => {
  const b = { logits: '1 2 3', temperature: '1', topk: '0', topp: '1' };
  for (const bad of [{ temperature: '0' }, { temperature: '-1' }, { logits: '1' }, { logits: '1, two, 3' }, { topp: '0' }, { topp: '1.5' }, { topk: '-2' }])
    assert.ok(isCheck(run('softmax-temperature-calculator', { ...b, ...bad })));
  assert.ok(isCheck(run('softmax-temperature-calculator', { ...b, logits: Array(51).fill('1').join(',') })));
});
test('softmax example matches', () => {
  const ex = tool('softmax-temperature-calculator').content.example!;
  const r = run('softmax-temperature-calculator', defaults('softmax-temperature-calculator'));
  assert.equal(val(r, '#1: token 1 (logit 2)'), '64.42% → 69.45%');
  assert.equal(val(r, '#2: token 2 (logit 1)'), '18.46% → 19.9%');
  assert.equal(val(r, '#3: token 3 (logit 0.5)'), '9.88% → 10.65%');
  assert.equal(val(r, 'Entropy before → after truncation'), '1.538 → 1.173 bits');
  assert.equal(val(r, 'Mass kept before renormalising'), '92.76%');
  const p = softmax([2, 1, 0.5, 0, -1, -2], 0.8);
  assert.equal((p[5] * 100).toFixed(2), '0.43');
  for (const s of ['64.42%', '18.46%', '9.88%', '5.29%', '1.52%', '0.43%', '1.538', '92.76%', '69.45%', '19.9%', '10.65%', '1.173']) assert.ok(ex.includes(s), s);
});

// ---------- 4. Classification ----------
const cm = { tp: '80', fp: '10', fn: '20', tn: '890', beta: '1' };
test('classification vectors', () => {
  const r = run('classification-metrics-calculator', cm);
  // precision 80/90, recall 80/100, spec 890/900, acc 970/1000, F1 160/190 = 0.8421, bal (0.8+0.98889)/2
  assert.equal(val(r, 'Precision'), '88.89%');
  assert.equal(val(r, 'Recall (sensitivity)'), '80%');
  assert.equal(val(r, 'Specificity'), '98.89%');
  assert.equal(val(r, 'Accuracy'), '97%');
  assert.equal(val(r, 'F1 score'), '0.8421');
  assert.equal(val(r, 'Balanced accuracy'), '89.44%');
  // MCC = (71200-200)/sqrt(90*100*900*910) = 71000/85854.5 = 0.82704
  assert.equal(val(r, 'Matthews correlation (MCC)'), '0.827');
  assert.equal(val(r, 'Prevalence'), '10%');
  // perfect classifier: F1 1, MCC 1
  const p = run('classification-metrics-calculator', { tp: '5', fp: '0', fn: '0', tn: '5', beta: '1' });
  assert.equal(val(p, 'F1 score'), '1'); assert.equal(val(p, 'Matthews correlation (MCC)'), '1');
  // perfectly wrong: MCC -1
  assert.equal(val(run('classification-metrics-calculator', { tp: '0', fp: '5', fn: '5', tn: '0', beta: '1' }), 'Matthews correlation (MCC)'), '-1');
  // F2 with TP=2, FP=1, FN=1: 5*2/(5*2+4*1+1) = 10/15 = 0.6667
  assert.equal(val(run('classification-metrics-calculator', { tp: '2', fp: '1', fn: '1', tn: '0', beta: '2' }), 'F-beta score (β = 2)'), '0.6667');
  // all-negative predictions with no positives: precision/recall n/a, no NaN
  const z = run('classification-metrics-calculator', { tp: '0', fp: '0', fn: '0', tn: '10', beta: '1' });
  assert.equal(val(z, 'Precision'), 'n/a'); assert.equal(val(z, 'Matthews correlation (MCC)'), 'n/a');
});
test('classification invalid', () => {
  for (const bad of [{ tp: '-1' }, { fp: 'x' }, { tn: '' }, { beta: '0' }])
    assert.ok(isCheck(run('classification-metrics-calculator', { ...cm, ...bad })));
  assert.ok(isCheck(run('classification-metrics-calculator', { tp: '0', fp: '0', fn: '0', tn: '0', beta: '1' })));
});
test('classification example matches', () => {
  const ex = tool('classification-metrics-calculator').content.example!;
  const r = run('classification-metrics-calculator', defaults('classification-metrics-calculator'));
  for (const k of ['Precision', 'Recall (sensitivity)', 'Specificity', 'Accuracy', 'F1 score', 'Balanced accuracy', 'Matthews correlation (MCC)']) assert.ok(ex.includes(val(r, k)), k);
});

// ---------- 5. WER ----------
const wer = (reference: string, hypothesis: string, normalise = 'norm') => run('word-error-rate-calculator', { reference, hypothesis, normalise });
test('wer vectors', () => {
  // the cat sat on the mat vs the cat sit on mat: 1 sub + 1 del, N=6 -> 33.33%
  let r = wer('the cat sat on the mat', 'the cat sit on mat');
  assert.equal(val(r, 'Word error rate (WER)'), '33.33%');
  assert.equal(val(r, 'Substitutions (S)') + val(r, 'Deletions (D)') + val(r, 'Insertions (I)'), '110');
  // a b c vs a b c d e: I=2, N=3 -> 66.67%
  r = wer('a b c', 'a b c d e');
  assert.equal(val(r, 'Insertions (I)'), '2'); assert.equal(val(r, 'Word error rate (WER)'), '66.67%');
  // empty hypothesis: 2 deletions, WER 100%
  r = wer('hello world', '');
  assert.equal(val(r, 'Deletions (D)'), '2'); assert.equal(val(r, 'Word error rate (WER)'), '100%');
  // a vs b c d: S=1, I=2 -> 300%, accuracy -200%
  r = wer('a', 'b c d');
  assert.equal(val(r, 'Word error rate (WER)'), '300%'); assert.equal(val(r, 'Accuracy (1 − WER)'), '-200%');
  // CER: kitten -> sitting = 3 edits (classic Levenshtein example) over 6 chars = 50%
  assert.equal(editDistance('kitten', 'sitting'), 3);
  assert.equal(val(wer('kitten', 'sitting'), 'Character error rate (CER)'), '50%');
  // normalisation: case/punctuation ignored vs counted
  assert.equal(val(wer('Hello, World!', 'hello world'), 'Word error rate (WER)'), '0%');
  assert.equal(val(wer('Hello, World!', 'hello world', 'raw'), 'Word error rate (WER)'), '100%');
  // S+D+I equals the edit distance
  const a = alignWords('a b c d'.split(' '), 'a x c'.split(' '));
  assert.equal(a.S + a.D + a.I, a.dist); assert.equal(a.dist, 2);
});
test('wer invalid', () => {
  assert.ok(isCheck(wer('', 'something')));
  assert.ok(isCheck(wer('   ', '')));
  assert.ok(isCheck(wer('x'.repeat(8001), 'x')));
});
test('wer example matches', () => {
  const ex = tool('word-error-rate-calculator').content.example!;
  const r = run('word-error-rate-calculator', defaults('word-error-rate-calculator'));
  for (const s of [val(r, 'Word error rate (WER)'), val(r, 'Character error rate (CER)')]) assert.ok(ex.includes(s), s);
  assert.equal(val(r, 'Reference words (N)'), '6');
  assert.ok(ex.includes('edit distance is 5 over 22'));
  assert.equal(editDistance('the cat sat on the mat', 'the cat sit on mat'), 5);
});

// ---------- 6. Vectors ----------
const vec = (a: string, b: string) => run('vector-similarity-calculator', { a, b });
test('vector vectors', () => {
  // (1,2,3).(4,5,6)=32, |A|=sqrt14, |B|=sqrt77, cos=32/sqrt(1078)=0.974632, L2=sqrt(27)=5.196152, L1=9
  let r = vec('1,2,3', '4 5 6');
  assert.equal(val(r, 'Cosine similarity'), '0.974632');
  assert.equal(val(r, 'Dot product'), '32');
  assert.equal(val(r, 'Euclidean (L2) distance'), '5.196152');
  assert.equal(val(r, 'Manhattan (L1) distance'), '9');
  // orthogonal: cos 0, angle 90, L2 sqrt2 = 1.414214
  r = vec('1 0', '0 1');
  assert.equal(val(r, 'Cosine similarity'), '0'); assert.equal(val(r, 'Angle between vectors'), '90°');
  assert.equal(val(r, 'Euclidean (L2) distance'), '1.414214');
  // parallel: cos 1, angle 0
  r = vec('1 2', '2 4');
  assert.equal(val(r, 'Cosine similarity'), '1'); assert.equal(val(r, 'Angle between vectors'), '0°');
  // opposite: cos -1, angle 180
  r = vec('1 2', '-1 -2');
  assert.equal(val(r, 'Cosine similarity'), '-1'); assert.equal(val(r, 'Angle between vectors'), '180°');
  // unit vectors: 0.6,0.8 are unit; squared L2 = 2(1-cos)
  r = vec('0.6 0.8', '0.8 0.6');
  assert.equal(val(r, 'Unit-normalised?'), 'A: yes, B: yes');
  assert.equal(val(r, 'Cosine similarity'), '0.96'); // 0.48+0.48 = 0.96
  assert.equal(val(r, 'Euclidean (L2) distance'), '0.282843'); // sqrt(2*(1-0.96)) = sqrt(0.08)
  // zero vector: n/a, no NaN
  r = vec('0 0 0', '1 2 3');
  assert.equal(val(r, 'Cosine similarity'), 'n/a (zero vector)');
});
test('vector invalid', () => {
  assert.ok(isCheck(vec('1 2 3', '1 2')));
  assert.ok(isCheck(vec('', '')));
  assert.ok(isCheck(vec('1 a', '1 2')));
  assert.ok(isCheck(vec(Array(4097).fill('1').join(' '), Array(4097).fill('1').join(' '))));
  assert.ok(isCheck(vec('1e200', '1')));
});
test('vector example matches', () => {
  const ex = tool('vector-similarity-calculator').content.example!;
  const r = run('vector-similarity-calculator', defaults('vector-similarity-calculator'));
  for (const k of ['Cosine similarity', 'Cosine distance (1 − cos)', 'Euclidean (L2) distance', 'Manhattan (L1) distance', 'Dot product']) assert.ok(ex.includes(val(r, k)), k);
  assert.ok(ex.includes('12.9332°') && val(r, 'Angle between vectors') === '12.9332°');
  assert.ok(ex.includes('3.741657') && ex.includes('8.774964'));
});
