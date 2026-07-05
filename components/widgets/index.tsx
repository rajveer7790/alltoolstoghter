import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { ToolDef } from '@/lib/types';

const REGISTRY: Record<string, ComponentType<any>> = {
  calc: dynamic(() => import('./CalcWidget')),
  converter: dynamic(() => import('./ConverterWidget')),
  text: dynamic(() => import('./TextWidget')),
  wordcounter: dynamic(() => import('./WordCounter')),
  lorem: dynamic(() => import('./LoremWidget')),
  json: dynamic(() => import('./JsonFormatter')),
  base64: dynamic(() => import('./Base64Widget')),
  urlencode: dynamic(() => import('./UrlEncodeWidget')),
  uuid: dynamic(() => import('./UuidWidget')),
  hash: dynamic(() => import('./HashWidget')),
  password: dynamic(() => import('./PasswordWidget')),
  color: dynamic(() => import('./ColorWidget')),
  unixtime: dynamic(() => import('./UnixTimeWidget')),
  regex: dynamic(() => import('./RegexWidget')),
  jwt: dynamic(() => import('./JwtWidget')),
  csvjson: dynamic(() => import('./CsvJsonWidget')),
  diff: dynamic(() => import('./DiffWidget')),
  readability: dynamic(() => import('./ReadabilityWidget')),
  findreplace: dynamic(() => import('./FindReplaceWidget')),
  devtransform: dynamic(() => import('./DevTransformWidget')),
  numberbase: dynamic(() => import('./NumberBaseWidget')),
  fuel: dynamic(() => import('./FuelEconomyWidget')),
  gradient: dynamic(() => import('./GradientWidget')),
  boxshadow: dynamic(() => import('./BoxShadowWidget')),
  palette: dynamic(() => import('./PaletteWidget')),
  cron: dynamic(() => import('./CronWidget')),
  reference: dynamic(() => import('./ReferenceWidget')),
  keyworddensity: dynamic(() => import('./KeywordDensityWidget')),
  timezone: dynamic(() => import('./TimeZoneWidget')),
  utm: dynamic(() => import('./UtmBuilderWidget')),
  robots: dynamic(() => import('./RobotsTxtWidget')),
  sitemap: dynamic(() => import('./SitemapWidget')),
  metatag: dynamic(() => import('./MetaTagWidget')),
  opengraph: dynamic(() => import('./OpenGraphWidget')),
  htaccess: dynamic(() => import('./HtaccessWidget')),
  passwordstrength: dynamic(() => import('./PasswordStrengthWidget')),
  qrcode: dynamic(() => import('./QrCodeWidget')),
  barcode: dynamic(() => import('./BarcodeWidget')),
  pdfmerge: dynamic(() => import('./pdf/MergePdfWidget')),
  pdfsplit: dynamic(() => import('./pdf/SplitPdfWidget')),
  pdfrotate: dynamic(() => import('./pdf/RotatePdfWidget')),
  pdfdelete: dynamic(() => import('./pdf/DeletePagesWidget')),
  pdfextract: dynamic(() => import('./pdf/ExtractPagesWidget')),
  pdfreorder: dynamic(() => import('./pdf/ReorderPdfWidget')),
  pdfpagenumbers: dynamic(() => import('./pdf/PageNumbersWidget')),
  pdfwatermark: dynamic(() => import('./pdf/WatermarkPdfWidget')),
  imagestopdf: dynamic(() => import('./pdf/ImagesToPdfWidget')),
  pdfmetadata: dynamic(() => import('./pdf/EditMetadataWidget')),
  pdftoimages: dynamic(() => import('./pdf/PdfToImagesWidget')),
  pdftotext: dynamic(() => import('./pdf/PdfToTextWidget')),
  pdfinfo: dynamic(() => import('./pdf/PdfInfoWidget')),
  urlshortener: dynamic(() => import('./UrlShortenerWidget')),
  currencyconverter: dynamic(() => import('./CurrencyConverterWidget')),
  scientificcalculator: dynamic(() => import('./ScientificCalculatorWidget')),
  cssspecificity: dynamic(() => import('./CssSpecificityWidget')),
  pdftomarkdown: dynamic(() => import('./pdf/PdfToMarkdownWidget')),
  markdowntopdf: dynamic(() => import('./pdf/MarkdownToPdfWidget')),
  markdowntable: dynamic(() => import('./MarkdownTableWidget')),
  markdownpreview: dynamic(() => import('./MarkdownPreviewWidget')),
  colorblindness: dynamic(() => import('./image/ColorBlindnessWidget')),
  imageconverter: dynamic(() => import('./image/ImageConverterWidget')),
  imageresizer: dynamic(() => import('./image/ImageResizerWidget')),
  imagecropper: dynamic(() => import('./image/ImageCropperWidget')),
  imagecompressor: dynamic(() => import('./image/ImageCompressorWidget')),
  imagerotator: dynamic(() => import('./image/ImageRotatorWidget')),
  imagecolorpicker: dynamic(() => import('./image/ImageColorPickerWidget')),
  imagetobase64: dynamic(() => import('./image/ImageToBase64Widget')),
  paletteextractor: dynamic(() => import('./image/PaletteExtractorWidget')),
  imagewatermark: dynamic(() => import('./image/ImageWatermarkWidget')),
  favicongenerator: dynamic(() => import('./image/FaviconGeneratorWidget')),
  grammarchecker: dynamic(() => import('./GrammarCheckerWidget')),
  paraphrase: dynamic(() => import('./ParaphraseWidget')),
  plagiarism: dynamic(() => import('./PlagiarismWidget')),
};

export default function ToolWidget({ tool }: { tool: ToolDef }) {
  const W = REGISTRY[tool.widget];
  if (!W) return null;
  if (tool.widget === 'calc') return <W slug={tool.slug} fields={tool.fields ?? []} />;
  if (tool.widget === 'converter') {
    let preset;
    const p = tool.fields?.find(f => f.key === '_preset')?.def;
    if (typeof p === 'string' && p) { try { preset = JSON.parse(p); } catch {} }
    return <W kind={tool.converterKind ?? 'length'} preset={preset} />;
  }
  if (tool.widget === 'text') return <W kind={tool.textKind ?? ''} />;
  if (tool.widget === 'devtransform') return <W transformKey={tool.transformKey ?? ''} />;
  if (tool.widget === 'reference') return <W dataset={tool.dataset ?? 'http'} />;
  if (tool.widget === 'pdftoimages') return <W format={tool.dataset === 'jpeg' ? 'jpeg' : 'png'} />;
  if (tool.widget === 'imageconverter') return <W to={tool.dataset} />;
  return <W />;
}
