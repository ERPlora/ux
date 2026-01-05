/**
 * UX Reorder Component
 * Drag-to-reorder para listas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Reorder Group
    ======================================== */

    .ux-reorder-group {
      position: relative;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-reorder-group--disabled {
      pointer-events: none;
    }

    /* ========================================
       Reorder Item
    ======================================== */

    .ux-reorder-item {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--ux-surface);
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
      will-change: transform;
    }

    .ux-reorder-item--dragging {
      z-index: 100;
      box-shadow: var(--ux-shadow-xl);
      transform: scale(1.02);
      opacity: 0.9;
    }

    .ux-reorder-item--ghost {
      opacity: 0.3;
    }

    /* ========================================
       Reorder Handle
    ======================================== */

    .ux-reorder-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      padding: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      cursor: grab;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-reorder-handle:active {
      cursor: grabbing;
    }

    .ux-reorder-item--disabled .ux-reorder-handle {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .ux-reorder-handle__icon {
      width: 20px;
      height: 20px;
    }

    .ux-reorder-handle__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Handle lines pattern */
    .ux-reorder-handle--lines {
      flex-direction: column;
      gap: 3px;
    }

    .ux-reorder-handle__line {
      width: 16px;
      height: 2px;
      background-color: var(--ux-text-tertiary);
      border-radius: 1px;
    }

    /* ========================================
       Drop Indicator
    ======================================== */

    .ux-reorder-indicator {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ux-primary);
      transform: scaleX(0);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-indicator--top {
      top: -1px;
    }

    .ux-reorder-indicator--bottom {
      bottom: -1px;
    }

    .ux-reorder-indicator--active {
      transform: scaleX(1);
    }

    /* ========================================
       Reorder Item Content
    ======================================== */

    .ux-reorder-item__content {
      flex: 1;
      min-width: 0;
    }

    /* ========================================
       Reorder Animations
    ======================================== */

    .ux-reorder-item--moving-up {
      animation: ux-reorder-move-up var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-item--moving-down {
      animation: ux-reorder-move-down var(--ux-transition-fast) var(--ux-ease);
    }

    @keyframes ux-reorder-move-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    @keyframes ux-reorder-move-down {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    /* ========================================
       Reorder Group Variants
    ======================================== */

    /* Inset */
    .ux-reorder-group--inset {
      margin: var(--ux-space-lg);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
      background-color: var(--ux-surface);
    }

    .ux-reorder-group--inset .ux-reorder-item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-reorder-group--inset .ux-reorder-item:last-child {
      border-bottom: none;
    }

    /* Cards */
    .ux-reorder-group--cards .ux-reorder-item {
      margin-bottom: var(--ux-space-sm);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-reorder-group--cards .ux-reorder-item--dragging {
      box-shadow: var(--ux-shadow-xl);
    }

    /* ========================================
       Edit Mode Styles
    ======================================== */

    .ux-reorder-group--editing .ux-reorder-item {
      padding-left: 0;
    }

    .ux-reorder-group:not(.ux-reorder-group--editing) .ux-reorder-handle {
      display: none;
    }

    /* Show handles with animation */
    .ux-reorder-group--editing .ux-reorder-handle {
      animation: ux-reorder-handle-appear 0.3s var(--ux-ease);
    }

    @keyframes ux-reorder-handle-appear {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* ========================================
       Horizontal Reorder
    ======================================== */

    .ux-reorder-group--horizontal {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    .ux-reorder-group--horizontal .ux-reorder-item {
      flex: 0 0 auto;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator {
      width: 2px;
      height: auto;
      top: 0;
      bottom: 0;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator--left {
      left: -1px;
      right: auto;
    }

    .ux-reorder-group--horizontal .ux-reorder-indicator--right {
      right: -1px;
      left: auto;
    }

    /* ========================================
       Delete Button (iOS style)
    ======================================== */

    .ux-reorder-delete {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0;
      height: 100%;
      background-color: var(--ux-danger);
      color: white;
      border: none;
      cursor: pointer;
      overflow: hidden;
      transition: width var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-reorder-group--editing .ux-reorder-delete {
      width: var(--ux-touch-target);
    }

    .ux-reorder-delete__icon {
      width: 20px;
      height: 20px;
    }

    .ux-reorder-delete__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-reorder-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-reorder-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for reorder group
  const reorderComponent = (config = {}) => ({
    items: config.items || [],
    editing: config.editing || false,
    disabled: config.disabled || false,
    draggingIndex: null,
    dragOverIndex: null,
    startY: 0,
    currentY: 0,

    get isEditing() {
      return this.editing;
    },

    toggleEdit() {
      this.editing = !this.editing;
    },

    startEdit() {
      this.editing = true;
    },

    endEdit() {
      this.editing = false;
    },

    handleDragStart(event, index) {
      if (this.disabled || !this.editing) return;

      this.draggingIndex = index;
      this.startY = event.type === 'touchstart'
        ? event.touches[0].clientY
        : event.clientY;

      // Set drag data for HTML5 drag
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', index);
      }
    },

    handleDragOver(event, index) {
      if (this.draggingIndex === null || this.draggingIndex === index) return;

      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      this.dragOverIndex = index;
    },

    handleDragEnd() {
      if (this.draggingIndex !== null && this.dragOverIndex !== null) {
        this.moveItem(this.draggingIndex, this.dragOverIndex);
      }

      this.draggingIndex = null;
      this.dragOverIndex = null;
    },

    handleTouchStart(event, index) {
      if (this.disabled || !this.editing) return;

      this.draggingIndex = index;
      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event, index) {
      if (this.draggingIndex === null) return;

      event.preventDefault();
      this.currentY = event.touches[0].clientY;

      // Find which item we're over
      const items = this.$refs.items?.children || [];
      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        if (this.currentY >= rect.top && this.currentY <= rect.bottom) {
          this.dragOverIndex = i;
          break;
        }
      }
    },

    handleTouchEnd() {
      this.handleDragEnd();
    },

    moveItem(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;

      const item = this.items[fromIndex];
      this.items.splice(fromIndex, 1);
      this.items.splice(toIndex, 0, item);
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },

    isDragging(index) {
      return this.draggingIndex === index;
    },

    isDragOver(index) {
      return this.dragOverIndex === index && this.draggingIndex !== index;
    },

    getItemStyle(index) {
      if (this.isDragging(index)) {
        const offset = this.currentY - this.startY;
        return {
          transform: `translateY(${offset}px)`,
          zIndex: 100
        };
      }
      return {};
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxReorder', reorderComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxReorder', reorderComponent);
    });
  }
})();
