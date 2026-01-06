/**
 * UX Toolbar Component
 * Barras de herramientas estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Toolbar
    ======================================== */

    .ux-toolbar {
      display: flex;
      align-items: center;
      min-height: var(--ux-toolbar-min-height);
      padding: var(--ux-toolbar-padding-y) var(--ux-toolbar-padding-x);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Toolbar Variants
    ======================================== */

    /* Translucent */
    .ux-toolbar--translucent {
      background-color: rgba(var(--ux-surface-rgb, 255, 255, 255), 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    }

    /* Glass (iOS 26 Liquid Glass) */
    /* Note: backdrop-filter and glass background come from universal selector [class*="--glass"] in ux-core.js */
    .ux-toolbar--glass {
      box-shadow: var(--ux-glass-highlight);
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    .ux-toolbar--glass.ux-toolbar--border-top {
      border-bottom: none;
      border-top: 0.5px solid var(--ux-glass-border);
    }

    /* Transparent */
    .ux-toolbar--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    /* No border */
    .ux-toolbar--no-border {
      border-bottom: none;
    }

    /* Border top (for footer toolbars) */
    .ux-toolbar--border-top {
      border-bottom: none;
      border-top: 1px solid var(--ux-border-color);
    }

    /* Colored */
    .ux-toolbar--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .ux-toolbar--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-toolbar--dark {
      background-color: var(--ux-dark);
      color: var(--ux-dark-contrast);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .ux-toolbar--light {
      background-color: var(--ux-light);
      color: var(--ux-text);
    }

    /* ========================================
       Toolbar Layout
    ======================================== */

    .ux-toolbar__start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-toolbar__center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 var(--ux-space-sm);
    }

    .ux-toolbar__end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    /* Spread layout */
    .ux-toolbar--spread {
      justify-content: space-between;
    }

    .ux-toolbar--spread .ux-toolbar__center {
      flex: 0;
    }

    /* ========================================
       Toolbar Buttons
    ======================================== */

    .ux-toolbar__button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: var(--ux-space-xs);
      background: none;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      border-radius: var(--ux-border-radius);
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-toolbar__button:hover {
      background-color: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-toolbar__button:active {
      opacity: 0.7;
    }

    .ux-toolbar__button:disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    .ux-toolbar__button-icon {
      width: 24px;
      height: 24px;
    }

    .ux-toolbar__button-icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-toolbar__button-text {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      padding: 0 var(--ux-space-xs);
    }

    /* Button with badge */
    .ux-toolbar__button--badge {
      position: relative;
    }

    .ux-toolbar__button-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      background-color: var(--ux-danger);
      color: white;
      font-size: 10px;
      font-weight: 600;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Primary button colors for colored toolbars */
    .ux-toolbar--primary .ux-toolbar__button,
    .ux-toolbar--dark .ux-toolbar__button {
      color: inherit;
    }

    .ux-toolbar--primary .ux-toolbar__button:hover,
    .ux-toolbar--dark .ux-toolbar__button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Toolbar Title
    ======================================== */

    .ux-toolbar__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-toolbar--primary .ux-toolbar__title,
    .ux-toolbar--dark .ux-toolbar__title {
      color: inherit;
    }

    /* ========================================
       Toolbar Text
    ======================================== */

    .ux-toolbar__text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Toolbar Spacer
    ======================================== */

    .ux-toolbar__spacer {
      flex: 1;
    }

    /* ========================================
       Toolbar Divider
    ======================================== */

    .ux-toolbar__divider {
      width: 1px;
      height: 24px;
      background-color: var(--ux-border-color);
      margin: 0 var(--ux-space-sm);
    }

    .ux-toolbar--primary .ux-toolbar__divider,
    .ux-toolbar--dark .ux-toolbar__divider {
      background-color: rgba(255, 255, 255, 0.2);
    }

    /* ========================================
       Toolbar Group
    ======================================== */

    .ux-toolbar__group {
      display: flex;
      align-items: center;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
      padding: 2px;
    }

    .ux-toolbar__group .ux-toolbar__button {
      min-width: 36px;
      min-height: 36px;
      border-radius: calc(var(--ux-border-radius) - 2px);
    }

    .ux-toolbar__group .ux-toolbar__button:hover {
      background-color: var(--ux-light);
    }

    .ux-toolbar__group .ux-toolbar__button--active {
      background-color: var(--ux-surface);
      box-shadow: var(--ux-shadow-sm);
    }

    /* ========================================
       Sizes
    ======================================== */

    .ux-toolbar--sm {
      min-height: 36px;
      padding: var(--ux-space-xs) var(--ux-space-sm);
    }

    .ux-toolbar--sm .ux-toolbar__button {
      min-width: 36px;
      min-height: 36px;
    }

    .ux-toolbar--sm .ux-toolbar__button-icon {
      width: 20px;
      height: 20px;
    }

    .ux-toolbar--lg {
      min-height: 56px;
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    /* ========================================
       Fixed Position
    ======================================== */

    .ux-toolbar--fixed-top {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    .ux-toolbar--fixed-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    /* Safe area for bottom toolbar */
    .ux-toolbar--safe-area-bottom {
      padding-bottom: calc(var(--ux-space-sm) + env(safe-area-inset-bottom));
    }

    /* ========================================
       Footer Toolbar
    ======================================== */

    .ux-toolbar--footer {
      border-top: 1px solid var(--ux-border-color);
      border-bottom: none;
      padding-bottom: calc(var(--ux-space-sm) + env(safe-area-inset-bottom));
    }

    /* ========================================
       Keyboard Toolbar (for inputs)
    ======================================== */

    .ux-keyboard-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-height: 44px;
      padding: var(--ux-space-xs) var(--ux-space-md);
      background-color: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-keyboard-toolbar__button {
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: none;
      border: none;
      color: var(--ux-primary);
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      cursor: pointer;
    }

    .ux-keyboard-toolbar__button:active {
      opacity: 0.7;
    }

    /* ========================================
       Action Toolbar (bottom actions)
    ======================================== */

    .ux-action-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      min-height: 49px;
      background-color: var(--ux-surface);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-action-toolbar__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      padding: var(--ux-space-sm);
      background: none;
      border: none;
      color: var(--ux-primary);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .ux-action-toolbar__item:active {
      opacity: 0.7;
    }

    .ux-action-toolbar__icon {
      width: 24px;
      height: 24px;
    }

    .ux-action-toolbar__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-action-toolbar__label {
      font-size: 10px;
      margin-top: 2px;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-toolbar-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-toolbar-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
