/**
 * UX JSON Viewer Component
 * Interactive JSON tree viewer with collapsible nodes and syntax highlighting
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX JSON Viewer - Base
    ======================================== */

    .ux-json-viewer {
      font-family: 'SF Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      background: var(--ux-gray-900);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-json-viewer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--ux-gray-800);
      border-bottom: 1px solid var(--ux-gray-700);
    }

    .ux-json-viewer__title {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-gray-400);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ux-json-viewer__badge {
      padding: 0.125rem 0.5rem;
      background: var(--ux-gray-700);
      border-radius: var(--ux-radius-sm);
      font-size: 0.6875rem;
      color: var(--ux-gray-300);
    }

    .ux-json-viewer__actions {
      display: flex;
      gap: 0.5rem;
    }

    .ux-json-viewer__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      padding: 0.375rem 0.625rem;
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-gray-400);
      font-size: 0.75rem;
      font-family: inherit;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-json-viewer__btn:hover {
      background: var(--ux-gray-700);
      color: var(--ux-gray-200);
    }

    .ux-json-viewer__btn--active {
      background: var(--ux-gray-700);
      color: var(--ux-primary);
    }

    .ux-json-viewer__btn svg {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Content
    ======================================== */

    .ux-json-viewer__content {
      padding: 1rem;
      overflow-x: auto;
      max-height: 500px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--ux-gray-600) transparent;
    }

    .ux-json-viewer__content::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .ux-json-viewer__content::-webkit-scrollbar-track {
      background: transparent;
    }

    .ux-json-viewer__content::-webkit-scrollbar-thumb {
      background: var(--ux-gray-600);
      border-radius: 4px;
    }

    /* ========================================
       Tree Structure
    ======================================== */

    .ux-json-viewer__tree {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .ux-json-viewer__node {
      position: relative;
    }

    .ux-json-viewer__row {
      display: flex;
      align-items: flex-start;
      padding: 0.125rem 0;
      cursor: default;
    }

    .ux-json-viewer__row:hover {
      background: rgba(255, 255, 255, 0.03);
    }

    /* Toggle Button */
    .ux-json-viewer__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 20px;
      padding: 0;
      margin-right: 0.25rem;
      background: transparent;
      border: none;
      color: var(--ux-gray-500);
      cursor: pointer;
      flex-shrink: 0;
    }

    .ux-json-viewer__toggle:hover {
      color: var(--ux-gray-300);
    }

    .ux-json-viewer__toggle svg {
      width: 10px;
      height: 10px;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-json-viewer__toggle--expanded svg {
      transform: rotate(90deg);
    }

    .ux-json-viewer__toggle--hidden {
      visibility: hidden;
    }

    /* Indentation */
    .ux-json-viewer__indent {
      width: 1.25rem;
      flex-shrink: 0;
    }

    /* ========================================
       Syntax Highlighting
    ======================================== */

    .ux-json-viewer__key {
      color: #e06c75;
      margin-right: 0.25rem;
    }

    .ux-json-viewer__key::after {
      content: ':';
      color: var(--ux-gray-500);
      margin-left: 0.125rem;
    }

    .ux-json-viewer__value--string {
      color: #98c379;
    }

    .ux-json-viewer__value--string::before,
    .ux-json-viewer__value--string::after {
      content: '"';
      color: #98c379;
    }

    .ux-json-viewer__value--number {
      color: #d19a66;
    }

    .ux-json-viewer__value--boolean {
      color: #56b6c2;
    }

    .ux-json-viewer__value--null {
      color: #c678dd;
      font-style: italic;
    }

    .ux-json-viewer__value--url {
      color: #61afef;
      text-decoration: underline;
      cursor: pointer;
    }

    .ux-json-viewer__value--url:hover {
      color: #7ec8ff;
    }

    /* Brackets */
    .ux-json-viewer__bracket {
      color: var(--ux-gray-500);
    }

    .ux-json-viewer__bracket--open {
      margin-left: 0.25rem;
    }

    /* Collapsed Preview */
    .ux-json-viewer__preview {
      color: var(--ux-gray-500);
      font-style: italic;
      margin-left: 0.25rem;
    }

    /* Children */
    .ux-json-viewer__children {
      margin: 0;
      padding: 0;
      padding-left: 1.25rem;
      list-style: none;
      border-left: 1px solid var(--ux-gray-700);
      margin-left: 0.5rem;
    }

    /* ========================================
       Count Badge
    ======================================== */

    .ux-json-viewer__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      height: 1rem;
      padding: 0 0.375rem;
      margin-left: 0.5rem;
      background: var(--ux-gray-700);
      border-radius: 10px;
      font-size: 0.625rem;
      color: var(--ux-gray-400);
    }

    /* ========================================
       Search Highlight
    ======================================== */

    .ux-json-viewer__highlight {
      background: rgba(255, 213, 0, 0.3);
      border-radius: 2px;
      padding: 0 2px;
    }

    /* ========================================
       Search Box
    ======================================== */

    .ux-json-viewer__search {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--ux-gray-700);
    }

    .ux-json-viewer__search-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      background: var(--ux-gray-800);
      border: 1px solid var(--ux-gray-700);
      border-radius: var(--ux-radius-md);
      color: var(--ux-gray-100);
      font-size: 0.875rem;
      font-family: inherit;
    }

    .ux-json-viewer__search-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-json-viewer__search-input::placeholder {
      color: var(--ux-gray-500);
    }

    /* ========================================
       Raw Mode
    ======================================== */

    .ux-json-viewer__raw {
      white-space: pre-wrap;
      word-break: break-word;
      color: var(--ux-gray-300);
      margin: 0;
    }

    /* ========================================
       Light Theme
    ======================================== */

    .ux-json-viewer--light {
      background: var(--ux-gray-50);
    }

    .ux-json-viewer--light .ux-json-viewer__header {
      background: var(--ux-gray-100);
      border-bottom-color: var(--ux-gray-200);
    }

    .ux-json-viewer--light .ux-json-viewer__badge {
      background: var(--ux-gray-200);
      color: var(--ux-gray-600);
    }

    .ux-json-viewer--light .ux-json-viewer__btn {
      color: var(--ux-gray-500);
    }

    .ux-json-viewer--light .ux-json-viewer__btn:hover {
      background: var(--ux-gray-200);
      color: var(--ux-gray-700);
    }

    .ux-json-viewer--light .ux-json-viewer__row:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    .ux-json-viewer--light .ux-json-viewer__children {
      border-left-color: var(--ux-gray-300);
    }

    .ux-json-viewer--light .ux-json-viewer__key { color: #a626a4; }
    .ux-json-viewer--light .ux-json-viewer__value--string { color: #50a14f; }
    .ux-json-viewer--light .ux-json-viewer__value--number { color: #986801; }
    .ux-json-viewer--light .ux-json-viewer__value--boolean { color: #0184bc; }
    .ux-json-viewer--light .ux-json-viewer__value--null { color: #a626a4; }
    .ux-json-viewer--light .ux-json-viewer__bracket { color: var(--ux-gray-500); }

    /* ========================================
       Compact Mode
    ======================================== */

    .ux-json-viewer--compact .ux-json-viewer__row {
      padding: 0;
    }

    .ux-json-viewer--compact .ux-json-viewer__children {
      padding-left: 1rem;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-json-viewer--sm {
      font-size: 0.75rem;
    }

    .ux-json-viewer--lg {
      font-size: 1rem;
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-json-viewer__toggle svg {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-json-viewer-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-json-viewer-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    chevron: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.41 1.41l4.59-4.59a1 1 0 000-1.41L10.7 6.7a1 1 0 00-1.41.01z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    collapse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  // Alpine.js component for JSON viewer
  const jsonViewerData = (options = {}) => ({
    // Data
    data: options.data || null,
    rawJson: '',

    // Configuration
    initialExpanded: options.initialExpanded ?? 2, // Depth to expand initially
    maxHeight: options.maxHeight || '500px',
    showHeader: options.showHeader ?? true,
    showSearch: options.showSearch ?? false,
    showLineNumbers: options.showLineNumbers ?? false,
    linkUrls: options.linkUrls ?? true,

    // State
    expanded: {},
    searchQuery: '',
    viewMode: 'tree', // 'tree' or 'raw'
    copied: false,
    icons,

    init() {
      // Parse JSON if string
      if (typeof options.data === 'string') {
        try {
          this.data = JSON.parse(options.data);
          this.rawJson = options.data;
        } catch (e) {
          this.data = null;
          this.rawJson = options.data;
          console.error('Invalid JSON:', e);
        }
      } else {
        this.data = options.data;
        this.rawJson = JSON.stringify(options.data, null, 2);
      }

      // Initialize expanded state
      this.initExpandedState(this.data, '', 0);
    },

    // Initialize expanded state based on depth
    initExpandedState(obj, path, depth) {
      if (obj === null || typeof obj !== 'object') return;

      const key = path || 'root';
      this.expanded[key] = depth < this.initialExpanded;

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          this.initExpandedState(item, `${path}[${index}]`, depth + 1);
        });
      } else {
        Object.keys(obj).forEach(k => {
          this.initExpandedState(obj[k], path ? `${path}.${k}` : k, depth + 1);
        });
      }
    },

    // Toggle node expansion
    toggleNode(path) {
      this.expanded[path] = !this.expanded[path];
    },

    // Expand all nodes
    expandAll() {
      const expand = (obj, path) => {
        if (obj === null || typeof obj !== 'object') return;

        const key = path || 'root';
        this.expanded[key] = true;

        if (Array.isArray(obj)) {
          obj.forEach((item, index) => expand(item, `${path}[${index}]`));
        } else {
          Object.keys(obj).forEach(k => expand(obj[k], path ? `${path}.${k}` : k));
        }
      };

      expand(this.data, '');
    },

    // Collapse all nodes
    collapseAll() {
      Object.keys(this.expanded).forEach(key => {
        this.expanded[key] = false;
      });
    },

    // Check if node is expanded
    isExpanded(path) {
      return this.expanded[path || 'root'] ?? false;
    },

    // Get value type
    getType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      return typeof value;
    },

    // Check if value is expandable
    isExpandable(value) {
      return value !== null && typeof value === 'object';
    },

    // Get preview for collapsed objects/arrays
    getPreview(value) {
      if (Array.isArray(value)) {
        return `${value.length} items`;
      }
      if (typeof value === 'object' && value !== null) {
        const keys = Object.keys(value);
        if (keys.length <= 3) {
          return keys.join(', ');
        }
        return `${keys.length} properties`;
      }
      return '';
    },

    // Get item count
    getCount(value) {
      if (Array.isArray(value)) return value.length;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length;
      return 0;
    },

    // Check if value is a URL
    isUrl(value) {
      if (typeof value !== 'string') return false;
      try {
        new URL(value);
        return value.startsWith('http://') || value.startsWith('https://');
      } catch {
        return false;
      }
    },

    // Format value for display
    formatValue(value) {
      if (value === null) return 'null';
      if (typeof value === 'boolean') return value ? 'true' : 'false';
      if (typeof value === 'number') return String(value);
      if (typeof value === 'string') return value;
      return '';
    },

    // Copy JSON to clipboard
    async copyJson() {
      try {
        const text = typeof this.data === 'object'
          ? JSON.stringify(this.data, null, 2)
          : this.rawJson;

        await navigator.clipboard.writeText(text);
        this.copied = true;

        setTimeout(() => {
          this.copied = false;
        }, 2000);

        this.$dispatch('jsonviewer:copy');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },

    // Toggle view mode
    toggleViewMode() {
      this.viewMode = this.viewMode === 'tree' ? 'raw' : 'tree';
    },

    // Set data
    setData(newData) {
      if (typeof newData === 'string') {
        try {
          this.data = JSON.parse(newData);
          this.rawJson = newData;
        } catch (e) {
          this.data = null;
          this.rawJson = newData;
        }
      } else {
        this.data = newData;
        this.rawJson = JSON.stringify(newData, null, 2);
      }

      // Reset expanded state
      this.expanded = {};
      this.initExpandedState(this.data, '', 0);
    },

    // Search functionality
    matchesSearch(key, value) {
      if (!this.searchQuery) return true;

      const query = this.searchQuery.toLowerCase();
      const keyMatch = key && key.toLowerCase().includes(query);
      const valueMatch = typeof value === 'string' && value.toLowerCase().includes(query);

      return keyMatch || valueMatch;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxJsonViewer', jsonViewerData);
  }

})();
