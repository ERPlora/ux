/**
 * UX Rich Text Editor Component
 * WYSIWYG editor with formatting toolbar
 * @requires ux-core.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       CSS Variables
    ======================================== */

    :root {
      --ux-rich-text-min-height: 200px;
      --ux-rich-text-max-height: none;
      --ux-rich-text-border-radius: var(--ux-border-radius);
      --ux-rich-text-toolbar-bg: var(--ux-surface-secondary);
      --ux-rich-text-toolbar-btn-size: 44px;
      --ux-rich-text-toolbar-btn-size-sm: 36px;
      --ux-rich-text-content-padding: var(--ux-space-lg);
      --ux-rich-text-font-size: 16px;
    }

    /* ========================================
       Container
    ======================================== */

    .ux-rich-text {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-rich-text-border-radius);
      overflow: hidden;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-rich-text:focus-within {
      border-color: var(--ux-primary);
      box-shadow: 0 0 0 3px rgba(var(--ux-primary-rgb), 0.15);
    }

    /* ========================================
       Toolbar
    ======================================== */

    .ux-rich-text__toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-rich-text-toolbar-bg);
      border-bottom: 1px solid var(--ux-border-color);
      min-height: 52px;
    }

    .ux-rich-text__toolbar-group {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .ux-rich-text__toolbar-divider {
      width: 1px;
      height: 24px;
      background-color: var(--ux-border-color);
      margin: 0 var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* ========================================
       Toolbar Buttons
    ======================================== */

    .ux-rich-text__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-rich-text-toolbar-btn-size);
      min-height: var(--ux-rich-text-toolbar-btn-size);
      padding: var(--ux-space-xs);
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-rich-text__btn:hover {
      background-color: var(--ux-light);
      color: var(--ux-text);
    }

    .ux-rich-text__btn:active {
      background-color: var(--ux-light-shade);
    }

    .ux-rich-text__btn--active {
      background-color: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    .ux-rich-text__btn--active:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
      color: var(--ux-primary);
    }

    .ux-rich-text__btn:disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .ux-rich-text__btn svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* Dropdown button */
    .ux-rich-text__btn--dropdown {
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-rich-text__btn--dropdown svg:last-child {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Dropdown Menu
    ======================================== */

    .ux-rich-text__dropdown {
      position: relative;
    }

    .ux-rich-text__dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--ux-z-dropdown);
      min-width: 150px;
      margin-top: var(--ux-space-xs);
      padding: var(--ux-space-xs);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius);
      box-shadow: var(--ux-shadow-lg);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        visibility var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-rich-text__dropdown-menu--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-rich-text__dropdown-item {
      display: block;
      width: 100%;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      border-radius: var(--ux-border-radius-sm);
      text-align: left;
      color: var(--ux-text);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-rich-text__dropdown-item:hover {
      background-color: var(--ux-surface-secondary);
    }

    .ux-rich-text__dropdown-item--h1 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .ux-rich-text__dropdown-item--h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .ux-rich-text__dropdown-item--h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    /* ========================================
       Editor Content Area
    ======================================== */

    .ux-rich-text__editor {
      flex: 1;
      min-height: var(--ux-rich-text-min-height);
      max-height: var(--ux-rich-text-max-height);
      padding: var(--ux-rich-text-content-padding);
      font-family: var(--ux-font-family);
      font-size: var(--ux-rich-text-font-size);
      line-height: 1.6;
      color: var(--ux-text);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      outline: none;
    }

    .ux-rich-text__editor:empty::before {
      content: attr(data-placeholder);
      color: var(--ux-text-tertiary);
      pointer-events: none;
    }

    /* Editor content styles */
    .ux-rich-text__editor h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 var(--ux-space-md);
      line-height: 1.3;
    }

    .ux-rich-text__editor h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 var(--ux-space-md);
      line-height: 1.3;
    }

    .ux-rich-text__editor h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 var(--ux-space-md);
      line-height: 1.3;
    }

    .ux-rich-text__editor p {
      margin: 0 0 var(--ux-space-md);
    }

    .ux-rich-text__editor p:last-child {
      margin-bottom: 0;
    }

    .ux-rich-text__editor ul,
    .ux-rich-text__editor ol {
      margin: 0 0 var(--ux-space-md);
      padding-left: var(--ux-space-xl);
    }

    .ux-rich-text__editor li {
      margin-bottom: var(--ux-space-xs);
    }

    .ux-rich-text__editor a {
      color: var(--ux-primary);
      text-decoration: underline;
    }

    .ux-rich-text__editor img {
      max-width: 100%;
      height: auto;
      border-radius: var(--ux-border-radius);
      margin: var(--ux-space-md) 0;
    }

    .ux-rich-text__editor blockquote {
      margin: 0 0 var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background-color: var(--ux-surface-secondary);
      border-left: 4px solid var(--ux-primary);
      border-radius: 0 var(--ux-border-radius) var(--ux-border-radius) 0;
    }

    .ux-rich-text__editor code {
      padding: 2px 6px;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-sm);
      font-family: var(--ux-font-family-mono, monospace);
      font-size: 0.9em;
    }

    .ux-rich-text__editor pre {
      margin: 0 0 var(--ux-space-md);
      padding: var(--ux-space-md);
      background-color: var(--ux-gray-900);
      border-radius: var(--ux-border-radius);
      overflow-x: auto;
    }

    .ux-rich-text__editor pre code {
      padding: 0;
      background: none;
      color: var(--ux-gray-100);
    }

    .ux-rich-text__editor hr {
      margin: var(--ux-space-lg) 0;
      border: none;
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Source View (HTML)
    ======================================== */

    .ux-rich-text__source {
      display: none;
      flex: 1;
      min-height: var(--ux-rich-text-min-height);
      max-height: var(--ux-rich-text-max-height);
      padding: var(--ux-rich-text-content-padding);
      font-family: var(--ux-font-family-mono, monospace);
      font-size: 14px;
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-surface);
      border: none;
      resize: none;
      outline: none;
      overflow-y: auto;
    }

    .ux-rich-text--source-view .ux-rich-text__editor {
      display: none;
    }

    .ux-rich-text--source-view .ux-rich-text__source {
      display: block;
    }

    /* ========================================
       Footer (Counter)
    ======================================== */

    .ux-rich-text__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-rich-text__counter {
      display: flex;
      gap: var(--ux-space-md);
    }

    .ux-rich-text__counter span {
      white-space: nowrap;
    }

    /* ========================================
       States
    ======================================== */

    /* Error */
    .ux-rich-text--error {
      border-color: var(--ux-danger);
    }

    .ux-rich-text--error:focus-within {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    /* Disabled */
    .ux-rich-text--disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .ux-rich-text--disabled .ux-rich-text__editor {
      background-color: var(--ux-light);
    }

    /* Read-only */
    .ux-rich-text--readonly .ux-rich-text__toolbar {
      display: none;
    }

    .ux-rich-text--readonly .ux-rich-text__editor {
      background-color: var(--ux-light);
    }

    .ux-rich-text--readonly .ux-rich-text__footer {
      display: none;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-rich-text--sm {
      --ux-rich-text-min-height: 120px;
      --ux-rich-text-toolbar-btn-size: 36px;
      --ux-rich-text-content-padding: var(--ux-space-md);
      --ux-rich-text-font-size: 14px;
    }

    .ux-rich-text--sm .ux-rich-text__btn svg {
      width: 18px;
      height: 18px;
    }

    .ux-rich-text--lg {
      --ux-rich-text-min-height: 300px;
      --ux-rich-text-content-padding: var(--ux-space-xl);
      --ux-rich-text-font-size: 18px;
    }

    /* ========================================
       Compact Toolbar (mobile)
    ======================================== */

    @media (max-width: 767px) {
      .ux-rich-text__toolbar {
        overflow-x: auto;
        flex-wrap: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .ux-rich-text__toolbar::-webkit-scrollbar {
        display: none;
      }

      .ux-rich-text__toolbar-group {
        flex-shrink: 0;
      }
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    .ux-rich-text--glass {
      background: var(--ux-glass-bg);
      border: 0.5px solid var(--ux-glass-border);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
    }

    .ux-rich-text--glass:focus-within {
      border-color: var(--ux-glass-border);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-rich-text--glass .ux-rich-text__toolbar {
      background: var(--ux-glass-bg-thin);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-rich-text--glass .ux-rich-text__editor {
      background: transparent;
    }

    .ux-rich-text--glass .ux-rich-text__source {
      background: transparent;
    }

    .ux-rich-text--glass .ux-rich-text__footer {
      background: var(--ux-glass-bg-thin);
      border-top-color: var(--ux-glass-border);
    }

    .ux-rich-text--glass .ux-rich-text__btn:hover {
      background-color: var(--ux-glass-bg);
    }

    .ux-rich-text--glass .ux-rich-text__dropdown-menu {
      background: var(--ux-glass-bg);
      border-color: var(--ux-glass-border);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-rich-text__toolbar {
        background-color: var(--ux-surface-secondary);
      }

      .ux-rich-text__footer {
        background-color: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-rich-text__toolbar {
      background-color: var(--ux-surface-secondary);
    }

    .ux-dark .ux-rich-text__footer {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-rich-text,
      .ux-rich-text__btn,
      .ux-rich-text__dropdown-menu {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-rich-text-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-rich-text-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // SVG Icons
  const icons = {
    bold: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>',
    italic: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9m4 16H5M15 4L9 20"/></svg>',
    underline: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8v8a5 5 0 0010 0V8M5 21h14"/></svg>',
    strikethrough: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4H9a4 4 0 00-1 7.874M4 12h16M8 20h7a4 4 0 001-7.874"/></svg>',
    listUl: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12"/></svg>',
    listOl: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h.01M4 12h.01M4 18h.01M8 6h12M8 12h12M8 18h12"/><text x="2" y="8" font-size="6" fill="currentColor">1</text><text x="2" y="14" font-size="6" fill="currentColor">2</text><text x="2" y="20" font-size="6" fill="currentColor">3</text></svg>',
    link: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>',
    image: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
    alignLeft: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h14"/></svg>',
    alignCenter: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M7 12h10M5 18h14"/></svg>',
    alignRight: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M10 12h10M6 18h14"/></svg>',
    alignJustify: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
    undo: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>',
    redo: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"/></svg>',
    code: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    quote: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
    heading: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8M4 18h16"/></svg>',
    chevronDown: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>',
    unlink: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7h3a2 2 0 012 2v6a2 2 0 01-2 2h-3M7 7H4a2 2 0 00-2 2v6a2 2 0 002 2h3M1 1l22 22"/></svg>',
    hr: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"/></svg>'
  };

  // Alpine component
  const richTextComponent = (config = {}) => ({
    // State
    content: config.content || '',
    sourceView: false,
    headingDropdownOpen: false,
    alignDropdownOpen: false,
    placeholder: config.placeholder || 'Start typing...',
    readonly: config.readonly || false,
    disabled: config.disabled || false,
    maxLength: config.maxLength || null,

    // Formatting state (updated on selection change)
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isList: false,
    isOrderedList: false,
    currentHeading: 'p',
    currentAlign: 'left',

    // Counters
    charCount: 0,
    wordCount: 0,

    // Icons reference
    icons,

    init() {
      // Initialize content
      if (this.content && this.$refs.editor) {
        this.$refs.editor.innerHTML = this.content;
      }

      // Update counters
      this.updateCounters();

      // Listen for selection changes
      document.addEventListener('selectionchange', () => {
        if (this.$refs.editor && this.$refs.editor.contains(document.activeElement)) {
          this.updateFormattingState();
        }
      });

      // Close dropdowns on outside click
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) {
          this.headingDropdownOpen = false;
          this.alignDropdownOpen = false;
        }
      });
    },

    // Execute command
    exec(command, value = null) {
      if (this.readonly || this.disabled) return;

      // Focus editor if not focused
      if (document.activeElement !== this.$refs.editor) {
        this.$refs.editor.focus();
      }

      document.execCommand(command, false, value);
      this.updateFormattingState();
      this.updateCounters();
      this.syncContent();
    },

    // Format commands
    toggleBold() {
      this.exec('bold');
    },

    toggleItalic() {
      this.exec('italic');
    },

    toggleUnderline() {
      this.exec('underline');
    },

    toggleStrikethrough() {
      this.exec('strikethrough');
    },

    toggleUnorderedList() {
      this.exec('insertUnorderedList');
    },

    toggleOrderedList() {
      this.exec('insertOrderedList');
    },

    toggleBlockquote() {
      this.exec('formatBlock', 'blockquote');
    },

    insertHorizontalRule() {
      this.exec('insertHorizontalRule');
    },

    // Headings
    setHeading(tag) {
      this.exec('formatBlock', tag);
      this.headingDropdownOpen = false;
      this.currentHeading = tag;
    },

    // Alignment
    setAlign(align) {
      const commands = {
        left: 'justifyLeft',
        center: 'justifyCenter',
        right: 'justifyRight',
        justify: 'justifyFull'
      };
      this.exec(commands[align]);
      this.alignDropdownOpen = false;
      this.currentAlign = align;
    },

    // Links
    insertLink() {
      const url = prompt('Enter URL:', 'https://');
      if (url) {
        this.exec('createLink', url);
      }
    },

    removeLink() {
      this.exec('unlink');
    },

    // Images
    insertImage() {
      const url = prompt('Enter image URL:', 'https://');
      if (url) {
        this.exec('insertImage', url);
      }
    },

    // Undo/Redo
    undo() {
      this.exec('undo');
    },

    redo() {
      this.exec('redo');
    },

    // Source view toggle
    toggleSourceView() {
      if (this.sourceView) {
        // Switching from source to WYSIWYG
        this.$refs.editor.innerHTML = this.$refs.source.value;
      } else {
        // Switching from WYSIWYG to source
        this.$refs.source.value = this.$refs.editor.innerHTML;
      }
      this.sourceView = !this.sourceView;
      this.syncContent();
    },

    // Update formatting state based on selection
    updateFormattingState() {
      this.isBold = document.queryCommandState('bold');
      this.isItalic = document.queryCommandState('italic');
      this.isUnderline = document.queryCommandState('underline');
      this.isStrikethrough = document.queryCommandState('strikethrough');
      this.isList = document.queryCommandState('insertUnorderedList');
      this.isOrderedList = document.queryCommandState('insertOrderedList');

      // Check alignment
      if (document.queryCommandState('justifyCenter')) {
        this.currentAlign = 'center';
      } else if (document.queryCommandState('justifyRight')) {
        this.currentAlign = 'right';
      } else if (document.queryCommandState('justifyFull')) {
        this.currentAlign = 'justify';
      } else {
        this.currentAlign = 'left';
      }

      // Check heading
      const block = document.queryCommandValue('formatBlock');
      if (block) {
        this.currentHeading = block.toLowerCase();
      }
    },

    // Update character and word counts
    updateCounters() {
      const text = this.$refs.editor ? this.$refs.editor.innerText || '' : '';
      this.charCount = text.length;
      this.wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    },

    // Sync content to model
    syncContent() {
      if (this.sourceView) {
        this.content = this.$refs.source.value;
      } else {
        this.content = this.$refs.editor.innerHTML;
      }
      this.$dispatch('rich-text:change', { content: this.content });
    },

    // Handle input in editor
    handleInput() {
      this.updateCounters();
      this.syncContent();
    },

    // Handle paste - strip formatting if needed
    handlePaste(e) {
      if (config.plainTextPaste) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      }
      this.updateCounters();
      this.syncContent();
    },

    // Handle keydown for keyboard shortcuts
    handleKeydown(e) {
      // Ctrl/Cmd + B = Bold
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        this.toggleBold();
      }
      // Ctrl/Cmd + I = Italic
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        this.toggleItalic();
      }
      // Ctrl/Cmd + U = Underline
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        this.toggleUnderline();
      }
      // Ctrl/Cmd + Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y = Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        this.redo();
      }
    },

    // Get HTML content
    getHTML() {
      return this.content;
    },

    // Set HTML content
    setHTML(html) {
      this.content = html;
      if (this.$refs.editor) {
        this.$refs.editor.innerHTML = html;
      }
      if (this.$refs.source) {
        this.$refs.source.value = html;
      }
      this.updateCounters();
    },

    // Clear content
    clear() {
      this.content = '';
      if (this.$refs.editor) {
        this.$refs.editor.innerHTML = '';
      }
      if (this.$refs.source) {
        this.$refs.source.value = '';
      }
      this.updateCounters();
    },

    // Focus editor
    focus() {
      if (this.$refs.editor) {
        this.$refs.editor.focus();
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxRichText', richTextComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxRichText', richTextComponent);
    });
  }
})();
