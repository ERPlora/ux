(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Form - Form Groups with Validation States
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Form Group Tokens */
      --ux-form-gap: var(--ux-space-xs);
      --ux-form-label-size: var(--ux-font-size-sm);
      --ux-form-label-color: var(--ux-text-secondary);
      --ux-form-label-weight: 500;
      --ux-form-helper-size: var(--ux-font-size-xs);
      --ux-form-helper-color: var(--ux-text-tertiary);
      --ux-form-error-color: var(--ux-danger);
      --ux-form-success-color: var(--ux-success);
      --ux-form-warning-color: var(--ux-warning);
      --ux-form-icon-size: 16px;
    }

    /* ==========================================================================
       Form Group - Container for label + input + helper/error
       ========================================================================== */

    .ux-form-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-form-gap);
      margin-bottom: var(--ux-space-md);
    }

    .ux-form-group:last-child {
      margin-bottom: 0;
    }

    /* Horizontal layout (inline) */
    .ux-form-group--horizontal {
      flex-direction: row;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-form-group--horizontal .ux-form-group__label {
      flex-shrink: 0;
      min-width: 120px;
      margin-bottom: 0;
    }

    .ux-form-group--horizontal .ux-form-group__control {
      flex: 1;
    }

    /* ==========================================================================
       Label
       ========================================================================== */

    .ux-form-group__label {
      font-size: var(--ux-form-label-size);
      font-weight: var(--ux-form-label-weight);
      color: var(--ux-form-label-color);
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-form-group__label--required::after {
      content: '*';
      color: var(--ux-form-error-color);
      font-weight: 600;
    }

    /* Optional badge */
    .ux-form-group__optional {
      font-size: var(--ux-font-size-xs);
      font-weight: 400;
      color: var(--ux-text-tertiary);
      margin-left: auto;
    }

    /* ==========================================================================
       Control Wrapper (input + icons)
       ========================================================================== */

    .ux-form-group__control {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--ux-form-gap);
    }

    .ux-form-group__input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* Input with validation icon */
    .ux-form-group__input-wrapper .ux-input,
    .ux-form-group__input-wrapper .ux-textarea,
    .ux-form-group__input-wrapper .ux-select,
    .ux-form-group__input-wrapper input,
    .ux-form-group__input-wrapper textarea,
    .ux-form-group__input-wrapper select {
      width: 100%;
      padding-right: calc(var(--ux-space-md) + var(--ux-form-icon-size) + var(--ux-space-sm));
    }

    /* Validation icon */
    .ux-form-group__icon {
      position: absolute;
      right: var(--ux-space-md);
      top: 50%;
      transform: translateY(-50%);
      width: var(--ux-form-icon-size);
      height: var(--ux-form-icon-size);
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-form-group__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Helper Text
       ========================================================================== */

    .ux-form-group__helper {
      font-size: var(--ux-form-helper-size);
      color: var(--ux-form-helper-color);
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-xs);
    }

    .ux-form-group__helper svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ==========================================================================
       Error Message
       ========================================================================== */

    .ux-form-group__error {
      font-size: var(--ux-form-helper-size);
      color: var(--ux-form-error-color);
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-xs);
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease-ios),
        max-height var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-form-group__error svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      margin-top: 1px;
      fill: currentColor;
    }

    /* ==========================================================================
       Success Message
       ========================================================================== */

    .ux-form-group__success {
      font-size: var(--ux-form-helper-size);
      color: var(--ux-form-success-color);
      line-height: 1.4;
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-xs);
      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease-ios),
        max-height var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-form-group__success svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      margin-top: 1px;
      fill: currentColor;
    }

    /* ==========================================================================
       Validation States
       ========================================================================== */

    /* Error State */
    .ux-form-group--error .ux-form-group__label {
      color: var(--ux-form-error-color);
    }

    .ux-form-group--error .ux-input,
    .ux-form-group--error .ux-textarea,
    .ux-form-group--error .ux-select,
    .ux-form-group--error input,
    .ux-form-group--error textarea,
    .ux-form-group--error select {
      border-color: var(--ux-form-error-color) !important;
      background-color: rgba(var(--ux-danger-rgb), 0.03);
    }

    .ux-form-group--error .ux-input:focus,
    .ux-form-group--error .ux-textarea:focus,
    .ux-form-group--error .ux-select:focus,
    .ux-form-group--error input:focus,
    .ux-form-group--error textarea:focus,
    .ux-form-group--error select:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-form-group--error .ux-form-group__icon--error {
      opacity: 1;
      color: var(--ux-form-error-color);
    }

    .ux-form-group--error .ux-form-group__error {
      opacity: 1;
      max-height: 100px;
    }

    .ux-form-group--error .ux-form-group__helper {
      display: none;
    }

    /* Success State */
    .ux-form-group--success .ux-form-group__label {
      color: var(--ux-form-success-color);
    }

    .ux-form-group--success .ux-input,
    .ux-form-group--success .ux-textarea,
    .ux-form-group--success .ux-select,
    .ux-form-group--success input,
    .ux-form-group--success textarea,
    .ux-form-group--success select {
      border-color: var(--ux-form-success-color) !important;
      background-color: rgba(var(--ux-success-rgb), 0.03);
    }

    .ux-form-group--success .ux-input:focus,
    .ux-form-group--success .ux-textarea:focus,
    .ux-form-group--success .ux-select:focus,
    .ux-form-group--success input:focus,
    .ux-form-group--success textarea:focus,
    .ux-form-group--success select:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    .ux-form-group--success .ux-form-group__icon--success {
      opacity: 1;
      color: var(--ux-form-success-color);
    }

    .ux-form-group--success .ux-form-group__success {
      opacity: 1;
      max-height: 100px;
    }

    .ux-form-group--success .ux-form-group__helper {
      display: none;
    }

    /* Warning State */
    .ux-form-group--warning .ux-form-group__label {
      color: var(--ux-form-warning-color);
    }

    .ux-form-group--warning .ux-input,
    .ux-form-group--warning .ux-textarea,
    .ux-form-group--warning .ux-select,
    .ux-form-group--warning input,
    .ux-form-group--warning textarea,
    .ux-form-group--warning select {
      border-color: var(--ux-form-warning-color) !important;
      background-color: rgba(var(--ux-warning-rgb), 0.03);
    }

    .ux-form-group--warning .ux-input:focus,
    .ux-form-group--warning .ux-textarea:focus,
    .ux-form-group--warning .ux-select:focus,
    .ux-form-group--warning input:focus,
    .ux-form-group--warning textarea:focus,
    .ux-form-group--warning select:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-warning-rgb), 0.15);
    }

    .ux-form-group--warning .ux-form-group__icon--warning {
      opacity: 1;
      color: var(--ux-form-warning-color);
    }

    /* Disabled State */
    .ux-form-group--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-form-group--disabled .ux-form-group__label {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Form Section (Fieldset with Title)
       ========================================================================== */

    .ux-form-section {
      margin-bottom: var(--ux-space-xl);
      padding: 0;
      border: none;
    }

    .ux-form-section__header {
      margin-bottom: var(--ux-space-lg);
      padding-bottom: var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-form-section__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs) 0;
    }

    .ux-form-section__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-form-section__content {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
    }

    /* Compact section */
    .ux-form-section--compact .ux-form-section__header {
      margin-bottom: var(--ux-space-md);
    }

    .ux-form-section--compact .ux-form-section__title {
      font-size: var(--ux-font-size-md);
    }

    /* ==========================================================================
       Form Row (Multiple inputs inline)
       ========================================================================== */

    .ux-form-row {
      display: flex;
      gap: var(--ux-space-md);
      margin-bottom: var(--ux-space-md);
    }

    .ux-form-row:last-child {
      margin-bottom: 0;
    }

    .ux-form-row > .ux-form-group {
      flex: 1;
      margin-bottom: 0;
    }

    /* Fixed width columns */
    .ux-form-row > .ux-form-group--auto {
      flex: 0 0 auto;
    }

    .ux-form-row > .ux-form-group--fixed {
      flex: 0 0 200px;
    }

    /* Responsive: stack on mobile */
    @media (max-width: 767px) {
      .ux-form-row {
        flex-direction: column;
        gap: var(--ux-space-md);
      }

      .ux-form-row > .ux-form-group--fixed {
        flex: 1;
      }

      .ux-form-group--horizontal {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-form-group--horizontal .ux-form-group__label {
        min-width: 0;
        margin-bottom: var(--ux-space-xs);
      }
    }

    /* ==========================================================================
       Form Actions (Submit buttons)
       ========================================================================== */

    .ux-form-actions {
      display: flex;
      gap: var(--ux-space-sm);
      justify-content: flex-end;
      padding-top: var(--ux-space-lg);
      margin-top: var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-form-actions--start {
      justify-content: flex-start;
    }

    .ux-form-actions--center {
      justify-content: center;
    }

    .ux-form-actions--between {
      justify-content: space-between;
    }

    .ux-form-actions--sticky {
      position: sticky;
      bottom: 0;
      background: var(--ux-surface);
      padding: var(--ux-space-md);
      margin: var(--ux-space-lg) calc(var(--ux-space-lg) * -1) 0;
      border-top: 1px solid var(--ux-border-color);
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
    }

    /* ==========================================================================
       Character Counter
       ========================================================================== */

    .ux-form-group__counter {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: right;
      margin-left: auto;
    }

    .ux-form-group__counter--warning {
      color: var(--ux-form-warning-color);
    }

    .ux-form-group__counter--error {
      color: var(--ux-form-error-color);
    }

    .ux-form-group__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ==========================================================================
       Input Prefix/Suffix
       ========================================================================== */

    .ux-form-group__addon {
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-sm);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      white-space: nowrap;
    }

    .ux-form-group__addon--start {
      border-right: none;
      border-radius: var(--ux-border-radius) 0 0 var(--ux-border-radius);
    }

    .ux-form-group__addon--end {
      border-left: none;
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-form-group__input-wrapper--has-addon-start input,
    .ux-form-group__input-wrapper--has-addon-start .ux-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .ux-form-group__input-wrapper--has-addon-end input,
    .ux-form-group__input-wrapper--has-addon-end .ux-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-form-group--glass .ux-input,
    .ux-form-group--glass .ux-textarea,
    .ux-form-group--glass .ux-select,
    .ux-form-group--glass input,
    .ux-form-group--glass textarea,
    .ux-form-group--glass select {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-form-group--glass .ux-form-group__addon {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-form-label-color: var(--ux-text-secondary);
        --ux-form-helper-color: var(--ux-text-tertiary);
      }

      :root:not(.ux-light) .ux-form-group--error .ux-input,
      :root:not(.ux-light) .ux-form-group--error input {
        background-color: rgba(var(--ux-danger-rgb), 0.08);
      }

      :root:not(.ux-light) .ux-form-group--success .ux-input,
      :root:not(.ux-light) .ux-form-group--success input {
        background-color: rgba(var(--ux-success-rgb), 0.08);
      }

      :root:not(.ux-light) .ux-form-actions--sticky {
        background: var(--ux-surface);
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
      }
    }

    .ux-dark {
      --ux-form-label-color: var(--ux-text-secondary);
      --ux-form-helper-color: var(--ux-text-tertiary);
    }

    .ux-dark .ux-form-group--error .ux-input,
    .ux-dark .ux-form-group--error input {
      background-color: rgba(var(--ux-danger-rgb), 0.08);
    }

    .ux-dark .ux-form-group--success .ux-input,
    .ux-dark .ux-form-group--success input {
      background-color: rgba(var(--ux-success-rgb), 0.08);
    }

    .ux-dark .ux-form-actions--sticky {
      background: var(--ux-surface);
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-form-group__error,
      .ux-form-group__success,
      .ux-form-group__icon {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-form-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-form-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for form validation
  const formGroupComponent = (config = {}) => ({
    // State
    value: config.value || '',
    error: config.error || '',
    success: config.success || '',
    touched: false,
    dirty: false,

    // Validation rules
    rules: config.rules || [],

    // Character counter
    maxLength: config.maxLength || null,

    // Computed state
    get state() {
      if (this.error) return 'error';
      if (this.success) return 'success';
      return '';
    },

    get charCount() {
      return this.value ? this.value.length : 0;
    },

    get charCountState() {
      if (!this.maxLength) return '';
      const ratio = this.charCount / this.maxLength;
      if (ratio >= 1) return 'error';
      if (ratio >= 0.9) return 'warning';
      return '';
    },

    get containerClasses() {
      return {
        'ux-form-group--error': this.state === 'error',
        'ux-form-group--success': this.state === 'success',
        'ux-form-group--touched': this.touched,
        'ux-form-group--dirty': this.dirty
      };
    },

    // Methods
    init() {
      // Watch for external value changes
      if (config.watchValue) {
        this.$watch('value', () => this.validate());
      }
    },

    onInput(e) {
      this.value = e.target.value;
      this.dirty = true;

      // Clear error on input
      if (config.clearOnInput !== false) {
        this.error = '';
      }

      // Validate on input (optional)
      if (config.validateOnInput) {
        this.validate();
      }

      this.$dispatch('form-input', { value: this.value, name: config.name });
    },

    onBlur() {
      this.touched = true;

      // Validate on blur
      if (config.validateOnBlur !== false) {
        this.validate();
      }

      this.$dispatch('form-blur', { value: this.value, name: config.name });
    },

    onFocus() {
      this.$dispatch('form-focus', { value: this.value, name: config.name });
    },

    validate() {
      this.error = '';
      this.success = '';

      for (const rule of this.rules) {
        const result = rule(this.value);
        if (result !== true && result !== '') {
          this.error = result;
          return false;
        }
      }

      // Show success if configured and has value
      if (config.showSuccess && this.value && this.touched) {
        this.success = config.successMessage || '';
      }

      return true;
    },

    setError(message) {
      this.error = message;
      this.success = '';
    },

    setSuccess(message) {
      this.error = '';
      this.success = message;
    },

    reset() {
      this.value = config.value || '';
      this.error = '';
      this.success = '';
      this.touched = false;
      this.dirty = false;
    }
  });

  // Common validation rules
  const validationRules = {
    required: (message = 'This field is required') => (value) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message;
      }
      return true;
    },

    email: (message = 'Please enter a valid email') => (value) => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? true : message;
    },

    minLength: (min, message) => (value) => {
      if (!value) return true;
      const msg = message || `Minimum ${min} characters required`;
      return value.length >= min ? true : msg;
    },

    maxLength: (max, message) => (value) => {
      if (!value) return true;
      const msg = message || `Maximum ${max} characters allowed`;
      return value.length <= max ? true : msg;
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
      if (!value) return true;
      return regex.test(value) ? true : message;
    },

    numeric: (message = 'Please enter a number') => (value) => {
      if (!value) return true;
      return !isNaN(value) && !isNaN(parseFloat(value)) ? true : message;
    },

    phone: (message = 'Please enter a valid phone number') => (value) => {
      if (!value) return true;
      const phoneRegex = /^[\d\s\-+()]{7,}$/;
      return phoneRegex.test(value) ? true : message;
    },

    url: (message = 'Please enter a valid URL') => (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return message;
      }
    },

    match: (field, message = 'Fields do not match') => (value, formData) => {
      if (!value) return true;
      return value === formData[field] ? true : message;
    }
  };

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxFormGroup', formGroupComponent);
    window.UX.formRules = validationRules;
  }

  // Export for non-Alpine usage
  window.UXFormRules = validationRules;

})();
