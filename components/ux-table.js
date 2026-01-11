(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Table - Basic table styles
       ========================================================================== */

    :root {
      --ux-table-border-color: var(--ux-border-color);
      --ux-table-header-bg: var(--ux-surface-secondary);
      --ux-table-header-color: var(--ux-text);
      --ux-table-cell-padding: var(--ux-space-sm) var(--ux-space-md);
      --ux-table-stripe-bg: var(--ux-surface-secondary);
      --ux-table-hover-bg: rgba(var(--ux-primary-rgb), 0.05);
      --ux-table-border-radius: var(--ux-radius-lg);
    }

    .ux-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--ux-font-size-md);
      background: var(--ux-surface);
    }

    .ux-table th,
    .ux-table td {
      padding: var(--ux-table-cell-padding);
      text-align: left;
      vertical-align: middle;
      border-bottom: 1px solid var(--ux-table-border-color);
    }

    .ux-table th {
      font-weight: 600;
      color: var(--ux-table-header-color);
      background: var(--ux-table-header-bg);
      white-space: nowrap;
    }

    .ux-table td {
      color: var(--ux-text);
    }

    .ux-table tbody tr:last-child td {
      border-bottom: none;
    }

    /* Rounded corners for wrapper */
    .ux-table-wrapper {
      border-radius: var(--ux-table-border-radius);
      overflow: hidden;
      border: 1px solid var(--ux-table-border-color);
    }

    .ux-table-wrapper .ux-table {
      margin: 0;
    }

    /* ==========================================================================
       Variants
       ========================================================================== */

    /* Striped rows */
    .ux-table--striped tbody tr:nth-child(even) {
      background: var(--ux-table-stripe-bg);
    }

    /* Hover effect */
    .ux-table--hover tbody tr {
      transition: background var(--ux-transition-fast);
    }

    .ux-table--hover tbody tr:hover {
      background: var(--ux-table-hover-bg);
    }

    /* Bordered */
    .ux-table--bordered th,
    .ux-table--bordered td {
      border: 1px solid var(--ux-table-border-color);
    }

    /* Compact */
    .ux-table--compact th,
    .ux-table--compact td {
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    /* Relaxed */
    .ux-table--relaxed th,
    .ux-table--relaxed td {
      padding: var(--ux-space-md) var(--ux-space-lg);
    }

    /* Fixed layout */
    .ux-table--fixed {
      table-layout: fixed;
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    .ux-table-responsive {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-table-responsive .ux-table {
      min-width: 600px;
    }

    /* ==========================================================================
       Cell alignment
       ========================================================================== */

    .ux-table th.text-center,
    .ux-table td.text-center {
      text-align: center;
    }

    .ux-table th.text-right,
    .ux-table td.text-right {
      text-align: right;
    }

    .ux-table th.text-nowrap,
    .ux-table td.text-nowrap {
      white-space: nowrap;
    }

    /* ==========================================================================
       Glass variant
       ========================================================================== */

    .ux-table--glass,
    .ux-table-wrapper--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
    }

    .ux-table--glass th {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-table-wrapper--glass {
      border-color: var(--ux-glass-border);
    }

    /* ==========================================================================
       Dark mode
       ========================================================================== */

    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        --ux-table-stripe-bg: rgba(255, 255, 255, 0.02);
        --ux-table-hover-bg: rgba(255, 255, 255, 0.05);
      }
    }

    .ux-dark {
      --ux-table-stripe-bg: rgba(255, 255, 255, 0.02);
      --ux-table-hover-bg: rgba(255, 255, 255, 0.05);
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-table-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-table-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
})();
