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
      z-index: var(--ux-z-modal-backdrop);
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
      max-height: var(--ux-modal-max-height);
      /* Glass by default (iOS style) */
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-radius: var(--ux-sheet-border-radius) var(--ux-sheet-border-radius) 0 0;
      border-top: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      display: flex;
      flex-direction: column;
      z-index: var(--ux-z-modal);
      transform: translateY(100%);
      /* iOS-style smooth spring transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-sheet {
        background-color: var(--ux-surface);
      }
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
      width: var(--ux-sheet-handle-width);
      height: var(--ux-sheet-handle-height);
      background-color: var(--ux-light-shade);
      border-radius: calc(var(--ux-sheet-handle-height) / 2);
    }

    /* ========================================
       Sheet Header
    ======================================== */

    .ux-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border-bottom: 0.5px solid var(--ux-glass-border);
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
      border-top: 0.5px solid var(--ux-glass-border);
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
       Glass Sheet (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    /* Sheet uses heavier blur for prominence */
    .ux-sheet--glass {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-top: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-sheet--glass .ux-sheet__header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-sheet--glass .ux-sheet__footer {
      border-top-color: var(--ux-glass-border);
    }

    .ux-sheet--glass .ux-sheet__handle-bar {
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* Dark mode glass sheet */
    @media (prefers-color-scheme: dark) {
      .ux-sheet--glass .ux-sheet__handle-bar {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .ux-dark .ux-sheet--glass .ux-sheet__handle-bar {
      background-color: rgba(255, 255, 255, 0.3);
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
      /* Glass by default (iOS style) */
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
      display: flex;
      flex-direction: column;
      z-index: var(--ux-z-modal);
      /* iOS-style smooth transition for closing */
      transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
      will-change: transform;
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-side-sheet {
        background-color: var(--ux-surface);
      }
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
      border-bottom: 0.5px solid var(--ux-glass-border);
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
      border-top: 0.5px solid var(--ux-glass-border);
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
      z-index: var(--ux-z-modal);
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
      /* Glass by default (iOS style) */
      background-color: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-action-sheet__group {
        background-color: var(--ux-surface);
      }
    }

    .ux-action-sheet__header {
      padding: var(--ux-space-md) var(--ux-space-lg);
      text-align: center;
      border-bottom: 0.5px solid var(--ux-glass-border);
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
      border-bottom: 0.5px solid var(--ux-glass-border);
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
       Glass Action Sheet (iOS 26 Liquid Glass)
    ======================================== */

    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    /* Action sheet uses heavier blur for prominence */
    .ux-action-sheet--glass .ux-action-sheet__group {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-action-sheet--glass .ux-action-sheet__header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-action-sheet--glass .ux-action-sheet__button:not(:last-child) {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-action-sheet--glass .ux-action-sheet__button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    /* Dark mode glass action sheet */
    @media (prefers-color-scheme: dark) {
      .ux-action-sheet--glass .ux-action-sheet__button:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }
    }

    .ux-dark .ux-action-sheet--glass .ux-action-sheet__button:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    /* ========================================
       Sheet with Scroll Lock Indicator
    ======================================== */

    .ux-sheet--scroll-lock .ux-sheet__content {
      overscroll-behavior-y: contain;
    }

    /* Sheet dragging state */
    .ux-sheet--dragging {
      transition: none !important;
    }

    /* ========================================
       Bootstrap Grid Support
       Use with: .ux-sheet-backdrop--grid .container .row .col-*
       Higher specificity selectors to override base fixed positioning
    ======================================== */

    .ux-sheet-backdrop.ux-sheet-backdrop--grid {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .ux-sheet-backdrop.ux-sheet-backdrop--grid > .container,
    .ux-sheet-backdrop.ux-sheet-backdrop--grid > .container-fluid {
      width: 100%;
      max-width: 100%;
      padding-bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
    }

    .ux-sheet-backdrop.ux-sheet-backdrop--grid .row {
      margin-left: 0;
      margin-right: 0;
    }

    /* Bottom sheet with grid - override fixed positioning */
    .ux-sheet-backdrop.ux-sheet-backdrop--grid .ux-sheet {
      position: static;
      left: auto;
      right: auto;
      bottom: auto;
      transform: translateY(100%);
      margin: 0;
      width: 100%;
    }

    .ux-sheet-backdrop.ux-sheet-backdrop--grid.ux-sheet-backdrop--open .ux-sheet {
      transform: translateY(0);
    }

    /* Action sheet with grid - override fixed positioning */
    .ux-sheet-backdrop.ux-sheet-backdrop--grid .ux-action-sheet {
      position: static;
      left: auto;
      right: auto;
      bottom: auto;
      transform: translateY(calc(100% + var(--ux-space-lg)));
      margin: 0;
      width: 100%;
      will-change: transform;
    }

    .ux-sheet-backdrop.ux-sheet-backdrop--grid.ux-sheet-backdrop--open .ux-action-sheet {
      transform: translateY(0);
      will-change: auto;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-sheet-backdrop {
        transition: opacity 0.1s ease, visibility 0.1s ease;
      }

      .ux-sheet,
      .ux-side-sheet,
      .ux-action-sheet {
        transition: transform 0.1s ease;
      }

      .ux-sheet-backdrop--open .ux-sheet,
      .ux-sheet-backdrop--open .ux-side-sheet--left,
      .ux-sheet-backdrop--open .ux-side-sheet--right,
      .ux-sheet-backdrop--open .ux-action-sheet {
        transition: transform 0.1s ease;
      }
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
  // Features: snap points (detents), velocity-based gestures, focus trap
  const sheetComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    detent: config.detent || 'medium', // small, medium, large
    detents: config.detents || ['medium', 'large'], // Available snap points
    closeOnBackdrop: config.closeOnBackdrop !== false,
    closeOnEscape: config.closeOnEscape !== false,
    draggable: config.draggable !== false,
    startY: 0,
    currentY: 0,
    isDragging: false,
    sheetId: config.id || 'ux-sheet-' + Math.random().toString(36).substr(2, 9),
    _touchStartTime: 0,
    _previousActiveElement: null,
    _focusTrapCleanup: null,

    // Detent heights as percentages of viewport
    _detentHeights: {
      small: 25,
      medium: 50,
      large: 90
    },

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
      this._previousActiveElement = document.activeElement;
      this.isOpen = true;

      // Use global scroll lock if available
      if (window.UX && window.UX.lockScroll) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Setup focus trap
      this.$nextTick(() => {
        const sheet = this.$refs.sheet || this.$el.querySelector('.ux-sheet, .ux-side-sheet');
        if (sheet && window.UX && window.UX.trapFocus) {
          this._focusTrapCleanup = window.UX.trapFocus(sheet);
        } else if (sheet) {
          // Fallback: focus first focusable element
          const focusable = sheet.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }

        // Announce to screen readers
        if (window.UX && window.UX.announce) {
          const title = this.$el.querySelector('[id$="-title"]');
          if (title) {
            window.UX.announce(title.textContent + ' sheet opened', 'assertive');
          }
        }
      });
    },

    close() {
      this.isOpen = false;

      // Cleanup focus trap
      if (this._focusTrapCleanup) {
        this._focusTrapCleanup();
        this._focusTrapCleanup = null;
      }

      // Use global scroll unlock if available
      if (window.UX && window.UX.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }

      // Restore focus
      if (this._previousActiveElement && this._previousActiveElement.focus) {
        this._previousActiveElement.focus();
      }
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

    handleKeydown(event) {
      if (this.closeOnEscape && event.key === 'Escape') {
        this.close();
      }
    },

    handleTouchStart(event) {
      if (!this.draggable) return;
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
      this._touchStartTime = Date.now();

      // Add dragging class for no-transition state
      const sheet = this.$refs.sheet || this.$el.querySelector('.ux-sheet');
      if (sheet) sheet.classList.add('ux-sheet--dragging');
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

      // Remove dragging class
      const sheet = this.$refs.sheet || this.$el.querySelector('.ux-sheet');
      if (sheet) sheet.classList.remove('ux-sheet--dragging');

      // Calculate velocity (pixels per millisecond)
      const touchDuration = Date.now() - this._touchStartTime;
      const velocity = this.currentY / touchDuration;

      // Fast swipe (velocity > 0.5 px/ms) - close immediately
      if (velocity > 0.5) {
        this.currentY = 0;
        this.close();
        return;
      }

      // Snap to detent based on drag distance
      const threshold = velocity > 0.2 ? 50 : 100; // Lower threshold for faster swipes

      if (this.currentY > threshold) {
        // Check if we should snap to a smaller detent or close
        const currentDetentIndex = this.detents.indexOf(this.detent);
        if (currentDetentIndex > 0) {
          // Snap to smaller detent
          this.detent = this.detents[currentDetentIndex - 1];
        } else {
          // Close the sheet
          this.close();
        }
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
    closeOnEscape: config.closeOnEscape !== false,
    actionSheetId: config.id || 'ux-action-sheet-' + Math.random().toString(36).substr(2, 9),
    _previousActiveElement: null,
    _focusTrapCleanup: null,

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

      this._previousActiveElement = document.activeElement;
      this.isOpen = true;

      // Use global scroll lock if available
      if (window.UX && window.UX.lockScroll) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Setup focus trap
      this.$nextTick(() => {
        const actionSheet = this.$el.querySelector('.ux-action-sheet');
        if (actionSheet && window.UX && window.UX.trapFocus) {
          this._focusTrapCleanup = window.UX.trapFocus(actionSheet);
        }
      });
    },

    close() {
      this.isOpen = false;

      // Cleanup focus trap
      if (this._focusTrapCleanup) {
        this._focusTrapCleanup();
        this._focusTrapCleanup = null;
      }

      // Use global scroll unlock if available
      if (window.UX && window.UX.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }

      // Restore focus
      if (this._previousActiveElement && this._previousActiveElement.focus) {
        this._previousActiveElement.focus();
      }
    },

    handleKeydown(event) {
      if (this.closeOnEscape && event.key === 'Escape') {
        this.close();
      }
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
