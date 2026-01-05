/**
 * UX Popover Component
 * Popovers y tooltips
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Popover
    ======================================== */

    .ux-popover {
      position: absolute;
      z-index: 1000;
      min-width: 150px;
      max-width: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-popover--open {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    /* ========================================
       Popover Arrow
    ======================================== */

    .ux-popover__arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      transform: rotate(45deg);
    }

    .ux-popover--top .ux-popover__arrow {
      bottom: -7px;
      left: 50%;
      margin-left: -6px;
      border-top: none;
      border-left: none;
    }

    .ux-popover--bottom .ux-popover__arrow {
      top: -7px;
      left: 50%;
      margin-left: -6px;
      border-bottom: none;
      border-right: none;
    }

    .ux-popover--left .ux-popover__arrow {
      right: -7px;
      top: 50%;
      margin-top: -6px;
      border-bottom: none;
      border-left: none;
    }

    .ux-popover--right .ux-popover__arrow {
      left: -7px;
      top: 50%;
      margin-top: -6px;
      border-top: none;
      border-right: none;
    }

    /* Hide arrow */
    .ux-popover--no-arrow .ux-popover__arrow {
      display: none;
    }

    /* ========================================
       Popover Content
    ======================================== */

    .ux-popover__content {
      padding: var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      line-height: 1.5;
    }

    .ux-popover__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Popover Header
    ======================================== */

    .ux-popover__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-popover__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-popover__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
    }

    .ux-popover__close:hover {
      color: var(--ux-text);
    }

    .ux-popover__close svg {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Popover Sizes
    ======================================== */

    .ux-popover--sm {
      min-width: 100px;
      max-width: 200px;
    }

    .ux-popover--lg {
      min-width: 250px;
      max-width: 400px;
    }

    .ux-popover--auto {
      min-width: auto;
      max-width: none;
    }

    /* ========================================
       Tooltip (Simple Popover)
    ======================================== */

    .ux-tooltip {
      position: absolute;
      z-index: 1100;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      font-size: var(--ux-font-size-xs);
      border-radius: var(--ux-border-radius-sm);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transform: translateY(4px);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-tooltip--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Tooltip positions */
    .ux-tooltip--top {
      transform: translateY(-4px);
    }

    .ux-tooltip--top.ux-tooltip--visible {
      transform: translateY(0);
    }

    /* Tooltip Arrow */
    .ux-tooltip__arrow {
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: var(--ux-dark);
      transform: rotate(45deg);
    }

    .ux-tooltip--bottom .ux-tooltip__arrow {
      top: -3px;
      left: 50%;
      margin-left: -3px;
    }

    .ux-tooltip--top .ux-tooltip__arrow {
      bottom: -3px;
      left: 50%;
      margin-left: -3px;
    }

    .ux-tooltip--left .ux-tooltip__arrow {
      right: -3px;
      top: 50%;
      margin-top: -3px;
    }

    .ux-tooltip--right .ux-tooltip__arrow {
      left: -3px;
      top: 50%;
      margin-top: -3px;
    }

    /* Tooltip colors */
    .ux-tooltip--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
      box-shadow: var(--ux-shadow-md);
    }

    .ux-tooltip--light .ux-tooltip__arrow {
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
    }

    .ux-tooltip--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-tooltip--primary .ux-tooltip__arrow {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Popover Backdrop (for dismissible)
    ======================================== */

    .ux-popover-backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: transparent;
    }

    /* ========================================
       Popover Trigger
    ======================================== */

    .ux-popover-trigger {
      display: inline-block;
      position: relative;
    }

    /* ========================================
       Rich Tooltip (with more content)
    ======================================== */

    .ux-rich-tooltip {
      max-width: 280px;
      white-space: normal;
      padding: var(--ux-space-md);
    }

    .ux-rich-tooltip__title {
      font-weight: 600;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-rich-tooltip__content {
      font-size: var(--ux-font-size-xs);
      opacity: 0.9;
      line-height: 1.4;
    }

    /* ========================================
       Dropdown Popover (with list)
    ======================================== */

    .ux-popover--dropdown {
      padding: var(--ux-space-xs) 0;
    }

    .ux-popover--dropdown .ux-popover__content {
      padding: 0;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-popover-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-popover-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for popover
  const popoverComponent = (config = {}) => ({
    isOpen: false,
    position: config.position || 'bottom',
    trigger: config.trigger || 'click', // click, hover, focus
    dismissOnClickOutside: config.dismissOnClickOutside !== false,
    offset: config.offset || 8,
    popoverStyle: {},

    open() {
      this.isOpen = true;
      this.$nextTick(() => {
        this.updatePosition();
      });
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    updatePosition() {
      const trigger = this.$refs.trigger;
      const popover = this.$refs.popover;
      if (!trigger || !popover) return;

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      switch (this.position) {
        case 'top':
          top = triggerRect.top - popoverRect.height - this.offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + this.offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - this.offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + this.offset;
          break;
      }

      // Keep within viewport
      if (left < 8) left = 8;
      if (left + popoverRect.width > viewportWidth - 8) {
        left = viewportWidth - popoverRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + popoverRect.height > viewportHeight - 8) {
        top = viewportHeight - popoverRect.height - 8;
      }

      this.popoverStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px'
      };
    },

    handleClickOutside(event) {
      if (this.dismissOnClickOutside && this.isOpen) {
        const popover = this.$refs.popover;
        const trigger = this.$refs.trigger;
        if (popover && !popover.contains(event.target) &&
            trigger && !trigger.contains(event.target)) {
          this.close();
        }
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPopover', popoverComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPopover', popoverComponent);
    });
  }

  // Alpine component for tooltip
  const tooltipComponent = (config = {}) => ({
    isVisible: false,
    text: config.text || '',
    position: config.position || 'top',
    delay: config.delay || 200,
    tooltipStyle: {},
    _showTimer: null,

    show() {
      this._showTimer = setTimeout(() => {
        this.isVisible = true;
        this.$nextTick(() => {
          this.updatePosition();
        });
      }, this.delay);
    },

    hide() {
      if (this._showTimer) {
        clearTimeout(this._showTimer);
        this._showTimer = null;
      }
      this.isVisible = false;
    },

    updatePosition() {
      const trigger = this.$refs.trigger;
      const tooltip = this.$refs.tooltip;
      if (!trigger || !tooltip) return;

      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const offset = 8;

      let top, left;

      switch (this.position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + offset;
          break;
      }

      this.tooltipStyle = {
        position: 'fixed',
        top: top + 'px',
        left: left + 'px'
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTooltip', tooltipComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTooltip', tooltipComponent);
    });
  }
})();
