/**
 * UX Snackbar Component
 * Notificaciones con acción en la parte inferior
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Snackbar Container
    ======================================== */

    .ux-snackbar-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-toast);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-md);
      padding-bottom: calc(var(--ux-space-md) + env(safe-area-inset-bottom));
      pointer-events: none;
    }

    .ux-snackbar-container--left {
      align-items: flex-start;
    }

    .ux-snackbar-container--right {
      align-items: flex-end;
    }

    /* ========================================
       UX Snackbar
    ======================================== */

    .ux-snackbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-height: 48px;
      min-width: 288px;
      max-width: 568px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-gray-800);
      color: white;
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      pointer-events: auto;
      opacity: 0;
      transform: translateY(100%);
      will-change: transform, opacity;
      transition:
        opacity 200ms var(--ux-ease),
        transform 250ms var(--ux-ease-ios);
    }

    .ux-snackbar--visible {
      opacity: 1;
      transform: translateY(0);
    }

    .ux-snackbar--exiting {
      opacity: 0;
      transform: translateY(100%);
      transition:
        opacity 150ms var(--ux-ease),
        transform 200ms var(--ux-ease);
    }

    /* ========================================
       Snackbar Content
    ======================================== */

    .ux-snackbar__content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      font-size: var(--ux-font-size-md);
      line-height: 1.4;
    }

    .ux-snackbar__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      opacity: 0.9;
    }

    .ux-snackbar__message {
      flex: 1;
    }

    /* ========================================
       Snackbar Action
    ======================================== */

    .ux-snackbar__action {
      flex-shrink: 0;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--ux-primary-tint);
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-snackbar__action:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .ux-snackbar__action:active {
      background-color: rgba(255, 255, 255, 0.15);
    }

    /* Action colors */
    .ux-snackbar__action--success {
      color: var(--ux-success-tint);
    }

    .ux-snackbar__action--warning {
      color: var(--ux-warning);
    }

    .ux-snackbar__action--danger {
      color: var(--ux-danger-tint);
    }

    /* ========================================
       Snackbar Close
    ======================================== */

    .ux-snackbar__close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-snackbar__close:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .ux-snackbar__close-icon {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-snackbar--success {
      background-color: var(--ux-success);
    }

    .ux-snackbar--success .ux-snackbar__action {
      color: white;
    }

    .ux-snackbar--warning {
      background-color: var(--ux-warning);
      color: var(--ux-gray-900);
    }

    .ux-snackbar--warning .ux-snackbar__action {
      color: var(--ux-gray-900);
    }

    .ux-snackbar--warning .ux-snackbar__close {
      color: rgba(0, 0, 0, 0.6);
    }

    .ux-snackbar--warning .ux-snackbar__close:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--ux-gray-900);
    }

    .ux-snackbar--danger,
    .ux-snackbar--error {
      background-color: var(--ux-danger);
    }

    .ux-snackbar--danger .ux-snackbar__action,
    .ux-snackbar--error .ux-snackbar__action {
      color: white;
    }

    .ux-snackbar--info {
      background-color: var(--ux-primary);
    }

    .ux-snackbar--info .ux-snackbar__action {
      color: white;
    }

    /* ========================================
       Stacked Layout (two lines)
    ======================================== */

    .ux-snackbar--stacked {
      flex-direction: column;
      align-items: stretch;
      padding: var(--ux-space-md);
    }

    .ux-snackbar--stacked .ux-snackbar__content {
      margin-bottom: var(--ux-space-sm);
    }

    .ux-snackbar--stacked .ux-snackbar__actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--ux-space-sm);
    }

    /* ========================================
       Full Width (mobile)
    ======================================== */

    @media (max-width: 599px) {
      .ux-snackbar {
        min-width: calc(100vw - 2 * var(--ux-space-md));
        max-width: calc(100vw - 2 * var(--ux-space-md));
        border-radius: var(--ux-border-radius);
      }
    }

    /* ========================================
       Progress Bar (auto-dismiss indicator)
    ======================================== */

    .ux-snackbar--progress {
      position: relative;
      overflow: hidden;
    }

    .ux-snackbar__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.4);
      transform-origin: left;
      animation: ux-snackbar-progress linear forwards;
    }

    .ux-snackbar--warning .ux-snackbar__progress {
      background-color: rgba(0, 0, 0, 0.2);
    }

    @keyframes ux-snackbar-progress {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-snackbar {
        background-color: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-snackbar {
      background-color: var(--ux-gray-700);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-snackbar {
        transition: opacity 150ms;
        transform: translateY(0);
      }

      .ux-snackbar--exiting {
        transform: translateY(0);
      }

      .ux-snackbar__progress {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-snackbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-snackbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Snackbar queue and manager
  const snackbarQueue = [];
  let currentSnackbar = null;
  let container = null;

  function getContainer(position = 'center') {
    if (!container) {
      container = document.createElement('div');
      container.className = `ux-snackbar-container ux-snackbar-container--${position}`;
      document.body.appendChild(container);
    }
    return container;
  }

  function showSnackbar(options) {
    const config = {
      message: '',
      action: null,
      actionLabel: 'Action',
      actionColor: null,
      duration: 4000,
      closable: false,
      type: null, // success, warning, danger, info
      showProgress: false,
      position: 'center',
      onAction: null,
      onClose: null,
      ...options
    };

    // Queue if another is showing
    if (currentSnackbar) {
      snackbarQueue.push(config);
      return;
    }

    const cont = getContainer(config.position);
    const snackbar = document.createElement('div');
    snackbar.className = 'ux-snackbar';

    if (config.type) {
      snackbar.classList.add(`ux-snackbar--${config.type}`);
    }

    if (config.showProgress && config.duration > 0) {
      snackbar.classList.add('ux-snackbar--progress');
    }

    let html = `<div class="ux-snackbar__content"><span class="ux-snackbar__message">${config.message}</span></div>`;

    if (config.action || config.onAction) {
      let actionClass = 'ux-snackbar__action';
      if (config.actionColor) {
        actionClass += ` ux-snackbar__action--${config.actionColor}`;
      }
      html += `<button class="${actionClass}">${config.actionLabel}</button>`;
    }

    if (config.closable) {
      html += `<button class="ux-snackbar__close" aria-label="Close">
        <svg class="ux-snackbar__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    }

    if (config.showProgress && config.duration > 0) {
      html += `<div class="ux-snackbar__progress" style="animation-duration: ${config.duration}ms"></div>`;
    }

    snackbar.innerHTML = html;
    cont.appendChild(snackbar);
    currentSnackbar = snackbar;

    // Trigger animation
    requestAnimationFrame(() => {
      snackbar.classList.add('ux-snackbar--visible');
    });

    // Event handlers
    const actionBtn = snackbar.querySelector('.ux-snackbar__action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        if (config.onAction) config.onAction();
        dismissSnackbar(snackbar, config.onClose);
      });
    }

    const closeBtn = snackbar.querySelector('.ux-snackbar__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dismissSnackbar(snackbar, config.onClose);
      });
    }

    // Auto dismiss
    if (config.duration > 0) {
      setTimeout(() => {
        dismissSnackbar(snackbar, config.onClose);
      }, config.duration);
    }

    return snackbar;
  }

  function dismissSnackbar(snackbar, onClose) {
    if (!snackbar || snackbar !== currentSnackbar) return;

    snackbar.classList.remove('ux-snackbar--visible');
    snackbar.classList.add('ux-snackbar--exiting');

    setTimeout(() => {
      snackbar.remove();
      currentSnackbar = null;
      if (onClose) onClose();

      // Process queue
      if (snackbarQueue.length > 0) {
        const next = snackbarQueue.shift();
        setTimeout(() => showSnackbar(next), 150);
      }
    }, 200);
  }

  // Alpine.js component
  const snackbarData = (options = {}) => ({
    isVisible: false,
    message: options.message ?? '',
    actionLabel: options.actionLabel ?? 'Action',
    duration: options.duration ?? 4000,
    type: options.type ?? null,
    _timeout: null,

    show(msg, opts = {}) {
      this.message = msg || this.message;
      this.type = opts.type || this.type;
      this.actionLabel = opts.actionLabel || this.actionLabel;
      this.duration = opts.duration ?? this.duration;

      this.isVisible = true;
      this.$dispatch('snackbar:show');

      if (this.duration > 0) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => this.hide(), this.duration);
      }
    },

    hide() {
      this.isVisible = false;
      clearTimeout(this._timeout);
      this.$dispatch('snackbar:hide');
    },

    action() {
      this.$dispatch('snackbar:action');
      this.hide();
    },

    get snackbarClasses() {
      return {
        'ux-snackbar--visible': this.isVisible,
        [`ux-snackbar--${this.type}`]: this.type
      };
    }
  });

  // Global API
  window.UXSnackbar = {
    show: showSnackbar,
    dismiss: () => dismissSnackbar(currentSnackbar)
  };

  if (window.UX) {
    window.UX.registerComponent('uxSnackbar', snackbarData);
    window.UX.snackbar = window.UXSnackbar;
  }

})();
