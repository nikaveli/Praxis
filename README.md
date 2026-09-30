# Praxis Jiu Jitsu Academy

Six responsive, statically rendered React + TypeScript pages. Vite builds the client and server renderer; the prerender step writes complete HTML for every route to `dist`. Content and schedules live in `src/data/content.ts`.

## Development

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. Run `npm run check` for TypeScript, migration/booking tests, and the production build. `npm run preview` serves that output on port 5178.

For local Gymdesk testing visit `http://praxis.localhost:5178`: the vendor widget switches to its own test server when the hostname is exactly localhost or 127.0.0.1.

## Content and design

- Routes: `/`, `/about/`, `/programs/`, `/instructors/`, `/praxis-classes/`, `/contact/`.
- `/design-review/` compares the three cinematic hero treatments; full-width film is the default.
- `docs/content-inventory.md` records the live source content and external destinations.
- `docs/brand-spec.md` records design decisions and original asset mappings.
- `public/media/manifest.json` records original and optimized image dimensions and sizes.
- Supplied originals stay in local `Assets/PRAXIS` and are not published. Only selected web derivatives are committed. Regeneration requires the original assets and ffmpeg: `npm run assets:prepare`.

## Booking

Every booking action opens the official Gymdesk widget, using ref `ArMKZ`, gym `6kRVO`, popup ID `8023`. The provider collects name, email, phone and an optional comment. It is loaded on demand after its jQuery dependency, with keyboard focus containment and restoration, Escape dismissal, and visible phone/text/email alternatives if loading fails. Tests mock the provider; no test leads are sent.

## Cloudflare deployment

The account already contained a GitHub-connected **Worker named `praxis`**. This delivery reuses that project with Cloudflare Static Assets instead of creating a duplicate Pages project. The same `dist` output is compatible with Pages if migrated later.

- Repository: `nikaveli/Praxis`; production branch: `main`.
- Build command: `npm run build`.
- Deploy command: `npx wrangler deploy`.
- Static output: `dist` (configured in `wrangler.jsonc`).
- Preview uses the Cloudflare workers.dev hostname. No custom domain or DNS changes are made.

The preview deliberately returns `X-Robots-Tag: noindex, nofollow` via `public/_headers`. Canonicals and the sitemap point to the eventual live domain. At an explicitly approved domain launch, remove the preview noindex header and review DNS, canonical URLs and search indexing. Never connect the live domain merely to publish a preview.

## Verification

Automated checks cover source-copy completeness, schedule consistency, all public routes, existing anchors, email/call destinations, provider configuration, loading failures and late-load cancellation. Browser acceptance includes real Gymdesk loading without submission, desktop/tablet/mobile layouts, navigation, video controls and deployed direct URLs.
