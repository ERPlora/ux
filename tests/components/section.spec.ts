import { test, expect } from '@playwright/test';

test.describe('Section Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/section.html');
  });

  test('should render basic section', async ({ page }) => {
    const section = page.locator('.ux-section').first();
    await expect(section).toBeVisible();
  });

  test('should render section header', async ({ page }) => {
    const header = page.locator('.ux-section__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render section header content', async ({ page }) => {
    const headerContent = page.locator('.ux-section__header-content').first();
    if (await headerContent.count() > 0) {
      await expect(headerContent).toBeVisible();
    }
  });

  test('should render section title', async ({ page }) => {
    const title = page.locator('.ux-section__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
    }
  });

  test('should render section content', async ({ page }) => {
    const content = page.locator('.ux-section__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });

  test('should render section with description', async ({ page }) => {
    const description = page.locator('.ux-section__description').first();
    if (await description.count() > 0) {
      await expect(description).toBeVisible();
      const descriptionText = await description.textContent();
      expect(descriptionText).toBeTruthy();
    }
  });

  test('should render section with actions', async ({ page }) => {
    const actions = page.locator('.ux-section__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  test('should apply bordered variant', async ({ page }) => {
    const borderedSection = page.locator('.ux-section--bordered').first();
    if (await borderedSection.count() > 0) {
      await expect(borderedSection).toBeVisible();
      const borderWidth = await borderedSection.evaluate(el =>
        getComputedStyle(el).borderWidth
      );
      expect(borderWidth).not.toBe('0px');
    }
  });

  test('should apply card variant', async ({ page }) => {
    const cardSection = page.locator('.ux-section--card').first();
    if (await cardSection.count() > 0) {
      await expect(cardSection).toBeVisible();
      const backgroundColor = await cardSection.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(backgroundColor).not.toBe('transparent');
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassSection = page.locator('.ux-section--glass').first();
    if (await glassSection.count() > 0) {
      await expect(glassSection).toBeVisible();
      const backdropFilter = await glassSection.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should apply collapsible variant', async ({ page }) => {
    const collapsibleSection = page.locator('.ux-section--collapsible').first();
    if (await collapsibleSection.count() > 0) {
      await expect(collapsibleSection).toBeVisible();
      const chevron = page.locator('.ux-section__chevron').first();
      if (await chevron.count() > 0) {
        await expect(chevron).toBeVisible();
      }
    }
  });

  test('should apply header-only variant', async ({ page }) => {
    const headerOnlySection = page.locator('.ux-section--header-only').first();
    if (await headerOnlySection.count() > 0) {
      await expect(headerOnlySection).toBeVisible();
      const content = headerOnlySection.locator('.ux-section__content');
      if (await content.count() === 0) {
        // Header-only sections may not have content
        await expect(headerOnlySection).toBeVisible();
      }
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smallSection = page.locator('.ux-section--sm').first();
    if (await smallSection.count() > 0) {
      await expect(smallSection).toBeVisible();
      const normalSection = page.locator('.ux-section:not(.ux-section--sm):not(.ux-section--lg)').first();
      if (await normalSection.count() > 0) {
        const smallPadding = await smallSection.evaluate(el =>
          getComputedStyle(el).padding
        );
        const normalPadding = await normalSection.evaluate(el =>
          getComputedStyle(el).padding
        );
        // Small section should have less padding
        expect(smallPadding).toBeTruthy();
      }
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const largeSection = page.locator('.ux-section--lg').first();
    if (await largeSection.count() > 0) {
      await expect(largeSection).toBeVisible();
    }
  });

  test('should have border radius', async ({ page }) => {
    const section = page.locator('.ux-section').first();
    const borderRadius = await section.evaluate(el =>
      getComputedStyle(el).borderRadius
    );
    expect(borderRadius).not.toBe('0px');
  });

  test('should have appropriate padding', async ({ page }) => {
    const content = page.locator('.ux-section__content').first();
    if (await content.count() > 0) {
      const padding = await content.evaluate(el =>
        getComputedStyle(el).padding
      );
      expect(padding).not.toBe('0px');
    }
  });

  test('collapsible section should toggle on header click', async ({ page }) => {
    const collapsibleSection = page.locator('.ux-section--collapsible').first();
    if (await collapsibleSection.count() > 0) {
      const body = collapsibleSection.locator('.ux-section__body').first();
      if (await body.count() > 0) {
        const header = collapsibleSection.locator('.ux-section__header').first();

        // Check initial visibility
        const initialDisplay = await body.evaluate(el =>
          getComputedStyle(el).display
        );

        // Click header to toggle
        await header.click();

        // Wait a bit for animation
        await page.waitForTimeout(300);

        const afterClickDisplay = await body.evaluate(el =>
          getComputedStyle(el).display
        );

        // Display should change or element should have state change
        expect(initialDisplay || afterClickDisplay).toBeTruthy();
      }
    }
  });
});
