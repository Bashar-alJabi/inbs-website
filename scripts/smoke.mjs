/** Lightweight production HTTP checks; run against a running Next.js server. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

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
    await check(`/${locale}/services`, { pattern: /class="inbs-services-page"/, label: `${locale} dedicated Services landing page` });
    await check(`/${locale}/team`, { pattern: /class=\"inbs-team-page\"/, label: `${locale} dedicated Team page` });
    await check(`/${locale}/contact`, { pattern: /class="inbs-contact-page"/, label: `${locale} dedicated Contact page without a form` });
    await check(`/${locale}/careers`, { pattern: /class="inbs-careers-page"/, label: `${locale} dedicated Careers page with email applications` });
    await check(`/${locale}/insights`, { pattern: /class="inbs-insights-page"/, label: `${locale} Insights library` });
    for (const slug of ['starting-a-business-in-dubai','mainland-or-free-zone','understanding-uae-work-permits','family-residency-preparation','vat-registration-business-planning','renewing-a-dubai-trade-licence']) {
      await check(`/${locale}/insights/${slug}`, { pattern: /class="inbs-insights-page/, label: `${locale} Insights article ${slug}` });
    }
    await check(`/${locale}/insights/unknown-article`, { status:404, label: `${locale} unknown Insights article` });
    await check(`/${locale}/legal`, { label: `${locale} unified legal placeholder` });
    for (const oldPath of ['privacy-policy', 'terms']) {
      const old = await fetch(`${origin}/${locale}/${oldPath}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      assert.ok([301, 308].includes(old.status), `${locale}/${oldPath}: permanent redirect expected, got ${old.status}`);
      assert.equal(new URL(old.headers.get('location'), origin).pathname, `/${locale}/legal`);
      console.log('PASS', `${locale}/${oldPath} redirects to unified legal page`);
    }
    for (const slug of [
      'businessmen-services','real-estate-services','website-services',
      'typing-services','tourism-services','financial-services',
      'consultation-services','customs-services','cargo-services',
      'citizenship-and-immigration-services',
    ]) {
      await check(`/${locale}/services/${slug}`, {
        pattern: /class="inbs-service-detail"/,
        label: `${locale} ${slug} dedicated detail page`,
      });
    }
    await check(`/${locale}/services/unknown-service`, {
      status: 404, label: `${locale} unknown service`,
    });
    for (const route of ['contact', 'services/cargo-services']) {
      await check(`/${locale}/${route}`, { label: `${locale} ${route} page` });
    }
    await check(`/${locale}/invalid-unlisted-page`, { status: 404, label: `${locale} unknown route` });
  }

  for (const slug of ['starting-a-business-in-dubai','mainland-or-free-zone','understanding-uae-work-permits','family-residency-preparation','vat-registration-business-planning','renewing-a-dubai-trade-licence']) {
    const path = `../public/images/insights/${slug}.webp`;
    const bytes = await readFile(new URL(path, import.meta.url));
    assert.equal(bytes.toString('ascii',0,4),'RIFF',`${path}: missing RIFF header`);
    assert.equal(bytes.toString('ascii',8,12),'WEBP',`${path}: missing WebP signature`);
    await check(`/images/insights/${slug}.webp`, {contentType:/image\\/webp/i,label:`Insights local photo ${slug}`});
  }
  for (const image of ['hero-one.webp', 'hero-two.webp', 'hero-three.webp']) {
    await check(`/images/${image}`, { contentType: /image\/webp/i, label: `Hero ${image}` });
  }
  await check('/images/about/hero-about.webp', { contentType: /image\/webp/i, label: 'Dedicated About hero photo' });
  for (const filename of ['hero-01.webp','hero-02.webp','hero-03.webp',
    'story-04.webp','story-05.webp','story-06.webp','story-07.webp',
    'story-08.webp','story-09.webp','story-10.webp']) {
    await check(`/images/team/${filename}`, {
      contentType: /image\/webp/i,
      label: `Team photo ${filename}`,
    });
  }
  // Guard against using the same Pexels photograph in different service slots.
  const editorialSourceNotes = await readFile(
    new URL('../public/images/services/EDITORIAL-PHOTO-SOURCES.md', import.meta.url),'utf8',
  );
  const editorial = editorialSourceNotes.split(String.fromCharCode(10))
    .filter(line=>line.includes('[Pexels ') && line.includes('.webp'))
    .map(line=>({
      filename:line.split('`')[1],
      id:Number(line.split('[Pexels ')[1]?.split(']')[0]),
    }));
  assert.equal(editorial.length,20,'Expected 20 documented editorial images');
  const sourceIds = [...sourceEntries.map(entry=>entry.id),...editorial.map(entry=>entry.id)];
  assert.equal(new Set(sourceIds).size,30,'Pexels image source IDs must be unique across all service hero and editorial photos');
  const photoFiles = [
    ...sourceEntries.map(entry=>`../public/images/services/${entry.slug}.webp`),
    ...editorial.map(entry=>`../public/images/services/editorial/${entry.filename}`),
  ];
  const contentHashes=new Set();
  for(const filename of photoFiles){
    const bytes=await readFile(new URL(filename,import.meta.url));
    assert.equal(bytes.toString('ascii',0,4),'RIFF',`${filename}: invalid WebP header`);
    assert.equal(bytes.toString('ascii',8,12),'WEBP',`${filename}: not a WebP file`);
    const hash=createHash('sha256').update(bytes).digest('hex');
    assert.ok(!contentHashes.has(hash),`${filename}: duplicate image bytes`);
    contentHashes.add(hash);
  }
  console.log('PASS all 30 service photos use distinct sources and file contents');

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
