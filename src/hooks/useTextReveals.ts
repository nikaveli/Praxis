import { useEffect } from 'react';
import { mountTextReveals } from '../animation/textReveals';

export function useTextReveals(path: string) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const roots = Array.from(document.querySelectorAll('main, .site-footer'));
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup: (() => void) | undefined;
    const update = () => {
      cleanup?.();
      cleanup = preference.matches ? undefined : mountTextReveals(roots);
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      preference.removeEventListener('change', update);
      cleanup?.();
    };
  }, [path]);
}
