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
      background-color: var(--ux-light);
      color: var(--ux-text);
      border: none;
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    /* ========================================
       Interactive Chips
    ======================================== */

    .ux-chip--interactive {
      cursor: pointer;
    }

    .ux-chip--interactive:hover {
      background-color: var(--ux-light-shade);
    }

    .ux-chip--interactive:active {
      transform: scale(0.96);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-chip--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-chip--primary:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.25);
    }

    .ux-chip--secondary {
      background-color: rgba(var(--ux-secondary-rgb), 0.15);
      color: var(--ux-secondary-shade);
    }

    .ux-chip--tertiary {
      background-color: rgba(var(--ux-tertiary-rgb), 0.15);
      color: var(--ux-tertiary);
    }

    .ux-chip--success {
      background-color: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success-shade);
    }

    .ux-chip--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-chip--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-chip--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Filled Variants
    ======================================== */

    .ux-chip--filled {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-chip--filled.ux-chip--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-chip--filled.ux-chip--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-chip--filled.ux-chip--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-chip--filled.ux-chip--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Outline Variants
    ======================================== */

    .ux-chip--outline {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
      color: var(--ux-text);
    }

    .ux-chip--outline.ux-chip--primary {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    .ux-chip--outline.ux-chip--secondary {
      border-color: var(--ux-secondary);
      color: var(--ux-secondary);
    }

    .ux-chip--outline.ux-chip--success {
      border-color: var(--ux-success);
      color: var(--ux-success);
    }

    .ux-chip--outline.ux-chip--warning {
      border-color: var(--ux-warning);
      color: var(--ux-warning);
    }

    .ux-chip--outline.ux-chip--danger {
      border-color: var(--ux-danger);
      color: var(--ux-danger);
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
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-chip--selected.ux-chip--outline {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
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
