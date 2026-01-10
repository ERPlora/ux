/**
 * UX Quality Check Component
 * Quality check form for manufacturing with checklist items, measurements, photos, and signatures
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Quality Check - Base
    ======================================== */

    .ux-quality-check {
      display: flex;
      flex-direction: column;
      font-family: var(--ux-font-family);
      background: var(--ux-surface);
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
    }

    /* ========================================
       Header
    ======================================== */

    .ux-quality-check__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
    }

    .ux-quality-check__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-quality-check__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    .ux-quality-check__status {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-radius: var(--ux-radius-full);
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
    }

    .ux-quality-check__status--pending {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning-shade);
    }

    .ux-quality-check__status--pass {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success-shade);
    }

    .ux-quality-check__status--fail {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger-shade);
    }

    .ux-quality-check__status-icon {
      width: 16px;
      height: 16px;
    }

    /* ========================================
       Meta Info (Order, Timestamp, etc.)
    ======================================== */

    .ux-quality-check__meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-md) var(--ux-space-xl);
      padding: var(--ux-space-md) var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      font-size: var(--ux-font-size-sm);
    }

    .ux-quality-check__meta-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ux-quality-check__meta-label {
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ux-quality-check__meta-value {
      color: var(--ux-text);
      font-weight: 500;
    }

    /* ========================================
       Body / Content
    ======================================== */

    .ux-quality-check__body {
      padding: var(--ux-space-lg);
    }

    .ux-quality-check__section {
      margin-bottom: var(--ux-space-xl);
    }

    .ux-quality-check__section:last-child {
      margin-bottom: 0;
    }

    .ux-quality-check__section-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-md) 0;
      padding-bottom: var(--ux-space-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    /* ========================================
       Checklist Item
    ======================================== */

    .ux-quality-check__item {
      display: flex;
      flex-direction: column;
      padding: var(--ux-space-md);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      margin-bottom: var(--ux-space-sm);
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__item:last-child {
      margin-bottom: 0;
    }

    .ux-quality-check__item:hover {
      border-color: var(--ux-text-tertiary);
    }

    .ux-quality-check__item--pass {
      border-color: var(--ux-success);
      background: rgba(var(--ux-success-rgb), 0.02);
    }

    .ux-quality-check__item--fail {
      border-color: var(--ux-danger);
      background: rgba(var(--ux-danger-rgb), 0.02);
    }

    .ux-quality-check__item--na {
      border-color: var(--ux-border-color);
      background: var(--ux-surface-secondary);
      opacity: 0.7;
    }

    .ux-quality-check__item-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--ux-space-md);
    }

    .ux-quality-check__item-info {
      flex: 1;
      min-width: 0;
    }

    .ux-quality-check__item-name {
      font-size: var(--ux-font-size-md);
      font-weight: 500;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-quality-check__item-description {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: var(--ux-space-xs);
    }

    .ux-quality-check__item-required {
      color: var(--ux-danger);
      margin-left: 2px;
    }

    /* ========================================
       Pass/Fail/NA Selector
    ======================================== */

    .ux-quality-check__selector {
      display: flex;
      gap: var(--ux-space-xs);
      flex-shrink: 0;
    }

    .ux-quality-check__selector-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__selector-btn:hover {
      border-color: var(--ux-text-tertiary);
      color: var(--ux-text);
    }

    .ux-quality-check__selector-btn:active {
      transform: scale(0.95);
    }

    .ux-quality-check__selector-btn--pass.ux-quality-check__selector-btn--active {
      background: var(--ux-success);
      border-color: var(--ux-success);
      color: white;
    }

    .ux-quality-check__selector-btn--fail.ux-quality-check__selector-btn--active {
      background: var(--ux-danger);
      border-color: var(--ux-danger);
      color: white;
    }

    .ux-quality-check__selector-btn--na.ux-quality-check__selector-btn--active {
      background: var(--ux-medium);
      border-color: var(--ux-medium);
      color: white;
    }

    .ux-quality-check__selector-btn svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Measurement Input
    ======================================== */

    .ux-quality-check__measurement {
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__measurement-label {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-quality-check__measurement-row {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-quality-check__measurement-input {
      flex: 1;
      height: 40px;
      padding: 0 var(--ux-space-md);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-md);
      font-family: var(--ux-font-mono, monospace);
      color: var(--ux-text);
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__measurement-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-quality-check__measurement-input--error {
      border-color: var(--ux-danger);
      background: rgba(var(--ux-danger-rgb), 0.02);
    }

    .ux-quality-check__measurement-input--success {
      border-color: var(--ux-success);
      background: rgba(var(--ux-success-rgb), 0.02);
    }

    .ux-quality-check__measurement-unit {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      min-width: 40px;
    }

    .ux-quality-check__tolerance {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      margin-top: var(--ux-space-xs);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-quality-check__tolerance-range {
      font-family: var(--ux-font-mono, monospace);
    }

    .ux-quality-check__tolerance--in-range {
      color: var(--ux-success);
    }

    .ux-quality-check__tolerance--out-of-range {
      color: var(--ux-danger);
    }

    /* ========================================
       Photo Attachment
    ======================================== */

    .ux-quality-check__photos {
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__photos-label {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-quality-check__photos-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-sm);
    }

    .ux-quality-check__photo {
      position: relative;
      width: 72px;
      height: 72px;
      border-radius: var(--ux-radius-md);
      overflow: hidden;
      background: var(--ux-surface-secondary);
    }

    .ux-quality-check__photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-quality-check__photo-remove {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__photo:hover .ux-quality-check__photo-remove {
      opacity: 1;
    }

    .ux-quality-check__photo-remove svg {
      width: 12px;
      height: 12px;
    }

    .ux-quality-check__photo-add {
      width: 72px;
      height: 72px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: transparent;
      color: var(--ux-text-tertiary);
      cursor: pointer;
      transition:
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__photo-add:hover {
      border-color: var(--ux-primary);
      color: var(--ux-primary);
    }

    .ux-quality-check__photo-add svg {
      width: 24px;
      height: 24px;
    }

    .ux-quality-check__photo-add span {
      font-size: var(--ux-font-size-xs);
    }

    .ux-quality-check__photo-input {
      display: none;
    }

    /* ========================================
       Notes / Comments
    ======================================== */

    .ux-quality-check__notes {
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__notes-label {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-quality-check__notes-input {
      width: 100%;
      min-height: 60px;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      font-family: var(--ux-font-family);
      color: var(--ux-text);
      resize: vertical;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__notes-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-quality-check__notes-input::placeholder {
      color: var(--ux-text-tertiary);
    }

    /* ========================================
       Defect Category
    ======================================== */

    .ux-quality-check__defect {
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__defect-label {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-quality-check__defect-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-xs);
    }

    .ux-quality-check__defect-tag {
      display: inline-flex;
      align-items: center;
      padding: var(--ux-space-xs) var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-full);
      background: var(--ux-surface);
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__defect-tag:hover {
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    .ux-quality-check__defect-tag--active {
      background: rgba(var(--ux-danger-rgb), 0.1);
      border-color: var(--ux-danger);
      color: var(--ux-danger);
    }

    /* ========================================
       Summary Section
    ======================================== */

    .ux-quality-check__summary {
      padding: var(--ux-space-lg);
      background: var(--ux-surface-secondary);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__summary-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-md) 0;
    }

    .ux-quality-check__summary-stats {
      display: flex;
      flex-wrap: wrap;
      gap: var(--ux-space-lg);
      margin-bottom: var(--ux-space-lg);
    }

    .ux-quality-check__summary-stat {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-quality-check__summary-stat-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ux-radius-md);
    }

    .ux-quality-check__summary-stat-icon--pass {
      background: rgba(var(--ux-success-rgb), 0.15);
      color: var(--ux-success);
    }

    .ux-quality-check__summary-stat-icon--fail {
      background: rgba(var(--ux-danger-rgb), 0.15);
      color: var(--ux-danger);
    }

    .ux-quality-check__summary-stat-icon--na {
      background: rgba(var(--ux-medium-rgb), 0.15);
      color: var(--ux-medium);
    }

    .ux-quality-check__summary-stat-icon--pending {
      background: rgba(var(--ux-warning-rgb), 0.15);
      color: var(--ux-warning);
    }

    .ux-quality-check__summary-stat-icon svg {
      width: 18px;
      height: 18px;
    }

    .ux-quality-check__summary-stat-value {
      font-size: var(--ux-font-size-xl);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-quality-check__summary-stat-label {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-quality-check__progress {
      height: 8px;
      background: var(--ux-border-color);
      border-radius: var(--ux-radius-full);
      overflow: hidden;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-quality-check__progress-bar {
      height: 100%;
      display: flex;
      transition: width var(--ux-transition-normal) var(--ux-ease);
    }

    .ux-quality-check__progress-pass {
      background: var(--ux-success);
    }

    .ux-quality-check__progress-fail {
      background: var(--ux-danger);
    }

    .ux-quality-check__progress-na {
      background: var(--ux-medium);
    }

    .ux-quality-check__progress-text {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      text-align: center;
    }

    /* ========================================
       Signature Section
    ======================================== */

    .ux-quality-check__signature {
      padding: var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-quality-check__signature-title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0 0 var(--ux-space-md) 0;
    }

    .ux-quality-check__signature-row {
      display: flex;
      gap: var(--ux-space-lg);
    }

    @media (max-width: 767px) {
      .ux-quality-check__signature-row {
        flex-direction: column;
      }
    }

    .ux-quality-check__signature-field {
      flex: 1;
    }

    .ux-quality-check__signature-label {
      display: block;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-quality-check__signature-pad {
      height: 120px;
      border: 2px dashed var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      background: var(--ux-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: crosshair;
      transition: border-color var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-quality-check__signature-pad:hover {
      border-color: var(--ux-primary);
    }

    .ux-quality-check__signature-pad--signed {
      border-style: solid;
      border-color: var(--ux-success);
    }

    .ux-quality-check__signature-placeholder {
      color: var(--ux-text-tertiary);
      font-size: var(--ux-font-size-sm);
    }

    .ux-quality-check__timestamp {
      margin-top: var(--ux-space-md);
      padding: var(--ux-space-sm) var(--ux-space-md);
      background: var(--ux-surface-secondary);
      border-radius: var(--ux-radius-md);
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
    }

    .ux-quality-check__timestamp-label {
      color: var(--ux-text-tertiary);
      margin-right: var(--ux-space-sm);
    }

    /* ========================================
       Footer / Actions
    ======================================== */

    .ux-quality-check__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ux-space-md);
      padding: var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
    }

    @media (max-width: 767px) {
      .ux-quality-check__footer {
        flex-direction: column;
      }
    }

    .ux-quality-check__actions {
      display: flex;
      gap: var(--ux-space-sm);
    }

    @media (max-width: 767px) {
      .ux-quality-check__actions {
        width: 100%;
        flex-direction: column;
      }

      .ux-quality-check__actions .ux-button {
        width: 100%;
      }
    }

    /* ========================================
       Print Styles
    ======================================== */

    @media print {
      .ux-quality-check {
        background: white;
        border: none;
        box-shadow: none;
      }

      .ux-quality-check__header {
        background: white;
        border-bottom: 2px solid #000;
      }

      .ux-quality-check__meta {
        background: #f5f5f5;
      }

      .ux-quality-check__item {
        break-inside: avoid;
        border: 1px solid #ccc;
      }

      .ux-quality-check__photo-add,
      .ux-quality-check__photo-remove,
      .ux-quality-check__footer .ux-button--outline {
        display: none;
      }

      .ux-quality-check__selector-btn {
        border: 2px solid #000;
      }

      .ux-quality-check__selector-btn--pass.ux-quality-check__selector-btn--active {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .ux-quality-check__selector-btn--fail.ux-quality-check__selector-btn--active {
        background: #ffebee;
        color: #c62828;
      }

      .ux-quality-check__summary {
        background: #f5f5f5;
        page-break-before: auto;
      }

      .ux-quality-check__signature {
        page-break-inside: avoid;
      }
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-quality-check--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
    }

    .ux-quality-check--glass .ux-quality-check__header,
    .ux-quality-check--glass .ux-quality-check__footer {
      background: transparent;
      border-color: var(--ux-glass-border);
    }

    .ux-quality-check--glass .ux-quality-check__meta,
    .ux-quality-check--glass .ux-quality-check__summary {
      background: var(--ux-glass-bg-thin);
    }

    .ux-quality-check--glass .ux-quality-check__item {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-quality-check--glass .ux-quality-check__measurement-input,
    .ux-quality-check--glass .ux-quality-check__notes-input {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-quality-check {
        background: var(--ux-surface);
      }

      .ux-quality-check__measurement-input,
      .ux-quality-check__notes-input {
        background: var(--ux-surface-secondary);
      }
    }

    .ux-dark .ux-quality-check {
      background: var(--ux-surface);
    }

    .ux-dark .ux-quality-check__measurement-input,
    .ux-dark .ux-quality-check__notes-input {
      background: var(--ux-surface-secondary);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-quality-check__item,
      .ux-quality-check__selector-btn,
      .ux-quality-check__measurement-input,
      .ux-quality-check__notes-input,
      .ux-quality-check__defect-tag,
      .ux-quality-check__progress-bar {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-quality-check-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-quality-check-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'
  };

  // Defect categories
  const defaultDefectCategories = [
    'Scratches',
    'Dents',
    'Discoloration',
    'Missing Parts',
    'Misalignment',
    'Surface Defect',
    'Dimensional',
    'Functional',
    'Contamination',
    'Other'
  ];

  // Alpine.js component
  const qualityCheckData = (options = {}) => ({
    // Configuration
    title: options.title || 'Quality Check',
    subtitle: options.subtitle || '',
    orderNumber: options.orderNumber || '',
    productName: options.productName || '',
    batchNumber: options.batchNumber || '',
    inspector: options.inspector || '',
    defectCategories: options.defectCategories || defaultDefectCategories,

    // State
    items: options.items || [],
    startedAt: options.startedAt || null,
    completedAt: options.completedAt || null,
    inspectorSignature: options.inspectorSignature || null,
    supervisorSignature: options.supervisorSignature || null,

    // Icons
    icons,

    init() {
      // Initialize items if provided
      if (this.items.length === 0 && options.checklistItems) {
        this.items = options.checklistItems.map((item, index) => ({
          id: item.id || `item-${index}`,
          name: item.name,
          description: item.description || '',
          required: item.required !== false,
          status: item.status || null, // null, 'pass', 'fail', 'na'
          measurement: item.hasMeasurement ? {
            value: item.measurementValue || '',
            unit: item.measurementUnit || '',
            min: item.measurementMin,
            max: item.measurementMax,
            target: item.measurementTarget
          } : null,
          photos: item.photos || [],
          notes: item.notes || '',
          defects: item.defects || []
        }));
      }

      // Set start time if not set
      if (!this.startedAt) {
        this.startedAt = new Date().toISOString();
      }
    },

    // Set item status
    setStatus(itemId, status) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.status = item.status === status ? null : status;
        this.$dispatch('qualitycheck:statuschange', { itemId, status: item.status });
      }
    },

    // Update measurement
    updateMeasurement(itemId, value) {
      const item = this.items.find(i => i.id === itemId);
      if (item && item.measurement) {
        item.measurement.value = value;

        // Auto-set status based on tolerance
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && item.measurement.min !== undefined && item.measurement.max !== undefined) {
          if (numValue >= item.measurement.min && numValue <= item.measurement.max) {
            item.status = 'pass';
          } else {
            item.status = 'fail';
          }
        }

        this.$dispatch('qualitycheck:measurementchange', { itemId, value, status: item.status });
      }
    },

    // Check if measurement is in range
    isInRange(item) {
      if (!item.measurement || item.measurement.value === '') return null;
      const value = parseFloat(item.measurement.value);
      if (isNaN(value)) return null;
      return value >= item.measurement.min && value <= item.measurement.max;
    },

    // Add photo
    addPhoto(itemId, file) {
      const item = this.items.find(i => i.id === itemId);
      if (item && file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          item.photos.push({
            id: `photo-${Date.now()}`,
            data: e.target.result,
            name: file.name,
            timestamp: new Date().toISOString()
          });
          this.$dispatch('qualitycheck:photochange', { itemId, photos: item.photos });
        };
        reader.readAsDataURL(file);
      }
    },

    // Remove photo
    removePhoto(itemId, photoId) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.photos = item.photos.filter(p => p.id !== photoId);
        this.$dispatch('qualitycheck:photochange', { itemId, photos: item.photos });
      }
    },

    // Update notes
    updateNotes(itemId, notes) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.notes = notes;
      }
    },

    // Toggle defect category
    toggleDefect(itemId, defect) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        const index = item.defects.indexOf(defect);
        if (index === -1) {
          item.defects.push(defect);
        } else {
          item.defects.splice(index, 1);
        }
        this.$dispatch('qualitycheck:defectchange', { itemId, defects: item.defects });
      }
    },

    // Summary getters
    get passCount() {
      return this.items.filter(i => i.status === 'pass').length;
    },

    get failCount() {
      return this.items.filter(i => i.status === 'fail').length;
    },

    get naCount() {
      return this.items.filter(i => i.status === 'na').length;
    },

    get pendingCount() {
      return this.items.filter(i => i.status === null).length;
    },

    get totalCount() {
      return this.items.length;
    },

    get completionPercent() {
      if (this.totalCount === 0) return 0;
      return Math.round(((this.totalCount - this.pendingCount) / this.totalCount) * 100);
    },

    get passPercent() {
      const completed = this.totalCount - this.pendingCount - this.naCount;
      if (completed === 0) return 0;
      return Math.round((this.passCount / completed) * 100);
    },

    get overallStatus() {
      if (this.pendingCount > 0) return 'pending';
      if (this.failCount > 0) return 'fail';
      return 'pass';
    },

    get isComplete() {
      const requiredItems = this.items.filter(i => i.required);
      return requiredItems.every(i => i.status !== null);
    },

    // Format timestamp
    formatTimestamp(isoString) {
      if (!isoString) return '';
      const date = new Date(isoString);
      return date.toLocaleString();
    },

    // Complete inspection
    complete() {
      if (!this.isComplete) {
        this.$dispatch('qualitycheck:incomplete', { pendingItems: this.items.filter(i => i.required && i.status === null) });
        return false;
      }

      this.completedAt = new Date().toISOString();
      this.$dispatch('qualitycheck:complete', {
        status: this.overallStatus,
        passCount: this.passCount,
        failCount: this.failCount,
        naCount: this.naCount,
        completedAt: this.completedAt
      });
      return true;
    },

    // Print form
    print() {
      window.print();
    },

    // Export data
    getData() {
      return {
        title: this.title,
        orderNumber: this.orderNumber,
        productName: this.productName,
        batchNumber: this.batchNumber,
        inspector: this.inspector,
        items: this.items,
        summary: {
          passCount: this.passCount,
          failCount: this.failCount,
          naCount: this.naCount,
          pendingCount: this.pendingCount,
          overallStatus: this.overallStatus
        },
        startedAt: this.startedAt,
        completedAt: this.completedAt,
        inspectorSignature: this.inspectorSignature,
        supervisorSignature: this.supervisorSignature
      };
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxQualityCheck', qualityCheckData);
  }

})();
