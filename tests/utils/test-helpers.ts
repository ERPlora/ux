import { Page, expect } from '@playwright/test';

/**
 * Helper to navigate to a component partial via HTMX
 * The docs app loads partials from /docs/partials/{component}.html
 */
export async function loadComponent(page: Page, componentName: string) {
  // Go to the docs index
  await page.goto('/docs/');

  // Wait for Alpine.js to initialize
  await page.waitForFunction(() => (window as any).Alpine !== undefined, { timeout: 10000 });

  // Click on the menu item to load the component
  // First try to find and click the menu item
  const menuItem = page.locator(`[data-page="${componentName}"], .ux-menu__item:has-text("${componentName}")`).first();

  if (await menuItem.count() > 0) {
    await menuItem.click();
    // Wait for HTMX to load the content
    await page.waitForSelector('#component-content', { timeout: 10000 });
    await page.waitForTimeout(500); // Allow transitions to complete
  } else {
    // Fallback: directly load the partial
    await page.goto(`/docs/partials/${componentName}.html`);
  }
}

/**
 * Helper to directly load a partial (for standalone testing)
 */
export async function loadPartial(page: Page, componentName: string) {
  await page.goto(`/docs/partials/${componentName}.html`);
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Helper to check if an element is visible and within viewport
 */
export async function isVisibleInViewport(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.count() === 0) return false;

  const box = await element.boundingBox();
  if (!box) return false;

  const viewport = page.viewportSize();
  if (!viewport) return false;

  return (
    box.x >= 0 &&
    box.y >= 0 &&
    box.x + box.width <= viewport.width &&
    box.y + box.height <= viewport.height
  );
}

/**
 * Helper to check touch target size (minimum 44px for mobile)
 */
export async function hasMinimumTouchTarget(page: Page, selector: string, minSize = 44): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.count() === 0) return false;

  const box = await element.boundingBox();
  if (!box) return false;

  return box.width >= minSize && box.height >= minSize;
}

/**
 * Helper to check if glass morphism is applied
 */
export async function hasGlassEffect(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.count() === 0) return false;

  const backdropFilter = await element.evaluate(el =>
    getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter
  );

  return backdropFilter !== 'none' && backdropFilter.includes('blur');
}

/**
 * Helper to check color contrast (basic check)
 */
export async function hasReadableContrast(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.count() === 0) return false;

  const { color, backgroundColor } = await element.evaluate(el => {
    const styles = getComputedStyle(el);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor
    };
  });

  // Parse RGB values
  const parseRGB = (str: string) => {
    const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
  };

  const textColor = parseRGB(color);
  const bgColor = parseRGB(backgroundColor);

  if (!textColor || !bgColor) return true; // Can't determine, assume ok

  // Simple luminance calculation
  const luminance = (c: { r: number; g: number; b: number }) =>
    0.299 * c.r + 0.587 * c.g + 0.114 * c.b;

  const contrast = Math.abs(luminance(textColor) - luminance(bgColor));
  return contrast > 50; // Very basic threshold
}

/**
 * Helper to check responsive behavior
 */
export async function checkResponsive(page: Page, selector: string) {
  const element = page.locator(selector).first();
  if (await element.count() === 0) return null;

  const viewport = page.viewportSize();
  const box = await element.boundingBox();

  return {
    viewport,
    elementSize: box,
    isFullWidth: box ? Math.abs(box.width - (viewport?.width || 0)) < 50 : false,
    overflowsViewport: box ? box.x + box.width > (viewport?.width || 0) : false
  };
}

/**
 * Helper to verify no console errors
 */
export function setupConsoleErrorCapture(page: Page): string[] {
  const errors: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  return errors;
}

/**
 * Viewport types for testing
 */
export const VIEWPORT_TYPES = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 810, height: 1080 },
  desktop: { width: 1920, height: 1080 },
} as const;

/**
 * Helper to test component across viewports
 */
export async function testAcrossViewports(
  page: Page,
  testFn: (viewportName: string) => Promise<void>
) {
  for (const [name, size] of Object.entries(VIEWPORT_TYPES)) {
    await page.setViewportSize(size);
    await testFn(name);
  }
}
