/**
 * UX Product Card Component
 * Product cards for POS and e-commerce grids
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Product Card
    ======================================== */

    :root {
      --ux-product-card-radius: var(--ux-border-radius-lg);
      --ux-product-card-padding: var(--ux-space-sm);
      --ux-product-card-image-ratio: 1;
      --ux-product-card-gap: var(--ux-space-xs);
    }

    .ux-product-card {
      display: flex;
      flex-direction: column;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-product-card-radius);
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        transform 150ms var(--ux-ease),
        box-shadow 150ms var(--ux-ease),
        border-color 150ms var(--ux-ease);
    }

    .ux-product-card:hover {
      border-color: var(--ux-primary);
      box-shadow: var(--ux-shadow-md);
    }

    .ux-product-card:active {
      transform: scale(0.97);
    }

    /* Disabled/Unavailable state */
    .ux-product-card--unavailable {
      opacity: 0.5;
      pointer-events: none;
    }

    .ux-product-card--out-of-stock {
      position: relative;
    }

    .ux-product-card--out-of-stock::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(var(--ux-gray-900-rgb, 17, 24, 39), 0.4);
      border-radius: var(--ux-product-card-radius);
    }

    /* Selected state */
    .ux-product-card--selected {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 2px rgba(var(--ux-primary-rgb), 0.3);
    }

    /* ========================================
       Product Image
    ======================================== */

    .ux-product-card__image-wrapper {
      position: relative;
      aspect-ratio: var(--ux-product-card-image-ratio);
      background-color: var(--ux-surface-secondary);
      overflow: hidden;
    }

    .ux-product-card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 300ms var(--ux-ease);
    }

    .ux-product-card:hover .ux-product-card__image {
      transform: scale(1.05);
    }

    /* Placeholder when no image */
    .ux-product-card__placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--ux-surface-secondary) 0%, var(--ux-surface-tertiary) 100%);
      color: var(--ux-text-tertiary);
    }

    .ux-product-card__placeholder svg {
      width: 48px;
      height: 48px;
      opacity: 0.5;
    }

    /* ========================================
       Product Badges
    ======================================== */

    .ux-product-card__badges {
      position: absolute;
      top: var(--ux-space-xs);
      left: var(--ux-space-xs);
      right: var(--ux-space-xs);
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
      z-index: 2;
    }

    .ux-product-card__badge {
      display: inline-flex;
      align-items: center;
      padding: 2px var(--ux-space-xs);
      background-color: var(--ux-primary);
      border-radius: var(--ux-border-radius-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-primary-contrast);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-product-card__badge--sale {
      background-color: var(--ux-danger);
      color: white;
    }

    .ux-product-card__badge--new {
      background-color: var(--ux-success);
      color: white;
    }

    .ux-product-card__badge--low-stock {
      background-color: var(--ux-warning);
      color: var(--ux-gray-900);
    }

    .ux-product-card__badge--out {
      background-color: var(--ux-gray-600);
      color: white;
    }

    /* ========================================
       Product Content
    ======================================== */

    .ux-product-card__content {
      display: flex;
      flex-direction: column;
      gap: var(--ux-product-card-gap);
      padding: var(--ux-product-card-padding);
      flex: 1;
    }

    .ux-product-card__name {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    .ux-product-card__category {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-product-card__sku {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      font-family: monospace;
    }

    /* ========================================
       Product Price
    ======================================== */

    .ux-product-card__price-wrapper {
      display: flex;
      align-items: baseline;
      gap: var(--ux-space-xs);
      flex-wrap: wrap;
    }

    .ux-product-card__price {
      font-size: var(--ux-font-size-lg);
      font-weight: 700;
      color: var(--ux-text);
      font-variant-numeric: tabular-nums;
    }

    .ux-product-card__price--sale {
      color: var(--ux-danger);
    }

    .ux-product-card__price-original {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      text-decoration: line-through;
    }

    .ux-product-card__discount {
      font-size: var(--ux-font-size-xs);
      font-weight: 600;
      color: var(--ux-danger);
      background-color: rgba(var(--ux-danger-rgb, 255, 59, 48), 0.1);
      padding: 1px var(--ux-space-xs);
      border-radius: var(--ux-border-radius-sm);
    }

    /* ========================================
       Product Stock
    ======================================== */

    .ux-product-card__stock {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-product-card__stock--low {
      color: var(--ux-warning);
    }

    .ux-product-card__stock--out {
      color: var(--ux-danger);
    }

    .ux-product-card__stock--available {
      color: var(--ux-success);
    }

    /* ========================================
       Quick Add Button
    ======================================== */

    .ux-product-card__quick-add {
      position: absolute;
      bottom: var(--ux-space-sm);
      right: var(--ux-space-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: var(--ux-primary);
      border: none;
      border-radius: 50%;
      color: var(--ux-primary-contrast);
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition:
        opacity 150ms var(--ux-ease),
        transform 150ms var(--ux-ease),
        background-color 150ms var(--ux-ease);
      z-index: 3;
    }

    .ux-product-card:hover .ux-product-card__quick-add {
      opacity: 1;
      transform: scale(1);
    }

    .ux-product-card__quick-add:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-product-card__quick-add:active {
      transform: scale(0.9);
    }

    .ux-product-card__quick-add svg {
      width: 20px;
      height: 20px;
    }

    /* Always show quick add on touch devices */
    @media (hover: none) {
      .ux-product-card__quick-add {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* ========================================
       Product Grid
    ======================================== */

    .ux-product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-product-grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-product-grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-product-grid--4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .ux-product-grid--5 {
      grid-template-columns: repeat(5, 1fr);
    }

    .ux-product-grid--6 {
      grid-template-columns: repeat(6, 1fr);
    }

    .ux-product-grid--compact {
      gap: var(--ux-space-sm);
    }

    /* Responsive grid */
    @media (max-width: 991px) {
      .ux-product-grid--4,
      .ux-product-grid--5,
      .ux-product-grid--6 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 767px) {
      .ux-product-grid--3,
      .ux-product-grid--4,
      .ux-product-grid--5,
      .ux-product-grid--6 {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-product-grid {
        gap: var(--ux-space-sm);
      }
    }

    /* ========================================
       Card Sizes
    ======================================== */

    .ux-product-card--sm {
      --ux-product-card-padding: var(--ux-space-xs);
    }

    .ux-product-card--sm .ux-product-card__name {
      font-size: var(--ux-font-size-xs);
      -webkit-line-clamp: 1;
    }

    .ux-product-card--sm .ux-product-card__price {
      font-size: var(--ux-font-size-md);
    }

    .ux-product-card--lg {
      --ux-product-card-padding: var(--ux-space-md);
    }

    .ux-product-card--lg .ux-product-card__name {
      font-size: var(--ux-font-size-md);
    }

    .ux-product-card--lg .ux-product-card__price {
      font-size: var(--ux-font-size-xl);
    }

    /* ========================================
       Horizontal Layout
    ======================================== */

    .ux-product-card--horizontal {
      flex-direction: row;
    }

    .ux-product-card--horizontal .ux-product-card__image-wrapper {
      width: 100px;
      min-height: 100px;
      aspect-ratio: 1;
      flex-shrink: 0;
    }

    .ux-product-card--horizontal .ux-product-card__content {
      justify-content: center;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-product-card--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-product-card--glass .ux-product-card__placeholder {
      background: var(--ux-glass-bg-thin);
    }

    /* ========================================
       Add to Cart Animation
    ======================================== */

    @keyframes ux-product-add-pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(var(--ux-primary-rgb), 0.4);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(var(--ux-primary-rgb), 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(var(--ux-primary-rgb), 0);
      }
    }

    .ux-product-card--adding {
      animation: ux-product-add-pulse 0.5s ease-out;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-product-card {
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-product-card {
      border-color: var(--ux-border-color);
    }
  `;

  // Icons
  const icons = {
    placeholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    cart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-product-card-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-product-card-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for product card
  const productCardComponent = (config = {}) => ({
    // Product data
    product: config.product || {},

    // State
    isAdding: false,
    isSelected: false,

    // Configuration
    showQuickAdd: config.showQuickAdd !== false,
    currency: config.currency || '$',
    locale: config.locale || 'en-US',
    lowStockThreshold: config.lowStockThreshold || 5,

    // Labels
    labels: {
      addToCart: config.labels?.addToCart || 'Add to cart',
      outOfStock: config.labels?.outOfStock || 'Out of stock',
      lowStock: config.labels?.lowStock || 'Low stock',
      inStock: config.labels?.inStock || 'In stock',
      sale: config.labels?.sale || 'Sale',
      new: config.labels?.new || 'New',
      ...config.labels
    },

    // Initialize
    init() {
      // Set initial selected state
      if (config.selected) {
        this.isSelected = true;
      }
    },

    // Format price
    formatPrice(price) {
      if (price === null || price === undefined) return '';
      return new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.getCurrencyCode()
      }).format(price);
    },

    // Get currency code from symbol
    getCurrencyCode() {
      const currencyMap = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '¥': 'JPY',
        '₹': 'INR'
      };
      return currencyMap[this.currency] || 'USD';
    },

    // Calculate discount percentage
    getDiscountPercent() {
      if (!this.product.originalPrice || !this.product.price) return 0;
      const discount = ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100;
      return Math.round(discount);
    },

    // Get stock status
    getStockStatus() {
      const stock = this.product.stock;
      if (stock === undefined || stock === null) return 'available';
      if (stock <= 0) return 'out';
      if (stock <= this.lowStockThreshold) return 'low';
      return 'available';
    },

    // Get stock text
    getStockText() {
      const status = this.getStockStatus();
      const stock = this.product.stock;

      switch (status) {
        case 'out':
          return this.labels.outOfStock;
        case 'low':
          return `${this.labels.lowStock}: ${stock}`;
        default:
          return stock !== undefined ? `${this.labels.inStock}: ${stock}` : '';
      }
    },

    // Check if product is available
    isAvailable() {
      return this.getStockStatus() !== 'out';
    },

    // Add to cart with animation
    addToCart(event) {
      if (event) event.stopPropagation();
      if (!this.isAvailable()) return;

      this.isAdding = true;

      this.$dispatch('product-add', {
        product: this.product,
        quantity: 1
      });

      // Reset animation after delay
      setTimeout(() => {
        this.isAdding = false;
      }, 500);
    },

    // Select product
    select() {
      this.$dispatch('product-select', {
        product: this.product,
        selected: !this.isSelected
      });
    },

    // Get icon
    getIcon(name) {
      return icons[name] || '';
    }
  });

  // Alpine component for product grid
  const productGridComponent = (config = {}) => ({
    products: config.products || [],
    selectedProducts: [],
    multiSelect: config.multiSelect || false,

    // Filter and sort
    searchQuery: '',
    sortBy: config.sortBy || 'name',
    sortDirection: 'asc',
    categoryFilter: '',

    // Get filtered products
    get filteredProducts() {
      let result = this.products;

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(p =>
          p.name?.toLowerCase().includes(query) ||
          p.sku?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (this.categoryFilter) {
        result = result.filter(p => p.category === this.categoryFilter);
      }

      // Sort
      result = [...result].sort((a, b) => {
        let valA = a[this.sortBy];
        let valB = b[this.sortBy];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB?.toLowerCase() || '';
        }

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      return result;
    },

    // Get unique categories
    get categories() {
      const cats = new Set();
      this.products.forEach(p => {
        if (p.category) cats.add(p.category);
      });
      return Array.from(cats).sort();
    },

    // Toggle product selection
    toggleSelect(product) {
      const index = this.selectedProducts.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
      } else {
        if (!this.multiSelect) {
          this.selectedProducts = [];
        }
        this.selectedProducts.push(product);
      }
      this.$dispatch('selection-change', { selected: this.selectedProducts });
    },

    // Check if product is selected
    isSelected(product) {
      return this.selectedProducts.some(p => p.id === product.id);
    },

    // Clear selection
    clearSelection() {
      this.selectedProducts = [];
      this.$dispatch('selection-change', { selected: [] });
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxProductCard', productCardComponent);
    window.UX.registerComponent('uxProductGrid', productGridComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxProductCard', productCardComponent);
      Alpine.data('uxProductGrid', productGridComponent);
    });
  }
})();
