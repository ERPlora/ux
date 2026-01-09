(function() {
  'use strict';

  const styles = `
    :root {
      --ux-pdf-viewer-bg: var(--ux-gray-100);
      --ux-pdf-viewer-toolbar-bg: var(--ux-surface);
      --ux-pdf-viewer-toolbar-height: 48px;
      --ux-pdf-viewer-page-bg: var(--ux-surface);
      --ux-pdf-viewer-page-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      --ux-pdf-viewer-border-radius: var(--ux-radius-lg);
    }

    .ux-pdf-viewer {
      display: flex;
      flex-direction: column;
      background: var(--ux-pdf-viewer-bg);
      border-radius: var(--ux-pdf-viewer-border-radius);
      overflow: hidden;
      height: 600px;
      position: relative;
    }

    .ux-pdf-viewer--fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      height: 100dvh;
      border-radius: 0;
    }

    /* Toolbar */
    .ux-pdf-viewer__toolbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: 0 var(--ux-space-md);
      height: var(--ux-pdf-viewer-toolbar-height);
      background: var(--ux-pdf-viewer-toolbar-bg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-pdf-viewer__toolbar-group {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-pdf-viewer__toolbar-separator {
      width: 1px;
      height: 24px;
      background: var(--ux-border-color);
      margin: 0 var(--ux-space-xs);
    }

    .ux-pdf-viewer__toolbar-spacer {
      flex: 1;
    }

    /* Toolbar buttons */
    .ux-pdf-viewer__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      border-radius: var(--ux-radius-md);
      color: var(--ux-text);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-pdf-viewer__btn:hover {
      background: var(--ux-gray-100);
    }

    .ux-pdf-viewer__btn:active {
      background: var(--ux-gray-200);
    }

    .ux-pdf-viewer__btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ux-pdf-viewer__btn svg {
      width: 20px;
      height: 20px;
    }

    /* Page input */
    .ux-pdf-viewer__page-input {
      width: 48px;
      height: 32px;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      text-align: center;
      font-size: var(--ux-font-size-sm);
      background: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-pdf-viewer__page-total {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Zoom select */
    .ux-pdf-viewer__zoom-select {
      height: 32px;
      padding: 0 var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      background: var(--ux-surface);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
      cursor: pointer;
    }

    /* Container */
    .ux-pdf-viewer__container {
      flex: 1;
      overflow: auto;
      padding: var(--ux-space-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ux-space-md);
    }

    /* Page */
    .ux-pdf-viewer__page {
      background: var(--ux-pdf-viewer-page-bg);
      box-shadow: var(--ux-pdf-viewer-page-shadow);
      position: relative;
    }

    .ux-pdf-viewer__page canvas {
      display: block;
    }

    /* Loading */
    .ux-pdf-viewer__loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      background: var(--ux-pdf-viewer-bg);
    }

    .ux-pdf-viewer__loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--ux-border-color);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-pdf-spin 0.8s linear infinite;
    }

    @keyframes ux-pdf-spin {
      to { transform: rotate(360deg); }
    }

    .ux-pdf-viewer__loading-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Error */
    .ux-pdf-viewer__error {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      background: var(--ux-pdf-viewer-bg);
      padding: var(--ux-space-xl);
      text-align: center;
    }

    .ux-pdf-viewer__error-icon {
      width: 48px;
      height: 48px;
      color: var(--ux-danger);
    }

    .ux-pdf-viewer__error-text {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
    }

    /* Thumbnail sidebar */
    .ux-pdf-viewer--with-thumbnails {
      flex-direction: row;
    }

    .ux-pdf-viewer--with-thumbnails .ux-pdf-viewer__main {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .ux-pdf-viewer__thumbnails {
      width: 160px;
      background: var(--ux-surface);
      border-right: 1px solid var(--ux-border-color);
      overflow-y: auto;
      padding: var(--ux-space-sm);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    .ux-pdf-viewer__thumbnail {
      border: 2px solid transparent;
      border-radius: var(--ux-radius-sm);
      cursor: pointer;
      padding: var(--ux-space-xs);
      transition: border-color var(--ux-transition-fast);
    }

    .ux-pdf-viewer__thumbnail:hover {
      border-color: var(--ux-gray-300);
    }

    .ux-pdf-viewer__thumbnail--active {
      border-color: var(--ux-primary);
    }

    .ux-pdf-viewer__thumbnail canvas {
      width: 100%;
      height: auto;
      display: block;
    }

    .ux-pdf-viewer__thumbnail-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      text-align: center;
      margin-top: var(--ux-space-xs);
    }

    /* Search bar */
    .ux-pdf-viewer__search {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-pdf-viewer__search-input {
      width: 160px;
      height: 32px;
      padding: 0 var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-sm);
      background: var(--ux-surface);
      color: var(--ux-text);
    }

    .ux-pdf-viewer__search-count {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      min-width: 60px;
    }

    /* Annotations */
    .ux-pdf-viewer__annotation {
      position: absolute;
      background: rgba(255, 235, 59, 0.3);
      border: 1px solid rgba(255, 235, 59, 0.6);
      cursor: pointer;
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      :root {
        --ux-pdf-viewer-bg: var(--ux-gray-900);
        --ux-pdf-viewer-toolbar-bg: var(--ux-gray-800);
        --ux-pdf-viewer-page-bg: var(--ux-gray-800);
        --ux-pdf-viewer-page-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
    }

    .ux-dark {
      --ux-pdf-viewer-bg: var(--ux-gray-900);
      --ux-pdf-viewer-toolbar-bg: var(--ux-gray-800);
      --ux-pdf-viewer-page-bg: var(--ux-gray-800);
      --ux-pdf-viewer-page-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    /* Glass variant */
    .ux-pdf-viewer--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
    }

    .ux-pdf-viewer--glass .ux-pdf-viewer__toolbar {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    /* Responsive */
    @media (max-width: 767px) {
      .ux-pdf-viewer__thumbnails {
        display: none;
      }

      .ux-pdf-viewer__toolbar {
        flex-wrap: wrap;
        height: auto;
        padding: var(--ux-space-sm);
        gap: var(--ux-space-xs);
      }

      .ux-pdf-viewer__search {
        width: 100%;
        order: 10;
        margin-top: var(--ux-space-xs);
      }

      .ux-pdf-viewer__search-input {
        flex: 1;
      }
    }

    /* Print */
    @media print {
      .ux-pdf-viewer__toolbar,
      .ux-pdf-viewer__thumbnails {
        display: none !important;
      }

      .ux-pdf-viewer {
        height: auto !important;
        background: none !important;
      }

      .ux-pdf-viewer__page {
        box-shadow: none !important;
        page-break-after: always;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-pdf-viewer__loading-spinner {
        animation: none;
      }
    }
  `;

  if (window.UX) {
    window.UX.injectStyles('ux-pdf-viewer-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-pdf-viewer-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  const componentData = (options = {}) => ({
    // State
    src: options.src || '',
    currentPage: 1,
    totalPages: 0,
    scale: options.scale || 1,
    isLoading: true,
    error: null,
    isFullscreen: false,
    showThumbnails: options.showThumbnails ?? false,
    searchQuery: '',
    searchResults: [],
    currentSearchIndex: 0,

    // PDF.js references
    pdfDoc: null,
    pageRendering: false,
    pageNumPending: null,

    // Zoom presets
    zoomOptions: [
      { value: 0.5, label: '50%' },
      { value: 0.75, label: '75%' },
      { value: 1, label: '100%' },
      { value: 1.25, label: '125%' },
      { value: 1.5, label: '150%' },
      { value: 2, label: '200%' },
      { value: 'fit-width', label: 'Fit Width' },
      { value: 'fit-page', label: 'Fit Page' }
    ],

    init() {
      if (this.src) {
        this.loadPDF(this.src);
      }

      // Keyboard shortcuts
      this._keyHandler = (e) => {
        if (!this.$el.contains(document.activeElement) && document.activeElement !== document.body) return;

        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          this.prevPage();
        } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          this.nextPage();
        } else if (e.key === 'Home') {
          e.preventDefault();
          this.goToPage(1);
        } else if (e.key === 'End') {
          e.preventDefault();
          this.goToPage(this.totalPages);
        } else if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          this.zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          this.zoomOut();
        } else if (e.key === 'f' && e.ctrlKey) {
          e.preventDefault();
          this.$refs.searchInput?.focus();
        }
      };
      document.addEventListener('keydown', this._keyHandler);
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
      }
      if (this.pdfDoc) {
        this.pdfDoc.destroy();
      }
    },

    async loadPDF(url) {
      this.isLoading = true;
      this.error = null;

      // Check if PDF.js is loaded
      if (typeof pdfjsLib === 'undefined') {
        this.error = 'PDF.js library not loaded. Please include pdf.js.';
        this.isLoading = false;
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(url);
        this.pdfDoc = await loadingTask.promise;
        this.totalPages = this.pdfDoc.numPages;
        this.currentPage = 1;

        await this.renderPage(1);

        if (this.showThumbnails) {
          this.renderThumbnails();
        }

        this.isLoading = false;
        this.$dispatch('pdf:loaded', { totalPages: this.totalPages });
      } catch (err) {
        this.error = err.message || 'Failed to load PDF';
        this.isLoading = false;
        this.$dispatch('pdf:error', { error: this.error });
      }
    },

    async renderPage(num) {
      if (!this.pdfDoc) return;

      this.pageRendering = true;

      try {
        const page = await this.pdfDoc.getPage(num);
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');

        let scale = this.scale;

        // Handle fit modes
        if (scale === 'fit-width') {
          const container = this.$refs.container;
          const viewport = page.getViewport({ scale: 1 });
          scale = (container.clientWidth - 48) / viewport.width;
        } else if (scale === 'fit-page') {
          const container = this.$refs.container;
          const viewport = page.getViewport({ scale: 1 });
          const scaleX = (container.clientWidth - 48) / viewport.width;
          const scaleY = (container.clientHeight - 48) / viewport.height;
          scale = Math.min(scaleX, scaleY);
        }

        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        await page.render(renderContext).promise;

        this.pageRendering = false;

        if (this.pageNumPending !== null) {
          const pending = this.pageNumPending;
          this.pageNumPending = null;
          this.renderPage(pending);
        }

        this.$dispatch('pdf:pagerendered', { page: num });
      } catch (err) {
        this.pageRendering = false;
        console.error('Error rendering page:', err);
      }
    },

    async renderThumbnails() {
      if (!this.pdfDoc) return;

      const container = this.$refs.thumbnails;
      if (!container) return;

      container.innerHTML = '';

      for (let i = 1; i <= this.totalPages; i++) {
        const page = await this.pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });

        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'ux-pdf-viewer__thumbnail' + (i === this.currentPage ? ' ux-pdf-viewer__thumbnail--active' : '');
        thumbDiv.dataset.page = i;
        thumbDiv.onclick = () => this.goToPage(i);

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        const label = document.createElement('div');
        label.className = 'ux-pdf-viewer__thumbnail-label';
        label.textContent = i;

        thumbDiv.appendChild(canvas);
        thumbDiv.appendChild(label);
        container.appendChild(thumbDiv);
      }
    },

    goToPage(num) {
      if (num < 1 || num > this.totalPages) return;

      this.currentPage = num;

      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }

      // Update thumbnail selection
      if (this.showThumbnails && this.$refs.thumbnails) {
        const thumbs = this.$refs.thumbnails.querySelectorAll('.ux-pdf-viewer__thumbnail');
        thumbs.forEach((thumb, i) => {
          thumb.classList.toggle('ux-pdf-viewer__thumbnail--active', i + 1 === num);
        });
      }

      this.$dispatch('pdf:pagechange', { page: num });
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },

    zoomIn() {
      if (typeof this.scale === 'number' && this.scale < 3) {
        this.scale = Math.min(3, this.scale + 0.25);
        this.renderPage(this.currentPage);
      }
    },

    zoomOut() {
      if (typeof this.scale === 'number' && this.scale > 0.25) {
        this.scale = Math.max(0.25, this.scale - 0.25);
        this.renderPage(this.currentPage);
      }
    },

    setZoom(value) {
      this.scale = value === 'fit-width' || value === 'fit-page' ? value : parseFloat(value);
      this.renderPage(this.currentPage);
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        window.UX?.lockScroll();
      } else {
        window.UX?.unlockScroll();
      }

      // Re-render if using fit modes
      if (this.scale === 'fit-width' || this.scale === 'fit-page') {
        this.$nextTick(() => this.renderPage(this.currentPage));
      }
    },

    async search() {
      if (!this.searchQuery || !this.pdfDoc) return;

      this.searchResults = [];
      this.currentSearchIndex = 0;

      for (let i = 1; i <= this.totalPages; i++) {
        const page = await this.pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');

        if (text.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          this.searchResults.push(i);
        }
      }

      if (this.searchResults.length > 0) {
        this.goToPage(this.searchResults[0]);
      }

      this.$dispatch('pdf:search', { results: this.searchResults.length });
    },

    nextSearchResult() {
      if (this.searchResults.length === 0) return;
      this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length;
      this.goToPage(this.searchResults[this.currentSearchIndex]);
    },

    prevSearchResult() {
      if (this.searchResults.length === 0) return;
      this.currentSearchIndex = (this.currentSearchIndex - 1 + this.searchResults.length) % this.searchResults.length;
      this.goToPage(this.searchResults[this.currentSearchIndex]);
    },

    print() {
      window.print();
    },

    async download() {
      if (!this.src) return;

      const link = document.createElement('a');
      link.href = this.src;
      link.download = this.src.split('/').pop() || 'document.pdf';
      link.click();
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxPdfViewer', componentData);
  }
})();
