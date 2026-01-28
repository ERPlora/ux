/**
 * UX Alpine.js Components
 * Definiciones inline para los componentes de documentación
 */

// ========================================
// Modal Component
// ========================================
function uxModal(options = {}) {
  return {
    isOpen: false,
    closeOnBackdrop: options.closeOnBackdrop !== false,
    closeOnEscape: options.closeOnEscape !== false,
    modalId: options.id || 'modal-' + Math.random().toString(36).substr(2, 9),
    titleId: null,
    descriptionId: null,
    _previousFocus: null,
    _focusTrap: null,

    init() {
      this.titleId = this.modalId + '-title';
      this.descriptionId = this.modalId + '-desc';

      // Escape key handler
      if (this.closeOnEscape) {
        document.addEventListener('keydown', (e) => {
          if (this.isOpen && e.key === 'Escape') {
            this.close();
          }
        });
      }
    },

    // ARIA attributes for the backdrop
    get backdropAttrs() {
      return {
        'role': 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': this.titleId,
        'aria-describedby': this.descriptionId,
        'aria-hidden': !this.isOpen,
        'data-state': this.isOpen ? 'open' : 'closed'
      };
    },

    open() {
      this._previousFocus = document.activeElement;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';

      // Focus trap and initial focus
      this.$nextTick(() => {
        const modal = this.$el.querySelector('.ux-modal');
        if (modal) {
          // Focus first focusable element or the modal itself
          const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) {
            focusable.focus();
          } else {
            modal.setAttribute('tabindex', '-1');
            modal.focus();
          }

          // Setup focus trap
          this._setupFocusTrap(modal);
        }

        // Announce to screen readers
        this._announce('Dialog opened');
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';

      // Restore focus
      if (this._previousFocus) {
        this._previousFocus.focus();
        this._previousFocus = null;
      }

      // Remove focus trap
      if (this._focusTrap) {
        document.removeEventListener('keydown', this._focusTrap);
        this._focusTrap = null;
      }
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    },

    _setupFocusTrap(container) {
      this._focusTrap = (e) => {
        if (e.key !== 'Tab' || !this.isOpen) return;

        const focusableEls = container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      };
      document.addEventListener('keydown', this._focusTrap);
    },

    _announce(message) {
      const announcer = document.createElement('div');
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
      announcer.textContent = message;
      document.body.appendChild(announcer);
      setTimeout(() => announcer.remove(), 1000);
    }
  };
}

// ========================================
// Alert Component
// ========================================
function uxAlert(options = {}) {
  return {
    isOpen: false,
    title: '',
    message: '',
    type: options.type || 'info', // info, success, warning, danger
    alertId: options.id || 'alert-' + Math.random().toString(36).substr(2, 9),
    _resolve: null,
    _previousFocus: null,

    // ARIA attributes for the alert dialog
    get alertAttrs() {
      return {
        'role': 'alertdialog',
        'aria-modal': 'true',
        'aria-labelledby': this.alertId + '-title',
        'aria-describedby': this.alertId + '-message',
        'aria-hidden': !this.isOpen,
        'data-state': this.isOpen ? 'open' : 'closed'
      };
    },

    get titleId() {
      return this.alertId + '-title';
    },

    get messageId() {
      return this.alertId + '-message';
    },

    open(opts = {}) {
      this._previousFocus = document.activeElement;
      this.title = opts.title || '';
      this.message = opts.message || '';
      this.type = opts.type || this.type;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';

      // Focus management
      this.$nextTick(() => {
        // Focus the first button or the dialog itself
        const dialog = this.$el.querySelector('[role="alertdialog"]') || this.$el;
        const focusTarget = dialog.querySelector('button:not([disabled])') || dialog;
        if (focusTarget.focus) focusTarget.focus();

        // Announce to screen readers
        this._announce(this.title + '. ' + this.message, 'assertive');
      });
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';

      // Restore focus
      if (this._previousFocus && this._previousFocus.focus) {
        this._previousFocus.focus();
        this._previousFocus = null;
      }
    },

    confirm(title, message) {
      return new Promise((resolve) => {
        this.title = title;
        this.message = message;
        this.isOpen = true;
        this._resolve = resolve;

        // Focus management
        this.$nextTick(() => {
          const confirmBtn = this.$el.querySelector('[data-confirm]') || this.$el.querySelector('button');
          if (confirmBtn) confirmBtn.focus();
        });
      });
    },

    handleConfirm(result) {
      this.isOpen = false;
      document.body.style.overflow = '';

      if (this._resolve) {
        this._resolve(result);
        this._resolve = null;
      }

      // Restore focus
      if (this._previousFocus && this._previousFocus.focus) {
        this._previousFocus.focus();
        this._previousFocus = null;
      }
    },

    // Keyboard handler
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },

    _announce(message, priority = 'polite') {
      const announcer = document.createElement('div');
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
      announcer.textContent = message;
      document.body.appendChild(announcer);
      setTimeout(() => announcer.remove(), 1000);
    }
  };
}

// ========================================
// Alert Banner Component
// ========================================
function uxAlertBanner(options = {}) {
  return {
    visible: true,
    dismissible: options.dismissible !== false,
    autoDismiss: options.autoDismiss || 0,

    init() {
      if (this.autoDismiss > 0) {
        setTimeout(() => this.dismiss(), this.autoDismiss);
      }
    },

    dismiss() {
      this.visible = false;
    },

    show() {
      this.visible = true;
    }
  };
}

// ========================================
// Accordion Component
// ========================================
function uxAccordion(options = {}) {
  return {
    openItems: options.openItems || [],
    multiple: options.multiple || false,
    disabled: options.disabled || false,
    accordionId: options.id || 'accordion-' + Math.random().toString(36).substr(2, 9),

    // Generate unique IDs for ARIA relationships
    getHeaderId(index) {
      return `${this.accordionId}-header-${index}`;
    },

    getPanelId(index) {
      return `${this.accordionId}-panel-${index}`;
    },

    // ARIA attributes for header button
    getHeaderAttrs(index) {
      return {
        'id': this.getHeaderId(index),
        'aria-expanded': this.isOpen(index),
        'aria-controls': this.getPanelId(index),
        'aria-disabled': this.disabled,
        'tabindex': this.disabled ? -1 : 0
      };
    },

    // ARIA attributes for panel
    getPanelAttrs(index) {
      return {
        'id': this.getPanelId(index),
        'role': 'region',
        'aria-labelledby': this.getHeaderId(index),
        'aria-hidden': !this.isOpen(index)
      };
    },

    isOpen(index) {
      return this.openItems.includes(index);
    },

    toggle(index) {
      if (this.disabled) return;

      if (this.isOpen(index)) {
        this.openItems = this.openItems.filter(i => i !== index);
      } else {
        if (this.multiple) {
          this.openItems = [...this.openItems, index];
        } else {
          this.openItems = [index];
        }
      }

      this.$dispatch('accordion:change', { index, isOpen: this.isOpen(index), openItems: this.openItems });
    },

    open(index) {
      if (!this.isOpen(index)) {
        this.toggle(index);
      }
    },

    close(index) {
      if (this.isOpen(index)) {
        this.toggle(index);
      }
    },

    openAll(total) {
      this.openItems = Array.from({ length: total }, (_, i) => i);
    },

    closeAll() {
      this.openItems = [];
    },

    // Keyboard navigation for accordion headers
    handleKeydown(event, index, totalItems) {
      let newIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          newIndex = (index + 1) % totalItems;
          this._focusHeader(newIndex);
          break;

        case 'ArrowUp':
          event.preventDefault();
          newIndex = (index - 1 + totalItems) % totalItems;
          this._focusHeader(newIndex);
          break;

        case 'Home':
          event.preventDefault();
          this._focusHeader(0);
          break;

        case 'End':
          event.preventDefault();
          this._focusHeader(totalItems - 1);
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          this.toggle(index);
          break;
      }
    },

    _focusHeader(index) {
      const header = document.getElementById(this.getHeaderId(index));
      if (header) header.focus();
    }
  };
}

// ========================================
// Tabs Component
// ========================================
function uxTabs(options = {}) {
  return {
    activeTab: options.activeTab || 0,
    tabsId: options.id || 'tabs-' + Math.random().toString(36).substr(2, 9),
    orientation: options.orientation || 'horizontal',
    _totalTabs: 0,

    init() {
      // Count tabs on init
      this.$nextTick(() => {
        const tablist = this.$el.querySelector('[role="tablist"]');
        if (tablist) {
          this._totalTabs = tablist.querySelectorAll('[role="tab"]').length;
        }
      });
    },

    // Generate unique IDs for ARIA relationships
    getTabId(index) {
      return `${this.tabsId}-tab-${index}`;
    },

    getPanelId(index) {
      return `${this.tabsId}-panel-${index}`;
    },

    // ARIA attributes for tab button
    getTabAttrs(index) {
      return {
        'id': this.getTabId(index),
        'role': 'tab',
        'aria-selected': this.isActive(index),
        'aria-controls': this.getPanelId(index),
        'tabindex': this.isActive(index) ? 0 : -1
      };
    },

    // ARIA attributes for tab panel
    getPanelAttrs(index) {
      return {
        'id': this.getPanelId(index),
        'role': 'tabpanel',
        'aria-labelledby': this.getTabId(index),
        'tabindex': 0,
        'hidden': !this.isActive(index)
      };
    },

    // ARIA attributes for tablist container
    get tablistAttrs() {
      return {
        'role': 'tablist',
        'aria-orientation': this.orientation
      };
    },

    isActive(index) {
      return this.activeTab === index;
    },

    setTab(index) {
      const oldTab = this.activeTab;
      this.activeTab = index;

      if (oldTab !== index) {
        this.$dispatch('tabs:change', { index, previousIndex: oldTab });

        // Focus the new tab
        this.$nextTick(() => {
          const tab = document.getElementById(this.getTabId(index));
          if (tab) tab.focus();
        });
      }
    },

    // Keyboard navigation for tabs
    handleKeydown(event, index) {
      const total = this._totalTabs || (index + 1);
      let newIndex;

      switch (event.key) {
        case 'ArrowRight':
          if (this.orientation === 'horizontal') {
            event.preventDefault();
            newIndex = (index + 1) % total;
            this.setTab(newIndex);
          }
          break;

        case 'ArrowLeft':
          if (this.orientation === 'horizontal') {
            event.preventDefault();
            newIndex = (index - 1 + total) % total;
            this.setTab(newIndex);
          }
          break;

        case 'ArrowDown':
          if (this.orientation === 'vertical') {
            event.preventDefault();
            newIndex = (index + 1) % total;
            this.setTab(newIndex);
          }
          break;

        case 'ArrowUp':
          if (this.orientation === 'vertical') {
            event.preventDefault();
            newIndex = (index - 1 + total) % total;
            this.setTab(newIndex);
          }
          break;

        case 'Home':
          event.preventDefault();
          this.setTab(0);
          break;

        case 'End':
          event.preventDefault();
          this.setTab(total - 1);
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          this.setTab(index);
          break;
      }
    }
  };
}

// ========================================
// Dropdown Component
// ========================================
function uxDropdown(options = {}) {
  return {
    isOpen: false,
    activeIndex: -1,
    closeOnSelect: options.closeOnSelect !== false,
    closeOnClickOutside: options.closeOnClickOutside !== false,
    closeOnEscape: options.closeOnEscape !== false,
    triggerOnHover: options.triggerOnHover || false,
    hoverDelay: options.hoverDelay || 150,
    _hoverTimeout: null,
    _items: [],

    init() {
      // Setup click outside listener
      if (this.closeOnClickOutside) {
        document.addEventListener('click', (e) => {
          if (this.isOpen && !this.$el.contains(e.target)) {
            this.close();
          }
        });
      }

      // Setup escape key listener
      if (this.closeOnEscape) {
        document.addEventListener('keydown', (e) => {
          if (this.isOpen && e.key === 'Escape') {
            this.close();
            this.$el.querySelector('[aria-haspopup]')?.focus();
          }
        });
      }

      // Collect menu items for keyboard navigation
      this.$nextTick(() => {
        this._items = Array.from(this.$el.querySelectorAll('.ux-dropdown__item:not(.ux-dropdown__item--disabled)'));
      });
    },

    // Computed: container classes for :class binding
    get containerClasses() {
      return {
        'ux-dropdown--open': this.isOpen
      };
    },

    // Computed: trigger ARIA attributes
    get triggerAttrs() {
      return {
        'aria-haspopup': 'menu',
        'aria-expanded': this.isOpen,
        'aria-controls': this.$el.querySelector('.ux-dropdown__menu')?.id || undefined
      };
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    open() {
      this.isOpen = true;
      this.activeIndex = -1;
      this.$dispatch('dropdown:open');

      // Focus first item when opened via keyboard
      this.$nextTick(() => {
        this._items = Array.from(this.$el.querySelectorAll('.ux-dropdown__item:not(.ux-dropdown__item--disabled)'));
      });
    },

    close() {
      this.isOpen = false;
      this.activeIndex = -1;
      this.$dispatch('dropdown:close');
    },

    select(value) {
      this.$dispatch('dropdown:select', { value });
      if (this.closeOnSelect) {
        this.close();
      }
    },

    // Keyboard navigation
    handleKeydown(event) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (!this.isOpen) {
            event.preventDefault();
            this.open();
            this.$nextTick(() => this.focusFirst());
          } else if (this.activeIndex >= 0 && this._items[this.activeIndex]) {
            event.preventDefault();
            this._items[this.activeIndex].click();
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (!this.isOpen) {
            this.open();
            this.$nextTick(() => this.focusFirst());
          } else {
            this.focusNext();
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (this.isOpen) {
            this.focusPrev();
          }
          break;

        case 'Home':
          if (this.isOpen) {
            event.preventDefault();
            this.focusFirst();
          }
          break;

        case 'End':
          if (this.isOpen) {
            event.preventDefault();
            this.focusLast();
          }
          break;

        case 'Tab':
          if (this.isOpen) {
            this.close();
          }
          break;
      }
    },

    focusFirst() {
      this.activeIndex = 0;
      this._focusCurrentItem();
    },

    focusLast() {
      this.activeIndex = this._items.length - 1;
      this._focusCurrentItem();
    },

    focusNext() {
      this.activeIndex = Math.min(this.activeIndex + 1, this._items.length - 1);
      this._focusCurrentItem();
    },

    focusPrev() {
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this._focusCurrentItem();
    },

    _focusCurrentItem() {
      if (this.activeIndex >= 0 && this._items[this.activeIndex]) {
        this._items[this.activeIndex].focus();
      }
    },

    // Hover handlers (if triggerOnHover is true)
    onMouseEnter() {
      if (!this.triggerOnHover) return;
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.open(), this.hoverDelay);
    },

    onMouseLeave() {
      if (!this.triggerOnHover) return;
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.close(), this.hoverDelay);
    }
  };
}

// ========================================
// Sheet Component
// ========================================
function uxSheet(options = {}) {
  return {
    isOpen: false,
    closeOnBackdrop: options.closeOnBackdrop !== false,

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    handleBackdropClick(event) {
      if (this.closeOnBackdrop && event.target === event.currentTarget) {
        this.close();
      }
    }
  };
}

// ========================================
// Toast Component
// ========================================
function uxToast(options = {}) {
  return {
    toasts: [],
    position: options.position || 'bottom-center',
    duration: options.duration || 3000,

    show(message, type = 'info') {
      const id = Date.now();
      this.toasts.push({ id, message, type });

      setTimeout(() => {
        this.dismiss(id);
      }, this.duration);

      return id;
    },

    dismiss(id) {
      this.toasts = this.toasts.filter(t => t.id !== id);
    },

    success(message) {
      return this.show(message, 'success');
    },

    error(message) {
      return this.show(message, 'error');
    },

    warning(message) {
      return this.show(message, 'warning');
    },

    info(message) {
      return this.show(message, 'info');
    }
  };
}

// ========================================
// Popover Component
// ========================================
function uxPopover(options = {}) {
  return {
    isOpen: false,
    trigger: options.trigger || 'click',

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    }
  };
}

// ========================================
// Drawer Component
// ========================================
function uxDrawer(options = {}) {
  return {
    isOpen: false,
    side: options.side || 'left',

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  };
}

// ========================================
// Panel Component
// ========================================
function uxPanel(options = {}) {
  return {
    isOpen: options.isOpen !== false,
    collapsible: options.collapsible !== false,

    toggle() {
      if (this.collapsible) {
        this.isOpen = !this.isOpen;
      }
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    }
  };
}

// ========================================
// Tooltip Component
// ========================================
function uxTooltip(options = {}) {
  return {
    isVisible: false,
    delay: options.delay || 200,
    _timeout: null,

    show() {
      this._timeout = setTimeout(() => {
        this.isVisible = true;
      }, this.delay);
    },

    hide() {
      clearTimeout(this._timeout);
      this.isVisible = false;
    }
  };
}

// ========================================
// Sparkline Component (for charts)
// ========================================
function uxSparkline(options = {}) {
  return {
    data: options.data || [],
    type: options.type || 'line',
    color: options.color || 'var(--ux-primary)',
    height: options.height || 40,
    width: options.width || 100,

    init() {
      this.render();
    },

    render() {
      // Simple SVG sparkline rendering
      if (!this.$refs.svg) return;

      const svg = this.$refs.svg;
      const data = this.data;
      if (data.length < 2) return;

      const max = Math.max(...data);
      const min = Math.min(...data);
      const range = max - min || 1;
      const step = this.width / (data.length - 1);

      const points = data.map((val, i) => {
        const x = i * step;
        const y = this.height - ((val - min) / range) * this.height;
        return `${x},${y}`;
      }).join(' ');

      svg.innerHTML = `<polyline fill="none" stroke="${this.color}" stroke-width="2" points="${points}" />`;
    },

    update(newData) {
      this.data = newData;
      this.render();
    }
  };
}

// ========================================
// Currency Input Component
// ========================================
function uxCurrencyInput(options = {}) {
  return {
    value: options.value || 0,
    currency: options.currency || 'USD',
    locale: options.locale || 'en-US',
    displayValue: '',

    init() {
      this.formatDisplay();
    },

    formatDisplay() {
      this.displayValue = new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.currency
      }).format(this.value);
    },

    handleInput(event) {
      const raw = event.target.value.replace(/[^0-9.-]/g, '');
      this.value = parseFloat(raw) || 0;
      this.formatDisplay();
    }
  };
}

// ========================================
// Rating Component
// ========================================
function uxRating(options = {}) {
  return {
    value: options.value || 0,
    max: options.max || 5,
    readonly: options.readonly || false,
    allowHalf: options.allowHalf || false,
    hoverValue: null,
    stars: [],

    init() {
      this.stars = Array.from({ length: this.max }, (_, i) => i + 1);
    },

    setRating(index, event) {
      if (this.readonly) return;

      if (this.allowHalf && event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const isHalf = x < rect.width / 2;
        this.value = isHalf ? index - 0.5 : index;
      } else {
        this.value = index;
      }
      this.$dispatch('change', { value: this.value });
    },

    onStarHover(index, event) {
      if (this.readonly) return;

      if (this.allowHalf && event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const isHalf = x < rect.width / 2;
        this.hoverValue = isHalf ? index - 0.5 : index;
      } else {
        this.hoverValue = index;
      }
    },

    onMouseLeave() {
      this.hoverValue = null;
    },

    isStarFilled(index) {
      const val = this.hoverValue !== null ? this.hoverValue : this.value;
      return index <= val;
    },

    isStarHalf(index) {
      const val = this.hoverValue !== null ? this.hoverValue : this.value;
      return index - 0.5 === val;
    },

    getStarSvg(index) {
      const val = this.hoverValue !== null ? this.hoverValue : this.value;

      if (index <= Math.floor(val)) {
        // Filled star
        return `<svg viewBox="0 0 24 24" fill="currentColor" class="ux-rating__star-svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
      } else if (this.allowHalf && index - 0.5 === val) {
        // Half star
        return `<svg viewBox="0 0 24 24" class="ux-rating__star-svg">
          <defs>
            <linearGradient id="half-${index}">
              <stop offset="50%" stop-color="currentColor"/>
              <stop offset="50%" stop-color="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-${index})" stroke="currentColor" stroke-width="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
      } else {
        // Empty star
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="ux-rating__star-svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
      }
    },

    getStarAriaAttrs(index) {
      return {
        'role': 'radio',
        'aria-checked': this.value >= index,
        'aria-label': `${index} de ${this.max} estrellas`,
        'tabindex': index === 1 ? 0 : -1
      };
    },

    handleKeydown(event, index) {
      if (this.readonly) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          if (index < this.max) {
            this.value = index + (this.allowHalf ? 0.5 : 1);
            if (this.value > this.max) this.value = this.max;
          }
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          if (index > 1) {
            this.value = index - (this.allowHalf ? 0.5 : 1);
            if (this.value < 0) this.value = 0;
          }
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.setRating(index, event);
          break;
      }
    },

    // Legacy methods for backwards compatibility
    setHover(val) {
      if (!this.readonly) {
        this.hoverValue = val;
      }
    },

    clearHover() {
      this.hoverValue = null;
    },

    isActive(index) {
      return index <= (this.hoverValue || this.value);
    }
  };
}

// ========================================
// Counter/Stepper Component
// ========================================
function uxStepper(options = {}) {
  return {
    value: options.value || 0,
    min: options.min ?? -Infinity,
    max: options.max ?? Infinity,
    step: options.step || 1,

    increment() {
      if (this.value + this.step <= this.max) {
        this.value += this.step;
        this.$dispatch('change', this.value);
      }
    },

    decrement() {
      if (this.value - this.step >= this.min) {
        this.value -= this.step;
        this.$dispatch('change', this.value);
      }
    },

    setValue(val) {
      this.value = Math.min(this.max, Math.max(this.min, val));
    }
  };
}

// ========================================
// Toggle Component
// ========================================
function uxToggle(options = {}) {
  return {
    checked: options.checked || false,

    toggle() {
      this.checked = !this.checked;
      this.$dispatch('change', this.checked);
    }
  };
}

// ========================================
// Password Input Component
// ========================================
function uxPassword(options = {}) {
  return {
    showPassword: false,
    value: options.value || '',

    get inputType() {
      return this.showPassword ? 'text' : 'password';
    },

    toggle() {
      this.showPassword = !this.showPassword;
    },

    show() {
      this.showPassword = true;
    },

    hide() {
      this.showPassword = false;
    }
  };
}

// ========================================
// Checkbox Group Component
// ========================================
function uxCheckboxGroup(options = {}) {
  return {
    selected: options.selected || [],

    isSelected(value) {
      return this.selected.includes(value);
    },

    toggle(value) {
      if (this.isSelected(value)) {
        this.selected = this.selected.filter(v => v !== value);
      } else {
        this.selected = [...this.selected, value];
      }
      this.$dispatch('change', this.selected);
    }
  };
}

// ========================================
// Radio Group Component
// ========================================
function uxRadioGroup(options = {}) {
  return {
    selected: options.selected || null,

    isSelected(value) {
      return this.selected === value;
    },

    select(value) {
      this.selected = value;
      this.$dispatch('change', this.selected);
    }
  };
}

// ========================================
// Select Component
// ========================================
function uxSelect(options = {}) {
  return {
    isOpen: false,
    options: options.options || [],
    value: options.value || null,
    values: options.values || [], // For multi-select
    placeholder: options.placeholder || 'Selecciona...',
    multiple: options.multiple || false,
    searchable: options.searchable || false,
    searchQuery: '',
    emptyText: options.emptyText || 'No hay opciones',
    focusedIndex: -1,

    // Computed: display value for single select
    get displayValue() {
      if (this.multiple) {
        if (this.values.length === 0) return '';
        return this.values
          .map(v => this.options.find(o => o.value === v)?.label)
          .filter(Boolean)
          .join(', ');
      }
      const selected = this.options.find(o => o.value === this.value);
      return selected ? selected.label : '';
    },

    // Computed: filtered options (for searchable)
    get filteredOptions() {
      if (!this.searchable || !this.searchQuery) return this.options;
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(o => o.label.toLowerCase().includes(query));
    },

    // Methods
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && this.searchable) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      }
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
      this.focusedIndex = -1;
    },

    select(option) {
      if (this.multiple) {
        const index = this.values.indexOf(option.value);
        if (index === -1) {
          this.values.push(option.value);
        } else {
          this.values.splice(index, 1);
        }
        this.$dispatch('change', this.values);
      } else {
        this.value = option.value;
        this.close();
        this.$dispatch('change', option.value);
      }
    },

    isSelected(option) {
      if (this.multiple) {
        return this.values.includes(option.value);
      }
      return this.value === option.value;
    },

    clear() {
      if (this.multiple) {
        this.values = [];
        this.$dispatch('change', []);
      } else {
        this.value = null;
        this.$dispatch('change', null);
      }
    },

    removeValue(val) {
      const index = this.values.indexOf(val);
      if (index > -1) {
        this.values.splice(index, 1);
        this.$dispatch('change', this.values);
      }
    },

    handleKeydown(event) {
      switch (event.key) {
        case 'Enter':
        case ' ':
          if (!this.isOpen) {
            this.open();
          } else if (this.focusedIndex >= 0) {
            this.select(this.filteredOptions[this.focusedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.close();
          break;
        case 'ArrowDown':
          if (!this.isOpen) {
            this.open();
          } else {
            this.focusedIndex = Math.min(this.focusedIndex + 1, this.filteredOptions.length - 1);
          }
          event.preventDefault();
          break;
        case 'ArrowUp':
          if (this.isOpen) {
            this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
          }
          event.preventDefault();
          break;
      }
    }
  };
}

// ========================================
// Carousel Component
// ========================================
function uxCarousel(options = {}) {
  return {
    // State
    currentIndex: options.startIndex || 0,
    slidesPerView: options.slidesPerView || 1,
    slidesCount: 0,
    loop: options.loop || false,
    autoplay: options.autoplay || false,
    autoplayInterval: options.autoplayInterval || options.interval || 5000,
    draggable: options.draggable !== false,
    _timer: null,
    _isDragging: false,
    _startX: 0,
    _currentX: 0,
    _dragOffset: 0,

    init() {
      // Count slides from DOM
      this.$nextTick(() => {
        const track = this.$refs.track;
        if (track) {
          this.slidesCount = track.querySelectorAll('.ux-carousel__slide').length;
        }

        // Start autoplay if enabled
        if (this.autoplay && this.slidesCount > this.slidesPerView) {
          this.startAutoplay();
        }

        // Setup drag listeners if draggable
        if (this.draggable) {
          this.setupDrag();
        }

        // Dispatch init event
        this.$dispatch('ux-carousel:init', {
          slidesCount: this.slidesCount,
          currentIndex: this.currentIndex
        });
      });
    },

    // Computed: translateX percentage for CSS transform
    get translateX() {
      const slideWidth = 100 / this.slidesPerView;
      return -(this.currentIndex * slideWidth) + this._dragOffset;
    },

    // Computed: can go to previous slide
    get canGoPrev() {
      return this.loop || this.currentIndex > 0;
    },

    // Computed: can go to next slide
    get canGoNext() {
      const maxIndex = Math.max(0, this.slidesCount - this.slidesPerView);
      return this.loop || this.currentIndex < maxIndex;
    },

    // Computed: pagination dots array
    get paginationDots() {
      const totalPages = Math.ceil(this.slidesCount / this.slidesPerView);
      return Array.from({ length: totalPages }, (_, i) => i);
    },

    // Get current page (for pagination)
    getCurrentPage() {
      return Math.floor(this.currentIndex / this.slidesPerView);
    },

    // Go to specific page
    goToPage(page) {
      this.goTo(page * this.slidesPerView);
    },

    // Go to specific slide
    goTo(index) {
      const maxIndex = Math.max(0, this.slidesCount - this.slidesPerView);

      if (this.loop) {
        if (index < 0) {
          this.currentIndex = maxIndex;
        } else if (index > maxIndex) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = index;
        }
      } else {
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
      }

      this.$dispatch('ux-carousel:change', {
        index: this.currentIndex,
        direction: index > this.currentIndex ? 'next' : 'prev'
      });
    },

    // Next slide
    next() {
      this.goTo(this.currentIndex + 1);
    },

    // Previous slide
    prev() {
      this.goTo(this.currentIndex - 1);
    },

    // Start autoplay
    startAutoplay() {
      this.stopAutoplay();
      this._timer = setInterval(() => this.next(), this.autoplayInterval);
    },

    // Stop autoplay
    stopAutoplay() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
    },

    // Setup drag functionality
    setupDrag() {
      const viewport = this.$refs.viewport;
      if (!viewport) return;

      // Mouse events
      viewport.addEventListener('mousedown', (e) => this.onDragStart(e));
      document.addEventListener('mousemove', (e) => this.onDragMove(e));
      document.addEventListener('mouseup', () => this.onDragEnd());

      // Touch events
      viewport.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      viewport.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: true });
      viewport.addEventListener('touchend', () => this.onDragEnd());
    },

    onDragStart(e) {
      if (this.autoplay) this.stopAutoplay();
      this._isDragging = true;
      this._startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      this._currentX = this._startX;
    },

    onDragMove(e) {
      if (!this._isDragging) return;
      this._currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const diff = this._currentX - this._startX;
      const viewport = this.$refs.viewport;
      if (viewport) {
        const viewportWidth = viewport.offsetWidth;
        this._dragOffset = (diff / viewportWidth) * 100;
      }
    },

    onDragEnd() {
      if (!this._isDragging) return;
      this._isDragging = false;

      const threshold = 20; // percentage threshold to trigger slide change
      if (this._dragOffset < -threshold && this.canGoNext) {
        this.next();
      } else if (this._dragOffset > threshold && this.canGoPrev) {
        this.prev();
      }

      this._dragOffset = 0;

      if (this.autoplay) this.startAutoplay();
    },

    // Legacy compatibility
    get current() { return this.currentIndex; },
    set current(val) { this.currentIndex = val; },
    get total() { return this.slidesCount; },
    set total(val) { this.slidesCount = val; }
  };
}

// ========================================
// Lightbox Component
// ========================================
function uxLightbox(options = {}) {
  return {
    isOpen: false,
    currentIndex: 0,
    images: options.images || [],

    open(index = 0) {
      this.currentIndex = index;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },

    get currentImage() {
      return this.images[this.currentIndex];
    }
  };
}

// ========================================
// Calendar Component
// ========================================
function uxCalendar(options = {}) {
  const now = new Date();
  const locale = options.locale || 'es';
  const firstDayOfWeek = options.firstDayOfWeek ?? 1; // 0=Sunday, 1=Monday

  return {
    // State
    currentDate: new Date(options.year ?? now.getFullYear(), options.month ?? now.getMonth(), 1),
    selectedDate: options.value ? new Date(options.value) : null,
    rangeStart: null,
    rangeEnd: null,
    hoverDate: null,

    // Options
    range: options.range || false,
    minDate: options.minDate ? new Date(options.minDate) : null,
    maxDate: options.maxDate ? new Date(options.maxDate) : null,
    disabledDates: options.disabledDates || [],
    disabledDays: options.disabledDays || [],
    events: options.events || [],
    showFooter: options.showFooter !== false,
    showOtherMonths: options.showOtherMonths !== false,
    highlightWeekends: options.highlightWeekends || false,

    // Icons for navigation
    icons: {
      prev: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
      next: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
    },

    // Computed: weekday names
    get weekdays() {
      const days = [];
      const baseDate = new Date(2024, 0, firstDayOfWeek); // Start from a known Monday/Sunday
      for (let i = 0; i < 7; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        days.push(d.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2));
      }
      return days;
    },

    // Computed: current month and year display
    get currentMonthYear() {
      return this.currentDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    },

    // Computed: array of day objects for the calendar grid
    get calendarDays() {
      const days = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);

      // Adjust for first day of week
      let startOffset = firstDay.getDay() - firstDayOfWeek;
      if (startOffset < 0) startOffset += 7;

      // Days from previous month
      const prevMonth = new Date(year, month, 0);
      for (let i = startOffset - 1; i >= 0; i--) {
        const day = prevMonth.getDate() - i;
        const date = new Date(year, month - 1, day);
        days.push(this._createDayObject(date, true));
      }

      // Days of current month
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        days.push(this._createDayObject(date, false));
      }

      // Days from next month to complete the grid (6 rows = 42 cells)
      const remaining = 42 - days.length;
      for (let day = 1; day <= remaining; day++) {
        const date = new Date(year, month + 1, day);
        days.push(this._createDayObject(date, true));
      }

      return days;
    },

    // Helper: create day object with all properties
    _createDayObject(date, isOtherMonth) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateStr = this.formatDate(date);
      const dayOfWeek = date.getDay();

      // Check if date has events
      const dayEvents = this.events.filter(e => e.date === dateStr);

      // Check if disabled
      const isDisabled = this._isDateDisabled(date);

      // Range selection states
      const isRangeStart = this.rangeStart && this.formatDate(this.rangeStart) === dateStr;
      const isRangeEnd = this.rangeEnd && this.formatDate(this.rangeEnd) === dateStr;
      const isInRange = this._isInRange(date);
      const isRangeHover = this._isInHoverRange(date);

      return {
        day: date.getDate(),
        date: date,
        isOtherMonth,
        isToday: date.getTime() === today.getTime(),
        isSelected: this.selectedDate && this.formatDate(this.selectedDate) === dateStr,
        isDisabled,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangeHover,
        events: dayEvents
      };
    },

    // Helper: check if date is disabled
    _isDateDisabled(date) {
      if (this.minDate && date < this.minDate) return true;
      if (this.maxDate && date > this.maxDate) return true;
      if (this.disabledDays.includes(date.getDay())) return true;
      if (this.disabledDates.includes(this.formatDate(date))) return true;
      return false;
    },

    // Helper: check if date is in selected range
    _isInRange(date) {
      if (!this.rangeStart || !this.rangeEnd) return false;
      return date > this.rangeStart && date < this.rangeEnd;
    },

    // Helper: check if date is in hover range (during range selection)
    _isInHoverRange(date) {
      if (!this.range || !this.rangeStart || this.rangeEnd || !this.hoverDate) return false;
      const start = this.rangeStart < this.hoverDate ? this.rangeStart : this.hoverDate;
      const end = this.rangeStart < this.hoverDate ? this.hoverDate : this.rangeStart;
      return date > start && date < end;
    },

    // Navigation methods
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      this.$dispatch('calendar:navigate', { date: this.currentDate, direction: 'prev' });
    },

    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      this.$dispatch('calendar:navigate', { date: this.currentDate, direction: 'next' });
    },

    goToToday() {
      const today = new Date();
      this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
      this.$dispatch('calendar:today', { date: today });
    },

    goToDate(date) {
      const d = new Date(date);
      this.currentDate = new Date(d.getFullYear(), d.getMonth(), 1);
    },

    // Selection methods
    selectDate(dayObj) {
      if (dayObj.isDisabled) return;

      if (this.range) {
        this._handleRangeSelection(dayObj.date);
      } else {
        this.selectedDate = dayObj.date;
        this.$dispatch('calendar:select', {
          date: dayObj.date,
          formatted: this.formatDate(dayObj.date)
        });
      }
    },

    _handleRangeSelection(date) {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        // Start new range
        this.rangeStart = date;
        this.rangeEnd = null;
        this.$dispatch('calendar:range-start', {
          date: date,
          formatted: this.formatDate(date)
        });
      } else {
        // Complete the range
        if (date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = date;
        } else {
          this.rangeEnd = date;
        }
        this.$dispatch('calendar:range-select', {
          start: this.rangeStart,
          end: this.rangeEnd,
          startFormatted: this.formatDate(this.rangeStart),
          endFormatted: this.formatDate(this.rangeEnd)
        });
      }
    },

    clearSelection() {
      this.selectedDate = null;
      this.rangeStart = null;
      this.rangeEnd = null;
      this.hoverDate = null;
      this.$dispatch('calendar:clear');
    },

    // Hover handlers for range selection
    onDayHover(dayObj) {
      if (this.range && this.rangeStart && !this.rangeEnd) {
        this.hoverDate = dayObj.date;
      }
    },

    onDayLeave() {
      this.hoverDate = null;
    },

    // Format date as YYYY-MM-DD
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };
}

// ========================================
// Datetime Picker Component
// ========================================
function uxDatetime(options = {}) {
  return {
    isOpen: false,
    date: options.date || null,
    time: options.time || null,
    showTime: options.showTime !== false,

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    toggle() {
      this.isOpen = !this.isOpen;
    },

    setDate(date) {
      this.date = date;
      this.$dispatch('change', { date: this.date, time: this.time });
    },

    setTime(time) {
      this.time = time;
      this.$dispatch('change', { date: this.date, time: this.time });
    },

    get formattedValue() {
      if (!this.date) return '';
      let str = this.date.toLocaleDateString();
      if (this.showTime && this.time) {
        str += ' ' + this.time;
      }
      return str;
    }
  };
}

// ========================================
// Segment Component
// ========================================
function uxSegment(options = {}) {
  return {
    selected: options.selected || 0,

    isSelected(index) {
      return this.selected === index;
    },

    select(index) {
      this.selected = index;
      this.$dispatch('change', index);
    }
  };
}

// ========================================
// File Upload Component
// ========================================
function uxUpload(options = {}) {
  return {
    files: [],
    multiple: options.multiple || false,
    accept: options.accept || '*',
    maxSize: options.maxSize || 10 * 1024 * 1024, // 10MB default
    isDragging: false,

    handleDrop(event) {
      this.isDragging = false;
      const files = Array.from(event.dataTransfer.files);
      this.addFiles(files);
    },

    handleSelect(event) {
      const files = Array.from(event.target.files);
      this.addFiles(files);
    },

    addFiles(newFiles) {
      const validFiles = newFiles.filter(f => f.size <= this.maxSize);
      if (this.multiple) {
        this.files = [...this.files, ...validFiles];
      } else {
        this.files = validFiles.slice(0, 1);
      }
      this.$dispatch('change', this.files);
    },

    removeFile(index) {
      this.files = this.files.filter((_, i) => i !== index);
      this.$dispatch('change', this.files);
    },

    clear() {
      this.files = [];
      this.$dispatch('change', this.files);
    }
  };
}

// ========================================
// Search Component
// ========================================
function uxSearch(options = {}) {
  return {
    query: options.query || '',
    results: [],
    isLoading: false,
    isOpen: false,
    debounceMs: options.debounce || 300,
    _timeout: null,

    handleInput() {
      clearTimeout(this._timeout);
      if (this.query.length < 2) {
        this.results = [];
        this.isOpen = false;
        return;
      }

      this._timeout = setTimeout(() => {
        this.$dispatch('search', this.query);
      }, this.debounceMs);
    },

    setResults(results) {
      this.results = results;
      this.isOpen = results.length > 0;
      this.isLoading = false;
    },

    select(result) {
      this.$dispatch('select', result);
      this.isOpen = false;
    },

    clear() {
      this.query = '';
      this.results = [];
      this.isOpen = false;
    }
  };
}

// ========================================
// Notification Component
// ========================================
function uxNotification(options = {}) {
  return {
    notifications: [],
    maxVisible: options.maxVisible || 5,

    add(notification) {
      const id = Date.now();
      const item = {
        id,
        title: notification.title || '',
        message: notification.message || '',
        type: notification.type || 'info',
        duration: notification.duration || 5000,
        dismissible: notification.dismissible !== false
      };

      this.notifications.unshift(item);

      if (this.notifications.length > this.maxVisible) {
        this.notifications.pop();
      }

      if (item.duration > 0) {
        setTimeout(() => this.dismiss(id), item.duration);
      }

      return id;
    },

    dismiss(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },

    clear() {
      this.notifications = [];
    }
  };
}

// ========================================
// Progress Component
// ========================================
function uxProgress(options = {}) {
  return {
    value: options.value || 0,
    max: options.max || 100,
    animated: options.animated || false,

    get percentage() {
      return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    },

    setValue(val) {
      this.value = Math.min(this.max, Math.max(0, val));
    },

    increment(amount = 1) {
      this.setValue(this.value + amount);
    }
  };
}

// ========================================
// Pagination Component
// ========================================
function uxPagination(options = {}) {
  return {
    currentPage: options.currentPage || 1,
    totalPages: options.totalPages || 1,
    visiblePages: options.visiblePages || 5,

    get pages() {
      const pages = [];
      let start = Math.max(1, this.currentPage - Math.floor(this.visiblePages / 2));
      let end = Math.min(this.totalPages, start + this.visiblePages - 1);

      if (end - start + 1 < this.visiblePages) {
        start = Math.max(1, end - this.visiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },

    goTo(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$dispatch('change', page);
      }
    },

    next() {
      this.goTo(this.currentPage + 1);
    },

    prev() {
      this.goTo(this.currentPage - 1);
    },

    get canPrev() {
      return this.currentPage > 1;
    },

    get canNext() {
      return this.currentPage < this.totalPages;
    }
  };
}

// ========================================
// Tag Input Component
// ========================================
function uxTagInput(options = {}) {
  return {
    tags: options.tags || [],
    inputValue: '',
    maxTags: options.maxTags || Infinity,

    addTag(value) {
      const tag = (value || this.inputValue).trim();
      if (tag && !this.tags.includes(tag) && this.tags.length < this.maxTags) {
        this.tags.push(tag);
        this.inputValue = '';
        this.$dispatch('change', this.tags);
      }
    },

    removeTag(index) {
      this.tags.splice(index, 1);
      this.$dispatch('change', this.tags);
    },

    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        this.addTag();
      } else if (event.key === 'Backspace' && !this.inputValue && this.tags.length) {
        this.removeTag(this.tags.length - 1);
      }
    }
  };
}

// ========================================
// Range/Slider Component
// ========================================
function uxRange(options = {}) {
  return {
    value: options.value || 0,
    min: options.min || 0,
    max: options.max || 100,
    step: options.step || 1,
    disabled: options.disabled || false,

    get percent() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },

    setValue(val) {
      this.value = Math.min(this.max, Math.max(this.min, Number(val)));
      this.$dispatch('change', { value: this.value, percent: this.percent });
    },

    increment() {
      this.setValue(this.value + this.step);
    },

    decrement() {
      this.setValue(this.value - this.step);
    }
  };
}

// ========================================
// Autocomplete Component
// ========================================
function uxAutocomplete(options = {}) {
  return {
    query: options.value || '',
    items: options.items || [],
    filteredItems: [],
    isOpen: false,
    selectedIndex: -1,
    minChars: options.minChars || 1,
    placeholder: options.placeholder || 'Search...',
    emptyText: options.emptyText || 'No results found',

    init() {
      this.filteredItems = this.items;
    },

    onInput() {
      if (this.query.length >= this.minChars) {
        this.filteredItems = this.items.filter(item => {
          const label = typeof item === 'string' ? item : item.label || item.name || '';
          return label.toLowerCase().includes(this.query.toLowerCase());
        });
        this.isOpen = this.filteredItems.length > 0;
        this.selectedIndex = -1;
      } else {
        this.isOpen = false;
        this.filteredItems = [];
      }
      this.$dispatch('input', { query: this.query });
    },

    onKeyDown(event) {
      if (!this.isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredItems.length - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (this.selectedIndex >= 0) {
            this.select(this.filteredItems[this.selectedIndex]);
          }
          break;
        case 'Escape':
          this.isOpen = false;
          break;
      }
    },

    select(item) {
      this.query = typeof item === 'string' ? item : item.label || item.name || '';
      this.isOpen = false;
      this.selectedIndex = -1;
      this.$dispatch('select', { item });
    },

    clear() {
      this.query = '';
      this.isOpen = false;
      this.filteredItems = [];
      this.$dispatch('clear');
    }
  };
}

// ========================================
// OTP Input Component
// ========================================
function uxOtpInput(options = {}) {
  return {
    length: options.length || 6,
    values: Array(options.length || 6).fill(''),
    type: options.type || 'number',
    disabled: options.disabled || false,
    focusedIndex: -1,
    current: '',

    get isComplete() {
      return this.values.every(v => v !== '') && this.values.length === this.length;
    },

    onInput(index, event) {
      let value = event.target.value;

      // For number type, only allow digits
      if (this.type === 'number') {
        value = value.replace(/[^0-9]/g, '');
      }

      // Take only the last character
      value = value.slice(-1);
      this.values[index] = value;
      this.current = this.values.join('');

      // Dispatch change event
      this.$dispatch('otp:change', { value: this.current, index });

      // Auto-focus next field
      if (value && index < this.length - 1) {
        const nextInput = this.$el.querySelectorAll('.ux-otp__field')[index + 1];
        if (nextInput) nextInput.focus();
      }

      // Check if complete
      if (this.isComplete) {
        this.$dispatch('otp:complete', { value: this.current });
      }
    },

    onKeyDown(index, event) {
      // Backspace: move to previous field if current is empty
      if (event.key === 'Backspace' && !this.values[index] && index > 0) {
        const prevInput = this.$el.querySelectorAll('.ux-otp__field')[index - 1];
        if (prevInput) prevInput.focus();
      }

      // Arrow keys navigation
      if (event.key === 'ArrowLeft' && index > 0) {
        const prevInput = this.$el.querySelectorAll('.ux-otp__field')[index - 1];
        if (prevInput) prevInput.focus();
      }

      if (event.key === 'ArrowRight' && index < this.length - 1) {
        const nextInput = this.$el.querySelectorAll('.ux-otp__field')[index + 1];
        if (nextInput) nextInput.focus();
      }
    },

    onPaste(index, event) {
      event.preventDefault();
      const pastedData = (event.clipboardData || window.clipboardData).getData('text');
      let chars = pastedData.split('');

      if (this.type === 'number') {
        chars = chars.filter(c => /[0-9]/.test(c));
      }

      // Fill from current index
      for (let i = 0; i < chars.length && index + i < this.length; i++) {
        this.values[index + i] = chars[i];
      }

      this.current = this.values.join('');

      // Focus the next empty field or the last field
      const nextEmptyIndex = this.values.findIndex((v, i) => i >= index && !v);
      const focusIndex = nextEmptyIndex >= 0 ? nextEmptyIndex : Math.min(index + chars.length, this.length - 1);
      const targetInput = this.$el.querySelectorAll('.ux-otp__field')[focusIndex];
      if (targetInput) targetInput.focus();

      this.$dispatch('otp:change', { value: this.current });

      if (this.isComplete) {
        this.$dispatch('otp:complete', { value: this.current });
      }
    },

    onFocus(index) {
      this.focusedIndex = index;
    },

    onBlur() {
      this.focusedIndex = -1;
    },

    clear() {
      this.values = Array(this.length).fill('');
      this.current = '';
      const firstInput = this.$el.querySelectorAll('.ux-otp__field')[0];
      if (firstInput) firstInput.focus();
    }
  };
}

// ========================================
// Color Picker Component
// ========================================
function uxColorPicker(options = {}) {
  return {
    isOpen: false,
    color: options.color || '#000000',
    presets: options.presets || [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
    ],

    toggle() {
      this.isOpen = !this.isOpen;
    },

    setColor(color) {
      this.color = color;
      this.$dispatch('change', color);
    },

    close() {
      this.isOpen = false;
    }
  };
}

// ========================================
// Signature Pad Component
// ========================================
function uxSignaturePad(options = {}) {
  return {
    canvas: null,
    ctx: null,
    isDrawing: false,
    isEmpty: true,

    init() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.strokeStyle = options.color || '#000';
      this.ctx.lineWidth = options.lineWidth || 2;
      this.ctx.lineCap = 'round';
    },

    startDrawing(event) {
      this.isDrawing = true;
      this.isEmpty = false;
      const { x, y } = this.getPosition(event);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    },

    draw(event) {
      if (!this.isDrawing) return;
      const { x, y } = this.getPosition(event);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    },

    stopDrawing() {
      this.isDrawing = false;
    },

    getPosition(event) {
      const rect = this.canvas.getBoundingClientRect();
      const e = event.touches ? event.touches[0] : event;
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    },

    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.isEmpty = true;
    },

    toDataURL() {
      return this.canvas.toDataURL();
    }
  };
}

// ========================================
// Phone Input Component
// ========================================
function uxPhoneInput(options = {}) {
  return {
    value: options.value || '',
    countryCode: options.countryCode || '+1',

    formatPhone(input) {
      const digits = input.replace(/\D/g, '');
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    },

    handleInput(event) {
      this.value = this.formatPhone(event.target.value);
    },

    get fullNumber() {
      return this.countryCode + this.value.replace(/\D/g, '');
    }
  };
}

// ========================================
// Virtual Keyboard Component
// ========================================
function uxVirtualKeyboard(options = {}) {
  return {
    isOpen: false,
    targetInput: null,
    layout: options.layout || 'qwerty',
    shift: false,

    open(input) {
      this.targetInput = input;
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
      this.targetInput = null;
    },

    press(key) {
      if (!this.targetInput) return;

      if (key === 'backspace') {
        this.targetInput.value = this.targetInput.value.slice(0, -1);
      } else if (key === 'space') {
        this.targetInput.value += ' ';
      } else if (key === 'shift') {
        this.shift = !this.shift;
      } else if (key === 'enter') {
        this.close();
      } else {
        this.targetInput.value += this.shift ? key.toUpperCase() : key;
        this.shift = false;
      }

      this.targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
}

// ========================================
// Gauge Component
// ========================================
function uxGauge(options = {}) {
  return {
    // Configuration
    value: options.value || 0,
    min: options.min || 0,
    max: options.max || 100,
    size: options.size || 180,
    strokeWidth: options.strokeWidth || 12,
    startAngle: options.startAngle || -135,
    endAngle: options.endAngle || 135,
    unit: options.unit || '',
    label: options.label || '',
    showValue: options.showValue !== false,
    showLabels: options.showLabels !== false,
    showNeedle: options.showNeedle || false,
    showTicks: options.showTicks || false,
    tickCount: options.tickCount || 10,
    animated: options.animated !== false,
    decimals: options.decimals || 0,

    // Computed: percentage (0-100)
    get percentage() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },

    // Computed: normalized value (within min/max)
    get normalizedValue() {
      return Math.min(this.max, Math.max(this.min, this.value));
    },

    // Computed: display value (formatted)
    get displayValue() {
      return this.normalizedValue.toFixed(this.decimals);
    },

    // Computed: center point
    get center() {
      return this.size / 2;
    },

    // Computed: radius
    get radius() {
      return (this.size - this.strokeWidth) / 2 - 10;
    },

    // Computed: arc path for SVG
    get arcPath() {
      const startRad = (this.startAngle * Math.PI) / 180;
      const endRad = (this.endAngle * Math.PI) / 180;
      const cx = this.center;
      const cy = this.center;
      const r = this.radius;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArcFlag = Math.abs(this.endAngle - this.startAngle) > 180 ? 1 : 0;

      return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    },

    // Computed: circumference of the arc
    get circumference() {
      const angleRange = Math.abs(this.endAngle - this.startAngle);
      return (2 * Math.PI * this.radius * angleRange) / 360;
    },

    // Computed: dash offset for progress
    get dashOffset() {
      return this.circumference * (1 - this.percentage / 100);
    },

    // Computed: needle angle
    get needleAngle() {
      const angleRange = this.endAngle - this.startAngle;
      return this.startAngle + (this.percentage / 100) * angleRange;
    },

    // Computed: needle path
    get needlePath() {
      const needleLength = this.radius - 10;
      return `M 0 -6 L ${needleLength} 0 L 0 6 Z`;
    },

    // Computed: value container positioning
    get valueContainerStyle() {
      return {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '15%',
        textAlign: 'center'
      };
    },

    // Methods
    setValue(val) {
      const oldValue = this.value;
      this.value = Math.min(this.max, Math.max(this.min, Number(val)));
      if (oldValue !== this.value) {
        this.$dispatch('gauge:change', { value: this.value, percentage: this.percentage });
      }
    },

    increment(amount = 1) {
      this.setValue(this.value + amount);
    },

    decrement(amount = 1) {
      this.setValue(this.value - amount);
    },

    // Legacy compatibility
    get rotation() {
      return -90 + (this.percentage * 1.8);
    }
  };
}

// ========================================
// Timer Component
// ========================================
function uxTimer(options = {}) {
  return {
    seconds: options.seconds || 0,
    isRunning: false,
    _interval: null,

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this._interval = setInterval(() => {
        this.seconds++;
      }, 1000);
    },

    stop() {
      this.isRunning = false;
      clearInterval(this._interval);
    },

    reset() {
      this.stop();
      this.seconds = 0;
    },

    toggle() {
      this.isRunning ? this.stop() : this.start();
    },

    get formatted() {
      const mins = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };
}

// ========================================
// Fullscreen Modal Component
// ========================================
function uxFullscreenModal(options = {}) {
  return {
    isOpen: false,
    loading: options.loading || false,
    closeOnEscape: options.closeOnEscape !== false,
    showBackdrop: options.showBackdrop || false,
    totalSteps: options.totalSteps || 0,
    currentStep: options.currentStep || 0,

    init() {
      if (this.closeOnEscape) {
        this._escHandler = (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        };
        document.addEventListener('keydown', this._escHandler);
      }
    },

    destroy() {
      if (this._escHandler) {
        document.removeEventListener('keydown', this._escHandler);
      }
    },

    open() {
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      this.$dispatch('fullscreenmodal:open');
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
      this.$dispatch('fullscreenmodal:close');
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    setLoading(state) {
      this.loading = state;
    },

    // Step navigation
    nextStep() {
      if (this.currentStep < this.totalSteps - 1) {
        this.currentStep++;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    goToStep(step) {
      if (step >= 0 && step < this.totalSteps) {
        this.currentStep = step;
        this.$dispatch('fullscreenmodal:stepchange', { step: this.currentStep });
      }
    },

    isStepActive(step) {
      return this.currentStep === step;
    },

    isStepCompleted(step) {
      return step < this.currentStep;
    }
  };
}

// ========================================
// Countdown Component
// ========================================
function uxCountdown(options = {}) {
  return {
    targetDate: options.targetDate ? new Date(options.targetDate) : null,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    _interval: null,

    init() {
      this.update();
      this._interval = setInterval(() => this.update(), 1000);
    },

    update() {
      if (!this.targetDate) return;

      const now = new Date();
      const diff = this.targetDate - now;

      if (diff <= 0) {
        this.days = this.hours = this.minutes = this.seconds = 0;
        clearInterval(this._interval);
        this.$dispatch('complete');
        return;
      }

      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },

    destroy() {
      clearInterval(this._interval);
    }
  };
}

// ========================================
// Toast Manager Component (Global)
// ========================================
function uxToastManager(options = {}) {
  return {
    toasts: [],
    position: options.position || 'bottom-center',
    duration: options.duration || 3000,
    maxToasts: options.maxToasts || 5,

    init() {
      // Listen for global toast events
      window.addEventListener('ux:toast', (e) => {
        this.show(e.detail.message, e.detail.type || 'info', e.detail.duration);
      });
    },

    show(message, type = 'info', duration = null) {
      const id = Date.now() + Math.random();
      const toast = {
        id,
        message,
        type,
        visible: true
      };

      this.toasts.push(toast);

      // Limit max toasts
      if (this.toasts.length > this.maxToasts) {
        this.toasts.shift();
      }

      // Auto dismiss
      setTimeout(() => {
        this.dismiss(id);
      }, duration || this.duration);

      return id;
    },

    dismiss(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts[index].visible = false;
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== id);
        }, 300);
      }
    },

    success(message, duration) {
      return this.show(message, 'success', duration);
    },

    error(message, duration) {
      return this.show(message, 'error', duration);
    },

    warning(message, duration) {
      return this.show(message, 'warning', duration);
    },

    info(message, duration) {
      return this.show(message, 'info', duration);
    },

    clear() {
      this.toasts = [];
    },

    get positionClasses() {
      const positions = {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4'
      };
      return positions[this.position] || positions['bottom-center'];
    }
  };
}

// ========================================
// Multi Select Component
// ========================================
function uxMultiSelect(options = {}) {
  return {
    isOpen: false,
    query: '',
    options: options.options || [],
    selectedOptions: options.selected || [],
    placeholder: options.placeholder || 'Select options...',
    maxSelections: options.maxSelections || Infinity,
    searchable: options.searchable !== false,
    emptyText: options.emptyText || 'No options available',

    // Alias for selectedOptions (used by some partials)
    get values() {
      return this.selectedOptions;
    },
    set values(val) {
      this.selectedOptions = val;
    },

    get filteredOptions() {
      if (!this.query) return this.options;
      return this.options.filter(opt => {
        const label = typeof opt === 'string' ? opt : opt.label || opt.name || '';
        return label.toLowerCase().includes(this.query.toLowerCase());
      });
    },

    get displayValue() {
      if (this.selectedOptions.length === 0) return '';
      if (this.selectedOptions.length === 1) {
        const opt = this.selectedOptions[0];
        return typeof opt === 'string' ? opt : opt.label || opt.name || '';
      }
      return `${this.selectedOptions.length} selected`;
    },

    get hasValue() {
      return this.selectedOptions.length > 0;
    },

    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          const input = this.$el.querySelector('input');
          if (input) input.focus();
        });
      }
    },

    close() {
      this.isOpen = false;
      this.query = '';
    },

    isSelected(option) {
      const value = typeof option === 'string' ? option : option.value || option.id;
      return this.selectedOptions.some(o => {
        const oValue = typeof o === 'string' ? o : o.value || o.id;
        return oValue === value;
      });
    },

    toggleOption(option) {
      if (this.isSelected(option)) {
        this.removeOption(option);
      } else if (this.selectedOptions.length < this.maxSelections) {
        this.selectedOptions.push(option);
        this.$dispatch('change', { selected: this.selectedOptions });
      }
    },

    removeOption(option) {
      const value = typeof option === 'string' ? option : option.value || option.id;
      this.selectedOptions = this.selectedOptions.filter(o => {
        const oValue = typeof o === 'string' ? o : o.value || o.id;
        return oValue !== value;
      });
      this.$dispatch('change', { selected: this.selectedOptions });
    },

    clear() {
      this.selectedOptions = [];
      this.$dispatch('change', { selected: [] });
    },

    getLabel(option) {
      return typeof option === 'string' ? option : option.label || option.name || '';
    }
  };
}

// ========================================
// Search Select Component
// ========================================
function uxSearchSelect(options = {}) {
  return {
    isOpen: false,
    query: '',
    value: options.value || null,
    options: options.options || [],
    placeholder: options.placeholder || 'Search...',
    emptyMessage: options.emptyMessage || 'No results found',
    emptyText: options.emptyText || options.emptyMessage || 'No results found',
    minChars: options.minChars || 0,

    get filteredOptions() {
      if (!this.query && this.minChars > 0) return [];
      if (!this.query) return this.options;
      return this.options.filter(opt => {
        const label = typeof opt === 'string' ? opt : opt.label || opt.name || '';
        return label.toLowerCase().includes(this.query.toLowerCase());
      });
    },

    get displayValue() {
      if (!this.value) return '';
      const selected = this.options.find(o => {
        const oValue = typeof o === 'string' ? o : o.value || o.id;
        return oValue === this.value;
      });
      if (!selected) return '';
      return typeof selected === 'string' ? selected : selected.label || selected.name || '';
    },

    get hasValue() {
      return this.value !== null && this.value !== undefined && this.value !== '';
    },

    get shouldShowDropdown() {
      return this.isOpen && (this.query.length >= this.minChars || this.filteredOptions.length > 0);
    },

    open() {
      this.isOpen = true;
      this.$nextTick(() => {
        const input = this.$el.querySelector('input');
        if (input) input.focus();
      });
    },

    close() {
      this.isOpen = false;
      // Reset query to display value when closing
      if (this.value) {
        this.query = this.displayValue;
      }
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    select(option) {
      const value = typeof option === 'string' ? option : option.value || option.id;
      this.value = value;
      this.query = this.getLabel(option);
      this.isOpen = false;
      this.$dispatch('change', { value, option });
    },

    clear() {
      this.value = null;
      this.query = '';
      this.$dispatch('change', { value: null });
    },

    onInput() {
      this.isOpen = true;
      if (!this.query) {
        this.value = null;
      }
    },

    onFocus() {
      this.isOpen = true;
      // Select all text for easy replacement
      this.$nextTick(() => {
        const input = this.$el.querySelector('input');
        if (input) input.select();
      });
    },

    getLabel(option) {
      return typeof option === 'string' ? option : option.label || option.name || '';
    },

    getValue(option) {
      return typeof option === 'string' ? option : option.value || option.id;
    }
  };
}

// ========================================
// Split Button Component
// ========================================
function uxSplitButton(options = {}) {
  return {
    isOpen: false,
    disabled: options.disabled || false,

    init() {
      // Close on click outside
      this._clickOutsideHandler = (e) => {
        if (this.isOpen && !this.$el.contains(e.target)) {
          this.close();
        }
      };
      document.addEventListener('click', this._clickOutsideHandler);

      // Close on Escape key
      this._escapeHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._escapeHandler);
    },

    destroy() {
      if (this._clickOutsideHandler) {
        document.removeEventListener('click', this._clickOutsideHandler);
      }
      if (this._escapeHandler) {
        document.removeEventListener('keydown', this._escapeHandler);
      }
    },

    get containerClasses() {
      return {
        'ux-split-button--open': this.isOpen,
        'ux-split-button--disabled': this.disabled
      };
    },

    toggle() {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
      }
    },

    open() {
      if (!this.disabled) {
        this.isOpen = true;
      }
    },

    close() {
      this.isOpen = false;
    },

    select(action) {
      this.close();
      this.$dispatch('select', { action });
    }
  };
}

// ========================================
// Enhanced Calendar Component (with more features)
// ========================================
function uxCalendarFull(options = {}) {
  const now = new Date();
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  return {
    currentMonth: options.month ?? now.getMonth(),
    currentYear: options.year ?? now.getFullYear(),
    selectedDate: options.selectedDate || null,
    rangeStart: options.rangeStart || null,
    rangeEnd: options.rangeEnd || null,
    selectionMode: options.selectionMode || 'single', // 'single', 'range', 'multiple'
    multipleSelections: [],
    minDate: options.minDate || null,
    maxDate: options.maxDate || null,

    // Icons for navigation
    icons: {
      prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>',
      next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>'
    },

    get weekdays() {
      return weekdayNames;
    },

    get currentMonthYear() {
      return `${monthNames[this.currentMonth]} ${this.currentYear}`;
    },

    get daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },

    get firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },

    get calendarDays() {
      const days = [];
      const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

      // Previous month days
      for (let i = this.firstDayOfMonth - 1; i >= 0; i--) {
        days.push({
          day: daysInPrevMonth - i,
          currentMonth: false,
          date: new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i)
        });
      }

      // Current month days
      for (let i = 1; i <= this.daysInMonth; i++) {
        days.push({
          day: i,
          currentMonth: true,
          date: new Date(this.currentYear, this.currentMonth, i)
        });
      }

      // Next month days to fill the grid
      const remainingDays = 42 - days.length; // 6 rows * 7 days
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          day: i,
          currentMonth: false,
          date: new Date(this.currentYear, this.currentMonth + 1, i)
        });
      }

      return days;
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.$dispatch('monthchange', { month: this.currentMonth, year: this.currentYear });
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.$dispatch('monthchange', { month: this.currentMonth, year: this.currentYear });
    },

    goToToday() {
      const today = new Date();
      this.currentMonth = today.getMonth();
      this.currentYear = today.getFullYear();
    },

    selectDate(dayObj) {
      if (!dayObj.currentMonth) {
        // Navigate to that month
        this.currentMonth = dayObj.date.getMonth();
        this.currentYear = dayObj.date.getFullYear();
      }

      if (this.selectionMode === 'single') {
        this.selectedDate = dayObj.date;
        this.$dispatch('select', { date: this.selectedDate });
      } else if (this.selectionMode === 'range') {
        if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
          this.rangeStart = dayObj.date;
          this.rangeEnd = null;
        } else {
          if (dayObj.date < this.rangeStart) {
            this.rangeEnd = this.rangeStart;
            this.rangeStart = dayObj.date;
          } else {
            this.rangeEnd = dayObj.date;
          }
          this.$dispatch('rangeselect', { start: this.rangeStart, end: this.rangeEnd });
        }
      }
    },

    isSelected(dayObj) {
      if (!this.selectedDate) return false;
      return this.isSameDay(dayObj.date, this.selectedDate);
    },

    isToday(dayObj) {
      return this.isSameDay(dayObj.date, new Date());
    },

    isInRange(dayObj) {
      if (!this.rangeStart || !this.rangeEnd) return false;
      return dayObj.date >= this.rangeStart && dayObj.date <= this.rangeEnd;
    },

    isRangeStart(dayObj) {
      if (!this.rangeStart) return false;
      return this.isSameDay(dayObj.date, this.rangeStart);
    },

    isRangeEnd(dayObj) {
      if (!this.rangeEnd) return false;
      return this.isSameDay(dayObj.date, this.rangeEnd);
    },

    isDisabled(dayObj) {
      if (this.minDate && dayObj.date < this.minDate) return true;
      if (this.maxDate && dayObj.date > this.maxDate) return true;
      return false;
    },

    isSameDay(date1, date2) {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear();
    },

    formatDate(date, format = 'short') {
      if (!date) return '';
      if (format === 'short') {
        return date.toLocaleDateString();
      }
      return date.toLocaleDateString('default', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };
}

// ========================================
// Calendar View Component (Week/Day)
// ========================================
function uxCalendarView(options = {}) {
  return {
    view: options.view || 'week',
    currentDate: options.initialDate ? new Date(options.initialDate) : new Date(),
    events: options.events || [],
    startHour: options.startHour ?? 0,
    endHour: options.endHour ?? 24,
    hourHeight: options.hourHeight || 60,

    icons: {
      chevronLeft: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>',
      chevronRight: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'
    },

    dayNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNamesLong: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

    get title() {
      if (this.view === 'day') {
        return `${this.dayNamesLong[this.currentDate.getDay()]}, ${this.currentDate.getDate()} de ${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
      }
      const weekStart = this.getWeekStart(this.currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${this.monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
      }
      return `${this.monthNames[weekStart.getMonth()]} - ${this.monthNames[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
    },

    get hours() {
      const hrs = [];
      for (let i = this.startHour; i < this.endHour; i++) {
        hrs.push({
          value: i,
          label: `${i.toString().padStart(2, '0')}:00`
        });
      }
      return hrs;
    },

    get weekDays() {
      const weekStart = this.getWeekStart(this.currentDate);
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        days.push({
          date: date,
          name: this.dayNames[date.getDay()],
          number: date.getDate(),
          isToday: this.isToday(date)
        });
      }
      return days;
    },

    get nowLineTop() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = (hours - this.startHour) * 60 + minutes;
      return (totalMinutes / 60) * this.hourHeight;
    },

    getWeekStart(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      d.setHours(0, 0, 0, 0);
      return d;
    },

    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    },

    shouldShowNowLine(date) {
      return this.isToday(date);
    },

    prev() {
      if (this.view === 'day') {
        this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 1));
      } else {
        this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 7));
      }
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    next() {
      if (this.view === 'day') {
        this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1));
      } else {
        this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 7));
      }
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    goToToday() {
      this.currentDate = new Date();
      this.$dispatch('calendar:navigate', { date: this.currentDate, view: this.view });
    },

    setView(newView) {
      this.view = newView;
      this.$dispatch('calendar:viewchange', { view: newView });
    },

    selectDay(date) {
      this.currentDate = new Date(date);
      this.view = 'day';
      this.$dispatch('calendar:dayselect', { date: this.currentDate });
    },

    getEventsForDay(date) {
      return this.events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === date.getDate() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getFullYear() === date.getFullYear();
      });
    },

    getEventStyle(event) {
      const start = new Date(event.start);
      const end = new Date(event.end);
      const startMinutes = (start.getHours() - this.startHour) * 60 + start.getMinutes();
      const endMinutes = (end.getHours() - this.startHour) * 60 + end.getMinutes();
      const top = (startMinutes / 60) * this.hourHeight;
      const height = ((endMinutes - startMinutes) / 60) * this.hourHeight;

      return {
        top: top + 'px',
        height: Math.max(height, 20) + 'px'
      };
    },

    formatTime(date) {
      const d = new Date(date);
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    },

    onEventClick(event) {
      this.$dispatch('calendar:eventclick', { event });
    },

    addEvent(event) {
      this.events.push(event);
      this.$dispatch('calendar:eventadd', { event });
    },

    removeEvent(id) {
      const index = this.events.findIndex(e => e.id === id);
      if (index !== -1) {
        const event = this.events[index];
        this.events.splice(index, 1);
        this.$dispatch('calendar:eventremove', { event });
      }
    },

    setEvents(events) {
      this.events = events;
    }
  };
}

// ========================================
// Datatable Component
// ========================================
function uxDatatable(options = {}) {
  return {
    columns: options.columns || [],
    rows: options.rows || [],
    originalRows: options.rows || [],
    currentPage: 1,
    perPage: options.perPage || 10,
    searchQuery: '',
    sortColumn: options.sortColumn || null,
    sortDirection: options.sortDirection || 'asc',
    selectedRows: [],
    selectable: options.selectable || false,
    paginated: options.paginated !== false,
    searchPlaceholder: options.searchPlaceholder || 'Buscar...',
    emptyTitle: options.emptyTitle || 'Sin datos',
    emptyText: options.emptyText || 'No hay registros que mostrar',
    viewMode: options.viewMode || 'table',
    showViewToggle: options.showViewToggle !== false,

    labels: {
      showing: options.labels?.showing || 'Mostrando',
      to: options.labels?.to || 'a',
      of: options.labels?.of || 'de',
      entries: options.labels?.entries || 'registros',
      perPage: options.labels?.perPage || 'por pagina',
      viewTable: options.labels?.viewTable || 'Vista tabla',
      viewCards: options.labels?.viewCards || 'Vista tarjetas'
    },

    get viewModeClass() {
      return this.viewMode === 'cards' ? 'ux-datatable--cards' : '';
    },

    get filteredRows() {
      if (!this.searchQuery) return this.originalRows;

      const query = this.searchQuery.toLowerCase();
      return this.originalRows.filter(row => {
        return this.columns.some(col => {
          const value = row[col.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(query);
        });
      });
    },

    get sortedRows() {
      if (!this.sortColumn) return this.filteredRows;

      const col = this.columns.find(c => c.key === this.sortColumn);
      if (!col) return this.filteredRows;

      return [...this.filteredRows].sort((a, b) => {
        let valA = a[this.sortColumn];
        let valB = b[this.sortColumn];

        if (col.type === 'number') {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        } else if (col.type === 'date') {
          valA = new Date(valA);
          valB = new Date(valB);
        } else {
          valA = String(valA || '').toLowerCase();
          valB = String(valB || '').toLowerCase();
        }

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    },

    get paginatedRows() {
      if (!this.paginated) return this.sortedRows;

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedRows.slice(start, end);
    },

    get totalPages() {
      return Math.ceil(this.sortedRows.length / this.perPage);
    },

    get showingInfo() {
      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(this.currentPage * this.perPage, this.sortedRows.length);
      return `${this.labels.showing} ${start} ${this.labels.to} ${end} ${this.labels.of} ${this.sortedRows.length} ${this.labels.entries}`;
    },

    get visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        if (current > 3) pages.push('...');

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) pages.push(i);

        if (current < total - 2) pages.push('...');
        pages.push(total);
      }

      return pages;
    },

    get ariaAttrs() {
      return {
        'role': 'table',
        'aria-rowcount': this.sortedRows.length
      };
    },

    get allSelected() {
      return this.selectedRows.length === this.paginatedRows.length && this.paginatedRows.length > 0;
    },

    sortBy(col) {
      if (!col.sortable) return;

      if (this.sortColumn === col.key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = col.key;
        this.sortDirection = 'asc';
      }

      this.$dispatch('sort', { column: col.key, direction: this.sortDirection });
    },

    isSorted(col) {
      return this.sortColumn === col.key;
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$dispatch('pagechange', { page });
      }
    },

    onSearch() {
      this.currentPage = 1;
      this.$dispatch('search', { query: this.searchQuery });
    },

    setViewMode(mode) {
      this.viewMode = mode;
      this.$dispatch('viewmodechange', { mode });
    },

    getRowId(row) {
      return row.id || row._id || JSON.stringify(row);
    },

    formatCellValue(row, col) {
      const value = row[col.key];
      if (col.format && typeof col.format === 'function') {
        return col.format(value, row);
      }
      return value;
    },

    getIcon(name) {
      const icons = {
        empty: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"/></svg>'
      };
      return icons[name] || '';
    },

    toggleRowSelection(row) {
      const id = this.getRowId(row);
      const index = this.selectedRows.findIndex(r => this.getRowId(r) === id);

      if (index === -1) {
        this.selectedRows.push(row);
      } else {
        this.selectedRows.splice(index, 1);
      }

      this.$dispatch('selectionchange', { selected: this.selectedRows });
    },

    toggleAllSelection() {
      if (this.allSelected) {
        this.selectedRows = [];
      } else {
        this.selectedRows = [...this.paginatedRows];
      }
      this.$dispatch('selectionchange', { selected: this.selectedRows });
    },

    isRowSelected(row) {
      const id = this.getRowId(row);
      return this.selectedRows.some(r => this.getRowId(r) === id);
    },

    clearSelection() {
      this.selectedRows = [];
      this.$dispatch('selectionchange', { selected: [] });
    },

    setData(rows) {
      this.originalRows = rows;
      this.rows = rows;
      this.currentPage = 1;
    }
  };
}

// ========================================
// Additional Missing Components
// ========================================

// Progress Circle Component
function uxProgressCircle(options = {}) {
  return {
    value: options.value || 0,
    max: options.max || 100,
    size: options.size || 120,
    strokeWidth: options.strokeWidth || 8,
    showValue: options.showValue !== false,
    animated: options.animated !== false,

    get percentage() {
      return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    },

    get radius() {
      return (this.size - this.strokeWidth) / 2;
    },

    get circumference() {
      return 2 * Math.PI * this.radius;
    },

    get dashOffset() {
      return this.circumference - (this.percentage / 100) * this.circumference;
    },

    get viewBox() {
      return `0 0 ${this.size} ${this.size}`;
    },

    get center() {
      return this.size / 2;
    },

    setValue(val) {
      this.value = Math.min(this.max, Math.max(0, val));
    }
  };
}

// Progress Steps Component
function uxProgressSteps(options = {}) {
  return {
    currentStep: options.currentStep || 1,
    steps: options.steps || [],
    vertical: options.vertical || false,

    isCompleted(index) {
      return index < this.currentStep;
    },

    isCurrent(index) {
      return index === this.currentStep - 1;
    },

    isActive(index) {
      return index <= this.currentStep - 1;
    },

    goToStep(index) {
      this.currentStep = index + 1;
      this.$dispatch('stepchange', { step: this.currentStep });
    },

    next() {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
        this.$dispatch('stepchange', { step: this.currentStep });
      }
    },

    prev() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.$dispatch('stepchange', { step: this.currentStep });
      }
    }
  };
}

// QR Code Component
function uxQRCode(options = {}) {
  return {
    value: options.value || '',
    size: options.size || 200,
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
    dark: options.dark || '#000000',
    light: options.light || '#ffffff',

    init() {
      this.render();
    },

    render() {
      // QR code rendering is typically done by an external library
      // This provides the data and configuration
      this.$dispatch('render', {
        value: this.value,
        size: this.size,
        errorCorrectionLevel: this.errorCorrectionLevel
      });
    },

    setValue(val) {
      this.value = val;
      this.render();
    }
  };
}

// Numpad Component
function uxNumpad(options = {}) {
  return {
    value: options.value || '',
    maxLength: options.maxLength || 10,
    decimal: options.decimal || false,
    negative: options.negative || false,

    append(digit) {
      if (this.value.length < this.maxLength) {
        this.value += digit;
        this.$dispatch('input', { value: this.value });
      }
    },

    backspace() {
      this.value = this.value.slice(0, -1);
      this.$dispatch('input', { value: this.value });
    },

    clear() {
      this.value = '';
      this.$dispatch('input', { value: this.value });
    },

    addDecimal() {
      if (this.decimal && !this.value.includes('.')) {
        this.value += '.';
        this.$dispatch('input', { value: this.value });
      }
    },

    toggleSign() {
      if (this.negative) {
        if (this.value.startsWith('-')) {
          this.value = this.value.slice(1);
        } else {
          this.value = '-' + this.value;
        }
        this.$dispatch('input', { value: this.value });
      }
    },

    submit() {
      this.$dispatch('submit', { value: this.value });
    }
  };
}

// Chart Component
function uxChart(options = {}) {
  return {
    type: options.type || 'line',
    data: options.data || { labels: [], datasets: [] },
    chartOptions: options.options || {},
    chart: null,

    // UX color palette
    colors: [
      'rgb(var(--ux-primary-rgb, 59, 130, 246))',
      'rgb(var(--ux-success-rgb, 34, 197, 94))',
      'rgb(var(--ux-warning-rgb, 234, 179, 8))',
      'rgb(var(--ux-danger-rgb, 239, 68, 68))',
      'rgba(139, 92, 246, 1)',  // purple
      'rgba(236, 72, 153, 1)',  // pink
      'rgba(20, 184, 166, 1)',  // teal
      'rgba(249, 115, 22, 1)'   // orange
    ],

    init() {
      this.$nextTick(() => {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
          console.warn('Chart.js is not loaded. Charts will not render.');
          return;
        }

        // Find canvas element
        const canvas = this.$el.querySelector('canvas');
        if (!canvas) {
          console.warn('No canvas element found in chart container');
          return;
        }

        // Check for JSON config in script tag (HTMX pattern)
        const scriptTag = this.$el.querySelector('script[type="application/json"]');
        if (scriptTag) {
          try {
            const config = JSON.parse(scriptTag.textContent);
            this.type = config.type || this.type;
            this.data = config.data || this.data;
            this.chartOptions = { ...this.chartOptions, ...config.options };
          } catch (e) {
            console.warn('Failed to parse chart config from script tag:', e);
          }
        }

        // Apply colors to datasets
        this.applyColors();

        // Create chart
        this.chart = new Chart(canvas, {
          type: this.type,
          data: this.data,
          options: this.getDefaultOptions()
        });

        this.$dispatch('chart:ready', { chart: this.chart });
      });
    },

    applyColors() {
      if (this.data && this.data.datasets) {
        this.data.datasets.forEach((dataset, index) => {
          const color = this.colors[index % this.colors.length];

          if (!dataset.backgroundColor) {
            if (this.type === 'line' || this.type === 'radar') {
              dataset.backgroundColor = color.replace('1)', '0.2)').replace('rgb(', 'rgba(');
              dataset.borderColor = color;
              dataset.pointBackgroundColor = color;
            } else {
              // For pie, doughnut, bar - use array of colors
              if (this.type === 'pie' || this.type === 'doughnut' || this.type === 'polarArea') {
                dataset.backgroundColor = this.colors.slice(0, dataset.data?.length || this.colors.length);
              } else {
                dataset.backgroundColor = color;
              }
            }
          }

          if (!dataset.borderColor && (this.type !== 'pie' && this.type !== 'doughnut')) {
            dataset.borderColor = color;
          }
        });
      }
    },

    getDefaultOptions() {
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--ux-text').trim() || '#333';
      const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--ux-border-color').trim() || '#e5e7eb';

      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor }
          },
          ...this.chartOptions.plugins
        },
        scales: this.type !== 'pie' && this.type !== 'doughnut' && this.type !== 'polarArea' && this.type !== 'radar' ? {
          x: {
            ticks: { color: textColor },
            grid: { color: gridColor },
            ...this.chartOptions.scales?.x
          },
          y: {
            ticks: { color: textColor },
            grid: { color: gridColor },
            ...this.chartOptions.scales?.y
          }
        } : undefined,
        ...this.chartOptions
      };
    },

    updateData(newData) {
      if (!this.chart) return;

      if (newData.labels) {
        this.chart.data.labels = newData.labels;
      }

      if (newData.datasets) {
        newData.datasets.forEach((dataset, index) => {
          if (this.chart.data.datasets[index]) {
            Object.assign(this.chart.data.datasets[index], dataset);
          } else {
            this.chart.data.datasets.push(dataset);
          }
        });
      }

      this.chart.update();
      this.$dispatch('chart:updated', { data: this.chart.data });
    },

    setConfig(config) {
      if (!this.chart) return;

      this.destroy();
      this.type = config.type || this.type;
      this.data = config.data || this.data;
      this.chartOptions = config.options || this.chartOptions;
      this.init();
    },

    setData(data) {
      this.updateData({ datasets: [{ data }] });
    },

    setType(type) {
      if (!this.chart) return;
      this.type = type;
      this.chart.config.type = type;
      this.chart.update();
    },

    destroy() {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
  };
}

// Time Clock Component
function uxTimeClock(options = {}) {
  return {
    time: new Date(),
    format: options.format || '24h',
    showSeconds: options.showSeconds !== false,
    running: true,

    init() {
      this.updateTime();
      setInterval(() => {
        if (this.running) this.updateTime();
      }, 1000);
    },

    updateTime() {
      this.time = new Date();
    },

    get hours() {
      let h = this.time.getHours();
      if (this.format === '12h') {
        h = h % 12 || 12;
      }
      return h.toString().padStart(2, '0');
    },

    get minutes() {
      return this.time.getMinutes().toString().padStart(2, '0');
    },

    get seconds() {
      return this.time.getSeconds().toString().padStart(2, '0');
    },

    get period() {
      return this.time.getHours() >= 12 ? 'PM' : 'AM';
    },

    get formattedTime() {
      let str = `${this.hours}:${this.minutes}`;
      if (this.showSeconds) str += `:${this.seconds}`;
      if (this.format === '12h') str += ` ${this.period}`;
      return str;
    }
  };
}

// Performance Meter Component
function uxPerformanceMeter(options = {}) {
  return {
    value: options.value || 0,
    max: options.max || 100,
    min: options.min || 0,
    zones: options.zones || [
      { max: 33, color: 'danger', label: 'Bajo' },
      { max: 66, color: 'warning', label: 'Medio' },
      { max: 100, color: 'success', label: 'Alto' }
    ],

    get percentage() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },

    get currentZone() {
      const pct = this.percentage;
      return this.zones.find(z => pct <= z.max) || this.zones[this.zones.length - 1];
    },

    get rotation() {
      return -90 + (this.percentage / 100) * 180;
    },

    setValue(val) {
      this.value = Math.min(this.max, Math.max(this.min, val));
    }
  };
}

// Audio Player Component
function uxAudioPlayer(options = {}) {
  return {
    src: options.src || '',
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: options.volume || 1,
    muted: false,

    init() {
      this.$nextTick(() => {
        const audio = this.$refs.audio;
        if (audio) {
          audio.addEventListener('loadedmetadata', () => {
            this.duration = audio.duration;
          });
          audio.addEventListener('timeupdate', () => {
            this.currentTime = audio.currentTime;
          });
          audio.addEventListener('ended', () => {
            this.playing = false;
          });
        }
      });
    },

    play() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.play();
        this.playing = true;
      }
    },

    pause() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.pause();
        this.playing = false;
      }
    },

    toggle() {
      this.playing ? this.pause() : this.play();
    },

    seek(time) {
      const audio = this.$refs.audio;
      if (audio) {
        audio.currentTime = time;
      }
    },

    setVolume(vol) {
      this.volume = Math.min(1, Math.max(0, vol));
      const audio = this.$refs.audio;
      if (audio) audio.volume = this.volume;
    },

    toggleMute() {
      this.muted = !this.muted;
      const audio = this.$refs.audio;
      if (audio) audio.muted = this.muted;
    },

    get progress() {
      return this.duration ? (this.currentTime / this.duration) * 100 : 0;
    },

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };
}

// Variant Selector Component
function uxVariantSelector(options = {}) {
  return {
    variants: options.variants || [],
    selected: options.selected || {},
    available: options.available || [],

    select(type, value) {
      this.selected[type] = value;
      this.$dispatch('change', { selected: this.selected });
    },

    isSelected(type, value) {
      return this.selected[type] === value;
    },

    isAvailable(type, value) {
      if (!this.available.length) return true;
      // Check if this combination is available
      const testSelection = { ...this.selected, [type]: value };
      return this.available.some(combo =>
        Object.keys(testSelection).every(k => combo[k] === testSelection[k])
      );
    }
  };
}

// Tree Component
function uxTree(options = {}) {
  return {
    items: options.items || [],
    expanded: options.expanded || [],
    selected: options.selected || null,
    multiSelect: options.multiSelect || false,
    selectedItems: [],

    toggle(id) {
      const index = this.expanded.indexOf(id);
      if (index === -1) {
        this.expanded.push(id);
      } else {
        this.expanded.splice(index, 1);
      }
      this.$dispatch('toggle', { id, expanded: index === -1 });
    },

    isExpanded(id) {
      return this.expanded.includes(id);
    },

    select(item) {
      if (this.multiSelect) {
        const index = this.selectedItems.findIndex(i => i.id === item.id);
        if (index === -1) {
          this.selectedItems.push(item);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.$dispatch('select', { items: this.selectedItems });
      } else {
        this.selected = item;
        this.$dispatch('select', { item });
      }
    },

    isSelected(id) {
      if (this.multiSelect) {
        return this.selectedItems.some(i => i.id === id);
      }
      return this.selected?.id === id;
    },

    expandAll() {
      const getAllIds = (items) => {
        let ids = [];
        items.forEach(item => {
          ids.push(item.id);
          if (item.children) {
            ids = ids.concat(getAllIds(item.children));
          }
        });
        return ids;
      };
      this.expanded = getAllIds(this.items);
    },

    collapseAll() {
      this.expanded = [];
    }
  };
}

// Rich Text Component
function uxRichText(options = {}) {
  return {
    content: options.content || '',
    placeholder: options.placeholder || 'Escribe aquí...',
    toolbar: options.toolbar || ['bold', 'italic', 'underline', 'link', 'list'],

    execCommand(command, value = null) {
      document.execCommand(command, false, value);
      this.updateContent();
    },

    updateContent() {
      const editor = this.$refs.editor;
      if (editor) {
        this.content = editor.innerHTML;
        this.$dispatch('input', { content: this.content });
      }
    },

    bold() { this.execCommand('bold'); },
    italic() { this.execCommand('italic'); },
    underline() { this.execCommand('underline'); },
    strikethrough() { this.execCommand('strikeThrough'); },

    insertLink() {
      const url = prompt('URL:');
      if (url) this.execCommand('createLink', url);
    },

    insertList(type) {
      this.execCommand(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
    },

    setAlignment(align) {
      this.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
    }
  };
}

// Quantity Stepper Component
function uxQuantityStepper(options = {}) {
  return {
    value: options.value || 1,
    min: options.min ?? 0,
    max: options.max ?? Infinity,
    step: options.step || 1,

    increment() {
      if (this.value + this.step <= this.max) {
        this.value += this.step;
        this.$dispatch('change', { value: this.value });
      }
    },

    decrement() {
      if (this.value - this.step >= this.min) {
        this.value -= this.step;
        this.$dispatch('change', { value: this.value });
      }
    },

    setValue(val) {
      const num = parseFloat(val) || 0;
      this.value = Math.min(this.max, Math.max(this.min, num));
      this.$dispatch('change', { value: this.value });
    },

    get canIncrement() {
      return this.value + this.step <= this.max;
    },

    get canDecrement() {
      return this.value - this.step >= this.min;
    }
  };
}

// Img Component (with lazy loading)
function uxImg(options = {}) {
  return {
    src: options.src || '',
    alt: options.alt || '',
    loading: true,
    error: false,
    placeholder: options.placeholder || '',

    init() {
      if (this.src) {
        this.loadImage();
      }
    },

    loadImage() {
      this.loading = true;
      this.error = false;
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.onerror = () => {
        this.loading = false;
        this.error = true;
      };
      img.src = this.src;
    },

    setSrc(src) {
      this.src = src;
      this.loadImage();
    }
  };
}

// Skeleton Component
function uxSkeleton(options = {}) {
  return {
    loading: options.loading !== false,
    lines: options.lines || 3,
    avatar: options.avatar || false,
    animated: options.animated !== false
  };
}

// Code Block Component
function uxCodeBlock(options = {}) {
  return {
    code: options.code || '',
    language: options.language || 'javascript',
    showLineNumbers: options.showLineNumbers !== false,
    copyable: options.copyable !== false,
    copied: false,

    async copy() {
      try {
        await navigator.clipboard.writeText(this.code);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
        this.$dispatch('copy', { code: this.code });
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },

    get lines() {
      return this.code.split('\n');
    }
  };
}

// JSON Viewer Component
function uxJsonViewer(options = {}) {
  return {
    data: options.data || {},
    expanded: options.expanded || true,
    expandedPaths: new Set(),
    maxDepth: options.maxDepth || 10,

    toggle(path) {
      if (this.expandedPaths.has(path)) {
        this.expandedPaths.delete(path);
      } else {
        this.expandedPaths.add(path);
      }
    },

    isExpanded(path) {
      return this.expanded || this.expandedPaths.has(path);
    },

    getType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      return typeof value;
    },

    isExpandable(value) {
      return value !== null && typeof value === 'object';
    },

    expandAll() {
      const expand = (obj, path = '') => {
        if (obj && typeof obj === 'object') {
          this.expandedPaths.add(path);
          Object.keys(obj).forEach(key => {
            expand(obj[key], path ? `${path}.${key}` : key);
          });
        }
      };
      expand(this.data);
    },

    collapseAll() {
      this.expandedPaths.clear();
    }
  };
}

// Fab Component
function uxFab(options = {}) {
  return {
    open: false,
    position: options.position || 'bottom-right',
    actions: options.actions || [],

    toggle() {
      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    doAction(action) {
      this.$dispatch('action', { action });
      this.close();
    }
  };
}

// Menu Component
function uxMenu(options = {}) {
  return {
    items: options.items || [],
    activeItem: options.activeItem || null,
    collapsed: options.collapsed || false,

    setActive(item) {
      this.activeItem = item.id || item.name;
      this.$dispatch('select', { item });
    },

    isActive(item) {
      return this.activeItem === (item.id || item.name);
    },

    toggle() {
      this.collapsed = !this.collapsed;
    }
  };
}

// Context Menu Component
function uxContextMenu(options = {}) {
  return {
    open: false,
    x: 0,
    y: 0,
    items: options.items || [],

    show(event) {
      event.preventDefault();
      this.x = event.clientX;
      this.y = event.clientY;
      this.open = true;
    },

    hide() {
      this.open = false;
    },

    select(item) {
      this.$dispatch('select', { item });
      this.hide();
    }
  };
}

// Mega Menu Component
function uxMegaMenu(options = {}) {
  return {
    open: false,
    activeCategory: null,
    categories: options.categories || [],

    openMenu(category) {
      this.activeCategory = category;
      this.open = true;
    },

    closeMenu() {
      this.open = false;
      this.activeCategory = null;
    },

    setCategory(category) {
      this.activeCategory = category;
    }
  };
}

// Navbar Component
function uxNavbar(options = {}) {
  return {
    menuOpen: false,
    scrolled: false,

    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 10;
      });
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeMenu() {
      this.menuOpen = false;
    }
  };
}

// Breadcrumbs Component
function uxBreadcrumbs(options = {}) {
  return {
    items: options.items || [],
    separator: options.separator || '/',

    navigate(item) {
      this.$dispatch('navigate', { item });
    }
  };
}

// Back Button Component
function uxBackButton(options = {}) {
  return {
    text: options.text || 'Atrás',
    defaultHref: options.defaultHref || '/',

    goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = this.defaultHref;
      }
    }
  };
}

// Loading Component
function uxLoading(options = {}) {
  return {
    show: options.show || false,
    message: options.message || 'Cargando...',

    present(msg) {
      this.message = msg || this.message;
      this.show = true;
    },

    dismiss() {
      this.show = false;
    }
  };
}

// Load More Component
function uxLoadMore(options = {}) {
  return {
    loading: false,
    hasMore: options.hasMore !== false,
    threshold: options.threshold || 100,

    async loadMore() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;
      this.$dispatch('loadmore');
    },

    complete(hasMore = true) {
      this.loading = false;
      this.hasMore = hasMore;
    }
  };
}

// Picker Component
function uxPicker(options = {}) {
  return {
    open: false,
    value: options.value || null,
    options: options.options || [],
    columns: options.columns || 1,

    toggle() {
      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    select(option) {
      this.value = option;
      this.$dispatch('change', { value: option });
      this.close();
    }
  };
}

// Banner Component
function uxBanner(options = {}) {
  return {
    show: options.show !== false,
    type: options.type || 'info',
    message: options.message || '',
    dismissible: options.dismissible !== false,

    dismiss() {
      this.show = false;
      this.$dispatch('dismiss');
    }
  };
}

// Callout Component
function uxCallout(options = {}) {
  return {
    type: options.type || 'info',
    title: options.title || '',
    message: options.message || '',
    show: options.show !== false,

    dismiss() {
      this.show = false;
    }
  };
}

// Chip and ChipGroup Components
function uxChip(options = {}) {
  return {
    selected: options.selected || false,
    disabled: options.disabled || false,
    removable: options.removable || false,

    toggle() {
      if (!this.disabled) {
        this.selected = !this.selected;
        this.$dispatch('change', { selected: this.selected });
      }
    },

    remove() {
      this.$dispatch('remove');
    }
  };
}

function uxChipGroup(options = {}) {
  return {
    selected: options.selected || [],
    multiple: options.multiple || false,
    chips: options.chips || [],

    toggle(chip) {
      if (this.multiple) {
        const index = this.selected.indexOf(chip);
        if (index === -1) {
          this.selected.push(chip);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.selected = [chip];
      }
      this.$dispatch('change', { selected: this.selected });
    },

    isSelected(chip) {
      return this.selected.includes(chip);
    }
  };
}

// Tag Group Component
function uxTagGroup(options = {}) {
  return {
    tags: options.tags || [],
    maxTags: options.maxTags || Infinity,

    add(tag) {
      if (this.tags.length < this.maxTags && !this.tags.includes(tag)) {
        this.tags.push(tag);
        this.$dispatch('change', { tags: this.tags });
      }
    },

    remove(tag) {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
        this.$dispatch('change', { tags: this.tags });
      }
    }
  };
}

// Button Group Component
function uxButtonGroup(options = {}) {
  return {
    selected: options.selected || null,
    multiple: options.multiple || false,
    selectedItems: options.selectedItems || [],

    toggle(value) {
      if (this.multiple) {
        const index = this.selectedItems.indexOf(value);
        if (index === -1) {
          this.selectedItems.push(value);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.$dispatch('change', { selected: this.selectedItems });
      } else {
        this.selected = this.selected === value ? null : value;
        this.$dispatch('change', { selected: this.selected });
      }
    },

    isSelected(value) {
      if (this.multiple) {
        return this.selectedItems.includes(value);
      }
      return this.selected === value;
    }
  };
}

// Searchbar Component
function uxSearchbar(options = {}) {
  return {
    query: options.value || '',
    placeholder: options.placeholder || 'Buscar...',
    focused: false,
    debounceMs: options.debounce || 300,
    debounceTimer: null,

    onInput() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.$dispatch('search', { query: this.query });
      }, this.debounceMs);
    },

    clear() {
      this.query = '';
      this.$dispatch('search', { query: '' });
      this.$dispatch('clear');
    },

    focus() {
      this.focused = true;
    },

    blur() {
      this.focused = false;
    }
  };
}

// Textarea Component
function uxTextarea(options = {}) {
  return {
    value: options.value || '',
    maxLength: options.maxLength || null,
    autoResize: options.autoResize || false,

    get charCount() {
      return this.value.length;
    },

    get remaining() {
      return this.maxLength ? this.maxLength - this.value.length : null;
    },

    resize() {
      if (this.autoResize) {
        const el = this.$refs.textarea;
        if (el) {
          el.style.height = 'auto';
          el.style.height = el.scrollHeight + 'px';
        }
      }
    }
  };
}

// Section Component
function uxSection(options = {}) {
  return {
    collapsed: options.collapsed || false,
    collapsible: options.collapsible || false,

    toggle() {
      if (this.collapsible) {
        this.collapsed = !this.collapsed;
      }
    }
  };
}

// Content Component
function uxContent(options = {}) {
  return {
    scrollTop: 0,

    scrollToTop() {
      const el = this.$el;
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
}

// Shell Component
function uxShell(options = {}) {
  return {
    sidebarOpen: options.sidebarOpen !== false,
    sidebarCollapsed: options.sidebarCollapsed || false,

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    collapseSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  };
}

// Split Pane Components
function uxSplitPane(options = {}) {
  return {
    sideVisible: options.sideVisible !== false,
    sideWidth: options.sideWidth || 300,

    toggleSide() {
      this.sideVisible = !this.sideVisible;
    }
  };
}

function uxSplitPaneRight(options = {}) {
  return {
    sideVisible: options.sideVisible !== false,
    sideWidth: options.sideWidth || 300,

    toggleSide() {
      this.sideVisible = !this.sideVisible;
    }
  };
}

// Master Detail Component
function uxMasterDetail(options = {}) {
  return {
    selectedItem: null,
    showDetail: false,

    selectItem(item) {
      this.selectedItem = item;
      this.showDetail = true;
      this.$dispatch('select', { item });
    },

    clearSelection() {
      this.selectedItem = null;
      this.showDetail = false;
    }
  };
}

// Dashboard Grid Component
function uxDashboardGrid(options = {}) {
  return {
    widgets: options.widgets || [],
    editing: false,

    toggleEdit() {
      this.editing = !this.editing;
    },

    moveWidget(fromIndex, toIndex) {
      const widget = this.widgets.splice(fromIndex, 1)[0];
      this.widgets.splice(toIndex, 0, widget);
      this.$dispatch('reorder', { widgets: this.widgets });
    }
  };
}

// Kanban Component
function uxKanban(options = {}) {
  return {
    columns: options.columns || [],
    cards: options.cards || [],
    emptyText: options.emptyText || 'No hay tarjetas',
    allowAddCards: options.allowAddCards !== false,
    _draggedCard: null,
    _draggedFromColumn: null,
    _dragOverColumn: null,
    _nextCardId: 1000,

    init() {
      // Distribute cards into columns based on columnId
      if (this.cards.length > 0) {
        this.cards.forEach(card => {
          const column = this.columns.find(c => c.id === card.columnId);
          if (column) {
            if (!column.cards) column.cards = [];
            column.cards.push(card);
          }
        });
      }

      // Ensure all columns have cards array
      this.columns.forEach(col => {
        if (!col.cards) col.cards = [];
      });
    },

    // Get count of cards in a column
    getColumnCount(columnId) {
      const column = this.columns.find(c => c.id === columnId);
      return column?.cards?.length || 0;
    },

    // Check if column is being dragged over
    isColumnDragOver(columnId) {
      return this._dragOverColumn === columnId;
    },

    // Drag handlers
    onDragStart(card, columnId, event) {
      this._draggedCard = card;
      this._draggedFromColumn = columnId;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', JSON.stringify({ cardId: card.id, columnId }));
      event.target.classList.add('ux-kanban__card--dragging');
    },

    onDragEnd(event) {
      event.target.classList.remove('ux-kanban__card--dragging');
      this._draggedCard = null;
      this._draggedFromColumn = null;
      this._dragOverColumn = null;
    },

    onDragOver(columnId, event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this._dragOverColumn = columnId;
    },

    onDragLeave(columnId, event) {
      // Only clear if leaving the column, not entering a child
      if (event.target.classList.contains('ux-kanban__column') ||
          event.target.classList.contains('ux-kanban__column-body')) {
        this._dragOverColumn = null;
      }
    },

    onDrop(columnId, insertBeforeCardId, event) {
      event.preventDefault();
      this._dragOverColumn = null;

      if (!this._draggedCard || this._draggedFromColumn === columnId) {
        return;
      }

      // Move card from source to target column
      this.moveCard(this._draggedCard.id, this._draggedFromColumn, columnId);
    },

    onCardClick(card, columnId, event) {
      this.$dispatch('kanban:card-click', { card, columnId });
    },

    moveCard(cardId, fromColumnId, toColumnId) {
      const fromCol = this.columns.find(c => c.id === fromColumnId);
      const toCol = this.columns.find(c => c.id === toColumnId);

      if (fromCol && toCol) {
        const cardIndex = fromCol.cards.findIndex(c => c.id === cardId);
        if (cardIndex !== -1) {
          const card = fromCol.cards.splice(cardIndex, 1)[0];
          card.columnId = toColumnId;
          toCol.cards.push(card);
          this.$dispatch('kanban:move', { card, fromColumn: fromColumnId, toColumn: toColumnId });
        }
      }
    },

    addCard(columnId, cardData) {
      const col = this.columns.find(c => c.id === columnId);
      if (col) {
        const card = {
          id: cardData.id || this._nextCardId++,
          columnId,
          ...cardData
        };
        if (!col.cards) col.cards = [];
        col.cards.push(card);
        this.$dispatch('kanban:card-add', { card, column: columnId });
      }
    },

    removeCard(columnId, cardId) {
      const col = this.columns.find(c => c.id === columnId);
      if (col) {
        const index = col.cards.findIndex(c => c.id === cardId);
        if (index !== -1) {
          const card = col.cards.splice(index, 1)[0];
          this.$dispatch('kanban:card-remove', { card, column: columnId });
        }
      }
    },

    updateCard(columnId, cardId, updates) {
      const col = this.columns.find(c => c.id === columnId);
      if (col) {
        const card = col.cards.find(c => c.id === cardId);
        if (card) {
          Object.assign(card, updates);
          this.$dispatch('kanban:card-update', { card, column: columnId });
        }
      }
    }
  };
}

// Timeline Component
function uxTimeline(options = {}) {
  return {
    items: options.items || [],
    vertical: options.vertical !== false
  };
}

// Stock Indicator Component
function uxStockIndicator(options = {}) {
  return {
    quantity: options.quantity || 0,
    lowThreshold: options.lowThreshold || 10,
    outThreshold: options.outThreshold || 0,

    get status() {
      if (this.quantity <= this.outThreshold) return 'out';
      if (this.quantity <= this.lowThreshold) return 'low';
      return 'available';
    },

    get label() {
      if (this.status === 'out') return 'Agotado';
      if (this.status === 'low') return 'Bajo stock';
      return 'En stock';
    }
  };
}

// Quantity Badge Component
function uxQuantityBadge(options = {}) {
  return {
    count: options.count || 0,
    max: options.max || 99,

    get displayCount() {
      return this.count > this.max ? `${this.max}+` : this.count;
    }
  };
}

// Stats Card Component
function uxStatsCard(options = {}) {
  return {
    value: options.value || 0,
    previousValue: options.previousValue || 0,
    format: options.format || 'number',

    get change() {
      if (!this.previousValue) return 0;
      return ((this.value - this.previousValue) / this.previousValue) * 100;
    },

    get changeType() {
      if (this.change > 0) return 'increase';
      if (this.change < 0) return 'decrease';
      return 'neutral';
    },

    get formattedValue() {
      if (this.format === 'currency') {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(this.value);
      }
      if (this.format === 'percent') {
        return `${this.value}%`;
      }
      return new Intl.NumberFormat('es-ES').format(this.value);
    }
  };
}

// Video Player Component
function uxVideoPlayer(options = {}) {
  return {
    src: options.src || '',
    playing: false,
    currentTime: 0,
    duration: 0,
    volume: options.volume || 1,
    muted: false,
    fullscreen: false,

    init() {
      this.$nextTick(() => {
        const video = this.$refs.video;
        if (video) {
          video.addEventListener('loadedmetadata', () => {
            this.duration = video.duration;
          });
          video.addEventListener('timeupdate', () => {
            this.currentTime = video.currentTime;
          });
          video.addEventListener('ended', () => {
            this.playing = false;
          });
        }
      });
    },

    play() {
      const video = this.$refs.video;
      if (video) {
        video.play();
        this.playing = true;
      }
    },

    pause() {
      const video = this.$refs.video;
      if (video) {
        video.pause();
        this.playing = false;
      }
    },

    toggle() {
      this.playing ? this.pause() : this.play();
    },

    seek(time) {
      const video = this.$refs.video;
      if (video) video.currentTime = time;
    },

    setVolume(vol) {
      this.volume = Math.min(1, Math.max(0, vol));
      const video = this.$refs.video;
      if (video) video.volume = this.volume;
    },

    toggleMute() {
      this.muted = !this.muted;
      const video = this.$refs.video;
      if (video) video.muted = this.muted;
    },

    toggleFullscreen() {
      const container = this.$el;
      if (!document.fullscreenElement) {
        container.requestFullscreen();
        this.fullscreen = true;
      } else {
        document.exitFullscreen();
        this.fullscreen = false;
      }
    },

    get progress() {
      return this.duration ? (this.currentTime / this.duration) * 100 : 0;
    },

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  };
}

// Image Gallery Component
function uxImageGallery(options = {}) {
  return {
    images: options.images || [],
    currentIndex: 0,

    get currentImage() {
      return this.images[this.currentIndex];
    },

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },

    goTo(index) {
      this.currentIndex = index;
    }
  };
}

// Image Zoom Component
function uxImageZoom(options = {}) {
  return {
    zoomed: false,
    scale: options.scale || 2,

    toggle() {
      this.zoomed = !this.zoomed;
    },

    zoomIn() {
      this.zoomed = true;
    },

    zoomOut() {
      this.zoomed = false;
    }
  };
}

// Image Crop Component
function uxImageCrop(options = {}) {
  return {
    src: options.src || '',
    aspectRatio: options.aspectRatio || null,
    cropX: 0,
    cropY: 0,
    cropWidth: 100,
    cropHeight: 100,

    setCrop(x, y, width, height) {
      this.cropX = x;
      this.cropY = y;
      this.cropWidth = width;
      this.cropHeight = height;
    },

    getCropData() {
      return {
        x: this.cropX,
        y: this.cropY,
        width: this.cropWidth,
        height: this.cropHeight
      };
    }
  };
}

// Shift Calendar Component
function uxShiftCalendar(options = {}) {
  return {
    currentDate: new Date(),
    shifts: options.shifts || [],
    view: options.view || 'week',

    get weekDays() {
      const days = [];
      const start = this.getWeekStart(this.currentDate);
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        days.push(date);
      }
      return days;
    },

    getWeekStart(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      return d;
    },

    getShiftsForDay(date) {
      return this.shifts.filter(s => {
        const shiftDate = new Date(s.date);
        return shiftDate.toDateString() === date.toDateString();
      });
    },

    prev() {
      const d = new Date(this.currentDate);
      d.setDate(d.getDate() - 7);
      this.currentDate = d;
    },

    next() {
      const d = new Date(this.currentDate);
      d.setDate(d.getDate() + 7);
      this.currentDate = d;
    }
  };
}

// Work Order Component
function uxWorkOrder(options = {}) {
  return {
    status: options.status || 'pending',
    progress: options.progress || 0,
    tasks: options.tasks || [],

    get completedTasks() {
      return this.tasks.filter(t => t.completed).length;
    },

    get totalTasks() {
      return this.tasks.length;
    },

    toggleTask(index) {
      if (this.tasks[index]) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.updateProgress();
      }
    },

    updateProgress() {
      this.progress = this.totalTasks > 0
        ? Math.round((this.completedTasks / this.totalTasks) * 100)
        : 0;
    },

    setStatus(status) {
      this.status = status;
      this.$dispatch('statuschange', { status });
    }
  };
}

// Machine Status Component
function uxMachineStatus(options = {}) {
  return {
    status: options.status || 'idle',
    metrics: options.metrics || {},
    lastUpdate: new Date(),

    get statusColor() {
      const colors = {
        running: 'success',
        idle: 'secondary',
        warning: 'warning',
        error: 'danger',
        maintenance: 'primary'
      };
      return colors[this.status] || 'secondary';
    },

    get statusLabel() {
      const labels = {
        running: 'En operación',
        idle: 'Inactivo',
        warning: 'Advertencia',
        error: 'Error',
        maintenance: 'Mantenimiento'
      };
      return labels[this.status] || this.status;
    },

    setStatus(status) {
      this.status = status;
      this.lastUpdate = new Date();
    }
  };
}

// Production Line Component
function uxProductionLine(options = {}) {
  return {
    stations: options.stations || [],
    currentUnit: options.currentUnit || null,

    getStationStatus(station) {
      if (station.error) return 'error';
      if (station.processing) return 'active';
      if (station.completed) return 'completed';
      return 'idle';
    },

    moveToNext() {
      const currentIndex = this.stations.findIndex(s => s.processing);
      if (currentIndex < this.stations.length - 1) {
        this.stations[currentIndex].processing = false;
        this.stations[currentIndex].completed = true;
        this.stations[currentIndex + 1].processing = true;
      }
    }
  };
}

// Quality Check Component
function uxQualityCheck(options = {}) {
  return {
    checks: options.checks || [],
    status: 'pending',

    get passedCount() {
      return this.checks.filter(c => c.passed === true).length;
    },

    get failedCount() {
      return this.checks.filter(c => c.passed === false).length;
    },

    get pendingCount() {
      return this.checks.filter(c => c.passed === null || c.passed === undefined).length;
    },

    setCheckResult(index, passed) {
      if (this.checks[index]) {
        this.checks[index].passed = passed;
        this.updateStatus();
      }
    },

    updateStatus() {
      if (this.failedCount > 0) {
        this.status = 'failed';
      } else if (this.pendingCount === 0) {
        this.status = 'passed';
      } else {
        this.status = 'pending';
      }
    }
  };
}

// Calculator Component
function uxCalculator(options = {}) {
  return {
    display: '0',
    firstOperand: null,
    operator: null,
    waitingForSecond: false,

    inputDigit(digit) {
      if (this.waitingForSecond) {
        this.display = digit;
        this.waitingForSecond = false;
      } else {
        this.display = this.display === '0' ? digit : this.display + digit;
      }
    },

    inputDecimal() {
      if (!this.display.includes('.')) {
        this.display += '.';
      }
    },

    handleOperator(nextOperator) {
      const inputValue = parseFloat(this.display);

      if (this.firstOperand === null) {
        this.firstOperand = inputValue;
      } else if (this.operator) {
        const result = this.calculate(this.firstOperand, inputValue, this.operator);
        this.display = String(result);
        this.firstOperand = result;
      }

      this.waitingForSecond = true;
      this.operator = nextOperator;
    },

    calculate(first, second, op) {
      switch (op) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return second !== 0 ? first / second : 'Error';
        default: return second;
      }
    },

    equals() {
      if (!this.operator || this.firstOperand === null) return;

      const result = this.calculate(this.firstOperand, parseFloat(this.display), this.operator);
      this.display = String(result);
      this.firstOperand = null;
      this.operator = null;
    },

    clear() {
      this.display = '0';
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecond = false;
    },

    toggleSign() {
      this.display = String(parseFloat(this.display) * -1);
    },

    percentage() {
      this.display = String(parseFloat(this.display) / 100);
    }
  };
}

// Cart Component
function uxCart(options = {}) {
  return {
    items: options.items || [],
    taxRate: options.taxRate || 0,
    discountPercent: options.discountPercent || 0,
    currency: options.currency || '$',
    locale: options.locale || 'en-US',
    labels: {
      title: 'Cart',
      empty: 'Your cart is empty',
      emptyText: 'Add some products to get started',
      subtotal: 'Subtotal',
      tax: 'Tax',
      discount: 'Discount',
      total: 'Total',
      checkout: 'Checkout',
      clearCart: 'Clear',
      items: 'items',
      ...(options.labels || {})
    },

    // Icons SVG
    icons: {
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
      minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>',
      cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
      placeholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'
    },

    getIcon(name) {
      return this.icons[name] || '';
    },

    formatPrice(price) {
      if (typeof price !== 'number') return '';
      try {
        return new Intl.NumberFormat(this.locale, {
          style: 'currency',
          currency: this.currency === '$' ? 'USD' : this.currency === '€' ? 'EUR' : 'USD',
          minimumFractionDigits: 2
        }).format(price).replace(/[A-Z]{3}\s?/, this.currency);
      } catch (e) {
        return this.currency + price.toFixed(2);
      }
    },

    get isEmpty() {
      return this.items.length === 0;
    },

    get subtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    get discount() {
      return (this.subtotal * this.discountPercent) / 100;
    },

    get tax() {
      return ((this.subtotal - this.discount) * this.taxRate) / 100;
    },

    get total() {
      return this.subtotal - this.discount + this.tax;
    },

    get itemCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    addItem(item) {
      const existing = this.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        this.items.push({ ...item, quantity: item.quantity || 1 });
      }
      this.$dispatch('cart:change', { items: this.items, total: this.total });
    },

    removeItem(indexOrId) {
      const index = typeof indexOrId === 'number' && indexOrId < this.items.length
        ? indexOrId
        : this.items.findIndex(i => i.id === indexOrId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.$dispatch('cart:change', { items: this.items, total: this.total });
      }
    },

    updateQuantity(indexOrId, quantity) {
      const item = typeof indexOrId === 'number' && indexOrId < this.items.length
        ? this.items[indexOrId]
        : this.items.find(i => i.id === indexOrId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          this.removeItem(indexOrId);
        } else {
          this.$dispatch('cart:change', { items: this.items, total: this.total });
        }
      }
    },

    incrementQuantity(index) {
      if (this.items[index]) {
        this.items[index].quantity++;
        this.$dispatch('cart:change', { items: this.items, total: this.total });
      }
    },

    decrementQuantity(index) {
      if (this.items[index]) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.removeItem(index);
        }
        this.$dispatch('cart:change', { items: this.items, total: this.total });
      }
    },

    clearCart() {
      this.items = [];
      this.$dispatch('cart:change', { items: [], total: 0 });
      this.$dispatch('cart:clear');
    },

    clear() {
      this.clearCart();
    },

    checkout() {
      this.$dispatch('cart:checkout', {
        items: this.items,
        subtotal: this.subtotal,
        discount: this.discount,
        tax: this.tax,
        total: this.total
      });
    }
  };
}

// Payment Component
function uxPayment(options = {}) {
  return {
    amount: options.amount || 0,
    method: options.method || 'cash',
    cashReceived: 0,

    get change() {
      return Math.max(0, this.cashReceived - this.amount);
    },

    setMethod(method) {
      this.method = method;
    },

    setCashReceived(amount) {
      this.cashReceived = amount;
    },

    processPayment() {
      this.$dispatch('payment', {
        amount: this.amount,
        method: this.method,
        cashReceived: this.cashReceived,
        change: this.change
      });
    }
  };
}

// Receipt Component
function uxReceipt(options = {}) {
  return {
    items: options.items || [],
    subtotal: options.subtotal || 0,
    tax: options.tax || 0,
    total: options.total || 0,
    date: options.date || new Date(),
    number: options.number || '',

    print() {
      window.print();
    }
  };
}

// Product Card Component
function uxProductCard(options = {}) {
  return {
    product: options.product || {},
    quantity: 1,
    currency: options.currency || '$',
    locale: options.locale || 'en-US',
    lowStockThreshold: options.lowStockThreshold || 5,
    isAdding: false,
    labels: {
      addToCart: 'Add to cart',
      outOfStock: 'Out of stock',
      lowStock: 'Low stock',
      inStock: 'In stock',
      ...(options.labels || {})
    },

    // Icons SVG
    icons: {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
      placeholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'
    },

    getIcon(name) {
      return this.icons[name] || '';
    },

    formatPrice(price) {
      if (typeof price !== 'number') return '';
      try {
        return new Intl.NumberFormat(this.locale, {
          style: 'currency',
          currency: this.currency === '$' ? 'USD' : this.currency === '€' ? 'EUR' : 'USD',
          minimumFractionDigits: 2
        }).format(price).replace(/[A-Z]{3}\s?/, this.currency);
      } catch (e) {
        return this.currency + price.toFixed(2);
      }
    },

    getDiscountPercent() {
      if (!this.product.originalPrice || !this.product.price) return 0;
      return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
    },

    getStockText() {
      const stock = this.product.stock;
      if (stock === undefined || stock === null) return '';
      if (stock <= 0) return this.labels.outOfStock;
      if (stock <= this.lowStockThreshold) return `${this.labels.lowStock}: ${stock}`;
      return this.labels.inStock;
    },

    get isLowStock() {
      return this.product.stock > 0 && this.product.stock <= this.lowStockThreshold;
    },

    get isOutOfStock() {
      return this.product.stock !== undefined && this.product.stock <= 0;
    },

    increment() {
      this.quantity++;
    },

    decrement() {
      if (this.quantity > 1) this.quantity--;
    },

    addToCart(event) {
      if (event) event.stopPropagation();
      if (this.isOutOfStock) return;

      this.isAdding = true;
      setTimeout(() => { this.isAdding = false; }, 300);

      this.$dispatch('product-add', {
        product: this.product,
        quantity: this.quantity
      });

      // Also dispatch legacy event
      this.$dispatch('addtocart', {
        product: this.product,
        quantity: this.quantity
      });
    }
  };
}

// Category Tabs Component
function uxCategoryTabs(options = {}) {
  return {
    categories: options.categories || [],
    selected: options.selected || null,

    select(category) {
      this.selected = category;
      this.$dispatch('change', { category });
    },

    isSelected(category) {
      return this.selected === category || this.selected?.id === category?.id;
    }
  };
}

// Onscreen Keyboard Component
function uxOnscreenKeyboard(options = {}) {
  return {
    layout: options.layout || 'qwerty',
    shift: false,
    caps: false,
    value: '',

    get currentLayout() {
      const layouts = {
        qwerty: [
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
          ['space']
        ],
        numeric: [
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['clear', '0', 'backspace']
        ]
      };
      return layouts[this.layout] || layouts.qwerty;
    },

    press(key) {
      switch (key) {
        case 'shift':
          this.shift = !this.shift;
          break;
        case 'caps':
          this.caps = !this.caps;
          break;
        case 'backspace':
          this.value = this.value.slice(0, -1);
          break;
        case 'space':
          this.value += ' ';
          break;
        case 'clear':
          this.value = '';
          break;
        default:
          const char = (this.shift || this.caps) ? key.toUpperCase() : key;
          this.value += char;
          if (this.shift) this.shift = false;
      }
      this.$dispatch('input', { value: this.value });
    }
  };
}

// PDF Viewer Component
function uxPdfViewer(options = {}) {
  return {
    src: options.src || '',
    currentPage: 1,
    totalPages: 0,
    scale: options.scale || 1,

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    zoomIn() {
      this.scale = Math.min(3, this.scale + 0.25);
    },

    zoomOut() {
      this.scale = Math.max(0.5, this.scale - 0.25);
    }
  };
}

// Command Palette Component
function uxCommand(options = {}) {
  return {
    open: false,
    query: '',
    commands: options.commands || [],
    selectedIndex: 0,

    get filteredCommands() {
      if (!this.query) return this.commands;
      return this.commands.filter(cmd =>
        cmd.label.toLowerCase().includes(this.query.toLowerCase())
      );
    },

    toggle() {
      this.open = !this.open;
      if (this.open) {
        this.$nextTick(() => {
          const input = this.$refs.input;
          if (input) input.focus();
        });
      }
    },

    close() {
      this.open = false;
      this.query = '';
      this.selectedIndex = 0;
    },

    select(command) {
      this.$dispatch('select', { command });
      this.close();
    },

    onKeydown(event) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (this.filteredCommands[this.selectedIndex]) {
            this.select(this.filteredCommands[this.selectedIndex]);
          }
          break;
        case 'Escape':
          this.close();
          break;
      }
    }
  };
}

// Notification Center Component
function uxNotificationCenter(options = {}) {
  return {
    open: false,
    notifications: options.notifications || [],

    get unreadCount() {
      return this.notifications.filter(n => !n.read).length;
    },

    toggle() {
      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    markAsRead(id) {
      const notif = this.notifications.find(n => n.id === id);
      if (notif) notif.read = true;
    },

    markAllAsRead() {
      this.notifications.forEach(n => n.read = true);
    },

    remove(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },

    clear() {
      this.notifications = [];
    }
  };
}

// Dual Range Component
function uxDualRange(options = {}) {
  return {
    min: options.min || 0,
    max: options.max || 100,
    minValue: options.minValue || options.min || 0,
    maxValue: options.maxValue || options.max || 100,
    step: options.step || 1,

    setMin(val) {
      this.minValue = Math.min(val, this.maxValue - this.step);
      this.$dispatch('change', { min: this.minValue, max: this.maxValue });
    },

    setMax(val) {
      this.maxValue = Math.max(val, this.minValue + this.step);
      this.$dispatch('change', { min: this.minValue, max: this.maxValue });
    },

    get minPercent() {
      return ((this.minValue - this.min) / (this.max - this.min)) * 100;
    },

    get maxPercent() {
      return ((this.maxValue - this.min) / (this.max - this.min)) * 100;
    }
  };
}

// Date Range Picker Component
function uxDateRangePicker(options = {}) {
  return {
    startDate: options.startDate || null,
    endDate: options.endDate || null,
    open: false,
    selecting: 'start',

    toggle() {
      this.open = !this.open;
    },

    close() {
      this.open = false;
    },

    selectDate(date) {
      if (this.selecting === 'start') {
        this.startDate = date;
        this.selecting = 'end';
      } else {
        if (date >= this.startDate) {
          this.endDate = date;
        } else {
          this.endDate = this.startDate;
          this.startDate = date;
        }
        this.$dispatch('change', { start: this.startDate, end: this.endDate });
        this.selecting = 'start';
      }
    },

    clear() {
      this.startDate = null;
      this.endDate = null;
      this.selecting = 'start';
      this.$dispatch('change', { start: null, end: null });
    },

    get displayValue() {
      if (!this.startDate) return '';
      const start = this.formatDate(this.startDate);
      const end = this.endDate ? this.formatDate(this.endDate) : '...';
      return `${start} - ${end}`;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  };
}

// Swipe Item Component
function uxSwipeItem(options = {}) {
  return {
    open: false,
    side: null,

    openLeft() {
      this.side = 'left';
      this.open = true;
    },

    openRight() {
      this.side = 'right';
      this.open = true;
    },

    close() {
      this.open = false;
      this.side = null;
    }
  };
}

// Refresher Component
function uxRefresher(options = {}) {
  return {
    pulling: false,
    refreshing: false,
    pullDistance: 0,
    threshold: options.threshold || 80,

    onPull(distance) {
      this.pullDistance = distance;
      this.pulling = distance > 0;
    },

    async doRefresh() {
      if (this.pullDistance >= this.threshold) {
        this.refreshing = true;
        this.$dispatch('refresh');
      }
    },

    complete() {
      this.refreshing = false;
      this.pulling = false;
      this.pullDistance = 0;
    }
  };
}

// Reorder Component
function uxReorder(options = {}) {
  return {
    items: options.items || [],
    dragging: false,
    dragIndex: null,

    startDrag(index) {
      this.dragging = true;
      this.dragIndex = index;
    },

    endDrag() {
      this.dragging = false;
      this.dragIndex = null;
    },

    move(fromIndex, toIndex) {
      const item = this.items.splice(fromIndex, 1)[0];
      this.items.splice(toIndex, 0, item);
      this.$dispatch('reorder', { items: this.items });
    }
  };
}

// Virtual List Component
function uxVirtualList(options = {}) {
  return {
    items: options.items || [],
    itemHeight: options.itemHeight || 50,
    containerHeight: options.containerHeight || 400,
    scrollTop: 0,
    emptyText: options.emptyText || 'No hay elementos',

    get visibleCount() {
      return Math.ceil(this.containerHeight / this.itemHeight) + 2;
    },

    get startIndex() {
      return Math.floor(this.scrollTop / this.itemHeight);
    },

    get visibleItems() {
      return this.items.slice(this.startIndex, this.startIndex + this.visibleCount);
    },

    get totalHeight() {
      return this.items.length * this.itemHeight;
    },

    get offsetY() {
      return this.startIndex * this.itemHeight;
    },

    onScroll(event) {
      this.scrollTop = event.target.scrollTop;
    }
  };
}

// Masonry Component
function uxMasonry(options = {}) {
  return {
    items: options.items || [],
    columns: options.columns || 3
  };
}

// Diff Viewer Component
function uxDiffViewer(options = {}) {
  return {
    oldText: options.oldText || '',
    newText: options.newText || '',
    mode: options.mode || 'split'
  };
}

// Form Wizard Component
function uxFormWizard(options = {}) {
  return {
    currentStep: options.currentStep || 1,
    steps: options.steps || [],
    data: options.data || {},

    get totalSteps() {
      return this.steps.length;
    },

    get isFirstStep() {
      return this.currentStep === 1;
    },

    get isLastStep() {
      return this.currentStep === this.totalSteps;
    },

    get currentStepData() {
      return this.steps[this.currentStep - 1];
    },

    next() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.$dispatch('stepchange', { step: this.currentStep });
      }
    },

    prev() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.$dispatch('stepchange', { step: this.currentStep });
      }
    },

    goTo(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step;
        this.$dispatch('stepchange', { step: this.currentStep });
      }
    },

    submit() {
      this.$dispatch('submit', { data: this.data });
    }
  };
}

// Org Chart Component
function uxOrgChart(options = {}) {
  return {
    data: options.data || {},
    expanded: options.expanded || []
  };
}

// Barcode Scanner Component
function uxBarcodeScanner(options = {}) {
  return {
    scanning: false,
    lastCode: '',

    start() {
      this.scanning = true;
      this.$dispatch('start');
    },

    stop() {
      this.scanning = false;
      this.$dispatch('stop');
    },

    onScan(code) {
      this.lastCode = code;
      this.$dispatch('scan', { code });
    }
  };
}

// Batch Tracker Component
function uxBatchTracker(options = {}) {
  return {
    batches: options.batches || [],
    currentBatch: null
  };
}

// BOM Tree Component
function uxBomTree(options = {}) {
  return {
    items: options.items || [],
    expanded: []
  };
}

// Gantt Component
function uxGantt(options = {}) {
  return {
    // Data
    tasks: options.tasks || [],
    zoom: options.zoom || 'week',
    taskPanelWidth: options.taskPanelWidth || 280,
    readonly: options.readonly || false,
    showToday: options.showToday !== false,
    expandedGroups: new Set(options.expandedGroups || []),

    // State
    selectedTask: null,
    isResizing: false,
    isDragging: false,
    dragTask: null,
    dragType: null,
    tooltip: { visible: false, task: null, x: 0, y: 0 },

    // Computed dates
    _startDate: null,
    _endDate: null,

    init() {
      this.calculateDateRange();
      // Sync scroll between task panel and chart
      this.$nextTick(() => {
        const tasksBody = this.$refs.tasksBody;
        const chartScroll = this.$refs.chartScroll;
        if (tasksBody && chartScroll) {
          chartScroll.addEventListener('scroll', () => {
            tasksBody.scrollTop = chartScroll.scrollTop;
          });
          tasksBody.addEventListener('scroll', () => {
            chartScroll.scrollTop = tasksBody.scrollTop;
          });
        }
      });
    },

    calculateDateRange() {
      let minDate = null;
      let maxDate = null;

      const processTask = (task) => {
        if (task.type === 'milestone' && task.date) {
          const d = new Date(task.date);
          if (!minDate || d < minDate) minDate = d;
          if (!maxDate || d > maxDate) maxDate = d;
        } else if (task.start && task.end) {
          const s = new Date(task.start);
          const e = new Date(task.end);
          if (!minDate || s < minDate) minDate = s;
          if (!maxDate || e > maxDate) maxDate = e;
        }
        if (task.children) {
          task.children.forEach(processTask);
        }
      };

      this.tasks.forEach(processTask);

      // Add padding
      if (minDate && maxDate) {
        this._startDate = new Date(minDate);
        this._startDate.setDate(this._startDate.getDate() - 7);
        this._endDate = new Date(maxDate);
        this._endDate.setDate(this._endDate.getDate() + 14);
      } else {
        this._startDate = new Date();
        this._endDate = new Date();
        this._endDate.setMonth(this._endDate.getMonth() + 2);
      }
    },

    get flattenedTasks() {
      const result = [];
      const flatten = (tasks, level = 0) => {
        tasks.forEach(task => {
          const hasChildren = task.children && task.children.length > 0;
          result.push({
            ...task,
            _level: level,
            _hasChildren: hasChildren
          });
          if (hasChildren && this.expandedGroups.has(task.id)) {
            flatten(task.children, level + 1);
          }
        });
      };
      flatten(this.tasks);
      return result;
    },

    get cellWidth() {
      switch (this.zoom) {
        case 'day': return 40;
        case 'week': return 100;
        case 'month': return 120;
        default: return 100;
      }
    },

    get timelineDates() {
      const dates = [];
      const current = new Date(this._startDate);
      while (current <= this._endDate) {
        dates.push(new Date(current));
        if (this.zoom === 'day') {
          current.setDate(current.getDate() + 1);
        } else if (this.zoom === 'week') {
          current.setDate(current.getDate() + 7);
        } else {
          current.setMonth(current.getMonth() + 1);
        }
      }
      return dates;
    },

    get chartWidth() {
      return this.timelineDates.length * this.cellWidth;
    },

    get todayPosition() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (today < this._startDate || today > this._endDate) return null;
      const daysDiff = Math.floor((today - this._startDate) / (1000 * 60 * 60 * 24));
      const totalDays = Math.floor((this._endDate - this._startDate) / (1000 * 60 * 60 * 24));
      return (daysDiff / totalDays) * this.chartWidth;
    },

    setZoom(level) {
      this.zoom = level;
      this.calculateDateRange();
      this.$dispatch('gantt:zoom', { zoom: level });
    },

    scrollToToday() {
      if (this.todayPosition !== null && this.$refs.chartScroll) {
        const scrollLeft = this.todayPosition - (this.$refs.chartScroll.clientWidth / 2);
        this.$refs.chartScroll.scrollLeft = Math.max(0, scrollLeft);
      }
    },

    navigate(direction) {
      if (!this.$refs.chartScroll) return;
      const amount = this.cellWidth * 3;
      if (direction === 'prev') {
        this.$refs.chartScroll.scrollLeft -= amount;
      } else {
        this.$refs.chartScroll.scrollLeft += amount;
      }
    },

    toggleGroup(taskId) {
      if (this.expandedGroups.has(taskId)) {
        this.expandedGroups.delete(taskId);
      } else {
        this.expandedGroups.add(taskId);
      }
      this.$dispatch('gantt:toggle-group', { taskId, expanded: this.expandedGroups.has(taskId) });
    },

    selectTask(task) {
      this.selectedTask = task.id;
      this.$dispatch('gantt:select', { task });
    },

    formatHeaderDate(date, isPrimary) {
      if (isPrimary) {
        if (this.zoom === 'day') {
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } else if (this.zoom === 'week') {
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } else {
          return date.getFullYear().toString();
        }
      } else {
        if (this.zoom === 'day') {
          return date.getDate().toString();
        } else if (this.zoom === 'week') {
          return 'W' + this.getWeekNumber(date);
        } else {
          return date.toLocaleDateString('en-US', { month: 'short' });
        }
      }
    },

    getWeekNumber(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    },

    isWeekend(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    },

    getBarStyle(task) {
      let startDate, endDate;
      if (task.type === 'milestone') {
        startDate = endDate = new Date(task.date);
      } else {
        startDate = new Date(task.start);
        endDate = new Date(task.end);
      }

      const totalDays = Math.floor((this._endDate - this._startDate) / (1000 * 60 * 60 * 24));
      const startDays = Math.floor((startDate - this._startDate) / (1000 * 60 * 60 * 24));
      const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      const left = (startDays / totalDays) * this.chartWidth;
      const width = task.type === 'milestone' ? 16 : (durationDays / totalDays) * this.chartWidth;

      return {
        left: left + 'px',
        width: width + 'px'
      };
    },

    getBarClass(task) {
      const classes = ['ux-gantt__bar'];
      if (this.selectedTask === task.id) classes.push('ux-gantt__bar--selected');
      if (task.type === 'group') classes.push('ux-gantt__bar--group');
      if (task.status) classes.push(`ux-gantt__bar--${task.status}`);
      if (task.category) classes.push(`ux-gantt__bar--category-${task.category}`);
      return classes.join(' ');
    },

    showTooltip(task, event) {
      this.tooltip = {
        visible: true,
        task: task,
        x: event.clientX + 10,
        y: event.clientY + 10
      };
    },

    hideTooltip() {
      this.tooltip.visible = false;
    },

    startResize(event) {
      if (this.readonly) return;
      this.isResizing = true;
      const startX = event.clientX;
      const startWidth = this.taskPanelWidth;

      const onMouseMove = (e) => {
        const diff = e.clientX - startX;
        this.taskPanelWidth = Math.max(150, Math.min(500, startWidth + diff));
      };

      const onMouseUp = () => {
        this.isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    startDrag(task, type, event) {
      if (this.readonly || task.type === 'group') return;
      // Drag implementation would go here
    },

    getDependencyPaths() {
      // Returns SVG path data for dependency arrows
      const paths = [];
      const taskMap = new Map();
      this.flattenedTasks.forEach((task, index) => {
        taskMap.set(task.id, { task, index });
      });

      this.flattenedTasks.forEach((task, toIndex) => {
        if (task.dependencies) {
          task.dependencies.forEach(depId => {
            const from = taskMap.get(depId);
            if (from) {
              const fromIndex = from.index;
              const fromTask = from.task;

              // Calculate positions
              const totalDays = Math.floor((this._endDate - this._startDate) / (1000 * 60 * 60 * 24));
              const fromEnd = fromTask.type === 'milestone'
                ? new Date(fromTask.date)
                : new Date(fromTask.end);
              const toStart = task.type === 'milestone'
                ? new Date(task.date)
                : new Date(task.start);

              const fromX = ((fromEnd - this._startDate) / (1000 * 60 * 60 * 24) / totalDays) * this.chartWidth;
              const toX = ((toStart - this._startDate) / (1000 * 60 * 60 * 24) / totalDays) * this.chartWidth;
              const fromY = fromIndex * 40 + 20;
              const toY = toIndex * 40 + 20;

              // Create curved path
              const midX = fromX + (toX - fromX) / 2;
              const path = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

              paths.push({
                path,
                arrowX: toX,
                arrowY: toY
              });
            }
          });
        }
      });

      return paths;
    }
  };
}

// Scheduler Component
function uxScheduler(options = {}) {
  return {
    events: options.events || [],
    view: options.view || 'week',
    currentDate: new Date()
  };
}

// PWA Component
function uxPWA(options = {}) {
  return {
    installable: false,
    deferredPrompt: null,

    init() {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
        this.installable = true;
      });
    },

    async install() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const result = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;
        this.installable = false;
        this.$dispatch('install', { outcome: result.outcome });
      }
    }
  };
}

// Electron Component
function uxElectron(options = {}) {
  return {
    isElectron: typeof window !== 'undefined' && window.process?.type === 'renderer',

    minimize() {
      if (this.isElectron && window.electron) {
        window.electron.minimize();
      }
    },

    maximize() {
      if (this.isElectron && window.electron) {
        window.electron.maximize();
      }
    },

    close() {
      if (this.isElectron && window.electron) {
        window.electron.close();
      }
    }
  };
}

// Page Component (for layout)
function uxPage(options = {}) {
  return {
    title: options.title || '',
    loading: false
  };
}

// Panel Detail Component
function uxPanelDetail(options = {}) {
  return {
    open: options.open || false,
    data: options.data || null,

    show(data) {
      this.data = data;
      this.open = true;
    },

    hide() {
      this.open = false;
    }
  };
}

// Panel Group Component
function uxPanelGroup(options = {}) {
  return {
    panels: options.panels || [],
    activePanel: options.activePanel || null,

    activate(id) {
      this.activePanel = id;
    },

    isActive(id) {
      return this.activePanel === id;
    }
  };
}

// Pinpad Component
function uxPinpad(options = {}) {
  return {
    value: '',
    maxLength: options.maxLength || 4,
    masked: options.masked !== false,

    append(digit) {
      if (this.value.length < this.maxLength) {
        this.value += digit;
        this.$dispatch('input', { value: this.value });

        if (this.value.length === this.maxLength) {
          this.$dispatch('complete', { value: this.value });
        }
      }
    },

    backspace() {
      this.value = this.value.slice(0, -1);
      this.$dispatch('input', { value: this.value });
    },

    clear() {
      this.value = '';
      this.$dispatch('input', { value: '' });
    },

    get displayValue() {
      return this.masked ? '•'.repeat(this.value.length) : this.value;
    }
  };
}

// Keyboard Component (alias for VirtualKeyboard)
function uxKeyboard(options = {}) {
  return uxOnscreenKeyboard(options);
}

// Order Ticket Component
function uxOrderTicket(options = {}) {
  return {
    items: options.items || [],
    status: options.status || 'pending',
    number: options.number || '',

    get total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  };
}

// Leave Request Form Component
function uxLeaveRequestForm(options = {}) {
  return {
    type: options.type || '',
    startDate: options.startDate || null,
    endDate: options.endDate || null,
    reason: options.reason || '',

    submit() {
      this.$dispatch('submit', {
        type: this.type,
        startDate: this.startDate,
        endDate: this.endDate,
        reason: this.reason
      });
    }
  };
}

// Attendance List Component
function uxAttendanceList(options = {}) {
  return {
    employees: options.employees || [],
    date: options.date || new Date()
  };
}

// Collapsible Header Component
function uxCollapsibleHeader(options = {}) {
  return {
    collapsed: false,
    scrollY: 0,
    threshold: options.threshold || 100,

    init() {
      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY;
        this.collapsed = this.scrollY > this.threshold;
      });
    }
  };
}

// Scroll Progress Component
function uxScrollProgress(options = {}) {
  return {
    progress: 0,

    init() {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      });
    }
  };
}

// Scroll Top Component
function uxScrollTop(options = {}) {
  return {
    visible: false,
    threshold: options.threshold || 300,

    init() {
      window.addEventListener('scroll', () => {
        this.visible = window.scrollY > this.threshold;
      });
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}

// Virtual Scroll Component
function uxVirtualScroll(options = {}) {
  return uxVirtualList(options);
}

// Make functions globally available
window.uxModal = uxModal;
window.uxAlert = uxAlert;
window.uxAlertBanner = uxAlertBanner;
window.uxAccordion = uxAccordion;
window.uxTabs = uxTabs;
window.uxDropdown = uxDropdown;
window.uxSheet = uxSheet;
window.uxToast = uxToast;
window.uxPopover = uxPopover;
window.uxDrawer = uxDrawer;
window.uxPanel = uxPanel;
window.uxTooltip = uxTooltip;
window.uxSparkline = uxSparkline;
window.uxCurrencyInput = uxCurrencyInput;
window.uxRating = uxRating;
window.uxStepper = uxStepper;
window.uxToggle = uxToggle;
window.uxPassword = uxPassword;
window.uxCheckboxGroup = uxCheckboxGroup;
window.uxRadioGroup = uxRadioGroup;
window.uxSelect = uxSelect;
window.uxCarousel = uxCarousel;
window.uxLightbox = uxLightbox;
window.uxCalendar = uxCalendar;
window.uxDatetime = uxDatetime;
window.uxSegment = uxSegment;
window.uxUpload = uxUpload;
window.uxSearch = uxSearch;
window.uxNotification = uxNotification;
window.uxProgress = uxProgress;
window.uxPagination = uxPagination;
window.uxTagInput = uxTagInput;
window.uxOtpInput = uxOtpInput;
window.uxRange = uxRange;
window.uxAutocomplete = uxAutocomplete;
window.uxColorPicker = uxColorPicker;
window.uxSignaturePad = uxSignaturePad;
window.uxPhoneInput = uxPhoneInput;
window.uxVirtualKeyboard = uxVirtualKeyboard;
window.uxGauge = uxGauge;
window.uxTimer = uxTimer;
window.uxCountdown = uxCountdown;
window.uxFullscreenModal = uxFullscreenModal;
window.uxToastManager = uxToastManager;
window.uxMultiSelect = uxMultiSelect;
window.uxSearchSelect = uxSearchSelect;
window.uxSplitButton = uxSplitButton;
window.uxCalendarFull = uxCalendarFull;
window.uxCalendarView = uxCalendarView;
window.uxDatatable = uxDatatable;

// Additional components
window.uxProgressCircle = uxProgressCircle;
window.uxProgressSteps = uxProgressSteps;
window.uxQRCode = uxQRCode;
window.uxNumpad = uxNumpad;
window.uxChart = uxChart;
window.uxTimeClock = uxTimeClock;
window.uxPerformanceMeter = uxPerformanceMeter;
window.uxAudioPlayer = uxAudioPlayer;
window.uxVariantSelector = uxVariantSelector;
window.uxTree = uxTree;
window.uxRichText = uxRichText;
window.uxQuantityStepper = uxQuantityStepper;
window.uxImg = uxImg;
window.uxSkeleton = uxSkeleton;
window.uxCodeBlock = uxCodeBlock;
window.uxJsonViewer = uxJsonViewer;
window.uxFab = uxFab;
window.uxMenu = uxMenu;
window.uxContextMenu = uxContextMenu;
window.uxMegaMenu = uxMegaMenu;
window.uxNavbar = uxNavbar;
window.uxBreadcrumbs = uxBreadcrumbs;
window.uxBackButton = uxBackButton;
window.uxLoading = uxLoading;
window.uxLoadMore = uxLoadMore;
window.uxPicker = uxPicker;
window.uxBanner = uxBanner;
window.uxCallout = uxCallout;
window.uxChip = uxChip;
window.uxChipGroup = uxChipGroup;
window.uxTagGroup = uxTagGroup;
window.uxButtonGroup = uxButtonGroup;
window.uxSearchbar = uxSearchbar;
window.uxTextarea = uxTextarea;
window.uxSection = uxSection;
window.uxContent = uxContent;
window.uxShell = uxShell;
window.uxSplitPane = uxSplitPane;
window.uxSplitPaneRight = uxSplitPaneRight;
window.uxMasterDetail = uxMasterDetail;
window.uxDashboardGrid = uxDashboardGrid;
window.uxKanban = uxKanban;
window.uxTimeline = uxTimeline;
window.uxStockIndicator = uxStockIndicator;
window.uxQuantityBadge = uxQuantityBadge;
window.uxStatsCard = uxStatsCard;
window.uxVideoPlayer = uxVideoPlayer;
window.uxImageGallery = uxImageGallery;
window.uxImageZoom = uxImageZoom;
window.uxImageCrop = uxImageCrop;
window.uxShiftCalendar = uxShiftCalendar;
window.uxWorkOrder = uxWorkOrder;
window.uxMachineStatus = uxMachineStatus;
window.uxProductionLine = uxProductionLine;
window.uxQualityCheck = uxQualityCheck;
window.uxCalculator = uxCalculator;
window.uxCart = uxCart;
window.uxPayment = uxPayment;
window.uxReceipt = uxReceipt;
window.uxProductCard = uxProductCard;
window.uxCategoryTabs = uxCategoryTabs;
window.uxOnscreenKeyboard = uxOnscreenKeyboard;
window.uxPdfViewer = uxPdfViewer;
window.uxCommand = uxCommand;
window.uxNotificationCenter = uxNotificationCenter;
window.uxDualRange = uxDualRange;
window.uxDateRangePicker = uxDateRangePicker;
window.uxSwipeItem = uxSwipeItem;
window.uxRefresher = uxRefresher;
window.uxReorder = uxReorder;
window.uxVirtualList = uxVirtualList;
window.uxMasonry = uxMasonry;
window.uxDiffViewer = uxDiffViewer;
window.uxFormWizard = uxFormWizard;
window.uxOrgChart = uxOrgChart;
window.uxBarcodeScanner = uxBarcodeScanner;
window.uxBatchTracker = uxBatchTracker;
window.uxBomTree = uxBomTree;
window.uxGantt = uxGantt;
window.uxScheduler = uxScheduler;
window.uxPWA = uxPWA;
window.uxElectron = uxElectron;
window.uxPage = uxPage;
window.uxPanelDetail = uxPanelDetail;
window.uxPanelGroup = uxPanelGroup;
window.uxPinpad = uxPinpad;
window.uxKeyboard = uxKeyboard;
window.uxOrderTicket = uxOrderTicket;
window.uxLeaveRequestForm = uxLeaveRequestForm;
window.uxAttendanceList = uxAttendanceList;
window.uxCollapsibleHeader = uxCollapsibleHeader;
window.uxScrollProgress = uxScrollProgress;
window.uxScrollTop = uxScrollTop;
window.uxVirtualScroll = uxVirtualScroll;
