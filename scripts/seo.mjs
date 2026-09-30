export const productionOrigin = 'https://prxsjiujitsu.com';
export const previewOrigin = 'https://praxis.nikaveli.workers.dev';

export function seoEnvironment(env = process.env) {
  const mode = env.SITE_ENV || 'preview';
  if (!['preview', 'production'].includes(mode)) throw new Error('SITE_ENV must be preview or production');
  const origin = new URL(env.SITE_ORIGIN || previewOrigin);
  if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('SITE_ORIGIN must be an HTTPS origin without a path, query, credentials, or fragment');
  }
  if (mode === 'production' && origin.origin !== productionOrigin) {
    throw new Error(`Production builds require SITE_ORIGIN=${productionOrigin}`);
  }
  return { mode, canonicalOrigin: productionOrigin, assetOrigin: origin.origin, indexable: mode === 'production' };
}

export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const jsonForHtml = value => JSON.stringify(value).replaceAll('<', '\\u003c');

export function schemaFor(route, { business, coaches, programs }, config) {
  const origin = config.canonicalOrigin;
  const url = `${origin}${route.path}`;
  const academyId = `${origin}/#academy`;
  const pageType = route.path === '/about/' ? 'AboutPage' : route.path === '/contact/' ? 'ContactPage' : 'WebPage';
  const graph = [
    {
      '@type': 'SportsActivityLocation', '@id': academyId,
      name: business.name, url: `${origin}/`, description: 'Family-owned Jiu Jitsu academy for kids and adults in Bernalillo, New Mexico.',
      telephone: '+1-505-459-6188', email: business.email,
      image: `${config.assetOrigin}/media/social.webp`, logo: `${config.assetOrigin}/media/logo.webp`,
      address: { '@type': 'PostalAddress', streetAddress: business.street, addressLocality: 'Bernalillo', addressRegion: 'NM', postalCode: '87004', addressCountry: 'US' },
      hasMap: business.directions, sameAs: [business.instagram],
    },
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: business.name, inLanguage: 'en-US', publisher: { '@id': academyId } },
    { '@type': pageType, '@id': `${url}#webpage`, url, name: route.title, description: route.description, inLanguage: 'en-US', isPartOf: { '@id': `${origin}/#website` }, about: { '@id': academyId } },
  ];
  if (route.path === '/instructors/') {
    const people = coaches.map(coach => ({ '@type': 'Person', '@id': `${url}#${coach.image}`, name: coach.name, description: coach.bio, jobTitle: coach.role, worksFor: { '@id': academyId } }));
    graph[2].mainEntity = people.map(person => ({ '@id': person['@id'] }));
    graph.push(...people);
  }
  if (route.path === '/programs/') {
    const services = programs.map((program, index) => ({ '@type': 'Service', '@id': `${url}#service-${index + 1}`, name: program.name, description: program.text, provider: { '@id': academyId }, areaServed: { '@type': 'City', name: 'Bernalillo' } }));
    graph[2].mainEntity = services.map(service => ({ '@id': service['@id'] }));
    graph.push(...services);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function pageHead(route, data, config) {
  const url = `${config.canonicalOrigin}${route.path}`;
  const image = `${config.assetOrigin}/media/social.webp`;
  const imageAlt = 'Praxis Jiu Jitsu Academy students and coaches';
  const robots = route.noindex || !config.indexable ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${url}">`,
    ...Object.entries({ 'og:type': 'website', 'og:locale': 'en_US', 'og:site_name': data.business.name, 'og:title': route.title, 'og:description': route.description, 'og:url': url, 'og:image': image, 'og:image:type': 'image/webp', 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': imageAlt }).map(([property, content]) => `<meta property="${property}" content="${escapeHtml(content)}">`),
    ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': route.title, 'twitter:description': route.description, 'twitter:image': image, 'twitter:image:alt': imageAlt }).map(([name, content]) => `<meta name="${name}" content="${escapeHtml(content)}">`),
  ];
  if (!route.noindex) tags.push(`<script type="application/ld+json">${jsonForHtml(schemaFor(route, data, config))}</script>`);
  return tags.join('\n');
}

export function sitemapFor(routes, config) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.filter(route => !route.noindex).map(route => `  <url><loc>${escapeHtml(config.canonicalOrigin + route.path)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

export function robotsFor(config) {
  // Crawlers must be allowed to fetch pages to observe noindex directives.
  return `# ${config.indexable ? 'Production' : 'Preview: pages and responses are marked noindex'}\nUser-agent: *\nAllow: /\n${config.indexable ? `\nSitemap: ${config.canonicalOrigin}/sitemap.xml\n` : ''}`;
}

export function headersFor(base, config) {
  if (!config.indexable) {
    const common = base.trim() || '/*';
    return common.replace(/^\/\*/, '/*\n  X-Robots-Tag: noindex, nofollow') + '\n';
  }
  return `${base.trim()}\n\n/design-review/*\n  X-Robots-Tag: noindex, nofollow\n\n/404*\n  X-Robots-Tag: noindex, nofollow\n`;
}
