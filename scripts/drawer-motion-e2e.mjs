import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

async function unlocked(page) {
  await page.waitForFunction(() => !document.documentElement.hasAttribute('data-inbs-drawer-open') &&
    !document.documentElement.classList.contains('lenis-stopped'));
  assert.equal(await page.locator('.inbs-menu-trigger').getAttribute('aria-expanded'), 'false');
}

async function swipe(context, page, x, y, distance) {
  const session = await context.newCDPSession(page);
  try {
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 8; step++) {
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove', touchPoints: [{ x, y: y - distance * step / 8 }],
      });
      await delay(25);
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await delay(200);
  } finally {
    await session.detach();
  }
}

async function recordMotion(page) {
  await page.evaluate(() => {
    window.__drawerMotion = [];
    const sample = () => {
      const drawer = document.querySelector('.inbs-drawer');
      if (drawer) {
        const transform = getComputedStyle(drawer).transform;
        window.__drawerMotion.push(transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41);
      }
      window.__drawerMotionFrame = requestAnimationFrame(sample);
    };
    window.__drawerMotionFrame = requestAnimationFrame(sample);
  });
}

async function motionSamples(page) {
  return page.evaluate(() => {
    cancelAnimationFrame(window.__drawerMotionFrame);
    return window.__drawerMotion;
  });
}

/** A03/A04 regressions, also runnable independently of the full browser audit. */
export async function runDrawerMotionTests({ browser, origin, test }) {
  for (const locale of ['en', 'ar']) {
    for (const width of [320, 390, 768, 1440]) {
      for (const theme of ['light', 'dark']) {
        for (const reducedMotion of ['no-preference', 'reduce']) {
          await test(`drawer / ${locale}/${width}/${theme}/${reducedMotion}`, async () => {
            const touch = width <= 768;
            const context = await browser.newContext({
              viewport: { width, height: 844 }, deviceScaleFactor: 1,
              hasTouch: touch, isMobile: touch, colorScheme: theme, reducedMotion,
            });
            try {
              await context.addInitScript(value => localStorage.setItem('inbs-theme', value), theme);
              const page = await context.newPage();
              const errors = [];
              page.on('pageerror', error => errors.push(String(error)));
              page.on('console', message => {
                if (message.type() === 'error' || /hydration|hydrating/i.test(message.text())) errors.push(message.text());
              });
              assert.equal((await page.goto(`${origin}/${locale}`, { waitUntil: 'networkidle' })).status(), 200);
              assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');
              assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
              if (!touch && reducedMotion === 'no-preference') {
                await page.waitForFunction(() => document.documentElement.classList.contains('lenis'));
              }
              const trigger = page.locator('.inbs-menu-trigger');
              const drawer = page.locator('.inbs-drawer');
              const backdropX = locale === 'ar' ? width - 5 : 5;
              const originalStyles = await page.evaluate(() => ({
                rootOverflow: document.documentElement.style.overflow,
                gutter: document.documentElement.style.scrollbarGutter,
                bodyPosition: document.body.style.position, bodyTop: document.body.style.top,
                bodyLeft: document.body.style.left, bodyWidth: document.body.style.width,
              }));
              await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
              await delay(100);
              const initialY = await page.evaluate(() => window.scrollY);
              assert.ok(initialY > 0);
              const backgroundTop = () => page.locator('.inbs-hero').evaluate(node => node.getBoundingClientRect().top);
              const initialTop = await backgroundTop();
              const initialWidth = await page.locator('.inbs-hero').evaluate(node => node.getBoundingClientRect().width);

              await recordMotion(page);
              await trigger.focus();
              await trigger.press('Enter');
              await drawer.waitFor({ state: 'visible' });
              await delay(450);
              const opening = await motionSamples(page);
              assert.ok(opening.length > 0);
              if (reducedMotion === 'reduce') {
                assert.ok(opening.every(x => Math.abs(x) < .5), 'Reduced Motion must remove sliding on entry');
              } else {
                assert.ok(opening.some(x => locale === 'ar' ? x < -5 : x > 5), 'Normal slide direction must be preserved');
              }
              assert.ok(Math.abs(await backgroundTop() - initialTop) < 1, 'Opening must preserve background position');
              assert.ok(Math.abs(await page.locator('.inbs-hero').evaluate(node => node.getBoundingClientRect().width) - initialWidth) < 1,
                'Opening must preserve content width with classic or overlay scrollbars');
              const lockedY = await page.evaluate(() => window.scrollY);
              await page.mouse.move(backdropX, 250);
              await page.mouse.wheel(0, 400);
              await delay(150);
              if (touch) await swipe(context, page, backdropX, 500, 180);
              assert.equal(await page.evaluate(() => window.scrollY), lockedY, 'Wheel/touch must not scroll the background');
              assert.ok(Math.abs(await backgroundTop() - initialTop) < 1);

              const links = drawer.locator('a[href], button:not([disabled])');
              await links.first().focus();
              await page.keyboard.press('Shift+Tab');
              assert.equal(await links.last().evaluate(node => node === document.activeElement), true, 'Reverse focus trap');
              await page.keyboard.press('Tab');
              assert.equal(await links.first().evaluate(node => node === document.activeElement), true, 'Forward focus trap');
              await recordMotion(page);
              await page.keyboard.press('Escape');
              await drawer.waitFor({ state: 'hidden' });
              const closing = await motionSamples(page);
              if (reducedMotion === 'reduce') {
                assert.ok(closing.every(x => Math.abs(x) < .5), 'Reduced Motion must remove sliding on exit');
              } else {
                assert.ok(closing.some(x => Math.abs(x) > 5), 'Normal exit must retain sliding');
              }
              await unlocked(page);
              assert.equal(await page.evaluate(() => window.scrollY), initialY, 'Restore page position after Escape');
              assert.equal(await trigger.evaluate(node => node === document.activeElement), true, 'Restore trigger focus');
              assert.deepEqual(await page.evaluate(() => ({
                rootOverflow: document.documentElement.style.overflow,
                gutter: document.documentElement.style.scrollbarGutter,
                bodyPosition: document.body.style.position, bodyTop: document.body.style.top,
                bodyLeft: document.body.style.left, bodyWidth: document.body.style.width,
              })), originalStyles, 'Restore previous inline styles');

              // A short viewport must still allow native scrolling inside the dialog, including with Lenis enabled.
              await page.setViewportSize({ width, height: 420 });
              if (touch) await trigger.tap(); else await trigger.click();
              await delay(450);
              assert.equal(await drawer.evaluate(node => node.scrollHeight > node.clientHeight), true);
              await drawer.evaluate(node => { node.scrollTop = 0; });
              const bounds = await drawer.boundingBox();
              const x = bounds.x + bounds.width / 2;
              if (touch) await swipe(context, page, x, 330, 180);
              else { await page.mouse.move(x, 250); await page.mouse.wheel(0, 200); await delay(200); }
              assert.ok(await drawer.evaluate(node => node.scrollTop) > 0, 'Drawer content must scroll with touch/wheel');
              assert.ok(Math.abs(await backgroundTop() - initialTop) < 1);
              await links.last().focus();
              assert.ok(await drawer.evaluate(node => node.scrollTop) > 0, 'Keyboard focus can reach the bottom');
              assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
              await page.mouse.click(backdropX, 200);
              await drawer.waitFor({ state: 'hidden' });
              await unlocked(page);
              assert.equal(await page.evaluate(() => window.scrollY), initialY, 'Restore position after backdrop close');
              assert.equal(await trigger.evaluate(node => node === document.activeElement), true);

              await page.setViewportSize({ width, height: 844 });
              await trigger.click();
              await drawer.locator('.inbs-drawer-close').click();
              await drawer.waitFor({ state: 'hidden' });
              await unlocked(page);
              assert.equal(await page.evaluate(() => window.scrollY), initialY, 'Restore position after close button');

              await trigger.click();
              await drawer.locator(`nav a[href="/${locale}/services"]`).click();
              await page.waitForURL(`${origin}/${locale}/services`);
              await drawer.waitFor({ state: 'hidden' });
              await unlocked(page);
              await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }));
              await trigger.click();
              await drawer.waitFor({ state: 'visible' });
              await page.goBack({ waitUntil: 'networkidle' });
              await page.waitForURL(`${origin}/${locale}`);
              await drawer.waitFor({ state: 'hidden' });
              await unlocked(page);
              await page.goForward({ waitUntil: 'networkidle' });
              await page.waitForURL(`${origin}/${locale}/services`);
              await unlocked(page);
              assert.equal(await drawer.count(), 0, 'History navigation must not reopen the drawer');
              assert.notEqual(await page.locator('body').evaluate(node => getComputedStyle(node).position), 'fixed');
              // History may restore the end of the page; leave room for a real wheel gesture.
              await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }));
              await delay(100);
              const beforeWheel = await page.evaluate(() => window.scrollY);
              await page.mouse.move(width / 2, 700);
              await page.mouse.wheel(0, 300);
              await page.waitForFunction(y => window.scrollY > y + 20, beforeWheel);
              assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
              assert.deepEqual(errors, [], 'No Console/hydration errors');
            } finally {
              await context.close();
            }
          });
        }
      }
    }
  }

  for (const locale of ['en', 'ar']) {
    for (const width of [390, 1440]) {
      for (const theme of ['light', 'dark']) {
        for (const reducedMotion of ['no-preference', 'reduce']) {
          await test(`services motion / ${locale}/${width}/${theme}/${reducedMotion}`, async () => {
            const context = await browser.newContext({ viewport: { width, height: 844 }, colorScheme: theme, reducedMotion });
            try {
              await context.addInitScript(value => localStorage.setItem('inbs-theme', value), theme);
              const page = await context.newPage();
              await page.goto(`${origin}/${locale}/services`, { waitUntil: 'networkidle' });
              const link = page.locator('.inbs-services-entry-link').first();
              const image = link.locator('.inbs-services-entry-image img');
              // Finish the existing viewport reveal before placing the real mouse pointer.
              await link.evaluate(node => window.scrollTo({
                top: window.scrollY + node.getBoundingClientRect().top - 150, behavior: 'instant',
              }));
              await delay(900);
              await link.hover();
              await delay(800);
              assert.equal(await link.evaluate(node => node.matches(':hover')), true);
              const transform = node => {
                const value = getComputedStyle(node).transform;
                return value === 'none' ? { scale: 1, x: 0, y: 0 } :
                  { scale: new DOMMatrixReadOnly(value).m11, x: new DOMMatrixReadOnly(value).m41, y: new DOMMatrixReadOnly(value).m42 };
              };
              const hovered = await image.evaluate(transform);
              assert.ok(Math.abs(hovered.scale - (reducedMotion === 'reduce' ? 1 : 1.055)) < .001,
                'Only reduced-motion should remove the approved image zoom');
              for (const selector of ['.inbs-services-entry-arrow', '.inbs-services-entry-bottom>svg']) {
                const arrow = await link.locator(selector).evaluate(transform);
                assert.ok(Math.abs(arrow.x - (reducedMotion === 'reduce' ? 0 : locale === 'ar' ? -3 : 3)) < .1);
                assert.ok(Math.abs(arrow.y - (reducedMotion === 'reduce' ? 0 : -3)) < .1);
              }
              await page.mouse.move(0, 0);
              await link.focus();
              await page.keyboard.press('Tab');
              await page.keyboard.press('Shift+Tab');
              assert.equal(await link.evaluate(node => node.matches(':focus-visible')), true);
              await delay(800);
              assert.ok(Math.abs((await image.evaluate(transform)).scale - (reducedMotion === 'reduce' ? 1 : 1.055)) < .001,
                'Keyboard focus must also respect reduced motion');
            } finally {
              await context.close();
            }
          });
        }
      }
    }
  }
}
