# 200 viral-tools blueprint — audit, SERP/competitor analysis, triage and what was built

Source: `alltoolstogether_200_viral_tools_master_blueprint.xlsx` (3 sheets: executive dashboard, 200-tool registry, SEO/AEO/GEO implementation guide). Reviewed 19 November 2026. Companion file: [`viral-tools-triage.csv`](viral-tools-triage.csv) classifies every one of the 200 tools.

**Short version.** The workbook is a useful *idea list*, but it is not safe to implement as written. Its SEO fields are mostly out of spec, many "official sources" are wrong, several tools carry legal/medical risk, and about two-thirds of the tools depend on tax or benefit rules that change by year and need per-rule verification. I built the 48 tools that are deterministic, low-risk and verifiable, and left the rest classified with reasons.

## 1. Audit of the workbook (measured, not assumed)

| Check | Result |
| --- | --- |
| Registry rows | 200 tools, 10 silos, 10 markets (India 51, UK 34, Global 92, USA 11, Canada 4, Australia 4, UAE 1, Germany/EU 1, India/Global 2) |
| Titles over 60 characters | **153 of 200** (up to 91). They would be truncated in results. The sheet's own "[Auto]" length column shows this but the dashboard calls them "optimized" |
| Meta descriptions outside 120–160 characters | **189 of 200** (up to 407; several contain backtick code formatting) |
| AEO answer block "45–55 words" | **103 of 200** fall outside that range (30–93 words) |
| Primary keyword missing from the title | 175 of 200 by exact match; many are near-matches, but the keyword is often not the lead term |
| Official source URL | **86 tools cite `schema.org` as the "authority"** for a formula; UAE gratuity cites canada.ca; Germany cites irs.gov; a US/Schengen tool cites gov.uk; the 8th Pay Commission tool cites a GST-registration page. The dashboard's UAE/Germany/Singapore rows cite gov.uk/ato.gov.au. These are copy-paste errors, not sources |
| "100% net-new, zero overlap" | **False**: 20 tools overlap existing catalog tools (income tax, HRA, gratuity, EPF, PPF, SIP, GST, UK VAT, DTI, margin/markup, heart-rate zones, HbA1c, capital gains …) |
| URL scheme `/tools/<silo>/<slug>` | Incompatible with this site's routing (`/{category}/{slug}`) and canonical/sitemap/IndexNow setup; not adopted |
| Factual conflicts inside the sheet | Tool #1 says zero tax up to ₹7 lakh via 87A while its own meta says "₹7L/12L"; for AY 2026–27 the new-regime rebate threshold is ₹12 lakh. The 8th Pay Commission "fitment 1.92–2.86" and "reset DA to zero" are speculation presented as fact |
| Implementation sheet | Targets Next.js 14 (site is on 15); promises "<80 ms TTFB guaranteed" and "fixes Crawled – currently not indexed" (no markup can guarantee either); asks for client-side privacy badges (only valid where the tool truly runs locally); proposes an embed modal (site already has `/embed`) |

Decision: the workbook's keywords and ideas were used as seeds; its titles, descriptions, answers, URLs and sources were **not** copied.

## 2. SERP and competitor analysis (live searches, 19 Nov 2026)

No search volumes, difficulty scores or rank positions were available (no Search Console / third-party data; the workbook's "high-velocity" claims are unsourced). The table is qualitative: who occupies the results, what pattern wins, and where this site has a credible angle.

| Cluster (query sampled) | Who ranks | Pattern | Difficulty (judgement) | Angle / risk |
| --- | --- | --- | --- | --- |
| India: old vs new tax regime AY 2026-27 | ClearTax, Digit, Sharpely, Kredily, many small sites | Year labels are inconsistent across sites (FY vs AY); rebate/slab details disagree between pages | Very high (brand-dominated) | Do not chase the head term. Accuracy and explicit AY/FY labelling are the only edge; needs official-source verification (tier B) |
| UK take-home pay 2026/27 | Accountancy/contractor sites, many `*.pages.dev` clones | Results disagree for the same salary; GOV.UK estimator is the reference | High | Tier B; must match HMRC bands and state assumptions (tax code, Scotland, pension, student loan) |
| UK stamp duty (SDLT) | HMRC, Savills, estate agents, MoneyHelper | Several pages still show outdated 2022 bands | High, authority-dominated | Tier B; wrong rates are costly |
| LLM VRAM / GPU memory | Small and mid-size tools (Hugging Face space, inventivehq, flaviocopes, benchlm), blog formulas | Same method: weights + KV cache + overhead; overhead assumptions differ | **Medium** | **Built.** Edge: user-set overhead and explicit KV-cache terms, exact formulas shown, GB vs GiB |
| SSC/exam photo & signature resizer | Dozens of small tools; specs conflict (276×354 px vs others; 4×2 cm vs 140×60 px) | Official notice not cited | Medium, crowded | Tier W (image widget) and needs the official notice per exam |
| Amazon FBA / Flipkart fee calculators | thegstco, gonukkad, Amazon's own calculator; many spammy blog pages | Fee schedules change by category and date | Medium-high | Tier C: rate tables must be maintained; not built |
| SRT subtitle shifter | Many small tools (client-side common) | Commodity; linear drift correction is the differentiator | Medium | Tier W (text-file widget) |
| PCB trace width | Digi-Key, Farnell, Newark, LCSC, Qorvo | Distributor-dominated; IPC-2221 constants identical everywhere | High | **Built** with shown formula and range warnings; low expectation of top results |
| SLA uptime / downtime | Many small tools (flaviocopes, uptime.is, pulsetic …) | Differences come from the month-length convention | Medium | **Built** with explicit conventions, chained-service mode and reverse mode |
| EV home charging time/cost | Zap-Map, zecar, many small | Same arithmetic; real-world taper and onboard-charger limits are what pages add | Medium | **Built** (min of charger and onboard kW, efficiency assumption) |
| Kruti Dev → Unicode | TextStudio, rajbhasha.net, typing sites, paid add-ins | Needs a verified mapping table; bulk features paid elsewhere | Low–medium | Tier W: needs a verified mapping table |
| DMARC/SPF/DKIM generator | Dozens (Hunter, AutoSPF, Flavio Copes, many) | Some pages mislabel which record sits at `_dmarc`; DKIM key generation varies | Medium | **Built** for DMARC with RFC 7489 behaviour |
| eGFR (CKD-EPI 2021) | University of Washington, QxMD, many | Some pages still use 2009 coefficients | Authority-dominated (clinical) | Tier C: clinical interpretation needs clinician review |
| NPS vs UPS (India) | freefincal, NPS Trust's own calculator (May 2025), insurers | Rules changed after the January 2025 notification; choice windows lapse | High | Tier B; rules must be sourced and dated |

Cross-cutting takeaways: (1) commodity math tools have many small competitors, so the winning edge is accuracy, stated conventions and a worked example, not volume; (2) every rule-driven finance/tax result is contested between sites, so an unsourced rate table is a liability; (3) distributor/government/brand pages hold the head terms, so long-tail intent (specific task phrasing) is the realistic target.

## 3. Triage of all 200 tools

| Tier | Count | Meaning |
| --- | ---: | --- |
| S1 — built now | 48 | Deterministic arithmetic/standards, inputs supplied by the user, low harm if slightly off, verifiable by independent check values |
| A2 — next sprint | 14 | Pure math but not yet specified (voice AI cost, gateway fees, biquad, Kubernetes bin-packing, storage/egress cost, CAN bit timing, projector throw, Wi-Fi budget, size tables) |
| W — needs new widget or data source | 30 | Image/audio/PDF processing, code generators, text-file tools, or a table the workbook cannot source (e.g. exam age relaxations, per-state land units) |
| O — overlaps the existing catalog | 20 | Extend the existing page instead of creating a duplicate URL |
| B — rule-based | 69 | UK tax/benefits (31), global tax (19), India tax/finance (18) and others; each rate needs an official source and effective date, plus yearly maintenance |
| C — not shipped | 19 | 7 clinical (e.g. paediatric fever-medicine dosing, kidney function, lipid risk), 12 others (security "scanner" that would give false assurance, Aadhaar redaction, IPO "probability", Vastu, rank prediction, IRCTC refund rules, marketplace fee tables …) |

Hard rule applied: nothing medical-dosing, clinical-interpretation or legally consequential ships without qualified review and official sources.

## 4. What was built (48 tools, four new categories)

New categories (with their own hub pages, icons, navigation, social images and keyword-focused titles): **AI & LLM Engineering**, **Electronics & Embedded**, **Creator & Video**, **E-commerce & Logistics**. Tools in other existing categories: developer (3), science (1), construction (2), cooking (2), health (2), math (2), text (1).

| Silo | Tools |
| --- | --- |
| AI & LLM (11) | LLM VRAM, RAG chunking & vector storage, prompt-caching savings, agent-loop token cost, local-vs-cloud breakeven, tokens/second estimator, LoRA trainable parameters, softmax temperature/top-k/top-p, confusion-matrix metrics, word error rate, vector similarity |
| Electronics (11) | ADC resolution/ENOB, IEEE 754 converter (half/bfloat16/single/double), PCB trace width (IPC-2221), CRC (8/16/32 + Modbus), I²C pull-ups, timer prescaler, op-amp gain (E24/E96), NTC thermistor, BLE battery life, CCTV storage, 3D-print filament cost |
| Developer (3) | DMARC record generator, SLA downtime, CSS fluid `clamp()` |
| Creator (6) | Video file size & bitrate, BPM delay times, SMPTE timecode (incl. drop-frame), crop factor, timelapse, YouTube revenue (user-entered RPM) |
| E-commerce (7) | COD vs prepaid (RTO) breakeven, volumetric weight, MER & break-even ROAS, A/B significance, EOQ & reorder point, BOGO breakeven, price elasticity |
| Everyday / health / India (10) | EV home charging, AC BTU sizing, TV viewing distance, coffee brew ratio, baker's percentages, caffeine half-life, VDOT race equivalency, rupee number to words, exam negative marking, attendance percentage |

### Model selection and quality gate
- **Formulas and code — Sonnet** (10 agents, 4–6 tools each, separate files): correctness matters. Each agent had to write ≥3 independent reference vectors per tool, invalid-input tests, a worked example asserted against the compute output, and report what it could not verify.
- **Titles, descriptions, answers, FAQs — Haiku** under the same script gate used for the earlier 300 tools (lengths, keyword placement, banned claims, numbers must come from the tool, no ranking/volume claims).
- **Verification — this session**: independent re-computation of check values (all matched): CRC-8/CCITT-FALSE/MODBUS/CRC-32 for `123456789` (0xF4, 0x29B1, 0x4B37, 0xCBF43926) and a Modbus frame; IPC-2221 width (16.30 mil², 11.83 mil); IEEE 754 encodings of 0.1; Daniels–Gilbert VDOT (5K 20:00 → 49.81); E24 and E96 resistor tables compared with an independent list; z-quantiles (1.2816/1.6449/1.9600/2.3263). An unverifiable link and a mislabelled one were removed. Source URLs were kept only where the document is well known (arXiv IDs, RFC 7489, scikit-learn, NXP I²C spec, RevEng CRC catalogue, W3C CSS Values); the sandbox blocked outbound fetches, so these were not re-fetched.
- Known unverified items (flagged in code comments): the last row of the ENERGY STAR room-AC chart (2,000–2,500 sq ft = 34,000 BTU/h; the search snippet cut off), the Steinhart–Hart default coefficients (labelled illustrative, user-editable), and the PCB extrapolation range note.

## 5. Honest limits
- No tool here is a ranking guarantee; no search volume, rank or AI-citation data was available or measured.
- Estimators say they are estimates. Prices, rates and RPM are always user inputs; no vendor price or "current" rate is hard-coded.
- The 69 rule-based tools remain unbuilt on purpose; shipping unverified tax rates would damage trust faster than missing pages.

## 6. Next steps
1. Search Console + Bing Webmaster: submit the sitemap and verify indexing (the domain did not appear in a live search on 18 Nov).
2. Sprint 2: the 14 A2 tools; extend the 20 overlapping pages (e.g. step-up SIP, EPS in the EPF page) rather than adding duplicates.
3. Sprint 3: pick 5–8 rule-based tools (UK PAYE/NI, UK SDLT, India regime comparison) and build each with an official-source table, effective date, tests against published HMRC/CBDT worked examples, and a yearly-update checklist.
4. New widgets for tier W (subtitle shifter, image presets, code generators) as separate, reviewed work.
5. Replace model-suggested long-tail phrases with real Search Console queries after a few weeks.
