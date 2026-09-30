import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { seoEnvironment, productionOrigin } from './seo.mjs';

const routes = ['/', '/about/', '/programs/', '/instructors/', '/praxis-classes/', '/contact/', '/design-review/'];
const docs = new Map(routes.map(route => [route, new JSDOM(readFileSync(join('dist', route, 'index.html'), 'utf8')).window.document]));
const failures = [];
const seo = seoEnvironment();
const titles = new Set();
const descriptions = new Set();
const manifest = JSON.parse(readFileSync('public/media/manifest.json', 'utf8'));
const photoSources = new Map(Object.values(manifest).flatMap(asset =>
  (asset.derivatives ?? []).map(derivative => [`/media/${derivative.file}`, asset.source])
));
const placements = new Map();
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
  if (route !== '/design-review/') {
    for (const img of doc.querySelectorAll('main img.photo')) {
      const source = photoSources.get(img.getAttribute('src'));
      if (!source) failures.push(`${route}: unregistered photo ${img.getAttribute('src')}`);
      if (!img.alt.trim()) failures.push(`${route}: photo has no description`);
      if (placements.has(source)) failures.push(`${route}: repeated photo ${source}, also used on ${placements.get(source)}`);
      placements.set(source, route);
    }
  }
  if (!doc.querySelector('meta[name="description"]')?.content) failures.push(`${route}: missing description`);
  if (!doc.querySelector('link[rel="canonical"]')) failures.push(`${route}: missing canonical`);
  if (doc.querySelector('link[rel="canonical"]')?.href !== `${productionOrigin}${route}`) failures.push(`${route}: incorrect canonical`);
  if (titles.has(doc.title)) failures.push(`${route}: duplicate title`);
  titles.add(doc.title);
  const description = doc.querySelector('meta[name="description"]')?.content;
  if (descriptions.has(description)) failures.push(`${route}: duplicate description`);
  descriptions.add(description);
  const noindex = route === '/design-review/' || !seo.indexable;
  if (doc.querySelector('meta[name="robots"]')?.content.includes('noindex') !== noindex) failures.push(`${route}: wrong indexation policy`);
  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
    if (!doc.querySelector(`meta[property="${property}"]`)?.content) failures.push(`${route}: missing ${property}`);
  }
  if (route !== '/design-review/') {
    const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
    if (!graph.some(node => node['@type'] === 'SportsActivityLocation' && node.email === 'info@prxsjiujitsu.com')) failures.push(`${route}: missing academy schema`);
    if (!graph.some(node => node['@id'] === `${productionOrigin}${route}#webpage`)) failures.push(`${route}: missing page schema`);
  }
}
const sitemap = new JSDOM(readFileSync('dist/sitemap.xml', 'utf8'), { contentType: 'text/xml' }).window.document;
const sitemapUrls = [...sitemap.querySelectorAll('loc')].map(node => node.textContent);
const expectedUrls = routes.filter(route => route !== '/design-review/').map(route => productionOrigin + route);
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedUrls)) failures.push('Sitemap must contain exactly the six canonical public routes');
const headers = readFileSync('dist/_headers', 'utf8');
if (!seo.indexable && !headers.includes('/*\n  X-Robots-Tag: noindex, nofollow')) failures.push('Preview response noindex header missing');
if (seo.indexable && headers.includes('\n/*\n  X-Robots-Tag: noindex')) failures.push('Production must not use global noindex');
const robots = readFileSync('dist/robots.txt', 'utf8');
if (/Disallow:\s*\//.test(robots)) failures.push('Do not prevent crawlers from reading page noindex directives');
if (seo.indexable && !robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) failures.push('Production sitemap discovery missing');
if (failures.length) throw new Error(failures.join('\n'));
console.log('Static output verified: seven routes, internal destinations, anchors, assets and metadata.');
console.log(`Photography verified: ${placements.size} distinct photographs across six public pages, with no repeated source files.`);
