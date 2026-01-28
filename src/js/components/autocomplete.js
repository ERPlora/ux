/**
 * UX Autocomplete Component
 * Vanilla JS autocomplete/typeahead input
 */

import { dispatch, onEscape, onClickOutside } from '../core/helpers.js';

export class UXAutocomplete {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXAutocomplete: Element not found');
      return;
    }

    this.options = {
      inputSelector: '.ux-autocomplete__input, input',
      listSelector: '.ux-autocomplete__list',
      itemSelector: '.ux-autocomplete__item',
      items: [],
      minChars: 1,
      debounce: 300,
      fetchUrl: null, // URL for remote data
      valueKey: 'value',
      labelKey: 'label',
      ...options
    };

    // Parse items from data attribute if present
    if (this.el.dataset.items) {
      try {
        this.options.items = JSON.parse(this.el.dataset.items);
      } catch (e) {
        console.warn('UXAutocomplete: Invalid items JSON');
      }
    }

    this.input = this.el.querySelector(this.options.inputSelector);
    this.list = this.el.querySelector(this.options.listSelector);

    this._isOpen = false;
    this._selectedIndex = -1;
    this._filteredItems = [];
    this._debounceTimeout = null;
    this._cleanupEscape = null;
    this._cleanupClickOutside = null;

    this._init();
  }

  _init() {
    if (!this.input) {
      console.warn('UXAutocomplete: Input element not found');
      return;
    }

    // Create list if not present
    if (!this.list) {
      this.list = document.createElement('ul');
      this.list.className = 'ux-autocomplete__list';
      this.el.appendChild(this.list);
    }

    // Bind events
    this.input.addEventListener('input', (e) => this._handleInput(e));
    this.input.addEventListener('keydown', (e) => this._handleKeyDown(e));
    this.input.addEventListener('focus', () => this._handleFocus());

    // Close on escape
    this._cleanupEscape = onEscape(() => {
      if (this._isOpen) this.close();
    });

    // Close on click outside
    this._cleanupClickOutside = onClickOutside(this.el, () => {
      if (this._isOpen) this.close();
    });
  }

  _handleInput(e) {
    const query = e.target.value;

    // Debounce
    clearTimeout(this._debounceTimeout);
    this._debounceTimeout = setTimeout(() => {
      this._search(query);
    }, this.options.debounce);
  }

  async _search(query) {
    if (query.length < this.options.minChars) {
      this.close();
      return;
    }

    let items = this.options.items;

    // Fetch from URL if provided
    if (this.options.fetchUrl) {
      try {
        const url = this.options.fetchUrl.replace('{query}', encodeURIComponent(query));
        const response = await fetch(url);
        items = await response.json();
      } catch (e) {
        console.warn('UXAutocomplete: Fetch failed', e);
        items = [];
      }
    }

    // Filter items
    this._filteredItems = items.filter(item => {
      const label = this._getLabel(item);
      return label.toLowerCase().includes(query.toLowerCase());
    });

    this._selectedIndex = -1;
    this._renderList();

    if (this._filteredItems.length > 0) {
      this.open();
    } else {
      this.close();
    }

    dispatch(this.el, 'ux:autocomplete:search', { query, results: this._filteredItems });
  }

  _renderList() {
    this.list.innerHTML = this._filteredItems.map((item, index) => {
      const label = this._getLabel(item);
      const isSelected = index === this._selectedIndex;
      return `<li class="ux-autocomplete__item${isSelected ? ' is-selected' : ''}" data-index="${index}">${label}</li>`;
    }).join('');

    // Bind click events
    this.list.querySelectorAll('.ux-autocomplete__item').forEach(li => {
      li.addEventListener('click', () => {
        const index = parseInt(li.dataset.index, 10);
        this.select(this._filteredItems[index]);
      });
    });
  }

  _handleKeyDown(e) {
    if (!this._isOpen) {
      if (e.key === 'ArrowDown' && this._filteredItems.length > 0) {
        this.open();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._selectedIndex = Math.min(this._selectedIndex + 1, this._filteredItems.length - 1);
        this._updateSelection();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
        this._updateSelection();
        break;
      case 'Enter':
        e.preventDefault();
        if (this._selectedIndex >= 0) {
          this.select(this._filteredItems[this._selectedIndex]);
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  _handleFocus() {
    if (this.input.value.length >= this.options.minChars && this._filteredItems.length > 0) {
      this.open();
    }
  }

  _updateSelection() {
    const items = this.list.querySelectorAll('.ux-autocomplete__item');
    items.forEach((item, i) => {
      item.classList.toggle('is-selected', i === this._selectedIndex);
    });

    // Scroll into view
    if (this._selectedIndex >= 0 && items[this._selectedIndex]) {
      items[this._selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  _getLabel(item) {
    if (typeof item === 'string') return item;
    return item[this.options.labelKey] || item.label || item.name || String(item);
  }

  _getValue(item) {
    if (typeof item === 'string') return item;
    return item[this.options.valueKey] || item.value || item.id || this._getLabel(item);
  }

  get isOpen() {
    return this._isOpen;
  }

  get value() {
    return this.input?.value || '';
  }

  set value(val) {
    if (this.input) {
      this.input.value = val;
    }
  }

  open() {
    this._isOpen = true;
    this.list.style.display = 'block';
    this.el.classList.add('is-open');
    dispatch(this.el, 'ux:autocomplete:open');
  }

  close() {
    this._isOpen = false;
    this.list.style.display = 'none';
    this.el.classList.remove('is-open');
    this._selectedIndex = -1;
    dispatch(this.el, 'ux:autocomplete:close');
  }

  select(item) {
    const label = this._getLabel(item);
    const value = this._getValue(item);

    this.input.value = label;
    this.close();

    dispatch(this.el, 'ux:autocomplete:select', { item, label, value });
  }

  setItems(items) {
    this.options.items = items;
  }

  clear() {
    this.input.value = '';
    this._filteredItems = [];
    this.close();
    dispatch(this.el, 'ux:autocomplete:clear');
  }

  destroy() {
    if (this._cleanupEscape) this._cleanupEscape();
    if (this._cleanupClickOutside) this._cleanupClickOutside();
    clearTimeout(this._debounceTimeout);
    delete this.el._uxComponent;
  }
}
