/**
 * UX Quantity Stepper Component
 * Vanilla JS quantity input with +/- buttons
 */

import { dispatch } from '../core/helpers.js';

export class UXQuantityStepper {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXQuantityStepper: Element not found');
      return;
    }

    this.options = {
      min: 0,
      max: 999,
      step: 1,
      value: 1,
      ...options
    };

    // Parse options from data attributes
    if (this.el.dataset.min !== undefined) this.options.min = parseInt(this.el.dataset.min, 10);
    if (this.el.dataset.max !== undefined) this.options.max = parseInt(this.el.dataset.max, 10);
    if (this.el.dataset.step !== undefined) this.options.step = parseInt(this.el.dataset.step, 10);
    if (this.el.dataset.value !== undefined) this.options.value = parseInt(this.el.dataset.value, 10);

    this._value = this.options.value;
    this._pressTimer = null;
    this._pressInterval = null;

    // Icons
    this._minusIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
    this._plusIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

    this._init();
  }

  _init() {
    // Find or create elements
    this.input = this.el.querySelector('.ux-quantity-stepper__input, input');
    this.minusBtn = this.el.querySelector('.ux-quantity-stepper__btn--minus, [data-action="decrement"]');
    this.plusBtn = this.el.querySelector('.ux-quantity-stepper__btn--plus, [data-action="increment"]');

    // Create structure if minimal markup
    if (!this.minusBtn || !this.plusBtn || !this.input) {
      this._createStructure();
    } else {
      // Inject icons if buttons are empty
      if (!this.minusBtn.innerHTML.trim()) {
        this.minusBtn.innerHTML = this._minusIcon;
      }
      if (!this.plusBtn.innerHTML.trim()) {
        this.plusBtn.innerHTML = this._plusIcon;
      }
      // Set aria labels if not present
      if (!this.minusBtn.getAttribute('aria-label')) {
        this.minusBtn.setAttribute('aria-label', 'Decrease quantity');
      }
      if (!this.plusBtn.getAttribute('aria-label')) {
        this.plusBtn.setAttribute('aria-label', 'Increase quantity');
      }
    }

    // Set initial value
    this._updateDisplay();

    // Bind events
    this._bindEvents();
  }

  _createStructure() {
    // Clear existing content
    const existingInput = this.el.querySelector('input');
    const initialValue = existingInput?.value || this._value;
    this.el.innerHTML = '';

    // Create minus button
    this.minusBtn = document.createElement('button');
    this.minusBtn.type = 'button';
    this.minusBtn.className = 'ux-quantity-stepper__btn ux-quantity-stepper__btn--minus';
    this.minusBtn.innerHTML = this._minusIcon;
    this.minusBtn.setAttribute('aria-label', 'Decrease quantity');

    // Create input
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'ux-quantity-stepper__input';
    this.input.inputMode = 'numeric';
    this.input.pattern = '[0-9]*';
    this.input.value = initialValue;

    // Create plus button
    this.plusBtn = document.createElement('button');
    this.plusBtn.type = 'button';
    this.plusBtn.className = 'ux-quantity-stepper__btn ux-quantity-stepper__btn--plus';
    this.plusBtn.innerHTML = this._plusIcon;
    this.plusBtn.setAttribute('aria-label', 'Increase quantity');

    // Append
    this.el.appendChild(this.minusBtn);
    this.el.appendChild(this.input);
    this.el.appendChild(this.plusBtn);
  }

  _bindEvents() {
    // Button clicks
    this.minusBtn.addEventListener('click', () => this.decrement());
    this.plusBtn.addEventListener('click', () => this.increment());

    // Long press for continuous change
    this.minusBtn.addEventListener('mousedown', (e) => this._startLongPress(e, 'decrement'));
    this.plusBtn.addEventListener('mousedown', (e) => this._startLongPress(e, 'increment'));

    this.minusBtn.addEventListener('touchstart', (e) => this._startLongPress(e, 'decrement'), { passive: true });
    this.plusBtn.addEventListener('touchstart', (e) => this._startLongPress(e, 'increment'), { passive: true });

    // Stop long press
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(event => {
      this.minusBtn.addEventListener(event, () => this._stopLongPress());
      this.plusBtn.addEventListener(event, () => this._stopLongPress());
    });

    // Input events
    this.input.addEventListener('input', (e) => this._onInput(e));
    this.input.addEventListener('blur', (e) => this._onBlur(e));
    this.input.addEventListener('keydown', (e) => this._onKeydown(e));
  }

  _startLongPress(e, action) {
    // Prevent click from also firing
    e.preventDefault();

    // Do action once immediately
    if (action === 'increment') this.increment();
    else this.decrement();

    // Start repeat after delay
    this._pressTimer = setTimeout(() => {
      this._pressInterval = setInterval(() => {
        if (action === 'increment') this.increment();
        else this.decrement();
      }, 100);
    }, 400);
  }

  _stopLongPress() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
    if (this._pressInterval) {
      clearInterval(this._pressInterval);
      this._pressInterval = null;
    }
  }

  _onInput(e) {
    // Allow typing but validate on blur
  }

  _onBlur(e) {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      e.target.value = this._value;
    } else {
      this.setValue(parsed);
    }
  }

  _onKeydown(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.increment();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.decrement();
        break;
      case 'PageUp':
        e.preventDefault();
        this.setValue(this._value + this.options.step * 10);
        break;
      case 'PageDown':
        e.preventDefault();
        this.setValue(this._value - this.options.step * 10);
        break;
      case 'Home':
        e.preventDefault();
        this.setValue(this.options.min);
        break;
      case 'End':
        e.preventDefault();
        this.setValue(this.options.max);
        break;
    }
  }

  _updateDisplay() {
    this.input.value = this._value;

    // Update button states
    const isAtMin = this._value <= this.options.min;
    const isAtMax = this._value >= this.options.max;

    this.minusBtn.disabled = isAtMin;
    this.plusBtn.disabled = isAtMax;

    this.minusBtn.classList.toggle('ux-quantity-stepper__btn--disabled', isAtMin);
    this.plusBtn.classList.toggle('ux-quantity-stepper__btn--disabled', isAtMax);
  }

  _emitChange() {
    dispatch(this.el, 'ux:quantity-stepper:change', {
      value: this._value,
      min: this.options.min,
      max: this.options.max
    });
    // Also emit simpler event for easier binding
    dispatch(this.el, 'quantity-change', { value: this._value });
  }

  // Public API

  get value() {
    return this._value;
  }

  set value(val) {
    this.setValue(val);
  }

  get isAtMin() {
    return this._value <= this.options.min;
  }

  get isAtMax() {
    return this._value >= this.options.max;
  }

  increment() {
    if (this._value < this.options.max) {
      this._value = Math.min(this._value + this.options.step, this.options.max);
      this._updateDisplay();
      this._emitChange();
    }
  }

  decrement() {
    if (this._value > this.options.min) {
      this._value = Math.max(this._value - this.options.step, this.options.min);
      this._updateDisplay();
      this._emitChange();
    }
  }

  setValue(val) {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(this.options.min, Math.min(this.options.max, parsed));
      if (clamped !== this._value) {
        this._value = clamped;
        this._updateDisplay();
        this._emitChange();
      } else {
        this._updateDisplay(); // Still update display for edge cases
      }
    }
  }

  setMin(min) {
    this.options.min = min;
    if (this._value < min) {
      this._value = min;
    }
    this._updateDisplay();
  }

  setMax(max) {
    this.options.max = max;
    if (this._value > max) {
      this._value = max;
    }
    this._updateDisplay();
  }

  destroy() {
    this._stopLongPress();
    delete this.el._uxComponent;
  }
}
