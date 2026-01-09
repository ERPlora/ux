(function() {
  'use strict';

  const styles = `
    /* ========================================
       Split Pane Right
       Panel lateral derecho con toggle
       - Desktop: visible, puede ocultarse
       - Mobile: overlay desde la derecha
    ======================================== */

    .ux-split-pane-right {
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    /* Main content area */
    .ux-split-pane-right__main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    /* Side panel (right) */
    .ux-split-pane-right__side {
      width: var(--ux-split-pane-right-width, 320px);
      max-width: 85vw;
      flex-shrink: 0;
      height: 100%;
      background: var(--ux-surface);
      border-left: 1px solid var(--ux-border-color);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: transform var(--ux-transition-normal) var(--ux-ease-ios),
                  width var(--ux-transition-normal) var(--ux-ease-ios),
                  opacity var(--ux-transition-normal) var(--ux-ease-ios);
    }

    /* Backdrop for mobile */
    .ux-split-pane-right__backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: var(--ux-backdrop-color, rgba(0, 0, 0, 0.4));
      z-index: var(--ux-z-modal-backdrop);
      opacity: 0;
      transition: opacity var(--ux-transition-normal) var(--ux-ease-ios);
      -webkit-tap-highlight-color: transparent;
    }

    /* ========================================
       Desktop behavior (>= 992px)
    ======================================== */

    @media (min-width: 992px) {
      /* Panel visible por defecto */
      .ux-split-pane-right__side {
        position: relative;
        transform: translateX(0);
      }

      /* Panel oculto en desktop */
      .ux-split-pane-right--collapsed .ux-split-pane-right__side {
        width: 0;
        border-left: none;
        opacity: 0;
        overflow: hidden;
      }

      /* Ocultar backdrop en desktop */
      .ux-split-pane-right__backdrop {
        display: none !important;
      }
    }

    /* ========================================
       Mobile behavior (< 992px)
    ======================================== */

    @media (max-width: 991px) {
      /* Panel como overlay */
      .ux-split-pane-right__side {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: var(--ux-z-modal);
        transform: translateX(100%);
        box-shadow: var(--ux-shadow-xl);
      }

      /* Panel visible en mobile */
      .ux-split-pane-right--open .ux-split-pane-right__side {
        transform: translateX(0);
      }

      /* Backdrop visible en mobile */
      .ux-split-pane-right__backdrop {
        display: block;
        pointer-events: none;
        opacity: 0;
      }

      .ux-split-pane-right--open .ux-split-pane-right__backdrop {
        pointer-events: auto;
        opacity: 1;
      }
    }

    /* ========================================
       Toggle button
    ======================================== */

    .ux-split-pane-right__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-split-pane-right__toggle svg {
      width: 24px;
      height: 24px;
    }

    /* Hide toggle in desktop when panel is visible */
    @media (min-width: 992px) {
      .ux-split-pane-right:not(.ux-split-pane-right--collapsed) .ux-split-pane-right__toggle--mobile-only {
        display: none;
      }
    }

    /* ========================================
       Glass variant
    ======================================== */

    .ux-split-pane-right__side--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-left-color: var(--ux-glass-border);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-split-pane-right-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-split-pane-right-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const splitPaneRightComponent = (config = {}) => ({
    isOpen: false,
    isCollapsed: config.collapsed ?? false,
    _isLargeScreen: false,

    init() {
      // Check screen size
      this._checkScreenSize();
      this._resizeHandler = () => this._checkScreenSize();
      window.addEventListener('resize', this._resizeHandler);

      // Close on escape
      this._escapeHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen && !this._isLargeScreen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    },

    destroy() {
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
      }
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
    },

    _checkScreenSize() {
      const wasLarge = this._isLargeScreen;
      this._isLargeScreen = window.innerWidth >= 992;

      // Close overlay when switching to desktop
      if (this._isLargeScreen && !wasLarge && this.isOpen) {
        this.isOpen = false;
        window.UX?.unlockScroll();
      }
    },

    open() {
      this.isOpen = true;
      if (!this._isLargeScreen) {
        window.UX?.lockScroll();
      }
      this.$dispatch('splitpaneright:open');
    },

    close() {
      this.isOpen = false;
      window.UX?.unlockScroll();
      this.$dispatch('splitpaneright:close');
    },

    toggle() {
      if (this._isLargeScreen) {
        // In desktop, toggle collapsed state
        this.isCollapsed = !this.isCollapsed;
        this.$dispatch('splitpaneright:toggle', { collapsed: this.isCollapsed });
      } else {
        // In mobile, toggle overlay
        this.isOpen ? this.close() : this.open();
      }
    },

    // Show panel (for desktop)
    show() {
      this.isCollapsed = false;
      this.$dispatch('splitpaneright:show');
    },

    // Hide panel (for desktop)
    hide() {
      this.isCollapsed = true;
      this.$dispatch('splitpaneright:hide');
    },

    get containerClasses() {
      return {
        'ux-split-pane-right--open': this.isOpen,
        'ux-split-pane-right--collapsed': this.isCollapsed
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxSplitPaneRight', splitPaneRightComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSplitPaneRight', splitPaneRightComponent);
    });
  }
})();
