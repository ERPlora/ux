/**
 * UX Time Clock Component
 * Employee time tracking with clock in/out, breaks, and history
 * @requires ux-core.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Time Clock
    ======================================== */

    :root {
      --ux-time-clock-padding: var(--ux-space-lg);
      --ux-time-clock-border-radius: var(--ux-border-radius-xl);
      --ux-time-clock-time-size: 4rem;
      --ux-time-clock-date-size: var(--ux-font-size-md);
    }

    .ux-time-clock {
      background: var(--ux-surface);
      border-radius: var(--ux-time-clock-border-radius);
      overflow: hidden;
      box-shadow: var(--ux-shadow-md);
    }

    /* ========================================
       Time Clock Display
    ======================================== */

    .ux-time-clock__display {
      padding: var(--ux-space-2xl) var(--ux-time-clock-padding);
      text-align: center;
      background: linear-gradient(180deg, var(--ux-surface) 0%, var(--ux-surface-secondary) 100%);
    }

    .ux-time-clock__time {
      font-size: var(--ux-time-clock-time-size);
      font-weight: 200;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.1;
    }

    .ux-time-clock__time-seconds {
      font-size: calc(var(--ux-time-clock-time-size) * 0.5);
      color: var(--ux-text-secondary);
      vertical-align: super;
      margin-left: var(--ux-space-xs);
    }

    .ux-time-clock__date {
      font-size: var(--ux-time-clock-date-size);
      color: var(--ux-text-secondary);
      margin: var(--ux-space-sm) 0 0;
    }

    /* ========================================
       Status Indicator
    ======================================== */

    .ux-time-clock__status {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-xs) var(--ux-space-md);
      border-radius: var(--ux-border-radius-full);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      margin-top: var(--ux-space-md);
      background: var(--ux-gray-100);
      color: var(--ux-text-secondary);
    }

    .ux-time-clock__status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ux-gray-400);
    }

    /* Clocked In State */
    .ux-time-clock--clocked-in .ux-time-clock__status {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }

    .ux-time-clock--clocked-in .ux-time-clock__status-dot {
      background: var(--ux-success);
      animation: ux-time-clock-pulse 2s ease-in-out infinite;
    }

    /* On Break State */
    .ux-time-clock--on-break .ux-time-clock__status {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning);
    }

    .ux-time-clock--on-break .ux-time-clock__status-dot {
      background: var(--ux-warning);
      animation: ux-time-clock-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-time-clock-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.9); }
    }

    /* ========================================
       Work Counter
    ======================================== */

    .ux-time-clock__counter {
      display: flex;
      justify-content: center;
      gap: var(--ux-space-xl);
      padding: var(--ux-space-lg) var(--ux-time-clock-padding);
      border-top: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-time-clock__counter-item {
      text-align: center;
    }

    .ux-time-clock__counter-value {
      font-size: var(--ux-font-size-2xl);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
      line-height: 1.2;
    }

    .ux-time-clock__counter-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: var(--ux-space-xs);
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-time-clock__actions {
      display: flex;
      gap: var(--ux-space-md);
      padding: var(--ux-time-clock-padding);
    }

    .ux-time-clock__actions .ux-button {
      flex: 1;
    }

    .ux-time-clock__actions--stacked {
      flex-direction: column;
    }

    /* ========================================
       History
    ======================================== */

    .ux-time-clock__history {
      padding: 0 var(--ux-time-clock-padding) var(--ux-time-clock-padding);
    }

    .ux-time-clock__history-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 var(--ux-space-md);
    }

    .ux-time-clock__history-list {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 200px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-time-clock__history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) 0;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-time-clock__history-item:last-child {
      border-bottom: none;
    }

    .ux-time-clock__history-type {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
    }

    .ux-time-clock__history-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ux-time-clock__history-icon svg {
      width: 12px;
      height: 12px;
    }

    .ux-time-clock__history-icon--clock-in {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }

    .ux-time-clock__history-icon--clock-out {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-time-clock__history-icon--break-start {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning);
    }

    .ux-time-clock__history-icon--break-end {
      background: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-time-clock__history-time {
      font-size: var(--ux-font-size-sm);
      font-variant-numeric: tabular-nums;
      color: var(--ux-text-secondary);
    }

    .ux-time-clock__history-empty {
      text-align: center;
      padding: var(--ux-space-lg);
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Confirmation Dialog
    ======================================== */

    .ux-time-clock__confirm {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: var(--ux-z-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-time-clock__confirm--open {
      opacity: 1;
      visibility: visible;
    }

    .ux-time-clock__confirm-dialog {
      width: 100%;
      max-width: 300px;
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-radius: var(--ux-glass-radius-md);
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
      overflow: hidden;
      transform: scale(1.1);
      opacity: 0;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-time-clock__confirm--open .ux-time-clock__confirm-dialog {
      transform: scale(1);
      opacity: 1;
    }

    .ux-time-clock__confirm-content {
      padding: var(--ux-space-lg);
      text-align: center;
    }

    .ux-time-clock__confirm-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-time-clock__confirm-message {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-time-clock__confirm-buttons {
      display: flex;
      border-top: 0.5px solid var(--ux-glass-border);
    }

    .ux-time-clock__confirm-button {
      flex: 1;
      min-height: 44px;
      padding: var(--ux-space-sm);
      background: none;
      border: none;
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      color: var(--ux-primary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-time-clock__confirm-button:first-child {
      border-right: 0.5px solid var(--ux-glass-border);
    }

    .ux-time-clock__confirm-button:hover {
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-time-clock__confirm-button:active {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-time-clock__confirm-button--primary {
      font-weight: 600;
    }

    .ux-time-clock__confirm-button--danger {
      color: var(--ux-danger);
    }

    .ux-time-clock__confirm-button--danger:hover {
      background: rgba(var(--ux-danger-rgb), 0.05);
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-time-clock--compact .ux-time-clock__display {
      padding: var(--ux-space-lg) var(--ux-time-clock-padding);
    }

    .ux-time-clock--compact .ux-time-clock__time {
      font-size: calc(var(--ux-time-clock-time-size) * 0.75);
    }

    .ux-time-clock--compact .ux-time-clock__counter {
      padding: var(--ux-space-md) var(--ux-time-clock-padding);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    .ux-time-clock--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-time-clock--glass .ux-time-clock__display {
      background: transparent;
    }

    .ux-time-clock--glass .ux-time-clock__counter {
      border-color: var(--ux-glass-border);
    }

    .ux-time-clock--glass .ux-time-clock__history-item {
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-time-clock {
        box-shadow: var(--ux-shadow-lg);
      }

      .ux-time-clock__display {
        background: linear-gradient(180deg, var(--ux-surface) 0%, var(--ux-surface-secondary) 100%);
      }

      .ux-time-clock__status {
        background: var(--ux-gray-800);
      }
    }

    .ux-dark .ux-time-clock {
      box-shadow: var(--ux-shadow-lg);
    }

    .ux-dark .ux-time-clock__display {
      background: linear-gradient(180deg, var(--ux-surface) 0%, var(--ux-surface-secondary) 100%);
    }

    .ux-dark .ux-time-clock__status {
      background: var(--ux-gray-800);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      :root {
        --ux-time-clock-time-size: 3rem;
      }

      .ux-time-clock__counter {
        gap: var(--ux-space-lg);
      }

      .ux-time-clock__actions {
        flex-direction: column;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-time-clock__status-dot {
        animation: none;
      }

      .ux-time-clock__confirm {
        transition: none;
      }

      .ux-time-clock__confirm-dialog {
        transition: none;
        transform: none;
      }

      .ux-time-clock__confirm--open .ux-time-clock__confirm-dialog {
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-time-clock-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-time-clock-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  /**
   * Alpine.js component for Time Clock
   * @param {Object} config - Configuration options
   * @param {boolean} config.showSeconds - Show seconds in time display (default: true)
   * @param {boolean} config.confirmActions - Show confirmation dialog before actions (default: true)
   * @param {string} config.dateLocale - Locale for date formatting (default: 'en-US')
   * @param {Function} config.onClockIn - Callback when clocking in
   * @param {Function} config.onClockOut - Callback when clocking out
   * @param {Function} config.onBreakStart - Callback when starting break
   * @param {Function} config.onBreakEnd - Callback when ending break
   */
  const timeClockComponent = (config = {}) => ({
    // Configuration
    showSeconds: config.showSeconds !== false,
    confirmActions: config.confirmActions !== false,
    dateLocale: config.dateLocale || 'en-US',

    // State
    currentTime: new Date(),
    isClockedIn: false,
    isOnBreak: false,
    clockInTime: null,
    breakStartTime: null,
    entries: [],
    totalWorkedMs: 0,
    totalBreakMs: 0,

    // Confirmation dialog state
    confirmOpen: false,
    confirmTitle: '',
    confirmMessage: '',
    confirmAction: null,
    confirmIsDanger: false,

    // Timer intervals
    _clockInterval: null,
    _workedInterval: null,

    // Callbacks
    _onClockIn: config.onClockIn || null,
    _onClockOut: config.onClockOut || null,
    _onBreakStart: config.onBreakStart || null,
    _onBreakEnd: config.onBreakEnd || null,

    // Computed: current status text
    get currentStatus() {
      if (this.isOnBreak) return 'On Break';
      if (this.isClockedIn) return 'Clocked In';
      return 'Clocked Out';
    },

    // Computed: formatted current time
    get formattedTime() {
      const hours = this.currentTime.getHours();
      const minutes = this.currentTime.getMinutes();
      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      return `${h}:${m}`;
    },

    // Computed: formatted seconds
    get formattedSeconds() {
      return this.currentTime.getSeconds().toString().padStart(2, '0');
    },

    // Computed: formatted date
    get formattedDate() {
      return this.currentTime.toLocaleDateString(this.dateLocale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Computed: total worked time formatted
    get totalWorkedTime() {
      let total = this.totalWorkedMs;

      // Add current session if clocked in and not on break
      if (this.isClockedIn && !this.isOnBreak && this.clockInTime) {
        total += Date.now() - this.clockInTime.getTime();
      }

      return this._formatDuration(total);
    },

    // Computed: total break time formatted
    get totalBreakTime() {
      let total = this.totalBreakMs;

      // Add current break if on break
      if (this.isOnBreak && this.breakStartTime) {
        total += Date.now() - this.breakStartTime.getTime();
      }

      return this._formatDuration(total);
    },

    // Initialize component
    init() {
      // Start clock update interval
      this._clockInterval = setInterval(() => {
        this.currentTime = new Date();
      }, 1000);

      // Start worked time update interval (for live counter)
      this._workedInterval = setInterval(() => {
        // Force reactivity update by reassigning
        if (this.isClockedIn) {
          this.totalWorkedMs = this.totalWorkedMs;
        }
      }, 1000);

      // Load saved state from localStorage if available
      this._loadState();
    },

    // Cleanup on destroy
    destroy() {
      if (this._clockInterval) {
        clearInterval(this._clockInterval);
      }
      if (this._workedInterval) {
        clearInterval(this._workedInterval);
      }
    },

    // Clock In
    clockIn() {
      if (this.confirmActions) {
        this._showConfirm(
          'Clock In',
          'Are you ready to start your shift?',
          () => this._doClockIn(),
          false
        );
      } else {
        this._doClockIn();
      }
    },

    _doClockIn() {
      const now = new Date();
      this.isClockedIn = true;
      this.isOnBreak = false;
      this.clockInTime = now;

      this.entries.unshift({
        type: 'clock-in',
        time: now,
        label: 'Clock In'
      });

      this._saveState();

      if (this._onClockIn) {
        this._onClockIn({ time: now, entries: this.entries });
      }

      this.$dispatch('timeclock:clockin', { time: now });
    },

    // Clock Out
    clockOut() {
      if (this.confirmActions) {
        this._showConfirm(
          'Clock Out',
          'Are you sure you want to end your shift?',
          () => this._doClockOut(),
          true
        );
      } else {
        this._doClockOut();
      }
    },

    _doClockOut() {
      const now = new Date();

      // End any active break first
      if (this.isOnBreak && this.breakStartTime) {
        this.totalBreakMs += now.getTime() - this.breakStartTime.getTime();
        this.isOnBreak = false;
        this.breakStartTime = null;
      }

      // Calculate worked time for this session
      if (this.clockInTime) {
        this.totalWorkedMs += now.getTime() - this.clockInTime.getTime();
      }

      this.isClockedIn = false;
      this.clockInTime = null;

      this.entries.unshift({
        type: 'clock-out',
        time: now,
        label: 'Clock Out'
      });

      this._saveState();

      if (this._onClockOut) {
        this._onClockOut({
          time: now,
          totalWorked: this.totalWorkedMs,
          totalBreak: this.totalBreakMs,
          entries: this.entries
        });
      }

      this.$dispatch('timeclock:clockout', {
        time: now,
        totalWorked: this.totalWorkedMs,
        totalBreak: this.totalBreakMs
      });
    },

    // Start Break
    startBreak() {
      if (!this.isClockedIn || this.isOnBreak) return;

      if (this.confirmActions) {
        this._showConfirm(
          'Start Break',
          'Are you starting your break?',
          () => this._doStartBreak(),
          false
        );
      } else {
        this._doStartBreak();
      }
    },

    _doStartBreak() {
      const now = new Date();

      // Save worked time up to break start
      if (this.clockInTime) {
        this.totalWorkedMs += now.getTime() - this.clockInTime.getTime();
        this.clockInTime = null;
      }

      this.isOnBreak = true;
      this.breakStartTime = now;

      this.entries.unshift({
        type: 'break-start',
        time: now,
        label: 'Break Start'
      });

      this._saveState();

      if (this._onBreakStart) {
        this._onBreakStart({ time: now, entries: this.entries });
      }

      this.$dispatch('timeclock:breakstart', { time: now });
    },

    // End Break
    endBreak() {
      if (!this.isOnBreak) return;

      if (this.confirmActions) {
        this._showConfirm(
          'End Break',
          'Are you ready to resume work?',
          () => this._doEndBreak(),
          false
        );
      } else {
        this._doEndBreak();
      }
    },

    _doEndBreak() {
      const now = new Date();

      // Calculate break duration
      if (this.breakStartTime) {
        this.totalBreakMs += now.getTime() - this.breakStartTime.getTime();
      }

      this.isOnBreak = false;
      this.breakStartTime = null;
      this.clockInTime = now; // Resume tracking worked time

      this.entries.unshift({
        type: 'break-end',
        time: now,
        label: 'Break End'
      });

      this._saveState();

      if (this._onBreakEnd) {
        this._onBreakEnd({ time: now, totalBreak: this.totalBreakMs, entries: this.entries });
      }

      this.$dispatch('timeclock:breakend', { time: now, totalBreak: this.totalBreakMs });
    },

    // Reset all data
    reset() {
      this._showConfirm(
        'Reset Time Clock',
        'This will clear all entries for today. Continue?',
        () => {
          this.isClockedIn = false;
          this.isOnBreak = false;
          this.clockInTime = null;
          this.breakStartTime = null;
          this.entries = [];
          this.totalWorkedMs = 0;
          this.totalBreakMs = 0;
          this._clearState();
          this.$dispatch('timeclock:reset');
        },
        true
      );
    },

    // Format time for history entries
    formatEntryTime(date) {
      return date.toLocaleTimeString(this.dateLocale, {
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    // Confirmation dialog methods
    _showConfirm(title, message, action, isDanger = false) {
      this.confirmTitle = title;
      this.confirmMessage = message;
      this.confirmAction = action;
      this.confirmIsDanger = isDanger;
      this.confirmOpen = true;
    },

    confirmYes() {
      if (this.confirmAction) {
        this.confirmAction();
      }
      this.confirmOpen = false;
    },

    confirmNo() {
      this.confirmOpen = false;
    },

    // Private helper to format duration
    _formatDuration(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const h = hours.toString().padStart(2, '0');
      const m = minutes.toString().padStart(2, '0');
      const s = seconds.toString().padStart(2, '0');

      return `${h}:${m}:${s}`;
    },

    // State persistence
    _getStorageKey() {
      const today = new Date().toISOString().split('T')[0];
      return `ux-time-clock-${today}`;
    },

    _saveState() {
      try {
        const state = {
          isClockedIn: this.isClockedIn,
          isOnBreak: this.isOnBreak,
          clockInTime: this.clockInTime ? this.clockInTime.toISOString() : null,
          breakStartTime: this.breakStartTime ? this.breakStartTime.toISOString() : null,
          entries: this.entries.map(e => ({
            ...e,
            time: e.time.toISOString()
          })),
          totalWorkedMs: this.totalWorkedMs,
          totalBreakMs: this.totalBreakMs
        };
        localStorage.setItem(this._getStorageKey(), JSON.stringify(state));
      } catch (e) {
        console.warn('Could not save time clock state:', e);
      }
    },

    _loadState() {
      try {
        const saved = localStorage.getItem(this._getStorageKey());
        if (saved) {
          const state = JSON.parse(saved);
          this.isClockedIn = state.isClockedIn || false;
          this.isOnBreak = state.isOnBreak || false;
          this.clockInTime = state.clockInTime ? new Date(state.clockInTime) : null;
          this.breakStartTime = state.breakStartTime ? new Date(state.breakStartTime) : null;
          this.entries = (state.entries || []).map(e => ({
            ...e,
            time: new Date(e.time)
          }));
          this.totalWorkedMs = state.totalWorkedMs || 0;
          this.totalBreakMs = state.totalBreakMs || 0;
        }
      } catch (e) {
        console.warn('Could not load time clock state:', e);
      }
    },

    _clearState() {
      try {
        localStorage.removeItem(this._getStorageKey());
      } catch (e) {
        console.warn('Could not clear time clock state:', e);
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxTimeClock', timeClockComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTimeClock', timeClockComponent);
    });
  }
})();
