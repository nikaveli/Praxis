import gsap from 'gsap';

const textSelector = [
  'h1', 'h2', 'h3', 'h4', 'p', 'blockquote', '.eyebrow',
  '.facts > div', '.day-title', '.session', '.benefits li',
  '.contact-grid dl > div', '.image-caption', '.hero-side-label',
  '.schedule-legend', '.footer-bottom > span',
].join(',');

export function textRevealTargets(root: ParentNode): HTMLElement[] {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>(textSelector))
    .filter(element => !element.closest('nav, button, a, dialog, [role="dialog"], [aria-hidden="true"]'));
  const selected = new Set(candidates);
  // Keep schedule sessions and contact details intact; never animate both a
  // text group and its descendants or split accessible text into characters.
  return candidates.filter(element => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (selected.has(parent)) return false;
    }
    return true;
  });
}

export function mountTextReveals(roots: ParentNode[]) {
  const targets = roots.flatMap(textRevealTargets);
  const originals = new Map(targets.map(element => [element, {
    translate: element.style.translate,
    willChange: element.style.willChange,
  }]));
  const active = new Map<HTMLElement, gsap.core.Tween>();
  const compact = window.matchMedia('(max-width: 700px)');
  const offsets = new Map(targets.map(element => [element, { value: compact.matches ? 8 : 14 }]));
  let disposed = false;

  const restore = (element: HTMLElement) => {
    const original = originals.get(element)!;
    element.style.translate = original.translate;
    element.style.willChange = original.willChange;
    element.dataset.textReveal = 'complete';
    active.delete(element);
  };
  const observer = new IntersectionObserver(entries => {
    if (disposed) return;
    let order = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      if (element.dataset.textReveal !== 'pending') continue;
      observer.unobserve(element);
      if (element.contains(document.activeElement)) { restore(element); continue; }
      const offset = offsets.get(element)!;
      element.dataset.textReveal = 'running';
      element.style.willChange = 'translate';
      // Tween a separate value: CSSPlugin's transform parsing must never take
      // ownership of the transforms used by Osmo / Locomotive parallax.
      active.set(element, gsap.to(offset, {
        value: 0,
        duration: compact.matches ? 0.5 : 0.6,
        delay: Math.min(order++, 2) * 0.025,
        ease: 'power2.out',
        onUpdate: () => { element.style.translate = `0 ${offset.value}px`; },
        onComplete: () => restore(element),
      }));
    }
  }, { threshold: 0, rootMargin: '0px 0px 24px 0px' });

  targets.forEach(element => {
    element.dataset.textReveal = 'pending';
    // Prepare before observation/paint. Moving resting text down in the
    // observer callback caused a visible backward jump on every scroll reveal.
    element.style.translate = `0 ${offsets.get(element)!.value}px`;
    observer.observe(element);
  });
  const focus = (event: FocusEvent) => {
    if (!(event.target instanceof Node)) return;
    for (const element of targets) {
      if (!element.contains(event.target)) continue;
      observer.unobserve(element);
      active.get(element)?.kill();
      restore(element);
    }
  };
  document.addEventListener('focusin', focus);
  return () => {
    disposed = true;
    observer.disconnect();
    document.removeEventListener('focusin', focus);
    active.forEach(tween => tween.kill());
    targets.forEach(element => {
      restore(element);
      delete element.dataset.textReveal;
    });
  };
}
