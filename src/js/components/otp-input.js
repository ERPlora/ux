/**
 * UX OTP Input Component
 * Vanilla JS one-time password input with auto-focus
 */

import { dispatch } from '../core/helpers.js';

export class UXOtpInput {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXOtpInput: Element not found');
      return;
    }

    this.options = {
      length: 6,
      type: 'number', // 'number' | 'text' | 'alphanumeric'
      inputSelector: '.ux-otp__field',
      ...options
    };

    // Read length from data attribute if present
    if (this.el.dataset.length) {
      this.options.length = parseInt(this.el.dataset.length, 10);
    }

    this.inputs = Array.from(this.el.querySelectorAll(this.options.inputSelector));
    this.values = new Array(this.options.length).fill('');

    this._init();
  }

  _init() {
    if (this.inputs.length === 0) {
      console.warn('UXOtpInput: No input fields found');
      return;
    }

    this.inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => this._handleInput(index, e));
      input.addEventListener('keydown', (e) => this._handleKeyDown(index, e));
      input.addEventListener('paste', (e) => this._handlePaste(index, e));
      input.addEventListener('focus', () => this._handleFocus(index));
    });
  }

  _handleInput(index, event) {
    let value = event.target.value;

    // Filter based on type
    if (this.options.type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    } else if (this.options.type === 'alphanumeric') {
      value = value.replace(/[^a-zA-Z0-9]/g, '');
    }

    // Take only the last character
    value = value.slice(-1);
    this.values[index] = value;
    event.target.value = value;

    // Dispatch change event
    dispatch(this.el, 'ux:otp:change', { value: this.value, index });

    // Auto-focus next field
    if (value && index < this.inputs.length - 1) {
      this.inputs[index + 1].focus();
    }

    // Check if complete
    if (this.isComplete) {
      dispatch(this.el, 'ux:otp:complete', { value: this.value });
    }
  }

  _handleKeyDown(index, event) {
    // Backspace: move to previous field if current is empty
    if (event.key === 'Backspace') {
      if (!this.values[index] && index > 0) {
        this.inputs[index - 1].focus();
      } else if (this.values[index]) {
        this.values[index] = '';
        event.target.value = '';
        dispatch(this.el, 'ux:otp:change', { value: this.value, index });
      }
    }

    // Arrow keys navigation
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.inputs[index - 1].focus();
    }

    if (event.key === 'ArrowRight' && index < this.inputs.length - 1) {
      event.preventDefault();
      this.inputs[index + 1].focus();
    }
  }

  _handlePaste(index, event) {
    event.preventDefault();
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    let chars = pastedData.split('');

    // Filter based on type
    if (this.options.type === 'number') {
      chars = chars.filter(c => /[0-9]/.test(c));
    } else if (this.options.type === 'alphanumeric') {
      chars = chars.filter(c => /[a-zA-Z0-9]/.test(c));
    }

    // Fill from current index
    for (let i = 0; i < chars.length && index + i < this.inputs.length; i++) {
      this.values[index + i] = chars[i];
      this.inputs[index + i].value = chars[i];
    }

    dispatch(this.el, 'ux:otp:change', { value: this.value });

    // Focus the next empty field or the last filled field
    const nextEmptyIndex = this.values.findIndex((v, i) => i >= index && !v);
    const focusIndex = nextEmptyIndex >= 0 ? nextEmptyIndex : Math.min(index + chars.length, this.inputs.length - 1);
    this.inputs[focusIndex].focus();

    if (this.isComplete) {
      dispatch(this.el, 'ux:otp:complete', { value: this.value });
    }
  }

  _handleFocus(index) {
    // Select the content when focusing
    this.inputs[index].select();
  }

  get value() {
    return this.values.join('');
  }

  get isComplete() {
    return this.values.every(v => v !== '') && this.values.length === this.options.length;
  }

  setValue(otp) {
    const chars = String(otp).split('').slice(0, this.options.length);
    this.values = new Array(this.options.length).fill('');

    chars.forEach((char, i) => {
      this.values[i] = char;
      if (this.inputs[i]) {
        this.inputs[i].value = char;
      }
    });

    dispatch(this.el, 'ux:otp:change', { value: this.value });

    if (this.isComplete) {
      dispatch(this.el, 'ux:otp:complete', { value: this.value });
    }
  }

  clear() {
    this.values = new Array(this.options.length).fill('');
    this.inputs.forEach(input => {
      input.value = '';
    });
    this.inputs[0]?.focus();
    dispatch(this.el, 'ux:otp:change', { value: '' });
  }

  focus() {
    this.inputs[0]?.focus();
  }

  destroy() {
    delete this.el._uxComponent;
  }
}
