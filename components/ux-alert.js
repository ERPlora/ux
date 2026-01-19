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
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-radius: var(--ux-glass-radius-md);
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
      overflow: hidden;
      transform: scale(1.1);
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-alert {
        background-color: var(--ux-surface);
      }
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
      font-weight: var(--ux-font-weight-semibold);
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
      letter-spacing: -0.01em;
    }

    .ux-alert__message {
      font-size: var(--ux-font-size-base);
      font-weight: var(--ux-font-weight-regular);
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
      border-top: 0.5px solid var(--ux-glass-border);
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
      font-weight: var(--ux-font-weight-regular);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-alert__button:not(:last-child) {
      border-right: 0.5px solid var(--ux-glass-border);
    }

    .ux-alert__buttons--stacked .ux-alert__button:not(:last-child) {
      border-right: none;
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    .ux-alert__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-alert__button:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-alert__button--primary {
      font-weight: var(--ux-font-weight-semibold);
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
      font-weight: var(--ux-font-weight-semibold);
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

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-alert--glass .ux-alert__content {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-alert--glass .ux-alert__footer {
      border-top-color: var(--ux-glass-border);
    }

    .ux-alert-banner--glass {
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-alert-backdrop {
        transition: opacity 0.1s ease, visibility 0.1s ease;
      }

      .ux-alert {
        transition: opacity 0.1s ease;
        transform: none;
      }

      .ux-alert-backdrop--open .ux-alert {
        transform: none;
      }

      .ux-alert__button {
        transition: none;
      }

      .ux-alert__input {
        transition: none;
      }
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

  // ============================================================================
  // Web Component Implementation (Universal - works with React, Vue, HTMX, vanilla JS)
  // Uses Shadow DOM for encapsulation while preserving UX CSS variable system
  // ============================================================================

  class UXAlertElement extends HTMLElement {
    static get observedAttributes() {
      return ['title', 'message', 'type', 'buttons', 'open'];
    }

    constructor() {
      super();

      // Create Shadow DOM for encapsulation
      this.attachShadow({ mode: 'open' });

      this._isOpen = false;
      this._resolver = null;
      this._title = '';
      this._message = '';
      this._type = 'info'; // info, success, warning, danger
      this._buttons = [];
      this._inputs = [];
      this._inputValues = {};
    }

    connectedCallback() {
      // Inject styles into Shadow DOM (uses existing CSS)
      this.shadowRoot.innerHTML = `
        <style>
          /* Import UX CSS variables through shadow boundary */
          :host {
            display: contents;
          }

          /* All existing styles work because they use CSS variables */
          ${styles}
        </style>
        ${this._renderAlert()}
      `;

      this._backdrop = this.shadowRoot.querySelector('.ux-alert-backdrop');

      // Listen for custom events (HTMX integration)
      // Events with composed: true cross shadow boundary
      this.addEventListener('ux:alert', (e) => this._handleAlertEvent(e));
      this.addEventListener('ux:confirm', (e) => this._handleConfirmEvent(e));
      this.addEventListener('ux:prompt', (e) => this._handlePromptEvent(e));
      this.addEventListener('ux:close', () => this.close());

      // Backdrop click to close
      this._backdrop.addEventListener('click', (e) => {
        if (e.target === this._backdrop) {
          this.close(false);
        }
      });

      // Escape key
      this._escapeHandler = (e) => {
        if (this._isOpen && e.key === 'Escape') {
          this.close(false);
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    }

    disconnectedCallback() {
      document.removeEventListener('keydown', this._escapeHandler);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;

      switch (name) {
        case 'title':
          this._title = newValue || '';
          break;
        case 'message':
          this._message = newValue || '';
          break;
        case 'type':
          this._type = newValue || 'info';
          break;
        case 'open':
          if (newValue !== null) {
            this.open();
          } else {
            this.close();
          }
          break;
      }
    }

    // ========================================
    // Public API
    // ========================================

    /**
     * Show alert with options
     * @param {Object} options - { title, message, type, buttons, inputs }
     * @returns {Promise} Resolves with button result or input values
     */
    alert(options = {}) {
      return new Promise((resolve) => {
        this._resolver = resolve;
        this._title = options.title || this._title || '';
        this._message = options.message || this._message || '';
        this._type = options.type || this._type || 'info';
        this._buttons = options.buttons || [{ text: 'OK', role: 'confirm', primary: true }];
        this._inputs = options.inputs || [];
        this._inputValues = {};

        if (this._inputs.length) {
          this._inputs.forEach((input, i) => {
            this._inputValues[input.name || `input${i}`] = input.value || '';
          });
        }

        this._render();
        this._open();
      });
    }

    /**
     * Show confirmation dialog
     * @param {string} title
     * @param {string} message
     * @param {Object} options - { cancelText, okText, destructive }
     * @returns {Promise<boolean>}
     */
    confirm(title, message, options = {}) {
      return this.alert({
        title,
        message,
        type: options.destructive ? 'danger' : 'info',
        buttons: [
          { text: options.cancelText || 'Cancel', role: 'cancel' },
          {
            text: options.okText || 'OK',
            role: 'confirm',
            primary: true,
            destructive: options.destructive
          }
        ]
      }).then(result => result === true);
    }

    /**
     * Show prompt dialog
     * @param {string} title
     * @param {string} message
     * @param {Object} options - { cancelText, okText, placeholder, type, value }
     * @returns {Promise<string|null>}
     */
    prompt(title, message, options = {}) {
      return this.alert({
        title,
        message,
        inputs: [{
          name: 'value',
          type: options.type || 'text',
          placeholder: options.placeholder || '',
          value: options.value || ''
        }],
        buttons: [
          { text: options.cancelText || 'Cancel', role: 'cancel' },
          { text: options.okText || 'OK', role: 'confirm', primary: true }
        ]
      }).then(result => {
        if (result === false) return null;
        return this._inputValues.value;
      });
    }

    /**
     * Open the alert
     */
    open() {
      this._open();
    }

    /**
     * Close the alert
     * @param {*} result - Value to resolve promise with
     */
    close(result = false) {
      if (!this._isOpen) return;

      this._isOpen = false;
      this._backdrop.classList.remove('ux-alert-backdrop--open');

      // Unlock scroll
      if (window.UX) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }

      // Dispatch close event (for HTMX)
      this.dispatchEvent(new CustomEvent('ux:closed', {
        bubbles: true,
        composed: true,
        detail: { result }
      }));

      // Resolve promise
      if (this._resolver) {
        this._resolver(result);
        this._resolver = null;
      }
    }

    // ========================================
    // Private Methods
    // ========================================

    _open() {
      if (this._isOpen) return;

      this._isOpen = true;
      this._backdrop.classList.add('ux-alert-backdrop--open');

      // Lock scroll
      if (window.UX) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Focus first button or input
      setTimeout(() => {
        const firstFocusable = this._backdrop.querySelector('input, button');
        if (firstFocusable) firstFocusable.focus();
      }, 100);

      // Dispatch open event (for HTMX)
      this.dispatchEvent(new CustomEvent('ux:opened', {
        bubbles: true,
        composed: true
      }));
    }

    _render() {
      const alertEl = this._backdrop.querySelector('.ux-alert');
      if (alertEl) {
        alertEl.outerHTML = this._renderAlertContent();
      }
      this._bindButtons();
    }

    _renderAlert() {
      return `<div class="ux-alert-backdrop" role="alertdialog" aria-modal="true">${this._renderAlertContent()}</div>`;
    }

    _renderAlertContent() {
      const iconSvg = this._getIcon();
      const inputsHtml = this._inputs.length ? this._renderInputs() : '';
      const buttonsHtml = this._renderButtons();

      return `
        <div class="ux-alert">
          <div class="ux-alert__content">
            ${iconSvg ? `<div class="ux-alert__icon ux-alert__icon--${this._type}">${iconSvg}</div>` : ''}
            ${this._title ? `<h2 class="ux-alert__title">${this._escapeHtml(this._title)}</h2>` : ''}
            ${this._message ? `<p class="ux-alert__message">${this._escapeHtml(this._message)}</p>` : ''}
          </div>
          ${inputsHtml}
          <div class="ux-alert__buttons">
            ${buttonsHtml}
          </div>
        </div>
      `;
    }

    _renderInputs() {
      return `
        <div class="ux-alert__inputs">
          ${this._inputs.map((input, i) => `
            <input
              class="ux-alert__input"
              type="${input.type || 'text'}"
              name="${input.name || `input${i}`}"
              placeholder="${this._escapeHtml(input.placeholder || '')}"
              value="${this._escapeHtml(input.value || '')}"
            >
          `).join('')}
        </div>
      `;
    }

    _renderButtons() {
      return this._buttons.map((btn, i) => {
        const classes = ['ux-alert__button'];
        if (btn.primary) classes.push('ux-alert__button--primary');
        if (btn.destructive) classes.push('ux-alert__button--destructive');
        if (btn.role === 'cancel') classes.push('ux-alert__button--cancel');

        return `
          <button
            class="${classes.join(' ')}"
            data-role="${btn.role || 'button'}"
            data-index="${i}"
          >${this._escapeHtml(btn.text)}</button>
        `;
      }).join('');
    }

    _bindButtons() {
      this._backdrop.querySelectorAll('.ux-alert__button').forEach((btn) => {
        btn.addEventListener('click', () => {
          const role = btn.dataset.role;
          const index = parseInt(btn.dataset.index, 10);
          const buttonConfig = this._buttons[index];

          // Update input values
          this._backdrop.querySelectorAll('.ux-alert__input').forEach((input) => {
            this._inputValues[input.name] = input.value;
          });

          // Call custom handler if provided
          if (buttonConfig && typeof buttonConfig.handler === 'function') {
            buttonConfig.handler(this._inputValues);
          }

          // Dispatch button event (for HTMX)
          this.dispatchEvent(new CustomEvent('ux:button', {
            bubbles: true,
            composed: true,
            detail: {
              role,
              index,
              values: { ...this._inputValues }
            }
          }));

          // Close with result
          const result = role === 'confirm' || role === 'ok' ? true : false;
          this.close(result);
        });
      });

      // Enter key in inputs
      this._backdrop.querySelectorAll('.ux-alert__input').forEach((input) => {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const confirmBtn = this._backdrop.querySelector('[data-role="confirm"]');
            if (confirmBtn) confirmBtn.click();
          }
        });
        input.addEventListener('input', (e) => {
          this._inputValues[e.target.name] = e.target.value;
        });
      });
    }

    _getIcon() {
      const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>`,
        danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>`,
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>`
      };
      return icons[this._type] || '';
    }

    _escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    // ========================================
    // HTMX Event Handlers
    // ========================================

    _handleAlertEvent(e) {
      const { title, message, type, buttons } = e.detail || {};
      this.alert({ title, message, type, buttons });
    }

    _handleConfirmEvent(e) {
      const { title, message, cancelText, okText, destructive } = e.detail || {};
      this.confirm(title, message, { cancelText, okText, destructive });
    }

    _handlePromptEvent(e) {
      const { title, message, placeholder, cancelText, okText } = e.detail || {};
      this.prompt(title, message, { placeholder, cancelText, okText });
    }

    // ========================================
    // Static Factory Methods
    // ========================================

    /**
     * Show a quick alert (creates temporary element)
     */
    static alert(title, message, type = 'info') {
      return UXAlertElement._showTemporary('alert', { title, message, type });
    }

    /**
     * Show a quick confirm (creates temporary element)
     */
    static confirm(title, message, options = {}) {
      return UXAlertElement._showTemporary('confirm', { title, message, ...options });
    }

    /**
     * Show a quick prompt (creates temporary element)
     */
    static prompt(title, message, options = {}) {
      return UXAlertElement._showTemporary('prompt', { title, message, ...options });
    }

    static _showTemporary(method, options) {
      let alertEl = document.querySelector('ux-alert#ux-alert-global');
      if (!alertEl) {
        alertEl = document.createElement('ux-alert');
        alertEl.id = 'ux-alert-global';
        document.body.appendChild(alertEl);
      }

      if (method === 'alert') {
        return alertEl.alert(options);
      } else if (method === 'confirm') {
        return alertEl.confirm(options.title, options.message, options);
      } else if (method === 'prompt') {
        return alertEl.prompt(options.title, options.message, options);
      }
    }
  }

  // Register Web Component
  if (!customElements.get('ux-alert')) {
    customElements.define('ux-alert', UXAlertElement);
  }

  // Export for programmatic use
  window.UXAlert = UXAlertElement;

  // ============================================================================
  // Alpine.js Component (for backward compatibility)
  // ============================================================================

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

    confirm(title, message, options = {}) {
      const cancelText = options.cancelText || 'Cancel';
      const okText = options.okText || 'OK';
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          buttons: [
            { text: cancelText, role: 'cancel', handler: () => resolve(false) },
            { text: okText, role: 'confirm', handler: () => resolve(true) }
          ]
        });
      });
    },

    prompt(title, message, options = {}) {
      const cancelText = options.cancelText || 'Cancel';
      const okText = options.okText || 'OK';
      const placeholder = options.placeholder || '';
      return new Promise((resolve) => {
        this.open({
          title,
          message,
          inputs: [{ name: 'value', placeholder }],
          buttons: [
            { text: cancelText, role: 'cancel', handler: () => resolve(null) },
            { text: okText, role: 'confirm', handler: () => resolve(this.inputValues.value) }
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
