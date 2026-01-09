/**
 * UX Diff Viewer Component
 * Visual comparison of text/code changes with unified and split views
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Diff Viewer - Base
    ======================================== */

    .ux-diff {
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Consolas', monospace;
      font-size: 0.8125rem;
      line-height: 1.5;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-diff__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-diff__title {
      font-family: var(--ux-font-family);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-diff__stats {
      display: flex;
      gap: 0.75rem;
      font-family: var(--ux-font-family);
      font-size: 0.75rem;
    }

    .ux-diff__stat--added {
      color: var(--ux-success);
    }

    .ux-diff__stat--removed {
      color: var(--ux-danger);
    }

    .ux-diff__actions {
      display: flex;
      gap: 0.5rem;
    }

    .ux-diff__action {
      padding: 0.375rem 0.75rem;
      font-family: var(--ux-font-family);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-diff__action:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-diff__action--active {
      background: var(--ux-primary);
      color: white;
      border-color: var(--ux-primary);
    }

    /* ========================================
       Content
    ======================================== */

    .ux-diff__content {
      overflow-x: auto;
    }

    .ux-diff__table {
      width: 100%;
      border-collapse: collapse;
    }

    /* ========================================
       Unified View
    ======================================== */

    .ux-diff--unified .ux-diff__line {
      display: flex;
    }

    .ux-diff__gutter {
      flex-shrink: 0;
      width: 3.5rem;
      padding: 0 0.5rem;
      text-align: right;
      color: var(--ux-text-tertiary);
      background: var(--ux-surface-secondary);
      border-right: 1px solid var(--ux-border-color);
      user-select: none;
    }

    .ux-diff__gutter--old {
      width: 3rem;
    }

    .ux-diff__gutter--new {
      width: 3rem;
    }

    .ux-diff__code {
      flex: 1;
      padding: 0 1rem;
      white-space: pre;
      overflow-x: auto;
    }

    .ux-diff__marker {
      flex-shrink: 0;
      width: 1.5rem;
      text-align: center;
      font-weight: 600;
      user-select: none;
    }

    /* Line Types */
    .ux-diff__line--added {
      background: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-diff__line--added .ux-diff__marker {
      color: var(--ux-success);
    }

    .ux-diff__line--added .ux-diff__gutter {
      background: rgba(var(--ux-success-rgb), 0.15);
    }

    .ux-diff__line--removed {
      background: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-diff__line--removed .ux-diff__marker {
      color: var(--ux-danger);
    }

    .ux-diff__line--removed .ux-diff__gutter {
      background: rgba(var(--ux-danger-rgb), 0.15);
    }

    .ux-diff__line--context {
      background: var(--ux-surface);
    }

    .ux-diff__line--header {
      background: var(--ux-surface-tertiary);
      color: var(--ux-text-secondary);
      font-style: italic;
    }

    /* Inline Highlights */
    .ux-diff__highlight--added {
      background: rgba(var(--ux-success-rgb), 0.3);
      border-radius: 2px;
    }

    .ux-diff__highlight--removed {
      background: rgba(var(--ux-danger-rgb), 0.3);
      border-radius: 2px;
    }

    /* ========================================
       Split View
    ======================================== */

    .ux-diff--split .ux-diff__content {
      display: flex;
    }

    .ux-diff--split .ux-diff__pane {
      flex: 1;
      min-width: 0;
    }

    .ux-diff--split .ux-diff__pane--old {
      border-right: 1px solid var(--ux-border-color);
    }

    .ux-diff--split .ux-diff__pane-header {
      padding: 0.5rem 1rem;
      font-family: var(--ux-font-family);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--ux-text-secondary);
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-diff--split .ux-diff__pane-header--old {
      color: var(--ux-danger);
    }

    .ux-diff--split .ux-diff__pane-header--new {
      color: var(--ux-success);
    }

    .ux-diff--split .ux-diff__line {
      display: flex;
      min-height: 1.5em;
    }

    .ux-diff--split .ux-diff__gutter {
      width: 3rem;
    }

    .ux-diff--split .ux-diff__code {
      padding: 0 0.75rem;
    }

    .ux-diff--split .ux-diff__line--empty {
      background: var(--ux-surface-secondary);
    }

    .ux-diff--split .ux-diff__line--empty .ux-diff__code {
      background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 4px,
        var(--ux-border-color) 4px,
        var(--ux-border-color) 5px
      );
    }

    /* ========================================
       Expandable Sections
    ======================================== */

    .ux-diff__expand {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 1rem;
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-diff__expand:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-diff__expand-text {
      font-family: var(--ux-font-family);
      font-size: 0.75rem;
      color: var(--ux-primary);
    }

    .ux-diff__expand-icon {
      width: 16px;
      height: 16px;
      margin-right: 0.5rem;
      color: var(--ux-primary);
    }

    /* ========================================
       Word Diff Mode
    ======================================== */

    .ux-diff--word .ux-diff__word--added {
      background: rgba(var(--ux-success-rgb), 0.25);
      padding: 0 2px;
      border-radius: 2px;
    }

    .ux-diff--word .ux-diff__word--removed {
      background: rgba(var(--ux-danger-rgb), 0.25);
      text-decoration: line-through;
      padding: 0 2px;
      border-radius: 2px;
    }

    /* ========================================
       File Info
    ======================================== */

    .ux-diff__file {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--ux-surface-secondary);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-diff__file-icon {
      width: 16px;
      height: 16px;
      color: var(--ux-text-secondary);
    }

    .ux-diff__file-name {
      font-family: var(--ux-font-family);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-diff__file-status {
      padding: 0.125rem 0.5rem;
      font-family: var(--ux-font-family);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: var(--ux-radius-sm);
    }

    .ux-diff__file-status--modified {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning);
    }

    .ux-diff__file-status--added {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }

    .ux-diff__file-status--deleted {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-diff__file-status--renamed {
      background: rgba(var(--ux-primary-rgb), 0.15);
      color: var(--ux-primary);
    }

    /* ========================================
       Empty State
    ======================================== */

    .ux-diff__empty {
      padding: 3rem 2rem;
      text-align: center;
      font-family: var(--ux-font-family);
    }

    .ux-diff__empty-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 1rem;
      color: var(--ux-text-tertiary);
    }

    .ux-diff__empty-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--ux-text);
      margin-bottom: 0.5rem;
    }

    .ux-diff__empty-text {
      font-size: 0.875rem;
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-diff--sm {
      font-size: 0.75rem;
    }

    .ux-diff--sm .ux-diff__gutter {
      width: 2.5rem;
      padding: 0 0.375rem;
    }

    .ux-diff--sm .ux-diff__code {
      padding: 0 0.75rem;
    }

    .ux-diff--lg {
      font-size: 0.875rem;
    }

    .ux-diff--lg .ux-diff__gutter {
      width: 4rem;
    }

    /* ========================================
       Line Numbers Only
    ======================================== */

    .ux-diff--no-gutter .ux-diff__gutter {
      display: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-diff {
        background: var(--ux-surface);
        border-color: var(--ux-border-color);
      }

      .ux-diff__line--added {
        background: rgba(var(--ux-success-rgb), 0.15);
      }

      .ux-diff__line--removed {
        background: rgba(var(--ux-danger-rgb), 0.15);
      }
    }

    .ux-dark .ux-diff {
      background: var(--ux-surface);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-diff__line--added {
      background: rgba(var(--ux-success-rgb), 0.15);
    }

    .ux-dark .ux-diff__line--removed {
      background: rgba(var(--ux-danger-rgb), 0.15);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-diff__action,
      .ux-diff__expand {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-diff-viewer-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-diff-viewer-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  // Simple diff algorithm (Myers-like for lines)
  function computeDiff(oldText, newText) {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');
    const result = [];

    // LCS-based diff
    const lcs = computeLCS(oldLines, newLines);
    let oldIndex = 0;
    let newIndex = 0;
    let lcsIndex = 0;

    while (oldIndex < oldLines.length || newIndex < newLines.length) {
      if (lcsIndex < lcs.length) {
        // Output removed lines
        while (oldIndex < oldLines.length && oldLines[oldIndex] !== lcs[lcsIndex]) {
          result.push({
            type: 'removed',
            oldLine: oldIndex + 1,
            newLine: null,
            content: oldLines[oldIndex]
          });
          oldIndex++;
        }

        // Output added lines
        while (newIndex < newLines.length && newLines[newIndex] !== lcs[lcsIndex]) {
          result.push({
            type: 'added',
            oldLine: null,
            newLine: newIndex + 1,
            content: newLines[newIndex]
          });
          newIndex++;
        }

        // Output context line
        if (oldIndex < oldLines.length && newIndex < newLines.length) {
          result.push({
            type: 'context',
            oldLine: oldIndex + 1,
            newLine: newIndex + 1,
            content: oldLines[oldIndex]
          });
          oldIndex++;
          newIndex++;
          lcsIndex++;
        }
      } else {
        // Output remaining removed lines
        while (oldIndex < oldLines.length) {
          result.push({
            type: 'removed',
            oldLine: oldIndex + 1,
            newLine: null,
            content: oldLines[oldIndex]
          });
          oldIndex++;
        }

        // Output remaining added lines
        while (newIndex < newLines.length) {
          result.push({
            type: 'added',
            oldLine: null,
            newLine: newIndex + 1,
            content: newLines[newIndex]
          });
          newIndex++;
        }
      }
    }

    return result;
  }

  // Compute Longest Common Subsequence
  function computeLCS(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to find LCS
    const lcs = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) {
        lcs.unshift(a[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    return lcs;
  }

  // Compute word-level diff for inline highlighting
  function computeWordDiff(oldLine, newLine) {
    const oldWords = oldLine.split(/(\s+)/);
    const newWords = newLine.split(/(\s+)/);
    const lcs = computeLCS(oldWords, newWords);

    const result = {
      old: [],
      new: []
    };

    let oldIndex = 0;
    let newIndex = 0;
    let lcsIndex = 0;

    while (oldIndex < oldWords.length || newIndex < newWords.length) {
      if (lcsIndex < lcs.length) {
        while (oldIndex < oldWords.length && oldWords[oldIndex] !== lcs[lcsIndex]) {
          result.old.push({ text: oldWords[oldIndex], type: 'removed' });
          oldIndex++;
        }
        while (newIndex < newWords.length && newWords[newIndex] !== lcs[lcsIndex]) {
          result.new.push({ text: newWords[newIndex], type: 'added' });
          newIndex++;
        }
        if (oldIndex < oldWords.length) {
          result.old.push({ text: oldWords[oldIndex], type: 'context' });
          oldIndex++;
        }
        if (newIndex < newWords.length) {
          result.new.push({ text: newWords[newIndex], type: 'context' });
          newIndex++;
        }
        lcsIndex++;
      } else {
        while (oldIndex < oldWords.length) {
          result.old.push({ text: oldWords[oldIndex], type: 'removed' });
          oldIndex++;
        }
        while (newIndex < newWords.length) {
          result.new.push({ text: newWords[newIndex], type: 'added' });
          newIndex++;
        }
      }
    }

    return result;
  }

  // Alpine.js component
  const diffViewerData = (options = {}) => ({
    // Configuration
    oldText: options.oldText || '',
    newText: options.newText || '',
    oldTitle: options.oldTitle || 'Original',
    newTitle: options.newTitle || 'Modified',
    fileName: options.fileName || null,
    fileStatus: options.fileStatus || 'modified', // modified, added, deleted, renamed

    // View options
    view: options.view || 'unified', // 'unified', 'split'
    showLineNumbers: options.showLineNumbers ?? true,
    contextLines: options.contextLines ?? 3,
    wordDiff: options.wordDiff ?? false,
    expandable: options.expandable ?? true,

    // State
    diff: [],
    expandedSections: {},
    icons,

    init() {
      this.computeDiff();
    },

    // Compute diff
    computeDiff() {
      this.diff = computeDiff(this.oldText, this.newText);
    },

    // Set texts
    setTexts(oldText, newText) {
      this.oldText = oldText;
      this.newText = newText;
      this.computeDiff();
    },

    // Get lines for display (with context collapsing)
    get displayLines() {
      if (!this.expandable || this.contextLines === -1) {
        return this.diff;
      }

      const result = [];
      let contextCount = 0;
      let hiddenStart = -1;

      for (let i = 0; i < this.diff.length; i++) {
        const line = this.diff[i];
        const isChange = line.type === 'added' || line.type === 'removed';

        // Look ahead to see if there's a change nearby
        let nearChange = false;
        for (let j = Math.max(0, i - this.contextLines); j <= Math.min(this.diff.length - 1, i + this.contextLines); j++) {
          if (this.diff[j].type === 'added' || this.diff[j].type === 'removed') {
            nearChange = true;
            break;
          }
        }

        if (isChange || nearChange) {
          // Add expand marker if we had hidden lines
          if (hiddenStart !== -1) {
            const hiddenCount = i - hiddenStart;
            if (hiddenCount > 0) {
              result.push({
                type: 'expand',
                startIndex: hiddenStart,
                endIndex: i - 1,
                count: hiddenCount
              });
            }
            hiddenStart = -1;
          }
          result.push({ ...line, index: i });
          contextCount = 0;
        } else {
          if (hiddenStart === -1) {
            hiddenStart = i;
          }
        }
      }

      // Handle trailing hidden lines
      if (hiddenStart !== -1) {
        const hiddenCount = this.diff.length - hiddenStart;
        if (hiddenCount > 0) {
          result.push({
            type: 'expand',
            startIndex: hiddenStart,
            endIndex: this.diff.length - 1,
            count: hiddenCount
          });
        }
      }

      return result;
    },

    // Get split view lines (paired old/new)
    get splitLines() {
      const pairs = [];
      let i = 0;

      while (i < this.diff.length) {
        const line = this.diff[i];

        if (line.type === 'context') {
          pairs.push({
            old: line,
            new: line
          });
          i++;
        } else if (line.type === 'removed') {
          // Check if next is added (modification)
          if (i + 1 < this.diff.length && this.diff[i + 1].type === 'added') {
            pairs.push({
              old: line,
              new: this.diff[i + 1]
            });
            i += 2;
          } else {
            pairs.push({
              old: line,
              new: { type: 'empty', content: '' }
            });
            i++;
          }
        } else if (line.type === 'added') {
          pairs.push({
            old: { type: 'empty', content: '' },
            new: line
          });
          i++;
        } else {
          i++;
        }
      }

      return pairs;
    },

    // Stats
    get stats() {
      let added = 0;
      let removed = 0;

      for (const line of this.diff) {
        if (line.type === 'added') added++;
        if (line.type === 'removed') removed++;
      }

      return { added, removed };
    },

    // Expand section
    expandSection(startIndex, endIndex) {
      const key = `${startIndex}-${endIndex}`;
      this.expandedSections[key] = true;
    },

    // Check if section is expanded
    isExpanded(startIndex, endIndex) {
      const key = `${startIndex}-${endIndex}`;
      return this.expandedSections[key] === true;
    },

    // Get lines for an expand section
    getExpandedLines(startIndex, endIndex) {
      return this.diff.slice(startIndex, endIndex + 1);
    },

    // Get word diff HTML for a line
    getWordDiffHtml(line, type) {
      if (!this.wordDiff) {
        return this.escapeHtml(line.content);
      }

      // Find paired line
      const index = this.diff.indexOf(line);
      let pairedLine = null;

      if (line.type === 'removed') {
        // Look for next added line
        for (let i = index + 1; i < this.diff.length && i < index + 5; i++) {
          if (this.diff[i].type === 'added') {
            pairedLine = this.diff[i];
            break;
          }
          if (this.diff[i].type === 'context') break;
        }
      } else if (line.type === 'added') {
        // Look for previous removed line
        for (let i = index - 1; i >= 0 && i > index - 5; i--) {
          if (this.diff[i].type === 'removed') {
            pairedLine = this.diff[i];
            break;
          }
          if (this.diff[i].type === 'context') break;
        }
      }

      if (!pairedLine) {
        return this.escapeHtml(line.content);
      }

      const wordDiff = computeWordDiff(
        line.type === 'removed' ? line.content : pairedLine.content,
        line.type === 'added' ? line.content : pairedLine.content
      );

      const words = line.type === 'removed' ? wordDiff.old : wordDiff.new;

      return words.map(w => {
        if (w.type === 'context') {
          return this.escapeHtml(w.text);
        }
        const className = w.type === 'added' ? 'ux-diff__highlight--added' : 'ux-diff__highlight--removed';
        return `<span class="${className}">${this.escapeHtml(w.text)}</span>`;
      }).join('');
    },

    // Escape HTML
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    // Toggle view
    toggleView() {
      this.view = this.view === 'unified' ? 'split' : 'unified';
    },

    // Set view
    setView(view) {
      this.view = view;
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxDiffViewer', diffViewerData);
  }

})();
