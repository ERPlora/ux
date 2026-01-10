/**
 * UX Numpad Component
 * Numeric keypad for POS and calculator interfaces
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Numpad Container
    ======================================== */

    :root {
      --ux-numpad-key-size: 64px;
      --ux-numpad-key-size-sm: 52px;
      --ux-numpad-key-size-lg: 76px;
      --ux-numpad-gap: var(--ux-space-sm);
      --ux-numpad-border-radius: var(--ux-border-radius-lg);
      --ux-numpad-font-size: 1.5rem;
      --ux-numpad-font-size-sm: 1.25rem;
      --ux-numpad-font-size-lg: 1.75rem;
    }

    .ux-numpad {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-radius: var(--ux-numpad-border-radius);
      max-width: fit-content;
    }

    .ux-numpad--full-width {
      max-width: 100%;
    }

    .ux-numpad--compact {
      padding: var(--ux-space-sm);
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Numpad Display
    ======================================== */

    .ux-numpad__display {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
      font-size: 2rem;
      font-weight: 600;
      color: var(--ux-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-numpad__display--lg {
      min-height: 72px;
      font-size: 2.5rem;
    }

    .ux-numpad__display--sm {
      min-height: 44px;
      font-size: 1.5rem;
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-numpad__display-label {
      font-size: var(--ux-font-size-sm);
      font-weight: 400;
      color: var(--ux-text-secondary);
      margin-right: auto;
      font-family: inherit;
    }

    .ux-numpad__display-value {
      font-variant-numeric: tabular-nums;
    }

    .ux-numpad__display-currency {
      font-size: 0.75em;
      color: var(--ux-text-secondary);
      margin-right: var(--ux-space-xs);
    }

    /* ========================================
       Numpad Grid
    ======================================== */

    .ux-numpad__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--ux-numpad-gap);
    }

    .ux-numpad__grid--4cols {
      grid-template-columns: repeat(4, 1fr);
    }

    /* ========================================
       Numpad Keys
    ======================================== */

    .ux-numpad__key {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-numpad-key-size);
      min-height: var(--ux-numpad-key-size);
      padding: var(--ux-space-sm);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      font-size: var(--ux-numpad-font-size);
      font-weight: 500;
      color: var(--ux-text);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform 100ms var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-numpad__key:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-numpad__key:active {
      transform: scale(0.95);
      background-color: var(--ux-surface-tertiary);
    }

    .ux-numpad__key:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Key Sizes */
    .ux-numpad--sm .ux-numpad__key {
      min-width: var(--ux-numpad-key-size-sm);
      min-height: var(--ux-numpad-key-size-sm);
      font-size: var(--ux-numpad-font-size-sm);
    }

    .ux-numpad--lg .ux-numpad__key {
      min-width: var(--ux-numpad-key-size-lg);
      min-height: var(--ux-numpad-key-size-lg);
      font-size: var(--ux-numpad-font-size-lg);
    }

    /* Key spanning 2 columns (e.g., 0 key) */
    .ux-numpad__key--wide {
      grid-column: span 2;
    }

    /* Key spanning 2 rows */
    .ux-numpad__key--tall {
      grid-row: span 2;
    }

    /* Action keys (backspace, clear, etc.) */
    .ux-numpad__key--action {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-secondary);
    }

    .ux-numpad__key--action:hover {
      background-color: var(--ux-surface-tertiary);
    }

    /* Primary action key (enter, confirm) */
    .ux-numpad__key--primary {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-numpad__key--primary:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-numpad__key--primary:active {
      background-color: var(--ux-primary-shade);
    }

    /* Success key */
    .ux-numpad__key--success {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
      color: white;
    }

    .ux-numpad__key--success:hover {
      background-color: var(--ux-success-shade, #34c759);
    }

    /* Danger key (clear all, delete) */
    .ux-numpad__key--danger {
      background-color: transparent;
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    .ux-numpad__key--danger:hover {
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
    }

    /* Disabled key */
    .ux-numpad__key:disabled,
    .ux-numpad__key--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Key icons */
    .ux-numpad__key svg {
      width: 24px;
      height: 24px;
    }

    .ux-numpad--sm .ux-numpad__key svg {
      width: 20px;
      height: 20px;
    }

    .ux-numpad--lg .ux-numpad__key svg {
      width: 28px;
      height: 28px;
    }

    /* ========================================
       Quick Amount Buttons
    ======================================== */

    .ux-numpad__quick-amounts {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-numpad__quick-btn {
      flex: 1;
      min-width: 60px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform 100ms var(--ux-ease);
    }

    .ux-numpad__quick-btn:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-numpad__quick-btn:active {
      transform: scale(0.97);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-numpad--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-numpad--glass .ux-numpad__display {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-numpad--glass .ux-numpad__key {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-numpad--glass .ux-numpad__key:hover {
      background: var(--ux-glass-bg);
    }

    .ux-numpad--glass .ux-numpad__key--action {
      background: var(--ux-glass-bg);
    }

    /* ========================================
       Calculator Layout
    ======================================== */

    .ux-numpad--calculator .ux-numpad__grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .ux-numpad--calculator .ux-numpad__key--operator {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
      color: white;
    }

    .ux-numpad--calculator .ux-numpad__key--operator:hover {
      background-color: var(--ux-warning-shade, #ff9500);
    }

    /* ========================================
       PIN Entry Layout
    ======================================== */

    .ux-numpad--pin {
      max-width: 280px;
    }

    .ux-numpad--pin .ux-numpad__display {
      letter-spacing: 1rem;
      text-align: center;
      justify-content: center;
    }

    .ux-numpad__pin-dots {
      display: flex;
      justify-content: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
    }

    .ux-numpad__pin-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: var(--ux-border-color);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-numpad__pin-dot--filled {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-numpad {
        width: 100%;
        max-width: 100%;
      }

      .ux-numpad__key {
        min-width: 0;
        min-height: 56px;
      }

      .ux-numpad__display {
        font-size: 1.75rem;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-numpad__key {
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-numpad__key {
      border-color: var(--ux-border-color);
    }

    /* ========================================
       PIN Pad Component
    ======================================== */

    :root {
      --ux-pinpad-dot-size: 18px;
      --ux-pinpad-key-size: 68px;
      --ux-pinpad-key-size-sm: 56px;
      --ux-pinpad-key-size-lg: 80px;
    }

    .ux-pinpad {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-lg);
      padding: var(--ux-space-lg);
    }

    .ux-pinpad__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* PIN Dots */
    .ux-pinpad__dots {
      display: flex;
      gap: var(--ux-space-md);
    }

    .ux-pinpad__dot {
      width: var(--ux-pinpad-dot-size);
      height: var(--ux-pinpad-dot-size);
      border-radius: 50%;
      border: 2px solid var(--ux-border-color);
      background: transparent;
      transition: all 0.2s ease;
    }

    .ux-pinpad__dot--filled {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      transform: scale(1.15);
      box-shadow: 0 0 12px var(--ux-primary);
    }

    .ux-pinpad__dot--error {
      background: var(--ux-danger);
      border-color: var(--ux-danger);
      box-shadow: 0 0 12px var(--ux-danger);
      animation: ux-pinpad-shake 0.5s ease;
    }

    .ux-pinpad__dot--success {
      background: var(--ux-success);
      border-color: var(--ux-success);
      box-shadow: 0 0 12px var(--ux-success);
    }

    @keyframes ux-pinpad-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }

    /* PIN Pad Grid */
    .ux-pinpad__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--ux-space-sm);
      max-width: 260px;
    }

    /* PIN Pad Keys */
    .ux-pinpad__key {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-pinpad-key-size);
      height: var(--ux-pinpad-key-size);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--ux-text);
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform 100ms var(--ux-ease);
    }

    .ux-pinpad__key:hover {
      background: rgba(var(--ux-text-rgb, 0, 0, 0), 0.05);
    }

    .ux-pinpad__key:active {
      transform: scale(0.92);
      background: rgba(var(--ux-text-rgb, 0, 0, 0), 0.1);
    }

    .ux-pinpad__key:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    .ux-pinpad__key:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-pinpad__key--hidden {
      visibility: hidden;
      pointer-events: none;
    }

    .ux-pinpad__key svg {
      width: 24px;
      height: 24px;
    }

    /* Glass Variant */
    .ux-pinpad--glass .ux-pinpad__key {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .ux-pinpad--glass .ux-pinpad__key:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-pinpad--glass .ux-pinpad__key:active {
      background: rgba(255, 255, 255, 0.25);
    }

    /* Size Variants */
    .ux-pinpad--sm .ux-pinpad__key {
      width: var(--ux-pinpad-key-size-sm);
      height: var(--ux-pinpad-key-size-sm);
      font-size: 1.25rem;
    }

    .ux-pinpad--sm .ux-pinpad__dot {
      width: 14px;
      height: 14px;
    }

    .ux-pinpad--lg .ux-pinpad__key {
      width: var(--ux-pinpad-key-size-lg);
      height: var(--ux-pinpad-key-size-lg);
      font-size: 1.75rem;
    }

    .ux-pinpad--lg .ux-pinpad__dot {
      width: 22px;
      height: 22px;
    }

    /* Loading State */
    .ux-pinpad__loading {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Hint */
    .ux-pinpad__hint {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin: 0;
    }

    /* Error Message */
    .ux-pinpad__error {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
      margin: 0;
    }

    /* Dark Mode Glass */
    @media (prefers-color-scheme: dark) {
      .ux-pinpad--glass .ux-pinpad__key {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .ux-pinpad--glass .ux-pinpad__key:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-pinpad--glass .ux-pinpad__key {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-pinpad--glass .ux-pinpad__key:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `;

  // Icons
  const icons = {
    backspace: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>',
    clear: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    enter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 01-4 4H4"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    multiply: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    divide: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="6" r="1" fill="currentColor"/><line x1="5" y1="12" x2="19" y2="12"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>',
    equals: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/></svg>',
    percent: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-numpad-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-numpad-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for numpad
  const numpadComponent = (config = {}) => ({
    // Value
    value: config.initialValue || '',
    displayValue: '',

    // Configuration
    maxLength: config.maxLength || 12,
    decimals: config.decimals ?? 2,
    allowNegative: config.allowNegative || false,
    allowDecimal: config.allowDecimal !== false,
    currency: config.currency || '',
    currencyPosition: config.currencyPosition || 'prefix',

    // PIN mode
    pinMode: config.pinMode || false,
    pinLength: config.pinLength || 4,
    pinMask: config.pinMask !== false,

    // Quick amounts
    quickAmounts: config.quickAmounts || [],

    // Layout
    layout: config.layout || 'standard', // standard, calculator, phone

    // Labels
    labels: {
      clear: config.labels?.clear || 'C',
      backspace: config.labels?.backspace || '⌫',
      enter: config.labels?.enter || 'Enter',
      decimal: config.labels?.decimal || '.',
      negative: config.labels?.negative || '±',
      ...config.labels
    },

    // State
    hasDecimal: false,
    isNegative: false,

    // Initialize
    init() {
      this.updateDisplay();

      // Keyboard support
      this._keyHandler = (e) => {
        if (!this.$el.contains(document.activeElement) && document.activeElement !== document.body) return;

        if (e.key >= '0' && e.key <= '9') {
          this.appendDigit(e.key);
        } else if (e.key === '.' || e.key === ',') {
          this.appendDecimal();
        } else if (e.key === 'Backspace') {
          this.backspace();
        } else if (e.key === 'Delete' || e.key === 'Escape') {
          this.clear();
        } else if (e.key === 'Enter') {
          this.submit();
        } else if (e.key === '-' && this.allowNegative) {
          this.toggleNegative();
        }
      };

      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Append a digit
    appendDigit(digit) {
      // Check max length
      const cleanValue = this.value.replace(/[^0-9]/g, '');
      if (cleanValue.length >= this.maxLength) return;

      // PIN mode length check
      if (this.pinMode && this.value.length >= this.pinLength) return;

      // Prevent leading zeros (except for decimals)
      if (this.value === '0' && digit === '0' && !this.hasDecimal) return;
      if (this.value === '0' && digit !== '0' && !this.hasDecimal) {
        this.value = '';
      }

      this.value += digit;
      this.updateDisplay();
      this.emitChange();

      // Auto-submit for PIN mode
      if (this.pinMode && this.value.length === this.pinLength) {
        this.$nextTick(() => this.submit());
      }
    },

    // Append decimal point
    appendDecimal() {
      if (!this.allowDecimal || this.hasDecimal || this.pinMode) return;

      if (this.value === '') {
        this.value = '0';
      }

      this.value += '.';
      this.hasDecimal = true;
      this.updateDisplay();
      this.emitChange();
    },

    // Backspace (delete last character)
    backspace() {
      if (this.value.length === 0) return;

      const lastChar = this.value.slice(-1);
      if (lastChar === '.') {
        this.hasDecimal = false;
      }

      this.value = this.value.slice(0, -1);
      this.updateDisplay();
      this.emitChange();
    },

    // Clear all
    clear() {
      this.value = '';
      this.hasDecimal = false;
      this.isNegative = false;
      this.updateDisplay();
      this.emitChange();
    },

    // Toggle negative
    toggleNegative() {
      if (!this.allowNegative) return;

      this.isNegative = !this.isNegative;
      this.updateDisplay();
      this.emitChange();
    },

    // Set quick amount
    setQuickAmount(amount) {
      this.value = String(amount);
      this.hasDecimal = this.value.includes('.');
      this.updateDisplay();
      this.emitChange();
    },

    // Update display value
    updateDisplay() {
      if (this.pinMode && this.pinMask) {
        this.displayValue = '•'.repeat(this.value.length);
      } else if (this.value === '') {
        this.displayValue = '0';
      } else {
        let display = this.value;

        // Format with thousand separators for display
        if (!this.pinMode && this.decimals >= 0) {
          const parts = display.split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          display = parts.join('.');
        }

        if (this.isNegative && display !== '0' && display !== '') {
          display = '-' + display;
        }

        this.displayValue = display;
      }
    },

    // Get numeric value
    getNumericValue() {
      let num = parseFloat(this.value) || 0;
      if (this.isNegative) num = -num;
      return num;
    },

    // Submit value
    submit() {
      const numericValue = this.getNumericValue();
      this.$dispatch('numpad-submit', {
        value: this.value,
        numericValue: numericValue,
        displayValue: this.displayValue,
        isNegative: this.isNegative
      });
    },

    // Emit change event
    emitChange() {
      this.$dispatch('numpad-change', {
        value: this.value,
        numericValue: this.getNumericValue(),
        displayValue: this.displayValue
      });
    },

    // Get icon HTML
    getIcon(name) {
      return icons[name] || '';
    },

    // Get PIN dots
    getPinDots() {
      const dots = [];
      for (let i = 0; i < this.pinLength; i++) {
        dots.push(i < this.value.length);
      }
      return dots;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxNumpad', numpadComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxNumpad', numpadComponent);
    });
  }

  // Alpine component for PIN Pad
  const pinpadComponent = (config = {}) => ({
    // PIN value
    pin: '',

    // Configuration
    length: config.length || 4,
    label: config.label || 'Introduce tu PIN',
    hint: config.hint || '',
    loadingText: config.loadingText || 'Verificando...',

    // State
    loading: false,
    error: false,
    success: false,
    errorMessage: '',

    // Keys layout: 1-9, empty, 0, backspace
    keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'backspace'],

    // Initialize
    init() {
      // Keyboard support
      this._keyHandler = (e) => {
        if (this.loading) return;
        if (!this.$el.contains(document.activeElement) && document.activeElement !== document.body) return;

        if (e.key >= '0' && e.key <= '9') {
          e.preventDefault();
          this.handleKey(parseInt(e.key));
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          this.handleKey('backspace');
        } else if (e.key === 'Delete' || e.key === 'Escape') {
          e.preventDefault();
          this.clear();
        }
      };

      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Handle key press
    handleKey(key) {
      if (this.loading) return;

      // Clear error state on new input
      if (this.error) {
        this.error = false;
        this.errorMessage = '';
      }

      if (key === 'backspace') {
        this.pin = this.pin.slice(0, -1);
        return;
      }

      if (key === '' || key === null || key === undefined) return;

      // Add digit if not at max length
      if (this.pin.length < this.length) {
        this.pin += String(key);

        // Auto-submit when PIN is complete
        if (this.pin.length === this.length) {
          this.$nextTick(() => this.submit());
        }
      }
    },

    // Clear PIN
    clear() {
      this.pin = '';
      this.error = false;
      this.success = false;
      this.errorMessage = '';
    },

    // Submit PIN
    submit() {
      this.$dispatch('pinpad-submit', {
        pin: this.pin
      });
    },

    // Set loading state (call from parent)
    setLoading(isLoading) {
      this.loading = isLoading;
    },

    // Set error state (call from parent)
    setError(message = 'PIN incorrecto') {
      this.error = true;
      this.errorMessage = message;
      this.pin = '';
      this.loading = false;

      // Auto-clear error after animation
      setTimeout(() => {
        this.error = false;
      }, 500);
    },

    // Set success state (call from parent)
    setSuccess() {
      this.success = true;
      this.loading = false;
    },

    // Check if dot should be filled
    isDotFilled(index) {
      return this.pin.length > index;
    },

    // Get dot class
    getDotClass(index) {
      if (this.error) return 'ux-pinpad__dot--error';
      if (this.success && this.isDotFilled(index)) return 'ux-pinpad__dot--success';
      if (this.isDotFilled(index)) return 'ux-pinpad__dot--filled';
      return '';
    },

    // Get backspace icon
    getBackspaceIcon() {
      return icons.backspace;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPinpad', pinpadComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPinpad', pinpadComponent);
    });
  }
})();
