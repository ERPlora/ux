/**
 * UX Gantt Chart Component
 * Interactive Gantt chart for project management and task scheduling
 * @requires ux-core.js
 * @requires Alpine.js for interactivity
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Gantt Chart - CSS Variables
    ======================================== */

    :root {
      --ux-gantt-row-height: 40px;
      --ux-gantt-header-height: 48px;
      --ux-gantt-task-panel-width: 280px;
      --ux-gantt-cell-width-day: 40px;
      --ux-gantt-cell-width-week: 100px;
      --ux-gantt-cell-width-month: 120px;
      --ux-gantt-bar-height: 24px;
      --ux-gantt-bar-radius: 4px;
      --ux-gantt-milestone-size: 16px;
      --ux-gantt-today-line-color: var(--ux-danger);
      --ux-gantt-weekend-bg: rgba(0, 0, 0, 0.02);
      --ux-gantt-grid-color: var(--ux-border-color);
      --ux-gantt-dependency-color: var(--ux-gray-400);
    }

    /* ========================================
       Gantt Container
    ======================================== */

    .ux-gantt {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
      font-family: var(--ux-font-family);
    }

    .ux-gantt--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Gantt Toolbar
    ======================================== */

    .ux-gantt__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-gantt__toolbar-start,
    .ux-gantt__toolbar-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-gantt__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-gantt__zoom-controls {
      display: flex;
      align-items: center;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      overflow: hidden;
    }

    .ux-gantt__zoom-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 var(--ux-space-sm);
      background: none;
      border: none;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-gantt__zoom-btn:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-gantt__zoom-btn--active {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-gantt__zoom-btn--active:hover {
      background: var(--ux-primary-shade);
    }

    .ux-gantt__zoom-btn:not(:last-child) {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-gantt__nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-gantt__nav-btn:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
      border-color: var(--ux-primary);
    }

    .ux-gantt__nav-btn svg {
      width: 16px;
      height: 16px;
    }

    .ux-gantt__today-btn {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-gantt__today-btn:hover {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    /* ========================================
       Gantt Body (Main Area)
    ======================================== */

    .ux-gantt__body {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    /* ========================================
       Task Panel (Left Side)
    ======================================== */

    .ux-gantt__tasks {
      flex-shrink: 0;
      width: var(--ux-gantt-task-panel-width);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
      z-index: 10;
    }

    .ux-gantt__tasks-header {
      display: flex;
      align-items: center;
      height: var(--ux-gantt-header-height);
      padding: 0 var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-gantt__tasks-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .ux-gantt__task-row {
      display: flex;
      align-items: center;
      height: var(--ux-gantt-row-height);
      padding: 0 var(--ux-space-md);
      border-bottom: 1px solid var(--ux-gantt-grid-color);
      transition: background var(--ux-transition-fast);
    }

    .ux-gantt__task-row:hover {
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-gantt__task-row--selected {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-gantt__task-row--group {
      background: var(--ux-surface-secondary);
      font-weight: 600;
    }

    .ux-gantt__task-indent {
      flex-shrink: 0;
    }

    .ux-gantt__task-expand {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-right: var(--ux-space-xs);
      background: none;
      border: none;
      color: var(--ux-text-secondary);
      cursor: pointer;
      border-radius: var(--ux-radius-sm);
      transition: all var(--ux-transition-fast);
    }

    .ux-gantt__task-expand:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-gantt__task-expand svg {
      width: 14px;
      height: 14px;
      transition: transform var(--ux-transition-fast);
    }

    .ux-gantt__task-expand--expanded svg {
      transform: rotate(90deg);
    }

    .ux-gantt__task-name {
      flex: 1;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-gantt__task-status {
      flex-shrink: 0;
      margin-left: var(--ux-space-sm);
    }

    /* ========================================
       Resizer
    ======================================== */

    .ux-gantt__resizer {
      position: absolute;
      left: var(--ux-gantt-task-panel-width);
      top: 0;
      bottom: 0;
      width: 4px;
      background: transparent;
      cursor: col-resize;
      z-index: 20;
      transition: background var(--ux-transition-fast);
    }

    .ux-gantt__resizer:hover,
    .ux-gantt__resizer--active {
      background: var(--ux-primary);
    }

    /* ========================================
       Chart Area (Right Side)
    ======================================== */

    .ux-gantt__chart {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    .ux-gantt__chart-scroll {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .ux-gantt__chart-inner {
      position: relative;
      min-width: 100%;
    }

    /* ========================================
       Timeline Header
    ======================================== */

    .ux-gantt__header {
      position: sticky;
      top: 0;
      z-index: 5;
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-gantt__header-row {
      display: flex;
      height: calc(var(--ux-gantt-header-height) / 2);
    }

    .ux-gantt__header-row--primary {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-gantt__header-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: var(--ux-text-secondary);
      border-right: 1px solid var(--ux-gantt-grid-color);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ux-gantt__header-cell--primary {
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-gantt__header-cell--today {
      background: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      color: var(--ux-danger);
    }

    .ux-gantt__header-cell--weekend {
      background: var(--ux-gantt-weekend-bg);
    }

    /* ========================================
       Chart Grid
    ======================================== */

    .ux-gantt__grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    .ux-gantt__grid-row {
      display: flex;
      height: var(--ux-gantt-row-height);
      border-bottom: 1px solid var(--ux-gantt-grid-color);
    }

    .ux-gantt__grid-cell {
      flex-shrink: 0;
      border-right: 1px solid var(--ux-gantt-grid-color);
    }

    .ux-gantt__grid-cell--weekend {
      background: var(--ux-gantt-weekend-bg);
    }

    /* ========================================
       Today Line
    ======================================== */

    .ux-gantt__today-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--ux-gantt-today-line-color);
      z-index: 4;
      pointer-events: none;
    }

    .ux-gantt__today-line::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -4px;
      width: 10px;
      height: 10px;
      background: var(--ux-gantt-today-line-color);
      border-radius: 50%;
    }

    /* ========================================
       Bars Container
    ======================================== */

    .ux-gantt__bars {
      position: relative;
      z-index: 3;
    }

    .ux-gantt__bar-row {
      position: relative;
      height: var(--ux-gantt-row-height);
      display: flex;
      align-items: center;
    }

    /* ========================================
       Task Bar
    ======================================== */

    .ux-gantt__bar {
      position: absolute;
      height: var(--ux-gantt-bar-height);
      background: var(--ux-primary);
      border-radius: var(--ux-gantt-bar-radius);
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: box-shadow var(--ux-transition-fast), transform var(--ux-transition-fast);
    }

    .ux-gantt__bar:hover {
      box-shadow: var(--ux-shadow-md);
      z-index: 2;
    }

    .ux-gantt__bar--selected {
      box-shadow: 0 0 0 2px var(--ux-surface), 0 0 0 4px var(--ux-primary);
    }

    .ux-gantt__bar--dragging {
      opacity: 0.8;
      z-index: 10;
    }

    /* Bar States */
    .ux-gantt__bar--not-started {
      background: var(--ux-gray-300);
    }

    .ux-gantt__bar--in-progress {
      background: var(--ux-primary);
    }

    .ux-gantt__bar--completed {
      background: var(--ux-success);
    }

    .ux-gantt__bar--delayed {
      background: var(--ux-danger);
    }

    .ux-gantt__bar--on-hold {
      background: var(--ux-warning);
    }

    /* Category Colors */
    .ux-gantt__bar--category-design {
      background: var(--ux-purple-500);
    }

    .ux-gantt__bar--category-development {
      background: var(--ux-blue-500);
    }

    .ux-gantt__bar--category-testing {
      background: var(--ux-cyan-500);
    }

    .ux-gantt__bar--category-marketing {
      background: var(--ux-orange-500);
    }

    .ux-gantt__bar--category-management {
      background: var(--ux-indigo-500);
    }

    /* Progress indicator within bar */
    .ux-gantt__bar-progress {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.15);
      border-radius: var(--ux-gantt-bar-radius) 0 0 var(--ux-gantt-bar-radius);
      transition: width var(--ux-transition-normal);
    }

    .ux-gantt__bar-label {
      position: relative;
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1;
    }

    /* Bar resize handles */
    .ux-gantt__bar-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 8px;
      cursor: ew-resize;
      opacity: 0;
      transition: opacity var(--ux-transition-fast);
    }

    .ux-gantt__bar:hover .ux-gantt__bar-handle {
      opacity: 1;
    }

    .ux-gantt__bar-handle--start {
      left: 0;
      border-radius: var(--ux-gantt-bar-radius) 0 0 var(--ux-gantt-bar-radius);
      background: linear-gradient(to right, rgba(0,0,0,0.2), transparent);
    }

    .ux-gantt__bar-handle--end {
      right: 0;
      border-radius: 0 var(--ux-gantt-bar-radius) var(--ux-gantt-bar-radius) 0;
      background: linear-gradient(to left, rgba(0,0,0,0.2), transparent);
    }

    /* Group bar */
    .ux-gantt__bar--group {
      height: 8px;
      background: var(--ux-gray-600);
      border-radius: 0;
    }

    .ux-gantt__bar--group::before,
    .ux-gantt__bar--group::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .ux-gantt__bar--group::before {
      left: 0;
      border-width: 0 0 8px 8px;
      border-color: transparent transparent var(--ux-gray-600) transparent;
    }

    .ux-gantt__bar--group::after {
      right: 0;
      border-width: 8px 0 0 8px;
      border-color: transparent transparent transparent var(--ux-gray-600);
    }

    /* ========================================
       Milestone
    ======================================== */

    .ux-gantt__milestone {
      position: absolute;
      width: var(--ux-gantt-milestone-size);
      height: var(--ux-gantt-milestone-size);
      background: var(--ux-warning);
      transform: rotate(45deg) translateX(-50%);
      cursor: pointer;
      transition: box-shadow var(--ux-transition-fast), transform var(--ux-transition-fast);
    }

    .ux-gantt__milestone:hover {
      box-shadow: var(--ux-shadow-md);
      transform: rotate(45deg) translateX(-50%) scale(1.2);
    }

    .ux-gantt__milestone--completed {
      background: var(--ux-success);
    }

    .ux-gantt__milestone--delayed {
      background: var(--ux-danger);
    }

    /* ========================================
       Dependencies (Arrows)
    ======================================== */

    .ux-gantt__dependencies {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .ux-gantt__dependency {
      fill: none;
      stroke: var(--ux-gantt-dependency-color);
      stroke-width: 1.5;
    }

    .ux-gantt__dependency-arrow {
      fill: var(--ux-gantt-dependency-color);
    }

    /* ========================================
       Compact Mode
    ======================================== */

    .ux-gantt--compact {
      --ux-gantt-row-height: 32px;
      --ux-gantt-header-height: 40px;
      --ux-gantt-bar-height: 18px;
      --ux-gantt-milestone-size: 12px;
    }

    .ux-gantt--compact .ux-gantt__task-name {
      font-size: var(--ux-font-size-xs);
    }

    .ux-gantt--compact .ux-gantt__bar-label {
      font-size: 10px;
    }

    /* ========================================
       Read Only Mode
    ======================================== */

    .ux-gantt--readonly .ux-gantt__bar {
      cursor: default;
    }

    .ux-gantt--readonly .ux-gantt__bar-handle {
      display: none;
    }

    .ux-gantt--readonly .ux-gantt__milestone {
      cursor: default;
    }

    .ux-gantt--readonly .ux-gantt__milestone:hover {
      transform: rotate(45deg) translateX(-50%);
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-gantt__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-gantt__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-gantt__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-gantt__empty-text {
      font-size: var(--ux-font-size-sm);
      margin: 0;
    }

    /* ========================================
       Tooltip
    ======================================== */

    .ux-gantt__tooltip {
      position: fixed;
      z-index: 1000;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-gray-900);
      color: white;
      font-size: var(--ux-font-size-sm);
      border-radius: var(--ux-radius-md);
      box-shadow: var(--ux-shadow-lg);
      pointer-events: none;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity var(--ux-transition-fast), transform var(--ux-transition-fast);
    }

    .ux-gantt__tooltip--visible {
      opacity: 1;
      transform: translateY(0);
    }

    .ux-gantt__tooltip-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .ux-gantt__tooltip-dates {
      font-size: var(--ux-font-size-xs);
      opacity: 0.8;
    }

    .ux-gantt__tooltip-progress {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-top: 4px;
      font-size: var(--ux-font-size-xs);
    }

    .ux-gantt__tooltip-progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-gantt__tooltip-progress-fill {
      height: 100%;
      background: white;
      border-radius: 2px;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-gantt--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-gantt--glass .ux-gantt__toolbar,
    .ux-gantt--glass .ux-gantt__tasks,
    .ux-gantt--glass .ux-gantt__header {
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-gantt-weekend-bg: rgba(255, 255, 255, 0.02);
      }

      .ux-gantt__bar--not-started {
        background: var(--ux-gray-600);
      }

      .ux-gantt__bar--group {
        background: var(--ux-gray-400);
      }

      .ux-gantt__bar--group::before {
        border-color: transparent transparent var(--ux-gray-400) transparent;
      }

      .ux-gantt__bar--group::after {
        border-color: transparent transparent transparent var(--ux-gray-400);
      }
    }

    .ux-dark {
      --ux-gantt-weekend-bg: rgba(255, 255, 255, 0.02);
    }

    .ux-dark .ux-gantt__bar--not-started {
      background: var(--ux-gray-600);
    }

    .ux-dark .ux-gantt__bar--group {
      background: var(--ux-gray-400);
    }

    .ux-dark .ux-gantt__bar--group::before {
      border-color: transparent transparent var(--ux-gray-400) transparent;
    }

    .ux-dark .ux-gantt__bar--group::after {
      border-color: transparent transparent transparent var(--ux-gray-400);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-gantt {
        --ux-gantt-task-panel-width: 180px;
      }

      .ux-gantt__toolbar {
        flex-wrap: wrap;
      }

      .ux-gantt__title {
        width: 100%;
        margin-bottom: var(--ux-space-xs);
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-gantt__bar,
      .ux-gantt__milestone,
      .ux-gantt__bar-progress,
      .ux-gantt__tooltip {
        transition: none;
      }

      .ux-gantt__task-expand svg {
        transition: none;
      }
    }

    /* ========================================
       Print Styles
    ======================================== */

    @media print {
      .ux-gantt {
        border: 1px solid #ccc;
        break-inside: avoid;
      }

      .ux-gantt__toolbar {
        display: none;
      }

      .ux-gantt__bar {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  `;

  // Icons used in the component
  const icons = {
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronsLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    chevronsRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>',
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    empty: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-gantt-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-gantt-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const ganttComponent = (config = {}) => ({
    // Data
    tasks: config.tasks || [],

    // View settings
    zoom: config.zoom || 'week', // 'day', 'week', 'month'
    startDate: config.startDate ? new Date(config.startDate) : null,
    endDate: config.endDate ? new Date(config.endDate) : null,

    // State
    selectedTask: null,
    expandedGroups: new Set(config.expandedGroups || []),
    scrollLeft: 0,
    taskPanelWidth: config.taskPanelWidth || 280,
    isResizing: false,
    isDragging: false,
    dragTask: null,
    dragType: null, // 'move', 'resize-start', 'resize-end'

    // Options
    readonly: config.readonly || false,
    showToday: config.showToday !== false,
    showWeekends: config.showWeekends !== false,
    showDependencies: config.showDependencies !== false,
    showProgress: config.showProgress !== false,
    highlightWeekends: config.highlightWeekends !== false,

    // Tooltip
    tooltip: {
      visible: false,
      x: 0,
      y: 0,
      task: null
    },

    // Labels
    labels: {
      tasks: config.labels?.tasks || 'Tasks',
      day: config.labels?.day || 'Day',
      week: config.labels?.week || 'Week',
      month: config.labels?.month || 'Month',
      today: config.labels?.today || 'Today',
      noTasks: config.labels?.noTasks || 'No tasks',
      noTasksDesc: config.labels?.noTasksDesc || 'Add tasks to see them on the Gantt chart.'
    },

    // Computed cell width based on zoom
    get cellWidth() {
      switch (this.zoom) {
        case 'day': return 40;
        case 'week': return 100;
        case 'month': return 120;
        default: return 100;
      }
    },

    // Initialize
    init() {
      // Calculate date range if not provided
      if (!this.startDate || !this.endDate) {
        this.calculateDateRange();
      }

      // Set up scroll sync
      this.$nextTick(() => {
        this.setupScrollSync();
      });

      // Listen for keyboard events
      this._keyHandler = this.handleKeydown.bind(this);
      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Calculate date range from tasks
    calculateDateRange() {
      if (this.tasks.length === 0) {
        const today = new Date();
        this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        this.endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
        return;
      }

      let minDate = null;
      let maxDate = null;

      const processTask = (task) => {
        if (task.start) {
          const start = new Date(task.start);
          if (!minDate || start < minDate) minDate = start;
        }
        if (task.end) {
          const end = new Date(task.end);
          if (!maxDate || end > maxDate) maxDate = end;
        }
        if (task.date) {
          const date = new Date(task.date);
          if (!minDate || date < minDate) minDate = date;
          if (!maxDate || date > maxDate) maxDate = date;
        }
        if (task.children) {
          task.children.forEach(processTask);
        }
      };

      this.tasks.forEach(processTask);

      // Add padding
      if (minDate) {
        this.startDate = new Date(minDate);
        this.startDate.setDate(this.startDate.getDate() - 7);
      }
      if (maxDate) {
        this.endDate = new Date(maxDate);
        this.endDate.setDate(this.endDate.getDate() + 14);
      }
    },

    // Setup scroll synchronization
    setupScrollSync() {
      const chartScroll = this.$refs.chartScroll;
      const tasksBody = this.$refs.tasksBody;

      if (chartScroll && tasksBody) {
        chartScroll.addEventListener('scroll', () => {
          tasksBody.scrollTop = chartScroll.scrollTop;
          this.scrollLeft = chartScroll.scrollLeft;
        });

        tasksBody.addEventListener('scroll', () => {
          chartScroll.scrollTop = tasksBody.scrollTop;
        });
      }
    },

    // Get flattened task list (with expanded groups)
    get flattenedTasks() {
      const result = [];

      const flatten = (tasks, level = 0, parentId = null) => {
        tasks.forEach(task => {
          result.push({
            ...task,
            _level: level,
            _parentId: parentId,
            _hasChildren: task.children && task.children.length > 0
          });

          if (task.children && task.children.length > 0 && this.expandedGroups.has(task.id)) {
            flatten(task.children, level + 1, task.id);
          }
        });
      };

      flatten(this.tasks);
      return result;
    },

    // Generate timeline dates
    get timelineDates() {
      const dates = [];
      const current = new Date(this.startDate);

      while (current <= this.endDate) {
        dates.push(new Date(current));

        switch (this.zoom) {
          case 'day':
            current.setDate(current.getDate() + 1);
            break;
          case 'week':
            current.setDate(current.getDate() + 7);
            break;
          case 'month':
            current.setMonth(current.getMonth() + 1);
            break;
        }
      }

      return dates;
    },

    // Get total chart width
    get chartWidth() {
      return this.timelineDates.length * this.cellWidth;
    },

    // Format header date based on zoom level
    formatHeaderDate(date, isPrimary = false) {
      const options = { month: 'short' };

      switch (this.zoom) {
        case 'day':
          if (isPrimary) {
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          }
          return date.getDate();
        case 'week':
          if (isPrimary) {
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          }
          return `W${this.getWeekNumber(date)}`;
        case 'month':
          if (isPrimary) {
            return date.getFullYear();
          }
          return date.toLocaleDateString('en-US', options);
      }
    },

    // Get week number
    getWeekNumber(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    // Check if date is weekend
    isWeekend(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    },

    // Check if date is today
    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    },

    // Get today's position on chart
    get todayPosition() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (today < this.startDate || today > this.endDate) {
        return null;
      }

      const daysDiff = Math.floor((today - this.startDate) / (1000 * 60 * 60 * 24));

      switch (this.zoom) {
        case 'day':
          return daysDiff * this.cellWidth;
        case 'week':
          return (daysDiff / 7) * this.cellWidth;
        case 'month':
          const monthsDiff = (today.getFullYear() - this.startDate.getFullYear()) * 12 +
                            (today.getMonth() - this.startDate.getMonth());
          const dayOfMonth = today.getDate();
          const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
          return (monthsDiff + (dayOfMonth / daysInMonth)) * this.cellWidth;
      }
    },

    // Calculate bar position and width
    getBarStyle(task) {
      if (task.type === 'milestone') {
        const date = new Date(task.date);
        const left = this.dateToPosition(date);
        return {
          left: `${left}px`,
          top: `${(40 - 16) / 2}px`
        };
      }

      const start = new Date(task.start);
      const end = new Date(task.end);

      const left = this.dateToPosition(start);
      const right = this.dateToPosition(end);
      const width = Math.max(right - left, 20);

      return {
        left: `${left}px`,
        width: `${width}px`
      };
    },

    // Convert date to X position
    dateToPosition(date) {
      const daysDiff = Math.floor((date - this.startDate) / (1000 * 60 * 60 * 24));

      switch (this.zoom) {
        case 'day':
          return daysDiff * this.cellWidth;
        case 'week':
          return (daysDiff / 7) * this.cellWidth;
        case 'month':
          const monthsDiff = (date.getFullYear() - this.startDate.getFullYear()) * 12 +
                            (date.getMonth() - this.startDate.getMonth());
          const dayOfMonth = date.getDate();
          const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          return (monthsDiff + (dayOfMonth / daysInMonth)) * this.cellWidth;
      }
    },

    // Get bar CSS class
    getBarClass(task) {
      const classes = ['ux-gantt__bar'];

      if (task.type === 'group') {
        classes.push('ux-gantt__bar--group');
      }

      if (task.status) {
        classes.push(`ux-gantt__bar--${task.status}`);
      }

      if (task.category) {
        classes.push(`ux-gantt__bar--category-${task.category}`);
      }

      if (this.selectedTask === task.id) {
        classes.push('ux-gantt__bar--selected');
      }

      if (this.isDragging && this.dragTask === task.id) {
        classes.push('ux-gantt__bar--dragging');
      }

      return classes.join(' ');
    },

    // Zoom controls
    setZoom(level) {
      this.zoom = level;
      this.calculateDateRange();
      this.$dispatch('gantt:zoom', { zoom: level });
    },

    // Navigation
    scrollToToday() {
      const chartScroll = this.$refs.chartScroll;
      if (chartScroll && this.todayPosition !== null) {
        chartScroll.scrollLeft = this.todayPosition - chartScroll.clientWidth / 2;
      }
    },

    scrollToStart() {
      const chartScroll = this.$refs.chartScroll;
      if (chartScroll) {
        chartScroll.scrollLeft = 0;
      }
    },

    scrollToEnd() {
      const chartScroll = this.$refs.chartScroll;
      if (chartScroll) {
        chartScroll.scrollLeft = chartScroll.scrollWidth;
      }
    },

    navigate(direction) {
      const chartScroll = this.$refs.chartScroll;
      if (chartScroll) {
        const scrollAmount = chartScroll.clientWidth * 0.8;
        chartScroll.scrollLeft += direction === 'next' ? scrollAmount : -scrollAmount;
      }
    },

    // Task interaction
    toggleGroup(taskId) {
      if (this.expandedGroups.has(taskId)) {
        this.expandedGroups.delete(taskId);
      } else {
        this.expandedGroups.add(taskId);
      }
      this.$dispatch('gantt:toggle-group', { taskId, expanded: this.expandedGroups.has(taskId) });
    },

    selectTask(task) {
      this.selectedTask = task.id;
      this.$dispatch('gantt:select', { task });
    },

    // Tooltip
    showTooltip(task, event) {
      this.tooltip = {
        visible: true,
        x: event.clientX + 10,
        y: event.clientY + 10,
        task
      };
    },

    hideTooltip() {
      this.tooltip.visible = false;
    },

    // Drag & drop (for editable mode)
    startDrag(task, type, event) {
      if (this.readonly) return;

      this.isDragging = true;
      this.dragTask = task.id;
      this.dragType = type;
      this._dragStartX = event.clientX;
      this._dragStartDate = new Date(type === 'resize-end' ? task.end : task.start);

      document.addEventListener('mousemove', this._onDrag = this.onDrag.bind(this));
      document.addEventListener('mouseup', this._onDragEnd = this.endDrag.bind(this));
    },

    onDrag(event) {
      if (!this.isDragging) return;

      const dx = event.clientX - this._dragStartX;
      let daysDelta = 0;

      switch (this.zoom) {
        case 'day':
          daysDelta = Math.round(dx / this.cellWidth);
          break;
        case 'week':
          daysDelta = Math.round((dx / this.cellWidth) * 7);
          break;
        case 'month':
          daysDelta = Math.round((dx / this.cellWidth) * 30);
          break;
      }

      const task = this.flattenedTasks.find(t => t.id === this.dragTask);
      if (!task) return;

      const newDate = new Date(this._dragStartDate);
      newDate.setDate(newDate.getDate() + daysDelta);

      if (this.dragType === 'move') {
        const duration = new Date(task.end) - new Date(task.start);
        task.start = newDate.toISOString().split('T')[0];
        task.end = new Date(newDate.getTime() + duration).toISOString().split('T')[0];
      } else if (this.dragType === 'resize-start') {
        task.start = newDate.toISOString().split('T')[0];
      } else if (this.dragType === 'resize-end') {
        task.end = newDate.toISOString().split('T')[0];
      }
    },

    endDrag() {
      if (this.isDragging) {
        const task = this.flattenedTasks.find(t => t.id === this.dragTask);
        this.$dispatch('gantt:task-update', { task });
      }

      this.isDragging = false;
      this.dragTask = null;
      this.dragType = null;

      document.removeEventListener('mousemove', this._onDrag);
      document.removeEventListener('mouseup', this._onDragEnd);
    },

    // Panel resize
    startResize(event) {
      this.isResizing = true;
      this._resizeStartX = event.clientX;
      this._resizeStartWidth = this.taskPanelWidth;

      document.addEventListener('mousemove', this._onResize = this.onResize.bind(this));
      document.addEventListener('mouseup', this._onResizeEnd = this.endResize.bind(this));
    },

    onResize(event) {
      if (!this.isResizing) return;
      const dx = event.clientX - this._resizeStartX;
      this.taskPanelWidth = Math.max(150, Math.min(500, this._resizeStartWidth + dx));
    },

    endResize() {
      this.isResizing = false;
      document.removeEventListener('mousemove', this._onResize);
      document.removeEventListener('mouseup', this._onResizeEnd);
    },

    // Keyboard navigation
    handleKeydown(event) {
      if (!this.selectedTask) return;

      if (event.key === 'Escape') {
        this.selectedTask = null;
      }
    },

    // Generate dependency paths (SVG)
    getDependencyPaths() {
      const paths = [];

      this.flattenedTasks.forEach((task, index) => {
        if (task.dependencies && task.dependencies.length > 0) {
          task.dependencies.forEach(depId => {
            const depIndex = this.flattenedTasks.findIndex(t => t.id === depId);
            if (depIndex === -1) return;

            const depTask = this.flattenedTasks[depIndex];
            const depEnd = this.dateToPosition(new Date(depTask.end || depTask.date));
            const taskStart = this.dateToPosition(new Date(task.start || task.date));

            const startY = depIndex * 40 + 20;
            const endY = index * 40 + 20;

            // Simple right-angle path
            const midX = depEnd + 15;

            paths.push({
              path: `M ${depEnd} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${taskStart - 5} ${endY}`,
              arrowX: taskStart - 5,
              arrowY: endY
            });
          });
        }
      });

      return paths;
    },

    // Get icon HTML
    getIcon(name) {
      return icons[name] || '';
    },

    // Format date for display
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxGantt', ganttComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxGantt', ganttComponent);
    });
  }

})();
