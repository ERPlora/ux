/**
 * UX Load More Component
 * Button to load additional content with loading states
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Load More
    ======================================== */

    :root {
      --ux-load-more-height: 44px;
      --ux-load-more-padding: var(--ux-space-md) var(--ux-space-xl);
      --ux-load-more-font-size: var(--ux-font-size-md);
      --ux-load-more-border-radius: var(--ux-radius-full);
      --ux-load-more-gap: var(--ux-space-lg);
    }

    .ux-load-more {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-load-more-gap) 0;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Load More Button
    ======================================== */

    .ux-load-more__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      height: var(--ux-load-more-height);
      padding: var(--ux-load-more-padding);
      font-size: var(--ux-load-more-font-size);
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: 1px solid var(--ux-primary);
      border-radius: var(--ux-load-more-border-radius);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-load-more__button:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-load-more__button:active {
      transform: scale(0.98);
    }

    .ux-load-more__button:focus-visible {
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.3);
    }

    .ux-load-more__button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* ========================================
       Icon
    ======================================== */

    .ux-load-more__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-load-more--loading .ux-load-more__button {
      pointer-events: none;
    }

    .ux-load-more__spinner {
      width: 18px;
      height: 18px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: ux-load-more-spin 0.8s linear infinite;
    }

    @keyframes ux-load-more-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Status Text
    ======================================== */

    .ux-load-more__status {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Progress Indicator
    ======================================== */

    .ux-load-more__progress {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-load-more__progress-bar {
      width: 100px;
      height: 4px;
      background: var(--ux-gray-200);
      border-radius: 2px;
      overflow: hidden;
    }

    .ux-load-more__progress-fill {
      height: 100%;
      background: var(--ux-primary);
      border-radius: 2px;
      transition: width var(--ux-transition-normal);
    }

    .ux-load-more__progress-text {
      min-width: 60px;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled variant */
    .ux-load-more--filled .ux-load-more__button {
      background: var(--ux-primary);
      color: white;
      border-color: var(--ux-primary);
    }

    .ux-load-more--filled .ux-load-more__button:hover {
      background: var(--ux-primary-shade);
      border-color: var(--ux-primary-shade);
    }

    /* Ghost variant */
    .ux-load-more--ghost .ux-load-more__button {
      border: none;
      color: var(--ux-primary);
    }

    .ux-load-more--ghost .ux-load-more__button:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    /* Soft variant */
    .ux-load-more--soft .ux-load-more__button {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
      border: none;
    }

    .ux-load-more--soft .ux-load-more__button:hover {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    /* Link style */
    .ux-load-more--link .ux-load-more__button {
      height: auto;
      padding: var(--ux-space-sm);
      border: none;
      background: transparent;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .ux-load-more--link .ux-load-more__button:hover {
      background: transparent;
      opacity: 0.8;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-load-more--sm {
      --ux-load-more-height: 36px;
      --ux-load-more-padding: var(--ux-space-sm) var(--ux-space-lg);
      --ux-load-more-font-size: var(--ux-font-size-sm);
    }

    .ux-load-more--sm .ux-load-more__icon,
    .ux-load-more--sm .ux-load-more__spinner {
      width: 14px;
      height: 14px;
    }

    .ux-load-more--lg {
      --ux-load-more-height: 52px;
      --ux-load-more-padding: var(--ux-space-md) var(--ux-space-2xl);
      --ux-load-more-font-size: var(--ux-font-size-lg);
    }

    .ux-load-more--lg .ux-load-more__icon,
    .ux-load-more--lg .ux-load-more__spinner {
      width: 22px;
      height: 22px;
    }

    /* ========================================
       Full Width
    ======================================== */

    .ux-load-more--full {
      width: 100%;
    }

    .ux-load-more--full .ux-load-more__button {
      width: 100%;
    }

    /* ========================================
       End of List State
    ======================================== */

    .ux-load-more--end {
      pointer-events: none;
    }

    .ux-load-more--end .ux-load-more__button {
      display: none;
    }

    .ux-load-more__end-message {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    .ux-load-more__end-icon {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Divider Style
    ======================================== */

    .ux-load-more--divider {
      width: 100%;
    }

    .ux-load-more--divider .ux-load-more__button {
      position: relative;
      width: 100%;
      background: transparent;
      border: none;
      border-radius: 0;
    }

    .ux-load-more--divider .ux-load-more__button::before,
    .ux-load-more--divider .ux-load-more__button::after {
      content: '';
      position: absolute;
      top: 50%;
      width: calc(50% - 80px);
      height: 1px;
      background: var(--ux-border-color);
    }

    .ux-load-more--divider .ux-load-more__button::before {
      left: 0;
    }

    .ux-load-more--divider .ux-load-more__button::after {
      right: 0;
    }

    .ux-load-more--divider .ux-load-more__button:hover {
      background: transparent;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-load-more--glass .ux-load-more__button {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
      color: var(--ux-text);
    }

    .ux-load-more--glass .ux-load-more__button:hover {
      background: var(--ux-glass-bg-thick);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-load-more__progress-bar {
        background: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-load-more__progress-bar {
      background: var(--ux-gray-700);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-load-more__spinner {
        animation: none;
      }

      .ux-load-more__button {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-load-more-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-load-more-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const loadMoreData = (options = {}) => ({
    loading: false,
    hasMore: options.hasMore ?? true,
    currentPage: options.page ?? 1,
    totalPages: options.totalPages ?? null,
    totalItems: options.totalItems ?? null,
    loadedItems: options.loadedItems ?? 0,
    pageSize: options.pageSize ?? 10,
    autoLoadThreshold: options.autoLoadThreshold ?? null,

    get progress() {
      if (this.totalItems && this.loadedItems) {
        return Math.round((this.loadedItems / this.totalItems) * 100);
      }
      if (this.totalPages && this.currentPage) {
        return Math.round((this.currentPage / this.totalPages) * 100);
      }
      return 0;
    },

    get statusText() {
      if (this.totalItems && this.loadedItems) {
        return `${this.loadedItems} of ${this.totalItems}`;
      }
      if (this.totalPages && this.currentPage) {
        return `Page ${this.currentPage} of ${this.totalPages}`;
      }
      return '';
    },

    init() {
      // Auto-load support with intersection observer
      if (this.autoLoadThreshold) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && this.hasMore && !this.loading) {
              this.load();
            }
          });
        }, {
          rootMargin: `${this.autoLoadThreshold}px`
        });

        observer.observe(this.$el);
        this._observer = observer;
      }
    },

    destroy() {
      if (this._observer) {
        this._observer.disconnect();
      }
    },

    async load() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;
      this.$dispatch('loadmore:start', { page: this.currentPage });

      try {
        // Wait for external handler to complete
        await this.$nextTick();

        // The parent should update hasMore, currentPage, etc.
        this.currentPage++;

        this.$dispatch('loadmore:success', { page: this.currentPage });
      } catch (error) {
        this.$dispatch('loadmore:error', { error });
      } finally {
        this.loading = false;
        this.$dispatch('loadmore:complete', { page: this.currentPage, hasMore: this.hasMore });
      }
    },

    setHasMore(value) {
      this.hasMore = value;
    },

    setLoading(value) {
      this.loading = value;
    },

    updateProgress(loaded, total) {
      this.loadedItems = loaded;
      this.totalItems = total;
      this.hasMore = loaded < total;
    },

    reset() {
      this.currentPage = 1;
      this.loadedItems = 0;
      this.hasMore = true;
      this.loading = false;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxLoadMore', loadMoreData);
  }

})();
