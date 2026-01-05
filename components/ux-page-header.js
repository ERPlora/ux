/**
 * UX Page Header Component
 * Header de página con título, subtítulo, búsqueda y acciones
 * Para usar dentro de ux-content como header fijo de página
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Page Layout
       Container for page-header + scrollable content
    ======================================== */

    .ux-page-layout {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      /* Ensure it fills flex container */
      flex: 1 1 auto;
    }

    /* Page layout with horizontal padding */
    .ux-page-layout--padded {
      padding-left: var(--ux-space-lg);
      padding-right: var(--ux-space-lg);
    }

    @media (min-width: 768px) {
      .ux-page-layout--padded {
        padding-left: var(--ux-space-xl);
        padding-right: var(--ux-space-xl);
      }
    }

    @media (min-width: 1024px) {
      .ux-page-layout--padded {
        padding-left: var(--ux-space-2xl);
        padding-right: var(--ux-space-2xl);
      }
    }

    /* ========================================
       UX Page Header
       Fixed header within a page (title + search + actions)
    ======================================== */

    .ux-page-header {
      flex-shrink: 0;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-page-header--transparent {
      background-color: transparent;
      border-bottom: none;
    }

    .ux-page-header--sticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* Title row */
    .ux-page-header__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
    }

    .ux-page-header__title h1,
    .ux-page-header__title .ux-page-header__heading {
      margin: 0;
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
      line-height: 1.3;
    }

    .ux-page-header__title h2 {
      margin: 0;
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-page-header__subtitle {
      margin: var(--ux-space-xs) 0 0 0;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    /* Actions container */
    .ux-page-header__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      flex-shrink: 0;
    }

    /* Search container */
    .ux-page-header__search {
      margin-top: var(--ux-space-md);
    }

    /* Filter/toolbar row below search */
    .ux-page-header__toolbar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-md);
      flex-wrap: wrap;
    }

    /* Breadcrumb */
    .ux-page-header__breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-bottom: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-page-header__breadcrumb a {
      color: var(--ux-primary);
      text-decoration: none;
    }

    .ux-page-header__breadcrumb a:hover {
      text-decoration: underline;
    }

    .ux-page-header__breadcrumb-separator {
      color: var(--ux-text-tertiary);
    }

    /* With back button */
    .ux-page-header--with-back .ux-page-header__title {
      align-items: center;
    }

    .ux-page-header__back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      margin-right: var(--ux-space-sm);
      margin-left: calc(var(--ux-space-sm) * -1);
      border-radius: var(--ux-border-radius);
      color: var(--ux-text-secondary);
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
      cursor: pointer;
    }

    .ux-page-header__back:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
    }

    .ux-page-header__back svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       UX Page Content
       Scrollable content area within page-layout
    ======================================== */

    .ux-page-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
      padding: var(--ux-space-xl);
    }

    .ux-page-content--sm {
      padding: var(--ux-space-md);
    }

    .ux-page-content--lg {
      padding: var(--ux-space-2xl);
    }

    .ux-page-content--no-padding {
      padding: 0;
    }

    .ux-page-content--flush {
      padding-left: 0;
      padding-right: 0;
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-page-header--sm {
      padding: var(--ux-space-md);
    }

    .ux-page-header--sm .ux-page-header__title h1 {
      font-size: var(--ux-font-size-lg);
    }

    .ux-page-header--lg {
      padding: var(--ux-space-xl);
    }

    .ux-page-header--lg .ux-page-header__title h1 {
      font-size: var(--ux-font-size-2xl);
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 640px) {
      .ux-page-header {
        padding: var(--ux-space-md);
      }

      .ux-page-header__title {
        flex-direction: column;
        align-items: stretch;
      }

      .ux-page-header__actions {
        margin-top: var(--ux-space-sm);
        justify-content: flex-end;
      }

      .ux-page-content {
        padding: var(--ux-space-md);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-page-header-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-page-header-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
