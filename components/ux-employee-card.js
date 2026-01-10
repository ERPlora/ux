/**
 * UX Employee Card Component
 * Employee cards for directories, team pages, and HR applications
 * CSS-only component that composes ux-avatar, ux-badge, ux-status-indicator, ux-button
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Employee Card
    ======================================== */

    :root {
      --ux-employee-card-radius: var(--ux-border-radius-lg);
      --ux-employee-card-padding: var(--ux-space-md);
      --ux-employee-card-gap: var(--ux-space-sm);
      --ux-employee-card-avatar-size: 64px;
      --ux-employee-card-avatar-size-compact: 40px;
    }

    .ux-employee-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-employee-card-gap);
      padding: var(--ux-employee-card-padding);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-employee-card-radius);
      text-align: center;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-employee-card:hover {
      box-shadow: var(--ux-shadow-md);
    }

    /* Clickable variant */
    .ux-employee-card--clickable {
      cursor: pointer;
    }

    .ux-employee-card--clickable:hover {
      border-color: var(--ux-primary);
    }

    .ux-employee-card--clickable:active {
      transform: scale(0.98);
    }

    /* Selected state */
    .ux-employee-card--selected {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 2px rgba(var(--ux-primary-rgb), 0.2);
    }

    /* ========================================
       Avatar Section
    ======================================== */

    .ux-employee-card__avatar {
      position: relative;
      width: var(--ux-employee-card-avatar-size);
      height: var(--ux-employee-card-avatar-size);
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background-color: var(--ux-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-medium-contrast);
      text-transform: uppercase;
    }

    .ux-employee-card__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-employee-card__avatar--primary { background-color: var(--ux-primary); color: var(--ux-primary-contrast); }
    .ux-employee-card__avatar--secondary { background-color: var(--ux-secondary); color: var(--ux-secondary-contrast); }
    .ux-employee-card__avatar--tertiary { background-color: var(--ux-tertiary); color: var(--ux-tertiary-contrast); }
    .ux-employee-card__avatar--success { background-color: var(--ux-success); color: var(--ux-success-contrast); }
    .ux-employee-card__avatar--warning { background-color: var(--ux-warning); color: var(--ux-warning-contrast); }
    .ux-employee-card__avatar--danger { background-color: var(--ux-danger); color: var(--ux-danger-contrast); }

    /* ========================================
       Status Indicator (positioned on avatar)
    ======================================== */

    .ux-employee-card__status {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid var(--ux-surface);
      background-color: var(--ux-gray-400);
    }

    .ux-employee-card__status--available,
    .ux-employee-card__status--online {
      background-color: var(--ux-success);
    }

    .ux-employee-card__status--busy,
    .ux-employee-card__status--dnd {
      background-color: var(--ux-danger);
    }

    .ux-employee-card__status--away,
    .ux-employee-card__status--idle {
      background-color: var(--ux-warning);
    }

    .ux-employee-card__status--offline {
      background-color: var(--ux-gray-400);
    }

    /* Pulse animation for available status */
    .ux-employee-card__status--pulse {
      animation: ux-employee-status-pulse 2s ease-in-out infinite;
    }

    @keyframes ux-employee-status-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* ========================================
       Info Section
    ======================================== */

    .ux-employee-card__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      width: 100%;
    }

    .ux-employee-card__name {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      line-height: 1.3;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-employee-card__title {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ========================================
       Department Badge
    ======================================== */

    .ux-employee-card__department {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px var(--ux-space-sm);
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      border-radius: var(--ux-border-radius-full);
      margin-top: var(--ux-space-xs);
    }

    .ux-employee-card__department--engineering { background-color: rgba(var(--ux-blue-500-rgb, 59, 130, 246), 0.1); color: var(--ux-blue-600, #2563eb); }
    .ux-employee-card__department--design { background-color: rgba(var(--ux-purple-500-rgb, 168, 85, 247), 0.1); color: var(--ux-purple-600, #9333ea); }
    .ux-employee-card__department--marketing { background-color: rgba(var(--ux-rose-500-rgb, 244, 63, 94), 0.1); color: var(--ux-rose-600, #e11d48); }
    .ux-employee-card__department--sales { background-color: rgba(var(--ux-green-500-rgb, 34, 197, 94), 0.1); color: var(--ux-green-600, #16a34a); }
    .ux-employee-card__department--hr { background-color: rgba(var(--ux-amber-500-rgb, 245, 158, 11), 0.1); color: var(--ux-amber-600, #d97706); }
    .ux-employee-card__department--finance { background-color: rgba(var(--ux-cyan-500-rgb, 6, 182, 212), 0.1); color: var(--ux-cyan-600, #0891b2); }
    .ux-employee-card__department--operations { background-color: rgba(var(--ux-gray-500-rgb, 107, 114, 128), 0.1); color: var(--ux-gray-600, #4b5563); }
    .ux-employee-card__department--support { background-color: rgba(var(--ux-teal-500-rgb, 20, 184, 166), 0.1); color: var(--ux-teal-600, #0d9488); }

    /* ========================================
       Contact Info
    ======================================== */

    .ux-employee-card__contact {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
      width: 100%;
      margin-top: var(--ux-space-xs);
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-employee-card__contact-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-decoration: none;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-employee-card__contact-item:hover {
      color: var(--ux-primary);
    }

    .ux-employee-card__contact-item svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      opacity: 0.7;
    }

    .ux-employee-card__contact-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ========================================
       Actions
    ======================================== */

    .ux-employee-card__actions {
      display: flex;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-sm);
      width: 100%;
      justify-content: center;
    }

    .ux-employee-card__action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      background-color: var(--ux-surface);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-employee-card__action:hover {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-employee-card__action:active {
      transform: scale(0.95);
    }

    .ux-employee-card__action svg {
      width: 18px;
      height: 18px;
    }

    .ux-employee-card__action--call:hover { background-color: var(--ux-success); border-color: var(--ux-success); }
    .ux-employee-card__action--email:hover { background-color: var(--ux-primary); border-color: var(--ux-primary); }
    .ux-employee-card__action--chat:hover { background-color: var(--ux-tertiary); border-color: var(--ux-tertiary); }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-employee-card--compact {
      flex-direction: row;
      text-align: left;
      padding: var(--ux-space-sm);
    }

    .ux-employee-card--compact .ux-employee-card__avatar {
      width: var(--ux-employee-card-avatar-size-compact);
      height: var(--ux-employee-card-avatar-size-compact);
      font-size: var(--ux-font-size-md);
    }

    .ux-employee-card--compact .ux-employee-card__status {
      width: 10px;
      height: 10px;
      bottom: 0;
      right: 0;
    }

    .ux-employee-card--compact .ux-employee-card__info {
      flex: 1;
      align-items: flex-start;
    }

    .ux-employee-card--compact .ux-employee-card__name {
      font-size: var(--ux-font-size-sm);
    }

    .ux-employee-card--compact .ux-employee-card__title {
      font-size: var(--ux-font-size-xs);
    }

    .ux-employee-card--compact .ux-employee-card__department {
      margin-top: 2px;
      padding: 1px var(--ux-space-xs);
      font-size: 10px;
    }

    .ux-employee-card--compact .ux-employee-card__contact {
      display: none;
    }

    .ux-employee-card--compact .ux-employee-card__actions {
      margin-top: 0;
      width: auto;
      flex-shrink: 0;
    }

    .ux-employee-card--compact .ux-employee-card__action {
      width: 32px;
      height: 32px;
    }

    .ux-employee-card--compact .ux-employee-card__action svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Horizontal Layout
    ======================================== */

    .ux-employee-card--horizontal {
      flex-direction: row;
      text-align: left;
      align-items: flex-start;
    }

    .ux-employee-card--horizontal .ux-employee-card__info {
      flex: 1;
      align-items: flex-start;
    }

    .ux-employee-card--horizontal .ux-employee-card__contact {
      flex-direction: row;
      flex-wrap: wrap;
      border-top: none;
      padding-top: 0;
      margin-top: var(--ux-space-sm);
    }

    .ux-employee-card--horizontal .ux-employee-card__actions {
      flex-direction: column;
      width: auto;
      margin-top: 0;
      margin-left: var(--ux-space-md);
    }

    /* ========================================
       Employee Grid
    ======================================== */

    .ux-employee-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-employee-grid--2 { grid-template-columns: repeat(2, 1fr); }
    .ux-employee-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .ux-employee-grid--4 { grid-template-columns: repeat(4, 1fr); }
    .ux-employee-grid--5 { grid-template-columns: repeat(5, 1fr); }

    .ux-employee-grid--compact {
      gap: var(--ux-space-sm);
    }

    /* Responsive grid */
    @media (max-width: 991px) {
      .ux-employee-grid--4,
      .ux-employee-grid--5 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 767px) {
      .ux-employee-grid--3,
      .ux-employee-grid--4,
      .ux-employee-grid--5 {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-employee-grid {
        gap: var(--ux-space-sm);
      }
    }

    @media (max-width: 480px) {
      .ux-employee-grid,
      .ux-employee-grid--2,
      .ux-employee-grid--3,
      .ux-employee-grid--4,
      .ux-employee-grid--5 {
        grid-template-columns: 1fr;
      }
    }

    /* ========================================
       Employee List (for compact cards)
    ======================================== */

    .ux-employee-list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-employee-list .ux-employee-card--compact {
      border-radius: var(--ux-border-radius);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-employee-card--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-employee-card--glass .ux-employee-card__status {
      border-color: var(--ux-glass-bg);
    }

    .ux-employee-card--glass .ux-employee-card__contact {
      border-color: var(--ux-glass-border);
    }

    .ux-employee-card--glass .ux-employee-card__action {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-employee-card {
        background-color: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-employee-card__status {
        border-color: var(--ux-surface);
      }

      .ux-employee-card__department {
        background-color: rgba(var(--ux-primary-rgb), 0.15);
      }
    }

    .ux-dark .ux-employee-card {
      background-color: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-employee-card__status {
      border-color: var(--ux-surface);
    }

    .ux-dark .ux-employee-card__department {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-employee-card,
      .ux-employee-card__action,
      .ux-employee-card__contact-item {
        transition: none;
      }

      .ux-employee-card__status--pulse {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-employee-card-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-employee-card-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
