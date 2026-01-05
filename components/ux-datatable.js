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
    // View toggle icons
    viewTable: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    viewCards: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    viewList: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>'
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

    // Responsive
    responsive: config.responsive !== false,
    forceResponsive: config.forceResponsive || false,

    // View mode (table, cards)
    viewMode: config.viewMode || 'table',
    showViewToggle: config.showViewToggle || false,

    // Loading
    loading: config.loading || false,

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
      // Watch for external data changes
      if (config.watchData) {
        this.$watch('rows', () => {
          this.currentPage = 1;
          this.selectedRows = [];
          this.selectAll = false;
        });
      }
    },

    // Computed: Filtered rows (search)
    get filteredRows() {
      if (!this.searchQuery.trim()) {
        return this.rows;
      }

      const query = this.searchQuery.toLowerCase().trim();
      return this.rows.filter(row => {
        return this.columns.some(col => {
          const value = this.getCellValue(row, col);
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(query);
        });
      });
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

    // Get icons
    getIcon(name) {
      return icons[name] || '';
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
