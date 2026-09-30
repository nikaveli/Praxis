import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { business } from '../data/content';

const BookingContext = createContext<() => void>(() => {});
export const gymdesk = { ref: 'ArMKZ', gym: '6kRVO', popupId: '8023', script: 'https://app.gymdesk.com/js/widgets.js' };
const popupSelector = `.maonrails-popup[attr-id="${gymdesk.popupId}"]`;
const triggerSelector = `.maonrails-lead-form-button[attr-id="${gymdesk.popupId}"]`;
declare global { interface Window { jQuery?: unknown; MARforms?: { started?: boolean } } }

export function BookingProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'failed'>('idle');
  const fallback = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const pending = useRef(false);
  const initialized = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const polling = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const synchronize = useRef<() => void>(() => {});

  useEffect(() => {
    let active = false;
    let popup: HTMLElement | null = null;
    const root = document.getElementById('root');
    const restore = () => {
      if (!active) return;
      active = false;
      root?.removeAttribute('inert');
      document.body.classList.remove('booking-open');
      opener.current?.focus();
    };
    const sync = () => {
      popup = document.querySelector<HTMLElement>(popupSelector);
      const trigger = document.querySelector<HTMLElement>(triggerSelector);
      if (popup && !popup.hasAttribute('data-accessible')) {
        popup.setAttribute('data-accessible', 'true');
        popup.setAttribute('data-lenis-prevent', '');
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-label', 'Sign up for a free trial');
        popup.tabIndex = -1;
        const close = popup.querySelector<HTMLElement>('.close');
        if (close) {
          close.setAttribute('role', 'button');
          close.setAttribute('aria-label', 'Close booking form');
          close.tabIndex = 0;
          close.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close.click(); }
          });
        }
        const help = document.createElement('p');
        help.className = 'booking-help';
        help.append('Prefer to talk? ');
        const call = document.createElement('a'); call.href = business.tel; call.textContent = business.phone;
        const email = document.createElement('a'); email.href = `mailto:${business.email}`; email.textContent = 'Email us';
        help.append(call, ' · ', email); popup.append(help);
      }
      if (trigger && popup && window.MARforms?.started && pending.current) {
        pending.current = false;
        clearTimeout(timer.current);
        clearInterval(polling.current);
        fallback.current?.close();
        setStatus('idle');
        trigger.click();
      }
      if (popup && getComputedStyle(popup).display !== 'none' && popup.getClientRects().length > 0) {
        if (!active) {
          active = true;
          root?.setAttribute('inert', '');
          document.body.classList.add('booking-open');
          (popup.querySelector<HTMLElement>('input:not([type="hidden"])') ?? popup).focus();
        }
      } else restore();
    };
    synchronize.current = sync;
    // Ignore animation transforms outside the provider popup.
    const observer = new MutationObserver(records => {
      if (records.some(record => record.type === 'childList' || (record.target instanceof Element && record.target.closest(popupSelector)))) sync();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    const keyboard = (event: KeyboardEvent) => {
      if (!active || !popup) return;
      if (event.key === 'Escape') { event.preventDefault(); popup.querySelector<HTMLElement>('.close')?.click(); }
      if (event.key === 'Tab') {
        const items = Array.from(popup.querySelectorAll<HTMLElement>('a[href],button,input:not([type="hidden"]),textarea,select,[tabindex="0"]')).filter(e => e.getClientRects().length > 0 && !e.hasAttribute('disabled'));
        const first = items[0], last = items.at(-1);
        if (!first) { event.preventDefault(); popup.focus(); }
        else if (event.shiftKey && (document.activeElement === first || !popup.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => { observer.disconnect(); document.removeEventListener('keydown', keyboard); clearTimeout(timer.current); clearInterval(polling.current); restore(); };
  }, []);

  const request = () => {
    opener.current = document.activeElement as HTMLElement;
    const trigger = document.querySelector<HTMLElement>(triggerSelector);
    if (trigger && window.MARforms?.started) { trigger.click(); return; }
    pending.current = true;
    setStatus('loading');
    fallback.current?.showModal();
    if (!initialized.current) {
      initialized.current = true;
      const host = document.createElement('div');
      host.className = 'maonrails-form booking-widget-host';
      host.setAttribute('attr-ref', gymdesk.ref);
      host.setAttribute('attr-gym', gymdesk.gym);
      document.body.append(host);
      const fail = () => { pending.current = false; clearInterval(polling.current); clearTimeout(timer.current); setStatus('failed'); };
      const loadWidgets = () => {
        const script = document.createElement('script');
        script.src = gymdesk.script;
        script.async = true;
        script.onerror = fail;
        document.body.append(script);
      };
      // The provider's popup helper expects a global jQuery. Load it first,
      // as WordPress did, to avoid its noConflict / async popup initialization race.
      if (window.jQuery) loadWidgets();
      else {
        const jquery = document.createElement('script');
        jquery.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
        jquery.onload = loadWidgets;
        jquery.onerror = fail;
        document.body.append(jquery);
      }
    }
    clearInterval(polling.current);
    polling.current = setInterval(() => synchronize.current(), 100);
    timer.current = setTimeout(() => { pending.current = false; clearInterval(polling.current); setStatus('failed'); }, 12000);
  };
  const close = () => { pending.current = false; clearTimeout(timer.current); clearInterval(polling.current); fallback.current?.close(); setStatus('idle'); opener.current?.focus(); };
  return <BookingContext.Provider value={request}>
    {children}
    <dialog data-lenis-prevent="" className="booking-fallback" ref={fallback} aria-labelledby="booking-title" onCancel={close}>
      <button className="dialog-close" onClick={close} aria-label="Close booking dialog">×</button>
      <p className="eyebrow">Your first class is free</p>
      <h2 id="booking-title">Let’s get you<br />on the mats.</h2>
      <p role="status">{status === 'loading' ? 'Opening our secure free-trial form…' : 'The booking form is unavailable right now. Call, text, or email us to arrange your free first class.'}</p>
      <div className="button-row"><a className="button" href={business.tel}>Call {business.phone}</a><a className="text-link" href={business.sms}>Text us ↗</a></div>
      <a className="text-link" href={`mailto:${business.email}`}>{business.email} ↗</a>
    </dialog>
  </BookingContext.Provider>;
}

export function BookLink({ className = 'button', children = 'Book a free class' }: { className?: string; children?: ReactNode }) {
  const request = useContext(BookingContext);
  return <a className={className} href="/contact/#free-trial" onClick={e => { e.preventDefault(); request(); }}>{children}<span aria-hidden="true">↗</span></a>;
}
