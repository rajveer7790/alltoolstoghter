import type { Metadata } from 'next';
import { SITE } from './registry';
export function socialMetadata(base: Metadata): Metadata {
 const title=typeof base.title==='string'?base.title:SITE.name;
 const description=base.description || SITE.description;
 const canonical=typeof base.alternates?.canonical==='string'?base.alternates.canonical:'/';
 return {...base,openGraph:{title:`${title} | ${SITE.name}`,description,url:canonical,siteName:SITE.name,type:'website',images:[{url:'/opengraph-image.png',width:1200,height:630,alt:SITE.name}]},twitter:{card:'summary_large_image',title:`${title} | ${SITE.name}`,description,images:['/opengraph-image.png']}};
}
