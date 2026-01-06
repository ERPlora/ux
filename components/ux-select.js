/**
 * UX Select Component
 * Selectores estilo Ionic con múltiples interfaces
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       Native Select Wrapper
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
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-native-select__field:hover {
      border-color: var(--ux-medium);
    }

    .ux-native-select__field:focus {
      outline: none;
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-native-select__field:disabled {
      background-color: var(--ux-light);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .ux-native-select__icon {
      position: absolute;
      right: var(--ux-space-md);
      bottom: var(--ux-space-md);
      pointer-events: none;
      color: var(--ux-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-native-select__icon svg {
      width: 20px;
      height: 20px;
    }

    /* When there's a label, position icon relative to the select field */
    .ux-native-select .ux-select__label + .ux-native-select__field ~ .ux-native-select__icon,
    .ux-native-select .ux-select__label ~ .ux-native-select__field ~ .ux-native-select__icon {
      bottom: auto;
      top: calc(var(--ux-space-xs) + var(--ux-font-size-sm) * 1.5 + var(--ux-touch-target) / 2);
      transform: translateY(-50%);
    }

    /* Helper text for native select */
    .ux-native-select .ux-select__helper {
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       UX Select Container
    ======================================== */

    .ux-select {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* ========================================
       Label Placements
    ======================================== */

    /* Default/Stacked - label above */
    .ux-select__label {
      display: block;
      margin-bottom: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select__label--required::after {
      content: ' *';
      color: var(--ux-danger);
    }

    /* Fixed - label inline with fixed width */
    .ux-select--label-fixed {
      flex-direction: row;
      align-items: center;
    }

    .ux-select--label-fixed .ux-select__label {
      width: 100px;
      flex-shrink: 0;
      margin-bottom: 0;
      margin-right: var(--ux-space-md);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-select--label-fixed .ux-select__wrapper {
      flex: 1;
    }

    /* Start - label inline at start */
    .ux-select--label-start {
      flex-direction: row;
      align-items: center;
    }

    .ux-select--label-start .ux-select__label {
      margin-bottom: 0;
      margin-right: var(--ux-space-md);
      flex-shrink: 0;
    }

    .ux-select--label-start .ux-select__wrapper {
      flex: 1;
    }

    /* End - label inline at end */
    .ux-select--label-end {
      flex-direction: row-reverse;
      align-items: center;
    }

    .ux-select--label-end .ux-select__label {
      margin-bottom: 0;
      margin-left: var(--ux-space-md);
      flex-shrink: 0;
    }

    .ux-select--label-end .ux-select__wrapper {
      flex: 1;
    }

    /* Floating - label floats above on focus/value */
    .ux-select--label-floating {
      position: relative;
    }

    .ux-select--label-floating .ux-select__label {
      position: absolute;
      left: var(--ux-space-lg);
      top: 50%;
      transform: translateY(-50%);
      margin: 0;
      padding: 0 var(--ux-space-xs);
      background-color: var(--ux-surface);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
      pointer-events: none;
      z-index: 1;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select--label-floating.ux-select--has-value .ux-select__label,
    .ux-select--label-floating.ux-select--open .ux-select__label {
      top: 0;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-primary);
    }

    .ux-select--label-floating .ux-select__trigger {
      padding-top: var(--ux-space-lg);
    }

    /* ========================================
       Select Trigger
    ======================================== */

    .ux-select__wrapper {
      position: relative;
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

    /* Fill variants */
    .ux-select--fill-solid .ux-select__trigger {
      background-color: var(--ux-surface-secondary);
      border-color: transparent;
    }

    .ux-select--fill-outline .ux-select__trigger {
      background-color: transparent;
    }

    /* Shape */
    .ux-select--round .ux-select__trigger {
      border-radius: 9999px;
    }

    /* ========================================
       Value & Placeholder
    ======================================== */

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
      flex-shrink: 0;
    }

    .ux-select__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Alert Interface (iOS Modal)
    ======================================== */

    .ux-select-alert {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--ux-z-modal);
      padding: var(--ux-space-xl);
    }

    .ux-select-alert__backdrop {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-select-alert--open .ux-select-alert__backdrop {
      opacity: 1;
    }

    .ux-select-alert__content {
      position: relative;
      width: 100%;
      max-width: 320px;
      max-height: 80vh;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.9);
      opacity: 0;
      transition: all var(--ux-transition-base) var(--ux-ease-spring);
    }

    .ux-select-alert--open .ux-select-alert__content {
      transform: scale(1);
      opacity: 1;
    }

    .ux-select-alert__header {
      padding: var(--ux-space-lg) var(--ux-space-lg) var(--ux-space-md);
      text-align: center;
    }

    .ux-select-alert__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-select-alert__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    .ux-select-alert__options {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0 var(--ux-space-sm);
    }

    .ux-select-alert__option {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-md);
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-alert__option:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-select-alert__option-radio {
      width: 22px;
      height: 22px;
      border: 2px solid var(--ux-border-color);
      border-radius: 50%;
      margin-right: var(--ux-space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-alert__option--selected .ux-select-alert__option-radio {
      border-color: var(--ux-primary);
    }

    .ux-select-alert__option-radio::after {
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--ux-primary);
      transform: scale(0);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-alert__option--selected .ux-select-alert__option-radio::after {
      transform: scale(1);
    }

    /* Checkbox for multiple - Ionic style (circular) */
    .ux-select-alert__option-checkbox {
      width: 26px;
      height: 26px;
      border: 2px solid var(--ux-medium);
      border-radius: 50%;
      margin-right: var(--ux-space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      background-color: transparent;
    }

    .ux-select-alert__option--selected .ux-select-alert__option-checkbox {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
    }

    .ux-select-alert__option-checkbox svg {
      width: 14px;
      height: 14px;
      color: white;
      opacity: 0;
      transform: scale(0.5);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-alert__option--selected .ux-select-alert__option-checkbox svg {
      opacity: 1;
      transform: scale(1);
    }

    .ux-select-alert__option-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-sm);
      flex-shrink: 0;
    }

    .ux-select-alert__option-label {
      flex: 1;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-select-alert__footer {
      display: flex;
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-select-alert__button {
      flex: 1;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-alert__button:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-select-alert__button:active {
      background-color: var(--ux-light);
    }

    .ux-select-alert__button--cancel {
      color: var(--ux-text-secondary);
    }

    .ux-select-alert__button + .ux-select-alert__button {
      border-left: 1px solid var(--ux-border-color);
    }

    .ux-select-alert__button--ok {
      font-weight: 600;
    }

    /* ========================================
       Action Sheet Interface
    ======================================== */

    .ux-select-action-sheet {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .ux-select-action-sheet__backdrop {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-select-action-sheet--open .ux-select-action-sheet__backdrop {
      opacity: 1;
    }

    .ux-select-action-sheet__content {
      position: relative;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
      max-height: 60vh;
      display: flex;
      flex-direction: column;
      padding-bottom: env(safe-area-inset-bottom);
      transform: translateY(100%);
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-select-action-sheet--open .ux-select-action-sheet__content {
      transform: translateY(0);
    }

    .ux-select-action-sheet__handle {
      display: flex;
      justify-content: center;
      padding: var(--ux-space-sm) 0;
    }

    .ux-select-action-sheet__handle-bar {
      width: 36px;
      height: 4px;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
    }

    .ux-select-action-sheet__header {
      padding: var(--ux-space-sm) var(--ux-space-lg);
      text-align: center;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-select-action-sheet__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-select-action-sheet__options {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-select-action-sheet__option {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      font-size: var(--ux-font-size-lg);
      color: var(--ux-primary);
      cursor: pointer;
      border-bottom: 1px solid var(--ux-border-color);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select-action-sheet__option:last-child {
      border-bottom: none;
    }

    .ux-select-action-sheet__option:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-select-action-sheet__option--selected {
      font-weight: 600;
    }

    .ux-select-action-sheet__option-check {
      width: 20px;
      height: 20px;
      margin-left: var(--ux-space-sm);
      color: var(--ux-primary);
    }

    .ux-select-action-sheet__option-check svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Popover Interface (Dropdown)
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
      z-index: var(--ux-z-dropdown);
      -webkit-overflow-scrolling: touch;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-select--open .ux-select__dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-select__dropdown--top {
      top: auto;
      bottom: calc(100% + 4px);
      transform: translateY(8px);
    }

    .ux-select--open .ux-select__dropdown--top {
      transform: translateY(0);
    }

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

    .ux-select__option--selected {
      color: var(--ux-primary);
      font-weight: 500;
    }

    .ux-select__option--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-select__option--focused {
      background-color: var(--ux-surface-secondary);
      outline: 2px solid var(--ux-primary);
      outline-offset: -2px;
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

    /* ========================================
       Multi-select chips
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
    }

    .ux-select__chip-remove:hover {
      opacity: 1;
    }

    .ux-select__chip-remove svg {
      width: 10px;
      height: 10px;
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
       Sizes
    ======================================== */

    .ux-select--sm .ux-select__trigger {
      min-height: var(--ux-touch-target-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
    }

    .ux-select--lg .ux-select__trigger {
      min-height: 52px;
      padding: var(--ux-space-lg) var(--ux-space-xl);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-select--glass .ux-select__trigger {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-select--glass .ux-select__trigger:hover {
      background: var(--ux-glass-bg);
    }

    .ux-select--glass.ux-select--open .ux-select__trigger {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-select--glass .ux-select__dropdown {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-select--glass .ux-select__option:hover {
      background-color: var(--ux-glass-bg-thick);
    }

    /* Native select glass */
    .ux-native-select--glass .ux-native-select__field {
      background: var(--ux-glass-bg-thin);
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-native-select--glass .ux-native-select__field:hover {
      background: var(--ux-glass-bg);
    }

    .ux-native-select--glass .ux-native-select__field:focus {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    /* ========================================
       Item Integration (like ion-item)
    ======================================== */

    .ux-item .ux-select {
      flex: 1;
    }

    .ux-item .ux-select__trigger {
      border: none;
      border-radius: 0;
      background: transparent;
      padding-left: 0;
      min-height: auto;
    }

    .ux-item .ux-select--open .ux-select__trigger {
      box-shadow: none;
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

  // Alpine component for select with multiple interfaces
  const selectComponent = (config = {}) => ({
    isOpen: false,
    value: config.value || null,
    tempValue: null, // For alert interface confirmation
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    interface: config.interface || 'popover', // 'alert', 'action-sheet', 'popover'
    label: config.label || '',
    labelPlacement: config.labelPlacement || 'stacked', // 'start', 'end', 'fixed', 'floating', 'stacked'
    cancelText: config.cancelText || 'Cancel',
    okText: config.okText || 'OK',
    error: '',
    selectId: config.id || 'ux-select-' + Math.random().toString(36).substr(2, 9),

    get selectedOption() {
      return this.options.find(opt => opt.value === this.value);
    },

    get displayValue() {
      return this.selectedOption ? this.selectedOption.label : '';
    },

    get hasValue() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },

    get filteredOptions() {
      return this.options;
    },

    select(option) {
      this.selectOption(option);
    },

    open() {
      if (this.disabled) return;
      this.isOpen = true;
      this.tempValue = this.value;
      // Reset focused index to selected item or first item
      const selectedIdx = this.options.findIndex(opt => opt.value === this.value);
      this.focusedIndex = selectedIdx >= 0 ? selectedIdx : 0;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    selectOption(option) {
      if (option.disabled) return;

      if (this.interface === 'alert') {
        this.tempValue = option.value;
      } else {
        this.value = option.value;
        this.error = '';
        this.close();
      }
    },

    confirm() {
      this.value = this.tempValue;
      this.error = '';
      this.close();
    },

    cancel() {
      this.tempValue = this.value;
      this.close();
    },

    isSelected(option) {
      if (this.interface === 'alert') {
        return this.tempValue === option.value;
      }
      return this.value === option.value;
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
      this.tempValue = null;
      this.error = '';
      this.close();
    },

    focusedIndex: -1,

    handleKeydown(event) {
      const enabledOptions = this.options.filter(opt => !opt.disabled);

      switch (event.key) {
        case 'Escape':
          this.close();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else if (this.focusedIndex >= 0 && this.focusedIndex < enabledOptions.length) {
            this.selectOption(enabledOptions[this.focusedIndex]);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            this.focusedIndex = Math.min(this.focusedIndex + 1, enabledOptions.length - 1);
            this.scrollToFocused();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!this.isOpen) {
            this.open();
          } else {
            this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
            this.scrollToFocused();
          }
          break;
        case 'Home':
          if (this.isOpen) {
            event.preventDefault();
            this.focusedIndex = 0;
            this.scrollToFocused();
          }
          break;
        case 'End':
          if (this.isOpen) {
            event.preventDefault();
            this.focusedIndex = enabledOptions.length - 1;
            this.scrollToFocused();
          }
          break;
      }
    },

    scrollToFocused() {
      this.$nextTick(() => {
        const dropdown = this.$refs.dropdown;
        const focused = dropdown?.querySelector('.ux-select__option--focused');
        if (focused && dropdown) {
          focused.scrollIntoView({ block: 'nearest' });
        }
      });
    },

    isFocused(index) {
      return this.focusedIndex === index;
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
  const multiSelectComponent = (config = {}) => ({
    isOpen: false,
    values: config.values || [],
    tempValues: [], // For alert interface confirmation
    options: config.options || [],
    placeholder: config.placeholder || 'Select...',
    disabled: config.disabled || false,
    interface: config.interface || 'alert', // Multi-select typically uses alert
    label: config.label || '',
    labelPlacement: config.labelPlacement || 'stacked',
    cancelText: config.cancelText || 'Cancel',
    okText: config.okText || 'OK',
    error: '',
    maxSelections: config.maxSelections || null,
    multiSelectId: config.id || 'ux-multi-select-' + Math.random().toString(36).substr(2, 9),

    get selectedOptions() {
      return this.options.filter(opt => this.values.includes(opt.value));
    },

    get displayValue() {
      if (this.selectedOptions.length === 0) return '';
      if (this.selectedOptions.length === 1) return this.selectedOptions[0].label;
      return `${this.selectedOptions.length} selected`;
    },

    get hasValue() {
      return this.values.length > 0;
    },

    get canSelectMore() {
      return !this.maxSelections || this.tempValues.length < this.maxSelections;
    },

    get filteredOptions() {
      return this.options;
    },

    open() {
      if (this.disabled) return;
      this.isOpen = true;
      this.tempValues = [...this.values];
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    toggleOption(option) {
      if (option.disabled) return;

      const index = this.tempValues.indexOf(option.value);
      if (index === -1) {
        if (this.canSelectMore) {
          this.tempValues.push(option.value);
        }
      } else {
        this.tempValues.splice(index, 1);
      }
    },

    isSelected(option) {
      return this.tempValues.includes(option.value);
    },

    confirm() {
      this.values = [...this.tempValues];
      this.error = '';
      this.close();
    },

    cancel() {
      this.tempValues = [...this.values];
      this.close();
    },

    removeValue(value) {
      const index = this.values.indexOf(value);
      if (index !== -1) {
        this.values.splice(index, 1);
      }
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
      this.tempValues = [];
      this.error = '';
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
