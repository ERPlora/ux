/**
 * UX Password Component
 * Vanilla JavaScript password input with show/hide toggle
 * Part of the UX Library
 */

import { dispatch } from '../core/helpers.js';

/**
 * UXPassword - Password input with visibility toggle
 *
 * @example
 * // Auto-initialize with data-ux-password
 * <div class="ux-input-password" data-ux-password>
 *   <input type="password" class="ux-input">
 *   <button type="button" class="ux-input-password__toggle" data-ux-toggle>
 *     <svg data-ux-icon="show">...</svg>
 *     <svg data-ux-icon="hide" style="display:none">...</svg>
 *   </button>
 * </div>
 *
 * @example
 * // Manual initialization
 * const password = new UXPassword('#my-password');
 * password.toggle();
 */
export class UXPassword {
  /**
   * Create a password input instance
   * @param {HTMLElement|string} element - Password wrapper element or selector
   * @param {object} options - Configuration options
   * @param {string} [options.inputSelector='input'] - Selector for the input element
   * @param {string} [options.toggleSelector='[data-ux-toggle], .ux-input-password__toggle'] - Selector for toggle button
   * @param {string} [options.showIconSelector='[data-ux-icon="show"]'] - Selector for show icon
   * @param {string} [options.hideIconSelector='[data-ux-icon="hide"]'] - Selector for hide icon
   */
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.el) {
      console.warn('UXPassword: Element not found');
      return;
    }

    this.options = {
      inputSelector: 'input',
      toggleSelector: '[data-ux-toggle], .ux-input-password__toggle',
      showIconSelector: '[data-ux-icon="show"]',
      hideIconSelector: '[data-ux-icon="hide"]',
      ...options
    };

    // Find elements
    this.input = this.el.querySelector(this.options.inputSelector);
    this.toggleBtn = this.el.querySelector(this.options.toggleSelector);
    this.showIcon = this.el.querySelector(this.options.showIconSelector);
    this.hideIcon = this.el.querySelector(this.options.hideIconSelector);

    // State
    this._visible = false;

    this._init();
  }

  /**
   * Initialize event listeners
   * @private
   */
  _init() {
    if (!this.input) {
      console.warn('UXPassword: Input element not found');
      return;
    }

    // Toggle button click
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }

    // Initial icon state
    this._updateIcons();
  }

  /**
   * Update icon visibility
   * @private
   */
  _updateIcons() {
    if (this.showIcon) {
      this.showIcon.style.display = this._visible ? 'none' : '';
    }
    if (this.hideIcon) {
      this.hideIcon.style.display = this._visible ? '' : 'none';
    }
  }

  /**
   * Show password (change to text input)
   */
  show() {
    if (!this.input) return;

    this._visible = true;
    this.input.type = 'text';
    this._updateIcons();

    dispatch(this.el, 'ux:password:show');
  }

  /**
   * Hide password (change to password input)
   */
  hide() {
    if (!this.input) return;

    this._visible = false;
    this.input.type = 'password';
    this._updateIcons();

    dispatch(this.el, 'ux:password:hide');
  }

  /**
   * Toggle password visibility
   */
  toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }

    dispatch(this.el, 'ux:password:toggle', { visible: this._visible });
  }

  /**
   * Check if password is visible
   * @returns {boolean}
   */
  isVisible() {
    return this._visible;
  }

  /**
   * Get the current input value
   * @returns {string}
   */
  getValue() {
    return this.input?.value || '';
  }

  /**
   * Set the input value
   * @param {string} value
   */
  setValue(value) {
    if (this.input) {
      this.input.value = value;
    }
  }

  /**
   * Destroy the instance and cleanup
   */
  destroy() {
    delete this.el._uxComponent;
  }
}

export default UXPassword;
