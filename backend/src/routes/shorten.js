import { Router } from 'express';
import { customAlphabet } from 'nanoid';
import { JsonStore } from '../store.js';
import { normalizedTarget, checkTarget, rateLimit } from '../linkSafety.js';
const router=Router();
const store=new JsonStore(new URL('../../data/links.json',import.meta.url).pathname);
const reports=new JsonStore(new URL('../../data/link-reports.json',import.meta.url).pathname);
const newCode=customAlphabet('23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',7);
const reserved=new Set(['api','health','admin','contact','report','robots','sitemap','favicon']);
router.use((_req,res,next)=>{res.set({'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'});next();});
router.post('/shorten',rateLimit(),async(req,res,next)=>{
  try {
    const {url,custom}=req.body || {};
    const target=normalizedTarget(url);
    if(!target) return res.status(400).json({error:'Provide a public HTTP(S) URL without credentials, a custom port or an IP address.'});
    if(custom!==undefined && typeof custom!=='string')return res.status(400).json({error:'Custom alias must be text.'});
    let code=(custom || '').trim();
    if(code){
      if(!/^[A-Za-z0-9_-]{3,32}$/.test(code)||reserved.has(code.toLowerCase()))return res.status(400).json({error:'Choose a valid, non-reserved alias.'});
      const approved=(process.env.SHORTENER_APPROVED_ALIASES || '').split(',').map(s=>s.trim());
      if(!approved.includes(code))return res.status(403).json({error:'Custom aliases require moderator approval. Leave the alias blank for a random link.'});
      if(store.has(code))return res.status(409).json({error:'That alias is already taken.'});
    }
    const check=await checkTarget(target);
    if(!check.safe)return res.status(check.unavailable?503:400).json({error:check.unavailable?'Link safety verification is unavailable. Try later.':'This destination is blocked by the safety service.'});
    // Check again after awaiting the reputation service to prevent alias races.
    if(code && store.has(code))return res.status(409).json({error:'That alias is already taken.'});
    if(!code)do{code=newCode();}while(store.has(code)||reserved.has(code.toLowerCase()));
    const base=process.env.PUBLIC_BASE_URL;
    if(!base || !/^https?:\/\//.test(base))return res.status(503).json({error:'Short links are not configured.'});
    store.set(code,{target,created:Date.now(),checkedAt:Date.now(),safetyMethod:check.method,hits:0,disabled:false});
    res.json({code,shortUrl:`${base.replace(/\/$/,'')}/${code}`,target});
  }catch(error){next(error);}
});
router.get('/expand/:code',rateLimit({limit:120}), (req,res)=>{
  const rec=store.get(req.params.code);
  if(!rec || rec.disabled)return res.status(404).json({error:'Unknown or disabled short code.'});
  res.json({target:rec.target,created:rec.created,hits:rec.hits});
});
router.post('/report-link',rateLimit({limit:5}), (req,res,next)=>{
  const {code,reason}=req.body || {};
  if(typeof code!=='string'||!store.has(code)||typeof reason!=='string'||reason.trim().length<10||reason.length>1000)return res.status(400).json({error:'Provide an existing code and a reason of 10–1000 characters.'});
  try{reports.set(newCode(),{code,reason:reason.trim(),created:Date.now(),status:'pending'});res.status(202).json({message:'Report recorded for review.'});}catch(error){next(error);}
});
export {router as shortenRouter,store as linkStore};
