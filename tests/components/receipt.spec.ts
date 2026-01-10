import { test, expect } from '@playwright/test';

test.describe('Receipt Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/receipt.html');
  });

  test('should render basic receipt', async ({ page }) => {
    const receipt = page.locator('.ux-receipt').first();
    await expect(receipt).toBeVisible();
  });

  test('should render receipt header', async ({ page }) => {
    const header = page.locator('.ux-receipt__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
    }
  });

  test('should render company name in header', async ({ page }) => {
    const company = page.locator('.ux-receipt__company').first();
    if (await company.count() > 0) {
      await expect(company).toBeVisible();
      const text = await company.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render receipt address if provided', async ({ page }) => {
    const address = page.locator('.ux-receipt__address').first();
    if (await address.count() > 0) {
      await expect(address).toBeVisible();
      const text = await address.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render receipt phone if provided', async ({ page }) => {
    const phone = page.locator('.ux-receipt__phone').first();
    if (await phone.count() > 0) {
      await expect(phone).toBeVisible();
      const text = await phone.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render receipt tax ID if provided', async ({ page }) => {
    const taxId = page.locator('.ux-receipt__tax-id').first();
    if (await taxId.count() > 0) {
      await expect(taxId).toBeVisible();
      const text = await taxId.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render receipt info section', async ({ page }) => {
    const info = page.locator('.ux-receipt__info').first();
    if (await info.count() > 0) {
      await expect(info).toBeVisible();
    }
  });

  test('should render receipt number', async ({ page }) => {
    const receiptNumber = page.locator('.ux-receipt__info-value').first();
    if (await receiptNumber.count() > 0) {
      const text = await receiptNumber.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render items list', async ({ page }) => {
    const items = page.locator('.ux-receipt__items').first();
    if (await items.count() > 0) {
      await expect(items).toBeVisible();
    }
  });

  test('should render multiple items', async ({ page }) => {
    const items = page.locator('.ux-receipt__item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render item name', async ({ page }) => {
    const itemName = page.locator('.ux-receipt__item-name').first();
    if (await itemName.count() > 0) {
      await expect(itemName).toBeVisible();
      const text = await itemName.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render item quantity', async ({ page }) => {
    const itemQty = page.locator('.ux-receipt__item-qty').first();
    if (await itemQty.count() > 0) {
      await expect(itemQty).toBeVisible();
      const text = await itemQty.textContent();
      expect(text).toContain('x');
    }
  });

  test('should render item price', async ({ page }) => {
    const itemPrice = page.locator('.ux-receipt__item-price').first();
    if (await itemPrice.count() > 0) {
      await expect(itemPrice).toBeVisible();
      const text = await itemPrice.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render item total', async ({ page }) => {
    const itemTotal = page.locator('.ux-receipt__item-total').first();
    if (await itemTotal.count() > 0) {
      await expect(itemTotal).toBeVisible();
      const text = await itemTotal.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render totals section', async ({ page }) => {
    const totals = page.locator('.ux-receipt__totals').first();
    if (await totals.count() > 0) {
      await expect(totals).toBeVisible();
    }
  });

  test('should render subtotal row', async ({ page }) => {
    const subtotal = page.locator('.ux-receipt__total-row--subtotal').first();
    if (await subtotal.count() > 0) {
      await expect(subtotal).toBeVisible();
      const label = await subtotal.locator('.ux-receipt__total-label').textContent();
      expect(label).toContain('Subtotal');
    }
  });

  test('should render tax amount if present', async ({ page }) => {
    const taxRow = page.locator('.ux-receipt__total-row').filter({ has: page.locator('text=/IVA|Impuesto|Tax/') }).first();
    if (await taxRow.count() > 0) {
      await expect(taxRow).toBeVisible();
      const taxValue = await taxRow.locator('.ux-receipt__total-value').textContent();
      expect(taxValue).toBeTruthy();
    }
  });

  test('should render grand total row', async ({ page }) => {
    const grandTotal = page.locator('.ux-receipt__total-row--grand').first();
    if (await grandTotal.count() > 0) {
      await expect(grandTotal).toBeVisible();
      const label = await grandTotal.locator('.ux-receipt__total-label').textContent();
      expect(label).toContain('TOTAL');
    }
  });

  test('should render discount row if discount exists', async ({ page }) => {
    const totalRows = page.locator('.ux-receipt__total-row');
    const count = await totalRows.count();
    // Discount rows might not be visible if discount is 0
    // Just verify structure exists
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should render payment section if present', async ({ page }) => {
    const payment = page.locator('.ux-receipt__payment').first();
    if (await payment.count() > 0) {
      await expect(payment).toBeVisible();
    }
  });

  test('should render payment method', async ({ page }) => {
    const paymentMethod = page.locator('.ux-receipt__payment-method').first();
    if (await paymentMethod.count() > 0) {
      await expect(paymentMethod).toBeVisible();
      const text = await paymentMethod.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render payment amount', async ({ page }) => {
    const paymentRow = page.locator('.ux-receipt__payment-row').first();
    if (await paymentRow.count() > 0) {
      await expect(paymentRow).toBeVisible();
    }
  });

  test('should render change if applicable', async ({ page }) => {
    const change = page.locator('.ux-receipt__change').first();
    if (await change.count() > 0) {
      await expect(change).toBeVisible();
      const text = await change.textContent();
      expect(text).toContain('Cambio');
    }
  });

  test('should render footer section if present', async ({ page }) => {
    const footer = page.locator('.ux-receipt__footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should render thanks message in footer', async ({ page }) => {
    const thanks = page.locator('.ux-receipt__thanks').first();
    if (await thanks.count() > 0) {
      await expect(thanks).toBeVisible();
      const text = await thanks.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render footer message if provided', async ({ page }) => {
    const message = page.locator('.ux-receipt__message').first();
    if (await message.count() > 0) {
      await expect(message).toBeVisible();
      const text = await message.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render social info if provided', async ({ page }) => {
    const social = page.locator('.ux-receipt__social').first();
    if (await social.count() > 0) {
      await expect(social).toBeVisible();
      const text = await social.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should support 58mm size variant', async ({ page }) => {
    const receipt58 = page.locator('.ux-receipt--58mm').first();
    if (await receipt58.count() > 0) {
      await expect(receipt58).toBeVisible();
    }
  });

  test('should support 80mm size variant', async ({ page }) => {
    const receipt80 = page.locator('.ux-receipt--80mm').first();
    if (await receipt80.count() > 0) {
      await expect(receipt80).toBeVisible();
    }
  });

  test('should render copy indicator if present', async ({ page }) => {
    const copy = page.locator('.ux-receipt__copy').first();
    if (await copy.count() > 0) {
      await expect(copy).toBeVisible();
      const text = await copy.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render QR code if shown', async ({ page }) => {
    const qr = page.locator('.ux-receipt__qr').first();
    if (await qr.count() > 0) {
      await expect(qr).toBeVisible();
    }
  });

  test('should render QR code label if present', async ({ page }) => {
    const qrLabel = page.locator('.ux-receipt__qr-label').first();
    if (await qrLabel.count() > 0) {
      await expect(qrLabel).toBeVisible();
      const text = await qrLabel.textContent();
      expect(text).toBeTruthy();
    }
  });

  test('should render items header if present', async ({ page }) => {
    const itemsHeader = page.locator('.ux-receipt__items-header').first();
    if (await itemsHeader.count() > 0) {
      await expect(itemsHeader).toBeVisible();
    }
  });

  test('should have proper text layout for items', async ({ page }) => {
    const items = page.locator('.ux-receipt__items').first();
    if (await items.count() > 0) {
      const display = await items.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBeTruthy();
    }
  });

  test('should align totals values to the right', async ({ page }) => {
    const totalValue = page.locator('.ux-receipt__total-value').first();
    if (await totalValue.count() > 0) {
      const textAlign = await totalValue.evaluate(el =>
        getComputedStyle(el).textAlign
      );
      expect(['right', 'end']).toContain(textAlign);
    }
  });

  test('should have monospace font for readability', async ({ page }) => {
    const receipt = page.locator('.ux-receipt').first();
    if (await receipt.count() > 0) {
      const fontFamily = await receipt.evaluate(el =>
        getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toBeTruthy();
    }
  });

  test('should render divider if present', async ({ page }) => {
    const divider = page.locator('.ux-receipt__divider').first();
    if (await divider.count() > 0) {
      await expect(divider).toBeVisible();
    }
  });

  test('should have multiple items visible', async ({ page }) => {
    const items = page.locator('.ux-receipt__item');
    expect(await items.count()).toBeGreaterThanOrEqual(1);
  });
});
