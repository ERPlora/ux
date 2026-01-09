/**
 * UX Button Group Component
 * Agrupación de botones con estilos conectados
 * @requires ux-core.js
 * @requires ux-button.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Button Group
    ======================================== */

    .ux-button-group {
      display: inline-flex;
      flex-wrap: nowrap;
      vertical-align: middle;
      isolation: isolate;
    }

    /* Reset button borders for grouping */
    .ux-button-group > .ux-button {
      position: relative;
      flex: 0 1 auto;
      border-radius: 0;
    }

    /* First button */
    .ux-button-group > .ux-button:first-child {
      border-top-left-radius: var(--ux-button-border-radius);
      border-bottom-left-radius: var(--ux-button-border-radius);
    }

    /* Last button */
    .ux-button-group > .ux-button:last-child {
      border-top-right-radius: var(--ux-button-border-radius);
      border-bottom-right-radius: var(--ux-button-border-radius);
    }

    /* Only child */
    .ux-button-group > .ux-button:only-child {
      border-radius: var(--ux-button-border-radius);
    }

    /* Remove double borders */
    .ux-button-group > .ux-button:not(:first-child) {
      margin-left: -2px;
    }

    /* Z-index for hover/focus states */
    .ux-button-group > .ux-button:hover,
    .ux-button-group > .ux-button:focus-visible,
    .ux-button-group > .ux-button:active {
      z-index: 1;
    }

    .ux-button-group > .ux-button.ux-button--active {
      z-index: 2;
    }

    /* ========================================
       Outline Variant
    ======================================== */

    .ux-button-group--outline > .ux-button {
      background-color: transparent;
      color: var(--ux-variant-color, var(--ux-primary));
      border: 2px solid var(--ux-variant-border, var(--ux-primary));
    }

    .ux-button-group--outline > .ux-button:hover {
      background-color: var(--ux-variant-bg-hover, rgba(var(--ux-primary-rgb), 0.1));
    }

    .ux-button-group--outline > .ux-button.ux-button--active,
    .ux-button-group--outline > .ux-button[aria-pressed="true"] {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    /* ========================================
       Vertical Group
    ======================================== */

    .ux-button-group--vertical {
      flex-direction: column;
    }

    .ux-button-group--vertical > .ux-button {
      width: 100%;
      border-radius: 0;
    }

    .ux-button-group--vertical > .ux-button:first-child {
      border-top-left-radius: var(--ux-button-border-radius);
      border-top-right-radius: var(--ux-button-border-radius);
      border-bottom-left-radius: 0;
    }

    .ux-button-group--vertical > .ux-button:last-child {
      border-bottom-left-radius: var(--ux-button-border-radius);
      border-bottom-right-radius: var(--ux-button-border-radius);
      border-top-right-radius: 0;
    }

    .ux-button-group--vertical > .ux-button:not(:first-child) {
      margin-left: 0;
      margin-top: -2px;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-button-group--sm > .ux-button {
      height: var(--ux-button-height-sm);
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-button-group--lg > .ux-button {
      height: var(--ux-button-height-lg);
      padding: 0 var(--ux-space-lg);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Full Width
    ======================================== */

    .ux-button-group--block {
      display: flex;
      width: 100%;
    }

    .ux-button-group--block > .ux-button {
      flex: 1;
    }

    /* ========================================
       Separated (gap between buttons)
    ======================================== */

    .ux-button-group--separated {
      gap: var(--ux-space-xs);
    }

    .ux-button-group--separated > .ux-button {
      border-radius: var(--ux-button-border-radius);
      margin-left: 0;
    }

    .ux-button-group--separated > .ux-button:not(:first-child) {
      margin-left: 0;
      margin-top: 0;
    }

    /* ========================================
       Toggle Group (single selection)
    ======================================== */

    .ux-button-group--toggle > .ux-button {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      border-color: var(--ux-border-color);
    }

    .ux-button-group--toggle > .ux-button:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-button-group--toggle > .ux-button.ux-button--active,
    .ux-button-group--toggle > .ux-button[aria-pressed="true"] {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-color: var(--ux-primary);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-button-group--glass > .ux-button {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
      color: var(--ux-text);
    }

    .ux-button-group--glass > .ux-button:hover {
      background: var(--ux-glass-bg-thick);
    }

    .ux-button-group--glass > .ux-button.ux-button--active {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-button-group--toggle > .ux-button {
        background-color: var(--ux-surface-secondary);
        border-color: var(--ux-border-color);
      }

      .ux-button-group--toggle > .ux-button:hover {
        background-color: var(--ux-surface-tertiary);
      }
    }

    .ux-dark .ux-button-group--toggle > .ux-button {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-button-group > .ux-button {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-button-group-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-button-group-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for toggle functionality
  const buttonGroupData = (options = {}) => ({
    selected: options.selected ?? null,
    multiple: options.multiple ?? false,
    selectedItems: options.selectedItems ?? [],

    init() {
      // Initialize from aria-pressed attributes
      this.$el.querySelectorAll('.ux-button[aria-pressed="true"]').forEach(btn => {
        const value = btn.dataset.value;
        if (value) {
          if (this.multiple) {
            this.selectedItems.push(value);
          } else {
            this.selected = value;
          }
        }
      });
    },

    isSelected(value) {
      if (this.multiple) {
        return this.selectedItems.includes(value);
      }
      return this.selected === value;
    },

    select(value) {
      if (this.multiple) {
        const index = this.selectedItems.indexOf(value);
        if (index === -1) {
          this.selectedItems.push(value);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.$dispatch('buttongroup:change', { selected: [...this.selectedItems] });
      } else {
        this.selected = value;
        this.$dispatch('buttongroup:change', { selected: value });
      }
    },

    getButtonClasses(value) {
      return {
        'ux-button--active': this.isSelected(value)
      };
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxButtonGroup', buttonGroupData);
  }

})();
