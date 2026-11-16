import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizedTarget,checkTarget,rateLimit} from '../src/linkSafety.js';
test('targets reject credentials, IP encodings, custom ports and local hosts',()=>{
 for(const input of [null,{},'javascript:alert(1)','http://127.0.0.1','http://2130706433','http://[::1]','https://u:p@foo.com','https://foo.com:8080','http://device.local','http://localhost'])assert.equal(normalizedTarget(input),null,String(input));
 assert.equal(normalizedTarget(' https://www.irs.gov/path?q=1 '),'https://www.irs.gov/path?q=1');
});
test('safety checks require exact moderated hosts or an available provider',async()=>{
 assert.equal((await checkTarget('https://www.irs.gov/a',{SHORTENER_ALLOWED_HOSTS:'www.irs.gov'})).safe,true);
 assert.equal((await checkTarget('https://evil.www.irs.gov/a',{SHORTENER_ALLOWED_HOSTS:'www.irs.gov'})).safe,false);
 assert.equal((await checkTarget('https://foo.com',{})).unavailable,true);
 const env={SAFE_BROWSING_API_KEY:'test-key'};
 assert.equal((await checkTarget('https://foo.com',env,async()=>({ok:true,json:async()=>({})}))).safe,true);
 assert.equal((await checkTarget('https://foo.com',env,async()=>({ok:true,json:async()=>({matches:[{}]})}))).safe,false);
 assert.equal((await checkTarget('https://foo.com',env,async()=>({ok:false}))).unavailable,true);
 assert.equal((await checkTarget('https://foo.com',env,async()=>({ok:true,json:async()=>({matches:'invalid'})}))).unavailable,true);
 assert.equal((await checkTarget('https://foo.com',env,async()=>{throw new Error('timeout')})).unavailable,true);
});
test('rate limiting returns 429 and retry metadata',()=>{
 const limit=rateLimit({limit:1});let calls=0,status=0;const res={set:()=>res,status:s=>{status=s;return res;},json:()=>res};const req={ip:'client-a'};
 limit(req,res,()=>calls++);limit(req,res,()=>calls++);assert.equal(calls,1);assert.equal(status,429);
 limit({ip:'client-b'},res,()=>calls++);assert.equal(calls,2);
});
