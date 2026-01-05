/**
 * UX Modal Component
 * Modales estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Modal Backdrop
    ======================================== */

    .ux-modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-lg);
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-modal-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* Mobile: align to bottom */
    @media (max-width: 767px) {
      .ux-modal-backdrop {
        align-items: flex-end;
        padding: 0;
      }
    }

    /* ========================================
       UX Modal
    ======================================== */

    .ux-modal {
      position: relative;
      width: 100%;
      max-width: 500px;
      max-height: calc(100vh - var(--ux-space-2xl) * 2);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: scale(0.95) translateY(20px);
      opacity: 0;
      transition:
        transform var(--ux-transition-base) var(--ux-ease-spring),
        opacity var(--ux-transition-base) var(--ux-ease);
    }

    .ux-modal-backdrop--open .ux-modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    /* Mobile: sheet style */
    @media (max-width: 767px) {
      .ux-modal {
        max-width: none;
        max-height: 90vh;
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        transform: translateY(100%);
      }

      .ux-modal-backdrop--open .ux-modal {
        transform: translateY(0);
      }
    }

    /* ========================================
       Modal Sizes
    ======================================== */

    .ux-modal--sm {
      max-width: 360px;
    }

    .ux-modal--lg {
      max-width: 680px;
    }

    .ux-modal--xl {
      max-width: 900px;
    }

    .ux-modal--full {
      max-width: none;
      max-height: none;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }

    @media (max-width: 767px) {
      .ux-modal--full {
        max-height: 100vh;
        border-radius: 0;
      }
    }

    /* ========================================
       Modal Header
    ======================================== */

    .ux-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-modal__header--no-border {
      border-bottom: none;
    }

    .ux-modal__header-start {
      display: flex;
      align-items: center;
      min-width: 60px;
    }

    .ux-modal__header-center {
      flex: 1;
      text-align: center;
    }

    .ux-modal__header-end {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-width: 60px;
    }

    .ux-modal__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-modal__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    /* Header buttons */
    .ux-modal__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: var(--ux-space-xs);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-modal__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-modal__button:active {
      opacity: 0.7;
    }

    .ux-modal__button-icon {
      width: 24px;
      height: 24px;
    }

    .ux-modal__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* Close X button */
    .ux-modal__close {
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Modal Handle (mobile drag indicator)
    ======================================== */

    .ux-modal__handle {
      display: none;
      width: 36px;
      height: 4px;
      margin: var(--ux-space-sm) auto;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
      flex-shrink: 0;
    }

    @media (max-width: 767px) {
      .ux-modal__handle {
        display: block;
      }
    }

    /* ========================================
       Modal Content
    ======================================== */

    .ux-modal__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-modal__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Modal Footer
    ======================================== */

    .ux-modal__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-modal__footer--no-border {
      border-top: none;
    }

    .ux-modal__footer--stacked {
      flex-direction: column;
    }

    .ux-modal__footer--stacked .ux-button {
      width: 100%;
    }

    .ux-modal__footer--safe-area {
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    /* ========================================
       Card Modal (iOS style)
    ======================================== */

    .ux-modal--card {
      margin: var(--ux-space-md);
    }

    @media (max-width: 767px) {
      .ux-modal--card {
        margin: var(--ux-space-sm);
        margin-bottom: 0;
        max-height: calc(100vh - var(--ux-space-sm));
        border-radius: var(--ux-border-radius-xl);
      }

      .ux-modal-backdrop--open .ux-modal--card {
        transform: translateY(0);
      }
    }

    /* ========================================
       Fullscreen Modal
    ======================================== */

    .ux-modal--fullscreen {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      border-radius: 0;
      transform: translateY(100%);
    }

    .ux-modal-backdrop--open .ux-modal--fullscreen {
      transform: translateY(0);
    }

    /* ========================================
       Centered Content Modal (for alerts)
    ======================================== */

    .ux-modal--centered .ux-modal__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* ========================================
       Modal with Image
    ======================================== */

    .ux-modal__image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }

    /* ========================================
       Stacked Modals
    ======================================== */

    .ux-modal-backdrop + .ux-modal-backdrop {
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* ========================================
       CSS-Only Modal (Checkbox Hack)
    ======================================== */

    .ux-modal-toggle {
      display: none;
    }

    .ux-modal-toggle:checked + label + .ux-modal-backdrop {
      opacity: 1;
      visibility: visible;
    }

    .ux-modal-toggle:checked + label + .ux-modal-backdrop .ux-modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    @media (max-width: 767px) {
      .ux-modal-toggle:checked + label + .ux-modal-backdrop .ux-modal {
        transform: translateY(0);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-modal-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-modal-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for modal
  const modalComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    closeOnBackdrop: config.closeOnBackdrop !== false,
    closeOnEscape: config.closeOnEscape !== false,

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    handleKeydown(event) {
      if (this.closeOnEscape && event.key === 'Escape') {
        this.close();
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxModal', modalComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxModal', modalComponent);
    });
  }
})();
