/** Rejection sampling, avoiding modulo bias for inclusive integer intervals. */
export function randomInteger(min:number,max:number,fill:(a:Uint32Array)=>Uint32Array=a=>crypto.getRandomValues(a)){
 if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||max<min||max-min>=4294967296)throw new Error('Use integer bounds spanning at most 2³² values.');
 const range=max-min+1,limit=Math.floor(4294967296/range)*range,a=new Uint32Array(1);do{fill(a);}while(a[0]>=limit);return min+a[0]%range;
}
