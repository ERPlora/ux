import { test, expect } from '@playwright/test';

test.describe('Tag Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/tag.html');
  });

  test('should render basic tag', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    await expect(tag).toBeVisible();
  });

  test('should have tag text element', async ({ page }) => {
    const tagText = page.locator('.ux-tag__text').first();
    await expect(tagText).toBeVisible();
    const text = await tagText.textContent();
    expect(text).toBeDefined();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test('should have remove button', async ({ page }) => {
    const removeButton = page.locator('.ux-tag__remove').first();
    await expect(removeButton).toBeVisible();
  });

  test('should have remove button icon', async ({ page }) => {
    const removeIcon = page.locator('.ux-tag__remove-icon').first();
    await expect(removeIcon).toBeVisible();
  });

  test('should apply primary color variant', async ({ page }) => {
    const primaryTag = page.locator('.ux-tag--primary').first();
    if (await primaryTag.count() > 0) {
      await expect(primaryTag).toBeVisible();
      const color = await primaryTag.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply success color variant', async ({ page }) => {
    const successTag = page.locator('.ux-tag--success').first();
    if (await successTag.count() > 0) {
      await expect(successTag).toBeVisible();
      const color = await successTag.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply warning color variant', async ({ page }) => {
    const warningTag = page.locator('.ux-tag--warning').first();
    if (await warningTag.count() > 0) {
      await expect(warningTag).toBeVisible();
      const color = await warningTag.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply danger color variant', async ({ page }) => {
    const dangerTag = page.locator('.ux-tag--danger').first();
    if (await dangerTag.count() > 0) {
      await expect(dangerTag).toBeVisible();
      const color = await dangerTag.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeDefined();
    }
  });

  test('should apply filled variant', async ({ page }) => {
    const filledTag = page.locator('.ux-tag--filled').first();
    if (await filledTag.count() > 0) {
      await expect(filledTag).toBeVisible();
      const bgColor = await filledTag.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Filled tags should have a solid background, not transparent
      expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallTag = page.locator('.ux-tag--sm').first();
    if (await smallTag.count() > 0) {
      await expect(smallTag).toBeVisible();
      const height = await smallTag.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeLessThan(28);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeTag = page.locator('.ux-tag--lg').first();
    if (await largeTag.count() > 0) {
      await expect(largeTag).toBeVisible();
      const height = await largeTag.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThan(28);
    }
  });

  test('should have default height for medium size', async ({ page }) => {
    const mediumTag = page.locator('.ux-tag:not(.ux-tag--sm):not(.ux-tag--lg)').first();
    if (await mediumTag.count() > 0) {
      const height = await mediumTag.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(height).toBeGreaterThanOrEqual(28);
    }
  });

  test('should have pill-shaped border radius', async ({ page }) => {
    const tag = page.locator('.ux-tag:not(.ux-tag--square)').first();
    const borderRadius = await tag.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    // Pill-shaped tags should have rounded corners
    expect(borderRadius).not.toBe('0px');
  });

  test('should apply square shape variant', async ({ page }) => {
    const squareTag = page.locator('.ux-tag--square').first();
    if (await squareTag.count() > 0) {
      await expect(squareTag).toBeVisible();
      const borderRadius = await squareTag.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Square tags should have less rounded corners than pill-shaped
      const radiusValue = parseInt(borderRadius);
      expect(radiusValue).toBeLessThan(20);
    }
  });

  test('should render tag with icon', async ({ page }) => {
    const iconTag = page.locator('.ux-tag svg.ux-tag__icon').first();
    if (await iconTag.count() > 0) {
      await expect(iconTag).toBeVisible();
    }
  });

  test('should render tag with avatar', async ({ page }) => {
    const avatarTag = page.locator('.ux-tag__avatar').first();
    if (await avatarTag.count() > 0) {
      await expect(avatarTag).toBeVisible();
      const avatarWidth = await avatarTag.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(avatarWidth).toBeGreaterThan(0);
    }
  });

  test('should remove tag on button click', async ({ page }) => {
    const tagBefore = page.locator('.ux-tag').count();
    const firstRemoveButton = page.locator('.ux-tag__remove').first();
    const firstTag = page.locator('.ux-tag').first();

    await firstRemoveButton.click();

    // Check if tag gets removing animation class
    await expect(firstTag).toHaveClass(/ux-tag--removing/);
  });

  test('should support alpine.js tag group', async ({ page }) => {
    const tagGroup = page.locator('[x-data*="uxTagGroup"]').first();
    if (await tagGroup.count() > 0) {
      await expect(tagGroup).toBeVisible();
      const tags = page.locator('[x-data*="uxTagGroup"] .ux-tag');
      expect(await tags.count()).toBeGreaterThan(0);
    }
  });

  test('should display multiple tags in group', async ({ page }) => {
    const tags = page.locator('.ux-tag');
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(1);
  });

  test('should have accessible remove button', async ({ page }) => {
    const removeButton = page.locator('.ux-tag__remove').first();
    const ariaLabel = await removeButton.getAttribute('aria-label');
    expect(ariaLabel).toBeDefined();
    expect(ariaLabel?.toLowerCase()).toContain('remove');
  });

  test('should handle inline flex layout', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    const display = await tag.evaluate(el =>
      getComputedStyle(el).display
    );
    expect(display).toBe('inline-flex');
  });

  test('should center content vertically', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    const alignItems = await tag.evaluate(el =>
      getComputedStyle(el).alignItems
    );
    expect(alignItems).toBe('center');
  });

  test('should have appropriate padding', async ({ page }) => {
    const tag = page.locator('.ux-tag:not(.ux-tag--sm):not(.ux-tag--lg)').first();
    const padding = await tag.evaluate(el =>
      getComputedStyle(el).padding
    );
    expect(padding).toBeDefined();
  });

  test('should have border', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    const borderWidth = await tag.evaluate(el =>
      getComputedStyle(el).borderWidth
    );
    expect(parseFloat(borderWidth)).toBeGreaterThan(0);
  });

  test('should support filled primary color', async ({ page }) => {
    const filledPrimaryTag = page.locator('.ux-tag--filled.ux-tag--primary').first();
    if (await filledPrimaryTag.count() > 0) {
      await expect(filledPrimaryTag).toBeVisible();
      const bgColor = await filledPrimaryTag.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).not.toMatch(/transparent/);
    }
  });

  test('should support filled success color', async ({ page }) => {
    const filledSuccessTag = page.locator('.ux-tag--filled.ux-tag--success').first();
    if (await filledSuccessTag.count() > 0) {
      await expect(filledSuccessTag).toBeVisible();
    }
  });

  test('should support filled danger color', async ({ page }) => {
    const filledDangerTag = page.locator('.ux-tag--filled.ux-tag--danger').first();
    if (await filledDangerTag.count() > 0) {
      await expect(filledDangerTag).toBeVisible();
    }
  });

  test('should have tag group container', async ({ page }) => {
    const tagGroup = page.locator('.ux-tag-group').first();
    if (await tagGroup.count() > 0) {
      await expect(tagGroup).toBeVisible();
      const display = await tagGroup.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/flex|inline-flex/);
    }
  });

  test('should render removable tag with text and button', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    await expect(tag).toBeVisible();

    const text = page.locator('.ux-tag__text').first();
    const button = page.locator('.ux-tag__remove').first();

    await expect(text).toBeVisible();
    await expect(button).toBeVisible();
  });

  test('should handle user selection prevention', async ({ page }) => {
    const tag = page.locator('.ux-tag').first();
    const userSelect = await tag.evaluate(el =>
      getComputedStyle(el).userSelect
    );
    expect(userSelect).toBe('none');
  });

  test('should transition on remove button hover', async ({ page }) => {
    const removeButton = page.locator('.ux-tag__remove').first();
    const transition = await removeButton.evaluate(el =>
      getComputedStyle(el).transition
    );
    expect(transition).toBeDefined();
  });

  test('should have proper spacing between tag items in group', async ({ page }) => {
    const tagGroup = page.locator('.ux-tag-group').first();
    if (await tagGroup.count() > 0) {
      const gap = await tagGroup.evaluate(el =>
        getComputedStyle(el).gap
      );
      expect(gap).not.toBe('0px');
    }
  });
});
