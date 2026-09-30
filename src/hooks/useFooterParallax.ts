import { useEffect, type RefObject } from 'react';
import { mountFooterParallax } from '../animation/footerParallax.js';

export function useFooterParallax(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: ReturnType<typeof mountFooterParallax> | undefined;
    let generation = 0;
    const update = async () => {
      const current = ++generation;
      context?.revert();
      context = undefined;
      if (preference.matches) return;
      await document.fonts?.ready;
      if (current !== generation || preference.matches) return;
      context = mountFooterParallax(root);
    };
    preference.addEventListener('change', update);
    void update();
    return () => {
      generation++;
      preference.removeEventListener('change', update);
      context?.revert();
    };
  }, [ref]);
}
