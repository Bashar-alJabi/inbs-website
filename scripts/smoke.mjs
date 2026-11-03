/** Lightweight production HTTP checks; run against a running Next.js server. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = (process.env.SMOKE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const sourceEntries = JSON.parse(
  await readFile(new URL('../public/images/services/SOURCES.json', import.meta.url), 'utf8'),
);

async function check(path, { status = 200, pattern, contentType, label = path } = {}) {
  const response = await fetch(origin + path, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, status, `${label}: HTTP ${response.status}`);
  if (contentType) {
    assert.match(response.headers.get('content-type') || '', contentType, `${label}: Content-Type`);
  }
  if (pattern) {
    assert.match(await response.text(), pattern, `${label}: expected content missing`);
  } else {
    await response.arrayBuffer();
  }
  console.log('PASS', label);
}

try {
  await check('/en', { pattern: /<html[^>]*lang="en"/, label: 'English homepage and lang' });
  await check('/ar', { pattern: /<html[^>]*lang="ar"[^>]*dir="rtl"/, label: 'Arabic homepage and RTL' });

  for (const locale of ['en', 'ar']) {
    await check(`/${locale}/about`, { pattern: /class="inbs-about-page"/, label: `${locale} published About page` });
    for (const route of ['services', 'contact', 'services/cargo-services']) {
      await check(`/${locale}/${route}`, { label: `${locale} ${route} page` });
    }
    await check(`/${locale}/invalid-unlisted-page`, { status: 404, label: `${locale} unknown route` });
  }

  for (const image of ['hero-one.webp', 'hero-two.webp', 'hero-three.webp']) {
    await check(`/images/${image}`, { contentType: /image\/webp/i, label: `Hero ${image}` });
  }
  assert.equal(sourceEntries.length, 10, 'Expected ten documented service images');
  for (const { slug } of sourceEntries) {
    await check(`/images/services/${slug}.webp`, {
      contentType: /image\/webp/i,
      label: `Service image ${slug}`,
    });
  }

  await check('/brand/inbs-logo.png', { contentType: /image\/png/i, label: 'Official brand logo' });
  await check('/robots.txt', { pattern: /User-agent:/i, label: 'Robots policy' });
  await check('/sitemap.xml', { contentType: /(?:xml|text\/plain)/i, label: 'Sitemap' });
  console.log('Smoke checks passed:', origin);
} catch (error) {
  console.error('Smoke checks failed:', error);
  process.exitCode = 1;
}
