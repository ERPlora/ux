/**
 * UX Autocomplete Component
 * Search input with suggestions dropdown and highlighting
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Autocomplete Container
       ========================================================================== */

    :root {
      --ux-autocomplete-min-width: 200px;
      --ux-autocomplete-max-height: 300px;
      --ux-autocomplete-item-height: 44px;
      --ux-autocomplete-radius: var(--ux-radius-lg);
    }

    .ux-autocomplete {
      position: relative;
      width: 100%;
      min-width: var(--ux-autocomplete-min-width);
    }

    /* ==========================================================================
       Input
       ========================================================================== */

    .ux-autocomplete__input {
      width: 100%;
      height: var(--ux-input-height);
      padding: 0 var(--ux-space-md);
      padding-right: 2.5rem;
      font-size: 1rem;
      color: var(--ux-text);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-autocomplete-radius);
      outline: none;
      transition: border-color var(--ux-transition-fast), box-shadow var(--ux-transition-fast);
    }

    .ux-autocomplete__input:focus {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-autocomplete__input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-autocomplete__input--loading {
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner{transform-origin:center;animation:rotate 1s linear infinite}@keyframes rotate{100%{transform:rotate(360deg)}}%3C/style%3E%3Cg class='spinner'%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-dasharray='30 60'/%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 20px;
    }

    /* ==========================================================================
       Clear Button
       ========================================================================== */

    .ux-autocomplete__clear {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: var(--ux-surface-tertiary);
      border: none;
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast), background var(--ux-transition-fast);
    }

    .ux-autocomplete__clear:hover {
      background: var(--ux-gray-300);
    }

    .ux-autocomplete:focus-within .ux-autocomplete__clear,
    .ux-autocomplete__input:not(:placeholder-shown) ~ .ux-autocomplete__clear {
      opacity: 1;
    }

    .ux-autocomplete__clear--hidden {
      display: none;
    }

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    .ux-autocomplete__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: var(--ux-z-dropdown);
      max-height: var(--ux-autocomplete-max-height);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-autocomplete-radius);
      box-shadow: var(--ux-shadow-lg);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-autocomplete__dropdown--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-autocomplete__dropdown--above {
      top: auto;
      bottom: calc(100% + 4px);
      transform: translateY(8px);
    }

    .ux-autocomplete__dropdown--above.ux-autocomplete__dropdown--open {
      transform: translateY(0);
    }

    /* ==========================================================================
       List
       ========================================================================== */

    .ux-autocomplete__list {
      max-height: var(--ux-autocomplete-max-height);
      margin: 0;
      padding: var(--ux-space-xs);
      list-style: none;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .ux-autocomplete__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      min-height: var(--ux-autocomplete-item-height);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: 0.9375rem;
      color: var(--ux-text);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-autocomplete__item:hover,
    .ux-autocomplete__item--active {
      background: var(--ux-surface-secondary);
    }

    .ux-autocomplete__item--selected {
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
    }

    .ux-autocomplete__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-autocomplete__item-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    .ux-autocomplete__item-content {
      flex: 1;
      min-width: 0;
    }

    .ux-autocomplete__item-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-autocomplete__item-description {
      font-size: 0.8125rem;
      color: var(--ux-text-tertiary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Highlight match */
    .ux-autocomplete__highlight {
      background: var(--ux-warning-tint);
      color: inherit;
      font-weight: 600;
      border-radius: 2px;
      padding: 0 1px;
    }

    /* ==========================================================================
       Groups
       ========================================================================== */

    .ux-autocomplete__group {
      padding-top: var(--ux-space-sm);
    }

    .ux-autocomplete__group:first-child {
      padding-top: 0;
    }

    .ux-autocomplete__group-label {
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-autocomplete__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-autocomplete__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-sm);
      color: var(--ux-text-tertiary);
      opacity: 0.5;
    }

    .ux-autocomplete__empty-text {
      font-size: 0.9375rem;
    }

    /* ==========================================================================
       Loading State
       ========================================================================== */

    .ux-autocomplete__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
    }

    .ux-autocomplete__loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-autocomplete-spin 0.8s linear infinite;
    }

    @keyframes ux-autocomplete-spin {
      to { transform: rotate(360deg); }
    }

    /* ==========================================================================
       Footer
       ========================================================================== */

    .ux-autocomplete__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-autocomplete__footer-hint {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-autocomplete__footer-hint kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 18px;
      padding: 0 4px;
      font-size: 0.6875rem;
      font-family: inherit;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 4px;
      box-shadow: 0 1px 0 var(--ux-border-color);
    }

    /* ==========================================================================
       Variants
       ========================================================================== */

    /* Small */
    .ux-autocomplete--sm .ux-autocomplete__input {
      height: 36px;
      font-size: 0.875rem;
    }

    .ux-autocomplete--sm .ux-autocomplete__item {
      min-height: 36px;
      font-size: 0.875rem;
    }

    /* Large */
    .ux-autocomplete--lg .ux-autocomplete__input {
      height: 52px;
      font-size: 1.0625rem;
    }

    .ux-autocomplete--lg .ux-autocomplete__item {
      min-height: 52px;
      font-size: 1rem;
    }

    /* Glass */
    .ux-autocomplete--glass .ux-autocomplete__input {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    .ux-autocomplete--glass .ux-autocomplete__dropdown {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* Inline (no border) */
    .ux-autocomplete--inline .ux-autocomplete__input {
      border-color: transparent;
      background: transparent;
    }

    .ux-autocomplete--inline .ux-autocomplete__input:focus {
      border-color: transparent;
      box-shadow: none;
    }

    /* ==========================================================================
       Multi-select Tags
       ========================================================================== */

    .ux-autocomplete__tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      min-height: var(--ux-input-height);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-autocomplete-radius);
      cursor: text;
      transition: border-color var(--ux-transition-fast);
    }

    .ux-autocomplete__tags:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-autocomplete__tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      font-size: 0.8125rem;
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
      border-radius: var(--ux-radius-full);
    }

    .ux-autocomplete__tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: transparent;
      border: none;
      border-radius: 50%;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity var(--ux-transition-fast);
    }

    .ux-autocomplete__tag-remove:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    .ux-autocomplete__tags-input {
      flex: 1;
      min-width: 80px;
      height: 28px;
      padding: 0 var(--ux-space-xs);
      font-size: 0.9375rem;
      color: var(--ux-text);
      background: transparent;
      border: none;
      outline: none;
    }

    .ux-autocomplete__tags-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-autocomplete__highlight {
        background: rgba(var(--ux-warning-rgb), 0.3);
      }
    }

    .ux-dark .ux-autocomplete__highlight {
      background: rgba(var(--ux-warning-rgb), 0.3);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-autocomplete__dropdown {
        transition: opacity var(--ux-transition-fast);
        transform: none;
      }

      .ux-autocomplete__loading-spinner {
        animation: none;
      }
    }
  `;

  // Icons
  const icons = {
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
      <path d="M8 8l6 6M14 8l-6 6"/>
    </svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-autocomplete-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-autocomplete-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const autocompleteData = (options = {}) => ({
    // Configuration
    items: options.items || [],
    placeholder: options.placeholder || 'Search...',
    minChars: options.minChars ?? 1,
    debounce: options.debounce ?? 300,
    maxItems: options.maxItems || 10,
    highlightMatches: options.highlightMatches ?? true,
    closeOnSelect: options.closeOnSelect ?? true,
    clearOnSelect: options.clearOnSelect ?? false,
    showEmpty: options.showEmpty ?? true,
    emptyText: options.emptyText || 'No results found',
    labelKey: options.labelKey || 'label',
    valueKey: options.valueKey || 'value',
    descriptionKey: options.descriptionKey || 'description',
    groupKey: options.groupKey || 'group',
    filterFn: options.filterFn || null,
    fetchFn: options.fetchFn || null,
    multiple: options.multiple ?? false,

    // State
    query: '',
    isOpen: false,
    isLoading: false,
    activeIndex: -1,
    filteredItems: [],
    selectedItems: [],
    selectedValue: options.value || null,
    debounceTimer: null,
    icons: icons,

    // Lifecycle
    init() {
      // Set initial value if provided
      if (this.selectedValue && !this.multiple) {
        const item = this.items.find(i => this.getValue(i) === this.selectedValue);
        if (item) {
          this.query = this.getLabel(item);
        }
      }

      // Keyboard navigation
      this.$watch('isOpen', (open) => {
        if (open) {
          this.activeIndex = -1;
        }
      });
    },

    destroy() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
    },

    // Getters
    getLabel(item) {
      if (typeof item === 'string') return item;
      return item[this.labelKey] || item.label || item.name || '';
    },

    getValue(item) {
      if (typeof item === 'string') return item;
      return item[this.valueKey] || item.value || item.id || this.getLabel(item);
    },

    getDescription(item) {
      if (typeof item === 'string') return '';
      return item[this.descriptionKey] || item.description || '';
    },

    getGroup(item) {
      if (typeof item === 'string') return null;
      return item[this.groupKey] || item.group || null;
    },

    // Filter and search
    async search() {
      if (this.query.length < this.minChars) {
        this.filteredItems = [];
        this.isOpen = false;
        return;
      }

      this.isLoading = true;

      // Debounce
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(async () => {
        try {
          let results;

          // Custom fetch function for remote data
          if (this.fetchFn) {
            results = await this.fetchFn(this.query);
          }
          // Custom filter function
          else if (this.filterFn) {
            results = this.filterFn(this.query, this.items);
          }
          // Default filter
          else {
            const queryLower = this.query.toLowerCase();
            results = this.items.filter(item => {
              const label = this.getLabel(item).toLowerCase();
              const description = this.getDescription(item).toLowerCase();
              return label.includes(queryLower) || description.includes(queryLower);
            });
          }

          // Limit results
          this.filteredItems = results.slice(0, this.maxItems);

          // Filter out already selected items in multiple mode
          if (this.multiple) {
            const selectedValues = this.selectedItems.map(i => this.getValue(i));
            this.filteredItems = this.filteredItems.filter(
              item => !selectedValues.includes(this.getValue(item))
            );
          }

          this.isOpen = this.filteredItems.length > 0 || this.showEmpty;
          this.activeIndex = -1;
        } catch (error) {
          console.error('Autocomplete search error:', error);
          this.filteredItems = [];
        } finally {
          this.isLoading = false;
        }
      }, this.debounce);
    },

    // Highlight matching text
    highlight(text) {
      if (!this.highlightMatches || !this.query) return text;

      const regex = new RegExp(`(${this.escapeRegex(this.query)})`, 'gi');
      return text.replace(regex, '<mark class="ux-autocomplete__highlight">$1</mark>');
    },

    escapeRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // Selection
    select(item) {
      if (this.multiple) {
        this.selectedItems.push(item);
        this.query = '';
        this.filteredItems = [];
        this.$dispatch('autocomplete:select', {
          item: item,
          value: this.getValue(item),
          items: this.selectedItems,
          values: this.selectedItems.map(i => this.getValue(i))
        });
      } else {
        this.selectedValue = this.getValue(item);
        this.query = this.clearOnSelect ? '' : this.getLabel(item);
        this.$dispatch('autocomplete:select', {
          item: item,
          value: this.selectedValue
        });
      }

      if (this.closeOnSelect) {
        this.isOpen = false;
      }

      this.$refs.input?.focus();
    },

    removeSelected(index) {
      const removed = this.selectedItems.splice(index, 1)[0];
      this.$dispatch('autocomplete:remove', {
        item: removed,
        value: this.getValue(removed),
        items: this.selectedItems
      });
    },

    clear() {
      this.query = '';
      this.selectedValue = null;
      this.selectedItems = [];
      this.filteredItems = [];
      this.isOpen = false;
      this.$dispatch('autocomplete:clear');
      this.$refs.input?.focus();
    },

    // Keyboard navigation
    onKeydown(event) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!this.isOpen && this.query.length >= this.minChars) {
            this.search();
          } else {
            this.activeIndex = Math.min(this.activeIndex + 1, this.filteredItems.length - 1);
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          this.activeIndex = Math.max(this.activeIndex - 1, -1);
          break;

        case 'Enter':
          event.preventDefault();
          if (this.activeIndex >= 0 && this.filteredItems[this.activeIndex]) {
            this.select(this.filteredItems[this.activeIndex]);
          }
          break;

        case 'Escape':
          this.isOpen = false;
          this.activeIndex = -1;
          break;

        case 'Backspace':
          if (this.multiple && !this.query && this.selectedItems.length > 0) {
            this.removeSelected(this.selectedItems.length - 1);
          }
          break;

        case 'Tab':
          this.isOpen = false;
          break;
      }
    },

    onInput() {
      this.search();
      this.$dispatch('autocomplete:input', { query: this.query });
    },

    onFocus() {
      if (this.query.length >= this.minChars) {
        this.search();
      }
      this.$dispatch('autocomplete:focus');
    },

    onBlur() {
      // Delay to allow click on dropdown items
      setTimeout(() => {
        this.isOpen = false;
        this.$dispatch('autocomplete:blur');
      }, 200);
    },

    // Grouped items
    get groupedItems() {
      const groups = new Map();

      this.filteredItems.forEach(item => {
        const group = this.getGroup(item) || '__ungrouped__';
        if (!groups.has(group)) {
          groups.set(group, []);
        }
        groups.get(group).push(item);
      });

      return groups;
    },

    get hasGroups() {
      return this.filteredItems.some(item => this.getGroup(item));
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxAutocomplete', autocompleteData);
  }
})();
