/**
 * UX Tag Input Component
 * Multi-select input with chips/tags
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Tag Input Container
       ========================================================================== */

    :root {
      --ux-tag-input-min-height: 44px;
      --ux-tag-input-padding: var(--ux-space-xs);
      --ux-tag-input-gap: var(--ux-space-xs);
      --ux-tag-input-radius: var(--ux-radius-lg);
      --ux-tag-height: 28px;
      --ux-tag-font-size: 0.8125rem;
    }

    .ux-tag-input {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--ux-tag-input-gap);
      min-height: var(--ux-tag-input-min-height);
      padding: var(--ux-tag-input-padding);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-tag-input-radius);
      cursor: text;
      transition: border-color var(--ux-transition-fast), box-shadow var(--ux-transition-fast);
    }

    .ux-tag-input:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-tag-input--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--ux-surface-secondary);
    }

    .ux-tag-input--error {
      border-color: var(--ux-danger);
    }

    .ux-tag-input--error:focus-within {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    /* ==========================================================================
       Tags
       ========================================================================== */

    .ux-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: var(--ux-tag-height);
      padding: 0 8px;
      font-size: var(--ux-tag-font-size);
      font-weight: 500;
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
      border-radius: var(--ux-radius-full);
      white-space: nowrap;
      user-select: none;
      animation: ux-tag-appear 0.2s var(--ux-ease-out);
    }

    @keyframes ux-tag-appear {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .ux-tag--removing {
      animation: ux-tag-remove 0.15s var(--ux-ease-in) forwards;
    }

    @keyframes ux-tag-remove {
      to {
        opacity: 0;
        transform: scale(0.8);
      }
    }

    .ux-tag__text {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-tag__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      margin-left: 2px;
      margin-right: -4px;
      background: transparent;
      border: none;
      border-radius: 50%;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: all var(--ux-transition-fast);
    }

    .ux-tag__remove:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    .ux-tag__remove svg {
      width: 12px;
      height: 12px;
    }

    /* Tag Colors */
    .ux-tag--secondary {
      background: var(--ux-surface-tertiary);
      color: var(--ux-text);
    }

    .ux-tag--success {
      background: var(--ux-success-tint);
      color: var(--ux-success-shade);
    }

    .ux-tag--warning {
      background: var(--ux-warning-tint);
      color: var(--ux-warning-shade);
    }

    .ux-tag--danger {
      background: var(--ux-danger-tint);
      color: var(--ux-danger-shade);
    }

    /* ==========================================================================
       Input Field
       ========================================================================== */

    .ux-tag-input__field {
      flex: 1;
      min-width: 80px;
      height: var(--ux-tag-height);
      padding: 0 var(--ux-space-xs);
      font-size: 0.9375rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      outline: none;
    }

    .ux-tag-input__field::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-tag-input--disabled .ux-tag-input__field {
      cursor: not-allowed;
    }

    /* ==========================================================================
       Suggestions Dropdown
       ========================================================================== */

    .ux-tag-input-wrapper {
      position: relative;
      width: 100%;
    }

    .ux-tag-input__suggestions {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: var(--ux-z-dropdown);
      max-height: 200px;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-tag-input__suggestions--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-tag-input__suggestion {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: 0.9375rem;
      color: var(--ux-text);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-tag-input__suggestion:hover,
    .ux-tag-input__suggestion--active {
      background: var(--ux-surface-secondary);
    }

    .ux-tag-input__suggestion--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-tag-input__suggestion-create {
      color: var(--ux-primary);
      font-weight: 500;
    }

    .ux-tag-input__no-results {
      padding: var(--ux-space-md);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: 0.875rem;
    }

    /* ==========================================================================
       Counter & Limit
       ========================================================================== */

    .ux-tag-input__counter {
      margin-left: auto;
      padding: 0 var(--ux-space-xs);
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    .ux-tag-input__counter--limit {
      color: var(--ux-danger);
    }

    /* ==========================================================================
       Size Variants
       ========================================================================== */

    .ux-tag-input--sm {
      min-height: 36px;
      --ux-tag-height: 24px;
      --ux-tag-font-size: 0.75rem;
    }

    .ux-tag-input--sm .ux-tag-input__field {
      font-size: 0.875rem;
    }

    .ux-tag-input--lg {
      min-height: 52px;
      --ux-tag-height: 32px;
      --ux-tag-font-size: 0.875rem;
    }

    .ux-tag-input--lg .ux-tag-input__field {
      font-size: 1rem;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-tag-input--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-tag-input--glass .ux-tag {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-tag-input-wrapper--glass .ux-tag-input__suggestions {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-tag__remove:hover {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark .ux-tag__remove:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-tag {
        animation: none;
      }

      .ux-tag--removing {
        animation: none;
        opacity: 0;
      }

      .ux-tag-input__suggestions {
        transition: opacity var(--ux-transition-fast);
        transform: none;
      }
    }
  `;

  // Close icon
  const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tag-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tag-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const tagInputData = (options = {}) => ({
    // Configuration
    placeholder: options.placeholder || 'Add tag...',
    suggestions: options.suggestions || [],
    maxTags: options.maxTags || Infinity,
    maxLength: options.maxLength || 50,
    allowCreate: options.allowCreate ?? true,
    allowDuplicates: options.allowDuplicates ?? false,
    delimiter: options.delimiter || ',',
    validateTag: options.validateTag || null,
    transformTag: options.transformTag || null,
    disabled: options.disabled ?? false,
    showCounter: options.showCounter ?? false,

    // State
    tags: options.value || [],
    inputValue: '',
    isOpen: false,
    activeIndex: -1,
    filteredSuggestions: [],
    closeIcon: closeIcon,

    // Lifecycle
    init() {
      this.$watch('inputValue', () => {
        this.filterSuggestions();
      });
    },

    // Computed
    get canAddMore() {
      return this.tags.length < this.maxTags;
    },

    get isAtLimit() {
      return this.tags.length >= this.maxTags;
    },

    // Filter suggestions based on input
    filterSuggestions() {
      if (!this.inputValue.trim()) {
        this.filteredSuggestions = [];
        this.isOpen = false;
        return;
      }

      const query = this.inputValue.toLowerCase().trim();

      this.filteredSuggestions = this.suggestions.filter(suggestion => {
        const text = typeof suggestion === 'string' ? suggestion : suggestion.label || suggestion.value;
        const isMatch = text.toLowerCase().includes(query);
        const isAlreadySelected = this.tags.some(tag =>
          (typeof tag === 'string' ? tag : tag.value) === (typeof suggestion === 'string' ? suggestion : suggestion.value)
        );
        return isMatch && (this.allowDuplicates || !isAlreadySelected);
      }).slice(0, 10);

      this.isOpen = this.filteredSuggestions.length > 0 || (this.allowCreate && this.inputValue.trim());
      this.activeIndex = -1;
    },

    // Get display text for tag/suggestion
    getLabel(item) {
      if (typeof item === 'string') return item;
      return item.label || item.value || item.name || '';
    },

    getValue(item) {
      if (typeof item === 'string') return item;
      return item.value || item.label || item.name || '';
    },

    // Add tag
    addTag(value) {
      if (this.disabled || !this.canAddMore) return false;

      let tag = typeof value === 'string' ? value.trim() : value;

      if (!tag || (typeof tag === 'string' && !tag.length)) return false;

      // Transform tag if function provided
      if (this.transformTag && typeof tag === 'string') {
        tag = this.transformTag(tag);
      }

      // Validate tag if function provided
      if (this.validateTag) {
        const validation = this.validateTag(tag, this.tags);
        if (validation !== true) {
          this.$dispatch('tag-input:invalid', { tag, reason: validation });
          return false;
        }
      }

      // Check for duplicates
      const tagValue = this.getValue(tag);
      if (!this.allowDuplicates && this.tags.some(t => this.getValue(t) === tagValue)) {
        this.$dispatch('tag-input:duplicate', { tag });
        return false;
      }

      // Check max length
      if (typeof tag === 'string' && tag.length > this.maxLength) {
        tag = tag.substring(0, this.maxLength);
      }

      this.tags.push(tag);
      this.inputValue = '';
      this.isOpen = false;
      this.activeIndex = -1;

      this.$dispatch('tag-input:add', { tag, tags: [...this.tags] });
      this.$dispatch('tag-input:change', { tags: [...this.tags] });

      return true;
    },

    // Remove tag by index
    removeTag(index) {
      if (this.disabled || index < 0 || index >= this.tags.length) return;

      const removed = this.tags.splice(index, 1)[0];

      this.$dispatch('tag-input:remove', { tag: removed, tags: [...this.tags] });
      this.$dispatch('tag-input:change', { tags: [...this.tags] });
    },

    // Remove last tag
    removeLastTag() {
      if (this.tags.length > 0) {
        this.removeTag(this.tags.length - 1);
      }
    },

    // Clear all tags
    clearAll() {
      if (this.disabled) return;

      this.tags = [];
      this.inputValue = '';
      this.$dispatch('tag-input:clear');
      this.$dispatch('tag-input:change', { tags: [] });
    },

    // Select suggestion
    selectSuggestion(suggestion) {
      this.addTag(suggestion);
      this.$refs.input?.focus();
    },

    // Handle input
    onInput(event) {
      // Check for delimiter
      if (this.delimiter && this.inputValue.includes(this.delimiter)) {
        const parts = this.inputValue.split(this.delimiter);
        parts.forEach((part, i) => {
          if (i < parts.length - 1 && part.trim()) {
            this.addTag(part.trim());
          }
        });
        this.inputValue = parts[parts.length - 1];
      }
    },

    // Handle keyboard navigation
    onKeydown(event) {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (this.activeIndex >= 0 && this.filteredSuggestions[this.activeIndex]) {
            this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
          } else if (this.inputValue.trim() && this.allowCreate) {
            this.addTag(this.inputValue);
          }
          break;

        case 'Backspace':
          if (!this.inputValue && this.tags.length > 0) {
            this.removeLastTag();
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (!this.isOpen && this.inputValue) {
            this.filterSuggestions();
          } else {
            const maxIndex = this.allowCreate && this.inputValue.trim()
              ? this.filteredSuggestions.length
              : this.filteredSuggestions.length - 1;
            this.activeIndex = Math.min(this.activeIndex + 1, maxIndex);
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          this.activeIndex = Math.max(this.activeIndex - 1, -1);
          break;

        case 'Escape':
          this.isOpen = false;
          this.activeIndex = -1;
          break;

        case 'Tab':
          this.isOpen = false;
          break;
      }
    },

    onFocus() {
      if (this.inputValue) {
        this.filterSuggestions();
      }
      this.$dispatch('tag-input:focus');
    },

    onBlur() {
      // Delay to allow click on suggestions
      setTimeout(() => {
        this.isOpen = false;
        this.activeIndex = -1;
      }, 150);
      this.$dispatch('tag-input:blur');
    },

    // Focus the input
    focus() {
      this.$refs.input?.focus();
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxTagInput', tagInputData);
  }
})();
