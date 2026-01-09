/**
 * UX Icon Button Component
 * Botones circulares/cuadrados solo con icono
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Icon Button
    ======================================== */

    .ux-icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-icon-button-size, 44px);
      height: var(--ux-icon-button-size, 44px);
      padding: 0;
      font-family: var(--ux-font-family);
      font-size: var(--ux-icon-button-icon-size, 20px);
      line-height: 1;
      /* Uses composition system: combine with .ux-color-* classes */
      background-color: var(--ux-variant-bg, transparent);
      color: var(--ux-variant-color, var(--ux-text));
      border: 2px solid var(--ux-variant-border, transparent);
      border-radius: var(--ux-icon-button-radius, 50%);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      transition: var(--ux-transition-colors),
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-icon-button:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-surface-secondary));
    }

    /* Ripple effect */
    .ux-icon-button::before {
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

    .ux-icon-button:active::before {
      width: 200%;
      height: 200%;
      opacity: 1;
      transition: 0s;
    }

    /* Press effect */
    .ux-icon-button:active {
      transform: scale(0.92);
    }

    /* Focus state */
    .ux-icon-button:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Icon styling */
    .ux-icon-button svg {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }

    /* ========================================
       Filled Variant
       Use with .ux-color-* classes
    ======================================== */

    .ux-icon-button--filled {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    .ux-icon-button--filled:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-primary-shade));
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-icon-button--outline {
      background-color: transparent;
      color: var(--ux-variant-color, var(--ux-text));
      border: 2px solid var(--ux-variant-border, var(--ux-border-color));
    }

    .ux-icon-button--outline:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-surface-secondary));
    }

    /* ========================================
       Soft/Tinted Variant
    ======================================== */

    .ux-icon-button--soft {
      background-color: var(--ux-variant-bg, var(--ux-surface-secondary));
      color: var(--ux-variant-color, var(--ux-text));
    }

    .ux-icon-button--soft:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-surface-tertiary));
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-icon-button--xs {
      --ux-icon-button-size: 28px;
      --ux-icon-button-icon-size: 14px;
    }

    .ux-icon-button--sm {
      --ux-icon-button-size: 36px;
      --ux-icon-button-icon-size: 16px;
    }

    .ux-icon-button--lg {
      --ux-icon-button-size: 52px;
      --ux-icon-button-icon-size: 24px;
    }

    .ux-icon-button--xl {
      --ux-icon-button-size: 64px;
      --ux-icon-button-icon-size: 28px;
    }

    /* ========================================
       Shapes
    ======================================== */

    .ux-icon-button--square {
      --ux-icon-button-radius: var(--ux-border-radius);
    }

    .ux-icon-button--rounded {
      --ux-icon-button-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       States
    ======================================== */

    .ux-icon-button--disabled,
    .ux-icon-button:disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    .ux-icon-button--loading {
      pointer-events: none;
    }

    .ux-icon-button--loading > *:not(.ux-icon-button__spinner) {
      opacity: 0;
    }

    .ux-icon-button__spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: ux-icon-button-spin 0.8s linear infinite;
    }

    @keyframes ux-icon-button-spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Active/Pressed state */
    .ux-icon-button--active,
    .ux-icon-button[aria-pressed="true"] {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    /* ========================================
       Badge (notification dot)
    ======================================== */

    .ux-icon-button--badge {
      position: relative;
    }

    .ux-icon-button--badge::after {
      content: '';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background-color: var(--ux-danger);
      border: 2px solid var(--ux-surface);
      border-radius: 50%;
    }

    .ux-icon-button--badge-count {
      position: relative;
    }

    .ux-icon-button__badge {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      font-size: 11px;
      font-weight: 600;
      line-height: 18px;
      text-align: center;
      background-color: var(--ux-danger);
      color: white;
      border-radius: 9px;
      transform: translate(25%, -25%);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-icon-button--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
      color: var(--ux-text);
    }

    .ux-icon-button--glass:hover {
      background: var(--ux-glass-bg-thick);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-icon-button:hover {
        background-color: var(--ux-variant-bg-hover, var(--ux-surface-secondary));
      }

      .ux-icon-button--badge::after {
        border-color: var(--ux-surface);
      }
    }

    .ux-dark .ux-icon-button:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-surface-secondary));
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-icon-button {
        transition: none;
      }

      .ux-icon-button:active {
        transform: none;
      }

      .ux-icon-button::before {
        display: none;
      }

      .ux-icon-button__spinner {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-icon-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-icon-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

})();
