/**
 * UX Checkbox Component
 * Checkboxes estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Checkbox
    ======================================== */

    .ux-checkbox {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm) 0;
    }

    .ux-checkbox__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ux-checkbox__box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: 2px solid var(--ux-medium);
      border-radius: var(--ux-border-radius-sm);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
      flex-shrink: 0;
    }

    /* Expanded touch target for accessibility (44px minimum) */
    .ux-checkbox__box::before {
      content: '';
      position: absolute;
      inset: -10px;
      z-index: 1;
    }

    .ux-checkbox__checkmark {
      display: none;
      width: 14px;
      height: 14px;
      color: white;
    }

    .ux-checkbox__checkmark svg {
      width: 100%;
      height: 100%;
    }

    /* Checked State */
    .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox__input:checked + .ux-checkbox__box .ux-checkbox__checkmark {
      display: block;
      animation: ux-checkbox-check 0.2s var(--ux-ease-spring);
    }

    @keyframes ux-checkbox-check {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Hover State */
    .ux-checkbox:hover .ux-checkbox__box {
      border-color: var(--ux-primary);
    }

    /* Active State */
    .ux-checkbox:active .ux-checkbox__box {
      transform: scale(0.9);
    }

    /* Focus State */
    .ux-checkbox__input:focus-visible + .ux-checkbox__box {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-checkbox--disabled,
    .ux-checkbox__input:disabled + .ux-checkbox__box {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Indeterminate State */
    .ux-checkbox__input:indeterminate + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox__input:indeterminate + .ux-checkbox__box .ux-checkbox__checkmark {
      display: none;
    }

    .ux-checkbox__input:indeterminate + .ux-checkbox__box::after {
      content: '';
      width: 12px;
      height: 2px;
      background-color: white;
      border-radius: 1px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-checkbox--primary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-checkbox--secondary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-secondary);
      border-color: var(--ux-secondary);
    }

    .ux-checkbox--tertiary .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-tertiary);
      border-color: var(--ux-tertiary);
    }

    .ux-checkbox--success .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-checkbox--warning .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-checkbox--danger .ux-checkbox__input:checked + .ux-checkbox__box {
      background-color: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-checkbox--sm .ux-checkbox__box {
      width: 18px;
      height: 18px;
    }

    .ux-checkbox--sm .ux-checkbox__checkmark {
      width: 10px;
      height: 10px;
    }

    .ux-checkbox--lg .ux-checkbox__box {
      width: 28px;
      height: 28px;
    }

    .ux-checkbox--lg .ux-checkbox__checkmark {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-checkbox__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
      padding-top: 2px;
    }

    .ux-checkbox__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Checkbox Group
    ======================================== */

    .ux-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-checkbox-group--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--ux-space-lg);
    }

    .ux-checkbox-group__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    /* ========================================
       Checkbox List Item
    ======================================== */

    .ux-checkbox-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
    }

    .ux-checkbox-item:last-child {
      border-bottom: none;
    }

    .ux-checkbox-item:active {
      background-color: var(--ux-surface-secondary);
    }

    .ux-checkbox-item__content {
      flex: 1;
      margin-left: var(--ux-space-md);
    }

    .ux-checkbox-item__title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-checkbox-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Round Variant
    ======================================== */

    .ux-checkbox--round .ux-checkbox__box {
      border-radius: 50%;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-checkbox__box {
        transition: none;
      }

      .ux-checkbox__input:checked + .ux-checkbox__box .ux-checkbox__checkmark {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-checkbox-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-checkbox-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for checkbox
  const checkboxComponent = (config = {}) => ({
    checked: config.checked || false,
    indeterminate: config.indeterminate || false,
    disabled: config.disabled || false,

    toggle() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = !this.checked;
      }
    },

    check() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = true;
      }
    },

    uncheck() {
      if (!this.disabled) {
        this.indeterminate = false;
        this.checked = false;
      }
    },

    setIndeterminate() {
      this.indeterminate = true;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCheckbox', checkboxComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCheckbox', checkboxComponent);
    });
  }

  // Alpine component for checkbox group
  const checkboxGroupComponent = (config = {}) => ({
    values: config.values || [],
    disabled: config.disabled || false,

    isChecked(value) {
      return this.values.includes(value);
    },

    toggle(value) {
      if (this.disabled) return;
      const index = this.values.indexOf(value);
      if (index === -1) {
        this.values.push(value);
      } else {
        this.values.splice(index, 1);
      }
    },

    checkAll(allValues) {
      if (!this.disabled) {
        this.values = [...allValues];
      }
    },

    uncheckAll() {
      if (!this.disabled) {
        this.values = [];
      }
    },

    get allChecked() {
      return this.values.length > 0;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCheckboxGroup', checkboxGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCheckboxGroup', checkboxGroupComponent);
    });
  }
})();
