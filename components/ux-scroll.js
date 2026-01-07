/**
 * UX Scroll Component
 * Alpine.js components for scroll behavior
 * CSS is in ux-content.js to avoid duplication
 * @requires ux-core.js
 * @requires ux-content.js (for CSS)
 */
(function() {
  'use strict';

  // No CSS here - all layout/scroll CSS is in ux-content.js
  const styles = ``;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-scroll-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-scroll-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for scroll with scroll events and methods
  // ARIA: Main content landmark
  const scrollComponent = (config = {}) => ({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
    isScrolling: false,
    scrollEvents: config.scrollEvents || false,
    _scrollTimeout: null,
    _lastScrollTop: 0,
    _scrollDirection: 'down',
    scrollId: config.id || 'ux-scroll-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'main',
        'id': this.scrollId
      };
    },

    init() {
      this.$nextTick(() => {
        this.updateScrollInfo();
      });
    },

    // Get scroll element
    getScrollElement() {
      return this.$refs.scroll || this.$refs.content || this.$el;
    },

    // Update scroll information
    updateScrollInfo() {
      const el = this.getScrollElement();
      if (!el) return;

      this.scrollTop = el.scrollTop;
      this.scrollLeft = el.scrollLeft;
      this.scrollHeight = el.scrollHeight;
      this.scrollWidth = el.scrollWidth;
      this.clientHeight = el.clientHeight;
      this.clientWidth = el.clientWidth;
    },

    // Handle scroll event
    handleScroll(event) {
      const el = event.target;

      // Determine scroll direction
      this._scrollDirection = el.scrollTop > this._lastScrollTop ? 'down' : 'up';
      this._lastScrollTop = el.scrollTop;

      // Update scroll info
      this.scrollTop = el.scrollTop;
      this.scrollLeft = el.scrollLeft;

      // Dispatch scroll start
      if (!this.isScrolling) {
        this.isScrolling = true;
        this.$dispatch('ux-scroll-start', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          direction: this._scrollDirection
        });
      }

      // Dispatch scroll event (throttled if scrollEvents is false)
      if (this.scrollEvents) {
        this.$dispatch('ux-scroll', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          direction: this._scrollDirection,
          detail: {
            currentY: this.scrollTop,
            currentX: this.scrollLeft,
            deltaY: el.scrollTop - this._lastScrollTop,
            velocityY: 0 // Would need RAF for accurate velocity
          }
        });
      }

      // Dispatch scroll end (debounced)
      clearTimeout(this._scrollTimeout);
      this._scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.$dispatch('ux-scroll-end', {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
          direction: this._scrollDirection
        });
      }, 150);
    },

    // Scroll to top
    scrollToTop(duration = 300) {
      return this.scrollToPoint(0, 0, duration);
    },

    // Scroll to bottom
    scrollToBottom(duration = 300) {
      const el = this.getScrollElement();
      if (!el) return Promise.resolve();

      return this.scrollToPoint(0, el.scrollHeight - el.clientHeight, duration);
    },

    // Scroll to specific point
    scrollToPoint(x, y, duration = 300) {
      const el = this.getScrollElement();
      if (!el) return Promise.resolve();

      return new Promise((resolve) => {
        if (duration === 0) {
          el.scrollTop = y;
          el.scrollLeft = x;
          this.updateScrollInfo();
          resolve();
          return;
        }

        el.scrollTo({
          top: y,
          left: x,
          behavior: 'smooth'
        });

        // Resolve after animation
        setTimeout(() => {
          this.updateScrollInfo();
          resolve();
        }, duration);
      });
    },

    // Scroll by amount
    scrollByPoint(x, y, duration = 300) {
      const el = this.getScrollElement();
      if (!el) return Promise.resolve();

      return this.scrollToPoint(
        el.scrollLeft + x,
        el.scrollTop + y,
        duration
      );
    },

    // Scroll to element
    scrollToElement(selector, duration = 300) {
      const el = this.getScrollElement();
      const target = el?.querySelector(selector);
      if (!target) return Promise.resolve();

      const targetRect = target.getBoundingClientRect();
      const scrollRect = el.getBoundingClientRect();

      return this.scrollToPoint(
        el.scrollLeft,
        el.scrollTop + (targetRect.top - scrollRect.top),
        duration
      );
    },

    // Check if scrolled to top
    get isAtTop() {
      return this.scrollTop <= 0;
    },

    // Check if scrolled to bottom
    get isAtBottom() {
      const el = this.getScrollElement();
      if (!el) return false;
      return this.scrollTop >= el.scrollHeight - el.clientHeight - 1;
    },

    // Get scroll progress (0 to 1)
    get scrollProgress() {
      const el = this.getScrollElement();
      if (!el || el.scrollHeight <= el.clientHeight) return 0;
      return this.scrollTop / (el.scrollHeight - el.clientHeight);
    }
  });

  // Register with both new and old names
  if (window.UX) {
    window.UX.registerComponent('uxScroll', scrollComponent);
    window.UX.registerComponent('uxContent', scrollComponent); // Backward compatibility
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScroll', scrollComponent);
      Alpine.data('uxContent', scrollComponent); // Backward compatibility
    });
  }

  // Alpine component for page
  // Handles page-level concerns like visibility, lifecycle
  const pageComponent = (config = {}) => ({
    isActive: config.isActive !== false,
    pageId: config.id || 'ux-page-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'document',
        'id': this.pageId,
        'aria-hidden': !this.isActive ? 'true' : 'false'
      };
    },

    // Lifecycle methods
    onEnter() {
      this.isActive = true;
      this.$dispatch('ux-page-enter', { pageId: this.pageId });
    },

    onLeave() {
      this.isActive = false;
      this.$dispatch('ux-page-leave', { pageId: this.pageId });
    },

    // For use with routers
    activate() {
      this.onEnter();
    },

    deactivate() {
      this.onLeave();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPage', pageComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPage', pageComponent);
    });
  }

  // Alpine component for scroll-to-top
  const scrollTopComponent = (config = {}) => ({
    visible: false,
    threshold: config.threshold || 300,

    init() {
      this.checkScroll = this.checkScroll.bind(this);
    },

    checkScroll(scrollTop) {
      this.visible = scrollTop > this.threshold;
    },

    scrollToTop() {
      const scroll = document.querySelector('.ux-scroll') || document.querySelector('.ux-content');
      if (scroll) {
        scroll.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxScrollTop', scrollTopComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScrollTop', scrollTopComponent);
    });
  }

  // Alpine component for collapsible header
  const collapsibleHeaderComponent = (config = {}) => ({
    collapsed: false,
    lastScrollTop: 0,
    threshold: config.threshold || 50,

    handleScroll(scrollTop) {
      if (scrollTop > this.lastScrollTop && scrollTop > this.threshold) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
      this.lastScrollTop = scrollTop;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCollapsibleHeader', collapsibleHeaderComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCollapsibleHeader', collapsibleHeaderComponent);
    });
  }
})();
