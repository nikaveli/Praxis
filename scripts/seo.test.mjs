// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { business, coaches, programs, routes } from '../src/data/content';
import { seoEnvironment, pageHead, schemaFor, robotsFor, headersFor, sitemapFor, productionOrigin } from './seo.mjs';

const data = { business, coaches, programs };
const preview = seoEnvironment({});
const production = seoEnvironment({ SITE_ENV: 'production', SITE_ORIGIN: productionOrigin });

describe('SEO publishing policy', () => {
  it('defaults to a crawlable but non-indexable preview', () => {
    expect(pageHead(routes[0], data, preview)).toContain('content="noindex, nofollow"');
    expect(headersFor('', preview)).toContain('/*\n  X-Robots-Tag: noindex, nofollow');
    expect(robotsFor(preview)).not.toContain('Disallow: /');
  });
  it('requires explicit production mode and the confirmed live origin', () => {
    expect(() => seoEnvironment({ SITE_ENV: 'production' })).toThrow();
    expect(() => seoEnvironment({ SITE_ENV: 'prod' })).toThrow();
    expect(() => seoEnvironment({ SITE_ORIGIN: 'https://example.com/path' })).toThrow();
    expect(pageHead(routes[0], data, production)).toContain('index, follow, max-image-preview:large');
    expect(headersFor('', production)).not.toContain('\n/*\n  X-Robots-Tag');
    expect(robotsFor(production)).toContain(`Sitemap: ${productionOrigin}/sitemap.xml`);
  });
  it('keeps private/error pages noindex and excludes them from the sitemap', () => {
    const review = { path: '/design-review/', title: 'Review', description: 'Private design review', noindex: true };
    expect(pageHead(review, data, production)).toContain('noindex, nofollow');
    expect(pageHead(review, data, production)).not.toContain('application/ld+json');
    expect(sitemapFor([...routes, review], production)).not.toContain('design-review');
  });
  it('uses only live-origin URLs in production schema and links visible people and programs', () => {
    const instructor = schemaFor(routes[3], data, production);
    expect(instructor['@graph'].filter(node => node['@type'] === 'Person').map(node => node.name)).toEqual(coaches.map(coach => coach.name));
    const services = schemaFor(routes[2], data, production)['@graph'].filter(node => node['@type'] === 'Service');
    expect(services.map(node => node.description)).toEqual(programs.map(program => program.text));
    const json = JSON.stringify(instructor);
    for (const unsupported of ['workers.dev', 'aggregateRating', 'openingHours', 'priceRange']) expect(json).not.toContain(unsupported);
  });
  it('escapes metadata and embedded JSON safely', () => {
    const unsafe = { ...routes[0], title: 'A "quote" <script>', description: '</script><script>alert(1)</script>' };
    const head = pageHead(unsafe, data, production);
    expect(head).toContain('&quot;quote&quot; &lt;script&gt;');
    expect(head).not.toContain('</script><script>alert');
    expect(head).toContain('\\u003c/script>');
  });
});
