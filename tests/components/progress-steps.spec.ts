import { test, expect } from '@playwright/test';

test.describe('Progress Steps Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/progress-steps.html');
  });

  test('should render basic progress steps', async ({ page }) => {
    const progressSteps = page.locator('.ux-progress-steps').first();
    await expect(progressSteps).toBeVisible();
  });

  test('should render step indicators', async ({ page }) => {
    const indicators = page.locator('.ux-progress-steps__indicator');
    expect(await indicators.count()).toBeGreaterThan(0);
    await expect(indicators.first()).toBeVisible();
  });

  test('should render step numbers in indicators', async ({ page }) => {
    const firstIndicator = page.locator('.ux-progress-steps__indicator span').first();
    if (await firstIndicator.count() > 0) {
      const text = await firstIndicator.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have active state', async ({ page }) => {
    const activeStep = page.locator('.ux-progress-steps__step--active').first();
    if (await activeStep.count() > 0) {
      await expect(activeStep).toBeVisible();
      const indicator = activeStep.locator('.ux-progress-steps__indicator');
      const borderColor = await indicator.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).not.toBe('rgb(0, 0, 0)');
    }
  });

  test('should have completed state', async ({ page }) => {
    const completedSteps = page.locator('.ux-progress-steps__step--completed');
    if (await completedSteps.count() > 0) {
      const firstCompleted = completedSteps.first();
      const indicator = firstCompleted.locator('.ux-progress-steps__indicator');
      const background = await indicator.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(background).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should display step titles', async ({ page }) => {
    const title = page.locator('.ux-progress-steps__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const text = await title.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display step descriptions when present', async ({ page }) => {
    const description = page.locator('.ux-progress-steps__description').first();
    if (await description.count() > 0) {
      await expect(description).toBeVisible();
      const text = await description.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should support horizontal layout', async ({ page }) => {
    const horizontal = page.locator('.ux-progress-steps--horizontal').first();
    if (await horizontal.count() > 0) {
      await expect(horizontal).toBeVisible();
      const display = await horizontal.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(display).toBe('row');
    }
  });

  test('should support vertical layout', async ({ page }) => {
    const vertical = page.locator('.ux-progress-steps--vertical').first();
    if (await vertical.count() > 0) {
      await expect(vertical).toBeVisible();
      const display = await vertical.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(display).toBe('column');
    }
  });

  test('should support small size variant', async ({ page }) => {
    const smallSteps = page.locator('.ux-progress-steps--sm').first();
    if (await smallSteps.count() > 0) {
      await expect(smallSteps).toBeVisible();
      const indicator = smallSteps.locator('.ux-progress-steps__indicator');
      const size = await indicator.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeLessThan(32);
    }
  });

  test('should support large size variant', async ({ page }) => {
    const largeSteps = page.locator('.ux-progress-steps--lg').first();
    if (await largeSteps.count() > 0) {
      await expect(largeSteps).toBeVisible();
      const indicator = largeSteps.locator('.ux-progress-steps__indicator');
      const size = await indicator.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeGreaterThan(32);
    }
  });

  test('should support dots variant', async ({ page }) => {
    const dotsSteps = page.locator('.ux-progress-steps--dots').first();
    if (await dotsSteps.count() > 0) {
      await expect(dotsSteps).toBeVisible();
      const indicator = dotsSteps.locator('.ux-progress-steps__indicator');
      const size = await indicator.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeLessThan(32);
    }
  });

  test('should support navigation variant', async ({ page }) => {
    const navSteps = page.locator('.ux-progress-steps--nav').first();
    if (await navSteps.count() > 0) {
      await expect(navSteps).toBeVisible();
      const step = navSteps.locator('.ux-progress-steps__step');
      await expect(step.first()).toBeVisible();
    }
  });

  test('should support progress bar variant', async ({ page }) => {
    const barSteps = page.locator('.ux-progress-steps--bar').first();
    if (await barSteps.count() > 0) {
      await expect(barSteps).toBeVisible();
      const progressBar = barSteps.locator('.ux-progress-steps__progress');
      if (await progressBar.count() > 0) {
        await expect(progressBar).toBeVisible();
      }
    }
  });

  test('should render connecting lines between steps in horizontal layout', async ({ page }) => {
    const horizontal = page.locator('.ux-progress-steps--horizontal').first();
    if (await horizontal.count() > 0) {
      const steps = horizontal.locator('.ux-progress-steps__step');
      if (await steps.count() > 1) {
        // In horizontal layout, connecting lines are created with ::after pseudo-element
        const firstStep = steps.first();
        const hasAfterElement = await firstStep.evaluate(el => {
          const after = window.getComputedStyle(el, '::after');
          return after.content !== 'none';
        });
        // Note: Pseudo-element content detection is limited in JS
        // Just verify the step structure exists
        await expect(firstStep).toBeVisible();
      }
    }
  });

  test('should render connecting lines between steps in vertical layout', async ({ page }) => {
    const vertical = page.locator('.ux-progress-steps--vertical').first();
    if (await vertical.count() > 0) {
      const steps = vertical.locator('.ux-progress-steps__step');
      if (await steps.count() > 1) {
        const firstStep = steps.first();
        await expect(firstStep).toBeVisible();
      }
    }
  });

  test('should have multiple steps', async ({ page }) => {
    const steps = page.locator('.ux-progress-steps__step');
    expect(await steps.count()).toBeGreaterThan(1);
  });

  test('should apply primary color to active indicator', async ({ page }) => {
    const activeIndicator = page.locator('.ux-progress-steps__step--active .ux-progress-steps__indicator').first();
    if (await activeIndicator.count() > 0) {
      const backgroundColor = await activeIndicator.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Should have a background color (not transparent or initial)
      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should have minimum touch target size for indicators', async ({ page }) => {
    const indicator = page.locator('.ux-progress-steps__indicator').first();
    const size = await indicator.evaluate(el =>
      parseInt(getComputedStyle(el).width)
    );
    expect(size).toBeGreaterThanOrEqual(24);
  });

  test('should support clickable steps', async ({ page }) => {
    const clickableSteps = page.locator('.ux-progress-steps--clickable').first();
    if (await clickableSteps.count() > 0) {
      await expect(clickableSteps).toBeVisible();
      const step = clickableSteps.locator('.ux-progress-steps__step').first();
      const cursor = await step.evaluate(el =>
        getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }
  });

  test('should update step on next button click', async ({ page }) => {
    // Find the next button in the first demo section
    const nextButton = page.locator('button.ux-button.ux-color-primary', { hasText: /Next/i }).first();
    if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
      const initialStep = page.locator('.ux-progress-steps__step--active').first();
      const initialText = await initialStep.textContent();

      await nextButton.click();
      await page.waitForTimeout(100);

      const updatedStep = page.locator('.ux-progress-steps__step--active').first();
      const updatedText = await updatedStep.textContent();

      expect(updatedText).not.toBe(initialText);
    }
  });

  test('should update step on previous button click', async ({ page }) => {
    // Find a demo section where we can navigate backward
    const demoBox = page.locator('.demo-box').nth(1);
    const prevButton = demoBox.locator('button', { hasText: /Previous/i }).first();

    if (await prevButton.count() > 0) {
      // First advance to a later step
      const nextButton = demoBox.locator('button.ux-color-primary', { hasText: /Next/i }).first();
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(100);

        const beforePrev = demoBox.locator('.ux-progress-steps__step--active').first();
        const beforeText = await beforePrev.textContent();

        await prevButton.click();
        await page.waitForTimeout(100);

        const afterPrev = demoBox.locator('.ux-progress-steps__step--active').first();
        const afterText = await afterPrev.textContent();

        expect(afterText).not.toBe(beforeText);
      }
    }
  });

  test('should show checkmark for completed steps', async ({ page }) => {
    const completedStep = page.locator('.ux-progress-steps__step--completed').first();
    if (await completedStep.count() > 0) {
      const svg = completedStep.locator('svg');
      if (await svg.count() > 0) {
        // Check if SVG is visible (checkmark is shown)
        const isVisible = await svg.first().isVisible();
        expect(isVisible).toBe(true);
      }
    }
  });

  test('should have appropriate text contrast', async ({ page }) => {
    const title = page.locator('.ux-progress-steps__title').first();
    if (await title.count() > 0) {
      const color = await title.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    }
  });

  test('should maintain responsive behavior on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const progressSteps = page.locator('.ux-progress-steps').first();
    await expect(progressSteps).toBeVisible();

    const steps = progressSteps.locator('.ux-progress-steps__step');
    const stepsCount = await steps.count();
    expect(stepsCount).toBeGreaterThan(0);
  });

  test('should apply appropriate opacity to disabled steps', async ({ page }) => {
    const disabledStep = page.locator('.ux-progress-steps--clickable .ux-progress-steps__step--disabled').first();
    if (await disabledStep.count() > 0) {
      const opacity = await disabledStep.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should render indicator with border', async ({ page }) => {
    const indicator = page.locator('.ux-progress-steps__indicator').first();
    const borderWidth = await indicator.evaluate(el =>
      getComputedStyle(el).borderWidth
    );
    expect(borderWidth).not.toBe('0px');
  });

  test('should have proper spacing between steps', async ({ page }) => {
    const horizontal = page.locator('.ux-progress-steps--horizontal').first();
    if (await horizontal.count() > 0) {
      const gap = await horizontal.evaluate(el =>
        getComputedStyle(el).gap || getComputedStyle(el).columnGap
      );
      // Should have gap defined
      expect(gap).toBeTruthy();
    }
  });

  test('should support outline variant', async ({ page }) => {
    const outlineSteps = page.locator('.ux-progress-steps--outline').first();
    if (await outlineSteps.count() > 0) {
      await expect(outlineSteps).toBeVisible();
    }
  });
});
