import assert from 'node:assert/strict';

/** Focused native lazy-loading and image-layout regressions for Team. */
export async function runTeamImageTests({ browser, origin, test }) {
  for (const locale of ['en', 'ar']) {
    for (const width of [320, 390, 768, 1440]) {
      for (const theme of ['light', 'dark']) {
        const preferences = width === 390 || width === 1440 ? ['reduce', 'no-preference'] : ['reduce'];
        for (const reducedMotion of preferences) {
          await test(`team images / ${locale}/${width}/${theme}/${reducedMotion}`, async () => {
            const context = await browser.newContext({
              viewport: { width, height: 844 }, colorScheme: theme, reducedMotion,
            });
            let releaseImages;
            const imagesReady = new Promise(resolve => { releaseImages = resolve; });
            try {
              await context.addInitScript(value => localStorage.setItem('inbs-theme', value), theme);
              const page = await context.newPage();
              const errors = [], requested = new Set();
              page.on('pageerror', error => errors.push(String(error)));
              page.on('console', message => {
                if (message.type() === 'error' || /hydrat/i.test(message.text())) errors.push(message.text());
              });
              page.on('request', request => {
                const path = new URL(request.url()).pathname;
                if (/\/images\/team\/story-\d{2}\.webp$/.test(path)) requested.add(path);
              });
              // Hold the images to measure the reserved layout before and after decoding.
              await page.route(/\/images\/team\/story-\d{2}\.webp(?:\?.*)?$/, async route => {
                await imagesReady;
                await route.continue();
              });
              assert.equal((await page.goto(`${origin}/${locale}/team`, { waitUntil: 'load' })).status(), 200);
              await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme);
              await page.evaluate(() => document.fonts.ready);
              await page.waitForTimeout(150);
              assert.equal(await page.locator('html').getAttribute('lang'), locale);
              assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
              assert.equal(requested.has('/images/team/story-09.webp'), false, 'Finale images must wait for scrolling');
              assert.equal(requested.has('/images/team/story-10.webp'), false, 'Finale images must wait for scrolling');

              const photos = page.locator('.inbs-team-story-photo');
              const images = photos.locator('img');
              assert.equal(await photos.count(), 7);
              assert.equal(await images.count(), 7);
              const sources = Array.from({ length: 7 }, (_, index) => `/images/team/story-${String(index + 4).padStart(2, '0')}.webp`);
              assert.deepEqual(await images.evaluateAll(nodes => nodes.map(image => image.getAttribute('src'))), sources);
              assert.equal(await images.evaluateAll(nodes => nodes.every(image =>
                image.loading === 'lazy' && image.decoding === 'async' && image.alt === '' &&
                !image.hasAttribute('srcset') && image.closest('[aria-hidden="true"]'))), true,
              'Keep the original files, native lazy loading and decorative image semantics');
              assert.equal(await photos.evaluateAll(nodes => nodes.every(node => getComputedStyle(node).backgroundImage === 'none')), true,
                'A CSS background must not bypass lazy loading');

              const orbit = page.locator('.inbs-team-story-orbit');
              assert.equal(await orbit.evaluate(node => getComputedStyle(node).animationName), reducedMotion === 'reduce' ? 'none' : 'team-orbit');
              for (let index = 0; index < 7; index++) {
                await photos.nth(index).evaluate(node => window.scrollTo({ top: scrollY + node.getBoundingClientRect().top - 100, behavior: 'instant' }));
                await page.waitForTimeout(60);
              }
              await page.waitForTimeout(reducedMotion === 'reduce' ? 100 : 1100);
              await page.evaluate(() => document.fonts.ready);
              assert.deepEqual([...requested].sort(), sources, 'Each image is requested when its frame is approached');
              // Isolate image loading from the approved continuously moving ornaments.
              await page.evaluate(() => {
                for (const animation of document.getAnimations()) animation.pause();
                for (const svg of document.querySelectorAll('svg')) svg.pauseAnimations?.();
              });
              const geometry = () => page.locator('main, main section, .inbs-team-story-photo, .inbs-team-story h2, .inbs-team-story h3, .inbs-team-story h4, .inbs-team-story p')
                .evaluateAll(nodes => nodes.map(node => {
                  const rect = node.getBoundingClientRect();
                  return { x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height };
                }));
              const before = await geometry();
              await page.evaluate(() => {
                window.__teamImageShifts = [];
                new PerformanceObserver(list => {
                  window.__teamImageShifts.push(...list.getEntries().map(entry => entry.value));
                }).observe({ type: 'layout-shift' });
              });
              releaseImages();
              await images.evaluateAll(nodes => Promise.all(nodes.map(image => image.decode())));
              await page.waitForTimeout(150);
              assert.deepEqual(await geometry(), before, 'Image decoding must not move frames, text or sections');
              assert.equal(await page.evaluate(() => window.__teamImageShifts.reduce((sum, value) => sum + value, 0)), 0,
                'Delayed image loading must not introduce Layout Shift');
              assert.equal(await images.evaluateAll(nodes => nodes.every(image => {
                const style = getComputedStyle(image);
                return image.complete && image.naturalWidth > 0 && style.objectFit === 'cover' &&
                  style.objectPosition === '50% 50%' && image.offsetWidth === image.parentElement.clientWidth &&
                  image.offsetHeight === image.parentElement.clientHeight;
              })), true, 'Every original image must decode and cover its existing frame');
              assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow');
              assert.deepEqual(errors, [], 'No Console, JavaScript or hydration errors');
            } finally {
              releaseImages();
              await context.close();
            }
          });
        }
      }
    }
  }
}
