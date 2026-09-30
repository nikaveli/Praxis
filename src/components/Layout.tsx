import { useEffect, useRef, useState } from 'react';
import { business, routes } from '../data/content';
import { BookLink } from './Booking';
import { useFooterParallax } from '../hooks/useFooterParallax';

export function Logo({ footer = false }: { footer?: boolean }) {
  return <a className={`logo ${footer ? 'logo-footer' : ''}`} href="/" aria-label="Praxis Jiu Jitsu Academy home"><img src="/media/logo.webp" alt="Praxis Jiu Jitsu Academy" width="1000" height="350" /></a>;
}
export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (document.body.classList.contains('booking-open') || document.querySelector('dialog[open]')) return;
      if (e.key === 'Escape' && open) { setOpen(false); menu.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);
  return <>
    <a className="skip-link" href="#content">Skip to content</a>
    <header className="site-header" onBlur={e => {
      const next = e.relatedTarget;
      if (!e.currentTarget.contains(next) && !(next instanceof Element && next.closest('dialog,[role="dialog"]'))) setOpen(false);
    }}>
      <div className="header-inner">
        <Logo />
        <button ref={menu} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-controls="primary-nav" aria-expanded={open} onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}><span /><span /></button>
        <nav ref={nav} id="primary-nav" data-lenis-prevent="" aria-label="Main navigation" className={open ? 'nav is-open' : 'nav'}>
          {routes.map(r => <a key={r.path} href={r.path} aria-current={path === r.path ? 'page' : undefined} onClick={() => setOpen(false)}>{r.label}</a>)}
          <BookLink className="button mobile-nav-book" />
        </nav>
        <BookLink className="button header-book"><span className="booking-label booking-label-full">Book a free class</span><span className="booking-label booking-label-short">Free class</span></BookLink>
      </div>
    </header>
  </>;
}
export function Footer() {
  const wrapper = useRef<HTMLDivElement>(null);
  useFooterParallax(wrapper);
  return <div ref={wrapper} data-footer-parallax="" className="footer-wrap"><footer data-footer-parallax-inner="" className="site-footer">
    <div className="container footer-main"><div><Logo footer /><p>{business.tagline}</p></div>
      <nav aria-label="Footer navigation">{routes.slice(1).map(r => <a key={r.path} href={r.path}>{r.label}</a>)}</nav>
      <div className="footer-contact"><a href={business.tel}>{business.phone}</a><a href={`mailto:${business.email}`}>{business.email}</a><a href={business.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Praxis Jiu Jitsu Academy</span><span>Bernalillo, New Mexico</span><span>All rights reserved</span></div>
  </footer><div data-footer-parallax-dark="" className="footer-wrap__dark" aria-hidden="true" /></div>;
}
