import { useEffect, useRef, useState } from 'react';
import { home } from '../data/content';
import { BookLink } from './Booking';
export type HeroVariant = 'cinematic' | 'split' | 'poster';

export function Hero({ variant = 'cinematic', preview = false }: { variant?: HeroVariant; preview?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReduced(preference.matches);
      if (preference.matches || preview) { video.current?.pause(); setPlaying(false); }
      else video.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    update(); preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, [preview]);
  const toggle = () => {
    if (playing) { video.current?.pause(); setPlaying(false); }
    else video.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  return <section className={`hero hero-${variant} ${preview ? 'hero-preview' : ''}`} aria-label="Welcome to Praxis">
    <div className="hero-media">
      <img src="/media/hero-poster.webp" alt="Praxis Academy and the Sandia Mountains in Bernalillo" width="1920" height="1080" fetchPriority="high" />
      {!reduced && <video ref={video} loop muted playsInline preload={preview ? 'none' : 'metadata'} poster="/media/hero-poster.webp" aria-hidden="true" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="/media/hero-mobile.mp4" media="(max-width: 700px)" type="video/mp4" />
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>}
    </div>
    <div className="hero-shade" />
    <div className="container hero-content"><p className="eyebrow hero-location"><span />Bernalillo, New Mexico</p>
      <h1>Forge your<br /><em>best self.</em></h1>
      <div className="hero-bottom-copy"><p>{home.intro}</p><div className="button-row"><BookLink className="button button-cream" /><a className="hero-explore" href="/programs/">Explore programs <span aria-hidden="true">↗</span></a></div></div>
    </div>
    <div className="container hero-foot"><a href={preview ? "/#values" : "#values"} className="scroll-hint">Scroll to discover <span aria-hidden="true">↓</span></a><span className="hero-side-label">Black belt founded · Family owned</span>{!reduced && !preview && <button className="video-toggle" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>{playing ? 'Pause film' : 'Play film'}</button>}</div>
  </section>;
}

export function HeroReview() {
  const [selected, setSelected] = useState<HeroVariant>('cinematic');
  return <main id="content" className="hero-review"><div className="container review-intro"><p className="eyebrow">Praxis · Design review</p><h1>Three ways<br />to make an entrance.</h1><p>The same identity, imagery, and content. Full-width cinematic is the website default.</p><div className="review-tabs" role="group" aria-label="Hero treatments">{([['cinematic','01 / Full-width film'],['split','02 / Editorial split'],['poster','03 / Athletic poster']] as const).map(([id,label]) => <button className={selected === id ? 'selected' : ''} key={id} onClick={() => setSelected(id)} aria-pressed={selected === id}>{label}</button>)}</div></div><Hero key={selected} variant={selected} preview /><div className="container review-return"><a className="text-link" href="/">Return to the homepage ↗</a></div></main>;
}
