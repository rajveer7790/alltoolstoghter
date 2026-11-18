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
