/**
 * UX List Component
 * Listas estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX List
    ======================================== */

    .ux-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: var(--ux-surface);
    }

    /* ========================================
       List Variants
    ======================================== */

    /* Inset (iOS grouped style) */
    .ux-list--inset {
      margin: var(--ux-space-lg);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    /* Lines */
    .ux-list--lines-full .ux-item {
      --item-border-start: 0;
    }

    .ux-list--lines-inset .ux-item {
      --item-border-start: var(--ux-space-lg);
    }

    .ux-list--lines-none .ux-item {
      border-bottom: none;
    }

    /* ========================================
       List Header
    ======================================== */

    .ux-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--ux-background);
    }

    .ux-list-header__action {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      text-transform: none;
      letter-spacing: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .ux-list-header__action:hover {
      color: var(--ux-primary-shade);
    }

    /* Sticky Header */
    .ux-list-header--sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* ========================================
       List Note (footer)
    ======================================== */

    .ux-list-note {
      padding: var(--ux-space-sm) var(--ux-space-lg) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      line-height: 1.4;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Item
    ======================================== */

    .ux-item {
      --item-border-start: var(--ux-space-lg);

      position: relative;
      display: flex;
      align-items: center;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      color: var(--ux-text);
      text-decoration: none;
      border-bottom: 1px solid var(--ux-border-color);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: var(--item-border-start);
      right: 0;
      height: 1px;
      background-color: var(--ux-border-color);
    }

    .ux-item:last-child::after {
      display: none;
    }

    .ux-item:last-child {
      border-bottom: none;
    }

    /* Clickable Item */
    .ux-item--clickable {
      cursor: pointer;
    }

    .ux-item--clickable:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-item--clickable:active {
      background-color: var(--ux-light);
    }

    /* ========================================
       Item Start/End Slots
    ======================================== */

    .ux-item__start {
      display: flex;
      align-items: center;
      margin-right: var(--ux-space-md);
      flex-shrink: 0;
    }

    .ux-item__end {
      display: flex;
      align-items: center;
      margin-left: auto;
      padding-left: var(--ux-space-md);
      flex-shrink: 0;
    }

    /* ========================================
       Item Content
    ======================================== */

    .ux-item__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ux-item__label {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.4;
    }

    .ux-item__label--stacked {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-item__note {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      line-height: 1.4;
    }

    .ux-item__value {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Item Icon
    ======================================== */

    .ux-item__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    .ux-item__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-item__icon--colored {
      color: var(--ux-primary);
    }

    /* Chevron (disclosure indicator) */
    .ux-item__chevron {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
    }

    .ux-item__chevron svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Item Avatar
    ======================================== */

    .ux-item__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-item__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-item__avatar--sm {
      width: 32px;
      height: 32px;
    }

    .ux-item__avatar--lg {
      width: 56px;
      height: 56px;
    }

    /* ========================================
       Item Thumbnail
    ======================================== */

    .ux-item__thumbnail {
      width: 56px;
      height: 56px;
      border-radius: var(--ux-border-radius-sm);
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-item__thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Item Variants
    ======================================== */

    /* Detail Item */
    .ux-item--detail {
      padding-right: var(--ux-space-md);
    }

    .ux-item--detail::before {
      content: '';
      position: absolute;
      right: var(--ux-space-lg);
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-right: 2px solid var(--ux-text-tertiary);
      border-bottom: 2px solid var(--ux-text-tertiary);
      transform: translateY(-50%) rotate(-45deg);
    }

    /* Multiline Item */
    .ux-item--multiline {
      align-items: flex-start;
      padding-top: var(--ux-space-md);
      padding-bottom: var(--ux-space-md);
    }

    .ux-item--multiline .ux-item__start {
      margin-top: 2px;
    }

    /* Disabled Item */
    .ux-item--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Selected Item */
    .ux-item--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-item--selected::after {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Item Colors
    ======================================== */

    .ux-item--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-item--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-item--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
    }

    .ux-item--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
    }

    /* ========================================
       Item Sizes
    ======================================== */

    .ux-item--sm {
      min-height: 40px;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-item--sm .ux-item__label {
      font-size: var(--ux-font-size-sm);
    }

    .ux-item--lg {
      min-height: 60px;
      padding: var(--ux-space-lg);
    }

    .ux-item--lg .ux-item__label {
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Swipeable Item
    ======================================== */

    .ux-item-sliding {
      position: relative;
      overflow: hidden;
    }

    .ux-item-sliding__content {
      position: relative;
      z-index: 1;
      background-color: var(--ux-surface);
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-item-sliding__options {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: stretch;
    }

    .ux-item-sliding__options--start {
      left: 0;
    }

    .ux-item-sliding__options--end {
      right: 0;
    }

    .ux-item-sliding__option {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 72px;
      padding: 0 var(--ux-space-lg);
      color: white;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      border: none;
      cursor: pointer;
    }

    .ux-item-sliding__option--primary {
      background-color: var(--ux-primary);
    }

    .ux-item-sliding__option--secondary {
      background-color: var(--ux-secondary);
    }

    .ux-item-sliding__option--success {
      background-color: var(--ux-success);
    }

    .ux-item-sliding__option--warning {
      background-color: var(--ux-warning);
    }

    .ux-item-sliding__option--danger {
      background-color: var(--ux-danger);
    }

    .ux-item-sliding__option-icon {
      width: 24px;
      height: 24px;
    }

    .ux-item-sliding__option-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Item Divider
    ======================================== */

    .ux-item-divider {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-item-divider--sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* ========================================
       Virtual List Container
    ======================================== */

    .ux-virtual-list {
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-virtual-list__spacer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    .ux-virtual-list__content {
      position: relative;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-list--glass {
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-list--glass .ux-list__item {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-list--glass .ux-list__item:hover {
      background: var(--ux-glass-bg-thin);
    }

    .ux-list--glass .ux-list__header {
      background: var(--ux-glass-bg-thin);
      border-bottom-color: var(--ux-glass-border);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-list-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-list-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for item sliding (swipe actions)
  const itemSlidingComponent = (config = {}) => ({
    isOpen: false,
    side: null, // 'start' or 'end'
    offset: 0,
    startX: 0,
    threshold: config.threshold || 50,

    close() {
      this.isOpen = false;
      this.offset = 0;
      this.side = null;
    },

    open(side = 'end') {
      this.side = side;
      this.isOpen = true;
    },

    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
    },

    handleTouchMove(event) {
      const currentX = event.touches[0].clientX;
      const diff = currentX - this.startX;

      if (Math.abs(diff) > 10) {
        this.offset = diff;
        this.side = diff > 0 ? 'start' : 'end';
      }
    },

    handleTouchEnd() {
      if (Math.abs(this.offset) > this.threshold) {
        this.isOpen = true;
        this.offset = this.side === 'end' ? -72 : 72;
      } else {
        this.close();
      }
    },

    getStyle() {
      return {
        transform: `translateX(${this.offset}px)`
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxItemSliding', itemSlidingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxItemSliding', itemSlidingComponent);
    });
  }

  // Alpine component for selectable list
  const selectableListComponent = (config = {}) => ({
    selected: config.selected || [],
    multiple: config.multiple || false,
    items: config.items || [],

    isSelected(item) {
      if (this.multiple) {
        return this.selected.includes(item);
      }
      return this.selected === item;
    },

    toggle(item) {
      if (this.multiple) {
        const index = this.selected.indexOf(item);
        if (index === -1) {
          this.selected.push(item);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected = this.selected === item ? null : item;
      }
    },

    selectAll() {
      if (this.multiple) {
        this.selected = [...this.items];
      }
    },

    clearSelection() {
      this.selected = this.multiple ? [] : null;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSelectableList', selectableListComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSelectableList', selectableListComponent);
    });
  }
})();
