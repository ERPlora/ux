/**
 * UX Radio Component
 * Radio buttons estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Radio
    ======================================== */

    .ux-radio {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm) 0;
    }

    .ux-radio__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ux-radio__circle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: 2px solid var(--ux-medium);
      border-radius: 50%;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
      flex-shrink: 0;
    }

    .ux-radio__dot {
      width: 12px;
      height: 12px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      transform: scale(0);
      transition: transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    /* Checked State */
    .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    .ux-radio__input:checked + .ux-radio__circle .ux-radio__dot {
      transform: scale(1);
    }

    /* Hover State */
    .ux-radio:hover .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    /* Active State */
    .ux-radio:active .ux-radio__circle {
      transform: scale(0.9);
    }

    /* Focus State */
    .ux-radio__input:focus-visible + .ux-radio__circle {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-radio--disabled,
    .ux-radio__input:disabled + .ux-radio__circle {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-radio--primary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-primary);
    }

    .ux-radio--primary .ux-radio__dot {
      background-color: var(--ux-primary);
    }

    .ux-radio--secondary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-secondary);
    }

    .ux-radio--secondary .ux-radio__dot {
      background-color: var(--ux-secondary);
    }

    .ux-radio--tertiary .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-tertiary);
    }

    .ux-radio--tertiary .ux-radio__dot {
      background-color: var(--ux-tertiary);
    }

    .ux-radio--success .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-success);
    }

    .ux-radio--success .ux-radio__dot {
      background-color: var(--ux-success);
    }

    .ux-radio--warning .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-warning);
    }

    .ux-radio--warning .ux-radio__dot {
      background-color: var(--ux-warning);
    }

    .ux-radio--danger .ux-radio__input:checked + .ux-radio__circle {
      border-color: var(--ux-danger);
    }

    .ux-radio--danger .ux-radio__dot {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-radio--sm .ux-radio__circle {
      width: 18px;
      height: 18px;
    }

    .ux-radio--sm .ux-radio__dot {
      width: 8px;
      height: 8px;
    }

    .ux-radio--lg .ux-radio__circle {
      width: 28px;
      height: 28px;
    }

    .ux-radio--lg .ux-radio__dot {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-radio__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
      padding-top: 2px;
    }

    .ux-radio__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio Group
    ======================================== */

    .ux-radio-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-radio-group--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--ux-space-lg);
    }

    .ux-radio-group__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-radio-group__error {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio List Item
    ======================================== */

    .ux-radio-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
    }

    .ux-radio-item:last-child {
      border-bottom: none;
    }

    .ux-radio-item:active {
      background-color: var(--ux-surface-secondary);
    }

    .ux-radio-item--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-radio-item__content {
      flex: 1;
      margin-left: var(--ux-space-md);
    }

    .ux-radio-item__title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-radio-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Radio Card (selectable cards)
    ======================================== */

    .ux-radio-card {
      position: relative;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-radio-card:hover {
      border-color: var(--ux-primary);
    }

    .ux-radio-card:active {
      transform: scale(0.98);
    }

    .ux-radio-card--selected {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-radio-card__check {
      position: absolute;
      top: var(--ux-space-md);
      right: var(--ux-space-md);
      width: 24px;
      height: 24px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transform: scale(0);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-radio-card--selected .ux-radio-card__check {
      opacity: 1;
      transform: scale(1);
    }

    .ux-radio-card__check svg {
      width: 14px;
      height: 14px;
    }

    .ux-radio-card__title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-radio-card__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Radio Card Grid */
    .ux-radio-card-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--ux-space-md);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-radio-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-radio-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for radio group
  const radioGroupComponent = (config = {}) => ({
    value: config.value || null,
    disabled: config.disabled || false,
    error: '',

    select(newValue) {
      if (!this.disabled) {
        this.value = newValue;
        this.error = '';
      }
    },

    isSelected(checkValue) {
      return this.value === checkValue;
    },

    validate(required = false, message = 'Please select an option') {
      if (required && !this.value) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.value = null;
      this.error = '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRadioGroup', radioGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRadioGroup', radioGroupComponent);
    });
  }
})();
