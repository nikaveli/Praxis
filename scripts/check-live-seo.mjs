import { mkdir, writeFile } from 'node:fs/promises';
import { get as httpsGet } from 'node:https';
import { brotliDecompressSync, gunzipSync, inflateSync } from 'node:zlib';
import { JSDOM } from 'jsdom';
import { routes } from '../.ssr/entry-server.js';
import { seoEnvironment } from './seo.mjs';

const config = seoEnvironment();
const results = [];
const failures = [];
// Native HTTPS gives the audit raw response headers and explicit decompression.
const get = path => new Promise((resolve, reject) => {
  const request = httpsGet(`${config.assetOrigin}${path}`, { headers: { 'Accept-Encoding': 'identity' } }, response => {
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('error', reject);
    response.on('end', () => {
      try {
        let bytes = Buffer.concat(chunks);
        const encoding = response.headers['content-encoding'];
        if (encoding === 'br') bytes = brotliDecompressSync(bytes);
        if (encoding === 'gzip') bytes = gunzipSync(bytes);
        if (encoding === 'deflate') bytes = inflateSync(bytes);
        resolve({ status: response.statusCode, headers: { get: name => response.headers[name.toLowerCase()] || null }, text: async () => bytes.toString('utf8') });
      } catch (error) { reject(error); }
    });
  });
  request.setTimeout(20000, () => request.destroy(new Error(`Timed out: ${path}`)));
  request.on('error', reject);
});
await Promise.all(routes.map(async route => {
  const response = await get(route.path);
  const doc = new JSDOM(await response.text()).window.document;
  const canonical = doc.querySelector('link[rel="canonical"]')?.href;
  const robots = doc.querySelector('meta[name="robots"]')?.content || '';
  const header = response.headers.get('x-robots-tag') || '';
  const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')?.textContent || '{}')['@graph'];
  if (response.status !== 200) failures.push(`${route.path}: HTTP ${response.status}`);
  if (doc.title !== route.title) failures.push(`${route.path}: stale or incorrect title`);
  if (canonical !== config.canonicalOrigin + route.path) failures.push(`${route.path}: wrong canonical`);
  if (robots.includes('noindex') === config.indexable) failures.push(`${route.path}: wrong HTML indexing policy`);
  if (header.includes('noindex') === config.indexable) failures.push(`${route.path}: wrong HTTP indexing policy`);
  if (!graph?.some(node => node['@type'] === 'SportsActivityLocation')) failures.push(`${route.path}: missing academy graph`);
  results.push({ route: route.path, status: response.status, title: doc.title, canonical, robots, header });
}));
const [robotsResponse, sitemapResponse, errorResponse, imageResponse, redirectResponse] = await Promise.all([
  get('/robots.txt'), get('/sitemap.xml'), get('/seo-audit-missing-page/'), get('/media/social.webp'),
  get('/about'),
]);
const robotsText = await robotsResponse.text();
const sitemap = new JSDOM(await sitemapResponse.text(), { contentType: 'text/xml' }).window.document;
const urls = [...sitemap.querySelectorAll('loc')].map(node => node.textContent);
if (robotsResponse.status !== 200 || !robotsText.includes('Allow: /')) failures.push('Robots unavailable or unexpectedly blocked');
if (sitemapResponse.status !== 200 || JSON.stringify(urls) !== JSON.stringify(routes.map(route => config.canonicalOrigin + route.path))) failures.push('Sitemap mismatch');
if (errorResponse.status !== 404) failures.push(`Unknown page must return 404, got ${errorResponse.status}`);
if (imageResponse.status !== 200 || !imageResponse.headers.get('content-type')?.startsWith('image/')) failures.push('Social image unavailable');
if (![301, 302, 307, 308].includes(redirectResponse.status) || new URL(redirectResponse.headers.get('location') || '/', config.assetOrigin).pathname !== '/about/') failures.push('Trailing-slash redirect mismatch');
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/seo-live-check.json', JSON.stringify({ checkedAt: new Date().toISOString(), origin: config.assetOrigin, mode: config.mode, results, statuses: { robots: robotsResponse.status, sitemap: sitemapResponse.status, missingPage: errorResponse.status, socialImage: imageResponse.status, slashRedirect: redirectResponse.status }, failures }, null, 2));
if (failures.length) throw new Error(failures.join('\n'));
console.log(`Live SEO verified on ${config.assetOrigin}: six pages, canonicals, metadata, schema, indexing headers, robots, sitemap, social image, slash redirect and HTTP 404.`);
