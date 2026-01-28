/**
 * UX Tag Input Component
 * Vanilla JS tag/chip input with add/remove functionality
 */

import { dispatch } from '../core/helpers.js';

export class UXTagInput {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXTagInput: Element not found');
      return;
    }

    this.options = {
      inputSelector: '.ux-tag-input__input, input',
      tagsContainerSelector: '.ux-tag-input__tags',
      tagSelector: '.ux-tag-input__tag',
      removeSelector: '.ux-tag-input__remove, [data-remove]',
      tags: [],
      maxTags: Infinity,
      allowDuplicates: false,
      delimiter: ',', // For parsing pasted content
      placeholder: 'Add tag...',
      ...options
    };

    // Parse tags from data attribute if present
    if (this.el.dataset.tags) {
      try {
        this.options.tags = JSON.parse(this.el.dataset.tags);
      } catch (e) {
        // Try comma-separated
        this.options.tags = this.el.dataset.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    this.input = this.el.querySelector(this.options.inputSelector);
    this.tagsContainer = this.el.querySelector(this.options.tagsContainerSelector);

    this._tags = [...this.options.tags];
    this._init();
  }

  _init() {
    if (!this.input) {
      console.warn('UXTagInput: Input element not found');
      return;
    }

    // Create tags container if not present
    if (!this.tagsContainer) {
      this.tagsContainer = document.createElement('div');
      this.tagsContainer.className = 'ux-tag-input__tags';
      this.input.parentNode.insertBefore(this.tagsContainer, this.input);
    }

    // Bind events
    this.input.addEventListener('keydown', (e) => this._handleKeyDown(e));
    this.input.addEventListener('paste', (e) => this._handlePaste(e));

    // Click on container focuses input
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el || e.target === this.tagsContainer) {
        this.input.focus();
      }
    });

    // Render initial tags
    this._renderTags();
  }

  _handleKeyDown(e) {
    const value = this.input.value.trim();

    // Enter or comma to add tag
    if ((e.key === 'Enter' || e.key === ',') && value) {
      e.preventDefault();
      this.addTag(value);
      this.input.value = '';
    }

    // Backspace to remove last tag when input is empty
    if (e.key === 'Backspace' && !this.input.value && this._tags.length > 0) {
      this.removeTag(this._tags.length - 1);
    }
  }

  _handlePaste(e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const tags = pastedText.split(this.options.delimiter).map(t => t.trim()).filter(Boolean);

    tags.forEach(tag => this.addTag(tag));
  }

  _renderTags() {
    this.tagsContainer.innerHTML = this._tags.map((tag, index) => `
      <span class="ux-tag-input__tag" data-index="${index}">
        <span class="ux-tag-input__tag-text">${this._escapeHtml(tag)}</span>
        <button type="button" class="ux-tag-input__remove" data-index="${index}" aria-label="Remove ${this._escapeHtml(tag)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
    `).join('');

    // Bind remove events
    this.tagsContainer.querySelectorAll('.ux-tag-input__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index, 10);
        this.removeTag(index);
      });
    });
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  get tags() {
    return [...this._tags];
  }

  get value() {
    return this._tags.join(this.options.delimiter);
  }

  addTag(tag) {
    tag = String(tag).trim();

    if (!tag) return false;

    // Check max tags
    if (this._tags.length >= this.options.maxTags) {
      dispatch(this.el, 'ux:tag-input:error', { error: 'max', tag });
      return false;
    }

    // Check duplicates
    if (!this.options.allowDuplicates && this._tags.includes(tag)) {
      dispatch(this.el, 'ux:tag-input:error', { error: 'duplicate', tag });
      return false;
    }

    this._tags.push(tag);
    this._renderTags();
    dispatch(this.el, 'ux:tag-input:add', { tag, tags: this.tags });
    dispatch(this.el, 'ux:tag-input:change', { tags: this.tags });
    return true;
  }

  removeTag(index) {
    if (index < 0 || index >= this._tags.length) return false;

    const tag = this._tags[index];
    this._tags.splice(index, 1);
    this._renderTags();
    dispatch(this.el, 'ux:tag-input:remove', { tag, index, tags: this.tags });
    dispatch(this.el, 'ux:tag-input:change', { tags: this.tags });
    return true;
  }

  removeTagByValue(tag) {
    const index = this._tags.indexOf(tag);
    if (index >= 0) {
      return this.removeTag(index);
    }
    return false;
  }

  setTags(tags) {
    this._tags = tags.map(t => String(t).trim()).filter(Boolean);
    this._renderTags();
    dispatch(this.el, 'ux:tag-input:change', { tags: this.tags });
  }

  clear() {
    this._tags = [];
    this.input.value = '';
    this._renderTags();
    dispatch(this.el, 'ux:tag-input:clear');
    dispatch(this.el, 'ux:tag-input:change', { tags: [] });
  }

  focus() {
    this.input?.focus();
  }

  destroy() {
    delete this.el._uxComponent;
  }
}
