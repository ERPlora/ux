/**
 * UX Context Menu Component
 * Right-click context menus with iOS 26 Liquid Glass design
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Context Menu
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Context Menu Tokens */
      --ux-context-menu-min-width: 180px;
      --ux-context-menu-max-width: 280px;
      --ux-context-menu-padding: var(--ux-space-xs);
      --ux-context-menu-border-radius: var(--ux-border-radius-lg);
      --ux-context-menu-shadow: 0 10px 40px rgba(0, 0, 0, 0.18), 0 2px 10px rgba(0, 0, 0, 0.12);
      --ux-context-menu-item-height: 36px;
      --ux-context-menu-item-padding: 0 var(--ux-space-md);
      --ux-context-menu-item-gap: var(--ux-space-sm);
      --ux-context-menu-divider-margin: var(--ux-space-xs);
      --ux-context-menu-section-padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* ==========================================================================
       Context Menu Container
       ========================================================================== */

    .ux-context-menu {
      position: fixed;
      z-index: var(--ux-z-popover);
      min-width: var(--ux-context-menu-min-width);
      max-width: var(--ux-context-menu-max-width);
      max-height: calc(100dvh - 32px);
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: var(--ux-context-menu-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-context-menu-border-radius);
      box-shadow: var(--ux-context-menu-shadow);

      /* Hidden by default */
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transform-origin: top left;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease-ios),
        transform var(--ux-transition-fast) var(--ux-ease-ios),
        visibility var(--ux-transition-fast);
    }

    /* Visible state */
    .ux-context-menu--open {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* Transform origin based on position */
    .ux-context-menu--origin-top-left {
      transform-origin: top left;
    }

    .ux-context-menu--origin-top-right {
      transform-origin: top right;
    }

    .ux-context-menu--origin-bottom-left {
      transform-origin: bottom left;
    }

    .ux-context-menu--origin-bottom-right {
      transform-origin: bottom right;
    }

    /* ==========================================================================
       Context Menu Item
       ========================================================================== */

    .ux-context-menu__item {
      display: flex;
      align-items: center;
      gap: var(--ux-context-menu-item-gap);
      min-height: var(--ux-context-menu-item-height);
      padding: var(--ux-context-menu-item-padding);
      font-size: var(--ux-font-size-sm);
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

    .ux-context-menu__item:hover,
    .ux-context-menu__item:focus {
      background: var(--ux-surface-secondary);
      outline: none;
    }

    .ux-context-menu__item:active {
      background: var(--ux-surface-tertiary);
    }

    .ux-context-menu__item:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
    }

    /* Item icon */
    .ux-context-menu__item-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: 0.7;
    }

    .ux-context-menu__item-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Item text */
    .ux-context-menu__item-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Item shortcut */
    .ux-context-menu__item-shortcut {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-left: auto;
      padding-left: var(--ux-space-md);
      font-family: system-ui, -apple-system, sans-serif;
    }

    /* Item arrow for submenus */
    .ux-context-menu__item-arrow {
      width: 14px;
      height: 14px;
      margin-left: auto;
      opacity: 0.5;
      flex-shrink: 0;
    }

    .ux-context-menu__item-arrow svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Item Variants
       ========================================================================== */

    /* Danger item */
    .ux-context-menu__item--danger {
      color: var(--ux-danger);
    }

    .ux-context-menu__item--danger:hover,
    .ux-context-menu__item--danger:focus {
      background: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-context-menu__item--danger .ux-context-menu__item-icon {
      opacity: 1;
    }

    /* Disabled item */
    .ux-context-menu__item--disabled,
    .ux-context-menu__item:disabled {
      opacity: 0.4;
      pointer-events: none;
      cursor: not-allowed;
    }

    /* Selected/checked item */
    .ux-context-menu__item--selected {
      color: var(--ux-primary);
    }

    .ux-context-menu__item--selected .ux-context-menu__item-icon {
      opacity: 1;
    }

    /* Active item (keyboard navigation) */
    .ux-context-menu__item--active {
      background: var(--ux-surface-secondary);
    }

    /* ==========================================================================
       Context Menu Divider
       ========================================================================== */

    .ux-context-menu__divider {
      height: 1px;
      background: var(--ux-border-color);
      margin: var(--ux-context-menu-divider-margin) 0;
    }

    /* ==========================================================================
       Context Menu Section Label
       ========================================================================== */

    .ux-context-menu__section {
      padding: var(--ux-context-menu-section-padding);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      user-select: none;
    }

    .ux-context-menu__section:not(:first-child) {
      margin-top: var(--ux-space-xs);
    }

    /* ==========================================================================
       Context Menu Submenu
       ========================================================================== */

    .ux-context-menu__submenu {
      position: relative;
    }

    .ux-context-menu__submenu-content {
      position: absolute;
      left: 100%;
      top: 0;
      margin-left: var(--ux-space-xs);
      min-width: var(--ux-context-menu-min-width);
      max-width: var(--ux-context-menu-max-width);
      padding: var(--ux-context-menu-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-context-menu-border-radius);
      box-shadow: var(--ux-context-menu-shadow);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateX(-8px);
      transform-origin: left top;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease-ios),
        transform var(--ux-transition-fast) var(--ux-ease-ios),
        visibility var(--ux-transition-fast);
    }

    /* Submenu opens on hover or when active */
    .ux-context-menu__submenu:hover > .ux-context-menu__submenu-content,
    .ux-context-menu__submenu--open > .ux-context-menu__submenu-content {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateX(0);
    }

    /* Submenu opens to the left when near right edge */
    .ux-context-menu__submenu-content--left {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: var(--ux-space-xs);
      transform-origin: right top;
      transform: scale(0.95) translateX(8px);
    }

    .ux-context-menu__submenu:hover > .ux-context-menu__submenu-content--left,
    .ux-context-menu__submenu--open > .ux-context-menu__submenu-content--left {
      transform: scale(1) translateX(0);
    }

    /* Submenu item with arrow indicator */
    .ux-context-menu__submenu > .ux-context-menu__item::after {
      content: '';
      width: 14px;
      height: 14px;
      margin-left: auto;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
      flex-shrink: 0;
    }

    /* ==========================================================================
       Glass Variant (iOS 26 Liquid Glass)
       ========================================================================== */

    .ux-context-menu--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-context-menu--glass .ux-context-menu__item:hover,
    .ux-context-menu--glass .ux-context-menu__item:focus {
      background: rgba(255, 255, 255, 0.15);
    }

    .ux-context-menu--glass .ux-context-menu__item:active {
      background: rgba(255, 255, 255, 0.25);
    }

    .ux-context-menu--glass .ux-context-menu__divider {
      background: var(--ux-glass-border);
    }

    .ux-context-menu--glass .ux-context-menu__submenu-content {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-context-menu--compact {
      --ux-context-menu-item-height: 32px;
      --ux-context-menu-padding: 4px;
    }

    .ux-context-menu--compact .ux-context-menu__item {
      font-size: var(--ux-font-size-xs);
    }

    .ux-context-menu--compact .ux-context-menu__item-icon {
      width: 14px;
      height: 14px;
    }

    /* ==========================================================================
       Large Variant
       ========================================================================== */

    .ux-context-menu--lg {
      --ux-context-menu-item-height: 44px;
      --ux-context-menu-min-width: 220px;
    }

    .ux-context-menu--lg .ux-context-menu__item {
      font-size: var(--ux-font-size-md);
    }

    .ux-context-menu--lg .ux-context-menu__item-icon {
      width: 20px;
      height: 20px;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-context-menu-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      :root:not(.ux-light) .ux-context-menu--glass .ux-context-menu__item:hover,
      :root:not(.ux-light) .ux-context-menu--glass .ux-context-menu__item:focus {
        background: rgba(255, 255, 255, 0.1);
      }

      :root:not(.ux-light) .ux-context-menu--glass .ux-context-menu__item:active {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark {
      --ux-context-menu-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .ux-dark .ux-context-menu--glass .ux-context-menu__item:hover,
    .ux-dark .ux-context-menu--glass .ux-context-menu__item:focus {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-context-menu--glass .ux-context-menu__item:active {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-context-menu {
        transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
        transform: none !important;
      }

      .ux-context-menu--open {
        transform: none !important;
      }

      .ux-context-menu__submenu-content {
        transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
        transform: none !important;
      }

      .ux-context-menu__submenu:hover > .ux-context-menu__submenu-content,
      .ux-context-menu__submenu--open > .ux-context-menu__submenu-content {
        transform: none !important;
      }
    }

    /* ==========================================================================
       Mobile Styles
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-context-menu {
        --ux-context-menu-item-height: 44px;
        --ux-context-menu-min-width: 200px;
      }

      .ux-context-menu__item {
        font-size: var(--ux-font-size-md);
      }

      /* Submenus appear inline on mobile */
      .ux-context-menu__submenu-content {
        position: static;
        margin-left: 0;
        margin-top: var(--ux-space-xs);
        padding-left: var(--ux-space-md);
        border: none;
        box-shadow: none;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        opacity: 1;
        visibility: visible;
        transform: none;
      }

      .ux-context-menu__submenu-content--left {
        margin-right: 0;
      }

      .ux-context-menu__submenu-content .ux-context-menu__item {
        padding-left: var(--ux-space-lg);
      }
    }

    /* ==========================================================================
       Backdrop (optional overlay)
       ========================================================================== */

    .ux-context-menu-backdrop {
      position: fixed;
      inset: 0;
      z-index: calc(var(--ux-z-popover) - 1);
      background: transparent;
    }

    .ux-context-menu-backdrop--visible {
      background: rgba(0, 0, 0, 0.1);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-context-menu-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-context-menu-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const contextMenuComponent = (config = {}) => ({
    isOpen: false,
    x: 0,
    y: 0,
    items: config.items || [],
    activeIndex: -1,
    originClass: 'ux-context-menu--origin-top-left',
    menuId: config.id || 'ux-context-menu-' + Math.random().toString(36).substr(2, 9),

    // Config options
    closeOnSelect: config.closeOnSelect !== false,
    closeOnClickOutside: config.closeOnClickOutside !== false,
    closeOnEscape: config.closeOnEscape !== false,
    showBackdrop: config.showBackdrop || false,

    // Focusable items cache
    _items: [],

    init() {
      // Escape handler
      if (this.closeOnEscape) {
        this._escapeHandler = (e) => {
          if (this.isOpen && e.key === 'Escape') {
            e.preventDefault();
            this.close();
          }
        };
        document.addEventListener('keydown', this._escapeHandler);
      }

      // Click outside handler
      if (this.closeOnClickOutside) {
        this._clickOutsideHandler = (e) => {
          if (this.isOpen) {
            const menu = this.$refs.menu;
            if (menu && !menu.contains(e.target)) {
              this.close();
            }
          }
        };
        // Use mousedown for quicker response
        document.addEventListener('mousedown', this._clickOutsideHandler);
      }

      // Close on scroll
      this._scrollHandler = () => {
        if (this.isOpen) {
          this.close();
        }
      };
      window.addEventListener('scroll', this._scrollHandler, { passive: true });

      // Close on resize
      this._resizeHandler = () => {
        if (this.isOpen) {
          this.close();
        }
      };
      window.addEventListener('resize', this._resizeHandler, { passive: true });
    },

    destroy() {
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
      if (this._clickOutsideHandler) {
        document.removeEventListener('mousedown', this._clickOutsideHandler);
      }
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler);
      }
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
      }
    },

    /**
     * Open the context menu at the specified position
     * @param {MouseEvent|Object} event - Mouse event or {x, y} coordinates
     * @param {Array} items - Optional array of menu items to display
     */
    open(event, items) {
      // Update items if provided
      if (items && Array.isArray(items)) {
        this.items = items;
      }

      // Get coordinates from event or object
      if (event instanceof Event) {
        event.preventDefault();
        this.x = event.clientX;
        this.y = event.clientY;
      } else if (event && typeof event === 'object') {
        this.x = event.x || event.clientX || 0;
        this.y = event.y || event.clientY || 0;
      }

      this.isOpen = true;
      this.activeIndex = -1;

      // Position adjustment and focus after render
      this.$nextTick(() => {
        this._adjustPosition();
        this._updateItemsList();

        // Focus first item for keyboard navigation
        if (this._items.length > 0) {
          this._items[0].focus();
          this.activeIndex = 0;
        }
      });

      this.$dispatch('contextmenu:open', { x: this.x, y: this.y, items: this.items });
    },

    /**
     * Close the context menu
     */
    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.activeIndex = -1;

      this.$dispatch('contextmenu:close');
    },

    /**
     * Toggle the context menu
     */
    toggle(event, items) {
      if (this.isOpen) {
        this.close();
      } else {
        this.open(event, items);
      }
    },

    /**
     * Select an item
     * @param {Object} item - The menu item object
     * @param {Event} event - The triggering event
     */
    select(item, event) {
      if (item.disabled) return;

      // Dispatch event with item data
      this.$dispatch('contextmenu:select', { item, event });

      // Execute action if provided
      if (item.action && typeof item.action === 'function') {
        item.action(item, event);
      }

      // Close menu if configured
      if (this.closeOnSelect && !item.keepOpen && !item.submenu) {
        this.close();
      }
    },

    /**
     * Adjust menu position to stay within viewport
     */
    _adjustPosition() {
      const menu = this.$refs.menu;
      if (!menu) return;

      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 8;

      let adjustedX = this.x;
      let adjustedY = this.y;
      let originH = 'left';
      let originV = 'top';

      // Horizontal adjustment
      if (this.x + rect.width > viewportWidth - margin) {
        adjustedX = Math.max(margin, viewportWidth - rect.width - margin);
        // If menu would appear to the left of cursor, adjust origin
        if (adjustedX < this.x) {
          originH = 'right';
        }
      }

      // Vertical adjustment
      if (this.y + rect.height > viewportHeight - margin) {
        adjustedY = Math.max(margin, viewportHeight - rect.height - margin);
        // If menu would appear above cursor, adjust origin
        if (adjustedY < this.y) {
          originV = 'bottom';
        }
      }

      // Update position
      this.x = adjustedX;
      this.y = adjustedY;

      // Update transform origin for animation
      this.originClass = `ux-context-menu--origin-${originV}-${originH}`;
    },

    /**
     * Update the list of focusable items
     */
    _updateItemsList() {
      const menu = this.$refs.menu;
      if (!menu) return;

      this._items = Array.from(
        menu.querySelectorAll('.ux-context-menu__item:not(.ux-context-menu__item--disabled)')
      );
    },

    /**
     * Handle keyboard navigation
     */
    handleKeydown(e) {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.focusNext();
          break;

        case 'ArrowUp':
          e.preventDefault();
          this.focusPrev();
          break;

        case 'ArrowRight':
          // Open submenu if focused item has one
          e.preventDefault();
          this._openSubmenu();
          break;

        case 'ArrowLeft':
          // Close submenu
          e.preventDefault();
          this._closeSubmenu();
          break;

        case 'Home':
          e.preventDefault();
          this.focusFirst();
          break;

        case 'End':
          e.preventDefault();
          this.focusLast();
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (this.activeIndex >= 0 && this._items[this.activeIndex]) {
            this._items[this.activeIndex].click();
          }
          break;

        case 'Tab':
          // Close on tab
          this.close();
          break;
      }
    },

    /**
     * Focus the next menu item
     */
    focusNext() {
      if (this._items.length === 0) return;

      this.activeIndex = this.activeIndex < this._items.length - 1 ? this.activeIndex + 1 : 0;
      this._items[this.activeIndex]?.focus();
    },

    /**
     * Focus the previous menu item
     */
    focusPrev() {
      if (this._items.length === 0) return;

      this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this._items.length - 1;
      this._items[this.activeIndex]?.focus();
    },

    /**
     * Focus the first menu item
     */
    focusFirst() {
      if (this._items.length === 0) return;

      this.activeIndex = 0;
      this._items[0]?.focus();
    },

    /**
     * Focus the last menu item
     */
    focusLast() {
      if (this._items.length === 0) return;

      this.activeIndex = this._items.length - 1;
      this._items[this.activeIndex]?.focus();
    },

    /**
     * Open submenu for the currently focused item
     */
    _openSubmenu() {
      const currentItem = this._items[this.activeIndex];
      if (!currentItem) return;

      const submenu = currentItem.closest('.ux-context-menu__submenu');
      if (submenu) {
        submenu.classList.add('ux-context-menu__submenu--open');
        // Focus first item in submenu
        const submenuContent = submenu.querySelector('.ux-context-menu__submenu-content');
        const firstItem = submenuContent?.querySelector('.ux-context-menu__item:not(.ux-context-menu__item--disabled)');
        if (firstItem) {
          firstItem.focus();
          this._updateItemsList();
          this.activeIndex = this._items.indexOf(firstItem);
        }
      }
    },

    /**
     * Close the current submenu
     */
    _closeSubmenu() {
      const openSubmenu = this.$refs.menu?.querySelector('.ux-context-menu__submenu--open');
      if (openSubmenu) {
        openSubmenu.classList.remove('ux-context-menu__submenu--open');
        // Focus the submenu trigger
        const trigger = openSubmenu.querySelector(':scope > .ux-context-menu__item');
        if (trigger) {
          trigger.focus();
          this._updateItemsList();
          this.activeIndex = this._items.indexOf(trigger);
        }
      }
    },

    /**
     * Get inline styles for positioning
     */
    getStyle() {
      return {
        left: this.x + 'px',
        top: this.y + 'px'
      };
    },

    /**
     * ARIA attributes for the menu
     */
    get menuAriaAttrs() {
      return {
        'role': 'menu',
        'id': this.menuId,
        'aria-orientation': 'vertical'
      };
    },

    /**
     * ARIA attributes for menu items
     */
    getItemAriaAttrs(item, index) {
      return {
        'role': item.submenu ? 'menuitem' : 'menuitem',
        'tabindex': index === this.activeIndex ? '0' : '-1',
        'aria-disabled': item.disabled ? 'true' : 'false',
        'aria-haspopup': item.submenu ? 'menu' : undefined,
        'aria-expanded': item.submenu ? 'false' : undefined
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxContextMenu', contextMenuComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxContextMenu', contextMenuComponent);
    });
  }

})();
