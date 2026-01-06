/**
 * UX Stepper Component
 * Stepper/Wizard para formularios multi-paso
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Stepper
    ======================================== */

    .ux-stepper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Stepper Header (Steps Indicator)
    ======================================== */

    .ux-stepper__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: var(--ux-space-xl);
      position: relative;
    }

    /* Progress line behind steps */
    .ux-stepper__header::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 40px;
      right: 40px;
      height: 2px;
      background-color: var(--ux-border-color);
      z-index: 0;
    }

    /* ========================================
       Step Item
    ======================================== */

    .ux-stepper__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      flex: 1;
      cursor: pointer;
    }

    .ux-stepper__step--disabled {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Step Circle */
    .ux-stepper__circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text-secondary);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-stepper__step:hover .ux-stepper__circle {
      border-color: var(--ux-primary);
      transform: scale(1.05);
    }

    /* Step Label */
    .ux-stepper__label {
      margin-top: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      text-align: center;
      max-width: 100px;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    /* Step Description */
    .ux-stepper__description {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: center;
      max-width: 120px;
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Step States
    ======================================== */

    /* Active Step */
    .ux-stepper__step--active .ux-stepper__circle {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-stepper__step--active .ux-stepper__label {
      color: var(--ux-primary);
    }

    /* Completed Step */
    .ux-stepper__step--completed .ux-stepper__circle {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
      color: white;
    }

    .ux-stepper__step--completed .ux-stepper__label {
      color: var(--ux-success);
    }

    /* Checkmark icon for completed */
    .ux-stepper__check {
      width: 20px;
      height: 20px;
    }

    /* Error Step */
    .ux-stepper__step--error .ux-stepper__circle {
      background-color: var(--ux-danger);
      border-color: var(--ux-danger);
      color: white;
    }

    .ux-stepper__step--error .ux-stepper__label {
      color: var(--ux-danger);
    }

    /* Disabled Step */
    .ux-stepper__step--disabled .ux-stepper__circle {
      opacity: 0.5;
    }

    .ux-stepper__step--disabled .ux-stepper__label {
      opacity: 0.5;
    }

    /* ========================================
       Progress Line (Completed Portion)
    ======================================== */

    .ux-stepper__progress {
      position: absolute;
      top: 20px;
      left: 40px;
      height: 2px;
      background-color: var(--ux-success);
      z-index: 0;
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    /* ========================================
       Stepper Content
    ======================================== */

    .ux-stepper__content {
      flex: 1;
      min-height: 200px;
    }

    .ux-stepper__panel {
      display: none;
      animation: uxStepperFadeIn var(--ux-transition-base) var(--ux-ease);
    }

    .ux-stepper__panel--active {
      display: block;
    }

    @keyframes uxStepperFadeIn {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ========================================
       Stepper Actions
    ======================================== */

    .ux-stepper__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--ux-space-xl);
      padding-top: var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      gap: var(--ux-space-md);
    }

    .ux-stepper__actions-start {
      display: flex;
      gap: var(--ux-space-sm);
    }

    .ux-stepper__actions-end {
      display: flex;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Vertical Stepper
    ======================================== */

    .ux-stepper--vertical {
      flex-direction: row;
    }

    .ux-stepper--vertical .ux-stepper__header {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 0;
      margin-right: var(--ux-space-xl);
      min-width: 200px;
    }

    .ux-stepper--vertical .ux-stepper__header::before {
      top: 40px;
      bottom: 40px;
      left: 19px;
      right: auto;
      width: 2px;
      height: auto;
    }

    .ux-stepper--vertical .ux-stepper__progress {
      top: 40px;
      left: 19px;
      width: 2px !important;
      height: 0;
    }

    .ux-stepper--vertical .ux-stepper__step {
      flex-direction: row;
      align-items: center;
      margin-bottom: var(--ux-space-xl);
    }

    .ux-stepper--vertical .ux-stepper__step:last-child {
      margin-bottom: 0;
    }

    .ux-stepper--vertical .ux-stepper__label {
      margin-top: 0;
      margin-left: var(--ux-space-md);
      text-align: left;
      max-width: none;
    }

    .ux-stepper--vertical .ux-stepper__description {
      text-align: left;
      margin-left: var(--ux-space-md);
      margin-top: var(--ux-space-xs);
      max-width: none;
    }

    .ux-stepper--vertical .ux-stepper__content {
      flex: 1;
      border-left: 1px solid var(--ux-border-color);
      padding-left: var(--ux-space-xl);
    }

    /* ========================================
       Compact Stepper
    ======================================== */

    .ux-stepper--compact .ux-stepper__circle {
      width: 32px;
      height: 32px;
      font-size: var(--ux-font-size-sm);
    }

    .ux-stepper--compact .ux-stepper__header::before {
      top: 16px;
    }

    .ux-stepper--compact .ux-stepper__progress {
      top: 16px;
    }

    .ux-stepper--compact .ux-stepper__label {
      font-size: var(--ux-font-size-xs);
    }

    .ux-stepper--compact .ux-stepper__check {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Dot Stepper (Minimal)
    ======================================== */

    .ux-stepper--dots .ux-stepper__circle {
      width: 12px;
      height: 12px;
      padding: 0;
    }

    .ux-stepper--dots .ux-stepper__circle span,
    .ux-stepper--dots .ux-stepper__check {
      display: none;
    }

    .ux-stepper--dots .ux-stepper__header::before {
      top: 6px;
    }

    .ux-stepper--dots .ux-stepper__progress {
      top: 6px;
    }

    /* ========================================
       Numbered Progress Bar
    ======================================== */

    .ux-stepper--progress-bar .ux-stepper__header {
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-stepper--progress-bar .ux-stepper__header::before {
      display: none;
    }

    .ux-stepper--progress-bar .ux-stepper__progress-track {
      width: 100%;
      height: 4px;
      background-color: var(--ux-border-color);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-stepper--progress-bar .ux-stepper__progress-fill {
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    .ux-stepper--progress-bar .ux-stepper__steps-row {
      display: flex;
      justify-content: space-between;
    }

    .ux-stepper--progress-bar .ux-stepper__step {
      flex: none;
    }

    .ux-stepper--progress-bar .ux-stepper__circle {
      display: none;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-stepper.ux-color-success .ux-stepper__step--active .ux-stepper__circle {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-stepper.ux-color-success .ux-stepper__step--active .ux-stepper__label {
      color: var(--ux-success);
    }

    .ux-stepper.ux-color-warning .ux-stepper__step--active .ux-stepper__circle {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-stepper.ux-color-warning .ux-stepper__step--active .ux-stepper__label {
      color: var(--ux-warning);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-stepper__header {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: var(--ux-space-sm);
      }

      .ux-stepper__label {
        display: none;
      }

      .ux-stepper__step--active .ux-stepper__label {
        display: block;
      }

      .ux-stepper--vertical {
        flex-direction: column;
      }

      .ux-stepper--vertical .ux-stepper__header {
        flex-direction: row;
        margin-right: 0;
        margin-bottom: var(--ux-space-xl);
        min-width: auto;
      }

      .ux-stepper--vertical .ux-stepper__content {
        border-left: none;
        padding-left: 0;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-stepper__circle,
      .ux-stepper__progress,
      .ux-stepper__panel {
        transition: none;
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-stepper-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-stepper-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for stepper
  const stepperComponent = (config = {}) => ({
    currentStep: config.initialStep || 0,
    totalSteps: config.totalSteps || 3,
    completedSteps: config.completedSteps || [],
    errorSteps: config.errorSteps || [],
    linear: config.linear !== false, // Default: can only go to next step
    allowSkip: config.allowSkip || false,

    init() {
      // Mark previous steps as completed if starting from a later step
      if (this.currentStep > 0 && this.completedSteps.length === 0) {
        for (let i = 0; i < this.currentStep; i++) {
          this.completedSteps.push(i);
        }
      }
    },

    // Navigation
    goTo(step) {
      if (step < 0 || step >= this.totalSteps) return false;

      if (this.linear && !this.allowSkip) {
        // In linear mode, can only go to completed steps or next step
        if (step > this.currentStep + 1) return false;
        if (step > this.currentStep && !this.completedSteps.includes(this.currentStep)) return false;
      }

      this.currentStep = step;
      return true;
    },

    next() {
      if (this.currentStep < this.totalSteps - 1) {
        // Mark current step as completed
        if (!this.completedSteps.includes(this.currentStep)) {
          this.completedSteps.push(this.currentStep);
        }
        // Remove from errors if was there
        this.errorSteps = this.errorSteps.filter(s => s !== this.currentStep);

        this.currentStep++;
        return true;
      }
      return false;
    },

    prev() {
      if (this.currentStep > 0) {
        this.currentStep--;
        return true;
      }
      return false;
    },

    // Step states
    isActive(step) {
      return this.currentStep === step;
    },

    isCompleted(step) {
      return this.completedSteps.includes(step);
    },

    isError(step) {
      return this.errorSteps.includes(step);
    },

    canGoTo(step) {
      if (!this.linear) return true;
      return step <= this.currentStep || this.completedSteps.includes(step - 1);
    },

    // Mark step states
    complete(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      if (!this.completedSteps.includes(targetStep)) {
        this.completedSteps.push(targetStep);
      }
      this.errorSteps = this.errorSteps.filter(s => s !== targetStep);
    },

    setError(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      if (!this.errorSteps.includes(targetStep)) {
        this.errorSteps.push(targetStep);
      }
      this.completedSteps = this.completedSteps.filter(s => s !== targetStep);
    },

    clearError(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      this.errorSteps = this.errorSteps.filter(s => s !== targetStep);
    },

    // Progress
    get progress() {
      return (this.completedSteps.length / this.totalSteps) * 100;
    },

    get progressWidth() {
      if (this.totalSteps <= 1) return '0%';
      const stepWidth = 100 / (this.totalSteps - 1);
      return `${Math.min(this.completedSteps.length * stepWidth, 100)}%`;
    },

    // Utility
    get isFirst() {
      return this.currentStep === 0;
    },

    get isLast() {
      return this.currentStep === this.totalSteps - 1;
    },

    get allCompleted() {
      return this.completedSteps.length === this.totalSteps;
    },

    reset() {
      this.currentStep = 0;
      this.completedSteps = [];
      this.errorSteps = [];
    },

    // Get step classes
    getStepClasses(step) {
      return {
        'ux-stepper__step--active': this.isActive(step),
        'ux-stepper__step--completed': this.isCompleted(step),
        'ux-stepper__step--error': this.isError(step),
        'ux-stepper__step--disabled': !this.canGoTo(step)
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxStepper', stepperComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxStepper', stepperComponent);
    });
  }
})();
