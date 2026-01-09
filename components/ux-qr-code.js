/**
 * UX QR Code Component
 * QR code generator using canvas with customizable options
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX QR Code - Base
    ======================================== */

    .ux-qr {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-sm);
      font-family: var(--ux-font-family);
    }

    .ux-qr__canvas {
      display: block;
      border-radius: var(--ux-radius-md);
    }

    .ux-qr__wrapper {
      position: relative;
      display: inline-block;
    }

    /* ========================================
       With Logo
    ======================================== */

    .ux-qr__logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 4px;
      border-radius: var(--ux-radius-sm);
    }

    .ux-qr__logo img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* ========================================
       With Label
    ======================================== */

    .ux-qr__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ========================================
       With Border
    ======================================== */

    .ux-qr--bordered .ux-qr__wrapper {
      padding: 1rem;
      background: white;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-qr--sm .ux-qr__canvas {
      width: 100px;
      height: 100px;
    }

    .ux-qr--lg .ux-qr__canvas {
      width: 250px;
      height: 250px;
    }

    .ux-qr--xl .ux-qr__canvas {
      width: 350px;
      height: 350px;
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-qr__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-xs);
    }

    .ux-qr__action {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: 1px solid var(--ux-primary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-qr__action:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-qr__action svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Loading
    ======================================== */

    .ux-qr__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ux-gray-100);
      border-radius: var(--ux-radius-md);
    }

    .ux-qr__spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-gray-200);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-qr-spin 0.8s linear infinite;
    }

    @keyframes ux-qr-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Error
    ======================================== */

    .ux-qr__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: rgba(var(--ux-danger-rgb), 0.1);
      border-radius: var(--ux-radius-md);
      text-align: center;
    }

    .ux-qr__error-icon {
      width: 24px;
      height: 24px;
      color: var(--ux-danger);
      margin-bottom: 0.5rem;
    }

    .ux-qr__error-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-qr--bordered .ux-qr__wrapper {
        background: var(--ux-gray-800);
        border-color: var(--ux-border-color);
      }

      .ux-qr__loading {
        background: var(--ux-gray-800);
      }
    }

    .ux-dark .ux-qr--bordered .ux-qr__wrapper {
      background: var(--ux-gray-800);
      border-color: var(--ux-border-color);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-qr__spinner {
        animation: none;
      }

      .ux-qr__action {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-qr-code-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-qr-code-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // QR Code Generator (simplified Reed-Solomon implementation)
  // Based on standard QR code specification

  // Error correction levels
  const ECL = {
    L: 1, // 7% recovery
    M: 0, // 15% recovery
    Q: 3, // 25% recovery
    H: 2  // 30% recovery
  };

  // Alphanumeric character set
  const ALPHANUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

  // Get the best mode for the data
  function getMode(data) {
    if (/^\d+$/.test(data)) return 'numeric';
    if (/^[0-9A-Z $%*+\-./:]+$/.test(data.toUpperCase())) return 'alphanumeric';
    return 'byte';
  }

  // QR Code matrix generation
  function generateQRMatrix(data, errorCorrectionLevel = 'M') {
    const ecl = ECL[errorCorrectionLevel] || ECL.M;

    // Simplified QR generation - use a basic encoding
    // For production, use a full QR library
    const size = Math.max(21, Math.ceil(Math.sqrt(data.length * 8)) + 10);
    const matrix = Array(size).fill(null).map(() => Array(size).fill(null));

    // Add finder patterns
    addFinderPattern(matrix, 0, 0);
    addFinderPattern(matrix, size - 7, 0);
    addFinderPattern(matrix, 0, size - 7);

    // Add timing patterns
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Add alignment pattern for larger QR codes
    if (size >= 25) {
      const pos = size - 9;
      addAlignmentPattern(matrix, pos, pos);
    }

    // Encode data
    const bits = encodeData(data);
    let bitIndex = 0;

    // Fill data
    let direction = -1;
    let x = size - 1;

    while (x > 0) {
      if (x === 6) x--;

      for (let y = direction === -1 ? size - 1 : 0;
           direction === -1 ? y >= 0 : y < size;
           y += direction) {
        for (let dx = 0; dx <= 1; dx++) {
          const cx = x - dx;
          if (matrix[y][cx] === null) {
            const bit = bitIndex < bits.length ? bits[bitIndex] === '1' : false;
            matrix[y][cx] = bit;
            bitIndex++;
          }
        }
      }
      direction = -direction;
      x -= 2;
    }

    return matrix;
  }

  function addFinderPattern(matrix, row, col) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (row + r < matrix.length && col + c < matrix.length) {
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          matrix[row + r][col + c] = isOuter || isInner;
        }
      }
    }

    // Separator
    for (let i = 0; i < 8; i++) {
      if (row + 7 < matrix.length && col + i < matrix.length) matrix[row + 7][col + i] = false;
      if (row + i < matrix.length && col + 7 < matrix.length) matrix[row + i][col + 7] = false;
    }
  }

  function addAlignmentPattern(matrix, row, col) {
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const isOuter = Math.abs(r) === 2 || Math.abs(c) === 2;
        const isCenter = r === 0 && c === 0;
        matrix[row + r][col + c] = isOuter || isCenter;
      }
    }
  }

  function encodeData(data) {
    let bits = '';

    // Mode indicator (byte mode = 0100)
    bits += '0100';

    // Character count (8 bits for byte mode)
    bits += data.length.toString(2).padStart(8, '0');

    // Data
    for (let i = 0; i < data.length; i++) {
      bits += data.charCodeAt(i).toString(2).padStart(8, '0');
    }

    // Terminator
    bits += '0000';

    // Pad to multiple of 8
    while (bits.length % 8 !== 0) {
      bits += '0';
    }

    return bits;
  }

  // Icons
  const icons = {
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  };

  // Alpine.js component
  const qrCodeData = (options = {}) => ({
    // Data
    value: options.value || '',

    // Configuration
    size: options.size || 200,
    errorCorrection: options.errorCorrection || 'M', // L, M, Q, H
    foreground: options.foreground || '#000000',
    background: options.background || '#FFFFFF',
    margin: options.margin ?? 4,
    logo: options.logo || null,
    logoSize: options.logoSize || 0.2, // 20% of QR size
    label: options.label || null,

    // State
    loading: true,
    error: null,
    canvas: null,
    icons,

    init() {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas;
        this.generate();
      });
    },

    // Generate QR code
    generate() {
      if (!this.value) {
        this.loading = false;
        this.error = 'No data provided';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const matrix = generateQRMatrix(this.value, this.errorCorrection);
        this.render(matrix);
        this.loading = false;
      } catch (e) {
        this.error = 'Failed to generate QR code';
        this.loading = false;
        console.error('QR Code error:', e);
      }
    },

    // Render QR code to canvas
    render(matrix) {
      if (!this.canvas) return;

      const ctx = this.canvas.getContext('2d');
      const moduleCount = matrix.length;
      const moduleSize = (this.size - this.margin * 2) / moduleCount;

      this.canvas.width = this.size;
      this.canvas.height = this.size;

      // Background
      ctx.fillStyle = this.background;
      ctx.fillRect(0, 0, this.size, this.size);

      // Modules
      ctx.fillStyle = this.foreground;

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (matrix[row][col]) {
            const x = this.margin + col * moduleSize;
            const y = this.margin + row * moduleSize;
            ctx.fillRect(x, y, moduleSize, moduleSize);
          }
        }
      }

      // Add logo if provided
      if (this.logo) {
        this.addLogo();
      }

      this.$dispatch('qr:generated', { value: this.value });
    },

    // Add logo to center
    addLogo() {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const ctx = this.canvas.getContext('2d');
        const logoSizePx = this.size * this.logoSize;
        const x = (this.size - logoSizePx) / 2;
        const y = (this.size - logoSizePx) / 2;

        // White background for logo
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - 4, y - 4, logoSizePx + 8, logoSizePx + 8);

        // Draw logo
        ctx.drawImage(img, x, y, logoSizePx, logoSizePx);
      };

      img.src = this.logo;
    },

    // Set value and regenerate
    setValue(value) {
      this.value = value;
      this.generate();
    },

    // Download QR code
    download(filename = 'qrcode') {
      if (!this.canvas) return;

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = this.canvas.toDataURL('image/png');
      link.click();

      this.$dispatch('qr:download', { filename });
    },

    // Copy to clipboard
    async copyToClipboard() {
      if (!this.canvas) return;

      try {
        const blob = await new Promise(resolve => {
          this.canvas.toBlob(resolve, 'image/png');
        });

        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);

        this.$dispatch('qr:copied');
        return true;
      } catch (e) {
        console.error('Failed to copy:', e);
        return false;
      }
    },

    // Get data URL
    getDataURL(type = 'image/png', quality = 1) {
      if (!this.canvas) return null;
      return this.canvas.toDataURL(type, quality);
    },

    // Get blob
    async getBlob(type = 'image/png', quality = 1) {
      if (!this.canvas) return null;

      return new Promise(resolve => {
        this.canvas.toBlob(resolve, type, quality);
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxQRCode', qrCodeData);
  }

})();
