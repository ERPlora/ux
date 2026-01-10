/**
 * UX Work Order Card Component
 * Work order cards for manufacturing and production systems
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Work Order Variables
       ========================================================================== */

    :root {
      --ux-work-order-width: 360px;
      --ux-work-order-padding: var(--ux-space-md);
      --ux-work-order-border-radius: var(--ux-radius-lg, 12px);
      --ux-work-order-font-family: var(--ux-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);

      /* Status colors */
      --ux-work-order-pending: var(--ux-gray-500, #6b7280);
      --ux-work-order-pending-bg: rgba(107, 114, 128, 0.1);
      --ux-work-order-in-progress: var(--ux-primary, #3b82f6);
      --ux-work-order-in-progress-bg: rgba(59, 130, 246, 0.1);
      --ux-work-order-completed: var(--ux-success, #22c55e);
      --ux-work-order-completed-bg: rgba(34, 197, 94, 0.1);
      --ux-work-order-on-hold: var(--ux-warning, #f59e0b);
      --ux-work-order-on-hold-bg: rgba(245, 158, 11, 0.1);

      /* Priority colors */
      --ux-work-order-priority-low: var(--ux-gray-400, #9ca3af);
      --ux-work-order-priority-normal: var(--ux-primary, #3b82f6);
      --ux-work-order-priority-high: var(--ux-warning, #f59e0b);
      --ux-work-order-priority-urgent: var(--ux-danger, #ef4444);
    }

    /* ==========================================================================
       Work Order Container
       ========================================================================== */

    .ux-work-order {
      position: relative;
      display: flex;
      flex-direction: column;
      width: var(--ux-work-order-width);
      background-color: var(--ux-surface, #ffffff);
      border-radius: var(--ux-work-order-border-radius);
      box-shadow: var(--ux-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      font-family: var(--ux-work-order-font-family);
      transition: box-shadow var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-work-order:hover {
      box-shadow: var(--ux-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    /* Priority indicator strip */
    .ux-work-order::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background-color: var(--ux-work-order-priority-color, var(--ux-work-order-priority-normal));
    }

    /* ==========================================================================
       Work Order Header
       ========================================================================== */

    .ux-work-order__header {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
      padding: var(--ux-work-order-padding);
      padding-left: calc(var(--ux-work-order-padding) + 8px);
      border-bottom: 1px solid var(--ux-border-color, #e5e7eb);
    }

    .ux-work-order__header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-sm, 8px);
    }

    .ux-work-order__number {
      font-size: var(--ux-font-size-lg, 1.125rem);
      font-weight: 700;
      color: var(--ux-text, #111827);
      margin: 0;
      font-variant-numeric: tabular-nums;
    }

    .ux-work-order__status {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--ux-work-order-status-bg, var(--ux-work-order-pending-bg));
      color: var(--ux-work-order-status-color, var(--ux-work-order-pending));
    }

    .ux-work-order__status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .ux-work-order__status--pulse .ux-work-order__status-dot {
      animation: ux-work-order-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-work-order-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }

    /* Status variants */
    .ux-work-order__status--pending {
      --ux-work-order-status-bg: var(--ux-work-order-pending-bg);
      --ux-work-order-status-color: var(--ux-work-order-pending);
    }

    .ux-work-order__status--in-progress {
      --ux-work-order-status-bg: var(--ux-work-order-in-progress-bg);
      --ux-work-order-status-color: var(--ux-work-order-in-progress);
    }

    .ux-work-order__status--completed {
      --ux-work-order-status-bg: var(--ux-work-order-completed-bg);
      --ux-work-order-status-color: var(--ux-work-order-completed);
    }

    .ux-work-order__status--on-hold {
      --ux-work-order-status-bg: var(--ux-work-order-on-hold-bg);
      --ux-work-order-status-color: var(--ux-work-order-on-hold);
    }

    /* Product info */
    .ux-work-order__product {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: var(--ux-space-xs, 4px);
    }

    .ux-work-order__product-name {
      font-size: var(--ux-font-size-md, 1rem);
      font-weight: 600;
      color: var(--ux-text, #111827);
      line-height: 1.3;
      margin: 0;
    }

    .ux-work-order__product-sku {
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-family: monospace;
      color: var(--ux-text-tertiary, #9ca3af);
    }

    /* ==========================================================================
       Work Order Priority
       ========================================================================== */

    .ux-work-order__priority {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-work-order__priority-icon {
      width: 12px;
      height: 12px;
    }

    .ux-work-order__priority-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-work-order__priority--low {
      color: var(--ux-work-order-priority-low);
    }

    .ux-work-order__priority--normal {
      color: var(--ux-work-order-priority-normal);
    }

    .ux-work-order__priority--high {
      color: var(--ux-work-order-priority-high);
    }

    .ux-work-order__priority--urgent {
      color: var(--ux-work-order-priority-urgent);
    }

    /* Priority strip variants */
    .ux-work-order--priority-low {
      --ux-work-order-priority-color: var(--ux-work-order-priority-low);
    }

    .ux-work-order--priority-normal {
      --ux-work-order-priority-color: var(--ux-work-order-priority-normal);
    }

    .ux-work-order--priority-high {
      --ux-work-order-priority-color: var(--ux-work-order-priority-high);
    }

    .ux-work-order--priority-urgent {
      --ux-work-order-priority-color: var(--ux-work-order-priority-urgent);
      box-shadow: 0 0 0 2px var(--ux-work-order-priority-urgent),
                  var(--ux-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .ux-work-order--priority-urgent::before {
      animation: ux-work-order-urgent-strip 1.5s ease-in-out infinite;
    }

    @keyframes ux-work-order-urgent-strip {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ==========================================================================
       Work Order Content
       ========================================================================== */

    .ux-work-order__content {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md, 16px);
      padding: var(--ux-work-order-padding);
      padding-left: calc(var(--ux-work-order-padding) + 8px);
    }

    /* ==========================================================================
       Quantity Section
       ========================================================================== */

    .ux-work-order__quantities {
      display: flex;
      align-items: center;
      gap: var(--ux-space-lg, 24px);
    }

    .ux-work-order__quantity {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-work-order__quantity-label {
      font-size: var(--ux-font-size-xs, 0.75rem);
      color: var(--ux-text-tertiary, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-work-order__quantity-value {
      font-size: var(--ux-font-size-xl, 1.25rem);
      font-weight: 700;
      color: var(--ux-text, #111827);
      font-variant-numeric: tabular-nums;
    }

    .ux-work-order__quantity-value--completed {
      color: var(--ux-success, #22c55e);
    }

    .ux-work-order__quantity-value--remaining {
      color: var(--ux-text-secondary, #6b7280);
    }

    /* ==========================================================================
       Progress Section
       ========================================================================== */

    .ux-work-order__progress {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
    }

    .ux-work-order__progress-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ux-work-order__progress-label {
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-work-order__progress-value {
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--ux-text, #111827);
      font-variant-numeric: tabular-nums;
    }

    .ux-work-order__progress-bar {
      width: 100%;
      height: 8px;
      background-color: var(--ux-light, #f3f4f6);
      border-radius: 4px;
      overflow: hidden;
    }

    .ux-work-order__progress-fill {
      height: 100%;
      background-color: var(--ux-primary, #3b82f6);
      border-radius: 4px;
      transition: width var(--ux-transition-normal, 200ms) var(--ux-ease, ease);
    }

    .ux-work-order__progress-fill--success {
      background-color: var(--ux-success, #22c55e);
    }

    .ux-work-order__progress-fill--warning {
      background-color: var(--ux-warning, #f59e0b);
    }

    /* ==========================================================================
       Due Date Section
       ========================================================================== */

    .ux-work-order__due-date {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-work-order__due-date-icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .ux-work-order__due-date-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-work-order__due-date--overdue {
      color: var(--ux-danger, #ef4444);
      font-weight: 600;
    }

    .ux-work-order__due-date--warning {
      color: var(--ux-warning, #f59e0b);
      font-weight: 500;
    }

    .ux-work-order__due-date--overdue .ux-work-order__due-date-icon,
    .ux-work-order__due-date--warning .ux-work-order__due-date-icon {
      opacity: 1;
    }

    /* ==========================================================================
       Machine/Workstation Section
       ========================================================================== */

    .ux-work-order__machine {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-work-order__machine-icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .ux-work-order__machine-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-work-order__machine-name {
      font-weight: 500;
      color: var(--ux-text, #111827);
    }

    /* ==========================================================================
       Materials/BOM Section
       ========================================================================== */

    .ux-work-order__materials {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
    }

    .ux-work-order__materials-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--ux-text, #111827);
    }

    .ux-work-order__materials-count {
      font-size: var(--ux-font-size-xs, 0.75rem);
      color: var(--ux-text-tertiary, #9ca3af);
      font-weight: 400;
    }

    .ux-work-order__materials-list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .ux-work-order__material {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-xs, 4px) var(--ux-space-sm, 8px);
      background-color: var(--ux-surface-secondary, #f9fafb);
      border-radius: var(--ux-border-radius, 6px);
      font-size: var(--ux-font-size-sm, 0.875rem);
    }

    .ux-work-order__material-name {
      color: var(--ux-text, #111827);
    }

    .ux-work-order__material-qty {
      color: var(--ux-text-secondary, #6b7280);
      font-variant-numeric: tabular-nums;
    }

    .ux-work-order__material--shortage {
      background-color: rgba(239, 68, 68, 0.1);
    }

    .ux-work-order__material--shortage .ux-work-order__material-qty {
      color: var(--ux-danger, #ef4444);
      font-weight: 600;
    }

    /* ==========================================================================
       Meta Section (row of metadata items)
       ========================================================================== */

    .ux-work-order__meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-md, 16px);
    }

    .ux-work-order__meta-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-work-order__meta-icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .ux-work-order__meta-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Actions Section
       ========================================================================== */

    .ux-work-order__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm, 8px);
      padding: var(--ux-work-order-padding);
      padding-left: calc(var(--ux-work-order-padding) + 8px);
      border-top: 1px solid var(--ux-border-color, #e5e7eb);
    }

    .ux-work-order__action {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs, 4px);
      padding: var(--ux-space-sm, 8px) var(--ux-space-md, 16px);
      border: none;
      border-radius: 8px;
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-work-order__action--start {
      background-color: var(--ux-primary, #3b82f6);
      color: white;
    }

    .ux-work-order__action--start:hover {
      background-color: var(--ux-primary-shade, #2563eb);
    }

    .ux-work-order__action--pause {
      background-color: var(--ux-warning, #f59e0b);
      color: white;
    }

    .ux-work-order__action--pause:hover {
      background-color: var(--ux-warning-shade, #d97706);
    }

    .ux-work-order__action--complete {
      background-color: var(--ux-success, #22c55e);
      color: white;
    }

    .ux-work-order__action--complete:hover {
      background-color: var(--ux-success-shade, #16a34a);
    }

    .ux-work-order__action--secondary {
      background-color: var(--ux-surface-tertiary, #e5e7eb);
      color: var(--ux-text, #111827);
    }

    .ux-work-order__action--secondary:hover {
      background-color: var(--ux-border-color, #d1d5db);
    }

    .ux-work-order__action:active {
      transform: scale(0.98);
    }

    .ux-work-order__action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .ux-work-order__action-icon {
      width: 16px;
      height: 16px;
    }

    .ux-work-order__action-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-work-order--compact {
      --ux-work-order-padding: var(--ux-space-sm, 8px);
    }

    .ux-work-order--compact .ux-work-order__number {
      font-size: var(--ux-font-size-md, 1rem);
    }

    .ux-work-order--compact .ux-work-order__product-name {
      font-size: var(--ux-font-size-sm, 0.875rem);
    }

    .ux-work-order--compact .ux-work-order__quantities {
      gap: var(--ux-space-md, 16px);
    }

    .ux-work-order--compact .ux-work-order__quantity-value {
      font-size: var(--ux-font-size-lg, 1.125rem);
    }

    .ux-work-order--compact .ux-work-order__materials {
      display: none;
    }

    .ux-work-order--compact .ux-work-order__content {
      gap: var(--ux-space-sm, 8px);
    }

    /* ==========================================================================
       Detailed Variant
       ========================================================================== */

    .ux-work-order--detailed {
      --ux-work-order-width: 420px;
    }

    .ux-work-order--detailed .ux-work-order__header {
      background-color: var(--ux-surface-secondary, #f9fafb);
    }

    /* ==========================================================================
       Full Width
       ========================================================================== */

    .ux-work-order--full {
      --ux-work-order-width: 100%;
    }

    /* ==========================================================================
       Glass Variant (iOS 26 Liquid Glass)
       ========================================================================== */

    .ux-work-order--glass {
      box-shadow: var(--ux-glass-shadow, 0 8px 32px rgba(0, 0, 0, 0.08)),
                  var(--ux-glass-highlight, inset 0 1px 0 rgba(255, 255, 255, 0.5));
      border: 0.5px solid var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-work-order--glass .ux-work-order__header {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
      border-bottom-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-work-order--glass .ux-work-order__actions {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
      border-top-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-work-order--glass .ux-work-order__material {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
    }

    .ux-work-order--glass .ux-work-order__progress-bar {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
    }

    /* ==========================================================================
       Work Order Grid
       ========================================================================== */

    .ux-work-order-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--ux-work-order-width), 1fr));
      gap: var(--ux-space-lg, 24px);
      padding: var(--ux-space-md, 16px);
    }

    .ux-work-order-grid .ux-work-order {
      width: 100%;
    }

    /* Kanban-style columns */
    .ux-work-order-column {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md, 16px);
      min-width: var(--ux-work-order-width);
      padding: var(--ux-space-md, 16px);
      background-color: var(--ux-surface-secondary, #f9fafb);
      border-radius: var(--ux-border-radius-lg, 12px);
    }

    .ux-work-order-column__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm, 8px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-work-order-column__count {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 700;
      background-color: var(--ux-surface-tertiary, #e5e7eb);
      color: var(--ux-text, #111827);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light):not(.ux-theme-light) {
        --ux-work-order-pending-bg: rgba(107, 114, 128, 0.2);
        --ux-work-order-in-progress-bg: rgba(59, 130, 246, 0.2);
        --ux-work-order-completed-bg: rgba(34, 197, 94, 0.2);
        --ux-work-order-on-hold-bg: rgba(245, 158, 11, 0.2);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order__material {
        background-color: var(--ux-gray-800, #1f2937);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order__action--secondary {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-100, #f3f4f6);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order__action--secondary:hover {
        background-color: var(--ux-gray-600, #4b5563);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order-column {
        background-color: var(--ux-gray-800, #1f2937);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order-column__count {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-100, #f3f4f6);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-work-order__progress-bar {
        background-color: var(--ux-gray-700, #374151);
      }
    }

    .ux-dark .ux-work-order__material,
    .ux-theme-dark .ux-work-order__material {
      background-color: var(--ux-gray-800, #1f2937);
    }

    .ux-dark .ux-work-order__action--secondary,
    .ux-theme-dark .ux-work-order__action--secondary {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-100, #f3f4f6);
    }

    .ux-dark .ux-work-order__action--secondary:hover,
    .ux-theme-dark .ux-work-order__action--secondary:hover {
      background-color: var(--ux-gray-600, #4b5563);
    }

    .ux-dark .ux-work-order-column,
    .ux-theme-dark .ux-work-order-column {
      background-color: var(--ux-gray-800, #1f2937);
    }

    .ux-dark .ux-work-order-column__count,
    .ux-theme-dark .ux-work-order-column__count {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-100, #f3f4f6);
    }

    .ux-dark .ux-work-order__progress-bar,
    .ux-theme-dark .ux-work-order__progress-bar {
      background-color: var(--ux-gray-700, #374151);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-work-order,
      .ux-work-order__action,
      .ux-work-order__progress-fill {
        transition: none;
      }

      .ux-work-order__status--pulse .ux-work-order__status-dot,
      .ux-work-order--priority-urgent::before {
        animation: none;
      }
    }
  `;

  // Icons
  const icons = {
    play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    machine: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><circle cx="17" cy="12" r="2"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    flag: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    package: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-work-order-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-work-order-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const workOrderData = (options = {}) => ({
    // Work order identification
    workOrderNumber: options.workOrderNumber || options.number || '',
    workOrderId: options.workOrderId || options.id || null,

    // Product information
    product: {
      name: options.product?.name || '',
      sku: options.product?.sku || '',
      description: options.product?.description || '',
      ...options.product
    },

    // Status: 'pending', 'in-progress', 'completed', 'on-hold'
    status: options.status || 'pending',

    // Priority: 'low', 'normal', 'high', 'urgent'
    priority: options.priority || 'normal',

    // Quantities
    quantityOrdered: options.quantityOrdered || options.ordered || 0,
    quantityCompleted: options.quantityCompleted || options.completed || 0,

    // Due date
    dueDate: options.dueDate ? new Date(options.dueDate) : null,

    // Machine/Workstation
    machine: options.machine || options.workstation || null,

    // Materials/BOM
    materials: options.materials || [],

    // Notes
    notes: options.notes || '',

    // Timer
    startedAt: options.startedAt ? new Date(options.startedAt) : null,
    elapsedTime: 0,
    timerInterval: null,

    // Configuration
    showMaterials: options.showMaterials ?? true,
    showProgress: options.showProgress ?? true,
    showActions: options.showActions ?? true,

    // Labels
    labels: {
      ordered: options.labels?.ordered || 'Ordered',
      completed: options.labels?.completed || 'Completed',
      remaining: options.labels?.remaining || 'Remaining',
      progress: options.labels?.progress || 'Progress',
      dueDate: options.labels?.dueDate || 'Due',
      overdue: options.labels?.overdue || 'Overdue',
      dueSoon: options.labels?.dueSoon || 'Due soon',
      machine: options.labels?.machine || 'Machine',
      materials: options.labels?.materials || 'Materials',
      start: options.labels?.start || 'Start',
      pause: options.labels?.pause || 'Pause',
      resume: options.labels?.resume || 'Resume',
      complete: options.labels?.complete || 'Complete',
      pending: options.labels?.pending || 'Pending',
      inProgress: options.labels?.inProgress || 'In Progress',
      onHold: options.labels?.onHold || 'On Hold',
      low: options.labels?.low || 'Low',
      normal: options.labels?.normal || 'Normal',
      high: options.labels?.high || 'High',
      urgent: options.labels?.urgent || 'Urgent',
      ...options.labels
    },

    // Lifecycle
    init() {
      if (this.status === 'in-progress' && this.startedAt) {
        this.startTimer();
      }
    },

    destroy() {
      this.stopTimer();
    },

    // Computed properties
    get quantityRemaining() {
      return Math.max(0, this.quantityOrdered - this.quantityCompleted);
    },

    get progressPercent() {
      if (this.quantityOrdered === 0) return 0;
      return Math.min(100, Math.round((this.quantityCompleted / this.quantityOrdered) * 100));
    },

    get isOverdue() {
      if (!this.dueDate) return false;
      return new Date() > this.dueDate && this.status !== 'completed';
    },

    get isDueSoon() {
      if (!this.dueDate || this.isOverdue) return false;
      const now = new Date();
      const hoursUntilDue = (this.dueDate - now) / (1000 * 60 * 60);
      return hoursUntilDue <= 24 && hoursUntilDue > 0;
    },

    get formattedDueDate() {
      if (!this.dueDate) return '';
      return this.dueDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    get dueDateStatus() {
      if (this.isOverdue) return 'overdue';
      if (this.isDueSoon) return 'warning';
      return 'normal';
    },

    get statusLabel() {
      const statusLabels = {
        'pending': this.labels.pending,
        'in-progress': this.labels.inProgress,
        'completed': this.labels.completed,
        'on-hold': this.labels.onHold
      };
      return statusLabels[this.status] || this.status;
    },

    get priorityLabel() {
      const priorityLabels = {
        'low': this.labels.low,
        'normal': this.labels.normal,
        'high': this.labels.high,
        'urgent': this.labels.urgent
      };
      return priorityLabels[this.priority] || this.priority;
    },

    get materialsWithShortage() {
      return this.materials.filter(m => m.shortage || (m.available !== undefined && m.required > m.available));
    },

    get hasShortage() {
      return this.materialsWithShortage.length > 0;
    },

    // Timer methods
    startTimer() {
      if (this.timerInterval) return;

      const startTime = this.startedAt ? new Date(this.startedAt).getTime() : Date.now();

      this.timerInterval = setInterval(() => {
        this.elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      }, 1000);

      this.elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    get formattedElapsedTime() {
      const hours = Math.floor(this.elapsedTime / 3600);
      const minutes = Math.floor((this.elapsedTime % 3600) / 60);
      const seconds = this.elapsedTime % 60;

      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    },

    // Status methods
    setStatus(newStatus) {
      const validStatuses = ['pending', 'in-progress', 'completed', 'on-hold'];
      if (!validStatuses.includes(newStatus)) return;

      const oldStatus = this.status;
      this.status = newStatus;

      if (newStatus === 'in-progress' && !this.startedAt) {
        this.startedAt = new Date();
        this.startTimer();
      } else if (newStatus === 'completed' || newStatus === 'on-hold') {
        this.stopTimer();
      }

      this.$dispatch('work-order:status-change', {
        workOrderId: this.workOrderId,
        workOrderNumber: this.workOrderNumber,
        oldStatus,
        newStatus
      });
    },

    start() {
      this.setStatus('in-progress');
    },

    pause() {
      this.setStatus('on-hold');
    },

    resume() {
      this.setStatus('in-progress');
    },

    complete() {
      this.quantityCompleted = this.quantityOrdered;
      this.setStatus('completed');
    },

    // Quantity methods
    incrementCompleted(amount = 1) {
      const newQty = Math.min(this.quantityOrdered, this.quantityCompleted + amount);
      this.quantityCompleted = newQty;

      this.$dispatch('work-order:quantity-change', {
        workOrderId: this.workOrderId,
        workOrderNumber: this.workOrderNumber,
        quantityCompleted: this.quantityCompleted,
        quantityRemaining: this.quantityRemaining
      });

      if (this.quantityCompleted >= this.quantityOrdered) {
        this.complete();
      }
    },

    setCompleted(qty) {
      this.quantityCompleted = Math.min(this.quantityOrdered, Math.max(0, qty));

      this.$dispatch('work-order:quantity-change', {
        workOrderId: this.workOrderId,
        workOrderNumber: this.workOrderNumber,
        quantityCompleted: this.quantityCompleted,
        quantityRemaining: this.quantityRemaining
      });
    },

    // Get icon
    getIcon(name) {
      return icons[name] || '';
    },

    // Get data
    getData() {
      return {
        workOrderId: this.workOrderId,
        workOrderNumber: this.workOrderNumber,
        product: this.product,
        status: this.status,
        priority: this.priority,
        quantityOrdered: this.quantityOrdered,
        quantityCompleted: this.quantityCompleted,
        quantityRemaining: this.quantityRemaining,
        progressPercent: this.progressPercent,
        dueDate: this.dueDate,
        isOverdue: this.isOverdue,
        machine: this.machine,
        materials: this.materials,
        notes: this.notes,
        startedAt: this.startedAt,
        elapsedTime: this.elapsedTime
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxWorkOrder', workOrderData);
  }
})();
