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
    width: options.width || 100,
    height: options.height || 30,
    padding: options.padding || 4,
    showDots: options.showDots || false,
    showLastDot: options.showLastDot !== false,
    showArea: options.showArea || false,
    showReference: options.showReference || false,
    referenceValue: options.referenceValue || null,
    smooth: options.smooth !== false,
    animated: options.animated || false,
    barGap: options.barGap || 2,
    showValue: options.showValue || false,
    showChange: options.showChange || false,

    // Icons for change indicators
    icons: {
      up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18,15 12,9 6,15"/></svg>',
      down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>',
      neutral: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>'
    },

    get points() {
      if (this.data.length === 0) return [];
      const data = this.data;
      const max = Math.max(...data);
      const min = Math.min(...data);
      const range = max - min || 1;
      const usableWidth = this.width - (this.padding * 2);
      const usableHeight = this.height - (this.padding * 2);
      const step = data.length > 1 ? usableWidth / (data.length - 1) : 0;

      return data.map((value, i) => ({
        x: this.padding + (i * step),
        y: this.padding + usableHeight - ((value - min) / range) * usableHeight,
        value
      }));
    },

    get linePath() {
      const pts = this.points;
      if (pts.length < 2) return '';

      if (this.smooth) {
        return this._smoothPath(pts);
      }
      return 'M ' + pts.map(p => `${p.x},${p.y}`).join(' L ');
    },

    get areaPath() {
      const pts = this.points;
      if (pts.length < 2) return '';
      const baseline = this.height - this.padding;
      const linePart = this.smooth ? this._smoothPath(pts) : 'M ' + pts.map(p => `${p.x},${p.y}`).join(' L ');
      return `${linePart} L ${pts[pts.length - 1].x},${baseline} L ${pts[0].x},${baseline} Z`;
    },

    get bars() {
      if (this.data.length === 0) return [];
      const data = this.data;
      const absMax = Math.max(...data.map(Math.abs));
      const usableWidth = this.width - (this.padding * 2);
      const usableHeight = this.height - (this.padding * 2);
      const barWidth = (usableWidth - (this.barGap * (data.length - 1))) / data.length;
      const hasNegative = data.some(v => v < 0);
      const baseline = hasNegative ? this.height / 2 : this.height - this.padding;

      return data.map((value, i) => {
        const isNegative = value < 0;
        const absValue = Math.abs(value);
        const barHeight = (absValue / absMax) * (hasNegative ? usableHeight / 2 : usableHeight);
        return {
          x: this.padding + (i * (barWidth + this.barGap)),
          y: isNegative ? baseline : baseline - barHeight,
          width: barWidth,
          height: barHeight,
          value,
          isNegative
        };
      });
    },

    get currentValue() {
      return this.data.length > 0 ? this.data[this.data.length - 1] : 0;
    },

    get firstValue() {
      return this.data.length > 0 ? this.data[0] : 0;
    },

    get minValue() {
      return this.data.length > 0 ? Math.min(...this.data) : 0;
    },

    get maxValue() {
      return this.data.length > 0 ? Math.max(...this.data) : 0;
    },

    get average() {
      if (this.data.length === 0) return 0;
      return this.data.reduce((a, b) => a + b, 0) / this.data.length;
    },

    get change() {
      if (this.data.length < 2 || this.firstValue === 0) return 0;
      return ((this.currentValue - this.firstValue) / Math.abs(this.firstValue)) * 100;
    },

    get changeType() {
      if (this.change > 0.5) return 'positive';
      if (this.change < -0.5) return 'negative';
      return 'neutral';
    },

    get referenceY() {
      const refValue = this.referenceValue !== null ? this.referenceValue : this.average;
      const max = Math.max(...this.data);
      const min = Math.min(...this.data);
      const range = max - min || 1;
      const usableHeight = this.height - (this.padding * 2);
      return this.padding + usableHeight - ((refValue - min) / range) * usableHeight;
    },

    _smoothPath(pts) {
      if (pts.length < 2) return '';
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const x0 = pts[i].x;
        const y0 = pts[i].y;
        const x1 = pts[i + 1].x;
        const y1 = pts[i + 1].y;
        const cx = (x0 + x1) / 2;
        d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
      }
      return d;
    },

    setData(newData) {
      this.data = newData;
    },

    addPoint(value) {
      this.data.push(value);
    },

    formatValue(value) {
      if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
      if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
      return value.toLocaleString();
    },

    formatChange(value) {
      const sign = value > 0 ? '+' : '';
      return `${sign}${value.toFixed(1)}%`;
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
// Form Stepper / Wizard Component
// ========================================
function uxStepper(options = {}) {
  return {
    currentStep: options.currentStep || options.initialStep || 0,
    totalSteps: options.totalSteps || options.steps || 4,
    completedSteps: new Set(options.completedSteps || []),
    allowSkip: options.allowSkip || false,
    linear: options.linear !== false,  // Default to linear (must complete in order)

    init() {
      // Mark previous steps as completed if starting mid-way
      if (this.currentStep > 0) {
        for (let i = 0; i < this.currentStep; i++) {
          this.completedSteps.add(i);
        }
      }
    },

    // Navigation
    next() {
      if (this.currentStep < this.totalSteps - 1) {
        this.complete(this.currentStep);
        this.currentStep++;
        this.$dispatch('stepper:next', { step: this.currentStep });
        this.$dispatch('stepper:change', { step: this.currentStep });
      }
    },

    prev() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.$dispatch('stepper:prev', { step: this.currentStep });
        this.$dispatch('stepper:change', { step: this.currentStep });
      }
    },

    goTo(index) {
      // In linear mode, can only go to completed steps or next step
      if (this.linear && !this.allowSkip) {
        if (index > this.currentStep && !this.isCompleted(this.currentStep)) {
          return; // Can't skip ahead without completing current
        }
        if (index > this.currentStep + 1 && !this.isCompleted(index - 1)) {
          return; // Can't skip multiple steps
        }
      }

      if (index >= 0 && index < this.totalSteps) {
        this.currentStep = index;
        this.$dispatch('stepper:goto', { step: index });
        this.$dispatch('stepper:change', { step: this.currentStep });
      }
    },

    // Step completion
    complete(index) {
      const stepIndex = index !== undefined ? index : this.currentStep;
      this.completedSteps.add(stepIndex);
      this.$dispatch('stepper:complete', { step: stepIndex });
    },

    uncomplete(index) {
      this.completedSteps.delete(index);
    },

    // State checks
    isCompleted(index) {
      return this.completedSteps.has(index);
    },

    isCurrent(index) {
      return this.currentStep === index;
    },

    isActive(index) {
      return index <= this.currentStep;
    },

    canGoTo(index) {
      if (!this.linear || this.allowSkip) return true;
      return index <= this.currentStep || this.isCompleted(index - 1);
    },

    get isFirst() {
      return this.currentStep === 0;
    },

    get isLast() {
      return this.currentStep === this.totalSteps - 1;
    },

    get progress() {
      return (this.currentStep / (this.totalSteps - 1)) * 100;
    },

    get progressWidth() {
      // Calculate width as percentage string
      const percent = this.totalSteps > 1
        ? (this.currentStep / (this.totalSteps - 1)) * 100
        : 0;
      return `${percent}%`;
    },

    // CSS classes helper
    getStepClasses(index) {
      return {
        'ux-stepper__step--completed': this.isCompleted(index),
        'ux-stepper__step--current': this.isCurrent(index),
        'ux-stepper__step--active': this.isActive(index),
        'ux-stepper__step--disabled': !this.canGoTo(index)
      };
    },

    // Reset stepper
    reset() {
      this.currentStep = 0;
      this.completedSteps.clear();
      this.$dispatch('stepper:reset');
    },

    // Finish the wizard
    finish() {
      this.complete(this.currentStep);
      this.$dispatch('stepper:finish', {
        completedSteps: Array.from(this.completedSteps)
      });
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
    // State
    isOpen: false,
    currentIndex: 0,
    images: options.images || [],
    loading: false,
    hideUI: false,
    enableZoom: options.enableZoom !== false,
    showThumbnails: options.showThumbnails !== false,

    // Zoom state
    zoom: 1,
    minZoom: 1,
    maxZoom: options.maxZoom || 4,
    panX: 0,
    panY: 0,
    isPanning: false,
    startX: 0,
    startY: 0,
    lastPanX: 0,
    lastPanY: 0,

    // UI auto-hide timer
    uiTimer: null,
    uiTimeout: options.uiTimeout || 3000,

    init() {
      // Auto-discover images from DOM if not provided
      if (this.images.length === 0) {
        this.discoverImages();
      }

      // Keyboard navigation
      this._keyHandler = (e) => {
        if (!this.isOpen) return;

        switch (e.key) {
          case 'Escape':
            this.close();
            break;
          case 'ArrowLeft':
            this.prev();
            break;
          case 'ArrowRight':
            this.next();
            break;
          case '+':
          case '=':
            this.zoomIn();
            break;
          case '-':
            this.zoomOut();
            break;
          case '0':
            this.resetZoom();
            break;
        }
      };
      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
      if (this.uiTimer) {
        clearTimeout(this.uiTimer);
      }
    },

    discoverImages() {
      const container = this.$el;
      const triggers = container.querySelectorAll('[data-lightbox-src], .ux-lightbox-trigger');

      this.images = Array.from(triggers).map(el => ({
        src: el.dataset.lightboxSrc || el.querySelector('img')?.src || '',
        thumbnail: el.dataset.lightboxThumb || el.querySelector('img')?.src || '',
        title: el.dataset.lightboxTitle || el.querySelector('img')?.alt || '',
        description: el.dataset.lightboxDesc || ''
      }));
    },

    // Computed properties
    get currentImage() {
      return this.images[this.currentIndex] || { src: '', title: '', description: '', thumbnail: '' };
    },

    get hasPrev() {
      return this.images.length > 1;
    },

    get hasNext() {
      return this.images.length > 1;
    },

    get zoomPercent() {
      return Math.round(this.zoom * 100);
    },

    // Methods
    open(index = 0) {
      this.currentIndex = Math.min(Math.max(0, index), this.images.length - 1);
      this.isOpen = true;
      this.loading = true;
      this.resetZoom();
      this.hideUI = false;
      this.startUITimer();
      document.body.style.overflow = 'hidden';

      // Preload image
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.onerror = () => {
        this.loading = false;
      };
      img.src = this.currentImage.src;

      this.$dispatch('lightbox:open', { index: this.currentIndex, image: this.currentImage });
    },

    close() {
      this.isOpen = false;
      this.resetZoom();
      document.body.style.overflow = '';

      if (this.uiTimer) {
        clearTimeout(this.uiTimer);
      }

      this.$dispatch('lightbox:close');
    },

    next() {
      if (this.images.length <= 1) return;

      this.loading = true;
      this.resetZoom();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;

      // Preload next image
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.src = this.currentImage.src;

      this.$dispatch('lightbox:change', { index: this.currentIndex, image: this.currentImage });
    },

    prev() {
      if (this.images.length <= 1) return;

      this.loading = true;
      this.resetZoom();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;

      // Preload prev image
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.src = this.currentImage.src;

      this.$dispatch('lightbox:change', { index: this.currentIndex, image: this.currentImage });
    },

    goTo(index) {
      if (index === this.currentIndex) return;
      if (index < 0 || index >= this.images.length) return;

      this.loading = true;
      this.resetZoom();
      this.currentIndex = index;

      // Preload image
      const img = new Image();
      img.onload = () => {
        this.loading = false;
      };
      img.src = this.currentImage.src;

      this.$dispatch('lightbox:change', { index: this.currentIndex, image: this.currentImage });
    },

    // Zoom methods
    zoomIn() {
      if (!this.enableZoom) return;
      this.zoom = Math.min(this.zoom + 0.5, this.maxZoom);
      this.startUITimer();
    },

    zoomOut() {
      if (!this.enableZoom) return;
      this.zoom = Math.max(this.zoom - 0.5, this.minZoom);
      if (this.zoom === this.minZoom) {
        this.panX = 0;
        this.panY = 0;
      }
      this.startUITimer();
    },

    resetZoom() {
      this.zoom = 1;
      this.panX = 0;
      this.panY = 0;
    },

    handleDoubleTap() {
      if (!this.enableZoom) return;

      if (this.zoom > 1) {
        this.resetZoom();
      } else {
        this.zoom = 2;
      }
      this.startUITimer();
    },

    // Pan methods
    startPan(event) {
      if (this.zoom <= 1) return;

      this.isPanning = true;
      const point = event.touches ? event.touches[0] : event;
      this.startX = point.clientX - this.panX;
      this.startY = point.clientY - this.panY;
      this.lastPanX = this.panX;
      this.lastPanY = this.panY;
    },

    pan(event) {
      if (!this.isPanning || this.zoom <= 1) return;

      event.preventDefault();
      const point = event.touches ? event.touches[0] : event;
      this.panX = point.clientX - this.startX;
      this.panY = point.clientY - this.startY;
    },

    endPan() {
      this.isPanning = false;
    },

    // UI visibility
    toggleUI() {
      this.hideUI = !this.hideUI;
      if (!this.hideUI) {
        this.startUITimer();
      }
    },

    startUITimer() {
      if (this.uiTimer) {
        clearTimeout(this.uiTimer);
      }
      this.hideUI = false;
      this.uiTimer = setTimeout(() => {
        if (this.isOpen) {
          this.hideUI = true;
        }
      }, this.uiTimeout);
    },

    handleBackdropClick(event) {
      // Only close if clicking the backdrop itself, not the image
      if (event.target === event.currentTarget) {
        this.close();
      }
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
  // Parse initial color
  function hexToHsl(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  const initialColor = options.value || '#3b82f6';
  const initialHsl = hexToHsl(initialColor);

  return {
    isOpen: false,
    value: initialColor,
    hue: initialHsl.h,
    saturation: initialHsl.s,
    lightness: initialHsl.l,
    alphaEnabled: options.alpha || false,
    alphaValue: 1,
    format: options.format || 'hex',
    presets: options.presets || [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
    ],
    inline: options.inline || false,
    closeOnSelect: options.closeOnSelect || false,
    _spectrumDragging: false,
    _hueDragging: false,
    _alphaDragging: false,

    get displayValue() {
      const hex = hslToHex(this.hue, this.saturation, this.lightness);
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);

      if (this.alphaEnabled && this.alphaValue < 1) {
        // Always show rgba when alpha is enabled and < 1
        return `rgba(${r}, ${g}, ${b}, ${this.alphaValue.toFixed(2)})`;
      }

      if (this.format === 'rgb') {
        return `rgb(${r}, ${g}, ${b})`;
      } else if (this.format === 'hsl') {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
      }
      return hex;
    },

    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$dispatch('colorpicker:open');
      } else {
        this.$dispatch('colorpicker:close');
      }
    },

    open() {
      this.isOpen = true;
      this.$dispatch('colorpicker:open');
    },

    close() {
      this.isOpen = false;
      this.$dispatch('colorpicker:close');
    },

    setValue(color) {
      const hsl = hexToHsl(color.startsWith('#') ? color : '#' + color);
      this.hue = hsl.h;
      this.saturation = hsl.s;
      this.lightness = hsl.l;
      this.value = color;
      this._emitChange();
      if (this.closeOnSelect) this.close();
    },

    setFromInput(value) {
      try {
        if (value.startsWith('#')) {
          this.setValue(value);
        } else if (value.startsWith('rgb')) {
          const match = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const hex = '#' + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
            this.setValue(hex);
          }
        } else if (value.startsWith('hsl')) {
          const match = value.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
          if (match) {
            this.hue = parseInt(match[1]);
            this.saturation = parseInt(match[2]);
            this.lightness = parseInt(match[3]);
            this._emitChange();
          }
        }
      } catch (e) {
        console.warn('Invalid color format');
      }
    },

    cycleFormat() {
      const formats = ['hex', 'rgb', 'hsl'];
      const idx = formats.indexOf(this.format);
      this.format = formats[(idx + 1) % formats.length];
    },

    onSpectrumMouseDown(event) {
      this._spectrumDragging = true;
      this._updateSpectrum(event);
      const onMove = (e) => this._updateSpectrum(e);
      const onUp = () => {
        this._spectrumDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    onSpectrumTouchStart(event) {
      this._spectrumDragging = true;
      this._updateSpectrum(event.touches[0]);
      const onMove = (e) => this._updateSpectrum(e.touches[0]);
      const onEnd = () => {
        this._spectrumDragging = false;
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
    },

    _updateSpectrum(event) {
      const rect = event.target.closest('.ux-color-picker__spectrum').getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      this.saturation = Math.round(x * 100);
      this.lightness = Math.round((1 - y) * 50);
      this._emitChange();
    },

    onHueMouseDown(event) {
      this._hueDragging = true;
      this._updateHue(event);
      const onMove = (e) => this._updateHue(e);
      const onUp = () => {
        this._hueDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    onHueTouchStart(event) {
      this._hueDragging = true;
      this._updateHue(event.touches[0]);
      const onMove = (e) => this._updateHue(e.touches[0]);
      const onEnd = () => {
        this._hueDragging = false;
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
    },

    _updateHue(event) {
      const rect = event.target.closest('.ux-color-picker__slider').getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      this.hue = Math.round(x * 360);
      this._emitChange();
    },

    // Alpha slider handlers
    onAlphaMouseDown(event) {
      this._alphaDragging = true;
      this._updateAlpha(event);
      const onMove = (e) => this._updateAlpha(e);
      const onUp = () => {
        this._alphaDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },

    onAlphaTouchStart(event) {
      this._alphaDragging = true;
      this._updateAlpha(event.touches[0]);
      const onMove = (e) => this._updateAlpha(e.touches[0]);
      const onEnd = () => {
        this._alphaDragging = false;
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onEnd);
    },

    _updateAlpha(event) {
      const rect = event.target.closest('.ux-color-picker__slider').getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      this.alphaValue = Math.round(x * 100) / 100;
      this._emitChange();
    },

    _emitChange() {
      this.value = this.displayValue;
      const hex = hslToHex(this.hue, this.saturation, this.lightness);
      this.$dispatch('colorpicker:change', {
        value: this.displayValue,
        hex: hex,
        hsl: { h: this.hue, s: this.saturation, l: this.lightness },
        alpha: this.alphaValue,
        format: this.format
      });
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
    hasSignature: false,
    history: [],
    showGuide: options.showGuide !== false,
    showPlaceholder: options.showPlaceholder !== false,
    placeholderText: options.placeholderText || 'Firme aquí',
    strokeColor: options.color || '#000',
    strokeWidth: options.lineWidth || 2,
    backgroundColor: options.backgroundColor || 'transparent',

    icons: {
      pen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
      undo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>',
      clear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
      download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
    },

    init() {
      this.canvas = this.$refs.canvas;
      if (!this.canvas) return;

      // Set canvas size to match container
      this.$nextTick(() => {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height || 200;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Save initial state
        this._saveState();
      });

      // Add event listeners
      this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
      this.canvas.addEventListener('mousemove', (e) => this.draw(e));
      this.canvas.addEventListener('mouseup', () => this.stopDrawing());
      this.canvas.addEventListener('mouseleave', () => this.stopDrawing());

      // Touch events
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.startDrawing(e);
      });
      this.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        this.draw(e);
      });
      this.canvas.addEventListener('touchend', () => this.stopDrawing());
    },

    startDrawing(event) {
      this.isDrawing = true;
      const { x, y } = this._getPosition(event);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    },

    draw(event) {
      if (!this.isDrawing) return;
      const { x, y } = this._getPosition(event);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    },

    stopDrawing() {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.hasSignature = true;
        this._saveState();
        this.$dispatch('signature:change', { hasSignature: this.hasSignature });
      }
    },

    _getPosition(event) {
      const rect = this.canvas.getBoundingClientRect();
      const e = event.touches ? event.touches[0] : event;
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    },

    _saveState() {
      if (!this.canvas || !this.ctx) return;
      const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.history.push(imageData);
      // Limit history to 20 states
      if (this.history.length > 20) {
        this.history.shift();
      }
    },

    undo() {
      if (this.history.length <= 1) return;
      this.history.pop(); // Remove current state
      const prevState = this.history[this.history.length - 1];
      if (prevState) {
        this.ctx.putImageData(prevState, 0, 0);
      }
      // Check if canvas is empty after undo
      this.hasSignature = this.history.length > 1;
      this.$dispatch('signature:change', { hasSignature: this.hasSignature });
    },

    clear() {
      if (!this.canvas || !this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.hasSignature = false;
      this.history = [];
      this._saveState();
      this.$dispatch('signature:change', { hasSignature: false });
    },

    getSignature(type = 'image/png', quality = 1) {
      if (!this.canvas) return null;
      return this.canvas.toDataURL(type, quality);
    },

    toDataURL(type = 'image/png', quality = 1) {
      return this.getSignature(type, quality);
    },

    download(filename = 'signature.png') {
      const dataURL = this.getSignature();
      if (!dataURL) return;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataURL;
      link.click();
    },

    isEmpty() {
      return !this.hasSignature;
    }
  };
}

// ========================================
// Phone Input Component
// ========================================
function uxPhoneInput(options = {}) {
  // Country data
  const countries = [
    { code: 'ES', name: 'España', dial: '+34', flag: '🇪🇸' },
    { code: 'US', name: 'Estados Unidos', dial: '+1', flag: '🇺🇸' },
    { code: 'MX', name: 'México', dial: '+52', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
    { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
    { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
    { code: 'PE', name: 'Perú', dial: '+51', flag: '🇵🇪' },
    { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
    { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
    { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
    { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
    { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
    { code: 'BR', name: 'Brasil', dial: '+55', flag: '🇧🇷' },
    { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
    { code: 'FR', name: 'Francia', dial: '+33', flag: '🇫🇷' },
    { code: 'DE', name: 'Alemania', dial: '+49', flag: '🇩🇪' },
    { code: 'IT', name: 'Italia', dial: '+39', flag: '🇮🇹' },
    { code: 'GB', name: 'Reino Unido', dial: '+44', flag: '🇬🇧' },
    { code: 'CA', name: 'Canadá', dial: '+1', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'JP', name: 'Japón', dial: '+81', flag: '🇯🇵' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'KR', name: 'Corea del Sur', dial: '+82', flag: '🇰🇷' },
    { code: 'NL', name: 'Países Bajos', dial: '+31', flag: '🇳🇱' },
    { code: 'BE', name: 'Bélgica', dial: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Suiza', dial: '+41', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
    { code: 'SE', name: 'Suecia', dial: '+46', flag: '🇸🇪' },
    { code: 'NO', name: 'Noruega', dial: '+47', flag: '🇳🇴' },
    { code: 'DK', name: 'Dinamarca', dial: '+45', flag: '🇩🇰' },
    { code: 'FI', name: 'Finlandia', dial: '+358', flag: '🇫🇮' },
    { code: 'PL', name: 'Polonia', dial: '+48', flag: '🇵🇱' },
    { code: 'CZ', name: 'República Checa', dial: '+420', flag: '🇨🇿' },
    { code: 'GR', name: 'Grecia', dial: '+30', flag: '🇬🇷' },
    { code: 'IE', name: 'Irlanda', dial: '+353', flag: '🇮🇪' },
    { code: 'RU', name: 'Rusia', dial: '+7', flag: '🇷🇺' },
    { code: 'ZA', name: 'Sudáfrica', dial: '+27', flag: '🇿🇦' },
    { code: 'NZ', name: 'Nueva Zelanda', dial: '+64', flag: '🇳🇿' },
    { code: 'SG', name: 'Singapur', dial: '+65', flag: '🇸🇬' },
  ];

  const defaultCountry = options.defaultCountry || 'ES';
  const preferredCountries = options.preferredCountries || ['ES', 'US', 'MX'];

  // Sort countries: preferred first, then alphabetically
  const sortedCountries = [
    ...preferredCountries.map(code => countries.find(c => c.code === code)).filter(Boolean),
    ...countries.filter(c => !preferredCountries.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name))
  ];

  return {
    isOpen: false,
    phoneNumber: options.value || '',
    searchQuery: '',
    selectedCountry: countries.find(c => c.code === defaultCountry) || countries[0],
    countries: sortedCountries,
    showFlags: options.showFlags !== false,
    showDialCode: options.showDialCode !== false,
    searchable: options.searchable !== false,
    placeholder: options.placeholder || '600 000 000',
    disabled: options.disabled || false,

    arrowIcon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',

    get filteredCountries() {
      if (!this.searchQuery) return this.countries;
      const q = this.searchQuery.toLowerCase();
      return this.countries.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
      );
    },

    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
        this.$nextTick(() => {
          if (this.$refs.searchInput) this.$refs.searchInput.focus();
        });
      }
    },

    open() {
      this.isOpen = true;
      this.searchQuery = '';
    },

    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    selectCountry(country) {
      this.selectedCountry = country;
      this.isOpen = false;
      this.searchQuery = '';
      this.$dispatch('phone:countrychange', { country });
      this._emitChange();
      this.$nextTick(() => {
        if (this.$refs.phoneInput) this.$refs.phoneInput.focus();
      });
    },

    onPhoneInput(event) {
      this.phoneNumber = event.target.value;
      this._emitChange();
    },

    onKeyDown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },

    getFullNumber() {
      const digits = this.phoneNumber.replace(/\D/g, '');
      return this.selectedCountry.dial + digits;
    },

    getFormattedNumber() {
      const digits = this.phoneNumber.replace(/\D/g, '');
      return this.selectedCountry.dial + ' ' + digits;
    },

    isValid() {
      const digits = this.phoneNumber.replace(/\D/g, '');
      return digits.length >= 7 && digits.length <= 15;
    },

    clear() {
      this.phoneNumber = '';
      this._emitChange();
    },

    setValue(value, countryCode) {
      this.phoneNumber = value;
      if (countryCode) {
        const country = this.countries.find(c => c.code === countryCode);
        if (country) this.selectedCountry = country;
      }
      this._emitChange();
    },

    _emitChange() {
      this.$dispatch('phone:change', {
        number: this.phoneNumber,
        fullNumber: this.getFullNumber(),
        country: this.selectedCountry,
        isValid: this.isValid()
      });
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

// QR Code Component - Full implementation with QR code generation
function uxQRCode(options = {}) {
  // QR Code Generator - Pure JavaScript implementation
  const QRCodeGenerator = {
    // Error correction levels
    ECL: { L: 1, M: 0, Q: 3, H: 2 },

    // Mode indicators
    MODE: { NUMERIC: 1, ALPHANUMERIC: 2, BYTE: 4 },

    // Alphanumeric character set
    ALPHANUMERIC_CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./: ',

    // Error correction codewords and blocks for each version and level
    EC_BLOCKS: [
      null,
      // Version 1
      { L: [1, 26, 19], M: [1, 26, 16], Q: [1, 26, 13], H: [1, 26, 9] },
      // Version 2
      { L: [1, 44, 34], M: [1, 44, 28], Q: [1, 44, 22], H: [1, 44, 16] },
      // Version 3
      { L: [1, 70, 55], M: [1, 70, 44], Q: [2, 35, 17], H: [2, 35, 13] },
      // Version 4
      { L: [1, 100, 80], M: [2, 50, 32], Q: [2, 50, 24], H: [4, 25, 9] },
      // Version 5
      { L: [1, 134, 108], M: [2, 67, 43], Q: [2, 33, 15, 2, 34, 16], H: [2, 33, 11, 2, 34, 12] },
      // Version 6
      { L: [2, 86, 68], M: [4, 43, 27], Q: [4, 43, 19], H: [4, 43, 15] },
      // Version 7
      { L: [2, 98, 78], M: [4, 49, 31], Q: [2, 32, 14, 4, 33, 15], H: [4, 39, 13, 1, 40, 14] },
      // Version 8
      { L: [2, 121, 97], M: [2, 60, 38, 2, 61, 39], Q: [4, 40, 18, 2, 41, 19], H: [4, 40, 14, 2, 41, 15] },
      // Version 9
      { L: [2, 146, 116], M: [3, 58, 36, 2, 59, 37], Q: [4, 36, 16, 4, 37, 17], H: [4, 36, 12, 4, 37, 13] },
      // Version 10
      { L: [2, 86, 68, 2, 87, 69], M: [4, 69, 43, 1, 70, 44], Q: [6, 43, 19, 2, 44, 20], H: [6, 43, 15, 2, 44, 16] }
    ],

    // Get the best mode for the data
    getMode(data) {
      if (/^[0-9]+$/.test(data)) return this.MODE.NUMERIC;
      if (/^[0-9A-Z $%*+\-./:]+$/.test(data.toUpperCase())) return this.MODE.ALPHANUMERIC;
      return this.MODE.BYTE;
    },

    // Get the minimum version needed for data
    getVersion(data, ecl) {
      const mode = this.getMode(data);
      const len = data.length;

      for (let v = 1; v <= 10; v++) {
        const capacity = this.getCapacity(v, ecl, mode);
        if (len <= capacity) return v;
      }
      return 10; // Max supported version in this implementation
    },

    // Get data capacity for version, ecl, and mode
    getCapacity(version, ecl, mode) {
      const blocks = this.EC_BLOCKS[version][ecl];
      let dataCodewords = 0;

      for (let i = 0; i < blocks.length; i += 3) {
        dataCodewords += blocks[i] * blocks[i + 2];
      }

      const dataBits = dataCodewords * 8;
      const charCountBits = version < 10 ? (mode === this.MODE.NUMERIC ? 10 : mode === this.MODE.ALPHANUMERIC ? 9 : 8) : 12;
      const usableBits = dataBits - 4 - charCountBits;

      if (mode === this.MODE.NUMERIC) return Math.floor(usableBits / 10) * 3;
      if (mode === this.MODE.ALPHANUMERIC) return Math.floor(usableBits / 11) * 2;
      return Math.floor(usableBits / 8);
    },

    // Encode data to binary string
    encodeData(data, version, ecl) {
      const mode = this.getMode(data);
      let bits = '';

      // Mode indicator (4 bits)
      bits += mode.toString(2).padStart(4, '0');

      // Character count indicator
      const ccBits = version < 10 ? (mode === this.MODE.NUMERIC ? 10 : mode === this.MODE.ALPHANUMERIC ? 9 : 8) : 12;
      bits += data.length.toString(2).padStart(ccBits, '0');

      // Encode data
      if (mode === this.MODE.NUMERIC) {
        for (let i = 0; i < data.length; i += 3) {
          const chunk = data.substr(i, 3);
          const numBits = chunk.length === 3 ? 10 : chunk.length === 2 ? 7 : 4;
          bits += parseInt(chunk, 10).toString(2).padStart(numBits, '0');
        }
      } else if (mode === this.MODE.ALPHANUMERIC) {
        const chars = this.ALPHANUMERIC_CHARS;
        const upper = data.toUpperCase();
        for (let i = 0; i < upper.length; i += 2) {
          if (i + 1 < upper.length) {
            const val = chars.indexOf(upper[i]) * 45 + chars.indexOf(upper[i + 1]);
            bits += val.toString(2).padStart(11, '0');
          } else {
            bits += chars.indexOf(upper[i]).toString(2).padStart(6, '0');
          }
        }
      } else {
        // Byte mode (UTF-8)
        const bytes = new TextEncoder().encode(data);
        for (const byte of bytes) {
          bits += byte.toString(2).padStart(8, '0');
        }
      }

      // Calculate total codewords needed
      const blocks = this.EC_BLOCKS[version][ecl];
      let totalDataCodewords = 0;
      for (let i = 0; i < blocks.length; i += 3) {
        totalDataCodewords += blocks[i] * blocks[i + 2];
      }
      const totalBits = totalDataCodewords * 8;

      // Add terminator (up to 4 zeros)
      const terminator = Math.min(4, totalBits - bits.length);
      bits += '0'.repeat(terminator);

      // Pad to byte boundary
      if (bits.length % 8 !== 0) {
        bits += '0'.repeat(8 - (bits.length % 8));
      }

      // Add pad bytes
      const padBytes = ['11101100', '00010001'];
      let padIndex = 0;
      while (bits.length < totalBits) {
        bits += padBytes[padIndex % 2];
        padIndex++;
      }

      return bits;
    },

    // Convert bit string to byte array
    bitsToBytes(bits) {
      const bytes = [];
      for (let i = 0; i < bits.length; i += 8) {
        bytes.push(parseInt(bits.substr(i, 8), 2));
      }
      return bytes;
    },

    // Reed-Solomon error correction
    getECCodewords(data, ecCodewords) {
      // Simplified RS encoding using polynomial division
      const gfExp = new Array(512);
      const gfLog = new Array(256);

      // Initialize Galois Field tables
      let x = 1;
      for (let i = 0; i < 255; i++) {
        gfExp[i] = x;
        gfLog[x] = i;
        x <<= 1;
        if (x & 0x100) x ^= 0x11d;
      }
      for (let i = 255; i < 512; i++) {
        gfExp[i] = gfExp[i - 255];
      }

      // Generate generator polynomial
      let gen = [1];
      for (let i = 0; i < ecCodewords; i++) {
        const newGen = new Array(gen.length + 1).fill(0);
        for (let j = 0; j < gen.length; j++) {
          newGen[j] ^= gen[j];
          newGen[j + 1] ^= gfExp[(gfLog[gen[j]] + i) % 255];
        }
        gen = newGen;
      }

      // Polynomial division
      const result = new Array(ecCodewords).fill(0);
      for (let i = 0; i < data.length; i++) {
        const coef = data[i] ^ result[0];
        result.shift();
        result.push(0);
        if (coef !== 0) {
          for (let j = 0; j < ecCodewords; j++) {
            if (gen[j + 1] !== 0) {
              result[j] ^= gfExp[(gfLog[gen[j + 1]] + gfLog[coef]) % 255];
            }
          }
        }
      }

      return result;
    },

    // Create the QR code matrix
    createMatrix(version) {
      const size = version * 4 + 17;
      const matrix = Array(size).fill(null).map(() => Array(size).fill(null));
      return matrix;
    },

    // Add finder patterns
    addFinderPatterns(matrix) {
      const size = matrix.length;
      const pattern = (x, y) => {
        for (let dy = -1; dy <= 7; dy++) {
          for (let dx = -1; dx <= 7; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
              if (dx === -1 || dx === 7 || dy === -1 || dy === 7) {
                matrix[ny][nx] = 0; // White separator
              } else if (dx === 0 || dx === 6 || dy === 0 || dy === 6 ||
                        (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)) {
                matrix[ny][nx] = 1; // Black
              } else {
                matrix[ny][nx] = 0; // White
              }
            }
          }
        }
      };

      pattern(0, 0);
      pattern(size - 7, 0);
      pattern(0, size - 7);
    },

    // Add timing patterns
    addTimingPatterns(matrix) {
      const size = matrix.length;
      for (let i = 8; i < size - 8; i++) {
        const val = i % 2 === 0 ? 1 : 0;
        if (matrix[6][i] === null) matrix[6][i] = val;
        if (matrix[i][6] === null) matrix[i][6] = val;
      }
    },

    // Add alignment patterns (for version >= 2)
    addAlignmentPatterns(matrix, version) {
      if (version < 2) return;

      const positions = this.getAlignmentPositions(version);
      const size = matrix.length;

      for (const y of positions) {
        for (const x of positions) {
          // Skip if overlapping with finder patterns
          if ((x < 8 && y < 8) || (x < 8 && y > size - 9) || (x > size - 9 && y < 8)) continue;

          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const val = (dx === 0 && dy === 0) || Math.abs(dx) === 2 || Math.abs(dy) === 2 ? 1 : 0;
              matrix[y + dy][x + dx] = val;
            }
          }
        }
      }
    },

    getAlignmentPositions(version) {
      if (version === 1) return [];
      const positions = [6];
      const size = version * 4 + 17;
      const last = size - 7;
      const step = Math.ceil((last - 6) / Math.ceil(version / 7 + 1));
      for (let pos = last; pos > 6; pos -= step) {
        positions.unshift(pos);
      }
      return positions;
    },

    // Reserve format information areas
    reserveFormatAreas(matrix, version) {
      const size = matrix.length;

      // Around top-left finder
      for (let i = 0; i < 9; i++) {
        if (matrix[8][i] === null) matrix[8][i] = 0;
        if (matrix[i][8] === null) matrix[i][8] = 0;
      }

      // Around top-right finder
      for (let i = 0; i < 8; i++) {
        if (matrix[8][size - 1 - i] === null) matrix[8][size - 1 - i] = 0;
      }

      // Around bottom-left finder
      for (let i = 0; i < 8; i++) {
        if (matrix[size - 1 - i][8] === null) matrix[size - 1 - i][8] = 0;
      }

      // Dark module
      matrix[size - 8][8] = 1;
    },

    // Place data in matrix
    placeData(matrix, bits) {
      const size = matrix.length;
      let bitIndex = 0;
      let up = true;

      for (let x = size - 1; x >= 1; x -= 2) {
        if (x === 6) x = 5; // Skip timing pattern column

        for (let y = up ? size - 1 : 0; up ? y >= 0 : y < size; y += up ? -1 : 1) {
          for (let dx = 0; dx <= 1; dx++) {
            const col = x - dx;
            if (matrix[y][col] === null) {
              matrix[y][col] = bitIndex < bits.length ? parseInt(bits[bitIndex], 10) : 0;
              bitIndex++;
            }
          }
        }
        up = !up;
      }
    },

    // Apply mask pattern
    applyMask(matrix, maskNum) {
      const size = matrix.length;
      const masked = matrix.map(row => [...row]);

      const masks = [
        (x, y) => (x + y) % 2 === 0,
        (x, y) => y % 2 === 0,
        (x, y) => x % 3 === 0,
        (x, y) => (x + y) % 3 === 0,
        (x, y) => (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
        (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
        (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
        (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0
      ];

      const mask = masks[maskNum];

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          // Only mask data areas (skip function patterns)
          if (this.isDataArea(x, y, size, matrix.length)) {
            if (mask(x, y)) {
              masked[y][x] ^= 1;
            }
          }
        }
      }

      return masked;
    },

    isDataArea(x, y, size) {
      // Finder patterns
      if (x < 9 && y < 9) return false;
      if (x < 9 && y > size - 9) return false;
      if (x > size - 9 && y < 9) return false;

      // Timing patterns
      if (x === 6 || y === 6) return false;

      return true;
    },

    // Add format information
    addFormatInfo(matrix, ecl, maskNum) {
      const eclBits = { L: 1, M: 0, Q: 3, H: 2 };
      const formatBits = (eclBits[ecl] << 3) | maskNum;

      // BCH error correction for format info
      let format = formatBits << 10;
      const generator = 0x537;
      for (let i = 4; i >= 0; i--) {
        if (format & (1 << (i + 10))) {
          format ^= generator << i;
        }
      }
      format = ((formatBits << 10) | format) ^ 0x5412;

      const size = matrix.length;

      // Place format bits
      const formatPos1 = [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]];
      const formatPos2 = [[size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8], [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]];

      for (let i = 0; i < 15; i++) {
        const bit = (format >> (14 - i)) & 1;
        matrix[formatPos1[i][1]][formatPos1[i][0]] = bit;
        matrix[formatPos2[i][0]][formatPos2[i][1]] = bit;
      }
    },

    // Generate the complete QR code
    generate(data, ecl = 'M') {
      if (!data) return null;

      const version = this.getVersion(data, ecl);
      const dataBits = this.encodeData(data, version, ecl);
      const dataBytes = this.bitsToBytes(dataBits);

      // Get error correction info
      const blocks = this.EC_BLOCKS[version][ecl];
      let ecCodewordsPerBlock = 0;
      let totalBlocks = 0;

      for (let i = 0; i < blocks.length; i += 3) {
        totalBlocks += blocks[i];
        ecCodewordsPerBlock = blocks[i + 1] - blocks[i + 2];
      }

      // Split data into blocks and calculate EC
      const dataBlocks = [];
      const ecBlocks = [];
      let dataIndex = 0;

      for (let i = 0; i < blocks.length; i += 3) {
        const numBlocks = blocks[i];
        const dataCodewords = blocks[i + 2];

        for (let j = 0; j < numBlocks; j++) {
          const block = dataBytes.slice(dataIndex, dataIndex + dataCodewords);
          dataBlocks.push(block);
          ecBlocks.push(this.getECCodewords(block, ecCodewordsPerBlock));
          dataIndex += dataCodewords;
        }
      }

      // Interleave data and EC codewords
      let finalBits = '';
      const maxDataLen = Math.max(...dataBlocks.map(b => b.length));
      const maxEcLen = ecCodewordsPerBlock;

      for (let i = 0; i < maxDataLen; i++) {
        for (const block of dataBlocks) {
          if (i < block.length) {
            finalBits += block[i].toString(2).padStart(8, '0');
          }
        }
      }

      for (let i = 0; i < maxEcLen; i++) {
        for (const block of ecBlocks) {
          if (i < block.length) {
            finalBits += block[i].toString(2).padStart(8, '0');
          }
        }
      }

      // Create and fill matrix
      const matrix = this.createMatrix(version);
      this.addFinderPatterns(matrix);
      this.addTimingPatterns(matrix);
      this.addAlignmentPatterns(matrix, version);
      this.reserveFormatAreas(matrix, version);
      this.placeData(matrix, finalBits);

      // Apply best mask (simplified: use mask 0)
      const maskedMatrix = this.applyMask(matrix, 0);
      this.addFormatInfo(maskedMatrix, ecl, 0);

      return maskedMatrix;
    }
  };

  return {
    value: options.value || '',
    size: options.size || 200,
    errorCorrection: options.errorCorrection || 'M',
    foreground: options.foreground || '#000000',
    background: options.background || '#ffffff',
    margin: options.margin || 4,
    logo: options.logo || null,
    logoSize: options.logoSize || 0.2,
    loading: true,
    error: null,

    icons: {
      download: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
      copy: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    },

    init() {
      this.$nextTick(() => {
        this.generate();
      });
    },

    generate() {
      this.loading = true;
      this.error = null;

      try {
        const canvas = this.$refs.canvas;
        if (!canvas) {
          this.loading = false;
          return;
        }

        const ctx = canvas.getContext('2d');
        const matrix = QRCodeGenerator.generate(this.value, this.errorCorrection);

        if (!matrix) {
          this.error = 'Failed to generate QR code';
          this.loading = false;
          return;
        }

        const moduleCount = matrix.length;
        const moduleSize = Math.floor((this.size - this.margin * 2) / moduleCount);
        const actualSize = moduleSize * moduleCount + this.margin * 2;

        canvas.width = actualSize;
        canvas.height = actualSize;

        // Draw background
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, actualSize, actualSize);

        // Draw modules
        ctx.fillStyle = this.foreground;
        for (let y = 0; y < moduleCount; y++) {
          for (let x = 0; x < moduleCount; x++) {
            if (matrix[y][x]) {
              ctx.fillRect(
                this.margin + x * moduleSize,
                this.margin + y * moduleSize,
                moduleSize,
                moduleSize
              );
            }
          }
        }

        // Add logo if provided
        if (this.logo) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const logoActualSize = actualSize * this.logoSize;
            const logoX = (actualSize - logoActualSize) / 2;
            const logoY = (actualSize - logoActualSize) / 2;

            // White background for logo
            ctx.fillStyle = this.background;
            ctx.fillRect(logoX - 4, logoY - 4, logoActualSize + 8, logoActualSize + 8);

            ctx.drawImage(img, logoX, logoY, logoActualSize, logoActualSize);
          };
          img.src = this.logo;
        }

        this.loading = false;
        this.$dispatch('qr:generated', { value: this.value });

      } catch (err) {
        this.error = err.message || 'Error generating QR code';
        this.loading = false;
      }
    },

    setValue(value) {
      this.value = value;
      this.generate();
    },

    download(filename = 'qrcode') {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      this.$dispatch('qr:download', { filename });
    },

    async copyToClipboard() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;

      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        this.$dispatch('qr:copied');
      } catch (err) {
        // Fallback: copy data URL as text
        try {
          await navigator.clipboard.writeText(canvas.toDataURL('image/png'));
          this.$dispatch('qr:copied');
        } catch (e) {
          console.error('Failed to copy QR code:', e);
        }
      }
    },

    getDataURL(type = 'image/png', quality = 1) {
      const canvas = this.$refs.canvas;
      return canvas ? canvas.toDataURL(type, quality) : null;
    },

    getBlob(type = 'image/png', quality = 1) {
      return new Promise((resolve) => {
        const canvas = this.$refs.canvas;
        if (canvas) {
          canvas.toBlob(resolve, type, quality);
        } else {
          resolve(null);
        }
      });
    }
  };
}

// Numpad Component - Full implementation with all features
function uxNumpad(options = {}) {
  return {
    value: options.value || '',
    maxLength: options.maxLength || 12,
    allowDecimal: options.allowDecimal !== false,
    decimals: options.decimals || 2,
    currency: options.currency || '$',
    quickAmounts: options.quickAmounts || [],
    pinMode: options.pinMode || false,
    pinLength: options.pinLength || 4,
    pinMask: options.pinMask !== false,

    icons: {
      backspace: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>',
      check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      clear: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    },

    get displayValue() {
      if (!this.value) return '0';

      if (this.pinMode && this.pinMask) {
        return '•'.repeat(this.value.length);
      }

      // Format with decimals
      if (this.allowDecimal && this.value.includes('.')) {
        const [whole, dec] = this.value.split('.');
        const formattedWhole = this.formatNumber(whole || '0');
        return `${formattedWhole}.${dec}`;
      }

      return this.formatNumber(this.value);
    },

    get numericValue() {
      return parseFloat(this.value) || 0;
    },

    formatNumber(numStr) {
      if (!numStr) return '0';
      return parseInt(numStr, 10).toLocaleString();
    },

    getIcon(name) {
      return this.icons[name] || '';
    },

    appendDigit(digit) {
      // PIN mode: check length
      if (this.pinMode && this.value.length >= this.pinLength) {
        return;
      }

      // Check max length
      if (this.value.length >= this.maxLength) {
        return;
      }

      // Don't allow leading zeros for non-decimal values
      if (this.value === '0' && digit === '0' && !this.allowDecimal) {
        return;
      }

      // Replace leading zero
      if (this.value === '0' && digit !== '0' && !this.value.includes('.')) {
        this.value = digit;
      } else {
        // Check decimal precision
        if (this.value.includes('.')) {
          const decimalPart = this.value.split('.')[1];
          if (decimalPart && decimalPart.length >= this.decimals) {
            return;
          }
        }
        this.value += digit;
      }

      this.$dispatch('numpad-change', { value: this.value, numericValue: this.numericValue });

      // Auto-submit PIN when complete
      if (this.pinMode && this.value.length === this.pinLength) {
        this.$nextTick(() => {
          this.submit();
        });
      }
    },

    appendDecimal() {
      if (!this.allowDecimal || this.pinMode) return;

      if (!this.value.includes('.')) {
        if (!this.value) {
          this.value = '0.';
        } else {
          this.value += '.';
        }
        this.$dispatch('numpad-change', { value: this.value, numericValue: this.numericValue });
      }
    },

    backspace() {
      if (this.value.length > 0) {
        this.value = this.value.slice(0, -1);
        this.$dispatch('numpad-change', { value: this.value, numericValue: this.numericValue });
      }
    },

    clear() {
      this.value = '';
      this.$dispatch('numpad-change', { value: this.value, numericValue: 0 });
    },

    setQuickAmount(amount) {
      this.value = amount.toString();
      this.$dispatch('numpad-change', { value: this.value, numericValue: amount });
    },

    submit() {
      this.$dispatch('numpad-submit', {
        value: this.value,
        numericValue: this.numericValue
      });
    },

    // PIN mode helpers
    getPinDots() {
      const dots = [];
      for (let i = 0; i < this.pinLength; i++) {
        dots.push(i < this.value.length);
      }
      return dots;
    }
  };
}

// Pinpad Component - Dedicated PIN entry component
function uxPinpad(options = {}) {
  return {
    length: options.length || 4,
    label: options.label || 'Enter PIN',
    hint: options.hint || '',
    loadingText: options.loadingText || 'Verifying...',
    pin: '',
    loading: false,
    errorMessage: '',
    successState: false,

    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'backspace'],

    getBackspaceIcon() {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>';
    },

    getDotClass(index) {
      const classes = [];
      if (index < this.pin.length) {
        classes.push('ux-pinpad__dot--filled');
      }
      if (this.errorMessage) {
        classes.push('ux-pinpad__dot--error');
      }
      if (this.successState) {
        classes.push('ux-pinpad__dot--success');
      }
      return classes.join(' ');
    },

    handleKey(key) {
      if (this.loading) return;

      // Clear error state on input
      if (this.errorMessage) {
        this.errorMessage = '';
      }

      if (key === 'backspace') {
        this.pin = this.pin.slice(0, -1);
      } else if (key !== '' && this.pin.length < this.length) {
        this.pin += key;

        // Auto-submit when PIN is complete
        if (this.pin.length === this.length) {
          this.$nextTick(() => {
            this.$dispatch('pinpad-submit', { pin: this.pin });
          });
        }
      }
    },

    setLoading(state) {
      this.loading = state;
    },

    setError(message) {
      this.loading = false;
      this.errorMessage = message;
      this.pin = '';
      this.successState = false;
    },

    setSuccess() {
      this.loading = false;
      this.errorMessage = '';
      this.successState = true;
    },

    reset() {
      this.pin = '';
      this.loading = false;
      this.errorMessage = '';
      this.successState = false;
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
    value: options.value ?? 1,
    min: options.min ?? 0,
    max: options.max ?? Infinity,
    step: options.step || 1,
    disabled: options.disabled || false,
    _holdInterval: null,
    _holdTimeout: null,

    // Icons
    minusIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    plusIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',

    get isAtMin() {
      return this.value <= this.min;
    },

    get isAtMax() {
      return this.value >= this.max;
    },

    get canIncrement() {
      return !this.disabled && this.value + this.step <= this.max;
    },

    get canDecrement() {
      return !this.disabled && this.value - this.step >= this.min;
    },

    increment() {
      if (this.canIncrement) {
        this.value = Math.min(this.max, this.value + this.step);
        this._emitChange();
      }
    },

    decrement() {
      if (this.canDecrement) {
        this.value = Math.max(this.min, this.value - this.step);
        this._emitChange();
      }
    },

    setValue(val) {
      const num = parseFloat(val);
      if (isNaN(num)) return;
      this.value = Math.min(this.max, Math.max(this.min, num));
      this._emitChange();
    },

    // Hold-to-repeat functionality
    onIncrementStart(event) {
      event.preventDefault();
      this.increment();
      this._startHold(() => this.increment());
    },

    onDecrementStart(event) {
      event.preventDefault();
      this.decrement();
      this._startHold(() => this.decrement());
    },

    onPressEnd() {
      this._stopHold();
    },

    _startHold(action) {
      this._stopHold();
      // Start repeating after 400ms, then every 100ms
      this._holdTimeout = setTimeout(() => {
        this._holdInterval = setInterval(action, 100);
      }, 400);
    },

    _stopHold() {
      if (this._holdTimeout) {
        clearTimeout(this._holdTimeout);
        this._holdTimeout = null;
      }
      if (this._holdInterval) {
        clearInterval(this._holdInterval);
        this._holdInterval = null;
      }
    },

    // Input handlers
    onInput(event) {
      // Allow typing, validation happens on blur
      const val = event.target.value;
      if (val === '' || val === '-') return;
      const num = parseFloat(val);
      if (!isNaN(num)) {
        this.value = num;
      }
    },

    onBlur(event) {
      // Clamp value on blur
      const num = parseFloat(event.target.value);
      if (isNaN(num)) {
        this.value = this.min;
      } else {
        this.value = Math.min(this.max, Math.max(this.min, num));
      }
      event.target.value = this.value;
      this._emitChange();
    },

    onKeydown(event) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.increment();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.decrement();
      } else if (event.key === 'Enter') {
        event.target.blur();
      }
    },

    _emitChange() {
      this.$dispatch('quantity-change', { value: this.value });
      this.$dispatch('change', { value: this.value });
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

// Fab Component - Speed Dial FAB
function uxFab(options = {}) {
  return {
    isOpen: false,
    hidden: false,
    hideOnScroll: options.hideOnScroll || false,
    threshold: options.threshold || 50,
    _lastScrollY: 0,

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    handleScroll(y) {
      if (!this.hideOnScroll) return;

      if (y > this._lastScrollY && y > this.threshold) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
      this._lastScrollY = y;
    },

    handleAction(fn) {
      if (typeof fn === 'function') fn();
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
    isOpen: false,
    activeCategory: null,
    categories: options.categories || [],
    openOnHover: options.openOnHover || false,
    hoverDelay: options.hoverDelay || 150,
    closeOnClickOutside: options.closeOnClickOutside !== false,
    closeOnEscape: options.closeOnEscape !== false,
    _hoverTimeout: null,

    init() {
      // Close on click outside
      if (this.closeOnClickOutside) {
        document.addEventListener('click', (e) => {
          if (this.isOpen && !this.$el.contains(e.target)) {
            this.close();
          }
        });
      }

      // Close on Escape
      if (this.closeOnEscape) {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.close();
          }
        });
      }
    },

    open() {
      this.isOpen = true;
      this.$dispatch('megamenu:open');
    },

    close() {
      this.isOpen = false;
      this.activeCategory = null;
      this.$dispatch('megamenu:close');
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    handleMouseEnter() {
      if (!this.openOnHover) return;
      if (this._hoverTimeout) clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.open(), this.hoverDelay);
    },

    handleMouseLeave() {
      if (!this.openOnHover) return;
      if (this._hoverTimeout) clearTimeout(this._hoverTimeout);
      this._hoverTimeout = setTimeout(() => this.close(), this.hoverDelay);
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

// Picker Component - iOS-style wheel picker
function uxPicker(options = {}) {
  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;

  return {
    isOpen: false,
    title: options.title || '',
    columns: options.columns || [],
    selectedIndexes: [],
    _columnStates: {},
    _initialIndexes: [],

    init() {
      // Initialize selectedIndexes from columns
      this.selectedIndexes = this.columns.map(col => col.selectedIndex || 0);
      this._initialIndexes = [...this.selectedIndexes];

      // Initialize column states for drag tracking
      this.columns.forEach((_, i) => {
        this._columnStates[i] = {
          isDragging: false,
          startY: 0,
          currentY: 0,
          startOffset: 0
        };
      });
    },

    open(opts) {
      if (opts) {
        if (opts.title) this.title = opts.title;
        if (opts.columns) {
          this.columns = opts.columns;
          this.selectedIndexes = this.columns.map(col => col.selectedIndex || 0);
        }
      }
      this._initialIndexes = [...this.selectedIndexes];
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    cancel() {
      // Restore initial values
      this.selectedIndexes = [...this._initialIndexes];
      this.$dispatch('picker-cancel');
      this.close();
    },

    confirm() {
      this._initialIndexes = [...this.selectedIndexes];
      const values = this.getValues();
      this.$dispatch('picker-confirm', { values, indexes: this.selectedIndexes });
      this.close();
    },

    getValues() {
      return this.columns.map((col, i) => {
        const option = col.options[this.selectedIndexes[i]];
        return typeof option === 'object' ? option.value || option.text : option;
      });
    },

    setValues(values) {
      values.forEach((value, colIndex) => {
        const col = this.columns[colIndex];
        if (col) {
          const index = col.options.findIndex(opt =>
            (typeof opt === 'object' ? (opt.value || opt.text) : opt) === value
          );
          if (index !== -1) {
            this.selectedIndexes[colIndex] = index;
          }
        }
      });
    },

    isSelected(colIndex, optIndex) {
      return this.selectedIndexes[colIndex] === optIndex;
    },

    selectItem(colIndex, optIndex) {
      this.selectedIndexes[colIndex] = optIndex;
      this.$dispatch('picker-change', {
        columnIndex: colIndex,
        optionIndex: optIndex,
        value: this.columns[colIndex].options[optIndex]
      });
    },

    scrollToIndex(colIndex, index, animate = true) {
      this.selectedIndexes[colIndex] = Math.max(0, Math.min(index, this.columns[colIndex].options.length - 1));
    },

    getColumnTransform(colIndex) {
      const state = this._columnStates[colIndex];
      const selectedIndex = this.selectedIndexes[colIndex];
      const centerOffset = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

      let offset = centerOffset - (selectedIndex * ITEM_HEIGHT);

      if (state && state.isDragging) {
        offset += state.currentY - state.startY;
      }

      return `translateY(${offset}px)`;
    },

    onTouchStart(e, colIndex) {
      const state = this._columnStates[colIndex];
      state.isDragging = true;
      state.startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      state.currentY = state.startY;
      state.startOffset = this.selectedIndexes[colIndex];

      if (e.type.includes('mouse')) {
        e.preventDefault();
      }
    },

    onTouchMove(e, colIndex) {
      const state = this._columnStates[colIndex];
      if (!state.isDragging) return;

      state.currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

      // Calculate new index based on drag distance
      const deltaY = state.currentY - state.startY;
      const deltaIndex = Math.round(-deltaY / ITEM_HEIGHT);
      const newIndex = state.startOffset + deltaIndex;
      const maxIndex = this.columns[colIndex].options.length - 1;

      this.selectedIndexes[colIndex] = Math.max(0, Math.min(newIndex, maxIndex));
    },

    onTouchEnd(e, colIndex) {
      const state = this._columnStates[colIndex];
      if (!state.isDragging) return;

      state.isDragging = false;

      // Dispatch change event
      this.$dispatch('picker-change', {
        columnIndex: colIndex,
        optionIndex: this.selectedIndexes[colIndex],
        value: this.columns[colIndex].options[this.selectedIndexes[colIndex]]
      });
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
    expanded: options.expanded !== false,  // Default to expanded
    collapsed: options.collapsed || false,  // Legacy support
    collapsible: options.collapsible !== false,  // Default to collapsible

    init() {
      // Sync legacy collapsed prop with expanded
      if (options.collapsed !== undefined) {
        this.expanded = !options.collapsed;
      }
    },

    toggle() {
      if (this.collapsible) {
        this.expanded = !this.expanded;
        this.collapsed = !this.expanded;
        this.$dispatch('section:toggle', { expanded: this.expanded });
      }
    },

    expand() {
      this.expanded = true;
      this.collapsed = false;
      this.$dispatch('section:expand');
    },

    collapse() {
      this.expanded = false;
      this.collapsed = true;
      this.$dispatch('section:collapse');
    },

    handleKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggle();
      }
    },

    get headerAriaAttrs() {
      return {
        'role': 'button',
        'tabindex': this.collapsible ? '0' : '-1',
        'aria-expanded': this.expanded ? 'true' : 'false'
      };
    },

    get sectionClasses() {
      return {
        'ux-section--expanded': this.expanded,
        'ux-section--collapsed': !this.expanded
      };
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
  const MOBILE_BREAKPOINT = options.breakpoint || 768;

  return {
    sidebarOpen: options.sidebarOpen || false,  // On mobile, sidebar overlay
    sidebarCollapsed: options.sidebarCollapsed || false,  // On desktop, collapsed state
    breakpoint: MOBILE_BREAKPOINT,

    init() {
      // Handle resize to close mobile sidebar when going to desktop
      this._handleResize = () => {
        if (window.innerWidth >= this.breakpoint) {
          this.sidebarOpen = false;
        }
      };
      window.addEventListener('resize', this._handleResize);
    },

    destroy() {
      window.removeEventListener('resize', this._handleResize);
    },

    get isMobile() {
      return window.innerWidth < this.breakpoint;
    },

    get shellClasses() {
      return {
        'ux-shell--sidebar-open': this.sidebarOpen,
        'ux-shell--sidebar-collapsed': this.sidebarCollapsed
      };
    },

    // Toggle sidebar (mobile: overlay, desktop: collapse)
    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = !this.sidebarOpen;
        this.$dispatch('shell:sidebar-toggle', { open: this.sidebarOpen });
      } else {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        this.$dispatch('shell:sidebar-collapse', { collapsed: this.sidebarCollapsed });
      }
    },

    // Open sidebar (mobile overlay)
    openSidebar() {
      this.sidebarOpen = true;
      this.$dispatch('shell:sidebar-open');
    },

    // Close sidebar (mobile overlay)
    closeSidebar() {
      this.sidebarOpen = false;
      this.$dispatch('shell:sidebar-close');
    },

    // Collapse/expand sidebar (desktop)
    collapseSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      this.$dispatch('shell:sidebar-collapse', { collapsed: this.sidebarCollapsed });
    },

    // Expand sidebar (desktop)
    expandSidebar() {
      this.sidebarCollapsed = false;
      this.$dispatch('shell:sidebar-expand');
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
  const MOBILE_BREAKPOINT = options.breakpoint || 992;

  return {
    isOpen: false,          // Overlay state (mobile)
    isCollapsed: options.collapsed || false,  // Collapsed state (desktop)
    breakpoint: MOBILE_BREAKPOINT,

    init() {
      // Listen for resize to handle responsive behavior
      this._handleResize = () => {
        if (window.innerWidth >= this.breakpoint) {
          // On desktop, close overlay
          this.isOpen = false;
        }
      };
      window.addEventListener('resize', this._handleResize);
    },

    destroy() {
      window.removeEventListener('resize', this._handleResize);
    },

    get isMobile() {
      return window.innerWidth < this.breakpoint;
    },

    get containerClasses() {
      return {
        'ux-split-pane-right--open': this.isOpen,
        'ux-split-pane-right--collapsed': this.isCollapsed
      };
    },

    toggle() {
      if (this.isMobile) {
        this.isOpen = !this.isOpen;
      } else {
        this.isCollapsed = !this.isCollapsed;
      }
      this.$dispatch('splitpaneright:toggle', { isOpen: this.isOpen, isCollapsed: this.isCollapsed });
    },

    open() {
      this.isOpen = true;
      this.$dispatch('splitpaneright:open');
    },

    close() {
      this.isOpen = false;
      this.$dispatch('splitpaneright:close');
    },

    show() {
      this.isCollapsed = false;
      this.$dispatch('splitpaneright:show');
    },

    hide() {
      this.isCollapsed = true;
      this.$dispatch('splitpaneright:hide');
    }
  };
}

// Master Detail Component
function uxMasterDetail(options = {}) {
  const MOBILE_BREAKPOINT = options.breakpoint || 768;

  return {
    selectedId: options.initialSelection || null,
    selectedItem: null,
    items: options.items || [],
    masterOpen: options.masterOpenByDefault || false,
    breakpoint: MOBILE_BREAKPOINT,

    init() {
      // Handle resize for responsive behavior
      this._handleResize = () => {
        if (window.innerWidth >= this.breakpoint) {
          this.masterOpen = false;
        }
      };
      window.addEventListener('resize', this._handleResize);

      // If initialSelection provided, select that item
      if (this.selectedId && this.items.length > 0) {
        this.selectedItem = this.items.find(i => i.id === this.selectedId);
      }
    },

    destroy() {
      window.removeEventListener('resize', this._handleResize);
    },

    get isMobile() {
      return window.innerWidth < this.breakpoint;
    },

    get containerClasses() {
      return {
        'ux-master-detail--master-open': this.masterOpen && this.isMobile,
        'ux-master-detail--has-selection': this.selectedId !== null
      };
    },

    // Select by ID
    select(id) {
      this.selectedId = id;
      this.selectedItem = this.items.find(i => i.id === id) || { id };
      // On mobile, close master when selecting
      if (this.isMobile) {
        this.masterOpen = false;
      }
      this.$dispatch('masterdetail:select', { id, item: this.selectedItem });
    },

    // Legacy method for selecting by item object
    selectItem(item) {
      this.selectedItem = item;
      this.selectedId = item?.id || null;
      if (this.isMobile) {
        this.masterOpen = false;
      }
      this.$dispatch('masterdetail:select', { id: this.selectedId, item });
    },

    // Check if item is selected
    isSelected(id) {
      return this.selectedId === id;
    },

    // Clear selection
    clearSelection() {
      this.selectedId = null;
      this.selectedItem = null;
    },

    // Toggle master panel (mobile)
    toggleMaster() {
      this.masterOpen = !this.masterOpen;
      this.$dispatch('masterdetail:toggle', { open: this.masterOpen });
    },

    // Open master panel (mobile)
    openMaster() {
      this.masterOpen = true;
      this.$dispatch('masterdetail:open');
    },

    // Close master panel (mobile)
    closeMaster() {
      this.masterOpen = false;
      this.$dispatch('masterdetail:close');
    },

    // Get selected item data
    getSelectedItem() {
      return this.selectedItem;
    },

    // Check if has selection
    get hasSelection() {
      return this.selectedId !== null;
    },

    get showDetail() {
      return this.selectedId !== null;
    }
  };
}

// Dashboard Grid Component
function uxDashboardGrid(options = {}) {
  return {
    items: options.items || options.widgets || [],
    columns: options.columns || 4,
    editing: false,
    _draggedIndex: null,
    _dragOverIndex: null,
    _nextItemId: 1000,

    init() {
      // Ensure all items have IDs
      this.items.forEach((item, i) => {
        if (!item.id) item.id = `widget-${i}`;
      });
    },

    // Toggle edit mode
    toggleEdit() {
      this.editing = !this.editing;
      if (!this.editing) {
        this.$dispatch('dashboard:save', { items: this.items });
      }
    },

    // Get grid columns class
    getGridClass() {
      return `ux-dashboard-grid--cols-${this.columns}`;
    },

    // Get item size class
    getItemSizeClass(size) {
      const sizeMap = {
        'sm': 'ux-dashboard-grid__item--sm',
        'md': 'ux-dashboard-grid__item--md',
        'lg': 'ux-dashboard-grid__item--lg',
        'full': 'ux-dashboard-grid__item--full',
        'half': 'ux-dashboard-grid__item--half'
      };
      return sizeMap[size] || sizeMap['sm'];
    },

    // Add new item
    addItem(item) {
      const newItem = {
        id: item.id || `widget-${this._nextItemId++}`,
        title: item.title || 'New Widget',
        size: item.size || 'sm',
        ...item
      };
      this.items.push(newItem);
      this.$dispatch('dashboard:add', { item: newItem });
    },

    // Remove item
    removeItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) {
        const removed = this.items.splice(index, 1)[0];
        this.$dispatch('dashboard:remove', { item: removed });
      }
    },

    // Resize item
    resizeItem(id, newSize) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.size = newSize;
        this.$dispatch('dashboard:resize', { item, size: newSize });
      }
    },

    // Move widget (for programmatic reorder)
    moveWidget(fromIndex, toIndex) {
      if (fromIndex === toIndex) return;
      const item = this.items.splice(fromIndex, 1)[0];
      this.items.splice(toIndex, 0, item);
      this.$dispatch('dashboard:move', { from: fromIndex, to: toIndex, item });
    },

    // Drag and drop handlers
    isDragging(index) {
      return this._draggedIndex === index;
    },

    isDragOver(index) {
      return this._dragOverIndex === index && this._draggedIndex !== index;
    },

    onDragStart(index, event) {
      if (!this.editing) return;
      this._draggedIndex = index;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index.toString());
      // Add dragging class after a small delay for visual feedback
      setTimeout(() => {
        if (event.target) {
          event.target.classList.add('ux-dashboard-grid__item--dragging');
        }
      }, 0);
    },

    onDragOver(index, event) {
      if (!this.editing || this._draggedIndex === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this._dragOverIndex = index;
    },

    onDragEnd(event) {
      this._draggedIndex = null;
      this._dragOverIndex = null;
      if (event.target) {
        event.target.classList.remove('ux-dashboard-grid__item--dragging');
      }
    },

    onDrop(targetIndex, event) {
      event.preventDefault();
      if (!this.editing || this._draggedIndex === null) return;

      const fromIndex = this._draggedIndex;
      if (fromIndex !== targetIndex) {
        this.moveWidget(fromIndex, targetIndex);
      }

      this._draggedIndex = null;
      this._dragOverIndex = null;
    },

    // Get item by ID
    getItem(id) {
      return this.items.find(item => item.id === id);
    },

    // Update item data
    updateItem(id, data) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        Object.assign(item, data);
        this.$dispatch('dashboard:update', { item });
      }
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
    // Configuration
    title: options.title || 'Quality Check',
    subtitle: options.subtitle || '',
    orderNumber: options.orderNumber || '',
    productName: options.productName || '',
    batchNumber: options.batchNumber || '',
    inspector: options.inspector || '',

    // Timestamps
    startedAt: new Date().toISOString(),
    completedAt: null,

    // Signatures
    inspectorSignature: null,
    supervisorSignature: null,

    // Defect categories
    defectCategories: options.defectCategories || [
      'Rayadura', 'Mancha', 'Deformacion', 'Grieta',
      'Color', 'Dimension', 'Otro'
    ],

    // Items initialized from checklistItems
    items: [],

    // Icons
    icons: {
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
      minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
      print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>',
      save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
    },

    init() {
      // Initialize items from checklistItems
      const checklistItems = options.checklistItems || [];
      this.items = checklistItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        required: item.required !== false,
        status: item.status || null, // 'pass', 'fail', 'na', null
        notes: item.notes || '',
        photos: item.photos || [],
        defects: item.defects || [],
        // Measurement support
        measurement: item.hasMeasurement ? {
          unit: item.measurementUnit || '',
          min: item.measurementMin,
          max: item.measurementMax,
          target: item.measurementTarget,
          value: item.measurementValue || null
        } : null
      }));
    },

    // Computed properties
    get passCount() {
      return this.items.filter(item => item.status === 'pass').length;
    },

    get failCount() {
      return this.items.filter(item => item.status === 'fail').length;
    },

    get naCount() {
      return this.items.filter(item => item.status === 'na').length;
    },

    get pendingCount() {
      return this.items.filter(item => item.status === null).length;
    },

    get totalCount() {
      return this.items.length;
    },

    get completionPercent() {
      if (this.totalCount === 0) return 0;
      const completed = this.passCount + this.failCount + this.naCount;
      return Math.round((completed / this.totalCount) * 100);
    },

    get overallStatus() {
      if (this.failCount > 0) return 'fail';
      if (this.pendingCount === 0 && this.passCount > 0) return 'pass';
      return 'pending';
    },

    get isComplete() {
      // All required items must have a status
      return this.items
        .filter(item => item.required)
        .every(item => item.status !== null);
    },

    // Methods
    setStatus(itemId, status) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.status = status;
        this.$dispatch('qualitycheck:statuschange', { itemId, status, item });
      }
    },

    updateNotes(itemId, notes) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.notes = notes;
      }
    },

    updateMeasurement(itemId, value) {
      const item = this.items.find(i => i.id === itemId);
      if (item && item.measurement) {
        item.measurement.value = parseFloat(value) || null;

        // Auto-set status based on measurement
        if (item.measurement.value !== null) {
          const inRange = this.isInRange(item);
          if (inRange === true) {
            item.status = 'pass';
          } else if (inRange === false) {
            item.status = 'fail';
          }
        }

        this.$dispatch('qualitycheck:measurementchange', { itemId, value: item.measurement.value, item });
      }
    },

    isInRange(item) {
      if (!item.measurement || item.measurement.value === null) return null;
      const { value, min, max } = item.measurement;
      if (min !== undefined && max !== undefined) {
        return value >= min && value <= max;
      }
      return null;
    },

    addPhoto(itemId, file) {
      if (!file) return;

      const item = this.items.find(i => i.id === itemId);
      if (!item) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const photo = {
          id: Date.now().toString(),
          name: file.name,
          data: e.target.result,
          timestamp: new Date().toISOString()
        };
        item.photos.push(photo);
        this.$dispatch('qualitycheck:photochange', { itemId, photo, action: 'add' });
      };
      reader.readAsDataURL(file);
    },

    removePhoto(itemId, photoId) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        const index = item.photos.findIndex(p => p.id === photoId);
        if (index !== -1) {
          const photo = item.photos.splice(index, 1)[0];
          this.$dispatch('qualitycheck:photochange', { itemId, photo, action: 'remove' });
        }
      }
    },

    toggleDefect(itemId, defect) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        const index = item.defects.indexOf(defect);
        if (index === -1) {
          item.defects.push(defect);
        } else {
          item.defects.splice(index, 1);
        }
        this.$dispatch('qualitycheck:defectchange', { itemId, defect, defects: item.defects });
      }
    },

    complete() {
      if (!this.isComplete) {
        this.$dispatch('qualitycheck:incomplete', {
          pendingRequired: this.items.filter(i => i.required && i.status === null)
        });
        return;
      }

      this.completedAt = new Date().toISOString();
      this.$dispatch('qualitycheck:complete', this.getData());
    },

    print() {
      window.print();
    },

    getData() {
      return {
        title: this.title,
        subtitle: this.subtitle,
        orderNumber: this.orderNumber,
        productName: this.productName,
        batchNumber: this.batchNumber,
        inspector: this.inspector,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
        inspectorSignature: this.inspectorSignature,
        supervisorSignature: this.supervisorSignature,
        items: this.items.map(item => ({
          id: item.id,
          name: item.name,
          status: item.status,
          notes: item.notes,
          measurement: item.measurement,
          defects: item.defects,
          photoCount: item.photos.length
        })),
        summary: {
          passCount: this.passCount,
          failCount: this.failCount,
          naCount: this.naCount,
          totalCount: this.totalCount,
          completionPercent: this.completionPercent,
          overallStatus: this.overallStatus
        }
      };
    },

    formatTimestamp(isoString) {
      if (!isoString) return '';
      try {
        const date = new Date(isoString);
        return date.toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return isoString;
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
  // Keyboard layouts for multiple languages
  const LAYOUTS = {
    en: {
      code: 'en',
      name: 'English',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    es: {
      code: 'es',
      name: 'Español',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '"', '#', '$', '%', '&', '/', '(', ')', '='],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    fr: {
      code: 'fr',
      name: 'Français',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
        ['{shift}', 'w', 'x', 'c', 'v', 'b', 'n', 'é', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '@', '#', '€', '%', '^', '&', '*', '(', ')'],
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['{shift}', 'W', 'X', 'C', 'V', 'B', 'N', 'É', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    de: {
      code: 'de',
      name: 'Deutsch',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
        ['{shift}', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '"', '§', '$', '%', '&', '/', '(', ')', '='],
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
        ['{shift}', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ẞ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    it: {
      code: 'it',
      name: 'Italiano',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'è'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ì', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '"', '£', '$', '%', '&', '/', '(', ')', '='],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'É'],
        ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ì', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    pt: {
      code: 'pt',
      name: 'Português',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
        ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    ro: {
      code: 'ro',
      name: 'Română',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'ă'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ș', 'ț'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'â', 'î', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ă'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ș', 'Ț'],
        ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Â', 'Î', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    ru: {
      code: 'ru',
      name: 'Русский',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['{shift}', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')'],
        ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х'],
        ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
        ['{shift}', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    uk: {
      code: 'uk',
      name: 'Українська',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'],
        ['{shift}', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ї', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')'],
        ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х'],
        ['Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є'],
        ['{shift}', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ї', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    bg: {
      code: 'bg',
      name: 'Български',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ш'],
        ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'ю'],
        ['{shift}', 'з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ч', 'щ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '?', '+', '"', '%', '=', ':', '/', '_', '№'],
        ['Я', 'В', 'Е', 'Р', 'Т', 'Ъ', 'У', 'И', 'О', 'П', 'Ш'],
        ['А', 'С', 'Д', 'Ф', 'Г', 'Х', 'Й', 'К', 'Л', 'Ю'],
        ['{shift}', 'З', 'Ь', 'Ц', 'Ж', 'Б', 'Н', 'М', 'Ч', 'Щ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    },
    el: {
      code: 'el',
      name: 'Ελληνικά',
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
        ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
        ['{shift}', 'ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      shiftRows: [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['΅', 'Ε', 'Ρ', 'Τ', 'Υ', 'Θ', 'Ι', 'Ο', 'Π'],
        ['Α', 'Σ', 'Δ', 'Φ', 'Γ', 'Η', 'Ξ', 'Κ', 'Λ'],
        ['{shift}', 'Ζ', 'Χ', 'Ψ', 'Ω', 'Β', 'Ν', 'Μ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', ',', '{enter}']
      ]
    }
  };

  // Numbers layout
  const NUMBERS_LAYOUT = {
    rows: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
      ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
      ['{abc}', '{lang}', '{space}', '.', '{enter}']
    ]
  };

  const SYMBOLS_LAYOUT = {
    rows: [
      ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
      ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
      ['{numbers}', '.', ',', '?', '!', "'", '{backspace}'],
      ['{abc}', '{lang}', '{space}', '.', '{enter}']
    ]
  };

  return {
    // State
    isOpen: false,
    shift: false,
    capsLock: false,
    showNumbers: false,
    showSymbols: false,
    showLangPicker: false,
    currentLanguage: options.defaultLanguage || 'en',
    languages: options.languages || ['en'],
    targetSelector: options.targetSelector || null,
    targetElement: null,

    // Icons
    icons: {
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25em;height:1.25em;"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25em;height:1.25em;"><path d="M18 6L6 18M6 6l12 12"/></svg>',
      backspace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25em;height:1.25em;"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="M18 9l-6 6M12 9l6 6"/></svg>',
      shift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25em;height:1.25em;"><path d="M12 2l9 10h-6v10H9V12H3z"/></svg>',
      enter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25em;height:1.25em;"><path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>'
    },

    // Computed
    get currentLayout() {
      return LAYOUTS[this.currentLanguage] || LAYOUTS.en;
    },

    get currentRows() {
      if (this.showSymbols) return SYMBOLS_LAYOUT.rows;
      if (this.showNumbers) return NUMBERS_LAYOUT.rows;
      return this.shift || this.capsLock
        ? this.currentLayout.shiftRows
        : this.currentLayout.rows;
    },

    get availableLayouts() {
      return this.languages
        .filter(lang => LAYOUTS[lang])
        .map(lang => ({ code: lang, name: LAYOUTS[lang].name }));
    },

    // Init
    init() {
      if (this.targetSelector) {
        this.targetElement = document.querySelector(this.targetSelector);
      }
    },

    // Methods
    open() {
      this.isOpen = true;
      this.showLangPicker = false;
      this.$dispatch('osk:open');
    },

    close() {
      this.isOpen = false;
      this.showLangPicker = false;
      this.$dispatch('osk:close');
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    selectLanguage(code) {
      if (LAYOUTS[code]) {
        this.currentLanguage = code;
        this.showLangPicker = false;
        this.$dispatch('osk:language', { language: code, layout: LAYOUTS[code] });
      }
    },

    loadLayout(langCode) {
      this.selectLanguage(langCode);
    },

    isSpecialKey(key) {
      return key.startsWith('{') && key.endsWith('}');
    },

    isSpecialKeyIcon(key) {
      return ['{shift}', '{backspace}', '{enter}', '{lang}'].includes(key);
    },

    getSpecialKeyContent(key) {
      const map = {
        '{shift}': this.icons.shift,
        '{backspace}': this.icons.backspace,
        '{enter}': this.icons.enter,
        '{space}': '',
        '{lang}': this.icons.globe,
        '{numbers}': '123',
        '{symbols}': '#+=',
        '{abc}': 'ABC'
      };
      return map[key] || key.replace(/[{}]/g, '');
    },

    getKeyClass(key) {
      const base = 'ux-onscreen-keyboard__key';
      const classes = [base];

      if (this.isSpecialKey(key)) {
        classes.push(`${base}--special`);

        if (key === '{space}') classes.push(`${base}--space`);
        if (key === '{shift}') {
          classes.push(`${base}--shift`);
          if (this.shift || this.capsLock) classes.push(`${base}--active`);
        }
        if (key === '{backspace}') classes.push(`${base}--backspace`);
        if (key === '{enter}') classes.push(`${base}--enter`);
      }

      return classes.join(' ');
    },

    displayKey(key) {
      return key;
    },

    pressKey(key, event) {
      if (event) event.preventDefault();

      if (this.isSpecialKey(key)) {
        switch (key) {
          case '{shift}':
            this.toggleShift();
            break;
          case '{backspace}':
            this.handleBackspace();
            break;
          case '{enter}':
            this.handleEnter();
            break;
          case '{space}':
            this.insertCharacter(' ');
            break;
          case '{lang}':
            this.showLangPicker = !this.showLangPicker;
            break;
          case '{numbers}':
            this.showNumbers = true;
            this.showSymbols = false;
            break;
          case '{symbols}':
            this.showSymbols = true;
            this.showNumbers = false;
            break;
          case '{abc}':
            this.showNumbers = false;
            this.showSymbols = false;
            break;
        }
      } else {
        this.insertCharacter(key);
        if (this.shift && !this.capsLock) {
          this.shift = false;
        }
      }
    },

    toggleShift() {
      if (this.shift) {
        // If already shifted, double tap = caps lock
        this.capsLock = !this.capsLock;
        this.shift = this.capsLock;
      } else {
        this.shift = true;
        this.capsLock = false;
      }
    },

    insertCharacter(char) {
      const target = this.targetElement || document.activeElement;
      if (!target || !('value' in target)) return;

      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const value = target.value;

      target.value = value.substring(0, start) + char + value.substring(end);
      target.selectionStart = target.selectionEnd = start + char.length;

      // Trigger input event
      target.dispatchEvent(new Event('input', { bubbles: true }));
      this.$dispatch('osk:input', { key: char });
    },

    handleBackspace() {
      const target = this.targetElement || document.activeElement;
      if (!target || !('value' in target)) return;

      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const value = target.value;

      if (start === end && start > 0) {
        target.value = value.substring(0, start - 1) + value.substring(end);
        target.selectionStart = target.selectionEnd = start - 1;
      } else if (start !== end) {
        target.value = value.substring(0, start) + value.substring(end);
        target.selectionStart = target.selectionEnd = start;
      }

      target.dispatchEvent(new Event('input', { bubbles: true }));
      this.$dispatch('osk:backspace');
    },

    handleEnter() {
      const target = this.targetElement || document.activeElement;
      if (target && 'value' in target) {
        this.$dispatch('osk:enter', { value: target.value });
      }
      if (options.closeOnEnter !== false) {
        this.close();
      }
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
  // Icons for command palette
  const icons = {
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
    arrow: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    enter: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 01-4 4H4"/></svg>',
    command: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg>',
    file: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
    folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
    settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    empty: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>'
  };

  // Process groups or flat commands
  const groups = options.groups || [];
  const flatCommands = options.commands || [];

  // Convert flat commands to grouped format
  let allGroups = [];
  if (groups.length > 0) {
    allGroups = groups.map(g => ({
      group: g.name,
      commands: g.commands || []
    }));
  } else if (flatCommands.length > 0) {
    allGroups = [{ group: 'Comandos', commands: flatCommands }];
  }

  return {
    isOpen: false,
    query: '',
    loading: false,
    activeIndex: 0,
    groups: allGroups,
    filteredCommands: allGroups,
    recentCommands: [],
    placeholder: options.placeholder || 'Buscar comandos...',
    maxRecent: options.maxRecent || 5,
    closeOnSelect: options.closeOnSelect !== false,
    fuzzySearch: options.fuzzySearch !== false,
    showShortcuts: options.showShortcuts !== false,
    showFooter: options.showFooter !== false,
    loadResults: options.loadResults || null,
    icons: icons,

    init() {
      // Listen for Cmd+K / Ctrl+K
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
      });
    },

    open() {
      this.isOpen = true;
      this.query = '';
      this.activeIndex = 0;
      this.filterCommands();
      this.$nextTick(() => {
        const input = this.$el.querySelector('.ux-command__input');
        if (input) input.focus();
      });
      this.$dispatch('command:open');
    },

    close() {
      this.isOpen = false;
      this.query = '';
      this.activeIndex = 0;
      this.$dispatch('command:close');
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    async filterCommands() {
      const q = this.query.toLowerCase().trim();

      // If async loader provided
      if (this.loadResults && q) {
        this.loading = true;
        try {
          this.filteredCommands = await this.loadResults(q);
        } catch (e) {
          console.error('Error loading results:', e);
          this.filteredCommands = [];
        }
        this.loading = false;
        return;
      }

      // Filter locally
      if (!q) {
        this.filteredCommands = this.groups;
        return;
      }

      this.filteredCommands = this.groups.map(group => {
        const filtered = group.commands.filter(cmd => {
          const title = (cmd.title || '').toLowerCase();
          const desc = (cmd.description || '').toLowerCase();
          const keywords = (cmd.keywords || []).join(' ').toLowerCase();
          return title.includes(q) || desc.includes(q) || keywords.includes(q);
        });
        return { group: group.group, commands: filtered };
      }).filter(g => g.commands.length > 0);

      this.activeIndex = 0;
    },

    executeCommand(cmd) {
      // Add to recent
      if (!this.recentCommands.find(c => c.id === cmd.id)) {
        this.recentCommands.unshift({ ...cmd, recent: true });
        if (this.recentCommands.length > this.maxRecent) {
          this.recentCommands.pop();
        }
      }

      // Execute action if provided
      if (typeof cmd.action === 'function') {
        cmd.action();
      }

      // Navigate to URL if provided
      if (cmd.url) {
        window.location.href = cmd.url;
      }

      // Dispatch event
      this.$dispatch('command:execute', { command: cmd });

      if (this.closeOnSelect) {
        this.close();
      }
    },

    handleKeydown(event) {
      const totalItems = this.getTotalItems();

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.activeIndex = Math.min(this.activeIndex + 1, totalItems - 1);
          this.scrollToActive();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.activeIndex = Math.max(this.activeIndex - 1, 0);
          this.scrollToActive();
          break;
        case 'Tab':
          event.preventDefault();
          if (event.shiftKey) {
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
          } else {
            this.activeIndex = Math.min(this.activeIndex + 1, totalItems - 1);
          }
          this.scrollToActive();
          break;
        case 'Enter':
          event.preventDefault();
          const cmd = this.getCommandAtIndex(this.activeIndex);
          if (cmd) this.executeCommand(cmd);
          break;
        case 'Escape':
          this.close();
          break;
      }
    },

    getTotalItems() {
      return this.filteredCommands.reduce((sum, g) => sum + g.commands.length, 0);
    },

    getCommandAtIndex(index) {
      let count = 0;
      for (const group of this.filteredCommands) {
        for (const cmd of group.commands) {
          if (count === index) return cmd;
          count++;
        }
      }
      return null;
    },

    isActiveItem(groupIndex, itemIndex) {
      let count = 0;
      for (let gi = 0; gi < this.filteredCommands.length; gi++) {
        for (let ii = 0; ii < this.filteredCommands[gi].commands.length; ii++) {
          if (gi === groupIndex && ii === itemIndex) {
            return count === this.activeIndex;
          }
          count++;
        }
      }
      return false;
    },

    scrollToActive() {
      this.$nextTick(() => {
        const active = this.$el.querySelector('.ux-command__item--active');
        if (active) {
          active.scrollIntoView({ block: 'nearest' });
        }
      });
    },

    getIcon(cmd) {
      if (!cmd.icon) return '';
      if (cmd.icon.startsWith('<svg')) return cmd.icon;
      return this.icons[cmd.icon] || this.icons.command;
    },

    formatShortcut(shortcut) {
      if (!shortcut) return [];
      return shortcut.replace('Cmd', '⌘').replace('Ctrl', '⌃').replace('Shift', '⇧').replace('Alt', '⌥').split('+');
    },

    highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },

    clearRecent() {
      this.recentCommands = [];
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

// Swipe Item Component - iOS-style swipeable list item
function uxSwipeItem(options = {}) {
  return {
    offset: 0,
    isSwiping: false,
    openSide: null,
    startActionsWidth: options.startActionsWidth || 0,
    endActionsWidth: options.endActionsWidth || 80,
    threshold: options.threshold || 40,
    _startX: 0,
    _currentX: 0,

    get contentStyle() {
      return `transform: translateX(${this.offset}px); transition: ${this.isSwiping ? 'none' : 'transform 0.3s ease'};`;
    },

    handleSwipeStart(e) {
      this.isSwiping = true;
      const touch = e.touches ? e.touches[0] : e;
      this._startX = touch ? touch.clientX : 0;
      this._currentX = this._startX;
    },

    handleSwipeMove(distance) {
      if (!this.isSwiping) return;

      // Limit movement based on available actions
      let newOffset = distance;

      // Limit left swipe (negative) to endActionsWidth
      if (newOffset < 0) {
        newOffset = Math.max(newOffset, -this.endActionsWidth);
      }
      // Limit right swipe (positive) to startActionsWidth
      if (newOffset > 0) {
        newOffset = Math.min(newOffset, this.startActionsWidth);
      }

      this.offset = newOffset;
    },

    handleSwipeEnd() {
      this.isSwiping = false;

      // Snap to open or closed position
      if (this.offset < -this.threshold && this.endActionsWidth > 0) {
        // Snap open to end actions
        this.offset = -this.endActionsWidth;
        this.openSide = 'end';
      } else if (this.offset > this.threshold && this.startActionsWidth > 0) {
        // Snap open to start actions
        this.offset = this.startActionsWidth;
        this.openSide = 'start';
      } else {
        // Snap closed
        this.offset = 0;
        this.openSide = null;
      }
    },

    openStart() {
      if (this.startActionsWidth > 0) {
        this.offset = this.startActionsWidth;
        this.openSide = 'start';
      }
    },

    openEnd() {
      if (this.endActionsWidth > 0) {
        this.offset = -this.endActionsWidth;
        this.openSide = 'end';
      }
    },

    close() {
      this.offset = 0;
      this.openSide = null;
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
    editing: options.editing || false,
    disabled: options.disabled || false,
    dragging: false,
    dragIndex: null,
    dragOverIndex: null,

    // Toggle edit mode
    toggleEdit() {
      this.editing = !this.editing;
    },

    startEdit() {
      this.editing = true;
    },

    endEdit() {
      this.editing = false;
    },

    // Check if item is being dragged
    isDragging(index) {
      return this.dragIndex === index;
    },

    // Check if cursor is over item
    isDragOver(index) {
      return this.dragOverIndex === index && this.dragIndex !== index;
    },

    // Drag event handlers
    handleDragStart(event, index) {
      if (this.disabled || !this.editing) return;
      this.dragging = true;
      this.dragIndex = index;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index);
    },

    handleDragOver(event, index) {
      if (this.disabled || this.dragIndex === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      this.dragOverIndex = index;

      // Reorder items
      if (this.dragIndex !== index) {
        this.moveItem(this.dragIndex, index);
        this.dragIndex = index;
      }
    },

    handleDragEnd() {
      this.dragging = false;
      this.dragIndex = null;
      this.dragOverIndex = null;
      this.$dispatch('reorder:end', { items: this.items });
    },

    // Touch event handlers
    handleTouchStart(event, index) {
      if (this.disabled || !this.editing) return;
      this.dragging = true;
      this.dragIndex = index;
    },

    handleTouchMove(event, index) {
      if (this.disabled || this.dragIndex === null) return;
      // Get touch position and find element under it
      const touch = event.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element) {
        const item = element.closest('.ux-reorder-item');
        if (item) {
          const items = Array.from(item.parentElement.children);
          const newIndex = items.indexOf(item);
          if (newIndex !== -1 && newIndex !== this.dragIndex) {
            this.moveItem(this.dragIndex, newIndex);
            this.dragIndex = newIndex;
          }
        }
      }
    },

    handleTouchEnd() {
      this.dragging = false;
      this.dragIndex = null;
      this.dragOverIndex = null;
      this.$dispatch('reorder:end', { items: this.items });
    },

    // Move item from one index to another
    moveItem(fromIndex, toIndex) {
      const item = this.items.splice(fromIndex, 1)[0];
      this.items.splice(toIndex, 0, item);
      this.$dispatch('reorder', { items: this.items, from: fromIndex, to: toIndex });
    },

    // Remove item at index
    removeItem(index) {
      const removed = this.items.splice(index, 1)[0];
      this.$dispatch('reorder:remove', { item: removed, index, items: this.items });
    },

    // Legacy methods for compatibility
    startDrag(index) {
      this.handleDragStart({ dataTransfer: { effectAllowed: '', setData: () => {} } }, index);
    },

    endDrag() {
      this.handleDragEnd();
    },

    move(fromIndex, toIndex) {
      this.moveItem(fromIndex, toIndex);
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
  const MOBILE_BREAKPOINT = options.breakpoint || 768;

  return {
    open: options.open || false,
    asideOpen: options.asideOpen || false,
    data: options.data || null,
    breakpoint: MOBILE_BREAKPOINT,

    init() {
      // Close aside on resize if going to desktop
      this._handleResize = () => {
        if (window.innerWidth >= this.breakpoint) {
          this.asideOpen = false;
        }
      };
      window.addEventListener('resize', this._handleResize);
    },

    destroy() {
      window.removeEventListener('resize', this._handleResize);
    },

    get isMobile() {
      return window.innerWidth < this.breakpoint;
    },

    // Legacy show/hide for data
    show(data) {
      this.data = data;
      this.open = true;
    },

    hide() {
      this.open = false;
    },

    // Aside panel controls (mobile drawer)
    toggleAside() {
      this.asideOpen = !this.asideOpen;
      this.$dispatch('paneldetail:toggle', { open: this.asideOpen });
    },

    openAside() {
      this.asideOpen = true;
      this.$dispatch('paneldetail:open');
    },

    closeAside() {
      this.asideOpen = false;
      this.$dispatch('paneldetail:close');
    },

    get panelClasses() {
      return {
        'ux-panel-detail--aside-open': this.asideOpen
      };
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

// ============================================
// Alpine.js Custom Directives for Gestures
// ============================================

// Register directives when Alpine is available
document.addEventListener('alpine:init', () => {
  if (typeof Alpine === 'undefined') return;

  // x-swipe directive - Detects swipe gestures
  Alpine.directive('swipe', (el, { modifiers, expression }, { evaluate }) => {
    const callback = evaluate(expression);
    const directions = modifiers.filter(m => ['left', 'right', 'up', 'down'].includes(m));
    const threshold = 50;
    let startX = 0, startY = 0, startTime = 0;

    const handleStart = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const handleEnd = (e) => {
      const touch = e.changedTouches ? e.changedTouches[0] : e;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < threshold && absY < threshold) return;

      let direction;
      if (absX > absY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      // Filter by direction if modifiers specified
      if (directions.length > 0 && !directions.includes(direction)) return;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

      if (typeof callback === 'function') {
        callback({ direction, distance, velocity, angle, deltaX, deltaY });
      }
    };

    el.addEventListener('touchstart', handleStart, { passive: true });
    el.addEventListener('touchend', handleEnd);
    el.addEventListener('mousedown', handleStart);
    el.addEventListener('mouseup', handleEnd);
  });

  // x-long-press directive - Detects long press
  Alpine.directive('long-press', (el, { modifiers, expression }, { evaluate }) => {
    const callback = evaluate(expression);
    const duration = parseInt(modifiers.find(m => m.endsWith('ms'))?.replace('ms', '')) || 500;
    let timeout = null;
    let triggered = false;

    const start = (e) => {
      triggered = false;
      timeout = setTimeout(() => {
        triggered = true;
        if (typeof callback === 'function') callback(e);
      }, duration);
    };

    const cancel = () => {
      if (timeout) clearTimeout(timeout);
      timeout = null;
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchmove', cancel);
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseleave', cancel);
  });

  // x-tap directive - Detects single or double tap
  Alpine.directive('tap', (el, { modifiers, expression }, { evaluate }) => {
    const callback = evaluate(expression);
    const isDouble = modifiers.includes('double');
    let lastTap = 0;
    const doubleDelay = 300;

    const handleTap = (e) => {
      const now = Date.now();

      if (isDouble) {
        if (now - lastTap < doubleDelay) {
          if (typeof callback === 'function') callback(e);
          lastTap = 0;
        } else {
          lastTap = now;
        }
      } else {
        // Single tap - delay to check for double tap
        setTimeout(() => {
          if (now === lastTap || lastTap === 0) {
            if (typeof callback === 'function') callback(e);
          }
        }, doubleDelay);
        lastTap = now;
      }
    };

    el.addEventListener('touchend', handleTap);
    el.addEventListener('click', handleTap);
  });

  // x-drag directive - Enables drag functionality
  Alpine.directive('drag', (el, { expression }, { evaluate }) => {
    const callback = evaluate(expression);
    let isDragging = false;
    let startPos = { x: 0, y: 0 };

    const getPos = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      return { x: touch.clientX, y: touch.clientY };
    };

    const start = (e) => {
      isDragging = true;
      startPos = getPos(e);
      if (typeof callback === 'function') {
        callback({ type: 'start', startPos, offset: { x: 0, y: 0 }, element: el });
      }
    };

    const move = (e) => {
      if (!isDragging) return;
      const currentPos = getPos(e);
      const delta = {
        x: currentPos.x - startPos.x,
        y: currentPos.y - startPos.y
      };
      if (typeof callback === 'function') {
        callback({ type: 'move', startPos, currentPos, delta, element: el });
      }
    };

    const end = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endPos = e.changedTouches ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : getPos(e);
      const delta = {
        x: endPos.x - startPos.x,
        y: endPos.y - startPos.y
      };
      if (typeof callback === 'function') {
        callback({ type: 'end', startPos, endPos, delta, element: el });
      }
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchmove', move, { passive: true });
    el.addEventListener('touchend', end);
    el.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
  });

  // x-pinch directive - Detects pinch gestures (touch only)
  Alpine.directive('pinch', (el, { expression }, { evaluate }) => {
    const callback = evaluate(expression);
    let initialDistance = 0;
    let initialScale = 1;

    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getCenter = (touches) => ({
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    });

    const start = (e) => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
        initialScale = 1;
      }
    };

    const move = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        const delta = scale - initialScale;
        initialScale = scale;

        if (typeof callback === 'function') {
          callback({
            type: 'pinch',
            scale,
            delta,
            center: getCenter(e.touches)
          });
        }
      }
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchmove', move, { passive: false });
  });

  // x-pull-refresh directive - Pull to refresh
  Alpine.directive('pull-refresh', (el, { expression }, { evaluate }) => {
    const callback = evaluate(expression);
    const threshold = 80;
    let startY = 0;
    let pulling = false;

    const start = (e) => {
      if (el.scrollTop === 0) {
        startY = e.touches[0].clientY;
        pulling = true;
      }
    };

    const move = (e) => {
      if (!pulling) return;
      const currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;

      if (pullDistance > 0 && el.scrollTop === 0) {
        // Visual feedback could be added here
      }
    };

    const end = async (e) => {
      if (!pulling) return;
      pulling = false;

      const endY = e.changedTouches[0].clientY;
      const pullDistance = endY - startY;

      if (pullDistance > threshold && el.scrollTop === 0) {
        if (typeof callback === 'function') {
          await callback();
        }
      }
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchmove', move, { passive: true });
    el.addEventListener('touchend', end);
  });

  // ============================================
  // Utility Directives for Alpine Utils
  // ============================================

  // x-focus-trap directive - Traps focus within an element
  Alpine.directive('focus-trap', (el, { expression }, { evaluate, effect, cleanup }) => {
    let focusableElements = [];
    let firstFocusable = null;
    let lastFocusable = null;
    let isActive = false;

    const getFocusableElements = () => {
      const selectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(',');
      return el.querySelectorAll(selectors);
    };

    const updateFocusable = () => {
      focusableElements = Array.from(getFocusableElements());
      firstFocusable = focusableElements[0];
      lastFocusable = focusableElements[focusableElements.length - 1];
    };

    const handleKeydown = (e) => {
      if (e.key !== 'Tab' || !isActive) return;

      updateFocusable();
      if (focusableElements.length === 0) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    const activate = () => {
      if (isActive) return;
      isActive = true;
      updateFocusable();
      el.addEventListener('keydown', handleKeydown);
      el.setAttribute('data-focus-trapped', '');
      // Focus first element after a short delay
      setTimeout(() => {
        if (firstFocusable) firstFocusable.focus();
      }, 50);
    };

    const deactivate = () => {
      if (!isActive) return;
      isActive = false;
      el.removeEventListener('keydown', handleKeydown);
      el.removeAttribute('data-focus-trapped');
    };

    // Watch expression changes
    if (expression) {
      effect(() => {
        const shouldTrap = evaluate(expression);
        if (shouldTrap) {
          activate();
        } else {
          deactivate();
        }
      });
    } else {
      // Always active if no expression
      activate();
    }

    cleanup(() => {
      deactivate();
    });
  });

  // x-click-outside directive - Detects clicks outside the element
  Alpine.directive('click-outside', (el, { expression }, { evaluate, cleanup }) => {
    const callback = (e) => {
      if (!el.contains(e.target)) {
        evaluate(expression);
      }
    };

    // Delay to prevent immediate trigger
    setTimeout(() => {
      document.addEventListener('click', callback);
      document.addEventListener('touchstart', callback, { passive: true });
    }, 0);

    cleanup(() => {
      document.removeEventListener('click', callback);
      document.removeEventListener('touchstart', callback);
    });
  });

  // x-scroll-lock directive - Locks body scroll
  Alpine.directive('scroll-lock', (el, { expression }, { evaluate, effect, cleanup }) => {
    let isLocked = false;
    let originalOverflow = '';
    let originalPaddingRight = '';

    const lock = () => {
      if (isLocked) return;
      isLocked = true;

      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
      }
    };

    const unlock = () => {
      if (!isLocked) return;
      isLocked = false;

      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };

    if (expression) {
      effect(() => {
        const shouldLock = evaluate(expression);
        if (shouldLock) {
          lock();
        } else {
          unlock();
        }
      });
    } else {
      // Always lock if no expression
      lock();
    }

    cleanup(() => {
      unlock();
    });
  });

  // x-clipboard directive - Copies text to clipboard
  Alpine.directive('clipboard', (el, { expression, modifiers }, { evaluate }) => {
    const trigger = modifiers.includes('click') || !modifiers.length;

    const copy = async () => {
      const text = evaluate(expression);
      try {
        await navigator.clipboard.writeText(text);
        el.dispatchEvent(new CustomEvent('clipboard:success', { detail: { text } }));
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          el.dispatchEvent(new CustomEvent('clipboard:success', { detail: { text } }));
        } catch (e) {
          el.dispatchEvent(new CustomEvent('clipboard:error', { detail: { error: e } }));
        }
        document.body.removeChild(textarea);
      }
    };

    if (trigger) {
      el.addEventListener('click', copy);
    }
  });

  // ============================================
  // Magic Helpers for Alpine Utils
  // ============================================

  // $debounce magic - Debounces a function
  Alpine.magic('debounce', () => {
    return (callback, wait = 300) => {
      let timeout = null;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), wait);
      };
    };
  });

  // $throttle magic - Throttles a function
  Alpine.magic('throttle', () => {
    return (callback, limit = 300) => {
      let waiting = false;
      return (...args) => {
        if (!waiting) {
          callback.apply(this, args);
          waiting = true;
          setTimeout(() => { waiting = false; }, limit);
        }
      };
    };
  });

  // $clipboard magic - Copy text to clipboard
  Alpine.magic('clipboard', () => {
    return async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return true;
        } catch (e) {
          document.body.removeChild(textarea);
          return false;
        }
      }
    };
  });

  // $scrollLock magic - Lock/unlock body scroll
  Alpine.magic('scrollLock', () => {
    let isLocked = false;
    let originalOverflow = '';
    let originalPaddingRight = '';

    return {
      lock() {
        if (isLocked) return;
        isLocked = true;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        originalOverflow = document.body.style.overflow;
        originalPaddingRight = document.body.style.paddingRight;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = scrollbarWidth + 'px';
        }
      },
      unlock() {
        if (!isLocked) return;
        isLocked = false;
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      },
      toggle() {
        if (isLocked) {
          this.unlock();
        } else {
          this.lock();
        }
      },
      get isLocked() {
        return isLocked;
      }
    };
  });

  // $focusTrap magic - Trap focus within an element
  Alpine.magic('focusTrap', () => {
    return (element) => {
      if (!element) return { release: () => {} };

      const getFocusableElements = () => {
        const selectors = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])'
        ].join(',');
        return Array.from(element.querySelectorAll(selectors));
      };

      const handleKeydown = (e) => {
        if (e.key !== 'Tab') return;

        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      element.addEventListener('keydown', handleKeydown);

      // Focus first element
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      return {
        release() {
          element.removeEventListener('keydown', handleKeydown);
        }
      };
    };
  });

  // $announce magic - Screen reader announcements
  Alpine.magic('announce', () => {
    return (message, priority = 'polite') => {
      const id = 'alpine-sr-announcer';
      let announcer = document.getElementById(id);

      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = id;
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
        document.body.appendChild(announcer);
      }

      announcer.setAttribute('aria-live', priority);
      announcer.textContent = '';

      // Delay to ensure screen reader picks up the change
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    };
  });
});
