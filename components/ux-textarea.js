/**
 * UX Textarea Component
 * Áreas de texto estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Textarea Container
    ======================================== */

    .ux-textarea {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Textarea Field
    ======================================== */

    .ux-textarea__field {
      width: 100%;
      min-height: 100px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px; /* Prevent zoom on iOS */
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      resize: vertical;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-textarea__field::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-textarea__field:hover {
      border-color: var(--ux-medium);
    }

    .ux-textarea__field:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    /* ========================================
       Auto Resize
    ======================================== */

    .ux-textarea--auto-resize .ux-textarea__field {
      resize: none;
      overflow: hidden;
    }

    /* ========================================
       Label
    ======================================== */

    .ux-textarea__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-textarea__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Floating Label
    ======================================== */

    .ux-textarea--floating {
      position: relative;
    }

    .ux-textarea--floating .ux-textarea__field {
      padding-top: 28px;
    }

    .ux-textarea--floating .ux-textarea__label {
      position: absolute;
      top: var(--ux-space-md);
      left: var(--ux-space-lg);
      margin: 0;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
      pointer-events: none;
      transition:
        top var(--ux-transition-fast) var(--ux-ease),
        font-size var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-textarea--floating .ux-textarea__field:focus ~ .ux-textarea__label,
    .ux-textarea--floating .ux-textarea__field:not(:placeholder-shown) ~ .ux-textarea__label,
    .ux-textarea--floating .ux-textarea__field.has-value ~ .ux-textarea__label {
      top: 8px;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
    }

    /* ========================================
       Helper Text & Counter
    ======================================== */

    .ux-textarea__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--ux-space-xs);
      gap: var(--ux-space-md);
    }

    .ux-textarea__helper {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-textarea__counter {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-textarea__counter--warning {
      color: var(--ux-warning);
    }

    .ux-textarea__counter--danger {
      color: var(--ux-danger);
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-textarea--error .ux-textarea__field {
      border-color: var(--ux-danger);
    }

    .ux-textarea--error .ux-textarea__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-textarea--error .ux-textarea__label {
      color: var(--ux-danger);
    }

    .ux-textarea__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    /* ========================================
       Success State
    ======================================== */

    .ux-textarea--success .ux-textarea__field {
      border-color: var(--ux-success);
    }

    .ux-textarea--success .ux-textarea__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-textarea--disabled .ux-textarea__field,
    .ux-textarea__field:disabled {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
      resize: none;
    }

    /* ========================================
       Readonly State
    ======================================== */

    .ux-textarea__field[readonly] {
      background-color: var(--ux-light);
      cursor: default;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-textarea--sm .ux-textarea__field {
      min-height: 60px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-textarea--lg .ux-textarea__field {
      min-height: 150px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled */
    .ux-textarea--filled .ux-textarea__field {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
      border-bottom: 2px solid var(--ux-border-color);
    }

    .ux-textarea--filled .ux-textarea__field:focus {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    /* Outline */
    .ux-textarea--outline .ux-textarea__field {
      background-color: transparent;
    }

    /* Borderless */
    .ux-textarea--borderless .ux-textarea__field {
      border: none;
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;
    }

    .ux-textarea--borderless .ux-textarea__field:focus {
      box-shadow: none;
    }

    /* ========================================
       Resize Options
    ======================================== */

    .ux-textarea--no-resize .ux-textarea__field {
      resize: none;
    }

    .ux-textarea--resize-horizontal .ux-textarea__field {
      resize: horizontal;
    }

    .ux-textarea--resize-both .ux-textarea__field {
      resize: both;
    }

    /* ========================================
       With Toolbar (formatting)
    ======================================== */

    .ux-textarea--with-toolbar {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      overflow: hidden;
    }

    .ux-textarea--with-toolbar .ux-textarea__field {
      border: none;
      border-radius: 0;
    }

    .ux-textarea--with-toolbar .ux-textarea__field:focus {
      box-shadow: none;
    }

    .ux-textarea__toolbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-textarea__toolbar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-textarea__toolbar-btn:hover {
      background-color: var(--ux-light);
      color: var(--ux-text);
    }

    .ux-textarea__toolbar-btn:active {
      background-color: var(--ux-light-shade);
    }

    .ux-textarea__toolbar-btn--active {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-textarea__toolbar-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-textarea__toolbar-divider {
      width: 1px;
      height: 24px;
      background-color: var(--ux-border-color);
      margin: 0 var(--ux-space-xs);
    }

    /* Focus state for toolbar variant */
    .ux-textarea--with-toolbar:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-textarea-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-textarea-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for textarea with validation
  const textareaComponent = (config = {}) => ({
    value: config.value || '',
    error: '',
    touched: false,
    maxLength: config.maxLength || null,
    minLength: config.minLength || null,
    autoResize: config.autoResize || false,
    _resizeObserver: null,

    init() {
      // Set up ResizeObserver for efficient auto-resize
      if (this.autoResize && this.$refs.textarea) {
        this.setupAutoResize(this.$refs.textarea);
      }
    },

    destroy() {
      // Clean up ResizeObserver to prevent memory leaks
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
        this._resizeObserver = null;
      }
    },

    setupAutoResize(el) {
      if (!el) return;

      // Initial resize
      this.resize(el);

      // Use ResizeObserver for efficient resize detection
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => {
          // Avoid infinite loop by checking if height actually needs updating
          const currentHeight = el.style.height;
          el.style.height = 'auto';
          const newHeight = el.scrollHeight + 'px';
          if (currentHeight !== newHeight) {
            el.style.height = newHeight;
          } else {
            el.style.height = currentHeight;
          }
        });
        this._resizeObserver.observe(el);
      }
    },

    get hasValue() {
      return this.value && this.value.length > 0;
    },

    get charCount() {
      return this.value ? this.value.length : 0;
    },

    get charRemaining() {
      return this.maxLength ? this.maxLength - this.charCount : null;
    },

    get isOverLimit() {
      return this.maxLength && this.charCount > this.maxLength;
    },

    get isNearLimit() {
      return this.maxLength && this.charRemaining <= this.maxLength * 0.1;
    },

    get isValid() {
      return !this.error;
    },

    get counterClass() {
      if (this.isOverLimit) return 'ux-textarea__counter--danger';
      if (this.isNearLimit) return 'ux-textarea__counter--warning';
      return '';
    },

    clear() {
      this.value = '';
      this.error = '';
    },

    resize(el) {
      if (!this.autoResize) return;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
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

    minLengthValidator(min, message) {
      return (value) => value.length >= min ? true : (message || `Minimum ${min} characters`);
    },

    maxLengthValidator(max, message) {
      return (value) => value.length <= max ? true : (message || `Maximum ${max} characters`);
    },

    pattern(regex, message = 'Invalid format') {
      return (value) => regex.test(value) ? true : message;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTextarea', textareaComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTextarea', textareaComponent);
    });
  }
})();
