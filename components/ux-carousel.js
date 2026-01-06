/**
 * UX Carousel Component
 * Carrusel con navegacion por flechas
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Carousel Container
    ======================================== */

    .ux-carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .ux-carousel__viewport {
      overflow: hidden;
      width: 100%;
    }

    .ux-carousel__track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
      will-change: transform;
    }

    /* Variantes de transicion */
    .ux-carousel--smooth .ux-carousel__track {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ux-carousel--fast .ux-carousel__track {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ux-carousel--spring .ux-carousel__track {
      transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .ux-carousel--dragging .ux-carousel__track {
      transition: none;
      cursor: grabbing;
    }

    .ux-carousel__slide {
      flex-shrink: 0;
      box-sizing: border-box;
    }

    /* Gap between slides */
    .ux-carousel--gap-xs .ux-carousel__slide { padding: 0 var(--ux-space-xs); }
    .ux-carousel--gap-sm .ux-carousel__slide { padding: 0 var(--ux-space-sm); }
    .ux-carousel--gap-md .ux-carousel__slide { padding: 0 var(--ux-space-md); }
    .ux-carousel--gap-lg .ux-carousel__slide { padding: 0 var(--ux-space-lg); }

    /* Negative margin to compensate for padding */
    .ux-carousel--gap-xs .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-xs)); }
    .ux-carousel--gap-sm .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-sm)); }
    .ux-carousel--gap-md .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-md)); }
    .ux-carousel--gap-lg .ux-carousel__track { margin: 0 calc(-1 * var(--ux-space-lg)); }

    /* ========================================
       Navigation Arrows
    ======================================== */

    .ux-carousel__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-carousel__nav:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-carousel__nav:active {
      transform: translateY(-50%) scale(0.95);
    }

    .ux-carousel__nav:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-carousel__nav--prev {
      left: var(--ux-space-sm);
    }

    .ux-carousel__nav--next {
      right: var(--ux-space-sm);
    }

    .ux-carousel__nav svg {
      width: 20px;
      height: 20px;
      color: var(--ux-text);
    }

    /* Navigation outside */
    .ux-carousel--nav-outside .ux-carousel__nav--prev {
      left: calc(-1 * (40px + var(--ux-space-md)));
    }

    .ux-carousel--nav-outside .ux-carousel__nav--next {
      right: calc(-1 * (40px + var(--ux-space-md)));
    }

    /* Navigation small */
    .ux-carousel--nav-sm .ux-carousel__nav {
      width: 32px;
      height: 32px;
    }

    .ux-carousel--nav-sm .ux-carousel__nav svg {
      width: 16px;
      height: 16px;
    }

    /* Navigation hidden on mobile */
    @media (max-width: 768px) {
      .ux-carousel--nav-hide-mobile .ux-carousel__nav {
        display: none;
      }
    }

    /* ========================================
       Pagination Dots
    ======================================== */

    .ux-carousel__pagination {
      display: flex;
      justify-content: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-md);
    }

    .ux-carousel__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ux-border-color);
      border: none;
      padding: 0;
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-carousel__dot:hover {
      background-color: var(--ux-text-tertiary);
    }

    .ux-carousel__dot--active {
      background-color: var(--ux-primary);
      transform: scale(1.2);
    }

    /* Pagination lines */
    .ux-carousel--pagination-lines .ux-carousel__dot {
      width: 24px;
      height: 4px;
      border-radius: 2px;
    }

    .ux-carousel--pagination-lines .ux-carousel__dot--active {
      transform: scaleX(1.2);
    }

    /* ========================================
       Slide Widths (Responsive)
    ======================================== */

    /* 1 slide visible */
    .ux-carousel--show-1 .ux-carousel__slide { width: 100%; }

    /* 2 slides visible */
    .ux-carousel--show-2 .ux-carousel__slide { width: 50%; }

    /* 3 slides visible */
    .ux-carousel--show-3 .ux-carousel__slide { width: 33.333333%; }

    /* 4 slides visible */
    .ux-carousel--show-4 .ux-carousel__slide { width: 25%; }

    /* 5 slides visible */
    .ux-carousel--show-5 .ux-carousel__slide { width: 20%; }

    /* 6 slides visible */
    .ux-carousel--show-6 .ux-carousel__slide { width: 16.666666%; }

    /* Responsive breakpoints */
    @media (max-width: 1024px) {
      .ux-carousel--show-lg-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-lg-2 .ux-carousel__slide { width: 50%; }
      .ux-carousel--show-lg-3 .ux-carousel__slide { width: 33.333333%; }
      .ux-carousel--show-lg-4 .ux-carousel__slide { width: 25%; }
    }

    @media (max-width: 768px) {
      .ux-carousel--show-md-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-md-2 .ux-carousel__slide { width: 50%; }
      .ux-carousel--show-md-3 .ux-carousel__slide { width: 33.333333%; }
    }

    @media (max-width: 480px) {
      .ux-carousel--show-sm-1 .ux-carousel__slide { width: 100%; }
      .ux-carousel--show-sm-2 .ux-carousel__slide { width: 50%; }
    }

    /* ========================================
       Peek (Partial slides visible)
    ======================================== */

    .ux-carousel--peek .ux-carousel__viewport {
      overflow: visible;
    }

    .ux-carousel--peek {
      overflow: hidden;
    }

    .ux-carousel--peek-sm .ux-carousel__slide:last-child {
      margin-right: 20px;
    }

    .ux-carousel--peek-md .ux-carousel__slide:last-child {
      margin-right: 40px;
    }

    /* ========================================
       Auto Width
    ======================================== */

    .ux-carousel--auto .ux-carousel__slide {
      width: auto;
    }

    /* ========================================
       Center Mode
    ======================================== */

    .ux-carousel--center .ux-carousel__slide {
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-carousel--center .ux-carousel__slide--active {
      transform: scale(1.05);
      z-index: 1;
    }

    /* ========================================
       Fade Effect
    ======================================== */

    .ux-carousel--fade .ux-carousel__track {
      display: block;
      position: relative;
    }

    .ux-carousel--fade .ux-carousel__slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-carousel--fade .ux-carousel__slide--active {
      position: relative;
      opacity: 1;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-carousel--loading .ux-carousel__track {
      opacity: 0;
    }

    .ux-carousel--loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-carousel-spin 0.8s linear infinite;
    }

    @keyframes ux-carousel-spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-carousel__track {
        transition: none;
      }

      .ux-carousel--smooth .ux-carousel__track,
      .ux-carousel--fast .ux-carousel__track,
      .ux-carousel--spring .ux-carousel__track {
        transition: none;
      }

      .ux-carousel--fade .ux-carousel__slide {
        transition: opacity 0.1s ease;
      }

      .ux-carousel--center .ux-carousel__slide {
        transition: none;
      }

      .ux-carousel--loading::after {
        animation: none;
      }
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-carousel--glass .ux-carousel__nav-button {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-carousel--glass .ux-carousel__nav-button:hover {
      background: var(--ux-glass-bg-thick);
    }

    .ux-carousel--glass .ux-carousel__pagination {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-radius: 100px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-carousel-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-carousel-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component
  // ARIA: group role, aria-roledescription, aria-label for navigation
  const carouselComponent = (config = {}) => ({
    currentIndex: 0,
    slidesCount: 0,
    slidesPerView: config.slidesPerView || 1,
    loop: config.loop || false,
    autoplay: config.autoplay || false,
    autoplayInterval: config.autoplayInterval || 5000,
    showPagination: config.showPagination !== false,
    showNavigation: config.showNavigation !== false,
    draggable: config.draggable !== false,
    _autoplayTimer: null,
    _startX: 0,
    _currentX: 0,
    _isDragging: false,
    _trackEl: null,
    carouselId: config.id || 'ux-carousel-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the carousel container
    get ariaAttrs() {
      return {
        'role': 'group',
        'aria-roledescription': 'carousel',
        'aria-label': config.ariaLabel || 'Carousel'
      };
    },

    // ARIA attributes for navigation prev button
    get prevButtonAriaAttrs() {
      return {
        'aria-label': 'Previous slide',
        'aria-controls': this.carouselId + '-track'
      };
    },

    // ARIA attributes for navigation next button
    get nextButtonAriaAttrs() {
      return {
        'aria-label': 'Next slide',
        'aria-controls': this.carouselId + '-track'
      };
    },

    // ARIA attributes for slide
    getSlideAriaAttrs(index) {
      return {
        'role': 'group',
        'aria-roledescription': 'slide',
        'aria-label': `Slide ${index + 1} of ${this.slidesCount}`
      };
    },

    // ARIA attributes for pagination dot
    getDotAriaAttrs(pageIndex) {
      const isCurrentPage = this.getCurrentPage() === pageIndex;
      return {
        'role': 'button',
        'aria-label': `Go to slide ${pageIndex + 1}`,
        'aria-current': isCurrentPage ? 'true' : 'false'
      };
    },

    get trackId() {
      return this.carouselId + '-track';
    },

    init() {
      this.$nextTick(() => {
        this._trackEl = this.$refs.track;
        if (this._trackEl) {
          this.slidesCount = this._trackEl.children.length;
        }

        // Setup touch/mouse events for dragging
        if (this.draggable) {
          this.setupDrag();
        }

        // Start autoplay
        if (this.autoplay) {
          this.startAutoplay();
        }

        // Dispatch init event
        this.$dispatch('ux-carousel:init', {
          slidesCount: this.slidesCount,
          currentIndex: this.currentIndex
        });
      });
    },

    destroy() {
      this.stopAutoplay();
    },

    get canGoPrev() {
      if (this.loop) return true;
      return this.currentIndex > 0;
    },

    get canGoNext() {
      if (this.loop) return true;
      return this.currentIndex < this.maxIndex;
    },

    get maxIndex() {
      return Math.max(0, this.slidesCount - this.slidesPerView);
    },

    get translateX() {
      const slideWidth = 100 / this.slidesPerView;
      return -(this.currentIndex * slideWidth);
    },

    get paginationDots() {
      // Show dots for each "page"
      const pages = Math.ceil(this.slidesCount / this.slidesPerView);
      return Array.from({ length: pages }, (_, i) => i);
    },

    prev() {
      if (!this.canGoPrev && !this.loop) return;

      if (this.currentIndex === 0 && this.loop) {
        this.currentIndex = this.maxIndex;
      } else {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
      }

      this.$dispatch('ux-carousel:change', {
        index: this.currentIndex,
        direction: 'prev'
      });

      // Reset autoplay timer
      if (this.autoplay) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    },

    next() {
      if (!this.canGoNext && !this.loop) return;

      if (this.currentIndex >= this.maxIndex && this.loop) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
      }

      this.$dispatch('ux-carousel:change', {
        index: this.currentIndex,
        direction: 'next'
      });

      // Reset autoplay timer
      if (this.autoplay) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    },

    goTo(index) {
      const targetIndex = Math.max(0, Math.min(this.maxIndex, index));
      if (targetIndex !== this.currentIndex) {
        this.currentIndex = targetIndex;
        this.$dispatch('ux-carousel:change', {
          index: this.currentIndex,
          direction: targetIndex > this.currentIndex ? 'next' : 'prev'
        });
      }
    },

    goToPage(pageIndex) {
      this.goTo(pageIndex * this.slidesPerView);
    },

    getCurrentPage() {
      return Math.floor(this.currentIndex / this.slidesPerView);
    },

    startAutoplay() {
      if (this._autoplayTimer) return;
      this._autoplayTimer = setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    },

    stopAutoplay() {
      if (this._autoplayTimer) {
        clearInterval(this._autoplayTimer);
        this._autoplayTimer = null;
      }
    },

    setupDrag() {
      const viewport = this.$refs.viewport;
      if (!viewport) return;

      // Touch events
      viewport.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      viewport.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: false });
      viewport.addEventListener('touchend', (e) => this.onDragEnd(e));

      // Mouse events
      viewport.addEventListener('mousedown', (e) => this.onDragStart(e));
      viewport.addEventListener('mousemove', (e) => this.onDragMove(e));
      viewport.addEventListener('mouseup', (e) => this.onDragEnd(e));
      viewport.addEventListener('mouseleave', (e) => this.onDragEnd(e));
    },

    onDragStart(e) {
      this._isDragging = true;
      this._startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      this._currentX = this._startX;
      this.$el.classList.add('ux-carousel--dragging');

      if (this.autoplay) {
        this.stopAutoplay();
      }
    },

    onDragMove(e) {
      if (!this._isDragging) return;

      this._currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const diff = this._currentX - this._startX;

      // Apply drag transform
      if (this._trackEl) {
        const baseTranslate = this.translateX;
        const dragPercent = (diff / this.$refs.viewport.offsetWidth) * 100;
        this._trackEl.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
      }

      // Prevent scrolling while dragging horizontally
      if (Math.abs(diff) > 10) {
        e.preventDefault();
      }
    },

    onDragEnd(e) {
      if (!this._isDragging) return;

      this._isDragging = false;
      this.$el.classList.remove('ux-carousel--dragging');

      const diff = this._currentX - this._startX;
      const threshold = this.$refs.viewport.offsetWidth * 0.2; // 20% threshold

      // Reset track transform
      if (this._trackEl) {
        this._trackEl.style.transform = '';
      }

      // Determine direction
      if (diff > threshold) {
        this.prev();
      } else if (diff < -threshold) {
        this.next();
      }

      // Resume autoplay
      if (this.autoplay) {
        this.startAutoplay();
      }
    },

    // Keyboard navigation handler
    handleKeydown(event) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.prev();
          // Announce to screen readers
          if (window.UX && window.UX.announce) {
            window.UX.announce(`Slide ${this.currentIndex + 1} of ${this.slidesCount}`, 'polite');
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.next();
          if (window.UX && window.UX.announce) {
            window.UX.announce(`Slide ${this.currentIndex + 1} of ${this.slidesCount}`, 'polite');
          }
          break;
        case 'Home':
          event.preventDefault();
          this.goTo(0);
          if (window.UX && window.UX.announce) {
            window.UX.announce(`First slide`, 'polite');
          }
          break;
        case 'End':
          event.preventDefault();
          this.goTo(this.maxIndex);
          if (window.UX && window.UX.announce) {
            window.UX.announce(`Last slide`, 'polite');
          }
          break;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCarousel', carouselComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCarousel', carouselComponent);
    });
  }
})();
