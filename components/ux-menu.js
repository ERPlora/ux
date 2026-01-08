/**
 * UX Menu Component
 * Menús desplegables y contextuales
 * @requires ux-core.js
 */
(function () {
  'use strict';

  const styles = `
    /* ========================================
       UX Menu Container
    ======================================== */

    .ux-menu {
      position: relative;
      display: inline-block;
    }

    /* ========================================
       Menu Content (Dropdown)
    ======================================== */

    .ux-menu__content {
      position: absolute;
      min-width: 180px;
      width: 100%;
      height: 100%;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      z-index: var(--ux-z-dropdown);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(-8px);
      transform-origin: top left;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-menu--open .ux-menu__content {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }

    /* Positioning */
    .ux-menu__content--top {
      bottom: 100%;
      margin-bottom: var(--ux-space-xs);
      transform-origin: bottom left;
    }

    .ux-menu__content--right {
      right: 0;
      left: auto;
      transform-origin: top right;
    }

    .ux-menu__content--top.ux-menu__content--right {
      transform-origin: bottom right;
    }

    .ux-menu__content--bottom {
      top: 100%;
      margin-top: var(--ux-space-xs);
    }

    .ux-menu__content--left {
      left: 0;
    }

    /* Full width on mobile */
    @media (max-width: 480px) {
      .ux-menu--full-mobile .ux-menu__content {
        position: fixed;
        left: var(--ux-space-md);
        right: var(--ux-space-md);
        min-width: auto;
        max-width: none;
      }
    }

    /* ========================================
       Menu List
    ======================================== */

    .ux-menu__list {
      list-style: none;
      margin: 0;
      padding: var(--ux-space-xs) 0;
    }

    /* ========================================
       Menu Item
    ======================================== */

    .ux-menu__item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      color: var(--ux-text);
      font-size: var(--ux-font-size-md);
      text-decoration: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-menu__item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-menu__item:active {
      background-color: var(--ux-light);
    }

    .ux-menu__item--selected {
      color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-menu__item--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .ux-menu__item--danger {
      color: var(--ux-danger);
    }

    .ux-menu__item--danger:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* ========================================
       Menu Item Content
    ======================================== */

    .ux-menu__item-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-menu__item--selected .ux-menu__item-icon,
    .ux-menu__item--danger .ux-menu__item-icon {
      color: inherit;
    }

    .ux-menu__item-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-menu__item-content {
      flex: 1;
      min-width: 0;
    }

    .ux-menu__item-label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-menu__item-description {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-menu__item-end {
      margin-left: auto;
      padding-left: var(--ux-space-md);
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .ux-menu__item-shortcut {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-menu__item-check {
      width: 16px;
      height: 16px;
      color: var(--ux-primary);
    }

    .ux-menu__item-check svg {
      width: 100%;
      height: 100%;
    }

    .ux-menu__item-arrow {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
    }

    .ux-menu__item-arrow svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Menu Divider
    ======================================== */

    .ux-menu__divider {
      height: 1px;
      margin: var(--ux-space-xs) 0;
      background-color: var(--ux-border-color);
    }

    /* ========================================
       Menu Header
    ======================================== */

    .ux-menu__header {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ========================================
       Submenu
    ======================================== */

    .ux-menu__item--submenu {
      position: relative;
    }

    .ux-menu__submenu {
      position: absolute;
      left: 100%;
      top: 0;
      margin-left: var(--ux-space-xs);
    }

    .ux-menu__submenu--left {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: var(--ux-space-xs);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-menu__content--sm {
      min-width: 140px;
    }

    .ux-menu__content--sm .ux-menu__item {
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-menu__content--sm .ux-menu__item-icon {
      width: 16px;
      height: 16px;
    }

    .ux-menu__content--lg {
      min-width: 240px;
    }

    .ux-menu__content--lg .ux-menu__item {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    /* ========================================
       Context Menu
    ======================================== */

    .ux-context-menu {
      position: fixed;
      z-index: var(--ux-z-popover);
    }

    .ux-context-menu .ux-menu__content {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* ========================================
       Action Menu (Bottom Sheet style on mobile)
    ======================================== */

    @media (max-width: 767px) {
      .ux-menu--action-sheet .ux-menu__content {
        position: fixed;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 60dvh;
        min-width: auto;
        max-width: none;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        border: none;
        transform: translateY(100%);
        transform-origin: bottom center;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .ux-menu--action-sheet.ux-menu--open .ux-menu__content {
        transform: translateY(0);
      }

      .ux-menu--action-sheet .ux-menu__content::before {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        margin: var(--ux-space-sm) auto var(--ux-space-md);
        background-color: var(--ux-light-shade);
        border-radius: 2px;
      }

      .ux-menu--action-sheet .ux-menu__item {
        padding: var(--ux-space-md) var(--ux-space-xl);
        font-size: var(--ux-font-size-lg);
      }
    }

    /* ========================================
       Backdrop for mobile menu
    ======================================== */

    .ux-menu__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal-backdrop);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-menu--open .ux-menu__backdrop {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-menu--glass .ux-menu__content {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-right: 0.5px solid var(--ux-glass-border);
    }

    .ux-menu--glass.ux-menu--end .ux-menu__content {
      border-right: none;
      border-left: 0.5px solid var(--ux-glass-border);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-menu-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-menu-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for menu
  // ARIA: role="menu", aria-expanded on trigger, role="menuitem" on items
  const menuComponent = (config = {}) => ({
    isOpen: false,
    position: config.position || 'bottom-left',
    items: config.items || [],
    selectedValue: config.selectedValue || null,
    menuId: config.id || 'ux-menu-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'aria-haspopup': 'menu',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.menuId + '-content'
      };
    },

    // ARIA attributes for the menu content
    get menuAriaAttrs() {
      return {
        'role': 'menu',
        'id': this.menuId + '-content',
        'aria-orientation': 'vertical'
      };
    },

    // ARIA attributes for each menu item
    getItemAriaAttrs(item, index) {
      return {
        'role': 'menuitem',
        'tabindex': index === 0 ? '0' : '-1',
        'aria-disabled': item.disabled ? 'true' : 'false'
      };
    },

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      // Focus first menu item
      this.$nextTick(() => {
        const firstItem = this.$refs.content?.querySelector('.ux-menu__item:not(.ux-menu__item--disabled)');
        if (firstItem) firstItem.focus();
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    select(item) {
      if (item.disabled) return;

      this.selectedValue = item.value;

      if (item.action && typeof item.action === 'function') {
        item.action();
      }

      if (!item.keepOpen) {
        this.close();
      }
    },

    isSelected(item) {
      return this.selectedValue === item.value;
    },

    handleKeydown(event) {
      switch (event.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.focusNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.focusPrev();
          break;
      }
    },

    focusNext() {
      const items = this.$refs.content?.querySelectorAll('.ux-menu__item:not(.ux-menu__item--disabled)');
      if (!items) return;

      const current = document.activeElement;
      const currentIndex = Array.from(items).indexOf(current);
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex]?.focus();
    },

    focusPrev() {
      const items = this.$refs.content?.querySelectorAll('.ux-menu__item:not(.ux-menu__item--disabled)');
      if (!items) return;

      const current = document.activeElement;
      const currentIndex = Array.from(items).indexOf(current);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex]?.focus();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxMenu', menuComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxMenu', menuComponent);
    });
  }

  // Alpine component for context menu
  // ARIA: role="menu" for context menus
  const contextMenuComponent = (config = {}) => ({
    isOpen: false,
    x: 0,
    y: 0,
    items: config.items || [],
    contextMenuId: config.id || 'ux-context-menu-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for context menu
    get menuAriaAttrs() {
      return {
        'role': 'menu',
        'id': this.contextMenuId,
        'aria-orientation': 'vertical'
      };
    },

    // ARIA attributes for each menu item
    getItemAriaAttrs(item, index) {
      return {
        'role': 'menuitem',
        'tabindex': index === 0 ? '0' : '-1',
        'aria-disabled': item.disabled ? 'true' : 'false'
      };
    },

    show(event) {
      event.preventDefault();

      // Position the menu
      this.x = event.clientX;
      this.y = event.clientY;

      // Adjust if menu would go off screen
      this.$nextTick(() => {
        const menu = this.$refs.menu;
        if (!menu) return;

        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (this.x + rect.width > viewportWidth) {
          this.x = viewportWidth - rect.width - 8;
        }

        if (this.y + rect.height > viewportHeight) {
          this.y = viewportHeight - rect.height - 8;
        }
      });

      this.isOpen = true;
    },

    hide() {
      this.isOpen = false;
    },

    select(item) {
      if (item.disabled) return;

      if (item.action && typeof item.action === 'function') {
        item.action();
      }

      this.hide();
    },

    getStyle() {
      return {
        left: this.x + 'px',
        top: this.y + 'px'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxContextMenu', contextMenuComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxContextMenu', contextMenuComponent);
    });
  }
})();
