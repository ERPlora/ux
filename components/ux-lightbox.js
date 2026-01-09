/**
 * UX Lightbox Component
 * Image viewer with zoom, navigation, and gallery support
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Lightbox
    ======================================== */

    .ux-lightbox {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-normal), visibility var(--ux-transition-normal);
      font-family: var(--ux-font-family);
    }

    .ux-lightbox--open {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       Backdrop
    ======================================== */

    .ux-lightbox__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: -1;
    }

    /* ========================================
       Content Container
    ======================================== */

    .ux-lightbox__container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-lightbox__header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md);
      padding-top: max(var(--ux-space-md), var(--ux-safe-top));
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
      z-index: 10;
      opacity: 1;
      transition: opacity var(--ux-transition-normal);
    }

    .ux-lightbox--hide-ui .ux-lightbox__header {
      opacity: 0;
      pointer-events: none;
    }

    .ux-lightbox__title {
      color: white;
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-lightbox__counter {
      color: rgba(255, 255, 255, 0.7);
      font-size: var(--ux-font-size-sm);
    }

    .ux-lightbox__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* ========================================
       Image Container
    ======================================== */

    .ux-lightbox__image-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: var(--ux-space-lg);
      cursor: grab;
    }

    .ux-lightbox__image-container:active {
      cursor: grabbing;
    }

    .ux-lightbox__image-wrapper {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--ux-transition-normal);
    }

    .ux-lightbox__image {
      max-width: 100%;
      max-height: calc(100dvh - 120px);
      object-fit: contain;
      user-select: none;
      -webkit-user-drag: none;
      border-radius: var(--ux-radius-sm);
    }

    .ux-lightbox--zoomed .ux-lightbox__image {
      max-width: none;
      max-height: none;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-lightbox__loading {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-lightbox__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top-color: white;
      border-radius: 50%;
      animation: ux-lightbox-spin 0.8s linear infinite;
    }

    @keyframes ux-lightbox-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Navigation Arrows
    ======================================== */

    .ux-lightbox__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all var(--ux-transition-fast);
      z-index: 10;
      opacity: 1;
    }

    .ux-lightbox--hide-ui .ux-lightbox__nav {
      opacity: 0;
      pointer-events: none;
    }

    .ux-lightbox__nav:hover {
      background: rgba(0, 0, 0, 0.7);
    }

    .ux-lightbox__nav:active {
      transform: translateY(-50%) scale(0.95);
    }

    .ux-lightbox__nav:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .ux-lightbox__nav--prev {
      left: var(--ux-space-md);
    }

    .ux-lightbox__nav--next {
      right: var(--ux-space-md);
    }

    .ux-lightbox__nav svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Toolbar Button
    ======================================== */

    .ux-lightbox__btn {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-lightbox__btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-lightbox__btn:active {
      background: rgba(255, 255, 255, 0.3);
    }

    .ux-lightbox__btn svg {
      width: 22px;
      height: 22px;
    }

    /* ========================================
       Footer / Thumbnails
    ======================================== */

    .ux-lightbox__footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--ux-space-md);
      padding-bottom: max(var(--ux-space-md), var(--ux-safe-bottom));
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
      z-index: 10;
      opacity: 1;
      transition: opacity var(--ux-transition-normal);
    }

    .ux-lightbox--hide-ui .ux-lightbox__footer {
      opacity: 0;
      pointer-events: none;
    }

    .ux-lightbox__thumbnails {
      display: flex;
      gap: var(--ux-space-xs);
      justify-content: center;
      overflow-x: auto;
      padding: var(--ux-space-xs) 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .ux-lightbox__thumbnails::-webkit-scrollbar {
      display: none;
    }

    .ux-lightbox__thumbnail {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: var(--ux-radius-sm);
      overflow: hidden;
      cursor: pointer;
      opacity: 0.5;
      transition: all var(--ux-transition-fast);
      border: 2px solid transparent;
    }

    .ux-lightbox__thumbnail:hover {
      opacity: 0.8;
    }

    .ux-lightbox__thumbnail--active {
      opacity: 1;
      border-color: white;
    }

    .ux-lightbox__thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Caption
    ======================================== */

    .ux-lightbox__caption {
      text-align: center;
      color: white;
      font-size: var(--ux-font-size-sm);
      margin-top: var(--ux-space-sm);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .ux-lightbox__caption-title {
      font-weight: 500;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-lightbox__caption-description {
      color: rgba(255, 255, 255, 0.7);
    }

    /* ========================================
       Zoom Controls
    ======================================== */

    .ux-lightbox__zoom-controls {
      position: absolute;
      bottom: 80px;
      right: var(--ux-space-md);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
      z-index: 10;
      opacity: 1;
      transition: opacity var(--ux-transition-normal);
    }

    .ux-lightbox--hide-ui .ux-lightbox__zoom-controls {
      opacity: 0;
      pointer-events: none;
    }

    .ux-lightbox__zoom-level {
      color: white;
      font-size: var(--ux-font-size-xs);
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      padding: 2px 8px;
      border-radius: var(--ux-radius-full);
    }

    /* ========================================
       Mobile Adjustments
    ======================================== */

    @media (max-width: 767px) {
      .ux-lightbox__nav {
        width: 40px;
        height: 40px;
      }

      .ux-lightbox__nav svg {
        width: 20px;
        height: 20px;
      }

      .ux-lightbox__btn {
        width: 40px;
        height: 40px;
      }

      .ux-lightbox__btn svg {
        width: 20px;
        height: 20px;
      }

      .ux-lightbox__thumbnail {
        width: 40px;
        height: 40px;
      }

      .ux-lightbox__zoom-controls {
        bottom: 100px;
      }
    }

    /* ========================================
       Trigger Element
    ======================================== */

    .ux-lightbox-trigger {
      cursor: pointer;
    }

    .ux-lightbox-trigger:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-lightbox {
        transition: none;
      }

      .ux-lightbox__spinner {
        animation: none;
      }

      .ux-lightbox__image-wrapper {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-lightbox-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-lightbox-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const lightboxData = (options = {}) => ({
    isOpen: false,
    images: options.images || [],
    currentIndex: 0,
    loading: true,
    zoom: 1,
    minZoom: 1,
    maxZoom: 4,
    hideUI: false,
    showThumbnails: options.showThumbnails ?? true,
    enableZoom: options.enableZoom ?? true,
    enableKeyboard: options.enableKeyboard ?? true,
    enableSwipe: options.enableSwipe ?? true,
    closeOnBackdrop: options.closeOnBackdrop ?? true,

    // Pan state
    panX: 0,
    panY: 0,
    isPanning: false,
    startX: 0,
    startY: 0,

    get currentImage() {
      return this.images[this.currentIndex] || {};
    },

    get hasPrev() {
      return this.currentIndex > 0;
    },

    get hasNext() {
      return this.currentIndex < this.images.length - 1;
    },

    get zoomPercent() {
      return Math.round(this.zoom * 100);
    },

    init() {
      // Keyboard navigation
      if (this.enableKeyboard) {
        this._keyHandler = (e) => {
          if (!this.isOpen) return;

          switch (e.key) {
            case 'Escape':
              this.close();
              break;
            case 'ArrowLeft':
              this.prev();
              break;
            case 'ArrowRight':
              this.next();
              break;
            case '+':
            case '=':
              this.zoomIn();
              break;
            case '-':
              this.zoomOut();
              break;
            case '0':
              this.resetZoom();
              break;
          }
        };
        document.addEventListener('keydown', this._keyHandler);
      }

      // Collect images from gallery if not provided
      if (this.images.length === 0) {
        this.$nextTick(() => {
          const gallery = this.$el.closest('[data-lightbox-gallery]');
          if (gallery) {
            const triggers = gallery.querySelectorAll('[data-lightbox-src]');
            this.images = Array.from(triggers).map(el => ({
              src: el.dataset.lightboxSrc || el.src || el.href,
              thumbnail: el.dataset.lightboxThumb || el.src,
              title: el.dataset.lightboxTitle || el.alt || '',
              description: el.dataset.lightboxDesc || ''
            }));
          }
        });
      }
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    open(index = 0) {
      this.currentIndex = index;
      this.isOpen = true;
      this.loading = true;
      this.resetZoom();

      if (window.UX) {
        window.UX.lockScroll();
      }

      this.$dispatch('lightbox:open', { index, image: this.currentImage });

      // Preload current image
      this.preloadImage(this.currentImage.src);
    },

    close() {
      this.isOpen = false;
      this.resetZoom();

      if (window.UX) {
        window.UX.unlockScroll();
      }

      this.$dispatch('lightbox:close');
    },

    prev() {
      if (this.hasPrev) {
        this.goTo(this.currentIndex - 1);
      }
    },

    next() {
      if (this.hasNext) {
        this.goTo(this.currentIndex + 1);
      }
    },

    goTo(index) {
      if (index < 0 || index >= this.images.length) return;

      this.currentIndex = index;
      this.loading = true;
      this.resetZoom();

      this.$dispatch('lightbox:change', { index, image: this.currentImage });

      this.preloadImage(this.currentImage.src);
    },

    preloadImage(src) {
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.onerror = () => {
        this.loading = false;
      };
      img.src = src;
    },

    zoomIn() {
      if (!this.enableZoom) return;
      this.zoom = Math.min(this.zoom + 0.5, this.maxZoom);
    },

    zoomOut() {
      if (!this.enableZoom) return;
      this.zoom = Math.max(this.zoom - 0.5, this.minZoom);
      if (this.zoom === this.minZoom) {
        this.panX = 0;
        this.panY = 0;
      }
    },

    resetZoom() {
      this.zoom = this.minZoom;
      this.panX = 0;
      this.panY = 0;
    },

    toggleZoom() {
      if (this.zoom > this.minZoom) {
        this.resetZoom();
      } else {
        this.zoom = 2;
      }
    },

    toggleUI() {
      this.hideUI = !this.hideUI;
    },

    handleBackdropClick(e) {
      if (this.closeOnBackdrop && e.target === e.currentTarget) {
        this.close();
      }
    },

    // Pan handlers for zoomed images
    startPan(e) {
      if (this.zoom <= this.minZoom) return;
      this.isPanning = true;
      this.startX = (e.clientX || e.touches?.[0]?.clientX) - this.panX;
      this.startY = (e.clientY || e.touches?.[0]?.clientY) - this.panY;
    },

    pan(e) {
      if (!this.isPanning) return;
      e.preventDefault();
      this.panX = (e.clientX || e.touches?.[0]?.clientX) - this.startX;
      this.panY = (e.clientY || e.touches?.[0]?.clientY) - this.startY;
    },

    endPan() {
      this.isPanning = false;
    },

    // Touch swipe for navigation
    handleSwipe(direction) {
      if (this.zoom > this.minZoom) return;

      if (direction === 'left') {
        this.next();
      } else if (direction === 'right') {
        this.prev();
      }
    },

    // Double tap to zoom
    handleDoubleTap() {
      this.toggleZoom();
    }
  });

  // Global lightbox API
  window.UXLightbox = {
    _instance: null,

    open(images, index = 0) {
      // Create temporary lightbox if none exists
      if (!this._instance) {
        const container = document.createElement('div');
        container.innerHTML = `
          <div x-data="uxLightbox({ images: [], showThumbnails: true })" x-ref="lightbox">
            <div class="ux-lightbox" :class="{ 'ux-lightbox--open': isOpen, 'ux-lightbox--hide-ui': hideUI, 'ux-lightbox--zoomed': zoom > 1 }">
              <div class="ux-lightbox__backdrop" @click="handleBackdropClick($event)"></div>
              <div class="ux-lightbox__container">
                <header class="ux-lightbox__header">
                  <div>
                    <span class="ux-lightbox__counter" x-text="(currentIndex + 1) + ' / ' + images.length"></span>
                  </div>
                  <div class="ux-lightbox__actions">
                    <button class="ux-lightbox__btn" @click="close()" aria-label="Close">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </header>
                <div class="ux-lightbox__image-container" @click="toggleUI()" @dblclick="handleDoubleTap()"
                     @mousedown="startPan($event)" @mousemove="pan($event)" @mouseup="endPan()" @mouseleave="endPan()"
                     @touchstart="startPan($event)" @touchmove="pan($event)" @touchend="endPan()">
                  <div class="ux-lightbox__loading" x-show="loading">
                    <div class="ux-lightbox__spinner"></div>
                  </div>
                  <div class="ux-lightbox__image-wrapper" :style="{ transform: 'scale(' + zoom + ') translate(' + panX/zoom + 'px, ' + panY/zoom + 'px)' }">
                    <img class="ux-lightbox__image" :src="currentImage.src" :alt="currentImage.title" x-show="!loading">
                  </div>
                </div>
                <button class="ux-lightbox__nav ux-lightbox__nav--prev" @click.stop="prev()" :disabled="!hasPrev" x-show="images.length > 1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
                </button>
                <button class="ux-lightbox__nav ux-lightbox__nav--next" @click.stop="next()" :disabled="!hasNext" x-show="images.length > 1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
                </button>
                <div class="ux-lightbox__zoom-controls" x-show="enableZoom">
                  <button class="ux-lightbox__btn" @click.stop="zoomIn()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"></path></svg>
                  </button>
                  <span class="ux-lightbox__zoom-level" x-text="zoomPercent + '%'"></span>
                  <button class="ux-lightbox__btn" @click.stop="zoomOut()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35M8 11h6"></path></svg>
                  </button>
                </div>
                <footer class="ux-lightbox__footer" x-show="showThumbnails && images.length > 1">
                  <div class="ux-lightbox__thumbnails">
                    <template x-for="(img, idx) in images" :key="idx">
                      <button class="ux-lightbox__thumbnail" :class="{ 'ux-lightbox__thumbnail--active': idx === currentIndex }" @click.stop="goTo(idx)">
                        <img :src="img.thumbnail || img.src" :alt="img.title">
                      </button>
                    </template>
                  </div>
                  <div class="ux-lightbox__caption" x-show="currentImage.title || currentImage.description">
                    <div class="ux-lightbox__caption-title" x-text="currentImage.title" x-show="currentImage.title"></div>
                    <div class="ux-lightbox__caption-description" x-text="currentImage.description" x-show="currentImage.description"></div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container.firstElementChild);
      }

      // Open with provided images
      this.$nextTick(() => {
        const lightbox = document.querySelector('[x-ref="lightbox"]');
        if (lightbox && lightbox.__x) {
          lightbox.__x.$data.images = Array.isArray(images) ? images : [{ src: images }];
          lightbox.__x.$data.open(index);
        }
      });
    }
  };

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxLightbox', lightboxData);
  }

})();
