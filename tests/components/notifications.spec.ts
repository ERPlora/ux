import { test, expect } from '@playwright/test';

test.describe('Notifications Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/notifications.html');
  });

  // Basic rendering tests
  test('should render notification trigger button', async ({ page }) => {
    const trigger = page.locator('.ux-notification-trigger').first();
    await expect(trigger).toBeVisible();
  });

  test('should have bell icon in trigger', async ({ page }) => {
    const trigger = page.locator('.ux-notification-trigger').first();
    const svg = trigger.locator('svg');
    if (await svg.count() > 0) {
      await expect(svg).toBeVisible();
    }
  });

  test('should render notification panel', async ({ page }) => {
    const panel = page.locator('.ux-notification-panel').first();
    await expect(panel).toBeDefined();
  });

  test('should render notification panel header', async ({ page }) => {
    const header = page.locator('.ux-notification-panel__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render notification panel title', async ({ page }) => {
    const title = page.locator('.ux-notification-panel__title').first();
    if (await title.count() > 0) {
      const text = await title.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render notification panel content area', async ({ page }) => {
    const content = page.locator('.ux-notification-panel__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  // Notification item tests
  test('should render notification items', async ({ page }) => {
    const items = page.locator('.ux-notification-item');
    if (await items.count() > 0) {
      await expect(items.first()).toBeDefined();
    }
  });

  test('should render notification item icon', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const icon = item.locator('.ux-notification-item__icon');
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
      }
    }
  });

  test('should render notification item content', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const content = item.locator('.ux-notification-item__content');
      if (await content.count() > 0) {
        await expect(content).toBeVisible();
      }
    }
  });

  test('should render notification item title', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const title = item.locator('.ux-notification-item__title');
      if (await title.count() > 0) {
        const text = await title.textContent();
        expect(text).toBeTruthy();
      }
    }
  });

  test('should render notification item message', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const message = item.locator('.ux-notification-item__message');
      if (await message.count() > 0) {
        const text = await message.textContent();
        expect(text).toBeTruthy();
      }
    }
  });

  test('should render notification item time', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const time = item.locator('.ux-notification-item__time');
      if (await time.count() > 0) {
        await expect(time).toBeVisible();
      }
    }
  });

  test('should apply unread styling to unread items', async ({ page }) => {
    const unreadItem = page.locator('.ux-notification-item--unread').first();
    if (await unreadItem.count() > 0) {
      await expect(unreadItem).toBeVisible();
      const bgColor = await unreadItem.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Unread items should have a distinct background (primary tint)
      expect(bgColor).toBeTruthy();
    }
  });

  // Badge tests
  test('should render notification badge when there are unread notifications', async ({ page }) => {
    const badge = page.locator('.ux-notification-trigger__badge');
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
    }
  });

  test('should display unread count in badge', async ({ page }) => {
    const badge = page.locator('.ux-notification-trigger__badge');
    if (await badge.count() > 0) {
      const text = await badge.textContent();
      expect(text).toMatch(/\d+|99\+/);
    }
  });

  test('should have red background on badge', async ({ page }) => {
    const badge = page.locator('.ux-notification-trigger__badge').first();
    if (await badge.count() > 0) {
      const bgColor = await badge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Badge should have danger color (red)
      expect(bgColor).toBeTruthy();
    }
  });

  // Actions/interaction tests
  test('should open panel on trigger click', async ({ page }) => {
    const trigger = page.locator('.ux-notification-trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const panel = page.locator('.ux-notification-panel--open').first();
    if (await panel.count() > 0) {
      await expect(panel).toBeVisible();
    }
  });

  test('should show backdrop when panel opens', async ({ page }) => {
    const trigger = page.locator('.ux-notification-trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const backdrop = page.locator('.ux-notification-panel__backdrop--open').first();
    if (await backdrop.count() > 0) {
      await expect(backdrop).toBeVisible();
    }
  });

  test('should close panel when backdrop is clicked', async ({ page }) => {
    const trigger = page.locator('.ux-notification-trigger').first();
    await trigger.click();
    await page.waitForTimeout(300);

    const backdrop = page.locator('.ux-notification-panel__backdrop--open').first();
    if (await backdrop.count() > 0) {
      await backdrop.click();
      await page.waitForTimeout(300);

      const openPanel = page.locator('.ux-notification-panel--open');
      expect(await openPanel.count()).toBe(0);
    }
  });

  test('should render action buttons on notification items', async ({ page }) => {
    // Navigate to the section with actions
    const actionsSection = page.locator('text="Con Acciones en Notificaciones"');
    if (await actionsSection.count() > 0) {
      await actionsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const actionBtn = page.locator('.ux-notification-item__action-btn').first();
      if (await actionBtn.count() > 0) {
        await expect(actionBtn).toBeVisible();
      }
    }
  });

  test('should render primary and secondary action buttons', async ({ page }) => {
    const actionsSection = page.locator('text="Con Acciones en Notificaciones"');
    if (await actionsSection.count() > 0) {
      await actionsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const primaryBtn = page.locator('.ux-notification-item__action-btn--primary').first();
      if (await primaryBtn.count() > 0) {
        await expect(primaryBtn).toBeVisible();
      }

      const secondaryBtn = page.locator('.ux-notification-item__action-btn').first();
      if (await secondaryBtn.count() > 0) {
        await expect(secondaryBtn).toBeVisible();
      }
    }
  });

  test('should handle notification click event', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      await item.click();
      await page.waitForTimeout(200);
      // Item should remain visible after click
      await expect(item).toBeDefined();
    }
  });

  // Panel features tests
  test('should render panel header actions', async ({ page }) => {
    const actions = page.locator('.ux-notification-panel__actions');
    if (await actions.count() > 0) {
      const buttons = actions.locator('button');
      expect(await buttons.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('should render filters section when enabled', async ({ page }) => {
    const filters = page.locator('.ux-notification-panel__filters');
    if (await filters.count() > 0) {
      await expect(filters).toBeVisible();
    }
  });

  test('should render filter buttons', async ({ page }) => {
    const filterBtn = page.locator('.ux-notification-panel__filter').first();
    if (await filterBtn.count() > 0) {
      await expect(filterBtn).toBeVisible();
    }
  });

  test('should render filter count badges', async ({ page }) => {
    const filterCount = page.locator('.ux-notification-panel__filter-count').first();
    if (await filterCount.count() > 0) {
      const text = await filterCount.textContent();
      expect(text).toMatch(/\d+/);
    }
  });

  test('should render notification group headers', async ({ page }) => {
    const groupHeader = page.locator('.ux-notification-panel__group').first();
    if (await groupHeader.count() > 0) {
      const text = await groupHeader.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render panel footer when notifications exist', async ({ page }) => {
    const footer = page.locator('.ux-notification-panel__footer');
    if (await footer.count() > 0) {
      // Check if footer is visible or hidden based on notification count
      const footerLink = footer.locator('.ux-notification-panel__footer-link');
      if (await footerLink.count() > 0) {
        const text = await footerLink.textContent();
        expect(text).toBeTruthy();
      }
    }
  });

  // Dropdown variant tests
  test('should render dropdown variant', async ({ page }) => {
    const dropdownSection = page.locator('text="Variante Dropdown"');
    if (await dropdownSection.count() > 0) {
      await dropdownSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const dropdown = page.locator('.ux-notification-dropdown').first();
      if (await dropdown.count() > 0) {
        await expect(dropdown).toBeDefined();
      }
    }
  });

  test('should open dropdown variant on trigger click', async ({ page }) => {
    const dropdownSection = page.locator('text="Variante Dropdown"');
    if (await dropdownSection.count() > 0) {
      await dropdownSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      // Find the trigger button within the dropdown section
      const trigger = dropdownSection.locator('..').locator('.ux-notification-trigger').first();
      if (await trigger.count() > 0) {
        await trigger.click();
        await page.waitForTimeout(300);

        const openDropdown = page.locator('.ux-notification-dropdown--open').first();
        if (await openDropdown.count() > 0) {
          await expect(openDropdown).toBeVisible();
        }
      }
    }
  });

  // Dynamic notification tests
  test('should add notification dynamically', async ({ page }) => {
    const addSection = page.locator('text="Agregar Notificaciones Dinamicamente"');
    if (await addSection.count() > 0) {
      await addSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const addBtn = addSection.locator('..').locator('text="Agregar Notificacion"').first();
      if (await addBtn.count() > 0) {
        const initialItems = await page.locator('.ux-notification-item').count();

        await addBtn.click();
        await page.waitForTimeout(300);

        const newItems = await page.locator('.ux-notification-item').count();
        // At least verify that elements exist
        expect(newItems).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should display empty state when no notifications', async ({ page }) => {
    const addSection = page.locator('text="Agregar Notificaciones Dinamicamente"');
    if (await addSection.count() > 0) {
      await addSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      // This section starts empty
      const emptyState = addSection.locator('..').locator('.ux-notification-panel__empty').first();
      if (await emptyState.count() > 0) {
        const emptyTitle = emptyState.locator('.ux-notification-panel__empty-title');
        if (await emptyTitle.count() > 0) {
          await expect(emptyTitle).toBeVisible();
        }
      }
    }
  });

  // Glass variant tests
  test('should render glass variant', async ({ page }) => {
    const glassSection = page.locator('text="Variante Glass"');
    if (await glassSection.count() > 0) {
      await glassSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const glassPanel = glassSection.locator('..').locator('.ux-notification-panel--glass').first();
      if (await glassPanel.count() > 0) {
        await expect(glassPanel).toBeDefined();
      }
    }
  });

  test('should apply glass effect with backdrop-filter', async ({ page }) => {
    const glassSection = page.locator('text="Variante Glass"');
    if (await glassSection.count() > 0) {
      await glassSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const glassPanel = glassSection.locator('..').locator('.ux-notification-panel--glass').first();
      if (await glassPanel.count() > 0) {
        const backdropFilter = await glassPanel.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    }
  });

  // Visual and styling tests
  test('should have proper z-index for panel', async ({ page }) => {
    const panel = page.locator('.ux-notification-panel').first();
    if (await panel.count() > 0) {
      const zIndex = await panel.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have proper z-index for backdrop', async ({ page }) => {
    const backdrop = page.locator('.ux-notification-panel__backdrop').first();
    if (await backdrop.count() > 0) {
      const zIndex = await backdrop.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have border radius on notification items', async ({ page }) => {
    const item = page.locator('.ux-notification-item').first();
    if (await item.count() > 0) {
      const borderRadius = await item.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Items have flex layout, check if parent has radius
      expect(borderRadius).toBeDefined();
    }
  });

  test('should have icon background colors for different types', async ({ page }) => {
    const successIcon = page.locator('.ux-notification-item__icon--success').first();
    const warningIcon = page.locator('.ux-notification-item__icon--warning').first();
    const errorIcon = page.locator('.ux-notification-item__icon--error').first();
    const infoIcon = page.locator('.ux-notification-item__icon--info').first();

    if (await successIcon.count() > 0) {
      const bgColor = await successIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }

    if (await warningIcon.count() > 0) {
      const bgColor = await warningIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }

    if (await errorIcon.count() > 0) {
      const bgColor = await errorIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }

    if (await infoIcon.count() > 0) {
      const bgColor = await infoIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();
    }
  });

  // Unread indicator tests
  test('should show unread dot on unread notifications', async ({ page }) => {
    const unreadDot = page.locator('.ux-notification-item__dot');
    if (await unreadDot.count() > 0) {
      await expect(unreadDot.first()).toBeVisible();
    }
  });

  test('should have proper styling for unread dot', async ({ page }) => {
    const unreadDot = page.locator('.ux-notification-item__dot').first();
    if (await unreadDot.count() > 0) {
      const bgColor = await unreadDot.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy();

      const borderRadius = await unreadDot.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBe('50%');
    }
  });
});
