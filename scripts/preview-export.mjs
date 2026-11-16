// Local QA server for the static export; reproduces simple Netlify redirects and headers.
import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {handler} from '../netlify/functions/tool-embed.mjs';
const root=resolve('out');
const redirects=readFileSync(root+'/_redirects','utf8').split('\n').map(l=>l.trim().split(/\s+/)).filter(r=>r.length===3&&!r[0].includes('*'));
const headers=Object.fromEntries(readFileSync(root+'/_headers','utf8').split('\n\n')[0].split('\n').filter(l=>l.startsWith('  ')).map(l=>{const i=l.indexOf(':');return [l.slice(0,i).trim(),l.slice(i+1).trim()];}));
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.json':'application/json','.xml':'application/xml','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8','.css':'text/css'};
createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/.netlify/functions/tool-embed'){const r=await handler({queryStringParameters:Object.fromEntries(url.searchParams)});res.writeHead(r.statusCode,r.headers);return res.end(r.body);}
 const redirect=redirects.find(r=>r[0]===url.pathname);if(redirect){res.writeHead(Number(redirect[2]),{Location:redirect[1]+url.search});return res.end();}
 let path=resolve(root,'.'+decodeURIComponent(url.pathname));if(path!==root&&!path.startsWith(root+'/')){res.writeHead(403);return res.end();}
 if(path===root)path+='/index.html';else if(!existsSync(path)||statSync(path).isDirectory())path+='.html';
 const ok=existsSync(path)&&statSync(path).isFile();if(!ok)path=root+'/404.html';
 res.writeHead(ok?200:404,{...headers,'Content-Type':types[extname(path)]||'application/octet-stream'});res.end(readFileSync(path));
 }catch{res.writeHead(500);res.end('Preview error');}
}).listen(Number(process.argv[2])||4173,'0.0.0.0',()=>console.log('Static export preview on http://localhost:'+(process.argv[2]||4173)));
