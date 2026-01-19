/**
 * UX Tabs Component
 * Sistema de tabs estilo iOS/Ionic
 * Funciona con JavaScript puro o Alpine.js
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

    /* Glass (iOS 26 Liquid Glass) */
    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-tab-bar--glass {
      box-shadow: var(--ux-glass-highlight);
      border-top: 0.5px solid var(--ux-glass-border);
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
       Scrollable Tab Bar with Navigation Arrows
    ======================================== */

    .ux-tab-bar--scrollable {
      position: relative;
    }

    .ux-tab-bar--scrollable .ux-tab-bar__scroll {
      display: flex;
      align-items: stretch;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
    }

    .ux-tab-bar--scrollable .ux-tab-bar__scroll::-webkit-scrollbar {
      display: none;
    }

    /* Navigation Arrows */
    .ux-tab-bar__arrow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-fast), visibility var(--ux-transition-fast);
    }

    .ux-tab-bar__arrow--visible {
      opacity: 1;
      visibility: visible;
    }

    .ux-tab-bar__arrow--start {
      left: 0;
      background: linear-gradient(to right,
        var(--ux-glass-bg-thick) 0%,
        var(--ux-glass-bg) 50%,
        transparent 100%);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    .ux-tab-bar__arrow--end {
      right: 0;
      background: linear-gradient(to left,
        var(--ux-glass-bg-thick) 0%,
        var(--ux-glass-bg) 50%,
        transparent 100%);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    .ux-tab-bar__arrow svg {
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
      transition: color var(--ux-transition-fast), transform var(--ux-transition-fast);
    }

    .ux-tab-bar__arrow:hover svg {
      color: var(--ux-text);
      transform: scale(1.1);
    }

    .ux-tab-bar__arrow:active svg {
      transform: scale(0.95);
    }

    /* Tabs don't expand in scrollable mode */
    .ux-tab-bar--scrollable .ux-tab-button {
      flex: none;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    /* Dark mode arrows */
    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-tab-bar__arrow--start {
        background: linear-gradient(to right,
          var(--ux-glass-bg-thick) 0%,
          var(--ux-glass-bg) 50%,
          transparent 100%);
      }
      :root:not(.ux-light) .ux-tab-bar__arrow--end {
        background: linear-gradient(to left,
          var(--ux-glass-bg-thick) 0%,
          var(--ux-glass-bg) 50%,
          transparent 100%);
      }
    }

    .ux-dark .ux-tab-bar__arrow--start {
      background: linear-gradient(to right,
        var(--ux-glass-bg-thick) 0%,
        var(--ux-glass-bg) 50%,
        transparent 100%);
    }

    .ux-dark .ux-tab-bar__arrow--end {
      background: linear-gradient(to left,
        var(--ux-glass-bg-thick) 0%,
        var(--ux-glass-bg) 50%,
        transparent 100%);
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
      min-width: var(--ux-tab-min-width);
      min-height: var(--ux-tabs-height);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-text-secondary);
      font-size: var(--ux-tab-font-size);
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
      height: var(--ux-tab-indicator-height, 3px);
      background-color: var(--ux-primary);
      border-radius: var(--ux-tab-indicator-radius, 1.5px) var(--ux-tab-indicator-radius, 1.5px) 0 0;
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
       Glass effect by default
    ======================================== */

    .ux-tab-bar--bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      min-height: 49px;
      border-bottom: none;
      /* Glass by default */
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-top: 0.5px solid var(--ux-glass-border);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-tab-bar--bottom {
        background-color: var(--ux-surface);
      }
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

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-tab-bar__indicator,
      .ux-tab-content--animated .ux-tab-panel {
        transition: none;
      }
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

  // ========================================
  // Vanilla JS Tabs Class
  // ========================================

  class UXTabs {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      this.options = {
        activeTab: parseInt(this.el.dataset.activeTab) || options.activeTab || 0,
        animated: this.el.dataset.animated === 'true' || options.animated || false,
        ...options
      };

      this.tabsId = this.el.id || 'ux-tabs-' + Math.random().toString(36).substring(2, 11);
      this.tabBar = null;
      this.tabContent = null;
      this.tabs = [];
      this.panels = [];
      this.indicator = null;
      this.activeTab = this.options.activeTab;

      this._init();
    }

    _init() {
      this.tabBar = this.el.querySelector('.ux-tab-bar');
      this.tabContent = this.el.querySelector('.ux-tab-content');

      if (!this.tabBar) return;

      // Find all tab buttons
      const buttons = this.tabBar.querySelectorAll('.ux-tab-button');
      buttons.forEach((btn, index) => {
        this.tabs.push(btn);

        // Set ARIA attributes
        const tabId = `${this.tabsId}-tab-${index}`;
        const panelId = `${this.tabsId}-panel-${index}`;

        btn.setAttribute('role', 'tab');
        btn.setAttribute('id', tabId);
        btn.setAttribute('aria-controls', panelId);
        btn.setAttribute('aria-selected', index === this.activeTab ? 'true' : 'false');
        btn.setAttribute('tabindex', index === this.activeTab ? '0' : '-1');

        // Add click handler
        btn.addEventListener('click', () => {
          if (!btn.classList.contains('ux-tab-button--disabled')) {
            this.select(index);
          }
        });

        // Add keyboard handler
        btn.addEventListener('keydown', (e) => this._handleKeydown(e, index));
      });

      // Set tablist role on tab bar
      this.tabBar.setAttribute('role', 'tablist');

      // Find all tab panels
      if (this.tabContent) {
        const panels = this.tabContent.querySelectorAll('.ux-tab-panel');
        panels.forEach((panel, index) => {
          this.panels.push(panel);

          const panelId = `${this.tabsId}-panel-${index}`;
          const tabId = `${this.tabsId}-tab-${index}`;

          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('id', panelId);
          panel.setAttribute('aria-labelledby', tabId);
          panel.setAttribute('tabindex', '0');
        });
      }

      // Find indicator
      this.indicator = this.tabBar.querySelector('.ux-tab-bar__indicator');

      // Set initial state
      this._updateState();

      // Store instance
      this.el._uxTabs = this;
    }

    _handleKeydown(event, index) {
      const total = this.tabs.length;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          this._focusTab((index + 1) % total);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          this._focusTab((index - 1 + total) % total);
          break;
        case 'Home':
          event.preventDefault();
          this._focusTab(0);
          break;
        case 'End':
          event.preventDefault();
          this._focusTab(total - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.select(index);
          break;
      }
    }

    _focusTab(index) {
      if (this.tabs[index]) {
        this.tabs[index].focus();
      }
    }

    _updateState() {
      // Update tab buttons
      this.tabs.forEach((tab, index) => {
        const isActive = index === this.activeTab;
        tab.classList.toggle('ux-tab-button--selected', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // Update panels
      this.panels.forEach((panel, index) => {
        panel.classList.toggle('ux-tab-panel--active', index === this.activeTab);
      });

      // Update indicator
      this._updateIndicator();
    }

    _updateIndicator() {
      if (!this.indicator || !this.tabs[this.activeTab]) return;

      const activeButton = this.tabs[this.activeTab];
      this.indicator.style.left = activeButton.offsetLeft + 'px';
      this.indicator.style.width = activeButton.offsetWidth + 'px';
    }

    select(index) {
      if (index === this.activeTab) return;
      if (index < 0 || index >= this.tabs.length) return;
      if (this.tabs[index]?.classList.contains('ux-tab-button--disabled')) return;

      const previousTab = this.activeTab;
      this.activeTab = index;
      this._updateState();

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('tabs:change', {
        detail: { index, previousIndex: previousTab, tab: this.tabs[index] },
        bubbles: true
      }));
    }

    next() {
      const nextIndex = (this.activeTab + 1) % this.tabs.length;
      this.select(nextIndex);
    }

    prev() {
      const prevIndex = (this.activeTab - 1 + this.tabs.length) % this.tabs.length;
      this.select(prevIndex);
    }

    destroy() {
      delete this.el._uxTabs;
    }

    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxTabs || null;
    }
  }

  // ========================================
  // Vanilla JS Scrollable Tab Bar Class
  // ========================================

  class UXScrollableTabBar {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      this.options = {
        scrollAmount: parseInt(this.el.dataset.scrollAmount) || options.scrollAmount || 200,
        ...options
      };

      this.scrollContainer = null;
      this.startArrow = null;
      this.endArrow = null;

      this._init();
    }

    _init() {
      this.scrollContainer = this.el.querySelector('.ux-tab-bar__scroll');
      this.startArrow = this.el.querySelector('.ux-tab-bar__arrow--start');
      this.endArrow = this.el.querySelector('.ux-tab-bar__arrow--end');

      if (!this.scrollContainer) return;

      // Bind methods
      this._checkArrows = this._checkArrows.bind(this);

      // Add event listeners
      this.scrollContainer.addEventListener('scroll', this._checkArrows);
      window.addEventListener('resize', this._checkArrows);

      // Arrow click handlers
      if (this.startArrow) {
        this.startArrow.addEventListener('click', () => this.scrollStart());
      }
      if (this.endArrow) {
        this.endArrow.addEventListener('click', () => this.scrollEnd());
      }

      // Initial check
      this._checkArrows();

      // Store instance
      this.el._uxScrollableTabBar = this;
    }

    _checkArrows() {
      if (!this.scrollContainer) return;

      const { scrollLeft, scrollWidth, clientWidth } = this.scrollContainer;

      if (this.startArrow) {
        this.startArrow.classList.toggle('ux-tab-bar__arrow--visible', scrollLeft > 5);
      }
      if (this.endArrow) {
        this.endArrow.classList.toggle('ux-tab-bar__arrow--visible', scrollLeft < scrollWidth - clientWidth - 5);
      }
    }

    scrollStart() {
      if (!this.scrollContainer) return;
      this.scrollContainer.scrollBy({ left: -this.options.scrollAmount, behavior: 'smooth' });
    }

    scrollEnd() {
      if (!this.scrollContainer) return;
      this.scrollContainer.scrollBy({ left: this.options.scrollAmount, behavior: 'smooth' });
    }

    scrollToTab(index) {
      if (!this.scrollContainer) return;
      const tabs = this.scrollContainer.querySelectorAll('.ux-tab-button');
      if (tabs[index]) {
        tabs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    destroy() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener('scroll', this._checkArrows);
      }
      window.removeEventListener('resize', this._checkArrows);
      delete this.el._uxScrollableTabBar;
    }

    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxScrollableTabBar || null;
    }
  }

  // ========================================
  // Auto-initialize vanilla JS tabs
  // ========================================

  function initTabs() {
    document.querySelectorAll('[data-ux-tabs]').forEach(el => {
      if (!el._uxTabs) {
        new UXTabs(el);
      }
    });

    document.querySelectorAll('[data-ux-scrollable-tab-bar]').forEach(el => {
      if (!el._uxScrollableTabBar) {
        new UXScrollableTabBar(el);
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }

  // Observe for dynamically added tabs
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.hasAttribute('data-ux-tabs')) {
            new UXTabs(node);
          }
          if (node.hasAttribute('data-ux-scrollable-tab-bar')) {
            new UXScrollableTabBar(node);
          }
          node.querySelectorAll?.('[data-ux-tabs]').forEach(el => {
            if (!el._uxTabs) new UXTabs(el);
          });
          node.querySelectorAll?.('[data-ux-scrollable-tab-bar]').forEach(el => {
            if (!el._uxScrollableTabBar) new UXScrollableTabBar(el);
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // ========================================
  // Alpine.js Components (for backward compatibility)
  // ========================================

  const tabsComponent = (config = {}) => ({
    activeTab: config.activeTab || 0,
    tabs: config.tabs || [],
    animated: config.animated || false,
    indicatorStyle: {},
    tabsId: config.id || 'ux-tabs-' + Math.random().toString(36).substring(2, 11),

    get tablistAriaAttrs() {
      return {
        'role': 'tablist',
        'aria-label': config.ariaLabel || 'Tabs'
      };
    },

    getTabAriaAttrs(index) {
      return {
        'role': 'tab',
        'aria-selected': this.activeTab === index ? 'true' : 'false',
        'aria-controls': this.tabsId + '-panel-' + index,
        'id': this.tabsId + '-tab-' + index,
        'tabindex': this.activeTab === index ? '0' : '-1'
      };
    },

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

  const scrollableTabBarComponent = (config = {}) => ({
    showStartArrow: false,
    showEndArrow: false,
    scrollAmount: config.scrollAmount || 200,
    _scrollContainer: null,

    init() {
      this.$nextTick(() => {
        this._scrollContainer = this.$el.querySelector('.ux-tab-bar__scroll');
        if (this._scrollContainer) {
          this.checkArrows();
          this._scrollContainer.addEventListener('scroll', () => this.checkArrows());
          window.addEventListener('resize', () => this.checkArrows());
        }
      });
    },

    destroy() {
      if (this._scrollContainer) {
        this._scrollContainer.removeEventListener('scroll', () => this.checkArrows());
      }
      window.removeEventListener('resize', () => this.checkArrows());
    },

    checkArrows() {
      if (!this._scrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = this._scrollContainer;
      this.showStartArrow = scrollLeft > 5;
      this.showEndArrow = scrollLeft < scrollWidth - clientWidth - 5;
    },

    scrollStart() {
      if (!this._scrollContainer) return;
      this._scrollContainer.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    },

    scrollEnd() {
      if (!this._scrollContainer) return;
      this._scrollContainer.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    },

    scrollToTab(index) {
      if (!this._scrollContainer) return;
      const tabs = this._scrollContainer.querySelectorAll('.ux-tab-button');
      if (tabs[index]) {
        tabs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  });

  // Register Alpine components
  if (window.UX) {
    window.UX.registerComponent('uxTabs', tabsComponent);
    window.UX.registerComponent('uxScrollableTabBar', scrollableTabBarComponent);
  } else if (typeof Alpine !== 'undefined') {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxTabs', tabsComponent);
      Alpine.data('uxScrollableTabBar', scrollableTabBarComponent);
    });
  }

  // ========================================
  // Export to global namespace
  // ========================================

  window.UXTabs = UXTabs;
  window.UXScrollableTabBar = UXScrollableTabBar;

})();
