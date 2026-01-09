/**
 * UX Signature Pad Component
 * Canvas-based signature capture with touch support
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Signature Pad - Base
    ======================================== */

    .ux-signature-pad {
      display: flex;
      flex-direction: column;
      font-family: var(--ux-font-family);
    }

    .ux-signature-pad__container {
      position: relative;
      border: 2px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      background: var(--ux-surface);
      overflow: hidden;
    }

    .ux-signature-pad__canvas {
      display: block;
      width: 100%;
      height: 200px;
      touch-action: none;
      cursor: crosshair;
    }

    /* ========================================
       Guide Line
    ======================================== */

    .ux-signature-pad__guide {
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: 30%;
      height: 1px;
      background: var(--ux-border-color);
      pointer-events: none;
    }

    .ux-signature-pad__guide::before {
      content: 'x';
      position: absolute;
      left: -10px;
      bottom: -2px;
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Placeholder
    ======================================== */

    .ux-signature-pad__placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--ux-text-tertiary);
      font-size: 0.875rem;
      pointer-events: none;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-signature-pad__placeholder svg {
      width: 32px;
      height: 32px;
      opacity: 0.5;
    }

    .ux-signature-pad--has-signature .ux-signature-pad__placeholder {
      opacity: 0;
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-signature-pad__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: var(--ux-space-sm);
    }

    .ux-signature-pad__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-signature-pad__btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-signature-pad__btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-signature-pad__btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-signature-pad__btn--primary {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    .ux-signature-pad__btn--primary:hover {
      background: var(--ux-primary-shade);
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-signature-pad--sm .ux-signature-pad__canvas {
      height: 150px;
    }

    .ux-signature-pad--lg .ux-signature-pad__canvas {
      height: 300px;
    }

    /* ========================================
       States
    ======================================== */

    /* Disabled */
    .ux-signature-pad--disabled .ux-signature-pad__container {
      background: var(--ux-surface-secondary);
      opacity: 0.6;
    }

    .ux-signature-pad--disabled .ux-signature-pad__canvas {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Error */
    .ux-signature-pad--error .ux-signature-pad__container {
      border-color: var(--ux-danger);
    }

    /* Readonly (show signature but no interaction) */
    .ux-signature-pad--readonly .ux-signature-pad__canvas {
      cursor: default;
      pointer-events: none;
    }

    .ux-signature-pad--readonly .ux-signature-pad__guide,
    .ux-signature-pad--readonly .ux-signature-pad__placeholder {
      display: none;
    }

    /* ========================================
       Label & Helper
    ======================================== */

    .ux-signature-pad__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-signature-pad__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-signature-pad__helper--error {
      color: var(--ux-danger);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-signature-pad--glass .ux-signature-pad__container {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-signature-pad__container {
        background: var(--ux-surface);
      }
    }

    .ux-dark .ux-signature-pad__container {
      background: var(--ux-surface);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-signature-pad__placeholder,
      .ux-signature-pad__btn {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-signature-pad-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-signature-pad-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    clear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>'
  };

  // Alpine.js component for signature pad
  const signaturePadData = (options = {}) => ({
    // Configuration
    width: options.width || null, // Auto if null
    height: options.height || 200,
    lineWidth: options.lineWidth || 2,
    lineColor: options.lineColor || '#000000',
    backgroundColor: options.backgroundColor || 'transparent',
    showGuide: options.showGuide ?? true,
    showPlaceholder: options.showPlaceholder ?? true,
    placeholderText: options.placeholderText || 'Firme aquí',
    exportFormat: options.exportFormat || 'png', // 'png', 'jpeg', 'svg'
    exportQuality: options.exportQuality || 0.92,

    // State
    hasSignature: false,
    isDrawing: false,
    disabled: options.disabled || false,
    readonly: options.readonly || false,
    history: [],
    maxHistory: options.maxHistory || 20,

    // Canvas context
    ctx: null,
    lastX: 0,
    lastY: 0,
    icons,

    init() {
      this.$nextTick(() => {
        this.setupCanvas();
        this.setupEventListeners();

        // Load initial signature if provided
        if (options.initialSignature) {
          this.loadSignature(options.initialSignature);
        }
      });
    },

    setupCanvas() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      // Set canvas size
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();

      // Use device pixel ratio for sharp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (this.width || rect.width) * dpr;
      canvas.height = this.height * dpr;

      // Scale context for retina displays
      this.ctx = canvas.getContext('2d');
      this.ctx.scale(dpr, dpr);

      // Set drawing style
      this.ctx.strokeStyle = this.lineColor;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      // Set background if not transparent
      if (this.backgroundColor !== 'transparent') {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    },

    setupEventListeners() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      // Mouse events
      canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
      canvas.addEventListener('mousemove', (e) => this.draw(e));
      canvas.addEventListener('mouseup', () => this.stopDrawing());
      canvas.addEventListener('mouseleave', () => this.stopDrawing());

      // Touch events
      canvas.addEventListener('touchstart', (e) => this.startDrawing(e), { passive: false });
      canvas.addEventListener('touchmove', (e) => this.draw(e), { passive: false });
      canvas.addEventListener('touchend', () => this.stopDrawing());
      canvas.addEventListener('touchcancel', () => this.stopDrawing());

      // Resize observer
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => {
          this.handleResize();
        });
        this._resizeObserver.observe(canvas.parentElement);
      }
    },

    destroy() {
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    },

    // Get coordinates from event
    getCoordinates(e) {
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();

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
    },

    // Start drawing
    startDrawing(e) {
      if (this.disabled || this.readonly) return;

      e.preventDefault();
      this.isDrawing = true;

      const coords = this.getCoordinates(e);
      this.lastX = coords.x;
      this.lastY = coords.y;

      // Save state for undo
      this.saveState();

      // Start new path
      this.ctx.beginPath();
      this.ctx.moveTo(coords.x, coords.y);
    },

    // Draw
    draw(e) {
      if (!this.isDrawing || this.disabled || this.readonly) return;

      e.preventDefault();

      const coords = this.getCoordinates(e);

      this.ctx.lineTo(coords.x, coords.y);
      this.ctx.stroke();

      this.lastX = coords.x;
      this.lastY = coords.y;

      this.hasSignature = true;
    },

    // Stop drawing
    stopDrawing() {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.ctx.closePath();

        if (this.hasSignature) {
          this.$dispatch('signature:change', { hasSignature: true });
        }
      }
    },

    // Save state for undo
    saveState() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      const imageData = canvas.toDataURL();

      this.history.push(imageData);

      // Limit history size
      if (this.history.length > this.maxHistory) {
        this.history.shift();
      }
    },

    // Undo last stroke
    undo() {
      if (this.history.length === 0) return;

      this.history.pop(); // Remove current state

      if (this.history.length > 0) {
        const lastState = this.history[this.history.length - 1];
        this.loadSignature(lastState);
      } else {
        this.clear();
      }
    },

    // Clear canvas
    clear() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      // Clear canvas
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Restore background
      if (this.backgroundColor !== 'transparent') {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      this.hasSignature = false;
      this.history = [];

      this.$dispatch('signature:clear');
      this.$dispatch('signature:change', { hasSignature: false });
    },

    // Load signature from data URL
    loadSignature(dataUrl) {
      const canvas = this.$refs.canvas;
      if (!canvas || !dataUrl) return;

      const img = new Image();
      img.onload = () => {
        // Clear first
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Restore background
        if (this.backgroundColor !== 'transparent') {
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw image
        this.ctx.drawImage(img, 0, 0);
        this.hasSignature = true;
      };
      img.src = dataUrl;
    },

    // Get signature as data URL
    getSignature(format, quality) {
      const canvas = this.$refs.canvas;
      if (!canvas || !this.hasSignature) return null;

      format = format || this.exportFormat;
      quality = quality || this.exportQuality;

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      return canvas.toDataURL(mimeType, quality);
    },

    // Get signature as blob
    async getSignatureBlob(format, quality) {
      const canvas = this.$refs.canvas;
      if (!canvas || !this.hasSignature) return null;

      format = format || this.exportFormat;
      quality = quality || this.exportQuality;

      const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';

      return new Promise((resolve) => {
        canvas.toBlob(resolve, mimeType, quality);
      });
    },

    // Download signature
    async download(filename) {
      const dataUrl = this.getSignature();
      if (!dataUrl) return;

      filename = filename || `signature-${Date.now()}.${this.exportFormat}`;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();

      this.$dispatch('signature:download', { filename });
    },

    // Handle resize
    handleResize() {
      // Save current signature
      const currentSignature = this.hasSignature ? this.getSignature() : null;

      // Resize canvas
      this.setupCanvas();

      // Restore signature
      if (currentSignature) {
        this.loadSignature(currentSignature);
      }
    },

    // Check if empty
    isEmpty() {
      return !this.hasSignature;
    },

    // Set line color
    setLineColor(color) {
      this.lineColor = color;
      if (this.ctx) {
        this.ctx.strokeStyle = color;
      }
    },

    // Set line width
    setLineWidth(width) {
      this.lineWidth = width;
      if (this.ctx) {
        this.ctx.lineWidth = width;
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxSignaturePad', signaturePadData);
  }

})();
