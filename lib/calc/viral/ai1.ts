import { CalcResult } from '../../types';
import { num, int, safe } from '../../format';

const bad = (reason: string): CalcResult[] => [{ label: 'Check inputs', value: reason, main: true }];
const GIB = 1073741824;
const usd = (n: number) => '$' + (Math.abs(n) < 1 ? num(n, 4) : num(n, 2));
const fmtBytes = (b: number) => (b >= 1e9 ? `${num(b / 1e9, 2)} GB` : b >= 1e6 ? `${num(b / 1e6, 2)} MB` : `${num(b / 1e3, 2)} KB`);

/** Bytes per weight for the quantisation choices (GGUF values are approximate effective bits / 8). */
export const QUANT_BYTES: Record<string, number> = {
  fp32: 4, fp16: 2, int8: 1, int4: 0.5, q8_0: 8.5 / 8, q4_k_m: 4.85 / 8,
};

// ---------- LLM VRAM ----------
export function llmVram(v: Record<string, any>): CalcResult[] {
  const params = safe(v.params), layers = safe(v.layers), kvHeads = safe(v.kvHeads), headDim = safe(v.headDim);
  const ctx = safe(v.context), batch = safe(v.batch), kvBytes = safe(v.kvBytes), ovh = safe(v.overhead), gpu = safe(v.gpu);
  const wBytes = QUANT_BYTES[String(v.quant)];
  if (wBytes === undefined) return bad('Choose a weight format.');
  if (!(params > 0)) return bad('Parameters must be greater than 0 (billions).');
  if (!(layers >= 1) || !(kvHeads >= 1) || !(headDim >= 1)) return bad('Layers, KV heads and head dimension must be at least 1.');
  if (!(ctx >= 1) || !(batch >= 1)) return bad('Context tokens and batch size must be at least 1.');
  if (!(kvBytes > 0)) return bad('Choose a KV cache precision.');
  if (ovh < 0 || ovh > 200) return bad('Overhead must be between 0 and 200 %.');
  if (gpu < 0) return bad('GPU memory cannot be negative.');
  const weights = params * 1e9 * wBytes;
  const kv = 2 * layers * kvHeads * headDim * ctx * batch * kvBytes;
  const total = (weights + kv) * (1 + ovh / 100);
  const totalGiB = total / GIB;
  const rows: CalcResult[] = [
    { label: 'Estimated total memory', value: `${num(total / 1e9, 2)} GB (${num(totalGiB, 2)} GiB)`, main: true },
    { label: 'Model weights', value: `${num(weights / 1e9, 2)} GB` },
    { label: 'KV cache', value: `${num(kv / 1e9, 2)} GB (${num(kv / GIB, 2)} GiB)` },
    { label: `Overhead (${num(ovh, 1)} %)`, value: `${num((weights + kv) * ovh / 100 / 1e9, 2)} GB` },
  ];
  if (gpu > 0) {
    const head = gpu - totalGiB;
    rows.push({ label: `Fits in ${num(gpu, 1)} GiB GPU?`, value: head >= 0 ? `Yes, ${num(head, 2)} GiB headroom` : `No, short by ${num(-head, 2)} GiB` });
  }
  return rows;
}

// ---------- RAG chunking ----------
/** Chunks per document: ceil(max(0, T - O) / (C - O)), at least 1 when T > 0. */
export function chunksPerDoc(tokens: number, chunk: number, overlap: number): number {
  if (tokens <= 0) return 0;
  return Math.max(1, Math.ceil(Math.max(0, tokens - overlap) / (chunk - overlap)));
}
/** Tokens embedded for one document including duplicated overlap: (n-1)*C + last chunk length. */
export function embeddedTokensPerDoc(tokens: number, chunk: number, overlap: number): number {
  const n = chunksPerDoc(tokens, chunk, overlap);
  if (n === 0) return 0;
  const stride = chunk - overlap;
  return (n - 1) * chunk + (tokens - (n - 1) * stride);
}
export function ragChunking(v: Record<string, any>): CalcResult[] {
  const docs = safe(v.docs), tokens = safe(v.tokens), chunk = safe(v.chunk), overlap = safe(v.overlap);
  const dim = safe(v.dim), meta = safe(v.meta), mult = safe(v.mult), price = safe(v.price);
  const bpd = ({ f32: 4, f16: 2, i8: 1 } as Record<string, number>)[String(v.precision)];
  if (bpd === undefined) return bad('Choose a vector precision.');
  if (!(docs >= 1)) return bad('Number of documents must be at least 1.');
  if (!(tokens >= 1)) return bad('Tokens per document must be at least 1.');
  if (!(chunk >= 1)) return bad('Chunk size must be at least 1 token.');
  if (overlap < 0 || overlap >= chunk) return bad('Overlap must be 0 or more and smaller than the chunk size.');
  if (!(dim >= 1)) return bad('Embedding dimension must be at least 1.');
  if (meta < 0) return bad('Metadata bytes cannot be negative.');
  if (!(mult >= 1)) return bad('Index overhead multiplier must be 1 or more.');
  if (price < 0) return bad('Price per 1M tokens cannot be negative.');
  const perDoc = chunksPerDoc(tokens, chunk, overlap);
  const chunks = perDoc * docs;
  const vecBytes = chunks * dim * bpd;
  const metaBytes = chunks * meta;
  const total = vecBytes * mult + metaBytes;
  const embTokens = embeddedTokensPerDoc(tokens, chunk, overlap) * docs;
  const rows: CalcResult[] = [
    { label: 'Estimated vector store size', value: fmtBytes(total), main: true },
    { label: 'Total chunks', value: `${int(chunks)} (${int(perDoc)} per document)` },
    { label: 'Raw vectors', value: fmtBytes(vecBytes) },
    { label: 'Metadata', value: fmtBytes(metaBytes) },
    { label: 'Index overhead (assumed)', value: `${fmtBytes(vecBytes * (mult - 1))} at x${num(mult, 2)}` },
    { label: 'Tokens to embed (with overlap)', value: `${int(embTokens)} tokens` },
    { label: 'Overlap duplication', value: `x${num(embTokens / (tokens * docs), 3)}` },
  ];
  if (price > 0) rows.push({ label: 'Embedding cost (one pass)', value: usd(embTokens / 1e6 * price) });
  return rows;
}

// ---------- Prompt caching ----------
export function promptCaching(v: Record<string, any>): CalcResult[] {
  const price = safe(v.price), w = safe(v.writeMult), r = safe(v.readMult);
  const prefix = safe(v.prefix), unc = safe(v.uncached), reqs = safe(v.requests), hit = safe(v.hit), days = safe(v.days);
  if (!(price > 0)) return bad('Base input price must be greater than 0.');
  if (w < 0 || r < 0) return bad('Cache multipliers cannot be negative.');
  if (prefix < 0 || unc < 0) return bad('Token counts cannot be negative.');
  if (!(prefix + unc > 0)) return bad('Enter at least some prefix or uncached tokens.');
  if (!(reqs >= 1)) return bad('Requests per day must be at least 1.');
  if (hit < 0 || hit > 100) return bad('Cache hit rate must be between 0 and 100 %.');
  if (!(days >= 1) || days > 31) return bad('Days per month must be between 1 and 31.');
  const h = hit / 100;
  const without = reqs * (prefix + unc) * price / 1e6;
  const withC = reqs * (prefix * ((1 - h) * w + h * r) + unc) * price / 1e6;
  const save = without - withC;
  let be: string;
  if (prefix === 0) be = 'n/a (no cached prefix)';
  else if (w <= 1) be = '0 % (caching never costs more)';
  else if (w - r <= 0 || (w - 1) / (w - r) > 1) be = 'Not reachable (writes cost more than reads save)';
  else be = `${num((w - 1) / (w - r) * 100, 2)} % hit rate`;
  return [
    { label: 'Monthly savings', value: `${usd(save * days)} (${without > 0 ? num(save / without * 100, 2) : '0'} %)`, main: true },
    { label: 'Daily cost without caching', value: usd(without) },
    { label: 'Daily cost with caching', value: usd(withC) },
    { label: 'Daily savings', value: usd(save) },
    { label: 'Monthly cost without caching', value: usd(without * days) },
    { label: 'Monthly cost with caching', value: usd(withC * days) },
    { label: 'Break-even hit rate', value: be },
  ];
}

// ---------- Agent loop ----------
export function agentLoopTotals(sys: number, user: number, turns: number, out: number, tool: number) {
  const step = out + tool;
  const inputTotal = turns * (sys + user) + step * turns * (turns - 1) / 2; // closed form of the series
  const unique = sys + user + (turns - 1) * step;
  return { inputTotal, outputTotal: turns * out, unique, firstIn: sys + user, lastIn: sys + user + (turns - 1) * step };
}
export function agentLoop(v: Record<string, any>): CalcResult[] {
  const sys = safe(v.system), user = safe(v.user), turns = Math.floor(safe(v.turns)), out = safe(v.output), tool = safe(v.tool);
  const pin = safe(v.inPrice), pout = safe(v.outPrice);
  if (!(turns >= 1) || turns > 100000) return bad('Turns must be a whole number from 1 to 100000.');
  if (sys < 0 || user < 0 || out < 0 || tool < 0) return bad('Token counts cannot be negative.');
  if (!(sys + user > 0)) return bad('System plus user tokens must be greater than 0.');
  if (pin < 0 || pout < 0) return bad('Prices cannot be negative.');
  const t = agentLoopTotals(sys, user, turns, out, tool);
  const inCost = t.inputTotal * pin / 1e6, outCost = t.outputTotal * pout / 1e6, total = inCost + outCost;
  const reread = (t.inputTotal - t.unique) * pin / 1e6;
  return [
    { label: 'Total cost', value: usd(total), main: true },
    { label: 'Total input tokens billed', value: `${int(t.inputTotal)} tokens` },
    { label: 'Total output tokens', value: `${int(t.outputTotal)} tokens` },
    { label: 'Cost of turn 1', value: usd(t.firstIn * pin / 1e6 + out * pout / 1e6) },
    { label: `Cost of turn ${int(turns)}`, value: usd(t.lastIn * pin / 1e6 + out * pout / 1e6) },
    { label: 'Re-read history share of total cost', value: `${num(total > 0 ? reread / total * 100 : 0, 1)} %` },
    { label: 'Input tokens in last turn', value: `${int(t.lastIn)} tokens` },
  ];
}

// ---------- Local vs cloud ----------
const DAYS_PER_MONTH = 365.25 / 12;
export function localVsCloud(v: Record<string, any>): CalcResult[] {
  const hw = safe(v.hardware), life = safe(v.life), watts = safe(v.watts), hours = safe(v.hours), kwh = safe(v.kwh);
  const tps = safe(v.tps), util = safe(v.util), cloud = safe(v.cloud);
  if (hw < 0) return bad('Hardware cost cannot be negative.');
  if (!(life >= 1)) return bad('Lifetime must be at least 1 month.');
  if (watts < 0 || kwh < 0) return bad('Power draw and electricity price cannot be negative.');
  if (!(hours > 0) || hours > 24) return bad('Hours per day under load must be above 0 and at most 24.');
  if (!(tps > 0)) return bad('Throughput must be greater than 0 tokens per second.');
  if (!(util > 0) || util > 100) return bad('Utilisation must be above 0 and at most 100 %.');
  if (!(cloud > 0)) return bad('Cloud price per 1M tokens must be greater than 0.');
  const loadHours = hours * DAYS_PER_MONTH;
  const hwMonth = hw / life;
  const energyMonth = watts / 1000 * loadHours * kwh;
  const tokensM = tps * 3600 * (util / 100) * loadHours / 1e6;
  const localMonth = hwMonth + energyMonth;
  const localPerM = localMonth / tokensM;
  const breakevenM = localMonth / cloud;
  const cloudAtCap = tokensM * cloud;
  const rows: CalcResult[] = [
    { label: 'Local cost per 1M tokens', value: usd(localPerM), main: true },
    { label: 'Cloud cost per 1M tokens', value: usd(cloud) },
    { label: 'Break-even volume', value: `${num(breakevenM, 2)} M tokens/month` },
    { label: 'Local capacity at these settings', value: `${num(tokensM, 2)} M tokens/month` },
    { label: 'Energy per 1M tokens', value: usd(energyMonth / tokensM) },
    { label: 'Monthly saving at full capacity', value: `${usd(cloudAtCap - localMonth)}` },
  ];
  const net = cloudAtCap - energyMonth;
  rows.push({ label: 'Hardware payback at full capacity', value: hw === 0 ? 'No hardware cost' : net > 0 ? `${num(hw / net, 1)} months` : 'Not reached' });
  return rows;
}

export const COMPUTES_AI1: Record<string, (v: Record<string, any>) => CalcResult[]> = {
  'llm-vram-calculator': llmVram,
  'rag-chunking-vector-storage-calculator': ragChunking,
  'prompt-caching-savings-calculator': promptCaching,
  'agent-loop-token-cost-calculator': agentLoop,
  'local-llm-vs-cloud-api-breakeven-calculator': localVsCloud,
};
