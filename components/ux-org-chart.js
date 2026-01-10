/**
 * UX Org Chart Component
 * Hierarchical organization chart with zoom, pan, and collapsible branches
 * @requires ux-core.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Org Chart - Container
       ========================================================================== */

    :root {
      --ux-org-chart-node-width: 180px;
      --ux-org-chart-node-min-height: 80px;
      --ux-org-chart-node-padding: var(--ux-space-md);
      --ux-org-chart-node-gap: var(--ux-space-xl);
      --ux-org-chart-level-gap: 60px;
      --ux-org-chart-connector-width: 2px;
      --ux-org-chart-connector-color: var(--ux-border-color);
      --ux-org-chart-node-radius: var(--ux-radius-lg);
      --ux-org-chart-transition: var(--ux-transition-normal);
    }

    .ux-org-chart {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
      overflow: hidden;
      font-family: var(--ux-font-family);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-lg);
      user-select: none;
    }

    .ux-org-chart__viewport {
      position: absolute;
      inset: 0;
      overflow: hidden;
      cursor: grab;
    }

    .ux-org-chart__viewport:active {
      cursor: grabbing;
    }

    .ux-org-chart__canvas {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--ux-space-2xl);
      transform-origin: center center;
      transition: transform var(--ux-org-chart-transition) var(--ux-ease-out);
      min-width: 100%;
      min-height: 100%;
    }

    .ux-org-chart__canvas--dragging {
      transition: none;
    }

    /* ==========================================================================
       Org Chart - Controls
       ========================================================================== */

    .ux-org-chart__controls {
      position: absolute;
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
      z-index: 10;
    }

    .ux-org-chart__control {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      color: var(--ux-text);
      cursor: pointer;
      box-shadow: var(--ux-shadow-md);
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-org-chart__control:hover {
      background: var(--ux-surface-secondary);
      transform: scale(1.05);
    }

    .ux-org-chart__control:active {
      transform: scale(0.95);
    }

    .ux-org-chart__control:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .ux-org-chart__control svg {
      width: 20px;
      height: 20px;
    }

    .ux-org-chart__zoom-level {
      font-size: var(--ux-font-size-xs);
      text-align: center;
      padding: var(--ux-space-xs);
      background: var(--ux-surface);
      border-radius: var(--ux-radius-sm);
      box-shadow: var(--ux-shadow-sm);
      min-width: 40px;
    }

    /* ==========================================================================
       Org Chart - Search
       ========================================================================== */

    .ux-org-chart__search {
      position: absolute;
      top: var(--ux-space-lg);
      left: var(--ux-space-lg);
      z-index: 10;
      width: 280px;
      max-width: calc(100% - var(--ux-space-xl) * 2);
    }

    .ux-org-chart__search-input {
      width: 100%;
      height: 40px;
      padding: 0 var(--ux-space-md) 0 40px;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      box-shadow: var(--ux-shadow-md);
      outline: none;
      transition: border-color var(--ux-transition-fast), box-shadow var(--ux-transition-fast);
    }

    .ux-org-chart__search-input:focus {
      border-color: var(--ux-primary);
      box-shadow: var(--ux-shadow-md), 0 0 0 3px var(--ux-primary-tint);
    }

    .ux-org-chart__search-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-org-chart__search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* ==========================================================================
       Org Chart - Tree Structure
       ========================================================================== */

    .ux-org-chart__tree {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ux-org-chart__branch {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .ux-org-chart__children {
      display: flex;
      gap: var(--ux-org-chart-node-gap);
      position: relative;
      padding-top: var(--ux-org-chart-level-gap);
    }

    .ux-org-chart__children--collapsed {
      display: none;
    }

    /* ==========================================================================
       Org Chart - Node
       ========================================================================== */

    .ux-org-chart__node {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: var(--ux-org-chart-node-width);
      min-height: var(--ux-org-chart-node-min-height);
      padding: var(--ux-org-chart-node-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-org-chart-node-radius);
      box-shadow: var(--ux-shadow-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
      text-align: center;
    }

    .ux-org-chart__node:hover {
      border-color: var(--ux-primary);
      box-shadow: var(--ux-shadow-md);
      transform: translateY(-2px);
    }

    .ux-org-chart__node:active {
      transform: translateY(0) scale(0.98);
    }

    .ux-org-chart__node--selected {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px var(--ux-primary-tint), var(--ux-shadow-md);
    }

    .ux-org-chart__node--highlighted {
      border-color: var(--ux-warning);
      box-shadow: 0 0 0 3px var(--ux-warning-tint), var(--ux-shadow-md);
      animation: ux-org-chart-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-org-chart-pulse {
      0%, 100% { box-shadow: 0 0 0 3px var(--ux-warning-tint), var(--ux-shadow-md); }
      50% { box-shadow: 0 0 0 6px var(--ux-warning-tint), var(--ux-shadow-lg); }
    }

    .ux-org-chart__node--collapsed {
      opacity: 0.7;
    }

    /* Node Avatar */
    .ux-org-chart__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: var(--ux-space-sm);
      flex-shrink: 0;
      background: var(--ux-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ux-medium-contrast);
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      text-transform: uppercase;
    }

    .ux-org-chart__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Node Info */
    .ux-org-chart__name {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      line-height: 1.3;
      margin-bottom: var(--ux-space-xs);
      word-break: break-word;
    }

    .ux-org-chart__title {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      line-height: 1.3;
      word-break: break-word;
    }

    .ux-org-chart__department {
      font-size: 10px;
      color: var(--ux-text-tertiary);
      margin-top: var(--ux-space-xs);
      padding: 2px 8px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-sm);
    }

    /* Expand/Collapse Toggle */
    .ux-org-chart__toggle {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-border-color);
      border-radius: 50%;
      background: var(--ux-surface);
      color: var(--ux-text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--ux-transition-fast);
      z-index: 5;
    }

    .ux-org-chart__toggle:hover {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
      transform: translateX(-50%) scale(1.1);
    }

    .ux-org-chart__toggle svg {
      width: 14px;
      height: 14px;
      transition: transform var(--ux-transition-fast);
    }

    .ux-org-chart__toggle--collapsed svg {
      transform: rotate(-90deg);
    }

    /* Child count badge */
    .ux-org-chart__count {
      position: absolute;
      bottom: -8px;
      right: -8px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: 10px;
      background: var(--ux-primary);
      color: white;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--ux-shadow-sm);
    }

    /* ==========================================================================
       Org Chart - Connectors (CSS-drawn lines)
       ========================================================================== */

    .ux-org-chart__connector {
      position: absolute;
      pointer-events: none;
    }

    /* Vertical line from parent to horizontal bar */
    .ux-org-chart__connector--vertical {
      left: 50%;
      top: 100%;
      width: var(--ux-org-chart-connector-width);
      height: calc(var(--ux-org-chart-level-gap) / 2);
      background: var(--ux-org-chart-connector-color);
      transform: translateX(-50%);
    }

    /* Horizontal bar connecting children */
    .ux-org-chart__connector--horizontal {
      position: absolute;
      top: calc(var(--ux-org-chart-level-gap) / 2);
      height: var(--ux-org-chart-connector-width);
      background: var(--ux-org-chart-connector-color);
      transform: translateY(-50%);
    }

    /* Vertical line from horizontal bar to child */
    .ux-org-chart__branch::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: var(--ux-org-chart-connector-width);
      height: calc(var(--ux-org-chart-level-gap) / 2);
      background: var(--ux-org-chart-connector-color);
      transform: translateX(-50%);
    }

    /* First branch - hide the line going up */
    .ux-org-chart__tree > .ux-org-chart__branch::before {
      display: none;
    }

    /* ==========================================================================
       Org Chart - Horizontal Layout
       ========================================================================== */

    .ux-org-chart--horizontal .ux-org-chart__tree {
      flex-direction: row;
    }

    .ux-org-chart--horizontal .ux-org-chart__branch {
      flex-direction: row;
    }

    .ux-org-chart--horizontal .ux-org-chart__children {
      flex-direction: column;
      padding-top: 0;
      padding-left: var(--ux-org-chart-level-gap);
    }

    .ux-org-chart--horizontal .ux-org-chart__connector--vertical {
      top: 50%;
      left: 100%;
      width: calc(var(--ux-org-chart-level-gap) / 2);
      height: var(--ux-org-chart-connector-width);
      transform: translateY(-50%);
    }

    .ux-org-chart--horizontal .ux-org-chart__connector--horizontal {
      left: calc(var(--ux-org-chart-level-gap) / 2);
      top: 0;
      width: var(--ux-org-chart-connector-width);
      transform: translateX(-50%);
    }

    .ux-org-chart--horizontal .ux-org-chart__branch::before {
      top: 50%;
      left: 0;
      width: calc(var(--ux-org-chart-level-gap) / 2);
      height: var(--ux-org-chart-connector-width);
      transform: translateY(-50%);
    }

    .ux-org-chart--horizontal .ux-org-chart__toggle {
      bottom: auto;
      left: auto;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
    }

    .ux-org-chart--horizontal .ux-org-chart__toggle:hover {
      transform: translateY(-50%) scale(1.1);
    }

    .ux-org-chart--horizontal .ux-org-chart__toggle svg {
      transform: rotate(90deg);
    }

    .ux-org-chart--horizontal .ux-org-chart__toggle--collapsed svg {
      transform: rotate(0deg);
    }

    /* ==========================================================================
       Org Chart - Glass Variant
       ========================================================================== */

    .ux-org-chart--glass {
      background: var(--ux-glass-bg-thin);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    .ux-org-chart--glass .ux-org-chart__node {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-org-chart--glass .ux-org-chart__node:hover {
      box-shadow: var(--ux-glass-shadow), 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .ux-org-chart--glass .ux-org-chart__control,
    .ux-org-chart--glass .ux-org-chart__search-input,
    .ux-org-chart--glass .ux-org-chart__zoom-level {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border: 1px solid var(--ux-glass-border);
    }

    .ux-org-chart--glass .ux-org-chart__toggle {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Org Chart - Compact Mode
       ========================================================================== */

    .ux-org-chart--compact {
      --ux-org-chart-node-width: 140px;
      --ux-org-chart-node-min-height: 60px;
      --ux-org-chart-node-padding: var(--ux-space-sm);
      --ux-org-chart-node-gap: var(--ux-space-md);
      --ux-org-chart-level-gap: 40px;
    }

    .ux-org-chart--compact .ux-org-chart__avatar {
      width: 36px;
      height: 36px;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-org-chart--compact .ux-org-chart__name {
      font-size: var(--ux-font-size-xs);
    }

    .ux-org-chart--compact .ux-org-chart__title {
      font-size: 10px;
    }

    .ux-org-chart--compact .ux-org-chart__toggle {
      width: 20px;
      height: 20px;
      bottom: -10px;
    }

    .ux-org-chart--compact .ux-org-chart__toggle svg {
      width: 12px;
      height: 12px;
    }

    /* ==========================================================================
       Org Chart - Size Variants
       ========================================================================== */

    .ux-org-chart--sm {
      --ux-org-chart-node-width: 120px;
      --ux-org-chart-node-min-height: 50px;
      --ux-org-chart-node-gap: var(--ux-space-sm);
      --ux-org-chart-level-gap: 30px;
    }

    .ux-org-chart--lg {
      --ux-org-chart-node-width: 220px;
      --ux-org-chart-node-min-height: 100px;
      --ux-org-chart-node-gap: var(--ux-space-2xl);
      --ux-org-chart-level-gap: 80px;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-org-chart {
        background: var(--ux-surface);
      }

      .ux-org-chart__node {
        background: var(--ux-surface-secondary);
        border-color: var(--ux-border-color);
      }

      .ux-org-chart--glass .ux-org-chart__node:hover {
        box-shadow: var(--ux-glass-shadow), 0 8px 32px rgba(0, 0, 0, 0.3);
      }
    }

    .ux-dark .ux-org-chart {
      background: var(--ux-surface);
    }

    .ux-dark .ux-org-chart__node {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-org-chart__canvas {
        transition: none;
      }

      .ux-org-chart__node,
      .ux-org-chart__control,
      .ux-org-chart__toggle {
        transition: none;
      }

      .ux-org-chart__node--highlighted {
        animation: none;
      }
    }

    /* ==========================================================================
       Print Styles
       ========================================================================== */

    @media print {
      .ux-org-chart {
        overflow: visible;
        height: auto;
        min-height: auto;
      }

      .ux-org-chart__controls,
      .ux-org-chart__search {
        display: none;
      }

      .ux-org-chart__canvas {
        position: static;
        transform: none !important;
      }
    }
  `;

  // Icons
  const icons = {
    zoomIn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    zoomOut: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    reset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    expand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    collapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-org-chart-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-org-chart-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const orgChartData = (options = {}) => ({
    // Configuration
    data: options.data || null,
    horizontal: options.horizontal ?? false,
    compact: options.compact ?? false,
    showSearch: options.showSearch ?? true,
    showControls: options.showControls ?? true,
    minZoom: options.minZoom ?? 0.25,
    maxZoom: options.maxZoom ?? 2,
    zoomStep: options.zoomStep ?? 0.25,

    // State
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialPanX: 0,
    initialPanY: 0,
    selectedNode: null,
    highlightedNodes: new Set(),
    collapsedNodes: new Set(options.collapsed || []),
    searchQuery: '',

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      // Center the chart initially
      this.$nextTick(() => {
        this.centerChart();
      });

      // Keyboard navigation
      this._keyHandler = (e) => {
        if (e.key === 'Escape') {
          this.selectedNode = null;
          this.highlightedNodes.clear();
          this.searchQuery = '';
        }
        if (e.key === '+' || e.key === '=') {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.zoomIn();
          }
        }
        if (e.key === '-') {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.zoomOut();
          }
        }
        if (e.key === '0') {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.resetZoom();
          }
        }
      };
      document.addEventListener('keydown', this._keyHandler);

      // Wheel zoom
      this.$el.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Zoom methods
    zoomIn() {
      const newZoom = Math.min(this.zoom + this.zoomStep, this.maxZoom);
      this.setZoom(newZoom);
    },

    zoomOut() {
      const newZoom = Math.max(this.zoom - this.zoomStep, this.minZoom);
      this.setZoom(newZoom);
    },

    setZoom(level) {
      this.zoom = Math.round(level * 100) / 100;
      this.$dispatch('orgchart:zoom', { zoom: this.zoom });
    },

    resetZoom() {
      this.zoom = 1;
      this.panX = 0;
      this.panY = 0;
      this.centerChart();
      this.$dispatch('orgchart:reset');
    },

    centerChart() {
      const viewport = this.$el.querySelector('.ux-org-chart__viewport');
      const canvas = this.$el.querySelector('.ux-org-chart__canvas');
      if (!viewport || !canvas) return;

      const vRect = viewport.getBoundingClientRect();
      const cRect = canvas.getBoundingClientRect();

      // Center the canvas in the viewport
      this.panX = (vRect.width - cRect.width * this.zoom) / 2;
      this.panY = 40; // Some top padding
    },

    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -this.zoomStep : this.zoomStep;
        const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom + delta));
        this.setZoom(newZoom);
      }
    },

    // Pan methods
    startDrag(e) {
      if (e.target.closest('.ux-org-chart__node') ||
          e.target.closest('.ux-org-chart__control') ||
          e.target.closest('.ux-org-chart__search') ||
          e.target.closest('.ux-org-chart__toggle')) {
        return;
      }

      this.isDragging = true;
      this.dragStartX = e.clientX || e.touches?.[0]?.clientX || 0;
      this.dragStartY = e.clientY || e.touches?.[0]?.clientY || 0;
      this.initialPanX = this.panX;
      this.initialPanY = this.panY;
    },

    drag(e) {
      if (!this.isDragging) return;

      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      this.panX = this.initialPanX + (clientX - this.dragStartX);
      this.panY = this.initialPanY + (clientY - this.dragStartY);
    },

    endDrag() {
      this.isDragging = false;
    },

    getTransform() {
      return `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    },

    // Node methods
    toggleNode(nodeId) {
      if (this.collapsedNodes.has(nodeId)) {
        this.collapsedNodes.delete(nodeId);
        this.$dispatch('orgchart:expand', { nodeId });
      } else {
        this.collapsedNodes.add(nodeId);
        this.$dispatch('orgchart:collapse', { nodeId });
      }
      // Force reactivity
      this.collapsedNodes = new Set(this.collapsedNodes);
    },

    selectNode(nodeId, node) {
      this.selectedNode = this.selectedNode === nodeId ? null : nodeId;
      this.$dispatch('orgchart:select', { nodeId, node, selected: this.selectedNode === nodeId });
    },

    isCollapsed(nodeId) {
      return this.collapsedNodes.has(nodeId);
    },

    isSelected(nodeId) {
      return this.selectedNode === nodeId;
    },

    isHighlighted(nodeId) {
      return this.highlightedNodes.has(nodeId);
    },

    // Search methods
    search() {
      this.highlightedNodes.clear();

      if (!this.searchQuery.trim()) {
        return;
      }

      const query = this.searchQuery.toLowerCase();
      const matchingNodes = this.findMatchingNodes(this.data, query);

      matchingNodes.forEach(node => {
        this.highlightedNodes.add(node.id);
        // Expand parents to show highlighted nodes
        this.expandToNode(node.id);
      });

      // Force reactivity
      this.highlightedNodes = new Set(this.highlightedNodes);

      // Focus on first match
      if (matchingNodes.length > 0) {
        this.focusOnNode(matchingNodes[0].id);
      }

      this.$dispatch('orgchart:search', {
        query: this.searchQuery,
        results: matchingNodes
      });
    },

    findMatchingNodes(node, query, results = []) {
      if (!node) return results;

      const nameMatch = node.name?.toLowerCase().includes(query);
      const titleMatch = node.title?.toLowerCase().includes(query);
      const deptMatch = node.department?.toLowerCase().includes(query);

      if (nameMatch || titleMatch || deptMatch) {
        results.push(node);
      }

      if (node.children) {
        node.children.forEach(child => {
          this.findMatchingNodes(child, query, results);
        });
      }

      return results;
    },

    expandToNode(nodeId) {
      const path = this.getPathToNode(nodeId, this.data);
      if (path) {
        path.forEach(id => {
          this.collapsedNodes.delete(id);
        });
        this.collapsedNodes = new Set(this.collapsedNodes);
      }
    },

    getPathToNode(nodeId, node, path = []) {
      if (!node) return null;
      if (node.id === nodeId) return path;

      if (node.children) {
        for (const child of node.children) {
          const result = this.getPathToNode(nodeId, child, [...path, node.id]);
          if (result) return result;
        }
      }

      return null;
    },

    focusOnNode(nodeId) {
      this.$nextTick(() => {
        const nodeEl = this.$el.querySelector(`[data-node-id="${nodeId}"]`);
        if (nodeEl) {
          const viewport = this.$el.querySelector('.ux-org-chart__viewport');
          const vRect = viewport.getBoundingClientRect();
          const nRect = nodeEl.getBoundingClientRect();

          // Calculate position to center the node
          const centerX = vRect.width / 2 - (nRect.left - vRect.left + nRect.width / 2);
          const centerY = vRect.height / 2 - (nRect.top - vRect.top + nRect.height / 2);

          this.panX += centerX;
          this.panY += centerY;
        }
      });
    },

    clearSearch() {
      this.searchQuery = '';
      this.highlightedNodes.clear();
    },

    // Expand/Collapse all
    expandAll() {
      this.collapsedNodes.clear();
      this.$dispatch('orgchart:expand-all');
    },

    collapseAll() {
      const allIds = this.getAllNodeIds(this.data);
      this.collapsedNodes = new Set(allIds);
      this.$dispatch('orgchart:collapse-all');
    },

    getAllNodeIds(node, ids = []) {
      if (!node) return ids;

      if (node.children && node.children.length > 0) {
        ids.push(node.id);
        node.children.forEach(child => {
          this.getAllNodeIds(child, ids);
        });
      }

      return ids;
    },

    // Utility methods
    hasChildren(node) {
      return node && node.children && node.children.length > 0;
    },

    getInitials(name) {
      if (!name) return '';
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    },

    getZoomPercentage() {
      return Math.round(this.zoom * 100) + '%';
    },

    // Export data
    getSelectedNode() {
      if (!this.selectedNode) return null;
      return this.findNodeById(this.selectedNode, this.data);
    },

    findNodeById(nodeId, node) {
      if (!node) return null;
      if (node.id === nodeId) return node;

      if (node.children) {
        for (const child of node.children) {
          const found = this.findNodeById(nodeId, child);
          if (found) return found;
        }
      }

      return null;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxOrgChart', orgChartData);
  }

  // Expose icons for external use
  window.UX = window.UX || {};
  window.UX.orgChartIcons = icons;
})();
