import { ToolDef } from '../types';

export const SEO: ToolDef[] = [
{
  slug: 'qr-code-generator', name: 'QR Code Generator', prio: 'P1', category: 'seo', widget: 'qrcode',
  short: 'Create custom QR codes for URLs, text, or contact details.',
  metaDescription: 'Generate custom QR codes online for free. Convert URLs and text into scannable QR codes entirely in your browser with no tracking.',
  keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code'],
  content: {
    intro: 'Generate a high-resolution QR code for any URL or text, customize its colors and error-correction level, and download it as a PNG — all securely in your browser.',
    how: 'The tool encodes your text into the QR matrix and renders it to a canvas. Higher error-correction levels add redundancy so the code still scans if part of it is covered or damaged, at the cost of density.',
    howSteps: [
      'Type or paste your URL or text into the input field.',
      'Optionally adjust colors, styling, and error-correction levels.',
      'The QR code generates locally; click download to save the PNG file instantly.'
    ],
    faqs: [
      ['Do these QR codes expire?', 'No — these are static codes that encode your data directly. They work forever and have no scan limits or tracking.'],
      ['What is error correction?', 'Redundant data that lets a code be read even if damaged or partly covered. High (30%) is best if you overlay a logo.'],
      ['Can I change the colors?', 'Yes — but keep strong contrast (dark on light) so scanners read it reliably.'],
    ],
  },
  related: ['barcode-generator', 'url-shortener', 'utm-link-builder', 'open-graph-generator'],
},
{
  slug: 'barcode-generator', name: 'Barcode Generator', prio: 'P2', category: 'seo', widget: 'barcode',
  short: 'Generate CODE128, EAN-13, UPC and more as downloadable SVG.',
  metaDescription: 'Free Barcode Generator. Create scannable CODE128, EAN-13, and UPC barcodes online safely without uploading your data. Download crisp SVGs instantly.',
  keywords: ['barcode generator', 'ean 13 generator', 'code 128 barcode', 'upc generator'],
  content: {
    intro: 'Create scannable barcodes in common retail and logistics formats — CODE128, EAN-13, UPC, CODE39 and others — and download them as crisp, scalable SVG files.',
    how: 'The tool encodes your value into the bar pattern for the chosen symbology and renders it as vector SVG, validating that the value matches each format\'s rules (for example, EAN-13 requires 12–13 digits).',
    howSteps: [
      'Select your required barcode format (e.g., EAN-13, UPC, CODE128).',
      'Enter the numerical or text value according to the format rules.',
      'The barcode is rendered instantly; download the vector SVG for packaging.'
    ],
    faqs: [
      ['Which format should I use?', 'CODE128 accepts any text and is great for internal labels. EAN-13 and UPC are for retail products and need specific digit counts.'],
      ['Why is my value invalid?', 'Each format has rules — EAN-13 needs 12 or 13 digits, UPC needs 12. Switch to CODE128 to encode arbitrary text.'],
      ['Why SVG instead of PNG?', 'SVG stays sharp at any print size, which matters for reliable scanning on packaging and labels.'],
    ],
  },
  related: ['qr-code-generator', 'number-base-converter', 'hash-generator', 'uuid-generator'],
},
{
  slug: 'password-strength-checker', name: 'Password Strength Checker', prio: 'P1', category: 'seo', widget: 'passwordstrength',
  short: 'Estimate password entropy, crack time, and weaknesses.',
  metaDescription: 'Password Strength Checker online. Securely evaluate password entropy and crack time locally in your browser. Passwords are never sent to a server.',
  keywords: ['password strength checker', 'password strength test', 'how strong is my password'],
  content: {
    intro: 'Test how strong a password is — its estimated entropy, how long it would take to crack offline, and specific weaknesses to fix — without your password ever leaving your device.',
    how: 'The checker measures the character pool and length to estimate entropy in bits, then flags common patterns: short length, single character types, repeats, keyboard sequences, and known weak words. Crack time assumes a fast offline attack of about 10 billion guesses per second.',
    howSteps: [
      'Type a sample password into the input field.',
      'The client-side algorithm calculates entropy based on character sets and length.',
      'Review the estimated crack time and read suggestions to improve password strength.'
    ],
    faqs: [
      ['Is my password sent anywhere?', 'No — all analysis runs locally in your browser. Nothing is transmitted, logged, or stored.'],
      ['What makes a password strong?', 'Length above all, plus a mix of character types and no predictable patterns or dictionary words. A long passphrase beats a short complex one.'],
      ['What is entropy in bits?', 'A measure of unpredictability. Each extra bit doubles the guesses needed; 60+ bits is reasonable, 80+ is strong.'],
    ],
  },
  related: ['password-generator', 'hash-generator', 'uuid-generator', 'base64-encode-decode'],
},
{
  slug: 'utm-link-builder', name: 'UTM Link Builder', prio: 'P1', category: 'seo', widget: 'utm',
  short: 'Add UTM tracking parameters to campaign URLs.',
  metaDescription: 'Free UTM Link Builder online. Construct analytics-ready tracking URLs quickly and privately in your browser to monitor marketing campaigns.',
  keywords: ['utm builder', 'utm link builder', 'campaign url builder', 'utm generator'],
  content: {
    intro: 'Build trackable campaign URLs by adding UTM parameters, so analytics tools can attribute traffic to the exact source, medium, and campaign that drove each visit.',
    how: 'The builder appends utm_source, utm_medium, and utm_campaign (plus optional term and content) as query parameters, URL-encoding each value. Analytics platforms read these to group and report your traffic.',
    howSteps: [
      'Provide your base destination URL.',
      'Fill in campaign source, medium, and campaign name.',
      'The builder generates the final URL with properly encoded UTM parameters.'
    ],
    faqs: [
      ['What are the three required parameters?', 'Source (where, e.g. newsletter), medium (how, e.g. email), and campaign (which initiative). Term and content are optional.'],
      ['Do UTMs affect SEO?', 'They do not help rankings and can cause duplicate-URL issues if indexed. Use them on campaign links, not internal navigation, and set canonicals.'],
      ['Are values case-sensitive?', 'Yes — Email and email are counted separately. Pick a lowercase convention and stick to it.'],
    ],
  },
  related: ['qr-code-generator', 'url-encode-decode', 'meta-tag-generator', 'open-graph-generator'],
},
{
  slug: 'robots-txt-generator', name: 'Robots.txt Generator', prio: 'P2', category: 'seo', widget: 'robots',
  short: 'Create a valid robots.txt to guide search crawlers.',
  metaDescription: 'Generate a robots.txt file online for free. Configure SEO crawler rules securely in-browser to guide Google and Bing efficiently.',
  keywords: ['robots txt generator', 'create robots.txt', 'robots.txt maker'],
  content: {
    intro: 'Generate a correct robots.txt file to tell search engine crawlers which parts of your site to crawl or skip, with your sitemap location included.',
    how: 'The file uses the Robots Exclusion Standard: a User-agent line followed by Allow/Disallow rules. The tool builds common policies — allow everything, block everything, or allow with specific exclusions — and appends your sitemap URL.',
    howSteps: [
      'Select a preset policy (Allow All, Disallow All, or Custom).',
      'Add specific directories to block or allow.',
      'Provide your XML sitemap URL to output a fully compliant robots.txt text.'
    ],
    faqs: [
      ['Does Disallow hide a page from Google?', 'No — it asks crawlers not to crawl it, but it can still be indexed if linked. To keep a page out of results, use a noindex meta tag instead.'],
      ['Where does robots.txt go?', 'At your domain root, reachable at https://yourdomain.com/robots.txt. It only applies to that exact host.'],
      ['Should I block staging sites?', 'Block all crawlers on staging, but never rely on it for security — it is a public file and only a polite request.'],
    ],
  },
  related: ['xml-sitemap-generator', 'meta-tag-generator', 'htaccess-redirect-generator', 'open-graph-generator'],
},
{
  slug: 'xml-sitemap-generator', name: 'XML Sitemap Generator', prio: 'P2', category: 'seo', widget: 'sitemap',
  short: 'Turn a list of URLs into a valid XML sitemap.',
  metaDescription: 'Free XML Sitemap Generator. Convert URL lists into standard, search engine compliant XML sitemaps securely right in your browser.',
  keywords: ['xml sitemap generator', 'sitemap generator', 'create sitemap xml'],
  content: {
    intro: 'Create a standards-compliant XML sitemap from a list of your URLs, with optional last-modified dates and change frequency, ready to submit to search engines.',
    how: 'Each URL becomes a <url> entry inside a <urlset>, following the sitemaps.org schema. Ampersands are escaped, and you can add a lastmod date and a changefreq hint to each entry.',
    howSteps: [
      'Paste your raw list of URLs into the input field.',
      'Configure global options for change frequency and last-modified dates.',
      'The generator outputs valid XML code ready to save as sitemap.xml.'
    ],
    faqs: [
      ['Why submit a sitemap?', 'It helps search engines discover all your pages, especially new or deep ones that internal links reach slowly.'],
      ['How do I submit it?', 'Upload the file to your site, reference it in robots.txt, and submit the URL in Google Search Console and Bing Webmaster Tools.'],
      ['Does changefreq guarantee crawl timing?', 'No — it is a hint. Search engines decide crawl frequency from their own signals, but accurate lastmod dates do help.'],
    ],
  },
  related: ['robots-txt-generator', 'meta-tag-generator', 'utm-link-builder', 'htaccess-redirect-generator'],
},
{
  slug: 'meta-tag-generator', name: 'Meta Tag Generator', prio: 'P2', category: 'seo', widget: 'metatag',
  short: 'Generate SEO title, description, and meta tags.',
  metaDescription: 'Free Meta Tag Generator. Produce perfectly sized SEO titles and descriptions. Get live character feedback locally in your browser.',
  keywords: ['meta tag generator', 'seo meta tags', 'meta description generator'],
  content: {
    intro: 'Generate the essential HTML meta tags for SEO — title, description, robots, viewport, and more — with live character counts that flag when your title or description runs too long for search results.',
    how: 'The tool assembles valid <head> tags, escaping special characters, and shows live length feedback. It targets the practical limits search engines use when truncating titles (~60 characters) and descriptions (~160 characters).',
    howSteps: [
      'Enter your desired page title and observe the real-time character count.',
      'Enter your page meta description while adhering to the 160-character threshold.',
      'Copy the output HTML block and paste it directly into your website\'s <head> section.'
    ],
    faqs: [
      ['Do meta keywords still matter?', 'No — Google has ignored the keywords tag for years. It is included for completeness but is optional and low value.'],
      ['How long should my title be?', 'Aim for roughly 50–60 characters so it is not cut off in search results, with your primary keyword near the front.'],
      ['What does the robots tag do?', 'It controls indexing per page: index/noindex decides whether the page appears in results, follow/nofollow whether links are crawled.'],
    ],
  },
  related: ['open-graph-generator', 'xml-sitemap-generator', 'robots-txt-generator', 'utm-link-builder'],
},
{
  slug: 'open-graph-generator', name: 'Open Graph Generator', prio: 'P2', category: 'seo', widget: 'opengraph',
  short: 'Generate Open Graph and Twitter Card meta tags.',
  metaDescription: 'Open Graph Generator online. Create valid OG tags and Twitter Cards for social media previews. Works entirely locally for your privacy.',
  keywords: ['open graph generator', 'og tags generator', 'twitter card generator', 'social meta tags'],
  content: {
    intro: 'Generate Open Graph and Twitter Card meta tags that control how your pages look when shared on Facebook, LinkedIn, Slack, and X — title, description, and the all-important preview image.',
    how: 'The tool builds og: property tags and matching twitter: tags, escaping special characters. Platforms read these from your page head to render a rich link preview instead of a bare URL.',
    howSteps: [
      'Fill in the title, description, and canonical URL of your page.',
      'Add the absolute URL of your featured preview image.',
      'The engine formats all fields into valid Open Graph and Twitter Card HTML snippets.'
    ],
    faqs: [
      ['What image size should I use?', 'A 1200×630 px image (1.91:1) is the safe choice for large previews across platforms.'],
      ['Why is my preview not updating?', 'Platforms cache previews. Use Facebook\'s Sharing Debugger or LinkedIn\'s Post Inspector to force a re-scrape.'],
      ['Do I need both OG and Twitter tags?', 'Twitter falls back to Open Graph, but explicit twitter:card tags give you more control over the X appearance.'],
        ['How do I test my Open Graph tags?', 'Use the Facebook Sharing Debugger (developers.facebook.com/tools/debug), LinkedIn Post Inspector, or the Iframely validator to preview how your link will appear when shared.'],
      ],
  },
  related: ['meta-tag-generator', 'qr-code-generator', 'utm-link-builder', 'xml-sitemap-generator'],
},
{
  slug: 'htaccess-redirect-generator', name: 'Htaccess Redirect Generator', prio: 'P3', category: 'seo', widget: 'htaccess',
  short: 'Generate Apache 301 redirects and HTTPS/www rules.',
  metaDescription: 'Free Htaccess Redirect Generator. Securely generate Apache rewrite rules, 301 redirects, and HTTPS enforces directly from your browser.',
  keywords: ['htaccess redirect generator', '301 redirect generator', 'htaccess generator'],
  content: {
    intro: 'Generate ready-to-paste .htaccess rules for Apache servers — single-page 301 redirects, force HTTPS, www to non-www (or the reverse), and trailing-slash normalization.',
    how: 'The rules use Apache\'s mod_rewrite. A 301 status tells search engines the move is permanent so ranking signals transfer. The tool produces the RewriteEngine, RewriteCond, and RewriteRule lines for each common scenario.',
    howSteps: [
      'Choose the type of redirect required (e.g., domain change, HTTPS enforcement).',
      'Provide your old and new URLs where applicable.',
      'The generator outputs Apache-compliant .htaccess code ready for copy-pasting.'
    ],
    faqs: [
      ['301 vs 302 redirect?', 'Use 301 for permanent moves so search engines pass ranking signals to the new URL. 302 is temporary and keeps the old URL indexed.'],
      ['Where do these rules go?', 'In the .htaccess file in your site root on an Apache server. Nginx uses a different syntax.'],
      ['Why force HTTPS and one www variant?', 'Serving one canonical version avoids duplicate-content dilution and ensures every visitor lands on the secure address.'],
    ],
  },
  related: ['robots-txt-generator', 'xml-sitemap-generator', 'meta-tag-generator', 'url-encode-decode'],
},
{
  slug: 'url-shortener', name: 'URL Shortener', prio: 'P1', category: 'seo', widget: 'urlshortener',
  short: 'Create short, shareable links with optional custom aliases.',
  metaDescription: 'Private URL Shortener. Run your own short link service that integrates with your personal backend infrastructure ensuring you own all your data.',
  keywords: ['url shortener', 'short link generator', 'link shortener', 'custom short url'],
  content: {
    intro: 'Shorten long URLs into clean, shareable links — with optional custom aliases — powered by your own self-hosted backend, so you own every link and its click data.',
    how: 'Unlike calculators on this site, a URL shortener must store the link-to-destination mapping on a server and redirect visitors. All Tools Together ships an independent backend service (in the project\'s /backend folder) that handles this; once deployed, this tool creates links and counts clicks through it.',
    howSteps: [
      'Paste your lengthy destination URL into the shortening field.',
      'Provide an optional custom alias text (e.g., /my-sale).',
      'The app communicates with your self-hosted backend to generate and track the short link permanently.'
    ],
    faqs: [
      ['Why does this tool need a backend?', 'Short links must be stored somewhere and resolve a redirect when visited — that requires a server and a database, unlike the browser-only tools here.'],
      ['Can I use a custom alias?', 'Yes — choose your own memorable alias (3–32 letters, numbers, hyphens, or underscores), as long as it is not already taken.'],
      ['Who owns the links and click data?', 'You do — the backend runs on your own hosting, so nothing is shared with a third-party shortener.'],
    ],
  },
  related: ['qr-code-generator', 'utm-link-builder', 'open-graph-generator', 'meta-tag-generator'],
},
];
