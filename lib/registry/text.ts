import { ToolDef } from '../types';

export const TEXT: ToolDef[] = [
{
  slug: 'word-counter', name: 'Word Counter', prio: 'P1', category: 'text', widget: 'wordcounter', textKind: 'wordcounter',
  short: 'Words, characters, sentences, paragraphs, and reading time — live.',
  metaDescription: 'Free online word counter. Count words, characters, sentences, and paragraphs in real-time. Calculate reading time securely in your browser.',
  keywords: ['word counter', 'word count tool', 'count words online', 'character counter'],
  content: {
    intro: 'Paste or type and watch the counts update live: words, characters (with and without spaces), sentences, paragraphs, and estimated reading time.',
    how: 'Words are matched as letter/number runs (Unicode-aware, so accented words and hyphenations count correctly). Reading time assumes 200 words per minute, the common adult average.',
    howSteps: [
      'Type or paste your text into the editor area.',
      'The tool instantly analyzes the text locally without uploading it.',
      'Read the real-time statistics for words, characters, sentences, and reading time.'
    ],
    faqs: [
      ['Does it count words in other languages?', 'Yes for space-separated languages. Languages without spaces (Chinese, Japanese) count differently and character count is the better metric.'],
      ['Why two character counts?', 'Some limits include spaces (most social platforms); some don\'t (certain forms and SMS billing). Both are shown.'],
      ['Is my text uploaded anywhere?', 'No — everything runs in your browser. Nothing you type leaves your device.'],
      ['Does punctuation affect the word count?', 'No. Punctuation attached to a word (like a period or comma) is part of that token, not a separate word.']
    ],
  },
  related: ['remove-extra-spaces', 'character-counter', 'case-converter', 'lorem-ipsum-generator'],
},
{
  slug: 'character-counter', name: 'Character Counter', prio: 'P1', category: 'text', widget: 'wordcounter', textKind: 'wordcounter',
  short: 'Live character count with and without spaces, plus platform limits.',
  metaDescription: 'Free online character counter. Count characters with and without spaces for Twitter, Instagram, and SMS. 100% private and runs locally.',
  keywords: ['character counter', 'character count', 'letter counter', 'twitter character count'],
  content: {
    intro: 'A live character counter for length-limited writing: bios, posts, meta descriptions, and SMS — with counts shown both with and without spaces.',
    how: 'Characters are counted as Unicode code points, so emoji and accents count correctly. Useful anchors: X/Twitter 280, Instagram bio 150, Google meta description ~155–160, SMS segment 160.',
    howSteps: [
      'Paste your content into the text area.',
      'Check the total character count with and without spaces.',
      'Compare your count against common social media limits (e.g., Twitter, Instagram).'
    ],
    faqs: [
      ['Do emoji count as one character?', 'Usually 1–2 here (some complex emoji combine several code points); platforms may weight them differently.'],
      ['Spaces in or out?', 'Most platform limits include spaces. The without-spaces figure is for forms and billing systems that exclude them.'],
      ['Is anything stored?', 'No — counting happens entirely in your browser.'],
    ],
  },
  related: ['word-counter', 'case-converter', 'slug-generator', 'text-repeater'],
},
{
  slug: 'case-converter', name: 'Case Converter', prio: 'P1', category: 'text', widget: 'text', textKind: 'case',
  short: 'UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.',
  metaDescription: 'Convert text case online instantly. Change between lowercase, UPPERCASE, Title Case, camelCase, and snake_case for free.',
  keywords: ['case converter', 'uppercase to lowercase', 'title case converter', 'change text case'],
  content: {
    intro: 'Convert any text between seven cases — writing cases (upper, lower, title, sentence) and programming cases (camel, snake, kebab) — in one click.',
    how: 'Writing cases transform character casing; programming cases also normalize separators: spaces and punctuation become the joiner (_ or -) or hump boundaries (camelCase).',
    howSteps: [
      'Paste your unformatted text into the editor.',
      'Click the desired case format button (e.g., UPPERCASE or camelCase).',
      'Copy the converted text instantly.'
    ],
    faqs: [
      ['What is sentence case?', 'Only the first letter of each sentence capitalized — standard prose style.'],
      ['camelCase vs snake_case?', 'Conventions by language: camelCase rules JavaScript/Java; snake_case rules Python; kebab-case appears in URLs and CSS.'],
      ['Will it break my acronyms?', 'Case transforms apply uniformly, so NASA becomes nasa in lowercase. Re-fix proper nouns after converting.']
    ],
  },
  related: ['text-to-binary', 'word-counter', 'slug-generator', 'title-case-converter'],
},
{
  slug: 'reverse-text', name: 'Reverse Text', prio: 'P3', category: 'text', widget: 'text', textKind: 'reverse',
  short: 'Flip text backwards — by characters or by word order.',
  metaDescription: 'Reverse text online for free. Flip words backwards or reverse entire sentences character-by-character. Fun, private, and local tool.',
  keywords: ['reverse text', 'backwards text generator', 'flip text', 'reverse words'],
  content: {
    intro: 'Reverse a string character-by-character (mirror writing) or reverse the order of words while keeping each word readable.',
    how: 'Character mode splits to an array, reverses, and rejoins (Unicode-aware so emoji don\'t corrupt). Word mode splits on spaces and reverses the sequence.',
    howSteps: [
      'Type or paste your text into the input field.',
      'Choose whether to reverse by characters or by words.',
      'Copy the reversed string.'
    ],
    faqs: [
      ['Why does my emoji break in other tools?', 'Naive reversal splits multi-byte characters. This tool reverses by full character, keeping emoji intact.'],
      ['What is reversed text used for?', 'Puzzles, palindrome checking, novelty social posts, and testing how software handles odd input.'],
      ['Can I undo it?', 'Reverse is its own inverse — run the result through again to restore the original.']
    ],
  },
  related: ['case-converter', 'text-repeater', 'word-counter', 'remove-line-breaks'],
},
{
  slug: 'remove-line-breaks', name: 'Remove Line Breaks', prio: 'P3', category: 'text', widget: 'text', textKind: 'linebreaks',
  short: 'Strip or replace line breaks — with a paragraph-preserving mode.',
  metaDescription: 'Remove line breaks from text online. Clean up messy PDF copy-pastes by stripping hard returns or converting them to spaces automatically.',
  keywords: ['remove line breaks', 'remove line breaks online', 'strip returns', 'clean pdf text'],
  content: {
    intro: 'Clean up text copied from PDFs and emails where every line ends in a hard break: join lines with spaces, remove breaks entirely, or keep paragraph gaps.',
    how: '"Replace with spaces" joins all lines. "Keep paragraphs" joins single breaks but preserves blank-line paragraph separations — usually what PDF cleanup needs.',
    howSteps: [
      'Paste your fragmented text (e.g., from a PDF) into the tool.',
      'Select whether to replace breaks with spaces, remove them entirely, or preserve paragraphs.',
      'Copy the clean, continuous text block.'
    ],
    faqs: [
      ['Why does PDF text paste so badly?', 'PDFs store visual lines, not logical paragraphs, so each visual line ends with a break that becomes a hard return on paste.'],
      ['Which mode for PDF cleanup?', '"Keep paragraphs" — it heals mid-paragraph breaks while preserving real paragraph boundaries.'],
      ['Does it touch anything else?', 'No — only line breaks (and the surrounding whitespace) are modified.']
    ],
  },
  related: ['case-converter', 'word-counter', 'reverse-text', 'slug-generator'],
},
{
  slug: 'slug-generator', name: 'Slug Generator', prio: 'P2', category: 'text', widget: 'text', textKind: 'slug',
  short: 'Clean, SEO-friendly URL slugs from any title.',
  metaDescription: 'Generate clean URL slugs online. Convert titles into SEO-friendly, hyphen-separated slugs instantly in your browser.',
  keywords: ['slug generator', 'url slug generator', 'create url slug', 'seo slug maker'],
  content: {
    intro: 'Turn a headline into a URL-safe slug: lowercase, hyphen-separated, accents stripped, punctuation removed.',
    how: 'The text is Unicode-normalized (é → e), lowercased, and every non-alphanumeric run collapses to a single hyphen with edges trimmed — the convention every major CMS follows.',
    howSteps: [
      'Enter your article title or headline.',
      'The tool automatically strips punctuation, normalizes accents, and replaces spaces with hyphens.',
      'Copy the generated slug for your URL.'
    ],
    faqs: [
      ['Why hyphens, not underscores?', 'Search engines treat hyphens as word separators; underscores historically joined words together.'],
      ['How long should a slug be?', 'Keep the meaningful keywords, drop filler words; 3–6 words is a healthy range.'],
      ['What about non-Latin scripts?', 'Accented Latin transliterates (café → cafe). Fully non-Latin text needs a transliteration scheme beyond simple slugging.']
    ],
  },
  related: ['case-converter', 'character-counter', 'title-case-converter', 'word-counter'],
},
{
  slug: 'text-repeater', name: 'Text Repeater', prio: 'P3', category: 'text', widget: 'text', textKind: 'repeat',
  short: 'Repeat any text 5×, 10×, 25×, or 100× instantly.',
  metaDescription: 'Repeat text online instantly. Duplicate a word or phrase up to 100 times for testing, social media, or filler data.',
  keywords: ['text repeater', 'repeat text generator', 'duplicate text'],
  content: {
    intro: 'Duplicate a word or phrase many times, one per line — for testing, filler data, or emphatic messages.',
    how: 'The text is repeated the chosen number of times and joined with line breaks. A size guard caps output at 500k characters to keep your browser responsive.',
    howSteps: [
      'Type the string or word you want to repeat.',
      'Select the multiplier (e.g., 10x or 100x).',
      'Copy the massively repeated text block.'
    ],
    faqs: [
      ['Can I repeat with spaces instead of new lines?', 'This tool uses line breaks; paste the result into Remove Line Breaks with "replace with spaces" for an inline version.'],
      ['Is there a limit?', 'Yes — 100 repetitions and 500k output characters, which protects the page from freezing.'],
      ['What is this actually for?', 'Load-testing text fields, generating CSV filler, and the occasional dramatic group-chat message.']
    ],
  },
  related: ['reverse-text', 'remove-line-breaks', 'case-converter', 'word-counter'],
},
{
  slug: 'title-case-converter', name: 'Title Case Converter', prio: 'P3', category: 'text', widget: 'text', textKind: 'titlecase',
  short: 'Headline-style capitalization with AP-style small-word rules.',
  metaDescription: 'Convert headlines to Title Case automatically. Applies standard AP-style capitalization rules for articles and blogs.',
  keywords: ['title case converter', 'capitalize my title', 'headline capitalization', 'ap style converter'],
  content: {
    intro: 'Capitalize a headline properly: major words capitalized, small words (a, of, the, in…) left lowercase — except first and last words, which always capitalize.',
    how: 'Implements the AP-style convention with a 20-word small-words list. First and last words always capitalize regardless of the list, per every major style guide.',
    howSteps: [
      'Type your rough headline into the tool.',
      'The engine capitalizes major words while intelligently skipping prepositions and articles.',
      'Copy your perfectly formatted headline.'
    ],
    faqs: [
      ['AP vs Chicago vs APA?', 'They differ on which prepositions stay lowercase. This tool follows the common AP-style set, the default for headlines.'],
      ['Why is the first small word capitalized?', 'All style guides capitalize the first and last words of a title, even articles like "The".'],
      ['Should I title-case my blog headlines?', 'Pick one convention — title case or sentence case — and apply it consistently; consistency matters more than the choice.']
    ],
  },
  related: ['case-converter', 'word-counter', 'slug-generator', 'character-counter'],
},
{
  slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', prio: 'P2', category: 'text', widget: 'lorem', textKind: 'lorem',
  short: 'Classic placeholder text — pick the number of paragraphs and copy.',
  metaDescription: 'Generate Lorem Ipsum placeholder text online. Create any number of paragraphs of standard dummy text for web design and mockups.',
  keywords: ['lorem ipsum generator', 'placeholder text generator', 'dummy text', 'lorem text'],
  content: {
    intro: 'Generate the classic lorem ipsum placeholder text in any number of paragraphs, starting with the traditional "Lorem ipsum dolor sit amet" opening.',
    how: 'Paragraphs are assembled from the canonical lorem word pool with varied sentence lengths, deterministic per page load so the layout you tested is the layout you saw.',
    howSteps: [
      'Select how many paragraphs of filler text you need.',
      'The tool instantly generates classic Lorem Ipsum.',
      'Copy the text to paste into your design mockup or wireframe.'
    ],
    faqs: [
      ['Why use lorem ipsum at all?', 'Real-looking word shapes without readable meaning — viewers judge the layout instead of the copy.'],
      ['Where does the text come from?', 'It is scrambled Cicero (De Finibus, 45 BC), in continuous use as filler since the 1500s.'],
      ['Is fake text bad for design?', 'For final review, real content is better — lorem hides copy-length problems. Use it early, swap real text before sign-off.'],
    ],
  },
  related: ['word-counter', 'case-converter', 'text-repeater', 'character-counter'],
},
{
  slug: 'find-and-replace', name: 'Find and Replace Text', prio: 'P2', category: 'text', widget: 'findreplace', textKind: 'findreplace',
  short: 'Bulk find and replace in any text, with regex and case options.',
  metaDescription: 'Find and replace text online instantly. Swap words in bulk, use Regex matching, and process large text files privately in your browser.',
  keywords: ['find and replace online', 'text replace tool', 'regex replace', 'bulk replace text'],
  content: {
    intro: 'Paste text and replace every occurrence of a word or pattern at once, with optional case-insensitive matching and full regular-expression support.',
    how: 'Plain mode escapes your search term and replaces all matches; regex mode treats it as a pattern. A live counter shows how many replacements were made before you copy the result.',
    howSteps: [
      'Paste your large text block into the editor.',
      'Enter the word you want to find, and the word you want to replace it with.',
      'Click replace to swap all instances instantly.'
    ],
    faqs: [
      ['How is this better than my editor?', 'No setup — paste, replace, copy. Handy on mobile or for quick one-off cleanups.'],
      ['Does regex mode support groups?', 'Yes — use $1, $2 in the replacement to reference captured groups, just like in JavaScript.'],
      ['Is anything stored?', 'No — all processing is local to your browser.'],
    ],
  },
  related: ['case-converter', 'remove-line-breaks', 'word-counter', 'slug-generator'],
},
{
  slug: 'text-compare', name: 'Text Compare', prio: 'P2', category: 'text', widget: 'diff', textKind: 'diff',
  short: 'Spot the differences between two blocks of text.',
  metaDescription: 'Compare two text files online to spot differences. Highlight added and removed lines instantly without uploading your private data.',
  keywords: ['text compare', 'compare two texts', 'text difference checker', 'online diff tool'],
  content: {
    intro: 'Compare two passages side by side and highlight exactly what was added or removed, line by line — useful for proofreading edits, contract changes, and revisions.',
    how: 'A longest-common-subsequence diff identifies the minimal additions and deletions between the two versions, marking added lines green and removed lines red.',
    howSteps: [
      'Paste the original text in the left pane.',
      'Paste the revised text in the right pane.',
      'Review the visually highlighted differences, showing additions and deletions.'
    ],
    faqs: [
      ['What is the difference from a developer diff?', 'None at the core — it is the same algorithm, presented for writing and documents rather than code.'],
      ['Can it compare long documents?', 'Yes, though very large texts are best chunked. The comparison is line-based.'],
      ['Does my text stay private?', 'Yes — everything runs locally in your browser.'],
    ],
  },
  related: ['find-and-replace', 'word-counter', 'case-converter', 'readability-checker'],
},
{
  slug: 'readability-checker', name: 'Readability Checker', prio: 'P2', category: 'text', widget: 'readability', textKind: 'readability',
  short: 'Flesch reading ease and grade level for your writing.',
  metaDescription: 'Check text readability online. Calculate Flesch Reading Ease and Grade Level scores instantly to ensure your writing is clear and accessible.',
  keywords: ['readability checker', 'flesch reading ease', 'readability score', 'reading level calculator'],
  content: {
    intro: 'Paste your writing to get its Flesch Reading Ease score and Flesch-Kincaid grade level, with a plain-language interpretation of how hard it is to read.',
    how: 'The scores use sentence length and syllables per word: longer sentences and longer words lower the ease score and raise the grade level. Aim for ease above 60 (plain English) for general audiences.',
    howSteps: [
      'Paste your content into the analyzer box.',
      'The tool immediately calculates sentence structure and syllable density.',
      'Review your Flesch Reading Ease score and the corresponding target audience grade level.'
    ],
    faqs: [
      ['What is a good readability score?', 'A Flesch Reading Ease around 60 to 70 suits most web content; higher is easier. Grade level 6 to 8 reaches the widest audience.'],
      ['How are syllables counted?', 'By a vowel-group heuristic, which is accurate for most English words but can miss unusual spellings.'],
      ['Why does readability matter?', 'Clearer writing keeps readers engaged and is friendlier for search and accessibility.'],
    ],
  },
  related: ['word-counter', 'text-compare', 'case-converter', 'title-case-converter'],
},
{
  slug: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', prio: 'P2', category: 'text', widget: 'text', textKind: 'removeDuplicateLines',
  short: 'Delete repeated lines from a list, keeping the first of each.',
  metaDescription: 'Remove duplicate lines from text online. Clean lists by stripping repeated entries instantly. Free, private, and runs in the browser.',
  keywords: ['remove duplicate lines', 'delete duplicate lines online', 'strip duplicates'],
  content: {
    intro: 'Clean a list by removing repeated lines, keeping only the first occurrence of each — with an option to ignore case and surrounding spaces.',
    how: 'Each line is compared against the ones already seen; duplicates are dropped while original order is preserved. Case-insensitive mode treats "Apple" and "apple" as the same.',
    howSteps: [
      'Paste your list of items into the text area.',
      'The tool scans line by line, preserving the first instance and deleting the rest.',
      'Copy your deduped list.'
    ],
    faqs: [
      ['Does it keep the original order?', 'Yes — the first occurrence of each line stays in place; later duplicates are removed.'],
      ['Does it ignore leading spaces?', 'Lines are trimmed before comparison, so indentation differences do not block duplicate detection.'],
      ['What about case?', 'Switch on "ignore case" to treat differently-cased lines as duplicates.']
    ],
  },
  related: ['sort-text-lines', 'remove-line-breaks', 'word-counter', 'find-and-replace'],
},
{
  slug: 'sort-text-lines', name: 'Sort Text Lines', prio: 'P2', category: 'text', widget: 'text', textKind: 'sortLines',
  short: 'Alphabetize lines A→Z, Z→A, or by length.',
  metaDescription: 'Alphabetize lists online instantly. Sort text lines A-Z, reverse alphabetical, or by string length. Fast and free tool.',
  keywords: ['sort text lines', 'alphabetize list online', 'sort lines alphabetically', 'a to z sorter'],
  content: {
    intro: 'Sort a list of lines alphabetically in either direction, or by line length — handy for tidying lists, imports, and references.',
    how: 'Lines are sorted with locale-aware comparison so accented characters order naturally. Empty lines are removed before sorting.',
    howSteps: [
      'Paste your unsorted list into the editor.',
      'Select your sorting method (A to Z, Z to A, or Length).',
      'Copy the perfectly ordered list.'
    ],
    faqs: [
      ['Is the sort case-sensitive?', 'It uses locale comparison, which generally groups upper and lower case of the same letter together.'],
      ['Can I sort numbers?', 'Lines sort as text, so numeric lists may order lexically (10 before 2). For pure numbers, the length sort can help.'],
      ['Are blank lines kept?', 'No — empty lines are dropped so the sorted output is clean.']
    ],
  },
  related: ['remove-duplicate-lines', 'reverse-text', 'case-converter', 'word-counter'],
},
{
  slug: 'remove-extra-spaces', name: 'Remove Extra Spaces', prio: 'P2', category: 'text', widget: 'text', textKind: 'removeWhitespace',
  short: 'Collapse double spaces, trim lines, or strip all whitespace.',
  metaDescription: 'Remove extra spaces from text online. Collapse double spacing and trim whitespace seamlessly. Fix copy-paste errors instantly.',
  keywords: ['remove extra spaces', 'remove whitespace online', 'trim spaces', 'remove double spaces'],
  content: {
    intro: 'Tidy messy text by collapsing repeated spaces, trimming each line, or removing every space and break entirely — three modes for different cleanup jobs.',
    how: '"Collapse" reduces runs of spaces to one and trims trailing whitespace; "trim each line" removes leading and trailing spaces per line; "remove all" strips every whitespace character.',
    howSteps: [
      'Paste your poorly formatted text into the tool.',
      'Select whether to collapse double spaces, trim line edges, or strip all whitespace.',
      'Copy the perfectly spaced text block.'
    ],
    faqs: [
      ['Which mode fixes copy-paste spacing?', '"Collapse extra spaces" — it fixes the double spaces and stray trailing whitespace that pasting often introduces.'],
      ['Does it remove line breaks?', 'Only "remove all whitespace" does. The other modes keep your line structure.'],
      ['Will it touch spaces inside words?', 'No — it only collapses or removes spacing between and around words, never characters within a word.']
    ],
  },
  related: ['remove-line-breaks', 'find-and-replace', 'case-converter', 'word-counter'],
},
{
  slug: 'text-to-binary', name: 'Text to Binary Converter', prio: 'P3', category: 'text', widget: 'text', textKind: 'textToBinary',
  short: 'Convert text to 8-bit binary and back.',
  metaDescription: 'Convert text to binary online. Translate English words into 8-bit binary code (or decode binary to text) instantly in your browser.',
  keywords: ['text to binary', 'binary to text converter', 'binary translator', 'english to binary'],
  content: {
    intro: 'Translate text into binary (8 bits per character) and decode binary back into readable text — for learning, puzzles, and low-level curiosity.',
    how: 'Each character becomes its 8-bit code (based on its character code), space-separated. Decoding reverses it: each binary byte maps back to a character.',
    howSteps: [
      'Enter your English text or string of binary numbers.',
      'The tool detects the input type and automatically converts it to the other format.',
      'Copy the translated string.'
    ],
    faqs: [
      ['What encoding is used?', 'Each character maps to its Unicode code point as an 8-bit binary value, which covers standard ASCII text directly.'],
      ['Why 8 bits per character?', 'A byte is 8 bits, the classic unit for a character in ASCII. The output pads each value to 8 digits.'],
      ['Can it decode any binary?', 'It expects space-separated 8-bit groups. Other groupings may not decode cleanly.']
    ],
  },
  related: ['base64-encode-decode', 'reverse-text', 'word-counter', 'case-converter'],
},
{
  slug: 'keyword-density-checker', name: 'Keyword Density Checker', prio: 'P2', category: 'text', widget: 'keyworddensity', textKind: 'keyworddensity',
  short: 'Top keywords and their density percentage in your text.',
  metaDescription: 'Check keyword density online for free. Analyze word frequencies to optimize your SEO content without keyword stuffing.',
  keywords: ['keyword density checker', 'keyword density tool', 'word frequency counter', 'seo keyword analyzer'],
  content: {
    intro: 'Analyze any text to see its most frequent keywords and what percentage of the content each represents — a quick SEO check for keyword balance and over-optimization.',
    how: 'The tool counts each word, divides by the total word count for density, and ranks the top terms. Common stop words (the, a, and…) can be filtered so meaningful keywords surface.',
    howSteps: [
      'Paste your article or blog post into the analyzer.',
      'The engine counts term frequencies while optionally filtering out common stop words like "and" or "the".',
      'Review the density table to identify over-used phrases.'
    ],
    faqs: [
      ['What is a good keyword density?', 'There is no magic number; natural writing usually lands a primary keyword around 1–2%. Much higher can read as keyword stuffing.'],
      ['Why filter common words?', 'Words like "the" and "and" dominate every text without meaning. Filtering them reveals the words that actually characterize your content.'],
      ['Does density still matter for SEO?', 'Modern search engines focus on relevance and intent over raw density, but the check helps you avoid unnatural repetition.'],
    ],
  },
  related: ['word-counter', 'readability-checker', 'character-counter', 'slug-generator'],
},
];
