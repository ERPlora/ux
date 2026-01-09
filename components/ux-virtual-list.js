/**
 * UX Virtual List Component
 * Efficient rendering of large lists with virtualization
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Virtual List - Base
    ======================================== */

    .ux-virtual-list {
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      font-family: var(--ux-font-family);
    }

    .ux-virtual-list__container {
      position: relative;
      width: 100%;
    }

    .ux-virtual-list__content {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
    }

    /* ========================================
       List Items
    ======================================== */

    .ux-virtual-list__item {
      box-sizing: border-box;
    }

    /* ========================================
       Loading States
    ======================================== */

    .ux-virtual-list__loader {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
      color: var(--ux-text-secondary);
    }

    .ux-virtual-list__spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-virtual-spin 0.8s linear infinite;
    }

    @keyframes ux-virtual-spin {
      to { transform: rotate(360deg); }
    }

    .ux-virtual-list__loader-text {
      margin-left: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-virtual-list__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      text-align: center;
    }

    .ux-virtual-list__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-virtual-list__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
    }

    .ux-virtual-list__empty-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Scroll to Top Button
    ======================================== */

    .ux-virtual-list__scroll-top {
      position: absolute;
      bottom: var(--ux-space-md);
      right: var(--ux-space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      color: var(--ux-text);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all var(--ux-transition-fast) var(--ux-ease);
      z-index: 10;
    }

    .ux-virtual-list__scroll-top--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-virtual-list__scroll-top:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-virtual-list__scroll-top svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Row Variants
    ======================================== */

    .ux-virtual-list--striped .ux-virtual-list__item:nth-child(even) {
      background: var(--ux-surface-secondary);
    }

    .ux-virtual-list--bordered .ux-virtual-list__item {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-virtual-list--bordered .ux-virtual-list__item:last-child {
      border-bottom: none;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-virtual-list--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-virtual-list__spinner {
        animation: none;
      }

      .ux-virtual-list__scroll-top {
        transition: opacity var(--ux-transition-fast);
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-virtual-list-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-virtual-list-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for virtual list
  const virtualListData = (options = {}) => ({
    // Data
    items: options.items || [],
    itemHeight: options.itemHeight || 50,
    buffer: options.buffer || 5,

    // State
    visibleItems: [],
    startIndex: 0,
    endIndex: 0,
    scrollTop: 0,
    containerHeight: 0,
    totalHeight: 0,

    // Options
    loading: options.loading || false,
    loadingText: options.loadingText || 'Cargando...',
    emptyTitle: options.emptyTitle || 'Sin elementos',
    emptyText: options.emptyText || 'No hay elementos para mostrar.',
    showScrollTop: options.showScrollTop ?? true,
    scrollTopThreshold: options.scrollTopThreshold || 300,

    // Infinite scroll
    hasMore: options.hasMore ?? false,
    loadMore: options.loadMore || null,
    loadingMore: false,
    infiniteScrollThreshold: options.infiniteScrollThreshold || 200,

    init() {
      this.$nextTick(() => {
        this.containerHeight = this.$el.clientHeight;
        this.calculateVisibleItems();
      });

      // Set up scroll listener
      this._scrollHandler = this.onScroll.bind(this);
      this.$el.addEventListener('scroll', this._scrollHandler, { passive: true });

      // Set up resize observer
      if (typeof ResizeObserver !== 'undefined') {
        this._resizeObserver = new ResizeObserver(() => {
          this.containerHeight = this.$el.clientHeight;
          this.calculateVisibleItems();
        });
        this._resizeObserver.observe(this.$el);
      }
    },

    destroy() {
      if (this._scrollHandler) {
        this.$el.removeEventListener('scroll', this._scrollHandler);
      }
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    },

    // Calculate which items should be visible
    calculateVisibleItems() {
      if (this.items.length === 0) {
        this.visibleItems = [];
        this.totalHeight = 0;
        return;
      }

      this.totalHeight = this.items.length * this.itemHeight;

      const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
      this.startIndex = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer);
      this.endIndex = Math.min(this.items.length, this.startIndex + visibleCount + (this.buffer * 2));

      this.visibleItems = this.items.slice(this.startIndex, this.endIndex).map((item, index) => ({
        ...item,
        _virtualIndex: this.startIndex + index,
        _top: (this.startIndex + index) * this.itemHeight
      }));
    },

    // Handle scroll event
    onScroll() {
      this.scrollTop = this.$el.scrollTop;
      this.calculateVisibleItems();

      // Infinite scroll
      if (this.hasMore && !this.loadingMore && this.loadMore) {
        const scrollBottom = this.$el.scrollHeight - this.$el.scrollTop - this.$el.clientHeight;
        if (scrollBottom < this.infiniteScrollThreshold) {
          this.triggerLoadMore();
        }
      }

      // Dispatch scroll event
      this.$dispatch('virtuallist:scroll', {
        scrollTop: this.scrollTop,
        startIndex: this.startIndex,
        endIndex: this.endIndex
      });
    },

    // Trigger load more
    async triggerLoadMore() {
      if (this.loadingMore || !this.hasMore) return;

      this.loadingMore = true;
      this.$dispatch('virtuallist:loadmore');

      if (typeof this.loadMore === 'function') {
        try {
          await this.loadMore();
        } catch (error) {
          console.error('Virtual list load more error:', error);
        }
      }

      this.loadingMore = false;
    },

    // Scroll to index
    scrollToIndex(index, behavior = 'smooth') {
      const targetTop = index * this.itemHeight;
      this.$el.scrollTo({
        top: targetTop,
        behavior
      });
    },

    // Scroll to top
    scrollToTop(behavior = 'smooth') {
      this.$el.scrollTo({
        top: 0,
        behavior
      });
    },

    // Check if scroll-to-top button should be visible
    get showScrollTopButton() {
      return this.showScrollTop && this.scrollTop > this.scrollTopThreshold;
    },

    // Get transform style for content
    get contentStyle() {
      return {
        transform: `translateY(${this.startIndex * this.itemHeight}px)`
      };
    },

    // Get container style
    get containerStyle() {
      return {
        height: `${this.totalHeight}px`
      };
    },

    // Update items
    setItems(newItems) {
      this.items = newItems;
      this.calculateVisibleItems();
    },

    // Add items
    addItems(newItems) {
      this.items = [...this.items, ...newItems];
      this.calculateVisibleItems();
    },

    // Prepend items
    prependItems(newItems) {
      this.items = [...newItems, ...this.items];
      this.calculateVisibleItems();
    },

    // Remove item
    removeItem(index) {
      this.items.splice(index, 1);
      this.calculateVisibleItems();
    },

    // Update item
    updateItem(index, updates) {
      if (index >= 0 && index < this.items.length) {
        this.items[index] = { ...this.items[index], ...updates };
        this.calculateVisibleItems();
      }
    },

    // Get item at index
    getItem(index) {
      return this.items[index];
    },

    // Get visible range
    getVisibleRange() {
      return {
        start: this.startIndex,
        end: this.endIndex,
        count: this.endIndex - this.startIndex
      };
    },

    // Check if item is visible
    isItemVisible(index) {
      return index >= this.startIndex && index < this.endIndex;
    },

    // Get current scroll percentage
    get scrollPercentage() {
      if (this.totalHeight <= this.containerHeight) return 100;
      return Math.round((this.scrollTop / (this.totalHeight - this.containerHeight)) * 100);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxVirtualList', virtualListData);
  }

})();
