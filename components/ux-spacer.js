/**
 * UX Spacer Component
 * Espaciadores flexibles y fijos para layouts
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Spacer
    ======================================== */

    .ux-spacer {
      display: block;
      flex-shrink: 0;
    }

    /* ========================================
       Flex Spacer (expande para llenar)
    ======================================== */

    .ux-spacer--flex {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
    }

    /* ========================================
       Fixed Sizes - Vertical (height)
    ======================================== */

    .ux-spacer--xs {
      height: var(--ux-space-xs);
    }

    .ux-spacer--sm {
      height: var(--ux-space-sm);
    }

    .ux-spacer--md {
      height: var(--ux-space-md);
    }

    .ux-spacer--lg {
      height: var(--ux-space-lg);
    }

    .ux-spacer--xl {
      height: var(--ux-space-xl);
    }

    .ux-spacer--2xl {
      height: var(--ux-space-2xl);
    }

    .ux-spacer--3xl {
      height: var(--ux-space-3xl);
    }

    /* ========================================
       Fixed Sizes - Horizontal (width)
       Use in flex row containers
    ======================================== */

    .ux-spacer--h-xs {
      width: var(--ux-space-xs);
      height: auto;
    }

    .ux-spacer--h-sm {
      width: var(--ux-space-sm);
      height: auto;
    }

    .ux-spacer--h-md {
      width: var(--ux-space-md);
      height: auto;
    }

    .ux-spacer--h-lg {
      width: var(--ux-space-lg);
      height: auto;
    }

    .ux-spacer--h-xl {
      width: var(--ux-space-xl);
      height: auto;
    }

    .ux-spacer--h-2xl {
      width: var(--ux-space-2xl);
      height: auto;
    }

    .ux-spacer--h-3xl {
      width: var(--ux-space-3xl);
      height: auto;
    }

    /* ========================================
       Responsive - Hide on breakpoints
    ======================================== */

    @media (max-width: 767px) {
      .ux-spacer--hide-mobile {
        display: none;
      }

      .ux-spacer--sm-mobile {
        height: var(--ux-space-sm);
      }

      .ux-spacer--h-sm-mobile {
        width: var(--ux-space-sm);
      }
    }

    @media (min-width: 768px) {
      .ux-spacer--hide-desktop {
        display: none;
      }
    }

    /* ========================================
       Safe Area Spacers (for notch/home bar)
    ======================================== */

    .ux-spacer--safe-top {
      height: env(safe-area-inset-top, 0);
    }

    .ux-spacer--safe-bottom {
      height: env(safe-area-inset-bottom, 0);
    }

    .ux-spacer--safe-left {
      width: env(safe-area-inset-left, 0);
      height: auto;
    }

    .ux-spacer--safe-right {
      width: env(safe-area-inset-right, 0);
      height: auto;
    }

    /* ========================================
       Toolbar/Navbar Height Spacers
    ======================================== */

    .ux-spacer--navbar {
      height: var(--ux-navbar-height, 56px);
    }

    .ux-spacer--toolbar {
      height: var(--ux-toolbar-height, 44px);
    }

    .ux-spacer--tabbar {
      height: var(--ux-tabbar-height, 50px);
    }

    /* Combined with safe area */
    .ux-spacer--navbar-safe {
      height: calc(var(--ux-navbar-height, 56px) + env(safe-area-inset-top, 0));
    }

    .ux-spacer--tabbar-safe {
      height: calc(var(--ux-tabbar-height, 50px) + env(safe-area-inset-bottom, 0));
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-spacer-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-spacer-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

})();
