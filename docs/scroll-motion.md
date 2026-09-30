# Scroll motion

Updated September 30, 2026 from the supplied Osmo **Locomotive Smooth Scroll Setup** and **Global Parallax Setup**.

## Libraries and ownership

- `locomotive-scroll` 5.0.1 handles smooth wheel scrolling and selected standalone photographs through the original `data-scroll`, `data-scroll-speed`, and `data-scroll-offset` attributes.
- GSAP 3.15 and ScrollTrigger handle text, complete program/class cards, and the two schedule grids through the supplied `data-parallax-*` attributes.
- The supplied Global Parallax tween and breakpoint logic is retained in `src/animation/globalParallax.js`. Integration additions are ESM imports/export and returning its matchMedia handle for React cleanup; initialization runs after React mounts and fonts are ready.
- Neither library transforms the other's targets or ancestors. Navigation, booking dialogs, and individual schedule days are not animation targets.
- Both libraries are served locally by Vite; GSAP and Locomotive are included in the entry bundle so the in-app preview does not depend on a separate animation-module fetch. No demo images, fonts, or styling from the Osmo example were added.

## Placements and values

The supplied [Locomotive demo](https://osmo-locomotive-smooth-scroll.webflow.io/) uses continuous movement at different speeds, including photo/card speeds of `0.1` and `-0.05`. Praxis now uses those values for selected standalone photographs. The default Locomotive constructor and smooth-wheel behavior remain unchanged.

Headings travel from 20% to -20% of their own height. Program and class-format cards use opposing start/end pairs (12/-12, -6/6, -12/12). Complete schedule panels travel from 8% to -8%. The supplied GSAP resource keeps its original `scrub: true` approach, now spanning the full viewport passage (`top bottom` to `bottom top`) instead of stopping at `top 35%`. Card grids and schedules have additional vertical clearance; the facility image has viewport-relative overscan to avoid exposing edges.
- Home: academy/programs/instructor/location headings, program cards, schedule heading and panel; standalone academy and coach photography keeps Locomotive movement.
- About: mission heading and its photo, plus the facility image.
- Programs: overview/details headings, all program and class-format cards; newcomer and open-training photos use Locomotive.
- Instructors: section and free-class headings; individual portraits keep Locomotive movement.
- Classes: schedule heading and panel, newcomer/free-class headings, class-format cards; newcomer and open-training photographs keep Locomotive movement.
- Contact: introduction and values headings; the visitor-seating photo uses Locomotive.

Each schedule moves as one panel, keeping times, day columns and borders together. No text is split into letters or hidden.

## Accessibility and lifecycle

- `data-parallax-disable="mobileLandscape"` uses the supplied breakpoint to disable GSAP parallax at 767px and below. Locomotive retains its default native touch behavior.
- Reduced-motion preference prevents initialization and reverts both animation layers if changed during a visit.
- Both the loading/failure dialog and Gymdesk popup pause/resume page scrolling and use `data-lenis-prevent` for independent form scrolling.
- The Gymdesk observer ignores unrelated animation-style changes.
- Effect cleanup preserves static rendering and native scrolling if either animation library cannot initialize.

Validation: 14 passing tests, TypeScript, production build, static routes/assets/anchors, real-browser initialization on all six routes with no overlapping animation owners or console errors, calendar entrance/settled transforms and aligned days, and mobile breakpoint reversion with a readable two-column schedule. Existing tests cover booking pause/resume and reduced-motion lifecycle. No test leads were submitted.

Sources: [Locomotive Scroll v5](https://scroll.locomotive.ca/docs/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and the user-supplied Osmo resource.
