/**
 * UX Tabs Component
 * Sistema de tabs estilo iOS/Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Tabs
    ======================================== */

    .ux-tabs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Tab Bar
    ======================================== */

    .ux-tab-bar {
      display: flex;
      align-items: stretch;
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-tab-bar::-webkit-scrollbar {
      display: none;
    }

    /* Tab Bar Variants */
    .ux-tab-bar--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .ux-tab-bar--primary {
      background-color: var(--ux-primary);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .ux-tab-bar--dark {
      background-color: var(--ux-dark);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Tab Button
    ======================================== */

    .ux-tab-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
      min-height: 48px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-tab-button:hover {
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
    }

    .ux-tab-button:active {
      background-color: var(--ux-light);
    }

    .ux-tab-button--selected {
      color: var(--ux-primary);
    }

    .ux-tab-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* Tab Button Layout */
    .ux-tab-button--layout-icon-top {
      flex-direction: column;
      gap: 2px;
    }

    .ux-tab-button--layout-icon-start {
      flex-direction: row;
      gap: var(--ux-space-xs);
    }

    .ux-tab-button--layout-icon-end {
      flex-direction: row-reverse;
      gap: var(--ux-space-xs);
    }

    .ux-tab-button--layout-icon-only .ux-tab-button__label {
      display: none;
    }

    .ux-tab-button--layout-label-only .ux-tab-button__icon {
      display: none;
    }

    /* Tab Button Icon */
    .ux-tab-button__icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-tab-button__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Tab Button Label */
    .ux-tab-button__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Tab Button Badge */
    .ux-tab-button__badge {
      position: absolute;
      top: 4px;
      right: calc(50% - 20px);
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 10px;
      font-weight: 600;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-tab-button__badge--dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      right: calc(50% - 16px);
    }

    /* Colored Tab Bar Button Colors */
    .ux-tab-bar--primary .ux-tab-button {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-tab-bar--primary .ux-tab-button:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-tab-bar--primary .ux-tab-button--selected {
      color: white;
    }

    .ux-tab-bar--dark .ux-tab-button {
      color: rgba(255, 255, 255, 0.6);
    }

    .ux-tab-bar--dark .ux-tab-button:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-tab-bar--dark .ux-tab-button--selected {
      color: white;
    }

    /* ========================================
       Tab Indicator
    ======================================== */

    .ux-tab-bar--indicator {
      position: relative;
    }

    .ux-tab-bar__indicator {
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: var(--ux-primary);
      transition:
        left var(--ux-transition-base) var(--ux-ease),
        width var(--ux-transition-base) var(--ux-ease);
    }

    .ux-tab-bar--primary .ux-tab-bar__indicator {
      background-color: white;
    }

    /* ========================================
       Tab Content
    ======================================== */

    .ux-tab-content {
      flex: 1;
      overflow: hidden;
    }

    .ux-tab-panel {
      display: none;
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-tab-panel--active {
      display: block;
    }

    /* Animated tab panels */
    .ux-tab-content--animated {
      position: relative;
    }

    .ux-tab-content--animated .ux-tab-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transform: translateX(20px);
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-tab-content--animated .ux-tab-panel--active {
      position: relative;
      opacity: 1;
      transform: translateX(0);
    }

    /* ========================================
       Bottom Tab Bar (iOS style)
    ======================================== */

    .ux-tab-bar--bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      min-height: 49px;
      border-bottom: none;
      border-top: 1px solid var(--ux-border-color);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }

    .ux-tab-bar--bottom .ux-tab-button {
      min-height: 49px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }

    .ux-tab-bar--bottom .ux-tab-button__icon {
      width: 28px;
      height: 28px;
    }

    .ux-tab-bar--bottom .ux-tab-button__label {
      font-size: 10px;
    }

    /* ========================================
       Scrollable Tab Bar
    ======================================== */

    .ux-tab-bar--scrollable .ux-tab-button {
      flex: 0 0 auto;
      min-width: auto;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    /* ========================================
       Pill Style Tab Bar
    ======================================== */

    .ux-tab-bar--pills {
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm);
      background-color: var(--ux-surface-secondary);
      border-bottom: none;
      border-radius: var(--ux-border-radius-lg);
      margin: var(--ux-space-sm);
    }

    .ux-tab-bar--pills .ux-tab-button {
      border-radius: var(--ux-border-radius);
      min-height: 36px;
    }

    .ux-tab-bar--pills .ux-tab-button--selected {
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-sm);
      color: var(--ux-text);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-tab-bar--sm .ux-tab-button {
      min-height: 40px;
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-xs);
    }

    .ux-tab-bar--sm .ux-tab-button__icon {
      width: 20px;
      height: 20px;
    }

    .ux-tab-bar--lg .ux-tab-button {
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
    }

    .ux-tab-bar--lg .ux-tab-button__icon {
      width: 28px;
      height: 28px;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tabs-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tabs-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for tabs
  // ARIA: role="tablist" on bar, role="tab" on buttons, role="tabpanel" on panels
  const tabsComponent = (config = {}) => ({
    activeTab: config.activeTab || 0,
    tabs: config.tabs || [],
    animated: config.animated || false,
    indicatorStyle: {},
    tabsId: config.id || 'ux-tabs-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the tab bar (tablist)
    get tablistAriaAttrs() {
      return {
        'role': 'tablist',
        'aria-label': config.ariaLabel || 'Tabs'
      };
    },

    // ARIA attributes for each tab button
    getTabAriaAttrs(index) {
      return {
        'role': 'tab',
        'aria-selected': this.activeTab === index ? 'true' : 'false',
        'aria-controls': this.tabsId + '-panel-' + index,
        'id': this.tabsId + '-tab-' + index,
        'tabindex': this.activeTab === index ? '0' : '-1'
      };
    },

    // ARIA attributes for each tab panel
    getPanelAriaAttrs(index) {
      return {
        'role': 'tabpanel',
        'aria-labelledby': this.tabsId + '-tab-' + index,
        'id': this.tabsId + '-panel-' + index,
        'tabindex': '0'
      };
    },

    init() {
      this.$nextTick(() => {
        this.updateIndicator();
      });
    },

    select(index) {
      if (index === this.activeTab) return;
      if (this.tabs[index]?.disabled) return;

      this.activeTab = index;
      this.updateIndicator();
    },

    selectByValue(value) {
      const index = this.tabs.findIndex(tab => tab.value === value);
      if (index !== -1) {
        this.select(index);
      }
    },

    next() {
      const nextIndex = (this.activeTab + 1) % this.tabs.length;
      this.select(nextIndex);
    },

    prev() {
      const prevIndex = (this.activeTab - 1 + this.tabs.length) % this.tabs.length;
      this.select(prevIndex);
    },

    isActive(index) {
      return this.activeTab === index;
    },

    updateIndicator() {
      const tabBar = this.$refs.tabBar;
      if (!tabBar) return;

      const buttons = tabBar.querySelectorAll('.ux-tab-button');
      const activeButton = buttons[this.activeTab];

      if (activeButton) {
        this.indicatorStyle = {
          left: activeButton.offsetLeft + 'px',
          width: activeButton.offsetWidth + 'px'
        };
      }
    },

    get activeTabData() {
      return this.tabs[this.activeTab];
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTabs', tabsComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTabs', tabsComponent);
    });
  }
})();
