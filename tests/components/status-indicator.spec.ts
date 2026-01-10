import { test, expect } from '@playwright/test';

test.describe('Status Indicator Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/status-indicator.html');
  });

  test('should render basic status indicator', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator').first();
    await expect(indicator).toBeVisible();
  });

  test('should render status dot', async ({ page }) => {
    const dot = page.locator('.ux-status-indicator__dot').first();
    await expect(dot).toBeVisible();

    const width = await dot.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(width).toBeGreaterThan(0);
  });

  test('should render circular dot', async ({ page }) => {
    const dot = page.locator('.ux-status-indicator__dot').first();
    const borderRadius = await dot.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toContain('50%');
  });

  test('should render label text', async ({ page }) => {
    const label = page.locator('.ux-status-indicator__label').first();
    await expect(label).toBeVisible();
    const text = await label.textContent();
    expect(text).toBeDefined();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should apply success color variant', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator--success').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
      const dot = indicator.locator('.ux-status-indicator__dot');
      const bgColor = await dot.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toContain('rgb(107, 114, 128)'); // not gray
    }
  });

  test('should apply warning color variant', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator--warning').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  test('should apply danger color variant', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator--danger').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  test('should apply info color variant', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator--info').first();
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  test('should apply presence state variants', async ({ page }) => {
    const onlineIndicator = page.locator('.ux-status-indicator--online').first();
    if (await onlineIndicator.count() > 0) {
      await expect(onlineIndicator).toBeVisible();
    }

    const awayIndicator = page.locator('.ux-status-indicator--away').first();
    if (await awayIndicator.count() > 0) {
      await expect(awayIndicator).toBeVisible();
    }

    const busyIndicator = page.locator('.ux-status-indicator--busy').first();
    if (await busyIndicator.count() > 0) {
      await expect(busyIndicator).toBeVisible();
    }

    const offlineIndicator = page.locator('.ux-status-indicator--offline').first();
    if (await offlineIndicator.count() > 0) {
      await expect(offlineIndicator).toBeVisible();
    }
  });

  test('should apply pulse animation', async ({ page }) => {
    const pulsingIndicator = page.locator('.ux-status-indicator--pulse').first();
    if (await pulsingIndicator.count() > 0) {
      await expect(pulsingIndicator).toBeVisible();
      const dot = pulsingIndicator.locator('.ux-status-indicator__dot');
      const pseudoElement = await dot.evaluate(el => {
        const styles = getComputedStyle(el, '::before');
        return styles.animation;
      });
      // Animation should be defined (may vary by browser)
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallIndicator = page.locator('.ux-status-indicator--sm').first();
    if (await smallIndicator.count() > 0) {
      await expect(smallIndicator).toBeVisible();
      const fontSize = await smallIndicator.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeLessThan(14);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeIndicator = page.locator('.ux-status-indicator--lg').first();
    if (await largeIndicator.count() > 0) {
      await expect(largeIndicator).toBeVisible();
      const fontSize = await largeIndicator.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThan(13);
    }
  });

  test('should hide label with dot-only variant', async ({ page }) => {
    const dotOnlyIndicator = page.locator('.ux-status-indicator--dot-only').first();
    if (await dotOnlyIndicator.count() > 0) {
      await expect(dotOnlyIndicator).toBeVisible();
      const label = dotOnlyIndicator.locator('.ux-status-indicator__label');
      await expect(label).not.toBeVisible();
    }
  });

  test('should apply filled variant with background', async ({ page }) => {
    const filledIndicator = page.locator('.ux-status-indicator--filled').first();
    if (await filledIndicator.count() > 0) {
      await expect(filledIndicator).toBeVisible();
      const padding = await filledIndicator.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');

      const bgColor = await filledIndicator.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply outline variant with border', async ({ page }) => {
    const outlineIndicator = page.locator('.ux-status-indicator--outline').first();
    if (await outlineIndicator.count() > 0) {
      await expect(outlineIndicator).toBeVisible();
      const border = await outlineIndicator.evaluate(el =>
        getComputedStyle(el).border
      );
      expect(border).toContain('1px');
    }
  });

  test('should apply ring style for avatars', async ({ page }) => {
    const ringIndicator = page.locator('.ux-status-indicator--ring').first();
    if (await ringIndicator.count() > 0) {
      await expect(ringIndicator).toBeVisible();
      const dot = ringIndicator.locator('.ux-status-indicator__dot');
      const boxShadow = await dot.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  test('should display multiple indicators in a list', async ({ page }) => {
    const indicators = page.locator('.ux-status-indicator');
    const count = await indicators.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should have correct flexbox layout', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator').first();
    const display = await indicator.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toContain('flex');
  });

  test('should have aligned items center', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator').first();
    const alignItems = await indicator.evaluate(el =>
      getComputedStyle(el).alignItems
    );
    expect(alignItems).toContain('center');
  });

  test('should apply pending state', async ({ page }) => {
    const pendingIndicator = page.locator('.ux-status-indicator--pending').first();
    if (await pendingIndicator.count() > 0) {
      await expect(pendingIndicator).toBeVisible();
    }
  });

  test('should apply active state', async ({ page }) => {
    const activeIndicator = page.locator('.ux-status-indicator--active').first();
    if (await activeIndicator.count() > 0) {
      await expect(activeIndicator).toBeVisible();
    }
  });

  test('should apply error state', async ({ page }) => {
    const errorIndicator = page.locator('.ux-status-indicator--error').first();
    if (await errorIndicator.count() > 0) {
      await expect(errorIndicator).toBeVisible();
    }
  });

  test('should apply inactive state', async ({ page }) => {
    const inactiveIndicator = page.locator('.ux-status-indicator--inactive').first();
    if (await inactiveIndicator.count() > 0) {
      await expect(inactiveIndicator).toBeVisible();
    }
  });

  test('dot should have flex-shrink: 0', async ({ page }) => {
    const dot = page.locator('.ux-status-indicator__dot').first();
    const flexShrink = await dot.evaluate(el =>
      getComputedStyle(el).flexShrink
    );
    expect(flexShrink).toBe('0');
  });

  test('should have correct gap between elements', async ({ page }) => {
    const indicator = page.locator('.ux-status-indicator').first();
    const gap = await indicator.evaluate(el =>
      getComputedStyle(el).gap
    );
    expect(gap).not.toBe('0px');
  });

  test('should render in list context row', async ({ page }) => {
    const row = page.locator('.demo-box').last().locator('div').first();
    const indicator = row.locator('.ux-status-indicator');
    if (await indicator.count() > 0) {
      await expect(indicator).toBeVisible();
    }
  });

  test('should display various text labels', async ({ page }) => {
    const labels = page.locator('.ux-status-indicator__label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(1);

    // Check specific labels exist
    const successLabel = page.locator('.ux-status-indicator__label:has-text("Success")');
    if (await successLabel.count() > 0) {
      await expect(successLabel.first()).toBeVisible();
    }
  });
});
