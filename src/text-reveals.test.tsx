import { act, cleanup, render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App';
import { routes } from './data/content';
import { mountTextReveals, textRevealTargets } from './animation/textReveals';
import { useTextReveals } from './hooks/useTextReveals';

vi.mock('./animation/globalParallax.js', () => ({ initGlobalParallax: () => ({ revert: vi.fn() }) }));
vi.mock('./animation/footerParallax.js', () => ({ mountFooterParallax: () => ({ revert: vi.fn() }) }));

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function mockViewport(reduced = false, mobile = false) {
  let preference = reduced;
  let change: (() => void) | undefined;
  let intersect: IntersectionObserverCallback;
  const disconnect = vi.fn();
  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() { return query.includes('reduced-motion') ? preference : mobile; },
    addEventListener: (_: string, callback: () => void) => { change = callback; },
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe = vi.fn(); unobserve = vi.fn(); disconnect = disconnect;
  });
  return {
    enter: (target: Element) => intersect([{ target, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver),
    reduce: () => { preference = true; change?.(); },
    disconnect,
  };
}

it('covers headings and copy on all six pages without nested motion or changing accessible text', () => {
  for (const route of routes) {
    const root = document.createElement('div');
    root.innerHTML = renderToStaticMarkup(<App path={route.path} />);
    const before = root.innerHTML;
    const targets = textRevealTargets(root.querySelector('main')!);
    expect(targets).toContain(root.querySelector('h1'));
    for (const text of root.querySelectorAll('main h2, main h3, main h4, main p')) {
      expect(targets.some(target => target === text || target.contains(text))).toBe(true);
    }
    expect(targets.every(target => !targets.some(other => other !== target && other.contains(target)))).toBe(true);
    expect(targets.every(target => !target.matches('button, a, .program-card, .schedule-grid'))).toBe(true);
    expect(root.innerHTML).toBe(before);
  }
});

it.each([false, true])('preserves parallax transforms, visible copy, and cleans active motion (mobile=%s)', mobile => {
  const viewport = mockViewport(false, mobile);
  const root = document.createElement('main');
  root.innerHTML = '<h2 style="transform:translateY(6px)">Class times</h2>';
  const heading = root.querySelector('h2')!;
  const stop = mountTextReveals([root]);
  expect(heading.style.opacity).toBe('');
  viewport.enter(heading);
  expect(heading.style.translate).toBe(`0 ${mobile ? 12 : 20}px`);
  expect(heading.style.transform).toBe('translateY(6px)');
  stop();
  expect(heading.style.translate).toBe('');
  expect(heading.style.transform).toBe('translateY(6px)');
  expect(heading.style.willChange).toBe('');
  expect(heading.hasAttribute('data-text-reveal')).toBe(false);
  expect(viewport.disconnect).toHaveBeenCalledOnce();
});

it('ends motion immediately for keyboard focus and a changed reduced-motion preference', () => {
  const viewport = mockViewport();
  function Fixture() {
    useTextReveals('/contact/');
    return <main><h1>Contact</h1><div className="contact-grid"><dl><div><dt>Phone</dt><dd><a href="tel:5054596188">Call Praxis</a></dd></div></dl></div></main>;
  }
  const view = render(<Fixture />);
  const group = view.container.querySelector('dl > div') as HTMLElement;
  viewport.enter(group);
  act(() => view.container.querySelector('a')!.focus());
  expect(group.style.translate).toBe('');
  expect(group.dataset.textReveal).toBe('complete');
  viewport.enter(view.container.querySelector('h1')!);
  act(() => viewport.reduce());
  expect(view.container.querySelector('[data-text-reveal]')).toBeNull();
  expect(view.container.querySelector('h1')!.style.translate).toBe('');
});

it('leaves content still when reduced motion is already enabled', () => {
  mockViewport(true);
  function Fixture() { useTextReveals('/'); return <main><h1>Praxis</h1></main>; }
  const view = render(<Fixture />);
  expect(view.container.querySelector('[data-text-reveal]')).toBeNull();
});
