/**
 * UX BOM Tree Component
 * Bill of Materials hierarchical tree view for manufacturing
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       BOM Tree Variables
       ========================================================================== */

    :root {
      --ux-bom-tree-font-size: var(--ux-font-size-md);
      --ux-bom-tree-item-height: 48px;
      --ux-bom-tree-item-padding: var(--ux-space-sm) var(--ux-space-md);
      --ux-bom-tree-indent: 28px;
      --ux-bom-tree-border-radius: var(--ux-radius-lg);

      /* Level indicators */
      --ux-bom-tree-level-width: 3px;
      --ux-bom-tree-level-gap: var(--ux-space-xs);

      /* Icons */
      --ux-bom-tree-icon-size: 20px;
      --ux-bom-tree-toggle-size: 20px;

      /* Type colors */
      --ux-bom-type-raw: var(--ux-amber-500);
      --ux-bom-type-raw-bg: var(--ux-amber-50);
      --ux-bom-type-subassembly: var(--ux-blue-500);
      --ux-bom-type-subassembly-bg: var(--ux-blue-50);
      --ux-bom-type-finished: var(--ux-green-500);
      --ux-bom-type-finished-bg: var(--ux-green-50);
      --ux-bom-type-consumable: var(--ux-purple-500);
      --ux-bom-type-consumable-bg: var(--ux-purple-50);
      --ux-bom-type-packaging: var(--ux-gray-500);
      --ux-bom-type-packaging-bg: var(--ux-gray-100);
    }

    /* ==========================================================================
       BOM Tree Base
       ========================================================================== */

    .ux-bom-tree {
      font-family: var(--ux-font-family);
      font-size: var(--ux-bom-tree-font-size);
      color: var(--ux-text);
      background: var(--ux-surface);
      border-radius: var(--ux-bom-tree-border-radius);
      overflow: hidden;
    }

    .ux-bom-tree--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ==========================================================================
       BOM Tree Header / Toolbar
       ========================================================================== */

    .ux-bom-tree__header {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-bom-tree__title {
      font-weight: 600;
      font-size: var(--ux-font-size-lg);
      flex: 1;
    }

    .ux-bom-tree__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-bom-tree__action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: var(--ux-text-secondary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-default);
    }

    .ux-bom-tree__action:hover {
      background: var(--ux-surface-tertiary);
      color: var(--ux-text);
    }

    .ux-bom-tree__action:active {
      transform: scale(0.95);
    }

    .ux-bom-tree__action svg {
      width: 18px;
      height: 18px;
    }

    /* ==========================================================================
       BOM Tree Search
       ========================================================================== */

    .ux-bom-tree__search {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
    }

    .ux-bom-tree__search-input {
      flex: 1;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      outline: none;
      transition: border-color var(--ux-transition-fast);
    }

    .ux-bom-tree__search-input:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px var(--ux-primary-tint);
    }

    .ux-bom-tree__search-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       BOM Tree List
       ========================================================================== */

    .ux-bom-tree__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ux-bom-tree__list--nested {
      padding-left: var(--ux-bom-tree-indent);
    }

    /* ==========================================================================
       BOM Tree Node / Item
       ========================================================================== */

    .ux-bom-tree__node {
      margin: 0;
      padding: 0;
    }

    .ux-bom-tree__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      min-height: var(--ux-bom-tree-item-height);
      padding: var(--ux-bom-tree-item-padding);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease-default);
      position: relative;
    }

    .ux-bom-tree__item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-bom-tree__item:active {
      background: var(--ux-surface-tertiary);
    }

    .ux-bom-tree__item--selected {
      background: var(--ux-primary-tint);
    }

    .ux-bom-tree__item--selected:hover {
      background: var(--ux-primary-tint);
    }

    .ux-bom-tree__item--highlight {
      background: var(--ux-warning-tint);
    }

    .ux-bom-tree__item--dragging {
      opacity: 0.5;
    }

    .ux-bom-tree__item--drag-over {
      background: var(--ux-primary-tint);
      outline: 2px dashed var(--ux-primary);
      outline-offset: -2px;
    }

    /* ==========================================================================
       Toggle Arrow
       ========================================================================== */

    .ux-bom-tree__toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-bom-tree-toggle-size);
      height: var(--ux-bom-tree-toggle-size);
      flex-shrink: 0;
      color: var(--ux-text-tertiary);
      transition: transform var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-bom-tree__toggle svg {
      width: 14px;
      height: 14px;
    }

    .ux-bom-tree__toggle--expanded {
      transform: rotate(90deg);
    }

    .ux-bom-tree__toggle--empty {
      visibility: hidden;
    }

    /* ==========================================================================
       Level Indicator
       ========================================================================== */

    .ux-bom-tree__level {
      display: flex;
      align-items: center;
      gap: var(--ux-bom-tree-level-gap);
      flex-shrink: 0;
    }

    .ux-bom-tree__level-bar {
      width: var(--ux-bom-tree-level-width);
      height: 24px;
      border-radius: 2px;
      background: var(--ux-border-color);
    }

    .ux-bom-tree__level-bar--l1 { background: var(--ux-primary); }
    .ux-bom-tree__level-bar--l2 { background: var(--ux-success); }
    .ux-bom-tree__level-bar--l3 { background: var(--ux-warning); }
    .ux-bom-tree__level-bar--l4 { background: var(--ux-danger); }
    .ux-bom-tree__level-bar--l5 { background: var(--ux-purple-500); }

    /* ==========================================================================
       Component Type Icon
       ========================================================================== */

    .ux-bom-tree__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface-tertiary);
      color: var(--ux-text-secondary);
    }

    .ux-bom-tree__icon svg {
      width: var(--ux-bom-tree-icon-size);
      height: var(--ux-bom-tree-icon-size);
    }

    /* Type-based icon colors */
    .ux-bom-tree__icon--raw {
      background: var(--ux-bom-type-raw-bg);
      color: var(--ux-bom-type-raw);
    }

    .ux-bom-tree__icon--subassembly {
      background: var(--ux-bom-type-subassembly-bg);
      color: var(--ux-bom-type-subassembly);
    }

    .ux-bom-tree__icon--finished {
      background: var(--ux-bom-type-finished-bg);
      color: var(--ux-bom-type-finished);
    }

    .ux-bom-tree__icon--consumable {
      background: var(--ux-bom-type-consumable-bg);
      color: var(--ux-bom-type-consumable);
    }

    .ux-bom-tree__icon--packaging {
      background: var(--ux-bom-type-packaging-bg);
      color: var(--ux-bom-type-packaging);
    }

    /* ==========================================================================
       Component Details
       ========================================================================== */

    .ux-bom-tree__details {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-bom-tree__name {
      font-weight: 500;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-bom-tree__sku {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      font-family: var(--ux-font-mono);
    }

    /* ==========================================================================
       Quantity
       ========================================================================== */

    .ux-bom-tree__quantity {
      display: flex;
      align-items: baseline;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
      min-width: 70px;
      justify-content: flex-end;
    }

    .ux-bom-tree__qty-value {
      font-weight: 600;
      font-size: var(--ux-font-size-md);
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
    }

    .ux-bom-tree__qty-unit {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
    }

    /* ==========================================================================
       Stock Status
       ========================================================================== */

    .ux-bom-tree__stock {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
      min-width: 90px;
    }

    .ux-bom-tree__stock-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ux-bom-tree__stock--in-stock .ux-bom-tree__stock-dot {
      background: var(--ux-success);
    }

    .ux-bom-tree__stock--low-stock .ux-bom-tree__stock-dot {
      background: var(--ux-warning);
      animation: ux-bom-pulse 2s ease-in-out infinite;
    }

    .ux-bom-tree__stock--out-of-stock .ux-bom-tree__stock-dot {
      background: var(--ux-danger);
    }

    .ux-bom-tree__stock-text {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    .ux-bom-tree__stock--in-stock .ux-bom-tree__stock-text {
      color: var(--ux-success);
    }

    .ux-bom-tree__stock--low-stock .ux-bom-tree__stock-text {
      color: var(--ux-warning);
    }

    .ux-bom-tree__stock--out-of-stock .ux-bom-tree__stock-text {
      color: var(--ux-danger);
    }

    @keyframes ux-bom-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ==========================================================================
       Cost Display
       ========================================================================== */

    .ux-bom-tree__cost {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
      min-width: 80px;
    }

    .ux-bom-tree__cost-value {
      font-weight: 600;
      font-size: var(--ux-font-size-md);
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
    }

    .ux-bom-tree__cost-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-bom-tree__cost--total {
      background: var(--ux-primary-tint);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-radius-sm);
    }

    .ux-bom-tree__cost--total .ux-bom-tree__cost-value {
      color: var(--ux-primary);
    }

    /* ==========================================================================
       Footer / Summary
       ========================================================================== */

    .ux-bom-tree__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-bom-tree__summary {
      display: flex;
      gap: var(--ux-space-lg);
    }

    .ux-bom-tree__summary-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-bom-tree__summary-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-bom-tree__summary-value {
      font-weight: 600;
      font-size: var(--ux-font-size-lg);
      font-variant-numeric: tabular-nums;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-bom-tree__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      color: var(--ux-text-tertiary);
      text-align: center;
    }

    .ux-bom-tree__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      opacity: 0.5;
    }

    .ux-bom-tree__empty-title {
      font-weight: 600;
      font-size: var(--ux-font-size-lg);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    /* ==========================================================================
       Type Badge
       ========================================================================== */

    .ux-bom-tree__type {
      display: inline-flex;
      align-items: center;
      height: 20px;
      padding: 0 var(--ux-space-xs);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: var(--ux-radius-sm);
      flex-shrink: 0;
    }

    .ux-bom-tree__type--raw {
      background: var(--ux-bom-type-raw-bg);
      color: var(--ux-bom-type-raw);
    }

    .ux-bom-tree__type--subassembly {
      background: var(--ux-bom-type-subassembly-bg);
      color: var(--ux-bom-type-subassembly);
    }

    .ux-bom-tree__type--finished {
      background: var(--ux-bom-type-finished-bg);
      color: var(--ux-bom-type-finished);
    }

    .ux-bom-tree__type--consumable {
      background: var(--ux-bom-type-consumable-bg);
      color: var(--ux-bom-type-consumable);
    }

    .ux-bom-tree__type--packaging {
      background: var(--ux-bom-type-packaging-bg);
      color: var(--ux-bom-type-packaging);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-bom-tree--sm {
      --ux-bom-tree-font-size: var(--ux-font-size-sm);
      --ux-bom-tree-item-height: 40px;
      --ux-bom-tree-item-padding: var(--ux-space-xs) var(--ux-space-sm);
      --ux-bom-tree-indent: 24px;
      --ux-bom-tree-icon-size: 16px;
    }

    .ux-bom-tree--sm .ux-bom-tree__icon {
      width: 28px;
      height: 28px;
    }

    .ux-bom-tree--lg {
      --ux-bom-tree-font-size: var(--ux-font-size-lg);
      --ux-bom-tree-item-height: 56px;
      --ux-bom-tree-item-padding: var(--ux-space-md) var(--ux-space-lg);
      --ux-bom-tree-indent: 36px;
      --ux-bom-tree-icon-size: 24px;
    }

    .ux-bom-tree--lg .ux-bom-tree__icon {
      width: 40px;
      height: 40px;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-bom-tree--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 1px solid var(--ux-glass-border);
    }

    .ux-bom-tree--glass .ux-bom-tree__header,
    .ux-bom-tree--glass .ux-bom-tree__footer {
      background: rgba(255, 255, 255, 0.05);
    }

    .ux-bom-tree--glass .ux-bom-tree__item:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .ux-bom-tree--glass .ux-bom-tree__item--selected {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-bom-tree--compact .ux-bom-tree__item {
      min-height: 36px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }

    .ux-bom-tree--compact .ux-bom-tree__icon {
      width: 24px;
      height: 24px;
    }

    .ux-bom-tree--compact .ux-bom-tree__icon svg {
      width: 14px;
      height: 14px;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-bom-type-raw-bg: rgba(245, 158, 11, 0.15);
        --ux-bom-type-subassembly-bg: rgba(59, 130, 246, 0.15);
        --ux-bom-type-finished-bg: rgba(34, 197, 94, 0.15);
        --ux-bom-type-consumable-bg: rgba(168, 85, 247, 0.15);
        --ux-bom-type-packaging-bg: rgba(107, 114, 128, 0.15);
      }

      .ux-bom-tree--glass .ux-bom-tree__header,
      .ux-bom-tree--glass .ux-bom-tree__footer {
        background: rgba(0, 0, 0, 0.2);
      }

      .ux-bom-tree--glass .ux-bom-tree__item:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    .ux-dark {
      --ux-bom-type-raw-bg: rgba(245, 158, 11, 0.15);
      --ux-bom-type-subassembly-bg: rgba(59, 130, 246, 0.15);
      --ux-bom-type-finished-bg: rgba(34, 197, 94, 0.15);
      --ux-bom-type-consumable-bg: rgba(168, 85, 247, 0.15);
      --ux-bom-type-packaging-bg: rgba(107, 114, 128, 0.15);
    }

    .ux-dark .ux-bom-tree--glass .ux-bom-tree__header,
    .ux-dark .ux-bom-tree--glass .ux-bom-tree__footer {
      background: rgba(0, 0, 0, 0.2);
    }

    .ux-dark .ux-bom-tree--glass .ux-bom-tree__item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-bom-tree__header {
        flex-wrap: wrap;
      }

      .ux-bom-tree__cost,
      .ux-bom-tree__stock {
        min-width: auto;
      }

      .ux-bom-tree__item {
        flex-wrap: wrap;
        gap: var(--ux-space-xs);
      }

      .ux-bom-tree__details {
        flex-basis: calc(100% - 60px);
      }

      .ux-bom-tree__quantity,
      .ux-bom-tree__stock,
      .ux-bom-tree__cost {
        margin-left: auto;
      }

      .ux-bom-tree__footer {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-bom-tree__summary {
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-bom-tree__toggle,
      .ux-bom-tree__item,
      .ux-bom-tree__action {
        transition: none;
      }

      .ux-bom-tree__stock--low-stock .ux-bom-tree__stock-dot {
        animation: none;
      }
    }

    /* ==========================================================================
       Print Styles
       ========================================================================== */

    @media print {
      .ux-bom-tree {
        background: white;
        border: 1px solid #ccc;
      }

      .ux-bom-tree__actions,
      .ux-bom-tree__search {
        display: none;
      }

      .ux-bom-tree__item {
        break-inside: avoid;
      }
    }
  `;

  // Icons
  const icons = {
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    raw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    subassembly: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    finished: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    consumable: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    packaging: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    expandAll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    collapseAll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    export: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-bom-tree-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-bom-tree-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const bomTreeData = (options = {}) => ({
    // Configuration
    data: options.data || [],
    showSearch: options.showSearch ?? true,
    showCost: options.showCost ?? true,
    showStock: options.showStock ?? true,
    showLevels: options.showLevels ?? true,
    showTypes: options.showTypes ?? true,
    currency: options.currency ?? '$',
    currencyPosition: options.currencyPosition ?? 'before',
    lowStockThreshold: options.lowStockThreshold ?? 10,
    draggable: options.draggable ?? false,
    selectable: options.selectable ?? false,

    // State
    expandedNodes: new Set(options.expanded || []),
    selectedNode: null,
    searchQuery: '',
    draggedNode: null,
    dragOverNode: null,

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      // Auto-expand first level if no expanded specified
      if (this.expandedNodes.size === 0 && this.data.length > 0) {
        this.data.forEach(node => {
          if (node.children && node.children.length > 0) {
            this.expandedNodes.add(node.id);
          }
        });
      }
    },

    // Toggle expansion
    toggle(nodeId) {
      if (this.expandedNodes.has(nodeId)) {
        this.expandedNodes.delete(nodeId);
      } else {
        this.expandedNodes.add(nodeId);
      }
      this.$dispatch('bom:toggle', { nodeId, expanded: this.expandedNodes.has(nodeId) });
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
      this.$dispatch('bom:expand-all');
    },

    // Collapse all nodes
    collapseAll() {
      this.expandedNodes.clear();
      this.$dispatch('bom:collapse-all');
    },

    // Select node
    select(nodeId, node) {
      if (!this.selectable) return;
      this.selectedNode = this.selectedNode === nodeId ? null : nodeId;
      this.$dispatch('bom:select', { nodeId, node, selected: this.selectedNode === nodeId });
    },

    // Search filter
    get filteredData() {
      if (!this.searchQuery.trim()) return this.data;
      return this.filterNodes(this.data, this.searchQuery.toLowerCase());
    },

    filterNodes(nodes, query) {
      return nodes.reduce((acc, node) => {
        const matches = node.name.toLowerCase().includes(query) ||
                       (node.sku && node.sku.toLowerCase().includes(query));

        const filteredChildren = node.children ?
          this.filterNodes(node.children, query) : [];

        if (matches || filteredChildren.length > 0) {
          acc.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
            _highlight: matches
          });

          // Auto-expand parents of matches
          if (filteredChildren.length > 0) {
            this.expandedNodes.add(node.id);
          }
        }

        return acc;
      }, []);
    },

    // Get stock status
    getStockStatus(node) {
      if (!node.stock && node.stock !== 0) return null;
      if (node.stock <= 0) return 'out-of-stock';
      if (node.stock <= (node.lowThreshold || this.lowStockThreshold)) return 'low-stock';
      return 'in-stock';
    },

    getStockLabel(node) {
      const status = this.getStockStatus(node);
      if (status === 'out-of-stock') return 'Out of Stock';
      if (status === 'low-stock') return 'Low Stock';
      return 'In Stock';
    },

    // Format currency
    formatCurrency(value) {
      if (value === null || value === undefined) return '';
      const formatted = Number(value).toFixed(2);
      return this.currencyPosition === 'before'
        ? `${this.currency}${formatted}`
        : `${formatted}${this.currency}`;
    },

    // Calculate total cost recursively
    calculateTotalCost(nodes = this.data) {
      return nodes.reduce((total, node) => {
        const nodeCost = (node.unitCost || 0) * (node.quantity || 1);
        const childrenCost = node.children ? this.calculateTotalCost(node.children) : 0;
        return total + nodeCost + childrenCost;
      }, 0);
    },

    // Calculate rollup cost for a node
    calculateRollupCost(node) {
      const nodeCost = (node.unitCost || 0) * (node.quantity || 1);
      const childrenCost = node.children ? this.calculateTotalCost(node.children) : 0;
      return nodeCost + childrenCost;
    },

    // Count components
    countComponents(nodes = this.data) {
      return nodes.reduce((count, node) => {
        const childCount = node.children ? this.countComponents(node.children) : 0;
        return count + 1 + childCount;
      }, 0);
    },

    // Get component type icon
    getTypeIcon(type) {
      switch (type) {
        case 'raw': return icons.raw;
        case 'subassembly': return icons.subassembly;
        case 'finished': return icons.finished;
        case 'consumable': return icons.consumable;
        case 'packaging': return icons.packaging;
        default: return icons.finished;
      }
    },

    // Get level color class
    getLevelClass(level) {
      const lvl = Math.min(level, 5);
      return `ux-bom-tree__level-bar--l${lvl}`;
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

    // Export BOM structure
    exportBOM(format = 'json') {
      const flattenBOM = (nodes, level = 0, parentId = null) => {
        return nodes.reduce((acc, node) => {
          acc.push({
            id: node.id,
            parentId,
            level,
            sku: node.sku || '',
            name: node.name,
            type: node.type || 'raw',
            quantity: node.quantity || 1,
            unit: node.unit || 'pcs',
            unitCost: node.unitCost || 0,
            totalCost: (node.unitCost || 0) * (node.quantity || 1),
            stock: node.stock,
            stockStatus: this.getStockStatus(node)
          });

          if (node.children) {
            acc.push(...flattenBOM(node.children, level + 1, node.id));
          }

          return acc;
        }, []);
      };

      const flatData = flattenBOM(this.data);

      if (format === 'csv') {
        const headers = ['Level', 'SKU', 'Name', 'Type', 'Qty', 'Unit', 'Unit Cost', 'Total Cost', 'Stock'];
        const rows = flatData.map(row => [
          row.level,
          row.sku,
          row.name,
          row.type,
          row.quantity,
          row.unit,
          row.unitCost,
          row.totalCost,
          row.stock || ''
        ]);
        const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
        this.$dispatch('bom:export', { format: 'csv', data: csvContent });
        return csvContent;
      }

      this.$dispatch('bom:export', { format: 'json', data: flatData });
      return flatData;
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
        this.$dispatch('bom:reorder', {
          draggedNodeId: this.draggedNode,
          targetNodeId: nodeId,
          draggedNode,
          targetNode
        });
      }

      this.draggedNode = null;
      this.dragOverNode = null;
    },

    handleDragEnd() {
      this.draggedNode = null;
      this.dragOverNode = null;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxBomTree', bomTreeData);
  }

  // Expose icons for external use
  window.UX = window.UX || {};
  window.UX.bomTreeIcons = icons;
})();
