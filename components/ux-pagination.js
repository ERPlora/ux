/**
 * UX Pagination Component
 * Pagination control with page navigation, per-page selector, and info display
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Pagination
    ======================================== */

    .ux-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      flex-wrap: wrap;
    }

    /* ========================================
       Pagination Info (Showing X to Y of Z)
    ======================================== */

    .ux-pagination__info {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      white-space: nowrap;
    }

    .ux-pagination__info-highlight {
      font-weight: 600;
      color: var(--ux-text);
    }

    /* ========================================
       Pagination Controls (Page Buttons)
    ======================================== */

    .ux-pagination__controls {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* ========================================
       Pagination Button (Base)
    ======================================== */

    .ux-pagination__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--ux-space-sm);
      background: none;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-pagination__btn:hover:not(:disabled):not(.ux-pagination__btn--active) {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    .ux-pagination__btn:active:not(:disabled) {
      transform: scale(0.96);
    }

    .ux-pagination__btn:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    .ux-pagination__btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Active Page Button */
    .ux-pagination__btn--active {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-pagination__btn--active:hover:not(:disabled) {
      background-color: var(--ux-primary-shade);
      border-color: var(--ux-primary-shade);
    }

    /* ========================================
       Previous/Next Arrow Buttons
    ======================================== */

    .ux-pagination__prev,
    .ux-pagination__next {
      min-width: 36px;
      padding: 0;
    }

    .ux-pagination__prev svg,
    .ux-pagination__next svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Ellipsis
    ======================================== */

    .ux-pagination__ellipsis {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      user-select: none;
    }

    /* ========================================
       Per Page Selector
    ======================================== */

    .ux-pagination__per-page {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-pagination__per-page select {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-right: calc(var(--ux-space-sm) + 18px);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      background-color: var(--ux-surface);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right var(--ux-space-xs) center;
      background-size: 16px;
      color: var(--ux-text);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-pagination__per-page select:hover {
      border-color: var(--ux-primary);
    }

    .ux-pagination__per-page select:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-pagination--sm .ux-pagination__btn {
      min-width: 28px;
      height: 28px;
      font-size: var(--ux-font-size-xs);
      border-radius: var(--ux-border-radius-sm);
    }

    .ux-pagination--sm .ux-pagination__prev svg,
    .ux-pagination--sm .ux-pagination__next svg {
      width: 14px;
      height: 14px;
    }

    .ux-pagination--sm .ux-pagination__ellipsis {
      min-width: 28px;
      height: 28px;
      font-size: var(--ux-font-size-xs);
    }

    .ux-pagination--sm .ux-pagination__info {
      font-size: var(--ux-font-size-xs);
    }

    .ux-pagination--sm .ux-pagination__per-page {
      font-size: var(--ux-font-size-xs);
    }

    .ux-pagination--sm .ux-pagination__per-page select {
      font-size: var(--ux-font-size-xs);
      padding: 2px var(--ux-space-xs);
      padding-right: calc(var(--ux-space-xs) + 14px);
      background-size: 12px;
    }

    /* Large */
    .ux-pagination--lg .ux-pagination__btn {
      min-width: 44px;
      height: 44px;
      font-size: var(--ux-font-size-md);
      border-radius: var(--ux-border-radius-lg);
    }

    .ux-pagination--lg .ux-pagination__prev svg,
    .ux-pagination--lg .ux-pagination__next svg {
      width: 22px;
      height: 22px;
    }

    .ux-pagination--lg .ux-pagination__ellipsis {
      min-width: 44px;
      height: 44px;
      font-size: var(--ux-font-size-md);
    }

    .ux-pagination--lg .ux-pagination__info {
      font-size: var(--ux-font-size-md);
    }

    .ux-pagination--lg .ux-pagination__per-page {
      font-size: var(--ux-font-size-md);
    }

    .ux-pagination--lg .ux-pagination__per-page select {
      font-size: var(--ux-font-size-md);
      padding: var(--ux-space-sm) var(--ux-space-md);
      padding-right: calc(var(--ux-space-md) + 20px);
      background-size: 18px;
    }

    /* ========================================
       Simple Variant (Prev/Next only)
    ======================================== */

    .ux-pagination--simple {
      justify-content: center;
    }

    .ux-pagination--simple .ux-pagination__controls {
      gap: var(--ux-space-md);
    }

    .ux-pagination--simple .ux-pagination__current {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      font-weight: 500;
    }

    .ux-pagination--simple .ux-pagination__current-separator {
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-pagination--glass {
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-pagination--glass .ux-pagination__btn {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-pagination--glass .ux-pagination__btn:hover:not(:disabled):not(.ux-pagination__btn--active) {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
    }

    .ux-pagination--glass .ux-pagination__btn--active {
      background: var(--ux-glass-bg-thick);
      border-color: var(--ux-glass-border);
      color: var(--ux-text);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-pagination--glass .ux-pagination__per-page select {
      background-color: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-pagination--glass .ux-pagination__per-page select:hover,
    .ux-pagination--glass .ux-pagination__per-page select:focus {
      background-color: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Bordered Variant
    ======================================== */

    .ux-pagination--bordered {
      border: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Compact Layout (no info, centered)
    ======================================== */

    .ux-pagination--compact {
      justify-content: center;
      padding: var(--ux-space-sm);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-pagination {
        flex-direction: column;
        align-items: center;
        gap: var(--ux-space-sm);
      }

      .ux-pagination__info {
        order: 2;
      }

      .ux-pagination__controls {
        order: 1;
      }

      .ux-pagination__per-page {
        order: 3;
      }

      /* Hide page numbers on mobile, show simple nav */
      .ux-pagination:not(.ux-pagination--simple) .ux-pagination__btn:not(.ux-pagination__prev):not(.ux-pagination__next) {
        display: none;
      }

      .ux-pagination:not(.ux-pagination--simple) .ux-pagination__ellipsis {
        display: none;
      }

      /* Show current page indicator on mobile */
      .ux-pagination__mobile-current {
        display: flex;
        align-items: center;
        font-size: var(--ux-font-size-sm);
        color: var(--ux-text);
        font-weight: 500;
        gap: var(--ux-space-xs);
      }

      .ux-pagination__mobile-current-separator {
        color: var(--ux-text-tertiary);
      }
    }

    @media (min-width: 768px) {
      .ux-pagination__mobile-current {
        display: none;
      }
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-pagination--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-pagination__btn {
        transition: none;
      }

      .ux-pagination__btn:active:not(:disabled) {
        transform: none;
      }

      .ux-pagination__per-page select {
        transition: none;
      }
    }
  `;

  // Icons
  const icons = {
    chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    chevronsLeft: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    chevronsRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7l5 5-5 5M6 7l5 5-5 5"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-pagination-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-pagination-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for pagination
  // ARIA: role="navigation", aria-label for pagination
  const paginationComponent = (config = {}) => ({
    // State
    currentPage: config.currentPage || 1,
    totalPages: config.totalPages || 1,
    totalItems: config.totalItems || 0,
    perPage: config.perPage || 10,
    perPageOptions: config.perPageOptions || [10, 25, 50, 100],

    // Options
    showInfo: config.showInfo !== false,
    showPerPage: config.showPerPage !== false,
    showFirstLast: config.showFirstLast || false,
    siblingCount: config.siblingCount || 1,
    boundaryCount: config.boundaryCount || 1,
    disabled: config.disabled || false,

    // Labels (for i18n)
    labels: {
      showing: config.labels?.showing || 'Showing',
      to: config.labels?.to || 'to',
      of: config.labels?.of || 'of',
      items: config.labels?.items || 'items',
      perPage: config.labels?.perPage || 'per page',
      first: config.labels?.first || 'First',
      last: config.labels?.last || 'Last',
      previous: config.labels?.previous || 'Previous',
      next: config.labels?.next || 'Next',
      page: config.labels?.page || 'Page',
      ...config.labels
    },

    // Component ID
    paginationId: config.id || 'ux-pagination-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for navigation
    get ariaAttrs() {
      return {
        'role': 'navigation',
        'aria-label': config.ariaLabel || 'Pagination navigation'
      };
    },

    // Initialize
    init() {
      // Validate current page
      this.validateCurrentPage();

      // Watch for external changes
      this.$watch('totalPages', () => this.validateCurrentPage());
      this.$watch('totalItems', () => this.recalculateTotalPages());
    },

    // Validate and adjust current page
    validateCurrentPage() {
      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
    },

    // Recalculate total pages when totalItems changes
    recalculateTotalPages() {
      if (this.totalItems > 0) {
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
        this.validateCurrentPage();
      }
    },

    // Computed: Visible pages with ellipsis
    get visiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const sibling = this.siblingCount;
      const boundary = this.boundaryCount;

      if (total <= 0) return [];

      // Calculate range
      const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
      };

      // Total page numbers to display (excluding ellipsis)
      const totalPageNumbers = boundary * 2 + sibling * 2 + 3;

      // If total pages is less than page numbers we want to show
      if (total <= totalPageNumbers) {
        return range(1, total);
      }

      const leftSiblingIndex = Math.max(current - sibling, boundary + 1);
      const rightSiblingIndex = Math.min(current + sibling, total - boundary);

      const showLeftEllipsis = leftSiblingIndex > boundary + 2;
      const showRightEllipsis = rightSiblingIndex < total - boundary - 1;

      const pages = [];

      // Add left boundary pages
      for (let i = 1; i <= boundary; i++) {
        pages.push(i);
      }

      // Add left ellipsis
      if (showLeftEllipsis) {
        pages.push('...');
      } else if (boundary + 1 < leftSiblingIndex) {
        // Add pages between boundary and sibling
        for (let i = boundary + 1; i < leftSiblingIndex; i++) {
          pages.push(i);
        }
      }

      // Add sibling pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i > boundary && i <= total - boundary) {
          pages.push(i);
        }
      }

      // Add right ellipsis
      if (showRightEllipsis) {
        pages.push('...');
      } else if (rightSiblingIndex < total - boundary) {
        // Add pages between sibling and boundary
        for (let i = rightSiblingIndex + 1; i <= total - boundary; i++) {
          pages.push(i);
        }
      }

      // Add right boundary pages
      for (let i = total - boundary + 1; i <= total; i++) {
        if (i > boundary) {
          pages.push(i);
        }
      }

      return pages;
    },

    // Computed: Showing info text
    get showingInfo() {
      if (this.totalItems <= 0) return '';

      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(this.currentPage * this.perPage, this.totalItems);

      return {
        start,
        end,
        total: this.totalItems,
        text: `${this.labels.showing} ${start} ${this.labels.to} ${end} ${this.labels.of} ${this.totalItems} ${this.labels.items}`
      };
    },

    // Computed: Can go previous
    get canGoPrevious() {
      return this.currentPage > 1 && !this.disabled;
    },

    // Computed: Can go next
    get canGoNext() {
      return this.currentPage < this.totalPages && !this.disabled;
    },

    // Computed: Can go first
    get canGoFirst() {
      return this.currentPage > 1 && !this.disabled;
    },

    // Computed: Can go last
    get canGoLast() {
      return this.currentPage < this.totalPages && !this.disabled;
    },

    // Navigate to page
    goToPage(page) {
      if (this.disabled) return;
      if (typeof page !== 'number') return;
      if (page < 1 || page > this.totalPages) return;
      if (page === this.currentPage) return;

      this.currentPage = page;
      this.$dispatch('page-change', {
        page: this.currentPage,
        perPage: this.perPage,
        totalPages: this.totalPages,
        totalItems: this.totalItems
      });
    },

    // Previous page
    prevPage() {
      if (this.canGoPrevious) {
        this.goToPage(this.currentPage - 1);
      }
    },

    // Next page
    nextPage() {
      if (this.canGoNext) {
        this.goToPage(this.currentPage + 1);
      }
    },

    // First page
    firstPage() {
      if (this.canGoFirst) {
        this.goToPage(1);
      }
    },

    // Last page
    lastPage() {
      if (this.canGoLast) {
        this.goToPage(this.totalPages);
      }
    },

    // Change per page
    changePerPage(value) {
      if (this.disabled) return;

      const newPerPage = parseInt(value);
      if (isNaN(newPerPage) || newPerPage < 1) return;

      this.perPage = newPerPage;

      // Recalculate total pages if we have totalItems
      if (this.totalItems > 0) {
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
      }

      // Adjust current page if needed
      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }

      this.$dispatch('per-page-change', {
        perPage: this.perPage,
        page: this.currentPage,
        totalPages: this.totalPages,
        totalItems: this.totalItems
      });
    },

    // Check if page is active
    isActive(page) {
      return this.currentPage === page;
    },

    // Get button aria label
    getPageAriaLabel(page) {
      if (page === '...') return null;
      if (this.isActive(page)) {
        return `${this.labels.page} ${page}, current page`;
      }
      return `Go to ${this.labels.page.toLowerCase()} ${page}`;
    },

    // Get icon
    getIcon(name) {
      return icons[name] || '';
    },

    // Update state externally
    setPage(page) {
      this.currentPage = page;
      this.validateCurrentPage();
    },

    setTotalPages(total) {
      this.totalPages = total;
      this.validateCurrentPage();
    },

    setTotalItems(total) {
      this.totalItems = total;
      this.recalculateTotalPages();
    },

    setPerPage(perPage) {
      this.changePerPage(perPage);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPagination', paginationComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPagination', paginationComponent);
    });
  }
})();
