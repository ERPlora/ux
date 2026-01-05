/**
 * UX Input Component
 * Campos de texto estilo Ionic con labels flotantes
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Input - Base Styles (direct on input)
    ======================================== */

    input.ux-input,
    textarea.ux-input,
    select.ux-input {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px;
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-appearance: none;
      appearance: none;
    }

    input.ux-input::placeholder,
    textarea.ux-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    input.ux-input:hover,
    textarea.ux-input:hover,
    select.ux-input:hover {
      border-color: var(--ux-medium);
    }

    input.ux-input:focus,
    textarea.ux-input:focus,
    select.ux-input:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    input.ux-input:disabled,
    textarea.ux-input:disabled,
    select.ux-input:disabled {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    input.ux-input[readonly],
    textarea.ux-input[readonly] {
      background-color: var(--ux-light);
      cursor: default;
    }

    /* Size variants for direct input */
    input.ux-input--sm,
    textarea.ux-input--sm {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    input.ux-input--lg,
    textarea.ux-input--lg {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* Variant styles for direct input */
    input.ux-input--filled,
    textarea.ux-input--filled {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
      border-bottom: 2px solid var(--ux-border-color);
    }

    input.ux-input--filled:focus,
    textarea.ux-input--filled:focus {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    input.ux-input--outline,
    textarea.ux-input--outline {
      background-color: transparent;
    }

    input.ux-input--underline,
    textarea.ux-input--underline {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid var(--ux-border-color);
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }

    input.ux-input--underline:focus,
    textarea.ux-input--underline:focus {
      border-bottom-color: var(--ux-primary);
      border-bottom-width: 2px;
      box-shadow: none;
    }

    /* Textarea specific */
    textarea.ux-input {
      min-height: 100px;
      resize: vertical;
    }

    /* ========================================
       UX Input Group (wrapper structure)
    ======================================== */

    .ux-input-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-input-group--horizontal {
      flex-direction: row;
      align-items: stretch;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-input__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-input__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Helper & Error Text
    ======================================== */

    .ux-input__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-input__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-input__counter {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: right;
    }

    /* ========================================
       Validation States
    ======================================== */

    .ux-input-group--error .ux-input,
    .ux-input-group--error input.ux-input {
      border-color: var(--ux-danger);
    }

    .ux-input-group--error .ux-input:focus,
    .ux-input-group--error input.ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-input-group--error .ux-input__label {
      color: var(--ux-danger);
    }

    .ux-input-group--success .ux-input,
    .ux-input-group--success input.ux-input {
      border-color: var(--ux-success);
    }

    .ux-input-group--success .ux-input:focus,
    .ux-input-group--success input.ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    .ux-input-group--warning .ux-input,
    .ux-input-group--warning input.ux-input {
      border-color: var(--ux-warning);
    }

    /* ========================================
       Floating Label
    ======================================== */

    .ux-input-group--floating {
      position: relative;
    }

    .ux-input-group--floating .ux-input {
      padding-top: 24px;
      padding-bottom: 8px;
    }

    .ux-input-group--floating .ux-input__label {
      position: absolute;
      top: 50%;
      left: var(--ux-space-lg);
      transform: translateY(-50%);
      margin: 0;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
      pointer-events: none;
      transition:
        top var(--ux-transition-fast) var(--ux-ease),
        font-size var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input-group--floating .ux-input:focus ~ .ux-input__label,
    .ux-input-group--floating .ux-input:not(:placeholder-shown) ~ .ux-input__label {
      top: 12px;
      transform: translateY(0);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
    }

    /* ========================================
       Input Wrapper (for icons, password toggle)
    ======================================== */

    .ux-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .ux-input-wrapper .ux-input {
      width: 100%;
    }

    .ux-input__icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    .ux-input__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-input-wrapper--icon-start .ux-input__icon {
      left: var(--ux-space-md);
    }

    .ux-input-wrapper--icon-start .ux-input {
      padding-left: calc(var(--ux-space-lg) + 24px);
    }

    .ux-input-wrapper--icon-end .ux-input__icon {
      right: var(--ux-space-md);
    }

    .ux-input-wrapper--icon-end .ux-input {
      padding-right: calc(var(--ux-space-lg) + 24px);
    }

    /* ========================================
       Password Toggle
    ======================================== */

    .ux-input-password {
      position: relative;
      width: 100%;
    }

    .ux-input-password .ux-input {
      padding-right: calc(var(--ux-space-lg) + 32px);
    }

    .ux-input-password__toggle {
      position: absolute;
      top: 50%;
      right: var(--ux-space-md);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input-password__toggle:hover {
      color: var(--ux-text-secondary);
    }

    .ux-input-password__toggle svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Clearable
    ======================================== */

    .ux-input__clear {
      position: absolute;
      top: 50%;
      right: var(--ux-space-md);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: var(--ux-medium);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-input__clear svg {
      width: 12px;
      height: 12px;
    }

    .ux-input:not(:placeholder-shown) ~ .ux-input__clear {
      opacity: 1;
    }

    .ux-input-wrapper--clearable .ux-input {
      padding-right: calc(var(--ux-space-lg) + 28px);
    }

    /* ========================================
       Addon (prefixes/suffixes)
    ======================================== */

    .ux-input-group--horizontal .ux-input {
      flex: 1;
      border-radius: 0;
    }

    .ux-input-group--horizontal .ux-input:first-child,
    .ux-input-group--horizontal .ux-input-wrapper:first-child .ux-input {
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-input-group--horizontal .ux-input:last-child,
    .ux-input-group--horizontal .ux-input-wrapper:last-child .ux-input {
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-input-group__addon {
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      white-space: nowrap;
    }

    .ux-input-group__addon:first-child {
      border-right: none;
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-input-group__addon:last-child {
      border-left: none;
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    /* ========================================
       Date/Time Input Icons (Native Browser)
    ======================================== */

    /* Webkit browsers (Chrome, Safari, Edge) */
    input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
      filter: var(--ux-icon-filter, none);
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    input.ux-input[type="date"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator:hover,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }

    /* Dark mode support for date/time icons */
    .ux-dark input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    /* Also support data-theme dark */
    [data-theme="dark"] input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    /* Match color with text-tertiary using CSS filters */
    input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      /* Subtle gray filter to match text-tertiary color */
      filter: opacity(0.5);
    }

    .ux-dark input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    .ux-dark input.ux-input[type="week"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="date"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="time"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="datetime-local"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="month"]::-webkit-calendar-picker-indicator,
    [data-theme="dark"] input.ux-input[type="week"]::-webkit-calendar-picker-indicator {
      filter: invert(1) opacity(0.6);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for input with validation
  const inputComponent = (config = {}) => ({
    value: config.value || '',
    error: '',
    touched: false,
    maxLength: config.maxLength || null,

    get hasValue() {
      return this.value && this.value.length > 0;
    },

    get charCount() {
      return this.value ? this.value.length : 0;
    },

    get isValid() {
      return !this.error;
    },

    clear() {
      this.value = '';
      this.error = '';
    },

    validate(rules = []) {
      this.touched = true;
      for (const rule of rules) {
        const result = rule(this.value);
        if (result !== true) {
          this.error = result;
          return false;
        }
      }
      this.error = '';
      return true;
    },

    // Common validators
    required(message = 'This field is required') {
      return (value) => !!value && value.trim() !== '' ? true : message;
    },

    email(message = 'Please enter a valid email') {
      return (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : message;
    },

    minLength(min, message) {
      return (value) => value.length >= min ? true : (message || `Minimum ${min} characters`);
    },

    maxLengthValidator(max, message) {
      return (value) => value.length <= max ? true : (message || `Maximum ${max} characters`);
    }
  });

  // Alpine component for password input with toggle
  const passwordComponent = (config = {}) => ({
    value: config.value || '',
    showPassword: false,
    error: '',

    get inputType() {
      return this.showPassword ? 'text' : 'password';
    },

    toggle() {
      this.showPassword = !this.showPassword;
    },

    clear() {
      this.value = '';
      this.error = '';
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxInput', inputComponent);
    window.UX.registerComponent('uxPassword', passwordComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxInput', inputComponent);
      Alpine.data('uxPassword', passwordComponent);
    });
  }
})();
