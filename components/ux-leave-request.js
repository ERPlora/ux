/**
 * UX Leave Request Component
 * Leave request cards for HR/employee management systems
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Leave Request Card
    ======================================== */

    :root {
      --ux-leave-request-border-radius: var(--ux-border-radius-lg, 12px);
      --ux-leave-request-padding: var(--ux-space-lg, 1.5rem);
      --ux-leave-request-gap: var(--ux-space-md, 1rem);
    }

    .ux-leave-request {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--ux-surface);
      border-radius: var(--ux-leave-request-border-radius);
      box-shadow: var(--ux-shadow-sm);
      overflow: hidden;
      width: 100%;
      max-width: 420px;
    }

    /* Status indicator border */
    .ux-leave-request::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: var(--ux-leave-request-status-color, var(--ux-warning));
      border-radius: var(--ux-leave-request-border-radius) 0 0 var(--ux-leave-request-border-radius);
    }

    /* ========================================
       Header
    ======================================== */

    .ux-leave-request__header {
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      padding: var(--ux-leave-request-padding);
      padding-bottom: var(--ux-space-md);
    }

    .ux-leave-request__avatar {
      flex-shrink: 0;
    }

    .ux-leave-request__employee {
      flex: 1;
      min-width: 0;
    }

    .ux-leave-request__name {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
    }

    .ux-leave-request__role {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: var(--ux-space-xs) 0 0;
    }

    .ux-leave-request__department {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      margin: var(--ux-space-xs) 0 0;
    }

    .ux-leave-request__status {
      flex-shrink: 0;
    }

    /* ========================================
       Leave Type
    ======================================== */

    .ux-leave-request__type {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: var(--ux-border-radius);
      background-color: var(--ux-leave-type-bg, var(--ux-surface-secondary));
      color: var(--ux-leave-type-color, var(--ux-text-secondary));
    }

    .ux-leave-request__type-icon {
      width: 14px;
      height: 14px;
    }

    .ux-leave-request__type-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Leave type variants */
    .ux-leave-request__type--vacation {
      --ux-leave-type-bg: rgba(var(--ux-blue-500-rgb, 59, 130, 246), 0.12);
      --ux-leave-type-color: var(--ux-blue-600, #2563eb);
    }

    .ux-leave-request__type--sick {
      --ux-leave-type-bg: rgba(var(--ux-red-500-rgb, 239, 68, 68), 0.12);
      --ux-leave-type-color: var(--ux-red-600, #dc2626);
    }

    .ux-leave-request__type--personal {
      --ux-leave-type-bg: rgba(var(--ux-purple-500-rgb, 168, 85, 247), 0.12);
      --ux-leave-type-color: var(--ux-purple-600, #9333ea);
    }

    .ux-leave-request__type--maternity {
      --ux-leave-type-bg: rgba(var(--ux-pink-500-rgb, 236, 72, 153), 0.12);
      --ux-leave-type-color: var(--ux-pink-600, #db2777);
    }

    .ux-leave-request__type--paternity {
      --ux-leave-type-bg: rgba(var(--ux-cyan-500-rgb, 6, 182, 212), 0.12);
      --ux-leave-type-color: var(--ux-cyan-600, #0891b2);
    }

    .ux-leave-request__type--bereavement {
      --ux-leave-type-bg: rgba(var(--ux-gray-500-rgb, 107, 114, 128), 0.12);
      --ux-leave-type-color: var(--ux-gray-600, #4b5563);
    }

    .ux-leave-request__type--unpaid {
      --ux-leave-type-bg: rgba(var(--ux-orange-500-rgb, 249, 115, 22), 0.12);
      --ux-leave-type-color: var(--ux-orange-600, #ea580c);
    }

    .ux-leave-request__type--work-from-home {
      --ux-leave-type-bg: rgba(var(--ux-green-500-rgb, 34, 197, 94), 0.12);
      --ux-leave-type-color: var(--ux-green-600, #16a34a);
    }

    /* ========================================
       Content Body
    ======================================== */

    .ux-leave-request__body {
      padding: 0 var(--ux-leave-request-padding);
    }

    /* ========================================
       Dates Section
    ======================================== */

    .ux-leave-request__dates {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      margin-bottom: var(--ux-space-md);
    }

    .ux-leave-request__date {
      flex: 1;
      text-align: center;
    }

    .ux-leave-request__date-label {
      display: block;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-leave-request__date-value {
      display: block;
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-leave-request__date-day {
      display: block;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-leave-request__dates-arrow {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: var(--ux-text-tertiary);
    }

    .ux-leave-request__dates-arrow svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Duration
    ======================================== */

    .ux-leave-request__duration {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface-tertiary);
      border-radius: var(--ux-border-radius);
      margin-bottom: var(--ux-space-md);
    }

    .ux-leave-request__duration-icon {
      width: 16px;
      height: 16px;
      color: var(--ux-text-secondary);
    }

    .ux-leave-request__duration-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-leave-request__duration-value {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-leave-request__duration-label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Reason/Notes
    ======================================== */

    .ux-leave-request__reason {
      padding: var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      margin-bottom: var(--ux-space-md);
      border-left: 3px solid var(--ux-border-color);
    }

    .ux-leave-request__reason-label {
      display: block;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-leave-request__reason-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      line-height: 1.5;
      margin: 0;
    }

    /* ========================================
       Meta Information (submitted date, etc)
    ======================================== */

    .ux-leave-request__meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) 0;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-leave-request__meta-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-leave-request__meta-icon {
      width: 12px;
      height: 12px;
    }

    .ux-leave-request__meta-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-leave-request__actions {
      display: flex;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-leave-request-padding);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface-secondary);
    }

    .ux-leave-request__action {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      height: var(--ux-touch-target-sm, 36px);
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      border: none;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-leave-request__action:active {
      transform: scale(0.98);
    }

    .ux-leave-request__action--approve {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast, #fff);
    }

    .ux-leave-request__action--approve:hover {
      background-color: var(--ux-success-shade);
    }

    .ux-leave-request__action--reject {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast, #fff);
    }

    .ux-leave-request__action--reject:hover {
      background-color: var(--ux-danger-shade);
    }

    .ux-leave-request__action--secondary {
      background-color: var(--ux-surface);
      color: var(--ux-text-secondary);
      border: 1px solid var(--ux-border-color);
    }

    .ux-leave-request__action--secondary:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-leave-request__action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .ux-leave-request__action-icon {
      width: 16px;
      height: 16px;
    }

    .ux-leave-request__action-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Status Variants
    ======================================== */

    .ux-leave-request--pending {
      --ux-leave-request-status-color: var(--ux-warning);
    }

    .ux-leave-request--approved {
      --ux-leave-request-status-color: var(--ux-success);
    }

    .ux-leave-request--rejected {
      --ux-leave-request-status-color: var(--ux-danger);
    }

    .ux-leave-request--cancelled {
      --ux-leave-request-status-color: var(--ux-gray-400);
      opacity: 0.7;
    }

    .ux-leave-request--approved .ux-leave-request__actions,
    .ux-leave-request--rejected .ux-leave-request__actions,
    .ux-leave-request--cancelled .ux-leave-request__actions {
      background-color: transparent;
      border-top: none;
      padding-top: 0;
    }

    /* ========================================
       Status Badge (inside header)
    ======================================== */

    .ux-leave-request__status-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      border-radius: var(--ux-border-radius-full, 9999px);
    }

    .ux-leave-request__status-badge--pending {
      background-color: rgba(var(--ux-warning-rgb, 234, 179, 8), 0.15);
      color: var(--ux-warning-shade, #ca8a04);
    }

    .ux-leave-request__status-badge--approved {
      background-color: rgba(var(--ux-success-rgb, 34, 197, 94), 0.15);
      color: var(--ux-success-shade, #16a34a);
    }

    .ux-leave-request__status-badge--rejected {
      background-color: rgba(var(--ux-danger-rgb, 239, 68, 68), 0.15);
      color: var(--ux-danger-shade, #dc2626);
    }

    .ux-leave-request__status-badge--cancelled {
      background-color: var(--ux-surface-tertiary);
      color: var(--ux-text-tertiary);
    }

    .ux-leave-request__status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .ux-leave-request__status-badge--pending .ux-leave-request__status-dot {
      animation: ux-leave-request-pulse 1.5s ease-in-out infinite;
    }

    @keyframes ux-leave-request-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-leave-request--compact {
      max-width: 360px;
    }

    .ux-leave-request--compact .ux-leave-request__header {
      padding: var(--ux-space-md);
    }

    .ux-leave-request--compact .ux-leave-request__body {
      padding: 0 var(--ux-space-md);
    }

    .ux-leave-request--compact .ux-leave-request__dates {
      padding: var(--ux-space-sm);
    }

    .ux-leave-request--compact .ux-leave-request__actions {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-leave-request--glass {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-leave-request--glass .ux-leave-request__dates,
    .ux-leave-request--glass .ux-leave-request__duration,
    .ux-leave-request--glass .ux-leave-request__reason {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .ux-leave-request--glass .ux-leave-request__actions {
      background-color: rgba(255, 255, 255, 0.2);
      border-top-color: var(--ux-glass-border);
    }

    /* ========================================
       Leave Request Form
    ======================================== */

    .ux-leave-request-form {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-radius: var(--ux-leave-request-border-radius);
      box-shadow: var(--ux-shadow-sm);
      padding: var(--ux-leave-request-padding);
      max-width: 480px;
    }

    .ux-leave-request-form__title {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-sm);
    }

    .ux-leave-request-form__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0 0 var(--ux-space-md);
    }

    .ux-leave-request-form__row {
      display: flex;
      gap: var(--ux-space-md);
    }

    .ux-leave-request-form__row > * {
      flex: 1;
    }

    .ux-leave-request-form__field {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-leave-request-form__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-leave-request-form__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    .ux-leave-request-form__balance {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-leave-request-form__balance-label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-leave-request-form__balance-value {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-primary);
    }

    .ux-leave-request-form__balance-value--low {
      color: var(--ux-danger);
    }

    .ux-leave-request-form__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-leave-request-form__actions > * {
      flex: 1;
    }

    /* Leave type selector grid */
    .ux-leave-request-form__types {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: var(--ux-space-sm);
    }

    .ux-leave-request-form__type-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border: 2px solid transparent;
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-leave-request-form__type-option:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-leave-request-form__type-option--selected {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.08);
    }

    .ux-leave-request-form__type-option input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .ux-leave-request-form__type-icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    .ux-leave-request-form__type-option--selected .ux-leave-request-form__type-icon {
      color: var(--ux-primary);
    }

    .ux-leave-request-form__type-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-leave-request-form__type-name {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: var(--ux-text);
      text-align: center;
    }

    /* Glass form variant */
    .ux-leave-request-form--glass {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-leave-request-form--glass .ux-leave-request-form__balance,
    .ux-leave-request-form--glass .ux-leave-request-form__type-option {
      background-color: rgba(255, 255, 255, 0.3);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 480px) {
      .ux-leave-request-form__row {
        flex-direction: column;
      }

      .ux-leave-request__dates {
        flex-direction: column;
        text-align: center;
      }

      .ux-leave-request__dates-arrow {
        transform: rotate(90deg);
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light):not(.ux-theme-light) {
        .ux-leave-request--glass .ux-leave-request__dates,
        .ux-leave-request--glass .ux-leave-request__duration,
        .ux-leave-request--glass .ux-leave-request__reason,
        .ux-leave-request--glass .ux-leave-request__actions {
          background-color: rgba(0, 0, 0, 0.2);
        }

        .ux-leave-request-form--glass .ux-leave-request-form__balance,
        .ux-leave-request-form--glass .ux-leave-request-form__type-option {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    .ux-dark .ux-leave-request--glass .ux-leave-request__dates,
    .ux-dark .ux-leave-request--glass .ux-leave-request__duration,
    .ux-dark .ux-leave-request--glass .ux-leave-request__reason,
    .ux-dark .ux-leave-request--glass .ux-leave-request__actions,
    .ux-theme-dark .ux-leave-request--glass .ux-leave-request__dates,
    .ux-theme-dark .ux-leave-request--glass .ux-leave-request__duration,
    .ux-theme-dark .ux-leave-request--glass .ux-leave-request__reason,
    .ux-theme-dark .ux-leave-request--glass .ux-leave-request__actions {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .ux-dark .ux-leave-request-form--glass .ux-leave-request-form__balance,
    .ux-dark .ux-leave-request-form--glass .ux-leave-request-form__type-option,
    .ux-theme-dark .ux-leave-request-form--glass .ux-leave-request-form__balance,
    .ux-theme-dark .ux-leave-request-form--glass .ux-leave-request-form__type-option {
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-leave-request__status-badge--pending .ux-leave-request__status-dot {
        animation: none;
      }

      .ux-leave-request__action {
        transition: none;
      }

      .ux-leave-request-form__type-option {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-leave-request-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-leave-request-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for leave request form
  const leaveRequestFormComponent = (config = {}) => ({
    // Form state
    leaveType: config.leaveType || '',
    startDate: config.startDate || '',
    endDate: config.endDate || '',
    reason: config.reason || '',
    isHalfDay: config.isHalfDay || false,
    halfDayPeriod: config.halfDayPeriod || 'morning', // 'morning' or 'afternoon'

    // Available leave types
    leaveTypes: config.leaveTypes || [
      { id: 'vacation', name: 'Vacation', icon: 'sun' },
      { id: 'sick', name: 'Sick', icon: 'medical' },
      { id: 'personal', name: 'Personal', icon: 'user' },
      { id: 'maternity', name: 'Maternity', icon: 'heart' },
      { id: 'paternity', name: 'Paternity', icon: 'heart' },
      { id: 'bereavement', name: 'Bereavement', icon: 'flower' },
      { id: 'unpaid', name: 'Unpaid', icon: 'wallet' },
      { id: 'work-from-home', name: 'WFH', icon: 'home' }
    ],

    // Leave balance
    balance: config.balance || {
      vacation: 15,
      sick: 10,
      personal: 3
    },

    // Validation
    errors: {},
    submitting: false,
    submitted: false,

    // Computed
    get duration() {
      if (!this.startDate || !this.endDate) return 0;
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      if (end < start) return 0;

      let days = 0;
      const current = new Date(start);
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        current.setDate(current.getDate() + 1);
      }

      if (this.isHalfDay && days === 1) {
        return 0.5;
      }
      return days;
    },

    get currentBalance() {
      const type = this.leaveType;
      if (type === 'vacation' || type === 'sick' || type === 'personal') {
        return this.balance[type] || 0;
      }
      return null;
    },

    get remainingBalance() {
      if (this.currentBalance === null) return null;
      return Math.max(0, this.currentBalance - this.duration);
    },

    get isBalanceLow() {
      return this.remainingBalance !== null && this.remainingBalance < 3;
    },

    get isValid() {
      return this.leaveType && this.startDate && this.endDate && this.duration > 0;
    },

    // Methods
    selectType(type) {
      this.leaveType = type;
      this.errors.leaveType = '';
    },

    validate() {
      this.errors = {};

      if (!this.leaveType) {
        this.errors.leaveType = 'Please select a leave type';
      }

      if (!this.startDate) {
        this.errors.startDate = 'Start date is required';
      }

      if (!this.endDate) {
        this.errors.endDate = 'End date is required';
      }

      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        if (end < start) {
          this.errors.endDate = 'End date must be after start date';
        }
      }

      if (this.duration <= 0 && this.startDate && this.endDate) {
        this.errors.endDate = 'Selected dates have no working days';
      }

      if (this.currentBalance !== null && this.duration > this.currentBalance) {
        this.errors.duration = 'Insufficient leave balance';
      }

      return Object.keys(this.errors).length === 0;
    },

    async submit() {
      if (!this.validate()) return;

      this.submitting = true;

      try {
        const data = {
          leaveType: this.leaveType,
          startDate: this.startDate,
          endDate: this.endDate,
          duration: this.duration,
          reason: this.reason,
          isHalfDay: this.isHalfDay,
          halfDayPeriod: this.halfDayPeriod
        };

        this.$dispatch('leave-request:submit', data);
        this.submitted = true;

        // Reset form after successful submission
        if (config.resetOnSubmit !== false) {
          this.reset();
        }
      } catch (error) {
        this.errors.submit = error.message || 'Failed to submit request';
      } finally {
        this.submitting = false;
      }
    },

    reset() {
      this.leaveType = '';
      this.startDate = '';
      this.endDate = '';
      this.reason = '';
      this.isHalfDay = false;
      this.halfDayPeriod = 'morning';
      this.errors = {};
      this.submitted = false;
    },

    cancel() {
      this.$dispatch('leave-request:cancel');
      this.reset();
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxLeaveRequestForm', leaveRequestFormComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxLeaveRequestForm', leaveRequestFormComponent);
    });
  }
})();
