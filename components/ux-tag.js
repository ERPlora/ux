/**
 * UX Tag Component
 * Chips removibles (tags) para filtros y selecciones
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Tag
    ======================================== */

    .ux-tag {
      display: inline-flex;
      align-items: center;
      gap: var(--ux-space-xs);
      height: var(--ux-tag-height, 28px);
      padding: 0 var(--ux-space-sm);
      padding-right: var(--ux-space-xs);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-border-radius-full);
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
      transition: var(--ux-transition-colors);
    }

    /* ========================================
       Tag Text/Label
    ======================================== */

    .ux-tag__text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    /* ========================================
       Remove Button
    ======================================== */

    .ux-tag__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      padding: 0;
      margin-left: 2px;
      background-color: transparent;
      border: none;
      border-radius: 50%;
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-tag__remove:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--ux-text);
    }

    .ux-tag__remove:active {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .ux-tag__remove-icon {
      width: 12px;
      height: 12px;
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-tag--primary {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      border-color: rgba(var(--ux-primary-rgb), 0.2);
      color: var(--ux-primary);
    }

    .ux-tag--primary .ux-tag__remove:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.2);
      color: var(--ux-primary);
    }

    .ux-tag--success {
      background-color: rgba(var(--ux-success-rgb), 0.1);
      border-color: rgba(var(--ux-success-rgb), 0.2);
      color: var(--ux-success);
    }

    .ux-tag--success .ux-tag__remove:hover {
      background-color: rgba(var(--ux-success-rgb), 0.2);
    }

    .ux-tag--warning {
      background-color: rgba(var(--ux-warning-rgb), 0.1);
      border-color: rgba(var(--ux-warning-rgb), 0.2);
      color: var(--ux-warning-shade);
    }

    .ux-tag--warning .ux-tag__remove:hover {
      background-color: rgba(var(--ux-warning-rgb), 0.2);
    }

    .ux-tag--danger {
      background-color: rgba(var(--ux-danger-rgb), 0.1);
      border-color: rgba(var(--ux-danger-rgb), 0.2);
      color: var(--ux-danger);
    }

    .ux-tag--danger .ux-tag__remove:hover {
      background-color: rgba(var(--ux-danger-rgb), 0.2);
    }

    .ux-tag--info {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
      border-color: rgba(var(--ux-primary-rgb), 0.2);
      color: var(--ux-primary);
    }

    /* ========================================
       Filled Variant
    ======================================== */

    .ux-tag--filled {
      background-color: var(--ux-gray-200);
      border-color: transparent;
      color: var(--ux-gray-700);
    }

    .ux-tag--filled .ux-tag__remove:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .ux-tag--filled.ux-tag--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-tag--filled.ux-tag--primary .ux-tag__remove {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-tag--filled.ux-tag--primary .ux-tag__remove:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .ux-tag--filled.ux-tag--success {
      background-color: var(--ux-success);
      color: white;
    }

    .ux-tag--filled.ux-tag--success .ux-tag__remove {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-tag--filled.ux-tag--success .ux-tag__remove:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .ux-tag--filled.ux-tag--danger {
      background-color: var(--ux-danger);
      color: white;
    }

    .ux-tag--filled.ux-tag--danger .ux-tag__remove {
      color: rgba(255, 255, 255, 0.7);
    }

    .ux-tag--filled.ux-tag--danger .ux-tag__remove:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-tag--sm {
      --ux-tag-height: 22px;
      font-size: var(--ux-font-size-xs);
      padding: 0 var(--ux-space-xs);
    }

    .ux-tag--sm .ux-tag__remove {
      width: 14px;
      height: 14px;
    }

    .ux-tag--sm .ux-tag__remove-icon {
      width: 10px;
      height: 10px;
    }

    .ux-tag--lg {
      --ux-tag-height: 34px;
      font-size: var(--ux-font-size-md);
      padding: 0 var(--ux-space-md);
      padding-right: var(--ux-space-sm);
    }

    .ux-tag--lg .ux-tag__remove {
      width: 22px;
      height: 22px;
    }

    .ux-tag--lg .ux-tag__remove-icon {
      width: 14px;
      height: 14px;
    }

    /* ========================================
       Square Shape
    ======================================== */

    .ux-tag--square {
      border-radius: var(--ux-border-radius);
    }

    /* ========================================
       With Icon/Avatar
    ======================================== */

    .ux-tag__icon {
      width: 16px;
      height: 16px;
      margin-left: calc(var(--ux-space-xs) * -1);
      flex-shrink: 0;
    }

    .ux-tag__avatar {
      width: 20px;
      height: 20px;
      margin-left: calc(var(--ux-space-sm) * -1 + 2px);
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .ux-tag--sm .ux-tag__icon {
      width: 12px;
      height: 12px;
    }

    .ux-tag--sm .ux-tag__avatar {
      width: 16px;
      height: 16px;
    }

    .ux-tag--lg .ux-tag__icon {
      width: 18px;
      height: 18px;
    }

    .ux-tag--lg .ux-tag__avatar {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Interactive (clickable)
    ======================================== */

    .ux-tag--interactive {
      cursor: pointer;
    }

    .ux-tag--interactive:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-tag--interactive:active {
      transform: scale(0.97);
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-tag--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Animating Out
    ======================================== */

    .ux-tag--removing {
      animation: ux-tag-remove 200ms var(--ux-ease) forwards;
    }

    @keyframes ux-tag-remove {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.8);
      }
    }

    /* ========================================
       Tag Group
    ======================================== */

    .ux-tag-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-tag-group--sm {
      gap: 4px;
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-tag {
        background-color: var(--ux-surface-secondary);
        border-color: var(--ux-border-color);
      }

      .ux-tag__remove:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .ux-tag--filled {
        background-color: var(--ux-gray-700);
        color: var(--ux-gray-200);
      }
    }

    .ux-dark .ux-tag {
      background-color: var(--ux-surface-secondary);
      border-color: var(--ux-border-color);
    }

    .ux-dark .ux-tag__remove:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-tag {
        transition: none;
      }

      .ux-tag--removing {
        animation: none;
        opacity: 0;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-tag-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-tag-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component for tag groups
  const tagGroupData = (options = {}) => ({
    tags: options.tags ?? [],
    maxTags: options.maxTags ?? null,

    init() {
      // Initialize from existing elements if needed
    },

    addTag(value) {
      if (this.maxTags && this.tags.length >= this.maxTags) return false;
      if (this.tags.includes(value)) return false;

      this.tags.push(value);
      this.$dispatch('tags:add', { value, tags: [...this.tags] });
      return true;
    },

    removeTag(value) {
      const index = this.tags.indexOf(value);
      if (index === -1) return false;

      this.tags.splice(index, 1);
      this.$dispatch('tags:remove', { value, tags: [...this.tags] });
      return true;
    },

    removeTagWithAnimation(value, element) {
      element.classList.add('ux-tag--removing');
      setTimeout(() => {
        this.removeTag(value);
      }, 200);
    },

    hasTag(value) {
      return this.tags.includes(value);
    },

    clearTags() {
      this.tags = [];
      this.$dispatch('tags:clear');
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxTagGroup', tagGroupData);
  }

})();
