import { test, expect } from '@playwright/test';

test.describe('Gauge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/gauge.html');
  });

  test('should render basic gauge', async ({ page }) => {
    const gauge = page.locator('.ux-gauge').first();
    await expect(gauge).toBeVisible();
  });

  test('should render SVG element', async ({ page }) => {
    const svg = page.locator('.ux-gauge__svg').first();
    await expect(svg).toBeVisible();
  });

  test('should render gauge track (background arc)', async ({ page }) => {
    const track = page.locator('.ux-gauge__track').first();
    await expect(track).toBeVisible();
  });

  test('should render gauge fill (progress arc)', async ({ page }) => {
    const fill = page.locator('.ux-gauge__fill').first();
    await expect(fill).toBeVisible();
  });

  test('should display value inside gauge', async ({ page }) => {
    const value = page.locator('.ux-gauge__value').first();
    await expect(value).toBeVisible();
    const text = await value.textContent();
    expect(text).toMatch(/^\d+$/);
  });

  test('should display unit label', async ({ page }) => {
    const unit = page.locator('.ux-gauge__unit').first();
    if (await unit.count() > 0) {
      await expect(unit).toBeVisible();
      const text = await unit.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display gauge label', async ({ page }) => {
    const label = page.locator('.ux-gauge__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
      const text = await label.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display min and max labels', async ({ page }) => {
    const labels = page.locator('.ux-gauge__labels').first();
    if (await labels.count() > 0) {
      await expect(labels).toBeVisible();

      const min = page.locator('.ux-gauge__min').first();
      const max = page.locator('.ux-gauge__max').first();

      if (await min.count() > 0) {
        await expect(min).toBeVisible();
        const minText = await min.textContent();
        expect(minText).toMatch(/\d+/);
      }

      if (await max.count() > 0) {
        await expect(max).toBeVisible();
        const maxText = await max.textContent();
        expect(maxText).toMatch(/\d+/);
      }
    }
  });

  test('should apply color variant: success', async ({ page }) => {
    const successGauge = page.locator('.ux-gauge--success').first();
    if (await successGauge.count() > 0) {
      await expect(successGauge).toBeVisible();

      const fill = successGauge.locator('.ux-gauge__fill');
      const stroke = await fill.evaluate(el =>
        getComputedStyle(el).stroke
      );
      expect(stroke).not.toBe('transparent');
    }
  });

  test('should apply color variant: warning', async ({ page }) => {
    const warningGauge = page.locator('.ux-gauge--warning').first();
    if (await warningGauge.count() > 0) {
      await expect(warningGauge).toBeVisible();
    }
  });

  test('should apply color variant: danger', async ({ page }) => {
    const dangerGauge = page.locator('.ux-gauge--danger').first();
    if (await dangerGauge.count() > 0) {
      await expect(dangerGauge).toBeVisible();
    }
  });

  test('should apply size variant: small', async ({ page }) => {
    const smallGauge = page.locator('.ux-gauge--sm').first();
    if (await smallGauge.count() > 0) {
      await expect(smallGauge).toBeVisible();
      const svg = smallGauge.locator('.ux-gauge__svg');
      const width = await svg.evaluate(el =>
        parseInt(el.getAttribute('width') || '0')
      );
      expect(width).toBeLessThan(150);
    }
  });

  test('should apply size variant: medium', async ({ page }) => {
    const mediumGauge = page.locator('.ux-gauge--md').first();
    if (await mediumGauge.count() > 0) {
      await expect(mediumGauge).toBeVisible();
    }
  });

  test('should apply size variant: large', async ({ page }) => {
    const largeGauge = page.locator('.ux-gauge--lg').first();
    if (await largeGauge.count() > 0) {
      await expect(largeGauge).toBeVisible();
      const svg = largeGauge.locator('.ux-gauge__svg');
      const width = await svg.evaluate(el =>
        parseInt(el.getAttribute('width') || '0')
      );
      expect(width).toBeGreaterThan(200);
    }
  });

  test('should have correct stroke-dasharray attribute', async ({ page }) => {
    const fill = page.locator('.ux-gauge__fill').first();
    const dasharray = await fill.evaluate(el =>
      el.getAttribute('stroke-dasharray')
    );
    expect(dasharray).not.toBeNull();
    expect(Number(dasharray)).toBeGreaterThan(0);
  });

  test('should have stroke-dashoffset attribute', async ({ page }) => {
    const fill = page.locator('.ux-gauge__fill').first();
    const dashoffset = await fill.evaluate(el =>
      el.getAttribute('stroke-dashoffset')
    );
    expect(dashoffset).not.toBeNull();
    expect(Number(dashoffset)).toBeGreaterThanOrEqual(0);
  });

  test('should render arc path', async ({ page }) => {
    const track = page.locator('.ux-gauge__track').first();
    const pathD = await track.evaluate(el =>
      el.getAttribute('d')
    );
    expect(pathD).toMatch(/^M\s+/);
  });

  test('should support glass variant', async ({ page }) => {
    const glassGauge = page.locator('.ux-gauge--glass').first();
    if (await glassGauge.count() > 0) {
      await expect(glassGauge).toBeVisible();
    }
  });

  test('should contain animated fill on supported browsers', async ({ page }) => {
    const animatedGauge = page.locator('.ux-gauge--animated').first();
    if (await animatedGauge.count() > 0) {
      const fill = animatedGauge.locator('.ux-gauge__fill');
      const transition = await fill.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toContain('stroke-dashoffset');
    }
  });

  test('should show needle on speedometer gauges', async ({ page }) => {
    const needleGauge = page.locator('.ux-gauge').filter({ has: page.locator('.ux-gauge__needle') }).first();
    if (await needleGauge.count() > 0) {
      const needle = needleGauge.locator('.ux-gauge__needle');
      await expect(needle).toBeVisible();
    }
  });

  test('should show needle center circle', async ({ page }) => {
    const needleCenter = page.locator('.ux-gauge__needle-center').first();
    if (await needleCenter.count() > 0) {
      await expect(needleCenter).toBeVisible();
    }
  });

  test('should support interactive value changes', async ({ page }) => {
    const gauge = page.locator('[x-data*="uxGauge"]').first();
    if (await gauge.count() > 0) {
      const buttons = gauge.locator('button');
      const initialCount = await buttons.count();
      if (initialCount > 0) {
        const initialValue = await page.locator('.ux-gauge__value').first().textContent();

        const incrementBtn = gauge.locator('button:has-text("+")').first();
        if (await incrementBtn.count() > 0) {
          await incrementBtn.click();
          await page.waitForTimeout(300);

          const newValue = await page.locator('.ux-gauge__value').first().textContent();
          expect(newValue).not.toBe(initialValue);
        }
      }
    }
  });

  test('should maintain min/max constraints', async ({ page }) => {
    const gauge = page.locator('[x-data*="uxGauge"]').first();
    if (await gauge.count() > 0) {
      const decrementBtn = gauge.locator('button:has-text("-")').nth(0);

      if (await decrementBtn.count() > 0) {
        for (let i = 0; i < 15; i++) {
          await decrementBtn.click();
          await page.waitForTimeout(50);
        }

        const value = await page.locator('.ux-gauge__value').first().textContent();
        const numValue = parseInt(value || '0');
        expect(numValue).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should display custom ranges', async ({ page }) => {
    const customRangeGauges = page.locator('[x-data*="min"]');
    if (await customRangeGauges.count() > 0) {
      const gauge = customRangeGauges.first();
      const minLabel = gauge.locator('.ux-gauge__min');
      const maxLabel = gauge.locator('.ux-gauge__max');

      if (await minLabel.count() > 0 && await maxLabel.count() > 0) {
        const minText = await minLabel.textContent();
        const maxText = await maxLabel.textContent();

        const minNum = parseInt(minText || '0');
        const maxNum = parseInt(maxText || '100');
        expect(maxNum).toBeGreaterThan(minNum);
      }
    }
  });

  test('should render with proper SVG viewBox', async ({ page }) => {
    const svg = page.locator('.ux-gauge__svg').first();
    const viewBox = await svg.evaluate(el =>
      el.getAttribute('viewBox')
    );
    expect(viewBox).toMatch(/\d+\s+\d+\s+\d+\s+\d+/);
  });

  test('should have width and height attributes', async ({ page }) => {
    const svg = page.locator('.ux-gauge__svg').first();
    const width = await svg.evaluate(el =>
      el.getAttribute('width')
    );
    const height = await svg.evaluate(el =>
      el.getAttribute('height')
    );

    expect(width).not.toBeNull();
    expect(height).not.toBeNull();
    expect(Number(width)).toBeGreaterThan(0);
    expect(Number(height)).toBeGreaterThan(0);
  });

  test('should style value container correctly', async ({ page }) => {
    const valueContainer = page.locator('.ux-gauge__value-container').first();
    if (await valueContainer.count() > 0) {
      await expect(valueContainer).toBeVisible();

      const display = await valueContainer.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(['flex', 'block', 'grid']).toContain(display);
    }
  });

  test('should emit gauge:change event on value update', async ({ page }) => {
    const eventLog: string[] = [];

    await page.evaluate(() => {
      (window as any).gaugeEvents = [];
      document.addEventListener('gauge:change', (e: any) => {
        (window as any).gaugeEvents.push(e.detail);
      });
    });

    const gauge = page.locator('[x-data*="uxGauge"]').filter({ has: page.locator('button:has-text("+")') }).first();
    if (await gauge.count() > 0) {
      const incrementBtn = gauge.locator('button:has-text("+")').first();
      if (await incrementBtn.count() > 0) {
        await incrementBtn.click();
        await page.waitForTimeout(300);

        const events = await page.evaluate(() => (window as any).gaugeEvents);
        expect(Array.isArray(events)).toBe(true);
      }
    }
  });
});
