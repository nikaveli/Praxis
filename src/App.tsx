import { useEffect } from 'react';
import { useGlobalParallax } from './hooks/useGlobalParallax';
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';
import { BookingProvider, BookLink } from './components/Booking';
import { Header, Footer } from './components/Layout';
import { SectionFlow } from './components/SectionFlow';
import { Hero, HeroReview } from './components/Hero';
import { Values, Community, Mission, Programs, Schedule, Coaches, FreeClass, ContactSection, PageHero, Newcomer, ProgramDetails, Photo } from './components/Sections';
import { photography } from './data/photography';
import { business, home, classes, normalizePath, routes } from './data/content';

export function App({ path: originalPath = '/' }: { path?: string }) {
  const path = normalizePath(originalPath);
  useLocomotiveScroll(path);
  useGlobalParallax(path);
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
    case '/about/': content = <><PageHero eyebrow="About Praxis" title={<>About<br /><em>Praxis.</em></>} description={business.tagline} photo={photography.about.hero.name} alt={photography.about.hero.alt} /><Values /><Mission page /><Community page /><section className="facility-strip"><Photo name="platform" alt="The academy’s professional floating-platform mat system" sizes="100vw" /></section><FreeClass /></>; break;
    case '/programs/': content = <><PageHero eyebrow="Our programs" title={<>Jiu Jitsu<br /><em>programs.</em></>} description={home.programIntro} photo={photography.programs.hero.name} alt={photography.programs.hero.alt} /><Programs page /><Newcomer page="programs" /><ProgramDetails page="programs" /><FreeClass /></>; break;
    case '/instructors/': content = <><PageHero eyebrow="The coaches" title={<>Meet your<br /><em>coaches.</em></>} description={business.tagline} photo={photography.instructors.hero.name} alt={photography.instructors.hero.alt} /><Coaches page /><Values /><FreeClass /></>; break;
    case '/praxis-classes/': content = <><PageHero eyebrow="Praxis JJ Academy" title={<>Train hard.<br /><em>Train smart.</em></>} description={classes.intro} photo={photography.classes.hero.name} alt={photography.classes.hero.alt} /><Schedule standalone /><Newcomer page="classes" /><ProgramDetails page="classes" /><FreeClass classesPage /></>; break;
    case '/contact/': content = <><PageHero eyebrow="Contact Praxis" title={<>Your first class<br /><em>is free.</em></>} description={home.cta} photo={photography.contact.hero.name} alt={photography.contact.hero.alt} /><section className="section contact-intro" id="free-trial"><div className="container split"><div><p className="eyebrow">Ready to begin?</p><h2>Step onto<br /><em>the mats.</em></h2></div><div><p>{classes.cta}</p><div className="button-row"><BookLink /><a className="text-link" href={business.tel}>{business.phone} ↗</a></div><a className="text-link" href={`mailto:${business.email}`}>{business.email} ↗</a></div></div></section><ContactSection page /><Values /></>; break;
    default: content = <section className="section not-found"><div className="container"><p className="eyebrow">404 · Page not found</p><h1>Back to<br /><em>the mats.</em></h1><p>This page isn’t available. Find your next class or return home.</p><div className="button-row"><a className="button" href="/">Return home ↗</a><a className="text-link" href="/praxis-classes/">View class times ↗</a></div></div></section>;
  }
  return <BookingProvider><Header path={path} />{path === '/design-review/' ? <HeroReview /> : <main id="content"><SectionFlow key={path}>{content}</SectionFlow></main>}<Footer /></BookingProvider>;
}
export { routes };
