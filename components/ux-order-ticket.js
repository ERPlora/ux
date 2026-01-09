/**
 * UX Order Ticket Component
 * Kitchen display/POS order ticket for restaurant systems
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Order Ticket Variables
       ========================================================================== */

    :root {
      --ux-order-ticket-width: 320px;
      --ux-order-ticket-padding: var(--ux-space-md);
      --ux-order-ticket-border-radius: var(--ux-radius-lg, 12px);
      --ux-order-ticket-font-family: var(--ux-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);

      /* Status colors */
      --ux-order-ticket-pending: var(--ux-warning, #f59e0b);
      --ux-order-ticket-pending-bg: rgba(245, 158, 11, 0.1);
      --ux-order-ticket-preparing: var(--ux-primary, #3b82f6);
      --ux-order-ticket-preparing-bg: rgba(59, 130, 246, 0.1);
      --ux-order-ticket-ready: var(--ux-success, #22c55e);
      --ux-order-ticket-ready-bg: rgba(34, 197, 94, 0.1);
      --ux-order-ticket-completed: var(--ux-gray-500, #6b7280);
      --ux-order-ticket-completed-bg: rgba(107, 114, 128, 0.1);
      --ux-order-ticket-cancelled: var(--ux-danger, #ef4444);
      --ux-order-ticket-cancelled-bg: rgba(239, 68, 68, 0.1);
      --ux-order-ticket-urgent: var(--ux-danger, #ef4444);
      --ux-order-ticket-urgent-bg: rgba(239, 68, 68, 0.15);
    }

    /* ==========================================================================
       Order Ticket Container
       ========================================================================== */

    .ux-order-ticket {
      position: relative;
      display: flex;
      flex-direction: column;
      width: var(--ux-order-ticket-width);
      background-color: var(--ux-surface, #ffffff);
      border-radius: var(--ux-order-ticket-border-radius);
      box-shadow: var(--ux-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      font-family: var(--ux-order-ticket-font-family);
      transition: box-shadow var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-order-ticket:hover {
      box-shadow: var(--ux-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    }

    /* Status border indicator */
    .ux-order-ticket::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: var(--ux-order-ticket-status-color, var(--ux-order-ticket-pending));
    }

    /* ==========================================================================
       Order Ticket Header
       ========================================================================== */

    .ux-order-ticket__header {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
      padding: var(--ux-order-ticket-padding);
      padding-top: calc(var(--ux-order-ticket-padding) + 4px);
      border-bottom: 1px solid var(--ux-border-color, #e5e7eb);
      background-color: var(--ux-surface-secondary, #f9fafb);
    }

    .ux-order-ticket__header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-sm, 8px);
    }

    .ux-order-ticket__order-number {
      font-size: var(--ux-font-size-xl, 1.25rem);
      font-weight: 700;
      color: var(--ux-text, #111827);
      margin: 0;
    }

    .ux-order-ticket__status {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background-color: var(--ux-order-ticket-status-bg, var(--ux-order-ticket-pending-bg));
      color: var(--ux-order-ticket-status-color, var(--ux-order-ticket-pending));
    }

    .ux-order-ticket__status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .ux-order-ticket__status--pulse .ux-order-ticket__status-dot {
      animation: ux-order-ticket-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-order-ticket-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }

    .ux-order-ticket__header-meta {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md, 16px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-order-ticket__meta-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
    }

    .ux-order-ticket__meta-icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .ux-order-ticket__meta-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-order-ticket__time {
      font-weight: 500;
    }

    .ux-order-ticket__table {
      font-weight: 600;
      color: var(--ux-text, #111827);
    }

    .ux-order-ticket__type {
      padding: 2px 6px;
      border-radius: 4px;
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 500;
      background-color: var(--ux-surface-tertiary, #e5e7eb);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-order-ticket__type--dine-in {
      background-color: rgba(59, 130, 246, 0.1);
      color: var(--ux-primary, #3b82f6);
    }

    .ux-order-ticket__type--takeout {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--ux-warning, #f59e0b);
    }

    .ux-order-ticket__type--delivery {
      background-color: rgba(139, 92, 246, 0.1);
      color: #8b5cf6;
    }

    /* ==========================================================================
       Order Ticket Items
       ========================================================================== */

    .ux-order-ticket__items {
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      list-style: none;
      max-height: 320px;
      overflow-y: auto;
    }

    .ux-order-ticket__item {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-sm, 8px);
      padding: var(--ux-space-md, 16px) var(--ux-order-ticket-padding);
      border-bottom: 1px solid var(--ux-border-color, #e5e7eb);
      transition: background-color var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-order-ticket__item:last-child {
      border-bottom: none;
    }

    .ux-order-ticket__item:hover {
      background-color: var(--ux-surface-secondary, #f9fafb);
    }

    .ux-order-ticket__item--completed {
      opacity: 0.6;
      text-decoration: line-through;
      text-decoration-color: var(--ux-text-tertiary, #9ca3af);
    }

    .ux-order-ticket__item--urgent {
      background-color: var(--ux-order-ticket-urgent-bg);
    }

    .ux-order-ticket__item-qty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 28px;
      height: 28px;
      border-radius: 6px;
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 700;
      background-color: var(--ux-surface-tertiary, #e5e7eb);
      color: var(--ux-text, #111827);
      flex-shrink: 0;
    }

    .ux-order-ticket__item--urgent .ux-order-ticket__item-qty {
      background-color: var(--ux-order-ticket-urgent);
      color: white;
    }

    .ux-order-ticket__item-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-order-ticket__item-name {
      font-size: var(--ux-font-size-md, 1rem);
      font-weight: 600;
      color: var(--ux-text, #111827);
      line-height: 1.3;
    }

    .ux-order-ticket__item-modifiers {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 2px;
    }

    .ux-order-ticket__item-modifier {
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
      padding-left: var(--ux-space-sm, 8px);
    }

    .ux-order-ticket__item-modifier::before {
      content: '+ ';
      color: var(--ux-text-tertiary, #9ca3af);
    }

    .ux-order-ticket__item-modifier--remove {
      color: var(--ux-danger, #ef4444);
    }

    .ux-order-ticket__item-modifier--remove::before {
      content: '- ';
      color: var(--ux-danger, #ef4444);
    }

    .ux-order-ticket__item-notes {
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-style: italic;
      color: var(--ux-warning, #f59e0b);
      margin-top: 4px;
      padding: 4px 8px;
      background-color: rgba(245, 158, 11, 0.1);
      border-radius: 4px;
      border-left: 2px solid var(--ux-warning, #f59e0b);
    }

    .ux-order-ticket__item-price {
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 500;
      color: var(--ux-text-secondary, #6b7280);
      text-align: right;
      flex-shrink: 0;
    }

    /* ==========================================================================
       Order Ticket Footer
       ========================================================================== */

    .ux-order-ticket__footer {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm, 8px);
      padding: var(--ux-order-ticket-padding);
      border-top: 1px solid var(--ux-border-color, #e5e7eb);
      background-color: var(--ux-surface-secondary, #f9fafb);
    }

    .ux-order-ticket__totals {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs, 4px);
    }

    .ux-order-ticket__total-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--ux-font-size-sm, 0.875rem);
      color: var(--ux-text-secondary, #6b7280);
    }

    .ux-order-ticket__total-row--grand {
      padding-top: var(--ux-space-sm, 8px);
      margin-top: var(--ux-space-xs, 4px);
      border-top: 1px dashed var(--ux-border-color, #e5e7eb);
      font-size: var(--ux-font-size-lg, 1.125rem);
      font-weight: 700;
      color: var(--ux-text, #111827);
    }

    .ux-order-ticket__total-label {
      flex: 1;
    }

    .ux-order-ticket__total-value {
      font-weight: 600;
      text-align: right;
    }

    /* ==========================================================================
       Order Ticket Actions
       ========================================================================== */

    .ux-order-ticket__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm, 8px);
      padding: var(--ux-order-ticket-padding);
      padding-top: 0;
    }

    .ux-order-ticket__actions--full {
      padding-top: var(--ux-order-ticket-padding);
      border-top: 1px solid var(--ux-border-color, #e5e7eb);
    }

    .ux-order-ticket__action {
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

    .ux-order-ticket__action--primary {
      background-color: var(--ux-primary, #3b82f6);
      color: white;
    }

    .ux-order-ticket__action--primary:hover {
      background-color: var(--ux-primary-shade, #2563eb);
    }

    .ux-order-ticket__action--success {
      background-color: var(--ux-success, #22c55e);
      color: white;
    }

    .ux-order-ticket__action--success:hover {
      background-color: var(--ux-success-shade, #16a34a);
    }

    .ux-order-ticket__action--secondary {
      background-color: var(--ux-surface-tertiary, #e5e7eb);
      color: var(--ux-text, #111827);
    }

    .ux-order-ticket__action--secondary:hover {
      background-color: var(--ux-border-color, #d1d5db);
    }

    .ux-order-ticket__action:active {
      transform: scale(0.98);
    }

    .ux-order-ticket__action-icon {
      width: 16px;
      height: 16px;
    }

    .ux-order-ticket__action-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Order Ticket Timer
       ========================================================================== */

    .ux-order-ticket__timer {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 4px);
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .ux-order-ticket__timer--warning {
      color: var(--ux-warning, #f59e0b);
    }

    .ux-order-ticket__timer--danger {
      color: var(--ux-danger, #ef4444);
      animation: ux-order-ticket-blink 1s ease-in-out infinite;
    }

    @keyframes ux-order-ticket-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .ux-order-ticket__timer-icon {
      width: 14px;
      height: 14px;
    }

    .ux-order-ticket__timer-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ==========================================================================
       Order Ticket Notes (Special Instructions)
       ========================================================================== */

    .ux-order-ticket__notes {
      padding: var(--ux-space-sm, 8px) var(--ux-order-ticket-padding);
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-style: italic;
      color: var(--ux-warning, #f59e0b);
      background-color: rgba(245, 158, 11, 0.08);
      border-top: 1px dashed var(--ux-warning, #f59e0b);
    }

    .ux-order-ticket__notes-label {
      font-weight: 600;
      font-style: normal;
      margin-right: var(--ux-space-xs, 4px);
    }

    /* ==========================================================================
       Status Variants
       ========================================================================== */

    .ux-order-ticket--pending {
      --ux-order-ticket-status-color: var(--ux-order-ticket-pending);
      --ux-order-ticket-status-bg: var(--ux-order-ticket-pending-bg);
    }

    .ux-order-ticket--preparing {
      --ux-order-ticket-status-color: var(--ux-order-ticket-preparing);
      --ux-order-ticket-status-bg: var(--ux-order-ticket-preparing-bg);
    }

    .ux-order-ticket--ready {
      --ux-order-ticket-status-color: var(--ux-order-ticket-ready);
      --ux-order-ticket-status-bg: var(--ux-order-ticket-ready-bg);
    }

    .ux-order-ticket--completed {
      --ux-order-ticket-status-color: var(--ux-order-ticket-completed);
      --ux-order-ticket-status-bg: var(--ux-order-ticket-completed-bg);
      opacity: 0.7;
    }

    .ux-order-ticket--cancelled {
      --ux-order-ticket-status-color: var(--ux-order-ticket-cancelled);
      --ux-order-ticket-status-bg: var(--ux-order-ticket-cancelled-bg);
      opacity: 0.5;
    }

    .ux-order-ticket--urgent {
      box-shadow: 0 0 0 2px var(--ux-order-ticket-urgent),
                  var(--ux-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      animation: ux-order-ticket-urgent-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-order-ticket-urgent-pulse {
      0%, 100% { box-shadow: 0 0 0 2px var(--ux-order-ticket-urgent), var(--ux-shadow-lg); }
      50% { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.4), var(--ux-shadow-lg); }
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-order-ticket--sm {
      --ux-order-ticket-width: 260px;
      --ux-order-ticket-padding: var(--ux-space-sm, 8px);
    }

    .ux-order-ticket--sm .ux-order-ticket__order-number {
      font-size: var(--ux-font-size-lg, 1.125rem);
    }

    .ux-order-ticket--sm .ux-order-ticket__item-name {
      font-size: var(--ux-font-size-sm, 0.875rem);
    }

    .ux-order-ticket--lg {
      --ux-order-ticket-width: 380px;
      --ux-order-ticket-padding: var(--ux-space-lg, 24px);
    }

    .ux-order-ticket--lg .ux-order-ticket__order-number {
      font-size: var(--ux-font-size-2xl, 1.5rem);
    }

    .ux-order-ticket--full {
      --ux-order-ticket-width: 100%;
    }

    /* ==========================================================================
       Glass Variant (iOS 26 Liquid Glass)
       ========================================================================== */

    .ux-order-ticket--glass {
      box-shadow: var(--ux-glass-shadow, 0 8px 32px rgba(0, 0, 0, 0.08)),
                  var(--ux-glass-highlight, inset 0 1px 0 rgba(255, 255, 255, 0.5));
      border: 0.5px solid var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-order-ticket--glass .ux-order-ticket__header,
    .ux-order-ticket--glass .ux-order-ticket__footer {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
    }

    .ux-order-ticket--glass .ux-order-ticket__header {
      border-bottom-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-order-ticket--glass .ux-order-ticket__footer {
      border-top-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-order-ticket--glass .ux-order-ticket__item {
      border-bottom-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    /* ==========================================================================
       Order Ticket Grid
       ========================================================================== */

    .ux-order-ticket-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(var(--ux-order-ticket-width), 1fr));
      gap: var(--ux-space-lg, 24px);
      padding: var(--ux-space-md, 16px);
    }

    .ux-order-ticket-grid .ux-order-ticket {
      width: 100%;
    }

    /* Kanban-style columns */
    .ux-order-ticket-column {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md, 16px);
      min-width: var(--ux-order-ticket-width);
      padding: var(--ux-space-md, 16px);
      background-color: var(--ux-surface-secondary, #f9fafb);
      border-radius: var(--ux-border-radius-lg, 12px);
    }

    .ux-order-ticket-column__header {
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

    .ux-order-ticket-column__count {
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
       Print Styles
       ========================================================================== */

    @media print {
      .ux-order-ticket {
        width: 80mm;
        box-shadow: none;
        border: 1px solid #000;
        border-radius: 0;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .ux-order-ticket::before {
        display: none;
      }

      .ux-order-ticket__header,
      .ux-order-ticket__footer {
        background-color: transparent;
      }

      .ux-order-ticket__status {
        border: 1px solid currentColor;
        background-color: transparent;
      }

      .ux-order-ticket__actions {
        display: none;
      }

      .ux-order-ticket__items {
        max-height: none;
        overflow: visible;
      }

      .ux-order-ticket__item:hover {
        background-color: transparent;
      }

      .ux-order-ticket--glass {
        background: white;
        border: 1px solid #000;
      }

      .ux-order-ticket-grid {
        display: block;
      }

      .ux-order-ticket-grid .ux-order-ticket {
        margin-bottom: 16px;
      }
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light):not(.ux-theme-light) {
        --ux-order-ticket-pending-bg: rgba(245, 158, 11, 0.15);
        --ux-order-ticket-preparing-bg: rgba(59, 130, 246, 0.15);
        --ux-order-ticket-ready-bg: rgba(34, 197, 94, 0.15);
        --ux-order-ticket-completed-bg: rgba(107, 114, 128, 0.15);
        --ux-order-ticket-cancelled-bg: rgba(239, 68, 68, 0.15);
        --ux-order-ticket-urgent-bg: rgba(239, 68, 68, 0.2);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket__item-qty {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-100, #f3f4f6);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket__type {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-300, #d1d5db);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket__action--secondary {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-100, #f3f4f6);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket__action--secondary:hover {
        background-color: var(--ux-gray-600, #4b5563);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket-column {
        background-color: var(--ux-gray-800, #1f2937);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-order-ticket-column__count {
        background-color: var(--ux-gray-700, #374151);
        color: var(--ux-gray-100, #f3f4f6);
      }
    }

    .ux-dark .ux-order-ticket__item-qty,
    .ux-theme-dark .ux-order-ticket__item-qty {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-100, #f3f4f6);
    }

    .ux-dark .ux-order-ticket__type,
    .ux-theme-dark .ux-order-ticket__type {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-300, #d1d5db);
    }

    .ux-dark .ux-order-ticket__action--secondary,
    .ux-theme-dark .ux-order-ticket__action--secondary {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-100, #f3f4f6);
    }

    .ux-dark .ux-order-ticket__action--secondary:hover,
    .ux-theme-dark .ux-order-ticket__action--secondary:hover {
      background-color: var(--ux-gray-600, #4b5563);
    }

    .ux-dark .ux-order-ticket-column,
    .ux-theme-dark .ux-order-ticket-column {
      background-color: var(--ux-gray-800, #1f2937);
    }

    .ux-dark .ux-order-ticket-column__count,
    .ux-theme-dark .ux-order-ticket-column__count {
      background-color: var(--ux-gray-700, #374151);
      color: var(--ux-gray-100, #f3f4f6);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-order-ticket,
      .ux-order-ticket__item,
      .ux-order-ticket__action {
        transition: none;
      }

      .ux-order-ticket--urgent,
      .ux-order-ticket__status--pulse .ux-order-ticket__status-dot,
      .ux-order-ticket__timer--danger {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-order-ticket-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-order-ticket-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const orderTicketData = (options = {}) => ({
    // Order identification
    orderNumber: options.orderNumber || '',
    orderId: options.orderId || null,

    // Order metadata
    table: options.table || null,
    type: options.type || 'dine-in', // 'dine-in', 'takeout', 'delivery'
    createdAt: options.createdAt || new Date(),
    customer: options.customer || null,
    server: options.server || null,

    // Order status
    status: options.status || 'pending', // 'pending', 'preparing', 'ready', 'completed', 'cancelled'
    urgent: options.urgent || false,

    // Order items
    items: options.items || [],

    // Totals
    subtotal: options.subtotal || 0,
    tax: options.tax || 0,
    discount: options.discount || 0,
    total: options.total || 0,
    showTotals: options.showTotals ?? false,

    // Notes
    notes: options.notes || '',

    // Timer
    elapsedTime: 0,
    timerInterval: null,
    warningThreshold: options.warningThreshold || 10, // minutes
    dangerThreshold: options.dangerThreshold || 15, // minutes

    // Currency
    currency: options.currency || '$',
    currencyPosition: options.currencyPosition || 'before', // 'before' or 'after'

    // Lifecycle
    init() {
      this.startTimer();
    },

    destroy() {
      this.stopTimer();
    },

    // Timer methods
    startTimer() {
      if (this.timerInterval) return;

      const startTime = new Date(this.createdAt).getTime();

      this.timerInterval = setInterval(() => {
        const now = Date.now();
        this.elapsedTime = Math.floor((now - startTime) / 1000);
      }, 1000);

      // Initial calculation
      const now = Date.now();
      this.elapsedTime = Math.floor((now - startTime) / 1000);
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    get formattedTime() {
      const hours = Math.floor(this.elapsedTime / 3600);
      const minutes = Math.floor((this.elapsedTime % 3600) / 60);
      const seconds = this.elapsedTime % 60;

      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    },

    get elapsedMinutes() {
      return Math.floor(this.elapsedTime / 60);
    },

    get timerStatus() {
      if (this.elapsedMinutes >= this.dangerThreshold) return 'danger';
      if (this.elapsedMinutes >= this.warningThreshold) return 'warning';
      return 'normal';
    },

    // Format price
    formatPrice(amount) {
      const formatted = parseFloat(amount).toFixed(2);
      if (this.currencyPosition === 'before') {
        return `${this.currency}${formatted}`;
      }
      return `${formatted}${this.currency}`;
    },

    // Calculate totals
    calculateSubtotal() {
      return this.items.reduce((sum, item) => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        return sum + itemTotal;
      }, 0);
    },

    calculateTotal() {
      const subtotal = this.subtotal || this.calculateSubtotal();
      return subtotal + (this.tax || 0) - (this.discount || 0);
    },

    // Status methods
    setStatus(newStatus) {
      const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
      if (validStatuses.includes(newStatus)) {
        const oldStatus = this.status;
        this.status = newStatus;

        if (newStatus === 'completed' || newStatus === 'cancelled') {
          this.stopTimer();
        }

        this.$dispatch('order-ticket:status-change', {
          orderId: this.orderId,
          orderNumber: this.orderNumber,
          oldStatus,
          newStatus
        });
      }
    },

    startPreparing() {
      this.setStatus('preparing');
    },

    markReady() {
      this.setStatus('ready');
    },

    complete() {
      this.setStatus('completed');
    },

    cancel() {
      this.setStatus('cancelled');
    },

    // Item methods
    toggleItemCompleted(index) {
      if (this.items[index]) {
        this.items[index].completed = !this.items[index].completed;
        this.$dispatch('order-ticket:item-toggle', {
          orderId: this.orderId,
          itemIndex: index,
          completed: this.items[index].completed
        });
      }
    },

    get completedItemsCount() {
      return this.items.filter(item => item.completed).length;
    },

    get allItemsCompleted() {
      return this.items.length > 0 && this.items.every(item => item.completed);
    },

    // Print
    print() {
      window.print();
      this.$dispatch('order-ticket:print', {
        orderId: this.orderId,
        orderNumber: this.orderNumber
      });
    },

    // Get order data
    getData() {
      return {
        orderId: this.orderId,
        orderNumber: this.orderNumber,
        table: this.table,
        type: this.type,
        status: this.status,
        urgent: this.urgent,
        items: this.items,
        subtotal: this.subtotal,
        tax: this.tax,
        discount: this.discount,
        total: this.total,
        notes: this.notes,
        createdAt: this.createdAt,
        customer: this.customer,
        server: this.server,
        elapsedTime: this.elapsedTime
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxOrderTicket', orderTicketData);
  }
})();
