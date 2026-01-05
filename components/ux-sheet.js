/**
 * UX Sheet Component
 * Bottom sheets y side sheets estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Sheet Backdrop
    ======================================== */

    .ux-sheet-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 350ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 350ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-sheet-backdrop--open {
      opacity: 1;
      visibility: visible;
      transition:
        opacity 300ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 300ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* ========================================
       UX Bottom Sheet
    ======================================== */

    .ux-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 90vh;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
      box-shadow: var(--ux-shadow-xl);
      display: flex;
      flex-direction: column;
      z-index: 1001;
      transform: translateY(100%);
      /* iOS-style smooth spring transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-sheet-backdrop--open .ux-sheet {
      transform: translateY(0);
      /* Faster, snappier spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* ========================================
       Sheet Handle
    ======================================== */

    .ux-sheet__handle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-sm) 0;
      cursor: grab;
      flex-shrink: 0;
    }

    .ux-sheet__handle:active {
      cursor: grabbing;
    }

    .ux-sheet__handle-bar {
      width: 36px;
      height: 4px;
      background-color: var(--ux-light-shade);
      border-radius: 2px;
    }

    /* ========================================
       Sheet Header
    ======================================== */

    .ux-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-sheet__header--no-border {
      border-bottom: none;
    }

    .ux-sheet__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-sheet__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background-color: var(--ux-surface-secondary);
      border: none;
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-sheet__close:hover {
      background-color: var(--ux-light);
    }

    .ux-sheet__close:active {
      background-color: var(--ux-light-shade);
    }

    .ux-sheet__close-icon {
      width: 18px;
      height: 18px;
    }

    .ux-sheet__close-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Sheet Content
    ======================================== */

    .ux-sheet__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-sheet__content--no-padding {
      padding: 0;
    }

    /* ========================================
       Sheet Footer
    ======================================== */

    .ux-sheet__footer {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-sheet__footer--row {
      flex-direction: row;
      justify-content: flex-end;
    }

    .ux-sheet__footer .ux-button {
      width: 100%;
    }

    .ux-sheet__footer--row .ux-button {
      width: auto;
      flex: 1;
    }

    /* ========================================
       Sheet Sizes
    ======================================== */

    .ux-sheet--sm {
      height: 40vh;
      max-height: 40vh;
    }

    .ux-sheet--md {
      height: 60vh;
      max-height: 60vh;
    }

    .ux-sheet--lg {
      height: 80vh;
      max-height: 80vh;
    }

    .ux-sheet--full {
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }

    /* Auto height based on content */
    .ux-sheet--auto {
      height: auto;
      max-height: 90vh;
    }

    /* ========================================
       Sheet Detents (snap points)
    ======================================== */

    .ux-sheet--detent-small {
      max-height: 25vh;
    }

    .ux-sheet--detent-medium {
      max-height: 50vh;
    }

    .ux-sheet--detent-large {
      max-height: 90vh;
    }

    /* ========================================
       Side Sheet
    ======================================== */

    .ux-side-sheet {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 320px;
      max-width: 85vw;
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-xl);
      display: flex;
      flex-direction: column;
      z-index: 1001;
      /* iOS-style smooth transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      will-change: transform;
    }

    .ux-side-sheet--left {
      left: 0;
      border-radius: 0 var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0;
      transform: translateX(-100%);
    }

    .ux-side-sheet--right {
      right: 0;
      border-radius: var(--ux-border-radius-xl) 0 0 var(--ux-border-radius-xl);
      transform: translateX(100%);
    }

    .ux-sheet-backdrop--open .ux-side-sheet--left,
    .ux-sheet-backdrop--open .ux-side-sheet--right {
      transform: translateX(0);
      /* Smooth spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    /* Side Sheet Header */
    .ux-side-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-top: calc(var(--ux-space-md) + env(safe-area-inset-top));
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-side-sheet__content {
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-side-sheet__footer {
      padding: var(--ux-space-md) var(--ux-space-lg);
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    /* ========================================
       Action Sheet
    ======================================== */

    .ux-action-sheet {
      position: fixed;
      left: var(--ux-space-sm);
      right: var(--ux-space-sm);
      bottom: var(--ux-space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      z-index: 1001;
      transform: translateY(calc(100% + var(--ux-space-lg)));
      /* iOS-style smooth transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-sheet-backdrop--open .ux-action-sheet {
      transform: translateY(0);
      /* Smooth spring for opening */
      transition: transform 400ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-action-sheet__group {
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-action-sheet__header {
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: center;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-action-sheet__title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text-secondary);
      margin: 0;
    }

    .ux-action-sheet__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      margin: var(--ux-space-xs) 0 0;
    }

    .ux-action-sheet__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-action-sheet__button:not(:last-child) {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-action-sheet__button:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-action-sheet__button:active {
      background-color: var(--ux-light);
    }

    .ux-action-sheet__button--destructive {
      color: var(--ux-danger);
    }

    .ux-action-sheet__button--cancel {
      font-weight: 600;
    }

    .ux-action-sheet__button-icon {
      width: 24px;
      height: 24px;
      margin-right: var(--ux-space-md);
    }

    .ux-action-sheet__button-icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Sheet with Scroll Lock Indicator
    ======================================== */

    .ux-sheet--scroll-lock .ux-sheet__content {
      overscroll-behavior-y: contain;
    }

  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-sheet-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-sheet-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for bottom sheet
  // ARIA: role="dialog", aria-modal="true", aria-labelledby
  const sheetComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    detent: config.detent || 'medium', // small, medium, large
    closeOnBackdrop: config.closeOnBackdrop !== false,
    draggable: config.draggable !== false,
    startY: 0,
    currentY: 0,
    isDragging: false,
    sheetId: config.id || 'ux-sheet-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes for the sheet
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.sheetId + '-title'
      };
    },

    get titleId() {
      return this.sheetId + '-title';
    },

    open(detent) {
      if (detent) this.detent = detent;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      // Focus first focusable element
      this.$nextTick(() => {
        const sheet = this.$refs.sheet || this.$el.querySelector('.ux-sheet, .ux-side-sheet');
        if (sheet) {
          const focusable = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }
      });
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

    setDetent(detent) {
      this.detent = detent;
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    handleTouchStart(event) {
      if (!this.draggable) return;
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event) {
      if (!this.isDragging) return;
      this.currentY = event.touches[0].clientY - this.startY;

      // Only allow dragging down
      if (this.currentY < 0) {
        this.currentY = 0;
      }
    },

    handleTouchEnd() {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Close if dragged more than 100px
      if (this.currentY > 100) {
        this.close();
      }

      this.currentY = 0;
    },

    getSheetStyle() {
      if (this.currentY > 0) {
        return {
          transform: `translateY(${this.currentY}px)`
        };
      }
      return {};
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSheet', sheetComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSheet', sheetComponent);
    });
  }

  // Alpine component for action sheet
  // ARIA: role="dialog", aria-modal="true", aria-labelledby
  const actionSheetComponent = (config = {}) => ({
    isOpen: false,
    title: config.title || '',
    message: config.message || '',
    buttons: config.buttons || [],
    cancelText: config.cancelText || 'Cancel',
    actionSheetId: config.id || 'ux-action-sheet-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.actionSheetId + '-title'
      };
    },

    get titleId() {
      return this.actionSheetId + '-title';
    },

    open(options = {}) {
      if (options.title) this.title = options.title;
      if (options.message) this.message = options.message;
      if (options.buttons) this.buttons = options.buttons;
      if (options.cancelText) this.cancelText = options.cancelText;

      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    handleButtonClick(button) {
      if (button.handler && typeof button.handler === 'function') {
        button.handler();
      }
      this.close();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxActionSheet', actionSheetComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxActionSheet', actionSheetComponent);
    });
  }
})();
