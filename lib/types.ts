export type CatKey = 'finance' | 'health' | 'math' | 'date-time' | 'unit-converters' | 'text' | 'developer' | 'seo' | 'pdf' | 'image' | 'writing' | 'real-estate' | 'construction' | 'cooking' | 'science' | 'statistics' | 'business' | 'investing' | 'tax';

export interface Category { key: CatKey; name: string; tagline: string; accent: string; }

export interface Field {
  key: string; label: string;
  type: 'number' | 'select' | 'text' | 'date';
  def?: number | string;
  min?: number; max?: number; step?: number;
  unit?: string;
  options?: { value: string; label: string }[];
  help?: string;
}

export interface CalcResult { label: string; value: string; main?: boolean; }

export interface ToolDef {
  slug: string;
  name: string;
  short: string;
  category: CatKey;
  prio: 'P1' | 'P2' | 'P3';
  keywords: string[];
  widget: string;
  fields?: Field[];
  converterKind?: string;
  textKind?: string;
  transformKey?: string;
  dataset?: string;
  metaDescription?: string;
  content: { intro: string; how: string; howSteps?: string[]; faqs: [string, string][] };
  related: string[];
}
