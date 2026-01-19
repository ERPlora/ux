/**
 * UX Tooltip Component
 * Tooltips estilo iOS/macOS para hints en hover
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Tooltip
    ======================================== */

    .ux-tooltip {
      position: relative;
      display: inline-flex;
    }

    .ux-tooltip__content {
      position: absolute;
      z-index: var(--ux-z-tooltip);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: var(--ux-dark);
      color: white;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      line-height: 1.4;
      border-radius: var(--ux-border-radius-sm);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Arrow */
    .ux-tooltip__content::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
    }

    /* Show on hover/focus */
    .ux-tooltip:hover .ux-tooltip__content,
    .ux-tooltip:focus-within .ux-tooltip__content,
    .ux-tooltip--open .ux-tooltip__content {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       Positions
    ======================================== */

    /* Top (default) */
    .ux-tooltip__content,
    .ux-tooltip--top .ux-tooltip__content {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
    }

    .ux-tooltip:hover .ux-tooltip__content,
    .ux-tooltip:focus-within .ux-tooltip__content,
    .ux-tooltip--open .ux-tooltip__content,
    .ux-tooltip--top:hover .ux-tooltip__content,
    .ux-tooltip--top:focus-within .ux-tooltip__content,
    .ux-tooltip--top.ux-tooltip--open .ux-tooltip__content {
      transform: translateX(-50%) translateY(-4px);
    }

    .ux-tooltip__content::before,
    .ux-tooltip--top .ux-tooltip__content::before {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--ux-dark);
    }

    /* Bottom */
    .ux-tooltip--bottom .ux-tooltip__content {
      top: 100%;
      bottom: auto;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
    }

    .ux-tooltip--bottom:hover .ux-tooltip__content,
    .ux-tooltip--bottom:focus-within .ux-tooltip__content,
    .ux-tooltip--bottom.ux-tooltip--open .ux-tooltip__content {
      transform: translateX(-50%) translateY(4px);
    }

    .ux-tooltip--bottom .ux-tooltip__content::before {
      top: auto;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: transparent;
      border-bottom-color: var(--ux-dark);
    }

    /* Left */
    .ux-tooltip--left .ux-tooltip__content {
      top: 50%;
      right: 100%;
      bottom: auto;
      left: auto;
      transform: translateY(-50%) translateX(-8px);
    }

    .ux-tooltip--left:hover .ux-tooltip__content,
    .ux-tooltip--left:focus-within .ux-tooltip__content,
    .ux-tooltip--left.ux-tooltip--open .ux-tooltip__content {
      transform: translateY(-50%) translateX(-4px);
    }

    .ux-tooltip--left .ux-tooltip__content::before {
      top: 50%;
      right: auto;
      left: 100%;
      transform: translateY(-50%);
      border-top-color: transparent;
      border-left-color: var(--ux-dark);
    }

    /* Right */
    .ux-tooltip--right .ux-tooltip__content {
      top: 50%;
      left: 100%;
      bottom: auto;
      right: auto;
      transform: translateY(-50%) translateX(8px);
    }

    .ux-tooltip--right:hover .ux-tooltip__content,
    .ux-tooltip--right:focus-within .ux-tooltip__content,
    .ux-tooltip--right.ux-tooltip--open .ux-tooltip__content {
      transform: translateY(-50%) translateX(4px);
    }

    .ux-tooltip--right .ux-tooltip__content::before {
      top: 50%;
      left: auto;
      right: 100%;
      transform: translateY(-50%);
      border-top-color: transparent;
      border-right-color: var(--ux-dark);
    }

    /* ========================================
       Variants
    ======================================== */

    /* Light variant */
    .ux-tooltip--light .ux-tooltip__content {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .ux-tooltip--light .ux-tooltip__content::before,
    .ux-tooltip--light.ux-tooltip--top .ux-tooltip__content::before {
      border-top-color: var(--ux-surface);
    }

    .ux-tooltip--light.ux-tooltip--bottom .ux-tooltip__content::before {
      border-top-color: transparent;
      border-bottom-color: var(--ux-surface);
    }

    .ux-tooltip--light.ux-tooltip--left .ux-tooltip__content::before {
      border-top-color: transparent;
      border-left-color: var(--ux-surface);
    }

    .ux-tooltip--light.ux-tooltip--right .ux-tooltip__content::before {
      border-top-color: transparent;
      border-right-color: var(--ux-surface);
    }

    /* Primary variant */
    .ux-tooltip--primary .ux-tooltip__content {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-tooltip--primary .ux-tooltip__content::before,
    .ux-tooltip--primary.ux-tooltip--top .ux-tooltip__content::before {
      border-top-color: var(--ux-primary);
    }

    .ux-tooltip--primary.ux-tooltip--bottom .ux-tooltip__content::before {
      border-top-color: transparent;
      border-bottom-color: var(--ux-primary);
    }

    .ux-tooltip--primary.ux-tooltip--left .ux-tooltip__content::before {
      border-top-color: transparent;
      border-left-color: var(--ux-primary);
    }

    .ux-tooltip--primary.ux-tooltip--right .ux-tooltip__content::before {
      border-top-color: transparent;
      border-right-color: var(--ux-primary);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-tooltip--sm .ux-tooltip__content {
      padding: 4px 8px;
      font-size: var(--ux-font-size-xs);
    }

    .ux-tooltip--lg .ux-tooltip__content {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Multi-line / Rich Content
    ======================================== */

    .ux-tooltip--multiline .ux-tooltip__content {
      white-space: normal;
      max-width: 250px;
      text-align: center;
    }

    .ux-tooltip--rich .ux-tooltip__content {
      white-space: normal;
      max-width: 300px;
      text-align: left;
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-tooltip__title {
      font-weight: 600;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-tooltip__description {
      font-weight: 400;
      opacity: 0.9;
    }

    /* ========================================
       Delay Variants
    ======================================== */

    .ux-tooltip--delay-short:hover .ux-tooltip__content {
      transition-delay: 200ms;
    }

    .ux-tooltip--delay:hover .ux-tooltip__content {
      transition-delay: 500ms;
    }

    .ux-tooltip--delay-long:hover .ux-tooltip__content {
      transition-delay: 1000ms;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-tooltip--glass .ux-tooltip__content {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      color: var(--ux-text);
    }

    .ux-tooltip--glass .ux-tooltip__content::before {
      display: none;
    }

    /* ========================================
       Touch Device Handling
    ======================================== */

    @media (hover: none) {
      /* On touch devices, show tooltip only when .ux-tooltip--open is added */
      .ux-tooltip:hover .ux-tooltip__content {
        opacity: 0;
        visibility: hidden;
      }

      .ux-tooltip--open .ux-tooltip__content {
        opacity: 1;
        visibility: visible;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-tooltip__content {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tooltip-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tooltip-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ============================================================================
  // Vanilla JS Implementation
  // ============================================================================

  class UXTooltip {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      // Prevent double initialization
      if (this.el._uxTooltip) return this.el._uxTooltip;

      this.options = {
        delay: 0,
        position: 'top', // top, bottom, left, right
        trigger: 'hover', // hover, click, manual
        ...options
      };

      this.isOpen = false;
      this._timeout = null;
      this._boundHandlers = {};

      this._init();
      this.el._uxTooltip = this;
    }

    _init() {
      // Find tooltip content
      this.content = this.el.querySelector('.ux-tooltip__content');
      if (!this.content) return;

      // Bind handlers based on trigger type
      if (this.options.trigger === 'hover') {
        this._boundHandlers.mouseEnter = () => this.show();
        this._boundHandlers.mouseLeave = () => this.hide();
        this._boundHandlers.focusIn = () => this.show();
        this._boundHandlers.focusOut = () => this.hide();

        this.el.addEventListener('mouseenter', this._boundHandlers.mouseEnter);
        this.el.addEventListener('mouseleave', this._boundHandlers.mouseLeave);
        this.el.addEventListener('focusin', this._boundHandlers.focusIn);
        this.el.addEventListener('focusout', this._boundHandlers.focusOut);
      } else if (this.options.trigger === 'click') {
        this._boundHandlers.click = (e) => {
          e.stopPropagation();
          this.toggle();
        };
        this._boundHandlers.clickOutside = (e) => {
          if (this.isOpen && !this.el.contains(e.target)) {
            this.hide();
          }
        };

        this.el.addEventListener('click', this._boundHandlers.click);
        document.addEventListener('click', this._boundHandlers.clickOutside);
      }
      // 'manual' trigger requires programmatic control via show/hide/toggle
    }

    show() {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }

      if (this.options.delay > 0) {
        this._timeout = setTimeout(() => {
          this._doShow();
        }, this.options.delay);
      } else {
        this._doShow();
      }
    }

    _doShow() {
      this.isOpen = true;
      this.el.classList.add('ux-tooltip--open');
      this.el.dispatchEvent(new CustomEvent('tooltip:show', { bubbles: true }));
    }

    hide() {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }

      this.isOpen = false;
      this.el.classList.remove('ux-tooltip--open');
      this.el.dispatchEvent(new CustomEvent('tooltip:hide', { bubbles: true }));
    }

    toggle() {
      this.isOpen ? this.hide() : this.show();
    }

    destroy() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      if (this.options.trigger === 'hover') {
        this.el.removeEventListener('mouseenter', this._boundHandlers.mouseEnter);
        this.el.removeEventListener('mouseleave', this._boundHandlers.mouseLeave);
        this.el.removeEventListener('focusin', this._boundHandlers.focusIn);
        this.el.removeEventListener('focusout', this._boundHandlers.focusOut);
      } else if (this.options.trigger === 'click') {
        this.el.removeEventListener('click', this._boundHandlers.click);
        document.removeEventListener('click', this._boundHandlers.clickOutside);
      }

      delete this.el._uxTooltip;
    }

    // Static methods
    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxTooltip || null;
    }

    static show(element) {
      const instance = UXTooltip.getInstance(element);
      if (instance) instance.show();
    }

    static hide(element) {
      const instance = UXTooltip.getInstance(element);
      if (instance) instance.hide();
    }

    static toggle(element) {
      const instance = UXTooltip.getInstance(element);
      if (instance) instance.toggle();
    }
  }

  // Auto-initialize tooltips with data-ux-tooltip attribute
  function initTooltips() {
    document.querySelectorAll('[data-ux-tooltip]').forEach(el => {
      if (!el._uxTooltip) {
        const options = {};
        if (el.dataset.delay !== undefined) options.delay = parseInt(el.dataset.delay, 10);
        if (el.dataset.position !== undefined) options.position = el.dataset.position;
        if (el.dataset.trigger !== undefined) options.trigger = el.dataset.trigger;
        new UXTooltip(el, options);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltips);
  } else {
    initTooltips();
  }

  // Watch for dynamically added tooltips
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.matches && node.matches('[data-ux-tooltip]') && !node._uxTooltip) {
            new UXTooltip(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-ux-tooltip]').forEach(el => {
              if (!el._uxTooltip) new UXTooltip(el);
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Export
  window.UXTooltip = UXTooltip;

  // ============================================================================
  // Alpine.js Component (for backward compatibility)
  // ============================================================================

  // Alpine component for programmatic tooltip control
  const tooltipComponent = (config = {}) => ({
    isOpen: config.open || false,
    delay: config.delay || 0,
    _timeout: null,

    show() {
      if (this.delay > 0) {
        this._timeout = setTimeout(() => {
          this.isOpen = true;
        }, this.delay);
      } else {
        this.isOpen = true;
      }
    },

    hide() {
      if (this._timeout) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
      this.isOpen = false;
    },

    toggle() {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTooltip', tooltipComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTooltip', tooltipComponent);
    });
  }
})();
