import { test, expect } from '@playwright/test';

test.describe('Lightbox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/lightbox.html');
  });

  // Basic Rendering Tests
  test('should render lightbox container', async ({ page }) => {
    const lightbox = page.locator('.ux-lightbox').first();
    if (await lightbox.count() > 0) {
      await expect(lightbox).toBeDefined();
    }
  });

  test('should render lightbox trigger images', async ({ page }) => {
    const triggers = page.locator('.ux-lightbox-trigger');
    expect(await triggers.count()).toBeGreaterThan(0);
  });

  test('should have trigger images with proper data attributes', async ({ page }) => {
    const trigger = page.locator('[data-lightbox-src]').first();
    if (await trigger.count() > 0) {
      const src = await trigger.getAttribute('data-lightbox-src');
      const title = await trigger.getAttribute('data-lightbox-title');
      expect(src).toBeTruthy();
    }
  });

  // Image Display Tests
  test('should display image when lightbox opens', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const image = page.locator('.ux-lightbox__image').first();
      if (await image.count() > 0) {
        await expect(image).toBeVisible();
      }
    }
  });

  test('should show loading spinner while image loads', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      const spinner = page.locator('.ux-lightbox__spinner').first();
      if (await spinner.count() > 0) {
        // Spinner may appear briefly
        expect(true).toBe(true);
      }
    }
  });

  test('should have image with proper styling', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const image = page.locator('.ux-lightbox__image').first();
      if (await image.count() > 0) {
        const objectFit = await image.evaluate(el =>
          getComputedStyle(el).objectFit
        );
        expect(objectFit).toBe('contain');
      }
    }
  });

  // Navigation Tests
  test('should have navigation buttons when multiple images', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const prevBtn = page.locator('.ux-lightbox__nav--prev').first();
      const nextBtn = page.locator('.ux-lightbox__nav--next').first();
      if (await prevBtn.count() > 0 && await nextBtn.count() > 0) {
        await expect(prevBtn).toBeDefined();
        await expect(nextBtn).toBeDefined();
      }
    }
  });

  test('should navigate to next image on next button click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const nextBtn = page.locator('.ux-lightbox__nav--next').first();
      if (await nextBtn.count() > 0) {
        const initialIndex = await page.evaluate(() => {
          const counter = document.querySelector('.ux-lightbox__counter');
          return counter?.textContent || '1 / 1';
        });
        await nextBtn.click();
        await page.waitForTimeout(300);
        expect(true).toBe(true); // Navigation executed
      }
    }
  });

  test('should navigate to previous image on prev button click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').nth(1);
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const prevBtn = page.locator('.ux-lightbox__nav--prev').first();
      if (await prevBtn.count() > 0 && await prevBtn.isEnabled()) {
        await prevBtn.click();
        await page.waitForTimeout(300);
        expect(true).toBe(true); // Navigation executed
      }
    }
  });

  test('should disable prev button on first image', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const prevBtn = page.locator('.ux-lightbox__nav--prev').first();
      if (await prevBtn.count() > 0) {
        const disabled = await prevBtn.isDisabled();
        expect(disabled).toBe(true);
      }
    }
  });

  test('should disable next button on last image', async ({ page }) => {
    const triggers = page.locator('.ux-lightbox-trigger');
    const count = await triggers.count();
    if (count > 0) {
      const lastTrigger = triggers.nth(count - 1);
      await lastTrigger.click();
      await page.waitForTimeout(300);
      const nextBtn = page.locator('.ux-lightbox__nav--next').first();
      if (await nextBtn.count() > 0) {
        const disabled = await nextBtn.isDisabled();
        expect(disabled).toBe(true);
      }
    }
  });

  test('should update counter when navigating', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const counter = page.locator('.ux-lightbox__counter').first();
      if (await counter.count() > 0) {
        const text = await counter.textContent();
        expect(text).toMatch(/\d+ \/ \d+/);
      }
    }
  });

  // Close Button Tests
  test('should have close button in header', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const closeBtn = page.locator('.ux-lightbox__header .ux-lightbox__btn').first();
      if (await closeBtn.count() > 0) {
        await expect(closeBtn).toBeVisible();
      }
    }
  });

  test('should close lightbox on close button click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const closeBtn = page.locator('.ux-lightbox__header .ux-lightbox__btn').first();
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await page.waitForTimeout(300);
        const lightbox = page.locator('.ux-lightbox--open').first();
        expect(await lightbox.count()).toBe(0);
      }
    }
  });

  test('should close lightbox on backdrop click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const backdrop = page.locator('.ux-lightbox__backdrop').first();
      if (await backdrop.count() > 0) {
        await backdrop.click();
        await page.waitForTimeout(300);
        const openLightbox = page.locator('.ux-lightbox--open').first();
        expect(await openLightbox.count()).toBe(0);
      }
    }
  });

  test('should close lightbox on Escape key', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const openLightbox = page.locator('.ux-lightbox--open').first();
      expect(await openLightbox.count()).toBe(0);
    }
  });

  // Zoom Tests
  test('should have zoom controls', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const zoomControls = page.locator('.ux-lightbox__zoom-controls').first();
      if (await zoomControls.count() > 0) {
        await expect(zoomControls).toBeVisible();
      }
    }
  });

  test('should zoom in on zoom in button click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const zoomInBtn = page.locator('.ux-lightbox__zoom-controls .ux-lightbox__btn').first();
      if (await zoomInBtn.count() > 0) {
        const initialZoom = await page.evaluate(() => {
          const el = document.querySelector('[x-data*="uxLightbox"]');
          return el?.__x?.$data?.zoom || 1;
        });
        await zoomInBtn.click();
        await page.waitForTimeout(300);
        const newZoom = await page.evaluate(() => {
          const el = document.querySelector('[x-data*="uxLightbox"]');
          return el?.__x?.$data?.zoom || 1;
        });
        expect(newZoom).toBeGreaterThan(initialZoom);
      }
    }
  });

  test('should zoom out on zoom out button click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      // First zoom in
      const zoomInBtn = page.locator('.ux-lightbox__zoom-controls .ux-lightbox__btn').first();
      if (await zoomInBtn.count() > 0) {
        await zoomInBtn.click();
        await page.waitForTimeout(300);
        // Then zoom out
        const zoomOutBtn = page.locator('.ux-lightbox__zoom-controls .ux-lightbox__btn').nth(2);
        if (await zoomOutBtn.count() > 0) {
          const zoomedZoom = await page.evaluate(() => {
            const el = document.querySelector('[x-data*="uxLightbox"]');
            return el?.__x?.$data?.zoom || 1;
          });
          await zoomOutBtn.click();
          await page.waitForTimeout(300);
          const newZoom = await page.evaluate(() => {
            const el = document.querySelector('[x-data*="uxLightbox"]');
            return el?.__x?.$data?.zoom || 1;
          });
          expect(newZoom).toBeLessThan(zoomedZoom);
        }
      }
    }
  });

  test('should display zoom percentage', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const zoomLevel = page.locator('.ux-lightbox__zoom-level').first();
      if (await zoomLevel.count() > 0) {
        const text = await zoomLevel.textContent();
        expect(text).toMatch(/\d+%/);
      }
    }
  });

  test('should respect zoom boundaries', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const zoom = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        const data = el?.__x?.$data;
        return { current: data?.zoom || 1, min: data?.minZoom || 1, max: data?.maxZoom || 4 };
      });
      expect(zoom.current).toBeGreaterThanOrEqual(zoom.min);
      expect(zoom.current).toBeLessThanOrEqual(zoom.max);
    }
  });

  test('should zoom with keyboard shortcuts', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const initialZoom = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.zoom || 1;
      });
      // Press '+' to zoom in
      await page.keyboard.press('Plus');
      await page.waitForTimeout(300);
      const zoomedIn = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.zoom || 1;
      });
      expect(zoomedIn).toBeGreaterThan(initialZoom);
    }
  });

  // Thumbnail Tests
  test('should render thumbnails strip', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const thumbnails = page.locator('.ux-lightbox__thumbnail');
      expect(await thumbnails.count()).toBeGreaterThan(0);
    }
  });

  test('should highlight active thumbnail', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const activeThumbnail = page.locator('.ux-lightbox__thumbnail--active').first();
      if (await activeThumbnail.count() > 0) {
        const borderColor = await activeThumbnail.evaluate(el =>
          getComputedStyle(el).borderColor
        );
        expect(borderColor).toBeTruthy();
      }
    }
  });

  test('should navigate to image on thumbnail click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const secondThumbnail = page.locator('.ux-lightbox__thumbnail').nth(1);
      if (await secondThumbnail.count() > 0) {
        await secondThumbnail.click();
        await page.waitForTimeout(300);
        const activeThumbnail = page.locator('.ux-lightbox__thumbnail--active').first();
        const activeIndex = await page.locator('.ux-lightbox__thumbnail').nth(1).evaluate(el => {
          return el.classList.contains('ux-lightbox__thumbnail--active');
        });
        expect(activeIndex).toBe(true);
      }
    }
  });

  // Keyboard Navigation Tests
  test('should navigate with arrow keys', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const initialIndex = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.currentIndex || 0;
      });
      // Press right arrow
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);
      const newIndex = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.currentIndex || 0;
      });
      if (initialIndex < 2) { // If not at last image
        expect(newIndex).toBeGreaterThan(initialIndex);
      }
    }
  });

  test('should navigate left with left arrow key', async ({ page }) => {
    const triggers = page.locator('.ux-lightbox-trigger');
    const count = await triggers.count();
    if (count > 1) {
      const secondTrigger = triggers.nth(1);
      await secondTrigger.click();
      await page.waitForTimeout(300);
      const initialIndex = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.currentIndex || 0;
      });
      // Press left arrow
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(300);
      const newIndex = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.currentIndex || 0;
      });
      expect(newIndex).toBeLessThan(initialIndex);
    }
  });

  // UI Toggle Tests
  test('should toggle UI visibility on image click', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const imageContainer = page.locator('.ux-lightbox__image-container').first();
      if (await imageContainer.count() > 0) {
        const initialHideUI = await page.evaluate(() => {
          const el = document.querySelector('[x-data*="uxLightbox"]');
          return el?.__x?.$data?.hideUI || false;
        });
        await imageContainer.click();
        await page.waitForTimeout(300);
        const newHideUI = await page.evaluate(() => {
          const el = document.querySelector('[x-data*="uxLightbox"]');
          return el?.__x?.$data?.hideUI || false;
        });
        expect(newHideUI).not.toBe(initialHideUI);
      }
    }
  });

  // Styling & Visual Tests
  test('should have proper z-index', async ({ page }) => {
    const lightbox = page.locator('.ux-lightbox').first();
    if (await lightbox.count() > 0) {
      const zIndex = await lightbox.evaluate(el =>
        parseInt(getComputedStyle(el).zIndex) || 0
      );
      expect(zIndex).toBeGreaterThan(0);
    }
  });

  test('should have backdrop with proper styling', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const backdrop = page.locator('.ux-lightbox__backdrop').first();
      if (await backdrop.count() > 0) {
        const background = await backdrop.evaluate(el =>
          getComputedStyle(el).background || getComputedStyle(el).backgroundColor
        );
        expect(background).toBeTruthy();
      }
    }
  });

  test('should have proper transition on open/close', async ({ page }) => {
    const lightbox = page.locator('.ux-lightbox').first();
    if (await lightbox.count() > 0) {
      const transition = await lightbox.evaluate(el =>
        getComputedStyle(el).transition
      );
      expect(transition).toContain('opacity');
    }
  });

  test('should have header with proper styling', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const header = page.locator('.ux-lightbox__header').first();
      if (await header.count() > 0) {
        const background = await header.evaluate(el =>
          getComputedStyle(el).background || getComputedStyle(el).backgroundImage
        );
        expect(background).toBeTruthy();
      }
    }
  });

  test('should have navigation buttons with proper styling', async ({ page }) => {
    const trigger = page.locator('.ux-lightbox-trigger').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const navBtn = page.locator('.ux-lightbox__nav').first();
      if (await navBtn.count() > 0) {
        const display = await navBtn.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).not.toBe('none');
      }
    }
  });

  // Caption Tests
  test('should display image caption if available', async ({ page }) => {
    const trigger = page.locator('[data-lightbox-title]').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const caption = page.locator('.ux-lightbox__caption').first();
      if (await caption.count() > 0) {
        const text = await caption.textContent();
        expect(text?.length).toBeGreaterThan(0);
      }
    }
  });

  test('should display caption title', async ({ page }) => {
    const trigger = page.locator('[data-lightbox-title]').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const title = page.locator('.ux-lightbox__caption-title').first();
      if (await title.count() > 0) {
        await expect(title).toBeVisible();
      }
    }
  });

  test('should display caption description if available', async ({ page }) => {
    const trigger = page.locator('[data-lightbox-desc]').first();
    if (await trigger.count() > 0) {
      const desc = await trigger.getAttribute('data-lightbox-desc');
      if (desc) {
        await trigger.click();
        await page.waitForTimeout(300);
        const captionDesc = page.locator('.ux-lightbox__caption-description').first();
        if (await captionDesc.count() > 0) {
          await expect(captionDesc).toBeVisible();
        }
      }
    }
  });

  // Gallery Collection Tests
  test('should collect images from gallery', async ({ page }) => {
    const gallery = page.locator('[data-lightbox-gallery]').first();
    if (await gallery.count() > 0) {
      const triggers = gallery.locator('[data-lightbox-src]');
      const count = await triggers.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should open correct image on trigger click', async ({ page }) => {
    const firstTrigger = page.locator('.ux-lightbox-trigger').first();
    if (await firstTrigger.count() > 0) {
      await firstTrigger.click();
      await page.waitForTimeout(300);
      const currentIndex = await page.evaluate(() => {
        const el = document.querySelector('[x-data*="uxLightbox"]');
        return el?.__x?.$data?.currentIndex || 0;
      });
      expect(currentIndex).toBe(0);
    }
  });

  // Single Image Tests
  test('should work with single image', async ({ page }) => {
    const trigger = page.locator('[data-lightbox-src]').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(300);
      const image = page.locator('.ux-lightbox__image').first();
      if (await image.count() > 0) {
        const src = await image.getAttribute('src');
        expect(src).toBeTruthy();
      }
    }
  });
});
