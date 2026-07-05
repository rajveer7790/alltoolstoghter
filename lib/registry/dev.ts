import { ToolDef } from '../types';

export const DEV: ToolDef[] = [
{
  slug: 'json-formatter', name: 'JSON Formatter & Validator', prio: 'P1', category: 'developer', widget: 'json',
  short: 'Format, validate, and minify JSON with precise error messages.',
  metaDescription: 'Free online JSON formatter and validator. Beautify, parse, and minify JSON safely in your browser. Find syntax errors instantly with precise line numbers.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'format json online', 'json parser'],
  content: {
    intro: 'Paste JSON to pretty-print it with proper indentation, validate it with a precise error position, or minify it for transport — all in your browser, nothing uploaded.',
    how: 'The native JSON.parse does the validation (the same parser your runtime uses), so what passes here passes in production. Formatting re-serializes with 2-space indentation; minify strips all insignificant whitespace.',
    howSteps: [
      'Paste your raw JSON string into the editor area.',
      'The tool will instantly validate the syntax and highlight any structural errors.',
      'Click "Format" to beautify the output, or "Minify" to strip whitespace for production.'
    ],
    faqs: [
      ['Why did my JSON fail validation due to a trailing comma?', 'The JSON specification is much stricter than JavaScript: it strictly forbids trailing commas, comments, and single quotes. The validator highlights exactly where this happens.'],
      ['Is my sensitive data completely safe to paste?', 'Yes. The parsing executes locally in your browser memory. However, as a best practice, you should always avoid pasting live production secrets into any web tool.'],
      ['What is the exact difference between JSON and JavaScript object literals?', 'JSON requires double-quoted keys and strings, and strictly limits data types (no undefined, no functions, no Dates).']
    ],
  },
  related: ['sql-formatter', 'base64-encode-decode', 'url-encode-decode', 'hash-generator'],
},
{
  slug: 'base64-encode-decode', name: 'Base64 Encode / Decode', prio: 'P1', category: 'developer', widget: 'base64',
  short: 'UTF-8-safe Base64 encoding and decoding in the browser.',
  metaDescription: 'Encode and decode Base64 strings online safely. Fully supports UTF-8, Emoji, and international characters. Local, private, and fast Base64 converter.',
  keywords: ['base64 decode', 'base64 encode', 'base64 converter', 'decode base64 online'],
  content: {
    intro: 'Encode text to Base64 or decode Base64 back to text — with correct handling of emoji and international characters that breaks naive implementations.',
    how: 'Text is first encoded to UTF-8 bytes (TextEncoder), then Base64-encoded — the order that makes Unicode survive. Decoding reverses it: Base64 → bytes → UTF-8 text, with clear errors for invalid input.',
    howSteps: [
      'Choose whether you want to Encode text to Base64, or Decode Base64 back to text.',
      'Paste your string into the input field.',
      'The engine immediately processes the text, correctly handling complex UTF-8 characters and emojis.'
    ],
    faqs: [
      ['Why does the standard Javascript "btoa" fail on emojis?', 'The native btoa function only handles Latin-1 strings. Unicode characters must be UTF-8 encoded into bytes first — a step this tool does automatically.'],
      ['Is Base64 considered encryption?', 'No. Base64 is merely a data encoding format, which is trivially reversible by anyone. Never use it to protect passwords or secrets.'],
      ['Why does encoded Base64 text often end with an "=" sign?', 'It is padding. Base64 processes data in 3-byte groups. The equals sign pads the final block when the input length isn\'t a clean multiple of 3.']
    ],
  },
  related: ['url-encode-decode', 'json-formatter', 'hash-generator', 'uuid-generator'],
},
{
  slug: 'url-encode-decode', name: 'URL Encode / Decode', prio: 'P2', category: 'developer', widget: 'urlencode',
  short: 'Percent-encode text for URLs, or decode %20s back to readable text.',
  metaDescription: 'URL Encode and Decode text instantly. Convert spaces to %20 and properly escape URL strings safely in your browser. Free percent-encoding tool.',
  keywords: ['url encode', 'url decoder', 'percent encoding', 'url encode online'],
  content: {
    intro: 'Make any text safe for URLs (spaces → %20, & → %26) or decode an encoded URL back into readable form.',
    how: 'Uses encodeURIComponent/decodeURIComponent — the component-level functions that encode every reserved character, correct for query-string values. Invalid percent sequences produce a clear error instead of silent corruption.',
    howSteps: [
      'Select your operation: Encode (to make text URL-safe) or Decode.',
      'Paste your text or URL string into the box.',
      'Copy the safely percent-encoded (or decoded) string.'
    ],
    faqs: [
      ['What is the difference between encodeURI and encodeURIComponent?', 'encodeURI preserves structural URL characters like /, ?, and &. encodeURIComponent aggressively encodes those too, making it the correct choice for URL query parameters.'],
      ['Why did my URL decoding fail?', 'A stray % symbol not followed by two valid hex digits constitutes a malformed sequence. You must find and fix the broken sequence in your string.'],
      ['Should a space be encoded as %20 or a plus (+)?', '%20 is the modern web standard. The + symbol means space only inside strictly form-encoded query strings.']
    ],
  },
  related: ['base64-encode-decode', 'slug-generator', 'json-formatter', 'uuid-generator'],
},
{
  slug: 'uuid-generator', name: 'UUID Generator', prio: 'P2', category: 'developer', widget: 'uuid',
  short: 'Cryptographically random UUID v4s, singly or in bulk.',
  metaDescription: 'Generate secure, cryptographically random UUID v4 (GUID) strings instantly. Create one or bulk generate thousands locally in your browser.',
  keywords: ['uuid generator', 'guid generator', 'uuid v4', 'generate uuid', 'random guid'],
  content: {
    intro: 'Generate version-4 UUIDs backed by the browser\'s cryptographic random source — one at a time or in bulk for seeding databases and fixtures.',
    how: 'Uses crypto.randomUUID(), the platform implementation of RFC 4122 v4: 122 random bits from a CSPRNG, formatted as the familiar 8-4-4-4-12 hex string.',
    howSteps: [
      'Enter the total number of UUIDs you want to generate in bulk (e.g., 1 or 500).',
      'The browser\'s local cryptographic engine calculates completely random v4 UUIDs.',
      'Copy the resulting list to use as primary keys or database seeds.'
    ],
    faqs: [
      ['Can two randomly generated UUIDs collide?', 'Theoretically yes, but practically impossible. You would need to generate billions of UUIDs per second for decades to even expect a single collision.'],
      ['What is the difference between UUID v4 and v7?', 'Version 4 is pure cryptographic randomness. Version 7 embeds a timestamp to allow database-friendly sorting, though v4 remains the universal standard.'],
      ['Are these secure enough for session tokens?', 'While the randomness is highly secure, purpose-built session tokens containing significantly more entropy are still the standard for auth architectures.']
    ],
  },
  related: ['hash-generator', 'password-generator', 'base64-encode-decode', 'json-formatter'],
},
{
  slug: 'hash-generator', name: 'Hash Generator (SHA-256, SHA-512, SHA-1)', prio: 'P2', category: 'developer', widget: 'hash',
  short: 'SHA hashes of any text, computed locally with Web Crypto.',
  metaDescription: 'Generate secure SHA-256, SHA-512, and SHA-1 hashes online. Compute cryptographic text hashes securely in your browser without data uploads.',
  keywords: ['sha256 hash generator', 'hash generator', 'sha512 online', 'sha1 calculator'],
  content: {
    intro: 'Compute SHA-256, SHA-512, or SHA-1 digests of any text — entirely in your browser using the native Web Crypto API, so the input never leaves your machine.',
    how: 'The text is UTF-8 encoded and passed to crypto.subtle.digest; the result renders as lowercase hex. The same input always yields the same hash; even a one-character change produces a completely different digest.',
    howSteps: [
      'Select the hashing algorithm you need (SHA-256 is recommended).',
      'Type or paste your text into the input field.',
      'The Javascript Web Crypto API instantly outputs the immutable cryptographic digest.'
    ],
    faqs: [
      ['Which hashing algorithm should I default to?', 'SHA-256 is the standard modern default. SHA-1 is cryptographically broken and is included here solely for verifying legacy system checksums.'],
      ['Why is MD5 missing from the options?', 'Modern browsers intentionally omit MD5 from the Web Crypto API because it is severely broken and insecure. Use SHA-256 instead.'],
      ['Can a generated hash be reversed back to text?', 'No. Cryptographic hashes are mathematically one-way by design. The only way to "crack" a hash is by guessing inputs and comparing the outputs.']
    ],
  },
  related: ['uuid-generator', 'base64-encode-decode', 'password-generator', 'json-formatter'],
},
{
  slug: 'password-generator', name: 'Password Generator', prio: 'P1', category: 'developer', widget: 'password',
  short: 'Strong random passwords from a cryptographic source — never sent anywhere.',
  metaDescription: 'Generate secure, highly random passwords locally in your browser. Strong password generator using cryptographic APIs. 100% private and safe.',
  keywords: ['password generator', 'strong password generator', 'random password', 'secure password'],
  content: {
    intro: 'Generate strong passwords with adjustable length and character sets. Randomness comes from your device\'s cryptographic generator, and the password never leaves your browser.',
    how: 'Characters are drawn with crypto.getRandomValues using rejection sampling — the technique that avoids the subtle bias of the naive modulo approach. At 16 characters with all sets enabled, the space exceeds 10³¹ possibilities.',
    howSteps: [
      'Select the password length (16+ characters is highly recommended).',
      'Toggle the inclusion of numbers, symbols, and ambiguous characters.',
      'Click to generate the password, then copy it directly to your password manager.'
    ],
    faqs: [
      ['How long is long enough for a secure password?', '16+ characters utilizing mixed character sets is a strong modern baseline; 20+ is recommended for critical accounts. Raw length generally beats complexity tricks.'],
      ['Is it safe to generate my passwords online?', 'On this tool, yes, because generation happens strictly within your local browser memory. You should avoid tools that request a server to generate passwords.'],
      ['Should I avoid ambiguous characters like l, 1, O, and 0?', 'If you ever need to manually type the password, excluding them prevents frustration. For passwords stored purely in a manager, keep them included for maximum entropy.']
    ],
  },
  related: ['password-strength-checker', 'uuid-generator', 'hash-generator', 'base64-encode-decode'],
},
{
  slug: 'color-converter', name: 'Color Converter (HEX ⇄ RGB ⇄ HSL)', prio: 'P1', category: 'developer', widget: 'color',
  short: 'Convert colors between HEX, RGB, and HSL with a live swatch.',
  metaDescription: 'Convert CSS colors between HEX, RGB, and HSL instantly. Free online color converter for web developers and designers with live preview swatches.',
  keywords: ['hex to rgb', 'color converter', 'rgb to hex', 'hsl converter', 'color code translator'],
  content: {
    intro: 'Paste a color in HEX, RGB, or HSL and get all three formats with a live preview swatch — the everyday conversion in CSS and design work.',
    how: 'HEX pairs are parsed to 0–255 RGB channels. HSL derives from RGB via max/min channel math: hue is the angle on the color wheel, saturation the colorfulness, lightness the brightness.',
    howSteps: [
      'Paste a color value into the search box in any format (e.g., #FFFFFF or rgb(255, 255, 255)).',
      'The engine parses the format and visually displays a color swatch.',
      'Copy the exact matching HEX, RGB, or HSL strings for your CSS.'
    ],
    faqs: [
      ['When is it best to use the HSL format?', 'HSL is perfect for designing systemic themes. You can easily vary the Lightness channel for hover states while keeping the Hue intact, which is mathematically awkward with HEX.'],
      ['Does a 3-digit HEX like #FFF equal #FFFFFF?', 'Yes. In CSS, a 3-digit HEX simply doubles each character to form the 6-digit equivalent. This tool accepts both.'],
      ['What about alpha channel transparency?', 'This tool converts opaque colors. For alpha transparency, append the decimal after converting: rgba(..., 0.5) or use an 8-digit HEX code.']
    ],
  },
  related: ['json-formatter', 'base64-encode-decode', 'slug-generator', 'uuid-generator'],
},
{
  slug: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', prio: 'P1', category: 'developer', widget: 'unixtime',
  short: 'Epoch seconds/milliseconds to human dates and back — with live now.',
  metaDescription: 'Convert Unix timestamps to human readable dates instantly. Epoch converter supporting seconds and milliseconds in UTC, local time, and ISO 8601.',
  keywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'unix epoch'],
  content: {
    intro: 'Convert Unix timestamps (seconds or milliseconds since Jan 1, 1970 UTC) to readable dates and back, with the current timestamp ticking live.',
    how: 'Seconds × 1000 feed JavaScript\'s Date; the tool auto-detects milliseconds by magnitude (13-digit values). Output shows UTC, your local time, and ISO 8601 — the three formats that cover real work.',
    howSteps: [
      'Paste your numerical Unix timestamp or human-readable date string.',
      'The parser automatically detects whether the input is in seconds or milliseconds.',
      'Read the converted time in UTC, your local time zone, and ISO 8601 format.'
    ],
    faqs: [
      ['How do I tell if a timestamp is in seconds or milliseconds?', 'A standard current-era timestamp is roughly 10 digits for seconds, and 13 digits for milliseconds. The tool detects this magnitude automatically.'],
      ['What exactly was timestamp 0?', 'Timestamp 0 represents Midnight UTC on January 1, 1970 — legally known as the Unix epoch.'],
      ['What is the dreaded year-2038 problem?', 'Older systems using signed 32-bit integers for timestamps will physically overflow on Jan 19, 2038. Modern 64-bit systems (including Javascript) are completely immune.']
    ],
  },
  related: ['cron-expression-generator', 'days-between-dates', 'age-calculator', 'json-formatter'],
},
{
  slug: 'regex-tester', name: 'Regex Tester', prio: 'P1', category: 'developer', widget: 'regex',
  short: 'Test regular expressions live with match highlighting and flags.',
  metaDescription: 'Test and debug regular expressions online. Live Regex matcher with syntax highlighting using your browser\'s native Javascript ECMAScript engine.',
  keywords: ['regex tester', 'regular expression tester', 'regex online', 'test regex'],
  content: {
    intro: 'Write a regular expression and a test string, and see every match update live, with toggles for the common flags. Everything runs in your browser\'s own regex engine, so what matches here matches in your code.',
    how: 'The tool builds a JavaScript RegExp from your pattern and flags and collects all matches. Flags: g (global), i (ignore case), m (multiline anchors), s (dot matches newlines). Invalid patterns show the engine\'s error.',
    howSteps: [
      'Type your RegEx pattern into the top input bar.',
      'Toggle expression flags such as global (g), case-insensitive (i), or multiline (m).',
      'Type your test string into the text area to see live, highlighted matches.'
    ],
    faqs: [
      ['Why should I use my browser\'s regex engine?', 'Because it is the exact same ECMAScript engine your Javascript runtime uses in production. This guarantees zero dialect surprises.'],
      ['What do the specific regex flags do?', 'The `g` flag finds all matches instead of stopping at the first. `i` ignores upper/lower casing. `m` forces ^ and $ to match line starts/ends.'],
      ['What is the difference between .* and .+ ?', '.* matches zero or more characters (meaning an empty string passes), while .+ strictly requires at least one character.']
    ],
  },
  related: ['json-formatter', 'find-and-replace', 'base64-encode-decode', 'url-encode-decode'],
},
{
  slug: 'jwt-decoder', name: 'JWT Decoder', prio: 'P1', category: 'developer', widget: 'jwt',
  short: 'Decode and inspect JWT header, payload, and expiry — locally.',
  metaDescription: 'Decode JSON Web Tokens (JWT) online securely. Parse JWT headers, payloads, and check expiration dates locally without sending tokens to a server.',
  keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'jwt checker'],
  content: {
    intro: 'Paste a JSON Web Token to instantly read its header and payload and check the expiry, all decoded locally in your browser. The token is never sent anywhere.',
    how: 'A JWT is three base64url-encoded parts separated by dots: header.payload.signature. The tool decodes the first two to JSON and reads the exp claim to show the expiry. It does not verify the signature.',
    howSteps: [
      'Paste your raw JWT string into the decoder box.',
      'The browser locally decodes the Base64Url payload and headers into readable JSON.',
      'Check the extracted `exp` timestamp to verify if the token is expired.'
    ],
    faqs: [
      ['Is the cryptographic signature verified here?', 'No. Verifying a signature mathematically requires your private secret key. This tool merely decodes the base64 claims for inspection.'],
      ['Is it safe to paste a production JWT here?', 'Yes, decoding executes entirely in your browser Javascript, so the token is never transmitted. However, you should generally treat live tokens with extreme caution.'],
      ['What does the exp claim represent?', 'It is a standard Unix timestamp indicating exactly when the token expires. The tool parses this and flags it for you visually.']
    ],
  },
  related: ['base64-encode-decode', 'json-formatter', 'hash-generator', 'unix-timestamp-converter'],
},
{
  slug: 'csv-to-json', name: 'CSV to JSON Converter', prio: 'P1', category: 'developer', widget: 'csvjson',
  short: 'Convert CSV to JSON and JSON to CSV, both directions.',
  metaDescription: 'Convert CSV to JSON or JSON to CSV online for free. Fast, accurate parsing that correctly handles internal commas and quotes in your browser.',
  keywords: ['csv to json', 'json to csv', 'csv json converter', 'convert csv'],
  content: {
    intro: 'Convert CSV data into a JSON array of objects, or flatten a JSON array back into CSV, with proper handling of quoted fields and commas inside values.',
    how: 'CSV parsing respects double-quoted fields (so commas and quotes inside values survive) and uses the first row as keys. JSON-to-CSV collects all object keys as the header row and escapes any value containing commas, quotes, or newlines.',
    howSteps: [
      'Paste your CSV data or JSON array into the editor.',
      'Select the conversion direction (CSV to JSON, or JSON to CSV).',
      'The parser correctly escapes inner commas and outputs the resulting data for you to copy.'
    ],
    faqs: [
      ['Does the parser handle commas inside individual fields?', 'Yes. Double-quoted fields are parsed strictly to spec, ensuring commas within data do not break the row structure.'],
      ['What happens to nested JSON objects?', 'Because CSV is a flat format, deeply nested JSON objects do not map well. You should flatten your nested data structure before converting to CSV.'],
      ['Is my data uploaded to a server for processing?', 'No. The conversion logic runs entirely on your local machine using Javascript.']
    ],
  },
  related: ['json-formatter', 'base64-encode-decode', 'regex-tester', 'url-encode-decode'],
},
{
  slug: 'diff-checker', name: 'Diff Checker', prio: 'P2', category: 'developer', widget: 'diff',
  short: 'Compare two texts and highlight added and removed lines.',
  metaDescription: 'Compare text and code online. Free Diff Checker highlights added and removed lines visually, just like Git. Runs safely in your browser.',
  keywords: ['diff checker', 'text diff', 'compare text online', 'code difference'],
  content: {
    intro: 'Paste two versions of text or code and see a line-by-line diff: additions in green, removals in red, with a running count of changes.',
    how: 'A longest-common-subsequence algorithm finds the minimal set of line additions and deletions that turns the original into the changed version — the same core technique behind version-control diffs.',
    howSteps: [
      'Paste the original text into the left pane.',
      'Paste the modified text into the right pane.',
      'The engine immediately highlights deletions in red and additions in green.'
    ],
    faqs: [
      ['Is this comparison line-level or character-level?', 'It is line-level, which is ideal for programming code and structured text files. Entire lines are flagged as added or removed.'],
      ['Can I use this to compare complex code?', 'Yes. It works on any plain text. Changes in indentation and content will accurately register as line differences.'],
      ['Does my proprietary code leave my browser?', 'No. The Longest-Common-Subsequence comparison algorithm executes entirely locally.']
    ],
  },
  related: ['text-compare', 'json-formatter', 'regex-tester', 'find-and-replace'],
},
{
  slug: 'html-encode-decode', name: 'HTML Encode / Decode', prio: 'P2', category: 'developer', widget: 'devtransform', transformKey: 'htmlEncode',
  short: 'Escape HTML special characters, or decode entities back.',
  metaDescription: 'Encode and decode HTML entities safely online. Convert brackets to &lt; and &gt; to prevent XSS attacks. Free browser-based developer tool.',
  keywords: ['html encode', 'html decode', 'html entity encoder', 'escape html online'],
  content: {
    intro: 'Convert HTML special characters to their safe entity equivalents (and back) so markup displays as text instead of being interpreted by the browser.',
    how: 'Encoding replaces the five reserved characters — & < > " \' — with entities like &amp; and &lt;. Decoding reverses it. This is what prevents user input from breaking or injecting into a page.',
    howSteps: [
      'Select whether to Encode (escape) or Decode HTML.',
      'Paste your raw text or HTML block into the editor.',
      'Copy the safely encoded entities for use in your web application.'
    ],
    faqs: [
      ['Why must I encode HTML?', 'Encoding is mandatory to display code snippets literally on a webpage and to prevent malicious Cross-Site Scripting (XSS) attacks.'],
      ['Which specific characters get encoded?', 'The five reserved characters that have execution meaning in HTML: ampersand, less-than, greater-than, double quote, and single quote.'],
      ['Is HTML encoding the exact same thing as sanitizing?', 'No. Encoding simply makes text mathematically safe to display. Sanitizing involves actively stripping dangerous script tags out of the content.']
    ],
  },
  related: ['url-encode-decode', 'base64-encode-decode', 'json-formatter', 'json-escape'],
},
{
  slug: 'css-minifier', name: 'CSS Minifier', prio: 'P2', category: 'developer', widget: 'devtransform', transformKey: 'cssMinify',
  short: 'Strip comments and whitespace to shrink CSS.',
  metaDescription: 'Minify CSS code online for free. Compress stylesheets by safely removing comments and whitespace to improve website page load speeds.',
  keywords: ['css minifier', 'minify css online', 'css compressor', 'shrink css'],
  content: {
    intro: 'Compress CSS by removing comments, redundant whitespace, and unnecessary characters — reducing file size for faster page loads.',
    how: 'The minifier strips comment blocks, collapses whitespace, and removes spaces around braces, colons, and semicolons, while preserving the meaning of every rule.',
    howSteps: [
      'Paste your formatted CSS code into the editor.',
      'The minifier strips structural whitespace and comment blocks safely.',
      'Copy the compressed CSS output to use in your production environment.'
    ],
    faqs: [
      ['How much smaller will my CSS files get?', 'Depending on how heavily commented and indented your source file is, you can expect a 10–30% reduction in total file size.'],
      ['Will this minification break my styling rules?', 'No. It only removes mathematically insignificant characters like spaces and line breaks. Valid CSS will remain perfectly valid.'],
      ['Should I minify CSS by hand using this tool?', 'For heavy production apps, build tools (like Webpack or Vite) minify automatically. This tool is incredibly handy for quick one-off deployments.']
    ],
  },
  related: ['javascript-minifier', 'html-minifier', 'json-formatter', 'color-converter'],
},
{
  slug: 'javascript-minifier', name: 'JavaScript Minifier', prio: 'P2', category: 'developer', widget: 'devtransform', transformKey: 'jsMinify',
  short: 'Remove comments and blank lines from JavaScript.',
  metaDescription: 'Minify Javascript online instantly. Safely strip comments and whitespace from JS code to reduce file size without breaking functionality.',
  keywords: ['javascript minifier', 'js minifier', 'minify javascript', 'compress js'],
  content: {
    intro: 'Shrink JavaScript by stripping comments and unnecessary blank lines — a lightweight cleanup for quick size reduction.',
    how: 'This conservative minifier removes block and line comments and collapses empty lines while leaving your code structure intact. It is deliberately cautious to avoid breaking logic.',
    howSteps: [
      'Paste your readable Javascript code into the tool.',
      'The engine conservatively strips out block comments, line comments, and blank lines.',
      'Copy the shrunken Javascript payload for faster network delivery.'
    ],
    faqs: [
      ['Does this tool aggressively rename variables like production minifiers?', 'No. Advanced minifiers like Terser rename variables and restructure logic. This tool safely removes whitespace and comments only.'],
      ['Is the output guaranteed safe to run?', 'Yes, for typical code. Because it only removes non-executable whitespace, the logic remains identical to your source code.'],
      ['When should I use a real build tool instead?', 'For massive production web applications, you should use bundlers. This tool is designed for quick, manual compression of small scripts.']
    ],
  },
  related: ['css-minifier', 'html-minifier', 'json-formatter', 'regex-tester'],
},
{
  slug: 'html-minifier', name: 'HTML Minifier', prio: 'P3', category: 'developer', widget: 'devtransform', transformKey: 'htmlMinify',
  short: 'Remove comments and whitespace between HTML tags.',
  metaDescription: 'Compress HTML online instantly. Minify HTML code by stripping comments and empty spaces between tags to optimize page performance.',
  keywords: ['html minifier', 'minify html online', 'html compressor', 'shrink html'],
  content: {
    intro: 'Compress HTML by removing comments and the whitespace between tags, trimming page size for faster delivery.',
    how: 'The minifier strips HTML comments and collapses whitespace between elements and within runs of spaces, while keeping the document structure valid.',
    howSteps: [
      'Paste your raw, indented HTML markup into the editor.',
      'The parser deletes HTML comments and collapses dead space between structural tags.',
      'Copy the minified HTML block to deploy to your server.'
    ],
    faqs: [
      ['Will collapsing whitespace between tags destroy my layout?', 'Usually no. Whitespace between block tags is typically ignored by browsers, but be careful if you heavily rely on inline-block spacing or <pre> tags.'],
      ['Does this tool also minify embedded inline CSS or JS?', 'No. It strictly focuses on HTML structure. You must minify embedded `<style>` and `<script>` blocks using their respective tools.'],
      ['How much data transfer does this realistically save?', 'On heavily indented web pages, it can trim 10–20% off the payload, ensuring faster initial renders for users.']
    ],
  },
  related: ['css-minifier', 'javascript-minifier', 'html-encode-decode', 'json-formatter'],
},
{
  slug: 'sql-formatter', name: 'SQL Formatter', prio: 'P2', category: 'developer', widget: 'devtransform', transformKey: 'sqlFormat',
  short: 'Indent and line-break SQL for readability.',
  metaDescription: 'Format and beautify SQL queries online. Instantly structure complex SQL statements for maximum readability directly in your browser.',
  keywords: ['sql formatter', 'sql beautifier', 'format sql online', 'pretty print sql'],
  content: {
    intro: 'Reformat a cramped SQL query into a readable layout, placing major clauses on their own lines and indenting column lists.',
    how: 'The formatter recognizes the common SQL keywords (SELECT, FROM, WHERE, JOIN, GROUP BY…) and starts a new line at each, then indents comma-separated items for clarity.',
    howSteps: [
      'Paste your messy or minified SQL query into the tool.',
      'The formatter scans for core SQL keywords (SELECT, FROM, JOIN) and applies line breaks.',
      'Copy the beautifully indented, readable SQL statement.'
    ],
    faqs: [
      ['Which specific SQL dialects does this support?', 'The logic targets the standard keywords shared globally across MySQL, PostgreSQL, and SQL Server. Vendor-specific syntax will still format very cleanly.'],
      ['Does formatting alter my query\'s execution logic?', 'No. Only whitespace and line breaks are added. The database engine will execute the query identically.'],
      ['Can it gracefully handle massive, nested queries?', 'It handles standard structures perfectly. Extremely complex, multi-layered subqueries may occasionally require manual fine-tuning.']
    ],
  },
  related: ['json-formatter', 'csv-to-json', 'regex-tester', 'diff-checker'],
},
{
  slug: 'json-escape', name: 'JSON String Escape / Unescape', prio: 'P3', category: 'developer', widget: 'devtransform', transformKey: 'jsonEscape',
  short: 'Escape text for a JSON string, or unescape it back.',
  metaDescription: 'Escape and unescape JSON strings online. Safely embed quotes and newlines within JSON values. A free utility for backend developers.',
  keywords: ['json escape', 'json string escape', 'escape json online', 'unescape json'],
  content: {
    intro: 'Escape arbitrary text so it can be safely embedded inside a JSON string — converting quotes, backslashes, and newlines — or reverse the process to read an escaped value.',
    how: 'Escaping uses the JSON string rules: " becomes \\", newlines become \\n, and so on. Unescaping parses those sequences back into the original characters.',
    howSteps: [
      'Choose whether to Escape text for JSON insertion, or Unescape it for reading.',
      'Paste your text into the editor.',
      'Copy the safely escaped string, ready to be embedded within a JSON payload.'
    ],
    faqs: [
      ['When is it necessary to manually escape JSON?', 'You need this when you are manually writing JSON payloads and need to embed text that already contains quotes, backslashes, or literal newlines.'],
      ['Which characters specifically get escaped?', 'Double quotes ("), backslashes (\\), and control characters like newlines and tabs.'],
      ['Is this the same concept as URL encoding?', 'No. JSON escaping and URL (percent) encoding follow completely different specifications designed for entirely different parsing engines.']
    ],
  },
  related: ['json-formatter', 'html-encode-decode', 'url-encode-decode', 'base64-encode-decode'],
},
{
  slug: 'json-to-yaml', name: 'JSON to YAML Converter', prio: 'P3', category: 'developer', widget: 'devtransform', transformKey: 'jsonToYaml',
  short: 'Convert JSON into clean, readable YAML.',
  metaDescription: 'Convert JSON to YAML online instantly. Generate clean, indentation-based YAML configuration files from strict JSON structures.',
  keywords: ['json to yaml', 'json to yaml converter', 'json yaml parser'],
  content: {
    intro: 'Convert JSON into YAML — the indentation-based format favored for configuration files in tools like Docker, Kubernetes, and CI pipelines.',
    how: 'The converter walks the JSON structure and emits equivalent YAML, using two-space indentation for nesting and list syntax for arrays, quoting strings only when needed.',
    howSteps: [
      'Paste your valid JSON payload into the parser.',
      'The engine recursively walks the JSON tree to emit two-space indented YAML syntax.',
      'Copy the generated YAML block to use in Docker or Kubernetes.'
    ],
    faqs: [
      ['Why convert JSON to YAML in the first place?', 'YAML is significantly easier for humans to read and write. It requires fewer brackets and quotes, and crucially, it allows comments (unlike JSON).'],
      ['Is the fundamental data structure identical?', 'Yes. YAML is conceptually a superset of JSON. All JSON values map directly; only the visual formatting changes.'],
      ['Does the converter support deeply nested JSON objects?', 'Yes. Deep nesting is preserved accurately through YAML indentation rules.']
    ],
  },
  related: ['yaml-to-json', 'json-formatter', 'csv-to-json', 'json-escape'],
},
{
  slug: 'yaml-to-json', name: 'YAML to JSON Converter', prio: 'P3', category: 'developer', widget: 'devtransform', transformKey: 'yamlToJson',
  short: 'Convert YAML config into JSON.',
  metaDescription: 'Convert YAML files to standard JSON format online. Ensure API compatibility by instantly converting YAML configs into strict JSON.',
  keywords: ['yaml to json', 'yaml to json converter', 'parse yaml online'],
  content: {
    intro: 'Convert YAML configuration into JSON — useful when a tool or API expects JSON but your config is written in the more human-friendly YAML.',
    how: 'The parser reads indentation-based YAML (keys, nested maps, and lists) and produces equivalent formatted JSON. It targets the common config subset of YAML.',
    howSteps: [
      'Paste your YAML configuration into the input area.',
      'The engine safely parses the indentation and array structures.',
      'Copy the rigorously formatted JSON payload, ready for API transmission.'
    ],
    faqs: [
      ['Which advanced YAML features are supported?', 'The parser handles the standard configuration subset: maps, lists, and scalars. Obscure advanced YAML features like anchors are not supported.'],
      ['Why convert YAML back to JSON?', 'While humans prefer YAML, many legacy APIs and strict programmatic parsers will only accept raw JSON data.'],
      ['What if my YAML parsing fails?', 'The tool will report a syntax error. YAML relies entirely on strict indentation, so ensure your spaces are perfectly aligned.']
    ],
  },
  related: ['json-to-yaml', 'json-formatter', 'csv-to-json', 'xml-formatter'],
},
{
  slug: 'xml-formatter', name: 'XML Formatter', prio: 'P3', category: 'developer', widget: 'devtransform', transformKey: 'xmlFormat',
  short: 'Indent and pretty-print XML by tag depth.',
  metaDescription: 'Format and beautify XML online for free. Indent complex XML tags properly for readability and easy debugging without server uploads.',
  keywords: ['xml formatter', 'xml beautifier', 'format xml online', 'pretty print xml'],
  content: {
    intro: 'Reformat compact or messy XML into a clean, indented tree that is easy to read and inspect.',
    how: 'The formatter inserts line breaks between elements and indents each level by its nesting depth, producing a readable hierarchy without altering the data.',
    howSteps: [
      'Paste your compact or messy XML string.',
      'The formatter evaluates tag depths and inserts line breaks and indentation.',
      'Copy the visually structured XML hierarchy.'
    ],
    faqs: [
      ['Does this tool rigorously validate the XML schema?', 'It formats the structural depth, but it does not run a strict schema validation pass. Malformed XML may yield imperfect formatting.'],
      ['Will formatting alter any of my attribute values?', 'No. Only whitespace located specifically between structural elements is adjusted. Your core content remains untouched.'],
      ['Can it handle massive XML documents?', 'It processes typical documents perfectly within the browser. Gigabyte-sized XML databases should be handled with terminal tools.']
    ],
  },
  related: ['json-formatter', 'html-minifier', 'yaml-to-json', 'json-to-yaml'],
},
{
  slug: 'markdown-to-html', name: 'Markdown to HTML Converter', prio: 'P2', category: 'developer', widget: 'devtransform', transformKey: 'markdownToHtml',
  short: 'Convert Markdown into clean HTML.',
  metaDescription: 'Convert Markdown to HTML online. Parse markdown text into clean, valid HTML tags instantly in your browser.',
  keywords: ['markdown to html', 'markdown converter', 'md to html', 'convert markdown'],
  content: {
    intro: 'Convert Markdown into HTML — headings, bold and italic, links, lists, inline code, and code blocks — ready to paste into a web page.',
    how: 'The converter parses common Markdown syntax line by line and emits the matching HTML tags, escaping characters inside code so they display literally.',
    howSteps: [
      'Paste your Markdown content into the input box.',
      'The engine maps Markdown syntax (like # or **) into strict HTML tags.',
      'Copy the generated HTML to embed into your CMS or webpage.'
    ],
    faqs: [
      ['Which Markdown features are supported?', 'The parser covers the everyday core subset: headings, bold/italic emphasis, links, unordered/ordered lists, and fenced code blocks.'],
      ['Is the output HTML guaranteed safe to publish?', 'The output is fundamentally clean, structural HTML. However, always exercise caution and sanitize content if it originated from untrusted users.'],
      ['Does the converter support tables?', 'This lightweight parsing tool focuses on core text structure. Complex tables should be created natively in HTML.']
    ],
  },
  related: ['html-encode-decode', 'html-minifier', 'json-formatter', 'slug-generator'],
},
{
  slug: 'number-base-converter', name: 'Number Base Converter', prio: 'P2', category: 'developer', widget: 'numberbase',
  short: 'Convert between binary, octal, decimal, and hex.',
  metaDescription: 'Convert numbers between Binary, Octal, Decimal, and Hexadecimal online. Free developer tool to translate numeric bases instantly.',
  keywords: ['number base converter', 'binary to decimal', 'hex to decimal', 'decimal to binary'],
  content: {
    intro: 'Convert a number between binary, octal, decimal, and hexadecimal — see all four representations at once from any input base.',
    how: 'The value is parsed from its input base into an integer, then re-rendered in base 2, 8, 10, and 16. Hexadecimal output is shown with the conventional 0x prefix.',
    howSteps: [
      'Enter a number into any of the base fields (Decimal, Hex, Binary, Octal).',
      'The engine parses the integer and instantaneously translates it.',
      'Read the synchronized outputs across all other numeric bases.'
    ],
    faqs: [
      ['Why is hexadecimal used so commonly in programming?', 'Each Hex digit maps perfectly to four binary bits. It acts as a compact, highly readable shorthand for binary memory addresses and color codes.'],
      ['What is octal actually used for today?', 'While historically vital, it survives today predominantly in Unix and Linux file permission schemes (e.g., chmod 755).'],
      ['Can the calculator handle decimal fractions?', 'This specific tool handles integers. Fractional base conversion requires floating-point math.'],
    ],
  },
  related: ['color-converter', 'hash-generator', 'unix-timestamp-converter', 'base64-encode-decode'],
},
{
  slug: 'css-gradient-generator', name: 'CSS Gradient Generator', prio: 'P1', category: 'developer', widget: 'gradient',
  short: 'Design a linear gradient and copy the CSS.',
  metaDescription: 'Generate beautiful CSS linear gradients online. Visually design color transitions, adjust angles, and copy the CSS code instantly.',
  keywords: ['css gradient generator', 'gradient generator', 'linear gradient css', 'css background'],
  content: {
    intro: 'Visually design a linear gradient between two colors at any angle, with a live preview, and copy the ready-to-use CSS.',
    how: 'Pick two colors and an angle; the tool builds a linear-gradient() background value and previews it instantly. Copy the CSS straight into your stylesheet.',
    howSteps: [
      'Select two beautiful colors using the visual color pickers.',
      'Drag the angle slider to determine the precise direction of the gradient.',
      'Instantly preview the result and copy the generated CSS rule.'
    ],
    faqs: [
      ['What does the angle slider control?', 'It controls the directional vector: 0deg flows bottom-to-top, 90deg flows left-to-right, and 135deg creates a diagonal sweep.'],
      ['Can I use more than two color stops?', 'This generator targets the most common two-color use case. To add more stops, simply inject extra colors into the CSS string manually.'],
      ['Is the generated CSS fully production-ready?', 'Yes. The `linear-gradient` specification is universally supported natively across all modern browsers.']
    ],
  },
  related: ['box-shadow-generator', 'color-palette-generator', 'color-converter', 'css-minifier'],
},
{
  slug: 'box-shadow-generator', name: 'CSS Box Shadow Generator', prio: 'P1', category: 'developer', widget: 'boxshadow',
  short: 'Dial in a box-shadow visually and copy the CSS.',
  metaDescription: 'Create perfect CSS Box Shadows visually online. Adjust offset, blur, and spread with a live preview, then copy the CSS code instantly.',
  keywords: ['box shadow generator', 'css box shadow', 'box shadow css generator', 'drop shadow css'],
  content: {
    intro: 'Craft a CSS box-shadow with live preview — adjust offset, blur, spread, color, and opacity, and toggle inset — then copy the exact CSS.',
    how: 'Sliders control each box-shadow parameter and update the preview in real time. The chosen color and opacity combine into an rgba() value for soft, natural shadows.',
    howSteps: [
      'Adjust the X/Y Offset, Blur, and Spread sliders to shape the shadow.',
      'Pick a color and lower the opacity to create a subtle, natural effect.',
      'Copy the output CSS block directly into your project.'
    ],
    faqs: [
      ['What do offset, blur, and spread technically do?', 'Offset physically moves the shadow across the X/Y axis. Blur softens the hard edges. Spread inflates or deflates the core shadow size.'],
      ['What exactly is an inset shadow?', 'An inset shadow is drawn entirely inside the boundaries of the element, which creates a recessed, pressed, or "well" effect.'],
      ['How do I layer multiple complex shadows together?', 'In CSS, you can combine multiple box-shadow values by separating them with commas. You can generate them individually here and chain them together.']
    ],
  },
  related: ['css-gradient-generator', 'color-palette-generator', 'color-converter', 'css-minifier'],
},
{
  slug: 'color-palette-generator', name: 'Color Palette Generator', prio: 'P1', category: 'developer', widget: 'palette',
  short: 'Generate shades, complementary, analogous, or triadic palettes.',
  metaDescription: 'Generate beautiful, mathematically harmonious color palettes online. Create complementary, triadic, and analogous schemes for web design instantly.',
  keywords: ['color palette generator', 'color scheme generator', 'complementary color', 'ui colors'],
  content: {
    intro: 'Generate a harmonious color palette from a single base color — shades and tints, or complementary, analogous, and triadic schemes — and copy any color with a click.',
    how: 'The base color is converted to HSL so the tool can vary lightness for shades or rotate the hue for color-theory schemes, then convert each result back to hex.',
    howSteps: [
      'Input a single base color that you want to build around.',
      'Select a color theory algorithm (Complementary, Analogous, Triadic, or Shades).',
      'The math generates the swatches. Click any swatch to copy its Hex code.'
    ],
    faqs: [
      ['What defines a complementary color?', 'It is the hue positioned exactly 180 degrees away on the color wheel, which guarantees maximum visual contrast.'],
      ['What is the difference between Analogous and Triadic?', 'Analogous colors sit adjacent to each other on the wheel, offering a calm, harmonious look. Triadic picks three evenly spaced colors for vibrant balance.'],
      ['How should I apply these palettes in my UI?', 'Typically, use one color as the dominant background/theme, and use its complementary opposite sparingly for high-attention call-to-action buttons.']
    ],
  },
  related: ['color-converter', 'css-gradient-generator', 'box-shadow-generator', 'number-base-converter'],
},
{
  slug: 'cron-expression-generator', name: 'Cron Expression Parser', prio: 'P2', category: 'developer', widget: 'cron',
  short: 'Decode a cron schedule into plain English.',
  metaDescription: 'Decode complex Cron expressions into plain English instantly online. Parse and validate cron syntax safely in your browser for free.',
  keywords: ['cron expression generator', 'cron parser', 'crontab generator', 'explain cron'],
  content: {
    intro: 'Paste a cron expression and read a plain-English description of when it runs, with each of the five fields explained and range-checked.',
    how: 'A standard cron line has five fields — minute, hour, day of month, month, day of week. The tool validates the format and describes each field, including step (*/5) and range (1-5) syntax.',
    howSteps: [
      'Paste your confusing cron expression (e.g., "0 12 * * 1-5").',
      'The parser breaks down the syntax strictly against the cron specification.',
      'Read the clear, human-readable description of exactly when the job will run.'
    ],
    faqs: [
      ['What do the five standard cron fields represent?', 'In strict order: Minute (0–59), Hour (0–23), Day of the month (1–31), Month (1–12), and Day of the week (0–6, where Sunday is 0).'],
      ['What does a forward slash like */5 mean?', 'It is a step value meaning "every 5th occurrence". For instance, */5 in the minute field triggers the job every five minutes.'],
      ['What does 1-5 in the final day field mean?', 'It defines a continuous range. "1-5" translates to Monday through Friday, which is the standard setup for business-day cron jobs.']
    ],
  },
  related: ['unix-timestamp-converter', 'regex-tester', 'json-formatter', 'time-zone-converter'],
},
{
  slug: 'http-status-codes', name: 'HTTP Status Codes Reference', prio: 'P2', category: 'developer', widget: 'reference', dataset: 'http',
  short: 'Searchable reference of HTTP status codes and meanings.',
  metaDescription: 'Searchable reference guide for all HTTP Status Codes. Quickly look up the meaning of 404, 500, 301, and every other server response code.',
  keywords: ['http status codes', 'http status code list', '404 500 status codes', 'http responses'],
  content: {
    intro: 'A fast, searchable reference of HTTP status codes — from 200 OK to 500 Internal Server Error — with a plain explanation of what each one means.',
    how: 'Type a number or keyword to filter the list instantly. Codes are grouped by class: 1xx informational, 2xx success, 3xx redirection, 4xx client errors, and 5xx server errors.',
    howSteps: [
      'Open the reference table.',
      'Search by code number (e.g., 404) or keyword (e.g., "Not Found").',
      'Read the standardized definition to debug your API or web server.'
    ],
    faqs: [
      ['What is the core difference between 401 and 403?', '401 Unauthorized strictly means you lack authentication (you need to log in). 403 Forbidden means you are logged in, but lack the permission to view the resource.'],
      ['When is it correct to use a 301 instead of a 302?', '301 indicates a Permanent redirect (search engines will update their indexes). 302 is Temporary (the original URL is kept indexed).'],
      ['What triggers a 429 status code?', '429 means Too Many Requests. You have aggressively hit an API rate limit and must implement a backoff strategy.']
    ],
  },
  related: ['mime-types-lookup', 'url-encode-decode', 'json-formatter', 'jwt-decoder'],
},
{
  slug: 'mime-types-lookup', name: 'MIME Types Lookup', prio: 'P3', category: 'developer', widget: 'reference', dataset: 'mime',
  short: 'Searchable reference of file extensions and MIME types.',
  metaDescription: 'Lookup standardized MIME and Content-Type headers for any file extension instantly. Searchable developer reference guide.',
  keywords: ['mime types lookup', 'mime type list', 'content type reference', 'file extension mime'],
  content: {
    intro: 'Look up the correct MIME (content) type for a file extension — the value servers send in the Content-Type header so browsers know how to handle a file.',
    how: 'Search by extension (.png) or keyword (image) to find the matching MIME type and a short description. These are the standard types used across the web.',
    howSteps: [
      'Enter a file extension (like .json) or a broader category (like image).',
      'The reference filters instantly to show matching MIME types.',
      'Copy the exact string to configure your backend Content-Type header.'
    ],
    faqs: [
      ['What exactly is a MIME type?', 'It is an official standardized string label (like application/json) that tells software exactly what kind of underlying data a file contains.'],
      ['What happens if a server sends the wrong MIME type?', 'Browsers will often refuse to execute scripts or render files if they are served with incorrect types, which is a leading cause of broken web deployments.'],
      ['What is the purpose of application/octet-stream?', 'It acts as the ultimate generic fallback for arbitrary binary data. Browsers usually react to it by forcing a file download.']
    ],
  },
  related: ['http-status-codes', 'base64-encode-decode', 'url-encode-decode', 'json-formatter'],
},
{
  slug: 'ip-subnet-calculator', name: 'IP Subnet Calculator', prio: 'P1', category: 'developer', widget: 'calc',
  short: 'Calculate network address, broadcast, host range, and mask from CIDR.',
  metaDescription: 'Free IPv4 Subnet Calculator online. Calculate network addresses, broadcast ranges, and subnet masks from any CIDR notation instantly.',
  keywords: ['ip subnet calculator','cidr calculator','subnet mask calculator','network calculator','ipv4 subnet'],
  fields: [
    { key: 'ip', label: 'IPv4 address', type: 'text', def: '192.168.1.0' },
    { key: 'cidr', label: 'CIDR prefix (/0–/32)', type: 'number', def: 24, min: 0, max: 32 },
  ],
  content: {
    intro: 'Calculate the network address, broadcast address, usable host range, subnet mask, and total addresses for any IPv4 network from an IP and CIDR prefix.',
    how: 'The CIDR prefix defines how many bits are the network portion. The tool applies the subnet mask with bitwise operations to derive the network and broadcast addresses, then counts the usable hosts between them.',
    howSteps: [
      'Input the base IPv4 address into the tool.',
      'Enter the CIDR prefix (e.g., 24).',
      'Instantly view the calculated subnet mask, broadcast IP, and usable host range.'
    ],
    faqs: [
      ['What does a /24 actually mean?', 'The /24 is CIDR notation indicating the first 24 bits are dedicated to the network, leaving 8 bits for hosts. This translates to the classic 255.255.255.0 subnet mask.'],
      ['Why are two addresses always unusable in a range?', 'The absolute first IP defines the network identifier, and the final IP is reserved for mass broadcasting. Neither can be assigned to a specific computer.'],
      ['What is a wildcard mask?', 'It is the exact mathematical inverse of the subnet mask, heavily utilized in Cisco Access Control Lists (ACLs).']
    ],
  },
  related: ['number-base-converter', 'hash-generator', 'aspect-ratio-calculator', 'css-specificity-calculator'],
},
{
  slug: 'aspect-ratio-calculator', name: 'Aspect Ratio Calculator', prio: 'P1', category: 'developer', widget: 'calc',
  short: 'Simplify width:height to a ratio and scale dimensions proportionally.',
  metaDescription: 'Calculate aspect ratios and scale dimensions proportionally online. Ensure images and videos maintain correct proportions when resized.',
  keywords: ['aspect ratio calculator','ratio calculator','image dimension calculator','resize ratio calculator','16:9 calculator'],
  fields: [
    { key: 'width', label: 'Original width', type: 'number', def: 1920, min: 0 },
    { key: 'height', label: 'Original height', type: 'number', def: 1080, min: 0 },
    { key: 'newWidth', label: 'New width (optional — solves height)', type: 'number', def: '' },
    { key: 'newHeight', label: 'New height (optional — solves width)', type: 'number', def: '' },
  ],
  content: {
    intro: 'Reduce any width and height to their simplest aspect ratio, and proportionally scale to a new width or height while keeping the ratio intact — ideal for images, video, and responsive design.',
    how: 'The ratio is found by dividing both dimensions by their greatest common divisor (GCD). To scale, the tool multiplies by the decimal ratio so the new dimensions keep the same proportions.',
    howSteps: [
      'Enter the original width and height of your media.',
      'To scale, enter your target new width OR target new height.',
      'The calculator automatically solves for the missing dimension to maintain perfect proportions.'
    ],
    faqs: [
      ['Why is the 16:9 aspect ratio so important?', '16:9 is the universal widescreen standard for modern HD video, televisions, and monitors (including 1080p and 4K resolutions).'],
      ['How do I ensure my image doesn\'t stretch when resizing?', 'By strictly adhering to the calculated aspect ratio. The math guarantees the new dimensions respect the original proportions.'],
      ['What ratio is optimal for social media content?', '1:1 (square) and 4:5 work best for Instagram feeds, while 9:16 is mandatory for vertical formats like Stories, Reels, and TikTok.']
    ],
  },
  related: ['image-resizer', 'ip-subnet-calculator', 'css-specificity-calculator', 'color-blindness-simulator'],
},
{
  slug: 'css-specificity-calculator', name: 'CSS Specificity Calculator', prio: 'P1', category: 'developer', widget: 'cssspecificity',
  short: 'Calculate the specificity of any CSS selector with a visual breakdown.',
  metaDescription: 'Calculate CSS selector specificity scores online. Debug why styles aren\'t applying with a visual breakdown of ID, Class, and Element weights.',
  keywords: ['css specificity calculator','specificity calculator','css selector specificity','css priority calculator'],
  content: {
    intro: 'Calculate the specificity of any CSS selector as an (a, b, c) score, with a color-coded breakdown of every component — so you can understand why one rule overrides another.',
    how: 'Specificity is counted in three groups: IDs (a), classes/attributes/pseudo-classes (b), and elements/pseudo-elements (c). Higher groups always win — a single ID beats any number of classes.',
    howSteps: [
      'Enter your complex CSS selector string into the input bar.',
      'The engine dissects the string into IDs, Classes, and Elements.',
      'Read the calculated (a, b, c) weight score to understand the cascade priority.'
    ],
    faqs: [
      ['How exactly is CSS specificity calculated by the browser?', 'It evaluates from left to right: IDs (a), then Classes (b), then Elements (c). A score of (1,0,0) will categorically override a score of (0,99,99).'],
      ['Does !important increase specificity mathematically?', 'No. `!important` fundamentally hijacks the cascade and overrides specificity entirely. It should be used as a last resort.'],
      ['Why does the :where() pseudo-class count as a zero score?', 'The modern `:where()` selector was explicitly designed by specification to have zero specificity, allowing developers to create highly flexible, easily overrideable defaults.']
    ],
  },
  related: ['ip-subnet-calculator', 'aspect-ratio-calculator', 'color-blindness-simulator', 'html-minifier'],
},
{
  slug: 'html-to-markdown', name: 'HTML to Markdown Converter', prio: 'P1', category: 'developer', widget: 'devtransform', transformKey: 'htmlToMarkdown',
  short: 'Convert HTML into clean Markdown — headings, lists, links, images, and code.',
  metaDescription: 'Convert HTML into clean Markdown instantly online. Strip out scripts and transform markup into pure Markdown syntax securely in your browser.',
  keywords: ['html to markdown','html to md converter','convert html to markdown','html markdown converter'],
  content: {
    intro: 'Paste HTML and get clean Markdown back — headings, bold and italic, links, images, lists, blockquotes, code blocks, and horizontal rules are all converted. Scripts and styles are stripped for safety.',
    how: 'The converter maps each HTML element to its Markdown equivalent (h1→#, strong→**, a→[text](url)) then strips any remaining tags and decodes entities. Everything runs locally.',
    howSteps: [
      'Paste your raw HTML block into the parser window.',
      'The engine systematically strips dangerous scripts and maps elements to Markdown logic.',
      'Copy the pristine Markdown output.'
    ],
    faqs: [
      ['Which core HTML elements are supported?', 'The parser reliably maps headings (h1–h6), bold (strong), italics (em), links (a), images (img), lists (ul/ol), quotes (blockquote), and code (pre).'],
      ['Are potentially dangerous scripts removed?', 'Yes. The engine aggressively strips `<script>`, `<style>`, and HTML comments entirely, guaranteeing executable safety.'],
      ['Can I convert an entire web page layout?', 'While you can paste full source code, complex CSS layouts (grids, navbars) degrade into messy plain text. It works flawlessly on article body content.']
    ],
  },
  related: ['markdown-to-html', 'markdown-previewer', 'markdown-table-generator', 'html-encode-decode'],
},
{
  slug: 'markdown-previewer', name: 'Markdown Previewer', prio: 'P1', category: 'developer', widget: 'markdownpreview',
  short: 'Live side-by-side Markdown editor with instant preview.',
  metaDescription: 'Live Markdown editor and previewer online. Write Markdown syntax securely with an instant HTML rendering engine right in your browser.',
  keywords: ['markdown previewer','markdown editor online','markdown live preview','md previewer'],
  content: {
    intro: 'Write Markdown on the left and see the rendered result instantly on the right — headings, emphasis, lists, blockquotes, code blocks, links, and horizontal rules, all updating as you type.',
    how: 'A safe local parser escapes your input first, then converts Markdown syntax to HTML, so even pasted HTML cannot execute. Nothing you type leaves your browser.',
    howSteps: [
      'Write or paste Markdown syntax into the left-side editor panel.',
      'The engine immediately compiles the Markdown into HTML.',
      'Review the visually styled preview on the right side in real-time.'
    ],
    faqs: [
      ['Which flavor of Markdown is technically supported?', 'It supports the universal core specification shared by all flavors: headings, emphasis, fenced code blocks, lists, blockquotes, and links.'],
      ['Can I safely paste raw HTML into the editor?', 'Yes. Any pasted HTML is strictly escaped and rendered visually as plain text rather than executed, providing absolute protection against XSS payloads.'],
      ['How do I save my document?', 'You can simply copy the raw text from the left editor. The preview side exists purely to validate your formatting logic.']
    ],
  },
  related: ['markdown-to-html', 'html-to-markdown', 'markdown-table-generator', 'word-counter'],
},
{
  slug: 'markdown-table-generator', name: 'Markdown Table Generator', prio: 'P1', category: 'developer', widget: 'markdowntable',
  short: 'Build Markdown tables visually with an editable grid and alignment options.',
  metaDescription: 'Generate Markdown tables visually online. Create, align, and copy perfectly formatted Markdown tables for GitHub or Notion instantly.',
  keywords: ['markdown table generator','md table generator','markdown table maker','create markdown table'],
  content: {
    intro: 'Build a Markdown table by typing into a visual grid — choose rows, columns, and alignment, and get perfectly formatted, column-aligned Markdown ready to paste into GitHub, Notion, or any editor.',
    how: 'The first row becomes the header. The generator pads every column to equal width so the raw Markdown stays readable, and writes the alignment row (:--- , :---: , ---:) based on your choice.',
    howSteps: [
      'Configure the grid by selecting the desired number of rows and columns.',
      'Click into the visual cells and type your data.',
      'Adjust text alignment, then copy the perfectly formatted Markdown syntax.'
    ],
    faqs: [
      ['How does the Markdown table syntax work under the hood?', 'It requires a header row, a separator row of dashes, and data rows — all split by pipe (|) characters. Colons indicate alignment (:--- is left).'],
      ['Do all Markdown platforms support tables?', 'GitHub, Notion, and Obsidian fully support them. However, standard original Markdown lacked table specs, so a few older parsers might fail.'],
      ['Can I force line breaks inside a specific cell?', 'Standard Markdown fundamentally forbids multi-line table cells. On platforms that allow HTML (like GitHub), you can manually insert a `<br>` tag.']
    ],
  },
  related: ['markdown-previewer', 'markdown-to-html', 'html-to-markdown', 'csv-to-json'],
},
];
