import { useEffect } from 'react';
import { motionSections } from './useLocomotiveScroll';

// Values are percentages of each target's own height, as in the supplied resource.
export function prepareParallax(root: HTMLElement, path: string) {
  const elements: HTMLElement[] = [];
  const add = (element: HTMLElement, start: number, kind: string) => {
    element.setAttribute('data-parallax', 'trigger');
    element.setAttribute('data-parallax-start', String(start));
    element.setAttribute('data-parallax-end', '0');
    element.setAttribute('data-parallax-scroll-end', 'top 35%');
    element.setAttribute('data-parallax-disable', 'mobileLandscape');
    element.setAttribute('data-parallax-kind', kind);
    elements.push(element);
  };
  for (const section of motionSections[path] ?? []) {
    root.querySelectorAll<HTMLElement>(`${section} h2, ${section}.values h3`).forEach(element => add(element, 12, 'text'));
  }
  root.querySelectorAll<HTMLElement>('.schedule-section h2').forEach(element => add(element, 12, 'text'));
  root.querySelectorAll<HTMLElement>('.program-card, .class-detail').forEach((element, index) => add(element, [4, 6, 8][index % 3], 'card'));
  // Keep days, times, borders and labels together throughout the movement.
  root.querySelectorAll<HTMLElement>('.schedule-grid').forEach(element => add(element, 4, 'calendar'));
  return elements;
}

export function useGlobalParallax(path: string) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('main');
    if (!root || !motionSections[path] || !('IntersectionObserver' in window)) return;
    const elements = prepareParallax(root, path);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup: (() => void) | undefined;
    let disposed = false;
    let generation = 0;
    const destroy = () => {
      cleanup?.();
      cleanup = undefined;
      document.documentElement.classList.remove('praxis-parallax');
    };
    const update = async () => {
      const current = ++generation;
      destroy();
      if (preference.matches) return;
      try {
        const { initGlobalParallax } = await import('../animation/globalParallax.js');
        await document.fonts?.ready;
        if (disposed || current !== generation || preference.matches) return;
        const media = initGlobalParallax();
        cleanup = () => media.revert();
        document.documentElement.classList.add('praxis-parallax');
      } catch (error) {
        if (disposed || current !== generation) return;
        destroy();
        console.warn('Parallax could not initialize; content remains available.', error);
      }
    };
    preference.addEventListener('change', update);
    void update();
    return () => {
      disposed = true;
      generation++;
      preference.removeEventListener('change', update);
      destroy();
      for (const element of elements) {
        for (const attribute of ['data-parallax', 'data-parallax-start', 'data-parallax-end', 'data-parallax-scroll-end', 'data-parallax-disable', 'data-parallax-kind']) element.removeAttribute(attribute);
      }
    };
  }, [path]);
}
