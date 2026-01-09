(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Quantity Badge
       Badges for counters, notifications, cart items
    ======================================== */

    .ux-quantity-badge {
      position: relative;
      display: inline-flex;
    }

    .ux-quantity-badge__count {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ux-danger);
      color: white;
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
      border-radius: var(--ux-radius-full);
      border: 2px solid var(--ux-surface);
      transform: scale(1);
      transition: transform var(--ux-transition-fast) var(--ux-ease-bounce);
    }

    /* Animated entrance */
    .ux-quantity-badge__count--animate {
      animation: ux-badge-pop 0.3s var(--ux-ease-bounce);
    }

    @keyframes ux-badge-pop {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    /* Hidden when zero */
    .ux-quantity-badge__count--hidden {
      transform: scale(0);
    }

    /* Dot variant (no number) */
    .ux-quantity-badge__count--dot {
      min-width: 10px;
      width: 10px;
      height: 10px;
      padding: 0;
      top: -2px;
      right: -2px;
    }

    /* Size variants */
    .ux-quantity-badge--sm .ux-quantity-badge__count {
      min-width: 14px;
      height: 14px;
      padding: 0 3px;
      font-size: 9px;
      top: -4px;
      right: -4px;
    }

    .ux-quantity-badge--lg .ux-quantity-badge__count {
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      font-size: 13px;
      top: -8px;
      right: -8px;
    }

    /* Position variants */
    .ux-quantity-badge--top-left .ux-quantity-badge__count {
      top: -6px;
      right: auto;
      left: -6px;
    }

    .ux-quantity-badge--bottom-right .ux-quantity-badge__count {
      top: auto;
      bottom: -6px;
      right: -6px;
    }

    .ux-quantity-badge--bottom-left .ux-quantity-badge__count {
      top: auto;
      bottom: -6px;
      right: auto;
      left: -6px;
    }

    /* Inline variant */
    .ux-quantity-badge--inline {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-quantity-badge--inline .ux-quantity-badge__count {
      position: static;
      border: none;
    }

    /* Color variants */
    .ux-quantity-badge--primary .ux-quantity-badge__count {
      background: var(--ux-primary);
    }

    .ux-quantity-badge--secondary .ux-quantity-badge__count {
      background: var(--ux-secondary);
    }

    .ux-quantity-badge--success .ux-quantity-badge__count {
      background: var(--ux-success);
    }

    .ux-quantity-badge--warning .ux-quantity-badge__count {
      background: var(--ux-warning);
      color: var(--ux-gray-900);
    }

    .ux-quantity-badge--danger .ux-quantity-badge__count {
      background: var(--ux-danger);
    }

    .ux-quantity-badge--dark .ux-quantity-badge__count {
      background: var(--ux-gray-800);
    }

    .ux-quantity-badge--light .ux-quantity-badge__count {
      background: var(--ux-gray-200);
      color: var(--ux-gray-800);
    }

    /* Soft color variants */
    .ux-quantity-badge--primary-soft .ux-quantity-badge__count {
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
      border-color: var(--ux-primary-tint);
    }

    .ux-quantity-badge--success-soft .ux-quantity-badge__count {
      background: var(--ux-success-tint);
      color: var(--ux-success);
      border-color: var(--ux-success-tint);
    }

    .ux-quantity-badge--danger-soft .ux-quantity-badge__count {
      background: var(--ux-danger-tint);
      color: var(--ux-danger);
      border-color: var(--ux-danger-tint);
    }

    /* Outline variants */
    .ux-quantity-badge--outline .ux-quantity-badge__count {
      background: var(--ux-surface);
      color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-quantity-badge--outline.ux-quantity-badge--primary .ux-quantity-badge__count {
      color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-quantity-badge--outline.ux-quantity-badge--success .ux-quantity-badge__count {
      color: var(--ux-success);
      border-color: var(--ux-success);
    }

    /* Pulse animation for new items */
    .ux-quantity-badge__count--pulse {
      animation: ux-badge-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-badge-pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(var(--ux-danger-rgb, 239, 68, 68), 0.5);
      }
      50% {
        box-shadow: 0 0 0 6px rgba(var(--ux-danger-rgb, 239, 68, 68), 0);
      }
    }

    /* Cart specific styles */
    .ux-quantity-badge--cart {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-full);
    }

    .ux-quantity-badge--cart .ux-quantity-badge__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      background: var(--ux-gray-100);
      border-radius: 50%;
      color: var(--ux-text);
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-quantity-badge--cart .ux-quantity-badge__btn:hover {
      background: var(--ux-gray-200);
    }

    .ux-quantity-badge--cart .ux-quantity-badge__btn:active {
      transform: scale(0.95);
    }

    .ux-quantity-badge--cart .ux-quantity-badge__btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ux-quantity-badge--cart .ux-quantity-badge__value {
      min-width: 24px;
      text-align: center;
      font-weight: 600;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    /* Stepper variant */
    .ux-quantity-badge--stepper {
      display: inline-flex;
      align-items: center;
      background: var(--ux-gray-100);
      border-radius: var(--ux-radius-md);
      overflow: hidden;
    }

    .ux-quantity-badge--stepper .ux-quantity-badge__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: var(--ux-text);
      font-size: 18px;
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-quantity-badge--stepper .ux-quantity-badge__btn:hover {
      background: var(--ux-gray-200);
    }

    .ux-quantity-badge--stepper .ux-quantity-badge__btn:active {
      background: var(--ux-gray-300);
    }

    .ux-quantity-badge--stepper .ux-quantity-badge__btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ux-quantity-badge--stepper .ux-quantity-badge__value {
      min-width: 40px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      border-left: 1px solid var(--ux-border-color);
      border-right: 1px solid var(--ux-border-color);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-quantity-badge__count {
        border-color: var(--ux-gray-900);
      }

      .ux-quantity-badge--light .ux-quantity-badge__count {
        background: var(--ux-gray-700);
        color: var(--ux-gray-200);
      }

      .ux-quantity-badge--cart {
        background: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-quantity-badge--cart .ux-quantity-badge__btn {
        background: var(--ux-gray-700);
      }

      .ux-quantity-badge--cart .ux-quantity-badge__btn:hover {
        background: var(--ux-gray-600);
      }

      .ux-quantity-badge--stepper {
        background: var(--ux-gray-800);
      }

      .ux-quantity-badge--stepper .ux-quantity-badge__btn:hover {
        background: var(--ux-gray-700);
      }

      .ux-quantity-badge--stepper .ux-quantity-badge__value {
        border-color: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-quantity-badge__count {
      border-color: var(--ux-gray-900);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-quantity-badge__count {
        transition: none;
      }

      .ux-quantity-badge__count--animate {
        animation: none;
      }

      .ux-quantity-badge__count--pulse {
        animation: none;
      }
    }
  `;

  if (window.UX) {
    window.UX.injectStyles('ux-quantity-badge-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-quantity-badge-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for interactive quantity badges
  const componentData = (options = {}) => ({
    value: options.value ?? 0,
    min: options.min ?? 0,
    max: options.max ?? 999,
    step: options.step ?? 1,
    animate: options.animate ?? true,
    showAnimation: false,

    init() {
      this.$watch('value', (newVal, oldVal) => {
        if (this.animate && newVal !== oldVal) {
          this.showAnimation = true;
          setTimeout(() => {
            this.showAnimation = false;
          }, 300);
        }
        this.$dispatch('quantity:change', { value: newVal, oldValue: oldVal });
      });
    },

    increment() {
      if (this.value < this.max) {
        this.value = Math.min(this.max, this.value + this.step);
      }
    },

    decrement() {
      if (this.value > this.min) {
        this.value = Math.max(this.min, this.value - this.step);
      }
    },

    setValue(val) {
      this.value = Math.max(this.min, Math.min(this.max, val));
    },

    get displayValue() {
      if (this.value > 99) return '99+';
      return this.value.toString();
    },

    get isAtMin() {
      return this.value <= this.min;
    },

    get isAtMax() {
      return this.value >= this.max;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxQuantityBadge', componentData);
  }
})();
