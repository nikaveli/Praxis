# Praxis SEO package

Prepared September 30, 2026 for [Praxis Jiu Jitsu Academy](https://prxsjiujitsu.com/), Bernalillo, NM. Launched October 30, 2026 on Cloudflare at [prxsjiujitsu.com](https://prxsjiujitsu.com/). The Workers preview remains available with host-specific noindex protection.

## Files

| File | Purpose |
|---|---|
| `audit.md` | Full audit, on-page findings, technical checklist, local competitor comparison and priorities |
| `keyword-map.csv` | 20 keyword opportunities, search intent, estimated competition, target pages and evidence limits |
| `metadata.csv` | Generated titles, descriptions, canonical URLs and character counts for all six pages |
| `structured-data/*.json` | Six generated production JSON-LD exports for review; the same schema is embedded in built pages |
| `production/robots.txt`, `production/sitemap.xml`, `production/_headers` | Generated production deployment files, staged for the approved domain launch; do not copy onto the preview |
| `content-briefs.md` | Prioritized content gaps, original briefs and an eight-week publishing plan |
| `launch-checklist.md` | Preview/production build settings, indexing, redirects, Search Console and verification steps |
| `redirect-map.csv` | Confirmed route/anchor preservation; requests for additional legacy URL data |
| `local-search-checklist.md` | Business Profile consistency, local visibility and measurement |

## Implemented site files

- `src/data/content.ts`: canonical route inventory and six optimized title/description pairs.
- `scripts/seo.mjs`: preview/production rules, connected academy/site/page schema, instructors/program entities, social metadata, sitemap and robots generators.
- `scripts/prerender.mjs`: embeds metadata and schema into static HTML, writes deployed SEO files and review exports.
- `scripts/seo.test.mjs`: indexing safeguards, schema/content agreement and escaping checks.
- `scripts/check-output.mjs`: validates generated metadata, schema, sitemap, indexation policy, routes, anchors and assets.
- `scripts/check-live-seo.mjs`: read-only deployed HTTP checks; run `npm run check:seo:live` after building and deploying. Results are saved to `artifacts/seo-live-check.json`.
- `public/_headers`: common security/cache headers. The build adds the appropriate indexing header to `dist/_headers`.
- `.env.preview.example` and `.env.production.example`: documented build settings, without secrets.

`npm run build` generates `dist/sitemap.xml`, `dist/robots.txt`, `dist/_headers`, and complete metadata/JSON-LD in each route's `index.html`. These are deployable files, not instructions to paste into a CMS. Production exports are regenerated from the same data so they stay aligned with the site.

## Defaults

The normal build is **production mode**, using the live domain throughout. Explicit `SITE_ENV=preview` builds remain noindex. Host-specific HTTP headers keep Workers development/version hosts noindex regardless of the build mode. Robots permits crawling so crawlers can read the noindex directives. Private design-review and 404 pages remain noindex in either mode.

The public sitemap lists only the six intended canonical pages. It intentionally omits `lastmod` until an accurate per-page editorial history is maintained, and does not invent freshness dates. Preview robots does not advertise the production sitemap.

No unverified hours, prices, reviews, ratings, awards, women's class times, Search Console tokens or analytics IDs were added. Class start times are not business opening/closing hours. FAQ rich results, ranking gains and indexation are not guaranteed. No keyword-stuffed hidden text, doorway city pages or speculative redirect rules were created.
