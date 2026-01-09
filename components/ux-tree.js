/**
 * UX Tree View Component
 * Hierarchical expandable/collapsible tree structure
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Tree View
       ========================================================================== */

    .ux-tree {
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      user-select: none;
    }

    .ux-tree__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ux-tree__list--nested {
      padding-left: var(--ux-space-lg);
    }

    /* ==========================================================================
       Tree Node
       ========================================================================== */

    .ux-tree__node {
      margin: 0;
      padding: 0;
    }

    .ux-tree__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-tree__item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-tree__item:active {
      background: var(--ux-surface-tertiary);
    }

    .ux-tree__item--selected {
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
    }

    .ux-tree__item--selected:hover {
      background: var(--ux-primary-tint);
    }

    /* ==========================================================================
       Toggle Arrow
       ========================================================================== */

    .ux-tree__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--ux-text-tertiary);
      transition: transform var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-tree__toggle svg {
      width: 14px;
      height: 14px;
    }

    .ux-tree__toggle--expanded {
      transform: rotate(90deg);
    }

    .ux-tree__toggle--empty {
      visibility: hidden;
    }

    /* ==========================================================================
       Checkbox (for selectable trees)
       ========================================================================== */

    .ux-tree__checkbox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      border: 2px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      background: var(--ux-surface);
      color: transparent;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-tree__checkbox svg {
      width: 12px;
      height: 12px;
    }

    .ux-tree__checkbox--checked {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    .ux-tree__checkbox--indeterminate {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    .ux-tree__checkbox--indeterminate svg {
      display: none;
    }

    .ux-tree__checkbox--indeterminate::after {
      content: '';
      width: 8px;
      height: 2px;
      background: white;
      border-radius: 1px;
    }

    /* ==========================================================================
       Icon
       ========================================================================== */

    .ux-tree__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--ux-text-secondary);
    }

    .ux-tree__icon svg {
      width: 16px;
      height: 16px;
    }

    .ux-tree__icon--folder {
      color: var(--ux-warning);
    }

    .ux-tree__icon--file {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Label
       ========================================================================== */

    .ux-tree__label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4;
    }

    .ux-tree__label--editable {
      padding: 2px 4px;
      margin: -2px -4px;
      border-radius: var(--ux-radius-sm);
      outline: none;
    }

    .ux-tree__label--editable:focus {
      background: var(--ux-surface);
      box-shadow: 0 0 0 2px var(--ux-primary);
    }

    /* ==========================================================================
       Badge / Count
       ========================================================================== */

    .ux-tree__badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 6px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      background: var(--ux-surface-tertiary);
      color: var(--ux-text-secondary);
      border-radius: 9px;
      flex-shrink: 0;
    }

    .ux-tree__badge--primary {
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
    }

    /* ==========================================================================
       Actions
       ========================================================================== */

    .ux-tree__actions {
      display: flex;
      align-items: center;
      gap: 2px;
      opacity: 0;
      transition: opacity var(--ux-transition-fast);
    }

    .ux-tree__item:hover .ux-tree__actions {
      opacity: 1;
    }

    .ux-tree__action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-tertiary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-tree__action:hover {
      background: var(--ux-surface-tertiary);
      color: var(--ux-text);
    }

    .ux-tree__action svg {
      width: 14px;
      height: 14px;
    }

    /* ==========================================================================
       Loading State
       ========================================================================== */

    .ux-tree__loading {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-left: calc(var(--ux-space-lg) + var(--ux-space-sm));
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    .ux-tree__loading-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-tree-spin 0.8s linear infinite;
    }

    @keyframes ux-tree-spin {
      to { transform: rotate(360deg); }
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-tree__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      color: var(--ux-text-tertiary);
      text-align: center;
    }

    .ux-tree__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      opacity: 0.5;
    }

    /* ==========================================================================
       Drag & Drop
       ========================================================================== */

    .ux-tree__item--dragging {
      opacity: 0.5;
    }

    .ux-tree__item--drag-over {
      background: var(--ux-primary-tint);
      outline: 2px dashed var(--ux-primary);
      outline-offset: -2px;
    }

    .ux-tree__drop-indicator {
      height: 2px;
      background: var(--ux-primary);
      margin: 0 var(--ux-space-sm);
      border-radius: 1px;
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-tree--sm {
      font-size: var(--ux-font-size-sm);
    }

    .ux-tree--sm .ux-tree__item {
      padding: 2px var(--ux-space-xs);
    }

    .ux-tree--sm .ux-tree__toggle,
    .ux-tree--sm .ux-tree__icon {
      width: 16px;
      height: 16px;
    }

    .ux-tree--sm .ux-tree__toggle svg,
    .ux-tree--sm .ux-tree__icon svg {
      width: 12px;
      height: 12px;
    }

    .ux-tree--sm .ux-tree__list--nested {
      padding-left: var(--ux-space-md);
    }

    .ux-tree--lg {
      font-size: var(--ux-font-size-lg);
    }

    .ux-tree--lg .ux-tree__item {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-tree--lg .ux-tree__toggle,
    .ux-tree--lg .ux-tree__icon {
      width: 24px;
      height: 24px;
    }

    .ux-tree--lg .ux-tree__toggle svg,
    .ux-tree--lg .ux-tree__icon svg {
      width: 20px;
      height: 20px;
    }

    /* ==========================================================================
       Lines Variant
       ========================================================================== */

    .ux-tree--lines .ux-tree__list--nested {
      position: relative;
      margin-left: 10px;
      padding-left: var(--ux-space-md);
    }

    .ux-tree--lines .ux-tree__list--nested::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: var(--ux-space-md);
      width: 1px;
      background: var(--ux-border-color);
    }

    .ux-tree--lines .ux-tree__node {
      position: relative;
    }

    .ux-tree--lines .ux-tree__list--nested > .ux-tree__node::before {
      content: '';
      position: absolute;
      top: 14px;
      left: calc(-1 * var(--ux-space-md));
      width: var(--ux-space-sm);
      height: 1px;
      background: var(--ux-border-color);
    }

    /* ==========================================================================
       Bordered Variant
       ========================================================================== */

    .ux-tree--bordered {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-space-sm);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-tree--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border: 1px solid var(--ux-glass-border);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-space-sm);
    }

    .ux-tree--glass .ux-tree__item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-tree--glass .ux-tree__item--selected {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-tree--glass .ux-tree__item:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    .ux-dark .ux-tree--glass .ux-tree__item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-tree__toggle,
      .ux-tree__item,
      .ux-tree__checkbox,
      .ux-tree__actions {
        transition: none;
      }

      .ux-tree__loading-spinner {
        animation: none;
      }
    }
  `;

  // Icons
  const icons = {
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    folder: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z"/></svg>`,
    folderOpen: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-7l-2-2H5z"/><path d="M3 12h18v5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-5z" opacity="0.3"/></svg>`,
    file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tree-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tree-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const treeData = (options = {}) => ({
    // Configuration
    data: options.data || [],
    selectable: options.selectable ?? false,
    multiSelect: options.multiSelect ?? false,
    checkable: options.checkable ?? false,
    editable: options.editable ?? false,
    draggable: options.draggable ?? false,
    showIcons: options.showIcons ?? true,
    showActions: options.showActions ?? false,
    expandOnClick: options.expandOnClick ?? true,
    lazyLoad: options.lazyLoad ?? false,
    loadChildren: options.loadChildren || null,

    // State
    expandedNodes: new Set(options.expanded || []),
    selectedNodes: new Set(options.selected || []),
    checkedNodes: new Set(options.checked || []),
    loadingNodes: new Set(),
    editingNode: null,
    draggedNode: null,
    dragOverNode: null,

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      // Auto-expand to selected nodes
      if (this.selectedNodes.size > 0) {
        this.expandToNodes([...this.selectedNodes]);
      }
    },

    // Toggle node expansion
    toggle(nodeId) {
      if (this.expandedNodes.has(nodeId)) {
        this.collapse(nodeId);
      } else {
        this.expand(nodeId);
      }
    },

    // Expand node
    async expand(nodeId) {
      const node = this.findNode(nodeId);
      if (!node) return;

      // Lazy load children if needed
      if (this.lazyLoad && this.loadChildren && !node.childrenLoaded) {
        this.loadingNodes.add(nodeId);
        try {
          const children = await this.loadChildren(node);
          node.children = children;
          node.childrenLoaded = true;
        } catch (error) {
          console.error('Failed to load children:', error);
          this.$dispatch('tree:load-error', { nodeId, error });
        } finally {
          this.loadingNodes.delete(nodeId);
        }
      }

      this.expandedNodes.add(nodeId);
      this.$dispatch('tree:expand', { nodeId, node });
    },

    // Collapse node
    collapse(nodeId) {
      this.expandedNodes.delete(nodeId);
      this.$dispatch('tree:collapse', { nodeId });
    },

    // Expand all nodes
    expandAll() {
      const expandRecursive = (nodes) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            this.expandedNodes.add(node.id);
            expandRecursive(node.children);
          }
        });
      };
      expandRecursive(this.data);
      this.$dispatch('tree:expand-all');
    },

    // Collapse all nodes
    collapseAll() {
      this.expandedNodes.clear();
      this.$dispatch('tree:collapse-all');
    },

    // Select node
    select(nodeId) {
      const node = this.findNode(nodeId);
      if (!node) return;

      if (!this.multiSelect) {
        this.selectedNodes.clear();
      }

      if (this.selectedNodes.has(nodeId)) {
        this.selectedNodes.delete(nodeId);
      } else {
        this.selectedNodes.add(nodeId);
      }

      this.$dispatch('tree:select', {
        nodeId,
        node,
        selected: [...this.selectedNodes]
      });
    },

    // Check node (with checkbox)
    check(nodeId, checked = null) {
      const node = this.findNode(nodeId);
      if (!node) return;

      const isChecked = checked !== null ? checked : !this.checkedNodes.has(nodeId);

      if (isChecked) {
        this.checkedNodes.add(nodeId);
        // Check all children
        if (node.children) {
          this.checkAllChildren(node, true);
        }
      } else {
        this.checkedNodes.delete(nodeId);
        // Uncheck all children
        if (node.children) {
          this.checkAllChildren(node, false);
        }
      }

      // Update parent states
      this.updateParentCheckState(nodeId);

      this.$dispatch('tree:check', {
        nodeId,
        node,
        checked: isChecked,
        checkedNodes: [...this.checkedNodes]
      });
    },

    // Check/uncheck all children recursively
    checkAllChildren(node, checked) {
      if (!node.children) return;
      node.children.forEach(child => {
        if (checked) {
          this.checkedNodes.add(child.id);
        } else {
          this.checkedNodes.delete(child.id);
        }
        this.checkAllChildren(child, checked);
      });
    },

    // Update parent check state (for indeterminate)
    updateParentCheckState(nodeId) {
      const parent = this.findParent(nodeId);
      if (!parent) return;

      const allChecked = parent.children.every(child => this.checkedNodes.has(child.id));
      const someChecked = parent.children.some(child =>
        this.checkedNodes.has(child.id) || this.isIndeterminate(child.id)
      );

      if (allChecked) {
        this.checkedNodes.add(parent.id);
      } else {
        this.checkedNodes.delete(parent.id);
      }

      // Continue up the tree
      this.updateParentCheckState(parent.id);
    },

    // Check if node is indeterminate
    isIndeterminate(nodeId) {
      const node = this.findNode(nodeId);
      if (!node || !node.children || node.children.length === 0) return false;

      const checkedCount = node.children.filter(child =>
        this.checkedNodes.has(child.id)
      ).length;

      return checkedCount > 0 && checkedCount < node.children.length;
    },

    // Get checkbox state
    getCheckState(nodeId) {
      if (this.checkedNodes.has(nodeId)) return 'checked';
      if (this.isIndeterminate(nodeId)) return 'indeterminate';
      return 'unchecked';
    },

    // Find node by ID
    findNode(nodeId, nodes = this.data) {
      for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
          const found = this.findNode(nodeId, node.children);
          if (found) return found;
        }
      }
      return null;
    },

    // Find parent of node
    findParent(nodeId, nodes = this.data, parent = null) {
      for (const node of nodes) {
        if (node.id === nodeId) return parent;
        if (node.children) {
          const found = this.findParent(nodeId, node.children, node);
          if (found) return found;
        }
      }
      return null;
    },

    // Expand to show specific nodes
    expandToNodes(nodeIds) {
      nodeIds.forEach(nodeId => {
        let parent = this.findParent(nodeId);
        while (parent) {
          this.expandedNodes.add(parent.id);
          parent = this.findParent(parent.id);
        }
      });
    },

    // Start editing node
    startEdit(nodeId) {
      if (!this.editable) return;
      this.editingNode = nodeId;
      this.$nextTick(() => {
        const input = this.$el.querySelector(`[data-node-id="${nodeId}"] .ux-tree__label--editable`);
        if (input) {
          input.focus();
          // Select all text
          const range = document.createRange();
          range.selectNodeContents(input);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
    },

    // Finish editing node
    finishEdit(nodeId, newLabel) {
      const node = this.findNode(nodeId);
      if (node && newLabel.trim()) {
        const oldLabel = node.label;
        node.label = newLabel.trim();
        this.$dispatch('tree:rename', { nodeId, node, oldLabel, newLabel: node.label });
      }
      this.editingNode = null;
    },

    // Cancel editing
    cancelEdit() {
      this.editingNode = null;
    },

    // Handle item click
    handleClick(nodeId, node, event) {
      if (this.selectable) {
        this.select(nodeId);
      }

      if (this.expandOnClick && node.children && node.children.length > 0) {
        this.toggle(nodeId);
      }

      this.$dispatch('tree:click', { nodeId, node, event });
    },

    // Handle double click
    handleDoubleClick(nodeId, node, event) {
      if (this.editable) {
        this.startEdit(nodeId);
      }
      this.$dispatch('tree:dblclick', { nodeId, node, event });
    },

    // Drag & Drop handlers
    handleDragStart(nodeId, event) {
      if (!this.draggable) return;
      this.draggedNode = nodeId;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', nodeId);
    },

    handleDragOver(nodeId, event) {
      if (!this.draggable || !this.draggedNode) return;
      if (nodeId === this.draggedNode) return;

      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.dragOverNode = nodeId;
    },

    handleDragLeave(nodeId) {
      if (this.dragOverNode === nodeId) {
        this.dragOverNode = null;
      }
    },

    handleDrop(nodeId, event) {
      if (!this.draggable || !this.draggedNode) return;
      event.preventDefault();

      const draggedNode = this.findNode(this.draggedNode);
      const targetNode = this.findNode(nodeId);

      if (draggedNode && targetNode && this.draggedNode !== nodeId) {
        // Check if target is not a descendant of dragged
        if (!this.isDescendant(this.draggedNode, nodeId)) {
          this.$dispatch('tree:drop', {
            draggedNodeId: this.draggedNode,
            targetNodeId: nodeId,
            draggedNode,
            targetNode
          });
        }
      }

      this.draggedNode = null;
      this.dragOverNode = null;
    },

    handleDragEnd() {
      this.draggedNode = null;
      this.dragOverNode = null;
    },

    // Check if nodeId is descendant of parentId
    isDescendant(parentId, nodeId) {
      const parent = this.findNode(parentId);
      if (!parent || !parent.children) return false;

      for (const child of parent.children) {
        if (child.id === nodeId) return true;
        if (this.isDescendant(child.id, nodeId)) return true;
      }
      return false;
    },

    // Actions
    addNode(parentId = null, newNode) {
      const parent = parentId ? this.findNode(parentId) : null;
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(newNode);
        this.expandedNodes.add(parentId);
      } else {
        this.data.push(newNode);
      }
      this.$dispatch('tree:add', { parentId, node: newNode });
    },

    removeNode(nodeId) {
      const removeFromList = (nodes) => {
        const index = nodes.findIndex(n => n.id === nodeId);
        if (index !== -1) {
          nodes.splice(index, 1);
          return true;
        }
        for (const node of nodes) {
          if (node.children && removeFromList(node.children)) {
            return true;
          }
        }
        return false;
      };

      const node = this.findNode(nodeId);
      if (removeFromList(this.data)) {
        this.selectedNodes.delete(nodeId);
        this.checkedNodes.delete(nodeId);
        this.expandedNodes.delete(nodeId);
        this.$dispatch('tree:remove', { nodeId, node });
      }
    },

    // Get selected nodes data
    getSelected() {
      return [...this.selectedNodes].map(id => this.findNode(id)).filter(Boolean);
    },

    // Get checked nodes data
    getChecked() {
      return [...this.checkedNodes].map(id => this.findNode(id)).filter(Boolean);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxTree', treeData);
  }

  // Expose icons for external use
  window.UX = window.UX || {};
  window.UX.treeIcons = icons;
})();
