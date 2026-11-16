import { isIP } from 'node:net';

export function normalizedTarget(value) {
  if (typeof value !== 'string' || value.length > 4096) return null;
  try {
    const u = new URL(value.trim());
    const host = u.hostname.toLowerCase().replace(/\.$/, '');
    if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password || u.port || isIP(host) || host.includes(':') || !host.includes('.') || /(?:^|\.)(localhost|local|internal|test|invalid|example)$/.test(host)) return null;
    u.hostname = host;
    return u.href;
  } catch { return null; }
}
export async function checkTarget(target, env = process.env, request = fetch) {
  const host = new URL(target).hostname;
  const allowed = (env.SHORTENER_ALLOWED_HOSTS || '').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
  // Exact hosts only: allowing example.com does not allow attacker.example.com.
  if (allowed.includes(host)) return { safe:true, method:'moderated-host' };
  if (!env.SAFE_BROWSING_API_KEY) return { safe:false, unavailable:true };
  try {
    const response = await request(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${encodeURIComponent(env.SAFE_BROWSING_API_KEY)}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, signal:AbortSignal.timeout(5000),
      body:JSON.stringify({client:{clientId:'alltoolstogether',clientVersion:'1.0'},threatInfo:{threatTypes:['MALWARE','SOCIAL_ENGINEERING','UNWANTED_SOFTWARE','POTENTIALLY_HARMFUL_APPLICATION'],platformTypes:['ANY_PLATFORM'],threatEntryTypes:['URL'],threatEntries:[{url:target}]}}),
    });
    if (!response.ok) return {safe:false,unavailable:true};
    const body = await response.json();
    if (!body || typeof body !== 'object' || Array.isArray(body) || (body.matches !== undefined && !Array.isArray(body.matches))) return {safe:false,unavailable:true};
    return {safe:!body.matches?.length,method:'safe-browsing'};
  } catch { return {safe:false,unavailable:true}; }
}
// Per-process limits. Keep one process or put a shared rate limiter at the gateway.
export function rateLimit({limit=10,windowMs=3600000}={}) {
  const buckets=new Map();
  return (req,res,next)=>{
    const now=Date.now();
    for(const [key,b] of buckets) if(b.until<=now) buckets.delete(key);
    const key=req.ip || req.socket.remoteAddress || 'unknown';
    if (!buckets.has(key) && buckets.size >= 10000) return res.status(503).json({error:'Service busy. Try later.'});
    const bucket=buckets.get(key) || {count:0,until:now+windowMs};
    buckets.set(key,bucket); bucket.count++;
    if(bucket.count>limit){res.set('Retry-After',String(Math.ceil((bucket.until-now)/1000)));return res.status(429).json({error:'Too many requests. Try later.'});}
    next();
  };
}
