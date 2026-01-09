/**
 * UX Upload Component
 * File upload con drag & drop, preview y progress
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Upload
    ======================================== */

    .ux-upload {
      position: relative;
      width: 100%;
    }

    /* ========================================
       Dropzone
    ======================================== */

    .ux-upload__dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      padding: var(--ux-space-xl);
      background-color: var(--ux-surface);
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-border-radius-lg);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        background-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-upload__dropzone:hover {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.02);
    }

    /* Drag over state */
    .ux-upload__dropzone--dragover,
    .ux-upload--dragover .ux-upload__dropzone {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.05);
      border-style: solid;
    }

    /* Disabled state */
    .ux-upload__dropzone--disabled,
    .ux-upload--disabled .ux-upload__dropzone {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Hidden file input */
    .ux-upload__input {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* ========================================
       Dropzone Content
    ======================================== */

    .ux-upload__icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-secondary);
      transition: color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-upload__dropzone:hover .ux-upload__icon,
    .ux-upload__dropzone--dragover .ux-upload__icon {
      color: var(--ux-primary);
    }

    .ux-upload__text {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-xs);
      text-align: center;
    }

    .ux-upload__hint {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
    }

    .ux-upload__browse {
      color: var(--ux-primary);
      font-weight: 500;
      cursor: pointer;
    }

    .ux-upload__browse:hover {
      text-decoration: underline;
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-upload--compact .ux-upload__dropzone {
      min-height: auto;
      flex-direction: row;
      padding: var(--ux-space-md) var(--ux-space-lg);
      gap: var(--ux-space-md);
    }

    .ux-upload--compact .ux-upload__icon {
      width: 24px;
      height: 24px;
      margin-bottom: 0;
    }

    .ux-upload--compact .ux-upload__content {
      text-align: left;
    }

    .ux-upload--compact .ux-upload__text {
      margin-bottom: 0;
    }

    /* ========================================
       Button Variant
    ======================================== */

    .ux-upload--button .ux-upload__dropzone {
      display: inline-flex;
      flex-direction: row;
      min-height: auto;
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border: none;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: var(--ux-border-radius-md);
      gap: var(--ux-space-sm);
    }

    .ux-upload--button .ux-upload__dropzone:hover {
      background-color: var(--ux-primary-shade);
    }

    .ux-upload--button .ux-upload__icon {
      width: 20px;
      height: 20px;
      margin-bottom: 0;
      color: currentColor;
    }

    .ux-upload--button .ux-upload__text {
      color: currentColor;
      margin-bottom: 0;
    }

    .ux-upload--button .ux-upload__hint {
      display: none;
    }

    /* ========================================
       File List
    ======================================== */

    .ux-upload__files {
      margin-top: var(--ux-space-md);
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-sm);
    }

    .ux-upload__file {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-md);
      background-color: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-md);
      gap: var(--ux-space-md);
    }

    .ux-upload__file--error {
      border-color: var(--ux-danger);
      background-color: rgba(var(--ux-danger-rgb), 0.05);
    }

    .ux-upload__file--success {
      border-color: var(--ux-success);
    }

    /* File Preview */
    .ux-upload__preview {
      width: 40px;
      height: 40px;
      border-radius: var(--ux-border-radius-sm);
      background-color: var(--ux-surface-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-upload__preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-upload__preview-icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text-secondary);
    }

    /* File Info */
    .ux-upload__file-info {
      flex: 1;
      min-width: 0;
    }

    .ux-upload__file-name {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-upload__file-meta {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: 2px;
    }

    .ux-upload__file-error {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-danger);
      margin-top: 2px;
    }

    /* File Progress */
    .ux-upload__progress {
      width: 100%;
      height: 4px;
      background-color: var(--ux-border-color);
      border-radius: 2px;
      margin-top: var(--ux-space-xs);
      overflow: hidden;
    }

    .ux-upload__progress-bar {
      height: 100%;
      background-color: var(--ux-primary);
      border-radius: 2px;
      transition: width var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-upload__file--success .ux-upload__progress-bar {
      background-color: var(--ux-success);
    }

    .ux-upload__file--error .ux-upload__progress-bar {
      background-color: var(--ux-danger);
    }

    /* File Actions */
    .ux-upload__file-actions {
      display: flex;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
    }

    .ux-upload__file-action {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--ux-text-secondary);
      border-radius: var(--ux-border-radius-sm);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-upload__file-action:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-upload__file-action--danger:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      color: var(--ux-danger);
    }

    .ux-upload__file-action svg {
      width: 18px;
      height: 18px;
    }

    /* ========================================
       Grid Preview
    ======================================== */

    .ux-upload--grid .ux-upload__files {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-upload--grid .ux-upload__file {
      flex-direction: column;
      padding: var(--ux-space-sm);
      text-align: center;
    }

    .ux-upload--grid .ux-upload__preview {
      width: 80px;
      height: 80px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-upload--grid .ux-upload__file-info {
      width: 100%;
    }

    .ux-upload--grid .ux-upload__file-meta {
      justify-content: center;
    }

    .ux-upload--grid .ux-upload__file-actions {
      position: absolute;
      top: var(--ux-space-xs);
      right: var(--ux-space-xs);
    }

    .ux-upload--grid .ux-upload__file {
      position: relative;
    }

    /* ========================================
       Avatar Upload
    ======================================== */

    .ux-upload--avatar {
      display: inline-block;
    }

    .ux-upload--avatar .ux-upload__dropzone {
      width: 120px;
      height: 120px;
      min-height: auto;
      border-radius: 50%;
      padding: 0;
      overflow: hidden;
    }

    .ux-upload--avatar .ux-upload__preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-upload--avatar .ux-upload__overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-upload--avatar .ux-upload__dropzone:hover .ux-upload__overlay {
      opacity: 1;
    }

    .ux-upload--avatar .ux-upload__overlay-icon {
      width: 32px;
      height: 32px;
      color: white;
    }

    /* ========================================
       Image Upload Button (Simple)
       Usage: Button + Preview side by side
    ======================================== */

    .ux-upload-image {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-upload-image__preview {
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-glass-radius-sm);
      overflow: hidden;
      flex-shrink: 0;
      transition: border-color 200ms var(--ux-ease-ios);
    }

    .ux-upload-image__preview--rounded {
      border-radius: 50%;
    }

    .ux-upload-image__preview--lg {
      width: 80px;
      height: 80px;
    }

    .ux-upload-image__preview--sm {
      width: 48px;
      height: 48px;
    }

    .ux-upload-image__preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-upload-image__preview svg,
    .ux-upload-image__preview .icon {
      width: 24px;
      height: 24px;
      color: var(--ux-text-tertiary);
    }

    .ux-upload-image__preview--lg svg,
    .ux-upload-image__preview--lg .icon {
      width: 32px;
      height: 32px;
    }

    /* Button with hidden input */
    .ux-upload-image__button {
      position: relative;
      cursor: pointer;
    }

    .ux-upload-image__button input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* ========================================
       Upload Area (Drop Zone)
    ======================================== */

    .ux-upload-area {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      padding: var(--ux-space-xl);
      background-color: var(--ux-surface);
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-glass-radius-md);
      cursor: pointer;
      text-align: center;
      transition:
        border-color 200ms var(--ux-ease-ios),
        background-color 200ms var(--ux-ease-ios);
    }

    .ux-upload-area:hover {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.02);
    }

    .ux-upload-area--dragover {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.05);
      border-style: solid;
    }

    .ux-upload-area--sm {
      min-height: 120px;
      padding: var(--ux-space-lg);
    }

    .ux-upload-area--lg {
      min-height: 240px;
      padding: var(--ux-space-2xl);
    }

    .ux-upload-area__icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-text-tertiary);
      transition: color 200ms var(--ux-ease-ios);
    }

    .ux-upload-area:hover .ux-upload-area__icon,
    .ux-upload-area--dragover .ux-upload-area__icon {
      color: var(--ux-primary);
    }

    .ux-upload-area--sm .ux-upload-area__icon {
      width: 32px;
      height: 32px;
    }

    .ux-upload-area__text {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-upload-area__hint {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-upload-area__link {
      color: var(--ux-primary);
      font-weight: 500;
      text-decoration: none;
    }

    .ux-upload-area__link:hover {
      text-decoration: underline;
    }

    .ux-upload-area input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* Upload area with preview */
    .ux-upload-area--has-preview {
      padding: var(--ux-space-md);
    }

    .ux-upload-area__preview {
      width: 100%;
      max-height: 200px;
      object-fit: contain;
      border-radius: var(--ux-border-radius-md);
      margin-bottom: var(--ux-space-md);
    }

    /* Disabled state */
    .ux-upload-area--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Error state */
    .ux-upload-area--error {
      border-color: var(--ux-danger);
    }

    /* ========================================
       States
    ======================================== */

    .ux-upload--loading .ux-upload__dropzone {
      pointer-events: none;
    }

    .ux-upload__loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--ux-surface-rgb), 0.8);
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Validation
    ======================================== */

    .ux-upload--error .ux-upload__dropzone {
      border-color: var(--ux-danger);
    }

    .ux-upload__error-message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-danger);
      margin-top: var(--ux-space-sm);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-upload__dropzone,
      .ux-upload__progress-bar,
      .ux-upload__file-action {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-upload-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-upload-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for upload
  const uploadComponent = (config = {}) => ({
    files: [],
    isDragover: false,
    isLoading: false,
    error: '',

    // Config
    multiple: config.multiple !== false,
    accept: config.accept || '*/*',
    maxSize: config.maxSize || 10 * 1024 * 1024, // 10MB default
    maxFiles: config.maxFiles || 10,
    autoUpload: config.autoUpload || false,
    uploadUrl: config.uploadUrl || '',

    // File type icons
    fileIcons: {
      image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
      pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 9H8v6h2v-2h1a2 2 0 1 0 0-4h-1z"/></svg>`,
      document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
      audio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
      archive: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`,
      default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`
    },

    // Initialize
    init() {
      this.$refs.input?.addEventListener('change', (e) => this.handleFiles(e.target.files));
    },

    // Open file dialog
    browse() {
      this.$refs.input?.click();
    },

    // Handle dropped/selected files
    handleFiles(fileList) {
      this.error = '';
      const newFiles = Array.from(fileList);

      // Check max files
      if (this.files.length + newFiles.length > this.maxFiles) {
        this.error = `Maximum ${this.maxFiles} files allowed`;
        return;
      }

      for (const file of newFiles) {
        // Validate size
        if (file.size > this.maxSize) {
          this.error = `File "${file.name}" exceeds maximum size of ${this.formatSize(this.maxSize)}`;
          continue;
        }

        // Create file object
        const fileObj = {
          id: this.generateId(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'pending', // pending, uploading, success, error
          error: '',
          preview: null
        };

        // Generate preview for images
        if (file.type.startsWith('image/')) {
          this.generatePreview(fileObj);
        }

        this.files.push(fileObj);

        // Auto upload if enabled
        if (this.autoUpload && this.uploadUrl) {
          this.uploadFile(fileObj);
        }
      }

      // Reset input
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },

    // Generate image preview
    generatePreview(fileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileObj.preview = e.target.result;
      };
      reader.readAsDataURL(fileObj.file);
    },

    // Upload single file
    async uploadFile(fileObj) {
      if (!this.uploadUrl) return;

      fileObj.status = 'uploading';
      fileObj.progress = 0;

      const formData = new FormData();
      formData.append('file', fileObj.file);

      try {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            fileObj.progress = Math.round((e.loaded / e.total) * 100);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            fileObj.status = 'success';
            fileObj.progress = 100;
          } else {
            fileObj.status = 'error';
            fileObj.error = `Upload failed: ${xhr.statusText}`;
          }
        });

        xhr.addEventListener('error', () => {
          fileObj.status = 'error';
          fileObj.error = 'Upload failed';
        });

        xhr.open('POST', this.uploadUrl);
        xhr.send(formData);
      } catch (err) {
        fileObj.status = 'error';
        fileObj.error = err.message || 'Upload failed';
      }
    },

    // Upload all pending files
    uploadAll() {
      this.files
        .filter(f => f.status === 'pending')
        .forEach(f => this.uploadFile(f));
    },

    // Remove file
    removeFile(fileId) {
      this.files = this.files.filter(f => f.id !== fileId);
    },

    // Clear all files
    clearFiles() {
      this.files = [];
      this.error = '';
    },

    // Retry failed upload
    retryFile(fileId) {
      const file = this.files.find(f => f.id === fileId);
      if (file && file.status === 'error') {
        file.status = 'pending';
        file.error = '';
        file.progress = 0;
        if (this.uploadUrl) {
          this.uploadFile(file);
        }
      }
    },

    // Drag handlers
    onDragEnter(e) {
      e.preventDefault();
      this.isDragover = true;
    },

    onDragOver(e) {
      e.preventDefault();
      this.isDragover = true;
    },

    onDragLeave(e) {
      e.preventDefault();
      // Only set to false if leaving the dropzone entirely
      if (!e.currentTarget.contains(e.relatedTarget)) {
        this.isDragover = false;
      }
    },

    onDrop(e) {
      e.preventDefault();
      this.isDragover = false;
      const files = e.dataTransfer?.files;
      if (files?.length) {
        this.handleFiles(files);
      }
    },

    // Utilities
    generateId() {
      return 'file_' + Math.random().toString(36).substr(2, 9);
    },

    formatSize(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },

    getFileIcon(type) {
      if (type.startsWith('image/')) return this.fileIcons.image;
      if (type === 'application/pdf') return this.fileIcons.pdf;
      if (type.startsWith('video/')) return this.fileIcons.video;
      if (type.startsWith('audio/')) return this.fileIcons.audio;
      if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return this.fileIcons.archive;
      if (type.includes('document') || type.includes('word') || type.includes('text')) return this.fileIcons.document;
      return this.fileIcons.default;
    },

    // Getters
    get hasFiles() {
      return this.files.length > 0;
    },

    get pendingFiles() {
      return this.files.filter(f => f.status === 'pending');
    },

    get uploadingFiles() {
      return this.files.filter(f => f.status === 'uploading');
    },

    get completedFiles() {
      return this.files.filter(f => f.status === 'success');
    },

    get failedFiles() {
      return this.files.filter(f => f.status === 'error');
    },

    get totalProgress() {
      if (this.files.length === 0) return 0;
      const total = this.files.reduce((sum, f) => sum + f.progress, 0);
      return Math.round(total / this.files.length);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxUpload', uploadComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxUpload', uploadComponent);
    });
  }
})();
