/**
 * UX Callout Component
 * Info boxes and callouts for documentation and alerts
 * Similar to GitHub/documentation callouts with iOS 26 Liquid Glass design
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Callout - Info Box Component
    ======================================== */

    .ux-callout {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: var(--ux-space-md);
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      border-left-width: 4px;
      border-left-color: var(--ux-primary);
      margin: var(--ux-space-lg) 0;
      transition:
        opacity var(--ux-transition-normal) var(--ux-ease-default),
        transform var(--ux-transition-normal) var(--ux-ease-default);
    }

    /* ========================================
       Callout Icon
    ======================================== */

    .ux-callout__icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: var(--ux-primary);
    }

    .ux-callout__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Callout Content
    ======================================== */

    .ux-callout__content {
      flex: 1;
      min-width: 0;
    }

    .ux-callout__title {
      font-size: var(--ux-font-size-md);
      font-weight: var(--ux-font-weight-semibold);
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-xs);
      line-height: 1.4;
    }

    .ux-callout__text {
      font-size: var(--ux-font-size-base);
      color: var(--ux-text-secondary);
      margin: 0;
      line-height: 1.6;
    }

    .ux-callout__text p {
      margin: 0 0 var(--ux-space-sm);
    }

    .ux-callout__text p:last-child {
      margin-bottom: 0;
    }

    .ux-callout__text a {
      color: var(--ux-primary);
      text-decoration: underline;
    }

    .ux-callout__text a:hover {
      text-decoration: none;
    }

    .ux-callout__text code {
      padding: 2px 6px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: var(--ux-border-radius-sm);
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      font-size: 0.9em;
    }

    /* When no title, remove extra spacing */
    .ux-callout__content > .ux-callout__text:first-child {
      margin-top: 0;
    }

    /* ========================================
       Close Button
    ======================================== */

    .ux-callout__close {
      position: absolute;
      top: var(--ux-space-sm);
      right: var(--ux-space-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-tertiary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease-default),
        color var(--ux-transition-fast) var(--ux-ease-default);
    }

    .ux-callout__close:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--ux-text);
    }

    .ux-callout__close:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .ux-callout__close svg {
      width: 16px;
      height: 16px;
    }

    /* Add padding-right when close button is present */
    .ux-callout--dismissible {
      padding-right: calc(var(--ux-space-lg) + 32px);
    }

    /* ========================================
       Color Variants
    ======================================== */

    /* Info (default - uses primary color) */
    .ux-callout--info {
      background-color: rgba(var(--ux-info-rgb), 0.08);
      border-color: rgba(var(--ux-info-rgb), 0.2);
      border-left-color: var(--ux-info);
    }

    .ux-callout--info .ux-callout__icon {
      color: var(--ux-info);
    }

    .ux-callout--info .ux-callout__title {
      color: var(--ux-info-shade);
    }

    /* Success */
    .ux-callout--success {
      background-color: rgba(var(--ux-success-rgb), 0.08);
      border-color: rgba(var(--ux-success-rgb), 0.2);
      border-left-color: var(--ux-success);
    }

    .ux-callout--success .ux-callout__icon {
      color: var(--ux-success);
    }

    .ux-callout--success .ux-callout__title {
      color: var(--ux-success-shade);
    }

    /* Warning */
    .ux-callout--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.08);
      border-color: rgba(var(--ux-warning-rgb), 0.2);
      border-left-color: var(--ux-warning);
    }

    .ux-callout--warning .ux-callout__icon {
      color: var(--ux-warning);
    }

    .ux-callout--warning .ux-callout__title {
      color: var(--ux-warning-shade);
    }

    /* Danger */
    .ux-callout--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.08);
      border-color: rgba(var(--ux-danger-rgb), 0.2);
      border-left-color: var(--ux-danger);
    }

    .ux-callout--danger .ux-callout__icon {
      color: var(--ux-danger);
    }

    .ux-callout--danger .ux-callout__title {
      color: var(--ux-danger-shade);
    }

    /* Neutral */
    .ux-callout--neutral {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
      border-left-color: var(--ux-medium);
    }

    .ux-callout--neutral .ux-callout__icon {
      color: var(--ux-text-secondary);
    }

    .ux-callout--neutral .ux-callout__title {
      color: var(--ux-text);
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    .ux-callout--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      border-left-width: 4px;
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-callout--glass.ux-callout--info {
      border-left-color: var(--ux-info);
    }

    .ux-callout--glass.ux-callout--success {
      border-left-color: var(--ux-success);
    }

    .ux-callout--glass.ux-callout--warning {
      border-left-color: var(--ux-warning);
    }

    .ux-callout--glass.ux-callout--danger {
      border-left-color: var(--ux-danger);
    }

    .ux-callout--glass.ux-callout--neutral {
      border-left-color: var(--ux-medium);
    }

    .ux-callout--glass .ux-callout__close:hover {
      background-color: rgba(var(--ux-text-rgb, 0, 0, 0), 0.05);
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-callout--glass {
        background-color: var(--ux-surface);
      }
    }

    /* ========================================
       Bordered Variant (full border, no left accent)
    ======================================== */

    .ux-callout--bordered {
      border-left-width: 1px;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-callout--sm {
      padding: var(--ux-space-md);
      gap: var(--ux-space-sm);
    }

    .ux-callout--sm .ux-callout__icon {
      width: 20px;
      height: 20px;
    }

    .ux-callout--sm .ux-callout__title {
      font-size: var(--ux-font-size-base);
    }

    .ux-callout--sm .ux-callout__text {
      font-size: var(--ux-font-size-sm);
    }

    .ux-callout--sm.ux-callout--dismissible {
      padding-right: calc(var(--ux-space-md) + 28px);
    }

    .ux-callout--lg {
      padding: var(--ux-space-xl);
      gap: var(--ux-space-lg);
    }

    .ux-callout--lg .ux-callout__icon {
      width: 28px;
      height: 28px;
    }

    .ux-callout--lg .ux-callout__title {
      font-size: var(--ux-font-size-lg);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-callout--lg .ux-callout__text {
      font-size: var(--ux-font-size-md);
    }

    .ux-callout--lg.ux-callout--dismissible {
      padding-right: calc(var(--ux-space-xl) + 36px);
    }

    /* ========================================
       Inline Variant (compact, no margin)
    ======================================== */

    .ux-callout--inline {
      margin: 0;
      display: inline-flex;
    }

    /* ========================================
       Dismissed State
    ======================================== */

    .ux-callout--dismissed {
      opacity: 0;
      transform: translateX(-10px);
      pointer-events: none;
    }

    .ux-callout--hidden {
      display: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--info {
        background-color: rgba(var(--ux-info-rgb), 0.12);
        border-color: rgba(var(--ux-info-rgb), 0.25);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--info .ux-callout__title {
        color: var(--ux-info-tint);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--success {
        background-color: rgba(var(--ux-success-rgb), 0.12);
        border-color: rgba(var(--ux-success-rgb), 0.25);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--success .ux-callout__title {
        color: var(--ux-success-tint);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--warning {
        background-color: rgba(var(--ux-warning-rgb), 0.12);
        border-color: rgba(var(--ux-warning-rgb), 0.25);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--warning .ux-callout__title {
        color: var(--ux-warning-tint);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--danger {
        background-color: rgba(var(--ux-danger-rgb), 0.12);
        border-color: rgba(var(--ux-danger-rgb), 0.25);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--danger .ux-callout__title {
        color: var(--ux-danger-tint);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout__text code {
        background-color: rgba(255, 255, 255, 0.08);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout__close:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      :root:not(.ux-light):not(.ux-theme-light) .ux-callout--glass .ux-callout__close:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    /* Manual dark mode class */
    .ux-dark .ux-callout--info,
    .ux-theme-dark .ux-callout--info {
      background-color: rgba(var(--ux-info-rgb), 0.12);
      border-color: rgba(var(--ux-info-rgb), 0.25);
    }

    .ux-dark .ux-callout--info .ux-callout__title,
    .ux-theme-dark .ux-callout--info .ux-callout__title {
      color: var(--ux-info-tint);
    }

    .ux-dark .ux-callout--success,
    .ux-theme-dark .ux-callout--success {
      background-color: rgba(var(--ux-success-rgb), 0.12);
      border-color: rgba(var(--ux-success-rgb), 0.25);
    }

    .ux-dark .ux-callout--success .ux-callout__title,
    .ux-theme-dark .ux-callout--success .ux-callout__title {
      color: var(--ux-success-tint);
    }

    .ux-dark .ux-callout--warning,
    .ux-theme-dark .ux-callout--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.12);
      border-color: rgba(var(--ux-warning-rgb), 0.25);
    }

    .ux-dark .ux-callout--warning .ux-callout__title,
    .ux-theme-dark .ux-callout--warning .ux-callout__title {
      color: var(--ux-warning-tint);
    }

    .ux-dark .ux-callout--danger,
    .ux-theme-dark .ux-callout--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.12);
      border-color: rgba(var(--ux-danger-rgb), 0.25);
    }

    .ux-dark .ux-callout--danger .ux-callout__title,
    .ux-theme-dark .ux-callout--danger .ux-callout__title {
      color: var(--ux-danger-tint);
    }

    .ux-dark .ux-callout__text code,
    .ux-theme-dark .ux-callout__text code {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .ux-dark .ux-callout__close:hover,
    .ux-theme-dark .ux-callout__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-callout--glass .ux-callout__close:hover,
    .ux-theme-dark .ux-callout--glass .ux-callout__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-callout {
        transition: opacity 0.1s ease;
      }

      .ux-callout--dismissed {
        transform: none;
      }

      .ux-callout__close {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-callout-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-callout-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for callout with dismiss functionality
  // ARIA: role="note" for informational callouts, "alert" for warnings/errors
  const calloutComponent = (config = {}) => ({
    visible: config.visible !== false,
    dismissible: config.dismissible !== false,
    dismissed: false,
    type: config.type || 'info',

    // ARIA attributes based on callout type
    get ariaAttrs() {
      const isUrgent = this.type === 'danger' || this.type === 'warning';
      return {
        'role': isUrgent ? 'alert' : 'note',
        'aria-live': isUrgent ? 'assertive' : 'polite'
      };
    },

    init() {
      // Listen for escape key if dismissible
      if (this.dismissible) {
        this._keyHandler = (e) => {
          if (e.key === 'Escape' && document.activeElement === this.$el) {
            this.dismiss();
          }
        };
        this.$el.addEventListener('keydown', this._keyHandler);
      }
    },

    destroy() {
      if (this._keyHandler) {
        this.$el.removeEventListener('keydown', this._keyHandler);
      }
    },

    dismiss() {
      if (!this.dismissible) return;

      this.dismissed = true;
      this.$dispatch('callout:dismiss');

      // Remove from DOM after animation
      setTimeout(() => {
        this.visible = false;
        this.$dispatch('callout:dismissed');
      }, 200);
    },

    show() {
      this.visible = true;
      this.dismissed = false;
      this.$dispatch('callout:show');
    },

    hide() {
      this.visible = false;
      this.$dispatch('callout:hide');
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCallout', calloutComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCallout', calloutComponent);
    });
  }
})();
