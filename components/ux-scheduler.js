/**
 * UX Scheduler Component
 * Booking and appointment scheduler with day/week/month views and resource columns
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Scheduler - Variables
    ======================================== */

    :root {
      --ux-scheduler-hour-height: 60px;
      --ux-scheduler-time-width: 60px;
      --ux-scheduler-header-height: 80px;
      --ux-scheduler-resource-width: 200px;
      --ux-scheduler-slot-min-height: 15px;
    }

    /* ========================================
       UX Scheduler - Base
    ======================================== */

    .ux-scheduler {
      font-family: var(--ux-font-family);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-scheduler__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .ux-scheduler__nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ux-scheduler__nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-scheduler__nav-btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-scheduler__nav-btn:active {
      transform: scale(0.95);
    }

    .ux-scheduler__nav-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-scheduler__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-scheduler__today-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: 1px solid var(--ux-primary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-scheduler__today-btn:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-scheduler__view-toggle {
      display: flex;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      padding: 0.25rem;
    }

    .ux-scheduler__view-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-scheduler__view-btn:hover {
      color: var(--ux-text);
    }

    .ux-scheduler__view-btn--active {
      background: var(--ux-surface);
      color: var(--ux-text);
      box-shadow: var(--ux-shadow-sm);
    }

    /* ========================================
       Resource Headers (for week view with resources)
    ======================================== */

    .ux-scheduler__resources-header {
      display: flex;
      border-bottom: 1px solid var(--ux-border-color);
      position: sticky;
      top: 0;
      background: var(--ux-surface);
      z-index: 15;
    }

    .ux-scheduler__resources-corner {
      width: var(--ux-scheduler-time-width);
      min-width: var(--ux-scheduler-time-width);
      border-right: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-scheduler__resource-header {
      flex: 1;
      min-width: var(--ux-scheduler-resource-width);
      padding: 0.75rem;
      text-align: center;
      border-right: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-scheduler__resource-header:last-child {
      border-right: none;
    }

    .ux-scheduler__resource-name {
      font-weight: 600;
      color: var(--ux-text);
      font-size: 0.875rem;
    }

    .ux-scheduler__resource-info {
      font-size: 0.75rem;
      color: var(--ux-text-secondary);
      margin-top: 0.25rem;
    }

    .ux-scheduler__resource-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: 0 auto 0.5rem;
      background: var(--ux-surface-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--ux-text-secondary);
      font-size: 0.75rem;
    }

    .ux-scheduler__resource-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    /* ========================================
       Day Headers
    ======================================== */

    .ux-scheduler__day-headers {
      display: flex;
      border-bottom: 1px solid var(--ux-border-color);
      position: sticky;
      top: 0;
      background: var(--ux-surface);
      z-index: 10;
    }

    .ux-scheduler__corner {
      width: var(--ux-scheduler-time-width);
      min-width: var(--ux-scheduler-time-width);
      border-right: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-scheduler__day-header {
      flex: 1;
      min-width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 0.5rem;
      text-align: center;
      border-right: 1px solid var(--ux-border-color);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-scheduler__day-header:last-child {
      border-right: none;
    }

    .ux-scheduler__day-header:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-scheduler__day-name {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .ux-scheduler__day-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      font-size: 1rem;
      font-weight: 600;
      color: var(--ux-text);
      border-radius: var(--ux-radius-full);
    }

    .ux-scheduler__day-header--today .ux-scheduler__day-number {
      background: var(--ux-primary);
      color: white;
    }

    .ux-scheduler__day-header--selected {
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-scheduler__day-header--weekend {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Grid Container
    ======================================== */

    .ux-scheduler__body {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .ux-scheduler__grid {
      display: flex;
      position: relative;
      min-height: calc(var(--ux-scheduler-hour-height) * 24);
    }

    /* ========================================
       Time Column
    ======================================== */

    .ux-scheduler__times {
      width: var(--ux-scheduler-time-width);
      min-width: var(--ux-scheduler-time-width);
      border-right: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      position: sticky;
      left: 0;
      background: var(--ux-surface);
      z-index: 5;
    }

    .ux-scheduler__time {
      height: var(--ux-scheduler-hour-height);
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 0 0.5rem;
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
      transform: translateY(-0.5em);
    }

    /* ========================================
       Day Columns
    ======================================== */

    .ux-scheduler__columns {
      display: flex;
      flex: 1;
    }

    .ux-scheduler__day-column {
      flex: 1;
      min-width: 100px;
      position: relative;
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-scheduler__day-column:last-child {
      border-right: none;
    }

    .ux-scheduler__day-column--weekend {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Hour Slots
    ======================================== */

    .ux-scheduler__hour-slot {
      height: var(--ux-scheduler-hour-height);
      border-bottom: 1px solid var(--ux-border-color);
      position: relative;
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-scheduler__hour-slot:hover {
      background: rgba(var(--ux-primary-rgb), 0.03);
    }

    .ux-scheduler__hour-slot:last-child {
      border-bottom: none;
    }

    /* Half hour line */
    .ux-scheduler__hour-slot::after {
      content: '';
      display: block;
      height: 50%;
      border-bottom: 1px dashed var(--ux-gray-100);
    }

    /* Quarter hour lines for 15min intervals */
    .ux-scheduler--interval-15 .ux-scheduler__hour-slot::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 25%;
      border-bottom: 1px dotted var(--ux-gray-100);
    }

    .ux-scheduler--interval-15 .ux-scheduler__hour-slot::after {
      position: absolute;
      left: 0;
      right: 0;
      top: 75%;
      height: auto;
      border-bottom: 1px dotted var(--ux-gray-100);
    }

    /* Business hours */
    .ux-scheduler__hour-slot--business {
      background: var(--ux-surface);
    }

    .ux-scheduler__hour-slot--non-business {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Current Time Indicator
    ======================================== */

    .ux-scheduler__now-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--ux-danger);
      z-index: 8;
      pointer-events: none;
    }

    .ux-scheduler__now-line::before {
      content: '';
      position: absolute;
      left: -5px;
      top: -4px;
      width: 10px;
      height: 10px;
      background: var(--ux-danger);
      border-radius: 50%;
    }

    /* ========================================
       Bookings / Events
    ======================================== */

    .ux-scheduler__booking {
      position: absolute;
      left: 2px;
      right: 2px;
      padding: 0.25rem 0.5rem;
      border-radius: var(--ux-radius-sm);
      font-size: 0.75rem;
      overflow: hidden;
      cursor: pointer;
      z-index: 2;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      border-left: 3px solid;
      min-height: 20px;
    }

    .ux-scheduler__booking:hover {
      z-index: 3;
      box-shadow: var(--ux-shadow-md);
      transform: scale(1.02);
    }

    .ux-scheduler__booking:active {
      transform: scale(0.98);
    }

    .ux-scheduler__booking-title {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }

    .ux-scheduler__booking-time {
      font-size: 0.6875rem;
      opacity: 0.85;
      margin-top: 1px;
    }

    .ux-scheduler__booking-resource {
      font-size: 0.6875rem;
      opacity: 0.7;
      margin-top: 2px;
    }

    /* Booking Status Colors */
    .ux-scheduler__booking--confirmed {
      background: rgba(var(--ux-success-rgb), 0.9);
      color: white;
      border-left-color: var(--ux-green-600);
    }

    .ux-scheduler__booking--pending {
      background: rgba(var(--ux-warning-rgb), 0.9);
      color: var(--ux-gray-900);
      border-left-color: var(--ux-yellow-600);
    }

    .ux-scheduler__booking--cancelled {
      background: rgba(var(--ux-gray-400-rgb, 156, 163, 175), 0.5);
      color: var(--ux-text-secondary);
      border-left-color: var(--ux-gray-500);
      text-decoration: line-through;
      opacity: 0.7;
    }

    .ux-scheduler__booking--blocked {
      background: var(--ux-gray-200);
      color: var(--ux-text-secondary);
      border-left-color: var(--ux-gray-400);
      cursor: not-allowed;
    }

    .ux-scheduler__booking--primary {
      background: rgba(var(--ux-primary-rgb), 0.9);
      color: white;
      border-left-color: var(--ux-primary-shade);
    }

    .ux-scheduler__booking--danger {
      background: rgba(var(--ux-danger-rgb), 0.9);
      color: white;
      border-left-color: var(--ux-red-600);
    }

    /* Conflict indicator */
    .ux-scheduler__booking--conflict {
      box-shadow: 0 0 0 2px var(--ux-danger), inset 0 0 0 1px rgba(255,255,255,0.3);
    }

    .ux-scheduler__booking--conflict::after {
      content: '!';
      position: absolute;
      top: 2px;
      right: 4px;
      width: 14px;
      height: 14px;
      background: var(--ux-danger);
      color: white;
      border-radius: 50%;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       Drag to Create
    ======================================== */

    .ux-scheduler__drag-preview {
      position: absolute;
      left: 4px;
      right: 4px;
      background: rgba(var(--ux-primary-rgb), 0.3);
      border: 2px dashed var(--ux-primary);
      border-radius: var(--ux-radius-sm);
      z-index: 6;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-primary);
    }

    /* ========================================
       Month View
    ======================================== */

    .ux-scheduler__month-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-scheduler__month-header {
      padding: 0.75rem;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      background: var(--ux-surface-secondary);
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-scheduler__month-header:last-child {
      border-right: none;
    }

    .ux-scheduler__month-day {
      min-height: 100px;
      padding: 0.5rem;
      border-right: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-scheduler__month-day:nth-child(7n) {
      border-right: none;
    }

    .ux-scheduler__month-day:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-scheduler__month-day--other {
      background: var(--ux-surface-secondary);
      opacity: 0.5;
    }

    .ux-scheduler__month-day--today {
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-scheduler__month-day--weekend {
      background: var(--ux-surface-secondary);
    }

    .ux-scheduler__month-day-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text);
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }

    .ux-scheduler__month-day--today .ux-scheduler__month-day-number {
      background: var(--ux-primary);
      color: white;
    }

    .ux-scheduler__month-booking {
      padding: 2px 6px;
      margin-bottom: 2px;
      border-radius: var(--ux-radius-sm);
      font-size: 0.6875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .ux-scheduler__month-booking--confirmed {
      background: rgba(var(--ux-success-rgb), 0.2);
      color: var(--ux-green-700);
    }

    .ux-scheduler__month-booking--pending {
      background: rgba(var(--ux-warning-rgb), 0.2);
      color: var(--ux-amber-700);
    }

    .ux-scheduler__month-more {
      font-size: 0.6875rem;
      color: var(--ux-primary);
      cursor: pointer;
      padding: 2px 6px;
    }

    .ux-scheduler__month-more:hover {
      text-decoration: underline;
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-scheduler__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-scheduler__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-scheduler--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-scheduler--glass .ux-scheduler__header {
      background: var(--ux-glass-bg-thin);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-scheduler--glass .ux-scheduler__day-headers {
      background: var(--ux-glass-bg-thin);
    }

    .ux-scheduler--glass .ux-scheduler__times {
      background: var(--ux-glass-bg-thin);
    }

    .ux-scheduler--glass .ux-scheduler__resource-header {
      background: var(--ux-glass-bg-thin);
    }

    .ux-scheduler--glass .ux-scheduler__booking {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .ux-scheduler--glass .ux-scheduler__nav-btn {
      background: var(--ux-glass-bg-thin);
    }

    .ux-scheduler--glass .ux-scheduler__view-toggle {
      background: var(--ux-glass-bg-thin);
    }

    .ux-scheduler--glass .ux-scheduler__view-btn--active {
      background: var(--ux-glass-bg-thick);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-scheduler {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-scheduler__hour-slot::after,
      .ux-scheduler--interval-15 .ux-scheduler__hour-slot::before {
        border-color: var(--ux-gray-800);
      }

      .ux-scheduler__booking--pending {
        color: var(--ux-gray-900);
      }
    }

    .ux-dark .ux-scheduler {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-scheduler__hour-slot::after,
    .ux-dark .ux-scheduler--interval-15 .ux-scheduler__hour-slot::before {
      border-color: var(--ux-gray-800);
    }

    .ux-dark .ux-scheduler__booking--pending {
      color: var(--ux-gray-900);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-scheduler {
        --ux-scheduler-time-width: 45px;
        --ux-scheduler-hour-height: 50px;
        --ux-scheduler-resource-width: 120px;
      }

      .ux-scheduler__header {
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.75rem;
      }

      .ux-scheduler__view-toggle {
        order: -1;
        width: 100%;
        justify-content: center;
      }

      .ux-scheduler__day-header {
        min-width: 60px;
      }

      .ux-scheduler__day-name {
        font-size: 0.625rem;
      }

      .ux-scheduler__day-number {
        width: 28px;
        height: 28px;
        font-size: 0.875rem;
      }

      .ux-scheduler__booking {
        font-size: 0.6875rem;
        padding: 0.125rem 0.25rem;
      }

      .ux-scheduler__booking-time {
        display: none;
      }

      .ux-scheduler__month-day {
        min-height: 60px;
        padding: 0.25rem;
      }

      .ux-scheduler__month-day-number {
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-scheduler__nav-btn,
      .ux-scheduler__today-btn,
      .ux-scheduler__view-btn,
      .ux-scheduler__booking,
      .ux-scheduler__hour-slot,
      .ux-scheduler__day-header {
        transition: none;
      }

      .ux-scheduler__booking:hover {
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-scheduler-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-scheduler-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
  };

  // Day and month names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Alpine.js component
  const schedulerData = (options = {}) => ({
    // Configuration
    view: options.view || 'week', // 'day', 'week', 'month'
    interval: options.interval || 30, // 15, 30, 60 minutes
    startHour: options.startHour ?? 0,
    endHour: options.endHour ?? 24,
    businessStartHour: options.businessStartHour ?? 9,
    businessEndHour: options.businessEndHour ?? 17,
    showBusinessHours: options.showBusinessHours ?? true,
    resources: options.resources || [], // [{id, name, avatar, info}]
    bookings: options.bookings || [],
    hourHeight: options.hourHeight || 60,
    weekStartsOn: options.weekStartsOn ?? 0, // 0 = Sunday

    // State
    currentDate: options.initialDate ? new Date(options.initialDate) : new Date(),
    selectedDate: null,
    nowLineTop: 0,
    isDragging: false,
    dragStart: null,
    dragEnd: null,
    dragColumn: null,
    dragResourceId: null,

    // References
    icons,
    dayNames,
    dayNamesLong,
    monthNames,

    init() {
      this.selectedDate = new Date(this.currentDate);
      this.updateNowLine();

      // Update now line every minute
      this._nowInterval = setInterval(() => {
        this.updateNowLine();
      }, 60000);
    },

    destroy() {
      if (this._nowInterval) {
        clearInterval(this._nowInterval);
      }
    },

    // Title based on current view
    get title() {
      if (this.view === 'day') {
        return `${this.dayNamesLong[this.currentDate.getDay()]}, ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getDate()}, ${this.currentDate.getFullYear()}`;
      }

      if (this.view === 'month') {
        return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      }

      // Week view
      const weekStart = this.getWeekStart(this.currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${this.monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }

      return `${this.monthNames[weekStart.getMonth()].substring(0, 3)} ${weekStart.getDate()} - ${this.monthNames[weekEnd.getMonth()].substring(0, 3)} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;
    },

    // Get week start
    getWeekStart(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = (day - this.weekStartsOn + 7) % 7;
      d.setDate(d.getDate() - diff);
      return d;
    },

    // Get days for week view
    get weekDays() {
      const days = [];
      const weekStart = this.getWeekStart(this.currentDate);

      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        days.push({
          date: d,
          name: this.dayNames[d.getDay()],
          number: d.getDate(),
          isToday: this.isToday(d),
          isWeekend: d.getDay() === 0 || d.getDay() === 6,
          isSelected: this.isSameDay(d, this.selectedDate)
        });
      }

      return days;
    },

    // Get hours array
    get hours() {
      const hours = [];
      for (let i = this.startHour; i < this.endHour; i++) {
        hours.push({
          value: i,
          label: this.formatHour(i),
          isBusiness: i >= this.businessStartHour && i < this.businessEndHour
        });
      }
      return hours;
    },

    // Get month days
    get monthDays() {
      const days = [];
      const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      // Days from previous month
      const startDay = firstDay.getDay();
      const diff = (startDay - this.weekStartsOn + 7) % 7;
      const prevMonth = new Date(firstDay);
      prevMonth.setDate(prevMonth.getDate() - diff);

      for (let i = 0; i < diff; i++) {
        const d = new Date(prevMonth);
        d.setDate(d.getDate() + i);
        days.push({
          date: d,
          number: d.getDate(),
          isOtherMonth: true,
          isToday: this.isToday(d),
          isWeekend: d.getDay() === 0 || d.getDay() === 6
        });
      }

      // Days in current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
        days.push({
          date: d,
          number: i,
          isOtherMonth: false,
          isToday: this.isToday(d),
          isWeekend: d.getDay() === 0 || d.getDay() === 6
        });
      }

      // Days from next month to fill grid
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, i);
        days.push({
          date: d,
          number: i,
          isOtherMonth: true,
          isToday: this.isToday(d),
          isWeekend: d.getDay() === 0 || d.getDay() === 6
        });
      }

      return days;
    },

    // Check if date is today
    isToday(date) {
      const today = new Date();
      return this.isSameDay(date, today);
    },

    // Check if two dates are same day
    isSameDay(d1, d2) {
      if (!d1 || !d2) return false;
      return d1.getFullYear() === d2.getFullYear() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getDate() === d2.getDate();
    },

    // Format hour
    formatHour(hour) {
      if (hour === 0) return '12 AM';
      if (hour === 12) return '12 PM';
      if (hour < 12) return `${hour} AM`;
      return `${hour - 12} PM`;
    },

    // Format time
    formatTime(date) {
      const d = new Date(date);
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const h = hours % 12 || 12;
      return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
    },

    // Navigation
    prev() {
      if (this.view === 'day') {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
      } else if (this.view === 'week') {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      }
      this.currentDate = new Date(this.currentDate);
      this.$dispatch('scheduler:navigate', { date: this.currentDate, view: this.view });
    },

    next() {
      if (this.view === 'day') {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      } else if (this.view === 'week') {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      }
      this.currentDate = new Date(this.currentDate);
      this.$dispatch('scheduler:navigate', { date: this.currentDate, view: this.view });
    },

    goToToday() {
      this.currentDate = new Date();
      this.selectedDate = new Date();
      this.$dispatch('scheduler:navigate', { date: this.currentDate, view: this.view });
    },

    setView(view) {
      this.view = view;
      this.$dispatch('scheduler:viewchange', { view });
    },

    selectDay(date) {
      this.selectedDate = new Date(date);
      this.currentDate = new Date(date);
      if (this.view === 'month') {
        this.view = 'day';
      }
      this.$dispatch('scheduler:dayselect', { date });
    },

    // Update now line position
    updateNowLine() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const startMinutes = this.startHour * 60;

      this.nowLineTop = ((totalMinutes - startMinutes) / 60) * this.hourHeight;
    },

    // Get bookings for a specific day
    getBookingsForDay(date, resourceId = null) {
      return this.bookings.filter(booking => {
        const bookingDate = new Date(booking.start);
        const sameDay = this.isSameDay(bookingDate, date);
        if (resourceId !== null) {
          return sameDay && booking.resourceId === resourceId;
        }
        return sameDay;
      });
    },

    // Get bookings for month day (limited)
    getBookingsForMonthDay(date, limit = 3) {
      const bookings = this.getBookingsForDay(date);
      return {
        visible: bookings.slice(0, limit),
        more: bookings.length > limit ? bookings.length - limit : 0
      };
    },

    // Get booking position and height
    getBookingStyle(booking) {
      const start = new Date(booking.start);
      const end = new Date(booking.end);

      const startHour = start.getHours();
      const startMinutes = start.getMinutes();
      const endHour = end.getHours();
      const endMinutes = end.getMinutes();

      const top = ((startHour - this.startHour) * 60 + startMinutes) / 60 * this.hourHeight;
      const duration = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60 * this.hourHeight;

      return {
        top: `${top}px`,
        height: `${Math.max(duration, 20)}px`
      };
    },

    // Check if now line should show
    shouldShowNowLine(date) {
      return this.isToday(date);
    },

    // Booking click handler
    onBookingClick(booking, event) {
      event.stopPropagation();
      this.$dispatch('scheduler:bookingclick', { booking });
    },

    // Slot click handler (for creating new bookings)
    onSlotClick(date, hour, resourceId = null, event) {
      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);

      // Calculate minutes based on click position within the hour slot
      const rect = event.currentTarget.getBoundingClientRect();
      const clickY = event.clientY - rect.top;
      const minuteOffset = Math.floor((clickY / this.hourHeight) * 60);
      const roundedMinutes = Math.floor(minuteOffset / this.interval) * this.interval;
      slotDate.setMinutes(roundedMinutes);

      this.$dispatch('scheduler:slotclick', {
        date: slotDate,
        resourceId,
        hour,
        minutes: roundedMinutes
      });
    },

    // Drag to create booking
    onDragStart(date, hour, resourceId, event) {
      this.isDragging = true;
      const rect = event.currentTarget.getBoundingClientRect();
      const clickY = event.clientY - rect.top;
      const minuteOffset = Math.floor((clickY / this.hourHeight) * 60);
      const roundedMinutes = Math.floor(minuteOffset / this.interval) * this.interval;

      const startDate = new Date(date);
      startDate.setHours(hour, roundedMinutes, 0, 0);

      this.dragStart = startDate;
      this.dragEnd = new Date(startDate.getTime() + this.interval * 60000);
      this.dragColumn = date;
      this.dragResourceId = resourceId;
    },

    onDragMove(date, hour, event) {
      if (!this.isDragging || !this.isSameDay(date, this.dragColumn)) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickY = event.clientY - rect.top;
      const minuteOffset = Math.floor((clickY / this.hourHeight) * 60);
      const roundedMinutes = Math.ceil(minuteOffset / this.interval) * this.interval;

      const endDate = new Date(date);
      endDate.setHours(hour, roundedMinutes, 0, 0);

      if (endDate > this.dragStart) {
        this.dragEnd = endDate;
      }
    },

    onDragEnd() {
      if (!this.isDragging) return;

      this.isDragging = false;

      // Only dispatch if drag duration is meaningful
      const duration = (this.dragEnd - this.dragStart) / 60000;
      if (duration >= this.interval) {
        this.$dispatch('scheduler:createbooking', {
          start: this.dragStart,
          end: this.dragEnd,
          resourceId: this.dragResourceId
        });
      }

      this.dragStart = null;
      this.dragEnd = null;
      this.dragColumn = null;
      this.dragResourceId = null;
    },

    // Get drag preview style
    getDragPreviewStyle() {
      if (!this.dragStart || !this.dragEnd) return { display: 'none' };

      const startHour = this.dragStart.getHours();
      const startMinutes = this.dragStart.getMinutes();
      const endHour = this.dragEnd.getHours();
      const endMinutes = this.dragEnd.getMinutes();

      const top = ((startHour - this.startHour) * 60 + startMinutes) / 60 * this.hourHeight;
      const height = ((endHour - startHour) * 60 + (endMinutes - startMinutes)) / 60 * this.hourHeight;

      return {
        top: `${top}px`,
        height: `${Math.max(height, 20)}px`
      };
    },

    // Format drag preview time
    getDragPreviewText() {
      if (!this.dragStart || !this.dragEnd) return '';
      return `${this.formatTime(this.dragStart)} - ${this.formatTime(this.dragEnd)}`;
    },

    // Check for conflicts
    hasConflict(booking) {
      const bookingStart = new Date(booking.start).getTime();
      const bookingEnd = new Date(booking.end).getTime();

      return this.bookings.some(other => {
        if (other.id === booking.id) return false;
        if (booking.resourceId && other.resourceId !== booking.resourceId) return false;

        const otherStart = new Date(other.start).getTime();
        const otherEnd = new Date(other.end).getTime();

        return (bookingStart < otherEnd && bookingEnd > otherStart);
      });
    },

    // Add booking
    addBooking(bookingData) {
      const booking = {
        id: bookingData.id || 'booking-' + Date.now(),
        ...bookingData
      };
      this.bookings.push(booking);
      this.$dispatch('scheduler:bookingadd', { booking });
      return booking;
    },

    // Update booking
    updateBooking(bookingId, updates) {
      const index = this.bookings.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        this.bookings[index] = { ...this.bookings[index], ...updates };
        this.$dispatch('scheduler:bookingupdate', { booking: this.bookings[index], updates });
      }
    },

    // Remove booking
    removeBooking(bookingId) {
      const index = this.bookings.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        const booking = this.bookings.splice(index, 1)[0];
        this.$dispatch('scheduler:bookingremove', { booking });
      }
    },

    // Set bookings
    setBookings(bookings) {
      this.bookings = bookings;
    },

    // Get all resources
    getResources() {
      return this.resources;
    },

    // Set resources
    setResources(resources) {
      this.resources = resources;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxScheduler', schedulerData);
  }

})();
