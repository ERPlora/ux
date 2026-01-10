/**
 * UX Production Line Status Component
 * Visual production line representation with stations, metrics, and real-time status
 * @requires ux-core.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Production Line - Base
    ======================================== */

    :root {
      --ux-production-line-gap: var(--ux-space-md);
      --ux-production-line-station-size: 64px;
      --ux-production-line-station-size-sm: 48px;
      --ux-production-line-station-size-lg: 80px;
      --ux-production-line-connector-height: 4px;
      --ux-production-line-flow-duration: 2s;
    }

    .ux-production-line {
      font-family: var(--ux-font-family);
      background: var(--ux-surface);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-space-lg);
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Header
    ======================================== */

    .ux-production-line__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--ux-space-lg);
      flex-wrap: wrap;
      gap: var(--ux-space-md);
    }

    .ux-production-line__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-production-line__status-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 0.25rem 0.75rem;
      border-radius: var(--ux-radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .ux-production-line__status-badge--running {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }

    .ux-production-line__status-badge--stopped {
      background: rgba(var(--ux-gray-500-rgb, 107, 114, 128), 0.15);
      color: var(--ux-gray-500);
    }

    .ux-production-line__status-badge--maintenance {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-production-line__status-badge--error {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-production-line__status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    .ux-production-line__status-badge--running .ux-production-line__status-dot {
      animation: ux-production-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-production-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ========================================
       Metrics Bar
    ======================================== */

    .ux-production-line__metrics {
      display: flex;
      gap: var(--ux-space-lg);
      flex-wrap: wrap;
      margin-bottom: var(--ux-space-lg);
      padding: var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
    }

    .ux-production-line__metric {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 100px;
    }

    .ux-production-line__metric-label {
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ux-production-line__metric-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
      display: flex;
      align-items: baseline;
      gap: var(--ux-space-xs);
    }

    .ux-production-line__metric-unit {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--ux-text-secondary);
    }

    .ux-production-line__metric-trend {
      font-size: 0.75rem;
      font-weight: 500;
    }

    .ux-production-line__metric-trend--up {
      color: var(--ux-success);
    }

    .ux-production-line__metric-trend--down {
      color: var(--ux-danger);
    }

    /* ========================================
       Progress Bar (Target vs Actual)
    ======================================== */

    .ux-production-line__progress {
      margin-bottom: var(--ux-space-lg);
    }

    .ux-production-line__progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--ux-space-xs);
      font-size: 0.875rem;
    }

    .ux-production-line__progress-label {
      color: var(--ux-text-secondary);
    }

    .ux-production-line__progress-values {
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }

    .ux-production-line__progress-actual {
      color: var(--ux-text);
    }

    .ux-production-line__progress-target {
      color: var(--ux-text-tertiary);
    }

    .ux-production-line__progress-bar {
      height: 8px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-full);
      overflow: hidden;
      position: relative;
    }

    .ux-production-line__progress-fill {
      height: 100%;
      background: var(--ux-primary);
      border-radius: var(--ux-radius-full);
      transition: width var(--ux-transition-slow);
    }

    .ux-production-line__progress-fill--success {
      background: var(--ux-success);
    }

    .ux-production-line__progress-fill--warning {
      background: var(--ux-warning);
    }

    .ux-production-line__progress-fill--danger {
      background: var(--ux-danger);
    }

    .ux-production-line__progress-target-marker {
      position: absolute;
      top: -2px;
      bottom: -2px;
      width: 2px;
      background: var(--ux-text);
      border-radius: 1px;
    }

    /* ========================================
       Stations Container
    ======================================== */

    .ux-production-line__stations {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      padding: var(--ux-space-lg) 0;
      overflow-x: auto;
    }

    .ux-production-line__stations-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      min-width: 100%;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Station
    ======================================== */

    .ux-production-line__station {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 80px;
      max-width: 150px;
      position: relative;
    }

    .ux-production-line__station-icon {
      width: var(--ux-production-line-station-size);
      height: var(--ux-production-line-station-size);
      border-radius: var(--ux-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ux-surface-secondary);
      border: 2px solid var(--ux-border-color);
      color: var(--ux-text-secondary);
      position: relative;
      z-index: 2;
      transition: all var(--ux-transition-fast);
    }

    .ux-production-line__station-icon svg {
      width: 24px;
      height: 24px;
    }

    /* Station Status Colors */
    .ux-production-line__station--running .ux-production-line__station-icon {
      background: rgba(var(--ux-success-rgb), 0.15);
      border-color: var(--ux-success);
      color: var(--ux-success);
    }

    .ux-production-line__station--stopped .ux-production-line__station-icon {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-gray-400);
      color: var(--ux-gray-500);
    }

    .ux-production-line__station--maintenance .ux-production-line__station-icon {
      background: rgba(var(--ux-warning-rgb), 0.15);
      border-color: var(--ux-warning);
      color: var(--ux-warning-shade);
    }

    .ux-production-line__station--error .ux-production-line__station-icon {
      background: rgba(var(--ux-danger-rgb), 0.15);
      border-color: var(--ux-danger);
      color: var(--ux-danger);
      animation: ux-station-error-pulse 1s ease-in-out infinite;
    }

    @keyframes ux-station-error-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(var(--ux-danger-rgb), 0.4); }
      50% { box-shadow: 0 0 0 8px rgba(var(--ux-danger-rgb), 0); }
    }

    /* Station Alert Badge */
    .ux-production-line__station-alert {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--ux-danger);
      color: white;
      font-size: 0.625rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      animation: ux-alert-bounce 0.5s ease;
    }

    @keyframes ux-alert-bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    /* Station Label */
    .ux-production-line__station-label {
      margin-top: var(--ux-space-sm);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text);
      text-align: center;
      white-space: nowrap;
    }

    .ux-production-line__station-sublabel {
      font-size: 0.625rem;
      color: var(--ux-text-tertiary);
      margin-top: 2px;
      text-align: center;
    }

    /* ========================================
       Connector Lines
    ======================================== */

    .ux-production-line__connector {
      flex: 1;
      height: var(--ux-production-line-connector-height);
      background: var(--ux-border-color);
      margin-top: calc(var(--ux-production-line-station-size) / 2 - var(--ux-production-line-connector-height) / 2);
      position: relative;
      min-width: 20px;
      border-radius: var(--ux-radius-full);
      overflow: hidden;
    }

    /* Animated Flow */
    .ux-production-line__connector--active {
      background: var(--ux-surface-secondary);
    }

    .ux-production-line__connector-flow {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ux-success) 20%,
        var(--ux-success) 40%,
        transparent 60%
      );
      background-size: 200% 100%;
      animation: ux-flow-animation var(--ux-production-line-flow-duration) linear infinite;
    }

    @keyframes ux-flow-animation {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }

    .ux-production-line__connector--inactive .ux-production-line__connector-flow {
      display: none;
    }

    /* ========================================
       Station Tooltip
    ======================================== */

    .ux-production-line__station-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-gray-900);
      color: white;
      border-radius: var(--ux-radius-md);
      font-size: 0.75rem;
      white-space: nowrap;
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast);
      pointer-events: none;
    }

    .ux-production-line__station-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: var(--ux-gray-900);
    }

    .ux-production-line__station:hover .ux-production-line__station-tooltip,
    .ux-production-line__station:focus-within .ux-production-line__station-tooltip {
      opacity: 1;
      visibility: visible;
    }

    .ux-production-line__tooltip-row {
      display: flex;
      justify-content: space-between;
      gap: var(--ux-space-md);
    }

    .ux-production-line__tooltip-row + .ux-production-line__tooltip-row {
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .ux-production-line__tooltip-label {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-production-line__tooltip-value {
      font-weight: 600;
    }

    /* ========================================
       Speed Indicator
    ======================================== */

    .ux-production-line__speed {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      font-size: 0.875rem;
    }

    .ux-production-line__speed-label {
      color: var(--ux-text-secondary);
    }

    .ux-production-line__speed-value {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ux-text);
    }

    .ux-production-line__speed-bar {
      width: 60px;
      height: 4px;
      background: var(--ux-border-color);
      border-radius: var(--ux-radius-full);
      overflow: hidden;
    }

    .ux-production-line__speed-fill {
      height: 100%;
      background: var(--ux-primary);
      border-radius: var(--ux-radius-full);
      transition: width var(--ux-transition-normal);
    }

    /* ========================================
       Downtime Display
    ======================================== */

    .ux-production-line__downtime {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: rgba(var(--ux-danger-rgb), 0.1);
      border-radius: var(--ux-radius-md);
      color: var(--ux-danger);
      font-size: 0.875rem;
    }

    .ux-production-line__downtime-icon {
      width: 16px;
      height: 16px;
    }

    .ux-production-line__downtime-value {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    /* ========================================
       Footer / Actions
    ======================================== */

    .ux-production-line__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--ux-space-lg);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
      flex-wrap: wrap;
      gap: var(--ux-space-md);
    }

    .ux-production-line__footer-info {
      display: flex;
      gap: var(--ux-space-lg);
      flex-wrap: wrap;
    }

    .ux-production-line__last-update {
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-production-line--sm .ux-production-line__station-icon {
      width: var(--ux-production-line-station-size-sm);
      height: var(--ux-production-line-station-size-sm);
    }

    .ux-production-line--sm .ux-production-line__station-icon svg {
      width: 18px;
      height: 18px;
    }

    .ux-production-line--sm .ux-production-line__connector {
      margin-top: calc(var(--ux-production-line-station-size-sm) / 2 - var(--ux-production-line-connector-height) / 2);
    }

    .ux-production-line--lg .ux-production-line__station-icon {
      width: var(--ux-production-line-station-size-lg);
      height: var(--ux-production-line-station-size-lg);
    }

    .ux-production-line--lg .ux-production-line__station-icon svg {
      width: 32px;
      height: 32px;
    }

    .ux-production-line--lg .ux-production-line__connector {
      margin-top: calc(var(--ux-production-line-station-size-lg) / 2 - var(--ux-production-line-connector-height) / 2);
    }

    /* ========================================
       Compact Mode (No metrics)
    ======================================== */

    .ux-production-line--compact .ux-production-line__metrics {
      display: none;
    }

    .ux-production-line--compact .ux-production-line__progress {
      display: none;
    }

    .ux-production-line--compact {
      padding: var(--ux-space-md);
    }

    /* ========================================
       Vertical Layout
    ======================================== */

    .ux-production-line--vertical .ux-production-line__stations-wrapper {
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .ux-production-line--vertical .ux-production-line__station {
      flex-direction: row;
      max-width: none;
      width: 100%;
      justify-content: flex-start;
      gap: var(--ux-space-md);
    }

    .ux-production-line--vertical .ux-production-line__station-label {
      margin-top: 0;
      text-align: left;
    }

    .ux-production-line--vertical .ux-production-line__connector {
      width: var(--ux-production-line-connector-height);
      height: 30px;
      margin: 0;
      margin-left: calc(var(--ux-production-line-station-size) / 2 - var(--ux-production-line-connector-height) / 2);
      flex: none;
    }

    .ux-production-line--vertical .ux-production-line__connector-flow {
      background: linear-gradient(
        180deg,
        transparent 0%,
        var(--ux-success) 20%,
        var(--ux-success) 40%,
        transparent 60%
      );
      background-size: 100% 200%;
      animation: ux-flow-vertical var(--ux-production-line-flow-duration) linear infinite;
    }

    @keyframes ux-flow-vertical {
      0% { background-position: 0 100%; }
      100% { background-position: 0 -100%; }
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-production-line--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-production-line--glass .ux-production-line__metrics {
      background: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.5);
    }

    .ux-production-line--glass .ux-production-line__station-icon {
      background: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-production-line__station-tooltip {
        background: var(--ux-gray-800);
      }

      .ux-production-line__station-tooltip::after {
        border-top-color: var(--ux-gray-800);
      }

      .ux-production-line--glass .ux-production-line__metrics {
        background: rgba(var(--ux-surface-rgb, 30, 30, 30), 0.5);
      }

      .ux-production-line--glass .ux-production-line__station-icon {
        background: rgba(var(--ux-surface-rgb, 30, 30, 30), 0.5);
      }
    }

    .ux-dark .ux-production-line__station-tooltip {
      background: var(--ux-gray-800);
    }

    .ux-dark .ux-production-line__station-tooltip::after {
      border-top-color: var(--ux-gray-800);
    }

    .ux-dark .ux-production-line--glass .ux-production-line__metrics,
    .ux-dark .ux-production-line--glass .ux-production-line__station-icon {
      background: rgba(var(--ux-surface-rgb, 30, 30, 30), 0.5);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-production-line__header {
        flex-direction: column;
        align-items: flex-start;
      }

      .ux-production-line__metrics {
        flex-direction: column;
        gap: var(--ux-space-md);
      }

      .ux-production-line__metric {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-width: 100%;
      }

      .ux-production-line__stations {
        padding: var(--ux-space-md) 0;
      }

      .ux-production-line__footer {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-production-line__connector-flow,
      .ux-production-line__status-badge--running .ux-production-line__status-dot,
      .ux-production-line__station--error .ux-production-line__station-icon {
        animation: none;
      }

      .ux-production-line__progress-fill,
      .ux-production-line__speed-fill {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-production-line-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-production-line-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const productionLineData = (options = {}) => ({
    // Configuration
    name: options.name || 'Production Line',
    status: options.status || 'running', // running, stopped, maintenance, error
    stations: options.stations || [],
    target: options.target || 1000,
    actual: options.actual || 0,
    efficiency: options.efficiency || 0,
    speed: options.speed || 0, // 0-100
    maxSpeed: options.maxSpeed || 100,
    downtime: options.downtime || 0, // in minutes
    lastUpdate: options.lastUpdate || null,
    showFlow: options.showFlow ?? true,
    updateInterval: options.updateInterval || null, // for auto-refresh

    // Internal state
    _updateTimer: null,

    // Computed
    get progressPercent() {
      if (this.target <= 0) return 0;
      return Math.min(100, (this.actual / this.target) * 100);
    },

    get progressStatus() {
      const percent = this.progressPercent;
      if (percent >= 100) return 'success';
      if (percent >= 75) return 'primary';
      if (percent >= 50) return 'warning';
      return 'danger';
    },

    get speedPercent() {
      if (this.maxSpeed <= 0) return 0;
      return Math.min(100, (this.speed / this.maxSpeed) * 100);
    },

    get efficiencyDisplay() {
      return this.efficiency.toFixed(1);
    },

    get downtimeDisplay() {
      if (this.downtime < 60) {
        return `${this.downtime}m`;
      }
      const hours = Math.floor(this.downtime / 60);
      const mins = this.downtime % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    },

    get isRunning() {
      return this.status === 'running';
    },

    get runningStationsCount() {
      return this.stations.filter(s => s.status === 'running').length;
    },

    get errorStationsCount() {
      return this.stations.filter(s => s.status === 'error').length;
    },

    // Lifecycle
    init() {
      // Set last update if not provided
      if (!this.lastUpdate) {
        this.lastUpdate = new Date();
      }

      // Start auto-refresh if configured
      if (this.updateInterval && this.updateInterval > 0) {
        this._updateTimer = setInterval(() => {
          this.$dispatch('productionline:refresh');
        }, this.updateInterval);
      }
    },

    destroy() {
      if (this._updateTimer) {
        clearInterval(this._updateTimer);
        this._updateTimer = null;
      }
    },

    // Methods
    setStatus(newStatus) {
      this.status = newStatus;
      this.$dispatch('productionline:statuschange', { status: newStatus });
    },

    updateActual(value) {
      this.actual = value;
      this.$dispatch('productionline:update', {
        actual: value,
        progress: this.progressPercent
      });
    },

    updateStation(index, data) {
      if (this.stations[index]) {
        this.stations[index] = { ...this.stations[index], ...data };
        this.$dispatch('productionline:stationupdate', {
          index,
          station: this.stations[index]
        });
      }
    },

    setStationStatus(index, status) {
      if (this.stations[index]) {
        this.stations[index].status = status;
        this.$dispatch('productionline:stationstatus', {
          index,
          status
        });
      }
    },

    addAlert(stationIndex, count = 1) {
      if (this.stations[stationIndex]) {
        this.stations[stationIndex].alerts = (this.stations[stationIndex].alerts || 0) + count;
      }
    },

    clearAlerts(stationIndex) {
      if (this.stations[stationIndex]) {
        this.stations[stationIndex].alerts = 0;
      }
    },

    updateMetrics(data) {
      if (data.actual !== undefined) this.actual = data.actual;
      if (data.efficiency !== undefined) this.efficiency = data.efficiency;
      if (data.speed !== undefined) this.speed = data.speed;
      if (data.downtime !== undefined) this.downtime = data.downtime;
      this.lastUpdate = new Date();
      this.$dispatch('productionline:metricsupdate', data);
    },

    // Check if connector between stations should show flow
    isConnectorActive(index) {
      if (!this.showFlow || !this.isRunning) return false;
      // Active if both connected stations are running
      const current = this.stations[index];
      const next = this.stations[index + 1];
      return current?.status === 'running' && next?.status === 'running';
    },

    // Format last update time
    formatLastUpdate() {
      if (!this.lastUpdate) return '';
      const date = this.lastUpdate instanceof Date ? this.lastUpdate : new Date(this.lastUpdate);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },

    // Get station status class
    getStationClass(station) {
      return `ux-production-line__station--${station.status || 'stopped'}`;
    },

    // Get station status label
    getStatusLabel(status) {
      const labels = {
        running: 'Running',
        stopped: 'Stopped',
        maintenance: 'Maintenance',
        error: 'Error'
      };
      return labels[status] || status;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxProductionLine', productionLineData);
  }

})();
