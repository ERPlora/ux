import { test, expect } from '@playwright/test';

test.describe('Avatar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/avatar.html');
  });

  test('should render basic avatar', async ({ page }) => {
    const avatar = page.locator('.ux-avatar').first();
    await expect(avatar).toBeVisible();
  });

  test('should render avatar with image', async ({ page }) => {
    const avatarImage = page.locator('.ux-avatar img').first();
    if (await avatarImage.count() > 0) {
      await expect(avatarImage).toBeVisible();
    }
  });

  test('should render avatar with initials', async ({ page }) => {
    const avatarInitials = page.locator('.ux-avatar:not(:has(img))').first();
    if (await avatarInitials.count() > 0) {
      const text = await avatarInitials.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should have circular shape', async ({ page }) => {
    const avatar = page.locator('.ux-avatar').first();
    const borderRadius = await avatar.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toContain('50%');
  });

  test('should apply size variants', async ({ page }) => {
    const smallAvatar = page.locator('.ux-avatar--sm').first();
    if (await smallAvatar.count() > 0) {
      const size = await smallAvatar.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeLessThan(48);
    }

    const largeAvatar = page.locator('.ux-avatar--lg').first();
    if (await largeAvatar.count() > 0) {
      const size = await largeAvatar.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeGreaterThan(48);
    }
  });

  test('should apply color variants', async ({ page }) => {
    const coloredAvatar = page.locator('.ux-avatar.ux-color-primary, .ux-avatar--primary').first();
    if (await coloredAvatar.count() > 0) {
      await expect(coloredAvatar).toBeVisible();
    }
  });

  test('should render avatar group', async ({ page }) => {
    const avatarGroup = page.locator('.ux-avatar-group').first();
    if (await avatarGroup.count() > 0) {
      await expect(avatarGroup).toBeVisible();
      const avatars = avatarGroup.locator('.ux-avatar');
      expect(await avatars.count()).toBeGreaterThan(1);
    }
  });

  test('should render status indicator', async ({ page }) => {
    const statusIndicator = page.locator('.ux-avatar__status, .ux-avatar .status').first();
    if (await statusIndicator.count() > 0) {
      await expect(statusIndicator).toBeVisible();
    }
  });

  test('should be equal width and height', async ({ page }) => {
    const avatar = page.locator('.ux-avatar').first();
    const width = await avatar.evaluate(el => parseInt(getComputedStyle(el).width));
    const height = await avatar.evaluate(el => parseInt(getComputedStyle(el).height));
    expect(width).toBe(height);
  });
});
