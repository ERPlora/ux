/**
 * UX Virtual Keyboard Component
 * Button to trigger the system virtual/touch keyboard
 *
 * LIMITATIONS:
 * ============
 * 1. Browser Support: Only works in Chromium-based browsers (Chrome, Edge, Opera)
 *    with the VirtualKeyboard API enabled.
 * 2. Device Requirement: Requires a touch-enabled device or tablet mode enabled.
 * 3. Windows: Must have "Touch keyboard" enabled in Settings > Time & Language > Typing.
 * 4. Security: Only works after user interaction (click/touch), not programmatically.
 * 5. HTTPS: Requires secure context (HTTPS) in production.
 * 6. Not supported: Firefox, Safari, iOS (uses native keyboard behavior).
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Virtual Keyboard Button
       ========================================================================== */

    .ux-virtual-keyboard-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      min-width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      padding: 0 var(--ux-space-md);
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ux-text);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-virtual-keyboard-btn:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-virtual-keyboard-btn:active {
      transform: scale(0.97);
    }

    .ux-virtual-keyboard-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-virtual-keyboard-btn__icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* Icon-only variant */
    .ux-virtual-keyboard-btn--icon-only {
      width: var(--ux-touch-target);
      padding: 0;
    }

    /* Size variants */
    .ux-virtual-keyboard-btn--sm {
      height: var(--ux-touch-target-sm);
      min-width: var(--ux-touch-target-sm);
      padding: 0 var(--ux-space-sm);
      font-size: 0.8125rem;
    }

    .ux-virtual-keyboard-btn--sm.ux-virtual-keyboard-btn--icon-only {
      width: var(--ux-touch-target-sm);
    }

    .ux-virtual-keyboard-btn--sm .ux-virtual-keyboard-btn__icon {
      width: 16px;
      height: 16px;
    }

    .ux-virtual-keyboard-btn--lg {
      height: 52px;
      min-width: 52px;
      padding: 0 var(--ux-space-lg);
      font-size: 1rem;
    }

    .ux-virtual-keyboard-btn--lg.ux-virtual-keyboard-btn--icon-only {
      width: 52px;
    }

    .ux-virtual-keyboard-btn--lg .ux-virtual-keyboard-btn__icon {
      width: 24px;
      height: 24px;
    }

    /* Color variants */
    .ux-virtual-keyboard-btn--primary {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-color: var(--ux-primary);
    }

    .ux-virtual-keyboard-btn--primary:hover {
      background: var(--ux-primary-shade);
    }

    /* Glass variant */
    .ux-virtual-keyboard-btn--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* Input group integration */
    .ux-input-group .ux-virtual-keyboard-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: -1px;
    }

    /* ==========================================================================
       Keyboard Status Indicator
       ========================================================================== */

    .ux-virtual-keyboard-status {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      font-size: 0.75rem;
      color: var(--ux-text-tertiary);
    }

    .ux-virtual-keyboard-status__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ux-gray-400);
    }

    .ux-virtual-keyboard-status--supported .ux-virtual-keyboard-status__dot {
      background: var(--ux-success);
    }

    .ux-virtual-keyboard-status--unsupported .ux-virtual-keyboard-status__dot {
      background: var(--ux-danger);
    }
  `;

  // Keyboard icon
  const keyboardIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01"/>
    <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>
    <path d="M8 16h8"/>
  </svg>`;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-virtual-keyboard-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-virtual-keyboard-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const virtualKeyboardData = (options = {}) => ({
    // Configuration
    targetSelector: options.targetSelector || null,
    showAlert: options.showAlert ?? true,
    alertTitle: options.alertTitle || 'Teclado Virtual No Disponible',
    alertMessage: options.alertMessage || 'El teclado virtual no está disponible en este navegador o dispositivo. Requisitos: navegador Chromium (Chrome, Edge) en dispositivo táctil con Windows.',

    // State
    isSupported: false,
    isVisible: false,
    keyboardIcon: keyboardIcon,

    // Lifecycle
    init() {
      this.checkSupport();

      // Listen for keyboard geometry changes if supported
      if ('virtualKeyboard' in navigator) {
        navigator.virtualKeyboard.overlaysContent = true;

        navigator.virtualKeyboard.addEventListener('geometrychange', (e) => {
          const { height } = e.target.boundingRect;
          this.isVisible = height > 0;
          this.$dispatch('virtualkeyboard:change', {
            isVisible: this.isVisible,
            height: height
          });
        });
      }
    },

    // Check API support
    checkSupport() {
      this.isSupported = 'virtualKeyboard' in navigator;
      return this.isSupported;
    },

    // Get detailed support info
    getSupportInfo() {
      return {
        apiAvailable: 'virtualKeyboard' in navigator,
        isSecureContext: window.isSecureContext,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        browser: this.detectBrowser(),
        recommendation: this.getRecommendation()
      };
    },

    detectBrowser() {
      const ua = navigator.userAgent;
      if (ua.includes('Edg/')) return 'Edge';
      if (ua.includes('Chrome/')) return 'Chrome';
      if (ua.includes('Firefox/')) return 'Firefox';
      if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
      return 'Unknown';
    },

    getRecommendation() {
      const info = {
        apiAvailable: 'virtualKeyboard' in navigator,
        isSecureContext: window.isSecureContext,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      };

      if (!info.apiAvailable) {
        return 'Usa Chrome o Edge en un dispositivo táctil con Windows.';
      }
      if (!info.isSecureContext) {
        return 'Requiere conexión HTTPS segura.';
      }
      if (!info.isTouchDevice) {
        return 'Activa el modo tableta o usa un dispositivo táctil.';
      }
      return 'Todo listo para usar el teclado virtual.';
    },

    // Show virtual keyboard
    async show(targetEl = null) {
      // Find target input
      let target = targetEl;
      if (!target && this.targetSelector) {
        target = document.querySelector(this.targetSelector);
      }
      if (!target) {
        target = document.activeElement;
      }

      // Check if target is focusable
      const focusableSelector = 'input, textarea, [contenteditable="true"]';
      if (!target || !target.matches(focusableSelector)) {
        console.warn('VirtualKeyboard: No focusable element found');
        return false;
      }

      // Check API support
      if (!this.isSupported) {
        if (this.showAlert) {
          this.showUnsupportedAlert();
        }
        this.$dispatch('virtualkeyboard:unsupported', this.getSupportInfo());
        return false;
      }

      // Focus the target and show keyboard
      try {
        target.focus();
        navigator.virtualKeyboard.show();
        this.$dispatch('virtualkeyboard:show', { target });
        return true;
      } catch (error) {
        console.error('VirtualKeyboard: Error showing keyboard', error);
        this.$dispatch('virtualkeyboard:error', { error });
        return false;
      }
    },

    // Hide virtual keyboard
    hide() {
      if (!this.isSupported) return false;

      try {
        navigator.virtualKeyboard.hide();
        this.$dispatch('virtualkeyboard:hide');
        return true;
      } catch (error) {
        console.error('VirtualKeyboard: Error hiding keyboard', error);
        return false;
      }
    },

    // Toggle keyboard
    toggle(targetEl = null) {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show(targetEl);
      }
    },

    // Show alert using UX Alert component
    showUnsupportedAlert() {
      // Try to use uxAlert if available
      if (window.Alpine && document.querySelector('[x-data*="uxAlert"]')) {
        // Dispatch event for external alert handling
        this.$dispatch('virtualkeyboard:alert', {
          title: this.alertTitle,
          message: this.alertMessage
        });
      } else {
        // Create a simple alert modal
        this.createFallbackAlert();
      }
    },

    createFallbackAlert() {
      // Check if alert already exists
      if (document.getElementById('ux-vk-alert')) return;

      const alertHtml = `
        <div id="ux-vk-alert" class="ux-alert-backdrop" style="
          position: fixed;
          inset: 0;
          z-index: var(--ux-z-modal-backdrop, 400);
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        ">
          <div class="ux-alert" style="
            background: var(--ux-surface);
            border-radius: 16px;
            padding: 1.5rem;
            max-width: 320px;
            width: 100%;
            text-align: center;
            box-shadow: var(--ux-shadow-xl);
          ">
            <div style="
              width: 48px;
              height: 48px;
              margin: 0 auto 1rem;
              background: var(--ux-warning-tint);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ux-warning)" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
            </div>
            <h3 style="margin: 0 0 0.5rem; font-size: 1.125rem; font-weight: 600; color: var(--ux-text);">
              ${this.alertTitle}
            </h3>
            <p style="margin: 0 0 1.5rem; font-size: 0.9375rem; color: var(--ux-text-secondary); line-height: 1.5;">
              ${this.alertMessage}
            </p>
            <button onclick="document.getElementById('ux-vk-alert').remove()" style="
              width: 100%;
              height: 44px;
              background: var(--ux-primary);
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: 500;
              cursor: pointer;
            ">
              Entendido
            </button>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', alertHtml);

      // Close on backdrop click
      const backdrop = document.getElementById('ux-vk-alert');
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.remove();
      });

      // Close on escape
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          backdrop.remove();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxVirtualKeyboard', virtualKeyboardData);
  }

  // Also expose a simple function for non-Alpine usage
  window.UX = window.UX || {};
  window.UX.showVirtualKeyboard = function(targetSelector) {
    if (!('virtualKeyboard' in navigator)) {
      console.warn('VirtualKeyboard API not supported');
      return false;
    }
    const target = targetSelector ? document.querySelector(targetSelector) : document.activeElement;
    if (target && target.focus) {
      target.focus();
      navigator.virtualKeyboard.show();
      return true;
    }
    return false;
  };
})();
