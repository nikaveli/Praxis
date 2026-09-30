# Scroll motion

Added September 30, 2026 from the supplied Osmo Locomotive Smooth Scroll Setup and the official [Locomotive Scroll v5 documentation](https://scroll.locomotive.ca/docs/).

- Pinned `locomotive-scroll` 5.0.1 and its official CSS, served through the existing Vite build.
- Uses the supplied `new LocomotiveScroll()` initialization and original `data-scroll`, `data-scroll-speed`, and `data-scroll-offset` attributes.
- Selected headings, photo frames, and copy blocks in alternating editorial sections move at `0.025` / `-0.015` speed. Page backgrounds, schedule tables, navigation, and booking controls keep their normal layout.
- Home: academy/community, program overview, instructors, location copy.
- About: mission and facility image.
- Programs: overview and class-details heading.
- Instructors: profiles and free-class invitation.
- Classes: newcomer guidance and free-class invitation.
- Contact: introduction and values.
- Keeps Locomotive’s default native touch behavior; touch parallax is not forced on.
- Reduced-motion preference prevents initialization and destroys/reset transforms if changed during a visit.
- Both the loading/failure dialog and Gymdesk popup pause/resume page scrolling. Each has `data-lenis-prevent` for independent form scrolling.
- The Gymdesk observer ignores unrelated animation-style changes, avoiding per-frame popup scans.
- Dynamic import and effect cleanup preserve static rendering and native scrolling when the library is unavailable.

Validation: 12 passing tests, TypeScript and production build, static routes/assets/anchors, initialization on all six routes in Chrome, desktop wheel movement, mobile viewport/menu, existing homepage anchor, and the real Gymdesk popup opening/closing without submission. Reduced-motion lifecycle and both booking states are covered by automated tests.
