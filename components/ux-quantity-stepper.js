/**
 * UX Quantity Stepper Component
 * Quantity selector with +/- buttons for cart quantity adjustment
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Quantity Stepper
    ======================================== */

    :root {
      --ux-quantity-stepper-height: 44px;
      --ux-quantity-stepper-height-sm: 36px;
      --ux-quantity-stepper-height-lg: 52px;
      --ux-quantity-stepper-btn-width: 44px;
      --ux-quantity-stepper-btn-width-sm: 36px;
      --ux-quantity-stepper-btn-width-lg: 52px;
      --ux-quantity-stepper-input-width: 56px;
      --ux-quantity-stepper-input-width-sm: 44px;
      --ux-quantity-stepper-input-width-lg: 68px;
      --ux-quantity-stepper-border-radius: var(--ux-border-radius);
      --ux-quantity-stepper-font-size: var(--ux-font-size-md);
      --ux-quantity-stepper-font-size-sm: var(--ux-font-size-sm);
      --ux-quantity-stepper-font-size-lg: var(--ux-font-size-lg);
      --ux-quantity-stepper-icon-size: 20px;
      --ux-quantity-stepper-icon-size-sm: 16px;
      --ux-quantity-stepper-icon-size-lg: 24px;
    }

    .ux-quantity-stepper {
      display: inline-flex;
      align-items: center;
      height: var(--ux-quantity-stepper-height);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-quantity-stepper-border-radius);
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
    }

    /* ========================================
       Buttons (+/-)
    ======================================== */

    .ux-quantity-stepper__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-quantity-stepper-btn-width);
      height: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    .ux-quantity-stepper__btn:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-quantity-stepper__btn:active {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      transform: scale(0.95);
    }

    .ux-quantity-stepper__btn:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
    }

    .ux-quantity-stepper__btn svg {
      width: var(--ux-quantity-stepper-icon-size);
      height: var(--ux-quantity-stepper-icon-size);
    }

    /* Disabled button state */
    .ux-quantity-stepper__btn--disabled,
    .ux-quantity-stepper__btn:disabled {
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-quantity-stepper__btn--disabled:hover,
    .ux-quantity-stepper__btn:disabled:hover {
      background-color: transparent;
    }

    /* ========================================
       Input (center number display)
    ======================================== */

    .ux-quantity-stepper__input {
      width: var(--ux-quantity-stepper-input-width);
      height: 100%;
      padding: 0;
      background-color: transparent;
      border: none;
      border-left: 1px solid var(--ux-border-color);
      border-right: 1px solid var(--ux-border-color);
      font-family: var(--ux-font-family);
      font-size: var(--ux-quantity-stepper-font-size);
      font-weight: 600;
      text-align: center;
      color: var(--ux-text);
      -moz-appearance: textfield;
      appearance: textfield;
    }

    .ux-quantity-stepper__input::-webkit-outer-spin-button,
    .ux-quantity-stepper__input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .ux-quantity-stepper__input:focus {
      outline: none;
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-quantity-stepper__input:disabled {
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-quantity-stepper--sm {
      height: var(--ux-quantity-stepper-height-sm);
    }

    .ux-quantity-stepper--sm .ux-quantity-stepper__btn {
      width: var(--ux-quantity-stepper-btn-width-sm);
    }

    .ux-quantity-stepper--sm .ux-quantity-stepper__btn svg {
      width: var(--ux-quantity-stepper-icon-size-sm);
      height: var(--ux-quantity-stepper-icon-size-sm);
    }

    .ux-quantity-stepper--sm .ux-quantity-stepper__input {
      width: var(--ux-quantity-stepper-input-width-sm);
      font-size: var(--ux-quantity-stepper-font-size-sm);
    }

    /* Large */
    .ux-quantity-stepper--lg {
      height: var(--ux-quantity-stepper-height-lg);
    }

    .ux-quantity-stepper--lg .ux-quantity-stepper__btn {
      width: var(--ux-quantity-stepper-btn-width-lg);
    }

    .ux-quantity-stepper--lg .ux-quantity-stepper__btn svg {
      width: var(--ux-quantity-stepper-icon-size-lg);
      height: var(--ux-quantity-stepper-icon-size-lg);
    }

    .ux-quantity-stepper--lg .ux-quantity-stepper__input {
      width: var(--ux-quantity-stepper-input-width-lg);
      font-size: var(--ux-quantity-stepper-font-size-lg);
    }

    /* ========================================
       Vertical Variant (Stacked)
    ======================================== */

    .ux-quantity-stepper--vertical {
      flex-direction: column;
      width: var(--ux-quantity-stepper-btn-width);
      height: auto;
    }

    .ux-quantity-stepper--vertical .ux-quantity-stepper__btn {
      width: 100%;
      height: var(--ux-quantity-stepper-btn-width);
    }

    .ux-quantity-stepper--vertical .ux-quantity-stepper__btn--minus {
      order: 3;
    }

    .ux-quantity-stepper--vertical .ux-quantity-stepper__btn--plus {
      order: 1;
    }

    .ux-quantity-stepper--vertical .ux-quantity-stepper__input {
      order: 2;
      width: 100%;
      height: var(--ux-quantity-stepper-btn-width);
      border-left: none;
      border-right: none;
      border-top: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* Vertical Small */
    .ux-quantity-stepper--vertical.ux-quantity-stepper--sm {
      width: var(--ux-quantity-stepper-btn-width-sm);
    }

    .ux-quantity-stepper--vertical.ux-quantity-stepper--sm .ux-quantity-stepper__btn {
      height: var(--ux-quantity-stepper-btn-width-sm);
    }

    .ux-quantity-stepper--vertical.ux-quantity-stepper--sm .ux-quantity-stepper__input {
      height: var(--ux-quantity-stepper-btn-width-sm);
    }

    /* Vertical Large */
    .ux-quantity-stepper--vertical.ux-quantity-stepper--lg {
      width: var(--ux-quantity-stepper-btn-width-lg);
    }

    .ux-quantity-stepper--vertical.ux-quantity-stepper--lg .ux-quantity-stepper__btn {
      height: var(--ux-quantity-stepper-btn-width-lg);
    }

    .ux-quantity-stepper--vertical.ux-quantity-stepper--lg .ux-quantity-stepper__input {
      height: var(--ux-quantity-stepper-btn-width-lg);
    }

    /* ========================================
       Rounded Variant
    ======================================== */

    .ux-quantity-stepper--round {
      border-radius: 9999px;
    }

    /* ========================================
       Compact Variant (no visible input)
    ======================================== */

    .ux-quantity-stepper--compact .ux-quantity-stepper__input {
      width: 36px;
      border-left: none;
      border-right: none;
    }

    .ux-quantity-stepper--compact.ux-quantity-stepper--sm .ux-quantity-stepper__input {
      width: 28px;
    }

    .ux-quantity-stepper--compact.ux-quantity-stepper--lg .ux-quantity-stepper__input {
      width: 44px;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter comes from universal selector [class*="--glass"] in ux-core.js */
    .ux-quantity-stepper--glass {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-quantity-stepper--glass .ux-quantity-stepper__input {
      border-color: var(--ux-glass-border);
    }

    .ux-quantity-stepper--glass .ux-quantity-stepper__btn:hover {
      background-color: var(--ux-glass-bg);
    }

    .ux-quantity-stepper--glass .ux-quantity-stepper__btn:active {
      background-color: var(--ux-glass-bg-thick);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-quantity-stepper--disabled,
    .ux-quantity-stepper:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Color Variants (using composition system)
    ======================================== */

    .ux-quantity-stepper.ux-color-primary .ux-quantity-stepper__btn {
      color: var(--ux-primary);
    }

    .ux-quantity-stepper.ux-color-primary .ux-quantity-stepper__btn:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-quantity-stepper.ux-color-success .ux-quantity-stepper__btn {
      color: var(--ux-success);
    }

    .ux-quantity-stepper.ux-color-success .ux-quantity-stepper__btn:hover {
      background-color: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-quantity-stepper.ux-color-danger .ux-quantity-stepper__btn {
      color: var(--ux-danger);
    }

    .ux-quantity-stepper.ux-color-danger .ux-quantity-stepper__btn:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* ========================================
       Long Press Indicator
    ======================================== */

    .ux-quantity-stepper__btn--pressing {
      background-color: rgba(var(--ux-primary-rgb), 0.2) !important;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-quantity-stepper {
        background-color: var(--ux-surface-secondary);
        border-color: var(--ux-border-color);
      }

      .ux-quantity-stepper--glass {
        background: var(--ux-glass-bg-thin);
        border-color: var(--ux-glass-border);
      }
    }

    .ux-dark .ux-quantity-stepper {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-quantity-stepper--glass {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-quantity-stepper__btn {
        transition: none;
      }

      .ux-quantity-stepper__btn:active {
        transform: none;
      }

      .ux-quantity-stepper__input {
        transition: none;
      }
    }
  `;

  // SVG icons for +/- buttons
  const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-quantity-stepper-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-quantity-stepper-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for quantity stepper
  // ARIA: role="spinbutton", aria-valuenow, aria-valuemin, aria-valuemax
  const quantityStepperComponent = (config = {}) => ({
    value: config.value ?? 1,
    min: config.min ?? 0,
    max: config.max ?? 999,
    step: config.step ?? 1,
    disabled: config.disabled ?? false,
    readonly: config.readonly ?? false,

    // Long press state
    _longPressTimer: null,
    _longPressInterval: null,
    _isLongPressing: false,
    _longPressDelay: config.longPressDelay ?? 400,
    _longPressSpeed: config.longPressSpeed ?? 100,

    // Icons
    minusIcon,
    plusIcon,

    init() {
      // Clamp initial value
      this.value = this._clamp(this.value);
    },

    destroy() {
      this._stopLongPress();
    },

    // ARIA attributes for the component
    get ariaAttrs() {
      return {
        'role': 'spinbutton',
        'aria-valuenow': this.value,
        'aria-valuemin': this.min,
        'aria-valuemax': this.max,
        'aria-label': `Quantity: ${this.value}`
      };
    },

    // Check if at min/max
    get isAtMin() {
      return this.value <= this.min;
    },

    get isAtMax() {
      return this.value >= this.max;
    },

    // Clamp value to min/max
    _clamp(val) {
      return Math.min(Math.max(val, this.min), this.max);
    },

    // Set value with clamping and event dispatch
    setValue(newValue) {
      if (this.disabled || this.readonly) return;

      const oldValue = this.value;
      const clampedValue = this._clamp(Number(newValue) || 0);

      if (clampedValue !== oldValue) {
        this.value = clampedValue;
        this.$dispatch('quantity-change', {
          value: this.value,
          oldValue: oldValue
        });
      } else {
        // Reset input to valid value
        this.value = clampedValue;
      }
    },

    // Increment value
    increment() {
      if (this.disabled || this.readonly || this.isAtMax) return;
      this.setValue(this.value + this.step);
    },

    // Decrement value
    decrement() {
      if (this.disabled || this.readonly || this.isAtMin) return;
      this.setValue(this.value - this.step);
    },

    // Handle input change
    onInput(event) {
      const inputValue = event.target.value;

      // Allow empty input while typing
      if (inputValue === '') return;

      const numValue = parseInt(inputValue, 10);
      if (!isNaN(numValue)) {
        this.setValue(numValue);
      }
    },

    // Handle input blur - ensure valid value
    onBlur(event) {
      const inputValue = event.target.value;
      if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
        this.value = this.min;
      } else {
        this.setValue(parseInt(inputValue, 10));
      }
    },

    // Handle keyboard navigation
    onKeydown(event) {
      if (this.disabled || this.readonly) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.increment();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.decrement();
          break;
        case 'Home':
          event.preventDefault();
          this.setValue(this.min);
          break;
        case 'End':
          event.preventDefault();
          this.setValue(this.max);
          break;
        case 'PageUp':
          event.preventDefault();
          this.setValue(this.value + (this.step * 10));
          break;
        case 'PageDown':
          event.preventDefault();
          this.setValue(this.value - (this.step * 10));
          break;
      }
    },

    // Long press handlers for rapid changes
    _startLongPress(action) {
      if (this.disabled || this.readonly) return;

      this._isLongPressing = true;

      // Initial action
      action();

      // Start long press timer
      this._longPressTimer = setTimeout(() => {
        // Start rapid interval
        this._longPressInterval = setInterval(() => {
          action();
        }, this._longPressSpeed);
      }, this._longPressDelay);
    },

    _stopLongPress() {
      this._isLongPressing = false;

      if (this._longPressTimer) {
        clearTimeout(this._longPressTimer);
        this._longPressTimer = null;
      }

      if (this._longPressInterval) {
        clearInterval(this._longPressInterval);
        this._longPressInterval = null;
      }
    },

    // Mouse/touch handlers for increment
    onIncrementStart(event) {
      event.preventDefault();
      this._startLongPress(() => this.increment());
    },

    // Mouse/touch handlers for decrement
    onDecrementStart(event) {
      event.preventDefault();
      this._startLongPress(() => this.decrement());
    },

    // Stop long press on mouse/touch end
    onPressEnd() {
      this._stopLongPress();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxQuantityStepper', quantityStepperComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxQuantityStepper', quantityStepperComponent);
    });
  }
})();
