/**
 * UX Masonry Component
 * CSS Grid-based masonry layout with responsive columns and animations
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Masonry - CSS Variables
    ======================================== */

    :root {
      --ux-masonry-gap: var(--ux-space-md);
      --ux-masonry-radius: var(--ux-radius-lg);
      --ux-masonry-columns: 3;
      --ux-masonry-item-bg: var(--ux-surface);
    }

    /* ========================================
       UX Masonry - Base
    ======================================== */

    .ux-masonry {
      font-family: var(--ux-font-family);
    }

    .ux-masonry__grid {
      display: block;
      column-count: var(--ux-masonry-columns);
      column-gap: var(--ux-masonry-gap);
    }

    /* ========================================
       Column Variants
    ======================================== */

    .ux-masonry--cols-2 { --ux-masonry-columns: 2; }
    .ux-masonry--cols-3 { --ux-masonry-columns: 3; }
    .ux-masonry--cols-4 { --ux-masonry-columns: 4; }
    .ux-masonry--cols-5 { --ux-masonry-columns: 5; }
    .ux-masonry--cols-6 { --ux-masonry-columns: 6; }

    /* ========================================
       Gap Variants
    ======================================== */

    .ux-masonry--gap-none { --ux-masonry-gap: 0; }
    .ux-masonry--gap-xs { --ux-masonry-gap: var(--ux-space-xs); }
    .ux-masonry--gap-sm { --ux-masonry-gap: var(--ux-space-sm); }
    .ux-masonry--gap-md { --ux-masonry-gap: var(--ux-space-md); }
    .ux-masonry--gap-lg { --ux-masonry-gap: var(--ux-space-lg); }
    .ux-masonry--gap-xl { --ux-masonry-gap: var(--ux-space-xl); }

    /* ========================================
       Masonry Item
    ======================================== */

    .ux-masonry__item {
      position: relative;
      display: block;
      break-inside: avoid;
      margin-bottom: var(--ux-masonry-gap);
      overflow: hidden;
      border-radius: var(--ux-masonry-radius);
      background: var(--ux-masonry-item-bg);
    }

    /* Prevent orphans and widows */
    .ux-masonry__item:last-child {
      margin-bottom: 0;
    }

    /* ========================================
       Masonry Item - Image
    ======================================== */

    .ux-masonry__item img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: inherit;
      object-fit: cover;
      transition: transform var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-masonry__item--hover:hover img {
      transform: scale(1.05);
    }

    /* ========================================
       Masonry Item - Overlay
    ======================================== */

    .ux-masonry__item-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0);
      color: white;
      padding: var(--ux-space-md);
      text-align: center;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-masonry__item:hover .ux-masonry__item-overlay {
      background: rgba(0, 0, 0, 0.4);
    }

    .ux-masonry__item-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      margin-bottom: var(--ux-space-xs);
      opacity: 0;
      transform: translateY(10px);
      transition: all var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-masonry__item-subtitle {
      font-size: var(--ux-font-size-sm);
      opacity: 0;
      transform: translateY(10px);
      transition: all var(--ux-transition-normal) var(--ux-ease);
      transition-delay: 50ms;
    }

    .ux-masonry__item:hover .ux-masonry__item-title,
    .ux-masonry__item:hover .ux-masonry__item-subtitle {
      opacity: 1;
      transform: translateY(0);
    }

    /* ========================================
       Masonry Item - Content (for cards)
    ======================================== */

    .ux-masonry__item-content {
      padding: var(--ux-space-md);
    }

    .ux-masonry__item-content .ux-masonry__item-title {
      color: var(--ux-text);
      opacity: 1;
      transform: none;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-masonry__item-content .ux-masonry__item-subtitle {
      color: var(--ux-text-secondary);
      opacity: 1;
      transform: none;
    }

    /* ========================================
       Masonry Item - Clickable
    ======================================== */

    .ux-masonry__item--clickable {
      cursor: pointer;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-masonry__item--clickable:hover {
      box-shadow: var(--ux-shadow-lg);
    }

    .ux-masonry__item--clickable:active {
      transform: scale(0.98);
    }

    .ux-masonry__item--clickable:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.3);
    }

    /* ========================================
       Masonry Item - Span (double width/height)
    ======================================== */

    .ux-masonry__item--span-2 {
      column-span: all;
      width: calc((100% - var(--ux-masonry-gap)) / 2);
    }

    /* ========================================
       Animation on Load
    ======================================== */

    .ux-masonry--animated .ux-masonry__item {
      opacity: 0;
      transform: translateY(20px);
      animation: ux-masonry-fade-in var(--ux-transition-slow) var(--ux-ease) forwards;
    }

    .ux-masonry--animated .ux-masonry__item:nth-child(1) { animation-delay: 0ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(2) { animation-delay: 50ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(3) { animation-delay: 100ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(4) { animation-delay: 150ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(5) { animation-delay: 200ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(6) { animation-delay: 250ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(7) { animation-delay: 300ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(8) { animation-delay: 350ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(9) { animation-delay: 400ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(10) { animation-delay: 450ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(11) { animation-delay: 500ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(12) { animation-delay: 550ms; }
    .ux-masonry--animated .ux-masonry__item:nth-child(n+13) { animation-delay: 600ms; }

    @keyframes ux-masonry-fade-in {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ========================================
       Loading State / Skeleton
    ======================================== */

    .ux-masonry__item--loading {
      min-height: 200px;
      background: linear-gradient(
        90deg,
        var(--ux-gray-100) 0%,
        var(--ux-gray-200) 50%,
        var(--ux-gray-100) 100%
      );
      background-size: 200% 100%;
      animation: ux-masonry-shimmer 1.5s infinite;
    }

    @keyframes ux-masonry-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Image loading state */
    .ux-masonry__item img[loading="lazy"]:not([src]),
    .ux-masonry__item img.ux-masonry__img--loading {
      min-height: 200px;
      background: var(--ux-gray-100);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-masonry__item--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-masonry__item--glass .ux-masonry__item-content {
      background: transparent;
    }

    /* ========================================
       Rounded Variants
    ======================================== */

    .ux-masonry--rounded-none .ux-masonry__item { border-radius: 0; }
    .ux-masonry--rounded-sm .ux-masonry__item { border-radius: var(--ux-radius-sm); }
    .ux-masonry--rounded-md .ux-masonry__item { border-radius: var(--ux-radius-md); }
    .ux-masonry--rounded-lg .ux-masonry__item { border-radius: var(--ux-radius-lg); }
    .ux-masonry--rounded-xl .ux-masonry__item { border-radius: var(--ux-radius-xl); }

    /* ========================================
       Shadow Variants
    ======================================== */

    .ux-masonry--shadow-none .ux-masonry__item { box-shadow: none; }
    .ux-masonry--shadow-sm .ux-masonry__item { box-shadow: var(--ux-shadow-sm); }
    .ux-masonry--shadow-md .ux-masonry__item { box-shadow: var(--ux-shadow-md); }
    .ux-masonry--shadow-lg .ux-masonry__item { box-shadow: var(--ux-shadow-lg); }

    /* ========================================
       Responsive Breakpoints
    ======================================== */

    @media (max-width: 1200px) {
      .ux-masonry--cols-6 { --ux-masonry-columns: 4; }
      .ux-masonry--cols-5 { --ux-masonry-columns: 4; }
    }

    @media (max-width: 992px) {
      .ux-masonry--cols-6 { --ux-masonry-columns: 3; }
      .ux-masonry--cols-5 { --ux-masonry-columns: 3; }
      .ux-masonry--cols-4 { --ux-masonry-columns: 3; }
    }

    @media (max-width: 767px) {
      .ux-masonry--cols-6,
      .ux-masonry--cols-5,
      .ux-masonry--cols-4,
      .ux-masonry--cols-3 {
        --ux-masonry-columns: 2;
      }
    }

    @media (max-width: 480px) {
      .ux-masonry--cols-6,
      .ux-masonry--cols-5,
      .ux-masonry--cols-4,
      .ux-masonry--cols-3 {
        --ux-masonry-columns: 1;
      }

      .ux-masonry--cols-2 {
        --ux-masonry-columns: 1;
      }
    }

    /* Keep 2 columns on mobile if explicitly set */
    .ux-masonry--cols-2-always {
      --ux-masonry-columns: 2 !important;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-theme-light):not(.ux-light) {
        --ux-masonry-item-bg: var(--ux-surface);
      }

      :root:not(.ux-theme-light):not(.ux-light) .ux-masonry__item--loading {
        background: linear-gradient(
          90deg,
          var(--ux-gray-800) 0%,
          var(--ux-gray-700) 50%,
          var(--ux-gray-800) 100%
        );
        background-size: 200% 100%;
      }

      :root:not(.ux-theme-light):not(.ux-light) .ux-masonry__item img[loading="lazy"]:not([src]),
      :root:not(.ux-theme-light):not(.ux-light) .ux-masonry__item img.ux-masonry__img--loading {
        background: var(--ux-gray-800);
      }
    }

    .ux-dark .ux-masonry__item--loading,
    .ux-theme-dark .ux-masonry__item--loading {
      background: linear-gradient(
        90deg,
        var(--ux-gray-800) 0%,
        var(--ux-gray-700) 50%,
        var(--ux-gray-800) 100%
      );
      background-size: 200% 100%;
    }

    .ux-dark .ux-masonry__item img[loading="lazy"]:not([src]),
    .ux-dark .ux-masonry__item img.ux-masonry__img--loading,
    .ux-theme-dark .ux-masonry__item img[loading="lazy"]:not([src]),
    .ux-theme-dark .ux-masonry__item img.ux-masonry__img--loading {
      background: var(--ux-gray-800);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-masonry--animated .ux-masonry__item {
        animation: none;
        opacity: 1;
        transform: none;
      }

      .ux-masonry__item img,
      .ux-masonry__item-overlay,
      .ux-masonry__item-title,
      .ux-masonry__item-subtitle,
      .ux-masonry__item--clickable {
        transition: none;
      }

      .ux-masonry__item--loading {
        animation: none;
      }

      .ux-masonry__item--hover:hover img {
        transform: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-masonry-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-masonry-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Intersection Observer for lazy loading animation
  let animationObserver = null;

  function getAnimationObserver() {
    if (animationObserver) return animationObserver;

    if ('IntersectionObserver' in window) {
      animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
    }

    return animationObserver;
  }

  // Alpine.js component
  const masonryData = (options = {}) => ({
    // Items array: [{ src, title, subtitle, href }]
    items: options.items || [],

    // Configuration
    columns: options.columns || 3,
    gap: options.gap || 'md',
    animated: options.animated ?? true,
    hoverEffect: options.hoverEffect ?? true,
    lazyLoad: options.lazyLoad ?? true,
    rounded: options.rounded || 'lg',
    shadow: options.shadow || 'none',

    // State
    loaded: [],

    init() {
      // Initialize loaded state for each item
      this.loaded = new Array(this.items.length).fill(false);

      // Observe items for animation
      if (this.animated) {
        this.$nextTick(() => {
          const obs = getAnimationObserver();
          if (obs) {
            const items = this.$el.querySelectorAll('.ux-masonry__item');
            items.forEach(item => {
              item.style.animationPlayState = 'paused';
              obs.observe(item);
            });
          }
        });
      }
    },

    // Mark image as loaded
    onImageLoad(index) {
      this.loaded[index] = true;
      this.$dispatch('masonry:image-load', { index, item: this.items[index] });
    },

    // Mark image as error
    onImageError(index) {
      this.$dispatch('masonry:image-error', { index, item: this.items[index] });
    },

    // Get column class
    get columnClass() {
      return `ux-masonry--cols-${this.columns}`;
    },

    // Get gap class
    get gapClass() {
      return `ux-masonry--gap-${this.gap}`;
    },

    // Get rounded class
    get roundedClass() {
      return `ux-masonry--rounded-${this.rounded}`;
    },

    // Get shadow class
    get shadowClass() {
      return `ux-masonry--shadow-${this.shadow}`;
    },

    // Get container classes
    get containerClasses() {
      return {
        [this.columnClass]: true,
        [this.gapClass]: true,
        [this.roundedClass]: true,
        [this.shadowClass]: true,
        'ux-masonry--animated': this.animated
      };
    },

    // Set items
    setItems(items) {
      this.items = items;
      this.loaded = new Array(items.length).fill(false);
    },

    // Add item
    addItem(item) {
      this.items.push(item);
      this.loaded.push(false);
    },

    // Remove item
    removeItem(index) {
      this.items.splice(index, 1);
      this.loaded.splice(index, 1);
    },

    // Refresh layout (for dynamic content)
    refresh() {
      this.$nextTick(() => {
        this.$dispatch('masonry:refresh');
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxMasonry', masonryData);
  }

})();
