/**
 * UX Fullscreen Modal Component
 * Full-screen modal dialog for immersive experiences
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Fullscreen Modal
    ======================================== */

    .ux-fullscreen-modal {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      display: flex;
      flex-direction: column;
      background: var(--ux-surface);
      font-family: var(--ux-font-family);
      opacity: 0;
      visibility: hidden;
      transform: translateY(100%);
      transition: transform var(--ux-transition-slow) var(--ux-ease-out),
                  opacity var(--ux-transition-slow),
                  visibility var(--ux-transition-slow);
    }

    .ux-fullscreen-modal--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* ========================================
       Animation Variants
    ======================================== */

    /* Slide from right */
    .ux-fullscreen-modal--slide-right {
      transform: translateX(100%);
    }

    .ux-fullscreen-modal--slide-right.ux-fullscreen-modal--open {
      transform: translateX(0);
    }

    /* Slide from left */
    .ux-fullscreen-modal--slide-left {
      transform: translateX(-100%);
    }

    .ux-fullscreen-modal--slide-left.ux-fullscreen-modal--open {
      transform: translateX(0);
    }

    /* Fade only */
    .ux-fullscreen-modal--fade {
      transform: none;
    }

    /* Scale */
    .ux-fullscreen-modal--scale {
      transform: scale(0.9);
    }

    .ux-fullscreen-modal--scale.ux-fullscreen-modal--open {
      transform: scale(1);
    }

    /* ========================================
       Header
    ======================================== */

    .ux-fullscreen-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      padding-top: max(var(--ux-space-sm), var(--ux-safe-top));
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
      flex-shrink: 0;
    }

    .ux-fullscreen-modal__header-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      min-width: 44px;
    }

    .ux-fullscreen-modal__header-center {
      flex: 1;
      text-align: center;
      min-width: 0;
    }

    .ux-fullscreen-modal__header-end {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      min-width: 44px;
    }

    .ux-fullscreen-modal__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-fullscreen-modal__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Close Button
    ======================================== */

    .ux-fullscreen-modal__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 50%;
      color: var(--ux-text);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-fullscreen-modal__close:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-fullscreen-modal__close:active {
      background: var(--ux-surface-tertiary);
    }

    .ux-fullscreen-modal__close svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Content
    ======================================== */

    .ux-fullscreen-modal__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }

    .ux-fullscreen-modal__content-inner {
      padding: var(--ux-space-md);
    }

    /* Content variants */
    .ux-fullscreen-modal__content--padded {
      padding: var(--ux-space-lg);
    }

    .ux-fullscreen-modal__content--centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-fullscreen-modal__content--constrained {
      max-width: 800px;
      margin: 0 auto;
    }

    /* ========================================
       Footer
    ======================================== */

    .ux-fullscreen-modal__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      padding-bottom: max(var(--ux-space-md), var(--ux-safe-bottom));
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
      flex-shrink: 0;
    }

    .ux-fullscreen-modal__footer--sticky {
      position: sticky;
      bottom: 0;
    }

    .ux-fullscreen-modal__footer--spaced {
      justify-content: space-between;
    }

    /* ========================================
       Toolbar Variant
    ======================================== */

    .ux-fullscreen-modal--toolbar .ux-fullscreen-modal__header {
      border-bottom: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    /* ========================================
       Transparent Header
    ======================================== */

    .ux-fullscreen-modal--transparent-header .ux-fullscreen-modal__header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
      border-bottom: none;
      color: white;
      z-index: 10;
    }

    .ux-fullscreen-modal--transparent-header .ux-fullscreen-modal__title {
      color: white;
    }

    .ux-fullscreen-modal--transparent-header .ux-fullscreen-modal__close {
      color: white;
    }

    .ux-fullscreen-modal--transparent-header .ux-fullscreen-modal__close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-fullscreen-modal--transparent-header .ux-fullscreen-modal__content {
      padding-top: 56px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-fullscreen-modal--dark {
      background: var(--ux-gray-900);
      color: white;
    }

    .ux-fullscreen-modal--dark .ux-fullscreen-modal__header {
      background: var(--ux-gray-900);
      border-color: var(--ux-gray-700);
    }

    .ux-fullscreen-modal--dark .ux-fullscreen-modal__title {
      color: white;
    }

    .ux-fullscreen-modal--dark .ux-fullscreen-modal__close {
      color: white;
    }

    .ux-fullscreen-modal--dark .ux-fullscreen-modal__close:hover {
      background: var(--ux-gray-800);
    }

    .ux-fullscreen-modal--dark .ux-fullscreen-modal__footer {
      background: var(--ux-gray-900);
      border-color: var(--ux-gray-700);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-fullscreen-modal--glass {
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
    }

    .ux-fullscreen-modal--glass .ux-fullscreen-modal__header {
      background: transparent;
      border-color: var(--ux-glass-border);
    }

    .ux-fullscreen-modal--glass .ux-fullscreen-modal__footer {
      background: transparent;
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-fullscreen-modal--loading .ux-fullscreen-modal__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-fullscreen-modal__loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-fullscreen-modal__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-fullscreen-modal-spin 0.8s linear infinite;
    }

    @keyframes ux-fullscreen-modal-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       With Backdrop
    ======================================== */

    .ux-fullscreen-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: calc(var(--ux-z-modal) - 1);
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-normal), visibility var(--ux-transition-normal);
    }

    .ux-fullscreen-modal-backdrop--visible {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       Steps / Progress Header
    ======================================== */

    .ux-fullscreen-modal__steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) 0;
    }

    .ux-fullscreen-modal__step-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ux-gray-300);
      transition: all var(--ux-transition-fast);
    }

    .ux-fullscreen-modal__step-dot--active {
      background: var(--ux-primary);
      transform: scale(1.25);
    }

    .ux-fullscreen-modal__step-dot--completed {
      background: var(--ux-primary);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-fullscreen-modal__step-dot {
        background: var(--ux-gray-600);
      }
    }

    .ux-dark .ux-fullscreen-modal__step-dot {
      background: var(--ux-gray-600);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-fullscreen-modal {
        transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
        transform: none !important;
      }

      .ux-fullscreen-modal__spinner {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-fullscreen-modal-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-fullscreen-modal-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const fullscreenModalData = (options = {}) => ({
    isOpen: false,
    loading: options.loading ?? false,
    closeOnEscape: options.closeOnEscape ?? true,
    animation: options.animation ?? 'slide-up', // slide-up, slide-right, slide-left, fade, scale
    showBackdrop: options.showBackdrop ?? false,
    currentStep: options.currentStep ?? 0,
    totalSteps: options.totalSteps ?? 0,

    init() {
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }
    },

    destroy() {
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
    },

    open() {
      this.isOpen = true;

      if (window.UX) {
        window.UX.lockScroll();
      }

      this.$dispatch('fullscreenmodal:open');

      // Focus first focusable element
      this.$nextTick(() => {
        const focusable = this.$el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
          focusable.focus();
        }
      });
    },

    close() {
      this.isOpen = false;

      if (window.UX) {
        window.UX.unlockScroll();
      }

      this.$dispatch('fullscreenmodal:close');
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    setLoading(value) {
      this.loading = value;
    },

    // Step navigation for multi-step modals
    nextStep() {
      if (this.currentStep < this.totalSteps - 1) {
        this.currentStep++;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    goToStep(step) {
      if (step >= 0 && step < this.totalSteps) {
        this.currentStep = step;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    isStepActive(step) {
      return step === this.currentStep;
    },

    isStepCompleted(step) {
      return step < this.currentStep;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxFullscreenModal', fullscreenModalData);
  }

})();
