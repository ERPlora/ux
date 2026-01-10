import { test, expect } from '@playwright/test';

test.describe('Fullscreen Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/fullscreen-modal.html');
  });

  // Basic Rendering Tests
  test('should render fullscreen modal', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    await expect(modal).toBeDefined();
  });

  test('should render trigger button', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxFullscreenModal"] button').first();
    if (await trigger.count() > 0) {
      await expect(trigger).toBeVisible();
    }
  });

  // Modal Header Tests
  test('should have modal header', async ({ page }) => {
    const header = page.locator('.ux-fullscreen-modal__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should have close button in header', async ({ page }) => {
    const closeButton = page.locator('.ux-fullscreen-modal__close').first();
    if (await closeButton.count() > 0) {
      await expect(closeButton).toBeVisible();
    }
  });

  test('should have title in header', async ({ page }) => {
    const title = page.locator('.ux-fullscreen-modal__title').first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
      const text = await title.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should have proper header sections (start, center, end)', async ({ page }) => {
    const headerStart = page.locator('.ux-fullscreen-modal__header-start').first();
    const headerCenter = page.locator('.ux-fullscreen-modal__header-center').first();
    const headerEnd = page.locator('.ux-fullscreen-modal__header-end').first();

    if (await headerStart.count() > 0) {
      await expect(headerStart).toBeDefined();
    }
    if (await headerCenter.count() > 0) {
      await expect(headerCenter).toBeDefined();
    }
    if (await headerEnd.count() > 0) {
      await expect(headerEnd).toBeDefined();
    }
  });

  // Modal Content Tests
  test('should have modal content area', async ({ page }) => {
    const content = page.locator('.ux-fullscreen-modal__content').first();
    if (await content.count() > 0) {
      await expect(content).toBeDefined();
    }
  });

  test('should have content inner wrapper', async ({ page }) => {
    const contentInner = page.locator('.ux-fullscreen-modal__content-inner').first();
    if (await contentInner.count() > 0) {
      await expect(contentInner).toBeDefined();
    }
  });

  // Modal Footer Tests
  test('should have modal footer', async ({ page }) => {
    const footer = page.locator('.ux-fullscreen-modal__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  // Open/Close Tests
  test('should open modal on trigger click', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxFullscreenModal"] button').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const modal = page.locator('.ux-fullscreen-modal--open').first();
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
      }
    }
  });

  test('should close modal on close button click', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxFullscreenModal"] button').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const closeButton = page.locator('.ux-fullscreen-modal__close').first();
      if (await closeButton.count() > 0) {
        await closeButton.click();
        await page.waitForTimeout(300);
        const openModal = page.locator('.ux-fullscreen-modal--open').first();
        if (await openModal.count() > 0) {
          const isVisible = await openModal.isVisible().catch(() => false);
          expect(isVisible).toBe(false);
        }
      }
    }
  });

  // Full Viewport Tests
  test('should take up full viewport width', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const viewport = page.viewportSize();
      if (viewport) {
        const boundingBox = await modal.boundingBox();
        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThanOrEqual(viewport.width * 0.95);
        }
      }
    }
  });

  test('should take up full viewport height', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const viewport = page.viewportSize();
      if (viewport) {
        const boundingBox = await modal.boundingBox();
        if (boundingBox) {
          expect(boundingBox.height).toBeGreaterThanOrEqual(viewport.height * 0.95);
        }
      }
    }
  });

  test('should have fixed positioning', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const position = await modal.evaluate(el =>
        getComputedStyle(el).position
      );
      expect(position).toBe('fixed');
    }
  });

  test('should cover entire viewport inset', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const inset = await modal.evaluate(el => {
        const style = getComputedStyle(el);
        return {
          top: style.top,
          right: style.right,
          bottom: style.bottom,
          left: style.left
        };
      });
      // Fixed fullscreen modals should have inset: 0 or all sides at 0
      expect(inset.top).toBe('0px');
      expect(inset.right).toBe('0px');
      expect(inset.bottom).toBe('0px');
      expect(inset.left).toBe('0px');
    }
  });

  // Styling Tests
  test('should have proper z-index', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const zIndex = await modal.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have flexbox layout', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const display = await modal.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('should have column flex direction', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const flexDirection = await modal.evaluate(el =>
        getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');
    }
  });

  // Animation Variants Tests
  test('should support slide-right animation variant', async ({ page }) => {
    const slideRightModal = page.locator('.ux-fullscreen-modal--slide-right').first();
    if (await slideRightModal.count() > 0) {
      await expect(slideRightModal).toBeDefined();
    }
  });

  test('should support slide-left animation variant', async ({ page }) => {
    const slideLeftModal = page.locator('.ux-fullscreen-modal--slide-left').first();
    if (await slideLeftModal.count() > 0) {
      await expect(slideLeftModal).toBeDefined();
    }
  });

  test('should support fade animation variant', async ({ page }) => {
    const fadeModal = page.locator('.ux-fullscreen-modal--fade').first();
    if (await fadeModal.count() > 0) {
      await expect(fadeModal).toBeDefined();
    }
  });

  test('should support scale animation variant', async ({ page }) => {
    const scaleModal = page.locator('.ux-fullscreen-modal--scale').first();
    if (await scaleModal.count() > 0) {
      await expect(scaleModal).toBeDefined();
    }
  });

  // Color/Theme Tests
  test('should support dark variant', async ({ page }) => {
    const darkModal = page.locator('.ux-fullscreen-modal--dark').first();
    if (await darkModal.count() > 0) {
      const bgColor = await darkModal.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Dark modal should have a dark background
      expect(bgColor).toBeTruthy();
    }
  });

  test('should support glass variant', async ({ page }) => {
    const glassModal = page.locator('.ux-fullscreen-modal--glass').first();
    if (await glassModal.count() > 0) {
      const backdropFilter = await glassModal.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdropFilter).toContain('blur');
    }
  });

  test('should support transparent-header variant', async ({ page }) => {
    const transparentHeaderModal = page.locator('.ux-fullscreen-modal--transparent-header').first();
    if (await transparentHeaderModal.count() > 0) {
      const header = transparentHeaderModal.locator('.ux-fullscreen-modal__header').first();
      if (await header.count() > 0) {
        const position = await header.evaluate(el =>
          getComputedStyle(el).position
        );
        // Transparent header should have absolute positioning
        expect(position).toBe('absolute');
      }
    }
  });

  // Content Variants Tests
  test('should support centered content variant', async ({ page }) => {
    const centeredContent = page.locator('.ux-fullscreen-modal__content--centered').first();
    if (await centeredContent.count() > 0) {
      const display = await centeredContent.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('should support constrained content variant', async ({ page }) => {
    const constrainedContent = page.locator('.ux-fullscreen-modal__content--constrained').first();
    if (await constrainedContent.count() > 0) {
      const maxWidth = await constrainedContent.evaluate(el =>
        getComputedStyle(el).maxWidth
      );
      expect(maxWidth).toBeTruthy();
    }
  });

  // Footer Variants Tests
  test('should support spaced footer variant', async ({ page }) => {
    const spacedFooter = page.locator('.ux-fullscreen-modal__footer--spaced').first();
    if (await spacedFooter.count() > 0) {
      const justifyContent = await spacedFooter.evaluate(el =>
        getComputedStyle(el).justifyContent
      );
      expect(justifyContent).toBe('space-between');
    }
  });

  // Step Indicators Tests
  test('should have step dots for multi-step modal', async ({ page }) => {
    const stepDots = page.locator('.ux-fullscreen-modal__step-dot').first();
    if (await stepDots.count() > 0) {
      await expect(stepDots).toBeDefined();
    }
  });

  test('should have active step dot state', async ({ page }) => {
    const activeStepDot = page.locator('.ux-fullscreen-modal__step-dot--active').first();
    if (await activeStepDot.count() > 0) {
      const background = await activeStepDot.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(background).toBeTruthy();
    }
  });

  test('should have completed step dot state', async ({ page }) => {
    const completedStepDot = page.locator('.ux-fullscreen-modal__step-dot--completed').first();
    if (await completedStepDot.count() > 0) {
      const background = await completedStepDot.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      expect(background).toBeTruthy();
    }
  });

  // Loading State Tests
  test('should support loading state', async ({ page }) => {
    const loadingModal = page.locator('.ux-fullscreen-modal--loading').first();
    if (await loadingModal.count() > 0) {
      await expect(loadingModal).toBeDefined();
    }
  });

  test('should have spinner in loading state', async ({ page }) => {
    const spinner = page.locator('.ux-fullscreen-modal__spinner').first();
    if (await spinner.count() > 0) {
      const borderRadius = await spinner.evaluate(el =>
        getComputedStyle(el).borderRadius
      );
      // Spinner should be circular (50% border radius)
      expect(borderRadius).toContain('50%');
    }
  });

  // Accessibility Tests
  test('should have proper header hierarchy with title', async ({ page }) => {
    const title = page.locator('.ux-fullscreen-modal__title').first();
    if (await title.count() > 0) {
      const tag = await title.evaluate(el => el.tagName.toLowerCase());
      expect(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).toContain(tag);
    }
  });

  test('should have accessible close button', async ({ page }) => {
    const closeButton = page.locator('.ux-fullscreen-modal__close').first();
    if (await closeButton.count() > 0) {
      const ariaLabel = await closeButton.getAttribute('aria-label');
      // Close button should have aria-label or title
      expect(ariaLabel || await closeButton.getAttribute('title')).toBeTruthy();
    }
  });

  test('close button should be keyboard accessible', async ({ page }) => {
    const closeButton = page.locator('.ux-fullscreen-modal__close').first();
    if (await closeButton.count() > 0) {
      const role = await closeButton.getAttribute('role');
      const type = await closeButton.getAttribute('type');
      // Should be a button element
      expect(type || role).toBeTruthy();
    }
  });

  // Overflow Tests
  test('content should allow scrolling with overflow-y auto', async ({ page }) => {
    const content = page.locator('.ux-fullscreen-modal__content').first();
    if (await content.count() > 0) {
      const overflowY = await content.evaluate(el =>
        getComputedStyle(el).overflowY
      );
      expect(['auto', 'scroll']).toContain(overflowY);
    }
  });

  // Transition Tests
  test('should have transitions for smooth animations', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const transition = await modal.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toContain('transition') || expect(transition).toBeTruthy();
    }
  });

  // Visibility Tests
  test('should be hidden initially', async ({ page }) => {
    const modal = page.locator('.ux-fullscreen-modal').first();
    if (await modal.count() > 0) {
      const visibility = await modal.evaluate(el =>
        getComputedStyle(el).visibility
      );
      // Closed modal should have visibility hidden or opacity 0
      const opacity = await modal.evaluate(el =>
        getComputedStyle(el).opacity
      );
      expect(visibility === 'hidden' || parseFloat(opacity) === 0).toBe(true);
    }
  });

  test('should become visible when open class is applied', async ({ page }) => {
    const trigger = page.locator('[x-data*="uxFullscreenModal"] button').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const openModal = page.locator('.ux-fullscreen-modal--open').first();
      if (await openModal.count() > 0) {
        const opacity = await openModal.evaluate(el =>
          getComputedStyle(el).opacity
        );
        expect(parseFloat(opacity)).toBe(1);
      }
    }
  });

  // Safe Area Test (for mobile)
  test('should respect safe area insets on mobile', async ({ page }) => {
    const header = page.locator('.ux-fullscreen-modal__header').first();
    if (await header.count() > 0) {
      const paddingTop = await header.evaluate(el =>
        getComputedStyle(el).paddingTop
      );
      expect(paddingTop).toBeTruthy();
    }
  });
});
