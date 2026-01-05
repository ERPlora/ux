/**
 * UX PWA - Progressive Web App Support
 * Service Worker registration, offline detection, and install prompts
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX PWA Styles
    ======================================== */

    /* Online/Offline Indicator */
    .ux-pwa-status {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-toast);
      padding: var(--ux-space-sm) var(--ux-space-md);
      text-align: center;
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    .ux-pwa-status--visible {
      transform: translateY(0);
    }

    .ux-pwa-status--offline {
      background-color: var(--ux-danger);
      color: white;
    }

    .ux-pwa-status--online {
      background-color: var(--ux-success);
      color: white;
    }

    /* Install Banner */
    .ux-pwa-install {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: var(--ux-z-modal);
      background: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
      padding: var(--ux-space-lg);
      padding-bottom: calc(var(--ux-space-lg) + env(safe-area-inset-bottom));
      box-shadow: var(--ux-shadow-lg);
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .ux-pwa-install--visible {
      transform: translateY(0);
    }

    .ux-pwa-install__content {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      max-width: 600px;
      margin: 0 auto;
    }

    .ux-pwa-install__icon {
      width: 48px;
      height: 48px;
      border-radius: var(--ux-border-radius);
      flex-shrink: 0;
      object-fit: contain;
    }

    .ux-pwa-install__text {
      flex: 1;
      min-width: 0;
    }

    .ux-pwa-install__title {
      font-weight: 600;
      font-size: var(--ux-font-size-base);
      color: var(--ux-text);
      margin-bottom: 2px;
    }

    .ux-pwa-install__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-pwa-install__actions {
      display: flex;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* Update Available Banner */
    .ux-pwa-update {
      position: fixed;
      bottom: var(--ux-space-lg);
      left: var(--ux-space-lg);
      right: var(--ux-space-lg);
      z-index: var(--ux-z-modal);
      background: var(--ux-primary);
      color: white;
      border-radius: var(--ux-border-radius-lg);
      padding: var(--ux-space-md) var(--ux-space-lg);
      box-shadow: var(--ux-shadow-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      transform: translateY(calc(100% + var(--ux-space-xl)));
      transition: transform 0.3s ease;
    }

    .ux-pwa-update--visible {
      transform: translateY(0);
    }

    .ux-pwa-update__text {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-pwa-update__btn {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      padding: var(--ux-space-xs) var(--ux-space-md);
      border-radius: var(--ux-border-radius);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .ux-pwa-update__btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Offline Overlay */
    .ux-pwa-offline-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      background: var(--ux-surface);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xl);
      text-align: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }

    .ux-pwa-offline-overlay--visible {
      opacity: 1;
      visibility: visible;
    }

    .ux-pwa-offline-overlay__icon {
      width: 80px;
      height: 80px;
      margin-bottom: var(--ux-space-lg);
      color: var(--ux-text-secondary);
    }

    .ux-pwa-offline-overlay__title {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-pwa-offline-overlay__subtitle {
      font-size: var(--ux-font-size-base);
      color: var(--ux-text-secondary);
      max-width: 300px;
    }

    /* Cached indicator badge */
    .ux-pwa-cached {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      background: var(--ux-success-soft);
      color: var(--ux-success);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      border-radius: var(--ux-border-radius);
    }

    .ux-pwa-cached__icon {
      width: 14px;
      height: 14px;
    }

    /* iOS Safari specific styles */
    @supports (-webkit-touch-callout: none) {
      .ux-pwa-install__subtitle--ios::after {
        content: ' Tap Share then "Add to Home Screen"';
      }
    }

    /* Safe area support */
    @supports (padding: env(safe-area-inset-bottom)) {
      .ux-pwa-status {
        padding-top: calc(var(--ux-space-sm) + env(safe-area-inset-top));
      }
    }

    /* Dark mode adjustments */
    .ux-dark .ux-pwa-install {
      background: var(--ux-surface);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles(styles, 'ux-pwa');
  } else {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // PWA Manager Alpine component
  const pwaComponent = (config = {}) => ({
    // State
    isOnline: navigator.onLine,
    isInstallable: false,
    isStandalone: false,
    hasUpdate: false,
    showInstallBanner: false,
    showOfflineStatus: false,
    showOnlineStatus: false,
    showUpdateBanner: false,
    showOfflineOverlay: false,

    // Config
    serviceWorkerPath: config.serviceWorkerPath || '/sw.js',
    appName: config.appName || document.title,
    appIcon: config.appIcon || '/icon-192.png',
    offlineStatusDuration: config.offlineStatusDuration ?? 3000,
    onlineStatusDuration: config.onlineStatusDuration ?? 2000,
    autoShowInstall: config.autoShowInstall ?? true,
    installDelay: config.installDelay ?? 30000, // 30 seconds

    // Internal
    deferredPrompt: null,
    registration: null,
    statusTimeout: null,

    init() {
      // Check if running as installed PWA
      this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          window.navigator.standalone === true;

      // Online/Offline events
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());

      // Install prompt event
      window.addEventListener('beforeinstallprompt', (e) => this.handleInstallPrompt(e));

      // App installed event
      window.addEventListener('appinstalled', () => this.handleAppInstalled());

      // Register service worker
      if (config.registerServiceWorker !== false) {
        this.registerServiceWorker();
      }

      // Auto-show install banner after delay
      if (this.autoShowInstall && !this.isStandalone) {
        setTimeout(() => {
          if (this.isInstallable && !this.isStandalone) {
            this.showInstallBanner = true;
          }
        }, this.installDelay);
      }
    },

    async registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          this.registration = await navigator.serviceWorker.register(this.serviceWorkerPath);

          // Check for updates
          this.registration.addEventListener('updatefound', () => {
            const newWorker = this.registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.hasUpdate = true;
                this.showUpdateBanner = true;
              }
            });
          });

          // Listen for controller change (after update)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (config.reloadOnUpdate !== false) {
              window.location.reload();
            }
          });

          console.log('Service Worker registered:', this.registration.scope);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    },

    handleOnline() {
      this.isOnline = true;
      this.showOfflineOverlay = false;
      this.showOnlineStatus = true;

      clearTimeout(this.statusTimeout);
      this.statusTimeout = setTimeout(() => {
        this.showOnlineStatus = false;
      }, this.onlineStatusDuration);

      this.$dispatch('ux-pwa-online');
    },

    handleOffline() {
      this.isOnline = false;
      this.showOfflineStatus = true;

      clearTimeout(this.statusTimeout);
      this.statusTimeout = setTimeout(() => {
        this.showOfflineStatus = false;
      }, this.offlineStatusDuration);

      this.$dispatch('ux-pwa-offline');
    },

    handleInstallPrompt(e) {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
      this.$dispatch('ux-pwa-installable');
    },

    handleAppInstalled() {
      this.isInstallable = false;
      this.isStandalone = true;
      this.showInstallBanner = false;
      this.deferredPrompt = null;
      this.$dispatch('ux-pwa-installed');
    },

    async promptInstall() {
      if (!this.deferredPrompt) return false;

      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        this.isInstallable = false;
        this.showInstallBanner = false;
      }

      this.deferredPrompt = null;
      return outcome === 'accepted';
    },

    dismissInstall() {
      this.showInstallBanner = false;
      this.$dispatch('ux-pwa-install-dismissed');
    },

    async applyUpdate() {
      if (this.registration && this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      this.showUpdateBanner = false;
    },

    dismissUpdate() {
      this.showUpdateBanner = false;
    },

    // Check if a specific resource is cached
    async isCached(url) {
      if ('caches' in window) {
        const cache = await caches.open('v1');
        const response = await cache.match(url);
        return !!response;
      }
      return false;
    },

    // Clear all caches
    async clearCache() {
      if ('caches' in window) {
        const names = await caches.keys();
        await Promise.all(names.map(name => caches.delete(name)));
        return true;
      }
      return false;
    },

    // Get cache storage estimate
    async getCacheSize() {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          usage: estimate.usage,
          quota: estimate.quota,
          usageFormatted: this.formatBytes(estimate.usage),
          quotaFormatted: this.formatBytes(estimate.quota),
          percentUsed: Math.round((estimate.usage / estimate.quota) * 100)
        };
      }
      return null;
    },

    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Check if iOS
    get isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },

    // Check if can install (not iOS Safari in standalone)
    get canInstall() {
      return this.isInstallable && !this.isStandalone;
    }
  });

  // Register Alpine component
  if (window.UX) {
    window.UX.registerComponent('uxPWA', pwaComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPWA', pwaComponent);
    });
  }

  // Simple offline detection helper (no Alpine required)
  window.UXOffline = {
    isOnline: navigator.onLine,
    callbacks: { online: [], offline: [] },

    init() {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.callbacks.online.forEach(cb => cb());
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.callbacks.offline.forEach(cb => cb());
      });
    },

    onOnline(callback) {
      this.callbacks.online.push(callback);
    },

    onOffline(callback) {
      this.callbacks.offline.push(callback);
    }
  };

  // Auto-init
  window.UXOffline.init();

})();
