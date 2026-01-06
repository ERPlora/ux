/**
 * UX Range Component
 * Sliders estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Range
    ======================================== */

    .ux-range {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: var(--ux-space-sm) 0;
    }

    .ux-range__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-height: var(--ux-touch-target);
    }

    .ux-range__track-container {
      position: relative;
      flex: 1;
      height: 44px;
      display: flex;
      align-items: center;
    }

    .ux-range__track {
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-range__fill {
      position: absolute;
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      transition: width 0.05s ease-out;
    }

    .ux-range__input {
      position: absolute;
      width: 100%;
      height: 44px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-range__thumb {
      position: absolute;
      width: 28px;
      height: 28px;
      background-color: white;
      border-radius: 50%;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.1);
      pointer-events: none;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      transform: translateX(-50%);
      z-index: 1;
    }

    /* Active State */
    .ux-range__input:active ~ .ux-range__thumb {
      transform: translateX(-50%) scale(1.1);
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1);
    }

    /* Focus State */
    .ux-range__input:focus-visible ~ .ux-range__thumb {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Disabled State */
    .ux-range--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-range--disabled .ux-range__input {
      cursor: not-allowed;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-range--primary .ux-range__fill {
      background-color: var(--ux-primary);
    }

    .ux-range--secondary .ux-range__fill {
      background-color: var(--ux-secondary);
    }

    .ux-range--tertiary .ux-range__fill {
      background-color: var(--ux-tertiary);
    }

    .ux-range--success .ux-range__fill {
      background-color: var(--ux-success);
    }

    .ux-range--warning .ux-range__fill {
      background-color: var(--ux-warning);
    }

    .ux-range--danger .ux-range__fill {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-range--sm .ux-range__track {
      height: 2px;
    }

    .ux-range--sm .ux-range__thumb {
      width: 20px;
      height: 20px;
    }

    .ux-range--lg .ux-range__track {
      height: 6px;
      border-radius: 3px;
    }

    .ux-range--lg .ux-range__fill {
      border-radius: 3px;
    }

    .ux-range--lg .ux-range__thumb {
      width: 34px;
      height: 34px;
    }

    /* ========================================
       With Ticks
    ======================================== */

    .ux-range__ticks {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .ux-range__tick {
      width: 2px;
      height: 8px;
      background-color: var(--ux-medium);
      border-radius: 1px;
    }

    .ux-range__tick--active {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Labels
    ======================================== */

    .ux-range__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-range__value {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      min-width: 36px;
      text-align: center;
    }

    .ux-range__value--start {
      text-align: left;
    }

    .ux-range__value--end {
      text-align: right;
    }

    .ux-range__min-max {
      display: flex;
      justify-content: space-between;
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Pin (tooltip on drag)
    ======================================== */

    .ux-range--pin .ux-range__pin {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%) scale(0);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: var(--ux-dark);
      color: white;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      border-radius: var(--ux-border-radius-sm);
      white-space: nowrap;
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
      pointer-events: none;
    }

    .ux-range--pin .ux-range__pin::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: var(--ux-dark);
    }

    .ux-range--pin .ux-range__input:active ~ .ux-range__thumb .ux-range__pin,
    .ux-range--pin .ux-range__input:focus ~ .ux-range__thumb .ux-range__pin {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* ========================================
       Dual Range (two thumbs)
    ======================================== */

    .ux-range--dual .ux-range__fill {
      left: 0;
      right: 0;
    }

    .ux-range--dual .ux-range__input--min,
    .ux-range--dual .ux-range__input--max {
      pointer-events: none;
    }

    .ux-range--dual .ux-range__input--min::-webkit-slider-thumb,
    .ux-range--dual .ux-range__input--max::-webkit-slider-thumb {
      pointer-events: auto;
    }

    /* ========================================
       Icons
    ======================================== */

    .ux-range__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-range__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Snapping
    ======================================== */

    .ux-range--snapping .ux-range__thumb {
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        left var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-range--snapping .ux-range__fill {
      transition: width var(--ux-transition-fast) var(--ux-ease);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-range--glass .ux-range__track {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-range--glass .ux-range__thumb {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-range-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-range-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for range
  const rangeComponent = (config = {}) => ({
    value: config.value ?? 50,
    min: config.min ?? 0,
    max: config.max ?? 100,
    step: config.step ?? 1,
    disabled: config.disabled || false,

    get percent() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },

    get thumbPosition() {
      return `calc(${this.percent}% - ${14 * (this.percent / 100)}px + ${14 * ((100 - this.percent) / 100)}px)`;
    },

    updateValue(newValue) {
      const num = parseFloat(newValue);
      this.value = Math.min(this.max, Math.max(this.min, num));
    },

    increment(amount) {
      const step = amount || this.step;
      this.updateValue(this.value + step);
    },

    decrement(amount) {
      const step = amount || this.step;
      this.updateValue(this.value - step);
    },

    setMin() {
      this.value = this.min;
    },

    setMax() {
      this.value = this.max;
    },

    reset() {
      this.value = config.value ?? 50;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRange', rangeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRange', rangeComponent);
    });
  }

  // Alpine component for dual range
  const dualRangeComponent = (config = {}) => ({
    minValue: config.minValue ?? 20,
    maxValue: config.maxValue ?? 80,
    min: config.min ?? 0,
    max: config.max ?? 100,
    step: config.step ?? 1,
    minGap: config.minGap ?? 10,
    disabled: config.disabled || false,

    get minPercent() {
      return ((this.minValue - this.min) / (this.max - this.min)) * 100;
    },

    get maxPercent() {
      return ((this.maxValue - this.min) / (this.max - this.min)) * 100;
    },

    get fillStyle() {
      return {
        left: this.minPercent + '%',
        width: (this.maxPercent - this.minPercent) + '%'
      };
    },

    updateMin(value) {
      const num = parseFloat(value);
      const maxAllowed = this.maxValue - this.minGap;
      this.minValue = Math.min(maxAllowed, Math.max(this.min, num));
    },

    updateMax(value) {
      const num = parseFloat(value);
      const minAllowed = this.minValue + this.minGap;
      this.maxValue = Math.max(minAllowed, Math.min(this.max, num));
    },

    get range() {
      return [this.minValue, this.maxValue];
    },

    reset() {
      this.minValue = config.minValue ?? 20;
      this.maxValue = config.maxValue ?? 80;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDualRange', dualRangeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDualRange', dualRangeComponent);
    });
  }
})();
