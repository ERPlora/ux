/**
 * UX Form Wizard Component
 * Multi-step form wizard with validation support
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Form Wizard
    ======================================== */

    .ux-form-wizard {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Steps Progress Indicator
    ======================================== */

    .ux-form-wizard__steps {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      position: relative;
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0 0;
    }

    /* Connector line behind steps */
    .ux-form-wizard__steps::before {
      content: '';
      position: absolute;
      top: calc(var(--ux-space-lg) + 18px);
      left: calc(var(--ux-space-xl) + 18px);
      right: calc(var(--ux-space-xl) + 18px);
      height: 2px;
      background-color: var(--ux-border-color);
      z-index: 0;
    }

    /* Progress line (completed portion) */
    .ux-form-wizard__progress-line {
      position: absolute;
      top: calc(var(--ux-space-lg) + 18px);
      left: calc(var(--ux-space-xl) + 18px);
      height: 2px;
      background-color: var(--ux-primary);
      z-index: 1;
      transition: width var(--ux-transition-normal) var(--ux-ease-out);
    }

    /* ========================================
       Individual Step
    ======================================== */

    .ux-form-wizard__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
      flex: 1;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-form-wizard__step--disabled {
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-form-wizard__step--clickable {
      cursor: pointer;
    }

    /* Step indicator (circle with number/icon) */
    .ux-form-wizard__step-indicator {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease-out),
        border-color var(--ux-transition-fast) var(--ux-ease-out),
        color var(--ux-transition-fast) var(--ux-ease-out),
        transform var(--ux-transition-fast) var(--ux-ease-out),
        box-shadow var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-form-wizard__step:hover:not(.ux-form-wizard__step--disabled) .ux-form-wizard__step-indicator {
      border-color: var(--ux-primary);
      transform: scale(1.08);
    }

    .ux-form-wizard__step-indicator svg {
      width: 18px;
      height: 18px;
    }

    /* Step label */
    .ux-form-wizard__step-label {
      margin-top: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      text-align: center;
      max-width: 100px;
      line-height: 1.3;
      transition: color var(--ux-transition-fast) var(--ux-ease-out);
    }

    /* Step description (optional) */
    .ux-form-wizard__step-description {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: center;
      max-width: 120px;
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Step States
    ======================================== */

    /* Active step */
    .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      box-shadow: 0 2px 8px rgba(var(--ux-primary-rgb), 0.35);
    }

    .ux-form-wizard__step--active .ux-form-wizard__step-label {
      color: var(--ux-primary);
      font-weight: 600;
    }

    /* Completed step */
    .ux-form-wizard__step--completed .ux-form-wizard__step-indicator {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-form-wizard__step--completed .ux-form-wizard__step-label {
      color: var(--ux-success);
    }

    /* Error step */
    .ux-form-wizard__step--error .ux-form-wizard__step-indicator {
      background-color: var(--ux-danger);
      border-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
      animation: uxFormWizardShake 0.4s ease-out;
    }

    .ux-form-wizard__step--error .ux-form-wizard__step-label {
      color: var(--ux-danger);
    }

    @keyframes uxFormWizardShake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-4px); }
      40%, 80% { transform: translateX(4px); }
    }

    /* Disabled step */
    .ux-form-wizard__step--disabled .ux-form-wizard__step-indicator {
      opacity: 0.5;
    }

    .ux-form-wizard__step--disabled .ux-form-wizard__step-label {
      opacity: 0.5;
    }

    /* ========================================
       Step Content Area
    ======================================== */

    .ux-form-wizard__content {
      flex: 1;
      padding: var(--ux-space-xl);
      min-height: 200px;
    }

    .ux-form-wizard__panel {
      display: none;
      animation: uxFormWizardFadeIn var(--ux-transition-normal) var(--ux-ease-out);
    }

    .ux-form-wizard__panel--active {
      display: block;
    }

    @keyframes uxFormWizardFadeIn {
      from {
        opacity: 0;
        transform: translateX(16px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Panel header */
    .ux-form-wizard__panel-header {
      margin-bottom: var(--ux-space-xl);
    }

    .ux-form-wizard__panel-title {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs) 0;
    }

    .ux-form-wizard__panel-subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* Panel body (form fields) */
    .ux-form-wizard__panel-body {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-lg);
    }

    /* ========================================
       Actions (Navigation Buttons)
    ======================================== */

    .ux-form-wizard__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface-secondary);
      border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      gap: var(--ux-space-md);
    }

    .ux-form-wizard__actions-start {
      display: flex;
      gap: var(--ux-space-sm);
    }

    .ux-form-wizard__actions-end {
      display: flex;
      gap: var(--ux-space-sm);
    }

    /* Progress text in actions */
    .ux-form-wizard__progress-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-left: auto;
      margin-right: auto;
    }

    /* ========================================
       Vertical Variant (Sidebar Steps)
    ======================================== */

    .ux-form-wizard--vertical {
      flex-direction: row;
    }

    .ux-form-wizard--vertical .ux-form-wizard__steps {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      min-width: 220px;
      max-width: 280px;
      padding: var(--ux-space-xl);
      border-bottom: none;
      border-right: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg) 0 0 var(--ux-border-radius-lg);
      gap: var(--ux-space-md);
    }

    /* Vertical connector line */
    .ux-form-wizard--vertical .ux-form-wizard__steps::before {
      top: calc(var(--ux-space-xl) + 18px);
      bottom: calc(var(--ux-space-xl) + 18px);
      left: calc(var(--ux-space-xl) + 17px);
      right: auto;
      width: 2px;
      height: auto;
    }

    .ux-form-wizard--vertical .ux-form-wizard__progress-line {
      top: calc(var(--ux-space-xl) + 18px);
      left: calc(var(--ux-space-xl) + 17px);
      width: 2px !important;
      height: 0;
      transition: height var(--ux-transition-normal) var(--ux-ease-out);
    }

    .ux-form-wizard--vertical .ux-form-wizard__step {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .ux-form-wizard--vertical .ux-form-wizard__step-label {
      margin-top: 0;
      margin-left: var(--ux-space-md);
      text-align: left;
      max-width: none;
    }

    .ux-form-wizard--vertical .ux-form-wizard__step-description {
      text-align: left;
      margin-left: var(--ux-space-md);
      margin-top: var(--ux-space-xs);
      max-width: none;
    }

    .ux-form-wizard--vertical .ux-form-wizard__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0;
    }

    .ux-form-wizard--vertical .ux-form-wizard__content {
      flex: 1;
      border-radius: 0 var(--ux-border-radius-lg) 0 0;
    }

    .ux-form-wizard--vertical .ux-form-wizard__actions {
      border-radius: 0 0 var(--ux-border-radius-lg) 0;
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-form-wizard--compact .ux-form-wizard__steps {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    .ux-form-wizard--compact .ux-form-wizard__step-indicator {
      width: 28px;
      height: 28px;
      font-size: var(--ux-font-size-xs);
    }

    .ux-form-wizard--compact .ux-form-wizard__step-indicator svg {
      width: 14px;
      height: 14px;
    }

    .ux-form-wizard--compact .ux-form-wizard__steps::before {
      top: calc(var(--ux-space-md) + 14px);
    }

    .ux-form-wizard--compact .ux-form-wizard__progress-line {
      top: calc(var(--ux-space-md) + 14px);
    }

    .ux-form-wizard--compact .ux-form-wizard__step-label {
      font-size: var(--ux-font-size-xs);
    }

    .ux-form-wizard--compact .ux-form-wizard__content {
      padding: var(--ux-space-lg);
    }

    .ux-form-wizard--compact .ux-form-wizard__actions {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    /* ========================================
       Dots Variant (Minimal Progress)
    ======================================== */

    .ux-form-wizard--dots .ux-form-wizard__steps {
      justify-content: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
    }

    .ux-form-wizard--dots .ux-form-wizard__steps::before {
      display: none;
    }

    .ux-form-wizard--dots .ux-form-wizard__progress-line {
      display: none;
    }

    .ux-form-wizard--dots .ux-form-wizard__step {
      flex: none;
    }

    .ux-form-wizard--dots .ux-form-wizard__step-indicator {
      width: 10px;
      height: 10px;
      border-width: 0;
      background-color: var(--ux-border-color);
    }

    .ux-form-wizard--dots .ux-form-wizard__step-indicator span,
    .ux-form-wizard--dots .ux-form-wizard__step-indicator svg {
      display: none;
    }

    .ux-form-wizard--dots .ux-form-wizard__step-label {
      display: none;
    }

    .ux-form-wizard--dots .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      transform: scale(1.3);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-form-wizard--glass {
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-form-wizard--glass .ux-form-wizard__steps {
      background: var(--ux-glass-bg-thin);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-form-wizard--glass .ux-form-wizard__step-indicator {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    .ux-form-wizard--glass .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-form-wizard--glass .ux-form-wizard__step--completed .ux-form-wizard__step-indicator {
      background: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-form-wizard--glass .ux-form-wizard__step--error .ux-form-wizard__step-indicator {
      background: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-form-wizard--glass .ux-form-wizard__content {
      background: transparent;
    }

    .ux-form-wizard--glass .ux-form-wizard__actions {
      background: var(--ux-glass-bg-thin);
      border-top-color: var(--ux-glass-border);
    }

    .ux-form-wizard--glass.ux-form-wizard--vertical .ux-form-wizard__steps {
      border-right-color: var(--ux-glass-border);
    }

    /* ========================================
       Borderless Variant
    ======================================== */

    .ux-form-wizard--borderless {
      background: transparent;
    }

    .ux-form-wizard--borderless .ux-form-wizard__steps {
      background: transparent;
      border-bottom: none;
    }

    .ux-form-wizard--borderless .ux-form-wizard__actions {
      background: transparent;
      border-top: none;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-form-wizard.ux-color-success .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      background-color: var(--ux-success);
      border-color: var(--ux-success);
      box-shadow: 0 2px 8px rgba(var(--ux-success-rgb), 0.35);
    }

    .ux-form-wizard.ux-color-success .ux-form-wizard__step--active .ux-form-wizard__step-label {
      color: var(--ux-success);
    }

    .ux-form-wizard.ux-color-success .ux-form-wizard__progress-line {
      background-color: var(--ux-success);
    }

    .ux-form-wizard.ux-color-warning .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      background-color: var(--ux-warning);
      border-color: var(--ux-warning);
      box-shadow: 0 2px 8px rgba(var(--ux-warning-rgb), 0.35);
    }

    .ux-form-wizard.ux-color-warning .ux-form-wizard__step--active .ux-form-wizard__step-label {
      color: var(--ux-warning);
    }

    .ux-form-wizard.ux-color-warning .ux-form-wizard__progress-line {
      background-color: var(--ux-warning);
    }

    .ux-form-wizard.ux-color-tertiary .ux-form-wizard__step--active .ux-form-wizard__step-indicator {
      background-color: var(--ux-tertiary);
      border-color: var(--ux-tertiary);
      box-shadow: 0 2px 8px rgba(var(--ux-tertiary-rgb), 0.35);
    }

    .ux-form-wizard.ux-color-tertiary .ux-form-wizard__step--active .ux-form-wizard__step-label {
      color: var(--ux-tertiary);
    }

    .ux-form-wizard.ux-color-tertiary .ux-form-wizard__progress-line {
      background-color: var(--ux-tertiary);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-form-wizard__steps {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: var(--ux-space-md) var(--ux-space-lg);
      }

      .ux-form-wizard__steps::-webkit-scrollbar {
        display: none;
      }

      .ux-form-wizard__step-label {
        display: none;
      }

      .ux-form-wizard__step--active .ux-form-wizard__step-label {
        display: block;
      }

      .ux-form-wizard__step-description {
        display: none;
      }

      .ux-form-wizard__content {
        padding: var(--ux-space-lg);
      }

      .ux-form-wizard__actions {
        padding: var(--ux-space-md) var(--ux-space-lg);
        flex-wrap: wrap;
      }

      .ux-form-wizard__progress-text {
        width: 100%;
        text-align: center;
        order: -1;
        margin-bottom: var(--ux-space-sm);
      }

      /* Vertical becomes horizontal on mobile */
      .ux-form-wizard--vertical {
        flex-direction: column;
      }

      .ux-form-wizard--vertical .ux-form-wizard__steps {
        flex-direction: row;
        min-width: auto;
        max-width: none;
        border-right: none;
        border-bottom: 1px solid var(--ux-border-color);
        border-radius: var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0 0;
      }

      .ux-form-wizard--vertical .ux-form-wizard__steps::before {
        top: calc(var(--ux-space-md) + 18px);
        bottom: auto;
        left: calc(var(--ux-space-lg) + 18px);
        right: calc(var(--ux-space-lg) + 18px);
        width: auto;
        height: 2px;
      }

      .ux-form-wizard--vertical .ux-form-wizard__progress-line {
        top: calc(var(--ux-space-md) + 18px);
        left: calc(var(--ux-space-lg) + 18px);
        width: 0 !important;
        height: 2px !important;
      }

      .ux-form-wizard--vertical .ux-form-wizard__step {
        flex-direction: column;
      }

      .ux-form-wizard--vertical .ux-form-wizard__step-label {
        margin-left: 0;
        margin-top: var(--ux-space-sm);
        text-align: center;
      }

      .ux-form-wizard--vertical .ux-form-wizard__body {
        border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      }

      .ux-form-wizard--vertical .ux-form-wizard__content {
        border-radius: 0;
      }

      .ux-form-wizard--vertical .ux-form-wizard__actions {
        border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-form-wizard {
        background-color: var(--ux-surface);
      }

      .ux-form-wizard__steps {
        background-color: var(--ux-surface-secondary);
      }

      .ux-form-wizard__actions {
        background-color: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-form-wizard {
      background-color: var(--ux-surface);
    }

    .ux-dark .ux-form-wizard__steps {
      background-color: var(--ux-surface-secondary);
    }

    .ux-dark .ux-form-wizard__actions {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-form-wizard__step-indicator,
      .ux-form-wizard__progress-line,
      .ux-form-wizard__panel {
        transition: none;
        animation: none;
      }

      .ux-form-wizard__step--error .ux-form-wizard__step-indicator {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-form-wizard-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-form-wizard-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // SVG icons
  const icons = {
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  };

  // Alpine component for form wizard
  const formWizardComponent = (config = {}) => ({
    // State
    currentStep: config.initialStep || 0,
    totalSteps: config.totalSteps || 3,
    steps: config.steps || [],
    completedSteps: config.completedSteps || [],
    errorSteps: config.errorSteps || [],
    isVertical: config.vertical || false,

    // Configuration
    linear: config.linear !== false, // Default: must complete steps in order
    allowSkip: config.allowSkip || false,
    validateOnNext: config.validateOnNext !== false, // Default: validate before advancing
    showProgressText: config.showProgressText || false,

    // Validation callback (can be overridden)
    validateStep: config.validateStep || null,

    // Lifecycle
    init() {
      // Initialize totalSteps from steps array if provided
      if (this.steps.length > 0 && !config.totalSteps) {
        this.totalSteps = this.steps.length;
      }

      // Auto-complete previous steps if starting from later step
      if (this.currentStep > 0 && this.completedSteps.length === 0) {
        for (let i = 0; i < this.currentStep; i++) {
          this.completedSteps.push(i);
        }
      }

      // Dispatch init event
      this.$dispatch('form-wizard:init', { currentStep: this.currentStep, totalSteps: this.totalSteps });
    },

    // Navigation methods
    async nextStep() {
      if (this.currentStep >= this.totalSteps - 1) return false;

      // Validate current step before advancing
      if (this.validateOnNext && this.validateStep) {
        const isValid = await this.validateStep(this.currentStep);
        if (!isValid) {
          this.setError(this.currentStep);
          this.$dispatch('form-wizard:validation-error', { step: this.currentStep });
          return false;
        }
      }

      // Mark current step as completed
      this.complete(this.currentStep);

      // Move to next step
      this.currentStep++;
      this.$dispatch('form-wizard:step-change', { step: this.currentStep, direction: 'next' });
      return true;
    },

    prevStep() {
      if (this.currentStep <= 0) return false;

      this.currentStep--;
      this.$dispatch('form-wizard:step-change', { step: this.currentStep, direction: 'prev' });
      return true;
    },

    goToStep(step) {
      if (step < 0 || step >= this.totalSteps) return false;

      // In linear mode, restrict navigation
      if (this.linear && !this.allowSkip) {
        // Can only go to completed steps or next available step
        if (step > this.currentStep + 1) return false;
        if (step > this.currentStep && !this.completedSteps.includes(this.currentStep)) return false;
      }

      const direction = step > this.currentStep ? 'next' : 'prev';
      this.currentStep = step;
      this.$dispatch('form-wizard:step-change', { step: this.currentStep, direction });
      return true;
    },

    // Step state methods
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
      if (!this.linear || this.allowSkip) return true;
      return step <= this.currentStep || this.completedSteps.includes(step - 1);
    },

    // Mark step states
    complete(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      if (!this.completedSteps.includes(targetStep)) {
        this.completedSteps.push(targetStep);
      }
      // Remove from errors
      this.clearError(targetStep);
      this.$dispatch('form-wizard:step-completed', { step: targetStep });
    },

    setError(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      if (!this.errorSteps.includes(targetStep)) {
        this.errorSteps.push(targetStep);
      }
      // Remove from completed
      this.completedSteps = this.completedSteps.filter(s => s !== targetStep);
      this.$dispatch('form-wizard:step-error', { step: targetStep });
    },

    clearError(step = null) {
      const targetStep = step !== null ? step : this.currentStep;
      this.errorSteps = this.errorSteps.filter(s => s !== targetStep);
    },

    // Get step classes for template binding
    getStepClasses(step) {
      return {
        'ux-form-wizard__step--active': this.isActive(step),
        'ux-form-wizard__step--completed': this.isCompleted(step) && !this.isActive(step),
        'ux-form-wizard__step--error': this.isError(step),
        'ux-form-wizard__step--disabled': !this.canGoTo(step),
        'ux-form-wizard__step--clickable': this.canGoTo(step)
      };
    },

    // Get icon for step indicator
    getStepIcon(step) {
      if (this.isError(step)) return icons.error;
      if (this.isCompleted(step) && !this.isActive(step)) return icons.check;
      return null;
    },

    // Progress calculation
    get progress() {
      return Math.round((this.completedSteps.length / this.totalSteps) * 100);
    },

    get progressWidth() {
      if (this.totalSteps <= 1) return '0%';
      const stepWidth = 100 / (this.totalSteps - 1);
      return `${Math.min(this.completedSteps.length * stepWidth, 100)}%`;
    },

    get progressHeight() {
      // For vertical layout
      if (this.totalSteps <= 1) return '0%';
      const stepHeight = 100 / (this.totalSteps - 1);
      return `${Math.min(this.completedSteps.length * stepHeight, 100)}%`;
    },

    // Utility getters
    get isFirst() {
      return this.currentStep === 0;
    },

    get isLast() {
      return this.currentStep === this.totalSteps - 1;
    },

    get allCompleted() {
      return this.completedSteps.length === this.totalSteps;
    },

    get progressText() {
      return `Step ${this.currentStep + 1} of ${this.totalSteps}`;
    },

    get currentStepData() {
      return this.steps[this.currentStep] || null;
    },

    // Reset wizard
    reset() {
      this.currentStep = 0;
      this.completedSteps = [];
      this.errorSteps = [];
      this.$dispatch('form-wizard:reset');
    },

    // Submit handler (for final step)
    async submit() {
      // Validate final step
      if (this.validateOnNext && this.validateStep) {
        const isValid = await this.validateStep(this.currentStep);
        if (!isValid) {
          this.setError(this.currentStep);
          this.$dispatch('form-wizard:validation-error', { step: this.currentStep });
          return false;
        }
      }

      // Mark final step as completed
      this.complete(this.currentStep);
      this.$dispatch('form-wizard:submit', { completedSteps: this.completedSteps });
      return true;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxFormWizard', formWizardComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxFormWizard', formWizardComponent);
    });
  }
})();
