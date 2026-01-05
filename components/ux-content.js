/**
 * UX Content Component
 * Contenedor principal de contenido estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX App Container
    ======================================== */

    .ux-app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       UX Page
    ======================================== */

    .ux-page {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      contain: layout size style;
    }

    /* ========================================
       UX Header
    ======================================== */

    .ux-header {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 10;
    }

    .ux-header--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .ux-header--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .ux-header--collapse {
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-header--collapsed {
      transform: translateY(-100%);
    }

    /* ========================================
       UX Content
    ======================================== */

    .ux-content {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .ux-content--fullscreen {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .ux-content--scroll-y {
      overflow-y: scroll;
    }

    .ux-content--no-scroll {
      overflow: hidden;
    }

    /* Header offset */
    .ux-content--has-header {
      padding-top: var(--ux-header-height, 56px);
    }

    .ux-content--has-footer {
      padding-bottom: var(--ux-footer-height, 56px);
    }

    /* Safe area padding */
    .ux-content--safe-area {
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    /* Content inner wrapper */
    .ux-content__inner {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: var(--ux-content-padding, var(--ux-space-lg));
    }

    .ux-content__inner--centered {
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       UX Footer
    ======================================== */

    .ux-footer {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 10;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-footer--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .ux-footer--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: none;
    }

    .ux-footer--safe-area {
      padding-bottom: env(safe-area-inset-bottom);
    }

    /* ========================================
       UX Split Pane (iPad layout)
    ======================================== */

    .ux-split-pane {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .ux-split-pane__side {
      display: none;
      flex-shrink: 0;
      width: var(--ux-split-pane-width, 270px);
      border-right: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-split-pane__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    @media (min-width: 992px) {
      .ux-split-pane__side {
        display: flex;
        flex-direction: column;
      }
    }

    /* ========================================
       Scroll Utilities
    ======================================== */

    .ux-scroll {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .ux-scroll--x {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .ux-scroll--hidden {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-scroll--hidden::-webkit-scrollbar {
      display: none;
    }

    /* Snap scrolling */
    .ux-scroll--snap-x {
      scroll-snap-type: x mandatory;
    }

    .ux-scroll--snap-y {
      scroll-snap-type: y mandatory;
    }

    .ux-scroll__item--snap {
      scroll-snap-align: start;
    }

    .ux-scroll__item--snap-center {
      scroll-snap-align: center;
    }

    /* ========================================
       Container Utilities
    ======================================== */

    .ux-container {
      width: 100%;
      max-width: var(--ux-container-max-width, 1200px);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--ux-space-lg);
      padding-right: var(--ux-space-lg);
    }

    .ux-container--fluid {
      max-width: none;
    }

    .ux-container--narrow {
      max-width: 680px;
    }

    .ux-container--wide {
      max-width: 1400px;
    }

    /* ========================================
       Section
    ======================================== */

    .ux-section {
      padding: var(--ux-space-xl) 0;
    }

    .ux-section--sm {
      padding: var(--ux-space-lg) 0;
    }

    .ux-section--lg {
      padding: var(--ux-space-2xl) 0;
    }

    .ux-section__header {
      margin-bottom: var(--ux-space-lg);
    }

    .ux-section__title {
      font-size: var(--ux-font-size-xl);
      font-weight: 700;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-sm);
    }

    .ux-section__subtitle {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* ========================================
       Divider
    ======================================== */

    .ux-divider {
      height: 1px;
      background-color: var(--ux-border-color);
      margin: var(--ux-space-md) 0;
    }

    .ux-divider--inset {
      margin-left: var(--ux-space-lg);
      margin-right: var(--ux-space-lg);
    }

    .ux-divider--thick {
      height: 8px;
      background-color: var(--ux-surface-secondary);
    }

    .ux-divider--with-text {
      display: flex;
      align-items: center;
      height: auto;
      background: none;
    }

    .ux-divider--with-text::before,
    .ux-divider--with-text::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--ux-border-color);
    }

    .ux-divider__text {
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Spacer Utilities
    ======================================== */

    .ux-spacer { flex: 1; }
    .ux-spacer-xs { height: var(--ux-space-xs); }
    .ux-spacer-sm { height: var(--ux-space-sm); }
    .ux-spacer-md { height: var(--ux-space-md); }
    .ux-spacer-lg { height: var(--ux-space-lg); }
    .ux-spacer-xl { height: var(--ux-space-xl); }
    .ux-spacer-2xl { height: var(--ux-space-2xl); }

    /* ========================================
       Padding Utilities
    ======================================== */

    .ux-p-0 { padding: 0 !important; }
    .ux-p-xs { padding: var(--ux-space-xs) !important; }
    .ux-p-sm { padding: var(--ux-space-sm) !important; }
    .ux-p-md { padding: var(--ux-space-md) !important; }
    .ux-p-lg { padding: var(--ux-space-lg) !important; }
    .ux-p-xl { padding: var(--ux-space-xl) !important; }

    .ux-px-0 { padding-left: 0 !important; padding-right: 0 !important; }
    .ux-px-xs { padding-left: var(--ux-space-xs) !important; padding-right: var(--ux-space-xs) !important; }
    .ux-px-sm { padding-left: var(--ux-space-sm) !important; padding-right: var(--ux-space-sm) !important; }
    .ux-px-md { padding-left: var(--ux-space-md) !important; padding-right: var(--ux-space-md) !important; }
    .ux-px-lg { padding-left: var(--ux-space-lg) !important; padding-right: var(--ux-space-lg) !important; }
    .ux-px-xl { padding-left: var(--ux-space-xl) !important; padding-right: var(--ux-space-xl) !important; }

    .ux-py-0 { padding-top: 0 !important; padding-bottom: 0 !important; }
    .ux-py-xs { padding-top: var(--ux-space-xs) !important; padding-bottom: var(--ux-space-xs) !important; }
    .ux-py-sm { padding-top: var(--ux-space-sm) !important; padding-bottom: var(--ux-space-sm) !important; }
    .ux-py-md { padding-top: var(--ux-space-md) !important; padding-bottom: var(--ux-space-md) !important; }
    .ux-py-lg { padding-top: var(--ux-space-lg) !important; padding-bottom: var(--ux-space-lg) !important; }
    .ux-py-xl { padding-top: var(--ux-space-xl) !important; padding-bottom: var(--ux-space-xl) !important; }

    /* ========================================
       Margin Utilities
    ======================================== */

    .ux-m-0 { margin: 0 !important; }
    .ux-m-auto { margin: auto !important; }
    .ux-m-xs { margin: var(--ux-space-xs) !important; }
    .ux-m-sm { margin: var(--ux-space-sm) !important; }
    .ux-m-md { margin: var(--ux-space-md) !important; }
    .ux-m-lg { margin: var(--ux-space-lg) !important; }
    .ux-m-xl { margin: var(--ux-space-xl) !important; }

    .ux-mx-auto { margin-left: auto !important; margin-right: auto !important; }
    .ux-my-auto { margin-top: auto !important; margin-bottom: auto !important; }

    .ux-mt-0 { margin-top: 0 !important; }
    .ux-mt-xs { margin-top: var(--ux-space-xs) !important; }
    .ux-mt-sm { margin-top: var(--ux-space-sm) !important; }
    .ux-mt-md { margin-top: var(--ux-space-md) !important; }
    .ux-mt-lg { margin-top: var(--ux-space-lg) !important; }
    .ux-mt-xl { margin-top: var(--ux-space-xl) !important; }

    .ux-mb-0 { margin-bottom: 0 !important; }
    .ux-mb-xs { margin-bottom: var(--ux-space-xs) !important; }
    .ux-mb-sm { margin-bottom: var(--ux-space-sm) !important; }
    .ux-mb-md { margin-bottom: var(--ux-space-md) !important; }
    .ux-mb-lg { margin-bottom: var(--ux-space-lg) !important; }
    .ux-mb-xl { margin-bottom: var(--ux-space-xl) !important; }

    /* ========================================
       Pull to Refresh Target
    ======================================== */

    .ux-content__refresher {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transform: translateY(-100%);
      transition: transform var(--ux-transition-base) var(--ux-ease);
    }

    .ux-content--refreshing .ux-content__refresher {
      transform: translateY(0);
    }

    /* ========================================
       Scroll to Top Button
    ======================================== */

    .ux-scroll-top {
      position: fixed;
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
      right: var(--ux-space-lg);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
      z-index: 100;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-scroll-top--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-scroll-top:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-scroll-top:active {
      transform: scale(0.95);
    }

    .ux-scroll-top__icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text);
    }

    .ux-scroll-top__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-content-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-content-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
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
      const content = document.querySelector('.ux-content');
      if (content) {
        content.scrollTo({
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
