import test from 'node:test';
import assert from 'node:assert/strict';
import {handler} from '../../netlify/functions/tool-embed.mjs';
test('isolated embeds expose only fixed widget variants and do not weaken main-site headers',async()=>{
 for(const tool of ['mortgage','cm','<script>alert(1)</script>']){const response=await handler({queryStringParameters:{tool}});assert.equal(response.statusCode,200);assert.match(response.headers['Content-Security-Policy'],/frame-ancestors \*/);assert.equal(response.headers['X-Robots-Tag'],'noindex, follow');assert.doesNotMatch(response.body,/<script>alert\(1\)/);assert.doesNotMatch(response.body,/fetch\(/);}
});
