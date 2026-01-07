/**
 * UX Spinner Component
 * Indicadores de carga animados
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Spinner
    ======================================== */

    .ux-spinner {
      /* Internal color variable - set by .ux-color-* or direct */
      --_spinner-color: var(--ux-variant-bg, var(--ux-primary));
      --_spinner-color-rgb: var(--ux-variant-bg-rgb, var(--ux-primary-rgb));

      display: inline-block;
      width: var(--ux-spinner-size);
      height: var(--ux-spinner-size);
      border: 3px solid rgba(var(--_spinner-color-rgb), 0.2);
      border-top-color: var(--_spinner-color);
      border-radius: 50%;
      animation: ux-spinner-rotate 0.8s linear infinite;
    }

    @keyframes ux-spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-spinner--xs {
      width: calc(var(--ux-spinner-size-sm) * 0.8);
      height: calc(var(--ux-spinner-size-sm) * 0.8);
      border-width: 2px;
    }

    .ux-spinner--sm {
      width: var(--ux-spinner-size-sm);
      height: var(--ux-spinner-size-sm);
      border-width: 2px;
    }

    .ux-spinner--lg {
      width: var(--ux-spinner-size-lg);
      height: var(--ux-spinner-size-lg);
      border-width: 4px;
    }

    .ux-spinner--xl {
      width: calc(var(--ux-spinner-size-lg) * 1.4);
      height: calc(var(--ux-spinner-size-lg) * 1.4);
      border-width: 5px;
    }

    /* ========================================
       Special Color Variants (light backgrounds)
    ======================================== */

    .ux-spinner--light,
    .ux-spinner--white {
      --_spinner-color: #ffffff;
      --_spinner-color-rgb: 255, 255, 255;
    }

    /* ========================================
       Dots Spinner
    ======================================== */

    .ux-spinner--dots {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: auto;
      height: auto;
      border: none;
      animation: none;
    }

    .ux-spinner--dots span {
      width: 8px;
      height: 8px;
      background-color: var(--_spinner-color);
      border-radius: 50%;
      animation: ux-spinner-dots 1.4s ease-in-out infinite both;
    }

    .ux-spinner--dots span:nth-child(1) {
      animation-delay: -0.32s;
    }

    .ux-spinner--dots span:nth-child(2) {
      animation-delay: -0.16s;
    }

    @keyframes ux-spinner-dots {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .ux-spinner--dots.ux-spinner--sm span {
      width: 6px;
      height: 6px;
    }

    .ux-spinner--dots.ux-spinner--lg span {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Bars Spinner
    ======================================== */

    .ux-spinner--bars {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      width: auto;
      height: 28px;
      border: none;
      animation: none;
    }

    .ux-spinner--bars span {
      width: 4px;
      height: 100%;
      background-color: var(--_spinner-color);
      border-radius: 2px;
      animation: ux-spinner-bars 1.2s ease-in-out infinite;
    }

    .ux-spinner--bars span:nth-child(1) { animation-delay: -1.2s; }
    .ux-spinner--bars span:nth-child(2) { animation-delay: -1.1s; }
    .ux-spinner--bars span:nth-child(3) { animation-delay: -1.0s; }
    .ux-spinner--bars span:nth-child(4) { animation-delay: -0.9s; }

    @keyframes ux-spinner-bars {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
      }
    }

    /* ========================================
       iOS Native Style Spinner (12 lines)
    ======================================== */

    .ux-spinner--ios {
      position: relative;
      width: var(--ux-spinner-ios-size, 20px);
      height: var(--ux-spinner-ios-size, 20px);
      border: none;
      animation: ux-spinner-ios 1s steps(12) infinite;
    }

    .ux-spinner--ios::before,
    .ux-spinner--ios::after,
    .ux-spinner--ios span {
      content: '';
      position: absolute;
      top: 0;
      left: calc(50% - var(--ux-spinner-ios-line-width, 1.5px));
      width: var(--ux-spinner-ios-line-width, 1.5px);
      height: var(--ux-spinner-ios-line-height, 25%);
      background-color: var(--_spinner-color);
      border-radius: var(--ux-spinner-ios-line-radius, 1px);
      transform-origin: center calc(var(--ux-spinner-ios-size, 20px) / 2);
    }

    .ux-spinner--ios::before { opacity: 1; transform: rotate(0deg); }
    .ux-spinner--ios::after { opacity: 0.916; transform: rotate(30deg); }
    .ux-spinner--ios span:nth-child(1) { opacity: 0.833; transform: rotate(60deg); }
    .ux-spinner--ios span:nth-child(2) { opacity: 0.75; transform: rotate(90deg); }
    .ux-spinner--ios span:nth-child(3) { opacity: 0.666; transform: rotate(120deg); }
    .ux-spinner--ios span:nth-child(4) { opacity: 0.583; transform: rotate(150deg); }
    .ux-spinner--ios span:nth-child(5) { opacity: 0.5; transform: rotate(180deg); }
    .ux-spinner--ios span:nth-child(6) { opacity: 0.416; transform: rotate(210deg); }
    .ux-spinner--ios span:nth-child(7) { opacity: 0.333; transform: rotate(240deg); }
    .ux-spinner--ios span:nth-child(8) { opacity: 0.25; transform: rotate(270deg); }
    .ux-spinner--ios span:nth-child(9) { opacity: 0.166; transform: rotate(300deg); }
    .ux-spinner--ios span:nth-child(10) { opacity: 0.083; transform: rotate(330deg); }

    @keyframes ux-spinner-ios {
      to {
        transform: rotate(360deg);
      }
    }

    .ux-spinner--ios.ux-spinner--sm {
      --ux-spinner-ios-size: 16px;
      --ux-spinner-ios-line-width: 1.2px;
    }

    .ux-spinner--ios.ux-spinner--lg {
      --ux-spinner-ios-size: 28px;
      --ux-spinner-ios-line-width: 2px;
    }

    /* ========================================
       Spinner Container
    ======================================== */

    .ux-spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-xl);
    }

    .ux-spinner-container__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Full Page Spinner
    ======================================== */

    .ux-spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--ux-background-rgb), 0.8);
      z-index: var(--ux-z-modal);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }

    /* ========================================
       Inline Spinner (for buttons, inputs)
    ======================================== */

    .ux-spinner--inline {
      vertical-align: middle;
      margin-right: var(--ux-space-sm);
    }

    /* ========================================
       Paused State
    ======================================== */

    .ux-spinner--paused,
    .ux-spinner--paused span {
      animation-play-state: paused;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-spinner {
        animation: none;
        border-top-color: var(--_spinner-color);
        opacity: 0.8;
      }

      .ux-spinner--dots span {
        animation: none;
        opacity: 0.7;
      }

      .ux-spinner--bars span {
        animation: none;
        transform: scaleY(0.7);
      }

      .ux-spinner--ios {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-spinner-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-spinner-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for spinner with loading state
  // ARIA: role="status", aria-label for screen readers
  const spinnerComponent = (config = {}) => ({
    visible: config.visible !== undefined ? config.visible : true,
    text: config.text || '',
    ariaLabel: config.ariaLabel || 'Loading',

    // ARIA attributes for the spinner
    get ariaAttrs() {
      return {
        'role': 'status',
        'aria-live': 'polite',
        'aria-label': this.text || this.ariaLabel
      };
    },

    show(text = '') {
      this.text = text;
      this.visible = true;
      // Announce to screen readers
      if (window.UX && window.UX.announce) {
        window.UX.announce(text || this.ariaLabel, 'polite');
      }
    },

    hide() {
      this.visible = false;
    },

    toggle() {
      this.visible = !this.visible;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSpinner', spinnerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSpinner', spinnerComponent);
    });
  }
})();
