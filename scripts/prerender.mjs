import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, routes, business, coaches, programs } from '../.ssr/entry-server.js';
import { seoEnvironment, pageHead, sitemapFor, robotsFor, headersFor, schemaFor, productionOrigin } from './seo.mjs';

const template = await readFile('dist/index.html', 'utf8');
const config = seoEnvironment();
const data = { business, coaches, programs };
const extra = [
  { path: '/design-review/', title: 'Hero Treatments | Praxis Design Review', description: 'Compare three homepage hero treatments.', noindex: true },
  { path: '/404/', title: 'Page Not Found | Praxis Jiu Jitsu', description: 'Find your way back to Praxis Jiu Jitsu.', noindex: true },
];
for (const route of [...routes, ...extra]) {
  const html = template.replace('<!--page-head-->', pageHead(route, data, config)).replace('<!--app-html-->', render(route.path));
  const directory = `dist${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
  if (route.path === '/404/') await writeFile('dist/404.html', html);
}
await writeFile('dist/sitemap.xml', sitemapFor(routes, config));
await writeFile('dist/robots.txt', robotsFor(config));
await writeFile('dist/_headers', headersFor(await readFile('public/_headers', 'utf8'), config));

// Reviewable production exports; the functions above remain the source of truth.
await mkdir('seo/structured-data', { recursive: true });
const production = seoEnvironment({ SITE_ENV: 'production', SITE_ORIGIN: productionOrigin });
await mkdir('seo/production', { recursive: true });
await writeFile('seo/production/robots.txt', robotsFor(production));
await writeFile('seo/production/sitemap.xml', sitemapFor(routes, production));
await writeFile('seo/production/_headers', headersFor(await readFile('public/_headers', 'utf8'), production));
const csv = value => `"${String(value).replaceAll('"', '""')}"`;
await writeFile('seo/metadata.csv', [
  ['route', 'canonical', 'title', 'title_characters', 'description', 'description_characters'].map(csv).join(','),
  ...routes.map(route => [route.path, `${productionOrigin}${route.path}`, route.title, route.title.length, route.description, route.description.length].map(csv).join(',')),
].join('\n') + '\n');
for (const route of routes) {
  const name = route.path === '/' ? 'home' : route.path.split('/')[1];
  await writeFile(`seo/structured-data/${name}.json`, JSON.stringify(schemaFor(route, data, production), null, 2) + '\n');
}
console.log(`Prerendered six content pages, design review and 404 (${config.mode}; indexing ${config.indexable ? 'enabled' : 'disabled'}).`);
