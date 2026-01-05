/**
 * UX Badge Component
 * Badges para mostrar contadores y estados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Badge
    ======================================== */

    .ux-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      border-radius: 10px;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-badge--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-badge--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-badge--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-badge--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-badge--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-badge--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-badge--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-badge--medium {
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
    }

    .ux-badge--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-badge--xs {
      min-width: 14px;
      height: 14px;
      padding: 0 3px;
      font-size: 8px;
      border-radius: 7px;
    }

    .ux-badge--sm {
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 9px;
      border-radius: 8px;
    }

    /* Default is md (20px) */

    .ux-badge--lg {
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      font-size: var(--ux-font-size-sm);
      border-radius: 12px;
    }

    .ux-badge--xl {
      min-width: 28px;
      height: 28px;
      padding: 0 10px;
      font-size: var(--ux-font-size-md);
      border-radius: 14px;
    }

    .ux-badge--xxl {
      min-width: 32px;
      height: 32px;
      padding: 0 12px;
      font-size: var(--ux-font-size-lg);
      border-radius: 16px;
    }

    /* ========================================
       Dot (no text)
    ======================================== */

    .ux-badge--dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      font-size: 0;
    }

    .ux-badge--dot.ux-badge--sm {
      min-width: 6px;
      width: 6px;
      height: 6px;
    }

    .ux-badge--dot.ux-badge--lg {
      min-width: 10px;
      width: 10px;
      height: 10px;
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-badge--outline {
      background-color: transparent;
      border: 1px solid currentColor;
    }

    .ux-badge--outline.ux-badge--primary {
      color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-badge--outline.ux-badge--secondary {
      color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-badge--outline.ux-badge--success {
      color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-badge--outline.ux-badge--warning {
      color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-badge--outline.ux-badge--danger {
      color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-badge--outline.ux-badge--dark {
      color: var(--ux-dark);
      border-color: var(--ux-dark);
    }

    /* ========================================
       Soft Variant (tinted background)
    ======================================== */

    .ux-badge--soft.ux-badge--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary-shade);
    }

    .ux-badge--soft.ux-badge--secondary {
      background-color: rgba(var(--ux-secondary-rgb), 0.15);
      color: var(--ux-secondary-shade);
    }

    .ux-badge--soft.ux-badge--tertiary {
      background-color: rgba(var(--ux-tertiary-rgb), 0.15);
      color: var(--ux-tertiary-shade);
    }

    .ux-badge--soft.ux-badge--success {
      background-color: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success-shade);
    }

    .ux-badge--soft.ux-badge--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-badge--soft.ux-badge--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger-shade);
    }

    .ux-badge--soft.ux-badge--dark {
      background-color: rgba(var(--ux-dark-rgb), 0.1);
      color: var(--ux-dark);
    }

    /* ========================================
       Badge Container (for positioning)
    ======================================== */

    .ux-badge-container {
      position: relative;
      display: inline-flex;
    }

    .ux-badge-container .ux-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      z-index: 1;
    }

    .ux-badge-container .ux-badge--dot {
      top: 0;
      right: 0;
    }

    /* Position variants */
    .ux-badge-container--top-left .ux-badge {
      top: -4px;
      right: auto;
      left: -4px;
    }

    .ux-badge-container--bottom-right .ux-badge {
      top: auto;
      bottom: -4px;
      right: -4px;
    }

    .ux-badge-container--bottom-left .ux-badge {
      top: auto;
      bottom: -4px;
      right: auto;
      left: -4px;
    }

    /* ========================================
       Animation (for updates)
    ======================================== */

    .ux-badge--pulse {
      animation: ux-badge-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-badge-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    .ux-badge--bounce {
      animation: ux-badge-bounce 0.5s ease;
    }

    @keyframes ux-badge-bounce {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-badge-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-badge-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
