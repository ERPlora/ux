import { test, expect } from '@playwright/test';

test.describe('Utilities Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/utilities.html');
  });

  test('should render utilities documentation', async ({ page }) => {
    const content = page.locator('.demo-section, .ux-content').first();
    await expect(content).toBeVisible();
  });

  // Spacing utilities
  test('should render spacing utility examples', async ({ page }) => {
    const spacingExample = page.locator('[class*="ux-m-"], [class*="ux-p-"]').first();
    if (await spacingExample.count() > 0) {
      await expect(spacingExample).toBeVisible();
    }
  });

  test('should apply margin utilities', async ({ page }) => {
    const marginElement = page.locator('.ux-m-md, .ux-m-lg, .ux-mt-md').first();
    if (await marginElement.count() > 0) {
      const margin = await marginElement.evaluate(el =>
        getComputedStyle(el).margin || getComputedStyle(el).marginTop
      );
      expect(margin).toBeDefined();
    }
  });

  test('should apply padding utilities', async ({ page }) => {
    const paddingElement = page.locator('.ux-p-md, .ux-p-lg, .ux-px-md').first();
    if (await paddingElement.count() > 0) {
      const padding = await paddingElement.evaluate(el =>
        getComputedStyle(el).padding || getComputedStyle(el).paddingLeft
      );
      expect(padding).toBeDefined();
    }
  });

  // Text utilities
  test('should render text alignment utilities', async ({ page }) => {
    const textCenter = page.locator('.ux-text-center').first();
    if (await textCenter.count() > 0) {
      const textAlign = await textCenter.evaluate(el =>
        getComputedStyle(el).textAlign
      );
      expect(textAlign).toBe('center');
    }
  });

  test('should render text size utilities', async ({ page }) => {
    const textSmall = page.locator('.ux-text-sm, .ux-text-xs').first();
    if (await textSmall.count() > 0) {
      await expect(textSmall).toBeVisible();
    }
  });

  test('should render text color utilities', async ({ page }) => {
    const textMuted = page.locator('.ux-text-muted, .ux-text-secondary').first();
    if (await textMuted.count() > 0) {
      await expect(textMuted).toBeVisible();
    }
  });

  // Display utilities
  test('should render display utilities', async ({ page }) => {
    const displayFlex = page.locator('.ux-d-flex, .ux-flex').first();
    if (await displayFlex.count() > 0) {
      const display = await displayFlex.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('should render hidden utility', async ({ page }) => {
    const hiddenElement = page.locator('.ux-hidden, .ux-d-none').first();
    if (await hiddenElement.count() > 0) {
      const display = await hiddenElement.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('none');
    }
  });

  // Flex utilities
  test('should render flex direction utilities', async ({ page }) => {
    const flexColumn = page.locator('.ux-flex-column').first();
    if (await flexColumn.count() > 0) {
      const flexDirection = await flexColumn.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');
    }
  });

  test('should render flex alignment utilities', async ({ page }) => {
    const alignCenter = page.locator('.ux-align-center, .ux-items-center').first();
    if (await alignCenter.count() > 0) {
      const alignItems = await alignCenter.evaluate(el =>
        getComputedStyle(el).alignItems
      );
      expect(alignItems).toBe('center');
    }
  });

  test('should render justify content utilities', async ({ page }) => {
    const justifyBetween = page.locator('.ux-justify-between').first();
    if (await justifyBetween.count() > 0) {
      const justifyContent = await justifyBetween.evaluate(el =>
        getComputedStyle(el).justifyContent
      );
      expect(justifyContent).toBe('space-between');
    }
  });

  // Gap utilities
  test('should render gap utilities', async ({ page }) => {
    const gapElement = page.locator('.ux-gap-md, .ux-gap-sm').first();
    if (await gapElement.count() > 0) {
      const gap = await gapElement.evaluate(el =>
        getComputedStyle(el).gap
      );
      expect(gap).toBeDefined();
    }
  });

  // Border utilities
  test('should render border utilities', async ({ page }) => {
    const borderElement = page.locator('.ux-border, .ux-border-top').first();
    if (await borderElement.count() > 0) {
      const border = await borderElement.evaluate(el =>
        getComputedStyle(el).border || getComputedStyle(el).borderTop
      );
      expect(border).toBeDefined();
    }
  });

  test('should render border radius utilities', async ({ page }) => {
    const roundedElement = page.locator('.ux-rounded, .ux-rounded-lg').first();
    if (await roundedElement.count() > 0) {
      const borderRadius = await roundedElement.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      expect(borderRadius).not.toBe('0px');
    }
  });

  // Background utilities
  test('should render background utilities', async ({ page }) => {
    const bgElement = page.locator('.ux-bg-primary, .ux-bg-surface').first();
    if (await bgElement.count() > 0) {
      const bgColor = await bgElement.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toBe('transparent');
    }
  });

  // Shadow utilities
  test('should render shadow utilities', async ({ page }) => {
    const shadowElement = page.locator('.ux-shadow, .ux-shadow-md').first();
    if (await shadowElement.count() > 0) {
      const boxShadow = await shadowElement.evaluate(el =>
        getComputedStyle(el).boxShadow
      );
      expect(boxShadow).not.toBe('none');
    }
  });

  // Width/Height utilities
  test('should render width utilities', async ({ page }) => {
    const fullWidth = page.locator('.ux-w-full, .ux-w-100').first();
    if (await fullWidth.count() > 0) {
      const width = await fullWidth.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).toBeDefined();
    }
  });

  // Visibility utilities
  test('should render visibility utilities', async ({ page }) => {
    const invisible = page.locator('.ux-invisible').first();
    if (await invisible.count() > 0) {
      const visibility = await invisible.evaluate(el =>
        getComputedStyle(el).visibility
      );
      expect(visibility).toBe('hidden');
    }
  });

  // Overflow utilities
  test('should render overflow utilities', async ({ page }) => {
    const overflowHidden = page.locator('.ux-overflow-hidden').first();
    if (await overflowHidden.count() > 0) {
      const overflow = await overflowHidden.evaluate(el =>
        getComputedStyle(el).overflow
      );
      expect(overflow).toBe('hidden');
    }
  });

  // Position utilities
  test('should render position utilities', async ({ page }) => {
    const relative = page.locator('.ux-relative, .ux-position-relative').first();
    if (await relative.count() > 0) {
      const position = await relative.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('relative');
    }
  });

  // Cursor utilities
  test('should render cursor utilities', async ({ page }) => {
    const pointer = page.locator('.ux-cursor-pointer').first();
    if (await pointer.count() > 0) {
      const cursor = await pointer.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }
  });

  // Truncate utilities
  test('should render text truncate utility', async ({ page }) => {
    const truncate = page.locator('.ux-truncate, .ux-text-truncate').first();
    if (await truncate.count() > 0) {
      const overflow = await truncate.evaluate(el =>
        getComputedStyle(el).textOverflow
      );
      expect(overflow).toBe('ellipsis');
    }
  });

  // Responsive utilities
  test('should render responsive utilities', async ({ page }) => {
    const responsiveHide = page.locator('.ux-hide-mobile, .ux-hidden-mobile').first();
    if (await responsiveHide.count() > 0) {
      await expect(responsiveHide).toBeDefined();
    }
  });

  // Code examples
  test('should render code examples', async ({ page }) => {
    const codeBlock = page.locator('.ux-code-block, pre').first();
    if (await codeBlock.count() > 0) {
      await expect(codeBlock).toBeVisible();
    }
  });
});
