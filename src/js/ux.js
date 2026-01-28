/**
 * UX JavaScript Library
 * Optional enhancements for the UX CSS Library
 *
 * @version 2.0.0
 * @license MIT
 */

// Import CSS (Vite will handle this)
import '../scss/ux.scss';

// Core utilities
import * as helpers from './core/helpers.js';

// Components
import { UXModal } from './components/modal.js';
import { UXPassword } from './components/password.js';
import { UXRange } from './components/range.js';
import { UXOtpInput } from './components/otp-input.js';
import { UXAutocomplete } from './components/autocomplete.js';
import { UXTagInput } from './components/tag-input.js';
import { UXUpload } from './components/upload.js';

// ==========================================================
// Component Registry
// ==========================================================

const componentMap = {
  'ux-modal-backdrop': UXModal,
  'ux-input-password': UXPassword,
  'ux-range': UXRange,
  'ux-otp': UXOtpInput,
  'ux-autocomplete': UXAutocomplete,
  'ux-tag-input': UXTagInput,
  'ux-upload': UXUpload,
};

// ==========================================================
// UX Global Object
// ==========================================================

const UX = {
  // Version
  version: '2.0.0',

  // Re-export all helpers
  ...helpers,

  // Component classes
  Modal: UXModal,
  Password: UXPassword,
  Range: UXRange,
  OtpInput: UXOtpInput,
  Autocomplete: UXAutocomplete,
  TagInput: UXTagInput,
  Upload: UXUpload,

  // Component instances registry
  _instances: new WeakMap(),

  /**
   * Initialize all components with data-ux="js" or data-ux-{component}
   * Called automatically on DOMContentLoaded
   */
  init() {
    // Initialize components with data-ux="js" (class-based detection)
    document.querySelectorAll('[data-ux="js"]').forEach(el => {
      // Skip if already initialized
      if (this._instances.has(el)) return;

      // Find matching component
      for (const [className, ComponentClass] of Object.entries(componentMap)) {
        if (el.classList.contains(className)) {
          const instance = new ComponentClass(el);
          el._uxComponent = instance;
          this._instances.set(el, instance);
          break;
        }
      }
    });

    // Initialize components with specific data-ux-{component} attributes
    this._initByAttribute('data-ux-password', UXPassword);
    this._initByAttribute('data-ux-range', UXRange);
    this._initByAttribute('data-ux-otp', UXOtpInput);
    this._initByAttribute('data-ux-autocomplete', UXAutocomplete);
    this._initByAttribute('data-ux-tag-input', UXTagInput);
    this._initByAttribute('data-ux-upload', UXUpload);
  },

  /**
   * Initialize all elements with a specific attribute
   * @param {string} attribute - Data attribute to look for
   * @param {Function} ComponentClass - Component class constructor
   * @private
   */
  _initByAttribute(attribute, ComponentClass) {
    document.querySelectorAll(`[${attribute}]`).forEach(el => {
      if (this._instances.has(el)) return;
      const instance = new ComponentClass(el);
      el._uxComponent = instance;
      this._instances.set(el, instance);
    });
  },

  /**
   * Get component instance from element
   * @param {HTMLElement|string} selector - Element or selector
   * @returns {object|undefined} Component instance
   */
  get(selector) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    return el?._uxComponent || this._instances.get(el);
  },

  /**
   * Create a new component instance manually
   * @param {string} type - Component type (e.g., 'modal')
   * @param {HTMLElement|string} element - Element or selector
   * @param {object} options - Component options
   * @returns {object} Component instance
   */
  create(type, element, options = {}) {
    const ComponentClass = {
      modal: UXModal,
      password: UXPassword,
      range: UXRange,
      otp: UXOtpInput,
      otpinput: UXOtpInput,
      autocomplete: UXAutocomplete,
      taginput: UXTagInput,
      'tag-input': UXTagInput,
      upload: UXUpload,
    }[type.toLowerCase()];

    if (!ComponentClass) {
      console.warn(`UX: Unknown component type "${type}"`);
      return null;
    }

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) {
      console.warn('UX: Element not found');
      return null;
    }

    const instance = new ComponentClass(el, options);
    el._uxComponent = instance;
    this._instances.set(el, instance);
    return instance;
  },

  /**
   * Destroy a component instance
   * @param {HTMLElement|string} selector - Element or selector
   */
  destroy(selector) {
    const instance = this.get(selector);
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }

    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (el) {
      delete el._uxComponent;
      this._instances.delete(el);
    }
  }
};

// ==========================================================
// Auto-initialization
// ==========================================================

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UX.init());
  } else {
    // DOM already loaded
    UX.init();
  }
}

// ==========================================================
// Export for different module systems
// ==========================================================

// ES Modules
export {
  UX,
  UXModal,
  UXPassword,
  UXRange,
  UXOtpInput,
  UXAutocomplete,
  UXTagInput,
  UXUpload,
  // Re-export helpers for tree-shaking
  helpers
};

// Default export
export default UX;

// Global for IIFE/browser
if (typeof window !== 'undefined') {
  window.UX = UX;
}
