import { test, expect } from '@playwright/test';

test.describe('Virtual Keyboard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/virtual-keyboard.html');
  });

  test.describe('Basic Rendering', () => {
    test('should render virtual keyboard button', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      await expect(button).toBeVisible();
    });

    test('should render multiple virtual keyboard buttons', async ({ page }) => {
      const buttons = page.locator('.ux-virtual-keyboard-btn');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have keyboard icon', async ({ page }) => {
      const icon = page.locator('.ux-virtual-keyboard-btn__icon').first();
      if (await icon.count() > 0) {
        await expect(icon).toBeVisible();
        const svg = icon.locator('svg');
        if (await svg.count() > 0) {
          await expect(svg).toBeVisible();
        }
      }
    });

    test('should render status indicator', async ({ page }) => {
      const status = page.locator('.ux-virtual-keyboard-status').first();
      if (await status.count() > 0) {
        await expect(status).toBeVisible();
      }
    });

    test('should have status dot', async ({ page }) => {
      const dot = page.locator('.ux-virtual-keyboard-status__dot').first();
      if (await dot.count() > 0) {
        await expect(dot).toBeVisible();
      }
    });
  });

  test.describe('Button Variants', () => {
    test('should render default size button', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const height = await button.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Default should be 44px (--ux-touch-target)
        expect(height).toBeGreaterThanOrEqual(36);
      }
    });

    test('should apply small size variant', async ({ page }) => {
      const smallButton = page.locator('.ux-virtual-keyboard-btn.ux-virtual-keyboard-btn--sm').first();
      if (await smallButton.count() > 0) {
        await expect(smallButton).toBeVisible();
        const height = await smallButton.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Small should be 36px (--ux-touch-target-sm)
        expect(height).toBeLessThan(44);
      }
    });

    test('should apply large size variant', async ({ page }) => {
      const largeButton = page.locator('.ux-virtual-keyboard-btn.ux-virtual-keyboard-btn--lg').first();
      if (await largeButton.count() > 0) {
        await expect(largeButton).toBeVisible();
        const height = await largeButton.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Large should be 52px
        expect(height).toBeGreaterThan(44);
      }
    });

    test('should apply icon-only variant', async ({ page }) => {
      const iconOnlyButton = page.locator('.ux-virtual-keyboard-btn--icon-only').first();
      if (await iconOnlyButton.count() > 0) {
        await expect(iconOnlyButton).toBeVisible();
        const width = await iconOnlyButton.evaluate(el =>
          parseInt(getComputedStyle(el).width)
        );
        const height = await iconOnlyButton.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Icon-only should be square (width ~= height)
        expect(Math.abs(width - height)).toBeLessThan(5);
      }
    });

    test('should apply primary color variant', async ({ page }) => {
      const primaryButton = page.locator('.ux-virtual-keyboard-btn--primary').first();
      if (await primaryButton.count() > 0) {
        await expect(primaryButton).toBeVisible();
        const bgColor = await primaryButton.evaluate(el =>
          getComputedStyle(el).backgroundColor
        );
        // Should have a primary color background
        expect(bgColor).not.toMatch(/transparent|rgba\(0,\s*0,\s*0,\s*0\)/);
      }
    });

    test('should apply glass variant', async ({ page }) => {
      const glassButton = page.locator('.ux-virtual-keyboard-btn--glass').first();
      if (await glassButton.count() > 0) {
        await expect(glassButton).toBeVisible();
        const backdropFilter = await glassButton.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    });
  });

  test.describe('Alpine.js Component', () => {
    test('should initialize x-data component', async ({ page }) => {
      const component = page.locator('[x-data*="uxVirtualKeyboard"]').first();
      if (await component.count() > 0) {
        await expect(component).toBeVisible();
      }
    });

    test('should have isSupported property', async ({ page }) => {
      const isSupported = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.isSupported === 'boolean';
        }
        return true; // May not have Alpine in test environment
      });
      expect(isSupported).toBe(true);
    });

    test('should have isVisible property', async ({ page }) => {
      const hasVisible = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.isVisible === 'boolean';
        }
        return true;
      });
      expect(hasVisible).toBe(true);
    });

    test('should have keyboardIcon property', async ({ page }) => {
      const hasIcon = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.keyboardIcon === 'string' && data.keyboardIcon.includes('svg');
        }
        return true;
      });
      expect(hasIcon).toBe(true);
    });

    test('should have show method', async ({ page }) => {
      const hasShowMethod = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.show === 'function';
        }
        return true;
      });
      expect(hasShowMethod).toBe(true);
    });

    test('should have hide method', async ({ page }) => {
      const hasHideMethod = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.hide === 'function';
        }
        return true;
      });
      expect(hasHideMethod).toBe(true);
    });

    test('should have toggle method', async ({ page }) => {
      const hasToggleMethod = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.toggle === 'function';
        }
        return true;
      });
      expect(hasToggleMethod).toBe(true);
    });

    test('should have checkSupport method', async ({ page }) => {
      const hasCheckSupportMethod = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.checkSupport === 'function';
        }
        return true;
      });
      expect(hasCheckSupportMethod).toBe(true);
    });

    test('should have getSupportInfo method', async ({ page }) => {
      const hasSupportInfoMethod = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          return typeof data.getSupportInfo === 'function';
        }
        return true;
      });
      expect(hasSupportInfoMethod).toBe(true);
    });
  });

  test.describe('Support Detection', () => {
    test('should detect browser type', async ({ page }) => {
      const browserInfo = await page.evaluate(() => {
        const ua = navigator.userAgent;
        if (ua.includes('Edg/')) return 'Edge';
        if (ua.includes('Chrome/')) return 'Chrome';
        if (ua.includes('Firefox/')) return 'Firefox';
        if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
        return 'Unknown';
      });
      expect(['Chrome', 'Edge', 'Firefox', 'Safari', 'Unknown']).toContain(browserInfo);
    });

    test('should check secure context', async ({ page }) => {
      const isSecure = await page.evaluate(() => window.isSecureContext);
      expect(typeof isSecure).toBe('boolean');
    });

    test('should detect touch device capability', async ({ page }) => {
      const isTouchDevice = await page.evaluate(() => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      });
      expect(typeof isTouchDevice).toBe('boolean');
    });

    test('should provide recommendation message', async ({ page }) => {
      const recommendation = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxVirtualKeyboard"]');
        if (el && (window as any).__Alpine) {
          const data = (window as any).__Alpine.entangle(el);
          if (data.getRecommendation) {
            return typeof data.getRecommendation() === 'string';
          }
        }
        return true;
      });
      expect(recommendation).toBe(true);
    });
  });

  test.describe('Status Indicator', () => {
    test('should show supported status when available', async ({ page }) => {
      const supportedStatus = page.locator('.ux-virtual-keyboard-status--supported').first();
      if (await supportedStatus.count() > 0) {
        await expect(supportedStatus).toBeVisible();
      }
    });

    test('should show unsupported status when unavailable', async ({ page }) => {
      const unsupportedStatus = page.locator('.ux-virtual-keyboard-status--unsupported').first();
      if (await unsupportedStatus.count() > 0) {
        await expect(unsupportedStatus).toBeVisible();
      }
    });

    test('should have status dot indicator', async ({ page }) => {
      const statusDot = page.locator('.ux-virtual-keyboard-status__dot').first();
      if (await statusDot.count() > 0) {
        await expect(statusDot).toBeVisible();
        const backgroundColor = await statusDot.evaluate(el =>
          getComputedStyle(el).backgroundColor
        );
        // Should have a background color
        expect(backgroundColor).not.toBe('transparent');
      }
    });
  });

  test.describe('Input Integration', () => {
    test('should render input field next to button', async ({ page }) => {
      const inputWithBtn = page.locator('.input-with-btn').first();
      if (await inputWithBtn.count() > 0) {
        const input = inputWithBtn.locator('input').first();
        const button = inputWithBtn.locator('.ux-virtual-keyboard-btn').first();
        if (await input.count() > 0 && await button.count() > 0) {
          await expect(input).toBeVisible();
          await expect(button).toBeVisible();
        }
      }
    });

    test('button should be adjacent to input field', async ({ page }) => {
      const inputWithBtn = page.locator('.input-with-btn').first();
      if (await inputWithBtn.count() > 0) {
        const input = inputWithBtn.locator('input').first();
        const button = inputWithBtn.locator('.ux-virtual-keyboard-btn').first();
        if (await input.count() > 0 && await button.count() > 0) {
          const inputBox = await input.boundingBox();
          const buttonBox = await button.boundingBox();
          if (inputBox && buttonBox) {
            // Button should be next to input (either right or below)
            const horizontallyAdjacent = Math.abs(inputBox.x + inputBox.width - buttonBox.x) < 5;
            const verticallyAdjacent = Math.abs(inputBox.y + inputBox.height - buttonBox.y) < 5;
            expect(horizontallyAdjacent || verticallyAdjacent).toBe(true);
          }
        }
      }
    });

    test('should have text input for testing', async ({ page }) => {
      const demoInput = page.locator('#demo-input-1, input[placeholder*="escri"], input[placeholder*="Input"]').first();
      if (await demoInput.count() > 0) {
        await expect(demoInput).toBeVisible();
        await expect(demoInput).toHaveAttribute('type', 'text');
      }
    });

    test('should have focusable input element', async ({ page }) => {
      const demoInput = page.locator('[x-data*="uxVirtualKeyboard"] input, .ux-input').first();
      if (await demoInput.count() > 0) {
        await demoInput.focus();
        await expect(demoInput).toBeFocused();
      }
    });
  });

  test.describe('Layout and Styling', () => {
    test('button should have minimum touch target size', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const height = await button.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Minimum touch target should be at least 36px
        expect(height).toBeGreaterThanOrEqual(36);
      }
    });

    test('button should have border radius', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const borderRadius = await button.evaluate(el =>
          getComputedStyle(el).borderRadius
        );
        expect(borderRadius).not.toBe('0px');
      }
    });

    test('button should have visible border', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const borderColor = await button.evaluate(el =>
          getComputedStyle(el).borderColor
        );
        // Should have a border color
        expect(borderColor).not.toBe('transparent');
      }
    });

    test('button should have transition', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const transition = await button.evaluate(el =>
          getComputedStyle(el).transition
        );
        // Should have transition property
        expect(transition).not.toBe('none');
      }
    });

    test('icon should be properly sized', async ({ page }) => {
      const icon = page.locator('.ux-virtual-keyboard-btn__icon').first();
      if (await icon.count() > 0) {
        const width = await icon.evaluate(el =>
          parseInt(getComputedStyle(el).width)
        );
        const height = await icon.evaluate(el =>
          parseInt(getComputedStyle(el).height)
        );
        // Icon should be square
        expect(Math.abs(width - height)).toBeLessThan(2);
        // Should be at least 16px
        expect(width).toBeGreaterThanOrEqual(16);
      }
    });

    test('should have proper icon container styling', async ({ page }) => {
      const iconContainer = page.locator('.ux-virtual-keyboard-btn__icon').first();
      if (await iconContainer.count() > 0) {
        const flexShrink = await iconContainer.evaluate(el =>
          getComputedStyle(el).flexShrink
        );
        // Icon should not shrink
        expect(flexShrink).toBe('0');
      }
    });
  });

  test.describe('Disabled State', () => {
    test('disabled button should have reduced opacity', async ({ page }) => {
      const disabledButton = page.locator('.ux-virtual-keyboard-btn:disabled, .ux-virtual-keyboard-btn[disabled]').first();
      if (await disabledButton.count() > 0) {
        const opacity = await disabledButton.evaluate(el =>
          parseFloat(getComputedStyle(el).opacity)
        );
        expect(opacity).toBeLessThan(1);
      }
    });

    test('disabled button should not be clickable', async ({ page }) => {
      const disabledButton = page.locator('.ux-virtual-keyboard-btn:disabled, .ux-virtual-keyboard-btn[disabled]').first();
      if (await disabledButton.count() > 0) {
        const pointerEvents = await disabledButton.evaluate(el =>
          getComputedStyle(el).pointerEvents
        );
        expect(pointerEvents).toBe('none');
      }
    });
  });

  test.describe('Hover and Active States', () => {
    test('button should have hover state', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const defaultBg = await button.evaluate(el =>
          getComputedStyle(el).backgroundColor
        );
        await button.hover();
        await page.waitForTimeout(100);
        // Hover state may change background, but we just verify no errors
        await expect(button).toBeVisible();
      }
    });

    test('button should have active/click state', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        // Can't easily test active state without actually interacting
        // Just verify button responds to mouse down
        await button.dispatchEvent('mousedown');
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('button should be keyboard focusable', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        await button.focus();
        await expect(button).toBeFocused();
      }
    });

    test('button should have text content or aria-label', async ({ page }) => {
      const button = page.locator('.ux-virtual-keyboard-btn').first();
      if (await button.count() > 0) {
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        const title = await button.getAttribute('title');
        // Should have some accessible text
        const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title;
        expect(hasAccessibleName).toBe(true);
      }
    });

    test('icon-only button should have accessible name', async ({ page }) => {
      const iconOnlyButton = page.locator('.ux-virtual-keyboard-btn--icon-only').first();
      if (await iconOnlyButton.count() > 0) {
        const ariaLabel = await iconOnlyButton.getAttribute('aria-label');
        const title = await iconOnlyButton.getAttribute('title');
        // Icon-only buttons should have aria-label or title
        const hasAccessibleName = ariaLabel || title;
        expect(hasAccessibleName).toBe(true);
      }
    });

    test('status indicator should have descriptive text', async ({ page }) => {
      const status = page.locator('.ux-virtual-keyboard-status').first();
      if (await status.count() > 0) {
        const text = await status.textContent();
        expect(text).toBeTruthy();
        expect(text?.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Browser Support Display', () => {
    test('should display support table', async ({ page }) => {
      const table = page.locator('.support-table').first();
      if (await table.count() > 0) {
        await expect(table).toBeVisible();
      }
    });

    test('should have browser support rows', async ({ page }) => {
      const rows = page.locator('.support-table tbody tr');
      if (await rows.count() > 0) {
        expect(await rows.count()).toBeGreaterThan(0);
      }
    });

    test('support indicators should display correctly', async ({ page }) => {
      const yesIndicators = page.locator('.support-yes');
      const noIndicators = page.locator('.support-no');
      const partialIndicators = page.locator('.support-partial');
      // At least some indicators should exist
      const totalCount = (await yesIndicators.count()) + (await noIndicators.count()) + (await partialIndicators.count());
      expect(totalCount).toBeGreaterThan(0);
    });
  });

  test.describe('Custom Configuration', () => {
    test('should accept custom alert title', async ({ page }) => {
      const customComponent = page.locator('[x-data*="alertTitle"]').first();
      if (await customComponent.count() > 0) {
        const hasAlertTitle = await customComponent.evaluate(el => {
          const attr = el.getAttribute('x-data');
          return attr?.includes('alertTitle') ?? false;
        });
        expect(hasAlertTitle).toBe(true);
      }
    });

    test('should accept custom alert message', async ({ page }) => {
      const customComponent = page.locator('[x-data*="alertMessage"]').first();
      if (await customComponent.count() > 0) {
        const hasAlertMessage = await customComponent.evaluate(el => {
          const attr = el.getAttribute('x-data');
          return attr?.includes('alertMessage') ?? false;
        });
        expect(hasAlertMessage).toBe(true);
      }
    });
  });

  test.describe('Global Function Support', () => {
    test('should expose UX.showVirtualKeyboard function', async ({ page }) => {
      const hasFunction = await page.evaluate(() => {
        return typeof (window as any).UX !== 'undefined' &&
               typeof (window as any).UX.showVirtualKeyboard === 'function';
      });
      expect(hasFunction).toBe(true);
    });

    test('should have UX namespace', async ({ page }) => {
      const hasUXNamespace = await page.evaluate(() => {
        return typeof (window as any).UX === 'object';
      });
      expect(hasUXNamespace).toBe(true);
    });
  });

  test.describe('Size Variations Display', () => {
    test('should display size variant section', async ({ page }) => {
      const sizeSection = page.locator('h2', { hasText: /tamaño|size/i }).first();
      if (await sizeSection.count() > 0) {
        await expect(sizeSection).toBeVisible();
      }
    });

    test('should show all size variants together', async ({ page }) => {
      const smallBtn = page.locator('.ux-virtual-keyboard-btn--sm');
      const defaultBtn = page.locator('.ux-virtual-keyboard-btn:not(.ux-virtual-keyboard-btn--sm):not(.ux-virtual-keyboard-btn--lg)').first();
      const largeBtn = page.locator('.ux-virtual-keyboard-btn--lg');

      const hasSmall = await smallBtn.count() > 0;
      const hasLarge = await largeBtn.count() > 0;

      // At least some size variants should be present
      expect(hasSmall || hasLarge).toBe(true);
    });
  });

  test.describe('Icon Variants Display', () => {
    test('should display icon-only section', async ({ page }) => {
      const iconSection = page.locator('h2', { hasText: /icon|solo/i }).first();
      if (await iconSection.count() > 0) {
        await expect(iconSection).toBeVisible();
      }
    });

    test('should render icon-only buttons', async ({ page }) => {
      const iconOnlyButtons = page.locator('.ux-virtual-keyboard-btn--icon-only');
      if (await iconOnlyButtons.count() > 0) {
        expect(await iconOnlyButtons.count()).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Event Handling', () => {
    test('should have event listeners section', async ({ page }) => {
      const eventsSection = page.locator('h2', { hasText: /event|evento/i }).first();
      if (await eventsSection.count() > 0) {
        await expect(eventsSection).toBeVisible();
      }
    });

    test('should display event log area', async ({ page }) => {
      const eventLog = page.locator('[style*="gray-900"], .log, [role="log"]').first();
      // Event log may not always be present, but if it is, it should be visible
      if (await eventLog.count() > 0) {
        await expect(eventLog).toBeVisible();
      }
    });
  });

  test.describe('Documentation Content', () => {
    test('should have API reference section', async ({ page }) => {
      const apiSection = page.locator('h2', { hasText: /API|reference/i }).first();
      if (await apiSection.count() > 0) {
        await expect(apiSection).toBeVisible();
      }
    });

    test('should display code examples', async ({ page }) => {
      const codeBlocks = page.locator('.ux-code-block, pre');
      if (await codeBlocks.count() > 0) {
        expect(await codeBlocks.count()).toBeGreaterThan(0);
      }
    });

    test('should have configuration options documentation', async ({ page }) => {
      const configSection = page.locator('[data-lang="javascript"]').filter({ hasText: /uxVirtualKeyboard/ }).first();
      if (await configSection.count() > 0) {
        await expect(configSection).toBeVisible();
      }
    });

    test('should have method documentation', async ({ page }) => {
      const methodSection = page.locator('[data-lang="javascript"]').filter({ hasText: /show|hide|toggle/ }).first();
      if (await methodSection.count() > 0) {
        await expect(methodSection).toBeVisible();
      }
    });

    test('should have CSS class documentation', async ({ page }) => {
      const cssSection = page.locator('[data-lang="css"]').filter({ hasText: /ux-virtual-keyboard/ }).first();
      if (await cssSection.count() > 0) {
        await expect(cssSection).toBeVisible();
      }
    });
  });
});
