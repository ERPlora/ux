/**
 * UX Accordion Component
 * Acordeones expandibles estilo iOS
 * Funciona con JavaScript puro o Alpine.js
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Accordion
    ======================================== */

    .ux-accordion {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Accordion Item
    ======================================== */

    .ux-accordion-item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-accordion-item:last-child {
      border-bottom: none;
    }

    /* ========================================
       Accordion Header
    ======================================== */

    .ux-accordion-item__header {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: none;
      border: none;
      color: var(--ux-text);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      text-align: left;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-accordion-item__header:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-accordion-item__header:active {
      background-color: var(--ux-light);
    }

    .ux-accordion-item--disabled .ux-accordion-item__header {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-accordion-item--disabled .ux-accordion-item__header:hover {
      background-color: transparent;
    }

    /* ========================================
       Accordion Header Content
    ======================================== */

    .ux-accordion-item__icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-accordion-item__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-accordion-item__content {
      flex: 1;
      min-width: 0;
    }

    .ux-accordion-item__title {
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-accordion-item__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-accordion-item__chevron {
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-accordion-item__chevron svg {
      width: 100%;
      height: 100%;
    }

    .ux-accordion-item--open .ux-accordion-item__chevron {
      transform: rotate(180deg);
    }

    /* ========================================
       Accordion Body
    ======================================== */

    .ux-accordion-item__body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--ux-transition-base) var(--ux-ease);
    }

    .ux-accordion-item--open .ux-accordion-item__body {
      grid-template-rows: 1fr;
    }

    .ux-accordion-item__body-inner {
      overflow: hidden;
    }

    .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-lg) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      line-height: 1.6;
    }

    /* With left icon offset */
    .ux-accordion-item--with-icon .ux-accordion-item__body-content {
      padding-left: calc(var(--ux-space-lg) + 24px + var(--ux-space-md));
    }

    /* ========================================
       Accordion Variants
    ======================================== */

    /* Inset (iOS grouped style) */
    .ux-accordion--inset {
      margin: var(--ux-space-lg);
    }

    /* Outline */
    .ux-accordion--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
    }

    .ux-accordion--outline .ux-accordion-item {
      border-bottom-color: var(--ux-border-color);
    }

    /* Flat */
    .ux-accordion--flat {
      border-radius: 0;
      background-color: transparent;
    }

    .ux-accordion--flat .ux-accordion-item {
      background-color: var(--ux-surface);
      margin-bottom: var(--ux-space-sm);
      border-radius: var(--ux-border-radius);
      border-bottom: none;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-accordion--sm .ux-accordion-item__header {
      min-height: 40px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-accordion--sm .ux-accordion-item__icon {
      width: 20px;
      height: 20px;
    }

    .ux-accordion--sm .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-md) var(--ux-space-md);
      font-size: var(--ux-font-size-xs);
    }

    .ux-accordion--lg .ux-accordion-item__header {
      min-height: 60px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    .ux-accordion--lg .ux-accordion-item__body-content {
      padding: 0 var(--ux-space-xl) var(--ux-space-xl);
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Accordion List (simpler version)
    ======================================== */

    .ux-accordion-list {
      background-color: var(--ux-surface);
    }

    .ux-accordion-list__item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-accordion-list__item:last-child {
      border-bottom: none;
    }

    /* ========================================
       FAQ Style
    ======================================== */

    .ux-accordion--faq .ux-accordion-item__title {
      font-weight: 600;
    }

    .ux-accordion--faq .ux-accordion-item__title::before {
      content: 'Q: ';
      color: var(--ux-primary);
    }

    .ux-accordion--faq .ux-accordion-item__body-content::before {
      content: 'A: ';
      font-weight: 600;
      color: var(--ux-success);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-accordion--glass {
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-accordion--glass .ux-accordion-item {
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    .ux-accordion--glass .ux-accordion-item:last-child {
      border-bottom: none;
    }

    .ux-accordion--glass .ux-accordion-item__header {
      background: transparent;
    }

    .ux-accordion--glass .ux-accordion-item__header:hover {
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-accordion-item__body,
      .ux-accordion-item__chevron {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-accordion-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-accordion-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ========================================
  // Vanilla JS Accordion Class
  // ========================================

  class UXAccordion {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      this.options = {
        multiple: this.el.dataset.multiple === 'true' || options.multiple || false,
        openItems: options.openItems || [],
        ...options
      };

      this.items = [];
      this.accordionId = this.el.id || 'ux-accordion-' + Math.random().toString(36).substr(2, 9);

      this._init();
    }

    _init() {
      // Find all accordion items
      const itemElements = this.el.querySelectorAll(':scope > .ux-accordion-item');

      itemElements.forEach((itemEl, index) => {
        const header = itemEl.querySelector('.ux-accordion-item__header');
        const body = itemEl.querySelector('.ux-accordion-item__body');

        if (!header) return;

        // Set ARIA attributes
        const headerId = `${this.accordionId}-header-${index}`;
        const panelId = `${this.accordionId}-panel-${index}`;

        header.setAttribute('id', headerId);
        header.setAttribute('aria-controls', panelId);
        header.setAttribute('aria-expanded', 'false');

        if (body) {
          body.setAttribute('id', panelId);
          body.setAttribute('role', 'region');
          body.setAttribute('aria-labelledby', headerId);
        }

        // Store item reference
        this.items.push({ el: itemEl, header, body, index });

        // Add click handler
        header.addEventListener('click', (e) => {
          if (!itemEl.classList.contains('ux-accordion-item--disabled')) {
            this.toggle(index);
          }
        });

        // Add keyboard handler
        header.addEventListener('keydown', (e) => this._handleKeydown(e, index));

        // Check if item should be open initially
        if (itemEl.classList.contains('ux-accordion-item--open') || this.options.openItems.includes(index)) {
          this._openItem(index, false);
        }
      });

      // Store instance on element
      this.el._uxAccordion = this;
    }

    _handleKeydown(event, index) {
      const total = this.items.length;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this._focusItem((index + 1) % total);
          break;
        case 'ArrowUp':
          event.preventDefault();
          this._focusItem((index - 1 + total) % total);
          break;
        case 'Home':
          event.preventDefault();
          this._focusItem(0);
          break;
        case 'End':
          event.preventDefault();
          this._focusItem(total - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.toggle(index);
          break;
      }
    }

    _focusItem(index) {
      if (this.items[index] && this.items[index].header) {
        this.items[index].header.focus();
      }
    }

    _openItem(index, dispatch = true) {
      const item = this.items[index];
      if (!item) return;

      item.el.classList.add('ux-accordion-item--open');
      item.header.setAttribute('aria-expanded', 'true');

      if (dispatch) {
        this.el.dispatchEvent(new CustomEvent('accordion:open', {
          detail: { index, item: item.el },
          bubbles: true
        }));
      }
    }

    _closeItem(index, dispatch = true) {
      const item = this.items[index];
      if (!item) return;

      item.el.classList.remove('ux-accordion-item--open');
      item.header.setAttribute('aria-expanded', 'false');

      if (dispatch) {
        this.el.dispatchEvent(new CustomEvent('accordion:close', {
          detail: { index, item: item.el },
          bubbles: true
        }));
      }
    }

    isOpen(index) {
      const item = this.items[index];
      return item ? item.el.classList.contains('ux-accordion-item--open') : false;
    }

    toggle(index) {
      if (this.isOpen(index)) {
        this.close(index);
      } else {
        this.open(index);
      }
    }

    open(index) {
      // If not multiple, close all others first
      if (!this.options.multiple) {
        this.items.forEach((item, i) => {
          if (i !== index && this.isOpen(i)) {
            this._closeItem(i);
          }
        });
      }
      this._openItem(index);
    }

    close(index) {
      this._closeItem(index);
    }

    openAll() {
      this.items.forEach((_, i) => this._openItem(i));
    }

    closeAll() {
      this.items.forEach((_, i) => this._closeItem(i));
    }

    destroy() {
      delete this.el._uxAccordion;
    }

    // Static method to get or create instance
    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxAccordion || null;
    }
  }

  // ========================================
  // Vanilla JS Single Accordion Item Class
  // ========================================

  class UXAccordionItem {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      this.options = {
        isOpen: this.el.classList.contains('ux-accordion-item--open') || options.isOpen || false,
        ...options
      };

      this.itemId = this.el.id || 'ux-accordion-item-' + Math.random().toString(36).substr(2, 9);
      this.header = this.el.querySelector('.ux-accordion-item__header');
      this.body = this.el.querySelector('.ux-accordion-item__body');

      this._init();
    }

    _init() {
      if (!this.header) return;

      // Set ARIA attributes
      const headerId = `${this.itemId}-header`;
      const panelId = `${this.itemId}-panel`;

      this.header.setAttribute('id', headerId);
      this.header.setAttribute('aria-controls', panelId);
      this.header.setAttribute('aria-expanded', this.options.isOpen ? 'true' : 'false');

      if (this.body) {
        this.body.setAttribute('id', panelId);
        this.body.setAttribute('role', 'region');
        this.body.setAttribute('aria-labelledby', headerId);
      }

      // Set initial state
      if (this.options.isOpen) {
        this.el.classList.add('ux-accordion-item--open');
      }

      // Add click handler
      this.header.addEventListener('click', () => {
        if (!this.el.classList.contains('ux-accordion-item--disabled')) {
          this.toggle();
        }
      });

      // Add keyboard handler
      this.header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });

      // Store instance
      this.el._uxAccordionItem = this;
    }

    get isOpen() {
      return this.el.classList.contains('ux-accordion-item--open');
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.el.classList.add('ux-accordion-item--open');
      this.header?.setAttribute('aria-expanded', 'true');
      this.el.dispatchEvent(new CustomEvent('accordion-item:open', { bubbles: true }));
    }

    close() {
      this.el.classList.remove('ux-accordion-item--open');
      this.header?.setAttribute('aria-expanded', 'false');
      this.el.dispatchEvent(new CustomEvent('accordion-item:close', { bubbles: true }));
    }

    destroy() {
      delete this.el._uxAccordionItem;
    }

    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxAccordionItem || null;
    }
  }

  // ========================================
  // Auto-initialize vanilla JS accordions
  // ========================================

  function initAccordions() {
    // Initialize accordions with data-ux-accordion attribute
    document.querySelectorAll('[data-ux-accordion]').forEach(el => {
      if (!el._uxAccordion) {
        new UXAccordion(el);
      }
    });

    // Initialize standalone items with data-ux-accordion-item attribute
    document.querySelectorAll('[data-ux-accordion-item]').forEach(el => {
      if (!el._uxAccordionItem) {
        new UXAccordionItem(el);
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }

  // Observe for dynamically added accordions
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.hasAttribute('data-ux-accordion')) {
            new UXAccordion(node);
          }
          if (node.hasAttribute('data-ux-accordion-item')) {
            new UXAccordionItem(node);
          }
          // Check children
          node.querySelectorAll?.('[data-ux-accordion]').forEach(el => {
            if (!el._uxAccordion) new UXAccordion(el);
          });
          node.querySelectorAll?.('[data-ux-accordion-item]').forEach(el => {
            if (!el._uxAccordionItem) new UXAccordionItem(el);
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // ========================================
  // Alpine.js Components (for backward compatibility)
  // ========================================

  const accordionComponent = (config = {}) => ({
    openItems: config.openItems || [],
    multiple: config.multiple || false,
    disabled: config.disabled || false,
    accordionId: config.id || 'ux-accordion-' + Math.random().toString(36).substr(2, 9),
    totalItems: config.totalItems || 0,
    focusedIndex: -1,

    isOpen(index) {
      return this.openItems.includes(index);
    },

    getHeaderAriaAttrs(index) {
      return {
        'aria-expanded': this.isOpen(index) ? 'true' : 'false',
        'aria-controls': this.accordionId + '-panel-' + index,
        'id': this.accordionId + '-header-' + index
      };
    },

    getPanelAriaAttrs(index) {
      return {
        'role': 'region',
        'aria-labelledby': this.accordionId + '-header-' + index,
        'id': this.accordionId + '-panel-' + index
      };
    },

    toggle(index) {
      if (this.disabled) return;
      if (this.isOpen(index)) {
        this.close(index);
      } else {
        this.open(index);
      }
    },

    open(index) {
      if (!this.multiple) {
        this.openItems = [index];
      } else if (!this.openItems.includes(index)) {
        this.openItems.push(index);
      }
    },

    close(index) {
      const i = this.openItems.indexOf(index);
      if (i !== -1) {
        this.openItems.splice(i, 1);
      }
    },

    openAll(total) {
      this.openItems = Array.from({ length: total }, (_, i) => i);
    },

    closeAll() {
      this.openItems = [];
    },

    handleKeydown(event, index) {
      const headers = this.$el.querySelectorAll('.ux-accordion-item__header');
      const total = headers.length;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.focusItem((index + 1) % total, headers);
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.focusItem((index - 1 + total) % total, headers);
          break;
        case 'Home':
          event.preventDefault();
          this.focusItem(0, headers);
          break;
        case 'End':
          event.preventDefault();
          this.focusItem(total - 1, headers);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.toggle(index);
          break;
      }
    },

    focusItem(index, headers) {
      this.focusedIndex = index;
      if (headers && headers[index]) {
        headers[index].focus();
      }
    }
  });

  const accordionItemComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    disabled: config.disabled || false,
    itemId: config.id || 'ux-accordion-item-' + Math.random().toString(36).substr(2, 9),

    get headerAriaAttrs() {
      return {
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.itemId + '-panel',
        'id': this.itemId + '-header'
      };
    },

    get panelAriaAttrs() {
      return {
        'role': 'region',
        'aria-labelledby': this.itemId + '-header',
        'id': this.itemId + '-panel'
      };
    },

    toggle() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
      }
    },

    close() {
      this.isOpen = false;
    },

    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    }
  });

  // Register Alpine components
  if (window.UX) {
    window.UX.registerComponent('uxAccordion', accordionComponent);
    window.UX.registerComponent('uxAccordionItem', accordionItemComponent);
  } else if (typeof Alpine !== 'undefined') {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAccordion', accordionComponent);
      Alpine.data('uxAccordionItem', accordionItemComponent);
    });
  }

  // ========================================
  // Export to global namespace
  // ========================================

  window.UXAccordion = UXAccordion;
  window.UXAccordionItem = UXAccordionItem;

})();
