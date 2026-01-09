/**
 * UX Calendar Views Component
 * Week and day calendar views with events support
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Calendar Views - Base
    ======================================== */

    .ux-calendar-view {
      --ux-cv-hour-height: 60px;
      --ux-cv-time-width: 60px;
      --ux-cv-header-height: 80px;

      font-family: var(--ux-font-family);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-calendar-view__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar-view__nav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ux-calendar-view__nav-btn {
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
    }

    .ux-calendar-view__nav-btn:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-calendar-view__nav-btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-calendar-view__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-calendar-view__today-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: 1px solid var(--ux-primary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar-view__today-btn:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-calendar-view__view-toggle {
      display: flex;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      padding: 0.25rem;
    }

    .ux-calendar-view__view-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-calendar-view__view-btn:hover {
      color: var(--ux-text);
    }

    .ux-calendar-view__view-btn--active {
      background: var(--ux-surface);
      color: var(--ux-text);
      box-shadow: var(--ux-shadow-sm);
    }

    /* ========================================
       Week View - Day Headers
    ======================================== */

    .ux-calendar-view__day-headers {
      display: grid;
      grid-template-columns: var(--ux-cv-time-width) repeat(7, 1fr);
      border-bottom: 1px solid var(--ux-border-color);
      position: sticky;
      top: 0;
      background: var(--ux-surface);
      z-index: 10;
    }

    .ux-calendar-view__day-headers--single {
      grid-template-columns: var(--ux-cv-time-width) 1fr;
    }

    .ux-calendar-view__corner {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-calendar-view__day-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 0.5rem;
      text-align: center;
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-calendar-view__day-header:last-child {
      border-right: none;
    }

    .ux-calendar-view__day-name {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .ux-calendar-view__day-number {
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

    .ux-calendar-view__day-header--today .ux-calendar-view__day-number {
      background: var(--ux-primary);
      color: white;
    }

    .ux-calendar-view__day-header--selected .ux-calendar-view__day-number {
      background: var(--ux-primary);
      color: white;
    }

    /* ========================================
       Time Grid
    ======================================== */

    .ux-calendar-view__grid {
      display: grid;
      grid-template-columns: var(--ux-cv-time-width) repeat(7, 1fr);
      position: relative;
      max-height: 600px;
      overflow-y: auto;
    }

    .ux-calendar-view__grid--single {
      grid-template-columns: var(--ux-cv-time-width) 1fr;
    }

    .ux-calendar-view__times {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-calendar-view__time {
      height: var(--ux-cv-hour-height);
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 0 0.5rem;
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
      transform: translateY(-0.5em);
    }

    .ux-calendar-view__day-column {
      position: relative;
      border-right: 1px solid var(--ux-border-color);
      min-height: calc(var(--ux-cv-hour-height) * 24);
    }

    .ux-calendar-view__day-column:last-child {
      border-right: none;
    }

    .ux-calendar-view__hour-slot {
      height: var(--ux-cv-hour-height);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-calendar-view__hour-slot:last-child {
      border-bottom: none;
    }

    /* Half hour line */
    .ux-calendar-view__hour-slot::after {
      content: '';
      display: block;
      height: 50%;
      border-bottom: 1px dashed var(--ux-gray-100);
    }

    /* ========================================
       Current Time Indicator
    ======================================== */

    .ux-calendar-view__now-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--ux-danger);
      z-index: 5;
      pointer-events: none;
    }

    .ux-calendar-view__now-line::before {
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
       Events
    ======================================== */

    .ux-calendar-view__event {
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
    }

    .ux-calendar-view__event:hover {
      z-index: 3;
      box-shadow: var(--ux-shadow-md);
    }

    .ux-calendar-view__event-title {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-calendar-view__event-time {
      font-size: 0.6875rem;
      opacity: 0.8;
    }

    /* Event Colors */
    .ux-calendar-view__event--primary {
      background: rgba(var(--ux-primary-rgb), 0.9);
      color: white;
      border-left: 3px solid var(--ux-primary-shade);
    }

    .ux-calendar-view__event--success {
      background: rgba(var(--ux-success-rgb), 0.9);
      color: white;
      border-left: 3px solid var(--ux-green-600);
    }

    .ux-calendar-view__event--danger {
      background: rgba(var(--ux-danger-rgb), 0.9);
      color: white;
      border-left: 3px solid var(--ux-red-600);
    }

    .ux-calendar-view__event--warning {
      background: rgba(var(--ux-warning-rgb), 0.9);
      color: var(--ux-gray-900);
      border-left: 3px solid var(--ux-yellow-600);
    }

    .ux-calendar-view__event--secondary {
      background: rgba(var(--ux-gray-500-rgb, 107, 114, 128), 0.9);
      color: white;
      border-left: 3px solid var(--ux-gray-600);
    }

    /* All-day events */
    .ux-calendar-view__all-day {
      display: grid;
      grid-template-columns: var(--ux-cv-time-width) repeat(7, 1fr);
      padding: 0.25rem 0;
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-calendar-view__all-day--single {
      grid-template-columns: var(--ux-cv-time-width) 1fr;
    }

    .ux-calendar-view__all-day-label {
      font-size: 0.6875rem;
      color: var(--ux-text-tertiary);
      padding: 0.25rem 0.5rem;
      text-align: right;
    }

    .ux-calendar-view__all-day-events {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      padding: 0 0.25rem;
    }

    .ux-calendar-view__all-day-event {
      padding: 0.125rem 0.5rem;
      border-radius: var(--ux-radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-calendar-view__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-calendar-view__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-calendar-view {
        --ux-cv-time-width: 45px;
        --ux-cv-hour-height: 50px;
      }

      .ux-calendar-view__header {
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .ux-calendar-view__day-headers {
        grid-template-columns: var(--ux-cv-time-width) repeat(7, 1fr);
      }

      .ux-calendar-view__day-name {
        font-size: 0.625rem;
      }

      .ux-calendar-view__day-number {
        width: 28px;
        height: 28px;
        font-size: 0.875rem;
      }

      .ux-calendar-view__view-toggle {
        order: -1;
        width: 100%;
        justify-content: center;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-calendar-view {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-calendar-view__hour-slot::after {
        border-color: var(--ux-gray-800);
      }
    }

    .ux-dark .ux-calendar-view {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-calendar-view__hour-slot::after {
      border-color: var(--ux-gray-800);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-calendar-view__nav-btn,
      .ux-calendar-view__today-btn,
      .ux-calendar-view__view-btn,
      .ux-calendar-view__event {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-calendar-views-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-calendar-views-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  };

  // Day names
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayNamesLong = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Alpine.js component
  const calendarViewData = (options = {}) => ({
    // Configuration
    view: options.view || 'week', // 'week', 'day'
    startHour: options.startHour ?? 0,
    endHour: options.endHour ?? 24,
    hourHeight: options.hourHeight || 60,
    events: options.events || [],

    // State
    currentDate: options.initialDate ? new Date(options.initialDate) : new Date(),
    selectedDate: null,
    nowLineTop: 0,
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

    // Get title
    get title() {
      if (this.view === 'day') {
        return `${this.dayNamesLong[this.currentDate.getDay()]}, ${this.currentDate.getDate()} de ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      }

      const weekStart = this.getWeekStart(this.currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${weekStart.getDate()} - ${weekEnd.getDate()} de ${this.monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
      }

      return `${weekStart.getDate()} ${this.monthNames[weekStart.getMonth()].substring(0, 3)} - ${weekEnd.getDate()} ${this.monthNames[weekEnd.getMonth()].substring(0, 3)} ${weekEnd.getFullYear()}`;
    },

    // Get week start (Sunday)
    getWeekStart(date) {
      const d = new Date(date);
      const day = d.getDay();
      d.setDate(d.getDate() - day);
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
          isSelected: this.isSameDay(d, this.selectedDate)
        });
      }

      return days;
    },

    // Get hours
    get hours() {
      const hours = [];
      for (let i = this.startHour; i < this.endHour; i++) {
        hours.push({
          value: i,
          label: `${i.toString().padStart(2, '0')}:00`
        });
      }
      return hours;
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

    // Navigate
    prev() {
      if (this.view === 'day') {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
      } else {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
      }
      this.currentDate = new Date(this.currentDate);
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    next() {
      if (this.view === 'day') {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      } else {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
      }
      this.currentDate = new Date(this.currentDate);
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    goToToday() {
      this.currentDate = new Date();
      this.selectedDate = new Date();
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    setView(view) {
      this.view = view;
      this.$dispatch('calendar:viewchange', { view });
    },

    selectDay(date) {
      this.selectedDate = date;
      if (this.view === 'week') {
        this.currentDate = new Date(date);
        this.view = 'day';
      }
      this.$dispatch('calendar:dayselect', { date });
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

    // Get events for a specific day
    getEventsForDay(date) {
      return this.events.filter(event => {
        const eventDate = new Date(event.start);
        return this.isSameDay(eventDate, date) && !event.allDay;
      });
    },

    // Get all-day events for a specific day
    getAllDayEventsForDay(date) {
      return this.events.filter(event => {
        const eventDate = new Date(event.start);
        return this.isSameDay(eventDate, date) && event.allDay;
      });
    },

    // Get event position and height
    getEventStyle(event) {
      const start = new Date(event.start);
      const end = new Date(event.end);

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

    // Format time
    formatTime(date) {
      const d = new Date(date);
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    },

    // Add event
    addEvent(event) {
      this.events.push(event);
      this.$dispatch('calendar:eventadd', { event });
    },

    // Remove event
    removeEvent(eventId) {
      const index = this.events.findIndex(e => e.id === eventId);
      if (index !== -1) {
        const event = this.events.splice(index, 1)[0];
        this.$dispatch('calendar:eventremove', { event });
      }
    },

    // Click event handler
    onEventClick(event) {
      this.$dispatch('calendar:eventclick', { event });
    },

    // Set events
    setEvents(events) {
      this.events = events;
    },

    // Check if current day column should show now line
    shouldShowNowLine(date) {
      return this.isToday(date);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCalendarView', calendarViewData);
  }

})();
