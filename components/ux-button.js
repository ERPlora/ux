/**
 * UX Button Component
 * Botones estilo Ionic con variantes, tamaños y estados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Button
    ======================================== */

    .ux-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      min-height: var(--ux-touch-target);
      padding: 0 var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      line-height: 1;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      border: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      position: relative;
      overflow: hidden;
    }

    /* Ripple effect */
    .ux-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
      opacity: 0;
      pointer-events: none;
    }

    .ux-button:active::before {
      width: 300%;
      height: 300%;
      opacity: 1;
      transition: 0s;
    }

    /* Press effect */
    .ux-button:active {
      transform: scale(0.97);
    }

    /* Focus state */
    .ux-button:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* ========================================
       Variants - Filled (default)
    ======================================== */

    .ux-button--primary,
    .ux-button:not([class*="--"]) {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-button--primary:hover,
    .ux-button:not([class*="--"]):hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-button--secondary:hover {
      background-color: var(--ux-secondary-shade);
    }

    .ux-button--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-button--tertiary:hover {
      background-color: var(--ux-tertiary-shade);
    }

    .ux-button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-button--success:hover {
      background-color: var(--ux-success-shade);
    }

    .ux-button--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-button--warning:hover {
      background-color: var(--ux-warning-shade);
    }

    .ux-button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-button--danger:hover {
      background-color: var(--ux-danger-shade);
    }

    .ux-button--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-button--dark:hover {
      background-color: var(--ux-dark-shade);
    }

    .ux-button--medium {
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
    }

    .ux-button--medium:hover {
      background-color: var(--ux-medium-shade);
    }

    .ux-button--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    .ux-button--light:hover {
      background-color: var(--ux-light-shade);
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-button--outline {
      background-color: transparent;
      border: 2px solid currentColor;
    }

    .ux-button--outline.ux-button--primary,
    .ux-button--outline:not([class*="--primary"]):not([class*="--secondary"]):not([class*="--tertiary"]):not([class*="--success"]):not([class*="--warning"]):not([class*="--danger"]):not([class*="--dark"]):not([class*="--medium"]):not([class*="--light"]) {
      color: var(--ux-primary);
      border-color: var(--ux-primary);
      background-color: transparent;
    }

    .ux-button--outline.ux-button--primary:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-button--outline.ux-button--secondary {
      color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-button--outline.ux-button--secondary:hover {
      background-color: rgba(var(--ux-secondary-rgb), 0.1);
    }

    .ux-button--outline.ux-button--success {
      color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-button--outline.ux-button--success:hover {
      background-color: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-button--outline.ux-button--warning {
      color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-button--outline.ux-button--warning:hover {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
    }

    .ux-button--outline.ux-button--danger {
      color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-button--outline.ux-button--danger:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-button--outline.ux-button--dark {
      color: var(--ux-dark);
      border-color: var(--ux-dark);
    }

    .ux-button--outline.ux-button--dark:hover {
      background-color: rgba(var(--ux-dark-rgb), 0.1);
    }

    /* ========================================
       Clear Variant (text only)
    ======================================== */

    .ux-button--clear {
      background-color: transparent;
      border: none;
    }

    .ux-button--clear.ux-button--primary,
    .ux-button--clear:not([class*="--secondary"]):not([class*="--tertiary"]):not([class*="--success"]):not([class*="--warning"]):not([class*="--danger"]):not([class*="--dark"]) {
      color: var(--ux-primary);
    }

    .ux-button--clear:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ux-button--clear.ux-button--danger {
      color: var(--ux-danger);
    }

    .ux-button--clear.ux-button--success {
      color: var(--ux-success);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-button--sm {
      min-height: var(--ux-touch-target-sm);
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      border-radius: var(--ux-border-radius-sm);
    }

    .ux-button--lg {
      min-height: 52px;
      padding: 0 var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Full Width
    ======================================== */

    .ux-button--block {
      display: flex;
      width: 100%;
    }

    /* ========================================
       Round
    ======================================== */

    .ux-button--round {
      border-radius: 9999px;
    }

    /* ========================================
       Icon Only
    ======================================== */

    .ux-button--icon {
      width: var(--ux-touch-target);
      min-width: var(--ux-touch-target);
      padding: 0;
      border-radius: 50%;
    }

    .ux-button--icon.ux-button--sm {
      width: var(--ux-touch-target-sm);
      min-width: var(--ux-touch-target-sm);
    }

    .ux-button--icon.ux-button--lg {
      width: 52px;
      min-width: 52px;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-button--loading {
      pointer-events: none;
      position: relative;
      color: transparent !important;
    }

    .ux-button--loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: ux-button-spin 0.6s linear infinite;
    }

    .ux-button--loading.ux-button--primary::after,
    .ux-button--loading:not([class*="--outline"]):not([class*="--clear"])::after {
      border-color: rgba(255, 255, 255, 0.8);
      border-right-color: transparent;
    }

    @keyframes ux-button-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-button:disabled,
    .ux-button[disabled],
    .ux-button--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ========================================
       Button Group
    ======================================== */

    .ux-button-group {
      display: inline-flex;
    }

    .ux-button-group .ux-button {
      border-radius: 0;
    }

    .ux-button-group .ux-button:first-child {
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-button-group .ux-button:last-child {
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-button-group .ux-button:not(:last-child) {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* ========================================
       Button Icon
    ======================================== */

    .ux-button__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .ux-button__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-button--sm .ux-button__icon {
      width: 16px;
      height: 16px;
    }

    .ux-button--lg .ux-button__icon {
      width: 24px;
      height: 24px;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Register Alpine component for button with loading state
  const buttonComponent = () => ({
    loading: false,

    setLoading(state) {
      this.loading = state;
    },

    async click(callback) {
      if (this.loading) return;
      this.loading = true;
      try {
        await callback();
      } finally {
        this.loading = false;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxButton', buttonComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxButton', buttonComponent);
    });
  }
})();
