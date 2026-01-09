/**
 * UX Receipt Preview Component
 * Thermal receipt format for POS systems
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Receipt Container
       ========================================================================== */

    .ux-receipt {
      font-family: 'Courier New', Courier, monospace;
      font-size: 12px;
      line-height: 1.4;
      color: #000;
      background: #fff;
      width: 280px;
      padding: 16px 12px;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Print-ready: no shadows */
    @media print {
      .ux-receipt {
        box-shadow: none;
        margin: 0;
        padding: 8px;
      }
    }

    /* ==========================================================================
       Receipt Header
       ========================================================================== */

    .ux-receipt__header {
      text-align: center;
      padding-bottom: 12px;
      border-bottom: 1px dashed #ccc;
      margin-bottom: 12px;
    }

    .ux-receipt__logo {
      max-width: 120px;
      max-height: 60px;
      margin: 0 auto 8px;
    }

    .ux-receipt__logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .ux-receipt__company {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .ux-receipt__address,
    .ux-receipt__phone,
    .ux-receipt__tax-id {
      font-size: 11px;
      color: #333;
      margin: 2px 0;
    }

    /* ==========================================================================
       Receipt Info
       ========================================================================== */

    .ux-receipt__info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px 16px;
      padding-bottom: 12px;
      border-bottom: 1px dashed #ccc;
      margin-bottom: 12px;
      font-size: 11px;
    }

    .ux-receipt__info-item {
      display: flex;
      gap: 4px;
    }

    .ux-receipt__info-label {
      color: #666;
    }

    .ux-receipt__info-value {
      font-weight: 600;
    }

    /* ==========================================================================
       Receipt Items
       ========================================================================== */

    .ux-receipt__items {
      padding-bottom: 12px;
      border-bottom: 1px dashed #ccc;
      margin-bottom: 12px;
    }

    .ux-receipt__items-header {
      display: flex;
      justify-content: space-between;
      padding-bottom: 4px;
      margin-bottom: 8px;
      border-bottom: 1px solid #eee;
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #666;
    }

    .ux-receipt__item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0;
    }

    .ux-receipt__item-name {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
    }

    .ux-receipt__item-qty {
      flex-shrink: 0;
      width: 30px;
      text-align: center;
      color: #666;
    }

    .ux-receipt__item-price {
      flex-shrink: 0;
      width: 60px;
      text-align: right;
    }

    .ux-receipt__item-total {
      flex-shrink: 0;
      width: 70px;
      text-align: right;
      font-weight: 600;
    }

    .ux-receipt__item--discount {
      color: #c00;
      font-size: 11px;
    }

    .ux-receipt__item--discount .ux-receipt__item-name {
      padding-left: 8px;
    }

    /* ==========================================================================
       Receipt Totals
       ========================================================================== */

    .ux-receipt__totals {
      padding-bottom: 12px;
      border-bottom: 1px dashed #ccc;
      margin-bottom: 12px;
    }

    .ux-receipt__total-row {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
    }

    .ux-receipt__total-label {
      color: #666;
    }

    .ux-receipt__total-value {
      font-weight: 500;
      text-align: right;
    }

    .ux-receipt__total-row--subtotal {
      padding-top: 4px;
    }

    .ux-receipt__total-row--grand {
      font-size: 16px;
      font-weight: bold;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 2px solid #000;
    }

    .ux-receipt__total-row--grand .ux-receipt__total-value {
      font-size: 18px;
    }

    /* ==========================================================================
       Receipt Payment
       ========================================================================== */

    .ux-receipt__payment {
      padding-bottom: 12px;
      border-bottom: 1px dashed #ccc;
      margin-bottom: 12px;
    }

    .ux-receipt__payment-title {
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 4px;
    }

    .ux-receipt__payment-row {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
    }

    .ux-receipt__payment-method {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ux-receipt__payment-icon {
      width: 14px;
      height: 14px;
    }

    .ux-receipt__change {
      font-size: 14px;
      font-weight: bold;
      padding-top: 4px;
      margin-top: 4px;
      border-top: 1px solid #eee;
    }

    /* ==========================================================================
       Receipt Footer
       ========================================================================== */

    .ux-receipt__footer {
      text-align: center;
      font-size: 11px;
      color: #666;
    }

    .ux-receipt__thanks {
      font-size: 14px;
      font-weight: bold;
      color: #000;
      margin-bottom: 8px;
    }

    .ux-receipt__message {
      margin: 8px 0;
      font-style: italic;
    }

    .ux-receipt__social {
      margin-top: 8px;
    }

    /* ==========================================================================
       Receipt QR Code
       ========================================================================== */

    .ux-receipt__qr {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      border-top: 1px dashed #ccc;
      margin-top: 12px;
    }

    .ux-receipt__qr-code {
      width: 80px;
      height: 80px;
      margin-bottom: 4px;
    }

    .ux-receipt__qr-code img,
    .ux-receipt__qr-code svg {
      width: 100%;
      height: 100%;
    }

    .ux-receipt__qr-label {
      font-size: 10px;
      color: #666;
    }

    /* ==========================================================================
       Receipt Barcode
       ========================================================================== */

    .ux-receipt__barcode {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      border-top: 1px dashed #ccc;
      margin-top: 12px;
    }

    .ux-receipt__barcode-image {
      max-width: 200px;
      height: 40px;
      margin-bottom: 4px;
    }

    .ux-receipt__barcode-image img,
    .ux-receipt__barcode-image svg {
      width: 100%;
      height: 100%;
    }

    .ux-receipt__barcode-number {
      font-size: 10px;
      letter-spacing: 2px;
    }

    /* ==========================================================================
       Receipt Divider
       ========================================================================== */

    .ux-receipt__divider {
      border: none;
      border-top: 1px dashed #ccc;
      margin: 12px 0;
    }

    .ux-receipt__divider--double {
      border-top-width: 2px;
      border-top-style: double;
      border-color: #000;
    }

    /* ==========================================================================
       Receipt Copy Indicator
       ========================================================================== */

    .ux-receipt__copy {
      text-align: center;
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #999;
      padding: 8px 0;
      border: 1px dashed #ccc;
      margin-top: 12px;
    }

    /* ==========================================================================
       Receipt Sizes
       ========================================================================== */

    .ux-receipt--58mm {
      width: 200px;
      font-size: 10px;
    }

    .ux-receipt--58mm .ux-receipt__company {
      font-size: 14px;
    }

    .ux-receipt--58mm .ux-receipt__total-row--grand {
      font-size: 14px;
    }

    .ux-receipt--58mm .ux-receipt__total-row--grand .ux-receipt__total-value {
      font-size: 16px;
    }

    .ux-receipt--80mm {
      width: 280px;
    }

    .ux-receipt--a4 {
      width: 100%;
      max-width: 500px;
      font-size: 14px;
      padding: 24px;
    }

    .ux-receipt--a4 .ux-receipt__company {
      font-size: 20px;
    }

    .ux-receipt--a4 .ux-receipt__total-row--grand {
      font-size: 18px;
    }

    /* ==========================================================================
       Receipt Preview Wrapper
       ========================================================================== */

    .ux-receipt-preview {
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-space-lg);
      overflow: auto;
    }

    .ux-receipt-preview__toolbar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      margin-bottom: var(--ux-space-lg);
    }

    /* ==========================================================================
       Print Styles
       ========================================================================== */

    @media print {
      .ux-receipt-preview {
        background: none;
        padding: 0;
      }

      .ux-receipt-preview__toolbar {
        display: none;
      }

      .ux-receipt {
        width: auto;
        max-width: none;
      }

      body * {
        visibility: hidden;
      }

      .ux-receipt,
      .ux-receipt * {
        visibility: visible;
      }

      .ux-receipt {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    /* ==========================================================================
       Dark Mode (preview only, receipt always white)
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-receipt-preview {
        background: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-receipt-preview {
      background: var(--ux-surface-secondary);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-receipt-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-receipt-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const receiptData = (options = {}) => ({
    // Company info
    company: {
      name: options.companyName || 'Mi Empresa',
      address: options.companyAddress || '',
      phone: options.companyPhone || '',
      taxId: options.companyTaxId || '',
      logo: options.companyLogo || null,
      ...options.company
    },

    // Receipt info
    receipt: {
      number: options.receiptNumber || '',
      date: options.receiptDate || new Date().toLocaleDateString('es-ES'),
      time: options.receiptTime || new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      cashier: options.cashier || '',
      terminal: options.terminal || '',
      ...options.receipt
    },

    // Items
    items: options.items || [],

    // Totals
    subtotal: options.subtotal || 0,
    discount: options.discount || 0,
    discountLabel: options.discountLabel || 'Descuento',
    tax: options.tax || 0,
    taxLabel: options.taxLabel || 'IVA',
    taxRate: options.taxRate || null,
    total: options.total || 0,

    // Payment
    payments: options.payments || [],
    change: options.change || 0,

    // Footer
    footer: {
      thanks: options.thanksMessage || 'Gracias por su compra',
      message: options.footerMessage || '',
      social: options.socialMedia || '',
      ...options.footer
    },

    // QR/Barcode
    qrCode: options.qrCode || null,
    qrLabel: options.qrLabel || 'Escanea para ver factura',
    barcode: options.barcode || null,
    barcodeNumber: options.barcodeNumber || '',

    // Options
    size: options.size || '80mm', // '58mm', '80mm', 'a4'
    showHeader: options.showHeader ?? true,
    showItemsHeader: options.showItemsHeader ?? true,
    showTax: options.showTax ?? true,
    showPayment: options.showPayment ?? true,
    showFooter: options.showFooter ?? true,
    showQR: options.showQR ?? false,
    showBarcode: options.showBarcode ?? false,
    copyType: options.copyType || null, // 'customer', 'merchant', null

    // Currency
    currency: options.currency || '€',
    currencyPosition: options.currencyPosition || 'after', // 'before' or 'after'

    // Format price
    formatPrice(amount) {
      const formatted = parseFloat(amount).toFixed(2);
      if (this.currencyPosition === 'before') {
        return `${this.currency}${formatted}`;
      }
      return `${formatted}${this.currency}`;
    },

    // Calculate totals
    calculateSubtotal() {
      return this.items.reduce((sum, item) => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        const itemDiscount = item.discount || 0;
        return sum + itemTotal - itemDiscount;
      }, 0);
    },

    calculateTotal() {
      const subtotal = this.subtotal || this.calculateSubtotal();
      const afterDiscount = subtotal - (this.discount || 0);
      const afterTax = afterDiscount + (this.tax || 0);
      return afterTax;
    },

    // Print receipt
    print() {
      window.print();
      this.$dispatch('receipt:print');
    },

    // Download as image (requires html2canvas)
    async downloadImage() {
      if (typeof html2canvas === 'undefined') {
        console.error('html2canvas is required for image download');
        return;
      }

      const receiptEl = this.$el.querySelector('.ux-receipt');
      if (!receiptEl) return;

      try {
        const canvas = await html2canvas(receiptEl, {
          scale: 2,
          backgroundColor: '#ffffff'
        });

        const link = document.createElement('a');
        link.download = `receipt-${this.receipt.number || Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.$dispatch('receipt:download', { format: 'image' });
      } catch (error) {
        console.error('Error generating image:', error);
      }
    },

    // Get receipt data as JSON
    getData() {
      return {
        company: this.company,
        receipt: this.receipt,
        items: this.items,
        subtotal: this.subtotal,
        discount: this.discount,
        tax: this.tax,
        total: this.total,
        payments: this.payments,
        change: this.change
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxReceipt', receiptData);
  }
})();
