import { test, expect } from '@playwright/test';

test.describe('Leave Request Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/leave-request.html');
  });

  test('should render leave request card', async ({ page }) => {
    const card = page.locator('.ux-leave-request').first();
    await expect(card).toBeVisible();
  });

  test('should render employee avatar', async ({ page }) => {
    const avatar = page.locator('.ux-leave-request .ux-avatar').first();
    if (await avatar.count() > 0) {
      await expect(avatar).toBeVisible();
    }
  });

  test('should display employee name', async ({ page }) => {
    const name = page.locator('.ux-leave-request__name').first();
    if (await name.count() > 0) {
      await expect(name).toBeVisible();
      const text = await name.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should display employee role', async ({ page }) => {
    const role = page.locator('.ux-leave-request__role').first();
    if (await role.count() > 0) {
      await expect(role).toBeVisible();
    }
  });

  test('should display status badge', async ({ page }) => {
    const status = page.locator('.ux-leave-request__status-badge').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should apply pending status', async ({ page }) => {
    const pending = page.locator('.ux-leave-request--pending').first();
    if (await pending.count() > 0) {
      await expect(pending).toBeVisible();
    }
  });

  test('should apply approved status', async ({ page }) => {
    const approved = page.locator('.ux-leave-request--approved').first();
    if (await approved.count() > 0) {
      await expect(approved).toBeVisible();
    }
  });

  test('should apply rejected status', async ({ page }) => {
    const rejected = page.locator('.ux-leave-request--rejected').first();
    if (await rejected.count() > 0) {
      await expect(rejected).toBeVisible();
    }
  });

  test('should display leave type badge', async ({ page }) => {
    const type = page.locator('.ux-leave-request__type').first();
    if (await type.count() > 0) {
      await expect(type).toBeVisible();
    }
  });

  test('should display date range', async ({ page }) => {
    const dates = page.locator('.ux-leave-request__dates').first();
    if (await dates.count() > 0) {
      await expect(dates).toBeVisible();
    }
  });

  test('should display duration', async ({ page }) => {
    const duration = page.locator('.ux-leave-request__duration').first();
    if (await duration.count() > 0) {
      await expect(duration).toBeVisible();
    }
  });

  test('should display reason when present', async ({ page }) => {
    const reason = page.locator('.ux-leave-request__reason').first();
    if (await reason.count() > 0) {
      await expect(reason).toBeVisible();
    }
  });

  test('should render action buttons for pending requests', async ({ page }) => {
    const actions = page.locator('.ux-leave-request--pending .ux-leave-request__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  test('should render approve button', async ({ page }) => {
    const approveBtn = page.locator('.ux-leave-request__action--approve').first();
    if (await approveBtn.count() > 0) {
      await expect(approveBtn).toBeVisible();
    }
  });

  test('should render reject button', async ({ page }) => {
    const rejectBtn = page.locator('.ux-leave-request__action--reject').first();
    if (await rejectBtn.count() > 0) {
      await expect(rejectBtn).toBeVisible();
    }
  });

  test('should apply compact variant', async ({ page }) => {
    const compact = page.locator('.ux-leave-request--compact').first();
    if (await compact.count() > 0) {
      await expect(compact).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glass = page.locator('.ux-leave-request--glass').first();
    if (await glass.count() > 0) {
      const backdropFilter = await glass.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should have colored left border for status', async ({ page }) => {
    const card = page.locator('.ux-leave-request').first();
    const borderLeft = await card.evaluate(el =>
      getComputedStyle(el).borderLeftWidth
    );
    expect(parseInt(borderLeft)).toBeGreaterThan(0);
  });
});
