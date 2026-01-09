/**
 * UX Status Indicator Component
 * Indicador de estado con dot + label
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Status Indicator
    ======================================== */

    .ux-status-indicator {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
    }

    /* ========================================
       Status Dot
    ======================================== */

    .ux-status-indicator__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ux-status-color, var(--ux-gray-400));
      flex-shrink: 0;
    }

    /* ========================================
       Status Colors
    ======================================== */

    .ux-status-indicator--success {
      --ux-status-color: var(--ux-success);
    }

    .ux-status-indicator--warning {
      --ux-status-color: var(--ux-warning);
    }

    .ux-status-indicator--danger,
    .ux-status-indicator--error {
      --ux-status-color: var(--ux-danger);
    }

    .ux-status-indicator--info {
      --ux-status-color: var(--ux-primary);
    }

    .ux-status-indicator--neutral {
      --ux-status-color: var(--ux-gray-400);
    }

    .ux-status-indicator--offline {
      --ux-status-color: var(--ux-gray-400);
    }

    .ux-status-indicator--online {
      --ux-status-color: var(--ux-success);
    }

    .ux-status-indicator--busy {
      --ux-status-color: var(--ux-danger);
    }

    .ux-status-indicator--away {
      --ux-status-color: var(--ux-warning);
    }

    .ux-status-indicator--pending {
      --ux-status-color: var(--ux-warning);
    }

    .ux-status-indicator--active {
      --ux-status-color: var(--ux-success);
    }

    .ux-status-indicator--inactive {
      --ux-status-color: var(--ux-gray-400);
    }

    /* ========================================
       Pulse Animation
    ======================================== */

    .ux-status-indicator--pulse .ux-status-indicator__dot {
      position: relative;
    }

    .ux-status-indicator--pulse .ux-status-indicator__dot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: inherit;
      animation: ux-status-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-status-pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(2);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-status-indicator--sm {
      font-size: var(--ux-font-size-xs);
    }

    .ux-status-indicator--sm .ux-status-indicator__dot {
      width: 6px;
      height: 6px;
    }

    .ux-status-indicator--lg {
      font-size: var(--ux-font-size-md);
    }

    .ux-status-indicator--lg .ux-status-indicator__dot {
      width: 10px;
      height: 10px;
    }

    /* ========================================
       Dot Only (no label)
    ======================================== */

    .ux-status-indicator--dot-only .ux-status-indicator__label {
      display: none;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled background style */
    .ux-status-indicator--filled {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: rgba(var(--ux-status-color-rgb, 107, 114, 128), 0.1);
      border-radius: var(--ux-border-radius-full);
    }

    .ux-status-indicator--filled.ux-status-indicator--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
      color: var(--ux-success);
    }

    .ux-status-indicator--filled.ux-status-indicator--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
      color: var(--ux-warning-shade);
    }

    .ux-status-indicator--filled.ux-status-indicator--danger,
    .ux-status-indicator--filled.ux-status-indicator--error {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-status-indicator--filled.ux-status-indicator--info {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    /* Outline style */
    .ux-status-indicator--outline {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-status-color, var(--ux-border-color));
      border-radius: var(--ux-border-radius-full);
    }

    .ux-status-indicator--outline.ux-status-indicator--success {
      border-color: var(--ux-success);
      color: var(--ux-success);
    }

    .ux-status-indicator--outline.ux-status-indicator--warning {
      border-color: var(--ux-warning);
      color: var(--ux-warning-shade);
    }

    .ux-status-indicator--outline.ux-status-indicator--danger,
    .ux-status-indicator--outline.ux-status-indicator--error {
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    .ux-status-indicator--outline.ux-status-indicator--info {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    /* ========================================
       With Ring (for avatars)
    ======================================== */

    .ux-status-indicator--ring .ux-status-indicator__dot {
      box-shadow: 0 0 0 2px var(--ux-surface);
    }

    /* ========================================
       Responsive Text
    ======================================== */

    @media (max-width: 767px) {
      .ux-status-indicator--hide-label-mobile .ux-status-indicator__label {
        display: none;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-status-indicator--ring .ux-status-indicator__dot {
        box-shadow: 0 0 0 2px var(--ux-surface);
      }

      .ux-status-indicator--filled.ux-status-indicator--warning {
        color: var(--ux-warning);
      }

      .ux-status-indicator--outline.ux-status-indicator--warning {
        color: var(--ux-warning);
      }
    }

    .ux-dark .ux-status-indicator--ring .ux-status-indicator__dot {
      box-shadow: 0 0 0 2px var(--ux-surface);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-status-indicator--pulse .ux-status-indicator__dot::before {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-status-indicator-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-status-indicator-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

})();
