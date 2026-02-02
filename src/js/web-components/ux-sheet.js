/**
 * UX Sheet Web Component
 * Custom Element for bottom/side sheets
 *
 * Usage:
 * <ux-sheet id="my-sheet" side="bottom">
 *   <p>Sheet content</p>
 * </ux-sheet>
 *
 * <button onclick="document.getElementById('my-sheet').open()">Open</button>
 */

class UxSheet extends HTMLElement {
  static get observedAttributes() {
    return ['side', 'open', 'closable'];
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

    if (this.hasAttribute('open')) {
      this.open();
    }
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'open') {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  _render() {
    const side = this.getAttribute('side') || 'bottom';
    const closable = this.getAttribute('closable') !== 'false';

    const sideClass = `ux-sheet--${side}`;

    // Move existing content
    const content = document.createDocumentFragment();
    while (this.firstChild) {
      content.appendChild(this.firstChild);
    }

    this.innerHTML = `
      <div class="ux-sheet-backdrop" data-state="closed">
        <div class="ux-sheet ${sideClass}" role="dialog" aria-modal="true">
          ${closable ? '<div class="ux-sheet__handle"></div>' : ''}
          <div class="ux-sheet__content"></div>
        </div>
      </div>
    `;

    this.querySelector('.ux-sheet__content').appendChild(content);

    this._backdrop = this.querySelector('.ux-sheet-backdrop');
    this._sheet = this.querySelector('.ux-sheet');
    this._handle = this.querySelector('.ux-sheet__handle');
  }

  _setupEventListeners() {
    this._backdrop?.addEventListener('click', this._onBackdropClick);

    // Handle drag to close on handle
    if (this._handle) {
      this._handle.addEventListener('click', () => this.close());
    }
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

  // Public API
  open() {
    if (this._isOpen) return;
    this._isOpen = true;

    this._backdrop?.setAttribute('data-state', 'open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._onKeydown);

    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
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
if (!customElements.get('ux-sheet')) {
  customElements.define('ux-sheet', UxSheet);
}

export { UxSheet };
