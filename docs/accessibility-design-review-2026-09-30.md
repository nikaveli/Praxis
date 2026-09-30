# Praxis accessibility and design review

Reviewed September 30, 2026 · [Cloudflare preview](https://praxis.nikaveli.workers.dev/) · source revision `606fe97`.

**Remediation update:** Following the review, the user authorized fixes. All six confirmed findings below have been addressed; see the verification record at the end. The original findings are retained as a before-change record.

The green, cream, photography, and condensed headings form a coherent athletic identity. The most important improvement is keyboard access to the mobile navigation, followed by contrast in controls and more readable small text. The existing design can be retained while addressing these issues.

## Scope and method

Target: WCAG 2.1 A and AA, plus design usability. All six public routes were opened directly in Chrome and checked through rendered DOM inspection. Visual samples covered the desktop homepage (1440×900), tablet Programs page (768×1024), mobile pages and schedule (390×844), and booking at 320×740. All six routes were measured at 320px for overflow. Viewport dimensions include Chrome's 15px vertical scrollbar where present.

Keyboard checks covered the skip link, mobile menu, booking popup, focus wrapping, Escape and focus restoration, and the video pause button. Colors below came from computed styles and the WCAG relative luminance calculation. These are selected checks, not a complete automated accessibility engine scan or a certification.

Existing automated checks were rerun: **18 tests passed**; static output validation passed for routes, internal destinations, anchors, assets, metadata, and **26 distinct photographs across six public pages**. Reduced-motion and provider-failure behavior have unit-test coverage. No leads were submitted.

Not verified in this review: actual VoiceOver/NVDA announcements, physical iOS/Android touch behavior, verified 200% browser zoom, increased text-spacing overrides, forced-colors mode, every video frame's text contrast, and live provider submission/error announcements. Responsive viewport testing is not a substitute for browser zoom or physical-device testing. Google Maps internals were not comprehensively audited.

## Accessibility findings

**Six confirmed issues: 0 critical, 4 major, 2 minor.** Severity reflects user impact, not the conformance level of a criterion. Additional design recommendations are separate from this count.

### Operable

| ID | Finding and evidence | Criterion | Severity | Recommended change |
|---|---|---|---|---|
| A1 | On the mobile homepage, focus the menu button, press Enter, then Tab. Focus skips the expanded navigation and lands on the hero's booking link underneath it. At 390×844, the focused link occupies y445–499 while the opaque menu occupies y74–524; its focus indicator is hidden. The nav is before the toggle in DOM order. | 2.4.7 Focus Visible; also a focus-order usability defect | Major | Put the toggle before its disclosed navigation in the logical keyboard sequence, or deliberately move focus into the navigation on opening. Ensure leaving the panel closes it or otherwise keeps the next focused element visible. Keep Escape returning to the toggle. |
| A2 | The homepage button visibly says “Pause film” / “Play film”, but its accessible name is “Pause background video” / “Play background video”. The visible label is not contained in the accessible name. | 2.5.3 Label in Name, Level A | Minor | Use the same wording for visible and accessible labels, for example “Pause film” and “Play film”. The keyboard pause action itself worked. |

[W3C focus visibility guidance](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) requires a visible indicator for keyboard focus. [Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html) supports activating controls by speaking their visible labels.

### Perceivable

| ID | Finding and evidence | Criterion | Severity | Recommended change |
|---|---|---|---|---|
| A3 | The global focus outline is `#77975E`: 2.686:1 on cream and 2.263:1 on green. Both fall below 3:1. This affects shared links and buttons across all pages. | 1.4.11 Non-text Contrast | Major | Use a dark outline on cream and a cream outline on green/dark sections, or a contrasting two-color indicator that also works over photography. |
| A4 | Gymdesk input and textarea borders are `#999F94`: 2.211:1 against the cream exterior and 2.713:1 against the white interior. The white field fill alone also does not provide adequate distinction from cream. | 1.4.11 Non-text Contrast | Major | Darken field boundaries to a measured ≥3:1 against their surroundings, such as the existing muted ink token; retain clearly visible focus styling. |
| A5 | The actual Gymdesk close glyph is rendered by `.close::before` in `rgb(160,170,177)` / `#A0AAB1`, despite the parent close element's darker color. It measures 1.928:1 against cream. | 1.4.11 Non-text Contrast | Minor | Set the pseudo-element's color explicitly to the site ink. Keep its existing 44×44 hit area. |
| A6 | The live popup's name, email, and phone inputs have no `autocomplete` tokens or other explicit personal-input-purpose metadata. Their labels are correctly associated, and email/tel input types are present. | 1.3.5 Identify Input Purpose | Major | Add `autocomplete="name"`, `autocomplete="email"`, and `autocomplete="tel"` when enhancing the provider popup. Preserve the provider's field names and submission behavior. |

Controls and visual state indicators need sufficient adjacent contrast under [W3C 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html). Explicit personal input purposes support autofill and assistive technology under [W3C 1.3.5](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html).

### Understandable and robust

No additional confirmed failure from the sampled label/role checks. The popup exposes a named dialog and correctly associated field labels. Name, email, and phone are programmatically required; the comment is visibly optional. Error identification and success-message announcements remain unverified because the form was not submitted.

### Contrast measurements

| Element | Foreground | Background | Ratio | Required | Result |
|---|---|---|---:|---:|---|
| Body text | `#171A17` | `#E9E8E3` | 14.305:1 | 4.5:1 | Pass |
| Muted body copy | `#62665F` | `#E9E8E3` | 4.774:1 | 4.5:1 | Pass, limited margin |
| Primary button text | `#E9E8E3` | `#355E3B` | 6.079:1 | 4.5:1 | Pass |
| Footer small print, final unshaded state | `#9CA794` | `#101510` | 7.362:1 | 4.5:1 | Pass |
| Focus outline on cream | `#77975E` | `#E9E8E3` | 2.686:1 | 3:1 | Fail |
| Focus outline on green | `#77975E` | `#355E3B` | 2.263:1 | 3:1 | Fail |
| Input border, outside | `#999F94` | `#E9E8E3` | 2.211:1 | 3:1 | Fail |
| Input border, inside | `#999F94` | `#FFFFFF` | 2.713:1 | 3:1 | Fail |
| Popup close glyph | `#A0AAB1` | `#E9E8E3` | 1.928:1 | 3:1 | Fail |

Ratios describe solid colors in the measured states, not every animated overlay or image background. Normal text generally requires 4.5:1 under [W3C Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

### Keyboard results

| Control / path | Observed result |
|---|---|
| Skip to content | Enter updates `#content`, returns to main content, and subsequent Tab on Programs reaches the first main-content link rather than the header. |
| Mobile navigation toggle | Opens and exposes expanded state. Escape closes and restores focus to the toggle. Forward Tab after opening fails the visible-focus check: A1. |
| Booking entry | Header booking opens the provider popup; focus moves to the name input. |
| Booking focus boundary | Tab from the popup's final “Email us” link wraps to its close button. Background root becomes inert. |
| Booking Escape | Popup closes and focus returns to the initiating header booking link. |
| Video | Enter toggles the button to “Play film” after pausing. Naming mismatch remains: A2. |
| Loading/failure alternatives | Call/text/email alternatives are rendered; timeout and late-cancel behavior pass existing unit tests. A live network-failure scenario was not induced. |

### Screen-reader preparation checks

These are DOM/accessibility-tree observations, **not spoken-output tests**.

| Element | Exposed structure | Status |
|---|---|---|
| Six page documents | English language, distinct titles, one page H1 and one main landmark before opening a popup | Present |
| Navigation | Named main/footer navigation; current-page marker; menu controls/expanded attributes | Present; keyboard sequencing still needs A1 |
| Images | No missing `alt` attributes in the page scans | Present; sample descriptions are specific to the photographs |
| Schedule | Day headings, lists, times, class headings and level descriptions | Readable structural grouping, rather than an image of a calendar |
| Booking | Named dialog; “Your Name”, “Email Address”, “Phone”, optional comment; named close control | Present; complete with A4–A6 |
| Video control | Accessible name differs from visible wording | A2 |

## Design critique

### Overall impression and hierarchy

The academy identity is recognizable immediately. The homepage headline communicates the activity and inclusion of different levels, and the cream hero CTA stands out. The forest green and cream palette, real academy photography, consistent buttons, and straightforward copy should remain.

The largest opportunity is to give practical information—times, age ranges, directions, and booking controls—more readable type. On mobile, oversized headings and generous section spacing have much greater emphasis than these decision-making details.

### Prioritized usability and consistency recommendations

| Priority | Finding | Recommendation |
|---|---|---|
| High | Mobile header booking label is 9px at 390px, dropping to 8px at 320px. Schedule times remain 10px; class-level notes are 11px. | Increase practical labels toward 12–14px and schedule times toward 14px. Shorten the mobile CTA to “Free class” if needed, while preserving a clear accessible name. Keep display headings large. |
| High | At a 320px viewport with a 15px scrollbar, all six pages have 312px document width inside a 305px content viewport. The menu button extends to x312.65; Home/About mission content also exceeds the content edge slightly. | Rebalance the narrow header's logo, gaps, button width and minimum widths. Check mission grid children for min-content overflow. Retest 320px and actual browser zoom; do not hide overflow to mask the sizing cause. This is a measured layout defect, not a complete 1.4.10 determination. |
| Medium | Programs contains “Explore all programs” linking to `/programs/` while already on that page. | Replace it there with a useful “View class times” destination or an in-page program jump. Keep the existing link on Home. |
| Medium | Mobile menu hit area is 38×44px; the header CTA is 42px high. | Aim for 44px in both dimensions for standalone controls and preserve spacing. Treat this as a usability improvement, not a WCAG 2.1 AA failure. |
| Medium | Interior pages repeat a large introductory hero and another large heading before the practical content. Programs repeats the program introduction; Instructors repeats “Meet your…” above the portraits; Contact has two introductory sections before the full contact details. | Reduce repeated lead-in copy/spacing where possible. Make Classes and Contact especially direct, keeping all required content. |
| Medium | “Book a free class” opens an inquiry form with a “Get in touch” submit action; it does not show an available time picker. | Add a short expectation-setting sentence that the academy will follow up to arrange the first class. Do not imply an immediately confirmed reservation. |
| Low | Several labels say “Call or text” but lead to `tel:` only. Separate SMS links exist elsewhere. | Use “Call” for telephone links and a separate “Text” action wherever both are offered. |

The 44px target criterion is [WCAG 2.1 2.5.5, Level AAA](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html), with exceptions. It is not counted among this report's AA failures. Small type alone is likewise not a WCAG minimum-font-size failure.

### Motion and imagery

- Preserve the requested alternating section-cover effect and footer reveal. They support the cinematic direction. Use the effects to frame sections while keeping essential reading tasks comfortable.
- At tablet width, program cards visibly sit at different vertical positions because of their independent parallax. This is expressive but makes comparison slower. Consider reducing card travel while keeping whole-section covers; similarly, keep class times stable while being read. These are design choices, not confirmed accessibility failures.
- Reduced-motion paths exist for video, Locomotive, text/card parallax, and footer effects. The relevant unit tests pass. A visible “Reduce motion” preference would make the option easier to discover, but its absence is not counted as an AA failure here.
- The photography inventory passes the no-repeated-source check. Academy interiors, supervised kids' training, adult training, and coach portraits are relevant to their respective sections. The Instructors hero now uses the training space, avoiding the earlier implication that an unidentified third person is an instructor.
- Keep the homepage's local mountain context, but ensure the opening video sequence quickly shows training as well. This is an editorial preference; it does not require changing the supplied photography.

### Page-by-page direction

| Page | Keep | Improve next |
|---|---|---|
| Home | Clear hero, primary CTA, full schedule, local identity | Mobile menu focus, larger practical text, matched video labels |
| About | Academy setting, mission, values, mat-system explanation | Narrow-width mission overflow and tiny fact labels |
| Programs | Relevant program photography and clearly named programs | Remove the self-link, reduce repeated intro, make card comparison easier |
| Instructors | Named portraits and bios, revised academy hero | Bring the coaches closer to the first screen by reducing repeated headings/spacing |
| Classes | Schedule immediately after hero, complete class descriptions | Enlarge times and level notes; favor stable schedule reading |
| Contact | Address, map, phone, SMS, email and trial access | Get visitors to contact actions sooner; clarify the inquiry/confirmation process |

## Recommended implementation order

1. Fix mobile menu focus sequencing and ensure focused content cannot remain hidden behind it (A1).
2. Correct focus rings, field boundaries and the actual close glyph (A3–A5).
3. Add input-purpose tokens and match the video control's visible/accessibility labels (A6, A2).
4. Address 320px sizing, larger mobile labels and schedule times, and the Programs self-link.
5. Recheck with real VoiceOver/NVDA, verified 200% zoom, increased text spacing, and physical mobile devices. Exercise provider failure and mocked submission errors without creating leads.

Implementation references: `src/components/Layout.tsx` (header), `src/components/Hero.tsx:37` (video control), `src/components/Booking.tsx` (provider enhancements), `src/components/Sections.tsx:26` (Programs link), and `src/styles.css` (focus, form, typography, responsive sizing).

## Remediation verification

After authorization, the application was updated and checked in the local production build:

- **A1:** The menu toggle now precedes the disclosed navigation in DOM order. Enter then Tab reaches Home. Leaving the header closes the panel before focus enters main content. Opening booking from the menu, then pressing Escape, returns focus to the still-visible menu booking link. The header ignores Escape while a booking dialog is active.
- **A2:** The video button uses its visible “Pause film” / “Play film” text as its accessible name.
- **A3:** Shared focus indicators now use black and cream rings, retaining a contrasting edge on both light and dark surfaces. The popup has an explicit matching focus rule.
- **A4:** Live provider field borders now compute to `#62665F`: 4.774:1 on cream and approximately 5.86:1 on white.
- **A5:** The actual close pseudo-element now computes to `#171A17`, 14.305:1 on cream.
- **A6:** Live provider inputs expose `autocomplete="name"`, `autocomplete="email"`, and `autocomplete="tel"`.
- At **320px**, all six pages measured **305px scroll width / 305px available content width**, eliminating the previously observed overflow. The standalone header controls are at least 44px high; the menu is 44px wide.
- The mobile header now uses “Free class” at 12px. Schedule times are 14px, level descriptions 13px, and key supporting labels have been enlarged. Footer links have more generous hit areas.
- Programs now links to `/praxis-classes/#schedule` with “View class times”. The mission telephone link says “Call”. Booking explains that the team will contact the visitor to arrange the first class.
- Desktop schedule and mobile menu/form were visually inspected. No application warnings or errors were captured in the verification tab.
- **`npm run check` passed:** TypeScript, 19 tests, production/SSR builds, static route/link/anchor/asset/metadata validation and the 26-photo uniqueness check. The keyboard regression test covers forward navigation and Escape isolation while booking is active.

The requested photography, section-cover effects, text/card parallax and footer reveal were retained. Suggestions about shortening page introductions or reducing decorative card travel remain optional design choices. The assistive-technology, physical-device and zoom limitations stated above still apply; these fixes are not a blanket WCAG conformance certification.
