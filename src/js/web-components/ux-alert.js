/**
 * UX Alert Web Component
 * Custom Element for alert/confirm dialogs
 *
 * Usage:
 * <ux-alert id="my-alert" title="Confirm" message="Are you sure?"></ux-alert>
 *
 * <button onclick="document.getElementById('my-alert').show()">Show Alert</button>
 *
 * Or with promise:
 * const result = await document.getElementById('my-alert').confirm();
 */

class UxAlert extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'message', 'variant', 'confirm-text', 'cancel-text', 'type'];
  }

  constructor() {
    super();
    this._isOpen = false;
    this._resolvePromise = null;
    this._onKeydown = this._onKeydown.bind(this);
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'title' || name === 'message') {
      this._updateContent();
    }
  }

  _render() {
    const title = this.getAttribute('title') || '';
    const message = this.getAttribute('message') || '';
    const variant = this.getAttribute('variant') || '';
    const type = this.getAttribute('type') || 'alert'; // alert, confirm
    const confirmText = this.getAttribute('confirm-text') || 'OK';
    const cancelText = this.getAttribute('cancel-text') || 'Cancel';

    const variantClass = variant ? `ux-alert--${variant}` : '';

    this.innerHTML = `
      <div class="ux-alert-backdrop" data-state="closed" role="alertdialog" aria-modal="true" aria-labelledby="ux-alert-title-${this._uniqueId}">
        <div class="ux-alert ${variantClass}">
          ${this._getIcon(variant)}
          ${title ? `<h3 class="ux-alert__title" id="ux-alert-title-${this._uniqueId}">${title}</h3>` : ''}
          ${message ? `<p class="ux-alert__message">${message}</p>` : ''}
          <div class="ux-alert__actions">
            ${type === 'confirm' ? `
              <button class="ux-button ux-button--outline ux-alert__cancel">${cancelText}</button>
            ` : ''}
            <button class="ux-button ux-color-primary ux-alert__confirm">${confirmText}</button>
          </div>
        </div>
      </div>
    `;

    this._backdrop = this.querySelector('.ux-alert-backdrop');
    this._confirmBtn = this.querySelector('.ux-alert__confirm');
    this._cancelBtn = this.querySelector('.ux-alert__cancel');
  }

  get _uniqueId() {
    if (!this.__uniqueId) {
      this.__uniqueId = Math.random().toString(36).substr(2, 9);
    }
    return this.__uniqueId;
  }

  _getIcon(variant) {
    const icons = {
      success: `<div class="ux-alert__icon ux-alert__icon--success">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>`,
      danger: `<div class="ux-alert__icon ux-alert__icon--danger">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>`,
      warning: `<div class="ux-alert__icon ux-alert__icon--warning">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>`,
      info: `<div class="ux-alert__icon ux-alert__icon--info">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>`
    };
    return icons[variant] || '';
  }

  _setupEventListeners() {
    this._confirmBtn?.addEventListener('click', () => this._handleConfirm());
    this._cancelBtn?.addEventListener('click', () => this._handleCancel());
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._onKeydown);
  }

  _onKeydown(e) {
    if (e.key === 'Escape' && this._isOpen) {
      this._handleCancel();
    } else if (e.key === 'Enter' && this._isOpen) {
      this._handleConfirm();
    }
  }

  _handleConfirm() {
    this.hide();
    if (this._resolvePromise) {
      this._resolvePromise(true);
      this._resolvePromise = null;
    }
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
  }

  _handleCancel() {
    this.hide();
    if (this._resolvePromise) {
      this._resolvePromise(false);
      this._resolvePromise = null;
    }
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
  }

  _updateContent() {
    const titleEl = this.querySelector('.ux-alert__title');
    const messageEl = this.querySelector('.ux-alert__message');

    if (titleEl) titleEl.textContent = this.getAttribute('title') || '';
    if (messageEl) messageEl.textContent = this.getAttribute('message') || '';
  }

  // Public API
  show() {
    if (this._isOpen) return;
    this._isOpen = true;

    this._backdrop?.setAttribute('data-state', 'open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._onKeydown);

    this.dispatchEvent(new CustomEvent('show', { bubbles: true }));

    // Focus confirm button
    requestAnimationFrame(() => {
      this._confirmBtn?.focus();
    });
  }

  hide() {
    if (!this._isOpen) return;
    this._isOpen = false;

    this._backdrop?.setAttribute('data-state', 'closed');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._onKeydown);

    this.dispatchEvent(new CustomEvent('hide', { bubbles: true }));
  }

  // Returns a promise that resolves to true (confirm) or false (cancel)
  confirm() {
    return new Promise((resolve) => {
      this._resolvePromise = resolve;
      this.show();
    });
  }

  get isOpen() {
    return this._isOpen;
  }

  // Static helper
  static show(options = {}) {
    const alert = document.createElement('ux-alert');
    if (options.title) alert.setAttribute('title', options.title);
    if (options.message) alert.setAttribute('message', options.message);
    if (options.variant) alert.setAttribute('variant', options.variant);
    if (options.type) alert.setAttribute('type', options.type);
    if (options.confirmText) alert.setAttribute('confirm-text', options.confirmText);
    if (options.cancelText) alert.setAttribute('cancel-text', options.cancelText);
    document.body.appendChild(alert);
    alert.show();
    return alert;
  }

  static async confirm(options = {}) {
    const alert = document.createElement('ux-alert');
    alert.setAttribute('type', 'confirm');
    if (options.title) alert.setAttribute('title', options.title);
    if (options.message) alert.setAttribute('message', options.message);
    if (options.variant) alert.setAttribute('variant', options.variant);
    if (options.confirmText) alert.setAttribute('confirm-text', options.confirmText);
    if (options.cancelText) alert.setAttribute('cancel-text', options.cancelText);
    document.body.appendChild(alert);

    const result = await alert.confirm();

    // Remove from DOM after close animation
    setTimeout(() => alert.remove(), 300);

    return result;
  }
}

// Register the custom element
if (!customElements.get('ux-alert')) {
  customElements.define('ux-alert', UxAlert);
}

export { UxAlert };
