/**
 * UX Panel Component
 * Collapsible panel with header and content
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Panel
    ======================================== */

    :root {
      --ux-panel-border-radius: var(--ux-radius-lg);
      --ux-panel-padding: var(--ux-space-md);
      --ux-panel-header-padding: var(--ux-space-md);
      --ux-panel-gap: var(--ux-space-md);
      --ux-panel-transition: var(--ux-transition-normal);
    }

    .ux-panel {
      display: flex;
      flex-direction: column;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-panel-border-radius);
      overflow: hidden;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Panel Header
    ======================================== */

    .ux-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      padding: var(--ux-panel-header-padding);
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--ux-panel-transition);
    }

    .ux-panel__header:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-panel__header:focus {
      outline: none;
    }

    .ux-panel__header:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
    }

    /* Header content */
    .ux-panel__header-content {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex: 1;
      min-width: 0;
    }

    .ux-panel__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
    }

    .ux-panel__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-panel__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Header actions */
    .ux-panel__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
    }

    /* Toggle indicator */
    .ux-panel__toggle {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      transition: transform var(--ux-panel-transition);
    }

    .ux-panel--open .ux-panel__toggle {
      transform: rotate(180deg);
    }

    /* ========================================
       Panel Content
    ======================================== */

    .ux-panel__body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--ux-panel-transition) var(--ux-ease-default);
    }

    .ux-panel--open .ux-panel__body {
      grid-template-rows: 1fr;
    }

    .ux-panel__content {
      overflow: hidden;
    }

    .ux-panel__content-inner {
      padding: var(--ux-panel-padding);
    }

    /* ========================================
       Panel Footer
    ======================================== */

    .ux-panel__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-panel-padding);
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
    }

    .ux-panel--open .ux-panel__footer {
      display: flex;
    }

    .ux-panel:not(.ux-panel--open) .ux-panel__footer {
      display: none;
    }

    /* ========================================
       Variants
    ======================================== */

    /* No border on header when open */
    .ux-panel--flush .ux-panel__header {
      background: transparent;
      border-bottom-color: transparent;
    }

    .ux-panel--flush.ux-panel--open .ux-panel__header {
      border-bottom-color: var(--ux-border-color);
    }

    /* Outline variant */
    .ux-panel--outline {
      background: transparent;
    }

    .ux-panel--outline .ux-panel__header {
      background: transparent;
    }

    .ux-panel--outline .ux-panel__header:hover {
      background: var(--ux-surface-secondary);
    }

    /* Filled variant */
    .ux-panel--filled {
      border: none;
    }

    .ux-panel--filled .ux-panel__header {
      background: var(--ux-surface-tertiary);
    }

    .ux-panel--filled .ux-panel__header:hover {
      background: var(--ux-gray-200);
    }

    /* Borderless */
    .ux-panel--borderless {
      border: none;
      border-radius: 0;
    }

    .ux-panel--borderless .ux-panel__header {
      border-bottom: none;
      background: transparent;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-panel--sm {
      --ux-panel-border-radius: var(--ux-radius-md);
      --ux-panel-padding: var(--ux-space-sm);
      --ux-panel-header-padding: var(--ux-space-sm);
    }

    .ux-panel--sm .ux-panel__title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-panel--sm .ux-panel__toggle,
    .ux-panel--sm .ux-panel__icon {
      width: 16px;
      height: 16px;
    }

    .ux-panel--lg {
      --ux-panel-border-radius: var(--ux-radius-xl);
      --ux-panel-padding: var(--ux-space-lg);
      --ux-panel-header-padding: var(--ux-space-lg);
    }

    .ux-panel--lg .ux-panel__title {
      font-size: var(--ux-font-size-lg);
    }

    .ux-panel--lg .ux-panel__toggle,
    .ux-panel--lg .ux-panel__icon {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       States
    ======================================== */

    /* Disabled */
    .ux-panel--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-panel--disabled .ux-panel__header {
      cursor: not-allowed;
    }

    /* Loading */
    .ux-panel--loading .ux-panel__content-inner {
      position: relative;
      min-height: 100px;
    }

    .ux-panel--loading .ux-panel__content-inner::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      margin: -12px 0 0 -12px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-panel-spin 0.8s linear infinite;
    }

    @keyframes ux-panel-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-panel--primary .ux-panel__header {
      background: rgba(var(--ux-primary-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-panel--primary .ux-panel__title {
      color: var(--ux-primary);
    }

    .ux-panel--success .ux-panel__header {
      background: rgba(var(--ux-success-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-success-rgb), 0.2);
    }

    .ux-panel--success .ux-panel__title {
      color: var(--ux-success);
    }

    .ux-panel--warning .ux-panel__header {
      background: rgba(var(--ux-warning-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-warning-rgb), 0.2);
    }

    .ux-panel--warning .ux-panel__title {
      color: var(--ux-warning-shade);
    }

    .ux-panel--danger .ux-panel__header {
      background: rgba(var(--ux-danger-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-danger-rgb), 0.2);
    }

    .ux-panel--danger .ux-panel__title {
      color: var(--ux-danger);
    }

    /* ========================================
       Panel Group
    ======================================== */

    .ux-panel-group {
      display: flex;
      flex-direction: column;
      gap: var(--ux-panel-gap);
    }

    /* Accordion style (connected panels) */
    .ux-panel-group--accordion {
      gap: 0;
    }

    .ux-panel-group--accordion .ux-panel {
      border-radius: 0;
      margin-top: -1px;
    }

    .ux-panel-group--accordion .ux-panel:first-child {
      border-radius: var(--ux-panel-border-radius) var(--ux-panel-border-radius) 0 0;
      margin-top: 0;
    }

    .ux-panel-group--accordion .ux-panel:last-child {
      border-radius: 0 0 var(--ux-panel-border-radius) var(--ux-panel-border-radius);
    }

    .ux-panel-group--accordion .ux-panel:only-child {
      border-radius: var(--ux-panel-border-radius);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-panel--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-panel--glass .ux-panel__header {
      background: rgba(255, 255, 255, 0.3);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-panel--glass .ux-panel__header:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    .ux-panel--glass .ux-panel__footer {
      background: rgba(255, 255, 255, 0.2);
      border-top-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-panel--glass .ux-panel__header {
        background: rgba(255, 255, 255, 0.05);
      }

      .ux-panel--glass .ux-panel__header:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .ux-panel--glass .ux-panel__footer {
        background: rgba(255, 255, 255, 0.03);
      }

      .ux-panel--filled .ux-panel__header:hover {
        background: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-panel--glass .ux-panel__header {
      background: rgba(255, 255, 255, 0.05);
    }

    .ux-dark .ux-panel--glass .ux-panel__header:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-panel--glass .ux-panel__footer {
      background: rgba(255, 255, 255, 0.03);
    }

    .ux-dark .ux-panel--filled .ux-panel__header:hover {
      background: var(--ux-gray-700);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-panel__body {
        transition: none;
      }

      .ux-panel__toggle {
        transition: none;
      }

      .ux-panel--loading .ux-panel__content-inner::after {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-panel-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-panel-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const panelData = (options = {}) => ({
    isOpen: options.open ?? false,
    disabled: options.disabled ?? false,

    init() {
      // Dispatch initial state
      if (this.isOpen) {
        this.$dispatch('panel:open');
      }
    },

    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      this.$dispatch(this.isOpen ? 'panel:open' : 'panel:close');
      this.$dispatch('panel:toggle', { open: this.isOpen });
    },

    open() {
      if (this.disabled || this.isOpen) return;
      this.isOpen = true;
      this.$dispatch('panel:open');
      this.$dispatch('panel:toggle', { open: true });
    },

    close() {
      if (this.disabled || !this.isOpen) return;
      this.isOpen = false;
      this.$dispatch('panel:close');
      this.$dispatch('panel:toggle', { open: false });
    }
  });

  // Alpine.js panel group component (accordion behavior)
  const panelGroupData = (options = {}) => ({
    accordion: options.accordion ?? false,
    openPanels: new Set(),

    init() {
      // Listen for child panel events
      this.$el.addEventListener('panel:toggle', (e) => {
        if (!this.accordion) return;

        const panel = e.target.closest('[x-data*="uxPanel"]');
        if (!panel) return;

        if (e.detail.open) {
          // Close other panels in accordion mode
          this.$el.querySelectorAll('[x-data*="uxPanel"]').forEach(p => {
            if (p !== panel && p.__x) {
              p.__x.$data.close();
            }
          });
        }
      });
    },

    openAll() {
      if (this.accordion) return;
      this.$el.querySelectorAll('[x-data*="uxPanel"]').forEach(p => {
        if (p.__x) p.__x.$data.open();
      });
    },

    closeAll() {
      this.$el.querySelectorAll('[x-data*="uxPanel"]').forEach(p => {
        if (p.__x) p.__x.$data.close();
      });
    }
  });

  // Register components
  if (window.UX) {
    window.UX.registerComponent('uxPanel', panelData);
    window.UX.registerComponent('uxPanelGroup', panelGroupData);
  }

})();
