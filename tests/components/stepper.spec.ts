import { test, expect } from '@playwright/test';

test.describe('Stepper Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/stepper.html');
  });

  test('should render stepper', async ({ page }) => {
    const stepper = page.locator('.ux-stepper').first();
    await expect(stepper).toBeVisible();
  });

  test('should render stepper steps', async ({ page }) => {
    const steps = page.locator('.ux-stepper__step');
    expect(await steps.count()).toBeGreaterThan(0);
  });

  test('should render step numbers/indicators', async ({ page }) => {
    const indicators = page.locator('.ux-stepper__indicator, .ux-stepper__number');
    if (await indicators.count() > 0) {
      await expect(indicators.first()).toBeVisible();
    }
  });

  test('should render step labels', async ({ page }) => {
    const labels = page.locator('.ux-stepper__label');
    if (await labels.count() > 0) {
      await expect(labels.first()).toBeVisible();
    }
  });

  test('should show active step', async ({ page }) => {
    const activeStep = page.locator('.ux-stepper__step--active').first();
    if (await activeStep.count() > 0) {
      await expect(activeStep).toBeVisible();
    }
  });

  test('should show completed steps', async ({ page }) => {
    const completedStep = page.locator('.ux-stepper__step--completed').first();
    if (await completedStep.count() > 0) {
      await expect(completedStep).toBeVisible();
    }
  });

  test('should render connector lines', async ({ page }) => {
    const connector = page.locator('.ux-stepper__connector, .ux-stepper__line').first();
    if (await connector.count() > 0) {
      await expect(connector).toBeVisible();
    }
  });

  test('should apply vertical variant', async ({ page }) => {
    const verticalStepper = page.locator('.ux-stepper--vertical').first();
    if (await verticalStepper.count() > 0) {
      await expect(verticalStepper).toBeVisible();
    }
  });

  test('step indicators should have minimum touch target', async ({ page }) => {
    const indicator = page.locator('.ux-stepper__indicator').first();
    if (await indicator.count() > 0) {
      const size = await indicator.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(size).toBeGreaterThanOrEqual(24);
    }
  });
});
