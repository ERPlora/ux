/**
 * UX Stock Indicator Component
 * Inventory/POS stock status display
 */
(function() {
  'use strict';

  const styles = `
    /* Stock Indicator Variables */
    :root {
      --ux-stock-indicator-height: 24px;
      --ux-stock-indicator-padding: 0 var(--ux-space-sm);
      --ux-stock-indicator-gap: var(--ux-space-xs);
      --ux-stock-indicator-font-size: 0.8125rem;
      --ux-stock-indicator-border-radius: var(--ux-radius-sm);

      /* Dot */
      --ux-stock-indicator-dot-size: 8px;

      /* State Colors */
      --ux-stock-in-stock: var(--ux-green-500);
      --ux-stock-in-stock-bg: var(--ux-green-50);
      --ux-stock-low-stock: var(--ux-yellow-500);
      --ux-stock-low-stock-bg: var(--ux-yellow-50);
      --ux-stock-out-of-stock: var(--ux-red-500);
      --ux-stock-out-of-stock-bg: var(--ux-red-50);
      --ux-stock-backorder: var(--ux-blue-500);
      --ux-stock-backorder-bg: var(--ux-blue-50);
    }

    /* Base Stock Indicator */
    .ux-stock-indicator {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-stock-indicator-gap);
      height: var(--ux-stock-indicator-height);
      padding: var(--ux-stock-indicator-padding);
      font-size: var(--ux-stock-indicator-font-size);
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border-radius: var(--ux-stock-indicator-border-radius);
      background: transparent;
      transition: opacity var(--ux-transition-fast) var(--ux-ease-default);
    }

    /* Dot Element */
    .ux-stock-indicator__dot {
      width: var(--ux-stock-indicator-dot-size);
      height: var(--ux-stock-indicator-dot-size);
      border-radius: 50%;
      flex-shrink: 0;
      background: currentColor;
    }

    /* Pulse animation for low stock */
    .ux-stock-indicator--low-stock .ux-stock-indicator__dot {
      animation: ux-stock-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-stock-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Label Element */
    .ux-stock-indicator__label {
      color: var(--ux-text-secondary);
    }

    /* Count Element */
    .ux-stock-indicator__count {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
    }

    /* =====================
       STATE MODIFIERS
       ===================== */

    /* In Stock */
    .ux-stock-indicator--in-stock {
      color: var(--ux-stock-in-stock);
    }
    .ux-stock-indicator--in-stock .ux-stock-indicator__label {
      color: var(--ux-stock-in-stock);
    }

    /* Low Stock */
    .ux-stock-indicator--low-stock {
      color: var(--ux-stock-low-stock);
    }
    .ux-stock-indicator--low-stock .ux-stock-indicator__label {
      color: var(--ux-stock-low-stock);
    }

    /* Out of Stock */
    .ux-stock-indicator--out-of-stock {
      color: var(--ux-stock-out-of-stock);
    }
    .ux-stock-indicator--out-of-stock .ux-stock-indicator__label {
      color: var(--ux-stock-out-of-stock);
    }

    /* Backorder */
    .ux-stock-indicator--backorder {
      color: var(--ux-stock-backorder);
    }
    .ux-stock-indicator--backorder .ux-stock-indicator__label {
      color: var(--ux-stock-backorder);
    }

    /* =====================
       VARIANT MODIFIERS
       ===================== */

    /* Compact - Dot only */
    .ux-stock-indicator--compact {
      padding: 0;
      height: auto;
      gap: 0;
    }
    .ux-stock-indicator--compact .ux-stock-indicator__label,
    .ux-stock-indicator--compact .ux-stock-indicator__count {
      display: none;
    }

    /* Badge - Pill shape with background */
    .ux-stock-indicator--badge {
      border-radius: 9999px;
      padding: 0 var(--ux-space-sm);
    }

    .ux-stock-indicator--badge.ux-stock-indicator--in-stock {
      background: var(--ux-stock-in-stock-bg);
    }
    .ux-stock-indicator--badge.ux-stock-indicator--low-stock {
      background: var(--ux-stock-low-stock-bg);
    }
    .ux-stock-indicator--badge.ux-stock-indicator--out-of-stock {
      background: var(--ux-stock-out-of-stock-bg);
    }
    .ux-stock-indicator--badge.ux-stock-indicator--backorder {
      background: var(--ux-stock-backorder-bg);
    }

    /* =====================
       DARK MODE
       ===================== */
    @media (prefers-color-scheme: dark) {
      :root {
        --ux-stock-in-stock-bg: rgba(34, 197, 94, 0.15);
        --ux-stock-low-stock-bg: rgba(234, 179, 8, 0.15);
        --ux-stock-out-of-stock-bg: rgba(239, 68, 68, 0.15);
        --ux-stock-backorder-bg: rgba(59, 130, 246, 0.15);
      }
    }

    .ux-dark {
      --ux-stock-in-stock-bg: rgba(34, 197, 94, 0.15);
      --ux-stock-low-stock-bg: rgba(234, 179, 8, 0.15);
      --ux-stock-out-of-stock-bg: rgba(239, 68, 68, 0.15);
      --ux-stock-backorder-bg: rgba(59, 130, 246, 0.15);
    }

    /* =====================
       REDUCED MOTION
       ===================== */
    @media (prefers-reduced-motion: reduce) {
      .ux-stock-indicator--low-stock .ux-stock-indicator__dot {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-stock-indicator-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-stock-indicator-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const componentData = (options = {}) => ({
    // State
    quantity: options.quantity ?? 0,
    lowThreshold: options.lowThreshold ?? 10,
    backorder: options.backorder ?? false,

    // Computed: determine stock status
    get stockStatus() {
      if (this.backorder) return 'backorder';
      if (this.quantity <= 0) return 'out-of-stock';
      if (this.quantity <= this.lowThreshold) return 'low-stock';
      return 'in-stock';
    },

    // Get status label text
    get statusLabel() {
      switch (this.stockStatus) {
        case 'in-stock': return 'In Stock';
        case 'low-stock': return 'Low Stock';
        case 'out-of-stock': return 'Out of Stock';
        case 'backorder': return 'Backorder';
        default: return '';
      }
    },

    // Get CSS modifier class
    get statusClass() {
      return `ux-stock-indicator--${this.stockStatus}`;
    },

    // Update quantity
    setQuantity(qty) {
      this.quantity = Math.max(0, parseInt(qty, 10) || 0);
      this.$dispatch('stock:change', {
        quantity: this.quantity,
        status: this.stockStatus
      });
    },

    // Update threshold
    setThreshold(threshold) {
      this.lowThreshold = Math.max(1, parseInt(threshold, 10) || 10);
    },

    // Toggle backorder status
    toggleBackorder() {
      this.backorder = !this.backorder;
      this.$dispatch('stock:change', {
        quantity: this.quantity,
        status: this.stockStatus,
        backorder: this.backorder
      });
    },

    // Init
    init() {
      // Watch for external quantity changes via x-model or :quantity
      if (this.$el.hasAttribute('x-model')) {
        this.$watch('quantity', () => {
          this.$dispatch('stock:change', {
            quantity: this.quantity,
            status: this.stockStatus
          });
        });
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxStockIndicator', componentData);
  }
})();
