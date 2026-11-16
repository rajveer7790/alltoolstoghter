# Mobile navigation and crawlable link coverage

## Mobile layout correction
The closed navigation drawer remained in the DOM, translated outside the viewport. It was also a fixed descendant of a header with backdrop-filter, which establishes a containing block for fixed descendants. This combination allowed the drawer to appear beside the page and contribute to horizontal overflow.

The drawer now mounts only when open and renders outside the filtered header. It fits the viewport, scrolls independently, accounts for safe areas, locks background scrolling and restores it on close. Escape, backdrop, explicit close, navigation and desktop breakpoint changes dismiss it. Keyboard focus stays in the dialog and returns to its trigger.

Responsive form controls, tool grids, readouts, category headings and long text have intrinsic sizing rules to fit narrow containers. Desktop menus are display:none while closed, and rightmost menus align to the right. The fix does not mask page overflow globally.

## Crawlable discovery
- Header, mobile menu, footer and homepage link directly to the complete /tools directory.
- The homepage exposes two lower-link tools per category as server-rendered links.
- Related category cards expose relevant tools as well as category hubs.
- Tool peer links rotate by source instead of repeatedly showing only the same popular tools.
- Canonical destinations, deduplication, contextual workflow links and self-link exclusion are retained.

## Regression checks
Unit tests verify incoming peer coverage, canonical destinations and relevant discovery links. The export audit reads actual HTML anchors, requires every canonical tool in its category and /tools, requires at least two referring tool pages where the category has enough peers, and verifies every tool is reachable within two link steps from the homepage. It also rejects a closed drawer in exported HTML. Results are written to /internal-link-audit.json with a noindex response header.

The hosting build runs frontend tests, backend tests, TypeScript checking, static export and export audit. Browser viewport and menu checks are performed against the preview deployment before merging when browser automation is available.

## Indexing limitation
Internal links improve discovery; they do not prove or guarantee Google indexing. No Google Search Console export or account access was supplied. Google-specific indexing exclusions, crawl dates and exact indexed/nonindexed URLs still require the Search Console Pages report or URL Inspection. The generated JSON reports rendered link coverage only.
