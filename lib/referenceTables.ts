import { INGREDIENTS } from './calc/cooking';
import type { ToolDef } from './types';
import { UNIT_KINDS, convertUnit } from './calc/units';
import type { Editorial } from './toolEditorial';
export function referenceTable(tool:ToolDef):Editorial['table']|undefined {
 if(tool.slug==='grams-to-cups-converter')return {caption:'Ingredient assumptions used by this calculator; packing and brands vary',headers:['Ingredient','Grams per modeled cup','Grams per ½ cup'],rows:Object.values(INGREDIENTS).map(i=>[i.label,String(i.g_per_cup),String(i.g_per_cup/2)])};
 if(['salary-calculator','hourly-to-salary-calculator'].includes(tool.slug))return {caption:'Gross pay examples assuming 40 paid hours each week and 52 paid weeks; before tax and benefits',headers:['Hourly rate','Annual gross','Monthly average gross'],rows:[15,20,25,30,40,50].map(n=>['$'+n,'$'+(n*2080).toLocaleString('en-US'),'$'+(n*2080/12).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})])};
 if(tool.widget!=='converter')return;
 const kind=tool.converterKind || 'length',units=UNIT_KINDS[kind];if(!units)return;
 let preset:{from?:string;to?:string}={};try{preset=JSON.parse(String(tool.fields?.find(f=>f.key==='_preset')?.def || '{}'));}catch{}
 const keys=Object.keys(units.units),from=preset.from || keys[0],to=preset.to || keys[1];
 if(!units.units[from]||!units.units[to])return;
 const fmt=(n:number)=>Number(n.toPrecision(9)).toLocaleString('en-US',{maximumSignificantDigits:9});
 return {caption:`${units.units[from].label} to ${units.units[to].label}: rounded reference values`,headers:[units.units[from].label,units.units[to].label],rows:[0,1,5,10,25,50,100].map(n=>[String(n),fmt(convertUnit(kind,n,from,to)!)])};
}
