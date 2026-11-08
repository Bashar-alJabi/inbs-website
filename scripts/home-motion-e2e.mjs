import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

/** A01/A02 regressions, shared by the full browser suite and focused local runs. */
export async function runHomeMotionTests({ browser, origin, test }) {
  for (const locale of ['en', 'ar']) {
    for (const width of [320, 390, 768, 1440]) {
      for (const theme of ['light', 'dark']) {
        for (const reducedMotion of ['no-preference', 'reduce']) {
          const touch = width <= 768;
          const name = `home motion / ${locale}/${width}/${theme}/${reducedMotion}`;
          await test(name, async () => {
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
                if (message.type() === 'error' || /hydration|hydrating/i.test(message.text())) {
                  errors.push(message.text());
                }
              });
              // Advance the actual 7.5s interval without lengthy wall-clock sleeps.
              await page.clock.install();
              const response = await page.goto(`${origin}/${locale}`, { waitUntil: 'load' });
              assert.equal(response.status(), 200);
              await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme);
              await page.clock.pauseAt(new Date(Date.now() + 1500));
              assert.equal(await page.locator('html').getAttribute('dir'), locale === 'ar' ? 'rtl' : 'ltr');

              const controls = page.locator('.inbs-slide-controls');
              assert.equal(await controls.isVisible(), true, 'Slider controls must remain visible');
              const geometry = await controls.evaluate(element => {
                const box = node => {
                  const { left, right, top, bottom } = node.getBoundingClientRect();
                  return { left, right, top, bottom };
                };
                return {
                  controls: box(element), hero: box(document.querySelector('.inbs-hero')),
                  cta: box(document.querySelector('.inbs-hero-cta')),
                  related: box(document.querySelector('.inbs-hero-service-strip')),
                  targets: [...element.querySelectorAll('button')].map(button => ({
                    ...box(button), inset: getComputedStyle(button, '::before').inset,
                    iconWidth: button.querySelector('svg').getBoundingClientRect().width,
                  })),
                  overflow: document.documentElement.scrollWidth - innerWidth,
                };
              });
              assert.ok(geometry.overflow <= 3, 'No horizontal overflow');
              assert.ok(geometry.controls.top >= geometry.cta.bottom, 'Controls must sit below Hero copy/CTA');
              assert.ok(geometry.controls.bottom <= geometry.hero.bottom, 'Controls must fit inside Hero');
              if (width <= 760) {
                assert.ok(geometry.controls.top >= geometry.related.bottom, 'Mobile controls must sit below all CTA links');
                assert.ok(geometry.targets.every(box => box.right - box.left >= 44 && box.bottom - box.top >= 44),
                  'Mobile buttons need 44px touch targets');
                assert.ok(geometry.targets.every(box => box.inset === '6px' && box.iconWidth === 16),
                  'Compact 32px button outlines and 16px icons must retain the larger touch targets');
              }

              const heading = page.locator('.inbs-slide h1');
              const selected = () => controls.locator(':scope > span').innerText();
              const pauseName = locale === 'ar' ? 'إيقاف الشرائح مؤقتاً' : 'Pause slides';
              const playName = locale === 'ar' ? 'تشغيل الشرائح' : 'Play slides';
              const initial = await heading.innerText();
              const initialIndex = await selected();
              if (reducedMotion === 'reduce') {
                // The existing preference guard must keep autoplay off.
                await page.clock.fastForward(16000);
                assert.equal(await heading.innerText(), initial);
                assert.equal(await selected(), initialIndex);
              } else {
                await page.locator('.inbs-hero-cta').focus();
                for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
                const pause = page.getByRole('button', { name: pauseName, exact: true });
                assert.equal(await pause.evaluate(button => button === document.activeElement), true);
                await page.keyboard.press('Space');
                const play = page.getByRole('button', { name: playName, exact: true });
                assert.equal(await play.isVisible(), true);
                await page.clock.runFor(100);
                await page.clock.fastForward(16000);
                assert.equal(await selected(), initialIndex, 'Pause must stop more than two intervals');
                await page.keyboard.press('Enter');
                // Flush React's effect before advancing the newly scheduled interval.
                await page.clock.runFor(100);
                await page.clock.fastForward(7000);
                assert.equal(await selected(), initialIndex, 'Keep the existing 7.5s interval');
                await page.clock.fastForward(600);
                await page.clock.runFor(1800);
                assert.notEqual(await selected(), initialIndex, 'Resume must advance the selected slide');

                if (touch) await pause.tap(); else await pause.click();
                await page.clock.runFor(100);
                const stopped = await selected();
                await page.clock.fastForward(16000);
                assert.equal(await selected(), stopped, 'Pointer/touch pause must stop autoplay');
                if (touch) await play.tap(); else await play.click();
                await page.clock.runFor(100);
                await page.clock.fastForward(7500);
                await page.clock.runFor(1800);
                assert.notEqual(await selected(), stopped, 'Pointer/touch resume must restart autoplay');
              }

              // Restore real frames for scrolling and hover hit testing with Lenis/Motion.
              await page.clock.resume();
              const window = page.locator('.inbs-institutions-window');
              const track = page.locator('.inbs-institutions-track');
              const state = () => track.evaluate(element => getComputedStyle(element).animationPlayState);
              const time = () => track.evaluate(element => element.getAnimations()[0]?.currentTime);
              await page.mouse.move(0, 0);
              await page.locator('.inbs-services-all-link').focus();
              await page.keyboard.press('Tab');
              assert.equal(await window.evaluate(element => element === document.activeElement), true);
              assert.equal(await state(), 'paused', 'Keyboard focus pauses the ticker');
              assert.ok(await window.evaluate(element => parseFloat(getComputedStyle(element).outlineWidth) >= 2),
                'Keyboard focus must be visible');

              // Exercise focus-within independently of focus on the outer window.
              const descendant = window.locator('.inbs-institutions-name').first();
              await descendant.evaluate(element => { element.tabIndex = 0; });
              await page.keyboard.press('Tab');
              assert.equal(await descendant.evaluate(element => element === document.activeElement), true);
              assert.equal(await state(), 'paused', 'Descendant focus keeps the ticker paused');
              if (reducedMotion === 'no-preference') {
                const frozen = await time();
                await delay(120);
                assert.ok(Math.abs(await time() - frozen) < 1, 'Focused ticker must actually stop moving');
              }
              await descendant.evaluate(element => element.removeAttribute('tabindex'));
              await page.locator('.inbs-menu-trigger').focus();
              await page.mouse.move(0, 0);
              if (reducedMotion === 'reduce') {
                assert.equal(await track.evaluate(element => getComputedStyle(element).animationName), 'none');
              } else {
                assert.equal(await state(), 'running', 'Leaving focus resumes the ticker');
                const running = await time();
                await delay(120);
                assert.ok(await time() > running, 'Ticker animation time must advance after focus leaves');
                // Test hover on a mouse context; touch contexts use tap/focus instead.
                if (!touch) {
                  await window.hover();
                  assert.equal(await state(), 'paused', 'Mouse hover still pauses');
                  await page.mouse.move(0, 0);
                  assert.equal(await state(), 'running', 'Leaving hover resumes');
                }
                if (touch) {
                  await window.tap();
                  assert.equal(await window.evaluate(element => element === document.activeElement), true);
                  assert.equal(await state(), 'paused', 'Touch focuses and pauses without another control');
                  await page.locator('.inbs-institutions-heading h2').tap();
                  assert.equal(await state(), 'running', 'Tapping outside resumes the ticker');
                }
                assert.equal(await track.evaluate(element => getComputedStyle(element).animationDuration), '42s');
              }
              assert.deepEqual(errors, [], 'No Console, JavaScript or hydration errors');
            } finally {
              await context.close();
            }
          });
        }
      }
    }
  }

  // Motion's native browser animations do not follow the fake JS clock.
  // Verify visible slide copy as well as the timed index, using real elapsed time.
  for (const locale of ['en', 'ar']) {
    await test(`home motion / ${locale}/touch/real-time slide content`, async () => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true,
        reducedMotion: 'no-preference', colorScheme: 'light',
      });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(String(error)));
        page.on('console', message => {
          if (message.type() === 'error' || /hydration|hydrating/i.test(message.text())) {
            errors.push(message.text());
          }
        });
        await page.goto(`${origin}/${locale}`, { waitUntil: 'load' });
        const initial = await page.locator('.inbs-slide h1').innerText();
        await page.getByRole('button', {
          name: locale === 'ar' ? 'إيقاف الشرائح مؤقتاً' : 'Pause slides', exact: true,
        }).tap();
        await delay(8000);
        assert.equal(await page.locator('.inbs-slide h1').innerText(), initial);
        await page.getByRole('button', {
          name: locale === 'ar' ? 'تشغيل الشرائح' : 'Play slides', exact: true,
        }).tap();
        await page.waitForFunction(text => {
          const heading = document.querySelector('.inbs-slide h1');
          return heading && heading.textContent !== text;
        }, initial, { timeout: 11000 });
        assert.deepEqual(errors, [], 'No Console, JavaScript or hydration errors during real-time playback');
      } finally {
        await context.close();
      }
    });
  }
}
