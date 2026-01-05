/**
 * UX Grid Component
 * Sistema de grid responsive estilo Ionic
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Grid
    ======================================== */

    .ux-grid {
      display: flex;
      flex-wrap: wrap;
      margin-left: calc(var(--ux-grid-gutter, var(--ux-space-md)) * -0.5);
      margin-right: calc(var(--ux-grid-gutter, var(--ux-space-md)) * -0.5);
      padding: var(--ux-grid-padding, 0);
    }

    .ux-grid--fixed {
      max-width: var(--ux-grid-max-width, 1200px);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--ux-space-lg);
      padding-right: var(--ux-space-lg);
    }

    /* ========================================
       UX Row
    ======================================== */

    .ux-row {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-left: calc(var(--ux-grid-gutter, var(--ux-space-md)) * -0.5);
      margin-right: calc(var(--ux-grid-gutter, var(--ux-space-md)) * -0.5);
    }

    /* Row Alignment */
    .ux-row--start {
      justify-content: flex-start;
    }

    .ux-row--center {
      justify-content: center;
    }

    .ux-row--end {
      justify-content: flex-end;
    }

    .ux-row--between {
      justify-content: space-between;
    }

    .ux-row--around {
      justify-content: space-around;
    }

    .ux-row--evenly {
      justify-content: space-evenly;
    }

    /* Row Vertical Alignment */
    .ux-row--top {
      align-items: flex-start;
    }

    .ux-row--middle {
      align-items: center;
    }

    .ux-row--bottom {
      align-items: flex-end;
    }

    .ux-row--stretch {
      align-items: stretch;
    }

    .ux-row--baseline {
      align-items: baseline;
    }

    /* Row Direction */
    .ux-row--reverse {
      flex-direction: row-reverse;
    }

    .ux-row--column {
      flex-direction: column;
    }

    .ux-row--column-reverse {
      flex-direction: column-reverse;
    }

    /* Row Wrap */
    .ux-row--nowrap {
      flex-wrap: nowrap;
    }

    .ux-row--wrap-reverse {
      flex-wrap: wrap-reverse;
    }

    /* ========================================
       UX Col
    ======================================== */

    .ux-col {
      flex: 1 0 0%;
      width: 100%;
      padding-left: calc(var(--ux-grid-gutter, var(--ux-space-md)) * 0.5);
      padding-right: calc(var(--ux-grid-gutter, var(--ux-space-md)) * 0.5);
      box-sizing: border-box;
    }

    .ux-col--auto {
      flex: 0 0 auto;
      width: auto;
    }

    /* Column Sizes (12 column grid) */
    .ux-col-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
    .ux-col-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
    .ux-col-3 { flex: 0 0 25%; max-width: 25%; }
    .ux-col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
    .ux-col-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
    .ux-col-6 { flex: 0 0 50%; max-width: 50%; }
    .ux-col-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
    .ux-col-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
    .ux-col-9 { flex: 0 0 75%; max-width: 75%; }
    .ux-col-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
    .ux-col-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
    .ux-col-12 { flex: 0 0 100%; max-width: 100%; }

    /* Column Offset */
    .ux-offset-1 { margin-left: 8.333333%; }
    .ux-offset-2 { margin-left: 16.666667%; }
    .ux-offset-3 { margin-left: 25%; }
    .ux-offset-4 { margin-left: 33.333333%; }
    .ux-offset-5 { margin-left: 41.666667%; }
    .ux-offset-6 { margin-left: 50%; }
    .ux-offset-7 { margin-left: 58.333333%; }
    .ux-offset-8 { margin-left: 66.666667%; }
    .ux-offset-9 { margin-left: 75%; }
    .ux-offset-10 { margin-left: 83.333333%; }
    .ux-offset-11 { margin-left: 91.666667%; }

    /* Column Self Alignment */
    .ux-col--start { align-self: flex-start; }
    .ux-col--center { align-self: center; }
    .ux-col--end { align-self: flex-end; }
    .ux-col--stretch { align-self: stretch; }

    /* Column Order */
    .ux-order-first { order: -1; }
    .ux-order-last { order: 13; }
    .ux-order-0 { order: 0; }
    .ux-order-1 { order: 1; }
    .ux-order-2 { order: 2; }
    .ux-order-3 { order: 3; }
    .ux-order-4 { order: 4; }
    .ux-order-5 { order: 5; }
    .ux-order-6 { order: 6; }

    /* ========================================
       Responsive Breakpoints
    ======================================== */

    /* Small (≥576px) */
    @media (min-width: 576px) {
      .ux-col-sm { flex: 1 0 0%; }
      .ux-col-sm-auto { flex: 0 0 auto; width: auto; }
      .ux-col-sm-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
      .ux-col-sm-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
      .ux-col-sm-3 { flex: 0 0 25%; max-width: 25%; }
      .ux-col-sm-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
      .ux-col-sm-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
      .ux-col-sm-6 { flex: 0 0 50%; max-width: 50%; }
      .ux-col-sm-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
      .ux-col-sm-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
      .ux-col-sm-9 { flex: 0 0 75%; max-width: 75%; }
      .ux-col-sm-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
      .ux-col-sm-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
      .ux-col-sm-12 { flex: 0 0 100%; max-width: 100%; }

      .ux-offset-sm-0 { margin-left: 0; }
      .ux-offset-sm-1 { margin-left: 8.333333%; }
      .ux-offset-sm-2 { margin-left: 16.666667%; }
      .ux-offset-sm-3 { margin-left: 25%; }
      .ux-offset-sm-4 { margin-left: 33.333333%; }
      .ux-offset-sm-5 { margin-left: 41.666667%; }
      .ux-offset-sm-6 { margin-left: 50%; }
    }

    /* Medium (≥768px) */
    @media (min-width: 768px) {
      .ux-col-md { flex: 1 0 0%; }
      .ux-col-md-auto { flex: 0 0 auto; width: auto; }
      .ux-col-md-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
      .ux-col-md-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
      .ux-col-md-3 { flex: 0 0 25%; max-width: 25%; }
      .ux-col-md-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
      .ux-col-md-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
      .ux-col-md-6 { flex: 0 0 50%; max-width: 50%; }
      .ux-col-md-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
      .ux-col-md-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
      .ux-col-md-9 { flex: 0 0 75%; max-width: 75%; }
      .ux-col-md-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
      .ux-col-md-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
      .ux-col-md-12 { flex: 0 0 100%; max-width: 100%; }

      .ux-offset-md-0 { margin-left: 0; }
      .ux-offset-md-1 { margin-left: 8.333333%; }
      .ux-offset-md-2 { margin-left: 16.666667%; }
      .ux-offset-md-3 { margin-left: 25%; }
      .ux-offset-md-4 { margin-left: 33.333333%; }
      .ux-offset-md-5 { margin-left: 41.666667%; }
      .ux-offset-md-6 { margin-left: 50%; }
    }

    /* Large (≥992px) */
    @media (min-width: 992px) {
      .ux-col-lg { flex: 1 0 0%; }
      .ux-col-lg-auto { flex: 0 0 auto; width: auto; }
      .ux-col-lg-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
      .ux-col-lg-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
      .ux-col-lg-3 { flex: 0 0 25%; max-width: 25%; }
      .ux-col-lg-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
      .ux-col-lg-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
      .ux-col-lg-6 { flex: 0 0 50%; max-width: 50%; }
      .ux-col-lg-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
      .ux-col-lg-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
      .ux-col-lg-9 { flex: 0 0 75%; max-width: 75%; }
      .ux-col-lg-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
      .ux-col-lg-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
      .ux-col-lg-12 { flex: 0 0 100%; max-width: 100%; }

      .ux-offset-lg-0 { margin-left: 0; }
      .ux-offset-lg-1 { margin-left: 8.333333%; }
      .ux-offset-lg-2 { margin-left: 16.666667%; }
      .ux-offset-lg-3 { margin-left: 25%; }
      .ux-offset-lg-4 { margin-left: 33.333333%; }
      .ux-offset-lg-5 { margin-left: 41.666667%; }
      .ux-offset-lg-6 { margin-left: 50%; }
    }

    /* Extra Large (≥1200px) */
    @media (min-width: 1200px) {
      .ux-col-xl { flex: 1 0 0%; }
      .ux-col-xl-auto { flex: 0 0 auto; width: auto; }
      .ux-col-xl-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
      .ux-col-xl-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
      .ux-col-xl-3 { flex: 0 0 25%; max-width: 25%; }
      .ux-col-xl-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
      .ux-col-xl-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
      .ux-col-xl-6 { flex: 0 0 50%; max-width: 50%; }
      .ux-col-xl-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
      .ux-col-xl-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
      .ux-col-xl-9 { flex: 0 0 75%; max-width: 75%; }
      .ux-col-xl-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
      .ux-col-xl-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
      .ux-col-xl-12 { flex: 0 0 100%; max-width: 100%; }

      .ux-offset-xl-0 { margin-left: 0; }
      .ux-offset-xl-1 { margin-left: 8.333333%; }
      .ux-offset-xl-2 { margin-left: 16.666667%; }
      .ux-offset-xl-3 { margin-left: 25%; }
      .ux-offset-xl-4 { margin-left: 33.333333%; }
      .ux-offset-xl-5 { margin-left: 41.666667%; }
      .ux-offset-xl-6 { margin-left: 50%; }
    }

    /* ========================================
       Responsive Display Utilities
    ======================================== */

    .ux-hide { display: none !important; }
    .ux-show { display: block !important; }
    .ux-show-flex { display: flex !important; }

    @media (max-width: 575.98px) {
      .ux-hide-xs { display: none !important; }
      .ux-show-xs { display: block !important; }
    }

    @media (min-width: 576px) and (max-width: 767.98px) {
      .ux-hide-sm { display: none !important; }
      .ux-show-sm { display: block !important; }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .ux-hide-md { display: none !important; }
      .ux-show-md { display: block !important; }
    }

    @media (min-width: 992px) and (max-width: 1199.98px) {
      .ux-hide-lg { display: none !important; }
      .ux-show-lg { display: block !important; }
    }

    @media (min-width: 1200px) {
      .ux-hide-xl { display: none !important; }
      .ux-show-xl { display: block !important; }
    }

    /* Mobile only */
    @media (min-width: 768px) {
      .ux-hide-tablet-up { display: none !important; }
    }

    @media (max-width: 767.98px) {
      .ux-hide-mobile { display: none !important; }
    }

    /* ========================================
       Gap Utilities
    ======================================== */

    .ux-gap-0 { --ux-grid-gutter: 0; }
    .ux-gap-xs { --ux-grid-gutter: var(--ux-space-xs); }
    .ux-gap-sm { --ux-grid-gutter: var(--ux-space-sm); }
    .ux-gap-md { --ux-grid-gutter: var(--ux-space-md); }
    .ux-gap-lg { --ux-grid-gutter: var(--ux-space-lg); }
    .ux-gap-xl { --ux-grid-gutter: var(--ux-space-xl); }
    .ux-gap-2xl { --ux-grid-gutter: var(--ux-space-2xl); }

    /* ========================================
       CSS Grid Alternative
    ======================================== */

    .ux-css-grid {
      display: grid;
      gap: var(--ux-grid-gutter, var(--ux-space-md));
    }

    .ux-css-grid--2 { grid-template-columns: repeat(2, 1fr); }
    .ux-css-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .ux-css-grid--4 { grid-template-columns: repeat(4, 1fr); }
    .ux-css-grid--6 { grid-template-columns: repeat(6, 1fr); }

    .ux-css-grid--auto-fit {
      grid-template-columns: repeat(auto-fit, minmax(var(--ux-grid-min-width, 200px), 1fr));
    }

    .ux-css-grid--auto-fill {
      grid-template-columns: repeat(auto-fill, minmax(var(--ux-grid-min-width, 200px), 1fr));
    }

    @media (max-width: 767.98px) {
      .ux-css-grid--2,
      .ux-css-grid--3,
      .ux-css-grid--4,
      .ux-css-grid--6 {
        grid-template-columns: 1fr;
      }

      .ux-css-grid--2-mobile {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .ux-css-grid--4,
      .ux-css-grid--6 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-grid-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-grid-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
