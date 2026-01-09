/**
 * UX Kanban Board Component
 * Drag-and-drop kanban board for task management
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Kanban - Base
    ======================================== */

    .ux-kanban {
      display: flex;
      gap: var(--ux-space-md);
      overflow-x: auto;
      padding: var(--ux-space-md);
      min-height: 400px;
      -webkit-overflow-scrolling: touch;
      font-family: var(--ux-font-family);
    }

    .ux-kanban--compact {
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Kanban Column
    ======================================== */

    .ux-kanban__column {
      flex: 0 0 auto;
      width: 300px;
      min-width: 280px;
      max-width: 350px;
      display: flex;
      flex-direction: column;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-lg);
      max-height: 100%;
    }

    .ux-kanban__column--collapsed {
      width: 48px;
      min-width: 48px;
    }

    .ux-kanban__column--drag-over {
      background: rgba(var(--ux-primary-rgb), 0.05);
      border: 2px dashed var(--ux-primary);
    }

    /* Column Header */
    .ux-kanban__column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-kanban__column-header-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      min-width: 0;
    }

    .ux-kanban__column-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-kanban__column-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 var(--ux-space-xs);
      background: var(--ux-surface);
      border-radius: 12px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
    }

    .ux-kanban__column-color {
      width: 4px;
      height: 24px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .ux-kanban__column-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-kanban__column-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-kanban__column-btn:hover {
      background: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-kanban__column-btn svg {
      width: 16px;
      height: 16px;
    }

    /* Column Body (Cards Container) */
    .ux-kanban__column-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--ux-space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      min-height: 100px;
    }

    .ux-kanban__column-body:empty::after {
      content: attr(data-empty-text);
      display: block;
      padding: var(--ux-space-lg);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* Column Footer */
    .ux-kanban__column-footer {
      padding: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-kanban__add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      width: 100%;
      padding: var(--ux-space-sm);
      background: transparent;
      border: 1px dashed var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-kanban__add-btn:hover {
      background: var(--ux-surface);
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    .ux-kanban__add-btn svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Kanban Card
    ======================================== */

    .ux-kanban__card {
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      padding: var(--ux-space-md);
      cursor: grab;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-kanban__card:hover {
      box-shadow: var(--ux-shadow-md);
      border-color: var(--ux-primary);
    }

    .ux-kanban__card:active {
      cursor: grabbing;
    }

    .ux-kanban__card--dragging {
      opacity: 0.5;
      transform: rotate(3deg);
      box-shadow: var(--ux-shadow-lg);
    }

    .ux-kanban__card--ghost {
      opacity: 0.4;
      border-style: dashed;
    }

    /* Card Color Stripe */
    .ux-kanban__card--color {
      border-left-width: 4px;
    }

    .ux-kanban__card--color-primary { border-left-color: var(--ux-primary); }
    .ux-kanban__card--color-success { border-left-color: var(--ux-success); }
    .ux-kanban__card--color-warning { border-left-color: var(--ux-warning); }
    .ux-kanban__card--color-danger { border-left-color: var(--ux-danger); }
    .ux-kanban__card--color-info { border-left-color: var(--ux-cyan-500); }

    /* Card Header */
    .ux-kanban__card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-kanban__card-title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.4;
    }

    .ux-kanban__card-id {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      font-family: monospace;
    }

    /* Card Body */
    .ux-kanban__card-body {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    /* Card Labels */
    .ux-kanban__card-labels {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-kanban__card-label {
      display: inline-block;
      padding: 2px var(--ux-space-sm);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    .ux-kanban__card-label--primary {
      background: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-kanban__card-label--success {
      background: rgba(var(--ux-success-rgb, 52, 199, 89), 0.15);
      color: var(--ux-success);
    }

    .ux-kanban__card-label--warning {
      background: rgba(var(--ux-warning-rgb, 255, 204, 0), 0.15);
      color: var(--ux-amber-700);
    }

    .ux-kanban__card-label--danger {
      background: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.15);
      color: var(--ux-danger);
    }

    /* Card Footer */
    .ux-kanban__card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-kanban__card-meta {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-kanban__card-meta-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-kanban__card-meta-item svg {
      width: 14px;
      height: 14px;
    }

    /* Card Assignees */
    .ux-kanban__card-assignees {
      display: flex;
      align-items: center;
    }

    .ux-kanban__card-assignee {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--ux-surface);
      margin-left: -8px;
      overflow: hidden;
      background: var(--ux-surface-tertiary);
    }

    .ux-kanban__card-assignee:first-child {
      margin-left: 0;
    }

    .ux-kanban__card-assignee img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-kanban__card-assignee--more {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      color: var(--ux-text-secondary);
    }

    /* Card Priority */
    .ux-kanban__card-priority {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .ux-kanban__card-priority svg {
      width: 12px;
      height: 12px;
    }

    .ux-kanban__card-priority--high { color: var(--ux-danger); }
    .ux-kanban__card-priority--medium { color: var(--ux-warning); }
    .ux-kanban__card-priority--low { color: var(--ux-success); }

    /* Card Checkbox */
    .ux-kanban__card-checkbox {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-sm);
    }

    .ux-kanban__card--completed {
      opacity: 0.6;
    }

    .ux-kanban__card--completed .ux-kanban__card-title {
      text-decoration: line-through;
    }

    /* ========================================
       Drop Zone Indicator
    ======================================== */

    .ux-kanban__drop-zone {
      height: 4px;
      border-radius: 2px;
      background: transparent;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-kanban__drop-zone--active {
      height: 40px;
      background: rgba(var(--ux-primary-rgb), 0.1);
      border: 2px dashed var(--ux-primary);
      margin: var(--ux-space-xs) 0;
    }

    /* ========================================
       Swimlanes
    ======================================== */

    .ux-kanban--swimlanes {
      flex-direction: column;
    }

    .ux-kanban__swimlane {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--ux-space-lg);
    }

    .ux-kanban__swimlane-header {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) 0;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-kanban__swimlane-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-kanban__swimlane-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: none;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-kanban__swimlane-toggle--collapsed {
      transform: rotate(-90deg);
    }

    .ux-kanban__swimlane-toggle svg {
      width: 16px;
      height: 16px;
    }

    .ux-kanban__swimlane-body {
      display: flex;
      gap: var(--ux-space-md);
      overflow-x: auto;
    }

    .ux-kanban__swimlane-body--collapsed {
      display: none;
    }

    /* ========================================
       Column Colors
    ======================================== */

    .ux-kanban__column--todo .ux-kanban__column-color { background: var(--ux-gray-400); }
    .ux-kanban__column--progress .ux-kanban__column-color { background: var(--ux-primary); }
    .ux-kanban__column--review .ux-kanban__column-color { background: var(--ux-warning); }
    .ux-kanban__column--done .ux-kanban__column-color { background: var(--ux-success); }

    /* ========================================
       Compact Cards
    ======================================== */

    .ux-kanban--compact .ux-kanban__card {
      padding: var(--ux-space-sm);
    }

    .ux-kanban--compact .ux-kanban__card-title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-kanban--compact .ux-kanban__card-body {
      font-size: var(--ux-font-size-xs);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-kanban--glass .ux-kanban__column {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-kanban--glass .ux-kanban__card {
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-kanban__column {
        background: var(--ux-surface-tertiary);
      }

      .ux-kanban__card {
        background: var(--ux-surface);
      }
    }

    .ux-dark .ux-kanban__column {
      background: var(--ux-surface-tertiary);
    }

    .ux-dark .ux-kanban__card {
      background: var(--ux-surface);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-kanban {
        padding: var(--ux-space-sm);
      }

      .ux-kanban__column {
        width: 280px;
        min-width: 260px;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-kanban__card,
      .ux-kanban__drop-zone {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-kanban-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-kanban-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for Kanban board
  const kanbanData = (options = {}) => ({
    columns: options.columns || [],
    cards: options.cards || [],
    dragging: null,
    dragOverColumn: null,
    dragOverIndex: null,
    allowAddCards: options.allowAddCards ?? true,
    allowAddColumns: options.allowAddColumns ?? false,
    emptyText: options.emptyText || 'No hay tarjetas',

    init() {
      // Initialize cards by column
      this.columns.forEach(col => {
        if (!col.cards) {
          col.cards = this.cards.filter(card => card.columnId === col.id);
        }
      });
    },

    // Get cards for a column
    getColumnCards(columnId) {
      const column = this.columns.find(c => c.id === columnId);
      return column ? column.cards || [] : [];
    },

    // Get card count for a column
    getColumnCount(columnId) {
      return this.getColumnCards(columnId).length;
    },

    // Start dragging
    onDragStart(card, columnId, event) {
      this.dragging = { card, columnId };
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify({ cardId: card.id, columnId }));

      // Add dragging class after a small delay
      setTimeout(() => {
        event.target.classList.add('ux-kanban__card--dragging');
      }, 0);

      this.$dispatch('kanban:dragstart', { card, columnId });
    },

    // End dragging
    onDragEnd(event) {
      event.target.classList.remove('ux-kanban__card--dragging');
      this.dragging = null;
      this.dragOverColumn = null;
      this.dragOverIndex = null;
      this.$dispatch('kanban:dragend');
    },

    // Drag over column
    onDragOver(columnId, event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.dragOverColumn = columnId;
    },

    // Drag leave column
    onDragLeave(columnId, event) {
      // Only clear if leaving the column entirely
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.dragOverColumn = null;
      }
    },

    // Drop card
    onDrop(targetColumnId, targetIndex, event) {
      event.preventDefault();

      if (!this.dragging) return;

      const { card, columnId: sourceColumnId } = this.dragging;

      // Remove from source column
      const sourceColumn = this.columns.find(c => c.id === sourceColumnId);
      if (sourceColumn && sourceColumn.cards) {
        const cardIndex = sourceColumn.cards.findIndex(c => c.id === card.id);
        if (cardIndex > -1) {
          sourceColumn.cards.splice(cardIndex, 1);
        }
      }

      // Add to target column
      const targetColumn = this.columns.find(c => c.id === targetColumnId);
      if (targetColumn) {
        if (!targetColumn.cards) targetColumn.cards = [];

        // Update card's columnId
        card.columnId = targetColumnId;

        // Insert at position
        if (typeof targetIndex === 'number') {
          targetColumn.cards.splice(targetIndex, 0, card);
        } else {
          targetColumn.cards.push(card);
        }
      }

      // Reset drag state
      this.dragging = null;
      this.dragOverColumn = null;
      this.dragOverIndex = null;

      // Dispatch event
      this.$dispatch('kanban:move', {
        card,
        fromColumn: sourceColumnId,
        toColumn: targetColumnId,
        toIndex: targetIndex
      });
    },

    // Add new card
    addCard(columnId, cardData = {}) {
      const column = this.columns.find(c => c.id === columnId);
      if (!column) return;

      const newCard = {
        id: cardData.id || 'card-' + Date.now(),
        title: cardData.title || 'Nueva tarjeta',
        columnId,
        ...cardData
      };

      if (!column.cards) column.cards = [];
      column.cards.push(newCard);

      this.$dispatch('kanban:add', { card: newCard, columnId });
      return newCard;
    },

    // Remove card
    removeCard(cardId, columnId) {
      const column = this.columns.find(c => c.id === columnId);
      if (!column || !column.cards) return;

      const cardIndex = column.cards.findIndex(c => c.id === cardId);
      if (cardIndex > -1) {
        const card = column.cards[cardIndex];
        column.cards.splice(cardIndex, 1);
        this.$dispatch('kanban:remove', { card, columnId });
      }
    },

    // Update card
    updateCard(cardId, columnId, updates) {
      const column = this.columns.find(c => c.id === columnId);
      if (!column || !column.cards) return;

      const card = column.cards.find(c => c.id === cardId);
      if (card) {
        Object.assign(card, updates);
        this.$dispatch('kanban:update', { card, columnId, updates });
      }
    },

    // Add new column
    addColumn(columnData = {}) {
      const newColumn = {
        id: columnData.id || 'column-' + Date.now(),
        title: columnData.title || 'Nueva columna',
        cards: [],
        ...columnData
      };

      this.columns.push(newColumn);
      this.$dispatch('kanban:addcolumn', { column: newColumn });
      return newColumn;
    },

    // Remove column
    removeColumn(columnId) {
      const columnIndex = this.columns.findIndex(c => c.id === columnId);
      if (columnIndex > -1) {
        const column = this.columns[columnIndex];
        this.columns.splice(columnIndex, 1);
        this.$dispatch('kanban:removecolumn', { column });
      }
    },

    // Card click handler
    onCardClick(card, columnId, event) {
      this.$dispatch('kanban:click', { card, columnId, event });
    },

    // Check if column is being dragged over
    isColumnDragOver(columnId) {
      return this.dragOverColumn === columnId;
    },

    // Get all cards (flat array)
    getAllCards() {
      return this.columns.flatMap(col => col.cards || []);
    },

    // Move card to specific position
    moveCard(cardId, fromColumnId, toColumnId, toIndex) {
      const fromColumn = this.columns.find(c => c.id === fromColumnId);
      const toColumn = this.columns.find(c => c.id === toColumnId);

      if (!fromColumn || !toColumn) return;

      const cardIndex = fromColumn.cards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) return;

      const [card] = fromColumn.cards.splice(cardIndex, 1);
      card.columnId = toColumnId;

      if (!toColumn.cards) toColumn.cards = [];
      toColumn.cards.splice(toIndex, 0, card);

      this.$dispatch('kanban:move', {
        card,
        fromColumn: fromColumnId,
        toColumn: toColumnId,
        toIndex
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxKanban', kanbanData);
  }

})();
