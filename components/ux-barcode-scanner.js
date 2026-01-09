(function() {
  'use strict';

  const styles = `
    :root {
      --ux-barcode-scanner-bg: var(--ux-gray-900);
      --ux-barcode-scanner-border-radius: var(--ux-radius-lg);
      --ux-barcode-scanner-overlay-color: rgba(0, 0, 0, 0.5);
      --ux-barcode-scanner-scan-line: var(--ux-primary);
    }

    .ux-barcode-scanner {
      position: relative;
      background: var(--ux-barcode-scanner-bg);
      border-radius: var(--ux-barcode-scanner-border-radius);
      overflow: hidden;
      aspect-ratio: 4/3;
      max-width: 100%;
    }

    .ux-barcode-scanner--fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      border-radius: 0;
      aspect-ratio: auto;
    }

    /* Video */
    .ux-barcode-scanner__video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Overlay */
    .ux-barcode-scanner__overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    /* Scan area frame */
    .ux-barcode-scanner__frame {
      position: relative;
      width: 70%;
      max-width: 300px;
      aspect-ratio: 1.5;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: var(--ux-radius-md);
      box-shadow: 0 0 0 9999px var(--ux-barcode-scanner-overlay-color);
    }

    /* Corner markers */
    .ux-barcode-scanner__frame::before,
    .ux-barcode-scanner__frame::after,
    .ux-barcode-scanner__corners::before,
    .ux-barcode-scanner__corners::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-color: var(--ux-primary);
      border-style: solid;
      border-width: 0;
    }

    .ux-barcode-scanner__frame::before {
      top: -2px;
      left: -2px;
      border-top-width: 3px;
      border-left-width: 3px;
      border-top-left-radius: var(--ux-radius-md);
    }

    .ux-barcode-scanner__frame::after {
      top: -2px;
      right: -2px;
      border-top-width: 3px;
      border-right-width: 3px;
      border-top-right-radius: var(--ux-radius-md);
    }

    .ux-barcode-scanner__corners {
      position: absolute;
      inset: 0;
    }

    .ux-barcode-scanner__corners::before {
      bottom: -2px;
      left: -2px;
      border-bottom-width: 3px;
      border-left-width: 3px;
      border-bottom-left-radius: var(--ux-radius-md);
    }

    .ux-barcode-scanner__corners::after {
      bottom: -2px;
      right: -2px;
      border-bottom-width: 3px;
      border-right-width: 3px;
      border-bottom-right-radius: var(--ux-radius-md);
    }

    /* Scan line animation */
    .ux-barcode-scanner__scan-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--ux-barcode-scanner-scan-line),
        transparent
      );
      animation: ux-scan-line 2s ease-in-out infinite;
    }

    @keyframes ux-scan-line {
      0%, 100% {
        top: 0;
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      50% {
        top: 100%;
        opacity: 1;
      }
      60% {
        opacity: 0;
      }
    }

    /* Instructions */
    .ux-barcode-scanner__instructions {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: var(--ux-font-size-sm);
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      white-space: nowrap;
    }

    /* Result display */
    .ux-barcode-scanner__result {
      position: absolute;
      bottom: var(--ux-space-lg);
      left: 50%;
      transform: translateX(-50%);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-success);
      color: white;
      border-radius: var(--ux-radius-full);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      animation: ux-scan-result 0.3s ease-out;
      pointer-events: auto;
    }

    @keyframes ux-scan-result {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .ux-barcode-scanner__result svg {
      width: 16px;
      height: 16px;
    }

    /* Controls */
    .ux-barcode-scanner__controls {
      position: absolute;
      top: var(--ux-space-md);
      right: var(--ux-space-md);
      display: flex;
      gap: var(--ux-space-sm);
      pointer-events: auto;
    }

    .ux-barcode-scanner__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-barcode-scanner__btn:hover {
      background: rgba(0, 0, 0, 0.7);
    }

    .ux-barcode-scanner__btn:active {
      background: rgba(0, 0, 0, 0.8);
    }

    .ux-barcode-scanner__btn svg {
      width: 20px;
      height: 20px;
    }

    /* Close button for fullscreen */
    .ux-barcode-scanner__close {
      position: absolute;
      top: var(--ux-space-md);
      left: var(--ux-space-md);
      pointer-events: auto;
    }

    /* Loading state */
    .ux-barcode-scanner__loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      background: var(--ux-barcode-scanner-bg);
    }

    .ux-barcode-scanner__loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top-color: var(--ux-primary);
      border-radius: 50%;
      animation: ux-scan-spin 0.8s linear infinite;
    }

    @keyframes ux-scan-spin {
      to { transform: rotate(360deg); }
    }

    .ux-barcode-scanner__loading-text {
      font-size: var(--ux-font-size-sm);
      color: rgba(255, 255, 255, 0.7);
    }

    /* Error state */
    .ux-barcode-scanner__error {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-md);
      background: var(--ux-barcode-scanner-bg);
      padding: var(--ux-space-xl);
      text-align: center;
    }

    .ux-barcode-scanner__error-icon {
      width: 48px;
      height: 48px;
      color: var(--ux-danger);
    }

    .ux-barcode-scanner__error-text {
      font-size: var(--ux-font-size-md);
      color: white;
    }

    .ux-barcode-scanner__error-hint {
      font-size: var(--ux-font-size-sm);
      color: rgba(255, 255, 255, 0.6);
    }

    /* Manual input fallback */
    .ux-barcode-scanner__manual {
      position: absolute;
      bottom: var(--ux-space-lg);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: var(--ux-space-sm);
      pointer-events: auto;
    }

    .ux-barcode-scanner__manual-input {
      width: 200px;
      height: 40px;
      padding: 0 var(--ux-space-md);
      border: none;
      border-radius: var(--ux-radius-full);
      background: rgba(255, 255, 255, 0.9);
      font-size: var(--ux-font-size-md);
      color: var(--ux-gray-900);
    }

    .ux-barcode-scanner__manual-input::placeholder {
      color: var(--ux-gray-400);
    }

    .ux-barcode-scanner__manual-submit {
      height: 40px;
      padding: 0 var(--ux-space-md);
      border: none;
      border-radius: var(--ux-radius-full);
      background: var(--ux-primary);
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: opacity var(--ux-transition-fast);
    }

    .ux-barcode-scanner__manual-submit:hover {
      opacity: 0.9;
    }

    /* History */
    .ux-barcode-scanner__history {
      position: absolute;
      bottom: var(--ux-space-md);
      left: var(--ux-space-md);
      max-width: 200px;
      pointer-events: auto;
    }

    .ux-barcode-scanner__history-item {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: rgba(0, 0, 0, 0.5);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-xs);
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: var(--ux-space-xs);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Format badges */
    .ux-barcode-scanner__format {
      display: inline-block;
      padding: 2px 6px;
      background: var(--ux-primary-tint);
      color: var(--ux-primary);
      border-radius: var(--ux-radius-sm);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      margin-right: var(--ux-space-xs);
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .ux-barcode-scanner__manual-input {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ux-barcode-scanner__scan-line {
        animation: none;
        opacity: 1;
        top: 50%;
      }

      .ux-barcode-scanner__loading-spinner {
        animation: none;
      }

      .ux-barcode-scanner__result {
        animation: none;
      }
    }

    /* Mobile adjustments */
    @media (max-width: 767px) {
      .ux-barcode-scanner__frame {
        width: 85%;
      }

      .ux-barcode-scanner__manual {
        flex-direction: column;
        width: calc(100% - var(--ux-space-xl) * 2);
      }

      .ux-barcode-scanner__manual-input {
        width: 100%;
      }
    }
  `;

  if (window.UX) {
    window.UX.injectStyles('ux-barcode-scanner-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-barcode-scanner-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  const componentData = (options = {}) => ({
    // State
    isActive: false,
    isLoading: false,
    error: null,
    lastResult: null,
    isFullscreen: options.fullscreen ?? false,
    showManualInput: options.showManualInput ?? true,
    manualCode: '',
    history: [],
    maxHistory: options.maxHistory ?? 5,
    facingMode: 'environment', // 'environment' (back) or 'user' (front)
    torchOn: false,
    hasTorch: false,

    // Configuration
    formats: options.formats || ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'code_93', 'codabar', 'qr_code', 'data_matrix'],
    continuous: options.continuous ?? false,
    beepOnScan: options.beepOnScan ?? true,
    vibrate: options.vibrate ?? true,

    // Internal
    stream: null,
    barcodeDetector: null,
    animationFrame: null,

    init() {
      // Check for BarcodeDetector API support
      if ('BarcodeDetector' in window) {
        this.start();
      } else {
        this.error = 'Barcode scanning is not supported in this browser. Please use manual input.';
      }
    },

    destroy() {
      this.stop();
    },

    async start() {
      this.isLoading = true;
      this.error = null;

      try {
        // Request camera access
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: this.facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        // Set video source
        const video = this.$refs.video;
        video.srcObject = this.stream;
        await video.play();

        // Check for torch support
        const track = this.stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.() || {};
        this.hasTorch = capabilities.torch || false;

        // Create barcode detector
        this.barcodeDetector = new BarcodeDetector({
          formats: this.formats
        });

        this.isActive = true;
        this.isLoading = false;

        // Start scanning
        this.scan();

        this.$dispatch('scanner:started');
      } catch (err) {
        this.isLoading = false;
        if (err.name === 'NotAllowedError') {
          this.error = 'Camera access denied. Please allow camera permissions.';
        } else if (err.name === 'NotFoundError') {
          this.error = 'No camera found on this device.';
        } else {
          this.error = err.message || 'Failed to start camera.';
        }
        this.$dispatch('scanner:error', { error: this.error });
      }
    },

    stop() {
      this.isActive = false;

      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }

      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }

      this.$dispatch('scanner:stopped');
    },

    async scan() {
      if (!this.isActive || !this.barcodeDetector) return;

      const video = this.$refs.video;

      try {
        const barcodes = await this.barcodeDetector.detect(video);

        if (barcodes.length > 0) {
          const barcode = barcodes[0];
          this.onDetected(barcode);

          if (!this.continuous) {
            return;
          }
        }
      } catch (err) {
        // Silently ignore detection errors
      }

      this.animationFrame = requestAnimationFrame(() => this.scan());
    },

    onDetected(barcode) {
      const result = {
        rawValue: barcode.rawValue,
        format: barcode.format,
        timestamp: new Date().toISOString()
      };

      this.lastResult = result;

      // Add to history
      this.history.unshift(result);
      if (this.history.length > this.maxHistory) {
        this.history.pop();
      }

      // Feedback
      if (this.beepOnScan) {
        this.playBeep();
      }

      if (this.vibrate && navigator.vibrate) {
        navigator.vibrate(100);
      }

      this.$dispatch('scanner:detected', result);

      // Clear result after delay
      setTimeout(() => {
        this.lastResult = null;
      }, 2000);
    },

    playBeep() {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 1800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (err) {
        // Silently ignore audio errors
      }
    },

    async toggleCamera() {
      this.facingMode = this.facingMode === 'environment' ? 'user' : 'environment';
      this.stop();
      await this.start();
    },

    async toggleTorch() {
      if (!this.hasTorch || !this.stream) return;

      const track = this.stream.getVideoTracks()[0];
      this.torchOn = !this.torchOn;

      try {
        await track.applyConstraints({
          advanced: [{ torch: this.torchOn }]
        });
      } catch (err) {
        console.error('Failed to toggle torch:', err);
      }
    },

    submitManual() {
      if (!this.manualCode.trim()) return;

      const result = {
        rawValue: this.manualCode.trim(),
        format: 'manual',
        timestamp: new Date().toISOString()
      };

      this.lastResult = result;
      this.manualCode = '';

      // Add to history
      this.history.unshift(result);
      if (this.history.length > this.maxHistory) {
        this.history.pop();
      }

      this.$dispatch('scanner:detected', result);

      setTimeout(() => {
        this.lastResult = null;
      }, 2000);
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        window.UX?.lockScroll();
      } else {
        window.UX?.unlockScroll();
      }
    },

    close() {
      this.stop();
      if (this.isFullscreen) {
        this.isFullscreen = false;
        window.UX?.unlockScroll();
      }
      this.$dispatch('scanner:close');
    },

    formatLabel(format) {
      const labels = {
        'ean_13': 'EAN-13',
        'ean_8': 'EAN-8',
        'upc_a': 'UPC-A',
        'upc_e': 'UPC-E',
        'code_128': 'Code 128',
        'code_39': 'Code 39',
        'code_93': 'Code 93',
        'codabar': 'Codabar',
        'qr_code': 'QR',
        'data_matrix': 'Data Matrix',
        'manual': 'Manual'
      };
      return labels[format] || format;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxBarcodeScanner', componentData);
  }
})();
