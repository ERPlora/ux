/**
 * UX Breadcrumbs Component
 * Migas de pan para navegación
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Breadcrumbs
    ======================================== */

    .ux-breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) 0;
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Breadcrumb Item
    ======================================== */

    .ux-breadcrumb {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-breadcrumb__link {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      color: var(--ux-primary);
      text-decoration: none;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border-radius: var(--ux-border-radius-sm);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-breadcrumb__link:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-breadcrumb__link:active {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-breadcrumb--current .ux-breadcrumb__link {
      color: var(--ux-text);
      pointer-events: none;
    }

    .ux-breadcrumb--disabled .ux-breadcrumb__link {
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* ========================================
       Breadcrumb Icon
    ======================================== */

    .ux-breadcrumb__icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .ux-breadcrumb__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Separator
    ======================================== */

    .ux-breadcrumb__separator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-breadcrumb__separator svg {
      width: 100%;
      height: 100%;
    }

    /* Different separator styles */
    .ux-breadcrumbs--slash .ux-breadcrumb__separator::before {
      content: '/';
    }

    .ux-breadcrumbs--arrow .ux-breadcrumb__separator::before {
      content: '›';
      font-size: var(--ux-font-size-lg);
    }

    .ux-breadcrumbs--dot .ux-breadcrumb__separator::before {
      content: '•';
    }

    /* ========================================
       Collapsed Breadcrumbs
    ======================================== */

    .ux-breadcrumb--collapsed {
      display: inline-flex;
    }

    .ux-breadcrumb__ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-breadcrumb__ellipsis:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* Dropdown for collapsed items */
    .ux-breadcrumb__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 160px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      padding: var(--ux-space-xs) 0;
      z-index: 100;
    }

    .ux-breadcrumb__dropdown-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      color: var(--ux-text);
      text-decoration: none;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-breadcrumb__dropdown-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Variants
    ======================================== */

    /* Contained */
    .ux-breadcrumbs--contained {
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* Outlined */
    .ux-breadcrumbs--outlined {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-breadcrumbs--sm {
      font-size: var(--ux-font-size-xs);
      gap: 2px;
    }

    .ux-breadcrumbs--sm .ux-breadcrumb__link {
      padding: 2px var(--ux-space-xs);
    }

    .ux-breadcrumbs--sm .ux-breadcrumb__icon,
    .ux-breadcrumbs--sm .ux-breadcrumb__separator {
      width: 12px;
      height: 12px;
    }

    .ux-breadcrumbs--lg {
      font-size: var(--ux-font-size-md);
    }

    .ux-breadcrumbs--lg .ux-breadcrumb__link {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-breadcrumbs--lg .ux-breadcrumb__icon,
    .ux-breadcrumbs--lg .ux-breadcrumb__separator {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-breadcrumbs--responsive .ux-breadcrumb:not(:last-child):not(:first-child) {
        display: none;
      }

      .ux-breadcrumbs--responsive .ux-breadcrumb--show-mobile {
        display: inline-flex;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-breadcrumbs-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-breadcrumbs-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for collapsible breadcrumbs
  const breadcrumbsComponent = (config = {}) => ({
    items: config.items || [],
    maxItems: config.maxItems || 4,
    collapsed: true,
    dropdownOpen: false,

    get visibleItems() {
      if (!this.collapsed || this.items.length <= this.maxItems) {
        return this.items;
      }

      // Show first, ellipsis, and last two
      return [
        this.items[0],
        { type: 'ellipsis' },
        ...this.items.slice(-2)
      ];
    },

    get collapsedItems() {
      if (this.items.length <= this.maxItems) return [];
      return this.items.slice(1, -2);
    },

    expand() {
      this.collapsed = false;
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    closeDropdown() {
      this.dropdownOpen = false;
    },

    isLast(index) {
      return index === this.visibleItems.length - 1;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBreadcrumbs', breadcrumbsComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxBreadcrumbs', breadcrumbsComponent);
    });
  }
})();
