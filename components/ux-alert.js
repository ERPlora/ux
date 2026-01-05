/**
 * UX Alert Component
 * Alertas y diálogos estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Alert Backdrop
    ======================================== */

    .ux-alert-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       UX Alert (iOS style)
    ======================================== */

    .ux-alert {
      width: 100%;
      max-width: 270px;
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 14px;
      overflow: hidden;
      transform: scale(1.1);
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert-backdrop--open .ux-alert {
      transform: scale(1);
      opacity: 1;
    }

    /* ========================================
       Alert Content
    ======================================== */

    .ux-alert__content {
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-md);
      text-align: center;
    }

    .ux-alert__icon {
      width: 48px;
      height: 48px;
      margin: 0 auto var(--ux-space-md);
    }

    .ux-alert__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-alert__icon--success {
      color: var(--ux-success);
    }

    .ux-alert__icon--warning {
      color: var(--ux-warning);
    }

    .ux-alert__icon--danger {
      color: var(--ux-danger);
    }

    .ux-alert__icon--info {
      color: var(--ux-primary);
    }

    .ux-alert__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-alert__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    /* ========================================
       Alert Inputs
    ======================================== */

    .ux-alert__inputs {
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-alert__input {
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert__input:focus {
      border-color: var(--ux-primary);
    }

    .ux-alert__input + .ux-alert__input {
      margin-top: var(--ux-space-sm);
    }

    /* ========================================
       Alert Buttons
    ======================================== */

    .ux-alert__buttons {
      display: flex;
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-alert__buttons--stacked {
      flex-direction: column;
    }

    .ux-alert__button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      font-weight: 400;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert__button:not(:last-child) {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-alert__buttons--stacked .ux-alert__button:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-alert__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-alert__button:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-alert__button--primary {
      font-weight: 600;
    }

    .ux-alert__button--destructive {
      color: var(--ux-danger);
    }

    .ux-alert__button--destructive:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.05);
    }

    .ux-alert__button--destructive:active {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-alert__button--cancel {
      font-weight: 600;
    }

    /* ========================================
       Alert Variants
    ======================================== */

    /* Wide Alert (Android style) */
    .ux-alert--wide {
      max-width: 320px;
    }

    .ux-alert--wide .ux-alert__content {
      text-align: left;
    }

    .ux-alert--wide .ux-alert__buttons {
      justify-content: flex-end;
      border-top: none;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-alert--wide .ux-alert__button {
      flex: 0 0 auto;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
    }

    .ux-alert--wide .ux-alert__button:not(:last-child) {
      border-right: none;
    }

    /* ========================================
       Inline Alert (Banner)
    ======================================== */

    .ux-alert-banner {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-alert-banner--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
      border-color: var(--ux-success);
    }

    .ux-alert-banner--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
      border-color: var(--ux-warning);
    }

    .ux-alert-banner--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      border-color: var(--ux-danger);
    }

    .ux-alert-banner--info {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      border-color: var(--ux-primary);
    }

    .ux-alert-banner__icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-alert-banner--success .ux-alert-banner__icon {
      color: var(--ux-success);
    }

    .ux-alert-banner--warning .ux-alert-banner__icon {
      color: var(--ux-warning);
    }

    .ux-alert-banner--danger .ux-alert-banner__icon {
      color: var(--ux-danger);
    }

    .ux-alert-banner--info .ux-alert-banner__icon {
      color: var(--ux-primary);
    }

    .ux-alert-banner__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-alert-banner__content {
      flex: 1;
      min-width: 0;
    }

    .ux-alert-banner__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-alert-banner__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .ux-alert-banner__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      flex-shrink: 0;
    }

    .ux-alert-banner__close:hover {
      color: var(--ux-text);
    }

    .ux-alert-banner__close svg {
      width: 16px;
      height: 16px;
    }

    .ux-alert-banner__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-alert-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-alert-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for alert dialog
  // ARIA: role="alertdialog", aria-modal="true", aria-labelledby, aria-describedby
  const alertComponent = (config = {}) => ({
    isOpen: false,
    title: config.title || '',
    message: config.message || '',
    buttons: config.buttons || [],
    inputs: config.inputs || [],
    inputValues: {},
    alertId: config.id || 'ux-alert-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for alert dialog
    get ariaAttrs() {
      return {
        'role': 'alertdialog',
        'aria-modal': 'true',
        'aria-labelledby': this.alertId + '-title',
        'aria-describedby': this.alertId + '-message'
      };
    },

    get titleId() {
      return this.alertId + '-title';
    },

    get messageId() {
      return this.alertId + '-message';
    },

    open(options = {}) {
      if (options.title) this.title = options.title;
      if (options.message) this.message = options.message;
      if (options.buttons) this.buttons = options.buttons;
      if (options.inputs) {
        this.inputs = options.inputs;
        this.inputValues = {};
        options.inputs.forEach((input, i) => {
          this.inputValues[input.name || `input${i}`] = input.value || '';
        });
      }

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    confirm(title, message) {
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          buttons: [
            { text: 'Cancel', role: 'cancel', handler: () => resolve(false) },
            { text: 'OK', role: 'confirm', handler: () => resolve(true) }
          ]
        });
      });
    },

    prompt(title, message, placeholder = '') {
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          inputs: [{ name: 'value', placeholder }],
          buttons: [
            { text: 'Cancel', role: 'cancel', handler: () => resolve(null) },
            { text: 'OK', role: 'confirm', handler: () => resolve(this.inputValues.value) }
          ]
        });
      });
    },

    handleButtonClick(button) {
      if (button.handler && typeof button.handler === 'function') {
        button.handler(this.inputValues);
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAlert', alertComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAlert', alertComponent);
    });
  }

  // Alpine component for inline alert banner
  // ARIA: role="alert" for important messages
  const alertBannerComponent = (config = {}) => ({
    visible: config.visible !== false,
    dismissible: config.dismissible !== false,

    // ARIA role for inline alerts
    get ariaAttrs() {
      return {
        'role': 'alert',
        'aria-live': 'polite'
      };
    },

    dismiss() {
      this.visible = false;
    },

    show() {
      this.visible = true;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAlertBanner', alertBannerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAlertBanner', alertBannerComponent);
    });
  }
})();
