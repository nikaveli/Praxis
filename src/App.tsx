import { useEffect } from 'react';
import { BookingProvider, BookLink } from './components/Booking';
import { Header, Footer } from './components/Layout';
import { Hero, HeroReview } from './components/Hero';
import { Values, Community, Mission, Programs, Schedule, Coaches, FreeClass, ContactSection, PageHero, Newcomer, ProgramDetails, Photo } from './components/Sections';
import { business, home, classes, normalizePath, routes } from './data/content';

export function App({ path: originalPath = '/' }: { path?: string }) {
  const path = normalizePath(originalPath);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-revealed'); observer.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    // Resting content remains visible even when scripts or observers fail.
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  let content;
  switch (path) {
    case '/': content = <><Hero /><div id="values"><Values /></div><Community /><Mission /><Programs /><Schedule /><Coaches /><FreeClass /><ContactSection /></>; break;
    case '/about/': content = <><PageHero eyebrow="About Praxis" title={<>Built different.<br /><em>On purpose.</em></>} description={business.tagline} photo="community" /><Values /><Mission /><Community /><section className="facility-strip"><Photo name="facility" alt="The academy’s professional floating-platform mat system" sizes="100vw" /></section><FreeClass /></>; break;
    case '/programs/': content = <><PageHero eyebrow="Our programs" title={<>Find your<br /><em>path.</em></>} description={home.programIntro} photo="adults" /><Programs /><Newcomer /><ProgramDetails /><FreeClass /></>; break;
    case '/instructors/': content = <><PageHero eyebrow="The coaches" title={<>People pulling<br /><em>for you.</em></>} description={business.tagline} photo="mission" /><Coaches page /><Values /><FreeClass /></>; break;
    case '/praxis-classes/': content = <><PageHero eyebrow="Praxis JJ Academy" title={<>Train hard.<br /><em>Train smart.</em></>} description={classes.intro} /><Schedule standalone /><Newcomer /><ProgramDetails /><FreeClass classesPage /></>; break;
    case '/contact/': content = <><PageHero eyebrow="Contact Praxis" title={<>Your first class<br /><em>is free.</em></>} description={home.cta} photo="community" /><section className="section contact-intro" id="free-trial"><div className="container split"><div><p className="eyebrow">Ready to begin?</p><h2>Step onto<br /><em>the mats.</em></h2></div><div><p>{classes.cta}</p><div className="button-row"><BookLink /><a className="text-link" href={business.tel}>{business.phone} ↗</a></div><a className="text-link" href={`mailto:${business.email}`}>{business.email} ↗</a></div></div></section><ContactSection page /><Values /></>; break;
    default: content = <section className="section not-found"><div className="container"><p className="eyebrow">404 · Page not found</p><h1>Back to<br /><em>the mats.</em></h1><p>This page isn’t available. Find your next class or return home.</p><div className="button-row"><a className="button" href="/">Return home ↗</a><a className="text-link" href="/praxis-classes/">View class times ↗</a></div></div></section>;
  }
  return <BookingProvider><Header path={path} />{path === '/design-review/' ? <HeroReview /> : <main id="content">{content}</main>}<Footer /></BookingProvider>;
}
export { routes };
