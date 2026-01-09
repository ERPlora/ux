/**
 * UX Master-Detail Component
 * Two-panel layout with master list and detail view
 * Ideal for admin interfaces like roles, users, settings
 *
 * Features:
 * - Desktop: Side-by-side panels
 * - Mobile: Stacked panels with collapsible master
 * - Customizable widths and breakpoints
 *
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       Master-Detail Layout
       Panel izquierdo (lista) + panel derecho (detalle)
       Ideal para interfaces de administración
    ======================================== */

    :root {
      --ux-master-detail-master-width: 280px;
      --ux-master-detail-master-min-width: 240px;
      --ux-master-detail-master-max-width: 400px;
      --ux-master-detail-breakpoint: 768px;
      --ux-master-detail-mobile-master-height: 40vh;
    }

    .ux-master-detail {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
      background: var(--ux-background);
    }

    /* Full height variant (for pages without footer) */
    .ux-master-detail--full-height {
      height: 100dvh;
    }

    /* With navbar offset */
    .ux-master-detail--has-navbar {
      height: calc(100dvh - var(--ux-navbar-height, 56px));
    }

    /* ========================================
       Master Panel (Left)
    ======================================== */

    .ux-master-detail__master {
      width: var(--ux-master-detail-master-width);
      min-width: var(--ux-master-detail-master-min-width);
      max-width: var(--ux-master-detail-master-max-width);
      flex-shrink: 0;
      border-right: 1px solid var(--ux-border-color);
      display: flex;
      flex-direction: column;
      background: var(--ux-surface);
      overflow: hidden;
    }

    /* Master header (search, title, actions) */
    .ux-master-detail__master-header {
      flex-shrink: 0;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* Master content (scrollable list) */
    .ux-master-detail__master-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    /* Master footer (optional actions) */
    .ux-master-detail__master-footer {
      flex-shrink: 0;
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Detail Panel (Right)
    ======================================== */

    .ux-master-detail__detail {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      background: var(--ux-background-secondary, var(--ux-surface-secondary));
      overflow: hidden;
    }

    /* Detail header */
    .ux-master-detail__detail-header {
      flex-shrink: 0;
      padding: var(--ux-space-md);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* Detail content (scrollable) */
    .ux-master-detail__detail-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    /* Detail footer */
    .ux-master-detail__detail-footer {
      flex-shrink: 0;
      padding: var(--ux-space-md);
      background: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-master-detail__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: var(--ux-space-2xl);
      text-align: center;
    }

    .ux-master-detail__empty-icon {
      color: var(--ux-text-tertiary);
      margin-bottom: var(--ux-space-md);
    }

    .ux-master-detail__empty-title {
      font-size: var(--ux-text-xl);
      font-weight: var(--ux-font-medium, 500);
      margin: 0 0 var(--ux-space-sm);
      color: var(--ux-text);
    }

    .ux-master-detail__empty-text {
      font-size: var(--ux-text-base);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Width Variants
    ======================================== */

    .ux-master-detail--narrow-master {
      --ux-master-detail-master-width: 240px;
      --ux-master-detail-master-min-width: 200px;
    }

    .ux-master-detail--wide-master {
      --ux-master-detail-master-width: 350px;
      --ux-master-detail-master-min-width: 300px;
      --ux-master-detail-master-max-width: 500px;
    }

    /* ========================================
       Mobile/Tablet Responsive (< 768px)
    ======================================== */

    @media (max-width: 767px) {
      .ux-master-detail {
        flex-direction: column;
      }

      .ux-master-detail__master {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        max-height: var(--ux-master-detail-mobile-master-height);
        border-right: none;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-master-detail__detail {
        flex: 1;
        min-height: 0;
      }

      /* Collapsible master on mobile */
      .ux-master-detail--collapsible .ux-master-detail__master {
        max-height: 0;
        border-bottom: none;
        transition: max-height var(--ux-transition-normal) var(--ux-ease-ios);
      }

      .ux-master-detail--collapsible.ux-master-detail--master-open .ux-master-detail__master {
        max-height: var(--ux-master-detail-mobile-master-height);
        border-bottom: 1px solid var(--ux-border-color);
      }

      /* Hide detail content when master is fully open on mobile */
      .ux-master-detail--mobile-master-only .ux-master-detail__detail {
        display: none;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-master-detail__master {
        background: var(--ux-surface);
      }
      .ux-master-detail__detail {
        background: var(--ux-background-secondary, var(--ux-surface-secondary));
      }
    }

    .ux-dark .ux-master-detail__master {
      background: var(--ux-surface);
    }

    .ux-dark .ux-master-detail__detail {
      background: var(--ux-background-secondary, var(--ux-surface-secondary));
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-master-detail--glass .ux-master-detail__master {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-right-color: var(--ux-glass-border);
    }

    .ux-master-detail--glass .ux-master-detail__detail {
      background: var(--ux-glass-bg-thin);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-master-detail--collapsible .ux-master-detail__master {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-master-detail-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-master-detail-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component (optional, for interactive features)
  const masterDetailComponent = (config = {}) => ({
    selectedId: config.initialSelection ?? null,
    masterOpen: config.masterOpenByDefault ?? false,
    _isDesktop: false,

    init() {
      this._checkScreenSize();
      this._resizeHandler = () => this._checkScreenSize();
      window.addEventListener('resize', this._resizeHandler);
    },

    destroy() {
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
      }
    },

    _checkScreenSize() {
      this._isDesktop = window.innerWidth >= 768;
      // Auto-close master when switching to desktop
      if (this._isDesktop && this.masterOpen) {
        this.masterOpen = false;
      }
    },

    select(id) {
      this.selectedId = id;
      // Close master on mobile after selection
      if (!this._isDesktop) {
        this.masterOpen = false;
      }
      this.$dispatch('masterdetail:select', { id });
    },

    toggleMaster() {
      this.masterOpen = !this.masterOpen;
      this.$dispatch('masterdetail:toggle', { open: this.masterOpen });
    },

    openMaster() {
      this.masterOpen = true;
      this.$dispatch('masterdetail:open');
    },

    closeMaster() {
      this.masterOpen = false;
      this.$dispatch('masterdetail:close');
    },

    isSelected(id) {
      return this.selectedId === id;
    },

    get containerClasses() {
      return {
        'ux-master-detail--master-open': this.masterOpen
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxMasterDetail', masterDetailComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxMasterDetail', masterDetailComponent);
    });
  }
})();
