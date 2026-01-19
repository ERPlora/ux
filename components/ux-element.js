/**
 * UXElement - Universal Web Component Base Class
 *
 * Base class for creating Web Components that work with:
 * - React (via props and events)
 * - Vue (via props, v-model, and events)
 * - HTMX (via hx-trigger and custom events)
 * - Alpine.js (via x-data bindings)
 * - Vanilla JavaScript (via DOM API)
 *
 * Features:
 * - Shadow DOM encapsulation (styles don't leak, framework styles don't interfere)
 * - CustomEvent with bubbles: true, composed: true (events cross shadow boundary)
 * - Attribute reflection (attributes sync with properties)
 * - Slot-based content projection
 * - CSS custom properties pass through shadow boundary
 *
 * @requires ux-core.js (optional, for shared utilities)
 */
(function() {
  'use strict';

  // ============================================================================
  // UXElement Base Class
  // ============================================================================

  class UXElement extends HTMLElement {
    /**
     * Override in subclass to define observed attributes
     * @returns {string[]}
     */
    static get observedAttributes() {
      return [];
    }

    /**
     * Override in subclass to provide component styles
     * @returns {string}
     */
    static get styles() {
      return '';
    }

    /**
     * Override in subclass to provide template HTML
     * @returns {string}
     */
    static get template() {
      return '<slot></slot>';
    }

    constructor() {
      super();

      // Create shadow root with open mode (allows external JS access if needed)
      this.attachShadow({ mode: 'open' });

      // Track if component is connected
      this._isConnected = false;

      // Store bound event handlers for cleanup
      this._boundHandlers = new Map();
    }

    /**
     * Called when element is added to DOM
     */
    connectedCallback() {
      this._isConnected = true;

      // Render shadow DOM content
      this._render();

      // Setup event listeners for HTMX-style control
      this._setupEventListeners();

      // Call lifecycle hook
      this.connected?.();
    }

    /**
     * Called when element is removed from DOM
     */
    disconnectedCallback() {
      this._isConnected = false;

      // Cleanup event listeners
      this._cleanupEventListeners();

      // Call lifecycle hook
      this.disconnected?.();
    }

    /**
     * Called when observed attribute changes
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;

      // Convert kebab-case to camelCase for property
      const propName = name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

      // Call property changed hook
      this.attributeChanged?.(name, oldValue, newValue);
      this[`${propName}Changed`]?.(oldValue, newValue);
    }

    /**
     * Render shadow DOM content
     * @private
     */
    _render() {
      const styles = this.constructor.styles;
      const template = this.constructor.template;

      // Include core CSS variables from document
      const coreVars = this._getCoreVariables();

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          :host([hidden]) {
            display: none;
          }
          ${coreVars}
          ${styles}
        </style>
        ${template}
      `;

      // Call render hook for subclasses
      this.rendered?.();
    }

    /**
     * Get core CSS variables to inject into shadow DOM
     * This allows UX theme variables to pass through
     * @private
     */
    _getCoreVariables() {
      // CSS custom properties automatically inherit through shadow DOM
      // but we need to explicitly reference them in our styles
      return `
        /* Inherit UX CSS variables through shadow boundary */
        :host {
          /* Colors */
          --_ux-primary: var(--ux-primary, #007aff);
          --_ux-primary-rgb: var(--ux-primary-rgb, 0, 122, 255);
          --_ux-success: var(--ux-success, #34c759);
          --_ux-warning: var(--ux-warning, #ff9500);
          --_ux-danger: var(--ux-danger, #ff3b30);

          /* Surfaces */
          --_ux-surface: var(--ux-surface, #ffffff);
          --_ux-surface-secondary: var(--ux-surface-secondary, #f2f2f7);
          --_ux-text: var(--ux-text, #000000);
          --_ux-text-secondary: var(--ux-text-secondary, #8e8e93);
          --_ux-border-color: var(--ux-border-color, #c6c6c8);

          /* Glass */
          --_ux-glass-bg: var(--ux-glass-bg, rgba(255, 255, 255, 0.72));
          --_ux-glass-blur: var(--ux-glass-blur, 20px);
          --_ux-glass-border: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
          --_ux-glass-saturation: var(--ux-glass-saturation, 180%);

          /* Spacing */
          --_ux-space-xs: var(--ux-space-xs, 0.25rem);
          --_ux-space-sm: var(--ux-space-sm, 0.5rem);
          --_ux-space-md: var(--ux-space-md, 1rem);
          --_ux-space-lg: var(--ux-space-lg, 1.5rem);

          /* Typography */
          --_ux-font-family: var(--ux-font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif);
          --_ux-font-size-sm: var(--ux-font-size-sm, 0.875rem);
          --_ux-font-size-md: var(--ux-font-size-md, 1rem);
          --_ux-font-size-lg: var(--ux-font-size-lg, 1.125rem);

          /* Transitions */
          --_ux-transition-fast: var(--ux-transition-fast, 150ms);
          --_ux-transition-normal: var(--ux-transition-normal, 200ms);
          --_ux-ease: var(--ux-ease, cubic-bezier(0.4, 0, 0.2, 1));

          /* Border radius */
          --_ux-border-radius: var(--ux-border-radius, 8px);
          --_ux-border-radius-lg: var(--ux-border-radius-lg, 12px);
          --_ux-border-radius-xl: var(--ux-border-radius-xl, 16px);

          /* Touch */
          --_ux-touch-target: var(--ux-touch-target, 44px);
        }
      `;
    }

    /**
     * Setup standard event listeners for HTMX-style control
     * @private
     */
    _setupEventListeners() {
      // Listen for standard control events
      // These use bubbles: true, composed: true for HTMX compatibility
      const events = ['ux:open', 'ux:close', 'ux:toggle', 'ux:show', 'ux:hide'];

      events.forEach(eventName => {
        const handler = (e) => {
          const method = eventName.replace('ux:', '');
          if (typeof this[method] === 'function') {
            this[method](e.detail);
          }
        };
        this._boundHandlers.set(eventName, handler);
        this.addEventListener(eventName, handler);
      });
    }

    /**
     * Cleanup event listeners
     * @private
     */
    _cleanupEventListeners() {
      this._boundHandlers.forEach((handler, eventName) => {
        this.removeEventListener(eventName, handler);
      });
      this._boundHandlers.clear();
    }

    // ========================================
    // Event Emitting (HTMX/Framework compatible)
    // ========================================

    /**
     * Emit a custom event that crosses shadow boundary
     * Compatible with HTMX's hx-trigger
     *
     * @param {string} name - Event name (will be prefixed with 'ux:')
     * @param {*} detail - Event detail data
     * @returns {boolean} - Whether the event was cancelled
     */
    emit(name, detail = {}) {
      const event = new CustomEvent(`ux:${name}`, {
        bubbles: true,      // Bubbles up the DOM tree
        composed: true,     // Crosses shadow DOM boundary
        cancelable: true,   // Can be cancelled with preventDefault()
        detail
      });
      return this.dispatchEvent(event);
    }

    /**
     * Emit event without ux: prefix
     * @param {string} name
     * @param {*} detail
     */
    emitRaw(name, detail = {}) {
      const event = new CustomEvent(name, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail
      });
      return this.dispatchEvent(event);
    }

    // ========================================
    // Utility Methods
    // ========================================

    /**
     * Query element in shadow DOM
     * @param {string} selector
     * @returns {Element|null}
     */
    $(selector) {
      return this.shadowRoot.querySelector(selector);
    }

    /**
     * Query all elements in shadow DOM
     * @param {string} selector
     * @returns {NodeList}
     */
    $$(selector) {
      return this.shadowRoot.querySelectorAll(selector);
    }

    /**
     * Get or set a boolean attribute
     * @param {string} name
     * @param {boolean} [value]
     */
    toggleAttribute(name, value) {
      if (value === undefined) {
        return this.hasAttribute(name);
      }
      if (value) {
        this.setAttribute(name, '');
      } else {
        this.removeAttribute(name);
      }
    }

    /**
     * Lock body scroll
     */
    lockScroll() {
      if (window.UX?.lockScroll) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }
    }

    /**
     * Unlock body scroll
     */
    unlockScroll() {
      if (window.UX?.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }
    }

    /**
     * Escape HTML entities
     * @param {string} str
     * @returns {string}
     */
    escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  }

  // ============================================================================
  // Export
  // ============================================================================

  window.UXElement = UXElement;

  // Also attach to UX namespace if available
  if (window.UX) {
    window.UX.Element = UXElement;
  }

})();
