/**
 * UX Toast Component
 * Notificaciones toast estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Toast Container
    ======================================== */

    .ux-toast-container {
      position: fixed;
      z-index: var(--ux-z-toast);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      pointer-events: none;
      padding: var(--ux-space-md);
    }

    .ux-toast-container--top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-top: calc(var(--ux-space-md) + env(safe-area-inset-top));
    }

    .ux-toast-container--bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    .ux-toast-container--top-start {
      top: 0;
      left: 0;
    }

    .ux-toast-container--top-end {
      top: 0;
      right: 0;
    }

    .ux-toast-container--bottom-start {
      bottom: 0;
      left: 0;
    }

    .ux-toast-container--bottom-end {
      bottom: 0;
      right: 0;
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
    }

    /* Center positions */
    .ux-toast-container--center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .ux-toast-container--center-start {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    .ux-toast-container--center-end {
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    /* ========================================
       UX Toast
    ======================================== */

    .ux-toast {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-height: var(--ux-toast-min-height);
      min-width: 200px;
      max-width: var(--ux-toast-max-width);
      padding: var(--ux-toast-padding);
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-radius: var(--ux-toast-border-radius);
      box-shadow: var(--ux-shadow-lg);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
      will-change: transform, opacity;
      transition:
        opacity var(--ux-transition-base) var(--ux-ease),
        transform var(--ux-transition-base) var(--ux-ease-spring);
    }

    .ux-toast-container--bottom .ux-toast,
    .ux-toast-container--bottom-start .ux-toast,
    .ux-toast-container--bottom-end .ux-toast {
      transform: translateY(20px) scale(0.95);
    }

    .ux-toast-container--center .ux-toast {
      transform: scale(0.9);
    }

    .ux-toast-container--center-start .ux-toast,
    .ux-toast-container--top-start .ux-toast,
    .ux-toast-container--bottom-start .ux-toast {
      transform: translateX(-20px) scale(0.95);
    }

    .ux-toast-container--center-end .ux-toast,
    .ux-toast-container--top-end .ux-toast,
    .ux-toast-container--bottom-end .ux-toast {
      transform: translateX(20px) scale(0.95);
    }

    .ux-toast--visible {
      opacity: 1;
      transform: translateY(0) translateX(0) scale(1);
      will-change: auto;
    }

    /* ========================================
       Toast Content
    ======================================== */

    .ux-toast__icon {
      width: var(--ux-toast-icon-size, 22px);
      height: var(--ux-toast-icon-size, 22px);
      flex-shrink: 0;
    }

    .ux-toast__icon svg {
      width: 100%;
      height: 100%;
    }

    /* Icon colors for semantic toasts */
    .ux-toast--success .ux-toast__icon {
      color: var(--ux-success-contrast);
    }

    .ux-toast--warning .ux-toast__icon {
      color: var(--ux-warning-contrast);
    }

    .ux-toast--danger .ux-toast__icon {
      color: var(--ux-danger-contrast);
    }

    .ux-toast--light .ux-toast__icon--success {
      color: var(--ux-success);
    }

    .ux-toast--light .ux-toast__icon--warning {
      color: var(--ux-warning);
    }

    .ux-toast--light .ux-toast__icon--danger {
      color: var(--ux-danger);
    }

    .ux-toast--light .ux-toast__icon--info {
      color: var(--ux-primary);
    }

    .ux-toast--glass .ux-toast__icon--success {
      color: var(--ux-success);
    }

    .ux-toast--glass .ux-toast__icon--warning {
      color: var(--ux-warning);
    }

    .ux-toast--glass .ux-toast__icon--danger {
      color: var(--ux-danger);
    }

    .ux-toast--glass .ux-toast__icon--info {
      color: var(--ux-primary);
    }

    .ux-toast__content {
      flex: 1;
      min-width: 0;
    }

    .ux-toast__message {
      font-size: var(--ux-font-size-sm);
      line-height: 1.4;
    }

    .ux-toast__title {
      font-weight: 600;
      margin-bottom: 2px;
    }

    .ux-toast__action {
      flex-shrink: 0;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary-tint);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      cursor: pointer;
      border-radius: var(--ux-border-radius-sm);
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-toast__action:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-toast__action:active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .ux-toast__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-toast__close:hover {
      color: white;
    }

    .ux-toast__close svg {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Toast Colors
    ======================================== */

    .ux-toast--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-toast--success .ux-toast__action {
      color: rgba(255, 255, 255, 0.9);
    }

    .ux-toast--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-toast--warning .ux-toast__action {
      color: rgba(0, 0, 0, 0.7);
    }

    .ux-toast--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-toast--danger .ux-toast__action {
      color: rgba(255, 255, 255, 0.9);
    }

    .ux-toast--light {
      background-color: var(--ux-surface);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
    }

    .ux-toast--light .ux-toast__action {
      color: var(--ux-primary);
    }

    .ux-toast--light .ux-toast__close {
      color: var(--ux-text-tertiary);
    }

    .ux-toast--light .ux-toast__close:hover {
      color: var(--ux-text);
    }

    /* ========================================
       Glass Toast (iOS 26 Liquid Glass)
    ======================================== */

    .ux-toast--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      color: var(--ux-text);
      border: 0.5px solid var(--ux-glass-border);
      border-radius: var(--ux-glass-radius-lg);
      box-shadow:
        var(--ux-glass-shadow),
        var(--ux-glass-highlight);
    }

    .ux-toast--glass .ux-toast__action {
      color: var(--ux-primary);
    }

    .ux-toast--glass .ux-toast__action:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .ux-toast--glass .ux-toast__close {
      color: var(--ux-text-tertiary);
    }

    .ux-toast--glass .ux-toast__close:hover {
      color: var(--ux-text);
    }

    .ux-toast--glass .ux-toast__progress {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .ux-toast--glass .ux-toast__progress-bar {
      background-color: var(--ux-primary);
    }

    /* Dark mode glass toast */
    @media (prefers-color-scheme: dark) {
      .ux-toast--glass .ux-toast__action:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .ux-toast--glass .ux-toast__progress {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .ux-dark .ux-toast--glass .ux-toast__action:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-toast--glass .ux-toast__progress {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* Fallback */
    @supports not (backdrop-filter: blur(1px)) {
      .ux-toast--glass {
        background-color: var(--ux-surface);
      }
    }

    /* ========================================
       Toast Progress Bar
    ======================================== */

    .ux-toast__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 0 0 var(--ux-border-radius-lg) var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-toast__progress-bar {
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      transition: width linear;
    }

    .ux-toast--light .ux-toast__progress {
      background-color: var(--ux-light);
    }

    .ux-toast--light .ux-toast__progress-bar {
      background-color: var(--ux-primary);
    }

    /* ========================================
       Toast Sizes
    ======================================== */

    .ux-toast--sm {
      min-width: 150px;
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-toast--sm .ux-toast__message {
      font-size: var(--ux-font-size-xs);
    }

    .ux-toast--lg {
      min-width: 300px;
      padding: var(--ux-space-lg);
    }

    /* ========================================
       Toast with Avatar
    ======================================== */

    .ux-toast__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-toast__avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Swipeable Toast
    ======================================== */

    .ux-toast--swipeable {
      cursor: grab;
      user-select: none;
    }

    .ux-toast--swipeable:active {
      cursor: grabbing;
    }

    .ux-toast--swiping {
      transition: none;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-toast {
        transition: opacity 0.1s ease;
        transform: none !important;
      }

      .ux-toast--visible {
        transform: none;
      }

      .ux-toast__progress-bar {
        transition: none;
      }
    }

    /* ========================================
       Stacked Toasts
    ======================================== */

    .ux-toast-container--stacked {
      align-items: center;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(2) {
      transform: scale(0.95);
      opacity: 0.8;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(3) {
      transform: scale(0.9);
      opacity: 0.6;
    }

    .ux-toast-container--stacked .ux-toast:nth-child(n+4) {
      display: none;
    }

    /* ========================================
       Full Width Toast (mobile)
    ======================================== */

    @media (max-width: 480px) {
      .ux-toast-container--top,
      .ux-toast-container--bottom {
        left: 0;
        right: 0;
        transform: none;
        padding-left: var(--ux-space-sm);
        padding-right: var(--ux-space-sm);
      }

      .ux-toast {
        max-width: none;
        width: 100%;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-toast-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-toast-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // ============================================================================
  // Web Component Implementation (Universal - works with React, Vue, HTMX, vanilla JS)
  // Uses Shadow DOM for encapsulation while preserving UX CSS variable system
  // ============================================================================

  class UXToastElement extends HTMLElement {
    static get observedAttributes() {
      return ['message', 'title', 'type', 'duration', 'position', 'show-progress'];
    }

    constructor() {
      super();

      // Create Shadow DOM for encapsulation
      this.attachShadow({ mode: 'open' });

      this._toasts = [];
      this._toastId = 0;
    }

    connectedCallback() {
      // Inject styles into Shadow DOM
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: contents;
          }
          ${styles}
        </style>
      `;

      // Create container inside Shadow DOM
      this._createContainer();

      // Listen for custom events (HTMX integration)
      // Events with composed: true cross shadow boundary
      this.addEventListener('ux:toast', (e) => this._handleToastEvent(e));
      this.addEventListener('ux:success', (e) => this.success(e.detail?.message, e.detail));
      this.addEventListener('ux:warning', (e) => this.warning(e.detail?.message, e.detail));
      this.addEventListener('ux:danger', (e) => this.danger(e.detail?.message, e.detail));
      this.addEventListener('ux:error', (e) => this.danger(e.detail?.message, e.detail));
      this.addEventListener('ux:info', (e) => this.info(e.detail?.message, e.detail));
      this.addEventListener('ux:clear', () => this.clear());
    }

    // ========================================
    // Properties
    // ========================================

    get position() {
      return this.getAttribute('position') || 'bottom';
    }

    set position(value) {
      this.setAttribute('position', value);
      this._updateContainerPosition();
    }

    get maxToasts() {
      return parseInt(this.getAttribute('max-toasts'), 10) || 5;
    }

    // ========================================
    // Public API
    // ========================================

    /**
     * Show a toast
     * @param {Object} options - { message, title, type, duration, showProgress }
     * @returns {number} Toast ID
     */
    show(options = {}) {
      const id = ++this._toastId;
      const duration = options.duration ?? 3000;

      const toast = {
        id,
        message: options.message || '',
        title: options.title || '',
        type: options.type || '', // success, warning, danger, info, light, glass
        duration,
        showProgress: options.showProgress || false
      };

      // Create toast element
      const toastEl = this._createToastElement(toast);
      this._container.appendChild(toastEl);

      // Store reference
      this._toasts.push({ ...toast, element: toastEl });

      // Limit max toasts
      while (this._toasts.length > this.maxToasts) {
        const oldest = this._toasts.shift();
        this._removeToastElement(oldest.element);
      }

      // Show with animation
      requestAnimationFrame(() => {
        toastEl.classList.add('ux-toast--visible');
      });

      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => this.dismiss(id), duration);
      }

      // Dispatch event
      this.dispatchEvent(new CustomEvent('ux:shown', {
        bubbles: true,
        composed: true,
        detail: { id, ...options }
      }));

      return id;
    }

    /**
     * Dismiss a toast by ID
     */
    dismiss(id) {
      const index = this._toasts.findIndex(t => t.id === id);
      if (index === -1) return;

      const toast = this._toasts[index];
      this._toasts.splice(index, 1);
      this._removeToastElement(toast.element);

      // Dispatch event
      this.dispatchEvent(new CustomEvent('ux:dismissed', {
        bubbles: true,
        composed: true,
        detail: { id }
      }));
    }

    /**
     * Clear all toasts
     */
    clear() {
      this._toasts.forEach(toast => {
        this._removeToastElement(toast.element);
      });
      this._toasts = [];
    }

    // Convenience methods
    success(message, options = {}) {
      return this.show({ ...options, message, type: 'success' });
    }

    warning(message, options = {}) {
      return this.show({ ...options, message, type: 'warning' });
    }

    danger(message, options = {}) {
      return this.show({ ...options, message, type: 'danger' });
    }

    error(message, options = {}) {
      return this.danger(message, options);
    }

    info(message, options = {}) {
      return this.show({ ...options, message, type: '' });
    }

    // ========================================
    // Private Methods
    // ========================================

    _createContainer() {
      this._container = document.createElement('div');
      this._container.className = `ux-toast-container ux-toast-container--${this.position}`;
      this._container.setAttribute('aria-live', 'polite');
      this._container.setAttribute('aria-atomic', 'false');
      this.shadowRoot.appendChild(this._container);
    }

    _updateContainerPosition() {
      if (this._container) {
        this._container.className = `ux-toast-container ux-toast-container--${this.position}`;
      }
    }

    _createToastElement(toast) {
      const el = document.createElement('div');
      el.className = 'ux-toast';
      if (toast.type) el.classList.add(`ux-toast--${toast.type}`);
      el.setAttribute('role', toast.type === 'danger' || toast.type === 'warning' ? 'alert' : 'status');

      const icon = this._getIcon(toast.type);

      el.innerHTML = `
        ${icon ? `<div class="ux-toast__icon ux-toast__icon--${toast.type || 'info'}">${icon}</div>` : ''}
        <div class="ux-toast__content">
          ${toast.title ? `<div class="ux-toast__title">${this._escapeHtml(toast.title)}</div>` : ''}
          <div class="ux-toast__message">${this._escapeHtml(toast.message)}</div>
        </div>
        <button class="ux-toast__close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        ${toast.showProgress ? `
          <div class="ux-toast__progress">
            <div class="ux-toast__progress-bar" style="width: 100%; transition: width ${toast.duration}ms linear;"></div>
          </div>
        ` : ''}
      `;

      // Close button handler
      el.querySelector('.ux-toast__close').addEventListener('click', () => {
        this.dismiss(toast.id);
      });

      // Start progress animation
      if (toast.showProgress) {
        requestAnimationFrame(() => {
          const bar = el.querySelector('.ux-toast__progress-bar');
          if (bar) bar.style.width = '0%';
        });
      }

      return el;
    }

    _removeToastElement(el) {
      if (!el) return;
      el.classList.remove('ux-toast--visible');
      setTimeout(() => el.remove(), 300);
    }

    _getIcon(type) {
      const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>`,
        danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>`,
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>`
      };
      return icons[type] || icons.info;
    }

    _escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    _handleToastEvent(e) {
      const { message, title, type, duration, showProgress } = e.detail || {};
      this.show({ message, title, type, duration, showProgress });
    }

    // ========================================
    // Static Methods (Global Toast)
    // ========================================

    static _getGlobalInstance() {
      let el = document.querySelector('ux-toast#ux-toast-global');
      if (!el) {
        el = document.createElement('ux-toast');
        el.id = 'ux-toast-global';
        el.setAttribute('position', 'bottom');
        document.body.appendChild(el);
      }
      return el;
    }

    static show(message, options = {}) {
      return UXToastElement._getGlobalInstance().show({ message, ...options });
    }

    static success(message, options = {}) {
      return UXToastElement._getGlobalInstance().success(message, options);
    }

    static warning(message, options = {}) {
      return UXToastElement._getGlobalInstance().warning(message, options);
    }

    static danger(message, options = {}) {
      return UXToastElement._getGlobalInstance().danger(message, options);
    }

    static error(message, options = {}) {
      return UXToastElement._getGlobalInstance().danger(message, options);
    }

    static info(message, options = {}) {
      return UXToastElement._getGlobalInstance().info(message, options);
    }

    static clear() {
      UXToastElement._getGlobalInstance().clear();
    }
  }

  // Register Web Component
  if (!customElements.get('ux-toast')) {
    customElements.define('ux-toast', UXToastElement);
  }

  // Export for programmatic use
  window.UXToast = UXToastElement;

  // ============================================================================
  // Alpine.js Components (for backward compatibility)
  // ============================================================================

  // Alpine component for toast
  // ARIA: role="status" or "alert", aria-live for announcements
  const toastComponent = (config = {}) => ({
    visible: false,
    message: config.message || '',
    title: config.title || '',
    color: config.color || '',
    duration: config.duration || 3000,
    showProgress: config.showProgress || false,
    progress: 100,
    _timer: null,
    _progressTimer: null,
    _startTime: null,

    // ARIA attributes - use "alert" for danger/errors, "status" for info
    get ariaAttrs() {
      const isUrgent = this.color === 'danger' || this.color === 'warning';
      return {
        'role': isUrgent ? 'alert' : 'status',
        'aria-live': isUrgent ? 'assertive' : 'polite',
        'aria-atomic': 'true'
      };
    },

    show(options = {}) {
      if (options.message) this.message = options.message;
      if (options.title) this.title = options.title;
      if (options.color) this.color = options.color;
      if (options.duration !== undefined) this.duration = options.duration;
      if (options.showProgress !== undefined) this.showProgress = options.showProgress;

      this.visible = true;
      this.progress = 100;
      this._startTime = Date.now();

      // Clear existing timer
      if (this._timer) {
        clearTimeout(this._timer);
      }
      if (this._progressTimer) {
        cancelAnimationFrame(this._progressTimer);
      }

      // Auto dismiss
      if (this.duration > 0) {
        // Progress bar animation using requestAnimationFrame for accuracy
        if (this.showProgress) {
          const updateProgress = () => {
            const elapsed = Date.now() - this._startTime;
            this.progress = Math.max(0, 100 - (elapsed / this.duration) * 100);

            if (this.progress > 0 && this.visible) {
              this._progressTimer = requestAnimationFrame(updateProgress);
            }
          };
          this._progressTimer = requestAnimationFrame(updateProgress);
        }

        this._timer = setTimeout(() => {
          this.dismiss();
        }, this.duration);
      }
    },

    dismiss() {
      this.visible = false;
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (this._progressTimer) {
        cancelAnimationFrame(this._progressTimer);
        this._progressTimer = null;
      }
    },

    pause() {
      this._pausedAt = Date.now();
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (this._progressTimer) {
        cancelAnimationFrame(this._progressTimer);
        this._progressTimer = null;
      }
    },

    resume() {
      if (this.visible && this.duration > 0) {
        const remainingTime = (this.progress / 100) * this.duration;
        // Adjust start time to account for pause duration
        this._startTime = Date.now() - (this.duration - remainingTime);

        if (this.showProgress) {
          const updateProgress = () => {
            const elapsed = Date.now() - this._startTime;
            this.progress = Math.max(0, 100 - (elapsed / this.duration) * 100);

            if (this.progress > 0 && this.visible) {
              this._progressTimer = requestAnimationFrame(updateProgress);
            }
          };
          this._progressTimer = requestAnimationFrame(updateProgress);
        }

        this._timer = setTimeout(() => {
          this.dismiss();
        }, remainingTime);
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToast', toastComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToast', toastComponent);
    });
  }

  // Toast manager for multiple toasts
  // ARIA: Container with aria-live region for toast announcements
  // Posiciones disponibles: top, bottom, center, top-start, top-end, bottom-start, bottom-end, center-start, center-end
  const toastManagerComponent = (config = {}) => ({
    toasts: [],
    position: config.position || 'bottom',
    maxToasts: config.maxToasts || 5,

    // ARIA attributes for toast container (live region)
    get containerAriaAttrs() {
      return {
        'aria-live': 'polite',
        'aria-atomic': 'false'
      };
    },

    // Computed class for container position
    get containerClass() {
      return `ux-toast-container ux-toast-container--${this.position}`;
    },

    setPosition(newPosition) {
      const validPositions = ['top', 'bottom', 'center', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'center-start', 'center-end'];
      if (validPositions.includes(newPosition)) {
        this.position = newPosition;
      }
    },

    add(options) {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message: options.message || '',
        title: options.title || '',
        color: options.color || '',
        duration: options.duration ?? 3000,
        showProgress: options.showProgress || false,
        visible: false,
        progress: 100
      };

      this.toasts.push(toast);

      // Limit max toasts
      if (this.toasts.length > this.maxToasts) {
        this.toasts.shift();
      }

      // Show after next tick
      this.$nextTick(() => {
        const t = this.toasts.find(x => x.id === id);
        if (t) t.visible = true;
      });

      // Auto remove
      if (toast.duration > 0) {
        setTimeout(() => {
          this.remove(id);
        }, toast.duration);
      }

      return id;
    },

    remove(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts[index].visible = false;
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== id);
        }, 300);
      }
    },

    clear() {
      this.toasts.forEach(t => t.visible = false);
      setTimeout(() => {
        this.toasts = [];
      }, 300);
    },

    // Alias for clear
    dismissAll() {
      this.clear();
    },

    success(message, options = {}) {
      return this.add({ ...options, message, color: 'success' });
    },

    warning(message, options = {}) {
      return this.add({ ...options, message, color: 'warning' });
    },

    danger(message, options = {}) {
      return this.add({ ...options, message, color: 'danger' });
    },

    info(message, options = {}) {
      return this.add({ ...options, message, color: '' });
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxToastManager', toastManagerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxToastManager', toastManagerComponent);
    });
  }
})();
