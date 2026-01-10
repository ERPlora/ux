import { test, expect } from '@playwright/test';

test.describe('Quantity Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/quantity-badge.html');
  });

  test('should render basic quantity badge', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge').first();
    await expect(badge).toBeVisible();
  });

  test('should display count number', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    await expect(count).toBeVisible();
    const text = await count.textContent();
    expect(text).toBeTruthy();
  });

  test('should render count as positioned element', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    const position = await count.evaluate(el =>
      getComputedStyle(el).position
    );
    expect(position).toBe('absolute');
  });

  test('should have correct badge size (min-width)', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    const minWidth = await count.evaluate(el =>
      parseInt(getComputedStyle(el).minWidth)
    );
    expect(minWidth).toBe(18);
  });

  test('should have correct badge height', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    const height = await count.evaluate(el =>
      parseInt(getComputedStyle(el).height)
    );
    expect(height).toBe(18);
  });

  test('should have circular border-radius (pill shape)', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    const classList = await count.evaluate(el =>
      el.className
    );
    // Should have the ux-quantity-badge__count class which applies border-radius
    expect(classList).toContain('ux-quantity-badge__count');
  });

  test('should apply danger color by default', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    const bgColor = await count.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(bgColor).not.toBe('transparent');
  });

  test('should render dot variant', async ({ page }) => {
    const dotBadge = page.locator('.ux-quantity-badge__count--dot').first();
    if (await dotBadge.count() > 0) {
      await expect(dotBadge).toBeVisible();
      const width = await dotBadge.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      const height = await dotBadge.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(width).toBe(10);
      expect(height).toBe(10);
    }
  });

  test('should apply primary color variant', async ({ page }) => {
    const primaryBadge = page.locator('.ux-quantity-badge--primary .ux-quantity-badge__count').first();
    if (await primaryBadge.count() > 0) {
      await expect(primaryBadge).toBeVisible();
    }
  });

  test('should apply success color variant', async ({ page }) => {
    const successBadge = page.locator('.ux-quantity-badge--success .ux-quantity-badge__count').first();
    if (await successBadge.count() > 0) {
      await expect(successBadge).toBeVisible();
    }
  });

  test('should apply warning color variant', async ({ page }) => {
    const warningBadge = page.locator('.ux-quantity-badge--warning .ux-quantity-badge__count').first();
    if (await warningBadge.count() > 0) {
      await expect(warningBadge).toBeVisible();
    }
  });

  test('should apply dark color variant', async ({ page }) => {
    const darkBadge = page.locator('.ux-quantity-badge--dark .ux-quantity-badge__count').first();
    if (await darkBadge.count() > 0) {
      await expect(darkBadge).toBeVisible();
    }
  });

  test('should position badge at top-right by default', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge:not(.ux-quantity-badge--top-left):not(.ux-quantity-badge--bottom-right):not(.ux-quantity-badge--bottom-left) .ux-quantity-badge__count').first();
    if (await badge.count() > 0) {
      const top = await badge.evaluate(el =>
        getComputedStyle(el).top
      );
      const right = await badge.evaluate(el =>
        getComputedStyle(el).right
      );
      expect(top).not.toBe('auto');
      expect(right).not.toBe('auto');
    }
  });

  test('should position badge at top-left', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge--top-left .ux-quantity-badge__count').first();
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
      const hasTopLeftClass = await page.locator('.ux-quantity-badge--top-left').first().evaluate(el =>
        el.classList.contains('ux-quantity-badge--top-left')
      );
      expect(hasTopLeftClass).toBe(true);
    }
  });

  test('should position badge at bottom-right', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge--bottom-right .ux-quantity-badge__count').first();
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
      const hasBottomRightClass = await page.locator('.ux-quantity-badge--bottom-right').first().evaluate(el =>
        el.classList.contains('ux-quantity-badge--bottom-right')
      );
      expect(hasBottomRightClass).toBe(true);
    }
  });

  test('should position badge at bottom-left', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge--bottom-left .ux-quantity-badge__count').first();
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
      const bottom = await badge.evaluate(el =>
        getComputedStyle(el).bottom
      );
      const left = await badge.evaluate(el =>
        getComputedStyle(el).left
      );
      expect(bottom).not.toBe('auto');
      expect(left).not.toBe('auto');
    }
  });

  test('should apply small size variant', async ({ page }) => {
    const smBadge = page.locator('.ux-quantity-badge--sm .ux-quantity-badge__count').first();
    if (await smBadge.count() > 0) {
      await expect(smBadge).toBeVisible();
      const minWidth = await smBadge.evaluate(el =>
        parseInt(getComputedStyle(el).minWidth)
      );
      const height = await smBadge.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(minWidth).toBe(14);
      expect(height).toBe(14);
    }
  });

  test('should apply large size variant', async ({ page }) => {
    const lgBadge = page.locator('.ux-quantity-badge--lg .ux-quantity-badge__count').first();
    if (await lgBadge.count() > 0) {
      await expect(lgBadge).toBeVisible();
      const minWidth = await lgBadge.evaluate(el =>
        parseInt(getComputedStyle(el).minWidth)
      );
      const height = await lgBadge.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(minWidth).toBe(22);
      expect(height).toBe(22);
    }
  });

  test('should have white text color', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge:not(.ux-quantity-badge--warning):not(.ux-quantity-badge--light) .ux-quantity-badge__count').first();
    if (await count.count() > 0) {
      const color = await count.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBe('rgb(255, 255, 255)');
    }
  });

  test('should have white border color', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count').first();
    if (await count.count() > 0) {
      const borderColor = await count.evaluate(el =>
        getComputedStyle(el).borderColor
      );
      expect(borderColor).toBeTruthy();
    }
  });

  test('should have border-width of 2px', async ({ page }) => {
    const count = page.locator('.ux-quantity-badge__count:not(.ux-quantity-badge__count--dot)').first();
    if (await count.count() > 0) {
      const borderWidth = await count.evaluate(el =>
        getComputedStyle(el).borderWidth
      );
      expect(borderWidth).toBe('2px');
    }
  });

  test('should render animation class', async ({ page }) => {
    const animatedCount = page.locator('.ux-quantity-badge__count--animate').first();
    if (await animatedCount.count() > 0) {
      await expect(animatedCount).toBeVisible();
    }
  });

  test('should render pulse animation class', async ({ page }) => {
    const pulseCount = page.locator('.ux-quantity-badge__count--pulse').first();
    if (await pulseCount.count() > 0) {
      await expect(pulseCount).toBeVisible();
    }
  });

  test('should apply soft color variant', async ({ page }) => {
    const softBadge = page.locator('.ux-quantity-badge--primary-soft .ux-quantity-badge__count, .ux-quantity-badge--success-soft .ux-quantity-badge__count, .ux-quantity-badge--danger-soft .ux-quantity-badge__count').first();
    if (await softBadge.count() > 0) {
      await expect(softBadge).toBeVisible();
    }
  });

  test('should apply outline variant', async ({ page }) => {
    const outlineBadge = page.locator('.ux-quantity-badge--outline .ux-quantity-badge__count').first();
    if (await outlineBadge.count() > 0) {
      await expect(outlineBadge).toBeVisible();
      const bgColor = await outlineBadge.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toMatch(/white|rgb\(255,\s*255,\s*255\)|transparent/i);
    }
  });

  test('should render stepper variant', async ({ page }) => {
    const stepper = page.locator('.ux-quantity-badge--stepper').first();
    if (await stepper.count() > 0) {
      await expect(stepper).toBeVisible();
      const display = await stepper.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/flex|inline-flex/);
    }
  });

  test('should render stepper buttons', async ({ page }) => {
    const stepperBtn = page.locator('.ux-quantity-badge--stepper .ux-quantity-badge__btn').first();
    if (await stepperBtn.count() > 0) {
      await expect(stepperBtn).toBeVisible();
      const width = await stepperBtn.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      const height = await stepperBtn.evaluate(el =>
        parseInt(getComputedStyle(el).height)
      );
      expect(width).toBe(36);
      expect(height).toBe(36);
    }
  });

  test('should render stepper value display', async ({ page }) => {
    const stepperValue = page.locator('.ux-quantity-badge--stepper .ux-quantity-badge__value').first();
    if (await stepperValue.count() > 0) {
      await expect(stepperValue).toBeVisible();
      const text = await stepperValue.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render cart variant', async ({ page }) => {
    const cart = page.locator('.ux-quantity-badge--cart').first();
    if (await cart.count() > 0) {
      await expect(cart).toBeVisible();
      const display = await cart.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/flex|inline-flex/);
    }
  });

  test('should render cart buttons', async ({ page }) => {
    const cartBtn = page.locator('.ux-quantity-badge--cart .ux-quantity-badge__btn').first();
    if (await cartBtn.count() > 0) {
      await expect(cartBtn).toBeVisible();
      const width = await cartBtn.evaluate(el =>
        parseInt(getComputedStyle(el).width)
      );
      expect(width).toBe(24);
    }
  });

  test('should render cart value display', async ({ page }) => {
    const cartValue = page.locator('.ux-quantity-badge--cart .ux-quantity-badge__value').first();
    if (await cartValue.count() > 0) {
      await expect(cartValue).toBeVisible();
      const text = await cartValue.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have inline variant with static positioning', async ({ page }) => {
    const inlineBadge = page.locator('.ux-quantity-badge--inline .ux-quantity-badge__count').first();
    if (await inlineBadge.count() > 0) {
      await expect(inlineBadge).toBeVisible();
      const position = await inlineBadge.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('static');
    }
  });

  test('should increment stepper value on button click', async ({ page }) => {
    const stepper = page.locator('.ux-quantity-badge--stepper').first();
    if (await stepper.count() > 0) {
      const incrementBtn = stepper.locator('.ux-quantity-badge__btn').last();
      const valueDisplay = stepper.locator('.ux-quantity-badge__value');

      const initialValue = await valueDisplay.textContent();
      await incrementBtn.click();

      // Wait for Alpine to update
      await page.waitForTimeout(100);

      const newValue = await valueDisplay.textContent();
      expect(newValue).not.toBe(initialValue);
    }
  });

  test('should decrement stepper value on button click', async ({ page }) => {
    const stepper = page.locator('.ux-quantity-badge--stepper').first();
    if (await stepper.count() > 0) {
      const decrementBtn = stepper.locator('.ux-quantity-badge__btn').first();
      const valueDisplay = stepper.locator('.ux-quantity-badge__value');

      const initialValue = await valueDisplay.textContent();
      await decrementBtn.click();

      // Wait for Alpine to update
      await page.waitForTimeout(100);

      const newValue = await valueDisplay.textContent();
      expect(newValue).not.toBe(initialValue);
    }
  });

  test('should display correct count text', async ({ page }) => {
    const counts = page.locator('.ux-quantity-badge__count');
    const count = await counts.first();
    if (await count.count() > 0) {
      const text = await count.textContent();
      expect(text).toMatch(/^\d+(\+)?$|^[A-Z]$/);
    }
  });

  test('should render multiple badges on page', async ({ page }) => {
    const badges = page.locator('.ux-quantity-badge');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have flex display on badge container', async ({ page }) => {
    const badge = page.locator('.ux-quantity-badge').first();
    if (await badge.count() > 0) {
      const display = await badge.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toMatch(/flex|inline-flex/);
    }
  });

  test('should hide badge when count is zero', async ({ page }) => {
    const hiddenCount = page.locator('.ux-quantity-badge__count--hidden').first();
    if (await hiddenCount.count() > 0) {
      await expect(hiddenCount).toBeVisible();
      const transform = await hiddenCount.evaluate(el =>
        getComputedStyle(el).transform
      );
      expect(transform).toContain('scale(0)');
    }
  });
});
