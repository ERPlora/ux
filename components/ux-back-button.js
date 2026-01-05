/**
 * UX Back Button Component
 * iOS-style back button with arrow and text
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Back Button
    ======================================== */

    .ux-back-button {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      min-height: var(--ux-touch-target);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      padding-left: 0;
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 400;
      text-decoration: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-back-button:hover {
      opacity: 0.7;
    }

    .ux-back-button:active {
      opacity: 0.5;
      transform: scale(0.97);
    }

    /* ========================================
       Back Button Icon
    ======================================== */

    .ux-back-button__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-back-button__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Hover animation - slide left */
    .ux-back-button:hover .ux-back-button__icon {
      transform: translateX(-2px);
    }

    /* ========================================
       Back Button Text
    ======================================== */

    .ux-back-button__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }

    /* Icon only */
    .ux-back-button--icon-only .ux-back-button__text {
      display: none;
    }

    .ux-back-button--icon-only {
      padding: var(--ux-space-xs);
    }

    /* ========================================
       Back Button Sizes
    ======================================== */

    .ux-back-button--sm {
      min-height: var(--ux-touch-target-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-back-button--sm .ux-back-button__icon {
      width: 20px;
      height: 20px;
    }

    .ux-back-button--sm .ux-back-button__text {
      max-width: 100px;
    }

    .ux-back-button--lg {
      font-size: var(--ux-font-size-lg);
    }

    .ux-back-button--lg .ux-back-button__icon {
      width: 28px;
      height: 28px;
    }

    .ux-back-button--lg .ux-back-button__text {
      max-width: 160px;
    }

    /* ========================================
       Back Button Colors
    ======================================== */

    .ux-back-button--light {
      color: white;
    }

    .ux-back-button--dark {
      color: var(--ux-text);
    }

    .ux-back-button--secondary {
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Back Button in Navbar
    ======================================== */

    .ux-navbar .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-sm));
    }

    .ux-navbar--primary .ux-back-button,
    .ux-navbar--dark .ux-back-button {
      color: white;
    }

    /* ========================================
       Back Button in Toolbar
    ======================================== */

    .ux-toolbar .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-xs));
    }

    /* ========================================
       Back Button in Modal
    ======================================== */

    .ux-modal__header .ux-back-button {
      margin-left: calc(-1 * var(--ux-space-sm));
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-back-button:disabled,
    .ux-back-button--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    /* ========================================
       Custom Icon Positions
    ======================================== */

    .ux-back-button--icon-end {
      flex-direction: row-reverse;
    }

    .ux-back-button--icon-end .ux-back-button__icon {
      transform: rotate(180deg);
    }

    .ux-back-button--icon-end:hover .ux-back-button__icon {
      transform: rotate(180deg) translateX(-2px);
    }

    /* ========================================
       Animated Entrance (for page transitions)
    ======================================== */

    @keyframes ux-back-button-enter {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .ux-back-button--animate-in {
      animation: ux-back-button-enter 300ms var(--ux-ease-spring) forwards;
    }

    /* ========================================
       Collapse/Expand Animation (iOS-style)
    ======================================== */

    .ux-back-button--collapsible .ux-back-button__text {
      transition:
        max-width 200ms var(--ux-ease),
        opacity 200ms var(--ux-ease);
    }

    .ux-back-button--collapsed .ux-back-button__text {
      max-width: 0;
      opacity: 0;
      padding: 0;
    }
  `;

  // Default back arrow SVG
  const backArrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-back-button-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-back-button-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for back button with routing
  // ARIA: aria-label for accessibility
  const backButtonComponent = (config = {}) => ({
    text: config.text || 'Back',
    href: config.href || null,
    defaultHref: config.defaultHref || '/',
    showIcon: config.showIcon !== false,
    showText: config.showText !== false,
    disabled: config.disabled || false,
    collapsed: config.collapsed || false,

    // ARIA attributes
    get ariaAttrs() {
      return {
        'aria-label': this.text || 'Go back',
        'role': this.href ? 'link' : 'button'
      };
    },

    // Get the back arrow SVG
    get iconSvg() {
      return backArrowSvg;
    },

    // Navigate back
    goBack() {
      if (this.disabled) return;

      // If href is provided, navigate to it
      if (this.href) {
        window.location.href = this.href;
        return;
      }

      // Check if there's history to go back to
      if (window.history.length > 1) {
        window.history.back();
      } else if (this.defaultHref) {
        // Fallback to default href
        window.location.href = this.defaultHref;
      }

      // Dispatch event for custom handling
      this.$dispatch('back-button-click');
    },

    // Handle click
    handleClick(event) {
      // If it's a link and href is set, let it navigate normally
      if (this.href && event.currentTarget.tagName === 'A') {
        return;
      }

      event.preventDefault();
      this.goBack();
    },

    // Collapse/expand text (iOS scroll behavior)
    collapse() {
      this.collapsed = true;
    },

    expand() {
      this.collapsed = false;
    },

    toggle() {
      this.collapsed = !this.collapsed;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBackButton', backButtonComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxBackButton', backButtonComponent);
    });
  }

  // Export SVG for use in templates
  window.UX = window.UX || {};
  window.UX.backArrowSvg = backArrowSvg;
})();
