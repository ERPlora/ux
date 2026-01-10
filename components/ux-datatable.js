/**
 * UX DataTable Component
 * Responsive data table with standard and "no more tables" mobile views
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX DataTable Container
    ======================================== */

    .ux-datatable {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-datatable--inset {
      margin: var(--ux-space-lg);
    }

    .ux-datatable--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       DataTable Header (Title & Actions)
    ======================================== */

    .ux-datatable__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-datatable__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-datatable__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-datatable__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       DataTable Toolbar (Filters & Search)
    ======================================== */

    .ux-datatable__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .ux-datatable__toolbar-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-datatable__toolbar-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-datatable__search {
      min-width: 200px;
    }

    @media (max-width: 767px) {
      .ux-datatable__toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-datatable__search {
        width: 100%;
      }
    }

    /* ========================================
       Bulk Actions Toolbar
    ======================================== */

    .ux-datatable__bulk-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background: linear-gradient(135deg, rgba(var(--ux-primary-rgb), 0.1), rgba(var(--ux-primary-rgb), 0.05));
      border-bottom: 1px solid rgba(var(--ux-primary-rgb), 0.2);
      flex-shrink: 0;
      animation: ux-datatable-bulk-slide-in 200ms var(--ux-ease);
    }

    @keyframes ux-datatable-bulk-slide-in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .ux-datatable__bulk-info {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
    }

    .ux-datatable__bulk-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 var(--ux-space-xs);
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 12px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
    }

    .ux-datatable__bulk-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__bulk-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__bulk-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-datatable__bulk-btn--danger:hover {
      background: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    .ux-datatable__bulk-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-datatable__bulk-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__bulk-clear:hover {
      background: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-datatable__bulk-clear svg {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 767px) {
      .ux-datatable__bulk-toolbar {
        flex-direction: column;
        align-items: stretch;
        gap: var(--ux-space-sm);
      }

      .ux-datatable__bulk-actions {
        justify-content: flex-end;
      }
    }

    /* ========================================
       Column Filters Row
    ======================================== */

    .ux-datatable__filters {
      display: table-row;
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__filter-cell {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
      vertical-align: middle;
    }

    .ux-datatable__filter-input {
      width: 100%;
      min-width: 80px;
      max-width: 200px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      background-color: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__filter-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-datatable__filter-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-datatable__filter-select {
      width: 100%;
      min-width: 80px;
      max-width: 200px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-right: calc(var(--ux-space-sm) + 16px);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      background-color: var(--ux-surface);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right var(--ux-space-xs) center;
      background-size: 16px;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__filter-select:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-datatable__filter-date {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__filter-date input {
      flex: 1;
      min-width: 100px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      background-color: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
    }

    .ux-datatable__filter-date input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-datatable__filter-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      opacity: 0;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__filter-cell:hover .ux-datatable__filter-clear,
    .ux-datatable__filter-clear:focus {
      opacity: 1;
    }

    .ux-datatable__filter-clear:hover {
      background: var(--ux-surface-tertiary);
      color: var(--ux-text);
    }

    .ux-datatable__filter-clear svg {
      width: 14px;
      height: 14px;
    }

    .ux-datatable__filter-wrapper {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* Active filters indicator */
    .ux-datatable__active-filters {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-lg);
      background-color: var(--ux-surface-tertiary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-datatable__filter-tag {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px var(--ux-space-sm);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 999px;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text);
    }

    .ux-datatable__filter-tag-label {
      color: var(--ux-text-secondary);
    }

    .ux-datatable__filter-tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      padding: 0;
      margin-left: 2px;
      background: none;
      border: none;
      border-radius: 50%;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__filter-tag-remove:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-datatable__filter-tag-remove svg {
      width: 12px;
      height: 12px;
    }

    .ux-datatable__clear-filters {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px var(--ux-space-sm);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__clear-filters:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    /* Hide filters on mobile responsive view */
    @media (max-width: 767px) {
      .ux-datatable--responsive .ux-datatable__filters {
        display: none;
      }
    }

    .ux-datatable--force-responsive .ux-datatable__filters {
      display: none;
    }

    /* ========================================
       DataTable Body (Scrollable Content)
    ======================================== */

    .ux-datatable__body {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-datatable__body--fixed-height {
      max-height: 400px;
    }

    /* ========================================
       Standard Table View
    ======================================== */

    .ux-datatable__table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    .ux-datatable__table--fixed {
      table-layout: fixed;
    }

    /* Table Head */
    .ux-datatable__thead {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__th {
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: left;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      border-bottom: 2px solid var(--ux-border-color);
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__th--sortable {
      cursor: pointer;
      user-select: none;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__th--sortable:hover {
      color: var(--ux-primary);
    }

    .ux-datatable__th--sorted {
      color: var(--ux-primary);
    }

    .ux-datatable__sort-icon {
      display: inline-flex;
      margin-left: var(--ux-space-xs);
      opacity: 0.5;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__th--sorted .ux-datatable__sort-icon {
      opacity: 1;
    }

    .ux-datatable__th--sorted-desc .ux-datatable__sort-icon {
      transform: rotate(180deg);
    }

    /* Alignment */
    .ux-datatable__th--center,
    .ux-datatable__td--center {
      text-align: center;
    }

    .ux-datatable__th--right,
    .ux-datatable__td--right {
      text-align: right;
    }

    /* Table Body */
    .ux-datatable__tbody {
      background-color: var(--ux-surface);
    }

    .ux-datatable__tr {
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__tr:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-datatable__tr--selected {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-datatable__tr--clickable {
      cursor: pointer;
    }

    .ux-datatable__td {
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      border-bottom: 1px solid var(--ux-border-color);
      vertical-align: middle;
    }

    .ux-datatable__tr:last-child .ux-datatable__td {
      border-bottom: none;
    }

    /* Cell content truncation */
    .ux-datatable__td--truncate {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Cell with badge/chip */
    .ux-datatable__td .ux-badge,
    .ux-datatable__td .ux-chip {
      vertical-align: middle;
    }

    /* ========================================
       Checkbox Column
    ======================================== */

    .ux-datatable__th--checkbox,
    .ux-datatable__td--checkbox {
      width: 48px;
      padding-left: var(--ux-space-md);
      padding-right: var(--ux-space-sm);
    }

    /* ========================================
       Actions Column
    ======================================== */

    .ux-datatable__th--actions,
    .ux-datatable__td--actions {
      width: 80px;
      text-align: center;
    }

    .ux-datatable__row-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__row-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__row-action:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-datatable__row-action--danger:hover {
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      color: var(--ux-danger);
    }

    .ux-datatable__row-action svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-datatable__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl) var(--ux-space-lg);
      text-align: center;
    }

    .ux-datatable__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-datatable__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-datatable__empty-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-datatable__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
    }

    .ux-datatable--loading .ux-datatable__tbody {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       DataTable Footer (Pagination)
    ======================================== */

    .ux-datatable__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: var(--ux-space-md);
    }

    .ux-datatable__info {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datatable__pagination {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      background: none;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__page-btn:hover:not(:disabled) {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-datatable__page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-datatable__page-btn--active {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-datatable__page-btn--active:hover:not(:disabled) {
      background-color: var(--ux-primary-shade);
      border-color: var(--ux-primary-shade);
    }

    .ux-datatable__page-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-datatable__per-page {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datatable__per-page select {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      background-color: var(--ux-surface);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
    }

    @media (max-width: 767px) {
      .ux-datatable__footer {
        flex-direction: column;
        align-items: center;
      }
    }

    /* ========================================
       View Toggle Buttons
    ======================================== */

    .ux-datatable__view-toggle {
      display: inline-flex;
      align-items: center;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: 2px;
      gap: 2px;
    }

    .ux-datatable__view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: calc(var(--ux-border-radius) - 2px);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__view-btn:hover {
      color: var(--ux-text);
    }

    .ux-datatable__view-btn--active {
      background-color: var(--ux-surface);
      color: var(--ux-primary);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-datatable__view-btn svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Responsive "No More Tables" View
    ======================================== */

    @media (max-width: 767px) {
      .ux-datatable--responsive .ux-datatable__table,
      .ux-datatable--responsive .ux-datatable__thead,
      .ux-datatable--responsive .ux-datatable__tbody,
      .ux-datatable--responsive .ux-datatable__th,
      .ux-datatable--responsive .ux-datatable__tr,
      .ux-datatable--responsive .ux-datatable__td {
        display: block;
      }

      .ux-datatable--responsive .ux-datatable__thead {
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: hidden;
      }

      .ux-datatable--responsive .ux-datatable__tr {
        margin-bottom: var(--ux-space-md);
        background-color: var(--ux-surface);
        border-radius: var(--ux-border-radius-lg);
        border: 1px solid var(--ux-border-color);
        overflow: hidden;
      }

      .ux-datatable--responsive .ux-datatable__tr:last-child {
        margin-bottom: 0;
      }

      .ux-datatable--responsive .ux-datatable__td {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ux-space-md) var(--ux-space-lg);
        text-align: right;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-datatable--responsive .ux-datatable__tr .ux-datatable__td:last-child {
        border-bottom: none;
      }

      .ux-datatable--responsive .ux-datatable__td::before {
        content: attr(data-label);
        flex: 1;
        font-weight: 600;
        font-size: var(--ux-font-size-sm);
        color: var(--ux-text-secondary);
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding-right: var(--ux-space-md);
      }

      .ux-datatable--responsive .ux-datatable__td--checkbox,
      .ux-datatable--responsive .ux-datatable__td--actions {
        justify-content: flex-end;
      }

      .ux-datatable--responsive .ux-datatable__td--checkbox::before,
      .ux-datatable--responsive .ux-datatable__td--actions::before {
        content: none;
      }

      /* Card header style for first cell */
      .ux-datatable--responsive .ux-datatable__td--primary {
        background-color: var(--ux-surface-secondary);
        font-weight: 600;
      }

      .ux-datatable--responsive .ux-datatable__td--primary::before {
        display: none;
      }

      .ux-datatable--responsive .ux-datatable__td--primary {
        justify-content: flex-start;
        text-align: left;
      }
    }

    /* Force responsive view */
    .ux-datatable--force-responsive .ux-datatable__table,
    .ux-datatable--force-responsive .ux-datatable__thead,
    .ux-datatable--force-responsive .ux-datatable__tbody,
    .ux-datatable--force-responsive .ux-datatable__th,
    .ux-datatable--force-responsive .ux-datatable__tr,
    .ux-datatable--force-responsive .ux-datatable__td {
      display: block;
    }

    .ux-datatable--force-responsive .ux-datatable__thead {
      position: absolute;
      top: -9999px;
      left: -9999px;
      visibility: hidden;
    }

    .ux-datatable--force-responsive .ux-datatable__tr {
      margin-bottom: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      overflow: hidden;
    }

    .ux-datatable--force-responsive .ux-datatable__td {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: right;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-datatable--force-responsive .ux-datatable__tr .ux-datatable__td:last-child {
      border-bottom: none;
    }

    .ux-datatable--force-responsive .ux-datatable__td::before {
      content: attr(data-label);
      flex: 1;
      font-weight: 600;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: left;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-right: var(--ux-space-md);
    }

    /* ========================================
       Striped Rows
    ======================================== */

    .ux-datatable--striped .ux-datatable__tr:nth-child(even) {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Compact Size
    ======================================== */

    .ux-datatable--compact .ux-datatable__th,
    .ux-datatable--compact .ux-datatable__td {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       DataTable Sizes
    ======================================== */

    .ux-datatable--sm .ux-datatable__th,
    .ux-datatable--sm .ux-datatable__td {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-datatable--lg .ux-datatable__th,
    .ux-datatable--lg .ux-datatable__td {
      padding: var(--ux-space-lg) var(--ux-space-xl);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-datatable--glass {
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-datatable--glass .ux-datatable__th {
      background: var(--ux-glass-bg-thin);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-datatable--glass .ux-datatable__td {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-datatable--glass .ux-datatable__tr:hover .ux-datatable__td {
      background: var(--ux-glass-bg-thin);
    }

    .ux-datatable--glass .ux-datatable__tr--selected .ux-datatable__td {
      background: var(--ux-glass-bg);
    }

    .ux-datatable--glass .ux-datatable__footer {
      background: var(--ux-glass-bg-thin);
      border-top-color: var(--ux-glass-border);
    }

    /* ========================================
       Expandable Rows
    ======================================== */

    .ux-datatable__th--expand,
    .ux-datatable__td--expand {
      width: 48px;
      padding-left: var(--ux-space-md);
      padding-right: var(--ux-space-sm);
    }

    .ux-datatable__expand-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__expand-btn:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-datatable__expand-btn--expanded {
      transform: rotate(90deg);
      color: var(--ux-primary);
    }

    .ux-datatable__expand-btn svg {
      width: 18px;
      height: 18px;
    }

    /* Expanded row content */
    .ux-datatable__tr--expandable {
      cursor: pointer;
    }

    .ux-datatable__tr--expanded {
      background-color: rgba(var(--ux-primary-rgb), 0.03);
    }

    .ux-datatable__tr--expanded:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.06);
    }

    .ux-datatable__expand-row {
      background-color: var(--ux-surface-secondary);
    }

    .ux-datatable__expand-row > td {
      padding: 0;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-datatable__expand-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-datatable__expand-content--open {
      grid-template-rows: 1fr;
    }

    .ux-datatable__expand-inner {
      overflow: hidden;
    }

    .ux-datatable__expand-body {
      padding: var(--ux-space-lg);
      border-left: 3px solid var(--ux-primary);
      margin-left: var(--ux-space-md);
    }

    /* Expand all button in header */
    .ux-datatable__expand-all-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__expand-all-btn:hover {
      background-color: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-datatable__expand-all-btn--expanded {
      color: var(--ux-primary);
    }

    .ux-datatable__expand-all-btn svg {
      width: 16px;
      height: 16px;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__expand-all-btn--expanded svg {
      transform: rotate(90deg);
    }

    /* Nested datatable in expanded content */
    .ux-datatable__expand-body .ux-datatable {
      margin: 0;
      border-radius: var(--ux-border-radius);
    }

    /* Detail list in expanded content */
    .ux-datatable__detail-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-datatable__detail-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-datatable__detail-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-datatable__detail-value {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    /* Expand animation for mobile responsive view */
    @media (max-width: 767px) {
      .ux-datatable--responsive .ux-datatable__td--expand {
        display: none;
      }

      .ux-datatable--responsive .ux-datatable__expand-row {
        display: block;
        margin-top: -1px;
        margin-bottom: var(--ux-space-md);
        border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
        border: 1px solid var(--ux-border-color);
        border-top: none;
      }

      .ux-datatable--responsive .ux-datatable__tr--expanded {
        border-radius: var(--ux-border-radius-lg) var(--ux-border-radius-lg) 0 0;
        margin-bottom: 0;
      }

      .ux-datatable--responsive .ux-datatable__expand-body {
        margin-left: 0;
        border-left: none;
        border-top: 3px solid var(--ux-primary);
      }
    }

    .ux-datatable--force-responsive .ux-datatable__td--expand {
      display: none;
    }

    .ux-datatable--force-responsive .ux-datatable__expand-row {
      display: block;
      margin-top: -1px;
      margin-bottom: var(--ux-space-md);
      border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      border-top: none;
    }

    /* Glass variant for expanded content */
    .ux-datatable--glass .ux-datatable__expand-row {
      background: var(--ux-glass-bg-thin);
    }

    .ux-datatable--glass .ux-datatable__expand-body {
      border-left-color: var(--ux-primary);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-datatable__expand-row {
        background-color: var(--ux-surface-tertiary);
      }

      .ux-datatable__tr--expanded {
        background-color: rgba(var(--ux-primary-rgb), 0.08);
      }
    }

    .ux-dark .ux-datatable__expand-row {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-dark .ux-datatable__tr--expanded {
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-datatable__expand-btn,
      .ux-datatable__expand-all-btn svg,
      .ux-datatable__expand-content {
        transition: none;
      }
    }

    /* ========================================
       Export Button & Menu
    ======================================== */

    .ux-datatable__export {
      position: relative;
      display: inline-flex;
    }

    .ux-datatable__export-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__export-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-datatable__export-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-datatable__export-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-datatable__export-menu {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: var(--ux-z-dropdown, 100);
      min-width: 180px;
      margin-top: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__export-menu--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-datatable__export-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      text-align: left;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__export-item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-datatable__export-item svg {
      width: 18px;
      height: 18px;
      color: var(--ux-text-secondary);
    }

    .ux-datatable__export-item-text {
      flex: 1;
    }

    .ux-datatable__export-item-desc {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-datatable__export-divider {
      height: 1px;
      margin: var(--ux-space-xs) 0;
      background: var(--ux-border-color);
    }

    .ux-datatable__export-option {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-datatable__export-option input[type="checkbox"] {
      margin: 0;
    }

    /* Glass variant for export menu */
    .ux-datatable--glass .ux-datatable__export-menu {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-datatable__export-menu {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-datatable__export-menu {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    /* ========================================
       Column Resize
    ======================================== */

    .ux-datatable--resizable .ux-datatable__th {
      position: relative;
      user-select: none;
    }

    .ux-datatable__resize-handle {
      position: absolute;
      top: 0;
      right: 0;
      width: 8px;
      height: 100%;
      cursor: col-resize;
      background: transparent;
      z-index: 1;
      touch-action: none;
    }

    .ux-datatable__resize-handle::after {
      content: '';
      position: absolute;
      top: 25%;
      right: 3px;
      width: 2px;
      height: 50%;
      background: transparent;
      border-radius: 1px;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__resize-handle:hover::after,
    .ux-datatable__resize-handle--active::after {
      background: var(--ux-primary);
    }

    .ux-datatable--resizing {
      cursor: col-resize;
      user-select: none;
    }

    .ux-datatable--resizing .ux-datatable__th,
    .ux-datatable--resizing .ux-datatable__td {
      user-select: none;
    }

    .ux-datatable--resizable .ux-datatable__table {
      table-layout: fixed;
    }

    .ux-datatable__th--resizing {
      background-color: rgba(var(--ux-primary-rgb), 0.05);
    }

    /* Minimum column width indicator */
    .ux-datatable__th--min-width {
      background-color: rgba(var(--ux-warning-rgb, 245, 158, 11), 0.1);
    }

    /* ========================================
       Column Visibility Menu
    ======================================== */

    .ux-datatable__column-toggle {
      position: relative;
      display: inline-flex;
    }

    .ux-datatable__column-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__column-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-datatable__column-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-datatable__column-btn-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 9px;
      font-size: 11px;
      font-weight: 600;
      margin-left: var(--ux-space-xs);
    }

    .ux-datatable__column-menu {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: var(--ux-z-dropdown, 100);
      min-width: 220px;
      max-height: 320px;
      margin-top: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .ux-datatable__column-menu--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-datatable__column-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-datatable__column-menu-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-datatable__column-menu-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-datatable__column-menu-action {
      padding: 2px var(--ux-space-xs);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__column-menu-action:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-datatable__column-list {
      flex: 1;
      overflow-y: auto;
      padding: var(--ux-space-xs) 0;
    }

    .ux-datatable__column-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datatable__column-item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-datatable__column-item input[type="checkbox"] {
      flex-shrink: 0;
      margin: 0;
    }

    .ux-datatable__column-item-label {
      flex: 1;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-datatable__column-item--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-datatable__column-item-drag {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
      cursor: grab;
    }

    .ux-datatable__column-item-drag:active {
      cursor: grabbing;
    }

    .ux-datatable__column-item-drag svg {
      width: 14px;
      height: 14px;
    }

    /* Hidden column indicator in header */
    .ux-datatable__th--hidden,
    .ux-datatable__td--hidden {
      display: none;
    }

    /* Glass variant for column menu */
    .ux-datatable--glass .ux-datatable__column-menu {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* Dark mode for column menu */
    @media (prefers-color-scheme: dark) {
      .ux-datatable__column-menu {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-datatable__column-menu {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-datatable__column-menu,
      .ux-datatable__resize-handle::after {
        transition: none;
      }
    }
  `;

  // Icons
  const icons = {
    sortAsc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>',
    sortDesc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    chevronsLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    chevronsRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>',
    empty: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    edit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    delete: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    view: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    filter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    export: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
    // View toggle icons
    viewTable: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    viewCards: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    viewList: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>',
    // Expand icons
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    expand: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    expandAll: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    collapseAll: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
    // Export icons
    download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    csv: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h2M8 17h2M14 13h2M14 17h2"/></svg>',
    excel: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13l3 4M11 13l-3 4M14 13h2v4h-2"/></svg>',
    fileText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
    // Column visibility and resize icons
    columns: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg>',
    eye: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    gripVertical: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-datatable-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-datatable-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for datatable
  // ARIA: role="table", role="rowgroup", role="row", role="columnheader", role="cell"
  const datatableComponent = (config = {}) => ({
    // Data
    columns: config.columns || [],
    rows: config.rows || [],

    // Selection
    selectable: config.selectable || false,
    selectedRows: [],
    selectAll: false,

    // Sorting
    sortable: config.sortable !== false,
    sortColumn: config.sortColumn || null,
    sortDirection: config.sortDirection || 'asc',

    // Pagination
    paginated: config.paginated !== false,
    currentPage: 1,
    perPage: config.perPage || 10,
    perPageOptions: config.perPageOptions || [10, 25, 50, 100],

    // Search
    searchable: config.searchable !== false,
    searchQuery: '',
    searchPlaceholder: config.searchPlaceholder || 'Search...',

    // Column filters
    filterable: config.filterable || false,
    columnFilters: {},
    showFilters: config.showFilters || false,

    // Bulk actions
    bulkActions: config.bulkActions || [],

    // Responsive
    responsive: config.responsive !== false,
    forceResponsive: config.forceResponsive || false,

    // View mode (table, cards)
    viewMode: config.viewMode || 'table',
    showViewToggle: config.showViewToggle || false,

    // Loading
    loading: config.loading || false,

    // Expandable rows
    expandable: config.expandable || false,
    expandedRows: [],
    expandAllState: false,
    singleExpand: config.singleExpand || false, // Only allow one row expanded at a time

    // Column resize
    resizable: config.resizable || false,
    columnWidths: config.columnWidths || {},
    minColumnWidth: config.minColumnWidth || 50,
    _resizing: false,
    _resizeColumn: null,
    _resizeStartX: 0,
    _resizeStartWidth: 0,

    // Column visibility
    hiddenColumns: config.hiddenColumns || [],
    showColumnMenu: false,

    // Empty state
    emptyTitle: config.emptyTitle || 'No data',
    emptyText: config.emptyText || 'There are no records to display.',

    // Labels (for i18n)
    labels: {
      showing: config.labels?.showing || 'Showing',
      to: config.labels?.to || 'to',
      of: config.labels?.of || 'of',
      entries: config.labels?.entries || 'entries',
      perPage: config.labels?.perPage || 'per page',
      noResults: config.labels?.noResults || 'No results found',
      viewTable: config.labels?.viewTable || 'Table view',
      viewCards: config.labels?.viewCards || 'Cards view',
      selected: config.labels?.selected || 'selected',
      clearSelection: config.labels?.clearSelection || 'Clear selection',
      clearFilters: config.labels?.clearFilters || 'Clear filters',
      filterBy: config.labels?.filterBy || 'Filter',
      all: config.labels?.all || 'All',
      columns: config.labels?.columns || 'Columns',
      showAll: config.labels?.showAll || 'Show all',
      hideAll: config.labels?.hideAll || 'Hide all',
      ...config.labels
    },

    // Component ID
    tableId: config.id || 'ux-datatable-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'table',
        'aria-label': config.ariaLabel || 'Data table',
        'aria-busy': this.loading ? 'true' : 'false'
      };
    },

    // Initialize
    init() {
      // Initialize column filters
      this.columns.forEach(col => {
        if (col.filterable !== false && this.filterable) {
          this.columnFilters[col.key] = '';
        }
      });

      // Watch for external data changes
      if (config.watchData) {
        this.$watch('rows', () => {
          this.currentPage = 1;
          this.selectedRows = [];
          this.selectAll = false;
        });
      }
    },

    // Computed: Filtered rows (search + column filters)
    get filteredRows() {
      let result = this.rows;

      // Apply global search
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(row => {
          return this.columns.some(col => {
            const value = this.getCellValue(row, col);
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(query);
          });
        });
      }

      // Apply column filters
      if (this.filterable && this.hasActiveFilters) {
        result = result.filter(row => {
          return this.columns.every(col => {
            const filterValue = this.columnFilters[col.key];
            if (!filterValue || filterValue === '') return true;

            const cellValue = this.getCellValue(row, col);
            if (cellValue === null || cellValue === undefined) return false;

            // Handle different filter types
            if (col.filterType === 'select') {
              return String(cellValue) === String(filterValue);
            } else if (col.filterType === 'date-range') {
              // filterValue should be { from: 'date', to: 'date' }
              if (typeof filterValue === 'object') {
                const date = new Date(cellValue).getTime();
                const from = filterValue.from ? new Date(filterValue.from).getTime() : -Infinity;
                const to = filterValue.to ? new Date(filterValue.to).getTime() : Infinity;
                return date >= from && date <= to;
              }
              return true;
            } else {
              // Default: text contains
              return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
            }
          });
        });
      }

      return result;
    },

    // Check if any column filter is active
    get hasActiveFilters() {
      return Object.values(this.columnFilters).some(v => {
        if (typeof v === 'object') {
          return v.from || v.to;
        }
        return v && v !== '';
      });
    },

    // Get active filters as array for display
    get activeFiltersList() {
      const filters = [];
      this.columns.forEach(col => {
        const value = this.columnFilters[col.key];
        if (value && value !== '') {
          if (typeof value === 'object' && (value.from || value.to)) {
            let label = '';
            if (value.from && value.to) {
              label = `${value.from} - ${value.to}`;
            } else if (value.from) {
              label = `>= ${value.from}`;
            } else {
              label = `<= ${value.to}`;
            }
            filters.push({ key: col.key, label: col.label, value: label });
          } else {
            filters.push({ key: col.key, label: col.label, value });
          }
        }
      });
      return filters;
    },

    // Computed: Sorted rows
    get sortedRows() {
      if (!this.sortColumn) {
        return this.filteredRows;
      }

      const col = this.columns.find(c => c.key === this.sortColumn);
      if (!col) return this.filteredRows;

      return [...this.filteredRows].sort((a, b) => {
        let valA = this.getCellValue(a, col);
        let valB = this.getCellValue(b, col);

        // Handle nulls
        if (valA === null || valA === undefined) valA = '';
        if (valB === null || valB === undefined) valB = '';

        // Numeric sort
        if (col.type === 'number') {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }
        // Date sort
        else if (col.type === 'date') {
          valA = new Date(valA).getTime() || 0;
          valB = new Date(valB).getTime() || 0;
        }
        // String sort
        else {
          valA = String(valA).toLowerCase();
          valB = String(valB).toLowerCase();
        }

        let result = 0;
        if (valA < valB) result = -1;
        if (valA > valB) result = 1;

        return this.sortDirection === 'desc' ? -result : result;
      });
    },

    // Computed: Paginated rows
    get paginatedRows() {
      if (!this.paginated) {
        return this.sortedRows;
      }

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedRows.slice(start, end);
    },

    // Computed: Total pages
    get totalPages() {
      return Math.ceil(this.sortedRows.length / this.perPage);
    },

    // Computed: Visible page numbers
    get visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      const delta = 2;

      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }

      return pages;
    },

    // Computed: Showing info text
    get showingInfo() {
      const total = this.sortedRows.length;
      if (total === 0) return '';

      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(this.currentPage * this.perPage, total);

      return `${this.labels.showing} ${start} ${this.labels.to} ${end} ${this.labels.of} ${total} ${this.labels.entries}`;
    },

    // Get cell value
    getCellValue(row, col) {
      if (col.getValue) {
        return col.getValue(row);
      }

      // Support nested keys like "user.name"
      const keys = col.key.split('.');
      let value = row;
      for (const key of keys) {
        value = value?.[key];
      }
      return value;
    },

    // Format cell value
    formatCellValue(row, col) {
      const value = this.getCellValue(row, col);

      if (col.format) {
        return col.format(value, row);
      }

      if (value === null || value === undefined) {
        return col.defaultValue || '-';
      }

      return value;
    },

    // Sort by column
    sortBy(column) {
      if (!this.sortable || !column.sortable) return;

      if (this.sortColumn === column.key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column.key;
        this.sortDirection = 'asc';
      }

      this.$dispatch('sort-change', {
        column: this.sortColumn,
        direction: this.sortDirection
      });
    },

    // Check if column is sorted
    isSorted(column) {
      return this.sortColumn === column.key;
    },

    // Go to page
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$dispatch('page-change', { page: this.currentPage });
    },

    // Change per page
    changePerPage(value) {
      this.perPage = parseInt(value);
      this.currentPage = 1;
      this.$dispatch('per-page-change', { perPage: this.perPage });
    },

    // Search
    onSearch() {
      this.currentPage = 1;
      this.$dispatch('search', { query: this.searchQuery });
    },

    // View mode
    setViewMode(mode) {
      this.viewMode = mode;
      this.$dispatch('view-mode-change', { mode });
    },

    get viewModeClass() {
      if (this.viewMode === 'cards') {
        return 'ux-datatable--force-responsive';
      }
      return this.responsive ? 'ux-datatable--responsive' : '';
    },

    // Selection
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedRows = this.paginatedRows.map(row => this.getRowId(row));
      } else {
        this.selectedRows = [];
      }
      this.$dispatch('selection-change', { selected: this.selectedRows });
    },

    toggleRowSelection(row) {
      const rowId = this.getRowId(row);
      const index = this.selectedRows.indexOf(rowId);

      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(rowId);
      }

      this.selectAll = this.selectedRows.length === this.paginatedRows.length;
      this.$dispatch('selection-change', { selected: this.selectedRows });
    },

    isRowSelected(row) {
      return this.selectedRows.includes(this.getRowId(row));
    },

    getRowId(row) {
      return row.id || row._id || JSON.stringify(row);
    },

    // Row click
    onRowClick(row, event) {
      this.$dispatch('row-click', { row, event });
    },

    // Actions
    onAction(action, row, event) {
      event.stopPropagation();
      this.$dispatch('row-action', { action, row, event });
    },

    // Column filters
    setColumnFilter(key, value) {
      this.columnFilters[key] = value;
      this.currentPage = 1;
      this.$dispatch('filter-change', { filters: this.columnFilters });
    },

    clearColumnFilter(key) {
      const col = this.columns.find(c => c.key === key);
      if (col && col.filterType === 'date-range') {
        this.columnFilters[key] = { from: '', to: '' };
      } else {
        this.columnFilters[key] = '';
      }
      this.currentPage = 1;
      this.$dispatch('filter-change', { filters: this.columnFilters });
    },

    clearAllFilters() {
      this.columns.forEach(col => {
        if (col.filterType === 'date-range') {
          this.columnFilters[col.key] = { from: '', to: '' };
        } else {
          this.columnFilters[col.key] = '';
        }
      });
      this.currentPage = 1;
      this.$dispatch('filter-change', { filters: this.columnFilters });
    },

    toggleFilters() {
      this.showFilters = !this.showFilters;
    },

    // Get unique values for select filter
    getUniqueValues(columnKey) {
      const values = new Set();
      this.rows.forEach(row => {
        const col = this.columns.find(c => c.key === columnKey);
        if (col) {
          const value = this.getCellValue(row, col);
          if (value !== null && value !== undefined && value !== '') {
            values.add(value);
          }
        }
      });
      return Array.from(values).sort();
    },

    // Bulk actions
    clearSelection() {
      this.selectedRows = [];
      this.selectAll = false;
      this.$dispatch('selection-change', { selected: this.selectedRows });
    },

    onBulkAction(action, event) {
      const selectedData = this.rows.filter(row => this.selectedRows.includes(this.getRowId(row)));
      this.$dispatch('bulk-action', {
        action,
        selectedRows: this.selectedRows,
        selectedData,
        event
      });
    },

    // Get selected rows data
    getSelectedData() {
      return this.rows.filter(row => this.selectedRows.includes(this.getRowId(row)));
    },

    // Get icons
    getIcon(name) {
      return icons[name] || '';
    },

    // Expandable rows methods
    toggleRowExpand(row, event) {
      if (event) {
        event.stopPropagation();
      }

      const rowId = this.getRowId(row);
      const index = this.expandedRows.indexOf(rowId);

      if (index > -1) {
        // Collapse
        this.expandedRows.splice(index, 1);
        this.$dispatch('row-collapse', { row, rowId });
      } else {
        // Expand
        if (this.singleExpand) {
          this.expandedRows = [rowId];
        } else {
          this.expandedRows.push(rowId);
        }
        this.$dispatch('row-expand', { row, rowId });
      }

      this.expandAllState = this.expandedRows.length === this.paginatedRows.length;
    },

    isRowExpanded(row) {
      return this.expandedRows.includes(this.getRowId(row));
    },

    expandRow(row) {
      const rowId = this.getRowId(row);
      if (!this.expandedRows.includes(rowId)) {
        if (this.singleExpand) {
          this.expandedRows = [rowId];
        } else {
          this.expandedRows.push(rowId);
        }
        this.$dispatch('row-expand', { row, rowId });
      }
    },

    collapseRow(row) {
      const rowId = this.getRowId(row);
      const index = this.expandedRows.indexOf(rowId);
      if (index > -1) {
        this.expandedRows.splice(index, 1);
        this.$dispatch('row-collapse', { row, rowId });
      }
    },

    toggleExpandAll() {
      if (this.expandAllState) {
        // Collapse all
        this.expandedRows = [];
        this.$dispatch('expand-all', { expanded: false });
      } else {
        // Expand all
        this.expandedRows = this.paginatedRows.map(row => this.getRowId(row));
        this.$dispatch('expand-all', { expanded: true });
      }
      this.expandAllState = !this.expandAllState;
    },

    expandAll() {
      this.expandedRows = this.paginatedRows.map(row => this.getRowId(row));
      this.expandAllState = true;
      this.$dispatch('expand-all', { expanded: true });
    },

    collapseAll() {
      this.expandedRows = [];
      this.expandAllState = false;
      this.$dispatch('expand-all', { expanded: false });
    },

    // Get expanded rows data
    getExpandedData() {
      return this.rows.filter(row => this.expandedRows.includes(this.getRowId(row)));
    },

    // ========================================
    // Export functionality
    // ========================================

    // Export menu state
    exportMenuOpen: false,
    exportSelectedOnly: false,
    exportVisibleColumnsOnly: true,

    // Toggle export menu
    toggleExportMenu() {
      this.exportMenuOpen = !this.exportMenuOpen;
    },

    closeExportMenu() {
      this.exportMenuOpen = false;
    },

    // Get columns to export (respects visibility)
    getExportColumns() {
      if (this.exportVisibleColumnsOnly) {
        return this.columns.filter(col => col.exportable !== false && col.visible !== false);
      }
      return this.columns.filter(col => col.exportable !== false);
    },

    // Get data to export
    getExportData(selectedOnly = false) {
      let data;
      if (selectedOnly || this.exportSelectedOnly) {
        data = this.getSelectedData();
      } else {
        // Export all filtered/sorted rows (not just current page)
        data = this.sortedRows;
      }
      return data;
    },

    // Format value for export (handles dates, numbers, etc.)
    formatExportValue(value, col, options = {}) {
      if (value === null || value === undefined) {
        return '';
      }

      // Date formatting
      if (col.type === 'date' && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          const dateFormat = options.dateFormat || 'YYYY-MM-DD';
          const pad = (n) => n.toString().padStart(2, '0');
          const year = date.getFullYear();
          const month = pad(date.getMonth() + 1);
          const day = pad(date.getDate());
          const hours = pad(date.getHours());
          const minutes = pad(date.getMinutes());
          const seconds = pad(date.getSeconds());

          return dateFormat
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
        }
      }

      // Use raw value for export (don't use format function which may add currency symbols, etc.)
      if (options.useRawValue) {
        return value;
      }

      // If column has exportFormat, use it
      if (col.exportFormat) {
        return col.exportFormat(value);
      }

      return value;
    },

    // Escape CSV value
    escapeCSV(value) {
      if (value === null || value === undefined) {
        return '';
      }
      const str = String(value);
      // If contains comma, newline, or quote, wrap in quotes and escape quotes
      if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    },

    // Export to CSV
    exportToCSV(options = {}) {
      const {
        filename = 'export',
        selectedOnly = this.exportSelectedOnly,
        dateFormat = 'YYYY-MM-DD',
        delimiter = ',',
        includeHeaders = true,
        useRawValue = true
      } = options;

      const columns = this.getExportColumns();
      const data = this.getExportData(selectedOnly);

      let csv = '';

      // Add headers
      if (includeHeaders) {
        csv += columns.map(col => this.escapeCSV(col.label || col.key)).join(delimiter) + '\n';
      }

      // Add rows
      data.forEach(row => {
        const rowValues = columns.map(col => {
          const value = this.getCellValue(row, col);
          const formatted = this.formatExportValue(value, col, { dateFormat, useRawValue });
          return this.escapeCSV(formatted);
        });
        csv += rowValues.join(delimiter) + '\n';
      });

      // Create and download file
      const timestamp = new Date().toISOString().slice(0, 10);
      const fullFilename = `${filename}_${timestamp}.csv`;
      this.downloadFile(csv, fullFilename, 'text/csv;charset=utf-8;');

      this.closeExportMenu();
      this.$dispatch('export', { type: 'csv', filename: fullFilename, rowCount: data.length });
    },

    // Export to Excel (XLSX format with basic formatting)
    exportToExcel(options = {}) {
      const {
        filename = 'export',
        selectedOnly = this.exportSelectedOnly,
        dateFormat = 'YYYY-MM-DD',
        sheetName = 'Data',
        useRawValue = true
      } = options;

      const columns = this.getExportColumns();
      const data = this.getExportData(selectedOnly);

      // Build XML for Excel (Office Open XML SpreadsheetML)
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<?mso-application progid="Excel.Sheet"?>\n';
      xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
      xml += '  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';

      // Styles
      xml += '  <Styles>\n';
      xml += '    <Style ss:ID="Header">\n';
      xml += '      <Font ss:Bold="1"/>\n';
      xml += '      <Interior ss:Color="#F3F4F6" ss:Pattern="Solid"/>\n';
      xml += '      <Borders>\n';
      xml += '        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>\n';
      xml += '      </Borders>\n';
      xml += '    </Style>\n';
      xml += '    <Style ss:ID="Date">\n';
      xml += '      <NumberFormat ss:Format="yyyy-mm-dd"/>\n';
      xml += '    </Style>\n';
      xml += '    <Style ss:ID="Number">\n';
      xml += '      <NumberFormat ss:Format="#,##0.00"/>\n';
      xml += '    </Style>\n';
      xml += '  </Styles>\n';

      // Worksheet
      xml += `  <Worksheet ss:Name="${this.escapeXML(sheetName)}">\n`;
      xml += `    <Table ss:ExpandedColumnCount="${columns.length}" ss:ExpandedRowCount="${data.length + 1}">\n`;

      // Column widths
      columns.forEach(col => {
        const width = col.exportWidth || 100;
        xml += `      <Column ss:Width="${width}"/>\n`;
      });

      // Header row
      xml += '      <Row>\n';
      columns.forEach(col => {
        xml += `        <Cell ss:StyleID="Header"><Data ss:Type="String">${this.escapeXML(col.label || col.key)}</Data></Cell>\n`;
      });
      xml += '      </Row>\n';

      // Data rows
      data.forEach(row => {
        xml += '      <Row>\n';
        columns.forEach(col => {
          const value = this.getCellValue(row, col);
          const formatted = this.formatExportValue(value, col, { dateFormat, useRawValue });

          let type = 'String';
          let style = '';

          if (col.type === 'number' && typeof value === 'number') {
            type = 'Number';
            style = ' ss:StyleID="Number"';
          } else if (col.type === 'date' && value) {
            type = 'String';
            style = ' ss:StyleID="Date"';
          }

          xml += `        <Cell${style}><Data ss:Type="${type}">${this.escapeXML(String(formatted))}</Data></Cell>\n`;
        });
        xml += '      </Row>\n';
      });

      xml += '    </Table>\n';
      xml += '  </Worksheet>\n';
      xml += '</Workbook>';

      // Create and download file
      const timestamp = new Date().toISOString().slice(0, 10);
      const fullFilename = `${filename}_${timestamp}.xls`;
      this.downloadFile(xml, fullFilename, 'application/vnd.ms-excel');

      this.closeExportMenu();
      this.$dispatch('export', { type: 'excel', filename: fullFilename, rowCount: data.length });
    },

    // Escape XML special characters
    escapeXML(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    },

    // Download file helper
    downloadFile(content, filename, mimeType) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    // Quick export methods (for direct button binding)
    quickExportCSV() {
      this.exportToCSV({ selectedOnly: this.selectedRows.length > 0 });
    },

    quickExportExcel() {
      this.exportToExcel({ selectedOnly: this.selectedRows.length > 0 });
    },

    // ========================================
    // Column Resize functionality
    // ========================================

    // Get column width style
    getColumnWidth(col) {
      if (this.columnWidths[col.key]) {
        return this.columnWidths[col.key] + 'px';
      }
      if (col.width) {
        return typeof col.width === 'number' ? col.width + 'px' : col.width;
      }
      return 'auto';
    },

    // Set column width
    setColumnWidth(colKey, width) {
      const minWidth = this.minColumnWidth;
      const newWidth = Math.max(width, minWidth);
      this.columnWidths[colKey] = newWidth;
      this.$dispatch('column-resize', { column: colKey, width: newWidth });
    },

    // Start resizing column
    startResize(col, event) {
      if (!this.resizable) return;

      event.preventDefault();
      event.stopPropagation();

      this._resizing = true;
      this._resizeColumn = col.key;

      // Get current width
      const th = event.target.closest('.ux-datatable__th');
      this._resizeStartWidth = th ? th.offsetWidth : 100;
      this._resizeStartX = event.clientX || (event.touches && event.touches[0].clientX);

      // Add event listeners
      this._resizeMove = this._handleResizeMove.bind(this);
      this._resizeEnd = this._handleResizeEnd.bind(this);

      document.addEventListener('mousemove', this._resizeMove);
      document.addEventListener('mouseup', this._resizeEnd);
      document.addEventListener('touchmove', this._resizeMove, { passive: false });
      document.addEventListener('touchend', this._resizeEnd);

      // Add resizing class to datatable
      this.$el.classList.add('ux-datatable--resizing');
    },

    // Handle resize move
    _handleResizeMove(event) {
      if (!this._resizing) return;

      event.preventDefault();

      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const diff = clientX - this._resizeStartX;
      const newWidth = this._resizeStartWidth + diff;

      this.setColumnWidth(this._resizeColumn, newWidth);
    },

    // Handle resize end
    _handleResizeEnd() {
      this._resizing = false;
      this._resizeColumn = null;

      document.removeEventListener('mousemove', this._resizeMove);
      document.removeEventListener('mouseup', this._resizeEnd);
      document.removeEventListener('touchmove', this._resizeMove);
      document.removeEventListener('touchend', this._resizeEnd);

      this.$el.classList.remove('ux-datatable--resizing');
    },

    // Check if column is being resized
    isColumnResizing(col) {
      return this._resizing && this._resizeColumn === col.key;
    },

    // Reset column width
    resetColumnWidth(colKey) {
      delete this.columnWidths[colKey];
      this.$dispatch('column-resize', { column: colKey, width: null });
    },

    // Reset all column widths
    resetAllColumnWidths() {
      this.columnWidths = {};
      this.$dispatch('column-resize-reset');
    },

    // ========================================
    // Column Visibility functionality
    // ========================================

    // Toggle column visibility menu
    toggleColumnMenu() {
      this.showColumnMenu = !this.showColumnMenu;
    },

    // Close column visibility menu
    closeColumnMenu() {
      this.showColumnMenu = false;
    },

    // Check if column is visible
    isColumnVisible(col) {
      return !this.hiddenColumns.includes(col.key);
    },

    // Toggle column visibility
    toggleColumnVisibility(col) {
      const index = this.hiddenColumns.indexOf(col.key);
      if (index > -1) {
        // Show column
        this.hiddenColumns.splice(index, 1);
        this.$dispatch('column-show', { column: col.key });
      } else {
        // Hide column (ensure at least one column remains visible)
        const visibleCount = this.columns.filter(c => !this.hiddenColumns.includes(c.key)).length;
        if (visibleCount > 1) {
          this.hiddenColumns.push(col.key);
          this.$dispatch('column-hide', { column: col.key });
        }
      }
      this.$dispatch('column-visibility-change', { hiddenColumns: [...this.hiddenColumns] });
    },

    // Show column
    showColumn(colKey) {
      const index = this.hiddenColumns.indexOf(colKey);
      if (index > -1) {
        this.hiddenColumns.splice(index, 1);
        this.$dispatch('column-show', { column: colKey });
        this.$dispatch('column-visibility-change', { hiddenColumns: [...this.hiddenColumns] });
      }
    },

    // Hide column
    hideColumn(colKey) {
      if (!this.hiddenColumns.includes(colKey)) {
        // Ensure at least one column remains visible
        const visibleCount = this.columns.filter(c => !this.hiddenColumns.includes(c.key)).length;
        if (visibleCount > 1) {
          this.hiddenColumns.push(colKey);
          this.$dispatch('column-hide', { column: colKey });
          this.$dispatch('column-visibility-change', { hiddenColumns: [...this.hiddenColumns] });
        }
      }
    },

    // Show all columns
    showAllColumns() {
      this.hiddenColumns = [];
      this.$dispatch('column-visibility-change', { hiddenColumns: [] });
    },

    // Hide all columns except first
    hideAllColumns() {
      // Keep at least the first column visible
      const firstCol = this.columns[0];
      this.hiddenColumns = this.columns
        .filter(col => col.key !== firstCol?.key)
        .map(col => col.key);
      this.$dispatch('column-visibility-change', { hiddenColumns: [...this.hiddenColumns] });
    },

    // Get visible columns
    get visibleColumns() {
      return this.columns.filter(col => this.isColumnVisible(col));
    },

    // Get hidden columns count
    get hiddenColumnsCount() {
      return this.hiddenColumns.length;
    },

    // Check if can hide column (at least one must remain)
    canHideColumn(col) {
      const visibleCount = this.columns.filter(c => !this.hiddenColumns.includes(c.key)).length;
      return visibleCount > 1 || this.hiddenColumns.includes(col.key);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDatatable', datatableComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDatatable', datatableComponent);
    });
  }
})();
