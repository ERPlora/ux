/**
 * UX Color Picker Component
 * Color selection with visual picker and presets
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Color Picker - Base
    ======================================== */

    .ux-color-picker {
      position: relative;
      display: inline-block;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Color Trigger Button
    ======================================== */

    .ux-color-picker__trigger {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-color-picker__trigger:hover {
      border-color: var(--ux-primary);
    }

    .ux-color-picker__trigger:focus {
      outline: none;
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-color-picker__swatch {
      width: 24px;
      height: 24px;
      border-radius: var(--ux-radius-sm);
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
    }

    .ux-color-picker__swatch-color {
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }

    .ux-color-picker__value {
      font-size: var(--ux-font-size-sm);
      font-family: monospace;
      color: var(--ux-text);
      min-width: 70px;
    }

    .ux-color-picker__arrow {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-color-picker--open .ux-color-picker__arrow {
      transform: rotate(180deg);
    }

    /* ========================================
       Color Picker Dropdown
    ======================================== */

    .ux-color-picker__dropdown {
      position: absolute;
      top: calc(100% + var(--ux-space-xs));
      left: 0;
      z-index: var(--ux-z-dropdown);
      min-width: 260px;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      padding: var(--ux-space-md);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-color-picker--open .ux-color-picker__dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-color-picker__dropdown--right {
      left: auto;
      right: 0;
    }

    .ux-color-picker__dropdown--top {
      top: auto;
      bottom: calc(100% + var(--ux-space-xs));
      transform: translateY(8px);
    }

    .ux-color-picker--open .ux-color-picker__dropdown--top {
      transform: translateY(0);
    }

    /* ========================================
       Color Spectrum
    ======================================== */

    .ux-color-picker__spectrum {
      position: relative;
      width: 100%;
      height: 150px;
      border-radius: var(--ux-radius-md);
      cursor: crosshair;
      margin-bottom: var(--ux-space-md);
    }

    .ux-color-picker__spectrum-saturation {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #fff, transparent);
      border-radius: inherit;
    }

    .ux-color-picker__spectrum-lightness {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #000, transparent);
      border-radius: inherit;
    }

    .ux-color-picker__spectrum-handle {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), var(--ux-shadow-sm);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ========================================
       Hue Slider
    ======================================== */

    .ux-color-picker__hue {
      position: relative;
      width: 100%;
      height: 14px;
      border-radius: 7px;
      background: linear-gradient(to right,
        #ff0000 0%,
        #ffff00 17%,
        #00ff00 33%,
        #00ffff 50%,
        #0000ff 67%,
        #ff00ff 83%,
        #ff0000 100%
      );
      cursor: pointer;
      margin-bottom: var(--ux-space-md);
    }

    .ux-color-picker__hue-handle {
      position: absolute;
      top: 50%;
      width: 18px;
      height: 18px;
      background: white;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), var(--ux-shadow-sm);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ========================================
       Alpha Slider
    ======================================== */

    .ux-color-picker__alpha {
      position: relative;
      width: 100%;
      height: 14px;
      border-radius: 7px;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 8px 8px;
      background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
      cursor: pointer;
      margin-bottom: var(--ux-space-md);
    }

    .ux-color-picker__alpha-gradient {
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    .ux-color-picker__alpha-handle {
      position: absolute;
      top: 50%;
      width: 18px;
      height: 18px;
      background: white;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), var(--ux-shadow-sm);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    /* ========================================
       Input Fields
    ======================================== */

    .ux-color-picker__inputs {
      display: flex;
      gap: var(--ux-space-sm);
      margin-bottom: var(--ux-space-md);
    }

    .ux-color-picker__input-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-color-picker__input-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
    }

    .ux-color-picker__input {
      width: 100%;
      padding: var(--ux-space-xs);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-sm);
      font-family: monospace;
      text-align: center;
      color: var(--ux-text);
    }

    .ux-color-picker__input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-color-picker__input--hex {
      flex: 2;
    }

    /* ========================================
       Preset Colors
    ======================================== */

    .ux-color-picker__presets {
      margin-top: var(--ux-space-sm);
    }

    .ux-color-picker__presets-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-color-picker__presets-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-color-picker__preset {
      width: 24px;
      height: 24px;
      border-radius: var(--ux-radius-sm);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-color-picker__preset:hover {
      transform: scale(1.15);
    }

    .ux-color-picker__preset--active {
      border-color: var(--ux-text);
      box-shadow: 0 0 0 2px var(--ux-surface), 0 0 0 3px var(--ux-text);
    }

    /* ========================================
       Format Toggle
    ======================================== */

    .ux-color-picker__format-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xs);
      background: none;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-color-picker__format-toggle:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-color-picker__format-toggle svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-color-picker__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Simple Mode
    ======================================== */

    .ux-color-picker--simple .ux-color-picker__dropdown {
      min-width: 200px;
    }

    .ux-color-picker--simple .ux-color-picker__presets-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: var(--ux-space-xs);
    }

    /* ========================================
       Inline Mode
    ======================================== */

    .ux-color-picker--inline .ux-color-picker__dropdown {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      border: none;
      padding: 0;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-color-picker--sm .ux-color-picker__trigger {
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }

    .ux-color-picker--sm .ux-color-picker__swatch {
      width: 20px;
      height: 20px;
    }

    .ux-color-picker--sm .ux-color-picker__value {
      font-size: var(--ux-font-size-xs);
    }

    .ux-color-picker--lg .ux-color-picker__trigger {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    .ux-color-picker--lg .ux-color-picker__swatch {
      width: 32px;
      height: 32px;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-color-picker--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-color-picker--glass .ux-color-picker__dropdown {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-color-picker__swatch {
        border-color: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-color-picker__swatch {
      border-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-color-picker__dropdown,
      .ux-color-picker__arrow,
      .ux-color-picker__preset {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-color-picker-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-color-picker-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Default preset colors
  const defaultPresets = [
    '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
    '#795548', '#9e9e9e', '#607d8b'
  ];

  // Alpine.js component
  const colorPickerData = (options = {}) => ({
    // State
    isOpen: false,
    color: options.value || options.color || '#3b82f6',
    format: options.format || 'hex', // hex, rgb, hsl
    showAlpha: options.showAlpha ?? false,

    // HSL values for internal manipulation
    hue: 220,
    saturation: 100,
    lightness: 50,
    alpha: 1,

    // Presets
    presets: options.presets || defaultPresets,
    showPresets: options.showPresets ?? true,

    // Options
    disabled: options.disabled || false,
    closeOnSelect: options.closeOnSelect ?? false,
    inline: options.inline || false,

    init() {
      this.parseColor(this.color);

      // Close on outside click
      this._outsideClickHandler = (e) => {
        if (this.isOpen && !this.$el.contains(e.target)) {
          this.close();
        }
      };
      document.addEventListener('click', this._outsideClickHandler);

      // Close on escape
      this._escapeHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    },

    destroy() {
      document.removeEventListener('click', this._outsideClickHandler);
      document.removeEventListener('keydown', this._escapeHandler);
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
      }
    },

    close() {
      this.isOpen = false;
    },

    // Parse color string to HSL
    parseColor(color) {
      if (!color) return;

      // Handle hex
      if (color.startsWith('#')) {
        const rgb = this.hexToRgb(color);
        if (rgb) {
          const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
          this.hue = hsl.h;
          this.saturation = hsl.s;
          this.lightness = hsl.l;
        }
      }
      // Handle rgb/rgba
      else if (color.startsWith('rgb')) {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const hsl = this.rgbToHsl(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
          this.hue = hsl.h;
          this.saturation = hsl.s;
          this.lightness = hsl.l;
          if (match[4]) this.alpha = parseFloat(match[4]);
        }
      }
      // Handle hsl/hsla
      else if (color.startsWith('hsl')) {
        const match = color.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/);
        if (match) {
          this.hue = parseInt(match[1]);
          this.saturation = parseFloat(match[2]);
          this.lightness = parseFloat(match[3]);
          if (match[4]) this.alpha = parseFloat(match[4]);
        }
      }
    },

    // Convert hex to RGB
    hexToRgb(hex) {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },

    // Convert RGB to HSL
    rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }

      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    },

    // Convert HSL to RGB
    hslToRgb(h, s, l) {
      h /= 360; s /= 100; l /= 100;
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    },

    // Convert RGB to Hex
    rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    },

    // Get current color in specified format
    getColor(format = this.format) {
      const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);

      switch (format) {
        case 'hex':
          return this.rgbToHex(rgb.r, rgb.g, rgb.b);
        case 'rgb':
          if (this.showAlpha && this.alpha < 1) {
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;
          }
          return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        case 'hsl':
          if (this.showAlpha && this.alpha < 1) {
            return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
          }
          return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        default:
          return this.rgbToHex(rgb.r, rgb.g, rgb.b);
      }
    },

    // Get RGB values
    get rgb() {
      return this.hslToRgb(this.hue, this.saturation, this.lightness);
    },

    // Get display value
    get displayValue() {
      return this.getColor();
    },

    // Get spectrum background color
    get spectrumBg() {
      return `hsl(${this.hue}, 100%, 50%)`;
    },

    // Set color from spectrum position
    setFromSpectrum(x, y, rect) {
      this.saturation = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      this.lightness = Math.round(Math.max(0, Math.min(100, 100 - (y / rect.height) * 100)));
      this.updateColor();
    },

    // Set hue from slider
    setHue(x, rect) {
      this.hue = Math.round(Math.max(0, Math.min(360, (x / rect.width) * 360)));
      this.updateColor();
    },

    // Set alpha from slider
    setAlpha(x, rect) {
      this.alpha = Math.round(Math.max(0, Math.min(1, x / rect.width)) * 100) / 100;
      this.updateColor();
    },

    // Update color and dispatch event
    updateColor() {
      this.color = this.getColor();
      this.$dispatch('colorpicker:change', { color: this.color, rgb: this.rgb, hsl: { h: this.hue, s: this.saturation, l: this.lightness }, alpha: this.alpha });

      if (this.closeOnSelect) {
        this.close();
      }
    },

    // Select preset color
    selectPreset(color) {
      this.parseColor(color);
      this.updateColor();
    },

    // Cycle through formats
    cycleFormat() {
      const formats = ['hex', 'rgb', 'hsl'];
      const currentIndex = formats.indexOf(this.format);
      this.format = formats[(currentIndex + 1) % formats.length];
    },

    // Spectrum drag handling
    onSpectrumMouseDown(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      this.setFromSpectrum(e.clientX - rect.left, e.clientY - rect.top, rect);

      const onMove = (e) => {
        this.setFromSpectrum(e.clientX - rect.left, e.clientY - rect.top, rect);
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    // Hue slider drag handling
    onHueMouseDown(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      this.setHue(e.clientX - rect.left, rect);

      const onMove = (e) => {
        this.setHue(e.clientX - rect.left, rect);
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    // Alpha slider drag handling
    onAlphaMouseDown(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      this.setAlpha(e.clientX - rect.left, rect);

      const onMove = (e) => {
        this.setAlpha(e.clientX - rect.left, rect);
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxColorPicker', colorPickerData);
  }

})();
