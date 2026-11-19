import test from 'node:test';
import assert from 'node:assert/strict';
import { COMPUTES_AI1, chunksPerDoc, embeddedTokensPerDoc, agentLoopTotals, QUANT_BYTES } from '../lib/calc/viral/ai1';
import { VIRAL_AI1 } from '../lib/registry/viralAi1';

const tool = (slug: string) => VIRAL_AI1.find(t => t.slug === slug)!;
const defs = (slug: string) => Object.fromEntries((tool(slug).fields || []).map(f => [f.key, String(f.def)]));
const run = (slug: string, over: Record<string, any> = {}) => COMPUTES_AI1[slug]({ ...defs(slug), ...over });
const row = (r: { label: string; value: string }[], start: string) => r.find(x => x.label.startsWith(start))!.value;
const main = (r: { value: string; main?: boolean }[]) => r.find(x => x.main)!.value;
const isCheck = (r: { label: string }[]) => r.length === 1 && r[0].label === 'Check inputs';

test('every tool: defaults valid, no NaN/Infinity, main set, content complete', () => {
  assert.equal(VIRAL_AI1.length, 5);
  for (const t of VIRAL_AI1) {
    const r = run(t.slug);
    assert.ok(r.some(x => x.main), t.slug);
    assert.ok(r.length <= 8);
    for (const x of r) assert.ok(!/NaN|Infinity|∞/.test(x.label + x.value), `${t.slug}: ${x.value}`);
    assert.ok(t.content.intro.split(/\s+/).length >= 35);
    assert.ok(t.content.faqs.length >= 4 && t.content.howSteps!.length === 3);
    assert.ok(t.name.length <= 60 && t.short.length <= 110, t.slug);
    assert.ok(t.metaDescription!.length >= 120 && t.metaDescription!.length <= 158, `${t.slug} ${t.metaDescription!.length}`);
    assert.ok(t.metaDescription!.toLowerCase().includes(t.keywords[0]), t.slug);
    assert.ok(t.related.length <= 4);
    assert.equal(typeof COMPUTES_AI1[t.slug], 'function');
  }
});

test('llm-vram: reference vectors', () => {
  // 70B INT4 (0.5 B/param) = 35e9 B weights. Llama-70B-style KV: 2*80*8*128*4096*1*2 = 1,342,177,280 B.
  // overhead 0 -> total 36,342,177,280 B = 36.34 GB.
  let r = run('llm-vram-calculator', { params: 70, quant: 'int4', layers: 80, kvHeads: 8, headDim: 128, context: 4096, batch: 1, kvBytes: 2, overhead: 0, gpu: 48 });
  assert.equal(row(r, 'Model weights'), '35 GB');
  assert.equal(row(r, 'KV cache'), '1.34 GB (1.25 GiB)'); // 1,342,177,280 / 2^30 = 1.25 exactly
  assert.ok(main(r).startsWith('36.34 GB'));
  assert.ok(row(r, 'Fits').startsWith('Yes')); // 36.34e9/2^30 = 33.85 GiB < 48
  // 7B FP32, tiny KV (1 layer,1 head,1 dim,1 token,1 batch, 1 byte = 2 B): weights 28 GB, 10% overhead -> 30.8 GB
  r = run('llm-vram-calculator', { params: 7, quant: 'fp32', layers: 1, kvHeads: 1, headDim: 1, context: 1, batch: 1, kvBytes: 1, overhead: 10, gpu: 24 });
  assert.ok(main(r).startsWith('30.8 GB'));
  assert.ok(row(r, 'Fits').startsWith('No')); // 30.8e9/2^30=28.68 > 24
  // KV scales linearly with batch: batch 4 -> 4x
  const a = run('llm-vram-calculator', { batch: 1, overhead: 0 }), b = run('llm-vram-calculator', { batch: 4, overhead: 0 });
  assert.equal(row(a, 'KV cache').split(' ')[0], '1.07'); assert.equal(row(b, 'KV cache').split(' ')[0], '4.29'); // 1,073,741,824*4 = 4.295e9
  // GGUF Q8_0: 34 bytes per 32 weights = 8.5 bits
  assert.equal(QUANT_BYTES.q8_0, 34 / 32);
});
test('llm-vram: example text matches', () => {
  const r = run('llm-vram-calculator');
  assert.equal(row(r, 'Model weights'), '16 GB');
  assert.equal(row(r, 'KV cache'), '1.07 GB (1 GiB)');
  assert.equal(main(r), '18.78 GB (17.49 GiB)');
  assert.equal(row(r, 'Fits'), 'Yes, 6.51 GiB headroom');
  const ex = tool('llm-vram-calculator').content.example!;
  for (const s of ['16.00 GB', '1.07 GB', '18.78 GB', '17.49 GiB', '6.51 GiB']) assert.ok(ex.includes(s));
});
test('llm-vram: invalid', () => {
  assert.ok(isCheck(run('llm-vram-calculator', { params: 0 })));
  assert.ok(isCheck(run('llm-vram-calculator', { context: '' })));
  assert.ok(isCheck(run('llm-vram-calculator', { quant: 'zzz' })));
  assert.ok(isCheck(run('llm-vram-calculator', { overhead: -5 })));
});

test('rag: chunk math reference vectors', () => {
  // 1000 tokens, chunk 200, overlap 50: stride 150; (1000-50)/150 = 6.33 -> 7 chunks
  assert.equal(chunksPerDoc(1000, 200, 50), 7);
  // no overlap: 1000/250 = 4 exactly
  assert.equal(chunksPerDoc(1000, 250, 0), 4);
  // shorter than a chunk -> 1; tokens <= overlap -> min 1
  assert.equal(chunksPerDoc(100, 512, 64), 1);
  assert.equal(chunksPerDoc(30, 512, 64), 1);
  // embedded tokens: 6 full chunks of 200 + last (1000 - 6*150 = 100) = 1300
  assert.equal(embeddedTokensPerDoc(1000, 200, 50), 1300);
  // without overlap embedded tokens equal corpus tokens
  assert.equal(embeddedTokensPerDoc(1000, 250, 0), 1000);
  // brute force chunk-window check
  for (const [T, C, O] of [[5000, 512, 64], [777, 100, 10], [64, 512, 64]]) {
    let sum = 0, n = 0;
    for (let s = 0; ; s += C - O) { sum += Math.min(C, T - s); n++; if (s + C >= T) break; }
    assert.equal(chunksPerDoc(T, C, O), n); assert.equal(embeddedTokensPerDoc(T, C, O), sum);
  }
  // storage: 10 docs x 1000 tokens, 200/50, dim 100 f16, meta 10, mult 2: 70 chunks; vec 70*100*2=14,000; *2 = 28,000; +700 = 28,700 B = 28.70 KB
  const r = run('rag-chunking-vector-storage-calculator', { docs: 10, tokens: 1000, chunk: 200, overlap: 50, dim: 100, precision: 'f16', meta: 10, mult: 2, price: 1 });
  assert.equal(main(r), '28.7 KB');
  assert.equal(row(r, 'Tokens to embed'), '13,000 tokens');
  assert.equal(row(r, 'Embedding cost'), '$0.013');
});
test('rag: example text matches', () => {
  const r = run('rag-chunking-vector-storage-calculator');
  assert.equal(main(r), '112.99 MB');
  assert.equal(row(r, 'Total chunks'), '12,000 (12 per document)');
  assert.equal(row(r, 'Raw vectors'), '73.73 MB');
  assert.equal(row(r, 'Tokens to embed'), '5,704,000 tokens');
  assert.equal(row(r, 'Overlap duplication'), 'x1.141');
  assert.equal(row(r, 'Embedding cost'), '$0.5704');
  const ex = tool('rag-chunking-vector-storage-calculator').content.example!;
  for (const s of ['12 chunks', '12,000', '73.73 MB', '112.99 MB', '5,704,000', '1.141x', '$0.5704']) assert.ok(ex.includes(s), s);
});
test('rag: invalid', () => {
  assert.ok(isCheck(run('rag-chunking-vector-storage-calculator', { overlap: 512 })));
  assert.ok(isCheck(run('rag-chunking-vector-storage-calculator', { tokens: 0 })));
  assert.ok(isCheck(run('rag-chunking-vector-storage-calculator', { mult: 0.5 })));
});

test('prompt caching: reference vectors', () => {
  // price 2, P=1000, U=0, 100 req/day, hit 50%, w=1.25, r=0.1, 30 days
  // without = 100*1000*2/1e6 = 0.2/day; with = 100*1000*(0.5*1.25+0.5*0.1)*2/1e6 = 0.135/day; save 0.065/day = 1.95/month (32.5%)
  const r = run('prompt-caching-savings-calculator', { price: 2, prefix: 1000, uncached: 0, requests: 100, hit: 50, days: 30 });
  assert.equal(main(r), '$1.95 (32.5 %)');
  assert.equal(row(r, 'Daily cost without'), '$0.2');
  assert.equal(row(r, 'Daily cost with caching'), '$0.135');
  // break-even (1.25-1)/(1.25-0.1) = 21.739%; at that hit rate savings are 0
  assert.equal(row(r, 'Break-even'), '21.74 % hit rate');
  const z = run('prompt-caching-savings-calculator', { hit: 100 * 0.25 / 1.15 });
  assert.ok(main(z).startsWith('$0 ') || main(z).startsWith('$0.0'));
  // 0% hit, write 1.25: all misses pay 1.25x on prefix. prefix 1M, price 1, 1 req: 1.25 vs 1.0 -> -0.25 daily
  const neg = run('prompt-caching-savings-calculator', { price: 1, prefix: 1000000, uncached: 0, requests: 1, hit: 0, days: 1 });
  assert.equal(row(neg, 'Daily savings'), '$-0.25');
  // write mult <= 1: break-even 0
  assert.ok(row(run('prompt-caching-savings-calculator', { writeMult: 1 }), 'Break-even').startsWith('0 %'));
});
test('prompt caching: example text matches', () => {
  const r = run('prompt-caching-savings-calculator');
  assert.equal(row(r, 'Daily cost without'), '$61.5');
  assert.equal(row(r, 'Daily cost with caching'), '$14.4');
  assert.equal(row(r, 'Daily savings'), '$47.1');
  assert.equal(main(r), '$1,413 (76.59 %)'.replace('76.59', '76.59'));
  assert.equal(row(r, 'Break-even'), '21.74 % hit rate');
});
test('prompt caching: invalid', () => {
  assert.ok(isCheck(run('prompt-caching-savings-calculator', { price: 0 })));
  assert.ok(isCheck(run('prompt-caching-savings-calculator', { hit: 120 })));
  assert.ok(isCheck(run('prompt-caching-savings-calculator', { prefix: 0, uncached: 0 })));
});

test('agent loop: closed form equals loop; reference vectors', () => {
  for (const [s, u, k, o, t] of [[2000, 500, 10, 300, 1500], [100, 50, 1, 10, 10], [0, 7, 25, 3, 9]]) {
    let sum = 0; for (let i = 1; i <= k; i++) sum += s + u + (i - 1) * (o + t);
    assert.equal(agentLoopTotals(s, u, k, o, t).inputTotal, sum);
  }
  // 3 turns, sys 100, user 0, out 10, tool 40: inputs 100,150,200 = 450; output 30
  // price 1/1M in, 2/1M out: 450e-6 + 60e-6 = $0.00051 ->'$0.0005'
  const r = run('agent-loop-token-cost-calculator', { system: 100, user: 0, turns: 3, output: 10, tool: 40, inPrice: 1, outPrice: 2 });
  assert.equal(row(r, 'Total input'), '450 tokens');
  assert.equal(row(r, 'Total output'), '30 tokens');
  assert.equal(main(r), '$0.0005');
  assert.equal(row(r, 'Cost of turn 1'), '$0.0001'); // (100*1 + 10*2)/1e6 = 0.00012
  // single turn: no re-read
  assert.equal(row(run('agent-loop-token-cost-calculator', { turns: 1 }), 'Re-read'), '0 %');
});
test('agent loop: example text matches', () => {
  const r = run('agent-loop-token-cost-calculator');
  assert.equal(row(r, 'Total input'), '106,000 tokens');
  assert.equal(row(r, 'Total output'), '3,000 tokens');
  assert.equal(main(r), '$0.363');
  assert.equal(row(r, 'Cost of turn 1'), '$0.012');
  assert.equal(row(r, 'Cost of turn 10'), '$0.0606');
  assert.equal(row(r, 'Re-read'), '72.1 %');
  const ex = tool('agent-loop-token-cost-calculator').content.example!;
  for (const s of ['106,000', '3,000', '$0.318', '$0.045', '$0.363', '$0.012', '$0.0606', '72.1 %']) assert.ok(ex.includes(s), s);
});
test('agent loop: invalid', () => {
  assert.ok(isCheck(run('agent-loop-token-cost-calculator', { turns: 0 })));
  assert.ok(isCheck(run('agent-loop-token-cost-calculator', { system: 0, user: 0 })));
  assert.ok(isCheck(run('agent-loop-token-cost-calculator', { output: -1 })));
});

test('local vs cloud: reference vectors', () => {
  // hardware 3650, life 10 mo -> 365/mo. 0 W so no energy. 24 h/day -> 730.5 load h. tps 100, util 100%
  // tokens/mo = 100*3600*730.5 = 262,980,000 = 262.98 M; local = 365/262.98 = 1.3879 $/1M
  // cloud 5 -> break-even = 365/5 = 73 M tokens/month
  const r = run('local-llm-vs-cloud-api-breakeven-calculator', { hardware: 3650, life: 10, watts: 0, hours: 24, kwh: 0.2, tps: 100, util: 100, cloud: 5 });
  assert.equal(main(r), '$1.39');
  assert.equal(row(r, 'Break-even'), '73 M tokens/month');
  assert.equal(row(r, 'Energy per'), '$0');
  // Energy only: hardware 0, 1000 W, 1 tok/s... 1 h/day: load h 30.4375; kWh 30.4375*1 = 30.4375 kWh * $0.1 = 3.04375/mo
  // tokens = 1000*3600*30.4375/1e6 = 109.575 M -> energy/1M = 0.027778 = (1000/1000) kWh per 1000*3600 tokens ... 1kW * 1h /3.6M tokens = 0.1/3.6 = 0.02778
  const e = run('local-llm-vs-cloud-api-breakeven-calculator', { hardware: 0, watts: 1000, hours: 1, kwh: 0.1, tps: 1000, util: 100, cloud: 1 });
  assert.equal(main(e), '$0.0278');
  assert.equal(row(e, 'Hardware payback'), 'No hardware cost');
  // cheaper cloud than local: payback not reached
  const n = run('local-llm-vs-cloud-api-breakeven-calculator', { cloud: 0.01 });
  assert.equal(row(n, 'Hardware payback'), 'Not reached');
});
test('local vs cloud: example text matches', () => {
  const r = run('local-llm-vs-cloud-api-breakeven-calculator');
  assert.equal(main(r), '$2.35');
  assert.equal(row(r, 'Break-even'), '8.22 M tokens/month');
  assert.equal(row(r, 'Local capacity'), '35.06 M tokens/month');
  assert.equal(row(r, 'Hardware payback'), '7.4 months');
  const ex = tool('local-llm-vs-cloud-api-breakeven-calculator').content.example!;
  for (const s of ['$69.44', '$12.78', '35.06 M', '$2.35', '8.22 M', '7.4 months']) assert.ok(ex.includes(s), s);
});
test('local vs cloud: invalid', () => {
  assert.ok(isCheck(run('local-llm-vs-cloud-api-breakeven-calculator', { tps: 0 })));
  assert.ok(isCheck(run('local-llm-vs-cloud-api-breakeven-calculator', { util: 150 })));
  assert.ok(isCheck(run('local-llm-vs-cloud-api-breakeven-calculator', { cloud: 0 })));
});
