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
      height: var(--ux-button-height);
      min-height: var(--ux-button-min-height);
      max-height: var(--ux-button-max-height);
      padding: var(--ux-button-padding-y) var(--ux-button-padding-x);
      font-family: var(--ux-font-family);
      font-size: var(--ux-button-font-size);
      font-weight: var(--ux-button-font-weight);
      line-height: 1;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      /* Uses composition system: combine with .ux-color-* classes */
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
      border: 2px solid var(--ux-variant-border, transparent);
      border-radius: var(--ux-button-border-radius);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      transition: var(--ux-transition-colors),
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      position: relative;
      overflow: hidden;
    }

    .ux-button:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-primary-shade));
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
       Outline Variant
       Use with .ux-color-*--outline classes
    ======================================== */

    .ux-button--outline {
      background-color: var(--ux-variant-bg, transparent);
      color: var(--ux-variant-color, var(--ux-primary));
      border: 2px solid var(--ux-variant-border, var(--ux-primary));
    }

    .ux-button--outline:hover {
      background-color: var(--ux-variant-bg-hover, rgba(var(--ux-primary-rgb), 0.1));
    }

    /* ========================================
       Clear Variant (text only)
       Use with .ux-color-* classes for color
    ======================================== */

    .ux-button--clear {
      background-color: transparent;
      color: var(--ux-variant-color, var(--ux-primary));
      border: none;
    }

    .ux-button--clear:hover {
      background-color: var(--ux-variant-bg-hover, rgba(0, 0, 0, 0.05));
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-button--glass {
      box-shadow: var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
      color: var(--ux-text);
    }

    .ux-button--glass:hover {
      background: var(--ux-glass-bg-thick);
    }

    .ux-button--glass:active {
      background: var(--ux-glass-bg);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-button--sm {
      height: var(--ux-button-height-sm);
      min-height: var(--ux-button-min-height-sm);
      padding: var(--ux-button-padding-y-sm) var(--ux-button-padding-x-sm);
      font-size: var(--ux-button-font-size-sm);
      border-radius: var(--ux-button-border-radius-sm);
    }

    .ux-button--lg {
      height: var(--ux-button-height-lg);
      min-height: var(--ux-button-min-height-lg);
      padding: var(--ux-button-padding-y-lg) var(--ux-button-padding-x-lg);
      font-size: var(--ux-button-font-size-lg);
      border-radius: var(--ux-button-border-radius-lg);
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
      width: var(--ux-button-icon-only-size);
      min-width: var(--ux-button-icon-only-size);
      height: var(--ux-button-icon-only-size);
      min-height: var(--ux-button-icon-only-size);
      padding: 0;
      border-radius: 50%;
    }

    .ux-button--icon.ux-button--sm {
      width: var(--ux-button-icon-only-size-sm);
      min-width: var(--ux-button-icon-only-size-sm);
      height: var(--ux-button-icon-only-size-sm);
      min-height: var(--ux-button-icon-only-size-sm);
    }

    .ux-button--icon.ux-button--lg {
      width: var(--ux-button-icon-only-size-lg);
      min-width: var(--ux-button-icon-only-size-lg);
      height: var(--ux-button-icon-only-size-lg);
      min-height: var(--ux-button-icon-only-size-lg);
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

    .ux-button--loading:not(.ux-button--outline):not(.ux-button--clear)::after {
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
      width: var(--ux-button-icon-size);
      height: var(--ux-button-icon-size);
      flex-shrink: 0;
    }

    .ux-button__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-button--sm .ux-button__icon {
      width: calc(var(--ux-button-icon-size) * 0.8);
      height: calc(var(--ux-button-icon-size) * 0.8);
    }

    .ux-button--lg .ux-button__icon {
      width: calc(var(--ux-button-icon-size) * 1.2);
      height: calc(var(--ux-button-icon-size) * 1.2);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-button {
        transition: none;
      }

      .ux-button::before {
        transition: none;
      }

      .ux-button:active {
        transform: none;
      }

      .ux-button--loading::after {
        animation: none;
      }
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
