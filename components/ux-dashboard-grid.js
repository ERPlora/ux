/**
 * UX Dashboard Grid Component
 * Responsive grid for dashboard widgets with drag-and-drop reordering
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Dashboard Grid - CSS Variables
    ======================================== */

    :root {
      --ux-dashboard-grid-gap: var(--ux-space-md);
      --ux-dashboard-grid-gap-sm: var(--ux-space-sm);
      --ux-dashboard-grid-gap-lg: var(--ux-space-lg);
      --ux-dashboard-grid-item-min-height: 200px;
      --ux-dashboard-grid-item-radius: var(--ux-radius-lg);
    }

    /* ========================================
       UX Dashboard Grid - Base
    ======================================== */

    .ux-dashboard-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--ux-dashboard-grid-gap);
      padding: var(--ux-space-md);
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Column Variants
    ======================================== */

    .ux-dashboard-grid--cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-dashboard-grid--cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-dashboard-grid--cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .ux-dashboard-grid--cols-6 {
      grid-template-columns: repeat(6, 1fr);
    }

    /* ========================================
       Gap Variants
    ======================================== */

    .ux-dashboard-grid--gap-sm {
      gap: var(--ux-dashboard-grid-gap-sm);
    }

    .ux-dashboard-grid--gap-md {
      gap: var(--ux-dashboard-grid-gap);
    }

    .ux-dashboard-grid--gap-lg {
      gap: var(--ux-dashboard-grid-gap-lg);
    }

    .ux-dashboard-grid--gap-none {
      gap: 0;
    }

    /* ========================================
       Dashboard Grid Item
    ======================================== */

    .ux-dashboard-grid__item {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: var(--ux-dashboard-grid-item-min-height);
      background: var(--ux-surface);
      border-radius: var(--ux-dashboard-grid-item-radius);
      box-shadow: var(--ux-shadow-sm);
      overflow: hidden;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-dashboard-grid__item:hover {
      box-shadow: var(--ux-shadow-md);
    }

    /* ========================================
       Item Size Variants
    ======================================== */

    /* Small - 1 column */
    .ux-dashboard-grid__item--sm {
      grid-column: span 1;
    }

    /* Medium - 2 columns */
    .ux-dashboard-grid__item--md {
      grid-column: span 2;
    }

    /* Large - 3 columns */
    .ux-dashboard-grid__item--lg {
      grid-column: span 3;
    }

    /* Full - all columns */
    .ux-dashboard-grid__item--full {
      grid-column: 1 / -1;
    }

    /* Tall variants (row span) */
    .ux-dashboard-grid__item--tall {
      grid-row: span 2;
      min-height: calc(var(--ux-dashboard-grid-item-min-height) * 2 + var(--ux-dashboard-grid-gap));
    }

    .ux-dashboard-grid__item--tall-sm {
      grid-row: span 2;
      grid-column: span 1;
    }

    .ux-dashboard-grid__item--tall-md {
      grid-row: span 2;
      grid-column: span 2;
    }

    /* ========================================
       Item Structure
    ======================================== */

    .ux-dashboard-grid__item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-dashboard-grid__item-header-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      min-width: 0;
    }

    .ux-dashboard-grid__item-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-dashboard-grid__item-subtitle {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-dashboard-grid__item-icon {
      width: 24px;
      height: 24px;
      color: var(--ux-primary);
      flex-shrink: 0;
    }

    .ux-dashboard-grid__item-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-dashboard-grid__item-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-left: auto;
    }

    .ux-dashboard-grid__item-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-dashboard-grid__item-btn:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-dashboard-grid__item-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-dashboard-grid__item-content {
      flex: 1;
      padding: var(--ux-space-md);
      overflow: auto;
    }

    .ux-dashboard-grid__item-content--centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-dashboard-grid__item-content--no-padding {
      padding: 0;
    }

    .ux-dashboard-grid__item-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    /* ========================================
       Drag and Drop States
    ======================================== */

    .ux-dashboard-grid--editing .ux-dashboard-grid__item {
      cursor: grab;
    }

    .ux-dashboard-grid--editing .ux-dashboard-grid__item:active {
      cursor: grabbing;
    }

    .ux-dashboard-grid__item--dragging {
      opacity: 0.5;
      transform: scale(1.02) rotate(1deg);
      box-shadow: var(--ux-shadow-xl);
      z-index: 100;
    }

    .ux-dashboard-grid__item--drag-over {
      border: 2px dashed var(--ux-primary);
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-dashboard-grid__item--ghost {
      opacity: 0.3;
      border: 2px dashed var(--ux-border-color);
    }

    /* Drag Handle */
    .ux-dashboard-grid__drag-handle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--ux-text-tertiary);
      cursor: grab;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-dashboard-grid--editing .ux-dashboard-grid__drag-handle {
      display: flex;
    }

    .ux-dashboard-grid__drag-handle:active {
      cursor: grabbing;
    }

    .ux-dashboard-grid__drag-handle svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Drop Zone Placeholder
    ======================================== */

    .ux-dashboard-grid__placeholder {
      background: rgba(var(--ux-primary-rgb), 0.08);
      border: 2px dashed var(--ux-primary);
      border-radius: var(--ux-dashboard-grid-item-radius);
      min-height: var(--ux-dashboard-grid-item-min-height);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    /* ========================================
       Add Item Button
    ======================================== */

    .ux-dashboard-grid__add-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      min-height: var(--ux-dashboard-grid-item-min-height);
      background: transparent;
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-dashboard-grid-item-radius);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-dashboard-grid__add-item:hover {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-dashboard-grid__add-item svg {
      width: 32px;
      height: 32px;
    }

    /* ========================================
       Stat Widget
    ======================================== */

    .ux-dashboard-grid__stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
    }

    .ux-dashboard-grid__stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-dashboard-grid__stat-label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-dashboard-grid__stat-trend {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-sm);
      padding: 2px var(--ux-space-sm);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    .ux-dashboard-grid__stat-trend--up {
      background: rgba(var(--ux-success-rgb, 52, 199, 89), 0.15);
      color: var(--ux-success);
    }

    .ux-dashboard-grid__stat-trend--down {
      background: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.15);
      color: var(--ux-danger);
    }

    .ux-dashboard-grid__stat-trend svg {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Style Variants
    ======================================== */

    /* Outline */
    .ux-dashboard-grid__item--outline {
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    .ux-dashboard-grid__item--outline:hover {
      box-shadow: none;
      border-color: var(--ux-primary);
    }

    /* Flat */
    .ux-dashboard-grid__item--flat {
      box-shadow: none;
      border-radius: 0;
    }

    /* Elevated */
    .ux-dashboard-grid__item--elevated {
      box-shadow: var(--ux-shadow-lg);
    }

    .ux-dashboard-grid__item--elevated:hover {
      box-shadow: var(--ux-shadow-xl);
      transform: translateY(-2px);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-dashboard-grid--glass .ux-dashboard-grid__item,
    .ux-dashboard-grid__item--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-dashboard-grid--glass .ux-dashboard-grid__item:hover,
    .ux-dashboard-grid__item--glass:hover {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight), 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .ux-dashboard-grid--glass .ux-dashboard-grid__item-header,
    .ux-dashboard-grid__item--glass .ux-dashboard-grid__item-header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-dashboard-grid--glass .ux-dashboard-grid__item-footer,
    .ux-dashboard-grid__item--glass .ux-dashboard-grid__item-footer {
      border-top-color: var(--ux-glass-border);
    }

    .ux-dashboard-grid--glass .ux-dashboard-grid__add-item,
    .ux-dashboard-grid--glass .ux-dashboard-grid__placeholder {
      border-color: var(--ux-glass-border);
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-dashboard-grid__item--primary {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-dashboard-grid__item--primary .ux-dashboard-grid__item-title,
    .ux-dashboard-grid__item--primary .ux-dashboard-grid__stat-value {
      color: var(--ux-primary-contrast);
    }

    .ux-dashboard-grid__item--primary .ux-dashboard-grid__item-subtitle,
    .ux-dashboard-grid__item--primary .ux-dashboard-grid__stat-label,
    .ux-dashboard-grid__item--primary .ux-dashboard-grid__item-btn {
      color: rgba(255, 255, 255, 0.8);
    }

    .ux-dashboard-grid__item--success {
      background: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-dashboard-grid__item--success .ux-dashboard-grid__item-title,
    .ux-dashboard-grid__item--success .ux-dashboard-grid__stat-value {
      color: var(--ux-success-contrast);
    }

    .ux-dashboard-grid__item--warning {
      background: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-dashboard-grid__item--warning .ux-dashboard-grid__item-title,
    .ux-dashboard-grid__item--warning .ux-dashboard-grid__stat-value {
      color: var(--ux-warning-contrast);
    }

    .ux-dashboard-grid__item--danger {
      background: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-dashboard-grid__item--danger .ux-dashboard-grid__item-title,
    .ux-dashboard-grid__item--danger .ux-dashboard-grid__stat-value {
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-dashboard-grid__item--loading {
      pointer-events: none;
    }

    .ux-dashboard-grid__item--loading::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light):not(.ux-theme-light) {
        .ux-dashboard-grid__item {
          background: var(--ux-surface);
        }

        .ux-dashboard-grid__item--loading::after {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .ux-dark .ux-dashboard-grid__item,
    .ux-theme-dark .ux-dashboard-grid__item {
      background: var(--ux-surface);
    }

    .ux-dark .ux-dashboard-grid__item--loading::after,
    .ux-theme-dark .ux-dashboard-grid__item--loading::after {
      background: rgba(0, 0, 0, 0.5);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 1199px) {
      .ux-dashboard-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .ux-dashboard-grid--cols-4 {
        grid-template-columns: repeat(3, 1fr);
      }

      .ux-dashboard-grid--cols-6 {
        grid-template-columns: repeat(4, 1fr);
      }

      .ux-dashboard-grid__item--lg {
        grid-column: span 2;
      }
    }

    @media (max-width: 991px) {
      .ux-dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-dashboard-grid--cols-3,
      .ux-dashboard-grid--cols-4 {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-dashboard-grid--cols-6 {
        grid-template-columns: repeat(3, 1fr);
      }

      .ux-dashboard-grid__item--lg {
        grid-column: span 2;
      }

      .ux-dashboard-grid__item--md {
        grid-column: span 2;
      }
    }

    @media (max-width: 767px) {
      .ux-dashboard-grid,
      .ux-dashboard-grid--cols-2,
      .ux-dashboard-grid--cols-3,
      .ux-dashboard-grid--cols-4,
      .ux-dashboard-grid--cols-6 {
        grid-template-columns: 1fr;
        padding: var(--ux-space-sm);
      }

      .ux-dashboard-grid__item--sm,
      .ux-dashboard-grid__item--md,
      .ux-dashboard-grid__item--lg,
      .ux-dashboard-grid__item--full {
        grid-column: span 1;
      }

      .ux-dashboard-grid__item--tall,
      .ux-dashboard-grid__item--tall-sm,
      .ux-dashboard-grid__item--tall-md {
        grid-row: span 1;
        min-height: var(--ux-dashboard-grid-item-min-height);
      }

      .ux-dashboard-grid__stat-value {
        font-size: 2rem;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-dashboard-grid__item {
        transition: none;
      }

      .ux-dashboard-grid__item--dragging {
        transform: none;
      }

      .ux-dashboard-grid__item--elevated:hover {
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-dashboard-grid-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-dashboard-grid-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for Dashboard Grid
  const dashboardGridData = (options = {}) => ({
    items: options.items || [],
    editing: options.editing ?? false,
    columns: options.columns || 4,
    gap: options.gap || 'md',
    draggingIndex: null,
    dragOverIndex: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,

    // Initialize
    init() {
      // Ensure items have IDs
      this.items = this.items.map((item, index) => ({
        ...item,
        id: item.id || 'item-' + index + '-' + Date.now()
      }));
    },

    // Get item by ID
    getItem(id) {
      return this.items.find(item => item.id === id);
    },

    // Get item index by ID
    getItemIndex(id) {
      return this.items.findIndex(item => item.id === id);
    },

    // Toggle edit mode
    toggleEdit() {
      this.editing = !this.editing;
      this.$dispatch('dashboard:editchange', { editing: this.editing });
    },

    // Start editing
    startEdit() {
      this.editing = true;
      this.$dispatch('dashboard:editchange', { editing: true });
    },

    // End editing
    endEdit() {
      this.editing = false;
      this.draggingIndex = null;
      this.dragOverIndex = null;
      this.$dispatch('dashboard:editchange', { editing: false });
    },

    // Add item
    addItem(itemData = {}) {
      const newItem = {
        id: itemData.id || 'item-' + Date.now(),
        title: itemData.title || 'New Widget',
        size: itemData.size || 'sm',
        ...itemData
      };

      this.items.push(newItem);
      this.$dispatch('dashboard:add', { item: newItem });
      return newItem;
    },

    // Remove item
    removeItem(id) {
      const index = this.getItemIndex(id);
      if (index > -1) {
        const item = this.items[index];
        this.items.splice(index, 1);
        this.$dispatch('dashboard:remove', { item, index });
      }
    },

    // Update item
    updateItem(id, updates) {
      const item = this.getItem(id);
      if (item) {
        Object.assign(item, updates);
        this.$dispatch('dashboard:update', { item, updates });
      }
    },

    // Move item
    moveItem(fromIndex, toIndex) {
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
      if (fromIndex >= this.items.length || toIndex >= this.items.length) return;

      const item = this.items.splice(fromIndex, 1)[0];
      this.items.splice(toIndex, 0, item);

      this.$dispatch('dashboard:move', {
        item,
        fromIndex,
        toIndex
      });
    },

    // Resize item
    resizeItem(id, size) {
      const item = this.getItem(id);
      if (item) {
        const oldSize = item.size;
        item.size = size;
        this.$dispatch('dashboard:resize', { item, oldSize, newSize: size });
      }
    },

    // Drag start handler
    onDragStart(index, event) {
      if (!this.editing) return;

      this.draggingIndex = index;
      this.startX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
      this.startY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', index.toString());
      }

      this.$dispatch('dashboard:dragstart', { index, item: this.items[index] });
    },

    // Drag over handler
    onDragOver(index, event) {
      if (this.draggingIndex === null || this.draggingIndex === index) return;

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      this.dragOverIndex = index;
    },

    // Drag end handler
    onDragEnd(event) {
      if (this.draggingIndex !== null && this.dragOverIndex !== null) {
        this.moveItem(this.draggingIndex, this.dragOverIndex);
      }

      this.draggingIndex = null;
      this.dragOverIndex = null;
      this.$dispatch('dashboard:dragend');
    },

    // Drop handler
    onDrop(index, event) {
      event.preventDefault();

      if (this.draggingIndex !== null && this.draggingIndex !== index) {
        this.moveItem(this.draggingIndex, index);
      }

      this.draggingIndex = null;
      this.dragOverIndex = null;
    },

    // Touch handlers
    onTouchStart(index, event) {
      if (!this.editing) return;
      this.onDragStart(index, event);
    },

    onTouchMove(index, event) {
      if (this.draggingIndex === null) return;

      event.preventDefault();
      this.currentX = event.touches[0].clientX;
      this.currentY = event.touches[0].clientY;

      // Find element under touch point
      const elementBelow = document.elementFromPoint(this.currentX, this.currentY);
      if (elementBelow) {
        const gridItem = elementBelow.closest('.ux-dashboard-grid__item');
        if (gridItem && gridItem !== event.currentTarget) {
          const items = Array.from(this.$el.querySelectorAll('.ux-dashboard-grid__item'));
          const overIndex = items.indexOf(gridItem);
          if (overIndex > -1) {
            this.dragOverIndex = overIndex;
          }
        }
      }
    },

    onTouchEnd(event) {
      this.onDragEnd(event);
    },

    // Check if item is being dragged
    isDragging(index) {
      return this.draggingIndex === index;
    },

    // Check if item is being dragged over
    isDragOver(index) {
      return this.dragOverIndex === index && this.draggingIndex !== index;
    },

    // Get grid class based on columns setting
    getGridClass() {
      return `ux-dashboard-grid--cols-${this.columns}`;
    },

    // Get gap class
    getGapClass() {
      return `ux-dashboard-grid--gap-${this.gap}`;
    },

    // Get item size class
    getItemSizeClass(size) {
      return size ? `ux-dashboard-grid__item--${size}` : '';
    },

    // Serialize items for saving
    serialize() {
      return this.items.map(item => ({
        id: item.id,
        size: item.size,
        position: this.getItemIndex(item.id)
      }));
    },

    // Restore items from serialized data
    restore(savedItems) {
      if (!Array.isArray(savedItems)) return;

      const sortedItems = [];
      savedItems.forEach(saved => {
        const item = this.getItem(saved.id);
        if (item) {
          if (saved.size) item.size = saved.size;
          sortedItems.push(item);
        }
      });

      // Add any items not in saved data
      this.items.forEach(item => {
        if (!sortedItems.find(s => s.id === item.id)) {
          sortedItems.push(item);
        }
      });

      this.items = sortedItems;
      this.$dispatch('dashboard:restore', { items: this.items });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxDashboardGrid', dashboardGridData);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDashboardGrid', dashboardGridData);
    });
  }
})();
