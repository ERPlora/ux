/**
 * UX Date Range Picker Component
 * Select date ranges with presets and dual calendar view
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Date Range Picker - Base
    ======================================== */

    .ux-date-range {
      position: relative;
      display: inline-block;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Trigger Button
    ======================================== */

    .ux-date-range__trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 280px;
      height: var(--ux-input-height);
      padding: 0 var(--ux-input-padding-x);
      font-size: var(--ux-input-font-size);
      color: var(--ux-text);
      background: var(--ux-surface);
      border: var(--ux-input-border-width) solid var(--ux-border-color);
      border-radius: var(--ux-input-border-radius);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range__trigger:hover {
      border-color: var(--ux-gray-400);
    }

    .ux-date-range__trigger:focus {
      outline: none;
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-date-range__trigger-icon {
      width: 18px;
      height: 18px;
      color: var(--ux-text-secondary);
      flex-shrink: 0;
    }

    .ux-date-range__trigger-text {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-date-range__trigger-text--placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-date-range__trigger-arrow {
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range--open .ux-date-range__trigger-arrow {
      transform: rotate(180deg);
    }

    /* ========================================
       Dropdown Panel
    ======================================== */

    .ux-date-range__panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: var(--ux-z-dropdown);
      display: none;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      overflow: hidden;
    }

    .ux-date-range--open .ux-date-range__panel {
      display: flex;
    }

    .ux-date-range__panel--right {
      left: auto;
      right: 0;
    }

    /* ========================================
       Presets Sidebar
    ======================================== */

    .ux-date-range__presets {
      width: 160px;
      padding: 0.5rem;
      background: var(--ux-surface-secondary);
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-date-range__preset {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      text-align: left;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range__preset:hover {
      background: var(--ux-surface);
    }

    .ux-date-range__preset--active {
      background: var(--ux-primary);
      color: white;
    }

    .ux-date-range__preset--active:hover {
      background: var(--ux-primary-shade);
    }

    /* ========================================
       Calendars
    ======================================== */

    .ux-date-range__calendars {
      display: flex;
      padding: 1rem;
      gap: 1.5rem;
    }

    .ux-date-range__calendar {
      width: 280px;
    }

    .ux-date-range__calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .ux-date-range__calendar-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-date-range__calendar-nav {
      display: flex;
      gap: 0.25rem;
    }

    .ux-date-range__nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range__nav-btn:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-date-range__nav-btn svg {
      width: 16px;
      height: 16px;
    }

    /* Weekdays */
    .ux-date-range__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 0.25rem;
    }

    .ux-date-range__weekday {
      padding: 0.5rem 0;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-tertiary);
      text-align: center;
      text-transform: uppercase;
    }

    /* Days Grid */
    .ux-date-range__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .ux-date-range__day {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      font-size: 0.875rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range__day:hover:not(:disabled):not(.ux-date-range__day--outside) {
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-sm);
    }

    .ux-date-range__day--outside {
      color: var(--ux-text-tertiary);
      cursor: default;
    }

    .ux-date-range__day--today {
      font-weight: 600;
      color: var(--ux-primary);
    }

    .ux-date-range__day--disabled {
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Selected Range */
    .ux-date-range__day--start,
    .ux-date-range__day--end {
      background: var(--ux-primary);
      color: white;
      border-radius: var(--ux-radius-sm);
      z-index: 1;
    }

    .ux-date-range__day--start:hover,
    .ux-date-range__day--end:hover {
      background: var(--ux-primary-shade);
    }

    .ux-date-range__day--in-range {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-date-range__day--start {
      border-radius: var(--ux-radius-sm) 0 0 var(--ux-radius-sm);
    }

    .ux-date-range__day--end {
      border-radius: 0 var(--ux-radius-sm) var(--ux-radius-sm) 0;
    }

    .ux-date-range__day--start.ux-date-range__day--end {
      border-radius: var(--ux-radius-sm);
    }

    /* ========================================
       Footer
    ======================================== */

    .ux-date-range__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-date-range__selected {
      font-size: 0.875rem;
      color: var(--ux-text-secondary);
    }

    .ux-date-range__actions {
      display: flex;
      gap: 0.5rem;
    }

    .ux-date-range__btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-date-range__btn--cancel {
      color: var(--ux-text-secondary);
      background: transparent;
      border: 1px solid var(--ux-border-color);
    }

    .ux-date-range__btn--cancel:hover {
      background: var(--ux-surface);
    }

    .ux-date-range__btn--apply {
      color: white;
      background: var(--ux-primary);
      border: 1px solid var(--ux-primary);
    }

    .ux-date-range__btn--apply:hover {
      background: var(--ux-primary-shade);
    }

    .ux-date-range__btn--apply:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ========================================
       Single Calendar Mode
    ======================================== */

    .ux-date-range--single .ux-date-range__calendars {
      padding: 0.75rem;
    }

    .ux-date-range--single .ux-date-range__calendar {
      width: 260px;
    }

    /* ========================================
       No Presets
    ======================================== */

    .ux-date-range--no-presets .ux-date-range__presets {
      display: none;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-date-range--sm .ux-date-range__trigger {
      height: var(--ux-input-height-sm);
      min-width: 220px;
      font-size: var(--ux-font-size-sm);
    }

    .ux-date-range--lg .ux-date-range__trigger {
      height: var(--ux-input-height-lg);
      min-width: 320px;
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Mobile
    ======================================== */

    @media (max-width: 767px) {
      .ux-date-range__panel {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        flex-direction: column;
        max-height: 85dvh;
        border-radius: var(--ux-radius-lg) var(--ux-radius-lg) 0 0;
      }

      .ux-date-range__presets {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        padding: 0.75rem;
        border-right: none;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-date-range__preset {
        flex: 0 0 auto;
        padding: 0.375rem 0.625rem;
        font-size: 0.8125rem;
      }

      .ux-date-range__calendars {
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
      }

      .ux-date-range__calendar {
        width: 100%;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-date-range__panel {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-date-range__presets {
        background: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-date-range__panel {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-date-range__presets {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-date-range__trigger,
      .ux-date-range__trigger-arrow,
      .ux-date-range__preset,
      .ux-date-range__nav-btn,
      .ux-date-range__day,
      .ux-date-range__btn {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-date-range-picker-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-date-range-picker-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
  };

  // Default presets
  const defaultPresets = [
    { label: 'Hoy', getValue: () => { const d = new Date(); return [d, d]; } },
    { label: 'Ayer', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return [d, d]; } },
    { label: 'Últimos 7 días', getValue: () => { const e = new Date(); const s = new Date(); s.setDate(s.getDate() - 6); return [s, e]; } },
    { label: 'Últimos 30 días', getValue: () => { const e = new Date(); const s = new Date(); s.setDate(s.getDate() - 29); return [s, e]; } },
    { label: 'Este mes', getValue: () => { const e = new Date(); const s = new Date(e.getFullYear(), e.getMonth(), 1); return [s, e]; } },
    { label: 'Mes pasado', getValue: () => { const e = new Date(); const s = new Date(e.getFullYear(), e.getMonth() - 1, 1); e.setDate(0); return [s, e]; } },
    { label: 'Este año', getValue: () => { const e = new Date(); const s = new Date(e.getFullYear(), 0, 1); return [s, e]; } }
  ];

  // Weekday names
  const weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Alpine.js component
  const dateRangePickerData = (options = {}) => ({
    // Configuration
    placeholder: options.placeholder || 'Seleccionar fechas',
    format: options.format || 'DD/MM/YYYY',
    locale: options.locale || 'es',
    minDate: options.minDate ? new Date(options.minDate) : null,
    maxDate: options.maxDate ? new Date(options.maxDate) : null,
    showPresets: options.showPresets ?? true,
    presets: options.presets || defaultPresets,
    singleCalendar: options.singleCalendar ?? false,
    autoApply: options.autoApply ?? false,

    // State
    isOpen: false,
    startDate: options.startDate ? new Date(options.startDate) : null,
    endDate: options.endDate ? new Date(options.endDate) : null,
    tempStartDate: null,
    tempEndDate: null,
    hoverDate: null,
    leftMonth: new Date(),
    rightMonth: new Date(),
    selectedPreset: null,

    // Icons
    icons,
    weekdays,
    monthNames,

    init() {
      // Initialize months
      const now = new Date();
      this.leftMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      this.rightMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      // Set initial temp dates
      this.tempStartDate = this.startDate;
      this.tempEndDate = this.endDate;

      // Close on outside click
      this._clickHandler = (e) => {
        if (this.isOpen && !this.$el.contains(e.target)) {
          this.close();
        }
      };
      document.addEventListener('click', this._clickHandler);

      // Keyboard navigation
      this._keyHandler = (e) => {
        if (!this.isOpen) return;
        if (e.key === 'Escape') this.close();
      };
      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      document.removeEventListener('click', this._clickHandler);
      document.removeEventListener('keydown', this._keyHandler);
    },

    // Open dropdown
    open() {
      this.isOpen = true;
      this.tempStartDate = this.startDate;
      this.tempEndDate = this.endDate;
      this.$dispatch('daterange:open');
    },

    // Close dropdown
    close() {
      this.isOpen = false;
      this.hoverDate = null;
      this.$dispatch('daterange:close');
    },

    // Toggle dropdown
    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    // Apply selection
    apply() {
      this.startDate = this.tempStartDate;
      this.endDate = this.tempEndDate;
      this.close();
      this.$dispatch('daterange:change', {
        startDate: this.startDate,
        endDate: this.endDate
      });
    },

    // Cancel selection
    cancel() {
      this.tempStartDate = this.startDate;
      this.tempEndDate = this.endDate;
      this.close();
    },

    // Clear selection
    clear() {
      this.startDate = null;
      this.endDate = null;
      this.tempStartDate = null;
      this.tempEndDate = null;
      this.selectedPreset = null;
      this.$dispatch('daterange:clear');
    },

    // Select preset
    selectPreset(preset) {
      const [start, end] = preset.getValue();
      this.tempStartDate = start;
      this.tempEndDate = end;
      this.selectedPreset = preset.label;

      // Update visible months
      this.leftMonth = new Date(start.getFullYear(), start.getMonth(), 1);
      this.rightMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);

      if (this.autoApply) {
        this.apply();
      }
    },

    // Handle day click
    selectDay(date) {
      if (this.isDisabled(date)) return;

      if (!this.tempStartDate || (this.tempStartDate && this.tempEndDate)) {
        // Start new selection
        this.tempStartDate = date;
        this.tempEndDate = null;
        this.selectedPreset = null;
      } else {
        // Complete selection
        if (date < this.tempStartDate) {
          this.tempEndDate = this.tempStartDate;
          this.tempStartDate = date;
        } else {
          this.tempEndDate = date;
        }

        if (this.autoApply) {
          this.apply();
        }
      }
    },

    // Handle day hover
    hoverDay(date) {
      if (this.tempStartDate && !this.tempEndDate) {
        this.hoverDate = date;
      }
    },

    // Navigate months
    prevMonth(calendar) {
      if (calendar === 'left') {
        this.leftMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() - 1, 1);
        if (!this.singleCalendar) {
          this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
        }
      } else {
        this.rightMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() - 1, 1);
      }
    },

    nextMonth(calendar) {
      if (calendar === 'left') {
        this.leftMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
        if (!this.singleCalendar) {
          this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
        }
      } else {
        this.rightMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() + 1, 1);
      }
    },

    // Get days for a month
    getDays(month) {
      const days = [];
      const year = month.getFullYear();
      const m = month.getMonth();

      // First day of month
      const firstDay = new Date(year, m, 1);
      // Last day of month
      const lastDay = new Date(year, m + 1, 0);

      // Day of week for first day (0 = Sunday, adjust for Monday start)
      let startDay = firstDay.getDay();
      startDay = startDay === 0 ? 6 : startDay - 1;

      // Days from previous month
      for (let i = startDay - 1; i >= 0; i--) {
        const d = new Date(year, m, -i);
        days.push({ date: d, outside: true });
      }

      // Days of current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const d = new Date(year, m, i);
        days.push({ date: d, outside: false });
      }

      // Days from next month (fill to 42 cells)
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, m + 1, i);
        days.push({ date: d, outside: true });
      }

      return days;
    },

    // Check if date is disabled
    isDisabled(date) {
      if (this.minDate && date < this.minDate) return true;
      if (this.maxDate && date > this.maxDate) return true;
      return false;
    },

    // Check if date is today
    isToday(date) {
      const today = new Date();
      return this.isSameDay(date, today);
    },

    // Check if two dates are same day
    isSameDay(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() &&
             d1.getMonth() === d2.getMonth() &&
             d1.getDate() === d2.getDate();
    },

    // Check if date is start
    isStart(date) {
      return this.tempStartDate && this.isSameDay(date, this.tempStartDate);
    },

    // Check if date is end
    isEnd(date) {
      const end = this.tempEndDate || this.hoverDate;
      return end && this.isSameDay(date, end);
    },

    // Check if date is in range
    isInRange(date) {
      if (!this.tempStartDate) return false;
      const end = this.tempEndDate || this.hoverDate;
      if (!end) return false;

      const start = this.tempStartDate < end ? this.tempStartDate : end;
      const endDate = this.tempStartDate < end ? end : this.tempStartDate;

      return date > start && date < endDate;
    },

    // Get day classes
    getDayClasses(day) {
      return {
        'ux-date-range__day--outside': day.outside,
        'ux-date-range__day--today': this.isToday(day.date),
        'ux-date-range__day--disabled': this.isDisabled(day.date),
        'ux-date-range__day--start': this.isStart(day.date),
        'ux-date-range__day--end': this.isEnd(day.date),
        'ux-date-range__day--in-range': this.isInRange(day.date)
      };
    },

    // Format date
    formatDate(date) {
      if (!date) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return this.format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year);
    },

    // Get display text
    get displayText() {
      if (!this.startDate && !this.endDate) {
        return '';
      }
      if (this.startDate && this.endDate) {
        if (this.isSameDay(this.startDate, this.endDate)) {
          return this.formatDate(this.startDate);
        }
        return `${this.formatDate(this.startDate)} - ${this.formatDate(this.endDate)}`;
      }
      return this.formatDate(this.startDate);
    },

    // Get selected text (for footer)
    get selectedText() {
      if (!this.tempStartDate) return 'Selecciona fecha inicio';
      if (!this.tempEndDate) return 'Selecciona fecha fin';
      return `${this.formatDate(this.tempStartDate)} - ${this.formatDate(this.tempEndDate)}`;
    },

    // Get month title
    getMonthTitle(month) {
      return `${this.monthNames[month.getMonth()]} ${month.getFullYear()}`;
    },

    // Check if can apply
    get canApply() {
      return this.tempStartDate && this.tempEndDate;
    },

    // Set dates programmatically
    setDates(start, end) {
      this.startDate = start ? new Date(start) : null;
      this.endDate = end ? new Date(end) : null;
      this.tempStartDate = this.startDate;
      this.tempEndDate = this.endDate;

      if (this.startDate) {
        this.leftMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
        this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
      }

      this.$dispatch('daterange:change', { startDate: this.startDate, endDate: this.endDate });
    },

    // Get dates
    getDates() {
      return { startDate: this.startDate, endDate: this.endDate };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxDateRangePicker', dateRangePickerData);
  }

})();
