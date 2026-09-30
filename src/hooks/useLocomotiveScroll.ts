import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

// Alternating editorial sections for the content animation layer.
export const motionSections: Record<string, string[]> = {
  '/': ['.community', '.programs', '.coaches', '.contact-section'],
  '/about/': ['.mission', '.facility-strip'],
  '/programs/': ['.programs', '.program-details'],
  '/instructors/': ['.coaches', '.free-class'],
  '/praxis-classes/': ['.newcomer', '.free-class'],
  '/contact/': ['.contact-intro', '.values'],
};
// GSAP owns text, complete cards and schedule blocks; Locomotive owns only these photos.
const photoTargets: Record<string, string> = {
  '/': '.community-picture, .owners-photo',
  '/about/': '.mission-picture, .facility-strip > .photo',
  '/programs/': '.newcomer .split > .photo, .open-training > article > .photo',
  '/instructors/': '.coach-photo',
  '/praxis-classes/': '.newcomer .split > .photo, .open-training > article > .photo',
  '/contact/': '.location-media > .photo',
};

export function useLocomotiveScroll(path: string) {
  useEffect(() => {
    if (!photoTargets[path] || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(document.querySelector('main')?.querySelectorAll<HTMLElement>(photoTargets[path]) ?? []);
    elements.forEach((element, index) => {
      element.setAttribute('data-scroll', '');
      element.setAttribute('data-scroll-speed', index % 2 ? '-0.05' : '0.1');
      element.setAttribute('data-scroll-offset', '0, 0');
    });
    let instance: LocomotiveScroll | undefined;
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
    const update = () => {
      destroy();
      if (preference.matches) return;
      try {
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
    update();
    return () => {
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
