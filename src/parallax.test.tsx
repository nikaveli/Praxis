import { act, cleanup, render, waitFor } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App';
import { routes } from './data/content';
import { prepareParallax, useGlobalParallax } from './hooks/useGlobalParallax';

const animation = vi.hoisted(() => ({ init: vi.fn(), revert: vi.fn() }));
vi.mock('./animation/globalParallax.js', () => ({ initGlobalParallax: () => { animation.init(); return { revert: animation.revert }; } }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

it('assigns text and card motion without changing page content or separating calendar days', () => {
  for (const route of routes) {
    const root = document.createElement('div');
    root.innerHTML = renderToStaticMarkup(<App path={route.path} />);
    const before = root.textContent;
    const elements = prepareParallax(root, route.path);
    expect(elements.length).toBeGreaterThan(0);
    expect(root.textContent).toBe(before);
    expect(root.querySelectorAll('.schedule-day [data-parallax], .schedule-day[data-parallax]')).toHaveLength(0);
    for (const calendar of root.querySelectorAll('.schedule-grid')) {
      expect(calendar.getAttribute('data-parallax-kind')).toBe('calendar');
      expect(calendar.getAttribute('data-parallax-end')).toBe('0');
    }
    for (const card of root.querySelectorAll('.program-card, .class-detail')) expect(card.getAttribute('data-parallax-kind')).toBe('card');
    for (const element of elements) expect(element.getAttribute('data-parallax-disable')).toBe('mobileLandscape');
  }
});
it('reverts GSAP when reduced motion is enabled and cleans up on unmount', async () => {
  let reduced = true;
  let preferenceChanged: (() => void) | undefined;
  vi.stubGlobal('IntersectionObserver', class {});
  vi.stubGlobal('matchMedia', () => ({ get matches() { return reduced; }, addEventListener: (_: string, fn: () => void) => { preferenceChanged = fn; }, removeEventListener: vi.fn() }));
  function Fixture() {
    useGlobalParallax('/contact/');
    return <main><section className="contact-intro"><h2>Visit Praxis</h2></section></main>;
  }
  const view = render(<Fixture />);
  expect(animation.init).not.toHaveBeenCalled();
  await act(async () => { reduced = false; preferenceChanged?.(); });
  await waitFor(() => expect(animation.init).toHaveBeenCalledOnce());
  await act(async () => { reduced = true; preferenceChanged?.(); });
  expect(animation.revert).toHaveBeenCalledOnce();
  expect(document.documentElement.classList.contains('praxis-parallax')).toBe(false);
  await act(async () => { reduced = false; preferenceChanged?.(); });
  await waitFor(() => expect(animation.init).toHaveBeenCalledTimes(2));
  const heading = view.container.querySelector('h2')!;
  view.unmount();
  expect(animation.revert).toHaveBeenCalledTimes(2);
  expect(heading.hasAttribute('data-parallax')).toBe(false);
});
