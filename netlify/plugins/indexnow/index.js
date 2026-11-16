import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const origin='https://alltoolstogether.com';
const cachePath='.cache/att-indexnow.json';
export default {
 async onSuccess({constants,utils}) {
  if(process.env.CONTEXT!=='production')return;
  try{
   const publish=constants.PUBLISH_DIR;
   const key=readFileSync(join(publish,'indexnow-key.txt'),'utf8').trim();
   // Wait for the production key to be visible before notifying the engine.
   const proof=await fetch(origin+'/indexnow-key.txt',{signal:AbortSignal.timeout(15000)});
   if(!proof.ok || (await proof.text()).trim()!==key){console.log('IndexNow: production key is not visible yet; submission skipped.');return;}
   await utils.cache.restore(cachePath);
   const previous=existsSync(cachePath)?JSON.parse(readFileSync(cachePath,'utf8')):{};
   const xml=readFileSync(join(publish,'sitemap.xml'),'utf8');
   const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
   const built=JSON.parse(readFileSync(join(publish,'indexnow-manifest.json'),'utf8'));
   const current={};
   for(const url of urls){if(new URL(url).origin!==origin || !/^[a-f0-9]{64}$/.test(built[url] || ''))throw new Error('Invalid page fingerprint');current[url]=built[url];}
   const changed=[...urls.filter(url=>previous[url]!==current[url]),...Object.keys(previous).filter(url=>!current[url])];
   if(!changed.length){console.log('IndexNow: no changed canonical URLs.');return;}
   const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({host:new URL(origin).hostname,key,keyLocation:origin+'/indexnow-key.txt',urlList:changed})});
   if(![200,202].includes(response.status))throw new Error('Submission returned '+response.status);
   mkdirSync('.cache',{recursive:true});writeFileSync(cachePath,JSON.stringify(current));await utils.cache.save(cachePath);
   console.log(`IndexNow: ${changed.length} changed URLs accepted (${response.status}). Indexing is not guaranteed.`);
  }catch(error){console.warn('IndexNow notification incomplete:',error.message);}
 }
};
