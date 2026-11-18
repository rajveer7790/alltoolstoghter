import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';

const artifacts = resolve('document-audit'); mkdirSync(artifacts, { recursive: true });
const sample = await PDFDocument.create();
const font = await sample.embedFont(StandardFonts.Helvetica);
for (const width of [300,400,500]) sample.addPage([width,600]).drawText('Document ' + width, { x: 20, y: 500, font });
sample.getForm().createTextField('email').addToPage(sample.getPages()[0]);
const fixture = resolve(artifacts, 'sample.pdf'); writeFileSync(fixture, await sample.save());
const api = spawn(process.env.PYTHON || 'python', ['-m','uvicorn','backend.documents.app:app','--host','127.0.0.1','--port','8790','--no-access-log'], { stdio: 'ignore' });
const root = resolve('out');
const policy = readFileSync('public/_headers','utf8').split('\n').find(line => line.trim().startsWith('Content-Security-Policy:')).split('Content-Security-Policy: ')[1];
const mime = {'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain'};
const server = http.createServer(async (request,response) => {
  const url = new URL(request.url,'http://localhost');
  if (url.pathname.startsWith('/api/documents/')) {
    const forward = http.request({host:'127.0.0.1',port:8790,path:request.url.slice('/api/documents'.length),method:request.method,headers:request.headers}, result => {response.writeHead(result.statusCode,result.headers);result.pipe(response);});
    forward.on('error',()=>{response.writeHead(503,{'Content-Type':'application/json'});response.end('{"error":"Document service unavailable"}');});request.pipe(forward);return;
  }
  const path = resolve(root, '.' + decodeURIComponent(url.pathname));
  if (path !== root && !path.startsWith(root + sep)) {response.writeHead(403);response.end();return;}
  const file = [path,path+'.html',resolve(path,'index.html')].find(candidate=>existsSync(candidate)&&statSync(candidate).isFile());
  if (!file) {response.writeHead(404);response.end();return;}
  response.setHeader('Content-Type',mime[extname(file)] || 'application/octet-stream');
  response.setHeader('Content-Security-Policy',policy);
  response.end(readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}), args:['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader'] });
const context = await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true});
const failures=[], pageErrors=[], checks=[];
context.on('page',page=>page.on('pageerror',error=>pageErrors.push({url:page.url(),error:error.message})));
try {
  for (let attempt=0;attempt<60;attempt++) {try {if((await fetch('http://127.0.0.1:8790/health')).ok) break;} catch {} await new Promise(resolve=>setTimeout(resolve,500));}
  const page=await context.newPage();
  for(const width of [320,360,390,414,768,1024,1280]) {
    await page.setViewportSize({width,height:900});
    for(const path of ['/document-studio','/pdf/fill-pdf-forms','/pdf/pdf-to-word','/open-source']) {
      await page.goto(origin+path,{waitUntil:'networkidle'});
      const difference=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
      checks.push({path,width,overflow:difference});if(difference>1)failures.push({path,width,overflow:difference});
    }
  }
  await page.setViewportSize({width:1280,height:900});
  await page.goto(origin+'/document-studio',{waitUntil:'networkidle'});
  await page.screenshot({path:resolve(artifacts,'document-studio-desktop.png'),fullPage:false});
  const inventory=JSON.parse(readFileSync('lib/documents/tools.json','utf8'));
  for(const tool of inventory.filter(tool=>tool.mode==='local')) {
    await page.goto(origin+'/pdf/'+tool.id,{waitUntil:'networkidle'});
    await page.locator('input[type=file]').setInputFiles(tool.id==='alternate-merge-pdf'?[fixture,fixture]:fixture);
    if(tool.id==='fill-pdf-forms')await page.getByLabel('Field values (JSON)').fill('{"email":"new@example.test"}');
    console.log('Testing local operation:', tool.id);
    await page.getByRole('button',{name:'Process on my device',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.ds-result')||document.querySelector('.ds-error'));
    assert.equal(await page.locator('.ds-error').count(),0,tool.id+': '+(await page.locator('.ds-error').allTextContents()).join(' '));
    const download=page.waitForEvent('download');
    await page.getByRole('link',{name:'Download result'}).click();
    const saved=await download;const target=resolve(artifacts,tool.id+(tool.id==='pdf-to-json'?'.json':'.pdf'));await saved.saveAs(target);
    const bytes=readFileSync(target);
    if(tool.id==='pdf-to-json')assert.equal(JSON.parse(bytes).pages.length,3);
    else assert.ok((await PDFDocument.load(bytes)).getPageCount()>0,tool.id);
    checks.push({tool:tool.id,downloadBytes:bytes.length});
  }
  await page.goto(origin+'/pdf/pdf-to-word',{waitUntil:'networkidle'});
  const mode=page.getByLabel('Word output');
  assert.equal(await mode.inputValue(),'Editable document');
  assert.equal(await page.getByLabel('Output style').count(),0);
  assert.equal(await page.getByLabel('Recognize scanned pages with OCR').isChecked(),true);
  await page.getByLabel('Recognize scanned pages with OCR').uncheck();
  assert.equal(await page.getByLabel('OCR language').count(),0);
  await mode.selectOption('Basic text and tables');
  assert.equal(await page.getByLabel('Output style').isVisible(),true);
  await mode.selectOption('Page images (text not editable)');
  assert.equal(await page.getByLabel('Recognize scanned pages with OCR').count(),0);
  assert.equal(await page.getByLabel('Output style').count(),0);
  await mode.selectOption('Editable document');
  await page.getByLabel('Recognize scanned pages with OCR').check();
  checks.push({wordChoices:'editable default; relevant OCR/basic controls; explicit noneditable images'});
  const button=page.getByRole('button',{name:'Upload & process',exact:true});
  await page.locator('input[type=file]').setInputFiles(fixture);
  await button.waitFor({state:'visible'});
  await page.waitForFunction(()=>[...document.querySelectorAll('button')].some(button=>button.textContent==='Upload & process'&&!button.disabled));
  await button.click();
  await page.getByRole('link',{name:'Download result'}).waitFor();
  const blob=await page.getByRole('link',{name:'Download result'}).getAttribute('href');
  const bytes=await page.evaluate(async url=>Array.from(new Uint8Array(await(await fetch(url)).arrayBuffer())),blob);
  const docx=await JSZip.loadAsync(Buffer.from(bytes));assert.ok((await docx.file('word/document.xml').async('string')).includes('Document 300'));
  checks.push({tool:'pdf-to-word',editableDocx:true});
  await page.route('**/api/documents/capabilities',route=>route.fulfill({status:503,contentType:'application/json',body:'{}'}));
  await page.goto(origin+'/pdf/pdf-to-word',{waitUntil:'networkidle'});
  await page.locator('input[type=file]').setInputFiles(fixture);
  await page.getByText('This processing service is unavailable right now.',{exact:false}).waitFor();
  assert.equal(await button.isDisabled(),true);
  checks.push({unavailableServer:'disabled with explanation'});
  await page.unroute('**/api/documents/capabilities');
  await page.setViewportSize({width:390,height:844});await page.goto(origin+'/document-studio',{waitUntil:'networkidle'});await page.screenshot({path:resolve(artifacts,'document-studio-mobile.png'),fullPage:true});
  await page.setViewportSize({width:1280,height:900});
  await page.goto(origin+'/pdf-editor/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!!window.wasmBindings&&document.getElementById('pdfcraft')?.width>0,null,{timeout:120000});
  await page.screenshot({path:resolve(artifacts,'pdf-editor.png'),fullPage:false});
  checks.push({pdfEditor:'checksum-pinned WebAssembly initialized with production CSP'});
  assert.equal(failures.length,0,JSON.stringify(failures));
  assert.equal(pageErrors.length,0,JSON.stringify(pageErrors));
  const summary={checks:checks.length,layoutChecks:checks.filter(c=>'overflow'in c).length,localDownloads:inventory.filter(t=>t.mode==='local').length,maximumOverflow:Math.max(...checks.filter(c=>'overflow'in c).map(c=>c.overflow)),failures,pageErrors};
  writeFileSync(resolve(artifacts,'report.json'),JSON.stringify({summary,checks},null,2));console.log(JSON.stringify(summary,null,2));
} finally {await context.close();await browser.close();api.kill();await new Promise(resolve=>server.close(resolve));}
