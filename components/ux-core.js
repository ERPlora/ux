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

      /* Primary - Ionic Blue style */
      --ux-primary: #3880ff;
      --ux-primary-rgb: 56, 128, 255;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #3171e0;
      --ux-primary-tint: #4c8dff;

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
      --ux-button-border-radius: var(--ux-border-radius);

      /* Card */
      --ux-card-bg: var(--ux-surface);
      --ux-card-border: var(--ux-border-color);
      --ux-card-shadow: var(--ux-shadow-md);

      /* Input */
      --ux-input-bg: var(--ux-surface);
      --ux-input-border: var(--ux-border-color);
      --ux-input-text: var(--ux-text);
      --ux-input-placeholder: var(--ux-text-tertiary);
      --ux-input-focus-border: var(--ux-primary);

      /* Modal */
      --ux-modal-bg: var(--ux-surface);
      --ux-modal-backdrop: rgba(0, 0, 0, 0.5);

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
      --ux-border-radius-lg: 0.75rem;
      --ux-border-radius-xl: 1rem;

      /* Typography */
      --ux-font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif;
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

      /* Transitions */
      --ux-transition-fast: 150ms;
      --ux-transition-base: 200ms;
      --ux-transition-slow: 300ms;
      --ux-transition-slower: 400ms;
      --ux-ease: cubic-bezier(0.25, 0.1, 0.25, 1);
      --ux-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

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

      /* Safe Areas (iOS notch) */
      --ux-safe-top: env(safe-area-inset-top, 0px);
      --ux-safe-right: env(safe-area-inset-right, 0px);
      --ux-safe-bottom: env(safe-area-inset-bottom, 0px);
      --ux-safe-left: env(safe-area-inset-left, 0px);
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
    }

    /* ========================================
       Color Themes - Using Primitives
       Apply to body or any container
       Plugins should use semantic tokens,
       not change these themes directly.
    ======================================== */

    /* Ocean Blue (default - Ionic style) */
    .ux-theme-ocean {
      --ux-primary: #3880ff;
      --ux-primary-rgb: 56, 128, 255;
      --ux-primary-contrast: #ffffff;
      --ux-primary-shade: #3171e0;
      --ux-primary-tint: #4c8dff;
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
      min-height: 100vh;
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
      --ux-scrollbar-thumb: rgba(0, 0, 0, 0.2);
      --ux-scrollbar-thumb-hover: rgba(0, 0, 0, 0.35);
      --ux-scrollbar-thumb-active: rgba(0, 0, 0, 0.5);
      --ux-scrollbar-radius: 100px;
    }

    /* Dark mode scrollbar colors */
    @media (prefers-color-scheme: dark) {
      :root {
        --ux-scrollbar-thumb: rgba(255, 255, 255, 0.2);
        --ux-scrollbar-thumb-hover: rgba(255, 255, 255, 0.35);
        --ux-scrollbar-thumb-active: rgba(255, 255, 255, 0.5);
      }
    }

    .ux-dark {
      --ux-scrollbar-thumb: rgba(255, 255, 255, 0.2);
      --ux-scrollbar-thumb-hover: rgba(255, 255, 255, 0.35);
      --ux-scrollbar-thumb-active: rgba(255, 255, 255, 0.5);
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

    /* Disabled state */
    [disabled] {
      opacity: 0.5;
      cursor: not-allowed;
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
    ======================================== */

    /* Padding - all sides */
    .ux-padding {
      padding: 1rem;
    }

    .ux-padding-top {
      padding-top: 1rem;
    }

    .ux-padding-bottom {
      padding-bottom: 1rem;
    }

    .ux-padding-start,
    .ux-padding-left {
      padding-left: 1rem;
    }

    .ux-padding-end,
    .ux-padding-right {
      padding-right: 1rem;
    }

    .ux-padding-horizontal {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .ux-padding-vertical {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .ux-no-padding {
      padding: 0 !important;
    }

    /* Margin - all sides */
    .ux-margin {
      margin: 1rem;
    }

    .ux-margin-top {
      margin-top: 1rem;
    }

    .ux-margin-bottom {
      margin-bottom: 1rem;
    }

    .ux-margin-start,
    .ux-margin-left {
      margin-left: 1rem;
    }

    .ux-margin-end,
    .ux-margin-right {
      margin-right: 1rem;
    }

    .ux-margin-horizontal {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .ux-margin-vertical {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .ux-no-margin {
      margin: 0 !important;
    }

    /* ========================================
       Responsive Breakpoints
       sm: 576px, md: 768px, lg: 992px, xl: 1200px
    ======================================== */

    /* Small screens and up (576px+) */
    @media (min-width: 576px) {
      .ux-padding-sm { padding: 1rem; }
      .ux-padding-horizontal-sm { padding-left: 1rem; padding-right: 1rem; }
      .ux-padding-vertical-sm { padding-top: 1rem; padding-bottom: 1rem; }
      .ux-margin-sm { margin: 1rem; }
      .ux-margin-horizontal-sm { margin-left: 1rem; margin-right: 1rem; }
      .ux-margin-vertical-sm { margin-top: 1rem; margin-bottom: 1rem; }
      .ux-hidden-sm { display: none; }
      .ux-block-sm { display: block; }
      .ux-flex-sm { display: flex; }
    }

    /* Medium screens and up (768px+) */
    @media (min-width: 768px) {
      .ux-padding { padding: 1.5rem; }
      .ux-padding-horizontal { padding-left: 1.5rem; padding-right: 1.5rem; }
      .ux-padding-vertical { padding-top: 1.5rem; padding-bottom: 1.5rem; }
      .ux-padding-top { padding-top: 1.5rem; }
      .ux-padding-bottom { padding-bottom: 1.5rem; }
      .ux-padding-start, .ux-padding-left { padding-left: 1.5rem; }
      .ux-padding-end, .ux-padding-right { padding-right: 1.5rem; }

      .ux-margin { margin: 1.5rem; }
      .ux-margin-horizontal { margin-left: 1.5rem; margin-right: 1.5rem; }
      .ux-margin-vertical { margin-top: 1.5rem; margin-bottom: 1.5rem; }
      .ux-margin-top { margin-top: 1.5rem; }
      .ux-margin-bottom { margin-bottom: 1.5rem; }
      .ux-margin-start, .ux-margin-left { margin-left: 1.5rem; }
      .ux-margin-end, .ux-margin-right { margin-right: 1.5rem; }

      .ux-padding-md { padding: 1.5rem; }
      .ux-padding-horizontal-md { padding-left: 1.5rem; padding-right: 1.5rem; }
      .ux-padding-vertical-md { padding-top: 1.5rem; padding-bottom: 1.5rem; }
      .ux-margin-md { margin: 1.5rem; }
      .ux-margin-horizontal-md { margin-left: 1.5rem; margin-right: 1.5rem; }
      .ux-margin-vertical-md { margin-top: 1.5rem; margin-bottom: 1.5rem; }
      .ux-hidden-md { display: none; }
      .ux-block-md { display: block; }
      .ux-flex-md { display: flex; }
    }

    /* Large screens and up (992px+) */
    @media (min-width: 992px) {
      .ux-padding { padding: 2rem; }
      .ux-padding-horizontal { padding-left: 2rem; padding-right: 2rem; }
      .ux-padding-vertical { padding-top: 2rem; padding-bottom: 2rem; }
      .ux-padding-top { padding-top: 2rem; }
      .ux-padding-bottom { padding-bottom: 2rem; }
      .ux-padding-start, .ux-padding-left { padding-left: 2rem; }
      .ux-padding-end, .ux-padding-right { padding-right: 2rem; }

      .ux-margin { margin: 2rem; }
      .ux-margin-horizontal { margin-left: 2rem; margin-right: 2rem; }
      .ux-margin-vertical { margin-top: 2rem; margin-bottom: 2rem; }
      .ux-margin-top { margin-top: 2rem; }
      .ux-margin-bottom { margin-bottom: 2rem; }
      .ux-margin-start, .ux-margin-left { margin-left: 2rem; }
      .ux-margin-end, .ux-margin-right { margin-right: 2rem; }

      .ux-padding-lg { padding: 2rem; }
      .ux-padding-horizontal-lg { padding-left: 2rem; padding-right: 2rem; }
      .ux-padding-vertical-lg { padding-top: 2rem; padding-bottom: 2rem; }
      .ux-margin-lg { margin: 2rem; }
      .ux-margin-horizontal-lg { margin-left: 2rem; margin-right: 2rem; }
      .ux-margin-vertical-lg { margin-top: 2rem; margin-bottom: 2rem; }
      .ux-hidden-lg { display: none; }
      .ux-block-lg { display: block; }
      .ux-flex-lg { display: flex; }
    }

    /* Extra large screens (1200px+) */
    @media (min-width: 1200px) {
      .ux-padding-xl { padding: 3rem; }
      .ux-padding-horizontal-xl { padding-left: 3rem; padding-right: 3rem; }
      .ux-padding-vertical-xl { padding-top: 3rem; padding-bottom: 3rem; }
      .ux-margin-xl { margin: 3rem; }
      .ux-margin-horizontal-xl { margin-left: 3rem; margin-right: 3rem; }
      .ux-margin-vertical-xl { margin-top: 3rem; margin-bottom: 3rem; }
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
      padding-left: 1rem;
      padding-right: 1rem;
    }

    @media (min-width: 768px) {
      .ux-container {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    @media (min-width: 992px) {
      .ux-container {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }

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

    return {
      darkMode: initialDarkMode,
      colorTheme: localStorage.getItem('ux-color-theme') || 'ux-theme-ocean',
      menuOpen: false,

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
          'ux-theme-ocean', 'ux-theme-emerald', 'ux-theme-purple',
          'ux-theme-sunset', 'ux-theme-rose', 'ux-theme-teal',
          'ux-theme-amber', 'ux-theme-slate', 'ux-theme-indigo', 'ux-theme-cyan'
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
        localStorage.setItem('ux-color-theme', theme);
        this.menuOpen = false;
        this.applyTheme();
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

  console.log('UX Core loaded v1.0.0');
})();
