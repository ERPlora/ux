/**
 * UX Infinite Scroll Component
 * Scroll infinito para listas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Infinite Scroll
    ======================================== */

    .ux-infinite-scroll {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--ux-space-lg);
      min-height: 60px;
    }

    .ux-infinite-scroll--hidden {
      display: none;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-infinite-scroll__spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
    }

    .ux-infinite-scroll__icon {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-light);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-spin 0.8s linear infinite;
    }

    @keyframes ux-spin {
      to {
        transform: rotate(360deg);
      }
    }

    .ux-infinite-scroll__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       End State
    ======================================== */

    .ux-infinite-scroll--complete {
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-icon {
      width: 20px;
      height: 20px;
      margin-bottom: var(--ux-space-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-infinite-scroll__end-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-infinite-scroll--error {
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-infinite-scroll__error-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-infinite-scroll__retry {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
    }

    .ux-infinite-scroll__retry:hover {
      text-decoration: underline;
    }

    /* ========================================
       Scroll Progress Bar
    ======================================== */

    .ux-scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--ux-light);
      z-index: 1000;
    }

    .ux-scroll-progress__bar {
      height: 100%;
      background-color: var(--ux-primary);
      transition: width 0.1s ease-out;
    }

    /* ========================================
       Virtual Scroll Container
    ======================================== */

    .ux-virtual-scroll {
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-virtual-scroll__spacer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }

    .ux-virtual-scroll__content {
      position: relative;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-infinite-scroll-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-infinite-scroll-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for infinite scroll
  const infiniteScrollComponent = (config = {}) => ({
    loading: false,
    complete: false,
    error: false,
    threshold: config.threshold || 100,
    disabled: config.disabled || false,

    async checkScroll(scrollContainer) {
      if (this.loading || this.complete || this.disabled) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < this.threshold) {
        await this.loadMore();
      }
    },

    async loadMore() {
      if (this.loading || this.complete) return;

      this.loading = true;
      this.error = false;

      // The actual loading should be handled by the parent component
      // via @load-more event
    },

    setComplete() {
      this.complete = true;
      this.loading = false;
    },

    setError() {
      this.error = true;
      this.loading = false;
    },

    reset() {
      this.loading = false;
      this.complete = false;
      this.error = false;
    },

    finishLoading() {
      this.loading = false;
    },

    retry() {
      this.error = false;
      this.loadMore();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxInfiniteScroll', infiniteScrollComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxInfiniteScroll', infiniteScrollComponent);
    });
  }

  // Alpine component for scroll progress
  const scrollProgressComponent = () => ({
    progress: 0,

    updateProgress(scrollContainer) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;
      this.progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    },

    get progressStyle() {
      return { width: this.progress + '%' };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxScrollProgress', scrollProgressComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScrollProgress', scrollProgressComponent);
    });
  }

  // Alpine component for simple virtual scroll
  const virtualScrollComponent = (config = {}) => ({
    items: config.items || [],
    itemHeight: config.itemHeight || 50,
    containerHeight: config.containerHeight || 400,
    buffer: config.buffer || 5,
    scrollTop: 0,

    get totalHeight() {
      return this.items.length * this.itemHeight;
    },

    get visibleCount() {
      return Math.ceil(this.containerHeight / this.itemHeight) + this.buffer * 2;
    },

    get startIndex() {
      return Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.buffer);
    },

    get endIndex() {
      return Math.min(this.items.length, this.startIndex + this.visibleCount);
    },

    get visibleItems() {
      return this.items.slice(this.startIndex, this.endIndex).map((item, index) => ({
        ...item,
        _index: this.startIndex + index,
        _style: {
          position: 'absolute',
          top: (this.startIndex + index) * this.itemHeight + 'px',
          left: 0,
          right: 0,
          height: this.itemHeight + 'px'
        }
      }));
    },

    handleScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },

    scrollToIndex(index) {
      const container = this.$refs.container;
      if (container) {
        container.scrollTop = index * this.itemHeight;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxVirtualScroll', virtualScrollComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxVirtualScroll', virtualScrollComponent);
    });
  }
})();
