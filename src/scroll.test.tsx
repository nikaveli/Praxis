import { act, cleanup, render, waitFor } from '@testing-library/react';
import { App } from './App';
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';
import { routes } from './data/content';

vi.mock('./animation/globalParallax.js', () => ({ initGlobalParallax: () => ({ revert: vi.fn() }) }));

const scroll = vi.hoisted(() => ({ create: vi.fn(), stop: vi.fn(), start: vi.fn(), destroy: vi.fn() }));
vi.mock('locomotive-scroll', () => ({ default: class {
  constructor() { scroll.create(); }
  stop = scroll.stop;
  start = scroll.start;
  destroy = scroll.destroy;
} }));
let reduced = false;
let change: (() => void) | undefined;
beforeEach(() => {
  reduced = false;
  vi.clearAllMocks();
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({ get matches() { return reduced; }, addEventListener: (_: string, callback: () => void) => { change = callback; }, removeEventListener: vi.fn() })));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.classList.remove('booking-open'); });

function Fixture() {
  useLocomotiveScroll('/praxis-classes/');
  return <><main><section className="newcomer"><div className="split"><img className="photo" alt="Training" /></div></section></main><dialog className="booking-fallback" data-lenis-prevent="" /></>;
}
it('enables smooth scrolling on all six routes without competing for GSAP targets', async () => {
  for (const route of routes) {
    const view = render(<App path={route.path} />);
    await waitFor(() => expect(document.documentElement.classList.contains('praxis-motion')).toBe(true));
    expect(view.container.querySelectorAll('[data-scroll]').length, route.path).toBeGreaterThan(0);
    expect(scroll.create).toHaveBeenCalledTimes(routes.indexOf(route) + 1);
    expect(view.container.querySelector('[data-scroll][data-parallax]')).toBeNull();
    expect(view.container.querySelector('[data-parallax] [data-scroll]')).toBeNull();
    expect(view.container.querySelector('[data-scroll] [data-parallax]')).toBeNull();
    expect(view.container.querySelector('.schedule-grid [data-scroll]')).toBeNull();
    view.unmount();
  }
});
it('pauses for the loading/failure dialog and provider popup, then resumes', async () => {
  render(<Fixture />);
  await waitFor(() => expect(scroll.create).toHaveBeenCalledOnce());
  const dialog = document.querySelector('dialog')!;
  await act(async () => { dialog.setAttribute('open', ''); });
  expect(scroll.stop).toHaveBeenCalledTimes(1);
  await act(async () => { document.body.classList.add('booking-open'); dialog.removeAttribute('open'); });
  expect(scroll.start).not.toHaveBeenCalled();
  await act(async () => { document.body.classList.remove('booking-open'); });
  expect(scroll.start).toHaveBeenCalledOnce();
});
it('honors reduced motion initially and when the preference changes', async () => {
  reduced = true;
  const view = render(<Fixture />);
  expect(scroll.create).not.toHaveBeenCalled();
  await act(async () => { reduced = false; change?.(); });
  await waitFor(() => expect(scroll.create).toHaveBeenCalledOnce());
  const target = document.querySelector<HTMLElement>('[data-scroll]')!;
  target.style.transform = 'translate3d(0, 12px, 0)';
  await act(async () => { reduced = true; change?.(); });
  expect(scroll.destroy).toHaveBeenCalledOnce();
  expect(target.style.transform).toBe('');
  expect(document.documentElement.classList.contains('praxis-motion')).toBe(false);
  view.unmount();
  expect(target.hasAttribute('data-scroll')).toBe(false);
});
