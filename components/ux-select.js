/**
 * UX Select Component
 * Selectores y dropdowns estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Select
    ======================================== */

    .ux-select {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-select__trigger {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-select__trigger:hover {
      border-color: var(--ux-medium);
    }

    .ux-select--open .ux-select__trigger {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-select__value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-select__placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-select__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-sm);
      color: var(--ux-text-secondary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-select--open .ux-select__icon {
      transform: rotate(180deg);
    }

    .ux-select__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Dropdown
    ======================================== */

    .ux-select__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      overflow-y: auto;
      z-index: 100;
      -webkit-overflow-scrolling: touch;
    }

    .ux-select__dropdown--top {
      top: auto;
      bottom: calc(100% + 4px);
    }

    /* ========================================
       Options
    ======================================== */

    .ux-select__option {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select__option:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-select__option:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-select__option--selected {
      color: var(--ux-primary);
      font-weight: 500;
    }

    .ux-select__option--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-select__option-check {
      width: 20px;
      height: 20px;
      margin-left: auto;
      color: var(--ux-primary);
      opacity: 0;
    }

    .ux-select__option--selected .ux-select__option-check {
      opacity: 1;
    }

    .ux-select__option-check svg {
      width: 100%;
      height: 100%;
    }

    /* Option with icon */
    .ux-select__option-icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
    }

    .ux-select__option--selected .ux-select__option-icon {
      color: var(--ux-primary);
    }

    /* ========================================
       Option Group
    ======================================== */

    .ux-select__group {
      padding-top: var(--ux-space-sm);
    }

    .ux-select__group:first-child {
      padding-top: 0;
    }

    .ux-select__group-label {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-select__divider {
      height: 1px;
      margin: var(--ux-space-sm) 0;
      background-color: var(--ux-border-color);
    }

    /* ========================================
       Label
    ======================================== */

    .ux-select__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    .ux-select__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* ========================================
       Helper & Error
    ======================================== */

    .ux-select__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-select__error {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
    }

    .ux-select--error .ux-select__trigger {
      border-color: var(--ux-danger);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-select--disabled .ux-select__trigger {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Filled */
    .ux-select--filled .ux-select__trigger {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
      border-bottom: 2px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius) var(--ux-border-radius) 0 0;
    }

    .ux-select--filled.ux-select--open .ux-select__trigger {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    /* Outline */
    .ux-select--outline .ux-select__trigger {
      background-color: transparent;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-select--sm .ux-select__trigger {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select--sm .ux-select__option {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select--lg .ux-select__trigger {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    .ux-select--lg .ux-select__option {
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Multi Select
    ======================================== */

    .ux-select--multi .ux-select__value {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-select__chip {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: 2px 8px;
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select__chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      padding: 0;
      border: none;
      background: none;
      color: var(--ux-primary);
      cursor: pointer;
      opacity: 0.7;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select__chip-remove:hover {
      opacity: 1;
    }

    .ux-select__chip-remove svg {
      width: 10px;
      height: 10px;
    }

    /* ========================================
       Searchable
    ======================================== */

    .ux-select__search {
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-select__search-input {
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-border-radius-sm);
      outline: none;
    }

    .ux-select__search-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-select__no-results {
      padding: var(--ux-space-lg);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       Action Sheet Style (mobile)
    ======================================== */

    @media (max-width: 767px) {
      .ux-select--action-sheet .ux-select__dropdown {
        position: fixed;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 60vh;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        border: none;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .ux-select--action-sheet .ux-select__dropdown::before {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        margin: var(--ux-space-sm) auto var(--ux-space-md);
        background-color: var(--ux-light-shade);
        border-radius: 2px;
      }
    }

    /* ========================================
       Native Select (for forms)
    ======================================== */

    .ux-native-select {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ux-native-select__field {
      width: 100%;
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-right: calc(var(--ux-space-lg) + 24px);
      font-family: var(--ux-font-family);
      font-size: 16px;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-native-select__field:hover {
      border-color: var(--ux-medium);
    }

    .ux-native-select__field:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-native-select__icon {
      position: absolute;
      right: var(--ux-space-md);
      bottom: calc(50% - 10px);
      width: 20px;
      height: 20px;
      color: var(--ux-text-secondary);
      pointer-events: none;
    }

    .ux-native-select__icon svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-select-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-select-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for select
  // ARIA: role="listbox" on dropdown, role="option" on options, aria-expanded on trigger
  const selectComponent = (config = {}) => ({
    isOpen: false,
    value: config.value || null,
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    searchable: config.searchable || false,
    searchQuery: '',
    error: '',
    highlightedIndex: -1,
    selectId: config.id || 'ux-select-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'role': 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.selectId + '-listbox',
        'aria-activedescendant': this.highlightedIndex >= 0 ? this.selectId + '-option-' + this.highlightedIndex : '',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    // ARIA attributes for the listbox
    get listboxAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.selectId + '-listbox',
        'aria-label': config.ariaLabel || 'Options'
      };
    },

    // ARIA attributes for each option
    getOptionAriaAttrs(option, index) {
      return {
        'role': 'option',
        'id': this.selectId + '-option-' + index,
        'aria-selected': this.isSelected(option) ? 'true' : 'false',
        'aria-disabled': option.disabled ? 'true' : 'false'
      };
    },

    get selectedOption() {
      return this.options.find(opt => opt.value === this.value);
    },

    get displayValue() {
      return this.selectedOption ? this.selectedOption.label : '';
    },

    get filteredOptions() {
      if (!this.searchQuery) return this.options;
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(opt =>
        opt.label.toLowerCase().includes(query)
      );
    },

    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
        this.highlightedIndex = -1;
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
        this.searchQuery = '';
        this.highlightedIndex = -1;
      }
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    select(option) {
      if (option.disabled) return;
      this.value = option.value;
      this.error = '';
      this.close();
    },

    isSelected(option) {
      return this.value === option.value;
    },

    handleKeydown(event) {
      if (!this.isOpen) {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          this.open();
        }
        return;
      }

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          this.close();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.highlightedIndex = Math.min(
            this.highlightedIndex + 1,
            this.filteredOptions.length - 1
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (this.highlightedIndex >= 0) {
            this.select(this.filteredOptions[this.highlightedIndex]);
          }
          break;
      }
    },

    validate(required = false, message = 'Please select an option') {
      if (required && !this.value) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.value = null;
      this.error = '';
      this.searchQuery = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSelect', selectComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSelect', selectComponent);
    });
  }

  // Alpine component for multi-select
  // ARIA: role="listbox" with aria-multiselectable="true"
  const multiSelectComponent = (config = {}) => ({
    isOpen: false,
    values: config.values || [],
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    searchable: config.searchable || false,
    searchQuery: '',
    error: '',
    maxSelections: config.maxSelections || null,
    multiSelectId: config.id || 'ux-multi-select-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the trigger button
    get triggerAriaAttrs() {
      return {
        'role': 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': this.isOpen ? 'true' : 'false',
        'aria-controls': this.multiSelectId + '-listbox',
        'aria-disabled': this.disabled ? 'true' : 'false'
      };
    },

    // ARIA attributes for the listbox
    get listboxAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.multiSelectId + '-listbox',
        'aria-label': config.ariaLabel || 'Options',
        'aria-multiselectable': 'true'
      };
    },

    // ARIA attributes for each option
    getOptionAriaAttrs(option, index) {
      return {
        'role': 'option',
        'id': this.multiSelectId + '-option-' + index,
        'aria-selected': this.isSelected(option) ? 'true' : 'false',
        'aria-disabled': option.disabled ? 'true' : 'false'
      };
    },

    get selectedOptions() {
      return this.options.filter(opt => this.values.includes(opt.value));
    },

    get filteredOptions() {
      if (!this.searchQuery) return this.options;
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(opt =>
        opt.label.toLowerCase().includes(query)
      );
    },

    get canSelectMore() {
      return !this.maxSelections || this.values.length < this.maxSelections;
    },

    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
        this.searchQuery = '';
      }
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    toggleOption(option) {
      if (option.disabled) return;

      const index = this.values.indexOf(option.value);
      if (index === -1) {
        if (this.canSelectMore) {
          this.values.push(option.value);
        }
      } else {
        this.values.splice(index, 1);
      }
      this.error = '';
    },

    removeValue(value) {
      const index = this.values.indexOf(value);
      if (index !== -1) {
        this.values.splice(index, 1);
      }
    },

    isSelected(option) {
      return this.values.includes(option.value);
    },

    selectAll() {
      this.values = this.options
        .filter(opt => !opt.disabled)
        .map(opt => opt.value);
    },

    clearAll() {
      this.values = [];
    },

    validate(required = false, message = 'Please select at least one option') {
      if (required && this.values.length === 0) {
        this.error = message;
        return false;
      }
      this.error = '';
      return true;
    },

    reset() {
      this.values = [];
      this.error = '';
      this.searchQuery = '';
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxMultiSelect', multiSelectComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxMultiSelect', multiSelectComponent);
    });
  }
})();
