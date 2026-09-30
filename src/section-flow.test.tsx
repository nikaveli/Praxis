vi.mock('./animation/footerParallax.js', () => ({ mountFooterParallax: () => ({ revert: vi.fn() }) }));
import { act, cleanup, render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App';
import { SectionFlow } from './components/SectionFlow';
import { routes } from './data/content';

vi.mock('./animation/globalParallax.js', () => ({ initGlobalParallax: () => ({ revert: vi.fn() }) }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it('alternates whole sections across all six pages without pinning the last section', () => {
  for (const route of routes) {
    const root = document.createElement('div');
    root.innerHTML = renderToStaticMarkup(<App path={route.path} />);
    const layers = Array.from(root.querySelectorAll('.section-flow > .section-layer'));
    expect(layers.length, route.path).toBeGreaterThanOrEqual(4);
    layers.forEach((layer, index) => {
      expect(layer.hasAttribute('data-section-underlay')).toBe(index % 2 === 0 && index < layers.length - 1);
      expect(layer.children.length).toBe(1);
    });
    expect(root.querySelector('.site-header .section-layer')).toBeNull();
    expect(root.querySelector('.site-footer .section-layer')).toBeNull();
  }
});

it('updates the resting height after content resizes and disconnects on cleanup', () => {
  let resize: (() => void) | undefined;
  const disconnect = vi.fn();
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) { resize = callback; }
    observe() {}
    disconnect = disconnect;
  });
  let height = 1500;
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(() => height);
  const view = render(<SectionFlow><><section>Long section</section><section>Cover</section></></SectionFlow>);
  const flow = view.container.firstElementChild!;
  const layer = flow.firstElementChild as HTMLElement;
  expect(flow.hasAttribute('data-section-ready')).toBe(true);
  expect(layer.style.getPropertyValue('--section-height')).toBe('1500px');
  height = 1800;
  act(() => resize?.());
  expect(layer.style.getPropertyValue('--section-height')).toBe('1800px');
  view.unmount();
  expect(disconnect).toHaveBeenCalledOnce();
});
