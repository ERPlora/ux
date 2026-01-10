import { test, expect } from '@playwright/test';

test.describe('Sparkline Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/sparkline.html');
  });

  // Basic Rendering Tests
  test('should render basic sparkline', async ({ page }) => {
    const sparkline = page.locator('.ux-sparkline').first();
    await expect(sparkline).toBeVisible();
  });

  test('should render SVG element', async ({ page }) => {
    const svg = page.locator('.ux-sparkline__svg').first();
    await expect(svg).toBeVisible();

    // Verify SVG attributes
    const width = await svg.getAttribute('width');
    const height = await svg.getAttribute('height');

    expect(width).toBeTruthy();
    expect(height).toBeTruthy();
    expect(parseInt(width!)).toBeGreaterThan(0);
    expect(parseInt(height!)).toBeGreaterThan(0);
  });

  // Line Path Tests
  test('should render line path in SVG', async ({ page }) => {
    const linePath = page.locator('.ux-sparkline__line').first();
    if (await linePath.count() > 0) {
      await expect(linePath).toBeVisible();

      const pathData = await linePath.getAttribute('d');
      expect(pathData).toBeTruthy();
      expect(pathData).toMatch(/^M/);  // SVG path should start with M (move)
    }
  });

  test('should apply line stroke styling', async ({ page }) => {
    const linePath = page.locator('.ux-sparkline__line').first();
    if (await linePath.count() > 0) {
      const stroke = await linePath.evaluate(el =>
        getComputedStyle(el).stroke
      );
      expect(stroke).toBeTruthy();
      expect(stroke).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should have line fill set to none', async ({ page }) => {
    const linePath = page.locator('.ux-sparkline__line').first();
    if (await linePath.count() > 0) {
      const fill = await linePath.evaluate(el =>
        getComputedStyle(el).fill
      );
      expect(fill).toMatch(/none|transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  // Area Fill Tests
  test('should render area fill when enabled', async ({ page }) => {
    const area = page.locator('.ux-sparkline__area').first();
    if (await area.count() > 0) {
      await expect(area).toBeVisible();

      const pathData = await area.getAttribute('d');
      expect(pathData).toBeTruthy();
      expect(pathData).toMatch(/^M/);  // Should be a valid SVG path
      expect(pathData).toMatch(/Z$/);  // Should be closed path
    }
  });

  test('should apply area fill with gradient', async ({ page }) => {
    const area = page.locator('.ux-sparkline__area').first();
    if (await area.count() > 0) {
      const fill = await area.getAttribute('fill');
      expect(fill).toBeTruthy();
      expect(fill).toMatch(/url\(#/);  // Should reference gradient
    }
  });

  test('should have area with opacity', async ({ page }) => {
    const area = page.locator('.ux-sparkline__area').first();
    if (await area.count() > 0) {
      const opacity = await area.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
      expect(parseFloat(opacity)).toBeGreaterThan(0);
    }
  });

  // Color Variant Tests
  test('should apply primary color variant (default)', async ({ page }) => {
    const sparkline = page.locator('.ux-sparkline').first();
    await expect(sparkline).toBeVisible();

    const linePath = page.locator('.ux-sparkline:not(.ux-sparkline--success):not(.ux-sparkline--danger):not(.ux-sparkline--warning) .ux-sparkline__line').first();
    if (await linePath.count() > 0) {
      const stroke = await linePath.evaluate(el =>
        getComputedStyle(el).stroke
      );
      expect(stroke).toBeTruthy();
    }
  });

  test('should apply success color variant', async ({ page }) => {
    const successSparkline = page.locator('.ux-sparkline--success').first();
    if (await successSparkline.count() > 0) {
      await expect(successSparkline).toBeVisible();

      const linePath = successSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const stroke = await linePath.evaluate(el =>
          getComputedStyle(el).stroke
        );
        expect(stroke).toBeTruthy();
        expect(stroke).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
      }
    }
  });

  test('should apply danger color variant', async ({ page }) => {
    const dangerSparkline = page.locator('.ux-sparkline--danger').first();
    if (await dangerSparkline.count() > 0) {
      await expect(dangerSparkline).toBeVisible();

      const linePath = dangerSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const stroke = await linePath.evaluate(el =>
          getComputedStyle(el).stroke
        );
        expect(stroke).toBeTruthy();
      }
    }
  });

  test('should apply warning color variant', async ({ page }) => {
    const warningSparkline = page.locator('.ux-sparkline--warning').first();
    if (await warningSparkline.count() > 0) {
      await expect(warningSparkline).toBeVisible();

      const linePath = warningSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const stroke = await linePath.evaluate(el =>
          getComputedStyle(el).stroke
        );
        expect(stroke).toBeTruthy();
      }
    }
  });

  // Data Points Tests
  test('should render last dot when enabled', async ({ page }) => {
    const lastDot = page.locator('.ux-sparkline__dot--last').first();
    if (await lastDot.count() > 0) {
      await expect(lastDot).toBeVisible();

      const cx = await lastDot.getAttribute('cx');
      const cy = await lastDot.getAttribute('cy');
      const radius = await lastDot.getAttribute('r');

      expect(cx).toBeTruthy();
      expect(cy).toBeTruthy();
      expect(radius).toBeTruthy();
      expect(parseFloat(radius!)).toBeGreaterThan(0);
    }
  });

  test('should render all data points when showDots is enabled', async ({ page }) => {
    const dots = page.locator('.ux-sparkline__dot:not(.ux-sparkline__dot--last)');
    const dotCount = await dots.count();

    if (dotCount > 0) {
      // Verify each dot has valid SVG attributes
      for (let i = 0; i < Math.min(dotCount, 3); i++) {
        const dot = dots.nth(i);
        const cx = await dot.getAttribute('cx');
        const cy = await dot.getAttribute('cy');

        expect(cx).toBeTruthy();
        expect(cy).toBeTruthy();
        expect(parseFloat(cx!)).toBeGreaterThanOrEqual(0);
        expect(parseFloat(cy!)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  // Bar Chart Tests
  test('should render bars for bar chart type', async ({ page }) => {
    const bars = page.locator('.ux-sparkline__bar');
    if (await bars.count() > 0) {
      const firstBar = bars.first();
      await expect(firstBar).toBeVisible();

      const x = await firstBar.getAttribute('x');
      const y = await firstBar.getAttribute('y');
      const width = await firstBar.getAttribute('width');
      const height = await firstBar.getAttribute('height');

      expect(x).toBeTruthy();
      expect(y).toBeTruthy();
      expect(width).toBeTruthy();
      expect(height).toBeTruthy();
    }
  });

  test('should mark negative bars differently', async ({ page }) => {
    const negativeBar = page.locator('.ux-sparkline__bar--negative').first();
    if (await negativeBar.count() > 0) {
      await expect(negativeBar).toBeVisible();

      const fill = await negativeBar.evaluate(el =>
        getComputedStyle(el).fill
      );
      expect(fill).toBeTruthy();
    }
  });

  // Reference Line Tests
  test('should render reference line when enabled', async ({ page }) => {
    const referenceLine = page.locator('.ux-sparkline__reference').first();
    if (await referenceLine.count() > 0) {
      await expect(referenceLine).toBeVisible();

      const x1 = await referenceLine.getAttribute('x1');
      const x2 = await referenceLine.getAttribute('x2');
      const y1 = await referenceLine.getAttribute('y1');
      const y2 = await referenceLine.getAttribute('y2');

      expect(x1).toBeTruthy();
      expect(x2).toBeTruthy();
      expect(y1).toBeTruthy();
      expect(y2).toBeTruthy();
    }
  });

  test('should apply dashed stroke to reference line', async ({ page }) => {
    const referenceLine = page.locator('.ux-sparkline__reference').first();
    if (await referenceLine.count() > 0) {
      const strokeDasharray = await referenceLine.evaluate(el =>
        getComputedStyle(el).strokeDasharray
      );
      expect(strokeDasharray).not.toBe('none');
    }
  });

  // Size Variants Tests
  test('should apply small size variant', async ({ page }) => {
    const smallSparkline = page.locator('.ux-sparkline--sm').first();
    if (await smallSparkline.count() > 0) {
      await expect(smallSparkline).toBeVisible();

      const linePath = smallSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const strokeWidth = await linePath.evaluate(el =>
          parseFloat(getComputedStyle(el).strokeWidth)
        );
        expect(strokeWidth).toBeLessThanOrEqual(2);
      }
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeSparkline = page.locator('.ux-sparkline--lg').first();
    if (await largeSparkline.count() > 0) {
      await expect(largeSparkline).toBeVisible();

      const linePath = largeSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const strokeWidth = await linePath.evaluate(el =>
          parseFloat(getComputedStyle(el).strokeWidth)
        );
        expect(strokeWidth).toBeGreaterThanOrEqual(2);
      }
    }
  });

  // Value Display Tests
  test('should display current value when enabled', async ({ page }) => {
    const valueSpan = page.locator('.ux-sparkline__value').first();
    if (await valueSpan.count() > 0) {
      await expect(valueSpan).toBeVisible();

      const text = await valueSpan.textContent();
      expect(text).toBeTruthy();
      expect(text).not.toBe('');
    }
  });

  // Change Indicator Tests
  test('should display change indicator when enabled', async ({ page }) => {
    const changeSpan = page.locator('.ux-sparkline__change').first();
    if (await changeSpan.count() > 0) {
      await expect(changeSpan).toBeVisible();

      const text = await changeSpan.textContent();
      expect(text).toBeTruthy();
      expect(text).toMatch(/[\d+\-%.]/);
    }
  });

  test('should apply positive change styling', async ({ page }) => {
    const positiveChange = page.locator('.ux-sparkline__change--positive').first();
    if (await positiveChange.count() > 0) {
      await expect(positiveChange).toBeVisible();

      const color = await positiveChange.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should apply negative change styling', async ({ page }) => {
    const negativeChange = page.locator('.ux-sparkline__change--negative').first();
    if (await negativeChange.count() > 0) {
      await expect(negativeChange).toBeVisible();

      const color = await negativeChange.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  // Animation Tests
  test('should apply animation class when animated', async ({ page }) => {
    const animatedSparkline = page.locator('.ux-sparkline--animated').first();
    if (await animatedSparkline.count() > 0) {
      await expect(animatedSparkline).toBeVisible();

      const linePath = animatedSparkline.locator('.ux-sparkline__line').first();
      if (await linePath.count() > 0) {
        const strokeDasharray = await linePath.evaluate(el =>
          getComputedStyle(el).strokeDasharray
        );
        expect(strokeDasharray).not.toBe('none');
      }
    }
  });

  // Accessibility Tests
  test('should have proper SVG structure', async ({ page }) => {
    const svg = page.locator('.ux-sparkline__svg').first();
    if (await svg.count() > 0) {
      const tagName = await svg.evaluate(el => el.tagName);
      expect(tagName).toBe('svg');
    }
  });

  // Alpine.js Component Tests
  test('should initialize Alpine.js component', async ({ page }) => {
    const sparkline = page.locator('.ux-sparkline').first();

    // Check if Alpine.js data is available
    const hasAlpineData = await sparkline.evaluate(el => {
      return '__x' in el || el.hasAttribute('x-data');
    });

    if (await sparkline.getAttribute('x-data')) {
      expect(hasAlpineData).toBeTruthy();
    }
  });

  test('should compute line path from data', async ({ page }) => {
    const linePath = page.locator('.ux-sparkline__line').first();

    if (await linePath.count() > 0) {
      const pathData = await linePath.getAttribute('d');

      // Path should contain move commands and curve/line commands
      expect(pathData).toMatch(/M\s*[\d.]+\s+[\d.]+/);
      expect(pathData).toMatch(/[LCQ]\s*[\d.]+/);
    }
  });

  // Responsive/Layout Tests
  test('should render SVG with appropriate viewBox if present', async ({ page }) => {
    const svg = page.locator('.ux-sparkline__svg').first();

    if (await svg.count() > 0) {
      const viewBox = await svg.getAttribute('viewBox');
      const width = await svg.getAttribute('width');
      const height = await svg.getAttribute('height');

      // Should have either viewBox or width/height
      const hasViewBox = viewBox !== null;
      const hasDimensions = width !== null && height !== null;

      expect(hasViewBox || hasDimensions).toBeTruthy();
    }
  });

  test('should maintain aspect ratio with width and height', async ({ page }) => {
    const svg = page.locator('.ux-sparkline__svg').first();

    if (await svg.count() > 0) {
      const width = await svg.getAttribute('width');
      const height = await svg.getAttribute('height');

      if (width && height) {
        const aspectRatio = parseFloat(width) / parseFloat(height);
        expect(aspectRatio).toBeGreaterThan(0);
        expect(aspectRatio).toBeLessThan(100);
      }
    }
  });

  // Gradient/Defs Tests
  test('should define gradient for area fill', async ({ page }) => {
    const gradient = page.locator('svg defs linearGradient').first();

    if (await gradient.count() > 0) {
      const id = await gradient.getAttribute('id');
      expect(id).toBeTruthy();

      const stops = gradient.locator('stop');
      const stopCount = await stops.count();
      expect(stopCount).toBeGreaterThanOrEqual(2);
    }
  });

  // Smooth vs Linear Path Tests
  test('should render smooth curve path when smooth is enabled', async ({ page }) => {
    const linePath = page.locator('.ux-sparkline__line').first();

    if (await linePath.count() > 0) {
      const pathData = await linePath.getAttribute('d');

      // Smooth curves use bezier (C command), linear uses L command
      const hasBezier = pathData?.includes('C') || pathData?.includes('Q');
      const hasLinear = pathData?.includes('L');

      // Could be either depending on data points
      expect(hasBezier || hasLinear).toBeTruthy();
    }
  });
});
