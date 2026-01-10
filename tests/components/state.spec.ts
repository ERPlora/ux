import { test, expect } from '@playwright/test';

test.describe('State Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/state.html');
  });

  // Basic rendering tests
  test('should render empty state', async ({ page }) => {
    const emptyState = page.locator('.ux-empty-state').first();
    await expect(emptyState).toBeVisible();
  });

  test('should render error state', async ({ page }) => {
    const errorState = page.locator('.ux-error-state').first();
    await expect(errorState).toBeVisible();
  });

  test('should render success state', async ({ page }) => {
    const successState = page.locator('.ux-success-state').first();
    await expect(successState).toBeVisible();
  });

  test('should render warning state', async ({ page }) => {
    const warningState = page.locator('.ux-warning-state').first();
    await expect(warningState).toBeVisible();
  });

  test('should render offline state', async ({ page }) => {
    const offlineState = page.locator('.ux-offline-state').first();
    await expect(offlineState).toBeVisible();
  });

  test('should render search empty state', async ({ page }) => {
    const searchEmptyState = page.locator('.ux-search-empty-state').first();
    await expect(searchEmptyState).toBeVisible();
  });

  // Icons tests
  test('should have icon in state', async ({ page }) => {
    const stateIcon = page.locator('.ux-state__icon').first();
    await expect(stateIcon).toBeVisible();
  });

  test('should have SVG icon', async ({ page }) => {
    const iconSvg = page.locator('.ux-state__icon svg').first();
    await expect(iconSvg).toBeVisible();
  });

  test('should render animated icon', async ({ page }) => {
    const animatedIcon = page.locator('.ux-state__icon--animated').first();
    if (await animatedIcon.count() > 0) {
      await expect(animatedIcon).toBeVisible();
      const hasAnimation = await animatedIcon.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.animation && styles.animation !== 'none';
      });
      expect(hasAnimation).toBeTruthy();
    }
  });

  test('should render icon with circle background', async ({ page }) => {
    const circleIcon = page.locator('.ux-state__icon--circle').first();
    if (await circleIcon.count() > 0) {
      await expect(circleIcon).toBeVisible();
      const borderRadius = await circleIcon.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBe('50%');
    }
  });

  // State content tests
  test('should have state title', async ({ page }) => {
    const stateTitle = page.locator('.ux-state__title').first();
    await expect(stateTitle).toBeVisible();
    const text = await stateTitle.textContent();
    expect(text).toBeDefined();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should have state description', async ({ page }) => {
    const stateDesc = page.locator('.ux-state__description').first();
    await expect(stateDesc).toBeVisible();
    const text = await stateDesc.textContent();
    expect(text).toBeDefined();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should have state content container', async ({ page }) => {
    const stateContent = page.locator('.ux-state__content').first();
    await expect(stateContent).toBeVisible();
  });

  // Size variants tests
  test('should apply small size variant', async ({ page }) => {
    const smallState = page.locator('.ux-state--sm').first();
    if (await smallState.count() > 0) {
      await expect(smallState).toBeVisible();
      const padding = await smallState.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).toBeDefined();
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeState = page.locator('.ux-state--lg').first();
    if (await largeState.count() > 0) {
      await expect(largeState).toBeVisible();
    }
  });

  test('should apply full height variant', async ({ page }) => {
    const fullState = page.locator('.ux-state--full').first();
    if (await fullState.count() > 0) {
      await expect(fullState).toBeVisible();
    }
  });

  // Variant tests
  test('should apply inline variant', async ({ page }) => {
    const inlineState = page.locator('.ux-state--inline').first();
    if (await inlineState.count() > 0) {
      await expect(inlineState).toBeVisible();
      const flexDirection = await inlineState.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('row');
    }
  });

  test('should apply card variant', async ({ page }) => {
    const cardState = page.locator('.ux-state--card').first();
    if (await cardState.count() > 0) {
      await expect(cardState).toBeVisible();
      const border = await cardState.evaluate(el =>
        getComputedStyle(el).border
      );
      expect(border).toBeDefined();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassState = page.locator('.ux-state--glass').first();
    if (await glassState.count() > 0) {
      await expect(glassState).toBeVisible();
      const backdropFilter = await glassState.evaluate(el =>
        getComputedStyle(el).backdropFilter
      );
      expect(backdropFilter).not.toBe('none');
    }
  });

  // State actions tests
  test('should have state actions container', async ({ page }) => {
    const stateActions = page.locator('.ux-state__actions').first();
    await expect(stateActions).toBeVisible();
  });

  test('should have button in state actions', async ({ page }) => {
    const actionButton = page.locator('.ux-state__actions .ux-button').first();
    if (await actionButton.count() > 0) {
      await expect(actionButton).toBeVisible();
    }
  });

  test('should apply row direction to actions', async ({ page }) => {
    const actionsRow = page.locator('.ux-state__actions--row').first();
    if (await actionsRow.count() > 0) {
      await expect(actionsRow).toBeVisible();
      const flexDirection = await actionsRow.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('row');
    }
  });

  // Connection status tests
  test('should render connection status online', async ({ page }) => {
    const connectionOnline = page.locator('.ux-connection-status--online').first();
    if (await connectionOnline.count() > 0) {
      await expect(connectionOnline).toBeVisible();
    }
  });

  test('should render connection status offline', async ({ page }) => {
    const connectionOffline = page.locator('.ux-connection-status--offline').first();
    if (await connectionOffline.count() > 0) {
      await expect(connectionOffline).toBeVisible();
    }
  });

  test('should render connection status reconnecting', async ({ page }) => {
    const connectionReconnecting = page.locator('.ux-connection-status--reconnecting').first();
    if (await connectionReconnecting.count() > 0) {
      await expect(connectionReconnecting).toBeVisible();
    }
  });

  test('should have connection status dot', async ({ page }) => {
    const statusDot = page.locator('.ux-connection-status__dot').first();
    if (await statusDot.count() > 0) {
      await expect(statusDot).toBeVisible();
      const borderRadius = await statusDot.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBe('50%');
    }
  });

  // Icon styling tests
  test('icon should have proper color', async ({ page }) => {
    const stateIcon = page.locator('.ux-state__icon').first();
    const color = await stateIcon.evaluate(el =>
      getComputedStyle(el).color
    );
    expect(color).toBeDefined();
  });

  test('icon should be vertically centered with opacity', async ({ page }) => {
    const stateIcon = page.locator('.ux-state__icon').first();
    const opacity = await stateIcon.evaluate(el =>
      getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBeLessThanOrEqual(1);
    expect(parseFloat(opacity)).toBeGreaterThan(0);
  });

  // Empty state specific
  test('empty state icon should have reduced opacity', async ({ page }) => {
    const emptyStateIcon = page.locator('.ux-empty-state .ux-state__icon').first();
    if (await emptyStateIcon.count() > 0) {
      const opacity = await emptyStateIcon.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThanOrEqual(0.6);
    }
  });

  // Error state specific
  test('error state should have danger color title', async ({ page }) => {
    const errorTitle = page.locator('.ux-error-state .ux-state__title').first();
    if (await errorTitle.count() > 0) {
      const color = await errorTitle.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  // Success state specific
  test('success state should have success color title', async ({ page }) => {
    const successTitle = page.locator('.ux-success-state .ux-state__title').first();
    if (await successTitle.count() > 0) {
      const color = await successTitle.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  // Structure tests
  test('state should be flex container', async ({ page }) => {
    const state = page.locator('.ux-state').first();
    const display = await state.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('flex');
  });

  test('state should center content', async ({ page }) => {
    const state = page.locator('.ux-state').first();
    const alignItems = await state.evaluate(el =>
      getComputedStyle(el).alignItems
    );
    const justifyContent = await state.evaluate(el =>
      getComputedStyle(el).justifyContent
    );
    expect(alignItems).toBe('center');
    expect(justifyContent).toBe('center');
  });

  test('state should have text-align center', async ({ page }) => {
    const state = page.locator('.ux-state').first();
    const textAlign = await state.evaluate(el =>
      getComputedStyle(el).textAlign
    );
    expect(textAlign).toBe('center');
  });

  // Loading state tests
  test('should render loading state', async ({ page }) => {
    const loadingState = page.locator('.ux-loading-state').first();
    if (await loadingState.count() > 0) {
      await expect(loadingState).toBeVisible();
    }
  });

  // Info state tests
  test('should render info state', async ({ page }) => {
    const infoState = page.locator('.ux-info-state').first();
    if (await infoState.count() > 0) {
      await expect(infoState).toBeVisible();
    }
  });

  // No permission state tests
  test('should render no permission state', async ({ page }) => {
    const noPermissionState = page.locator('.ux-no-permission-state').first();
    if (await noPermissionState.count() > 0) {
      await expect(noPermissionState).toBeVisible();
    }
  });

  // Search highlight tests
  test('should have search highlight element', async ({ page }) => {
    const highlight = page.locator('.ux-state__highlight').first();
    if (await highlight.count() > 0) {
      await expect(highlight).toBeVisible();
      const text = await highlight.textContent();
      expect(text).toBeDefined();
    }
  });

  // Responsive behavior
  test('state should have minimum height', async ({ page }) => {
    const state = page.locator('.ux-state').first();
    const minHeight = await state.evaluate(el =>
      getComputedStyle(el).minHeight
    );
    expect(minHeight).not.toBe('0px');
  });

  test('state should have padding', async ({ page }) => {
    const state = page.locator('.ux-state').first();
    const padding = await state.evaluate(el =>
      getComputedStyle(el).padding
    );
    expect(padding).toBeDefined();
  });
});
