/**
 * UX Searchbar Component
 * Barra de búsqueda estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Searchbar
    ======================================== */

    .ux-searchbar {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      padding: var(--ux-space-sm);
    }

    .ux-searchbar__container {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      min-height: var(--ux-searchbar-height);
      padding: 0 var(--ux-searchbar-padding-x);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-searchbar-border-radius);
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar--focused .ux-searchbar__container {
      background-color: var(--ux-surface);
      box-shadow: 0 0 0 2px var(--ux-primary);
    }

    .ux-searchbar__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: var(--ux-text-tertiary);
      flex-shrink: 0;
    }

    .ux-searchbar__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-searchbar__input {
      flex: 1;
      width: 100%;
      height: var(--ux-searchbar-height);
      padding: 0 var(--ux-space-sm);
      font-family: var(--ux-font-family);
      font-size: var(--ux-input-font-size); /* Prevent zoom on iOS */
      color: var(--ux-text);
      background: transparent;
      border: none;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-searchbar__input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* Hide default search cancel button */
    .ux-searchbar__input::-webkit-search-cancel-button,
    .ux-searchbar__input::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }

    .ux-searchbar__clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: var(--ux-medium);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-searchbar__clear svg {
      width: 12px;
      height: 12px;
    }

    .ux-searchbar--has-value .ux-searchbar__clear {
      opacity: 1;
      transform: scale(1);
    }

    .ux-searchbar__clear:hover {
      background: var(--ux-medium-shade);
    }

    .ux-searchbar__clear:active {
      transform: scale(0.9);
    }

    /* ========================================
       Cancel Button (iOS style)
    ======================================== */

    .ux-searchbar__cancel {
      padding: 0 var(--ux-space-md);
      font-size: var(--ux-font-size-md);
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      opacity: 0;
      max-width: 0;
      overflow: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        max-width var(--ux-transition-base) var(--ux-ease),
        padding var(--ux-transition-base) var(--ux-ease);
    }

    .ux-searchbar--focused .ux-searchbar__cancel,
    .ux-searchbar--show-cancel .ux-searchbar__cancel {
      opacity: 1;
      max-width: 100px;
    }

    .ux-searchbar__cancel:hover {
      color: var(--ux-primary-shade);
    }

    .ux-searchbar__cancel:active {
      opacity: 0.7;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Rounded */
    .ux-searchbar--rounded .ux-searchbar__container {
      border-radius: 18px;
    }

    /* Outline */
    .ux-searchbar--outline .ux-searchbar__container {
      background-color: transparent;
      border: 1px solid var(--ux-border-color);
    }

    .ux-searchbar--outline.ux-searchbar--focused .ux-searchbar__container {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 2px rgba(var(--ux-primary-rgb), 0.15);
    }

    /* Filled */
    .ux-searchbar--filled .ux-searchbar__container {
      background-color: var(--ux-light);
    }

    /* Glass (iOS 26 Liquid Glass) */
    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-searchbar--glass .ux-searchbar__container {
      background: var(--ux-glass-bg-thin);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-searchbar--glass.ux-searchbar--focused .ux-searchbar__container {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-searchbar--sm .ux-searchbar__container {
      min-height: 32px;
    }

    .ux-searchbar--sm .ux-searchbar__input {
      height: 32px;
      font-size: var(--ux-font-size-sm);
    }

    .ux-searchbar--lg .ux-searchbar__container {
      min-height: 48px;
      padding: 0 var(--ux-space-lg);
    }

    .ux-searchbar--lg .ux-searchbar__input {
      height: 48px;
      font-size: var(--ux-font-size-lg);
    }

    .ux-searchbar--lg .ux-searchbar__icon {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       With Results Dropdown
    ======================================== */

    .ux-searchbar__results {
      position: absolute;
      top: calc(100% + 4px);
      left: var(--ux-space-sm);
      right: var(--ux-space-sm);
      max-height: 300px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      overflow-y: auto;
      z-index: 100;
      -webkit-overflow-scrolling: touch;
    }

    .ux-searchbar__result {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__result:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-searchbar__result:active {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-searchbar__result-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-secondary);
    }

    .ux-searchbar__result-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-searchbar__result-content {
      flex: 1;
      min-width: 0;
    }

    .ux-searchbar__result-title {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-searchbar__result-subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Highlight matching text */
    .ux-searchbar__highlight {
      background-color: rgba(var(--ux-warning-rgb), 0.3);
      border-radius: 2px;
    }

    /* No results */
    .ux-searchbar__no-results {
      padding: var(--ux-space-lg);
      text-align: center;
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    /* Loading */
    .ux-searchbar__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
    }

    /* ========================================
       Recent Searches
    ======================================== */

    .ux-searchbar__recent {
      padding: var(--ux-space-sm) 0;
    }

    .ux-searchbar__recent-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-lg);
    }

    .ux-searchbar__recent-title {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-searchbar__recent-clear {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-primary);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .ux-searchbar__recent-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__recent-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-searchbar__recent-item-icon {
      width: 16px;
      height: 16px;
      margin-right: var(--ux-space-md);
      color: var(--ux-text-tertiary);
    }

    .ux-searchbar__recent-item-text {
      flex: 1;
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    .ux-searchbar__recent-item-remove {
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-searchbar__recent-item:hover .ux-searchbar__recent-item-remove {
      opacity: 1;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-searchbar--disabled .ux-searchbar__container {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ux-searchbar--disabled .ux-searchbar__input {
      cursor: not-allowed;
    }

    /* ========================================
       In Toolbar
    ======================================== */

    .ux-toolbar .ux-searchbar {
      padding: 0;
    }

    .ux-toolbar .ux-searchbar__container {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-toolbar .ux-searchbar--focused .ux-searchbar__container {
      background-color: var(--ux-surface);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-searchbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-searchbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for searchbar
  // ARIA: role="searchbox", aria-label, aria-autocomplete for autocomplete behavior
  const searchbarComponent = (config = {}) => ({
    query: config.query || '',
    isFocused: false,
    isLoading: false,
    showResults: false,
    results: [],
    recentSearches: config.recentSearches || [],
    maxRecent: config.maxRecent || 5,
    debounceTime: config.debounceTime || 300,
    minChars: config.minChars || 1,
    _debounceTimer: null,
    searchbarId: config.id || 'ux-searchbar-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the search input
    get inputAriaAttrs() {
      return {
        'role': 'searchbox',
        'aria-label': config.ariaLabel || 'Search',
        'aria-autocomplete': 'list',
        'aria-controls': this.searchbarId + '-results',
        'aria-expanded': this.shouldShowDropdown ? 'true' : 'false'
      };
    },

    // ARIA attributes for the results container
    get resultsAriaAttrs() {
      return {
        'role': 'listbox',
        'id': this.searchbarId + '-results',
        'aria-label': 'Search results'
      };
    },

    // ARIA attributes for each result option
    getResultAriaAttrs(index) {
      return {
        'role': 'option',
        'id': this.searchbarId + '-result-' + index
      };
    },

    get hasValue() {
      return this.query.length > 0;
    },

    get shouldShowDropdown() {
      return this.isFocused && (this.showResults || this.recentSearches.length > 0);
    },

    focus() {
      this.isFocused = true;
    },

    blur() {
      // Delay to allow click on results
      setTimeout(() => {
        this.isFocused = false;
        this.showResults = false;
      }, 200);
    },

    clear() {
      this.query = '';
      this.results = [];
      this.showResults = false;
    },

    cancel() {
      this.clear();
      this.isFocused = false;
    },

    onInput() {
      clearTimeout(this._debounceTimer);

      if (this.query.length < this.minChars) {
        this.results = [];
        this.showResults = false;
        return;
      }

      this._debounceTimer = setTimeout(() => {
        this.search();
      }, this.debounceTime);
    },

    async search() {
      // Override this method or use @search event
      this.showResults = true;
    },

    selectResult(result) {
      this.query = result.title || result.label || result;
      this.addToRecent(this.query);
      this.showResults = false;
    },

    addToRecent(term) {
      if (!term) return;

      // Remove if already exists
      const index = this.recentSearches.indexOf(term);
      if (index !== -1) {
        this.recentSearches.splice(index, 1);
      }

      // Add to beginning
      this.recentSearches.unshift(term);

      // Keep max items
      if (this.recentSearches.length > this.maxRecent) {
        this.recentSearches = this.recentSearches.slice(0, this.maxRecent);
      }
    },

    selectRecent(term) {
      this.query = term;
      this.search();
    },

    removeRecent(term) {
      const index = this.recentSearches.indexOf(term);
      if (index !== -1) {
        this.recentSearches.splice(index, 1);
      }
    },

    clearRecent() {
      this.recentSearches = [];
    },

    submit() {
      if (this.query) {
        this.addToRecent(this.query);
      }
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.cancel();
      } else if (event.key === 'Enter') {
        this.submit();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSearchbar', searchbarComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSearchbar', searchbarComponent);
    });
  }

  // Helper to highlight matching text (XSS-safe)
  window.UX = window.UX || {};
  window.UX.highlightMatch = function(text, query) {
    if (!query || !text) return text || '';

    // First, escape HTML in the text to prevent XSS
    const escapeHtml = (str) => {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    };

    const escapedText = escapeHtml(String(text));
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return escapedText.replace(regex, '<span class="ux-searchbar__highlight">$1</span>');
  };
})();
