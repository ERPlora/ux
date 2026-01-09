/**
 * UX Category Tabs Component
 * Horizontal scrolling category tabs for POS systems
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Category Tabs
       Horizontal scrolling tabs for POS product categories
    ======================================== */

    :root {
      --ux-category-tabs-height: 48px;
      --ux-category-tabs-gap: var(--ux-space-sm);
      --ux-category-tabs-padding: var(--ux-space-sm) var(--ux-space-md);
      --ux-category-tabs-item-padding: var(--ux-space-sm) var(--ux-space-lg);
      --ux-category-tabs-font-size: var(--ux-font-size-sm);
      --ux-category-tabs-border-radius: var(--ux-radius-md, 8px);
      --ux-category-tabs-indicator-height: 3px;
    }

    .ux-category-tabs {
      display: flex;
      align-items: center;
      gap: var(--ux-category-tabs-gap);
      padding: var(--ux-category-tabs-padding);
      background-color: var(--ux-surface);
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      position: relative;
    }

    /* Hide scrollbar but allow scroll */
    .ux-category-tabs {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-category-tabs::-webkit-scrollbar {
      display: none;
    }

    /* ========================================
       Category Tab Item
    ======================================== */

    .ux-category-tabs__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      min-height: var(--ux-category-tabs-height);
      padding: var(--ux-category-tabs-item-padding);
      background: transparent;
      border: none;
      color: var(--ux-text-secondary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-category-tabs-font-size);
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        color var(--ux-transition-fast) var(--ux-ease-default),
        background-color var(--ux-transition-fast) var(--ux-ease-default),
        transform 150ms var(--ux-ease-default);
    }

    .ux-category-tabs__item:hover {
      color: var(--ux-text);
    }

    .ux-category-tabs__item:active {
      transform: scale(0.96);
    }

    /* Active state */
    .ux-category-tabs__item--active {
      color: var(--ux-primary);
    }

    /* Disabled state */
    .ux-category-tabs__item--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* ========================================
       Tab Item Icon
    ======================================== */

    .ux-category-tabs__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      margin-right: var(--ux-space-xs);
    }

    .ux-category-tabs__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-category-tabs__item--icon-only .ux-category-tabs__icon {
      margin-right: 0;
    }

    .ux-category-tabs__item--icon-only .ux-category-tabs__label {
      display: none;
    }

    /* ========================================
       Tab Item Label
    ======================================== */

    .ux-category-tabs__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ========================================
       Sliding Indicator (Underline)
    ======================================== */

    .ux-category-tabs--indicator {
      position: relative;
    }

    .ux-category-tabs__indicator {
      position: absolute;
      bottom: 0;
      height: var(--ux-category-tabs-indicator-height);
      background-color: var(--ux-primary);
      border-radius: var(--ux-category-tabs-indicator-height) var(--ux-category-tabs-indicator-height) 0 0;
      transition:
        left 300ms cubic-bezier(0.4, 0.0, 0.2, 1),
        width 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      will-change: left, width;
    }

    /* ========================================
       Pill Variant (Rounded)
    ======================================== */

    .ux-category-tabs--pill {
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-lg, 12px);
    }

    .ux-category-tabs--pill .ux-category-tabs__item {
      min-height: 36px;
      padding: var(--ux-space-xs) var(--ux-space-md);
      border-radius: 100px;
    }

    .ux-category-tabs--pill .ux-category-tabs__item--active {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-category-tabs--pill .ux-category-tabs__indicator {
      display: none;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
       Note: backdrop-filter comes from universal selector [class*="--glass"] in ux-core.js
    ======================================== */

    .ux-category-tabs--glass {
      background: var(--ux-glass-bg);
      border-bottom: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-category-tabs--glass .ux-category-tabs__item--active {
      color: var(--ux-text);
    }

    .ux-category-tabs--glass .ux-category-tabs__indicator {
      background: var(--ux-glass-bg-thick);
      box-shadow: var(--ux-glass-shadow);
    }

    /* Glass + Pill combo */
    .ux-category-tabs--glass.ux-category-tabs--pill {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-radius-lg, 12px);
    }

    .ux-category-tabs--glass.ux-category-tabs--pill .ux-category-tabs__item--active {
      background: var(--ux-glass-bg-thick);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-category-tabs--sm {
      --ux-category-tabs-height: 36px;
      --ux-category-tabs-item-padding: var(--ux-space-xs) var(--ux-space-md);
      --ux-category-tabs-font-size: var(--ux-font-size-xs);
      --ux-category-tabs-indicator-height: 2px;
    }

    .ux-category-tabs--sm .ux-category-tabs__icon {
      width: 16px;
      height: 16px;
    }

    .ux-category-tabs--lg {
      --ux-category-tabs-height: 56px;
      --ux-category-tabs-item-padding: var(--ux-space-md) var(--ux-space-xl);
      --ux-category-tabs-font-size: var(--ux-font-size-md);
      --ux-category-tabs-indicator-height: 4px;
    }

    .ux-category-tabs--lg .ux-category-tabs__icon {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Border Variant (with bottom border)
    ======================================== */

    .ux-category-tabs--bordered {
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-category-tabs--primary .ux-category-tabs__item--active {
      color: var(--ux-primary);
    }

    .ux-category-tabs--primary .ux-category-tabs__indicator {
      background-color: var(--ux-primary);
    }

    .ux-category-tabs--success .ux-category-tabs__item--active {
      color: var(--ux-success);
    }

    .ux-category-tabs--success .ux-category-tabs__indicator {
      background-color: var(--ux-success);
    }

    .ux-category-tabs--danger .ux-category-tabs__item--active {
      color: var(--ux-danger);
    }

    .ux-category-tabs--danger .ux-category-tabs__indicator {
      background-color: var(--ux-danger);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-category-tabs {
        background-color: var(--ux-surface);
      }

      .ux-category-tabs--pill {
        background-color: var(--ux-surface-secondary);
      }

      .ux-category-tabs--pill .ux-category-tabs__item--active {
        background-color: var(--ux-surface-tertiary);
      }
    }

    .ux-dark .ux-category-tabs {
      background-color: var(--ux-surface);
    }

    .ux-dark .ux-category-tabs--pill {
      background-color: var(--ux-surface-secondary);
    }

    .ux-dark .ux-category-tabs--pill .ux-category-tabs__item--active {
      background-color: var(--ux-surface-tertiary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-category-tabs {
        scroll-behavior: auto;
      }

      .ux-category-tabs__item {
        transition: none;
      }

      .ux-category-tabs__indicator {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-category-tabs-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-category-tabs-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for category tabs
  const categoryTabsComponent = (config = {}) => ({
    activeTab: config.activeTab || config.value || null,
    categories: config.categories || [],
    indicatorStyle: {},
    scrollOnSelect: config.scrollOnSelect !== false,

    init() {
      // Set first category as default if no active tab
      if (this.activeTab === null && this.categories.length > 0) {
        this.activeTab = this.categories[0].value || this.categories[0].id || 0;
      }
      this.$nextTick(() => {
        this.updateIndicator();
        this.scrollToActiveTab();
      });
    },

    selectTab(value) {
      const category = this.categories.find(c => (c.value || c.id) === value);
      if (category?.disabled) return;
      if (this.activeTab === value) return;

      this.activeTab = value;
      this.updateIndicator();

      if (this.scrollOnSelect) {
        this.scrollToTab(value);
      }

      this.$dispatch('category-change', { value, category });
    },

    scrollToTab(value) {
      const container = this.$refs.container || this.$el;
      if (!container) return;

      const index = this.categories.findIndex(c => (c.value || c.id) === value);
      const buttons = container.querySelectorAll('.ux-category-tabs__item');
      const targetButton = buttons[index];

      if (targetButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = targetButton.getBoundingClientRect();

        // Calculate scroll position to center the tab
        const scrollLeft = targetButton.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);

        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    },

    scrollToActiveTab() {
      if (this.activeTab !== null) {
        this.scrollToTab(this.activeTab);
      }
    },

    isActive(value) {
      return this.activeTab === value;
    },

    updateIndicator() {
      const container = this.$refs.container || this.$el;
      if (!container) return;

      const index = this.categories.findIndex(c => (c.value || c.id) === this.activeTab);
      const buttons = container.querySelectorAll('.ux-category-tabs__item');
      const activeButton = buttons[index];

      if (activeButton) {
        this.indicatorStyle = {
          left: activeButton.offsetLeft + 'px',
          width: activeButton.offsetWidth + 'px'
        };
      }
    },

    get activeCategory() {
      return this.categories.find(c => (c.value || c.id) === this.activeTab);
    },

    get activeIndex() {
      return this.categories.findIndex(c => (c.value || c.id) === this.activeTab);
    },

    // Navigate to next/previous tab
    next() {
      const currentIndex = this.activeIndex;
      if (currentIndex < this.categories.length - 1) {
        const nextCategory = this.categories[currentIndex + 1];
        this.selectTab(nextCategory.value || nextCategory.id);
      }
    },

    prev() {
      const currentIndex = this.activeIndex;
      if (currentIndex > 0) {
        const prevCategory = this.categories[currentIndex - 1];
        this.selectTab(prevCategory.value || prevCategory.id);
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCategoryTabs', categoryTabsComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCategoryTabs', categoryTabsComponent);
    });
  }
})();
