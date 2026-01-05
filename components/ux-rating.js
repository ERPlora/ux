/**
 * UX Rating Component
 * Star rating component with 1-5 scale
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Rating
    ======================================== */

    .ux-rating {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-rating__stars {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .ux-rating__star {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-light-shade);
      cursor: pointer;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-rating__star svg {
      width: 100%;
      height: 100%;
    }

    .ux-rating__star:hover {
      transform: scale(1.15);
    }

    .ux-rating__star:active {
      transform: scale(0.95);
    }

    .ux-rating__star--filled {
      color: var(--ux-warning);
    }

    .ux-rating__star--half {
      position: relative;
      color: var(--ux-light-shade);
    }

    .ux-rating__star--half::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }

    /* Readonly state */
    .ux-rating--readonly .ux-rating__star {
      cursor: default;
      pointer-events: none;
    }

    .ux-rating--readonly .ux-rating__star:hover {
      transform: none;
    }

    /* Disabled state */
    .ux-rating--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-rating--sm .ux-rating__star {
      width: 18px;
      height: 18px;
    }

    .ux-rating--lg .ux-rating__star {
      width: 32px;
      height: 32px;
    }

    .ux-rating--xl .ux-rating__star {
      width: 40px;
      height: 40px;
    }

    /* ========================================
       Colors
    ======================================== */

    .ux-rating--primary .ux-rating__star--filled {
      color: var(--ux-primary);
    }

    .ux-rating--danger .ux-rating__star--filled {
      color: var(--ux-danger);
    }

    .ux-rating--success .ux-rating__star--filled {
      color: var(--ux-success);
    }

    /* ========================================
       Rating Value Display
    ======================================== */

    .ux-rating__value {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin-left: var(--ux-space-xs);
    }

    .ux-rating--sm .ux-rating__value {
      font-size: var(--ux-font-size-sm);
    }

    .ux-rating--lg .ux-rating__value {
      font-size: var(--ux-font-size-lg);
    }

    .ux-rating__count {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-left: var(--ux-space-xs);
    }

    /* ========================================
       Hover Preview
    ======================================== */

    .ux-rating:not(.ux-rating--readonly):not(.ux-rating--disabled) .ux-rating__star--preview {
      color: var(--ux-warning);
      opacity: 0.7;
    }

    /* ========================================
       Compact Rating (inline display)
    ======================================== */

    .ux-rating--compact {
      gap: var(--ux-space-xs);
    }

    .ux-rating--compact .ux-rating__stars {
      gap: 0;
    }

    .ux-rating--compact .ux-rating__star {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Rating with Labels
    ======================================== */

    .ux-rating__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-rating__label--start {
      margin-right: var(--ux-space-sm);
    }

    .ux-rating__label--end {
      margin-left: var(--ux-space-sm);
    }

    /* ========================================
       Animation
    ======================================== */

    @keyframes ux-rating-pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }

    .ux-rating__star--animate {
      animation: ux-rating-pop 0.3s var(--ux-ease);
    }
  `;

  // Star SVG paths
  const starFilled = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const starEmpty = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const starHalf = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" stroke="currentColor" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-rating-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-rating-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for rating
  // ARIA: role="radiogroup" for interactive, aria-label for each star
  const ratingComponent = (config = {}) => ({
    value: config.value || 0,
    max: config.max || 5,
    readonly: config.readonly || false,
    disabled: config.disabled || false,
    allowHalf: config.allowHalf || false,
    showValue: config.showValue || false,
    hoverValue: 0,
    isHovering: false,
    ratingId: config.id || 'ux-rating-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the rating group
    get ariaAttrs() {
      return {
        'role': this.readonly ? 'img' : 'radiogroup',
        'aria-label': `Rating: ${this.value} out of ${this.max} stars`,
        'aria-valuenow': this.value,
        'aria-valuemin': 0,
        'aria-valuemax': this.max
      };
    },

    // ARIA attributes for each star
    getStarAriaAttrs(index) {
      const starValue = index + 1;
      return {
        'role': this.readonly ? 'presentation' : 'radio',
        'aria-checked': this.value >= starValue ? 'true' : 'false',
        'aria-label': `${starValue} star${starValue > 1 ? 's' : ''}`,
        'tabindex': this.readonly || this.disabled ? '-1' : (this.value === starValue ? '0' : '-1')
      };
    },

    // Get star SVG based on value
    getStarSvg(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;

      if (displayValue >= starValue) {
        return starFilled;
      } else if (this.allowHalf && displayValue >= starValue - 0.5) {
        return starHalf;
      }
      return starEmpty;
    },

    // Check if star is filled
    isStarFilled(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;
      return displayValue >= starValue;
    },

    // Check if star is half filled
    isStarHalf(index) {
      const starValue = index + 1;
      const displayValue = this.isHovering && !this.readonly ? this.hoverValue : this.value;
      return this.allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;
    },

    // Handle star click
    setRating(index, event) {
      if (this.readonly || this.disabled) return;

      let newValue = index + 1;

      // Support half stars on click
      if (this.allowHalf && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
          newValue = index + 0.5;
        }
      }

      // Toggle off if clicking same value
      if (this.value === newValue) {
        this.value = 0;
      } else {
        this.value = newValue;
      }

      // Dispatch change event
      this.$dispatch('rating-change', { value: this.value });
    },

    // Handle hover
    onStarHover(index, event) {
      if (this.readonly || this.disabled) return;
      this.isHovering = true;

      let hoverVal = index + 1;

      if (this.allowHalf && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
          hoverVal = index + 0.5;
        }
      }

      this.hoverValue = hoverVal;
    },

    // Handle mouse leave
    onMouseLeave() {
      this.isHovering = false;
      this.hoverValue = 0;
    },

    // Handle keyboard navigation
    handleKeydown(event, index) {
      if (this.readonly || this.disabled) return;

      let newValue = this.value;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          newValue = Math.min(this.max, this.value + (this.allowHalf ? 0.5 : 1));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          newValue = Math.max(0, this.value - (this.allowHalf ? 0.5 : 1));
          break;
        case 'Home':
          event.preventDefault();
          newValue = 0;
          break;
        case 'End':
          event.preventDefault();
          newValue = this.max;
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.setRating(index, null);
          return;
      }

      if (newValue !== this.value) {
        this.value = newValue;
        this.$dispatch('rating-change', { value: this.value });
      }
    },

    // Get array of star indices
    get stars() {
      return Array.from({ length: this.max }, (_, i) => i);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxRating', ratingComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRating', ratingComponent);
    });
  }
})();
