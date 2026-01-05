/**
 * UX Card Component
 * Cards estilo Ionic/iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Card
    ======================================== */

    .ux-card {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      box-shadow: var(--ux-shadow-sm);
      overflow: hidden;
      margin: var(--ux-space-md) 0;
    }

    /* ========================================
       Card Header
    ======================================== */

    .ux-card__header {
      display: flex;
      align-items: center;
      padding: var(--ux-space-lg);
      gap: var(--ux-space-md);
    }

    .ux-card__header--bordered {
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-card__avatar {
      flex-shrink: 0;
    }

    .ux-card__header-content {
      flex: 1;
      min-width: 0;
    }

    .ux-card__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
      line-height: 1.3;
    }

    .ux-card__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin: var(--ux-space-xs) 0 0;
      line-height: 1.4;
    }

    .ux-card__header-actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
    }

    /* ========================================
       Card Media
    ======================================== */

    .ux-card__media {
      position: relative;
      overflow: hidden;
    }

    .ux-card__media img,
    .ux-card__media video {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }

    .ux-card__media--top {
      order: -1;
    }

    .ux-card__media--square {
      aspect-ratio: 1 / 1;
    }

    .ux-card__media--wide {
      aspect-ratio: 16 / 9;
    }

    .ux-card__media--portrait {
      aspect-ratio: 3 / 4;
    }

    .ux-card__media-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--ux-space-lg);
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      color: white;
    }

    .ux-card__media-overlay .ux-card__title {
      color: white;
    }

    .ux-card__media-overlay .ux-card__subtitle {
      color: rgba(255, 255, 255, 0.8);
    }

    /* ========================================
       Card Content
    ======================================== */

    .ux-card__content {
      padding: var(--ux-space-lg);
      font-size: var(--ux-font-size-md);
      color: var(--ux-text);
      line-height: 1.6;
    }

    .ux-card__content p {
      margin: 0 0 var(--ux-space-md);
    }

    .ux-card__content p:last-child {
      margin-bottom: 0;
    }

    .ux-card__header + .ux-card__content {
      padding-top: 0;
    }

    /* ========================================
       Card Footer
    ======================================== */

    .ux-card__footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: var(--ux-space-md) var(--ux-space-lg);
      gap: var(--ux-space-sm);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-card__footer--transparent {
      border-top: none;
      background: transparent;
    }

    .ux-card__footer-start {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-card__footer-end {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-left: auto;
    }

    /* ========================================
       Card Actions (buttons row)
    ======================================== */

    .ux-card__actions {
      display: flex;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-md);
      gap: var(--ux-space-sm);
    }

    .ux-card__actions--full {
      flex-direction: column;
    }

    .ux-card__actions--full .ux-button {
      width: 100%;
    }

    .ux-card__actions--space-between {
      justify-content: space-between;
    }

    .ux-card__actions--end {
      justify-content: flex-end;
    }

    /* ========================================
       Variants
    ======================================== */

    /* Outlined */
    .ux-card--outline {
      box-shadow: none;
      border: 1px solid var(--ux-border-color);
    }

    /* Flat */
    .ux-card--flat {
      box-shadow: none;
      border-radius: 0;
    }

    /* Elevated */
    .ux-card--elevated {
      box-shadow: var(--ux-shadow-lg);
    }

    /* Inset (iOS grouped style) */
    .ux-card--inset {
      margin-left: var(--ux-space-lg);
      margin-right: var(--ux-space-lg);
    }

    /* Full width */
    .ux-card--full {
      margin-left: 0;
      margin-right: 0;
      border-radius: 0;
    }

    /* ========================================
       Clickable Card
    ======================================== */

    .ux-card--clickable {
      cursor: pointer;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-card--clickable:hover {
      box-shadow: var(--ux-shadow-md);
    }

    .ux-card--clickable:active {
      transform: scale(0.98);
    }

    /* ========================================
       Color Variants
    ======================================== */

    .ux-card--primary {
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-card--primary .ux-card__title,
    .ux-card--primary .ux-card__content {
      color: var(--ux-primary-contrast);
    }

    .ux-card--primary .ux-card__subtitle {
      color: rgba(255, 255, 255, 0.8);
    }

    .ux-card--secondary {
      background-color: var(--ux-secondary);
      color: var(--ux-secondary-contrast);
    }

    .ux-card--success {
      background-color: var(--ux-success);
      color: var(--ux-success-contrast);
    }

    .ux-card--warning {
      background-color: var(--ux-warning);
      color: var(--ux-warning-contrast);
    }

    .ux-card--danger {
      background-color: var(--ux-danger);
      color: var(--ux-danger-contrast);
    }

    /* ========================================
       Card Sizes
    ======================================== */

    .ux-card--sm .ux-card__header,
    .ux-card--sm .ux-card__content,
    .ux-card--sm .ux-card__footer {
      padding: var(--ux-space-md);
    }

    .ux-card--sm .ux-card__title {
      font-size: var(--ux-font-size-md);
    }

    .ux-card--lg .ux-card__header,
    .ux-card--lg .ux-card__content,
    .ux-card--lg .ux-card__footer {
      padding: var(--ux-space-xl);
    }

    .ux-card--lg .ux-card__title {
      font-size: var(--ux-font-size-xl);
    }

    /* ========================================
       Horizontal Card
    ======================================== */

    .ux-card--horizontal {
      flex-direction: row;
    }

    .ux-card--horizontal .ux-card__media {
      width: 120px;
      flex-shrink: 0;
    }

    .ux-card--horizontal .ux-card__media img {
      height: 100%;
      object-fit: cover;
    }

    .ux-card--horizontal .ux-card__body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 480px) {
      .ux-card--horizontal {
        flex-direction: column;
      }

      .ux-card--horizontal .ux-card__media {
        width: 100%;
      }
    }

    /* ========================================
       Card Grid
    ======================================== */

    .ux-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--ux-space-lg);
      padding: var(--ux-space-md);
    }

    .ux-card-grid .ux-card {
      margin: 0;
    }

    /* ========================================
       Card Stack
    ======================================== */

    .ux-card-stack {
      position: relative;
    }

    .ux-card-stack .ux-card {
      margin: 0;
    }

    .ux-card-stack .ux-card:not(:first-child) {
      margin-top: calc(-1 * var(--ux-space-lg));
      padding-top: calc(var(--ux-space-lg) + var(--ux-space-md));
      border-top-left-radius: var(--ux-border-radius-xl);
      border-top-right-radius: var(--ux-border-radius-xl);
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-card--loading {
      pointer-events: none;
    }

    .ux-card--loading::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       Disabled State
    ======================================== */

    .ux-card--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* ========================================
       Icon Card (component/feature card style)
    ======================================== */

    .ux-card--icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--ux-space-lg);
      text-decoration: none;
      cursor: pointer;
      transition:
        transform var(--ux-transition-fast) var(--ux-ease),
        box-shadow var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-card--icon:hover {
      transform: translateY(-2px);
      box-shadow: var(--ux-shadow-lg);
      border-color: var(--ux-primary);
    }

    .ux-card--icon:active {
      transform: translateY(0) scale(0.98);
    }

    .ux-card__icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--ux-space-md);
      color: var(--ux-primary);
      flex-shrink: 0;
    }

    .ux-card__icon svg {
      width: 100%;
      height: 100%;
    }

    .ux-card__name {
      font-weight: 500;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text);
    }

    .ux-card__description {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    /* Icon card sizes */
    .ux-card--icon.ux-card--sm {
      padding: var(--ux-space-md);
    }

    .ux-card--icon.ux-card--sm .ux-card__icon {
      width: 32px;
      height: 32px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-card--icon.ux-card--sm .ux-card__name {
      font-size: var(--ux-font-size-xs);
    }

    .ux-card--icon.ux-card--lg {
      padding: var(--ux-space-xl);
    }

    .ux-card--icon.ux-card--lg .ux-card__icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-lg);
    }

    .ux-card--icon.ux-card--lg .ux-card__name {
      font-size: var(--ux-font-size-md);
    }

    /* Icon card color variants (icon-only, not background) */
    .ux-card--icon.ux-card--icon-success .ux-card__icon {
      color: var(--ux-success);
    }

    .ux-card--icon.ux-card--icon-success:hover {
      border-color: var(--ux-success);
    }

    .ux-card--icon.ux-card--icon-warning .ux-card__icon {
      color: var(--ux-warning);
    }

    .ux-card--icon.ux-card--icon-warning:hover {
      border-color: var(--ux-warning);
    }

    .ux-card--icon.ux-card--icon-danger .ux-card__icon {
      color: var(--ux-danger);
    }

    .ux-card--icon.ux-card--icon-danger:hover {
      border-color: var(--ux-danger);
    }

    .ux-card--icon.ux-card--icon-secondary .ux-card__icon {
      color: var(--ux-secondary);
    }

    .ux-card--icon.ux-card--icon-secondary:hover {
      border-color: var(--ux-secondary);
    }

    .ux-card--icon.ux-card--icon-tertiary .ux-card__icon {
      color: var(--ux-tertiary);
    }

    .ux-card--icon.ux-card--icon-tertiary:hover {
      border-color: var(--ux-tertiary);
    }

    /* Icon card grid */
    .ux-card-grid--icon {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-card-grid--icon .ux-card {
      margin: 0;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-card-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-card-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for expandable card
  const cardComponent = (config = {}) => ({
    expanded: config.expanded || false,
    loading: config.loading || false,

    toggle() {
      this.expanded = !this.expanded;
    },

    expand() {
      this.expanded = true;
    },

    collapse() {
      this.expanded = false;
    },

    setLoading(state) {
      this.loading = state;
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxCard', cardComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxCard', cardComponent);
    });
  }
})();
