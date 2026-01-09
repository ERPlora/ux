/**
 * UX Progress Circle Component
 * Circular progress indicator with percentage and animated fill
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Progress Circle Container
       ========================================================================== */

    :root {
      --ux-progress-circle-size: 120px;
      --ux-progress-circle-stroke: 8px;
      --ux-progress-circle-bg: var(--ux-gray-200);
      --ux-progress-circle-color: var(--ux-primary);
      --ux-progress-circle-duration: 1s;
    }

    .ux-progress-circle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-progress-circle-size);
      height: var(--ux-progress-circle-size);
    }

    .ux-progress-circle__svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .ux-progress-circle__bg {
      fill: none;
      stroke: var(--ux-progress-circle-bg);
      stroke-width: var(--ux-progress-circle-stroke);
    }

    .ux-progress-circle__fill {
      fill: none;
      stroke: var(--ux-progress-circle-color);
      stroke-width: var(--ux-progress-circle-stroke);
      stroke-linecap: round;
      transition: stroke-dashoffset var(--ux-progress-circle-duration) var(--ux-ease-out);
    }

    .ux-progress-circle--animated .ux-progress-circle__fill {
      animation: ux-progress-circle-fill var(--ux-progress-circle-duration) var(--ux-ease-out) forwards;
    }

    @keyframes ux-progress-circle-fill {
      from {
        stroke-dashoffset: var(--circumference);
      }
    }

    /* ==========================================================================
       Center Content
       ========================================================================== */

    .ux-progress-circle__content {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .ux-progress-circle__value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .ux-progress-circle__label {
      font-size: 0.75rem;
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-progress-circle__icon {
      width: 32px;
      height: 32px;
      color: var(--ux-progress-circle-color);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-progress-circle--xs {
      --ux-progress-circle-size: 48px;
      --ux-progress-circle-stroke: 4px;
    }

    .ux-progress-circle--xs .ux-progress-circle__value {
      font-size: 0.875rem;
    }

    .ux-progress-circle--xs .ux-progress-circle__label {
      display: none;
    }

    .ux-progress-circle--sm {
      --ux-progress-circle-size: 80px;
      --ux-progress-circle-stroke: 6px;
    }

    .ux-progress-circle--sm .ux-progress-circle__value {
      font-size: 1.25rem;
    }

    .ux-progress-circle--sm .ux-progress-circle__label {
      font-size: 0.6875rem;
    }

    .ux-progress-circle--lg {
      --ux-progress-circle-size: 160px;
      --ux-progress-circle-stroke: 10px;
    }

    .ux-progress-circle--lg .ux-progress-circle__value {
      font-size: 2.5rem;
    }

    .ux-progress-circle--lg .ux-progress-circle__label {
      font-size: 0.875rem;
    }

    .ux-progress-circle--xl {
      --ux-progress-circle-size: 200px;
      --ux-progress-circle-stroke: 12px;
    }

    .ux-progress-circle--xl .ux-progress-circle__value {
      font-size: 3rem;
    }

    .ux-progress-circle--xl .ux-progress-circle__label {
      font-size: 1rem;
    }

    /* ==========================================================================
       Stroke Variants
       ========================================================================== */

    .ux-progress-circle--thin {
      --ux-progress-circle-stroke: 4px;
    }

    .ux-progress-circle--thick {
      --ux-progress-circle-stroke: 12px;
    }

    /* ==========================================================================
       Color Variants
       ========================================================================== */

    .ux-progress-circle--primary {
      --ux-progress-circle-color: var(--ux-primary);
    }

    .ux-progress-circle--success {
      --ux-progress-circle-color: var(--ux-success);
    }

    .ux-progress-circle--warning {
      --ux-progress-circle-color: var(--ux-warning);
    }

    .ux-progress-circle--danger {
      --ux-progress-circle-color: var(--ux-danger);
    }

    .ux-progress-circle--gradient .ux-progress-circle__fill {
      stroke: url(#progress-gradient);
    }

    /* ==========================================================================
       Indeterminate (Spinner)
       ========================================================================== */

    .ux-progress-circle--indeterminate .ux-progress-circle__svg {
      animation: ux-progress-circle-rotate 1.5s linear infinite;
    }

    .ux-progress-circle--indeterminate .ux-progress-circle__fill {
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
      animation: ux-progress-circle-dash 1.5s ease-in-out infinite;
    }

    @keyframes ux-progress-circle-rotate {
      100% {
        transform: rotate(270deg);
      }
    }

    @keyframes ux-progress-circle-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
      }
    }

    /* ==========================================================================
       Semi Circle
       ========================================================================== */

    .ux-progress-circle--semi .ux-progress-circle__svg {
      transform: rotate(-90deg);
    }

    .ux-progress-circle--semi {
      height: calc(var(--ux-progress-circle-size) / 2 + var(--ux-progress-circle-stroke));
      overflow: hidden;
    }

    .ux-progress-circle--semi .ux-progress-circle__content {
      top: auto;
      bottom: var(--ux-progress-circle-stroke);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-progress-circle--glass .ux-progress-circle__bg {
      stroke: rgba(255, 255, 255, 0.2);
    }

    .ux-progress-circle--glass .ux-progress-circle__value,
    .ux-progress-circle--glass .ux-progress-circle__label {
      color: white;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-progress-circle-bg: var(--ux-gray-700);
      }
    }

    .ux-dark {
      --ux-progress-circle-bg: var(--ux-gray-700);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-progress-circle__fill {
        transition: none;
      }

      .ux-progress-circle--animated .ux-progress-circle__fill {
        animation: none;
      }

      .ux-progress-circle--indeterminate .ux-progress-circle__svg,
      .ux-progress-circle--indeterminate .ux-progress-circle__fill {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-progress-circle-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-progress-circle-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const progressCircleData = (options = {}) => ({
    // Configuration
    value: options.value ?? 0,
    max: options.max ?? 100,
    size: options.size || 120,
    strokeWidth: options.strokeWidth || 8,
    showValue: options.showValue ?? true,
    showLabel: options.showLabel ?? false,
    label: options.label || '',
    format: options.format || 'percent', // 'percent', 'value', 'custom'
    customFormat: options.customFormat || null,
    animated: options.animated ?? true,
    animateOnVisible: options.animateOnVisible ?? true,
    thresholds: options.thresholds || null, // { warning: 50, danger: 80 }

    // State
    isVisible: false,
    hasAnimated: false,

    // Computed
    get percentage() {
      return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    },

    get radius() {
      return (this.size - this.strokeWidth) / 2;
    },

    get circumference() {
      return 2 * Math.PI * this.radius;
    },

    get dashOffset() {
      return this.circumference - (this.percentage / 100) * this.circumference;
    },

    get displayValue() {
      if (this.customFormat) {
        return this.customFormat(this.value, this.max, this.percentage);
      }

      switch (this.format) {
        case 'percent':
          return Math.round(this.percentage) + '%';
        case 'value':
          return this.value;
        case 'fraction':
          return `${this.value}/${this.max}`;
        default:
          return Math.round(this.percentage) + '%';
      }
    },

    get colorClass() {
      if (!this.thresholds) return '';

      if (this.thresholds.danger && this.percentage >= this.thresholds.danger) {
        return 'ux-progress-circle--danger';
      }
      if (this.thresholds.warning && this.percentage >= this.thresholds.warning) {
        return 'ux-progress-circle--warning';
      }
      if (this.thresholds.success && this.percentage >= this.thresholds.success) {
        return 'ux-progress-circle--success';
      }
      return '';
    },

    // Lifecycle
    init() {
      if (this.animateOnVisible) {
        this.setupIntersectionObserver();
      } else {
        this.isVisible = true;
        this.hasAnimated = true;
      }
    },

    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.isVisible = true;
            this.hasAnimated = true;
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(this.$el);
    },

    // Methods
    setValue(newValue) {
      this.value = Math.min(this.max, Math.max(0, newValue));
      this.$dispatch('progress-circle:change', {
        value: this.value,
        percentage: this.percentage
      });
    },

    increment(amount = 1) {
      this.setValue(this.value + amount);
    },

    decrement(amount = 1) {
      this.setValue(this.value - amount);
    },

    reset() {
      this.value = 0;
      this.$dispatch('progress-circle:reset');
    },

    complete() {
      this.setValue(this.max);
      this.$dispatch('progress-circle:complete');
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxProgressCircle', progressCircleData);
  }
})();
