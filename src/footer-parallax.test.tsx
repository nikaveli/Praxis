import { act, cleanup, render, waitFor } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Footer } from './components/Layout';
import { business, routes } from './data/content';

const motion = vi.hoisted(() => ({ mount: vi.fn(), revert: vi.fn() }));
vi.mock('./animation/footerParallax.js', () => ({ mountFooterParallax: (root: HTMLElement) => {
  motion.mount(root);
  return { revert: motion.revert };
} }));
afterEach(() => { cleanup(); vi.clearAllMocks(); vi.unstubAllGlobals(); });

it('retains footer destinations and the supplied wrapper, inner and noninteractive shade', () => {
  const root = document.createElement('div');
  root.innerHTML = renderToStaticMarkup(<Footer />);
  const wrapper = root.querySelector('[data-footer-parallax]')!;
  expect(wrapper.querySelector('footer[data-footer-parallax-inner]')).not.toBeNull();
  expect(wrapper.querySelector('[data-footer-parallax-dark]')?.getAttribute('aria-hidden')).toBe('true');
  for (const href of [...routes.map(route => route.path), business.tel, `mailto:${business.email}`, business.instagram]) {
    expect(wrapper.querySelector(`a[href="${href}"]`)).not.toBeNull();
  }
});

it('initializes with the mounted footer and reverts when reduced motion changes or it unmounts', async () => {
  let reduced = true;
  let change: (() => void) | undefined;
  vi.stubGlobal('IntersectionObserver', class {});
  vi.stubGlobal('matchMedia', () => ({ get matches() { return reduced; }, addEventListener: (_: string, fn: () => void) => { change = fn; }, removeEventListener: vi.fn() }));
  const view = render(<Footer />);
  expect(motion.mount).not.toHaveBeenCalled();
  await act(async () => { reduced = false; change?.(); });
  await waitFor(() => expect(motion.mount).toHaveBeenCalledWith(view.container.firstElementChild));
  await act(async () => { reduced = true; change?.(); });
  expect(motion.revert).toHaveBeenCalledOnce();
  await act(async () => { reduced = false; change?.(); });
  await waitFor(() => expect(motion.mount).toHaveBeenCalledTimes(2));
  view.unmount();
  expect(motion.revert).toHaveBeenCalledTimes(2);
});
