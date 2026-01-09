/**
 * UX Code Block Component
 * Syntax highlighted code display with copy button, line numbers, and theming
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Code Block - Base
    ======================================== */

    .ux-code-block {
      position: relative;
      font-family: 'SF Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
      background: var(--ux-gray-900);
      color: var(--ux-gray-100);
    }

    /* ========================================
       Header
    ======================================== */

    .ux-code-block__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--ux-gray-800);
      border-bottom: 1px solid var(--ux-gray-700);
    }

    .ux-code-block__title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-gray-400);
    }

    .ux-code-block__lang {
      padding: 0.125rem 0.5rem;
      background: var(--ux-gray-700);
      border-radius: var(--ux-radius-sm);
      font-size: 0.6875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ux-gray-300);
    }

    .ux-code-block__actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ux-code-block__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      padding: 0.375rem 0.625rem;
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-sm);
      color: var(--ux-gray-400);
      font-size: 0.75rem;
      font-family: inherit;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-code-block__btn:hover {
      background: var(--ux-gray-700);
      color: var(--ux-gray-200);
    }

    .ux-code-block__btn--copied {
      color: var(--ux-success);
    }

    .ux-code-block__btn svg {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Content
    ======================================== */

    .ux-code-block__content {
      display: flex;
      overflow-x: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--ux-gray-600) transparent;
    }

    .ux-code-block__content::-webkit-scrollbar {
      height: 8px;
    }

    .ux-code-block__content::-webkit-scrollbar-track {
      background: transparent;
    }

    .ux-code-block__content::-webkit-scrollbar-thumb {
      background: var(--ux-gray-600);
      border-radius: 4px;
    }

    /* ========================================
       Line Numbers
    ======================================== */

    .ux-code-block__line-numbers {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;
      background: var(--ux-gray-850, rgba(0, 0, 0, 0.2));
      border-right: 1px solid var(--ux-gray-700);
      user-select: none;
      flex-shrink: 0;
    }

    .ux-code-block__line-number {
      padding: 0 1rem;
      color: var(--ux-gray-500);
      text-align: right;
      font-size: 0.75rem;
      line-height: 1.6;
    }

    .ux-code-block__line-number--highlight {
      background: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-gray-300);
    }

    /* ========================================
       Code
    ======================================== */

    .ux-code-block__code {
      flex: 1;
      margin: 0;
      padding: 1rem;
      overflow: visible;
      white-space: pre;
      background: transparent;
      font: inherit;
    }

    .ux-code-block__line {
      display: block;
      padding: 0 0.5rem;
      border-left: 3px solid transparent;
    }

    .ux-code-block__line--highlight {
      background: rgba(var(--ux-primary-rgb), 0.15);
      border-left-color: var(--ux-primary);
    }

    /* ========================================
       Syntax Highlighting (Basic Tokens)
    ======================================== */

    .ux-code-block .token-keyword {
      color: #c678dd;
    }

    .ux-code-block .token-string {
      color: #98c379;
    }

    .ux-code-block .token-number {
      color: #d19a66;
    }

    .ux-code-block .token-comment {
      color: #5c6370;
      font-style: italic;
    }

    .ux-code-block .token-function {
      color: #61afef;
    }

    .ux-code-block .token-class {
      color: #e5c07b;
    }

    .ux-code-block .token-operator {
      color: #56b6c2;
    }

    .ux-code-block .token-punctuation {
      color: #abb2bf;
    }

    .ux-code-block .token-property {
      color: #e06c75;
    }

    .ux-code-block .token-tag {
      color: #e06c75;
    }

    .ux-code-block .token-attr-name {
      color: #d19a66;
    }

    .ux-code-block .token-attr-value {
      color: #98c379;
    }

    .ux-code-block .token-selector {
      color: #c678dd;
    }

    .ux-code-block .token-variable {
      color: #e06c75;
    }

    .ux-code-block .token-constant {
      color: #56b6c2;
    }

    .ux-code-block .token-boolean {
      color: #d19a66;
    }

    .ux-code-block .token-regex {
      color: #56b6c2;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-code-block--sm {
      font-size: 0.75rem;
    }

    .ux-code-block--sm .ux-code-block__line-number {
      font-size: 0.6875rem;
    }

    .ux-code-block--lg {
      font-size: 1rem;
    }

    .ux-code-block--lg .ux-code-block__line-number {
      font-size: 0.875rem;
    }

    /* ========================================
       Themes
    ======================================== */

    /* Light Theme */
    .ux-code-block--light {
      background: var(--ux-gray-50);
      color: var(--ux-gray-800);
    }

    .ux-code-block--light .ux-code-block__header {
      background: var(--ux-gray-100);
      border-bottom-color: var(--ux-gray-200);
    }

    .ux-code-block--light .ux-code-block__lang {
      background: var(--ux-gray-200);
      color: var(--ux-gray-600);
    }

    .ux-code-block--light .ux-code-block__btn {
      color: var(--ux-gray-500);
    }

    .ux-code-block--light .ux-code-block__btn:hover {
      background: var(--ux-gray-200);
      color: var(--ux-gray-700);
    }

    .ux-code-block--light .ux-code-block__line-numbers {
      background: var(--ux-gray-100);
      border-right-color: var(--ux-gray-200);
    }

    .ux-code-block--light .ux-code-block__line-number {
      color: var(--ux-gray-400);
    }

    .ux-code-block--light .token-keyword { color: #8250df; }
    .ux-code-block--light .token-string { color: #0a3069; }
    .ux-code-block--light .token-number { color: #0550ae; }
    .ux-code-block--light .token-comment { color: #6e7781; }
    .ux-code-block--light .token-function { color: #8250df; }
    .ux-code-block--light .token-class { color: #953800; }
    .ux-code-block--light .token-operator { color: #cf222e; }
    .ux-code-block--light .token-punctuation { color: #24292f; }
    .ux-code-block--light .token-property { color: #0550ae; }
    .ux-code-block--light .token-tag { color: #116329; }
    .ux-code-block--light .token-attr-name { color: #0550ae; }
    .ux-code-block--light .token-attr-value { color: #0a3069; }

    /* ========================================
       Inline Code
    ======================================== */

    .ux-code-inline {
      display: inline;
      padding: 0.125rem 0.375rem;
      background: var(--ux-gray-100);
      border-radius: var(--ux-radius-sm);
      font-family: 'SF Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: 0.875em;
      color: var(--ux-gray-700);
    }

    .ux-dark .ux-code-inline {
      background: var(--ux-gray-800);
      color: var(--ux-gray-200);
    }

    /* ========================================
       No Header Variant
    ======================================== */

    .ux-code-block--no-header .ux-code-block__header {
      display: none;
    }

    /* ========================================
       Collapsible
    ======================================== */

    .ux-code-block--collapsed .ux-code-block__content {
      max-height: 200px;
      overflow: hidden;
      position: relative;
    }

    .ux-code-block--collapsed .ux-code-block__content::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, var(--ux-gray-900));
      pointer-events: none;
    }

    .ux-code-block__expand {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      background: var(--ux-gray-800);
      border-top: 1px solid var(--ux-gray-700);
      color: var(--ux-gray-400);
      font-size: 0.75rem;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-code-block__expand:hover {
      background: var(--ux-gray-750, var(--ux-gray-700));
      color: var(--ux-gray-200);
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-code-block--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 1px solid var(--ux-glass-border);
    }

    .ux-code-block--glass .ux-code-block__header {
      background: rgba(255, 255, 255, 0.05);
      border-bottom-color: var(--ux-glass-border);
    }

    .ux-code-block--glass .ux-code-block__line-numbers {
      background: rgba(0, 0, 0, 0.1);
      border-right-color: var(--ux-glass-border);
    }

    /* ========================================
       Diff View
    ======================================== */

    .ux-code-block__line--added {
      background: rgba(46, 160, 67, 0.15);
      border-left-color: var(--ux-success);
    }

    .ux-code-block__line--removed {
      background: rgba(248, 81, 73, 0.15);
      border-left-color: var(--ux-danger);
    }

    .ux-code-block__line--added::before {
      content: '+';
      margin-right: 0.5rem;
      color: var(--ux-success);
    }

    .ux-code-block__line--removed::before {
      content: '-';
      margin-right: 0.5rem;
      color: var(--ux-danger);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-code-block__btn {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-code-block-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-code-block-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Simple syntax highlighting rules
  const syntaxRules = {
    javascript: [
      { pattern: /(\/\/.*$)/gm, className: 'token-comment' },
      { pattern: /(\/\*[\s\S]*?\*\/)/g, className: 'token-comment' },
      { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, className: 'token-string' },
      { pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of)\b/g, className: 'token-keyword' },
      { pattern: /\b(\d+\.?\d*)\b/g, className: 'token-number' },
      { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'token-boolean' },
      { pattern: /([a-zA-Z_$][\w$]*)\s*\(/g, className: 'token-function', group: 1 },
      { pattern: /\b([A-Z][a-zA-Z0-9_]*)\b/g, className: 'token-class' },
      { pattern: /([\+\-\*\/\%\=\!\<\>\&\|\^\~\?])/g, className: 'token-operator' },
      { pattern: /([\{\}\[\]\(\)\;\,\.])/g, className: 'token-punctuation' }
    ],
    html: [
      { pattern: /(&lt;!--[\s\S]*?--&gt;|<!--[\s\S]*?-->)/g, className: 'token-comment' },
      { pattern: /(&lt;\/?)([\w-]+)/g, className: 'token-tag', group: 2 },
      { pattern: /(\s)([\w-]+)(=)/g, className: 'token-attr-name', group: 2 },
      { pattern: /(=)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, className: 'token-attr-value', group: 2 }
    ],
    css: [
      { pattern: /(\/\*[\s\S]*?\*\/)/g, className: 'token-comment' },
      { pattern: /([.#]?[\w-]+)\s*\{/g, className: 'token-selector', group: 1 },
      { pattern: /([\w-]+)\s*:/g, className: 'token-property', group: 1 },
      { pattern: /:\s*([^;{}]+)/g, className: 'token-string', group: 1 },
      { pattern: /(\d+\.?\d*)(px|em|rem|%|vh|vw|deg|s|ms)?/g, className: 'token-number' }
    ],
    json: [
      { pattern: /("(?:[^"\\]|\\.)*")\s*:/g, className: 'token-property', group: 1 },
      { pattern: /:\s*("(?:[^"\\]|\\.)*")/g, className: 'token-string', group: 1 },
      { pattern: /:\s*(\d+\.?\d*)/g, className: 'token-number', group: 1 },
      { pattern: /:\s*(true|false|null)/g, className: 'token-boolean', group: 1 }
    ],
    python: [
      { pattern: /(#.*$)/gm, className: 'token-comment' },
      { pattern: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, className: 'token-string' },
      { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, className: 'token-string' },
      { pattern: /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|lambda|yield|pass|break|continue|and|or|not|in|is|True|False|None)\b/g, className: 'token-keyword' },
      { pattern: /\b(\d+\.?\d*)\b/g, className: 'token-number' },
      { pattern: /\b([a-zA-Z_]\w*)\s*\(/g, className: 'token-function', group: 1 }
    ],
    bash: [
      { pattern: /(#.*$)/gm, className: 'token-comment' },
      { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, className: 'token-string' },
      { pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|sed|awk|export|source)\b/g, className: 'token-keyword' },
      { pattern: /(\$[\w]+|\$\{[\w]+\})/g, className: 'token-variable' }
    ]
  };

  // Escape HTML
  const escapeHtml = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Apply syntax highlighting
  const highlight = (code, language) => {
    if (!code) return '';

    let escaped = escapeHtml(code);
    const rules = syntaxRules[language] || syntaxRules.javascript;

    // Apply rules in order
    for (const rule of rules) {
      escaped = escaped.replace(rule.pattern, (...args) => {
        const match = rule.group !== undefined ? args[rule.group] : args[0];
        const fullMatch = args[0];

        if (rule.group !== undefined) {
          return fullMatch.replace(match, `<span class="${rule.className}">${match}</span>`);
        }

        return `<span class="${rule.className}">${match}</span>`;
      });
    }

    return escaped;
  };

  // Icons
  const icons = {
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    collapse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>'
  };

  // Alpine.js component for code block
  const codeBlockData = (options = {}) => ({
    // Configuration
    code: options.code || '',
    language: options.language || 'javascript',
    filename: options.filename || '',
    showLineNumbers: options.showLineNumbers ?? true,
    showHeader: options.showHeader ?? true,
    showCopy: options.showCopy ?? true,
    highlightLines: options.highlightLines || [], // Array of line numbers to highlight
    startLine: options.startLine || 1,
    maxHeight: options.maxHeight || null,
    collapsible: options.collapsible ?? false,

    // State
    copied: false,
    collapsed: options.collapsed ?? false,
    icons,

    // Get highlighted code
    get highlightedCode() {
      return highlight(this.code, this.language);
    },

    // Get lines
    get lines() {
      return this.code.split('\n');
    },

    // Get highlighted lines
    getHighlightedLines() {
      const lines = this.highlightedCode.split('\n');
      return lines.map((line, index) => ({
        content: line || ' ', // Ensure empty lines have content
        number: this.startLine + index,
        isHighlighted: this.highlightLines.includes(this.startLine + index)
      }));
    },

    // Copy to clipboard
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.code);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);

        this.$dispatch('codeblock:copy', { code: this.code });
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    },

    // Toggle collapsed state
    toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.$dispatch('codeblock:toggle', { collapsed: this.collapsed });
    },

    // Set code programmatically
    setCode(newCode, newLanguage) {
      this.code = newCode;
      if (newLanguage) {
        this.language = newLanguage;
      }
    },

    // Get language display name
    get languageDisplay() {
      const names = {
        javascript: 'JS',
        typescript: 'TS',
        python: 'Python',
        html: 'HTML',
        css: 'CSS',
        json: 'JSON',
        bash: 'Bash',
        shell: 'Shell',
        jsx: 'JSX',
        tsx: 'TSX',
        sql: 'SQL',
        yaml: 'YAML',
        markdown: 'MD'
      };
      return names[this.language] || this.language.toUpperCase();
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxCodeBlock', codeBlockData);
  }

  // Also expose highlight function globally
  if (window.UX) {
    window.UX.highlightCode = highlight;
  }

})();
