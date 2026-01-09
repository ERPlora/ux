/**
 * UX Avatar Component
 * Avatares para usuarios con imagen, iniciales o icono
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Avatar
    ======================================== */

    .ux-avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-avatar-size);
      height: var(--ux-avatar-size);
      border-radius: 50%;
      background-color: var(--ux-medium);
      color: var(--ux-medium-contrast);
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      text-transform: uppercase;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ux-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-avatar--xs {
      width: var(--ux-avatar-size-xs);
      height: var(--ux-avatar-size-xs);
      font-size: var(--ux-font-size-xs);
    }

    .ux-avatar--sm {
      width: var(--ux-avatar-size-sm);
      height: var(--ux-avatar-size-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-avatar--md {
      width: var(--ux-avatar-size);
      height: var(--ux-avatar-size);
      font-size: var(--ux-font-size-lg);
    }

    .ux-avatar--lg {
      width: var(--ux-avatar-size-lg);
      height: var(--ux-avatar-size-lg);
      font-size: var(--ux-font-size-xl);
    }

    .ux-avatar--xl {
      width: var(--ux-avatar-size-xl);
      height: var(--ux-avatar-size-xl);
      font-size: var(--ux-font-size-3xl);
    }

    .ux-avatar--2xl {
      width: calc(var(--ux-avatar-size-xl) * 1.33);
      height: calc(var(--ux-avatar-size-xl) * 1.33);
      font-size: var(--ux-font-size-4xl);
    }

    /* ========================================
       Shape Variants
    ======================================== */

    .ux-avatar--square {
      border-radius: var(--ux-border-radius);
    }

    .ux-avatar--rounded {
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-avatar--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-avatar--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-avatar--tertiary {
      background-color: var(--ux-tertiary);
      color: var(--ux-tertiary-contrast);
    }

    .ux-avatar--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-avatar--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-avatar--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    .ux-avatar--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
    }

    .ux-avatar--light {
      background-color: var(--ux-light);
      color: var(--ux-light-contrast);
    }

    /* ========================================
       Status Indicator
    ======================================== */

    .ux-avatar__status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--ux-background);
      background-color: var(--ux-medium);
    }

    .ux-avatar--xs .ux-avatar__status {
      width: 8px;
      height: 8px;
      border-width: 1px;
    }

    .ux-avatar--sm .ux-avatar__status {
      width: 10px;
      height: 10px;
    }

    .ux-avatar--lg .ux-avatar__status,
    .ux-avatar--xl .ux-avatar__status {
      width: 16px;
      height: 16px;
      border-width: 3px;
    }

    .ux-avatar__status--online {
      background-color: var(--ux-success);
    }

    .ux-avatar__status--offline {
      background-color: var(--ux-medium);
    }

    .ux-avatar__status--busy {
      background-color: var(--ux-danger);
    }

    .ux-avatar__status--away {
      background-color: var(--ux-warning);
    }

    /* ========================================
       Avatar Group
    ======================================== */

    .ux-avatar-group {
      display: inline-flex;
      flex-direction: row-reverse;
      align-items: center;
    }

    .ux-avatar-group .ux-avatar {
      margin-left: -12px;
      border: 2px solid var(--ux-background);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
      box-sizing: content-box;
    }

    .ux-avatar-group .ux-avatar:last-child {
      margin-left: 0;
    }

    .ux-avatar-group .ux-avatar:hover {
      transform: translateY(-4px);
      z-index: 10;
    }

    /* Group Sizes */
    .ux-avatar-group--xs .ux-avatar {
      margin-left: -6px;
      border-width: 1px;
    }

    .ux-avatar-group--sm .ux-avatar {
      margin-left: -8px;
    }

    .ux-avatar-group--lg .ux-avatar {
      margin-left: -16px;
      border-width: 3px;
    }

    .ux-avatar-group--xl .ux-avatar {
      margin-left: -20px;
      border-width: 3px;
    }

    /* Group Stacking (left-to-right) */
    .ux-avatar-group--stack-left {
      flex-direction: row;
    }

    .ux-avatar-group--stack-left .ux-avatar {
      margin-left: 0;
      margin-right: -12px;
    }

    .ux-avatar-group--stack-left .ux-avatar:last-child {
      margin-right: 0;
    }

    /* Group - No Hover Effect */
    .ux-avatar-group--static .ux-avatar:hover {
      transform: none;
    }

    /* Avatar Group Counter */
    .ux-avatar-group__more {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-avatar-size);
      height: var(--ux-avatar-size);
      margin-left: -12px;
      border-radius: 50%;
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      border: 2px solid var(--ux-background);
      cursor: default;
      box-sizing: content-box;
    }

    .ux-avatar-group--xs .ux-avatar-group__more {
      width: var(--ux-avatar-size-xs);
      height: var(--ux-avatar-size-xs);
      margin-left: -6px;
      font-size: 9px;
      border-width: 1px;
    }

    .ux-avatar-group--sm .ux-avatar-group__more {
      width: var(--ux-avatar-size-sm);
      height: var(--ux-avatar-size-sm);
      margin-left: -8px;
      font-size: 10px;
    }

    .ux-avatar-group--lg .ux-avatar-group__more {
      width: var(--ux-avatar-size-lg);
      height: var(--ux-avatar-size-lg);
      margin-left: -16px;
      font-size: var(--ux-font-size-md);
      border-width: 3px;
    }

    .ux-avatar-group--xl .ux-avatar-group__more {
      width: var(--ux-avatar-size-xl);
      height: var(--ux-avatar-size-xl);
      margin-left: -20px;
      font-size: var(--ux-font-size-lg);
      border-width: 3px;
    }

    .ux-avatar-group--stack-left .ux-avatar-group__more {
      margin-left: 0;
      margin-right: -12px;
    }

    .ux-avatar-group__more:hover {
      background-color: var(--ux-surface-tertiary);
    }

    .ux-avatar-group__more--clickable {
      cursor: pointer;
    }

    /* Avatar Group Tooltip Container */
    .ux-avatar-group-wrapper {
      position: relative;
      display: inline-flex;
    }

    .ux-avatar-group__tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--ux-z-tooltip);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-gray-900);
      color: white;
      font-size: 0.75rem;
      border-radius: var(--ux-radius-md);
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast);
    }

    .ux-avatar-group__tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 6px solid transparent;
      border-top-color: var(--ux-gray-900);
    }

    .ux-avatar-group-wrapper:hover .ux-avatar-group__tooltip {
      opacity: 1;
      visibility: visible;
    }

    /* Glass variant for group */
    .ux-avatar-group--glass .ux-avatar {
      border-color: var(--ux-glass-border);
    }

    .ux-avatar-group--glass .ux-avatar-group__more {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur));
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Avatar with Badge
    ======================================== */

    .ux-avatar__badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: 9px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--ux-background);
    }

    /* ========================================
       Avatar Icon
    ======================================== */

    .ux-avatar__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      height: 60%;
    }

    .ux-avatar__icon svg {
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Clickable Avatar
    ======================================== */

    .ux-avatar--clickable {
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease),
                  box-shadow var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-avatar--clickable:hover {
      transform: scale(1.05);
      box-shadow: var(--ux-shadow-md);
    }

    .ux-avatar--clickable:active {
      transform: scale(0.98);
    }

    /* ========================================
       Avatar Placeholder (loading)
    ======================================== */

    .ux-avatar--loading {
      background: linear-gradient(
        90deg,
        var(--ux-light) 25%,
        var(--ux-light-tint) 50%,
        var(--ux-light) 75%
      );
      background-size: 200% 100%;
      animation: ux-avatar-shimmer 1.5s infinite;
    }

    @keyframes ux-avatar-shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-avatar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-avatar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Helper function to get initials from name
  window.UX = window.UX || {};
  window.UX.getInitials = function(name, maxLength = 2) {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, maxLength);
  };

  // Helper function to generate color from string
  window.UX.stringToColor = function(str) {
    const colors = [
      'primary', 'secondary', 'tertiary',
      'success', 'warning', 'danger'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
})();
