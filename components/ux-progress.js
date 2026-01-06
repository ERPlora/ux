/**
 * UX Progress Component
 * Barras de progreso y indicadores
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Progress Bar
    ======================================== */

    .ux-progress {
      width: 100%;
      height: var(--ux-progress-height);
      background-color: var(--ux-light);
      border-radius: var(--ux-progress-border-radius);
      overflow: hidden;
    }

    .ux-progress__bar {
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: var(--ux-progress-border-radius);
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-progress--sm {
      height: 2px;
    }

    .ux-progress--md {
      height: 8px;
      border-radius: 4px;
    }

    .ux-progress--md .ux-progress__bar {
      border-radius: 4px;
    }

    .ux-progress--lg {
      height: 12px;
      border-radius: 6px;
    }

    .ux-progress--lg .ux-progress__bar {
      border-radius: 6px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-progress--primary .ux-progress__bar {
      background-color: var(--ux-primary);
    }

    .ux-progress--secondary .ux-progress__bar {
      background-color: var(--ux-secondary);
    }

    .ux-progress--tertiary .ux-progress__bar {
      background-color: var(--ux-tertiary);
    }

    .ux-progress--success .ux-progress__bar {
      background-color: var(--ux-success);
    }

    .ux-progress--warning .ux-progress__bar {
      background-color: var(--ux-warning);
    }

    .ux-progress--danger .ux-progress__bar {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Indeterminate Animation
    ======================================== */

    .ux-progress--indeterminate .ux-progress__bar {
      width: 30% !important;
      animation: ux-progress-indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes ux-progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(400%);
      }
    }

    /* ========================================
       Striped Animation
    ======================================== */

    .ux-progress--striped .ux-progress__bar {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    .ux-progress--animated .ux-progress__bar {
      animation: ux-progress-striped 1s linear infinite;
    }

    @keyframes ux-progress-striped {
      0% {
        background-position: 1rem 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    /* ========================================
       With Label
    ======================================== */

    .ux-progress-container {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-progress-container__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ux-progress-container__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-progress-container__value {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Buffer (for video players)
    ======================================== */

    .ux-progress--buffer {
      position: relative;
    }

    .ux-progress--buffer .ux-progress__buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: rgba(var(--ux-primary-rgb), 0.3);
      border-radius: 2px;
    }

    .ux-progress--buffer .ux-progress__bar {
      position: relative;
      z-index: 1;
    }

    /* ========================================
       Circular Progress
    ======================================== */

    .ux-progress-circular {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .ux-progress-circular svg {
      transform: rotate(-90deg);
    }

    .ux-progress-circular__track {
      fill: none;
      stroke: var(--ux-light);
    }

    .ux-progress-circular__bar {
      fill: none;
      stroke: var(--ux-primary);
      stroke-linecap: round;
      transition: stroke-dashoffset var(--ux-transition-slow) var(--ux-ease);
    }

    .ux-progress-circular__value {
      position: absolute;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    /* Circular Sizes */
    .ux-progress-circular--sm {
      width: 32px;
      height: 32px;
    }

    .ux-progress-circular--sm .ux-progress-circular__value {
      font-size: var(--ux-font-size-xs);
    }

    .ux-progress-circular--md {
      width: 48px;
      height: 48px;
    }

    .ux-progress-circular--lg {
      width: 64px;
      height: 64px;
    }

    .ux-progress-circular--lg .ux-progress-circular__value {
      font-size: var(--ux-font-size-md);
    }

    .ux-progress-circular--xl {
      width: 96px;
      height: 96px;
    }

    .ux-progress-circular--xl .ux-progress-circular__value {
      font-size: var(--ux-font-size-xl);
    }

    /* Circular Indeterminate */
    .ux-progress-circular--indeterminate svg {
      animation: ux-progress-circular-rotate 2s linear infinite;
    }

    .ux-progress-circular--indeterminate .ux-progress-circular__bar {
      animation: ux-progress-circular-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
    }

    @keyframes ux-progress-circular-rotate {
      100% {
        transform: rotate(270deg);
      }
    }

    @keyframes ux-progress-circular-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-progress--indeterminate .ux-progress__bar {
        animation: none;
        width: 100% !important;
        opacity: 0.5;
      }

      .ux-progress--animated .ux-progress__bar {
        animation: none;
      }

      .ux-progress-circular--indeterminate svg {
        animation: none;
      }

      .ux-progress-circular--indeterminate .ux-progress-circular__bar {
        animation: none;
        stroke-dasharray: 90, 150;
      }
    }

    /* Circular Colors */
    .ux-progress-circular--success .ux-progress-circular__bar {
      stroke: var(--ux-success);
    }

    .ux-progress-circular--warning .ux-progress-circular__bar {
      stroke: var(--ux-warning);
    }

    .ux-progress-circular--danger .ux-progress-circular__bar {
      stroke: var(--ux-danger);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-progress-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-progress-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for progress
  // ARIA: role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax
  const progressComponent = (config = {}) => ({
    value: config.value || 0,
    max: config.max || 100,
    min: config.min || 0,
    buffer: config.buffer || 0,
    indeterminate: config.indeterminate || false,
    ariaLabel: config.ariaLabel || 'Progress',

    // ARIA attributes for the progress bar
    get ariaAttrs() {
      const attrs = {
        'role': 'progressbar',
        'aria-label': this.ariaLabel,
        'aria-valuemin': this.min,
        'aria-valuemax': this.max
      };

      // Only set aria-valuenow for determinate progress
      if (!this.indeterminate) {
        attrs['aria-valuenow'] = this.value;
        attrs['aria-valuetext'] = `${Math.round(this.percent)}%`;
      }

      return attrs;
    },

    get percent() {
      return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    },

    get bufferPercent() {
      return Math.min(100, Math.max(0, (this.buffer / this.max) * 100));
    },

    set(value) {
      this.value = Math.min(this.max, Math.max(this.min, value));
    },

    increment(amount = 1) {
      this.set(this.value + amount);
    },

    decrement(amount = 1) {
      this.set(this.value - amount);
    },

    reset() {
      this.value = this.min;
    },

    complete() {
      this.value = this.max;
      // Announce completion to screen readers
      if (window.UX && window.UX.announce) {
        window.UX.announce('Progress complete', 'polite');
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxProgress', progressComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxProgress', progressComponent);
    });
  }
})();
