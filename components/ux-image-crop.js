/**
 * UX Image Crop Component
 * Image cropping with drag handles, aspect ratio, zoom, and rotate
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Image Crop
    ======================================== */

    .ux-image-crop {
      position: relative;
      width: 100%;
      max-width: 600px;
      background-color: var(--ux-gray-900);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }

    /* ========================================
       Canvas / Workspace
    ======================================== */

    .ux-image-crop__canvas {
      position: relative;
      width: 100%;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background-color: var(--ux-gray-900);
    }

    .ux-image-crop__canvas--empty {
      min-height: 200px;
      border: 2px dashed var(--ux-gray-600);
      background-color: var(--ux-gray-800);
      cursor: pointer;
    }

    .ux-image-crop__canvas--empty:hover {
      border-color: var(--ux-primary);
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-image-crop__placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
      color: var(--ux-gray-400);
      text-align: center;
      padding: var(--ux-space-xl);
    }

    .ux-image-crop__placeholder svg {
      width: 48px;
      height: 48px;
      opacity: 0.6;
    }

    .ux-image-crop__placeholder-text {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
    }

    .ux-image-crop__placeholder-hint {
      font-size: var(--ux-font-size-sm);
      opacity: 0.7;
    }

    /* Image Container */
    .ux-image-crop__image-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .ux-image-crop__image {
      max-width: 100%;
      max-height: 100%;
      transform-origin: center center;
      pointer-events: none;
    }

    /* ========================================
       Overlay (darkens non-crop area)
    ======================================== */

    .ux-image-crop__overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .ux-image-crop__overlay-bg {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: none;
    }

    /* ========================================
       Crop Area
    ======================================== */

    .ux-image-crop__crop-area {
      position: absolute;
      border: 2px solid white;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
      cursor: move;
      touch-action: none;
    }

    .ux-image-crop__crop-area::before {
      content: '';
      position: absolute;
      inset: 0;
      background: transparent;
    }

    /* Grid Lines */
    .ux-image-crop__grid {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .ux-image-crop__grid--thirds {
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px);
      background-size: 33.333% 33.333%;
      background-position: center;
    }

    .ux-image-crop--dragging .ux-image-crop__grid {
      opacity: 1;
    }

    .ux-image-crop__grid {
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-image-crop__crop-area:hover .ux-image-crop__grid,
    .ux-image-crop--active .ux-image-crop__grid {
      opacity: 1;
    }

    /* ========================================
       Resize Handles
    ======================================== */

    .ux-image-crop__handles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .ux-image-crop__handle {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: white;
      border: 2px solid var(--ux-primary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
      touch-action: none;
    }

    .ux-image-crop__handle:hover,
    .ux-image-crop__handle:active {
      transform: translate(-50%, -50%) scale(1.2);
    }

    /* Corner handles */
    .ux-image-crop__handle--nw { top: 0; left: 0; cursor: nwse-resize; }
    .ux-image-crop__handle--ne { top: 0; left: 100%; cursor: nesw-resize; }
    .ux-image-crop__handle--sw { top: 100%; left: 0; cursor: nesw-resize; }
    .ux-image-crop__handle--se { top: 100%; left: 100%; cursor: nwse-resize; }

    /* Edge handles */
    .ux-image-crop__handle--n { top: 0; left: 50%; cursor: ns-resize; }
    .ux-image-crop__handle--s { top: 100%; left: 50%; cursor: ns-resize; }
    .ux-image-crop__handle--w { top: 50%; left: 0; cursor: ew-resize; }
    .ux-image-crop__handle--e { top: 50%; left: 100%; cursor: ew-resize; }

    /* Hide edge handles when aspect ratio is locked */
    .ux-image-crop--aspect-locked .ux-image-crop__handle--n,
    .ux-image-crop--aspect-locked .ux-image-crop__handle--s,
    .ux-image-crop--aspect-locked .ux-image-crop__handle--w,
    .ux-image-crop--aspect-locked .ux-image-crop__handle--e {
      display: none;
    }

    /* Mobile-friendly larger handles */
    @media (max-width: 767px) {
      .ux-image-crop__handle {
        width: 28px;
        height: 28px;
      }
    }

    /* ========================================
       Controls Bar
    ======================================== */

    .ux-image-crop__controls {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-image-crop__control-row {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
    }

    .ux-image-crop__control-group {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex: 1;
    }

    .ux-image-crop__control-label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      min-width: 50px;
    }

    .ux-image-crop__control-value {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      min-width: 40px;
      text-align: right;
    }

    /* Zoom Slider */
    .ux-image-crop__slider {
      flex: 1;
      height: 4px;
      -webkit-appearance: none;
      appearance: none;
      background: var(--ux-gray-200);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    }

    .ux-image-crop__slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--ux-primary);
      border-radius: 50%;
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-image-crop__slider::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    .ux-image-crop__slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--ux-primary);
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }

    /* Aspect Ratio Buttons */
    .ux-image-crop__aspect-buttons {
      display: flex;
      gap: var(--ux-space-xs);
      flex-wrap: wrap;
    }

    .ux-image-crop__aspect-btn {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-image-crop__aspect-btn:hover {
      background-color: var(--ux-surface-tertiary);
      color: var(--ux-text);
    }

    .ux-image-crop__aspect-btn--active {
      background-color: var(--ux-primary);
      border-color: var(--ux-primary);
      color: white;
    }

    .ux-image-crop__aspect-btn--active:hover {
      background-color: var(--ux-primary-shade);
      color: white;
    }

    /* Rotate Buttons */
    .ux-image-crop__rotate-buttons {
      display: flex;
      gap: var(--ux-space-xs);
    }

    .ux-image-crop__rotate-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-image-crop__rotate-btn:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-image-crop__rotate-btn:active {
      transform: scale(0.95);
    }

    .ux-image-crop__rotate-btn svg {
      width: 20px;
      height: 20px;
    }

    /* Action Buttons */
    .ux-image-crop__actions {
      display: flex;
      gap: var(--ux-space-sm);
      justify-content: flex-end;
      padding-top: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Preview
    ======================================== */

    .ux-image-crop__preview {
      position: relative;
      background-color: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-md);
      overflow: hidden;
    }

    .ux-image-crop__preview-label {
      position: absolute;
      top: var(--ux-space-xs);
      left: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      color: var(--ux-text-secondary);
      background-color: rgba(255, 255, 255, 0.9);
      padding: 2px 6px;
      border-radius: var(--ux-border-radius-sm);
    }

    .ux-image-crop__preview-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Preview sizes */
    .ux-image-crop__preview--sm {
      width: 80px;
      height: 80px;
    }

    .ux-image-crop__preview--md {
      width: 120px;
      height: 120px;
    }

    .ux-image-crop__preview--lg {
      width: 200px;
      height: 200px;
    }

    .ux-image-crop__preview--circle {
      border-radius: 50%;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Compact variant */
    .ux-image-crop--compact .ux-image-crop__canvas {
      min-height: 200px;
    }

    .ux-image-crop--compact .ux-image-crop__controls {
      padding: var(--ux-space-sm);
    }

    /* Large variant */
    .ux-image-crop--lg .ux-image-crop__canvas {
      min-height: 400px;
    }

    /* Fullscreen variant */
    .ux-image-crop--fullscreen {
      position: fixed;
      inset: 0;
      max-width: none;
      border-radius: 0;
      z-index: var(--ux-z-modal);
    }

    .ux-image-crop--fullscreen .ux-image-crop__canvas {
      flex: 1;
      min-height: 0;
    }

    /* Circle crop indicator */
    .ux-image-crop--circle .ux-image-crop__crop-area {
      border-radius: 50%;
    }

    .ux-image-crop--circle .ux-image-crop__crop-area::after {
      content: '';
      position: absolute;
      inset: -2px;
      border: 2px solid white;
      border-radius: 50%;
      pointer-events: none;
    }

    /* ========================================
       States
    ======================================== */

    .ux-image-crop--loading .ux-image-crop__canvas::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 32px;
      height: 32px;
      margin: -16px 0 0 -16px;
      border: 3px solid var(--ux-gray-600);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-image-crop-spin 0.8s linear infinite;
    }

    @keyframes ux-image-crop-spin {
      to { transform: rotate(360deg); }
    }

    .ux-image-crop--disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-image-crop__controls {
        background-color: var(--ux-gray-900);
        border-color: var(--ux-gray-700);
      }

      .ux-image-crop__slider {
        background: var(--ux-gray-700);
      }

      .ux-image-crop__aspect-btn {
        background-color: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
        color: var(--ux-gray-300);
      }

      .ux-image-crop__aspect-btn:hover {
        background-color: var(--ux-gray-700);
        color: var(--ux-gray-100);
      }

      .ux-image-crop__rotate-btn {
        background-color: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
        color: var(--ux-gray-200);
      }

      .ux-image-crop__rotate-btn:hover {
        background-color: var(--ux-gray-700);
      }

      .ux-image-crop__preview {
        background-color: var(--ux-gray-800);
        border-color: var(--ux-gray-700);
      }

      .ux-image-crop__preview-label {
        background-color: rgba(0, 0, 0, 0.8);
        color: var(--ux-gray-300);
      }
    }

    .ux-dark .ux-image-crop__controls {
      background-color: var(--ux-gray-900);
      border-color: var(--ux-gray-700);
    }

    .ux-dark .ux-image-crop__slider {
      background: var(--ux-gray-700);
    }

    .ux-dark .ux-image-crop__aspect-btn {
      background-color: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
      color: var(--ux-gray-300);
    }

    .ux-dark .ux-image-crop__aspect-btn:hover {
      background-color: var(--ux-gray-700);
      color: var(--ux-gray-100);
    }

    .ux-dark .ux-image-crop__rotate-btn {
      background-color: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
      color: var(--ux-gray-200);
    }

    .ux-dark .ux-image-crop__rotate-btn:hover {
      background-color: var(--ux-gray-700);
    }

    .ux-dark .ux-image-crop__preview {
      background-color: var(--ux-gray-800);
      border-color: var(--ux-gray-700);
    }

    .ux-dark .ux-image-crop__preview-label {
      background-color: rgba(0, 0, 0, 0.8);
      color: var(--ux-gray-300);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-image-crop__handle,
      .ux-image-crop__slider::-webkit-slider-thumb,
      .ux-image-crop__aspect-btn,
      .ux-image-crop__rotate-btn,
      .ux-image-crop__grid {
        transition: none;
      }

      .ux-image-crop--loading .ux-image-crop__canvas::after {
        animation: none;
      }
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-image-crop--glass .ux-image-crop__controls {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-image-crop--glass .ux-image-crop__aspect-btn,
    .ux-image-crop--glass .ux-image-crop__rotate-btn {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-image-crop-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-image-crop-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component
  const imageCropComponent = (config = {}) => ({
    // State
    imageSrc: config.imageSrc || null,
    imageLoaded: false,
    isLoading: false,

    // Image dimensions
    imageWidth: 0,
    imageHeight: 0,
    containerWidth: 0,
    containerHeight: 0,

    // Crop area (percentages relative to displayed image)
    cropX: 10,
    cropY: 10,
    cropWidth: 80,
    cropHeight: 80,

    // Transform
    zoom: config.zoom || 1,
    rotation: config.rotation || 0,
    minZoom: config.minZoom || 0.5,
    maxZoom: config.maxZoom || 3,

    // Aspect ratio
    aspectRatio: config.aspectRatio || null, // null = free, or value like 1, 4/3, 16/9
    aspectRatioLabel: config.aspectRatioLabel || 'Free',

    // Configuration
    showGrid: config.showGrid !== false,
    showPreview: config.showPreview !== false,
    previewSize: config.previewSize || 'md',
    circlePreview: config.circlePreview || false,
    outputFormat: config.outputFormat || 'image/jpeg',
    outputQuality: config.outputQuality || 0.92,

    // Drag state
    isDragging: false,
    isResizing: false,
    activeHandle: null,
    dragStartX: 0,
    dragStartY: 0,
    cropStartX: 0,
    cropStartY: 0,
    cropStartWidth: 0,
    cropStartHeight: 0,

    // References
    _imageEl: null,
    _canvasEl: null,
    _cropAreaEl: null,

    // Initialize
    init() {
      this.$nextTick(() => {
        this._canvasEl = this.$refs.canvas;
        this._cropAreaEl = this.$refs.cropArea;

        // Setup resize observer
        if (this._canvasEl && window.ResizeObserver) {
          const ro = new ResizeObserver(() => {
            this.updateContainerSize();
          });
          ro.observe(this._canvasEl);
        }

        // Load initial image if provided
        if (this.imageSrc) {
          this.loadImage(this.imageSrc);
        }

        // Global mouse/touch events for drag
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        document.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
      });
    },

    destroy() {
      document.removeEventListener('mousemove', this._onMouseMove.bind(this));
      document.removeEventListener('mouseup', this._onMouseUp.bind(this));
      document.removeEventListener('touchmove', this._onTouchMove.bind(this));
      document.removeEventListener('touchend', this._onTouchEnd.bind(this));
    },

    // Set image source
    setImage(src) {
      this.loadImage(src);
    },

    // Load image
    async loadImage(src) {
      this.isLoading = true;
      this.imageLoaded = false;

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          this.imageSrc = src;
          this.imageWidth = img.naturalWidth;
          this.imageHeight = img.naturalHeight;
          this.imageLoaded = true;
          this.isLoading = false;
          this._imageEl = img;

          // Reset crop to full image with aspect ratio
          this.resetCrop();
          this.updateContainerSize();

          this.$dispatch('image-crop:load', {
            width: this.imageWidth,
            height: this.imageHeight
          });

          resolve({ width: this.imageWidth, height: this.imageHeight });
        };

        img.onerror = () => {
          this.isLoading = false;
          this.$dispatch('image-crop:error', { src });
          reject(new Error('Failed to load image'));
        };

        img.src = src;
      });
    },

    // Update container size
    updateContainerSize() {
      if (this._canvasEl) {
        this.containerWidth = this._canvasEl.offsetWidth;
        this.containerHeight = this._canvasEl.offsetHeight;
      }
    },

    // Reset crop to default
    resetCrop() {
      if (this.aspectRatio) {
        // Calculate crop area based on aspect ratio
        const imgAspect = this.imageWidth / this.imageHeight;
        const cropAspect = this.aspectRatio;

        if (cropAspect > imgAspect) {
          // Crop is wider than image
          this.cropWidth = 80;
          this.cropHeight = (this.cropWidth / cropAspect) * imgAspect;
        } else {
          // Crop is taller than image
          this.cropHeight = 80;
          this.cropWidth = (this.cropHeight * cropAspect) / imgAspect;
        }

        this.cropX = (100 - this.cropWidth) / 2;
        this.cropY = (100 - this.cropHeight) / 2;
      } else {
        this.cropX = 10;
        this.cropY = 10;
        this.cropWidth = 80;
        this.cropHeight = 80;
      }
    },

    // Set aspect ratio
    setAspectRatio(ratio, label) {
      this.aspectRatio = ratio;
      this.aspectRatioLabel = label || (ratio ? `${ratio}` : 'Free');

      if (ratio) {
        // Adjust current crop to match new aspect ratio
        const currentCenterX = this.cropX + this.cropWidth / 2;
        const currentCenterY = this.cropY + this.cropHeight / 2;
        const imgAspect = this.imageWidth / this.imageHeight;

        // Calculate new dimensions
        let newWidth = this.cropWidth;
        let newHeight = (this.cropWidth / ratio) * imgAspect;

        if (newHeight > 100) {
          newHeight = Math.min(this.cropHeight, 90);
          newWidth = (newHeight * ratio) / imgAspect;
        }

        // Center the new crop area
        this.cropWidth = Math.min(newWidth, 90);
        this.cropHeight = Math.min(newHeight, 90);
        this.cropX = Math.max(0, Math.min(100 - this.cropWidth, currentCenterX - this.cropWidth / 2));
        this.cropY = Math.max(0, Math.min(100 - this.cropHeight, currentCenterY - this.cropHeight / 2));
      }

      this.$dispatch('image-crop:aspect-change', { ratio, label: this.aspectRatioLabel });
    },

    // Zoom
    setZoom(level) {
      this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, level));
      this.$dispatch('image-crop:zoom', { zoom: this.zoom });
    },

    zoomIn(step = 0.1) {
      this.setZoom(this.zoom + step);
    },

    zoomOut(step = 0.1) {
      this.setZoom(this.zoom - step);
    },

    // Rotate
    rotate(degrees) {
      this.rotation = (this.rotation + degrees) % 360;
      if (this.rotation < 0) this.rotation += 360;
      this.$dispatch('image-crop:rotate', { rotation: this.rotation });
    },

    rotateLeft() {
      this.rotate(-90);
    },

    rotateRight() {
      this.rotate(90);
    },

    // Get image transform style
    get imageTransform() {
      return `scale(${this.zoom}) rotate(${this.rotation}deg)`;
    },

    // Get crop area style
    get cropAreaStyle() {
      return {
        left: `${this.cropX}%`,
        top: `${this.cropY}%`,
        width: `${this.cropWidth}%`,
        height: `${this.cropHeight}%`
      };
    },

    // Check if aspect ratio is locked
    get isAspectLocked() {
      return this.aspectRatio !== null;
    },

    // Drag/Resize handlers
    onCropMouseDown(e) {
      if (e.target.classList.contains('ux-image-crop__handle')) return;

      this.isDragging = true;
      this.dragStartX = e.clientX || e.touches?.[0]?.clientX || 0;
      this.dragStartY = e.clientY || e.touches?.[0]?.clientY || 0;
      this.cropStartX = this.cropX;
      this.cropStartY = this.cropY;

      this.$el.classList.add('ux-image-crop--active');
      e.preventDefault();
    },

    onCropTouchStart(e) {
      this.onCropMouseDown(e);
    },

    onHandleMouseDown(e, handle) {
      this.isResizing = true;
      this.activeHandle = handle;
      this.dragStartX = e.clientX || e.touches?.[0]?.clientX || 0;
      this.dragStartY = e.clientY || e.touches?.[0]?.clientY || 0;
      this.cropStartX = this.cropX;
      this.cropStartY = this.cropY;
      this.cropStartWidth = this.cropWidth;
      this.cropStartHeight = this.cropHeight;

      this.$el.classList.add('ux-image-crop--active');
      e.preventDefault();
      e.stopPropagation();
    },

    onHandleTouchStart(e, handle) {
      this.onHandleMouseDown(e, handle);
    },

    _onMouseMove(e) {
      if (!this.isDragging && !this.isResizing) return;

      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      const rect = this._canvasEl.getBoundingClientRect();
      const deltaXPercent = ((clientX - this.dragStartX) / rect.width) * 100;
      const deltaYPercent = ((clientY - this.dragStartY) / rect.height) * 100;

      if (this.isDragging) {
        // Move crop area
        let newX = this.cropStartX + deltaXPercent;
        let newY = this.cropStartY + deltaYPercent;

        // Constrain to bounds
        newX = Math.max(0, Math.min(100 - this.cropWidth, newX));
        newY = Math.max(0, Math.min(100 - this.cropHeight, newY));

        this.cropX = newX;
        this.cropY = newY;
      } else if (this.isResizing) {
        this._handleResize(deltaXPercent, deltaYPercent);
      }
    },

    _onTouchMove(e) {
      if (this.isDragging || this.isResizing) {
        e.preventDefault();
      }
      this._onMouseMove(e);
    },

    _onMouseUp() {
      this.isDragging = false;
      this.isResizing = false;
      this.activeHandle = null;
      this.$el.classList.remove('ux-image-crop--active');
    },

    _onTouchEnd() {
      this._onMouseUp();
    },

    _handleResize(deltaX, deltaY) {
      const handle = this.activeHandle;
      let newX = this.cropStartX;
      let newY = this.cropStartY;
      let newWidth = this.cropStartWidth;
      let newHeight = this.cropStartHeight;

      const imgAspect = this.imageWidth / this.imageHeight;
      const minSize = 10; // Minimum 10%

      // Calculate new dimensions based on handle
      switch (handle) {
        case 'se':
          newWidth = Math.max(minSize, this.cropStartWidth + deltaX);
          newHeight = this.aspectRatio
            ? (newWidth / this.aspectRatio) * imgAspect
            : Math.max(minSize, this.cropStartHeight + deltaY);
          break;
        case 'sw':
          newWidth = Math.max(minSize, this.cropStartWidth - deltaX);
          newHeight = this.aspectRatio
            ? (newWidth / this.aspectRatio) * imgAspect
            : Math.max(minSize, this.cropStartHeight + deltaY);
          newX = this.cropStartX + this.cropStartWidth - newWidth;
          break;
        case 'ne':
          newWidth = Math.max(minSize, this.cropStartWidth + deltaX);
          newHeight = this.aspectRatio
            ? (newWidth / this.aspectRatio) * imgAspect
            : Math.max(minSize, this.cropStartHeight - deltaY);
          if (!this.aspectRatio) {
            newY = this.cropStartY + this.cropStartHeight - newHeight;
          } else {
            newY = this.cropStartY - (newHeight - this.cropStartHeight);
          }
          break;
        case 'nw':
          newWidth = Math.max(minSize, this.cropStartWidth - deltaX);
          newHeight = this.aspectRatio
            ? (newWidth / this.aspectRatio) * imgAspect
            : Math.max(minSize, this.cropStartHeight - deltaY);
          newX = this.cropStartX + this.cropStartWidth - newWidth;
          newY = this.aspectRatio
            ? this.cropStartY + this.cropStartHeight - newHeight
            : this.cropStartY + this.cropStartHeight - newHeight;
          break;
        case 'n':
          if (!this.aspectRatio) {
            newHeight = Math.max(minSize, this.cropStartHeight - deltaY);
            newY = this.cropStartY + this.cropStartHeight - newHeight;
          }
          break;
        case 's':
          if (!this.aspectRatio) {
            newHeight = Math.max(minSize, this.cropStartHeight + deltaY);
          }
          break;
        case 'e':
          if (!this.aspectRatio) {
            newWidth = Math.max(minSize, this.cropStartWidth + deltaX);
          }
          break;
        case 'w':
          if (!this.aspectRatio) {
            newWidth = Math.max(minSize, this.cropStartWidth - deltaX);
            newX = this.cropStartX + this.cropStartWidth - newWidth;
          }
          break;
      }

      // Constrain to bounds
      newX = Math.max(0, newX);
      newY = Math.max(0, newY);
      newWidth = Math.min(100 - newX, newWidth);
      newHeight = Math.min(100 - newY, newHeight);

      // Apply
      this.cropX = newX;
      this.cropY = newY;
      this.cropWidth = newWidth;
      this.cropHeight = newHeight;
    },

    // Get cropped image as blob
    async getCroppedImage(format, quality) {
      if (!this._imageEl || !this.imageLoaded) {
        throw new Error('No image loaded');
      }

      const outputFormat = format || this.outputFormat;
      const outputQuality = quality || this.outputQuality;

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate actual pixel values for crop
      const cropXPx = (this.cropX / 100) * this.imageWidth;
      const cropYPx = (this.cropY / 100) * this.imageHeight;
      const cropWidthPx = (this.cropWidth / 100) * this.imageWidth;
      const cropHeightPx = (this.cropHeight / 100) * this.imageHeight;

      // Handle rotation
      let outputWidth = cropWidthPx;
      let outputHeight = cropHeightPx;

      if (this.rotation === 90 || this.rotation === 270) {
        outputWidth = cropHeightPx;
        outputHeight = cropWidthPx;
      }

      canvas.width = outputWidth * this.zoom;
      canvas.height = outputHeight * this.zoom;

      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(this.zoom, this.zoom);

      // Draw cropped portion
      const drawWidth = this.rotation === 90 || this.rotation === 270 ? cropHeightPx : cropWidthPx;
      const drawHeight = this.rotation === 90 || this.rotation === 270 ? cropWidthPx : cropHeightPx;

      ctx.drawImage(
        this._imageEl,
        cropXPx, cropYPx, cropWidthPx, cropHeightPx,
        -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight
      );

      ctx.restore();

      // Return as blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          outputFormat,
          outputQuality
        );
      });
    },

    // Get cropped image as data URL
    async getCroppedImageDataURL(format, quality) {
      const blob = await this.getCroppedImage(format, quality);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },

    // Get crop data (useful for server-side cropping)
    getCropData() {
      return {
        x: Math.round((this.cropX / 100) * this.imageWidth),
        y: Math.round((this.cropY / 100) * this.imageHeight),
        width: Math.round((this.cropWidth / 100) * this.imageWidth),
        height: Math.round((this.cropHeight / 100) * this.imageHeight),
        rotation: this.rotation,
        zoom: this.zoom,
        aspectRatio: this.aspectRatio,
        imageWidth: this.imageWidth,
        imageHeight: this.imageHeight
      };
    },

    // Reset all transformations
    reset() {
      this.zoom = 1;
      this.rotation = 0;
      this.resetCrop();
      this.$dispatch('image-crop:reset');
    },

    // File input handler
    onFileSelect(e) {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.loadImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },

    // Zoom percentage display
    get zoomPercent() {
      return Math.round(this.zoom * 100);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxImageCrop', imageCropComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxImageCrop', imageCropComponent);
    });
  }
})();
