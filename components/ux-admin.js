/**
 * UX Admin Layout
 * Panel administrativo con navbar, sidebar colapsable y bottom nav
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Admin - CSS Variables
    ======================================== */

    :root {
      --ux-admin-navbar-height: 3.5rem;      /* 56px */
      --ux-admin-toolbar-height: 3rem;       /* 48px */
      --ux-admin-sidebar-width: 15.625rem;   /* 250px */
      --ux-admin-sidebar-collapsed: 3.5rem;  /* 56px */
      --ux-admin-bottom-nav-height: 3.5rem;  /* 56px */

      /* Backward compatibility aliases */
      --ux-shell-navbar: var(--ux-admin-navbar-height);
      --ux-shell-toolbar: var(--ux-admin-toolbar-height);
      --ux-shell-sidebar: var(--ux-admin-sidebar-width);
      --ux-shell-sidebar-collapsed: var(--ux-admin-sidebar-collapsed);
      --ux-shell-bottom-nav: var(--ux-admin-bottom-nav-height);
    }

    /* ========================================
       Base Admin Layout
    ======================================== */

    .ux-admin {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* Backward compatibility alias */
    .ux-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background-color: var(--ux-background);
    }

    /* ========================================
       Admin Navbar
    ======================================== */

    .ux-admin__navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--ux-admin-navbar-height);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
      gap: var(--ux-space-md);
    }

    /* Backward compatibility alias */
    .ux-shell__navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--ux-admin-navbar-height);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
      gap: var(--ux-space-md);
    }

    .ux-admin__navbar-brand,
    .ux-shell__navbar-brand {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-admin__navbar-brand img,
    .ux-shell__navbar-brand img {
      height: 2rem;
      width: auto;
    }

    .ux-admin__navbar-toggle,
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

    .ux-admin__navbar-toggle:hover,
    .ux-shell__navbar-toggle:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-admin__navbar-toggle svg,
    .ux-shell__navbar-toggle svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .ux-admin__navbar-content,
    .ux-shell__navbar-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-admin__navbar-actions,
    .ux-shell__navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Admin Toolbar
    ======================================== */

    .ux-admin__toolbar,
    .ux-shell__toolbar {
      position: fixed;
      top: var(--ux-admin-navbar-height);
      left: 0;
      right: 0;
      height: var(--ux-admin-toolbar-height);
      display: flex;
      align-items: center;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      z-index: calc(var(--ux-z-fixed) - 1);
      gap: var(--ux-space-sm);
    }

    /* Adjust toolbar position when sidebar exists */
    .ux-admin--sidebar .ux-admin__toolbar,
    .ux-shell--sidebar .ux-shell__toolbar {
      left: var(--ux-admin-sidebar-width);
      transition: left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-admin--sidebar.ux-admin--collapsed .ux-admin__toolbar,
    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__toolbar {
      left: var(--ux-admin-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-admin--sidebar .ux-admin__toolbar,
      .ux-shell--sidebar .ux-shell__toolbar {
        left: 0;
      }
    }

    /* ========================================
       Admin Sidebar
    ======================================== */

    .ux-admin__sidebar,
    .ux-shell__sidebar {
      position: fixed;
      top: var(--ux-admin-navbar-height);
      left: 0;
      bottom: 0;
      width: var(--ux-admin-sidebar-width);
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
      .ux-admin__sidebar,
      .ux-shell__sidebar {
        background: var(--ux-surface);
        border-right: 1px solid var(--ux-border-color);
      }
    }

    .ux-admin__sidebar-content,
    .ux-shell__sidebar-content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .ux-admin__sidebar-nav,
    .ux-shell__sidebar-nav {
      flex: 1;
      padding: var(--ux-space-sm);
    }

    .ux-admin__sidebar-footer,
    .ux-shell__sidebar-footer {
      padding: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    /* Collapsed sidebar */
    .ux-admin--collapsed .ux-admin__sidebar,
    .ux-shell--collapsed .ux-shell__sidebar {
      width: var(--ux-admin-sidebar-collapsed);
    }

    .ux-admin--collapsed .ux-admin__sidebar-item-text,
    .ux-admin--collapsed .ux-admin__sidebar-section-title,
    .ux-admin--collapsed .ux-admin__sidebar-header,
    .ux-shell--collapsed .ux-shell__sidebar-item-text,
    .ux-shell--collapsed .ux-shell__sidebar-section-title,
    .ux-shell--collapsed .ux-shell__sidebar-header {
      opacity: 0;
      visibility: hidden;
    }

    /* Mobile sidebar (drawer) */
    @media (max-width: 767px) {
      .ux-admin__sidebar,
      .ux-shell__sidebar {
        transform: translateX(-100%);
        width: 17.5rem;
        z-index: calc(var(--ux-z-modal) + 1);
        box-shadow: var(--ux-shadow-xl);
      }

      .ux-admin--sidebar-open .ux-admin__sidebar,
      .ux-shell--sidebar-open .ux-shell__sidebar {
        transform: translateX(0);
      }

      .ux-admin--collapsed .ux-admin__sidebar,
      .ux-shell--collapsed .ux-shell__sidebar {
        width: 17.5rem;
      }

      .ux-admin--collapsed .ux-admin__sidebar-item-text,
      .ux-admin--collapsed .ux-admin__sidebar-section-title,
      .ux-admin--collapsed .ux-admin__sidebar-header,
      .ux-shell--collapsed .ux-shell__sidebar-item-text,
      .ux-shell--collapsed .ux-shell__sidebar-section-title,
      .ux-shell--collapsed .ux-shell__sidebar-header {
        opacity: 1;
        visibility: visible;
      }
    }

    /* Sidebar backdrop (mobile) */
    .ux-admin__sidebar-backdrop,
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

    .ux-admin--sidebar-open .ux-admin__sidebar-backdrop,
    .ux-shell--sidebar-open .ux-shell__sidebar-backdrop {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 768px) {
      .ux-admin__sidebar-backdrop,
      .ux-shell__sidebar-backdrop {
        display: none;
      }
    }

    /* Sidebar navigation items */
    .ux-admin__sidebar-section,
    .ux-shell__sidebar-section {
      margin-bottom: var(--ux-space-md);
    }

    .ux-admin__sidebar-section-title,
    .ux-admin__sidebar-header,
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

    .ux-admin__sidebar-item,
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

    .ux-admin__sidebar-item:hover,
    .ux-shell__sidebar-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-admin__sidebar-item:active,
    .ux-shell__sidebar-item:active {
      transform: scale(0.98);
    }

    .ux-admin__sidebar-item--active,
    .ux-shell__sidebar-item--active {
      /* iOS 26 style: glass-like active state */
      background: var(--ux-glass-bg-thick);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.08),
        var(--ux-glass-highlight);
      color: var(--ux-primary);
    }

    .ux-admin__sidebar-item--active:hover,
    .ux-shell__sidebar-item--active:hover {
      background: var(--ux-glass-bg-thick);
      color: var(--ux-primary);
    }

    .ux-admin__sidebar-item-icon,
    .ux-shell__sidebar-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }

    .ux-admin__sidebar-item-icon svg,
    .ux-shell__sidebar-item-icon svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    .ux-admin__sidebar-item-text,
    .ux-shell__sidebar-item-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-admin__sidebar-item-badge,
    .ux-shell__sidebar-item-badge {
      padding: 2px 0.5rem;
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 9999px;
    }

    /* Dark mode sidebar adjustments */
    @media (prefers-color-scheme: dark) {
      .ux-admin__sidebar,
      .ux-shell__sidebar {
        background: var(--ux-glass-bg);
        border-right-color: var(--ux-glass-border);
      }

      .ux-admin__sidebar-item:hover,
      .ux-shell__sidebar-item:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }

      .ux-admin__sidebar-item--active,
      .ux-shell__sidebar-item--active {
        background: var(--ux-glass-bg-thick);
        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-admin__sidebar,
    .ux-dark .ux-shell__sidebar {
      background: var(--ux-glass-bg);
      border-right-color: var(--ux-glass-border);
    }

    .ux-dark .ux-admin__sidebar-item:hover,
    .ux-dark .ux-shell__sidebar-item:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-admin__sidebar-item--active,
    .ux-dark .ux-shell__sidebar-item--active {
      background: var(--ux-glass-bg-thick);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Admin Main Content
    ======================================== */

    .ux-admin__main,
    .ux-shell__main {
      flex: 1;
      margin-top: var(--ux-admin-navbar-height);
      height: calc(100vh - var(--ux-admin-navbar-height));
      height: calc(100dvh - var(--ux-admin-navbar-height));
      overflow: hidden;
      background-color: var(--ux-surface-secondary);
    }

    /* With toolbar */
    .ux-admin--toolbar .ux-admin__main,
    .ux-shell--toolbar .ux-shell__main {
      margin-top: calc(var(--ux-admin-navbar-height) + var(--ux-admin-toolbar-height));
      height: calc(100vh - var(--ux-admin-navbar-height) - var(--ux-admin-toolbar-height));
      height: calc(100dvh - var(--ux-admin-navbar-height) - var(--ux-admin-toolbar-height));
    }

    /* With sidebar */
    .ux-admin--sidebar .ux-admin__main,
    .ux-shell--sidebar .ux-shell__main {
      margin-left: var(--ux-admin-sidebar-width);
      transition: margin-left var(--ux-transition-base) var(--ux-ease);
    }

    .ux-admin--sidebar.ux-admin--collapsed .ux-admin__main,
    .ux-shell--sidebar.ux-shell--collapsed .ux-shell__main {
      margin-left: var(--ux-admin-sidebar-collapsed);
    }

    @media (max-width: 767px) {
      .ux-admin--sidebar .ux-admin__main,
      .ux-shell--sidebar .ux-shell__main {
        margin-left: 0;
      }
    }

    /* With bottom nav (mobile) */
    .ux-admin--bottom-nav .ux-admin__main,
    .ux-shell--bottom-nav .ux-shell__main {
      padding-bottom: var(--ux-admin-bottom-nav-height);
    }

    @media (min-width: 768px) {
      .ux-admin--bottom-nav .ux-admin__main,
      .ux-shell--bottom-nav .ux-shell__main {
        padding-bottom: 0;
      }
    }

    /* ========================================
       Admin Bottom Navigation
    ======================================== */

    .ux-admin__bottom-nav,
    .ux-shell__bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--ux-admin-bottom-nav-height);
      padding-bottom: var(--ux-safe-bottom);
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
    }

    @media (min-width: 768px) {
      .ux-admin__bottom-nav,
      .ux-shell__bottom-nav {
        display: none;
      }
    }

    .ux-admin__bottom-nav-item,
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

    .ux-admin__bottom-nav-item:hover,
    .ux-admin__bottom-nav-item--active,
    .ux-shell__bottom-nav-item:hover,
    .ux-shell__bottom-nav-item--active {
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-admin__bottom-nav-item-icon,
    .ux-shell__bottom-nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2px;
    }

    .ux-admin__bottom-nav-item-icon svg,
    .ux-shell__bottom-nav-item-icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .ux-admin__bottom-nav-item-label,
    .ux-shell__bottom-nav-item-label {
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
    }

    /* ========================================
       Admin Layouts
    ======================================== */

    /* Layout: Sidebar (navbar + collapsible sidebar) */
    .ux-admin-sidebar,
    .ux-shell-sidebar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Toolbar (navbar + toolbar) */
    .ux-admin-toolbar,
    .ux-shell-toolbar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* Layout: Simple (navbar only) */
    .ux-admin-simple,
    .ux-shell-simple {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }

    /* ========================================
       Admin Section (scrollable content areas)
    ======================================== */

    .ux-admin__section,
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
    window.UX.injectStyles('ux-admin-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-admin-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for admin with sidebar
  const adminComponent = (config = {}) => ({
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

    get adminClasses() {
      return {
        'ux-admin--sidebar': true,
        'ux-admin--sidebar-open': this.sidebarOpen,
        'ux-admin--collapsed': this.sidebarCollapsed && !this.isMobile
      };
    },

    // Backward compatibility alias
    get shellClasses() {
      return {
        'ux-shell--sidebar': true,
        'ux-shell--sidebar-open': this.sidebarOpen,
        'ux-shell--collapsed': this.sidebarCollapsed && !this.isMobile
      };
    }
  });

  // Register component with both new and old names
  if (window.UX) {
    window.UX.registerComponent('uxAdmin', adminComponent);
    window.UX.registerComponent('uxShell', adminComponent); // Backward compatibility
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAdmin', adminComponent);
      Alpine.data('uxShell', adminComponent); // Backward compatibility
    });
  }
})();
