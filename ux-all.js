/**
 * UX Library - All Components Bundle
 * Version: 1.0.0
 *
 * This file loads all UX components.
 * For production, consider loading only the components you need.
 *
 * Usage:
 * <script src="ux-all.js"></script>
 *
 * Or load individual components:
 * <script src="components/ux-core.js"></script>
 * <script src="components/ux-button.js"></script>
 *
 * @requires Alpine.js (optional, for interactive components)
 */

(function() {
  'use strict';

  // List of all component files in load order
  const components = [
    // Core (must be first)
    'ux-core',

    // Basic components (CSS only)
    'ux-button',
    'ux-badge',
    'ux-chip',
    'ux-spinner',
    'ux-progress',
    'ux-avatar',
    'ux-img',

    // Form components
    'ux-input',
    'ux-toggle',
    'ux-checkbox',
    'ux-radio',
    'ux-range',
    'ux-select',
    'ux-searchbar',
    'ux-textarea',

    // Layout components
    'ux-card',
    'ux-list',
    'ux-scroll',      // Renamed from ux-content (backward compatible)
    'ux-screen',      // New: iOS-style screen layout
    'ux-page-header',

    // Navigation components
    'ux-navbar',
    'ux-toolbar',
    'ux-tabs',
    'ux-segment',
    'ux-breadcrumbs',
    'ux-menu',
    'ux-back-button',

    // Overlay components
    'ux-modal',
    'ux-sheet',
    'ux-alert',
    'ux-toast',
    'ux-popover',
    'ux-loading',
    'ux-picker',

    // Feedback components
    'ux-skeleton',
    'ux-fab',

    // Interactive components
    'ux-accordion',
    'ux-datetime',
    'ux-infinite-scroll',
    'ux-refresher',
    'ux-reorder',
    'ux-rating',
    'ux-datatable',

    // Gesture directives
    'ux-swipe',
    'ux-carousel',

    // Admin/Layout components
    'ux-admin',       // Renamed from ux-shell (backward compatible)
    'ux-website',     // New: Traditional website layout
    'ux-panel',

    // PWA / Offline support
    'ux-pwa'
  ];

  // Get the base path from the current script
  const getCurrentScriptPath = () => {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const src = currentScript.src;
    return src.substring(0, src.lastIndexOf('/') + 1);
  };

  const basePath = getCurrentScriptPath();
  const componentsPath = basePath + 'components/';

  // Load all components
  const loadComponents = () => {
    components.forEach((component, index) => {
      const script = document.createElement('script');
      script.src = componentsPath + component + '.js';
      script.async = false; // Maintain order
      document.head.appendChild(script);
    });
  };

  // Check if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }

  // Export component list for reference
  window.UX_COMPONENTS = components;
})();
