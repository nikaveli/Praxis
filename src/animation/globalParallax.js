// Osmo Global Parallax Setup. Integration additions: ESM imports/export and cleanup handle.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGlobalParallax() {
  const mm = gsap.matchMedia();

  mm.add({
    isMobile: '(max-width: 479px)',
    isMobileLandscape: '(max-width: 767px)',
    isTablet: '(max-width: 991px)',
    isDesktop: '(min-width: 992px)'
  }, (context) => {
    const { isMobile, isMobileLandscape, isTablet } = context.conditions;

    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-parallax="trigger"]').forEach((trigger) => {
        const disable = trigger.getAttribute('data-parallax-disable');

        if (
          (disable === 'mobile' && isMobile) ||
          (disable === 'mobileLandscape' && isMobileLandscape) ||
          (disable === 'tablet' && isTablet)
        ) return;

        const target = trigger.querySelector('[data-parallax="target"]') || trigger;
        const direction = trigger.getAttribute('data-parallax-direction') || 'vertical';
        const prop = direction === 'horizontal' ? 'xPercent' : 'yPercent';

        const scrubAttr = trigger.getAttribute('data-parallax-scrub');
        const startAttr = trigger.getAttribute('data-parallax-start');
        const endAttr = trigger.getAttribute('data-parallax-end');

        const scrub = scrubAttr !== null ? parseFloat(scrubAttr) : true;
        const startVal = startAttr !== null ? parseFloat(startAttr) : 20;
        const endVal = endAttr !== null ? parseFloat(endAttr) : -20;

        const scrollStart = `clamp(${trigger.getAttribute('data-parallax-scroll-start') || 'top bottom'})`;
        const scrollEnd = `clamp(${trigger.getAttribute('data-parallax-scroll-end') || 'bottom top'})`;

        gsap.fromTo(target, {
          [prop]: startVal
        }, {
          [prop]: endVal,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: scrollStart,
            end: scrollEnd,
            scrub
          }
        });
      });
    });

    return () => ctx.revert();
  });
  return mm;
}

