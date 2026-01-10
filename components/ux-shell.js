/**
 * UX Shell - Application Shell Layouts
 * Provides navbar, sidebar, toolbar, and bottom navigation
 * @version 1.0.0
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Shell - Application Layout System
    ======================================== */

    .ux-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      background: var(--ux-background);
    }

    /* Navbar */
    .ux-shell__navbar {
      position: sticky;
      top: 0;
      z-index: var(--ux-z-sticky);
      display: flex;
      align-items: center;
      height: var(--ux-toolbar-height);
      padding: 0 var(--ux-space-lg);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      gap: var(--ux-space-md);
    }

    .ux-shell__navbar-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ux-text);
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      transition: background var(--ux-transition-fast);
    }

    .ux-shell__navbar-toggle:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-shell__navbar-toggle svg {
      width: 20px;
      height: 20px;
    }

    .ux-shell__navbar-brand {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-shell__navbar-content {
      flex: 1;
    }

    .ux-shell__navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* Sidebar */
    .ux-shell--sidebar {
      --ux-shell-sidebar-width: 260px;
      --ux-shell-sidebar-collapsed-width: 60px;
    }

    .ux-shell--sidebar .ux-shell__navbar-toggle {
      display: flex;
    }

    .ux-shell__sidebar {
      position: fixed;
      top: var(--ux-toolbar-height);
      left: 0;
      bottom: 0;
      width: var(--ux-shell-sidebar-width);
      background: var(--ux-surface);
      border-right: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-fixed);
      overflow-y: auto;
      overflow-x: hidden;
      transition: width var(--ux-transition-normal) var(--ux-ease-ios),
                  transform var(--ux-transition-normal) var(--ux-ease-ios);
    }

    .ux-shell--sidebar-collapsed .ux-shell__sidebar {
      width: var(--ux-shell-sidebar-collapsed-width);
    }

    .ux-shell__sidebar-nav {
      padding: var(--ux-space-sm) 0;
    }

    .ux-shell__sidebar-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      color: var(--ux-text-secondary);
      text-decoration: none;
      transition: background var(--ux-transition-fast), color var(--ux-transition-fast);
      white-space: nowrap;
      overflow: hidden;
    }

    .ux-shell__sidebar-item:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-shell__sidebar-item--active {
      color: var(--ux-primary);
      background: rgba(var(--ux-primary-rgb), 0.1);
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
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-shell--sidebar-collapsed .ux-shell__sidebar-item-text {
      opacity: 0;
      visibility: hidden;
    }

    /* Sidebar Backdrop (mobile) */
    .ux-shell__sidebar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: var(--ux-backdrop-color);
      z-index: calc(var(--ux-z-fixed) - 1);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-normal), visibility var(--ux-transition-normal);
    }

    /* Main Content */
    .ux-shell__main {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .ux-shell--sidebar .ux-shell__main {
      margin-left: var(--ux-shell-sidebar-width);
      transition: margin-left var(--ux-transition-normal) var(--ux-ease-ios);
    }

    .ux-shell--sidebar-collapsed .ux-shell__main {
      margin-left: var(--ux-shell-sidebar-collapsed-width);
    }

    /* Toolbar */
    .ux-shell__toolbar {
      display: flex;
      align-items: center;
      height: var(--ux-toolbar-height);
      padding: 0 var(--ux-space-lg);
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      gap: var(--ux-space-md);
    }

    .ux-shell--toolbar .ux-shell__main {
      padding-top: 0;
    }

    /* Bottom Navigation */
    .ux-shell__bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: calc(50px + var(--ux-safe-bottom));
      padding-bottom: var(--ux-safe-bottom);
      background: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      z-index: var(--ux-z-sticky);
    }

    .ux-shell__bottom-nav-items {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 50px;
    }

    .ux-shell__bottom-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: var(--ux-space-xs);
      color: var(--ux-text-secondary);
      text-decoration: none;
      font-size: 10px;
      min-width: 64px;
    }

    .ux-shell__bottom-nav-item--active {
      color: var(--ux-primary);
    }

    .ux-shell__bottom-nav-item svg {
      width: 24px;
      height: 24px;
    }

    /* Mobile Responsive */
    @media (max-width: 767px) {
      .ux-shell--sidebar .ux-shell__sidebar {
        transform: translateX(-100%);
        width: var(--ux-shell-sidebar-width);
      }

      .ux-shell--sidebar-open .ux-shell__sidebar {
        transform: translateX(0);
      }

      .ux-shell--sidebar .ux-shell__sidebar-backdrop {
        display: block;
      }

      .ux-shell--sidebar-open .ux-shell__sidebar-backdrop {
        opacity: 1;
        visibility: visible;
      }

      .ux-shell--sidebar .ux-shell__main,
      .ux-shell--sidebar-collapsed .ux-shell__main {
        margin-left: 0;
      }

      .ux-shell__bottom-nav {
        display: block;
      }

      .ux-shell--bottom-nav .ux-shell__main {
        padding-bottom: calc(50px + var(--ux-safe-bottom));
      }
    }

    /* Glass Variant */
    .ux-shell--glass .ux-shell__navbar,
    .ux-shell--glass .ux-shell__sidebar,
    .ux-shell--glass .ux-shell__toolbar,
    .ux-shell--glass .ux-shell__bottom-nav {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* Dark Mode */
    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-shell--glass .ux-shell__navbar,
      :root:not(.ux-light) .ux-shell--glass .ux-shell__sidebar,
      :root:not(.ux-light) .ux-shell--glass .ux-shell__toolbar,
      :root:not(.ux-light) .ux-shell--glass .ux-shell__bottom-nav {
        background: var(--ux-glass-bg);
      }
    }

    .ux-dark .ux-shell--glass .ux-shell__navbar,
    .ux-dark .ux-shell--glass .ux-shell__sidebar,
    .ux-dark .ux-shell--glass .ux-shell__toolbar,
    .ux-dark .ux-shell--glass .ux-shell__bottom-nav {
      background: var(--ux-glass-bg);
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

  // Alpine.js Shell component
  const shellData = (options = {}) => ({
    sidebarOpen: false,
    sidebarCollapsed: options.collapsed ?? false,
    breakpoint: options.breakpoint ?? 768,

    init() {
      this.checkViewport();
      window.addEventListener('resize', () => this.checkViewport());
    },

    get shellClasses() {
      return {
        'ux-shell--sidebar-open': this.sidebarOpen,
        'ux-shell--sidebar-collapsed': this.sidebarCollapsed && window.innerWidth >= this.breakpoint
      };
    },

    checkViewport() {
      if (window.innerWidth >= this.breakpoint) {
        this.sidebarOpen = false;
        window.UX?.unlockScroll?.();
      }
    },

    toggleSidebar() {
      if (window.innerWidth < this.breakpoint) {
        this.sidebarOpen = !this.sidebarOpen;
        if (this.sidebarOpen) {
          window.UX?.lockScroll?.();
        } else {
          window.UX?.unlockScroll?.();
        }
      } else {
        this.sidebarCollapsed = !this.sidebarCollapsed;
      }
    },

    openSidebar() {
      if (window.innerWidth < this.breakpoint) {
        this.sidebarOpen = true;
        window.UX?.lockScroll?.();
      }
    },

    closeSidebar() {
      this.sidebarOpen = false;
      window.UX?.unlockScroll?.();
    },

    collapseSidebar() {
      this.sidebarCollapsed = true;
    },

    expandSidebar() {
      this.sidebarCollapsed = false;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxShell', shellData);
  }

})();
