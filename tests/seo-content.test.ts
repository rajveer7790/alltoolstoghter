import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_TOOLS, INDEXABLE_TOOLS, TOOL_COUNT, bySlug } from '../lib/registry';
import { EDITORIAL } from '../lib/toolEditorial';
import { GUIDES } from '../lib/guides';
import { WORKFLOWS } from '../lib/workflows';
import { CONTENT_UPDATED } from '../lib/contentDates';
import { selectorSpecificity } from '../lib/calc/specificity';
import * as I from '../lib/calc/india';

test('catalog counts exclude aliases and all editorial links resolve',()=>{
 assert.equal(TOOL_COUNT,INDEXABLE_TOOLS.length); assert.ok(TOOL_COUNT<ALL_TOOLS.length);
 for(const [slug,e] of Object.entries(EDITORIAL)){ assert.ok(bySlug.has(slug),slug); assert.ok(e.table.rows.every(r=>r.length===e.table.headers.length)); for(const related of e.related || [])assert.ok(bySlug.has(related),related); }
 for(const g of GUIDES)for(const slug of g.tools)assert.ok(bySlug.has(slug),slug);
 for(const [slug,related]of Object.entries(WORKFLOWS)){assert.ok(bySlug.has(slug));for(const s of related)assert.ok(bySlug.has(s),s);}
 assert.match(CONTENT_UPDATED,/^\d{4}-\d{2}-\d{2}$/);
 assert.equal(bySlug.get('password-strength-checker')?.category,'developer');
});
test('CSS functional selectors use Selectors Level 4 specificity',()=>{
 for(const [input,expected]of [['#nav .item a:hover',[1,2,1]],[':where(#nav) a',[0,0,1]],[':is(.a, #id) p',[1,0,1]],[':not(:is(.a,#id))',[1,0,0]],['li:nth-child(2n of .a, #b)',[1,1,1]]] as const){const r=selectorSpecificity(input);assert.equal(r.error,'');assert.deepEqual([r.a,r.b,r.c],expected,input);}
 assert.ok(selectorSpecificity('a[').error);assert.ok(selectorSpecificity('& .x').error);
});
test('Indian financial models handle zero rate, deposit timing and inverse tax',()=>{
 assert.equal(I.emi({principal:12000,rate:0,months:12})[0].value,I.inr(1000));
 assert.equal(I.emi({principal:100000,rate:12,months:12})[0].value,I.inr(8884.878867834));
 assert.equal(I.sip({monthly:1000,rate:0,years:1})[0].value,I.inr(12000));
 assert.equal(I.sip({monthly:1000,rate:12,years:1,timing:'begin'})[0].value,I.inr(12809.328043328));
 assert.equal(I.indiaGst({amount:1180,rate:18,mode:'included',supply:'intra'})[1].value,I.inr(1000));
 assert.equal(I.indiaGst({amount:1000,rate:18,supply:'inter'})[3].value,I.inr(180));
 assert.equal(I.ppf({annual:1000,rate:7,years:1})[0].value,I.inr(1070));
 assert.equal(I.fd({principal:10000,rate:8,years:1,frequency:1})[0].value,I.inr(10800));
 assert.equal(I.rd({monthly:1000,rate:0,months:12})[0].value,I.inr(12000));
 assert.equal(I.epf({balance:0,employee:1000,employer:500,rate:0,years:1})[0].value,I.inr(18000));
 assert.equal(I.epf({balance:12000,employee:0,employer:0,rate:12,years:1})[0].value,I.inr(13440));
 assert.equal(I.gratuity({wage:26000,years:5,extraMonths:6})[0].value,I.inr(75000));
 assert.equal(I.gratuity({wage:26000,years:5,extraMonths:7})[0].value,I.inr(90000));
 assert.equal(I.hra({salary:600000,hra:240000,rent:240000,metro:'no'})[0].value,I.inr(180000));
 assert.equal(I.hra({salary:600000,hra:240000,rent:30000,metro:'no'})[0].value,I.inr(0));
});
test('AY 2026–27 rebates, marginal relief, cess and supported ceiling',()=>{
 assert.equal(I.incomeTax({taxable:1200000})[0].value,I.inr(0));
 assert.equal(I.incomeTax({taxable:1200000})[1].value,I.inr(179400));
 assert.equal(I.incomeTax({taxable:1200010})[0].value,I.inr(10));
 assert.equal(I.incomeTax({taxable:1210000})[0].value,I.inr(10400));
 assert.equal(I.incomeTax({taxable:1600000})[0].value,I.inr(124800));
 assert.equal(I.incomeTax({taxable:500000})[1].value,I.inr(0));
 assert.equal(I.incomeTax({taxable:5000010})[0].label,'Outside supported scope');
});

test('unbiased integer generator covers inclusive endpoints and rejects invalid intervals',async()=>{
 const {randomInteger}=await import('../lib/calc/random');
 const fill=(value:number)=>(a:Uint32Array)=>{a[0]=value;return a;};
 assert.equal(randomInteger(-3,3,fill(0)),-3);
 assert.equal(randomInteger(-3,3,fill(6)),3);
 assert.equal(randomInteger(7,7,fill(123)),7);
 assert.equal(randomInteger(0,4294967295,fill(4294967295)),4294967295);
 let calls=0;assert.equal(randomInteger(1,6,a=>{a[0]=calls++===0?4294967295:5;return a;}),6);assert.equal(calls,2);
 assert.throws(()=>randomInteger(2,1));assert.throws(()=>randomInteger(1.5,3));assert.throws(()=>randomInteger(0,4294967296));
});
