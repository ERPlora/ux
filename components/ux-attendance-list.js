/**
 * UX Attendance List Component
 * Employee attendance tracking with status indicators, clock times, and summary stats
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Attendance List - Employee Attendance Tracking
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* Attendance List Tokens */
      --ux-attendance-border-radius: var(--ux-border-radius-lg);
      --ux-attendance-item-padding: var(--ux-space-md) var(--ux-space-lg);
      --ux-attendance-item-gap: var(--ux-space-md);
      --ux-attendance-avatar-size: 44px;
      --ux-attendance-status-size: 10px;

      /* Status Colors */
      --ux-attendance-present: var(--ux-success);
      --ux-attendance-present-bg: rgba(var(--ux-success-rgb), 0.1);
      --ux-attendance-absent: var(--ux-danger);
      --ux-attendance-absent-bg: rgba(var(--ux-danger-rgb), 0.1);
      --ux-attendance-late: var(--ux-warning);
      --ux-attendance-late-bg: rgba(var(--ux-warning-rgb), 0.1);
      --ux-attendance-leave: var(--ux-info, var(--ux-primary));
      --ux-attendance-leave-bg: rgba(var(--ux-info-rgb, var(--ux-primary-rgb)), 0.1);
      --ux-attendance-remote: var(--ux-secondary);
      --ux-attendance-remote-bg: rgba(var(--ux-secondary-rgb), 0.1);
    }

    /* ==========================================================================
       Attendance List Container
       ========================================================================== */

    .ux-attendance-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: var(--ux-surface);
      border-radius: var(--ux-attendance-border-radius);
      border: 1px solid var(--ux-border-color);
      overflow: hidden;
    }

    .ux-attendance-list--inset {
      margin: var(--ux-space-lg);
    }

    /* ==========================================================================
       Attendance List Header
       ========================================================================== */

    .ux-attendance-list__header {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      padding: var(--ux-space-lg);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-attendance-list__header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      flex-wrap: wrap;
    }

    .ux-attendance-list__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-attendance-list__date {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-attendance-list__date-input {
      padding: var(--ux-space-sm) var(--ux-space-md);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-attendance-list__date-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    /* ==========================================================================
       Attendance Summary Stats
       ========================================================================== */

    .ux-attendance-list__summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-attendance-list__stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: var(--ux-space-sm);
      background: var(--ux-surface);
      border-radius: var(--ux-border-radius);
      text-align: center;
    }

    .ux-attendance-list__stat-value {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-attendance-list__stat-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Stat colors */
    .ux-attendance-list__stat--present .ux-attendance-list__stat-value { color: var(--ux-attendance-present); }
    .ux-attendance-list__stat--absent .ux-attendance-list__stat-value { color: var(--ux-attendance-absent); }
    .ux-attendance-list__stat--late .ux-attendance-list__stat-value { color: var(--ux-attendance-late); }
    .ux-attendance-list__stat--leave .ux-attendance-list__stat-value { color: var(--ux-attendance-leave); }
    .ux-attendance-list__stat--remote .ux-attendance-list__stat-value { color: var(--ux-attendance-remote); }

    /* ==========================================================================
       Attendance Toolbar (Search & Filter)
       ========================================================================== */

    .ux-attendance-list__toolbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-wrap: wrap;
    }

    .ux-attendance-list__search {
      flex: 1;
      min-width: 200px;
      position: relative;
    }

    .ux-attendance-list__search-input {
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      padding-left: 36px;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      background: var(--ux-surface-secondary);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      transition: border-color var(--ux-transition-fast) var(--ux-ease),
                  background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-attendance-list__search-input:focus {
      outline: none;
      border-color: var(--ux-primary);
      background: var(--ux-surface);
    }

    .ux-attendance-list__search-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-attendance-list__search-icon {
      position: absolute;
      left: var(--ux-space-sm);
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    .ux-attendance-list__filter {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-attendance-list__filter-btn {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-pill);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-attendance-list__filter-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-text-tertiary);
    }

    .ux-attendance-list__filter-btn--active {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-attendance-list__filter-btn--active:hover {
      background: var(--ux-primary-shade);
      border-color: var(--ux-primary-shade);
    }

    /* Status-specific filter buttons */
    .ux-attendance-list__filter-btn--present.ux-attendance-list__filter-btn--active {
      background: var(--ux-attendance-present);
      border-color: var(--ux-attendance-present);
    }
    .ux-attendance-list__filter-btn--absent.ux-attendance-list__filter-btn--active {
      background: var(--ux-attendance-absent);
      border-color: var(--ux-attendance-absent);
    }
    .ux-attendance-list__filter-btn--late.ux-attendance-list__filter-btn--active {
      background: var(--ux-attendance-late);
      border-color: var(--ux-attendance-late);
    }
    .ux-attendance-list__filter-btn--leave.ux-attendance-list__filter-btn--active {
      background: var(--ux-attendance-leave);
      border-color: var(--ux-attendance-leave);
    }
    .ux-attendance-list__filter-btn--remote.ux-attendance-list__filter-btn--active {
      background: var(--ux-attendance-remote);
      border-color: var(--ux-attendance-remote);
    }

    /* ==========================================================================
       Attendance List Body
       ========================================================================== */

    .ux-attendance-list__body {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-attendance-list__body--fixed-height {
      max-height: 400px;
    }

    /* ==========================================================================
       Attendance Item
       ========================================================================== */

    .ux-attendance-list__item {
      display: flex;
      align-items: center;
      gap: var(--ux-attendance-item-gap);
      padding: var(--ux-attendance-item-padding);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-attendance-list__item:last-child {
      border-bottom: none;
    }

    .ux-attendance-list__item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-attendance-list__item--clickable {
      cursor: pointer;
    }

    .ux-attendance-list__item--clickable:active {
      background: var(--ux-surface-tertiary);
    }

    /* ==========================================================================
       Employee Avatar & Info
       ========================================================================== */

    .ux-attendance-list__avatar {
      position: relative;
      width: var(--ux-attendance-avatar-size);
      height: var(--ux-attendance-avatar-size);
      flex-shrink: 0;
    }

    .ux-attendance-list__avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      background: var(--ux-surface-secondary);
    }

    .ux-attendance-list__avatar-initials {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      font-size: calc(var(--ux-attendance-avatar-size) * 0.38);
      font-weight: 600;
    }

    .ux-attendance-list__info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-attendance-list__name {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-attendance-list__department {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ==========================================================================
       Attendance Status Badge
       ========================================================================== */

    .ux-attendance-list__status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--ux-border-radius-pill);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }

    .ux-attendance-list__status-dot {
      width: var(--ux-attendance-status-size);
      height: var(--ux-attendance-status-size);
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* Present */
    .ux-attendance-list__status--present {
      background: var(--ux-attendance-present-bg);
      color: var(--ux-attendance-present);
    }
    .ux-attendance-list__status--present .ux-attendance-list__status-dot {
      background: var(--ux-attendance-present);
    }

    /* Absent */
    .ux-attendance-list__status--absent {
      background: var(--ux-attendance-absent-bg);
      color: var(--ux-attendance-absent);
    }
    .ux-attendance-list__status--absent .ux-attendance-list__status-dot {
      background: var(--ux-attendance-absent);
    }

    /* Late */
    .ux-attendance-list__status--late {
      background: var(--ux-attendance-late-bg);
      color: var(--ux-attendance-late);
    }
    .ux-attendance-list__status--late .ux-attendance-list__status-dot {
      background: var(--ux-attendance-late);
    }

    /* On Leave */
    .ux-attendance-list__status--leave {
      background: var(--ux-attendance-leave-bg);
      color: var(--ux-attendance-leave);
    }
    .ux-attendance-list__status--leave .ux-attendance-list__status-dot {
      background: var(--ux-attendance-leave);
    }

    /* Remote */
    .ux-attendance-list__status--remote {
      background: var(--ux-attendance-remote-bg);
      color: var(--ux-attendance-remote);
    }
    .ux-attendance-list__status--remote .ux-attendance-list__status-dot {
      background: var(--ux-attendance-remote);
    }

    /* ==========================================================================
       Clock Times & Work Hours
       ========================================================================== */

    .ux-attendance-list__times {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }

    .ux-attendance-list__clock {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-attendance-list__clock-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      min-width: 32px;
    }

    .ux-attendance-list__clock-time {
      font-weight: 500;
      min-width: 50px;
      text-align: right;
    }

    .ux-attendance-list__clock-time--late {
      color: var(--ux-attendance-late);
    }

    .ux-attendance-list__work-hours {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      font-variant-numeric: tabular-nums;
    }

    .ux-attendance-list__work-hours--over {
      color: var(--ux-success);
    }

    .ux-attendance-list__work-hours--under {
      color: var(--ux-warning);
    }

    /* ==========================================================================
       Compact Time Display (Alternative Layout)
       ========================================================================== */

    .ux-attendance-list__times--compact {
      flex-direction: row;
      gap: var(--ux-space-md);
      align-items: center;
    }

    .ux-attendance-list__times--compact .ux-attendance-list__clock {
      flex-direction: column;
      gap: 0;
      align-items: center;
    }

    .ux-attendance-list__times--compact .ux-attendance-list__clock-label {
      order: 1;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-attendance-list__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl) var(--ux-space-lg);
      text-align: center;
    }

    .ux-attendance-list__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-attendance-list__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-attendance-list__empty-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ==========================================================================
       Footer / Pagination
       ========================================================================== */

    .ux-attendance-list__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-attendance-list--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-attendance-list--glass .ux-attendance-list__header,
    .ux-attendance-list--glass .ux-attendance-list__toolbar,
    .ux-attendance-list--glass .ux-attendance-list__item {
      background: transparent;
    }

    .ux-attendance-list--glass .ux-attendance-list__summary {
      background: var(--ux-glass-bg-thin);
    }

    .ux-attendance-list--glass .ux-attendance-list__stat {
      background: var(--ux-glass-bg);
    }

    .ux-attendance-list--glass .ux-attendance-list__item:hover {
      background: var(--ux-glass-bg-thin);
    }

    .ux-attendance-list--glass .ux-attendance-list__footer {
      background: var(--ux-glass-bg-thin);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    /* Compact size */
    .ux-attendance-list--compact .ux-attendance-list__item {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-attendance-list--compact .ux-attendance-list__avatar {
      --ux-attendance-avatar-size: 36px;
    }

    .ux-attendance-list--compact .ux-attendance-list__name {
      font-size: var(--ux-font-size-sm);
    }

    .ux-attendance-list--compact .ux-attendance-list__department {
      font-size: var(--ux-font-size-xs);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-attendance-list__header-row {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-attendance-list__summary {
        grid-template-columns: repeat(3, 1fr);
      }

      .ux-attendance-list__toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-attendance-list__search {
        min-width: 100%;
      }

      .ux-attendance-list__filter {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin: 0 calc(var(--ux-space-lg) * -1);
        padding: 0 var(--ux-space-lg);
      }

      .ux-attendance-list__filter::-webkit-scrollbar {
        display: none;
      }

      .ux-attendance-list__item {
        flex-wrap: wrap;
      }

      .ux-attendance-list__times {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--ux-space-sm);
        padding-top: var(--ux-space-sm);
        border-top: 1px dashed var(--ux-border-color);
      }

      .ux-attendance-list__footer {
        flex-direction: column;
        gap: var(--ux-space-sm);
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .ux-attendance-list__summary {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-attendance-present-bg: rgba(var(--ux-success-rgb), 0.15);
        --ux-attendance-absent-bg: rgba(var(--ux-danger-rgb), 0.15);
        --ux-attendance-late-bg: rgba(var(--ux-warning-rgb), 0.15);
        --ux-attendance-leave-bg: rgba(var(--ux-info-rgb, var(--ux-primary-rgb)), 0.15);
        --ux-attendance-remote-bg: rgba(var(--ux-secondary-rgb), 0.15);
      }
    }

    .ux-dark {
      --ux-attendance-present-bg: rgba(var(--ux-success-rgb), 0.15);
      --ux-attendance-absent-bg: rgba(var(--ux-danger-rgb), 0.15);
      --ux-attendance-late-bg: rgba(var(--ux-warning-rgb), 0.15);
      --ux-attendance-leave-bg: rgba(var(--ux-info-rgb, var(--ux-primary-rgb)), 0.15);
      --ux-attendance-remote-bg: rgba(var(--ux-secondary-rgb), 0.15);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-attendance-list__item,
      .ux-attendance-list__filter-btn,
      .ux-attendance-list__search-input,
      .ux-attendance-list__date-input {
        transition: none;
      }
    }

    /* ==========================================================================
       Print Styles
       ========================================================================== */

    @media print {
      .ux-attendance-list {
        border: 1px solid #ccc;
        box-shadow: none;
      }

      .ux-attendance-list__toolbar {
        display: none;
      }

      .ux-attendance-list__item {
        break-inside: avoid;
      }

      .ux-attendance-list--glass {
        background: white;
        backdrop-filter: none;
      }
    }
  `;

  // Icons
  const icons = {
    search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    empty: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/><path d="M22 22L2 2" stroke-width="2"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-attendance-list-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-attendance-list-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Status labels for i18n
  const defaultLabels = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    leave: 'On Leave',
    remote: 'Remote',
    all: 'All',
    clockIn: 'In',
    clockOut: 'Out',
    workHours: 'Hours',
    search: 'Search employees...',
    noResults: 'No employees found',
    noResultsText: 'Try adjusting your search or filter criteria.',
    total: 'Total',
    showing: 'Showing',
    of: 'of',
    employees: 'employees'
  };

  // Alpine.js component
  const attendanceListComponent = (config = {}) => ({
    // Data
    employees: config.employees || [],
    selectedDate: config.selectedDate || new Date().toISOString().split('T')[0],

    // Filters
    filterStatus: config.filterStatus || 'all',
    searchQuery: '',

    // Config
    showSummary: config.showSummary !== false,
    showSearch: config.showSearch !== false,
    showFilter: config.showFilter !== false,
    showDateSelector: config.showDateSelector !== false,
    clickable: config.clickable || false,
    compactTimes: config.compactTimes || false,

    // Work day config (for calculations)
    workDayStart: config.workDayStart || '09:00',
    workDayEnd: config.workDayEnd || '18:00',
    standardHours: config.standardHours || 8,

    // Labels (for i18n)
    labels: { ...defaultLabels, ...config.labels },

    // Initialize
    init() {
      // Watch for date changes
      this.$watch('selectedDate', () => {
        this.$dispatch('date-change', { date: this.selectedDate });
      });
    },

    // Computed: Filtered employees
    get filteredEmployees() {
      let result = this.employees;

      // Filter by status
      if (this.filterStatus !== 'all') {
        result = result.filter(emp => emp.status === this.filterStatus);
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(emp => {
          const name = (emp.name || '').toLowerCase();
          const department = (emp.department || '').toLowerCase();
          const id = (emp.id || emp.employeeId || '').toString().toLowerCase();
          return name.includes(query) || department.includes(query) || id.includes(query);
        });
      }

      return result;
    },

    // Computed: Summary statistics
    get summaryStats() {
      const stats = {
        total: this.employees.length,
        present: 0,
        absent: 0,
        late: 0,
        leave: 0,
        remote: 0
      };

      this.employees.forEach(emp => {
        if (stats.hasOwnProperty(emp.status)) {
          stats[emp.status]++;
        }
      });

      return stats;
    },

    // Get employee initials
    getInitials(name) {
      if (!name) return '??';
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    },

    // Calculate work hours from clock in/out
    calculateWorkHours(employee) {
      if (!employee.clockIn || !employee.clockOut) return null;

      const [inHours, inMins] = employee.clockIn.split(':').map(Number);
      const [outHours, outMins] = employee.clockOut.split(':').map(Number);

      const inMinutes = inHours * 60 + inMins;
      const outMinutes = outHours * 60 + outMins;

      const totalMinutes = outMinutes - inMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;

      return {
        hours,
        minutes: mins,
        total: totalMinutes / 60,
        formatted: `${hours}h ${mins}m`
      };
    },

    // Check if clock-in is late
    isLateClockIn(clockIn) {
      if (!clockIn || !this.workDayStart) return false;

      const [inHours, inMins] = clockIn.split(':').map(Number);
      const [startHours, startMins] = this.workDayStart.split(':').map(Number);

      const inMinutes = inHours * 60 + inMins;
      const startMinutes = startHours * 60 + startMins;

      return inMinutes > startMinutes;
    },

    // Format time display
    formatTime(time) {
      if (!time) return '--:--';
      return time;
    },

    // Get work hours class
    getWorkHoursClass(employee) {
      const workHours = this.calculateWorkHours(employee);
      if (!workHours) return '';

      if (workHours.total >= this.standardHours) {
        return 'ux-attendance-list__work-hours--over';
      } else if (workHours.total < this.standardHours - 1) {
        return 'ux-attendance-list__work-hours--under';
      }
      return '';
    },

    // Set filter status
    setFilter(status) {
      this.filterStatus = status;
      this.$dispatch('filter-change', { status });
    },

    // Handle search
    onSearch() {
      this.$dispatch('search', { query: this.searchQuery });
    },

    // Handle employee click
    onEmployeeClick(employee) {
      if (this.clickable) {
        this.$dispatch('employee-click', { employee });
      }
    },

    // Handle date change
    onDateChange() {
      this.$dispatch('date-change', { date: this.selectedDate });
    },

    // Get status label
    getStatusLabel(status) {
      return this.labels[status] || status;
    },

    // Get icon
    getIcon(name) {
      return icons[name] || '';
    },

    // Set employees data (for external updates)
    setEmployees(data) {
      this.employees = data;
    },

    // Update employee status
    updateEmployeeStatus(employeeId, status, clockIn, clockOut) {
      const employee = this.employees.find(emp => emp.id === employeeId || emp.employeeId === employeeId);
      if (employee) {
        employee.status = status;
        if (clockIn !== undefined) employee.clockIn = clockIn;
        if (clockOut !== undefined) employee.clockOut = clockOut;
        this.$dispatch('employee-update', { employee });
      }
    },

    // Refresh data (trigger load event)
    refresh() {
      this.$dispatch('refresh', { date: this.selectedDate });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxAttendanceList', attendanceListComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAttendanceList', attendanceListComponent);
    });
  }

  // Export icons for external use
  window.UXAttendanceIcons = icons;
})();
