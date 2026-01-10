/**
 * UX Event Card Component
 * Cards para mostrar eventos de calendario con detalles, asistentes y acciones
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Event Card
    ======================================== */

    .ux-event-card {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--ux-surface);
      border-radius: var(--ux-card-border-radius);
      box-shadow: var(--ux-shadow-sm);
      overflow: hidden;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-event-card:hover {
      box-shadow: var(--ux-shadow-md);
    }

    /* ========================================
       Category Color Bar (left border)
    ======================================== */

    .ux-event-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: var(--ux-event-category-color, var(--ux-primary));
      border-radius: var(--ux-card-border-radius) 0 0 var(--ux-card-border-radius);
    }

    /* Category Colors */
    .ux-event-card--work { --ux-event-category-color: var(--ux-blue-500); }
    .ux-event-card--personal { --ux-event-category-color: var(--ux-green-500); }
    .ux-event-card--meeting { --ux-event-category-color: var(--ux-purple-500); }
    .ux-event-card--deadline { --ux-event-category-color: var(--ux-red-500); }
    .ux-event-card--reminder { --ux-event-category-color: var(--ux-yellow-500); }
    .ux-event-card--holiday { --ux-event-category-color: var(--ux-orange-500); }
    .ux-event-card--travel { --ux-event-category-color: var(--ux-cyan-500); }
    .ux-event-card--health { --ux-event-category-color: var(--ux-rose-500); }
    .ux-event-card--social { --ux-event-category-color: var(--ux-indigo-500); }
    .ux-event-card--other { --ux-event-category-color: var(--ux-gray-500); }

    /* ========================================
       Event Card Header
    ======================================== */

    .ux-event-card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-md) var(--ux-space-sm);
      padding-left: calc(var(--ux-space-md) + 8px); /* Account for color bar */
      gap: var(--ux-space-sm);
    }

    .ux-event-card__header-content {
      flex: 1;
      min-width: 0;
    }

    .ux-event-card__header-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
    }

    /* ========================================
       Event Title
    ======================================== */

    .ux-event-card__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-event-card__title a {
      color: inherit;
      text-decoration: none;
    }

    .ux-event-card__title a:hover {
      color: var(--ux-primary);
    }

    /* ========================================
       Event Description
    ======================================== */

    .ux-event-card__description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: var(--ux-space-xs) 0 0;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    /* ========================================
       Event Content (details area)
    ======================================== */

    .ux-event-card__content {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: 0 var(--ux-space-md) var(--ux-space-md);
      padding-left: calc(var(--ux-space-md) + 8px);
    }

    /* ========================================
       Event Meta Row (time, duration, location)
    ======================================== */

    .ux-event-card__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-event-card__meta-item {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-event-card__meta-item svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      opacity: 0.7;
    }

    /* ========================================
       Time Display
    ======================================== */

    .ux-event-card__time {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-event-card__time svg {
      width: 16px;
      height: 16px;
      color: var(--ux-event-category-color, var(--ux-primary));
    }

    .ux-event-card__time-range {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-event-card__time-separator {
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Duration Badge
    ======================================== */

    .ux-event-card__duration {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px 8px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-secondary);
      border-radius: var(--ux-radius-full);
    }

    .ux-event-card__duration svg {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Location
    ======================================== */

    .ux-event-card__location {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
    }

    .ux-event-card__location svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--ux-text-tertiary);
    }

    .ux-event-card__location a {
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-event-card__location a:hover {
      text-decoration: underline;
    }

    /* ========================================
       Attendees (Avatar Stack)
    ======================================== */

    .ux-event-card__attendees {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-event-card__attendees-stack {
      display: flex;
      flex-direction: row-reverse;
    }

    .ux-event-card__attendees-stack .ux-avatar {
      width: 28px;
      height: 28px;
      font-size: 10px;
      margin-left: -8px;
      border: 2px solid var(--ux-surface);
      box-sizing: content-box;
    }

    .ux-event-card__attendees-stack .ux-avatar:last-child {
      margin-left: 0;
    }

    .ux-event-card__attendees-more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin-left: -8px;
      font-size: 10px;
      font-weight: 600;
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-secondary);
      border-radius: 50%;
      border: 2px solid var(--ux-surface);
      box-sizing: content-box;
    }

    .ux-event-card__attendees-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Category Tag
    ======================================== */

    .ux-event-card__category {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px 8px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.12);
      color: var(--ux-event-category-color, var(--ux-primary));
      border-radius: var(--ux-radius-full);
    }

    .ux-event-card__category::before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: var(--ux-event-category-color, var(--ux-primary));
      border-radius: 50%;
    }

    /* Category tag colors */
    .ux-event-card--work .ux-event-card__category {
      background-color: rgba(59, 130, 246, 0.12);
      color: var(--ux-blue-600);
    }
    .ux-event-card--personal .ux-event-card__category {
      background-color: rgba(34, 197, 94, 0.12);
      color: var(--ux-green-600);
    }
    .ux-event-card--meeting .ux-event-card__category {
      background-color: rgba(168, 85, 247, 0.12);
      color: var(--ux-purple-600);
    }
    .ux-event-card--deadline .ux-event-card__category {
      background-color: rgba(239, 68, 68, 0.12);
      color: var(--ux-red-600);
    }
    .ux-event-card--reminder .ux-event-card__category {
      background-color: rgba(234, 179, 8, 0.12);
      color: var(--ux-yellow-600);
    }
    .ux-event-card--holiday .ux-event-card__category {
      background-color: rgba(249, 115, 22, 0.12);
      color: var(--ux-orange-600);
    }
    .ux-event-card--travel .ux-event-card__category {
      background-color: rgba(6, 182, 212, 0.12);
      color: var(--ux-cyan-600);
    }
    .ux-event-card--health .ux-event-card__category {
      background-color: rgba(244, 63, 94, 0.12);
      color: var(--ux-rose-600);
    }
    .ux-event-card--social .ux-event-card__category {
      background-color: rgba(99, 102, 241, 0.12);
      color: var(--ux-indigo-600);
    }
    .ux-event-card--other .ux-event-card__category {
      background-color: rgba(107, 114, 128, 0.12);
      color: var(--ux-gray-600);
    }

    /* ========================================
       Indicators (Reminder, Recurring)
    ======================================== */

    .ux-event-card__indicators {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-event-card__indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-tertiary);
    }

    .ux-event-card__indicator svg {
      width: 12px;
      height: 12px;
    }

    .ux-event-card__indicator--reminder {
      background-color: rgba(234, 179, 8, 0.15);
      color: var(--ux-yellow-600);
    }

    .ux-event-card__indicator--recurring {
      background-color: rgba(59, 130, 246, 0.15);
      color: var(--ux-blue-600);
    }

    /* ========================================
       Footer (Actions)
    ======================================== */

    .ux-event-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      padding-left: calc(var(--ux-space-md) + 8px);
      border-top: 1px solid var(--ux-border-color);
      gap: var(--ux-space-sm);
    }

    .ux-event-card__footer-start,
    .ux-event-card__footer-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-event-card__footer-end {
      margin-left: auto;
    }

    /* ========================================
       RSVP Status
    ======================================== */

    .ux-event-card__rsvp {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 4px 10px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      border-radius: var(--ux-radius-full);
    }

    .ux-event-card__rsvp--going {
      background-color: rgba(34, 197, 94, 0.12);
      color: var(--ux-green-600);
    }

    .ux-event-card__rsvp--maybe {
      background-color: rgba(234, 179, 8, 0.12);
      color: var(--ux-yellow-600);
    }

    .ux-event-card__rsvp--declined {
      background-color: rgba(239, 68, 68, 0.12);
      color: var(--ux-red-600);
    }

    .ux-event-card__rsvp--pending {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text-secondary);
    }

    .ux-event-card__rsvp svg {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Compact Variant (for calendar cells)
    ======================================== */

    .ux-event-card--compact {
      flex-direction: row;
      align-items: center;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-left: calc(var(--ux-space-sm) + 6px);
      gap: var(--ux-space-sm);
      min-height: 32px;
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    .ux-event-card--compact::before {
      width: 3px;
    }

    .ux-event-card--compact:hover {
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-event-card--compact .ux-event-card__header {
      padding: 0;
      flex: 1;
      min-width: 0;
    }

    .ux-event-card--compact .ux-event-card__title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-event-card--compact .ux-event-card__content,
    .ux-event-card--compact .ux-event-card__footer,
    .ux-event-card--compact .ux-event-card__description {
      display: none;
    }

    .ux-event-card--compact .ux-event-card__time {
      font-size: var(--ux-font-size-xs);
      font-weight: 400;
      color: var(--ux-text-secondary);
      white-space: nowrap;
    }

    .ux-event-card--compact .ux-event-card__time svg {
      display: none;
    }

    .ux-event-card--compact .ux-event-card__indicators {
      flex-shrink: 0;
    }

    .ux-event-card--compact .ux-event-card__indicator {
      width: 16px;
      height: 16px;
    }

    .ux-event-card--compact .ux-event-card__indicator svg {
      width: 10px;
      height: 10px;
    }

    /* ========================================
       All-Day Event Variant
    ======================================== */

    .ux-event-card--all-day {
      background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.08);
      border-left: none;
    }

    .ux-event-card--all-day::before {
      display: none;
    }

    .ux-event-card--all-day .ux-event-card__title {
      color: var(--ux-event-category-color, var(--ux-primary));
    }

    .ux-event-card--all-day .ux-event-card__time {
      display: none;
    }

    .ux-event-card--all-day .ux-event-card__all-day-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      background-color: var(--ux-event-category-color, var(--ux-primary));
      color: white;
      border-radius: var(--ux-radius-full);
    }

    .ux-event-card__all-day-badge {
      display: none;
    }

    /* All-day category backgrounds */
    .ux-event-card--all-day.ux-event-card--work { background-color: rgba(59, 130, 246, 0.1); }
    .ux-event-card--all-day.ux-event-card--personal { background-color: rgba(34, 197, 94, 0.1); }
    .ux-event-card--all-day.ux-event-card--meeting { background-color: rgba(168, 85, 247, 0.1); }
    .ux-event-card--all-day.ux-event-card--deadline { background-color: rgba(239, 68, 68, 0.1); }
    .ux-event-card--all-day.ux-event-card--reminder { background-color: rgba(234, 179, 8, 0.1); }
    .ux-event-card--all-day.ux-event-card--holiday { background-color: rgba(249, 115, 22, 0.1); }
    .ux-event-card--all-day.ux-event-card--travel { background-color: rgba(6, 182, 212, 0.1); }
    .ux-event-card--all-day.ux-event-card--health { background-color: rgba(244, 63, 94, 0.1); }
    .ux-event-card--all-day.ux-event-card--social { background-color: rgba(99, 102, 241, 0.1); }
    .ux-event-card--all-day.ux-event-card--other { background-color: rgba(107, 114, 128, 0.1); }

    /* ========================================
       Recurring Event Indicator
    ======================================== */

    .ux-event-card--recurring .ux-event-card__title::after {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-left: var(--ux-space-xs);
      vertical-align: middle;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.6;
    }

    /* ========================================
       Clickable Event Card
    ======================================== */

    .ux-event-card--clickable {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-event-card--clickable:active {
      transform: scale(0.98);
    }

    /* ========================================
       Past Event
    ======================================== */

    .ux-event-card--past {
      opacity: 0.6;
    }

    .ux-event-card--past::before {
      opacity: 0.5;
    }

    /* ========================================
       Cancelled Event
    ======================================== */

    .ux-event-card--cancelled {
      opacity: 0.5;
    }

    .ux-event-card--cancelled .ux-event-card__title {
      text-decoration: line-through;
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-event-card--glass {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-event-card--glass::before {
      background-color: var(--ux-event-category-color, var(--ux-primary));
    }

    .ux-event-card--glass:hover {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight), 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .ux-event-card--glass .ux-event-card__footer {
      border-top-color: var(--ux-glass-border);
    }

    .ux-event-card--glass .ux-event-card__duration,
    .ux-event-card--glass .ux-event-card__indicator,
    .ux-event-card--glass .ux-event-card__attendees-more {
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-event-card--outline {
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    .ux-event-card--outline:hover {
      box-shadow: var(--ux-shadow-sm);
      border-color: var(--ux-event-category-color, var(--ux-primary));
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-event-card--sm .ux-event-card__header {
      padding: var(--ux-space-sm) var(--ux-space-sm) var(--ux-space-xs);
      padding-left: calc(var(--ux-space-sm) + 6px);
    }

    .ux-event-card--sm .ux-event-card__content {
      padding: 0 var(--ux-space-sm) var(--ux-space-sm);
      padding-left: calc(var(--ux-space-sm) + 6px);
    }

    .ux-event-card--sm .ux-event-card__title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-event-card--sm .ux-event-card__description {
      font-size: var(--ux-font-size-xs);
    }

    .ux-event-card--sm::before {
      width: 3px;
    }

    .ux-event-card--lg .ux-event-card__header {
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-md);
      padding-left: calc(var(--ux-space-lg) + 10px);
    }

    .ux-event-card--lg .ux-event-card__content {
      padding: 0 var(--ux-space-lg) var(--ux-space-lg);
      padding-left: calc(var(--ux-space-lg) + 10px);
      gap: var(--ux-space-md);
    }

    .ux-event-card--lg .ux-event-card__footer {
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-left: calc(var(--ux-space-lg) + 10px);
    }

    .ux-event-card--lg .ux-event-card__title {
      font-size: var(--ux-font-size-lg);
    }

    .ux-event-card--lg::before {
      width: 5px;
    }

    /* ========================================
       Event Card Grid
    ======================================== */

    .ux-event-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-event-card-grid .ux-event-card {
      margin: 0;
    }

    /* ========================================
       Event Card List (stacked)
    ======================================== */

    .ux-event-card-list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-event-card-list .ux-event-card {
      margin: 0;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-theme-light):not(.ux-light) .ux-event-card--all-day {
        background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.15);
      }

      :root:not(.ux-theme-light):not(.ux-light) .ux-event-card__category {
        background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.2);
      }

      :root:not(.ux-theme-light):not(.ux-light) .ux-event-card--recurring .ux-event-card__title::after {
        filter: invert(1);
        opacity: 0.5;
      }
    }

    .ux-dark .ux-event-card--all-day,
    .ux-theme-dark .ux-event-card--all-day {
      background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.15);
    }

    .ux-dark .ux-event-card__category,
    .ux-theme-dark .ux-event-card__category {
      background-color: rgba(var(--ux-event-category-color-rgb, var(--ux-primary-rgb)), 0.2);
    }

    .ux-dark .ux-event-card--recurring .ux-event-card__title::after,
    .ux-theme-dark .ux-event-card--recurring .ux-event-card__title::after {
      filter: invert(1);
      opacity: 0.5;
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-event-card-grid {
        grid-template-columns: 1fr;
      }

      .ux-event-card__meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--ux-space-xs);
      }

      .ux-event-card__footer {
        flex-wrap: wrap;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-event-card {
        transition: none;
      }

      .ux-event-card--clickable:active {
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-event-card-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-event-card-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
