/**
 * UX Currency Input Component
 * Formatted currency input with locale support, symbols, and precision
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Currency Input - Wrapper & Symbol
       Uses .ux-input for the actual input styling
    ======================================== */

    .ux-currency {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
    }

    /* Currency input uses .ux-input base styles with tabular nums */
    .ux-currency .ux-input {
      font-variant-numeric: tabular-nums;
      -moz-appearance: textfield;
    }

    .ux-currency .ux-input::-webkit-outer-spin-button,
    .ux-currency .ux-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* ========================================
       Symbol Positions
    ======================================== */

    .ux-currency__symbol {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-width: 2rem;
      color: var(--ux-text-secondary);
      font-size: var(--ux-input-font-size);
      font-weight: 500;
      pointer-events: none;
      user-select: none;
    }

    .ux-currency__symbol--prefix {
      left: 0.75rem;
    }

    .ux-currency__symbol--suffix {
      right: 0.75rem;
    }

    /* Symbol prefix - adjust input padding */
    .ux-currency--prefix .ux-input {
      padding-left: 2.5rem;
    }

    /* Symbol suffix - adjust input padding */
    .ux-currency--suffix .ux-input {
      padding-right: 2.5rem;
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-currency--sm .ux-input {
      height: var(--ux-input-height-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-currency--sm .ux-currency__symbol {
      font-size: var(--ux-font-size-sm);
    }

    .ux-currency--sm.ux-currency--prefix .ux-input {
      padding-left: 2rem;
    }

    .ux-currency--sm.ux-currency--suffix .ux-input {
      padding-right: 2rem;
    }

    /* Large */
    .ux-currency--lg .ux-input {
      height: var(--ux-input-height-lg);
      font-size: var(--ux-font-size-lg);
    }

    .ux-currency--lg .ux-currency__symbol {
      font-size: var(--ux-font-size-lg);
    }

    .ux-currency--lg.ux-currency--prefix .ux-input {
      padding-left: 3rem;
    }

    .ux-currency--lg.ux-currency--suffix .ux-input {
      padding-right: 3rem;
    }

    /* ========================================
       Text Alignment
    ======================================== */

    .ux-currency--align-left .ux-input {
      text-align: left;
    }

    .ux-currency--align-center .ux-input {
      text-align: center;
    }

    .ux-currency--align-right .ux-input {
      text-align: right;
    }

    /* ========================================
       Display Mode (Read-only large)
    ======================================== */

    .ux-currency--display {
      font-size: 2rem;
      font-weight: 600;
    }

    .ux-currency--display .ux-input {
      height: auto;
      padding: 0;
      border: none;
      background: transparent;
      font-size: inherit;
      font-weight: inherit;
    }

    .ux-currency--display .ux-input:focus {
      box-shadow: none;
    }

    .ux-currency--display .ux-currency__symbol {
      position: static;
      font-size: 1.25rem;
      font-weight: 400;
      margin-right: 0.25rem;
    }

    .ux-currency--display.ux-currency--suffix .ux-currency__symbol {
      margin-right: 0;
      margin-left: 0.25rem;
      order: 2;
    }

    /* ========================================
       With Label (reuses ux-input-group pattern)
    ======================================== */

    .ux-currency-field {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-currency-field__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-currency-field__helper {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-currency-field__helper--error {
      color: var(--ux-danger);
    }

    /* ========================================
       Validation States (on wrapper)
    ======================================== */

    .ux-currency--error .ux-input {
      border-color: var(--ux-danger);
    }

    .ux-currency--error .ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-currency--success .ux-input {
      border-color: var(--ux-success);
    }

    .ux-currency--success .ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    /* ========================================
       Glass Variant (on wrapper)
    ======================================== */

    .ux-currency--glass .ux-input {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
    }

    .ux-currency--glass .ux-input:hover {
      background: var(--ux-glass-bg);
    }

    .ux-currency--glass .ux-input:focus {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-currency-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-currency-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Currency configurations
  const currencyConfigs = {
    USD: { symbol: '$', locale: 'en-US', position: 'prefix' },
    EUR: { symbol: '€', locale: 'es-ES', position: 'suffix' },
    GBP: { symbol: '£', locale: 'en-GB', position: 'prefix' },
    JPY: { symbol: '¥', locale: 'ja-JP', position: 'prefix', decimals: 0 },
    CNY: { symbol: '¥', locale: 'zh-CN', position: 'prefix' },
    MXN: { symbol: '$', locale: 'es-MX', position: 'prefix' },
    BRL: { symbol: 'R$', locale: 'pt-BR', position: 'prefix' },
    ARS: { symbol: '$', locale: 'es-AR', position: 'prefix' },
    CLP: { symbol: '$', locale: 'es-CL', position: 'prefix', decimals: 0 },
    COP: { symbol: '$', locale: 'es-CO', position: 'prefix' },
    PEN: { symbol: 'S/', locale: 'es-PE', position: 'prefix' },
    INR: { symbol: '₹', locale: 'en-IN', position: 'prefix' },
    KRW: { symbol: '₩', locale: 'ko-KR', position: 'prefix', decimals: 0 },
    CAD: { symbol: '$', locale: 'en-CA', position: 'prefix' },
    AUD: { symbol: '$', locale: 'en-AU', position: 'prefix' },
    CHF: { symbol: 'CHF', locale: 'de-CH', position: 'prefix' }
  };

  // Alpine.js component for currency input
  const currencyInputData = (options = {}) => ({
    // Configuration
    currency: options.currency || 'USD',
    symbol: options.symbol || null,
    position: options.position || null, // 'prefix', 'suffix'
    locale: options.locale || null,
    decimals: options.decimals ?? 2,
    min: options.min ?? null,
    max: options.max ?? null,
    step: options.step || 1,

    // State
    rawValue: options.value ?? 0,
    displayValue: '',
    focused: false,
    disabled: options.disabled || false,
    readonly: options.readonly || false,

    // Separators
    decimalSeparator: '.',
    thousandSeparator: ',',

    init() {
      // Get currency config
      const config = currencyConfigs[this.currency] || currencyConfigs.USD;

      // Override with options if provided
      if (!this.symbol) this.symbol = config.symbol;
      if (!this.position) this.position = config.position;
      if (!this.locale) this.locale = config.locale;
      if (this.decimals === 2 && config.decimals !== undefined) {
        this.decimals = config.decimals;
      }

      // Detect locale separators
      this.detectSeparators();

      // Format initial value
      this.updateDisplay();
    },

    // Detect separators based on locale
    detectSeparators() {
      const formatted = new Intl.NumberFormat(this.locale).format(1234.5);
      this.thousandSeparator = formatted.charAt(1);
      this.decimalSeparator = formatted.charAt(5);
    },

    // Format number for display
    formatNumber(value) {
      if (value === null || value === undefined || isNaN(value)) {
        return '';
      }

      return new Intl.NumberFormat(this.locale, {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals
      }).format(value);
    },

    // Parse input string to number
    parseInput(str) {
      if (!str || str === '') return 0;

      // Remove all non-numeric chars except decimal separator
      let cleaned = str.replace(new RegExp(`[^0-9${this.decimalSeparator}-]`, 'g'), '');

      // Replace locale decimal separator with standard dot
      cleaned = cleaned.replace(this.decimalSeparator, '.');

      // Parse to float
      const value = parseFloat(cleaned);

      return isNaN(value) ? 0 : value;
    },

    // Update display value
    updateDisplay() {
      this.displayValue = this.formatNumber(this.rawValue);
    },

    // Handle input
    onInput(event) {
      const input = event.target;
      let cursorPos = input.selectionStart;
      const oldLength = input.value.length;

      // Parse the input
      const newValue = this.parseInput(input.value);

      // Apply min/max constraints
      this.rawValue = this.clamp(newValue);

      // Update display
      this.updateDisplay();

      // Restore cursor position
      this.$nextTick(() => {
        const newLength = this.displayValue.length;
        const diff = newLength - oldLength;
        const newPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newPos, newPos);
      });

      this.dispatchChange();
    },

    // Handle focus
    onFocus(event) {
      this.focused = true;

      // Select all on focus
      this.$nextTick(() => {
        event.target.select();
      });
    },

    // Handle blur
    onBlur() {
      this.focused = false;

      // Ensure proper formatting on blur
      this.updateDisplay();
    },

    // Handle key down
    onKeyDown(event) {
      const key = event.key;

      // Allow navigation keys
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab', 'Backspace', 'Delete'].includes(key)) {
        return;
      }

      // Allow Ctrl/Cmd shortcuts
      if (event.ctrlKey || event.metaKey) {
        return;
      }

      // Arrow up/down to increment/decrement
      if (key === 'ArrowUp') {
        event.preventDefault();
        this.increment();
        return;
      }

      if (key === 'ArrowDown') {
        event.preventDefault();
        this.decrement();
        return;
      }

      // Only allow numbers, decimal separator, and minus sign
      const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', this.decimalSeparator, '-'];

      if (!allowedChars.includes(key)) {
        event.preventDefault();
      }

      // Only one decimal separator
      if (key === this.decimalSeparator && event.target.value.includes(this.decimalSeparator)) {
        event.preventDefault();
      }

      // Minus only at beginning
      if (key === '-' && event.target.selectionStart !== 0) {
        event.preventDefault();
      }
    },

    // Clamp value to min/max
    clamp(value) {
      if (this.min !== null && value < this.min) return this.min;
      if (this.max !== null && value > this.max) return this.max;
      return value;
    },

    // Increment value
    increment() {
      this.rawValue = this.clamp(this.rawValue + this.step);
      this.updateDisplay();
      this.dispatchChange();
    },

    // Decrement value
    decrement() {
      this.rawValue = this.clamp(this.rawValue - this.step);
      this.updateDisplay();
      this.dispatchChange();
    },

    // Set value programmatically
    setValue(value) {
      this.rawValue = this.clamp(parseFloat(value) || 0);
      this.updateDisplay();
      this.dispatchChange();
    },

    // Get raw numeric value
    getValue() {
      return this.rawValue;
    },

    // Get formatted value with symbol
    getFormattedValue() {
      const formatted = this.formatNumber(this.rawValue);
      return this.position === 'prefix'
        ? `${this.symbol}${formatted}`
        : `${formatted} ${this.symbol}`;
    },

    // Clear value
    clear() {
      this.rawValue = 0;
      this.updateDisplay();
      this.dispatchChange();
    },

    // Dispatch change event
    dispatchChange() {
      this.$dispatch('currency:change', {
        value: this.rawValue,
        formatted: this.getFormattedValue(),
        display: this.displayValue
      });
    },

    // Get symbol position class
    getPositionClass() {
      return this.position === 'prefix' ? 'ux-currency--prefix' : 'ux-currency--suffix';
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCurrencyInput', currencyInputData);
  }

})();
