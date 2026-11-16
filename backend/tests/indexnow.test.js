import test from 'node:test';
import assert from 'node:assert/strict';
import plugin from '../../netlify/plugins/indexnow/index.js';
test('deploy previews never notify search engines',async()=>{
 const previous=process.env.CONTEXT;process.env.CONTEXT='deploy-preview';
 let touched=false;try{await plugin.onSuccess({constants:new Proxy({},{get(){touched=true;throw new Error('Unexpected build access');}}),utils:{}});assert.equal(touched,false);}finally{if(previous===undefined)delete process.env.CONTEXT;else process.env.CONTEXT=previous;}
});
