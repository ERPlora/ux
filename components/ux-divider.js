/**
 * UX Divider Component
 * Líneas divisorias horizontales y verticales con variantes
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Divider
    ======================================== */

    .ux-divider {
      --ux-divider-color: var(--ux-border-color);
      --ux-divider-thickness: 1px;
      --ux-divider-spacing: var(--ux-space-md);

      display: flex;
      align-items: center;
      margin: var(--ux-divider-spacing) 0;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    .ux-divider::before,
    .ux-divider::after {
      content: '';
      flex: 1;
      height: var(--ux-divider-thickness);
      background-color: var(--ux-divider-color);
    }

    /* Sin contenido - línea simple */
    .ux-divider:empty::before {
      flex: 1;
    }

    .ux-divider:empty::after {
      display: none;
    }

    /* Con contenido - texto centrado */
    .ux-divider:not(:empty)::before {
      margin-right: var(--ux-space-md);
    }

    .ux-divider:not(:empty)::after {
      margin-left: var(--ux-space-md);
    }

    /* ========================================
       Vertical Divider
    ======================================== */

    .ux-divider--vertical {
      flex-direction: column;
      width: var(--ux-divider-thickness);
      height: auto;
      min-height: 1rem;
      margin: 0 var(--ux-divider-spacing);
      align-self: stretch;
    }

    .ux-divider--vertical::before,
    .ux-divider--vertical::after {
      width: var(--ux-divider-thickness);
      height: auto;
      flex: 1;
    }

    .ux-divider--vertical:not(:empty)::before {
      margin-right: 0;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-divider--vertical:not(:empty)::after {
      margin-left: 0;
      margin-top: var(--ux-space-sm);
    }

    /* ========================================
       Thickness Variants
    ======================================== */

    .ux-divider--thin {
      --ux-divider-thickness: 1px;
    }

    .ux-divider--medium {
      --ux-divider-thickness: 2px;
    }

    .ux-divider--thick {
      --ux-divider-thickness: 4px;
    }

    /* ========================================
       Spacing Variants
    ======================================== */

    .ux-divider--xs {
      --ux-divider-spacing: var(--ux-space-xs);
    }

    .ux-divider--sm {
      --ux-divider-spacing: var(--ux-space-sm);
    }

    .ux-divider--lg {
      --ux-divider-spacing: var(--ux-space-lg);
    }

    .ux-divider--xl {
      --ux-divider-spacing: var(--ux-space-xl);
    }

    .ux-divider--none {
      --ux-divider-spacing: 0;
    }

    /* ========================================
       Style Variants
    ======================================== */

    .ux-divider--dashed::before,
    .ux-divider--dashed::after {
      background: repeating-linear-gradient(
        90deg,
        var(--ux-divider-color) 0,
        var(--ux-divider-color) 6px,
        transparent 6px,
        transparent 12px
      );
    }

    .ux-divider--vertical.ux-divider--dashed::before,
    .ux-divider--vertical.ux-divider--dashed::after {
      background: repeating-linear-gradient(
        180deg,
        var(--ux-divider-color) 0,
        var(--ux-divider-color) 6px,
        transparent 6px,
        transparent 12px
      );
    }

    .ux-divider--dotted::before,
    .ux-divider--dotted::after {
      background: repeating-linear-gradient(
        90deg,
        var(--ux-divider-color) 0,
        var(--ux-divider-color) 2px,
        transparent 2px,
        transparent 6px
      );
    }

    .ux-divider--vertical.ux-divider--dotted::before,
    .ux-divider--vertical.ux-divider--dotted::after {
      background: repeating-linear-gradient(
        180deg,
        var(--ux-divider-color) 0,
        var(--ux-divider-color) 2px,
        transparent 2px,
        transparent 6px
      );
    }

    /* ========================================
       Gradient Variant
    ======================================== */

    .ux-divider--gradient::before {
      background: linear-gradient(90deg, transparent, var(--ux-divider-color));
    }

    .ux-divider--gradient::after {
      background: linear-gradient(90deg, var(--ux-divider-color), transparent);
    }

    .ux-divider--gradient:empty::before {
      background: linear-gradient(90deg, transparent, var(--ux-divider-color) 50%, transparent);
    }

    .ux-divider--vertical.ux-divider--gradient::before {
      background: linear-gradient(180deg, transparent, var(--ux-divider-color));
    }

    .ux-divider--vertical.ux-divider--gradient::after {
      background: linear-gradient(180deg, var(--ux-divider-color), transparent);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-divider--primary {
      --ux-divider-color: var(--ux-primary);
    }

    .ux-divider--secondary {
      --ux-divider-color: var(--ux-text-secondary);
    }

    .ux-divider--light {
      --ux-divider-color: var(--ux-gray-200);
    }

    .ux-divider--dark {
      --ux-divider-color: var(--ux-gray-600);
    }

    /* ========================================
       Text Position (with content)
    ======================================== */

    .ux-divider--left::before {
      flex: 0 0 2rem;
    }

    .ux-divider--right::after {
      flex: 0 0 2rem;
    }

    /* ========================================
       Inset (for lists)
    ======================================== */

    .ux-divider--inset {
      margin-left: var(--ux-space-lg);
    }

    .ux-divider--inset-end {
      margin-right: var(--ux-space-lg);
    }

    .ux-divider--inset-both {
      margin-left: var(--ux-space-lg);
      margin-right: var(--ux-space-lg);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-divider {
        --ux-divider-color: var(--ux-border-color);
      }

      .ux-divider--light {
        --ux-divider-color: var(--ux-gray-700);
      }

      .ux-divider--dark {
        --ux-divider-color: var(--ux-gray-400);
      }
    }

    .ux-dark .ux-divider {
      --ux-divider-color: var(--ux-border-color);
    }

    .ux-dark .ux-divider--light {
      --ux-divider-color: var(--ux-gray-700);
    }

    .ux-dark .ux-divider--dark {
      --ux-divider-color: var(--ux-gray-400);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-divider {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-divider-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-divider-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

})();
