/**
 * UX Drawer Component
 * Panel lateral deslizable (sidebar modal)
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Drawer Backdrop
    ======================================== */

    .ux-drawer-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal-backdrop);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 350ms var(--ux-ease-ios),
        visibility 350ms var(--ux-ease-ios);
    }

    .ux-drawer-backdrop--open {
      opacity: 1;
      visibility: visible;
      transition:
        opacity 300ms var(--ux-ease-ios),
        visibility 300ms var(--ux-ease-ios);
    }

    /* ========================================
       UX Drawer
    ======================================== */

    .ux-drawer {
      --ux-drawer-width: 320px;

      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--ux-drawer-width);
      max-width: calc(100vw - 56px);
      background-color: var(--ux-surface);
      display: flex;
      flex-direction: column;
      z-index: var(--ux-z-modal);
      transform: translateX(-100%);
      transition: transform 350ms var(--ux-ease-ios);
      will-change: transform;
      box-shadow: var(--ux-shadow-xl);
    }

    .ux-drawer-backdrop--open .ux-drawer {
      transform: translateX(0);
      transition: transform 400ms var(--ux-ease-ios);
    }

    /* ========================================
       Right Position
    ======================================== */

    .ux-drawer--right {
      left: auto;
      right: 0;
      transform: translateX(100%);
    }

    .ux-drawer-backdrop--open .ux-drawer--right {
      transform: translateX(0);
    }

    /* ========================================
       Drawer Header
    ======================================== */

    .ux-drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      min-height: 56px;
      padding-top: calc(var(--ux-space-md) + env(safe-area-inset-top));
    }

    .ux-drawer__header--no-border {
      border-bottom: none;
    }

    .ux-drawer__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-drawer__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      margin-top: 2px;
    }

    .ux-drawer__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      background-color: transparent;
      border: none;
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-drawer__close:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-drawer__close:active {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-drawer__close-icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Drawer Content
    ======================================== */

    .ux-drawer__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }

    .ux-drawer__content--padded {
      padding: var(--ux-space-lg);
    }

    /* ========================================
       Drawer Footer
    ======================================== */

    .ux-drawer__footer {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    .ux-drawer__footer--no-border {
      border-top: none;
    }

    .ux-drawer__footer--sticky {
      position: sticky;
      bottom: 0;
      background-color: var(--ux-surface);
    }

    /* ========================================
       Width Variants
    ======================================== */

    .ux-drawer--sm {
      --ux-drawer-width: 280px;
    }

    .ux-drawer--lg {
      --ux-drawer-width: 400px;
    }

    .ux-drawer--xl {
      --ux-drawer-width: 500px;
    }

    .ux-drawer--full {
      --ux-drawer-width: 100vw;
      max-width: 100vw;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-drawer--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-right: 0.5px solid var(--ux-glass-border);
    }

    .ux-drawer--glass.ux-drawer--right {
      border-right: none;
      border-left: 0.5px solid var(--ux-glass-border);
    }

    .ux-drawer--glass .ux-drawer__header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-drawer--glass .ux-drawer__footer {
      border-top-color: var(--ux-glass-border);
      background: transparent;
    }

    /* ========================================
       Push Mode (content shifts)
    ======================================== */

    .ux-drawer--push {
      box-shadow: none;
    }

    /* ========================================
       Persistent (no backdrop, stays open)
    ======================================== */

    .ux-drawer--persistent {
      position: relative;
      transform: translateX(0);
      box-shadow: none;
      z-index: auto;
    }

    .ux-drawer--persistent.ux-drawer--collapsed {
      transform: translateX(-100%);
      margin-left: calc(var(--ux-drawer-width) * -1);
    }

    .ux-drawer--persistent.ux-drawer--right.ux-drawer--collapsed {
      transform: translateX(100%);
      margin-right: calc(var(--ux-drawer-width) * -1);
      margin-left: 0;
    }

    /* ========================================
       Mini Variant (collapsed to icons)
    ======================================== */

    .ux-drawer--mini {
      --ux-drawer-mini-width: 64px;
    }

    .ux-drawer--mini.ux-drawer--collapsed {
      width: var(--ux-drawer-mini-width);
      transform: translateX(0);
      margin-left: 0;
    }

    .ux-drawer--mini.ux-drawer--collapsed .ux-drawer__header {
      padding: var(--ux-space-md) var(--ux-space-sm);
      justify-content: center;
    }

    .ux-drawer--mini.ux-drawer--collapsed .ux-drawer__title,
    .ux-drawer--mini.ux-drawer--collapsed .ux-drawer__subtitle {
      display: none;
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-drawer {
        max-width: calc(100vw - 48px);
      }

      .ux-drawer--lg,
      .ux-drawer--xl {
        --ux-drawer-width: calc(100vw - 48px);
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-drawer {
        background-color: var(--ux-surface);
      }

      .ux-drawer--glass {
        background: var(--ux-glass-bg);
      }
    }

    .ux-dark .ux-drawer {
      background-color: var(--ux-surface);
    }

    .ux-dark .ux-drawer--glass {
      background: var(--ux-glass-bg);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-drawer,
      .ux-drawer-backdrop {
        transition: none;
      }

      .ux-drawer-backdrop--open .ux-drawer {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-drawer-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-drawer-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ============================================================================
  // Vanilla JS Implementation
  // ============================================================================

  class UXDrawer {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      // Prevent double initialization
      if (this.el._uxDrawer) return this.el._uxDrawer;

      this.options = {
        closeOnBackdrop: true,
        closeOnEscape: true,
        lockScroll: true,
        position: 'left', // 'left' | 'right'
        ...options
      };

      this.isOpen = false;
      this._boundHandlers = {};

      this._init();
      this.el._uxDrawer = this;
    }

    _init() {
      // Find drawer panel
      this.drawer = this.el.querySelector('.ux-drawer');
      if (!this.drawer) {
        // If this element IS the drawer, find backdrop parent or create structure
        if (this.el.classList.contains('ux-drawer')) {
          this.drawer = this.el;
        }
      }

      // Set position class if needed
      if (this.options.position === 'right' && this.drawer) {
        this.drawer.classList.add('ux-drawer--right');
      }

      // Set ARIA attributes
      this.el.setAttribute('role', 'dialog');
      this.el.setAttribute('aria-modal', 'true');

      // Backdrop click handler
      if (this.options.closeOnBackdrop) {
        this._boundHandlers.backdropClick = (e) => {
          // Only close if clicking the backdrop itself (not the drawer content)
          if (e.target === this.el || e.target.classList.contains('ux-drawer-backdrop')) {
            this.close();
          }
        };
        this.el.addEventListener('click', this._boundHandlers.backdropClick);
      }

      // Escape key handler
      if (this.options.closeOnEscape) {
        this._boundHandlers.escapeKey = (e) => {
          if (this.isOpen && e.key === 'Escape') {
            this.close();
          }
        };
        document.addEventListener('keydown', this._boundHandlers.escapeKey);
      }

      // Close button handler
      const closeBtn = this.el.querySelector('.ux-drawer__close, [data-drawer-close]');
      if (closeBtn) {
        this._boundHandlers.closeClick = () => this.close();
        closeBtn.addEventListener('click', this._boundHandlers.closeClick);
        this._closeBtn = closeBtn;
      }

      // Trigger buttons
      this._setupTriggers();
    }

    _setupTriggers() {
      const id = this.el.id;
      if (!id) return;

      document.querySelectorAll(`[data-drawer-open="${id}"]`).forEach(trigger => {
        trigger.addEventListener('click', () => this.open());
      });

      document.querySelectorAll(`[data-drawer-toggle="${id}"]`).forEach(trigger => {
        trigger.addEventListener('click', () => this.toggle());
      });
    }

    open() {
      if (this.isOpen) return;

      this.isOpen = true;
      this.el.classList.add('ux-drawer-backdrop--open');

      // Lock scroll
      if (this.options.lockScroll && window.UX) {
        window.UX.lockScroll();
      }

      // Focus trap
      if (window.UX && this.drawer) {
        setTimeout(() => {
          window.UX.trapFocus(this.drawer);
        }, 10);
      }

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('drawer:open', { bubbles: true }));
    }

    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.el.classList.remove('ux-drawer-backdrop--open');

      // Unlock scroll
      if (this.options.lockScroll && window.UX) {
        window.UX.unlockScroll();
      }

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('drawer:close', { bubbles: true }));
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    destroy() {
      if (this.options.closeOnBackdrop && this._boundHandlers.backdropClick) {
        this.el.removeEventListener('click', this._boundHandlers.backdropClick);
      }

      if (this.options.closeOnEscape && this._boundHandlers.escapeKey) {
        document.removeEventListener('keydown', this._boundHandlers.escapeKey);
      }

      if (this._closeBtn && this._boundHandlers.closeClick) {
        this._closeBtn.removeEventListener('click', this._boundHandlers.closeClick);
      }

      // Ensure scroll is unlocked
      if (this.isOpen && this.options.lockScroll && window.UX) {
        window.UX.unlockScroll();
      }

      delete this.el._uxDrawer;
    }

    // Static methods
    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxDrawer || null;
    }

    static open(id) {
      const el = typeof id === 'string' ? document.getElementById(id) : id;
      const instance = UXDrawer.getInstance(el);
      if (instance) instance.open();
    }

    static close(id) {
      const el = typeof id === 'string' ? document.getElementById(id) : id;
      const instance = UXDrawer.getInstance(el);
      if (instance) instance.close();
    }

    static toggle(id) {
      const el = typeof id === 'string' ? document.getElementById(id) : id;
      const instance = UXDrawer.getInstance(el);
      if (instance) instance.toggle();
    }
  }

  // Auto-initialize drawers with data-ux-drawer attribute
  function initDrawers() {
    document.querySelectorAll('[data-ux-drawer]').forEach(el => {
      if (!el._uxDrawer) {
        const options = {};
        if (el.dataset.closeOnBackdrop !== undefined) options.closeOnBackdrop = el.dataset.closeOnBackdrop !== 'false';
        if (el.dataset.closeOnEscape !== undefined) options.closeOnEscape = el.dataset.closeOnEscape !== 'false';
        if (el.dataset.lockScroll !== undefined) options.lockScroll = el.dataset.lockScroll !== 'false';
        if (el.dataset.position !== undefined) options.position = el.dataset.position;
        new UXDrawer(el, options);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawers);
  } else {
    initDrawers();
  }

  // Watch for dynamically added drawers
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.matches && node.matches('[data-ux-drawer]') && !node._uxDrawer) {
            new UXDrawer(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-ux-drawer]').forEach(el => {
              if (!el._uxDrawer) new UXDrawer(el);
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Export
  window.UXDrawer = UXDrawer;

  // ============================================================================
  // Alpine.js Component (for backward compatibility)
  // ============================================================================

  // Alpine.js component
  const drawerData = (options = {}) => ({
    isOpen: options.isOpen ?? false,
    closeOnBackdrop: options.closeOnBackdrop ?? true,
    closeOnEscape: options.closeOnEscape ?? true,
    lockScroll: options.lockScroll ?? true,
    position: options.position ?? 'left', // 'left' | 'right'

    init() {
      // Escape key handler
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }

      // Watch isOpen changes
      this.$watch('isOpen', (value) => {
        if (value) {
          this._onOpen();
        } else {
          this._onClose();
        }
      });

      // Initial state
      if (this.isOpen) {
        this._onOpen();
      }
    },

    destroy() {
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
      this._onClose();
    },

    _onOpen() {
      if (this.lockScroll && window.UX) {
        window.UX.lockScroll();
      }

      // Focus trap
      this.$nextTick(() => {
        if (window.UX) {
          window.UX.trapFocus(this.$el.querySelector('.ux-drawer'));
        }
      });

      this.$dispatch('drawer:open');
    },

    _onClose() {
      if (this.lockScroll && window.UX) {
        window.UX.unlockScroll();
      }
      this.$dispatch('drawer:close');
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },

    onBackdropClick() {
      if (this.closeOnBackdrop) {
        this.close();
      }
    },

    get backdropClasses() {
      return {
        'ux-drawer-backdrop--open': this.isOpen
      };
    },

    get drawerClasses() {
      return {
        'ux-drawer--right': this.position === 'right'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDrawer', drawerData);
  }

})();
