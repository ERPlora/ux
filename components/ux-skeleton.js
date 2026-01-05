/**
 * UX Skeleton Component
 * Placeholders de carga estilo iOS
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Skeleton Variables
    ======================================== */

    :root {
      --ux-skeleton-bg: rgba(0, 0, 0, 0.08);
      --ux-skeleton-shimmer: rgba(255, 255, 255, 0.4);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --ux-skeleton-bg: rgba(255, 255, 255, 0.1);
        --ux-skeleton-shimmer: rgba(255, 255, 255, 0.15);
      }
    }

    .ux-dark {
      --ux-skeleton-bg: rgba(255, 255, 255, 0.1);
      --ux-skeleton-shimmer: rgba(255, 255, 255, 0.15);
    }

    /* ========================================
       UX Skeleton Base
    ======================================== */

    .ux-skeleton {
      position: relative;
      display: block;
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius-sm);
      overflow: hidden;
    }

    /* Shimmer animation */
    .ux-skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ux-skeleton-shimmer) 50%,
        transparent 100%
      );
      transform: translateX(-100%);
      animation: ux-skeleton-shimmer 1.5s infinite;
    }

    @keyframes ux-skeleton-shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Disable animation */
    .ux-skeleton--no-animation::after {
      display: none;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .ux-skeleton::after {
        animation: none;
      }

      .ux-skeleton--pulse {
        animation: none;
      }
    }

    /* Pulse animation alternative */
    .ux-skeleton--pulse {
      animation: ux-skeleton-pulse 1.5s ease-in-out infinite;
    }

    .ux-skeleton--pulse::after {
      display: none;
    }

    @keyframes ux-skeleton-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* ========================================
       Skeleton Shapes
    ======================================== */

    .ux-skeleton--text {
      height: 16px;
      border-radius: 4px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-skeleton--text:last-child {
      width: 70%;
    }

    .ux-skeleton--title {
      height: 24px;
      border-radius: 4px;
      margin-bottom: var(--ux-space-md);
    }

    .ux-skeleton--circle {
      border-radius: 50%;
    }

    .ux-skeleton--rect {
      border-radius: var(--ux-border-radius);
    }

    .ux-skeleton--rounded {
      border-radius: var(--ux-border-radius-lg);
    }

    /* ========================================
       Skeleton Sizes
    ======================================== */

    .ux-skeleton--xs {
      height: 8px;
    }

    .ux-skeleton--sm {
      height: 12px;
    }

    .ux-skeleton--md {
      height: 16px;
    }

    .ux-skeleton--lg {
      height: 24px;
    }

    .ux-skeleton--xl {
      height: 32px;
    }

    /* Avatar sizes */
    .ux-skeleton--avatar-xs {
      width: 24px;
      height: 24px;
    }

    .ux-skeleton--avatar-sm {
      width: 32px;
      height: 32px;
    }

    .ux-skeleton--avatar {
      width: 40px;
      height: 40px;
    }

    .ux-skeleton--avatar-md {
      width: 48px;
      height: 48px;
    }

    .ux-skeleton--avatar-lg {
      width: 64px;
      height: 64px;
    }

    .ux-skeleton--avatar-xl {
      width: 96px;
      height: 96px;
    }

    /* ========================================
       Pre-made Skeleton Patterns
    ======================================== */

    /* List Item Skeleton */
    .ux-skeleton-item {
      display: flex;
      align-items: center;
      padding: var(--ux-space-md) var(--ux-space-lg);
      gap: var(--ux-space-md);
    }

    .ux-skeleton-item__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--ux-skeleton-bg);
      flex-shrink: 0;
    }

    .ux-skeleton-item__content {
      flex: 1;
      min-width: 0;
    }

    .ux-skeleton-item__line {
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-skeleton-item__line:last-child {
      width: 60%;
      margin-bottom: 0;
    }

    /* Card Skeleton */
    .ux-skeleton-card {
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      overflow: hidden;
    }

    .ux-skeleton-card__image {
      width: 100%;
      height: 200px;
      background-color: var(--ux-skeleton-bg);
    }

    .ux-skeleton-card__content {
      padding: var(--ux-space-lg);
    }

    .ux-skeleton-card__title {
      height: 20px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-md);
    }

    .ux-skeleton-card__text {
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-skeleton-card__text:last-child {
      width: 70%;
    }

    /* Profile Skeleton */
    .ux-skeleton-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--ux-space-xl);
      gap: var(--ux-space-md);
    }

    .ux-skeleton-profile__avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: var(--ux-skeleton-bg);
    }

    .ux-skeleton-profile__name {
      width: 120px;
      height: 20px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
    }

    .ux-skeleton-profile__bio {
      width: 180px;
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
    }

    /* Post Skeleton (Social Media style) */
    .ux-skeleton-post {
      padding: var(--ux-space-lg);
    }

    .ux-skeleton-post__header {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      margin-bottom: var(--ux-space-lg);
    }

    .ux-skeleton-post__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--ux-skeleton-bg);
    }

    .ux-skeleton-post__meta {
      flex: 1;
    }

    .ux-skeleton-post__name {
      width: 100px;
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-skeleton-post__date {
      width: 60px;
      height: 12px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
    }

    .ux-skeleton-post__image {
      width: 100%;
      height: 300px;
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius);
      margin-bottom: var(--ux-space-md);
    }

    .ux-skeleton-post__text {
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-sm);
    }

    /* Table Skeleton */
    .ux-skeleton-table {
      width: 100%;
    }

    .ux-skeleton-table__row {
      display: flex;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-skeleton-table__cell {
      flex: 1;
      height: 16px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
    }

    /* Form Skeleton */
    .ux-skeleton-form {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-lg);
    }

    .ux-skeleton-form__field {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-skeleton-form__label {
      width: 80px;
      height: 12px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
    }

    .ux-skeleton-form__input {
      height: 44px;
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius);
    }

    .ux-skeleton-form__button {
      height: 44px;
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius);
      margin-top: var(--ux-space-md);
    }

    /* Chat Skeleton */
    .ux-skeleton-chat {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md);
    }

    .ux-skeleton-chat__message {
      display: flex;
      gap: var(--ux-space-sm);
      max-width: 80%;
    }

    .ux-skeleton-chat__message--sent {
      margin-left: auto;
      flex-direction: row-reverse;
    }

    .ux-skeleton-chat__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--ux-skeleton-bg);
      flex-shrink: 0;
    }

    .ux-skeleton-chat__bubble {
      padding: var(--ux-space-md);
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius-lg);
      min-width: 100px;
    }

    .ux-skeleton-chat__text {
      height: 14px;
      background-color: var(--ux-skeleton-bg);
      border-radius: 4px;
      margin-bottom: var(--ux-space-xs);
    }

    .ux-skeleton-chat__text:last-child {
      width: 70%;
      margin-bottom: 0;
    }

    /* ========================================
       Grid Skeleton
    ======================================== */

    .ux-skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--ux-space-md);
    }

    .ux-skeleton-grid__item {
      aspect-ratio: 1;
      background-color: var(--ux-skeleton-bg);
      border-radius: var(--ux-border-radius);
    }

    /* ========================================
       Skeleton Container
    ======================================== */

    .ux-skeleton-container {
      position: relative;
    }

    /* Fade out when content loads */
    .ux-skeleton-container--loaded .ux-skeleton,
    .ux-skeleton-container--loaded .ux-skeleton-item,
    .ux-skeleton-container--loaded .ux-skeleton-card,
    .ux-skeleton-container--loaded [class^="ux-skeleton-"] {
      opacity: 0;
      transition: opacity var(--ux-transition-base) var(--ux-ease);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-skeleton-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-skeleton-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for skeleton loading state
  // ARIA: aria-busy indicates loading state, role="status" for live region
  const skeletonComponent = (config = {}) => ({
    loading: config.loading !== false,
    ariaLabel: config.ariaLabel || 'Loading content',

    // ARIA attributes for the skeleton container
    get ariaAttrs() {
      return {
        'aria-busy': this.loading ? 'true' : 'false',
        'aria-live': 'polite',
        'aria-label': this.ariaLabel
      };
    },

    setLoading(state) {
      this.loading = state;
      // Announce state change to screen readers
      if (!state && window.UX && window.UX.announce) {
        window.UX.announce('Content loaded', 'polite');
      }
    },

    loaded() {
      this.setLoading(false);
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxSkeleton', skeletonComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxSkeleton', skeletonComponent);
    });
  }
})();
