/**
 * UX Signature Pad Component
 * Vanilla JS signature capture with touch support
 */

import { dispatch } from '../core/helpers.js';

export class UXSignaturePad {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXSignaturePad: Element not found');
      return;
    }

    this.options = {
      width: null,
      height: 200,
      lineWidth: 2,
      lineColor: '#000000',
      backgroundColor: 'transparent',
      showGuide: true,
      showPlaceholder: true,
      placeholderText: 'Firme aquí',
      exportFormat: 'png',
      exportQuality: 0.92,
      disabled: false,
      readonly: false,
      maxHistory: 20,
      ...options
    };

    // Parse options from data attributes
    if (this.el.dataset.lineWidth) this.options.lineWidth = parseFloat(this.el.dataset.lineWidth);
    if (this.el.dataset.lineColor) this.options.lineColor = this.el.dataset.lineColor;
    if (this.el.dataset.height) this.options.height = parseInt(this.el.dataset.height, 10);
    if (this.el.dataset.showGuide !== undefined) this.options.showGuide = this.el.dataset.showGuide !== 'false';
    if (this.el.dataset.disabled !== undefined) this.options.disabled = this.el.dataset.disabled === 'true';

    this._isDrawing = false;
    this._hasSignature = false;
    this._history = [];
    this._lastPoint = null;

    // Icons
    this._icons = {
      pen: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
      undo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>',
      clear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',
      download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'
    };

    this._init();
  }

  _init() {
    // Find or create canvas
    this.canvas = this.el.querySelector('canvas, .ux-signature-pad__canvas');
    this.container = this.el.querySelector('.ux-signature-pad__container');

    if (!this.canvas || !this.container) {
      this._createStructure();
    }

    this.ctx = this.canvas.getContext('2d');

    // Setup canvas size
    this._setupCanvas();

    // Inject icons into buttons
    this._injectIcons();

    // Bind events
    if (!this.options.disabled && !this.options.readonly) {
      this._bindEvents();
    }

    // Save initial state
    this._saveHistory();

    // Update placeholder visibility
    this._updatePlaceholder();
  }

  _createStructure() {
    this.el.innerHTML = '';
    this.el.classList.add('ux-signature-pad');

    // Container
    this.container = document.createElement('div');
    this.container.className = 'ux-signature-pad__container';

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'ux-signature-pad__canvas';
    this.container.appendChild(this.canvas);

    // Guide line
    if (this.options.showGuide) {
      const guide = document.createElement('div');
      guide.className = 'ux-signature-pad__guide';
      this.container.appendChild(guide);
    }

    // Placeholder
    if (this.options.showPlaceholder) {
      const placeholder = document.createElement('div');
      placeholder.className = 'ux-signature-pad__placeholder';
      placeholder.innerHTML = `<span>${this._icons.pen}</span><span>${this.options.placeholderText}</span>`;
      this.container.appendChild(placeholder);
      this.placeholder = placeholder;
    }

    this.el.appendChild(this.container);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'ux-signature-pad__actions';
    actions.innerHTML = `
      <button type="button" class="ux-signature-pad__btn" data-action="undo" disabled>
        <span>${this._icons.undo}</span>
        Deshacer
      </button>
      <button type="button" class="ux-signature-pad__btn" data-action="clear" disabled>
        <span>${this._icons.clear}</span>
        Limpiar
      </button>
    `;
    this.el.appendChild(actions);
  }

  _injectIcons() {
    // Find buttons and inject icons if empty
    const undoBtn = this.el.querySelector('[data-action="undo"], .ux-signature-pad__btn:first-child');
    const clearBtn = this.el.querySelector('[data-action="clear"]');
    const downloadBtn = this.el.querySelector('[data-action="download"]');

    // Bind action buttons
    this.el.querySelectorAll('.ux-signature-pad__btn').forEach(btn => {
      const action = btn.dataset.action || btn.textContent.toLowerCase().trim();

      if (action.includes('deshacer') || action.includes('undo') || btn.dataset.action === 'undo') {
        btn.addEventListener('click', () => this.undo());
        this.undoBtn = btn;
      } else if (action.includes('limpiar') || action.includes('clear') || btn.dataset.action === 'clear') {
        btn.addEventListener('click', () => this.clear());
        this.clearBtn = btn;
      } else if (action.includes('descargar') || action.includes('download') || btn.dataset.action === 'download') {
        btn.addEventListener('click', () => this.download());
        this.downloadBtn = btn;
      }
    });
  }

  _setupCanvas() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = this.options.width || rect.width || 400;
    const height = this.options.height || 200;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    this.ctx.scale(dpr, dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.options.lineColor;
    this.ctx.lineWidth = this.options.lineWidth;

    if (this.options.backgroundColor !== 'transparent') {
      this.ctx.fillStyle = this.options.backgroundColor;
      this.ctx.fillRect(0, 0, width, height);
    }
  }

  _bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this._startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this._draw(e));
    this.canvas.addEventListener('mouseup', () => this._stopDrawing());
    this.canvas.addEventListener('mouseleave', () => this._stopDrawing());

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this._startDrawing(e), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => this._draw(e), { passive: false });
    this.canvas.addEventListener('touchend', () => this._stopDrawing());
    this.canvas.addEventListener('touchcancel', () => this._stopDrawing());

    // Resize
    window.addEventListener('resize', () => this._handleResize());
  }

  _getPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  _startDrawing(e) {
    if (this.options.disabled || this.options.readonly) return;

    e.preventDefault();
    this._isDrawing = true;
    this._lastPoint = this._getPoint(e);

    this.ctx.beginPath();
    this.ctx.moveTo(this._lastPoint.x, this._lastPoint.y);
  }

  _draw(e) {
    if (!this._isDrawing) return;

    e.preventDefault();
    const point = this._getPoint(e);

    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);

    this._lastPoint = point;
    this._hasSignature = true;
  }

  _stopDrawing() {
    if (this._isDrawing) {
      this._isDrawing = false;
      this.ctx.closePath();
      this._saveHistory();
      this._updateState();
    }
  }

  _saveHistory() {
    if (this._history.length >= this.options.maxHistory) {
      this._history.shift();
    }
    this._history.push(this.canvas.toDataURL());
  }

  _handleResize() {
    const imageData = this.canvas.toDataURL();
    this._setupCanvas();
    if (this._hasSignature) {
      this.loadSignature(imageData);
    }
  }

  _updateState() {
    this._updatePlaceholder();
    this._updateButtons();
    this.el.classList.toggle('ux-signature-pad--has-signature', this._hasSignature);
    dispatch(this.el, 'ux:signature-pad:change', { hasSignature: this._hasSignature });
    dispatch(this.el, 'signature:change', { hasSignature: this._hasSignature });
  }

  _updatePlaceholder() {
    const placeholder = this.el.querySelector('.ux-signature-pad__placeholder');
    if (placeholder) {
      placeholder.style.display = this._hasSignature ? 'none' : '';
    }
  }

  _updateButtons() {
    if (this.undoBtn) {
      this.undoBtn.disabled = this._history.length <= 1;
    }
    if (this.clearBtn) {
      this.clearBtn.disabled = !this._hasSignature;
    }
    if (this.downloadBtn) {
      this.downloadBtn.disabled = !this._hasSignature;
    }
  }

  // Public API

  get hasSignature() {
    return this._hasSignature;
  }

  get isDrawing() {
    return this._isDrawing;
  }

  clear() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.width / dpr;
    const height = this.canvas.height / dpr;

    this.ctx.clearRect(0, 0, width, height);

    if (this.options.backgroundColor !== 'transparent') {
      this.ctx.fillStyle = this.options.backgroundColor;
      this.ctx.fillRect(0, 0, width, height);
    }

    this._hasSignature = false;
    this._history = [];
    this._saveHistory();
    this._updateState();

    dispatch(this.el, 'ux:signature-pad:clear');
    dispatch(this.el, 'signature:clear');
  }

  undo() {
    if (this._history.length <= 1) return;

    this._history.pop();
    const lastState = this._history[this._history.length - 1];

    const img = new Image();
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = this.canvas.width / dpr;
      const height = this.canvas.height / dpr;

      this.ctx.clearRect(0, 0, width, height);
      this.ctx.drawImage(img, 0, 0, width, height);

      // Check if canvas is empty
      this._checkEmpty();
      this._updateState();
    };
    img.src = lastState;
  }

  _checkEmpty() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.width / dpr;
    const height = this.canvas.height / dpr;
    const imageData = this.ctx.getImageData(0, 0, width * dpr, height * dpr);
    const data = imageData.data;

    // Check if all pixels are transparent or background color
    let isEmpty = true;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) { // Alpha channel
        isEmpty = false;
        break;
      }
    }

    this._hasSignature = !isEmpty;
  }

  getSignature(format) {
    format = format || this.options.exportFormat;
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    return this.canvas.toDataURL(mimeType, this.options.exportQuality);
  }

  getSignatureBlob(format) {
    return new Promise((resolve) => {
      format = format || this.options.exportFormat;
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      this.canvas.toBlob((blob) => resolve(blob), mimeType, this.options.exportQuality);
    });
  }

  download(filename) {
    filename = filename || `signature.${this.options.exportFormat}`;
    const dataUrl = this.getSignature();

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();

    dispatch(this.el, 'ux:signature-pad:download', { filename });
    dispatch(this.el, 'signature:download', { filename });
  }

  loadSignature(dataUrl) {
    const img = new Image();
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = this.canvas.width / dpr;
      const height = this.canvas.height / dpr;

      this.ctx.clearRect(0, 0, width, height);
      this.ctx.drawImage(img, 0, 0, width, height);

      this._hasSignature = true;
      this._saveHistory();
      this._updateState();
    };
    img.src = dataUrl;
  }

  isEmpty() {
    return !this._hasSignature;
  }

  setLineColor(color) {
    this.options.lineColor = color;
    this.ctx.strokeStyle = color;
  }

  setLineWidth(width) {
    this.options.lineWidth = width;
    this.ctx.lineWidth = width;
  }

  setDisabled(disabled) {
    this.options.disabled = disabled;
    this.el.classList.toggle('ux-signature-pad--disabled', disabled);
  }

  destroy() {
    window.removeEventListener('resize', this._handleResize);
    delete this.el._uxComponent;
  }
}
