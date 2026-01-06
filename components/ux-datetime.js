/**
 * UX Datetime Component
 * Selectores de fecha y hora estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Datetime Input
    ======================================== */

    .ux-datetime {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-datetime__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-datetime__trigger {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datetime__trigger:hover {
      border-color: var(--ux-medium);
    }

    .ux-datetime--open .ux-datetime__trigger {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-datetime__value {
      flex: 1;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-datetime__placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-datetime__icon {
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-sm);
      color: var(--ux-text-secondary);
    }

    .ux-datetime__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Native Date/Time Input (styled)
    ======================================== */

    .ux-datetime__native {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: 16px;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-datetime__native:hover {
      border-color: var(--ux-medium);
    }

    .ux-datetime__native:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-datetime__native::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
    }

    .ux-datetime__native::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }

    /* ========================================
       Datetime Picker (Custom)
    ======================================== */

    .ux-datetime-picker {
      position: absolute;
      top: calc(100% + var(--ux-space-xs));
      left: 0;
      min-width: 280px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      z-index: 100;
      overflow: hidden;
    }

    /* ========================================
       Calendar Header
    ======================================== */

    .ux-calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      border-radius: 50%;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__nav:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-calendar__nav:active {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-calendar__nav:disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .ux-calendar__nav-icon {
      width: 20px;
      height: 20px;
    }

    .ux-calendar__nav-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-calendar__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      cursor: pointer;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius-sm);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__title:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Calendar Grid
    ======================================== */

    .ux-calendar__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar__weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
    }

    .ux-calendar__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--ux-space-sm);
      gap: 2px;
    }

    .ux-calendar__day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin: auto;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      background: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__day:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-calendar__day--other-month {
      color: var(--ux-text-tertiary);
    }

    .ux-calendar__day--today {
      font-weight: 600;
      color: var(--ux-primary);
    }

    .ux-calendar__day--selected {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-calendar__day--selected:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-calendar__day--disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .ux-calendar__day--range-start {
      border-radius: 50% 0 0 50%;
    }

    .ux-calendar__day--range-end {
      border-radius: 0 50% 50% 0;
    }

    .ux-calendar__day--in-range {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      border-radius: 0;
    }

    /* ========================================
       Month/Year Selector
    ======================================== */

    .ux-calendar__months,
    .ux-calendar__years {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
    }

    .ux-calendar__month,
    .ux-calendar__year {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar__month:hover,
    .ux-calendar__year:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-calendar__month--selected,
    .ux-calendar__year--selected {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Time Picker
    ======================================== */

    .ux-time-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
      gap: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-time-picker__column {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ux-time-picker__label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-time-picker__input {
      width: 60px;
      height: 44px;
      padding: 0;
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      text-align: center;
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-border-radius);
      outline: none;
      -moz-appearance: textfield;
    }

    .ux-time-picker__input::-webkit-outer-spin-button,
    .ux-time-picker__input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .ux-time-picker__input:focus {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-time-picker__separator {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      padding-top: var(--ux-space-md);
    }

    .ux-time-picker__period {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-left: var(--ux-space-sm);
    }

    .ux-time-picker__period-btn {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-time-picker__period-btn:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-time-picker__period-btn--active {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Datetime Footer
    ======================================== */

    .ux-datetime-picker__footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Inline Calendar
    ======================================== */

    .ux-calendar--inline {
      position: static;
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-datetime--sm .ux-datetime__trigger,
    .ux-datetime--sm .ux-datetime__native {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-datetime--lg .ux-datetime__trigger,
    .ux-datetime--lg .ux-datetime__native {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-datetime--glass .ux-datetime__trigger {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-datetime--glass .ux-datetime__trigger:hover {
      background: var(--ux-glass-bg);
    }

    .ux-calendar--glass {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-calendar--glass .ux-calendar__header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-calendar--glass .ux-calendar__day:hover:not(.ux-calendar__day--selected) {
      background: var(--ux-glass-bg-thin);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-datetime-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-datetime-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for datetime picker
  const datetimeComponent = (config = {}) => ({
    isOpen: false,
    value: config.value || null,
    displayValue: '',
    mode: config.mode || 'date', // date, time, datetime
    view: 'days', // days, months, years
    format: config.format || 'YYYY-MM-DD',
    min: config.min || null,
    max: config.max || null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    hours: 12,
    minutes: 0,
    period: 'AM',
    use24Hour: config.use24Hour || false,

    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    init() {
      if (this.value) {
        const date = new Date(this.value);
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.updateDisplayValue();
      }
    },

    open() {
      this.isOpen = true;
      this.view = 'days';
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    get daysInMonth() {
      const days = [];
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

      // Days from previous month
      const startDay = firstDay.getDay();
      const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          day: prevMonth.getDate() - i,
          month: this.currentMonth - 1,
          year: this.currentYear,
          isOtherMonth: true
        });
      }

      // Days in current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
          day: i,
          month: this.currentMonth,
          year: this.currentYear,
          isOtherMonth: false
        });
      }

      // Days from next month
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          month: this.currentMonth + 1,
          year: this.currentYear,
          isOtherMonth: true
        });
      }

      return days;
    },

    isToday(date) {
      const today = new Date();
      return date.day === today.getDate() &&
             date.month === today.getMonth() &&
             date.year === today.getFullYear();
    },

    isSelected(date) {
      if (!this.value) return false;
      const selected = new Date(this.value);
      return date.day === selected.getDate() &&
             date.month === selected.getMonth() &&
             date.year === selected.getFullYear();
    },

    selectDate(date) {
      const selected = new Date(date.year, date.month, date.day, this.hours, this.minutes);
      this.value = selected.toISOString();
      this.currentMonth = date.month;
      this.currentYear = date.year;
      this.updateDisplayValue();

      if (this.mode === 'date') {
        this.close();
      }
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },

    selectMonth(month) {
      this.currentMonth = month;
      this.view = 'days';
    },

    selectYear(year) {
      this.currentYear = year;
      this.view = 'months';
    },

    updateDisplayValue() {
      if (!this.value) {
        this.displayValue = '';
        return;
      }

      const date = new Date(this.value);
      const options = {};

      if (this.mode === 'date' || this.mode === 'datetime') {
        options.year = 'numeric';
        options.month = 'short';
        options.day = 'numeric';
      }

      if (this.mode === 'time' || this.mode === 'datetime') {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = !this.use24Hour;
      }

      this.displayValue = date.toLocaleString(undefined, options);
    },

    confirm() {
      this.updateDisplayValue();
      this.close();
    },

    clear() {
      this.value = null;
      this.displayValue = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxDatetime', datetimeComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxDatetime', datetimeComponent);
    });
  }
})();
