/**
 * UX Accordion Component
 * Acordeones expandibles estilo iOS
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

  // Alpine component for accordion
  // ARIA: aria-expanded, aria-controls on headers; region role on panels
  // Keyboard: Arrow Up/Down, Home/End, Enter/Space
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

    // ARIA attributes for accordion header button
    getHeaderAriaAttrs(index) {
      return {
        'aria-expanded': this.isOpen(index) ? 'true' : 'false',
        'aria-controls': this.accordionId + '-panel-' + index,
        'id': this.accordionId + '-header-' + index
      };
    },

    // ARIA attributes for accordion panel
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

    // Keyboard navigation handler
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

  if (window.UX) {
    window.UX.registerComponent('uxAccordion', accordionComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAccordion', accordionComponent);
    });
  }

  // Alpine component for single accordion item
  // ARIA: aria-expanded on header
  // Keyboard: Enter/Space to toggle
  const accordionItemComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    disabled: config.disabled || false,
    itemId: config.id || 'ux-accordion-item-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for header
    get headerAriaAttrs() {
      return {
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.itemId + '-panel',
        'id': this.itemId + '-header'
      };
    },

    // ARIA attributes for panel
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

    // Keyboard handler for Enter/Space
    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAccordionItem', accordionItemComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAccordionItem', accordionItemComponent);
    });
  }
})();
