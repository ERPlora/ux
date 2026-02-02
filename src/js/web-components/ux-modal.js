/**
 * UX Modal Web Component
 * Custom Element for modal dialogs
 *
 * Usage:
 * <ux-modal id="my-modal" title="Hello">
 *   <p>Modal content here</p>
 * </ux-modal>
 *
 * <button onclick="document.getElementById('my-modal').open()">Open</button>
 */

class UxModal extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'open', 'closable', 'size'];
  }

  constructor() {
    super();
    this._isOpen = false;
    this._onKeydown = this._onKeydown.bind(this);
    this._onBackdropClick = this._onBackdropClick.bind(this);
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();

    // Check if should open on load
    if (this.hasAttribute('open')) {
      this.open();
    }
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'title':
        this._updateTitle();
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

  _render() {
    const title = this.getAttribute('title') || '';
    const closable = this.getAttribute('closable') !== 'false';
    const size = this.getAttribute('size') || '';

    const sizeClass = size ? `ux-modal--${size}` : '';

    // Move existing content to a fragment
    const content = document.createDocumentFragment();
    while (this.firstChild) {
      content.appendChild(this.firstChild);
    }

    this.innerHTML = `
      <div class="ux-modal-backdrop" data-state="closed" role="dialog" aria-modal="true" aria-labelledby="ux-modal-title-${this._uniqueId}">
        <div class="ux-modal ${sizeClass}">
          ${title || closable ? `
          <div class="ux-modal__header">
            ${title ? `<h2 class="ux-modal__title" id="ux-modal-title-${this._uniqueId}">${title}</h2>` : ''}
            ${closable ? `
            <button class="ux-modal__close" aria-label="Close">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            ` : ''}
          </div>
          ` : ''}
          <div class="ux-modal__content"></div>
        </div>
      </div>
    `;

    // Append original content
    this.querySelector('.ux-modal__content').appendChild(content);

    // Cache elements
    this._backdrop = this.querySelector('.ux-modal-backdrop');
    this._modal = this.querySelector('.ux-modal');
    this._closeBtn = this.querySelector('.ux-modal__close');
  }

  get _uniqueId() {
    if (!this.__uniqueId) {
      this.__uniqueId = Math.random().toString(36).substr(2, 9);
    }
    return this.__uniqueId;
  }

  _setupEventListeners() {
    if (this._closeBtn) {
      this._closeBtn.addEventListener('click', () => this.close());
    }
    this._backdrop?.addEventListener('click', this._onBackdropClick);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._onKeydown);
    this._backdrop?.removeEventListener('click', this._onBackdropClick);
  }

  _onKeydown(e) {
    if (e.key === 'Escape' && this._isOpen) {
      this.close();
    }
  }

  _onBackdropClick(e) {
    if (e.target === this._backdrop) {
      this.close();
    }
  }

  _updateTitle() {
    const titleEl = this.querySelector('.ux-modal__title');
    if (titleEl) {
      titleEl.textContent = this.getAttribute('title') || '';
    }
  }

  // Public API
  open() {
    if (this._isOpen) return;
    this._isOpen = true;

    this._backdrop?.setAttribute('data-state', 'open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._onKeydown);

    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));

    // Focus first focusable element
    requestAnimationFrame(() => {
      const focusable = this._modal?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusable?.focus();
    });
  }

  close() {
    if (!this._isOpen) return;
    this._isOpen = false;

    this._backdrop?.setAttribute('data-state', 'closed');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._onKeydown);

    this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
  }

  toggle() {
    this._isOpen ? this.close() : this.open();
  }

  get isOpen() {
    return this._isOpen;
  }
}

// Register the custom element
if (!customElements.get('ux-modal')) {
  customElements.define('ux-modal', UxModal);
}

export { UxModal };
