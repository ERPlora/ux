/**
 * UX Modal Component
 * Vanilla JavaScript modal with accessibility support
 * Part of the UX Library
 */

import {
  setState,
  hasState,
  lockScroll,
  unlockScroll,
  trapFocus,
  dispatch,
  onEscape
} from '../core/helpers.js';

/**
 * UXModal - Interactive modal component
 *
 * @example
 * // Auto-initialize with data-ux="js"
 * <div class="ux-modal-backdrop" data-ux="js" data-state="closed">
 *   <div class="ux-modal">
 *     <button data-ux-close>Close</button>
 *   </div>
 * </div>
 *
 * @example
 * // Manual initialization
 * const modal = new UXModal('#my-modal', { closeOnEscape: true });
 * modal.open();
 */
export class UXModal {
  /**
   * Create a modal instance
   * @param {HTMLElement|string} element - Modal backdrop element or selector
   * @param {object} options - Configuration options
   * @param {boolean} [options.closeOnBackdrop=true] - Close when clicking backdrop
   * @param {boolean} [options.closeOnEscape=true] - Close when pressing Escape
   * @param {boolean} [options.lockScroll=true] - Lock body scroll when open
   * @param {boolean} [options.trapFocus=true] - Trap focus within modal
   */
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.el) {
      console.warn('UXModal: Element not found');
      return;
    }

    this.options = {
      closeOnBackdrop: true,
      closeOnEscape: true,
      lockScroll: true,
      trapFocus: true,
      ...options
    };

    // Internal state
    this._focusCleanup = null;
    this._escapeCleanup = null;
    this._previouslyFocused = null;

    this._init();
  }

  /**
   * Initialize event listeners
   * @private
   */
  _init() {
    // Click on backdrop to close
    if (this.options.closeOnBackdrop) {
      this.el.addEventListener('click', (e) => {
        if (e.target === this.el) {
          this.close();
        }
      });
    }

    // Close buttons with data-ux-close
    this.el.querySelectorAll('[data-ux-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Escape key
    if (this.options.closeOnEscape) {
      this._escapeCleanup = onEscape(() => {
        if (this.isOpen()) {
          this.close();
        }
      });
    }
  }

  /**
   * Open the modal
   */
  open() {
    // Save currently focused element
    this._previouslyFocused = document.activeElement;

    // Set state
    setState(this.el, 'open');

    // Lock scroll
    if (this.options.lockScroll) {
      lockScroll();
    }

    // Trap focus
    if (this.options.trapFocus) {
      const modalContent = this.el.querySelector('.ux-modal');
      if (modalContent) {
        this._focusCleanup = trapFocus(modalContent);
      }
    }

    // Dispatch event
    dispatch(this.el, 'ux:opened');
  }

  /**
   * Close the modal
   */
  close() {
    // Set state
    setState(this.el, 'closed');

    // Unlock scroll
    if (this.options.lockScroll) {
      unlockScroll();
    }

    // Release focus trap
    if (this._focusCleanup) {
      this._focusCleanup();
      this._focusCleanup = null;
    }

    // Restore focus to previously focused element
    if (this._previouslyFocused && typeof this._previouslyFocused.focus === 'function') {
      this._previouslyFocused.focus();
      this._previouslyFocused = null;
    }

    // Dispatch event
    dispatch(this.el, 'ux:closed');
  }

  /**
   * Toggle the modal
   */
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Check if modal is open
   * @returns {boolean}
   */
  isOpen() {
    return hasState(this.el, 'open');
  }

  /**
   * Destroy the modal instance and cleanup
   */
  destroy() {
    if (this._escapeCleanup) {
      this._escapeCleanup();
      this._escapeCleanup = null;
    }

    if (this._focusCleanup) {
      this._focusCleanup();
      this._focusCleanup = null;
    }

    // Remove instance reference
    delete this.el._uxComponent;
  }
}

export default UXModal;
