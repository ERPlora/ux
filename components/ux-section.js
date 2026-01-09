/**
 * UX Section Component
 * Content sections with header, description, actions, and collapsible functionality
 * iOS 26 Liquid Glass design
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Section
       Content sections for organizing page content
    ======================================== */

    :root {
      /* Section Tokens */
      --ux-section-padding: var(--ux-space-lg);
      --ux-section-padding-compact: var(--ux-space-md);
      --ux-section-gap: var(--ux-space-md);
      --ux-section-border-radius: var(--ux-border-radius-lg);
      --ux-section-header-gap: var(--ux-space-sm);
      --ux-section-margin-y: var(--ux-space-lg);
      --ux-section-inset-margin-x: var(--ux-space-lg);
    }

    .ux-section {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: var(--ux-section-margin-y) 0;
    }

    .ux-section:first-child {
      margin-top: 0;
    }

    .ux-section:last-child {
      margin-bottom: 0;
    }

    /* ========================================
       Section Header
    ======================================== */

    .ux-section__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-section-padding);
      padding-bottom: var(--ux-space-sm);
    }

    .ux-section__header-content {
      display: flex;
      flex-direction: column;
      gap: var(--ux-section-header-gap);
      flex: 1;
      min-width: 0;
    }

    .ux-section__title {
      margin: 0;
      font-size: var(--ux-font-size-lg);
      font-weight: var(--ux-font-weight-semibold);
      color: var(--ux-text);
      line-height: 1.3;
    }

    .ux-section__description {
      margin: 0;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      line-height: 1.5;
    }

    .ux-section__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* ========================================
       Section Content
    ======================================== */

    .ux-section__content {
      padding: var(--ux-section-padding);
      padding-top: 0;
    }

    /* When no header, add top padding */
    .ux-section__content:first-child {
      padding-top: var(--ux-section-padding);
    }

    /* ========================================
       Bordered Variant
    ======================================== */

    .ux-section--bordered {
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-section-border-radius);
      background-color: var(--ux-surface);
    }

    .ux-section--bordered .ux-section__header {
      border-bottom: 1px solid var(--ux-border-color);
      padding-bottom: var(--ux-section-padding);
    }

    .ux-section--bordered .ux-section__content {
      padding-top: var(--ux-section-padding);
    }

    /* ========================================
       Card Variant
    ======================================== */

    .ux-section--card {
      background-color: var(--ux-surface);
      border-radius: var(--ux-section-border-radius);
      box-shadow: var(--ux-shadow-sm);
    }

    .ux-section--card .ux-section__header {
      border-bottom: 1px solid var(--ux-border-color);
      padding-bottom: var(--ux-section-padding);
    }

    .ux-section--card .ux-section__content {
      padding-top: var(--ux-section-padding);
    }

    /* ========================================
       Inset Variant (iOS grouped style)
    ======================================== */

    .ux-section--inset {
      margin-left: var(--ux-section-inset-margin-x);
      margin-right: var(--ux-section-inset-margin-x);
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-section--compact {
      --ux-section-padding: var(--ux-section-padding-compact);
      --ux-section-gap: var(--ux-space-sm);
      --ux-section-margin-y: var(--ux-space-md);
    }

    .ux-section--compact .ux-section__title {
      font-size: var(--ux-font-size-md);
    }

    .ux-section--compact .ux-section__description {
      font-size: var(--ux-font-size-xs);
    }

    /* ========================================
       Collapsible Variant
    ======================================== */

    .ux-section--collapsible .ux-section__header {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-section--collapsible .ux-section__header:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-section--collapsible .ux-section__header:active {
      background-color: var(--ux-light);
    }

    .ux-section__chevron {
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
      transition: transform var(--ux-transition-base) var(--ux-ease);
      margin-left: auto;
    }

    .ux-section__chevron svg {
      width: 100%;
      height: 100%;
    }

    .ux-section--expanded .ux-section__chevron {
      transform: rotate(180deg);
    }

    /* Collapsible content animation */
    .ux-section--collapsible .ux-section__body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--ux-transition-base) var(--ux-ease);
    }

    .ux-section--collapsible.ux-section--expanded .ux-section__body {
      grid-template-rows: 1fr;
    }

    .ux-section__body-inner {
      overflow: hidden;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-section--glass {
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-glass-radius-lg);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      overflow: hidden;
    }

    .ux-section--glass .ux-section__header {
      border-bottom: 0.5px solid var(--ux-glass-border);
      padding-bottom: var(--ux-section-padding);
    }

    .ux-section--glass .ux-section__content {
      padding-top: var(--ux-section-padding);
    }

    .ux-section--glass.ux-section--collapsible .ux-section__header:hover {
      background-color: var(--ux-glass-bg-thin);
    }

    .ux-section--glass.ux-section--collapsible .ux-section__header:active {
      background-color: var(--ux-glass-bg);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-section--sm .ux-section__header,
    .ux-section--sm .ux-section__content {
      padding: var(--ux-space-md);
    }

    .ux-section--sm .ux-section__header {
      padding-bottom: var(--ux-space-xs);
    }

    .ux-section--sm .ux-section__title {
      font-size: var(--ux-font-size-md);
    }

    .ux-section--sm .ux-section__description {
      font-size: var(--ux-font-size-xs);
    }

    .ux-section--lg .ux-section__header,
    .ux-section--lg .ux-section__content {
      padding: var(--ux-space-xl);
    }

    .ux-section--lg .ux-section__header {
      padding-bottom: var(--ux-space-md);
    }

    .ux-section--lg .ux-section__title {
      font-size: var(--ux-font-size-xl);
    }

    /* ========================================
       Divider Between Sections
    ======================================== */

    .ux-section--divider {
      border-bottom: 1px solid var(--ux-border-color);
      padding-bottom: var(--ux-section-margin-y);
    }

    .ux-section--divider:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    /* ========================================
       Header-only Section (for list headers)
    ======================================== */

    .ux-section--header-only .ux-section__header {
      padding-bottom: var(--ux-space-sm);
    }

    .ux-section--header-only .ux-section__title {
      font-size: var(--ux-font-size-sm);
      font-weight: var(--ux-font-weight-medium);
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-section--disabled {
      opacity: var(--ux-disabled-opacity);
      pointer-events: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) .ux-section--bordered {
        border-color: var(--ux-border-color);
        background-color: var(--ux-surface);
      }

      :root:not(.ux-light) .ux-section--bordered .ux-section__header {
        border-bottom-color: var(--ux-border-color);
      }

      :root:not(.ux-light) .ux-section--card {
        background-color: var(--ux-surface);
        box-shadow: var(--ux-shadow-md);
      }

      :root:not(.ux-light) .ux-section--collapsible .ux-section__header:hover {
        background-color: var(--ux-surface-secondary);
      }

      :root:not(.ux-light) .ux-section--collapsible .ux-section__header:active {
        background-color: var(--ux-surface-tertiary);
      }
    }

    .ux-dark .ux-section--bordered,
    .ux-theme-dark .ux-section--bordered {
      border-color: var(--ux-border-color);
      background-color: var(--ux-surface);
    }

    .ux-dark .ux-section--bordered .ux-section__header,
    .ux-theme-dark .ux-section--bordered .ux-section__header {
      border-bottom-color: var(--ux-border-color);
    }

    .ux-dark .ux-section--card,
    .ux-theme-dark .ux-section--card {
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-md);
    }

    .ux-dark .ux-section--collapsible .ux-section__header:hover,
    .ux-theme-dark .ux-section--collapsible .ux-section__header:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-dark .ux-section--collapsible .ux-section__header:active,
    .ux-theme-dark .ux-section--collapsible .ux-section__header:active {
      background-color: var(--ux-surface-tertiary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-section__chevron {
        transition: none;
      }

      .ux-section--collapsible .ux-section__body {
        transition: none;
      }

      .ux-section--collapsible .ux-section__header {
        transition: none;
      }
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-section--inset {
        margin-left: var(--ux-space-md);
        margin-right: var(--ux-space-md);
      }

      .ux-section__header {
        flex-wrap: wrap;
      }

      .ux-section__actions {
        width: 100%;
        justify-content: flex-end;
        margin-top: var(--ux-space-sm);
      }

      /* Keep actions inline on small screens if few items */
      .ux-section__header:has(.ux-section__actions:only-child),
      .ux-section__header:has(.ux-section__actions > :only-child) {
        flex-wrap: nowrap;
      }

      .ux-section__header:has(.ux-section__actions > :only-child) .ux-section__actions {
        width: auto;
        margin-top: 0;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-section-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-section-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for collapsible section
  // ARIA: aria-expanded on header, aria-controls, region role on content
  // Keyboard: Enter/Space to toggle
  const sectionComponent = (config = {}) => ({
    isExpanded: config.expanded !== false, // Default to expanded
    disabled: config.disabled || false,
    sectionId: config.id || 'ux-section-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for header
    get headerAriaAttrs() {
      return {
        'aria-expanded': this.isExpanded ? 'true' : 'false',
        'aria-controls': this.sectionId + '-content',
        'id': this.sectionId + '-header',
        'role': 'button',
        'tabindex': '0'
      };
    },

    // ARIA attributes for content
    get contentAriaAttrs() {
      return {
        'role': 'region',
        'aria-labelledby': this.sectionId + '-header',
        'id': this.sectionId + '-content'
      };
    },

    init() {
      // Add expanded class based on initial state
      if (this.isExpanded) {
        this.$el.classList.add('ux-section--expanded');
      }
    },

    toggle() {
      if (this.disabled) return;
      this.isExpanded = !this.isExpanded;
      this.$el.classList.toggle('ux-section--expanded', this.isExpanded);
      this.$dispatch('section:toggle', { expanded: this.isExpanded });
    },

    expand() {
      if (this.disabled || this.isExpanded) return;
      this.isExpanded = true;
      this.$el.classList.add('ux-section--expanded');
      this.$dispatch('section:expand');
    },

    collapse() {
      if (!this.isExpanded) return;
      this.isExpanded = false;
      this.$el.classList.remove('ux-section--expanded');
      this.$dispatch('section:collapse');
    },

    // Keyboard handler for Enter/Space
    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSection', sectionComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSection', sectionComponent);
    });
  }
})();
