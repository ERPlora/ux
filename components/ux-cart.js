/**
 * UX Cart Components
 * Shopping cart components for POS and e-commerce
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Cart Container
    ======================================== */

    :root {
      --ux-cart-item-height: auto;
      --ux-cart-item-padding: var(--ux-space-md);
      --ux-cart-border-radius: var(--ux-border-radius-lg);
    }

    .ux-cart {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-cart-border-radius);
      overflow: hidden;
    }

    .ux-cart--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Cart Header
    ======================================== */

    .ux-cart__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-cart__title {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-cart__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 var(--ux-space-xs);
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 12px;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
    }

    .ux-cart__clear {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-cart__clear:hover {
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
    }

    .ux-cart__clear svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Cart Items List
    ======================================== */

    .ux-cart__items {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .ux-cart__items-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* ========================================
       Cart Item
    ======================================== */

    .ux-cart-item {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      padding: var(--ux-cart-item-padding);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-cart-item:last-child {
      border-bottom: none;
    }

    .ux-cart-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* Item image */
    .ux-cart-item__image {
      width: 56px;
      height: 56px;
      border-radius: var(--ux-border-radius);
      object-fit: cover;
      background-color: var(--ux-surface-secondary);
      flex-shrink: 0;
    }

    .ux-cart-item__image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: var(--ux-border-radius);
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-cart-item__image-placeholder svg {
      width: 24px;
      height: 24px;
    }

    /* Item content */
    .ux-cart-item__content {
      flex: 1;
      min-width: 0;
    }

    .ux-cart-item__name {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ux-cart-item__meta {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-cart-item__unit-price {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* Item price */
    .ux-cart-item__price {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      text-align: right;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    /* Item quantity controls */
    .ux-cart-item__qty {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-xs);
    }

    .ux-cart-item__qty-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      color: var(--ux-text);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-cart-item__qty-btn:hover {
      background-color: var(--ux-surface-tertiary);
      border-color: var(--ux-primary);
    }

    .ux-cart-item__qty-btn:active {
      transform: scale(0.95);
    }

    .ux-cart-item__qty-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ux-cart-item__qty-btn svg {
      width: 14px;
      height: 14px;
    }

    .ux-cart-item__qty-value {
      min-width: 32px;
      text-align: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    /* Item remove button */
    .ux-cart-item__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      margin-left: auto;
    }

    .ux-cart-item__remove:hover {
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      color: var(--ux-danger);
    }

    .ux-cart-item__remove svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Compact Item Variant
    ======================================== */

    .ux-cart-item--compact {
      padding: var(--ux-space-sm) var(--ux-space-md);
      gap: var(--ux-space-sm);
    }

    .ux-cart-item--compact .ux-cart-item__image,
    .ux-cart-item--compact .ux-cart-item__image-placeholder {
      width: 40px;
      height: 40px;
    }

    .ux-cart-item--compact .ux-cart-item__name {
      font-size: var(--ux-font-size-xs);
      -webkit-line-clamp: 1;
    }

    /* ========================================
       Swipe to Delete
    ======================================== */

    .ux-cart-item--swipeable {
      position: relative;
      overflow: hidden;
    }

    .ux-cart-item__swipe-action {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      background-color: var(--ux-danger);
      color: white;
      transform: translateX(100%);
      transition: transform var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-cart-item--swiped .ux-cart-item__swipe-action {
      transform: translateX(0);
    }

    .ux-cart-item__swipe-action svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Cart Empty State
    ======================================== */

    .ux-cart__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      text-align: center;
      flex: 1;
    }

    .ux-cart__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-cart__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-cart__empty-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Cart Summary
    ======================================== */

    .ux-cart-summary {
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-cart-summary__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-cart-summary__row:last-child {
      margin-bottom: 0;
    }

    .ux-cart-summary__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-cart-summary__value {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-cart-summary__row--subtotal {
      padding-top: var(--ux-space-sm);
      border-top: 1px dashed var(--ux-border-color);
    }

    .ux-cart-summary__row--total {
      padding-top: var(--ux-space-md);
      margin-top: var(--ux-space-sm);
      border-top: 2px solid var(--ux-border-color);
    }

    .ux-cart-summary__row--total .ux-cart-summary__label {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-cart-summary__row--total .ux-cart-summary__value {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-primary);
    }

    /* Discount row */
    .ux-cart-summary__row--discount .ux-cart-summary__value {
      color: var(--ux-success);
    }

    /* ========================================
       Cart Actions
    ======================================== */

    .ux-cart__actions {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-cart__actions--row {
      flex-direction: row;
    }

    .ux-cart__actions--row > * {
      flex: 1;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-cart--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-cart--glass .ux-cart__header,
    .ux-cart--glass .ux-cart-item,
    .ux-cart--glass .ux-cart-summary,
    .ux-cart--glass .ux-cart__actions {
      background: transparent;
      border-color: var(--ux-glass-border);
    }

    .ux-cart--glass .ux-cart-summary {
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Mini Cart (Dropdown)
    ======================================== */

    .ux-cart--mini {
      max-height: 400px;
      width: 320px;
    }

    .ux-cart--mini .ux-cart__items {
      max-height: 240px;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-cart-item__qty-btn {
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-cart-item__qty-btn {
      border-color: var(--ux-border-color);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-cart__header {
        padding: var(--ux-space-sm) var(--ux-space-md);
      }

      .ux-cart-item {
        padding: var(--ux-space-sm) var(--ux-space-md);
      }

      .ux-cart-summary,
      .ux-cart__actions {
        padding: var(--ux-space-sm) var(--ux-space-md);
      }
    }
  `;

  // Icons
  const icons = {
    plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    cart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
    placeholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-cart-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-cart-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for cart
  const cartComponent = (config = {}) => ({
    // Cart items
    items: config.items || [],

    // Configuration
    currency: config.currency || '$',
    locale: config.locale || 'en-US',
    taxRate: config.taxRate || 0,
    discountAmount: config.discountAmount || 0,
    discountPercent: config.discountPercent || 0,
    shippingCost: config.shippingCost || 0,

    // Labels
    labels: {
      title: config.labels?.title || 'Cart',
      empty: config.labels?.empty || 'Your cart is empty',
      emptyText: config.labels?.emptyText || 'Add products to get started',
      subtotal: config.labels?.subtotal || 'Subtotal',
      tax: config.labels?.tax || 'Tax',
      discount: config.labels?.discount || 'Discount',
      shipping: config.labels?.shipping || 'Shipping',
      total: config.labels?.total || 'Total',
      clearCart: config.labels?.clearCart || 'Clear',
      checkout: config.labels?.checkout || 'Checkout',
      items: config.labels?.items || 'items',
      ...config.labels
    },

    // Computed: Total items count
    get itemCount() {
      return this.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    // Computed: Subtotal
    get subtotal() {
      return this.items.reduce((sum, item) => {
        const price = item.price || 0;
        const qty = item.quantity || 1;
        return sum + (price * qty);
      }, 0);
    },

    // Computed: Discount
    get discount() {
      if (this.discountAmount > 0) {
        return this.discountAmount;
      }
      if (this.discountPercent > 0) {
        return this.subtotal * (this.discountPercent / 100);
      }
      return 0;
    },

    // Computed: Tax
    get tax() {
      const taxableAmount = this.subtotal - this.discount;
      return taxableAmount * (this.taxRate / 100);
    },

    // Computed: Total
    get total() {
      return this.subtotal - this.discount + this.tax + this.shippingCost;
    },

    // Computed: Is cart empty
    get isEmpty() {
      return this.items.length === 0;
    },

    // Format price
    formatPrice(price) {
      return new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.getCurrencyCode()
      }).format(price);
    },

    // Get currency code
    getCurrencyCode() {
      const map = { '$': 'USD', '€': 'EUR', '£': 'GBP', '¥': 'JPY' };
      return map[this.currency] || 'USD';
    },

    // Add item to cart
    addItem(product, quantity = 1) {
      const existingIndex = this.items.findIndex(item =>
        item.id === product.id && JSON.stringify(item.options) === JSON.stringify(product.options)
      );

      if (existingIndex > -1) {
        this.items[existingIndex].quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity: quantity
        });
      }

      this.$dispatch('cart-update', { items: this.items, total: this.total });
    },

    // Remove item from cart
    removeItem(index) {
      const removed = this.items.splice(index, 1)[0];
      this.$dispatch('cart-item-removed', { item: removed, items: this.items });
      this.$dispatch('cart-update', { items: this.items, total: this.total });
    },

    // Update item quantity
    updateQuantity(index, quantity) {
      if (quantity <= 0) {
        this.removeItem(index);
        return;
      }

      this.items[index].quantity = quantity;
      this.$dispatch('cart-update', { items: this.items, total: this.total });
    },

    // Increment quantity
    incrementQuantity(index) {
      const item = this.items[index];
      const maxQty = item.maxQuantity || Infinity;

      if (item.quantity < maxQty) {
        this.updateQuantity(index, item.quantity + 1);
      }
    },

    // Decrement quantity
    decrementQuantity(index) {
      const item = this.items[index];
      this.updateQuantity(index, item.quantity - 1);
    },

    // Clear cart
    clearCart() {
      this.items = [];
      this.$dispatch('cart-cleared');
      this.$dispatch('cart-update', { items: [], total: 0 });
    },

    // Checkout
    checkout() {
      this.$dispatch('cart-checkout', {
        items: this.items,
        subtotal: this.subtotal,
        discount: this.discount,
        tax: this.tax,
        shipping: this.shippingCost,
        total: this.total
      });
    },

    // Apply discount
    applyDiscount(amount, isPercent = false) {
      if (isPercent) {
        this.discountPercent = amount;
        this.discountAmount = 0;
      } else {
        this.discountAmount = amount;
        this.discountPercent = 0;
      }
      this.$dispatch('cart-update', { items: this.items, total: this.total });
    },

    // Clear discount
    clearDiscount() {
      this.discountAmount = 0;
      this.discountPercent = 0;
      this.$dispatch('cart-update', { items: this.items, total: this.total });
    },

    // Get icon
    getIcon(name) {
      return icons[name] || '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCart', cartComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCart', cartComponent);
    });
  }
})();
