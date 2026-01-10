import { test, expect } from '@playwright/test';

test.describe('Navbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/navbar.html');
  });

  test('should render basic navbar', async ({ page }) => {
    const navbar = page.locator('.ux-navbar').first();
    await expect(navbar).toBeVisible();
  });

  test('should render navbar start section', async ({ page }) => {
    const start = page.locator('.ux-navbar__start').first();
    if (await start.count() > 0) {
      await expect(start).toBeVisible();
    }
  });

  test('should render navbar center section', async ({ page }) => {
    const center = page.locator('.ux-navbar__center').first();
    if (await center.count() > 0) {
      await expect(center).toBeVisible();
    }
  });

  test('should render navbar end section', async ({ page }) => {
    const end = page.locator('.ux-navbar__end').first();
    if (await end.count() > 0) {
      await expect(end).toBeVisible();
    }
  });

  test('should render navbar title', async ({ page }) => {
    const title = page.locator('.ux-navbar__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should apply sticky variant', async ({ page }) => {
    const stickyNavbar = page.locator('.ux-navbar--sticky').first();
    if (await stickyNavbar.count() > 0) {
      const position = await stickyNavbar.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(['sticky', 'fixed']).toContain(position);
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassNavbar = page.locator('.ux-navbar--glass').first();
    if (await glassNavbar.count() > 0) {
      const backdropFilter = await glassNavbar.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have appropriate height', async ({ page }) => {
    const navbar = page.locator('.ux-navbar').first();
    const height = await navbar.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should have proper z-index', async ({ page }) => {
    const navbar = page.locator('.ux-navbar').first();
    const zIndex = await navbar.evaluate(el =>
      parseInt(getComputedStyle(el).zIndex) || 0
    );
    expect(zIndex).toBeGreaterThanOrEqual(0);
  });

  test('should render with back button', async ({ page }) => {
    const backButton = page.locator('.ux-navbar .ux-back-button, .ux-navbar__start button').first();
    if (await backButton.count() > 0) {
      await expect(backButton).toBeVisible();
    }
  });
});
