# SEO / AEO / GEO plan — tool pages (18 November 2026)

Scope: the 340 tool pages (about 294 canonical), their titles, descriptions, URLs, on-page content, FAQ/structured data, and AI-answer (AEO/GEO) readiness.

## 1. What was measured in the repo (before changes)

| Check | Result |
| --- | --- |
| Tool pages audited (aliases excluded) | 340 registry rows |
| Titles that are only the bare tool name | 304 of 340 (curated: 21 editorial + ~15 intent notes) |
| Titles under 25 characters | 237 — no keyword modifier, no benefit, no differentiator |
| Titles over 60 characters (after the ` \| All Tools Together` template) | the curated ones, e.g. "Mortgage Calculator — Payment, Taxes & Interest \| All Tools Together" is 67 → truncated in results |
| Meta descriptions under 110 / over 160 chars | 15 / 2 |
| Pages with 21 deep editorial blocks | 21 of 340 |
| Average hand-written body copy per page (intro + how + example) | about 56 words |
| Pages with 3 or fewer FAQs | 322 of 340 |
| Pages with no cited source | 280 of 340 |
| URL pattern | `/{category}/{keyword-slug}`; already keyword-form. One exception: `us-mileage-calculator-2026` (year in slug) |

Already in good shape (not redone): canonical URLs, sitemap with real lastmod, BreadcrumbList, WebApplication + FAQPage JSON-LD, llms.txt / llms-full.txt, AI-crawler rules, IndexNow, author/methodology/editorial-policy pages.

## 2. SERP review (18 Nov 2026, live searches)

I could **not** obtain search volumes, keyword difficulty or live rank positions: no Search Console / Ahrefs / Semrush export was available, and the search tool returns result lists, not metrics. The findings below are qualitative observations of who ranks and what they emphasise. Treat every priority below as a hypothesis to confirm in Search Console after launch.

| Query cluster | Who occupies results | Pattern seen | Gap this site can credibly fill |
| --- | --- | --- | --- |
| merge / split / compress PDF | Adobe, Smallpdf, iLovePDF-style, PDFgear, Cloudinary; many small mirror sites | Titles = action + "Online Free"; pages stress "free", "no signup", file/size limits | Real **in-browser** processing (no upload) is a verifiable differentiator; state it in title, description and body |
| PDF to Word + OCR | Smallpdf (OCR is paid), PDFgear (free OCR), Able2Extract (1 free/day) | Searchers compare "free OCR" limits | Be explicit about limits, scan handling and that results need review |
| mortgage calculator | HSH, Fannie Mae, NerdWallet, Omni, Bankrate, Redfin, SmartAsset | Pages show PITI, amortization, PMI, comparison; large brands dominate the head term | Do not fight the head term; target "mortgage payment with taxes and insurance", "15 vs 30 year", amortization intent with formula + worked table |
| SIP calculator (India) | INDmoney, FundsIndia, DSP, Bajaj Finserv, Kotak Neo, Omni | Step-up SIP, inflation-adjusted, lumpsum comparison, tax caveats | Show assumptions, ₹ lakh/crore formatting, tax caveat, FY labels |
| cm to inches | many small calculators (alcula, mathda, gigacalculator, num8ers) | Converter + reference chart + formula + FAQ; small sites can rank | Converter + chart + exact factor (already present on this site) |
| JSON formatter / validator | jsonlint, curiousconcept, many small tools | "Format, validate, minify"; privacy ("nothing is uploaded") is a recurring claim | Lead with format/validate/minify + local processing |
| word / character counter | wordcounter.net, QuillBot, Ratatype, Geekflare | Counts + reading/speaking time + keyword density + platform limits | Add platform character limits and reading-time method |
| compress image | Tinify, Gumlet, CapCut, many browser tools | "Without losing quality" phrase; privacy and file-limit claims | State "visually lossless" honestly; quality slider; local processing |

Cross-cutting takeaways used in the implementation:
1. Head terms are held by large brands; small sites win on **specific intent + a verifiable differentiator** (local processing, formula shown, reference table, assumptions stated).
2. Titles that rank put the primary keyword first and one concrete modifier second.
3. Search results increasingly surface mirror / scraper domains; originality (computed examples, cited sources) is the durable advantage.

## 3. Strategy

### 3.1 Titles and descriptions (applied)
- Absolute titles, 30–60 characters, primary keyword first, one concrete modifier, **no brand suffix** when it would exceed 60 characters (brand stays in Open Graph).
- Descriptions 120–158 characters, keyword + outcome + verifiable differentiator. Claims such as "in your browser / no upload" are used only for tools that actually process locally; server tools say so.
- 64 head/high-intent tools get hand-written entries; all others get a deterministic pattern by tool type. Unit tests enforce length, uniqueness and primary-keyword presence.

### 3.2 URLs (decision: keep)
All canonical slugs are already keyword-form and are in the sitemap/IndexNow history. Renaming adds redirect risk with no ranking evidence. One candidate remains: `/tax/us-mileage-calculator-2026` (year in the slug). Deferred; if changed, add a 301 in `public/_redirects` and update links.

### 3.3 On-page depth (applied, data-driven)
Hand-writing 340 deep articles is not realistic or honest. Instead every calculator page now renders **content computed by the page's own formula**:
- "Inputs and results" — the actual fields, units and outputs.
- "Sample results" — a table of scenarios produced at build time by the tool's own compute function (so numbers can never disagree with the tool).
- Local/server processing statement derived from the tool's real mode.
- Question-form FAQs ("How is X calculated?", "What inputs does X need?", "Is X free and private?") that mirror People-Also-Ask phrasing and share the same data as the FAQPage JSON-LD.

The 21 existing editorial pages keep their richer content.

### 3.4 AEO / GEO
- Answer-first block already exists; FAQs now cover the question forms above.
- Entity consistency: one canonical name per tool, same name in H1, title, schema and llms-full.
- `llms-full.txt` now carries each tool's keyword focus and inputs.
- Category pages get keyword-focused titles/descriptions.

### 3.5 Not done / needs a human
- Search volumes, difficulty and ranking tracking: connect Search Console and Bing Webmaster, then re-prioritise the curated list.
- Expert review for YMYL calculators (finance, tax, health) remains pending.
- Backlinks / digital PR: not addressable in code.
- HowTo and FAQ rich results are no longer shown for most sites in Google; those schemas are kept for machine readability, not as a rich-result promise.
- No ranking improvement is guaranteed by any of these changes.

## 4. Applied results (verified by tests and a production build)

| Item | Before | After |
| --- | --- | --- |
| Titles that are only the bare tool name | 304 / 340 | 0 — 75 hand-written, 15 intent-specific, 13 editorial, 237 pattern-based (keyword + concrete modifier) |
| Titles over 60 characters | several curated ones (brand suffix added ~22) | 0 (absolute titles, enforced by test) |
| Descriptions outside 120–158 characters | 17 | 0 (enforced by test); all unique |
| "In your browser / no upload" on server tools | not checked | impossible: a test fails if a server tool uses it |
| Calculator pages with computed sample tables | 0 | 140 of 171 calculators (the rest use dates/clock-dependent inputs and are skipped on purpose) |
| FAQs | 3 on most pages | +3–4 question-form FAQs per tool; rendered text and FAQPage JSON-LD verified equal in built HTML |
| Category hub titles | "Finance & Money — 46 Free Online Tools" style | 19 keyword-focused titles/descriptions |
| `llms-full.txt` | name, URL, method | adds search focus, processing mode and inputs (307 tools) |

Files: `lib/seo/{curated,meta,content,categories}.ts`, `app/[category]/[tool]/page.tsx`, `app/[category]/page.tsx`, `scripts/generate-discovery.ts`, `tests/seo-meta.test.ts`.

Next steps needing real data: connect Search Console, export queries after 4–6 weeks, then re-curate titles for tools whose impressions are high and CTR is low; add more curated entries for the 237 pattern-based tools by impressions.

## 5. Batch 2 — next 50 tools and auto-linking (applied)

### Content team and quality gate
Five writer agents (a small model) each drafted 10 tools to a strict JSON schema: title, description, answer-first definition, 3 question-form sections, 3 FAQs, and example *inputs only*. A script then rejected anything that failed: title 30–60 chars, description 120–158, section/FAQ word ranges, banned superlatives, privacy claims on non-local tools, duplicate/existing FAQs, unknown or out-of-range example inputs, and **any number not found in the tool's own text** (24 of 50 were flagged on the first pass). Every flagged number and every claim about tool behaviour was then checked against the tool's code (e.g. 1.4 t/yd³ gravel, 13.5 mulch bags/yd³, 10-billion-guesses/s password estimate, CIDR 0–32, overnight shifts in the hours tool). Worked examples are computed by each tool's own formula, so a writer cannot invent a result.

Tools covered: due date, ovulation, fraction, final grade, scientific calculator, hours, currency converter, CSS gradient, box shadow, color palette, IP subnet, HTML→Markdown, Markdown previewer, password strength, UTM builder, image cropper/converter, favicon generator, square footage, capital gains, paint, flooring, gravel, mulch, grams↔cups, recipe scaling, cooking units, calories burned, Ohm's law, Newton's second law, density, pH, z-score, confidence interval, sample size, CAC, CLV, ROAS, dollar-cost averaging, crypto P/L, stock return, self-employment tax, fuel cost, battery life, random number, coin flip, random name picker, typing test, tip, ROI. (The four server-backed writing/shortener tools already have dedicated guides and were excluded.)

### Indexed ↔ not-indexed auto-linking
`lib/seo/autolink.ts`, rendered by `components/AutoLinks.tsx`:
- Indexable PDF/image pages link to up to five topical server tools (`noindex, follow`) under a heading that says files are sent to a server; not-indexed pages link back to up to four **browser-only** alternatives.
- A curated user-journey map (`PENDING_ANCHORS`) is the primary source; a keyword scorer only fills remaining slots within the same category, so a JSON tool never links to a PDF tool.
- Deterministic load balancing guarantees **every one of the 33 not-indexed tools has at least two incoming links** from indexable pages, capped per page (test-enforced).
- When `NEXT_PUBLIC_DOCUMENTS_READY=true` these tools become indexable and the blocks disappear automatically; the normal related-tools block takes over.
- Alias URLs produce no links (a build crash on alias pages was found and fixed, with a regression test).

Verified: 394 tests, typecheck, production build; built HTML shows FAQ JSON-LD equal to visible FAQs on sampled pages.

Totals now: 125 hand-reviewed titles/descriptions, 15 intent-specific, 13 editorial, 187 pattern-based.

## 6. Batch 3 — another 50 tools (applied)

Same pipeline as batch 2 (writer agents → script gate → check against tool code). The gate passed 47/50 on the first complete run, then 50/50 after the files finished writing; no number or formula name outside the tool's own text survived. A proper-noun scan found one misleading sentence (an invented "ECB basket" claim on USD→INR), which was corrected; the ECB source itself is real (the tool fetches ECB-sourced rates via Frankfurter).

Tools covered: simple interest, savings, DTI, down payment, sales tax, Roth IRA, investment, debt snowball, budget, APR, net worth, CD, break-even, overtime, one-rep max, pace, ideal weight, body fat, sleep, A1C, quadratic formula, LCM, square root, standard deviation, prime factorization, Pythagorean theorem, triangle area, add days to date, business days, time duration, day of week, unit/length/weight/temperature/area/volume/speed/data-storage/pressure/energy/power/time/fuel-economy converters, USD→GBP, USD→INR, slug generator, lorem ipsum, find & replace, readability checker.

Date/time-input calculators intentionally have no computed worked example (their results depend on the clock/calendar).

Totals now: 175 hand-reviewed titles/descriptions (75 + 50 + 50), 15 intent-specific, 13 editorial, ~137 pattern-based. Verified with the exact Netlify build command (`npm run check && npm run build && npm run audit:export`).

## 7. Batch 4 — 100 tools with target keywords, AI summary and keyword test (applied)

### What each of the 100 tools now has
- **Short target keyword** (the head term) that must appear verbatim in the title, meta description and the first 70 words of the answer.
- **Three long-tail phrases** that must each appear verbatim in a section heading, an FAQ question, the answer or the summary, with at least two used as headings/FAQ questions. Content was written around these phrases.
- **AI summary** (30–62 words, self-contained, different wording from the answer) shown in a new **"at a glance"** block, plus key facts derived from the tool's own data (method, inputs, results, where it runs). `WebPage` JSON-LD gains `abstract` and `keywords`.
- Same quality gate as earlier batches (lengths, banned claims, numbers must come from the tool, examples computed by the tool) plus: no search-volume/ranking claims, `bac-calculator` must say it must never be used to decide whether to drive. A proper-noun scan was checked against code (Mosteller and Du Bois, A4/Letter, ISO first-Thursday week rule, Roman 1–3999). Two phrase false-positives ("not … guarantees", "the number one" as a digit) were reviewed; the second was reworded.
- Two writer defects were repaired by hand: the smoking-cost tool had one FAQ instead of three, and one tool used a textarea field type that the example computer did not support (now supported).

### Keyword test (`npm run report:keywords` → `docs/KEYWORD_COVERAGE_REPORT.md`)
It tests **on-page placement only**. It cannot measure search volume, rankings, impressions or whether any AI answer cites the page.

| Group | Tools | Title | Description | H1 | Answer (first 70 words) | Long-tail phrases on page |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Declared keywords (batch 4) | 100 | 100% | 100% | 90% | 100% | 100% |
| Registry keywords only (older 207) | 207 | 88% | 23% | 94% | 33% | 10% |

The older tools are the next gap: their registry keyword is usually in the title but rarely in the description or opening answer.

### Live check
A search for `site:alltoolstogether.com` and for the site name plus "cm to inches converter" returned **no pages from this domain**. The tool is a limited, US-only search summary, so this is not proof, but it suggests the site is not yet indexed or ranking. Submit the sitemap in Google Search Console and Bing Webmaster Tools and verify indexing there. In the same search, many small `*.pages.dev` converter sites rank, which shows small sites can compete on narrow intents.

### AI overviews
No markup guarantees inclusion in an AI overview. The pages provide what these systems read: a direct answer, a self-contained summary, question-form headings and FAQs, a computed worked example, a source-of-truth method statement, and structured data that matches visible content. Long-tail phrases were suggested by a model, not validated against query data; replace them with real Search Console queries after a few weeks.

## 8. Round 5 — head keyword in description and opening answer for the older tools (applied)

The keyword report showed the older 207 tools had their keyword in the title (88%) but rarely in the description (23%) or the first 70 words of the answer (33%). 189 tools needed work.

- **Titles were not changed.** For each tool the head keyword is the term already in its title, so no URL/title churn.
- 13 writer agents rewrote only the meta **description** and the **opening answer**, under the same gate as before: keyword verbatim in title, description and answer; description 120–158 chars and unique; no invented numbers or names (a proper-noun scan found none); no volume/ranking claims; no browser/privacy claim on server tools; existing limitations ("educational estimate, not professional advice") must be kept. Two keyword shapes were fixed by hand (Mean/Median/Mode, Crypto Profit/Loss).
- Acronyms were capitalised (HRA, EMI, SIP, JSON, PDF, …). The 20 editorial pages keep their hand-written numeric answer; only their description changed.
- New `lib/seo/openers.ts` (`OPENERS`, `answerFor`) feeds both the page and the keyword report; a permanent test keeps the keyword in title, description and answer.

Result (`npm run report:keywords`):

| Group | Tools | Title | Description | Answer (first 70 words) |
| --- | ---: | ---: | ---: | ---: |
| Short + 3 long-tail + AI summary (round 4) | 100 | 100% | 100% | 100% |
| Short keyword in description + answer (round 5) | 189 | 100% | 100% | 94% (editorial answers kept) |
| Registry keywords only | 18 | 100% | 100% | 100% |

Known weaknesses: some descriptions place the keyword at the end ("… with this mortgage calculator") rather than the start; only the round-4 tools have long-tail phrases; none of this measures rankings, volume or AI citations.
