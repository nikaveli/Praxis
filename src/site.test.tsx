import { renderToStaticMarkup } from 'react-dom/server';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';
import { BookingProvider, BookLink, gymdesk } from './components/Booking';
import { Hero } from './components/Hero';
import { classes, home, coaches, programs, values, schedule, routes, classDetails, openTraining } from './data/content';

const textOf = (path: string) => {
  const doc = new DOMParser().parseFromString(renderToStaticMarkup(<App path={path} />), 'text/html');
  return doc.body.textContent ?? '';
};
const normalize = (s: string) => s.replace(/\s+/g,' ').trim();

it('shows a still image and avoids playback when reduced motion is requested', () => {
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  const view = render(<Hero />);
  expect(view.container.querySelector('video')).toBeNull();
  expect(view.container.querySelector('img')?.getAttribute('src')).toBe('/media/hero-poster.webp');
  expect(play).not.toHaveBeenCalled();
  view.unmount(); pause.mockRestore(); play.mockRestore(); window.matchMedia = original;
});

describe('migration acceptance', () => {
  it('preserves every existing homepage paragraph', () => {
    const text = normalize(textOf('/'));
    for (const paragraph of [home.intro, home.community, ...home.mission, home.mats, home.programIntro, home.scheduleIntro, home.cta, ...values.map(v=>v.text), ...programs.map(p=>p.text), ...coaches.map(c=>c.bio)]) {
      expect(text).toContain(normalize(paragraph));
    }
  });
  it('preserves the full live Classes page including Saturday', () => {
    const text = normalize(textOf('/praxis-classes/'));
    for (const paragraph of [classes.intro, classes.scheduleIntro, classes.start, classes.programsIntro, ...classes.kids, ...classes.physical, ...classes.life, ...classDetails.flatMap(c=>[c.text,c.focus]), openTraining.friday, ...openTraining.saturday, classes.cta]) expect(text).toContain(normalize(paragraph));
  });
  it('renders identical schedules on both pages with the approved times', () => {
    const docs = ['/', '/praxis-classes/'].map(path=>new DOMParser().parseFromString(renderToStaticMarkup(<App path={path} />),'text/html'));
    expect(docs[0].querySelector('.schedule-grid')?.textContent).toBe(docs[1].querySelector('.schedule-grid')?.textContent);
    expect(schedule.flatMap(d=>d.sessions)).toHaveLength(10);
    expect(schedule[1].sessions.map(s=>s.time)).toEqual(['5:00 PM','6:00 PM','7:00 PM']);
    expect(schedule[5].sessions[0]).toMatchObject({name:'All Levels No-Gi',time:'11:00 AM'});
  });
  it('provides six pages, a single primary heading per page, and preserved anchors', () => {
    expect(routes).toHaveLength(6);
    for(const r of routes){
      const doc=new DOMParser().parseFromString(renderToStaticMarkup(<App path={r.path}/>),'text/html');
      expect(doc.querySelectorAll('main h1')).toHaveLength(1);
      expect(doc.querySelector('a[aria-current="page"]')?.getAttribute('href')).toBe(r.path);
    }
    const doc=new DOMParser().parseFromString(renderToStaticMarkup(<App path="/"/>),'text/html');
    for(const id of ['content','about','programs','schedule','instructors','contact']) expect(doc.getElementById(id)).not.toBeNull();
  });
  it('uses branded email consistently and no fabricated booking destinations', () => {
    for(const r of routes){
      const doc=new DOMParser().parseFromString(renderToStaticMarkup(<App path={r.path}/>),'text/html');
      doc.querySelectorAll('a[href^="mailto:"]').forEach(a=>expect(a.getAttribute('href')).toBe('mailto:info@prxsjiujitsu.com'));
      expect(doc.querySelector('a[href="tel:5054596188"]')).not.toBeNull();
      expect(doc.querySelector('a[href="/contact/#free-trial"]')).not.toBeNull();
    }
  });
});

describe('booking integration', () => {
  afterEach(()=>{cleanup(); vi.useRealTimers(); document.querySelectorAll('script[src*="gymdesk"],.booking-widget-host,.maonrails-lead-form-button,.maonrails-popup').forEach(e=>e.remove());});
  beforeEach(()=>{
    window.jQuery = {}; window.MARforms = { started: true }; 
    HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
    HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
  });
  it('loads the supplied official form once and shows contact alternatives on timeout', async () => {
    vi.useFakeTimers();
    render(<BookingProvider><BookLink /></BookingProvider>);
    fireEvent.click(screen.getByText('Book a free class'));
    expect(document.querySelector('.maonrails-form')?.getAttribute('attr-ref')).toBe('ArMKZ');
    expect(document.querySelector('.maonrails-form')?.getAttribute('attr-gym')).toBe('6kRVO');
    expect(document.querySelectorAll(`script[src="${gymdesk.script}"]`)).toHaveLength(1);
    await act(async()=>{vi.advanceTimersByTime(12001);});
    expect(screen.getByRole('status').textContent).toContain('unavailable');
    expect(screen.getByText('Call 505-459-6188').getAttribute('href')).toBe('tel:5054596188');
    fireEvent.click(screen.getByLabelText('Close booking dialog'));
    fireEvent.click(screen.getByText('Book a free class'));
    expect(document.querySelectorAll(`script[src="${gymdesk.script}"]`)).toHaveLength(1);
  });
  it('opens the same provider popup from every CTA and adds keyboard semantics', async () => {
    render(<BookingProvider><BookLink>Header booking</BookLink><BookLink>Program booking</BookLink></BookingProvider>);
    const trigger=document.createElement('a');trigger.className='maonrails-lead-form-button';trigger.setAttribute('attr-id','8023');
    const click=vi.fn();trigger.addEventListener('click',click);
    const popup=document.createElement('div');popup.className='maonrails-popup';popup.setAttribute('attr-id','8023');popup.style.display='none';popup.innerHTML='<span class="close"></span><input name="name"><button>Get in touch</button>';
    await act(async()=>{document.body.append(trigger,popup);});
    fireEvent.click(screen.getByText('Header booking'));fireEvent.click(screen.getByText('Program booking'));
    expect(click).toHaveBeenCalledTimes(2);
    expect(popup.getAttribute('role')).toBe('dialog');
    expect(popup.getAttribute('aria-modal')).toBe('true');
    expect(popup.querySelector('.close')?.getAttribute('aria-label')).toBe('Close booking form');
    expect(popup.querySelector('a[href="mailto:info@prxsjiujitsu.com"]')).not.toBeNull();
  });
  it('does not open a late-loading form after a visitor cancels', async () => {
    render(<BookingProvider><BookLink /></BookingProvider>);
    fireEvent.click(screen.getByText('Book a free class'));
    fireEvent.click(screen.getByLabelText('Close booking dialog'));
    const trigger=document.createElement('a');trigger.className='maonrails-lead-form-button';trigger.setAttribute('attr-id','8023');
    const click=vi.fn();trigger.addEventListener('click',click);
    const popup=document.createElement('div');popup.className='maonrails-popup';popup.setAttribute('attr-id','8023');popup.style.display='none';
    await act(async()=>{document.body.append(trigger,popup);});
    expect(click).not.toHaveBeenCalled();
  });
});
