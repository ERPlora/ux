/**
 * UX App Icon Component
 * iOS-style app icons for module/app grids
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX App Icon
       iOS-style app icons
    ======================================== */

    .ux-app-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: var(--ux-border-radius-lg);
      background-color: var(--ux-primary);
      color: white;
      flex-shrink: 0;
      transition: transform var(--ux-transition-fast) var(--ux-ease),
                  box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-app-icon:hover {
      transform: scale(1.05);
    }

    .ux-app-icon:active {
      transform: scale(0.95);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-app-icon--sm {
      width: 44px;
      height: 44px;
      border-radius: var(--ux-border-radius);
    }

    .ux-app-icon--lg {
      width: 64px;
      height: 64px;
      border-radius: calc(var(--ux-border-radius-lg) * 1.2);
    }

    .ux-app-icon--xl {
      width: 80px;
      height: 80px;
      border-radius: calc(var(--ux-border-radius-lg) * 1.5);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-app-icon--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-app-icon--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-app-icon--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-app-icon--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-app-icon--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-app-icon--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-app-icon--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-app-icon--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    .ux-app-icon--medium {
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
    }

    /* ========================================
       Special Variants
    ======================================== */

    /* Dashed outline (for "Add" / "Get More" button) */
    .ux-app-icon--dashed {
      background-color: transparent;
      border: 2px dashed var(--ux-border);
      color: var(--ux-text-secondary);
    }

    .ux-app-icon--dashed:hover {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    /* Outline variant */
    .ux-app-icon--outline {
      background-color: transparent;
      border: 2px solid var(--ux-border);
      color: var(--ux-text);
    }

    /* Glass variant */
    .ux-app-icon--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border: 1px solid var(--ux-glass-border);
    }

    /* ========================================
       App Icon Badge (notification count)
    ======================================== */

    .ux-app-icon__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       App Grid
       Grid layout for app icons
    ======================================== */

    .ux-app-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
      gap: var(--ux-space-lg);
      justify-items: center;
    }

    /* Compact grid (smaller icons, tighter spacing) */
    .ux-app-grid--compact {
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: var(--ux-space-md);
    }

    /* Fixed columns */
    .ux-app-grid--cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .ux-app-grid--cols-5 {
      grid-template-columns: repeat(5, 1fr);
    }

    .ux-app-grid--cols-6 {
      grid-template-columns: repeat(6, 1fr);
    }

    /* Responsive breakpoints */
    @media (min-width: 576px) {
      .ux-app-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }
    }

    @media (min-width: 768px) {
      .ux-app-grid {
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      }
    }

    @media (min-width: 992px) {
      .ux-app-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-app-icon-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-app-icon-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
