/**
 * UX Shift Calendar Component
 * Week view shift scheduling calendar with drag-to-create and employee filtering
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Shift Calendar Container
       ========================================================================== */

    :root {
      --ux-shift-calendar-time-width: 60px;
      --ux-shift-calendar-day-min-width: 120px;
      --ux-shift-calendar-row-height: 48px;
      --ux-shift-calendar-radius: var(--ux-radius-xl);
      --ux-shift-calendar-header-height: 60px;
      --ux-shift-calendar-shift-radius: var(--ux-radius-md);
    }

    .ux-shift-calendar {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-shift-calendar-radius);
      overflow: hidden;
      user-select: none;
      font-family: var(--ux-font-family);
    }

    /* ==========================================================================
       Header (Navigation & Filters)
       ========================================================================== */

    .ux-shift-calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      min-height: var(--ux-shift-calendar-header-height);
    }

    .ux-shift-calendar__header-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-shift-calendar__header-center {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-shift-calendar__header-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-shift-calendar__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
      white-space: nowrap;
    }

    .ux-shift-calendar__subtitle {
      font-size: 0.875rem;
      color: var(--ux-text-secondary);
    }

    .ux-shift-calendar__nav {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-shift-calendar__nav-btn {
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
      transition: all var(--ux-transition-fast);
    }

    .ux-shift-calendar__nav-btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-shift-calendar__nav-btn:active {
      transform: scale(0.95);
    }

    .ux-shift-calendar__nav-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-shift-calendar__today-btn {
      padding: var(--ux-space-xs) var(--ux-space-md);
      background: transparent;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-shift-calendar__today-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    /* Employee Filter */
    .ux-shift-calendar__filter {
      position: relative;
    }

    .ux-shift-calendar__filter-btn {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-shift-calendar__filter-btn:hover {
      border-color: var(--ux-primary);
    }

    .ux-shift-calendar__filter-btn svg {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
    }

    .ux-shift-calendar__filter-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 9px;
      font-size: 0.6875rem;
      font-weight: 600;
    }

    /* ==========================================================================
       Grid Container
       ========================================================================== */

    .ux-shift-calendar__grid-wrapper {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-shift-calendar__grid {
      display: grid;
      grid-template-columns: var(--ux-shift-calendar-time-width) repeat(7, minmax(var(--ux-shift-calendar-day-min-width), 1fr));
      min-width: fit-content;
    }

    /* ==========================================================================
       Day Headers
       ========================================================================== */

    .ux-shift-calendar__days-header {
      display: contents;
    }

    .ux-shift-calendar__corner {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 3;
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-shift-calendar__day-header {
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-sm);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      border-right: 1px solid var(--ux-border-color);
      min-height: 56px;
    }

    .ux-shift-calendar__day-header:last-child {
      border-right: none;
    }

    .ux-shift-calendar__day-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .ux-shift-calendar__day-number {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ux-text);
      line-height: 1.2;
    }

    .ux-shift-calendar__day-header--today .ux-shift-calendar__day-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 50%;
    }

    .ux-shift-calendar__day-header--weekend {
      background: var(--ux-surface-secondary);
    }

    .ux-shift-calendar__day-header--weekend .ux-shift-calendar__day-name {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Time Column
       ========================================================================== */

    .ux-shift-calendar__time-slot {
      position: sticky;
      left: 0;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border-right: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-tertiary);
      height: var(--ux-shift-calendar-row-height);
    }

    .ux-shift-calendar__time-slot--half {
      border-bottom-style: dashed;
    }

    /* ==========================================================================
       Grid Cells
       ========================================================================== */

    .ux-shift-calendar__cell {
      position: relative;
      min-height: var(--ux-shift-calendar-row-height);
      border-right: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      transition: background var(--ux-transition-fast);
    }

    .ux-shift-calendar__cell:last-child {
      border-right: none;
    }

    .ux-shift-calendar__cell--half {
      border-bottom-style: dashed;
    }

    .ux-shift-calendar__cell--weekend {
      background: var(--ux-surface-secondary);
    }

    .ux-shift-calendar__cell:hover {
      background: rgba(var(--ux-primary-rgb), 0.03);
    }

    .ux-shift-calendar__cell--drag-over {
      background: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-shift-calendar__cell--selecting {
      background: rgba(var(--ux-primary-rgb), 0.12);
    }

    /* ==========================================================================
       Shift Blocks
       ========================================================================== */

    .ux-shift-calendar__shift {
      position: absolute;
      left: 2px;
      right: 2px;
      min-height: 24px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-shift-calendar-shift-radius);
      cursor: pointer;
      overflow: hidden;
      z-index: 1;
      transition: transform var(--ux-transition-fast), box-shadow var(--ux-transition-fast);
    }

    .ux-shift-calendar__shift:hover {
      transform: scale(1.01);
      box-shadow: var(--ux-shadow-md);
      z-index: 2;
    }

    .ux-shift-calendar__shift:active {
      transform: scale(0.99);
    }

    .ux-shift-calendar__shift--dragging {
      opacity: 0.7;
      box-shadow: var(--ux-shadow-lg);
      z-index: 10;
    }

    /* Shift Content */
    .ux-shift-calendar__shift-name {
      font-size: 0.8125rem;
      font-weight: 600;
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }

    .ux-shift-calendar__shift-time {
      font-size: 0.6875rem;
      opacity: 0.85;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-shift-calendar__shift-department {
      font-size: 0.625rem;
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    /* Shift Types (Colors) */
    .ux-shift-calendar__shift--morning {
      background: linear-gradient(135deg, var(--ux-amber-400), var(--ux-amber-500));
      color: var(--ux-amber-950);
    }

    .ux-shift-calendar__shift--afternoon {
      background: linear-gradient(135deg, var(--ux-blue-400), var(--ux-blue-500));
      color: white;
    }

    .ux-shift-calendar__shift--night {
      background: linear-gradient(135deg, var(--ux-indigo-500), var(--ux-indigo-600));
      color: white;
    }

    .ux-shift-calendar__shift--full-day {
      background: linear-gradient(135deg, var(--ux-green-400), var(--ux-green-500));
      color: white;
    }

    .ux-shift-calendar__shift--overtime {
      background: linear-gradient(135deg, var(--ux-orange-400), var(--ux-orange-500));
      color: white;
    }

    .ux-shift-calendar__shift--off {
      background: linear-gradient(135deg, var(--ux-gray-300), var(--ux-gray-400));
      color: var(--ux-gray-700);
    }

    /* Custom colors via CSS vars */
    .ux-shift-calendar__shift--custom {
      background: var(--shift-bg, var(--ux-primary));
      color: var(--shift-color, white);
    }

    /* ==========================================================================
       Selection Overlay (drag to create)
       ========================================================================== */

    .ux-shift-calendar__selection {
      position: absolute;
      background: rgba(var(--ux-primary-rgb), 0.2);
      border: 2px dashed var(--ux-primary);
      border-radius: var(--ux-shift-calendar-shift-radius);
      pointer-events: none;
      z-index: 5;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-shift-calendar__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      color: var(--ux-text-tertiary);
      text-align: center;
    }

    .ux-shift-calendar__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      opacity: 0.5;
    }

    .ux-shift-calendar__empty-text {
      font-size: 0.9375rem;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-shift-calendar__empty-hint {
      font-size: 0.8125rem;
      opacity: 0.7;
    }

    /* ==========================================================================
       Legend
       ========================================================================== */

    .ux-shift-calendar__legend {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .ux-shift-calendar__legend-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: 0.75rem;
      color: var(--ux-text-secondary);
    }

    .ux-shift-calendar__legend-color {
      width: 12px;
      height: 12px;
      border-radius: 3px;
    }

    .ux-shift-calendar__legend-color--morning {
      background: linear-gradient(135deg, var(--ux-amber-400), var(--ux-amber-500));
    }

    .ux-shift-calendar__legend-color--afternoon {
      background: linear-gradient(135deg, var(--ux-blue-400), var(--ux-blue-500));
    }

    .ux-shift-calendar__legend-color--night {
      background: linear-gradient(135deg, var(--ux-indigo-500), var(--ux-indigo-600));
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-shift-calendar__header {
        flex-wrap: wrap;
        gap: var(--ux-space-sm);
      }

      .ux-shift-calendar__header-center {
        order: -1;
        width: 100%;
        justify-content: center;
      }

      .ux-shift-calendar__title {
        font-size: 1rem;
      }

      .ux-shift-calendar__grid {
        grid-template-columns: var(--ux-shift-calendar-time-width) repeat(7, 100px);
      }

      .ux-shift-calendar__shift-name {
        font-size: 0.75rem;
      }

      .ux-shift-calendar__shift-time,
      .ux-shift-calendar__shift-department {
        display: none;
      }

      .ux-shift-calendar__legend {
        justify-content: center;
      }
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-shift-calendar--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-shift-calendar--glass .ux-shift-calendar__header,
    .ux-shift-calendar--glass .ux-shift-calendar__corner,
    .ux-shift-calendar--glass .ux-shift-calendar__day-header,
    .ux-shift-calendar--glass .ux-shift-calendar__time-slot,
    .ux-shift-calendar--glass .ux-shift-calendar__legend {
      background: transparent;
    }

    .ux-shift-calendar--glass .ux-shift-calendar__cell--weekend,
    .ux-shift-calendar--glass .ux-shift-calendar__day-header--weekend {
      background: rgba(var(--ux-surface-rgb), 0.05);
    }

    .ux-shift-calendar--glass .ux-shift-calendar__nav-btn,
    .ux-shift-calendar--glass .ux-shift-calendar__today-btn,
    .ux-shift-calendar--glass .ux-shift-calendar__filter-btn {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--ux-glass-border);
    }

    .ux-shift-calendar--glass .ux-shift-calendar__nav-btn:hover,
    .ux-shift-calendar--glass .ux-shift-calendar__today-btn:hover,
    .ux-shift-calendar--glass .ux-shift-calendar__filter-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-shift-calendar__shift--morning {
        background: linear-gradient(135deg, var(--ux-amber-500), var(--ux-amber-600));
        color: white;
      }

      .ux-shift-calendar__shift--off {
        background: linear-gradient(135deg, var(--ux-gray-600), var(--ux-gray-700));
        color: var(--ux-gray-200);
      }

      .ux-shift-calendar--glass .ux-shift-calendar__nav-btn,
      .ux-shift-calendar--glass .ux-shift-calendar__today-btn,
      .ux-shift-calendar--glass .ux-shift-calendar__filter-btn {
        background: rgba(255, 255, 255, 0.08);
      }

      .ux-shift-calendar--glass .ux-shift-calendar__nav-btn:hover,
      .ux-shift-calendar--glass .ux-shift-calendar__today-btn:hover,
      .ux-shift-calendar--glass .ux-shift-calendar__filter-btn:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark .ux-shift-calendar__shift--morning {
      background: linear-gradient(135deg, var(--ux-amber-500), var(--ux-amber-600));
      color: white;
    }

    .ux-dark .ux-shift-calendar__shift--off {
      background: linear-gradient(135deg, var(--ux-gray-600), var(--ux-gray-700));
      color: var(--ux-gray-200);
    }

    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__nav-btn,
    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__today-btn,
    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__filter-btn {
      background: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__nav-btn:hover,
    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__today-btn:hover,
    .ux-dark .ux-shift-calendar--glass .ux-shift-calendar__filter-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-shift-calendar__shift,
      .ux-shift-calendar__nav-btn,
      .ux-shift-calendar__cell {
        transition: none;
      }
    }

    /* ==========================================================================
       Compact Variant
       ========================================================================== */

    .ux-shift-calendar--compact {
      --ux-shift-calendar-row-height: 36px;
      --ux-shift-calendar-time-width: 50px;
    }

    .ux-shift-calendar--compact .ux-shift-calendar__shift-department {
      display: none;
    }
  `;

  // Navigation icons
  const icons = {
    prev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>`,
    next: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>`,
    filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-shift-calendar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-shift-calendar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const shiftCalendarData = (options = {}) => ({
    // Configuration
    startHour: options.startHour ?? 6,
    endHour: options.endHour ?? 22,
    hourStep: options.hourStep ?? 1,
    firstDayOfWeek: options.firstDayOfWeek ?? 1, // 0 = Sunday, 1 = Monday
    locale: options.locale || 'es',
    showLegend: options.showLegend ?? true,
    readOnly: options.readOnly ?? false,

    // State
    currentDate: new Date(),
    shifts: options.shifts || [],
    employees: options.employees || [],
    filteredEmployeeIds: [],
    selectedShift: null,
    isSelecting: false,
    selectionStart: null,
    selectionEnd: null,
    icons: icons,

    // Day names
    get dayNames() {
      const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
      return days;
    },

    get fullDayNames() {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
      return days;
    },

    // Get week dates based on current date
    get weekDates() {
      const dates = [];
      const current = new Date(this.currentDate);
      const day = current.getDay();
      const diff = (day < this.firstDayOfWeek ? 7 : 0) + day - this.firstDayOfWeek;
      current.setDate(current.getDate() - diff);

      for (let i = 0; i < 7; i++) {
        const date = new Date(current);
        date.setDate(current.getDate() + i);
        dates.push(date);
      }
      return dates;
    },

    // Get week range string for title
    get weekRangeTitle() {
      const start = this.weekDates[0];
      const end = this.weekDates[6];
      const startMonth = start.toLocaleDateString(this.locale, { month: 'short' });
      const endMonth = end.toLocaleDateString(this.locale, { month: 'short' });

      if (start.getMonth() === end.getMonth()) {
        return `${start.getDate()} - ${end.getDate()} ${endMonth} ${end.getFullYear()}`;
      }
      return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${end.getFullYear()}`;
    },

    // Generate time slots
    get timeSlots() {
      const slots = [];
      for (let hour = this.startHour; hour < this.endHour; hour++) {
        slots.push({
          hour,
          label: `${hour.toString().padStart(2, '0')}:00`
        });
      }
      return slots;
    },

    // Check if a date is today
    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },

    // Check if a date is weekend
    isWeekend(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    },

    // Format date as YYYY-MM-DD
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // Format time as HH:MM
    formatTime(hours, minutes = 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },

    // Navigation
    navigateWeek(direction) {
      const newDate = new Date(this.currentDate);
      newDate.setDate(newDate.getDate() + (direction * 7));
      this.currentDate = newDate;
      this.$dispatch('shift-calendar:navigate', {
        direction,
        weekStart: this.weekDates[0],
        weekEnd: this.weekDates[6]
      });
    },

    goToToday() {
      this.currentDate = new Date();
      this.$dispatch('shift-calendar:today');
    },

    goToDate(date) {
      this.currentDate = new Date(date);
    },

    // Get shifts for a specific day
    getShiftsForDay(date) {
      const dateStr = this.formatDate(date);
      let dayShifts = this.shifts.filter(shift => shift.date === dateStr);

      // Apply employee filter
      if (this.filteredEmployeeIds.length > 0) {
        dayShifts = dayShifts.filter(shift =>
          this.filteredEmployeeIds.includes(shift.employeeId)
        );
      }

      return dayShifts;
    },

    // Calculate shift position and height in grid
    getShiftStyle(shift) {
      const startHour = this.parseTime(shift.startTime);
      const endHour = this.parseTime(shift.endTime);

      const top = (startHour - this.startHour) * 48; // 48px per hour
      const height = (endHour - startHour) * 48;

      return {
        top: `${top}px`,
        height: `${Math.max(height, 24)}px`
      };
    },

    // Parse time string to decimal hours
    parseTime(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours + (minutes || 0) / 60;
    },

    // Determine shift type based on time
    getShiftType(shift) {
      if (shift.type) return shift.type;

      const startHour = this.parseTime(shift.startTime);
      const endHour = this.parseTime(shift.endTime);
      const duration = endHour - startHour;

      if (duration >= 10) return 'full-day';
      if (startHour < 12) return 'morning';
      if (startHour < 18) return 'afternoon';
      return 'night';
    },

    // Shift CRUD operations
    addShift(shiftData) {
      const shift = {
        id: shiftData.id || `shift-${Date.now()}`,
        ...shiftData
      };
      this.shifts.push(shift);
      this.$dispatch('shift-calendar:add', { shift });
      return shift;
    },

    editShift(shiftId, updates) {
      const index = this.shifts.findIndex(s => s.id === shiftId);
      if (index !== -1) {
        this.shifts[index] = { ...this.shifts[index], ...updates };
        this.$dispatch('shift-calendar:edit', { shift: this.shifts[index] });
        return this.shifts[index];
      }
      return null;
    },

    deleteShift(shiftId) {
      const index = this.shifts.findIndex(s => s.id === shiftId);
      if (index !== -1) {
        const deleted = this.shifts.splice(index, 1)[0];
        this.$dispatch('shift-calendar:delete', { shift: deleted });
        return deleted;
      }
      return null;
    },

    // Click on shift
    onShiftClick(shift, event) {
      event.stopPropagation();
      this.selectedShift = shift;
      this.$dispatch('shift-calendar:select', { shift });
    },

    // Drag to create shift
    onCellMouseDown(date, hour, event) {
      if (this.readOnly) return;

      this.isSelecting = true;
      this.selectionStart = { date: this.formatDate(date), hour };
      this.selectionEnd = { date: this.formatDate(date), hour: hour + 1 };
    },

    onCellMouseMove(date, hour, event) {
      if (!this.isSelecting) return;

      this.selectionEnd = { date: this.formatDate(date), hour: hour + 1 };
    },

    onCellMouseUp(event) {
      if (!this.isSelecting) return;

      if (this.selectionStart && this.selectionEnd) {
        const startHour = Math.min(this.selectionStart.hour, this.selectionEnd.hour);
        const endHour = Math.max(this.selectionStart.hour, this.selectionEnd.hour);

        if (endHour > startHour) {
          this.$dispatch('shift-calendar:create', {
            date: this.selectionStart.date,
            startTime: this.formatTime(startHour),
            endTime: this.formatTime(endHour)
          });
        }
      }

      this.isSelecting = false;
      this.selectionStart = null;
      this.selectionEnd = null;
    },

    // Employee filtering
    filterByEmployee(employeeId) {
      const index = this.filteredEmployeeIds.indexOf(employeeId);
      if (index === -1) {
        this.filteredEmployeeIds.push(employeeId);
      } else {
        this.filteredEmployeeIds.splice(index, 1);
      }
      this.$dispatch('shift-calendar:filter', {
        filteredEmployeeIds: [...this.filteredEmployeeIds]
      });
    },

    clearFilters() {
      this.filteredEmployeeIds = [];
      this.$dispatch('shift-calendar:filter', { filteredEmployeeIds: [] });
    },

    isEmployeeFiltered(employeeId) {
      return this.filteredEmployeeIds.includes(employeeId);
    },

    // Get employee by ID
    getEmployee(employeeId) {
      return this.employees.find(e => e.id === employeeId) || { name: 'Unknown' };
    },

    // Initialize
    init() {
      // Handle mouse up anywhere on document
      this._mouseUpHandler = (e) => this.onCellMouseUp(e);
      document.addEventListener('mouseup', this._mouseUpHandler);

      // Set initial shifts if provided
      if (options.shifts) {
        this.shifts = [...options.shifts];
      }
    },

    destroy() {
      if (this._mouseUpHandler) {
        document.removeEventListener('mouseup', this._mouseUpHandler);
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxShiftCalendar', shiftCalendarData);
  }
})();
