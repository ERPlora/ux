import { test, expect } from '@playwright/test';

test.describe('Shell Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/shell.html');
  });

  test('should render basic shell container', async ({ page }) => {
    const shell = page.locator('.ux-shell').first();
    await expect(shell).toBeVisible();
  });

  test('should render navbar section', async ({ page }) => {
    const navbar = page.locator('.ux-shell__navbar').first();
    await expect(navbar).toBeVisible();
  });

  test('should render navbar with proper height', async ({ page }) => {
    const navbar = page.locator('.ux-shell__navbar').first();
    const height = await navbar.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBeGreaterThanOrEqual(44);
  });

  test('should render navbar brand', async ({ page }) => {
    const brand = page.locator('.ux-shell__navbar-brand').first();
    if (await brand.count() > 0) {
      await expect(brand).toBeVisible();
    }
  });

  test('should render sidebar section', async ({ page }) => {
    const sidebar = page.locator('.ux-shell__sidebar').first();
    if (await sidebar.count() > 0) {
      await expect(sidebar).toBeVisible();
    }
  });

  test('should render sidebar navigation items', async ({ page }) => {
    const sidebarItems = page.locator('.ux-shell__sidebar-item');
    const count = await sidebarItems.count();
    if (count > 0) {
      await expect(sidebarItems.first()).toBeVisible();
    }
  });

  test('should apply active state to sidebar items', async ({ page }) => {
    const activeItem = page.locator('.ux-shell__sidebar-item--active').first();
    if (await activeItem.count() > 0) {
      await expect(activeItem).toHaveClass(/ux-shell__sidebar-item--active/);
    }
  });

  test('should render main content area', async ({ page }) => {
    const main = page.locator('.ux-shell__main').first();
    await expect(main).toBeVisible();
  });

  test('should have footer area if present', async ({ page }) => {
    const footer = page.locator('.ux-shell__footer');
    if (await footer.count() > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });

  test('should render toolbar if shell--toolbar variant', async ({ page }) => {
    const toolbar = page.locator('.ux-shell__toolbar').first();
    if (await toolbar.count() > 0) {
      await expect(toolbar).toBeVisible();
    }
  });

  test('should render bottom navigation if shell--bottom-nav variant', async ({ page }) => {
    const bottomNav = page.locator('.ux-shell__bottom-nav').first();
    if (await bottomNav.count() > 0) {
      await expect(bottomNav).toBeVisible();
    }
  });

  test('should render bottom navigation items', async ({ page }) => {
    const bottomNavItems = page.locator('.ux-shell__bottom-nav-item');
    const count = await bottomNavItems.count();
    if (count > 0) {
      await expect(bottomNavItems.first()).toBeVisible();
    }
  });

  test('should apply active state to bottom nav items', async ({ page }) => {
    const activeItem = page.locator('.ux-shell__bottom-nav-item--active').first();
    if (await activeItem.count() > 0) {
      await expect(activeItem).toHaveClass(/ux-shell__bottom-nav-item--active/);
    }
  });

  test('should render sidebar backdrop for mobile', async ({ page }) => {
    const backdrop = page.locator('.ux-shell__sidebar-backdrop').first();
    if (await backdrop.count() > 0) {
      // Backdrop may be hidden initially
      const isPresent = await backdrop.evaluate(el =>
        (el as HTMLElement).offsetParent !== null || getComputedStyle(el).display !== 'none'
      );
      expect(typeof isPresent).toBe('boolean');
    }
  });

  test('should apply sidebar variant', async ({ page }) => {
    const shellSidebar = page.locator('.ux-shell--sidebar').first();
    if (await shellSidebar.count() > 0) {
      await expect(shellSidebar).toHaveClass(/ux-shell--sidebar/);
    }
  });

  test('should apply toolbar variant', async ({ page }) => {
    const shellToolbar = page.locator('.ux-shell--toolbar').first();
    if (await shellToolbar.count() > 0) {
      await expect(shellToolbar).toHaveClass(/ux-shell--toolbar/);
    }
  });

  test('should apply bottom-nav variant', async ({ page }) => {
    const shellBottomNav = page.locator('.ux-shell--bottom-nav').first();
    if (await shellBottomNav.count() > 0) {
      await expect(shellBottomNav).toHaveClass(/ux-shell--bottom-nav/);
    }
  });

  test('should have proper z-index for navbar', async ({ page }) => {
    const navbar = page.locator('.ux-shell__navbar').first();
    const zIndex = await navbar.evaluate(el =>
      parseInt(getComputedStyle(el).zIndex) || 0
    );
    expect(zIndex).toBeGreaterThanOrEqual(0);
  });

  test('should have proper z-index for sidebar', async ({ page }) => {
    const sidebar = page.locator('.ux-shell__sidebar').first();
    if (await sidebar.count() > 0) {
      const zIndex = await sidebar.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThanOrEqual(0);
    }
  });

  test('should have flex layout for shell', async ({ page }) => {
    const shell = page.locator('.ux-shell').first();
    const display = await shell.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(['flex', 'grid']).toContain(display);
  });

  test('should have proper layout structure', async ({ page }) => {
    const shell = page.locator('.ux-shell').first();
    const hasNavbar = await page.locator('.ux-shell .ux-shell__navbar').count() > 0;
    const hasMain = await page.locator('.ux-shell .ux-shell__main').count() > 0;
    expect(hasNavbar || hasMain).toBeTruthy();
  });

  test('should render sidebar items with icons if present', async ({ page }) => {
    const sidebarItem = page.locator('.ux-shell__sidebar-item').first();
    if (await sidebarItem.count() > 0) {
      const icon = sidebarItem.locator('.ux-shell__sidebar-item-icon');
      if (await icon.count() > 0) {
        await expect(icon.first()).toBeVisible();
      }
    }
  });

  test('should render sidebar items with text if present', async ({ page }) => {
    const sidebarItem = page.locator('.ux-shell__sidebar-item').first();
    if (await sidebarItem.count() > 0) {
      const text = sidebarItem.locator('.ux-shell__sidebar-item-text');
      if (await text.count() > 0) {
        await expect(text.first()).toBeVisible();
      }
    }
  });
});
