/**
 * UX Mega Menu Component
 * Large dropdown menu with multiple columns and rich content
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Mega Menu
    ======================================== */

    .ux-mega-menu {
      position: relative;
      display: inline-flex;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Trigger
    ======================================== */

    .ux-mega-menu__trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color var(--ux-transition-fast);
    }

    .ux-mega-menu__trigger:hover {
      color: var(--ux-primary);
    }

    .ux-mega-menu__trigger-icon {
      width: 16px;
      height: 16px;
      transition: transform var(--ux-transition-fast);
    }

    .ux-mega-menu--open .ux-mega-menu__trigger-icon {
      transform: rotate(180deg);
    }

    /* ========================================
       Dropdown Panel
    ======================================== */

    .ux-mega-menu__panel {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 600px;
      max-width: calc(100vw - 2rem);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all var(--ux-transition-normal) var(--ux-ease-out);
      z-index: var(--ux-z-dropdown);
      overflow: hidden;
    }

    .ux-mega-menu--open .ux-mega-menu__panel {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Panel positions */
    .ux-mega-menu--right .ux-mega-menu__panel {
      left: auto;
      right: 0;
    }

    .ux-mega-menu--center .ux-mega-menu__panel {
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
    }

    .ux-mega-menu--center.ux-mega-menu--open .ux-mega-menu__panel {
      transform: translateX(-50%) translateY(0);
    }

    .ux-mega-menu--full .ux-mega-menu__panel {
      position: fixed;
      left: 1rem;
      right: 1rem;
      min-width: auto;
      max-width: none;
    }

    /* ========================================
       Panel Header
    ======================================== */

    .ux-mega-menu__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-mega-menu__header-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    /* ========================================
       Panel Content
    ======================================== */

    .ux-mega-menu__content {
      padding: var(--ux-space-md);
    }

    .ux-mega-menu__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--ux-space-lg);
    }

    /* Fixed columns */
    .ux-mega-menu__grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-mega-menu__grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-mega-menu__grid--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    /* ========================================
       Column / Section
    ======================================== */

    .ux-mega-menu__section {
      display: flex;
      flex-direction: column;
    }

    .ux-mega-menu__section-title {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: var(--ux-space-sm);
      padding: 0 var(--ux-space-sm);
    }

    .ux-mega-menu__section-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    }

    /* ========================================
       Menu Items
    ======================================== */

    .ux-mega-menu__item {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      text-decoration: none;
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-mega-menu__item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-mega-menu__item:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
    }

    .ux-mega-menu__item-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
    }

    .ux-mega-menu__item-content {
      flex: 1;
      min-width: 0;
    }

    .ux-mega-menu__item-title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin: 0 0 2px;
    }

    .ux-mega-menu__item-desc {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* Item with badge */
    .ux-mega-menu__item-badge {
      flex-shrink: 0;
      padding: 2px 6px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
      border-radius: var(--ux-radius-full);
    }

    /* Featured item */
    .ux-mega-menu__item--featured {
      background: var(--ux-surface-secondary);
      padding: var(--ux-space-md);
    }

    .ux-mega-menu__item--featured:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-mega-menu__item--featured .ux-mega-menu__item-icon {
      width: 32px;
      height: 32px;
      padding: var(--ux-space-xs);
      background: var(--ux-primary);
      color: white;
      border-radius: var(--ux-radius-md);
    }

    /* ========================================
       Panel Footer
    ======================================== */

    .ux-mega-menu__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-mega-menu__footer-link {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-mega-menu__footer-link:hover {
      text-decoration: underline;
    }

    .ux-mega-menu__footer-link svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Promo Card
    ======================================== */

    .ux-mega-menu__promo {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      background: linear-gradient(135deg, var(--ux-primary), var(--ux-primary-shade));
      border-radius: var(--ux-radius-md);
      color: white;
    }

    .ux-mega-menu__promo-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      margin: 0;
    }

    .ux-mega-menu__promo-desc {
      font-size: var(--ux-font-size-sm);
      opacity: 0.9;
      margin: 0;
    }

    .ux-mega-menu__promo-action {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: white;
      text-decoration: none;
      margin-top: var(--ux-space-xs);
    }

    .ux-mega-menu__promo-action:hover {
      text-decoration: underline;
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-mega-menu__panel {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        min-width: auto;
        max-width: none;
        max-height: 80dvh;
        border-radius: var(--ux-radius-lg) var(--ux-radius-lg) 0 0;
        transform: translateY(100%);
        overflow-y: auto;
      }

      .ux-mega-menu--open .ux-mega-menu__panel {
        transform: translateY(0);
      }

      .ux-mega-menu__grid {
        grid-template-columns: 1fr;
      }

      .ux-mega-menu__grid--2,
      .ux-mega-menu__grid--3,
      .ux-mega-menu__grid--4 {
        grid-template-columns: 1fr;
      }
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-mega-menu--glass .ux-mega-menu__panel {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-mega-menu--glass .ux-mega-menu__header,
    .ux-mega-menu--glass .ux-mega-menu__footer {
      background: transparent;
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-mega-menu__panel {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
    }

    .ux-dark .ux-mega-menu__panel {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-mega-menu__panel {
        transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
        transform: none !important;
      }

      .ux-mega-menu__trigger-icon {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-mega-menu-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-mega-menu-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const megaMenuData = (options = {}) => ({
    isOpen: false,
    closeOnClickOutside: options.closeOnClickOutside ?? true,
    closeOnEscape: options.closeOnEscape ?? true,
    openOnHover: options.openOnHover ?? false,
    hoverDelay: options.hoverDelay ?? 150,
    _hoverTimeout: null,

    init() {
      // Click outside handler
      if (this.closeOnClickOutside) {
        this._clickOutsideHandler = (e) => {
          if (this.isOpen && !this.$el.contains(e.target)) {
            this.close();
          }
        };
        document.addEventListener('click', this._clickOutsideHandler);
      }

      // Escape key handler
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }
    },

    destroy() {
      if (this._clickOutsideHandler) {
        document.removeEventListener('click', this._clickOutsideHandler);
      }
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
    },

    open() {
      this.isOpen = true;
      this.$dispatch('megamenu:open');
    },

    close() {
      this.isOpen = false;
      this.$dispatch('megamenu:close');
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    handleMouseEnter() {
      if (!this.openOnHover) return;
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.open(), this.hoverDelay);
    },

    handleMouseLeave() {
      if (!this.openOnHover) return;
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.close(), this.hoverDelay);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxMegaMenu', megaMenuData);
  }

})();
