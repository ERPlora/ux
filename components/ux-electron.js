/**
 * UX Electron - Electron Desktop Integration
 * Native menus, window controls, IPC communication, and desktop features
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Electron Styles
    ======================================== */

    /* Traffic light buttons (macOS style) */
    .ux-electron-traffic {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 var(--ux-space-md);
      height: 100%;
      -webkit-app-region: no-drag;
    }

    .ux-electron-traffic__btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      transition: opacity 0.15s ease;
      position: relative;
    }

    .ux-electron-traffic__btn:hover {
      opacity: 0.8;
    }

    .ux-electron-traffic__btn--close {
      background: #ff5f57;
    }

    .ux-electron-traffic__btn--minimize {
      background: #febc2e;
    }

    .ux-electron-traffic__btn--maximize {
      background: #28c840;
    }

    /* Show icons on hover */
    .ux-electron-traffic:hover .ux-electron-traffic__btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .ux-electron-traffic:hover .ux-electron-traffic__btn--close::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M1 1l8 8M9 1L1 9' stroke='%23730a00' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }

    .ux-electron-traffic:hover .ux-electron-traffic__btn--minimize::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M1 5h8' stroke='%23985700' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    }

    .ux-electron-traffic:hover .ux-electron-traffic__btn--maximize::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M1 1h8v8H1z' stroke='%23006400' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    }

    /* Windows style controls */
    .ux-electron-controls {
      display: flex;
      align-items: stretch;
      height: 100%;
      -webkit-app-region: no-drag;
    }

    .ux-electron-controls__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 100%;
      border: none;
      background: transparent;
      color: var(--ux-text);
      cursor: pointer;
      transition: background-color 0.1s ease;
    }

    .ux-electron-controls__btn:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-electron-controls__btn--close:hover {
      background: #e81123;
      color: white;
    }

    .ux-electron-controls__btn svg {
      width: 10px;
      height: 10px;
    }

    /* Titlebar */
    .ux-electron-titlebar {
      display: flex;
      align-items: center;
      height: 32px;
      background: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
      -webkit-app-region: drag;
      user-select: none;
    }

    .ux-electron-titlebar--macos {
      padding-left: 78px; /* Space for traffic lights */
    }

    .ux-electron-titlebar__title {
      flex: 1;
      text-align: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ux-electron-titlebar__menu {
      display: flex;
      -webkit-app-region: no-drag;
    }

    .ux-electron-titlebar__menu-item {
      padding: 0 var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
      cursor: pointer;
      transition: background-color 0.1s ease;
    }

    .ux-electron-titlebar__menu-item:hover {
      background: var(--ux-surface-secondary);
    }

    /* Frameless window body adjustment */
    .ux-electron-frameless {
      padding-top: 32px;
    }

    .ux-electron-frameless .ux-electron-titlebar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-fixed);
    }

    /* Native context menu indicator */
    .ux-electron-context-menu {
      cursor: context-menu;
    }

    /* Drag and drop zones */
    .ux-electron-drop-zone {
      position: relative;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .ux-electron-drop-zone--active {
      background: var(--ux-primary-soft);
      border-color: var(--ux-primary);
    }

    .ux-electron-drop-zone--active::after {
      content: 'Drop files here';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--ux-primary-rgb), 0.1);
      border: 2px dashed var(--ux-primary);
      border-radius: inherit;
      font-weight: 500;
      color: var(--ux-primary);
    }

    /* Update indicator */
    .ux-electron-update {
      position: fixed;
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-primary);
      color: white;
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      z-index: var(--ux-z-toast);
      transform: translateY(calc(100% + var(--ux-space-xl)));
      transition: transform 0.3s ease;
    }

    .ux-electron-update--visible {
      transform: translateY(0);
    }

    .ux-electron-update__text {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-electron-update__btn {
      padding: var(--ux-space-xs) var(--ux-space-md);
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: var(--ux-border-radius);
      color: white;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .ux-electron-update__btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Glass titlebar */
    .ux-electron-titlebar--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      .ux-electron-titlebar {
        background: var(--ux-surface);
      }

      .ux-electron-controls__btn {
        color: var(--ux-text);
      }
    }

    .ux-dark .ux-electron-titlebar {
      background: var(--ux-surface);
    }

    .ux-dark .ux-electron-controls__btn {
      color: var(--ux-text);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-electron-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-electron-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  /**
   * Electron detection and IPC wrapper
   */
  const UXElectron = {
    // Is running in Electron
    isElectron: false,

    // Platform
    platform: null,

    // IPC renderer (if available)
    ipc: null,

    // Window state
    windowState: {
      isMaximized: false,
      isFullscreen: false,
      isFocused: true
    },

    // Update state
    updateState: {
      available: false,
      downloaded: false,
      version: null,
      releaseNotes: null
    },

    // Callbacks
    callbacks: {
      ready: [],
      maximize: [],
      unmaximize: [],
      focus: [],
      blur: [],
      updateAvailable: [],
      updateDownloaded: []
    },

    /**
     * Initialize Electron integration
     */
    init() {
      // Detect Electron
      this.isElectron = !!(
        typeof window !== 'undefined' &&
        window.process &&
        window.process.type === 'renderer'
      );

      // Alternative detection via user agent
      if (!this.isElectron) {
        this.isElectron = /electron/i.test(navigator.userAgent);
      }

      // Check for preload exposed API
      if (window.electronAPI) {
        this.ipc = window.electronAPI;
      } else if (window.electron) {
        this.ipc = window.electron;
      }

      if (this.isElectron) {
        this.detectPlatform();
        this.setupListeners();
        console.log('UX Electron initialized:', this.platform);
      }

      return this.isElectron;
    },

    /**
     * Detect platform
     */
    detectPlatform() {
      if (navigator.platform.includes('Mac')) {
        this.platform = 'darwin';
      } else if (navigator.platform.includes('Win')) {
        this.platform = 'win32';
      } else {
        this.platform = 'linux';
      }
    },

    /**
     * Setup IPC listeners
     */
    setupListeners() {
      if (!this.ipc) return;

      // Window state listeners
      if (this.ipc.onMaximize) {
        this.ipc.onMaximize(() => {
          this.windowState.isMaximized = true;
          this.callbacks.maximize.forEach(cb => cb());
        });
      }

      if (this.ipc.onUnmaximize) {
        this.ipc.onUnmaximize(() => {
          this.windowState.isMaximized = false;
          this.callbacks.unmaximize.forEach(cb => cb());
        });
      }

      if (this.ipc.onFocus) {
        this.ipc.onFocus(() => {
          this.windowState.isFocused = true;
          this.callbacks.focus.forEach(cb => cb());
        });
      }

      if (this.ipc.onBlur) {
        this.ipc.onBlur(() => {
          this.windowState.isFocused = false;
          this.callbacks.blur.forEach(cb => cb());
        });
      }

      // Auto-update listeners
      if (this.ipc.onUpdateAvailable) {
        this.ipc.onUpdateAvailable((info) => {
          this.updateState.available = true;
          this.updateState.version = info?.version;
          this.updateState.releaseNotes = info?.releaseNotes;
          this.callbacks.updateAvailable.forEach(cb => cb(info));
        });
      }

      if (this.ipc.onUpdateDownloaded) {
        this.ipc.onUpdateDownloaded((info) => {
          this.updateState.downloaded = true;
          this.callbacks.updateDownloaded.forEach(cb => cb(info));
        });
      }
    },

    /**
     * Window control methods
     */
    minimize() {
      if (this.ipc?.minimize) {
        this.ipc.minimize();
      }
    },

    maximize() {
      if (this.ipc?.maximize) {
        this.ipc.maximize();
      }
    },

    unmaximize() {
      if (this.ipc?.unmaximize) {
        this.ipc.unmaximize();
      }
    },

    toggleMaximize() {
      if (this.windowState.isMaximized) {
        this.unmaximize();
      } else {
        this.maximize();
      }
    },

    close() {
      if (this.ipc?.close) {
        this.ipc.close();
      }
    },

    setFullscreen(fullscreen) {
      if (this.ipc?.setFullscreen) {
        this.ipc.setFullscreen(fullscreen);
        this.windowState.isFullscreen = fullscreen;
      }
    },

    toggleFullscreen() {
      this.setFullscreen(!this.windowState.isFullscreen);
    },

    /**
     * App methods
     */
    getVersion() {
      return this.ipc?.getVersion?.() || null;
    },

    getPath(name) {
      return this.ipc?.getPath?.(name) || null;
    },

    openExternal(url) {
      if (this.ipc?.openExternal) {
        this.ipc.openExternal(url);
      } else {
        window.open(url, '_blank');
      }
    },

    showItemInFolder(path) {
      if (this.ipc?.showItemInFolder) {
        this.ipc.showItemInFolder(path);
      }
    },

    /**
     * Dialog methods
     */
    async showOpenDialog(options = {}) {
      if (this.ipc?.showOpenDialog) {
        return await this.ipc.showOpenDialog(options);
      }
      return null;
    },

    async showSaveDialog(options = {}) {
      if (this.ipc?.showSaveDialog) {
        return await this.ipc.showSaveDialog(options);
      }
      return null;
    },

    async showMessageBox(options = {}) {
      if (this.ipc?.showMessageBox) {
        return await this.ipc.showMessageBox(options);
      }
      // Fallback to web dialog
      if (options.type === 'question' && options.buttons) {
        const result = window.confirm(options.message);
        return { response: result ? 0 : 1 };
      }
      window.alert(options.message);
      return { response: 0 };
    },

    /**
     * Notification
     */
    showNotification(title, body, options = {}) {
      if (this.ipc?.showNotification) {
        this.ipc.showNotification({ title, body, ...options });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, ...options });
      }
    },

    /**
     * Auto-update methods
     */
    checkForUpdates() {
      if (this.ipc?.checkForUpdates) {
        this.ipc.checkForUpdates();
      }
    },

    downloadUpdate() {
      if (this.ipc?.downloadUpdate) {
        this.ipc.downloadUpdate();
      }
    },

    installUpdate() {
      if (this.ipc?.quitAndInstall) {
        this.ipc.quitAndInstall();
      }
    },

    /**
     * Menu methods
     */
    setApplicationMenu(template) {
      if (this.ipc?.setApplicationMenu) {
        this.ipc.setApplicationMenu(template);
      }
    },

    showContextMenu(template, options = {}) {
      if (this.ipc?.showContextMenu) {
        this.ipc.showContextMenu(template, options);
      }
    },

    /**
     * Store (electron-store)
     */
    async storeGet(key) {
      if (this.ipc?.storeGet) {
        return await this.ipc.storeGet(key);
      }
      return localStorage.getItem(key);
    },

    async storeSet(key, value) {
      if (this.ipc?.storeSet) {
        return await this.ipc.storeSet(key, value);
      }
      localStorage.setItem(key, JSON.stringify(value));
    },

    async storeDelete(key) {
      if (this.ipc?.storeDelete) {
        return await this.ipc.storeDelete(key);
      }
      localStorage.removeItem(key);
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
    },

    /**
     * Send IPC message
     */
    send(channel, ...args) {
      if (this.ipc?.send) {
        this.ipc.send(channel, ...args);
      }
    },

    /**
     * Invoke IPC (async)
     */
    async invoke(channel, ...args) {
      if (this.ipc?.invoke) {
        return await this.ipc.invoke(channel, ...args);
      }
      return null;
    }
  };

  /**
   * Alpine.js component for Electron integration
   */
  const electronComponent = (config = {}) => ({
    // State
    isElectron: UXElectron.isElectron,
    platform: UXElectron.platform,
    isMaximized: false,
    isFocused: true,
    updateAvailable: false,
    updateDownloaded: false,
    updateVersion: null,
    showUpdateBanner: false,

    // Config
    showTrafficLights: config.showTrafficLights ?? true,
    showWindowControls: config.showWindowControls ?? true,
    customTitlebar: config.customTitlebar ?? false,
    title: config.title || document.title,

    init() {
      if (!UXElectron.isElectron) {
        UXElectron.init();
        this.isElectron = UXElectron.isElectron;
        this.platform = UXElectron.platform;
      }

      if (!this.isElectron) return;

      // Sync state
      this.isMaximized = UXElectron.windowState.isMaximized;
      this.isFocused = UXElectron.windowState.isFocused;

      // Listen to window events
      UXElectron.on('maximize', () => {
        this.isMaximized = true;
      });

      UXElectron.on('unmaximize', () => {
        this.isMaximized = false;
      });

      UXElectron.on('focus', () => {
        this.isFocused = true;
      });

      UXElectron.on('blur', () => {
        this.isFocused = false;
      });

      // Listen to update events
      UXElectron.on('updateAvailable', (info) => {
        this.updateAvailable = true;
        this.updateVersion = info?.version;
        if (config.autoShowUpdate !== false) {
          this.showUpdateBanner = true;
        }
        this.$dispatch('electron-update-available', info);
      });

      UXElectron.on('updateDownloaded', (info) => {
        this.updateDownloaded = true;
        this.showUpdateBanner = true;
        this.$dispatch('electron-update-downloaded', info);
      });

      // Add frameless class if custom titlebar
      if (this.customTitlebar) {
        document.body.classList.add('ux-electron-frameless');
      }
    },

    // Window controls
    minimize: () => UXElectron.minimize(),
    maximize: () => UXElectron.maximize(),
    unmaximize: () => UXElectron.unmaximize(),
    toggleMaximize: () => UXElectron.toggleMaximize(),
    close: () => UXElectron.close(),
    toggleFullscreen: () => UXElectron.toggleFullscreen(),

    // Update controls
    checkForUpdates: () => UXElectron.checkForUpdates(),
    downloadUpdate: () => UXElectron.downloadUpdate(),
    installUpdate: () => UXElectron.installUpdate(),
    dismissUpdate() {
      this.showUpdateBanner = false;
    },

    // Helpers
    isMac() {
      return this.platform === 'darwin';
    },

    isWindows() {
      return this.platform === 'win32';
    },

    isLinux() {
      return this.platform === 'linux';
    },

    openExternal(url) {
      UXElectron.openExternal(url);
    },

    async openFile(options = {}) {
      return await UXElectron.showOpenDialog(options);
    },

    async saveFile(options = {}) {
      return await UXElectron.showSaveDialog(options);
    },

    async confirm(message, title = 'Confirm') {
      const result = await UXElectron.showMessageBox({
        type: 'question',
        buttons: ['Yes', 'No'],
        defaultId: 0,
        title: title,
        message: message
      });
      return result.response === 0;
    },

    notify(title, body) {
      UXElectron.showNotification(title, body);
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxElectron', electronComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxElectron', electronComponent);
    });
  }

  // Export to window
  window.UXElectron = UXElectron;

  // Auto-init
  UXElectron.init();

})();
