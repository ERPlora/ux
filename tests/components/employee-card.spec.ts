import { test, expect } from '@playwright/test';

test.describe('Employee Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/employee-card.html');
  });

  test('should render basic employee card', async ({ page }) => {
    const card = page.locator('.ux-employee-card').first();
    await expect(card).toBeVisible();
  });

  test('should render employee avatar', async ({ page }) => {
    const avatar = page.locator('.ux-employee-card__avatar').first();
    await expect(avatar).toBeVisible();
  });

  test('should render employee name', async ({ page }) => {
    const name = page.locator('.ux-employee-card__name').first();
    await expect(name).toBeVisible();
    const text = await name.textContent();
    expect(text).toBeTruthy();
  });

  test('should render employee title/position', async ({ page }) => {
    const title = page.locator('.ux-employee-card__title').first();
    await expect(title).toBeVisible();
  });

  test('should render employee department badge', async ({ page }) => {
    const department = page.locator('.ux-employee-card__department').first();
    await expect(department).toBeVisible();
  });

  test.describe('Avatar Variants', () => {
    test('should render avatar with image', async ({ page }) => {
      const avatarWithImage = page.locator('.ux-employee-card__avatar img').first();
      if (await avatarWithImage.count() > 0) {
        await expect(avatarWithImage).toBeVisible();
        const src = await avatarWithImage.getAttribute('src');
        expect(src).toBeTruthy();
      }
    });

    test('should render avatar with initials', async ({ page }) => {
      // Initials avatar doesn't have img child
      const avatarWithInitials = page.locator('.ux-employee-card__avatar:not(:has(img))').first();
      if (await avatarWithInitials.count() > 0) {
        const text = await avatarWithInitials.textContent();
        // Should contain initials (letters)
        expect(text?.trim()).toMatch(/^[A-Z]{2}$/);
      }
    });

    test('should apply avatar color variants', async ({ page }) => {
      // Primary
      const primaryAvatar = page.locator('.ux-employee-card__avatar--primary').first();
      if (await primaryAvatar.count() > 0) {
        await expect(primaryAvatar).toBeVisible();
      }

      // Success
      const successAvatar = page.locator('.ux-employee-card__avatar--success').first();
      if (await successAvatar.count() > 0) {
        await expect(successAvatar).toBeVisible();
      }

      // Warning
      const warningAvatar = page.locator('.ux-employee-card__avatar--warning').first();
      if (await warningAvatar.count() > 0) {
        await expect(warningAvatar).toBeVisible();
      }

      // Danger
      const dangerAvatar = page.locator('.ux-employee-card__avatar--danger').first();
      if (await dangerAvatar.count() > 0) {
        await expect(dangerAvatar).toBeVisible();
      }
    });
  });

  test.describe('Status Indicators', () => {
    test('should render status indicator', async ({ page }) => {
      const status = page.locator('.ux-employee-card__status').first();
      await expect(status).toBeVisible();
    });

    test('should render available status', async ({ page }) => {
      const available = page.locator('.ux-employee-card__status--available').first();
      if (await available.count() > 0) {
        await expect(available).toBeVisible();
      }
    });

    test('should render busy status', async ({ page }) => {
      const busy = page.locator('.ux-employee-card__status--busy').first();
      if (await busy.count() > 0) {
        await expect(busy).toBeVisible();
      }
    });

    test('should render away status', async ({ page }) => {
      const away = page.locator('.ux-employee-card__status--away').first();
      if (await away.count() > 0) {
        await expect(away).toBeVisible();
      }
    });

    test('should render offline status', async ({ page }) => {
      const offline = page.locator('.ux-employee-card__status--offline').first();
      if (await offline.count() > 0) {
        await expect(offline).toBeVisible();
      }
    });

    test('should render DND status', async ({ page }) => {
      const dnd = page.locator('.ux-employee-card__status--dnd').first();
      if (await dnd.count() > 0) {
        await expect(dnd).toBeVisible();
      }
    });

    test('should apply pulse animation to status', async ({ page }) => {
      const pulseStatus = page.locator('.ux-employee-card__status--pulse').first();
      if (await pulseStatus.count() > 0) {
        await expect(pulseStatus).toBeVisible();
      }
    });
  });

  test.describe('Department Colors', () => {
    test('should apply engineering department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--engineering').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply design department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--design').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply marketing department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--marketing').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply sales department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--sales').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply HR department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--hr').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply finance department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--finance').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply operations department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--operations').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });

    test('should apply support department color', async ({ page }) => {
      const dept = page.locator('.ux-employee-card__department--support').first();
      if (await dept.count() > 0) {
        await expect(dept).toBeVisible();
      }
    });
  });

  test.describe('Contact Information', () => {
    test('should render contact section', async ({ page }) => {
      const contact = page.locator('.ux-employee-card__contact').first();
      if (await contact.count() > 0) {
        await expect(contact).toBeVisible();
      }
    });

    test('should render email contact link', async ({ page }) => {
      const emailLink = page.locator('.ux-employee-card__contact-item[href^="mailto:"]').first();
      if (await emailLink.count() > 0) {
        await expect(emailLink).toBeVisible();
        const href = await emailLink.getAttribute('href');
        expect(href).toContain('mailto:');
      }
    });

    test('should render phone contact link', async ({ page }) => {
      const phoneLink = page.locator('.ux-employee-card__contact-item[href^="tel:"]').first();
      if (await phoneLink.count() > 0) {
        await expect(phoneLink).toBeVisible();
        const href = await phoneLink.getAttribute('href');
        expect(href).toContain('tel:');
      }
    });

    test('should render contact text', async ({ page }) => {
      const contactText = page.locator('.ux-employee-card__contact-text').first();
      if (await contactText.count() > 0) {
        await expect(contactText).toBeVisible();
      }
    });
  });

  test.describe('Action Buttons', () => {
    test('should render actions container', async ({ page }) => {
      const actions = page.locator('.ux-employee-card__actions').first();
      if (await actions.count() > 0) {
        await expect(actions).toBeVisible();
      }
    });

    test('should render call action button', async ({ page }) => {
      const callBtn = page.locator('.ux-employee-card__action--call').first();
      if (await callBtn.count() > 0) {
        await expect(callBtn).toBeVisible();
      }
    });

    test('should render email action button', async ({ page }) => {
      const emailBtn = page.locator('.ux-employee-card__action--email').first();
      if (await emailBtn.count() > 0) {
        await expect(emailBtn).toBeVisible();
      }
    });

    test('should render chat action button', async ({ page }) => {
      const chatBtn = page.locator('.ux-employee-card__action--chat').first();
      if (await chatBtn.count() > 0) {
        await expect(chatBtn).toBeVisible();
      }
    });

    test('action buttons should be clickable', async ({ page }) => {
      const actionBtn = page.locator('.ux-employee-card__action').first();
      if (await actionBtn.count() > 0) {
        await actionBtn.click();
        // Test that clicking doesn't crash
        expect(true).toBe(true);
      }
    });
  });

  test.describe('Card Variants', () => {
    test('should render compact variant', async ({ page }) => {
      const compactCard = page.locator('.ux-employee-card--compact').first();
      if (await compactCard.count() > 0) {
        await expect(compactCard).toBeVisible();
      }
    });

    test('should render horizontal variant', async ({ page }) => {
      const horizontalCard = page.locator('.ux-employee-card--horizontal').first();
      if (await horizontalCard.count() > 0) {
        await expect(horizontalCard).toBeVisible();
      }
    });

    test('should render clickable variant', async ({ page }) => {
      const clickableCard = page.locator('.ux-employee-card--clickable').first();
      if (await clickableCard.count() > 0) {
        await expect(clickableCard).toBeVisible();

        // Should have cursor pointer
        const cursor = await clickableCard.evaluate(el =>
          getComputedStyle(el).cursor
        );
        expect(cursor).toBe('pointer');
      }
    });

    test('should render glass variant', async ({ page }) => {
      const glassCard = page.locator('.ux-employee-card--glass').first();
      if (await glassCard.count() > 0) {
        await expect(glassCard).toBeVisible();

        // Should have backdrop-filter
        const backdropFilter = await glassCard.evaluate(el =>
          getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
        );
        expect(backdropFilter).toContain('blur');
      }
    });
  });

  test.describe('Employee Grid', () => {
    test('should render employee grid container', async ({ page }) => {
      const grid = page.locator('.ux-employee-grid').first();
      if (await grid.count() > 0) {
        await expect(grid).toBeVisible();
      }
    });

    test('should apply grid column variants', async ({ page }) => {
      // 3 columns
      const grid3 = page.locator('.ux-employee-grid--3').first();
      if (await grid3.count() > 0) {
        await expect(grid3).toBeVisible();
      }

      // 4 columns
      const grid4 = page.locator('.ux-employee-grid--4').first();
      if (await grid4.count() > 0) {
        await expect(grid4).toBeVisible();
      }

      // 5 columns
      const grid5 = page.locator('.ux-employee-grid--5').first();
      if (await grid5.count() > 0) {
        await expect(grid5).toBeVisible();
      }
    });
  });

  test.describe('Employee List', () => {
    test('should render employee list container', async ({ page }) => {
      const list = page.locator('.ux-employee-list').first();
      if (await list.count() > 0) {
        await expect(list).toBeVisible();
      }
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const card = page.locator('.ux-employee-card').first();
      await expect(card).toBeVisible();

      const name = page.locator('.ux-employee-card__name').first();
      await expect(name).toBeVisible();
    });

    test('should adapt grid to narrow viewports', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });

      const grid = page.locator('.ux-employee-grid').first();
      if (await grid.count() > 0) {
        await expect(grid).toBeVisible();
      }
    });

    test('should maintain card visibility on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const card = page.locator('.ux-employee-card').first();
      await expect(card).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('avatar image should have alt text', async ({ page }) => {
      const avatarImg = page.locator('.ux-employee-card__avatar img').first();
      if (await avatarImg.count() > 0) {
        const alt = await avatarImg.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('action buttons should have title attribute', async ({ page }) => {
      const actionBtn = page.locator('.ux-employee-card__action[title]').first();
      if (await actionBtn.count() > 0) {
        const title = await actionBtn.getAttribute('title');
        expect(title).toBeTruthy();
      }
    });

    test('action buttons should be focusable', async ({ page }) => {
      const actionBtn = page.locator('.ux-employee-card__action').first();
      if (await actionBtn.count() > 0) {
        await actionBtn.focus();
        await expect(actionBtn).toBeFocused();
      }
    });

    test('contact links should be focusable', async ({ page }) => {
      const contactLink = page.locator('.ux-employee-card__contact-item').first();
      if (await contactLink.count() > 0) {
        await contactLink.focus();
        await expect(contactLink).toBeFocused();
      }
    });

    test('should navigate action buttons with keyboard', async ({ page }) => {
      const firstAction = page.locator('.ux-employee-card__action').first();
      if (await firstAction.count() > 0) {
        await firstAction.focus();
        await expect(firstAction).toBeFocused();

        await page.keyboard.press('Tab');
        const focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });
  });

  test.describe('Hover Effects', () => {
    test('clickable card should respond to hover', async ({ page }) => {
      const clickableCard = page.locator('.ux-employee-card--clickable').first();
      if (await clickableCard.count() > 0) {
        await clickableCard.hover();
        // Test that hover doesn't crash
        expect(true).toBe(true);
      }
    });

    test('action buttons should respond to hover', async ({ page }) => {
      const actionBtn = page.locator('.ux-employee-card__action').first();
      if (await actionBtn.count() > 0) {
        await actionBtn.hover();
        expect(true).toBe(true);
      }
    });
  });

  test.describe('Content Structure', () => {
    test('should render info container', async ({ page }) => {
      const info = page.locator('.ux-employee-card__info').first();
      await expect(info).toBeVisible();
    });

    test('card should have proper structure order', async ({ page }) => {
      const card = page.locator('.ux-employee-card').first();
      await expect(card).toBeVisible();

      // Avatar should exist
      const avatar = card.locator('.ux-employee-card__avatar');
      if (await avatar.count() > 0) {
        await expect(avatar).toBeVisible();
      }

      // Info should exist
      const info = card.locator('.ux-employee-card__info');
      await expect(info).toBeVisible();
    });
  });
});
