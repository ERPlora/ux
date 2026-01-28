/**
 * UX Upload Component
 * Vanilla JS file upload with drag & drop support
 */

import { dispatch } from '../core/helpers.js';

export class UXUpload {
  constructor(element, options = {}) {
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.el) {
      console.warn('UXUpload: Element not found');
      return;
    }

    this.options = {
      inputSelector: 'input[type="file"]',
      dropzoneSelector: '.ux-upload__dropzone',
      previewSelector: '.ux-upload__preview',
      fileListSelector: '.ux-upload__files',
      multiple: false,
      accept: '*',
      maxSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      ...options
    };

    // Read options from data attributes
    if (this.el.dataset.multiple !== undefined) {
      this.options.multiple = this.el.dataset.multiple !== 'false';
    }
    if (this.el.dataset.accept) {
      this.options.accept = this.el.dataset.accept;
    }
    if (this.el.dataset.maxSize) {
      this.options.maxSize = parseInt(this.el.dataset.maxSize, 10);
    }

    this.input = this.el.querySelector(this.options.inputSelector);
    this.dropzone = this.el.querySelector(this.options.dropzoneSelector) || this.el;
    this.preview = this.el.querySelector(this.options.previewSelector);
    this.fileList = this.el.querySelector(this.options.fileListSelector);

    this._files = [];
    this._isDragging = false;

    this._init();
  }

  _init() {
    // Create file input if not present
    if (!this.input) {
      this.input = document.createElement('input');
      this.input.type = 'file';
      this.input.className = 'ux-upload__input';
      this.input.style.display = 'none';
      this.el.appendChild(this.input);
    }

    // Set input attributes
    if (this.options.multiple) {
      this.input.multiple = true;
    }
    if (this.options.accept !== '*') {
      this.input.accept = this.options.accept;
    }

    // Bind events
    this.input.addEventListener('change', (e) => this._handleFileSelect(e));

    // Dropzone events
    this.dropzone.addEventListener('dragover', (e) => this._handleDragOver(e));
    this.dropzone.addEventListener('dragleave', (e) => this._handleDragLeave(e));
    this.dropzone.addEventListener('drop', (e) => this._handleDrop(e));

    // Click to select
    this.dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button[data-remove]')) return;
      this.input.click();
    });
  }

  _handleFileSelect(e) {
    const files = Array.from(e.target.files);
    this._addFiles(files);
    // Reset input so same file can be selected again
    this.input.value = '';
  }

  _handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this._isDragging) {
      this._isDragging = true;
      this.dropzone.classList.add('is-dragging');
      dispatch(this.el, 'ux:upload:dragenter');
    }
  }

  _handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    // Only trigger leave if actually leaving the dropzone
    if (!this.dropzone.contains(e.relatedTarget)) {
      this._isDragging = false;
      this.dropzone.classList.remove('is-dragging');
      dispatch(this.el, 'ux:upload:dragleave');
    }
  }

  _handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this._isDragging = false;
    this.dropzone.classList.remove('is-dragging');

    const files = Array.from(e.dataTransfer.files);
    this._addFiles(files);
    dispatch(this.el, 'ux:upload:drop', { files });
  }

  _addFiles(newFiles) {
    const validFiles = [];
    const errors = [];

    for (const file of newFiles) {
      // Check max files
      if (this._files.length + validFiles.length >= this.options.maxFiles) {
        errors.push({ file, error: 'maxFiles' });
        continue;
      }

      // Check file size
      if (file.size > this.options.maxSize) {
        errors.push({ file, error: 'maxSize' });
        continue;
      }

      // Check file type
      if (this.options.accept !== '*' && !this._matchesAccept(file)) {
        errors.push({ file, error: 'type' });
        continue;
      }

      validFiles.push(file);
    }

    if (errors.length > 0) {
      dispatch(this.el, 'ux:upload:error', { errors });
    }

    if (validFiles.length > 0) {
      if (this.options.multiple) {
        this._files = [...this._files, ...validFiles];
      } else {
        this._files = validFiles.slice(0, 1);
      }

      this._renderFileList();
      dispatch(this.el, 'ux:upload:change', { files: this.files });
      dispatch(this.el, 'ux:upload:add', { files: validFiles });
    }
  }

  _matchesAccept(file) {
    const accepts = this.options.accept.split(',').map(a => a.trim());

    return accepts.some(accept => {
      if (accept.startsWith('.')) {
        // Extension match
        return file.name.toLowerCase().endsWith(accept.toLowerCase());
      } else if (accept.endsWith('/*')) {
        // MIME type wildcard (e.g., image/*)
        return file.type.startsWith(accept.replace('/*', '/'));
      } else {
        // Exact MIME type
        return file.type === accept;
      }
    });
  }

  _renderFileList() {
    if (!this.fileList) return;

    this.fileList.innerHTML = this._files.map((file, index) => `
      <div class="ux-upload__file" data-index="${index}">
        <span class="ux-upload__file-icon">${this._getFileIcon(file)}</span>
        <span class="ux-upload__file-name">${this._escapeHtml(file.name)}</span>
        <span class="ux-upload__file-size">${this._formatSize(file.size)}</span>
        <button type="button" class="ux-upload__file-remove" data-remove data-index="${index}" aria-label="Remove file">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Bind remove events
    this.fileList.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index, 10);
        this.removeFile(index);
      });
    });
  }

  _getFileIcon(file) {
    const type = file.type.split('/')[0];
    const icons = {
      image: '🖼️',
      video: '🎬',
      audio: '🎵',
      application: '📄',
      text: '📝'
    };
    return icons[type] || '📎';
  }

  _formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  get files() {
    return [...this._files];
  }

  get hasFiles() {
    return this._files.length > 0;
  }

  removeFile(index) {
    if (index < 0 || index >= this._files.length) return false;

    const file = this._files[index];
    this._files.splice(index, 1);
    this._renderFileList();
    dispatch(this.el, 'ux:upload:remove', { file, index });
    dispatch(this.el, 'ux:upload:change', { files: this.files });
    return true;
  }

  clear() {
    this._files = [];
    this._renderFileList();
    dispatch(this.el, 'ux:upload:clear');
    dispatch(this.el, 'ux:upload:change', { files: [] });
  }

  open() {
    this.input.click();
  }

  destroy() {
    delete this.el._uxComponent;
  }
}
