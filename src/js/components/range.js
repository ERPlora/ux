/**
 * UX Range Component
 * Vanilla JS slider/range input with iOS-style design
 */

import { dispatch } from '../core/helpers.js';

export class UXRange {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXRange: Element not found');
      return;
    }

    this.options = {
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      inputSelector: '.ux-range__input, input[type="range"]',
      fillSelector: '.ux-range__fill',
      thumbSelector: '.ux-range__thumb',
      valueSelector: '.ux-range__value',
      ...options
    };

    this.input = this.el.querySelector(this.options.inputSelector);
    this.fill = this.el.querySelector(this.options.fillSelector);
    this.thumb = this.el.querySelector(this.options.thumbSelector);
    this.valueDisplay = this.el.querySelector(this.options.valueSelector);

    this._value = this.options.value;
    this._init();
  }

  _init() {
    if (!this.input) {
      console.warn('UXRange: Input element not found');
      return;
    }

    // Set initial attributes from options or read from input
    this.options.min = parseFloat(this.input.min) || this.options.min;
    this.options.max = parseFloat(this.input.max) || this.options.max;
    this.options.step = parseFloat(this.input.step) || this.options.step;
    this._value = parseFloat(this.input.value) || this.options.value;

    // Bind events
    this.input.addEventListener('input', (e) => this._handleInput(e));
    this.input.addEventListener('change', (e) => this._handleChange(e));

    // Initial update
    this._updateUI();
  }

  _handleInput(e) {
    this._value = parseFloat(e.target.value);
    this._updateUI();
    dispatch(this.el, 'ux:range:input', { value: this._value, percent: this.percent });
  }

  _handleChange(e) {
    this._value = parseFloat(e.target.value);
    this._updateUI();
    dispatch(this.el, 'ux:range:change', { value: this._value, percent: this.percent });
  }

  _updateUI() {
    const percent = this.percent;

    if (this.fill) {
      this.fill.style.width = `${percent}%`;
    }

    if (this.thumb) {
      this.thumb.style.left = `${percent}%`;
    }

    if (this.valueDisplay) {
      this.valueDisplay.textContent = this._value;
    }
  }

  get percent() {
    return ((this._value - this.options.min) / (this.options.max - this.options.min)) * 100;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.setValue(val);
  }

  setValue(val) {
    this._value = Math.min(this.options.max, Math.max(this.options.min, parseFloat(val)));
    if (this.input) {
      this.input.value = this._value;
    }
    this._updateUI();
    dispatch(this.el, 'ux:range:change', { value: this._value, percent: this.percent });
  }

  increment() {
    this.setValue(this._value + this.options.step);
  }

  decrement() {
    this.setValue(this._value - this.options.step);
  }

  reset() {
    this.setValue(this.options.value);
  }

  destroy() {
    delete this.el._uxComponent;
  }
}
