/**
 * UX Navbar Component
 * Barra de navegación estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Navbar
    ======================================== */

    .ux-navbar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: 0 var(--ux-space-sm);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-base);
    }

    /* Safe area support */
    .ux-navbar--safe-area {
      padding-top: env(safe-area-inset-top);
    }

    /* ========================================
       Navbar Variants
    ======================================== */

    /* Translucent (iOS style - uses Liquid Glass variables) */
    .ux-navbar--translucent {
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    /* Glass (iOS 26 Liquid Glass style) */
    .ux-navbar--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-bottom: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-navbar--translucent,
      .ux-navbar--glass {
        background-color: var(--ux-surface);
      }
    }

    /* Transparent */
    .ux-navbar--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    /* Colored */
    .ux-navbar--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .ux-navbar--primary .ux-navbar__title,
    .ux-navbar--primary .ux-navbar__button {
      color: var(--ux-primary-contrast);
    }

    .ux-navbar--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .ux-navbar--dark .ux-navbar__title,
    .ux-navbar--dark .ux-navbar__button {
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Navbar Content Wrapper
    ======================================== */

    .ux-navbar__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: inherit;
      position: relative;
    }

    /* ========================================
       Navbar Slots (3-slot layout like Ionic)
    ======================================== */

    .ux-navbar__start {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      min-width: 60px;
      z-index: 1;
    }

    .ux-navbar__center {
      position: absolute;
      left: var(--ux-touch-target);
      right: var(--ux-touch-target);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      max-width: calc(100% - var(--ux-touch-target) * 2 - var(--ux-space-md) * 2);
      margin: 0 auto;
    }

    .ux-navbar__center > * {
      pointer-events: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }

    .ux-navbar__end {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      min-width: 60px;
      z-index: 1;
    }

    /* Empty slots still take space */
    .ux-navbar__start:empty,
    .ux-navbar__end:empty {
      min-width: 60px;
    }

    /* Alternative layout (no absolute center, title left-aligned) */
    .ux-navbar--stacked .ux-navbar__center {
      position: static;
      flex: 1;
      justify-content: flex-start;
      padding: 0 var(--ux-space-md);
      pointer-events: auto;
    }

    /* ========================================
       Navbar Title
    ======================================== */

    .ux-navbar__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    .ux-navbar__title--large {
      font-size: var(--ux-font-size-2xl);
    }

    .ux-navbar__subtitle {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    /* ========================================
       Navbar Buttons
    ======================================== */

    .ux-navbar__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-touch-target);
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: var(--ux-border-radius);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-navbar__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-navbar__button:active {
      opacity: 0.7;
    }

    .ux-navbar__button--icon {
      padding: var(--ux-space-xs);
    }

    .ux-navbar__button-icon {
      width: 24px;
      height: 24px;
    }

    .ux-navbar__button-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-navbar__button-text {
      padding: 0 var(--ux-space-xs);
    }

    /* Back button */
    .ux-navbar__back {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .ux-navbar__back-icon {
      width: 24px;
      height: 24px;
    }

    .ux-navbar__back-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-navbar__back-text {
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Large Title (iOS style)
    ======================================== */

    .ux-navbar--large-title {
      flex-direction: column;
      align-items: stretch;
      min-height: auto;
    }

    .ux-navbar--large-title .ux-navbar__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: var(--ux-space-sm);
    }

    .ux-navbar--large-title .ux-navbar__large-title {
      padding: 0 var(--ux-space-lg) var(--ux-space-md);
    }

    .ux-navbar__large-title h1 {
      font-size: 34px;
      font-weight: 700;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.2;
    }

    /* Collapsible large title */
    .ux-navbar--collapsible .ux-navbar__large-title {
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        height var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-navbar--collapsed .ux-navbar__large-title {
      opacity: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
    }

    .ux-navbar--collapsed .ux-navbar__center {
      opacity: 1;
    }

    .ux-navbar--collapsible .ux-navbar__center {
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    /* ========================================
       Searchbar in Navbar
    ======================================== */

    .ux-navbar__searchbar {
      padding: 0 var(--ux-space-md) var(--ux-space-sm);
    }

    .ux-navbar--large-title .ux-navbar__searchbar {
      padding-top: 0;
    }

    /* ========================================
       Navbar Progress
    ======================================== */

    .ux-navbar__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--ux-light);
    }

    .ux-navbar__progress-bar {
      height: 100%;
      background-color: var(--ux-primary);
      transition: width var(--ux-transition-base) var(--ux-ease);
    }

    /* ========================================
       Navbar with Tabs
    ======================================== */

    .ux-navbar__tabs {
      display: flex;
      padding: 0 var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Fixed/Sticky Navbar
    ======================================== */

    .ux-navbar--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-fixed);
    }

    .ux-navbar--sticky {
      position: sticky;
      top: 0;
      z-index: var(--ux-z-sticky);
    }

    /* ========================================
       Navbar Shadow (on scroll)
    ======================================== */

    .ux-navbar--shadow {
      box-shadow: var(--ux-shadow-sm);
      border-bottom-color: transparent;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-navbar--sm {
      min-height: 44px;
    }

    .ux-navbar--sm .ux-navbar__title {
      font-size: var(--ux-font-size-md);
    }

    .ux-navbar--lg {
      min-height: 64px;
    }

    .ux-navbar--lg .ux-navbar__title {
      font-size: var(--ux-font-size-xl);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-navbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-navbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for collapsible navbar
  const navbarComponent = (config = {}) => ({
    collapsed: false,
    showShadow: false,
    scrollThreshold: config.scrollThreshold || 100,

    handleScroll(scrollTop) {
      this.collapsed = scrollTop > this.scrollThreshold;
      this.showShadow = scrollTop > 0;
    },

    goBack() {
      window.history.back();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxNavbar', navbarComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxNavbar', navbarComponent);
    });
  }
})();
