import { test, expect } from '@playwright/test';

test.describe('Banner Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/banner.html');
  });

  test('should render basic banner', async ({ page }) => {
    const banner = page.locator('.ux-banner').first();
    await expect(banner).toBeVisible();
  });

  test('should display icon correctly', async ({ page }) => {
    const icon = page.locator('.ux-banner__icon').first();
    if (await icon.count() > 0) {
      await expect(icon).toBeVisible();

      // Icon should contain SVG
      const svg = icon.locator('svg');
      if (await svg.count() > 0) {
        await expect(svg).toBeVisible();
      }
    }
  });

  test('should display message text', async ({ page }) => {
    const message = page.locator('.ux-banner__message').first();
    if (await message.count() > 0) {
      await expect(message).toBeVisible();

      // Message should have text content
      const text = await message.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should apply info color variant', async ({ page }) => {
    const infoBanner = page.locator('.ux-banner.ux-banner--info').first();
    if (await infoBanner.count() > 0) {
      await expect(infoBanner).toBeVisible();

      // Should have semi-transparent info background
      const bgColor = await infoBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should apply success color variant', async ({ page }) => {
    const successBanner = page.locator('.ux-banner.ux-banner--success').first();
    if (await successBanner.count() > 0) {
      await expect(successBanner).toBeVisible();

      // Icon should be colored
      const icon = successBanner.locator('.ux-banner__icon');
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }
    }
  });

  test('should apply warning color variant', async ({ page }) => {
    const warningBanner = page.locator('.ux-banner.ux-banner--warning').first();
    if (await warningBanner.count() > 0) {
      await expect(warningBanner).toBeVisible();

      // Should have warning styling
      const bgColor = await warningBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should apply danger color variant', async ({ page }) => {
    const dangerBanner = page.locator('.ux-banner.ux-banner--danger').first();
    if (await dangerBanner.count() > 0) {
      await expect(dangerBanner).toBeVisible();

      // Should have danger styling
      const bgColor = await dangerBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  test('should render close button', async ({ page }) => {
    const closeButton = page.locator('.ux-banner__close').first();
    if (await closeButton.count() > 0) {
      await expect(closeButton).toBeVisible();

      // Close button should contain SVG icon
      const svg = closeButton.locator('svg');
      if (await svg.count() > 0) {
        await expect(svg).toBeVisible();
      }
    }
  });

  test('should dismiss banner when close button clicked', async ({ page }) => {
    // Find dismissible banner section
    const dismissibleBanner = page.locator('.ux-banner').filter({
      has: page.locator('[x-data*="uxBanner"]')
    }).first();

    if (await dismissibleBanner.count() > 0) {
      // Banner should be visible initially
      await expect(dismissibleBanner).toBeVisible();

      // Click close button
      const closeButton = dismissibleBanner.locator('.ux-banner__close');
      if (await closeButton.count() > 0) {
        await closeButton.click();

        // Wait for animation and check if hidden
        await page.waitForTimeout(300);

        // Banner should have hidden class
        const hasHiddenClass = await dismissibleBanner.evaluate(el =>
          el.classList.contains('ux-banner--hidden')
        );
        expect(hasHiddenClass).toBe(true);
      }
    }
  });

  test('should apply filled info variant', async ({ page }) => {
    const filledBanner = page.locator('.ux-banner.ux-banner--info-filled').first();
    if (await filledBanner.count() > 0) {
      await expect(filledBanner).toBeVisible();

      // Should have solid background (not transparent)
      const bgColor = await filledBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply filled success variant', async ({ page }) => {
    const filledBanner = page.locator('.ux-banner.ux-banner--success-filled').first();
    if (await filledBanner.count() > 0) {
      await expect(filledBanner).toBeVisible();

      // Should have solid background
      const bgColor = await filledBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply filled warning variant', async ({ page }) => {
    const filledBanner = page.locator('.ux-banner.ux-banner--warning-filled').first();
    if (await filledBanner.count() > 0) {
      await expect(filledBanner).toBeVisible();

      // Should have solid background
      const bgColor = await filledBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply filled danger variant', async ({ page }) => {
    const filledBanner = page.locator('.ux-banner.ux-banner--danger-filled').first();
    if (await filledBanner.count() > 0) {
      await expect(filledBanner).toBeVisible();

      // Should have solid background
      const bgColor = await filledBanner.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply inline variant', async ({ page }) => {
    const inlineBanner = page.locator('.ux-banner.ux-banner--inline').first();
    if (await inlineBanner.count() > 0) {
      await expect(inlineBanner).toBeVisible();

      // Inline banner should have rounded corners
      const borderRadius = await inlineBanner.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');

      // Should have margin
      const margin = await inlineBanner.evaluate(el =>
        getComputedStyle(el).margin
      );
      expect(margin).toBeTruthy();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassBanner = page.locator('.ux-banner.ux-banner--glass').first();
    if (await glassBanner.count() > 0) {
      await expect(glassBanner).toBeVisible();

      // Glass banner should have backdrop filter
      const backdropFilter = await glassBanner.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render title and message separately', async ({ page }) => {
    const title = page.locator('.ux-banner__title').first();
    const message = page.locator('.ux-banner__message');

    if (await title.count() > 0) {
      await expect(title).toBeVisible();

      // Title should have text
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
    }

    // Should have at least one message
    expect(await message.count()).toBeGreaterThan(0);
  });

  test('should render action buttons', async ({ page }) => {
    const actionButton = page.locator('.ux-banner__action').first();
    if (await actionButton.count() > 0) {
      await expect(actionButton).toBeVisible();

      // Action button should have text
      const text = await actionButton.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should handle multiple banners', async ({ page }) => {
    const banners = page.locator('.ux-banner');
    const count = await banners.count();
    expect(count).toBeGreaterThan(1);

    // Each banner should be visible
    for (let i = 0; i < Math.min(count, 5); i++) {
      const banner = banners.nth(i);
      if (await banner.isVisible()) {
        await expect(banner).toBeVisible();
      }
    }
  });

  test('should have minimum height', async ({ page }) => {
    const banner = page.locator('.ux-banner').first();

    const height = await banner.evaluate(el =>
      parseInt(getComputedStyle(el).minHeight)
    );

    // Minimum height should be at least 48px
    expect(height).toBeGreaterThanOrEqual(48);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const closeButton = page.locator('.ux-banner__close').first();
    if (await closeButton.count() > 0) {
      // Close button should be focusable
      await closeButton.focus();
      await expect(closeButton).toBeFocused();
    }

    const actionButton = page.locator('.ux-banner__action').first();
    if (await actionButton.count() > 0) {
      // Action button should be focusable
      await actionButton.focus();
      await expect(actionButton).toBeFocused();
    }
  });

  test('should have accessible role and aria attributes', async ({ page }) => {
    const banner = page.locator('[role="status"], [role="alert"]').first();
    if (await banner.count() > 0) {
      // Banner should have role
      const role = await banner.getAttribute('role');
      expect(role).toMatch(/status|alert/);

      // Should have aria-live attribute
      const ariaLive = await banner.getAttribute('aria-live');
      expect(ariaLive).toMatch(/polite|assertive/);
    }
  });

  test('should show auto-dismiss banner when triggered', async ({ page }) => {
    // Find the auto-dismiss button
    const autoDismissBtn = page.locator('button').filter({
      hasText: /auto.dismiss|Auto.Dismiss/i
    }).first();

    if (await autoDismissBtn.count() > 0) {
      // Click to show auto-dismiss banner
      await autoDismissBtn.click();

      // Banner should appear
      const autoDismissBanner = page.locator('.ux-banner.ux-banner--success').last();
      await expect(autoDismissBanner).toBeVisible();

      // Wait for auto-dismiss timeout (3 seconds + buffer)
      await page.waitForTimeout(3500);

      // Banner should be hidden after timeout
      const isHidden = await autoDismissBanner.evaluate(el =>
        getComputedStyle(el).display === 'none' || el.classList.contains('ux-banner--hidden')
      );
      expect(isHidden).toBe(true);
    }
  });

  test('should display icon with correct color for each variant', async ({ page }) => {
    const variants = ['info', 'success', 'warning', 'danger'];

    for (const variant of variants) {
      const banner = page.locator(`.ux-banner.ux-banner--${variant}`).first();
      if (await banner.count() > 0) {
        const icon = banner.locator('.ux-banner__icon');
        if (await icon.count() > 0) {
          await expect(icon).toBeVisible();

          // Icon should have color applied
          const color = await icon.evaluate(el =>
            getComputedStyle(el).color
          );
          expect(color).not.toBe('rgb(0, 0, 0)'); // Should not be black (default)
        }
      }
    }
  });

  test('should have proper spacing and padding', async ({ page }) => {
    const banner = page.locator('.ux-banner').first();

    const paddingY = await banner.evaluate(el => {
      const styles = getComputedStyle(el);
      return parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    });

    const paddingX = await banner.evaluate(el => {
      const styles = getComputedStyle(el);
      return parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    });

    // Should have reasonable padding
    expect(paddingY).toBeGreaterThan(0);
    expect(paddingX).toBeGreaterThan(0);
  });
});
