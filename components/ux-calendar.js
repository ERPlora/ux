/**
 * UX Calendar Component
 * Monthly calendar view with date selection, range selection, and events
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Calendar Container
       ========================================================================== */

    :root {
      --ux-calendar-width: 320px;
      --ux-calendar-cell-size: 40px;
      --ux-calendar-gap: 2px;
      --ux-calendar-radius: var(--ux-radius-xl);
      --ux-calendar-padding: var(--ux-space-md);
    }

    .ux-calendar {
      width: var(--ux-calendar-width);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-calendar-radius);
      overflow: hidden;
      user-select: none;
    }

    /* ==========================================================================
       Header
       ========================================================================== */

    .ux-calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-calendar-padding);
      background: var(--ux-surface);
    }

    .ux-calendar__title {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-calendar__nav {
      display: flex;
      gap: var(--ux-space-xs);
    }

    .ux-calendar__nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-calendar__nav-btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-calendar__nav-btn:active {
      transform: scale(0.95);
    }

    .ux-calendar__nav-btn svg {
      width: 16px;
      height: 16px;
    }

    /* ==========================================================================
       Weekdays
       ========================================================================== */

    .ux-calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--ux-calendar-gap);
      padding: 0 var(--ux-calendar-padding);
      padding-bottom: var(--ux-space-xs);
    }

    .ux-calendar__weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
    }

    /* ==========================================================================
       Days Grid
       ========================================================================== */

    .ux-calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--ux-calendar-gap);
      padding: 0 var(--ux-calendar-padding);
      padding-bottom: var(--ux-calendar-padding);
    }

    .ux-calendar__day {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-calendar-cell-size);
      height: var(--ux-calendar-cell-size);
      font-size: 0.9375rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-calendar__day:hover:not(.ux-calendar__day--disabled):not(.ux-calendar__day--selected) {
      background: var(--ux-surface-secondary);
    }

    .ux-calendar__day:active:not(.ux-calendar__day--disabled) {
      transform: scale(0.9);
    }

    /* Day States */
    .ux-calendar__day--other-month {
      color: var(--ux-text-tertiary);
    }

    .ux-calendar__day--today {
      font-weight: 600;
      color: var(--ux-primary);
    }

    .ux-calendar__day--today::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--ux-primary);
      border-radius: 50%;
    }

    .ux-calendar__day--selected {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      font-weight: 500;
    }

    .ux-calendar__day--selected::after {
      display: none;
    }

    .ux-calendar__day--disabled {
      color: var(--ux-text-tertiary);
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-calendar__day--weekend {
      color: var(--ux-danger);
    }

    .ux-calendar__day--weekend.ux-calendar__day--other-month {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Range Selection
       ========================================================================== */

    .ux-calendar__day--range-start {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 50% 0 0 50%;
    }

    .ux-calendar__day--range-end {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 0 50% 50% 0;
    }

    .ux-calendar__day--range-start.ux-calendar__day--range-end {
      border-radius: 50%;
    }

    .ux-calendar__day--in-range {
      background: var(--ux-primary-tint);
      border-radius: 0;
    }

    .ux-calendar__day--range-hover {
      background: var(--ux-primary-tint);
    }

    /* ==========================================================================
       Event Indicators
       ========================================================================== */

    .ux-calendar__day-events {
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 2px;
    }

    .ux-calendar__day-event {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--ux-primary);
    }

    .ux-calendar__day-event--success { background: var(--ux-success); }
    .ux-calendar__day-event--warning { background: var(--ux-warning); }
    .ux-calendar__day-event--danger { background: var(--ux-danger); }

    .ux-calendar__day--selected .ux-calendar__day-event {
      background: var(--ux-primary-contrast);
    }

    /* ==========================================================================
       Footer
       ========================================================================== */

    .ux-calendar__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-calendar-padding);
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-calendar__today-btn {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-radius-md);
      transition: background var(--ux-transition-fast);
    }

    .ux-calendar__today-btn:hover {
      background: var(--ux-primary-tint);
    }

    .ux-calendar__clear-btn {
      font-size: 0.875rem;
      color: var(--ux-text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-radius-md);
      transition: background var(--ux-transition-fast);
    }

    .ux-calendar__clear-btn:hover {
      background: var(--ux-surface-tertiary);
    }

    /* ==========================================================================
       Month/Year Picker
       ========================================================================== */

    .ux-calendar__picker {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--ux-space-sm);
      padding: var(--ux-calendar-padding);
    }

    .ux-calendar__picker-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      font-size: 0.9375rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-calendar__picker-item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-calendar__picker-item--selected {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-calendar__picker-item--current {
      font-weight: 600;
      color: var(--ux-primary);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-calendar--sm {
      --ux-calendar-width: 280px;
      --ux-calendar-cell-size: 32px;
    }

    .ux-calendar--lg {
      --ux-calendar-width: 380px;
      --ux-calendar-cell-size: 48px;
    }

    .ux-calendar--full {
      --ux-calendar-width: 100%;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-calendar--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-calendar--glass .ux-calendar__header,
    .ux-calendar--glass .ux-calendar__footer {
      background: transparent;
    }

    .ux-calendar--glass .ux-calendar__nav-btn {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-calendar--glass .ux-calendar__nav-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* ==========================================================================
       Inline Variant (no border/shadow)
       ========================================================================== */

    .ux-calendar--inline {
      border: none;
      box-shadow: none;
      background: transparent;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-calendar--glass .ux-calendar__nav-btn {
        background: rgba(255, 255, 255, 0.08);
      }

      .ux-calendar--glass .ux-calendar__nav-btn:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark .ux-calendar--glass .ux-calendar__nav-btn {
      background: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-calendar--glass .ux-calendar__nav-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-calendar__day,
      .ux-calendar__nav-btn,
      .ux-calendar__picker-item {
        transition: none;
      }
    }
  `;

  // Navigation icons
  const icons = {
    prev: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>`,
    next: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-calendar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-calendar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const calendarData = (options = {}) => ({
    // Configuration
    locale: options.locale || 'es',
    firstDayOfWeek: options.firstDayOfWeek ?? 1, // 0 = Sunday, 1 = Monday
    minDate: options.minDate ? new Date(options.minDate) : null,
    maxDate: options.maxDate ? new Date(options.maxDate) : null,
    disabledDates: options.disabledDates || [],
    disabledDays: options.disabledDays || [], // 0-6 (Sunday-Saturday)
    events: options.events || [],
    range: options.range ?? false,
    showFooter: options.showFooter ?? true,
    showOtherMonths: options.showOtherMonths ?? true,
    highlightWeekends: options.highlightWeekends ?? false,

    // State
    currentDate: new Date(),
    selectedDate: options.value ? new Date(options.value) : null,
    rangeStart: options.rangeStart ? new Date(options.rangeStart) : null,
    rangeEnd: options.rangeEnd ? new Date(options.rangeEnd) : null,
    hoverDate: null,
    view: 'days', // 'days', 'months', 'years'
    icons: icons,

    // Weekday names
    get weekdays() {
      const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
      const reordered = [];
      for (let i = 0; i < 7; i++) {
        reordered.push(days[(this.firstDayOfWeek + i) % 7]);
      }
      return reordered;
    },

    // Month names
    get monthNames() {
      return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    },

    get shortMonthNames() {
      return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
              'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    },

    // Current month/year display
    get currentMonthYear() {
      return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    },

    // Generate calendar days
    get calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const days = [];

      // Days from previous month
      let startDay = firstDay.getDay() - this.firstDayOfWeek;
      if (startDay < 0) startDay += 7;

      for (let i = startDay - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        days.push(this.createDayObject(date, true));
      }

      // Days of current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        days.push(this.createDayObject(date, false));
      }

      // Days from next month
      const remaining = 42 - days.length; // 6 rows × 7 days
      for (let i = 1; i <= remaining; i++) {
        const date = new Date(year, month + 1, i);
        days.push(this.createDayObject(date, true));
      }

      return days;
    },

    // Create day object with all states
    createDayObject(date, isOtherMonth) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      return {
        date: new Date(date),
        day: date.getDate(),
        isOtherMonth,
        isToday: date.getTime() === today.getTime(),
        isSelected: this.isDateSelected(date),
        isDisabled: this.isDateDisabled(date),
        isWeekend,
        isRangeStart: this.isRangeStart(date),
        isRangeEnd: this.isRangeEnd(date),
        isInRange: this.isInRange(date),
        isRangeHover: this.isInRangeHover(date),
        events: this.getEventsForDate(date)
      };
    },

    // Check if date is selected
    isDateSelected(date) {
      if (this.range) {
        return this.isRangeStart(date) || this.isRangeEnd(date);
      }
      if (!this.selectedDate) return false;
      return date.getTime() === this.selectedDate.getTime();
    },

    // Check if date is disabled
    isDateDisabled(date) {
      // Check min/max
      if (this.minDate && date < this.minDate) return true;
      if (this.maxDate && date > this.maxDate) return true;

      // Check disabled days of week
      if (this.disabledDays.includes(date.getDay())) return true;

      // Check disabled specific dates
      const dateStr = this.formatDate(date);
      return this.disabledDates.some(d => {
        if (typeof d === 'string') return d === dateStr;
        if (d instanceof Date) return d.getTime() === date.getTime();
        return false;
      });
    },

    // Range helpers
    isRangeStart(date) {
      if (!this.range || !this.rangeStart) return false;
      return date.getTime() === this.rangeStart.getTime();
    },

    isRangeEnd(date) {
      if (!this.range || !this.rangeEnd) return false;
      return date.getTime() === this.rangeEnd.getTime();
    },

    isInRange(date) {
      if (!this.range || !this.rangeStart || !this.rangeEnd) return false;
      return date > this.rangeStart && date < this.rangeEnd;
    },

    isInRangeHover(date) {
      if (!this.range || !this.rangeStart || this.rangeEnd || !this.hoverDate) return false;
      const start = this.rangeStart;
      const end = this.hoverDate;
      if (start < end) {
        return date > start && date <= end;
      } else {
        return date >= end && date < start;
      }
    },

    // Get events for a date
    getEventsForDate(date) {
      const dateStr = this.formatDate(date);
      return this.events.filter(event => {
        const eventDate = typeof event.date === 'string' ? event.date : this.formatDate(event.date);
        return eventDate === dateStr;
      });
    },

    // Format date as YYYY-MM-DD
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    // Navigation
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      this.$dispatch('calendar:navigate', { date: new Date(this.currentDate), direction: 'prev' });
    },

    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      this.$dispatch('calendar:navigate', { date: new Date(this.currentDate), direction: 'next' });
    },

    goToToday() {
      this.currentDate = new Date();
      this.currentDate.setHours(0, 0, 0, 0);
      this.$dispatch('calendar:today');
    },

    goToDate(date) {
      this.currentDate = new Date(date);
      this.currentDate.setHours(0, 0, 0, 0);
    },

    // Selection
    selectDate(dayObj) {
      if (dayObj.isDisabled) return;

      const date = new Date(dayObj.date);
      date.setHours(0, 0, 0, 0);

      if (this.range) {
        this.selectRange(date);
      } else {
        this.selectedDate = date;
        this.$dispatch('calendar:select', {
          date: new Date(date),
          formatted: this.formatDate(date)
        });
      }

      // Navigate to month if clicking other month day
      if (dayObj.isOtherMonth) {
        this.goToDate(date);
      }
    },

    selectRange(date) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        // Start new range
        this.rangeStart = date;
        this.rangeEnd = null;
        this.$dispatch('calendar:range-start', {
          start: new Date(date),
          formatted: this.formatDate(date)
        });
      } else {
        // Complete range
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = date;
        } else {
          this.rangeEnd = date;
        }
        this.$dispatch('calendar:range-select', {
          start: new Date(this.rangeStart),
          end: new Date(this.rangeEnd),
          startFormatted: this.formatDate(this.rangeStart),
          endFormatted: this.formatDate(this.rangeEnd)
        });
      }
    },

    clearSelection() {
      this.selectedDate = null;
      this.rangeStart = null;
      this.rangeEnd = null;
      this.hoverDate = null;
      this.$dispatch('calendar:clear');
    },

    // Hover for range preview
    onDayHover(dayObj) {
      if (this.range && this.rangeStart && !this.rangeEnd) {
        this.hoverDate = dayObj.date;
      }
    },

    onDayLeave() {
      this.hoverDate = null;
    },

    // View switching
    showMonthPicker() {
      this.view = 'months';
    },

    showYearPicker() {
      this.view = 'years';
    },

    selectMonth(month) {
      this.currentDate = new Date(this.currentDate.getFullYear(), month, 1);
      this.view = 'days';
    },

    selectYear(year) {
      this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
      this.view = 'months';
    },

    get years() {
      const currentYear = this.currentDate.getFullYear();
      const startYear = currentYear - 6;
      const years = [];
      for (let i = 0; i < 12; i++) {
        years.push(startYear + i);
      }
      return years;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCalendar', calendarData);
  }
})();
