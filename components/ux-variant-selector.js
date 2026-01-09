(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Variant Selector
       Size, color, and option selectors for e-commerce
    ======================================== */

    .ux-variant-selector {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-variant-selector__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-variant-selector__selected {
      font-weight: 400;
      color: var(--ux-text-secondary);
    }

    .ux-variant-selector__options {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    /* Base option style */
    .ux-variant-selector__option {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      height: 44px;
      padding: 0 var(--ux-space-md);
      border: 2px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
      position: relative;
      overflow: hidden;
    }

    .ux-variant-selector__option:hover {
      border-color: var(--ux-gray-400);
    }

    .ux-variant-selector__option--selected {
      border-color: var(--ux-primary);
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
    }

    .ux-variant-selector__option--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Out of stock diagonal line */
    .ux-variant-selector__option--unavailable {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-variant-selector__option--unavailable::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -10%;
      width: 120%;
      height: 2px;
      background: var(--ux-gray-400);
      transform: rotate(-45deg);
    }

    /* Size variants */
    .ux-variant-selector--sm .ux-variant-selector__option {
      min-width: 36px;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-xs);
    }

    .ux-variant-selector--lg .ux-variant-selector__option {
      min-width: 52px;
      height: 52px;
      padding: 0 var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
    }

    /* ========================================
       Color Swatch Variant
    ======================================== */

    .ux-variant-selector--color .ux-variant-selector__options {
      gap: var(--ux-space-xs);
    }

    .ux-variant-selector--color .ux-variant-selector__option {
      min-width: 36px;
      width: 36px;
      height: 36px;
      padding: 0;
      border-radius: 50%;
      border-width: 3px;
      border-color: transparent;
      box-shadow: inset 0 0 0 2px var(--ux-surface);
    }

    .ux-variant-selector--color .ux-variant-selector__option:hover {
      border-color: var(--ux-gray-300);
    }

    .ux-variant-selector--color .ux-variant-selector__option--selected {
      border-color: var(--ux-primary);
      box-shadow: inset 0 0 0 2px var(--ux-surface);
    }

    /* Color swatch sizes */
    .ux-variant-selector--color.ux-variant-selector--sm .ux-variant-selector__option {
      min-width: 28px;
      width: 28px;
      height: 28px;
    }

    .ux-variant-selector--color.ux-variant-selector--lg .ux-variant-selector__option {
      min-width: 44px;
      width: 44px;
      height: 44px;
    }

    /* Checkmark for selected color */
    .ux-variant-selector--color .ux-variant-selector__option--selected::before {
      content: '';
      width: 12px;
      height: 6px;
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotate(-45deg);
      margin-bottom: 2px;
    }

    /* Dark color check */
    .ux-variant-selector--color .ux-variant-selector__option--dark.ux-variant-selector__option--selected::before {
      border-color: white;
    }

    /* Light color check */
    .ux-variant-selector--color .ux-variant-selector__option--light.ux-variant-selector__option--selected::before {
      border-color: var(--ux-gray-800);
    }

    /* White/light color border */
    .ux-variant-selector--color .ux-variant-selector__option--light {
      box-shadow: inset 0 0 0 1px var(--ux-gray-200), inset 0 0 0 2px var(--ux-surface);
    }

    /* Unavailable color */
    .ux-variant-selector--color .ux-variant-selector__option--unavailable::after {
      width: 100%;
      left: 0;
      background: rgba(255, 255, 255, 0.8);
    }

    /* ========================================
       Image Variant
    ======================================== */

    .ux-variant-selector--image .ux-variant-selector__option {
      width: 56px;
      height: 56px;
      padding: 2px;
      border-radius: var(--ux-radius-md);
    }

    .ux-variant-selector--image .ux-variant-selector__option img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: calc(var(--ux-radius-md) - 4px);
    }

    .ux-variant-selector--image.ux-variant-selector--sm .ux-variant-selector__option {
      width: 44px;
      height: 44px;
    }

    .ux-variant-selector--image.ux-variant-selector--lg .ux-variant-selector__option {
      width: 72px;
      height: 72px;
    }

    /* ========================================
       Chip Variant
    ======================================== */

    .ux-variant-selector--chip .ux-variant-selector__option {
      height: auto;
      padding: var(--ux-space-xs) var(--ux-space-md);
      border-radius: var(--ux-radius-full);
      font-size: var(--ux-font-size-sm);
    }

    .ux-variant-selector--chip .ux-variant-selector__option--selected {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    /* ========================================
       Button Group Variant
    ======================================== */

    .ux-variant-selector--button-group .ux-variant-selector__options {
      gap: 0;
    }

    .ux-variant-selector--button-group .ux-variant-selector__option {
      border-radius: 0;
      margin-left: -2px;
    }

    .ux-variant-selector--button-group .ux-variant-selector__option:first-child {
      border-radius: var(--ux-radius-md) 0 0 var(--ux-radius-md);
      margin-left: 0;
    }

    .ux-variant-selector--button-group .ux-variant-selector__option:last-child {
      border-radius: 0 var(--ux-radius-md) var(--ux-radius-md) 0;
    }

    .ux-variant-selector--button-group .ux-variant-selector__option--selected {
      z-index: 1;
    }

    /* ========================================
       Dropdown Variant
    ======================================== */

    .ux-variant-selector--dropdown {
      position: relative;
    }

    .ux-variant-selector--dropdown .ux-variant-selector__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 44px;
      padding: 0 var(--ux-space-md);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      color: var(--ux-text);
      font-size: var(--ux-font-size-md);
      cursor: pointer;
      transition: border-color var(--ux-transition-fast);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__trigger:hover {
      border-color: var(--ux-gray-400);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__trigger:focus {
      outline: none;
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px var(--ux-primary-tint);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__trigger-icon {
      width: 16px;
      height: 16px;
      color: var(--ux-text-secondary);
      transition: transform var(--ux-transition-fast);
    }

    .ux-variant-selector--dropdown.ux-variant-selector--open .ux-variant-selector__trigger-icon {
      transform: rotate(180deg);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      box-shadow: var(--ux-shadow-lg);
      z-index: var(--ux-z-dropdown);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast);
    }

    .ux-variant-selector--dropdown.ux-variant-selector--open .ux-variant-selector__menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__option {
      width: 100%;
      justify-content: flex-start;
      border: none;
      border-radius: var(--ux-radius-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__option:hover {
      background: var(--ux-gray-100);
    }

    .ux-variant-selector--dropdown .ux-variant-selector__option--selected {
      background: var(--ux-primary-tint);
    }

    /* ========================================
       With Price Variant
    ======================================== */

    .ux-variant-selector__option-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .ux-variant-selector__option-name {
      font-weight: 500;
    }

    .ux-variant-selector__option-price {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-variant-selector__option--selected .ux-variant-selector__option-price {
      color: var(--ux-primary-shade);
    }

    /* Price difference indicator */
    .ux-variant-selector__option-diff {
      font-size: var(--ux-font-size-xs);
    }

    .ux-variant-selector__option-diff--up {
      color: var(--ux-danger);
    }

    .ux-variant-selector__option-diff--down {
      color: var(--ux-success);
    }

    /* ========================================
       Stock Indicator
    ======================================== */

    .ux-variant-selector__stock {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      margin-top: var(--ux-space-xs);
    }

    .ux-variant-selector__stock-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .ux-variant-selector__stock--in-stock .ux-variant-selector__stock-dot {
      background: var(--ux-success);
    }

    .ux-variant-selector__stock--low-stock .ux-variant-selector__stock-dot {
      background: var(--ux-warning);
    }

    .ux-variant-selector__stock--out-of-stock .ux-variant-selector__stock-dot {
      background: var(--ux-danger);
    }

    .ux-variant-selector__stock-text {
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-variant-selector__option {
        background: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-variant-selector__option:hover {
        border-color: var(--ux-gray-600);
      }

      .ux-variant-selector--color .ux-variant-selector__option--light {
        box-shadow: inset 0 0 0 1px var(--ux-gray-600), inset 0 0 0 2px var(--ux-gray-800);
      }

      .ux-variant-selector--dropdown .ux-variant-selector__trigger {
        background: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-variant-selector--dropdown .ux-variant-selector__menu {
        background: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-variant-selector--dropdown .ux-variant-selector__option:hover {
        background: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-variant-selector__option {
      background: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-variant-selector__option,
      .ux-variant-selector--dropdown .ux-variant-selector__trigger,
      .ux-variant-selector--dropdown .ux-variant-selector__menu,
      .ux-variant-selector--dropdown .ux-variant-selector__trigger-icon {
        transition: none;
      }
    }
  `;

  if (window.UX) {
    window.UX.injectStyles('ux-variant-selector-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-variant-selector-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const componentData = (options = {}) => ({
    // Options format: [{ value, label, price?, image?, color?, available?, stock? }]
    options: options.options || [],
    selected: options.selected || null,
    multiple: options.multiple ?? false, // Allow multiple selection
    isOpen: false, // For dropdown variant
    label: options.label || '',

    init() {
      // Default to first available option if none selected
      if (!this.selected && !this.multiple) {
        const firstAvailable = this.options.find(opt => opt.available !== false);
        if (firstAvailable) {
          this.selected = firstAvailable.value;
        }
      }

      // Initialize multiple selection as array
      if (this.multiple && !Array.isArray(this.selected)) {
        this.selected = this.selected ? [this.selected] : [];
      }
    },

    select(value) {
      const option = this.options.find(opt => opt.value === value);
      if (!option || option.available === false) return;

      if (this.multiple) {
        const index = this.selected.indexOf(value);
        if (index === -1) {
          this.selected.push(value);
        } else {
          this.selected.splice(index, 1);
        }
        this.$dispatch('variant:change', { values: [...this.selected] });
      } else {
        this.selected = value;
        this.isOpen = false;
        this.$dispatch('variant:change', { value, option });
      }
    },

    isSelected(value) {
      if (this.multiple) {
        return this.selected.includes(value);
      }
      return this.selected === value;
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },

    close() {
      this.isOpen = false;
    },

    get selectedOption() {
      return this.options.find(opt => opt.value === this.selected);
    },

    get selectedLabel() {
      const opt = this.selectedOption;
      return opt ? opt.label : 'Select option';
    },

    getStockStatus(option) {
      if (option.available === false || option.stock === 0) {
        return 'out-of-stock';
      }
      if (option.stock && option.stock < 5) {
        return 'low-stock';
      }
      return 'in-stock';
    },

    getStockText(option) {
      const status = this.getStockStatus(option);
      if (status === 'out-of-stock') return 'Out of stock';
      if (status === 'low-stock') return `Only ${option.stock} left`;
      return 'In stock';
    },

    // Helper to determine if color is light or dark
    isLightColor(color) {
      if (!color) return false;
      // Simple heuristic - could be improved
      const lightColors = ['white', '#fff', '#ffffff', 'ivory', 'beige', 'cream', 'yellow', 'lightyellow'];
      return lightColors.some(c => color.toLowerCase().includes(c));
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxVariantSelector', componentData);
  }
})();
