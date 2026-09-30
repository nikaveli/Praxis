import { Children, Fragment, isValidElement, useEffect, useRef, type ReactNode } from 'react';

function sectionsOf(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? sectionsOf(child.props.children)
      : [child]
  );
}

/** Keep the original document order; alternate resting sections and rising covers. */
export function SectionFlow({ children }: { children: ReactNode }) {
  const flow = useRef<HTMLDivElement>(null);
  const sections = sectionsOf(children);
  useEffect(() => {
    const root = flow.current;
    if (!root || !('ResizeObserver' in window)) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-section-underlay]'));
    const header = document.querySelector<HTMLElement>('.site-header');
    const measure = () => {
      root.style.setProperty('--section-header', `${header?.offsetHeight ?? 0}px`);
      for (const layer of layers) {
        // Tall sections scroll completely into view before their lower edge rests.
        layer.style.setProperty('--section-height', `${layer.offsetHeight}px`);
      }
      root.setAttribute('data-section-ready', '');
    };
    const observer = new ResizeObserver(measure);
    layers.forEach(layer => observer.observe(layer));
    if (header) observer.observe(header);
    measure();
    return () => {
      observer.disconnect();
      root.removeAttribute('data-section-ready');
      root.style.removeProperty('--section-header');
      layers.forEach(layer => layer.style.removeProperty('--section-height'));
    };
  }, [children]);
  return <div ref={flow} className="section-flow">{sections.map((section, index) =>
    <div className="section-layer" key={index} style={{ zIndex: index }}
      data-section-underlay={index % 2 === 0 && index < sections.length - 1 ? '' : undefined}>
      {section}
    </div>
  )}</div>;
}
