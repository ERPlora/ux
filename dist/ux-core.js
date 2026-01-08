/**
 * UX Core - Variables CSS + Reset
 * Base requerida para todos los componentes UX
 * @version 1.0.0
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX CORE - CSS Variables & Reset
       Colores basados en Ionic Framework
    ======================================== */

    :root {
      /* ========================================
         LAYER 1: Color Primitives (Internal)
         These are the raw color values.
         Plugins should NOT use these directly.
      ======================================== */

      /* Gray Scale */
      --ux-gray-50: #f9fafb;
      --ux-gray-100: #f3f4f6;
      --ux-gray-200: #e5e7eb;
      --ux-gray-300: #d1d5db;
      --ux-gray-400: #9ca3af;
      --ux-gray-500: #6b7280;
      --ux-gray-600: #4b5563;
      --ux-gray-700: #374151;
      --ux-gray-800: #1f2937;
      --ux-gray-900: #111827;
      --ux-gray-950: #030712;

      /* Blue */
      --ux-blue-50: #eff6ff;
      --ux-blue-100: #dbeafe;
      --ux-blue-200: #bfdbfe;
      --ux-blue-300: #93c5fd;
      --ux-blue-400: #60a5fa;
      --ux-blue-500: #3b82f6;
      --ux-blue-600: #2563eb;
      --ux-blue-700: #1d4ed8;
      --ux-blue-800: #1e40af;
      --ux-blue-900: #1e3a8a;

      /* Sky / Primary */
      --ux-sky-50: #f0f9ff;
      --ux-sky-100: #e0f2fe;
      --ux-sky-200: #bae6fd;
      --ux-sky-300: #7dd3fc;
      --ux-sky-400: #38bdf8;
      --ux-sky-500: #0ea5e9;
      --ux-sky-600: #0284c7;
      --ux-sky-700: #0369a1;
      --ux-sky-800: #075985;
      --ux-sky-900: #0c4a6e;

      /* Cyan / Secondary */
      --ux-cyan-50: #ecfeff;
      --ux-cyan-100: #cffafe;
      --ux-cyan-200: #a5f3fc;
      --ux-cyan-300: #67e8f9;
      --ux-cyan-400: #22d3ee;
      --ux-cyan-500: #06b6d4;
      --ux-cyan-600: #0891b2;
      --ux-cyan-700: #0e7490;
      --ux-cyan-800: #155e75;
      --ux-cyan-900: #164e63;

      /* Indigo / Tertiary */
      --ux-indigo-50: #eef2ff;
      --ux-indigo-100: #e0e7ff;
      --ux-indigo-200: #c7d2fe;
      --ux-indigo-300: #a5b4fc;
      --ux-indigo-400: #818cf8;
      --ux-indigo-500: #6366f1;
      --ux-indigo-600: #4f46e5;
      --ux-indigo-700: #4338ca;
      --ux-indigo-800: #3730a3;
      --ux-indigo-900: #312e81;

      /* Green / Success */
      --ux-green-50: #f0fdf4;
      --ux-green-100: #dcfce7;
      --ux-green-200: #bbf7d0;
      --ux-green-300: #86efac;
      --ux-green-400: #4ade80;
      --ux-green-500: #22c55e;
      --ux-green-600: #16a34a;
      --ux-green-700: #15803d;
      --ux-green-800: #166534;
      --ux-green-900: #14532d;

      /* Yellow / Warning */
      --ux-yellow-50: #fefce8;
      --ux-yellow-100: #fef9c3;
      --ux-yellow-200: #fef08a;
      --ux-yellow-300: #fde047;
      --ux-yellow-400: #facc15;
      --ux-yellow-500: #eab308;
      --ux-yellow-600: #ca8a04;
      --ux-yellow-700: #a16207;
      --ux-yellow-800: #854d0e;
      --ux-yellow-900: #713f12;

      /* Amber (alternative warning) */
      --ux-amber-50: #fffbeb;
      --ux-amber-100: #fef3c7;
      --ux-amber-200: #fde68a;
      --ux-amber-300: #fcd34d;
      --ux-amber-400: #fbbf24;
      --ux-amber-500: #f59e0b;
      --ux-amber-600: #d97706;
      --ux-amber-700: #b45309;
      --ux-amber-800: #92400e;
      --ux-amber-900: #78350f;

      /* Red / Danger */
      --ux-red-50: #fef2f2;
      --ux-red-100: #fee2e2;
      --ux-red-200: #fecaca;
      --ux-red-300: #fca5a5;
      --ux-red-400: #f87171;
      --ux-red-500: #ef4444;
      --ux-red-600: #dc2626;
      --ux-red-700: #b91c1c;
      --ux-red-800: #991b1b;
      --ux-red-900: #7f1d1d;

      /* Orange */
      --ux-orange-50: #fff7ed;
      --ux-orange-100: #ffedd5;
      --ux-orange-200: #fed7aa;
      --ux-orange-300: #fdba74;
      --ux-orange-400: #fb923c;
      --ux-orange-500: #f97316;
      --ux-orange-600: #ea580c;
      --ux-orange-700: #c2410c;
      --ux-orange-800: #9a3412;
      --ux-orange-900: #7c2d12;

      /* Rose / Pink */
      --ux-rose-50: #fff1f2;
      --ux-rose-100: #ffe4e6;
      --ux-rose-200: #fecdd3;
      --ux-rose-300: #fda4af;
      --ux-rose-400: #fb7185;
      --ux-rose-500: #f43f5e;
      --ux-rose-600: #e11d48;
      --ux-rose-700: #be123c;
      --ux-rose-800: #9f1239;
      --ux-rose-900: #881337;

      /* Purple */
      --ux-purple-50: #faf5ff;
      --ux-purple-100: #f3e8ff;
      --ux-purple-200: #e9d5ff;
      --ux-purple-300: #d8b4fe;
      --ux-purple-400: #c084fc;
      --ux-purple-500: #a855f7;
      --ux-purple-600: #9333ea;
      --ux-purple-700: #7e22ce;
      --ux-purple-800: #6b21a8;
      --ux-purple-900: #581c87;

      /* Violet */
      --ux-violet-50: #f5f3ff;
      --ux-violet-100: #ede9fe;
      --ux-violet-200: #ddd6fe;
      --ux-violet-300: #c4b5fd;
      --ux-violet-400: #a78bfa;
      --ux-violet-500: #8b5cf6;
      --ux-violet-600: #7c3aed;
      --ux-violet-700: #6d28d9;
      --ux-violet-800: #5b21b6;
      --ux-violet-900: #4c1d95;

      /* Teal */
      --ux-teal-50: #f0fdfa;
      --ux-teal-100: #ccfbf1;
      --ux-teal-200: #99f6e4;
      --ux-teal-300: #5eead4;
      --ux-teal-400: #2dd4bf;
      --ux-teal-500: #14b8a6;
      --ux-teal-600: #0d9488;
      --ux-teal-700: #0f766e;
      --ux-teal-800: #115e59;
      --ux-teal-900: #134e4a;

      /* Emerald */
      --ux-emerald-50: #ecfdf5;
      --ux-emerald-100: #d1fae5;
      --ux-emerald-200: #a7f3d0;
      --ux-emerald-300: #6ee7b7;
      --ux-emerald-400: #34d399;
      --ux-emerald-500: #10b981;
      --ux-emerald-600: #059669;
      --ux-emerald-700: #047857;
      --ux-emerald-800: #065f46;
      --ux-emerald-900: #064e3b;

      /* Slate */
      --ux-slate-50: #f8fafc;
      --ux-slate-100: #f1f5f9;
      --ux-slate-200: #e2e8f0;
      --ux-slate-300: #cbd5e1;
      --ux-slate-400: #94a3b8;
      --ux-slate-500: #64748b;
      --ux-slate-600: #475569;
      --ux-slate-700: #334155;
      --ux-slate-800: #1e293b;
      --ux-slate-900: #0f172a;

      /* ========================================
         LAYER 2: Semantic Tokens
         These are what plugins/components use.
         They reference the primitives above.
      ======================================== */

      /* Primary - Sky Blue */
      --ux-primary: var(--ux-sky-500);
      --ux-primary-rgb: 14, 165, 233;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-sky-600);
      --ux-primary-tint: var(--ux-sky-400);

      /* Secondary - Cyan */
      --ux-secondary: var(--ux-cyan-400);
      --ux-secondary-rgb: 34, 211, 238;
      --ux-secondary-contrast: #ffffff;
      --ux-secondary-shade: var(--ux-cyan-600);
      --ux-secondary-tint: var(--ux-cyan-300);

      /* Tertiary - Indigo */
      --ux-tertiary: var(--ux-indigo-500);
      --ux-tertiary-rgb: 99, 102, 241;
      --ux-tertiary-contrast: #ffffff;
      --ux-tertiary-shade: var(--ux-indigo-600);
      --ux-tertiary-tint: var(--ux-indigo-400);

      /* Success - Green */
      --ux-success: var(--ux-green-500);
      --ux-success-rgb: 34, 197, 94;
      --ux-success-contrast: #ffffff;
      --ux-success-shade: var(--ux-green-600);
      --ux-success-tint: var(--ux-green-400);

      /* Warning - Amber */
      --ux-warning: var(--ux-amber-500);
      --ux-warning-rgb: 245, 158, 11;
      --ux-warning-contrast: #000000;
      --ux-warning-shade: var(--ux-amber-600);
      --ux-warning-tint: var(--ux-amber-400);

      /* Danger - Red */
      --ux-danger: var(--ux-red-500);
      --ux-danger-rgb: 239, 68, 68;
      --ux-danger-contrast: #ffffff;
      --ux-danger-shade: var(--ux-red-600);
      --ux-danger-tint: var(--ux-red-400);

      /* Info - Blue */
      --ux-info: var(--ux-blue-500);
      --ux-info-rgb: 59, 130, 246;
      --ux-info-contrast: #ffffff;
      --ux-info-shade: var(--ux-blue-600);
      --ux-info-tint: var(--ux-blue-400);

      /* Dark */
      --ux-dark: var(--ux-gray-900);
      --ux-dark-rgb: 17, 24, 39;
      --ux-dark-contrast: #ffffff;
      --ux-dark-shade: var(--ux-gray-950);
      --ux-dark-tint: var(--ux-gray-800);

      /* Medium */
      --ux-medium: var(--ux-gray-500);
      --ux-medium-rgb: 107, 114, 128;
      --ux-medium-contrast: #ffffff;
      --ux-medium-shade: var(--ux-gray-600);
      --ux-medium-tint: var(--ux-gray-400);

      /* Light */
      --ux-light: var(--ux-gray-100);
      --ux-light-rgb: 243, 244, 246;
      --ux-light-contrast: #000000;
      --ux-light-shade: var(--ux-gray-200);
      --ux-light-tint: var(--ux-gray-50);

      /* Background & Surfaces */
      --ux-background: #ffffff;
      --ux-background-rgb: 255, 255, 255;
      --ux-surface: #ffffff;
      --ux-surface-rgb: 255, 255, 255;
      --ux-surface-secondary: var(--ux-gray-100);
      --ux-surface-tertiary: var(--ux-gray-200);

      /* Text Colors */
      --ux-text: var(--ux-gray-900);
      --ux-text-rgb: 17, 24, 39;
      --ux-text-secondary: var(--ux-gray-600);
      --ux-text-tertiary: var(--ux-gray-500);
      --ux-text-muted: var(--ux-gray-400);

      /* Borders & Dividers */
      --ux-border-color: var(--ux-gray-200);
      --ux-divider-color: var(--ux-gray-200);

      /* ========================================
         LAYER 3: Component Tokens
         Specific tokens for UI components.
         Components use these for consistency.
      ======================================== */

      /* Button */
      --ux-button-bg: var(--ux-primary);
      --ux-button-text: var(--ux-primary-contrast);
      --ux-button-bg-hover: var(--ux-primary-shade);
      --ux-button-border-radius: var(--ux-border-radius-ios);

      /* Card */
      --ux-card-bg: var(--ux-surface);
      --ux-card-border: var(--ux-border-color);
      --ux-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      /* Input */
      --ux-input-bg: var(--ux-surface);
      --ux-input-border: var(--ux-border-color);
      --ux-input-text: var(--ux-text);
      --ux-input-placeholder: var(--ux-text-tertiary);
      --ux-input-focus-border: var(--ux-primary);

      /* Modal */
      --ux-modal-bg: var(--ux-surface);
      --ux-modal-backdrop: rgba(0, 0, 0, 0.5);
      --ux-modal-border-radius: var(--ux-border-radius-ios-lg);

      /* Handle (drag indicator for modals/sheets) */
      --ux-handle-width: 36px;
      --ux-handle-height: 5px;
      --ux-handle-radius: 2.5px;
      --ux-handle-color: var(--ux-gray-300);

      /* List */
      --ux-list-bg: var(--ux-surface);
      --ux-list-item-hover: var(--ux-surface-secondary);
      --ux-list-divider: var(--ux-divider-color);

      /* Navbar */
      --ux-navbar-bg: var(--ux-surface);
      --ux-navbar-text: var(--ux-text);
      --ux-navbar-border: var(--ux-border-color);

      /* Toast */
      --ux-toast-bg: var(--ux-gray-800);
      --ux-toast-text: #ffffff;

      /* Borders */
      --ux-border-radius: 0.5rem;
      --ux-border-radius-sm: 0.25rem;
      --ux-border-radius-md: 0.625rem;
      --ux-border-radius-lg: 0.75rem;
      --ux-border-radius-xl: 1rem;
      --ux-border-radius-ios: 0.875rem;      /* 14px - iOS native button radius */
      --ux-border-radius-ios-lg: 1rem;       /* 16px - iOS large elements */

      /* Typography */
      --ux-font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "Roboto", sans-serif;
      --ux-font-weight-regular: 400;
      --ux-font-weight-medium: 500;
      --ux-font-weight-semibold: 600;
      --ux-font-weight-bold: 700;
      --ux-font-size-xs: 0.625rem;
      --ux-font-size-sm: 0.75rem;
      --ux-font-size-base: 0.875rem;
      --ux-font-size-md: 1rem;
      --ux-font-size-lg: 1.125rem;
      --ux-font-size-xl: 1.25rem;
      --ux-font-size-2xl: 1.5rem;
      --ux-font-size-3xl: 1.875rem;
      --ux-font-size-4xl: 2.25rem;

      /* Spacing */
      --ux-space-xs: 0.25rem;
      --ux-space-sm: 0.5rem;
      --ux-space-md: 0.75rem;
      --ux-space-lg: 1rem;
      --ux-space-xl: 1.5rem;
      --ux-space-2xl: 2rem;
      --ux-space-3xl: 3rem;

      /* Touch */
      --ux-touch-target: 2.75rem;
      --ux-touch-target-sm: 2.25rem;

      /* ========================================
         Component Sizing System (Ionic-based)
         All sizes use CSS variables for theming
         Override these via theme classes or custom CSS
      ======================================== */

      /* Button Sizes - Based on Ionic iOS */
      --ux-button-height: 3.1em;           /* ~50px at 16px base */
      --ux-button-height-sm: 2.1em;        /* ~34px at 16px base */
      --ux-button-height-lg: 3.1em;        /* Same height, more padding */
      --ux-button-min-height: 36px;
      --ux-button-min-height-sm: 28px;
      --ux-button-min-height-lg: 46px;
      --ux-button-max-height: none;
      --ux-button-padding-y: 13px;
      --ux-button-padding-x: 1em;
      --ux-button-padding-y-sm: 4px;
      --ux-button-padding-x-sm: 0.9em;
      --ux-button-padding-y-lg: 17px;
      --ux-button-padding-x-lg: 1em;
      --ux-button-border-radius: var(--ux-border-radius-ios);
      --ux-button-border-radius-sm: var(--ux-border-radius-sm);
      --ux-button-border-radius-lg: var(--ux-border-radius-ios-lg);
      --ux-button-font-size: 1rem;
      --ux-button-font-size-sm: 0.8125rem;  /* 13px */
      --ux-button-font-size-lg: 1.125rem;   /* 18px */
      --ux-button-font-weight: 500;
      --ux-button-icon-size: 1.25em;
      --ux-button-icon-only-size: clamp(30px, 2.125em, 60px);
      --ux-button-icon-only-size-sm: clamp(23px, 2.16em, 54px);
      --ux-button-icon-only-size-lg: clamp(46px, 2.5em, 78px);

      /* Input Sizes - Based on Ionic iOS */
      --ux-input-height: 44px;
      --ux-input-height-sm: 36px;
      --ux-input-height-lg: 52px;
      --ux-input-min-height: 44px;
      --ux-input-min-height-sm: 36px;
      --ux-input-min-height-lg: 52px;
      --ux-input-max-height: none;
      --ux-input-padding-y: 10px;
      --ux-input-padding-x: 16px;
      --ux-input-padding-y-sm: 8px;
      --ux-input-padding-x-sm: 12px;
      --ux-input-padding-y-lg: 14px;
      --ux-input-padding-x-lg: 20px;
      --ux-input-font-size: 16px;          /* Prevents zoom on iOS */
      --ux-input-font-size-sm: 14px;
      --ux-input-font-size-lg: 18px;

      /* Item/List Sizes - Based on Ionic iOS */
      --ux-item-min-height: 44px;
      --ux-item-min-height-sm: 36px;
      --ux-item-min-height-lg: 56px;
      --ux-item-padding-y: 10px;
      --ux-item-padding-x: 16px;
      --ux-item-font-size: 16px;

      /* Card Sizes - Based on Ionic iOS */
      --ux-card-margin-y: 24px;
      --ux-card-margin-x: 16px;
      --ux-card-padding: 16px;
      --ux-card-border-radius: 8px;
      --ux-card-min-height: none;
      --ux-card-max-height: none;

      /* Toolbar/Navbar - Based on Ionic iOS */
      --ux-toolbar-height: 44px;
      --ux-toolbar-height-sm: 36px;
      --ux-toolbar-height-lg: 56px;
      --ux-toolbar-min-height: 44px;
      --ux-toolbar-padding-y: 8px;
      --ux-toolbar-padding-x: 16px;

      /* Avatar Sizes - Based on Ionic iOS */
      --ux-avatar-size: 48px;
      --ux-avatar-size-xs: 24px;
      --ux-avatar-size-sm: 36px;
      --ux-avatar-size-lg: 64px;
      --ux-avatar-size-xl: 96px;

      /* Toggle/Switch - Based on Ionic iOS */
      --ux-toggle-width: 51px;
      --ux-toggle-height: 31px;
      --ux-toggle-handle-size: 27px;
      --ux-toggle-border-radius: 15.5px;

      /* Checkbox - Based on Ionic iOS */
      --ux-checkbox-size: 22px;
      --ux-checkbox-size-sm: 18px;
      --ux-checkbox-size-lg: 26px;
      --ux-checkbox-border-radius: 50%;

      /* Radio - Based on Ionic iOS */
      --ux-radio-size: 20px;
      --ux-radio-size-sm: 16px;
      --ux-radio-size-lg: 24px;

      /* Segment - Based on Ionic iOS */
      --ux-segment-bg: rgba(118, 118, 128, 0.12);
      --ux-segment-min-width: 70px;
      --ux-segment-min-height: 28px;
      --ux-segment-padding: 2px;
      --ux-segment-border-radius: 8px;
      --ux-segment-font-size: 13px;

      /* FAB - Based on Ionic iOS */
      --ux-fab-size: 56px;
      --ux-fab-size-sm: 40px;
      --ux-fab-size-lg: 72px;
      --ux-fab-icon-size: 28px;
      --ux-fab-icon-size-sm: 18px;
      --ux-fab-icon-size-lg: 36px;

      /* Chip/Badge - Based on Ionic iOS */
      --ux-chip-height: 32px;
      --ux-chip-height-sm: 24px;
      --ux-chip-height-lg: 40px;
      --ux-chip-padding-x: 12px;
      --ux-chip-border-radius: 16px;
      --ux-chip-font-size: 14px;
      --ux-badge-min-height: 20px;
      --ux-badge-padding-x: 8px;
      --ux-badge-border-radius: 10px;
      --ux-badge-font-size: 12px;

      /* Modal/Sheet - Based on Ionic iOS */
      --ux-modal-max-width: 500px;
      --ux-modal-max-height: 90dvh;
      --ux-modal-border-radius: 14px;
      --ux-modal-padding: 16px;
      --ux-sheet-border-radius: 14px;
      --ux-sheet-handle-width: 36px;
      --ux-sheet-handle-height: 5px;

      /* Toast - Based on Ionic iOS */
      --ux-toast-min-height: 44px;
      --ux-toast-max-width: 400px;
      --ux-toast-padding: 14px 16px;
      --ux-toast-border-radius: 14px;
      --ux-toast-icon-size: 22px;

      /* Tabs - Based on Ionic iOS */
      --ux-tabs-height: 50px;
      --ux-tabs-height-compact: 44px;
      --ux-tab-min-width: 64px;
      --ux-tab-font-size: 10px;
      --ux-tab-icon-size: 24px;
      --ux-tab-indicator-height: 3px;
      --ux-tab-indicator-radius: 1.5px;

      /* Searchbar - Based on Ionic iOS */
      --ux-searchbar-height: 36px;
      --ux-searchbar-border-radius: 10px;
      --ux-searchbar-padding-x: 12px;

      /* Progress/Spinner */
      --ux-progress-height: 4px;
      --ux-progress-border-radius: 2px;
      --ux-spinner-size: 28px;
      --ux-spinner-size-sm: 20px;
      --ux-spinner-size-lg: 40px;

      /* Transitions */
      --ux-transition-instant: 50ms;
      --ux-transition-fast: 150ms;
      --ux-transition-base: 200ms;
      --ux-transition-normal: 300ms;
      --ux-transition-slow: 300ms;
      --ux-transition-slower: 400ms;
      --ux-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
      --ux-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      /* iOS-style easing - smooth deceleration like UIKit */
      --ux-ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
      --ux-ease-ios-spring: cubic-bezier(0.28, 0.84, 0.42, 1);

      /* Disabled State */
      --ux-disabled-opacity: 0.5;
      --ux-disabled-cursor: not-allowed;

      /* Reduced motion - used as multiplier */
      --ux-motion-reduce: 1;

      /* Shadows */
      --ux-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --ux-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
      --ux-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
      --ux-shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);

      /* Z-Index */
      --ux-z-base: 0;
      --ux-z-dropdown: 100;
      --ux-z-sticky: 200;
      --ux-z-fixed: 300;
      --ux-z-modal-backdrop: 400;
      --ux-z-modal: 500;
      --ux-z-popover: 600;
      --ux-z-tooltip: 700;
      --ux-z-toast: 800;

      /* ========================================
         Liquid Glass - iOS 26 Style (WWDC 2025)
         Semi-transparent materials with blur
      ======================================== */

      /* Glass Materials */
      --ux-glass-blur: 20px;
      --ux-glass-blur-heavy: 40px;
      --ux-glass-saturation: 180%;
      --ux-glass-bg: rgba(255, 255, 255, 0.45);
      --ux-glass-bg-thick: rgba(255, 255, 255, 0.65);
      --ux-glass-bg-thin: rgba(255, 255, 255, 0.25);
      --ux-glass-border: rgba(255, 255, 255, 0.18);
      --ux-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      --ux-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.5);

      /* Glass Border Radii (iOS 26 style) */
      --ux-glass-radius-xs: 6px;
      --ux-glass-radius-sm: 10px;
      --ux-glass-radius-md: 16px;
      --ux-glass-radius-lg: 22px;
      --ux-glass-radius-xl: 28px;

      /* Spring Animations */
      --ux-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
      --ux-spring-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      --ux-spring-snappy: cubic-bezier(0.22, 0.68, 0, 1.71);

      /* Safe Areas (iOS notch) */
      --ux-safe-top: env(safe-area-inset-top, 0px);
      --ux-safe-right: env(safe-area-inset-right, 0px);
      --ux-safe-bottom: env(safe-area-inset-bottom, 0px);
      --ux-safe-left: env(safe-area-inset-left, 0px);

      /* ========================================
         Utility System - Composition Variables
         Used by utility classes for composition
      ======================================== */

      /* Opacity States */
      --ux-opacity-hidden: 0;
      --ux-opacity-muted: 0.5;
      --ux-opacity-visible: 1;

      /* Backdrop/Overlay */
      --ux-backdrop-color: rgba(0, 0, 0, 0.4);
      --ux-backdrop-color-light: rgba(0, 0, 0, 0.2);
      --ux-backdrop-color-heavy: rgba(0, 0, 0, 0.6);

      /* Transition Presets */
      --ux-transition-fade: opacity var(--ux-transition-base) var(--ux-ease),
                            visibility var(--ux-transition-base) var(--ux-ease);
      --ux-transition-transform: transform var(--ux-transition-base) var(--ux-ease-spring);
      --ux-transition-colors: background-color var(--ux-transition-fast) var(--ux-ease),
                              color var(--ux-transition-fast) var(--ux-ease),
                              border-color var(--ux-transition-fast) var(--ux-ease);

      /* Focus Ring */
      --ux-focus-ring-color: var(--ux-primary);
      --ux-focus-ring-width: 2px;
      --ux-focus-ring-offset: 2px;

      /* Color Variant System (Composition) */
      --ux-variant-bg: transparent;
      --ux-variant-color: inherit;
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: transparent;
      --ux-variant-soft-opacity: 0.15;
    }

    /* ========================================
       Dark Mode - Using Primitives
       System preference + Manual class
    ======================================== */

    /* Dark Mode - System preference */
    @media (prefers-color-scheme: dark) {
      :root:not(.ux-light) {
        /* Background & Surfaces - iOS dark style */
        --ux-background: #000000;
        --ux-background-rgb: 0, 0, 0;
        --ux-surface: #1c1c1e;
        --ux-surface-rgb: 28, 28, 30;
        --ux-surface-secondary: #2c2c2e;
        --ux-surface-tertiary: #3a3a3c;

        /* Text - using opacity for iOS feel */
        --ux-text: #ffffff;
        --ux-text-rgb: 255, 255, 255;
        --ux-text-secondary: rgba(235, 235, 245, 0.8);
        --ux-text-tertiary: rgba(235, 235, 245, 0.5);
        --ux-text-muted: rgba(235, 235, 245, 0.3);

        /* Borders */
        --ux-border-color: rgba(255, 255, 255, 0.15);
        --ux-divider-color: rgba(255, 255, 255, 0.1);
        --ux-shadow-color: rgba(0, 0, 0, 0.5);

        /* Invert light/dark semantic colors */
        --ux-light: #2c2c2e;
        --ux-light-rgb: 44, 44, 46;
        --ux-light-contrast: #ffffff;
        --ux-light-shade: #1c1c1e;
        --ux-light-tint: #3a3a3c;

        --ux-dark: #ffffff;
        --ux-dark-rgb: 255, 255, 255;
        --ux-dark-contrast: #1a1a1a;
        --ux-dark-shade: var(--ux-gray-200);
        --ux-dark-tint: #ffffff;

        /* Component tokens - dark mode */
        --ux-card-bg: var(--ux-surface);
        --ux-input-bg: var(--ux-surface);
        --ux-modal-bg: var(--ux-surface);
        --ux-list-bg: var(--ux-surface);
        --ux-navbar-bg: var(--ux-surface);
        --ux-toast-bg: var(--ux-gray-700);

        /* Liquid Glass - Dark mode */
        --ux-glass-bg: rgba(28, 28, 30, 0.55);
        --ux-glass-bg-thick: rgba(28, 28, 30, 0.72);
        --ux-glass-bg-thin: rgba(28, 28, 30, 0.35);
        --ux-glass-border: rgba(255, 255, 255, 0.12);
        --ux-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
        --ux-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.12);

        /* Backdrop - Dark mode */
        --ux-backdrop-color: rgba(0, 0, 0, 0.6);
        --ux-backdrop-color-light: rgba(0, 0, 0, 0.4);
        --ux-backdrop-color-heavy: rgba(0, 0, 0, 0.8);
      }
    }

    /* Force Light Mode - overrides system dark preference */
    html.ux-light,
    body.ux-light,
    .ux-light {
      --ux-background: #ffffff;
      --ux-background-rgb: 255, 255, 255;
      --ux-surface: #ffffff;
      --ux-surface-rgb: 255, 255, 255;
      --ux-surface-secondary: var(--ux-gray-100);
      --ux-surface-tertiary: var(--ux-gray-200);

      --ux-text: var(--ux-gray-900);
      --ux-text-rgb: 17, 24, 39;
      --ux-text-secondary: var(--ux-gray-600);
      --ux-text-tertiary: var(--ux-gray-500);
      --ux-text-muted: var(--ux-gray-400);

      --ux-border-color: var(--ux-gray-200);
      --ux-divider-color: var(--ux-gray-200);
      --ux-shadow-color: rgba(0, 0, 0, 0.1);

      --ux-light: var(--ux-gray-100);
      --ux-light-rgb: 243, 244, 246;
      --ux-light-contrast: #000000;
      --ux-light-shade: var(--ux-gray-200);
      --ux-light-tint: var(--ux-gray-50);

      --ux-dark: var(--ux-gray-900);
      --ux-dark-rgb: 17, 24, 39;
      --ux-dark-contrast: #ffffff;
      --ux-dark-shade: var(--ux-gray-950);
      --ux-dark-tint: var(--ux-gray-800);
    }

    /* Manual Dark Mode Class - applied to html or body */
    html.ux-dark,
    body.ux-dark,
    .ux-dark {
      /* Background & Surfaces - iOS dark style */
      --ux-background: #000000;
      --ux-background-rgb: 0, 0, 0;
      --ux-surface: #1c1c1e;
      --ux-surface-rgb: 28, 28, 30;
      --ux-surface-secondary: #2c2c2e;
      --ux-surface-tertiary: #3a3a3c;

      /* Text */
      --ux-text: #ffffff;
      --ux-text-rgb: 255, 255, 255;
      --ux-text-secondary: rgba(235, 235, 245, 0.8);
      --ux-text-tertiary: rgba(235, 235, 245, 0.5);
      --ux-text-muted: rgba(235, 235, 245, 0.3);

      /* Borders */
      --ux-border-color: rgba(255, 255, 255, 0.15);
      --ux-divider-color: rgba(255, 255, 255, 0.1);
      --ux-shadow-color: rgba(0, 0, 0, 0.5);

      /* Invert light/dark */
      --ux-light: #2c2c2e;
      --ux-light-rgb: 44, 44, 46;
      --ux-light-contrast: #ffffff;
      --ux-light-shade: #1c1c1e;
      --ux-light-tint: #3a3a3c;

      --ux-dark: #ffffff;
      --ux-dark-rgb: 255, 255, 255;
      --ux-dark-contrast: #1a1a1a;
      --ux-dark-shade: var(--ux-gray-200);
      --ux-dark-tint: #ffffff;

      /* Component tokens - dark mode */
      --ux-card-bg: var(--ux-surface);
      --ux-input-bg: var(--ux-surface);
      --ux-modal-bg: var(--ux-surface);
      --ux-list-bg: var(--ux-surface);
      --ux-navbar-bg: var(--ux-surface);
      --ux-toast-bg: var(--ux-gray-700);

      /* Liquid Glass - Dark mode */
      --ux-glass-bg: rgba(28, 28, 30, 0.55);
      --ux-glass-bg-thick: rgba(28, 28, 30, 0.72);
      --ux-glass-bg-thin: rgba(28, 28, 30, 0.35);
      --ux-glass-border: rgba(255, 255, 255, 0.12);
      --ux-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.32);
      --ux-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.12);

      /* Backdrop - Dark mode */
      --ux-backdrop-color: rgba(0, 0, 0, 0.6);
      --ux-backdrop-color-light: rgba(0, 0, 0, 0.4);
      --ux-backdrop-color-heavy: rgba(0, 0, 0, 0.8);
      --ux-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    /* ========================================
       Color Themes - Using Primitives
       Apply to body or any container
       Plugins should use semantic tokens,
       not change these themes directly.
    ======================================== */

    /* Ocean Blue (default - Shoelace Sky style) */
    .ux-theme-ocean {
      --ux-primary: #0ea5e9;
      --ux-primary-rgb: 14, 165, 233;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #0284c7;
      --ux-primary-tint: #38bdf8;
    }

    /* Blue (Tailwind/Modern) */
    .ux-theme-blue {
      --ux-primary: var(--ux-blue-500);
      --ux-primary-rgb: 59, 130, 246;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-blue-600);
      --ux-primary-tint: var(--ux-blue-400);
    }

    /* Emerald Green */
    .ux-theme-emerald {
      --ux-primary: var(--ux-emerald-500);
      --ux-primary-rgb: 16, 185, 129;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-emerald-600);
      --ux-primary-tint: var(--ux-emerald-400);
    }

    /* Purple */
    .ux-theme-purple {
      --ux-primary: var(--ux-purple-500);
      --ux-primary-rgb: 168, 85, 247;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-purple-600);
      --ux-primary-tint: var(--ux-purple-400);
    }

    /* Violet */
    .ux-theme-violet {
      --ux-primary: var(--ux-violet-500);
      --ux-primary-rgb: 139, 92, 246;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-violet-600);
      --ux-primary-tint: var(--ux-violet-400);
    }

    /* Sunset Orange */
    .ux-theme-sunset,
    .ux-theme-orange {
      --ux-primary: var(--ux-orange-500);
      --ux-primary-rgb: 249, 115, 22;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-orange-600);
      --ux-primary-tint: var(--ux-orange-400);
    }

    /* Rose Pink */
    .ux-theme-rose {
      --ux-primary: var(--ux-rose-500);
      --ux-primary-rgb: 244, 63, 94;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-rose-600);
      --ux-primary-tint: var(--ux-rose-400);
    }

    /* Teal */
    .ux-theme-teal {
      --ux-primary: var(--ux-teal-500);
      --ux-primary-rgb: 20, 184, 166;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-teal-600);
      --ux-primary-tint: var(--ux-teal-400);
    }

    /* Amber Gold */
    .ux-theme-amber {
      --ux-primary: var(--ux-amber-500);
      --ux-primary-rgb: 245, 158, 11;
      --ux-primary-contrast: #000000;
      --ux-primary-shade: var(--ux-amber-600);
      --ux-primary-tint: var(--ux-amber-400);
    }

    /* Slate Gray */
    .ux-theme-slate {
      --ux-primary: var(--ux-slate-500);
      --ux-primary-rgb: 100, 116, 139;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-slate-600);
      --ux-primary-tint: var(--ux-slate-400);
    }

    /* Indigo */
    .ux-theme-indigo {
      --ux-primary: var(--ux-indigo-500);
      --ux-primary-rgb: 99, 102, 241;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-indigo-600);
      --ux-primary-tint: var(--ux-indigo-400);
    }

    /* Cyan */
    .ux-theme-cyan {
      --ux-primary: var(--ux-cyan-500);
      --ux-primary-rgb: 6, 182, 212;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-cyan-600);
      --ux-primary-tint: var(--ux-cyan-400);
    }

    /* Red / Crimson */
    .ux-theme-red,
    .ux-theme-crimson {
      --ux-primary: var(--ux-red-500);
      --ux-primary-rgb: 239, 68, 68;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-red-600);
      --ux-primary-tint: var(--ux-red-400);
    }

    /* Green / Forest */
    .ux-theme-green,
    .ux-theme-forest {
      --ux-primary: var(--ux-green-600);
      --ux-primary-rgb: 22, 163, 74;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: var(--ux-green-700);
      --ux-primary-tint: var(--ux-green-500);
    }

    /* ========================================
       Reduced Motion Support
       Respects user preference for reduced motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      :root {
        --ux-transition-fast: 0ms;
        --ux-transition-base: 0ms;
        --ux-transition-slow: 0ms;
        --ux-transition-slower: 0ms;
        --ux-ease-spring: ease;
        --ux-motion-reduce: 0;
      }

      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* Utility class to force reduced motion */
    .ux-reduce-motion,
    .ux-reduce-motion *,
    .ux-reduce-motion *::before,
    .ux-reduce-motion *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    /* ========================================
       CSS Reset
    ======================================== */

    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
      padding: 0;
    }

    html {
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      touch-action: manipulation;
    }

    body {
      font-family: var(--ux-font-family);
      font-size: var(--ux-font-size-base);
      line-height: 1.5;
      color: var(--ux-text);
      background-color: var(--ux-background);
      min-height: 100dvh;
    }

    /* Prevent zoom on input focus (iOS) */
    input, select, textarea {
      font-size: 16px;
    }

    /* ========================================
       Typography (Ionic-style)
    ======================================== */

    h1, h2, h3, h4, h5, h6 {
      margin-top: 1rem;
      margin-bottom: 0.625rem;
      font-weight: 500;
      line-height: 1.2;
      color: var(--ux-text);
    }

    h1 {
      margin-top: 1.25rem;
      font-size: 1.625rem;
    }

    h2 {
      margin-top: 1.125rem;
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.375rem;
    }

    h4 {
      font-size: 1.25rem;
    }

    h5 {
      font-size: 1.125rem;
    }

    h6 {
      font-size: 1rem;
    }

    /* Paragraphs */
    p {
      margin-top: 0;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    /* Links */
    a {
      color: var(--ux-primary);
      text-decoration: none;
      background-color: transparent;
    }

    a:hover {
      color: var(--ux-primary-shade);
      text-decoration: underline;
    }

    /* Small text */
    small {
      font-size: 75%;
    }

    /* Superscript & Subscript */
    sub, sup {
      font-size: 75%;
      line-height: 0;
      position: relative;
      vertical-align: baseline;
    }

    sup {
      top: -0.5em;
    }

    sub {
      bottom: -0.25em;
    }

    /* Bold & Strong */
    b, strong {
      font-weight: 600;
    }

    /* Code & Pre */
    code, kbd, pre, samp {
      font-family: var(--ux-font-family-mono);
      font-size: 0.875em;
    }

    code {
      padding: 0.125rem 0.375rem;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius-sm);
      color: var(--ux-danger);
    }

    pre {
      display: block;
      padding: var(--ux-space-md);
      margin-top: 0;
      margin-bottom: 1rem;
      overflow: auto;
      background-color: var(--ux-surface-secondary);
      border-radius: var(--ux-border-radius);
    }

    pre code {
      padding: 0;
      background-color: transparent;
      color: inherit;
    }

    /* Blockquote */
    blockquote {
      margin: 0 0 1rem;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-left: 4px solid var(--ux-primary);
      background-color: var(--ux-surface-secondary);
      font-style: italic;
    }

    blockquote p:last-child {
      margin-bottom: 0;
    }

    /* Horizontal Rule */
    hr {
      margin: var(--ux-space-lg) 0;
      border: 0;
      border-top: 1px solid var(--ux-border-color);
    }

    /* Mark / Highlight */
    mark {
      padding: 0.125rem 0.25rem;
      background-color: rgba(var(--ux-warning-rgb), 0.3);
      border-radius: 0.125rem;
    }

    /* Abbreviation */
    abbr[title] {
      text-decoration: underline dotted;
      cursor: help;
      border-bottom: 0;
    }

    /* Lists */
    ul, ol {
      margin-top: 0;
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }

    ul ul, ul ol, ol ul, ol ol {
      margin-bottom: 0;
    }

    li {
      margin-bottom: 0.25rem;
    }

    /* Definition List */
    dl {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    dt {
      font-weight: 600;
    }

    dd {
      margin-left: 0;
      margin-bottom: 0.5rem;
    }

    /* Smooth scrolling */
    .ux-scroll {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }

    /* Hide scrollbar but allow scrolling */
    .ux-scroll-hidden::-webkit-scrollbar {
      display: none;
    }
    .ux-scroll-hidden {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* ========================================
       Custom Scrollbar - Professional Theme
    ======================================== */

    /* CSS Variables for scrollbar */
    :root {
      --ux-scrollbar-size: 8px;
      --ux-scrollbar-size-sm: 6px;
      --ux-scrollbar-track: transparent;
      --ux-scrollbar-thumb: var(--ux-gray-400);
      --ux-scrollbar-thumb-hover: var(--ux-gray-500);
      --ux-scrollbar-thumb-active: var(--ux-gray-600);
      --ux-scrollbar-radius: 100px;
    }

    /* Dark mode scrollbar colors */
    @media (prefers-color-scheme: dark) {
      :root {
        --ux-scrollbar-thumb: var(--ux-gray-600);
        --ux-scrollbar-thumb-hover: var(--ux-gray-500);
        --ux-scrollbar-thumb-active: var(--ux-gray-400);
      }
    }

    .ux-dark {
      --ux-scrollbar-thumb: var(--ux-gray-600);
      --ux-scrollbar-thumb-hover: var(--ux-gray-500);
      --ux-scrollbar-thumb-active: var(--ux-gray-400);
    }

    /* Webkit Scrollbar (Chrome, Safari, Edge) */
    ::-webkit-scrollbar {
      width: var(--ux-scrollbar-size);
      height: var(--ux-scrollbar-size);
    }

    ::-webkit-scrollbar-track {
      background: var(--ux-scrollbar-track);
      border-radius: var(--ux-scrollbar-radius);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--ux-scrollbar-thumb);
      border-radius: var(--ux-scrollbar-radius);
      border: 2px solid transparent;
      background-clip: padding-box;
      transition: background-color 0.2s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--ux-scrollbar-thumb-hover);
      border: 2px solid transparent;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar-thumb:active {
      background: var(--ux-scrollbar-thumb-active);
      border: 2px solid transparent;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar-corner {
      background: transparent;
    }

    /* Firefox Scrollbar */
    * {
      scrollbar-width: thin;
      scrollbar-color: var(--ux-scrollbar-thumb) var(--ux-scrollbar-track);
    }

    /* Thin scrollbar variant */
    .ux-scrollbar-thin::-webkit-scrollbar {
      width: var(--ux-scrollbar-size-sm);
      height: var(--ux-scrollbar-size-sm);
    }

    .ux-scrollbar-thin {
      scrollbar-width: thin;
    }

    /* Primary colored scrollbar */
    .ux-scrollbar-primary::-webkit-scrollbar-thumb {
      background: rgba(var(--ux-primary-rgb), 0.4);
    }

    .ux-scrollbar-primary::-webkit-scrollbar-thumb:hover {
      background: rgba(var(--ux-primary-rgb), 0.6);
    }

    .ux-scrollbar-primary::-webkit-scrollbar-thumb:active {
      background: rgba(var(--ux-primary-rgb), 0.8);
    }

    .ux-scrollbar-primary {
      scrollbar-color: rgba(var(--ux-primary-rgb), 0.4) transparent;
    }

    /* Auto-hide scrollbar (shows on hover/scroll) */
    .ux-scrollbar-auto {
      overflow: auto;
    }

    .ux-scrollbar-auto::-webkit-scrollbar-thumb {
      background: transparent;
    }

    .ux-scrollbar-auto:hover::-webkit-scrollbar-thumb,
    .ux-scrollbar-auto:focus-within::-webkit-scrollbar-thumb {
      background: var(--ux-scrollbar-thumb);
    }

    .ux-scrollbar-auto:hover::-webkit-scrollbar-thumb:hover {
      background: var(--ux-scrollbar-thumb-hover);
    }

    /* Gutter stable (prevents layout shift) */
    .ux-scrollbar-stable {
      scrollbar-gutter: stable;
    }

    .ux-scrollbar-stable-both {
      scrollbar-gutter: stable both-edges;
    }

    /* Focus visible for keyboard navigation */
    :focus-visible {
      outline: 2px solid var(--ux-primary);
      outline-offset: 2px;
    }

    :focus:not(:focus-visible) {
      outline: none;
    }

    /* Remove default button styles */
    button {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      cursor: pointer;
      border: none;
      background: none;
      color: inherit;
    }

    /* Remove default list styles */
    ul, ol {
      list-style: none;
    }

    /* Images */
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    /* Links */
    a {
      color: var(--ux-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Disabled state - Standardized across all components */
    [disabled],
    .ux-disabled {
      opacity: var(--ux-disabled-opacity) !important;
      cursor: var(--ux-disabled-cursor) !important;
      pointer-events: none !important;
    }

    /* Disabled interactive elements */
    button[disabled],
    input[disabled],
    select[disabled],
    textarea[disabled],
    .ux-button[disabled],
    .ux-input[disabled] {
      opacity: var(--ux-disabled-opacity);
      cursor: var(--ux-disabled-cursor);
      pointer-events: none;
    }

    /* ========================================
       Utility Classes
    ======================================== */

    /* Flexbox */
    .ux-flex { display: flex; }
    .ux-flex-col { flex-direction: column; }
    .ux-flex-wrap { flex-wrap: wrap; }
    .ux-items-center { align-items: center; }
    .ux-items-start { align-items: flex-start; }
    .ux-items-end { align-items: flex-end; }
    .ux-justify-center { justify-content: center; }
    .ux-justify-between { justify-content: space-between; }
    .ux-justify-around { justify-content: space-around; }
    .ux-gap-xs { gap: var(--ux-space-xs); }
    .ux-gap-sm { gap: var(--ux-space-sm); }
    .ux-gap-md { gap: var(--ux-space-md); }
    .ux-gap-lg { gap: var(--ux-space-lg); }

    /* Spacing */
    .ux-p-0 { padding: 0; }
    .ux-p-xs { padding: var(--ux-space-xs); }
    .ux-p-sm { padding: var(--ux-space-sm); }
    .ux-p-md { padding: var(--ux-space-md); }
    .ux-p-lg { padding: var(--ux-space-lg); }
    .ux-p-xl { padding: var(--ux-space-xl); }

    .ux-m-0 { margin: 0; }
    .ux-m-xs { margin: var(--ux-space-xs); }
    .ux-m-sm { margin: var(--ux-space-sm); }
    .ux-m-md { margin: var(--ux-space-md); }
    .ux-m-lg { margin: var(--ux-space-lg); }
    .ux-m-xl { margin: var(--ux-space-xl); }

    /* Margin directional */
    .ux-mt-0 { margin-top: 0; }
    .ux-mt-xs { margin-top: var(--ux-space-xs); }
    .ux-mt-sm { margin-top: var(--ux-space-sm); }
    .ux-mt-md { margin-top: var(--ux-space-md); }
    .ux-mt-lg { margin-top: var(--ux-space-lg); }
    .ux-mt-xl { margin-top: var(--ux-space-xl); }

    .ux-mb-0 { margin-bottom: 0; }
    .ux-mb-xs { margin-bottom: var(--ux-space-xs); }
    .ux-mb-sm { margin-bottom: var(--ux-space-sm); }
    .ux-mb-md { margin-bottom: var(--ux-space-md); }
    .ux-mb-lg { margin-bottom: var(--ux-space-lg); }
    .ux-mb-xl { margin-bottom: var(--ux-space-xl); }

    .ux-ml-0 { margin-left: 0; }
    .ux-ml-xs { margin-left: var(--ux-space-xs); }
    .ux-ml-sm { margin-left: var(--ux-space-sm); }
    .ux-ml-md { margin-left: var(--ux-space-md); }
    .ux-ml-lg { margin-left: var(--ux-space-lg); }
    .ux-ml-xl { margin-left: var(--ux-space-xl); }

    .ux-mr-0 { margin-right: 0; }
    .ux-mr-xs { margin-right: var(--ux-space-xs); }
    .ux-mr-sm { margin-right: var(--ux-space-sm); }
    .ux-mr-md { margin-right: var(--ux-space-md); }
    .ux-mr-lg { margin-right: var(--ux-space-lg); }
    .ux-mr-xl { margin-right: var(--ux-space-xl); }

    /* Text */
    .ux-text-xs { font-size: var(--ux-font-size-xs); }
    .ux-text-sm { font-size: var(--ux-font-size-sm); }
    .ux-text-base { font-size: var(--ux-font-size-base); }
    .ux-text-md { font-size: var(--ux-font-size-md); }
    .ux-text-lg { font-size: var(--ux-font-size-lg); }
    .ux-text-xl { font-size: var(--ux-font-size-xl); }
    .ux-text-2xl { font-size: var(--ux-font-size-2xl); }
    .ux-text-3xl { font-size: var(--ux-font-size-3xl); }

    .ux-text-center { text-align: center; }
    .ux-text-left { text-align: left; }
    .ux-text-right { text-align: right; }

    .ux-font-normal { font-weight: 400; }
    .ux-font-medium { font-weight: 500; }
    .ux-font-semibold { font-weight: 600; }
    .ux-font-bold { font-weight: 700; }

    .ux-text-primary { color: var(--ux-primary); }
    .ux-text-secondary { color: var(--ux-text-secondary); }
    .ux-text-success { color: var(--ux-success); }
    .ux-text-warning { color: var(--ux-warning); }
    .ux-text-danger { color: var(--ux-danger); }

    /* Text Transform (Ionic-style) */
    .ux-text-uppercase { text-transform: uppercase; }
    .ux-text-lowercase { text-transform: lowercase; }
    .ux-text-capitalize { text-transform: capitalize; }

    /* Text Wrap */
    .ux-text-wrap { white-space: normal; }
    .ux-text-nowrap { white-space: nowrap; }

    /* Text Alignment (RTL-aware) */
    .ux-text-start { text-align: start; }
    .ux-text-end { text-align: end; }
    .ux-text-justify { text-align: justify; }

    /* Text Decoration */
    .ux-text-underline { text-decoration: underline; }
    .ux-text-line-through { text-decoration: line-through; }
    .ux-text-no-underline { text-decoration: none; }

    /* Text Overflow */
    .ux-text-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Line Clamp (multi-line truncation) */
    .ux-line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .ux-line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Font Style */
    .ux-font-italic { font-style: italic; }
    .ux-font-not-italic { font-style: normal; }

    /* Letter Spacing */
    .ux-tracking-tight { letter-spacing: -0.025em; }
    .ux-tracking-normal { letter-spacing: 0; }
    .ux-tracking-wide { letter-spacing: 0.025em; }

    /* Line Height */
    .ux-leading-none { line-height: 1; }
    .ux-leading-tight { line-height: 1.25; }
    .ux-leading-normal { line-height: 1.5; }
    .ux-leading-relaxed { line-height: 1.75; }

    /* Display */
    .ux-hidden { display: none; }
    .ux-block { display: block; }
    .ux-inline { display: inline; }
    .ux-inline-block { display: inline-block; }

    /* ========================================
       State Utilities (Animated)
       Hidden/visible with transitions
    ======================================== */

    .ux-state-hidden {
      opacity: var(--ux-opacity-hidden);
      visibility: hidden;
      pointer-events: none;
      transition: var(--ux-transition-fade);
    }

    .ux-state-visible {
      opacity: var(--ux-opacity-visible);
      visibility: visible;
      pointer-events: auto;
      transition: var(--ux-transition-fade);
    }

    .ux-state-hidden--fast,
    .ux-state-visible--fast {
      transition-duration: var(--ux-transition-fast);
    }

    .ux-state-hidden--slow,
    .ux-state-visible--slow {
      transition-duration: var(--ux-transition-slow);
    }

    .ux-invisible {
      opacity: var(--ux-opacity-hidden);
      visibility: hidden;
    }

    /* Width */
    .ux-w-full { width: 100%; }
    .ux-w-auto { width: auto; }

    /* Positioning */
    .ux-relative { position: relative; }
    .ux-absolute { position: absolute; }
    .ux-fixed { position: fixed; }
    .ux-sticky { position: sticky; }
    .ux-position-relative { position: relative; }
    .ux-position-absolute { position: absolute; }
    .ux-position-fixed { position: fixed; }
    .ux-position-sticky { position: sticky; }

    /* Overflow */
    .ux-overflow-hidden { overflow: hidden; }
    .ux-overflow-auto { overflow: auto; }
    .ux-overflow-scroll { overflow: scroll; }
    .ux-overflow-x-auto { overflow-x: auto; }
    .ux-overflow-y-auto { overflow-y: auto; }
    .ux-overflow-x-hidden { overflow-x: hidden; }
    .ux-overflow-y-hidden { overflow-y: hidden; }

    /* Cursor */
    .ux-cursor-pointer { cursor: pointer; }
    .ux-cursor-default { cursor: default; }
    .ux-cursor-not-allowed { cursor: not-allowed; }
    .ux-cursor-grab { cursor: grab; }
    .ux-cursor-grabbing { cursor: grabbing; }

    /* Transform / Rotate */
    .ux-rotate-0 { transform: rotate(0deg); }
    .ux-rotate-45 { transform: rotate(45deg); }
    .ux-rotate-90 { transform: rotate(90deg); }
    .ux-rotate-180 { transform: rotate(180deg); }
    .ux-rotate-270 { transform: rotate(270deg); }
    .-ux-rotate-90 { transform: rotate(-90deg); }
    .-ux-rotate-180 { transform: rotate(-180deg); }

    /* Min/Max Width */
    .ux-min-w-0 { min-width: 0; }
    .ux-min-w-full { min-width: 100%; }
    .ux-max-w-full { max-width: 100%; }
    .ux-max-w-none { max-width: none; }

    /* Border Radius */
    .ux-rounded { border-radius: var(--ux-border-radius); }
    .ux-rounded-sm { border-radius: var(--ux-border-radius-sm); }
    .ux-rounded-lg { border-radius: var(--ux-border-radius-lg); }
    .ux-rounded-xl { border-radius: var(--ux-border-radius-xl); }
    .ux-rounded-full { border-radius: 9999px; }

    /* Shadow */
    .ux-shadow-sm { box-shadow: var(--ux-shadow-sm); }
    .ux-shadow-md { box-shadow: var(--ux-shadow-md); }
    .ux-shadow-lg { box-shadow: var(--ux-shadow-lg); }
    .ux-shadow-xl { box-shadow: var(--ux-shadow-xl); }

    /* Safe Areas */
    .ux-safe-top { padding-top: var(--ux-safe-top); }
    .ux-safe-bottom { padding-bottom: var(--ux-safe-bottom); }
    .ux-safe-left { padding-left: var(--ux-safe-left); }
    .ux-safe-right { padding-right: var(--ux-safe-right); }
    .ux-safe-all {
      padding-top: var(--ux-safe-top);
      padding-right: var(--ux-safe-right);
      padding-bottom: var(--ux-safe-bottom);
      padding-left: var(--ux-safe-left);
    }

    /* Screen Reader Only */
    .ux-sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Code Block */
    .ux-code {
      display: block;
      background: var(--ux-surface-secondary);
      padding: var(--ux-space-md);
      border-radius: var(--ux-border-radius);
      overflow-x: auto;
      font-size: var(--ux-font-size-sm);
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      white-space: pre;
      -webkit-overflow-scrolling: touch;
    }

    .ux-code code {
      background: none;
      padding: 0;
      font-size: inherit;
    }

    /* Iframe Frame */
    .ux-frame {
      width: 100%;
      height: 100%;
      border: none;
      min-height: calc(100dvh - 56px);
    }

    /* Ripple Effect Base */
    .ux-ripple {
      position: relative;
      overflow: hidden;
    }

    .ux-ripple::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }

    .ux-ripple:active::after {
      width: 200%;
      height: 200%;
      opacity: 1;
      transition: width 0s, height 0s, opacity 0s;
    }

    .ux-ripple:not(:active)::after {
      transition: width var(--ux-transition-slow), height var(--ux-transition-slow), opacity var(--ux-transition-slow);
    }

    /* Tap Highlight */
    .ux-tap {
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-tap:active {
      transform: scale(0.97);
    }

    /* ========================================
       Ionic-style Padding/Margin Classes
       Similar to ion-padding, ion-margin
       Uses CSS custom property for responsive scaling
    ======================================== */

    :root {
      /* Responsive spacing - scales with viewport */
      --ux-responsive-space: var(--ux-space-lg); /* 1rem base */
    }

    @media (min-width: 768px) {
      :root { --ux-responsive-space: var(--ux-space-xl); } /* 1.5rem */
    }

    @media (min-width: 992px) {
      :root { --ux-responsive-space: var(--ux-space-2xl); } /* 2rem */
    }

    /* Padding - uses responsive variable */
    .ux-padding { padding: var(--ux-responsive-space); }
    .ux-padding-top { padding-top: var(--ux-responsive-space); }
    .ux-padding-bottom { padding-bottom: var(--ux-responsive-space); }
    .ux-padding-start, .ux-padding-left { padding-left: var(--ux-responsive-space); }
    .ux-padding-end, .ux-padding-right { padding-right: var(--ux-responsive-space); }
    .ux-padding-horizontal { padding-left: var(--ux-responsive-space); padding-right: var(--ux-responsive-space); }
    .ux-padding-vertical { padding-top: var(--ux-responsive-space); padding-bottom: var(--ux-responsive-space); }
    .ux-no-padding { padding: 0 !important; }

    /* Margin - uses responsive variable */
    .ux-margin { margin: var(--ux-responsive-space); }
    .ux-margin-top { margin-top: var(--ux-responsive-space); }
    .ux-margin-bottom { margin-bottom: var(--ux-responsive-space); }
    .ux-margin-start, .ux-margin-left { margin-left: var(--ux-responsive-space); }
    .ux-margin-end, .ux-margin-right { margin-right: var(--ux-responsive-space); }
    .ux-margin-horizontal { margin-left: var(--ux-responsive-space); margin-right: var(--ux-responsive-space); }
    .ux-margin-vertical { margin-top: var(--ux-responsive-space); margin-bottom: var(--ux-responsive-space); }
    .ux-no-margin { margin: 0 !important; }

    /* ========================================
       Responsive Breakpoints
       sm: 576px, md: 768px, lg: 992px, xl: 1200px
       Note: Base .ux-padding/.ux-margin classes are responsive via --ux-responsive-space
    ======================================== */

    /* Small screens and up (576px+) */
    @media (min-width: 576px) {
      .ux-padding-sm { padding: var(--ux-space-lg); }
      .ux-padding-horizontal-sm { padding-left: var(--ux-space-lg); padding-right: var(--ux-space-lg); }
      .ux-padding-vertical-sm { padding-top: var(--ux-space-lg); padding-bottom: var(--ux-space-lg); }
      .ux-margin-sm { margin: var(--ux-space-lg); }
      .ux-margin-horizontal-sm { margin-left: var(--ux-space-lg); margin-right: var(--ux-space-lg); }
      .ux-margin-vertical-sm { margin-top: var(--ux-space-lg); margin-bottom: var(--ux-space-lg); }
      .ux-hidden-sm { display: none; }
      .ux-block-sm { display: block; }
      .ux-flex-sm { display: flex; }
    }

    /* Medium screens and up (768px+) */
    @media (min-width: 768px) {
      .ux-padding-md { padding: var(--ux-space-xl); }
      .ux-padding-horizontal-md { padding-left: var(--ux-space-xl); padding-right: var(--ux-space-xl); }
      .ux-padding-vertical-md { padding-top: var(--ux-space-xl); padding-bottom: var(--ux-space-xl); }
      .ux-margin-md { margin: var(--ux-space-xl); }
      .ux-margin-horizontal-md { margin-left: var(--ux-space-xl); margin-right: var(--ux-space-xl); }
      .ux-margin-vertical-md { margin-top: var(--ux-space-xl); margin-bottom: var(--ux-space-xl); }
      .ux-hidden-md { display: none; }
      .ux-block-md { display: block; }
      .ux-flex-md { display: flex; }
    }

    /* Large screens and up (992px+) */
    @media (min-width: 992px) {
      .ux-padding-lg { padding: var(--ux-space-2xl); }
      .ux-padding-horizontal-lg { padding-left: var(--ux-space-2xl); padding-right: var(--ux-space-2xl); }
      .ux-padding-vertical-lg { padding-top: var(--ux-space-2xl); padding-bottom: var(--ux-space-2xl); }
      .ux-margin-lg { margin: var(--ux-space-2xl); }
      .ux-margin-horizontal-lg { margin-left: var(--ux-space-2xl); margin-right: var(--ux-space-2xl); }
      .ux-margin-vertical-lg { margin-top: var(--ux-space-2xl); margin-bottom: var(--ux-space-2xl); }
      .ux-hidden-lg { display: none; }
      .ux-block-lg { display: block; }
      .ux-flex-lg { display: flex; }
    }

    /* Extra large screens (1200px+) */
    @media (min-width: 1200px) {
      .ux-padding-xl { padding: var(--ux-space-3xl); }
      .ux-padding-horizontal-xl { padding-left: var(--ux-space-3xl); padding-right: var(--ux-space-3xl); }
      .ux-padding-vertical-xl { padding-top: var(--ux-space-3xl); padding-bottom: var(--ux-space-3xl); }
      .ux-margin-xl { margin: var(--ux-space-3xl); }
      .ux-margin-horizontal-xl { margin-left: var(--ux-space-3xl); margin-right: var(--ux-space-3xl); }
      .ux-margin-vertical-xl { margin-top: var(--ux-space-3xl); margin-bottom: var(--ux-space-3xl); }
      .ux-hidden-xl { display: none; }
      .ux-block-xl { display: block; }
      .ux-flex-xl { display: flex; }
    }

    /* Mobile only (below 768px) */
    @media (max-width: 767px) {
      .ux-hidden-mobile { display: none; }
    }

    /* Desktop only (768px+) */
    @media (min-width: 768px) {
      .ux-hidden-desktop { display: none; }
    }

    /* ========================================
       Grid Container Utility
    ======================================== */

    .ux-container {
      width: 100%;
      max-width: 75rem;
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--ux-responsive-space);
      padding-right: var(--ux-responsive-space);
    }

    /* ========================================
       Bootstrap Grid Compatibility
       Overrides Bootstrap's gutter to match Ionic spacing
       Load order: Bootstrap Grid CSS → ux-core.js
    ======================================== */

    :root {
      --bs-gutter-x: var(--ux-space-md); /* 0.75rem vs Bootstrap 1.5rem */
      --bs-gutter-y: var(--ux-space-md);
    }

    .container,
    .container-fluid,
    .container-sm,
    .container-md,
    .container-lg,
    .container-xl,
    .container-xxl {
      --bs-gutter-x: var(--ux-responsive-space);
    }

    /* ========================================
       CSS Grid Utilities
       Native CSS Grid (not available in Bootstrap)
    ======================================== */

    .ux-css-grid {
      display: grid;
      gap: var(--ux-space-md);
    }

    .ux-css-grid--2 { grid-template-columns: repeat(2, 1fr); }
    .ux-css-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .ux-css-grid--4 { grid-template-columns: repeat(4, 1fr); }
    .ux-css-grid--6 { grid-template-columns: repeat(6, 1fr); }
    .ux-css-grid--12 { grid-template-columns: repeat(12, 1fr); }

    .ux-css-grid--auto-fit {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .ux-css-grid--auto-fill {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    /* Gap utilities with UX variables */
    .ux-gap-0 { gap: 0; }
    .ux-gap-xs { gap: var(--ux-space-xs); }
    .ux-gap-sm { gap: var(--ux-space-sm); }
    .ux-gap-md { gap: var(--ux-space-md); }
    .ux-gap-lg { gap: var(--ux-space-lg); }
    .ux-gap-xl { gap: var(--ux-space-xl); }
    .ux-gap-2xl { gap: var(--ux-space-2xl); }

    .ux-row-gap-0 { row-gap: 0; }
    .ux-row-gap-sm { row-gap: var(--ux-space-sm); }
    .ux-row-gap-md { row-gap: var(--ux-space-md); }
    .ux-row-gap-lg { row-gap: var(--ux-space-lg); }

    .ux-col-gap-0 { column-gap: 0; }
    .ux-col-gap-sm { column-gap: var(--ux-space-sm); }
    .ux-col-gap-md { column-gap: var(--ux-space-md); }
    .ux-col-gap-lg { column-gap: var(--ux-space-lg); }

    /* ========================================
       Flex Utilities Extended
    ======================================== */

    .ux-flex-1 { flex: 1; }
    .ux-flex-auto { flex: auto; }
    .ux-flex-none { flex: none; }
    .ux-flex-grow { flex-grow: 1; }
    .ux-flex-shrink { flex-shrink: 1; }
    .ux-flex-shrink-0 { flex-shrink: 0; }

    /* ========================================
       Additional Spacing Scales
    ======================================== */

    .ux-mt-0 { margin-top: 0; }
    .ux-mt-xs { margin-top: var(--ux-space-xs); }
    .ux-mt-sm { margin-top: var(--ux-space-sm); }
    .ux-mt-md { margin-top: var(--ux-space-md); }
    .ux-mt-lg { margin-top: var(--ux-space-lg); }
    .ux-mt-xl { margin-top: var(--ux-space-xl); }
    .ux-mt-2xl { margin-top: var(--ux-space-2xl); }

    .ux-mb-0 { margin-bottom: 0; }
    .ux-mb-xs { margin-bottom: var(--ux-space-xs); }
    .ux-mb-sm { margin-bottom: var(--ux-space-sm); }
    .ux-mb-md { margin-bottom: var(--ux-space-md); }
    .ux-mb-lg { margin-bottom: var(--ux-space-lg); }
    .ux-mb-xl { margin-bottom: var(--ux-space-xl); }
    .ux-mb-2xl { margin-bottom: var(--ux-space-2xl); }

    .ux-ml-0 { margin-left: 0; }
    .ux-ml-xs { margin-left: var(--ux-space-xs); }
    .ux-ml-sm { margin-left: var(--ux-space-sm); }
    .ux-ml-md { margin-left: var(--ux-space-md); }
    .ux-ml-lg { margin-left: var(--ux-space-lg); }
    .ux-ml-auto { margin-left: auto; }

    .ux-mr-0 { margin-right: 0; }
    .ux-mr-xs { margin-right: var(--ux-space-xs); }
    .ux-mr-sm { margin-right: var(--ux-space-sm); }
    .ux-mr-md { margin-right: var(--ux-space-md); }
    .ux-mr-lg { margin-right: var(--ux-space-lg); }
    .ux-mr-auto { margin-right: auto; }

    .ux-mx-auto { margin-left: auto; margin-right: auto; }

    .ux-pt-0 { padding-top: 0; }
    .ux-pt-xs { padding-top: var(--ux-space-xs); }
    .ux-pt-sm { padding-top: var(--ux-space-sm); }
    .ux-pt-md { padding-top: var(--ux-space-md); }
    .ux-pt-lg { padding-top: var(--ux-space-lg); }
    .ux-pt-xl { padding-top: var(--ux-space-xl); }

    .ux-pb-0 { padding-bottom: 0; }
    .ux-pb-xs { padding-bottom: var(--ux-space-xs); }
    .ux-pb-sm { padding-bottom: var(--ux-space-sm); }
    .ux-pb-md { padding-bottom: var(--ux-space-md); }
    .ux-pb-lg { padding-bottom: var(--ux-space-lg); }
    .ux-pb-xl { padding-bottom: var(--ux-space-xl); }

    .ux-pl-0 { padding-left: 0; }
    .ux-pl-xs { padding-left: var(--ux-space-xs); }
    .ux-pl-sm { padding-left: var(--ux-space-sm); }
    .ux-pl-md { padding-left: var(--ux-space-md); }
    .ux-pl-lg { padding-left: var(--ux-space-lg); }

    .ux-pr-0 { padding-right: 0; }
    .ux-pr-xs { padding-right: var(--ux-space-xs); }
    .ux-pr-sm { padding-right: var(--ux-space-sm); }
    .ux-pr-md { padding-right: var(--ux-space-md); }
    .ux-pr-lg { padding-right: var(--ux-space-lg); }

    .ux-px-0 { padding-left: 0; padding-right: 0; }
    .ux-px-xs { padding-left: var(--ux-space-xs); padding-right: var(--ux-space-xs); }
    .ux-px-sm { padding-left: var(--ux-space-sm); padding-right: var(--ux-space-sm); }
    .ux-px-md { padding-left: var(--ux-space-md); padding-right: var(--ux-space-md); }
    .ux-px-lg { padding-left: var(--ux-space-lg); padding-right: var(--ux-space-lg); }
    .ux-px-xl { padding-left: var(--ux-space-xl); padding-right: var(--ux-space-xl); }

    .ux-py-0 { padding-top: 0; padding-bottom: 0; }
    .ux-py-xs { padding-top: var(--ux-space-xs); padding-bottom: var(--ux-space-xs); }
    .ux-py-sm { padding-top: var(--ux-space-sm); padding-bottom: var(--ux-space-sm); }
    .ux-py-md { padding-top: var(--ux-space-md); padding-bottom: var(--ux-space-md); }
    .ux-py-lg { padding-top: var(--ux-space-lg); padding-bottom: var(--ux-space-lg); }
    .ux-py-xl { padding-top: var(--ux-space-xl); padding-bottom: var(--ux-space-xl); }

    /* ========================================
       Icon Utilities
       Responsive icon sizes with display block and margin auto
    ======================================== */

    .ux-icon {
      display: block;
      margin-left: auto;
      margin-right: auto;
      flex-shrink: 0;
    }

    .ux-icon--xs { width: 1rem; height: 1rem; }       /* 16px */
    .ux-icon--sm { width: 1.5rem; height: 1.5rem; }   /* 24px */
    .ux-icon--md { width: 2rem; height: 2rem; }       /* 32px */
    .ux-icon--lg { width: 3rem; height: 3rem; }       /* 48px */
    .ux-icon--xl { width: 4rem; height: 4rem; }       /* 64px */
    .ux-icon--2xl { width: 5rem; height: 5rem; }      /* 80px */

    /* Inline icon (no margin auto, inline-flex) */
    .ux-icon--inline {
      display: inline-flex;
      margin-left: 0;
      margin-right: 0;
      vertical-align: middle;
    }

    /* ========================================
       Liquid Glass Utilities
       iOS 26 style glass effects
    ======================================== */

    .ux-glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-glass--thick {
      background: var(--ux-glass-bg-thick);
    }

    .ux-glass--thin {
      background: var(--ux-glass-bg-thin);
    }

    .ux-glass--heavy {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
    }

    /* Glass border radii */
    .ux-glass-radius-xs { border-radius: var(--ux-glass-radius-xs); }
    .ux-glass-radius-sm { border-radius: var(--ux-glass-radius-sm); }
    .ux-glass-radius-md { border-radius: var(--ux-glass-radius-md); }
    .ux-glass-radius-lg { border-radius: var(--ux-glass-radius-lg); }
    .ux-glass-radius-xl { border-radius: var(--ux-glass-radius-xl); }

    /* Glass with highlight (premium iOS 26 feel) */
    .ux-glass--highlight {
      box-shadow: var(--ux-glass-shadow), var(--ux-glass-highlight);
    }

    /* Universal glass selector for --glass variants */
    [class*="--glass"] {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    [class*="--glass-heavy"] {
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
    }

    /* Fallback for browsers without backdrop-filter */
    @supports not (backdrop-filter: blur(10px)) {
      .ux-glass,
      [class*="--glass"] {
        background: var(--ux-glass-bg-thick);
      }
    }

    /* ========================================
       Focus Ring Utilities
       Standardized focus indicators
    ======================================== */

    .ux-focus-ring:focus-visible {
      outline: var(--ux-focus-ring-width) solid var(--ux-focus-ring-color);
      outline-offset: var(--ux-focus-ring-offset);
    }

    .ux-focus-ring--inset:focus-visible {
      outline-offset: calc(-1 * var(--ux-focus-ring-offset));
    }

    .ux-focus-ring--none:focus-visible {
      outline: none;
    }

    /* ========================================
       Backdrop/Overlay Utilities
       For modals, sheets, dialogs
    ======================================== */

    .ux-backdrop {
      position: fixed;
      inset: 0;
      background-color: var(--ux-backdrop-color);
      z-index: var(--ux-z-modal-backdrop);
    }

    .ux-backdrop--light {
      background-color: var(--ux-backdrop-color-light);
    }

    .ux-backdrop--heavy {
      background-color: var(--ux-backdrop-color-heavy);
    }

    .ux-backdrop--blur {
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    /* ========================================
       Color Variant Utilities (Composition)
       Use with components: .ux-button .ux-color-primary
    ======================================== */

    /* Filled variants */
    .ux-color-primary {
      --ux-variant-bg: var(--ux-primary);
      --ux-variant-bg-rgb: var(--ux-primary-rgb);
      --ux-variant-color: var(--ux-primary-contrast);
      --ux-variant-border: var(--ux-primary);
      --ux-variant-bg-hover: var(--ux-primary-shade);
    }

    .ux-color-secondary {
      --ux-variant-bg: var(--ux-secondary);
      --ux-variant-bg-rgb: var(--ux-secondary-rgb);
      --ux-variant-color: var(--ux-secondary-contrast);
      --ux-variant-border: var(--ux-secondary);
      --ux-variant-bg-hover: var(--ux-secondary-shade);
    }

    .ux-color-tertiary {
      --ux-variant-bg: var(--ux-tertiary);
      --ux-variant-bg-rgb: var(--ux-tertiary-rgb);
      --ux-variant-color: var(--ux-tertiary-contrast);
      --ux-variant-border: var(--ux-tertiary);
      --ux-variant-bg-hover: var(--ux-tertiary-shade);
    }

    .ux-color-success {
      --ux-variant-bg: var(--ux-success);
      --ux-variant-bg-rgb: var(--ux-success-rgb);
      --ux-variant-color: var(--ux-success-contrast);
      --ux-variant-border: var(--ux-success);
      --ux-variant-bg-hover: var(--ux-success-shade);
    }

    .ux-color-warning {
      --ux-variant-bg: var(--ux-warning);
      --ux-variant-bg-rgb: var(--ux-warning-rgb);
      --ux-variant-color: var(--ux-warning-contrast);
      --ux-variant-border: var(--ux-warning);
      --ux-variant-bg-hover: var(--ux-warning-shade);
    }

    .ux-color-danger {
      --ux-variant-bg: var(--ux-danger);
      --ux-variant-bg-rgb: var(--ux-danger-rgb);
      --ux-variant-color: var(--ux-danger-contrast);
      --ux-variant-border: var(--ux-danger);
      --ux-variant-bg-hover: var(--ux-danger-shade);
    }

    .ux-color-info {
      --ux-variant-bg: var(--ux-info);
      --ux-variant-bg-rgb: var(--ux-info-rgb);
      --ux-variant-color: var(--ux-info-contrast);
      --ux-variant-border: var(--ux-info);
      --ux-variant-bg-hover: var(--ux-info-shade);
    }

    .ux-color-tertiary {
      --ux-variant-bg: var(--ux-tertiary);
      --ux-variant-bg-rgb: var(--ux-tertiary-rgb);
      --ux-variant-color: var(--ux-tertiary-contrast);
      --ux-variant-border: var(--ux-tertiary);
      --ux-variant-bg-hover: var(--ux-tertiary-shade);
    }

    .ux-color-dark {
      --ux-variant-bg: var(--ux-dark);
      --ux-variant-bg-rgb: var(--ux-dark-rgb);
      --ux-variant-color: var(--ux-dark-contrast);
      --ux-variant-border: var(--ux-dark);
      --ux-variant-bg-hover: var(--ux-dark-shade);
    }

    .ux-color-light {
      --ux-variant-bg: var(--ux-light);
      --ux-variant-bg-rgb: var(--ux-light-rgb);
      --ux-variant-color: var(--ux-light-contrast);
      --ux-variant-border: var(--ux-light);
      --ux-variant-bg-hover: var(--ux-light-shade);
    }

    .ux-color-medium {
      --ux-variant-bg: var(--ux-medium);
      --ux-variant-bg-rgb: var(--ux-medium-rgb);
      --ux-variant-color: var(--ux-medium-contrast);
      --ux-variant-border: var(--ux-medium);
      --ux-variant-bg-hover: var(--ux-medium-shade);
    }

    /* Soft variants (tinted background) */
    .ux-color-primary--soft {
      --ux-variant-bg: rgba(var(--ux-primary-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-primary-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-primary-rgb), 0.25);
    }

    .ux-color-secondary--soft {
      --ux-variant-bg: rgba(var(--ux-secondary-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-secondary-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-secondary-rgb), 0.25);
    }

    .ux-color-success--soft {
      --ux-variant-bg: rgba(var(--ux-success-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-success-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-success-rgb), 0.25);
    }

    .ux-color-warning--soft {
      --ux-variant-bg: rgba(var(--ux-warning-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-warning-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-warning-rgb), 0.25);
    }

    .ux-color-danger--soft {
      --ux-variant-bg: rgba(var(--ux-danger-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-danger-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-danger-rgb), 0.25);
    }

    .ux-color-info--soft {
      --ux-variant-bg: rgba(var(--ux-info-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-info-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-info-rgb), 0.25);
    }

    .ux-color-tertiary--soft {
      --ux-variant-bg: rgba(var(--ux-tertiary-rgb), var(--ux-variant-soft-opacity));
      --ux-variant-color: var(--ux-tertiary-shade);
      --ux-variant-border: transparent;
      --ux-variant-bg-hover: rgba(var(--ux-tertiary-rgb), 0.25);
    }

    /* Outline variants */
    .ux-color-primary--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-primary);
      --ux-variant-border: var(--ux-primary);
      --ux-variant-bg-hover: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-color-secondary--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-secondary);
      --ux-variant-border: var(--ux-secondary);
      --ux-variant-bg-hover: rgba(var(--ux-secondary-rgb), 0.1);
    }

    .ux-color-success--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-success);
      --ux-variant-border: var(--ux-success);
      --ux-variant-bg-hover: rgba(var(--ux-success-rgb), 0.1);
    }

    .ux-color-warning--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-warning);
      --ux-variant-border: var(--ux-warning);
      --ux-variant-bg-hover: rgba(var(--ux-warning-rgb), 0.1);
    }

    .ux-color-danger--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-danger);
      --ux-variant-border: var(--ux-danger);
      --ux-variant-bg-hover: rgba(var(--ux-danger-rgb), 0.1);
    }

    .ux-color-info--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-info);
      --ux-variant-border: var(--ux-info);
      --ux-variant-bg-hover: rgba(var(--ux-info-rgb), 0.1);
    }

    .ux-color-tertiary--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-tertiary);
      --ux-variant-border: var(--ux-tertiary);
      --ux-variant-bg-hover: rgba(var(--ux-tertiary-rgb), 0.1);
    }

    .ux-color-dark--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-dark);
      --ux-variant-border: var(--ux-dark);
      --ux-variant-bg-hover: rgba(var(--ux-dark-rgb), 0.1);
    }

    .ux-color-light--outline {
      --ux-variant-bg: transparent;
      --ux-variant-color: var(--ux-light-contrast);
      --ux-variant-border: var(--ux-light);
      --ux-variant-bg-hover: rgba(var(--ux-light-rgb), 0.3);
    }

  `;

  // Inject styles
  if (!document.getElementById('ux-core-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-core-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Register global UX namespace
  window.UX = window.UX || {
    version: '1.0.0',
    components: {},
    _alpineReady: false,
    _scrollLockCount: 0,
    _scrollPosition: 0,

    // Helper to inject component styles
    injectStyles: function(id, css) {
      if (!document.getElementById(id)) {
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
      }
    },

    // Helper to register Alpine component
    registerComponent: function(name, component) {
      // Store for later use
      this.components[name] = component;

      // If Alpine is already ready, register immediately
      if (this._alpineReady && typeof Alpine !== 'undefined' && typeof Alpine.data === 'function') {
        Alpine.data(name, component);
      }
      // Otherwise, alpine:init listener will register all stored components
    },

    // Initialize all stored components with Alpine
    _registerAllComponents: function() {
      if (typeof Alpine === 'undefined' || typeof Alpine.data !== 'function') {
        return;
      }

      this._alpineReady = true;

      // Register all stored components
      Object.keys(this.components).forEach(name => {
        Alpine.data(name, this.components[name]);
      });
    },

    // Helper to register Alpine directive
    registerDirective: function(name, directive) {
      if (typeof Alpine !== 'undefined') {
        Alpine.directive(name, directive);
      } else {
        document.addEventListener('alpine:init', () => {
          Alpine.directive(name, directive);
        });
      }
    },

    // Scroll Lock - prevents body scroll when modals are open
    // Supports nested modals with reference counting
    lockScroll: function() {
      this._scrollLockCount++;
      if (this._scrollLockCount === 1) {
        this._scrollPosition = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this._scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
      }
    },

    unlockScroll: function() {
      this._scrollLockCount = Math.max(0, this._scrollLockCount - 1);
      if (this._scrollLockCount === 0) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, this._scrollPosition);
      }
    },

    // Focus Trap - keeps focus within a container (for modals, dialogs)
    // Returns a cleanup function to remove the trap
    trapFocus: function(container) {
      const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';

      const getFocusableElements = () => {
        return Array.from(container.querySelectorAll(focusableSelector))
          .filter(el => el.offsetParent !== null); // Only visible elements
      };

      const handleKeydown = (event) => {
        if (event.key !== 'Tab') return;

        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          // Shift+Tab: if on first element, go to last
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if on last element, go to first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener('keydown', handleKeydown);

      // Focus first element
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      // Return cleanup function
      return () => {
        container.removeEventListener('keydown', handleKeydown);
      };
    },

    // Announce to screen readers via live region
    announce: function(message, priority = 'polite') {
      let announcer = document.getElementById('ux-announcer');
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'ux-announcer';
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'ux-sr-only';
        document.body.appendChild(announcer);
      }
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = '';
      // Small delay ensures screen reader picks up the change
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
    }
  };

  // Listen for alpine:init to register all components
  document.addEventListener('alpine:init', () => {
    window.UX._registerAllComponents();
  });

  // Theme Manager Component
  const themeManagerComponent = () => {
    // Get initial dark mode value before returning the object
    const storedDarkMode = localStorage.getItem('ux-dark-mode');
    let initialDarkMode = false;

    if (storedDarkMode !== null) {
      initialDarkMode = storedDarkMode === 'true';
    } else {
      // Use system preference
      initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const savedColorTheme = localStorage.getItem('ux-color-theme') || 'ux-theme-ocean';

    return {
      darkMode: initialDarkMode,
      colorTheme: savedColorTheme,
      tempColorTheme: savedColorTheme,
      menuOpen: false,
      themeSheetOpen: false,
      themeSelectOpen: false,

      // Theme options for select interface
      themeOptions: [
        { value: 'ux-theme-ocean', label: 'Ocean Blue', color: '#0ea5e9' },
        { value: 'ux-theme-blue', label: 'Blue', color: '#3b82f6' },
        { value: 'ux-theme-emerald', label: 'Emerald', color: '#10b981' },
        { value: 'ux-theme-purple', label: 'Purple', color: '#a855f7' },
        { value: 'ux-theme-violet', label: 'Violet', color: '#8b5cf6' },
        { value: 'ux-theme-sunset', label: 'Sunset', color: '#f97316' },
        { value: 'ux-theme-rose', label: 'Rose', color: '#f43f5e' },
        { value: 'ux-theme-teal', label: 'Teal', color: '#14b8a6' },
        { value: 'ux-theme-amber', label: 'Amber', color: '#f59e0b' },
        { value: 'ux-theme-slate', label: 'Slate', color: '#64748b' },
        { value: 'ux-theme-indigo', label: 'Indigo', color: '#6366f1' },
        { value: 'ux-theme-cyan', label: 'Cyan', color: '#06b6d4' },
        { value: 'ux-theme-red', label: 'Red', color: '#ef4444' },
        { value: 'ux-theme-green', label: 'Green', color: '#16a34a' }
      ],

      init() {
        // Apply initial theme to body
        this.applyTheme();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          // Only auto-switch if user hasn't manually set preference
          if (localStorage.getItem('ux-dark-mode') === null) {
            this.darkMode = e.matches;
            this.applyTheme();
          }
        });
      },

      applyTheme() {
        const root = document.documentElement;

        // Apply dark/light mode
        root.classList.remove('ux-dark', 'ux-light');
        if (this.darkMode) {
          root.classList.add('ux-dark');
        } else {
          root.classList.add('ux-light');
        }

        // Remove all theme classes and apply current one
        root.classList.remove(
          'ux-theme-ocean', 'ux-theme-blue', 'ux-theme-emerald', 'ux-theme-purple',
          'ux-theme-violet', 'ux-theme-sunset', 'ux-theme-orange', 'ux-theme-rose',
          'ux-theme-teal', 'ux-theme-amber', 'ux-theme-slate', 'ux-theme-indigo',
          'ux-theme-cyan', 'ux-theme-red', 'ux-theme-crimson', 'ux-theme-green', 'ux-theme-forest'
        );
        root.classList.add(this.colorTheme);
      },

      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('ux-dark-mode', String(this.darkMode));
        this.applyTheme();
      },

      setColorTheme(theme) {
        this.colorTheme = theme;
        this.tempColorTheme = theme;
        localStorage.setItem('ux-color-theme', theme);
        this.menuOpen = false;
        this.themeSelectOpen = false;
        this.applyTheme();
      },

      openThemeSelect() {
        this.tempColorTheme = this.colorTheme;
        this.themeSelectOpen = true;
      },

      // Reset to system preference
      resetDarkMode() {
        localStorage.removeItem('ux-dark-mode');
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme();
      }
    };
  };

  // Register theme manager component
  window.UX.registerComponent('uxTheme', themeManagerComponent);

  // Auto-apply saved theme on load (before Alpine initializes)
  function applyTheme() {
    const root = document.documentElement;
    const savedDarkMode = localStorage.getItem('ux-dark-mode');
    const savedColorTheme = localStorage.getItem('ux-color-theme');

    // Remove both classes first
    root.classList.remove('ux-dark', 'ux-light');

    if (savedDarkMode === 'true') {
      root.classList.add('ux-dark');
    } else if (savedDarkMode === 'false') {
      root.classList.add('ux-light');
    }
    // If savedDarkMode is null, let system preference handle it via @media query

    if (savedColorTheme) {
      root.classList.add(savedColorTheme);
    }
  }

  // Apply immediately - documentElement is always available
  applyTheme();

  // Listen for theme changes from parent (when in iframe)
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'ux-theme') {
      const root = document.documentElement;
      root.classList.remove('ux-dark', 'ux-light');
      if (event.data.darkMode) {
        root.classList.add('ux-dark');
      } else {
        root.classList.add('ux-light');
      }
    }
  });

  console.log('UX Core loaded v1.0.0');
})();
