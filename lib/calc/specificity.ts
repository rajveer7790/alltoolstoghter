import { calculate } from 'specificity';
export function selectorSpecificity(selector: string) {
  try {
    if (!selector.trim()) return { a:0,b:0,c:0,error:'' };
    if (selector.includes('&')) return { a:0,b:0,c:0,error:'Expand nested & selectors in their parent context first.' };
    const { A:a, B:b, C:c } = calculate(selector);
    return {a,b,c,error:''};
  } catch { return {a:0,b:0,c:0,error:'Enter one valid selector. Evaluate each selector in a comma-separated list separately.'}; }
}
