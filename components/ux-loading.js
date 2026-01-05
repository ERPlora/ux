/**
 * UX Loading Component
 * Loading indicator with backdrop (iOS style)
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Loading Backdrop
    ======================================== */

    .ux-loading-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1200;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 200ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 200ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-loading-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    .ux-loading-backdrop--transparent {
      background-color: transparent;
    }

    /* ========================================
       UX Loading Container
    ======================================== */

    .ux-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      min-width: 100px;
      min-height: 100px;
      padding: var(--ux-space-lg);
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      transform: scale(0.9);
      opacity: 0;
      transition:
        transform 300ms cubic-bezier(0.32, 0.72, 0, 1),
        opacity 200ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-loading-backdrop--open .ux-loading {
      transform: scale(1);
      opacity: 1;
    }

    /* ========================================
       Loading Spinner
    ======================================== */

    .ux-loading__spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-spin 0.8s linear infinite;
    }

    @keyframes ux-loading-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* iOS-style spinner (dots) */
    .ux-loading__spinner--ios {
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      position: relative;
      animation: none;
    }

    .ux-loading__spinner--ios::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23999' stroke-width='3' stroke-linecap='round'%3E%3Cline x1='20' y1='4' x2='20' y2='10' opacity='0.125'/%3E%3Cline x1='32.5' y1='7.5' x2='28.5' y2='11.5' opacity='0.25'/%3E%3Cline x1='36' y1='20' x2='30' y2='20' opacity='0.375'/%3E%3Cline x1='32.5' y1='32.5' x2='28.5' y2='28.5' opacity='0.5'/%3E%3Cline x1='20' y1='36' x2='20' y2='30' opacity='0.625'/%3E%3Cline x1='7.5' y1='32.5' x2='11.5' y2='28.5' opacity='0.75'/%3E%3Cline x1='4' y1='20' x2='10' y2='20' opacity='0.875'/%3E%3Cline x1='7.5' y1='7.5' x2='11.5' y2='11.5' opacity='1'/%3E%3C/g%3E%3C/svg%3E");
      animation: ux-loading-ios-spin 0.8s steps(8) infinite;
    }

    @keyframes ux-loading-ios-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Dots spinner */
    .ux-loading__spinner--dots {
      width: 60px;
      height: 20px;
      border: none;
      display: flex;
      justify-content: center;
      gap: 8px;
      animation: none;
    }

    .ux-loading__spinner--dots::before,
    .ux-loading__spinner--dots::after,
    .ux-loading__dot {
      content: '';
      width: 12px;
      height: 12px;
      background-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-bounce 1.4s ease-in-out infinite both;
    }

    .ux-loading__spinner--dots::before {
      animation-delay: -0.32s;
    }

    .ux-loading__dot {
      animation-delay: -0.16s;
    }

    @keyframes ux-loading-bounce {
      0%, 80%, 100% {
        transform: scale(0.6);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* ========================================
       Loading Message
    ======================================== */

    .ux-loading__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
      max-width: 200px;
    }

    /* ========================================
       Loading Sizes
    ======================================== */

    .ux-loading--sm {
      min-width: 80px;
      min-height: 80px;
      padding: var(--ux-space-md);
    }

    .ux-loading--sm .ux-loading__spinner {
      width: 28px;
      height: 28px;
      border-width: 2px;
    }

    .ux-loading--sm .ux-loading__message {
      font-size: var(--ux-font-size-xs);
    }

    .ux-loading--lg {
      min-width: 140px;
      min-height: 140px;
      padding: var(--ux-space-xl);
    }

    .ux-loading--lg .ux-loading__spinner {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    .ux-loading--lg .ux-loading__message {
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Loading Colors
    ======================================== */

    .ux-loading--dark {
      background-color: rgba(0, 0, 0, 0.85);
    }

    .ux-loading--dark .ux-loading__spinner {
      border-color: rgba(255, 255, 255, 0.2);
      border-top-color: white;
    }

    .ux-loading--dark .ux-loading__message {
      color: rgba(255, 255, 255, 0.8);
    }

    /* ========================================
       Inline Loading
    ======================================== */

    .ux-loading-inline {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-loading-inline__spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-loading-spin 0.8s linear infinite;
    }

    .ux-loading-inline__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Sizes */
    .ux-loading-inline--sm .ux-loading-inline__spinner {
      width: 14px;
      height: 14px;
    }

    .ux-loading-inline--sm .ux-loading-inline__text {
      font-size: var(--ux-font-size-xs);
    }

    .ux-loading-inline--lg .ux-loading-inline__spinner {
      width: 28px;
      height: 28px;
      border-width: 3px;
    }

    /* ========================================
       Full Page Loading
    ======================================== */

    .ux-loading--fullpage {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-background);
      z-index: 9999;
    }

    .ux-loading--fullpage .ux-loading {
      background-color: transparent;
      box-shadow: none;
    }

    /* ========================================
       Loading Overlay (for containers)
    ======================================== */

    .ux-loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--ux-background-rgb, 255, 255, 255), 0.8);
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-loading-overlay--visible {
      opacity: 1;
      visibility: visible;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-loading-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-loading-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for loading
  // ARIA: role="alert", aria-busy for loading state
  const loadingComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    message: config.message || '',
    spinner: config.spinner || 'default', // default, ios, dots
    showBackdrop: config.showBackdrop !== false,
    dismissOnBackdrop: config.dismissOnBackdrop || false,
    loadingId: config.id || 'ux-loading-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'alert',
        'aria-live': 'assertive',
        'aria-busy': this.isOpen ? 'true' : 'false',
        'aria-label': this.message || 'Loading'
      };
    },

    show(options = {}) {
      if (options.message !== undefined) this.message = options.message;
      if (options.spinner) this.spinner = options.spinner;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    hide() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    // Alias methods
    present(options) {
      this.show(options);
    },

    dismiss() {
      this.hide();
    },

    handleBackdropClick(event) {
      if (this.dismissOnBackdrop && event.target === event.currentTarget) {
        this.hide();
      }
    },

    // Show loading with timeout
    showWithTimeout(options = {}, timeout = 30000) {
      this.show(options);

      return new Promise((resolve) => {
        setTimeout(() => {
          this.hide();
          resolve();
        }, timeout);
      });
    },

    // Show loading during async operation
    async during(asyncFn, options = {}) {
      this.show(options);
      try {
        const result = await asyncFn();
        return result;
      } finally {
        this.hide();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxLoading', loadingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxLoading', loadingComponent);
    });
  }

  // Global loading controller (singleton)
  const loadingController = {
    _instance: null,
    _queue: [],

    async create(options = {}) {
      return {
        present: () => this.show(options),
        dismiss: () => this.hide()
      };
    },

    show(options = {}) {
      // Create loading element if it doesn't exist
      if (!this._instance) {
        const container = document.createElement('div');
        container.id = 'ux-loading-controller';
        container.innerHTML = `
          <div class="ux-loading-backdrop"
               :class="{ 'ux-loading-backdrop--open': isOpen }"
               @click="handleBackdropClick($event)"
               x-data="uxLoading()">
            <div class="ux-loading" :class="'ux-loading--' + (size || '')" role="alert" aria-live="assertive">
              <div class="ux-loading__spinner" :class="'ux-loading__spinner--' + spinner"></div>
              <div class="ux-loading__message" x-show="message" x-text="message"></div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      }

      // Show via Alpine
      const el = document.querySelector('#ux-loading-controller [x-data]');
      if (el && el._x_dataStack) {
        const data = el._x_dataStack[0];
        data.show(options);
      }
    },

    hide() {
      const el = document.querySelector('#ux-loading-controller [x-data]');
      if (el && el._x_dataStack) {
        const data = el._x_dataStack[0];
        data.hide();
      }
    }
  };

  // Export to UX namespace
  if (window.UX) {
    window.UX.loading = loadingController;
  }
})();
