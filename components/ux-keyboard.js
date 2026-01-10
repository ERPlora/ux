/**
 * UX Keyboard - Unified keyboard navigation and shortcuts system
 * Global hotkeys, focus management, and keyboard navigation helpers
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Keyboard Styles
    ======================================== */

    /* Skip to main content link */
    .ux-skip-link {
      position: fixed;
      top: -100px;
      left: var(--ux-space-md);
      z-index: calc(var(--ux-z-toast) + 100);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      text-decoration: none;
      transition: top 0.2s ease;
      box-shadow: var(--ux-shadow-lg);
    }

    .ux-skip-link:focus {
      top: var(--ux-space-md);
      outline: none;
    }

    /* Keyboard shortcut hint badge */
    .ux-kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.5em;
      height: 1.5em;
      padding: 0 0.4em;
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      font-family: var(--ux-font-mono, 'SF Mono', 'Monaco', 'Consolas', monospace);
      font-size: 0.75em;
      font-weight: 500;
      color: var(--ux-text-secondary);
      box-shadow: 0 1px 0 var(--ux-border-color);
      white-space: nowrap;
    }

    .ux-kbd--sm {
      min-width: 1.25em;
      height: 1.25em;
      padding: 0 0.3em;
      font-size: 0.65em;
    }

    .ux-kbd--lg {
      min-width: 2em;
      height: 2em;
      padding: 0 0.5em;
      font-size: 0.85em;
    }

    /* Keyboard shortcut combo */
    .ux-kbd-combo {
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
    }

    .ux-kbd-combo__separator {
      color: var(--ux-text-tertiary);
      font-size: 0.75em;
    }

    /* Focus visible enhancement */
    .ux-keyboard-nav *:focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    /* Hide focus ring for mouse users */
    .ux-keyboard-nav--mouse *:focus:not(:focus-visible) {
      outline: none;
    }

    /* Shortcut palette/command menu trigger hint */
    .ux-keyboard-hint {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-keyboard-hint__text {
      opacity: 0.8;
    }

    /* Roving tabindex indicator */
    [data-ux-roving] [tabindex="0"]:focus {
      background: var(--ux-surface-secondary);
    }

    /* Arrow key navigation indicator */
    .ux-arrow-nav {
      position: relative;
    }

    .ux-arrow-nav::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid transparent;
      border-radius: inherit;
      pointer-events: none;
      transition: border-color 0.15s ease;
    }

    .ux-arrow-nav:focus-within::after {
      border-color: var(--ux-primary-soft);
    }

    /* Glass variant */
    .ux-kbd--glass {
      background: var(--ux-glass-bg-thin);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-kbd {
        background: var(--ux-surface-tertiary);
        border-color: var(--ux-border-color);
      }
    }

    .ux-dark .ux-kbd {
      background: var(--ux-surface-tertiary);
      border-color: var(--ux-border-color);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-skip-link {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-keyboard-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-keyboard-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Platform detection
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? 'Meta' : 'Control';
  const modKeySymbol = isMac ? '⌘' : 'Ctrl';
  const altKeySymbol = isMac ? '⌥' : 'Alt';
  const shiftKeySymbol = isMac ? '⇧' : 'Shift';

  // Key symbols mapping
  const keySymbols = {
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Enter': '↵',
    'Escape': 'Esc',
    'Backspace': '⌫',
    'Delete': '⌦',
    'Tab': '⇥',
    'Space': '␣',
    'Meta': '⌘',
    'Control': 'Ctrl',
    'Alt': isMac ? '⌥' : 'Alt',
    'Shift': isMac ? '⇧' : 'Shift'
  };

  /**
   * Global keyboard manager
   */
  const UXKeyboard = {
    // Registered shortcuts
    shortcuts: new Map(),

    // Shortcut scopes (global, modal, etc.)
    scopes: ['global'],

    // Active scope
    activeScope: 'global',

    // Whether keyboard navigation is active
    isKeyboardNav: false,

    // Callbacks
    callbacks: {
      shortcut: [],
      scopeChange: []
    },

    /**
     * Initialize keyboard manager
     */
    init() {
      // Track keyboard vs mouse navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          this.setKeyboardNav(true);
        }
        this.handleKeydown(e);
      });

      document.addEventListener('mousedown', () => {
        this.setKeyboardNav(false);
      });

      // Add keyboard nav class to body
      document.body.classList.add('ux-keyboard-nav');

      // Create skip link if not exists
      this.createSkipLink();

      console.log('UX Keyboard initialized');
    },

    /**
     * Set keyboard navigation mode
     */
    setKeyboardNav(isKeyboard) {
      this.isKeyboardNav = isKeyboard;
      document.body.classList.toggle('ux-keyboard-nav--mouse', !isKeyboard);
    },

    /**
     * Create skip to main content link
     */
    createSkipLink() {
      if (document.querySelector('.ux-skip-link')) return;

      const main = document.querySelector('main, [role="main"], #main, .main-content');
      if (!main) return;

      if (!main.id) main.id = 'main-content';

      const skipLink = document.createElement('a');
      skipLink.href = `#${main.id}`;
      skipLink.className = 'ux-skip-link';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    },

    /**
     * Register a keyboard shortcut
     * @param {string} combo - Key combination (e.g., 'mod+k', 'shift+?', 'escape')
     * @param {Function} callback - Handler function
     * @param {Object} options - Options (scope, description, preventDefault)
     */
    register(combo, callback, options = {}) {
      const {
        scope = 'global',
        description = '',
        preventDefault = true,
        allowInInput = false
      } = options;

      const normalizedCombo = this.normalizeCombo(combo);
      const key = `${scope}:${normalizedCombo}`;

      this.shortcuts.set(key, {
        combo: normalizedCombo,
        original: combo,
        callback,
        scope,
        description,
        preventDefault,
        allowInInput
      });

      return () => this.unregister(combo, scope);
    },

    /**
     * Unregister a shortcut
     */
    unregister(combo, scope = 'global') {
      const normalizedCombo = this.normalizeCombo(combo);
      const key = `${scope}:${normalizedCombo}`;
      this.shortcuts.delete(key);
    },

    /**
     * Normalize key combination
     */
    normalizeCombo(combo) {
      return combo
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace('mod', modKey.toLowerCase())
        .replace('cmd', 'meta')
        .replace('ctrl', 'control')
        .replace('opt', 'alt')
        .replace('option', 'alt')
        .split('+')
        .sort()
        .join('+');
    },

    /**
     * Get combo from event
     */
    getComboFromEvent(e) {
      const parts = [];

      if (e.ctrlKey) parts.push('control');
      if (e.metaKey) parts.push('meta');
      if (e.altKey) parts.push('alt');
      if (e.shiftKey) parts.push('shift');

      // Add the actual key
      const key = e.key.toLowerCase();
      if (!['control', 'meta', 'alt', 'shift'].includes(key)) {
        parts.push(key);
      }

      return parts.sort().join('+');
    },

    /**
     * Handle keydown event
     */
    handleKeydown(e) {
      // Skip if in input and not allowed
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                      e.target.isContentEditable;

      const combo = this.getComboFromEvent(e);

      // Check shortcuts in active scope first, then global
      const scopes = this.activeScope === 'global'
        ? ['global']
        : [this.activeScope, 'global'];

      for (const scope of scopes) {
        const key = `${scope}:${combo}`;
        const shortcut = this.shortcuts.get(key);

        if (shortcut) {
          if (isInput && !shortcut.allowInInput) continue;

          if (shortcut.preventDefault) {
            e.preventDefault();
          }

          shortcut.callback(e);

          // Emit event
          this.callbacks.shortcut.forEach(cb => cb(shortcut, e));

          return;
        }
      }
    },

    /**
     * Push a new scope (e.g., when modal opens)
     */
    pushScope(scope) {
      this.scopes.push(scope);
      this.activeScope = scope;
      this.callbacks.scopeChange.forEach(cb => cb(scope, 'push'));
    },

    /**
     * Pop current scope (e.g., when modal closes)
     */
    popScope() {
      if (this.scopes.length > 1) {
        const removed = this.scopes.pop();
        this.activeScope = this.scopes[this.scopes.length - 1];
        this.callbacks.scopeChange.forEach(cb => cb(this.activeScope, 'pop'));
        return removed;
      }
      return null;
    },

    /**
     * Get all registered shortcuts for a scope
     */
    getShortcuts(scope = null) {
      const results = [];
      this.shortcuts.forEach((shortcut, key) => {
        if (!scope || shortcut.scope === scope) {
          results.push(shortcut);
        }
      });
      return results;
    },

    /**
     * Format combo for display
     */
    formatCombo(combo) {
      return combo
        .split('+')
        .map(key => {
          const k = key.charAt(0).toUpperCase() + key.slice(1);
          if (k === 'Meta') return modKeySymbol;
          if (k === 'Control') return 'Ctrl';
          if (k === 'Alt') return altKeySymbol;
          if (k === 'Shift') return shiftKeySymbol;
          return keySymbols[k] || k;
        })
        .join(' + ');
    },

    /**
     * Create HTML for keyboard shortcut display
     */
    renderCombo(combo, options = {}) {
      const { size = '', glass = false } = options;
      const keys = combo.split('+').map(key => {
        const k = key.charAt(0).toUpperCase() + key.slice(1);
        let display = k;
        if (k === 'Meta') display = modKeySymbol;
        else if (k === 'Control') display = 'Ctrl';
        else if (k === 'Alt') display = altKeySymbol;
        else if (k === 'Shift') display = shiftKeySymbol;
        else if (keySymbols[k]) display = keySymbols[k];

        const classes = ['ux-kbd'];
        if (size) classes.push(`ux-kbd--${size}`);
        if (glass) classes.push('ux-kbd--glass');

        return `<kbd class="${classes.join(' ')}">${display}</kbd>`;
      });

      return `<span class="ux-kbd-combo">${keys.join('<span class="ux-kbd-combo__separator">+</span>')}</span>`;
    },

    /**
     * Event listeners
     */
    on(event, callback) {
      if (this.callbacks[event]) {
        this.callbacks[event].push(callback);
      }
      return () => this.off(event, callback);
    },

    off(event, callback) {
      if (this.callbacks[event]) {
        const idx = this.callbacks[event].indexOf(callback);
        if (idx > -1) this.callbacks[event].splice(idx, 1);
      }
    }
  };

  /**
   * Roving tabindex helper for arrow key navigation
   */
  const rovingTabindex = {
    /**
     * Initialize roving tabindex on a container
     * @param {HTMLElement} container - Container element
     * @param {Object} options - Options
     */
    init(container, options = {}) {
      const {
        selector = '[role="menuitem"], [role="option"], [role="tab"], button, a',
        orientation = 'both', // 'horizontal', 'vertical', 'both'
        wrap = true,
        onSelect = null
      } = options;

      container.setAttribute('data-ux-roving', '');

      const getItems = () => Array.from(container.querySelectorAll(selector))
        .filter(el => !el.disabled && el.offsetParent !== null);

      const setFocus = (index, items) => {
        items.forEach((item, i) => {
          item.setAttribute('tabindex', i === index ? '0' : '-1');
        });
        items[index]?.focus();
      };

      // Set initial tabindex
      const items = getItems();
      items.forEach((item, i) => {
        item.setAttribute('tabindex', i === 0 ? '0' : '-1');
      });

      container.addEventListener('keydown', (e) => {
        const items = getItems();
        const currentIndex = items.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        const isHorizontal = orientation === 'horizontal' || orientation === 'both';
        const isVertical = orientation === 'vertical' || orientation === 'both';

        switch (e.key) {
          case 'ArrowRight':
            if (isHorizontal) {
              e.preventDefault();
              nextIndex = wrap
                ? (currentIndex + 1) % items.length
                : Math.min(currentIndex + 1, items.length - 1);
            }
            break;
          case 'ArrowLeft':
            if (isHorizontal) {
              e.preventDefault();
              nextIndex = wrap
                ? (currentIndex - 1 + items.length) % items.length
                : Math.max(currentIndex - 1, 0);
            }
            break;
          case 'ArrowDown':
            if (isVertical) {
              e.preventDefault();
              nextIndex = wrap
                ? (currentIndex + 1) % items.length
                : Math.min(currentIndex + 1, items.length - 1);
            }
            break;
          case 'ArrowUp':
            if (isVertical) {
              e.preventDefault();
              nextIndex = wrap
                ? (currentIndex - 1 + items.length) % items.length
                : Math.max(currentIndex - 1, 0);
            }
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            nextIndex = items.length - 1;
            break;
          case 'Enter':
          case ' ':
            if (onSelect) {
              e.preventDefault();
              onSelect(items[currentIndex], currentIndex);
            }
            return;
        }

        if (nextIndex !== currentIndex) {
          setFocus(nextIndex, items);
        }
      });

      return {
        refresh: () => {
          const items = getItems();
          const focused = items.find(i => i === document.activeElement);
          const focusIndex = focused ? items.indexOf(focused) : 0;
          items.forEach((item, i) => {
            item.setAttribute('tabindex', i === focusIndex ? '0' : '-1');
          });
        },
        destroy: () => {
          container.removeAttribute('data-ux-roving');
        }
      };
    }
  };

  /**
   * Focus trap helper
   */
  const focusTrap = {
    /**
     * Create a focus trap
     * @param {HTMLElement} container - Container element
     * @param {Object} options - Options
     */
    create(container, options = {}) {
      const {
        initialFocus = null,
        returnFocus = true,
        escapeDeactivates = true,
        onEscape = null
      } = options;

      const previouslyFocused = document.activeElement;

      const getFocusable = () => {
        const selector = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
          '[contenteditable="true"]'
        ].join(', ');

        return Array.from(container.querySelectorAll(selector))
          .filter(el => el.offsetParent !== null);
      };

      const handleKeydown = (e) => {
        if (e.key === 'Tab') {
          const focusable = getFocusable();
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }

        if (e.key === 'Escape' && escapeDeactivates) {
          e.preventDefault();
          if (onEscape) onEscape();
        }
      };

      container.addEventListener('keydown', handleKeydown);

      // Set initial focus
      const focusable = getFocusable();
      const toFocus = initialFocus
        ? container.querySelector(initialFocus)
        : focusable[0];

      setTimeout(() => toFocus?.focus(), 0);

      return {
        deactivate: () => {
          container.removeEventListener('keydown', handleKeydown);
          if (returnFocus && previouslyFocused) {
            previouslyFocused.focus();
          }
        }
      };
    }
  };

  /**
   * Alpine.js component for keyboard shortcuts
   */
  const keyboardComponent = (config = {}) => ({
    shortcuts: [],
    showHelp: false,

    init() {
      // Register shortcuts from config
      if (config.shortcuts) {
        config.shortcuts.forEach(s => {
          UXKeyboard.register(s.combo, (e) => {
            if (s.action) {
              this[s.action]?.(e);
            }
            this.$dispatch('ux-shortcut', { combo: s.combo, ...s });
          }, {
            scope: config.scope || 'global',
            description: s.description,
            allowInInput: s.allowInInput
          });
        });
      }

      // Update shortcuts list
      this.shortcuts = UXKeyboard.getShortcuts(config.scope || 'global');

      // ? to show help
      if (config.showHelpOnQuestion !== false) {
        UXKeyboard.register('shift+?', () => {
          this.showHelp = !this.showHelp;
        }, {
          scope: config.scope || 'global',
          description: 'Show keyboard shortcuts'
        });
      }

      // Push scope if not global
      if (config.scope && config.scope !== 'global') {
        UXKeyboard.pushScope(config.scope);
      }
    },

    destroy() {
      // Pop scope if not global
      if (config.scope && config.scope !== 'global') {
        UXKeyboard.popScope();
      }
    },

    formatCombo(combo) {
      return UXKeyboard.formatCombo(combo);
    },

    renderCombo(combo) {
      return UXKeyboard.renderCombo(combo);
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxKeyboard', keyboardComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxKeyboard', keyboardComponent);
    });
  }

  // Export to window
  window.UXKeyboard = UXKeyboard;
  window.UXRovingTabindex = rovingTabindex;
  window.UXFocusTrap = focusTrap;

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UXKeyboard.init());
  } else {
    UXKeyboard.init();
  }

  // Register common shortcuts
  UXKeyboard.register('escape', () => {
    // Close any open modal/sheet/popover
    const event = new CustomEvent('ux-escape');
    document.dispatchEvent(event);
  }, {
    description: 'Close modal/popover'
  });

})();