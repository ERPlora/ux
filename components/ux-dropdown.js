(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Dropdown - Menu Dropdown Component
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Dropdown Tokens */
      --ux-dropdown-min-width: 180px;
      --ux-dropdown-max-width: 320px;
      --ux-dropdown-padding: var(--ux-space-xs);
      --ux-dropdown-border-radius: var(--ux-border-radius-lg);
      --ux-dropdown-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.1);
      --ux-dropdown-item-height: 44px;
      --ux-dropdown-item-padding: 0 var(--ux-space-md);
      --ux-dropdown-item-gap: var(--ux-space-sm);
      --ux-dropdown-divider-margin: var(--ux-space-xs);
      --ux-dropdown-header-padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* ==========================================================================
       Dropdown Container
       ========================================================================== */

    .ux-dropdown {
      position: relative;
      display: inline-block;
    }

    /* ==========================================================================
       Dropdown Trigger
       ========================================================================== */

    .ux-dropdown__trigger {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-dropdown__trigger[aria-expanded="true"] .ux-dropdown__caret {
      transform: rotate(180deg);
    }

    .ux-dropdown__caret {
      width: 16px;
      height: 16px;
      transition: transform var(--ux-transition-fast) var(--ux-ease-ios);
      opacity: 0.6;
    }

    .ux-dropdown__caret svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Dropdown Menu
       ========================================================================== */

    .ux-dropdown__menu {
      position: absolute;
      z-index: var(--ux-z-dropdown);
      min-width: var(--ux-dropdown-min-width);
      max-width: var(--ux-dropdown-max-width);
      max-height: 320px;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: var(--ux-dropdown-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-dropdown-border-radius);
      box-shadow: var(--ux-dropdown-shadow);

      /* Hidden by default */
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(-8px);
      transform-origin: top left;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease-ios),
        transform var(--ux-transition-fast) var(--ux-ease-ios),
        visibility var(--ux-transition-fast);
    }

    /* Visible state */
    .ux-dropdown--open .ux-dropdown__menu,
    .ux-dropdown__menu[data-show] {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }

    /* Position variants */
    .ux-dropdown__menu--top {
      bottom: 100%;
      top: auto;
      margin-bottom: var(--ux-space-xs);
      transform-origin: bottom left;
      transform: scale(0.95) translateY(8px);
    }

    .ux-dropdown--open .ux-dropdown__menu--top,
    .ux-dropdown__menu--top[data-show] {
      transform: scale(1) translateY(0);
    }

    .ux-dropdown__menu--right {
      right: 0;
      left: auto;
      transform-origin: top right;
    }

    .ux-dropdown__menu--top.ux-dropdown__menu--right {
      transform-origin: bottom right;
    }

    .ux-dropdown__menu--left {
      left: 0;
      right: auto;
    }

    .ux-dropdown__menu--center {
      left: 50%;
      transform: scale(0.95) translateY(-8px) translateX(-50%);
      transform-origin: top center;
    }

    .ux-dropdown--open .ux-dropdown__menu--center,
    .ux-dropdown__menu--center[data-show] {
      transform: scale(1) translateY(0) translateX(-50%);
    }

    /* ==========================================================================
       Dropdown Item
       ========================================================================== */

    .ux-dropdown__item {
      display: flex;
      align-items: center;
      gap: var(--ux-dropdown-item-gap);
      min-height: var(--ux-dropdown-item-height);
      padding: var(--ux-dropdown-item-padding);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      text-decoration: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease-ios);
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-dropdown__item:hover,
    .ux-dropdown__item:focus {
      background: var(--ux-surface-secondary);
      outline: none;
    }

    .ux-dropdown__item:active {
      background: var(--ux-surface-tertiary);
    }

    .ux-dropdown__item:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
    }

    /* Item icon */
    .ux-dropdown__item-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      opacity: 0.7;
    }

    .ux-dropdown__item-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Item text */
    .ux-dropdown__item-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Item shortcut */
    .ux-dropdown__item-shortcut {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-left: auto;
      padding-left: var(--ux-space-md);
    }

    /* Item badge */
    .ux-dropdown__item-badge {
      font-size: var(--ux-font-size-xs);
      background: var(--ux-primary);
      color: white;
      padding: 2px 6px;
      border-radius: var(--ux-border-radius-pill);
      margin-left: auto;
    }

    /* Item check (for selectable items) */
    .ux-dropdown__item-check {
      width: 16px;
      height: 16px;
      margin-left: auto;
      opacity: 0;
      color: var(--ux-primary);
      transition: opacity var(--ux-transition-fast);
    }

    .ux-dropdown__item--selected .ux-dropdown__item-check {
      opacity: 1;
    }

    .ux-dropdown__item-check svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Item Variants
       ========================================================================== */

    /* Danger item */
    .ux-dropdown__item--danger {
      color: var(--ux-danger);
    }

    .ux-dropdown__item--danger:hover,
    .ux-dropdown__item--danger:focus {
      background: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-dropdown__item--danger .ux-dropdown__item-icon {
      opacity: 1;
    }

    /* Disabled item */
    .ux-dropdown__item--disabled,
    .ux-dropdown__item:disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }

    /* Selected item */
    .ux-dropdown__item--selected {
      color: var(--ux-primary);
      font-weight: 500;
    }

    /* Active item (keyboard navigation) */
    .ux-dropdown__item--active {
      background: var(--ux-surface-secondary);
    }

    /* ==========================================================================
       Dropdown Divider
       ========================================================================== */

    .ux-dropdown__divider {
      height: 1px;
      background: var(--ux-border-color);
      margin: var(--ux-dropdown-divider-margin) 0;
    }

    /* ==========================================================================
       Dropdown Header
       ========================================================================== */

    .ux-dropdown__header {
      padding: var(--ux-dropdown-header-padding);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ==========================================================================
       Dropdown Group
       ========================================================================== */

    .ux-dropdown__group {
      padding: var(--ux-space-xs) 0;
    }

    .ux-dropdown__group:first-child {
      padding-top: 0;
    }

    .ux-dropdown__group:last-child {
      padding-bottom: 0;
    }

    .ux-dropdown__group + .ux-dropdown__group {
      border-top: 1px solid var(--ux-border-color);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-dropdown__menu--glass,
    .ux-dropdown--glass .ux-dropdown__menu {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-dropdown__menu--glass .ux-dropdown__item:hover,
    .ux-dropdown--glass .ux-dropdown__item:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .ux-dropdown__menu--glass .ux-dropdown__item:active,
    .ux-dropdown--glass .ux-dropdown__item:active {
      background: rgba(255, 255, 255, 0.25);
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-dropdown__menu--compact {
      --ux-dropdown-item-height: 36px;
      --ux-dropdown-padding: 4px;
    }

    .ux-dropdown__menu--compact .ux-dropdown__item {
      font-size: var(--ux-font-size-sm);
    }

    /* ==========================================================================
       Wide Variant
       ========================================================================== */

    .ux-dropdown__menu--wide {
      --ux-dropdown-min-width: 240px;
    }

    .ux-dropdown__menu--full {
      width: 100%;
      max-width: none;
    }

    /* ==========================================================================
       Submenu
       ========================================================================== */

    .ux-dropdown__submenu {
      position: relative;
    }

    .ux-dropdown__submenu > .ux-dropdown__item::after {
      content: '';
      width: 16px;
      height: 16px;
      margin-left: auto;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
    }

    .ux-dropdown__submenu .ux-dropdown__menu {
      left: 100%;
      top: 0;
      margin-left: var(--ux-space-xs);
      transform-origin: left top;
    }

    .ux-dropdown__submenu:hover > .ux-dropdown__menu {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-dropdown-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      :root:not(.ux-light) .ux-dropdown__menu--glass .ux-dropdown__item:hover,
      :root:not(.ux-light) .ux-dropdown--glass .ux-dropdown__item:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark {
      --ux-dropdown-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .ux-dark .ux-dropdown__menu--glass .ux-dropdown__item:hover,
    .ux-dark .ux-dropdown--glass .ux-dropdown__item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-dropdown__menu {
        transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
        transform: none !important;
      }

      .ux-dropdown--open .ux-dropdown__menu,
      .ux-dropdown__menu[data-show] {
        transform: none !important;
      }
    }

    /* ==========================================================================
       Mobile Styles
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-dropdown__menu {
        --ux-dropdown-item-height: 48px;
      }

      /* Full width on very small screens */
      .ux-dropdown--mobile-full .ux-dropdown__menu {
        position: fixed;
        left: var(--ux-space-md) !important;
        right: var(--ux-space-md) !important;
        bottom: var(--ux-space-md);
        top: auto !important;
        max-width: none;
        width: auto;
        border-radius: var(--ux-border-radius-xl);
        transform-origin: bottom center;
        transform: scale(0.95) translateY(20px);
      }

      .ux-dropdown--mobile-full.ux-dropdown--open .ux-dropdown__menu {
        transform: scale(1) translateY(0);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-dropdown-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-dropdown-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ============================================================================
  // Vanilla JS Implementation
  // ============================================================================

  class UXDropdown {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      // Prevent double initialization
      if (this.el._uxDropdown) return this.el._uxDropdown;

      this.options = {
        closeOnSelect: true,
        closeOnClickOutside: true,
        closeOnEscape: true,
        triggerOnHover: false,
        hoverDelay: 150,
        ...options
      };

      this.isOpen = false;
      this.activeIndex = -1;
      this.items = [];
      this._hoverTimer = null;
      this._boundHandlers = {};

      this._init();
      this.el._uxDropdown = this;
    }

    _init() {
      // Find trigger and menu
      this.trigger = this.el.querySelector('.ux-dropdown__trigger');
      this.menu = this.el.querySelector('.ux-dropdown__menu');

      if (!this.trigger || !this.menu) return;

      // Set initial ARIA attributes
      this.trigger.setAttribute('aria-haspopup', 'true');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('role', 'menu');

      // Get items
      this._refreshItems();

      // Bind event handlers
      this._boundHandlers.triggerClick = (e) => {
        e.stopPropagation();
        this.toggle();
      };

      this._boundHandlers.triggerKeydown = (e) => this._handleKeydown(e);
      this._boundHandlers.menuKeydown = (e) => this._handleKeydown(e);

      this._boundHandlers.clickOutside = (e) => {
        if (this.isOpen && !this.el.contains(e.target)) {
          this.close();
        }
      };

      this._boundHandlers.escapeKey = (e) => {
        if (this.isOpen && e.key === 'Escape') {
          this.close();
          this.trigger.focus();
        }
      };

      // Hover handlers
      if (this.options.triggerOnHover) {
        this._boundHandlers.mouseEnter = () => this._handleMouseEnter();
        this._boundHandlers.mouseLeave = () => this._handleMouseLeave();
        this.el.addEventListener('mouseenter', this._boundHandlers.mouseEnter);
        this.el.addEventListener('mouseleave', this._boundHandlers.mouseLeave);
      }

      // Attach listeners
      this.trigger.addEventListener('click', this._boundHandlers.triggerClick);
      this.trigger.addEventListener('keydown', this._boundHandlers.triggerKeydown);
      this.menu.addEventListener('keydown', this._boundHandlers.menuKeydown);

      if (this.options.closeOnClickOutside) {
        document.addEventListener('click', this._boundHandlers.clickOutside);
      }

      if (this.options.closeOnEscape) {
        document.addEventListener('keydown', this._boundHandlers.escapeKey);
      }

      // Item click handlers
      this._bindItemClicks();
    }

    _refreshItems() {
      this.items = Array.from(this.el.querySelectorAll('.ux-dropdown__item:not(.ux-dropdown__item--disabled)'));
      this.items.forEach((item, index) => {
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '-1');
      });
    }

    _bindItemClicks() {
      this.items.forEach((item) => {
        item.addEventListener('click', (e) => {
          const value = item.dataset.value || item.textContent.trim();
          this.select(value);
        });
      });
    }

    open() {
      if (this.isOpen) return;

      this.isOpen = true;
      this.activeIndex = -1;
      this.el.classList.add('ux-dropdown--open');
      this.trigger.setAttribute('aria-expanded', 'true');
      this.menu.setAttribute('data-show', '');

      // Refresh items in case DOM changed
      this._refreshItems();

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('dropdown:open', { bubbles: true }));
    }

    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.activeIndex = -1;
      this.el.classList.remove('ux-dropdown--open');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.menu.removeAttribute('data-show');

      // Remove active class from items
      this.items.forEach(item => item.classList.remove('ux-dropdown__item--active'));

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('dropdown:close', { bubbles: true }));
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    select(value) {
      this.el.dispatchEvent(new CustomEvent('dropdown:select', {
        bubbles: true,
        detail: { value }
      }));

      if (this.options.closeOnSelect) {
        this.close();
        this.trigger.focus();
      }
    }

    _focusItem(index) {
      if (index < 0 || index >= this.items.length) return;

      // Remove active from previous
      if (this.activeIndex >= 0 && this.items[this.activeIndex]) {
        this.items[this.activeIndex].classList.remove('ux-dropdown__item--active');
      }

      this.activeIndex = index;
      this.items[index].classList.add('ux-dropdown__item--active');
      this.items[index].focus();
    }

    _focusFirst() {
      this._focusItem(0);
    }

    _focusLast() {
      this._focusItem(this.items.length - 1);
    }

    _focusNext() {
      const nextIndex = this.activeIndex < this.items.length - 1 ? this.activeIndex + 1 : 0;
      this._focusItem(nextIndex);
    }

    _focusPrev() {
      const prevIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.items.length - 1;
      this._focusItem(prevIndex);
    }

    _handleKeydown(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
            setTimeout(() => this._focusFirst(), 10);
          } else {
            this._focusNext();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
            setTimeout(() => this._focusLast(), 10);
          } else {
            this._focusPrev();
          }
          break;

        case 'Home':
          if (this.isOpen) {
            e.preventDefault();
            this._focusFirst();
          }
          break;

        case 'End':
          if (this.isOpen) {
            e.preventDefault();
            this._focusLast();
          }
          break;

        case 'Enter':
        case ' ':
          if (this.isOpen && this.activeIndex >= 0) {
            e.preventDefault();
            this.items[this.activeIndex].click();
          } else if (!this.isOpen) {
            e.preventDefault();
            this.open();
          }
          break;

        case 'Tab':
          if (this.isOpen) {
            this.close();
          }
          break;
      }
    }

    _handleMouseEnter() {
      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }
      this._hoverTimer = setTimeout(() => this.open(), this.options.hoverDelay);
    }

    _handleMouseLeave() {
      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }
      this._hoverTimer = setTimeout(() => this.close(), this.options.hoverDelay);
    }

    destroy() {
      // Remove event listeners
      this.trigger.removeEventListener('click', this._boundHandlers.triggerClick);
      this.trigger.removeEventListener('keydown', this._boundHandlers.triggerKeydown);
      this.menu.removeEventListener('keydown', this._boundHandlers.menuKeydown);

      if (this.options.closeOnClickOutside) {
        document.removeEventListener('click', this._boundHandlers.clickOutside);
      }

      if (this.options.closeOnEscape) {
        document.removeEventListener('keydown', this._boundHandlers.escapeKey);
      }

      if (this.options.triggerOnHover) {
        this.el.removeEventListener('mouseenter', this._boundHandlers.mouseEnter);
        this.el.removeEventListener('mouseleave', this._boundHandlers.mouseLeave);
      }

      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }

      delete this.el._uxDropdown;
    }

    // Static methods
    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxDropdown || null;
    }

    static open(element) {
      const instance = UXDropdown.getInstance(element);
      if (instance) instance.open();
    }

    static close(element) {
      const instance = UXDropdown.getInstance(element);
      if (instance) instance.close();
    }

    static toggle(element) {
      const instance = UXDropdown.getInstance(element);
      if (instance) instance.toggle();
    }
  }

  // Auto-initialize dropdowns with data-ux-dropdown attribute
  function initDropdowns() {
    document.querySelectorAll('[data-ux-dropdown]').forEach(el => {
      if (!el._uxDropdown) {
        const options = {};
        if (el.dataset.closeOnSelect !== undefined) options.closeOnSelect = el.dataset.closeOnSelect !== 'false';
        if (el.dataset.closeOnClickOutside !== undefined) options.closeOnClickOutside = el.dataset.closeOnClickOutside !== 'false';
        if (el.dataset.closeOnEscape !== undefined) options.closeOnEscape = el.dataset.closeOnEscape !== 'false';
        if (el.dataset.triggerOnHover !== undefined) options.triggerOnHover = el.dataset.triggerOnHover === 'true';
        if (el.dataset.hoverDelay !== undefined) options.hoverDelay = parseInt(el.dataset.hoverDelay, 10);
        new UXDropdown(el, options);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }

  // Watch for dynamically added dropdowns
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.matches && node.matches('[data-ux-dropdown]') && !node._uxDropdown) {
            new UXDropdown(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll('[data-ux-dropdown]').forEach(el => {
              if (!el._uxDropdown) new UXDropdown(el);
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Export
  window.UXDropdown = UXDropdown;

  // ============================================================================
  // Alpine.js Component (for backward compatibility)
  // ============================================================================

  // Alpine.js component
  const dropdownComponent = (config = {}) => ({
    isOpen: false,
    activeIndex: -1,
    items: [],

    // Config
    closeOnSelect: config.closeOnSelect !== false,
    closeOnClickOutside: config.closeOnClickOutside !== false,
    closeOnEscape: config.closeOnEscape !== false,
    triggerOnHover: config.triggerOnHover || false,
    hoverDelay: config.hoverDelay || 150,

    // Hover timer
    _hoverTimer: null,

    init() {
      // Get focusable items
      this.$nextTick(() => {
        this.items = Array.from(this.$el.querySelectorAll('.ux-dropdown__item:not(.ux-dropdown__item--disabled)'));
      });

      // Click outside handler
      if (this.closeOnClickOutside) {
        this._clickOutsideHandler = (e) => {
          if (this.isOpen && !this.$el.contains(e.target)) {
            this.close();
          }
        };
        document.addEventListener('click', this._clickOutsideHandler);
      }

      // Escape handler
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (this.isOpen && e.key === 'Escape') {
            this.close();
            this.focusTrigger();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }
    },

    destroy() {
      if (this._clickOutsideHandler) {
        document.removeEventListener('click', this._clickOutsideHandler);
      }
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }
    },

    // Open dropdown
    open() {
      if (this.isOpen) return;

      this.isOpen = true;
      this.activeIndex = -1;

      // Refresh items list
      this.$nextTick(() => {
        this.items = Array.from(this.$el.querySelectorAll('.ux-dropdown__item:not(.ux-dropdown__item--disabled)'));
      });

      this.$dispatch('dropdown:open');
    },

    // Close dropdown
    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.activeIndex = -1;

      this.$dispatch('dropdown:close');
    },

    // Toggle dropdown
    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    // Select an item
    select(value, closeAfter = this.closeOnSelect) {
      this.$dispatch('dropdown:select', { value });

      if (closeAfter) {
        this.close();
        this.focusTrigger();
      }
    },

    // Focus management
    focusTrigger() {
      const trigger = this.$el.querySelector('.ux-dropdown__trigger');
      if (trigger) trigger.focus();
    },

    focusItem(index) {
      if (index >= 0 && index < this.items.length) {
        this.activeIndex = index;
        this.items[index].focus();
      }
    },

    focusFirst() {
      this.focusItem(0);
    },

    focusLast() {
      this.focusItem(this.items.length - 1);
    },

    focusNext() {
      const nextIndex = this.activeIndex < this.items.length - 1 ? this.activeIndex + 1 : 0;
      this.focusItem(nextIndex);
    },

    focusPrev() {
      const prevIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.items.length - 1;
      this.focusItem(prevIndex);
    },

    // Keyboard navigation
    handleKeydown(e) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
            this.$nextTick(() => this.focusFirst());
          } else {
            this.focusNext();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (!this.isOpen) {
            this.open();
            this.$nextTick(() => this.focusLast());
          } else {
            this.focusPrev();
          }
          break;

        case 'Home':
          if (this.isOpen) {
            e.preventDefault();
            this.focusFirst();
          }
          break;

        case 'End':
          if (this.isOpen) {
            e.preventDefault();
            this.focusLast();
          }
          break;

        case 'Enter':
        case ' ':
          if (this.isOpen && this.activeIndex >= 0) {
            e.preventDefault();
            this.items[this.activeIndex].click();
          } else if (!this.isOpen) {
            e.preventDefault();
            this.open();
          }
          break;

        case 'Tab':
          if (this.isOpen) {
            this.close();
          }
          break;
      }
    },

    // Hover handlers (for hover-triggered dropdowns)
    handleMouseEnter() {
      if (!this.triggerOnHover) return;

      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }

      this._hoverTimer = setTimeout(() => {
        this.open();
      }, this.hoverDelay);
    },

    handleMouseLeave() {
      if (!this.triggerOnHover) return;

      if (this._hoverTimer) {
        clearTimeout(this._hoverTimer);
      }

      this._hoverTimer = setTimeout(() => {
        this.close();
      }, this.hoverDelay);
    },

    // ARIA attributes for trigger
    get triggerAttrs() {
      return {
        'aria-haspopup': 'true',
        'aria-expanded': this.isOpen.toString()
      };
    },

    // Container classes
    get containerClasses() {
      return {
        'ux-dropdown--open': this.isOpen
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxDropdown', dropdownComponent);
  }

})();
