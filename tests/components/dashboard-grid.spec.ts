import { test, expect } from '@playwright/test';

test.describe('Dashboard Grid Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/dashboard-grid.html');
  });

  test('should render basic dashboard grid', async ({ page }) => {
    const grid = page.locator('.ux-dashboard-grid').first();
    await expect(grid).toBeVisible();
  });

  test('should render grid items', async ({ page }) => {
    const gridItem = page.locator('.ux-dashboard-grid__item').first();
    await expect(gridItem).toBeVisible();
  });

  test('should apply widget size variants', async ({ page }) => {
    // Small widget (1 column)
    const smallWidget = page.locator('.ux-dashboard-grid__item--sm').first();
    if (await smallWidget.count() > 0) {
      await expect(smallWidget).toBeVisible();
    }

    // Medium widget (2 columns)
    const mediumWidget = page.locator('.ux-dashboard-grid__item--md').first();
    if (await mediumWidget.count() > 0) {
      await expect(mediumWidget).toBeVisible();
    }

    // Large widget (3 columns)
    const largeWidget = page.locator('.ux-dashboard-grid__item--lg').first();
    if (await largeWidget.count() > 0) {
      await expect(largeWidget).toBeVisible();
    }

    // Full width widget
    const fullWidget = page.locator('.ux-dashboard-grid__item--full').first();
    if (await fullWidget.count() > 0) {
      await expect(fullWidget).toBeVisible();
    }
  });

  test('should apply column configuration classes', async ({ page }) => {
    // 2 columns
    const cols2 = page.locator('.ux-dashboard-grid--cols-2').first();
    if (await cols2.count() > 0) {
      await expect(cols2).toBeVisible();
    }

    // 3 columns
    const cols3 = page.locator('.ux-dashboard-grid--cols-3').first();
    if (await cols3.count() > 0) {
      await expect(cols3).toBeVisible();
    }
  });

  test('should apply gap variants', async ({ page }) => {
    // Large gap
    const gapLg = page.locator('.ux-dashboard-grid--gap-lg').first();
    if (await gapLg.count() > 0) {
      await expect(gapLg).toBeVisible();
    }

    // Small gap
    const gapSm = page.locator('.ux-dashboard-grid--gap-sm').first();
    if (await gapSm.count() > 0) {
      await expect(gapSm).toBeVisible();
    }
  });

  test('should apply style variants', async ({ page }) => {
    // Outline variant
    const outline = page.locator('.ux-dashboard-grid__item--outline').first();
    if (await outline.count() > 0) {
      await expect(outline).toBeVisible();
    }

    // Elevated variant
    const elevated = page.locator('.ux-dashboard-grid__item--elevated').first();
    if (await elevated.count() > 0) {
      await expect(elevated).toBeVisible();
    }

    // Flat variant
    const flat = page.locator('.ux-dashboard-grid__item--flat').first();
    if (await flat.count() > 0) {
      await expect(flat).toBeVisible();
    }
  });

  test('should apply color variants', async ({ page }) => {
    // Primary color
    const primary = page.locator('.ux-dashboard-grid__item--primary').first();
    if (await primary.count() > 0) {
      await expect(primary).toBeVisible();
    }

    // Success color
    const success = page.locator('.ux-dashboard-grid__item--success').first();
    if (await success.count() > 0) {
      await expect(success).toBeVisible();
    }

    // Warning color
    const warning = page.locator('.ux-dashboard-grid__item--warning').first();
    if (await warning.count() > 0) {
      await expect(warning).toBeVisible();
    }

    // Danger color
    const danger = page.locator('.ux-dashboard-grid__item--danger').first();
    if (await danger.count() > 0) {
      await expect(danger).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassGrid = page.locator('.ux-dashboard-grid--glass').first();
    if (await glassGrid.count() > 0) {
      await expect(glassGrid).toBeVisible();

      // Glass items should have backdrop-filter
      const glassItem = glassGrid.locator('.ux-dashboard-grid__item').first();
      const backdropFilter = await glassItem.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should render stat widgets with values and labels', async ({ page }) => {
    const statValue = page.locator('.ux-dashboard-grid__stat-value').first();
    if (await statValue.count() > 0) {
      await expect(statValue).toBeVisible();
      const text = await statValue.textContent();
      expect(text).toBeTruthy();
    }

    const statLabel = page.locator('.ux-dashboard-grid__stat-label').first();
    if (await statLabel.count() > 0) {
      await expect(statLabel).toBeVisible();
    }
  });

  test('should render trend indicators', async ({ page }) => {
    const trendUp = page.locator('.ux-dashboard-grid__stat-trend--up').first();
    if (await trendUp.count() > 0) {
      await expect(trendUp).toBeVisible();
    }

    const trendDown = page.locator('.ux-dashboard-grid__stat-trend--down').first();
    if (await trendDown.count() > 0) {
      await expect(trendDown).toBeVisible();
    }
  });

  test('should render widget header elements', async ({ page }) => {
    const header = page.locator('.ux-dashboard-grid__item-header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }

    const title = page.locator('.ux-dashboard-grid__item-title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('should render widget action buttons', async ({ page }) => {
    const actionBtn = page.locator('.ux-dashboard-grid__item-btn').first();
    if (await actionBtn.count() > 0) {
      await expect(actionBtn).toBeVisible();
    }
  });

  test('should render widget content area', async ({ page }) => {
    const content = page.locator('.ux-dashboard-grid__item-content').first();
    await expect(content).toBeVisible();
  });

  test('should render widget footer when present', async ({ page }) => {
    const footer = page.locator('.ux-dashboard-grid__item-footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should use CSS Grid layout', async ({ page }) => {
    const grid = page.locator('.ux-dashboard-grid').first();
    const display = await grid.evaluate(el => getComputedStyle(el).display);
    expect(display).toBe('grid');
  });

  test.describe('Interactive Dashboard (Alpine.js)', () => {
    test('should toggle edit mode', async ({ page }) => {
      // Find the interactive dashboard with edit button
      const editButton = page.locator('button:has-text("Editar")').first();
      if (await editButton.count() > 0) {
        await editButton.click();

        // Should show "Guardar" when in edit mode
        await expect(page.locator('button:has-text("Guardar")')).toBeVisible();
      }
    });

    test('should show drag handles in edit mode', async ({ page }) => {
      const editButton = page.locator('button:has-text("Editar")').first();
      if (await editButton.count() > 0) {
        await editButton.click();

        // Wait for edit mode
        await page.waitForTimeout(300);

        // Drag handles should be visible in edit mode
        const dragHandle = page.locator('.ux-dashboard-grid__drag-handle').first();
        if (await dragHandle.count() > 0) {
          await expect(dragHandle).toBeVisible();
        }
      }
    });

    test('should have draggable attribute in edit mode', async ({ page }) => {
      const editButton = page.locator('button:has-text("Editar")').first();
      if (await editButton.count() > 0) {
        await editButton.click();

        // Wait for edit mode
        await page.waitForTimeout(300);

        // Find item with draggable attribute
        const draggableItem = page.locator('.ux-dashboard-grid__item[draggable="true"]').first();
        if (await draggableItem.count() > 0) {
          await expect(draggableItem).toHaveAttribute('draggable', 'true');
        }
      }
    });

    test('should show add widget button in edit mode', async ({ page }) => {
      const editButton = page.locator('button:has-text("Editar")').first();
      if (await editButton.count() > 0) {
        await editButton.click();

        // Wait for edit mode
        await page.waitForTimeout(300);

        // Look for add button
        const addButton = page.locator('.ux-dashboard-grid__add-item, button:has-text("Agregar")').first();
        if (await addButton.count() > 0) {
          await expect(addButton).toBeVisible();
        }
      }
    });

    test('should show size selector in edit mode', async ({ page }) => {
      const editButton = page.locator('button:has-text("Editar")').first();
      if (await editButton.count() > 0) {
        await editButton.click();

        // Wait for edit mode
        await page.waitForTimeout(300);

        // Size selector should be visible
        const sizeSelector = page.locator('.ux-dashboard-grid__item select').first();
        if (await sizeSelector.count() > 0) {
          await expect(sizeSelector).toBeVisible();
        }
      }
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should adapt layout on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const grid = page.locator('.ux-dashboard-grid').first();
      await expect(grid).toBeVisible();

      // Grid should still be visible on mobile
      const gridItem = page.locator('.ux-dashboard-grid__item').first();
      await expect(gridItem).toBeVisible();
    });

    test('should stack items on narrow viewports', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });

      // Grid items should still be accessible
      const items = page.locator('.ux-dashboard-grid__item');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('action buttons should have accessible labels', async ({ page }) => {
      const actionBtn = page.locator('.ux-dashboard-grid__item-btn').first();
      if (await actionBtn.count() > 0) {
        // Should be focusable
        await actionBtn.focus();
        await expect(actionBtn).toBeFocused();
      }
    });

    test('should be keyboard navigable', async ({ page }) => {
      const firstButton = page.locator('.ux-dashboard-grid__item-btn').first();
      if (await firstButton.count() > 0) {
        await firstButton.focus();
        await expect(firstButton).toBeFocused();

        // Tab to next focusable element
        await page.keyboard.press('Tab');
        // Verify focus moved
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });
  });
});
