/**
 * UX Segment Component
 * Control segmentado estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Segment
    ======================================== */

    .ux-segment {
      display: inline-flex;
      align-items: stretch;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: 2px;
      position: relative;
    }

    .ux-segment--block {
      display: flex;
      width: 100%;
    }

    /* ========================================
       Segment Button
    ======================================== */

    .ux-segment-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
      min-height: 32px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: transparent;
      border: none;
      color: var(--ux-text-secondary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      border-radius: calc(var(--ux-border-radius) - 2px);
      -webkit-tap-highlight-color: transparent;
      z-index: 1;
    }

    .ux-segment-button:hover:not(.ux-segment-button--selected) {
      color: var(--ux-text);
    }

    .ux-segment-button--selected {
      color: var(--ux-text);
    }

    .ux-segment-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* ========================================
       Segment Indicator (sliding background)
       Ionic-style animation with squish effect
    ======================================== */

    .ux-segment__indicator {
      position: absolute;
      top: 2px;
      bottom: 2px;
      background-color: var(--ux-surface);
      border-radius: calc(var(--ux-border-radius) - 2px);
      box-shadow: var(--ux-shadow-sm);
      transition:
        left 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
        width 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
        transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      z-index: 0;
      will-change: left, width, transform;
    }

    /* Squish animation during transition */
    .ux-segment__indicator--animating {
      animation: ux-segment-squish 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
    }

    @keyframes ux-segment-squish {
      0% {
        transform: scaleX(1) scaleY(1);
      }
      30% {
        transform: scaleX(1.08) scaleY(0.92);
      }
      60% {
        transform: scaleX(0.96) scaleY(1.02);
      }
      100% {
        transform: scaleX(1) scaleY(1);
      }
    }

    /* Subtle press effect on buttons */
    .ux-segment-button:active:not(.ux-segment-button--selected) {
      transform: scale(0.96);
    }

    .ux-segment-button {
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform 150ms var(--ux-ease);
    }

    /* ========================================
       Segment Button Content
    ======================================== */

    .ux-segment-button__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .ux-segment-button__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-segment-button__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-segment-button__icon + .ux-segment-button__label {
      margin-left: var(--ux-space-xs);
    }

    /* Icon only */
    .ux-segment-button--icon-only {
      padding: var(--ux-space-sm);
    }

    .ux-segment-button--icon-only .ux-segment-button__icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Segment Variants
    ======================================== */

    /* Primary */
    .ux-segment--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-segment--primary .ux-segment__indicator {
      background-color: var(--ux-primary);
    }

    .ux-segment--primary .ux-segment-button--selected {
      color: white;
    }

    /* Outline */
    .ux-segment--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
      padding: 0;
    }

    .ux-segment--outline .ux-segment-button {
      border-radius: 0;
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-segment--outline .ux-segment-button:first-child {
      border-radius: calc(var(--ux-border-radius) - 1px) 0 0 calc(var(--ux-border-radius) - 1px);
    }

    .ux-segment--outline .ux-segment-button:last-child {
      border-radius: 0 calc(var(--ux-border-radius) - 1px) calc(var(--ux-border-radius) - 1px) 0;
      border-right: none;
    }

    .ux-segment--outline .ux-segment__indicator {
      top: 0;
      bottom: 0;
      border-radius: calc(var(--ux-border-radius) - 1px);
      box-shadow: none;
      background-color: var(--ux-primary);
    }

    .ux-segment--outline .ux-segment-button--selected {
      color: white;
    }

    /* Rounded Pill */
    .ux-segment--rounded {
      border-radius: 100px;
      padding: 3px;
    }

    .ux-segment--rounded .ux-segment-button {
      border-radius: 100px;
    }

    .ux-segment--rounded .ux-segment__indicator {
      border-radius: 100px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-segment--secondary .ux-segment__indicator {
      background-color: var(--ux-secondary);
    }

    .ux-segment--secondary .ux-segment-button--selected {
      color: var(--ux-secondary-contrast);
    }

    .ux-segment--success .ux-segment__indicator {
      background-color: var(--ux-success);
    }

    .ux-segment--success .ux-segment-button--selected {
      color: var(--ux-success-contrast);
    }

    .ux-segment--danger .ux-segment__indicator {
      background-color: var(--ux-danger);
    }

    .ux-segment--danger .ux-segment-button--selected {
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-segment--sm {
      padding: 2px;
    }

    .ux-segment--sm .ux-segment-button {
      min-height: 28px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
    }

    .ux-segment--sm .ux-segment-button__icon {
      width: 14px;
      height: 14px;
    }

    .ux-segment--lg {
      padding: 3px;
    }

    .ux-segment--lg .ux-segment-button {
      min-height: 44px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
    }

    .ux-segment--lg .ux-segment-button__icon {
      width: 22px;
      height: 22px;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-segment--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       In Toolbar
    ======================================== */

    .ux-toolbar .ux-segment {
      flex: 1;
      max-width: 400px;
    }

    .ux-navbar .ux-segment {
      flex: 0 1 auto;
    }

    /* ========================================
       Scrollable Segment
    ======================================== */

    .ux-segment--scrollable {
      display: flex;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .ux-segment--scrollable::-webkit-scrollbar {
      display: none;
    }

    .ux-segment--scrollable .ux-segment-button {
      flex: 0 0 auto;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-segment-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-segment-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for segment
  const segmentComponent = (config = {}) => ({
    value: config.value || null,
    options: config.options || [],
    disabled: config.disabled || false,
    indicatorStyle: {},
    isAnimating: false,

    init() {
      // Set first option as default if no value
      if (this.value === null && this.options.length > 0) {
        this.value = this.options[0].value;
      }
      this.$nextTick(() => {
        this.updateIndicator(false);
      });
    },

    select(optionValue) {
      if (this.disabled) return;
      const option = this.options.find(o => o.value === optionValue);
      if (option?.disabled) return;
      if (this.value === optionValue) return;

      this.value = optionValue;
      this.updateIndicator(true);
    },

    isSelected(optionValue) {
      return this.value === optionValue;
    },

    updateIndicator(animate = true) {
      const container = this.$refs.segment;
      if (!container) return;

      const buttons = container.querySelectorAll('.ux-segment-button');
      const selectedIndex = this.options.findIndex(o => o.value === this.value);
      const selectedButton = buttons[selectedIndex];

      if (selectedButton) {
        // Trigger squish animation
        if (animate) {
          this.isAnimating = true;
          setTimeout(() => {
            this.isAnimating = false;
          }, 300);
        }

        this.indicatorStyle = {
          left: selectedButton.offsetLeft + 'px',
          width: selectedButton.offsetWidth + 'px'
        };
      }
    },

    get selectedOption() {
      return this.options.find(o => o.value === this.value);
    },

    get selectedIndex() {
      return this.options.findIndex(o => o.value === this.value);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSegment', segmentComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSegment', segmentComponent);
    });
  }
})();
