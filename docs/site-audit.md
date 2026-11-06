# All Tools Together site audit

The audit compared the GitHub catalog, calculator and widget implementations, and the static export produced for Netlify. The initial registry contained 284 entries, including eight duplicate slugs. The duplicates could overwrite earlier entries in slug lookups. Thirteen calculator entries lacked matching calculation handlers. The revised catalog has 276 unique routes.

| Area | Changes applied | Verification |
| --- | --- | --- |
| Catalog and links | Remove duplicate entries, connect missing calculator handlers, and redirect the old finance smoking-cost URL to its health category. | Catalog tests check each slug, widget, calculator, related link, and alias. |
| Indexing | Generate the sitemap from the catalog. Include the four backend-dependent URLs as public guides. Exclude three overlapping aliases. Point aliases at their primary canonical URLs. | Audit exported canonicals, sitemap URLs, robots.txt, titles, headings, and internal links. |
| Answer and AI discovery | Keep explanations, FAQs, steps, limitations, and source links visible in the HTML. Correct claims about browser processing and update the social preview asset. | Parse exported structured data and check local assets. |
| Tool correctness | Fix date and DST edge cases, stale exchange rates, science outputs, PDF page ranges and previews, and unsafe Markdown links. Update U.S. tax estimates with published 2026 values. | Run regression cases for the affected calculations and parsers. |
| Netlify | Publish the static out directory and run checks before deploy. Keep unknown routes eligible for a real HTTP 404. | Run the configured build and static export audit locally. |

## Verify after release

1. Confirm the Netlify production deploy is tied to the merged commit. Check the home page, a tool, robots.txt, sitemap.xml, the social image, and a nonexistent URL on alltoolstogether.com.
2. Resubmit sitemap.xml in Google Search Console and inspect representative URLs from the finance, developer, and PDF hubs. Check Google's selected canonical and monitor Page indexing for crawl or duplicate issues. An export audit establishes indexability signals. Google Search Console is needed to verify Google's indexing decisions.
3. Check the public guides for Grammar Checker, Paraphrasing Tool, Plagiarism Checker, and URL Shortener. Verify the providers and data handling separately before advertising working online services.
4. Prioritize missing workflows by Search Console demand. PDF compression and PDF to Word are candidates for evaluation. Define limits and test output size or document fidelity with real files before adding either to the public catalog.
5. Plan a separate upgrade from the Next.js 14 release line to a supported major version. Verify Netlify exports and client-side file workflows on that upgrade.

Run `SEO_AUDIT_REPORT=/tmp/alltools-seo.json npm run audit:export` after a build to record each page title, description, canonical URL, robots directive, and sitemap membership. The audit fails if an indexable page has a duplicate title or description, a noindex directive, or a conflicting canonical URL.
