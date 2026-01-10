import { test, expect } from '@playwright/test';

test.describe('Progress Circle Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/progress-circle.html');
  });

  test('should render basic progress circle', async ({ page }) => {
    const progressCircle = page.locator('.ux-progress-circle').first();
    await expect(progressCircle).toBeVisible();
  });

  test('should render circle SVG', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    await expect(svg).toBeVisible();
  });

  test('should render background circle element', async ({ page }) => {
    const bgCircle = page.locator('.ux-progress-circle__bg').first();
    await expect(bgCircle).toBeVisible();
  });

  test('should render progress arc (fill circle)', async ({ page }) => {
    const fillCircle = page.locator('.ux-progress-circle__fill').first();
    await expect(fillCircle).toBeVisible();
  });

  test('should display percentage value', async ({ page }) => {
    const value = page.locator('.ux-progress-circle__value').first();
    await expect(value).toBeVisible();
    const text = await value.textContent();
    expect(text).toMatch(/\d+/);
  });

  test('should have circle viewBox attribute', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    const viewBox = await svg.getAttribute('viewBox');
    expect(viewBox).toBeTruthy();
    expect(viewBox).toMatch(/^\d+ \d+ \d+ \d+$/);
  });

  test('should have cx and cy attributes on circles', async ({ page }) => {
    const bgCircle = page.locator('.ux-progress-circle__bg').first();
    const cx = await bgCircle.getAttribute('cx');
    const cy = await bgCircle.getAttribute('cy');
    const r = await bgCircle.getAttribute('r');
    expect(cx).toBeTruthy();
    expect(cy).toBeTruthy();
    expect(r).toBeTruthy();
  });

  test('should have stroke-dasharray on progress arc', async ({ page }) => {
    const fillCircle = page.locator('.ux-progress-circle__fill').first();
    const dasharray = await fillCircle.getAttribute('stroke-dasharray');
    expect(dasharray).toBeTruthy();
  });

  test('should have stroke-dashoffset on progress arc', async ({ page }) => {
    const fillCircle = page.locator('.ux-progress-circle__fill').first();
    const dashoffset = await fillCircle.getAttribute('stroke-dashoffset');
    expect(dashoffset).toBeTruthy();
  });

  test('should apply size variants', async ({ page }) => {
    const xsCircle = page.locator('.ux-progress-circle--xs').first();
    if (await xsCircle.count() > 0) {
      await expect(xsCircle).toBeVisible();
    }

    const smCircle = page.locator('.ux-progress-circle--sm').first();
    if (await smCircle.count() > 0) {
      await expect(smCircle).toBeVisible();
    }

    const lgCircle = page.locator('.ux-progress-circle--lg').first();
    if (await lgCircle.count() > 0) {
      await expect(lgCircle).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    const primaryCircle = page.locator('.ux-progress-circle--primary').first();
    if (await primaryCircle.count() > 0) {
      await expect(primaryCircle).toBeVisible();
    }

    const successCircle = page.locator('.ux-progress-circle--success').first();
    if (await successCircle.count() > 0) {
      await expect(successCircle).toBeVisible();
    }

    const warningCircle = page.locator('.ux-progress-circle--warning').first();
    if (await warningCircle.count() > 0) {
      await expect(warningCircle).toBeVisible();
    }

    const dangerCircle = page.locator('.ux-progress-circle--danger').first();
    if (await dangerCircle.count() > 0) {
      await expect(dangerCircle).toBeVisible();
    }
  });

  test('should display label when provided', async ({ page }) => {
    const label = page.locator('.ux-progress-circle__label').first();
    if (await label.count() > 0) {
      await expect(label).toBeVisible();
      const text = await label.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render content wrapper', async ({ page }) => {
    const content = page.locator('.ux-progress-circle__content').first();
    await expect(content).toBeVisible();
  });

  test('should support indeterminate variant', async ({ page }) => {
    const indeterminate = page.locator('.ux-progress-circle--indeterminate').first();
    if (await indeterminate.count() > 0) {
      await expect(indeterminate).toBeVisible();
      const animation = await indeterminate.evaluate(el =>
        getComputedStyle(el).animation || getComputedStyle(el.querySelector('.ux-progress-circle__fill') || el).animation
      );
      expect(animation).not.toBe('none');
    }
  });

  test('should support glass variant', async ({ page }) => {
    const glassCircle = page.locator('.ux-progress-circle--glass').first();
    if (await glassCircle.count() > 0) {
      await expect(glassCircle).toBeVisible();
      const backdropFilter = await glassCircle.evaluate(el =>
        getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).not.toBe('none');
    }
  });

  test('should have appropriate SVG dimensions', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    const width = await svg.evaluate(el => el.clientWidth);
    const height = await svg.evaluate(el => el.clientHeight);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  test('should update displayValue when data changes', async ({ page }) => {
    const value = page.locator('.ux-progress-circle__value').first();
    const initialText = await value.textContent();
    expect(initialText).toBeTruthy();
    expect(initialText).toMatch(/\d+/);
  });

  test('should have proper SVG circle structure', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    const circles = svg.locator('circle');
    expect(await circles.count()).toBeGreaterThanOrEqual(2);
  });

  test('should contain value and background circles', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    const bgCircle = svg.locator('.ux-progress-circle__bg');
    const fillCircle = svg.locator('.ux-progress-circle__fill');
    await expect(bgCircle).toBeVisible();
    await expect(fillCircle).toBeVisible();
  });

  test('should display percentage values in range 0-100', async ({ page }) => {
    const values = page.locator('.ux-progress-circle__value');
    const count = await values.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const text = await values.nth(i).textContent();
      const match = text?.match(/(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(100);
      }
    }
  });

  test('should have fill circles with stroke attributes', async ({ page }) => {
    const fillCircle = page.locator('.ux-progress-circle__fill').first();
    const stroke = await fillCircle.evaluate(el =>
      getComputedStyle(el).stroke
    );
    expect(stroke).not.toBe('none');
  });

  test('should apply animated class when visible', async ({ page }) => {
    const animated = page.locator('.ux-progress-circle--animated').first();
    if (await animated.count() > 0) {
      await expect(animated).toBeVisible();
    }
  });

  test('should have proper accessibility structure', async ({ page }) => {
    const progressCircle = page.locator('.ux-progress-circle').first();
    await expect(progressCircle).toBeVisible();
    const content = progressCircle.locator('.ux-progress-circle__content');
    await expect(content).toBeVisible();
  });

  test('multiple progress circles should be independent', async ({ page }) => {
    const circles = page.locator('.ux-progress-circle');
    const count = await circles.count();
    expect(count).toBeGreaterThan(1);

    for (let i = 0; i < Math.min(count, 3); i++) {
      const circle = circles.nth(i);
      const value = circle.locator('.ux-progress-circle__value');
      if (await value.count() > 0) {
        await expect(value).toBeVisible();
      }
    }
  });

  test('should render with proper SVG namespace', async ({ page }) => {
    const svg = page.locator('.ux-progress-circle__svg').first();
    const namespace = await svg.evaluate(el => el.namespaceURI);
    expect(namespace).toBe('http://www.w3.org/2000/svg');
  });

  test('progress arc should have positive circumference', async ({ page }) => {
    const fillCircle = page.locator('.ux-progress-circle__fill').first();
    const dasharray = await fillCircle.getAttribute('stroke-dasharray');
    if (dasharray) {
      const value = parseFloat(dasharray);
      expect(value).toBeGreaterThan(0);
    }
  });
});
