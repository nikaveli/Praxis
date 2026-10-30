# SEO launch and verification checklist

## Current state

The owner authorized launch on October 30, 2026. The rebuilt site is deployed to `https://prxsjiujitsu.com/`; see `docs/domain-launch.md`. The Workers alternate host remains noindex through a hostname-specific response header. The checklist below records the original preparation workflow; subsequent launches must preserve the live-domain policy.

## Preview build

```sh
SITE_ENV=preview npm run check
# Deploy review builds only to a separate preview project.
```

Defaults after launch: `SITE_ENV=production`, `SITE_ORIGIN=https://prxsjiujitsu.com`. Use `SITE_ENV=preview` explicitly for a separate review build. Do not deploy a preview build to the live Worker. The production schema exports in `seo/structured-data/` are review copies, not the preview's served asset URLs.

## Prepare for the authorized live-domain launch

- Export the existing site's indexed URLs from Search Console and its complete WordPress sitemap. Compare them with `redirect-map.csv`. The current source inventory confirms Home, Classes and homepage anchors; it is not a full legacy crawl.
- Preserve `/` and `/praxis-classes/` and all established homepage anchors. Add permanent redirects only for confirmed changed URLs, matching the old page's intent. Do not redirect every missing page to Home.
- Verify address, phone, email and Instagram with the owner. Confirm any operating hours separately; do not infer closing hours from class times.
- Verify the actual Gymdesk form loads on the final domain without sending a test lead.
- Confirm canonical host policy: `https://prxsjiujitsu.com`, with one-hop HTTP→HTTPS and www→apex redirects. Implement host redirects at the final hosting/domain layer and test them; no current DNS change is included.
- Use a separate production deployment or disable the workers.dev/version preview endpoints for an indexable deployment. Do not publish a production build to publicly indexable alternate hosts without host-specific noindex protection.
- Review existing Search Console verification so a domain migration does not remove a valid verification method. Do not invent a verification HTML file, token or TXT record.

## Build production output, only for the approved production destination

```sh
SITE_ENV=production SITE_ORIGIN=https://prxsjiujitsu.com npm run check
```

These are environment variables for the Node prerender script. Merely copying `.env.production.example` to a Vite env file does not export them into that process. Set both variables in the production build environment. Production builds reject a different origin.

Inspect the resulting output before deployment:

- Six public pages: index/follow robots metadata; canonical and social URLs on the final domain.
- All schema image/logo URLs use the final domain and return images there.
- `robots.txt` permits crawling and advertises `https://prxsjiujitsu.com/sitemap.xml`.
- `sitemap.xml` contains exactly six canonical URLs; no review or 404 pages.
- `dist/_headers` has no site-wide noindex rule. Design-review and 404 rules remain.
- Production is now the default. Never deploy an explicit preview build to the live Worker.

## Immediately after cutover

- GET all six direct URLs and inspect status, canonical, robots metadata and response headers. A clean HTML robots tag does not override a leftover HTTP noindex header.
- Test a nonexistent URL: it must return an actual 404 status and a useful error page, not a 200 soft 404.
- Verify trailing-slash redirects resolve in one hop and old anchors still work.
- Check favicon, poster, social image, fonts, photos and video on the final hostname.
- Run Google's Rich Results Test and Schema.org Validator. Validate the rendered page, not just the exported JSON. Resolve syntax/required-property errors; do not fill optional fields with invented facts.
- Run PageSpeed Insights on Home and Classes, mobile and desktop. Record LCP, INP and CLS field data when available; distinguish Lighthouse lab results from real-user measurements.
- In the verified Search Console property, submit `/sitemap.xml` and inspect Home, Programs and Classes. Request indexing only after the final site is live and indexable. The sitemap is a discovery hint, not an indexing guarantee.
- Inspect social sharing previews. The existing 1200×630 image is provided; individual platforms may cache it.

## First 30 days

- Review indexing, Google-selected canonical URLs, 404s and crawl errors weekly.
- Compare branded vs non-branded queries and page-level impressions/clicks.
- Establish a conversion baseline for actual qualified free-trial inquiries, with an approved analytics/privacy setup. A booking-button click alone is not a completed lead.
- Review Business Profile website/booking destinations and business details after launch; do not edit them as part of this file delivery.

Sources: [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Cloudflare static-asset headers](https://developers.cloudflare.com/workers/static-assets/headers/).
