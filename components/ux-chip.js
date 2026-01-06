/**
 * UX Chip Component
 * Chips para etiquetas, filtros y selección
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Chip
    ======================================== */

    .ux-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      height: var(--ux-chip-height);
      padding: 0 var(--ux-chip-padding-x);
      font-family: var(--ux-font-family);
      font-size: var(--ux-chip-font-size);
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border-radius: var(--ux-chip-border-radius);
      /* Uses composition system: combine with .ux-color-* classes */
      /* Default is soft/tinted style - use .ux-color-*--soft */
      background-color: var(--ux-variant-bg, var(--ux-light));
      color: var(--ux-variant-color, var(--ux-text));
      border: 1px solid var(--ux-variant-border, transparent);
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      transition: var(--ux-transition-colors),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-chip:hover {
      background-color: var(--ux-variant-bg-hover, var(--ux-light-shade));
    }

    /* ========================================
       Interactive Chips
    ======================================== */

    .ux-chip--interactive {
      cursor: pointer;
    }

    .ux-chip--interactive:active {
      transform: scale(0.96);
    }

    /* ========================================
       Filled Variant
       Use with .ux-color-* classes (not --soft)
    ======================================== */

    .ux-chip--filled {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    /* ========================================
       Outline Variant
       Use with .ux-color-*--outline classes
    ======================================== */

    .ux-chip--outline {
      background-color: var(--ux-variant-bg, transparent);
      color: var(--ux-variant-color, var(--ux-text));
      border: 1px solid var(--ux-variant-border, var(--ux-border-color));
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-chip--sm {
      height: var(--ux-chip-height-sm);
      padding: 0 calc(var(--ux-chip-padding-x) * 0.75);
      font-size: calc(var(--ux-chip-font-size) * 0.85);
      border-radius: calc(var(--ux-chip-height-sm) / 2);
    }

    .ux-chip--lg {
      height: var(--ux-chip-height-lg);
      padding: 0 calc(var(--ux-chip-padding-x) * 1.25);
      font-size: calc(var(--ux-chip-font-size) * 1.15);
      border-radius: calc(var(--ux-chip-height-lg) / 2);
    }

    /* ========================================
       Selected State
    ======================================== */

    .ux-chip--selected {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    .ux-chip--selected.ux-chip--outline {
      background-color: var(--ux-variant-bg, var(--ux-primary));
      border-color: var(--ux-variant-border, var(--ux-primary));
      color: var(--ux-variant-color, var(--ux-primary-contrast));
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-chip--disabled,
    .ux-chip:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ========================================
       Chip Avatar
    ======================================== */

    .ux-chip__avatar {
      width: 24px;
      height: 24px;
      margin-left: -8px;
      border-radius: 50%;
      object-fit: cover;
    }

    .ux-chip--sm .ux-chip__avatar {
      width: 18px;
      height: 18px;
      margin-left: -4px;
    }

    .ux-chip--lg .ux-chip__avatar {
      width: 32px;
      height: 32px;
      margin-left: -12px;
    }

    /* ========================================
       Chip Icon
    ======================================== */

    .ux-chip__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .ux-chip__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-chip--sm .ux-chip__icon {
      width: 14px;
      height: 14px;
    }

    .ux-chip--lg .ux-chip__icon {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Chip Close Button
    ======================================== */

    .ux-chip__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-right: -6px;
      margin-left: 2px;
      padding: 0;
      border: none;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-chip__close:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .ux-chip__close svg {
      width: 12px;
      height: 12px;
    }

    .ux-chip--filled .ux-chip__close,
    .ux-chip--selected .ux-chip__close {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-chip--filled .ux-chip__close:hover,
    .ux-chip--selected .ux-chip__close:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* ========================================
       Chip Group
    ======================================== */

    .ux-chip-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    .ux-chip-group--scroll {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-bottom: var(--ux-space-xs);
    }

    .ux-chip-group--scroll::-webkit-scrollbar {
      display: none;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-chip-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-chip-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for selectable chips
  const chipComponent = () => ({
    selected: false,

    toggle() {
      this.selected = !this.selected;
    },

    select() {
      this.selected = true;
    },

    deselect() {
      this.selected = false;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxChip', chipComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxChip', chipComponent);
    });
  }

  // Alpine component for chip group (single/multi select)
  const chipGroupComponent = (config = {}) => ({
    multiple: config.multiple || false,
    selected: config.multiple ? [] : null,

    isSelected(value) {
      if (this.multiple) {
        return this.selected.includes(value);
      }
      return this.selected === value;
    },

    toggle(value) {
      if (this.multiple) {
        const index = this.selected.indexOf(value);
        if (index === -1) {
          this.selected.push(value);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected = this.selected === value ? null : value;
      }
    },

    select(value) {
      if (this.multiple) {
        if (!this.selected.includes(value)) {
          this.selected.push(value);
        }
      } else {
        this.selected = value;
      }
    },

    clear() {
      this.selected = this.multiple ? [] : null;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxChipGroup', chipGroupComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxChipGroup', chipGroupComponent);
    });
  }
})();
