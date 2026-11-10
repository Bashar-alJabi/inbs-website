import assert from 'node:assert/strict';

/** Check early discovery without changing the original Hero rendering or interactions. */
export async function runHeroLcpTests({ browser, origin, test }) {
  for (const name of ['team', 'contact']) {
    const paths = name === 'team'
      ? ['hero-01.webp', 'hero-02.webp', 'hero-03.webp'].map(file => `/images/team/${file}`)
      : ['building', 'office', 'door'].map(key => `/images/contact/contact-${key}.webp`);
    const critical = paths[name === 'team' ? 1 : 0];
    for (const locale of ['en', 'ar']) for (const theme of ['light', 'dark']) {
      for (const width of [390, 1440]) for (const reducedMotion of ['reduce', 'no-preference']) {
        await test(`hero LCP / ${name}/${locale}/${theme}/${width}/${reducedMotion}`, async () => {
          const context = await browser.newContext({
            viewport: { width, height: 844 }, colorScheme: theme, reducedMotion,
            isMobile: width === 390, hasTouch: width === 390,
          });
          try {
            await context.addInitScript(value => localStorage.setItem('inbs-theme', value), theme);
            const page = await context.newPage(), errors = [], requests = [];
            page.on('pageerror', error => errors.push(String(error)));
            page.on('console', message => {
              if (message.type() === 'error' || /hydrat|preloaded.*not used/i.test(message.text())) errors.push(message.text());
            });
            const cdp = await context.newCDPSession(page);
            await cdp.send('Network.enable');
            await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
            cdp.on('Network.requestWillBeSent', event => {
              const path = new URL(event.request.url).pathname;
              if (paths.includes(path)) requests.push({ path, priority: event.request.initialPriority });
            });
            const response = await page.goto(`${origin}/${locale}/${name}`, { waitUntil: 'load' });
            assert.equal(response.status(), 200);
            const hints = await page.evaluate(({ html, paths }) => {
              const document = new DOMParser().parseFromString(html, 'text/html');
              return [...document.querySelectorAll('link[rel="preload"][as="image"]')]
                .filter(link => paths.includes(link.getAttribute('href')))
                .map(link => ({ path: link.getAttribute('href'), priority: link.getAttribute('fetchpriority') }));
            }, { html: await response.text(), paths });
            // Next may emit React's server hint in the HTTP Link header instead of HTML.
            for (const entry of (response.headers().link || '').split(/,(?=\s*<)/)) {
              const match = entry.match(/^\s*<([^>]+)>(.*)$/);
              if (match && paths.includes(match[1]) && /;\s*rel="?preload"?(?:;|$)/i.test(match[2]) &&
                /;\s*as="?image"?(?:;|$)/i.test(match[2])) {
                hints.push({ path: match[1], priority: /;\s*fetchpriority="?high"?(?:;|$)/i.test(match[2]) ? 'high' : null });
              }
            }
            assert.deepEqual([...new Map(hints.map(hint => [hint.path, hint])).values()],
              [{ path: critical, priority: 'high' }], 'Only the measured LCP image is hinted in the initial response');
            await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme);
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.locator('html').getAttribute('lang'), locale);
            assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
            const frames = page.locator(name === 'team' ? '.inbs-team-photo' : '.inbs-contact-photo-image');
            assert.equal(await frames.count(), 3);
            const backgrounds = await frames.evaluateAll(nodes => nodes.map(node => {
              const style = getComputedStyle(node);
              return { image: style.backgroundImage, size: style.backgroundSize, position: style.backgroundPosition };
            }));
            backgrounds.forEach((style, index) => {
              assert.ok(style.image.includes(paths[index]), 'Preserve each original CSS image');
              assert.equal(style.size, 'cover');
              assert.equal(style.position, '50% 50%');
            });
            await page.evaluate(paths => Promise.all(paths.map(src => new Promise((resolve, reject) => {
              const image = new Image(); image.src = src; image.decode().then(resolve, reject);
            }))), paths);
            assert.equal(requests.filter(request => request.path === critical).length, 1,
              'Preload and CSS must share one original resource request');
            assert.equal(requests.find(request => request.path === critical)?.priority, 'High');
            if (name === 'contact') {
              assert.ok(await page.locator('.inbs-contact-hero-building').evaluate((node, path) =>
                getComputedStyle(node).backgroundImage.includes(path), critical));
              const dots = await page.locator('.inbs-contact-photo-traveler').evaluateAll(nodes =>
                nodes.map(node => getComputedStyle(node).animationName));
              assert.deepEqual(dots, Array(3).fill(reducedMotion === 'reduce' ? 'none' : 'inbs-contact-photo-border'));
              const tiles = page.locator('.inbs-contact-hero-photo');
              const overflow = await page.evaluate(() => document.body.style.overflow);
              for (let index = 0; index < 3; index++) {
                const tile = tiles.nth(index), label = await tile.getAttribute('aria-label');
                if (width === 390) await tile.tap();
                else { await tile.hover(); await tile.focus(); await page.keyboard.press('Enter'); }
                const dialog = page.getByRole('dialog', { name: label, exact: true });
                await dialog.waitFor({ state: 'visible' });
                const image = dialog.locator('img');
                assert.ok((await image.getAttribute('src')).includes(paths[index].split('/').pop()));
                assert.equal(await image.getAttribute('alt'), label);
                await image.evaluate(image => image.decode());
                assert.equal(await image.evaluate(image => getComputedStyle(image).objectFit), 'contain');
                await page.keyboard.press('Tab');
                assert.equal(await dialog.locator('button').evaluate(node => node === document.activeElement), true);
                if (index === 0) await page.keyboard.press('Escape');
                else if (index === 1) await dialog.locator('button').click();
                else await page.locator('.inbs-contact-photo-lightbox').click({ position: { x: 5, y: 5 } });
                await dialog.waitFor({ state: 'detached' });
                // Keyboard/button dismissal restores focus; backdrop pointer dismissal can focus body.
                if (index < 2) await page.waitForFunction(node => node === document.activeElement, await tile.elementHandle());
                assert.equal(await page.evaluate(() => document.body.style.overflow), overflow);
              }
            } else {
              assert.equal(await page.locator('.inbs-team-gallery-traveler').count(), 2);
              assert.equal(await page.locator('.inbs-team-gallery-traveler').first().evaluate(node =>
                getComputedStyle(node).display === 'none'), reducedMotion === 'reduce');
              assert.deepEqual(await page.locator('.inbs-team-gallery-traveler animateMotion').evaluateAll(nodes =>
                nodes.map(node => node.getAttribute('dur'))), ['17s', '21s']);
            }
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow');
            assert.deepEqual(errors, [], 'No Console, hydration or unused-preload errors');
          } finally {
            await context.close();
          }
        });
      }
    }
  }
}
