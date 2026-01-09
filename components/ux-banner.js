/**
 * UX Banner Component
 * Dismissable notification bar estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Banner - CSS Variables
    ======================================== */

    :root {
      --ux-banner-min-height: 48px;
      --ux-banner-padding-x: var(--ux-space-lg);
      --ux-banner-padding-y: var(--ux-space-md);
      --ux-banner-gap: var(--ux-space-md);
      --ux-banner-icon-size: 20px;
      --ux-banner-border-radius: 0;
      --ux-banner-font-size: var(--ux-font-size-sm);
    }

    /* ========================================
       UX Banner Base
    ======================================== */

    .ux-banner {
      display: flex;
      align-items: center;
      gap: var(--ux-banner-gap);
      min-height: var(--ux-banner-min-height);
      padding: var(--ux-banner-padding-y) var(--ux-banner-padding-x);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      font-size: var(--ux-banner-font-size);
      line-height: 1.4;
      width: 100%;
      box-sizing: border-box;
      opacity: 1;
      transform: translateY(0);
      max-height: 200px;
      overflow: hidden;
      transition:
        opacity var(--ux-transition-normal) var(--ux-ease),
        transform var(--ux-transition-normal) var(--ux-ease),
        max-height var(--ux-transition-normal) var(--ux-ease),
        padding var(--ux-transition-normal) var(--ux-ease);
    }

    /* Hidden state for dismiss animation */
    .ux-banner--hidden {
      opacity: 0;
      transform: translateY(-100%);
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
      border-bottom-width: 0;
    }

    /* Sticky positioning */
    .ux-banner--sticky {
      position: sticky;
      top: 0;
      z-index: var(--ux-z-sticky);
    }

    /* Fixed positioning (full width at top) */
    .ux-banner--fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-fixed);
    }

    /* Safe area support for fixed banner */
    .ux-banner--fixed.ux-banner--safe-area {
      padding-top: calc(var(--ux-banner-padding-y) + env(safe-area-inset-top));
    }

    /* ========================================
       Banner Icon
    ======================================== */

    .ux-banner__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-banner-icon-size);
      height: var(--ux-banner-icon-size);
      flex-shrink: 0;
    }

    .ux-banner__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Banner Content
    ======================================== */

    .ux-banner__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-banner__title {
      font-weight: var(--ux-font-weight-semibold);
      color: var(--ux-text);
      margin: 0;
    }

    .ux-banner__message {
      color: var(--ux-text-secondary);
      margin: 0;
    }

    /* Single line content (no title, just message) */
    .ux-banner__content--inline {
      flex-direction: row;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Banner Actions
    ======================================== */

    .ux-banner__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    .ux-banner__action {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: var(--ux-font-weight-semibold);
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-banner__action:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-banner__action:active {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
    }

    /* ========================================
       Banner Close Button
    ======================================== */

    .ux-banner__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      flex-shrink: 0;
      border-radius: var(--ux-border-radius-sm);
      -webkit-tap-highlight-color: transparent;
      transition:
        color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-banner__close:hover {
      color: var(--ux-text);
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ux-banner__close:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .ux-banner__close svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Banner Color Variants
    ======================================== */

    /* Info (default blue) */
    .ux-banner--info {
      background-color: rgba(var(--ux-info-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-info-rgb), 0.2);
    }

    .ux-banner--info .ux-banner__icon {
      color: var(--ux-info);
    }

    .ux-banner--info .ux-banner__action {
      color: var(--ux-info);
    }

    .ux-banner--info .ux-banner__action:hover {
      background-color: rgba(var(--ux-info-rgb), 0.15);
    }

    /* Success (green) */
    .ux-banner--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-success-rgb), 0.2);
    }

    .ux-banner--success .ux-banner__icon {
      color: var(--ux-success);
    }

    .ux-banner--success .ux-banner__action {
      color: var(--ux-success);
    }

    .ux-banner--success .ux-banner__action:hover {
      background-color: rgba(var(--ux-success-rgb), 0.15);
    }

    /* Warning (amber) */
    .ux-banner--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-warning-rgb), 0.2);
    }

    .ux-banner--warning .ux-banner__icon {
      color: var(--ux-warning);
    }

    .ux-banner--warning .ux-banner__action {
      color: var(--ux-warning-shade);
    }

    .ux-banner--warning .ux-banner__action:hover {
      background-color: rgba(var(--ux-warning-rgb), 0.15);
    }

    /* Danger (red) */
    .ux-banner--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      border-bottom-color: rgba(var(--ux-danger-rgb), 0.2);
    }

    .ux-banner--danger .ux-banner__icon {
      color: var(--ux-danger);
    }

    .ux-banner--danger .ux-banner__action {
      color: var(--ux-danger);
    }

    .ux-banner--danger .ux-banner__action:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.15);
    }

    /* ========================================
       Banner Filled Variants (solid background)
    ======================================== */

    .ux-banner--info-filled {
      background-color: var(--ux-info);
      color: var(--ux-info-contrast);
      border-bottom-color: var(--ux-info-shade);
    }

    .ux-banner--info-filled .ux-banner__icon,
    .ux-banner--info-filled .ux-banner__title,
    .ux-banner--info-filled .ux-banner__message {
      color: var(--ux-info-contrast);
    }

    .ux-banner--info-filled .ux-banner__action {
      color: var(--ux-info-contrast);
    }

    .ux-banner--info-filled .ux-banner__action:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    .ux-banner--info-filled .ux-banner__close {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-banner--info-filled .ux-banner__close:hover {
      color: var(--ux-info-contrast);
      background-color: rgba(255, 255, 255, 0.15);
    }

    .ux-banner--success-filled {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
      border-bottom-color: var(--ux-success-shade);
    }

    .ux-banner--success-filled .ux-banner__icon,
    .ux-banner--success-filled .ux-banner__title,
    .ux-banner--success-filled .ux-banner__message {
      color: var(--ux-success-contrast);
    }

    .ux-banner--success-filled .ux-banner__action {
      color: var(--ux-success-contrast);
    }

    .ux-banner--success-filled .ux-banner__action:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    .ux-banner--success-filled .ux-banner__close {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-banner--success-filled .ux-banner__close:hover {
      color: var(--ux-success-contrast);
      background-color: rgba(255, 255, 255, 0.15);
    }

    .ux-banner--warning-filled {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
      border-bottom-color: var(--ux-warning-shade);
    }

    .ux-banner--warning-filled .ux-banner__icon,
    .ux-banner--warning-filled .ux-banner__title,
    .ux-banner--warning-filled .ux-banner__message {
      color: var(--ux-warning-contrast);
    }

    .ux-banner--warning-filled .ux-banner__action {
      color: var(--ux-warning-contrast);
    }

    .ux-banner--warning-filled .ux-banner__action:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .ux-banner--warning-filled .ux-banner__close {
      color: rgba(0, 0, 0, 0.5);
    }

    .ux-banner--warning-filled .ux-banner__close:hover {
      color: var(--ux-warning-contrast);
      background-color: rgba(0, 0, 0, 0.1);
    }

    .ux-banner--danger-filled {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
      border-bottom-color: var(--ux-danger-shade);
    }

    .ux-banner--danger-filled .ux-banner__icon,
    .ux-banner--danger-filled .ux-banner__title,
    .ux-banner--danger-filled .ux-banner__message {
      color: var(--ux-danger-contrast);
    }

    .ux-banner--danger-filled .ux-banner__action {
      color: var(--ux-danger-contrast);
    }

    .ux-banner--danger-filled .ux-banner__action:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    .ux-banner--danger-filled .ux-banner__close {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-banner--danger-filled .ux-banner__close:hover {
      color: var(--ux-danger-contrast);
      background-color: rgba(255, 255, 255, 0.15);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter comes from universal selector [class*="--glass"] in ux-core.js */
    .ux-banner--glass {
      border-bottom: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-banner--glass .ux-banner__action:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ux-banner--glass .ux-banner__close:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-banner--glass {
        background-color: var(--ux-surface);
      }
    }

    /* ========================================
       Inline/Card Variant (with border radius)
    ======================================== */

    .ux-banner--inline {
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      margin: var(--ux-space-md);
      width: auto;
    }

    .ux-banner--inline.ux-banner--info {
      border-color: rgba(var(--ux-info-rgb), 0.3);
    }

    .ux-banner--inline.ux-banner--success {
      border-color: rgba(var(--ux-success-rgb), 0.3);
    }

    .ux-banner--inline.ux-banner--warning {
      border-color: rgba(var(--ux-warning-rgb), 0.3);
    }

    .ux-banner--inline.ux-banner--danger {
      border-color: rgba(var(--ux-danger-rgb), 0.3);
    }

    /* ========================================
       Dark Mode Support
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-banner {
        background-color: var(--ux-surface);
      }

      .ux-banner__close:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .ux-banner--glass .ux-banner__action:hover,
      .ux-banner--glass .ux-banner__close:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-banner {
      background-color: var(--ux-surface);
    }

    .ux-dark .ux-banner__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-banner--glass .ux-banner__action:hover,
    .ux-dark .ux-banner--glass .ux-banner__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Responsive Adjustments
    ======================================== */

    @media (max-width: 767px) {
      .ux-banner {
        --ux-banner-padding-x: var(--ux-space-md);
        --ux-banner-gap: var(--ux-space-sm);
      }

      .ux-banner__actions {
        flex-direction: column;
        align-items: flex-end;
      }
    }

    /* ========================================
       Reduced Motion Support
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-banner {
        transition: opacity 0.1s ease;
        transform: none !important;
      }

      .ux-banner--hidden {
        transform: none;
      }

      .ux-banner__action,
      .ux-banner__close {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-banner-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-banner-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for banner
  // ARIA: role="alert" or role="status" for announcements
  const bannerComponent = (config = {}) => ({
    visible: config.visible !== false,
    autoDismiss: config.autoDismiss || 0,
    _timer: null,
    bannerId: config.id || 'ux-banner-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for banner
    get ariaAttrs() {
      const isUrgent = config.type === 'danger' || config.type === 'warning';
      return {
        'role': isUrgent ? 'alert' : 'status',
        'aria-live': isUrgent ? 'assertive' : 'polite',
        'aria-atomic': 'true'
      };
    },

    init() {
      // Auto dismiss if configured
      if (this.autoDismiss > 0 && this.visible) {
        this._startAutoDismiss();
      }
    },

    destroy() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
    },

    _startAutoDismiss() {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = setTimeout(() => {
        this.dismiss();
      }, this.autoDismiss);
    },

    show(options = {}) {
      if (options.autoDismiss !== undefined) {
        this.autoDismiss = options.autoDismiss;
      }

      this.visible = true;
      this.$dispatch('banner:show', { id: this.bannerId });

      // Announce to screen readers
      if (window.UX && window.UX.announce) {
        const message = this.$el.querySelector('.ux-banner__message')?.textContent || '';
        const isUrgent = this.$el.classList.contains('ux-banner--danger') ||
                         this.$el.classList.contains('ux-banner--warning');
        window.UX.announce(message, isUrgent ? 'assertive' : 'polite');
      }

      // Start auto dismiss timer
      if (this.autoDismiss > 0) {
        this._startAutoDismiss();
      }
    },

    dismiss() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }

      this.visible = false;
      this.$dispatch('banner:dismiss', { id: this.bannerId });
    },

    toggle() {
      if (this.visible) {
        this.dismiss();
      } else {
        this.show();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBanner', bannerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxBanner', bannerComponent);
    });
  }
})();
