/**
 * UX Modal Component
 * Modal centrado con soporte Bootstrap Grid
 * Funciona con JavaScript puro o Alpine.js
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
      z-index: var(--ux-z-modal-backdrop);
      display: block;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      opacity: 0;
      visibility: hidden;
      /* iOS-style fade - slightly faster than modal */
      transition:
        opacity 300ms cubic-bezier(0.32, 0.72, 0, 1),
        visibility 300ms cubic-bezier(0.32, 0.72, 0, 1);
    }

    .ux-modal-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* Faster fade out when closing */
    .ux-modal-backdrop:not(.ux-modal-backdrop--open) {
      transition:
        opacity 250ms ease-in,
        visibility 250ms ease-in;
    }

    /* ========================================
       UX Modal
    ======================================== */

    .ux-modal {
      position: relative;
      width: 100%;
      background-color: var(--ux-surface);
      border-radius: var(--ux-modal-border-radius);
      box-shadow: var(--ux-shadow-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      /* iOS-style entrance: scale up with spring */
      transform: scale(0.9);
      opacity: 0;
      will-change: transform, opacity;
      /* iOS spring animation curve */
      transition:
        transform 400ms cubic-bezier(0.32, 0.72, 0, 1),
        opacity 250ms ease-out;
    }

    .ux-modal-backdrop--open .ux-modal {
      transform: scale(1);
      opacity: 1;
      will-change: auto;
    }

    /* Closing animation - slightly faster */
    .ux-modal-backdrop:not(.ux-modal-backdrop--open) .ux-modal {
      transition:
        transform 300ms cubic-bezier(0.32, 0.72, 0, 1),
        opacity 200ms ease-in;
    }

    /* Mobile: sheet style from bottom */
    @media (max-width: 767px) {
      .ux-modal {
        border-radius: var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0 0;
        transform: translateY(100%);
        /* iOS sheet animation */
        transition:
          transform 400ms cubic-bezier(0.32, 0.72, 0, 1),
          opacity 250ms ease-out;
      }

      .ux-modal-backdrop--open .ux-modal {
        transform: translateY(0);
      }

      .ux-modal-backdrop:not(.ux-modal-backdrop--open) .ux-modal {
        transition:
          transform 350ms cubic-bezier(0.32, 0.72, 0, 1),
          opacity 200ms ease-in;
      }
    }

    /* ========================================
       Full Height Modifier
    ======================================== */

    .ux-modal--full-height {
      height: 100dvh;
      max-height: 100dvh;
      border-radius: 0;
    }

    @media (max-width: 767px) {
      .ux-modal--full-height {
        border-radius: 0;
      }
    }

    /* ========================================
       Side Modals (Left/Right)
       Full height panels from sides
    ======================================== */

    /* Backdrop for side modals - no grid centering needed */
    .ux-modal-backdrop--side {
      display: flex;
      align-items: stretch;
    }

    .ux-modal-backdrop--side.ux-modal-backdrop--left {
      justify-content: flex-start;
    }

    .ux-modal-backdrop--side.ux-modal-backdrop--right {
      justify-content: flex-end;
    }

    /* Side modal base */
    .ux-modal--side {
      position: relative;
      height: 100dvh;
      max-height: 100dvh;
      border-radius: 0;
      flex-shrink: 0;
    }

    /* Left side modal */
    .ux-modal--left {
      transform: translateX(-100%);
      border-radius: 0 var(--ux-border-radius-xl) var(--ux-border-radius-xl) 0;
    }

    .ux-modal-backdrop--open .ux-modal--left {
      transform: translateX(0);
    }

    /* Right side modal */
    .ux-modal--right {
      transform: translateX(100%);
      border-radius: var(--ux-border-radius-xl) 0 0 var(--ux-border-radius-xl);
    }

    .ux-modal-backdrop--open .ux-modal--right {
      transform: translateX(0);
    }

    /* Side modal animations - iOS spring curve */
    .ux-modal--left,
    .ux-modal--right {
      transition:
        transform 400ms cubic-bezier(0.32, 0.72, 0, 1),
        opacity 300ms var(--ux-ease);
    }

    /* Mobile: side modals take full width */
    @media (max-width: 767px) {
      .ux-modal--left,
      .ux-modal--right {
        width: 100%;
        max-width: 100%;
        border-radius: 0;
      }
    }

    /* Glass variant for side modals */
    .ux-modal--glass.ux-modal--left {
      border-radius: 0 var(--ux-glass-radius-xl) var(--ux-glass-radius-xl) 0;
    }

    .ux-modal--glass.ux-modal--right {
      border-radius: var(--ux-glass-radius-xl) 0 0 var(--ux-glass-radius-xl);
    }

    @media (max-width: 767px) {
      .ux-modal--glass.ux-modal--left,
      .ux-modal--glass.ux-modal--right {
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
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: var(--ux-space-xs);
      background: none;
      border: none;
      color: var(--ux-text-secondary);
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      -webkit-tap-highlight-color: transparent;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-modal__close:hover {
      opacity: 0.7;
    }

    .ux-modal__close:active {
      opacity: 0.5;
    }

    /* ========================================
       Modal Handle (iOS drag indicator)
    ======================================== */

    .ux-modal__handle {
      display: none;
      width: var(--ux-handle-width, 36px);
      height: var(--ux-handle-height, 5px);
      margin: var(--ux-space-sm) auto var(--ux-space-xs);
      background-color: var(--ux-handle-color, var(--ux-gray-300));
      border-radius: var(--ux-handle-radius, 2.5px);
      flex-shrink: 0;
      opacity: 0.6;
    }

    /* Show handle on mobile for sheet-style modals */
    @media (max-width: 767px) {
      .ux-modal__handle {
        display: block;
      }
    }

    /* Force show handle with modifier */
    .ux-modal--with-handle .ux-modal__handle {
      display: block;
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

    .ux-modal__content--centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
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
       Modal Image
    ======================================== */

    .ux-modal__image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }

    /* ========================================
       Glass Modal (iOS 26 Liquid Glass)
    ======================================== */

    .ux-modal--glass {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-glass-radius-xl);
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    .ux-modal--glass .ux-modal__header {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-modal--glass .ux-modal__footer {
      border-top-color: var(--ux-glass-border);
    }

    @media (max-width: 767px) {
      .ux-modal--glass {
        border-radius: var(--ux-glass-radius-xl) var(--ux-glass-radius-xl) 0 0;
      }
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

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-modal-backdrop {
        transition: none;
      }

      .ux-modal {
        transition: none;
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

  // ========================================
  // Vanilla JS Modal Class
  // ========================================

  class UXModal {
    constructor(element, options = {}) {
      this.el = typeof element === 'string' ? document.querySelector(element) : element;
      if (!this.el) return;

      this.options = {
        closeOnBackdrop: this.el.dataset.closeOnBackdrop !== 'false',
        closeOnEscape: this.el.dataset.closeOnEscape !== 'false',
        ...options
      };

      this.backdrop = this.el;
      this.modal = this.el.querySelector('.ux-modal');
      this.modalId = this.el.id || 'ux-modal-' + Math.random().toString(36).substring(2, 11);
      this.isOpen = false;
      this._previousActiveElement = null;
      this._boundHandleKeydown = this._handleKeydown.bind(this);
      this._boundHandleBackdropClick = this._handleBackdropClick.bind(this);

      this._init();
    }

    _init() {
      if (!this.modal) return;

      // Set ARIA attributes
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');

      const title = this.modal.querySelector('.ux-modal__title');
      if (title) {
        const titleId = title.id || `${this.modalId}-title`;
        title.id = titleId;
        this.modal.setAttribute('aria-labelledby', titleId);
      }

      const content = this.modal.querySelector('.ux-modal__content');
      if (content) {
        const contentId = content.id || `${this.modalId}-content`;
        content.id = contentId;
        this.modal.setAttribute('aria-describedby', contentId);
      }

      // Find close buttons
      const closeButtons = this.modal.querySelectorAll('[data-modal-close], .ux-modal__close');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // Check if already open
      if (this.backdrop.classList.contains('ux-modal-backdrop--open')) {
        this.isOpen = true;
        this._setupOpenState();
      }

      // Store instance
      this.el._uxModal = this;
    }

    _getFocusableElements() {
      if (!this.modal) return [];
      const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      return Array.from(this.modal.querySelectorAll(selector)).filter(el => el.offsetParent !== null);
    }

    _setupOpenState() {
      // Add event listeners
      document.addEventListener('keydown', this._boundHandleKeydown);
      this.backdrop.addEventListener('click', this._boundHandleBackdropClick);

      // Lock scroll
      if (window.UX?.lockScroll) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      // Focus trap
      if (this.modal && window.UX?.trapFocus) {
        this._focusTrapCleanup = window.UX.trapFocus(this.modal);
      } else {
        // Focus first focusable element
        const focusable = this._getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }

    _cleanupOpenState() {
      // Remove event listeners
      document.removeEventListener('keydown', this._boundHandleKeydown);
      this.backdrop.removeEventListener('click', this._boundHandleBackdropClick);

      // Cleanup focus trap
      if (this._focusTrapCleanup) {
        this._focusTrapCleanup();
        this._focusTrapCleanup = null;
      }

      // Unlock scroll
      if (window.UX?.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }
    }

    _handleKeydown(event) {
      if (event.key === 'Escape' && this.options.closeOnEscape) {
        this.close();
        return;
      }

      // Focus trap fallback
      if (event.key === 'Tab' && !this._focusTrapCleanup) {
        const focusable = this._getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    _handleBackdropClick(event) {
      if (this.options.closeOnBackdrop && event.target === this.backdrop) {
        this.close();
      }
    }

    open() {
      if (this.isOpen) return;

      this._previousActiveElement = document.activeElement;
      this.isOpen = true;
      this.backdrop.classList.add('ux-modal-backdrop--open');

      this._setupOpenState();

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('modal:open', { bubbles: true }));
    }

    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.backdrop.classList.remove('ux-modal-backdrop--open');

      this._cleanupOpenState();

      // Restore focus
      if (this._previousActiveElement?.focus) {
        this._previousActiveElement.focus();
      }

      // Dispatch event
      this.el.dispatchEvent(new CustomEvent('modal:close', { bubbles: true }));
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    destroy() {
      this._cleanupOpenState();
      delete this.el._uxModal;
    }

    static getInstance(element) {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      return el?._uxModal || null;
    }

    // Static method to open modal by ID
    static open(id) {
      const el = document.getElementById(id);
      if (el) {
        const instance = UXModal.getInstance(el) || new UXModal(el);
        instance.open();
        return instance;
      }
      return null;
    }

    // Static method to close modal by ID
    static close(id) {
      const el = document.getElementById(id);
      const instance = UXModal.getInstance(el);
      if (instance) {
        instance.close();
      }
    }
  }

  // ========================================
  // Auto-initialize vanilla JS modals
  // ========================================

  function initModals() {
    document.querySelectorAll('[data-ux-modal]').forEach(el => {
      if (!el._uxModal) {
        new UXModal(el);
      }
    });

    // Setup trigger buttons
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      if (btn._uxModalTrigger) return;
      btn._uxModalTrigger = true;

      btn.addEventListener('click', () => {
        const targetId = btn.dataset.modalOpen;
        UXModal.open(targetId);
      });
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModals);
  } else {
    initModals();
  }

  // Observe for dynamically added modals
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.hasAttribute('data-ux-modal')) {
            new UXModal(node);
          }
          if (node.hasAttribute('data-modal-open') && !node._uxModalTrigger) {
            node._uxModalTrigger = true;
            node.addEventListener('click', () => {
              UXModal.open(node.dataset.modalOpen);
            });
          }
          node.querySelectorAll?.('[data-ux-modal]').forEach(el => {
            if (!el._uxModal) new UXModal(el);
          });
          node.querySelectorAll?.('[data-modal-open]').forEach(btn => {
            if (!btn._uxModalTrigger) {
              btn._uxModalTrigger = true;
              btn.addEventListener('click', () => {
                UXModal.open(btn.dataset.modalOpen);
              });
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // ========================================
  // Alpine.js Component (for backward compatibility)
  // ========================================

  const modalComponent = (config = {}) => ({
    isOpen: config.isOpen || false,
    closeOnBackdrop: config.closeOnBackdrop !== false,
    closeOnEscape: config.closeOnEscape !== false,
    modalId: config.id || 'ux-modal-' + Math.random().toString(36).substring(2, 11),
    _previousActiveElement: null,
    _focusTrapCleanup: null,

    get ariaAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.modalId + '-title',
        'aria-describedby': this.modalId + '-content'
      };
    },

    get titleId() {
      return this.modalId + '-title';
    },

    get contentId() {
      return this.modalId + '-content';
    },

    _getFocusableElements() {
      const modal = this.$refs.modal || this.$el.querySelector('.ux-modal');
      if (!modal) return [];
      const selector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      return Array.from(modal.querySelectorAll(selector)).filter(el => el.offsetParent !== null);
    },

    open() {
      this._previousActiveElement = document.activeElement;
      this.isOpen = true;

      if (window.UX?.lockScroll) {
        window.UX.lockScroll();
      } else {
        document.body.style.overflow = 'hidden';
      }

      this.$nextTick(() => {
        const modal = this.$refs.modal || this.$el.querySelector('.ux-modal');
        if (modal && window.UX?.trapFocus) {
          this._focusTrapCleanup = window.UX.trapFocus(modal);
        } else {
          const focusable = this._getFocusableElements();
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }

        if (window.UX?.announce) {
          const title = this.$el.querySelector('[id$="-title"]');
          if (title) {
            window.UX.announce(title.textContent + ' dialog opened', 'assertive');
          }
        }
      });
    },

    close() {
      this.isOpen = false;

      if (this._focusTrapCleanup) {
        this._focusTrapCleanup();
        this._focusTrapCleanup = null;
      }

      if (window.UX?.unlockScroll) {
        window.UX.unlockScroll();
      } else {
        document.body.style.overflow = '';
      }

      if (this._previousActiveElement?.focus) {
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

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    handleKeydown(event) {
      if (this.closeOnEscape && event.key === 'Escape') {
        this.close();
        return;
      }

      if (event.key === 'Tab' && !this._focusTrapCleanup) {
        const focusable = this._getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxModal', modalComponent);
  } else if (typeof Alpine !== 'undefined') {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxModal', modalComponent);
    });
  }

  // ========================================
  // Export to global namespace
  // ========================================

  window.UXModal = UXModal;

})();
