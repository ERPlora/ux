/**
 * UX FAB Component
 * Floating Action Buttons estilo Material/iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX FAB (Floating Action Button)
    ======================================== */

    .ux-fab {
      position: fixed;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-md);
    }

    /* Positions */
    .ux-fab--bottom-end {
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--bottom-start {
      bottom: var(--ux-space-lg);
      left: var(--ux-space-lg);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--bottom-center {
      bottom: var(--ux-space-lg);
      left: 50%;
      transform: translateX(-50%);
      bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-fab--top-end {
      top: var(--ux-space-lg);
      right: var(--ux-space-lg);
      top: calc(var(--ux-space-lg) + env(safe-area-inset-top));
    }

    .ux-fab--top-start {
      top: var(--ux-space-lg);
      left: var(--ux-space-lg);
      top: calc(var(--ux-space-lg) + env(safe-area-inset-top));
    }

    .ux-fab--center-end {
      top: 50%;
      right: var(--ux-space-lg);
      transform: translateY(-50%);
    }

    .ux-fab--center-start {
      top: 50%;
      left: var(--ux-space-lg);
      transform: translateY(-50%);
    }

    /* ========================================
       FAB Button
    ======================================== */

    .ux-fab__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      padding: 0;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border: none;
      border-radius: 50%;
      box-shadow: var(--ux-shadow-lg);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease-spring),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__button:hover {
      box-shadow: var(--ux-shadow-xl);
      transform: scale(1.05);
    }

    .ux-fab__button:active {
      transform: scale(0.95);
    }

    .ux-fab__button:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    .ux-fab__button-icon {
      width: 24px;
      height: 24px;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Rotate icon when open */
    .ux-fab--open .ux-fab__button-icon {
      transform: rotate(45deg);
    }

    /* ========================================
       FAB Button Sizes
    ======================================== */

    .ux-fab__button--sm {
      width: 40px;
      height: 40px;
    }

    .ux-fab__button--sm .ux-fab__button-icon {
      width: 20px;
      height: 20px;
    }

    .ux-fab__button--lg {
      width: 72px;
      height: 72px;
    }

    .ux-fab__button--lg .ux-fab__button-icon {
      width: 32px;
      height: 32px;
    }

    /* ========================================
       FAB Button Colors
    ======================================== */

    .ux-fab__button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-fab__button--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-fab__button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-fab__button--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-fab__button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-fab__button--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-fab__button--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    /* ========================================
       Extended FAB (with label)
    ======================================== */

    .ux-fab__button--extended {
      width: auto;
      height: 48px;
      padding: 0 var(--ux-space-lg) 0 var(--ux-space-md);
      border-radius: 24px;
      gap: var(--ux-space-sm);
    }

    .ux-fab__button-label {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      white-space: nowrap;
    }

    /* ========================================
       FAB List (Speed Dial)
    ======================================== */

    .ux-fab__list {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: var(--ux-space-md);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--open .ux-fab__list {
      opacity: 1;
      visibility: visible;
    }

    /* FAB List Items */
    .ux-fab__list-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease-spring);
    }

    .ux-fab--open .ux-fab__list-item {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    /* Stagger animation */
    .ux-fab--open .ux-fab__list-item:nth-child(1) { transition-delay: 0ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(2) { transition-delay: 50ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(3) { transition-delay: 100ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(4) { transition-delay: 150ms; }
    .ux-fab--open .ux-fab__list-item:nth-child(5) { transition-delay: 200ms; }

    /* Mini FAB button */
    .ux-fab__mini-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: none;
      border-radius: 50%;
      box-shadow: var(--ux-shadow-md);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-fab__mini-button:hover {
      box-shadow: var(--ux-shadow-lg);
      transform: scale(1.1);
    }

    .ux-fab__mini-button:active {
      transform: scale(0.95);
    }

    .ux-fab__mini-button-icon {
      width: 20px;
      height: 20px;
    }

    .ux-fab__mini-button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Mini button colors */
    .ux-fab__mini-button--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-fab__mini-button--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-fab__mini-button--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-fab__mini-button--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    /* Label */
    .ux-fab__list-label {
      padding: var(--ux-space-xs) var(--ux-space-md);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
      white-space: nowrap;
      box-shadow: var(--ux-shadow-sm);
    }

    /* Label position */
    .ux-fab--bottom-end .ux-fab__list-label,
    .ux-fab--center-end .ux-fab__list-label,
    .ux-fab--top-end .ux-fab__list-label {
      order: -1;
    }

    /* ========================================
       Horizontal FAB List
    ======================================== */

    .ux-fab--horizontal .ux-fab__list {
      flex-direction: row;
    }

    .ux-fab--horizontal.ux-fab--bottom-end .ux-fab__list,
    .ux-fab--horizontal.ux-fab--top-end .ux-fab__list {
      flex-direction: row-reverse;
    }

    .ux-fab--horizontal .ux-fab__list-item {
      flex-direction: column;
      transform: translateX(20px) scale(0.8);
    }

    .ux-fab--horizontal.ux-fab--bottom-start .ux-fab__list-item,
    .ux-fab--horizontal.ux-fab--top-start .ux-fab__list-item {
      transform: translateX(-20px) scale(0.8);
    }

    .ux-fab--horizontal.ux-fab--open .ux-fab__list-item {
      transform: translateX(0) scale(1);
    }

    /* ========================================
       FAB Backdrop
    ======================================== */

    .ux-fab__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--open .ux-fab__backdrop {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       FAB Badge
    ======================================== */

    .ux-fab__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 11px;
      font-weight: 600;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       FAB Scroll Behavior
    ======================================== */

    .ux-fab--hide-on-scroll {
      transition:
        transform var(--ux-transition-base) var(--ux-ease),
        opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-fab--hidden {
      transform: translateY(100px);
      opacity: 0;
      pointer-events: none;
    }

    .ux-fab--bottom-center.ux-fab--hidden {
      transform: translateX(-50%) translateY(100px);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-fab-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-fab-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for FAB with speed dial
  const fabComponent = (config = {}) => ({
    isOpen: false,
    hidden: false,
    lastScrollTop: 0,
    hideOnScroll: config.hideOnScroll || false,
    threshold: config.threshold || 50,

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    handleScroll(scrollTop) {
      if (!this.hideOnScroll) return;

      if (scrollTop > this.lastScrollTop && scrollTop > this.threshold) {
        this.hidden = true;
        this.close();
      } else {
        this.hidden = false;
      }

      this.lastScrollTop = scrollTop;
    },

    handleAction(action) {
      if (action && typeof action === 'function') {
        action();
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxFab', fabComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxFab', fabComponent);
    });
  }
})();
