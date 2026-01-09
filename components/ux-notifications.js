/**
 * UX Notification Center Component
 * Panel for managing and displaying notifications
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       Notification Center Trigger
       ========================================================================== */

    .ux-notification-trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-touch-target);
      height: var(--ux-touch-target);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-full);
      color: var(--ux-text);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-notification-trigger:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-notification-trigger svg {
      width: 24px;
      height: 24px;
    }

    .ux-notification-trigger__badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      font-size: 0.6875rem;
      font-weight: 600;
      color: white;
      background: var(--ux-danger);
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--ux-background);
    }

    .ux-notification-trigger__badge--dot {
      min-width: 10px;
      width: 10px;
      height: 10px;
      padding: 0;
    }

    /* ==========================================================================
       Notification Panel
       ========================================================================== */

    .ux-notification-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 400px;
      z-index: var(--ux-z-modal);
      background: var(--ux-surface);
      box-shadow: var(--ux-shadow-2xl);
      transform: translateX(100%);
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-normal) var(--ux-ease-out);
      display: flex;
      flex-direction: column;
    }

    .ux-notification-panel--open {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    }

    .ux-notification-panel__backdrop {
      position: fixed;
      inset: 0;
      z-index: calc(var(--ux-z-modal) - 1);
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast);
    }

    .ux-notification-panel__backdrop--open {
      opacity: 1;
      visibility: visible;
    }

    /* ==========================================================================
       Panel Header
       ========================================================================== */

    .ux-notification-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-notification-panel__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-notification-panel__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-notification-panel__action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-md);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-notification-panel__action:hover {
      background: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-notification-panel__action svg {
      width: 20px;
      height: 20px;
    }

    /* ==========================================================================
       Panel Filters
       ========================================================================== */

    .ux-notification-panel__filters {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      overflow-x: auto;
      flex-shrink: 0;
    }

    .ux-notification-panel__filter {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text-secondary);
      background: var(--ux-surface-secondary);
      border: none;
      border-radius: var(--ux-radius-full);
      cursor: pointer;
      white-space: nowrap;
      transition: all var(--ux-transition-fast);
    }

    .ux-notification-panel__filter:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-notification-panel__filter--active {
      background: var(--ux-primary);
      color: white;
    }

    .ux-notification-panel__filter-count {
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      font-size: 0.6875rem;
      font-weight: 600;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-notification-panel__filter--active .ux-notification-panel__filter-count {
      background: rgba(255, 255, 255, 0.2);
    }

    /* ==========================================================================
       Panel Content
       ========================================================================== */

    .ux-notification-panel__content {
      flex: 1;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .ux-notification-panel__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ux-notification-panel__group {
      padding: var(--ux-space-xs) var(--ux-space-lg);
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ux-text-tertiary);
      background: var(--ux-surface-secondary);
    }

    /* ==========================================================================
       Notification Item
       ========================================================================== */

    .ux-notification-item {
      display: flex;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      cursor: pointer;
      transition: background var(--ux-transition-fast);
    }

    .ux-notification-item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-notification-item--unread {
      background: var(--ux-primary-tint);
    }

    .ux-notification-item--unread:hover {
      background: rgba(var(--ux-primary-rgb), 0.15);
    }

    .ux-notification-item__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: var(--ux-radius-full);
      background: var(--ux-surface-tertiary);
      color: var(--ux-text-secondary);
    }

    .ux-notification-item__icon svg {
      width: 20px;
      height: 20px;
    }

    .ux-notification-item__icon--info { background: var(--ux-primary-tint); color: var(--ux-primary); }
    .ux-notification-item__icon--success { background: var(--ux-success-tint); color: var(--ux-success); }
    .ux-notification-item__icon--warning { background: var(--ux-warning-tint); color: var(--ux-warning); }
    .ux-notification-item__icon--error { background: var(--ux-danger-tint); color: var(--ux-danger); }

    .ux-notification-item__content {
      flex: 1;
      min-width: 0;
    }

    .ux-notification-item__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-sm);
      margin-bottom: 2px;
    }

    .ux-notification-item__title {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      line-height: 1.3;
    }

    .ux-notification-item--unread .ux-notification-item__title {
      font-weight: 600;
    }

    .ux-notification-item__time {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .ux-notification-item__message {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ux-notification-item__actions {
      display: flex;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-sm);
    }

    .ux-notification-item__action-btn {
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: 1px solid var(--ux-primary);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast);
    }

    .ux-notification-item__action-btn:hover {
      background: var(--ux-primary);
      color: white;
    }

    .ux-notification-item__action-btn--primary {
      background: var(--ux-primary);
      color: white;
      border-color: var(--ux-primary);
    }

    .ux-notification-item__action-btn--primary:hover {
      background: var(--ux-primary-shade);
    }

    /* Indicator dot for unread */
    .ux-notification-item__dot {
      width: 8px;
      height: 8px;
      flex-shrink: 0;
      background: var(--ux-primary);
      border-radius: 50%;
      margin-top: 6px;
    }

    /* ==========================================================================
       Empty State
       ========================================================================== */

    .ux-notification-panel__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-3xl);
      text-align: center;
    }

    .ux-notification-panel__empty-icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-lg);
      color: var(--ux-text-tertiary);
      opacity: 0.5;
    }

    .ux-notification-panel__empty-title {
      font-size: var(--ux-font-size-lg);
      font-weight: 500;
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-notification-panel__empty-description {
      font-size: var(--ux-font-size-md);
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Panel Footer
       ========================================================================== */

    .ux-notification-panel__footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      flex-shrink: 0;
    }

    .ux-notification-panel__footer-link {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-primary);
      text-decoration: none;
      cursor: pointer;
    }

    .ux-notification-panel__footer-link:hover {
      text-decoration: underline;
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-notification-panel--glass {
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur-heavy));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy));
      border-left: 1px solid var(--ux-glass-border);
    }

    .ux-notification-panel--glass .ux-notification-panel__header,
    .ux-notification-panel--glass .ux-notification-panel__filters,
    .ux-notification-panel--glass .ux-notification-panel__footer {
      border-color: var(--ux-glass-border);
    }

    .ux-notification-panel--glass .ux-notification-item {
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Dropdown Variant (instead of panel)
       ========================================================================== */

    .ux-notification-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 380px;
      max-height: 480px;
      z-index: var(--ux-z-dropdown);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: all var(--ux-transition-fast) var(--ux-ease-out);
    }

    .ux-notification-dropdown--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-notification-dropdown .ux-notification-panel__content {
      max-height: 360px;
    }

    /* ==========================================================================
       Mobile Adjustments
       ========================================================================== */

    @media (max-width: 767px) {
      .ux-notification-panel {
        max-width: none;
      }

      .ux-notification-panel__header {
        padding-top: calc(var(--ux-safe-top) + var(--ux-space-md));
      }

      .ux-notification-panel__footer {
        padding-bottom: calc(var(--ux-safe-bottom) + var(--ux-space-md));
      }

      .ux-notification-dropdown {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-height: 70dvh;
        border-radius: var(--ux-radius-xl) var(--ux-radius-xl) 0 0;
        transform: translateY(100%);
      }

      .ux-notification-dropdown--open {
        transform: translateY(0);
      }

      .ux-notification-dropdown .ux-notification-panel__content {
        max-height: calc(70dvh - 120px);
      }
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      .ux-notification-panel__backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
    }

    .ux-dark .ux-notification-panel__backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-notification-panel,
      .ux-notification-panel__backdrop,
      .ux-notification-dropdown,
      .ux-notification-item {
        transition: none;
      }
    }
  `;

  // Icons
  const icons = {
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    checkAll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L7 17l-5-5"/><path d="M22 10l-9.5 9.5-2-2"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-notifications-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-notifications-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const notificationCenterData = (options = {}) => ({
    // Configuration
    notifications: options.notifications || [],
    filters: options.filters || ['all', 'unread'],
    filterLabels: options.filterLabels || {
      all: 'Todas',
      unread: 'No leidas',
      info: 'Info',
      success: 'Exito',
      warning: 'Avisos',
      error: 'Errores'
    },
    showFilters: options.showFilters ?? true,
    showFooter: options.showFooter ?? true,
    groupByDate: options.groupByDate ?? true,
    maxVisible: options.maxVisible ?? 50,
    variant: options.variant || 'panel', // 'panel' or 'dropdown'

    // State
    isOpen: false,
    activeFilter: 'all',

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      // Close on escape
      this._escHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
      document.addEventListener('keydown', this._escHandler);
    },

    destroy() {
      if (this._escHandler) {
        document.removeEventListener('keydown', this._escHandler);
      }
    },

    // Open panel
    open() {
      this.isOpen = true;

      if (this.variant === 'panel' && window.UX && window.UX.lockScroll) {
        window.UX.lockScroll();
      }

      this.$dispatch('notifications:open');
    },

    // Close panel
    close() {
      this.isOpen = false;

      if (this.variant === 'panel' && window.UX && window.UX.unlockScroll) {
        window.UX.unlockScroll();
      }

      this.$dispatch('notifications:close');
    },

    // Toggle panel
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    // Get filtered notifications
    get filteredNotifications() {
      let filtered = [...this.notifications];

      // Apply filter
      if (this.activeFilter !== 'all') {
        if (this.activeFilter === 'unread') {
          filtered = filtered.filter(n => !n.read);
        } else {
          filtered = filtered.filter(n => n.type === this.activeFilter);
        }
      }

      // Limit
      filtered = filtered.slice(0, this.maxVisible);

      // Group by date if enabled
      if (this.groupByDate) {
        return this.groupNotificationsByDate(filtered);
      }

      return [{ group: null, items: filtered }];
    },

    // Group notifications by date
    groupNotificationsByDate(notifications) {
      const groups = {};
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      notifications.forEach(notification => {
        const date = new Date(notification.timestamp);
        const notifDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        let groupKey;
        if (notifDate.getTime() === today.getTime()) {
          groupKey = 'Hoy';
        } else if (notifDate.getTime() === yesterday.getTime()) {
          groupKey = 'Ayer';
        } else {
          groupKey = date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
        }

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(notification);
      });

      return Object.entries(groups).map(([group, items]) => ({ group, items }));
    },

    // Count unread notifications
    get unreadCount() {
      return this.notifications.filter(n => !n.read).length;
    },

    // Count by filter
    getFilterCount(filter) {
      if (filter === 'all') return this.notifications.length;
      if (filter === 'unread') return this.unreadCount;
      return this.notifications.filter(n => n.type === filter).length;
    },

    // Mark notification as read
    markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        this.$dispatch('notification:read', { notification });
      }
    },

    // Mark all as read
    markAllAsRead() {
      this.notifications.forEach(n => n.read = true);
      this.$dispatch('notifications:all-read');
    },

    // Delete notification
    deleteNotification(notificationId) {
      const index = this.notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        const notification = this.notifications[index];
        this.notifications.splice(index, 1);
        this.$dispatch('notification:delete', { notification });
      }
    },

    // Clear all notifications
    clearAll() {
      this.notifications = [];
      this.$dispatch('notifications:clear');
    },

    // Add new notification
    addNotification(notification) {
      const newNotif = {
        id: notification.id || Date.now().toString(),
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        timestamp: notification.timestamp || new Date().toISOString(),
        read: notification.read ?? false,
        actions: notification.actions || [],
        data: notification.data || {}
      };

      this.notifications.unshift(newNotif);
      this.$dispatch('notification:add', { notification: newNotif });

      return newNotif;
    },

    // Handle notification click
    handleClick(notification) {
      if (!notification.read) {
        this.markAsRead(notification.id);
      }
      this.$dispatch('notification:click', { notification });
    },

    // Handle action click
    handleAction(notification, action) {
      this.$dispatch('notification:action', { notification, action });
      if (action.callback && typeof action.callback === 'function') {
        action.callback(notification);
      }
    },

    // Format relative time
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;

      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return 'Ahora';
      if (minutes < 60) return `${minutes}m`;
      if (hours < 24) return `${hours}h`;
      if (days < 7) return `${days}d`;

      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    },

    // Get icon by type
    getTypeIcon(type) {
      switch (type) {
        case 'success': return this.icons.success;
        case 'warning': return this.icons.warning;
        case 'error': return this.icons.error;
        default: return this.icons.info;
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxNotificationCenter', notificationCenterData);
  }

  // Expose icons for external use
  window.UX = window.UX || {};
  window.UX.notificationIcons = icons;
})();
