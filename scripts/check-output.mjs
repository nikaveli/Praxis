import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

const routes = ['/', '/about/', '/programs/', '/instructors/', '/praxis-classes/', '/contact/', '/design-review/'];
const docs = new Map(routes.map(route => [route, new JSDOM(readFileSync(join('dist', route, 'index.html'), 'utf8')).window.document]));
const failures = [];
for (const [route, doc] of docs) {
  for (const attribute of ['src', 'href', 'poster']) {
    for (const element of doc.querySelectorAll(`[${attribute}]`)) {
      const value = element.getAttribute(attribute);
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const url = new URL(value, `https://prxsjiujitsu.com${route}`);
      if (docs.has(url.pathname)) {
        if (url.hash && !docs.get(url.pathname).getElementById(url.hash.slice(1))) failures.push(`${route}: missing anchor ${value}`);
      } else if (!existsSync(join('dist', url.pathname))) failures.push(`${route}: missing asset ${value}`);
    }
  }
  if (!doc.querySelector('meta[name="description"]')?.content) failures.push(`${route}: missing description`);
  if (!doc.querySelector('link[rel="canonical"]')) failures.push(`${route}: missing canonical`);
  JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
}
if (failures.length) throw new Error(failures.join('\n'));
console.log('Static output verified: seven routes, internal destinations, anchors, assets and metadata.');
