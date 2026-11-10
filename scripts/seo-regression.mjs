import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

/** Execute real metadata/content modules with an isolated environment, never enabling a server's indexing. */
function metadataLoader(indexable, siteUrl = 'https://seo-regression.invalid') {
  const cache = new Map();
  function load(path) {
    const filename = resolve(root, path);
    if (cache.has(filename)) return cache.get(filename).exports;
    const record = { exports: {} };
    cache.set(filename, record);
    const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
      fileName: filename,
    }).outputText;
    const requireMetadata = specifier => {
      // Rendering is checked by Next's production build; these tests only call metadata exports.
      if (specifier.startsWith('@/components/') || specifier.endsWith('.css') || specifier === 'react/jsx-runtime') return {};
      if (specifier === 'next/navigation') return { notFound: () => { throw new Error('notFound'); } };
      if (specifier.startsWith('.')) return load(resolve(dirname(filename), `${specifier}.ts`));
      assert.ok(specifier.startsWith('@/'), `Unexpected metadata dependency: ${specifier}`);
      return load(`src/${specifier.slice(2)}.ts`);
    };
    const execute = new Function('require', 'module', 'exports', 'process', compiled);
    execute(requireMetadata, record, record.exports, { env: { SITE_URL: siteUrl, SITE_INDEXABLE: indexable } });
    return record.exports;
  }
  return load;
}

async function metadataEntries(load) {
  const { serviceSlugs } = load('src/content/services.ts');
  const { insightArticles } = load('src/content/insights.ts');
  const entries = [];
  for (const locale of ['en', 'ar']) {
    const routes = [
      ...['', 'about', 'services', 'team', 'contact', 'careers', 'insights', 'legal'].map(slug => ({ suffix: slug, file: slug ? `${slug}/page.tsx` : 'page.tsx' })),
      ...serviceSlugs.map(slug => ({ suffix: `services/${slug}`, file: 'services/[slug]/page.tsx', slug })),
      ...insightArticles.map(({ slug }) => ({ suffix: `insights/${slug}`, file: 'insights/[slug]/page.tsx', slug })),
    ];
    for (const route of routes) {
      const metadata = await load(`src/app/[locale]/${route.file}`).generateMetadata({ params: Promise.resolve({ locale, slug: route.slug }) });
      entries.push({ path: `/${locale}${route.suffix ? `/${route.suffix}` : ''}`, suffix: route.suffix, metadata });
    }
  }
  return entries;
}

function finalTitle(metadata, rootMetadata) {
  return metadata.title.absolute ?? rootMetadata.title.template.replace('%s', metadata.title);
}

function decode(value = '') {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (_, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()];
    return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10));
  });
}

function renderedMetadata(html) {
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(([tag]) => Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), decode(value)]),
  ));
  const meta = key => tags.find(tag => tag.name === key || tag.property === key)?.content;
  return {
    titles: [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map(match => decode(match[1])),
    canonical: tags.find(tag => tag.rel === 'canonical')?.href,
    languages: Object.fromEntries(tags.filter(tag => tag.rel === 'alternate' && tag.hreflang).map(tag => [tag.hreflang, tag.href])),
    description: meta('description'), robots: meta('robots'),
    openGraph: Object.fromEntries(['title', 'description', 'url', 'site_name', 'type', 'locale'].map(key => [key, meta(`og:${key}`)])),
  };
}

/** A06, A09 and service-indexing checks; callable without the full browser suite. */
export async function runSeoRegressionTests({ origin, test }) {
  await test('Insights replacement source URLs', async () => {
    const load = metadataLoader();
    const { insightArticles } = load('src/content/insights.ts');
    const sources = {
      'understanding-uae-work-permits': 'https://assets.u.ae/api/public/content/eb65a60bbff949fa912eddd566613014?v=7174ed78#page=7',
      'family-residency-preparation': 'https://www.gdrfad.gov.ae/en/services/bf409606-56e2-11ea-0320-0050569629e8',
    };
    for (const [slug, url] of Object.entries(sources)) assert.equal(insightArticles.find(article => article.slug === slug).sourceUrl, url);
  });
  for (const flag of [undefined, 'false', 'true']) {
    await test(`SEO isolated policy / SITE_INDEXABLE=${flag ?? 'unset'}`, async () => {
      const load = metadataLoader(flag);
      const rootMetadata = load('src/app/layout.tsx').metadata;
      const entries = await metadataEntries(load);
      assert.equal(entries.length, 48);
      for (const { path, suffix, metadata } of entries) {
        assert.equal((finalTitle(metadata, rootMetadata).match(/\bINBS\b/g) || []).length, 1, path);
        assert.equal(metadata.robots.index, suffix === 'legal' ? false : flag === 'true', path);
        assert.equal(metadata.robots.follow, suffix === 'legal' || flag === 'true', path);
        assert.equal(metadata.alternates.canonical, `https://seo-regression.invalid${path}`);
        assert.deepEqual(metadata.alternates.languages, {
          en: `https://seo-regression.invalid/en${suffix ? `/${suffix}` : ''}`,
          ar: `https://seo-regression.invalid/ar${suffix ? `/${suffix}` : ''}`,
          'x-default': `https://seo-regression.invalid/en${suffix ? `/${suffix}` : ''}`,
        });
      }
      const sitemap = load('src/app/sitemap.ts').default();
      if (flag !== 'true') assert.deepEqual(sitemap, []);
      else {
        const expected = entries.filter(entry => entry.suffix !== 'legal');
        assert.equal(sitemap.length, 46);
        assert.equal(sitemap.filter(entry => /\/services\//.test(entry.url)).length, 20);
        assert.deepEqual(sitemap.map(entry => entry.url).sort(), expected.map(entry => entry.metadata.alternates.canonical).sort());
        for (const entry of sitemap) {
          assert.deepEqual(entry.alternates.languages, expected.find(item => item.metadata.alternates.canonical === entry.url).metadata.alternates.languages);
        }
      }
    });
  }

  if (!origin) return;
  let siteUrl;
  await test('SEO HTTP / indexing remains disabled', async () => {
    const response = await fetch(`${origin}/en`);
    assert.equal(response.status, 200);
    const rendered = renderedMetadata(await response.text());
    assert.match(rendered.robots, /noindex/);
    siteUrl = new URL(rendered.canonical).origin;
    const robots = await fetch(`${origin}/robots.txt`);
    assert.equal(robots.status, 200);
    assert.match(await robots.text(), /Disallow: \/\s*(?:\r?\n|$)/);
    const sitemap = await fetch(`${origin}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    assert.doesNotMatch(await sitemap.text(), /<url>/);
  });
  assert.ok(siteUrl, 'Resolve the server canonical origin before checking pages');
  const load = metadataLoader('false', siteUrl);
  const entries = await metadataEntries(load);
  const rootMetadata = load('src/app/layout.tsx').metadata;
  const { insightArticles } = load('src/content/insights.ts');
  for (const { path, metadata, suffix } of entries) {
    await test(`SEO HTTP / ${path}`, async () => {
      const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 200);
      const html = await response.text();
      const rendered = renderedMetadata(html);
      assert.deepEqual(rendered.titles, [finalTitle(metadata, rootMetadata)]);
      assert.equal((rendered.titles[0].match(/\bINBS\b/g) || []).length, 1);
      assert.equal(rendered.canonical, metadata.alternates.canonical);
      assert.deepEqual(rendered.languages, metadata.alternates.languages);
      assert.equal(rendered.description, metadata.description);
      const og = metadata.openGraph;
      assert.deepEqual(rendered.openGraph, { title: og.title, description: og.description, url: og.url, site_name: og.siteName, type: og.type, locale: og.locale });
      assert.match(rendered.robots, /noindex/);
      assert.match(rendered.robots, suffix === 'legal' ? /\bfollow\b/ : /nofollow/);
      if (suffix.startsWith('insights/')) {
        const article = insightArticles.find(article => `insights/${article.slug}` === suffix);
        const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(match => decode(match[1]));
        assert.ok(hrefs.includes(article.sourceUrl), 'Render the canonical article source link');
      }
    });
  }
}
