/**
 * UX Calculator Component
 * Scientific calculator with iOS-style design
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Calculator Variables
    ======================================== */

    :root {
      --ux-calculator-width: 320px;
      --ux-calculator-btn-size: 64px;
      --ux-calculator-btn-size-sm: 52px;
      --ux-calculator-btn-gap: 12px;
      --ux-calculator-btn-gap-sm: 8px;
      --ux-calculator-border-radius: var(--ux-border-radius-xl);
      --ux-calculator-display-font-size: 3rem;
      --ux-calculator-display-font-size-sm: 2rem;
      --ux-calculator-expression-font-size: 1rem;
      --ux-calculator-btn-font-size: 1.5rem;
      --ux-calculator-btn-font-size-sm: 1.25rem;
    }

    /* ========================================
       UX Calculator Container
    ======================================== */

    .ux-calculator {
      display: flex;
      flex-direction: column;
      width: var(--ux-calculator-width);
      max-width: 100%;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-radius: var(--ux-calculator-border-radius);
      box-shadow: var(--ux-shadow-lg);
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-calculator--full-width {
      width: 100%;
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-calculator--compact {
      --ux-calculator-btn-size: var(--ux-calculator-btn-size-sm);
      --ux-calculator-btn-gap: var(--ux-calculator-btn-gap-sm);
      --ux-calculator-display-font-size: var(--ux-calculator-display-font-size-sm);
      --ux-calculator-btn-font-size: var(--ux-calculator-btn-font-size-sm);
      padding: var(--ux-space-md);
    }

    .ux-calculator--compact .ux-calculator__display {
      padding: var(--ux-space-sm) var(--ux-space-md);
      min-height: 80px;
    }

    /* ========================================
       Calculator Display
    ======================================== */

    .ux-calculator__display {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      min-height: 120px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      margin-bottom: var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-calculator__expression {
      width: 100%;
      text-align: right;
      font-size: var(--ux-calculator-expression-font-size);
      font-weight: 400;
      color: var(--ux-text-secondary);
      min-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-calculator__result {
      width: 100%;
      text-align: right;
      font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
      font-size: var(--ux-calculator-display-font-size);
      font-weight: 300;
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: font-size var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calculator__result--small {
      font-size: calc(var(--ux-calculator-display-font-size) * 0.7);
    }

    .ux-calculator__result--error {
      color: var(--ux-danger);
    }

    /* ========================================
       Calculator Keypad
    ======================================== */

    .ux-calculator__keypad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--ux-calculator-btn-gap);
    }

    /* ========================================
       Calculator Buttons
    ======================================== */

    .ux-calculator__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-calculator-btn-size);
      min-height: var(--ux-calculator-btn-size);
      padding: var(--ux-space-sm);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-calculator-btn-font-size);
      font-weight: 500;
      color: var(--ux-text);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform 100ms var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calculator__btn:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-calculator__btn:active {
      transform: scale(0.95);
      background-color: var(--ux-surface-tertiary);
    }

    .ux-calculator__btn:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Number buttons */
    .ux-calculator__btn--number {
      background-color: var(--ux-surface);
      font-weight: 400;
    }

    .ux-calculator__btn--number:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* Operator buttons */
    .ux-calculator__btn--operator {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
      color: white;
    }

    .ux-calculator__btn--operator:hover {
      background-color: var(--ux-warning-shade, #e89806);
    }

    .ux-calculator__btn--operator:active {
      background-color: var(--ux-warning-shade, #e89806);
    }

    .ux-calculator__btn--operator.is-active {
      background-color: white;
      color: var(--ux-warning);
    }

    /* Function buttons (C, +/-, %) */
    .ux-calculator__btn--function {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
      color: var(--ux-text);
    }

    .ux-calculator__btn--function:hover {
      background-color: var(--ux-surface-tertiary);
    }

    /* Equals button */
    .ux-calculator__btn--equals {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-calculator__btn--equals:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-calculator__btn--equals:active {
      background-color: var(--ux-primary-shade);
    }

    /* Zero button spans 2 columns */
    .ux-calculator__btn--wide {
      grid-column: span 2;
    }

    /* Button icon */
    .ux-calculator__btn svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    .ux-calculator--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-calculator--glass .ux-calculator__display {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-calculator--glass .ux-calculator__btn {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-calculator--glass .ux-calculator__btn:hover {
      background: var(--ux-glass-bg);
    }

    .ux-calculator--glass .ux-calculator__btn--number {
      background: var(--ux-glass-bg-thin);
    }

    .ux-calculator--glass .ux-calculator__btn--function {
      background: var(--ux-glass-bg);
    }

    .ux-calculator--glass .ux-calculator__btn--operator {
      background: rgba(var(--ux-warning-rgb, 234, 179, 8), 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .ux-calculator--glass .ux-calculator__btn--equals {
      background: rgba(var(--ux-primary-rgb, 59, 130, 246), 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-calculator {
        width: 100%;
        max-width: 100%;
        border-radius: 0;
        box-shadow: none;
      }

      .ux-calculator__btn {
        min-height: 56px;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-calculator {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .ux-calculator__btn--number {
        background-color: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-calculator__btn--number:hover {
        background-color: var(--ux-gray-700);
      }

      .ux-calculator__btn--function {
        background-color: var(--ux-gray-700);
        border-color: var(--ux-gray-600);
      }

      .ux-calculator__btn--function:hover {
        background-color: var(--ux-gray-600);
      }
    }

    .ux-dark .ux-calculator {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .ux-dark .ux-calculator__btn--number {
      background-color: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
    }

    .ux-dark .ux-calculator__btn--number:hover {
      background-color: var(--ux-gray-700);
    }

    .ux-dark .ux-calculator__btn--function {
      background-color: var(--ux-gray-700);
      border-color: var(--ux-gray-600);
    }

    .ux-dark .ux-calculator__btn--function:hover {
      background-color: var(--ux-gray-600);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-calculator__btn {
        transition: none;
      }

      .ux-calculator__btn:active {
        transform: none;
      }

      .ux-calculator__result {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-calculator-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-calculator-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for calculator
  const calculatorComponent = (config = {}) => ({
    // State
    display: '0',
    expression: '',
    currentOperand: '',
    previousOperand: '',
    operator: null,
    waitingForOperand: false,
    hasError: false,
    lastResult: null,

    // Configuration
    maxDigits: config.maxDigits || 12,
    precision: config.precision || 10,

    // Initialize
    init() {
      // Keyboard support
      this._keyHandler = (e) => {
        // Only respond if calculator or body is focused
        if (!this.$el.contains(document.activeElement) && document.activeElement !== document.body) return;

        // Prevent default for calculator keys
        const calculatorKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Escape', 'Backspace', '%'];
        if (calculatorKeys.includes(e.key)) {
          e.preventDefault();
        }

        // Handle keys
        if (e.key >= '0' && e.key <= '9') {
          this.inputDigit(e.key);
        } else if (e.key === '.') {
          this.inputDecimal();
        } else if (e.key === '+') {
          this.inputOperator('+');
        } else if (e.key === '-') {
          this.inputOperator('-');
        } else if (e.key === '*') {
          this.inputOperator('*');
        } else if (e.key === '/') {
          this.inputOperator('/');
        } else if (e.key === '%') {
          this.inputPercent();
        } else if (e.key === 'Enter' || e.key === '=') {
          this.calculate();
        } else if (e.key === 'Escape') {
          this.clear();
        } else if (e.key === 'Backspace') {
          this.backspace();
        }
      };

      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Input a digit (0-9)
    inputDigit(digit) {
      if (this.hasError) {
        this.clear();
      }

      if (this.waitingForOperand) {
        this.currentOperand = digit;
        this.waitingForOperand = false;
      } else {
        // Prevent multiple leading zeros
        if (this.currentOperand === '0' && digit === '0') return;

        // Replace leading zero unless it's followed by decimal
        if (this.currentOperand === '0' && digit !== '0') {
          this.currentOperand = digit;
        } else {
          // Check max digits
          const digitsOnly = this.currentOperand.replace(/[^0-9]/g, '');
          if (digitsOnly.length >= this.maxDigits) return;

          this.currentOperand += digit;
        }
      }

      this.updateDisplay();
      this.emitChange();
    },

    // Input decimal point
    inputDecimal() {
      if (this.hasError) {
        this.clear();
      }

      if (this.waitingForOperand) {
        this.currentOperand = '0.';
        this.waitingForOperand = false;
      } else if (!this.currentOperand.includes('.')) {
        this.currentOperand = this.currentOperand === '' ? '0.' : this.currentOperand + '.';
      }

      this.updateDisplay();
      this.emitChange();
    },

    // Input operator (+, -, *, /)
    inputOperator(op) {
      if (this.hasError) {
        this.clear();
      }

      const inputValue = parseFloat(this.currentOperand) || 0;

      // If we have a previous operand and an operator, calculate first
      if (this.previousOperand !== '' && this.operator && !this.waitingForOperand) {
        const result = this.performCalculation();
        if (result === null) return; // Error occurred

        this.currentOperand = String(result);
        this.previousOperand = String(result);
      } else {
        this.previousOperand = this.currentOperand || '0';
      }

      this.operator = op;
      this.waitingForOperand = true;
      this.updateExpression();
      this.updateDisplay();
      this.emitChange();
    },

    // Perform the calculation
    performCalculation() {
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return null;

      let result;
      switch (this.operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current === 0) {
            this.showError('Error');
            return null;
          }
          result = prev / current;
          break;
        default:
          return current;
      }

      // Round to avoid floating point errors
      result = parseFloat(result.toPrecision(this.precision));

      return result;
    },

    // Calculate result (equals)
    calculate() {
      if (this.hasError) {
        this.clear();
        return;
      }

      if (this.operator && this.previousOperand !== '') {
        const result = this.performCalculation();
        if (result === null) return; // Error occurred

        // Store expression before clearing
        const prevOp = this.operator;
        const prevOperand = this.previousOperand;
        const currOperand = this.currentOperand;

        this.expression = `${this.formatNumber(prevOperand)} ${this.getOperatorSymbol(prevOp)} ${this.formatNumber(currOperand)} =`;
        this.currentOperand = String(result);
        this.lastResult = result;
        this.previousOperand = '';
        this.operator = null;
        this.waitingForOperand = true;

        this.updateDisplay();
        this.emitResult(result);
      }
    },

    // Clear all
    clear() {
      this.display = '0';
      this.expression = '';
      this.currentOperand = '';
      this.previousOperand = '';
      this.operator = null;
      this.waitingForOperand = false;
      this.hasError = false;
      this.lastResult = null;
      this.emitChange();
    },

    // Clear entry (CE) - clear current operand only
    clearEntry() {
      if (this.hasError) {
        this.clear();
        return;
      }

      this.currentOperand = '';
      this.updateDisplay();
      this.emitChange();
    },

    // Backspace - delete last digit
    backspace() {
      if (this.hasError || this.waitingForOperand) {
        this.clear();
        return;
      }

      if (this.currentOperand.length > 0) {
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
          this.currentOperand = '';
        }
        this.updateDisplay();
        this.emitChange();
      }
    },

    // Toggle sign (+/-)
    toggleSign() {
      if (this.hasError) {
        this.clear();
        return;
      }

      if (this.currentOperand === '' || this.currentOperand === '0') return;

      if (this.currentOperand.startsWith('-')) {
        this.currentOperand = this.currentOperand.slice(1);
      } else {
        this.currentOperand = '-' + this.currentOperand;
      }

      this.updateDisplay();
      this.emitChange();
    },

    // Input percent
    inputPercent() {
      if (this.hasError) {
        this.clear();
        return;
      }

      const value = parseFloat(this.currentOperand) || 0;
      const result = value / 100;
      this.currentOperand = String(result);
      this.updateDisplay();
      this.emitChange();
    },

    // Show error
    showError(message) {
      this.display = message;
      this.hasError = true;
      this.currentOperand = '';
      this.previousOperand = '';
      this.operator = null;
      this.waitingForOperand = false;
    },

    // Update the expression display
    updateExpression() {
      if (this.operator && this.previousOperand !== '') {
        this.expression = `${this.formatNumber(this.previousOperand)} ${this.getOperatorSymbol(this.operator)}`;
      } else {
        this.expression = '';
      }
    },

    // Update the main display
    updateDisplay() {
      if (this.hasError) return;

      const value = this.currentOperand || '0';
      this.display = this.formatNumber(value);
    },

    // Format number for display
    formatNumber(numStr) {
      if (numStr === '' || numStr === '-') return '0';

      const num = parseFloat(numStr);
      if (isNaN(num)) return numStr;

      // Check if it's a decimal that ends with .
      if (numStr.endsWith('.')) {
        const parts = numStr.split('.');
        const intPart = parseFloat(parts[0]) || 0;
        return intPart.toLocaleString('en-US') + '.';
      }

      // Check if it has decimal places
      if (numStr.includes('.')) {
        const parts = numStr.split('.');
        const intPart = parseFloat(parts[0]) || 0;
        return intPart.toLocaleString('en-US') + '.' + parts[1];
      }

      return num.toLocaleString('en-US');
    },

    // Get operator symbol for display
    getOperatorSymbol(op) {
      const symbols = {
        '+': '+',
        '-': '-',
        '*': '\u00D7',
        '/': '\u00F7'
      };
      return symbols[op] || op;
    },

    // Check if display needs smaller font
    needsSmallFont() {
      return this.display.length > 10;
    },

    // Check if operator is active
    isOperatorActive(op) {
      return this.operator === op && this.waitingForOperand;
    },

    // Emit change event
    emitChange() {
      this.$dispatch('calculator-change', {
        display: this.display,
        expression: this.expression,
        currentOperand: this.currentOperand,
        operator: this.operator
      });
    },

    // Emit result event
    emitResult(result) {
      this.$dispatch('calculator-result', {
        result: result,
        display: this.display,
        expression: this.expression
      });
    },

    // Get numeric value
    getValue() {
      return parseFloat(this.currentOperand) || 0;
    },

    // Set value programmatically
    setValue(value) {
      this.clear();
      this.currentOperand = String(value);
      this.updateDisplay();
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCalculator', calculatorComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCalculator', calculatorComponent);
    });
  }
})();
