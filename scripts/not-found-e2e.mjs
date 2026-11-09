import assert from 'node:assert/strict';

async function watchNotFoundPaints(context) {
  await context.addInitScript(() => {
    window.__notFoundPaints = { sampled: 0, unstyled: [] };
    const sample = () => {
      const node = document.querySelector('.inbs-not-found');
      if (node) {
        const style = getComputedStyle(node);
        const bounds = node.getBoundingClientRect();
        if (style.visibility !== 'hidden' && bounds.width > 0 && bounds.height > 0) {
          window.__notFoundPaints.sampled++;
          if ((style.position !== 'fixed' || style.backgroundImage === 'none') &&
            window.__notFoundPaints.unstyled.length < 5) {
            window.__notFoundPaints.unstyled.push({ position: style.position, background: style.backgroundImage });
          }
        }
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
}

async function assertDocument(page, locale) {
  await page.waitForFunction(value => document.documentElement.lang === value &&
    document.documentElement.dir === (value === 'ar' ? 'rtl' : 'ltr'), locale);
  assert.deepEqual(await page.evaluate(() => ({
    html: document.querySelectorAll('html').length,
    body: document.querySelectorAll('body').length,
    nested: document.querySelectorAll('body html, body body, html html').length,
    bodyAtRoot: document.body.parentElement === document.documentElement,
  })), { html: 1, body: 1, nested: 0, bodyAtRoot: true });
}

async function assertNotFound(page, locale) {
  const notFound = page.locator('.inbs-not-found');
  await notFound.waitFor({ state: 'visible' });
  await assertDocument(page, locale);
  // The overflow effect runs after the error component hydrates.
  await page.waitForFunction(() => document.body.style.overflow === 'hidden');
  // Hydration/load do not guarantee that React's stylesheet links are active yet.
  await page.waitForFunction(() => {
    const active = [...document.styleSheets];
    return active.length > 0 && [...document.querySelectorAll('link[rel="stylesheet"]')]
      .every(link => link.sheet && active.includes(link.sheet));
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.__notFoundPaints.sampled > 0);
  assert.deepEqual(await page.evaluate(() => window.__notFoundPaints.unstyled), [],
    '404 must not paint browser-default styling before its CSS is ready');
  assert.equal(await notFound.getAttribute('lang'), locale);
  assert.equal(await notFound.getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
  assert.equal(await notFound.locator('h1').innerText(), locale === 'ar'
    ? 'يبدو أن هذه الصفحة غير موجودة.' : 'Looks like this page is missing.');
  assert.equal(await page.locator('main').count(), 1);
  assert.equal(await page.locator('.inbs-header, .inbs-footer').count(), 0,
    'Keep the standalone 404 without hidden site navigation behind it');
  assert.equal(await notFound.locator('.inbs-not-found-orbit').count(), 3);
  assert.equal(await notFound.locator('.inbs-not-found-primary').getAttribute('href'), `/${locale}`);
  assert.equal(await notFound.locator('.inbs-not-found-secondary').getAttribute('href'), `/${locale}/services`);
  const bounds = await notFound.boundingBox();
  const viewport = page.viewportSize();
  assert.ok(bounds && Math.abs(bounds.x) < 1 && Math.abs(bounds.y) < 1 &&
    Math.abs(bounds.width - viewport.width) < 1 && Math.abs(bounds.height - viewport.height) < 1);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
}

async function returnHome(page, origin, locale) {
  await page.locator('.inbs-not-found-primary').click();
  await page.waitForURL(`${origin}/${locale}`);
  await page.locator('.inbs-hero').waitFor({ state: 'visible' });
  await assertDocument(page, locale);
  assert.equal(await page.locator('.inbs-not-found').count(), 0);
  assert.notEqual(await page.locator('body').evaluate(node => node.style.overflow), 'hidden');
}

function watchErrors(page, origin, missingPaths) {
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => {
    // The browser reports the intentional HTTP 404 as a network Console message.
    const url = new URL(message.location().url || '/', origin);
    const expected404 = /Failed to load resource:.*status of 404/.test(message.text()) &&
      url.origin === origin && missingPaths.includes(url.pathname);
    if (!expected404 && (message.type() === 'error' || /hydrat|validateDOMNesting|cannot be a (child|descendant)/i.test(message.text()))) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function navigateInternally(page, path) {
  await page.waitForFunction(() => typeof window.next?.router?.push === 'function');
  // Next 16 exposes this App Router instance for debugging. Use it only in tests:
  // production content deliberately contains no links to nonexistent pages.
  await page.evaluate(target => {
    window.__notFoundDocument = true;
    window.__notFoundPaints = { sampled: 0, unstyled: [] };
    window.next.router.push(target);
  }, path);
  await page.waitForURL(url => url.pathname === path);
  assert.equal(await page.evaluate(() => window.__notFoundDocument), true,
    'Exercise App Router navigation without a full document reload');
}

/** A05: document language, standalone markup and genuine 404s after hydration. */
export async function runNotFoundTests({ browser, origin, test }) {
  for (const locale of ['en', 'ar']) {
    for (const width of [390, 1440]) {
      for (const theme of ['light', 'dark']) {
        await test(`404 document / ${locale}/${width}/${theme}`, async () => {
          const context = await browser.newContext({
            viewport: { width, height: 844 }, reducedMotion: 'reduce', colorScheme: theme,
          });
          try {
            await watchNotFoundPaints(context);
            await context.addInitScript(value => localStorage.setItem('inbs-theme', value), theme);
            const page = await context.newPage();
            const paths = ['/missing-route', '/services/unknown-service', '/insights/unknown-article'].map(suffix => `/${locale}${suffix}`);
            const errors = watchErrors(page, origin, paths);
            for (const path of paths) {
              const response = await page.goto(`${origin}${path}`, { waitUntil: 'load' });
              assert.equal(response.status(), 404, `${path} must be a real HTTP 404`);
              const html = await response.text();
              assert.equal((html.match(/<html\b/g) || []).length, 1);
              assert.equal((html.match(/<body\b/g) || []).length, 1);
              await assertNotFound(page, locale);
              await returnHome(page, origin, locale);
              await navigateInternally(page, path);
              await assertNotFound(page, locale);
              await returnHome(page, origin, locale);
            }
            assert.deepEqual(errors, [], 'No JavaScript, hydration or document nesting errors');
          } finally {
            await context.close();
          }
        });
      }
    }
  }

  await test('404 document / unsupported and unprefixed locale fallback', async () => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    try {
      await watchNotFoundPaints(context);
      const page = await context.newPage();
      const paths = ['/fr/missing-route', '/missing-route', '/fr'];
      const errors = watchErrors(page, origin, paths);
      for (const path of paths) {
        const response = await page.goto(`${origin}${path}`, { waitUntil: 'load' });
        assert.equal(response.status(), 404);
        await assertNotFound(page, 'en');
        await returnHome(page, origin, 'en');
        await navigateInternally(page, path);
        await assertNotFound(page, 'en');
        await returnHome(page, origin, 'en');
      }
      assert.deepEqual(errors, []);
    } finally {
      await context.close();
    }
  });
}
