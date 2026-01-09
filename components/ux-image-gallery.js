/**
 * UX Image Gallery Component
 * Responsive image gallery with lightbox, thumbnails, and multiple layouts
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Image Gallery - Base
    ======================================== */

    .ux-gallery {
      --ux-gallery-gap: 0.5rem;
      --ux-gallery-radius: var(--ux-radius-md);
      --ux-gallery-thumb-size: 80px;

      font-family: var(--ux-font-family);
    }

    /* ========================================
       Grid Layout
    ======================================== */

    .ux-gallery__grid {
      display: grid;
      gap: var(--ux-gallery-gap);
    }

    .ux-gallery--cols-2 .ux-gallery__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .ux-gallery--cols-3 .ux-gallery__grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .ux-gallery--cols-4 .ux-gallery__grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .ux-gallery--cols-5 .ux-gallery__grid {
      grid-template-columns: repeat(5, 1fr);
    }

    .ux-gallery--cols-auto .ux-gallery__grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    /* ========================================
       Gallery Item
    ======================================== */

    .ux-gallery__item {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--ux-gallery-radius);
      cursor: pointer;
      background: var(--ux-gray-100);
    }

    .ux-gallery__item:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.3);
    }

    .ux-gallery__item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-gallery__item:hover img {
      transform: scale(1.05);
    }

    /* Item overlay */
    .ux-gallery__item-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0);
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-gallery__item:hover .ux-gallery__item-overlay {
      background: rgba(0, 0, 0, 0.3);
    }

    .ux-gallery__item-icon {
      width: 32px;
      height: 32px;
      color: white;
      opacity: 0;
      transform: scale(0.8);
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-gallery__item:hover .ux-gallery__item-icon {
      opacity: 1;
      transform: scale(1);
    }

    /* More indicator */
    .ux-gallery__more {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    /* ========================================
       Aspect Ratios
    ======================================== */

    .ux-gallery--square .ux-gallery__item {
      aspect-ratio: 1;
    }

    .ux-gallery--landscape .ux-gallery__item {
      aspect-ratio: 4/3;
    }

    .ux-gallery--portrait .ux-gallery__item {
      aspect-ratio: 3/4;
    }

    .ux-gallery--wide .ux-gallery__item {
      aspect-ratio: 16/9;
    }

    /* ========================================
       Masonry Layout
    ======================================== */

    .ux-gallery--masonry .ux-gallery__grid {
      display: block;
      column-count: 3;
      column-gap: var(--ux-gallery-gap);
    }

    .ux-gallery--masonry .ux-gallery__item {
      aspect-ratio: auto;
      break-inside: avoid;
      margin-bottom: var(--ux-gallery-gap);
    }

    .ux-gallery--masonry.ux-gallery--cols-2 .ux-gallery__grid {
      column-count: 2;
    }

    .ux-gallery--masonry.ux-gallery--cols-4 .ux-gallery__grid {
      column-count: 4;
    }

    /* ========================================
       Featured Layout (First image large)
    ======================================== */

    .ux-gallery--featured .ux-gallery__grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: repeat(2, 1fr);
    }

    .ux-gallery--featured .ux-gallery__item:first-child {
      grid-row: span 2;
    }

    /* ========================================
       Lightbox
    ======================================== */

    .ux-gallery-lightbox {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.95);
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-gallery-lightbox--open {
      opacity: 1;
      visibility: visible;
    }

    .ux-gallery-lightbox__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      color: white;
    }

    .ux-gallery-lightbox__counter {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .ux-gallery-lightbox__actions {
      display: flex;
      gap: 0.5rem;
    }

    .ux-gallery-lightbox__action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-full);
      color: white;
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-gallery-lightbox__action:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-gallery-lightbox__action svg {
      width: 24px;
      height: 24px;
    }

    .ux-gallery-lightbox__content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 4rem;
      overflow: hidden;
    }

    .ux-gallery-lightbox__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      user-select: none;
      transform: scale(1);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-gallery-lightbox__image--zoomed {
      cursor: zoom-out;
    }

    .ux-gallery-lightbox__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: var(--ux-radius-full);
      color: white;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-gallery-lightbox__nav:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-gallery-lightbox__nav:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .ux-gallery-lightbox__nav--prev {
      left: 1rem;
    }

    .ux-gallery-lightbox__nav--next {
      right: 1rem;
    }

    .ux-gallery-lightbox__nav svg {
      width: 24px;
      height: 24px;
    }

    /* Lightbox caption */
    .ux-gallery-lightbox__caption {
      padding: 1rem 1.5rem;
      text-align: center;
      color: white;
    }

    .ux-gallery-lightbox__title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .ux-gallery-lightbox__description {
      font-size: 0.875rem;
      opacity: 0.7;
    }

    /* ========================================
       Thumbnails
    ======================================== */

    .ux-gallery-lightbox__thumbs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .ux-gallery-lightbox__thumbs::-webkit-scrollbar {
      display: none;
    }

    .ux-gallery-lightbox__thumb {
      flex-shrink: 0;
      width: var(--ux-gallery-thumb-size);
      height: var(--ux-gallery-thumb-size);
      border-radius: var(--ux-radius-sm);
      overflow: hidden;
      opacity: 0.5;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      border: 2px solid transparent;
    }

    .ux-gallery-lightbox__thumb:hover {
      opacity: 0.8;
    }

    .ux-gallery-lightbox__thumb--active {
      opacity: 1;
      border-color: white;
    }

    .ux-gallery-lightbox__thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-gallery__item--loading {
      background: linear-gradient(
        90deg,
        var(--ux-gray-100) 0%,
        var(--ux-gray-200) 50%,
        var(--ux-gray-100) 100%
      );
      background-size: 200% 100%;
      animation: ux-gallery-shimmer 1.5s infinite;
    }

    @keyframes ux-gallery-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .ux-gallery-lightbox__loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-gallery-lightbox__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top-color: white;
      border-radius: 50%;
      animation: ux-spin 1s linear infinite;
    }

    @keyframes ux-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-gallery--cols-4 .ux-gallery__grid,
      .ux-gallery--cols-5 .ux-gallery__grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .ux-gallery--masonry.ux-gallery--cols-4 .ux-gallery__grid,
      .ux-gallery--masonry .ux-gallery__grid {
        column-count: 2;
      }

      .ux-gallery-lightbox__content {
        padding: 0 1rem;
      }

      .ux-gallery-lightbox__nav {
        width: 40px;
        height: 40px;
      }

      .ux-gallery-lightbox__nav--prev {
        left: 0.5rem;
      }

      .ux-gallery-lightbox__nav--next {
        right: 0.5rem;
      }

      .ux-gallery-lightbox__thumbs {
        display: none;
      }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-gallery__item {
        background: var(--ux-gray-800);
      }

      .ux-gallery__item--loading {
        background: linear-gradient(
          90deg,
          var(--ux-gray-800) 0%,
          var(--ux-gray-700) 50%,
          var(--ux-gray-800) 100%
        );
        background-size: 200% 100%;
      }
    }

    .ux-dark .ux-gallery__item {
      background: var(--ux-gray-800);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-gallery__item img,
      .ux-gallery__item-overlay,
      .ux-gallery__item-icon,
      .ux-gallery-lightbox,
      .ux-gallery-lightbox__action,
      .ux-gallery-lightbox__nav,
      .ux-gallery-lightbox__thumb,
      .ux-gallery-lightbox__image {
        transition: none;
      }

      .ux-gallery__item--loading {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-image-gallery-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-image-gallery-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'
  };

  // Alpine.js component
  const imageGalleryData = (options = {}) => ({
    // Images array: [{ src, thumb, title, description }]
    images: options.images || [],

    // Configuration
    columns: options.columns || 3,
    layout: options.layout || 'grid', // 'grid', 'masonry', 'featured'
    aspect: options.aspect || 'square', // 'square', 'landscape', 'portrait', 'wide'
    maxVisible: options.maxVisible || 0, // 0 = show all
    showThumbs: options.showThumbs ?? true,
    enableZoom: options.enableZoom ?? true,
    enableDownload: options.enableDownload ?? false,
    loop: options.loop ?? true,

    // Lightbox state
    lightboxOpen: false,
    currentIndex: 0,
    loading: false,
    zoomed: false,
    zoomLevel: 1,

    // Icons
    icons,

    init() {
      // Keyboard navigation
      this._keyHandler = (e) => {
        if (!this.lightboxOpen) return;

        switch (e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.prev();
            break;
          case 'ArrowRight':
            this.next();
            break;
        }
      };
      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      document.removeEventListener('keydown', this._keyHandler);
    },

    // Get visible images
    get visibleImages() {
      if (this.maxVisible === 0) {
        return this.images;
      }
      return this.images.slice(0, this.maxVisible);
    },

    // Get remaining count
    get remainingCount() {
      if (this.maxVisible === 0) return 0;
      return Math.max(0, this.images.length - this.maxVisible);
    },

    // Current image
    get currentImage() {
      return this.images[this.currentIndex] || {};
    },

    // Open lightbox
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxOpen = true;
      this.zoomed = false;
      this.zoomLevel = 1;

      if (window.UX) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      this.$dispatch('gallery:open', { index, image: this.currentImage });
    },

    // Close lightbox
    closeLightbox() {
      this.lightboxOpen = false;
      this.zoomed = false;
      this.zoomLevel = 1;

      if (window.UX) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }

      this.$dispatch('gallery:close');
    },

    // Go to specific image
    goTo(index) {
      if (index >= 0 && index < this.images.length) {
        this.currentIndex = index;
        this.zoomed = false;
        this.zoomLevel = 1;
        this.$dispatch('gallery:change', { index, image: this.currentImage });
      }
    },

    // Previous image
    prev() {
      if (this.currentIndex > 0) {
        this.goTo(this.currentIndex - 1);
      } else if (this.loop) {
        this.goTo(this.images.length - 1);
      }
    },

    // Next image
    next() {
      if (this.currentIndex < this.images.length - 1) {
        this.goTo(this.currentIndex + 1);
      } else if (this.loop) {
        this.goTo(0);
      }
    },

    // Can go previous
    get canPrev() {
      return this.loop || this.currentIndex > 0;
    },

    // Can go next
    get canNext() {
      return this.loop || this.currentIndex < this.images.length - 1;
    },

    // Toggle zoom
    toggleZoom() {
      if (!this.enableZoom) return;

      this.zoomed = !this.zoomed;
      this.zoomLevel = this.zoomed ? 2 : 1;
    },

    // Download current image
    downloadImage() {
      const image = this.currentImage;
      if (!image.src) return;

      const link = document.createElement('a');
      link.href = image.src;
      link.download = image.title || 'image';
      link.click();
    },

    // Handle swipe (for mobile)
    handleSwipe(direction) {
      if (direction === 'left') {
        this.next();
      } else if (direction === 'right') {
        this.prev();
      }
    },

    // Get thumbnail URL
    getThumb(image) {
      return image.thumb || image.src;
    },

    // Set images
    setImages(images) {
      this.images = images;
      this.currentIndex = 0;
    },

    // Add image
    addImage(image) {
      this.images.push(image);
    },

    // Remove image
    removeImage(index) {
      this.images.splice(index, 1);
      if (this.currentIndex >= this.images.length) {
        this.currentIndex = Math.max(0, this.images.length - 1);
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxImageGallery', imageGalleryData);
  }

})();
