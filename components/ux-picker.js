/**
 * UX Picker Component
 * iOS-style column picker (wheel selector)
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Picker Backdrop
    ======================================== */

    .ux-picker-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal-backdrop);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 300ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 300ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-picker-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       UX Picker Container
    ======================================== */

    .ux-picker {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
      z-index: var(--ux-z-modal);
      transform: translateY(100%);
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-picker-backdrop--open .ux-picker {
      transform: translateY(0);
    }

    /* ========================================
       Picker Header
    ======================================== */

    .ux-picker__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: 0 var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-picker__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      min-height: 44px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 400;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-picker__button:active {
      opacity: 0.5;
    }

    .ux-picker__button--cancel {
      font-weight: 400;
    }

    .ux-picker__button--confirm {
      font-weight: 600;
    }

    .ux-picker__title {
      flex: 1;
      text-align: center;
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    /* ========================================
       Picker Columns Container
    ======================================== */

    .ux-picker__columns {
      display: flex;
      height: 216px;
      overflow: hidden;
      position: relative;
    }

    /* Selection highlight */
    .ux-picker__columns::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 36px;
      transform: translateY(-50%);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      pointer-events: none;
      z-index: 0;
    }

    /* Gradient masks */
    .ux-picker__columns::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        var(--ux-surface) 0%,
        transparent 20%,
        transparent 80%,
        var(--ux-surface) 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    /* ========================================
       Picker Column
    ======================================== */

    .ux-picker__column {
      flex: 1;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .ux-picker__column-wrapper {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
      will-change: transform;
    }

    .ux-picker__column--dragging .ux-picker__column-wrapper {
      transition: none;
    }

    /* ========================================
       Picker Item
    ======================================== */

    .ux-picker__item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      padding: 0 var(--ux-space-md);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-lg);
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-picker__item--selected {
      color: var(--ux-text);
      font-weight: 500;
    }

    .ux-picker__item--disabled {
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* 3D wheel effect */
    .ux-picker--3d .ux-picker__item {
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }

    /* ========================================
       Picker Sizes
    ======================================== */

    .ux-picker--sm .ux-picker__columns {
      height: 180px;
    }

    .ux-picker--sm .ux-picker__item {
      height: 30px;
      font-size: var(--ux-font-size-md);
    }

    .ux-picker--sm .ux-picker__columns::before {
      height: 30px;
    }

    .ux-picker--lg .ux-picker__columns {
      height: 252px;
    }

    .ux-picker--lg .ux-picker__item {
      height: 42px;
      font-size: var(--ux-font-size-xl);
    }

    .ux-picker--lg .ux-picker__columns::before {
      height: 42px;
    }

    /* ========================================
       Inline Picker (not in modal)
    ======================================== */

    .ux-picker--inline {
      position: static;
      transform: none;
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-picker--inline .ux-picker__header {
      border-bottom: none;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0 0;
    }

    /* ========================================
       Multi-column Dividers
    ======================================== */

    .ux-picker__divider {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--ux-space-xs);
      color: var(--ux-text);
      font-size: var(--ux-font-size-lg);
      font-weight: 500;
    }

    /* ========================================
       Column Labels
    ======================================== */

    .ux-picker__column-label {
      position: absolute;
      top: var(--ux-space-xs);
      left: 0;
      right: 0;
      text-align: center;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      z-index: 2;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-picker-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-picker-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for picker
  // ARIA: role="listbox" for columns, role="option" for items
  const pickerComponent = (config = {}) => ({
    isOpen: false,
    columns: config.columns || [],
    selectedIndexes: [],
    title: config.title || '',
    cancelText: config.cancelText || 'Cancel',
    confirmText: config.confirmText || 'Done',
    showHeader: config.showHeader !== false,
    itemHeight: config.itemHeight || 36,
    visibleItems: config.visibleItems || 5,
    pickerId: config.id || 'ux-picker-' + Math.random().toString(36).substr(2, 9),
    _columnStates: [],
    _startY: 0,
    _currentY: 0,
    _activeColumn: null,

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.pickerId + '-title'
      };
    },

    get titleId() {
      return this.pickerId + '-title';
    },

    // ARIA for column
    getColumnAriaAttrs(columnIndex) {
      return {
        'role': 'listbox',
        'aria-label': this.columns[columnIndex]?.label || `Column ${columnIndex + 1}`,
        'tabindex': '0'
      };
    },

    // ARIA for item
    getItemAriaAttrs(columnIndex, itemIndex) {
      const isSelected = this.selectedIndexes[columnIndex] === itemIndex;
      return {
        'role': 'option',
        'aria-selected': isSelected ? 'true' : 'false',
        'id': `${this.pickerId}-col${columnIndex}-item${itemIndex}`
      };
    },

    init() {
      // Initialize selected indexes
      this.selectedIndexes = this.columns.map((col, i) => {
        return col.selectedIndex || 0;
      });

      // Initialize column states for drag
      this._columnStates = this.columns.map((col, i) => ({
        offset: -this.selectedIndexes[i] * this.itemHeight,
        isDragging: false
      }));
    },

    open(options = {}) {
      if (options.columns) {
        this.columns = options.columns;
        this.init();
      }
      if (options.title) this.title = options.title;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';

      this.$nextTick(() => {
        // Update column positions
        this.columns.forEach((_, i) => {
          this.scrollToIndex(i, this.selectedIndexes[i], false);
        });
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    cancel() {
      this.$dispatch('picker-cancel');
      this.close();
    },

    confirm() {
      const values = this.columns.map((col, i) => {
        const idx = this.selectedIndexes[i];
        return col.options[idx];
      });

      this.$dispatch('picker-confirm', {
        values,
        indexes: [...this.selectedIndexes]
      });

      this.close();
    },

    // Get transform for column
    getColumnTransform(columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state) return 'translateY(0)';
      return `translateY(${state.offset}px)`;
    },

    // Scroll column to index
    scrollToIndex(columnIndex, itemIndex, animate = true) {
      const column = this.columns[columnIndex];
      if (!column) return;

      // Clamp index
      const maxIndex = column.options.length - 1;
      itemIndex = Math.max(0, Math.min(maxIndex, itemIndex));

      this.selectedIndexes[columnIndex] = itemIndex;
      this._columnStates[columnIndex].offset = -itemIndex * this.itemHeight;

      // Dispatch change event
      this.$dispatch('picker-change', {
        columnIndex,
        itemIndex,
        value: column.options[itemIndex]
      });
    },

    // Select item by click
    selectItem(columnIndex, itemIndex) {
      this.scrollToIndex(columnIndex, itemIndex);
    },

    // Check if item is selected
    isSelected(columnIndex, itemIndex) {
      return this.selectedIndexes[columnIndex] === itemIndex;
    },

    // Touch/drag handlers
    onTouchStart(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      state.isDragging = true;
      this._activeColumn = columnIndex;
      this._startY = event.touches ? event.touches[0].clientY : event.clientY;
      this._startOffset = state.offset;
    },

    onTouchMove(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state.isDragging) return;

      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const deltaY = clientY - this._startY;

      // Apply resistance at boundaries
      const column = this.columns[columnIndex];
      const maxOffset = 0;
      const minOffset = -(column.options.length - 1) * this.itemHeight;

      let newOffset = this._startOffset + deltaY;

      // Rubber band effect
      if (newOffset > maxOffset) {
        newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
      } else if (newOffset < minOffset) {
        newOffset = minOffset + (newOffset - minOffset) * 0.3;
      }

      state.offset = newOffset;

      event.preventDefault();
    },

    onTouchEnd(event, columnIndex) {
      const state = this._columnStates[columnIndex];
      if (!state.isDragging) return;

      state.isDragging = false;

      // Snap to nearest item
      const column = this.columns[columnIndex];
      const nearestIndex = Math.round(-state.offset / this.itemHeight);
      const clampedIndex = Math.max(0, Math.min(column.options.length - 1, nearestIndex));

      this.scrollToIndex(columnIndex, clampedIndex);
    },

    // Keyboard navigation
    handleKeydown(event, columnIndex) {
      const column = this.columns[columnIndex];
      const currentIndex = this.selectedIndexes[columnIndex];

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
            this.scrollToIndex(columnIndex, currentIndex - 1);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (currentIndex < column.options.length - 1) {
            this.scrollToIndex(columnIndex, currentIndex + 1);
          }
          break;
        case 'Home':
          event.preventDefault();
          this.scrollToIndex(columnIndex, 0);
          break;
        case 'End':
          event.preventDefault();
          this.scrollToIndex(columnIndex, column.options.length - 1);
          break;
        case 'Enter':
          event.preventDefault();
          this.confirm();
          break;
        case 'Escape':
          event.preventDefault();
          this.cancel();
          break;
      }
    },

    // Get selected values
    getValues() {
      return this.columns.map((col, i) => {
        const idx = this.selectedIndexes[i];
        return col.options[idx];
      });
    },

    // Set values programmatically
    setValues(values) {
      values.forEach((value, i) => {
        const column = this.columns[i];
        if (!column) return;

        const index = column.options.findIndex(opt => {
          if (typeof opt === 'object') {
            return opt.value === value || opt.text === value;
          }
          return opt === value;
        });

        if (index !== -1) {
          this.scrollToIndex(i, index, false);
        }
      });
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPicker', pickerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPicker', pickerComponent);
    });
  }

  // Helper to format picker option display
  window.UX = window.UX || {};
  window.UX.getPickerOptionText = function(option) {
    if (typeof option === 'object') {
      return option.text || option.label || option.value;
    }
    return option;
  };
})();
