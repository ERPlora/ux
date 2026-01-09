/**
 * UX Timeline Component
 * Vertical and horizontal timeline for displaying events chronologically
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Timeline - Base
    ======================================== */

    .ux-timeline {
      position: relative;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Vertical Timeline (Default)
    ======================================== */

    .ux-timeline--vertical {
      padding-left: var(--ux-space-xl);
    }

    .ux-timeline--vertical::before {
      content: '';
      position: absolute;
      left: 11px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--ux-border-color);
    }

    /* Timeline Item */
    .ux-timeline__item {
      position: relative;
      padding-bottom: var(--ux-space-lg);
    }

    .ux-timeline__item:last-child {
      padding-bottom: 0;
    }

    /* Marker */
    .ux-timeline__marker {
      position: absolute;
      left: calc(-1 * var(--ux-space-xl) + 4px);
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--ux-surface);
      border: 2px solid var(--ux-border-color);
      z-index: 1;
    }

    .ux-timeline__marker--dot {
      width: 12px;
      height: 12px;
      left: calc(-1 * var(--ux-space-xl) + 6px);
      background: var(--ux-primary);
      border: none;
    }

    .ux-timeline__marker--icon {
      width: 32px;
      height: 32px;
      left: calc(-1 * var(--ux-space-xl) - 4px);
      background: var(--ux-primary);
      border: none;
      color: var(--ux-primary-contrast);
    }

    .ux-timeline__marker--icon svg {
      width: 16px;
      height: 16px;
    }

    /* Color variants for markers */
    .ux-timeline__marker--primary {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-timeline__marker--success {
      background: var(--ux-success);
      border-color: var(--ux-success);
    }

    .ux-timeline__marker--warning {
      background: var(--ux-warning);
      border-color: var(--ux-warning);
    }

    .ux-timeline__marker--danger {
      background: var(--ux-danger);
      border-color: var(--ux-danger);
    }

    .ux-timeline__marker--secondary {
      background: var(--ux-gray-400);
      border-color: var(--ux-gray-400);
    }

    /* Content */
    .ux-timeline__content {
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-space-md);
    }

    .ux-timeline__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-timeline__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-timeline__time {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      white-space: nowrap;
    }

    .ux-timeline__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-timeline__body {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-sm);
    }

    .ux-timeline__body p {
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-timeline__body p:last-child {
      margin-bottom: 0;
    }

    .ux-timeline__footer {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Simple Timeline (No Cards)
    ======================================== */

    .ux-timeline--simple .ux-timeline__content {
      background: transparent;
      border: none;
      padding: 0;
      padding-left: var(--ux-space-sm);
    }

    .ux-timeline--simple .ux-timeline__footer {
      border-top: none;
      padding-top: 0;
    }

    /* ========================================
       Compact Timeline
    ======================================== */

    .ux-timeline--compact .ux-timeline__item {
      padding-bottom: var(--ux-space-md);
    }

    .ux-timeline--compact .ux-timeline__content {
      padding: var(--ux-space-sm);
    }

    .ux-timeline--compact .ux-timeline__title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-timeline--compact .ux-timeline__body {
      font-size: var(--ux-font-size-xs);
    }

    /* ========================================
       Alternating Timeline
    ======================================== */

    .ux-timeline--alternating {
      padding-left: 0;
    }

    .ux-timeline--alternating::before {
      left: 50%;
      transform: translateX(-50%);
    }

    .ux-timeline--alternating .ux-timeline__item {
      width: 50%;
      padding-right: var(--ux-space-xl);
      padding-left: 0;
    }

    .ux-timeline--alternating .ux-timeline__item:nth-child(even) {
      margin-left: 50%;
      padding-left: var(--ux-space-xl);
      padding-right: 0;
    }

    .ux-timeline--alternating .ux-timeline__marker {
      left: auto;
      right: calc(-1 * var(--ux-space-xl) + 4px);
    }

    .ux-timeline--alternating .ux-timeline__item:nth-child(even) .ux-timeline__marker {
      left: calc(-1 * var(--ux-space-xl) + 4px);
      right: auto;
    }

    .ux-timeline--alternating .ux-timeline__marker--icon {
      right: calc(-1 * var(--ux-space-xl) - 4px);
    }

    .ux-timeline--alternating .ux-timeline__item:nth-child(even) .ux-timeline__marker--icon {
      left: calc(-1 * var(--ux-space-xl) - 4px);
    }

    /* ========================================
       Right-aligned Timeline
    ======================================== */

    .ux-timeline--right {
      padding-left: 0;
      padding-right: var(--ux-space-xl);
    }

    .ux-timeline--right::before {
      left: auto;
      right: 11px;
    }

    .ux-timeline--right .ux-timeline__marker {
      left: auto;
      right: calc(-1 * var(--ux-space-xl) + 4px);
    }

    .ux-timeline--right .ux-timeline__marker--icon {
      right: calc(-1 * var(--ux-space-xl) - 4px);
    }

    .ux-timeline--right .ux-timeline__content {
      text-align: right;
    }

    .ux-timeline--right .ux-timeline__header {
      flex-direction: row-reverse;
    }

    .ux-timeline--right .ux-timeline__footer {
      justify-content: flex-end;
    }

    /* ========================================
       Horizontal Timeline
    ======================================== */

    .ux-timeline--horizontal {
      display: flex;
      overflow-x: auto;
      padding: var(--ux-space-xl) 0 var(--ux-space-md);
      gap: 0;
      -webkit-overflow-scrolling: touch;
    }

    .ux-timeline--horizontal::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 11px;
      height: 2px;
      background: var(--ux-border-color);
    }

    .ux-timeline--horizontal .ux-timeline__item {
      flex: 0 0 auto;
      min-width: 200px;
      max-width: 280px;
      padding-bottom: 0;
      padding-right: var(--ux-space-lg);
    }

    .ux-timeline--horizontal .ux-timeline__item:last-child {
      padding-right: 0;
    }

    .ux-timeline--horizontal .ux-timeline__marker {
      position: absolute;
      left: 50%;
      top: calc(-1 * var(--ux-space-xl) + 4px);
      transform: translateX(-50%);
    }

    .ux-timeline--horizontal .ux-timeline__marker--icon {
      top: calc(-1 * var(--ux-space-xl) - 4px);
    }

    .ux-timeline--horizontal .ux-timeline__content {
      height: 100%;
    }

    /* ========================================
       Horizontal Scroll Navigation
    ======================================== */

    .ux-timeline-scroll {
      position: relative;
    }

    .ux-timeline-scroll__container {
      overflow: hidden;
    }

    .ux-timeline-scroll__nav {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      z-index: 10;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-timeline-scroll__nav:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-timeline-scroll__nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-timeline-scroll__nav--prev {
      left: 0;
    }

    .ux-timeline-scroll__nav--next {
      right: 0;
    }

    .ux-timeline-scroll__nav svg {
      width: 20px;
      height: 20px;
      color: var(--ux-text);
    }

    /* ========================================
       Connected Items (with connector line animation)
    ======================================== */

    .ux-timeline--animated::before {
      background: linear-gradient(
        to bottom,
        var(--ux-primary) var(--timeline-progress, 0%),
        var(--ux-border-color) var(--timeline-progress, 0%)
      );
    }

    .ux-timeline--horizontal.ux-timeline--animated::before {
      background: linear-gradient(
        to right,
        var(--ux-primary) var(--timeline-progress, 0%),
        var(--ux-border-color) var(--timeline-progress, 0%)
      );
    }

    /* ========================================
       Grouped Timeline
    ======================================== */

    .ux-timeline__group {
      margin-bottom: var(--ux-space-lg);
    }

    .ux-timeline__group-title {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-xs) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: 999px;
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-md);
      margin-left: calc(-1 * var(--ux-space-xl) + 24px);
    }

    /* ========================================
       Activity Feed Style
    ======================================== */

    .ux-timeline--activity {
      padding-left: var(--ux-space-2xl);
    }

    .ux-timeline--activity .ux-timeline__marker {
      left: calc(-1 * var(--ux-space-2xl) + 4px);
      width: 32px;
      height: 32px;
      background: var(--ux-surface-secondary);
      border: none;
    }

    .ux-timeline--activity .ux-timeline__marker svg {
      width: 16px;
      height: 16px;
      color: var(--ux-text-secondary);
    }

    .ux-timeline--activity .ux-timeline__content {
      background: transparent;
      border: none;
      padding: 0;
    }

    .ux-timeline--activity .ux-timeline__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 400;
    }

    .ux-timeline--activity .ux-timeline__title strong {
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-timeline--activity .ux-timeline__time {
      display: block;
      margin-top: 2px;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-timeline__item--loading .ux-timeline__content {
      opacity: 0.6;
    }

    .ux-timeline__item--loading .ux-timeline__marker {
      animation: ux-timeline-pulse 1.5s infinite;
    }

    @keyframes ux-timeline-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
    }

    /* ========================================
       Interactive States
    ======================================== */

    .ux-timeline__item--clickable {
      cursor: pointer;
    }

    .ux-timeline__item--clickable .ux-timeline__content {
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-timeline__item--clickable:hover .ux-timeline__content {
      border-color: var(--ux-primary);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-timeline__item--active .ux-timeline__content {
      border-color: var(--ux-primary);
      background: rgba(var(--ux-primary-rgb), 0.05);
    }

    .ux-timeline__item--active .ux-timeline__marker {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 4px rgba(var(--ux-primary-rgb), 0.2);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-timeline--glass .ux-timeline__content {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-timeline--glass .ux-timeline__group-title {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-timeline--activity .ux-timeline__marker {
        background: var(--ux-surface-tertiary);
      }
    }

    .ux-dark .ux-timeline--activity .ux-timeline__marker {
      background: var(--ux-surface-tertiary);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-timeline--alternating {
        padding-left: var(--ux-space-xl);
      }

      .ux-timeline--alternating::before {
        left: 11px;
        transform: none;
      }

      .ux-timeline--alternating .ux-timeline__item,
      .ux-timeline--alternating .ux-timeline__item:nth-child(even) {
        width: 100%;
        margin-left: 0;
        padding-left: 0;
        padding-right: 0;
      }

      .ux-timeline--alternating .ux-timeline__marker,
      .ux-timeline--alternating .ux-timeline__item:nth-child(even) .ux-timeline__marker {
        left: calc(-1 * var(--ux-space-xl) + 4px);
        right: auto;
      }

      .ux-timeline--alternating .ux-timeline__marker--icon,
      .ux-timeline--alternating .ux-timeline__item:nth-child(even) .ux-timeline__marker--icon {
        left: calc(-1 * var(--ux-space-xl) - 4px);
        right: auto;
      }

      .ux-timeline--horizontal .ux-timeline__item {
        min-width: 160px;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-timeline__item--loading .ux-timeline__marker {
        animation: none;
      }

      .ux-timeline__item--clickable .ux-timeline__content {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-timeline-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-timeline-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for interactive timeline
  const timelineData = (options = {}) => ({
    items: options.items || [],
    activeIndex: options.activeIndex ?? -1,
    direction: options.direction || 'vertical', // vertical, horizontal
    variant: options.variant || 'default', // default, simple, activity, alternating
    animated: options.animated ?? false,
    clickable: options.clickable ?? false,
    progress: 0,

    init() {
      if (this.animated && this.items.length > 0) {
        this.calculateProgress();
      }
    },

    calculateProgress() {
      // Calculate progress based on active index
      if (this.activeIndex >= 0 && this.items.length > 0) {
        this.progress = ((this.activeIndex + 1) / this.items.length) * 100;
        this.$el.style.setProperty('--timeline-progress', `${this.progress}%`);
      }
    },

    setActive(index) {
      if (index >= 0 && index < this.items.length) {
        this.activeIndex = index;
        this.calculateProgress();
        this.$dispatch('timeline:change', { index, item: this.items[index] });
      }
    },

    isActive(index) {
      return index === this.activeIndex;
    },

    isCompleted(index) {
      return index < this.activeIndex;
    },

    next() {
      if (this.activeIndex < this.items.length - 1) {
        this.setActive(this.activeIndex + 1);
      }
    },

    prev() {
      if (this.activeIndex > 0) {
        this.setActive(this.activeIndex - 1);
      }
    },

    goTo(index) {
      this.setActive(index);
    },

    onClick(index, event) {
      if (this.clickable) {
        this.setActive(index);
        this.$dispatch('timeline:click', { index, item: this.items[index], event });
      }
    },

    getMarkerClass(index, item) {
      const classes = ['ux-timeline__marker'];

      if (item.icon) {
        classes.push('ux-timeline__marker--icon');
      } else if (item.dot) {
        classes.push('ux-timeline__marker--dot');
      }

      if (item.color) {
        classes.push(`ux-timeline__marker--${item.color}`);
      } else if (this.isActive(index)) {
        classes.push('ux-timeline__marker--primary');
      } else if (this.isCompleted(index)) {
        classes.push('ux-timeline__marker--success');
      }

      return classes.join(' ');
    },

    getItemClass(index, item) {
      const classes = ['ux-timeline__item'];

      if (this.clickable) {
        classes.push('ux-timeline__item--clickable');
      }

      if (this.isActive(index)) {
        classes.push('ux-timeline__item--active');
      }

      if (item.loading) {
        classes.push('ux-timeline__item--loading');
      }

      return classes.join(' ');
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxTimeline', timelineData);
  }

})();
