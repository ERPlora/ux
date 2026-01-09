/**
 * UX Split Button Component
 * Botón dividido con acción principal y dropdown
 * @requires ux-core.js
 * @requires ux-button.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Split Button
    ======================================== */

    .ux-split-button {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .ux-split-button__main {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }

    .ux-split-button__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-split-button-toggle-width, 36px);
      height: var(--ux-button-height);
      padding: 0;
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
      border: 2px solid var(--ux-variant-border, transparent);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      border-top-right-radius: var(--ux-button-border-radius);
      border-bottom-right-radius: var(--ux-button-border-radius);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      cursor: pointer;
      transition: var(--ux-transition-colors);
    }

    .ux-split-button__toggle:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-primary-shade));
    }

    .ux-split-button__toggle:active {
      transform: scale(0.97);
    }

    .ux-split-button__toggle:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
      z-index: 1;
    }

    .ux-split-button__toggle-icon {
      width: 16px;
      height: 16px;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-split-button--open .ux-split-button__toggle-icon {
      transform: rotate(180deg);
    }

    /* ========================================
       Dropdown Menu
    ======================================== */

    .ux-split-button__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: 160px;
      padding: var(--ux-space-xs) 0;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      z-index: var(--ux-z-dropdown);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast);
    }

    .ux-split-button--open .ux-split-button__dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Dropdown position variants */
    .ux-split-button--dropdown-left .ux-split-button__dropdown {
      right: auto;
      left: 0;
    }

    .ux-split-button--dropdown-up .ux-split-button__dropdown {
      top: auto;
      bottom: calc(100% + 4px);
      transform: translateY(8px);
    }

    .ux-split-button--dropdown-up.ux-split-button--open .ux-split-button__dropdown {
      transform: translateY(0);
    }

    /* ========================================
       Dropdown Items
    ======================================== */

    .ux-split-button__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      text-align: left;
      color: var(--ux-text);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-split-button__item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-split-button__item:active {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-split-button__item:focus-visible {
      background-color: var(--ux-surface-secondary);
      outline: none;
    }

    .ux-split-button__item-icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }

    .ux-split-button__item--danger {
      color: var(--ux-danger);
    }

    .ux-split-button__item--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-split-button__divider {
      height: 1px;
      margin: var(--ux-space-xs) 0;
      background-color: var(--ux-border-color);
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-split-button--outline .ux-split-button__main {
      background-color: transparent;
      color: var(--ux-variant-color, var(--ux-primary));
      border: 2px solid var(--ux-variant-border, var(--ux-primary));
      border-right: none;
    }

    .ux-split-button--outline .ux-split-button__toggle {
      background-color: transparent;
      color: var(--ux-variant-color, var(--ux-primary));
      border: 2px solid var(--ux-variant-border, var(--ux-primary));
      border-left: 1px solid var(--ux-variant-border, var(--ux-primary));
    }

    .ux-split-button--outline .ux-split-button__toggle:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-split-button--sm .ux-split-button__main {
      height: var(--ux-button-height-sm);
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-split-button--sm .ux-split-button__toggle {
      width: 30px;
      height: var(--ux-button-height-sm);
    }

    .ux-split-button--sm .ux-split-button__toggle-icon {
      width: 14px;
      height: 14px;
    }

    .ux-split-button--lg .ux-split-button__main {
      height: var(--ux-button-height-lg);
      padding: 0 var(--ux-space-lg);
      font-size: var(--ux-font-size-lg);
    }

    .ux-split-button--lg .ux-split-button__toggle {
      width: 44px;
      height: var(--ux-button-height-lg);
    }

    .ux-split-button--lg .ux-split-button__toggle-icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Block (full width)
    ======================================== */

    .ux-split-button--block {
      display: flex;
      width: 100%;
    }

    .ux-split-button--block .ux-split-button__main {
      flex: 1;
    }

    .ux-split-button--block .ux-split-button__dropdown {
      width: 100%;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-split-button--disabled .ux-split-button__main,
    .ux-split-button--disabled .ux-split-button__toggle {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-split-button__dropdown {
        background-color: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-split-button__toggle {
        border-left-color: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark .ux-split-button__dropdown {
      background-color: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-split-button__dropdown {
        transition: opacity var(--ux-transition-fast);
        transform: none;
      }

      .ux-split-button__toggle-icon {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-split-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-split-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const splitButtonData = (options = {}) => ({
    isOpen: false,
    closeOnSelect: options.closeOnSelect ?? true,

    init() {
      // Close on click outside
      this._clickOutsideHandler = (e) => {
        if (!this.$el.contains(e.target) && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('click', this._clickOutsideHandler);

      // Close on escape
      this._escapeHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
          this.$el.querySelector('.ux-split-button__toggle')?.focus();
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    },

    destroy() {
      document.removeEventListener('click', this._clickOutsideHandler);
      document.removeEventListener('keydown', this._escapeHandler);
    },

    toggle() {
      this.isOpen = !this.isOpen;
      this.$dispatch('splitbutton:toggle', { isOpen: this.isOpen });
    },

    open() {
      this.isOpen = true;
      this.$dispatch('splitbutton:open');
    },

    close() {
      this.isOpen = false;
      this.$dispatch('splitbutton:close');
    },

    selectItem(value) {
      this.$dispatch('splitbutton:select', { value });
      if (this.closeOnSelect) {
        this.close();
      }
    },

    get containerClasses() {
      return {
        'ux-split-button--open': this.isOpen
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSplitButton', splitButtonData);
  }

})();
