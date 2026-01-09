(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX State - Empty, Error, Success, Loading States
       iOS 26 Style - Liquid Glass Design
       ========================================================================== */

    :root {
      /* State Tokens */
      --ux-state-padding: var(--ux-space-2xl);
      --ux-state-icon-size: 64px;
      --ux-state-icon-size-sm: 48px;
      --ux-state-icon-size-lg: 80px;
      --ux-state-icon-color: var(--ux-text-tertiary);
      --ux-state-title-size: var(--ux-font-size-lg);
      --ux-state-description-size: var(--ux-font-size-md);
      --ux-state-gap: var(--ux-space-md);
    }

    /* ==========================================================================
       Base State Container
       ========================================================================== */

    .ux-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--ux-state-padding);
      min-height: 200px;
      gap: var(--ux-state-gap);
    }

    /* Size variants */
    .ux-state--sm {
      --ux-state-padding: var(--ux-space-lg);
      --ux-state-icon-size: var(--ux-state-icon-size-sm);
      --ux-state-title-size: var(--ux-font-size-md);
      --ux-state-description-size: var(--ux-font-size-sm);
      min-height: 150px;
    }

    .ux-state--lg {
      --ux-state-padding: var(--ux-space-3xl);
      --ux-state-icon-size: var(--ux-state-icon-size-lg);
      --ux-state-title-size: var(--ux-font-size-xl);
      min-height: 300px;
    }

    /* Full height variant */
    .ux-state--full {
      min-height: 100%;
      flex: 1;
    }

    /* ==========================================================================
       State Icon
       ========================================================================== */

    .ux-state__icon {
      width: var(--ux-state-icon-size);
      height: var(--ux-state-icon-size);
      color: var(--ux-state-icon-color);
      opacity: 0.6;
      margin-bottom: var(--ux-space-sm);
      transition: transform var(--ux-transition-normal) var(--ux-ease-ios);
    }

    .ux-state__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-state__icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Animated icon */
    .ux-state__icon--animated {
      animation: ux-state-float 3s ease-in-out infinite;
    }

    @keyframes ux-state-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    /* Icon with background circle */
    .ux-state__icon--circle {
      padding: var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-radius: 50%;
      width: auto;
      height: auto;
    }

    .ux-state__icon--circle svg {
      width: var(--ux-state-icon-size);
      height: var(--ux-state-icon-size);
    }

    /* ==========================================================================
       State Content
       ========================================================================== */

    .ux-state__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-xs);
      max-width: 320px;
    }

    .ux-state__title {
      font-size: var(--ux-state-title-size);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
    }

    .ux-state__description {
      font-size: var(--ux-state-description-size);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.5;
    }

    /* ==========================================================================
       State Actions
       ========================================================================== */

    .ux-state__actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
    }

    .ux-state__actions--row {
      flex-direction: row;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-empty-state {
      --ux-state-icon-color: var(--ux-text-tertiary);
    }

    .ux-empty-state .ux-state__icon {
      opacity: 0.5;
    }

    /* ==========================================================================
       Error State
       ========================================================================== */

    .ux-error-state {
      --ux-state-icon-color: var(--ux-danger);
    }

    .ux-error-state .ux-state__icon {
      opacity: 0.8;
    }

    .ux-error-state .ux-state__title {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Success State
       ========================================================================== */

    .ux-success-state {
      --ux-state-icon-color: var(--ux-success);
    }

    .ux-success-state .ux-state__icon {
      opacity: 0.8;
    }

    .ux-success-state .ux-state__title {
      color: var(--ux-success);
    }

    /* Checkmark animation */
    .ux-success-state .ux-state__icon--animated svg {
      animation: ux-state-checkmark 0.5s ease-out forwards;
    }

    @keyframes ux-state-checkmark {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }

    /* ==========================================================================
       Warning State
       ========================================================================== */

    .ux-warning-state {
      --ux-state-icon-color: var(--ux-warning);
    }

    .ux-warning-state .ux-state__icon {
      opacity: 0.8;
    }

    .ux-warning-state .ux-state__title {
      color: var(--ux-warning);
    }

    /* ==========================================================================
       Info State
       ========================================================================== */

    .ux-info-state {
      --ux-state-icon-color: var(--ux-primary);
    }

    .ux-info-state .ux-state__icon {
      opacity: 0.8;
    }

    /* ==========================================================================
       Offline State
       ========================================================================== */

    .ux-offline-state {
      --ux-state-icon-color: var(--ux-text-tertiary);
    }

    .ux-offline-state .ux-state__icon svg {
      stroke-dasharray: 100;
      animation: ux-state-offline-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-state-offline-pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    /* ==========================================================================
       Loading State (Alternative to spinner)
       ========================================================================== */

    .ux-loading-state {
      --ux-state-icon-color: var(--ux-primary);
    }

    .ux-loading-state .ux-state__icon svg {
      animation: ux-state-spin 1s linear infinite;
    }

    @keyframes ux-state-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* ==========================================================================
       Search Empty State
       ========================================================================== */

    .ux-search-empty-state {
      --ux-state-icon-color: var(--ux-text-tertiary);
    }

    .ux-search-empty-state .ux-state__highlight {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
      padding: 2px 8px;
      border-radius: var(--ux-border-radius-sm);
      font-weight: 500;
    }

    /* ==========================================================================
       No Permission State
       ========================================================================== */

    .ux-no-permission-state {
      --ux-state-icon-color: var(--ux-danger);
    }

    /* ==========================================================================
       Inline State (Compact for lists/cards)
       ========================================================================== */

    .ux-state--inline {
      flex-direction: row;
      text-align: left;
      padding: var(--ux-space-md);
      min-height: auto;
      gap: var(--ux-space-md);
    }

    .ux-state--inline .ux-state__icon {
      width: 40px;
      height: 40px;
      margin-bottom: 0;
      flex-shrink: 0;
    }

    .ux-state--inline .ux-state__content {
      align-items: flex-start;
      max-width: none;
    }

    .ux-state--inline .ux-state__actions {
      margin-top: var(--ux-space-sm);
      align-items: flex-start;
    }

    /* ==========================================================================
       Card State (With border)
       ========================================================================== */

    .ux-state--card {
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
    }

    .ux-state--card.ux-error-state {
      border-color: rgba(var(--ux-danger-rgb), 0.3);
      background: rgba(var(--ux-danger-rgb), 0.03);
    }

    .ux-state--card.ux-success-state {
      border-color: rgba(var(--ux-success-rgb), 0.3);
      background: rgba(var(--ux-success-rgb), 0.03);
    }

    .ux-state--card.ux-warning-state {
      border-color: rgba(var(--ux-warning-rgb), 0.3);
      background: rgba(var(--ux-warning-rgb), 0.03);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-state--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border: 1px solid var(--ux-glass-border);
      border-radius: var(--ux-border-radius-lg);
    }

    .ux-state--glass .ux-state__icon--circle {
      background: rgba(255, 255, 255, 0.2);
    }

    /* ==========================================================================
       Connection Status Banner
       ========================================================================== */

    .ux-connection-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      transition: all var(--ux-transition-normal) var(--ux-ease-ios);
    }

    .ux-connection-status__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: ux-status-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-status-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.9); }
    }

    /* Online */
    .ux-connection-status--online {
      background: rgba(var(--ux-success-rgb), 0.1);
      color: var(--ux-success);
    }

    .ux-connection-status--online .ux-connection-status__dot {
      background: var(--ux-success);
    }

    /* Offline */
    .ux-connection-status--offline {
      background: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-connection-status--offline .ux-connection-status__dot {
      background: var(--ux-danger);
    }

    /* Reconnecting */
    .ux-connection-status--reconnecting {
      background: rgba(var(--ux-warning-rgb), 0.1);
      color: var(--ux-warning);
    }

    .ux-connection-status--reconnecting .ux-connection-status__dot {
      background: var(--ux-warning);
      animation: ux-status-blink 0.5s ease-in-out infinite;
    }

    @keyframes ux-status-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* ==========================================================================
       Page-Level States (Full viewport)
       ========================================================================== */

    .ux-page-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      padding: var(--ux-space-xl);
    }

    .ux-page-state .ux-state {
      max-width: 400px;
    }

    /* ==========================================================================
       List Empty State
       ========================================================================== */

    .ux-list-empty {
      padding: var(--ux-space-xl) var(--ux-space-lg);
    }

    /* ==========================================================================
       Table Empty State
       ========================================================================== */

    .ux-table-empty {
      padding: var(--ux-space-2xl);
    }

    .ux-table-empty td {
      text-align: center;
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-state__icon--circle {
        background: var(--ux-surface-tertiary);
      }

      :root:not(.ux-light) .ux-state--card {
        background: var(--ux-surface-secondary);
      }

      :root:not(.ux-light) .ux-state--glass .ux-state__icon--circle {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-state__icon--circle {
      background: var(--ux-surface-tertiary);
    }

    .ux-dark .ux-state--card {
      background: var(--ux-surface-secondary);
    }

    .ux-dark .ux-state--glass .ux-state__icon--circle {
      background: rgba(255, 255, 255, 0.1);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-state__icon--animated,
      .ux-loading-state .ux-state__icon svg,
      .ux-offline-state .ux-state__icon svg,
      .ux-connection-status__dot,
      .ux-success-state .ux-state__icon--animated svg {
        animation: none;
      }
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-state {
        --ux-state-padding: var(--ux-space-xl);
        --ux-state-icon-size: 56px;
      }

      .ux-state--lg {
        --ux-state-icon-size: 64px;
      }

      .ux-state__content {
        max-width: 280px;
      }

      .ux-state__actions--row {
        flex-direction: column;
        width: 100%;
      }

      .ux-state__actions--row .ux-button {
        width: 100%;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-state-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-state-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // SVG Icons for states
  const stateIcons = {
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 7.5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9"/>
      <path d="M16.5 2H7.5a2 2 0 0 0-2 2v1.5h13V4a2 2 0 0 0-2-2z"/>
      <path d="M12 11v4"/>
      <path d="M12 18.5v.5"/>
    </svg>`,

    emptyFolder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      <line x1="12" y1="11" x2="12" y2="17"/>
      <line x1="9" y1="14" x2="15" y2="14"/>
    </svg>`,

    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>`,

    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="16 10 11 15 8 12"/>
    </svg>`,

    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>`,

    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>`,

    offline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>`,

    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>`,

    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>`,

    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="10" y1="11" x2="14" y2="11"/>
    </svg>`,

    file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="12" x2="12" y2="18"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>`,

    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,

    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>`,

    inbox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>`
  };

  // Export icons for use
  if (window.UX) {
    window.UX.stateIcons = stateIcons;
  }

  window.UXStateIcons = stateIcons;

})();
