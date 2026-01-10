/**
 * UX Machine Status Component
 * Industrial machine/equipment status cards with real-time metrics
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Machine Status - Industrial Equipment Monitoring
       CSS-only component with iOS-style design
       ========================================================================== */

    :root {
      /* Machine Status Tokens */
      --ux-machine-status-padding: var(--ux-space-lg);
      --ux-machine-status-border-radius: var(--ux-border-radius-lg);
      --ux-machine-status-gap: var(--ux-space-md);
      --ux-machine-status-indicator-size: 12px;
      --ux-machine-status-icon-size: 48px;
    }

    /* ==========================================================================
       Machine Status Card
       ========================================================================== */

    .ux-machine-status {
      display: flex;
      flex-direction: column;
      gap: var(--ux-machine-status-gap);
      padding: var(--ux-machine-status-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-machine-status-border-radius);
      transition: transform var(--ux-transition-fast) var(--ux-ease-ios),
                  box-shadow var(--ux-transition-fast) var(--ux-ease-ios);
    }

    .ux-machine-status:hover {
      transform: translateY(-2px);
      box-shadow: var(--ux-shadow-md);
    }

    /* Clickable card */
    a.ux-machine-status,
    button.ux-machine-status {
      cursor: pointer;
      text-decoration: none;
      text-align: left;
    }

    a.ux-machine-status:active,
    button.ux-machine-status:active {
      transform: scale(0.98);
    }

    /* ==========================================================================
       Header Section
       ========================================================================== */

    .ux-machine-status__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-md);
    }

    .ux-machine-status__info {
      flex: 1;
      min-width: 0;
    }

    .ux-machine-status__name {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-machine-status__id {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      font-weight: 400;
    }

    .ux-machine-status__location {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    .ux-machine-status__icon {
      width: var(--ux-machine-status-icon-size);
      height: var(--ux-machine-status-icon-size);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      color: var(--ux-primary);
      flex-shrink: 0;
    }

    .ux-machine-status__icon svg {
      width: 24px;
      height: 24px;
    }

    .ux-machine-status__icon img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    /* ==========================================================================
       Status Indicator
       ========================================================================== */

    .ux-machine-status__indicator {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius-pill);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      background: var(--ux-surface-secondary);
      color: var(--ux-text-secondary);
    }

    .ux-machine-status__indicator-dot {
      width: var(--ux-machine-status-indicator-size);
      height: var(--ux-machine-status-indicator-size);
      border-radius: 50%;
      background: var(--ux-gray-400);
      flex-shrink: 0;
      position: relative;
    }

    /* Running State */
    .ux-machine-status__indicator--running {
      background: rgba(var(--ux-success-rgb), 0.1);
      color: var(--ux-success);
    }

    .ux-machine-status__indicator--running .ux-machine-status__indicator-dot {
      background: var(--ux-success);
    }

    .ux-machine-status__indicator--running .ux-machine-status__indicator-dot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: inherit;
      animation: ux-machine-pulse 2s ease-in-out infinite;
    }

    /* Idle State */
    .ux-machine-status__indicator--idle {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    .ux-machine-status__indicator--idle .ux-machine-status__indicator-dot {
      background: var(--ux-primary);
    }

    /* Maintenance State */
    .ux-machine-status__indicator--maintenance {
      background: rgba(var(--ux-warning-rgb), 0.1);
      color: var(--ux-warning-shade);
    }

    .ux-machine-status__indicator--maintenance .ux-machine-status__indicator-dot {
      background: var(--ux-warning);
    }

    .ux-machine-status__indicator--maintenance .ux-machine-status__indicator-dot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: inherit;
      animation: ux-machine-blink 1s ease-in-out infinite;
    }

    /* Offline State */
    .ux-machine-status__indicator--offline {
      background: var(--ux-surface-secondary);
      color: var(--ux-text-tertiary);
    }

    .ux-machine-status__indicator--offline .ux-machine-status__indicator-dot {
      background: var(--ux-gray-400);
    }

    /* Error State */
    .ux-machine-status__indicator--error {
      background: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-machine-status__indicator--error .ux-machine-status__indicator-dot {
      background: var(--ux-danger);
    }

    .ux-machine-status__indicator--error .ux-machine-status__indicator-dot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: inherit;
      animation: ux-machine-pulse-fast 1s ease-in-out infinite;
    }

    /* Pulse Animation */
    @keyframes ux-machine-pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(2);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    @keyframes ux-machine-pulse-fast {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.8);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    @keyframes ux-machine-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ==========================================================================
       Current Job / Work Order
       ========================================================================== */

    .ux-machine-status__job {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
    }

    .ux-machine-status__job-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ux-machine-status__job-name {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-machine-status__job-details {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      flex-wrap: wrap;
    }

    .ux-machine-status__job-progress {
      margin-top: var(--ux-space-sm);
    }

    .ux-machine-status__job-progress-bar {
      height: 6px;
      background: var(--ux-surface);
      border-radius: var(--ux-border-radius-pill);
      overflow: hidden;
    }

    .ux-machine-status__job-progress-fill {
      height: 100%;
      background: var(--ux-primary);
      border-radius: var(--ux-border-radius-pill);
      transition: width var(--ux-transition-slow) var(--ux-ease-ios);
    }

    .ux-machine-status__job-progress-label {
      display: flex;
      justify-content: space-between;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-top: var(--ux-space-xs);
    }

    /* ==========================================================================
       Metrics Grid
       ========================================================================== */

    .ux-machine-status__metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: var(--ux-space-sm);
    }

    .ux-machine-status__metric {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--ux-space-sm);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
    }

    .ux-machine-status__metric-value {
      font-size: var(--ux-font-size-lg);
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }

    .ux-machine-status__metric-value--sm {
      font-size: var(--ux-font-size-md);
    }

    .ux-machine-status__metric-value--lg {
      font-size: var(--ux-font-size-xl);
    }

    .ux-machine-status__metric-unit {
      font-size: var(--ux-font-size-xs);
      font-weight: 400;
      color: var(--ux-text-secondary);
    }

    .ux-machine-status__metric-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin-top: var(--ux-space-xs);
    }

    /* Metric colors */
    .ux-machine-status__metric--success .ux-machine-status__metric-value {
      color: var(--ux-success);
    }

    .ux-machine-status__metric--warning .ux-machine-status__metric-value {
      color: var(--ux-warning);
    }

    .ux-machine-status__metric--danger .ux-machine-status__metric-value {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Uptime Display
       ========================================================================== */

    .ux-machine-status__uptime {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-machine-status__uptime-circle {
      position: relative;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }

    .ux-machine-status__uptime-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .ux-machine-status__uptime-bg {
      fill: none;
      stroke: var(--ux-surface-secondary);
      stroke-width: 6;
    }

    .ux-machine-status__uptime-fill {
      fill: none;
      stroke: var(--ux-success);
      stroke-width: 6;
      stroke-linecap: round;
      stroke-dasharray: 157; /* 2 * PI * 25 */
      stroke-dashoffset: 157;
      transition: stroke-dashoffset var(--ux-transition-slow) var(--ux-ease-ios);
    }

    .ux-machine-status__uptime-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--ux-font-size-sm);
      font-weight: 700;
      color: var(--ux-text);
    }

    .ux-machine-status__uptime-info {
      flex: 1;
    }

    .ux-machine-status__uptime-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ux-machine-status__uptime-value {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
    }

    .ux-machine-status__uptime-time {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Uptime colors */
    .ux-machine-status__uptime--warning .ux-machine-status__uptime-fill {
      stroke: var(--ux-warning);
    }

    .ux-machine-status__uptime--danger .ux-machine-status__uptime-fill {
      stroke: var(--ux-danger);
    }

    /* ==========================================================================
       Alert Section
       ========================================================================== */

    .ux-machine-status__alert {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
    }

    .ux-machine-status__alert-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .ux-machine-status__alert-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-machine-status__alert-text {
      flex: 1;
    }

    .ux-machine-status__alert-time {
      font-size: var(--ux-font-size-xs);
      color: inherit;
      opacity: 0.8;
    }

    /* Alert variants */
    .ux-machine-status__alert--warning {
      background: rgba(var(--ux-warning-rgb), 0.1);
      color: var(--ux-warning-shade);
    }

    .ux-machine-status__alert--error {
      background: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-machine-status__alert--info {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    /* Multiple alerts */
    .ux-machine-status__alerts {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    /* ==========================================================================
       Operator Section
       ========================================================================== */

    .ux-machine-status__operator {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-machine-status__operator-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      flex-shrink: 0;
    }

    .ux-machine-status__operator-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .ux-machine-status__operator-info {
      flex: 1;
      min-width: 0;
    }

    .ux-machine-status__operator-name {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-machine-status__operator-role {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-machine-status__operator-shift {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      padding: 2px var(--ux-space-xs);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-sm);
    }

    /* No operator assigned */
    .ux-machine-status__operator--empty {
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
      font-style: italic;
    }

    /* ==========================================================================
       Footer Section
       ========================================================================== */

    .ux-machine-status__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-machine-status__last-update {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-machine-status__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* ==========================================================================
       Mini Variant
       ========================================================================== */

    .ux-machine-status--mini {
      --ux-machine-status-padding: var(--ux-space-md);
      --ux-machine-status-gap: var(--ux-space-sm);
      --ux-machine-status-indicator-size: 8px;
      --ux-machine-status-icon-size: 36px;
    }

    .ux-machine-status--mini .ux-machine-status__name {
      font-size: var(--ux-font-size-md);
    }

    .ux-machine-status--mini .ux-machine-status__indicator {
      padding: 2px var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
    }

    .ux-machine-status--mini .ux-machine-status__metrics {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-machine-status--mini .ux-machine-status__metric-value {
      font-size: var(--ux-font-size-md);
    }

    /* ==========================================================================
       Compact Variant (Single Line)
       ========================================================================== */

    .ux-machine-status--compact {
      flex-direction: row;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
    }

    .ux-machine-status--compact .ux-machine-status__header {
      flex: 1;
      min-width: 0;
    }

    .ux-machine-status--compact .ux-machine-status__metrics {
      display: flex;
      gap: var(--ux-space-lg);
      flex-shrink: 0;
    }

    .ux-machine-status--compact .ux-machine-status__metric {
      padding: 0;
      background: transparent;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-machine-status--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-machine-status--glass .ux-machine-status__job,
    .ux-machine-status--glass .ux-machine-status__metric {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Machine Grid
       ========================================================================== */

    .ux-machine-grid {
      display: grid;
      gap: var(--ux-space-md);
    }

    /* Auto-fit columns */
    .ux-machine-grid--auto {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    /* Fixed columns */
    .ux-machine-grid--2 { grid-template-columns: repeat(2, 1fr); }
    .ux-machine-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .ux-machine-grid--4 { grid-template-columns: repeat(4, 1fr); }

    /* List layout */
    .ux-machine-grid--list {
      grid-template-columns: 1fr;
    }

    /* Responsive grid */
    @media (max-width: 991px) {
      .ux-machine-grid--4 { grid-template-columns: repeat(2, 1fr); }
      .ux-machine-grid--3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 767px) {
      .ux-machine-grid--4,
      .ux-machine-grid--3,
      .ux-machine-grid--2 {
        grid-template-columns: 1fr;
      }

      .ux-machine-status--compact {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-machine-status--compact .ux-machine-status__metrics {
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }

    /* ==========================================================================
       Status Bar (Mini horizontal overview)
       ========================================================================== */

    .ux-machine-status-bar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-lg);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-machine-status-bar__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    .ux-machine-status-bar__count {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
    }

    .ux-machine-status-bar__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-machine-status-bar__dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .ux-machine-status-bar__dot--running { background: var(--ux-success); }
    .ux-machine-status-bar__dot--idle { background: var(--ux-primary); }
    .ux-machine-status-bar__dot--maintenance { background: var(--ux-warning); }
    .ux-machine-status-bar__dot--offline { background: var(--ux-gray-400); }
    .ux-machine-status-bar__dot--error { background: var(--ux-danger); }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-machine-status--glass .ux-machine-status__job,
      :root:not(.ux-light) .ux-machine-status--glass .ux-machine-status__metric {
        background: rgba(255, 255, 255, 0.08);
      }

      :root:not(.ux-light) .ux-machine-status__indicator--maintenance {
        color: var(--ux-warning);
      }

      :root:not(.ux-light) .ux-machine-status__alert--warning {
        color: var(--ux-warning);
      }
    }

    .ux-dark .ux-machine-status--glass .ux-machine-status__job,
    .ux-dark .ux-machine-status--glass .ux-machine-status__metric {
      background: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-machine-status__indicator--maintenance {
      color: var(--ux-warning);
    }

    .ux-dark .ux-machine-status__alert--warning {
      color: var(--ux-warning);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-machine-status {
        transition: none;
      }

      .ux-machine-status:hover {
        transform: none;
      }

      .ux-machine-status__indicator--running .ux-machine-status__indicator-dot::before,
      .ux-machine-status__indicator--maintenance .ux-machine-status__indicator-dot::before,
      .ux-machine-status__indicator--error .ux-machine-status__indicator-dot::before {
        animation: none;
      }

      .ux-machine-status__uptime-fill,
      .ux-machine-status__job-progress-fill {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-machine-status-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-machine-status-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

})();
