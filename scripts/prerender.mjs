import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, routes } from '../.ssr/entry-server.js';
const template = await readFile('dist/index.html', 'utf8');
const origin = 'https://prxsjiujitsu.com';
const publicOrigin = process.env.SITE_ORIGIN || 'https://praxis.nikaveli.workers.dev';
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const extra = [
  {path:'/design-review/', title:'Hero Treatments | Praxis Design Review',description:'Compare three homepage hero treatments.',noindex:true},
  {path:'/404/', title:'Page Not Found | Praxis Jiu Jitsu',description:'Find your way back to Praxis Jiu Jitsu.',noindex:true},
];
for (const route of [...routes, ...extra]) {
  const schema = { '@context':'https://schema.org', '@type':'SportsActivityLocation', name:'Praxis Jiu Jitsu Academy', url:origin, telephone:'+1-505-459-6188', email:'info@prxsjiujitsu.com', image:`${publicOrigin}/media/social.webp`, logo:`${publicOrigin}/media/logo.webp`, address:{'@type':'PostalAddress',streetAddress:'965 US Highway 550, Suite E',addressLocality:'Bernalillo',addressRegion:'NM',postalCode:'87004',addressCountry:'US'}, sameAs:['https://www.instagram.com/praxisjjacademy/'] };
  const head = `<title>${escape(route.title)}</title>\n<meta name="description" content="${escape(route.description)}">\n<link rel="canonical" href="${origin}${route.path}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Praxis Jiu Jitsu Academy">\n<meta property="og:title" content="${escape(route.title)}">\n<meta property="og:description" content="${escape(route.description)}">\n<meta property="og:url" content="${origin}${route.path}">\n<meta property="og:image" content="${publicOrigin}/media/social.webp">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta name="twitter:card" content="summary_large_image">\n${route.noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}\n<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  const html = template.replace('<!--page-head-->',head).replace('<!--app-html-->',render(route.path));
  const directory = `dist${route.path === '/' ? '' : route.path.replace(/\/$/,'')}`;
  await mkdir(directory,{recursive:true});
  await writeFile(`${directory}/index.html`,html);
  if(route.path === '/404/') await writeFile('dist/404.html',html);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r.path}</loc></url>`).join('')}</urlset>`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /design-review/\nSitemap: ${origin}/sitemap.xml\n`);
console.log('Prerendered six content pages, design review and 404.');
