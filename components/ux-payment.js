/**
 * UX Payment Selector Component
 * Payment method selection, split payments, and change calculator for POS
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Payment Method Selector
       ========================================================================== */

    :root {
      --ux-payment-method-gap: var(--ux-space-sm);
      --ux-payment-method-padding: var(--ux-space-md);
      --ux-payment-method-radius: var(--ux-radius-lg);
      --ux-payment-method-border: 2px solid var(--ux-border-color);
      --ux-payment-method-bg: var(--ux-surface);
      --ux-payment-method-selected-bg: var(--ux-primary-tint);
      --ux-payment-method-selected-border: var(--ux-primary);
      --ux-payment-icon-size: 32px;
      --ux-payment-quick-size: 56px;
    }

    .ux-payment {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-lg);
    }

    .ux-payment__section {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-payment__label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ==========================================================================
       Payment Methods Grid
       ========================================================================== */

    .ux-payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--ux-payment-method-gap);
    }

    .ux-payment-methods--list {
      grid-template-columns: 1fr;
    }

    .ux-payment-methods--2col {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-payment-methods--3col {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-payment-method {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-payment-method-padding);
      background: var(--ux-payment-method-bg);
      border: var(--ux-payment-method-border);
      border-radius: var(--ux-payment-method-radius);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
      min-height: 80px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-payment-method:active {
      transform: scale(0.97);
    }

    .ux-payment-method--selected {
      background: var(--ux-payment-method-selected-bg);
      border-color: var(--ux-payment-method-selected-border);
      box-shadow: 0 0 0 1px var(--ux-payment-method-selected-border);
    }

    .ux-payment-method--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-payment-method--horizontal {
      flex-direction: row;
      justify-content: flex-start;
      gap: var(--ux-space-md);
      min-height: auto;
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    .ux-payment-method__icon {
      width: var(--ux-payment-icon-size);
      height: var(--ux-payment-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ux-text-secondary);
      transition: color var(--ux-transition-fast);
    }

    .ux-payment-method__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-payment-method--selected .ux-payment-method__icon {
      color: var(--ux-primary);
    }

    .ux-payment-method__name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text);
      text-align: center;
    }

    .ux-payment-method--horizontal .ux-payment-method__name {
      text-align: left;
    }

    .ux-payment-method__desc {
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Quick Amounts
       ========================================================================== */

    .ux-payment-quick {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--ux-space-sm);
    }

    .ux-payment-quick--3col {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-payment-quick--5col {
      grid-template-columns: repeat(5, 1fr);
    }

    .ux-payment-quick__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--ux-payment-quick-size);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      font-size: 1rem;
      font-weight: 600;
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-payment-quick__btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-payment-quick__btn:active {
      transform: scale(0.95);
      background: var(--ux-primary-tint);
    }

    .ux-payment-quick__btn--exact {
      background: var(--ux-success-tint);
      border-color: var(--ux-success);
      color: var(--ux-success-shade);
    }

    .ux-payment-quick__btn--exact:hover {
      background: var(--ux-success);
      color: white;
    }

    /* ==========================================================================
       Change Calculator
       ========================================================================== */

    .ux-payment-change {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      padding: var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-lg);
    }

    .ux-payment-change__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ux-payment-change__label {
      font-size: 0.9375rem;
      color: var(--ux-text-secondary);
    }

    .ux-payment-change__value {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-payment-change__row--total {
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-payment-change__row--total .ux-payment-change__label {
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-payment-change__row--total .ux-payment-change__value {
      font-size: 1.5rem;
      color: var(--ux-primary);
    }

    .ux-payment-change__row--change .ux-payment-change__value {
      color: var(--ux-success);
    }

    .ux-payment-change__row--due .ux-payment-change__value {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Split Payment
       ========================================================================== */

    .ux-payment-split {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
    }

    .ux-payment-split__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
    }

    .ux-payment-split__method {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex: 1;
    }

    .ux-payment-split__method-icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    .ux-payment-split__method-name {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-payment-split__amount {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
      min-width: 80px;
      text-align: right;
    }

    .ux-payment-split__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--ux-danger-tint);
      border: none;
      border-radius: 50%;
      color: var(--ux-danger);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-payment-split__remove:hover {
      background: var(--ux-danger);
      color: white;
    }

    .ux-payment-split__add {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      background: transparent;
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text-secondary);
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-payment-split__add:hover {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
      background: var(--ux-primary-tint);
    }

    /* ==========================================================================
       Payment Summary
       ========================================================================== */

    .ux-payment-summary {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-lg);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
    }

    .ux-payment-summary__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9375rem;
    }

    .ux-payment-summary__label {
      color: var(--ux-text-secondary);
    }

    .ux-payment-summary__value {
      font-weight: 500;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-payment-summary__row--total {
      padding-top: var(--ux-space-md);
      margin-top: var(--ux-space-sm);
      border-top: 2px solid var(--ux-border-color);
    }

    .ux-payment-summary__row--total .ux-payment-summary__label {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-payment-summary__row--total .ux-payment-summary__value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--ux-primary);
    }

    /* ==========================================================================
       Payment Actions
       ========================================================================== */

    .ux-payment-actions {
      display: flex;
      gap: var(--ux-space-sm);
    }

    .ux-payment-actions--stacked {
      flex-direction: column;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-payment--glass .ux-payment-method {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-payment--glass .ux-payment-method--selected {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-payment--glass .ux-payment-change,
    .ux-payment--glass .ux-payment-summary {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-payment--glass .ux-payment-quick__btn {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-payment--glass .ux-payment-split__item {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-payment--compact .ux-payment-method {
      min-height: 60px;
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-payment--compact .ux-payment-method__icon {
      width: 24px;
      height: 24px;
    }

    .ux-payment--compact .ux-payment-quick__btn {
      height: 44px;
      font-size: 0.875rem;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-payment-method-bg: var(--ux-gray-800);
        --ux-payment-method-selected-bg: rgba(var(--ux-primary-rgb), 0.2);
      }

      .ux-payment-quick__btn {
        background: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-payment-quick__btn:hover {
        background: var(--ux-gray-700);
      }

      .ux-payment-quick__btn--exact {
        background: rgba(var(--ux-success-rgb), 0.2);
      }
    }

    .ux-dark {
      --ux-payment-method-bg: var(--ux-gray-800);
      --ux-payment-method-selected-bg: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-dark .ux-payment-quick__btn {
      background: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
    }

    .ux-dark .ux-payment-quick__btn:hover {
      background: var(--ux-gray-700);
    }

    .ux-dark .ux-payment-quick__btn--exact {
      background: rgba(var(--ux-success-rgb), 0.2);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-payment-methods {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-payment-quick {
        grid-template-columns: repeat(3, 1fr);
      }

      .ux-payment-actions {
        flex-direction: column;
      }
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-payment-method,
      .ux-payment-quick__btn {
        transition: none;
      }
    }
  `;

  // Payment method icons
  const icons = {
    cash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M6 12h.01M18 12h.01"/>
    </svg>`,
    card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 10h20"/>
      <path d="M6 14h4"/>
    </svg>`,
    contactless: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 12a6 6 0 0 1 6-6"/>
      <path d="M6 16a10 10 0 0 1 10-10"/>
      <path d="M6 20a14 14 0 0 1 14-14"/>
      <circle cx="6" cy="20" r="2" fill="currentColor"/>
    </svg>`,
    wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 10H18a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4"/>
      <circle cx="18" cy="12" r="1" fill="currentColor"/>
    </svg>`,
    transfer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 3L21 7L17 11"/>
      <path d="M21 7H3"/>
      <path d="M7 21L3 17L7 13"/>
      <path d="M3 17h18"/>
    </svg>`,
    voucher: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4a3 3 0 0 1 0-6V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4Z"/>
      <path d="M9 4v16"/>
    </svg>`,
    crypto: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.5 9.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5c0 1-0.5 1.5-1.5 2l-1 0.5V14"/>
      <circle cx="12" cy="16.5" r="0.5" fill="currentColor"/>
    </svg>`,
    qr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="3" height="3"/>
      <path d="M18 14v3h3"/>
      <path d="M14 18h3v3"/>
    </svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M7 15h6"/>
      <path d="M7 11h10"/>
    </svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-payment-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-payment-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const paymentData = (options = {}) => ({
    // Configuration
    total: options.total || 0,
    currency: options.currency || '€',
    currencyPosition: options.currencyPosition || 'after', // 'before' or 'after'
    quickAmounts: options.quickAmounts || [5, 10, 20, 50, 100],
    methods: options.methods || [
      { id: 'cash', name: 'Efectivo', icon: 'cash' },
      { id: 'card', name: 'Tarjeta', icon: 'card' },
      { id: 'contactless', name: 'Contactless', icon: 'contactless' }
    ],
    allowSplit: options.allowSplit ?? false,
    showChange: options.showChange ?? true,

    // State
    selectedMethod: options.defaultMethod || null,
    amountReceived: 0,
    splitPayments: [],
    icons: icons,

    // Computed
    get change() {
      if (this.allowSplit) {
        const totalPaid = this.splitPayments.reduce((sum, p) => sum + p.amount, 0);
        return Math.max(0, totalPaid - this.total);
      }
      return Math.max(0, this.amountReceived - this.total);
    },

    get amountDue() {
      if (this.allowSplit) {
        const totalPaid = this.splitPayments.reduce((sum, p) => sum + p.amount, 0);
        return Math.max(0, this.total - totalPaid);
      }
      return Math.max(0, this.total - this.amountReceived);
    },

    get isPaid() {
      if (this.allowSplit) {
        const totalPaid = this.splitPayments.reduce((sum, p) => sum + p.amount, 0);
        return totalPaid >= this.total;
      }
      return this.amountReceived >= this.total;
    },

    get totalPaid() {
      if (this.allowSplit) {
        return this.splitPayments.reduce((sum, p) => sum + p.amount, 0);
      }
      return this.amountReceived;
    },

    // Methods
    init() {
      if (this.methods.length > 0 && !this.selectedMethod) {
        this.selectedMethod = this.methods[0].id;
      }
    },

    formatCurrency(amount) {
      const formatted = amount.toFixed(2);
      return this.currencyPosition === 'before'
        ? `${this.currency}${formatted}`
        : `${formatted}${this.currency}`;
    },

    selectMethod(methodId) {
      this.selectedMethod = methodId;
      this.$dispatch('payment:method-selected', {
        method: methodId,
        methodData: this.methods.find(m => m.id === methodId)
      });
    },

    setAmount(amount) {
      this.amountReceived = amount;
      this.$dispatch('payment:amount-changed', {
        amount: amount,
        change: this.change,
        isPaid: this.isPaid
      });
    },

    addQuickAmount(amount) {
      this.amountReceived = amount;
      this.$dispatch('payment:amount-changed', {
        amount: amount,
        change: this.change,
        isPaid: this.isPaid
      });
    },

    setExactAmount() {
      this.amountReceived = this.total;
      this.$dispatch('payment:amount-changed', {
        amount: this.total,
        change: 0,
        isPaid: true
      });
    },

    // Split payment methods
    addSplitPayment(methodId, amount) {
      const method = this.methods.find(m => m.id === methodId);
      if (method) {
        this.splitPayments.push({
          id: Date.now(),
          methodId: methodId,
          method: method,
          amount: amount || this.amountDue
        });
        this.$dispatch('payment:split-added', {
          payments: this.splitPayments,
          totalPaid: this.totalPaid,
          amountDue: this.amountDue
        });
      }
    },

    removeSplitPayment(paymentId) {
      const index = this.splitPayments.findIndex(p => p.id === paymentId);
      if (index > -1) {
        this.splitPayments.splice(index, 1);
        this.$dispatch('payment:split-removed', {
          payments: this.splitPayments,
          totalPaid: this.totalPaid,
          amountDue: this.amountDue
        });
      }
    },

    updateSplitAmount(paymentId, amount) {
      const payment = this.splitPayments.find(p => p.id === paymentId);
      if (payment) {
        payment.amount = amount;
        this.$dispatch('payment:split-updated', {
          payments: this.splitPayments,
          totalPaid: this.totalPaid,
          amountDue: this.amountDue
        });
      }
    },

    clearSplitPayments() {
      this.splitPayments = [];
      this.$dispatch('payment:split-cleared');
    },

    // Process payment
    processPayment() {
      if (!this.isPaid) {
        this.$dispatch('payment:insufficient', {
          total: this.total,
          paid: this.totalPaid,
          due: this.amountDue
        });
        return false;
      }

      const paymentData = {
        total: this.total,
        method: this.selectedMethod,
        amountReceived: this.amountReceived,
        change: this.change,
        splitPayments: this.splitPayments.length > 0 ? [...this.splitPayments] : null
      };

      this.$dispatch('payment:processed', paymentData);
      return true;
    },

    reset() {
      this.amountReceived = 0;
      this.splitPayments = [];
      if (this.methods.length > 0) {
        this.selectedMethod = this.methods[0].id;
      }
      this.$dispatch('payment:reset');
    },

    getIcon(name) {
      return this.icons[name] || this.icons.cash;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxPayment', paymentData);
  }
})();
