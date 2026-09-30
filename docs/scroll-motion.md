# Scroll motion

## Site-wide text entrances

`useTextReveals` mounts a shared GSAP entrance layer on all six pages and the footer. Headings, introductory labels, body copy, card text, benefits and contact details rise once as they enter the viewport. Desktop travel is 14px over 0.6s; at 700px and below it is 8px over 0.5s. Stagger is capped at 50ms with `power2.out` easing. Schedule day labels and complete sessions move together, preserving the relationship between times and class names.

The entrance offset is prepared in a layout effect before observation, with a 24px viewport lead-in. The observer starts movement toward the resting position without first shifting visible text downward. Headings no longer receive a second, scroll-scrubbed parallax transform. These changes address the visible jump and competing motion reported during scrolling. Duplicate observer deliveries cannot restart a running or completed entrance.

IntersectionObserver triggers the tweens against the real viewport, including native sticky section covers. GSAP interpolates a separate numeric value and writes the standalone CSS `translate` property, leaving the existing Osmo/Locomotive `transform` owners untouched. This replaces the earlier CSS `.is-revealed` wrapper animation, avoiding doubled entrances. No text is split, hidden, or made transparent; static HTML and unsupported browsers retain readable content. Navigation and booking controls remain stable. Keyboard focus immediately finishes a containing text group's motion, and reduced motion disables/reverts all text entrances, including when the preference changes during a visit.

Validated September 30, 2026: 29 tests pass, along with TypeScript, the production build and static-output checks. Chrome checks covered initialization on all six routes at desktop and phone widths, visible in-progress translation, completed clean styles, retained parallax transforms, and no horizontal overflow (including a 320px homepage). Desktop and mobile schedule layouts were visually inspected. Mobile checks used browser viewport emulation, not a physical device.

Updated September 30, 2026 from the supplied Osmo **Locomotive Smooth Scroll Setup** and **Global Parallax Setup**.

## Libraries and ownership

- `locomotive-scroll` 5.0.1 handles smooth wheel scrolling and selected standalone photographs through the original `data-scroll`, `data-scroll-speed`, and `data-scroll-offset` attributes.
- GSAP 3.15 and ScrollTrigger handle complete program/class cards and the two schedule grids through the supplied `data-parallax-*` attributes. Text entrances have their own single GSAP owner.
- The supplied Global Parallax tween and breakpoint logic is retained in `src/animation/globalParallax.js`. Integration additions are ESM imports/export and returning its matchMedia handle for React cleanup; initialization runs after React mounts and fonts are ready.
- Locomotive photo targets and ScrollTrigger card/calendar targets remain separate. Text inside cards can enter independently through the standalone `translate` property; no heading has both a text entrance and its own scrubbed transform. Navigation and booking dialogs remain still.
- Both libraries are served locally by Vite; GSAP and Locomotive are included in the entry bundle so the in-app preview does not depend on a separate animation-module fetch. No demo images, fonts, or styling from the Osmo example were added.

## Placements and values

The supplied [Locomotive demo](https://osmo-locomotive-smooth-scroll.webflow.io/) uses continuous movement at different speeds, including photo/card speeds of `0.1` and `-0.05`. Praxis now uses those values for selected standalone photographs. The default Locomotive constructor and smooth-wheel behavior remain unchanged.

Program and class-format cards use opposing start/end pairs (12/-12, -6/6, -12/12). Complete schedule panels travel from 8% to -8%. The supplied GSAP resource keeps its original `scrub: true` approach, spanning the full viewport passage (`top bottom` to `bottom top`). Card grids and schedules have additional vertical clearance; the facility image has viewport-relative overscan to avoid exposing edges.
- Home: program cards and schedule panel; standalone academy and coach photography keeps Locomotive movement.
- About: mission photo and facility image.
- Programs: program and class-format cards; newcomer and open-training photos use Locomotive.
- Instructors: individual portraits keep Locomotive movement.
- Classes: schedule panel and class-format cards; newcomer and open-training photographs keep Locomotive movement.
- Contact: the visitor-seating photo uses Locomotive.

Each schedule moves as one panel, keeping times, day columns and borders together. No text is split into letters or hidden.

## Alternating section covers

`SectionFlow` preserves the original section order and adds opaque layers. Starting with the hero, every other section rests beneath the next section as it rises over it. Native CSS sticky positioning handles this independently of the existing photo/card animations; no scroll interception, spacer height, content duplication or GSAP pinning is added.

- Home: values over hero, mission over community, schedule over programs, free-class invitation over coaches.
- About: values over hero, community over mission, free-class invitation over facility photo.
- Programs: programs over hero, class details over newcomer guidance.
- Instructors: coaches over hero, free-class invitation over values.
- Classes: schedule over hero, class details over newcomer guidance.
- Contact: free-trial introduction over hero, values over location/contact.

A ResizeObserver tracks section and header heights. A section taller than the viewport scrolls to its bottom before resting, preserving access to its full content. The final section remains in normal flow. Keyboard focus releases an underlay so its links can be scrolled into view. Section covers work at all viewport widths, including phones with native touch scrolling. With reduced motion or without measurement support, all layers remain in normal document flow. The separate GSAP card/calendar parallax retains its original mobile breakpoint.

## Footer parallax

The supplied Osmo Footer Parallax Effect is integrated into the shared footer with its original `data-footer-parallax`, `data-footer-parallax-inner`, and `data-footer-parallax-dark` attributes. Its unchanged GSAP timeline shifts the footer from `yPercent: -25` to its resting position while the dark overlay fades from `0.5` to zero. ScrollTrigger retains `clamp(top bottom)`, `clamp(top top)`, and `scrub: true`.

Only integration additions surround the supplied function: local ESM imports, a GSAP context for cleanup, and React initialization after fonts are ready. The existing Praxis footer content and design are retained, with the resource’s clipping wrapper and noninteractive, aria-hidden shade. Footer motion runs at all viewport widths; reduced motion reverts it to the static footer. At the document bottom the clamp completes the reveal even though this footer is shorter than the demo’s full-screen footer.

## Accessibility and lifecycle

- `data-parallax-disable="mobileLandscape"` uses the supplied breakpoint to disable GSAP parallax at 767px and below. Locomotive retains its default native touch behavior.
- Reduced-motion preference prevents initialization and reverts both animation layers if changed during a visit.
- Both the loading/failure dialog and Gymdesk popup pause/resume page scrolling and use `data-lenis-prevent` for independent form scrolling.
- The Gymdesk observer ignores unrelated animation-style changes.
- Effect cleanup preserves static rendering and native scrolling if either animation library cannot initialize.

Validation: 18 passing tests, TypeScript, production build, static routes/assets/anchors, real-browser initialization on all six routes with no overlapping animation owners or console errors, calendar transforms and aligned days, actual section-cover geometry on all six pages, preserved anchor navigation and keyboard focus recovery, and mobile breakpoint reversion with a readable two-column schedule. Existing tests cover booking pause/resume and reduced-motion lifecycle. No test leads were submitted.

Sources: [Locomotive Scroll v5](https://scroll.locomotive.ca/docs/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and the user-supplied Osmo resource.
