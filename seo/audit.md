# Praxis SEO audit and action plan

September 30, 2026 · Final domain: [prxsjiujitsu.com](https://prxsjiujitsu.com/) · Rebuild: [Cloudflare preview](https://praxis.nikaveli.workers.dev/).

## Executive summary

Praxis has a strong technical foundation: six statically rendered pages, original academy photography, readable class information, named instructors and consistent contact details. This delivery improves the titles, descriptions, structured data, social tags and preview/production indexing controls. The top priorities are a carefully verified domain launch, clearer first-visit/kids-program guidance, and establishing Search Console plus local inquiry measurements. The preview is deliberately excluded from indexing; this is appropriate until the owner authorizes launch. Ranking and traffic performance cannot be assessed without verified search/analytics data.

## Evidence and limits

- Source and built HTML for all six pages were inspected. Existing automated checks cover internal destinations, images, anchors, schedules and content completeness.
- The previous accessibility review verified responsive layouts and corrected 320px overflow, keyboard navigation and small schedule labels; no new visual redesign is included in this SEO delivery.
- Local keyword research used searches for Bernalillo and Rio Rancho Jiu Jitsu. Two nearby competitors were reviewed directly: [Next Move Jiu Jitsu](https://www.nmjj.com/) and [Gracie Barra Rio Rancho](https://gbriorancho.com/). They are local search competitors, not writing templates. Meru and Del Mar remain earlier visual/messaging references, not local ranking competitors.
- The existing live homepage was available through web retrieval. Attempts to retrieve its robots file and WordPress sitemap index through that tool were unsuccessful; this is not evidence that those endpoints return 404. A complete legacy crawl and Search Console URL export remain launch tasks.
- No Search Console, analytics, backlink or paid SEO dataset was connected. Current ranking, monthly volume, keyword counts, domain authority and backlink totals are **unmeasured**. Search results are discovery evidence, not stable rank reports.
- For more precise volume and difficulty data, connect an SEO tool such as Ahrefs or Semrush. The keyword map can then be populated with measured data.

## Keyword opportunities

*Difficulty and opportunity are editorial estimates based on specificity, local relevance and visible competitor coverage, not measured SEO-tool scores. Search demand is not quantified. Question queries are proposed intent targets, not verified People Also Ask placements. “Easy” does not guarantee a ranking.*

| Keyword | Est. difficulty* | Opportunity* | Ranking | Intent | Target / format |
|---|---|---|---|---|---|
| jiu jitsu Bernalillo | Moderate | High | Unmeasured | Commercial | `/` — Academy homepage |
| Brazilian jiu jitsu Bernalillo NM | Moderate | High | Unmeasured | Commercial | `/` — Academy homepage |
| BJJ Bernalillo | Moderate | High | Unmeasured | Commercial | `/` — Academy homepage |
| kids jiu jitsu Bernalillo | Moderate | High | Unmeasured | Commercial | `/programs/` — Kids program section |
| adult jiu jitsu Bernalillo | Moderate | High | Unmeasured | Commercial | `/programs/` — Adult program section |
| beginner jiu jitsu Bernalillo | Moderate | High | Unmeasured | Commercial | `/programs/` — Beginner guidance |
| jiu jitsu class schedule Bernalillo | Easy–moderate | High | Unmeasured | Transactional | `/praxis-classes/` — Weekly schedule |
| free jiu jitsu class Bernalillo | Moderate | High | Unmeasured | Transactional | `/contact/` — Free-class inquiry |
| Praxis jiu jitsu schedule | Easy | High | Unmeasured | Navigational | `/praxis-classes/` — Weekly schedule |
| Praxis jiu jitsu contact | Easy | High | Unmeasured | Navigational | `/contact/` — Contact details |
| no gi jiu jitsu Bernalillo | Easy–moderate | High | Unmeasured | Commercial | `/programs/` — No-Gi section |
| jiu jitsu for kids ages 5 to 12 Bernalillo | Easy–moderate | High | Unmeasured | Commercial | `/programs/` — Kids details |
| open mat Bernalillo | Easy–moderate | Medium | Unmeasured | Transactional | `/praxis-classes/` — Friday visitor details |
| Saturday no gi Bernalillo | Easy–moderate | Medium | Unmeasured | Transactional | `/praxis-classes/` — Saturday session |
| women’s jiu jitsu Bernalillo | Moderate | Medium | Unmeasured | Commercial | `/programs/` — Women’s program; timing requires confirmation |
| jiu jitsu instructors Bernalillo | Easy–moderate | Medium | Unmeasured | Commercial | `/instructors/` — Instructor biographies |
| family owned jiu jitsu academy Bernalillo | Easy–moderate | Medium | Unmeasured | Commercial | `/about/` — Academy story |
| what to wear to first jiu jitsu class | Hard | Medium | Unmeasured | Informational | `/praxis-classes/` — First-class guidance |
| do I need a gi for my first class | Moderate–hard | Medium | Unmeasured | Informational | `/praxis-classes/` — Newcomer answer |
| Gi vs No-Gi jiu jitsu for beginners | Hard | Medium | Unmeasured | Informational | `/programs/` — Comparison guide section |

The CSV source is [keyword-map.csv](keyword-map.csv). Keep one primary intent per route. Do not create multiple nearly identical pages for nearby cities or separate Gi/No-Gi routes without genuinely distinct useful content.

## On-page audit

| Page | Finding | Severity | Fix / disposition |
|---|---|---|---|
| All six | Existing titles were unique, but several did not identify Bernalillo | Medium | Implemented specific local titles and descriptions; see generated metadata.csv |
| All six | Social metadata lacked explicit Twitter title/description/image and image alt text | Low | Implemented complete OG/Twitter fields using the supplied social image |
| All six | Single generic business schema repeated without page/site entity relationships | Medium | Implemented connected academy, website and page entities; real coaches/services on relevant pages |
| Home | Clear Jiu Jitsu H1; Bernalillo appears in the opening visible copy | Pass | Preserve headline and natural local context; do not add hidden keyword text |
| About | Short but useful academy/mission content; H1 is branded | Low | Add owner-approved academy details if available; do not pad to an arbitrary word count |
| Programs | Covers kids, adults, women, Gi/No-Gi and newcomers; overlaps Classes descriptions | Medium | Keep Programs focused on choosing training, Classes on when/what to attend; use briefs for later differentiation |
| Instructors | Short biographies and generic “Meet your coaches” H1 | Medium | Add only verified teaching background and approach; possible future visible heading “Jiu Jitsu coaches” |
| Classes | H1 “Train hard. Train smart.” is motivational; specific class heading follows | Medium | Metadata now names class schedule and location. Consider a future explicit visible H1 when reviewing page copy; no hidden replacement heading was added |
| Contact | Concise transactional page with address, map and real contact destinations | Pass | Short length is appropriate for its purpose; no filler content required |
| About | Community section links back to About itself | Low | Future content refinement: link to instructors or class times instead |
| All six | Main routes are linked from shared navigation and footer | Pass | No orphan among these six routes |
| Images | Descriptive alt attributes and unique, relevant source photos | Pass | Preserve natural descriptions; no keyword stuffing |

Titles/descriptions are generated from `src/data/content.ts`. Title lengths are around 50–60 characters and descriptions around 150–160 characters as an editorial target. These are not Google ranking thresholds; display depends on device, query and generated snippets. [Google title guidance](https://developers.google.com/search/docs/appearance/title-link).

## Content gaps

| Topic | Why it matters | Format / location | Priority | Effort / dependency |
|---|---|---|---|---|
| First class: clothing, booking follow-up, class selection | Resolves newcomer uncertainty before inquiry | Expanded Classes newcomer section | High | Half day; confirm arrival/check-in/gear policies |
| Kids ages 5–12: what a lesson looks like | Gives parents specific reasons to choose a program | Expanded Kids section on Programs | High | Half day; owner/coach review |
| Gi vs No-Gi vs beginner training | Helps prospects select the right class | Short comparison on Programs | Medium | Half day; coach review |
| Friday visitor information | Serves open-mat visitor intent | Classes section update | Medium | 1–2 hours; confirm price/waiver policies |
| Women's program availability | Program is listed but dedicated times are unconfirmed | Contact CTA and confirmed details on Programs | Medium | 1–2 hours after owner confirms timing |
| More instructor detail | Builds trust with real experience and teaching approach | Instructors biography expansion | Medium | Half day; verified credentials only |

See [content-briefs.md](content-briefs.md) for full briefs and an eight-week plan. No evidence establishes that these pages have been stale for 12+ months; the rebuild is current. No arbitrary 300-word minimum is used for contact or biography pages.

## Technical checklist

| Check | Status | Evidence / next step |
|---|---|---|
| Static crawlable HTML | Pass | Six prerendered route documents; main content does not require JS execution |
| Unique title, description, H1 | Pass | Build checks validate metadata; existing route tests validate one main H1 |
| Canonicals | Pass | All six point to the intended HTTPS production route, with trailing slash |
| Preview exclusion | Pass | Both HTML meta and HTTP noindex; crawlers allowed to read those directives |
| Production indexability | Pass in generated output | Explicit production settings required; not activated on live domain in this delivery |
| Sitemap | Pass | Exactly six canonical public pages; excludes review/404; no invented lastmod values |
| Robots | Pass | Generated per environment; production advertises canonical sitemap |
| Internal links and assets | Pass | Existing static checks pass; all declared local targets resolve in output |
| Legacy redirect completeness | Warning | Current known routes retained; full old sitemap/Search Console export needed |
| Error behavior | Pass | A deployed nonexistent route returned HTTP 404; generated error page remains noindex |
| HTTPS / mixed content | Pass in generated references | Site, vendor widget and map use HTTPS; final host redirect policy still needs launch verification |
| Schema | Pass in local validation | JSON-LD parses and matches shared business/program/coach data; run external validators at launch |
| Business hours / ratings | Intentionally omitted | No verified closing times or eligible review dataset; do not invent |
| Mobile | Pass in prior browser checks | 320px overflow fixed; readable schedule times and accessible controls improved |
| Page speed | Warning / unmeasured | Client JS ~135KB gzip; video files ~4.1MiB desktop / 1.1MiB mobile. Responsive images, local fonts and below-fold lazy loading already used |
| Core Web Vitals | Unmeasured | No field LCP, INP or CLS dataset or Lighthouse score was collected; do not infer a pass from build success |
| Search Console / analytics | Not connected | Verification and real baselines are owner-managed launch tasks |
| External destinations | Partial | Booking was tested without submission in prior browser checks; full external-link status crawl not performed |

Live HTTP checks also confirmed that Cloudflare's default `/about` → `/about/` normalization uses **307**, not a permanent redirect. The destination and canonical agree. For confirmed changed legacy URLs and final-host aliases, use explicit permanent redirects at launch rather than treating this automatic normalization as a migration redirect.

The academy schema uses `SportsActivityLocation`, a local-business subtype, with known name, address, phone, email, imagery and Instagram. A `WebSite` and page entity connect it to each document. Instructor `Person` and program `Service` nodes reflect visible copy. No Event markup is generated from recurring class times without actual dated event details; no opening/closing hours are inferred. [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Robots does not block the pages carrying noindex; a crawler must fetch a page to discover that directive. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Competitor comparison

These are observed content comparisons, not a ranking/authority scorecard. No overall SEO winner can be established from the available evidence.

| Dimension | Praxis rebuild | Next Move Jiu Jitsu | Gracie Barra Rio Rancho | Assessment |
|---|---|---|---|---|
| Ranked keyword count | Unmeasured | Unmeasured | Unmeasured | No measured winner |
| Topic depth | Six pages; programs, readable schedule, instructors, location | Separate kids/adult/combatives links and explicit trial offer | Programs, schedule, instructors and blog navigation | Competitors suggest program-specific content opportunities |
| Publishing frequency | New rebuild; no blog | Not measured | Blog present; cadence not measured | No measured winner |
| Backlink signals | No link dataset | Affiliation links visible; inbound links unmeasured | Multi-school network links visible; inbound links unmeasured | Outgoing/network links do not establish backlink authority |
| Technical score | Static build checks pass; no lab score | Not performance-tested | Not performance-tested | No numerical score assigned |
| SERP features | Not measured | Not measured | Not measured | No verified ownership claim |
| Schedule presentation | Text headings and class lists | Not comprehensively assessed | Homepage links a schedule image | Praxis has accessible text schedule detail |
| Conversion clarity | Free first class and actual inquiry form | Trial offer explicitly presented | Trial CTA and form prominent | Clarify Praxis follow-up; retain truthful offer |

Sources: [Next Move homepage](https://www.nmjj.com/), [Gracie Barra Rio Rancho homepage](https://gbriorancho.com/), inspected September 30, 2026. Do not copy their claims, prices or credentials into Praxis content.

## Prioritized action plan

### Quick wins

| Action | Impact | Effort | Dependency / state |
|---|---|---|---|
| Local titles/descriptions and complete social tags | Medium | Under 2h | Implemented |
| Connected structured data from shared source | Medium | Under 2h | Implemented; externally validate at launch |
| Environment-aware robots/header policy | High | Under 2h | Implemented; keep preview default |
| Export keyword map, metadata and launch checklist | Medium | Under 2h | Delivered |
| Verify business details across owner-managed listings | High | 1–2h | Owner access; see local-search-checklist.md |
| Obtain indexed legacy URL inventory | High | 1–2h | Search Console/WordPress access before cutover |

### Strategic investments

| Action | Impact | Effort | Dependency |
|---|---|---|---|
| Publish owner-reviewed first-class and kids detail | High | 1–2 days total | Policy answers and coach review |
| Establish Search Console and qualified-inquiry baseline | High | Half day setup, monthly review | Approved production launch and owner access |
| Diagnose actual LCP/INP/CLS performance | Medium–high | Half day initially | Live tests and field data when available |
| Earn relevant local mentions and authentic student feedback | Medium | Ongoing | Real relationships; no fabricated/paid endorsements |
| Differentiate Programs and Classes as data accumulates | Medium | 1 day | Query/page performance and user feedback |

All impact estimates are relative priorities, not traffic or ranking forecasts. The rebuild remains a preview until the owner authorizes switching the live domain.
