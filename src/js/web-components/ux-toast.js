/**
 * UX Toast Web Component
 * Custom Element for toast notifications
 *
 * Usage:
 * <ux-toast message="Saved!" variant="success" duration="3000"></ux-toast>
 *
 * Or programmatically:
 * const toast = document.createElement('ux-toast');
 * toast.setAttribute('message', 'Hello!');
 * document.body.appendChild(toast);
 * toast.show();
 */

class UxToast extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'variant', 'duration', 'position', 'closable'];
  }

  constructor() {
    super();
    this._isVisible = false;
    this._timeout = null;
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();

    // Auto-show if has message
    if (this.getAttribute('message')) {
      requestAnimationFrame(() => this.show());
    }
  }

  disconnectedCallback() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'message') {
      this._updateMessage();
    }
  }

  _render() {
    const message = this.getAttribute('message') || '';
    const variant = this.getAttribute('variant') || '';
    const closable = this.getAttribute('closable') !== 'false';
    const position = this.getAttribute('position') || 'bottom';

    const variantClass = variant ? `ux-toast--${variant}` : '';

    // Set container positioning
    this.style.cssText = `
      position: fixed;
      z-index: var(--ux-z-toast, 800);
      left: 50%;
      transform: translateX(-50%);
      ${position === 'top' ? 'top: var(--ux-space-md, 16px);' : 'bottom: var(--ux-space-md, 16px);'}
      padding: env(safe-area-inset-bottom, 0);
    `;

    this.innerHTML = `
      <div class="ux-toast ${variantClass}" data-state="hidden" role="alert" aria-live="polite">
        ${this._getIcon(variant)}
        <span class="ux-toast__message">${message}</span>
        ${closable ? `
        <button class="ux-toast__close" aria-label="Close">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        ` : ''}
      </div>
    `;

    this._toast = this.querySelector('.ux-toast');
    this._closeBtn = this.querySelector('.ux-toast__close');
  }

  _getIcon(variant) {
    const icons = {
      success: `<svg class="ux-toast__icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>`,
      danger: `<svg class="ux-toast__icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>`,
      warning: `<svg class="ux-toast__icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>`,
      info: `<svg class="ux-toast__icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`
    };
    return icons[variant] || '';
  }

  _setupEventListeners() {
    if (this._closeBtn) {
      this._closeBtn.addEventListener('click', () => this.hide());
    }
  }

  _updateMessage() {
    const messageEl = this.querySelector('.ux-toast__message');
    if (messageEl) {
      messageEl.textContent = this.getAttribute('message') || '';
    }
  }

  // Public API
  show() {
    if (this._isVisible) return;
    this._isVisible = true;

    this._toast?.setAttribute('data-state', 'visible');
    this.dispatchEvent(new CustomEvent('show', { bubbles: true }));

    // Auto-hide after duration
    const duration = parseInt(this.getAttribute('duration') || '3000', 10);
    if (duration > 0) {
      this._timeout = setTimeout(() => this.hide(), duration);
    }
  }

  hide() {
    if (!this._isVisible) return;
    this._isVisible = false;

    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    this._toast?.setAttribute('data-state', 'hidden');
    this.dispatchEvent(new CustomEvent('hide', { bubbles: true }));

    // Remove from DOM after animation
    setTimeout(() => {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }, 300);
  }

  get isVisible() {
    return this._isVisible;
  }

  // Static helper to show toast
  static show(message, options = {}) {
    const toast = document.createElement('ux-toast');
    toast.setAttribute('message', message);
    if (options.variant) toast.setAttribute('variant', options.variant);
    if (options.duration) toast.setAttribute('duration', options.duration);
    if (options.position) toast.setAttribute('position', options.position);
    if (options.closable === false) toast.setAttribute('closable', 'false');
    document.body.appendChild(toast);
    return toast;
  }
}

// Register the custom element
if (!customElements.get('ux-toast')) {
  customElements.define('ux-toast', UxToast);
}

export { UxToast };
