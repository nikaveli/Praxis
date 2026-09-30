# Scroll motion

Updated September 30, 2026 from the supplied Osmo **Locomotive Smooth Scroll Setup** and **Global Parallax Setup**.

## Libraries and ownership

- `locomotive-scroll` 5.0.1 handles smooth wheel scrolling and selected standalone photographs through the original `data-scroll`, `data-scroll-speed`, and `data-scroll-offset` attributes.
- GSAP 3.15 and ScrollTrigger handle text, complete program/class cards, and the two schedule grids through the supplied `data-parallax-*` attributes.
- The supplied Global Parallax tween and breakpoint logic is retained in `src/animation/globalParallax.js`. Integration additions are ESM imports/export and returning its matchMedia handle for React cleanup; initialization runs after React mounts and fonts are ready.
- Neither library transforms the other's targets or ancestors. Navigation, booking dialogs, and individual schedule days are not animation targets.
- Both libraries are served locally by Vite. No demo images, fonts, or styling from the Osmo example were added.

## Placements and values

Headings in the previously selected alternating editorial sections ease vertically from 12% of their height to their natural position. Program and class-format cards start at 4%, 6%, or 8%; complete schedule panels start at 4%. All settle to zero when the target top reaches 35% of the viewport. Scroll progress directly controls the effect with the supplied default `scrub: true`.

- Home: academy/programs/instructor/location headings, program cards, schedule heading and panel; standalone academy and coach photography keeps Locomotive movement.
- About: mission heading and its photo, plus the facility image.
- Programs: overview/details headings, all program and class-format cards.
- Instructors: section and free-class headings; individual portraits keep Locomotive movement.
- Classes: schedule heading and panel, newcomer/free-class headings, class-format cards; newcomer photograph keeps Locomotive movement.
- Contact: introduction and values headings.

Each schedule moves as one panel, keeping times, day columns and borders together. No text is split into letters or hidden.

## Accessibility and lifecycle

- `data-parallax-disable="mobileLandscape"` uses the supplied breakpoint to disable GSAP parallax at 767px and below. Locomotive retains its default native touch behavior.
- Reduced-motion preference prevents initialization and reverts both animation layers if changed during a visit.
- Both the loading/failure dialog and Gymdesk popup pause/resume page scrolling and use `data-lenis-prevent` for independent form scrolling.
- The Gymdesk observer ignores unrelated animation-style changes.
- Dynamic imports and effect cleanup preserve static rendering and native scrolling if either animation library is unavailable.

Validation: 14 passing tests, TypeScript, production build, static routes/assets/anchors, real-browser initialization on all six routes with no overlapping animation owners or console errors, calendar entrance/settled transforms and aligned days, and mobile breakpoint reversion with a readable two-column schedule. Existing tests cover booking pause/resume and reduced-motion lifecycle. No test leads were submitted.

Sources: [Locomotive Scroll v5](https://scroll.locomotive.ca/docs/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and the user-supplied Osmo resource.
