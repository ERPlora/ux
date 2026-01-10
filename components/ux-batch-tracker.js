/**
 * UX Batch Tracker Component
 * Manufacturing batch/lot tracking with status timeline and traceability
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Batch Tracker - Variables
       ========================================================================== */

    :root {
      --ux-batch-tracker-radius: var(--ux-radius-lg);
      --ux-batch-tracker-padding: var(--ux-space-lg);
      --ux-batch-tracker-gap: var(--ux-space-md);
      --ux-batch-tracker-timeline-line: 2px;
      --ux-batch-tracker-marker-size: 24px;
      --ux-batch-tracker-marker-size-lg: 32px;
    }

    /* ==========================================================================
       Batch Card - Main Container
       ========================================================================== */

    .ux-batch-card {
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-batch-tracker-radius);
      padding: var(--ux-batch-tracker-padding);
      font-family: var(--ux-font-family);
    }

    .ux-batch-card__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-md);
      margin-bottom: var(--ux-space-lg);
    }

    .ux-batch-card__title-group {
      flex: 1;
      min-width: 0;
    }

    .ux-batch-card__batch-number {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
      letter-spacing: 0.5px;
    }

    .ux-batch-card__product-name {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-batch-card__qr {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xs);
    }

    .ux-batch-card__qr svg,
    .ux-batch-card__qr img {
      width: 100%;
      height: 100%;
    }

    .ux-batch-card__body {
      display: flex;
      flex-direction: column;
      gap: var(--ux-batch-tracker-gap);
    }

    .ux-batch-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      margin-top: var(--ux-space-lg);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ==========================================================================
       Batch Status Badge
       ========================================================================== */

    .ux-batch-status {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: 999px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-batch-status__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: ux-batch-pulse 2s infinite;
    }

    @keyframes ux-batch-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .ux-batch-status--created {
      background: rgba(var(--ux-gray-500-rgb, 107, 114, 128), 0.15);
      color: var(--ux-gray-600);
    }
    .ux-batch-status--created .ux-batch-status__dot { background: var(--ux-gray-500); animation: none; }

    .ux-batch-status--in-progress {
      background: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }
    .ux-batch-status--in-progress .ux-batch-status__dot { background: var(--ux-primary); }

    .ux-batch-status--qc {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade, #d97706);
    }
    .ux-batch-status--qc .ux-batch-status__dot { background: var(--ux-warning); }

    .ux-batch-status--completed {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }
    .ux-batch-status--completed .ux-batch-status__dot { background: var(--ux-success); animation: none; }

    .ux-batch-status--shipped {
      background: rgba(var(--ux-cyan-500-rgb, 6, 182, 212), 0.15);
      color: var(--ux-cyan-600, #0891b2);
    }
    .ux-batch-status--shipped .ux-batch-status__dot { background: var(--ux-cyan-500, #06b6d4); animation: none; }

    .ux-batch-status--rejected {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }
    .ux-batch-status--rejected .ux-batch-status__dot { background: var(--ux-danger); animation: none; }

    .ux-batch-status--quarantine {
      background: rgba(var(--ux-purple-500-rgb, 139, 92, 246), 0.15);
      color: var(--ux-purple-600, #7c3aed);
    }
    .ux-batch-status--quarantine .ux-batch-status__dot { background: var(--ux-purple-500, #8b5cf6); }

    /* ==========================================================================
       Batch Info Grid
       ========================================================================== */

    .ux-batch-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-batch-info__item {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-2xs, 2px);
    }

    .ux-batch-info__label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-batch-info__value {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-batch-info__value--mono {
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
    }

    .ux-batch-info__value--danger {
      color: var(--ux-danger);
    }

    .ux-batch-info__value--warning {
      color: var(--ux-warning-shade, #d97706);
    }

    .ux-batch-info__value--success {
      color: var(--ux-success);
    }

    /* ==========================================================================
       Quantity Tracking
       ========================================================================== */

    .ux-batch-quantity {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-batch-quantity__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ux-batch-quantity__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-batch-quantity__values {
      display: flex;
      gap: var(--ux-space-lg);
      font-size: var(--ux-font-size-sm);
    }

    .ux-batch-quantity__stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .ux-batch-quantity__stat-value {
      font-size: var(--ux-font-size-lg);
      font-weight: 700;
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
    }

    .ux-batch-quantity__stat-value--initial { color: var(--ux-text); }
    .ux-batch-quantity__stat-value--current { color: var(--ux-primary); }
    .ux-batch-quantity__stat-value--rejected { color: var(--ux-danger); }
    .ux-batch-quantity__stat-value--yield { color: var(--ux-success); }

    .ux-batch-quantity__stat-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-batch-quantity__bar {
      height: 8px;
      background: var(--ux-surface-secondary);
      border-radius: 999px;
      overflow: hidden;
      display: flex;
    }

    .ux-batch-quantity__bar-segment {
      height: 100%;
      transition: width var(--ux-transition-normal);
    }

    .ux-batch-quantity__bar-segment--good {
      background: var(--ux-success);
    }

    .ux-batch-quantity__bar-segment--rejected {
      background: var(--ux-danger);
    }

    .ux-batch-quantity__bar-segment--remaining {
      background: var(--ux-border-color);
    }

    /* ==========================================================================
       Expiry Indicator
       ========================================================================== */

    .ux-batch-expiry {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
    }

    .ux-batch-expiry__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .ux-batch-expiry__content {
      flex: 1;
    }

    .ux-batch-expiry__label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-batch-expiry__date {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-batch-expiry__days {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .ux-batch-expiry--ok .ux-batch-expiry__icon { color: var(--ux-success); }
    .ux-batch-expiry--ok .ux-batch-expiry__days { background: rgba(var(--ux-success-rgb), 0.15); color: var(--ux-success); }

    .ux-batch-expiry--warning .ux-batch-expiry__icon { color: var(--ux-warning); }
    .ux-batch-expiry--warning .ux-batch-expiry__days { background: rgba(var(--ux-warning-rgb), 0.15); color: var(--ux-warning-shade, #d97706); }

    .ux-batch-expiry--danger .ux-batch-expiry__icon { color: var(--ux-danger); }
    .ux-batch-expiry--danger .ux-batch-expiry__days { background: rgba(var(--ux-danger-rgb), 0.15); color: var(--ux-danger); }

    .ux-batch-expiry--expired .ux-batch-expiry__icon { color: var(--ux-danger); }
    .ux-batch-expiry--expired .ux-batch-expiry__date { color: var(--ux-danger); text-decoration: line-through; }
    .ux-batch-expiry--expired .ux-batch-expiry__days { background: var(--ux-danger); color: white; }

    /* ==========================================================================
       Status Timeline
       ========================================================================== */

    .ux-batch-timeline {
      position: relative;
      padding-left: calc(var(--ux-batch-tracker-marker-size) / 2 + var(--ux-space-lg));
    }

    .ux-batch-timeline::before {
      content: '';
      position: absolute;
      left: calc(var(--ux-batch-tracker-marker-size) / 2 - 1px);
      top: var(--ux-batch-tracker-marker-size);
      bottom: var(--ux-batch-tracker-marker-size);
      width: var(--ux-batch-tracker-timeline-line);
      background: var(--ux-border-color);
    }

    .ux-batch-timeline--horizontal {
      display: flex;
      padding-left: 0;
      padding-top: calc(var(--ux-batch-tracker-marker-size) / 2 + var(--ux-space-md));
      overflow-x: auto;
      gap: 0;
    }

    .ux-batch-timeline--horizontal::before {
      left: var(--ux-batch-tracker-marker-size);
      right: var(--ux-batch-tracker-marker-size);
      top: calc(var(--ux-batch-tracker-marker-size) / 2 - 1px);
      bottom: auto;
      width: auto;
      height: var(--ux-batch-tracker-timeline-line);
    }

    .ux-batch-timeline__item {
      position: relative;
      padding-bottom: var(--ux-space-lg);
    }

    .ux-batch-timeline__item:last-child {
      padding-bottom: 0;
    }

    .ux-batch-timeline--horizontal .ux-batch-timeline__item {
      flex: 0 0 auto;
      min-width: 120px;
      padding-bottom: 0;
      padding-right: var(--ux-space-lg);
      text-align: center;
    }

    .ux-batch-timeline--horizontal .ux-batch-timeline__item:last-child {
      padding-right: 0;
    }

    .ux-batch-timeline__marker {
      position: absolute;
      left: calc(-1 * var(--ux-batch-tracker-marker-size) / 2 - var(--ux-space-lg));
      top: 0;
      width: var(--ux-batch-tracker-marker-size);
      height: var(--ux-batch-tracker-marker-size);
      border-radius: 50%;
      background: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .ux-batch-timeline--horizontal .ux-batch-timeline__marker {
      left: 50%;
      top: calc(-1 * var(--ux-batch-tracker-marker-size) / 2 - var(--ux-space-md));
      transform: translateX(-50%);
    }

    .ux-batch-timeline__marker svg {
      width: 14px;
      height: 14px;
      color: var(--ux-text-tertiary);
    }

    .ux-batch-timeline__item--completed .ux-batch-timeline__marker {
      background: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-batch-timeline__item--completed .ux-batch-timeline__marker svg {
      color: white;
    }

    .ux-batch-timeline__item--active .ux-batch-timeline__marker {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 4px rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-batch-timeline__item--active .ux-batch-timeline__marker svg {
      color: white;
    }

    .ux-batch-timeline__item--error .ux-batch-timeline__marker {
      background: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-batch-timeline__item--error .ux-batch-timeline__marker svg {
      color: white;
    }

    .ux-batch-timeline__content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-batch-timeline__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-batch-timeline__item--pending .ux-batch-timeline__title {
      color: var(--ux-text-tertiary);
    }

    .ux-batch-timeline__time {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-batch-timeline__description {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* ==========================================================================
       Location/Warehouse Info
       ========================================================================== */

    .ux-batch-location {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
    }

    .ux-batch-location__icon {
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
    }

    .ux-batch-location__content {
      flex: 1;
    }

    .ux-batch-location__name {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-batch-location__details {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    /* ==========================================================================
       Parent/Child Relationships
       ========================================================================== */

    .ux-batch-relations {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-batch-relations__title {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-batch-relations__list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-batch-relations__item {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      font-size: var(--ux-font-size-xs);
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-batch-relations__item:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-batch-relations__item svg {
      width: 12px;
      height: 12px;
      color: var(--ux-text-secondary);
    }

    .ux-batch-relations__item--parent {
      border-left: 3px solid var(--ux-primary);
    }

    .ux-batch-relations__item--child {
      border-left: 3px solid var(--ux-success);
    }

    /* ==========================================================================
       Traceability Links
       ========================================================================== */

    .ux-batch-trace {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-batch-trace__title {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-batch-trace__list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-batch-trace__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-batch-trace__item:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-batch-trace__item-info {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-batch-trace__item-icon {
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
    }

    .ux-batch-trace__item-label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
    }

    .ux-batch-trace__item-value {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
      color: var(--ux-primary);
    }

    /* ==========================================================================
       History Log
       ========================================================================== */

    .ux-batch-history {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-batch-history__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-batch-history__list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
      max-height: 300px;
      overflow-y: auto;
    }

    .ux-batch-history__item {
      display: flex;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      font-size: var(--ux-font-size-xs);
    }

    .ux-batch-history__item-time {
      flex-shrink: 0;
      width: 120px;
      color: var(--ux-text-tertiary);
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
    }

    .ux-batch-history__item-action {
      flex: 1;
      color: var(--ux-text);
    }

    .ux-batch-history__item-user {
      flex-shrink: 0;
      color: var(--ux-text-secondary);
    }

    /* ==========================================================================
       Search/Filter
       ========================================================================== */

    .ux-batch-search {
      display: flex;
      gap: var(--ux-space-sm);
      margin-bottom: var(--ux-space-lg);
    }

    .ux-batch-search__input {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
    }

    .ux-batch-search__input:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-batch-search__input svg {
      width: 18px;
      height: 18px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-batch-search__input input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      outline: none;
    }

    .ux-batch-search__input input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Batch List
       ========================================================================== */

    .ux-batch-list {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-batch-list__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-batch-list__item:hover {
      border-color: var(--ux-primary);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-batch-list__item-main {
      flex: 1;
      min-width: 0;
    }

    .ux-batch-list__item-batch {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      font-family: var(--ux-font-mono, 'SF Mono', 'Fira Code', monospace);
      color: var(--ux-text);
    }

    .ux-batch-list__item-product {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-batch-list__item-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .ux-batch-list__item-qty {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-batch-list__item-date {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-batch-card--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-batch-card--glass .ux-batch-card__qr,
    .ux-batch-card--glass .ux-batch-info__item,
    .ux-batch-card--glass .ux-batch-location,
    .ux-batch-card--glass .ux-batch-expiry,
    .ux-batch-card--glass .ux-batch-relations__item,
    .ux-batch-card--glass .ux-batch-trace__item,
    .ux-batch-card--glass .ux-batch-history__item {
      background: var(--ux-glass-bg-thin, rgba(255, 255, 255, 0.5));
    }

    /* Universal glass selector */
    [class*="--glass"].ux-batch-card {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-batch-status--created {
        background: rgba(156, 163, 175, 0.2);
        color: var(--ux-gray-400);
      }

      .ux-batch-status--shipped {
        background: rgba(6, 182, 212, 0.2);
      }

      .ux-batch-status--quarantine {
        background: rgba(139, 92, 246, 0.2);
      }
    }

    .ux-dark .ux-batch-status--created {
      background: rgba(156, 163, 175, 0.2);
      color: var(--ux-gray-400);
    }

    .ux-dark .ux-batch-status--shipped {
      background: rgba(6, 182, 212, 0.2);
    }

    .ux-dark .ux-batch-status--quarantine {
      background: rgba(139, 92, 246, 0.2);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-batch-card__header {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-batch-card__qr {
        align-self: center;
        margin-bottom: var(--ux-space-sm);
        order: -1;
      }

      .ux-batch-info {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-batch-quantity__values {
        flex-wrap: wrap;
        justify-content: center;
      }

      .ux-batch-timeline--horizontal {
        padding-top: calc(var(--ux-batch-tracker-marker-size) + var(--ux-space-sm));
      }

      .ux-batch-timeline--horizontal .ux-batch-timeline__item {
        min-width: 100px;
      }
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-batch-status__dot {
        animation: none;
      }

      .ux-batch-quantity__bar-segment {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-batch-tracker-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-batch-tracker-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const batchTrackerData = (options = {}) => ({
    // Batch identification
    batchNumber: options.batchNumber || '',
    lotNumber: options.lotNumber || '',
    productName: options.productName || '',
    productSku: options.productSku || '',

    // Status
    status: options.status || 'created', // created, in-progress, qc, completed, shipped, rejected, quarantine
    statusHistory: options.statusHistory || [],

    // Quantities
    initialQuantity: options.initialQuantity || 0,
    currentQuantity: options.currentQuantity || 0,
    rejectedQuantity: options.rejectedQuantity || 0,
    unit: options.unit || 'units',

    // Dates
    createdAt: options.createdAt || null,
    expiryDate: options.expiryDate || null,
    manufacturedDate: options.manufacturedDate || null,

    // Location
    location: options.location || null, // { name, zone, shelf, bin }

    // Relationships
    parentBatches: options.parentBatches || [], // [{ number, product }]
    childBatches: options.childBatches || [],

    // Traceability
    traceLinks: options.traceLinks || [], // [{ type, label, value, url }]

    // History log
    history: options.history || [], // [{ timestamp, action, user, details }]

    // Timeline steps
    timelineSteps: options.timelineSteps || [
      { id: 'created', title: 'Created', icon: 'plus' },
      { id: 'in-progress', title: 'In Progress', icon: 'cog' },
      { id: 'qc', title: 'QC Check', icon: 'check-circle' },
      { id: 'completed', title: 'Completed', icon: 'package' },
      { id: 'shipped', title: 'Shipped', icon: 'truck' }
    ],

    // Search
    searchQuery: '',
    batches: options.batches || [],
    filteredBatches: [],

    // QR code
    showQR: options.showQR ?? true,
    qrData: options.qrData || null,

    init() {
      this.filteredBatches = [...this.batches];
      this.$watch('searchQuery', () => this.filterBatches());
    },

    // Computed properties
    get yieldPercentage() {
      if (this.initialQuantity === 0) return 0;
      return ((this.currentQuantity / this.initialQuantity) * 100).toFixed(1);
    },

    get rejectedPercentage() {
      if (this.initialQuantity === 0) return 0;
      return ((this.rejectedQuantity / this.initialQuantity) * 100).toFixed(1);
    },

    get daysUntilExpiry() {
      if (!this.expiryDate) return null;
      const expiry = new Date(this.expiryDate);
      const today = new Date();
      const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      return diff;
    },

    get expiryStatus() {
      const days = this.daysUntilExpiry;
      if (days === null) return 'none';
      if (days < 0) return 'expired';
      if (days <= 7) return 'danger';
      if (days <= 30) return 'warning';
      return 'ok';
    },

    get statusIndex() {
      const statusOrder = ['created', 'in-progress', 'qc', 'completed', 'shipped'];
      return statusOrder.indexOf(this.status);
    },

    // Methods
    getStatusLabel(status) {
      const labels = {
        'created': 'Created',
        'in-progress': 'In Progress',
        'qc': 'Quality Check',
        'completed': 'Completed',
        'shipped': 'Shipped',
        'rejected': 'Rejected',
        'quarantine': 'Quarantine'
      };
      return labels[status] || status;
    },

    isStepCompleted(stepIndex) {
      return stepIndex < this.statusIndex;
    },

    isStepActive(stepIndex) {
      return stepIndex === this.statusIndex;
    },

    isStepPending(stepIndex) {
      return stepIndex > this.statusIndex;
    },

    getStepState(stepIndex) {
      if (this.status === 'rejected' && stepIndex === this.statusIndex) return 'error';
      if (this.isStepCompleted(stepIndex)) return 'completed';
      if (this.isStepActive(stepIndex)) return 'active';
      return 'pending';
    },

    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    },

    formatDateTime(date) {
      if (!date) return '-';
      return new Date(date).toLocaleString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    filterBatches() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) {
        this.filteredBatches = [...this.batches];
        return;
      }

      this.filteredBatches = this.batches.filter(batch => {
        return (
          batch.batchNumber?.toLowerCase().includes(query) ||
          batch.lotNumber?.toLowerCase().includes(query) ||
          batch.productName?.toLowerCase().includes(query) ||
          batch.productSku?.toLowerCase().includes(query)
        );
      });
    },

    selectBatch(batch) {
      this.$dispatch('batch:select', { batch });
    },

    viewParentBatch(batch) {
      this.$dispatch('batch:view-parent', { batch });
    },

    viewChildBatch(batch) {
      this.$dispatch('batch:view-child', { batch });
    },

    viewTraceLink(link) {
      this.$dispatch('batch:trace', { link });
    },

    updateStatus(newStatus) {
      const oldStatus = this.status;
      this.status = newStatus;
      this.statusHistory.push({
        from: oldStatus,
        to: newStatus,
        timestamp: new Date().toISOString()
      });
      this.$dispatch('batch:status-change', { oldStatus, newStatus });
    },

    addHistoryEntry(action, user = 'System', details = '') {
      this.history.unshift({
        timestamp: new Date().toISOString(),
        action,
        user,
        details
      });
      this.$dispatch('batch:history-add', { action, user, details });
    },

    generateQRData() {
      return JSON.stringify({
        batch: this.batchNumber,
        lot: this.lotNumber,
        product: this.productSku,
        expiry: this.expiryDate
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxBatchTracker', batchTrackerData);
  }

})();
