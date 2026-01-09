/**
 * UX OTP Input Component
 * One-Time Password / Verification code input with individual digit fields
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX OTP Input - Base
    ======================================== */

    .ux-otp {
      display: inline-flex;
      gap: var(--ux-space-sm);
      font-family: var(--ux-font-family);
    }

    .ux-otp__field {
      width: 48px;
      height: 56px;
      padding: 0;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
      background: var(--ux-surface);
      border: 1.5px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      transition: all var(--ux-transition-fast) var(--ux-ease);
      -webkit-appearance: none;
      -moz-appearance: textfield;
      caret-color: var(--ux-primary);
    }

    .ux-otp__field::-webkit-outer-spin-button,
    .ux-otp__field::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .ux-otp__field::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-otp__field:focus {
      outline: none;
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-otp__field:hover:not(:focus):not(:disabled) {
      border-color: var(--ux-gray-400);
    }

    /* Filled state */
    .ux-otp__field--filled {
      background: var(--ux-surface-secondary);
      border-color: var(--ux-primary);
    }

    /* ========================================
       Separator
    ======================================== */

    .ux-otp__separator {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      color: var(--ux-text-tertiary);
      font-size: 1.25rem;
      font-weight: 600;
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-otp--sm .ux-otp__field {
      width: 40px;
      height: 48px;
      font-size: 1.25rem;
    }

    .ux-otp--sm .ux-otp__separator {
      width: 12px;
      font-size: 1rem;
    }

    /* Large */
    .ux-otp--lg .ux-otp__field {
      width: 56px;
      height: 64px;
      font-size: 1.75rem;
    }

    .ux-otp--lg .ux-otp__separator {
      width: 20px;
      font-size: 1.5rem;
    }

    /* ========================================
       States
    ======================================== */

    /* Success */
    .ux-otp--success .ux-otp__field {
      border-color: var(--ux-success);
    }

    .ux-otp--success .ux-otp__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    /* Error */
    .ux-otp--error .ux-otp__field {
      border-color: var(--ux-danger);
      animation: ux-otp-shake 0.4s ease;
    }

    .ux-otp--error .ux-otp__field:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    @keyframes ux-otp-shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-4px); }
      40%, 80% { transform: translateX(4px); }
    }

    /* Disabled */
    .ux-otp--disabled .ux-otp__field {
      background: var(--ux-surface-secondary);
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Loading */
    .ux-otp--loading .ux-otp__field {
      pointer-events: none;
      opacity: 0.6;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Underline */
    .ux-otp--underline .ux-otp__field {
      border: none;
      border-bottom: 2px solid var(--ux-border-color);
      border-radius: 0;
      background: transparent;
    }

    .ux-otp--underline .ux-otp__field:focus {
      border-bottom-color: var(--ux-primary);
      box-shadow: none;
    }

    .ux-otp--underline .ux-otp__field--filled {
      border-bottom-color: var(--ux-primary);
      background: transparent;
    }

    .ux-otp--underline.ux-otp--error .ux-otp__field {
      border-bottom-color: var(--ux-danger);
    }

    .ux-otp--underline.ux-otp--success .ux-otp__field {
      border-bottom-color: var(--ux-success);
    }

    /* Rounded */
    .ux-otp--rounded .ux-otp__field {
      border-radius: 50%;
      width: 56px;
      height: 56px;
    }

    .ux-otp--rounded.ux-otp--sm .ux-otp__field {
      width: 48px;
      height: 48px;
    }

    .ux-otp--rounded.ux-otp--lg .ux-otp__field {
      width: 64px;
      height: 64px;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-otp--glass .ux-otp__field {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-otp--glass .ux-otp__field:focus {
      background: var(--ux-glass-bg-thick);
    }

    /* ========================================
       Password/Secure Mode
    ======================================== */

    .ux-otp--secure .ux-otp__field {
      -webkit-text-security: disc;
      font-family: text-security-disc, sans-serif;
    }

    /* ========================================
       Helper Text
    ======================================== */

    .ux-otp-wrapper {
      display: inline-flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-otp__helper {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
    }

    .ux-otp__helper--error {
      color: var(--ux-danger);
    }

    .ux-otp__helper--success {
      color: var(--ux-success);
    }

    /* ========================================
       Resend Timer
    ======================================== */

    .ux-otp__resend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-xs);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-otp__resend-btn {
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      color: var(--ux-primary);
      cursor: pointer;
      text-decoration: underline;
    }

    .ux-otp__resend-btn:hover {
      color: var(--ux-primary-shade);
    }

    .ux-otp__resend-btn:disabled {
      color: var(--ux-text-tertiary);
      cursor: not-allowed;
      text-decoration: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-otp__field {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-otp__field--filled {
        background: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-otp__field {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-otp__field--filled {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-otp--error .ux-otp__field {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-otp-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-otp-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for OTP input
  const otpInputData = (options = {}) => ({
    // Configuration
    length: options.length || 6,
    type: options.type || 'text', // 'text', 'number', 'password'
    autoFocus: options.autoFocus ?? true,
    autoSubmit: options.autoSubmit ?? true,
    separator: options.separator || null, // Position or array of positions
    placeholder: options.placeholder || '',

    // State
    values: [],
    focused: -1,
    isComplete: false,
    state: options.state || null, // null, 'success', 'error', 'loading'
    disabled: options.disabled || false,

    // Resend functionality
    resendEnabled: options.resendEnabled ?? false,
    resendCooldown: options.resendCooldown || 60,
    resendTimer: 0,
    resendInterval: null,

    init() {
      // Initialize values array
      this.values = new Array(this.length).fill('');

      // Auto focus first field
      if (this.autoFocus && !this.disabled) {
        this.$nextTick(() => {
          const firstInput = this.$el.querySelector('.ux-otp__field');
          if (firstInput) firstInput.focus();
        });
      }

      // Start resend timer if enabled
      if (this.resendEnabled && this.resendCooldown > 0) {
        this.startResendTimer();
      }
    },

    destroy() {
      if (this.resendInterval) {
        clearInterval(this.resendInterval);
      }
    },

    // Get input type
    getInputType() {
      if (this.type === 'password') return 'password';
      if (this.type === 'number') return 'tel';
      return 'text';
    },

    // Get input mode
    getInputMode() {
      if (this.type === 'number') return 'numeric';
      return 'text';
    },

    // Handle input
    onInput(index, event) {
      const input = event.target;
      let value = input.value;

      // Handle paste
      if (value.length > 1) {
        this.handlePaste(value, index);
        return;
      }

      // Validate input based on type
      if (this.type === 'number') {
        value = value.replace(/[^0-9]/g, '');
      }

      // Update value
      this.values[index] = value.slice(-1);
      input.value = this.values[index];

      // Move to next field
      if (value && index < this.length - 1) {
        this.focusField(index + 1);
      }

      this.checkComplete();
      this.dispatchChange();
    },

    // Handle keydown
    onKeyDown(index, event) {
      const key = event.key;

      // Backspace
      if (key === 'Backspace') {
        if (!this.values[index] && index > 0) {
          this.focusField(index - 1);
          this.values[index - 1] = '';
        } else {
          this.values[index] = '';
        }
        this.checkComplete();
        this.dispatchChange();
      }

      // Delete
      if (key === 'Delete') {
        this.values[index] = '';
        this.checkComplete();
        this.dispatchChange();
      }

      // Arrow keys
      if (key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        this.focusField(index - 1);
      }

      if (key === 'ArrowRight' && index < this.length - 1) {
        event.preventDefault();
        this.focusField(index + 1);
      }

      // Home/End
      if (key === 'Home') {
        event.preventDefault();
        this.focusField(0);
      }

      if (key === 'End') {
        event.preventDefault();
        this.focusField(this.length - 1);
      }
    },

    // Handle paste
    handlePaste(value, startIndex = 0) {
      // Clean value based on type
      if (this.type === 'number') {
        value = value.replace(/[^0-9]/g, '');
      }

      const chars = value.split('');

      for (let i = 0; i < chars.length && startIndex + i < this.length; i++) {
        this.values[startIndex + i] = chars[i];
      }

      // Focus appropriate field
      const nextIndex = Math.min(startIndex + chars.length, this.length - 1);
      this.focusField(nextIndex);

      this.checkComplete();
      this.dispatchChange();
    },

    // Handle paste event
    onPaste(index, event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData('text');
      this.handlePaste(pastedData, index);
    },

    // Focus field
    focusField(index) {
      this.$nextTick(() => {
        const inputs = this.$el.querySelectorAll('.ux-otp__field');
        if (inputs[index]) {
          inputs[index].focus();
          inputs[index].select();
        }
      });
    },

    // Handle focus
    onFocus(index) {
      this.focused = index;
      // Select content on focus
      this.$nextTick(() => {
        const inputs = this.$el.querySelectorAll('.ux-otp__field');
        if (inputs[index]) inputs[index].select();
      });
    },

    // Handle blur
    onBlur() {
      this.focused = -1;
    },

    // Check if complete
    checkComplete() {
      const complete = this.values.every(v => v !== '');

      if (complete && !this.isComplete) {
        this.isComplete = true;

        // Auto submit
        if (this.autoSubmit) {
          this.$dispatch('otp:complete', {
            value: this.getValue(),
            values: [...this.values]
          });
        }
      } else if (!complete && this.isComplete) {
        this.isComplete = false;
      }
    },

    // Get combined value
    getValue() {
      return this.values.join('');
    },

    // Set value programmatically
    setValue(value) {
      const chars = String(value).split('');
      this.values = new Array(this.length).fill('');

      for (let i = 0; i < chars.length && i < this.length; i++) {
        this.values[i] = chars[i];
      }

      this.checkComplete();
      this.dispatchChange();
    },

    // Clear all values
    clear() {
      this.values = new Array(this.length).fill('');
      this.isComplete = false;
      this.state = null;
      this.focusField(0);
      this.dispatchChange();
    },

    // Set state
    setState(newState) {
      this.state = newState;
      this.$dispatch('otp:state', { state: newState });
    },

    // Check if should show separator
    hasSeparator(index) {
      if (!this.separator) return false;

      if (Array.isArray(this.separator)) {
        return this.separator.includes(index + 1);
      }

      return (index + 1) === this.separator;
    },

    // Dispatch change event
    dispatchChange() {
      this.$dispatch('otp:change', {
        value: this.getValue(),
        values: [...this.values],
        isComplete: this.isComplete
      });
    },

    // Resend functionality
    startResendTimer() {
      this.resendTimer = this.resendCooldown;

      this.resendInterval = setInterval(() => {
        this.resendTimer--;

        if (this.resendTimer <= 0) {
          clearInterval(this.resendInterval);
          this.resendInterval = null;
        }
      }, 1000);
    },

    canResend() {
      return this.resendTimer <= 0;
    },

    resend() {
      if (!this.canResend()) return;

      this.$dispatch('otp:resend');
      this.startResendTimer();
      this.clear();
    },

    // Format time for display
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxOtpInput', otpInputData);
  }

})();
