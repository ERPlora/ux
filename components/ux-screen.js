/**
 * UX Screen Layout
 * Pantalla estilo iOS/Ionic para páginas internas
 * Header + Content scrollable + Footer condicional
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Screen - CSS Variables
    ======================================== */

    :root {
      --ux-screen-header-height: 3.5rem;  /* 56px */
      --ux-screen-footer-height: 3.5rem;  /* 56px */
    }

    /* ========================================
       UX Screen Container
    ======================================== */

    .ux-screen {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow: hidden;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Screen Header
    ======================================== */

    .ux-screen__header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: var(--ux-screen-header-height);
      min-height: var(--ux-screen-header-height);
      padding: 0 var(--ux-space-md);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      gap: var(--ux-space-sm);
      z-index: 10;
    }

    /* Header slots */
    .ux-screen__back {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .ux-screen__title {
      flex: 1;
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      /* Truncate long titles */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Center title when back button present */
    .ux-screen__header--centered .ux-screen__title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      max-width: 60%;
      text-align: center;
    }

    .ux-screen__actions {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* Header variants */
    .ux-screen__header--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    .ux-screen__header--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    /* Large title variant (iOS style) */
    .ux-screen__header--large {
      flex-direction: column;
      align-items: flex-start;
      height: auto;
      min-height: var(--ux-screen-header-height);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-screen__header--large .ux-screen__title {
      font-size: var(--ux-font-size-2xl);
      font-weight: 700;
      margin-top: var(--ux-space-xs);
    }

    .ux-screen__header--large .ux-screen__row {
      display: flex;
      align-items: center;
      width: 100%;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       UX Screen Content
    ======================================== */

    .ux-screen__content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    /* Content padding variants */
    .ux-screen__content--padded {
      padding: var(--ux-space-md);
    }

    /* No scroll variant */
    .ux-screen__content--no-scroll {
      overflow: hidden;
    }

    /* ========================================
       UX Screen Footer
    ======================================== */

    .ux-screen__footer {
      flex-shrink: 0;
      min-height: var(--ux-screen-footer-height);
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      z-index: 10;
    }

    /* Hide footer when empty */
    .ux-screen__footer:empty {
      display: none;
    }

    /* Footer variants */
    .ux-screen__footer--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-top: 0.5px solid var(--ux-glass-border);
    }

    .ux-screen__footer--transparent {
      background-color: transparent;
      border-top: none;
    }

    /* Footer with tab bar */
    .ux-screen__footer .ux-tab-bar {
      height: 100%;
    }

    /* Footer with toolbar */
    .ux-screen__footer .ux-toolbar {
      height: 100%;
      border-top: none;
    }

    /* Safe area padding for notched devices */
    .ux-screen__footer--safe {
      padding-bottom: env(safe-area-inset-bottom);
    }

    /* ========================================
       UX Screen Modifiers
    ======================================== */

    /* Full height (for use outside ux-admin) */
    .ux-screen--full {
      height: 100vh;
      height: 100dvh;
    }

    /* With fixed header */
    .ux-screen--fixed-header .ux-screen__header {
      position: sticky;
      top: 0;
    }

    /* With fixed footer */
    .ux-screen--fixed-footer .ux-screen__footer {
      position: sticky;
      bottom: 0;
    }

    /* ========================================
       Backward Compatibility Aliases
    ======================================== */

    /* Map old class names to new ones */
    .ux-page-layout {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .ux-page-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      min-height: var(--ux-screen-header-height);
      padding: var(--ux-space-sm) var(--ux-space-md);
      gap: var(--ux-space-sm);
    }

    .ux-page-header__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: var(--ux-space-md);
    }

    .ux-page-header__title h1 {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-page-header__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-page-header__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-page-header__search {
      width: 100%;
      margin-top: var(--ux-space-sm);
    }

    .ux-page-content,
    .ux-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-screen-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-screen-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for screen
  const screenComponent = (config = {}) => ({
    // Scroll state
    scrollTop: 0,
    isScrolling: false,
    scrollDirection: 'down',
    _lastScrollTop: 0,
    _scrollTimeout: null,

    init() {
      // Initialize scroll tracking if content element exists
      this.$nextTick(() => {
        const content = this.$el.querySelector('.ux-screen__content');
        if (content) {
          content.addEventListener('scroll', this.handleScroll.bind(this));
        }
      });
    },

    destroy() {
      const content = this.$el.querySelector('.ux-screen__content');
      if (content) {
        content.removeEventListener('scroll', this.handleScroll.bind(this));
      }
    },

    handleScroll(event) {
      const el = event.target;

      // Determine scroll direction
      this.scrollDirection = el.scrollTop > this._lastScrollTop ? 'down' : 'up';
      this._lastScrollTop = el.scrollTop;
      this.scrollTop = el.scrollTop;

      // Track scrolling state
      if (!this.isScrolling) {
        this.isScrolling = true;
        this.$dispatch('ux-screen-scroll-start', { scrollTop: this.scrollTop });
      }

      // Dispatch scroll event
      this.$dispatch('ux-screen-scroll', {
        scrollTop: this.scrollTop,
        direction: this.scrollDirection
      });

      // Debounce scroll end
      clearTimeout(this._scrollTimeout);
      this._scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.$dispatch('ux-screen-scroll-end', { scrollTop: this.scrollTop });
      }, 150);
    },

    // Scroll methods
    scrollToTop(duration = 300) {
      const content = this.$el.querySelector('.ux-screen__content');
      if (content) {
        content.scrollTo({ top: 0, behavior: duration > 0 ? 'smooth' : 'auto' });
      }
    },

    scrollToBottom(duration = 300) {
      const content = this.$el.querySelector('.ux-screen__content');
      if (content) {
        content.scrollTo({
          top: content.scrollHeight - content.clientHeight,
          behavior: duration > 0 ? 'smooth' : 'auto'
        });
      }
    },

    // Check scroll position
    get isAtTop() {
      return this.scrollTop <= 0;
    },

    get isAtBottom() {
      const content = this.$el.querySelector('.ux-screen__content');
      if (!content) return false;
      return this.scrollTop >= content.scrollHeight - content.clientHeight - 1;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxScreen', screenComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxScreen', screenComponent);
    });
  }
})();
