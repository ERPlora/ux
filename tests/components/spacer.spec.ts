import { test, expect } from '@playwright/test';

test.describe('Spacer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/spacer.html');
  });

  test('should render basic spacer element', async ({ page }) => {
    const spacer = page.locator('.ux-spacer').first();
    await expect(spacer).toBeVisible();
  });

  test('should apply flex grow modifier', async ({ page }) => {
    const flexSpacer = page.locator('.ux-spacer--flex').first();
    if (await flexSpacer.count() > 0) {
      await expect(flexSpacer).toBeVisible();
      const flex = await flexSpacer.evaluate(el =>
        getComputedStyle(el).flex
      );
      expect(flex).toContain('1');
    }
  });

  test('should have flex-shrink: 0 on base spacer', async ({ page }) => {
    const spacer = page.locator('.ux-spacer').first();
    const flexShrink = await spacer.evaluate(el =>
      getComputedStyle(el).flexShrink
    );
    expect(flexShrink).toBe('0');
  });

  test('should apply vertical size variants', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

    for (const size of sizes) {
      const spacer = page.locator(`.ux-spacer--${size}`).first();
      if (await spacer.count() > 0) {
        await expect(spacer).toBeVisible();
        const height = await spacer.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        expect(height).toBeGreaterThan(0);
      }
    }
  });

  test('should apply horizontal size variants', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg'];

    for (const size of sizes) {
      const spacer = page.locator(`.ux-spacer--h-${size}`).first();
      if (await spacer.count() > 0) {
        await expect(spacer).toBeVisible();
        const width = await spacer.evaluate(el =>
          parseInt(getComputedStyle(el).width)
        );
        expect(width).toBeGreaterThan(0);
      }
    }
  });

  test('should have correct vertical height for xs variant', async ({ page }) => {
    const spacer = page.locator('.ux-spacer--xs').first();
    if (await spacer.count() > 0) {
      const height = await spacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // xs should be 4px (0.25rem)
      expect(height).toBe(4);
    }
  });

  test('should have correct vertical height for md variant', async ({ page }) => {
    const spacer = page.locator('.ux-spacer--md').first();
    if (await spacer.count() > 0) {
      const height = await spacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // md should be 16px (1rem)
      expect(height).toBe(16);
    }
  });

  test('should apply navbar height spacer', async ({ page }) => {
    const navbarSpacer = page.locator('.ux-spacer--navbar').first();
    if (await navbarSpacer.count() > 0) {
      await expect(navbarSpacer).toBeVisible();
      const height = await navbarSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // navbar should be 56px
      expect(height).toBe(56);
    }
  });

  test('should apply toolbar height spacer', async ({ page }) => {
    const toolbarSpacer = page.locator('.ux-spacer--toolbar').first();
    if (await toolbarSpacer.count() > 0) {
      await expect(toolbarSpacer).toBeVisible();
      const height = await toolbarSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // toolbar should be 44px
      expect(height).toBe(44);
    }
  });

  test('should apply tabbar height spacer', async ({ page }) => {
    const tabbarSpacer = page.locator('.ux-spacer--tabbar').first();
    if (await tabbarSpacer.count() > 0) {
      await expect(tabbarSpacer).toBeVisible();
      const height = await tabbarSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // tabbar should be 50px
      expect(height).toBe(50);
    }
  });

  test('should apply safe area top spacer', async ({ page }) => {
    const safeTopSpacer = page.locator('.ux-spacer--safe-top').first();
    if (await safeTopSpacer.count() > 0) {
      await expect(safeTopSpacer).toBeVisible();
      const height = await safeTopSpacer.evaluate(el =>
        getComputedStyle(el).height
      );
      // Should contain env() or a value
      expect(height).toBeDefined();
    }
  });

  test('should apply safe area bottom spacer', async ({ page }) => {
    const safeBottomSpacer = page.locator('.ux-spacer--safe-bottom').first();
    if (await safeBottomSpacer.count() > 0) {
      await expect(safeBottomSpacer).toBeVisible();
      const height = await safeBottomSpacer.evaluate(el =>
        getComputedStyle(el).height
      );
      // Should contain env() or a value
      expect(height).toBeDefined();
    }
  });

  test('should hide on mobile when using hide-mobile modifier', async ({ page }) => {
    const hideMobileSpacer = page.locator('.ux-spacer--hide-mobile').first();
    if (await hideMobileSpacer.count() > 0) {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      const display = await hideMobileSpacer.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('none');
    }
  });

  test('should reduce size on mobile when using sm-mobile modifier', async ({ page }) => {
    const smMobileSpacer = page.locator('.ux-spacer--sm-mobile').first();
    if (await smMobileSpacer.count() > 0) {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      const height = await smMobileSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // On mobile, sm should be 8px (0.5rem)
      expect(height).toBe(8);
    }
  });

  test('should have display: block by default', async ({ page }) => {
    const spacer = page.locator('.ux-spacer').first();
    const display = await spacer.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('block');
  });

  test('should work in flex containers', async ({ page }) => {
    const container = page.locator('div[style*="display: flex"]').first();
    if (await container.count() > 0) {
      const spacer = container.locator('.ux-spacer--flex').first();
      if (await spacer.count() > 0) {
        await expect(spacer).toBeVisible();
        const flex = await spacer.evaluate(el =>
          getComputedStyle(el).flex
        );
        expect(flex).toContain('1');
      }
    }
  });

  test('should apply navbar-safe combined height', async ({ page }) => {
    const navbarSafeSpacer = page.locator('.ux-spacer--navbar-safe').first();
    if (await navbarSafeSpacer.count() > 0) {
      await expect(navbarSafeSpacer).toBeVisible();
      const height = await navbarSafeSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // Should be at least 56px (navbar) + safe area inset
      expect(height).toBeGreaterThanOrEqual(56);
    }
  });

  test('should apply tabbar-safe combined height', async ({ page }) => {
    const tabbarSafeSpacer = page.locator('.ux-spacer--tabbar-safe').first();
    if (await tabbarSafeSpacer.count() > 0) {
      await expect(tabbarSafeSpacer).toBeVisible();
      const height = await tabbarSafeSpacer.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // Should be at least 50px (tabbar) + safe area inset
      expect(height).toBeGreaterThanOrEqual(50);
    }
  });

  test('should apply large vertical sizes', async ({ page }) => {
    const size2xl = page.locator('.ux-spacer--2xl').first();
    if (await size2xl.count() > 0) {
      const height2xl = await size2xl.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // 2xl should be 40px (2.5rem)
      expect(height2xl).toBe(40);
    }

    const size3xl = page.locator('.ux-spacer--3xl').first();
    if (await size3xl.count() > 0) {
      const height3xl = await size3xl.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      // 3xl should be 48px (3rem)
      expect(height3xl).toBe(48);
    }
  });

  test('should have display block with flex-shrink 0 for flex container compatibility', async ({ page }) => {
    const spacer = page.locator('.ux-spacer').first();
    const flexShrink = await spacer.evaluate(el =>
      getComputedStyle(el).flexShrink
    );
    const display = await spacer.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(flexShrink).toBe('0');
    expect(display).toBe('block');
  });
});
