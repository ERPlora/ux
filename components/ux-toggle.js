/**
 * UX Toggle Component
 * Toggle switches estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Toggle
    ======================================== */

    .ux-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-toggle input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .ux-toggle__track {
      position: relative;
      width: var(--ux-toggle-width);
      height: var(--ux-toggle-height);
      background-color: var(--ux-light-shade);
      border-radius: var(--ux-toggle-border-radius);
      transition:
        background-color var(--ux-transition-base) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-toggle__thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: var(--ux-toggle-handle-size);
      height: var(--ux-toggle-handle-size);
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition:
        transform var(--ux-transition-base) var(--ux-ease-spring),
        width var(--ux-transition-fast) var(--ux-ease);
    }

    /* Checked State */
    .ux-toggle input[type="checkbox"]:checked + .ux-toggle__track {
      background-color: var(--ux-toggle-color, var(--ux-success));
    }

    .ux-toggle input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(20px);
    }

    /* Active State (press effect) */
    .ux-toggle input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb,
    .ux-toggle:active .ux-toggle__thumb {
      width: 31px;
    }

    .ux-toggle input[type="checkbox"]:checked:active + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(16px);
    }

    /* Focus State */
    .ux-toggle input[type="checkbox"]:focus-visible + .ux-toggle__track {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-toggle--disabled,
    .ux-toggle input[type="checkbox"]:disabled + .ux-toggle__track {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-toggle input[type="checkbox"]:disabled + .ux-toggle__track .ux-toggle__thumb {
      box-shadow: none;
    }

    /* ========================================
       Color Variants - Using CSS Custom Property
       Consolidated pattern for easier theming
    ======================================== */

    .ux-toggle {
      --ux-toggle-color: var(--ux-success);
    }

    .ux-toggle--primary { --ux-toggle-color: var(--ux-primary); }
    .ux-toggle--secondary { --ux-toggle-color: var(--ux-secondary); }
    .ux-toggle--tertiary { --ux-toggle-color: var(--ux-tertiary); }
    .ux-toggle--success { --ux-toggle-color: var(--ux-success); }
    .ux-toggle--warning { --ux-toggle-color: var(--ux-warning); }
    .ux-toggle--danger { --ux-toggle-color: var(--ux-danger); }

    /* ========================================
       Sizes
    ======================================== */

    .ux-toggle--sm .ux-toggle__track {
      width: 40px;
      height: 24px;
    }

    .ux-toggle--sm .ux-toggle__thumb {
      width: 20px;
      height: 20px;
    }

    .ux-toggle--sm input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(16px);
    }

    .ux-toggle--sm input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb {
      width: 24px;
    }

    .ux-toggle--sm input[type="checkbox"]:checked:active + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(12px);
    }

    .ux-toggle--lg .ux-toggle__track {
      width: 64px;
      height: 38px;
    }

    .ux-toggle--lg .ux-toggle__thumb {
      width: 34px;
      height: 34px;
    }

    .ux-toggle--lg input[type="checkbox"]:checked + .ux-toggle__track .ux-toggle__thumb {
      transform: translateX(26px);
    }

    .ux-toggle--lg input[type="checkbox"]:active + .ux-toggle__track .ux-toggle__thumb {
      width: 38px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-toggle__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-toggle__label--left {
      order: -1;
    }

    .ux-toggle__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       With Icons
    ======================================== */

    .ux-toggle__track--icons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
    }

    .ux-toggle__icon {
      width: 14px;
      height: 14px;
      color: white;
      opacity: 0.8;
      z-index: 0;
    }

    .ux-toggle__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Toggle List Item
    ======================================== */

    .ux-toggle-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-toggle-item:last-child {
      border-bottom: none;
    }

    .ux-toggle-item__content {
      flex: 1;
      margin-right: var(--ux-space-md);
    }

    .ux-toggle-item__title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-toggle-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-toggle-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-toggle-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for toggle
  // ARIA: role="switch", aria-checked for toggle state
  const toggleComponent = (config = {}) => ({
    checked: config.checked || false,
    disabled: config.disabled || false,

    // ARIA attributes for toggle (when used without native checkbox)
    get ariaAttrs() {
      return {
        'role': 'switch',
        'aria-checked': this.checked ? 'true' : 'false',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    toggle() {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    },

    on() {
      if (!this.disabled) {
        this.checked = true;
      }
    },

    off() {
      if (!this.disabled) {
        this.checked = false;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToggle', toggleComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToggle', toggleComponent);
    });
  }
})();
