# Domain launch — October 30, 2026

The owner authorized the live-domain cutover. The rebuilt site is hosted by the existing Cloudflare Worker `praxis`, connected to GitHub `nikaveli/Praxis`, branch `main`.

## Domain and DNS

- Canonical website: https://prxsjiujitsu.com/
- Domain registration remains with Bluehost; no hosting/email products were cancelled and the old WordPress installation was not deleted.
- Bluehost nameservers changed from `ns1.bluehost.com` / `ns2.bluehost.com` to `lewis.ns.cloudflare.com` / `priscilla.ns.cloudflare.com`.
- Cloudflare Free zone is active. All 21 records were imported and compared against authoritative Bluehost answers before the nameserver switch.
- The old apex A record `66.235.200.146` was replaced by the Worker's managed custom-domain record.
- `www` remains a CNAME to the apex, now proxied for the redirect rule.
- All other records remain DNS-only, including Titan MX records, Mailgun/Titan SPF, three DKIM records, DMARC, mail, email, autoconfig/autodiscover, SRV and existing hosting service names. MX priorities remain 0 as originally configured.
- DNSSEC was already disabled; no security protection was disabled for this migration.
- The local DNS backup and comparison evidence are in ignored `artifacts/dns-launch/`.

## Canonical redirect

Cloudflare Single Redirect rule: **Canonical HTTPS Praxis domain**, enabled, HTTP 301, preserve query string.

Match:

```text
(http.host eq "www.prxsjiujitsu.com") or (http.host eq "prxsjiujitsu.com" and not ssl)
```

Destination expression:

```text
concat("https://prxsjiujitsu.com", http.request.uri.path)
```

This rule is managed in the Cloudflare zone dashboard; `wrangler.jsonc` manages the apex Worker binding.

## Deployments and indexing

`npm run build` defaults to production. Cloudflare's Git build uses `npm run build` and `npx wrangler deploy` without environment overrides. The six public pages are indexable, with production canonical/social/schema URLs, robots and sitemap. `/design-review/` and error pages remain noindex.

The existing `praxis.nikaveli.workers.dev` and version hosts stay accessible but return host-specific `X-Robots-Tag: noindex, nofollow`. Explicit preview builds require `SITE_ENV=preview`; never deploy those to the live Worker.

## Verification

- TypeScript and production build pass; 31 tests pass.
- All six live routes return 200 with correct metadata, academy schema and indexability; sitemap/robots/social image, trailing-slash redirect and real 404 validated.
- HTTP apex, HTTP www and HTTPS www each return one-hop 301 to HTTPS apex with the original path and query.
- HTTPS works for root and www. Real Chrome loads the rebuilt Home and Classes pages without application console errors.
- The official Gymdesk free-trial form loads on the final domain. No lead was submitted.
- Non-website DNS records match the pre-cutover backup. Email DNS preservation was verified; no test email was sent.

## Rollback

Prefer rolling back a bad application release in the Worker's deployment history. For a full hosting rollback, remove the apex Worker binding, restore the backed-up apex A record and www proxy status, and disable the canonical redirect if necessary. Bluehost registration/email services remain available. Do not revert nameservers without first comparing any DNS changes made after this launch.

References: [Cloudflare custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [hostname-specific headers](https://developers.cloudflare.com/workers/static-assets/headers/), [redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/).
