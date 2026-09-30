import { useEffect } from 'react';
import type LocomotiveScroll from 'locomotive-scroll';

// Alternating editorial sections; keep the schedule itself steady and readable.
export const motionSections: Record<string, string[]> = {
  '/': ['.community', '.programs', '.coaches', '.contact-section'],
  '/about/': ['.mission', '.facility-strip'],
  '/programs/': ['.programs', '.program-details'],
  '/instructors/': ['.coaches', '.free-class'],
  '/praxis-classes/': ['.newcomer', '.free-class'],
  '/contact/': ['.contact-intro', '.values'],
};
const targets = '.section-heading, .split-copy, .community-picture, .mission-picture, .program-image, .coach-photo, .owners-photo, .contact-grid > div:first-child, .free-class-inner > div, .values-grid > article, .contact-intro .split > div, .newcomer .split > .photo, .facility-strip > .photo';

export function useLocomotiveScroll(path: string) {
  useEffect(() => {
    if (!motionSections[path] || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = motionSections[path].flatMap(selector =>
      Array.from(document.querySelectorAll<HTMLElement>(`main ${selector}`)).flatMap(section => Array.from(section.querySelectorAll<HTMLElement>(targets)))
    );
    elements.forEach((element, index) => {
      element.setAttribute('data-scroll', '');
      element.setAttribute('data-scroll-speed', index % 2 ? '-0.015' : '0.025');
      element.setAttribute('data-scroll-offset', '0, 0');
    });
    let instance: LocomotiveScroll | undefined;
    let disposed = false;
    let generation = 0;
    let paused = false;
    const fallback = document.querySelector<HTMLDialogElement>('.booking-fallback');
    const syncBooking = () => {
      const next = document.body.classList.contains('booking-open') || Boolean(fallback?.open);
      if (!instance || next === paused) return;
      paused = next;
      if (paused) instance.stop();
      else instance.start();
    };
    const destroy = () => {
      instance?.destroy();
      instance = undefined;
      paused = false;
      document.documentElement.classList.remove('praxis-motion');
      elements.forEach(element => element.style.removeProperty('transform'));
    };
    const update = async () => {
      const current = ++generation;
      destroy();
      if (preference.matches) return;
      try {
        const { default: LocomotiveScroll } = await import('locomotive-scroll');
        if (disposed || current !== generation || preference.matches) return;
        // Osmo / Locomotive v5 initialization; default native touch behavior.
        instance = new LocomotiveScroll();
        document.documentElement.classList.add('praxis-motion');
        syncBooking();
      } catch (error) {
        // Content and native scrolling remain available if the library cannot load.
        destroy();
        console.warn('Smooth scrolling could not initialize; using native scrolling.', error);
      }
    };
    const bookingObserver = new MutationObserver(syncBooking);
    bookingObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    if (fallback) bookingObserver.observe(fallback, { attributes: true, attributeFilter: ['open'] });
    preference.addEventListener('change', update);
    void update();
    return () => {
      disposed = true;
      generation++;
      bookingObserver.disconnect();
      preference.removeEventListener('change', update);
      destroy();
      elements.forEach(element => {
        element.removeAttribute('data-scroll');
        element.removeAttribute('data-scroll-speed');
        element.removeAttribute('data-scroll-offset');
      });
    };
  }, [path]);
}
