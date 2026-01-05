/**
 * UX Img Component
 * Componente de imagen con lazy loading, skeleton y manejo de errores estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Img Container
    ======================================== */

    .ux-img {
      position: relative;
      display: block;
      overflow: hidden;
      background-color: var(--ux-img-bg, var(--ux-light));
    }

    .ux-img--rounded {
      border-radius: var(--ux-border-radius);
    }

    .ux-img--circle {
      border-radius: 50%;
    }

    /* ========================================
       Image Element
    ======================================== */

    .ux-img__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--ux-img-object-fit, cover);
      object-position: var(--ux-img-object-position, center);
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-img--loaded .ux-img__image {
      opacity: 1;
    }

    /* Object fit variants */
    .ux-img--contain .ux-img__image {
      object-fit: contain;
    }

    .ux-img--cover .ux-img__image {
      object-fit: cover;
    }

    .ux-img--fill .ux-img__image {
      object-fit: fill;
    }

    .ux-img--none .ux-img__image {
      object-fit: none;
    }

    .ux-img--scale-down .ux-img__image {
      object-fit: scale-down;
    }

    /* ========================================
       Skeleton / Placeholder
    ======================================== */

    .ux-img__skeleton {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--ux-img-skeleton-bg, var(--ux-light));
      overflow: hidden;
    }

    .ux-img__skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
      );
      transform: translateX(-100%);
      animation: ux-img-shimmer 1.5s infinite;
    }

    @keyframes ux-img-shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .ux-img--loaded .ux-img__skeleton,
    .ux-img--error .ux-img__skeleton {
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    /* Placeholder icon */
    .ux-img__placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--ux-text-tertiary);
      opacity: 0.5;
    }

    .ux-img__placeholder svg {
      width: 48px;
      height: 48px;
    }

    .ux-img--sm .ux-img__placeholder svg {
      width: 24px;
      height: 24px;
    }

    .ux-img--lg .ux-img__placeholder svg {
      width: 64px;
      height: 64px;
    }

    .ux-img--loaded .ux-img__placeholder {
      display: none;
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-img__error {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      background-color: var(--ux-surface-alt);
      color: var(--ux-text-tertiary);
    }

    .ux-img--error .ux-img__error {
      display: flex;
    }

    .ux-img__error-icon {
      width: 32px;
      height: 32px;
      opacity: 0.5;
    }

    .ux-img--sm .ux-img__error-icon {
      width: 20px;
      height: 20px;
    }

    .ux-img--lg .ux-img__error-icon {
      width: 48px;
      height: 48px;
    }

    .ux-img__error-text {
      font-size: var(--ux-font-size-xs);
      text-align: center;
      max-width: 80%;
    }

    .ux-img--sm .ux-img__error-text {
      display: none;
    }

    /* ========================================
       Aspect Ratios
    ======================================== */

    .ux-img--square {
      aspect-ratio: 1 / 1;
    }

    .ux-img--video {
      aspect-ratio: 16 / 9;
    }

    .ux-img--portrait {
      aspect-ratio: 3 / 4;
    }

    .ux-img--landscape {
      aspect-ratio: 4 / 3;
    }

    .ux-img--wide {
      aspect-ratio: 21 / 9;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-img--xs {
      width: 32px;
      height: 32px;
    }

    .ux-img--sm {
      width: 48px;
      height: 48px;
    }

    .ux-img--md {
      width: 80px;
      height: 80px;
    }

    .ux-img--lg {
      width: 120px;
      height: 120px;
    }

    .ux-img--xl {
      width: 200px;
      height: 200px;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-img {
        --ux-img-bg: rgba(255, 255, 255, 0.1);
        --ux-img-skeleton-bg: rgba(255, 255, 255, 0.1);
      }

      .ux-img__skeleton::after {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.15) 50%,
          transparent 100%
        );
      }
    }

    .ux-dark .ux-img {
      --ux-img-bg: rgba(255, 255, 255, 0.1);
      --ux-img-skeleton-bg: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-img__skeleton::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.15) 50%,
        transparent 100%
      );
    }

    /* ========================================
       Blur-up / LQIP (Low Quality Image Placeholder)
    ======================================== */

    .ux-img__lqip {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
      transform: scale(1.1);
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-img--loaded .ux-img__lqip {
      opacity: 0;
      pointer-events: none;
    }

    /* ========================================
       Fade-in Animation
    ======================================== */

    .ux-img--fade .ux-img__image {
      transition: opacity 0.5s var(--ux-ease);
    }

    .ux-img--zoom .ux-img__image {
      transform: scale(1.05);
      transition: opacity 0.5s var(--ux-ease), transform 0.5s var(--ux-ease);
    }

    .ux-img--zoom.ux-img--loaded .ux-img__image {
      transform: scale(1);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-img-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-img-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Intersection Observer for lazy loading
  let observer = null;

  function getObserver() {
    if (observer) return observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const event = new CustomEvent('ux-img:visible', { bubbles: true });
            img.dispatchEvent(event);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }

    return observer;
  }

  // Alpine component
  const imgComponent = (config = {}) => ({
    src: config.src || '',
    alt: config.alt || '',
    lqip: config.lqip || '', // Low quality image placeholder URL
    lazy: config.lazy !== false, // Lazy load by default
    state: 'loading', // loading | loaded | error

    get isLoading() { return this.state === 'loading'; },
    get isLoaded() { return this.state === 'loaded'; },
    get isError() { return this.state === 'error'; },

    get containerClass() {
      return {
        'ux-img--loaded': this.isLoaded,
        'ux-img--error': this.isError
      };
    },

    init() {
      if (this.lazy) {
        const obs = getObserver();
        if (obs) {
          obs.observe(this.$el);
          this.$el.addEventListener('ux-img:visible', () => {
            this.loadImage();
          }, { once: true });
        } else {
          // Fallback: load immediately if IntersectionObserver not available
          this.loadImage();
        }
      } else {
        this.loadImage();
      }
    },

    loadImage() {
      if (!this.src) {
        this.state = 'error';
        return;
      }

      const img = new Image();

      img.onload = () => {
        this.state = 'loaded';
        this.$dispatch('ux-img:load', { src: this.src });
      };

      img.onerror = () => {
        this.state = 'error';
        this.$dispatch('ux-img:error', { src: this.src });
      };

      img.src = this.src;
    },

    reload() {
      this.state = 'loading';
      this.loadImage();
    },

    setSrc(newSrc) {
      this.src = newSrc;
      this.state = 'loading';
      this.loadImage();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxImg', imgComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxImg', imgComponent);
    });
  }

  // Directive for simpler usage
  document.addEventListener('alpine:init', () => {
    Alpine.directive('img', (el, { expression, modifiers }, { evaluate, effect }) => {
      const src = expression ? evaluate(expression) : el.dataset.src;
      const lazy = !modifiers.includes('eager');

      if (!src) return;

      el.classList.add('ux-img');

      // Create skeleton
      const skeleton = document.createElement('div');
      skeleton.className = 'ux-img__skeleton';
      el.appendChild(skeleton);

      // Create image
      const img = document.createElement('img');
      img.className = 'ux-img__image';
      img.alt = el.dataset.alt || '';
      el.appendChild(img);

      // Create error state
      const error = document.createElement('div');
      error.className = 'ux-img__error';
      error.innerHTML = `
        <svg class="ux-img__error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      `;
      el.appendChild(error);

      function loadImage() {
        img.onload = () => {
          el.classList.add('ux-img--loaded');
          el.classList.remove('ux-img--error');
        };

        img.onerror = () => {
          el.classList.add('ux-img--error');
          el.classList.remove('ux-img--loaded');
        };

        img.src = src;
      }

      if (lazy && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              obs.unobserve(el);
            }
          });
        }, { rootMargin: '50px 0px', threshold: 0.01 });
        obs.observe(el);
      } else {
        loadImage();
      }
    });
  });
})();
