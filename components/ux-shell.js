/**
 * UX Shell Component
 * Layouts de estructura para admin panels
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Shell - CSS Variables
    ======================================== */

    :root {
      --ux-shell-navbar: 56px;
      --ux-shell-toolbar: 48px;
      --ux-shell-sidebar: 250px;
      --ux-shell-sidebar-collapsed: 56px;
      --ux-shell-bottom-nav: 56px;
    }

    /* ========================================
       Base Shell
    ======================================== */

    .ux-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       Shell Navbar
    ======================================== */

    .ux-shell__navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--ux-shell-navbar);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
      gap: var(--ux-space-md);
    }

    .ux-shell__navbar-brand {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-shell__navbar-brand img {
      height: 32px;
      width: auto;
    }

    .ux-shell__navbar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__navbar-toggle:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-shell__navbar-toggle svg {
      width: 24px;
      height: 24px;
    }

    .ux-shell__navbar-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-shell__navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Shell Toolbar
    ======================================== */

    .ux-shell__toolbar {
      position: fixed;
      top: var(--ux-shell-navbar);
      left: 0;
      right: 0;
      height: var(--ux-shell-toolbar);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: calc(var(--ux-z-fixed) - 1);
      gap: var(--ux-space-sm);
    }

    /* Adjust toolbar position when sidebar exists */
    .ux-shell--sidebar .ux-shell__toolbar {
      left: var(--ux-shell-sidebar);
      transition: left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__toolbar {
      left: var(--ux-shell-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-shell--sidebar .ux-shell__toolbar {
        left: 0;
      }
    }

    /* ========================================
       Shell Sidebar
    ======================================== */

    .ux-shell__sidebar {
      position: fixed;
      top: var(--ux-shell-navbar);
      left: 0;
      bottom: 0;
      width: var(--ux-shell-sidebar);
      /* Liquid Glass effect - iOS 26 style */
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-right: 0.5px solid var(--ux-glass-border);
      z-index: var(--ux-z-sticky);
      overflow-y: auto;
      overflow-x: hidden;
      transition:
        width var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease);
      -webkit-overflow-scrolling: touch;
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(10px)) {
      .ux-shell__sidebar {
        background: var(--ux-surface);
        border-right: 1px solid var(--ux-border-color);
      }
    }

    .ux-shell__sidebar-content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .ux-shell__sidebar-nav {
      flex: 1;
      padding: var(--ux-space-sm);
    }

    .ux-shell__sidebar-footer {
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* Collapsed sidebar */
    .ux-shell--collapsed .ux-shell__sidebar {
      width: var(--ux-shell-sidebar-collapsed);
    }

    .ux-shell--collapsed .ux-shell__sidebar-item-text,
    .ux-shell--collapsed .ux-shell__sidebar-section-title,
    .ux-shell--collapsed .ux-shell__sidebar-header {
      opacity: 0;
      visibility: hidden;
    }

    /* Mobile sidebar (drawer) */
    @media (max-width: 767px) {
      .ux-shell__sidebar {
        transform: translateX(-100%);
        width: 280px;
        z-index: calc(var(--ux-z-modal) + 1);
        box-shadow: var(--ux-shadow-xl);
      }

      .ux-shell--sidebar-open .ux-shell__sidebar {
        transform: translateX(0);
      }

      .ux-shell--collapsed .ux-shell__sidebar {
        width: 280px;
      }

      .ux-shell--collapsed .ux-shell__sidebar-item-text,
      .ux-shell--collapsed .ux-shell__sidebar-section-title,
      .ux-shell--collapsed .ux-shell__sidebar-header {
        opacity: 1;
        visibility: visible;
      }
    }

    /* Sidebar backdrop (mobile) */
    .ux-shell__sidebar-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: var(--ux-z-modal);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar-open .ux-shell__sidebar-backdrop {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 768px) {
      .ux-shell__sidebar-backdrop {
        display: none;
      }
    }

    /* Sidebar navigation items */
    .ux-shell__sidebar-section {
      margin-bottom: var(--ux-space-md);
    }

    .ux-shell__sidebar-section-title,
    .ux-shell__sidebar-header {
      padding: var(--ux-space-md) var(--ux-space-md) var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      /* iOS 26: sentence case, not uppercase */
      text-transform: none;
      letter-spacing: normal;
      color: var(--ux-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__sidebar-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-md);
      margin: 2px 0;
      /* iOS 26 style: rounded items */
      border-radius: var(--ux-glass-radius-sm);
      color: var(--ux-text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition:
        background-color var(--ux-transition-fast) var(--ux-spring-smooth),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      cursor: pointer;
    }

    .ux-shell__sidebar-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-shell__sidebar-item:active {
      transform: scale(0.98);
    }

    .ux-shell__sidebar-item--active {
      /* iOS 26 style: glass-like active state */
      background: var(--ux-glass-bg-thick);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.08),
        var(--ux-glass-highlight);
      color: var(--ux-primary);
    }

    .ux-shell__sidebar-item--active:hover {
      background: var(--ux-glass-bg-thick);
      color: var(--ux-primary);
    }

    .ux-shell__sidebar-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .ux-shell__sidebar-item-icon svg {
      width: 20px;
      height: 20px;
    }

    .ux-shell__sidebar-item-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__sidebar-item-badge {
      padding: 2px 8px;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 9999px;
    }

    /* Dark mode sidebar adjustments */
    @media (prefers-color-scheme: dark) {
      .ux-shell__sidebar {
        background: var(--ux-glass-bg);
        border-right-color: var(--ux-glass-border);
      }

      .ux-shell__sidebar-item:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }

      .ux-shell__sidebar-item--active {
        background: var(--ux-glass-bg-thick);
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-shell__sidebar {
      background: var(--ux-glass-bg);
      border-right-color: var(--ux-glass-border);
    }

    .ux-dark .ux-shell__sidebar-item:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-shell__sidebar-item--active {
      background: var(--ux-glass-bg-thick);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Shell Main Content
    ======================================== */

    .ux-shell__main {
      flex: 1;
      margin-top: var(--ux-shell-navbar);
      height: calc(100vh - var(--ux-shell-navbar));
      height: calc(100dvh - var(--ux-shell-navbar));
      overflow: hidden;
      background-color: var(--ux-surface-secondary);
    }

    /* With toolbar */
    .ux-shell--toolbar .ux-shell__main {
      margin-top: calc(var(--ux-shell-navbar) + var(--ux-shell-toolbar));
      height: calc(100vh - var(--ux-shell-navbar) - var(--ux-shell-toolbar));
      height: calc(100dvh - var(--ux-shell-navbar) - var(--ux-shell-toolbar));
    }

    /* With sidebar */
    .ux-shell--sidebar .ux-shell__main {
      margin-left: var(--ux-shell-sidebar);
      transition: margin-left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__main {
      margin-left: var(--ux-shell-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-shell--sidebar .ux-shell__main {
        margin-left: 0;
      }
    }

    /* With bottom nav (mobile) */
    @media (max-width: 767px) {
      .ux-shell--bottom-nav .ux-shell__main {
        height: calc(100vh - var(--ux-shell-navbar) - var(--ux-shell-bottom-nav));
        height: calc(100dvh - var(--ux-shell-navbar) - var(--ux-shell-bottom-nav));
      }
    }

    /* ========================================
       Shell Bottom Navigation
    ======================================== */

    .ux-shell__bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--ux-shell-bottom-nav);
      padding-bottom: var(--ux-safe-bottom);
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
    }

    @media (min-width: 768px) {
      .ux-shell__bottom-nav {
        display: none;
      }
    }

    .ux-shell__bottom-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      padding: var(--ux-space-xs) 0;
      color: var(--ux-text-tertiary);
      text-decoration: none;
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-shell__bottom-nav-item:hover,
    .ux-shell__bottom-nav-item--active {
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-shell__bottom-nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2px;
    }

    .ux-shell__bottom-nav-item-icon svg {
      width: 24px;
      height: 24px;
    }

    .ux-shell__bottom-nav-item-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    /* ========================================
       Shell Layouts
    ======================================== */

    /* Layout: Sidebar (navbar + collapsible sidebar) */
    .ux-shell-sidebar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Toolbar (navbar + toolbar) */
    .ux-shell-toolbar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Simple (navbar only) */
    .ux-shell-simple {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* ========================================
       Shell Section (scrollable content areas)
    ======================================== */

    .ux-shell__section {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* ========================================
       Alpine Transitions
    ======================================== */

    [x-cloak] {
      display: none !important;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-shell-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-shell-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for shell with sidebar
  const shellComponent = (config = {}) => ({
    sidebarOpen: false,
    sidebarCollapsed: config.collapsed || false,
    isMobile: window.innerWidth < 768,
    _resizeHandler: null,
    _keydownHandler: null,

    init() {
      // Set initial state based on screen size
      this.checkMobile();

      // Store handler references for cleanup
      this._resizeHandler = this.checkMobile.bind(this);
      this._keydownHandler = (e) => {
        if (e.key === 'Escape' && this.sidebarOpen && this.isMobile) {
          this.closeSidebar();
        }
      };

      // Listen for resize
      window.addEventListener('resize', this._resizeHandler);

      // Close sidebar on escape key
      document.addEventListener('keydown', this._keydownHandler);
    },

    destroy() {
      // Clean up event listeners to prevent memory leaks
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
        this._resizeHandler = null;
      }
      if (this._keydownHandler) {
        document.removeEventListener('keydown', this._keydownHandler);
        this._keydownHandler = null;
      }
      // Restore body overflow if sidebar was open
      if (this.sidebarOpen) {
        document.body.style.overflow = '';
      }
    },

    checkMobile() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;

      // Auto-close sidebar when switching to mobile
      if (!wasMobile && this.isMobile) {
        this.sidebarOpen = false;
      }
    },

    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = !this.sidebarOpen;
        if (this.sidebarOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      } else {
        this.sidebarCollapsed = !this.sidebarCollapsed;
      }
    },

    openSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = true;
        document.body.style.overflow = 'hidden';
      }
    },

    closeSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = false;
        document.body.style.overflow = '';
      }
    },

    collapseSidebar() {
      if (!this.isMobile) {
        this.sidebarCollapsed = true;
      }
    },

    expandSidebar() {
      if (!this.isMobile) {
        this.sidebarCollapsed = false;
      }
    },

    get shellClasses() {
      return {
        'ux-shell--sidebar': true,
        'ux-shell--sidebar-open': this.sidebarOpen,
        'ux-shell--collapsed': this.sidebarCollapsed && !this.isMobile
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxShell', shellComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxShell', shellComponent);
    });
  }
})();
