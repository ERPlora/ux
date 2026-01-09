/**
 * UX Command Palette Component
 * Command palette (Cmd+K) for quick actions and navigation
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Command Palette Backdrop
       ========================================================================== */

    .ux-command-backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal-backdrop);
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-command-backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ==========================================================================
       Command Palette Container
       ========================================================================== */

    .ux-command {
      position: fixed;
      top: 15%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      z-index: var(--ux-z-modal);
      width: 95%;
      max-width: 640px;
      max-height: 70dvh;
      background: var(--ux-surface);
      border-radius: var(--ux-radius-xl);
      box-shadow: var(--ux-shadow-2xl);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-normal) var(--ux-ease-out);
    }

    .ux-command--open {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    /* ==========================================================================
       Search Input
       ========================================================================== */

    .ux-command__search {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-command__search-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--ux-text-tertiary);
    }

    .ux-command__input {
      flex: 1;
      min-width: 0;
      height: 40px;
      padding: 0;
      border: none;
      background: transparent;
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-lg);
      color: var(--ux-text);
      outline: none;
    }

    .ux-command__input::placeholder {
      color: var(--ux-text-tertiary);
    }

    .ux-command__shortcut {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .ux-command__key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 6px;
      font-size: 0.75rem;
      font-weight: 500;
      font-family: var(--ux-font-family);
      color: var(--ux-text-tertiary);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
    }

    /* ==========================================================================
       Results List
       ========================================================================== */

    .ux-command__results {
      max-height: calc(70dvh - 80px);
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .ux-command__group {
      padding: var(--ux-space-sm) 0;
    }

    .ux-command__group-title {
      padding: var(--ux-space-xs) var(--ux-space-lg);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ux-text-tertiary);
    }

    .ux-command__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* ==========================================================================
       Result Item
       ========================================================================== */

    .ux-command__item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-command__item:hover,
    .ux-command__item--active {
      background: var(--ux-surface-secondary);
    }

    .ux-command__item--active {
      background: var(--ux-primary-tint);
    }

    .ux-command__item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      color: var(--ux-text-secondary);
      background: var(--ux-surface-tertiary);
      border-radius: var(--ux-radius-md);
    }

    .ux-command__item-icon svg {
      width: 18px;
      height: 18px;
    }

    .ux-command__item--active .ux-command__item-icon {
      background: var(--ux-primary);
      color: white;
    }

    .ux-command__item-content {
      flex: 1;
      min-width: 0;
    }

    .ux-command__item-title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-command__item-description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-command__item-shortcut {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    /* ==========================================================================
       Highlight
       ========================================================================== */

    .ux-command__highlight {
      color: var(--ux-primary);
      font-weight: 600;
      background: transparent;
    }

    /* ==========================================================================
       Footer
       ========================================================================== */

    .ux-command__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface-secondary);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    .ux-command__footer-hints {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-command__footer-hint {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .ux-command__footer-hint .ux-command__key {
      min-width: 20px;
      height: 20px;
      padding: 0 4px;
      font-size: 0.6875rem;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-command__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-2xl);
      text-align: center;
    }

    .ux-command__empty-icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      opacity: 0.5;
    }

    .ux-command__empty-title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-command__empty-description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Loading State
       ========================================================================== */

    .ux-command__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
    }

    .ux-command__loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-command-spin 0.8s linear infinite;
    }

    @keyframes ux-command-spin {
      to { transform: rotate(360deg); }
    }

    /* ==========================================================================
       Recent Items
       ========================================================================== */

    .ux-command__recent {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      font-size: 0.6875rem;
      color: var(--ux-text-tertiary);
      background: var(--ux-surface-tertiary);
      border-radius: var(--ux-radius-sm);
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-command--glass {
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur-heavy));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy));
      border: 1px solid var(--ux-glass-border);
    }

    .ux-command--glass .ux-command__search {
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-command--glass .ux-command__footer {
      background: rgba(0, 0, 0, 0.05);
      border-top-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Mobile Adjustments
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-command {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        width: 100%;
        max-width: none;
        max-height: none;
        border-radius: 0;
      }

      .ux-command--open {
        transform: translateY(0);
      }

      .ux-command__search {
        padding: var(--ux-space-md);
        padding-top: calc(var(--ux-safe-top) + var(--ux-space-md));
      }

      .ux-command__results {
        max-height: none;
        height: 100%;
      }

      .ux-command__footer {
        padding-bottom: calc(var(--ux-safe-bottom) + var(--ux-space-sm));
      }

      .ux-command__shortcut {
        display: none;
      }
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-command-backdrop {
        background: rgba(0, 0, 0, 0.7);
      }

      .ux-command--glass .ux-command__footer {
        background: rgba(255, 255, 255, 0.03);
      }
    }

    .ux-dark .ux-command-backdrop {
      background: rgba(0, 0, 0, 0.7);
    }

    .ux-dark .ux-command--glass .ux-command__footer {
      background: rgba(255, 255, 255, 0.03);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-command,
      .ux-command-backdrop,
      .ux-command__item {
        transition: none;
      }

      .ux-command__loading-spinner {
        animation: none;
      }
    }
  `;

  // Icons
  const icons = {
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    enter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>`,
    command: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`,
    file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 8l6 6M14 8l-6 6"/></svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-command-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-command-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const commandData = (options = {}) => ({
    // Configuration
    placeholder: options.placeholder || 'Buscar comandos...',
    commands: options.commands || [],
    groups: options.groups || [],
    maxRecent: options.maxRecent ?? 5,
    closeOnSelect: options.closeOnSelect ?? true,
    fuzzySearch: options.fuzzySearch ?? true,
    showShortcuts: options.showShortcuts ?? true,
    showFooter: options.showFooter ?? true,
    loading: false,
    loadResults: options.loadResults || null,

    // State
    isOpen: false,
    query: '',
    activeIndex: 0,
    recentCommands: [],
    filteredCommands: [],

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      // Load recent commands from localStorage
      this.loadRecent();

      // Global keyboard shortcut
      this._keyHandler = (e) => {
        // Cmd/Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }

        // Escape to close
        if (e.key === 'Escape' && this.isOpen) {
          e.preventDefault();
          this.close();
        }
      };
      document.addEventListener('keydown', this._keyHandler);

      // Initialize filtered results
      this.filterCommands();
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
    },

    // Open palette
    open() {
      this.isOpen = true;
      this.query = '';
      this.activeIndex = 0;
      this.filterCommands();

      // Lock scroll
      if (window.UX && window.UX.lockScroll) {
        window.UX.lockScroll();
      }

      // Focus input
      this.$nextTick(() => {
        const input = this.$el.querySelector('.ux-command__input');
        if (input) input.focus();
      });

      this.$dispatch('command:open');
    },

    // Close palette
    close() {
      this.isOpen = false;
      this.query = '';

      // Unlock scroll
      if (window.UX && window.UX.unlockScroll) {
        window.UX.unlockScroll();
      }

      this.$dispatch('command:close');
    },

    // Toggle palette
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    // Filter commands based on query
    async filterCommands() {
      const query = this.query.toLowerCase().trim();

      // If custom loader provided
      if (this.loadResults && query.length > 0) {
        this.loading = true;
        try {
          this.filteredCommands = await this.loadResults(query);
        } catch (error) {
          console.error('Command search error:', error);
          this.filteredCommands = [];
        } finally {
          this.loading = false;
        }
        return;
      }

      // Get all commands from groups or flat list
      let allCommands = [...this.commands];
      this.groups.forEach(group => {
        if (group.commands) {
          allCommands = allCommands.concat(group.commands.map(cmd => ({
            ...cmd,
            group: group.name
          })));
        }
      });

      // No query - show recent + all
      if (!query) {
        this.filteredCommands = this.recentCommands.length > 0
          ? [
              { group: 'Recientes', commands: this.recentCommands.slice(0, this.maxRecent) },
              ...this.groupCommands(allCommands)
            ]
          : this.groupCommands(allCommands);
        return;
      }

      // Filter by query
      const results = allCommands.filter(cmd => {
        const title = (cmd.title || cmd.name || '').toLowerCase();
        const description = (cmd.description || '').toLowerCase();
        const keywords = (cmd.keywords || []).join(' ').toLowerCase();

        if (this.fuzzySearch) {
          return this.fuzzyMatch(query, title) ||
                 this.fuzzyMatch(query, description) ||
                 this.fuzzyMatch(query, keywords);
        } else {
          return title.includes(query) ||
                 description.includes(query) ||
                 keywords.includes(query);
        }
      });

      this.filteredCommands = this.groupCommands(results);
      this.activeIndex = 0;
    },

    // Group commands by their group property
    groupCommands(commands) {
      const grouped = {};
      commands.forEach(cmd => {
        const groupName = cmd.group || 'Comandos';
        if (!grouped[groupName]) {
          grouped[groupName] = [];
        }
        grouped[groupName].push(cmd);
      });

      return Object.entries(grouped).map(([name, cmds]) => ({
        group: name,
        commands: cmds
      }));
    },

    // Simple fuzzy matching
    fuzzyMatch(query, text) {
      if (!text) return false;
      let queryIndex = 0;
      for (let i = 0; i < text.length && queryIndex < query.length; i++) {
        if (text[i] === query[queryIndex]) {
          queryIndex++;
        }
      }
      return queryIndex === query.length;
    },

    // Highlight matching text
    highlightMatch(text, query) {
      if (!query || !text) return text;

      const lowerText = text.toLowerCase();
      const lowerQuery = query.toLowerCase();
      const index = lowerText.indexOf(lowerQuery);

      if (index === -1) return text;

      const before = text.slice(0, index);
      const match = text.slice(index, index + query.length);
      const after = text.slice(index + query.length);

      return `${before}<span class="ux-command__highlight">${match}</span>${after}`;
    },

    // Get flat list of all visible commands
    getFlatCommands() {
      const flat = [];
      this.filteredCommands.forEach(group => {
        if (group.commands) {
          group.commands.forEach(cmd => flat.push(cmd));
        }
      });
      return flat;
    },

    // Handle keyboard navigation
    handleKeydown(e) {
      const flatCommands = this.getFlatCommands();

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.activeIndex = Math.min(this.activeIndex + 1, flatCommands.length - 1);
          this.scrollToActive();
          break;

        case 'ArrowUp':
          e.preventDefault();
          this.activeIndex = Math.max(this.activeIndex - 1, 0);
          this.scrollToActive();
          break;

        case 'Enter':
          e.preventDefault();
          const activeCommand = flatCommands[this.activeIndex];
          if (activeCommand) {
            this.executeCommand(activeCommand);
          }
          break;

        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
          } else {
            this.activeIndex = Math.min(this.activeIndex + 1, flatCommands.length - 1);
          }
          this.scrollToActive();
          break;
      }
    },

    // Scroll to keep active item visible
    scrollToActive() {
      this.$nextTick(() => {
        const activeEl = this.$el.querySelector('.ux-command__item--active');
        if (activeEl) {
          activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    },

    // Execute a command
    executeCommand(command) {
      // Add to recent
      this.addToRecent(command);

      // Dispatch event
      this.$dispatch('command:execute', { command });

      // Run action if provided
      if (command.action && typeof command.action === 'function') {
        command.action(command);
      }

      // Handle URL navigation
      if (command.url) {
        window.location.href = command.url;
      }

      // Close if configured
      if (this.closeOnSelect) {
        this.close();
      }
    },

    // Add command to recent list
    addToRecent(command) {
      // Remove if already exists
      this.recentCommands = this.recentCommands.filter(c => c.id !== command.id);

      // Add to beginning
      this.recentCommands.unshift({
        ...command,
        recent: true
      });

      // Limit size
      if (this.recentCommands.length > this.maxRecent) {
        this.recentCommands = this.recentCommands.slice(0, this.maxRecent);
      }

      // Save to localStorage
      this.saveRecent();
    },

    // Load recent from localStorage
    loadRecent() {
      try {
        const stored = localStorage.getItem('ux-command-recent');
        if (stored) {
          this.recentCommands = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Could not load recent commands:', e);
      }
    },

    // Save recent to localStorage
    saveRecent() {
      try {
        localStorage.setItem('ux-command-recent', JSON.stringify(
          this.recentCommands.map(({ action, ...cmd }) => cmd)
        ));
      } catch (e) {
        console.warn('Could not save recent commands:', e);
      }
    },

    // Clear recent commands
    clearRecent() {
      this.recentCommands = [];
      localStorage.removeItem('ux-command-recent');
      this.filterCommands();
    },

    // Check if item is active
    isActiveItem(groupIndex, itemIndex) {
      let count = 0;
      for (let g = 0; g < groupIndex; g++) {
        if (this.filteredCommands[g] && this.filteredCommands[g].commands) {
          count += this.filteredCommands[g].commands.length;
        }
      }
      return count + itemIndex === this.activeIndex;
    },

    // Get default icon for command
    getIcon(command) {
      if (command.icon) {
        // If it's an SVG string, return as-is
        if (command.icon.includes('<svg')) {
          return command.icon;
        }
        // If it's a key to our icons object
        if (this.icons[command.icon]) {
          return this.icons[command.icon];
        }
      }
      // Default icon
      return this.icons.arrow;
    },

    // Format shortcut for display
    formatShortcut(shortcut) {
      if (!shortcut) return [];

      // Replace common symbols
      return shortcut
        .replace('Cmd', '⌘')
        .replace('Ctrl', 'Ctrl')
        .replace('Alt', '⌥')
        .replace('Shift', '⇧')
        .replace('Enter', '↵')
        .split('+')
        .map(key => key.trim());
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCommand', commandData);
  }

  // Expose icons for external use
  window.UX = window.UX || {};
  window.UX.commandIcons = icons;
})();
